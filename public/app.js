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
      "Learn how to compare concert ticket prices safely by checking fees, seat details, delivery terms, and final checkout totals.",
    h1: "How do I compare ticket prices safely?",
    intro:
      "A ticket price is only useful when you know what it includes. Before you buy, compare the full checkout total, the seat location, the delivery method, and the seller terms rather than relying on the first price you see.",
    sections: [
      ["What to check", "Compare the final checkout total, including service fees, delivery charges, taxes, currency, seat section, row, view notes, and transfer timing."],
      ["Red flags", "Be careful with unclear seat details, pressure-heavy countdowns, payment methods with weak protection, and ticket pages that do not clearly match the event you want."],
      ["Before you buy", "Open the ticket provider page, confirm the date and venue, review the final total, and read the delivery and refund terms before entering payment details."],
      ["What TourTicketCompare verifies", "We check that ticket buttons point to a real destination for the relevant artist or event. We do not verify the final checkout total for you."]
    ],
    faq: [
      ["Does TourTicketCompare compare live prices today?", "Not yet. Live price comparison is coming later, so final prices and fees must be checked on the ticket provider site."],
      ["Why do totals change at checkout?", "Ticket providers may add fees, taxes, delivery charges, or currency conversion details during checkout."]
    ]
  },
  {
    slug: "ticketmaster-vs-seatgeek-vs-vivid-seats",
    title: "Why Ticket Prices Vary Between Sites | TourTicketCompare",
    description:
      "Understand why concert ticket prices can vary between ticket sites because of fees, inventory type, demand, seat location, and seller terms.",
    h1: "Why do prices vary between ticket sites?",
    intro:
      "Two ticket pages can look similar but lead to different final totals. Fees, inventory type, seat location, delivery method, currency, and seller rules can all affect what you actually pay.",
    sections: [
      ["What to check", "Look beyond the first displayed price. Check whether the ticket is primary or resale, where the seat is, how delivery works, and what the full checkout total says."],
      ["Red flags", "Watch for vague listing titles, missing seat information, unclear transfer timing, or a final total that changes sharply at checkout."],
      ["Before you buy", "Compare like-for-like tickets whenever possible: same date, same venue, similar seat quality, and the final price after fees."],
      ["What TourTicketCompare verifies", "We verify ticket destinations before showing buttons. We do not claim one ticket site is always cheaper or better."]
    ],
    faq: [
      ["Can one site be cheaper than another?", "Sometimes, but it depends on the specific event, seat, fees, and seller terms. Always compare the final checkout total."],
      ["Does TourTicketCompare rank providers by price?", "Not yet. Live provider price comparison is planned for later and will only be shown when the data is reliable."]
    ]
  },
  {
    slug: "how-to-avoid-overpaying-for-concert-tickets",
    title: "How to Avoid Overpaying for Concert Tickets | TourTicketCompare",
    description:
      "Use practical checks to avoid overpaying for concert tickets, including final fees, seat location, seller terms, and misleading urgency.",
    h1: "How do I avoid overpaying for concert tickets?",
    intro:
      "There is no magic trick for every concert ticket. The safer approach is to slow down, compare the real checkout total, and avoid listings that hide important details.",
    sections: [
      ["What to check", "Check the final total, the seat view, ticket type, transfer timing, refund terms, and whether the page clearly matches the artist and date."],
      ["Red flags", "Treat unrealistic prices, social media sellers, vague screenshots, pressure tactics, and requests for unprotected payment methods as warning signs."],
      ["Before you buy", "Take a screenshot of the final order summary, read the buyer terms, and make sure the ticket provider explains how and when you receive the ticket."],
      ["What TourTicketCompare verifies", "We avoid fake urgency and invented prices. If a ticket destination cannot be checked, we do not present it as a ticket option."]
    ],
    faq: [
      ["Does TourTicketCompare promise savings?", "No. We do not make savings claims without live verified comparison data."],
      ["What should I check first?", "Start with the final checkout total, seat location, ticket type, delivery method, and refund terms."]
    ]
  },
  {
    slug: "when-is-the-best-time-to-buy-concert-tickets",
    title: "When to Buy Concert Tickets | TourTicketCompare",
    description:
      "Learn when to buy concert tickets by weighing demand, official onsales, resale activity, seat choice, and your risk tolerance.",
    h1: "When should I buy concert tickets?",
    intro:
      "The right buying moment depends on the artist, the venue, demand, seat preferences, and how much risk you are comfortable taking. No timing rule works for every show.",
    sections: [
      ["What to check", "Check whether tickets are in an official onsale, whether resale listings are active, how many seats fit your budget, and whether your preferred section is limited."],
      ["Red flags", "Avoid advice that promises prices will rise or fall. Ticket prices can move in either direction depending on demand and inventory."],
      ["Before you buy", "Decide what matters most: price, seat quality, going with a group, or certainty. That tradeoff matters more than any generic timing rule."],
      ["What TourTicketCompare verifies", "We can point to checked ticket destinations when available, but we do not predict future prices without reliable live data."]
    ],
    faq: [
      ["Should I wait for prices to drop?", "That depends on demand, inventory, and your risk tolerance. No site should promise a price drop without current data."],
      ["Can availability change quickly?", "Yes. Ticket provider inventory can change quickly, especially for high-demand artists."]
    ]
  },
  {
    slug: "primary-vs-resale-concert-tickets",
    title: "Primary vs Resale Concert Tickets | TourTicketCompare",
    description:
      "Understand official tickets vs resale tickets, including fees, seat details, delivery timing, seller terms, and checkout checks.",
    h1: "What is the difference between official tickets and resale?",
    intro:
      "Official and resale tickets can both lead to real seats, but the buying experience and terms can be different. The safest choice depends on the event, ticket type, seller terms, and final checkout details.",
    sections: [
      ["What to check", "Check whether the ticket is official primary inventory or resale, then review seat details, fees, transfer timing, and buyer protections."],
      ["Red flags", "Be cautious with unclear seller names, missing delivery details, screenshots sold outside a ticket platform, or listings that do not match the event date."],
      ["Before you buy", "Read the provider terms carefully. Refund, transfer, cancellation, and delivery rules can differ between official and resale purchases."],
      ["What TourTicketCompare verifies", "We verify destination links before showing ticket buttons. We do not certify every individual seller or seat listing on external platforms."]
    ],
    faq: [
      ["Is resale always more expensive?", "No. Resale pricing varies. The final checkout total matters more than the first price shown."],
      ["Does TourTicketCompare sell tickets?", "No. We send users to external ticketing platforms when a verified link is available."]
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
    title: "Find Verified Ticket Options for Major Tours | TourTicketCompare",
    description:
      "Find checked ticket links for major tours, read practical buying guidance, and confirm final prices and fees on the ticket provider site."
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
      "How TourTicketCompare uses affiliate links while staying independent, unofficial, and focused on checked ticket destinations."
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
  text(copy, "h1", "Find verified ticket options for major tours", "hero-title").id = "heroTitle";
  text(
    copy,
    "p",
    "TourTicketCompare helps fans find checked ticket links, understand what affects the final price, and avoid dead-end listings. We only show ticket buttons when the show and destination can be verified; final prices, fees, availability, and checkout terms are confirmed by the ticket provider.",
    "hero-subcopy"
  );
  const actions = document.createElement("div");
  actions.className = "action-row";
  actions.append(buttonLink("Find an artist", "/artists", "primary"), buttonLink("Read buying guides", "/guides", "secondary"));
  copy.append(actions);
  const trust = document.createElement("aside");
  trust.className = "trust-ledger";
  text(trust, "h2", "Why fans can trust it");
  [
    "Independent and unofficial",
    "Checked ticket links",
    "No invented dates or fake prices",
    "Prices and fees confirmed at checkout"
  ].forEach((item) => text(trust, "p", item));
  hero.append(copy, trust);

  const today = document.createElement("section");
  today.className = "section-grid";
  today.setAttribute("aria-labelledby", "todayTitle");
  const todayHeader = document.createElement("div");
  todayHeader.className = "section-intro";
  text(todayHeader, "h2", "What you can do here").id = "todayTitle";
  text(todayHeader, "p", "Start with the artist, check whether verified event links are available, then use the guides to make a better buying decision before checkout.");
  const todayGrid = document.createElement("div");
  todayGrid.className = "card-grid";
  todayGrid.append(
    renderInfoCard("Find major artists", "Browse artist pages for major live music tours and see whether checked ticket links are available."),
    renderInfoCard("Check event-specific links", "When a show link is verified, the event card points to the ticket page for that exact date."),
    renderInfoCard("Understand the final total", "Use the guides to check fees, seat details, delivery timing, resale terms, and checkout totals."),
    renderInfoCard("Avoid dead-end listings", "We do not publish invented dates, fake prices, or ticket buttons we cannot verify.")
  );
  today.append(todayHeader, todayGrid);

  const works = document.createElement("section");
  works.className = "section-grid";
  works.setAttribute("aria-labelledby", "worksTitle");
  const worksHeader = document.createElement("div");
  worksHeader.className = "section-intro";
  text(worksHeader, "h2", "How TourTicketCompare works").id = "worksTitle";
  text(worksHeader, "p", "The goal is simple: get fans from research to checked ticket destinations without pretending to have data we have not verified.");
  const worksGrid = document.createElement("div");
  worksGrid.className = "card-grid";
  worksGrid.append(
    renderInfoCard("Sources are checked first", "Artist and event pages are based on sources we can review, not scraped listings or rumours."),
    renderInfoCard("Event links stay specific", "A show card should link to the specific event page, not a generic artist page."),
    renderInfoCard("Unchecked buttons stay hidden", "If we cannot verify the destination, we do not show a ticket button just to make a page look fuller.")
  );
  works.append(worksHeader, worksGrid);

  const artists = document.createElement("section");
  artists.className = "section-grid";
  artists.setAttribute("aria-labelledby", "homeArtistsTitle");
  const artistHeader = document.createElement("div");
  artistHeader.className = "section-intro";
  text(artistHeader, "h2", "Featured artists").id = "homeArtistsTitle";
  text(artistHeader, "p", "Choose an artist to review checked ticket links when available, plus practical guidance for avoiding risky listings.");
  const grid = document.createElement("div");
  grid.className = "artist-card-grid";
  catalog.artists.forEach((artist) => {
    grid.append(renderArtistCard(artist));
  });
  artists.append(artistHeader, grid);

  const board = renderShowBoardShell(
    "homeShowBoard",
    "Recently checked events",
    "When event-specific links are verified, they appear here so you can review the date, venue, and ticket destination before leaving for checkout."
  );

  const disclosure = document.createElement("section");
  disclosure.className = "section-grid home-disclosure";
  disclosure.setAttribute("aria-labelledby", "homeDisclosureTitle");
  text(disclosure, "h2", "Affiliate disclosure").id = "homeDisclosureTitle";
  text(
    disclosure,
    "p",
    "Some ticket links may be affiliate links, which means we may earn a commission at no extra cost to you. That does not change which links we show: ticket destinations still need to be checked, and providers control final prices, fees, availability, delivery, and checkout terms."
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
  text(article, "p", activeProviders.length ? "Checked ticket path" : "Artist guide available", "status-badge");
  text(
    article,
    "p",
    activeProviders.length
      ? "Open the artist page to see checked event links when they are available."
      : "Use the guide to understand what to check before buying.",
    "card-status"
  );
  article.append(buttonLink("View artist", `/artists/${artist.slug}`, activeProviders.length ? "primary" : "secondary"));
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
      text(article, "p", "No checked ticket link is available for this specific date yet.", "disclosure-note");
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
        "No checked ticket link is available here yet. We only show ticket buttons when we can verify the show and destination.",
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
  text(header, "p", "Practical guides for comparing final prices, avoiding risky listings, and understanding ticket provider terms.");
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
    "Find major artists, see whether checked ticket links are available, and use the buying guidance before you leave for a ticket provider."
  );
  text(
    section,
    "p",
    "A listed artist does not mean current tickets, prices, venues, or availability are confirmed. Ticket buttons appear only when the destination has been checked."
  );
  const grid = document.createElement("div");
  grid.className = "artist-card-grid";
  catalog.artists.forEach((artist) => grid.append(renderArtistCard(artist)));
  const note = document.createElement("section");
  note.className = "nested-panel";
  text(note, "h2", "Publishing status");
  text(note, "p", "Artist pages remain useful even when no checked event link is available. Live price comparison is coming later; for now, we focus on verified links and practical buying guidance.");
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
    "Each card shows one checked event date and only links to the ticket URL for that exact event when one is available."
  );
  section.append(showBoard);

  const summary = document.createElement("section");
  summary.className = "split-section";
  const left = document.createElement("div");
  text(left, "h2", `About ${artist.name}`);
  text(left, "p", artist.factual_summary);
  const right = document.createElement("div");
  text(right, "h2", "Ticket link status");
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
    "This page does not list unverified tour dates, invented prices, speculative venues, or unchecked checkout links. Final prices, fees, availability, and delivery terms should be confirmed on the ticketing platform before purchase."
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
      "No. This page does not publish tour dates unless event details have been checked. Use the verified ticket link, when available, to confirm current platform information."
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
    "Use these guides to answer practical ticket-buying questions before you leave for a provider site."
  );
  text(
    section,
    "p",
    "Live price comparison is coming later. For now, the guides help you understand final totals, fees, resale risks, delivery terms, and checkout checks."
  );
  const grid = document.createElement("div");
  grid.className = "card-grid guide-grid";
  guidePages.forEach((guide) => grid.append(renderInfoCard(guide.h1, guide.description, link("Read guide", `/guides/${guide.slug}`, "text-link"))));
  const links = document.createElement("div");
  links.className = "action-row";
  links.append(buttonLink("Find an artist", "/artists", "primary"), buttonLink("How it works", "/how-it-works", "secondary"));
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
  text(next, "p", "Find an artist page with checked ticket links where available, or read how TourTicketCompare decides what to publish.");
  const actions = document.createElement("div");
  actions.className = "action-row";
  actions.append(buttonLink("Find an artist", "/artists", "primary"), buttonLink("How it works", "/how-it-works", "secondary"));
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
    "TourTicketCompare helps fans move from artist research to checked ticket options without fake prices, invented dates, or dead-end ticket buttons.",
    "lead"
  );
  const grid = document.createElement("div");
  grid.className = "card-grid";
  grid.append(
    renderInfoCard("We check official and approved sources", "Event cards and ticket links must be backed by sources we can review. We do not scrape unofficial listings."),
    renderInfoCard("We keep event links specific", "A ticket button on an event card must point to the checked destination for that exact show date, not a generic artist page."),
    renderInfoCard("We hide unchecked buttons", "If we cannot verify the ticket destination, we do not show a button just to make a page look fuller."),
    renderInfoCard("We are building live comparison", "Live price comparison is coming later. Until then, final prices and fees are confirmed on the ticket provider site.")
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
      "TourTicketCompare is an independent, unofficial ticket research site. Some outbound ticket links may be affiliate links, which means we may earn a commission if you click through and buy tickets, at no extra cost to you.",
      "lead"
    );

    const independence = document.createElement("section");
    independence.className = "nested-panel";
    text(independence, "h2", "Our independence");
    text(
      independence,
      "p",
      "Affiliate relationships do not control which links we show. We only publish ticket buttons when the artist, event, and destination can be checked, and we do not add fake prices, invented dates, or dead-end listings to make a page look fuller."
    );

    const providerTerms = document.createElement("section");
    providerTerms.className = "nested-panel";
    text(providerTerms, "h2", "What providers control");
    providerTerms.append(
      createList(
        [
          "Final ticket prices and service fees.",
          "Seat details, delivery methods, and transfer timing.",
          "Ticket availability, purchase limits, and checkout rules.",
          "Refund, cancellation, resale, and event-change terms."
        ],
        "check-list"
      )
    );

    const checkout = document.createElement("section");
    checkout.className = "nested-panel";
    text(checkout, "h2", "Before you buy");
    text(
      checkout,
      "p",
      "Always confirm the event date, venue, seat information, final total, delivery terms, refund rules, transfer rules, and checkout terms on the ticket provider site before paying."
    );

    const disclosure = document.createElement("section");
    disclosure.className = "nested-panel";
    text(disclosure, "h2", "How this supports the site");
    text(
      disclosure,
      "p",
      "Affiliate commissions help support the site, but they do not change the price you pay and they do not weaken our verification rules. If a link cannot be checked, it should not appear as a ticket button."
    );

    const actions = document.createElement("div");
    actions.className = "action-row";
    actions.append(buttonLink("Find an artist", "/artists", "primary"), buttonLink("Read buying guides", "/guides", "secondary"));
    section.append(independence, providerTerms, checkout, disclosure, actions);
    main.replaceChildren(section);
    return;
  }

  const content = {
    about: [
      "About TourTicketCompare",
      "TourTicketCompare is an independent, unofficial ticket research site made by fans for fans of major live music tours.",
      "The site helps fans find checked ticket options where available, understand buying risks, and avoid fake prices, invented dates, and dead-end listings. We do not sell tickets directly."
    ],
    contact: [
      "Contact",
      "Contact TourTicketCompare about source corrections, event-link issues, artist pages, partnerships, or editorial questions.",
      "Email hello@tourticketcompare.com. Please include the artist, event date, source URL, and what needs checking when sending a correction."
    ],
    "editorial-policy": [
      "Editorial policy",
      "TourTicketCompare publishes artist and ticket-link information only when the source can be checked.",
      "We use official artist, ticketing, and approved affiliate sources where available. We do not scrape, invent tour dates, publish fake prices, or add Event schema without verified event data."
    ],
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
  actions.append(buttonLink("Find an artist", "/artists", "primary"), buttonLink("Return home", "/", "secondary"));
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
