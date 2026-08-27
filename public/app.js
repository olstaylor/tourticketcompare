let fallbackCatalog = { artists: [], tours: [], providers: [], ticket_links: [] };

// The homepage proposition has three renderers: this client fallback (used when
// the server shell was not injected), the server template
// (functions/[[path]].js), and the hydrated homepage (public/ttc-home.js). They
// drifted into three different promises, so the wording now lives in one marked
// block that is copied verbatim into all three files. Keep the block
// byte-identical — scripts/homepage-proposition.test.mjs fails the build the
// moment it drifts.
// >>> homepage-proposition >>>
const HOME_HEADLINE = "Compare ticket prices for the show you want.";
const HOME_SUBCOPY =
  "Choose an artist and date, see current listed prices from ticket sites where available, then check the final total with the provider.";
const HOME_PRIMARY_CTA_LABEL = "Find a show";
const HOME_PRIMARY_CTA_HREF = "/artists";
const HOME_STEPS = [
  {
    title: "1. Find a show",
    body: "Choose an artist and pick the date you want to go to.",
    ctaLabel: "Browse artists",
    href: "/artists"
  },
  {
    title: "2. Compare ticket prices",
    body: "See the current listed prices we have from ticket sites for that same date.",
    ctaLabel: "Compare ticket prices",
    href: "/compare-concert-ticket-prices"
  },
  {
    title: "3. Check the total",
    body: "Open the ticket site to check the final total, the fees, and what is included.",
    ctaLabel: "Read the guide",
    href: "/guides/how-to-compare-concert-ticket-prices"
  }
];
// <<< homepage-proposition <<<

// The same proposition, said once, on the two surfaces that repeat it. Shared
// verbatim with functions/[[path]].js, which is authoritative for these pages;
// the renderers below only run when its markup is absent. Also parity-checked by
// scripts/homepage-proposition.test.mjs.
// >>> site-proposition >>>
const ARTISTS_INDEX_LEAD = "Choose an artist, then pick the date you want to compare ticket prices for.";
const ARTISTS_INDEX_NOTE = "Coverage varies by artist and region.";
const HOW_IT_WORKS_LEAD =
  "Compare ticket prices for the show you want: choose an artist and date, see current listed prices from ticket sites where available, then check the final total with the provider. We're independent, and we don't sell tickets.";
// <<< site-proposition <<<

const providerCopy = {
  ticketmaster: {
    name: "Ticketmaster",
    label: "Check provider"
  },
  seatgeek: {
    name: "SeatGeek",
    label: "Check provider"
  },
  "vivid-seats": {
    name: "Vivid Seats",
    label: "Check provider"
  },
  ticketnetwork: {
    name: "TicketNetwork",
    label: "Check provider"
  },
  "ticket-liquidator": {
    name: "Ticket Liquidator",
    label: "Check provider"
  },
  "stubhub-international": {
    name: "StubHub International",
    label: "Check provider"
  }
};

const IMPACT_MARKETPLACE_PROVIDERS = [
  { slug: "ticketnetwork", name: "TicketNetwork", urlField: "ticketnetwork_url", allowedHosts: ["ticketnetwork.com"], priceSource: "ticketnetwork_impact_marketplace_api" },
  { slug: "ticket-liquidator", name: "Ticket Liquidator", urlField: "ticketliquidator_url", allowedHosts: ["ticketliquidator.com"], priceSource: "ticketliquidator_impact_marketplace_api" },
  { slug: "stubhub-international", name: "StubHub International", urlField: "stubhub_international_url", allowedHosts: ["stubhub.co.uk", "stubhub.ie", "stubhub.de", "stubhub.fr", "stubhub.es", "stubhub.it", "stubhub.pt", "stubhub.pl", "stubhub.se", "stubhub.dk", "stubhub.fi", "stubhub.gr", "stubhub.nl", "stubhub.lu", "stubhub.cz", "stubhub.be", "stubhub.co.at"], priceSource: "stubhub_international_impact_marketplace_api" }
];

const guidePages = [
  {
    slug: "how-to-compare-concert-ticket-prices",
    title: "How to Compare Concert Ticket Prices | TourTicketCompare",
    description: "A practical method for comparing the same concert: match the listing, use timestamped snapshots to shortlist providers, then verify the final total and terms.",
    h1: "How to Compare Concert Ticket Prices Safely",
    serverRendered: true
  },
  {
    slug: "ticketmaster-vs-seatgeek-vs-vivid-seats",
    title: "Vivid Seats vs Ticketmaster vs SeatGeek: Which Is Better? | TourTicketCompare",
    description: "Compare Vivid Seats vs Ticketmaster and SeatGeek by ticket type, listed prices, fees, delivery and buyer protection before choosing where to buy.",
    h1: "Vivid Seats vs Ticketmaster vs SeatGeek: Key Differences",
    serverRendered: true
  },
  {
    slug: "seatgeek-vs-ticketmaster",
    title: "SeatGeek vs Ticketmaster: Which Is Better? Fees & Prices | TourTicketCompare",
    description: "Compare SeatGeek vs Ticketmaster for fees, price differences, delivery and buyer protection—whether they are the same company, and which suits your concert.",
    h1: "SeatGeek vs Ticketmaster: Which Is Better? Fees & Prices",
    serverRendered: true
  },
  {
    slug: "how-to-avoid-overpaying-for-concert-tickets",
    title: "Avoid Overpaying for Concert Tickets | TourTicketCompare",
    description: "Use practical checks to avoid overpaying for concert tickets by reviewing final fees, seat location, seller terms, delivery timing, and misleading urgency.",
    h1: "How do I avoid overpaying for concert tickets?",
    serverRendered: true
  },
  {
    slug: "when-is-the-best-time-to-buy-concert-tickets",
    title: "When to Buy Concert Tickets | TourTicketCompare",
    description: "Learn how to choose when to buy concert tickets by weighing certainty, seat choice, group seating, budget, delivery timing, provider terms, and risk tolerance.",
    h1: "When should I buy concert tickets?",
    serverRendered: true
  },
  {
    slug: "primary-vs-resale-concert-tickets",
    title: "Primary vs Resale Concert Tickets | TourTicketCompare",
    description: "Decide between primary and resale concert tickets by weighing ticket type, seat choice, final total, transfer timing, provider terms, and certainty.",
    h1: "What is the difference between official tickets and resale?",
    serverRendered: true
  },
  {
    slug: "how-to-avoid-ticket-scams",
    title: "How to Avoid Ticket Scams | TourTicketCompare",
    description: "Learn how to spot fraudulent ticket sellers, fake platforms, counterfeit tickets, and scam tactics. Use verified platforms and protect yourself at checkout.",
    h1: "How do I avoid ticket scams and fake listings?",
    serverRendered: true
  },
  {
    slug: "why-ticket-prices-change",
    title: "Why Do Concert Ticket Prices Change? | TourTicketCompare",
    description: "Learn why concert ticket totals can change because of onsale demand, provider pricing methods, resale seller decisions, fees, seat details, delivery, and terms.",
    h1: "Why do concert ticket prices change?",
    serverRendered: true
  },
  {
    slug: "ticketmaster-vs-stubhub",
    title: "Ticketmaster vs StubHub: Compare Safely | TourTicketCompare",
    description: "Compare Ticketmaster and StubHub by checking event source, ticket type, final totals, delivery timing, and provider terms before checkout.",
    h1: "How should I compare Ticketmaster and StubHub?",
    serverRendered: true
  },
  {
    slug: "seatgeek-promo-code-guide",
    title: "SeatGeek Promo Code Guide: Verify Safely | TourTicketCompare",
    description: "Learn how to verify SeatGeek promo-code claims safely by checking eligibility, final checkout totals, fees, and order terms on SeatGeek before purchase.",
    h1: "How should I verify a SeatGeek promo code safely?",
    serverRendered: true
  },
  {
    slug: "concert-ticket-fees-explained",
    title: "Concert Ticket Fees Explained | TourTicketCompare",
    description: "Know which concert-ticket charges to compare, how to read the order summary, and when a lower displayed price is not the lower final total.",
    h1: "What concert ticket fees should I check before buying?",
    serverRendered: true
  },
  {
    slug: "ticket-delivery-and-transfer-timing",
    title: "Ticket Delivery & Transfer Timing | TourTicketCompare",
    description: "Learn how to check ticket delivery methods and transfer timing so checkout terms match your travel and event plans.",
    h1: "How do ticket delivery and transfer timing affect risk?",
    serverRendered: true
  },
  {
    slug: "how-resale-ticket-pricing-works",
    title: "How Resale Ticket Pricing Works | TourTicketCompare",
    description: "Understand resale ticket pricing by reviewing seller-set prices, fees, seat details, delivery timing, and provider terms before checkout.",
    h1: "How does resale ticket pricing work?",
    serverRendered: true
  },
  {
    slug: "how-to-prepare-for-a-ticket-onsale",
    title: "How to Prepare for a Concert Onsale | TourTicketCompare",
    description: "Practical pre-onsale and onsale-day routine for major concert tickets, covering presales, account setup, queues, listing checks, and what to do if you miss out.",
    h1: "How do I prepare for a concert ticket onsale?",
    serverRendered: true
  },
  {
    slug: "how-to-read-a-ticket-listing",
    title: "How to Read a Concert Ticket Listing | TourTicketCompare",
    description: "Learn how to read concert ticket listings by checking section, row, seat, listing notes, ticket type, delivery method, and cross-checks before checkout.",
    h1: "How do I read a concert ticket listing?",
    serverRendered: true
  },
  {
    slug: "what-to-do-if-a-concert-is-postponed-or-cancelled",
    title: "Concert Postponed or Cancelled | TourTicketCompare",
    description: "Learn what to check if a concert is postponed, rescheduled, or cancelled, including provider updates, refunds, transfers, resale rules, and ticket delivery.",
    h1: "What should I do if a concert is postponed or cancelled?",
    serverRendered: true
  }
];

const oldGuideRedirects = {
  "compare-ticket-prices-safely": "how-to-compare-concert-ticket-prices",
  "how-to-compare-event-ticket-prices": "how-to-compare-concert-ticket-prices",
  "why-ticket-prices-vary": "why-ticket-prices-change",
  "avoid-overpaying-concert-tickets": "how-to-avoid-overpaying-for-concert-tickets",
  "best-time-to-buy-concert-tickets": "when-is-the-best-time-to-buy-concert-tickets"
};

const guideClusters = [
  {
    title: "Compare prices and fees",
    intro: "Compare final checkout totals, fees, and provider terms before you decide.",
    slugs: [
      "how-to-compare-concert-ticket-prices",
      "how-to-avoid-overpaying-for-concert-tickets",
      "concert-ticket-fees-explained",
      "why-ticket-prices-change",
      "ticketmaster-vs-seatgeek-vs-vivid-seats",
      "seatgeek-vs-ticketmaster"
    ]
  },
  {
    title: "Buy safely",
    intro: "Check legitimacy, avoid risky sellers, and understand what to verify before payment.",
    slugs: ["how-to-avoid-ticket-scams", "ticketmaster-vs-stubhub", "seatgeek-promo-code-guide"]
  },
  {
    title: "Understand resale and listings",
    intro: "Understand how resale listings, transfer timing, and provider protections can differ.",
    slugs: [
      "primary-vs-resale-concert-tickets",
      "how-resale-ticket-pricing-works",
      "how-to-read-a-ticket-listing",
      "ticket-delivery-and-transfer-timing"
    ]
  },
  {
    title: "Timing and planning",
    intro: "Plan when to buy and what to check before committing to a ticket.",
    slugs: [
      "when-is-the-best-time-to-buy-concert-tickets",
      "how-to-prepare-for-a-ticket-onsale",
      "what-to-do-if-a-concert-is-postponed-or-cancelled"
    ]
  }
];

const routeMeta = {
  "/": {
    title: "Compare Concert Tickets & Tour Dates | TourTicketCompare",
    description:
      "Compare ticket prices for the show you want. Choose an artist and date, see current listed prices from ticket sites where available, then check the total."
  },
  "/compare-concert-ticket-prices": {
    title: "Compare Concert Ticket Prices by Site | TourTicketCompare",
    description:
      "Compare prices for the same checked concert across ticket sites where listed-price snapshots are eligible, then confirm fees and the total with the provider."
  },
  "/artists": {
    title: "Artists | TourTicketCompare",
    description:
      "Browse major artist pages with verified ticket links where available and practical buying guidance on what to check before checkout."
  },
  "/guides": {
    title: "Concert Ticket Buying Guides | TourTicketCompare",
    description:
      "Practical concert-ticket guides on matching listings, checking final totals, choosing primary or resale, timing a purchase, and confirming provider terms."
  },
  "/how-it-works": {
    title: "How TourTicketCompare Works",
    description:
      "How TourTicketCompare checks official sources, keeps ticket links specific, and gives you clear guidance on what to confirm before checkout."
  },
  "/about": {
    title: "About TourTicketCompare",
    description:
      "TourTicketCompare is an independent, unofficial ticket research site for major live music tours and verified links where available."
  },
  "/contact": {
    title: "Contact TourTicketCompare",
    description: "Contact TourTicketCompare about broken ticket links, incorrect event details, provider-link issues, or general site feedback."
  },
  "/editorial-policy": {
    title: "Editorial Policy | TourTicketCompare",
    description:
      "The editorial rules TourTicketCompare follows before publishing artist facts, tour pages, provider links, prices, or availability."
  },
  "/affiliate-disclosure": {
    title: "Affiliate Disclosure | TourTicketCompare",
    description:
      "How TourTicketCompare uses affiliate links while staying independent, unofficial, and focused on checked ticket destinations."
  }
};

let catalog = fallbackCatalog;
let artistsMeta = [];
const main = document.getElementById("mainContent");
const year = document.getElementById("currentYear");
const navToggle = document.querySelector("[data-nav-toggle]");
const navLinks = document.querySelector("[data-nav-links]");

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function text(parent, tagName, value, className) {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  element.textContent = value;
  parent.append(element);
  return element;
}

function appendInlineGuideContent(element, value) {
  const pattern = /\[([^\]]+)\]\((\/guides\/[a-z0-9-]+)\)/g;
  let lastIndex = 0;
  let match;
  const copy = String(value || "");
  while ((match = pattern.exec(copy)) !== null) {
    if (match.index > lastIndex) element.append(document.createTextNode(copy.slice(lastIndex, match.index)));
    element.append(link(match[1], match[2], "text-link"));
    lastIndex = pattern.lastIndex;
  }
  if (lastIndex < copy.length) element.append(document.createTextNode(copy.slice(lastIndex)));
}

function guideText(parent, tagName, value, className) {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  appendInlineGuideContent(element, value);
  parent.append(element);
  return element;
}

// /api/out is a tracked redirect endpoint, not indexable content: every CTA
// pointing at it is rel="nofollow" so crawlers don't spend budget on the
// redirect hop, and monetized providers additionally declare rel="sponsored".
// Ticketmaster stays plain and unmonetized, so it is nofollow-only. Keep in
// sync with outboundCtaRel in functions/[[path]].js.
function outboundCtaRel(href) {
  const raw = String(href || "");
  if (!raw.startsWith("/api/out?")) return null;
  const provider = new URLSearchParams(raw.slice(raw.indexOf("?") + 1)).get("provider") || "";
  return provider === "ticketmaster" ? "noopener nofollow" : "noopener nofollow sponsored";
}

// Records which CTA component produced an outbound click, on the one URL the
// server actually sees. Appended to the tracked redirect only — never to a
// provider or affiliate URL, which /api/out resolves separately from stored
// event data. /api/out validates the value against a fixed list.
// Keep in sync with withCtaLocation in functions/[[path]].js.
function withCtaLocation(href, ctaLocation) {
  // Returns the argument untouched when it is not a tracked redirect, so a
  // suppressed CTA (href null) stays suppressed rather than becoming "".
  if (typeof href !== "string" || !href.startsWith("/api/out?")) return href;
  const location = String(ctaLocation || "").trim();
  if (!location || /[?&]ctaLocation=/.test(href)) return href;
  return `${href}&ctaLocation=${encodeURIComponent(location)}`;
}

function link(label, href, className) {
  const element = document.createElement("a");
  element.href = href;
  element.textContent = label;
  if (className) element.className = className;
  if (/^https?:\/\//i.test(href)) element.rel = "noopener";
  const outboundRel = outboundCtaRel(href);
  if (outboundRel) element.rel = outboundRel;
  return element;
}

function buttonLink(label, href, variant = "primary") {
  return link(label, href, `button button-${variant}`);
}

function showAnchorId(show) {
  const id = slugify(show?.id);
  return id ? `show-${id}` : "";
}

async function copyTextToClipboard(value) {
  const textValue = String(value || "");
  if (!textValue) return false;
  if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
    await navigator.clipboard.writeText(textValue);
    return true;
  }
  const textarea = document.createElement("textarea");
  textarea.value = textValue;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.left = "-9999px";
  document.body.append(textarea);
  textarea.select();
  const copied = document.execCommand("copy");
  textarea.remove();
  return copied;
}

function renderCopyShowLinkAction(article) {
  if (!article?.id) return null;
  const action = document.createElement("button");
  action.type = "button";
  action.className = "text-link copy-show-link";
  action.dataset.copyShowLink = article.id;
  action.textContent = "Copy link to this date";
  return action;
}

function createList(items, className) {
  const list = document.createElement("ul");
  if (className) list.className = className;
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    list.append(li);
  });
  return list;
}

// ── Commercial funnel instrumentation ──────────────────────────────────────
// One beacon contract, shared by every client-side funnel step. The server
// derives page type, device category and acquisition channel from what is sent
// here; see functions/_funnel.js and docs/COMMERCIAL_FUNNEL.md.
//
// Nothing in this block reads or sends a name, an email address, or a full URL.
// Only same-tab sessionStorage is used — no cookie is set, and nothing is
// written that survives the tab closing.

// Page type for the GA4 mirror. The first-party row is labelled server-side
// from the request path; this is the same rule expressed client-side so the two
// agree. Keep in sync with classifyPageType in functions/_funnel.js
// (scripts/funnel-analytics.test.mjs asserts the two never diverge).
const TRUST_PAGE_PATHS = ["/how-it-works", "/about", "/contact", "/editorial-policy", "/affiliate-disclosure", "/privacy", "/terms"];

function clientPageType(pathname) {
  let path = String(pathname || "/").split("?")[0].split("#")[0];
  if (path !== "/") path = path.replace(/\/+$/, "") || "/";
  if (path === "/") return "home";
  if (TRUST_PAGE_PATHS.indexOf(path) !== -1) return "trust";
  if (path === "/compare-concert-ticket-prices") return "compare_hub";
  if (path === "/currency-converter") return "currency_converter";
  const parts = path.split("/").filter(Boolean);
  if (parts[0] === "artists") {
    if (parts.length === 1) return "artists_index";
    if (parts.length === 2) return "artist";
    if (parts.length === 4 && parts[2] === "tickets") return "artist_city";
    if (parts.length === 3) return "artist_tour";
    return "other";
  }
  if (parts[0] === "cities") return parts.length === 1 ? "cities_index" : parts.length === 2 ? "city" : "other";
  if (parts[0] === "venues") return parts.length === 1 ? "venues_index" : parts.length === 2 ? "venue" : "other";
  if (parts[0] === "guides") return parts.length === 1 ? "guides_index" : parts.length === 2 ? "guide" : "other";
  return "other";
}

// Session-scoped acquisition context. document.referrer only describes the
// document that is loading, so a visit spanning several server-rendered pages
// used to report acquisition once per hard navigation — counting one visit as
// several. Storing it for the tab means the landing page and the traffic source
// are recorded once, and every later event can be attributed back to them.
const FUNNEL_SESSION_STORAGE_KEY = "ttc:funnel-session";

const FUNNEL_SESSION = (() => {
  const capture = () => {
    let referrer = "";
    try {
      const raw = document.referrer || "";
      if (raw) {
        const url = new URL(raw);
        // Only the origin is kept, never the full referring URL or its query,
        // and only third-party origins count — same-site navigation is not
        // acquisition.
        if (url.hostname && url.hostname !== window.location.hostname) referrer = url.origin;
      }
    } catch (error) {}
    let params = null;
    try {
      params = new URLSearchParams(window.location.search || "");
    } catch (error) {}
    const pick = (key) => String((params && params.get(key)) || "").trim().slice(0, 80);
    return {
      landingPath: window.location.pathname,
      referrer,
      utmSource: pick("utm_source"),
      utmMedium: pick("utm_medium"),
      utmCampaign: pick("utm_campaign")
    };
  };

  let store = null;
  try {
    store = window.sessionStorage;
  } catch (error) {}
  if (!store) return { ...capture(), isNewSession: true };

  try {
    const stored = JSON.parse(store.getItem(FUNNEL_SESSION_STORAGE_KEY) || "null");
    if (stored && typeof stored === "object" && typeof stored.landingPath === "string") {
      return { ...stored, isNewSession: false };
    }
  } catch (error) {}

  const fresh = capture();
  try {
    store.setItem(FUNNEL_SESSION_STORAGE_KEY, JSON.stringify(fresh));
  } catch (error) {}
  return { ...fresh, isNewSession: true };
})();

// Acquisition is attached to the first page_view of the session only. A
// returning document load inside the same tab reuses the stored context without
// re-reporting it, so one visit can never be counted as several.
let acquisitionReported = !FUNNEL_SESSION.isNewSession;

// Suppresses a second beacon for the same interaction inside the window: a
// double-click, a bubbling re-dispatch, or a CTA nested inside another tracked
// element. Client-side counts must never inflate the funnel. Keep in sync with
// createDuplicateGuard in functions/_funnel.js.
const FUNNEL_DUPLICATE_WINDOW_MS = 1500;

const isDuplicateFunnelEvent = (() => {
  const seen = new Map();
  const maxKeys = 200;
  return (key, now) => {
    const stamp = Number(now);
    if (!key || !Number.isFinite(stamp)) return false;
    const previous = seen.get(key);
    if (previous !== undefined && stamp - previous < FUNNEL_DUPLICATE_WINDOW_MS) return true;
    seen.set(key, stamp);
    if (seen.size > maxKeys) {
      const excess = seen.size - maxKeys;
      let removed = 0;
      for (const existing of seen.keys()) {
        seen.delete(existing);
        removed += 1;
        if (removed >= excess) break;
      }
    }
    return false;
  };
})();

