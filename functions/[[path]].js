import { TRUST_ROUTES, GUIDE_ROUTES, OLD_GUIDE_REDIRECTS, CANONICAL_HOST, canonicalOrigin } from "./_route-metadata.js";

const PUBLIC_HTML_ROUTES = new Set([
  "/artists",
  "/compare-concert-ticket-prices",
  "/guides",
  "/how-it-works",
  "/affiliate-disclosure",
  "/editorial-policy",
  "/about",
  "/contact"
]);

const RESERVED_PREFIXES = ["/api/", "/data/"];
const RESERVED_FILES = new Set(["/app.js", "/styles.css", "/favicon.svg", "/robots.txt", "/sitemap.xml"]);

// _headers applies to static-asset responses only, not to function-generated responses.
// These headers must be set explicitly on every HTML Response returned by this function.
const SECURITY_HEADERS = {
  // The sha256 hash authorizes the inline Google tag (gtag.js) snippet in public/index.html;
  // recompute it if that snippet's contents change (see scripts/smoke-prelaunch.mjs EXPECTED_CSP).
  "Content-Security-Policy":
    "default-src 'self'; img-src 'self' data: https://*.google-analytics.com https://*.googletagmanager.com; style-src 'self'; script-src 'self' 'sha256-NA6Fs6EENO5v4wTsp2imB+jef7W4UHySG38JuT59oy0=' https://*.googletagmanager.com; connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com; base-uri 'self'; frame-ancestors 'none'; object-src 'none'",
  "Referrer-Policy": "no-referrer",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Permissions-Policy": "interest-cohort=()",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "same-origin"
};

function applySecurityHeaders(headers) {
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
    headers.set(name, value);
  }
}

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

async function loadEvents(env) {
  try {
    const response = await env.ASSETS.fetch(new Request("https://assets.local/data/events.json"));
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    return [];
  }
}

async function loadArtistsMeta(env) {
  try {
    const response = await env.ASSETS.fetch(new Request("https://assets.local/data/artists.json"));
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    return [];
  }
}

