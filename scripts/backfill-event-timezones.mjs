#!/usr/bin/env node
//
// backfill-event-timezones.mjs
//
// Fills a MISSING `timezone` on an existing events.json row from the exact
// Ticketmaster Discovery record for that row's own Discovery event id.
//
// Why this exists: every provider event matcher (SeatGeek, Vivid Seats, and the
// three Impact marketplace lanes) keys on the venue-local calendar date. A row
// whose stored instant is a bare UTC `Z` value and which carries no IANA
// timezone has no recoverable local date, so those lanes skip it forever and
// the show stays on one ticket link — or none. The nightly field-sync
// (`scripts/apply-tm-updates.mjs`) already fills a missing timezone, but only
// for events with zero review blockers of their own, so rows parked on a
// review-only Ticketmaster status never get one.
//
// Safety contract:
//   - DRY RUN BY DEFAULT. `--apply` is the only thing that writes.
//   - Writes exactly one field, `timezone`, and only when it is currently
//     absent. It never rewrites a stored zone, and never touches the datetime,
//     the Ticketmaster fields, verification_status, tour_name, provider links,
//     provenance, or any URL.
//   - The value must come from the Discovery record for THIS event's own
//     Discovery id, whose `id` is confirmed to match, and whose venue and city
//     are confirmed to match the stored row. Nothing is inferred from a city
//     name, a country, a UTC offset, or a neighbouring event.
//   - The candidate zone must be a real IANA zone AND must reproduce the
//     Discovery record's own stated local start time from the row's stored
//     instant. A zone that would change what the row means is reported as
//     ambiguous, never written.
//   - Missing API key, transient failures, and ambiguous records leave the row
//     untouched.
//
// Usage:
//   node scripts/backfill-event-timezones.mjs                 (dry-run report)
//   node scripts/backfill-event-timezones.mjs --apply         (write mode)
//   node scripts/backfill-event-timezones.mjs --artist <slug>
//   node scripts/backfill-event-timezones.mjs --self-test     (offline tests)
// Options: --limit N, --delay-ms N, --json

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { eventMatchesArtistFilter } from "./lib/artist-filter.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const EVENTS_PATH = path.join(REPO_ROOT, "public", "data", "events.json");
const EVENTS_PARTITIONS_DIR = path.join(REPO_ROOT, "public", "data", "events");
const DEFAULT_BASE = "https://app.ticketmaster.com/discovery/v2";
const DEFAULT_DELAY_MS = 250;
const REQUEST_TIMEOUT_MS = 20000;

// ─── Pure helpers (covered by --self-test) ──────────────────────────────────

function clean(value, max = 500) {
  return String(value ?? "").trim().slice(0, max);
}

function normalizeText(value) {
  return clean(value, 500)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** The Discovery event id this row can be looked up by, or "". */
export function discoveryEventId(event) {
  return clean(event?.ticketmaster_discovery_event_id, 120) ||
    clean(event?.provider_links?.ticketmaster?.discovery_event_id, 120);
}

/** Does this row already carry a usable IANA zone? */
function hasIanaTimezone(event) {
  return clean(event?.timezone, 80).includes("/");
}

/** Is this string a zone the runtime can actually resolve? */
export function isResolvableIanaZone(zone) {
  const value = clean(zone, 80);
  if (!value.includes("/")) return false;
  try {
    new Intl.DateTimeFormat("en-CA", { timeZone: value }).format(new Date(0));
    return true;
  } catch {
    return false;
  }
}

/** Wall-clock "YYYY-MM-DDTHH:MM" for an instant rendered in a zone. */
function wallClockIn(zone, instantMs) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: zone,
    hourCycle: "h23",
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit"
  }).formatToParts(new Date(instantMs));
  const lookup = Object.fromEntries(parts.map((part) => [part.type, part.value]));
  return `${lookup.year}-${lookup.month}-${lookup.day}T${lookup.hour}:${lookup.minute}`;
}

