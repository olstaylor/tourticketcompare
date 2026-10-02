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
import { dropIsolatedSpikes } from "./_price-outliers.js";

// How far back a change-point may be to count as "recent". Inside the 90-day
// history retention, and the same window the recorded low uses, so the two
// figures on one page describe the same period.
export const PRICE_MOVE_WINDOW_DAYS = 30;

// Rows fetched per (event, provider). Two would do for a clean series; the rest
// absorb an implausible, other-currency or spike row (functions/_price-outliers.js)
// without losing the answer, and give a spike its earlier neighbour.
const ROWS_PER_SERIES = 5;

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

  const sorted = (Array.isArray(rows) ? rows : [])
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
    .sort((a, b) => Date.parse(a.observedAt) - Date.parse(b.observedAt));
  // A reading that reverts at the next change is a feed glitch, not a move.
  // The badge price is the standing observation after the newest row, so it
  // is that row's later neighbour.
  const usable = dropIsolatedSpikes(sorted, { trailingPrice: current }).reverse();

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

// ---------------------------------------------------------------------------
// The 7-day change, for dates close to show day.
// ---------------------------------------------------------------------------
//
// Measured on 2026-10-02 over the 101 shows that took place between 2026-08-21
// and 2026-10-01 with 30 days of history: the lowest listed price usually fell
// in the final days, but one series in five rose instead. That is a reason to
// tell a buyer what THIS date's price has done this week, never to predict what
// it will do. So this states one observed fact per lane:
//
//   * Only for a date starting within WEEKLY_CHANGE_SHOW_WINDOW_DAYS. Further
//     out, a week's move says little and most visitors are not deciding yet.
//   * From the standing recorded price exactly WEEKLY_CHANGE_DAYS before this
//     render (the newest row at or before that instant, which is the carry-in
//     rule functions/_event-price-low.js explains) to the badge price now.
//     No row that old means no statement: we did not record it a week ago.
//   * Up or down, both said the same way. A move under
//     WEEKLY_CHANGE_MIN_FRACTION is noise against a single-listing low and is
//     not said at all.
//   * Same lane, same event, same currency, spike-guarded, and only for a lane
//     passing the live display gate. Same boundaries as derivePriceMove.

export const WEEKLY_CHANGE_DAYS = 7;
export const WEEKLY_CHANGE_SHOW_WINDOW_DAYS = 14;
export const WEEKLY_CHANGE_MIN_FRACTION = 0.1;
// Rows fetched per (event, provider) for the weekly change. Hourly polling of a
// change-only table rarely writes more than a few rows a day; this covers the
// week, its carry-in and the spike guard's neighbours with room to spare.
const WEEKLY_ROWS_PER_SERIES = 300;
const DAY_MS = 24 * 60 * 60 * 1000;

/**
 * @typedef {Object} WeeklyPriceChange
 * @property {string} provider
 * @property {string} name
 * @property {string} currency
 * @property {number} from           Standing recorded price WEEKLY_CHANGE_DAYS ago.
 * @property {string} fromObservedAt When that figure was first recorded.
 * @property {number} to             The listed price on the button now.
 * @property {string} toFetchedAt    When the current figure was captured.
 * @property {number} percent        Whole-number size of the change, always positive.
 * @property {"up"|"down"} direction
 */

/**
 * Whether a date is close enough to show day for the weekly change.
 * @param {string} showStartsAt ISO datetime of the show.
 * @param {number} now
 */
export function withinWeeklyChangeWindow(showStartsAt, now = Date.now()) {
  const startsAt = Date.parse(String(showStartsAt || ""));
  return Number.isFinite(startsAt) && startsAt > now && startsAt - now <= WEEKLY_CHANGE_SHOW_WINDOW_DAYS * DAY_MS;
}

/**
 * The 7-day change for one lane, or null.
 *
 * @param {{provider: string, name: string, price: number, currency: string, fetchedAt: string}} lane
 *   A lane that passed the live display gate on this render.
 * @param {Array<{price: unknown, currency: unknown, observedAt: unknown}>} rows That lane's history rows for this event, any order.
 * @param {{ now?: number, showStartsAt?: string }} [options]
 * @returns {WeeklyPriceChange|null}
 */