async function loadGuideContent(env) {
  try {
    const response = await env.ASSETS.fetch(new Request("https://assets.local/data/guides-content.json"));
    if (!response.ok) return {};
    const data = await response.json();
    return data && typeof data === "object" ? data : {};
  } catch (error) {
    return {};
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
  if (path === "/compare-concert-ticket-prices") return { type: "comparison-hub", path, ...TRUST_ROUTES[path] };
  if (path === "/" || PUBLIC_HTML_ROUTES.has(path)) return { type: "static", path, ...TRUST_ROUTES[path] };
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

  const [catalog, artistsMeta] = await Promise.all([loadCatalog(env), loadArtistsMeta(env)]);
  const artistMatch = path.match(/^\/artists\/([a-z0-9-]+)$/);
  if (artistMatch) {
    const artist = findArtist(catalog, artistMatch[1]);
    if (!artist) return null;
    const artistMetaRecord = artistsMeta.find(m => slugify(m.slug) === artistMatch[1]) || {};
    const enrichedArtist = { ...artist, indexing_status: artistMetaRecord.indexing_status || "" };
    return {
      type: "artist",
      path,
      indexable: enrichedArtist.indexing_status === "indexable_with_substantial_content",
      title: artist.seo_title || `${artist.name} Tickets | Options & Availability`,
      description:
        artist.meta_description ||
        `Check ${artist.name} watchlist notes and verified ticket links where available, with practical buying guidance and transparent sourcing.`,
      artist: enrichedArtist,
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
      description: "Independent ticket research for major live music tours with verified ticket links where available."
    }
  ];
}

function genericArtistFaq(artistName) {
  return [
    [
      `Does this page list ${artistName} tour dates?`,
      "No. This page does not publish tour dates unless event details have been verified. Use the verified ticket link, when available, to check current platform information."
    ],
    [
      `Does TourTicketCompare sell ${artistName} tickets?`,
      "No. TourTicketCompare does not sell tickets directly. We link to external ticketing platforms when a destination is verified."
    ],
    [
      "Are prices shown here?",
      "No. Prices should appear only when live provider data is verified and timestamped. Final prices and fees are controlled by the ticket platform."
    ]
  ];
}

function artistFaqEntries(artist) {
  const custom = Array.isArray(artist.faq)
    ? artist.faq
        .filter((entry) => entry && typeof entry === "object" && entry.question && entry.answer)
        .map((entry) => [String(entry.question), String(entry.answer)])
    : [];
  return custom.length ? custom : genericArtistFaq(artist.name);
}

// Guides author their FAQ as a visible "FAQ" section in guides-content.json:
// bold questions followed by plain-paragraph answers. Parse that section so
// the same content is exposed as FAQPage JSON-LD without keeping a second
// copy that could drift from the rendered page.
function guideFaqEntries(guideEntry) {
  const sections = Array.isArray(guideEntry?.sections) ? guideEntry.sections : [];
  const faqSection = sections.find((section) => /^faq\b/i.test(String(section?.title || "").trim()));
  if (!faqSection) return [];
  const entries = [];
  let current = null;
  for (const block of String(faqSection.content || "").split(/\n{2,}/)) {
    const text = block.trim();
    const question = text.match(/^\*\*(.+?)\*\*$/);
    if (question) {
      current = { question: question[1], answers: [] };
      entries.push(current);
    } else if (current && text) {
      current.answers.push(text);
    }
  }
  return entries.filter((entry) => entry.answers.length).map((entry) => [entry.question, entry.answers.join(" ")]);
}

function faqPageSchema(questions) {
  return {
    "@type": "FAQPage",
    mainEntity: questions.map(([name, answer]) => ({
      "@type": "Question",
      name,
      acceptedAnswer: { "@type": "Answer", text: answer }
    }))
  };
}

function faqSchema(route) {
  const questions =
    route.type === "artist"
      ? artistFaqEntries(route.artist)
      : [
          ["Is TourTicketCompare official?", "No. TourTicketCompare is independent and unofficial."],
          ["Does the site sell tickets directly?", "No. Ticket buying happens on the external provider site."],
          ["Why are some ticket buttons missing?", "Ticket buttons are hidden until the destination can be verified."],
          ["Can final prices change?", "Yes. External ticketing sites set their own prices, fees, availability, and checkout terms."]
        ];

  return faqPageSchema(questions);
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
  const type = route.artist.schema_type === "MusicGroup" || route.artist.slug === "bts" ? "MusicGroup" : "Person";
  return {
    "@type": type,
    "@id": `${origin}${route.path}#artist`,
    name: route.artist.name,
    url: `${origin}${route.path}`,
    sameAs: route.artist.official_website ? [route.artist.official_website] : undefined,
    description: route.artist.factual_summary
  };
}

// MusicEvent nodes are emitted only for shows that pass the same publishable
// gate as the visible show board (verified date + venue + artist; see
// docs/CONTENT_RULES.md). Never emit offers, prices, or availability — the
// ticket providers own those.
function musicEventsSchema(route, origin, events) {
  const artistId = `${origin}${route.path}#artist`;
  return futureShowsForArtist(events, route.artist.slug, 6)
    .filter((show) => show.publishable && show.dateTimeISO && show.venue && show.city)
    .map((show) => ({
      "@type": "MusicEvent",
      name: show.event_name || `${route.artist.name} — ${show.city}`,
      startDate: show.dateTimeISO,
      eventStatus: "https://schema.org/EventScheduled",
      location: {
        "@type": "Place",
        name: show.venue,
        address: { "@type": "PostalAddress", addressLocality: show.city }
      },
      performer: { "@id": artistId },
      url: `${origin}${route.path}`
    }));
}

function guideClusterTitle(path) {
  const cluster = GUIDE_CLUSTERS.find((entry) => entry.slugs.includes(path));
  return cluster ? cluster.title : undefined;
}

function articleSchema(route, origin) {
  const organization = {
    "@type": "Organization",
    name: "TourTicketCompare",
    url: `${origin}/`
  };
  return {
    "@type": "Article",
    headline: route.title.replace(" | TourTicketCompare", ""),
    description: route.description,
    mainEntityOfPage: `${origin}${route.path}`,
    author: organization,
    publisher: organization,
    datePublished: route.datePublished || undefined,
    dateModified: route.lastmod || route.datePublished || undefined,
    articleSection: guideClusterTitle(route.path)
  };
}

function routeSchema(route, origin, guideContent = {}, events = [], catalog = {}) {
  const graph = baseSchema(origin);
  if (route.breadcrumb) graph.push(breadcrumbSchema(route, origin));
  if (route.type === "artist") {
    graph.push(artistSchema(route, origin), faqSchema(route));
    if (route.indexable) graph.push(...musicEventsSchema(route, origin, events));
  }
  if (route.type === "guide") {
    graph.push(articleSchema(route, origin));
    const guideEntry = guideContent[route.path];
    const faqEntries = guideFaqEntries(guideEntry);
    if (faqEntries.length) graph.push(faqPageSchema(faqEntries));
    // Emit authored HowTo structured data from guides-content.json. Authored
    // Article objects are superseded by articleSchema above (avoid duplicates).
    const authored = guideEntry?.schema;
    if (authored && typeof authored === "object" && authored["@type"] === "HowTo") {
      const { "@context": _context, ...howTo } = authored;
      graph.push(howTo);
    }
  }
  if (route.type === "comparison-hub") {
    graph.push({
      "@type": "WebPage",
      "@id": `${origin}${route.path}#webpage`,
      url: `${origin}${route.path}`,
      name: route.title,
      description: route.description,
      isPartOf: { "@type": "WebSite", url: `${origin}/`, name: "TourTicketCompare" }
    });
    graph.push(faqPageSchema(comparisonHubFaqEntries()));
    graph.push(...comparisonHubItemListSchema(route, origin, catalog, events));
  }
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

function anchor(label, href, className = "text-link", attrs = "") {
  return `<a class="${escapeAttr(className)}" href="${escapeAttr(href)}"${attrs ? ` ${attrs}` : ""}>${escapeHtml(label)}</a>`;
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

function artistHasVerifiedEventLinks(events, artistSlug) {
  return futureShowsForArtist(events, artistSlug, 6).some(
    (show) => show.id && show.publishable && safeShowTicketUrl(show.ticketmaster_url)
  );
}

function artistCardStatus(catalog, artist, events) {
  if (artistHasVerifiedEventLinks(events, artist.slug)) {
    return {
      pending: false,
      badgeClass: "status-badge",
      badge: "Checked ticket options",
      detail: "Verified event ticket links available",
      cardStatus: "Verified event ticket links are available on this artist page.",
      ctaLabel: "View ticket links",
      ctaClass: "button button-primary"
    };
  }
  if (ticketLinksForArtist(catalog, artist.slug).length > 0) {
    return {
      pending: false,
      badgeClass: "status-badge",
      badge: "Artist-level provider page",
      detail: "No event-specific ticket link verified yet",
      cardStatus: "Artist-level provider page available. No event-specific ticket link verified yet.",
      ctaLabel: "View artist page",
      ctaClass: "button button-primary"
    };
  }
  return {
    pending: true,
    badgeClass: "status-badge status-badge-muted",
    badge: "Buying guidance",
    detail: "Event links added after review",
    cardStatus: "No verified ticket destination is currently published for this artist.",
    ctaLabel: "View artist page",
    ctaClass: "button button-secondary"
  };
}

function formatCardDate(iso) {
  if (!iso) return null;
  const parsed = new Date(iso);
  if (!Number.isFinite(parsed.getTime())) return null;
  try {
    return parsed.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
  } catch (error) {
    return null;
  }
}

// Keep in sync with upcomingVerifiedShowSummary in public/app.js.
function upcomingVerifiedShowSummary(events, artistSlug) {
  const shows = futureShowsForArtist(events, artistSlug, 500).filter((show) => show.publishable && safeShowTicketUrl(show.ticketmaster_url));
  if (!shows.length) return null;
  const next = formatCardDate(shows[0].dateTimeISO);
  if (!next) return null;
  return `Next verified date: ${next} · ${shows.length} upcoming ${shows.length === 1 ? "date" : "dates"}`;
}

function renderArtistLinks(catalog, events = []) {
  return `<div class="artist-card-grid">${(catalog.artists || [])
    .map((artist) => {
      const status = artistCardStatus(catalog, artist, events);
      const showSummary = status.pending ? null : upcomingVerifiedShowSummary(events, artist.slug);
      const descriptionHtml = artist.short_description
        ? `<p class="muted">${escapeHtml(artist.short_description)}</p>`
        : "";
      return `<article class="${status.pending ? "artist-card is-pending" : "artist-card"}"><h3>${escapeHtml(
        artist.name
      )}</h3>${descriptionHtml}<div class="artist-status-row"><p class="${status.badgeClass}">${escapeHtml(
        status.badge
      )}</p><p class="status-chip-detail">${escapeHtml(status.detail)}</p></div><p class="card-status">${escapeHtml(
        showSummary || status.cardStatus
      )}</p>${anchor(status.ctaLabel, `/artists/${artist.slug}`, status.ctaClass)}</article>`;
    })
    .join("")}</div>`;
}

const GUIDE_CLUSTERS = [
  {
    title: "Compare prices and fees",
    intro: "Compare final checkout totals, fees, and provider terms before you decide.",
    slugs: [
      "/guides/how-to-compare-concert-ticket-prices",
      "/guides/how-to-avoid-overpaying-for-concert-tickets",
      "/guides/concert-ticket-fees-explained",
      "/guides/why-ticket-prices-change",
      "/guides/ticketmaster-vs-seatgeek-vs-vivid-seats"
    ]
  },
  {
    title: "Buy safely",
    intro: "Check legitimacy, avoid risky sellers, and understand what to verify before payment.",
    slugs: [
      "/guides/how-to-avoid-ticket-scams",
      "/guides/ticketmaster-vs-stubhub",
      "/guides/seatgeek-promo-code-guide"
    ]
  },
  {
    title: "Understand resale and listings",
    intro: "Understand how resale listings, transfer timing, and provider protections can differ.",
    slugs: [
      "/guides/primary-vs-resale-concert-tickets",
      "/guides/how-resale-ticket-pricing-works",
      "/guides/how-to-read-a-ticket-listing",
      "/guides/ticket-delivery-and-transfer-timing"
    ]
  },
  {
    title: "Timing and planning",
    intro: "Plan when to buy and what to check before committing to a ticket.",
    slugs: [
      "/guides/when-is-the-best-time-to-buy-concert-tickets",
      "/guides/how-to-prepare-for-a-ticket-onsale",
      "/guides/what-to-do-if-a-concert-is-postponed-or-cancelled"
    ]
  }
];

function guideCardHtml(path) {
  const guide = GUIDE_ROUTES[path];
  if (!guide) return "";
  return `<article class="info-card"><h3>${anchor(guide.h1, path, "guide-card-link")}</h3><p>${escapeHtml(guide.description)}</p></article>`;
}

function renderGuideClusters() {
  const clustered = new Set();
  const clusterSections = GUIDE_CLUSTERS.map((cluster) => {
    const cards = cluster.slugs
      .map((path) => {
        clustered.add(path);
        return guideCardHtml(path);
      })
      .join("");
    return `<section class="nested-panel"><h2>${escapeHtml(cluster.title)}</h2><p>${escapeHtml(
      cluster.intro
    )}</p><div class="card-grid guide-grid">${cards}</div></section>`;
  }).join("");
  const uncovered = Object.keys(GUIDE_ROUTES).filter((path) => !clustered.has(path));
  const moreSection = uncovered.length
    ? `<section class="nested-panel"><h2>More guides</h2><div class="card-grid guide-grid">${uncovered
        .map(guideCardHtml)
        .join("")}</div></section>`
    : "";
  return clusterSections + moreSection;
}

function renderArtistStatusLegendHtml() {
  const items = [
    ["status-badge", "Checked ticket options", "Verified event ticket links available"],
    ["status-badge", "Artist-level provider page", "No event-specific ticket link verified yet"],
    ["status-badge status-badge-muted", "Buying guidance", "Event links added after review"]
  ];
  return `<div class="artist-status-legend" aria-label="Artist card status legend">${items
    .map(
      ([badgeClass, badge, detail]) =>
        `<span class="artist-status-legend-item"><span class="${badgeClass}">${escapeHtml(
          badge
        )}</span><span class="status-chip-detail">${escapeHtml(detail)}</span></span>`
    )
    .join("")}</div>`;
}

function renderHomepageGuideLinks() {
  return `<div class="card-grid guide-grid">${Object.entries(GUIDE_ROUTES)
    .slice(0, 6)
    .map(
      ([path, guide]) =>
        `<article class="info-card"><h3>${anchor(guide.h1, path, "guide-card-link")}</h3><p>${escapeHtml(guide.description)}</p></article>`
    )
    .join("")}</div>`;
}


function publishableFutureShows(events, limit = 500) {
  return (events || [])
    .map((ev) => ({
      id: String(ev.id || "").trim(),
      artist_slug: slugify(ev.artist_slug),
      artist_name: String(ev.artist_name || "").trim(),
      event_name: String(ev.event_name || ev.name || "").trim(),
      city: String(ev.city || "").trim(),
      venue: String(ev.venue || "").trim(),
      dateTimeISO: String(ev.dateTimeISO || ev.datetime_iso || "").trim(),
      ticketmaster_url: String(ev.ticketmaster_url || "").trim(),
      publishable: eventLinkPublishable(ev)
    }))
    .filter((show) => show.id && show.dateTimeISO && Number.isFinite(Date.parse(show.dateTimeISO)))
    .filter((show) => Date.parse(show.dateTimeISO) >= Date.now())
    .filter((show) => show.publishable && safeShowTicketUrl(show.ticketmaster_url))
    .sort((a, b) => Date.parse(a.dateTimeISO) - Date.parse(b.dateTimeISO))
    .slice(0, limit);
}

function artistUpcomingCount(events, artistSlug) {
  return publishableFutureShows(events).filter((show) => show.artist_slug === slugify(artistSlug)).length;
}

function renderComparisonHubArtistCards(catalog, events = []) {
  const artists = (catalog.artists || [])
    .map((artist) => ({ ...artist, upcomingCount: artistUpcomingCount(events, artist.slug) }))
    .sort((a, b) => b.upcomingCount - a.upcomingCount || String(a.name).localeCompare(String(b.name)))
    .slice(0, 12);
  if (!artists.length) return `<p class="muted">Artist pages are being reviewed. Check back for verified ticket links and buying guidance.</p>`;
  return `<div class="artist-card-grid">${artists
    .map((artist) => {
      const countText = artist.upcomingCount
        ? `${artist.upcomingCount} upcoming verified ${artist.upcomingCount === 1 ? "event" : "events"}`
        : "Ticket links and buying guidance";
      return `<article class="artist-card"><h3>${escapeHtml(artist.name)}</h3><p class="card-status">${escapeHtml(countText)}</p><p class="muted">Compare available ticket options and confirm final prices and fees on the provider site.</p>${anchor("View tickets", `/artists/${artist.slug}`, "button button-primary")}</article>`;
    })
    .join("")}</div>`;
}

function renderComparisonHubCityLinks(events = []) {
  const preferred = ["London", "Manchester", "Birmingham", "Liverpool", "Glasgow", "Cardiff", "Brighton", "Dublin"];
  const publishable = publishableFutureShows(events);
  const counts = new Map();
  for (const show of publishable) {
    const city = preferred.find((name) => name.toLowerCase() === show.city.toLowerCase());
    if (city) counts.set(city, (counts.get(city) || 0) + 1);
  }
  const cities = preferred.filter((city) => counts.has(city)).concat(preferred.filter((city) => !counts.has(city))).slice(0, 8);
  return `<div class="mini-link-grid">${cities
    .map((city) => {
      const count = counts.get(city) || 0;
      const label = count ? `${city} concerts (${count})` : `${city} concerts`;
      return anchor(label, `/?q=${encodeURIComponent(city)}#search-widget`, "mini-link");
    })
    .join("")}</div>`;
}

function renderComparisonHubEventCards(events = []) {
  const shows = publishableFutureShows(events, 6);
  if (!shows.length) return "";
  return `<section class="nested-panel"><h2>Current verified event links</h2><p>Start with a checked event card, then compare final totals, fees, seat details and delivery terms on the provider site.</p><div class="card-grid show-card-grid">${shows
    .map((show) => {
      const date = formatShowDateServer(show.dateTimeISO);
      const title = show.event_name || [show.artist_name, show.city].filter(Boolean).join(" – ") || "Upcoming concert";
      return `<article class="info-card"><h3>${escapeHtml(title)}</h3>${date ? `<p class="card-status">${escapeHtml(date)}</p>` : ""}<p class="muted">${escapeHtml(showLocationServer(show) || "Venue details shown when verified.")}</p>${anchor("View artist ticket options", `/artists/${show.artist_slug}`, "text-link")}</article>`;
    })
    .join("")}</div></section>`;
}

function latestHubVerificationDate(events = []) {
  const dates = (events || [])
    .map((event) => String(event?.last_verified_at || event?.provider_links?.ticketmaster?.last_verified_at || "").trim())
    .filter((value) => /^\d{4}-\d{2}-\d{2}$/.test(value))
    .sort();
  return dates.length ? formatVerificationDate(dates[dates.length - 1]) : null;
}

function renderComparisonIntentCards() {
  return `<section class="nested-panel"><h2>Start with what you know</h2><div class="card-grid"><article class="info-card"><h3>I know the artist</h3><p>Open the artist page first. You can review checked dates, provider buttons where available, and notes on what to confirm before checkout.</p>${anchor("Browse artist pages", "#compare-by-artist", "text-link")}</article><article class="info-card"><h3>I know the city</h3><p>Use a city shortcut to search matching concerts, venues and guides, then narrow by date and artist.</p>${anchor("Search city shortcuts", "#compare-by-city", "text-link")}</article><article class="info-card"><h3>I know the date or venue</h3><p>Search the site for the venue or date, then confirm the exact event details on the ticket provider before buying.</p>${anchor("Browse checked events", "#current-events", "text-link")}</article></div></section>`;
}

function renderProviderChecklistSection() {
  return `<section class="nested-panel"><h2>What to compare before you buy</h2><p>Prices can look similar until checkout. Use this checklist on every provider page before choosing a ticket.</p><div class="card-grid"><article class="info-card"><h3>1. Match the exact show</h3><p>Artist, city, venue, local date and event name should match the concert you intend to attend.</p></article><article class="info-card"><h3>2. Compare the final total</h3><p>Review the full checkout total after service, delivery, tax and handling fees appear.</p></article><article class="info-card"><h3>3. Check the seat details</h3><p>Confirm section, row, seat numbers, standing area, accessible seating notes and any restricted-view warnings.</p></article><article class="info-card"><h3>4. Read delivery terms</h3><p>Check mobile transfer timing, delayed delivery, ID requirements and whether tickets can be transferred before travel.</p></article><article class="info-card"><h3>5. Review resale protections</h3><p>If the listing is resale, read the marketplace guarantee, refund rules and what happens if the event changes.</p></article><article class="info-card"><h3>6. Re-check before payment</h3><p>Availability and totals can change. Confirm all details again on the final provider checkout screen.</p></article></div></section>`;
}

function renderComparisonTrustPanel(events = []) {
  const lastChecked = latestHubVerificationDate(events);
  return `<section class="nested-panel verification-disclosure"><h2>What TourTicketCompare verifies</h2><ul class="check-list"><li>We organise artist pages and event links only from data already reviewed by the site.</li><li>We do not invent prices, venues, dates, inventory or provider relationships.</li><li>We hide ticket buttons when a destination is not verified enough to publish.</li><li>Ticket providers control final prices, fees, seat details, availability and delivery terms.</li></ul>${lastChecked ? `<p class="disclosure-note">Latest event-link check represented in the current data: ${escapeHtml(lastChecked)}.</p>` : ""}</section>`;
}

function comparisonHubFaqEntries() {
  return [
    ["What is the best way to compare concert ticket prices?", "Start with the exact artist, city, venue and date, then compare the final checkout total on trusted ticket sites. Check seat location, ticket type, delivery timing, restrictions and all service fees before buying."],
    ["Why are concert ticket prices different on each site?", "Prices can differ because sellers, seat locations, demand, availability, timing before the event, service fees and primary versus resale inventory are not the same on every ticket site."],
    ["Do resale ticket prices include fees?", "Sometimes fees are included early and sometimes they appear later in checkout. Always review the final provider checkout total, including service, delivery, tax and handling fees, before paying."],
    ["Are resale concert tickets safe?", "Resale tickets can be legitimate when bought through trusted marketplaces with clear buyer protections, but risk varies. Avoid private sellers, check transfer timing and read the provider guarantee and restrictions before purchase."],
    ["When is the best time to buy concert tickets?", "There is no single best time. Buying early can improve choice and certainty, while waiting can sometimes reveal different resale options. Balance price, seat choice, group needs, delivery timing and risk tolerance."],
    ["Can I track ticket prices for a specific artist?", "TourTicketCompare does not currently provide automated price tracking alerts. Use the artist pages to find checked ticket links and confirm current prices and fees directly on the provider site."]
  ];
}

function comparisonHubItemListSchema(route, origin, catalog, events) {
  const artists = (catalog.artists || []).slice(0, 12);
  const shows = publishableFutureShows(events, 6);
  const artistList = artists.length
    ? {
        "@type": "ItemList",
        name: "Artist ticket option pages",
        itemListElement: artists.map((artist, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: artist.name,
          url: `${origin}/artists/${artist.slug}`
        }))
      }
    : null;
  const eventList = shows.length
    ? {
        "@type": "ItemList",
        name: "Verified concert ticket links",
        itemListElement: shows.map((show, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: show.event_name || `${show.artist_name} ${show.city}`.trim(),
          url: `${origin}/artists/${show.artist_slug}`
        }))
      }
    : null;
  return [artistList, eventList].filter(Boolean);
}

function renderArtistBrowseSection(catalog) {
  const artists = catalog.artists || [];
  if (!artists.length) return "";
  const items = artists
    .map(a => `<li>${anchor(`${a.name} ticket links and buying guidance`, `/artists/${a.slug}`)}</li>`)
    .join("");
  return `<section class="nested-panel"><h2>Browse artist pages</h2><p>Find checked ticket links and buying guidance for these artists:</p><ul class="guide-link-list">${items}</ul></section>`;
}

function inlineMarkdownToHtml(text) {
  return escapeHtml(text)
    .replace(/\[([^\]]+)\]\((\/guides\/[a-z0-9-]+)\)/g, (_match, label, href) => {
      return `<a class="text-link" href="${escapeAttr(href)}">${label}</a>`;
    })
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>");
}

function markdownToHtml(text) {
  if (!text) return "";
  return text
    .split("\n\n")
    .map(para => {
      if (para.startsWith("- ")) {
        const items = para.split("\n").map(line => line.replace(/^- /, ""));
        return `<ul><li>${items.map(item => inlineMarkdownToHtml(item)).join("</li><li>")}</li></ul>`;
      }
      if (para.startsWith("|")) {
        const rows = para.split("\n").filter(r => r.trim());
        if (rows.length < 2) return `<p>${inlineMarkdownToHtml(para)}</p>`;
        const headerCells = rows[0].split("|").slice(1, -1).map(c => `<th>${inlineMarkdownToHtml(c.trim())}</th>`).join("");
        const bodyRows = rows.slice(2).map(row => {
          const cells = row.split("|").slice(1, -1).map(c => `<td>${inlineMarkdownToHtml(c.trim())}</td>`).join("");
          return `<tr>${cells}</tr>`;
        }).join("");
        return `<table><thead><tr>${headerCells}</tr></thead><tbody>${bodyRows}</tbody></table>`;
      }
      return `<p>${inlineMarkdownToHtml(para)}</p>`;
    })
    .join("");
}

function renderFullGuideContent(sections) {
  if (!Array.isArray(sections)) return "";
  return sections
    .map(section => {
      if (section.type === "intro") {
        return `<section class="nested-panel">${markdownToHtml(section.content)}</section>`;
      }
      if (section.type === "section") {
        return `<section class="nested-panel"><h2>${escapeHtml(section.title)}</h2>${markdownToHtml(section.content)}</section>`;
      }
      if (section.type === "subsection") {
        return `<section class="nested-panel"><h3>${escapeHtml(section.title)}</h3>${markdownToHtml(section.content)}</section>`;
      }
      return "";
    })
    .join("");
}

function providerVerificationNote(item) {
  const date = formatVerificationDate(item?.last_verified_at);
  return date ? `Provider link last checked: ${date}.` : "";
}

// Affiliate providers (SeatGeek, Vivid Seats) render before the plain,
// unmonetized Ticketmaster link. Keep in sync with PROVIDER_DISPLAY_ORDER in
// public/app.js.
const PROVIDER_DISPLAY_ORDER = ["seatgeek", "vivid-seats", "ticketmaster"];
const PROVIDER_DISPLAY_NAMES = { ticketmaster: "Ticketmaster", seatgeek: "SeatGeek", "vivid-seats": "Vivid Seats" };

function providerDisplayRank(providerSlug) {
  const rank = PROVIDER_DISPLAY_ORDER.indexOf(providerSlug);
  return rank === -1 ? PROVIDER_DISPLAY_ORDER.length : rank;
}

function renderProviderFallback(catalog, artist, surface, providerAvailability = {}) {
  // SeatGeek / Vivid Seats artist cards render only when the provider's
  // Impact config is present server-side, so an unconfigured provider never
  // shows a dead button. Plain Ticketmaster links have no config requirement.
  const links = ticketLinksForArtist(catalog, artist.slug)
    .filter((item) => {
      const provider = slugify(item.provider);
      if (provider === "seatgeek") return providerAvailability.seatgeek === true;
      if (provider === "vivid-seats") return providerAvailability["vivid-seats"] === true;
      return true;
    })
    .sort((a, b) => providerDisplayRank(slugify(a.provider)) - providerDisplayRank(slugify(b.provider)));
  if (!links.length) {
    return `<section class="provider-panel"><h2>Provider links</h2><p class="muted">No provider artist page link is currently available for this artist. Ticket buttons for provider artist pages appear only after destination checks. Event-level links, where shown, come from ticket data sources and have not been confirmed as verified destinations.</p><p class="muted">These guides cover what to check before committing to a ticketing platform:</p><ul class="guide-link-list"><li>${anchor("How to avoid overpaying for concert tickets", "/guides/how-to-avoid-overpaying-for-concert-tickets")}</li><li>${anchor("When is the best time to buy concert tickets?", "/guides/when-is-the-best-time-to-buy-concert-tickets")}</li><li>${anchor("How to spot ticket scams and fake listings", "/guides/how-to-avoid-ticket-scams")}</li></ul><div class="action-row">${anchor("Read buying guides", "/guides", "button button-secondary")}${anchor("Browse other artists", "/artists", "button button-secondary")}</div></section>`;
  }
  const cards = links
    .map((item) => {
      const provider = slugify(item.provider);
      const displayName = PROVIDER_DISPLAY_NAMES[provider] || item.provider;
      const label = `Open ${displayName} artist page`;
      const params = new URLSearchParams({
        artistSlug: artist.slug,
        provider,
        sourcePath: `/artists/${artist.slug}`,
        surface
      });
      const verificationNote = providerVerificationNote(item);
      return `<article class="provider-card"><h3>${escapeHtml(displayName)}</h3><p>Provider checkout controls final price, fees, and availability.</p>${anchor(
        label,
        `/api/out?${params.toString()}`,
        "button button-primary"
      )}${verificationNote ? `<p class="disclosure-note">${escapeHtml(verificationNote)}</p>` : ""}</article>`;
    })
    .join("");
  return `<section class="provider-panel"><h2>Provider links</h2><p class="muted">These links go to provider artist pages. Event-specific buttons appear only on verified show cards.</p><div class="provider-actions">${cards}</div><p class="disclosure-note">Some links are affiliate links. This does not change your price. Final prices, fees, and availability are confirmed on the ticketing platform.</p></section>`;
}

function formatVerificationDate(value) {
  const raw = String(value || "").trim();
  if (!raw) return null;
  const parsed = new Date(`${raw}T00:00:00Z`);
  if (!Number.isFinite(parsed.getTime())) return null;
  try {
    return parsed.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
  } catch (error) {
    return null;
  }
}

function renderVerificationDisclosure(artist, shows = []) {
  // Single consolidated trust block for artist pages. Keep in sync with
  // buildVerificationDisclosurePanel in public/app.js.
  const lines = [
    "TourTicketCompare is independent and unofficial. We do not sell or resell tickets.",
    "We only show ticket destinations that pass our verification checks.",
    "We do not display ticket prices or guarantee availability. Final prices, fees, and availability are confirmed by the provider before you pay.",
    "Some links may earn us a commission. That never changes which links we show."
  ];
  const artistVerifiedDate = formatVerificationDate(artist.last_verified_at);
  const eventDates = [...new Set(shows.map(show => formatVerificationDate(show.last_verified_at)).filter(Boolean))];
  const eventRange = eventDates.length ? (eventDates.length === 1 ? eventDates[0] : `${eventDates[0]} to ${eventDates[eventDates.length - 1]}`) : null;
  return `<section class="nested-panel verification-disclosure"><h2>Verification and disclosure</h2><ul class="check-list">${lines.map(line => `<li>${escapeHtml(line)}</li>`).join("")}</ul>${
    artistVerifiedDate ? `<p class="disclosure-note">Artist last checked: ${escapeHtml(artistVerifiedDate)}.</p>` : ""
  }${eventRange ? `<p class="disclosure-note">Event links last checked: ${escapeHtml(eventRange)}.</p>` : ""}</section>`;
}

function futureShowsForArtist(events, artistSlug, limit) {
  const now = Date.now();
  const slug = slugify(artistSlug);
  return events
    .filter((ev) => ev && typeof ev === "object" && slugify(ev.artist_slug) === slug)
    .map((ev) => ({
      id: String(ev.id || "").trim(),
      event_name: String(ev.event_name || ev.name || "").trim(),
      dateTimeISO: String(ev.dateTimeISO || ev.datetime_iso || "").trim(),
      city: String(ev.city || "").trim(),
      venue: String(ev.venue || "").trim(),
      ticketmaster_url: String(ev.ticketmaster_url || "").trim(),
      seatgeek_url: String(ev.seatgeek_url || "").trim(),
      vividseats_url: String(ev.vividseats_url || "").trim(),
      last_verified_at: String(ev.last_verified_at || "").trim(),
      verification_status: String(ev.verification_status || "").trim(),
      publishable: eventLinkPublishable(ev),
      seatgeekPublishable: providerEventPublishable(ev, "seatgeek"),
      vividseatsPublishable: providerEventPublishable(ev, "vivid-seats")
    }))
    .filter((show) => show.id && show.dateTimeISO && Number.isFinite(Date.parse(show.dateTimeISO)))
    .filter((show) => Date.parse(show.dateTimeISO) >= now)
    .sort((a, b) => Date.parse(a.dateTimeISO) - Date.parse(b.dateTimeISO))
    .slice(0, limit);
}

function formatShowDateServer(iso) {
  if (!iso) return "";
  const parsed = new Date(iso);
  if (!Number.isFinite(parsed.getTime())) return "";
  try {
    return parsed.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC"
    });
  } catch (error) {
    return "";
  }
}

function showLocationServer(show) {
  return [show.city, show.venue].filter((v) => String(v || "").trim()).join(" · ");
}

// Explicit event-link publishability. CTAs may render only for events whose
// verification_status is an allowed publish state ("human_verified" or
// "machine_high_confidence"); "needs_recheck" suppresses CTAs even when a
// top-level ticketmaster_url is present. Events without an explicit
// verification_status fall back to the legacy human-verified provider flag.
// Keep in sync with eventLinkPublishable in public/app.js and
// functions/api/out.js.
const PUBLISHABLE_VERIFICATION_STATUSES = new Set(["human_verified", "machine_high_confidence"]);

function eventLinkPublishable(event) {
  const status = String(event?.verification_status || "").trim().toLowerCase();
  if (status) return PUBLISHABLE_VERIFICATION_STATUSES.has(status);
  return event?.provider_links?.ticketmaster?.verified === true;
}

// Per-provider event publishability. Ticketmaster follows the event-level
// verification_status above. A SeatGeek event CTA may additionally publish on
// a needs_recheck event when the SeatGeek link carries its own verified
// provenance (provider_links.seatgeek.verified === true) — the recheck flag
// tracks the Ticketmaster storefront URL, not the SeatGeek listing. Keep in
// sync with providerEventPublishable in functions/api/out.js and
// public/app.js.
function providerEventPublishable(event, provider) {
  if (provider === "seatgeek" && event?.provider_links?.seatgeek?.verified === true) return true;
  return eventLinkPublishable(event);
}

function safeShowTicketUrl(value) {
  const raw = String(value || "").trim();
  if (!raw) return null;
  try {
    const parsed = new URL(raw);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return null;
    const host = parsed.hostname.toLowerCase();
    if (host === "localhost" || host === "127.0.0.1") return null;
    if (/example/.test(host) || raw.includes("placeholder")) return null;
    return raw;
  } catch (error) {
    return null;
  }
}

function safeSeatGeekTicketUrl(value) {
  const safeUrl = safeShowTicketUrl(value);
  if (!safeUrl) return null;
  try {
    const parsed = new URL(safeUrl);
    if (parsed.protocol !== "https:") return null;
    const host = parsed.hostname.toLowerCase();
    const path = decodeURIComponent(parsed.pathname || "/").replace(/\/+$/, "");
    if (host !== "seatgeek.com" && host !== "www.seatgeek.com") return null;
    if (!path || path === "/") return null;
    if (/^\/(search|venues?|performers?|artists?|concert-tickets|tickets)(?:\/|$)/i.test(path)) return null;
    return /\/(concert|sports|theater|theatre)\/\d+$/i.test(path) ? safeUrl : null;
  } catch (error) {
    return null;
  }
}

function seatGeekOutAvailable(show, seatGeekAvailable = false) {
  if (!seatGeekAvailable) return false;
  const publishable = typeof show?.seatgeekPublishable === "boolean"
    ? show.seatgeekPublishable
    : providerEventPublishable(show, "seatgeek");
  return Boolean(publishable && safeSeatGeekTicketUrl(show?.seatgeek_url));
}

function safeVividSeatsTicketUrl(value) {
  const safeUrl = safeShowTicketUrl(value);
  if (!safeUrl) return null;
  try {
    const parsed = new URL(safeUrl);
    if (parsed.protocol !== "https:") return null;
    const host = parsed.hostname.toLowerCase();
    const path = decodeURIComponent(parsed.pathname || "/").replace(/\/+$/, "");
    if (host !== "vividseats.com" && host !== "www.vividseats.com") return null;
    if (!path || path === "/") return null;
    if (/^\/(search|venues?|performers?|artists?|category|concerts?|sports?|theater|theatre)(?:\/|$)/i.test(path)) return null;
    return /\/production\/\d+$/i.test(path) ? safeUrl : null;
  } catch (error) {
    return null;
  }
}

function vividSeatsOutAvailable(show, vividSeatsAvailable = false) {
  if (!vividSeatsAvailable) return false;
  const publishable = typeof show?.vividseatsPublishable === "boolean"
    ? show.vividseatsPublishable
    : providerEventPublishable(show, "vivid-seats");
  return Boolean(publishable && safeVividSeatsTicketUrl(show?.vividseats_url));
}

function clean(value, max = 255) {
  return String(value || "").trim().slice(0, max);
}

function isSeatGeekConfigured(env = {}) {
  const impactSeatGeekBaseTrackingUrl = clean(env?.IMPACT_SEATGEEK_BASE_TRACKING_URL, 2048);
  const impactSeatGeekAccountSid = clean(env?.IMPACT_SEATGEEK_ACCOUNT_SID || env?.IMPACT_ACCOUNT_SID, 255);
  const impactSeatGeekAuthToken = clean(env?.IMPACT_SEATGEEK_AUTH_TOKEN || env?.IMPACT_AUTH_TOKEN, 255);
  const impactSeatGeekProgramId = clean(env?.IMPACT_SEATGEEK_CAMPAIGN_ID || env?.IMPACT_SEATGEEK_PROGRAM_ID, 120);
  return Boolean(impactSeatGeekBaseTrackingUrl || (impactSeatGeekAccountSid && impactSeatGeekAuthToken && impactSeatGeekProgramId));
}

function isVividSeatsConfigured(env = {}) {
  const impactVividSeatsBaseTrackingUrl = clean(env?.IMPACT_VIVIDSEATS_BASE_TRACKING_URL, 2048);
  const impactVividSeatsAccountSid = clean(env?.IMPACT_VIVIDSEATS_ACCOUNT_SID || env?.IMPACT_ACCOUNT_SID, 255);
  const impactVividSeatsAuthToken = clean(env?.IMPACT_VIVIDSEATS_AUTH_TOKEN || env?.IMPACT_AUTH_TOKEN, 255);
  const impactVividSeatsProgramId = clean(env?.IMPACT_VIVIDSEATS_CAMPAIGN_ID || env?.IMPACT_VIVIDSEATS_PROGRAM_ID, 120);
  return Boolean(impactVividSeatsBaseTrackingUrl || (impactVividSeatsAccountSid && impactVividSeatsAuthToken && impactVividSeatsProgramId));
}

function renderShowCardServerHtml(show, seatGeekAvailable = false, isIndexableArtist = true, vividSeatsAvailable = false) {
  const date = formatShowDateServer(show.dateTimeISO);
  const location = showLocationServer(show);
  const validUrl = safeShowTicketUrl(show.ticketmaster_url);
  const eventVerifiedDate = formatVerificationDate(show.last_verified_at);
  let ctaHtml = `<p class="disclosure-note">No verified ticket link is available for this date.</p>`;

  if (!isIndexableArtist) {
    ctaHtml = `<p class="disclosure-note">Ticket links for this artist are still being reviewed. We do not show buy buttons until the destination has been checked.</p>`;
  } else if (show.id) {
    // Provider price/fee/availability disclosure lives once in the show-board
    // intro instead of repeating on every card.
    // Affiliate providers (SeatGeek, then Vivid Seats) render first as the
    // primary CTA; the verified Ticketmaster link renders as a plain,
    // unmonetized CTA last. Any provider renders standalone when the others
    // are unavailable. The SeatGeek/Vivid Seats notes stay per-card
    // (smoke-asserted resale caution); the generic provider disclosure lives
    // in the board intro.
    const tmAvailable = Boolean(validUrl && show.publishable);
    const sgAvailable = seatGeekOutAvailable(show, seatGeekAvailable);
    const vsAvailable = vividSeatsOutAvailable(show, vividSeatsAvailable);
    const outHref = (provider) => `/api/out?${new URLSearchParams({ showId: show.id, provider }).toString()}`;
    const ctas = [];
    if (sgAvailable) ctas.push({ provider: "seatgeek", primaryLabel: "View tickets on SeatGeek", secondaryLabel: "Check SeatGeek" });
    if (vsAvailable) ctas.push({ provider: "vivid-seats", primaryLabel: "View tickets on Vivid Seats", secondaryLabel: "Check Vivid Seats" });
    if (tmAvailable) ctas.push({ provider: "ticketmaster", primaryLabel: ctas.length ? "Check Ticketmaster" : "View tickets", secondaryLabel: "Check Ticketmaster" });
    if (ctas.length) {
      const buttons = ctas
        .map((cta, index) => anchor(index === 0 ? cta.primaryLabel : cta.secondaryLabel, outHref(cta.provider), index === 0 ? "button button-primary" : "button button-secondary", 'target="_blank" rel="noopener"'))
        .join("");
      const notes = [
        sgAvailable ? `<p class="disclosure-note">SeatGeek sets prices, fees, availability, and checkout terms. Confirm details on SeatGeek before purchase.</p>` : "",
        vsAvailable ? `<p class="disclosure-note">Vivid Seats sets prices, fees, availability, and checkout terms. Confirm details on Vivid Seats before purchase.</p>` : ""
      ].join("");
      ctaHtml = ctas.length > 1 ? `<div class="cta-group">${buttons}</div>${notes}` : `${buttons}${notes}`;
    }
  }

  const showJson = escapeAttr(JSON.stringify({ last_verified_at: show.last_verified_at || "" }));
  const eventVerifiedHtml = eventVerifiedDate ? `<p class="disclosure-note">Event last checked: ${escapeHtml(eventVerifiedDate)}.</p>` : "";
  const titleFallback = show.city ? `Show – ${show.city}` : "Upcoming show";
  return `<article class="info-card show-card" data-show-json="${showJson}"><h3>${escapeHtml(show.event_name || titleFallback)}</h3>${date ? `<p class="card-status">${escapeHtml(date)}</p>` : ""}<p class="muted">${escapeHtml(location || "City and venue details are shown only when verified by the source.")}</p>${eventVerifiedHtml}${ctaHtml}</article>`;
}

function renderShowBoardEmptyStateHtml(artistName = "") {
  const safeName = escapeHtml(String(artistName || "").trim() || "these");
  return `<div class="empty-state"><h3>No verified ${safeName} ticket links yet</h3><p class="muted">We're not listing any upcoming ${safeName} dates right now because we haven't verified an event-specific ticket destination. We'll only show ticket links when there's a confirmed source we can check.</p><div class="action-row">${anchor(
    "Browse artists with ticket links",
    "/artists",
    "button button-secondary"
  )}${anchor("Read ticket buying guide", "/guides", "button button-secondary")}</div></div>`;
}

function renderShowBoardServerHtml(shows, seatGeekAvailable = false, isIndexableArtist = true, artistName = "", vividSeatsAvailable = false) {
  const gridContent = shows.length
    ? shows.map(show => renderShowCardServerHtml(show, seatGeekAvailable, isIndexableArtist, vividSeatsAvailable)).join("")
    : renderShowBoardEmptyStateHtml(artistName);
  return `<section class="section-grid show-board" aria-labelledby="artistShowBoard"><div class="section-intro"><h2 id="artistShowBoard">Verified event links</h2><p>Each card is one checked event date and links to the ticket page for that exact show when one is available.</p><p class="disclosure-note">Coverage varies by artist and region. Final prices, fees, availability, and checkout terms are confirmed on the provider site.</p></div><div class="card-grid show-card-grid" data-show-grid="true">${gridContent}</div></section>`;
}

function renderMainContent(route, catalog, events = [], guideContent = {}, env = {}) {
  if (route.type === "comparison-hub") {
    const faqHtml = comparisonHubFaqEntries()
      .map(([question, answer]) => `<details><summary>${escapeHtml(question)}</summary><p>${escapeHtml(answer)}</p></details>`)
      .join("");
    return `<main id="mainContent"><section class="content-page comparison-hub" aria-labelledby="compareTitle">${renderBreadcrumbHtml(
      route
    )}<section class="nested-panel"><h1 id="compareTitle">Compare Concert Ticket Prices</h1><p class="lead">Compare concert ticket prices across trusted ticket sites. Tour Ticket Compare helps fans find verified ticket options for major tours, compare available prices where possible, and check final fees before buying. Browse by artist, city, venue or date to find ticket links from trusted providers in one place.</p><div class="action-row">${anchor(
      "Browse concerts",
      "#current-events",
      "button button-primary"
    )}${anchor("View popular artists", "#compare-by-artist", "button button-secondary")}</div><p class="disclosure-note">We do not rank providers by live price. Ticket providers control final prices, fees, availability, seat details, restrictions and delivery terms.</p></section>${renderComparisonIntentCards()}<section id="compare-by-artist" class="nested-panel"><h2>Compare tickets by artist</h2><p>Choose an artist page to review checked event links, provider options where available, and buying guidance before leaving for the ticket site.</p>${renderComparisonHubArtistCards(
      catalog,
      events
    )}</section><section id="compare-by-city" class="nested-panel"><h2>Compare tickets by city</h2><p>Search verified event coverage by city, venue or date. UK and Ireland city shortcuts are prioritised where matching event data exists.</p>${renderComparisonHubCityLinks(
      events
    )}</section>${renderProviderChecklistSection()}<section class="nested-panel"><h2>How concert ticket prices vary</h2><div class="card-grid"><article class="info-card"><h3>Seller and ticket type</h3><p>Primary tickets, resale listings and provider marketplace rules can all affect what you see.</p></article><article class="info-card"><h3>Seat location and demand</h3><p>Section, row, view, proximity to the stage and demand for a specific date can change the final total.</p></article><article class="info-card"><h3>Availability and timing</h3><p>Listings may change as onsales, extra releases, transfers and resale supply shift before the event.</p></article><article class="info-card"><h3>Service fees</h3><p>Compare the final checkout total after service, delivery, tax and handling fees, not only the first displayed price.</p></article></div></section>${renderComparisonTrustPanel(
      events
    )}<section class="nested-panel"><h2>Ticket sites and sources</h2><p>TourTicketCompare organises checked ticket destinations and practical buying guidance. Use these links as a starting point, then compare trusted providers and confirm final prices, fees, seat restrictions, delivery details, refund rules and event terms before purchasing.</p><p class="disclosure-note">Some outbound links may be affiliate links. We do not sell tickets directly, guarantee availability, or promise that any provider has a lower total.</p><div class="action-row">${anchor(
      "How it works",
      "/how-it-works",
      "button button-secondary"
    )}${anchor("Affiliate disclosure", "/affiliate-disclosure", "button button-secondary")}${anchor("Ticket buying guide", "/guides/how-to-compare-concert-ticket-prices", "button button-secondary")}</div></section><section id="current-events" class="nested-panel"><h2>Browse concerts and tours</h2><p>Use artist and tour pages as a hub for checked links and event-specific buying guidance.</p><div class="mini-link-grid">${anchor("All artists", "/artists", "mini-link")}${anchor("Buying guides", "/guides", "mini-link")}${(catalog.tours || [])
      .filter((tour) => tour && tour.verified === true && tour.artist_slug && tour.slug)
      .slice(0, 6)
      .map((tour) => anchor(tour.tour_name || "Tour ticket options", `/artists/${tour.artist_slug}/${tour.slug}`, "mini-link"))
      .join("")}</div></section>${renderComparisonHubEventCards(
      events
    )}<section class="nested-panel faq-panel"><h2>FAQ</h2>${faqHtml}</section></section></main>`;
  }

  if (route.type === "artist") {
    const artist = route.artist;
    const seatGeekAvailable = isSeatGeekConfigured(env);
    const vividSeatsAvailable = isVividSeatsConfigured(env);
    const relatedGuideSlugs = artist.related_guides || [];
    const relatedGuideLinks = relatedGuideSlugs
      .slice(0, 4)
      .map(slug => {
        const guidePath = `/guides/${slug}`;
        const guide = Object.entries(GUIDE_ROUTES).find(([path]) => path === guidePath);
        if (!guide) return "";
        const [path, guideData] = guide;
        return `<li>${anchor(guideData.h1 || guideData.title.replace(" | TourTicketCompare", ""), path)}</li>`;
      })
      .filter(Boolean)
      .join("");
    const relatedGuidesHtml = relatedGuideLinks
      ? `<section class="nested-panel"><h2>Related guides</h2><p>Learn how to compare prices, understand ticket types, spot scams, and make smart timing decisions:</p><ul class="guide-link-list">${relatedGuideLinks}</ul></section>`
      : "";
    const isIndexableArtist = artist.indexing_status === "indexable_with_substantial_content";
    const shows = futureShowsForArtist(events, artist.slug, 6);
    const reviewNoticeHtml = isIndexableArtist
      ? ""
      : `<section class="nested-panel review-notice"><p class="disclosure-note">This artist page is currently under review. Event details are shown for reference while ticket links are checked.</p></section>`;
    const demandHtml =
      typeof artist.why_demand_is_high === "string" && artist.why_demand_is_high.trim()
        ? `<section class="nested-panel"><h2>Why demand may be high</h2><p>${escapeHtml(
            artist.why_demand_is_high
          )}</p></section>`
        : "";
    const artistFaqHtml = artistFaqEntries(artist)
      .map(([question, answer]) => `<details><summary>${escapeHtml(question)}</summary><p>${escapeHtml(answer)}</p></details>`)
      .join("");
    return `<main id="mainContent"><section class="content-page artist-page" aria-labelledby="artistTitle">${renderBreadcrumbHtml(
      route
    )}<h1 id="artistTitle">${escapeHtml(
      artist.name
    )} ticket links and buying guidance</h1><p class="lead">Checked ticket links for ${escapeHtml(
      artist.name
    )} dates, plus what to confirm about fees, seats, and resale before you buy.</p>${reviewNoticeHtml}${renderShowBoardServerHtml(shows, seatGeekAvailable, isIndexableArtist, artist.name, vividSeatsAvailable)}${renderProviderFallback(
      catalog,
      artist,
      "artist_hero",
      { seatgeek: seatGeekAvailable, "vivid-seats": vividSeatsAvailable }
    )}${renderVerificationDisclosure(artist, shows)}<section class="split-section"><div><h2>About ${escapeHtml(
      artist.name
    )}</h2><p>${escapeHtml(artist.factual_summary)}</p></div><div><h2>Ticket link status</h2><p>${escapeHtml(
      artist.ticket_buying_notes
    )}</p></div></section>${demandHtml}<section class="nested-panel"><h2>Ticket buying checklist</h2><ul class="check-list"><li>Check the final price including fees before paying.</li><li>Check the seat location, section, row, and any view restrictions.</li><li>Check resale terms and buyer protections if the ticket is listed by a third party.</li><li>Check the delivery method and expected transfer timing.</li><li>Check refund, cancellation, and event-change terms on the provider site.</li></ul></section>${relatedGuidesHtml}<section class="nested-panel"><h2>Useful links</h2><div class="mini-link-grid">${anchor(
      "Compare concert ticket prices",
      "/compare-concert-ticket-prices",
      "mini-link"
    )}${anchor("All artists", "/artists", "mini-link")}${anchor("Ticket buying guides", "/guides", "mini-link")}${anchor(
      "How it works",
      "/how-it-works",
      "mini-link"
    )}${anchor(
      "Affiliate disclosure",
      "/affiliate-disclosure",
      "mini-link"
    )}</div></section><section class="nested-panel faq-panel"><h2>${escapeHtml(
      artist.name
    )} ticket FAQ</h2>${artistFaqHtml}</section></section></main>`;
  }

  if (route.type === "guide") {
    const fullContent = route.fullContent && guideContent[route.path]
      ? renderFullGuideContent(guideContent[route.path].sections)
      : "";
    const contentHtml = fullContent
      ? fullContent
      : `<section class="nested-panel"><h2>What this guide covers</h2><p>This guide explains what to check, red flags to avoid, what to confirm before buying, and what TourTicketCompare does and does not verify. Final prices, fees, availability, delivery, and checkout terms should always be confirmed on the provider site.</p></section>`;
    const artistBrowseHtml = renderArtistBrowseSection(catalog);
    return `<main id="mainContent"><section class="content-page guide-page" aria-labelledby="guideTitle">${renderBreadcrumbHtml(
      route
    )}<h1 id="guideTitle">${escapeHtml(route.h1 || route.title.replace(" | TourTicketCompare", ""))}</h1><p class="lead">${escapeHtml(
      route.description
    )}</p>${contentHtml}${artistBrowseHtml}<div class="action-row">${anchor(
      "Compare concert ticket prices",
      "/compare-concert-ticket-prices",
      "button button-primary"
    )}${anchor("How it works", "/how-it-works", "button button-secondary")}${anchor(
      "Affiliate disclosure",
      "/affiliate-disclosure",
      "button button-secondary"
    )}</div></section></main>`;
  }

  if (route.path === "/artists") {
    return `<main id="mainContent"><section class="content-page" aria-labelledby="artistsTitle">${renderBreadcrumbHtml(
      route
    )}<h1 id="artistsTitle">Artist watchlist</h1><p>Find major artists, see whether checked ticket links are available, and use the buying guidance before you leave for a ticket provider.</p><p>A listed artist does not mean current tickets, prices, venues, or availability are confirmed. Ticket buttons appear only when the destination has been checked.</p><p class="disclosure-note">Coverage varies by artist and region. This is not a complete global tour listing; we only show event links where the artist, date, venue, and ticket destination can be checked.</p>${renderArtistStatusLegendHtml()}${renderArtistLinks(
      catalog,
      events
    )}</section></main>`;
  }

  if (route.path === "/guides") {
    return `<main id="mainContent"><section class="content-page" aria-labelledby="guidesTitle">${renderBreadcrumbHtml(
      route
    )}<h1 id="guidesTitle">Ticket buying guides</h1><p>Use these guides to compare ticket options, understand resale risks, avoid scams, and check provider terms before you buy.</p><section class="nested-panel"><h2>Essential checks before checkout</h2><ul class="check-list"><li>Check that the artist, date, venue, and seat details match your show.</li><li>Compare the final checkout total after fees, not just the first displayed price.</li><li>Review delivery, refund, and resale terms on the provider site before paying.</li><li>Look for official sources or verified resale marketplaces; avoid unmatched listings and social media sellers.</li></ul></section>${renderGuideClusters()}<div class="action-row">${anchor(
      "Compare concert ticket prices",
      "/compare-concert-ticket-prices",
      "button button-primary"
    )}${anchor("How it works", "/how-it-works", "button button-secondary")}${anchor(
      "Affiliate disclosure",
      "/affiliate-disclosure",
      "button button-secondary"
    )}</div></section></main>`;
  }

  if (route.path === "/how-it-works") {
    return `<main id="mainContent"><section class="content-page" aria-labelledby="pageTitle">${renderBreadcrumbHtml(
      route
    )}<h1 id="pageTitle">How TourTicketCompare works</h1><p class="lead">TourTicketCompare is an independent, unofficial ticket research site that helps fans find checked ticket options and buying guidance. We do not sell tickets, do not compare live prices, and only link out to destinations we have checked.</p><section class="nested-panel"><h2>What TourTicketCompare does</h2><ul class="check-list"><li>Organises verified ticket links from official providers like Ticketmaster.</li><li>Shows checked event-specific links only when the destination can be verified.</li><li>Provides practical buying guidance on comparing totals, understanding fees, and confirming terms.</li><li>Displays a clear empty state when no verified ticket link exists for an event.</li></ul></section><section class="nested-panel"><h2>What TourTicketCompare does not do</h2><ul class="check-list"><li>Sell tickets directly.</li><li>Compare prices across providers or claim one site is cheaper.</li><li>Display prices without verified, timestamped provider data.</li><li>Send users to generic artist pages when no event-specific link is verified.</li><li>Scrape unofficial sources or publish unverified tour dates.</li></ul></section><section class="nested-panel"><h2>How ticket links are handled</h2><p>Ticket buttons on event cards link to external ticketing platforms. Some links may be affiliate links, which means we may earn a commission if you purchase through them at no extra cost to you.</p><p class="disclosure-note">Affiliate relationships do not control which links we show. Affiliate links are handled safely and we only publish ticket buttons when the destination can be verified.</p></section><section class="nested-panel"><h2>What you should confirm on the ticket provider site</h2><ul class="check-list"><li>Final price including all fees and taxes.</li><li>Exact seat or standing area location.</li><li>Delivery method and timing (instant, email transfer, shipped).</li><li>Refund, resale, and cancellation terms.</li><li>Event date, venue, and artist name match your intended show.</li></ul></section><section class="nested-panel"><h2>What we verify before showing a link</h2><p>We check that the event card artist, date, and venue match verified source data. We validate each ticket link destination before showing a button. We do not show event cards or ticket links until the information can be checked.</p></section><section class="nested-panel faq-panel"><h2>FAQ</h2><details><summary>Is TourTicketCompare official?</summary><p>No. TourTicketCompare is independent and unofficial.</p></details><details><summary>Does the site sell tickets directly?</summary><p>No. Ticket buying happens on the external provider site.</p></details><details><summary>Why are some ticket buttons missing?</summary><p>Ticket buttons are hidden until the destination can be verified.</p></details><details><summary>Can final prices change?</summary><p>Yes. External ticketing sites set their own prices, fees, availability, and checkout terms.</p></details></section><div class="action-row">${anchor(
      "Compare concert ticket prices",
      "/compare-concert-ticket-prices",
      "button button-primary"
    )}${anchor("Read buying guides", "/guides", "button button-secondary")}${anchor(
      "Affiliate disclosure",
      "/affiliate-disclosure",
      "button button-secondary"
    )}</div></section></main>`;
  }

  if (route.path === "/affiliate-disclosure") {
    return `<main id="mainContent"><section class="content-page" aria-labelledby="affiliateTitle">${renderBreadcrumbHtml(
      route
    )}<h1 id="affiliateTitle">Affiliate disclosure</h1><p class="lead">TourTicketCompare is an independent, unofficial ticket research site. Some ticket links are affiliate links, which means we may earn a commission when you buy. You do not pay extra because of our affiliate relationship.</p><section class="nested-panel"><h2>What affiliate links mean</h2><ul class="check-list"><li>We link to ticket providers and may earn commission when you complete a purchase.</li><li>The commission does not increase your ticket price or fees.</li><li>We disclose which links are affiliate links so you know our relationship.</li><li>Affiliate relationships do not decide which links we show or which providers we recommend.</li></ul></section><section class="nested-panel"><h2>Why it does not weaken our verification</h2><p>Affiliate relationships do not control which links we show. We do not publish fake prices, invented dates, fictional venues, unverified providers, or rankings we cannot support just because we earn a commission. We only show ticket buttons when we can check the artist, event, and destination. If a link cannot be verified, it should not appear as a ticket option.</p></section><section class="nested-panel"><h2>How we handle different link types</h2><ul class="check-list"><li>Official sources: Artist-level and event pages on official ticketing sites (typically Ticketmaster). These are plain links — we have no Ticketmaster affiliate relationship and earn nothing when you use them.</li><li>Resale marketplaces: Verified platforms like SeatGeek and Vivid Seats where sellers list real tickets. These are affiliate links and may generate commission when you buy.</li><li>Guidance: Buying guides and checklists are informational; we do not sell tickets directly.</li></ul></section><section class="nested-panel"><h2>What you confirm with the provider</h2><ul class="check-list"><li>Final ticket prices, fees, taxes, and delivery charges.</li><li>Seat location, view restrictions, and physical details.</li><li>Inventory and availability of your specific seats.</li><li>Refund, cancellation, transfer, and resale rules.</li><li>Payment security and checkout terms.</li></ul></section><section class="nested-panel"><h2>Before you complete a purchase</h2><p>Read the provider's terms and conditions. Confirm the event date, venue, seat information, final total, delivery method, refund policy, and transfer rules. These details come from the ticket provider, not from TourTicketCompare.</p></section><section class="nested-panel"><h2>How affiliate commissions support us</h2><p>When you click through an affiliate link and complete a purchase, the provider may pay us a commission. This commission helps us maintain the site and continue providing free buying guidance. It does not cost you any extra.</p></section><div class="action-row">${anchor(
      "Compare concert ticket prices",
      "/compare-concert-ticket-prices",
      "button button-primary"
    )}${anchor("Read buying guides", "/guides", "button button-secondary")}</div></section></main>`;
  }

  if (route.path === "/contact") {
    return `<main id="mainContent"><section class="content-page" aria-labelledby="contactTitle">${renderBreadcrumbHtml(
      route
    )}<h1 id="contactTitle">Contact TourTicketCompare</h1><p class="lead">Use this page to report broken links, incorrect event details, provider-link issues, or general feedback about TourTicketCompare.</p><section class="nested-panel"><h2>Where to contact us</h2><p>For quick public updates or messages, contact ${anchor(
      "@RenaissanceWT",
      "https://x.com/RenaissanceWT",
      "text-link"
    )} or ${anchor(
      "@CowboyCarterWT",
      "https://x.com/CowboyCarterWT",
      "text-link"
    )} on X. You can also email ${anchor(
      "hello@tourticketcompare.com",
      "mailto:hello@tourticketcompare.com",
      "text-link"
    )}.</p></section><section class="nested-panel"><h2>Useful reasons to get in touch</h2><ul class="check-list"><li>A ticket button is broken or opens the wrong destination.</li><li>An event date, venue, city, or artist detail appears incorrect.</li><li>A provider link works differently than expected.</li><li>You have general feedback about the site, guides, or artist pages.</li></ul></section><section class="nested-panel"><h2>What to include</h2><p>Please include the artist name, event date, venue or city, the page URL, the ticket link if relevant, and a short explanation of what looks wrong.</p></section><section class="nested-panel"><h2>What we cannot handle</h2><p>TourTicketCompare does not sell tickets and cannot help with ticket orders, refunds, transfers, delivery problems, payment issues, or provider account access. For those issues, contact the ticket provider shown at checkout.</p></section><div class="action-row">${anchor(
      "Compare concert ticket prices",
      "/compare-concert-ticket-prices",
      "button button-primary"
    )}${anchor("Read buying guides", "/guides", "button button-secondary")}</div></section></main>`;
  }

  if (route.path === "/about") {
    return `<main id="mainContent"><section class="content-page" aria-labelledby="aboutTitle">${renderBreadcrumbHtml(
      route
    )}<h1 id="aboutTitle">About TourTicketCompare</h1><p class="lead">TourTicketCompare is an independent, unofficial site that helps fans research tickets for major live music tours.</p><section class="nested-panel"><h2>What we do</h2><ul class="check-list"><li>Collect verified ticket links for major artists so you have a reliable starting point.</li><li>Show event-specific ticket links only when the artist, date, venue, and destination have been checked.</li><li>Publish plain buying guides on fees, resale, delivery timing, and what to confirm before checkout.</li></ul></section><section class="nested-panel"><h2>What we do not do</h2><ul class="check-list"><li>Sell or resell tickets.</li><li>Compare prices across providers or claim one site is cheaper.</li><li>Invent tour dates, venues, prices, or availability.</li></ul></section><section class="nested-panel"><h2>Why affiliate links do not change our standards</h2><p>Some links are affiliate links, so we may earn a commission when you buy. That never decides which links we show. A link only appears once its destination has been checked, whether or not it earns us anything.</p></section><div class="action-row">${anchor(
      "Compare concert ticket prices",
      "/compare-concert-ticket-prices",
      "button button-primary"
    )}${anchor("Read buying guides", "/guides", "button button-secondary")}</div></section></main>`;
  }

  if (route.path === "/editorial-policy") {
    return `<main id="mainContent"><section class="content-page" aria-labelledby="editorialTitle">${renderBreadcrumbHtml(
      route
    )}<h1 id="editorialTitle">Editorial policy</h1><p class="lead">TourTicketCompare publishes artist and ticket-link information only when the source can be checked. These are the editorial rules we follow before anything appears on the site.</p><section class="nested-panel"><h2>What we publish</h2><ul class="check-list"><li>Artist watchlist pages for major tours, with factual artist summaries drawn from confirmed public sources.</li><li>Verified provider destinations, such as artist-level links to official ticketing sites.</li><li>Event-specific ticket links where the event date, venue, and destination have been checked.</li><li>Practical buying guides on fees, resale, delivery timing, and what to confirm before checkout.</li></ul></section><section class="nested-panel"><h2>What we verify before showing ticket links</h2><p>A ticket button appears only when the artist is a known, verified artist, the destination is a configured verified link, and the link passes our outbound safety checks. Event-specific buttons additionally require a verified event record with a confirmed date, venue, and artist. We use official artist, ticketing, and approved affiliate sources where available, and we show a clear empty state when no verified link exists.</p></section><section class="nested-panel"><h2>What we do not publish</h2><ul class="check-list"><li>Invented tour dates, venues, or cities.</li><li>Ticket prices, availability, or inventory status we cannot confirm from an approved source.</li><li>Provider partnership or coverage claims we cannot confirm.</li><li>Fake comparison tables or placeholder pricing.</li><li>Listings obtained by scraping ticket providers or other sites.</li><li>Savings, discount, or value claims we cannot support with approved provider data.</li><li>Event schema on pages without verified event-level data.</li></ul></section><section class="nested-panel"><h2>Corrections and broken links</h2><p>If a ticket button is broken, opens the wrong destination, or an event detail looks incorrect, please report it through our ${anchor(
      "contact page",
      "/contact",
      "text-link"
    )}. When we find a link that is outdated or can no longer be verified, we update or remove it rather than leave it live.</p></section><div class="action-row">${anchor(
      "Compare concert ticket prices",
      "/compare-concert-ticket-prices",
      "button button-primary"
    )}${anchor("How it works", "/how-it-works", "button button-secondary")}${anchor(
      "Affiliate disclosure",
      "/affiliate-disclosure",
      "button button-secondary"
    )}${anchor("Contact", "/contact", "button button-secondary")}</div></section></main>`;
  }

  return `<main id="mainContent"><div id="ttc-main"><section class="hero-panel" aria-labelledby="heroTitle"><div class="hero-copy-block"><h1 class="hero-title" id="heroTitle">Find verified ticket links for major tours</h1><p class="hero-subcopy">Verified ticket links and buying guidance for major tours. Open the checked provider page for your date and confirm final prices, fees, and availability with the provider.</p><p class="disclosure-note">Current checked event coverage is strongest in the United States, with selected UK, Europe, and Canada dates where verified links are available.</p><form class="hero-search-form" role="search" aria-label="Search artists, events, and guides"><label class="sr-only" for="site-search">Search by artist, city, country, venue, or tour</label><input class="hero-search-input" type="search" id="site-search" name="q" placeholder="Search by artist, city, country, venue, or tour" aria-label="Search by artist, city, country, venue, or tour" autocomplete="off" spellcheck="false" enterkeyhint="search" /><button class="button button-primary hero-search-submit" type="submit">Search</button></form><div class="action-row">${anchor(
    "Compare concert ticket prices",
    "/compare-concert-ticket-prices",
    "button button-primary"
  )}${anchor("Browse artists", "#featured-artists", "button button-secondary")}${anchor("Read buying guides", "/guides", "button button-secondary")}</div></div></section><section id="search-widget" class="section-grid search-section" aria-labelledby="searchSectionTitle"><div class="section-intro"><h2 id="searchSectionTitle">Search results</h2><p>Search artists, events, and guides we’ve reviewed — by name, city, country, venue, or tour.</p></div><div class="search-results" role="region" aria-label="Search results" aria-live="polite" aria-atomic="false"></div></section><section class="section-grid what-you-can-do" aria-labelledby="whatYouCanDoTitle"><div class="section-intro"><h2 id="whatYouCanDoTitle">What you can do here</h2></div><div class="card-grid"><article class="info-card"><h3>Find your show</h3><p>Browse an artist's checked dates and filter by city, country, or venue to reach the right event page fast.</p>${anchor("Browse artists", "/artists", "text-link")}</article><article class="info-card"><h3>Understand fees and totals</h3><p>Service and delivery fees change the final total. Learn how to check what you will actually pay before checkout.</p>${anchor("Read the guide", "/guides/how-to-compare-concert-ticket-prices", "text-link")}</article><article class="info-card"><h3>Avoid risky listings</h3><p>Spot resale red flags, fake urgency, and scam patterns before you hand over payment details.</p>${anchor("Read the guide", "/guides/how-to-avoid-ticket-scams", "text-link")}</article></div></section><section id="featured-artists" class="section-grid" aria-labelledby="homeArtistsTitle"><div class="section-intro"><h2 id="homeArtistsTitle">Featured artists</h2><p>Every artist page lists checked upcoming dates, with links to the exact event page where one is verified.</p></div>${renderArtistStatusLegendHtml()}${renderArtistLinks(
    catalog,
    events
  )}</section><section class="section-grid" aria-labelledby="homeBuyingGuidesTitle"><div class="section-intro"><h2 id="homeBuyingGuidesTitle">Buying guides</h2><p>Practical guides for comparing final prices, avoiding risky listings, and understanding ticket provider terms.</p></div>${renderHomepageGuideLinks()}<div class="action-row">${anchor(
    "View all guides",
    "/guides",
    "button button-secondary"
  )}</div></section><section class="section-grid trust-section" aria-labelledby="trustTitle"><div class="section-intro"><h2 id="trustTitle">Trust &amp; transparency</h2></div><div class="nested-panel"><p>TourTicketCompare is independent and unofficial. We do not sell tickets.</p><p>We only show ticket destinations that pass our verification checks.</p><p>Some links may earn us a commission. That never changes which links we show, or the price you pay.</p><p>Final prices, fees, and availability are confirmed by the provider.</p><p>Learn more: ${anchor("How we work", "/how-it-works", "text-link")} • ${anchor("Affiliate disclosure", "/affiliate-disclosure", "text-link")}</p></div></section></div></main>`;
}

function injectRoute(html, route, origin, catalog, events = [], guideContent = {}, env = {}) {
  origin = canonicalOrigin(origin);
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
  const ogImageUrl = `${origin}/og-image.png`;
  next = next.replace(
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:image" content="${escapeAttr(ogImageUrl)}" />`
  );
  next = next.replace(
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:image" content="${escapeAttr(ogImageUrl)}" />`
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
    /<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:type" content="${route.type === "guide" ? "article" : "website"}" />`
  );
  next = next.replace(
    /<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/i,
    `<script type="application/ld+json">${JSON.stringify(routeSchema(route, origin, guideContent, events, catalog))}</script>`
  );
  next = next.replace(/<main\s+id="mainContent">[\s\S]*?<\/main>/i, renderMainContent(route, catalog, events, guideContent, env));
  if (route.path === "/") {
    // Homepage-only progressive enhancement: ttc-home.js hydrates the #ttc-main
    // mount with the full redesigned homepage. Same-origin, so it satisfies the
    // existing CSP (script-src 'self'). The chrome stylesheet (ttc-home.css) is
    // loaded site-wide from the shell <head>; only this script is homepage-scoped.
    next = next.replace("</body>", '<script src="/ttc-home.js" defer></script></body>');
  }
  return next;
}

