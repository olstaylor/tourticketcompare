// Per-show context for the individual event page (/events/…): where this date
// sits in the artist's tracked schedule, the artist's other dates in the same
// city, other tracked artists at the same venue (and elsewhere in the city)
// around the same date, and the
// sale windows Ticketmaster lists for it. Everything is derived from the stored
// event records; nothing is inferred (a tour is named only where the record
// carries tour_name, and no price is read here).
//
// Pure: callers pass `now`, and the renderer in [[path]].js formats the dates.

import { citySlug, slugify } from "./_cities.js";
import { venueSlug } from "./_venues.js";
import { eventLifecycleHeld, eventPublishable, publicOnsalePending } from "./_route-indexability.js";
import { normalizePresaleWindows } from "./_presales.js";
import { ONSALE_MAX_HORIZON_DAYS } from "./_onsale-calendar.js";

const DAY_MS = 24 * 60 * 60 * 1000;
// Other artists at the same venue: dates within this many days either side.
export const EVENT_VENUE_NEIGHBOUR_DAYS = 45;
export const EVENT_VENUE_NEIGHBOUR_LIMIT = 6;
// Other artists elsewhere in the same city: dates within this many days.
export const EVENT_CITY_NEIGHBOUR_DAYS = 10;
export const EVENT_SAME_CITY_LIMIT = 8;

const INDEXABLE_ARTIST_STATUS = "indexable_with_substantial_content";

function trimmed(value) {
  return String(value ?? "").trim();
}

function startMs(event) {
  return Date.parse(trimmed(event?.datetime_iso || event?.dateTimeISO));
}

// A real, upcoming, still-scheduled performance with somewhere to describe.
// `nonPerformance` is the router's nonPerformanceMarkers (functions/_event-pages.js,
// whose import is limited to the router and the indexability policy).
function listableDate(event, now, nonPerformance) {
  if (!event || typeof event !== "object") return false;
  if (!trimmed(event.id) || !trimmed(event.venue) || !trimmed(event.city)) return false;
  const ms = startMs(event);
  if (!Number.isFinite(ms) || ms < now) return false;
  if (eventLifecycleHeld(event)) return false;
  return nonPerformance(event).length === 0;
}

function sameTour(a, b) {
  const left = trimmed(a?.tour_name).toLowerCase();
  return Boolean(left) && left === trimmed(b?.tour_name).toLowerCase();
}

function byStart(a, b) {
  return startMs(a) - startMs(b) || trimmed(a.id).localeCompare(trimmed(b.id));
}

/**
 * @param {any[]} events every stored event record
 * @param {any} event the page's event record
 * @param {{ now?: number, artists?: any[], nonPerformanceMarkers?: (event: any) => string[] }} [options]
 *   artists: artists.json records, used to keep neighbours to editorially
 *   indexable artists. nonPerformanceMarkers: drops travel packages, upsells
 *   and other non-performance listings.
 */
