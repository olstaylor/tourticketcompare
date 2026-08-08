#!/usr/bin/env node
//
// Offline self-test for scripts/lib/event-local-date.mjs — the single
// venue-local date/instant resolver shared by every provider event matcher.
//
// The cases here are the ones that decide whether a provider listing is
// matched to the right night: midnight boundaries, positive and negative
// offsets, DST transition dates, malformed values, and the deliberate
// "UTC instant with no IANA timezone stays unresolved" rule.
//
// Usage: node scripts/event-local-date.test.mjs

import {
  LOCAL_DATE_REASONS,
  LOCAL_DATE_SOURCES,
  eventInstantMs,
  eventLocalDateIso,
  eventLocalDateParts,
  eventTimeZone,
  localDatePartsEqual,
  localDateSkipReason,
  resolveEventLocalDate,
  shiftLocalDateIso
} from "./lib/event-local-date.mjs";

const checks = [];
const assert = (label, pass) => checks.push({ label, pass: !!pass });
const iso = (event) => eventLocalDateIso(event);
const src = (event) => resolveEventLocalDate(event).source;
const why = (event) => resolveEventLocalDate(event).reason;

// ── IANA timezone is preferred ──────────────────────────────────────────────
assert(
  "IANA zone resolves a UTC instant to the venue-local date",
  iso({ datetime_iso: "2026-05-08T21:30:00Z", timezone: "America/Indiana/Indianapolis" }) === "2026-05-08"
);
assert(
  "IANA zone rolls a late-evening UTC instant back to the previous local day",
  iso({ datetime_iso: "2026-12-20T03:00:00Z", timezone: "America/Los_Angeles" }) === "2026-12-19"
);
assert(
  "IANA zone rolls an early-morning UTC instant forward to the next local day",
  iso({ datetime_iso: "2026-07-01T23:30:00Z", timezone: "Asia/Tokyo" }) === "2026-07-02"
);
assert(
  "naive wall time with an IANA zone stays on its own local date",
  iso({ datetime_iso: "2026-07-06T20:00:00", timezone: "America/New_York" }) === "2026-07-06"
);
assert(
  "IANA zone wins over a numeric offset that names a different local day",
  // 2026-07-02T00:30+02:00 is 2026-07-01T22:30Z, which is still 1 July in London.
  iso({ datetime_iso: "2026-07-02T00:30:00+02:00", timezone: "Europe/London" }) === "2026-07-01"
);
assert("IANA-resolved dates report their source", src({ datetime_iso: "2026-05-08T21:30:00Z", timezone: "Europe/London" }) === LOCAL_DATE_SOURCES.IANA_TIMEZONE);

// ── Midnight boundaries ─────────────────────────────────────────────────────
assert(
  "local midnight belongs to the day it starts",
  iso({ datetime_iso: "2026-03-01T00:00:00", timezone: "Europe/Berlin" }) === "2026-03-01"
);
assert(
  "one minute before local midnight stays on the earlier day",
  iso({ datetime_iso: "2026-02-28T23:59:00", timezone: "Europe/Berlin" }) === "2026-02-28"
);
assert(
  "UTC midnight is the previous day in a negative-offset zone",
  iso({ datetime_iso: "2026-03-01T00:00:00Z", timezone: "America/Chicago" }) === "2026-02-28"
);
assert(
  "UTC midnight is the same day in a positive-offset zone",
  iso({ datetime_iso: "2026-03-01T00:00:00Z", timezone: "Europe/Warsaw" }) === "2026-03-01"
);

// ── Explicit numeric offsets, no IANA zone ──────────────────────────────────
assert(
  "positive offset without a timezone uses its own date prefix",
  iso({ datetime_iso: "2026-07-01T20:00:00+02:00" }) === "2026-07-01"
);
assert(
  "negative offset without a timezone uses its own date prefix",
  iso({ datetime_iso: "2026-07-01T19:30:00-05:00" }) === "2026-07-01"
);
assert(
  "a late-evening positive-offset wall time is NOT rolled forward to the UTC day",
  // 2026-07-01T23:30+02:00 is 2026-07-01T21:30Z — same UTC day here, but the
  // rule under test is that we read the stated wall date, never re-derive it.
  iso({ datetime_iso: "2026-07-01T23:30:00+02:00" }) === "2026-07-01"
);
assert(
  "an after-midnight positive-offset wall time keeps its own (later) local date",
  // 2026-07-02T00:30+02:00 is 2026-07-01T22:30Z: the UTC date would be wrong.
  iso({ datetime_iso: "2026-07-02T00:30:00+02:00" }) === "2026-07-02"
);
assert(
  "an early-evening negative-offset wall time keeps its own (earlier) local date",
  // 2026-07-01T20:00-07:00 is 2026-07-02T03:00Z: the UTC date would be wrong.
  iso({ datetime_iso: "2026-07-01T20:00:00-07:00" }) === "2026-07-01"
);
assert("offset-resolved dates report their source", src({ datetime_iso: "2026-07-01T20:00:00+02:00" }) === LOCAL_DATE_SOURCES.NUMERIC_OFFSET);
assert(
  "compact +HHMM offset is accepted",
  iso({ datetime_iso: "2026-07-01T20:00:00+0200" }) === "2026-07-01"
);
assert(
  "an empty-string timezone falls through to the offset rather than failing",
  iso({ datetime_iso: "2026-07-01T20:00:00-04:00", timezone: "" }) === "2026-07-01"
);
assert(
  "a non-IANA timezone abbreviation falls through to the offset, never to UTC",
  iso({ datetime_iso: "2026-07-01T20:00:00-04:00", timezone: "EDT" }) === "2026-07-01"
);

