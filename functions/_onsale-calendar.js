import { onsaleCalendarGate } from "./_route-indexability.js";

// Shared on-sale calendar derivation for /on-sale, used by the HTML router,
// the sitemap and llms.txt so all three agree on what the page lists and
// whether it is indexable.
//
// The only fact this page adds is `public_onsale_at`: Ticketmaster's verbatim
// `sales.public.startDateTime`, carried on the reviewed event record by the
// sanctioned Ticketmaster discovery lane. Nothing is inferred. Presales are
// not tracked, so the page lists public on-sales only and says so.

const DAY_MS = 86400000;

// How far ahead the calendar lists, and how far back "just went on sale" looks.
export const ONSALE_LOOKAHEAD_DAYS = 60;
export const ONSALE_RECENT_DAYS = 7;

// A public on-sale further out than this is not a real schedule. Discovery
// uses far-future placeholders (a 9999-12-31 row exists) for "to be announced",
// and listing one would advertise a date Ticketmaster never set.
const ONSALE_MAX_HORIZON_DAYS = 365;

function trimmed(value) {
  return String(value || "").trim();
}

function localDayKey(at, timezone) {
  try {
    return new Intl.DateTimeFormat("en-CA", { year: "numeric", month: "2-digit", day: "2-digit", timeZone: timezone || "UTC" }).format(at);
  } catch (error) {
    return new Date(at).toISOString().slice(0, 10);
  }
}

function toEntry(event, onsaleMs) {
  const timezone = trimmed(event.timezone) || "UTC";
  return {
    id: trimmed(event.id),
    artistSlug: trimmed(event.artist_slug),
    artistName: trimmed(event.artist_name) || trimmed(event.artist_slug),
    city: trimmed(event.city),
    country: trimmed(event.country),
    venue: trimmed(event.venue),
    datetimeIso: trimmed(event.datetime_iso),
    timezone,
    onsaleAt: new Date(onsaleMs).toISOString(),
    onsaleMs,
    onsaleDay: localDayKey(onsaleMs, timezone)
  };
}

// Group entries by the on-sale day in each venue's local time, then by artist
// within a day, so a 21-date run going on sale together reads as one block.
function groupByDay(entries, dayOrder) {
  const days = new Map();
  for (const entry of entries) {
    if (!days.has(entry.onsaleDay)) days.set(entry.onsaleDay, new Map());
    const artists = days.get(entry.onsaleDay);
    if (!artists.has(entry.artistSlug)) {
      artists.set(entry.artistSlug, { artistSlug: entry.artistSlug, artistName: entry.artistName, shows: [] });
    }
    artists.get(entry.artistSlug).shows.push(entry);
  }
  const keys = [...days.keys()].sort();
  if (dayOrder === "desc") keys.reverse();
  return keys.map((day) => {
    const artists = [...days.get(day).values()];
    for (const artist of artists) {
      artist.shows.sort((a, b) => a.onsaleMs - b.onsaleMs || a.datetimeIso.localeCompare(b.datetimeIso));
    }
    artists.sort((a, b) => a.shows[0].onsaleMs - b.shows[0].onsaleMs || a.artistName.localeCompare(b.artistName));
    return { day, artists };
  });
}

/**
 * Derive the on-sale calendar from reviewed events.
 *
 * @param {any[]} events Raw events.json records.
 * @param {number} [now] Evaluation instant.
 * @returns {{ upcoming: object[], recent: object[], showCount: number, artistCount: number, indexable: boolean }}
 */
export function deriveOnsaleCalendar(events, now = Date.now()) {
  const upcoming = [];
  const recent = [];
  for (const event of Array.isArray(events) ? events : []) {
    if (!event || !trimmed(event.artist_slug)) continue;
    const onsaleMs = Date.parse(trimmed(event.public_onsale_at));
    if (!Number.isFinite(onsaleMs)) continue;
    // The show itself must still be ahead; an on-sale for a past date is noise.
    const showMs = Date.parse(trimmed(event.datetime_iso));
    if (!Number.isFinite(showMs) || showMs <= now) continue;
    if (onsaleMs - now > ONSALE_MAX_HORIZON_DAYS * DAY_MS) continue;
    if (onsaleMs > now && onsaleMs - now <= ONSALE_LOOKAHEAD_DAYS * DAY_MS) {
      upcoming.push(toEntry(event, onsaleMs));
    } else if (onsaleMs <= now && now - onsaleMs <= ONSALE_RECENT_DAYS * DAY_MS) {
      recent.push(toEntry(event, onsaleMs));
    }
  }
  const listed = [...upcoming, ...recent];
  const showCount = listed.length;
  const artistCount = new Set(listed.map((entry) => entry.artistSlug)).size;
  return {
    upcoming: groupByDay(upcoming, "asc"),
    recent: groupByDay(recent, "desc"),
    upcomingCount: upcoming.length,
    recentCount: recent.length,
    showCount,
    artistCount,
    artistSlugs: [...new Set(listed.map((entry) => entry.artistSlug))],
    // The day the page last moved with the clock: the newest on-sale that has
    // already opened. Null when nothing in the recent window has.
    lastOpenedDate: recent.length ? new Date(Math.max(...recent.map((entry) => entry.onsaleMs))).toISOString().slice(0, 10) : null,
    indexable: onsaleCalendarGate({ showCount, artistCount }).indexable
  };
}
