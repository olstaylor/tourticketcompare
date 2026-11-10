// /is-it-worth-waiting: how often resale prices fell after a tour's first
// recorded day, and what each US tour's listed prices have done lately.
//
// Two parts, both counts over TourTicketCompare's own price records:
//
//   1. The published day-one finding (a constant mirroring
//      reports/data-stories/do-resale-ticket-prices-drop-after-a-tour-goes-on-sale/figures.json,
//      the figures behind /blog/do-resale-ticket-prices-drop-after-a-tour-goes-on-sale).
//      Functions cannot import reports/, so edit both together.
//   2. A live per-artist table from provider_pricing_daily: for each upcoming
//      US show, each site is compared only with itself, WORTH_WAITING_COMPARE_DAYS
//      days apart, and the show's change is the median across its sites. Counts
//      are lower / higher / about the same (within 2%). No price figures, no
//      forecast, no savings claim: it is direction and sample size only.
//
// It adds no outbound links and touches no affiliate logic.

import { isUpcomingShow } from "./_upcoming.js";
import { normalizeCountry } from "./_cities.js";
import { eventLifecycleHeld } from "./_route-indexability.js";
import { keepNonSpikeSql } from "./_price-outliers.js";

export const WORTH_WAITING_PATH = "/is-it-worth-waiting";
export const WORTH_WAITING_INDEXABLE = true;
export const WORTH_WAITING_COMPARE_DAYS = 14;
export const WORTH_WAITING_BAND = 0.02;
// An artist row needs at least this many compared shows; a smaller sample is not shown.
export const WORTH_WAITING_MIN_SHOWS = 5;
export const WORTH_WAITING_MIN_PRICE = 10;

export const DAY_ONE_FINDING = Object.freeze({
  asOf: "2026-11-03",
  blogPath: "/blog/do-resale-ticket-prices-drop-after-a-tour-goes-on-sale",
  shows: 1608,
  artists: 100,
  lower: 788,
  higher: 390,
  same: 430,
  firstDayFrom: "9 August 2026",
  firstDayTo: "19 October 2026"
});

export const FINAL_WEEK_FINDING = Object.freeze({
  blogPath: "/blog/do-concert-ticket-prices-drop-in-the-last-week",
  shows: 421,
  artists: 68,
  asOf: "2026-10-30"
});

/**
 * @param {number[]} values
 */
function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  if (!sorted.length) return null;
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

function isoDay(ms) {
  return new Date(ms).toISOString().slice(0, 10);
}

/** The two UTC days compared: yesterday (the last full day) and 14 days before it. */
export function worthWaitingDays(now = Date.now()) {
  const latestMs = now - 24 * 3600 * 1000;
  return { latest: isoDay(latestMs), earlier: isoDay(latestMs - WORTH_WAITING_COMPARE_DAYS * 24 * 3600 * 1000) };
}

/**
 * Read the paired prices from D1: one row per event x site that has a listed
 * price on both days. A missing day is a gap, not evidence, so it is dropped.
 *
 * @param {any} db D1 binding.
 * @param {Array<{dbKey: string, approvedSource: string}>} lanes Approved numeric price lanes.
 * @param {number} [now]
 */
export async function fetchWorthWaitingPairs(db, lanes, now = Date.now()) {
  if (!db || typeof db.prepare !== "function") return { pairs: [], ...worthWaitingDays(now) };
  const days = worthWaitingDays(now);
  const sourceByProvider = new Map(
    lanes.filter((lane) => lane.dbKey !== "seatgeek" && lane.approvedSource).map((lane) => [lane.dbKey, lane.approvedSource])
  );
  const providers = [...sourceByProvider.keys()];
  if (!providers.length) return { pairs: [], ...days };
  const marks = providers.map((_, i) => `?${i + 4}`).join(",");
  const result = await db
    .prepare(
      // Find neighbours across each full series before selecting the two
      // comparison days: the daily rollup retains reverted feed glitches.
      `WITH series AS (
         SELECT event_id, provider, source, currency, observed_date, low_price_last,
                LAG(low_price_last) OVER s AS prev_price,
                LEAD(low_price_last) OVER s AS next_price
         FROM provider_pricing_daily
         WHERE currency = 'USD' AND low_price_last >= ?3 AND provider IN (${marks})
         WINDOW s AS (PARTITION BY event_id, provider, source, currency ORDER BY observed_date)
       ), clean AS (
         SELECT * FROM series
         WHERE ${keepNonSpikeSql("low_price_last", "prev_price", "next_price")}
       )
       SELECT a.event_id, a.provider, a.source, a.low_price_last AS now_price, b.low_price_last AS then_price
       FROM clean a
       JOIN clean b
         ON b.event_id = a.event_id AND b.provider = a.provider AND b.source = a.source AND b.currency = a.currency
       WHERE a.observed_date = ?1 AND b.observed_date = ?2`
    )
    .bind(days.latest, days.earlier, WORTH_WAITING_MIN_PRICE, ...providers)
    .all();
  const pairs = (result?.results || [])
    .filter((row) => sourceByProvider.get(row.provider) === row.source)
    .map((row) => ({ eventId: String(row.event_id), provider: String(row.provider), now: Number(row.now_price), then: Number(row.then_price) }))
    .filter((row) => Number.isFinite(row.now) && Number.isFinite(row.then) && row.then > 0);
  return { pairs, ...days };
}

