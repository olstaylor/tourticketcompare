const fallbackCatalog = {
  artists: [
    {
      slug: "beyonce",
      name: "Beyoncé",
      short_description: "Pop and R&B performer known for large-scale arena and stadium productions.",
      factual_summary:
        "Beyoncé is an American singer, songwriter, performer, and visual artist whose solo catalog spans R&B, pop, dance, country, and hip-hop influences.",
      why_demand_is_high:
        "Demand is typically high because her tours are major cultural events with polished staging, deep catalogs, and broad international audiences.",
      ticket_buying_notes:
        "There may not be an active tour at the moment. Use verified ticket platform links below to check current availability directly.",
      genres: ["Pop", "R&B"],
      country: "United States",
      official_website: "https://www.beyonce.com/",
      image_alt: "Beyoncé artist ticket information"
    },
    {
      slug: "harry-styles",
      name: "Harry Styles",
      short_description: "British pop artist and former One Direction member with major global demand.",
      factual_summary:
        "Harry Styles is an English singer, songwriter, and actor who first became widely known as a member of One Direction before building a solo career.",
      why_demand_is_high:
        "Demand is typically strong because his solo tours draw pop, rock, and mainstream audiences across multiple regions.",
      ticket_buying_notes:
        "There may not be an active tour at the moment. Check verified provider links for current ticket availability.",
      genres: ["Pop", "Rock"],
      country: "United Kingdom",
      official_website: "https://www.hstyles.co.uk/",
      image_alt: "Harry Styles artist ticket information"
    },
    {
      slug: "bts",
      name: "BTS",
      short_description: "South Korean group with one of the world's largest global fanbases.",
      factual_summary:
        "BTS is a South Korean music group known for global pop releases, large-scale live shows, and a highly active international fanbase.",
      why_demand_is_high:
        "Demand is often intense because BTS announcements can draw global attention and fast-moving ticket interest.",
      ticket_buying_notes:
        "There may not be an active tour at the moment. Use verified ticket links to check current availability with platforms directly.",
      genres: ["K-pop", "Pop", "Hip-hop"],
      country: "South Korea",
      official_website: "https://ibighit.com/bts/eng/",
      image_alt: "BTS artist ticket information"
    },
    {
      slug: "ariana-grande",
      name: "Ariana Grande",
      short_description: "American pop vocalist with a large international audience.",
      factual_summary:
        "Ariana Grande is an American singer, songwriter, and actor known for pop and R&B-influenced releases and a wide vocal range.",
      why_demand_is_high:
        "Demand can be high because her fanbase spans pop, streaming, and live entertainment audiences internationally.",
      ticket_buying_notes:
        "There may not be an active tour at the moment. Verified provider links are the safest way to check current availability.",
      genres: ["Pop", "R&B"],
      country: "United States",
      official_website: "https://www.arianagrande.com/",
      image_alt: "Ariana Grande artist ticket information"
    },
    {
      slug: "bad-bunny",
      name: "Bad Bunny",
      short_description: "Puerto Rican artist whose tours draw major demand across Latin and global markets.",
      factual_summary:
        "Bad Bunny is a Puerto Rican recording artist known for reggaeton, Latin trap, pop, and genre-crossing releases.",
      why_demand_is_high:
        "Demand is typically high because his live shows attract large audiences across Spanish-speaking markets and beyond.",
      ticket_buying_notes:
        "There may not be an active tour at the moment. Check current availability directly through verified ticket platforms.",
      genres: ["Reggaeton", "Latin trap", "Latin pop"],
      country: "Puerto Rico",
      official_website: "https://www.badbunny.com/",
      image_alt: "Bad Bunny artist ticket information"
    },
    {
      slug: "morgan-wallen",
      name: "Morgan Wallen",
      short_description: "Country artist with high-demand arena and stadium ticket interest.",
      factual_summary:
        "Morgan Wallen is an American country music artist known for contemporary country releases and large live audiences.",
      why_demand_is_high:
        "Demand can be high because country stadium and arena tours often move quickly across major US markets.",
      ticket_buying_notes:
        "There may not be an active tour at the moment. Use verified provider links to check platform availability.",
      genres: ["Country"],
      country: "United States",
      official_website: "https://morganwallen.com/",
      image_alt: "Morgan Wallen artist ticket information"
    },
    {
      slug: "jay-z",
      name: "JAY-Z",
      short_description: "American hip-hop artist and entrepreneur with legacy demand for major live appearances.",
      factual_summary:
        "JAY-Z is an American rapper, songwriter, producer, and entrepreneur whose catalog is central to modern hip-hop.",
      why_demand_is_high:
        "Demand can be strong because major appearances are comparatively limited and attract hip-hop, festival, and legacy catalog audiences.",
      ticket_buying_notes:
        "There may not be an active tour at the moment. Verified provider links should be used to check current availability.",
      genres: ["Hip-hop"],
      country: "United States",
      official_website: "https://www.rocnation.com/music/jay-z/",
      image_alt: "JAY-Z artist ticket information"
    }
  ],
  tours: [],
  providers: [
    { slug: "ticketmaster", name: "Ticketmaster", public_enabled: true },
    { slug: "seatgeek", name: "SeatGeek", public_enabled: false },
    { slug: "vivid-seats", name: "Vivid Seats", public_enabled: false }
  ],
  ticket_links: []
};

