import { offers, projects } from "./pages.mjs";

const escapeHtml = (text) =>
  String(text).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
// "*word*" marks the italic accent used across the site's big headings.
const accent = (text) => escapeHtml(text).replace(/\*(.+?)\*/g, "<em>$1</em>");
const priceNumber = (price) => Number(price.replace(/[^0-9]/g, ""));

// Shared blocks are lifted from index.html so the homepage stays the single source for them.
export function sharedBlocks(source) {
  const take = (pattern, name) => {
    const match = source.match(pattern);
    if (!match) throw new Error(`index.html is missing the ${name} block used by landing pages`);
    return match[0];
  };
  return {
    proof: take(/<section class="proof shell"[\s\S]*?<\/section>/, "proof strip"),
    process: take(/<section class="offers process shell" id="process">[\s\S]*?<\/section>/, "process"),
    ctaBand: take(/<section class="cta-band shell"[\s\S]*?<\/section>/, "CTA band"),
    contactLinks: take(/<div class="contact-links">[\s\S]*?<\/div>/, "contact links"),
    footerServices: take(/<nav class="footer-services"[\s\S]*?<\/nav>/, "footer services"),
  };
}

export function offerCard(key, booking, currentPath) {
  const offer = offers[key];
  const more =
    offer.page && offer.page !== currentPath
      ? `<a class="offer-more" href="${offer.page}">What’s included →</a>`
      : "";
  return `<article class="offer"><span class="offer-index">${offer.index}</span><h3>${escapeHtml(offer.name)}</h3><p>${escapeHtml(offer.blurb)}</p><dl><dt>Starting at</dt><dd class="offer-price">${offer.price}</dd></dl><dl><dt>Typical timeline</dt><dd>${offer.timeline}</dd></dl><ul aria-label="Includes">${offer.includes.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>${more}<a class="offer-cta" href="${booking}" target="_blank" rel="noreferrer">Talk about this ↗</a></article>`;
}

function projectCard(key) {
  const project = projects[key];
  const link = project.url
    ? `<a class="page-project-link" href="${project.url}" target="_blank" rel="noreferrer" aria-label="Open ${escapeHtml(project.name)}">${project.url.includes("github.com") ? "GitHub" : project.url.includes("play.google") ? "Google Play" : "Live"} ↗</a>`
    : "";
  return `<article class="page-project"><img loading="lazy" src="/public/${project.image}" alt="${escapeHtml(project.name)} screenshot" width="1800" height="1044"><div><span>${escapeHtml(project.tag)}</span><h3>${escapeHtml(project.name)}</h3><p>${escapeHtml(project.text)}</p>${link}</div></article>`;
}