// GA4 mirror. The first-party D1 row stays authoritative — GA4 cannot observe
// the server-side 3xx, and its page_view is emitted by the GTM configuration.
// The legacy D1 `provider_click` intent is represented in GA4 as one
// `outbound_click` CTA-activation event, avoiding the old provider_click vs
// outbound_click naming split and avoiding a second GA4 event for one action.
// GA4's event is eligible/observed intent; D1's server `outbound_click` remains
// the successful-redirect metric. Parameters stay low-cardinality.
const GA4_MIRRORED_EVENTS = ["artist_view", "provider_cta_view", "provider_click", "email_signup"];

function mirrorToGa4(eventName, payload, metadata) {
  if (GA4_MIRRORED_EVENTS.indexOf(eventName) === -1) return;
  if (typeof window.gtag !== "function") return;
  try {
    const params = { page_type: clientPageType(window.location.pathname) };
    if (payload.artistSlug) params.artist_slug = payload.artistSlug;
    if (payload.provider) params.provider = payload.provider;
    if (metadata.ctaLocation) params.cta_location = metadata.ctaLocation;
    if (typeof metadata.isAffiliate === "boolean") params.is_affiliate = metadata.isAffiliate;
    const ga4EventName = eventName === "provider_click" ? "outbound_click" : eventName;
    window.gtag("event", ga4EventName, params);
  } catch (error) {}
}

function sendAnalytics(eventName, metadata = {}) {
  if (!navigator.sendBeacon) return;
  try {
    const enriched = { ...metadata };
    const payload = {
      eventName,
      sourcePath: window.location.pathname,
      landingPath: FUNNEL_SESSION.landingPath || window.location.pathname,
      artistSlug: metadata.artistSlug || "",
      provider: metadata.provider || "",
      tourSlug: metadata.tourSlug || "",
      destinationHost: metadata.destinationHost || "",
      linkId: metadata.linkId || "",
      eventId: metadata.eventId || metadata.showId || "",
      metadata: enriched
    };
    if (eventName === "page_view" && !acquisitionReported) {
      acquisitionReported = true;
      enriched.entry = true;
      if (FUNNEL_SESSION.referrer) payload.referrer = FUNNEL_SESSION.referrer;
      if (FUNNEL_SESSION.utmSource) enriched.utmSource = FUNNEL_SESSION.utmSource;
      if (FUNNEL_SESSION.utmMedium) enriched.utmMedium = FUNNEL_SESSION.utmMedium;
      if (FUNNEL_SESSION.utmCampaign) enriched.utmCampaign = FUNNEL_SESSION.utmCampaign;
    }
    navigator.sendBeacon("/api/analytics", JSON.stringify(payload));
    mirrorToGa4(eventName, payload, enriched);
  } catch (error) {}
}

function setMeta(meta, noindex = false) {
  if (meta?.title) document.title = meta.title;
  const canonicalUrl = new URL(window.location.pathname, window.location.origin).toString();
  const updates = [
    ['meta[name="description"]', meta?.description],
    ['meta[property="og:title"]', meta?.title],
    ['meta[property="og:description"]', meta?.description],
    ['meta[name="twitter:title"]', meta?.title],
    ['meta[name="twitter:description"]', meta?.description]
  ];
  updates.forEach(([sel, val]) => {
    if (!val) return;
    const el = document.querySelector(sel);
    if (el) el.setAttribute("content", val);
  });
  const robots = document.querySelector('meta[name="robots"]');
  if (robots) robots.setAttribute("content", noindex ? "noindex,follow" : "index,follow,max-image-preview:large");
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.setAttribute("href", canonicalUrl);
  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute("content", canonicalUrl);
}

function findArtist(slug) {
  const artist = (catalog.artists || []).find((a) => slugify(a.slug) === slug);
  if (!artist) return undefined;
  const meta = artistsMeta.find((m) => slugify(m.slug) === slug) || {};
  return { ...artist, indexing_status: meta.indexing_status || "" };
}

function findGuide(slug) {
  return guidePages.find((guide) => guide.slug === slug);
}

function ticketLinksForArtist(artistSlug) {
  return (catalog.ticket_links || []).filter(
    (item) =>
      slugify(item.artist_slug) === artistSlug &&
      item.verified === true &&
      item.public_enabled === true &&
      item.affiliate_enabled === true
  );
}

function providerEnabled(providerSlug) {
  return (catalog.providers || []).some((provider) => slugify(provider.slug) === providerSlug && provider.public_enabled === true);
}

function artistHasVerifiedEventLinks(events, artistSlug) {
  const now = Date.now();
  const slug = slugify(artistSlug);
  return (events || []).some((event) => {
    if (!event || slugify(event.artist_slug) !== slug) return false;
    const ts = Date.parse(event.dateTimeISO || event.datetime_iso || "");
    if (!Number.isFinite(ts) || ts < now) return false;
    const ticketmasterAvailable = eventLinkPublishable(event) && Boolean(safeVerifiedEventUrl(event.ticketmaster_url));
    const seatGeekAvailable = providerEventPublishable(event, "seatgeek") && Boolean(safeSeatGeekEventUrl(event.seatgeek_url));
    const vividSeatsAvailable = providerEventPublishable(event, "vivid-seats") && Boolean(safeVividSeatsEventUrl(event.vividseats_url));
    const impactMarketplaceAvailable = IMPACT_MARKETPLACE_PROVIDERS.some((provider) =>
      providerEnabled(provider.slug) &&
      providerEventPublishable(event, provider.slug) &&
      Boolean(safeImpactMarketplaceEventUrl(event?.[provider.urlField], provider))
    );
    return ticketmasterAvailable || seatGeekAvailable || vividSeatsAvailable || impactMarketplaceAvailable;
  });
}

// Does the artist have at least one upcoming (future-dated) reviewed show?
// Mirrors artistHasUpcomingShow in functions/_artist-indexability.js. This is
// presentation state only; it does not decide whether the artist URL exists or
// is indexable.
function artistHasUpcomingShow(events, artistSlug, now = Date.now()) {
  const slug = slugify(artistSlug);
  return (events || []).some((event) => {
    if (!event || slugify(event.artist_slug) !== slug) return false;
    const ts = Date.parse(event.dateTimeISO || event.datetime_iso || "");
    return Number.isFinite(ts) && ts >= now;
  });
}

// Card state for an artist tile. Upcoming status comes from the same
// future-event gate as the server renderer. Keep in sync with
// artistCardStatus in functions/[[path]].js.
function artistCardStatus(artist, events) {
  const activeProviders = ticketLinksForArtist(artist.slug).filter((item) => providerEnabled(slugify(item.provider)));
  const hasArtistLinks = activeProviders.length > 0;
  const hasUpcoming = artistHasUpcomingShow(events, artist.slug);
  if (!hasUpcoming) {
    return {
      pending: false,
      dateless: true,
      badgeClass: "status-badge status-badge-muted",
      badge: "No dates currently listed",
      detail: "No future dates are currently listed",
      cardStatus: hasArtistLinks
        ? "No future dates are currently listed; get an alert when they land."
        : "No future dates are currently listed for this artist.",
      ctaLabel: hasArtistLinks ? "Get date alerts" : "View artist page",
      ctaVariant: "secondary"
    };
  }
  if (hasUpcoming && artistHasVerifiedEventLinks(events, artist.slug)) {
    return {
      pending: false,
      dateless: false,
      badgeClass: "status-badge",
      badge: "Dates listed",
      detail: "Ticket links for individual dates",
      cardStatus: "Ticket links are live for individual dates on this page.",
      ctaLabel: "View dates",
      ctaVariant: "primary"
    };
  }
  if (!hasArtistLinks) {
    return {
      pending: true,
      dateless: !hasUpcoming,
      badgeClass: "status-badge status-badge-muted",
      badge: "Being checked",
      detail: "Links appear once we've checked them",
      cardStatus: "We haven't published a ticket link for this artist yet.",
      ctaLabel: "View artist page",
      ctaVariant: "secondary"
    };
  }
  if (hasUpcoming) {
    return {
      pending: false,
      dateless: false,
      badgeClass: "status-badge",
      badge: "Dates listed",
      detail: "Links to the artist's page on each provider",
      cardStatus: "Dates are listed; the links go to this artist's page on each provider.",
      ctaLabel: "View dates",
      ctaVariant: "primary"
    };
  }
}

// Stable copies of the artist list split by current future-event state.
function artistsByUpcomingState(artists, events) {
  const cards = (artists || []).map((artist) => ({ artist, status: artistCardStatus(artist, events) }));
  return {
    primary: cards.filter(({ status }) => !status.dateless),
    secondary: cards.filter(({ status }) => status.dateless)
  };
}

function getRoute() {
  const parts = window.location.pathname.split("/").filter(Boolean).map(slugify);
  if (!parts.length) return { type: "home" };
  if (parts.length === 1 && routeMeta[`/${parts[0]}`]) return { type: parts[0] };

  if (parts.length === 1) {
    const legacyArtist = findArtist(parts[0]);
    if (legacyArtist) return { type: "client-redirect", to: `/artists/${legacyArtist.slug}` };
  }

  const legacyTicketMatch = window.location.pathname.match(/^\/([a-z0-9-]+)-tickets(?:-[a-z0-9-]+)?\/?$/i);
  if (legacyTicketMatch) {
    const artist = findArtist(slugify(legacyTicketMatch[1]));
    if (artist) return { type: "client-redirect", to: `/artists/${artist.slug}` };
  }

  if (parts[0] === "artists") {
    if (parts.length === 1) return { type: "artists" };
    const artist = findArtist(parts[1]);
    if (!artist) return { type: "not-found" };
    if (parts.length === 2) return { type: "artist", artist };
    if (parts.length === 3 && parts[2] === "tickets") return { type: "client-redirect", to: `/artists/${artist.slug}` };
    // Artist-city landing pages (/artists/<artist>/tickets/<city>) are fully
    // rendered by the function route and have no client renderer, so preserve
    // the server HTML (like /cities and /venues) instead of falling through to
    // the client-side 404. The server already returns a real 404 or 301 for
    // non-qualifying combinations, so preserving its output is correct.
    if (parts.length === 4 && parts[2] === "tickets") return { type: "server-rendered" };
    if (parts.length === 3) {
      const tour = (catalog.tours || []).find((candidate) => candidate.artist_slug === artist.slug && candidate.slug === parts[2]);
      return tour ? { type: "tour", artist, tour } : { type: "not-found" };
    }
  }

  if (parts[0] === "guides") {
    if (parts.length === 1) return { type: "guides" };
    if (parts.length === 2 && oldGuideRedirects[parts[1]]) {
      return { type: "client-redirect", to: `/guides/${oldGuideRedirects[parts[1]]}` };
    }
    const guide = findGuide(parts[1]);
    if (guide) return { type: "guide", guide };
  }

  // City and venue landing pages (/cities, /cities/<slug>, /venues,
  // /venues/<slug>) are fully rendered by the function route
  // (functions/[[path]].js) and have no client renderer. Treat them as
  // server-authoritative so the client preserves the server HTML instead of
  // falling through to the client-side 404. The server already returns a real
  // 404 for unknown slugs, so preserving its output is correct in both the
  // found and not-found cases.
  if (parts[0] === "cities" || parts[0] === "venues") return { type: "server-rendered" };

  // The currency converter page is fully rendered by functions/[[path]].js;
  // initCurrencyConverter() hydrates the form in place, so preserve the
  // server HTML instead of falling through to the client-side 404.
  if (parts.length === 1 && parts[0] === "currency-converter") return { type: "server-rendered" };

  return { type: "not-found" };
}

function renderBreadcrumb(items) {
  const nav = document.createElement("nav");
  nav.className = "breadcrumbs";
  nav.setAttribute("aria-label", "Breadcrumb");
  const list = document.createElement("ol");
  items.forEach((item, index) => {
    const li = document.createElement("li");
    if (index === items.length - 1) {
      li.textContent = item.label;
      li.setAttribute("aria-current", "page");
    } else {
      li.append(link(item.label, item.href));
    }
    list.append(li);
  });
  nav.append(list);
  return nav;
}

function artistPageHeading(artist, hasServerDates = true) {
  return hasServerDates ? `${artist.name} tickets and tour dates` : `${artist.name} tickets`;
}

// Artist-page editorial copy — the lead, the fact strip, the shared price/link
// help, the provenance block and the FAQ — is derived once on the server from
// functions/_artist-content.js and transplanted here rather than rebuilt.
// Reimplementing it in two languages is what let the two versions drift; there
// is no client navigation on this route, so the server markup for this exact
// artist is always in the document when hydration runs.
function transplantServerNode(selector) {
  return main.querySelector(selector);
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

function providerVerificationNote(item) {
  const date = formatVerificationDate(item?.last_verified_at);
  return date ? `Provider link last checked: ${date}.` : "";
}

// Affiliate providers (SeatGeek, Vivid Seats) render before the plain,
// unmonetized Ticketmaster link. Keep in sync with PROVIDER_DISPLAY_ORDER in
// functions/[[path]].js.
const PROVIDER_DISPLAY_ORDER = ["seatgeek", "vivid-seats", ...IMPACT_MARKETPLACE_PROVIDERS.map((provider) => provider.slug), "ticketmaster"];

function providerDisplayRank(providerSlug) {
  const rank = PROVIDER_DISPLAY_ORDER.indexOf(providerSlug);
  return rank === -1 ? PROVIDER_DISPLAY_ORDER.length : rank;
}

function artistProviderHref(artist, item, surface) {
  const provider = slugify(item?.provider);
  // Ticketmaster stays a plain /api/out redirect; monetized artist links route
  // through /api/out too so the click is Impact-tracked server-side. Only emit a
  // link when a verified destination exists — out.js resolves the tracked
  // performer-page URL from VERIFIED_TICKET_LINKS.
  if (provider !== "ticketmaster" && !safeVerifiedEventUrl(item?.url)) return null;
  const params = new URLSearchParams({
    artistSlug: artist.slug,
    provider,
    sourcePath: `/artists/${artist.slug}`,
    surface
  });
  if (item?.tour_slug) params.set("tourSlug", item.tour_slug);
  return `/api/out?${params.toString()}`;
}

function renderProviderButtons(artist, surface) {
  const links = ticketLinksForArtist(artist.slug)
    .filter((item) => slugify(item.provider) === "ticketmaster" || Boolean(safeVerifiedEventUrl(item?.url)))
    .filter((item) => providerEnabled(slugify(item.provider)))
    .sort((a, b) => providerDisplayRank(slugify(a.provider)) - providerDisplayRank(slugify(b.provider)));
  const panel = document.createElement("section");
  panel.className = "provider-panel";
  panel.setAttribute("aria-labelledby", "providerTitle");
  text(panel, "h2", "Where to buy").id = "providerTitle";

  if (!links.length) {
    text(panel, "p", "We haven't got a checked provider page for this artist yet — buttons only go up once we've followed the link ourselves.", "muted");
    const guideNote = document.createElement("p");
    guideNote.className = "muted";
    guideNote.append(
      document.createTextNode("Worth reading before you pick a ticket site: "),
      link("avoiding overpaying", "/guides/how-to-avoid-overpaying-for-concert-tickets", "text-link"),
      document.createTextNode(", "),
      link("when to buy", "/guides/when-is-the-best-time-to-buy-concert-tickets", "text-link"),
      document.createTextNode(", and "),
      link("spotting ticket scams", "/guides/how-to-avoid-ticket-scams", "text-link"),
      document.createTextNode(".")
    );
    panel.append(guideNote);
    const noLinkActions = document.createElement("div");
    noLinkActions.className = "action-row";
    noLinkActions.append(
      buttonLink("Read buying guides", "/guides", "secondary"),
      buttonLink("Browse other artists", "/artists", "secondary")
    );
    panel.append(noLinkActions);
    return panel;
  }

  text(panel, "p", "Provider pages for this artist — not date-specific links.", "muted");
  if (links.length === 1) {
    text(panel, "p", "Only one artist-level provider page is currently verified, so this is not a full provider comparison.", "disclosure-note");
  }
  const actions = document.createElement("div");
  actions.className = "provider-actions";
  links.forEach((item) => {
    const providerSlug = slugify(item.provider);
    const copy = providerCopy[providerSlug] || { name: item.provider, label: "Check provider" };
    const card = document.createElement("article");
    card.className = "provider-card";
    text(card, "p", "Artist-level provider page", "eyebrow");
    text(card, "h3", copy.name);
    const cta = buttonLink(copy.label, withCtaLocation(artistProviderHref(artist, item, surface), "artist_provider_panel"), "primary");
    // The delegated provider_click listener reads these dimensions; no
    // per-button listener needed.
    cta.dataset.ctaProvider = providerSlug;
    cta.dataset.ctaArtist = artist.slug;
    cta.dataset.ctaPriceSnapshot = "absent";
    cta.dataset.ctaLocation = "artist_provider_panel";
    if (item.link_id) cta.dataset.ctaLinkId = item.link_id;
    card.append(cta);
    const verificationNote = providerVerificationNote(item);
    if (verificationNote) {
      text(card, "p", verificationNote, "disclosure-note");
    }
    actions.append(card);
  });
  panel.append(actions);
  return panel;
}

// --- Site search ---

let eventsSearchPromise = null;

function loadEventsForSearch() {
  if (!eventsSearchPromise) {
    eventsSearchPromise = fetch("/data/events.json", { cache: "force-cache" })
      .then((r) => (r.ok ? r.json() : []))
      .then((data) => (Array.isArray(data) ? data : []))
      .catch(() => []);
  }
  return eventsSearchPromise;
}

// Lightweight per-event index for search matching (~5x smaller than
// events.json). Matched results are resolved back to full event records via
// the per-artist partition files so CTA decisions are unchanged.
let eventsSearchIndexPromise = null;

function loadEventsSearchIndex() {
  if (!eventsSearchIndexPromise) {
    eventsSearchIndexPromise = fetch("/data/events-index.json", { cache: "force-cache" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => (Array.isArray(data) && data.length ? data : null))
      .catch(() => null)
      .then((data) => data || loadEventsForSearch());
  }
  return eventsSearchIndexPromise;
}

const artistPartitionPromises = new Map();

function loadArtistPartition(slug) {
  const key = slugify(slug);
  if (!key) return Promise.resolve([]);
  if (!artistPartitionPromises.has(key)) {
    artistPartitionPromises.set(
      key,
      fetch(`/data/events/${key}.json`, { cache: "force-cache" })
        .then((r) => (r.ok ? r.json() : []))
        .then((data) => (Array.isArray(data) ? data : []))
        .catch(() => [])
    );
  }
  return artistPartitionPromises.get(key);
}

// Swap index records for full partition records by id. A record that cannot
// be resolved keeps its index shape, which has no ticketmaster_url — so the
// result CTA safely falls back to the artist guidance page.
async function resolveEventRecords(indexRecords) {
  const slugs = [...new Set(indexRecords.map((event) => slugify(event.artist_slug)).filter(Boolean))];
  const partitions = await Promise.all(slugs.map(loadArtistPartition));
  const byId = new Map();
  partitions.flat().forEach((event) => {
    if (event && typeof event === "object" && event.id) byId.set(event.id, event);
  });
  return indexRecords.map((event) => byId.get(event.id) || event);
}

const COUNTRY_QUERY_ALIASES = {
  "usa": "united states",
  "us": "united states",
  "u.s.": "united states",
  "u.s.a.": "united states",
  "america": "united states",
  "united states of america": "united states",
  "uk": "united kingdom",
  "u.k.": "united kingdom",
  "britain": "united kingdom",
  "great britain": "united kingdom",
  "england": "united kingdom",
  "holland": "netherlands"
};

function expandedQueries(query) {
  const q = normalizeQuery(query);
  if (!q) return [];
  const alias = COUNTRY_QUERY_ALIASES[q];
  return alias ? [q, alias] : [q];
}

function searchableEventDate(event) {
  const iso = event.datetime_iso || event.dateTimeISO || "";
  const parts = venueDateParts(iso, event.timezone);
  if (!parts) return "";
  try {
    return parts.date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: parts.timeZone });
  } catch (error) {
    return "";
  }
}

function eventMatchesSearch(query, event) {
  const fields = [
    event.event_name,
    event.city,
    event.country,
    event.venue,
    event.artist_name,
    event.tour_name,
    searchableEventDate(event)
  ];
  return expandedQueries(query).some((q) => fields.some((field) => normalizeQuery(field).includes(q)));
}

