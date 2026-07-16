let fallbackCatalog = { artists: [], tours: [], providers: [], ticket_links: [] };

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
    description: "Compare concert ticket prices using exact-event, ticket-type, seat, fee, delivery, and buyer-protection checks, with timestamped provider snapshots as a starting point.",
    h1: "How to Compare Concert Ticket Prices Safely",
    serverRendered: true
  },
  {
    slug: "ticketmaster-vs-seatgeek-vs-vivid-seats",
    title: "Ticketmaster vs SeatGeek vs Vivid Seats | TourTicketCompare",
    description: "Compare Ticketmaster, SeatGeek, and Vivid Seats by ticket type, listed prices, fees, seat details, delivery, and buyer protections before choosing where to buy.",
    h1: "Ticketmaster vs SeatGeek vs Vivid Seats: key differences",
    serverRendered: true
  },
  {
    slug: "seatgeek-vs-ticketmaster",
    title: "SeatGeek vs Ticketmaster | TourTicketCompare",
    description: "Compare SeatGeek and Ticketmaster by primary vs resale tickets, fees, Deal Score, delivery, buyer protections, and final checkout terms.",
    h1: "SeatGeek vs Ticketmaster: which should you use?",
    serverRendered: true
  },
  {
    slug: "how-to-avoid-overpaying-for-concert-tickets",
    title: "How to Avoid Overpaying for Concert Tickets | TourTicketCompare",
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
    description: "Understand official tickets vs resale tickets, including fees, seat details, transfer timing, seller terms, protections, and checkout checks.",
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
    title: "Ticketmaster vs StubHub: How to Compare Safely | TourTicketCompare",
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
    description: "Understand common concert ticket fee categories and compare final checkout totals safely before you buy.",
    h1: "What concert ticket fees should I check before buying?",
    serverRendered: true
  },
  {
    slug: "ticket-delivery-and-transfer-timing",
    title: "Ticket Delivery and Transfer Timing Guide | TourTicketCompare",
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
    title: "How to Prepare for a Concert Ticket Onsale | TourTicketCompare",
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
    title: "What to Do if a Concert Is Postponed or Cancelled | TourTicketCompare",
    description: "Learn what to check if a concert is postponed, rescheduled, cancelled, or changed, including provider updates, refunds, transfers, resale rules, and ticket delivery.",
    h1: "What should I do if a concert is postponed or cancelled?",
    serverRendered: true
  }
];

