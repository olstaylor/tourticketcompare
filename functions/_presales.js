// @ts-check
// Ticketmaster presale windows: `/artists/<artist>/presale`, the presale
// section of `/on-sale`, and the presale line on artist pages.
//
// The only facts this adds are the named presale windows Ticketmaster's
// Discovery API lists for an exact event (`sales.presales[]`: name, start,
// end). The nightly field-sync (scripts/apply-tm-updates.mjs) carries them
// verbatim on the reviewed event record as `presales: [{ name, start, end }]`
// through the same sanctioned lane and the same identity checks as the
// event's date and venue (SAFE_PUBLISHING_RULES.md § presale windows).
//
// Rules that are not style preferences:
//
//   1. NEVER A CODE. Presale codes are not from an approved source and many
//      are private. Only the window's public name and times are kept, and a
//      name that looks like it carries a code or a link is dropped whole.
//   2. NOTHING INFERRED. A window belongs to the dates whose own Discovery
//      record lists it. Windows are grouped across dates only when name, start
//      and end are identical, never by similar names.
//   3. ONE URL PER ARTIST. Like the price guide, the page rolls from one tour
//      to the next and is indexable only while a window is near.
//
// Shared by the router ([[path]].js), the sitemap, llms.txt and the sync
// script, so none of them can disagree. Pure: no HTML, no I/O.

import { eventLifecycleHeld, presalePageGate, PRESALE_PAGE_INDEX_DAYS } from "./_route-indexability.js";

const DAY_MS = 86400000;

export const PRESALE_SEGMENT = "presale";
// How far ahead a window is listed on /on-sale.
export const PRESALE_LOOKAHEAD_DAYS = 60;
// A window further out than this is a placeholder, not a schedule (Discovery
// uses far-future rows for "to be announced", as with public on-sales).
export const PRESALE_MAX_HORIZON_DAYS = 365;
export const PRESALE_MAX_WINDOWS_PER_EVENT = 25;
export const PRESALE_NAME_MAX_LENGTH = 100;

// A name that mentions a code, password, passcode or PIN at all, or carries
// anything link-like (a scheme, "www.", an "@", or a dotted domain), is
// dropped whole: punctuation is not required, so "use code LOVE24" and
// "tickets.example.com/presale" are both refused. Over-dropping a genuine
// window is the safe direction. Mirrored in scripts/validate-events.py.
const UNSAFE_NAME = /\b(codes?|passwords?|passcodes?|pins?)\b|https?:|www\.|@|\b[a-z0-9-]+\.[a-z]{2,}\b/i;

/**
 * Whether a presale window name is fit to store or show.
 *
 * @param {unknown} name
 * @returns {boolean}
 */
export function presaleNameSafe(name) {
  const text = cleanName(name);
  return Boolean(text) && text.length <= PRESALE_NAME_MAX_LENGTH && !UNSAFE_NAME.test(text);
}

export function presalePath(slug) {
  return `/artists/${slug}/${PRESALE_SEGMENT}`;
}

function trimmed(value) {
  return String(value ?? "").trim();
}

function cleanName(value) {
  return String(value ?? "").replace(/\s+/g, " ").trim();
}

/**
 * Presale windows fit to store or show, from either a Discovery record's
 * `sales.presales` (startDateTime/endDateTime) or a stored `presales` field
 * (start/end). Windows that have ended, lack a valid start or end, end before
 * they start, sit past the horizon, or carry an unsafe name are dropped.
 * Start and end strings are kept verbatim. Sorted by start, end, then name.
 *
 * @param {any} list
 * @param {number} [now]
 * @returns {{ name: string, start: string, end: string }[]}
 */