function normalizeQuery(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

function matchesQuery(query, ...fields) {
  const q = normalizeQuery(query);
  if (!q) return false;
  return fields.some((f) => normalizeQuery(f).includes(q));
}

function sortEventsForSearch(events) {
  const now = Date.now();
  return [...events].sort((a, b) => {
    const tsA = new Date(a.datetime_iso || a.dateTimeISO || 0).getTime();
    const tsB = new Date(b.datetime_iso || b.dateTimeISO || 0).getTime();
    const futureA = tsA >= now;
    const futureB = tsB >= now;
    if (futureA !== futureB) return futureA ? -1 : 1;
    return futureA ? tsA - tsB : tsB - tsA;
  });
}

function renderSearchResultItem(type, data) {
  const li = document.createElement("li");
  li.className = "search-result-item";

  const nameEl = document.createElement("strong");
  const desc = document.createElement("span");
  desc.className = "search-result-desc";

  let ctaLabel, ctaHref;

  if (type === "artist") {
    nameEl.textContent = data.name;
    desc.textContent = data.short_description || "";
    ctaLabel = "Open artist page";
    ctaHref = `/artists/${data.slug}`;
  } else if (type === "event") {
    const isoField = data.datetime_iso || data.dateTimeISO || "";
    const dateStr = formatShowDate(isoField, data.timezone) || "";
    const place = [data.city, data.country].filter(Boolean).join(", ");
    const loc = [place, data.venue].filter(Boolean).join(" · ");
    nameEl.textContent = data.event_name || data.artist_name || "Verified show";
    desc.textContent = [dateStr, loc, data.tour_name].filter(Boolean).join(" — ");
    const eventCtaCandidates = [
      {
        provider: "seatgeek",
        label: "Open verified SeatGeek event link",
        href: eventTicketHref(data, "seatgeek"),
        available: providerEventPublishable(data, "seatgeek") && Boolean(safeSeatGeekEventUrl(data.seatgeek_url))
      },
      {
        provider: "vivid-seats",
        label: "Open verified Vivid Seats event link",
        href: eventTicketHref(data, "vivid-seats"),
        available: providerEventPublishable(data, "vivid-seats") && Boolean(safeVividSeatsEventUrl(data.vividseats_url))
      },
      {
        provider: "ticketmaster",
        label: "Open verified event link",
        href: eventTicketHref(data, "ticketmaster"),
        available: eventLinkPublishable(data) && Boolean(safeVerifiedEventUrl(data.ticketmaster_url))
      }
    ];
    const eventCta = eventCtaCandidates.find((candidate) => candidate.available);
    if (eventCta) {
      ctaHref = eventCta.href;
      ctaLabel = eventCta.label;
    } else {
      ctaHref = `/artists/${slugify(data.artist_slug || "")}`;
      ctaLabel = "Open artist guidance page";
    }
  } else if (type === "guide") {
    nameEl.textContent = data.h1;
    desc.textContent = data.description || "";
    ctaLabel = "Read guide";
    ctaHref = `/guides/${data.slug}`;
  }

  const cta = link(ctaLabel, ctaHref, "text-link search-result-cta");
  li.append(nameEl, desc, cta);
  return li;
}

// The routed homepage module (ttc-home.js) swaps this heading pair as soon as a
// query is entered, and back when the field is cleared. This fallback renders
// the same widget, so it has to make the same transition — otherwise results
// render underneath the pre-search prompt. Keep the copy in step with
// ttc-home.js and the server-rendered homepage in functions/[[path]].js.
const SEARCH_PANEL_PROMPT_TITLE = "Start with a search";
const SEARCH_PANEL_PROMPT_INTRO =
  "Enter an artist, city, venue, or tour above to see matching checked dates and guides.";
const SEARCH_PANEL_RESULTS_TITLE = "Search results";
const SEARCH_PANEL_RESULTS_INTRO = "Matches from checked artists, upcoming dates, and buying guides.";

function setSearchPanelHeading(hasQuery) {
  const title = document.getElementById("searchSectionTitle");
  const intro = document.getElementById("searchWidgetIntro");
  if (title) title.textContent = hasQuery ? SEARCH_PANEL_RESULTS_TITLE : SEARCH_PANEL_PROMPT_TITLE;
  if (intro) intro.textContent = hasQuery ? SEARCH_PANEL_RESULTS_INTRO : SEARCH_PANEL_PROMPT_INTRO;
}

function renderSearchResults(container, results, query) {
  container.replaceChildren();
  if (!query || normalizeQuery(query).length < 2) return;

  const total = results.artists.length + results.events.length + results.guides.length;
  const statusEl = document.createElement("p");
  statusEl.className = "search-result-count";

  if (total === 0) {
    statusEl.textContent =
      `No matches for “${query.trim()}” among the artists, events, and guides we’ve checked.`;
    container.append(statusEl);
    const nextSteps = document.createElement("p");
    nextSteps.className = "search-result-count";
    nextSteps.append(
      document.createTextNode("Try: "),
      link("browsing all artists", "/artists", "text-link"),
      document.createTextNode(", "),
      link("reading our buying guides", "/guides", "text-link"),
      document.createTextNode(", or "),
      link("checking how our link verification works", "/how-it-works", "text-link"),
      document.createTextNode(".")
    );
    container.append(nextSteps);
    return;
  }

  statusEl.textContent = `${total} result${total === 1 ? "" : "s"} for “${query.trim()}”`;
  container.append(statusEl);

  const groups = [
    { label: "Artists", items: results.artists, type: "artist", moreLabel: "Browse all artists", moreHref: "/artists", cap: 5 },
    { label: "Verified events", items: results.events, type: "event" },
    { label: "Buying guides", items: results.guides, type: "guide", moreLabel: "View all guides", moreHref: "/guides", cap: 5 }
  ];

  groups.forEach(({ label, items, type, moreLabel, moreHref, cap }) => {
    if (!items.length) return;
    const group = document.createElement("div");
    group.className = "search-group";
    const heading = document.createElement("h3");
    heading.className = "search-group-heading";
    heading.textContent = label;
    const list = document.createElement("ul");
    list.className = "search-group-list";
    items.forEach((item) => list.append(renderSearchResultItem(type, item)));
    group.append(heading, list);
    if (type === "event" && Number(results.eventsTotal) > items.length) {
      text(
        group,
        "p",
        `Showing the first ${items.length} of ${results.eventsTotal} matching events — add a city, venue, or date to narrow it down.`,
        "search-result-count"
      );
    }
    if (moreHref && cap && items.length >= cap) {
      const more = document.createElement("p");
      more.className = "search-result-count";
      more.append(link(moreLabel, moreHref, "text-link"));
      group.append(more);
    }
    container.append(group);
  });
}

function attachSearchBehavior(input, resultsContainer) {
  let debounceTimer;
  let searchSequence = 0;

  const runSearch = async () => {
    const query = input.value;
    const normalized = normalizeQuery(query);
    const requestId = ++searchSequence;

    setSearchPanelHeading(Boolean(normalized.length));

    if (!normalized.length) {
      resultsContainer.replaceChildren();
      return;
    }
    if (normalized.length < 2) {
      resultsContainer.replaceChildren();
      text(resultsContainer, "p", "Keep typing — search needs at least 2 characters.", "search-result-count");
      return;
    }

    const eventsData = await loadEventsSearchIndex();
    if (requestId !== searchSequence) return;

    const matchedArtists = (catalog.artists || [])
      .filter((a) => matchesQuery(query, a.name, ...(a.genres || [])))
      .slice(0, 5);

    const allMatchedEvents = sortEventsForSearch(eventsData).filter((e) => eventMatchesSearch(query, e));
    const matchedEvents = await resolveEventRecords(allMatchedEvents.slice(0, 6));
    if (requestId !== searchSequence) return;

    const matchedGuides = guidePages
      .filter((g) =>
        matchesQuery(query, g.h1, g.title, g.description, ...(g.sections || []).map(([h]) => h))
      )
      .slice(0, 5);

    renderSearchResults(
      resultsContainer,
      { artists: matchedArtists, events: matchedEvents, guides: matchedGuides, eventsTotal: allMatchedEvents.length },
      query
    );
  };

  input.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(runSearch, 400);
  });

  return runSearch;
}

function renderHeroSearchForm(resultsContainer) {
  const form = document.createElement("form");
  form.className = "hero-search-form";
  form.setAttribute("role", "search");
  form.setAttribute("aria-label", "Search artists, events, and guides");

  const labelEl = document.createElement("label");
  labelEl.htmlFor = "site-search";
  labelEl.className = "sr-only";
  labelEl.textContent = "Search by artist, city, country, venue, or tour";

  const input = document.createElement("input");
  input.type = "search";
  input.id = "site-search";
  input.name = "q";
  input.className = "hero-search-input";
  input.placeholder = "Search by artist, city, country, venue, or tour";
  input.setAttribute("aria-label", "Search by artist, city, country, venue, or tour");
  input.setAttribute("autocomplete", "off");
  input.setAttribute("spellcheck", "false");
  input.setAttribute("enterkeyhint", "search");

  const submit = document.createElement("button");
  submit.type = "submit";
  submit.className = "button button-primary hero-search-submit";
  submit.textContent = "Search";

  form.append(labelEl, input, submit);

  const runSearch = attachSearchBehavior(input, resultsContainer);
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    runSearch();
    const target = document.getElementById("search-widget");
    if (target && normalizeQuery(input.value).length >= 2) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

  return form;
}

function renderSearchResultsPanel() {
  const section = document.createElement("section");
  section.id = "search-widget";
  section.className = "section-grid search-section";
  section.setAttribute("aria-labelledby", "searchSectionTitle");

  const header = document.createElement("div");
  header.className = "section-intro";
  text(header, "h2", SEARCH_PANEL_PROMPT_TITLE).id = "searchSectionTitle";
  text(header, "p", SEARCH_PANEL_PROMPT_INTRO).id = "searchWidgetIntro";

  const resultsContainer = document.createElement("div");
  resultsContainer.className = "search-results";
  resultsContainer.setAttribute("role", "region");
  resultsContainer.setAttribute("aria-label", "Search results");
  resultsContainer.setAttribute("aria-live", "polite");
  resultsContainer.setAttribute("aria-atomic", "false");

  section.append(header, resultsContainer);
  return { section, resultsContainer };
}

// --- End site search ---

function renderWhatYouCanDo() {
  const section = document.createElement("section");
  section.className = "section-grid what-you-can-do";
  section.setAttribute("aria-labelledby", "whatYouCanDoTitle");
  const header = document.createElement("div");
  header.className = "section-intro";
  text(header, "h2", "How it works").id = "whatYouCanDoTitle";
  const grid = document.createElement("div");
  grid.className = "card-grid";
  HOME_STEPS.forEach(({ title, body, href, ctaLabel }) => {
    const card = document.createElement("article");
    card.className = "info-card";
    text(card, "h3", title);
    text(card, "p", body);
    card.append(link(ctaLabel, href, "text-link"));
    grid.append(card);
  });
  section.append(header, grid);
  return section;
}

function renderTrustSection() {
  const section = document.createElement("section");
  section.className = "section-grid trust-section";
  section.setAttribute("aria-labelledby", "trustTitle");
  const header = document.createElement("div");
  header.className = "section-intro";
  text(header, "h2", "How we stay honest").id = "trustTitle";
  const panel = document.createElement("div");
  panel.className = "nested-panel";
  text(panel, "p", "We're independent and unofficial, and we don't sell tickets. Every link is checked before it goes up, and if we can't check it, we don't show it.");
  const links = document.createElement("p");
  links.append(
    document.createTextNode("Learn more: "),
    link("How we work", "/how-it-works", "text-link"),
    document.createTextNode(" • "),
    link("Affiliate disclosure", "/affiliate-disclosure", "text-link")
  );
  panel.append(links);
  section.append(header, panel);
  return section;
}

async function renderHome() {
  setMeta(routeMeta["/"], false);
  const hero = document.createElement("section");
  hero.className = "hero-panel";
  hero.setAttribute("aria-labelledby", "heroTitle");
  const copy = document.createElement("div");
  copy.className = "hero-copy-block";
  text(copy, "h1", HOME_HEADLINE, "hero-title").id = "heroTitle";
  text(copy, "p", HOME_SUBCOPY, "hero-subcopy");
  text(
    copy,
    "p",
    "Coverage is strongest in the United States, with selected UK, Europe, and Canada dates.",
    "disclosure-note"
  );

  const { section: resultsSection, resultsContainer } = renderSearchResultsPanel();
  copy.append(renderHeroSearchForm(resultsContainer));

  const actions = document.createElement("div");
  actions.className = "action-row";
  actions.append(
    buttonLink(HOME_PRIMARY_CTA_LABEL, HOME_PRIMARY_CTA_HREF, "primary"),
    buttonLink("Read buying guides", "/guides", "secondary")
  );
  copy.append(actions);
  hero.append(copy);

  const artists = document.createElement("section");
  artists.id = "featured-artists";
  artists.className = "section-grid";
  artists.setAttribute("aria-labelledby", "homeArtistsTitle");
  const artistHeader = document.createElement("div");
  artistHeader.className = "section-intro";
  text(artistHeader, "h2", "Artists we track").id = "homeArtistsTitle";
  text(
    artistHeader,
    "p",
    "Upcoming dates and ticket links for every artist on the site. Artists with announced dates come first."
  );
  const homeEvents = await loadEventsForSearch();
  const states = artistsByUpcomingState(catalog.artists, homeEvents);
  const renderGrid = (items) => {
    const grid = document.createElement("div");
    grid.className = "artist-card-grid";
    items.forEach(({ artist, status }) => grid.append(renderArtistCard(artist, homeEvents, status)));
    return grid;
  };
  artists.append(artistHeader);
  const primary = document.createElement("section");
  primary.className = "artist-status-section";
  text(primary, "h2", "Artists with upcoming dates");
  primary.append(states.primary.length ? renderGrid(states.primary) : text(primary, "p", "No future dates are currently listed.", "muted"));
  artists.append(primary);
  if (states.secondary.length) {
    const secondary = document.createElement("details");
    secondary.className = "artist-status-section artist-status-section--secondary";
    const summary = document.createElement("summary");
    summary.textContent = `More artists to follow (${states.secondary.length} without dates currently listed)`;
    secondary.append(summary);
    text(secondary, "h2", "No dates currently listed");
    text(secondary, "p", "These artist pages remain available and move back to the primary section automatically when a future date is added.");
    secondary.append(renderGrid(states.secondary));
    artists.append(secondary);
  }

  main.replaceChildren(hero, resultsSection, renderWhatYouCanDo(), artists, renderGuidePreview(), renderTrustSection());
}


function renderArtistStatusLegend() {
  const legend = document.createElement("div");
  legend.className = "artist-status-legend";
  legend.setAttribute("aria-label", "Artist card status legend");
  // Keep in sync with renderArtistStatusLegendHtml in functions/[[path]].js.
  const items = [
    ["status-badge", "Dates listed", "Upcoming dates and ticket links on the page"],
    ["status-badge status-badge-muted", "No dates currently listed", "No future dates — artist page and alerts only"],
    ["status-badge status-badge-muted", "Being checked", "Links appear once we've checked them"]
  ];
  items.forEach(([badgeClass, badge, detail]) => {
    const item = document.createElement("span");
    item.className = "artist-status-legend-item";
    text(item, "span", badge, badgeClass);
    text(item, "span", detail, "status-chip-detail");
    legend.append(item);
  });
  return legend;
}

function formatCardDate(iso, timezone) {
  const parts = venueDateParts(iso, timezone);
  if (!parts) return null;
  try {
    return parts.date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: parts.timeZone });
  } catch (error) {
    return null;
  }
}

// Keep in sync with upcomingVerifiedShowSummary in functions/[[path]].js.
function upcomingVerifiedShowSummary(events, artistSlug) {
  const now = Date.now();
  const slug = slugify(artistSlug);
  const upcoming = (events || [])
    .filter((event) => {
      if (!event || slugify(event.artist_slug) !== slug) return false;
      const ts = Date.parse(event.dateTimeISO || event.datetime_iso || "");
      if (!Number.isFinite(ts) || ts < now) return false;
      if (!eventLinkPublishable(event)) return false;
      return /^https:\/\//i.test(String(event.ticketmaster_url || "").trim());
    })
    .sort((a, b) => Date.parse(a.dateTimeISO || a.datetime_iso) - Date.parse(b.dateTimeISO || b.datetime_iso));
  if (!upcoming.length) return null;
  const next = formatCardDate(upcoming[0].dateTimeISO || upcoming[0].datetime_iso, upcoming[0].timezone);
  if (!next) return null;
  return `Next date: ${next} · ${upcoming.length} upcoming ${upcoming.length === 1 ? "date" : "dates"}`;
}

function renderArtistCard(artist, events = [], status = artistCardStatus(artist, events)) {
  const article = document.createElement("article");
  article.className = ["artist-card", status.pending ? "is-pending" : "", status.dateless ? "is-dateless" : ""]
    .filter(Boolean)
    .join(" ");
  text(article, "h3", artist.name);
  const statusRow = document.createElement("div");
  statusRow.className = "artist-status-row";
  text(statusRow, "p", status.badge, status.badgeClass);
  article.append(statusRow);
  const showSummary = status.pending ? null : upcomingVerifiedShowSummary(events, artist.slug);
  text(article, "p", showSummary || status.detail, "card-status");
  article.append(buttonLink(status.ctaLabel, `/artists/${artist.slug}`, status.ctaVariant));
  return article;
}

function renderInfoCard(title, body, footer) {
  const article = document.createElement("article");
  article.className = "info-card";
  text(article, "h3", title);
  text(article, "p", body);
  if (footer) article.append(footer);
  return article;
}

function renderShowBoardShell(id, title, body, note) {
  const section = document.createElement("section");
  section.className = "section-grid show-board";
  section.setAttribute("aria-labelledby", id);
  const header = document.createElement("div");
  header.className = "section-intro";
  text(header, "h2", title).id = id;
  text(header, "p", body);
  if (note) text(header, "p", note, "disclosure-note");
  const grid = document.createElement("div");
  grid.className = "card-grid show-card-grid";
  grid.dataset.showGrid = "true";
  text(grid, "p", "Checking for verified ticket options...", "muted empty-state");
  section.append(header, grid);
  return section;
}

// Resolve a stored datetime to the venue's wall clock. Keep in sync with
// venueDateParts in functions/[[path]].js — see the full rationale there.
//
// Three shapes: naive wall time, wall time with an explicit offset (instant
// preserved for sorting, clock still written literally), and a bare instant
// that needs `timezone` to recover the venue's day. These client formatters
// previously passed no timeZone at all, so hydration re-rendered every date in
// the VIEWER's zone — a different answer again, varying by who was looking.
function venueDateParts(iso, timezone) {
  const raw = String(iso || "").trim();
  if (!raw) return null;
  if (/Z$/.test(raw)) {
    const instant = new Date(raw);
    if (!Number.isFinite(instant.getTime())) return null;
    const tz = String(timezone || "").trim();
    if (tz) {
      try {
        new Intl.DateTimeFormat("en-US", { timeZone: tz });
        return { date: instant, timeZone: tz };
      } catch (error) {
        // fall through to UTC
      }
    }
    return { date: instant, timeZone: "UTC" };
  }
  const wall = raw.replace(/[+-]\d{2}:?\d{2}$/, "");
  const asUtc = new Date(`${wall}Z`);
  if (!Number.isFinite(asUtc.getTime())) return null;
  return { date: asUtc, timeZone: "UTC" };
}

function formatShowDate(value, timezone) {
  const parts = venueDateParts(value, timezone);
  if (!parts) return "";
  return parts.date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: parts.timeZone
  });
}

// Date badge parts for the compact show card. Keep in sync with
// showDatePartsServer in functions/[[path]].js.
function showDateParts(value, timezone) {
  const parts = venueDateParts(value, timezone);
  if (!parts) return null;
  const { date, timeZone } = parts;
  try {
    return {
      weekday: date.toLocaleDateString("en-US", { weekday: "short", timeZone }),
      day: date.toLocaleDateString("en-US", { day: "numeric", timeZone }),
      monthYear: date.toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone })
    };
  } catch (error) {
    return null;
  }
}

function renderShowDateBadge(show) {
  const parts = showDateParts(show.dateTimeISO, show.timezone);
  if (!parts) return null;
  const badge = document.createElement("div");
  badge.className = "show-date-badge";
  text(badge, "span", parts.weekday, "show-date-weekday");
  text(badge, "span", parts.day, "show-date-day");
  text(badge, "span", parts.monthYear, "show-date-monthyear");
  return badge;
}

function showLocation(show) {
  return [show.city, show.venue]
    .map((value) => String(value || "").trim())
    .filter(Boolean)
    .join(" · ");
}

// Start time at the venue. A row whose venue-local time lands exactly on
// midnight is a date-only record, so no time is printed rather than inventing
// "12:00 AM". Keep in sync with showLocalTimeServer in functions/[[path]].js.
function showLocalTime(value, timezone) {
  const parts = venueDateParts(value, timezone);
  if (!parts) return "";
  try {
    // hourCycle pinned to h23: en-US with hour12:false defaults to h24 in some
    // ICU builds, rendering midnight as "24", and browser ICU varies. Both 0
    // and 24 count as midnight. Keep in sync with showLocalTimeServer.
    const hour = Number(parts.date.toLocaleString("en-US", { hour: "numeric", hourCycle: "h23", timeZone: parts.timeZone }));
    const minute = Number(parts.date.toLocaleString("en-US", { minute: "numeric", timeZone: parts.timeZone }));
    if (!Number.isFinite(hour) || !Number.isFinite(minute)) return "";
    if ((hour === 0 || hour === 24) && minute === 0) return "";
    return parts.date.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", timeZone: parts.timeZone });
  } catch (error) {
    return "";
  }
}

// The show-card meta line: full date, venue-local start time, and country —
// the facts that separate one date from another. Each part renders only when
// the source record carries it. Keep in sync with the metaHtml block in
// renderShowCardServerHtml in functions/[[path]].js.
function renderShowCardMeta(show) {
  const parts = [];
  const fullDate = formatShowDate(show.dateTimeISO, show.timezone);
  if (fullDate) {
    const time = document.createElement("time");
    time.setAttribute("datetime", String(show.dateTimeISO || ""));
    time.textContent = fullDate;
    parts.push(time);
  }
  const localTime = showLocalTime(show.dateTimeISO, show.timezone);
  if (localTime) parts.push(document.createTextNode(`${localTime} local`));
  const country = String(show.country || "").trim();
  if (country) parts.push(document.createTextNode(country));
  if (!parts.length) return null;
  const line = document.createElement("p");
  line.className = "show-card-meta";
  parts.forEach((part, index) => {
    if (index) line.append(document.createTextNode(" · "));
    line.append(part);
  });
  return line;
}

// Explicit event-link publishability. verification_status is retained as
// provenance metadata, but is no longer a human-review gate. A stored
// destination is eligible and the outbound redirect still performs strict
// provider validation. Events without a destination fall back to the legacy
// human-verified provider flag.
// Keep in sync with eventLinkPublishable in functions/[[path]].js and
// functions/api/out.js.
function eventLinkPublishable(event) {
  const destination = String((event && (event.ticketmaster_url || event.source_url)) || "").trim();
  if (destination) return true;
  return Boolean(event && event.provider_links && event.provider_links.ticketmaster && event.provider_links.ticketmaster.verified === true);
}

// Per-provider event publishability. Impact marketplace lanes require their own
// verified provenance; SeatGeek/Vivid retain their existing event-link
// fallback. Ticketmaster relies on its stored destination and the outbound
// redirect validator. Keep in sync with providerEventPublishable in
// functions/[[path]].js and functions/api/out.js.
function providerEventPublishable(event, provider) {
  if (IMPACT_MARKETPLACE_PROVIDERS.some((candidate) => candidate.slug === provider)) {
    return Boolean(event && event.provider_links && event.provider_links[provider] && event.provider_links[provider].verified === true);
  }
  if (provider !== "ticketmaster" && Boolean(event && event.provider_links && event.provider_links[provider] && event.provider_links[provider].verified === true)) return true;
  return eventLinkPublishable(event);
}

function safeVerifiedEventUrl(value) {
  const raw = String(value || "").trim();
  if (!raw) return null;
  const lower = raw.toLowerCase();
  const blockedHost = ["example", "com"].join(".");
  try {
    const parsed = new URL(raw);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return null;
    const host = parsed.hostname.toLowerCase();
    if (host === "localhost" || host.endsWith(".localhost") || host === "127.0.0.1") return null;
    if (host === blockedHost || host.endsWith(`.${blockedHost}`) || lower.includes("placeholder")) return null;
    return parsed.toString();
  } catch (error) {
    return null;
  }
}

