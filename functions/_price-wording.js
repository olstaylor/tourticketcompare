// The site's one vocabulary for prices and how fresh they are.
//
// Every price on the site is the same kind of thing: one ticket site's listed
// price for one date, captured when the site last checked it. Pages used to
// call that a "snapshot", a "current" price, a "recent" price and a "listed
// price" interchangeably, and restated the same caveats on every card
// (owner report, 2026-10-06). The rules now:
//
//   - The visible noun is "listed price". "Snapshot", "current" and "recent"
//     are not used for prices in page copy (code and docs may still say
//     snapshot; it is the data model's word).
//   - Freshness is "Checked <age>" on boards and buttons, with the absolute
//     capture time in the <time> element's datetime/title. Text that search
//     engines may quote (leads, FAQ answers) uses the absolute time instead,
//     because a relative age goes stale in a cached copy.
//   - The caveat (a listed price is not the final total) is said once per page,
//     in PRICE_DISCLOSURE beside the money disclosure, not on every card.
//
// public/app.js is a classic script and cannot import this module, so it
// mirrors these strings; scripts/price-wording.test.mjs fails if they drift.

/** The one per-page caveat, rendered in the money disclosure line. */
export const PRICE_DISCLOSURE = "Prices are each site's listed price when last checked, not your final total.";

/** A card or row whose price lanes were checked and none had a price. */
export const NO_PRICE_NOTE = "No listed price right now.";

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
  return `No listed price on ${laneNames} at the last check (${when}).`;
}