export function normalizePresaleWindows(list, now = Date.now()) {
  if (!Array.isArray(list)) return [];
  const seen = new Set();
  const out = [];
  for (const item of list) {
    if (!item || typeof item !== "object") continue;
    const name = cleanName(item.name);
    const start = trimmed(item.start ?? item.startDateTime);
    const end = trimmed(item.end ?? item.endDateTime);
    if (!presaleNameSafe(name)) continue;
    const startMs = Date.parse(start);
    const endMs = Date.parse(end);
    if (!Number.isFinite(startMs) || !Number.isFinite(endMs) || endMs <= startMs) continue;
    if (endMs <= now) continue;
    if (startMs - now > PRESALE_MAX_HORIZON_DAYS * DAY_MS) continue;
    const key = `${name}|${start}|${end}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push({ name, start, end, startMs });
  }
  out.sort((a, b) => a.startMs - b.startMs || Date.parse(a.end) - Date.parse(b.end) || a.name.localeCompare(b.name));
  return out.slice(0, PRESALE_MAX_WINDOWS_PER_EVENT).map(({ name, start, end }) => ({ name, start, end }));
}

function showEntry(event) {
  return {
    id: trimmed(event.id),
    city: trimmed(event.city),
    country: trimmed(event.country),
    venue: trimmed(event.venue),
    datetimeIso: trimmed(event.datetime_iso),
    timezone: trimmed(event.timezone) || "UTC"
  };
}

// Upcoming, still-scheduled dates. A cancelled or postponed show has no sale.
function upcomingEvents(events, now) {
  return (Array.isArray(events) ? events : []).filter((event) => {
    if (!event || !trimmed(event.artist_slug) || eventLifecycleHeld(event)) return false;
    const showMs = Date.parse(trimmed(event.datetime_iso));
    return Number.isFinite(showMs) && showMs > now;
  });
}

function groupWindows(events, now, lookaheadDays) {
  const groups = new Map();
  for (const event of events) {
    for (const window of normalizePresaleWindows(event.presales, now)) {
      const startMs = Date.parse(window.start);
      if (lookaheadDays !== null && startMs - now > lookaheadDays * DAY_MS) continue;
      const key = `${window.name}|${window.start}|${window.end}`;
      if (!groups.has(key)) {
        groups.set(key, { ...window, startMs, endMs: Date.parse(window.end), open: startMs <= now, shows: [] });
      }
      groups.get(key).shows.push(showEntry(event));
    }
  }
  const list = [...groups.values()];
  for (const group of list) group.shows.sort((a, b) => a.datetimeIso.localeCompare(b.datetimeIso));
  list.sort((a, b) => a.startMs - b.startMs || a.endMs - b.endMs || a.name.localeCompare(b.name));
  return list;
}

/**
 * One artist's presale view, for the presale page and the artist page line.
 *
 * @param {any[]} events Raw events.json records (any artists; filtered here).
 * @param {string} artistSlug
 * @param {number} [now]
 */
export function deriveArtistPresales(events, artistSlug, now = Date.now()) {
  const slug = trimmed(artistSlug).toLowerCase();
  const own = upcomingEvents(events, now).filter((event) => trimmed(event.artist_slug).toLowerCase() === slug);
  const windows = groupWindows(own, now, null);
  const publicOnsales = own
    .map((event) => ({ ...showEntry(event), onsaleAt: trimmed(event.public_onsale_at), onsaleMs: Date.parse(trimmed(event.public_onsale_at)) }))
    .filter((entry) => Number.isFinite(entry.onsaleMs) && entry.onsaleMs > now && entry.onsaleMs - now <= PRESALE_MAX_HORIZON_DAYS * DAY_MS)
    .sort((a, b) => a.onsaleMs - b.onsaleMs || a.datetimeIso.localeCompare(b.datetimeIso));
  const coveredShowIds = new Set(windows.flatMap((window) => window.shows.map((show) => show.id)));
  const indexWindowCount = windows.filter((window) => window.startMs - now <= PRESALE_PAGE_INDEX_DAYS * DAY_MS).length;
  const view = {
    artistSlug: slug,
    windows,
    openCount: windows.filter((window) => window.open).length,
    upcomingWindowCount: windows.filter((window) => !window.open).length,
    windowCount: windows.length,
    indexWindowCount,
    coveredShowCount: coveredShowIds.size,
    showCount: own.length,
    publicOnsales,
    nextWindow: windows.find((window) => !window.open) || null
  };
  return { ...view, indexable: presalePageGate(view).indexable };
}

/**
 * Presale windows open now or opening within PRESALE_LOOKAHEAD_DAYS, grouped
 * by artist, for /on-sale. Artists are ordered by their earliest window.
 *
 * @param {any[]} events
 * @param {number} [now]
 */
export function deriveUpcomingPresales(events, now = Date.now()) {
  const byArtist = new Map();
  for (const event of upcomingEvents(events, now)) {
    const slug = trimmed(event.artist_slug).toLowerCase();
    if (!byArtist.has(slug)) byArtist.set(slug, { artistSlug: slug, artistName: trimmed(event.artist_name) || slug, events: [] });
    byArtist.get(slug).events.push(event);
  }
  const artists = [];
  for (const artist of byArtist.values()) {
    const windows = groupWindows(artist.events, now, PRESALE_LOOKAHEAD_DAYS);
    if (windows.length) artists.push({ artistSlug: artist.artistSlug, artistName: artist.artistName, windows });
  }
  artists.sort((a, b) => a.windows[0].startMs - b.windows[0].startMs || a.artistName.localeCompare(b.artistName));
  return {
    artists,
    artistCount: artists.length,
    windowCount: artists.reduce((sum, artist) => sum + artist.windows.length, 0)
  };
}

/**
 * Presale pages that are indexable now, for the sitemap and llms.txt. The
 * caller passes the slugs whose artist pages are themselves indexable: a child
 * page never outranks its parent.
 *
 * @param {any[]} events
 * @param {string[]} indexableArtistSlugs
 * @param {number} [now]
 */
export function deriveIndexablePresalePages(events, indexableArtistSlugs, now = Date.now()) {
  const allowed = new Set((indexableArtistSlugs || []).map((slug) => trimmed(slug).toLowerCase()));
  const names = new Map();
  const bySlug = new Map();
  for (const event of Array.isArray(events) ? events : []) {
    const slug = trimmed(event?.artist_slug).toLowerCase();
    if (!allowed.has(slug) || !Array.isArray(event?.presales) || !event.presales.length) continue;
    if (!bySlug.has(slug)) bySlug.set(slug, []);
    names.set(slug, trimmed(event.artist_name) || slug);
  }
  if (!bySlug.size) return [];
  const pages = [];
  for (const slug of bySlug.keys()) {
    const view = deriveArtistPresales(events, slug, now);
    if (!view.indexable) continue;
    pages.push({
      slug,
      path: presalePath(slug),
      artistName: names.get(slug) || slug,
      windowCount: view.windowCount,
      nextStart: view.windows[0]?.start || ""
    });
  }
  return pages.sort((a, b) => a.artistName.localeCompare(b.artistName));
}