function eventTicketHref(show, provider) {
  const showId = String(show?.id || "").trim();
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
    hasDestination = Boolean(safeSeatGeekEventUrl(show?.seatgeek_url));
  } else if (provider === "vivid-seats") {
    hasDestination = Boolean(safeVividSeatsEventUrl(show?.vividseats_url));
  } else {
    const marketplace = IMPACT_MARKETPLACE_PROVIDERS.find((candidate) => candidate.slug === provider);
    if (marketplace) hasDestination = Boolean(safeImpactMarketplaceEventUrl(show?.[marketplace.urlField], marketplace));
  }
  if (!hasDestination) return null;
  return `/api/out?${new URLSearchParams({ showId, provider }).toString()}`;
}

function safeSeatGeekEventUrl(value) {
  const safeUrl = safeVerifiedEventUrl(value);
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

function seatGeekOutAvailable(show, options = {}) {
  if (!options.seatGeekAvailable) return false;
  if (!providerEventPublishable(show, "seatgeek")) return false;
  const hasValidSeatGeekEventUrl = Boolean(safeSeatGeekEventUrl(show?.seatgeek_url));
  if (!hasValidSeatGeekEventUrl) return false;
  if (show?.provider_ctas && typeof show.provider_ctas === "object") {
    return show.provider_ctas.seatgeek === true && hasValidSeatGeekEventUrl;
  }
  return hasValidSeatGeekEventUrl;
}

function safeVividSeatsEventUrl(value) {
  const safeUrl = safeVerifiedEventUrl(value);
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

function vividSeatsOutAvailable(show, options = {}) {
  if (!options.vividSeatsAvailable) return false;
  if (!providerEventPublishable(show, "vivid-seats")) return false;
  const hasValidVividSeatsEventUrl = Boolean(safeVividSeatsEventUrl(show?.vividseats_url));
  if (!hasValidVividSeatsEventUrl) return false;
  if (show?.provider_ctas && typeof show.provider_ctas === "object") {
    return show.provider_ctas.vividseats === true && hasValidVividSeatsEventUrl;
  }
  return hasValidVividSeatsEventUrl;
}

function safeImpactMarketplaceEventUrl(value, provider) {
  const safeUrl = safeVerifiedEventUrl(value);
  if (!safeUrl || !provider) return null;
  try {
    const parsed = new URL(safeUrl);
    if (parsed.protocol !== "https:") return null;
    const host = parsed.hostname.toLowerCase();
    if (!provider.allowedHosts.some((allowed) => host === allowed || host.endsWith(`.${allowed}`))) return null;
    const path = decodeURIComponent(parsed.pathname || "/").replace(/\/+$/, "");
    if (!path || path === "/" || /^\/(search|home|about|help|support|faq|contact|terms|privacy)(?:\/|$)/i.test(path)) return null;
    return safeUrl;
  } catch (error) { return null; }
}

function impactMarketplaceOutAvailable(show, provider, options = {}) {
  if (!provider || !options.impactMarketplaceAvailability?.[provider.slug]) return false;
  if (!providerEventPublishable(show, provider.slug)) return false;
  const validUrl = Boolean(safeImpactMarketplaceEventUrl(show?.[provider.urlField], provider));
  if (!validUrl) return false;
  if (show?.provider_ctas && typeof show.provider_ctas === "object") {
    return show.provider_ctas[provider.slug] === true;
  }
  return true;
}


function isValidCurrencyCode(value) {
  const code = String(value || "").trim().toUpperCase();
  if (!/^[A-Z]{3}$/.test(code)) return false;
  try {
    new Intl.NumberFormat("en", { style: "currency", currency: code }).format(1);
    return true;
  } catch (error) {
    return false;
  }
}

function formatProviderPrice(value, currency) {
  const amount = Number(value);
  const code = String(currency || "").trim().toUpperCase();
  if (!Number.isFinite(amount) || !isValidCurrencyCode(code)) return "";
  try {
    return new Intl.NumberFormat(undefined, { style: "currency", currency: code, maximumFractionDigits: amount % 1 === 0 ? 0 : 2 }).format(amount);
  } catch (error) {
    return "";
  }
}

function formatSnapshotTime(value) {
  const ms = Date.parse(String(value || ""));
  if (!Number.isFinite(ms)) return "";
  try {
    return new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(new Date(ms));
  } catch (error) {
    return new Date(ms).toISOString();
  }
}

function isValidIsoDateTime(value) {
  const input = String(value || "").trim();
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{1,3})?(?:Z|[+-]\d{2}:\d{2})$/.test(input)) return false;
  return Number.isFinite(Date.parse(input));
}

function approvedSeatGeekPriceLane(show) {
  if (show?.provider_links?.seatgeek?.verified !== true) return null;
  if (!safeSeatGeekEventUrl(show?.seatgeek_url)) return null;
  const lanes = Array.isArray(show?.prices) ? show.prices : [];
  const lane = lanes.find((item) => String(item?.provider || "").toLowerCase() === "seatgeek");
  if (!lane || lane.status !== "ok" || lane.providerStatus !== "ok") return null;
  if (lane.source !== "seatgeek_partner_api") return null;
  const price = Number(lane.price);
  if (!Number.isFinite(price) || price < 0) return null;
  const currency = String(lane.currency || "").trim().toUpperCase();
  if (!isValidCurrencyCode(currency)) return null;
  if (!isValidIsoDateTime(lane.fetchedAt) || !isValidIsoDateTime(lane.expiresAt)) return null;
  const fetchedAtMs = Date.parse(String(lane.fetchedAt || ""));
  const expiresAtMs = Date.parse(String(lane.expiresAt || ""));
  if (!Number.isFinite(fetchedAtMs) || !Number.isFinite(expiresAtMs) || expiresAtMs <= Date.now()) return null;
  return { price, currency, fetchedAt: lane.fetchedAt, expiresAt: lane.expiresAt };
}

function approvedVividSeatsPriceLane(show) {
  if (show?.provider_links?.["vivid-seats"]?.verified !== true) return null;
  if (!safeVividSeatsEventUrl(show?.vividseats_url)) return null;
  const lanes = Array.isArray(show?.prices) ? show.prices : [];
  const lane = lanes.find((item) => item?.provider === "Vivid Seats");
  if (!lane || lane.status !== "ok" || lane.providerStatus !== "ok") return null;
  if (lane.source !== "vividseats_impact_marketplace_api") return null;
  const price = Number(lane.price);
  if (!Number.isFinite(price) || price < 0) return null;
  const currency = String(lane.currency || "").trim().toUpperCase();
  if (!isValidCurrencyCode(currency)) return null;
  if (!isValidIsoDateTime(lane.fetchedAt) || !isValidIsoDateTime(lane.expiresAt)) return null;
  const fetchedAtMs = Date.parse(String(lane.fetchedAt || ""));
  const expiresAtMs = Date.parse(String(lane.expiresAt || ""));
  if (!Number.isFinite(fetchedAtMs) || !Number.isFinite(expiresAtMs) || expiresAtMs <= Date.now()) return null;
  return { price, currency, fetchedAt: lane.fetchedAt, expiresAt: lane.expiresAt };
}

function approvedImpactMarketplacePriceLane(show, provider) {
  if (!provider || show?.provider_links?.[provider.slug]?.verified !== true) return null;
  if (!safeImpactMarketplaceEventUrl(show?.[provider.urlField], provider)) return null;
  const lane = (Array.isArray(show?.prices) ? show.prices : []).find((item) => item?.provider === provider.name);
  if (!lane || lane.status !== "ok" || lane.providerStatus !== "ok" || lane.source !== provider.priceSource) return null;
  const price = Number(lane.price);
  const currency = String(lane.currency || "").trim().toUpperCase();
  if (!Number.isFinite(price) || price < 0 || !isValidCurrencyCode(currency)) return null;
  if (!isValidIsoDateTime(lane.fetchedAt) || !isValidIsoDateTime(lane.expiresAt) || Date.parse(lane.expiresAt) <= Date.now()) return null;
  return { price, currency, fetchedAt: lane.fetchedAt, expiresAt: lane.expiresAt };
}

function hasApprovedMarketplacePrice(show) {
  return Boolean(
    approvedSeatGeekPriceLane(show) ||
    approvedVividSeatsPriceLane(show) ||
    IMPACT_MARKETPLACE_PROVIDERS.some((provider) => approvedImpactMarketplacePriceLane(show, provider))
  );
}

// One CTA button per available provider. The provider name sits on the left;
// the right side carries the approved, fresh listed-price snapshot when one
// exists (the price is the button) or "Check prices" when it doesn't. Keep in
// sync with renderProviderCtaButtonHtml in functions/[[path]].js.
function renderProviderCtaButton(name, href, amount, analytics = {}) {
  const cta = document.createElement("a");
  const ctaLocation = analytics.ctaLocation || "event_card";
  const trackedHref = withCtaLocation(href, ctaLocation);
  cta.className = `provider-cta${amount ? " provider-cta-priced" : ""}`;
  cta.href = trackedHref;
  cta.target = "_blank";
  cta.rel = outboundCtaRel(trackedHref) || "noopener";
  // Analytics dimensions for the delegated provider_click listener: artist,
  // event, provider, snapshot present/absent, and CTA location.
  cta.dataset.ctaProvider = analytics.provider || slugify(name);
  cta.dataset.ctaArtist = analytics.artistSlug || "";
  cta.dataset.ctaShowId = analytics.showId || "";
  cta.dataset.ctaPriceSnapshot = amount ? "present" : "absent";
  cta.dataset.ctaLocation = ctaLocation;
  text(cta, "span", name, "provider-cta-name");
  text(cta, "span", amount || "Check prices", `provider-cta-value${amount ? " provider-cta-price" : " provider-cta-check"}`);
  return cta;
}

// Copy for a card whose lanes were checked and none had an eligible snapshot.
// Deliberately neutral about where to look: the buttons are ordered affiliate
// first, so naming a subset of them would read as a recommendation rather than
// a description of the card. No link is emitted here — the provider buttons
// above stay the card's only outbound links.
// Keep in sync with PRICE_UNAVAILABLE_NOTE in functions/[[path]].js.
const PRICE_UNAVAILABLE_NOTE =
  "No listed-price snapshot is available for this date. Check current prices using the provider buttons above.";

// Did this card's price lanes actually get queried? A priced response carries
// one entry per approved lane (including the unavailable ones), while a board
// rendered without price data carries none — so "has entries", not "is an
// array", is the signal. Anything else is a card nothing checked, and silence
// is the only honest state for it.
// Keep in sync with pricesWereChecked in functions/[[path]].js.
function pricesWereChecked(show) {
  return Array.isArray(show?.prices) && show.prices.length > 0;
}

// Required snapshot disclosures for every price shown on a button, rendered
// once beneath the unified provider list. Provider names and capture times
// appear only for actual approved, fresh lanes.
//
// pricesChecked is load-bearing, not defensive: a board rendered from data that
// never carried price lanes (the offline fallback catalogue, or any response
// fetched without includePrices) would otherwise announce "no snapshot" for
// every date without having checked one.
function renderShowCardPriceNotes(ctaSpecs, pricesChecked = false) {
  const priced = ctaSpecs.filter((spec) => spec.priceAmount && spec.priceAsOf);
  if (!priced.length) {
    if (!pricesChecked || !ctaSpecs.length) return null;
    const emptyWrap = document.createElement("div");
    emptyWrap.className = "provider-cta-notes";
    text(emptyWrap, "p", PRICE_UNAVAILABLE_NOTE, "disclosure-note");
    return emptyWrap;
  }
  const wrap = document.createElement("div");
  wrap.className = "provider-cta-notes";
  const snapshotTimes = priced.map((spec) => `${spec.name} (${spec.priceAsOf})`).join(" · ");
  text(wrap, "p", `Listed-price snapshots, not live availability. ${snapshotTimes}. Prices may change and may exclude fees.`, "disclosure-note");
  return wrap;
}

// Inline SVG sparkline for one provider's snapshot series. Points are drawn in
// observation order; y is scaled to the provider's own min/max so the line
// reads as that provider's trend alone — never a cross-provider comparison.
function renderPriceHistorySparkline(points, currency) {
  const series = Array.isArray(points) ? points.filter((point) => Number.isFinite(Number(point?.price))) : [];
  if (series.length < 2) return null;
  const width = 260;
  const height = 56;
  const padX = 4;
  const padY = 6;
  const prices = series.map((point) => Number(point.price));
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const span = max - min;
  const stepX = series.length > 1 ? (width - padX * 2) / (series.length - 1) : 0;
  const yFor = (price) => {
    if (span <= 0) return height / 2;
    return padY + (height - padY * 2) * (1 - (price - min) / span);
  };
  const coords = series.map((point, index) => [padX + stepX * index, yFor(Number(point.price))]);
  const NS = "http://www.w3.org/2000/svg";
  const svg = document.createElementNS(NS, "svg");
  svg.setAttribute("class", "price-history-spark");
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.setAttribute("preserveAspectRatio", "none");
  svg.setAttribute("role", "img");
  const low = formatProviderPrice(min, currency);
  const high = formatProviderPrice(max, currency);
  svg.setAttribute("aria-label", `Listed-price snapshots between ${low || min} and ${high || max} across ${series.length} observations.`);
  const polyline = document.createElementNS(NS, "polyline");
  polyline.setAttribute("class", "price-history-spark-line");
  polyline.setAttribute("fill", "none");
  polyline.setAttribute("points", coords.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" "));
  svg.append(polyline);
  const [lastX, lastY] = coords[coords.length - 1];
  const dot = document.createElementNS(NS, "circle");
  dot.setAttribute("class", "price-history-spark-dot");
  dot.setAttribute("cx", lastX.toFixed(1));
  dot.setAttribute("cy", lastY.toFixed(1));
  dot.setAttribute("r", "2.5");
  svg.append(dot);
  return svg;
}

// "Register interest" form for the price-drop demand instrument (Phase 1). It
// posts to the existing gated /api/signup endpoint with intent=price_alert;
// NOTHING is ever emailed — this only records demand (capture_only) so the
// owner can decide whether the alert email stack is worth building.
function renderPriceAlertInterest(artistSlug, eventId) {
  const slug = String(artistSlug || "").trim();
  const id = String(eventId || "").trim();
  if (!slug || !id) return null;
  const form = document.createElement("form");
  form.className = "price-alert-interest";
  form.dataset.priceAlertInterest = slug;
  form.dataset.eventId = id;
  text(form, "p", "Want an email if this price drops? We don't send price emails yet — leave an address to register interest and help us decide whether to build alerts.", "muted");
  const row = document.createElement("div");
  row.className = "price-alert-interest-row";
  const inputId = `price-alert-email-${slugify(id)}`;
  const label = document.createElement("label");
  label.className = "sr-only";
  label.setAttribute("for", inputId);
  label.textContent = "Email address";
  const email = document.createElement("input");
  email.type = "email";
  email.id = inputId;
  email.name = "email";
  email.required = true;
  email.placeholder = "Your email address";
  email.autocomplete = "email";
  const honeypot = document.createElement("input");
  honeypot.className = "hp-field";
  honeypot.type = "text";
  honeypot.name = "website";
  honeypot.tabIndex = -1;
  honeypot.autocomplete = "off";
  honeypot.setAttribute("aria-hidden", "true");
  const submit = document.createElement("button");
  submit.className = "button button-secondary";
  submit.type = "submit";
  submit.textContent = "Register interest";
  row.append(email, honeypot, submit);
  form.append(label, row);
  const status = text(form, "p", "", "disclosure-note");
  status.setAttribute("data-alert-interest-status", "");
  status.setAttribute("aria-live", "polite");
  return form;
}

// Collapsed toggle + lazy-loaded panel for on-site per-event price history.
// Rendered only on cards that already show at least one approved price badge;
// the panel fetches /api/price-history on first open (progressive enhancement)
// so board payloads stay light.
function renderPriceHistoryPanel(show, options = {}) {
  const showId = String(show?.id || "").trim();
  if (!showId) return null;
  const wrap = document.createElement("div");
  wrap.className = "price-history";
  wrap.dataset.priceHistory = showId;
  wrap.dataset.priceHistoryArtist = String(options.artistSlug || show.artist_slug || "").trim();
  const panelId = `price-history-panel-${slugify(showId)}`;
  const toggle = document.createElement("button");
  toggle.type = "button";
  toggle.className = "price-history-toggle";
  toggle.dataset.priceHistoryToggle = "";
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-controls", panelId);
  toggle.textContent = "Show price snapshot history";
  const panel = document.createElement("div");
  panel.className = "price-history-panel";
  panel.id = panelId;
  panel.dataset.priceHistoryPanel = "";
  panel.hidden = true;
  wrap.append(toggle, panel);
  return wrap;
}

// Renders a fetched price-history payload into an opened panel: one independent
// series per provider (never merged or ranked), snapshot framing, then the
// demand-instrument interest form.
function renderPriceHistoryContent(panel, wrap, data) {
  panel.replaceChildren();
  const providers = Array.isArray(data?.providers) ? data.providers : [];
  const rendered = [];
  for (const series of providers) {
    const points = Array.isArray(series?.points) ? series.points : [];
    if (points.length < 2) continue;
    const block = document.createElement("div");
    block.className = "price-history-provider";
    text(block, "h5", String(series.provider || "").trim() || "Provider", "price-history-provider-name");
    const spark = renderPriceHistorySparkline(points, series.currency);
    if (spark) block.append(spark);
    const first = points[0];
    const last = points[points.length - 1];
    const latest = formatProviderPrice(last.price, series.currency);
    const firstAsOf = formatSnapshotTime(first.observedAt);
    const lastAsOf = formatSnapshotTime(last.observedAt);
    const caption = latest && firstAsOf && lastAsOf
      ? `${points.length} listed-price snapshots · ${firstAsOf} – ${lastAsOf}. Most recent: ${latest}.`
      : `${points.length} listed-price snapshots.`;
    text(block, "p", caption, "price-history-caption muted");
    panel.append(block);
    rendered.push(series);
  }

  if (!rendered.length) {
    text(panel, "p", "Not enough snapshots have been recorded yet to show a history for this event.", "disclosure-note");
  } else {
    text(panel, "p", String(data?.framing || "Provider-supplied listed-price snapshots, not live inventory, availability, or final checkout totals."), "disclosure-note");
  }

  const interest = renderPriceAlertInterest(wrap?.dataset?.priceHistoryArtist, wrap?.dataset?.priceHistory);
  if (interest) panel.append(interest);
}

// One compact line above a card's provider buttons, saying exactly how many
// checked ticket sites this date leads to. "Compare" is only true of two or
// more — a single button is one site, not a comparison. No price wording: a
// missing price is a separate matter, handled by renderShowCardPriceNotes.
// Keep in sync with ctaCountLabel in functions/[[path]].js.
function showCtaCountLabel(count) {
  if (count >= 2) return `Compare ${count} checked ticket sites for this date`;
  if (count === 1) return "1 checked ticket site for this date";
  return "";
}