/**
 * The exact zone the Discovery record states, or "". Never inferred.
 *
 * Discovery puts the venue timezone in one of three places depending on the
 * market and the endpoint: `dates.timezone` on the event, `dates.start.timeZone`
 * on some international listings, and `_embedded.venues[0].timezone` on the
 * venue record — which is where it lives for the rows this backfill exists to
 * fix. The venue field is only read when the response embeds exactly one venue,
 * so the zone always belongs to this event's own venue.
 */
export function discoveryTimezone(data) {
  const dates = data?.dates || {};
  const venues = data?._embedded?.venues;
  const venueZone = Array.isArray(venues) && venues.length === 1 ? venues[0]?.timezone : "";
  for (const candidate of [dates.timezone, dates?.start?.timeZone, venueZone]) {
    const value = clean(candidate, 80);
    if (value.includes("/")) return value;
  }
  return "";
}

/**
 * Decide what to do for one event given its Discovery record.
 *
 * Pure, so the whole branch matrix is testable offline.
 *
 * @param {any} event Raw events.json row.
 * @param {any} data Discovery `/events/<id>` response body (or null).
 * @returns {{action: "write"|"skip", timezone: string, reason: string}}
 */
export function decideTimezone(event, data) {
  const skip = (reason) => ({ action: "skip", timezone: "", reason });
  if (hasIanaTimezone(event)) return skip("event already stores an IANA timezone — never rewritten");
  const localId = discoveryEventId(event);
  if (!localId) return skip("event has no Ticketmaster Discovery event id to look up");
  if (!data || typeof data !== "object") return skip("Discovery response contained no usable event object");
  const remoteId = clean(data.id, 120);
  if (!remoteId || remoteId.toLowerCase() !== localId.toLowerCase()) {
    return skip(`Discovery response id '${remoteId || "(missing)"}' does not match the stored Discovery id '${localId}'`);
  }

  const venues = data?._embedded?.venues;
  if (!Array.isArray(venues) || venues.length !== 1) {
    return skip(`Discovery response carried ${Array.isArray(venues) ? venues.length : 0} venue record(s); exactly 1 is required`);
  }
  const remoteVenue = clean(venues[0]?.name, 180);
  const remoteCity = clean(venues[0]?.city?.name, 120);
  if (!remoteVenue || normalizeText(remoteVenue) !== normalizeText(event?.venue)) {
    return skip(`venue mismatch: stored '${clean(event?.venue)}' vs Discovery '${remoteVenue || "(missing)"}'`);
  }
  if (!remoteCity || normalizeText(remoteCity) !== normalizeText(event?.city)) {
    return skip(`city mismatch: stored '${clean(event?.city)}' vs Discovery '${remoteCity || "(missing)"}'`);
  }

  const zone = discoveryTimezone(data);
  if (!zone) return skip("Discovery record states no IANA venue timezone — nothing to copy, and nothing is inferred");
  if (!isResolvableIanaZone(zone)) return skip(`Discovery timezone '${zone}' is not a resolvable IANA zone`);

  // Consistency gate: the row's stored instant, rendered in the candidate zone,
  // must reproduce the local start time Discovery states for the same event.
  // If it does not, the zone and the stored instant disagree about when this
  // show is, and writing the zone would silently change the row's meaning.
  const storedInstant = Date.parse(clean(event?.datetime_iso, 100));
  if (!Number.isFinite(storedInstant)) return skip("stored datetime_iso is not a parseable instant");
  const localDate = clean(data?.dates?.start?.localDate, 20);
  const localTime = clean(data?.dates?.start?.localTime, 20);
  if (!localDate) return skip("Discovery record states no local start date to cross-check the timezone against");
  const rendered = wallClockIn(zone, storedInstant);
  if (localTime) {
    const expected = `${localDate}T${localTime.slice(0, 5)}`;
    if (rendered !== expected) {
      return skip(`timezone '${zone}' renders the stored instant as ${rendered}, but Discovery states ${expected} — ambiguous, never guessed`);
    }
  } else if (rendered.slice(0, 10) !== localDate) {
    return skip(`timezone '${zone}' renders the stored instant on ${rendered.slice(0, 10)}, but Discovery states ${localDate} — ambiguous, never guessed`);
  }

  return { action: "write", timezone: zone, reason: `exact Discovery venue timezone for event ${remoteId}, consistent with its stated local start` };
}

