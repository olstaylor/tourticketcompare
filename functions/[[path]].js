const TRUST_ROUTES = {
  "/": {
    title: "2026/27 Stadium Tour Market Watch | TourTicketCompare",
    description:
      "Independent fan-made stadium tour watch for major artists, official API data where configured, and verified links only.",
    indexable: true
  },
  "/artists": {
    title: "Artists | TourTicketCompare",
    description:
      "Browse known artist pages in the 2026/27 stadium tour watch. Links appear only when a real destination is configured.",
    indexable: true,
    breadcrumb: [{ name: "Artists", path: "/artists" }]
  },
  "/guides": {
    title: "Concert Ticket Buying Guides | TourTicketCompare",
    description:
      "Practical guides for checking concert ticket links, fees, resale risks, provider differences, and checkout terms.",
    indexable: true,
    breadcrumb: [{ name: "Guides", path: "/guides" }]
  },
  "/how-it-works": {
    title: "How TourTicketCompare Works",
    description:
      "How TourTicketCompare verifies artist pages, provider buttons, disclosures, and ticket data before publishing public links.",
    indexable: true,
    faq: true,
    breadcrumb: [{ name: "How it works", path: "/how-it-works" }]
  },
  "/about": {
    title: "About TourTicketCompare",
    description:
      "TourTicketCompare is an independent, unofficial fan-made stadium tour ticket resource built around official sources where available.",
    indexable: true,
    breadcrumb: [{ name: "About", path: "/about" }]
  },
  "/contact": {
    title: "Contact TourTicketCompare",
    description: "Contact TourTicketCompare about provider links, artist data, corrections, partnerships, or editorial questions.",
    indexable: true,
    breadcrumb: [{ name: "Contact", path: "/contact" }]
  },
  "/editorial-policy": {
    title: "Editorial Policy | TourTicketCompare",
    description:
      "The editorial rules TourTicketCompare follows before publishing artist facts, tour pages, provider links, prices, or availability.",
    indexable: true,
    breadcrumb: [{ name: "Editorial policy", path: "/editorial-policy" }]
  },
  "/affiliate-disclosure": {
    title: "Affiliate Disclosure | TourTicketCompare",
    description:
      "TourTicketCompare may earn commission from verified provider links without changing the price you pay.",
    indexable: true,
    breadcrumb: [{ name: "Affiliate disclosure", path: "/affiliate-disclosure" }]
  }
};

const GUIDE_ROUTES = {
  "/guides/how-to-compare-concert-ticket-prices": {
    title: "How to Compare Concert Ticket Prices | TourTicketCompare",
    h1: "How to check concert ticket links safely",
    description:
      "Learn how to check concert ticket links safely by reviewing provider sources, fees, availability, and final checkout totals."
  },
  "/guides/ticketmaster-vs-seatgeek-vs-vivid-seats": {
    title: "Ticketmaster vs SeatGeek vs Vivid Seats | TourTicketCompare",
    h1: "Ticketmaster vs SeatGeek vs Vivid Seats",
    description:
      "Understand how Ticketmaster, SeatGeek, and Vivid Seats can differ by inventory source, fees, checkout flow, and availability."
  },
  "/guides/how-to-avoid-overpaying-for-concert-tickets": {
    title: "How to Avoid Overpaying for Concert Tickets | TourTicketCompare",
    h1: "How to avoid overpaying for concert tickets",
    description:
      "Practical checks for avoiding unclear fees, speculative listings, placeholder ticket links, and unsupported ticket-price claims."
  },
  "/guides/when-is-the-best-time-to-buy-concert-tickets": {
    title: "Best Time to Buy Concert Tickets | TourTicketCompare",
    h1: "When is the best time to buy concert tickets?",
    description:
      "Learn how timing can affect concert ticket buying decisions without relying on fake scarcity or invented pricing trends."
  },
  "/guides/primary-vs-resale-concert-tickets": {
    title: "Primary vs Resale Concert Tickets | TourTicketCompare",
    h1: "Primary vs resale concert tickets",
    description:
      "A clear guide to primary and resale concert tickets, including fees, delivery, speculative listings, and checkout checks."
  }
};

const OLD_GUIDE_REDIRECTS = {
  "/guides/compare-ticket-prices-safely": "/guides/how-to-compare-concert-ticket-prices",
  "/guides/why-ticket-prices-vary": "/guides/ticketmaster-vs-seatgeek-vs-vivid-seats",
  "/guides/avoid-overpaying-concert-tickets": "/guides/how-to-avoid-overpaying-for-concert-tickets",
  "/guides/best-time-to-buy-concert-tickets": "/guides/when-is-the-best-time-to-buy-concert-tickets"
};