function renderShowCard(show, options = {}) {
  const article = document.createElement("article");
  article.className = "info-card show-card";
  const anchorId = showAnchorId(show);
  if (anchorId) article.id = anchorId;
  // Stable event id for the event_view observer. Keep in sync with
  // renderShowCardServerHtml in functions/[[path]].js.
  if (show?.id) article.dataset.eventId = String(show.id);

  const dateBadge = renderShowDateBadge(show);
  if (dateBadge) article.append(dateBadge);

  const body = document.createElement("div");
  body.className = "show-card-body";
  article.append(body);

  const location = showLocation(show);
  const titleFallback = show.city ? `Show – ${show.city}` : "Upcoming show";
  const eventName = String(show.event_name || "").trim();
  if (options.locationTitle && location) {
    // Artist boards: the city and venue are what differentiates each date, so
    // they lead; the event name adds support acts / tour info when it says
    // more than the artist name alone.
    text(body, "h3", location, "show-card-title");
    const meta = renderShowCardMeta(show);
    if (meta) body.append(meta);
    const artistName = String(options.artistName || show.artist_name || "").trim();
    if (eventName && eventName.toLowerCase() !== artistName.toLowerCase()) {
      text(body, "p", eventName, "show-card-sub muted");
    }
  } else {
    text(body, "h3", eventName || show.artist_name || titleFallback, "show-card-title");
    const meta = renderShowCardMeta(show);
    if (meta) body.append(meta);
    text(body, "p", location || "City and venue details are shown only when verified by the source.", "show-card-sub muted");
  }
  // Multi-night stands: the date badge and meta line above already show this
  // card's date, so the run line adds only what they don't — which night of
  // the stand this is. Keep in sync with runHtml in renderShowCardServerHtml.
  const venueRun = options.venueRuns?.[String(show.id || "")];
  if (venueRun) {
    article.classList.add("show-card-run-night");
    const runLine = document.createElement("p");
    runLine.className = "show-card-run";
    const chip = document.createElement("span");
    chip.className = "show-run-chip";
    chip.textContent = `Night ${venueRun.position} of ${venueRun.total}`;
    runLine.append(chip, document.createTextNode(" at this venue"));
    body.append(runLine);
  }

  if (options.reviewGated) {
    text(body, "p", "Ticket links for this artist are still being reviewed. Buy buttons appear once the destination has been checked.", "disclosure-note");
  } else if (options.showEventCta) {
    const ticketmasterUrl = safeVerifiedEventUrl(show.ticketmaster_url);
    const showId = String(show.id || "").trim();
    // Affiliate providers (SeatGeek, then Vivid Seats) render first as the
    // primary CTA; the verified Ticketmaster link renders as a plain,
    // unmonetized CTA last. Any provider renders standalone when the others
    // are unavailable.
    const tmAvailable = Boolean(ticketmasterUrl && showId && eventLinkPublishable(show));
    const sgAvailable = Boolean(showId && seatGeekOutAvailable(show, options));
    const vsAvailable = Boolean(showId && vividSeatsOutAvailable(show, options));
    const impactMarketplaceAvailable = IMPACT_MARKETPLACE_PROVIDERS.filter((provider) => showId && impactMarketplaceOutAvailable(show, provider, options));

    // One button per available provider. SeatGeek (primary affiliate) leads,
    // then Vivid Seats, the Impact marketplace lanes, and the plain
    // Ticketmaster verification link last. A provider with an approved, fresh
    // price lane shows the listed snapshot amount on its own button (the price
    // is the CTA); the rest read "Check prices". Snapshot disclosures render
    // once beneath the buttons. Keep in sync with renderShowCardServerHtml in
    // functions/[[path]].js.
    const ctaSpecs = [];
    if (sgAvailable) ctaSpecs.push({ provider: "seatgeek", name: "SeatGeek", href: eventTicketHref(show, "seatgeek"), lane: null });
    if (vsAvailable) ctaSpecs.push({ provider: "vivid-seats", name: "Vivid Seats", href: eventTicketHref(show, "vivid-seats"), lane: approvedVividSeatsPriceLane(show) });
    for (const provider of impactMarketplaceAvailable) {
      ctaSpecs.push({ provider: provider.slug, name: provider.name, href: eventTicketHref(show, provider.slug), lane: approvedImpactMarketplacePriceLane(show, provider) });
    }
    if (tmAvailable) ctaSpecs.push({ provider: "ticketmaster", name: "Ticketmaster", href: eventTicketHref(show, "ticketmaster"), lane: null });

    if (ctaSpecs.length) {
      // Normalise each approved lane into a display amount + timestamp; a lane
      // that can't be formatted falls back to an unpriced "Check prices" button.
      for (const spec of ctaSpecs) {
        if (!spec.lane) continue;
        const amount = formatProviderPrice(spec.lane.price, spec.lane.currency);
        const asOf = formatSnapshotTime(spec.lane.fetchedAt);
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
      const analyticsBase = {
        artistSlug: String(options.artistSlug || show.artist_slug || "").trim(),
        showId: String(show.id || "").trim(),
        ctaLocation: options.ctaLocation || "event_card"
      };
      // The buttons are the only outbound links on the card — there is no
      // second "compare" link to double-count a click through. One compact
      // line states how many checked ticket sites this date leads to; "compare"
      // is only used for two or more, because one site is not a comparison.
      // Keep in sync with ctaCountLabel in functions/[[path]].js.
      const countLabel = showCtaCountLabel(ctaSpecs.length);
      if (countLabel) text(body, "p", countLabel, "provider-cta-count muted");
      const ctaGroup = document.createElement("div");
      ctaGroup.className = "provider-cta-group";
      for (const spec of ctaSpecs) {
        ctaGroup.append(renderProviderCtaButton(spec.name, spec.href, spec.priceAmount || "", { ...analyticsBase, provider: spec.provider }));
      }
      body.append(ctaGroup);

      const notes = renderShowCardPriceNotes(ctaSpecs, pricesWereChecked(show));
      if (notes) body.append(notes);

      // On-site per-event price history (Phase 1): only where an approved price
      // badge already renders. Same display-eligibility gate as the badge,
      // per-provider only, snapshot-framed. Lazily fetched on open.
      if (hasApprovedMarketplacePrice(show)) {
        const historyPanel = renderPriceHistoryPanel(show, options);
        if (historyPanel) body.append(historyPanel);
      }
    } else {
      text(
        body,
        "p",
        "No checked ticket link is available for this date yet. It stays listed so the date itself is still visible.",
        "disclosure-note"
      );
    }
  } else if (show.artist_slug) {
    body.append(link("Open artist page", `/artists/${slugify(show.artist_slug)}`, "text-link"));
  }

  const copyAction = renderCopyShowLinkAction(article);
  if (copyAction) body.append(copyAction);
  return article;
}

function safeShowList(data) {
  return Array.isArray(data?.shows) ? data.shows.filter((show) => show && typeof show === "object") : [];
}

// Recent (already-passed) verified dates for an artist, most recent first.
// Same publishable gate as the upcoming board; expired dates only. Keep in
// sync with recentPastShowsForArtist in functions/[[path]].js.
function recentPastShowsForArtist(events, artistSlug, limit = 3) {
  const now = Date.now();
  const slug = slugify(artistSlug);
  return (Array.isArray(events) ? events : [])
    .filter((ev) => ev && typeof ev === "object" && slugify(ev.artist_slug) === slug)
    .map((ev) => ({
      id: String(ev.id || "").trim(),
      dateTimeISO: String(ev.dateTimeISO || ev.datetime_iso || "").trim(),
      city: String(ev.city || "").trim(),
      venue: String(ev.venue || "").trim(),
      publishable: eventLinkPublishable(ev)
    }))
    .filter((show) => show.dateTimeISO && Number.isFinite(Date.parse(show.dateTimeISO)))
    .filter((show) => Date.parse(show.dateTimeISO) < now && show.publishable && show.venue && show.city)
    .sort((a, b) => Date.parse(b.dateTimeISO) - Date.parse(a.dateTimeISO))
    .slice(0, limit);
}

// Factual "recent shows" list for the empty board — passed dates only, no CTAs
// or prices. Keep in sync with renderRecentShowsHtml in functions/[[path]].js.
function renderRecentShowsList(name, pastShows) {
  if (!Array.isArray(pastShows) || !pastShows.length) return null;
  const block = document.createElement("div");
  block.className = "recent-shows";
  text(block, "h4", `Recent ${name} shows`);
  text(
    block,
    "p",
    `These ${name} dates have already taken place. They are shown as a reference while we verify any newly announced run.`,
    "muted"
  );
  const list = document.createElement("ul");
  list.className = "recent-shows-list";
  for (const show of pastShows) {
    const item = document.createElement("li");
    const time = document.createElement("time");
    time.setAttribute("datetime", show.dateTimeISO || "");
    time.textContent = formatShowDate(show.dateTimeISO, show.timezone) || "Recent date";
    item.append(time);
    const place = [show.venue, show.city].filter(Boolean).join(", ");
    if (place) item.append(document.createTextNode(` — ${place}`));
    list.append(item);
  }
  block.append(list);
  return block;
}

// Zero-event board state. The primary CTA is the artist-level page of the
// highest-ranked enabled provider (never an event-level ticket link — no
// verified dates exist to sell). Keep in sync with
// renderShowBoardEmptyStateHtml in functions/[[path]].js.
function renderShowBoardEmptyState(artistName = "", artistSlug = "", pastShows = []) {
  const name = String(artistName || "").trim() || "artist";
  const wrap = document.createElement("div");
  wrap.className = "empty-state";
  text(wrap, "h3", "No upcoming dates listed");
  text(
    wrap,
    "p",
    Array.isArray(pastShows) && pastShows.length
      ? `We have no verified upcoming ${name} dates on file. The most recent dates we tracked have already taken place, and we can't say whether more are coming.`
      : `We have no verified upcoming ${name} dates on file, and we can't say whether more are coming.`
  );
  text(
    wrap,
    "p",
    "When a date is confirmed by our source and we've followed the ticket link to that exact event, it appears on this page with the ticket sites that cover it.",
    "muted"
  );
  const recent = renderRecentShowsList(name, pastShows);
  if (recent) wrap.append(recent);
  const providerLink = artistSlug
    ? ticketLinksForArtist(artistSlug)
        .filter((item) => providerEnabled(slugify(item.provider)))
        .sort((a, b) => providerDisplayRank(slugify(a.provider)) - providerDisplayRank(slugify(b.provider)))[0]
    : null;
  // Watchlist signup instead of empty ticket buttons; posts to /api/signup via
  // the delegated submit handler below. Keep in sync with
  // renderShowBoardEmptyStateHtml in functions/[[path]].js.
  if (artistSlug) {
    const form = document.createElement("form");
    form.className = "watchlist-signup";
    // Works without JS: native form POST to /api/signup (which answers with an
    // HTML confirmation). With JS, the delegated submit handler intercepts and
    // posts JSON for inline status instead. Keep in sync with
    // renderShowBoardEmptyStateHtml in functions/[[path]].js.
    form.method = "post";
    form.action = "/api/signup";
    form.dataset.watchlistShell = artistSlug;
    text(form, "h4", `Get told when ${name} dates land`);
    text(form, "p", `Leave your email and we'll email you once we've published confirmed ${name} dates with checked ticket links. Nothing else.`, "muted");
    const hiddenArtist = document.createElement("input");
    hiddenArtist.type = "hidden";
    hiddenArtist.name = "artistSlug";
    hiddenArtist.value = artistSlug;
    const hiddenSource = document.createElement("input");
    hiddenSource.type = "hidden";
    hiddenSource.name = "sourcePath";
    hiddenSource.value = window.location.pathname;
    const row = document.createElement("div");
    row.className = "watchlist-signup-row";
    const label = document.createElement("label");
    label.className = "sr-only";
    label.setAttribute("for", `watchlist-email-${artistSlug}`);
    label.textContent = "Email address";
    const email = document.createElement("input");
    email.type = "email";
    email.id = `watchlist-email-${artistSlug}`;
    email.name = "email";
    email.required = true;
    email.placeholder = "Your email address";
    email.autocomplete = "email";
    const honeypot = document.createElement("input");
    honeypot.className = "hp-field";
    honeypot.type = "text";
    honeypot.name = "website";
    honeypot.tabIndex = -1;
    honeypot.autocomplete = "off";
    honeypot.setAttribute("aria-hidden", "true");
    const submit = document.createElement("button");
    submit.className = "button button-primary";
    submit.type = "submit";
    submit.textContent = "Notify me";
    row.append(email, honeypot, submit);
    form.append(label, hiddenArtist, hiddenSource, row);
    const status = text(form, "p", "", "disclosure-note");
    status.setAttribute("data-signup-status", "");
    status.setAttribute("aria-live", "polite");
    wrap.append(form);
  }
  const actions = document.createElement("div");
  actions.className = "action-row";
  if (providerLink) {
    const providerSlug = slugify(providerLink.provider);
    const providerName = (providerCopy[providerSlug] || {}).name || providerLink.provider;
    const params = new URLSearchParams({
      artistSlug,
      provider: providerSlug,
      sourcePath: window.location.pathname,
      surface: "artist_page"
    });
    // Secondary: on an empty board the signup is the primary action, and the
    // artist-level provider page is a "check for yourself" fallback.
    const providerCta = buttonLink(`Check ${providerName} for updates`, withCtaLocation(`/api/out?${params.toString()}`, "empty_state"), "secondary");
    providerCta.dataset.ctaProvider = providerSlug;
    providerCta.dataset.ctaArtist = artistSlug;
    providerCta.dataset.ctaPriceSnapshot = "absent";
    providerCta.dataset.ctaLocation = "empty_state";
    actions.append(providerCta);
  } else {
    actions.append(buttonLink("Read ticket buying guide", "/guides/how-to-compare-concert-ticket-prices", "secondary"));
  }
  actions.append(buttonLink("Browse artists", "/artists", "secondary"));
  wrap.append(actions);
  return wrap;
}

// Multi-night runs: shows sharing a venue and city on an artist board get a
// "Show X of Y at this venue" line so multi-night stands are distinguishable.
// Derived purely from the verified rows already being rendered — no event fact
// is inferred. Keep in sync with venueRunIndex in functions/[[path]].js.
function venueRunIndex(shows) {
  const groups = new Map();
  const sorted = [...shows]
    .filter((show) => show?.id)
    .sort((a, b) => {
      const ta = Date.parse(a.dateTimeISO || a.datetime_iso || "");
      const tb = Date.parse(b.dateTimeISO || b.datetime_iso || "");
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

// A month-by-month jump list for long boards. The server renders the same list
// so it works with JavaScript off; here it is rebuilt whenever filtering
// changes which cards exist, so every entry always targets a card on the page.
// Keep in sync with monthJumpEntries / renderShowBoardJumpHtml in
// functions/[[path]].js.
const SHOW_BOARD_JUMP_THRESHOLD = 8;

function monthJumpEntries(shows) {
  const months = new Map();
  for (const show of Array.isArray(shows) ? shows : []) {
    const parts = venueDateParts(show?.dateTimeISO, show?.timezone);
    const anchorId = showAnchorId(show);
    if (!parts || !anchorId) continue;
    let label = "";
    try {
      label = parts.date.toLocaleDateString("en-US", { month: "short", year: "numeric", timeZone: parts.timeZone });
    } catch (error) {
      continue;
    }
    if (!label) continue;
    if (!months.has(label)) months.set(label, { label, anchorId, count: 0 });
    months.get(label).count += 1;
  }
  return [...months.values()];
}

function renderShowBoardJump(shows) {
  if (!Array.isArray(shows) || shows.length < SHOW_BOARD_JUMP_THRESHOLD) return null;
  const months = monthJumpEntries(shows);
  if (months.length < 2) return null;
  const nav = document.createElement("nav");
  nav.className = "show-board-jump";
  nav.setAttribute("aria-label", "Jump to a month");
  text(nav, "p", "Jump to:", "muted");
  const list = document.createElement("ul");
  list.className = "show-board-jump-list";
  months.forEach((month) => {
    const item = document.createElement("li");
    const anchor = link(month.label, `#${month.anchorId}`, "mini-link");
    const count = document.createElement("span");
    count.className = "muted";
    count.textContent = ` (${month.count})`;
    anchor.append(count);
    item.append(anchor);
    list.append(item);
  });
  nav.append(list);
  return nav;
}

function showFilterHaystack(show) {
  return [show.city, show.country, show.venue, show.event_name, show.tour_name]
    .map((value) => String(value || "").toLowerCase())
    .join(" ");
}

function uniqueShowValues(shows, key) {
  return [...new Set(shows.map((show) => String(show?.[key] || "").trim()).filter(Boolean))].sort((a, b) =>
    a.localeCompare(b)
  );
}

function renderShowFilterEmptyState(onReset) {
  const wrap = document.createElement("div");
  wrap.className = "empty-state";
  text(wrap, "h3", "No matching verified shows for this search.");
  text(
    wrap,
    "p",
    "Try a different city, venue, or tour name, or clear the filters to see every verified date.",
    "muted"
  );
  const reset = document.createElement("button");
  reset.type = "button";
  reset.className = "show-filter-reset";
  reset.textContent = "Clear filters";
  reset.addEventListener("click", onReset);
  const actions = document.createElement("div");
  actions.className = "action-row";
  actions.append(
    reset,
    buttonLink("Browse artists", "/artists", "secondary"),
    buttonLink("Read ticket buying guide", "/guides/how-to-compare-concert-ticket-prices", "secondary")
  );
  wrap.append(actions);
  return wrap;
}

// Filters only decide which verified shows render; every card still goes through
// renderShowCard with unchanged options, so CTA eligibility is untouched.
function setupShowBoardFilters(section, grid, shows, cardOptions) {
  const countries = uniqueShowValues(shows, "country");
  const cities = uniqueShowValues(shows, "city");
  const initialParams = new URLSearchParams(window.location.search);
  const initialCountry = String(initialParams.get("country") || "").trim();
  const initialCity = String(initialParams.get("city") || "").trim();
  const state = {
    query: String(initialParams.get("showQuery") || "").trim(),
    country: countries.includes(initialCountry) ? initialCountry : "",
    city: cities.includes(initialCity) ? initialCity : "",
    sort: "soonest"
  };

  if (state.country && state.city) {
    const cityMatchesCountry = shows.some(
      (show) => String(show?.country || "").trim() === state.country && String(show?.city || "").trim() === state.city
    );
    if (!cityMatchesCountry) state.city = "";
  }

  const bar = document.createElement("div");
  bar.className = "show-filter-bar";

  const count = document.createElement("p");
  count.className = "muted show-filter-count";
  count.setAttribute("role", "status");

  const setSelectOptions = (select, values, allLabel, selected) => {
    select.replaceChildren();
    const all = document.createElement("option");
    all.value = "";
    all.textContent = allLabel;
    select.append(all);
    values.forEach((value) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      select.append(option);
    });
    select.value = selected;
  };

  const searchInput = document.createElement("input");
  searchInput.type = "search";
  searchInput.className = "show-filter-input";
  searchInput.placeholder = "Search by city, venue, or tour";
  searchInput.setAttribute("aria-label", "Search verified shows by city, country, venue, event, or tour name");
  searchInput.value = state.query;

  let countrySelect = null;
  if (countries.length > 1) {
    countrySelect = document.createElement("select");
    countrySelect.className = "show-filter-select";
    countrySelect.setAttribute("aria-label", "Filter by country");
    setSelectOptions(countrySelect, countries, "All countries", state.country);
  }

  let citySelect = null;
  if (cities.length > 1) {
    citySelect = document.createElement("select");
    citySelect.className = "show-filter-select";
    citySelect.setAttribute("aria-label", "Filter by city");
    setSelectOptions(citySelect, cities, "All cities", state.city);
  }

  const sortSelect = document.createElement("select");
  sortSelect.className = "show-filter-select";
  sortSelect.setAttribute("aria-label", "Sort by date");
  [["soonest", "Soonest first"], ["latest", "Latest first"]].forEach(([value, label]) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = label;
    sortSelect.append(option);
  });

  const resetButton = document.createElement("button");
  resetButton.type = "button";
  resetButton.className = "show-filter-reset";
  resetButton.textContent = "Clear filters";

  const shareButton = document.createElement("button");
  shareButton.type = "button";
  shareButton.className = "show-filter-reset";
  shareButton.textContent = "Copy filtered view";

  const refreshCityOptions = () => {
    if (!citySelect) return;
    const source = state.country
      ? shows.filter((show) => String(show?.country || "").trim() === state.country)
      : shows;
    const values = uniqueShowValues(source, "city");
    if (state.city && !values.includes(state.city)) state.city = "";
    setSelectOptions(citySelect, values, "All cities", state.city);
  };

  const updateUrl = () => {
    const url = new URL(window.location.href);
    [["showQuery", state.query], ["country", state.country], ["city", state.city]].forEach(([key, value]) => {
      const clean = String(value || "").trim();
      if (clean) url.searchParams.set(key, clean);
      else url.searchParams.delete(key);
    });
    history.replaceState(history.state, "", `${url.pathname}${url.search}${url.hash}`);
  };

  let priceHydrationTimer = null;
  const schedulePriceHydration = (visibleShows) => {
    if (cardOptions.reviewGated) return;
    if (priceHydrationTimer) window.clearTimeout(priceHydrationTimer);
    priceHydrationTimer = window.setTimeout(() => {
      hydrateShowBoardPriceSnapshots(visibleShows, cardOptions);
    }, 250);
  };

  // The jump nav is rebuilt from the currently visible cards, so a filtered
  // board never offers a month anchor that no longer exists on the page.
  let jumpNav = null;
  const refreshJumpNav = (visibleShows) => {
    const next = renderShowBoardJump(visibleShows);
    if (jumpNav && !next) {
      jumpNav.remove();
      jumpNav = null;
      return;
    }
    if (!next) return;
    if (jumpNav) jumpNav.replaceWith(next);
    else grid.before(next);
    jumpNav = next;
  };

  // Filter-use analytics. Debounced so a typed query reports once, and it
  // reports which control was used and how many dates survived — never the
  // query text itself.
  let filterAnalyticsTimer = null;
  const reportFilterUse = (control, visibleCount) => {
    if (filterAnalyticsTimer) window.clearTimeout(filterAnalyticsTimer);
    filterAnalyticsTimer = window.setTimeout(() => {
      sendAnalytics("show_filter", {
        artistSlug: String(cardOptions.artistSlug || ""),
        control,
        hasQuery: state.query ? "yes" : "no",
        country: state.country,
        city: state.city,
        sort: state.sort,
        visibleCount,
        totalCount: shows.length
      });
    }, 600);
  };

  const apply = (control = "") => {
    updateUrl();
    const terms = state.query.toLowerCase().split(/\s+/).filter(Boolean);
    const visible = shows
      .filter((show) => {
        if (state.country && String(show?.country || "").trim() !== state.country) return false;
        if (state.city && String(show?.city || "").trim() !== state.city) return false;
        if (terms.length) {
          const haystack = showFilterHaystack(show);
          if (!terms.every((term) => haystack.includes(term))) return false;
        }
        return true;
      })
      .sort((a, b) => {
        const diff = Date.parse(a.dateTimeISO) - Date.parse(b.dateTimeISO);
        return state.sort === "latest" ? -diff : diff;
      });
    const datesLabel = cardOptions.reviewGated ? "listed dates" : "verified dates";
    count.textContent = `Showing ${visible.length} of ${shows.length} ${datesLabel}`;
    if (control) reportFilterUse(control, visible.length);
    if (!visible.length) {
      refreshJumpNav([]);
      grid.replaceChildren(renderShowFilterEmptyState(resetFilters));
      return;
    }
    refreshJumpNav(visible);
    grid.replaceChildren(...visible.map((show) => renderShowCard(show, cardOptions)));
    schedulePriceHydration(visible);
  };

  function resetFilters() {
    state.query = "";
    state.country = "";
    state.city = "";
    state.sort = "soonest";
    searchInput.value = "";
    if (countrySelect) countrySelect.value = "";
    sortSelect.value = "soonest";
    refreshCityOptions();
    apply("reset");
  }

  searchInput.addEventListener("input", () => {
    state.query = searchInput.value.trim();
    apply("search");
  });
  if (countrySelect) {
    countrySelect.addEventListener("change", () => {
      state.country = countrySelect.value;
      refreshCityOptions();
      apply("country");
    });
  }
  if (citySelect) {
    citySelect.addEventListener("change", () => {
      state.city = citySelect.value;
      apply("city");
    });
  }
  sortSelect.addEventListener("change", () => {
    state.sort = sortSelect.value;
    apply("sort");
  });
  resetButton.addEventListener("click", resetFilters);
  shareButton.addEventListener("click", async () => {
    updateUrl();
    try {
      await navigator.clipboard.writeText(window.location.href);
      shareButton.textContent = "Copied filtered view";
      window.setTimeout(() => {
        shareButton.textContent = "Copy filtered view";
      }, 2000);
    } catch (error) {
      shareButton.textContent = "Copy failed";
      window.setTimeout(() => {
        shareButton.textContent = "Copy filtered view";
      }, 2000);
    }
  });

  if (shows.length > 1) {
    const filterIntro = document.createElement("div");
    filterIntro.className = "show-filter-intro";
    text(filterIntro, "h3", "Find your date");
    text(filterIntro, "p", "Jump to a month below, or search and filter by city, country, venue, or tour.", "muted");
    bar.append(searchInput, ...(countrySelect ? [countrySelect] : []), ...(citySelect ? [citySelect] : []), sortSelect, resetButton, shareButton);
    grid.before(filterIntro, bar);
  }
  grid.before(count);
  refreshCityOptions();
  apply();
}


async function hydrateCurrentShowPriceSnapshot(shows, cardOptions) {
  const hash = String(window.location.hash || "").replace(/^#/, "");
  if (!hash) return;
  const show = shows.find((candidate) => showAnchorId(candidate) === hash);
  if (!show?.id || (!seatGeekOutAvailable(show, cardOptions) && !vividSeatsOutAvailable(show, cardOptions) && !IMPACT_MARKETPLACE_PROVIDERS.some((provider) => impactMarketplaceOutAvailable(show, provider, cardOptions)))) return;
  try {
    const params = new URLSearchParams({
      showId: String(show.id),
      includePrices: "true",
      priceProviders: "approved-marketplaces"
    });
    const response = await fetch(`/api/shows?${params.toString()}`, { headers: { Accept: "application/json" } });
    if (!response.ok) return;
    const data = await response.json();
    const pricedShow = safeShowList(data).find((candidate) => String(candidate?.id || "") === String(show.id));
    if (!hasApprovedMarketplacePrice(pricedShow)) return;
    const currentCard = document.getElementById(hash);
    if (!currentCard) return;
    currentCard.replaceWith(renderShowCard(pricedShow, {
      ...cardOptions,
      seatGeekAvailable: Boolean(data?.providerAvailability?.seatgeek),
      vividSeatsAvailable: Boolean(data?.providerAvailability?.vividseats),
      impactMarketplaceAvailability: Object.fromEntries(IMPACT_MARKETPLACE_PROVIDERS.map((provider) => [provider.slug, Boolean(data?.providerAvailability?.[provider.slug])]))
    }));
  } catch (error) {
    // Price snapshots are optional progressive enhancement; keep the verified CTA card unchanged.
  }
}

// One approved-marketplaces bulk request per board (cache-only lanes served
// from the D1 snapshot cache — no provider fan-out), memoized per artist so
// filter/sort re-renders reuse the same priced payload instead of refetching.
const approvedBoardPricePromises = new Map();
function fetchApprovedBoardPrices(artistSlug, limit) {
  const key = `${artistSlug || "*"}:${limit}`;
  if (!approvedBoardPricePromises.has(key)) {
    const task = (async () => {
      const params = new URLSearchParams({
        includePrices: "true",
        priceProviders: "approved-marketplaces",
        limit: String(limit)
      });
      if (artistSlug) params.set("artistSlug", artistSlug);
      const response = await fetch(`/api/shows?${params.toString()}`, { headers: { Accept: "application/json" } });
      if (!response.ok) throw new Error("board_prices_unavailable");
      return response.json();
    })();
    task.catch(() => approvedBoardPricePromises.delete(key));
    approvedBoardPricePromises.set(key, task);
  }
  return approvedBoardPricePromises.get(key);
}

async function hydrateShowBoardPriceSnapshots(shows, cardOptions) {
  const candidates = shows.filter((show) => {
    if (!show?.id) return false;
    return seatGeekOutAvailable(show, cardOptions) || vividSeatsOutAvailable(show, cardOptions) || IMPACT_MARKETPLACE_PROVIDERS.some((provider) => impactMarketplaceOutAvailable(show, provider, cardOptions));
  });
  if (!candidates.length) return;

  try {
    const artistSlug = String(cardOptions.artistSlug || "").trim();
    const limit = artistSlug ? 500 : Math.min(500, Math.max(candidates.length, shows.length));
    const data = await fetchApprovedBoardPrices(artistSlug, limit);
    const pricedById = new Map(
      safeShowList(data).map((candidate) => [String(candidate?.id || ""), candidate])
    );
    for (const show of candidates) {
      const anchorId = showAnchorId(show);
      if (!anchorId) continue;
      const pricedShow = pricedById.get(String(show.id));
      if (!pricedShow) continue;
      if (!hasApprovedMarketplacePrice(pricedShow)) continue;

      const currentCard = document.getElementById(anchorId);
      if (!currentCard) continue;
      currentCard.replaceWith(renderShowCard(pricedShow, {
        ...cardOptions,
        seatGeekAvailable: Boolean(data?.providerAvailability?.seatgeek),
        vividSeatsAvailable: Boolean(data?.providerAvailability?.vividseats),
        impactMarketplaceAvailability: Object.fromEntries(IMPACT_MARKETPLACE_PROVIDERS.map((provider) => [provider.slug, Boolean(data?.providerAvailability?.[provider.slug])]))
      }));
    }
  } catch (error) {
    // Retain the verified CTA-only cards when optional price hydration fails.
  }
}

async function hydrateComparisonHubPriceSnapshots() {
  const cards = Array.from(document.querySelectorAll("[data-comparison-show-id]")).slice(0, 6);
  if (!cards.length) return;

  await Promise.all(cards.map(async (card) => {
    const showId = String(card.getAttribute("data-comparison-show-id") || "").trim();
    if (!showId) return;

    try {
      const params = new URLSearchParams({
        showId,
        includePrices: "true",
        priceProviders: "approved-marketplaces"
      });
      const response = await fetch(`/api/shows?${params.toString()}`, { headers: { Accept: "application/json" } });
      if (!response.ok) return;
      const data = await response.json();
      const pricedShow = safeShowList(data).find((show) => String(show?.id || "") === showId);
      if (!pricedShow) return;

      const replacement = renderShowCard(pricedShow, {
        showEventCta: true,
        seatGeekAvailable: Boolean(data?.providerAvailability?.seatgeek),
        vividSeatsAvailable: Boolean(data?.providerAvailability?.vividseats),
        impactMarketplaceAvailability: Object.fromEntries(IMPACT_MARKETPLACE_PROVIDERS.map((provider) => [provider.slug, Boolean(data?.providerAvailability?.[provider.slug])]))
      });
      replacement.setAttribute("data-comparison-show-id", showId);
      card.replaceWith(replacement);
    } catch (error) {
      // Keep the server-rendered checked event card if price hydration fails.
    }
  }));
}

async function fetchShowBoardData(params, fetchAllArtistPages = false) {
  const requestPage = async (pageParams) => {
    const response = await fetch(`/api/shows?${pageParams.toString()}`, { headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error("shows_unavailable");
    return response.json();
  };

  const firstPage = await requestPage(params);
  const firstShows = safeShowList(firstPage);
  const total = Number(firstPage?.pagination?.total);
  if (!fetchAllArtistPages || !Number.isFinite(total) || total <= firstShows.length) return firstPage;

  const allShows = [...firstShows];
  while (allShows.length < total) {
    const pageParams = new URLSearchParams(params);
    pageParams.set("offset", String(allShows.length));
    const page = await requestPage(pageParams);
    const pageShows = safeShowList(page);
    if (!pageShows.length) break;
    allShows.push(...pageShows);
  }

  return {
    ...firstPage,
    shows: allShows,
    pagination: { ...(firstPage.pagination || {}), total, returned: allShows.length }
  };
}

// Empty board state enriched with the artist's recent (passed) dates. The
// per-artist partition keeps this a small, cache-friendly fetch; any failure
// falls back to the plain empty state.
async function buildEmptyBoardState(filters) {
  let pastShows = [];
  if (filters.artistSlug) {
    try {
      pastShows = recentPastShowsForArtist(await loadArtistPartition(filters.artistSlug), filters.artistSlug, 3);
    } catch (error) {
      pastShows = [];
    }
  }
  return renderShowBoardEmptyState(filters.artistName, filters.artistSlug, pastShows);
}

async function hydrateShowBoard(section, filters = {}) {
  const grid = section.querySelector("[data-show-grid]");
  if (!grid) return;
  const limit = Math.max(1, Math.min(500, Number(filters.limit) || 6));
  const params = new URLSearchParams({ limit: String(limit) });
  if (filters.artistSlug) params.set("artistSlug", filters.artistSlug);

  try {
    const data = await fetchShowBoardData(params, Boolean(filters.artistSlug));
    const shows = safeShowList(data);
    if (!shows.length) {
      grid.replaceChildren(await buildEmptyBoardState(filters));
      return;
    }
    const cardOptions = {
      showEventCta: Boolean(filters.showEventCta) && !filters.reviewGated,
      reviewGated: Boolean(filters.reviewGated),
      seatGeekAvailable: Boolean(data?.providerAvailability?.seatgeek),
      vividSeatsAvailable: Boolean(data?.providerAvailability?.vividseats),
      impactMarketplaceAvailability: Object.fromEntries(IMPACT_MARKETPLACE_PROVIDERS.map((provider) => [provider.slug, Boolean(data?.providerAvailability?.[provider.slug])])),
      // Artist boards lead each card with city · venue; the artist name is
      // already the page heading.
      locationTitle: Boolean(filters.artistSlug),
      artistName: String(filters.artistName || ""),
      // Lets price hydration request one bulk approved-marketplaces payload
      // for the whole board instead of per-card lookups.
      artistSlug: String(filters.artistSlug || ""),
      // Full-board multi-night numbering stays stable across filter re-renders.
      venueRuns: filters.artistSlug ? venueRunIndex(shows) : {}
    };
    if (filters.filterable) {
      setupShowBoardFilters(section, grid, shows, cardOptions);
      window.addEventListener("hashchange", () => hydrateCurrentShowPriceSnapshot(shows, cardOptions));
      return;
    }
    grid.replaceChildren(...shows.slice(0, limit).map((show) => renderShowCard(show, cardOptions)));
    await hydrateShowBoardPriceSnapshots(shows.slice(0, limit), cardOptions);
  } catch (error) {
    // The show API adds provider availability and optional live price data, but
    // a transient API failure must never erase already-published ticket access.
    // Fall back to the public event feed and retain the same verified CTA gates.
    const now = Date.now();
    const artistSlug = slugify(filters.artistSlug || "");
    const fallbackShows = sortEventsForSearch(await loadEventsForSearch())
      .filter((show) => {
        if (!show || (artistSlug && slugify(show.artist_slug) !== artistSlug)) return false;
        const eventTime = Date.parse(show.datetime_iso || show.dateTimeISO || "");
        return Number.isFinite(eventTime) && eventTime >= now && eventLinkPublishable(show);
      });
    const displayedFallbackShows = artistSlug ? fallbackShows : fallbackShows.slice(0, limit);
    if (!displayedFallbackShows.length) {
      grid.replaceChildren(await buildEmptyBoardState(filters));
      return;
    }

    const fallbackCardOptions = {
      showEventCta: Boolean(filters.showEventCta) && !filters.reviewGated,
      reviewGated: Boolean(filters.reviewGated),
      seatGeekAvailable: providerEnabled("seatgeek"),
      vividSeatsAvailable: providerEnabled("vivid-seats"),
      impactMarketplaceAvailability: Object.fromEntries(
        IMPACT_MARKETPLACE_PROVIDERS.map((provider) => [provider.slug, providerEnabled(provider.slug)])
      ),
      locationTitle: Boolean(filters.artistSlug),
      artistName: String(filters.artistName || ""),
      artistSlug: String(filters.artistSlug || ""),
      venueRuns: filters.artistSlug ? venueRunIndex(displayedFallbackShows) : {}
    };
    grid.replaceChildren(...displayedFallbackShows.map((show) => renderShowCard(show, fallbackCardOptions)));
    await hydrateShowBoardPriceSnapshots(displayedFallbackShows, fallbackCardOptions);
  }
}

function renderGuidePreview() {
  const section = document.createElement("section");
  section.className = "section-grid";
  section.setAttribute("aria-labelledby", "guideTitle");
  const header = document.createElement("div");
  header.className = "section-intro";
  text(header, "h2", "Buying guides").id = "guideTitle";
  text(header, "p", "Practical guides for checking final totals, understanding resale terms, avoiding risky listings, and knowing what to confirm before checkout.");
  const grid = document.createElement("div");
  grid.className = "card-grid guide-grid";
  guidePages.slice(0, 6).forEach((guide) => {
    grid.append(renderInfoCard(guide.h1, guide.description, link("Read guide", `/guides/${guide.slug}`, "text-link")));
  });
  const actions = document.createElement("div");
  actions.className = "action-row";
  actions.append(buttonLink("View all guides", "/guides", "secondary"));
  section.append(header, grid, actions);
  return section;
}

async function renderArtistsIndex() {
  setMeta(routeMeta["/artists"], false);
  // The function route fully renders this index. Preserve it on initial load
  // rather than rebuilding identical markup, which caused a visible re-render
  // flash. The client renderer remains a fallback for an un-injected shell.
  if (document.getElementById("artistsTitle")) return;
  const section = document.createElement("section");
  section.className = "content-page";
  section.setAttribute("aria-labelledby", "artistsTitle");
  section.append(renderBreadcrumb([{ label: "Home", href: "/" }, { label: "Artists" }]));
  text(section, "h1", "Artists we track").id = "artistsTitle";
  text(section, "p", ARTISTS_INDEX_LEAD, "lead");
  text(section, "p", ARTISTS_INDEX_NOTE, "disclosure-note");
  const events = await loadEventsForSearch();
  const states = artistsByUpcomingState(catalog.artists, events);
  const primary = document.createElement("section");
  primary.className = "artist-status-section";
  text(primary, "h2", "Artists with upcoming dates");
  const primaryGrid = document.createElement("div");
  primaryGrid.className = "artist-card-grid";
  states.primary.forEach(({ artist, status }) => primaryGrid.append(renderArtistCard(artist, events, status)));
  primary.append(states.primary.length ? primaryGrid : text(primary, "p", "No future dates are currently listed.", "muted"));
  section.append(renderArtistStatusLegend(), primary);
  if (states.secondary.length) {
    const secondary = document.createElement("section");
    secondary.className = "artist-status-section artist-status-section--secondary";
    text(secondary, "h2", "No dates currently listed");
    text(secondary, "p", "These artist pages remain available and move back to the primary section automatically when a future date is added.");
    const secondaryGrid = document.createElement("div");
    secondaryGrid.className = "artist-card-grid";
    states.secondary.forEach(({ artist, status }) => secondaryGrid.append(renderArtistCard(artist, events, status)));
    secondary.append(secondaryGrid);
    section.append(secondary);
  }
  main.replaceChildren(section);
}

function renderArtist(artist) {
  const isReviewRequired = artist.indexing_status !== "indexable_with_substantial_content";
  // The server picks the description from the board: an empty board gets one
  // that does not promise dates the page does not have. Read that decision off
  // the server-rendered DOM (still in place at this point) rather than
  // recomputing it, so hydration cannot put the authored, date-promising
  // description back on a page with no dates — including og:/twitter:.
  const hasServerDates = main.querySelectorAll("article.show-card[data-show-json]").length > 0;
  const serverDescription = document.querySelector('meta[name="description"]')?.getAttribute("content") || "";
  // Artist-page indexability is editorial. Future-date availability controls
  // the board and the index sections, but an empty artist page remains a valid
  // indexable destination with a truthful empty state.
  const shouldNoindex = isReviewRequired;
  setMeta(
    {
      title: artist.seo_title || `${artist.name} Tickets | Options & Availability`,
      description: hasServerDates
        ? artist.meta_description ||
          `Check ${artist.name} ticket options through verified provider links, with practical buying guidance and clear transparency.`
        : serverDescription ||
          `No verified upcoming ${artist.name} dates are listed right now. See what we check before a date is published, and get told when new ones land.`
    },
    shouldNoindex
  );

  const section = document.createElement("section");
  section.className = "content-page artist-page";
  section.setAttribute("aria-labelledby", "artistTitle");
  section.append(renderBreadcrumb([{ label: "Home", href: "/" }, { label: "Artists", href: "/artists" }, { label: artist.name }]));
  // The lead block (heading, data-grounded intro, fact strip) is derived from
  // the board on the server; transplant it rather than recomputing copy the
  // client cannot derive without the same annotated show data.
  const serverLead = transplantServerNode("[data-artist-lead]");
  if (serverLead) {
    section.append(serverLead);
  } else {
    text(section, "h1", artistPageHeading(artist, hasServerDates)).id = "artistTitle";
  }
  if (isReviewRequired) {
    const reviewNotice = document.createElement("section");
    reviewNotice.className = "nested-panel review-notice";
    text(reviewNotice, "p", "We're still checking this artist's ticket links. The dates are here for reference in the meantime.", "disclosure-note");
    section.append(reviewNotice);
  }
  const serverShows = Array.from(main.querySelectorAll("article.show-card[data-show-json]")).map((card) => {
    try {
      return JSON.parse(card.getAttribute("data-show-json") || "{}");
    } catch (error) {
      return {};
    }
  });
  // Keep this intro in sync with renderShowBoardServerHtml in functions/[[path]].js.
  const showBoard = renderShowBoardShell(
    "artistShowBoard",
    "Upcoming dates",
    serverShows.length
      ? "Each date below comes from a reviewed source record. Pick yours, then compare the ticket sites that cover it."
      : "Dates appear here once a source record confirms them and we've followed the ticket link.",
    "Some links earn us a commission — this never affects your price."
  );
  // Shared price/link help and the provenance block are both server-rendered
  // once from the shared content model; transplant, never rebuild.
  const ticketHelp = transplantServerNode("[data-artist-ticket-help]");
  const verificationPanel = transplantServerNode("[data-artist-trust]");
  const providerPanel = serverShows.length ? renderProviderButtons(artist, "artist_page") : null;
  // Dates and provider options first; help and provenance after them. An empty
  // board stays concise and does not surface date-specific provider or
  // last-checked claims.
  if (serverShows.length) {
    section.append(showBoard, providerPanel, ...(ticketHelp ? [ticketHelp] : []), ...(verificationPanel ? [verificationPanel] : []));
  } else {
    section.append(showBoard);
  }

  const summary = document.createElement("section");
  summary.className = isReviewRequired ? "split-section split-section-single" : "split-section";
  const left = document.createElement("div");
  text(left, "h2", `About ${artist.name}`);
  text(left, "p", artist.factual_summary);
  summary.append(left);
  // Mirrors the server gate: the links note describes provider buttons that a
  // review_required artist does not render.
  if (!isReviewRequired) {
    const right = document.createElement("div");
    text(right, "h2", "About these links");
    text(right, "p", artist.ticket_buying_notes);
    summary.append(right);
  }

  let relatedGuides = null;
  const relatedGuidePages = (Array.isArray(artist.related_guides) ? artist.related_guides : [])
    .slice(0, 4)
    .map((slug) => guidePages.find((guide) => guide.slug === slug))
    .filter(Boolean);
  if (relatedGuidePages.length) {
    relatedGuides = document.createElement("section");
    relatedGuides.className = "nested-panel";
    text(relatedGuides, "h2", "Related guides");
    text(relatedGuides, "p", "How to compare prices, tell primary from resale, spot a scam, and pick your moment:");
    const relatedList = document.createElement("ul");
    relatedList.className = "guide-link-list";
    relatedGuidePages.forEach((guide) => {
      const item = document.createElement("li");
      item.append(link(guide.h1, `/guides/${guide.slug}`));
      relatedList.append(item);
    });
    relatedGuides.append(relatedList);
  }

  // The derived, data-driven content block (tour summaries and the consolidated
  // location links) is server-rendered inside a single
  // [data-artist-extra-content] container by functions/[[path]].js. We
  // transplant that node unchanged rather than rebuilding it here, so the
  // hydrated page keeps exact parity with the server-rendered SEO content.
  const extraContent = transplantServerNode("[data-artist-extra-content]");

  const usefulLinks = document.createElement("section");
  usefulLinks.className = "nested-panel";
  text(usefulLinks, "h2", "Useful links");
  const usefulGrid = document.createElement("div");
  usefulGrid.className = "mini-link-grid";
  usefulGrid.append(
    link("Compare concert ticket prices", "/compare-concert-ticket-prices", "mini-link"),
    link("All artists", "/artists", "mini-link"),
    link("Ticket buying guides", "/guides", "mini-link"),
    link("How it works", "/how-it-works", "mini-link"),
    link("Affiliate disclosure", "/affiliate-disclosure", "mini-link")
  );
  usefulLinks.append(usefulGrid);

  // The FAQ is data-grounded (its first answer counts this page's own dates)
  // and is also the FAQPage JSON-LD source, so it is transplanted from the
  // server render rather than rebuilt from a second copy of the questions.
  const serverFaq = transplantServerNode("[data-artist-faq]");
  section.append(
    summary,
    ...(extraContent ? [extraContent] : []),
    ...(relatedGuides ? [relatedGuides] : []),
    usefulLinks,
    ...(serverFaq ? [serverFaq] : [renderArtistFaq(artist)])
  );

  // Transplant server-rendered show cards so users see real content immediately
  // rather than a loading state while the hydration fetch is in-flight.
  const existingGrid = main.querySelector("[data-show-grid]");
  const serverCards = existingGrid ? Array.from(existingGrid.querySelectorAll("article.show-card")) : [];
  if (serverCards.length) {
    const newGrid = showBoard.querySelector("[data-show-grid]");
    if (newGrid) newGrid.replaceChildren(...serverCards);
  }

  main.replaceChildren(section);
  hydrateShowBoard(showBoard, {
    artistSlug: artist.slug,
    // The API pages at 500 records; fetchShowBoardData follows every artist
    // page so all published upcoming dates remain visible.
    limit: 500,
    filterable: true,
    showEventCta: !isReviewRequired,
    reviewGated: isReviewRequired,
    artistName: artist.name
  });
}

function renderArtistFaq(artist) {
  const faq = document.createElement("section");
  faq.className = "nested-panel faq-panel";
  text(faq, "h2", `${artist.name} ticket FAQ`);
  const custom = Array.isArray(artist.faq)
    ? artist.faq
        .filter((entry) => entry && typeof entry === "object" && entry.question && entry.answer)
        .map((entry) => [entry.question, entry.answer])
    : [];
  const items = custom.length
    ? custom
    : [
        [
          `Does this page list ${artist.name} tour dates?`,
          "No. This page does not publish tour dates unless event details have been verified. Use the verified ticket link, when available, to check current platform information."
        ],
        [
          `Does TourTicketCompare sell ${artist.name} tickets?`,
          "No. TourTicketCompare does not sell tickets directly. We link to external ticketing platforms when a destination is verified."
        ],
        [
          "Are prices shown here?",
          "No. Prices should appear only when live provider data is verified and timestamped. Final prices and fees are controlled by the ticket platform."
        ]
      ];
  items.forEach(([question, answer]) => {
    const details = document.createElement("details");
    const summary = document.createElement("summary");
    summary.textContent = question;
    details.append(summary);
    text(details, "p", answer);
    faq.append(details);
  });
  return faq;
}

function renderGuidesIndex() {
  setMeta(routeMeta["/guides"], false);
  // The function route fully renders this index. Preserve it on initial load
  // rather than rebuilding identical markup, which caused a visible re-render
  // flash. The client renderer remains a fallback for an un-injected shell.
  if (document.getElementById("guidesTitle")) return;
  const section = document.createElement("section");
  section.className = "content-page";
  section.setAttribute("aria-labelledby", "guidesTitle");
  section.append(renderBreadcrumb([{ label: "Home", href: "/" }, { label: "Guides" }]));
  text(section, "h1", "Ticket buying guides").id = "guidesTitle";
  text(
    section,
    "p",
    "Use these guides to compare ticket options, understand resale risks, avoid scams, and check provider terms before you buy."
  );
  const primer = document.createElement("section");
  primer.className = "nested-panel";
  text(primer, "h2", "Start here before you buy");
  primer.append(
    createList(
      [
        "Confirm the artist, date, venue, and seat details match the show you want.",
        "Compare the final checkout total after fees, not only the first displayed price.",
        "Read delivery, refund, transfer, and resale terms on the provider site."
      ],
      "check-list"
    )
  );
  section.append(primer);
  const clustered = new Set();
  guideClusters.forEach((cluster) => {
    const clusterSection = document.createElement("section");
    clusterSection.className = "nested-panel";
    text(clusterSection, "h2", cluster.title);
    text(clusterSection, "p", cluster.intro);
    const grid = document.createElement("div");
    grid.className = "card-grid guide-grid";
    cluster.slugs.forEach((slug) => {
      clustered.add(slug);
      const guide = findGuide(slug);
      if (guide) grid.append(renderInfoCard(guide.h1, guide.description, link("Read guide", `/guides/${guide.slug}`, "text-link")));
    });
    clusterSection.append(grid);
    section.append(clusterSection);
  });
  const uncovered = guidePages.filter((guide) => !clustered.has(guide.slug));
  if (uncovered.length) {
    const moreSection = document.createElement("section");
    moreSection.className = "nested-panel";
    text(moreSection, "h2", "More guides");
    const moreGrid = document.createElement("div");
    moreGrid.className = "card-grid guide-grid";
    uncovered.forEach((guide) => moreGrid.append(renderInfoCard(guide.h1, guide.description, link("Read guide", `/guides/${guide.slug}`, "text-link"))));
    moreSection.append(moreGrid);
    section.append(moreSection);
  }
  const links = document.createElement("div");
  links.className = "action-row";
  links.append(buttonLink("Find an artist", "/artists", "primary"), buttonLink("How it works", "/how-it-works", "secondary"), buttonLink("Affiliate disclosure", "/affiliate-disclosure", "secondary"));
  section.append(links);
  main.replaceChildren(section);
}

function renderGuide(guide) {
  setMeta({ title: guide.title, description: guide.description }, false);
  // These guides have their full content server-rendered by functions/[[path]].js.
  // Keep the server HTML in place; re-rendering here would blank the page.
  if (guide.serverRendered) return;
  const section = document.createElement("section");
  section.className = "content-page guide-page";
  section.setAttribute("aria-labelledby", "guidePageTitle");
  section.append(renderBreadcrumb([{ label: "Home", href: "/" }, { label: "Guides", href: "/guides" }, { label: guide.h1 }]));
  text(section, "h1", guide.h1).id = "guidePageTitle";
  guideText(section, "p", guide.intro, "lead");
  const body = document.createElement("div");
  body.className = "guide-body";
  guide.sections.forEach(([heading, copy]) => {
    const block = document.createElement("section");
    block.className = "nested-panel";
    text(block, "h2", heading);
    guideText(block, "p", copy);
    body.append(block);
  });
  section.append(body, renderGuideFaq(guide));
  const next = document.createElement("section");
  next.className = "nested-panel";
  text(next, "h2", "Next steps");
  text(next, "p", "Use an artist page to look for checked event links where available, read how TourTicketCompare decides what to publish, or review how affiliate links are disclosed before leaving for a provider site.");
  const actions = document.createElement("div");
  actions.className = "action-row";
  actions.append(buttonLink("Find an artist", "/artists", "primary"), buttonLink("How it works", "/how-it-works", "secondary"), buttonLink("Affiliate disclosure", "/affiliate-disclosure", "secondary"));
  next.append(actions);
  section.append(next);
  main.replaceChildren(section);
}

function renderGuideFaq(guide) {
  const faq = document.createElement("section");
  faq.className = "nested-panel faq-panel";
  text(faq, "h2", "Guide FAQ");
  guide.faq.forEach(([question, answer]) => {
    const details = document.createElement("details");
    const summary = document.createElement("summary");
    summary.textContent = question;
    details.append(summary);
    guideText(details, "p", answer);
    faq.append(details);
  });
  return faq;
}

function renderHowItWorks() {
  setMeta(routeMeta["/how-it-works"], false);
  // The function route is the authoritative trust copy. Preserve it on initial
  // load so hydration cannot replace current snapshot and verification claims
  // with an older client fallback.
  if (document.getElementById("pageTitle")) return;
  const section = document.createElement("section");
  section.className = "content-page";
  section.append(renderBreadcrumb([{ label: "Home", href: "/" }, { label: "How it works" }]));
  text(section, "h1", "How TourTicketCompare works");
  text(section, "p", HOW_IT_WORKS_LEAD, "lead");

  const whatWeDo = document.createElement("section");
  whatWeDo.className = "nested-panel";
  text(whatWeDo, "h2", "What TourTicketCompare does");
  whatWeDo.append(
    createList([
      "Organises verified ticket links from official providers like Ticketmaster.",
      "Shows checked event-specific links only when the destination can be verified.",
      "Provides practical buying guidance on comparing totals, understanding fees, and confirming terms.",
      "Compares approved, timestamped provider listed-price snapshots for the same verified event when the provider lanes pass source and freshness checks.",
      "Displays a clear empty state when no verified ticket link exists for an event."
    ], "check-list")
  );

  const whatWeDont = document.createElement("section");
  whatWeDont.className = "nested-panel";
  text(whatWeDont, "h2", "What TourTicketCompare does not do");
  whatWeDont.append(
    createList([
      "Sell tickets directly.",
      "Compare prices without a fresh, approved snapshot for the same verified event.",
      "Display prices without verified, timestamped provider data.",
      "Send users to generic artist pages when no event-specific link is verified.",
      "Scrape unofficial sources or publish unverified tour dates."
    ], "check-list")
  );

  const howLinks = document.createElement("section");
  howLinks.className = "nested-panel";
  text(howLinks, "h2", "How ticket links are handled");
  text(
    howLinks,
    "p",
    "Ticket buttons on event cards link to external ticketing platforms. Some links may be affiliate links, which means we may earn a commission if you purchase through them at no extra cost to you."
  );
  text(
    howLinks,
    "p",
    "Affiliate relationships do not control which links we show. We only publish ticket buttons when the destination can be verified.",
    "disclosure-note"
  );

  const finalConfirm = document.createElement("section");
  finalConfirm.className = "nested-panel";
  text(finalConfirm, "h2", "What you should confirm on the ticket provider site");
  finalConfirm.append(
    createList([
      "Final price including all fees and taxes.",
      "Exact seat or standing area location.",
      "Delivery method and timing (instant, email transfer, shipped).",
      "Refund, resale, and cancellation terms.",
      "Event date, venue, and artist name match your intended show."
    ], "check-list")
  );

  const verification = document.createElement("section");
  verification.className = "nested-panel";
  text(verification, "h2", "What we verify before showing a link");
  text(verification, "p", "We check that the event card artist, date, and venue match verified source data. We validate each ticket link destination before showing a button. We do not show event cards or ticket links until the information can be checked.");

  section.append(whatWeDo, whatWeDont, howLinks, finalConfirm, verification, renderGeneralFaq());
  main.replaceChildren(section);
}

function renderGeneralFaq() {
  const faq = document.createElement("section");
  faq.className = "nested-panel faq-panel";
  text(faq, "h2", "FAQ");
  [
    ["Is TourTicketCompare official?", "No. TourTicketCompare is independent and unofficial."],
    ["Does the site sell tickets directly?", "No. Ticket buying happens on the external provider site."],
    ["Why are some ticket buttons missing?", "Ticket buttons are hidden until the destination can be verified."],
    ["Can final prices change?", "Yes. External ticketing sites set their own prices, fees, availability, and checkout terms."]
  ].forEach(([question, answer]) => {
    const details = document.createElement("details");
    const summary = document.createElement("summary");
    summary.textContent = question;
    details.append(summary);
    text(details, "p", answer);
    faq.append(details);
  });
  return faq;
}

function renderSimplePage(type) {
  setMeta(routeMeta[`/${type}`], false);
  const serverRenderedTitleIds = {
    about: "aboutTitle",
    contact: "contactTitle",
    "editorial-policy": "editorialTitle",
    "affiliate-disclosure": "affiliateTitle"
  };
  // Trust pages are fully rendered by the function route. Keep that current
  // copy in place on initial load; the client renderer remains a fallback for
  // an un-injected static shell.
  const serverRenderedTitleId = serverRenderedTitleIds[type];
  if (serverRenderedTitleId && document.getElementById(serverRenderedTitleId)) return;
  const section = document.createElement("section");
  section.className = "content-page";
  section.append(renderBreadcrumb([{ label: "Home", href: "/" }, { label: routeMeta[`/${type}`].title.replace(" | TourTicketCompare", "") }]));

  if (type === "affiliate-disclosure") {
    text(section, "h1", "Affiliate disclosure");
    text(
      section,
      "p",
      "TourTicketCompare is an independent, unofficial ticket research site. Some ticket links are affiliate links, which means we may earn a commission when you buy. You do not pay extra because of our affiliate relationship.",
      "lead"
    );

    const whatItMeans = document.createElement("section");
    whatItMeans.className = "nested-panel";
    text(whatItMeans, "h2", "What affiliate links mean");
    whatItMeans.append(
      createList(
        [
          "We link to ticket providers and may earn commission when you complete a purchase.",
          "The commission does not increase your ticket price or fees.",
          "We disclose which links are affiliate links so you know our relationship.",
          "Affiliate relationships do not decide which links we show or which providers we recommend."
        ],
        "check-list"
      )
    );

    const independence = document.createElement("section");
    independence.className = "nested-panel";
    text(independence, "h2", "Why it does not weaken our verification");
    text(
      independence,
      "p",
      "Affiliate relationships do not control which links we show. We do not publish fake prices, invented dates, fictional venues, unverified providers, or rankings we cannot support just because we earn a commission. We only show ticket buttons when we can check the artist, event, and destination. If a link cannot be verified, it should not appear as a ticket option."
    );

    const sources = document.createElement("section");
    sources.className = "nested-panel";
    text(sources, "h2", "How we handle different link types");
    sources.append(
      createList(
        [
          "Official sources: Artist-level and event pages on official ticketing sites (typically Ticketmaster). These are plain links — we have no Ticketmaster affiliate relationship and earn nothing when you use them.",
          "Resale marketplaces: Verified platforms like SeatGeek and Vivid Seats. These links may be affiliate links and may generate commission when you buy.",
          "Guidance: Buying guides and checklists are informational; we do not sell tickets directly."
        ],
        "check-list"
      )
    );

    const providerTerms = document.createElement("section");
    providerTerms.className = "nested-panel";
    text(providerTerms, "h2", "What you confirm with the provider");
    providerTerms.append(
      createList(
        [
          "Final ticket prices, fees, taxes, and delivery charges.",
          "Seat location, view restrictions, and physical details.",
          "Inventory and availability of your specific seats.",
          "Refund, cancellation, transfer, and resale rules.",
          "Payment security and checkout terms."
        ],
        "check-list"
      )
    );

    const checkout = document.createElement("section");
    checkout.className = "nested-panel";
    text(checkout, "h2", "Before you complete a purchase");
    text(
      checkout,
      "p",
      "Read the provider's terms and conditions. Confirm the event date, venue, seat information, final total, delivery method, refund policy, and transfer rules. These details come from the ticket provider, not from TourTicketCompare."
    );

    const disclosure = document.createElement("section");
    disclosure.className = "nested-panel";
    text(disclosure, "h2", "How affiliate commissions support us");
    text(
      disclosure,
      "p",
      "When you click through an affiliate link and complete a purchase, the provider may pay us a commission. This commission helps us maintain the site and continue providing free buying guidance. It does not cost you any extra."
    );

    const actions = document.createElement("div");
    actions.className = "action-row";
    actions.append(buttonLink("Find an artist", "/artists", "primary"), buttonLink("Read buying guides", "/guides", "secondary"));
    section.append(whatItMeans, independence, sources, providerTerms, checkout, disclosure, actions);
    main.replaceChildren(section);
    return;
  }

  if (type === "contact") {
    text(section, "h1", "Contact us");
    text(
      section,
      "p",
      "Spotted a broken link or a date that looks wrong? Tell us and we'll fix it.",
      "lead"
    );

    const contactRoutes = document.createElement("section");
    contactRoutes.className = "nested-panel";
    text(contactRoutes, "h2", "How to reach us");
    const routeCopy = document.createElement("p");
    routeCopy.append(
      document.createTextNode("Email "),
      link("hello@tourticketcompare.com", "mailto:hello@tourticketcompare.com", "text-link"),
      document.createTextNode(" — that's the quickest way to reach a person. We're also on X as "),
      link("@RenaissanceWT", "https://x.com/RenaissanceWT", "text-link"),
      document.createTextNode(" and "),
      link("@CowboyCarterWT", "https://x.com/CowboyCarterWT", "text-link"),
      document.createTextNode(".")
    );
    contactRoutes.append(routeCopy);

    const reasons = document.createElement("section");
    reasons.className = "nested-panel";
    text(reasons, "h2", "Worth getting in touch about");
    reasons.append(
      createList(
        [
          "A ticket button is broken, or drops you somewhere unexpected.",
          "A date, venue, city, or artist detail looks wrong.",
          "A provider link behaves oddly.",
          "Anything about the site, the guides, or an artist page you'd change."
        ],
        "check-list"
      )
    );

    const details = document.createElement("section");
    details.className = "nested-panel";
    text(details, "h2", "What helps us fix it faster");
    text(
      details,
      "p",
      "Send the artist, the date, the venue or city, the page you were on, the ticket link if there was one, and a line on what looked wrong. That's usually enough for us to reproduce it."
    );

    const limits = document.createElement("section");
    limits.className = "nested-panel";
    text(limits, "h2", "What we can't help with");
    text(
      limits,
      "p",
      "We don't sell tickets, so we can't do anything about an order, a refund, a transfer, a delivery that hasn't turned up, a payment problem, or an account you're locked out of. Those all have to go to the ticket site you bought from — the one on your confirmation email."
    );

    const actions = document.createElement("div");
    actions.className = "action-row";
    actions.append(buttonLink("Find an artist", "/artists", "primary"), buttonLink("Read buying guides", "/guides", "secondary"));
    section.append(contactRoutes, reasons, details, limits, actions);
    main.replaceChildren(section);
    return;
  }

  if (type === "about") {
    text(section, "h1", "About TourTicketCompare");
    text(
      section,
      "p",
      "We're an independent site for working out where to buy tickets to a big tour — and what you'll actually pay.",
      "lead"
    );

    const whatWeDo = document.createElement("section");
    whatWeDo.className = "nested-panel";
    text(whatWeDo, "h2", "What we do");
    whatWeDo.append(
      createList(
        [
          "Pull together ticket links for major artists so you're not opening ten tabs.",
          "Only publish a link for a specific date once we've checked the artist, date, venue, and where it goes.",
          "Show the prices we have from each ticket site for that same show, with the time we got them.",
          "Write plain guides on fees, resale, delivery timing, and what to look at before you pay."
        ],
        "check-list"
      )
    );

    const whatWeDont = document.createElement("section");
    whatWeDont.className = "nested-panel";
    text(whatWeDont, "h2", "What we don't do");
    whatWeDont.append(
      createList(
        [
          "Sell or resell tickets.",
          "Pretend a price we captured earlier is live stock or your final total.",
          "Crown one ticket site as always the better buy, because it never works out that way.",
          "Make up tour dates, venues, prices, or availability."
        ],
        "check-list"
      )
    );

    const affiliateNote = document.createElement("section");
    affiliateNote.className = "nested-panel";
    text(affiliateNote, "h2", "About the affiliate links");
    text(
      affiliateNote,
      "p",
      "Some links earn us a commission when you buy. That's how the site pays for itself — and it has no say in what we publish. A link goes up once we've checked where it lands, whether or not it makes us anything."
    );

    const actions = document.createElement("div");
    actions.className = "action-row";
    actions.append(buttonLink("Find an artist", "/artists", "primary"), buttonLink("Read buying guides", "/guides", "secondary"));
    section.append(whatWeDo, whatWeDont, affiliateNote, actions);
    main.replaceChildren(section);
    return;
  }

  if (type === "editorial-policy") {
    text(section, "h1", "Editorial policy");
    text(
      section,
      "p",
      "Nothing goes on this site unless we can check where it came from. These are the rules we hold ourselves to.",
      "lead"
    );

    const whatWePublish = document.createElement("section");
    whatWePublish.className = "nested-panel";
    text(whatWePublish, "h2", "What we publish");
    whatWePublish.append(
      createList(
        [
          "Artist pages for major tours, with summaries drawn from confirmed public sources.",
          "Links to artist pages on official ticketing sites, once we've followed them.",
          "Links for a specific date, where we've checked the date, the venue, and where the link lands.",
          "Current prices from ticket sites for that same show, each labelled with the provider and the time we captured it — and we'll only call one lower when we have fresh figures for both.",
          "Guides on fees, resale, delivery timing, and what to look at before you pay."
        ],
        "check-list"
      )
    );

    const whatWeVerify = document.createElement("section");
    whatWeVerify.className = "nested-panel";
    text(whatWeVerify, "h2", "What has to be true before a button appears");
    text(
      whatWeVerify,
      "p",
      "The artist has to be one we've verified, the destination has to be a link we've configured and checked, and the link has to pass our outbound safety checks. For a specific date, we also need an event record with a confirmed date, venue, and artist. Where we have none of that, you get an honest empty state instead of a button."
    );

    const whatWeDont = document.createElement("section");
    whatWeDont.className = "nested-panel";
    text(whatWeDont, "h2", "What we won't publish");
    whatWeDont.append(
      createList(
        [
          "Tour dates, venues, or cities we've made up.",
          "Prices or availability we can't trace to an approved source.",
          "Claims about partnerships or coverage we can't back up.",
          "Fake comparison tables, placeholder prices, or a \"cheaper\" claim with only one side's figures.",
          "Anything scraped off a ticket site or a competitor.",
          "Savings or discount claims we can't evidence.",
          "Event schema on pages without verified event-level data."
        ],
        "check-list"
      )
    );

    const corrections = document.createElement("section");
    corrections.className = "nested-panel";
    text(corrections, "h2", "Corrections and broken links");
    const correctionsCopy = document.createElement("p");
    correctionsCopy.append(
      document.createTextNode(
        "If a ticket button is broken, opens the wrong destination, or an event detail looks incorrect, please report it through our "
      ),
      link("contact page", "/contact", "text-link"),
      document.createTextNode(
        ". When we find a link that is outdated or can no longer be verified, we update or remove it rather than leave it live."
      )
    );
    corrections.append(correctionsCopy);

    const actions = document.createElement("div");
    actions.className = "action-row";
    actions.append(
      buttonLink("Find an artist", "/artists", "primary"),
      buttonLink("How it works", "/how-it-works", "secondary"),
      buttonLink("Affiliate disclosure", "/affiliate-disclosure", "secondary"),
      buttonLink("Contact", "/contact", "secondary")
    );

    section.append(whatWePublish, whatWeVerify, whatWeDont, corrections, actions);
    main.replaceChildren(section);
    return;
  }
  main.replaceChildren(section);
}

function renderComparisonHub() {
  setMeta(routeMeta["/compare-concert-ticket-prices"], false);
  // This page is fully server-rendered by functions/[[path]].js; keep that
  // HTML in place when it is present instead of re-rendering client-side.
  if (document.getElementById("compareTitle")) return;
  const section = document.createElement("section");
  section.className = "content-page comparison-hub";
  section.append(renderBreadcrumb([{ label: "Home", href: "/" }, { label: "Compare Concert Ticket Prices" }]));
  const panel = document.createElement("section");
  panel.className = "nested-panel";
  text(panel, "h1", "Compare Concert Ticket Prices by Site");
  text(
    panel,
    "p",
    "Compare prices for the same checked concert across ticket sites where listed-price snapshots are eligible, then confirm fees, availability, and ticket terms on the provider site before buying.",
    "lead"
  );
  const actions = document.createElement("div");
  actions.className = "action-row";
  actions.append(
    buttonLink("Browse artists", "/artists", "primary"),
    buttonLink("Read buying guides", "/guides", "secondary"),
    buttonLink("How it works", "/how-it-works", "secondary")
  );
  panel.append(actions);
  section.append(panel);
  main.replaceChildren(section);
}

function renderNotFound() {
  setMeta({ title: "Page Not Found | TourTicketCompare", description: "This TourTicketCompare page is not published." }, true);
  const section = document.createElement("section");
  section.className = "content-page";
  text(section, "h1", "Page not found");
  text(section, "p", "We could not find that page. Use the artist index, buying guides, or homepage to find current public pages.");
  const actions = document.createElement("div");
  actions.className = "action-row";
  actions.append(buttonLink("Find an artist", "/artists", "primary"), buttonLink("Read buying guides", "/guides", "secondary"), buttonLink("Return home", "/", "secondary"));
  section.append(actions);
  main.replaceChildren(section);
}

async function loadCatalog() {
  try {
    // Default cache mode respects the CDN cache headers (public/_headers gives
    // catalog.json a 30-min max-age) and lets the <link rel="preload"> in the shell
    // actually be reused. "no-store" previously bypassed both, forcing a second fetch.
    const response = await fetch("/data/catalog.json");
    if (!response.ok) return await loadFallbackCatalog();
    const data = await response.json();
    if (!data || !Array.isArray(data.artists)) return await loadFallbackCatalog();
    return data;
  } catch (error) {
    return await loadFallbackCatalog();
  }
}

async function loadArtistsMeta() {
  try {
    const response = await fetch("/data/artists.json", { cache: "no-store" });
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    return [];
  }
}

async function loadFallbackCatalog() {
  if (fallbackCatalog.artists.length) return fallbackCatalog;
  try {
    const response = await fetch("/data/fallback-catalog.json", { cache: "force-cache" });
    if (!response.ok) return { artists: [], tours: [], providers: [], ticket_links: [] };
    const data = await response.json();
    fallbackCatalog = data || fallbackCatalog;
    return fallbackCatalog;
  } catch (error) {
    return { artists: [], tours: [], providers: [], ticket_links: [] };
  }
}

async function render() {
  [catalog, artistsMeta] = await Promise.all([loadCatalog(), loadArtistsMeta()]);
  const current = getRoute();

  if (current.type === "client-redirect") {
    window.location.replace(current.to);
    return;
  }

  if (current.type === "home") {
    // The redesigned homepage (ttc-home.js) mounts into #ttc-main and owns
    // #mainContent. Skip the legacy client home render when that mount point is
    // present so the two renderers don't fight over the same container.
    if (!document.getElementById("ttc-main")) renderHome();
  }
  else if (current.type === "artists") renderArtistsIndex();
  else if (current.type === "artist") renderArtist(current.artist);
  else if (current.type === "guides") renderGuidesIndex();
  else if (current.type === "guide") renderGuide(current.guide);
  else if (current.type === "compare-concert-ticket-prices") {
    renderComparisonHub();
    await hydrateComparisonHubPriceSnapshots();
  }
  else if (current.type === "how-it-works") renderHowItWorks();
  else if (["about", "contact", "editorial-policy", "affiliate-disclosure"].includes(current.type)) renderSimplePage(current.type);
  else if (current.type === "server-rendered") {
    // Server-authoritative route (e.g. venue pages) with no client renderer.
    // Leave the function-rendered HTML in place instead of clobbering it.
  }
  else renderNotFound();

  const pageType = clientPageType(window.location.pathname);
  // Artist-city and artist-tour routes are server-rendered, so the client
  // router reports them as "server-rendered" and carries no artist record.
  // Read the slug from the path so those surfaces still attribute to an artist.
  // Resolve the slug against the catalogue rather than trusting the path. An
  // unknown /artists/<slug> is a 404 and a bad tour segment is a 404 under a
  // real artist; copying either into artist_slug would invent a slug on one and
  // credit a page nobody could read on the other.
  const pathArtistSlug = /^\/artists\/([^/]+)(?:\/|$)/.exec(window.location.pathname)?.[1] || "";
  const resolvedPathArtist =
    current.type !== "not-found" && pathArtistSlug ? findArtist(pathArtistSlug)?.slug || "" : "";
  const artistSlug =
    current.artist?.slug ||
    (pageType === "artist" || pageType === "artist_city" || pageType === "artist_tour" ? resolvedPathArtist : "");

  sendAnalytics("page_view", {
    routeType: current.type,
    pageType,
    artistSlug,
    guideSlug: current.guide?.slug || ""
  });

  // Funnel step 2: the visitor is looking at a specific artist. Emitted
  // alongside page_view rather than instead of it so the page-level count stays
  // comparable with historical rows.
  if (artistSlug) {
    sendAnalytics("artist_view", { routeType: current.type, pageType, artistSlug });
  }

  observeFunnelImpressions();
}

// ── Impression instrumentation ─────────────────────────────────────────────
// Views are counted only when the element is actually on screen and stays
// there, so a scroll past the top of a long board is not recorded as a view.
// Both observers are capped and deduplicated per render: they are a denominator
// for click-through, and an inflated denominator is worse than none.
const EVENT_VIEW_CAP = 20;
const IMPRESSION_DWELL_MS = 1000;
const IMPRESSION_VISIBLE_RATIO = 0.5;

let funnelImpressionObserver = null;
let funnelImpressionTimers = new Map();
let seenEventViews = new Set();
let providerCtaViewReported = false;
let observedCtas = [];
// Impression state is keyed to the page, not to a render pass. Artist boards
// are server-rendered and then replaced by the hydrated version, so the scan
// runs more than once per page; resetting per render would let one card report
// twice.
let funnelImpressionPath = "";
let funnelImpressionScanTimer = null;
let funnelMutationObserver = null;

function clearFunnelImpressionTimers() {
  funnelImpressionTimers.forEach((timer) => window.clearTimeout(timer));
  funnelImpressionTimers = new Map();
}

// Re-scan after DOM changes settle. Hydration swaps the show board in after the
// route render returns, so a single scan at render time would observe elements
// that are about to be discarded.
function scheduleFunnelImpressionScan() {
  if (funnelImpressionScanTimer) window.clearTimeout(funnelImpressionScanTimer);
  funnelImpressionScanTimer = window.setTimeout(() => {
    funnelImpressionScanTimer = null;
    observeFunnelImpressions();
  }, 250);
}

function reportProviderCtaView(ctaElement) {
  if (providerCtaViewReported) return;
  providerCtaViewReported = true;
  // One impression per page view is all this event records, so stop watching
  // the rest as soon as any CTA has been seen.
  observedCtas.forEach((cta) => funnelImpressionObserver?.unobserve(cta));
  observedCtas = [];
  // One row per page view, listing which providers the visitor could actually
  // see. That is the honest denominator for provider click-through: a page
  // whose CTAs were never scrolled into view did not fail to convert.
  const ctas = Array.from(document.querySelectorAll("a[data-cta-provider]"));
  const providers = Array.from(new Set(ctas.map((cta) => String(cta.dataset.ctaProvider || "").trim()).filter(Boolean))).sort();
  sendAnalytics("provider_cta_view", {
    artistSlug: String(ctaElement?.dataset?.ctaArtist || "").trim(),
    ctaLocation: String(ctaElement?.dataset?.ctaLocation || "").trim(),
    ctaProviders: providers.join(","),
    ctaCount: ctas.length
  });
}

function reportEventView(card) {
  const eventId = String(card?.dataset?.eventId || "").trim();
  if (!eventId || seenEventViews.has(eventId)) return;
  if (seenEventViews.size >= EVENT_VIEW_CAP) return;
  seenEventViews.add(eventId);
  const cta = card.querySelector("a[data-cta-provider]");
  sendAnalytics("event_view", {
    eventId,
    artistSlug: String(cta?.dataset?.ctaArtist || "").trim(),
    pageType: clientPageType(window.location.pathname)
  });
}

function observeFunnelImpressions() {
  if (typeof window.IntersectionObserver !== "function") return;
  if (funnelImpressionObserver) funnelImpressionObserver.disconnect();
  clearFunnelImpressionTimers();
  if (funnelImpressionPath !== window.location.pathname) {
    funnelImpressionPath = window.location.pathname;
    seenEventViews = new Set();
    providerCtaViewReported = false;
    observedCtas = [];
  }

  funnelImpressionObserver = new window.IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const element = entry.target;
      if (!entry.isIntersecting || entry.intersectionRatio < IMPRESSION_VISIBLE_RATIO) {
        const pending = funnelImpressionTimers.get(element);
        if (pending) {
          window.clearTimeout(pending);
          funnelImpressionTimers.delete(element);
        }
        return;
      }
      if (funnelImpressionTimers.has(element)) return;
      funnelImpressionTimers.set(
        element,
        window.setTimeout(() => {
          funnelImpressionTimers.delete(element);
          if (element.matches("a[data-cta-provider]")) reportProviderCtaView(element);
          else reportEventView(element);
          funnelImpressionObserver?.unobserve(element);
        }, IMPRESSION_DWELL_MS)
      );
    });
  }, { threshold: [IMPRESSION_VISIBLE_RATIO] });

  const cards = Array.from(document.querySelectorAll("[data-event-id]"))
    .filter((card) => !seenEventViews.has(String(card.dataset.eventId || "")))
    .slice(0, EVENT_VIEW_CAP);
  cards.forEach((card) => funnelImpressionObserver.observe(card));
  if (!providerCtaViewReported) {
    // Every CTA is observed, not just the first in document order. A deep link
    // to #show-<id>, or a restored scroll position, opens the page part-way
    // down the board where a later CTA is on screen while the first is not —
    // watching only the first would miss a real impression and understate the
    // denominator this event exists to provide. The first one to satisfy the
    // dwell threshold reports and cancels the others.
    observedCtas = Array.from(document.querySelectorAll("a[data-cta-provider]"));
    observedCtas.forEach((cta) => funnelImpressionObserver.observe(cta));
  }

  if (!funnelMutationObserver && typeof window.MutationObserver === "function") {
    const root = document.getElementById("mainContent") || document.body;
    if (root) {
      funnelMutationObserver = new window.MutationObserver(() => scheduleFunnelImpressionScan());
      funnelMutationObserver.observe(root, { childList: true, subtree: true });
    }
  }
}

if (year) year.textContent = String(new Date().getFullYear());

if (navToggle && navLinks) {
  const navOpenLabel = "Close";
  const navClosedLabel = navToggle.textContent.trim() || "Menu";
  const setNavState = (open) => {
    navToggle.setAttribute("aria-expanded", String(open));
    navLinks.toggleAttribute("data-open", open);
    navToggle.textContent = open ? navOpenLabel : navClosedLabel;
  };
  const closeNav = ({ restoreFocus = false } = {}) => {
    if (navToggle.getAttribute("aria-expanded") !== "true") return;
    setNavState(false);
    if (restoreFocus) navToggle.focus();
  };
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    setNavState(!isOpen);
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNav({ restoreFocus: true });
  });
  document.addEventListener("click", (event) => {
    if (navToggle.getAttribute("aria-expanded") !== "true") return;
    const target = event.target;
    if (!(target instanceof Node)) return;
    if (navToggle.contains(target) || navLinks.contains(target)) return;
    closeNav();
  });
}