/** Apply the decision to one row. Only `timezone` is ever set. */
export function applyDecision(event, decision) {
  if (decision.action !== "write" || !decision.timezone) return false;
  event.timezone = decision.timezone;
  return true;
}

/** Rows worth looking up: missing zone, has a Discovery id, matches the filter. */
export function selectEvents(events, options) {
  const selected = [];
  const skipped = [];
  for (const event of events) {
    if (!eventMatchesArtistFilter(event, options.artist)) continue;
    if (hasIanaTimezone(event)) continue;
    if (!discoveryEventId(event)) {
      skipped.push({ event, reason: "no Ticketmaster Discovery event id — cannot be looked up unambiguously" });
      continue;
    }
    selected.push(event);
  }
  return { selected: options.limit === null ? selected : selected.slice(0, options.limit), skipped };
}

// ─── I/O ────────────────────────────────────────────────────────────────────

async function fetchDiscoveryEvent(apiKey, base, eventId) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  const url = `${base}/events/${encodeURIComponent(eventId)}.json?apikey=${encodeURIComponent(apiKey)}`;
  try {
    const response = await fetch(url, {
      redirect: "follow",
      signal: controller.signal,
      headers: { "user-agent": "TourTicketCompareTimezoneBackfill/1.0 (+https://tourticketcompare.com)" }
    });
    if (!response.ok) return { ok: false, status: response.status, data: null };
    return { ok: true, status: response.status, data: await response.json().catch(() => null) };
  } catch (error) {
    return { ok: false, status: 0, data: null, error: clean(error?.message || error, 200) };
  } finally {
    clearTimeout(timeout);
  }
}

async function syncPartitions(events, changedIds) {
  const changedFiles = [];
  const bySlug = new Map();
  for (const event of events) {
    if (!changedIds.has(event.id)) continue;
    const slug = clean(event.artist_slug, 120);
    if (!slug) continue;
    if (!bySlug.has(slug)) bySlug.set(slug, new Map());
    bySlug.get(slug).set(event.id, event);
  }
  for (const [slug, updates] of bySlug) {
    const partitionPath = path.join(EVENTS_PARTITIONS_DIR, `${slug}.json`);
    let raw;
    try {
      raw = await fs.readFile(partitionPath, "utf8");
    } catch {
      continue;
    }
    const rows = JSON.parse(raw);
    if (!Array.isArray(rows)) continue;
    let changed = false;
    for (let i = 0; i < rows.length; i += 1) {
      const update = updates.get(rows[i]?.id);
      if (update) {
        rows[i] = update;
        changed = true;
      }
    }
    if (changed) {
      await fs.writeFile(partitionPath, `${JSON.stringify(rows, null, 2)}\n`);
      changedFiles.push(path.relative(REPO_ROOT, partitionPath));
    }
  }
  return changedFiles;
}

// ─── Self-test ──────────────────────────────────────────────────────────────