const INTERNAL_IMPACT_TAG_TEST_PATH = "/internal/impact-tag-test";

function safeImpactCdnUrl(value) {
  const raw = String(value || "").trim();
  if (!raw) return null;
  try {
    const parsed = new URL(raw);
    if (parsed.protocol !== "https:") return null;
    const host = parsed.hostname.toLowerCase();
    if (!/(^|\.)impactcdn\.com$|(^|\.)impact\.com$/.test(host)) return null;
    return parsed.toString();
  } catch (err) {
    return null;
  }
}

function safeImpactCdnOrigin(value) {
  const url = safeImpactCdnUrl(value);
  if (!url) return null;
  try {
    return new URL(url).origin;
  } catch (err) {
    return null;
  }
}

function safeSeatGeekUrl(value) {
  const raw = String(value || "").trim();
  if (!raw) return null;
  try {
    const parsed = new URL(raw);
    if (parsed.protocol !== "https:") return null;
    const host = parsed.hostname.toLowerCase();
    if (host === "seatgeek.com" || host.endsWith(".seatgeek.com")) return parsed.toString();
    return null;
  } catch (err) {
    return null;
  }
}

function pickSampleTicketmasterUrl(events) {
  if (!Array.isArray(events)) return null;
  for (const event of events) {
    const url = safeShowTicketUrl(event && event.ticketmaster_url);
    if (url) {
      return { url, id: String(event.id || "").trim(), eventId: String(event.ticketmaster_event_id || "").trim() };
    }
  }
  return null;
}

