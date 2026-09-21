// @ts-check
// Per-event lowest recorded listed price over a trailing window, for the
// artist-city price answer.
//
// `provider_pricing_history` is written by the scheduled snapshot lanes and is
// deliberately CHANGE-ONLY: `snapshot-impact-marketplace-prices.mjs` inserts a
// row only when `(low_price, currency, inventory_count)` differs from the newest
// existing row for that `(event_id, provider, source)`. Rows are therefore
// change-points, not samples, and that single fact drives everything here.
//
// ---------------------------------------------------------------------------
// Why a naive window query is wrong
// ---------------------------------------------------------------------------
//
// `WHERE observed_at >= windowStart` is the obvious query and it is incorrect.
// A price set 45 days ago and unchanged since produces ZERO rows inside a
// 30-day window, even though that price was the standing observation for every
// moment of it. The naive query reports "no history" for the one case where the
// history is most certain.
//
// So a series needs its CARRY-IN row: the newest row at or before the window
// opened. Its price covers the window from the start, and it is a candidate for
// the minimum exactly like an in-window row. `fetchProviderPriceTrend` in
// functions/api/shows.js does use the naive form — correctly, because it
// compares the two newest observations and is never displayed.
//
// ---------------------------------------------------------------------------
// The trap underneath the carry-in
// ---------------------------------------------------------------------------
//
// History alone cannot distinguish two very different situations, because
// neither writes a row:
//
//   (a) the lane is polled daily and the price genuinely has not moved;
//   (b) the lane stopped being polled 40 days ago and we know nothing since.
//
// Reading (b) as (a) would publish a price nobody has checked in over a month.
// The disambiguator is not in this table at all: it is `provider_pricing_cache`,
// which the same writers upsert on EVERY verified run whether or not the price
// moved. That is why a low is only ever computed for a lane that is passing the
// live display gate at this render — the same `serverShowCtaSpecs` output the
// CTA button is built from, which already requires a fresh unexpired cache row.
//
// This is the same "no second gate" rule functions/_artist-city-prices.js
// follows: a lane whose badge is withheld can never contribute a figure here.
//
// ---------------------------------------------------------------------------
// What is and is not compared
// ---------------------------------------------------------------------------
//
// Same event, same currency — SAFE_PUBLISHING_RULES.md § Price Display scopes
// every comparison to "the same local event and currency". A minimum is taken
// across providers WITHIN one event (approved) and across observations of that
// one event over time. It is never taken across events or dates; this module is
// handed one event's lanes at a time and has no access to another's.
//
// docs/PROVIDER_DATA_POLICY.md approves historical display "when the
// provider/source attribution and observation time remain attached", so the
// result always carries the winning provider and the instant it was observed.
// An anonymous "from <price>" cannot be built from this return shape.

import { MIN_PLAUSIBLE_LISTED_PRICE } from "./api/shows.js";

// The trailing window. Kept well inside the 90-day retention that
// scripts/prune-provider-pricing-history.mjs enforces, so the carry-in row for
// a 30-day window is still present rather than pruned out from under it.
export const PRICE_LOW_WINDOW_DAYS = 30;

/**
 * @typedef {Object} PriceLowObservation
 * @property {number} price
 * @property {string} currency
 * @property {string} provider    Provider slug, e.g. "vivid-seats".
 * @property {string} name        Display name, e.g. "Vivid Seats".
 * @property {string} observedAt  When this figure was observed (ISO 8601).
 * @property {boolean} carriedIn  True when the winning row predates the window
 *                                and was the standing observation at its start.
 * @property {boolean} isCurrent  True when the winner is the price the badge is
 *                                showing right now.
 * @property {boolean} backedByHistory True when at least one recorded observation
 *                                fed the comparison. A winning live price with
 *                                this false means we hold no history for this
 *                                event at all — a very different statement from
 *                                "we watched for 30 days and it never went
 *                                lower", and the caller must not print the
 *                                latter for the former.
 */

