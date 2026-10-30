// The site's one vocabulary for prices and how fresh they are.
//
// Every price on the site is the same kind of thing: one ticket site's listed
// price for one date, captured when the site last checked it. Pages used to
// call that a "snapshot", a "current" price, a "recent" price and a "listed
// price" interchangeably, and restated the same caveats on every card
// (owner report, 2026-10-06). The rules now:
//
//   - The data is a "listed-price snapshot"; the figure on a button is a
//     "listed price". "Current" and "recent" are not used for prices: the
//     ticket site can move a price seconds after it was checked (owner
//     review, 2026-10-06).
//   - Freshness is "Checked <age>" on boards and buttons, with the absolute
//     capture time in the <time> element's datetime/title. Text that search
//     engines may quote (leads, FAQ answers) uses the absolute time instead,
//     because a relative age goes stale in a cached copy.
//   - The full caveat is said once per page, in PRICE_DISCLOSURE at the top of
//     the board; each card carries only "Checked <age> · not the final total".
//
// public/app.js is a classic script and cannot import this module, so it
// mirrors these strings; scripts/price-wording.test.mjs fails if they drift.

/** The one per-page caveat, rendered in the money disclosure line. */
export const PRICE_DISCLOSURE =
  "Starting prices are recorded separately from each ticket site, in its source currency. Seats, ticket quantities and included fees may differ, so these are not like-for-like totals. Check the full order total, delivery and terms on the ticket site.";

/** Compact context above options; the full explanation remains expandable. */
export const PRICE_SUMMARY = "Starting prices only. Seats, quantities and included fees may differ.";

/** The short tail on each priced card, after "Checked <age>". */
export const CARD_PRICE_TAIL = "not the final total";

/** How this site makes money, stated the same way wherever ticket buttons show. */
export const MONEY_DISCLOSURE =
  "Some links earn TTC a commission at no extra cost to you. The primary ticket site appears first, then marketplaces in alphabetical order. Commission does not determine the order.";

/** A card or row whose price lanes were checked and none had a price. */
export const NO_PRICE_NOTE = "No listed price yet.";

/** The toggle that opens a card's recorded price history. */
export const PRICE_HISTORY_LABEL = "Show price history";

/** The label above a card's provider buttons when at least one shows a price. */
export function lowestPriceLabel(pricedCount) {
  if (!pricedCount) return "";
  return pricedCount === 1 ? "Provider starting price" : "Separate provider starting prices";
}

// "Cheapest" (owner decision, 2026-10-17: the old blanket ban is lifted;
// 2026-10-30: "lowest price", "best price" and "best deal" are allowed on the
// same terms, and the cheapest across an artist's dates may be named).
// The word is allowed wherever it describes what the page actually shows: the
// lowest of the listed prices the site captured for one show, with each
// site's name and capture time beside it. Two rules keep it true:
//
//   - A cross-site "cheapest" needs at least two ticket sites with a fresh
//     listed price for the same show; one site's figure is only that site's
//     lowest listing, never "the cheapest".
//   - No blanket promise. The site never sees the whole market, so copy may
//     not claim the cheapest tickets anywhere, guaranteed, or that the site
//     always finds them, and no price guarantee. UNSUPPORTED_CHEAPEST_CLAIM is
//     the build check for that, shared by the smoke suite, the blog and guide
//     builders and the AI blog drafter.

/** The label for the lowest of two or more sites' listed prices for one show. */
export function cheapestListedPriceLabel(pricedSiteCount) {
  if (!(pricedSiteCount >= 2)) return "";
  return `Cheapest listed price of the ${pricedSiteCount} ticket sites checked`;
}

/** Blanket cheapest / lowest / best-price promises the site's data can never support. */
const CHEAP_WORD = String.raw`(?:cheapest|lowest(?:\s+prices?)?|best\s+(?:prices?|deals?))`;
export const UNSUPPORTED_CHEAPEST_CLAIM = new RegExp(
  [
    // "guaranteed cheapest", "always the cheapest", "guaranteed lowest price"
    String.raw`\b(?:guaranteed|guarantee|always|absolute(?:ly)?|truly)\s+(?:the\s+)?${CHEAP_WORD}\b`,
    // "cheapest tickets anywhere / online / on the market", "lowest price guaranteed"
    String.raw`\b${CHEAP_WORD}\b(?:\s+[\w'-]+){0,3}?\s+(?:anywhere|online|guaranteed|on\s+the\s+(?:web|internet|market)|in\s+the\s+(?:market|world))\b`,
    // "best price guarantee", "lowest price promise", "price match"
    String.raw`\b(?:best|lowest)\s+price\s+(?:guarantee|promise)|\bprice[\s-]+match(?:ing|ed)?\b`,
    // "we find the cheapest", "TourTicketCompare finds you the best price"
    String.raw`\b(?:we|tourticketcompare|this\s+site|the\s+site)\s+(?:always\s+|will\s+)?(?:finds?|gets?|shows?|has|have|offers?|sells?)\s+(?:you\s+)?(?:the\s+)?${CHEAP_WORD}\b`
  ].join("|"),
  "i"
);

/** "under an hour ago", "5 hours ago", "3 days ago". */
export function relativeCheckAge(fetchedAt, now = Date.now()) {
  const captured = Date.parse(String(fetchedAt || ""));
  if (!Number.isFinite(captured)) return "recently";
  const minutes = Math.max(0, Math.round((now - captured) / 60000));
  if (minutes < 60) return "under an hour ago";
  const hours = Math.round(minutes / 60);
  if (hours < 48) return `${hours} hour${hours === 1 ? "" : "s"} ago`;
  const days = Math.round(hours / 24);
  return `${days} day${days === 1 ? "" : "s"} ago`;
}

/** A checked card with no price, naming the lanes checked and when. */
export function noPriceAtLastCheck(laneNames, when) {
  return `No listed price from ${laneNames} at the last check (${when}).`;
}