function tokenMatches(provided, expected) {
  const a = String(provided || "");
  const b = String(expected || "");
  if (!a || !b || a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return mismatch === 0;
}

function internalTagTestCsp(extraScriptOrigins = []) {
  const baseScript = ["'self'", "https://utt.impactcdn.com"];
  const baseConnect = ["'self'", "https://utt.impactcdn.com"];
  for (const origin of extraScriptOrigins) {
    if (origin && !baseScript.includes(origin)) baseScript.push(origin);
    if (origin && !baseConnect.includes(origin)) baseConnect.push(origin);
  }
  return [
    "default-src 'self'",
    "img-src 'self' data:",
    "style-src 'self'",
    `script-src ${baseScript.join(" ")}`,
    `connect-src ${baseConnect.join(" ")}`,
    "base-uri 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'"
  ].join("; ");
}

async function renderInternalImpactTagTest(request, env, url) {
  const expectedToken = String(env && env.IMPACT_TAG_TEST_TOKEN ? env.IMPACT_TAG_TEST_TOKEN : "");
  const providedToken = url.searchParams.get("token") || "";
  if (!expectedToken || !tokenMatches(providedToken, expectedToken)) {
    return null;
  }

  const events = await loadEvents(env);
  const sample = pickSampleTicketmasterUrl(events);

  const sgRawCandidate =
    url.searchParams.get("sgUrl") ||
    (env && env.IMPACT_TAG_TEST_SEATGEEK_URL) ||
    "";
  const sgRawUrl = safeSeatGeekUrl(sgRawCandidate);

  const sgShowId = String(
    url.searchParams.get("sgShowId") ||
      (env && env.IMPACT_TAG_TEST_SEATGEEK_SHOW_ID) ||
      ""
  ).trim();

  const sgTagCandidate =
    url.searchParams.get("sgTagUrl") ||
    (env && env.IMPACT_SEATGEEK_PUBLISHER_TAG_URL) ||
    "";
  const sgTagSrc = safeImpactCdnUrl(sgTagCandidate);
  const sgTagOrigin = safeImpactCdnOrigin(sgTagCandidate);
  const sgTagParamProvided = url.searchParams.has("sgTagUrl");

  const tmRawAnchor = sample
    ? `<a href="${escapeAttr(sample.url)}" data-provider="ticketmaster" data-test-link="raw-ticketmaster" rel="noopener nofollow">Raw Ticketmaster direct link</a>`
    : `<span class="disabled-note" data-test-link="raw-ticketmaster" data-provider="ticketmaster">Raw Ticketmaster direct link unavailable: no event with a Ticketmaster URL found in events.json.</span>`;

  const sgRawAnchor = sgRawUrl
    ? `<a href="${escapeAttr(sgRawUrl)}" data-provider="seatgeek" data-test-link="raw-seatgeek" rel="noopener nofollow">Raw SeatGeek direct link</a>`
    : `<span class="disabled-note" data-test-link="raw-seatgeek" data-provider="seatgeek">Raw SeatGeek direct link unavailable: pass <code>?sgUrl=</code> or set <code>IMPACT_TAG_TEST_SEATGEEK_URL</code> to a https://seatgeek.com URL.</span>`;

  const tmOutHref = sample
    ? `/api/out?${new URLSearchParams({ showId: sample.id, provider: "ticketmaster" }).toString()}`
    : null;
  const tmOutAnchor = tmOutHref
    ? `<a href="${escapeAttr(tmOutHref)}" data-provider="ticketmaster" data-test-link="out-ticketmaster" rel="noopener nofollow">/api/out Ticketmaster control</a>`
    : `<span class="disabled-note" data-test-link="out-ticketmaster" data-provider="ticketmaster">/api/out Ticketmaster control unavailable: no sample event found.</span>`;

  const sgOutHref = sgShowId
    ? `/api/out?${new URLSearchParams({ showId: sgShowId, provider: "seatgeek" }).toString()}`
    : null;
  const sgOutAnchor = sgOutHref
    ? `<a href="${escapeAttr(sgOutHref)}" data-provider="seatgeek" data-test-link="out-seatgeek" rel="noopener nofollow">/api/out SeatGeek control</a>`
    : `<span class="disabled-note" data-test-link="out-seatgeek" data-provider="seatgeek">/api/out SeatGeek control unavailable: pass <code>?sgShowId=</code> or set <code>IMPACT_TAG_TEST_SEATGEEK_SHOW_ID</code>. Backend SeatGeek + Impact SeatGeek program credentials must also be configured server-side for the redirect to succeed.</span>`;

  const sgTagMeta = sgTagSrc
    ? `<meta name="impact-sg-tag-src" content="${escapeAttr(sgTagSrc)}" />`
    : "";

  const sgTagBanner = sgTagSrc
    ? `<p class="info-note">SeatGeek Publisher Tag will load using ${sgTagParamProvided ? "the validated <code>?sgTagUrl=</code> override" : "configured environment"} and a separate global (<code>window.impactStatSG</code>).</p>`
    : `<p class="warning-note"><strong>Warning:</strong> SeatGeek Publisher Tag is not loaded. Pass <code>?sgTagUrl=</code> or set <code>IMPACT_SEATGEEK_PUBLISHER_TAG_URL</code> (must point to an https://utt.impactcdn.com, https://*.impactcdn.com, or https://*.impact.com URL) to enable.</p>`;

  const body = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex,nofollow" />
<meta name="referrer" content="no-referrer" />
<title>Impact Publisher Tag Test (internal) | TourTicketCompare</title>
${sgTagMeta}
<link rel="stylesheet" href="/internal/impact-tag-test.css" />
</head>
<body>
<h1>Impact Publisher Tag Test (internal)</h1>
<p>Internal-only route. Not indexable. Exercises the SeatGeek Impact Publisher Tag. The Ticketmaster Publisher Tag was removed when the site left the Ticketmaster affiliate programme; the Ticketmaster links below are plain, untracked controls.</p>
<p>A Publisher Tag may transform at page load, at click time, through query decoration, or in a way that is confirmed only by Impact dashboard reporting. Do not treat a no-change href snapshot after 2 seconds as a final attribution failure.</p>
<p>Final SeatGeek pass/fail depends on the raw SeatGeek URL landing on the correct SeatGeek event page, the SeatGeek Impact account recording the click, and no double transformation. Keep <code>/api/out</code> controls as the fallback/reference path.</p>
${sgTagBanner}
<p id="sgTagStatus" class="info-note">SeatGeek Publisher Tag status will appear after the helper script runs.</p>

<section class="section">
  <h2>Test links</h2>
  <div class="links">
    ${tmRawAnchor}
    ${sgRawAnchor}
    ${tmOutAnchor}
    ${sgOutAnchor}
  </div>
</section>

<section class="section">
  <h2>Href snapshot diagnostics</h2>
  <p>Initial full hrefs and hosts are captured on DOMContentLoaded. Post-load hrefs and hosts are captured ~2 seconds later. Host changes are reported, but query-param decoration can count as a transform even when the host stays the same. No visible change is not conclusive because some tags transform on click or are verified only in Impact reporting. Nothing is sent off-device.</p>
  <div class="results-scroll">
    <table id="tagTestResults" data-schema-version="expanded-diagnostics-20260513"><thead><tr><th>label</th><th>data-provider</th><th>data-test-link</th><th>initial href host</th><th>post-load href host</th><th>initial full href</th><th>post-load full href</th><th>host changed</th><th>full href changed</th><th>recognised params</th><th>added params</th><th>tracking likely</th><th>diagnostic note</th></tr></thead><tbody><tr><td colspan="13">Waiting for snapshots...</td></tr></tbody></table>
  </div>
</section>

<script src="/internal/impact-tag-test.js?v=expanded-diagnostics-20260513" defer></script>
</body>
</html>`;

  const headers = new Headers();
  headers.set("Content-Type", "text/html; charset=UTF-8");
  headers.set("Cache-Control", "no-store");
  headers.set("X-Robots-Tag", "noindex, nofollow");
  headers.set("Referrer-Policy", "no-referrer");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Frame-Options", "DENY");
  headers.set("Permissions-Policy", "interest-cohort=()");
  headers.set("Cross-Origin-Opener-Policy", "same-origin");
  headers.set("Cross-Origin-Resource-Policy", "same-origin");
  const extraOrigins = sgTagOrigin ? [sgTagOrigin] : [];
  headers.set("Content-Security-Policy", internalTagTestCsp(extraOrigins));
  return new Response(body, { status: 200, headers });
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
    `<main id="mainContent"><section class="content-page" aria-labelledby="notFoundTitle"><h1 id="notFoundTitle">Page not found</h1><p>We could not find that page. Use the artist index, buying guides, or homepage to find current public pages.</p><div class="action-row">${anchor(
      "Compare concert ticket prices",
      "/compare-concert-ticket-prices",
      "button button-primary"
    )}${anchor("Read buying guides", "/guides", "button button-secondary")}${anchor("Return home", "/", "button button-secondary")}</div></section></main>`
  );
  return next;
}

export async function onRequest(context) {
  const { request, env, next } = context;
  const url = new URL(request.url);

  // Safety net for www→apex host normalization; if a Cloudflare edge redirect
  // rule exists it fires before this code is reached.
  if (url.hostname === `www.${CANONICAL_HOST}`) {
    const apexUrl = new URL(url);
    apexUrl.hostname = CANONICAL_HOST;
    return Response.redirect(apexUrl.toString(), 301);
  }

  const pathname = normalizePath(url.pathname);

  if (RESERVED_PREFIXES.some((prefix) => pathname.startsWith(prefix)) || RESERVED_FILES.has(pathname)) return next();

  if (pathname === INTERNAL_IMPACT_TAG_TEST_PATH) {
    const internalResponse = await renderInternalImpactTagTest(request, env, url);
    if (internalResponse) return internalResponse;
    // No valid token: fall through to the standard 404 path below.
  }

  const route = await routeForPath(pathname, env);
  if (!route && /\.[a-z0-9]+$/i.test(pathname)) return next();
  const indexResponse = await env.ASSETS.fetch(new Request(new URL("/", request.url), request));
  if (!indexResponse.ok) return next();

  const html = await indexResponse.text();
  if (!route) {
    const injected404 = renderNotFoundHtml(html, pathname, url.origin);
    const headers = new Headers(indexResponse.headers);
    headers.set("Content-Type", "text/html; charset=UTF-8");
    headers.set("Cache-Control", "no-store");
    applySecurityHeaders(headers);
    return new Response(injected404, { status: 404, headers });
  }

  if (route.type === "redirect") {
    return Response.redirect(new URL(route.location, url.origin).toString(), 301);
  }

  const catalog = await loadCatalog(env);
  const needsEvents = route.type === "artist" || route.type === "comparison-hub" || route.path === "/artists" || route.path === "/";
  const events = needsEvents ? await loadEvents(env) : [];
  const guideContent = route.type === "guide" ? await loadGuideContent(env) : {};
  const injected = injectRoute(html, route, url.origin, catalog, events, guideContent, env);
  const headers = new Headers(indexResponse.headers);
  headers.set("Content-Type", "text/html; charset=UTF-8");
  headers.set("Cache-Control", "public, max-age=300");
  applySecurityHeaders(headers);
  return new Response(injected, { status: 200, headers });
}
