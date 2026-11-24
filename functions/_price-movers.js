// /price-movers: shows where one ticket site's lowest listed price has really
// fallen over the last week. Owner-approved 2026-11-24 (return-visits plan);
// launched noindex.
//
// Same rules as the price-drop post drafts (scripts/lib/price-drop-posts.mjs,
// DROP_RULES), kept as a copy here because functions cannot import scripts/:
// one show on one site in one currency, the lowest listed price at least 20%
// and 20 in that currency below the reading 6-8 days earlier, held on the last
// two daily readings, 3+ daily readings between, show 3+ days away, newest
// reading under 30 hours old. Only sites with an approved numeric price lane.
// Every row names the site, both dated prices and the check time, and links to
// the show on its artist page. No forecast, no "cheapest" or savings claim, no
// fee claim. Adds no outbound links and touches no affiliate logic.

import { isUpcomingShow } from "./_upcoming.js";
import { eventLifecycleHeld } from "./_route-indexability.js";
import { eventLocalDateIso } from "./_event-local-date.js";

export const PRICE_MOVERS_PATH = "/price-movers";
// Noindex while the page is measured (owner decision 2026-11-24). Flip only in a reviewed PR.
export const PRICE_MOVERS_INDEXABLE = false;

export const PRICE_MOVERS_SITES = new Map([
  ["vivid-seats", "Vivid Seats"],
  ["ticketnetwork", "TicketNetwork"],
  ["stubhub-international", "StubHub International"]
]);

export const PRICE_MOVERS_RULES = Object.freeze({
  minDropShare: 0.2,
  minDropAmount: 20,
  baseGapDays: [6, 8],
  minReadings: 3,
  heldReadings: 2,
  minDaysToShow: 3,
  maxLatestAgeHours: 30,
  perArtist: 2,
  maxRows: 24,
  minPrice: 10
});

const DAY_MS = 86400000;
const trimmed = (v) => String(v ?? "").trim();
const dayMs = (d) => Date.parse(`${d}T00:00:00Z`);
const dayDiff = (a, b) => Math.round((dayMs(a) - dayMs(b)) / DAY_MS);

/** Daily rollup rows for the stored top-priority shows, 45 days back. SELECT only. */
export async function fetchPriceMoverRows(db, now = Date.now()) {
  if (!db || typeof db.prepare !== "function") return [];
  const asOf = new Date(now).toISOString().slice(0, 10);
  const sites = [...PRICE_MOVERS_SITES.keys()];
  const marks = sites.map((_, i) => `?${i + 2}`).join(",");
  const result = await db
    .prepare(
      `SELECT d.event_id, d.artist_slug, d.provider, d.source, d.currency, d.observed_date, d.low_price_min, d.low_price_last, d.last_observed_at, sp.rank priority_rank FROM provider_pricing_daily d JOIN show_priority sp ON sp.event_id = d.event_id WHERE d.observed_date >= date(?1,'-45 day') AND d.provider IN (${marks}) ORDER BY d.event_id, d.provider, d.source, d.currency, d.observed_date`
    )
    .bind(asOf, ...sites)
    .all();
  return Array.isArray(result?.results) ? result.results : [];
}

/**
 * @param {any[]} rows fetchPriceMoverRows rows.
 * @param {any[]} events events.json records.
 * @param {{artists?: any[]}} catalog
 * @param {Iterable<string>|null} indexableSlugs only these artists are listed.
 * @param {number} [now]
 */
export function derivePriceMovers(rows, events, catalog, indexableSlugs = null, now = Date.now()) {
  const r = PRICE_MOVERS_RULES;
  const linkable = indexableSlugs ? new Set([...indexableSlugs].map(String)) : null;
  const names = new Map((catalog?.artists || []).map((a) => [trimmed(a.slug), trimmed(a.name)]));
  const byId = new Map((Array.isArray(events) ? events : []).filter((e) => e?.id).map((e) => [trimmed(e.id), e]));

  const groups = new Map();
  for (const row of Array.isArray(rows) ? rows : []) {
    if (!PRICE_MOVERS_SITES.has(trimmed(row?.provider))) continue;
    const key = [row.event_id, row.provider, row.source, row.currency].map(trimmed).join("|");
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(row);
  }

  const found = [];
  for (const series of groups.values()) {
    series.sort((a, b) => trimmed(a.observed_date).localeCompare(trimmed(b.observed_date)));
    const clean = series.filter((row) => Number(row.low_price_last) >= r.minPrice);
    const latest = clean[clean.length - 1];
    if (!latest) continue;
    const event = byId.get(trimmed(latest.event_id));
    if (!event || eventLifecycleHeld(event) || !isUpcomingShow(event, now)) continue;
    const slug = trimmed(event.artist_slug);
    if (!slug || !names.has(slug) || (linkable && !linkable.has(slug))) continue;
    const daysToShow = (Date.parse(trimmed(event.datetime_iso)) - now) / DAY_MS;
    if (!(daysToShow >= r.minDaysToShow)) continue;
    const latestAt = Date.parse(trimmed(latest.last_observed_at));
    if (!Number.isFinite(latestAt) || now - latestAt > r.maxLatestAgeHours * 3600000 || latestAt > now + 3600000) continue;

    const [gapMin, gapMax] = r.baseGapDays;
    const bases = clean.filter((row) => {
      const gap = dayDiff(latest.observed_date, row.observed_date);
      return gap >= gapMin && gap <= gapMax;
    });
    if (!bases.length) continue;
    const base = bases.sort((a, b) => Math.abs(dayDiff(latest.observed_date, a.observed_date) - 7) - Math.abs(dayDiff(latest.observed_date, b.observed_date) - 7))[0];
    const between = clean.filter((row) => row.observed_date >= base.observed_date && row.observed_date <= latest.observed_date);
    if (between.length < r.minReadings) continue;

    const from = Number(base.low_price_last);
    const to = Number(latest.low_price_last);
    const threshold = from * (1 - r.minDropShare);
    const tail = between.slice(-r.heldReadings);
    if (tail.length < r.heldReadings || !tail.every((row) => Number(row.low_price_last) <= threshold)) continue;
    if (!(to <= threshold && from - to >= r.minDropAmount)) continue;
    const localDate = eventLocalDateIso(event);
    if (!localDate) continue;

    found.push({
      eventId: trimmed(latest.event_id),
      artistSlug: slug,
      artist: names.get(slug),
      city: trimmed(event.city),
      venue: trimmed(event.venue),
      localDate,
      daysToShow: Math.floor(daysToShow),
      site: PRICE_MOVERS_SITES.get(trimmed(latest.provider)),
      currency: trimmed(latest.currency),
      from,
      fromDate: trimmed(base.observed_date),
      to,
      toDate: trimmed(latest.observed_date),
      capturedAt: new Date(latestAt).toISOString(),
      dropShare: (from - to) / from,
      priorityRank: Number.isFinite(Number(latest.priority_rank)) ? Number(latest.priority_rank) : 9999,
      path: `/artists/${slug}#show-${trimmed(event.id).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}`
    });
  }

  found.sort((a, b) => a.priorityRank - b.priorityRank || b.dropShare - a.dropShare || a.eventId.localeCompare(b.eventId));
  const perArtist = new Map();
  const movers = [];
  for (const item of found) {
    const n = perArtist.get(item.artistSlug) || 0;
    if (n >= r.perArtist) continue;
    perArtist.set(item.artistSlug, n + 1);
    movers.push(item);
    if (movers.length >= r.maxRows) break;
  }
  return { movers, total: found.length, indexable: PRICE_MOVERS_INDEXABLE };
}
