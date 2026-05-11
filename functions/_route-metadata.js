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
    title: "How to Compare Concert Ticket Prices | TourTicketCompare",
    h1: "How do I compare ticket prices safely?",
    description:
      "Compare concert ticket prices by checking final totals, seat details, delivery timing, and provider terms. Know what to compare and what to avoid."
  },
  "/guides/ticketmaster-vs-seatgeek-vs-vivid-seats": {
    title: "Why Ticket Prices Vary Between Sites | TourTicketCompare",
    h1: "Why do prices vary between ticket sites?",
    description:
      "Understand why concert ticket prices can vary between ticket sites because of fees, inventory type, demand, seat location, delivery, and seller terms."
  },
  "/guides/how-to-avoid-overpaying-for-concert-tickets": {
    title: "How to Avoid Overpaying for Concert Tickets | TourTicketCompare",
    h1: "How do I avoid overpaying for concert tickets?",
    description:
      "Use practical checks to avoid overpaying for concert tickets by reviewing final fees, seat location, seller terms, delivery timing, and misleading urgency."
  },
  "/guides/when-is-the-best-time-to-buy-concert-tickets": {
    title: "When to Buy Concert Tickets | TourTicketCompare",
    h1: "When should I buy concert tickets?",
    description:
      "Learn when to buy concert tickets by weighing demand, official onsales, resale activity, seat choice, group plans, and your risk tolerance."
  },
  "/guides/primary-vs-resale-concert-tickets": {
    title: "Primary vs Resale Concert Tickets | TourTicketCompare",
    h1: "What is the difference between official tickets and resale?",
    description:
      "Understand official tickets vs resale tickets, including fees, seat details, transfer timing, seller terms, protections, and checkout checks."
  }
};

export const OLD_GUIDE_REDIRECTS = {
  "/guides/compare-ticket-prices-safely": "/guides/how-to-compare-concert-ticket-prices",
  "/guides/why-ticket-prices-vary": "/guides/ticketmaster-vs-seatgeek-vs-vivid-seats",
  "/guides/avoid-overpaying-concert-tickets": "/guides/how-to-avoid-overpaying-for-concert-tickets",
  "/guides/best-time-to-buy-concert-tickets": "/guides/when-is-the-best-time-to-buy-concert-tickets"
};