const RESERVED_PREFIXES = ["/api/", "/data/"];
const RESERVED_FILES = new Set(["/app.js", "/styles.css", "/favicon.svg", "/robots.txt", "/sitemap.xml"]);

function escapeAttr(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeHtml(value) {
  return escapeAttr(value).replace(/'/g, "&#39;");
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function loadCatalog(env) {
  try {
    const response = await env.ASSETS.fetch(new Request("https://assets.local/data/catalog.json"));
    if (!response.ok) return { artists: [], tours: [] };
    const data = await response.json();
    return data && typeof data === "object" ? data : { artists: [], tours: [] };
  } catch (error) {
    return { artists: [], tours: [] };
  }
}

function normalizePath(pathname) {
  if (pathname !== "/" && pathname.endsWith("/")) return pathname.replace(/\/+$/, "");
  return pathname || "/";
}

function findArtist(catalog, slug) {
  return (catalog.artists || []).find((row) => slugify(row.slug) === slug);
}

function findTour(catalog, artistSlug, tourSlug) {
  return (catalog.tours || []).find((row) => slugify(row.artist_slug) === artistSlug && slugify(row.slug) === tourSlug);
}

async function routeForPath(pathname, env) {
  const path = normalizePath(pathname);
  if (OLD_GUIDE_REDIRECTS[path]) return { type: "redirect", location: OLD_GUIDE_REDIRECTS[path] };
  if (TRUST_ROUTES[path]) return { type: "static", path, ...TRUST_ROUTES[path] };
  if (GUIDE_ROUTES[path]) {
    return {
      type: "guide",
      path,
      indexable: true,
      ...GUIDE_ROUTES[path],
      breadcrumb: [
        { name: "Guides", path: "/guides" },
        { name: GUIDE_ROUTES[path].title.replace(" | TourTicketCompare", ""), path }
      ]
    };
  }

  const catalog = await loadCatalog(env);
  const artistMatch = path.match(/^\/artists\/([a-z0-9-]+)$/);
  if (artistMatch) {
    const artist = findArtist(catalog, artistMatch[1]);
    if (!artist) return null;
    return {
      type: "artist",
      path,
      indexable: true,
      title: artist.seo_title || `${artist.name} Tickets | Options & Availability`,
      description:
        artist.meta_description ||
        `Check ${artist.name} watchlist notes and verified provider links where configured. No fake prices or invented tour dates.`,
      artist,
      breadcrumb: [
        { name: "Artists", path: "/artists" },
        { name: artist.name, path }
      ]
    };
  }

  const ticketDuplicateMatch = path.match(/^\/artists\/([a-z0-9-]+)\/tickets$/);
  if (ticketDuplicateMatch) {
    const artist = findArtist(catalog, ticketDuplicateMatch[1]);
    if (artist) return { type: "redirect", location: `/artists/${artist.slug}` };
  }

  const tourMatch = path.match(/^\/artists\/([a-z0-9-]+)\/([a-z0-9-]+)$/);
  if (tourMatch) {
    const artist = findArtist(catalog, tourMatch[1]);
    const tour = artist ? findTour(catalog, artist.slug, tourMatch[2]) : null;
    if (!artist || !tour) return null;
    return {
      type: "tour",
      path,
      indexable: tour.verified === true,
      title: tour.seo_title || `${tour.tour_name} Tickets | TourTicketCompare`,
      description: tour.meta_description || `Verified ticket information for ${tour.tour_name} by ${artist.name}.`,
      artist,
      tour,
      breadcrumb: [
        { name: "Artists", path: "/artists" },
        { name: artist.name, path: `/artists/${artist.slug}` },
        { name: tour.tour_name, path }
      ]
    };
  }

  const legacyTicketRoute = path.match(/^\/([a-z0-9-]+)-tickets(?:-[a-z0-9-]+)?$/);
  if (legacyTicketRoute) {
    const artist = findArtist(catalog, legacyTicketRoute[1]);
    if (artist) return { type: "redirect", location: `/artists/${artist.slug}` };
  }

  const legacyArtistRoute = path.match(/^\/([a-z0-9-]+)$/);
  if (legacyArtistRoute) {
    const artist = findArtist(catalog, legacyArtistRoute[1]);
    if (artist) return { type: "redirect", location: `/artists/${artist.slug}` };
  }

  return null;
}

function baseSchema(origin) {
  return [
    {
      "@type": "Organization",
      name: "TourTicketCompare",
      url: `${origin}/`
    },
    {
      "@type": "WebSite",
      name: "TourTicketCompare",
      url: `${origin}/`,
      description: "Independent fan-made stadium tour market watch using official-source data where configured and verified links only."
    }
  ];
}

function faqSchema(route) {
  const questions =
    route.type === "artist"
      ? [
          [
            `Does this page list ${route.artist.name} tour dates?`,
            "No. This page does not publish tour dates unless event data has been verified. Use the configured provider link to check current platform information."
          ],
          [`Does TourTicketCompare sell ${route.artist.name} tickets?`, "No. TourTicketCompare does not sell tickets directly."],
          ["Are prices shown here?", "No. Prices should appear only when live provider data is verified and timestamped."]
        ]
      : [
          ["Is TourTicketCompare official?", "No. TourTicketCompare is independent and unofficial."],
          ["Why are some providers hidden?", "Provider buttons are hidden until a verified destination and safe redirect route are configured."],
          ["Can final prices and fees change?", "Yes. External ticketing sites set their own prices, fees, availability, and checkout terms."]
        ];

  return {
    "@type": "FAQPage",
    mainEntity: questions.map(([name, answer]) => ({
      "@type": "Question",
      name,
      acceptedAnswer: { "@type": "Answer", text: answer }
    }))
  };
}

function breadcrumbSchema(route, origin) {
  const items = [{ name: "Home", path: "/" }].concat(route.breadcrumb || []);
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${origin}${item.path}`
    }))
  };
}

function artistSchema(route, origin) {
  const type = route.artist.slug === "bts" ? "MusicGroup" : "Person";
  return {
    "@type": type,
    name: route.artist.name,
    url: `${origin}${route.path}`,
    sameAs: route.artist.official_website ? [route.artist.official_website] : undefined,
    description: route.artist.factual_summary
  };
}

function articleSchema(route, origin) {
  return {
    "@type": "Article",
    headline: route.title.replace(" | TourTicketCompare", ""),
    description: route.description,
    mainEntityOfPage: `${origin}${route.path}`,
    publisher: {
      "@type": "Organization",
      name: "TourTicketCompare",
      url: `${origin}/`
    }
  };
}

function routeSchema(route, origin) {
  const graph = baseSchema(origin);
  if (route.breadcrumb) graph.push(breadcrumbSchema(route, origin));
  if (route.type === "artist") graph.push(artistSchema(route, origin), faqSchema(route));
  if (route.type === "guide") graph.push(articleSchema(route, origin), faqSchema(route));
  if (route.faq) graph.push(faqSchema(route));
  return { "@context": "https://schema.org", "@graph": graph };
}

function providerEnabled(catalog, providerSlug) {
  return (catalog.providers || []).some((provider) => slugify(provider.slug) === providerSlug && provider.public_enabled === true);
}

function ticketLinksForArtist(catalog, artistSlug) {
  return (catalog.ticket_links || []).filter(
    (item) =>
      slugify(item.artist_slug) === artistSlug &&
      item.verified === true &&
      item.public_enabled === true &&
      item.affiliate_enabled === true &&
      providerEnabled(catalog, slugify(item.provider))
  );
}

function anchor(label, href, className = "text-link") {
  return `<a class="${escapeAttr(className)}" href="${escapeAttr(href)}">${escapeHtml(label)}</a>`;
}

function renderBreadcrumbHtml(route) {
  const items = [{ name: "Home", path: "/" }].concat(route.breadcrumb || []);
  return `<nav class="breadcrumbs" aria-label="Breadcrumb"><ol>${items
    .map((item, index) => {
      if (index === items.length - 1) return `<li aria-current="page">${escapeHtml(item.name)}</li>`;
      return `<li>${anchor(item.name, item.path, "")}</li>`;
    })
    .join("")}</ol></nav>`;
}

function renderArtistLinks(catalog) {
  return `<div class="artist-card-grid">${(catalog.artists || [])
    .map(
      (artist) =>
        `<article class="artist-card"><h3>${escapeHtml(artist.name)}</h3><p class="muted">${escapeHtml(
          artist.short_description || "Artist watchlist notes."
        )}</p>${anchor("Open artist watch", `/artists/${artist.slug}`, "button button-primary")}</article>`
    )
    .join("")}</div>`;
}

function renderGuideLinks() {
  return `<div class="card-grid guide-grid">${Object.entries(GUIDE_ROUTES)
    .map(
      ([path, guide]) =>
        `<article class="info-card"><h3>${escapeHtml(guide.h1)}</h3><p>${escapeHtml(guide.description)}</p>${anchor(
          "Read guide",
          path,
          "text-link"
        )}</article>`
    )
    .join("")}</div>`;
}

function renderProviderFallback(catalog, artist, surface) {
  const links = ticketLinksForArtist(catalog, artist.slug);
  if (!links.length) {
    return `<section class="provider-panel"><h2>Verified ticket links</h2><p class="muted">No verified ticket links are available yet. Check back later or follow for updates.</p></section>`;
  }
  const cards = links
    .map((item) => {
      const provider = slugify(item.provider);
      const label = provider === "ticketmaster" ? "View tickets on Ticketmaster" : `View tickets on ${item.provider}`;
      const params = new URLSearchParams({
        artistSlug: artist.slug,
        provider,
        sourcePath: `/artists/${artist.slug}`,
        surface
      });
      return `<article class="provider-card"><h3>${escapeHtml(label.replace("View tickets on ", ""))}</h3><p>Provider sets prices, fees, availability, and checkout terms.</p>${anchor(
        label,
        `/api/out?${params.toString()}`,
        "button button-primary"
      )}</article>`;
    })
    .join("");
  return `<section class="provider-panel"><h2>Verified ticket links</h2><div class="provider-actions">${cards}</div><p class="disclosure-note">Affiliate link. We may earn a commission at no extra cost to you.</p><p class="disclosure-note">Final prices, fees and availability are confirmed on the ticketing platform.</p></section>`;
}

function renderMainContent(route, catalog) {
  if (route.type === "artist") {
    const artist = route.artist;
    return `<main id="mainContent"><section class="content-page artist-page" aria-labelledby="artistTitle">${renderBreadcrumbHtml(
      route
    )}<h1 id="artistTitle">${escapeHtml(
      artist.name
    )} stadium tour watch</h1><p class="lead">Use this page to check ${escapeHtml(
      artist.name
    )} watchlist notes and verified ticket destinations. We only show provider buttons when a destination has been configured and checked.</p>${renderProviderFallback(
      catalog,
      artist,
      "artist_hero"
    )}<section class="split-section"><div><h2>About ${escapeHtml(
      artist.name
    )}</h2><p>${escapeHtml(artist.factual_summary)}</p></div><div><h2>Verified destination status</h2><p>${escapeHtml(
      artist.ticket_buying_notes
    )}</p><p class="disclosure-note">We do not sell tickets directly. We route users to external ticketing platforms only when the link is verified.</p></div></section><section class="nested-panel"><h2>Ticket buying checklist</h2><ul class="check-list"><li>Check the final price including fees before paying.</li><li>Check the seat location, section, row, and any view restrictions.</li><li>Check resale terms and buyer protections if the ticket is listed by a third party.</li><li>Check the delivery method and expected transfer timing.</li><li>Check refund, cancellation, and event-change terms on the provider site.</li></ul></section><section class="nested-panel"><h2>About this page</h2><p>This page does not list unverified tour dates, invented prices, speculative venues, or placeholder checkout links. Ticket details should be confirmed on the ticketing platform before purchase.</p></section><section class="nested-panel"><h2>Useful links</h2><div class="mini-link-grid">${anchor(
      "All artists",
      "/artists",
      "mini-link"
    )}${anchor("Ticket buying guides", "/guides", "mini-link")}${anchor(
      "How it works",
      "/how-it-works",
      "mini-link"
    )}${anchor(
      "Affiliate disclosure",
      "/affiliate-disclosure",
      "mini-link"
    )}</div></section><section class="nested-panel faq-panel"><h2>${escapeHtml(
      artist.name
    )} ticket FAQ</h2><details><summary>Does this page list ${escapeHtml(
      artist.name
    )} tour dates?</summary><p>No. This page does not publish tour dates unless event data has been verified. Use the configured provider link to check current platform information.</p></details><details><summary>Does TourTicketCompare sell ${escapeHtml(
      artist.name
    )} tickets?</summary><p>No. TourTicketCompare does not sell tickets directly. We link to external ticketing platforms when a route is verified.</p></details><details><summary>Are prices shown here?</summary><p>No. Prices should appear only when live provider data is verified and timestamped. Final prices and fees are controlled by the ticket platform.</p></details></section></section></main>`;
  }

  if (route.type === "guide") {
    return `<main id="mainContent"><section class="content-page guide-page" aria-labelledby="guideTitle">${renderBreadcrumbHtml(
      route
    )}<h1 id="guideTitle">${escapeHtml(route.h1 || route.title.replace(" | TourTicketCompare", ""))}</h1><p class="lead">${escapeHtml(
      route.description
    )}</p><section class="nested-panel"><h2>What this guide covers</h2><p>This guide explains ticket-provider differences, checkout checks, fees, availability changes, and affiliate-link disclosures without inventing prices or event listings.</p></section><div class="action-row">${anchor(
      "Browse artists",
      "/artists",
      "button button-primary"
    )}${anchor("How it works", "/how-it-works", "button button-secondary")}</div></section></main>`;
  }

  if (route.path === "/artists") {
    return `<main id="mainContent"><section class="content-page" aria-labelledby="artistsTitle">${renderBreadcrumbHtml(
      route
    )}<h1 id="artistsTitle">Artist watchlist</h1><p>Browse the controlled TourTicketCompare watchlist. Artist pages are published only for known slugs and use official-source event data or reviewed local records when show cards are available.</p><p>A listed artist does not mean TourTicketCompare has confirmed current tickets, prices, venues, or availability. Event buttons appear only when a verified event-specific destination is stored.</p>${renderArtistLinks(
      catalog
    )}<section class="nested-panel"><h2>Publishing status</h2><p>Known artist pages remain useful as watch pages even when no verified future event cards are loaded. Unknown artist routes return a 404 instead of generating thin pages.</p></section></section></main>`;
  }

  if (route.path === "/guides") {
    return `<main id="mainContent"><section class="content-page" aria-labelledby="guidesTitle">${renderBreadcrumbHtml(
      route
    )}<h1 id="guidesTitle">Ticket buying guides</h1><p>Use these evergreen guides to understand official and resale ticket links, checkout fees, delivery terms, resale risks, and affiliate disclosures before leaving TourTicketCompare.</p><p>The guides do not claim live price comparison or guaranteed availability. They are designed to help you verify details on the ticketing platform before purchase.</p>${renderGuideLinks()}<div class="action-row">${anchor(
      "Browse artists",
      "/artists",
      "button button-primary"
    )}${anchor("How it works", "/how-it-works", "button button-secondary")}</div></section></main>`;
  }

  const simplePages = {
    "/how-it-works": [
      "How TourTicketCompare works",
      "TourTicketCompare publishes only useful ticket-watch information that can be checked against official sources, verified local records, or configured provider routes.",
      "Event cards come from reviewed local data or official APIs where configured. Event buttons stay event-specific, use server-side affiliate routing through /api/out, and never rely on scraping or invented dates, venues, prices, availability, or Event schema."
    ],
    "/about": [
      "About TourTicketCompare",
      "TourTicketCompare is an independent, unofficial stadium tour market watch built around official sources where configured, verified links, and clear disclosures.",
      "The site does not sell tickets directly and does not publish invented dates, prices, venues, or availability."
    ],
    "/contact": [
      "Contact",
      "Contact TourTicketCompare about source corrections, event-link issues, provider partnerships, or editorial questions.",
      "Email hello@tourticketcompare.com. Please include the artist, event date, source URL, and what needs checking when sending a correction."
    ],
    "/editorial-policy": [
      "Editorial policy",
      "TourTicketCompare publishes factual artist-watch content and verified event cards only when the source can be checked.",
      "We use official artist sources, official APIs, reviewed local records, and affiliate feeds where available. We do not scrape, invent tour dates, publish fake prices, or add Event schema without verified event data."
    ],
    "/affiliate-disclosure": [
      "Affiliate disclosure",
      "Some outbound ticket links may be affiliate links. We may earn a commission if you click through and buy tickets, at no extra cost to you.",
      "Affiliate relationships do not control provider prices, fees, availability, seat details, delivery terms, refund rules, or checkout decisions. TourTicketCompare remains independent and does not sell tickets directly."
    ]
  };

  if (simplePages[route.path]) {
    const [h1, lead, body] = simplePages[route.path];
    return `<main id="mainContent"><section class="content-page" aria-labelledby="pageTitle">${renderBreadcrumbHtml(
      route
    )}<h1 id="pageTitle">${escapeHtml(h1)}</h1><p class="lead">${escapeHtml(lead)}</p><p>${escapeHtml(
      body
    )}</p><div class="action-row">${anchor("Browse artists", "/artists", "button button-primary")}${anchor(
      "Read buying guides",
      "/guides",
      "button button-secondary"
    )}</div></section></main>`;
  }

  return `<main id="mainContent"><section class="hero-panel" aria-labelledby="heroTitle"><div class="hero-copy-block"><h1 class="hero-title" id="heroTitle">2026/27 stadium tour market watch</h1><p class="hero-subcopy">An independent fan-made watchlist for major stadium tours. We show official-source event data and verified ticket links only when they are available.</p><div class="action-row">${anchor(
    "Browse artists",
    "/artists",
    "button button-primary"
  )}${anchor("How it works", "/how-it-works", "button button-secondary")}</div></div><aside class="trust-ledger" aria-label="Publishing rules"><h2>Market watch rules</h2><p>No invented dates, venues, prices, or availability</p><p>Official APIs and affiliate feeds only; no scraping</p><p>Placeholder links are never shown as ticket buttons</p><p>Final prices and fees are confirmed by the ticketing platform</p></aside></section></main>`;
}

function injectRoute(html, route, origin, catalog) {
  const canonicalUrl = `${origin}${route.path}`;
  const robots = route.indexable ? "index,follow,max-image-preview:large" : "noindex,follow";
  let next = html;
  next = next.replace(/<title>[^<]*<\/title>/i, `<title>${escapeAttr(route.title)}</title>`);
  next = next.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${escapeAttr(route.description)}" />`
  );
  next = next.replace(
    /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="robots" content="${robots}" />`
  );
  next = next.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${escapeAttr(route.title)}" />`
  );
  next = next.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${escapeAttr(route.description)}" />`
  );
  next = next.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${escapeAttr(canonicalUrl)}" />`
  );
  next = next.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:title" content="${escapeAttr(route.title)}" />`
  );
  next = next.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:description" content="${escapeAttr(route.description)}" />`
  );
  next = next.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${escapeAttr(canonicalUrl)}" />`
  );
  next = next.replace(
    /<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/i,
    `<script type="application/ld+json">${JSON.stringify(routeSchema(route, origin))}</script>`
  );
  next = next.replace(/<main\s+id="mainContent">[\s\S]*?<\/main>/i, renderMainContent(route, catalog));
  return next;
}

