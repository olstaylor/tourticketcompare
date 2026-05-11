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
    label: "Open Ticketmaster artist page",
    bullets: ["Artist-level page, not a date-specific event link", "Provider sets prices, fees, availability, and checkout terms"]
  },
  seatgeek: {
    name: "SeatGeek",
    label: "Open SeatGeek artist page",
    bullets: ["Shown only when a verified destination is available"]
  },
  "vivid-seats": {
    name: "Vivid Seats",
    label: "Open Vivid Seats artist page",
    bullets: ["Shown only when a verified destination is available"]
  }
};

const guidePages = [
  {
    slug: "how-to-compare-concert-ticket-prices",
    title: "How to Compare Concert Ticket Prices | TourTicketCompare",
    description:
      "Compare concert ticket prices by checking final totals, seat details, delivery timing, and provider terms. Know what to compare and what to avoid.",
    h1: "How do I compare ticket prices safely?",
    intro:
      "Comparing ticket prices means comparing final totals, not first displayed prices. Open two or more provider pages for the same show, check what each price includes, and verify the seat and terms are the same before you decide.",
    sections: [
      ["Find the same show on multiple providers", "Search for the artist and date on Ticketmaster, SeatGeek, Vivid Seats, or other official platforms. Write down the venue and date so you know you are looking at the right event. Screenshot the artist name, date, and venue from each site to confirm they match."],
      ["Scroll to the final total before comparing", "Scroll past the first displayed price. Note the seat location (section, row, number), delivery method (instant download, mobile transfer, shipped), and final total including all fees, taxes, and delivery charges. This final number is what you will actually pay."],
      ["Check the same details are included", "Compare apples to apples: same artist, same date, same venue, similar seat quality, similar delivery speed. One site might offer cheaper delivery; another might charge more for a front-row seat. Verify each site is showing the same level of access."],
      ["Review the refund and transfer rules", "Before clicking buy, read whether the ticket is refundable, whether you can resell or transfer it, how long transfers take, and what happens if the event is cancelled or rescheduled. These rules differ between official and resale platforms."],
      ["Spot misleading or unsafe listings", "Avoid listings with unclear seat details, no refund policy stated, countdown timers creating urgency, requests to pay outside the official site, or pages that do not clearly match the event. If the page does not say which artist, date, and venue are shown, do not buy."],
    ],
    faq: [
      ["Can I trust the first price I see?", "No. Providers display prices differently. Always scroll to the final checkout total including fees, taxes, and delivery. That is the real price you will pay."],
      ["Does TourTicketCompare compare prices for me?", "No. TourTicketCompare does not compare live prices. We show you verified ticket destinations so you can check prices yourself on official or resale platforms."],
      ["Why do totals change at checkout?", "Providers may add or recalculate fees, taxes, delivery charges, or currency conversion during checkout. Always review the final total before entering payment details."],
      ["Should I use a resale platform?", "Resale platforms like SeatGeek and Vivid Seats are real marketplaces for verified tickets. Check the seller terms, buyer protections, and transfer rules before buying. Official channels like Ticketmaster sell direct from the event."]
    ]
  },
  {
    slug: "ticketmaster-vs-seatgeek-vs-vivid-seats",
    title: "Why Ticket Prices Vary Between Sites | TourTicketCompare",
    description:
      "Understand why concert ticket prices can vary between ticket sites because of fees, inventory type, demand, seat location, delivery, and seller terms.",
    h1: "Why do prices vary between ticket sites?",
    intro:
      "Two ticket pages can look similar but lead to different final totals. Fees, inventory type, seat location, delivery method, currency, and seller rules can all affect what you actually pay.",
    sections: [
      ["What to check", "Look beyond the first displayed price. Check whether the ticket is primary or resale, where the seat is, how delivery works, whether fees are included, and what the full checkout total is."],
      ["Red flags", "Watch for vague listing titles, missing seat information, unclear transfer timing, currency surprises, or a final total that changes sharply at checkout."],
      ["Before you buy", "Compare like-for-like tickets whenever possible: same artist, same date, same venue, similar seat quality, similar delivery terms, and the final price after fees."],
      ["What TourTicketCompare verifies", "We verify ticket destinations before showing buttons. We do not claim one ticket site is always cheaper or better."]
    ],
    faq: [
      ["Can one site be cheaper than another?", "Sometimes, but it depends on the specific event, seat, fees, and seller terms. Always compare the final checkout total."],
      ["Does TourTicketCompare rank providers by price?", "No. We do not rank providers by price because final fees and inventory vary between events. Always compare the full checkout total on each site."]
    ]
  },
  {
    slug: "how-to-avoid-overpaying-for-concert-tickets",
    title: "How to Avoid Overpaying for Concert Tickets | TourTicketCompare",
    description:
      "Use practical checks to avoid overpaying for concert tickets by reviewing final fees, seat location, seller terms, delivery timing, and misleading urgency.",
    h1: "How do I avoid overpaying for concert tickets?",
    intro:
      "There is no magic trick for every concert ticket. The safer approach is to slow down, compare the real checkout total, and avoid listings that hide important details.",
    sections: [
      ["What to check", "Check the final total, seat view, ticket type, transfer timing, refund terms, seller details where available, and whether the page clearly matches the artist and date."],
      ["Red flags", "Treat unrealistic prices, social media sellers, vague screenshots, pressure tactics, and requests for unprotected payment methods as warning signs."],
      ["Before you buy", "Pause before paying. Review the final order summary, read the buyer terms, and make sure the ticket provider explains how and when you receive the ticket."],
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
      "Learn when to buy concert tickets by weighing demand, official onsales, resale activity, seat choice, group plans, and your risk tolerance.",
    h1: "When should I buy concert tickets?",
    intro:
      "The right buying moment depends on the artist, the venue, demand, seat preferences, and how much risk you are comfortable taking. No timing rule works for every show.",
    sections: [
      ["What to check", "Check whether tickets are in an official onsale, whether resale listings are active, how many seats fit your budget, whether your preferred section is limited, and whether waiting would risk missing the seats you want."],
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
      "Understand official tickets vs resale tickets, including fees, seat details, transfer timing, seller terms, protections, and checkout checks.",
    h1: "What is the difference between official tickets and resale?",
    intro:
      "Official and resale tickets can both lead to real seats, but the buying experience and terms can be different. The safest choice depends on the event, ticket type, seller terms, and final total.",
    sections: [
      ["What to check", "Check whether the ticket is official primary inventory or resale, then review seat details, fees, transfer timing, seller terms, and buyer protections."],
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
      "Essential guides for comparing ticket prices, checking official vs. resale, deciding when to buy, and confirming final terms before checkout."
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
  return `${artist.name} ticket links and buying guidance`;
}

function artistPageIntro(artist) {
  return `Find checked ticket links for ${artist.name} when available, plus practical guidance before you leave for a provider site.`;
}

function renderProviderButtons(artist, surface) {
  const links = ticketLinksForArtist(artist.slug).filter((item) => providerEnabled(slugify(item.provider)));
  const panel = document.createElement("section");
  panel.className = "provider-panel";
  panel.setAttribute("aria-labelledby", "providerTitle");
  text(panel, "h2", "Artist-level ticket pages").id = "providerTitle";

  if (!links.length) {
    text(panel, "p", "No checked artist-level ticket page is available yet. We hide ticket buttons until we can verify the destination.", "muted");
    return panel;
  }

  const actions = document.createElement("div");
  actions.className = "provider-actions";
  links.forEach((item) => {
    const providerSlug = slugify(item.provider);
    const copy = providerCopy[providerSlug] || { name: item.provider, label: `Open ${item.provider} artist page`, bullets: [] };
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
    ctaLabel = "View artist page";
    ctaHref = `/artists/${data.slug}`;
  } else if (type === "event") {
    const isoField = data.datetime_iso || data.dateTimeISO || "";
    const dateStr = formatShowDate(isoField) || "";
    const loc = [data.city, data.venue].filter(Boolean).join(" · ");
    nameEl.textContent = data.event_name || data.artist_name || "Verified show";
    desc.textContent = [dateStr, loc].filter(Boolean).join(" — ");
    const hasVerifiedLink = Boolean(safeVerifiedEventUrl(data.ticketmaster_url));
    if (hasVerifiedLink && data.id) {
      const params = new URLSearchParams({ showId: data.id, provider: "ticketmaster" });
      ctaHref = `/api/out?${params.toString()}`;
      ctaLabel = "Check verified link";
    } else {
      ctaHref = `/artists/${slugify(data.artist_slug || "")}`;
      ctaLabel = "View event guidance";
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
      "No checked result yet. We only show artists, guides, and event links that have been added to our verified dataset.";
    container.append(statusEl);
    return;
  }

  statusEl.textContent = `${total} result${total === 1 ? "" : "s"} for “${query.trim()}”`;
  container.append(statusEl);

  const groups = [
    { label: "Artists", items: results.artists, type: "artist" },
    { label: "Verified events", items: results.events, type: "event" },
    { label: "Buying guides", items: results.guides, type: "guide" }
  ];

  groups.forEach(({ label, items, type }) => {
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
    container.append(group);
  });
}

function renderSearchWidget() {
  const section = document.createElement("section");
  section.id = "search-widget";
  section.className = "section-grid search-section";
  section.setAttribute("aria-labelledby", "searchSectionTitle");

  const header = document.createElement("div");
  header.className = "section-intro";
  text(header, "h2", "Search artists, events, and guides").id = "searchSectionTitle";
  text(
    header,
    "p",
    "Search what has been added to our verified dataset. We only surface artists, events, and guides that have been checked and published."
  );

  const form = document.createElement("form");
  form.className = "search-form";
  form.setAttribute("role", "search");
  form.addEventListener("submit", (e) => e.preventDefault());

  const labelEl = document.createElement("label");
  labelEl.htmlFor = "site-search";
  labelEl.className = "search-label";
  labelEl.textContent = "Search";

  const input = document.createElement("input");
  input.type = "search";
  input.id = "site-search";
  input.name = "q";
  input.className = "search-input";
  input.placeholder = "Artist name, city, venue, or guide topic";
  input.setAttribute("aria-label", "Search artists, events, and guides");
  input.setAttribute("autocomplete", "off");
  input.setAttribute("spellcheck", "false");

  form.append(labelEl, input);

  const resultsContainer = document.createElement("div");
  resultsContainer.className = "search-results";
  resultsContainer.setAttribute("role", "region");
  resultsContainer.setAttribute("aria-label", "Search results");
  resultsContainer.setAttribute("aria-live", "polite");
  resultsContainer.setAttribute("aria-atomic", "false");

  let debounceTimer;
  let eventsData = [];
  let eventsLoaded = false;

  input.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(async () => {
      const query = input.value;
      if (normalizeQuery(query).length < 2) {
        resultsContainer.replaceChildren();
        return;
      }

      if (!eventsLoaded) {
        eventsData = await loadEventsForSearch();
        eventsLoaded = true;
      }

      const matchedArtists = (catalog.artists || [])
        .filter((a) => matchesQuery(query, a.name, ...(a.genres || [])))
        .slice(0, 5);

      const matchedEvents = sortEventsForSearch(eventsData)
        .filter((e) => matchesQuery(query, e.event_name, e.city, e.venue, e.artist_name, e.tour_name))
        .slice(0, 6);

      const matchedGuides = guidePages
        .filter((g) =>
          matchesQuery(query, g.h1, g.title, g.description, ...(g.sections || []).map(([h]) => h))
        )
        .slice(0, 5);

      renderSearchResults(resultsContainer, { artists: matchedArtists, events: matchedEvents, guides: matchedGuides }, query);
    }, 300);
  });

  section.append(header, form, resultsContainer);
  return section;
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
  [
    ["See artist pages and checked event links", "Browse artist pages and verified event links where available."],
    ["Learn how to compare checkout totals", "Understand how to compare final prices, fees, provider terms, and refund rules."],
    ["Understand checked links", "See how we verify ticket links and what to expect at checkout."]
  ].forEach(([title, body]) => {
    const card = document.createElement("article");
    card.className = "info-card";
    text(card, "h3", title);
    text(card, "p", body);
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
  text(panel, "p", "TourTicketCompare is independent and unofficial. We do not sell tickets directly.");
  text(panel, "p", "Some outbound links may be affiliate links, which means we may earn a commission if you click through and buy tickets. This does not increase your ticket price or fees.");
  text(panel, "p", "Final price, fees, availability, seat details, refund rules, and checkout terms are confirmed by the provider on their site.");
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

function renderHome() {
  setMeta(routeMeta["/"], false);
  const hero = document.createElement("section");
  hero.className = "hero-panel";
  hero.setAttribute("aria-labelledby", "heroTitle");
  const copy = document.createElement("div");
  copy.className = "hero-copy-block";
  text(copy, "h1", "Browse verified ticket links and prices from top providers", "hero-title").id = "heroTitle";
  text(
    copy,
    "p",
    "Find checked destinations to ticket providers. No fake prices, no invented tours. Read practical guidance on comparing totals and confirming checkout terms before you leave.",
    "hero-subcopy"
  );
  const actions = document.createElement("div");
  actions.className = "action-row";
  const browseCta = buttonLink("Browse artists", "#featured-artists", "primary");
  browseCta.addEventListener("click", (event) => {
    const target = document.getElementById("featured-artists");
    if (target) {
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  });
  actions.append(browseCta, buttonLink("Search events", "#search-widget", "secondary"));
  const searchLink = actions.querySelector('a[href="#search-widget"]');
  if (searchLink) {
    searchLink.addEventListener("click", (event) => {
      const target = document.getElementById("search-widget");
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });
        const input = target.querySelector('input[type="search"]');
        if (input) input.focus();
      }
    });
  }
  copy.append(actions);
  hero.append(copy);

  const artists = document.createElement("section");
  artists.id = "featured-artists";
  artists.className = "section-grid";
  artists.setAttribute("aria-labelledby", "homeArtistsTitle");
  const artistHeader = document.createElement("div");
  artistHeader.className = "section-intro";
  text(artistHeader, "h2", "Featured artists").id = "homeArtistsTitle";
  text(artistHeader, "p", "Browse artist pages and checked event links where available.");
  const grid = document.createElement("div");
  grid.className = "artist-card-grid";
  catalog.artists.forEach((artist) => {
    grid.append(renderArtistCard(artist));
  });
  artists.append(artistHeader, grid);

  main.replaceChildren(hero, renderSearchWidget(), artists, renderGuidePreview());
}

function renderArtistCard(artist) {
  const article = document.createElement("article");
  article.className = "artist-card";
  text(article, "h3", artist.name);
  text(article, "p", artist.short_description || "Artist watchlist notes.", "muted");
  const activeProviders = ticketLinksForArtist(artist.slug).filter((item) => providerEnabled(slugify(item.provider)));
  text(article, "p", activeProviders.length ? "Verified ticket pages" : "No checked ticket link yet", "status-badge");
  text(
    article,
    "p",
    activeProviders.length
      ? "Artist pages show verified destinations. Event-specific buttons appear only on checked show cards."
      : "Use this page for artist details and buying guidance. Ticket links appear when we verify a destination.",
    "card-status"
  );
  article.append(buttonLink(activeProviders.length ? "View verified link" : "View ticket guidance", `/artists/${artist.slug}`, activeProviders.length ? "primary" : "secondary"));
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
      const cta = buttonLink("View event ticket link", `/api/out?${params.toString()}`, "primary");
      cta.target = "_blank";
      cta.rel = "noopener";
      article.append(cta);
      text(article, "p", "External ticketing sites set prices, fees, availability, and checkout terms.", "disclosure-note");
    } else {
      text(article, "p", "No event-specific ticket link is available for this date yet.", "disclosure-note");
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
        "No event-specific ticket link is available here yet. We only show ticket buttons when the show and destination can be verified.",
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
  text(header, "p", "Practical guides for checking final totals, understanding resale terms, avoiding risky listings, and knowing what to confirm before checkout.");
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
    "This page does not list unverified tour dates, invented prices, speculative venues, or unchecked checkout links. Final prices, fees, availability, and delivery terms should be confirmed on the provider site before purchase."
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

  // Transplant server-rendered show cards so users see real content immediately
  // rather than a loading state while the hydration fetch is in-flight.
  const existingGrid = main.querySelector("[data-show-grid]");
  const serverCards = existingGrid ? Array.from(existingGrid.querySelectorAll("article.show-card")) : [];
  if (serverCards.length) {
    const newGrid = showBoard.querySelector("[data-show-grid]");
    if (newGrid) newGrid.replaceChildren(...serverCards);
  }

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
    "Use these guides to answer practical ticket-buying questions before you leave for a provider site. Each guide focuses on checks fans can actually make: final totals, seat details, delivery timing, resale terms, and refund rules."
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
  const grid = document.createElement("div");
  grid.className = "card-grid guide-grid";
  guidePages.forEach((guide) => grid.append(renderInfoCard(guide.h1, guide.description, link("Read guide", `/guides/${guide.slug}`, "text-link"))));
  const links = document.createElement("div");
  links.className = "action-row";
  links.append(buttonLink("Find an artist", "/artists", "primary"), buttonLink("How it works", "/how-it-works", "secondary"), buttonLink("Affiliate disclosure", "/affiliate-disclosure", "secondary"));
  section.append(primer, grid, links);
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
    "TourTicketCompare is an independent, unofficial ticket research site that helps fans find checked ticket options and buying guidance. We do not sell tickets, do not compare prices, and do not send users to weak generic links.",
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

  const content = {
    about: [
      "About TourTicketCompare",
      "TourTicketCompare is an independent, unofficial ticket research site made by fans for fans of major live music tours.",
      "The site helps fans find checked ticket options where available, understand buying risks, and avoid fake prices, invented dates, and dead-end listings. We do not sell tickets directly."
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
    const verifiedSection = document.createElement("section");
    verifiedSection.className = "nested-panel";
    text(verifiedSection, "h2", "What counts as a checked or verified link");
    text(
      verifiedSection,
      "p",
      "A checked or verified ticket link must point to an exact destination URL that we have confirmed works and matches the artist, event, or provider it claims to represent. The URL must be directly accessible, use HTTPS, and resolve to the intended ticket platform. We do not show placeholder links, localhost addresses, private IP ranges, or test domain URLs as real ticket options. Every checked link is validated before publication."
    );

    const sourcesSection = document.createElement("section");
    sourcesSection.className = "nested-panel";
    text(sourcesSection, "h2", "What sources are acceptable");
    sourcesSection.append(
      createList(
        [
          "Official artist websites and verified social media accounts (for tour announcements, official dates, and verified venue information)",
          "Ticketing platform official sources (Ticketmaster, SeatGeek, Vivid Seats) for event data and artist-level pages",
          "Approved affiliate partner platforms (with verified Impact or comparable program IDs) for destination URLs",
          "Public event databases and ticketing APIs with explicit permission for public display",
          "Direct communication with official artist representatives or venue operators for event verification"
        ],
        "check-list"
      )
    );

    const excludeSection = document.createElement("section");
    excludeSection.className = "nested-panel";
    text(excludeSection, "h2", "What TourTicketCompare will not publish");
    excludeSection.append(
      createList(
        [
          "Invented or speculative tour dates, venues, or events (even if likely to be announced soon)",
          "Fake, placeholder, or estimated prices (prices are controlled by ticketing platforms, not by this site)",
          "Scraped listings or ticket data from unauthorized sources, social media posts, or third-party aggregators",
          "Resale or secondary-market listings presented as primary inventory without clear labeling",
          "Comparative price claims or savings assertions without live multi-provider verified data to support them",
          "Event schema or structured data without fully verified event details (artist, date, venue, URL)",
          "Unverified claims about availability, discounts, or special access"
        ],
        "check-list"
      )
    );

    const affiliateSection = document.createElement("section");
    affiliateSection.className = "nested-panel";
    text(affiliateSection, "h2", "How affiliate relationships are handled editorially");
    text(
      affiliateSection,
      "p",
      "Affiliate relationships do not control which artists, events, or ticket links we show. We only publish ticket buttons when the artist, event, and destination URL have been checked and verified. Affiliate commissions help support the site, but they do not weaken our verification standards. If a link cannot be verified, it must not appear as a ticket option, regardless of affiliate program status. We disclose affiliate relationships clearly on relevant pages and do not use fake urgency, countdown timers, or invented scarcity to drive clicks."
    );

    const linkMaintenanceSection = document.createElement("section");
    linkMaintenanceSection.className = "nested-panel";
    text(linkMaintenanceSection, "h2", "How broken or outdated links are treated");
    text(
      linkMaintenanceSection,
      "p",
      "Ticket links that break, redirect to a generic page, or no longer match the intended event must be updated or removed immediately when discovered. We check outbound links regularly and prioritize reports of broken or outdated links from users. If a ticketing platform changes its URL structure or discontinues a verified event page, the link is updated or hidden. Outdated links that point to past events or invalid dates are removed from public pages."
    );

    const providerSection = document.createElement("section");
    providerSection.className = "nested-panel";
    text(providerSection, "h2", "Why final availability, fees, and terms are confirmed by providers");
    text(
      providerSection,
      "p",
      "TourTicketCompare verifies that a ticket destination exists and matches the artist or event, but we do not control the inventory, pricing, fees, seat availability, delivery methods, refund policies, or checkout terms on that destination. These details are set and managed by the external ticketing platform. Fans must always confirm the final ticket price (including all fees and taxes), the seat location and view, the delivery method and timing, and the refund and transfer terms directly on the provider site before purchasing. Prices and availability can change quickly, and these changes are outside our control."
    );

    const principlesSection = document.createElement("section");
    principlesSection.className = "nested-panel";
    text(principlesSection, "h2", "Editorial principles");
    principlesSection.append(
      createList(
        [
          "Do not invent artist facts, tour dates, venues, prices, or availability.",
          "Verify artist and event claims against official sources before publication.",
          "Use only checked, working destination URLs—never placeholder, development, or test domains.",
          "Do not show provider buttons without verified destination URLs.",
          "Do not use Event schema or structured data until event details are verified.",
          "Do not claim savings, special deals, or live multi-provider comparison unless verified data supports it.",
          "Disclose affiliate relationships clearly without relying on them to determine what content is published.",
          "Update or remove broken links immediately when discovered.",
          "Respond to user reports of broken or incorrect links within a reasonable timeframe."
        ],
        "check-list"
      )
    );

    section.append(verifiedSection, sourcesSection, excludeSection, affiliateSection, linkMaintenanceSection, providerSection, principlesSection);
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
