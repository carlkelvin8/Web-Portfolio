"use client";

import { useEffect } from "react";
import portfolioSource from "../index.html?raw";

const bodyMatch = portfolioSource.match(/<body[^>]*>([\s\S]*?)<script>/i);
const portfolioMarkup = (bodyMatch?.[1] ?? "").replaceAll("/public/", "/");

// Brand names, BOOKING_URL, and contact email live in the site-config block at the top of index.html.
type SiteConfig = {
  personName: string;
  role: string;
  positioning: string;
  BOOKING_URL: string;
  email: string;
};
const configMatch = portfolioSource.match(/<script type="application\/json" id="site-config">([\s\S]*?)<\/script>/i);
const siteConfig: SiteConfig = JSON.parse(configMatch?.[1] ?? "{}");
const BOOKING_URL = siteConfig.BOOKING_URL ?? "#contact";
const siteValues: Record<string, string> = {
  personName: siteConfig.personName,
  roleLine: siteConfig.role,
  brandLine: `${siteConfig.role} / ${siteConfig.positioning}`,
  email: siteConfig.email,
};

function applySiteConfig() {
  document.querySelectorAll<HTMLElement>("[data-site-text]").forEach((element) => {
    const value = siteValues[element.dataset.siteText ?? ""];
    if (value) element.textContent = value;
  });
  document.querySelectorAll<HTMLAnchorElement>("[data-site-href]").forEach((link) => {
    if (link.dataset.siteHref === "email") {
      link.href = `mailto:${siteConfig.email}`;
      return;
    }
    link.href = BOOKING_URL;
    if (/^https?:/.test(BOOKING_URL)) {
      link.target = "_blank";
      link.rel = "noreferrer";
    }
  });
  document.querySelectorAll<HTMLFormElement>("[data-site-action]").forEach((form) => {
    form.action = `mailto:${siteConfig.email}`;
  });
}