/**
 * The lowest figure among a series' candidates, or null.
 *
 * Every candidate is floored at MIN_PLAUSIBLE_LISTED_PRICE. History is
 * immutable and carries known-bad rows written before that floor existed — the
 * JAY-Z / Tottenham StubHub International lane reads 3.80 for every observation
 * since 2026-07-22 — so the floor has to be applied on read, exactly as
 * functions/api/price-history.js applies it.
 *
 * @param {Array<{price: unknown, observedAt: unknown, carriedIn?: boolean, isCurrent?: boolean}>} candidates
 * @returns {{price: number, observedAt: string, carriedIn: boolean, isCurrent: boolean}|null}
 */
function lowestCandidate(candidates) {
  let best = null;
  for (const candidate of candidates) {
    if (!candidate) continue;
    const price = Number(candidate.price);
    const observedAt = String(candidate.observedAt || "").trim();
    if (!Number.isFinite(price) || price < MIN_PLAUSIBLE_LISTED_PRICE) continue;
    if (!Number.isFinite(Date.parse(observedAt))) continue;
    const entry = {
      price,
      observedAt,
      carriedIn: Boolean(candidate.carriedIn),
      isCurrent: Boolean(candidate.isCurrent)
    };
    // Strictly lower wins, so on a tie the earlier candidate is kept. Candidates
    // are supplied current-first, which makes a tie resolve to the live badge's
    // own figure rather than to an equal historical row — the least surprising
    // answer when the low simply is the price you can see.
    if (!best || entry.price < best.price) best = entry;
  }
  return best;
}

/**
 * The lowest recorded listed price for ONE event over the window.
 *
 * `lanes` are that event's currently-displayable lanes, exactly as
 * `deriveCityDatePrices` produces them (already through the full public gate:
 * display rights, approved source, verified URL, provider flags, finite price,
 * freshness). A lane not in this list contributes nothing, whatever history
 * holds for it.
 *
 * `seriesFor(lane)` returns that lane's history candidates as
 * `{ carryIn, windowMin }`, each `{ price, currency, observedAt }` or null.
 * Injected rather than queried here so the whole rule is testable against
 * fixtures with no D1.
 *
 * @param {Array<{provider: string, name: string, price: number, currency: string, fetchedAt: string}>} lanes
 * @param {(lane: any) => {carryIn?: any, windowMin?: any}|null} seriesFor
 * @returns {PriceLowObservation|null}
 */
export function deriveEventPriceLow(lanes, seriesFor) {
  const eligible = Array.isArray(lanes) ? lanes.filter(Boolean) : [];
  if (!eligible.length || typeof seriesFor !== "function") return null;

  // One event is one market. Lanes disagreeing on currency cannot be compared,
  // and picking one arbitrarily would publish a figure in a currency the page
  // does not state — so the whole answer is withheld, as the current-price
  // table already does for the same reason.
  const currencies = [...new Set(eligible.map((lane) => String(lane.currency || "").trim().toUpperCase()))];
  if (currencies.length !== 1 || !/^[A-Z]{3}$/.test(currencies[0])) return null;
  const currency = currencies[0];

  let best = null;
  // Whether any recorded observation took part, anywhere on this event. Without
  // it a caller cannot tell "the current price is the cheapest we have seen in
  // 30 days" from "we have never recorded this event", because the live price
  // wins the comparison either way.
  let backedByHistory = false;
  for (const lane of eligible) {
    const series = seriesFor(lane) || {};
    // A history row in a different currency from the lane's live badge is a
    // different market's figure and is dropped rather than converted.
    const sameCurrency = (row) =>
      row && String(row.currency || "").trim().toUpperCase() === currency ? row : null;
    const carryIn = sameCurrency(series.carryIn);
    const windowMin = sameCurrency(series.windowMin);
    // Counted only once it has survived the floor and the currency test, so a
    // series consisting solely of implausible rows is correctly no history.
    if (lowestCandidate([carryIn, windowMin].filter(Boolean))) backedByHistory = true;

    // Current first: see the tie note in lowestCandidate. Including the live
    // price is also what guarantees the published low can never exceed the
    // figure on the button beside it — the invariant that would otherwise make
    // this feature look broken ("30-day low $120" under "now $87") whenever
    // history is thin, pruned, or newly started for a lane.
    const laneLow = lowestCandidate([
      { price: lane.price, observedAt: lane.fetchedAt, isCurrent: true },
      windowMin ? { price: windowMin.price, observedAt: windowMin.observedAt } : null,
      carryIn ? { price: carryIn.price, observedAt: carryIn.observedAt, carriedIn: true } : null
    ]);
    if (!laneLow) continue;

    if (!best || laneLow.price < best.price) {
      best = {
        ...laneLow,
        currency,
        provider: String(lane.provider || "").trim(),
        name: String(lane.name || "").trim()
      };
    }
  }

  return best ? { ...best, backedByHistory } : null;
}