const providerCopy = {
  ticketmaster: {
    name: "Ticketmaster",
    label: "View tickets on Ticketmaster",
    bullets: ["Primary seller or verified marketplace pages where available", "Provider sets prices, fees, availability, and checkout terms"]
  },
  seatgeek: {
    name: "SeatGeek",
    label: "View tickets on SeatGeek",
    bullets: ["Shown only when a verified destination is available"]
  },
  "vivid-seats": {
    name: "Vivid Seats",
    label: "View tickets on Vivid Seats",
    bullets: ["Shown only when a verified destination is available"]
  }
};

const guidePages = [
  {
    slug: "how-to-compare-concert-ticket-prices",
    title: "How to Compare Concert Ticket Prices | TourTicketCompare",
    description:
      "Learn how to check concert ticket links safely by reviewing provider sources, fees, availability, and final checkout totals.",
    h1: "How to check concert ticket links safely",
    intro:
      "Safer ticket research starts with real providers, clear checkout destinations, and final totals rather than teaser prices. TourTicketCompare only publishes ticket buttons when the destination is verified.",
    sections: [
      ["Compare final totals", "Service fees, delivery fees, taxes, and currency differences can change the total you pay at checkout."],
      ["Check the provider source", "Make sure the ticket link clearly leads to a known platform and matches the event you want."],
      ["Treat availability as time-sensitive", "Ticket availability can change quickly, so verify the provider page before making a buying decision."]
    ],
    faq: [
      ["Does TourTicketCompare guarantee savings?", "No. We do not make savings or deal claims unless live verified data supports them."],
      ["Why do totals change at checkout?", "Providers may add fees, taxes, delivery charges, or currency conversion details during checkout."]
    ]
  },
  {
    slug: "ticketmaster-vs-seatgeek-vs-vivid-seats",
    title: "Ticketmaster vs SeatGeek vs Vivid Seats | TourTicketCompare",
    description:
      "Understand how Ticketmaster, SeatGeek, and Vivid Seats can differ by inventory source, fees, checkout flow, and availability.",
    h1: "Ticketmaster vs SeatGeek vs Vivid Seats",
    intro:
      "Ticket platforms can differ because they may list primary inventory, resale inventory, or a mix of both. Useful checks include provider identity, final price, fees, and current availability.",
    sections: [
      ["Ticketmaster", "Ticketmaster is commonly used for primary ticketing and may also show resale options for some events."],
      ["SeatGeek", "SeatGeek is a ticket marketplace and can show resale inventory where events are supported."],
      ["Vivid Seats", "Vivid Seats is a resale marketplace with its own listing, fee, and checkout rules."]
    ],
    faq: [
      ["Are all providers available for every artist?", "No. TourTicketCompare shows ticket buttons only when a verified destination is available."],
      ["Can fees differ by provider?", "Yes. Always check the final checkout total on the provider site."]
    ]
  },
  {
    slug: "how-to-avoid-overpaying-for-concert-tickets",
    title: "How to Avoid Overpaying for Concert Tickets | TourTicketCompare",
    description:
      "Practical checks for avoiding unclear fees, speculative listings, unsafe links, and unsupported ticket-price claims.",
    h1: "How to avoid overpaying for concert tickets",
    intro:
      "Avoiding overpayment is less about chasing a magic buying window and more about checking sources, final totals, and seller terms before checkout.",
    sections: [
      ["Do not rely on headline prices alone", "A low first-page price may not include all fees or delivery costs."],
      ["Be careful with speculative listings", "Some resale listings can appear before inventory is fully confirmed. Check platform terms before buying."],
      ["Avoid fake urgency", "Countdowns and scarcity copy should be backed by provider data, not generic marketing claims."]
    ],
    faq: [
      ["Does this site show fake prices?", "No. Prices should appear only when verified and timestamped."],
      ["What should I check first?", "Check provider legitimacy, final checkout total, ticket type, delivery method, and refund terms."]
    ]
  },
  {
    slug: "when-is-the-best-time-to-buy-concert-tickets",
    title: "When to Buy Concert Tickets | TourTicketCompare",
    description:
      "Learn how timing can affect concert ticket buying decisions without relying on fake scarcity or invented pricing trends.",
    h1: "When to buy concert tickets",
    intro:
      "There is no universal best time to buy every concert ticket. Demand, tour routing, provider inventory, and resale activity can all affect availability.",
    sections: [
      ["Official onsale periods matter", "Popular events can move quickly when primary tickets first go on sale."],
      ["Resale markets can move both ways", "Resale listings may increase or decrease depending on demand, timing, and inventory."],
      ["Use verified pages", "A trustworthy ticket page should avoid specific price predictions unless it has current provider data."]
    ],
    faq: [
      ["Should I wait for prices to drop?", "That depends on demand, inventory, and your risk tolerance. No site should guarantee a drop without data."],
      ["Can availability change quickly?", "Yes. Provider inventory can change quickly, especially for high-demand artists."]
    ]
  },
  {
    slug: "primary-vs-resale-concert-tickets",
    title: "Primary vs Resale Concert Tickets | TourTicketCompare",
    description:
      "A clear guide to primary and resale concert tickets, including fees, delivery, speculative listings, and checkout checks.",
    h1: "Primary vs resale concert tickets",
    intro:
      "Primary tickets are usually sold through an official ticketing partner for the event. Resale tickets are listed by ticket holders or brokers through marketplace platforms.",
    sections: [
      ["Primary tickets", "Primary inventory is typically tied to the original event onsale and venue ticketing setup."],
      ["Resale tickets", "Resale inventory can vary by seller, delivery method, fees, and marketplace rules."],
      ["What to check before buying", "Review ticket type, seat details, delivery timing, refund terms, final fees, and the provider's buyer protections."]
    ],
    faq: [
      ["Is resale always more expensive?", "No. Resale pricing varies, and the final checkout total matters more than the first price shown."],
      ["Does TourTicketCompare sell tickets?", "No. We route users to external ticketing platforms when a verified link is available."]
    ]
  }
];

