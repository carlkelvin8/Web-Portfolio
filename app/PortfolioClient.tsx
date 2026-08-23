"use client";

import { useEffect } from "react";
import portfolioSource from "../index.html?raw";

const bodyMatch = portfolioSource.match(/<body[^>]*>([\s\S]*?)<script>/i);
const portfolioMarkup = (bodyMatch?.[1] ?? "").replaceAll("/public/", "/");

export default function PortfolioClient() {
  useEffect(() => {
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
      ".signal,.section-head,.section-intro,.project,.about>*,.capabilities>*,.timeline article,.footer>*",
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
      window.removeEventListener("mousemove", moveCursor);
      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", activateCursor);
        element.removeEventListener("mouseleave", deactivateCursor);
      });
    };
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: portfolioMarkup }} />;
}
