// "Selling soon": internal links from the pages with the most search
// impressions to the shows on the daily priority list (owner-approved
// strategic review 2026-10-16, priority 3; the list itself is PR #1525,
// scripts/report-show-priority.mjs).
//
// Those pages (vendor guides, the compare hub, the homepage, a few blog posts
// and the Lizzy McAlpine artist page) mostly answer informational searches,
// while sales come from artist pages for shows a few days out. This module
// picks up to SELLING_SOON_LIMIT such shows, best first, one per artist.
//
// A show qualifies only when all of these hold at request time:
//   - it is on the stored priority list (D1 `show_priority`, at most 72 hours
//     old), which ranks by expected commission;
//   - it starts between SELLING_SOON_MIN_HOURS and SELLING_SOON_MAX_DAYS away;
//   - it is publishable (a verified ticket destination, not cancelled or
//     postponed) and its artist page is indexable and not demoted;
//   - at least one approved lane has a fresh listed-price snapshot, through
//     the same gate the show card uses (attachApprovedMarketplacePrices).
//
// The output is plain internal links to the show on its artist page, each with
// the lowest listed price among the fresh approved snapshots for that show
// (provider named, snapshot time, count of sites priced). That figure is the
// same one the show card already prints, from the same gate, and is labelled
// "not the final total" where it is shown. No availability claim is made, no
// CTA or affiliate logic is involved, and no page is added. Every failure
// degrades to an empty list.

import { showStartMs } from "./_upcoming.js";
import { eventLifecycleHeld, eventPublishable } from "./_route-indexability.js";
import { artistPageIndexable } from "./_artist-indexability.js";
import { attachApprovedMarketplacePrices } from "./api/shows.js";
import { relativeShowDay } from "./_relative-day.js";

const PROVIDER_NAMES = {
  "stubhub-international": "StubHub International",
  ticketnetwork: "TicketNetwork",
  "vivid-seats": "Vivid Seats",
  "ticket-liquidator": "Ticket Liquidator",
  seatgeek: "SeatGeek"
};

export const SELLING_SOON_LIMIT = 8;
// Every sale traced to a Sub ID so far was a click on a show a day or less away,
// so tomorrow's and tonight's shows stay in until a few hours before the start.
export const SELLING_SOON_MIN_HOURS = 3;
export const SELLING_SOON_MAX_DAYS = 14;
const PRIORITY_READ_TOP = 60;
const PRIORITY_MAX_AGE_HOURS = 72;
const HOUR_MS = 3600000;

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function sellingSoonWindow(event, now = Date.now()) {
  const start = showStartMs(event);
  return Number.isFinite(start) && start - now >= SELLING_SOON_MIN_HOURS * HOUR_MS && start - now <= SELLING_SOON_MAX_DAYS * 24 * HOUR_MS;
}

function dateLabel(event) {
  const start = showStartMs(event);
  if (!Number.isFinite(start)) return "";
  const options = { weekday: "short", month: "short", day: "numeric" };
  try {
    return new Intl.DateTimeFormat("en-US", { ...options, timeZone: event.timezone || "UTC" }).format(start);
  } catch {
    return new Intl.DateTimeFormat("en-US", { ...options, timeZone: "UTC" }).format(start);
  }
}

/**
 * Candidates in priority order: on the list, inside the window, publishable,
 * on an indexable artist page. Pricing is checked afterwards, on these only.
 *
 * @param {object} input
 * @param {{event_id: string, rank: number, artist_slug: string}[]} input.rows  stored priority rows
 * @param {Map<string, object>} input.eventsById   raw events.json records
 * @param {Map<string, object>} input.artistsBySlug  artists.json records
 * @param {Map<string, object[]>} input.eventsByArtist  each listed artist's records
 */
export function sellingSoonCandidates({ rows, eventsById, artistsBySlug, eventsByArtist, now = Date.now() }) {
  const candidates = [];
  for (const row of [...(rows || [])].sort((a, b) => Number(a.rank) - Number(b.rank))) {
    const event = eventsById.get(String(row?.event_id || ""));
    if (!event) continue;
    const slug = slugify(event.artist_slug);
    const artist = artistsBySlug.get(slug);
    if (!artist || artist.demoted) continue;
    if (!artistPageIndexable(artist, eventsByArtist.get(slug) || [], slug, now)) continue;
    if (eventLifecycleHeld(event) || !eventPublishable(event, now) || !sellingSoonWindow(event, now)) continue;
    candidates.push({ event, artist });
  }
  return candidates;
}

/**
 * The lowest fresh listed price for a show, or null. Only same-currency figures
 * are compared; with mixed currencies no price is claimed.
 * @param {{provider?: string, price?: number, currency?: string, status?: string, fetchedAt?: string}[]} prices
 */