export default function PortfolioClient() {
  useEffect(() => {
    applySiteConfig();

    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1, 1);
    const monthName = nextMonth.toLocaleString("en-US", { month: "long" });
    document.querySelectorAll(".availability-text").forEach((element) => {
      element.textContent = `Booking projects for ${monthName}`;
    });

    // Sticky mobile CTA: visible once the hero is gone, hidden again at the contact section.
    const mobileCta = document.querySelector<HTMLElement>(".mobile-cta");
    const ctaHero = document.querySelector(".hero");
    const ctaContact = document.querySelector("#contact");
    const ctaSeen = new Map<Element, boolean>();
    const ctaObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => ctaSeen.set(entry.target, entry.isIntersecting));
      mobileCta?.classList.toggle(
        "show",
        !(ctaHero && ctaSeen.get(ctaHero)) && !(ctaContact && ctaSeen.get(ctaContact)),
      );
    });
    if (mobileCta && ctaHero && ctaContact) {
      ctaObserver.observe(ctaHero);
      ctaObserver.observe(ctaContact);
    }

    const menuButton = document.querySelector<HTMLButtonElement>(".menu-toggle");
    const menu = document.querySelector<HTMLElement>("#menu");

    const toggleMenu = () => {
      if (!menuButton || !menu) return;
      const isOpen = menuButton.getAttribute("aria-expanded") === "true";
      menuButton.setAttribute("aria-expanded", String(!isOpen));
      menu.classList.toggle("open");
    };

    const closeMenu = () => {
      menu?.classList.remove("open");
      menuButton?.setAttribute("aria-expanded", "false");
    };

    menuButton?.addEventListener("click", toggleMenu);
    const menuLinks = Array.from(menu?.querySelectorAll("a") ?? []);
    menuLinks.forEach((link) => link.addEventListener("click", closeMenu));

    const targets = document.querySelectorAll(
      ".signal,.section-head,.section-intro,.project,.about>*,.capabilities>*,.timeline article,.footer>*,.offer,.offers-note,.cta-band>*,.proof,.process-step,.process-promises,.faq-item",
    );
    targets.forEach((element) => element.classList.add("reveal"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.1 },
    );
    targets.forEach((element) => observer.observe(element));

    const projectList = document.querySelector<HTMLElement>("#project-list");
    const moreButton = document.querySelector<HTMLButtonElement>(".projects-more-button");
    const hiddenCount = Math.max(0, (projectList?.children.length ?? 0) - 6);
    const toggleProjects = () => {
      if (!projectList || !moreButton) return;
      const expanded = !projectList.classList.toggle("is-collapsed");
      moreButton.setAttribute("aria-expanded", String(expanded));
      moreButton.innerHTML = expanded
        ? 'Show fewer projects <span aria-hidden="true">↑</span>'
        : `See ${hiddenCount} more projects <span aria-hidden="true">↘</span>`;
      if (!expanded) moreButton.scrollIntoView({ block: "center" });
    };
    if (projectList && moreButton && hiddenCount > 0) {
      projectList.classList.add("is-collapsed");
      moreButton.hidden = false;
      moreButton.textContent = `See ${hiddenCount} more projects ↘`;
      moreButton.addEventListener("click", toggleProjects);
    }

    // Stacking project cards: --cover (0–1) tracks how much the next card overlaps this one.
    const stackCards = Array.from(
      document.querySelectorAll<HTMLElement>(".project-list>.project:not(.mobile-project)"),
    );
    const stackQuery = window.matchMedia(
      "(min-width:801px) and (min-height:720px) and (prefers-reduced-motion:no-preference)",
    );
    let stackFrame = 0;
    const updateStack = () => {
      stackFrame = 0;
      const enabled = stackQuery.matches;
      const viewportHeight = window.innerHeight;
      stackCards.forEach((card) => {
        let cover = 0;
        if (enabled && card.offsetParent) {
          let next = card.nextElementSibling as HTMLElement | null;
          while (next && !next.offsetParent) next = next.nextElementSibling as HTMLElement | null;
          const nextTop = next?.getBoundingClientRect().top ?? Infinity;
          if (nextTop < viewportHeight) {
            const cardRect = card.getBoundingClientRect();
            cover = Math.min(1, Math.max(0, (cardRect.bottom - nextTop) / cardRect.height));
          }
        }
        const value = cover.toFixed(2);
        if (card.dataset.cover !== value) {
          card.dataset.cover = value;
          card.style.setProperty("--cover", value);
        }
      });
    };
    const requestStackUpdate = () => {
      if (!stackFrame) stackFrame = requestAnimationFrame(updateStack);
    };
    window.addEventListener("scroll", requestStackUpdate, { passive: true });
    window.addEventListener("resize", updateStack);
    updateStack();

    const cursor = document.querySelector<HTMLElement>(".cursor");
    const interactiveElements = Array.from(
      document.querySelectorAll<HTMLElement>("a,button,.project"),
    );
    const activateCursor = () => cursor?.classList.add("active");
    const deactivateCursor = () => cursor?.classList.remove("active");
    const moveCursor = (event: MouseEvent) => {
      if (cursor) cursor.style.transform = `translate(${event.clientX}px,${event.clientY}px)`;
    };
    const hasFinePointer = window.matchMedia("(pointer:fine)").matches;

    if (hasFinePointer) {
      window.addEventListener("mousemove", moveCursor);
      interactiveElements.forEach((element) => {
        element.addEventListener("mouseenter", activateCursor);
        element.addEventListener("mouseleave", deactivateCursor);
      });
    }

    return () => {
      menuButton?.removeEventListener("click", toggleMenu);
      menuLinks.forEach((link) => link.removeEventListener("click", closeMenu));
      observer.disconnect();
      ctaObserver.disconnect();
      moreButton?.removeEventListener("click", toggleProjects);
      window.removeEventListener("scroll", requestStackUpdate);
      window.removeEventListener("resize", updateStack);
      cancelAnimationFrame(stackFrame);
      window.removeEventListener("mousemove", moveCursor);
      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", activateCursor);
        element.removeEventListener("mouseleave", deactivateCursor);
      });
    };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: portfolioMarkup }} />;
}
