let fallbackCatalog = { artists: [], tours: [], providers: [], ticket_links: [] };

const providerCopy = {
  ticketmaster: {
    name: "Ticketmaster",
    label: "Open Ticketmaster artist page"
  },
  seatgeek: {
    name: "SeatGeek",
    label: "Open SeatGeek artist page"
  },
  "vivid-seats": {
    name: "Vivid Seats",
    label: "Open Vivid Seats artist page"
  }
};

const guidePages = [
  {
    slug: "how-to-compare-concert-ticket-prices",
    title: "How to Compare Concert Ticket Prices Safely | TourTicketCompare",
    description: "Learn how to compare concert ticket prices by checking final checkout totals, fees, seat details, delivery terms, and provider rules before you buy.",
    h1: "How to Compare Concert Ticket Prices Safely",
    serverRendered: true
  },
  {
    slug: "ticketmaster-vs-seatgeek-vs-vivid-seats",
    title: "Why Ticket Prices Vary Between Sites | TourTicketCompare",
    description: "Understand why concert ticket prices can vary between ticket sites because of fees, inventory type, demand, seat location, delivery, and seller terms.",
    h1: "Why do prices vary between ticket sites?",
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
      "ticketmaster-vs-seatgeek-vs-vivid-seats"
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
    title: "Find Verified Ticket Options for Major Tours | TourTicketCompare",
    description:
      "Find checked ticket links for major tours, read practical buying guidance, and confirm final prices and fees on the ticket provider site."
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
    if (!eventLinkPublishable(event)) return false;
    const ts = Date.parse(event.dateTimeISO || event.datetime_iso || "");
    if (!Number.isFinite(ts) || ts < now) return false;
    const url = String(event.ticketmaster_url || "").trim();
    if (!/^https:\/\//i.test(url)) return false;
    try {
      return new URL(url).hostname.includes(".");
    } catch (error) {
      return false;
    }
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
  return `${artist.name} ticket links and buying guidance`;
}

function artistPageIntro(artist) {
  return `Checked ticket links for ${artist.name} dates, plus what to confirm about fees, seats, and resale before you buy.`;
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
  text(panel, "h2", "Verification and disclosure");
  const summary = document.createElement("ul");
  summary.className = "check-list";
  // Single consolidated trust block. Keep in sync with
  // renderVerificationDisclosure in functions/[[path]].js.
  [
    "TourTicketCompare is independent and unofficial. We do not sell or resell tickets.",
    "We only show ticket destinations that pass our verification checks.",
    "We do not display ticket prices or guarantee availability. Prices, availability, fees, and delivery details can change quickly. Always confirm the final price and ticket terms on the provider site before buying.",
    "Some links may earn us a commission. That never changes which links we show."
  ].forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    summary.append(li);
  });
  panel.append(summary);

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
const PROVIDER_DISPLAY_ORDER = ["seatgeek", "vivid-seats", "ticketmaster"];

function providerDisplayRank(providerSlug) {
  const rank = PROVIDER_DISPLAY_ORDER.indexOf(providerSlug);
  return rank === -1 ? PROVIDER_DISPLAY_ORDER.length : rank;
}

function renderProviderButtons(artist, surface) {
  const links = ticketLinksForArtist(artist.slug)
    .filter((item) => providerEnabled(slugify(item.provider)))
    .sort((a, b) => providerDisplayRank(slugify(a.provider)) - providerDisplayRank(slugify(b.provider)));
  const panel = document.createElement("section");
  panel.className = "provider-panel";
  panel.setAttribute("aria-labelledby", "providerTitle");
  text(panel, "h2", "Provider links").id = "providerTitle";

  if (!links.length) {
    text(panel, "p", "No provider artist page link is currently available for this artist. Ticket buttons for provider artist pages appear only after destination checks. Event-level links, where shown, come from ticket data sources and have not been confirmed as verified destinations.", "muted");
    const guideNote = document.createElement("p");
    guideNote.className = "muted";
    guideNote.append(
      document.createTextNode("These guides cover what to check before committing to a ticketing platform: "),
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

  text(panel, "p", "These links go to provider artist pages. Event-specific buttons appear only on verified show cards.", "muted");
  const actions = document.createElement("div");
  actions.className = "provider-actions";
  links.forEach((item) => {
    const providerSlug = slugify(item.provider);
    const copy = providerCopy[providerSlug] || { name: item.provider, label: `Open ${item.provider} artist page` };
    const card = document.createElement("article");
    card.className = "provider-card";
    text(card, "h3", copy.name);
    text(card, "p", "Prices, availability, fees, and delivery details can change quickly. Always confirm the final price and ticket terms on the provider site before buying.");
    const params = new URLSearchParams({
      artistSlug: artist.slug,
      provider: providerSlug,
      sourcePath: window.location.pathname,
      surface
    });
    if (item.tour_slug) params.set("tourSlug", item.tour_slug);
    const cta = buttonLink(copy.label, `/api/out?${params.toString()}`, "primary");
    cta.addEventListener("click", () => {
      sendAnalytics("provider_click", {
        artistSlug: artist.slug,
        provider: providerSlug,
        linkId: item.link_id || "",
        surface
      });
    });
    card.append(cta);
    const verificationNote = providerVerificationNote(item);
    if (verificationNote) {
      text(card, "p", verificationNote, "disclosure-note");
    }
    actions.append(card);
  });
  panel.append(actions);
  text(
    panel,
    "p",
    "Some links are affiliate links. This does not change your price. Prices, availability, fees, and delivery details can change quickly. Always confirm the final price and ticket terms on the provider site before buying.",
    "disclosure-note"
  );
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
    const showId = String(data.id || "").trim();
    const eventCtaCandidates = [
      {
        provider: "seatgeek",
        label: "Open verified SeatGeek event link",
        available: providerEventPublishable(data, "seatgeek") && Boolean(safeSeatGeekEventUrl(data.seatgeek_url))
      },
      {
        provider: "vivid-seats",
        label: "Open verified Vivid Seats event link",
        available: providerEventPublishable(data, "vivid-seats") && Boolean(safeVividSeatsEventUrl(data.vividseats_url))
      },
      {
        provider: "ticketmaster",
        label: "Open verified event link",
        available: eventLinkPublishable(data) && Boolean(safeVerifiedEventUrl(data.ticketmaster_url))
      }
    ];
    const eventCta = showId ? eventCtaCandidates.find((candidate) => candidate.available) : null;
    if (eventCta) {
      const params = new URLSearchParams({ showId, provider: eventCta.provider });
      ctaHref = `/api/out?${params.toString()}`;
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
  text(header, "h2", "What you can do here").id = "whatYouCanDoTitle";
  const grid = document.createElement("div");
  grid.className = "card-grid";
  // Keep in sync with the homepage template in functions/[[path]].js.
  [
    ["Find your show", "Browse an artist's checked dates and filter by city, country, or venue to reach the right event page fast.", "/artists", "Browse artists"],
    ["Understand fees and totals", "Service and delivery fees change the final total. Learn how to check what you will actually pay before checkout.", "/guides/how-to-compare-concert-ticket-prices", "Read the guide"],
    ["Avoid risky listings", "Spot resale red flags, fake urgency, and scam patterns before you hand over payment details.", "/guides/how-to-avoid-ticket-scams", "Read the guide"]
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
  text(panel, "p", "TourTicketCompare is independent and unofficial. We do not sell tickets.");
  text(panel, "p", "We only show ticket destinations that pass our verification checks.");
  text(panel, "p", "Some links may earn us a commission. That never changes which links we show, or the price you pay.");
  text(panel, "p", "Prices, availability, fees, and delivery details can change quickly. Always confirm the final price and ticket terms on the provider site before buying.");
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
  text(copy, "h1", "Find checked ticket options for major tours", "hero-title").id = "heroTitle";
  text(
    copy,
    "p",
    "Compare ticket options safely before you buy. Open verified provider links and confirm final prices, fees, availability, seat details, and delivery terms on the ticket provider site.",
    "hero-subcopy"
  );
  text(
    copy,
    "p",
    "Current checked event coverage is strongest in the United States, with selected UK, Europe, and Canada dates where verified links are available.",
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
  text(artistHeader, "p", "Every artist page lists checked upcoming dates, with links to the exact event page where one is verified.");
  const homeEvents = await loadEventsForSearch();
  const grid = document.createElement("div");
  grid.className = "artist-card-grid";
  catalog.artists.forEach((artist) => {
    grid.append(renderArtistCard(artist, homeEvents));
  });
  artists.append(artistHeader, renderArtistStatusLegend(), grid);

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
  if (artist.short_description) {
    text(article, "p", artist.short_description, "muted");
  }
  const statusRow = document.createElement("div");
  statusRow.className = "artist-status-row";
  text(statusRow, "p", status.badge, status.badgeClass);
  text(statusRow, "p", status.detail, "status-chip-detail");
  article.append(statusRow);
  const showSummary = status.pending ? null : upcomingVerifiedShowSummary(events, artist.slug);
  text(article, "p", showSummary || status.cardStatus, "card-status");
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
  if (provider === "seatgeek" && Boolean(event && event.provider_links && event.provider_links.seatgeek && event.provider_links.seatgeek.verified === true)) return true;
  if (provider === "vivid-seats" && Boolean(event && event.provider_links && event.provider_links["vivid-seats"] && event.provider_links["vivid-seats"].verified === true)) return true;
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

function renderShowCard(show, options = {}) {
  const article = document.createElement("article");
  article.className = "info-card show-card";
  const titleFallback = show.city ? `Show – ${show.city}` : "Upcoming show";
  text(article, "h3", show.event_name || show.artist_name || titleFallback);
  const date = formatShowDate(show.dateTimeISO);
  if (date) text(article, "p", date, "card-status");
  const location = showLocation(show);
  text(article, "p", location || "City and venue details are shown only when verified by the source.", "muted");

  const eventVerifiedDate = formatVerificationDate(show.last_verified_at);
  if (options.reviewGated) {
    text(article, "p", "Ticket links for this artist are still being reviewed. We do not show buy buttons until the destination has been checked.", "disclosure-note");
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
    if (tmAvailable || sgAvailable || vsAvailable) {
      if (eventVerifiedDate) {
        text(article, "p", `Event last checked: ${eventVerifiedDate}.`, "disclosure-note");
      }
      // The generic provider disclosure lives once in the show-board intro
      // instead of repeating on every card. The SeatGeek/Vivid Seats notes
      // stay per-card (smoke-asserted resale caution).
      const ctaSpecs = [];
      if (sgAvailable) {
        ctaSpecs.push({ provider: "seatgeek", primaryLabel: "Check latest price on SeatGeek", secondaryLabel: "Check SeatGeek" });
      }
      if (vsAvailable) {
        ctaSpecs.push({ provider: "vivid-seats", primaryLabel: "Check latest price on Vivid Seats", secondaryLabel: "Check Vivid Seats" });
      }
      if (tmAvailable) {
        ctaSpecs.push({ provider: "ticketmaster", primaryLabel: "Check Ticketmaster", secondaryLabel: "Check Ticketmaster" });
      }
      const buttons = ctaSpecs.map((spec, index) => {
        const params = new URLSearchParams({ showId, provider: spec.provider });
        const cta = buttonLink(index === 0 ? spec.primaryLabel : spec.secondaryLabel, `/api/out?${params.toString()}`, index === 0 ? "primary" : "secondary");
        cta.target = "_blank";
        cta.rel = "noopener";
        return cta;
      });
      if (buttons.length > 1) {
        const ctaGroup = document.createElement("div");
        ctaGroup.className = "cta-group";
        ctaGroup.append(...buttons);
        article.append(ctaGroup);
      } else {
        article.append(buttons[0]);
      }
      if (sgAvailable) {
        text(
          article,
          "p",
          "SeatGeek sets prices, fees, availability, and checkout terms. Confirm details on SeatGeek before purchase.",
          "disclosure-note"
        );
      }
      if (vsAvailable) {
        text(
          article,
          "p",
          "Vivid Seats sets prices, fees, availability, and checkout terms. Confirm details on Vivid Seats before purchase.",
          "disclosure-note"
        );
      }
    } else {
      text(article, "p", "No verified ticket link is available for this date.", "disclosure-note");
    }
  } else if (show.artist_slug) {
    article.append(link("Open artist page", `/artists/${slugify(show.artist_slug)}`, "text-link"));
  }
  return article;
}

function safeShowList(data) {
  return Array.isArray(data?.shows) ? data.shows.filter((show) => show && typeof show === "object") : [];
}

function renderShowBoardEmptyState(artistName = "") {
  const name = String(artistName || "").trim() || "these artists";
  const wrap = document.createElement("div");
  wrap.className = "empty-state";
  text(wrap, "h3", "No event-specific ticket links verified yet");
  text(
    wrap,
    "p",
    `We are not publishing upcoming ${name} dates or event-specific ticket buttons until the ticket destination has been checked. If an artist-level provider page is available, you can use it below to check the provider directly.`,
    "muted"
  );
  text(
    wrap,
    "p",
    "TourTicketCompare does not publish unverified dates or fake prices. While you wait, use the buying guides to compare final checkout totals, fees, delivery terms, and resale protections safely.",
    "muted"
  );
  const actions = document.createElement("div");
  actions.className = "action-row";
  actions.append(
    buttonLink("Browse artists with ticket links", "/artists", "secondary"),
    buttonLink("Read ticket buying guide", "/guides/how-to-compare-concert-ticket-prices", "secondary")
  );
  wrap.append(actions);
  return wrap;
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
  wrap.append(reset);
  return wrap;
}

// Filters only decide which verified shows render; every card still goes through
// renderShowCard with unchanged options, so CTA eligibility is untouched.
function setupShowBoardFilters(section, grid, shows, cardOptions) {
  const state = { query: "", country: "", city: "", sort: "soonest" };
  const countries = uniqueShowValues(shows, "country");
  const cities = uniqueShowValues(shows, "city");

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

  let countrySelect = null;
  if (countries.length > 1) {
    countrySelect = document.createElement("select");
    countrySelect.className = "show-filter-select";
    countrySelect.setAttribute("aria-label", "Filter by country");
    setSelectOptions(countrySelect, countries, "All countries", "");
  }

  let citySelect = null;
  if (cities.length > 1) {
    citySelect = document.createElement("select");
    citySelect.className = "show-filter-select";
    citySelect.setAttribute("aria-label", "Filter by city");
    setSelectOptions(citySelect, cities, "All cities", "");
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

  const refreshCityOptions = () => {
    if (!citySelect) return;
    const source = state.country
      ? shows.filter((show) => String(show?.country || "").trim() === state.country)
      : shows;
    const values = uniqueShowValues(source, "city");
    if (state.city && !values.includes(state.city)) state.city = "";
    setSelectOptions(citySelect, values, "All cities", state.city);
  };

  const apply = () => {
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

  if (shows.length > 1) {
    bar.append(searchInput, ...(countrySelect ? [countrySelect] : []), ...(citySelect ? [citySelect] : []), sortSelect, resetButton);
    grid.before(bar);
  }
  grid.before(count);
  apply();
}

async function hydrateShowBoard(section, filters = {}) {
  const grid = section.querySelector("[data-show-grid]");
  if (!grid) return;
  const limit = Math.max(1, Math.min(500, Number(filters.limit) || 6));
  const params = new URLSearchParams({ limit: String(limit) });
  if (filters.artistSlug) params.set("artistSlug", filters.artistSlug);

  try {
    const response = await fetch(`/api/shows?${params.toString()}`, { headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error("shows_unavailable");
    const data = await response.json();
    const shows = safeShowList(data);
    if (!shows.length) {
      grid.replaceChildren(renderShowBoardEmptyState(filters.artistName));
      return;
    }
    const cardOptions = {
      showEventCta: Boolean(filters.showEventCta) && !filters.reviewGated,
      reviewGated: Boolean(filters.reviewGated),
      seatGeekAvailable: Boolean(data?.providerAvailability?.seatgeek),
      vividSeatsAvailable: Boolean(data?.providerAvailability?.vividseats)
    };
    if (filters.filterable) {
      setupShowBoardFilters(section, grid, shows, cardOptions);
      return;
    }
    grid.replaceChildren(...shows.slice(0, limit).map((show) => renderShowCard(show, cardOptions)));
  } catch (error) {
    grid.replaceChildren();
    text(
      grid,
      "p",
      "Checked ticket links are temporarily unavailable. You can still browse artist pages and buying guides.",
      "muted empty-state"
    );
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
  const section = document.createElement("section");
  section.className = "content-page";
  section.setAttribute("aria-labelledby", "artistsTitle");
  section.append(renderBreadcrumb([{ label: "Home", href: "/" }, { label: "Artists" }]));
  text(section, "h1", "Artist watchlist").id = "artistsTitle";
  text(
    section,
    "p",
    "Find major artists, see whether checked ticket links are available, and use the buying guidance before you leave for a ticket provider."
  );
  text(
    section,
    "p",
    "A listed artist does not mean current tickets, prices, venues, or availability are confirmed. Ticket buttons appear only when the destination has been checked."
  );
  text(
    section,
    "p",
    "Coverage varies by artist and region. This is not a complete global tour listing; we only show event links where the artist, date, venue, and ticket destination can be checked.",
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
    "Verified event links",
    "Each card is one checked event date and links to the ticket page for that exact show when one is available.",
    "Coverage varies by artist and region. Prices, availability, fees, and delivery details can change quickly. Always confirm the final price and ticket terms on the provider site before buying."
  );
  section.append(showBoard);
  const serverShows = Array.from(main.querySelectorAll("article.show-card[data-show-json]")).map((card) => {
    try {
      return JSON.parse(card.getAttribute("data-show-json") || "{}");
    } catch (error) {
      return {};
    }
  });
  const verificationPanel = buildVerificationDisclosurePanel(artist, serverShows);

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
  text(checklist, "h2", "Ticket buying checklist");
  checklist.append(
    createList(
      [
        "Check the final price including fees before paying.",
        "Check the seat location, section, row, and any view restrictions.",
        "Check resale terms and buyer protections if the ticket is listed by a third party.",
        "Check the delivery method and expected transfer timing.",
        "Check refund, cancellation, and event-change terms on the provider site."
      ],
      "check-list"
    )
  );

  const guideLinks = document.createElement("section");
  guideLinks.className = "nested-panel";
  text(guideLinks, "h2", "Useful links");
  const guideGrid = document.createElement("div");
  guideGrid.className = "mini-link-grid";
  guideGrid.append(
    link("All artists", "/artists", "mini-link"),
    link("How to compare ticket prices", "/guides/how-to-compare-concert-ticket-prices", "mini-link"),
    link("How to avoid overpaying", "/guides/how-to-avoid-overpaying-for-concert-tickets", "mini-link"),
    link("How to avoid ticket scams", "/guides/how-to-avoid-ticket-scams", "mini-link"),
    link("All buying guides", "/guides", "mini-link"),
    link("How it works", "/how-it-works", "mini-link")
  );
  guideLinks.append(guideGrid);

  section.append(verificationPanel, summary, ...(demand ? [demand] : []), checklist, guideLinks, renderArtistFaq(artist));

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
    // 500 is the /api/shows MAX_LIST_LIMIT — well above any artist's event count,
    // so every verified upcoming date is fetched instead of silently truncating.
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
  const section = document.createElement("section");
  section.className = "content-page";
  section.append(renderBreadcrumb([{ label: "Home", href: "/" }, { label: "How it works" }]));
  text(section, "h1", "How TourTicketCompare works");
  text(
    section,
    "p",
    "TourTicketCompare is an independent, unofficial ticket research site that helps fans find checked ticket options and buying guidance. We do not sell tickets, do not compare live prices, and only link out to destinations we have checked.",
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
      "Displays a clear empty state when no verified ticket link exists for an event."
    ], "check-list")
  );

  const whatWeDont = document.createElement("section");
  whatWeDont.className = "nested-panel";
  text(whatWeDont, "h2", "What TourTicketCompare does not do");
  whatWeDont.append(
    createList([
      "Sell tickets directly.",
      "Compare prices across providers or claim one site is cheaper.",
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
          "Official sources: Artist-level pages on official ticketing sites (typically Ticketmaster).",
          "Resale marketplaces: Verified platforms like SeatGeek and Vivid Seats where sellers list real tickets.",
          "Affiliate links: Verified destination URLs that may generate commission when you buy.",
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
          "Compare prices across providers or claim one site is cheaper.",
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
          "Fake comparison tables or placeholder pricing.",
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
  else if (current.type === "how-it-works") renderHowItWorks();
  else if (["about", "contact", "editorial-policy", "affiliate-disclosure"].includes(current.type)) renderSimplePage(current.type);
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

render();