function renderNotFoundHtml(html, pathname, origin) {
  const route = {
    type: "not-found",
    path: pathname,
    title: "Page Not Found | TourTicketCompare",
    description: "This TourTicketCompare page is not published.",
    indexable: false
  };
  let next = injectRoute(html, route, origin, { artists: [], ticket_links: [], providers: [] });
  next = next.replace(
    /<main\s+id="mainContent">[\s\S]*?<\/main>/i,
    `<main id="mainContent"><section class="content-page" aria-labelledby="notFoundTitle"><h1 id="notFoundTitle">Page not found</h1><p>This route is not published. Use the artist index or guides to find current public pages.</p><div class="action-row">${anchor(
      "Browse artists",
      "/artists",
      "button button-primary"
    )}${anchor("Return home", "/", "button button-secondary")}</div></section></main>`
  );
  return next;
}

export async function onRequest(context) {
  const { request, env, next } = context;
  const url = new URL(request.url);
  const pathname = normalizePath(url.pathname);

  if (RESERVED_PREFIXES.some((prefix) => pathname.startsWith(prefix)) || RESERVED_FILES.has(pathname)) return next();

  const route = await routeForPath(pathname, env);
  if (!route && /\.[a-z0-9]+$/i.test(pathname)) return next();
  const indexResponse = await env.ASSETS.fetch(new Request(new URL("/index.html", request.url), request));
  if (!indexResponse.ok) return next();

  const html = await indexResponse.text();
  if (!route) {
    const injected404 = renderNotFoundHtml(html, pathname, url.origin);
    const headers = new Headers(indexResponse.headers);
    headers.set("Content-Type", "text/html; charset=UTF-8");
    headers.set("Cache-Control", "no-store");
    return new Response(injected404, { status: 404, headers });
  }

  if (route.type === "redirect") {
    return Response.redirect(new URL(route.location, url.origin).toString(), 301);
  }

  const catalog = await loadCatalog(env);
  const injected = injectRoute(html, route, url.origin, catalog);
  const headers = new Headers(indexResponse.headers);
  headers.set("Content-Type", "text/html; charset=UTF-8");
  headers.set("Cache-Control", "public, max-age=300");
  return new Response(injected, { status: 200, headers });
}