document.addEventListener("click", async (event) => {
  const action = event.target?.closest?.("[data-copy-show-link]");
  if (!action) return;
  event.preventDefault();
  const anchorId = String(action.getAttribute("data-copy-show-link") || "").trim();
  if (!anchorId) return;
  const showUrl = `${location.origin}${location.pathname}#${anchorId}`;
  const originalLabel = action.textContent;
  try {
    await copyTextToClipboard(showUrl);
    action.textContent = "Copied";
  } catch (error) {
    action.textContent = "Copy failed";
  }
  window.setTimeout(() => {
    action.textContent = originalLabel || "Copy link to this date";
  }, 1800);
});

// Delegated provider-CTA click analytics. Covers server-rendered and hydrated
// CTAs alike via the data-cta-* attributes: artist, event, provider, snapshot
// present/absent, and CTA location. Never blocks or rewrites the navigation.
const AFFILIATE_CTA_PROVIDERS = ["seatgeek", "vivid-seats", "ticketnetwork", "ticket-liquidator", "stubhub-international"];

document.addEventListener("click", (event) => {
  const cta = event.target?.closest?.("a[data-cta-provider]");
  if (!cta) return;
  const provider = String(cta.dataset.ctaProvider || "").trim();
  if (!provider) return;
  const showId = String(cta.dataset.ctaShowId || "").trim();
  const ctaLocation = String(cta.dataset.ctaLocation || "").trim();
  // A double-click, or a click that bubbles through a nested tracked element,
  // is one intent and must produce one row. The authoritative count comes from
  // /api/out either way, but an inflated provider_click would distort the
  // CTA-click-to-redirect completion rate.
  if (isDuplicateFunnelEvent(`provider_click:${provider}:${showId}:${ctaLocation}`, Date.now())) return;
  sendAnalytics("provider_click", {
    provider,
    artistSlug: String(cta.dataset.ctaArtist || "").trim(),
    showId,
    eventId: showId,
    priceSnapshot: cta.dataset.ctaPriceSnapshot === "present" ? "present" : "absent",
    ctaLocation,
    isAffiliate: AFFILIATE_CTA_PROVIDERS.indexOf(provider) !== -1,
    linkId: showId ? `${showId}:${provider}` : String(cta.dataset.ctaLinkId || "").trim()
  });
});

