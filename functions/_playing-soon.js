// @ts-check
// "Playing in the next 8 weeks": internal links from /on-sale to artists with
// reviewed dates in the near term, so a December or January run is one link
// from the calendar even when it has no Ticketmaster on-sale in the next week.
// Derived from events.json on every render, so it needs no upkeep: artists
// appear when their dates fall inside the window and drop out as they pass.
//
// Links, date counts and city counts only. No price, availability or ticket
// link. Pure: no I/O. The caller passes the slugs whose artist pages are
// indexable.

const DAY_MS = 86400000;

export const PLAYING_SOON_DAYS = 56;
export const PLAYING_SOON_MAX_ITEMS = 24;

const TRUSTED = new Set(["human_verified", "machine_high_confidence"]);

/**
 * @param {any[]} events Raw events.json records.
 * @param {Set<string>} linkableSlugs Artist slugs with an indexable artist page.
 * @param {number} [now]
 */
export function derivePlayingSoon(events, linkableSlugs, now = Date.now()) {
  const limit = now + PLAYING_SOON_DAYS * DAY_MS;
  /** @type {Map<string, { artistSlug: string, artistName: string, dates: number, cities: Set<string>, firstMs: number }>} */
  const byArtist = new Map();
  for (const event of events) {
    const slug = String(event?.artist_slug || "");
    if (!slug || !linkableSlugs.has(slug) || !TRUSTED.has(event.verification_status)) continue;
    if (/cancel|postpone/i.test(String(event.status || ""))) continue;
    const ms = Date.parse(event.datetime_iso);
    if (!Number.isFinite(ms) || ms < now || ms > limit) continue;
    const entry = byArtist.get(slug) || { artistSlug: slug, artistName: String(event.artist_name || slug), dates: 0, cities: new Set(), firstMs: ms };
    entry.dates += 1;
    entry.cities.add(String(event.city || ""));
    entry.firstMs = Math.min(entry.firstMs, ms);
    byArtist.set(slug, entry);
  }
  return [...byArtist.values()]
    .map((entry) => ({ artistSlug: entry.artistSlug, artistName: entry.artistName, dates: entry.dates, cities: entry.cities.size, firstMs: entry.firstMs }))
    .sort((a, b) => b.dates - a.dates || a.firstMs - b.firstMs || a.artistName.localeCompare(b.artistName))
    .slice(0, PLAYING_SOON_MAX_ITEMS);
}

function esc(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/'/g, "&#39;");
}

/**
 * @param {ReturnType<typeof derivePlayingSoon>} items
 * @param {string} [id]
 */
export function renderPlayingSoonHtml(items, id = "playingSoonTitle") {
  if (!items.length) return "";
  const rows = items
    .map((item) => {
      const dates = `${item.dates} ${item.dates === 1 ? "date" : "dates"}`;
      const cities = `${item.cities} ${item.cities === 1 ? "city" : "cities"}`;
      const first = new Date(item.firstMs).toISOString().slice(0, 10);
      return `<li><a href="/artists/${esc(item.artistSlug)}"><strong>${esc(item.artistName)}</strong><span> ${esc(dates)} in ${esc(cities)}, from ${esc(first)}</span></a></li>`;
    })
    .join("");
  return `<section class="nested-panel playing-soon" aria-labelledby="${esc(id)}"><h2 id="${esc(id)}">Playing in the next 8 weeks</h2><p>Artists with reviewed dates in the next ${PLAYING_SOON_DAYS / 7} weeks, most dates first. Each artist page shows its ticket links and when they were last checked.</p><ul>${rows}</ul></section>`;
}