export function deriveEventContext(events, event, options = {}) {
  const now = Number.isFinite(options.now) ? Number(options.now) : Date.now();
  const nonPerformance = typeof options.nonPerformanceMarkers === "function" ? options.nonPerformanceMarkers : () => [];
  const list = Array.isArray(events) ? events : [];
  const id = trimmed(event?.id);
  const artistSlug = slugify(event?.artist_slug);
  const eventMs = startMs(event);

  // ── the artist's schedule ────────────────────────────────────────────────
  const artistDates = list.filter((candidate) => slugify(candidate?.artist_slug) === artistSlug && listableDate(candidate, now, nonPerformance)).sort(byStart);
  const tourDates = trimmed(event?.tour_name) ? artistDates.filter((candidate) => sameTour(candidate, event)) : [];
  // Name the tour only when this record carries it and at least one other
  // tracked date shares it; otherwise count the artist's whole schedule.
  const scope = tourDates.length >= 2 && tourDates.some((candidate) => trimmed(candidate.id) === id) ? tourDates : artistDates;
  const index = scope.findIndex((candidate) => trimmed(candidate.id) === id);
  const cities = new Set(scope.map((candidate) => citySlug(candidate.city, candidate.country)));
  const countries = new Set(scope.map((candidate) => trimmed(candidate.country)).filter(Boolean));
  const schedule = {
    tourName: scope === tourDates ? trimmed(event.tour_name) : "",
    total: scope.length,
    position: index >= 0 ? index + 1 : 0,
    cityCount: cities.size,
    countryCount: countries.size,
    first: scope[0] || null,
    last: scope[scope.length - 1] || null,
    previous: index > 0 ? scope[index - 1] : null,
    next: index >= 0 && index < scope.length - 1 ? scope[index + 1] : null
  };

  // ── the artist's other dates in this city ────────────────────────────────
  const locationSlug = citySlug(event?.city, event?.country);
  const venueKey = venueSlug(event?.venue, event?.city);
  const sameCityAll = artistDates.filter((candidate) => trimmed(candidate.id) !== id && citySlug(candidate.city, candidate.country) === locationSlug);
  const sameCity = sameCityAll.slice(0, EVENT_SAME_CITY_LIMIT).map((candidate) => ({
    event: candidate,
    sameVenue: venueSlug(candidate.venue, candidate.city) === venueKey
  }));

  // ── other tracked artists at this venue around this date ─────────────────
  const indexableArtists = new Set(
    (Array.isArray(options.artists) ? options.artists : [])
      .filter((artist) => artist?.indexing_status === INDEXABLE_ARTIST_STATUS)
      .map((artist) => slugify(artist.slug))
  );
  // One entry per artist (its closest date), nearest first, then in date order.
  const neighbours = (matches, windowDays) => {
    const closest = new Map();
    if (!Number.isFinite(eventMs)) return [];
    for (const candidate of list) {
      const slug = slugify(candidate?.artist_slug);
      if (!slug || slug === artistSlug || !indexableArtists.has(slug)) continue;
      if (!listableDate(candidate, now, nonPerformance) || !eventPublishable(candidate, now) || !matches(candidate)) continue;
      const gap = Math.abs(startMs(candidate) - eventMs);
      if (gap > windowDays * DAY_MS) continue;
      const held = closest.get(slug);
      if (!held || gap < held.gap) closest.set(slug, { event: candidate, gap });
    }
    return [...closest.values()]
      .sort((a, b) => a.gap - b.gap || byStart(a.event, b.event))
      .slice(0, EVENT_VENUE_NEIGHBOUR_LIMIT)
      .map((entry) => entry.event)
      .sort(byStart);
  };
  const venueNeighbours = neighbours((candidate) => venueSlug(candidate.venue, candidate.city) === venueKey, EVENT_VENUE_NEIGHBOUR_DAYS);
  const venueArtists = new Set(venueNeighbours.map((candidate) => slugify(candidate.artist_slug)));
  const cityNeighbours = neighbours(
    (candidate) =>
      citySlug(candidate.city, candidate.country) === locationSlug &&
      venueSlug(candidate.venue, candidate.city) !== venueKey &&
      !venueArtists.has(slugify(candidate.artist_slug)),
    EVENT_CITY_NEIGHBOUR_DAYS
  );

  // ── sale dates Ticketmaster lists for this date ──────────────────────────
  // A held date has no sale to describe.
  const held = eventLifecycleHeld(event);
  const presales = held ? [] : normalizePresaleWindows(event?.presales, now);
  const onsaleMs = Date.parse(trimmed(event?.public_onsale_at));
  const onsaleKnown = !held && Number.isFinite(onsaleMs) && onsaleMs - now <= ONSALE_MAX_HORIZON_DAYS * DAY_MS;
  const publicOnsale = onsaleKnown ? { at: trimmed(event.public_onsale_at), pending: publicOnsalePending(event, now) } : null;

  return { schedule, sameCity, sameCityTotal: sameCityAll.length, venueNeighbours, cityNeighbours, presales, publicOnsale };
}
