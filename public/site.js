// Page behaviour shared by the homepage, the service landing pages, and the vinext app.
// Every feature looks for its own elements first, so one file serves all of them.
(() => {
  if (window.__siteScript) return;
  window.__siteScript = true;

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const media = (query) => matchMedia(query).matches;

  // Brand names, booking URL, and email come from the site-config block in index.html.
  const applySiteConfig = () => {
    const source = $("#site-config");
    if (!source) return;
    const config = JSON.parse(source.textContent);
    const text = {
      personName: config.personName,
      roleLine: config.role,
      brandLine: `${config.role} / ${config.positioning}`,
      email: config.email,
    };
    $$("[data-site-text]").forEach((el) => {
      if (text[el.dataset.siteText]) el.textContent = text[el.dataset.siteText];
    });
    $$("[data-site-href]").forEach((link) => {
      if (link.dataset.siteHref === "email") {
        link.href = `mailto:${config.email}`;
        return;
      }
      link.href = config.BOOKING_URL;
      if (/^https?:/.test(config.BOOKING_URL)) {
        link.target = "_blank";
        link.rel = "noreferrer";
      }
    });
  };

  // Always advertises next month, based on the visitor's own clock.
  const showAvailability = () => {
    const next = new Date();
    next.setMonth(next.getMonth() + 1, 1);
    const month = next.toLocaleString("en-US", { month: "long" });
    $$(".availability-text").forEach((el) => {
      el.textContent = `Booking projects for ${month}`;
    });
  };

  const setupMenu = () => {
    const button = $(".menu-toggle");
    const menu = $("#menu");
    if (!button || !menu) return;
    const setOpen = (open) => {
      button.setAttribute("aria-expanded", String(open));
      menu.classList.toggle("open", open);
    };
    button.addEventListener("click", () => setOpen(button.getAttribute("aria-expanded") !== "true"));
    $$("a", menu).forEach((link) => link.addEventListener("click", () => setOpen(false)));
  };

  // Sticky mobile CTA: shown once the hero scrolls away, hidden again at the contact section.
  const setupMobileCta = () => {
    const cta = $(".mobile-cta");
    const hero = $(".hero, .page-hero");
    const contact = $("#contact");
    if (!cta || !hero || !contact) return;
    const visible = new Map();
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => visible.set(entry.target, entry.isIntersecting));
      cta.classList.toggle("show", !visible.get(hero) && !visible.get(contact));
    });
    observer.observe(hero);
    observer.observe(contact);
  };

  const setupReveal = () => {
    const targets = $$(
      ".signal,.section-head,.section-intro,.project,.about>*,.capabilities>*,.timeline article,.offer,.offers-note,.cta-band>*,.proof,.process-step,.faq-item,.page-body>article,.page-project,.footer>*",
    );
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }),
      { threshold: 0.1 },
    );
    targets.forEach((el) => {
      el.classList.add("reveal");
      observer.observe(el);
    });
  };

  // The first six projects show by default; the button reveals the rest.
  // Hiding only one or two cards behind a button isn't worth the click, so short lists stay open.
  const setupProjectToggle = () => {
    const VISIBLE = 6;
    const MIN_HIDDEN = 3;
    const list = $("#project-list");
    const button = $(".projects-more-button");
    const hidden = list ? list.children.length - VISIBLE : 0;
    if (!button || hidden < MIN_HIDDEN) return;
    const label = (expanded) =>
      expanded
        ? 'Show fewer projects <span aria-hidden="true">↑</span>'
        : `See ${hidden} more projects <span aria-hidden="true">↘</span>`;
    list.classList.add("is-collapsed");
    button.innerHTML = label(false);
    button.hidden = false;
    button.addEventListener("click", () => {
      const expanded = !list.classList.toggle("is-collapsed");
      button.setAttribute("aria-expanded", String(expanded));
      button.innerHTML = label(expanded);
      if (!expanded) button.scrollIntoView({ block: "center" });
    });
  };

  // Stacking project cards: --cover (0-1) is how much the next card overlaps this one.
  const setupProjectStack = () => {
    const cards = $$(".project-list>.project:not(.mobile-project)");
    if (!cards.length) return;
    const enabled = matchMedia("(min-width:801px) and (min-height:720px) and (prefers-reduced-motion:no-preference)");
    let frame = 0;
    const update = () => {
      frame = 0;
      cards.forEach((card) => {
        let cover = 0;
        if (enabled.matches && card.offsetParent) {
          let next = card.nextElementSibling;
          while (next && !next.offsetParent) next = next.nextElementSibling;
          const nextTop = next ? next.getBoundingClientRect().top : Infinity;
          if (nextTop < innerHeight) {
            const rect = card.getBoundingClientRect();
            cover = Math.min(1, Math.max(0, (rect.bottom - nextTop) / rect.height));
          }
        }
        const value = cover.toFixed(2);
        if (card.dataset.cover !== value) {
          card.dataset.cover = value;
          card.style.setProperty("--cover", value);
        }
      });
    };
    addEventListener("scroll", () => (frame ||= requestAnimationFrame(update)), { passive: true });
    addEventListener("resize", update);
    update();
  };

  // LeSgo showcase parallax: CSS reads --mx/--my in the range -0.5..0.5.
  const setupShowcaseParallax = () => {
    const card = $(".lesgo-showcase");
    if (!card || !media("(hover:hover) and (pointer:fine) and (prefers-reduced-motion:no-preference)")) return;
    let frame = 0;
    let x = 0;
    let y = 0;
    const apply = () => {
      frame = 0;
      card.style.setProperty("--mx", x.toFixed(3));
      card.style.setProperty("--my", y.toFixed(3));
    };
    card.addEventListener("pointermove", (e) => {
      const rect = card.getBoundingClientRect();
      x = (e.clientX - rect.left) / rect.width - 0.5;
      y = (e.clientY - rect.top) / rect.height - 0.5;
      frame ||= requestAnimationFrame(apply);
    });
    card.addEventListener("pointerleave", () => {
      x = y = 0;
      apply();
    });
  };

  applySiteConfig();
  showAvailability();
  setupMenu();
  setupMobileCta();
  setupReveal();
  setupProjectToggle();
  setupProjectStack();
  setupShowcaseParallax();
})();