export function lowestListedPrice(prices) {
  const ok = (prices || []).filter((entry) => entry?.status === "ok" && Number.isFinite(entry?.price) && entry.price > 0 && entry.currency);
  if (!ok.length) return null;
  const currencies = new Set(ok.map((entry) => String(entry.currency).toUpperCase()));
  if (currencies.size !== 1) return null;
  const best = ok.reduce((low, entry) => (entry.price < low.price ? entry : low));
  const fetched = Date.parse(String(best.fetchedAt || ""));
  if (!Number.isFinite(fetched)) return null;
  return {
    amount: best.price,
    currency: [...currencies][0],
    provider: PROVIDER_NAMES[best.provider] || String(best.provider || "").trim(),
    sites_priced: ok.length,
    checked_at: new Date(fetched).toISOString()
  };
}

/** Up to `limit` links, one per artist, from candidates with a current price.
 *  `pricedIds` is a Set of ids, or a Map of id to lowest listed price. */
export function sellingSoonLinks(candidates, pricedIds, limit = SELLING_SOON_LIMIT, now = Date.now()) {
  const seen = new Set();
  const links = [];
  for (const { event, artist } of candidates) {
    const slug = slugify(event.artist_slug);
    if (seen.has(slug) || !pricedIds.has(String(event.id))) continue;
    seen.add(slug);
    const lowest = typeof pricedIds.get === "function" ? pricedIds.get(String(event.id)) : null;
    links.push({
      artist_slug: slug,
      artist_name: String(artist.name || event.artist_name || slug).trim(),
      date: dateLabel(event),
      ...(relativeShowDay(event.datetime_iso, event.timezone, now) ? { when: relativeShowDay(event.datetime_iso, event.timezone, now) } : {}),
      venue: String(event.venue || "").trim(),
      city: String(event.city || "").trim(),
      href: `/artists/${slug}#show-${slugify(event.id)}`,
      ...(lowest ? { lowest } : {})
    });
    if (links.length === limit) break;
  }
  return links;
}

async function readJsonAsset(env, path) {
  const assets = env?.ASSETS;
  if (!assets || typeof assets.fetch !== "function") return null;
  try {
    const res = await assets.fetch(new Request(`https://assets.local${path}`));
    return res.ok ? await res.json() : null;
  } catch {
    return null;
  }
}

async function readPriorityRows(db) {
  if (!db || typeof db.prepare !== "function") return [];
  try {
    const result = await db
      .prepare(
        `SELECT event_id, rank, artist_slug FROM show_priority WHERE computed_at >= strftime('%Y-%m-%dT%H:%M:%fZ', 'now', '-${PRIORITY_MAX_AGE_HOURS} hours') ORDER BY rank LIMIT ${PRIORITY_READ_TOP}`
      )
      .all();
    return Array.isArray(result?.results) ? result.results : [];
  } catch {
    return [];
  }
}

/** The current selling-soon links. Never throws; [] when anything is missing. */
export async function loadSellingSoon(env, now = Date.now()) {
  try {
    const rows = await readPriorityRows(env?.DEMAND_DB || env?.DB);
    if (!rows.length) return [];
    const artistsMeta = await readJsonAsset(env, "/data/artists.json");
    if (!Array.isArray(artistsMeta)) return [];
    const artistsBySlug = new Map(artistsMeta.filter(Boolean).map((artist) => [slugify(artist.slug), artist]));
    const slugs = [...new Set(rows.map((row) => slugify(row.artist_slug)).filter((slug) => artistsBySlug.has(slug)))];
    const partitions = await Promise.all(slugs.map((slug) => readJsonAsset(env, `/data/events/${encodeURIComponent(slug)}.json`)));
    const eventsByArtist = new Map();
    const eventsById = new Map();
    slugs.forEach((slug, index) => {
      const events = Array.isArray(partitions[index]) ? partitions[index] : [];
      eventsByArtist.set(slug, events);
      for (const event of events) if (event?.id) eventsById.set(String(event.id), event);
    });
    const candidates = sellingSoonCandidates({ rows, eventsById, artistsBySlug, eventsByArtist, now });
    if (!candidates.length) return [];
    const priced = await attachApprovedMarketplacePrices(candidates.map(({ event }) => event), env);
    const pricedIds = new Map();
    for (const show of priced) {
      if (show.priceQueryFailed) continue;
      if (!(show.prices || []).some((price) => price?.status === "ok" && Number.isFinite(price?.price))) continue;
      pricedIds.set(String(show.id), lowestListedPrice(show.prices));
    }
    return sellingSoonLinks(candidates, pricedIds, SELLING_SOON_LIMIT, now);
  } catch {
    return [];
  }
}