// Delegated watchlist signup for the zero-event board state (server-rendered
// and hydrated forms). Posts to the existing gated /api/signup endpoint.
document.addEventListener("submit", async (event) => {
  const form = event.target?.closest?.("form[data-watchlist-signup]");
  if (!form) return;
  event.preventDefault();
  if (form.dataset.signupSubmitting === "true") return;
  const status = form.querySelector("[data-signup-status]");
  const emailInput = form.querySelector('input[name="email"]');
  const email = String(emailInput?.value || "").trim();
  const setStatus = (message) => {
    if (status) status.textContent = message;
  };
  if (!email) {
    setStatus("Pop in an email address first.");
    return;
  }
  setStatus("Adding you…");
  form.dataset.signupSubmitting = "true";
  const submitButton = form.querySelector('button[type="submit"]');
  if (submitButton) submitButton.disabled = true;
  try {
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        website: String(form.querySelector('input[name="website"]')?.value || ""),
        artistSlug: String(form.dataset.watchlistSignup || "").trim(),
        sourcePath: window.location.pathname
      })
    });
    if (response.ok) {
      setStatus("Done — we'll email you when we've got confirmed dates up.");
      if (emailInput) emailInput.value = "";
      // GA4 mirror only. /api/signup has already written the authoritative
      // first-party email_signup row; a beacon here would double-count it. The
      // address itself is never included in either analytics path.
      mirrorToGa4("email_signup", { artistSlug: String(form.dataset.watchlistSignup || "").trim() }, {});
    } else {
      setStatus("That didn't work — check the email address and try again.");
      delete form.dataset.signupSubmitting;
      if (submitButton) submitButton.disabled = false;
    }
  } catch (error) {
    setStatus("That didn't work — please try again.");
    delete form.dataset.signupSubmitting;
    if (submitButton) submitButton.disabled = false;
  }
});

