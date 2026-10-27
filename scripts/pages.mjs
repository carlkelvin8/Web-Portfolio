// Content for the SEO service landing pages. scripts/build-static.mjs turns each entry into
// static-dist/<slug>.html and adds it to the sitemap; vercel.json rewrites /<slug> to that file.
// Keep every page's copy unique: each one targets its own search intent.
// Don't restate the related-work cards or the shared "How it works" steps in a page's body copy.

export const offers = {
  mvp: {
    index: "01 / MVP BUILD",
    name: "MVP Build",
    blurb: "From idea to launched product.",
    price: "$4,900",
    timeline: "6-8 weeks",
    includes: ["Scoping", "UI", "Web app", "API", "Deployment"],
    page: "/mvp-development",
  },
  mobile: {
    index: "02 / MOBILE APP + API",
    name: "Mobile App + API",
    blurb: "iOS and Android apps with a solid backend.",
    price: "$7,900",
    timeline: "8-12 weeks",
    includes: ["React Native app", "Backend API", "Auth", "Payments", "Store release"],
    page: "/mobile-app-developer-philippines",
  },
  dashboard: {
    index: "03 / ADMIN DASHBOARD",
    name: "Admin Dashboard",
    blurb: "Internal tools that run your operations.",
    price: "$1,900",
    timeline: "2-4 weeks",
    includes: ["CRUD", "Roles", "Reports", "CSV import/export", "Analytics"],
    page: "/admin-dashboard-developer",
  },
};

export const projects = {
  clinforce: { name: "Clinforce AI", tag: "AI recruitment SaaS", image: "clinforce-ai.webp", url: "https://app.aiclinforce.com", text: "A two-sided healthcare recruitment platform with AI-assisted candidate matching, hiring pipelines, and subscriptions." },
  smartvend: { name: "SmartVend", tag: "Company website · Norway", image: "smartvend-clean.webp", url: "https://smartvend.no", text: "A product-led website for a Norwegian smart-vending business, with machine options, company story, and a clear order path." },
  pili: { name: "Pili AdheSeal", tag: "Product website", image: "pili-adheseal.webp", url: "https://pili-adheseal.com", text: "A company website that explains Filipino-engineered sustainable adhesives to customers, partners, and industry." },
  fpl: { name: "FPL4FLIGHT", tag: "Mobile app + admin SaaS", image: "pilotforms.webp", url: "https://fpl-4-flight-admin.vercel.app", text: "Offline-first aviation paperwork for pilots on mobile, paired with a web admin for forms, subscriptions, and analytics." },
  dropnfly: { name: "DropnFly", tag: "Service platform", image: "dropnfly.webp", url: "https://dropn-fly.vercel.app", text: "Luggage pickup, storage, and delivery booking for travelers, with QR access and live tracking." },
  steam: { name: "STEAM ELMS", tag: "Learning platform", image: "steam-elms.webp", url: "https://steam-elms.vercel.app", text: "A learning management system with courses, quizzes, grades, gamification, and browser-based 3D and VR lessons." },
  lesgo: { name: "LeSgo Courier", tag: "Android app · Google Play", image: "lesgo-courier-home.webp", url: "https://play.google.com/store/apps/details?id=com.lesgo_customer", text: "A courier and delivery app with LesEat food orders, LesBuy grocery shopping, and an in-app LesPay wallet." },
  masterfunds: { name: "MasterFunds", tag: "Fintech mobile app", image: "masterfunds.webp", url: null, text: "A borrower dashboard for loan balances, due dates, payments, credit-score visibility, and transaction history." },
  bangkokfinds: { name: "BangkokFinds", tag: "Commerce admin", image: "bangkokfinds.webp", url: null, text: "A back-office for sales, orders, sellers, inventory, shipping, finance, POS, and CRM, with timezone-aware reporting." },
  achievia: { name: "Achievia Admin", tag: "Learning admin", image: "achievia-admin.webp", url: "https://github.com/carlkelvin8/Achievia-Admin", text: "An admin portal for students, teachers, courses, question banks, quizzes, and academic performance analytics." },
  kalasag: { name: "Kalasag-Tala", tag: "Operations system", image: "kalasag-tala.webp", url: null, text: "A role-based system for enrollment, QR attendance, grades, merits, exams, and program reporting." },
};