const oldGuideRedirects = {
  "compare-ticket-prices-safely": "how-to-compare-concert-ticket-prices",
  "why-ticket-prices-vary": "ticketmaster-vs-seatgeek-vs-vivid-seats",
  "avoid-overpaying-concert-tickets": "how-to-avoid-overpaying-for-concert-tickets",
  "best-time-to-buy-concert-tickets": "when-is-the-best-time-to-buy-concert-tickets"
};

const routeMeta = {
  "/": {
    title: "Verified Ticket Links and Buying Guidance | TourTicketCompare",
    description:
      "Independent ticket research for major live music tours, with verified ticket links where available and no fake prices or invented dates."
  },
  "/artists": {
    title: "Artists | TourTicketCompare",
    description:
      "Browse major artist pages with verified ticket links where available, practical guidance, and no fake prices or invented dates."
  },
  "/guides": {
    title: "Concert Ticket Buying Guides | TourTicketCompare",
    description:
      "Practical guides for checking concert ticket links, fees, resale risks, provider differences, and checkout terms."
  },
  "/how-it-works": {
    title: "How TourTicketCompare Works",
    description:
      "How TourTicketCompare checks official sources, keeps ticket links specific, and avoids fake prices or invented event details."
  },
  "/about": {
    title: "About TourTicketCompare",
    description:
      "TourTicketCompare is an independent, unofficial ticket research site for major live music tours and verified links where available."
  },
  "/contact": {
    title: "Contact TourTicketCompare",
    description: "Contact TourTicketCompare about ticket links, source corrections, partnerships, or editorial questions."
  },
  "/editorial-policy": {
    title: "Editorial Policy | TourTicketCompare",
    description:
      "The editorial rules TourTicketCompare follows before publishing artist facts, tour pages, provider links, prices, or availability."
  },
  "/affiliate-disclosure": {
    title: "Affiliate Disclosure | TourTicketCompare",
    description:
      "TourTicketCompare may earn commission from verified provider links without changing the price you pay."
  }
};

let catalog = fallbackCatalog;
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

  try {
    const body = JSON.stringify(payload);
    if (navigator.sendBeacon) {
      navigator.sendBeacon("/api/analytics", new Blob([body], { type: "application/json" }));
      return;
    }
    fetch("/api/analytics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
      keepalive: true
    }).catch(() => {});
  } catch (error) {
    // Analytics must never block the user path.
  }
}