export function renderPage(page, { config, siteUrl, cssVersion, blocks, today }) {
  const path = `/${page.slug}`;
  const url = `${siteUrl}${path}`;
  const booking = config.BOOKING_URL;
  const bookAttrs = `href="${booking}" target="_blank" rel="noreferrer"`;
  const pageOffers = page.offers.map((key) => offers[key]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: page.title,
        description: page.description,
        inLanguage: "en",
        isPartOf: { "@id": `${siteUrl}/#website` },
        about: { "@id": `${url}#service` },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        dateModified: today,
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: page.label, item: url },
        ],
      },
      {
        "@type": "Service",
        "@id": `${url}#service`,
        name: page.label,
        serviceType: page.serviceType,
        description: page.description,
        url,
        areaServed: page.areaServed,
        provider: { "@type": "Person", "@id": `${siteUrl}/#person`, name: config.personName, url: `${siteUrl}/` },
        offers: pageOffers.map((offer) => ({
          "@type": "Offer",
          name: offer.name,
          priceSpecification: { "@type": "PriceSpecification", minPrice: priceNumber(offer.price), priceCurrency: "USD" },
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        url,
        mainEntity: page.faqs.map(([question, answer]) => ({
          "@type": "Question",
          name: question,
          acceptedAnswer: { "@type": "Answer", text: answer },
        })),
      },
    ],
  };

  const body = page.body
    .map(
      (section) =>
        `<article><h2>${escapeHtml(section.heading)}</h2>${section.paragraphs.map((text) => `<p>${escapeHtml(text)}</p>`).join("")}${
          section.list ? `<ul>${section.list.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>` : ""
        }</article>`,
    )
    .join("");

  const faqs = page.faqs
    .map(([question, answer]) => `<details class="faq-item"><summary>${escapeHtml(question)}</summary><p>${escapeHtml(answer)}</p></details>`)
    .join("");

  return `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${escapeHtml(page.title)}</title>
<meta name="description" content="${escapeHtml(page.description)}">
<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
<meta name="author" content="${escapeHtml(config.personName)}">
<meta name="theme-color" content="#0c0c10">
<link rel="canonical" href="${url}">
<link rel="icon" href="/public/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/public/apple-touch-icon.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${escapeHtml(config.personName)}">
<meta property="og:locale" content="en_US">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${escapeHtml(page.title)}">
<meta property="og:description" content="${escapeHtml(page.description)}">
<meta property="og:image" content="${siteUrl}/public/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escapeHtml(page.title)}">
<meta name="twitter:description" content="${escapeHtml(page.description)}">
<meta name="twitter:image" content="${siteUrl}/public/og-image.png">
<link rel="stylesheet" href="/app/globals.css?v=${cssVersion}"><style>body{font-family:Arial,sans-serif}</style>
<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
</head><body><main>
<header class="nav shell"><a class="wordmark brand-wordmark" href="/"><strong>${escapeHtml(config.personName)}</strong><small>${escapeHtml(config.role)}</small></a><button class="menu-toggle" aria-expanded="false" aria-controls="menu">Menu</button><nav id="menu"><a href="/#services">Services</a><a href="/#work">Projects</a><a href="/#about">About</a><a href="/#faq">FAQ</a><a class="pill dark" ${bookAttrs}>Book a call ↗</a></nav></header>
<nav class="breadcrumb shell" aria-label="Breadcrumb"><a href="/">Home</a><span aria-hidden="true">/</span><span aria-current="page">${escapeHtml(page.label)}</span></nav>
<section class="page-hero shell"><div class="eyebrow"><span>Philippines</span><span class="availability"><i></i><span class="availability-text">Now booking new projects</span></span></div><h1>${page.h1.map(accent).join("<br>")}</h1><p class="page-intro">${escapeHtml(page.intro)}</p><div class="hero-actions"><a class="hero-primary" ${bookAttrs}>Book a free 15-min call ↗</a><a href="#related-work">See related work ↘</a></div><p class="hero-note">Free · 15 minutes · No commitment · Replies within 24h</p></section>
${blocks.proof}
<section class="page-body shell">${body}</section>
<section class="offers shell" id="pricing"><div class="section-head"><span>PRICING</span><h2>Fixed price,<br><em>no surprises.</em></h2></div><div class="offer-list cols-${pageOffers.length}">${page.offers.map((key) => offerCard(key, booking, path)).join("")}</div><p class="offers-note">All prices are fixed and in USD. Not sure what you need? <a ${bookAttrs}>Book a free 15-min call</a> and we’ll figure it out.</p></section>
<section class="offers page-projects shell" id="related-work"><div class="section-head"><span>RELATED WORK</span><h2>Built &amp;<br><em>shipped.</em></h2></div><div class="page-project-grid">${page.projects.map(projectCard).join("")}</div><p class="offers-note"><a href="/#work">See all 15 projects with case studies</a></p></section>
${blocks.process}
<section class="offers faq shell" id="faq"><div class="section-head"><span>FAQ</span><h2>Questions<br>founders <em>ask.</em></h2></div><div class="faq-list">${faqs}</div></section>
${blocks.ctaBand}
<footer class="footer shell" id="contact"><span>CONTACT</span><h2>LET’S BUILD<br><em>SOMETHING SOLID.</em></h2>${blocks.contactLinks}${blocks.footerServices}<div class="footer-bottom"><span>© ${today.slice(0, 4)} ${escapeHtml(config.personName)}</span><span>${escapeHtml(config.role)} / ${escapeHtml(config.positioning)}</span><a href="/">Home ↑</a></div></footer>
<a class="mobile-cta" ${bookAttrs}>Book a free 15-min call ↗</a>
</main><script>${landingScript}</script></body></html>
`;
}

// Same behaviour as the homepage script: menu, scroll reveal, availability month, sticky mobile CTA.
const landingScript = `const menuButton=document.querySelector('.menu-toggle'),menu=document.querySelector('#menu');menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')==='true';menuButton.setAttribute('aria-expanded',String(!open));menu.classList.toggle('open')});menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');menuButton.setAttribute('aria-expanded','false')}));const nextMonth=new Date();nextMonth.setMonth(nextMonth.getMonth()+1,1);document.querySelectorAll('.availability-text').forEach(el=>{el.textContent='Booking projects for '+nextMonth.toLocaleString('en-US',{month:'long'})});const targets=document.querySelectorAll('.section-head,.offer,.offers-note,.page-body>article,.page-project,.process-step,.process-promises,.faq-item,.cta-band>*,.proof,.footer>*');targets.forEach(el=>el.classList.add('reveal'));const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.1});targets.forEach(el=>io.observe(el));const mobileCta=document.querySelector('.mobile-cta'),ctaHero=document.querySelector('.page-hero'),ctaContact=document.querySelector('#contact');const seen=new Map();const ctaObserver=new IntersectionObserver(entries=>{entries.forEach(e=>seen.set(e.target,e.isIntersecting));mobileCta.classList.toggle('show',!seen.get(ctaHero)&&!seen.get(ctaContact))});ctaObserver.observe(ctaHero);ctaObserver.observe(ctaContact);`;