export const pages = [
  {
    slug: "freelance-web-developer-philippines",
    title: "Freelance Web Developer Philippines | Carl Kelvin Manahan",
    description:
      "Hire a freelance web developer in the Philippines. Custom web apps, websites, and admin dashboards built with Next.js and Laravel. Fixed prices from $1,900.",
    label: "Freelance web developer",
    h1: ["Freelance web", "developer in the", "*Philippines.*"],
    faqHeading: ["Common", "*questions.*"],
    ctaHeading: ["Your project", "could be *next.*"],
    intro:
      "I’m Carl Kelvin Manahan, a freelance web developer based in the Philippines. I build custom web apps, company websites, and admin dashboards for startups and businesses, from the first sketch to a live product on your domain.",
    serviceType: "Web development",
    areaServed: "Worldwide",
    body: [
      {
        heading: "What I build for the web",
        paragraphs: [
          "Most of my work is custom software that a template can’t handle: marketplaces, SaaS platforms, booking systems, and internal tools with real users and real data. I also build fast, polished websites for companies that need to explain a product clearly and turn visitors into inquiries.",
          "Every project is built with a modern, maintainable stack, usually Next.js and React on the front end and Laravel or Node.js with PostgreSQL on the back end, and deployed to production for you.",
        ],
        list: [
          "Web apps and SaaS platforms with accounts, roles, and payments",
          "Marketplaces and booking platforms",
          "Company and product websites that load fast and are built for search",
          "Admin dashboards and internal tools",
          "APIs and integrations with the services you already use",
        ],
      },
      {
        heading: "Why hire a freelance developer in the Philippines",
        paragraphs: [
          "You work directly with the person writing your code, with no account managers and no hand-offs. We talk in English, and Philippine time (UTC+8) overlaps with Asia and Australia, while calls are easy to schedule in European or US hours.",
          "Pricing is fixed per project, so you know the full cost before work starts. When the project is done, you own 100% of the code.",
        ],
      },
    ],
    offers: ["mvp", "mobile", "dashboard"],
    projects: ["clinforce", "smartvend", "pili", "dropnfly"],
    faqs: [
      ["How much does a freelance web developer cost in the Philippines?", "Rates vary a lot by experience and scope. My projects are fixed price, starting at $1,900 for an admin dashboard, and you get an exact quote after a free 15-min call and scoping."],
      ["Do you build simple websites or only web apps?", "Both. Alongside web apps, I build company and product websites, such as SmartVend and Pili AdheSeal. Tell me what you need on a free call and I’ll recommend the simplest option that does the job."],
      ["Can you work with my existing website or codebase?", "Often, yes. I work with Next.js, React, Vue, Laravel, and Node.js. I’ll review the code first and tell you honestly whether it’s better to extend it or rebuild."],
      ["Will my website work well on mobile and in Google search?", "Yes. Every site I build is responsive, fast, and set up with the technical SEO basics: clean HTML, metadata, structured data, a sitemap, and good Core Web Vitals."],
    ],
  },
  {
    slug: "web-developer-bulacan",
    title: "Web Developer in Bulacan (SJDM) | Carl Kelvin Manahan",
    description:
      "Freelance web and app developer in San Jose del Monte, Bulacan. Web apps, websites, mobile apps, and dashboards for businesses in Bulacan and Metro Manila.",
    label: "Web developer in Bulacan",
    h1: ["Web developer", "in *Bulacan.*"],
    faqHeading: ["Common", "*questions.*"],
    ctaHeading: ["Your project", "could be *next.*"],
    intro:
      "I’m Carl Kelvin Manahan, a freelance web and app developer based in San Jose del Monte, Bulacan. I build web apps, websites, mobile apps, and admin dashboards for businesses in Bulacan, Metro Manila, and anywhere else in the Philippines.",
    serviceType: "Web and app development",
    areaServed: ["San Jose del Monte", "Bulacan", "Metro Manila", "Philippines"],
    body: [
      {
        heading: "A local developer who ships real products",
        paragraphs: [
          "Hiring a developer close to home means calls on your schedule, with no time-zone gaps. You work with me directly from the first call to launch day.",
        ],
        list: [
          "Booking, ordering, and marketplace platforms",
          "Business and product websites",
          "Inventory, sales, and operations dashboards",
          "Android and iOS apps with a backend",
          "Systems for schools and organizations, such as attendance and records",
        ],
      },
    ],
    offers: ["mvp", "mobile", "dashboard"],
    projects: ["lesgo", "pili", "smartvend", "kalasag"],
    faqs: [
      ["Do you work with businesses outside Bulacan?", "Yes. I’m based in San Jose del Monte, Bulacan, and I work with clients in Metro Manila, across the Philippines, and abroad. Calls and progress updates happen online, so location is never a blocker."],
      ["Can we talk in Filipino?", "Yes. Calls and messages can be in Filipino or English, whichever is easier for you and your team."],
      ["What kind of businesses do you build for?", "Startups, service businesses, schools and organizations, and companies that need a website or an internal system, from marketplaces and booking apps to inventory and attendance systems."],
      ["How much does it cost?", "Every project is fixed price, starting at $1,900. See the pricing above for each service; you get an exact quote after a free call and scoping."],
    ],
  },
  {
    slug: "mobile-app-developer-philippines",
    title: "Mobile App Developer Philippines | Carl Kelvin Manahan",
    description:
      "Freelance React Native developer in the Philippines. iOS and Android apps with a backend API, auth, payments, and store release. Fixed price from $7,900.",
    label: "Mobile app developer",
    h1: ["Mobile app", "developer for", "*iOS & Android.*"],
    faqHeading: ["Common", "*questions.*"],
    ctaHeading: ["Your app", "could be *next.*"],
    intro:
      "I build iOS and Android apps with React Native, from the first screen to the store release, together with the backend that powers them.",
    serviceType: "Mobile app development",
    areaServed: "Worldwide",
    body: [
      {
        heading: "One codebase, two app stores",
        paragraphs: [
          "React Native lets one codebase run natively on both iOS and Android, so you launch on both platforms for less than the cost of two separate apps, and every future update ships to both at once.",
          "I handle the whole product, not only the screens: the backend API, data model, auth, push notifications, payments or subscriptions, and the store release process.",
        ],
        list: [
          "Consumer apps with accounts, wallets, and payments",
          "Offline-first apps that sync when connectivity returns",
          "Booking and on-demand service apps",
          "Companion admin dashboards for your team",
          "Google Play and App Store release",
        ],
      },
    ],
    offers: ["mobile", "mvp"],
    projects: ["lesgo", "fpl", "masterfunds", "clinforce"],
    faqs: [
      ["How much does it cost to build a mobile app in the Philippines?", "My mobile app projects are fixed price, starting at $7,900 for an iOS and Android app with a backend API, auth, payments, and store release. The exact price depends on features, and you get a fixed quote after scoping."],
      ["Do you build native apps or React Native?", "React Native. It renders real native components, so the app looks and feels native on both platforms, and for most startups it’s faster and more affordable than two separate native apps."],
      ["Can you publish the app to Google Play and the App Store?", "Yes. Store release is included: builds, listings, and the submission process. Your app is published under your own developer accounts, so you keep full ownership."],
      ["Do you also build the backend?", "Yes, it’s part of every mobile build, so you get one complete product instead of an app waiting on someone else’s API."],
    ],
  },
  {
    slug: "admin-dashboard-developer",
    title: "Admin Dashboard Developer | Carl Kelvin Manahan",
    description:
      "Custom admin dashboards and internal tools: CRUD, roles, reports, CSV import/export, and analytics. Built by a freelance developer. Fixed price from $1,900.",
    label: "Admin dashboard developer",
    h1: ["Admin dashboards", "that run your", "*operations.*"],
    faqHeading: ["Common", "*questions.*"],
    ctaHeading: ["Your dashboard", "could be *next.*"],
    intro:
      "Spreadsheets break once a business grows. I build custom admin dashboards and internal tools that give your team one place to manage records, permissions, reports, and day-to-day operations.",
    serviceType: "Admin dashboard development",
    areaServed: "Worldwide",
    body: [
      {
        heading: "What a custom dashboard can do",
        paragraphs: [
          "A good internal tool fits the way your team already works, instead of forcing everyone into a generic template, with the roles, workflows, and reports your business actually needs.",
        ],
        list: [
          "Create, edit, and search records with clean CRUD screens",
          "Roles and permissions so each person sees the right data",
          "Reports and analytics with filters and date ranges",
          "CSV import and export for bulk data",
          "Integrations with your existing app, database, or API",
        ],
      },
    ],
    offers: ["dashboard", "mvp"],
    projects: ["bangkokfinds", "achievia", "kalasag", "fpl"],
    faqs: [
      ["How much does a custom admin dashboard cost?", "Admin dashboards start at $1,900, fixed price, for a typical 2-4 week build with CRUD, roles, reports, CSV import/export, and analytics. Larger dashboards with more workflows are quoted after scoping."],
      ["Can you build a dashboard on top of my existing database?", "Yes. I can connect to your existing database or API and build the admin layer on top, so you don’t need to migrate your data."],
      ["Why not use a no-code tool instead?", "No-code tools are great for simple cases. A custom dashboard makes sense when you need specific workflows, fine-grained permissions, better performance, or no per-seat monthly fees. On a free call I’ll tell you honestly which fits."],
      ["Who can access the dashboard?", "Only the people you allow. Admins, staff, and other roles each see and do only what their role permits."],
    ],
  },
  {
    slug: "mvp-development",
    title: "MVP Development for Startups | Carl Kelvin Manahan",
    description:
      "MVP development for startup founders: scoping, UI, web app, API, and deployment in 6-8 weeks. Fixed price from $4,900, and you own 100% of the code.",
    label: "MVP development",
    h1: ["MVP development", "for *startup founders.*"],
    faqHeading: ["Questions", "founders *ask.*"],
    ctaHeading: ["Your MVP", "could be *next.*"],
    intro:
      "You have an idea and need a real product in front of users, fast, without cutting corners. I take MVPs from idea to launch: scoping, UI, the web app, the API, and deployment, for one fixed price.",
    serviceType: "MVP development",
    areaServed: "Worldwide",
    body: [
      {
        heading: "What you get",
        paragraphs: [
          "An MVP should prove one thing: that people want what you’re building. I help you cut the scope down to the features that test that, then build them properly, so the product is solid enough to grow instead of something you have to throw away.",
        ],
        list: [
          "Scoping: features, screens, and milestones in a written plan",
          "UI design for the core flows",
          "Web app with accounts, data, and your key feature",
          "Backend API and database",
          "Deployment to production on your domain",
        ],
      },
      {
        heading: "Built for what comes after launch",
        paragraphs: [
          "Every MVP is built on a modern stack, typically Next.js, React, and Laravel or Node.js with PostgreSQL, so you can hire more developers later without a rewrite. You own 100% of the code, and the first month after launch includes free support for fixes and small changes.",
        ],
      },
    ],
    offers: ["mvp", "mobile"],
    projects: ["clinforce", "dropnfly", "steam", "fpl"],
    faqs: [
      ["How much does it cost to build an MVP?", "My MVP builds start at $4,900, fixed price, for scoping, UI, web app, API, and deployment. You get an exact quote after a free 15-min call and scoping."],
      ["How long does it take to build an MVP?", "A typical MVP takes 6-8 weeks from signed scope to launch. Smaller scopes can be faster; a mobile app with an API usually takes 8-12 weeks."],
      ["What if I only have an idea?", "That’s the normal starting point. Scoping is part of the work: together we turn the idea into features, screens, and a plan before any code is written."],
      ["Will I be able to scale the MVP later?", "Yes. Clean structure on mainstream frameworks means other developers can pick it up and you can keep building on it after launch."],
    ],
  },
];