function setMeta(meta, noindex = false) {
  if (meta?.title) document.title = meta.title;
  const description = document.querySelector('meta[name="description"]');
  if (description && meta?.description) description.setAttribute("content", meta.description);
  const robots = document.querySelector('meta[name="robots"]');
  if (robots) robots.setAttribute("content", noindex ? "noindex,follow" : "index,follow,max-image-preview:large");
  const canonical = document.querySelector('link[rel="canonical"]');
  const canonicalUrl = new URL(window.location.pathname, window.location.origin).toString();
  if (canonical) canonical.setAttribute("href", canonicalUrl);
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle && meta?.title) ogTitle.setAttribute("content", meta.title);
  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription && meta?.description) ogDescription.setAttribute("content", meta.description);
  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute("content", canonicalUrl);
  const twitterTitle = document.querySelector('meta[name="twitter:title"]');
  if (twitterTitle && meta?.title) twitterTitle.setAttribute("content", meta.title);
  const twitterDescription = document.querySelector('meta[name="twitter:description"]');
  if (twitterDescription && meta?.description) twitterDescription.setAttribute("content", meta.description);
}

function findArtist(slug) {
  return (catalog.artists || []).find((artist) => slugify(artist.slug) === slug);
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
  return `${artist.name} stadium tour watch`;
}

function artistPageIntro(artist) {
  return `Use this page to check ${artist.name} watchlist notes and verified event links when reliable source information is available.`;
}

function renderProviderButtons(artist, surface) {
  const links = ticketLinksForArtist(artist.slug).filter((item) => providerEnabled(slugify(item.provider)));
  const panel = document.createElement("section");
  panel.className = "provider-panel";
  panel.setAttribute("aria-labelledby", "providerTitle");
  text(panel, "h2", "Verified ticket links").id = "providerTitle";

  if (!links.length) {
    text(panel, "p", "No verified ticket links are available yet. We hide ticket buttons until we can verify the destination.", "muted");
    return panel;
  }

  const actions = document.createElement("div");
  actions.className = "provider-actions";
  links.forEach((item) => {
    const providerSlug = slugify(item.provider);
    const copy = providerCopy[providerSlug] || { name: item.provider, label: `View tickets on ${item.provider}`, bullets: [] };
    const card = document.createElement("article");
    card.className = "provider-card";
    text(card, "h3", copy.name);
    if (copy.bullets.length) card.append(createList(copy.bullets, "compact-list"));
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
    actions.append(card);
  });
  panel.append(actions);
  text(panel, "p", "Affiliate link. We may earn a commission at no extra cost to you.", "disclosure-note");
  text(
    panel,
    "p",
    "Final prices, fees and availability are confirmed on the ticketing platform.",
    "disclosure-note"
  );
  return panel;
}

