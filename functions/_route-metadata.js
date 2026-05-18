// Shared route metadata used by both functions/[[path]].js (Pages Functions)
// and scripts/build-standalone-worker.mjs (standalone Worker build).
// Edit here; do not duplicate in either consumer.

export const TRUST_ROUTES = {
  "/": {
    title: "Find Verified Ticket Options for Major Tours | TourTicketCompare",
    description:
      "Find checked ticket links for major tours, read practical buying guidance, and confirm final prices and fees on the ticket provider site.",
    indexable: true
  },
  "/artists": {
    title: "Artists | TourTicketCompare",
    description:
      "Browse major artist pages with verified ticket links where available, practical guidance, and no fake prices or invented dates.",
    indexable: true,
    breadcrumb: [{ name: "Artists", path: "/artists" }]
  },
  "/guides": {
    title: "Concert Ticket Buying Guides | TourTicketCompare",
    description:
      "Essential guides for comparing ticket prices, checking official vs. resale, deciding when to buy, and confirming final terms before checkout.",
    indexable: true,
    breadcrumb: [{ name: "Guides", path: "/guides" }]
  },
  "/how-it-works": {
    title: "How TourTicketCompare Works",
    description:
      "How TourTicketCompare checks official sources, keeps ticket links specific, and avoids fake prices or invented event details.",
    indexable: true,
    faq: true,
    breadcrumb: [{ name: "How it works", path: "/how-it-works" }]
  },
  "/about": {
    title: "About TourTicketCompare",
    description:
      "TourTicketCompare is an independent, unofficial ticket research site for major live music tours and verified links where available.",
    indexable: true,
    breadcrumb: [{ name: "About", path: "/about" }]
  },
  "/contact": {
    title: "Contact TourTicketCompare",
    description: "Contact TourTicketCompare about broken ticket links, incorrect event details, provider-link issues, or general site feedback.",
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
      "How TourTicketCompare uses affiliate links while staying independent, unofficial, and focused on checked ticket destinations.",
    indexable: true,
    breadcrumb: [{ name: "Affiliate disclosure", path: "/affiliate-disclosure" }]
  }
};

export const GUIDE_ROUTES = {
  "/guides/how-to-compare-concert-ticket-prices": {
    title: "How to Compare Concert Ticket Prices Safely | TourTicketCompare",
    h1: "How to Compare Concert Ticket Prices Safely",
    description:
      "Learn how to compare concert ticket prices by checking final checkout totals, fees, seat details, delivery terms, and provider rules before you buy.",
    fullContent: true
  },
  "/guides/ticketmaster-vs-seatgeek-vs-vivid-seats": {
    title: "Why Ticket Prices Vary Between Sites | TourTicketCompare",
    h1: "Why do prices vary between ticket sites?",
    description:
      "Understand why concert ticket prices can vary between ticket sites because of fees, inventory type, demand, seat location, delivery, and seller terms.",
    fullContent: true
  },
  "/guides/how-to-avoid-overpaying-for-concert-tickets": {
    title: "How to Avoid Overpaying for Concert Tickets | TourTicketCompare",
    h1: "How do I avoid overpaying for concert tickets?",
    description:
      "Use practical checks to avoid overpaying for concert tickets by reviewing final fees, seat location, seller terms, delivery timing, and misleading urgency.",
    fullContent: true
  },
  "/guides/when-is-the-best-time-to-buy-concert-tickets": {
    title: "When to Buy Concert Tickets | TourTicketCompare",
    h1: "When should I buy concert tickets?",
    description:
      "Learn how to choose when to buy concert tickets by weighing certainty, seat choice, group seating, budget, delivery timing, provider terms, and risk tolerance.",
    fullContent: true
  },
  "/guides/primary-vs-resale-concert-tickets": {
    title: "Primary vs Resale Concert Tickets | TourTicketCompare",
    h1: "What is the difference between official tickets and resale?",
    description:
      "Understand official tickets vs resale tickets, including fees, seat details, transfer timing, seller terms, protections, and checkout checks.",
    fullContent: true
  },
  "/guides/how-to-avoid-ticket-scams": {
    title: "How to Avoid Ticket Scams | TourTicketCompare",
    h1: "How do I avoid ticket scams and fake listings?",
    description:
      "Learn how to spot fraudulent ticket sellers, fake platforms, counterfeit tickets, and scam tactics. Use verified platforms and protect yourself at checkout.",
    fullContent: true
  },
  "/guides/why-ticket-prices-change": {
    title: "Why Do Concert Ticket Prices Change? | TourTicketCompare",
    h1: "Why do concert ticket prices change?",
    description:
      "Understand the mechanics behind ticket price changes: dynamic pricing, supply and demand, fees, resale markups, and why the final total differs from the headline price.",
    fullContent: true
  },
  "/guides/ticketmaster-vs-stubhub": {
    title: "Ticketmaster vs StubHub: Which Should You Use? | TourTicketCompare",
    h1: "Ticketmaster vs StubHub: Which is right for you?",
    description:
      "Compare Ticketmaster (official primary seller) and StubHub (resale marketplace): features, fees, buyer protection, pricing, and when to use each platform.",
    fullContent: true
  },
  "/guides/how-resale-ticket-pricing-works": {
    title: "How Resale Ticket Pricing Works | TourTicketCompare",
    h1: "How does resale ticket pricing work?",
    description:
      "Understand resale ticket pricing: why markups exist, how demand affects prices, how to spot fair vs overpriced listings, and when resale prices drop.",
    fullContent: true
  }
};

export const OLD_GUIDE_REDIRECTS = {
  "/guides/compare-ticket-prices-safely": "/guides/how-to-compare-concert-ticket-prices",
  "/guides/why-ticket-prices-vary": "/guides/why-ticket-prices-change",
  "/guides/avoid-overpaying-concert-tickets": "/guides/how-to-avoid-overpaying-for-concert-tickets",
  "/guides/best-time-to-buy-concert-tickets": "/guides/when-is-the-best-time-to-buy-concert-tickets"
};
