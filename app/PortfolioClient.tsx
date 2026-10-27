"use client";

import { useEffect } from "react";
import portfolioSource from "../index.html?raw";

// index.html is the single source for the page. The intro is left out because it depends on an
// inline script, which never runs from innerHTML; the site-config block is kept so site.js can read it.
const withoutIntro = portfolioSource.replace(/<!--intro-->[\s\S]*?<!--\/intro-->/, "");
const body = withoutIntro.match(/<body[^>]*>([\s\S]*?)<script\b/i)?.[1] ?? "";
const siteConfig = withoutIntro.match(/<script type="application\/json" id="site-config">[\s\S]*?<\/script>/i)?.[0] ?? "";
const portfolioMarkup = (siteConfig + body).replaceAll("/public/", "/");

// Same behaviour as the static site; both scripts guard against running twice.
const SHARED_SCRIPTS = ["/site.js", "/cursor.js"];

export default function PortfolioClient() {
  useEffect(() => {
    SHARED_SCRIPTS.forEach((src) => {
      if (document.querySelector(`script[data-shared-script="${src}"]`)) return;
      const script = document.createElement("script");
      script.src = src;
      script.dataset.sharedScript = src;
      document.body.append(script);
    });
  }, []);

  return <div dangerouslySetInnerHTML={{ __html: portfolioMarkup }} />;
}
