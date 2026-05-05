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
    bullets: ["Shown only after a verified destination and affiliate route are configured"]
  },
  "vivid-seats": {
    name: "Vivid Seats",
    label: "View tickets on Vivid Seats",
    bullets: ["Shown only after a verified destination and affiliate route are configured"]
  }
};

const guidePages = [
  {
    slug: "how-to-compare-concert-ticket-prices",
    title: "How to Compare Concert Ticket Prices | TourTicketCompare",
    description:
      "Learn how to compare concert ticket options safely by checking provider sources, fees, availability, and final checkout totals.",
    h1: "How to compare concert ticket prices",
    intro:
      "The safest comparison starts with real providers, clear checkout destinations, and final totals rather than teaser prices. TourTicketCompare only publishes ticket buttons when the destination is verified.",
    sections: [
      ["Compare final totals", "Service fees, delivery fees, taxes, and currency differences can change the total you pay at checkout."],
      ["Check the provider source", "Make sure the ticket link clearly leads to a known platform and not an unknown redirect or placeholder page."],
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
      "Ticket platforms can differ because they may list primary inventory, resale inventory, or a mix of both. The useful comparison is the provider, final price, fees, and current availability.",
    sections: [
      ["Ticketmaster", "Ticketmaster is commonly used for primary ticketing and may also show resale options for some events."],
      ["SeatGeek", "SeatGeek is a ticket marketplace and can show resale inventory where events are supported."],
      ["Vivid Seats", "Vivid Seats is a resale marketplace with its own listing, fee, and checkout rules."]
    ],
    faq: [
      ["Are all providers available for every artist?", "No. TourTicketCompare hides provider buttons until a verified destination is configured."],
      ["Can fees differ by provider?", "Yes. Always check the final checkout total on the provider site."]
    ]
  },
  {
    slug: "how-to-avoid-overpaying-for-concert-tickets",
    title: "How to Avoid Overpaying for Concert Tickets | TourTicketCompare",
    description:
      "Practical checks for avoiding unclear fees, speculative listings, placeholder ticket links, and unsupported ticket-price claims.",
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
      ["What should I compare first?", "Compare provider legitimacy, final checkout total, ticket type, delivery method, and refund terms."]
    ]
  },
  {
    slug: "when-is-the-best-time-to-buy-concert-tickets",
    title: "Best Time to Buy Concert Tickets | TourTicketCompare",
    description:
      "Learn how timing can affect concert ticket buying decisions without relying on fake scarcity or invented pricing trends.",
    h1: "When is the best time to buy concert tickets?",
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
    title: "TourTicketCompare | Ticket Options & Availability",
    description:
      "Find verified ticket platform links for major artists. No fake prices, no placeholder buttons, and no invented tour data."
  },
  "/artists": {
    title: "Artists | TourTicketCompare",
    description:
      "Browse factual artist ticket pages with verified provider buttons where safe ticket links are configured."
  },
  "/guides": {
    title: "Concert Ticket Buying Guides | TourTicketCompare",
    description:
      "Practical guides to comparing concert ticket options, fees, resale listings, provider differences, and checkout totals."
  },
  "/how-it-works": {
    title: "How TourTicketCompare Works",
    description:
      "How TourTicketCompare verifies artist pages, provider buttons, disclosures, and ticket data before publishing public links."
  },
  "/about": {
    title: "About TourTicketCompare",
    description:
      "TourTicketCompare is an independent, unofficial ticket comparison affiliate site built around verified links and factual content."
  },
  "/contact": {
    title: "Contact TourTicketCompare",
    description: "Contact TourTicketCompare about provider links, artist data, corrections, partnerships, or editorial questions."
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
  return `${artist.name} tickets: check verified ticket options`;
}

function artistPageIntro(artist) {
  return `Use this page to check verified ticket destinations for ${artist.name}. We only show provider buttons when a destination has been configured and checked.`;
}

function renderProviderButtons(artist, surface) {
  const links = ticketLinksForArtist(artist.slug).filter((item) => providerEnabled(slugify(item.provider)));
  const panel = document.createElement("section");
  panel.className = "provider-panel";
  panel.setAttribute("aria-labelledby", "providerTitle");
  text(panel, "h2", "Verified ticket links").id = "providerTitle";

  if (!links.length) {
    text(panel, "p", "No verified ticket links are available yet. Check back later or follow for updates.", "muted");
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
  text(copy, "h1", "Find ticket options for major artists", "hero-title").id = "heroTitle";
  text(
    copy,
    "p",
    "Use factual artist pages and verified provider buttons to check ticket availability without fake prices or placeholder links.",
    "hero-subcopy"
  );
  const actions = document.createElement("div");
  actions.className = "action-row";
  actions.append(buttonLink("Browse artists", "/artists", "primary"), buttonLink("Read buying guides", "/guides", "secondary"));
  copy.append(actions);
  const trust = document.createElement("aside");
  trust.className = "trust-ledger";
  text(trust, "h2", "Built for safer ticket clicks");
  [
    "No invented tour dates, venues, prices, or availability",
    "Provider buttons appear only when a real destination is verified",
    "Affiliate links are routed server-side through /api/out",
    "Final prices and fees are always confirmed by the ticket platform"
  ].forEach((item) => text(trust, "p", item));
  hero.append(copy, trust);

  const artists = document.createElement("section");
  artists.className = "section-grid";
  artists.setAttribute("aria-labelledby", "homeArtistsTitle");
  const artistHeader = document.createElement("div");
  artistHeader.className = "section-intro";
  text(artistHeader, "h2", "Artist ticket pages").id = "homeArtistsTitle";
  text(artistHeader, "p", "Start with a factual artist page, then use verified provider buttons where routes are configured.");
  const grid = document.createElement("div");
  grid.className = "artist-card-grid";
  catalog.artists.forEach((artist) => {
    grid.append(renderArtistCard(artist));
  });
  artists.append(artistHeader, grid);

  const how = document.createElement("section");
  how.className = "section-grid";
  how.setAttribute("aria-labelledby", "howTitle");
  const howHeader = document.createElement("div");
  howHeader.className = "section-intro";
  text(howHeader, "h2", "How it works").id = "howTitle";
  text(howHeader, "p", "TourTicketCompare is built to reduce dead-end clicks and unsupported claims.");
  const steps = document.createElement("div");
  steps.className = "card-grid";
  steps.append(
    renderInfoCard("1. Pick an artist", "Choose a factual artist page instead of a fake event listing."),
    renderInfoCard("2. Check verified providers", "Only real, configured provider links are shown as buttons."),
    renderInfoCard("3. Confirm on the provider site", "The ticket platform controls current prices, fees, delivery, and availability.")
  );
  how.append(howHeader, steps);

  main.replaceChildren(hero, artists, how, renderGuidePreview());
}

function renderArtistCard(artist) {
  const article = document.createElement("article");
  article.className = "artist-card";
  text(article, "h3", artist.name);
  text(article, "p", artist.short_description || "Artist ticket options and availability notes.", "muted");
  const activeProviders = ticketLinksForArtist(artist.slug).filter((item) => providerEnabled(slugify(item.provider)));
  text(
    article,
    "p",
    activeProviders.length ? "Verified Ticketmaster link available." : "No verified ticket links are available yet.",
    "card-status"
  );
  article.append(buttonLink("View ticket options", `/artists/${artist.slug}`, activeProviders.length ? "primary" : "secondary"));
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

function renderGuidePreview() {
  const section = document.createElement("section");
  section.className = "section-grid";
  section.setAttribute("aria-labelledby", "guideTitle");
  const header = document.createElement("div");
  header.className = "section-intro";
  text(header, "h2", "Ticket buying guides").id = "guideTitle";
  text(header, "p", "Short, practical guides for comparing ticket options without fake savings claims.");
  const grid = document.createElement("div");
  grid.className = "card-grid guide-grid";
  guidePages.slice(0, 3).forEach((guide) => {
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
  text(section, "h1", "Artists").id = "artistsTitle";
  text(
    section,
    "p",
    "Browse current artist pages. Each page uses verified destination links only and does not imply that tickets, tour dates, venues, prices, or availability are confirmed by TourTicketCompare."
  );
  const grid = document.createElement("div");
  grid.className = "artist-card-grid";
  catalog.artists.forEach((artist) => grid.append(renderArtistCard(artist)));
  section.append(grid);
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
  section.append(renderProviderButtons(artist, "artist_hero"));

  const summary = document.createElement("section");
  summary.className = "split-section";
  const left = document.createElement("div");
  text(left, "h2", `About ${artist.name}`);
  text(left, "p", artist.factual_summary);
  const right = document.createElement("div");
  text(right, "h2", "Verified destination status");
  text(right, "p", artist.ticket_buying_notes);
  text(right, "p", "We do not sell tickets directly. We route users to external ticketing platforms only when the link is verified.", "disclosure-note");
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
    "This page does not list unverified tour dates, invented prices, speculative venues, or placeholder checkout links. Ticket details should be confirmed on the ticketing platform before purchase."
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
}

function renderArtistFaq(artist) {
  const faq = document.createElement("section");
  faq.className = "nested-panel faq-panel";
  text(faq, "h2", `${artist.name} ticket FAQ`);
  const items = [
    [
      `Does this page list ${artist.name} tour dates?`,
      "No. This page does not publish tour dates unless event data has been verified. Use the configured provider link to check current platform information."
    ],
    [
      `Does TourTicketCompare sell ${artist.name} tickets?`,
      "No. TourTicketCompare does not sell tickets directly. We link to external ticketing platforms when a route is verified."
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
  text(section, "h1", "Concert ticket buying guides").id = "guidesTitle";
  text(
    section,
    "p",
    "Practical, high-intent guides for checking ticket options, fees, provider differences, and resale risks before you buy."
  );
  const grid = document.createElement("div");
  grid.className = "card-grid guide-grid";
  guidePages.forEach((guide) => grid.append(renderInfoCard(guide.h1, guide.description, link("Read guide", `/guides/${guide.slug}`, "text-link"))));
  section.append(grid);
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
  text(next, "p", "Browse artist pages with verified provider buttons, or read how TourTicketCompare decides what to publish.");
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
    "TourTicketCompare is built around one rule: do not show ticket buttons, prices, tour pages, or event details unless the data is verified.",
    "lead"
  );
  const grid = document.createElement("div");
  grid.className = "card-grid";
  grid.append(
    renderInfoCard("Verify the artist page", "Artist pages use factual evergreen context and avoid invented current tour status."),
    renderInfoCard("Validate provider links", "Ticketmaster, SeatGeek, and Vivid Seats buttons appear only after a real destination is configured."),
    renderInfoCard("Send clicks server-side", "Outbound buttons route through /api/out so validation and click tracking happen before the user leaves.")
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
    ["Why are some providers missing?", "Provider buttons are hidden until the destination URL and affiliate route are verified."],
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
      "TourTicketCompare is an independent, unofficial ticket comparison affiliate site. The product focuses on factual artist pages, verified provider links, and clear disclosures instead of fake prices or invented availability.",
      "The site does not sell tickets directly. When provider links are verified, users are routed to external ticketing platforms."
    ],
    contact: [
      "Contact",
      "For provider partnerships, corrections, artist data, or editorial questions, contact the project team.",
      "Email hello@tourticketcompare.com"
    ],
    "editorial-policy": [
      "Editorial policy",
      "We publish factual, evergreen artist content and hide provider buttons until destinations are verified. We do not invent tour dates, venues, ticket availability, or prices.",
      "Event structured data should be used only when real event dates, venues, and availability are verified."
    ],
    "affiliate-disclosure": [
      "Affiliate disclosure",
      "Some outbound ticket links are affiliate links. We may earn a commission if you click through and buy tickets, at no extra cost to you.",
      "Affiliate relationships do not change provider prices, fees, availability, or checkout terms."
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
          "Do not show provider buttons without verified destination URLs.",
          "Do not use Event schema until event data is real and verified.",
          "Do not claim savings, special deals, or live comparison unless verified data supports it."
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
  text(section, "p", "This route is not published. Use the artist index or guides to find current public pages.");
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