// ── DST transition dates ────────────────────────────────────────────────────
assert(
  "US spring-forward evening resolves on the transition date",
  iso({ datetime_iso: "2026-03-08T20:00:00", timezone: "America/New_York" }) === "2026-03-08"
);
assert(
  "US spring-forward evening resolves from its UTC instant too",
  // 20:00 EDT on 8 Mar 2026 == 2026-03-09T00:00Z.
  iso({ datetime_iso: "2026-03-09T00:00:00Z", timezone: "America/New_York" }) === "2026-03-08"
);
assert(
  "US fall-back evening resolves on the transition date",
  iso({ datetime_iso: "2026-11-01T20:00:00", timezone: "America/New_York" }) === "2026-11-01"
);
assert(
  "EU spring-forward evening resolves on the transition date",
  iso({ datetime_iso: "2026-03-29T20:00:00", timezone: "Europe/London" }) === "2026-03-29"
);
assert(
  "EU fall-back evening resolves on the transition date",
  iso({ datetime_iso: "2026-10-25T20:00:00", timezone: "Europe/Berlin" }) === "2026-10-25"
);
assert(
  "a naive wall time inside the spring-forward gap still resolves to its own date",
  iso({ datetime_iso: "2026-03-08T02:30:00", timezone: "America/New_York" }) === "2026-03-08"
);
assert(
  "a naive wall time inside the fall-back repeat still resolves to its own date",
  iso({ datetime_iso: "2026-11-01T01:30:00", timezone: "America/New_York" }) === "2026-11-01"
);
assert(
  "a southern-hemisphere DST zone resolves",
  iso({ datetime_iso: "2026-10-04T20:00:00", timezone: "Australia/Sydney" }) === "2026-10-04"
);

// ── UTC without an IANA timezone must stay unresolved ───────────────────────
assert("UTC instant without a timezone is unresolved", eventLocalDateParts({ datetime_iso: "2026-05-08T21:30:00Z" }) === null);
assert("UTC instant without a timezone reports why", why({ datetime_iso: "2026-05-08T21:30:00Z" }) === LOCAL_DATE_REASONS.UTC_WITHOUT_TIMEZONE);
assert(
  "lowercase z is treated as UTC, not as a naive wall time",
  why({ datetime_iso: "2026-05-08T21:30:00z" }) === LOCAL_DATE_REASONS.UTC_WITHOUT_TIMEZONE
);
assert(
  "UTC instant with a non-IANA timezone stays unresolved rather than using the UTC date",
  eventLocalDateParts({ datetime_iso: "2026-05-08T21:30:00Z", timezone: "UTC" }) === null
);
assert(
  "naive wall time without any timezone is unresolved",
  why({ datetime_iso: "2026-05-08T21:30:00" }) === LOCAL_DATE_REASONS.NAIVE_WITHOUT_TIMEZONE
);

