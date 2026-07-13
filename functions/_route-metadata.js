// Shared route metadata used by functions/[[path]].js (Pages Functions).
// Edit here; do not duplicate in the consumer.

// Canonical production host. Canonicals, og:url, JSON-LD, and sitemap/llms.txt
// URLs must always reference the apex host — robots.txt already hardcodes it,
// and a request on www must not emit www canonicals. Preview deploys
// (*.pages.dev) and local dev keep their own origin so links stay
// self-referencing.
export const CANONICAL_HOST = "tourticketcompare.com";
export const CANONICAL_ORIGIN = `https://${CANONICAL_HOST}`;

export function canonicalOrigin(origin) {
  try {
    const host = new URL(origin).hostname.toLowerCase();
    if (host === CANONICAL_HOST || host.endsWith(`.${CANONICAL_HOST}`)) return CANONICAL_ORIGIN;
  } catch (error) {
    // fall through to the request origin
  }
  return origin;
}

export const TRUST_ROUTES = {
  "/": {
    title: "Compare Concert Ticket Prices & Find Tour Dates | TourTicketCompare",
    description:
      "Compare available, timestamped SeatGeek and Vivid Seats listed-price snapshots for verified concert events, find tour dates, and confirm fees and availability with the provider.",
    indexable: true
  },
  "/compare-concert-ticket-prices": {
    title: "Compare Concert Ticket Prices | SeatGeek vs Vivid Seats",
    description:
      "Compare timestamped SeatGeek and Vivid Seats listed-price snapshots for the same verified concert event, then confirm fees, availability, seats, and final totals with the provider.",
    indexable: true,
    breadcrumb: [{ name: "Compare Concert Ticket Prices", path: "/compare-concert-ticket-prices" }]
  },
  "/artists": {
    title: "Artists | TourTicketCompare",
    description:
      "Browse major artist pages with verified ticket links where available and practical buying guidance on what to check before checkout.",
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
      "How TourTicketCompare checks official sources, keeps ticket links specific, and gives you clear guidance on what to confirm before checkout.",
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
    h1: "How to Compare Concert Ticket Prices Safely",
    description:
      "Compare concert ticket prices using exact-event, ticket-type, seat, fee, delivery, and buyer-protection checks, with timestamped provider snapshots as a starting point.",
    fullContent: true,
    datePublished: "2026-06-11",
    lastmod: "2026-07-13"
  },
  "/guides/ticketmaster-vs-seatgeek-vs-vivid-seats": {
    title: "Ticketmaster vs SeatGeek vs Vivid Seats | TourTicketCompare",
    h1: "Ticketmaster vs SeatGeek vs Vivid Seats: key differences",
    description:
      "Compare Ticketmaster, SeatGeek, and Vivid Seats by ticket type, listed prices, fees, seat details, delivery, and buyer protections before choosing where to buy.",
    fullContent: true,
    datePublished: "2026-06-11",
    lastmod: "2026-07-13"
  },
  "/guides/seatgeek-vs-ticketmaster": {
    title: "SeatGeek vs Ticketmaster | TourTicketCompare",
    h1: "SeatGeek vs Ticketmaster: which should you use?",
    description:
      "Compare SeatGeek and Ticketmaster by primary vs resale tickets, fees, Deal Score, delivery, buyer protections, and final checkout terms.",
    fullContent: true,
    datePublished: "2026-07-13",
    lastmod: "2026-07-13"
  },
  "/guides/how-to-avoid-overpaying-for-concert-tickets": {
    title: "How to Avoid Overpaying for Concert Tickets | TourTicketCompare",
    h1: "How do I avoid overpaying for concert tickets?",
    description:
      "Use practical checks to avoid overpaying for concert tickets by reviewing final fees, seat location, seller terms, delivery timing, and misleading urgency.",
    fullContent: true,
    datePublished: "2026-06-11",
    lastmod: "2026-06-17"
  },
  "/guides/when-is-the-best-time-to-buy-concert-tickets": {
    title: "When to Buy Concert Tickets | TourTicketCompare",
    h1: "When should I buy concert tickets?",
    description:
      "Learn how to choose when to buy concert tickets by weighing certainty, seat choice, group seating, budget, delivery timing, provider terms, and risk tolerance.",
    fullContent: true,
    datePublished: "2026-06-11",
    lastmod: "2026-06-19"
  },
  "/guides/primary-vs-resale-concert-tickets": {
    title: "Primary vs Resale Concert Tickets | TourTicketCompare",
    h1: "What is the difference between official tickets and resale?",
    description:
      "Understand official tickets vs resale tickets, including fees, seat details, transfer timing, seller terms, protections, and checkout checks.",
    fullContent: true,
    datePublished: "2026-06-11",
    lastmod: "2026-06-19"
  },
  "/guides/how-to-avoid-ticket-scams": {
    title: "How to Avoid Ticket Scams | TourTicketCompare",
    h1: "How do I avoid ticket scams and fake listings?",
    description:
      "Learn how to spot fraudulent ticket sellers, fake platforms, counterfeit tickets, and scam tactics. Use verified platforms and protect yourself at checkout.",
    fullContent: true,
    datePublished: "2026-06-11",
    lastmod: "2026-06-17"
  },
  "/guides/why-ticket-prices-change": {
    title: "Why Do Concert Ticket Prices Change? | TourTicketCompare",
    h1: "Why do concert ticket prices change?",
    description:
      "Learn why concert ticket totals can change because of onsale demand, provider pricing methods, resale seller decisions, fees, seat details, delivery, and terms.",
    fullContent: true,
    datePublished: "2026-06-11",
    lastmod: "2026-06-19"
  },
  "/guides/ticketmaster-vs-stubhub": {
    title: "Ticketmaster vs StubHub: How to Compare Safely | TourTicketCompare",
    h1: "How should I compare Ticketmaster and StubHub?",
    description:
      "Compare Ticketmaster and StubHub by checking event source, ticket type, final totals, delivery timing, and provider terms before checkout.",
    fullContent: true,
    datePublished: "2026-06-11",
    lastmod: "2026-06-19"
  },
  "/guides/seatgeek-promo-code-guide": {
    title: "SeatGeek Promo Code Guide: Verify Safely | TourTicketCompare",
    h1: "How should I verify a SeatGeek promo code safely?",
    description:
      "Learn how to verify SeatGeek promo-code claims safely by checking eligibility, final checkout totals, fees, and order terms on SeatGeek before purchase.",
    fullContent: true,
    datePublished: "2026-06-11",
    lastmod: "2026-06-19"
  },
  "/guides/concert-ticket-fees-explained": {
    title: "Concert Ticket Fees Explained | TourTicketCompare",
    h1: "What concert ticket fees should I check before buying?",
    description:
      "Understand common concert ticket fee categories and compare final checkout totals safely before you buy.",
    fullContent: true,
    datePublished: "2026-06-11",
    lastmod: "2026-06-19"
  },
  "/guides/ticket-delivery-and-transfer-timing": {
    title: "Ticket Delivery and Transfer Timing Guide | TourTicketCompare",
    h1: "How do ticket delivery and transfer timing affect risk?",
    description:
      "Learn how to check ticket delivery methods and transfer timing so checkout terms match your travel and event plans.",
    fullContent: true,
    datePublished: "2026-06-11",
    lastmod: "2026-06-19"
  },
  "/guides/how-resale-ticket-pricing-works": {
    title: "How Resale Ticket Pricing Works | TourTicketCompare",
    h1: "How does resale ticket pricing work?",
    description:
      "Understand resale ticket pricing by reviewing seller-set prices, fees, seat details, delivery timing, and provider terms before checkout.",
    fullContent: true,
    datePublished: "2026-06-11",
    lastmod: "2026-06-19"
  },
  "/guides/how-to-prepare-for-a-ticket-onsale": {
    title: "How to Prepare for a Concert Ticket Onsale | TourTicketCompare",
    h1: "How do I prepare for a concert ticket onsale?",
    description:
      "Practical pre-onsale and onsale-day routine for major concert tickets, covering presales, account setup, queues, listing checks, and what to do if you miss out.",
    fullContent: true,
    datePublished: "2026-06-11",
    lastmod: "2026-06-19"
  },
  "/guides/how-to-read-a-ticket-listing": {
    title: "How to Read a Concert Ticket Listing | TourTicketCompare",
    h1: "How do I read a concert ticket listing?",
    description:
      "Learn how to read concert ticket listings by checking section, row, seat, listing notes, ticket type, delivery method, and cross-checks before checkout.",
    fullContent: true,
    datePublished: "2026-06-11",
    lastmod: "2026-06-19"
  },
  "/guides/what-to-do-if-a-concert-is-postponed-or-cancelled": {
    title: "What to Do if a Concert Is Postponed or Cancelled | TourTicketCompare",
    h1: "What should I do if a concert is postponed or cancelled?",
    description:
      "Learn what to check if a concert is postponed, rescheduled, cancelled, or changed, including provider updates, refunds, transfers, resale rules, and ticket delivery.",
    fullContent: true,
    datePublished: "2026-06-11",
    lastmod: "2026-06-19"
  }
};

export const OLD_GUIDE_REDIRECTS = {
  "/guides/compare-ticket-prices-safely": "/guides/how-to-compare-concert-ticket-prices",
  "/guides/why-ticket-prices-vary": "/guides/why-ticket-prices-change",
  "/guides/avoid-overpaying-concert-tickets": "/guides/how-to-avoid-overpaying-for-concert-tickets",
  "/guides/best-time-to-buy-concert-tickets": "/guides/when-is-the-best-time-to-buy-concert-tickets"
};
