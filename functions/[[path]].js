import { TRUST_ROUTES, GUIDE_ROUTES, OLD_GUIDE_REDIRECTS, CANONICAL_HOST, canonicalOrigin } from "./_route-metadata.js";
import { attachApprovedMarketplacePrices } from "./api/shows.js";
import { impactMarketplaceRuntimeConfig } from "./_impact-marketplace-config.js";
import { deriveVenues, findVenue } from "./_venues.js";

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

// Keep the highest-value editorial guide routable even if an edge deploy briefly
// serves stale route metadata. This fallback mirrors _route-metadata.js and
// prevents Googlebot/Search Console from seeing a transient 404/noindex response.
const EVENT_PRICE_GUIDE_PATH = "/guides/how-to-compare-event-ticket-prices";
const EVENT_PRICE_GUIDE_FALLBACK = {
  title: "How to Compare Event Ticket Prices | TourTicketCompare",
  h1: "How to Compare Event Ticket Prices",
  description:
    "Compare event ticket prices across concerts, sports, and theatre by matching the exact event, seat or section, ticket type, fees, delivery, and final checkout total.",
  fullContent: true,
  datePublished: "2026-07-14",
  lastmod: "2026-07-14"
};

// _headers applies to static-asset responses only, not to function-generated responses.
// These headers must be set explicitly on every HTML Response returned by this function.
const SECURITY_HEADERS = {
  // The sha256 hash authorizes the inline Google tag (gtag.js) snippet in public/index.html;
  // recompute it if that snippet's contents change (see scripts/smoke-prelaunch.mjs EXPECTED_CSP).
  "Content-Security-Policy":
    "default-src 'self'; img-src 'self' data: https://*.google-analytics.com https://*.googletagmanager.com; style-src 'self'; script-src 'self' 'sha256-NA6Fs6EENO5v4wTsp2imB+jef7W4UHySG38JuT59oy0=' https://*.googletagmanager.com https://utt.impactcdn.com; connect-src 'self' https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com https://utt.impactcdn.com; base-uri 'self'; frame-ancestors 'none'; object-src 'none'",
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

function showAnchorId(show) {
  const id = slugify(show?.id);
  return id ? `show-${id}` : "";
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
  const guide = GUIDE_ROUTES[path] || (path === EVENT_PRICE_GUIDE_PATH ? EVENT_PRICE_GUIDE_FALLBACK : null);
  if (guide) {
    return {
      type: "guide",
      path,
      indexable: true,
      ...guide,
      breadcrumb: [
        { name: "Guides", path: "/guides" },
        { name: guide.title.replace(" | TourTicketCompare", ""), path }
      ]
    };
  }

  if (path === "/venues" || path.startsWith("/venues/")) {
    const venueEvents = await loadEvents(env);
    if (path === "/venues") {
      const venues = deriveVenues(venueEvents).filter((venue) => venue.indexable);
      return {
        type: "venues-index",
        path,
        indexable: true,
        title: "Concert Venues | Upcoming Tour Dates by Venue | TourTicketCompare",
        description:
          "Browse concert venues and the upcoming tracked tour dates at each, with links to verified artist ticket pages and approved price snapshots where available.",
        venues,
        breadcrumb: [{ name: "Venues", path: "/venues" }]
      };
    }
    const venueMatch = path.match(/^\/venues\/([a-z0-9-]+)$/);
    if (!venueMatch) return null;
    const venue = findVenue(venueEvents, venueMatch[1]);
    if (!venue) return null;
    const artistsMeta = await loadArtistsMeta(env);
    return {
      type: "venue",
      path,
      indexable: venue.indexable,
      title: `${venue.venue} Concerts & Tickets${venue.city ? ` in ${venue.city}` : ""} | TourTicketCompare`,
      description: venueMetaDescription(venue),
      venue,
      events: venueEvents,
      indexableArtistSlugs: artistsMeta
        .filter((artist) => artist?.indexing_status === "indexable_with_substantial_content")
        .map((artist) => slugify(artist?.slug)),
      breadcrumb: [
        { name: "Venues", path: "/venues" },
        { name: venue.venue, path }
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
  const organizationId = `${origin}/#organization`;
  const websiteId = `${origin}/#website`;
  return [
    {
      "@type": "Organization",
      "@id": organizationId,
      name: "TourTicketCompare",
      url: `${origin}/`,
      description: "Independent ticket research for major live music tours with verified links and approved, timestamped provider price snapshots where available.",
      logo: {
        "@type": "ImageObject",
        url: `${origin}/og-image.png`,
        width: 1200,
        height: 630
      }
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      name: "TourTicketCompare",
      url: `${origin}/`,
      publisher: { "@id": organizationId },
      inLanguage: "en",
      description: "Independent ticket research for major live music tours with verified ticket links where available.",
      potentialAction: {
        "@type": "SearchAction",
        target: `${origin}/?q={search_term_string}#search-widget`,
        "query-input": "required name=search_term_string"
      }
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
      "Are ticket prices shown here?",
      "A timestamped listed-price snapshot may appear when approved provider data for the exact event passes verification and freshness checks. It is not live inventory or a final checkout total; confirm the current price, fees, availability, and terms with the provider."
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
// docs/CONTENT_RULES.md). Offers, prices, and availability stay off every node
// by default — validate-route-schema.mjs fails the build if they appear — with
// one owner-approved exception (2026-07-22, SAFE_PUBLISHING_RULES.md): behind
// SCHEMA_OFFERS_ENABLED, an `offers` array may mirror the visible price badge
// for the redistribution-approved lanes in SCHEMA_OFFERS_APPROVED_PROVIDERS
// (see musicEventOffersSchema below). Availability is never emitted under any
// flag. `description` and `image` are composed only from already-verified
// facts (name/venue/city/date) and the site's own representative image, so
// they add Search Console coverage without inventing data. `organizer` and
// `endDate` stay omitted: we hold no verified promoter or event end time, and
// fabricating either would violate the never-invent rule.
function musicEventsSchema(route, origin, events, env = {}) {
  const artistId = `${origin}${route.path}#artist`;
  const offersEnabled = schemaOffersEnabledForArtist(env, route.artist.slug);
  return futureShowsForArtist(events, route.artist.slug, 6)
    .filter((show) => show.publishable && show.dateTimeISO && show.venue && show.city)
    .map((show) => {
      const anchorId = showAnchorId(show);
      const displayDate = formatShowDateServer(show.dateTimeISO);
      const description = `${route.artist.name} live at ${show.venue} in ${show.city}${displayDate ? ` on ${displayDate}` : ""}.`;
      const offers = offersEnabled ? musicEventOffersSchema(show, origin, env) : [];
      return {
        "@type": "MusicEvent",
        name: show.event_name || `${route.artist.name} — ${show.city}`,
        description,
        image: `${origin}/og-image.png`,
        startDate: show.dateTimeISO,
        eventStatus: "https://schema.org/EventScheduled",
        location: {
          "@type": "Place",
          name: show.venue,
          address: { "@type": "PostalAddress", addressLocality: show.city }
        },
        performer: { "@id": artistId },
        url: `${origin}${route.path}#${anchorId}`,
        ...(offers.length ? { offers } : {})
      };
    });
}

// Schema offers are opt-in per environment (default off) and optionally scoped
// to a pilot artist list, so rollout and rollback are dashboard flag flips —
// the next render simply omits the nodes. Indexed copies age out under their
// own priceValidUntil; there is no revocation mechanism beyond recrawl.
function schemaOffersEnabledForArtist(env, artistSlug) {
  if (String(env?.SCHEMA_OFFERS_ENABLED || "").trim().toLowerCase() !== "true") return false;
  const pilotSlugs = String(env?.SCHEMA_OFFERS_PILOT_SLUGS || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  return pilotSlugs.length === 0 || pilotSlugs.includes(String(artistSlug || ""));
}

// An Offer node may exist only when the same gate chain that renders the
// visible price badge on the provider CTA button passes on the same render:
// provider configured, event-level provenance publishable, tracked /api/out
// destination, approvedServerPriceLane (approved source, fresh unexpired
// cache row, finite price, ISO currency), and the badge formatting checks.
// Each Offer carries only price, priceCurrency, priceValidUntil (the snapshot
// row's expires_at — the machine-readable claim expires with the same row
// that hides the visible price), and the tracked /api/out URL. Availability
// and inventory are never emitted. Keep the gate chain in sync with
// renderShowCardServerHtml.
function musicEventOffersSchema(show, origin, env) {
  const laneSpecs = [];
  if (
    SCHEMA_OFFERS_APPROVED_PROVIDERS.includes("vivid-seats") &&
    vividSeatsOutAvailable(show, isVividSeatsConfigured(env))
  ) {
    laneSpecs.push({ slug: "vivid-seats", name: "Vivid Seats" });
  }
  for (const provider of IMPACT_MARKETPLACE_PROVIDERS) {
    if (!SCHEMA_OFFERS_APPROVED_PROVIDERS.includes(provider.slug)) continue;
    const publishable = show?.impactMarketplacePublishable?.[provider.slug] ?? providerEventPublishable(show, provider.slug);
    if (isImpactMarketplaceConfigured(env, provider) && publishable) {
      laneSpecs.push({ slug: provider.slug, name: provider.name });
    }
  }
  const offers = [];
  for (const spec of laneSpecs) {
    const href = eventTicketHref(show, spec.slug);
    const lane = href ? approvedServerPriceLane(show, spec.name) : null;
    if (!lane) continue;
    if (!formatServerPrice(lane.price, lane.currency) || !formatServerSnapshotTime(lane.fetchedAt)) continue;
    offers.push({
      "@type": "Offer",
      price: lane.price,
      priceCurrency: lane.currency,
      priceValidUntil: lane.expiresAt,
      url: `${origin}${href}`
    });
  }
  return offers;
}

function guideClusterTitle(path) {
  const cluster = GUIDE_CLUSTERS.find((entry) => entry.slugs.includes(path));
  return cluster ? cluster.title : undefined;
}

function articleSchema(route, origin, guideEntry = {}) {
  const organizationId = `${origin}/#organization`;
  const citations = (Array.isArray(guideEntry?.sources) ? guideEntry.sources : [])
    .map((source) => safeGuideSourceUrl(source?.url))
    .filter(Boolean);
  return {
    "@type": "Article",
    "@id": `${origin}${route.path}#article`,
    headline: route.title.replace(" | TourTicketCompare", ""),
    description: route.description,
    mainEntityOfPage: `${origin}${route.path}`,
    url: `${origin}${route.path}`,
    image: `${origin}/og-image.png`,
    author: {
      "@type": "Organization",
      "@id": organizationId,
      name: "TourTicketCompare editorial team",
      url: `${origin}/about`
    },
    publisher: { "@id": organizationId },
    isPartOf: { "@id": `${origin}/#website` },
    inLanguage: "en",
    datePublished: route.datePublished || undefined,
    dateModified: route.lastmod || route.datePublished || undefined,
    articleSection: guideClusterTitle(route.path),
    citation: citations.length ? citations : undefined
  };
}

function routeSchema(route, origin, guideContent = {}, events = [], catalog = {}, env = {}) {
  const graph = baseSchema(origin);
  if (route.breadcrumb) graph.push(breadcrumbSchema(route, origin));
  if (route.type === "artist") {
    graph.push(artistSchema(route, origin), faqSchema(route));
    if (route.indexable) graph.push(...musicEventsSchema(route, origin, events, env));
  }
  if (route.type === "guide") {
    const guideEntry = guideContent[route.path];
    graph.push(articleSchema(route, origin, guideEntry));
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
  if (route.type === "venues-index") {
    graph.push({
      "@type": "CollectionPage",
      "@id": `${origin}${route.path}#webpage`,
      url: `${origin}${route.path}`,
      name: route.title,
      description: route.description,
      isPartOf: { "@type": "WebSite", url: `${origin}/`, name: "TourTicketCompare" }
    });
  }
  if (route.type === "venue" && route.venue) {
    const venue = route.venue;
    graph.push({
      "@type": "MusicVenue",
      "@id": `${origin}${route.path}#venue`,
      name: venue.venue,
      url: `${origin}${route.path}`,
      address: {
        "@type": "PostalAddress",
        addressLocality: venue.city || undefined,
        addressCountry: venue.country || undefined
      }
    });
    graph.push({
      "@type": "CollectionPage",
      "@id": `${origin}${route.path}#webpage`,
      url: `${origin}${route.path}`,
      name: route.title,
      description: route.description,
      about: { "@id": `${origin}${route.path}#venue` },
      isPartOf: { "@type": "WebSite", url: `${origin}/`, name: "TourTicketCompare" }
    });
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

function artistHasVerifiedEventLinks(catalog, events, artistSlug) {
  return futureShowsForArtist(events, artistSlug, 6).some((show) => Boolean(
    show.id && (
      (show.publishable && safeShowTicketUrl(show.ticketmaster_url)) ||
      (show.seatgeekPublishable && safeSeatGeekTicketUrl(show.seatgeek_url)) ||
      (show.vividseatsPublishable && safeVividSeatsTicketUrl(show.vividseats_url)) ||
      IMPACT_MARKETPLACE_PROVIDERS.some((provider) =>
        (catalog?.providers || []).some((entry) => entry?.slug === provider.slug && entry?.public_enabled === true) &&
        show.impactMarketplacePublishable?.[provider.slug] &&
        safeImpactMarketplaceTicketUrl(show?.[provider.urlField], provider)
      )
    )
  ));
}

function artistCardStatus(catalog, artist, events) {
  if (artistHasVerifiedEventLinks(catalog, events, artist.slug)) {
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
      return `<article class="${status.pending ? "artist-card is-pending" : "artist-card"}"><h3>${escapeHtml(
        artist.name
      )}</h3><div class="artist-status-row"><p class="${status.badgeClass}">${escapeHtml(
        status.badge
      )}</p></div><p class="card-status">${escapeHtml(
        showSummary || status.detail
      )}</p>${anchor(status.ctaLabel, `/artists/${artist.slug}`, status.ctaClass)}</article>`;
    })
    .join("")}</div>`;
}

function venueLocationLabel(venue) {
  return [venue.city, venue.country].filter((part) => String(part || "").trim()).join(", ");
}

function venueShowCountLabel(count) {
  return `${count} upcoming ${count === 1 ? "show" : "shows"}`;
}

function venueArtistCountLabel(count) {
  return `${count} ${count === 1 ? "artist" : "artists"}`;
}

function venueMetaDescription(venue) {
  const location = venueLocationLabel(venue);
  return `Find upcoming shows at ${venue.venue}${location ? ` in ${location}` : ""}. ${venueShowCountLabel(
    venue.showCount
  )} we track across ${venueArtistCountLabel(
    venue.artistSlugs.length
  )}, with links to verified artist ticket pages and approved price snapshots where available.`;
}

// Group a venue's upcoming shows by artist, preserving first-show chronological order.
function venueShowsByArtist(venue) {
  const order = [];
  const byArtist = new Map();
  for (const show of venue.shows) {
    if (!byArtist.has(show.artist_slug)) {
      byArtist.set(show.artist_slug, { slug: show.artist_slug, name: show.artist_name || show.artist_slug, shows: [] });
      order.push(show.artist_slug);
    }
    byArtist.get(show.artist_slug).shows.push(show);
  }
  return order.map((slug) => byArtist.get(slug));
}

function renderVenueLinks(venues) {
  if (!venues.length) {
    return `<p class="muted">No venues with multiple upcoming tracked dates are listed yet. New venues appear here as tour dates are verified.</p>`;
  }
  return `<div class="artist-card-grid">${venues
    .map((venue) => {
      const location = venueLocationLabel(venue);
      return `<article class="artist-card"><h3>${escapeHtml(venue.venue)}</h3>${
        location ? `<p class="card-status">${escapeHtml(location)}</p>` : ""
      }<p class="card-status">${escapeHtml(
        `${venueShowCountLabel(venue.showCount)} · ${venueArtistCountLabel(venue.artistSlugs.length)}`
      )}</p>${anchor("View upcoming shows", `/venues/${venue.slug}`, "button button-secondary")}</article>`;
    })
    .join("")}</div>`;
}

// Indexable venues an artist has upcoming shows at, for the artist -> venue
// backlinks that complete the venue<->artist internal-linking loop.
function artistIndexableVenues(events, artistSlug) {
  const slug = slugify(artistSlug);
  return deriveVenues(events).filter((venue) => venue.indexable && venue.artistSlugs.includes(slug));
}

function renderArtistVenuesHtml(events, artist) {
  const venues = artistIndexableVenues(events, artist.slug);
  if (!venues.length) return "";
  const items = venues
    .slice(0, 30)
    .map((venue) => {
      const location = venueLocationLabel(venue);
      return `<li>${anchor(
        `${venue.venue}${location ? ` — ${location}` : ""}`,
        `/venues/${venue.slug}`
      )}</li>`;
    })
    .join("");
  return `<section class="nested-panel"><h2>Venues on this run</h2><p>See other upcoming shows we track at the venues ${escapeHtml(
    artist.name
  )} is playing:</p><ul class="guide-link-list">${items}</ul></section>`;
}

function renderVenueShowGroups(venue, events = [], indexableArtistSlugs = new Set(), seatGeekAvailable = false, vividSeatsAvailable = false, marketplaceAvailability = {}) {
  const venueRuns = venueRunIndex(venue.shows);
  const eventsById = new Map(
    (Array.isArray(events) ? events : [])
      .filter((event) => event && event.id)
      .map((event) => [String(event.id), event])
  );
  return venueShowsByArtist(venue)
    .map((group) => {
      const cards = group.shows
        .map((show) => {
          const sourceEvent = eventsById.get(show.id);
          const fullShow = sourceEvent ? futureShowsForArtist([sourceEvent], group.slug, 1)[0] : null;
          return fullShow
            ? renderShowCardServerHtml(
                fullShow,
                seatGeekAvailable,
                indexableArtistSlugs.has(group.slug),
                vividSeatsAvailable,
                group.name,
                marketplaceAvailability,
                group.slug,
                venueRuns
              )
            : "";
        })
        .join("");
      return `<article class="nested-panel"><h3>${anchor(
        `${group.name} at ${venue.venue}`,
        `/artists/${group.slug}`
      )}</h3><div class="card-grid show-card-grid venue-show-cards">${cards}</div>${anchor(
        `View all ${group.name} dates and ticket options`,
        `/artists/${group.slug}`,
        "text-link"
      )}</article>`;
    })
    .join("");
}

const GUIDE_CLUSTERS = [
  {
    title: "Compare prices and fees",
    intro: "Compare final checkout totals, fees, and provider terms before you decide.",
    slugs: [
      "/guides/how-to-compare-event-ticket-prices",
      "/guides/how-to-compare-concert-ticket-prices",
      "/guides/how-to-avoid-overpaying-for-concert-tickets",
      "/guides/concert-ticket-fees-explained",
      "/guides/why-ticket-prices-change",
      "/guides/ticketmaster-vs-seatgeek-vs-vivid-seats",
      "/guides/seatgeek-vs-ticketmaster"
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
      seatgeek_url: String(ev.seatgeek_url || "").trim(),
      vividseats_url: String(ev.vividseats_url || "").trim(),
      ticketnetwork_url: String(ev.ticketnetwork_url || "").trim(),
      ticketliquidator_url: String(ev.ticketliquidator_url || "").trim(),
      stubhub_international_url: String(ev.stubhub_international_url || "").trim(),
      publishable: Boolean(
        (eventLinkPublishable(ev) && safeShowTicketUrl(ev.ticketmaster_url)) ||
        (providerEventPublishable(ev, "seatgeek") && safeSeatGeekTicketUrl(ev.seatgeek_url)) ||
        (providerEventPublishable(ev, "vivid-seats") && safeVividSeatsTicketUrl(ev.vividseats_url)) ||
        IMPACT_MARKETPLACE_PROVIDERS.some((provider) => providerEventPublishable(ev, provider.slug) && safeImpactMarketplaceTicketUrl(ev?.[provider.urlField], provider))
      )
    }))
    .filter((show) => show.id && show.dateTimeISO && Number.isFinite(Date.parse(show.dateTimeISO)))
    .filter((show) => Date.parse(show.dateTimeISO) >= Date.now())
    .filter((show) => show.publishable)
    .sort((a, b) => Date.parse(a.dateTimeISO) - Date.parse(b.dateTimeISO))
    .slice(0, limit);
}

function artistUpcomingCount(events, artistSlug) {
  return publishableFutureShows(events).filter((show) => show.artist_slug === slugify(artistSlug)).length;
}

function renderComparisonHubArtistCards(catalog, events = []) {
  const artists = (catalog.artists || [])
    .map((artist) => ({ ...artist, upcomingCount: artistUpcomingCount(events, artist.slug) }))
    .filter((artist) => artist.upcomingCount > 0)
    .sort((a, b) => b.upcomingCount - a.upcomingCount || String(a.name).localeCompare(String(b.name)))
    .slice(0, 12);
  if (!artists.length) return `<p class="muted">Artist pages are being reviewed. Check back for verified ticket links and buying guidance.</p>`;
  return `<div class="artist-card-grid">${artists
    .map((artist) => {
      const countText = `${artist.upcomingCount} upcoming ${artist.upcomingCount === 1 ? "show" : "shows"}`;
      return `<article class="artist-card"><h3>${escapeHtml(artist.name)}</h3><p class="card-status">${escapeHtml(countText)}</p>${anchor("View shows", `/artists/${artist.slug}`, "button button-primary")}</article>`;
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
  return `<section id="current-events" class="nested-panel"><h2>Current provider price snapshots</h2><p>For each exact show, we load available approved provider price snapshots. Event cards may identify the lower displayed snapshot only when multiple current numeric lanes for that event share a currency; confirm fees, tax, availability, delivery, and the final total on the provider site.</p><div class="card-grid show-card-grid">${shows
    .map((show) => {
      const date = formatShowDateServer(show.dateTimeISO);
      const title = show.event_name || [show.artist_name, show.city].filter(Boolean).join(" – ") || "Upcoming concert";
      return `<article class="info-card" data-comparison-show-id="${escapeAttr(show.id)}"><h3>${escapeHtml(title)}</h3>${date ? `<p class="card-status">${escapeHtml(date)}</p>` : ""}<p class="muted">${escapeHtml(showLocationServer(show) || "Venue details shown when verified.")}</p><p class="disclosure-note">Loading approved provider price snapshots…</p>${anchor("View artist ticket options", `/artists/${show.artist_slug}`, "text-link")}</article>`;
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
    ["What is a ticket comparison site?", "A ticket comparison site helps you review options from ticket providers for the same event. TourTicketCompare provides checked links and, where approved data is available, timestamped listed-price snapshots; confirm the current seats, fees, availability and final total on the provider site."],
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

function safeGuideSourceUrl(value) {
  const raw = String(value || "").trim();
  if (!raw) return null;
  try {
    const parsed = new URL(raw);
    return parsed.protocol === "https:" ? parsed.toString() : null;
  } catch (error) {
    return null;
  }
}

function renderGuideProvenance(route) {
  const published = formatVerificationDate(route.datePublished);
  const updated =
    route.lastmod && route.lastmod !== route.datePublished
      ? formatVerificationDate(route.lastmod)
      : null;
  const dates = [
    published ? `Published ${published}` : "",
    updated ? `Updated ${updated}` : ""
  ].filter(Boolean);
  return `<div class="guide-provenance"><p>By ${anchor(
    "TourTicketCompare editorial team",
    "/about",
    "text-link"
  )}${dates.length ? ` · ${escapeHtml(dates.join(" · "))}` : ""}</p><p class="disclosure-note">Our guides are reviewed against primary provider and regulator sources. See the ${anchor(
    "editorial policy",
    "/editorial-policy",
    "text-link"
  )} for the verification and corrections process.</p></div>`;
}

function renderGuideSources(sources) {
  if (!Array.isArray(sources) || !sources.length) return "";
  const items = sources
    .map((source) => {
      const url = safeGuideSourceUrl(source?.url);
      const name = String(source?.name || "").trim();
      if (!url || !name) return "";
      const publisher = String(source?.publisher || "").trim();
      const checked = formatVerificationDate(source?.lastChecked);
      const details = [publisher, checked ? `checked ${checked}` : ""].filter(Boolean).join(" · ");
      return `<li><a class="text-link" href="${escapeAttr(url)}" target="_blank" rel="noopener">${escapeHtml(
        name
      )}</a>${details ? ` <span class="muted">(${escapeHtml(details)})</span>` : ""}</li>`;
    })
    .filter(Boolean)
    .join("");
  if (!items) return "";
  return `<section class="nested-panel guide-sources"><h2>Sources</h2><p>Primary sources used to check time-sensitive provider and fee claims in this guide:</p><ul class="guide-link-list">${items}</ul></section>`;
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

const IMPACT_MARKETPLACE_PROVIDERS = [
  { slug: "ticketnetwork", name: "TicketNetwork", envPrefix: "IMPACT_TICKETNETWORK", urlField: "ticketnetwork_url", allowedHosts: ["ticketnetwork.com"], priceSource: "ticketnetwork_impact_marketplace_api", publicFlag: "TICKETNETWORK_PUBLIC_ENABLED" },
  { slug: "ticket-liquidator", name: "Ticket Liquidator", envPrefix: "IMPACT_TICKETLIQUIDATOR", urlField: "ticketliquidator_url", allowedHosts: ["ticketliquidator.com"], priceSource: "ticketliquidator_impact_marketplace_api", publicFlag: "TICKETLIQUIDATOR_PUBLIC_ENABLED" },
  { slug: "stubhub-international", name: "StubHub International", envPrefix: "IMPACT_STUBHUB_INTERNATIONAL", urlField: "stubhub_international_url", allowedHosts: ["stubhub.co.uk", "stubhub.ie", "stubhub.de", "stubhub.fr", "stubhub.es", "stubhub.it", "stubhub.pt", "stubhub.pl", "stubhub.se", "stubhub.dk", "stubhub.fi", "stubhub.gr", "stubhub.nl", "stubhub.lu", "stubhub.cz", "stubhub.be", "stubhub.co.at"], priceSource: "stubhub_international_impact_marketplace_api", publicFlag: "STUBHUB_INTERNATIONAL_PUBLIC_ENABLED" }
];

// Owner-approved lanes for machine-readable price redistribution in JSON-LD
// Offer nodes (confirmed with each programme 2026-07-22; see
// SAFE_PUBLISHING_RULES.md and docs/PROVIDER_DATA_POLICY.md).
// validate-route-schema.mjs imports this list: a provider absent here can
// never emit an Offer node, whatever the runtime flags say. Ticketmaster,
// SeatGeek, and Ticket Liquidator are deliberately excluded.
export const SCHEMA_OFFERS_APPROVED_PROVIDERS = Object.freeze(["vivid-seats", "ticketnetwork", "stubhub-international"]);

// Affiliate providers render before the plain,
// unmonetized Ticketmaster link. Keep in sync with PROVIDER_DISPLAY_ORDER in
// public/app.js.
const PROVIDER_DISPLAY_ORDER = ["seatgeek", "vivid-seats", ...IMPACT_MARKETPLACE_PROVIDERS.map((provider) => provider.slug), "ticketmaster"];
const PROVIDER_DISPLAY_NAMES = { ticketmaster: "Ticketmaster", seatgeek: "SeatGeek", "vivid-seats": "Vivid Seats", ...Object.fromEntries(IMPACT_MARKETPLACE_PROVIDERS.map((provider) => [provider.slug, provider.name])) };

function providerDisplayRank(providerSlug) {
  const rank = PROVIDER_DISPLAY_ORDER.indexOf(providerSlug);
  return rank === -1 ? PROVIDER_DISPLAY_ORDER.length : rank;
}

// SeatGeek / Vivid Seats artist cards render only when the provider's
// Impact config is present server-side, so an unconfigured provider never
// shows a dead button. Plain Ticketmaster links have no config requirement.
function availableArtistProviderLinks(catalog, artist, providerAvailability = {}) {
  return ticketLinksForArtist(catalog, artist.slug)
    .filter((item) => slugify(item.provider) === "ticketmaster" || Boolean(safeShowTicketUrl(item?.url)))
    .filter((item) => {
      const provider = slugify(item.provider);
      if (provider === "seatgeek") return providerAvailability.seatgeek === true;
      if (provider === "vivid-seats") return providerAvailability["vivid-seats"] === true;
      if (IMPACT_MARKETPLACE_PROVIDERS.some((candidate) => candidate.slug === provider)) return providerAvailability[provider] === true;
      return true;
    })
    .sort((a, b) => providerDisplayRank(slugify(a.provider)) - providerDisplayRank(slugify(b.provider)));
}

function renderProviderFallback(catalog, artist, surface, providerAvailability = {}) {
  const links = availableArtistProviderLinks(catalog, artist, providerAvailability);
  if (!links.length) {
    return `<section class="provider-panel"><h2>Provider links</h2><p class="muted">No artist-level provider page has been verified yet — buttons appear only after destination checks.</p><p class="muted">What to check before committing to a ticketing platform:</p><ul class="guide-link-list"><li>${anchor("How to avoid overpaying for concert tickets", "/guides/how-to-avoid-overpaying-for-concert-tickets")}</li><li>${anchor("When is the best time to buy concert tickets?", "/guides/when-is-the-best-time-to-buy-concert-tickets")}</li><li>${anchor("How to spot ticket scams and fake listings", "/guides/how-to-avoid-ticket-scams")}</li></ul><div class="action-row">${anchor("Read buying guides", "/guides", "button button-secondary")}${anchor("Browse other artists", "/artists", "button button-secondary")}</div></section>`;
  }
  const cards = links
    .map((item) => {
      const provider = slugify(item.provider);
      const displayName = PROVIDER_DISPLAY_NAMES[provider] || item.provider;
      const label = "Check provider";
      const destination = artistProviderHref(artist, item, surface);
      const verificationNote = providerVerificationNote(item);
      return `<article class="provider-card"><p class="eyebrow">Artist-level provider page</p><h3>${escapeHtml(displayName)}</h3>${anchor(
        label,
        destination,
        "button button-primary",
        `target="_blank" rel="${escapeAttr(outboundCtaRel(destination) || "noopener")}" data-cta-provider="${escapeAttr(provider)}" data-cta-artist="${escapeAttr(artist.slug)}" data-cta-price-snapshot="absent" data-cta-location="artist_provider_panel"${item.link_id ? ` data-cta-link-id="${escapeAttr(item.link_id)}"` : ""}`
      )}${verificationNote ? `<p class="disclosure-note">${escapeHtml(verificationNote)}</p>` : ""}</article>`;
    })
    .join("");
  const singleProviderNote = links.length === 1 ? `<p class="disclosure-note">Only one artist-level provider page is currently verified, so this is not a full provider comparison.</p>` : "";
  return `<section class="provider-panel"><h2>Artist-level provider pages</h2><p class="muted">Provider pages for this artist — not date-specific links.</p>${singleProviderNote}<div class="provider-actions">${cards}</div></section>`;
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
  const artistVerifiedDate = formatVerificationDate(artist.last_verified_at);
  const eventDates = [...new Set(shows.map(show => formatVerificationDate(show.last_verified_at)).filter(Boolean))];
  const eventRange = eventDates.length ? (eventDates.length === 1 ? eventDates[0] : `${eventDates[0]} to ${eventDates[eventDates.length - 1]}`) : null;
  return `<section class="nested-panel verification-disclosure"><h2>How ticket links work</h2><p class="muted">We verify ticket destinations before they appear. Providers set prices, fees, availability and delivery terms; some links may earn us a commission.</p>${
    artistVerifiedDate ? `<p class="disclosure-note">Artist last checked: ${escapeHtml(artistVerifiedDate)}.</p>` : ""
  }${eventRange ? `<p class="disclosure-note">Event links last checked: ${escapeHtml(eventRange)}.</p>` : ""}</section>`;
}

function futureShowsForArtist(events, artistSlug, limit = Infinity) {
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
      ticketnetwork_url: String(ev.ticketnetwork_url || "").trim(),
      ticketliquidator_url: String(ev.ticketliquidator_url || "").trim(),
      stubhub_international_url: String(ev.stubhub_international_url || "").trim(),
      last_verified_at: String(ev.last_verified_at || "").trim(),
      verification_status: String(ev.verification_status || "").trim(),
      provider_links: ev.provider_links && typeof ev.provider_links === "object" ? ev.provider_links : {},
      prices: Array.isArray(ev.prices) ? ev.prices : [],
      publishable: eventLinkPublishable(ev),
      seatgeekPublishable: providerEventPublishable(ev, "seatgeek"),
      vividseatsPublishable: providerEventPublishable(ev, "vivid-seats"),
      impactMarketplacePublishable: Object.fromEntries(
        IMPACT_MARKETPLACE_PROVIDERS.map((provider) => [provider.slug, providerEventPublishable(ev, provider.slug)])
      )
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

// Date badge parts for the compact show card. Keep in sync with
// showDateParts in public/app.js.
function showDatePartsServer(iso) {
  if (!iso) return null;
  const parsed = new Date(iso);
  if (!Number.isFinite(parsed.getTime())) return null;
  try {
    return {
      weekday: parsed.toLocaleDateString("en-US", { weekday: "short", timeZone: "UTC" }),
      day: parsed.toLocaleDateString("en-US", { day: "numeric", timeZone: "UTC" }),
      monthYear: parsed.toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: "UTC" })
    };
  } catch (error) {
    return null;
  }
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
// verification_status above. SeatGeek and Vivid Seats event CTAs may
// additionally publish on a needs_recheck event when that provider link carries
// its own verified provenance — the recheck flag tracks the Ticketmaster
// storefront URL, not the independently verified marketplace listing. Keep in
// sync with providerEventPublishable in functions/api/out.js and
// public/app.js.
function providerEventPublishable(event, provider) {
  if (IMPACT_MARKETPLACE_PROVIDERS.some((candidate) => candidate.slug === provider)) {
    return event?.provider_links?.[provider]?.verified === true;
  }
  if (provider !== "ticketmaster" && event?.provider_links?.[provider]?.verified === true) return true;
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

// /api/out is a tracked redirect endpoint, not indexable content: every CTA
// pointing at it is rel="nofollow" so crawlers don't spend budget on the
// redirect hop, and monetized providers additionally declare rel="sponsored".
// Ticketmaster stays plain and unmonetized, so it is nofollow-only. Keep in
// sync with outboundCtaRel in public/app.js.
function outboundCtaRel(href) {
  const raw = String(href || "");
  if (!raw.startsWith("/api/out?")) return null;
  const provider = new URLSearchParams(raw.slice(raw.indexOf("?") + 1)).get("provider") || "";
  return provider === "ticketmaster" ? "noopener nofollow" : "noopener nofollow sponsored";
}

function eventTicketHref(show, provider) {
  const showId = show?.id ? String(show.id) : "";
  if (!showId) return null;
  if (provider === "ticketmaster") {
    return `/api/out?${new URLSearchParams({ showId, provider }).toString()}`;
  }
  // Monetized providers route through /api/out so the click is Impact-tracked
  // server-side (no raw affiliate URLs in the page). Only emit the tracked link
  // when a valid stored destination exists, so the CTA stays suppressed exactly
  // as before — out.js re-resolves the stored URL and Impact-wraps it.
  let hasDestination = false;
  if (provider === "seatgeek") {
    hasDestination = Boolean(safeSeatGeekTicketUrl(show?.seatgeek_url));
  } else if (provider === "vivid-seats") {
    hasDestination = Boolean(safeVividSeatsTicketUrl(show?.vividseats_url));
  } else {
    const marketplace = IMPACT_MARKETPLACE_PROVIDERS.find((candidate) => candidate.slug === provider);
    if (marketplace) hasDestination = Boolean(safeImpactMarketplaceTicketUrl(show?.[marketplace.urlField], marketplace));
  }
  if (!hasDestination) return null;
  return `/api/out?${new URLSearchParams({ showId, provider }).toString()}`;
}

function artistProviderHref(artist, item, surface) {
  const provider = slugify(item?.provider);
  // Ticketmaster stays a plain /api/out redirect; monetized artist links route
  // through /api/out too so the click is Impact-tracked server-side. Only emit a
  // link when a verified destination exists — out.js resolves the tracked
  // performer-page URL from VERIFIED_TICKET_LINKS.
  if (provider !== "ticketmaster" && !safeShowTicketUrl(item?.url)) return null;
  return `/api/out?${new URLSearchParams({
    artistSlug: artist.slug,
    provider,
    sourcePath: `/artists/${artist.slug}`,
    surface
  }).toString()}`;
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
  const impactSeatGeekAccountSid = clean(env?.IMPACT_SEATGEEK_ACCOUNT_SID, 255);
  const impactSeatGeekAuthToken = clean(env?.IMPACT_SEATGEEK_AUTH_TOKEN, 255);
  const impactSeatGeekProgramId = clean(env?.IMPACT_SEATGEEK_CAMPAIGN_ID || env?.IMPACT_SEATGEEK_PROGRAM_ID, 120);
  return Boolean(impactSeatGeekBaseTrackingUrl || (impactSeatGeekAccountSid && impactSeatGeekAuthToken && impactSeatGeekProgramId));
}

function isVividSeatsConfigured(env = {}) {
  const impactVividSeatsBaseTrackingUrl = clean(env?.IMPACT_VIVIDSEATS_BASE_TRACKING_URL, 2048);
  const impactVividSeatsAccountSid = clean(env?.IMPACT_SEATGEEK_ACCOUNT_SID, 255);
  const impactVividSeatsAuthToken = clean(env?.IMPACT_SEATGEEK_AUTH_TOKEN, 255);
  const impactVividSeatsProgramId = clean(env?.IMPACT_VIVIDSEATS_CAMPAIGN_ID || env?.IMPACT_VIVIDSEATS_PROGRAM_ID, 120);
  return Boolean(impactVividSeatsBaseTrackingUrl || (impactVividSeatsAccountSid && impactVividSeatsAuthToken && impactVividSeatsProgramId));
}

function safeImpactMarketplaceTicketUrl(value, provider) {
  const safeUrl = safeShowTicketUrl(value);
  if (!safeUrl || !provider) return null;
  try {
    const parsed = new URL(safeUrl);
    if (parsed.protocol !== "https:") return null;
    const host = parsed.hostname.toLowerCase();
    if (!provider.allowedHosts.some((allowed) => host === allowed || host.endsWith(`.${allowed}`))) return null;
    const path = decodeURIComponent(parsed.pathname || "/").replace(/\/+$/, "");
    if (!path || path === "/" || /^\/(search|home|about|help|support|faq|contact|terms|privacy)(?:\/|$)/i.test(path)) return null;
    return safeUrl;
  } catch { return null; }
}

function isImpactMarketplaceConfigured(env = {}, provider) {
  return Boolean(provider && impactMarketplaceRuntimeConfig(env, provider.slug)?.configured);
}

function approvedServerPriceLane(show, provider) {
  const marketplace = IMPACT_MARKETPLACE_PROVIDERS.find((item) => item.name === provider);
  const providerSlug = provider === "SeatGeek" ? "seatgeek" : provider === "Vivid Seats" ? "vivid-seats" : marketplace?.slug;
  const providerVerified = Boolean(providerSlug && show?.provider_links?.[providerSlug]?.verified === true);
  if (!providerVerified) return null;

  const approvedSource = provider === "SeatGeek" ? "seatgeek_partner_api" : provider === "Vivid Seats" ? "vividseats_impact_marketplace_api" : marketplace?.priceSource;
  if (!approvedSource) return null;
  const lane = (Array.isArray(show?.prices) ? show.prices : []).find((item) => item?.provider === provider);
  if (!lane || lane.status !== "ok" || lane.providerStatus !== "ok" || lane.source !== approvedSource) return null;
  const price = Number(lane.price);
  const currency = String(lane.currency || "").trim().toUpperCase();
  const fetchedAt = String(lane.fetchedAt || "").trim();
  const expiresAt = String(lane.expiresAt || "").trim();
  if (!Number.isFinite(price) || price < 0 || !/^[A-Z]{3}$/.test(currency)) return null;
  if (!Number.isFinite(Date.parse(fetchedAt)) || !Number.isFinite(Date.parse(expiresAt)) || Date.parse(expiresAt) <= Date.now()) return null;
  return { price, currency, fetchedAt, expiresAt };
}

function formatServerPrice(value, currency) {
  try {
    return new Intl.NumberFormat("en", {
      style: "currency",
      currency,
      maximumFractionDigits: Number(value) % 1 === 0 ? 0 : 2
    }).format(value);
  } catch (error) {
    return "";
  }
}

function formatServerSnapshotTime(value) {
  try {
    return `${new Intl.DateTimeFormat("en-GB", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "UTC"
    }).format(new Date(value))} UTC`;
  } catch (error) {
    return "";
  }
}

// One CTA button per provider: provider name on the left, the approved fresh
// listed-price snapshot on the right when one exists (the price is the button),
// otherwise "Check prices". The data-cta-* attributes feed the delegated
// provider_click analytics listener in public/app.js (artist, event, provider,
// snapshot present/absent, CTA location). Keep in sync with
// renderProviderCtaButton in public/app.js.
function renderProviderCtaButtonHtml(name, href, amount, analytics = {}) {
  const value = amount || "Check prices";
  const valueClass = amount ? "provider-cta-value provider-cta-price" : "provider-cta-value provider-cta-check";
  const dataAttrs = ` data-cta-provider="${escapeAttr(analytics.provider || slugify(name))}" data-cta-artist="${escapeAttr(analytics.artistSlug || "")}" data-cta-show-id="${escapeAttr(analytics.showId || "")}" data-cta-price-snapshot="${amount ? "present" : "absent"}" data-cta-location="${escapeAttr(analytics.ctaLocation || "event_card")}"`;
  return `<a class="provider-cta${amount ? " provider-cta-priced" : ""}" href="${escapeAttr(href)}" target="_blank" rel="${escapeAttr(outboundCtaRel(href) || "noopener")}"${dataAttrs}><span class="provider-cta-name">${escapeHtml(name)}</span><span class="${valueClass}">${escapeHtml(value)}</span></a>`;
}

// Required snapshot disclosures for every price shown on a button, rendered
// once below the unified provider list. Provider names and capture times appear
// only for actual approved, fresh lanes.
// Keep in sync with renderShowCardPriceNotes in public/app.js.
function renderServerPriceNotes(ctaSpecs) {
  const priced = ctaSpecs.filter((spec) => spec.priceAmount && spec.priceAsOf);
  if (!priced.length) return "";
  const snapshotTimes = priced.map((spec) => `${spec.name} (${spec.priceAsOf})`).join(" · ");
  const note = `Listed-price snapshots, not live availability. ${snapshotTimes}. Prices may change and may exclude fees.`;
  return `<div class="provider-cta-notes"><p class="disclosure-note">${escapeHtml(note)}</p></div>`;
}

// Multi-night runs: shows sharing a venue and city on an artist board get a
// "Show X of Y at this venue" line so multi-night stands are distinguishable.
// Derived purely from the verified rows already being rendered — no event fact
// is inferred. Keep in sync with venueRunIndex in public/app.js.
function venueRunIndex(shows) {
  const groups = new Map();
  const sorted = [...shows]
    .filter((show) => show?.id)
    .sort((a, b) => {
      const ta = Date.parse(a.dateTimeISO || "");
      const tb = Date.parse(b.dateTimeISO || "");
      return (Number.isFinite(ta) ? ta : 0) - (Number.isFinite(tb) ? tb : 0);
    });
  for (const show of sorted) {
    const venue = String(show.venue || "").trim().toLowerCase();
    const city = String(show.city || "").trim().toLowerCase();
    if (!venue || !city) continue;
    const key = `${venue}|${city}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(String(show.id));
  }
  const index = {};
  for (const ids of groups.values()) {
    if (ids.length < 2) continue;
    ids.forEach((id, position) => {
      index[id] = { position: position + 1, total: ids.length };
    });
  }
  return index;
}

function renderShowCardServerHtml(show, seatGeekAvailable = false, isIndexableArtist = true, vividSeatsAvailable = false, artistName = "", marketplaceAvailability = {}, artistSlug = "", venueRuns = {}) {
  const dateParts = showDatePartsServer(show.dateTimeISO);
  const location = showLocationServer(show);
  const anchorId = showAnchorId(show);
  const validUrl = safeShowTicketUrl(show.ticketmaster_url);
  let ctaHtml = `<p class="disclosure-note">No verified ticket link is available for this date.</p>`;

  if (!isIndexableArtist) {
    ctaHtml = `<p class="disclosure-note">Ticket links for this artist are still being reviewed. Buy buttons appear once the destination has been checked.</p>`;
  } else if (show.id) {
    // One button per available provider. SeatGeek (primary affiliate) leads,
    // then Vivid Seats, the Impact marketplace lanes, and the plain
    // Ticketmaster verification link last. A provider with an approved, fresh
    // price lane shows the listed snapshot amount on its own button (the price
    // is the CTA); the rest read "Check prices". Snapshot disclosures render
    // once beneath the buttons. Keep in sync with renderShowCard in
    // public/app.js.
    const tmAvailable = Boolean(validUrl && show.publishable);
    const sgAvailable = seatGeekOutAvailable(show, seatGeekAvailable);
    const vsAvailable = vividSeatsOutAvailable(show, vividSeatsAvailable);
    const ctaSpecs = [];
      if (sgAvailable) ctaSpecs.push({ provider: "seatgeek", name: "SeatGeek", href: eventTicketHref(show, "seatgeek"), lane: null });
    if (vsAvailable) ctaSpecs.push({ provider: "vivid-seats", name: "Vivid Seats", href: eventTicketHref(show, "vivid-seats"), lane: approvedServerPriceLane(show, "Vivid Seats") });
    for (const provider of IMPACT_MARKETPLACE_PROVIDERS) {
      const publishable = show?.impactMarketplacePublishable?.[provider.slug] ?? providerEventPublishable(show, provider.slug);
      const href = eventTicketHref(show, provider.slug);
      if (marketplaceAvailability[provider.slug] && publishable && href) {
        ctaSpecs.push({ provider: provider.slug, name: provider.name, href, lane: approvedServerPriceLane(show, provider.name) });
      }
    }
    if (tmAvailable) ctaSpecs.push({ provider: "ticketmaster", name: "Ticketmaster", href: eventTicketHref(show, "ticketmaster"), lane: null });

    if (ctaSpecs.length) {
      for (const spec of ctaSpecs) {
        if (!spec.lane) continue;
        const amount = formatServerPrice(spec.lane.price, spec.lane.currency);
        const asOf = formatServerSnapshotTime(spec.lane.fetchedAt);
        if (amount && asOf) {
          spec.priceAmount = amount;
          spec.priceAsOf = asOf;
        } else {
          spec.lane = null;
        }
      }
      // Keep every provider in one fixed-order list. A fresh approved snapshot
      // replaces "Check prices" with the amount, without moving the provider or
      // splitting the card into separate priced and unpriced sections.
      const analyticsBase = { artistSlug, showId: String(show.id || ""), ctaLocation: "event_card" };
      const buttonsHtml = ctaSpecs
        .map((spec) => renderProviderCtaButtonHtml(spec.name, spec.href, spec.priceAmount || "", { ...analyticsBase, provider: spec.provider }))
        .join("");
      ctaHtml = `<div class="provider-cta-group">${buttonsHtml}</div>${renderServerPriceNotes(ctaSpecs)}`;
    }
  }

  const showJson = escapeAttr(JSON.stringify({ last_verified_at: show.last_verified_at || "" }));
  const copyLinkHtml = anchorId
    ? `<a class="text-link copy-show-link" href="#${escapeAttr(anchorId)}" data-copy-show-link="${escapeAttr(anchorId)}">Copy link to this date</a>`
    : "";
  // Compact card: date badge, then city · venue as the heading (the artist
  // name is already the page heading). The event name renders as a sub-line
  // only when it adds information beyond the artist name. Keep in sync with
  // renderShowCard in public/app.js.
  const titleFallback = show.city ? `Show – ${show.city}` : "Upcoming show";
  const eventName = String(show.event_name || "").trim();
  const title = location || eventName || titleFallback;
  const subHtml =
    location && eventName && eventName.toLowerCase() !== String(artistName || "").trim().toLowerCase()
      ? `<p class="show-card-sub muted">${escapeHtml(eventName)}</p>`
      : location
        ? ""
        : `<p class="show-card-sub muted">City and venue details are shown only when verified by the source.</p>`;
  const badgeHtml = dateParts
    ? `<div class="show-date-badge"><span class="show-date-weekday">${escapeHtml(dateParts.weekday)}</span><span class="show-date-day">${escapeHtml(dateParts.day)}</span><span class="show-date-monthyear">${escapeHtml(dateParts.monthYear)}</span></div>`
    : "";
  const run = venueRuns[String(show.id || "")];
  const runHtml = run ? `<p class="show-card-run muted">Show ${run.position} of ${run.total} at this venue</p>` : "";
  return `<article class="info-card show-card"${anchorId ? ` id="${escapeAttr(anchorId)}"` : ""} data-show-json="${showJson}">${badgeHtml}<div class="show-card-body"><h3 class="show-card-title">${escapeHtml(title)}</h3>${subHtml}${runHtml}${ctaHtml}${copyLinkHtml}</div></article>`;
}

// Zero-event board state. The primary CTA is the artist-level page of the
// highest-ranked available provider (never an event-level ticket link — no
// verified dates exist to sell). Falls back to the buying guide when no
// artist-level provider link is verified.
function renderShowBoardEmptyStateHtml(artistName = "", providerCta = null, artistSlug = "") {
  const safeName = escapeHtml(String(artistName || "").trim() || "artist");
  const primaryCta = providerCta
    ? anchor(`Check ${escapeHtml(providerCta.name)} for updates`, providerCta.href, "button button-primary", `rel="${escapeAttr(outboundCtaRel(providerCta.href) || "noopener")}" data-cta-provider="${escapeAttr(slugify(providerCta.name))}" data-cta-artist="${escapeAttr(artistSlug)}" data-cta-price-snapshot="absent" data-cta-location="empty_state"`)
    : anchor("Read ticket buying guide", "/guides/how-to-compare-concert-ticket-prices", "button button-secondary");
  // Watchlist signup instead of empty ticket buttons; posts to /api/signup via
  // the delegated submit handler in public/app.js. Keep in sync with
  // renderShowBoardEmptyState in public/app.js.
  const signupHtml = artistSlug
    ? `<form class="watchlist-signup" data-watchlist-shell="${escapeAttr(artistSlug)}"><h4>Join the ${safeName} watchlist</h4><p class="muted">Leave an email and we'll let you know when verified ${safeName} dates and checked ticket links are listed.</p><div class="watchlist-signup-row"><label class="sr-only" for="watchlist-email-${escapeAttr(artistSlug)}">Email address</label><input type="email" id="watchlist-email-${escapeAttr(artistSlug)}" name="email" required placeholder="Your email address" autocomplete="email" /><input class="hp-field" type="text" name="website" tabindex="-1" autocomplete="off" aria-hidden="true" /><button class="button button-primary" type="button" disabled>Enable JavaScript to join</button></div><p class="disclosure-note" data-signup-status aria-live="polite"></p></form>`
    : "";
  return `<div class="empty-state"><h3>No upcoming dates listed yet</h3><p class="muted">We list upcoming ${safeName} dates once the ticket destination is verified — new dates appear here first.</p>${signupHtml}<div class="action-row">${primaryCta}${anchor(
    "Browse artists",
    "/artists",
    "button button-secondary"
  )}</div></div>`;
}

function renderShowBoardServerHtml(shows, seatGeekAvailable = false, isIndexableArtist = true, artistName = "", vividSeatsAvailable = false, emptyStateProviderCta = null, marketplaceAvailability = {}, artistSlug = "") {
  const venueRuns = venueRunIndex(shows);
  const gridContent = shows.length
    ? shows.map(show => renderShowCardServerHtml(show, seatGeekAvailable, isIndexableArtist, vividSeatsAvailable, artistName, marketplaceAvailability, artistSlug, venueRuns)).join("")
    : renderShowBoardEmptyStateHtml(artistName, emptyStateProviderCta, artistSlug);
  const filterIntro = shows.length > 1
    ? `<div class="show-filter-intro"><h3>Find your date</h3><p class="muted">Filter by city, venue, or tour to jump to your date.</p></div>`
    : "";
  return `<section class="section-grid show-board" aria-labelledby="artistShowBoard"><div class="section-intro"><h2 id="artistShowBoard">Upcoming shows</h2><p>Pick a date, compare available price snapshots, then confirm final prices and fees on the provider site.</p><p class="disclosure-note">Some links earn us a commission — this never affects your price.</p></div>${filterIntro}<div class="card-grid show-card-grid" data-show-grid="true">${gridContent}</div></section>`;
}

function renderMainContent(route, catalog, events = [], guideContent = {}, env = {}) {
  if (route.type === "comparison-hub") {
    const faqHtml = comparisonHubFaqEntries()
      .map(([question, answer]) => `<details><summary>${escapeHtml(question)}</summary><p>${escapeHtml(answer)}</p></details>`)
      .join("");
    return `<main id="mainContent"><section class="content-page comparison-hub" aria-labelledby="compareTitle">${renderBreadcrumbHtml(
      route
    )}<section class="nested-panel"><h1 id="compareTitle">Compare Concert Ticket Prices</h1><p class="lead">Compare fresh, provider-supplied listed-price snapshots from approved ticket providers for the same verified concert event. TourTicketCompare identifies the lower listed snapshot and the price difference when approved snapshots are current, then sends you to the checked provider destinations to confirm final fees and checkout terms.</p><div class="action-row">${anchor(
      "Browse concerts",
      "#current-events",
      "button button-primary"
    )}${anchor("View popular artists", "#compare-by-artist", "button button-secondary")}</div><p class="disclosure-note">We compare approved, timestamped provider snapshots for the same event only. Providers control final prices, fees, availability, seat details, restrictions and delivery terms; confirm the final checkout total before buying.</p></section>${renderComparisonIntentCards()}<section id="compare-by-artist" class="nested-panel"><h2>Compare tickets by artist</h2><p>Choose an artist page to review checked event links, provider options where available, and buying guidance before leaving for the ticket site.</p>${renderComparisonHubArtistCards(
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
    )}${anchor("Affiliate disclosure", "/affiliate-disclosure", "button button-secondary")}${anchor("Ticket buying guide", "/guides/how-to-compare-concert-ticket-prices", "button button-secondary")}</div></section><section id="current-events" class="nested-panel"><h2>Browse concerts and tours</h2><p>Use artist and tour pages as a hub for checked links and event-specific buying guidance.</p><div class="mini-link-grid">${anchor("All artists", "/artists", "mini-link")}${anchor("Browse venues", "/venues", "mini-link")}${anchor("Buying guides", "/guides", "mini-link")}${(catalog.tours || [])
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
    const marketplaceAvailability = Object.fromEntries(IMPACT_MARKETPLACE_PROVIDERS.map((provider) => [provider.slug, isImpactMarketplaceConfigured(env, provider)]));
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
    const artistVenuesHtml = renderArtistVenuesHtml(events, artist);
    const shows = futureShowsForArtist(events, artist.slug);
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
    const providerAvailability = { seatgeek: seatGeekAvailable, "vivid-seats": vividSeatsAvailable, ...marketplaceAvailability };
    const primaryProviderLink = availableArtistProviderLinks(catalog, artist, providerAvailability)[0] || null;
    const emptyStateProviderCta = primaryProviderLink
      ? {
          name: PROVIDER_DISPLAY_NAMES[slugify(primaryProviderLink.provider)] || primaryProviderLink.provider,
          href: artistProviderHref(artist, primaryProviderLink, "artist_page")
        }
      : null;
    return `<main id="mainContent"><section class="content-page artist-page" aria-labelledby="artistTitle">${renderBreadcrumbHtml(
      route
    )}<h1 id="artistTitle">${escapeHtml(
      artist.name
    )} tickets and tour dates</h1><p class="lead">Find upcoming ${escapeHtml(
      artist.name
    )} shows, pick a date, and compare available ticket options.</p>${reviewNoticeHtml}${shows.length ? `${renderShowBoardServerHtml(shows, seatGeekAvailable, isIndexableArtist, artist.name, vividSeatsAvailable, null, marketplaceAvailability, artist.slug)}${renderProviderFallback(
      catalog,
      artist,
      "artist_page",
      providerAvailability
    )}${renderVerificationDisclosure(artist, shows)}` : `${renderProviderFallback(
      catalog,
      artist,
      "artist_page",
      providerAvailability
    )}${renderShowBoardServerHtml(shows, seatGeekAvailable, isIndexableArtist, artist.name, vividSeatsAvailable, emptyStateProviderCta, marketplaceAvailability, artist.slug)}${renderVerificationDisclosure(artist, shows)}`}<section class="split-section"><div><h2>About ${escapeHtml(
      artist.name
    )}</h2><p>${escapeHtml(artist.factual_summary)}</p></div><div><h2>Ticket link status</h2><p>${escapeHtml(
      artist.ticket_buying_notes
    )}</p></div></section>${demandHtml}<section class="nested-panel"><h2>Before you buy</h2><ul class="check-list"><li>Check the final price including all fees.</li><li>Check the seat location and any view restrictions.</li><li>Check delivery, refund, and resale terms on the provider site.</li></ul></section>${artistVenuesHtml}${relatedGuidesHtml}<section class="nested-panel"><h2>Useful links</h2><div class="mini-link-grid">${anchor(
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
    )}</p>${renderGuideProvenance(route)}${contentHtml}${renderGuideSources(
      guideContent[route.path]?.sources
    )}${artistBrowseHtml}<div class="action-row">${anchor(
      "Compare event ticket prices",
      "/guides/how-to-compare-event-ticket-prices",
      "button button-primary"
    )}${anchor(
      "Compare concert ticket prices",
      "/compare-concert-ticket-prices",
      "button button-primary"
    )}${anchor("How it works", "/how-it-works", "button button-secondary")}${anchor(
      "Affiliate disclosure",
      "/affiliate-disclosure",
      "button button-secondary"
    )}</div></section></main>`;
  }

  if (route.type === "venues-index") {
    const venues = Array.isArray(route.venues) ? route.venues : [];
    return `<main id="mainContent"><section class="content-page" aria-labelledby="venuesTitle">${renderBreadcrumbHtml(
      route
    )}<h1 id="venuesTitle">Concert venues</h1><p class="lead">Browse the concert venues where we track multiple upcoming tour dates. Open a venue to see its upcoming shows, then follow the artist link for verified ticket options and any approved price snapshots.</p><p class="disclosure-note">Coverage varies by venue and region. Venues appear here once we track two or more upcoming dates at them.</p><section class="section-grid"><div class="section-intro"><h2>Venues with upcoming shows</h2><p>${escapeHtml(
      `${venues.length} ${venues.length === 1 ? "venue" : "venues"} with multiple upcoming tracked dates.`
    )}</p></div>${renderVenueLinks(venues)}</section><div class="action-row">${anchor(
      "Browse artists",
      "/artists",
      "button button-secondary"
    )}${anchor("Compare concert ticket prices", "/compare-concert-ticket-prices", "button button-secondary")}${anchor(
      "Read buying guides",
      "/guides",
      "button button-secondary"
    )}</div></section></main>`;
  }

  if (route.type === "venue") {
    const venue = route.venue;
    const location = venueLocationLabel(venue);
    const seatGeekAvailable = isSeatGeekConfigured(env);
    const vividSeatsAvailable = isVividSeatsConfigured(env);
    const marketplaceAvailability = Object.fromEntries(IMPACT_MARKETPLACE_PROVIDERS.map((provider) => [provider.slug, isImpactMarketplaceConfigured(env, provider)]));
    return `<main id="mainContent"><section class="content-page venue-page" aria-labelledby="venueTitle">${renderBreadcrumbHtml(
      route
    )}<h1 id="venueTitle">${escapeHtml(venue.venue)} concerts and upcoming shows</h1><p class="lead">${escapeHtml(
      `We track ${venueShowCountLabel(venue.showCount)} at ${venue.venue}${location ? ` in ${location}` : ""} across ${venueArtistCountLabel(
        venue.artistSlugs.length
      )}.`
    )} Pick a date and open a checked provider option for that show.</p><p class="disclosure-note">Ticket links and any approved price snapshots are shown only when their existing event-level verification and runtime gates pass. Confirm final prices and fees on the provider site.</p><section class="section-grid"><div class="section-intro"><h2>Upcoming shows at ${escapeHtml(
      venue.venue
    )}</h2><p>Dates are grouped by artist and listed earliest first.</p></div>${renderVenueShowGroups(
      venue,
      events,
      new Set(route.indexableArtistSlugs || []),
      seatGeekAvailable,
      vividSeatsAvailable,
      marketplaceAvailability
    )}</section><section class="nested-panel"><h2>Getting tickets at ${escapeHtml(
      venue.venue
    )}</h2><ul class="check-list"><li>Use the checked provider buttons above for your exact date, or open the artist page for the full event view and any approved, timestamped price snapshots.</li><li>Match the exact date, then confirm the seat or section, ticket type, and final total on the provider site.</li><li>Check delivery timing and transfer rules so your tickets arrive before the show.</li><li>Review refund, resale, and cancellation terms before you pay.</li></ul><div class="action-row">${anchor(
      "How to compare concert ticket prices",
      "/guides/how-to-compare-concert-ticket-prices",
      "button button-secondary"
    )}${anchor("Concert ticket fees explained", "/guides/concert-ticket-fees-explained", "button button-secondary")}${anchor(
      "All venues",
      "/venues",
      "button button-secondary"
    )}</div></section></section></main>`;
  }

  if (route.path === "/artists") {
    return `<main id="mainContent"><section class="content-page" aria-labelledby="artistsTitle">${renderBreadcrumbHtml(
      route
    )}<h1 id="artistsTitle">Artist watchlist</h1><p class="lead">Find an artist, then open the checked ticket options and upcoming dates we can verify.</p><p class="disclosure-note">Coverage varies by artist and region. We publish ticket links only after the artist, date, venue, and destination have been checked.</p>${renderArtistStatusLegendHtml()}${renderArtistLinks(
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
    )}<h1 id="pageTitle">How TourTicketCompare works</h1><p class="lead">TourTicketCompare is an independent, unofficial ticket research site that helps fans find checked ticket options, compare available provider price snapshots for the same event, and use practical buying guidance. We do not sell tickets and only link out to destinations we have checked.</p><section class="nested-panel"><h2>What TourTicketCompare does</h2><ul class="check-list"><li>Organises verified ticket links from official providers like Ticketmaster.</li><li>Shows checked event-specific links only when the destination can be verified.</li><li>Provides practical buying guidance on comparing totals, understanding fees, and confirming terms.</li><li>Displays a clear empty state when no verified ticket link exists for an event.</li></ul></section><section class="nested-panel"><h2>What TourTicketCompare does not do</h2><ul class="check-list"><li>Sell tickets directly.</li><li>Compare prices without a fresh, approved snapshot for the same verified event.</li><li>Display prices without verified, timestamped provider data.</li><li>Send users to generic artist pages when no event-specific link is verified.</li><li>Scrape unofficial sources or publish unverified tour dates.</li></ul></section><section class="nested-panel"><h2>How ticket links are handled</h2><p>Ticket buttons on event cards link to external ticketing platforms. Some links may be affiliate links, which means we may earn a commission if you purchase through them at no extra cost to you.</p><p class="disclosure-note">Affiliate relationships do not control which links we show. Affiliate links are handled safely and we only publish ticket buttons when the destination can be verified.</p></section><section class="nested-panel"><h2>What you should confirm on the ticket provider site</h2><ul class="check-list"><li>Final price including all fees and taxes.</li><li>Exact seat or standing area location.</li><li>Delivery method and timing (instant, email transfer, shipped).</li><li>Refund, resale, and cancellation terms.</li><li>Event date, venue, and artist name match your intended show.</li></ul></section><section class="nested-panel"><h2>What we verify before showing a link</h2><p>We check that the event card artist, date, and venue match verified source data. We validate each ticket link destination before showing a button. We do not show event cards or ticket links until the information can be checked.</p></section><section class="nested-panel faq-panel"><h2>FAQ</h2><details><summary>Is TourTicketCompare official?</summary><p>No. TourTicketCompare is independent and unofficial.</p></details><details><summary>Does the site sell tickets directly?</summary><p>No. Ticket buying happens on the external provider site.</p></details><details><summary>Why are some ticket buttons missing?</summary><p>Ticket buttons are hidden until the destination can be verified.</p></details><details><summary>Can final prices change?</summary><p>Yes. External ticketing sites set their own prices, fees, availability, and checkout terms.</p></details></section><div class="action-row">${anchor(
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
    )}<h1 id="aboutTitle">About TourTicketCompare</h1><p class="lead">TourTicketCompare is an independent, unofficial site that helps fans research tickets for major live music tours.</p><section class="nested-panel"><h2>What we do</h2><ul class="check-list"><li>Collect verified ticket links for major artists so you have a reliable starting point.</li><li>Show event-specific ticket links only when the artist, date, venue, and destination have been checked.</li><li>Compare approved, timestamped provider listed-price snapshots for the same verified event when the lanes pass source and freshness checks.</li><li>Publish plain buying guides on fees, resale, delivery timing, and what to confirm before checkout.</li></ul></section><section class="nested-panel"><h2>What we do not do</h2><ul class="check-list"><li>Sell or resell tickets.</li><li>Present snapshots as live inventory, guaranteed availability, or final checkout totals.</li><li>Rank a provider as universally lower-priced or better.</li><li>Invent tour dates, venues, prices, or availability.</li></ul></section><section class="nested-panel"><h2>Why affiliate links do not change our standards</h2><p>Some links are affiliate links, so we may earn a commission when you buy. That never decides which links we show. A link only appears once its destination has been checked, whether or not it earns us anything.</p></section><div class="action-row">${anchor(
      "Compare concert ticket prices",
      "/compare-concert-ticket-prices",
      "button button-primary"
    )}${anchor("Read buying guides", "/guides", "button button-secondary")}</div></section></main>`;
  }

  if (route.path === "/editorial-policy") {
    return `<main id="mainContent"><section class="content-page" aria-labelledby="editorialTitle">${renderBreadcrumbHtml(
      route
    )}<h1 id="editorialTitle">Editorial policy</h1><p class="lead">TourTicketCompare publishes artist and ticket-link information only when the source can be checked. These are the editorial rules we follow before anything appears on the site.</p><section class="nested-panel"><h2>What we publish</h2><ul class="check-list"><li>Artist watchlist pages for major tours, with factual artist summaries drawn from confirmed public sources.</li><li>Verified provider destinations, such as artist-level links to official ticketing sites.</li><li>Event-specific ticket links where the event date, venue, and destination have been checked.</li><li>Fresh, provider-attributed listed-price snapshots for the same verified event, including a lower-snapshot comparison only when the lanes pass their source and freshness gates.</li><li>Practical buying guides on fees, resale, delivery timing, and what to confirm before checkout.</li></ul></section><section class="nested-panel"><h2>What we verify before showing ticket links</h2><p>A ticket button appears only when the artist is a known, verified artist, the destination is a configured verified link, and the link passes our outbound safety checks. Event-specific buttons additionally require a verified event record with a confirmed date, venue, and artist. We use official artist, ticketing, and approved affiliate sources where available, and we show a clear empty state when no verified link exists.</p></section><section class="nested-panel"><h2>What we do not publish</h2><ul class="check-list"><li>Invented tour dates, venues, or cities.</li><li>Ticket prices, availability, or inventory status we cannot confirm from an approved source.</li><li>Provider partnership or coverage claims we cannot confirm.</li><li>Fake comparison tables, placeholder pricing, or a comparison that lacks fresh approved snapshots for both providers.</li><li>Listings obtained by scraping ticket providers or other sites.</li><li>Savings, discount, or value claims we cannot support with approved provider data.</li><li>Event schema on pages without verified event-level data.</li></ul></section><section class="nested-panel"><h2>Corrections and broken links</h2><p>If a ticket button is broken, opens the wrong destination, or an event detail looks incorrect, please report it through our ${anchor(
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

  return `<main id="mainContent"><div id="ttc-main"><section class="hero-panel" aria-labelledby="heroTitle"><div class="hero-copy-block"><h1 class="hero-title" id="heroTitle">Compare concert and event ticket prices for the same show.</h1><p class="hero-subcopy">Compare concert and event ticket prices using available provider price snapshots for the same show. Confirm final prices, fees, and availability on the provider site.</p><p class="disclosure-note">Coverage is strongest in the United States, with selected UK, Europe, and Canada dates.</p><form class="hero-search-form" role="search" aria-label="Search artists, events, and guides"><label class="sr-only" for="site-search">Search by artist, city, country, venue, or tour</label><input class="hero-search-input" type="search" id="site-search" name="q" placeholder="Search by artist, city, country, venue, or tour" aria-label="Search by artist, city, country, venue, or tour" autocomplete="off" spellcheck="false" enterkeyhint="search" /><button class="button button-primary hero-search-submit" type="submit">Search</button></form><div class="action-row">${anchor(
    "Compare concert ticket prices",
    "/compare-concert-ticket-prices",
    "button button-primary"
  )}${anchor("Browse artists", "#featured-artists", "button button-secondary")}${anchor("Read buying guides", "/guides", "button button-secondary")}</div></div></section><section id="search-widget" class="section-grid search-section" aria-labelledby="searchSectionTitle"><div class="section-intro"><h2 id="searchSectionTitle">Search results</h2><p>Search reviewed artists, events, and guides.</p></div><div class="search-results" role="region" aria-label="Search results" aria-live="polite" aria-atomic="false"></div></section><section class="section-grid what-you-can-do" aria-labelledby="whatYouCanDoTitle"><div class="section-intro"><h2 id="whatYouCanDoTitle">How it works</h2></div><div class="card-grid"><article class="info-card"><h3>1. Find your show</h3><p>Search an artist and pick the verified date that matches your plans.</p>${anchor("Browse artists", "/artists", "text-link")}</article><article class="info-card"><h3>2. Compare snapshots</h3><p>See available provider price snapshots for the same event.</p>${anchor("Compare ticket prices", "/compare-concert-ticket-prices", "text-link")}</article><article class="info-card"><h3>3. Confirm and buy</h3><p>Open the provider site to confirm the final price, fees, availability, and ticket details.</p>${anchor("Read the guide", "/guides/how-to-compare-concert-ticket-prices", "text-link")}</article></div></section><section id="featured-artists" class="section-grid" aria-labelledby="homeArtistsTitle"><div class="section-intro"><h2 id="homeArtistsTitle">Featured artists</h2><p>Checked upcoming dates and verified event links for every artist we track. Prefer to plan around a location? ${anchor("Browse venues with multiple upcoming shows", "/venues", "text-link")}.</p></div>${renderArtistLinks(
    catalog,
    events
  )}</section><section class="section-grid" aria-labelledby="homeBuyingGuidesTitle"><div class="section-intro"><h2 id="homeBuyingGuidesTitle">Buying guides</h2><p>Fees, resale, timing, scams — what to check before you buy.</p></div>${renderHomepageGuideLinks()}<div class="action-row">${anchor(
    "View all guides",
    "/guides",
    "button button-secondary"
  )}</div></section><section class="section-grid trust-section" aria-labelledby="trustTitle"><div class="section-intro"><h2 id="trustTitle">Trust &amp; transparency</h2></div><div class="nested-panel"><p>TourTicketCompare is independent and unofficial. We do not sell tickets, and every destination passes verification checks before it appears.</p><p>Learn more: ${anchor("How we work", "/how-it-works", "text-link")} • ${anchor("Affiliate disclosure", "/affiliate-disclosure", "text-link")}</p></div></section></div></main>`;
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
    `<script type="application/ld+json">${JSON.stringify(routeSchema(route, origin, guideContent, events, catalog, env))}</script>`
  );
  next = next.replace(/<main\s+id="mainContent">[\s\S]*?<\/main>/i, renderMainContent(route, catalog, events, guideContent, env));
  if (route.path === "/") {
    // Homepage-only progressive enhancement: ttc-home.js hydrates the #ttc-main
    // mount with the full redesigned homepage. Same-origin, so it satisfies the
    // existing CSP (script-src 'self'). The chrome stylesheet (ttc-home.css) is
    // loaded site-wide from the shell <head>; only this script is homepage-scoped.
    next = next.replace("</body>", '<script src="/ttc-home.js?v=20260716a" defer></script></body>');
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
  const needsEvents = route.type === "artist" || route.type === "venue" || route.type === "comparison-hub" || route.path === "/artists" || route.path === "/";
  const events = route.events || (needsEvents ? await loadEvents(env) : []);
  let renderEvents = events;
  if ((route.type === "artist" || route.type === "venue") && events.length) {
    const priceCandidates = route.type === "artist"
      ? futureShowsForArtist(events, route.artist.slug, 6)
      : events
        .filter((event) => route.venue?.shows?.some((show) => String(show?.id || "") === String(event?.id || "")))
        .map((event) => futureShowsForArtist([event], event.artist_slug, 1)[0])
        .filter(Boolean);
    const pricedShows = await attachApprovedMarketplacePrices(priceCandidates, env);
    const pricedById = new Map(pricedShows.map((show) => [String(show?.id || ""), show]));
    renderEvents = events.map((event) => {
      const priced = pricedById.get(String(event?.id || ""));
      return priced ? { ...event, prices: Array.isArray(priced.prices) ? priced.prices : [] } : event;
    });
  }
  const guideContent = route.type === "guide" ? await loadGuideContent(env) : {};
  const injected = injectRoute(html, route, url.origin, catalog, renderEvents, guideContent, env);
  const headers = new Headers(indexResponse.headers);
  headers.set("Content-Type", "text/html; charset=UTF-8");
  headers.set("Cache-Control", "no-cache, max-age=0, must-revalidate");
  applySecurityHeaders(headers);
  return new Response(injected, { status: 200, headers });
}