export function deriveWeeklyPriceChange(lane, rows, options = {}) {
  if (!lane) return null;
  const now = Number.isFinite(options.now) ? Number(options.now) : Date.now();
  if (!withinWeeklyChangeWindow(String(options.showStartsAt || ""), now)) return null;
  const current = Number(lane.price);
  const currency = String(lane.currency || "").trim().toUpperCase();
  const fetchedAt = String(lane.fetchedAt || "").trim();
  if (!Number.isFinite(current) || current < MIN_PLAUSIBLE_LISTED_PRICE) return null;
  if (!/^[A-Z]{3}$/.test(currency) || !Number.isFinite(Date.parse(fetchedAt))) return null;

  const sorted = (Array.isArray(rows) ? rows : [])
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
    .sort((a, b) => Date.parse(a.observedAt) - Date.parse(b.observedAt));
  const guarded = dropIsolatedSpikes(sorted, { trailingPrice: current });

  const weekAgo = now - WEEKLY_CHANGE_DAYS * DAY_MS;
  let reference = null;
  for (const row of guarded) {
    if (Date.parse(row.observedAt) <= weekAgo) reference = row;
    else break;
  }
  if (!reference || reference.price <= 0) return null;

  const fraction = (current - reference.price) / reference.price;
  if (Math.abs(fraction) < WEEKLY_CHANGE_MIN_FRACTION) return null;
  return {
    provider: String(lane.provider || "").trim(),
    name: String(lane.name || "").trim(),
    currency,
    from: reference.price,
    fromObservedAt: reference.observedAt,
    to: current,
    toFetchedAt: fetchedAt,
    percent: Math.round(Math.abs(fraction) * 100),
    direction: fraction > 0 ? "up" : "down"
  };
}

/**
 * Read the recent history for each (event, provider) pair, batched, for the
 * weekly change. Callers pass only dates inside the weekly-change window, so
 * this read is skipped entirely on boards with nothing close to show day.
 * Any failure degrades to "no change".
 *
 * @param {any} db D1 binding.
 * @param {string[]} eventIds
 * @param {Array<{dbKey: string, approvedSource: string}>} lanes Approved numeric lanes.
 * @returns {Promise<Map<string, Array<{price: number, currency: string, observedAt: string}>>>}
 *   Keyed `${eventId}|${providerSlug}`, oldest first.
 */
export async function fetchEventWeeklyPriceSeries(db, eventIds, lanes) {
  const index = new Map();
  const ids = [...new Set((eventIds || []).map((id) => String(id || "").trim()).filter(Boolean))];
  const laneList = (lanes || []).filter((lane) => lane?.dbKey && lane?.approvedSource);
  if (!db || typeof db.prepare !== "function" || !ids.length || !laneList.length) return index;

  const pairSql = laneList.map(() => "(provider = ? AND source = ?)").join(" OR ");
  const pairBindings = laneList.flatMap((lane) => [lane.dbKey, lane.approvedSource]);

  for (let offset = 0; offset < ids.length; offset += 50) {
    const chunk = ids.slice(offset, offset + 50);
    const idSql = chunk.map(() => "?").join(", ");
    // No time bound: the reference row is the newest one at or before a week
    // ago, however old, and retention already caps the series at 90 days.
    const sql =
      `SELECT event_id, provider, currency, low_price, observed_at FROM (
         SELECT event_id, provider, currency, low_price, observed_at,
                ROW_NUMBER() OVER (PARTITION BY event_id, provider ORDER BY observed_at DESC) AS series_rank
         FROM provider_pricing_history
         WHERE event_id IN (${idSql}) AND (${pairSql})
       ) WHERE series_rank <= ${WEEKLY_ROWS_PER_SERIES}`;
    const result = await db.prepare(sql).bind(...chunk, ...pairBindings).all();
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
  for (const rows of index.values()) rows.sort((a, b) => Date.parse(a.observedAt) - Date.parse(b.observedAt));
  return index;
}