const oldGuideRedirects = {
  "compare-ticket-prices-safely": "how-to-compare-concert-ticket-prices",
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
    title: "Compare Concert Ticket Prices & Find Tour Dates | TourTicketCompare",
    description:
      "Compare available, timestamped provider listed-price snapshots for verified concert events, find tour dates, and confirm fees and availability with the provider."
  },
  "/compare-concert-ticket-prices": {
    title: "Compare Concert Ticket Prices | TourTicketCompare",
    description:
      "Compare available, timestamped provider listed-price snapshots for the same verified concert event, then confirm fees, availability, seats, and final totals with the provider."
  },
  "/artists": {
    title: "Artists | TourTicketCompare",
    description:
      "Browse major artist pages with verified ticket links where available and practical buying guidance on what to check before checkout."
  },
  "/guides": {
    title: "Concert Ticket Buying Guides | TourTicketCompare",
    description:
      "Essential guides for comparing ticket prices, checking official vs. resale, deciding when to buy, and confirming final terms before checkout."
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

function link(label, href, className) {
  const element = document.createElement("a");
  element.href = href;
  element.textContent = label;
  if (className) element.className = className;
  if (/^https?:\/\//i.test(href)) element.rel = "noopener";
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

function sendAnalytics(eventName, metadata = {}) {
  if (!navigator.sendBeacon) return;
  try {
    const payload = {
      eventName,
      sourcePath: window.location.pathname,
      artistSlug: metadata.artistSlug || "",
      provider: metadata.provider || "",
      tourSlug: metadata.tourSlug || "",
      destinationHost: metadata.destinationHost || "",
      linkId: metadata.linkId || "",
      metadata
    };
    navigator.sendBeacon("/api/analytics", JSON.stringify(payload));
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

function artistCardStatus(artist, events) {
  if (artistHasVerifiedEventLinks(events, artist.slug)) {
    return {
      pending: false,
      badgeClass: "status-badge",
      badge: "Checked ticket options",
      detail: "Verified event ticket links available",
      cardStatus: "Verified event ticket links are available on this artist page.",
      ctaLabel: "View ticket links",
      ctaVariant: "primary"
    };
  }
  const activeProviders = ticketLinksForArtist(artist.slug).filter((item) => providerEnabled(slugify(item.provider)));
  if (activeProviders.length > 0) {
    return {
      pending: false,
      badgeClass: "status-badge",
      badge: "Artist-level provider page",
      detail: "No event-specific ticket link verified yet",
      cardStatus: "Artist-level provider page available. No event-specific ticket link verified yet.",
      ctaLabel: "View artist page",
      ctaVariant: "primary"
    };
  }
  return {
    pending: true,
    badgeClass: "status-badge status-badge-muted",
    badge: "Buying guidance",
    detail: "Event links added after review",
    cardStatus: "No verified ticket destination is currently published for this artist.",
    ctaLabel: "View artist page",
    ctaVariant: "secondary"
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

  // Venue landing pages (/venues and /venues/<slug>) are fully rendered by the
  // function route (functions/[[path]].js) and have no client renderer. Treat
  // them as server-authoritative so the client preserves the server HTML
  // instead of falling through to the client-side 404. The server already
  // returns a real 404 for unknown venue slugs, so preserving its output is
  // correct in both the found and not-found cases.
  if (parts[0] === "venues") return { type: "server-rendered" };

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

function artistPageHeading(artist) {
  return `${artist.name} tickets and tour dates`;
}

function artistPageIntro(artist) {
  return `Find upcoming ${artist.name} shows, pick a date, and compare available ticket options.`;
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

function buildVerificationDisclosurePanel(artist, shows = []) {
  const panel = document.createElement("section");
  panel.className = "nested-panel verification-disclosure";
  text(panel, "h2", "How ticket links work");
  // Single consolidated trust block. Keep in sync with
  // renderVerificationDisclosure in functions/[[path]].js.
  text(
    panel,
    "p",
    "We verify ticket destinations before they appear. Providers set prices, fees, availability and delivery terms; some links may earn us a commission.",
    "muted"
  );

  const artistVerifiedDate = formatVerificationDate(artist.last_verified_at);
  if (artistVerifiedDate) {
    text(panel, "p", `Artist last checked: ${artistVerifiedDate}.`, "disclosure-note");
  }

  const eventDates = shows.map((show) => formatVerificationDate(show.last_verified_at)).filter(Boolean);
  if (eventDates.length) {
    const uniqueDates = [...new Set(eventDates)];
    const label = uniqueDates.length === 1 ? uniqueDates[0] : `${uniqueDates[0]} to ${uniqueDates[uniqueDates.length - 1]}`;
    text(panel, "p", `Event links last checked: ${label}.`, "disclosure-note");
  }

  return panel;
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
  text(panel, "h2", links.length ? "Artist-level provider pages" : "Provider links").id = "providerTitle";

  if (!links.length) {
    text(panel, "p", "No artist-level provider page has been verified yet — buttons appear only after destination checks.", "muted");
    const guideNote = document.createElement("p");
    guideNote.className = "muted";
    guideNote.append(
      document.createTextNode("What to check before committing to a ticketing platform: "),
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
    const cta = buttonLink(copy.label, artistProviderHref(artist, item, surface), "primary");
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
  const parsed = new Date(iso);
  if (!Number.isFinite(parsed.getTime())) return "";
  try {
    return parsed.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "UTC" });
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
    const dateStr = formatShowDate(isoField) || "";
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
  text(header, "h2", "Search results").id = "searchSectionTitle";
  text(
    header,
    "p",
    "Search artists, events, and guides we’ve reviewed — by name, city, country, venue, or tour."
  );

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
  // Keep in sync with the homepage template in functions/[[path]].js.
  [
    ["1. Find your show", "Search an artist and pick the verified date that matches your plans.", "/artists", "Browse artists"],
    ["2. Compare snapshots", "See available provider price snapshots for the same event.", "/compare-concert-ticket-prices", "Compare ticket prices"],
    ["3. Confirm and buy", "Open the provider site to confirm the final price, fees, availability, and ticket details.", "/guides/how-to-compare-concert-ticket-prices", "Read the guide"]
  ].forEach(([title, body, href, ctaLabel]) => {
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
  text(header, "h2", "Trust & transparency").id = "trustTitle";
  const panel = document.createElement("div");
  panel.className = "nested-panel";
  text(panel, "p", "TourTicketCompare is independent and unofficial. We do not sell tickets, and every destination passes verification checks before it appears.");
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
  text(copy, "h1", "Compare concert and event ticket prices for the same show.", "hero-title").id = "heroTitle";
  text(
    copy,
    "p",
    "Compare concert and event ticket prices using available provider price snapshots for the same show. Confirm final prices, fees, and availability on the provider site.",
    "hero-subcopy"
  );
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
  const browseCta = buttonLink("Browse artists", "#featured-artists", "secondary");
  browseCta.addEventListener("click", (event) => {
    const target = document.getElementById("featured-artists");
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
  actions.append(
    buttonLink("Compare concert ticket prices", "/compare-concert-ticket-prices", "primary"),
    browseCta,
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
  text(artistHeader, "h2", "Featured artists").id = "homeArtistsTitle";
  text(artistHeader, "p", "Checked upcoming dates and verified event links for every artist we track.");
  const homeEvents = await loadEventsForSearch();
  const grid = document.createElement("div");
  grid.className = "artist-card-grid";
  catalog.artists.forEach((artist) => {
    grid.append(renderArtistCard(artist, homeEvents));
  });
  artists.append(artistHeader, grid);

  main.replaceChildren(hero, resultsSection, renderWhatYouCanDo(), artists, renderGuidePreview(), renderTrustSection());
}


function renderArtistStatusLegend() {
  const legend = document.createElement("div");
  legend.className = "artist-status-legend";
  legend.setAttribute("aria-label", "Artist card status legend");
  const items = [
    ["status-badge", "Checked ticket options", "Verified event ticket links available"],
    ["status-badge", "Artist-level provider page", "No event-specific ticket link verified yet"],
    ["status-badge status-badge-muted", "Buying guidance", "Event links added after review"]
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
  const next = formatCardDate(upcoming[0].dateTimeISO || upcoming[0].datetime_iso);
  if (!next) return null;
  return `Next verified date: ${next} · ${upcoming.length} upcoming ${upcoming.length === 1 ? "date" : "dates"}`;
}

function renderArtistCard(artist, events = []) {
  const article = document.createElement("article");
  const status = artistCardStatus(artist, events);
  article.className = status.pending ? "artist-card is-pending" : "artist-card";
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

function formatShowDate(value) {
  if (!value) return "";
  const parsed = new Date(value);
  if (!Number.isFinite(parsed.getTime())) return "";
  return parsed.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}

// Date badge parts for the compact show card. Keep in sync with
// showDatePartsServer in functions/[[path]].js.
function showDateParts(value) {
  if (!value) return null;
  const parsed = new Date(value);
  if (!Number.isFinite(parsed.getTime())) return null;
  try {
    return {
      weekday: parsed.toLocaleDateString(undefined, { weekday: "short" }),
      day: parsed.toLocaleDateString(undefined, { day: "numeric" }),
      monthYear: parsed.toLocaleDateString(undefined, { month: "short", year: "numeric" })
    };
  } catch (error) {
    return null;
  }
}

function renderShowDateBadge(show) {
  const parts = showDateParts(show.dateTimeISO);
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

// Explicit event-link publishability. CTAs may render only for events whose
// verification_status is an allowed publish state ("human_verified" or
// "machine_high_confidence"); "needs_recheck" suppresses CTAs even when a
// top-level ticketmaster_url is present. Events without an explicit
// verification_status fall back to the legacy human-verified provider flag.
// Keep in sync with eventLinkPublishable in functions/[[path]].js and
// functions/api/out.js.
const PUBLISHABLE_VERIFICATION_STATUSES = new Set(["human_verified", "machine_high_confidence"]);

function eventLinkPublishable(event) {
  const status = String((event && event.verification_status) || "").trim().toLowerCase();
  if (status) return PUBLISHABLE_VERIFICATION_STATUSES.has(status);
  return Boolean(event && event.provider_links && event.provider_links.ticketmaster && event.provider_links.ticketmaster.verified === true);
}

// Per-provider event publishability. Ticketmaster follows the event-level
// verification_status above. A SeatGeek event CTA may additionally publish on
// a needs_recheck event when the SeatGeek link carries its own verified
// provenance (provider_links.seatgeek.verified === true) — the recheck flag
// tracks the Ticketmaster storefront URL, not the SeatGeek listing. Keep in
// sync with providerEventPublishable in functions/[[path]].js and
// functions/api/out.js.
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
function renderProviderCtaButton(name, href, amount, isLower = false, analytics = {}) {
  const cta = document.createElement("a");
  cta.className = `provider-cta${amount ? " provider-cta-priced" : ""}${isLower ? " provider-cta-lower" : ""}`;
  cta.href = href;
  cta.target = "_blank";
  cta.rel = "noopener";
  // Analytics dimensions for the delegated provider_click listener: artist,
  // event, provider, snapshot present/absent, and CTA location.
  cta.dataset.ctaProvider = analytics.provider || slugify(name);
  cta.dataset.ctaArtist = analytics.artistSlug || "";
  cta.dataset.ctaShowId = analytics.showId || "";
  cta.dataset.ctaPriceSnapshot = amount ? "present" : "absent";
  cta.dataset.ctaLocation = analytics.ctaLocation || "event_card";
  const nameCell = text(cta, "span", name, "provider-cta-name");
  if (isLower) text(nameCell, "span", "Lowest listed snapshot", "provider-cta-lowtag");
  text(cta, "span", amount || "Check prices", `provider-cta-value${amount ? " provider-cta-price" : " provider-cta-check"}`);
  return cta;
}

// Splits normalized CTA specs into priced snapshots and CTA-only providers, and
// orders the priced group transparently: currency code, then listed snapshot
// price ascending. CTA-only providers keep the fixed provider display order and
// are never mixed into the priced snapshot ordering. Keep in sync with
// splitAndSortCtaSpecs in functions/[[path]].js.
function splitAndSortCtaSpecs(ctaSpecs) {
  const priced = ctaSpecs.filter((spec) => spec.priceAmount && spec.lane);
  const unpriced = ctaSpecs.filter((spec) => !(spec.priceAmount && spec.lane));
  priced.sort((a, b) =>
    a.lane.currency === b.lane.currency
      ? a.lane.price - b.lane.price
      : a.lane.currency < b.lane.currency ? -1 : 1
  );
  return { priced, unpriced };
}

// The single lowest-priced snapshot among those currently displayed — only when
// at least two priced lanes share one currency and the lowest is unique. This
// is a claim about the displayed timestamped snapshots for this exact event,
// never about live inventory or fees-inclusive totals. Keep in sync with
// lowestDisplayedSnapshotSpec in functions/[[path]].js.
function lowestDisplayedSnapshotSpec(pricedSpecs) {
  if (pricedSpecs.length < 2) return null;
  const currencies = new Set(pricedSpecs.map((spec) => spec.lane.currency));
  if (currencies.size !== 1) return null;
  let lowest = pricedSpecs[0];
  for (const spec of pricedSpecs) {
    if (spec.lane.price < lowest.lane.price) lowest = spec;
  }
  const ties = pricedSpecs.filter((spec) => spec.lane.price === lowest.lane.price);
  return ties.length === 1 ? lowest : null;
}

// Required snapshot disclosures for every price shown on a button, rendered
// once beneath the button group. Provider names appear here only from actual
// approved, fresh lanes. The SeatGeek/Vivid Seats side-by-side comparison
// branch is retained but inert today: SeatGeek is CTA-only (its API supplies
// no numeric pricing stats), so no SeatGeek lane ever passes the gates.
function renderShowCardPriceNotes(ctaSpecs, comparison) {
  const priced = ctaSpecs.filter((spec) => spec.priceAmount && spec.priceAsOf);
  if (!priced.length) return null;
  const wrap = document.createElement("div");
  wrap.className = "provider-cta-notes";
  const handled = new Set();
  if (comparison) {
    const seatGeek = ctaSpecs.find((spec) => spec.provider === "seatgeek");
    const vividSeats = ctaSpecs.find((spec) => spec.provider === "vivid-seats");
    if (comparison.sameCurrency && comparison.lowerProvider && comparison.delta !== null) {
      const difference = formatProviderPrice(comparison.delta, comparison.seatGeek.currency);
      if (difference) text(wrap, "p", `${comparison.lowerProvider} has the lower listed price snapshot by ${difference}.`, "price-compare-note");
    } else if (comparison.sameCurrency) {
      text(wrap, "p", "Both providers show the same listed price snapshot.", "price-compare-note");
    } else {
      text(wrap, "p", "The snapshots use different currencies, so no price difference is calculated.", "price-compare-note");
    }
    text(wrap, "p", `SeatGeek price snapshot as of ${seatGeek.priceAsOf}; Vivid Seats price snapshot as of ${vividSeats.priceAsOf}. Prices exclude fees.`, "disclosure-note");
    handled.add("seatgeek");
    handled.add("vivid-seats");
  }
  // Condensed per-provider snapshots: one short "Provider · timestamp" line
  // each, with a single shared fees disclosure instead of repeating it per row.
  const perProvider = priced.filter((spec) => !handled.has(spec.provider));
  for (const spec of perProvider) {
    text(wrap, "p", `${spec.name} · ${spec.priceAsOf}`, "disclosure-note snapshot-line");
  }
  const lowest = lowestDisplayedSnapshotSpec(priced);
  if (lowest && !handled.has(lowest.provider)) {
    text(wrap, "p", `${lowest.name} shows the lowest listed-price snapshot currently displayed for this event.`, "price-compare-note");
  }
  if (priced.length > 1) {
    text(wrap, "p", "Snapshots are ordered lowest listed price first within each currency.", "disclosure-note snapshot-sort");
  }
  if (perProvider.length) text(wrap, "p", "Timestamped provider-listed price snapshots — not live inventory or availability, and prices exclude fees. Confirm the final total, fees, and availability at provider checkout.", "disclosure-note snapshot-fees");
  return wrap;
}

function approvedProviderPriceComparison(show) {
  const seatGeek = approvedSeatGeekPriceLane(show);
  const vividSeats = approvedVividSeatsPriceLane(show);
  if (!seatGeek || !vividSeats) return null;

  const sameCurrency = seatGeek.currency === vividSeats.currency;
  const delta = sameCurrency ? Number(Math.abs(seatGeek.price - vividSeats.price).toFixed(2)) : null;
  const lowerProvider = sameCurrency
    ? seatGeek.price < vividSeats.price
      ? "SeatGeek"
      : vividSeats.price < seatGeek.price
        ? "Vivid Seats"
        : null
    : null;

  return { seatGeek, vividSeats, sameCurrency, delta, lowerProvider };
}

function renderShowCard(show, options = {}) {
  const article = document.createElement("article");
  article.className = "info-card show-card";
  const anchorId = showAnchorId(show);
  if (anchorId) article.id = anchorId;

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
    const artistName = String(options.artistName || show.artist_name || "").trim();
    if (eventName && eventName.toLowerCase() !== artistName.toLowerCase()) {
      text(body, "p", eventName, "show-card-sub muted");
    }
  } else {
    text(body, "h3", eventName || show.artist_name || titleFallback, "show-card-title");
    text(body, "p", location || "City and venue details are shown only when verified by the source.", "show-card-sub muted");
  }
  const venueRun = options.venueRuns?.[String(show.id || "")];
  if (venueRun) {
    text(body, "p", `Show ${venueRun.position} of ${venueRun.total} at this venue`, "show-card-run muted");
  }
  if (!dateBadge) {
    const date = formatShowDate(show.dateTimeISO);
    if (date) text(body, "p", date, "card-status");
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
      // Lower-price highlight only when SeatGeek and Vivid Seats are both
      // priced — currently never, since SeatGeek has no numeric snapshot lane.
      const seatGeekSpec = ctaSpecs.find((spec) => spec.provider === "seatgeek");
      const vividSeatsSpec = ctaSpecs.find((spec) => spec.provider === "vivid-seats");
      const comparison = seatGeekSpec?.priceAmount && vividSeatsSpec?.priceAmount ? approvedProviderPriceComparison(show) : null;

      // Priced snapshots render first, sorted lowest listed price first within
      // each currency and labelled as timestamped snapshots; CTA-only providers
      // (no approved fresh numeric snapshot) render in a separate labelled group
      // so they are never presented as priced snapshot rows. Only the unique
      // lowest displayed snapshot in a single shared currency is highlighted.
      // Keep in sync with renderShowCardServerHtml in functions/[[path]].js.
      const analyticsBase = {
        artistSlug: String(options.artistSlug || show.artist_slug || "").trim(),
        showId: String(show.id || "").trim(),
        ctaLocation: options.ctaLocation || "event_card"
      };
      const primary = ctaSpecs.find((spec) => spec.provider === "seatgeek");
      const secondary = ctaSpecs.filter((spec) => spec !== primary);
      const { priced, unpriced } = splitAndSortCtaSpecs(secondary);
      const lowestSpec = lowestDisplayedSnapshotSpec(priced);
      const ctaGroup = document.createElement("div");
      ctaGroup.className = "provider-cta-group";
      const appendSpecs = (specs) => {
        for (const spec of specs) {
          ctaGroup.append(renderProviderCtaButton(spec.name, spec.href, spec.priceAmount || "", spec === lowestSpec, { ...analyticsBase, provider: spec.provider }));
        }
      };
      if (primary) {
        text(ctaGroup, "p", "Primary provider", "provider-cta-group-label");
        appendSpecs([primary]);
      }
      if (priced.length) {
        text(ctaGroup, "p", "Listed-price snapshots — timestamped, not live availability", "provider-cta-group-label");
        appendSpecs(priced);
        if (unpriced.length) {
          text(ctaGroup, "p", "More providers — no current price snapshot", "provider-cta-group-label provider-cta-group-label-secondary");
          appendSpecs(unpriced);
        }
      } else if (!primary) {
        appendSpecs(unpriced);
      }
      body.append(ctaGroup);

      const notes = renderShowCardPriceNotes(ctaSpecs, comparison);
      if (notes) body.append(notes);
    } else {
      text(body, "p", "No verified ticket link is available for this date.", "disclosure-note");
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

// Zero-event board state. The primary CTA is the artist-level page of the
// highest-ranked enabled provider (never an event-level ticket link — no
// verified dates exist to sell). Keep in sync with
// renderShowBoardEmptyStateHtml in functions/[[path]].js.
function renderShowBoardEmptyState(artistName = "", artistSlug = "") {
  const name = String(artistName || "").trim() || "artist";
  const wrap = document.createElement("div");
  wrap.className = "empty-state";
  text(wrap, "h3", "No upcoming dates listed yet");
  text(
    wrap,
    "p",
    `We list upcoming ${name} dates once the ticket destination is verified — new dates appear here first.`,
    "muted"
  );
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
    form.dataset.watchlistShell = artistSlug;
    text(form, "h4", `Join the ${name} watchlist`);
    text(form, "p", `Leave an email and we'll let you know when verified ${name} dates and checked ticket links are listed.`, "muted");
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
    submit.type = "button";
    submit.disabled = true;
    submit.textContent = "Enable JavaScript to join";
    row.append(email, honeypot, submit);
    form.append(label, row);
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
    const providerCta = buttonLink(`Check ${providerName} for updates`, `/api/out?${params.toString()}`, "primary");
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

  const apply = () => {
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
    if (!visible.length) {
      grid.replaceChildren(renderShowFilterEmptyState(resetFilters));
      return;
    }
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
    apply();
  }

  searchInput.addEventListener("input", () => {
    state.query = searchInput.value.trim();
    apply();
  });
  if (countrySelect) {
    countrySelect.addEventListener("change", () => {
      state.country = countrySelect.value;
      refreshCityOptions();
      apply();
    });
  }
  if (citySelect) {
    citySelect.addEventListener("change", () => {
      state.city = citySelect.value;
      apply();
    });
  }
  sortSelect.addEventListener("change", () => {
    state.sort = sortSelect.value;
    apply();
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
    text(filterIntro, "p", "Filter by city, country, venue, or tour, then open the checked event link that matches your plans.", "muted");
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
      grid.replaceChildren(renderShowBoardEmptyState(filters.artistName, filters.artistSlug));
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
      grid.replaceChildren(renderShowBoardEmptyState(filters.artistName, filters.artistSlug));
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
  text(section, "h1", "Artist watchlist").id = "artistsTitle";
  text(
    section,
    "p",
    "Find an artist, then open the checked ticket options and upcoming dates we can verify.",
    "lead"
  );
  text(
    section,
    "p",
    "Coverage varies by artist and region. We publish ticket links only after the artist, date, venue, and destination have been checked.",
    "disclosure-note"
  );
  const events = await loadEventsForSearch();
  const grid = document.createElement("div");
  grid.className = "artist-card-grid";
  catalog.artists.forEach((artist) => grid.append(renderArtistCard(artist, events)));
  section.append(renderArtistStatusLegend(), grid);
  main.replaceChildren(section);
}

function renderArtist(artist) {
  const isReviewRequired = artist.indexing_status !== "indexable_with_substantial_content";
  setMeta(
    {
      title: artist.seo_title || `${artist.name} Tickets | Options & Availability`,
      description:
        artist.meta_description ||
        `Check ${artist.name} ticket options through verified provider links, with practical buying guidance and clear transparency.`
    },
    isReviewRequired
  );

  const section = document.createElement("section");
  section.className = "content-page artist-page";
  section.setAttribute("aria-labelledby", "artistTitle");
  section.append(renderBreadcrumb([{ label: "Home", href: "/" }, { label: "Artists", href: "/artists" }, { label: artist.name }]));
  text(section, "h1", artistPageHeading(artist)).id = "artistTitle";
  text(section, "p", artistPageIntro(artist), "lead");
  if (isReviewRequired) {
    const reviewNotice = document.createElement("section");
    reviewNotice.className = "nested-panel review-notice";
    text(reviewNotice, "p", "This artist page is currently under review. Event details are shown for reference while ticket links are checked.", "disclosure-note");
    section.append(reviewNotice);
  }
  // Keep this intro in sync with renderShowBoardServerHtml in functions/[[path]].js.
  const showBoard = renderShowBoardShell(
    "artistShowBoard",
    "Upcoming shows",
    "Pick a date, compare available price snapshots, then confirm final prices and fees on the provider site.",
    "Some links earn us a commission — this never affects your price."
  );
  const serverShows = Array.from(main.querySelectorAll("article.show-card[data-show-json]")).map((card) => {
    try {
      return JSON.parse(card.getAttribute("data-show-json") || "{}");
    } catch (error) {
      return {};
    }
  });
  const verificationPanel = buildVerificationDisclosurePanel(artist, serverShows);
  const providerPanel = renderProviderButtons(artist, "artist_page");
  if (serverShows.length) {
    section.append(showBoard, providerPanel, verificationPanel);
  } else {
    section.append(providerPanel, showBoard, verificationPanel);
  }

  const summary = document.createElement("section");
  summary.className = "split-section";
  const left = document.createElement("div");
  text(left, "h2", `About ${artist.name}`);
  text(left, "p", artist.factual_summary);
  const right = document.createElement("div");
  text(right, "h2", "Ticket link status");
  text(right, "p", artist.ticket_buying_notes);
  summary.append(left, right);

  let demand = null;
  if (typeof artist.why_demand_is_high === "string" && artist.why_demand_is_high.trim()) {
    demand = document.createElement("section");
    demand.className = "nested-panel";
    text(demand, "h2", "Why demand may be high");
    text(demand, "p", artist.why_demand_is_high);
  }

  const checklist = document.createElement("section");
  checklist.className = "nested-panel";
  text(checklist, "h2", "Before you buy");
  checklist.append(
    createList(
      [
        "Check the final price including all fees.",
        "Check the seat location and any view restrictions.",
        "Check delivery, refund, and resale terms on the provider site."
      ],
      "check-list"
    )
  );

  let relatedGuides = null;
  const relatedGuidePages = (Array.isArray(artist.related_guides) ? artist.related_guides : [])
    .slice(0, 4)
    .map((slug) => guidePages.find((guide) => guide.slug === slug))
    .filter(Boolean);
  if (relatedGuidePages.length) {
    relatedGuides = document.createElement("section");
    relatedGuides.className = "nested-panel";
    text(relatedGuides, "h2", "Related guides");
    text(relatedGuides, "p", "Learn how to compare prices, understand ticket types, spot scams, and make smart timing decisions:");
    const relatedList = document.createElement("ul");
    relatedList.className = "guide-link-list";
    relatedGuidePages.forEach((guide) => {
      const item = document.createElement("li");
      item.append(link(guide.h1, `/guides/${guide.slug}`));
      relatedList.append(item);
    });
    relatedGuides.append(relatedList);
  }

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

  section.append(
    summary,
    ...(demand ? [demand] : []),
    checklist,
    ...(relatedGuides ? [relatedGuides] : []),
    usefulLinks,
    renderArtistFaq(artist)
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
  text(
    section,
    "p",
    "TourTicketCompare is an independent, unofficial ticket research site that helps fans find checked ticket options, compare available provider price snapshots for the same event, and use practical buying guidance. We do not sell tickets and only link out to destinations we have checked.",
    "lead"
  );

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
    text(section, "h1", "Contact TourTicketCompare");
    text(
      section,
      "p",
      "Use this page to report broken links, incorrect event details, provider-link issues, or general feedback about TourTicketCompare.",
      "lead"
    );

    const contactRoutes = document.createElement("section");
    contactRoutes.className = "nested-panel";
    text(contactRoutes, "h2", "Where to contact us");
    const routeCopy = document.createElement("p");
    routeCopy.append(
      document.createTextNode("For quick public updates or messages, contact "),
      link("@RenaissanceWT", "https://x.com/RenaissanceWT", "text-link"),
      document.createTextNode(" or "),
      link("@CowboyCarterWT", "https://x.com/CowboyCarterWT", "text-link"),
      document.createTextNode(" on X. You can also email "),
      link("hello@tourticketcompare.com", "mailto:hello@tourticketcompare.com", "text-link"),
      document.createTextNode(".")
    );
    contactRoutes.append(routeCopy);

    const reasons = document.createElement("section");
    reasons.className = "nested-panel";
    text(reasons, "h2", "Useful reasons to get in touch");
    reasons.append(
      createList(
        [
          "A ticket button is broken or opens the wrong destination.",
          "An event date, venue, city, or artist detail appears incorrect.",
          "A provider link works differently than expected.",
          "You have general feedback about the site, guides, or artist pages."
        ],
        "check-list"
      )
    );

    const details = document.createElement("section");
    details.className = "nested-panel";
    text(details, "h2", "What to include");
    text(
      details,
      "p",
      "Please include the artist name, event date, venue or city, the page URL, the ticket link if relevant, and a short explanation of what looks wrong."
    );

    const limits = document.createElement("section");
    limits.className = "nested-panel";
    text(limits, "h2", "What we cannot handle");
    text(
      limits,
      "p",
      "TourTicketCompare does not sell tickets and cannot help with ticket orders, refunds, transfers, delivery problems, payment issues, or provider account access. For those issues, contact the ticket provider directly."
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
      "TourTicketCompare is an independent, unofficial site that helps fans research tickets for major live music tours.",
      "lead"
    );

    const whatWeDo = document.createElement("section");
    whatWeDo.className = "nested-panel";
    text(whatWeDo, "h2", "What we do");
    whatWeDo.append(
      createList(
        [
          "Collect verified ticket links for major artists so you have a reliable starting point.",
          "Show event-specific ticket links only when the artist, date, venue, and destination have been checked.",
          "Compare approved, timestamped provider listed-price snapshots for the same verified event when the lanes pass source and freshness checks.",
          "Publish plain buying guides on fees, resale, delivery timing, and what to confirm before checkout."
        ],
        "check-list"
      )
    );

    const whatWeDont = document.createElement("section");
    whatWeDont.className = "nested-panel";
    text(whatWeDont, "h2", "What we do not do");
    whatWeDont.append(
      createList(
        [
          "Sell or resell tickets.",
          "Present snapshots as live inventory, promises of availability, or final checkout totals.",
          "Rank a provider as universally lower-priced or better.",
          "Invent tour dates, venues, prices, or availability."
        ],
        "check-list"
      )
    );

    const affiliateNote = document.createElement("section");
    affiliateNote.className = "nested-panel";
    text(affiliateNote, "h2", "Why affiliate links do not change our standards");
    text(
      affiliateNote,
      "p",
      "Some links are affiliate links, so we may earn a commission when you buy. That never decides which links we show. A link only appears once its destination has been checked, whether or not it earns us anything."
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
      "TourTicketCompare publishes artist and ticket-link information only when the source can be checked. These are the editorial rules we follow before anything appears on the site.",
      "lead"
    );

    const whatWePublish = document.createElement("section");
    whatWePublish.className = "nested-panel";
    text(whatWePublish, "h2", "What we publish");
    whatWePublish.append(
      createList(
        [
          "Artist watchlist pages for major tours, with factual artist summaries drawn from confirmed public sources.",
          "Verified provider destinations, such as artist-level links to official ticketing sites.",
          "Event-specific ticket links where the event date, venue, and destination have been checked.",
          "Fresh, provider-attributed listed-price snapshots for the same verified event, including a lower-snapshot comparison only when the lanes pass their source and freshness gates.",
          "Practical buying guides on fees, resale, delivery timing, and what to confirm before checkout."
        ],
        "check-list"
      )
    );

    const whatWeVerify = document.createElement("section");
    whatWeVerify.className = "nested-panel";
    text(whatWeVerify, "h2", "What we verify before showing ticket links");
    text(
      whatWeVerify,
      "p",
      "A ticket button appears only when the artist is a known, verified artist, the destination is a configured verified link, and the link passes our outbound safety checks. Event-specific buttons additionally require a verified event record with a confirmed date, venue, and artist. We use official artist, ticketing, and approved affiliate sources where available, and we show a clear empty state when no verified link exists."
    );

    const whatWeDont = document.createElement("section");
    whatWeDont.className = "nested-panel";
    text(whatWeDont, "h2", "What we do not publish");
    whatWeDont.append(
      createList(
        [
          "Invented tour dates, venues, or cities.",
          "Ticket prices, availability, or inventory status we cannot confirm from an approved source.",
          "Provider partnership or coverage claims we cannot confirm.",
          "Fake comparison tables, placeholder pricing, or a comparison that lacks fresh approved snapshots for both providers.",
          "Listings obtained by scraping ticket providers or other sites.",
          "Savings, discount, or value claims we cannot support with approved provider data.",
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
  text(panel, "h1", "Compare Concert Ticket Prices");
  text(
    panel,
    "p",
    "Compare concert ticket prices across trusted ticket sites. Browse artist pages for checked event links, then confirm final prices, fees, availability, and ticket terms on the provider site before buying.",
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

  sendAnalytics("page_view", {
    routeType: current.type,
    artistSlug: current.artist?.slug || "",
    guideSlug: current.guide?.slug || ""
  });
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
document.addEventListener("click", (event) => {
  const cta = event.target?.closest?.("a[data-cta-provider]");
  if (!cta) return;
  const provider = String(cta.dataset.ctaProvider || "").trim();
  if (!provider) return;
  const showId = String(cta.dataset.ctaShowId || "").trim();
  sendAnalytics("provider_click", {
    provider,
    artistSlug: String(cta.dataset.ctaArtist || "").trim(),
    showId,
    priceSnapshot: cta.dataset.ctaPriceSnapshot === "present" ? "present" : "absent",
    ctaLocation: String(cta.dataset.ctaLocation || "").trim(),
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
    setStatus("Enter an email address to join the watchlist.");
    return;
  }
  setStatus("Adding you to the watchlist…");
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
      setStatus("You're on the watchlist — we'll email you when verified dates are listed.");
      if (emailInput) emailInput.value = "";
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

function activateWatchlistForms() {
  document.querySelectorAll("form[data-watchlist-shell]").forEach((form) => {
    const artistSlug = String(form.dataset.watchlistShell || "").trim();
    const button = form.querySelector('button[type="button"]');
    if (!artistSlug || !button) return;
    form.dataset.watchlistSignup = artistSlug;
    button.type = "submit";
    button.disabled = false;
    button.textContent = "Notify me";
  });
}

render().then(activateWatchlistForms);