// Delegated toggle for the on-site price-history panel. The series is fetched
// once, on first open (progressive enhancement); the read-only endpoint applies
// the same display-eligibility gate as the price badge.
document.addEventListener("click", async (event) => {
  const toggle = event.target?.closest?.("[data-price-history-toggle]");
  if (!toggle) return;
  const wrap = toggle.closest("[data-price-history]");
  if (!wrap) return;
  const panel = wrap.querySelector("[data-price-history-panel]");
  if (!panel) return;
  const expanded = toggle.getAttribute("aria-expanded") === "true";
  if (expanded) {
    toggle.setAttribute("aria-expanded", "false");
    panel.hidden = true;
    toggle.textContent = "Show price snapshot history";
    return;
  }
  toggle.setAttribute("aria-expanded", "true");
  panel.hidden = false;
  toggle.textContent = "Hide price snapshot history";
  // Event expansion: the only in-card disclosure on the board, so this is the
  // "did the user open a date's detail" signal. Reported once per open.
  sendAnalytics("event_expand", {
    artistSlug: String(wrap.dataset.priceHistoryArtist || "").trim(),
    showId: String(wrap.dataset.priceHistory || "").trim(),
    panel: "price_history"
  });
  if (wrap.dataset.priceHistoryLoaded === "true") return;
  wrap.dataset.priceHistoryLoaded = "true";
  panel.replaceChildren();
  text(panel, "p", "Loading recent snapshots…", "disclosure-note");
  const showId = String(wrap.dataset.priceHistory || "").trim();
  try {
    const response = await fetch(`/api/price-history?showId=${encodeURIComponent(showId)}`, { headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error("history_unavailable");
    const data = await response.json();
    renderPriceHistoryContent(panel, wrap, data);
  } catch (error) {
    panel.replaceChildren();
    text(panel, "p", "Price snapshot history isn't available right now.", "disclosure-note");
    wrap.dataset.priceHistoryLoaded = "";
  }
});

// Delegated submit for the price-drop demand instrument. Records interest via
// the existing gated /api/signup endpoint (intent=price_alert); no email is
// ever sent — this only gauges demand.
document.addEventListener("submit", async (event) => {
  const form = event.target?.closest?.("form[data-price-alert-interest]");
  if (!form) return;
  event.preventDefault();
  if (form.dataset.submitting === "true") return;
  const status = form.querySelector("[data-alert-interest-status]");
  const emailInput = form.querySelector('input[name="email"]');
  const email = String(emailInput?.value || "").trim();
  const honeypot = String(form.querySelector('input[name="website"]')?.value || "").trim();
  const setStatus = (message) => {
    if (status) status.textContent = message;
  };
  if (honeypot) return;
  if (!email) {
    setStatus("Enter an email address to register interest.");
    return;
  }
  setStatus("Recording your interest…");
  form.dataset.submitting = "true";
  const submitButton = form.querySelector('button[type="submit"]');
  if (submitButton) submitButton.disabled = true;
  try {
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email,
        website: honeypot,
        artistSlug: String(form.dataset.priceAlertInterest || "").trim(),
        eventId: String(form.dataset.eventId || "").trim(),
        intent: "price_alert",
        sourcePath: window.location.pathname
      })
    });
    const data = await response.json().catch(() => null);
    if (response.ok && data?.ok) {
      setStatus("Thanks — interest noted. We're not sending price emails yet; this just helps us gauge demand.");
      if (emailInput) emailInput.value = "";
    } else {
      setStatus("We couldn't record that just now — please try again later.");
      delete form.dataset.submitting;
      if (submitButton) submitButton.disabled = false;
    }
  } catch (error) {
    setStatus("We couldn't record that just now — please try again later.");
    delete form.dataset.submitting;
    if (submitButton) submitButton.disabled = false;
  }
});

// Hydrates the server-rendered currency converter on /currency-converter.
// Rates come only from /api/rates (ECB daily reference rates, cached edge-side,
// fail-closed): if the endpoint fails or returns malformed data, the controls
// stay disabled and an unavailable message is shown — no fallback rates.
async function initCurrencyConverter() {
  const form = document.querySelector("form[data-currency-converter]");
  if (!form) return;
  const amountInput = form.querySelector("[data-converter-amount]");
  const fromSelect = form.querySelector("[data-converter-from]");
  const toSelect = form.querySelector("[data-converter-to]");
  const swapButton = form.querySelector("[data-converter-swap]");
  const resultLine = form.querySelector("[data-converter-result]");
  const metaLine = form.querySelector("[data-converter-meta]");
  if (!amountInput || !fromSelect || !toSelect || !resultLine) return;

  const setResult = (message) => {
    resultLine.textContent = message;
  };
  setResult("Loading current reference rates…");

  let payload = null;
  try {
    const response = await fetch("/api/rates", { headers: { Accept: "application/json" } });
    if (response.ok) payload = await response.json();
  } catch (error) {
    payload = null;
  }

  const rawRates = payload?.ok === true && payload.rates && typeof payload.rates === "object" ? payload.rates : null;
  const rateDate = /^\d{4}-\d{2}-\d{2}$/.test(String(payload?.date || "")) ? String(payload.date) : "";
  const rates = {};
  for (const [code, value] of Object.entries(rawRates || {})) {
    const normalized = String(code || "").trim().toUpperCase();
    const rate = Number(value);
    if (!Number.isFinite(rate) || rate <= 0 || !isValidCurrencyCode(normalized)) continue;
    rates[normalized] = rate;
  }
  const codes = Object.keys(rates).sort();
  if (codes.length < 2 || !rateDate) {
    setResult("Current reference rates are unavailable right now. Try again later — and always confirm the charge currency and final total at provider checkout.");
    return;
  }

  let displayNames = null;
  try {
    displayNames = new Intl.DisplayNames(undefined, { type: "currency" });
  } catch (error) {
    displayNames = null;
  }
  const optionLabel = (code) => {
    let name = "";
    try {
      name = displayNames ? String(displayNames.of(code) || "") : "";
    } catch (error) {
      name = "";
    }
    return name && name !== code ? `${code} — ${name}` : code;
  };
  for (const select of [fromSelect, toSelect]) {
    select.textContent = "";
    for (const code of codes) {
      const option = document.createElement("option");
      option.value = code;
      option.textContent = optionLabel(code);
      select.append(option);
    }
    select.disabled = false;
  }

  const storageKey = "ttcCurrencyConverter";
  let stored = {};
  try {
    stored = JSON.parse(window.localStorage.getItem(storageKey) || "{}") || {};
  } catch (error) {
    stored = {};
  }
  const params = new URLSearchParams(window.location.search);
  const pick = (value, fallback) => {
    const code = String(value || "").trim().toUpperCase();
    return codes.includes(code) ? code : fallback;
  };
  const defaultFrom = codes.includes("USD") ? "USD" : codes[0];
  fromSelect.value = pick(params.get("from"), pick(stored.from, defaultFrom));
  const defaultTo = codes.includes("GBP") && fromSelect.value !== "GBP" ? "GBP" : codes.find((code) => code !== fromSelect.value) || codes[0];
  toSelect.value = pick(params.get("to"), pick(stored.to, defaultTo));
  const paramAmount = Number(String(params.get("amount") || "").replace(/,/g, ""));
  if (Number.isFinite(paramAmount) && paramAmount > 0) amountInput.value = String(paramAmount);

  const update = () => {
    const from = fromSelect.value;
    const to = toSelect.value;
    const amount = Number(String(amountInput.value || "").trim().replace(/,/g, ""));
    try {
      window.localStorage.setItem(storageKey, JSON.stringify({ from, to }));
    } catch (error) {
      // Storage unavailable (private mode) — selection just won't persist.
    }
    const unitRate = rates[to] / rates[from];
    if (metaLine) {
      metaLine.textContent = `1 ${from} = ${unitRate.toFixed(4)} ${to} · European Central Bank daily reference rates for ${rateDate}. Indicative mid-market rates only — your card issuer or the provider sets the actual rate and any fees.`;
    }
    if (!Number.isFinite(amount) || amount < 0) {
      setResult("Enter an amount to convert.");
      return;
    }
    const converted = amount * unitRate;
    if (!Number.isFinite(converted)) {
      setResult("Enter an amount to convert.");
      return;
    }
    const fromLabel = formatProviderPrice(amount, from) || `${amount} ${from}`;
    const toLabel = formatProviderPrice(converted, to) || `${converted.toFixed(2)} ${to}`;
    setResult(`${fromLabel} ≈ ${toLabel}`);
  };

  amountInput.addEventListener("input", update);
  fromSelect.addEventListener("change", update);
  toSelect.addEventListener("change", update);
  if (swapButton) {
    swapButton.disabled = false;
    swapButton.addEventListener("click", () => {
      const from = fromSelect.value;
      fromSelect.value = toSelect.value;
      toSelect.value = from;
      update();
    });
  }
  update();
}

function activateWatchlistForms() {
  document.querySelectorAll("form[data-watchlist-shell]").forEach((form) => {
    const artistSlug = String(form.dataset.watchlistShell || "").trim();
    if (!artistSlug) return;
    // Marks the form for the delegated JS submit handler (which intercepts and
    // posts JSON). Without JS this never runs and the form posts natively to
    // /api/signup. Legacy server markup may still carry a disabled type="button"
    // button; normalise it to an enabled submit here.
    form.dataset.watchlistSignup = artistSlug;
    const button = form.querySelector("button");
    if (button) {
      button.type = "submit";
      button.disabled = false;
      if (/enable javascript/i.test(button.textContent || "")) button.textContent = "Notify me";
    }
  });
}

render().then(() => {
  activateWatchlistForms();
  initCurrencyConverter();
});
