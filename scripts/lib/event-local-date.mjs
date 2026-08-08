// Shared venue-local date/instant resolution for provider sync scripts.
//
// Every event-link matcher (SeatGeek enrichment, SeatGeek verification, Vivid
// Seats, and the shared Impact marketplace lanes) has to answer the same two
// questions before it may match a provider listing to one of our events:
//
//   1. What UTC instant is this show? (used for ±tolerance instant matching)
//   2. What calendar date is this show *at the venue*? (used for slug/date
//      matching, provider date filters, and past-event exclusion)
//
// Those were previously implemented four times, with four slightly different
// answers — one silently fell back to the UTC date when the event carried no
// IANA timezone, which is wrong for any show whose venue-local evening lands on
// the next UTC day. This module is the single implementation.
//
// Resolution rules (deliberately conservative — a wrong local date matches the
// wrong night, which is exactly the failure mode the matching gates exist to
// prevent):
//
//   - An IANA timezone on the event (`timezone`, e.g. "America/New_York") is
//     always preferred. The instant is resolved first, then formatted in that
//     zone, so a UTC `Z` instant correctly rolls back to the previous local day
//     where it should.
//   - Failing that, an explicit numeric UTC offset in `datetime_iso`
//     ("2026-07-01T20:00:00+02:00") already states the local wall time. Its
//     `YYYY-MM-DD` prefix IS the venue-local calendar date — no zone database
//     needed, nothing inferred. This is a safe fallback, not a guess.
//   - A `Z` (UTC) datetime with no IANA timezone stays UNRESOLVED. UTC midnight
//     ±few hours is a different calendar day in most of the world, and there is
//     no way to recover the local date without knowing the venue's zone.
//   - Date-only values (time TBA), missing values, and malformed values stay
//     unresolved. Treating a date-only row as midnight would let an instant
//     comparison clear a valid evening listing.
//
// Nothing here infers a timezone from a city, country, or offset. An offset is
// used only for the calendar date it literally states.

const NUMERIC_OFFSET_RE = /([+-])(\d{2}):?(\d{2})$/;
const ZULU_RE = /Z$/i;
const HAS_TIME_RE = /T\d{2}:\d{2}/;
const DATE_PREFIX_RE = /^(\d{4})-(\d{2})-(\d{2})/;

/** Machine-readable reasons a local date could not be resolved. */
export const LOCAL_DATE_REASONS = Object.freeze({
  OK: "",
  MISSING_DATETIME: "missing_datetime",
  DATE_ONLY: "date_only",
  MALFORMED_DATETIME: "malformed_datetime",
  UTC_WITHOUT_TIMEZONE: "utc_without_timezone",
  NAIVE_WITHOUT_TIMEZONE: "naive_without_timezone",
  INVALID_TIMEZONE: "invalid_timezone"
});

/** How a resolved local date was derived. */
export const LOCAL_DATE_SOURCES = Object.freeze({
  IANA_TIMEZONE: "iana_timezone",
  NUMERIC_OFFSET: "numeric_offset"
});

function clean(value, max = 500) {
  return String(value ?? "").trim().slice(0, max);
}

/**
 * An event's IANA timezone, or "" when it carries none we can use.
 * A zone is only accepted in Area/Location form — the same check the provider
 * matchers already applied, so an abbreviation like "EST" never resolves.
 */
export function eventTimeZone(event) {
  const zone = clean(event?.timezone, 80);
  return zone.includes("/") ? zone : "";
}

/** UTC offset of an IANA zone at a given instant, in ms. */
function tzOffsetMs(timeZone, date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone,
    hourCycle: "h23",
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit"
  }).formatToParts(date);
  const lookup = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  const asUtc = Date.UTC(
    Number(lookup.year), Number(lookup.month) - 1, Number(lookup.day),
    Number(lookup.hour), Number(lookup.minute), Number(lookup.second)
  );
  return asUtc - date.getTime();
}

/**
 * Resolve an event's `datetime_iso` to a UTC instant in ms, or null when the
 * value is ambiguous.
 *
 * Unchanged semantics from the per-script copies this replaces: date-only
 * values are ambiguous, zoned values (Z or numeric offset) parse directly, and
 * a timezone-naive wall time is only interpreted through the event's own IANA
 * timezone.
 *
 * @param {any} event Raw events.json record (or anything with datetime_iso/timezone).
 * @returns {number|null}
 */
export function eventInstantMs(event) {
  const raw = clean(event?.datetime_iso || event?.dateTimeISO, 100);
  if (!raw) return null;
  if (!HAS_TIME_RE.test(raw)) return null;
  if (ZULU_RE.test(raw) || NUMERIC_OFFSET_RE.test(raw)) {
    const parsed = Date.parse(raw);
    return Number.isFinite(parsed) ? parsed : null;
  }
  const timeZone = eventTimeZone(event);
  if (!timeZone) return null;
  const naiveUtc = new Date(`${raw}Z`);
  if (Number.isNaN(naiveUtc.getTime())) return null;
  try {
    // Two-pass inversion: naive local wall time − zone offset ≈ instant.
    let instant = naiveUtc.getTime() - tzOffsetMs(timeZone, naiveUtc);
    instant = naiveUtc.getTime() - tzOffsetMs(timeZone, new Date(instant));
    return instant;
  } catch {
    return null;
  }
}

