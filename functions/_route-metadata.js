// Shared route metadata used by functions/[[path]].js (Pages Functions).
// Edit here; do not duplicate in the consumer.

// Canonical production host. Canonicals, og:url, JSON-LD, and sitemap/llms.txt
// URLs must always reference the apex host — robots.txt already hardcodes it,
// and a request on www must not emit www canonicals.
//
// Cloudflare serves the *production* deployment on <project>.pages.dev
// permanently, so that host is not a throwaway preview: left alone it is a
// fully crawlable duplicate of the live site that self-canonicalises away from
// the apex. Every non-local host therefore emits apex canonicals (below) and
// noindex robots meta (see isIndexableOrigin). Only local dev keeps its own
// origin, so links stay clickable off-network.
export const CANONICAL_HOST = "tourticketcompare.com";
export const CANONICAL_ORIGIN = `https://${CANONICAL_HOST}`;

const LOCAL_HOSTNAMES = new Set(["localhost", "127.0.0.1", "0.0.0.0", "[::1]", "::1"]);

function hostnameOf(origin) {
  try {
    return new URL(origin).hostname.toLowerCase();
  } catch (error) {
    return "";
  }
}

export function isLocalOrigin(origin) {
  const host = hostnameOf(origin);
  return Boolean(host) && (LOCAL_HOSTNAMES.has(host) || host.endsWith(".local"));
}

export function isCanonicalOrigin(origin) {
  const host = hostnameOf(origin);
  return host === CANONICAL_HOST || host.endsWith(`.${CANONICAL_HOST}`);
}

// Only the production host (and local dev) may serve indexable HTML. Any other
// host — *.pages.dev above all — is a duplicate and must be noindex so search
// engines drop it. Note this is deliberately *not* a robots.txt disallow:
// blocking the crawl would hide the noindex and strand already-indexed copies.
export function isIndexableOrigin(origin) {
  return isCanonicalOrigin(origin) || isLocalOrigin(origin);
}

export function canonicalOrigin(origin) {
  if (isLocalOrigin(origin)) return origin;
  return CANONICAL_ORIGIN;
}

// Search-result display budgets. Google truncates a SERP title at roughly 60
// characters and a meta description at roughly 155-160, so every title below
// stays within TITLE_LENGTH_LIMIT and every description within
// META_DESCRIPTION_LENGTH_LIMIT.
// Generated metadata in functions/[[path]].js is fitted to the same budgets,
// and scripts/audit-internal-links.mjs --check fails the build on any route
// that exceeds them.
export const TITLE_LENGTH_LIMIT = 60;
export const META_DESCRIPTION_LENGTH_LIMIT = 160;

export const TRUST_ROUTES = {
  "/": {
    title: "Compare Concert Tickets & Tour Dates | TourTicketCompare",
    description:
      "Compare concert ticket prices using timestamped provider snapshots for verified events, find tour dates, then confirm fees and availability with the provider.",
    indexable: true
  },
  "/compare-concert-ticket-prices": {
    title: "Compare Concert Ticket Prices | TourTicketCompare",
    description:
      "Find a checked concert event, compare timestamped provider price snapshots for that same show, then confirm seats, fees, and the final total with the provider.",
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
      "Practical concert-ticket guides on matching listings, checking final totals, choosing primary or resale, timing a purchase, and confirming provider terms.",
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
  "/currency-converter": {
    title: "Currency Converter for Concert Tickets | TourTicketCompare",
    description:
      "Convert a ticket budget between currencies using European Central Bank reference rates, then confirm the checkout currency and card fees with the provider.",
    indexable: true,
    breadcrumb: [{ name: "Currency converter", path: "/currency-converter" }]
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
  "/guides/how-to-compare-event-ticket-prices": {
    title: "How to Compare Event Ticket Prices | TourTicketCompare",
    h1: "How to Compare Event Ticket Prices",
    description:
      "Compare event ticket prices across concerts, sports, and theatre by matching the exact event, seat or section, ticket type, fees, and final checkout total.",
    fullContent: true,
    datePublished: "2026-07-14",
    lastmod: "2026-07-14"
  },
  "/guides/how-to-compare-concert-ticket-prices": {
    title: "How to Compare Concert Ticket Prices | TourTicketCompare",
    h1: "How to Compare Concert Ticket Prices Safely",
    description:
      "A practical method for comparing the same concert: match the listing, use timestamped snapshots to shortlist providers, then verify the final total and terms.",
    fullContent: true,
    datePublished: "2026-06-11",
    lastmod: "2026-07-22"
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
    h1: "SeatGeek vs Ticketmaster: which is cheaper or better?",
    description:
      "Is SeatGeek cheaper or better than Ticketmaster? Compare primary and resale tickets, fees, Deal Score, delivery, and buyer protections before buying.",
    fullContent: true,
    datePublished: "2026-07-13",
    lastmod: "2026-07-28"
  },
  "/guides/how-to-avoid-overpaying-for-concert-tickets": {
    title: "Avoid Overpaying for Concert Tickets | TourTicketCompare",
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
      "Decide between primary and resale concert tickets by weighing ticket type, seat choice, final total, transfer timing, provider terms, and certainty.",
    fullContent: true,
    datePublished: "2026-06-11",
    lastmod: "2026-07-22"
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
    title: "Ticketmaster vs StubHub: Compare Safely | TourTicketCompare",
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
      "Know which concert-ticket charges to compare, how to read the order summary, and when a lower displayed price is not the lower final total.",
    fullContent: true,
    datePublished: "2026-06-11",
    lastmod: "2026-07-22"
  },
  "/guides/ticket-delivery-and-transfer-timing": {
    title: "Ticket Delivery & Transfer Timing | TourTicketCompare",
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
    title: "How to Prepare for a Concert Onsale | TourTicketCompare",
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
    title: "Concert Postponed or Cancelled | TourTicketCompare",
    h1: "What should I do if a concert is postponed or cancelled?",
    description:
      "Learn what to check if a concert is postponed, rescheduled, or cancelled, including provider updates, refunds, transfers, resale rules, and ticket delivery.",
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