function selfTest() {
  const checks = [];
  const assert = (label, pass) => checks.push({ label, pass: !!pass });

  const event = {
    id: "e1",
    artist_slug: "olivia-rodrigo",
    artist_name: "Olivia Rodrigo",
    city: "Hartford",
    venue: "PeoplesBank Arena",
    datetime_iso: "2026-09-25T23:00:00Z",
    ticketmaster_discovery_event_id: "Z7r9jZ1A706ep"
  };
  const record = {
    id: "Z7r9jZ1A706ep",
    dates: { timezone: "America/New_York", start: { localDate: "2026-09-25", localTime: "19:00:00" } },
    _embedded: { venues: [{ name: "PeoplesBank Arena", city: { name: "Hartford" } }] }
  };

  const good = decideTimezone(event, record);
  assert("an exact, consistent Discovery record writes its timezone", good.action === "write" && good.timezone === "America/New_York");
  assert("only the timezone field is written", (() => {
    const row = { ...event };
    const before = JSON.stringify({ ...row, timezone: undefined });
    applyDecision(row, good);
    return row.timezone === "America/New_York" && JSON.stringify({ ...row, timezone: undefined }) === before;
  })());
  assert("a skip decision writes nothing", applyDecision({ ...event }, { action: "skip", timezone: "", reason: "x" }) === false);

  assert(
    "a stored timezone is never rewritten",
    decideTimezone({ ...event, timezone: "America/Toronto" }, { ...record, dates: { ...record.dates, timezone: "America/New_York" } }).action === "skip"
  );
  assert("a row without a Discovery id is skipped", decideTimezone({ ...event, ticketmaster_discovery_event_id: "", provider_links: {} }, record).action === "skip");
  assert("a mismatched response id is skipped", decideTimezone(event, { ...record, id: "SOMETHING-ELSE" }).action === "skip");
  assert("an id match is case-insensitive", decideTimezone(event, { ...record, id: "z7r9jz1a706ep" }).action === "write");
  assert("a null response is skipped", decideTimezone(event, null).action === "skip");
  assert(
    "a response with two venue records is skipped as ambiguous",
    decideTimezone(event, { ...record, _embedded: { venues: [record._embedded.venues[0], record._embedded.venues[0]] } }).action === "skip"
  );
  assert(
    "a venue mismatch is skipped",
    decideTimezone(event, { ...record, _embedded: { venues: [{ name: "Somewhere Else", city: { name: "Hartford" } }] } }).action === "skip"
  );
  assert(
    "a city mismatch is skipped",
    decideTimezone(event, { ...record, _embedded: { venues: [{ name: "PeoplesBank Arena", city: { name: "Boston" } }] } }).action === "skip"
  );
  assert(
    "a record with no timezone yields nothing — a zone is never inferred from the city",
    decideTimezone(event, { ...record, dates: { start: record.dates.start } }).action === "skip"
  );
  assert(
    "an abbreviation is not accepted as a timezone",
    decideTimezone(event, { ...record, dates: { ...record.dates, timezone: "EDT" } }).action === "skip"
  );
  assert(
    "a non-existent IANA zone is rejected",
    decideTimezone(event, { ...record, dates: { ...record.dates, timezone: "Nowhere/Fake" } }).action === "skip"
  );
  assert(
    "dates.start.timeZone is accepted when dates.timezone is absent",
    decideTimezone(event, { ...record, dates: { start: { ...record.dates.start, timeZone: "America/New_York" } } }).action === "write"
  );
  assert(
    "the embedded venue's own timezone is accepted when the event states none",
    decideTimezone(event, {
      ...record,
      dates: { start: record.dates.start },
      _embedded: { venues: [{ ...record._embedded.venues[0], timezone: "America/New_York" }] }
    }).action === "write"
  );
  assert(
    "an event-level timezone wins over the venue record",
    discoveryTimezone({
      dates: { timezone: "America/New_York" },
      _embedded: { venues: [{ timezone: "America/Chicago" }] }
    }) === "America/New_York"
  );
  assert(
    "a venue timezone is ignored when the response embeds more than one venue",
    discoveryTimezone({ dates: {}, _embedded: { venues: [{ timezone: "America/New_York" }, { timezone: "America/Chicago" }] } }) === ""
  );

  // The consistency gate is the one that stops a plausible-but-wrong zone.
  assert(
    "a zone that disagrees with the stated local start time is skipped",
    decideTimezone(event, { ...record, dates: { ...record.dates, timezone: "America/Los_Angeles" } }).action === "skip"
  );
  assert(
    "a zone one hour out is skipped",
    decideTimezone(event, { ...record, dates: { ...record.dates, timezone: "America/Chicago" } }).action === "skip"
  );
  assert(
    "with no localTime, agreeing on the local DATE is enough",
    decideTimezone(event, { ...record, dates: { timezone: "America/New_York", start: { localDate: "2026-09-25" } } }).action === "write"
  );
  assert(
    "with no localTime, a zone that lands on a different local date is skipped",
    decideTimezone(
      { ...event, datetime_iso: "2026-09-26T03:00:00Z" },
      { ...record, dates: { timezone: "America/New_York", start: { localDate: "2026-09-26" } } }
    ).action === "skip"
  );
  assert(
    "a record with no local start date at all is skipped",
    decideTimezone(event, { ...record, dates: { timezone: "America/New_York", start: {} } }).action === "skip"
  );
  assert(
    "an unparseable stored datetime is skipped",
    decideTimezone({ ...event, datetime_iso: "nonsense" }, record).action === "skip"
  );
  // 2026-11-01 is the US fall-back date, so 00:00Z on 2 November is 19:00 EST
  // on 1 November — the pre-transition offset would give 20:00 and must fail.
  assert(
    "a DST-boundary event cross-checks against the post-transition offset",
    decideTimezone(
      { ...event, datetime_iso: "2026-11-02T00:00:00Z" },
      { ...record, dates: { timezone: "America/New_York", start: { localDate: "2026-11-01", localTime: "19:00:00" } } }
    ).action === "write"
  );
  assert(
    "the same event with the pre-transition local time is skipped as ambiguous",
    decideTimezone(
      { ...event, datetime_iso: "2026-11-02T00:00:00Z" },
      { ...record, dates: { timezone: "America/New_York", start: { localDate: "2026-11-01", localTime: "20:00:00" } } }
    ).action === "skip"
  );

  // Selection
  const selection = selectEvents([
    { ...event, id: "s1" },
    { ...event, id: "s2", timezone: "America/New_York" },
    { ...event, id: "s3", ticketmaster_discovery_event_id: "", provider_links: {} },
    { ...event, id: "s4", artist_slug: "someone-else", artist_name: "Someone Else" }
  ], { artist: "", limit: null });
  const ids = selection.selected.map((row) => row.id);
  assert("a row missing a timezone is selected", ids.includes("s1"));
  assert("a row that already has one is not selected", !ids.includes("s2"));
  assert("a row with no Discovery id is reported, not selected", !ids.includes("s3") && selection.skipped.some((row) => row.event.id === "s3"));
  assert(
    "the artist filter is exact",
    selectEvents([{ ...event, id: "s1" }, { ...event, id: "s4", artist_slug: "someone-else", artist_name: "Someone Else" }], { artist: "olivia-rodrigo", limit: null })
      .selected.map((row) => row.id).join(",") === "s1"
  );
  assert("--limit caps the selection", selectEvents([{ ...event, id: "a" }, { ...event, id: "b" }], { artist: "", limit: 1 }).selected.length === 1);

  let failed = 0;
  for (const check of checks) {
    if (!check.pass) failed += 1;
    console.log(`${check.pass ? "PASS" : "FAIL"}  ${check.label}`);
  }
  console.log(`\n${checks.length - failed}/${checks.length} checks passed.`);
  return failed === 0 ? 0 : 1;
}

