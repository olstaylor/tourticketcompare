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
  "Prices are listed-price snapshots from each ticket site, checked at the time shown. They can change and aren't your final total. Listed prices may already include mandatory fees. Confirm the final total for your ticket quantity, taxes, delivery and selected extras on the ticket site.";

/** The short tail on each priced card, after "Checked <age>". */
export const CARD_PRICE_TAIL = "not the final total";

/** How this site makes money, stated the same way wherever ticket buttons show. */
export const MONEY_DISCLOSURE =
  "Affiliate partners are listed before Ticketmaster. If you buy through an affiliate link, TourTicketCompare may earn a commission at no extra cost to you.";

/** A card or row whose price lanes were checked and none had a price. */
export const NO_PRICE_NOTE = "No listed-price snapshot yet.";

/** The toggle that opens a card's recorded price history. */
export const PRICE_HISTORY_LABEL = "Show price history";

/** The label above a card's provider buttons when at least one shows a price. */
export function lowestPriceLabel(pricedCount) {
  if (!pricedCount) return "";
  return pricedCount === 1 ? "Lowest listed price" : "Lowest listed prices";
}

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
  return `No listed-price snapshot from ${laneNames} at the last check (${when}).`;
}