/**
 * Per-artist counts. Only upcoming US shows count; each site is compared with
 * itself; a show's change is the median across its sites.
 *
 * @param {{pairs: Array<{eventId: string, provider: string, now: number, then: number}>, latest: string, earlier: string}} input
 * @param {any[]} events events.json records.
 * @param {{artists?: any[]}} catalog
 * @param {Iterable<string>|null} indexableSlugs Only these artists are listed (their page is indexable).
 * @param {number} [now]
 */
export function deriveWorthWaiting({ pairs, latest, earlier }, events, catalog, indexableSlugs = null, now = Date.now()) {
  const linkable = indexableSlugs ? new Set([...indexableSlugs].map(String)) : null;
  const catalogNames = new Map((catalog?.artists || []).map((artist) => [String(artist.slug), String(artist.name || "").trim()]));
  const eventById = new Map();
  for (const event of Array.isArray(events) ? events : []) {
    if (event?.id) eventById.set(String(event.id), event);
  }
  const changesByEvent = new Map();
  for (const pair of pairs || []) {
    const event = eventById.get(pair.eventId);
    if (!event || normalizeCountry(event.country) !== "United States" || !isUpcomingShow(event, now) || eventLifecycleHeld(event)) continue;
    const list = changesByEvent.get(pair.eventId) || [];
    list.push(pair.now / pair.then - 1);
    changesByEvent.set(pair.eventId, list);
  }
  const byArtist = new Map();
  for (const [eventId, changes] of changesByEvent) {
    const slug = String(eventById.get(eventId).artist_slug || "");
    if (!slug || !catalogNames.has(slug) || (linkable && !linkable.has(slug))) continue;
    const change = median(changes);
    const row = byArtist.get(slug) || { slug, name: catalogNames.get(slug) || slug, shows: 0, lower: 0, higher: 0, same: 0 };
    row.shows += 1;
    // Decimal prices can leave a rounding remainder at exactly +/-2%.
    if (change < -WORTH_WAITING_BAND - Number.EPSILON) row.lower += 1;
    else if (change > WORTH_WAITING_BAND + Number.EPSILON) row.higher += 1;
    else row.same += 1;
    byArtist.set(slug, row);
  }
  const all = [...byArtist.values()];
  const artists = all
    .filter((row) => row.shows >= WORTH_WAITING_MIN_SHOWS)
    .sort((a, b) => b.shows - a.shows || a.name.localeCompare(b.name))
    .map((row) => ({ ...row, path: `/artists/${row.slug}` }));
  const totals = all.reduce(
    (sum, row) => ({ shows: sum.shows + row.shows, lower: sum.lower + row.lower, higher: sum.higher + row.higher, same: sum.same + row.same }),
    { shows: 0, lower: 0, higher: 0, same: 0 }
  );
  return {
    latest,
    earlier,
    artists,
    artistCount: all.length,
    totals,
    // The published day-one finding is static, so the page is indexable whatever
    // the live table holds (the sitemap and llms.txt then need no database read).
    indexable: WORTH_WAITING_INDEXABLE
  };
}

const pct = (part, whole) => (whole ? Math.round((100 * part) / whole) : 0);
const num = (n) => Number(n).toLocaleString("en-US");

/** Plain-language sentence for one row. Counts only; never a forecast. */
export function worthWaitingRowText(row) {
  return `Lower at ${row.lower} of ${row.shows} shows, higher at ${row.higher}, about the same at ${row.same}.`;
}

export function dayOneSummary(f = DAY_ONE_FINDING) {
  return `For ${num(f.shows)} US shows on newly listed tours, the lowest listed resale price two weeks after TourTicketCompare first recorded it was lower at ${num(f.lower)} (${pct(f.lower, f.shows)}%), higher at ${num(f.higher)} (${pct(f.higher, f.shows)}%) and about the same at ${num(f.same)}.`;
}