/**
 * Full resolution result for one event's venue-local calendar date.
 *
 * @param {any} event Raw events.json record.
 * @returns {{parts: {year:number,month:number,day:number}|null, iso: string, source: string, reason: string}}
 */
export function resolveEventLocalDate(event) {
  const unresolved = (reason) => ({ parts: null, iso: "", source: "", reason });
  const raw = clean(event?.datetime_iso || event?.dateTimeISO, 100);
  if (!raw) return unresolved(LOCAL_DATE_REASONS.MISSING_DATETIME);
  const datePrefix = raw.match(DATE_PREFIX_RE);
  if (!datePrefix) return unresolved(LOCAL_DATE_REASONS.MALFORMED_DATETIME);
  if (!HAS_TIME_RE.test(raw)) return unresolved(LOCAL_DATE_REASONS.DATE_ONLY);

  const timeZone = eventTimeZone(event);
  if (timeZone) {
    const instant = eventInstantMs(event);
    if (instant === null) return unresolved(LOCAL_DATE_REASONS.MALFORMED_DATETIME);
    try {
      const parts = new Intl.DateTimeFormat("en-CA", {
        timeZone, year: "numeric", month: "2-digit", day: "2-digit"
      }).formatToParts(new Date(instant));
      const lookup = Object.fromEntries(parts.map((part) => [part.type, part.value]));
      const year = Number(lookup.year);
      const month = Number(lookup.month);
      const day = Number(lookup.day);
      if (!Number.isFinite(year) || !Number.isFinite(month) || !Number.isFinite(day)) {
        return unresolved(LOCAL_DATE_REASONS.INVALID_TIMEZONE);
      }
      return {
        parts: { year, month, day },
        iso: `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
        source: LOCAL_DATE_SOURCES.IANA_TIMEZONE,
        reason: LOCAL_DATE_REASONS.OK
      };
    } catch {
      // An unusable zone string must not silently degrade to the UTC date.
      return unresolved(LOCAL_DATE_REASONS.INVALID_TIMEZONE);
    }
  }

  // No usable IANA zone. An explicit numeric offset still states the local wall
  // time outright, so its date prefix is the venue-local calendar date.
  if (NUMERIC_OFFSET_RE.test(raw)) {
    if (!Number.isFinite(Date.parse(raw))) return unresolved(LOCAL_DATE_REASONS.MALFORMED_DATETIME);
    const [, year, month, day] = datePrefix;
    return {
      parts: { year: Number(year), month: Number(month), day: Number(day) },
      iso: `${year}-${month}-${day}`,
      source: LOCAL_DATE_SOURCES.NUMERIC_OFFSET,
      reason: LOCAL_DATE_REASONS.OK
    };
  }

  if (ZULU_RE.test(raw)) return unresolved(LOCAL_DATE_REASONS.UTC_WITHOUT_TIMEZONE);
  return unresolved(LOCAL_DATE_REASONS.NAIVE_WITHOUT_TIMEZONE);
}

/**
 * Venue-local calendar date parts, or null when unresolved.
 * @returns {{year:number,month:number,day:number}|null}
 */
export function eventLocalDateParts(event) {
  return resolveEventLocalDate(event).parts;
}

/**
 * Venue-local calendar date as "YYYY-MM-DD", or "" when unresolved.
 * @returns {string}
 */
export function eventLocalDateIso(event) {
  return resolveEventLocalDate(event).iso;
}

/** Equality for the parts shape above; a null on either side is never equal. */
export function localDatePartsEqual(a, b) {
  if (!a || !b) return false;
  return a.year === b.year && a.month === b.month && a.day === b.day;
}

/** Shift a "YYYY-MM-DD" string by whole days, or "" when the input is unusable. */
export function shiftLocalDateIso(dateString, days) {
  const raw = clean(dateString, 10);
  if (!DATE_PREFIX_RE.test(raw)) return "";
  const date = new Date(`${raw}T00:00:00Z`);
  if (Number.isNaN(date.getTime())) return "";
  date.setUTCDate(date.getUTCDate() + days);
  return date.toISOString().slice(0, 10);
}

/**
 * Human-readable explanation for an unresolved local date, for audit logs and
 * the coverage report. Returns "" when the date resolved.
 */
export function localDateSkipReason(reason) {
  switch (reason) {
    case LOCAL_DATE_REASONS.MISSING_DATETIME:
      return "datetime_iso is missing — never guessed";
    case LOCAL_DATE_REASONS.DATE_ONLY:
      return "datetime_iso is date-only (time TBA) — never guessed";
    case LOCAL_DATE_REASONS.MALFORMED_DATETIME:
      return "datetime_iso is malformed — never guessed";
    case LOCAL_DATE_REASONS.UTC_WITHOUT_TIMEZONE:
      return "datetime_iso is a UTC instant with no IANA timezone — the venue-local date is unrecoverable and is never guessed";
    case LOCAL_DATE_REASONS.NAIVE_WITHOUT_TIMEZONE:
      return "datetime_iso has no offset and the event has no IANA timezone — never guessed";
    case LOCAL_DATE_REASONS.INVALID_TIMEZONE:
      return "the event timezone is not a usable IANA zone — never guessed";
    default:
      return "";
  }
}