function renderHome() {
  setMeta(routeMeta["/"], false);
  const hero = document.createElement("section");
  hero.className = "hero-panel";
  hero.setAttribute("aria-labelledby", "heroTitle");
  const copy = document.createElement("div");
  copy.className = "hero-copy-block";
  text(copy, "h1", "Verified ticket links and buying guidance for major tours", "hero-title").id = "heroTitle";
  text(
    copy,
    "p",
    "Browse major artists, find verified ticket links when available, and read practical guidance before you leave for a ticket provider. Final prices, fees, availability, and checkout terms are confirmed on the provider site.",
    "hero-subcopy"
  );
  const actions = document.createElement("div");
  actions.className = "action-row";
  actions.append(buttonLink("Browse artists", "/artists", "primary"), buttonLink("Read ticket guides", "/guides", "secondary"));
  copy.append(actions);
  const trust = document.createElement("aside");
  trust.className = "trust-ledger";
  text(trust, "h2", "Why fans can trust it");
  [
    "Independent and unofficial",
    "Verified ticket links only",
    "No fake prices or invented dates",
    "Final checkout details are confirmed by the ticket provider"
  ].forEach((item) => text(trust, "p", item));
  hero.append(copy, trust);

  const today = document.createElement("section");
  today.className = "section-grid";
  today.setAttribute("aria-labelledby", "todayTitle");
  const todayHeader = document.createElement("div");
  todayHeader.className = "section-intro";
  text(todayHeader, "h2", "What you can do today").id = "todayTitle";
  text(todayHeader, "p", "Use TourTicketCompare as a careful starting point before you leave for a ticketing platform.");
  const todayGrid = document.createElement("div");
  todayGrid.className = "card-grid";
  todayGrid.append(
    renderInfoCard("Browse major artists", "Start with a focused watchlist instead of searching random listings across the web."),
    renderInfoCard("Find verified links", "Ticket buttons appear only when the destination has been checked for the artist or event."),
    renderInfoCard("Read buying guidance", "Understand fees, resale risks, delivery terms, and final checkout checks before you buy.")
  );
  today.append(todayHeader, todayGrid);

  const works = document.createElement("section");
  works.className = "section-grid";
  works.setAttribute("aria-labelledby", "worksTitle");
  const worksHeader = document.createElement("div");
  worksHeader.className = "section-intro";
  text(worksHeader, "h2", "How links are checked").id = "worksTitle";
  text(worksHeader, "p", "We keep the experience useful by showing less, but checking more.");
  const worksGrid = document.createElement("div");
  worksGrid.className = "card-grid";
  worksGrid.append(
    renderInfoCard("Official and approved sources", "We use official artist, ticketing, and affiliate sources where available. We do not scrape unofficial listings."),
    renderInfoCard("Event-specific destinations", "A ticket button for an event must lead to that specific event, not a generic artist page."),
    renderInfoCard("No invented data", "If we cannot verify a date, venue, price, availability, or destination, we do not publish it as a ticket option.")
  );
  works.append(worksHeader, worksGrid);

  const artists = document.createElement("section");
  artists.className = "section-grid";
  artists.setAttribute("aria-labelledby", "homeArtistsTitle");
  const artistHeader = document.createElement("div");
  artistHeader.className = "section-intro";
  text(artistHeader, "h2", "Featured artist pages").id = "homeArtistsTitle";
  text(artistHeader, "p", "Start with artist pages to see verified event links where available and practical guidance when no ticket destination is confirmed.");
  const grid = document.createElement("div");
  grid.className = "artist-card-grid";
  catalog.artists.forEach((artist) => {
    grid.append(renderArtistCard(artist));
  });
  artists.append(artistHeader, grid);

  const board = renderShowBoardShell(
    "homeShowBoard",
    "Verified event watch",
    "When verified event records are available, they appear here with artist links so you can review the relevant page."
  );

  const disclosure = document.createElement("section");
  disclosure.className = "section-grid home-disclosure";
  disclosure.setAttribute("aria-labelledby", "homeDisclosureTitle");
  text(disclosure, "h2", "Affiliate disclosure").id = "homeDisclosureTitle";
  text(
    disclosure,
    "p",
    "Some ticket links may be affiliate links, which means we may earn a commission at no extra cost to you. Ticket providers control prices, fees, availability, delivery, and checkout terms."
  );
  disclosure.append(buttonLink("Read affiliate disclosure", "/affiliate-disclosure", "secondary"));

  main.replaceChildren(hero, today, works, artists, board, renderGuidePreview(), disclosure);
  hydrateShowBoard(board, {});
}

