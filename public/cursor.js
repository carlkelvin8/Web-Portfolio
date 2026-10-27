// Custom cursor for the homepage, shared by the static build and the vinext app.
// A precise dot tracks the pointer; a trailing ring stretches with speed, fills on links,
// wraps magnetic buttons, and turns into a labelled disc over project previews.
// Mouse and trackpad only: touch devices and keyboard users keep native behaviour.
(() => {
  if (window.__customCursor || !matchMedia("(hover:hover) and (pointer:fine)").matches) return;
  window.__customCursor = true;

  const reduceMotion = matchMedia("(prefers-reduced-motion:reduce)");
  const root = document.documentElement;
  const cursor = document.createElement("div");
  cursor.className = "cursor";
  cursor.setAttribute("aria-hidden", "true");
  cursor.innerHTML = '<div class="cursor-follow"><span class="cursor-ring"></span><b class="cursor-label"></b></div><span class="cursor-dot"></span>';
  document.body.append(cursor);
  const follow = cursor.firstElementChild;
  const ring = follow.firstElementChild;
  const label = follow.lastElementChild;
  const dot = cursor.lastElementChild;

  const INTERACTIVE = "a,button,summary,label,[role=button],[data-cursor]";
  const MAGNETIC = ".hero-primary,.cta-band-button,.call-promise-button,.offer-cta,.pill,.projects-more-button,.play-store-cta,.menu-toggle";
  const MEDIA = "a.project-art";
  const TEXT = "input:not([type=button],[type=submit],[type=checkbox],[type=radio]),textarea,select,[contenteditable=true]";

  // What the disc says over a project preview, unless the element sets data-cursor itself.
  const mediaLabel = (el) => {
    if (el.dataset.cursor) return el.dataset.cursor;
    const href = el.closest("a")?.href ?? "";
    if (href.includes("github.com")) return "View code";
    if (href.includes("play.google")) return "Get the app";
    return href ? "Visit site" : "View";
  };

  let x = -100, y = -100, rx = x, ry = y, px = x, py = y;
  let speed = 0, angle = 0, visible = false, frame = 0;
  let magnet = null, mx = 0, my = 0;

  const releaseMagnet = () => {
    if (!magnet) return;
    magnet.style.translate = "";
    magnet = null;
    mx = my = 0;
    ring.style.removeProperty("--w");
    ring.style.removeProperty("--h");
    ring.style.removeProperty("--r");
    cursor.classList.remove("is-magnet");
  };

  const setState = (target) => {
    const el = target instanceof Element ? target : null;
    const text = el?.closest(TEXT);
    const hit = text ? null : el?.closest(INTERACTIVE);
    const media = el?.closest(MEDIA);
    const nextMagnet = !reduceMotion.matches && hit ? hit.closest(MAGNETIC) : null;

    cursor.classList.toggle("is-text", !!text);
    cursor.classList.toggle("is-media", !!media);
    cursor.classList.toggle("is-hover", !!hit && !media && !nextMagnet);
    if (media) label.textContent = `${mediaLabel(media)} ↗`;

    if (nextMagnet !== magnet) {
      releaseMagnet();
      if (nextMagnet) {
        magnet = nextMagnet;
        cursor.classList.add("is-magnet");
        ring.style.setProperty("--r", getComputedStyle(magnet).borderRadius || "999px");
      }
    }
  };

  const tick = () => {
    frame = 0;
    let tx = x, ty = y;

    if (magnet) {
      // Measure without the pull we applied last frame, so the button doesn't chase itself.
      const r = magnet.getBoundingClientRect();
      const cx = r.left + r.width / 2 - mx;
      const cy = r.top + r.height / 2 - my;
      const clamp = (v, max) => Math.max(-max, Math.min(max, v));
      mx = clamp((x - cx) * 0.3, r.width * 0.12 + 4);
      my = clamp((y - cy) * 0.3, r.height * 0.18 + 4);
      magnet.style.translate = `${mx.toFixed(2)}px ${my.toFixed(2)}px`;
      ring.style.setProperty("--w", `${r.width + 14}px`);
      ring.style.setProperty("--h", `${r.height + 14}px`);
      tx = cx + mx;
      ty = cy + my;
    }

    const ease = reduceMotion.matches ? 1 : magnet ? 0.28 : 0.2;
    rx += (tx - rx) * ease;
    ry += (ty - ry) * ease;

    const dx = x - px, dy = y - py;
    px = x;
    py = y;
    speed += (Math.hypot(dx, dy) - speed) * 0.25;
    if (Math.hypot(dx, dy) > 0.6) angle = Math.atan2(dy, dx);
    const plain = !reduceMotion.matches && !magnet && !cursor.classList.contains("is-media") && !cursor.classList.contains("is-text");
    const stretch = plain ? Math.min(speed / 40, 0.5) : 0;

    dot.style.transform = `translate3d(${x}px,${y}px,0)`;
    follow.style.transform = `translate3d(${rx.toFixed(2)}px,${ry.toFixed(2)}px,0)`;
    ring.style.transform = `translate(-50%,-50%) rotate(${plain ? angle : 0}rad) scale(${1 + stretch},${1 - stretch * 0.45})`;

    const settled = Math.abs(tx - rx) < 0.1 && Math.abs(ty - ry) < 0.1 && speed < 0.05;
    if (!settled || magnet) frame = requestAnimationFrame(tick);
  };
  const wake = () => {
    if (!frame) frame = requestAnimationFrame(tick);
  };

  addEventListener(
    "pointermove",
    (e) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX;
      y = e.clientY;
      if (!visible) {
        visible = true;
        rx = px = x;
        ry = py = y;
        root.classList.add("has-cursor");
        cursor.classList.add("is-visible");
      }
      wake();
    },
    { passive: true },
  );
  document.addEventListener("pointerover", (e) => {
    if (e.pointerType === "mouse") setState(e.target);
  });
  root.addEventListener("mouseleave", () => {
    visible = false;
    releaseMagnet();
    cursor.classList.remove("is-visible");
  });
  addEventListener("pointerdown", (e) => {
    if (e.pointerType === "mouse") cursor.classList.add("is-down");
  });
  addEventListener("pointerup", () => cursor.classList.remove("is-down"));
  // Content under a still pointer changes on scroll (and the stacked project cards move), so re-check it.
  addEventListener(
    "scroll",
    () => {
      if (visible) setState(document.elementFromPoint(x, y));
      wake();
    },
    { passive: true },
  );
  // Hide while the window is in the background, e.g. after a link opens a new tab.
  addEventListener("blur", () => cursor.classList.remove("is-visible"));
  addEventListener("focus", () => visible && cursor.classList.add("is-visible"));
})();