/**
 * Read one window's history candidates for a set of events, batched.
 *
 * Two statements per chunk rather than one, because they ask different
 * questions and each leans on the same documented SQLite guarantee: when a
 * query contains exactly one `min()` or `max()` aggregate, every bare column in
 * the result takes its value from the row that produced that extreme. So the
 * in-window statement returns the observation time OF the cheapest row, and the
 * carry-in statement returns the price OF the newest row at or before the
 * window — without a window function or a second round trip.
 *
 * Chunked at 50 ids to match fetchApprovedMarketplaceCachedRows, so a long
 * board costs ceil(dates / 50) pairs of reads rather than one pair per date.
 *
 * @param {any} db D1 binding.
 * @param {string[]} eventIds
 * @param {Array<{dbKey: string, approvedSource: string}>} lanes Approved numeric lanes.
 * @param {{now?: number, windowDays?: number}} [options]
 * @returns {Promise<Map<string, {carryIn: any, windowMin: any}>>} Keyed `${eventId}|${providerSlug}`.
 */
export async function fetchEventPriceLowSeries(db, eventIds, lanes, options = {}) {
  const index = new Map();
  const ids = [...new Set((eventIds || []).map((id) => String(id || "").trim()).filter(Boolean))];
  const laneList = (lanes || []).filter((lane) => lane?.dbKey && lane?.approvedSource);
  if (!db || typeof db.prepare !== "function" || !ids.length || !laneList.length) return index;

  const now = Number.isFinite(options.now) ? Number(options.now) : Date.now();
  const windowDays = Number.isFinite(options.windowDays) ? Number(options.windowDays) : PRICE_LOW_WINDOW_DAYS;
  const windowStart = new Date(now - windowDays * 24 * 60 * 60 * 1000).toISOString();

  // Bind provider/source as pairs. Filtering on provider alone would admit a
  // row written by a different, unapproved source for the same provider.
  const pairSql = laneList.map(() => "(provider = ? AND source = ?)").join(" OR ");
  const pairBindings = laneList.flatMap((lane) => [lane.dbKey, lane.approvedSource]);

  for (let offset = 0; offset < ids.length; offset += 50) {
    const chunk = ids.slice(offset, offset + 50);
    const idSql = chunk.map(() => "?").join(", ");

    const windowMinSql =
      `SELECT event_id, provider, currency, MIN(low_price) AS low_price, observed_at
       FROM provider_pricing_history
       WHERE event_id IN (${idSql}) AND (${pairSql}) AND observed_at >= ?
       GROUP BY event_id, provider, currency`;
    const carryInSql =
      `SELECT event_id, provider, currency, low_price, MAX(observed_at) AS observed_at
       FROM provider_pricing_history
       WHERE event_id IN (${idSql}) AND (${pairSql}) AND observed_at < ?
       GROUP BY event_id, provider, currency`;

    const [windowRows, carryRows] = await Promise.all([
      db.prepare(windowMinSql).bind(...chunk, ...pairBindings, windowStart).all(),
      db.prepare(carryInSql).bind(...chunk, ...pairBindings, windowStart).all()
    ]);

    const absorb = (result, field) => {
      for (const row of Array.isArray(result?.results) ? result.results : []) {
        const eventId = String(row?.event_id || "").trim();
        const provider = String(row?.provider || "").trim();
        if (!eventId || !provider) continue;
        const key = `${eventId}|${provider}`;
        const entry = index.get(key) || { carryIn: null, windowMin: null };
        entry[field] = {
          price: Number(row?.low_price),
          currency: String(row?.currency || "").trim().toUpperCase(),
          observedAt: String(row?.observed_at || "").trim()
        };
        index.set(key, entry);
      }
    };
    absorb(windowRows, "windowMin");
    absorb(carryRows, "carryIn");
  }

  return index;
}
