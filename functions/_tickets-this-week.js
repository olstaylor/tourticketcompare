// /concert-tickets-this-week: concerts in the next 7 days that have a listed
// price right now, with the same price panel (and the same gated ticket
// buttons) the artist, home and on-sale pages render. Owner-approved
// 2026-11-25; launched noindex.
//
// This module only chooses which dates to look up. Prices, buttons and every
// CTA gate come from the shared renderer in [[path]].js, so the page cannot
// print a price or a link the artist page would not. A date appears only if
// the price lookup then returns a dated, approved snapshot. Pure: no I/O.

import { isUpcomingShow } from "./_upcoming.js";
import { eventLifecycleHeld } from "./_route-indexability.js";

export const TICKETS_THIS_WEEK_PATH = "/concert-tickets-this-week";
// Noindex while the page is measured (owner decision 2026-11-25). Flip only in a reviewed PR.
export const TICKETS_THIS_WEEK_INDEXABLE = false;
export const TICKETS_THIS_WEEK_DAYS = 7;
// Dates looked up in D1 per request (ceil(n/50) cache reads) and dates one artist may fill.
export const TICKETS_THIS_WEEK_MAX_LOOKUPS = 60;
export const TICKETS_THIS_WEEK_PER_ARTIST = 3;
export const TICKETS_THIS_WEEK_MAX_PANELS = 30;

const DAY_MS = 86400000;
const trimmed = (v) => String(v ?? "").trim();

/**
 * @param {any[]} events events.json records.
 * @param {Iterable<string>} indexableSlugs artists whose own page is indexable.
 * @param {number} [now]
 * @returns {Array<{ slug: string, eventId: string, ts: number }>} dates to price, soonest first.
 */
export function deriveThisWeekPicks(events, indexableSlugs, now = Date.now()) {
  const linkable = new Set([...(indexableSlugs || [])].map(trimmed));
  const limit = now + TICKETS_THIS_WEEK_DAYS * DAY_MS;
  const picks = [];
  for (const event of Array.isArray(events) ? events : []) {
    if (!event || typeof event !== "object") continue;
    const slug = trimmed(event.artist_slug);
    const id = trimmed(event.id);
    if (!slug || !id || !linkable.has(slug)) continue;
    if (eventLifecycleHeld(event) || !isUpcomingShow(event, now)) continue;
    const ts = Date.parse(trimmed(event.datetime_iso));
    if (!Number.isFinite(ts) || ts > limit) continue;
    // Two or more verified seller links, so the page is a comparison, not a single link.
    const verified = Object.values(event.provider_links || {}).filter((p) => p && p.verified && trimmed(p.url)).length;
    if (verified < 2) continue;
    picks.push({ slug, eventId: id, ts });
  }
  picks.sort((a, b) => a.ts - b.ts || a.eventId.localeCompare(b.eventId));
  const perArtist = new Map();
  const out = [];
  for (const pick of picks) {
    const n = perArtist.get(pick.slug) || 0;
    if (n >= TICKETS_THIS_WEEK_PER_ARTIST) continue;
    perArtist.set(pick.slug, n + 1);
    out.push(pick);
    if (out.length >= TICKETS_THIS_WEEK_MAX_LOOKUPS) break;
  }
  return out;
}
