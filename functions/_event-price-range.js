// @ts-check
// Richer event-page pilot (owner go 2026-10-23): the span of one show's listed
// prices per ticket site since tracking began, read from provider_pricing_daily.
//
// provider_pricing_daily keeps one row per event x site x source x currency x
// UTC day and is never pruned, so unlike provider_pricing_history it can answer
// "how has this date's listed price ranged since we started watching". Each
// day's figure used here is `low_price_last`: the site's lowest listed price at
// its last capture of that day, a figure someone could actually have seen.
//
// Same rules as the other recorded-price surfaces:
//   - only lanes already passing the live display gate contribute (the caller
//     hands in `deriveCityDatePrices` lanes), in that lane's own currency;
//   - the plausibility floor and the isolated-spike rule apply on read
//     (functions/_price-outliers.js), so a one-day feed glitch can't set an end
//     of the range;
//   - nothing is converted or compared across currencies;
//   - the result carries site, currency and the days it spans. It says nothing
//     about when to buy.

import { MIN_PLAUSIBLE_LISTED_PRICE } from "./api/shows.js";
import { keepNonSpikeSql } from "./_price-outliers.js";

// A range over fewer tracked days is a couple of readings, not a span.
export const PRICE_RANGE_MIN_DAYS = 7;

// The pilot: ten dates across the seven venues with sourced venue facts, picked
// from the show-priority list (2026-10-23) with 20+ tracked days on every site.
// Fixed on purpose: widening is a reviewed change, so pilot pages stay
// comparable with their peers when the read-out happens.
export const RICHER_EVENT_PILOT_IDS = Object.freeze(
  new Set([
    "tm-olivia-rodrigo-2026-orlando-1aefz_agkuwopdf",
    "tm-olivia-rodrigo-2026-orlando-1aefz_agkup8poj",
    "tm-olivia-rodrigo-2026-sunrise-z7r9jz1a7067o",
    "tm-olivia-rodrigo-2026-sunrise-z7r9jz1a7067f",
    "tm-olivia-rodrigo-2027-inglewood-vv170z_agkmetj8b",
    "tm-metallica-2027-las-vegas-16vjz_kk3g7ndxr",
    "tm-doja-cat-2026-toronto-1k7zvncbgagve_c",
    "tm-doja-cat-2026-orlando-1aefzbsgklnlnmt",
    "tm-doja-cat-2026-philadelphia-1adzzbsgkldzvua",
    "tm-john-summit-2026-columbus-vvg1fz_52gqiba"
  ])
);

/** @param {unknown} eventId */
export function isRicherEventPilot(eventId) {
  return RICHER_EVENT_PILOT_IDS.has(String(eventId || "").trim());
}

/**
 * @typedef {Object} PriceRangeSeries
 * @property {number} low
 * @property {number} high
 * @property {number} days
 * @property {string} firstDay YYYY-MM-DD
 * @property {string} lastDay  YYYY-MM-DD
 */

/**
 * One event's per-site daily-close range.
 *
 * @param {any} db D1 binding.
 * @param {string} eventId
 * @param {Array<{dbKey: string, approvedSource: string}>} lanes Approved numeric lanes.
 * @returns {Promise<Map<string, Map<string, PriceRangeSeries>>>} provider slug -> currency -> series.
 */
export async function fetchEventPriceRange(db, eventId, lanes) {
  const index = new Map();
  const id = String(eventId || "").trim();
  const laneList = (lanes || []).filter((lane) => lane?.dbKey && lane?.approvedSource);
  if (!db || typeof db.prepare !== "function" || !id || !laneList.length) return index;

  const pairs = laneList.map((_, i) => `(provider = ?${i * 2 + 2} AND source = ?${i * 2 + 3})`).join(" OR ");
  const bindings = [id, ...laneList.flatMap((lane) => [lane.dbKey, lane.approvedSource])];
  const sql = `SELECT provider, currency, MIN(low_price_last) AS low, MAX(low_price_last) AS high,
                      COUNT(*) AS days, MIN(observed_date) AS first_day, MAX(observed_date) AS last_day
               FROM (
                 SELECT provider, source, currency, observed_date, low_price_last,
                        LAG(low_price_last) OVER s AS prev_price, LEAD(low_price_last) OVER s AS next_price
                 FROM provider_pricing_daily
                 WHERE event_id = ?1 AND low_price_last >= ${MIN_PLAUSIBLE_LISTED_PRICE} AND (${pairs})
                 WINDOW s AS (PARTITION BY provider, source, currency ORDER BY observed_date)
               )
               WHERE ${keepNonSpikeSql("low_price_last", "prev_price", "next_price")}
               GROUP BY provider, currency`;
  const result = await db.prepare(sql).bind(...bindings).all();
  for (const row of Array.isArray(result?.results) ? result.results : []) {
    const provider = String(row?.provider || "").trim();
    const currency = String(row?.currency || "").trim().toUpperCase();
    const low = Number(row?.low);
    const high = Number(row?.high);
    const days = Number(row?.days);
    if (!provider || !/^[A-Z]{3}$/.test(currency) || !Number.isFinite(low) || !Number.isFinite(high) || !(days > 0)) continue;
    const byCurrency = index.get(provider) || new Map();
    byCurrency.set(currency, { low, high, days, firstDay: String(row.first_day || ""), lastDay: String(row.last_day || "") });
    index.set(provider, byCurrency);
  }
  return index;
}