// ─── Main ───────────────────────────────────────────────────────────────────

function parseArgs(argv) {
  const options = { apply: false, artist: "", limit: null, delayMs: DEFAULT_DELAY_MS, json: false, selfTest: false, help: false };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = () => {
      const value = argv[i + 1];
      if (value === undefined || value.startsWith("--")) throw new Error(`${arg} requires a value`);
      i += 1;
      return value;
    };
    if (arg === "--apply") options.apply = true;
    else if (arg === "--artist") options.artist = clean(next(), 120);
    else if (arg === "--limit") options.limit = Math.max(1, Number.parseInt(next(), 10) || 1);
    else if (arg === "--delay-ms") options.delayMs = Math.max(0, Number.parseInt(next(), 10) || 0);
    else if (arg === "--json") options.json = true;
    else if (arg === "--self-test") options.selfTest = true;
    else if (arg === "--help" || arg === "-h") options.help = true;
    else throw new Error(`Unknown option: ${arg}`);
  }
  return options;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    console.log("See the header comment in scripts/backfill-event-timezones.mjs for usage.");
    return 0;
  }
  if (options.selfTest) return selfTest();

  const apiKey = clean(process.env.TICKETMASTER_API_KEY, 255);
  if (!apiKey) {
    console.error("TICKETMASTER_API_KEY is not set — nothing looked up, nothing written (safe no-op).");
    return 0;
  }
  const base = clean(process.env.TICKETMASTER_DISCOVERY_BASE_URL || DEFAULT_BASE, 300).replace(/\/+$/, "");

  const events = JSON.parse(await fs.readFile(EVENTS_PATH, "utf8"));
  if (!Array.isArray(events)) throw new Error("public/data/events.json must contain an array");

  const { selected, skipped } = selectEvents(events, options);
  const results = [];
  const changedIds = new Set();
  let apiCalls = 0;

  for (const event of selected) {
    const id = discoveryEventId(event);
    const response = await fetchDiscoveryEvent(apiKey, base, id);
    apiCalls += 1;
    let decision;
    if (!response.ok) {
      decision = { action: "skip", timezone: "", reason: `Discovery lookup failed (HTTP ${response.status || 0}${response.error ? `: ${response.error}` : ""}) — nothing written, retry later` };
    } else {
      decision = decideTimezone(event, response.data);
    }
    const applied = options.apply ? applyDecision(event, decision) : false;
    if (applied) changedIds.add(event.id);
    results.push({
      showId: event.id,
      artist: event.artist_slug,
      city: event.city,
      venue: event.venue,
      datetime_iso: event.datetime_iso,
      discovery_event_id: id,
      action: decision.action,
      timezone: decision.timezone,
      reason: decision.reason,
      applied
    });
    if (options.delayMs > 0) await new Promise((resolve) => setTimeout(resolve, options.delayMs));
  }

  let partitionFiles = [];
  if (options.apply && changedIds.size > 0) {
    await fs.writeFile(EVENTS_PATH, `${JSON.stringify(events, null, 2)}\n`);
    partitionFiles = await syncPartitions(events, changedIds);
  }

  const summary = {
    mode: options.apply ? "apply" : "dry-run",
    total_events: events.length,
    missing_timezone: selected.length + skipped.length,
    selected: selected.length,
    skipped_without_discovery_id: skipped.length,
    api_calls: apiCalls,
    would_write: results.filter((row) => row.action === "write").length,
    written: results.filter((row) => row.applied).length,
    skipped: results.filter((row) => row.action === "skip").length,
    partition_files_written: partitionFiles.length
  };

  if (options.json) {
    console.log(JSON.stringify({ summary, results, skipped: skipped.map((row) => ({ showId: row.event.id, reason: row.reason })) }, null, 2));
  } else {
    console.log(`Timezone backfill (${summary.mode}): ${summary.missing_timezone} event(s) missing a timezone, ${summary.selected} looked up, ${summary.would_write} resolvable, ${summary.written} written.`);
    if (summary.skipped_without_discovery_id) console.log(`${summary.skipped_without_discovery_id} row(s) have no Discovery event id and cannot be looked up unambiguously.`);
    for (const row of results) {
      console.log(`  ${row.showId} [${row.artist}] ${row.action}${row.applied ? " (applied)" : ""}${row.timezone ? ` ${row.timezone}` : ""} — ${row.reason}`);
    }
    if (summary.written) console.log(`\nWrote ${summary.written} timezone(s) and ${summary.partition_files_written} partition file(s). Run \`npm run events:sync\` to refresh the inline fallback, then re-run the provider syncs.`);
    else if (!options.apply && summary.would_write) console.log(`\nDry run — re-run with --apply to write ${summary.would_write} timezone(s).`);
  }
  return 0;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().then((code) => {
    process.exitCode = code;
  }).catch((error) => {
    console.error(`Error: ${clean(error?.message || error, 500)}`);
    process.exitCode = 1;
  });
}
