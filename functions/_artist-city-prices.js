// @ts-check
// Per-date price answer for artist-city pages (`/artists/<artist>/tickets/<city>`).
//
// The page's job is to answer "How much are <Artist> tickets in <City>?". Until
// now the only place a price could appear was a CTA badge inside an individual
// show card, so the question was answerable only by reading every card and
// comparing the buttons by eye. This module turns the prices the route already
// fetched into one ordered, per-date answer.
//
// Three rules shape everything here, and none of them is a style preference:
//
//   1. SAME EVENT ONLY. `SAFE_PUBLISHING_RULES.md` § Price Display,
//      `docs/CONTENT_RULES.md` § Price Data and `docs/PROVIDER_DATA_POLICY.md`
//      (lines 71 and 165) all scope a price comparison to snapshots "for the
//      same local event and currency". Identifying the lower listed snapshot
//      across providers *within one event* is explicitly approved; taking a
//      minimum across different dates is not approved anywhere. So this module
//      computes a lowest per row and never across rows, and deliberately
//      exposes no city-wide minimum for a caller to print as "from <price>".
//      If that grant is ever obtained it belongs in the policy documents first.
//
//   2. NO SECOND GATE. Eligibility is decided entirely by the caller-supplied
//      `ctaSpecsFor`, which is `serverShowCtaSpecs` — the same function that
//      decides what a CTA button prints. A price can therefore never appear in
//      the answer table that would not also appear on that date's button at the
//      same render, which is what keeps the display-rights, approved-source,
//      verified-URL, feature-flag, currency and freshness gates authoritative in
//      one place instead of two.
//
//   3. NEVER MIX CURRENCIES. A row whose eligible lanes disagree on currency is
//      a data fault, not a multi-currency answer — one city is one market — so
//      the row's prices are dropped rather than compared.
//
// Indexability is deliberately NOT an input. A single-date artist-city page is
// `noindex,follow` because it has nothing to rank with that its artist page does
// not already have; that is a routing decision and says nothing about whether a
// visitor who lands there should be told the price. The route's own show cards
// already render their gated badges on those pages, so withholding the same
// figures from the answer table would be inconsistent as well as unhelpful.

/**
 * @typedef {Object} CityPriceLane
 * @property {string} provider   Provider slug, e.g. "vivid-seats".
 * @property {string} name       Display name, e.g. "Vivid Seats".
 * @property {number} price
 * @property {string} currency   ISO 4217, uppercase.
 * @property {string} fetchedAt  Snapshot capture instant (ISO 8601).
 * @property {string} href       Tracked /api/out destination for this lane.
 */

/**
 * @typedef {Object} CityPriceRow
 * @property {string} showId
 * @property {string} venue
 * @property {string} datetimeISO
 * @property {string} timezone
 * @property {number} ts
 * @property {string} currency            "" when the row has no eligible lane.
 * @property {CityPriceLane[]} lanes      Eligible lanes only, in ascending price order.
 * @property {CityPriceLane|null} lowest  Same-event lowest. Never cross-event.
 * @property {number} comparedCount       lanes.length.
 * @property {boolean} checked            Did the server query this show's lanes?
 */

/**
 * Turn the route's already-priced shows into one row per tracked date.
 *
 * `ctaSpecsFor` must return the spec list `serverShowCtaSpecs` produces: entries
 * carrying `{ provider, name, href, lane, priceAmount, priceAsOf }`, where
 * `lane` is non-null only for a lane that passed the full display gate and
 * formatted cleanly. Injecting it keeps this module free of `env`, feature
 * flags and D1 so it can be unit-tested against fixtures.
 *
 * `wasChecked` reports whether the server actually queried this show's lanes.
 * It defaults to "no", because a row the server never checked must say nothing
 * rather than report an absence it never established — the same distinction
 * `pricesWereChecked` draws for the CTA notes on a show card.
 *
 * @param {any[]} shows Enriched shows for one artist in one city, any order.
 * @param {{ ctaSpecsFor: (show: any) => any[], wasChecked?: (show: any) => boolean }} options
 * @returns {{ rows: CityPriceRow[], pricedRowCount: number, currency: string }}
 */
export function deriveCityDatePrices(shows, { ctaSpecsFor, wasChecked } = /** @type {any} */ ({})) {
  if (typeof ctaSpecsFor !== "function") return { rows: [], pricedRowCount: 0, currency: "" };
  const checkedFor = typeof wasChecked === "function" ? wasChecked : () => false;

  const rows = [];
  for (const show of Array.isArray(shows) ? shows : []) {
    if (!show || typeof show !== "object") continue;
    const showId = String(show.id || "").trim();
    const datetimeISO = String(show.dateTimeISO || show.datetime_iso || "").trim();
    const ts = Date.parse(datetimeISO);
    if (!showId || !Number.isFinite(ts)) continue;

    const lanes = eligibleLanes(ctaSpecsFor(show));
    // A row whose lanes disagree on currency cannot be compared and is not a
    // legitimate multi-currency answer, so it keeps its date and loses its
    // prices rather than presenting an incomparable pair.
    const currencies = [...new Set(lanes.map((lane) => lane.currency))];
    const usable = currencies.length === 1 ? lanes : [];

    rows.push({
      showId,
      venue: String(show.venue || "").trim(),
      datetimeISO,
      timezone: String(show.timezone || "").trim(),
      ts,
      currency: usable.length ? usable[0].currency : "",
      lanes: usable,
      // The same-event lowest, which is the comparison the provider grants
      // cover. `usable` is in ascending price order, so this is its head.
      lowest: usable.length ? usable[0] : null,
      comparedCount: usable.length,
      checked: Boolean(checkedFor(show))
    });
  }

  rows.sort((a, b) => a.ts - b.ts || a.showId.localeCompare(b.showId));

  const pricedRows = rows.filter((row) => row.lowest);
  const rowCurrencies = [...new Set(pricedRows.map((row) => row.currency))];
  return {
    rows,
    pricedRowCount: pricedRows.length,
    // Uniform currency across the city's priced dates, or "" when they differ.
    // Reported for the caller's disclosure copy only — no figure is ever
    // compared across rows, so a mixed set is survivable rather than fatal.
    currency: rowCurrencies.length === 1 ? rowCurrencies[0] : ""
  };
}

/**
 * The eligible lanes of one CTA spec list, in ascending price order.
 *
 * `spec.lane` is already the output of the full server-side price gate and
 * `priceAmount`/`priceAsOf` are non-empty only when both formatted, so no
 * threshold, source or freshness test is repeated here — repeating one would
 * create a second gate that could drift from the badge's.
 *
 * @param {any[]} specs
 * @returns {CityPriceLane[]}
 */
function eligibleLanes(specs) {
  const lanes = [];
  for (const spec of Array.isArray(specs) ? specs : []) {
    if (!spec?.lane || !spec.priceAmount || !spec.priceAsOf) continue;
    const price = Number(spec.lane.price);
    const currency = String(spec.lane.currency || "").trim().toUpperCase();
    const href = typeof spec.href === "string" ? spec.href : "";
    if (!Number.isFinite(price) || !/^[A-Z]{3}$/.test(currency) || !href) continue;
    lanes.push({
      provider: String(spec.provider || "").trim(),
      name: String(spec.name || "").trim(),
      price,
      currency,
      fetchedAt: String(spec.lane.fetchedAt || "").trim(),
      href
    });
  }
  // Ascending price, then by provider name so equal prices order deterministically
  // rather than by whatever order the CTA builder happened to emit.
  lanes.sort((a, b) => a.price - b.price || a.name.localeCompare(b.name));
  return lanes;
}
