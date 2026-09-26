// @ts-check
// Latest recorded price movement for ONE event on ONE provider, for the artist
// price guide (`/artists/<artist>/ticket-prices`).
//
// `provider_pricing_history` is change-only (see functions/_event-price-low.js):
// a row is written only when a lane's `(low_price, currency, inventory_count)`
// differs from its newest row. So the newest rows of a series are its most
// recent change-points, and "how has this price moved" is answered by the
// newest recorded price that differs from the one the button shows now.
//
// Same boundaries as the recorded low, for the same reasons:
//
//   * Same event, same provider, same currency. A move is never computed across
//     dates, across providers or across currencies. docs/PROVIDER_DATA_POLICY.md
//     approves historical display only "when the provider/source attribution and
//     observation time remain attached", so a move always carries the provider,
//     the earlier figure's observation time and the current capture time.
//   * No second gate. A move is computed only for a lane passing the live
//     display gate at this render (the `lane` handed in comes from
//     serverShowCtaSpecs via deriveCityDatePrices). A lane whose badge is
//     withheld contributes nothing, whatever history holds for it.
//   * Implausible rows are floored out on read, as everywhere else.

import { MIN_PLAUSIBLE_LISTED_PRICE } from "./api/shows.js";

// How far back a change-point may be to count as "recent". Inside the 90-day
// history retention, and the same window the recorded low uses, so the two
// figures on one page describe the same period.
export const PRICE_MOVE_WINDOW_DAYS = 30;

// Rows fetched per (event, provider). Two would do for a clean series; a third
// absorbs one implausible or other-currency row without losing the answer.
const ROWS_PER_SERIES = 3;

/**
 * @typedef {Object} PriceMove
 * @property {string} provider
 * @property {string} name
 * @property {string} currency
 * @property {number} from          The previous recorded listed price.
 * @property {string} fromObservedAt When that previous figure was observed.
 * @property {number} to            The listed price on the button now.
 * @property {string} toFetchedAt   When the current figure was captured.
 * @property {string} changedAt     When the current figure was first recorded.
 * @property {"up"|"down"} direction
 * @property {number} delta         to - from, rounded to cents.
 */

/**
 * The latest move for one lane, or null.
 *
 * @param {{provider: string, name: string, price: number, currency: string, fetchedAt: string}} lane
 *   A lane that passed the live display gate on this render.
 * @param {Array<{price: unknown, currency: unknown, observedAt: unknown}>} rows
 *   That lane's history rows for this event, newest first.
 * @returns {PriceMove|null}
 */
export function derivePriceMove(lane, rows) {
  if (!lane) return null;
  const current = Number(lane.price);
  const currency = String(lane.currency || "").trim().toUpperCase();
  const fetchedAt = String(lane.fetchedAt || "").trim();
  if (!Number.isFinite(current) || !/^[A-Z]{3}$/.test(currency) || !Number.isFinite(Date.parse(fetchedAt))) return null;

  const usable = (Array.isArray(rows) ? rows : [])
    .map((row) => ({
      price: Number(row?.price),
      currency: String(row?.currency || "").trim().toUpperCase(),
      observedAt: String(row?.observedAt || "").trim()
    }))
    .filter(
      (row) =>
        row.currency === currency &&
        Number.isFinite(row.price) &&
        row.price >= MIN_PLAUSIBLE_LISTED_PRICE &&
        Number.isFinite(Date.parse(row.observedAt)) &&
        Date.parse(row.observedAt) <= Date.parse(fetchedAt)
    )
    .sort((a, b) => Date.parse(b.observedAt) - Date.parse(a.observedAt));

  // The newest recorded figure that differs from the button's. Everything
  // newer than it records the current price, so the oldest of those is when the
  // current price was first seen; with none (history lagging the cache), the
  // capture time of the current figure is the best statement available.
  const index = usable.findIndex((row) => Math.abs(row.price - current) >= 0.01);
  if (index === -1) return null;
  const previous = usable[index];
  const changedAt = index > 0 ? usable[index - 1].observedAt : fetchedAt;
  const delta = Number((current - previous.price).toFixed(2));
  return {
    provider: String(lane.provider || "").trim(),
    name: String(lane.name || "").trim(),
    currency,
    from: previous.price,
    fromObservedAt: previous.observedAt,
    to: current,
    toFetchedAt: fetchedAt,
    changedAt,
    direction: delta > 0 ? "up" : "down",
    delta
  };
}

/**
 * Read the newest history rows for each (event, provider) pair, batched.
 *
 * One statement per 50 events, using ROW_NUMBER() to keep the newest
 * ROWS_PER_SERIES rows of each series inside the window. Provider and source
 * are bound as pairs, so a row written by an unapproved source for the same
 * provider can never be read. Any failure degrades to "no moves".
 *
 * @param {any} db D1 binding.
 * @param {string[]} eventIds
 * @param {Array<{dbKey: string, approvedSource: string}>} lanes Approved numeric lanes.
 * @param {{ now?: number, windowDays?: number }} [options]
 * @returns {Promise<Map<string, Array<{price: number, currency: string, observedAt: string}>>>}
 *   Keyed `${eventId}|${providerSlug}`, newest first.
 */
export async function fetchEventPriceMoveSeries(db, eventIds, lanes, options = {}) {
  const index = new Map();
  const ids = [...new Set((eventIds || []).map((id) => String(id || "").trim()).filter(Boolean))];
  const laneList = (lanes || []).filter((lane) => lane?.dbKey && lane?.approvedSource);
  if (!db || typeof db.prepare !== "function" || !ids.length || !laneList.length) return index;

  const now = Number.isFinite(options.now) ? Number(options.now) : Date.now();
  const windowDays = Number.isFinite(options.windowDays) ? Number(options.windowDays) : PRICE_MOVE_WINDOW_DAYS;
  const windowStart = new Date(now - windowDays * 24 * 60 * 60 * 1000).toISOString();
  const pairSql = laneList.map(() => "(provider = ? AND source = ?)").join(" OR ");
  const pairBindings = laneList.flatMap((lane) => [lane.dbKey, lane.approvedSource]);

  for (let offset = 0; offset < ids.length; offset += 50) {
    const chunk = ids.slice(offset, offset + 50);
    const idSql = chunk.map(() => "?").join(", ");
    const sql =
      `SELECT event_id, provider, currency, low_price, observed_at FROM (
         SELECT event_id, provider, currency, low_price, observed_at,
                ROW_NUMBER() OVER (PARTITION BY event_id, provider ORDER BY observed_at DESC) AS series_rank
         FROM provider_pricing_history
         WHERE event_id IN (${idSql}) AND (${pairSql}) AND observed_at >= ?
       ) WHERE series_rank <= ${ROWS_PER_SERIES}`;
    const result = await db.prepare(sql).bind(...chunk, ...pairBindings, windowStart).all();
    for (const row of Array.isArray(result?.results) ? result.results : []) {
      const eventId = String(row?.event_id || "").trim();
      const provider = String(row?.provider || "").trim();
      if (!eventId || !provider) continue;
      const key = `${eventId}|${provider}`;
      if (!index.has(key)) index.set(key, []);
      index.get(key).push({
        price: Number(row?.low_price),
        currency: String(row?.currency || "").trim().toUpperCase(),
        observedAt: String(row?.observed_at || "").trim()
      });
    }
  }
  for (const rows of index.values()) rows.sort((a, b) => Date.parse(b.observedAt) - Date.parse(a.observedAt));
  return index;
}