/**
 * @typedef {Object} PriceRangeSite
 * @property {string} provider
 * @property {string} name
 * @property {string} currency
 * @property {number} low
 * @property {number} high
 * @property {number} days
 * @property {string} firstDay
 * @property {string} lastDay
 */

/**
 * The per-site ranges to state, and the spread across sites right now.
 *
 * `lanes` are the show's currently displayable lanes ({provider, name, price,
 * currency}) as deriveCityDatePrices produces them. A lane with fewer than
 * PRICE_RANGE_MIN_DAYS tracked days is left out. The live price is folded into
 * its own site's range so the range can never exclude the figure on the button
 * beside it.
 *
 * The spread needs two or more of those sites in one currency, and states the
 * lowest and highest of their current listed prices.
 *
 * @param {Array<{provider: string, name: string, price: number, currency: string}>} lanes
 * @param {Map<string, Map<string, PriceRangeSeries>>} series
 * @returns {{sites: PriceRangeSite[], overall: null|{low: PriceRangeSite, high: PriceRangeSite, currency: string}, spread: null|{currency: string, lowest: {name: string, price: number}, highest: {name: string, price: number}, gap: number}}|null}
 */
export function deriveEventPriceRange(lanes, series) {
  const eligible = Array.isArray(lanes) ? lanes.filter(Boolean) : [];
  if (!eligible.length || !(series instanceof Map)) return null;

  /** @type {PriceRangeSite[]} */
  const sites = [];
  for (const lane of eligible) {
    const currency = String(lane.currency || "").trim().toUpperCase();
    const recorded = series.get(String(lane.provider || "").trim())?.get(currency);
    const price = Number(lane.price);
    if (!recorded || recorded.days < PRICE_RANGE_MIN_DAYS || !Number.isFinite(price)) continue;
    sites.push({
      provider: String(lane.provider),
      name: String(lane.name || "").trim(),
      currency,
      low: Math.min(recorded.low, price),
      high: Math.max(recorded.high, price),
      days: recorded.days,
      firstDay: recorded.firstDay,
      lastDay: recorded.lastDay
    });
  }
  if (!sites.length) return null;

  // One currency only for the cross-site statements.
  const currencies = [...new Set(sites.map((site) => site.currency))];
  const overall = currencies.length === 1 && sites.length > 1
    ? {
        currency: currencies[0],
        low: sites.reduce((best, site) => (site.low < best.low ? site : best)),
        high: sites.reduce((best, site) => (site.high > best.high ? site : best))
      }
    : null;

  const priced = eligible
    .filter((lane) => Number.isFinite(Number(lane.price)))
    .map((lane) => ({ name: String(lane.name || "").trim(), price: Number(lane.price), currency: String(lane.currency || "").trim().toUpperCase() }));
  const priceCurrencies = [...new Set(priced.map((lane) => lane.currency))];
  let spread = null;
  if (priced.length > 1 && priceCurrencies.length === 1) {
    const sorted = [...priced].sort((a, b) => a.price - b.price);
    const lowest = sorted[0];
    const highest = sorted[sorted.length - 1];
    if (highest.price > lowest.price) {
      spread = {
        currency: priceCurrencies[0],
        lowest: { name: lowest.name, price: lowest.price },
        highest: { name: highest.name, price: highest.price },
        gap: Math.round((highest.price - lowest.price) * 100) / 100
      };
    }
  }
  return { sites, overall, spread };
}
