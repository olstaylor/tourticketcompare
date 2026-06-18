#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';

const DEFAULT_BASE = 'https://app.ticketmaster.com/discovery/v2';
const EVENTS_DIR = new URL('../public/data/events/', import.meta.url);
const ARTISTS_PATH = new URL('../public/data/artists.json', import.meta.url);

const argv = process.argv.slice(2);
const jsonFlagIndex = argv.indexOf('--json');
const jsonOutPath = jsonFlagIndex >= 0 ? (argv[jsonFlagIndex + 1] || null) : null;
const emitJson = jsonFlagIndex >= 0;
const requestDelayMs = Number.parseInt(process.env.TM_REQUEST_DELAY_MS || '300', 10);
const requestTimeoutMs = Number.parseInt(process.env.TM_REQUEST_TIMEOUT_MS || '15000', 10);

function clean(value) {
  return String(value || '').trim();
}

// The Ticketmaster Discovery API (`/discovery/v2/events/{id}`) is keyed by the
// Discovery event id (mixed-case alphanumeric, e.g. `vv1AaZkoVGkdF4iwr`,
// `Z7r9jZ1A706ep`). It does NOT resolve the consumer-website event code that
// appears in `ticketmaster.com/.../event/<id>` URLs — that code is a 16-char
// uppercase hex string (e.g. `09006474C856CC9E`) — nor the numeric ids used by
// international storefronts (`ticketmaster.es/.it`, e.g. `653666176`). Querying
// the Discovery API with those returns 404, which is NOT a sign the show is
// dead. Only treat an id as queryable when it is genuinely Discovery-format.
function isDiscoveryFormatId(value) {
  const id = clean(value);
  if (!id) return false;
  if (/^[0-9]+$/.test(id)) return false; // international numeric storefront id
  if (/^[0-9A-F]{16}$/.test(id)) return false; // consumer-website hex event code
  if (/\.html?$/i.test(id)) return false; // scraped URL slug
  return /^[A-Za-z0-9_-]{6,20}$/.test(id);
}

