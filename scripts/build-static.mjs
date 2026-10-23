import { cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const output = resolve(root, "static-dist");

await rm(output, { recursive: true, force: true });
await mkdir(resolve(output, "app"), { recursive: true });
await cp(resolve(root, "public"), resolve(output, "public"), { recursive: true });

// The Tailwind import only resolves inside the vinext/PostCSS build; in the static site it is a 404 request.
const css = await readFile(resolve(root, "app/globals.css"), "utf8");
await writeFile(resolve(output, "app/globals.css"), css.replace(/^@import "tailwindcss";\s*/, ""));

const source = await readFile(resolve(root, "index.html"), "utf8");
const configMatch = source.match(/<script type="application\/json" id="site-config">([\s\S]*?)<\/script>/);
if (!configMatch) throw new Error("index.html is missing the site-config block");
const config = JSON.parse(configMatch[1]);
const siteUrl = config.siteUrl.replace(/\/$/, "");
const today = new Date().toISOString().slice(0, 10);

const person = {
  "@type": "Person",
  "@id": `${siteUrl}/#person`,
  name: config.personName,
  url: `${siteUrl}/`,
  image: `${siteUrl}/public/carl-kelvin-portrait.webp`,
  jobTitle: config.role,
  description:
    "Freelance software engineer from the Philippines who builds MVPs, mobile apps, and admin dashboards for startup founders.",
  email: `mailto:${config.email}`,
  address: { "@type": "PostalAddress", addressCountry: "PH" },
  nationality: { "@type": "Country", name: "Philippines" },
  knowsAbout: [
    "MVP development",
    "Web application development",
    "Mobile app development",
    "Admin dashboards",
    "Next.js",
    "React",
    "React Native",
    "Laravel",
    "Node.js",
    "Supabase",
    "PostgreSQL",
    "AI integrations",
  ],
  sameAs: config.sameAs ?? [],
};

const services = [
  ["MVP Build", "From idea to launched product: scoping, UI, web app, API, and deployment. Typical timeline 6-8 weeks."],
  ["Mobile App + API", "iOS and Android apps with a solid backend: React Native app, backend API, auth, payments, and store release. Typical timeline 8-12 weeks."],
  ["Admin Dashboard", "Internal tools that run your operations: CRUD, roles, reports, CSV import/export, and analytics. Typical timeline 2-4 weeks."],
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: `${siteUrl}/`,
      name: config.personName,
      inLanguage: "en",
      publisher: { "@id": `${siteUrl}/#person` },
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profile`,
      url: `${siteUrl}/`,
      name: `${config.personName} | Freelance MVP Developer`,
      isPartOf: { "@id": `${siteUrl}/#website` },
      mainEntity: { "@id": `${siteUrl}/#person` },
      dateModified: today,
      inLanguage: "en",
    },
    person,
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#service`,
      name: `${config.personName} — Freelance MVP Development`,
      url: `${siteUrl}/`,
      image: `${siteUrl}/public/og-image.png`,
      email: config.email,
      address: { "@type": "PostalAddress", addressCountry: "PH" },
      areaServed: "Worldwide",
      founder: { "@id": `${siteUrl}/#person` },
      potentialAction: { "@type": "ReserveAction", target: config.BOOKING_URL, name: "Book a free 15-min call" },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services for startup founders",
        itemListElement: services.map(([name, description]) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name, description, provider: { "@id": `${siteUrl}/#person` } },
        })),
      },
    },
  ],
};

const html = source
  .replaceAll("%SITE_URL%", siteUrl)
  .replace("<!--%JSON_LD%-->", `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>`);
await writeFile(resolve(output, "index.html"), html);

await writeFile(
  resolve(output, "robots.txt"),
  `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
);
await writeFile(
  resolve(output, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${siteUrl}/</loc>
    <lastmod>${today}</lastmod>
    <image:image><image:loc>${siteUrl}/public/carl-kelvin-portrait.webp</image:loc></image:image>
  </url>
</urlset>
`,
);
await cp(resolve(root, "404.html"), resolve(output, "404.html"));

console.log(`Static portfolio prepared in static-dist for ${siteUrl}`);