function renderArtistCard(artist) {
  const article = document.createElement("article");
  article.className = "artist-card";
  text(article, "h3", artist.name);
  text(article, "p", artist.short_description || "Artist watchlist notes.", "muted");
  const activeProviders = ticketLinksForArtist(artist.slug).filter((item) => providerEnabled(slugify(item.provider)));
  text(article, "p", activeProviders.length ? "Verified ticket link available" : "Artist ticket page available", "status-badge");
  text(
    article,
    "p",
    activeProviders.length
      ? "Check the artist page for verified destinations and buying guidance."
      : "We’ll show ticket options only when we can verify the destination.",
    "card-status"
  );
  article.append(buttonLink(activeProviders.length ? "View artist" : "View artist guidance", `/artists/${artist.slug}`, activeProviders.length ? "primary" : "secondary"));
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

function renderShowBoardShell(id, title, body) {
  const section = document.createElement("section");
  section.className = "section-grid show-board";
  section.setAttribute("aria-labelledby", id);
  const header = document.createElement("div");
  header.className = "section-intro";
  text(header, "h2", title).id = id;
  text(header, "p", body);
  const grid = document.createElement("div");
  grid.className = "card-grid show-card-grid";
  grid.dataset.showGrid = "true";
  text(grid, "p", "Checking verified ticket links...", "muted empty-state");
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

function renderShowCard(show, options = {}) {
  const article = document.createElement("article");
  article.className = "info-card show-card";
  text(article, "h3", show.event_name || show.artist_name || "Verified show");
  const date = formatShowDate(show.dateTimeISO);
  if (date) text(article, "p", date, "card-status");
  const location = showLocation(show);
  text(article, "p", location || "City and venue details are shown only when verified by the source.", "muted");

  if (options.showEventCta) {
    const ticketmasterUrl = safeVerifiedEventUrl(show.ticketmaster_url);
    const showId = String(show.id || "").trim();
    if (ticketmasterUrl && showId) {
      const params = new URLSearchParams({ showId, provider: "ticketmaster" });
      const cta = buttonLink("View verified ticket link", `/api/out?${params.toString()}`, "primary");
      cta.target = "_blank";
      cta.rel = "noopener";
      article.append(cta);
      text(article, "p", "External ticketing sites set prices, fees, availability, and checkout terms.", "disclosure-note");
    } else {
      text(article, "p", "No verified ticket link is available for this specific date yet.", "disclosure-note");
    }
  } else if (show.artist_slug) {
    article.append(link("View artist", `/artists/${slugify(show.artist_slug)}`, "text-link"));
  }
  return article;
}

function safeShowList(data) {
  return Array.isArray(data?.shows) ? data.shows.filter((show) => show && typeof show === "object") : [];
}

async function hydrateShowBoard(section, filters = {}) {
  const grid = section.querySelector("[data-show-grid]");
  if (!grid) return;
  const params = new URLSearchParams({ limit: String(filters.limit || 6) });
  if (filters.artistSlug) params.set("artistSlug", filters.artistSlug);

  try {
    const response = await fetch(`/api/shows?${params.toString()}`, { headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error("shows_unavailable");
    const data = await response.json();
    const shows = safeShowList(data);
    if (!shows.length) {
      grid.replaceChildren();
      text(
        grid,
        "p",
        "No verified event links are available here yet. We’ll only show ticket options when we can verify the destination.",
        "muted empty-state"
      );
      return;
    }
    grid.replaceChildren(...shows.slice(0, filters.limit || 6).map((show) => renderShowCard(show, {
      showEventCta: Boolean(filters.showEventCta)
    })));
  } catch (error) {
    grid.replaceChildren();
    text(
      grid,
      "p",
      "Verified event links are temporarily unavailable. You can still browse artist pages and buying guides.",
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
  text(header, "h2", "Ticket buying guides").id = "guideTitle";
  text(header, "p", "Practical, fan-friendly guides for checking ticket links, fees, resale risks, and checkout terms.");
  const grid = document.createElement("div");
  grid.className = "card-grid guide-grid";
  guidePages.forEach((guide) => {
    grid.append(renderInfoCard(guide.h1, guide.description, link("Read guide", `/guides/${guide.slug}`, "text-link")));
  });
  const actions = document.createElement("div");
  actions.className = "action-row";
  actions.append(buttonLink("View all guides", "/guides", "secondary"));
  section.append(header, grid, actions);
  return section;
}

function renderArtistsIndex() {
  setMeta(routeMeta["/artists"], false);
  const section = document.createElement("section");
  section.className = "content-page";
  section.setAttribute("aria-labelledby", "artistsTitle");
  section.append(renderBreadcrumb([{ label: "Home", href: "/" }, { label: "Artists" }]));
  text(section, "h1", "Artist watchlist").id = "artistsTitle";
  text(
    section,
    "p",
    "Browse major artist pages for verified ticket links where available, practical buying guidance, and clear status notes."
  );
  text(
    section,
    "p",
    "A listed artist does not mean current tickets, prices, venues, or availability are confirmed. Ticket buttons appear only when a destination has been checked."
  );
  const grid = document.createElement("div");
  grid.className = "artist-card-grid";
  catalog.artists.forEach((artist) => grid.append(renderArtistCard(artist)));
  const note = document.createElement("section");
  note.className = "nested-panel";
  text(note, "h2", "Publishing status");
  text(note, "p", "Artist pages remain useful for guidance even when no verified event links are available. If we cannot verify a page or ticket destination, we do not publish it as a ticket option.");
  section.append(grid, note);
  main.replaceChildren(section);
}

function renderArtist(artist) {
  setMeta(
    {
      title: artist.seo_title || `${artist.name} Tickets | Options & Availability`,
      description:
        artist.meta_description ||
        `Check ${artist.name} ticket options through verified provider links. No fake prices or invented tour dates.`
    },
    false
  );

  const section = document.createElement("section");
  section.className = "content-page artist-page";
  section.setAttribute("aria-labelledby", "artistTitle");
  section.append(renderBreadcrumb([{ label: "Home", href: "/" }, { label: "Artists", href: "/artists" }, { label: artist.name }]));
  text(section, "h1", artistPageHeading(artist)).id = "artistTitle";
  text(section, "p", artistPageIntro(artist), "lead");
  const showBoard = renderShowBoardShell(
    "artistShowBoard",
    "Verified event links",
    "Each card shows one verified event date and only links to the ticket URL for that exact event when one is available."
  );
  section.append(showBoard);

  const summary = document.createElement("section");
  summary.className = "split-section";
  const left = document.createElement("div");
  text(left, "h2", `About ${artist.name}`);
  text(left, "p", artist.factual_summary);
  const right = document.createElement("div");
  text(right, "h2", "Verified destination status");
  text(right, "p", artist.ticket_buying_notes);
  text(right, "p", "We do not sell tickets directly. We send users to external ticketing platforms only when the link is verified.", "disclosure-note");
  summary.append(left, right);

  const demand = document.createElement("section");
  demand.className = "nested-panel";
  text(demand, "h2", "Why fans check early");
  text(demand, "p", artist.why_demand_is_high);

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

  const pageNote = document.createElement("section");
  pageNote.className = "nested-panel";
  text(pageNote, "h2", "About this page");
  text(
    pageNote,
    "p",
    "This page does not list unverified tour dates, invented prices, speculative venues, or unchecked checkout links. Ticket details should be confirmed on the ticketing platform before purchase."
  );

  const guideLinks = document.createElement("section");
  guideLinks.className = "nested-panel";
  text(guideLinks, "h2", "Useful links");
  const guideGrid = document.createElement("div");
  guideGrid.className = "mini-link-grid";
  guideGrid.append(
    link("All artists", "/artists", "mini-link"),
    link("Ticket buying guides", "/guides", "mini-link"),
    link("How it works", "/how-it-works", "mini-link"),
    link("Affiliate disclosure", "/affiliate-disclosure", "mini-link")
  );
  guideLinks.append(guideGrid);

  section.append(summary, demand, checklist, pageNote, guideLinks, renderArtistFaq(artist));
  main.replaceChildren(section);
  hydrateShowBoard(showBoard, { artistSlug: artist.slug, limit: 50, showEventCta: true });
}

function renderArtistFaq(artist) {
  const faq = document.createElement("section");
  faq.className = "nested-panel faq-panel";
  text(faq, "h2", `${artist.name} ticket FAQ`);
  const items = [
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
  ].concat(artist.faq || []);
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
    "Use these guides to understand official and resale ticket links, checkout fees, delivery terms, resale risks, and affiliate disclosures before you buy."
  );
  text(
    section,
    "p",
    "The guides do not claim live price comparison or guaranteed availability. They are designed to help you verify details on the ticketing platform before purchase."
  );
  const grid = document.createElement("div");
  grid.className = "card-grid guide-grid";
  guidePages.forEach((guide) => grid.append(renderInfoCard(guide.h1, guide.description, link("Read guide", `/guides/${guide.slug}`, "text-link"))));
  const links = document.createElement("div");
  links.className = "action-row";
  links.append(buttonLink("Browse artists", "/artists", "primary"), buttonLink("How it works", "/how-it-works", "secondary"));
  section.append(grid, links);
  main.replaceChildren(section);
}

function renderGuide(guide) {
  setMeta({ title: guide.title, description: guide.description }, false);
  const section = document.createElement("section");
  section.className = "content-page guide-page";
  section.setAttribute("aria-labelledby", "guidePageTitle");
  section.append(renderBreadcrumb([{ label: "Home", href: "/" }, { label: "Guides", href: "/guides" }, { label: guide.h1 }]));
  text(section, "h1", guide.h1).id = "guidePageTitle";
  text(section, "p", guide.intro, "lead");
  const body = document.createElement("div");
  body.className = "guide-body";
  guide.sections.forEach(([heading, copy]) => {
    const block = document.createElement("section");
    block.className = "nested-panel";
    text(block, "h2", heading);
    text(block, "p", copy);
    body.append(block);
  });
  section.append(body, renderGuideFaq(guide));
  const next = document.createElement("section");
  next.className = "nested-panel";
  text(next, "h2", "Next steps");
  text(next, "p", "Browse artist pages with verified ticket links where available, or read how TourTicketCompare decides what to publish.");
  const actions = document.createElement("div");
  actions.className = "action-row";
  actions.append(buttonLink("Browse artists", "/artists", "primary"), buttonLink("How it works", "/how-it-works", "secondary"));
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
    text(details, "p", answer);
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
    "TourTicketCompare is built around one rule: publish only useful ticket-watch information that can be checked against official artist, ticketing, or affiliate sources.",
    "lead"
  );
  const grid = document.createElement("div");
  grid.className = "card-grid";
  grid.append(
    renderInfoCard("Check official and approved sources", "Event cards and ticket links must be backed by sources we can verify. We do not scrape unofficial listings."),
    renderInfoCard("Keep links event-specific", "A ticket button on an event card must point to the verified destination for that exact show date, not a generic artist page."),
    renderInfoCard("Keep affiliate links safe", "Some ticket links may earn a commission, but the destination must still be verified before the user leaves TourTicketCompare."),
    renderInfoCard("Avoid invented data", "We do not publish invented tour dates, venues, prices, availability, Event schema, or fake urgency.")
  );
  section.append(grid, renderGeneralFaq());
  main.replaceChildren(section);
}

function renderGeneralFaq() {
  const faq = document.createElement("section");
  faq.className = "nested-panel faq-panel";
  text(faq, "h2", "FAQ");
  [
    ["Is TourTicketCompare official?", "No. TourTicketCompare is independent and unofficial."],
    ["Does the site sell tickets directly?", "No. Ticket buying happens on the external provider site."],
    ["Why are some providers missing?", "Ticket buttons are hidden until the destination can be verified."],
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
  const content = {
    about: [
      "About TourTicketCompare",
      "TourTicketCompare is an independent, unofficial ticket research site for major live music tours. The site focuses on factual artist pages, verified ticket links where available, and clear disclosures.",
      "The site does not sell tickets directly and does not publish invented dates, prices, venues, or availability."
    ],
    contact: [
      "Contact",
      "Contact TourTicketCompare about source corrections, event-link issues, provider partnerships, or editorial questions.",
      "Email hello@tourticketcompare.com. Please include the artist, event date, source URL, and what needs checking when sending a correction."
    ],
    "editorial-policy": [
      "Editorial policy",
      "TourTicketCompare publishes factual artist-watch content and verified event cards only when the source can be checked.",
      "We use official artist, ticketing, and affiliate sources where available. We do not scrape, invent tour dates, publish fake prices, or add Event schema without verified event data."
    ],
    "affiliate-disclosure": [
      "Affiliate disclosure",
      "Some outbound ticket links may be affiliate links. We may earn a commission if you click through and buy tickets, at no extra cost to you.",
      "Affiliate relationships do not control provider prices, fees, availability, seat details, delivery terms, refund rules, or checkout decisions. TourTicketCompare remains independent and does not sell tickets directly."
    ]
  }[type];
  text(section, "h1", content[0]);
  text(section, "p", content[1], "lead");
  if (content[2]) {
    if (type === "contact") {
      const contact = document.createElement("p");
      contact.className = "contact-line";
      contact.append(document.createTextNode("Email "), link("hello@tourticketcompare.com", "mailto:hello@tourticketcompare.com", "text-link"));
      section.append(contact);
    } else {
      text(section, "p", content[2]);
    }
  }
  if (type === "editorial-policy") {
    section.append(
      createList(
        [
          "Do not invent artist facts, tour dates, venues, prices, or availability.",
          "Use official artist, ticketing, or affiliate sources for event claims.",
          "Do not show provider buttons without verified destination URLs.",
          "Do not use Event schema until event data is real and verified.",
          "Do not claim savings, special deals, or live multi-provider analysis unless verified data supports it."
        ],
        "check-list"
      )
    );
  }
  if (type === "affiliate-disclosure") {
    section.append(
      createList(
        [
          "Ticket purchases happen on external ticketing platforms.",
          "Final prices, fees, availability, delivery, and refund terms are confirmed on the provider site.",
          "Affiliate relationships never change our rule: ticket links must point to verified destinations."
        ],
        "check-list"
      )
    );
  }
  main.replaceChildren(section);
}

function renderNotFound() {
  setMeta({ title: "Page Not Found | TourTicketCompare", description: "This TourTicketCompare page is not published." }, true);
  const section = document.createElement("section");
  section.className = "content-page";
  text(section, "h1", "Page not found");
  text(section, "p", "We could not find that page. Use the artist index or guides to find current public pages.");
  const actions = document.createElement("div");
  actions.className = "action-row";
  actions.append(buttonLink("Browse artists", "/artists", "primary"), buttonLink("Return home", "/", "secondary"));
  section.append(actions);
  main.replaceChildren(section);
}

async function loadCatalog() {
  try {
    const response = await fetch("/data/catalog.json", { cache: "no-store" });
    if (!response.ok) return fallbackCatalog;
    const data = await response.json();
    if (!data || !Array.isArray(data.artists)) return fallbackCatalog;
    return data;
  } catch (error) {
    return fallbackCatalog;
  }
}

async function render() {
  catalog = await loadCatalog();
  const current = getRoute();

  if (current.type === "client-redirect") {
    window.location.replace(current.to);
    return;
  }

  if (current.type === "home") renderHome();
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
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    navLinks.toggleAttribute("data-open", !isOpen);
  });
}

render();