// Resolve the id to query the Discovery API with. Prefer the explicit, verified
// `ticketmaster_discovery_event_id` field; fall back to `ticketmaster_event_id`
// only when it is itself Discovery-format. Returns null when no usable Discovery
// id exists — those events are reported as "unresolvable", never "missing".
function discoveryIdFor(event) {
  const explicit =
    clean(event?.ticketmaster_discovery_event_id) ||
    clean(event?.provider_links?.ticketmaster?.discovery_event_id);
  if (explicit) return { id: explicit, source: 'discovery_event_id' };
  const legacy = clean(event?.ticketmaster_event_id);
  if (isDiscoveryFormatId(legacy)) return { id: legacy, source: 'ticketmaster_event_id' };
  return null;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function loadIndexedArtistSlugs() {
  const raw = await fs.readFile(ARTISTS_PATH, 'utf8');
  const artists = JSON.parse(raw);
  return artists
    .filter((a) => a?.indexing_status === 'indexable_with_substantial_content')
    .map((a) => a.slug);
}

async function loadArtistEvents(slug) {
  const file = new URL(`${slug}.json`, EVENTS_DIR);
  try {
    const raw = await fs.readFile(file, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    if (err?.code === 'ENOENT') return [];
    throw err;
  }
}

async function fetchEvent(apiKey, base, eventId) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), requestTimeoutMs);
  const url = `${base}/events/${encodeURIComponent(eventId)}.json?apikey=${encodeURIComponent(apiKey)}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: controller.signal,
      headers: { 'user-agent': 'TourTicketCompareAudit/1.0 (+https://tourticketcompare.com)' }
    });
    const status = response.status;
    if (status === 404 || status === 410) {
      return { status, exists: false, data: null };
    }
    if (!response.ok) {
      return { status, exists: null, error: `HTTP ${status}`, data: null };
    }
    const data = await response.json().catch(() => null);
    return { status, exists: true, data };
  } catch (error) {
    return {
      status: null,
      exists: null,
      error: error?.name === 'AbortError' ? `timeout after ${requestTimeoutMs}ms` : String(error?.message || error),
      data: null
    };
  } finally {
    clearTimeout(timeout);
  }
}

// Venue-local calendar date from a UTC-or-wall-clock `datetime_iso` plus the
// event's IANA timezone. `datetime_iso` is stored inconsistently (some events
// carry a trailing `Z`/UTC, others venue-local wall time); formatting in the
// event timezone yields the same venue-local date the Discovery API reports as
// `dates.start.localDate`, so the two are directly comparable.
function venueLocalDate(iso, tz) {
  const value = clean(iso);
  if (!value) return null;
  // A date-only value (no time component) is already the venue-local date;
  // timezone-shifting it would wrongly roll it back a day for US venues.
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  try {
    return new Intl.DateTimeFormat('en-CA', { timeZone: clean(tz) || 'UTC', year: 'numeric', month: '2-digit', day: '2-digit' }).format(d);
  } catch {
    return value.slice(0, 10);
  }
}

// Collapse case / punctuation / whitespace so cosmetic venue-name differences
// (e.g. "MERKUR SPIEL-ARENA" vs "Merkur Spiel Arena") are not reported as drift.
function normalizeVenue(name) {
  return clean(name).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
}

// Only these Discovery status codes signal a real problem a human must act on
// (suppress a CTA, correct a record). Routine onsale/offsale/announced churn —
// e.g. a sold-out show going `offsale` — is not a data error.
const ACTIONABLE_STATUSES = new Set(['cancelled', 'canceled', 'postponed', 'rescheduled']);

function compareLocal(localEvent, remote) {
  const diffs = [];
  if (!remote?.data) return diffs;

  const remoteLocalDate = clean(remote.data?.dates?.start?.localDate);
  // Prefer the event's own timezone; many records omit it, so fall back to the
  // venue timezone the Discovery API returns before comparing calendar dates.
  const tz =
    clean(localEvent?.timezone) ||
    clean(remote.data?.dates?.timezone) ||
    clean(remote.data?._embedded?.venues?.[0]?.timezone) ||
    'UTC';
  const localLocalDate = venueLocalDate(localEvent?.datetime_iso, tz);
  if (remoteLocalDate && localLocalDate && remoteLocalDate !== localLocalDate) {
    diffs.push({ field: 'datetime_iso', local: localLocalDate, remote: remoteLocalDate });
  }

  const remoteVenueRaw = clean(remote.data?._embedded?.venues?.[0]?.name);
  const localVenueRaw = clean(localEvent?.venue);
  if (remoteVenueRaw && localVenueRaw && normalizeVenue(remoteVenueRaw) !== normalizeVenue(localVenueRaw)) {
    diffs.push({ field: 'venue', local: localVenueRaw, remote: remoteVenueRaw });
  }

  const remoteStatus = clean(remote.data?.dates?.status?.code).toLowerCase();
  if (ACTIONABLE_STATUSES.has(remoteStatus)) {
    diffs.push({ field: 'status', local: clean(localEvent?.status), remote: remoteStatus });
  }
  return diffs;
}

async function main() {
  const apiKey = clean(process.env.TICKETMASTER_API_KEY);
  if (!apiKey) {
    console.error('ERROR: TICKETMASTER_API_KEY is not set.');
    process.exit(2);
  }
  const base = clean(process.env.TICKETMASTER_DISCOVERY_BASE_URL || DEFAULT_BASE).replace(/\/+$/, '');

  const slugs = await loadIndexedArtistSlugs();
  console.log(`Auditing TM events for ${slugs.length} indexed artists...`);

  const perArtist = [];
  let totalChecked = 0;
  let totalMissing = 0;
  let totalErrors = 0;
  let totalChanged = 0;

  let totalUnresolvable = 0;

  for (const slug of slugs) {
    const events = await loadArtistEvents(slug);
    const withId = events.filter((e) => clean(e?.ticketmaster_event_id));
    const missing = [];
    const errors = [];
    const changed = [];
    const unresolvable = [];

    for (const event of withId) {
      const resolved = discoveryIdFor(event);
      if (!resolved) {
        // No Discovery-format id available (website hex / international numeric /
        // URL slug). The Discovery API cannot confirm or deny this event, so we
        // must not report it as missing. Surface it separately for backfill.
        totalUnresolvable += 1;
        unresolvable.push({
          id: event.id,
          ticketmaster_event_id: clean(event.ticketmaster_event_id),
          city: event.city,
          datetime_iso: event.datetime_iso,
          reason: 'no Discovery API id (website/international code)'
        });
        continue;
      }
      const id = resolved.id;
      const result = await fetchEvent(apiKey, base, id);
      totalChecked += 1;
      if (result.exists === false) {
        totalMissing += 1;
        missing.push({ id: event.id, ticketmaster_event_id: clean(event.ticketmaster_event_id), discovery_event_id: id, city: event.city, datetime_iso: event.datetime_iso, status: result.status });
      } else if (result.exists === null) {
        totalErrors += 1;
        errors.push({ id: event.id, ticketmaster_event_id: clean(event.ticketmaster_event_id), discovery_event_id: id, error: result.error, status: result.status });
      } else {
        const diffs = compareLocal(event, result);
        if (diffs.length) {
          totalChanged += 1;
          changed.push({ id: event.id, ticketmaster_event_id: id, diffs });
        }
      }
      if (requestDelayMs > 0) await sleep(requestDelayMs);
    }

    perArtist.push({
      slug,
      events_checked: withId.length - unresolvable.length,
      events_unresolvable: unresolvable.length,
      events_without_tm_id: events.length - withId.length,
      missing,
      errors,
      changed,
      unresolvable
    });
    console.log(`  ${slug}: ${withId.length - unresolvable.length} checked, ${missing.length} missing, ${changed.length} changed, ${errors.length} errors, ${unresolvable.length} unresolvable`);
  }

  const summary = {
    checked_at: new Date().toISOString(),
    artists: perArtist,
    totals: {
      checked: totalChecked,
      missing: totalMissing,
      changed: totalChanged,
      errors: totalErrors,
      unresolvable: totalUnresolvable
    }
  };

  if (emitJson) {
    if (jsonOutPath) {
      await fs.mkdir(path.dirname(jsonOutPath), { recursive: true }).catch(() => {});
      await fs.writeFile(jsonOutPath, JSON.stringify(summary, null, 2));
      console.log(`JSON summary written to ${jsonOutPath}`);
    } else {
      console.log(JSON.stringify(summary, null, 2));
    }
  }
}

main().catch((err) => {
  console.error('audit-tm-events failed:', err);
  process.exit(1);
});
