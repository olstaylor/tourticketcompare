import { isUpcomingShow } from "./_upcoming.js";
import { eventLocalDateParts } from "./_event-local-date.js";
import { eventLifecycleHeld } from "./_route-indexability.js";
import { artistTourLabel } from "./_route-metadata.js";
import { normalizeCountry } from "./_cities.js";

// The /tours/<year> hub: every tracked artist with upcoming dates in that year,
// each linking to its existing artist page. It adds no per-event pages and no
// fact of its own: every row is a count over the same reviewed events the
// artist page renders, so the two can never disagree.
//
// Indexing is held off (TOURS_HUB_INDEXABLE) until the event-page pilot is read
// on 2026-10-25 (owner direction, 2026-10-06: measure before widening the
// indexable surface). While false the page renders noindex,follow and stays out
// of the sitemap and llms.txt. Flip it only with the owner's OK.

export const TOURS_HUB_YEAR = 2027;
export const TOURS_HUB_PATH = `/tours/${TOURS_HUB_YEAR}`;
export const TOURS_HUB_INDEXABLE = false;

function trimmed(value) {
  return String(value ?? "").trim();
}

/**
 * Derive the tours hub for one calendar year from reviewed events.
 *
 * A date counts when it is still upcoming, is not cancelled or postponed, and
 * falls in `year` in the venue's local calendar. Artists without a catalog
 * entry have no page to link, so they are left out.
 *
 * @param {any[]} events Raw events.json records.
 * @param {{artists?: any[]}} catalog catalog.json.
 * @param {number} [year]
 * @param {number} [now] Evaluation instant.
 */
export function deriveToursHub(events, catalog, year = TOURS_HUB_YEAR, now = Date.now()) {
  const catalogArtists = new Map(
    (Array.isArray(catalog?.artists) ? catalog.artists : []).map((artist) => [trimmed(artist.slug), artist])
  );
  const byArtist = new Map();
  for (const event of Array.isArray(events) ? events : []) {
    const slug = trimmed(event?.artist_slug);
    if (!slug || !catalogArtists.has(slug)) continue;
    if (eventLifecycleHeld(event) || !isUpcomingShow(event, now)) continue;
    const parts = eventLocalDateParts(event);
    if (!parts || parts.year !== year) continue;
    if (!byArtist.has(slug)) byArtist.set(slug, []);
    byArtist.get(slug).push({ event, month: parts.month });
  }

  const artists = [...byArtist.entries()].map(([slug, rows]) => {
    const months = rows.map((row) => row.month);
    // "United States Of America" and "United States" are one country (the
    // same aliasing city pages use).
    const countries = [...new Set(rows.map((row) => normalizeCountry(row.event.country)).filter(Boolean))].sort();
    const cities = new Set(rows.map((row) => `${trimmed(row.event.city).toLowerCase()}|${normalizeCountry(row.event.country)}`));
    return {
      artistSlug: slug,
      artistName: trimmed(catalogArtists.get(slug).name) || trimmed(rows[0].event.artist_name) || slug,
      path: `/artists/${slug}`,
      showCount: rows.length,
      cityCount: cities.size,
      countries,
      firstMonth: Math.min(...months),
      lastMonth: Math.max(...months),
      tourName: artistTourLabel(rows.map((row) => row.event.tour_name))
    };
  });
  artists.sort((a, b) => b.showCount - a.showCount || a.artistName.localeCompare(b.artistName));

  return {
    year,
    artists,
    artistCount: artists.length,
    showCount: artists.reduce((sum, artist) => sum + artist.showCount, 0),
    countryCount: new Set(artists.flatMap((artist) => artist.countries)).size,
    indexable: TOURS_HUB_INDEXABLE && artists.length > 0
  };
}