// ── Malformed and missing values ────────────────────────────────────────────
assert("missing datetime is unresolved", why({}) === LOCAL_DATE_REASONS.MISSING_DATETIME);
assert("empty datetime is unresolved", why({ datetime_iso: "   " }) === LOCAL_DATE_REASONS.MISSING_DATETIME);
assert("garbage datetime is unresolved", why({ datetime_iso: "not-a-date", timezone: "Europe/London" }) === LOCAL_DATE_REASONS.MALFORMED_DATETIME);
assert("date-only value is unresolved even with a timezone", why({ datetime_iso: "2026-07-06", timezone: "America/New_York" }) === LOCAL_DATE_REASONS.DATE_ONLY);
assert("date-only value without a timezone is unresolved", why({ datetime_iso: "2026-07-06" }) === LOCAL_DATE_REASONS.DATE_ONLY);
assert(
  "an impossible calendar time with a timezone is unresolved, not silently shifted",
  eventLocalDateParts({ datetime_iso: "2026-13-45T99:99:00", timezone: "Europe/London" }) === null
);
assert(
  "an unknown IANA-shaped zone is unresolved rather than falling back to UTC",
  eventLocalDateParts({ datetime_iso: "2026-05-08T21:30:00Z", timezone: "Nowhere/Fake" }) === null
);
assert("null event is unresolved", eventLocalDateParts(null) === null);
assert("every unresolved reason has a human explanation", [
  LOCAL_DATE_REASONS.MISSING_DATETIME,
  LOCAL_DATE_REASONS.DATE_ONLY,
  LOCAL_DATE_REASONS.MALFORMED_DATETIME,
  LOCAL_DATE_REASONS.UTC_WITHOUT_TIMEZONE,
  LOCAL_DATE_REASONS.NAIVE_WITHOUT_TIMEZONE,
  LOCAL_DATE_REASONS.INVALID_TIMEZONE
].every((reason) => localDateSkipReason(reason).length > 0));
assert("a resolved date has no skip reason", localDateSkipReason(LOCAL_DATE_REASONS.OK) === "");

// ── Instant resolution (unchanged contract) ─────────────────────────────────
assert("zoned datetime parses to its instant", eventInstantMs({ datetime_iso: "2026-12-21T03:00:00Z" }) === Date.parse("2026-12-21T03:00:00Z"));
assert("offset datetime parses to its instant", eventInstantMs({ datetime_iso: "2026-07-01T20:00:00+02:00" }) === Date.parse("2026-07-01T18:00:00Z"));
assert("naive datetime without a timezone has no instant", eventInstantMs({ datetime_iso: "2026-07-06T20:00:00" }) === null);
assert("date-only datetime has no instant even with a timezone", eventInstantMs({ datetime_iso: "2026-07-06", timezone: "America/New_York" }) === null);
assert(
  "naive datetime with an IANA timezone resolves to the venue-local instant",
  eventInstantMs({ datetime_iso: "2026-07-06T20:00:00", timezone: "America/New_York" }) === Date.parse("2026-07-07T00:00:00Z")
);
assert(
  "naive datetime resolves through the correct DST offset",
  eventInstantMs({ datetime_iso: "2026-01-06T20:00:00", timezone: "America/New_York" }) === Date.parse("2026-01-07T01:00:00Z")
);
assert("dateTimeISO alias is accepted", eventInstantMs({ dateTimeISO: "2026-12-21T03:00:00Z" }) === Date.parse("2026-12-21T03:00:00Z"));

// ── Small helpers ───────────────────────────────────────────────────────────
assert("timezone accessor requires Area/Location form", eventTimeZone({ timezone: "Europe/London" }) === "Europe/London" && eventTimeZone({ timezone: "GMT" }) === "");
assert("parts equality is exact", localDatePartsEqual({ year: 2026, month: 7, day: 9 }, { year: 2026, month: 7, day: 9 }));
assert("parts equality rejects a different day", !localDatePartsEqual({ year: 2026, month: 7, day: 9 }, { year: 2026, month: 7, day: 10 }));
assert("parts equality rejects null", !localDatePartsEqual(null, { year: 2026, month: 7, day: 9 }));
assert("date shift crosses a month boundary", shiftLocalDateIso("2026-07-31", 1) === "2026-08-01");
assert("date shift crosses a year boundary backwards", shiftLocalDateIso("2026-01-01", -1) === "2025-12-31");
assert("date shift rejects a malformed input", shiftLocalDateIso("nonsense", 1) === "");
assert("date shift rejects an empty input", shiftLocalDateIso("", 1) === "");

// ── Padding / formatting ────────────────────────────────────────────────────
assert("single-digit months and days are zero-padded", iso({ datetime_iso: "2026-01-05T20:00:00", timezone: "Europe/London" }) === "2026-01-05");
assert(
  "parts and iso agree",
  (() => {
    const resolved = resolveEventLocalDate({ datetime_iso: "2026-09-03T19:00:00-04:00" });
    return resolved.iso === "2026-09-03" && localDatePartsEqual(resolved.parts, { year: 2026, month: 9, day: 3 });
  })()
);

let failed = 0;
for (const check of checks) {
  if (!check.pass) failed += 1;
  console.log(`${check.pass ? "PASS" : "FAIL"}  ${check.label}`);
}
console.log(`\n${checks.length - failed}/${checks.length} checks passed.`);
process.exitCode = failed === 0 ? 0 : 1;
