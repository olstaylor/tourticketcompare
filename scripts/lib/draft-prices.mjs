// Price-history evidence for tour-guide drafts.
//
// A tour guide is only useful if it says where and when a show is cheapest and
// what has moved, so the drafter gets the same per-site listed-price snapshots
// the price guides show. Every figure stays one site, one currency, one date:
// sites are never ranked against each other, nothing is converted, and a move
// is history, not a forecast (docs/PROVIDER_DATA_POLICY.md). Reads fail open:
// no data means a draft without prices, never a blocked run.

import { execFile } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { buildD1ReadArgs } from "./d1-read.mjs";
import { PRICE_MOVE_SITES, PRICE_MOVE_BAND } from "./data-stories.mjs";

const execFileAsync = promisify(execFile);
const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

// A listing this far under the median for the same site and currency is shown
// as unusually low, so readers check it before building a trip around it.
export const OUTLIER_RATIO = 0.5;
export const OUTLIER_MIN_DATES = 4;

export function draftPricesSql(artistSlug) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(artistSlug)) throw new Error("invalid artist slug");
  const a = `artist_slug='${artistSlug}'`;
  return `WITH l AS (SELECT event_id, provider, currency, MAX(observed_date) d FROM provider_pricing_daily WHERE ${a} AND observed_date >= date('now','-3 day') GROUP BY event_id, provider, currency),
b AS (SELECT event_id, provider, currency, MIN(observed_date) d FROM provider_pricing_daily WHERE ${a} AND observed_date BETWEEN date('now','-31 day') AND date('now','-29 day') GROUP BY event_id, provider, currency)
SELECT l.event_id, l.provider, l.currency, l.d latest_date,
 (SELECT MIN(p.low_price_last) FROM provider_pricing_daily p WHERE p.event_id=l.event_id AND p.provider=l.provider AND p.currency=l.currency AND p.observed_date=l.d) latest,
 b.d base_date,
 (SELECT MIN(p.low_price_last) FROM provider_pricing_daily p WHERE p.event_id=b.event_id AND p.provider=b.provider AND p.currency=b.currency AND p.observed_date=b.d) base
FROM l LEFT JOIN b ON b.event_id=l.event_id AND b.provider=l.provider AND b.currency=l.currency`;
}

/** Rows for one artist; [] (with a notice) when D1 is missing or unreadable. */
export async function readDraftPrices(artistSlug, { database = "tourticketcompare-demand", remote = true, exec = execFileAsync } = {}) {
  try {
    const { stdout } = await exec("npx", buildD1ReadArgs({ database, remote, statements: [{ sql: draftPricesSql(artistSlug) }] }), {
      cwd: REPO_ROOT, maxBuffer: 10 * 1024 * 1024, timeout: 60000
    });
    const parsed = JSON.parse(stdout);
    return Array.isArray(parsed) && parsed[0]?.success && Array.isArray(parsed[0].results) ? parsed[0].results : [];
  } catch (error) {
    console.error(`::notice::price history unavailable, drafting without prices (${String(error?.message || error).split("\n")[0].slice(0, 160)})`);
    return [];
  }
}

export const money = (price, currency) => `${currency} ${Math.round(price)}`;

const median = (values) => {
  const sorted = [...values].sort((x, y) => x - y);
  const mid = sorted.length >> 1;
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};

/**
 * Evidence block from D1 rows and the tour's events. Returns null when no
 * approved site has a usable price, so the article is drafted without prices.
 */
export function buildPriceFacts(rows, events) {
  const byId = new Map(events.map((e) => [e.id, e]));
  const usable = (rows || []).filter((r) => byId.has(r.event_id) && PRICE_MOVE_SITES.has(r.provider)
    && /^[A-Z]{3}$/.test(r.currency || "") && Number(r.latest) > 0);
  if (!usable.length) return null;
  const groups = new Map();
  for (const r of usable) {
    const key = `${r.provider}|${r.currency}`;
    groups.set(key, [...(groups.get(key) || []), r]);
  }
  const listings = [];
  const siteSummaries = [];
  for (const group of groups.values()) {
    const { provider, currency } = group[0];
    const site = PRICE_MOVE_SITES.get(provider);
    const mid = median(group.map((r) => Number(r.latest)));
    const rated = group.length >= OUTLIER_MIN_DATES;
    for (const r of group) {
      const e = byId.get(r.event_id);
      const latest = Number(r.latest);
      const base = Number(r.base);
      const moved = base > 0 && r.base_date ? (latest > base * (1 + PRICE_MOVE_BAND) ? "up" : latest < base * (1 - PRICE_MOVE_BAND) ? "down" : "about the same") : null;
      listings.push({ site, currency, city: e.city, date: e.date, lowestListed: money(latest, currency), capturedOn: r.latest_date,
        thirtyDaysEarlier: moved ? money(base, currency) : null, movedOver30Days: moved,
        unusuallyLow: rated && latest < mid * OUTLIER_RATIO });
    }
    if (rated) {
      const typical = group.filter((r) => Number(r.latest) >= mid * OUTLIER_RATIO);
      const lowest = typical.reduce((a, b) => (Number(b.latest) < Number(a.latest) ? b : a));
      const highest = group.reduce((a, b) => (Number(b.latest) > Number(a.latest) ? b : a));
      siteSummaries.push({ site, currency, datesPriced: group.length,
        lowestTypicalListed: `${money(lowest.latest, currency)} in ${byId.get(lowest.event_id).city}`,
        highestListed: `${money(highest.latest, currency)} in ${byId.get(highest.event_id).city}` });
    }
  }
  listings.sort((x, y) => x.city.localeCompare(y.city) || x.site.localeCompare(y.site));
  return { note: 'Each figure is one site\'s lowest listed price for one date in its own currency when captured (the capturedOn day). Never convert currencies, rank sites against each other or add figures up. A "movedOver30Days" value is history, not a forecast. unusuallyLow listings sit far below that site\'s other dates: tell readers to check the listing before relying on it.',
    listings, siteSummaries };
}

/** Every price string a draft may quote. */
export function allowedPriceStrings(prices) {
  const out = new Set();
  for (const l of prices?.listings || []) for (const s of [l.lowestListed, l.thirtyDaysEarlier]) if (s) out.add(s);
  for (const s of prices?.siteSummaries || []) for (const f of [s.lowestTypicalListed, s.highestListed]) out.add(f.split(" in ")[0]);
  return out;
}
