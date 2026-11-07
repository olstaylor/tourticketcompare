#!/usr/bin/env node
//
// apply-tm-updates.mjs
//
// Nightly authoritative field-sync for already-tracked events.
//
// Scope (deliberately narrow — see SAFE_PUBLISHING_RULES.md "Discovery,
// Enrichment, and Rendering"):
//   - AUTO-APPLY, lossless, from the Ticketmaster Discovery API source of truth,
//     for events that ALREADY exist in events.json and carry a valid
//     Ticketmaster Discovery id (explicit field preferred; a legacy
//     ticketmaster_event_id is used only when it is Discovery-format):
//       * date / time  (datetime_iso, timezone)
//         A confirmed reschedule also keeps the previously verified date and
//         timezone (previous_start_date, previous_start_timezone) for schema
//         and the visible original-date line; first-seen dates have no history.
//       * venue / city / country
//       * official listing title (event_name, verbatim Discovery API `name` —
//         owner-approved 2026-07-07; NOT tour_name, which stays human-gated)
//       * canonical Ticketmaster URL (refreshed so the /event/<id> slug and the
//         out.js event-id match stay correct when a date moves)
//       * lifecycle: the verbatim Discovery `dates.status.code` when it is
//         cancelled/canceled, postponed or rescheduled, stored as
//         `ticketmaster_status_code` and removed when Ticketmaster reports the
//         event on sale again (owner-scoped 2026-09-26). A cancelled or
//         postponed status withholds every ticket link for the date on every
//         surface (eventLifecycleHeld in functions/_route-indexability.js).
//         The hold is recorded whenever the event's identity checks pass,
//         even if its date or venue data is ambiguous — withholding links is
//         the safe direction. Clearing it needs a fully unambiguous record.
//       * last_verified_at bump on touched events
//
// Explicitly NOT auto-applied (collected into a review report for a human /
// fast-track PR instead — these need judgement or have no safe local
// representation):
//       * brand-new shows               -> handled by the discovery/proposal PR flow
//       * deleted events (404 / 410)     -> human confirms removal
//       * whether a cancelled/postponed row is removed and tombstoned
//                                        -> human (the hold is automatic)
//       * offsale without a future public on-sale, and any status code not
//         listed above                   -> review-only; nothing is recorded
//       * tour_name                      -> verification-gated (issue #172)
//
// The script never invents data: every applied value comes from the official
// Ticketmaster Discovery API response for that exact Discovery event id.
//
// Usage:
//   node scripts/apply-tm-updates.mjs [--dry-run] [--json <report-path>]
//                                     [--events <events.json>]
//                                     [--artists <artists.json>]
//
// Requires TICKETMASTER_API_KEY in the environment. Without it the script exits
// 0 as a no-op (so the nightly workflow degrades gracefully).

import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { createSnapshotSweep, loadSnapshot, quotaHeaders, safeFetchError, reportSnapshotStats, snapshotFields } from './lib/tm-event-snapshot.mjs';
import { includePastFromEnv, skipInSweep, PAST_RECHECK_DAYS } from './lib/tm-sweep-window.mjs';
import { normalizePresaleWindows } from '../functions/_presales.js';
import { PROVIDER_LANES } from './lib/event-link-coverage.mjs';
import { eventLocalDate, urlDateConflicts } from './sync-impact-marketplace-events.mjs';
import { officialEventMetadata, organizerNames } from '../functions/_event-metadata.js';
import { validPreviousStartDate, previousStartDateFromEvent } from '../functions/_event-reschedule.js';
import { deriveEventDuplicateGroups, EVENT_DUPLICATE_CLASS } from '../functions/_event-indexability.js';

const DEFAULT_BASE = 'https://app.ticketmaster.com/discovery/v2';
const DEFAULT_EVENTS_PATH = new URL('../public/data/events.json', import.meta.url);
const DEFAULT_ARTISTS_PATH = new URL('../public/data/artists.json', import.meta.url);

const TICKETMASTER_HOSTS = new Set([
  'ticketmaster.com',
  'ticketmaster.ca',
  'ticketmaster.co.uk',
  'ticketmaster.es',
  'ticketmaster.de',
  'ticketmaster.nl',
  'ticketmaster.se',
  'ticketmaster.pl',
  'ticketmaster.be',
  'ticketmaster.it',
  'ticketmaster.com.au',
  'ticketmaster.ie',
  'ticketmaster.com.mx',
  'ticketmaster.co.nz',
  'ticketmaster.cz',
  'ticketmaster.no',
  'ticketmaster.fi',
  'ticketmaster.ch',
  'ticketmaster.at',
  'ticketmaster.dk',
  'ticketmaster.co.za',
  'ticketmaster.ae',
  'ticketmaster.com.br',
  'ticketmaster.sg',
  'ticketweb.com',
  'ticketweb.ca'
]);

const argv = process.argv.slice(2);
function arg(name) {
  const i = argv.indexOf(name);
  return i >= 0 ? argv[i + 1] : null;
}
const dryRun = argv.includes('--dry-run');
const jsonOutPath = arg('--json');
const snapshotPath = arg('--snapshot');
const eventsPath = arg('--events')
  ? new URL(`file://${path.resolve(arg('--events'))}`)
  : DEFAULT_EVENTS_PATH;
const artistsPath = arg('--artists')
  ? new URL(`file://${path.resolve(arg('--artists'))}`)
  : DEFAULT_ARTISTS_PATH;

function positiveIntFromEnv(name, fallback) {
  const parsed = Number.parseInt(process.env[name] ?? '', 10);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : fallback;
}

const requestDelayMs = Number.parseInt(process.env.TM_REQUEST_DELAY_MS || '300', 10);
// Hardened alongside the retry budget below, which reserves against it: a NaN
// timeout would poison every reservation the same way a NaN budget does.
const requestTimeoutMs = positiveIntFromEnv('TM_REQUEST_TIMEOUT_MS', 15000);

function clean(value) {
  return String(value ?? '').trim();
}

function isDiscoveryFormatId(value) {
  const id = clean(value);
  if (!id) return false;
  if (/^[0-9]+$/.test(id)) return false;
  if (/^[0-9A-F]{16}$/.test(id)) return false;
  if (/\.html?$/i.test(id)) return false;
  return /^[A-Za-z0-9_-]{6,20}$/.test(id);
}

function ticketmasterDiscoveryEventId(event) {
  const explicit =
    clean(event?.ticketmaster_discovery_event_id) ||
    clean(event?.provider_links?.ticketmaster?.discovery_event_id);
  if (isDiscoveryFormatId(explicit)) return explicit;
  const legacy = clean(event?.ticketmaster_event_id);
  return isDiscoveryFormatId(legacy) ? legacy : '';
}

function ticketmasterStorefrontEventId(event) {
  return clean(event?.ticketmaster_event_id);
}

// A throttle or origin outage is the origin not answering right now, not a
// verdict about any event. Same classification as scripts/lib/tm-event-snapshot.mjs.
export function isTransientFetchStatus(status) {
  return status === null || status === undefined || status === 429 || status >= 500;
}

// Commit only when something changed and every error is transient. Each update
// comes from its own successful response, so a failed fetch elsewhere cannot
// make it wrong; any other error still vetoes everything.
export function tmCommitSafe(updatedCount, errors) {
  return updatedCount > 0 && errors.every((e) => isTransientFetchStatus(e.status));
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// The Discovery API returns country names inconsistently across venues
// (e.g. "United States Of America" vs "United States", "United Kingdom" vs
// "Great Britain"). Collapse the known synonyms to one canonical form so an
// identical country is never mistaken for a change.
const COUNTRY_NORMALIZATIONS = new Map([
  ['united states of america', 'United States'],
  ['united states', 'United States'],
  ['usa', 'United States'],
  ['us', 'United States'],
  ['united kingdom', 'United Kingdom'],
  ['great britain', 'United Kingdom'],
  ['uk', 'United Kingdom'],
  ['gb', 'United Kingdom']
]);

// Collapse case / punctuation / whitespace so cosmetic venue-name differences
// ("MERKUR SPIEL-ARENA" vs "Merkur Spiel Arena") are not treated as a move.
function normalizeText(value) {
  return clean(value)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

// Venue-local wall-clock time (to minute precision) for a UTC instant rendered
// in an IANA timezone — used to compare an inconsistently-stored datetime_iso
// (some rows are UTC with `Z`, others venue-local wall time) against the API's
// canonical UTC value by actual instant, not by string representation.
function wallTimeInTz(utcIso, tz) {
  const d = new Date(utcIso);
  if (Number.isNaN(d.getTime())) return null;
  try {
    const p = new Intl.DateTimeFormat('en-CA', {
      timeZone: clean(tz) || 'UTC',
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', hour12: false
    }).formatToParts(d);
    const g = (t) => p.find((x) => x.type === t)?.value;
    return `${g('year')}-${g('month')}-${g('day')}T${g('hour')}:${g('minute')}`;
  } catch {
    return null;
  }
}

// True only when the event's start instant genuinely differs from the API's —
// not when it is merely a different representation of the same moment.
function datetimeGenuinelyChanged(localIso, remoteUtcIso, tz) {
  const local = clean(localIso);
  const remote = clean(remoteUtcIso);
  if (!local || !remote) return false;
  const remoteMs = Date.parse(remote);
  if (Number.isNaN(remoteMs)) return false;
  // Local carries an explicit offset/Z → compare absolute instants directly.
  if (/([zZ])$|[+-]\d{2}:?\d{2}$/.test(local)) {
    const localMs = Date.parse(local);
    return !Number.isNaN(localMs) && localMs !== remoteMs;
  }
  // Date-only local value → compare venue-local calendar dates.
  if (/^\d{4}-\d{2}-\d{2}$/.test(local)) {
    const wall = wallTimeInTz(remote, tz);
    return wall !== null && wall.slice(0, 10) !== local;
  }
  // Local is venue-local wall time (no offset) → compare to the remote instant
  // rendered in the venue timezone, to the minute.
  const wall = wallTimeInTz(remote, tz);
  return wall !== null && local.slice(0, 16) !== wall;
}

const SAFE_AUTO_STATUS_CODES = new Set(['onsale']);
// Discovery status codes recorded verbatim on the event as
// `ticketmaster_status_code`. Cancelled and postponed hold the event's ticket
// links everywhere; rescheduled does not (its new date comes from this same
// record). Offsale is deliberately absent: it also covers dates not yet on
// public sale and dates whose sale has simply closed, so it proves nothing
// about the show and stays review-only.
const LIFECYCLE_FIELD = 'ticketmaster_status_code';
const RECORDED_LIFECYCLE_CODES = new Set(['cancelled', 'canceled', 'postponed', 'rescheduled']);
const HOLD_LIFECYCLE_CODES = new Set(['cancelled', 'canceled', 'postponed']);

function normalizeCountryName(value) {
  const raw = clean(value);
  return COUNTRY_NORMALIZATIONS.get(raw.toLowerCase()) || raw;
}

function words(value) {
  return clean(value)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}

function meaningfulArtistTokens(name) {
  return words(name).filter((token) => token.length >= 3 && !['the', 'and', 'with'].includes(token));
}

function remoteTextForIdentity(data) {
  const parts = [data?.name];
  for (const attraction of data?._embedded?.attractions || []) {
    parts.push(attraction?.name);
  }
  return words(parts.join(' '));
}

function identityLooksSafe(event, data) {
  const artistTokens = meaningfulArtistTokens(event.artist_name);
  if (artistTokens.length === 0) return true;
  const remoteTokens = new Set(remoteTextForIdentity(data));
  return artistTokens.every((token) => remoteTokens.has(token));
}

function today() {
  return new Date().toISOString().slice(0, 10);
}

function hostAllowed(hostname) {
  const host = String(hostname || '').toLowerCase();
  return [...TICKETMASTER_HOSTS].some((allowed) => host === allowed || host.endsWith(`.${allowed}`));
}

// A refreshed canonical URL is only safe to write if it is an https
// ticketmaster.com host AND still contains the event id — the same invariants
// out.js and validate-events.py enforce. Anything else is left untouched.
function safeTicketmasterUrl(url, eventId) {
  const raw = clean(url);
  if (!raw) return null;
  let parsed;
  try {
    parsed = new URL(raw);
  } catch {
    return null;
  }
  if (parsed.protocol !== 'https:') return null;
  if (!hostAllowed(parsed.hostname)) return null;
  const id = clean(eventId).toLowerCase();
  if (id && !raw.toLowerCase().includes(id)) return null;
  return parsed.toString();
}

// Owner decision 2026-11-06: a needs_recheck row is upgraded to
// machine_high_confidence when this night's Discovery record for the same
// event proves what ingestion could not: the artist's registry-verified
// attraction is on it, its storefront link is the full canonical form for the
// same event id, and the date, time, venue and city are all present. The
// canonical forms are /<slug>/event/<id> (North America) and
// /event/<event-name-slug>/<numeric-id> (international storefronts; the shape
// validate-events.py already accepts). A short /event/<id> link stays flagged:
// those have 404'd in browsers. Discovery may hand back its link wrapped in an
// affiliate redirect; it is only read to compare the inner storefront link,
// never stored. No URL or other field is written by this rule.
export function canonicalStorefrontPath(url, eventId) {
  let parsed;
  try {
    parsed = new URL(clean(url));
  } catch {
    return null;
  }
  if (parsed.protocol !== 'https:' || !hostAllowed(parsed.hostname)) return null;
  const id = clean(eventId).toLowerCase();
  if (!id) return null;
  const segments = parsed.pathname.split('/').filter(Boolean);
  const at = segments.findIndex((segment) => segment.toLowerCase() === 'event');
  if (at < 0) return null;
  const northAmerican = at > 0 && segments.length === at + 2 && segments[at + 1].toLowerCase() === id;
  const international = at === 0 && segments.length === 3 && /^\d+$/.test(segments[2]) && segments[2].toLowerCase() === id;
  if (!northAmerican && !international) return null;
  return `${parsed.hostname.toLowerCase().replace(/^www\./, '')}/${segments.join('/').toLowerCase()}`;
}

function discoveryStorefrontUrl(url) {
  try {
    const parsed = new URL(clean(url));
    if (/(^|\.)evyy\.net$/i.test(parsed.hostname)) return clean(parsed.searchParams.get('u'));
    return parsed.toString();
  } catch {
    return '';
  }
}

export function recheckPromotion(event, data, attractionId) {
  if (clean(event?.verification_status) !== 'needs_recheck' || clean(event?.source_type) !== 'ticketmaster') return null;
  const wanted = clean(attractionId);
  if (!wanted || !(data?._embedded?.attractions || []).some((attraction) => clean(attraction?.id) === wanted)) return null;
  const stored = canonicalStorefrontPath(event.ticketmaster_url, event.ticketmaster_event_id);
  if (!stored || stored !== canonicalStorefrontPath(discoveryStorefrontUrl(data?.url), event.ticketmaster_event_id)) return null;
  if (!/T\d{2}:\d{2}/.test(clean(event.datetime_iso)) || !clean(data?.dates?.start?.dateTime)) return null;
  if (data?.dates?.start?.noSpecificTime === true || data?.dates?.start?.timeTBA === true || data?.dates?.start?.dateTBA === true) return null;
  if (!clean(event.venue) || !clean(event.city)) return null;
  const code = clean(data?.dates?.status?.code).toLowerCase();
  if (!['onsale', 'offsale', 'rescheduled'].includes(code)) return null;
  return { field: 'verification_status', from: 'needs_recheck', to: 'machine_high_confidence' };
}

async function loadAttractionIds() {
  const identities = await readJson(new URL('../data/provider-identities.json', import.meta.url));
  const map = new Map();
  for (const artist of identities?.artists || []) {
    if (artist?.review_status === 'verified' && clean(artist.ticketmaster_attraction_id)) map.set(clean(artist.slug), clean(artist.ticketmaster_attraction_id));
  }
  return map;
}

async function readJson(url) {
  const raw = await fs.readFile(url, 'utf8');
  return JSON.parse(raw);
}

async function loadIndexedArtistSlugs() {
  const artists = await readJson(artistsPath);
  return new Set(
    artists
      .filter((a) => a?.indexing_status === 'indexable_with_substantial_content')
      .map((a) => a.slug)
  );
}

// The events this sweep fetches: an indexed artist's event with a Discovery
// id, minus long-past events with no stored Ticketmaster status that are not
// due their rotating re-check today (scripts/lib/tm-sweep-window.mjs). A
// skipped event is left exactly as it is.
function selectSyncTargets(events, indexed, { now = Date.now(), includePast = false } = {}) {
  const targets = [];
  let skippedPast = 0;
  for (const event of events) {
    if (!indexed.has(clean(event?.artist_slug)) || !ticketmasterDiscoveryEventId(event)) continue;
    if (skipInSweep(event, now, { includePast })) {
      skippedPast += 1;
      continue;
    }
    targets.push(event);
  }
  return { targets, skippedPast };
}

// Ticketmaster throttles a full-roster sweep as a burst, and until now a 429
// became a hard per-event error on the first try. On 2026-09-18 a sweep that
// overlapped the daily audit turned 654 of 1363 events into errors, and because
// the commit gate vetoes on any error at all, the whole night published nothing
// while the run still reported success.
//
// A throttle is the origin declining to answer right now, not a verdict about
// the event, so it belongs on a retry path — the same contract the marketplace
// price lane adopted for 503s. 404/410 are never retried: those are real
// answers about a deleted show.
//
// The shared budget is what keeps this bounded. Retrying every event to the cap
// during a sustained outage would add over an hour to a 1363-event sweep and
// breach the job's `timeout-minutes`, turning a throttle into a lost run. One
// budget across the whole sweep absorbs a transient burst, then degrades to the
// old behaviour — errors, reported honestly — instead of grinding the job dead.
// These are env-tunable, so a typo must not quietly remove the bound they exist
// to enforce. `TM_MAX_ATTEMPTS=0` skipped the request loop entirely and returned
// null to a caller that dereferences it, and a non-numeric budget parsed to NaN,
// which made every `remaining < ms` comparison false and so granted every
// reservation — the job-cap protection silently gone. An unusable value falls
// back to the default rather than being trusted.
const TM_MAX_ATTEMPTS = positiveIntFromEnv('TM_MAX_ATTEMPTS', 3);
const TM_RETRY_BACKOFF_MS = positiveIntFromEnv('TM_RETRY_BACKOFF_MS', 1000);
const TM_RETRY_BUDGET_MS = positiveIntFromEnv('TM_RETRY_BUDGET_MS', 180000);

function isRetriableTmStatus(status) {
  return status === 429 || (status >= 500 && status <= 599);
}

// The allowance is on elapsed time, not on sleeps. A retry costs its backoff
// AND its request, and a request that times out costs requestTimeoutMs — so
// charging only the backoff would let ~60 timing-out events add half an hour of
// request time to the sweep while the budget still read as barely touched,
// breaching the job cap this exists to protect.
//
// Each retry therefore reserves its worst case up front (backoff + a full
// request timeout) and refunds whatever the request did not use. A fast refusal
// gives nearly all of it back, so a throttle burst still gets many retries; a
// stalled origin gives nothing back and the sweep stops retrying early. Either
// way total retry time is bounded by the budget.
function createRetryBudget(totalMs = TM_RETRY_BUDGET_MS) {
  let remaining = totalMs;
  return {
    get remaining() { return remaining; },
    reserve(ms) {
      if (ms <= 0 || remaining < ms) return false;
      remaining -= ms;
      return true;
    },
    refund(ms) {
      if (ms > 0) remaining += ms;
    }
  };
}

async function fetchEvent(apiKey, base, eventId, deps = {}) {
  const fetchImpl = deps.fetch || fetch;
  const wait = deps.sleep || sleep;
  const now = deps.now || (() => Date.now());
  const budget = deps.budget || null;
  const url = `${base}/events/${encodeURIComponent(eventId)}.json?apikey=${encodeURIComponent(apiKey)}`;
  let last = null;
  for (let attempt = 1; attempt <= TM_MAX_ATTEMPTS; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), requestTimeoutMs);
    const startedAt = now();
    try {
      const response = await fetchImpl(url, {
        method: 'GET',
        redirect: 'follow',
        signal: controller.signal,
        headers: { 'user-agent': 'TourTicketCompareSync/1.0 (+https://tourticketcompare.com)' }
      });
      deps.observeResponse?.(response);
      const quota = quotaHeaders(response.headers);
      const status = response.status;
      if (status === 404 || status === 410) return { status, exists: false, data: null, quota };
      if (response.ok) {
        const data = await response.json().catch(() => null);
        return { status, exists: true, data, quota };
      }
      last = { status, exists: null, error: `HTTP ${status}`, data: null, quota };
      // A deterministic refusal (401, 403, 400…) is a verdict, not a blip.
      if (!isRetriableTmStatus(status)) return last;
    } catch (error) {
      deps.observeResponse?.(null);
      last = {
        status: null,
        exists: null,
        error: safeFetchError(error, requestTimeoutMs),
        data: null
      };
    } finally {
      clearTimeout(timeout);
      // Hand back the slice of the reserved request timeout this attempt did
      // not spend. Only retries were reserved; the first attempt is free.
      if (budget && attempt > 1) budget.refund(requestTimeoutMs - (now() - startedAt));
    }
    if (attempt >= TM_MAX_ATTEMPTS) break;
    const backoff = TM_RETRY_BACKOFF_MS * attempt;
    // Hold the worst case one more retry can cost before committing to it.
    // Budget spent: stop retrying and report what the origin last said.
    if (budget && !budget.reserve(backoff + requestTimeoutMs)) break;
    await wait(backoff);
  }
  return last;
}

// Build the lossless field updates that would be written for one event from
// its remote Ticketmaster record. This function is intentionally side-effect
// free: callers must first prove there are no review-only blockers, then apply
// the returned changes.
// The exact IANA venue timezone this Discovery record states, or ''. Discovery
// carries it in one of three places depending on the market and the endpoint —
// `dates.timezone`, `dates.start.timeZone`, or the venue record's own
// `timezone` — and reading only the first left rows whose stored instant has no
// recoverable venue-local date, which every provider event matcher keys on. The
// venue field is read only when exactly one venue is embedded, so the zone
// always belongs to this event's own venue. Nothing is inferred from the city.
function discoveryVenueTimezone(data) {
  const venues = data?._embedded?.venues;
  const venueZone = Array.isArray(venues) && venues.length === 1 ? venues[0]?.timezone : '';
  for (const candidate of [data?.dates?.timezone, data?.dates?.start?.timeZone, venueZone]) {
    const value = clean(candidate);
    if (value.includes('/')) return value;
  }
  return '';
}

function computeIntendedUpdates(event, remote, now = Date.now()) {
  const changes = [];
  const data = remote?.data;
  if (!data) return changes;

  // Missing fields in older snapshots do not erase genuine recorded names.
  // Anonymous or performer/venue account labels cannot verify an organizer,
  // including when a newly verified venue change creates that ambiguity.
  const metadata = officialEventMetadata(data, event);
  if (!metadata.organizer_names && Array.isArray(event.organizer_names)) {
    const retained = organizerNames(event.organizer_names, [event.artist_name, event.venue, data?._embedded?.venues?.[0]?.name]);
    if (JSON.stringify(retained) !== JSON.stringify(event.organizer_names)) metadata.organizer_names = retained.length ? retained : null;
  }
  for (const [field, value] of Object.entries(metadata)) {
    // A cleared fact (null) on a row that never had it is not a change.
    if (value === null && (event[field] ?? null) === null) continue;
    if (JSON.stringify(event[field]) !== JSON.stringify(value)) changes.push({ field, from: event[field] ?? null, to: value });
  }

  // --- date / time -----------------------------------------------------------
  // Only a genuine instant move is a change; differing representations of the
  // same moment (venue-local wall time vs the API's UTC) are not.
  const remoteDateTime = clean(data?.dates?.start?.dateTime);
  const localDateTime = clean(event.datetime_iso);
  const tz = clean(event.timezone) || clean(data?.dates?.timezone);
  if (remoteDateTime && datetimeGenuinelyChanged(localDateTime, remoteDateTime, tz)) {
    changes.push({ field: 'datetime_iso', from: localDateTime, to: remoteDateTime });
  }

  // A moved start invalidates an old end unless this response supplies a new one.
  const qualifiedEnd = data?.dates?.end?.approximate === true || data?.dates?.end?.noSpecificTime === true;
  if (event.end_datetime_iso && (qualifiedEnd || (changes.some((change) => change.field === 'datetime_iso') && !officialEventMetadata(data, event).end_datetime_iso))) {
    changes.push({ field: 'end_datetime_iso', from: event.end_datetime_iso, to: null });
  }

  // Only fill a missing timezone; never rewrite a present one (avoids churn
  // when the API reports an equivalent zone for the same location).
  const remoteTz = discoveryVenueTimezone(data);
  if (remoteTz && !clean(event.timezone)) {
    changes.push({ field: 'timezone', from: clean(event.timezone), to: remoteTz });
  }

  // --- venue / city / country ------------------------------------------------
  const venue = data?._embedded?.venues?.[0] || null;
  const remoteVenue = clean(venue?.name);
  if (remoteVenue && normalizeText(remoteVenue) !== normalizeText(event.venue)) {
    changes.push({ field: 'venue', from: clean(event.venue), to: remoteVenue });
  }
  const remoteCity = clean(venue?.city?.name);
  if (remoteCity && normalizeText(remoteCity) !== normalizeText(event.city)) {
    changes.push({ field: 'city', from: clean(event.city), to: remoteCity });
  }
  const remoteCountry = normalizeCountryName(venue?.country?.name);
  if (remoteCountry && normalizeCountryName(event.country).toLowerCase() !== remoteCountry.toLowerCase()) {
    changes.push({ field: 'country', from: clean(event.country), to: remoteCountry });
  }

  // --- official listing title --------------------------------------------------
  // Verbatim Discovery API event name for this exact event id — provider-sourced
  // fact, same trust level as venue/date (owner-approved 2026-07-07). tour_name
  // is never touched here (verification-gated, #172). Cosmetic case/punctuation
  // differences do not count as a change.
  const remoteName = clean(data?.name);
  if (remoteName && normalizeText(remoteName) !== normalizeText(event.event_name)) {
    changes.push({ field: 'event_name', from: clean(event.event_name), to: remoteName });
  }

  // --- pending public on-sale (auto-ingest PR 5) -------------------------------
  // Only for a date ingested before its public sale (it carries
  // public_onsale_at): flip it to on-sale when this exact Discovery record says
  // so, or follow a moved on-sale time. No other status is ever written here —
  // cancelled/postponed stay human, and the 145 older `announced` rows (which
  // carry no public_onsale_at) are untouched.
  if (clean(event.public_onsale_at)) {
    const code = clean(data?.dates?.status?.code).toLowerCase();
    const remoteOnsale = clean(data?.sales?.public?.startDateTime);
    if (code === 'onsale') {
      changes.push({ field: 'status', from: clean(event.status), to: 'on-sale' });
      changes.push({ field: 'public_onsale_at', from: clean(event.public_onsale_at), to: null });
    } else if (code === 'offsale' && remoteOnsale && remoteOnsale !== clean(event.public_onsale_at)) {
      changes.push({ field: 'public_onsale_at', from: clean(event.public_onsale_at), to: remoteOnsale });
    }
  }

  // --- named presale windows ---------------------------------------------------
  // Verbatim `sales.presales[]` name/start/end for this exact event id (owner-
  // approved 2026-10-02, SAFE_PUBLISHING_RULES.md). Never a code, description
  // or link; windows that have ended are dropped, so the field only exists
  // while a presale is still ahead or open. A record with no presales list at
  // all leaves the stored field alone, rather than reading absence as "none".
  if (Array.isArray(data?.sales?.presales)) {
    const remotePresales = normalizePresaleWindows(data.sales.presales, now);
    const localPresales = Array.isArray(event.presales) ? event.presales : [];
    if (JSON.stringify(remotePresales) !== JSON.stringify(localPresales)) {
      changes.push({ field: 'presales', from: localPresales.length ? localPresales : null, to: remotePresales.length ? remotePresales : null });
    }
  } else if (Array.isArray(event.presales) && event.presales.length) {
    // Absence is not evidence, but a stored window that has since ended is no
    // longer true; drop only those.
    const stillLive = normalizePresaleWindows(event.presales, now);
    if (JSON.stringify(stillLive) !== JSON.stringify(event.presales)) {
      changes.push({ field: 'presales', from: event.presales, to: stillLive.length ? stillLive : null });
    }
  }

  // --- canonical URL refresh (keeps the out.js event-id match valid) ----------
  const refreshedUrl = safeTicketmasterUrl(data?.url, event.ticketmaster_event_id);
  if (refreshedUrl && refreshedUrl !== clean(event.ticketmaster_url)) {
    changes.push({ field: 'ticketmaster_url', from: clean(event.ticketmaster_url), to: refreshedUrl });
  }

  return changes;
}

function summarizeEvent(event, ticketmasterDiscoveryEventId, data = null) {
  return {
    id: event.id,
    ticketmaster_event_id: ticketmasterStorefrontEventId(event),
    ticketmaster_discovery_event_id: ticketmasterDiscoveryEventId,
    artist_slug: clean(event.artist_slug),
    local_event_name: clean(event.event_name),
    datetime_iso: clean(event.datetime_iso),
    ticketmaster_datetime_iso: clean(data?.dates?.start?.dateTime) || null,
    ticketmaster_status: clean(data?.dates?.status?.code).toLowerCase() || null
  };
}

function reviewItem(event, ticketmasterDiscoveryEventId, data, kind, detail, intendedChanges = [], recommendedAction = 'Review the Ticketmaster response and update local event data by PR only after human verification.') {
  return {
    ...summarizeEvent(event, ticketmasterDiscoveryEventId, data),
    kind,
    reason: kind,
    detail,
    intendedChanges,
    recommendedAction
  };
}

// A row ingested before its public sale stays `offsale` until that time; only
// then may its moved on-sale time be followed. Offsale with no valid future
// on-sale time, or on a row without public_onsale_at, stays review-only.
function pendingOnsaleStillOffsale(event, data, now = Date.now()) {
  if (!clean(event.public_onsale_at)) return false;
  if (clean(data?.dates?.status?.code).toLowerCase() !== 'offsale') return false;
  const at = Date.parse(clean(data?.sales?.public?.startDateTime));
  return Number.isFinite(at) && at > now;
}

function computeReviewBlockers(event, remote) {
  const data = remote?.data;
  const discoveryId = ticketmasterDiscoveryEventId(event);
  const blockers = [];
  if (!data || typeof data !== 'object') {
    blockers.push(reviewItem(
      event,
      discoveryId,
      data,
      'ambiguous_api_response',
      'Ticketmaster response did not contain a usable event object.',
      [],
      'Re-run after confirming the API response; do not change local data automatically.'
    ));
    return blockers;
  }

  const remoteId = clean(data.id);
  if (!remoteId || remoteId.toLowerCase() !== discoveryId.toLowerCase()) {
    blockers.push(reviewItem(
      event,
      discoveryId,
      data,
      'identity_mismatch',
      `Ticketmaster response id='${remoteId || '(missing)'}' did not match local ticketmaster_discovery_event_id='${discoveryId}'.`,
      [],
      'Confirm the Discovery event id in Ticketmaster and update local data by PR only if the id is still correct.'
    ));
  }

  const remoteStatus = clean(data?.dates?.status?.code).toLowerCase();
  if (!remoteStatus) {
    blockers.push(reviewItem(
      event,
      discoveryId,
      data,
      'unknown_status',
      'Ticketmaster response did not include a status code.',
      [],
      'Confirm the event status manually before any local mutation.'
    ));
  } else if (
    !SAFE_AUTO_STATUS_CODES.has(remoteStatus) &&
    !RECORDED_LIFECYCLE_CODES.has(remoteStatus) &&
    !pendingOnsaleStillOffsale(event, data)
  ) {
    const kind = ['rescheduled', 'postponed', 'cancelled', 'canceled', 'offsale', 'unknown'].includes(remoteStatus)
      ? 'status'
      : 'unknown_status';
    blockers.push(reviewItem(
      event,
      discoveryId,
      data,
      kind,
      `Ticketmaster status='${remoteStatus}' is review-only and has no safe automatic local mutation.`,
      [],
      'Confirm whether the local event should be retained, removed, or copy-adjusted via PR.'
    ));
  }

  if (!identityLooksSafe(event, data)) {
    blockers.push(reviewItem(
      event,
      discoveryId,
      data,
      'identity_mismatch',
      `Ticketmaster event name='${clean(data?.name) || '(missing)'}' does not clearly match local artist='${clean(event.artist_name)}'.`,
      [],
      'Confirm the Ticketmaster event is the same local event before syncing any fields.'
    ));
  }

  if (!clean(data?.dates?.start?.dateTime)) {
    blockers.push(reviewItem(
      event,
      discoveryId,
      data,
      'ambiguous_api_response',
      'Ticketmaster response did not include a clear ISO start date/time.',
      [],
      'Confirm date/time manually before any local mutation.'
    ));
  }

  const venues = data?._embedded?.venues;
  if (!Array.isArray(venues) || venues.length !== 1) {
    blockers.push(reviewItem(
      event,
      discoveryId,
      data,
      'ambiguous_api_response',
      `Ticketmaster response included ${Array.isArray(venues) ? venues.length : 0} venue record(s); expected exactly 1.`,
      [],
      'Confirm venue manually before any local mutation.'
    ));
  }

  return blockers;
}

// The lifecycle change this Discovery record calls for, or null. Records a
// recognised status verbatim (lower-cased); removes a stored one only when
// Ticketmaster says the event is on sale again. Any other code — offsale,
// empty, unrecognised — changes nothing.
function computeLifecycleChange(event, remote) {
  const data = remote?.data;
  if (!data || typeof data !== 'object') return null;
  const code = clean(data?.dates?.status?.code).toLowerCase();
  const local = clean(event?.[LIFECYCLE_FIELD]).toLowerCase();
  if (RECORDED_LIFECYCLE_CODES.has(code)) {
    return code === local ? null : { field: LIFECYCLE_FIELD, from: local || null, to: code };
  }
  if (code === 'onsale' && local) return { field: LIFECYCLE_FIELD, from: local, to: null };
  return null;
}

// One event's outcome, as a pure function of the local row and the Discovery
// response (exists === true). The rules, in order:
//   - Recording a hold (cancelled/postponed) needs only the identity checks to
//     pass: a hold must not wait for an unrelated ambiguity (a postponed show
//     often has no confirmed start time) to be resolved.
//   - Recording `rescheduled`, like clearing a status and every other field
//     change, needs a record with no review blockers at all. A rescheduled
//     date keeps its buttons and its card says "this is the date Ticketmaster
//     now lists", which is only true once the new date itself has applied.
//   - A recorded hold is also surfaced for review, because only a human
//     decides whether the row is removed and tombstoned.
export function planEventSync(event, remote, discoveryId, { attractionId = null } = {}) {
  const intendedChanges = computeIntendedUpdates(event, remote);
  const blockers = attachIntendedChanges(computeReviewBlockers(event, remote), intendedChanges);
  const lifecycleChange = computeLifecycleChange(event, remote);
  const identitySafe = !blockers.some((item) => item.kind === 'identity_mismatch');
  const applied = [];
  const recordsHold = Boolean(lifecycleChange) && HOLD_LIFECYCLE_CODES.has(lifecycleChange.to);
  if (lifecycleChange && (recordsHold ? identitySafe : blockers.length === 0)) {
    applied.push(lifecycleChange);
  }
  if (!blockers.length) {
    applied.push(...intendedChanges, ...wrongNightLinkChanges(event, intendedChanges));
    const promotion = lifecycleChange && HOLD_LIFECYCLE_CODES.has(lifecycleChange.to) ? null : recheckPromotion(event, remote?.data, attractionId);
    if (promotion) applied.push(promotion);
    // Keep the verified date we previously published when Discovery confirms
    // a reschedule. A first-seen rescheduled record has no known previous date.
    // Repeated syncs preserve the original date; cosmetic UTC/local changes
    // do not reach intendedChanges and therefore cannot manufacture history.
    if (clean(remote?.data?.dates?.status?.code).toLowerCase() === 'rescheduled'
      && intendedChanges.some((change) => change.field === 'datetime_iso')
      && !validPreviousStartDate(event.previous_start_date)
      && event.source_type === 'ticketmaster'
      && ['human_verified', 'machine_high_confidence'].includes(event.verification_status)) {
      const previous = previousStartDateFromEvent(event);
      if (previous) {
        applied.push({ field: 'previous_start_date', from: event.previous_start_date || null, to: previous });
        if (clean(event.timezone)) applied.push({ field: 'previous_start_timezone', from: event.previous_start_timezone || null, to: clean(event.timezone) });
      }
    }
  }

  const reviewItems = [...blockers];
  const heldCode = applied.some((change) => change.field === LIFECYCLE_FIELD)
    ? clean(applied.find((change) => change.field === LIFECYCLE_FIELD).to)
    : clean(event?.[LIFECYCLE_FIELD]).toLowerCase();
  if (HOLD_LIFECYCLE_CODES.has(heldCode)) {
    reviewItems.push(reviewItem(
      event,
      discoveryId,
      remote?.data,
      'status',
      `Ticketmaster status='${heldCode}' is recorded on the event, so every ticket link for it is withheld on every page and in /api/out.`,
      [],
      'Decide whether to remove the row (and add it to data/deleted-events.json with its id) by PR.'
    ));
  }
  return {
    applied,
    reviewItems,
    blocked: blockers.length > 0 && intendedChanges.length > 0,
    // A hold recorded past other blockers is not a verified record.
    stampVerified: applied.length > 0 && blockers.length === 0
  };
}

// Evaluate the complete proposed batch before touching the source rows. This
// permits clean date swaps while withholding new duplicate/ambiguous groups.
// Restoring one row can expose another collision, so repeat until no further
// shape-changing update needs withholding. Holds remain safe to record.
export function withholdDuplicateSyncPlans(events, planned) {
  const unresolved = new Set([
    EVENT_DUPLICATE_CLASS.SAME_PERFORMANCE,
    EVENT_DUPLICATE_CLASS.AMBIGUOUS,
    EVENT_DUPLICATE_CLASS.SHARED_PROVIDER_LISTING
  ]);
  const signature = (group) => `${group.kind}:${group.key}:${[...group.ids].sort().join(',')}`;
  const existing = new Set(deriveEventDuplicateGroups(events)
    .filter((group) => unresolved.has(group.classification)).map(signature));
  const shapeFields = new Set(['datetime_iso', 'timezone', 'venue', 'city', 'country', 'event_name']);
  const records = planned.map((candidate) => ({ ...candidate, plan: { ...candidate.plan } }));
  const byId = new Map(records.map((candidate) => [candidate.event.id, candidate]));
  for (;;) {
    const projected = events.map((event) => {
      const changes = byId.get(event.id)?.plan.applied || [];
      if (!changes.length) return event;
      const copy = structuredClone(event);
      applyChanges(copy, changes);
      return copy;
    });
    const collisions = deriveEventDuplicateGroups(projected)
      .filter((group) => unresolved.has(group.classification) && !existing.has(signature(group)));
    const blocked = new Map();
    for (const group of collisions) {
      for (const id of group.ids) {
        const candidate = byId.get(id);
        if (!candidate?.plan.applied.some((change) => shapeFields.has(change.field))) continue;
        if (!blocked.has(id)) blocked.set(id, new Set());
        for (const peerId of group.ids) if (peerId !== id) blocked.get(id).add(peerId);
      }
    }
    if (!blocked.size) return records;
    for (const [id, peers] of blocked) {
      const candidate = byId.get(id);
      const keepHold = (change) => change.field === LIFECYCLE_FIELD && HOLD_LIFECYCLE_CODES.has(change.to);
      const withheld = candidate.plan.applied.filter((change) => !keepHold(change));
      candidate.plan = {
        ...candidate.plan,
        applied: candidate.plan.applied.filter(keepHold),
        blocked: true,
        stampVerified: false,
        reviewItems: [...candidate.plan.reviewItems, reviewItem(
          candidate.event, candidate.discoveryId, candidate.remote.data, 'duplicate_performance',
          `The proposed update creates a duplicate or ambiguous performance with: ${[...peers].sort().join(', ')}.`,
          withheld,
          'Review the conflicting records together by PR; retain the canonical identity and verified links, and tombstone any removed duplicate. Do not change frozen indexing cohort keys.'
        )]
      };
    }
  }
}

// A date move (a reschedule) leaves resale links pointing at listings whose own
// URL names the old night. Those are withdrawn — the field emptied and the link
// unverified — in the same update, so no button sends a buyer to the wrong night
// and the provider sync lanes look the date up again. A link whose URL names no
// date, or the new one, is kept. Ticketmaster's own link follows its record.
export function wrongNightLinkChanges(event, changes) {
  const dateChange = changes.find((change) => change.field === 'datetime_iso');
  // A prior sync may already have recorded the reschedule while leaving a
  // provider URL its old date parser could not read. Reconcile those links on
  // later identity-safe syncs too, without needing another date move.
  if (!dateChange && clean(event?.ticketmaster_status_code).toLowerCase() !== 'rescheduled') return [];
  const tzChange = changes.find((change) => change.field === 'timezone');
  const moved = { ...event, datetime_iso: dateChange ? dateChange.to : event.datetime_iso, timezone: tzChange ? tzChange.to : event.timezone };
  const newDate = eventLocalDate(moved);
  if (!newDate) return [];
  const out = [];
  for (const lane of PROVIDER_LANES) {
    if (lane.slug === 'ticketmaster') continue;
    const link = event.provider_links?.[lane.slug];
    const url = clean(link?.url) || clean(event[lane.urlField]);
    if (!url || !urlDateConflicts(url, newDate)) continue;
    out.push({ field: `provider_link:${lane.slug}`, from: url, to: null, urlField: lane.urlField });
  }
  return out;
}

function attachIntendedChanges(reviewItems, intendedChanges) {
  if (!intendedChanges.length) return reviewItems;
  return reviewItems.map((item) => ({ ...item, intendedChanges }));
}

function applyChanges(event, changes) {
  for (const change of changes) {
    if (change.field.startsWith('provider_link:')) {
      const lane = change.field.slice('provider_link:'.length);
      event[change.urlField] = '';
      if (!event.provider_links || typeof event.provider_links !== 'object') event.provider_links = {};
      event.provider_links[lane] = { event_id: null, url: null, verified: false, last_verified_at: null, availability_status: 'not_checked' };
      continue;
    }
    if (change.field === 'ticketmaster_url') {
      event.ticketmaster_url = change.to;
      event.source_url = change.to;
      if (event.provider_links?.ticketmaster && typeof event.provider_links.ticketmaster === 'object') {
        event.provider_links.ticketmaster.url = change.to;
      }
      continue;
    }
    if (change.to === null) {
      delete event[change.field];
      continue;
    }
    event[change.field] = change.to;
  }
}

function stampVerified(event) {
  const d = today();
  event.last_verified_at = d;
  const tm = event.provider_links?.ticketmaster;
  if (tm && typeof tm === 'object' && tm.verified === true && clean(tm.url)) {
    tm.last_verified_at = d;
  }
}

// Offline regression test for the representation-aware comparison logic, so a
// future edit cannot silently reintroduce cosmetic diff churn or query the
// Discovery API with storefront-only event identifiers.
async function runSelfTest() {
  const checks = [];
  const assert = (label, pass) => checks.push({ label, pass: !!pass });
  const ev = (o) => ({ datetime_iso: '', timezone: '', venue: '', city: '', country: '', ticketmaster_event_id: 'X', ticketmaster_url: '', ...o });
  const remote = (o) => ({ data: { id: 'X', dates: { start: {}, timezone: '' }, _embedded: { venues: [{ name: '', city: { name: '' }, country: { name: '' } }] }, ...o } });
  const fieldsOf = (e, r) => computeIntendedUpdates(e, r).map((c) => c.field);

  {
    // needs_recheck promotion (owner decision 2026-11-06).
    const intlUrl = 'https://www.ticketmaster.se/event/u2-the-greatest-show-on-earth-world-tour-tickets/1852040169?language=en-us';
    const row = (o = {}) => ({ id: 'tm-u2-x', artist_slug: 'u2', artist_name: 'U2', source_type: 'ticketmaster', verification_status: 'needs_recheck',
      ticketmaster_discovery_event_id: 'Z698xZq2Z16v-3vZAt', ticketmaster_event_id: '1852040169', ticketmaster_url: intlUrl,
      datetime_iso: '2027-04-26T17:30:00Z', timezone: 'Europe/Stockholm', venue: 'Strawberry Arena', city: 'Stockholm', country: 'Sweden', event_name: 'U2', ...o });
    const wrapped = `https://ticketmaster.evyy.net/c/1/2/3?u=${encodeURIComponent(intlUrl)}&utm_medium=affiliate`;
    const resp = (o = {}) => ({ data: { id: 'Z698xZq2Z16v-3vZAt', name: 'U2', url: wrapped,
      dates: { status: { code: 'onsale' }, start: { dateTime: '2027-04-26T17:30:00Z' }, timezone: 'Europe/Stockholm' },
      _embedded: { venues: [{ name: 'Strawberry Arena', city: { name: 'Stockholm' }, country: { name: 'Sweden' } }], attractions: [{ id: 'K8vZ91712W7', name: 'U2' }, { id: 'K1', name: 'Wolf Alice' }] }, ...o } });
    const promoted = (e, r, attractionId = 'K8vZ91712W7') => planEventSync(e, r, 'Z698xZq2Z16v-3vZAt', { attractionId }).applied.find((c) => c.field === 'verification_status');
    const p0 = planEventSync(row(), resp(), 'Z698xZq2Z16v-3vZAt', { attractionId: 'K8vZ91712W7' });
    assert('a confirmed international storefront link upgrades needs_recheck', p0.applied.some((c) => c.field === 'verification_status' && c.to === 'machine_high_confidence'));
    assert('the upgrade writes no URL, least of all an affiliate one', !p0.applied.some((c) => c.field === 'ticketmaster_url') && !JSON.stringify(p0.applied).includes('evyy'));
    const na = 'https://www.ticketmaster.com/olivia-rodrigo-unwind-tour-boston-ma-07-01-2026/event/01006297A1B2C3D4';
    assert('a confirmed North American long-form link upgrades', promoted(row({ ticketmaster_url: na, ticketmaster_event_id: '01006297A1B2C3D4' }), resp({ url: na })));
    assert('a short /event/<id> link stays flagged', !promoted(row({ ticketmaster_url: 'https://www.ticketmaster.com/event/01006297A1B2C3D4', ticketmaster_event_id: '01006297A1B2C3D4' }), resp({ url: 'https://www.ticketmaster.com/event/01006297A1B2C3D4' })));
    assert('no verified attraction on the record: stays flagged', !promoted(row(), resp(), 'K-other'));
    assert('no registry attraction id: stays flagged', !promoted(row(), resp(), null));
    assert('a snapshot without attraction ids: stays flagged', !promoted(row(), resp({ _embedded: { venues: [{ name: 'Strawberry Arena', city: { name: 'Stockholm' }, country: { name: 'Sweden' } }], attractions: [{ name: 'U2' }] } })));
    assert('Discovery naming a different storefront event: stays flagged', !promoted(row(), resp({ url: intlUrl.replace('1852040169', '1656128289') })));
    assert('a stored id that is not in the link: stays flagged', !promoted(row({ ticketmaster_event_id: '999' }), resp()));
    assert('a date-only row: stays flagged', !promoted(row({ datetime_iso: '2027-04-26' }), resp()));
    assert('a time-TBA record: stays flagged', !promoted(row(), resp({ dates: { status: { code: 'onsale' }, start: { dateTime: '2027-04-26T17:30:00Z', noSpecificTime: true }, timezone: 'Europe/Stockholm' } })));
    for (const flag of ['timeTBA', 'noSpecificTime', 'dateTBA']) {
      const raw = resp({ dates: { status: { code: 'onsale' }, start: { dateTime: '2027-04-26T17:30:00Z', [flag]: true }, timezone: 'Europe/Stockholm' } });
      assert(`a ${flag} record stays flagged after the shared snapshot projection`, !promoted(row(), { data: snapshotFields(raw.data) }));
    }
    assert('a projected confirmed record still upgrades', promoted(row(), { data: snapshotFields(resp().data) }));
    assert('a postponed record: stays flagged', !promoted(row(), resp({ dates: { status: { code: 'postponed' }, start: { dateTime: '2027-04-26T17:30:00Z' }, timezone: 'Europe/Stockholm' } })));
    assert('a non-Ticketmaster host: stays flagged', !promoted(row({ ticketmaster_url: intlUrl.replace('ticketmaster.se', 'example.se') }), resp({ url: intlUrl.replace('ticketmaster.se', 'example.se') })));
    assert('an identity mismatch blocks the upgrade', !promoted(row({ artist_name: 'Somebody Else' }), resp()));
    assert('an already-confident row is untouched', !promoted(row({ verification_status: 'machine_high_confidence' }), resp()));
    assert('a human-verified row is untouched', !promoted(row({ verification_status: 'human_verified' }), resp()));
    assert('a non-Ticketmaster source is untouched', !promoted(row({ source_type: 'manual' }), resp()));
  }

  assert('a throttled fetch alone does not veto other events\' updates', tmCommitSafe(2, [{ status: 429 }, { status: 503 }, { status: null }]));
  assert('a 401/403 error still vetoes the commit', !tmCommitSafe(2, [{ status: 429 }, { status: 403 }]));
  assert('no updates means nothing to commit even with only throttles', !tmCommitSafe(0, [{ status: 429 }]));
  assert('a clean run with updates commits', tmCommitSafe(1, []));

  assert('a newly qualified end clears an old exact end', computeIntendedUpdates(ev({ datetime_iso: '2026-10-01T18:00:00Z', end_datetime_iso: '2026-10-01T21:00:00Z' }), remote({ dates: { start: { dateTime: '2026-10-01T18:00:00Z' }, end: { dateTime: '2026-10-01T21:00:00Z', approximate: true, noSpecificTime: false } } })).some((c) => c.field === 'end_datetime_iso' && c.to === null));

  assert('ambiguous stored names are cleared without dropping genuine co-organizers', JSON.stringify(computeIntendedUpdates(ev({ artist_name: 'Artist', venue: 'Hall', organizer_names: ['ARTIST', 'HALL', 'Real Promoter'] }), remote({})).find((c) => c.field === 'organizer_names')?.to) === JSON.stringify(['Real Promoter']));
  assert('a verified venue change clears a newly ambiguous organizer name', computeIntendedUpdates(ev({ venue: 'Old Hall', organizer_names: ['New Hall'] }), remote({ _embedded: { venues: [{ name: 'New Hall' }] } })).some((c) => c.field === 'organizer_names' && c.to === null));

  assert('a stated ticket limit, legal-age flag and genre are stored', ['ticket_limit', 'legal_age_enforced', 'genre'].every((f) => fieldsOf(ev({}), remote({ ticketLimit: { info: 'There is a 4 Ticket Limit on this event' }, ageRestrictions: { legalAgeEnforced: true }, classifications: [{ primary: true, segment: { name: 'Music' }, genre: { name: 'Rock' } }] })).includes(f)));
  assert('unusable buying facts on a row without them are not changes', !fieldsOf(ev({}), remote({ ticketLimit: { info: 'See box office' }, ageRestrictions: { legalAgeEnforced: false }, classifications: [] })).some((f) => ['ticket_limit', 'legal_age_enforced', 'genre'].includes(f)));
  assert('a dropped legal-age flag clears the stored fact', computeIntendedUpdates(ev({ legal_age_enforced: true }), remote({ ageRestrictions: { legalAgeEnforced: false } })).some((c) => c.field === 'legal_age_enforced' && c.to === null));
  assert('old snapshots do not erase buying facts', !fieldsOf(ev({ ticket_limit: 4, legal_age_enforced: true, genre: 'Rock' }), remote({})).some((f) => ['ticket_limit', 'legal_age_enforced', 'genre'].includes(f)));
  assert('official promoter names are stored', fieldsOf(ev({}), remote({ promoters: [{ name: 'Official Promoter' }] })).includes('organizer_names'));
  assert('old snapshots do not erase organizers', !fieldsOf(ev({ organizer_names: ['Official Promoter'] }), remote({})).includes('organizer_names'));
  assert('a changed start clears an unsupported old event end', computeIntendedUpdates(ev({ datetime_iso: '2026-10-01T18:00:00Z', end_datetime_iso: '2026-10-01T21:00:00Z' }), remote({ dates: { start: { dateTime: '2026-10-02T18:00:00Z' } } })).some((c) => c.field === 'end_datetime_iso' && c.to === null));

  assert('explicit Discovery id is accepted',
    ticketmasterDiscoveryEventId({ ticketmaster_discovery_event_id: 'vv1AaZkoVGkdF4iwr' }) === 'vv1AaZkoVGkdF4iwr');
  assert('legacy Discovery-format id is accepted',
    ticketmasterDiscoveryEventId({ ticketmaster_event_id: 'Z7r9jZ1A706ep' }) === 'Z7r9jZ1A706ep');
  assert('storefront hex id is not queried as a Discovery id',
    ticketmasterDiscoveryEventId({ ticketmaster_event_id: '09006474C856CC9E' }) === '');
  assert('international numeric id is not queried as a Discovery id',
    ticketmasterDiscoveryEventId({ ticketmaster_event_id: '653666176' }) === '');

  // datetime: venue-local wall time vs the same instant in UTC is NOT a change.
  assert('same instant (PT wall vs UTC) is not a datetime change',
    !datetimeGenuinelyChanged('2026-06-19T20:00:00', '2026-06-20T03:00:00Z', 'America/Los_Angeles'));
  assert('a real one-hour move IS a datetime change',
    datetimeGenuinelyChanged('2026-06-20T02:30:00Z', '2026-06-20T03:30:00Z', 'America/Los_Angeles'));
  assert('date-only local matching the venue-local date is not a change',
    !datetimeGenuinelyChanged('2026-06-18', '2026-06-18T20:00:00Z', 'Europe/Paris'));

  // country: synonym differences collapse; a genuine country move surfaces.
  assert('US synonym is not a country change',
    !fieldsOf(ev({ country: 'United States Of America' }), remote({ _embedded: { venues: [{ name: '', city: { name: '' }, country: { name: 'United States' } }] } })).includes('country'));
  assert('UK/Great Britain synonym is not a country change',
    !fieldsOf(ev({ country: 'United Kingdom' }), remote({ _embedded: { venues: [{ name: '', city: { name: '' }, country: { name: 'Great Britain' } }] } })).includes('country'));

  // venue: punctuation/case differences do not count; a real rename does.
  assert('venue punctuation/case is not a change',
    !fieldsOf(ev({ venue: 'MERKUR SPIEL-ARENA' }), remote({ _embedded: { venues: [{ name: 'Merkur Spiel Arena', city: { name: '' }, country: { name: '' } }] } })).includes('venue'));
  assert('a genuine venue rename IS a change',
    fieldsOf(ev({ venue: 'Old Hall' }), remote({ _embedded: { venues: [{ name: 'New Arena', city: { name: '' }, country: { name: '' } }] } })).includes('venue'));

  // event_name: verbatim listing title sync; cosmetic differences do not count,
  // tour_name is never produced by computeIntendedUpdates at all.
  assert('missing event_name is filled from the API listing title',
    fieldsOf(ev({ event_name: '' }), remote({ name: 'The Eternal Sunshine Tour' })).includes('event_name'));
  assert('event_name case/punctuation is not a change',
    !fieldsOf(ev({ event_name: 'BTS WORLD TOUR ARIRANG' }), remote({ name: 'Bts World Tour: Arirang' })).includes('event_name'));
  const pending = ev({ status: 'announced', public_onsale_at: '2027-01-10T15:00:00Z' });
  assert('a pending date flips to on-sale when Discovery says onsale',
    fieldsOf(pending, remote({ dates: { status: { code: 'onsale' } } })).includes('status'));
  assert('a moved public on-sale is followed',
    fieldsOf(pending, remote({ dates: { status: { code: 'offsale' } }, sales: { public: { startDateTime: '2027-02-01T15:00:00Z' } } })).includes('public_onsale_at'));
  const kinds = (e, r) => computeReviewBlockers(e, r).map((b) => b.kind);
  assert('a pending row still offsale with a future on-sale is not blocked',
    !kinds(pending, remote({ dates: { status: { code: 'offsale' } }, sales: { public: { startDateTime: '2099-02-01T15:00:00Z' } } })).includes('status'));
  assert('offsale with no future on-sale stays review-only',
    kinds(pending, remote({ dates: { status: { code: 'offsale' } }, sales: { public: { startDateTime: '2020-02-01T15:00:00Z' } } })).includes('status'));
  assert('offsale on a row without public_onsale_at stays review-only',
    kinds(ev({ status: 'announced' }), remote({ dates: { status: { code: 'offsale' } }, sales: { public: { startDateTime: '2099-02-01T15:00:00Z' } } })).includes('status'));
  assert('status is never written for a row without public_onsale_at',
    !fieldsOf(ev({ status: 'announced' }), remote({ dates: { status: { code: 'onsale' } } })).includes('status'));
  assert('a genuine listing retitle IS an event_name change',
    fieldsOf(ev({ event_name: 'Old Title' }), remote({ name: 'New Title' })).includes('event_name'));
  assert('computeIntendedUpdates never emits tour_name',
    !fieldsOf(ev({ event_name: '' }), remote({ name: 'Anything' })).includes('tour_name'));

  // presales: verbatim name/start/end only; ended windows, codes and links dropped.
  const presaleNow = Date.parse('2027-01-01T00:00:00Z');
  const presalesOf = (e, r) => computeIntendedUpdates(e, r, presaleNow).find((c) => c.field === 'presales');
  const tmPresales = [
    { name: 'Artist Presale', startDateTime: '2027-01-05T15:00:00Z', endDateTime: '2027-01-06T03:00:00Z', description: 'Use code SECRET', url: 'https://example.com/signup' },
    { name: 'Old Presale', startDateTime: '2026-12-01T15:00:00Z', endDateTime: '2026-12-02T03:00:00Z' },
    { name: 'Fan Club Presale code: LOVE24', startDateTime: '2027-01-05T15:00:00Z', endDateTime: '2027-01-06T03:00:00Z' },
    { name: 'Card Presale', startDateTime: '2027-01-04T15:00:00Z', endDateTime: '2027-01-05T03:00:00Z' }
  ];
  const presaleChange = presalesOf(ev({}), remote({ sales: { presales: tmPresales } }));
  assert('presales are carried as name/start/end, sorted by start',
    JSON.stringify(presaleChange?.to) === JSON.stringify([
      { name: 'Card Presale', start: '2027-01-04T15:00:00Z', end: '2027-01-05T03:00:00Z' },
      { name: 'Artist Presale', start: '2027-01-05T15:00:00Z', end: '2027-01-06T03:00:00Z' }
    ]));
  assert('presale descriptions, URLs and codes are never stored',
    !JSON.stringify(presaleChange?.to).includes('SECRET') && !JSON.stringify(presaleChange?.to).includes('LOVE24') && !JSON.stringify(presaleChange?.to).includes('example.com'));
  assert('unchanged presales are not a change',
    !presalesOf(ev({ presales: presaleChange.to }), remote({ sales: { presales: tmPresales } })));
  assert('a record with no presales list leaves live stored windows alone',
    !presalesOf(ev({ presales: presaleChange.to }), remote({})));
  assert('stored windows that have ended are removed',
    presalesOf(ev({ presales: [{ name: 'Old Presale', start: '2026-12-01T15:00:00Z', end: '2026-12-02T03:00:00Z' }] }), remote({}))?.to === null);
  assert('an empty Discovery presales list clears the field',
    presalesOf(ev({ presales: presaleChange.to }), remote({ sales: { presales: [] } }))?.to === null);

  // timezone: only filled when missing, never rewritten.
  assert('present timezone is not rewritten',
    !fieldsOf(ev({ timezone: 'America/New_York' }), remote({ dates: { start: {}, timezone: 'America/Toronto' } })).includes('timezone'));
  assert('missing timezone is filled',
    fieldsOf(ev({ timezone: '' }), remote({ dates: { start: {}, timezone: 'America/New_York' } })).includes('timezone'));
  assert('missing timezone is filled from the single embedded venue record',
    fieldsOf(
      ev({ timezone: '' }),
      remote({ _embedded: { venues: [{ name: '', city: { name: '' }, country: { name: '' }, timezone: 'America/New_York' }] } })
    ).includes('timezone'));
  assert('a venue timezone is ignored when more than one venue is embedded',
    discoveryVenueTimezone({ dates: {}, _embedded: { venues: [{ timezone: 'America/New_York' }, { timezone: 'America/Chicago' }] } }) === '');
  assert('a non-IANA timezone value is never stored',
    discoveryVenueTimezone({ dates: { timezone: 'EST' } }) === '');
  assert('no timezone anywhere yields no change, never a guess',
    !fieldsOf(ev({ timezone: '' }), remote({ dates: { start: {} } })).includes('timezone'));

  // Lifecycle (owner-scoped 2026-09-26): recorded from the event's own
  // Discovery record, never inferred.
  const clean_ = (o) => ({ id: 'tm-a-2026-x-x', artist_name: 'Artist', ticketmaster_discovery_event_id: 'Z7r9jZ1A706ep', datetime_iso: '2026-10-01T00:00:00Z',
    timezone: 'America/New_York', venue: 'Hall', city: 'Town', country: 'United States', event_name: 'Artist', ticketmaster_url: '', ...o });
  const full = (code, o = {}) => ({ data: { id: 'Z7r9jZ1A706ep', name: 'Artist', dates: { status: { code }, start: { dateTime: '2026-10-01T00:00:00Z' }, timezone: 'America/New_York' },
    _embedded: { venues: [{ name: 'Hall', city: { name: 'Town' }, country: { name: 'United States' } }] }, ...o } });
  const plan = (e, r) => planEventSync(e, r, 'Z7r9jZ1A706ep');
  {
    const row = (id, day, extra = {}) => clean_({
      id, artist_slug: 'artist', ticketmaster_event_id: `store-${id}`,
      datetime_iso: `2026-10-${day}T20:00:00Z`, timezone: 'America/New_York',
      source_type: 'ticketmaster', verification_status: 'machine_high_confidence', ...extra
    });
    const proposed = (event, day, code = 'rescheduled', extra = {}) => {
      const response = full(code, {
        dates: { status: { code }, start: { dateTime: `2026-10-${day}T20:00:00Z` }, timezone: 'America/New_York' },
        ...extra
      });
      return { event, discoveryId: 'Z7r9jZ1A706ep', remote: response, plan: plan(event, response) };
    };
    const a = row('a', '01', { ticketmaster_status_code: 'postponed' });
    const b = row('b', '08');
    const c = row('c', '15');
    const proposals = [proposed(a, '08', 'onsale'), proposed(c, '22')];
    const before = JSON.stringify({ events: [a, b, c], proposals });
    const checked = withholdDuplicateSyncPlans([a, b, c], proposals);
    const collision = checked[0].plan;
    assert('a date move onto an existing performance is withheld', collision.blocked && collision.applied.length === 0);
    assert('a colliding update cannot clear a hold or bump verification', !collision.stampVerified && a.ticketmaster_status_code === 'postponed');
    const review = collision.reviewItems.find((item) => item.kind === 'duplicate_performance');
    assert('collision review identifies the peer and withheld date', review?.detail.includes('b') && review.intendedChanges.some((change) => change.field === 'datetime_iso'));
    assert('an unrelated clean date move survives', !checked[1].plan.blocked && checked[1].plan.stampVerified && checked[1].plan.applied.some((change) => change.field === 'datetime_iso'));
    assert('remaining clean updates still pass the commit gate', tmCommitSafe(1, []));
    assert('preflight never mutates events or input plans', JSON.stringify({ events: [a, b, c], proposals }) === before);
    for (const status of ['cancelled', 'canceled', 'postponed']) {
      const held = withholdDuplicateSyncPlans([c, b], [proposed(c, '08', status)])[0].plan;
      assert(`a ${status} hold survives a duplicate date move`, held.applied.length === 1 && held.applied[0].field === LIFECYCLE_FIELD && held.applied[0].to === status && !held.stampVerified);
    }
    const history = withholdDuplicateSyncPlans([c, b], [proposed(c, '08')])[0].plan;
    assert('a withheld reschedule creates no history or rescheduled label', history.applied.length === 0 && history.reviewItems.some((item) => item.intendedChanges?.some((change) => change.field === 'previous_start_date')));
    const swapped = withholdDuplicateSyncPlans([a, b], [proposed(a, '08'), proposed(b, '01')]);
    assert('a clean simultaneous date swap is allowed', swapped.every((item) => !item.plan.blocked && item.plan.applied.some((change) => change.field === 'datetime_iso')));
    const cascade = [proposed(a, '08'), proposed(c, '01'), proposed(row('d', '24'), '25')];
    const cascadeEvents = [a, b, c, cascade[2].event];
    const forward = withholdDuplicateSyncPlans(cascadeEvents, cascade);
    const reverse = withholdDuplicateSyncPlans(cascadeEvents, [...cascade].reverse());
    assert('restoring a withheld row catches a cascading collision', forward[0].plan.blocked && forward[1].plan.blocked && !forward[2].plan.blocked);
    assert('decisions do not depend on proposal order', forward.every((item) => JSON.stringify(item.plan) === JSON.stringify(reverse.find((other) => other.event.id === item.event.id).plan)));
    const matinee = row('matinee', '08', { datetime_iso: '2026-10-08T14:00:00Z' });
    const evening = row('evening', '15');
    assert('distinct same-venue performances at least three hours apart remain allowed', !withholdDuplicateSyncPlans([matinee, evening], [proposed(evening, '08')])[0].plan.blocked);
    const near = proposed(evening, '08', 'rescheduled', { dates: { status: { code: 'rescheduled' }, start: { dateTime: '2026-10-08T16:00:00Z' }, timezone: 'America/New_York' } });
    assert('ambiguous same-day performances are withheld', withholdDuplicateSyncPlans([matinee, evening], [near])[0].plan.blocked);
    const venueChange = proposed(matinee, '08', 'onsale', { dates: { status: { code: 'onsale' }, start: { dateTime: matinee.datetime_iso }, timezone: 'America/New_York' }, _embedded: { venues: [{ name: 'Another Hall', city: { name: 'Town' }, country: { name: 'United States' } }] } });
    assert('a venue change making two performances ambiguous is withheld', withholdDuplicateSyncPlans([matinee, row('evening', '08')], [venueChange])[0].plan.blocked);
    const oldDuplicate = row('old-duplicate', '08');
    assert('existing unresolved groups do not block unrelated updates', !withholdDuplicateSyncPlans([b, oldDuplicate, c], [proposed(c, '22')])[0].plan.blocked);
    assert('joining an existing duplicate group is withheld', withholdDuplicateSyncPlans([b, oldDuplicate, c], [proposed(c, '08')])[0].plan.blocked);
    const tomorrow = new Date(Date.now() + 86400000).toISOString();
    const nextDay = new Date(Date.now() + 172800000).toISOString();
    const metadataOnly = proposed(b, '08', 'onsale', { sales: { presales: [{ name: 'Artist presale', startDateTime: tomorrow, endDateTime: nextDay }] } });
    const metadataChecked = withholdDuplicateSyncPlans([b, oldDuplicate], [metadataOnly])[0].plan;
    assert('an existing group does not block safe metadata updates', !metadataChecked.blocked && metadataChecked.applied.some((change) => change.field === 'presales'));
  }
  const lifecycleOf = (p) => p.applied.find((c) => c.field === 'ticketmaster_status_code');
  assert('cancelled is recorded verbatim', lifecycleOf(plan(clean_(), full('cancelled')))?.to === 'cancelled');
  assert('the "canceled" spelling is recorded as supplied', lifecycleOf(plan(clean_(), full('canceled')))?.to === 'canceled');
  assert('postponed is recorded', lifecycleOf(plan(clean_(), full('postponed')))?.to === 'postponed');
  assert('rescheduled is recorded', lifecycleOf(plan(clean_(), full('rescheduled')))?.to === 'rescheduled');
  {
    const old = clean_({ source_type: 'ticketmaster', verification_status: 'machine_high_confidence' });
    const moved = full('rescheduled', { dates: { status: { code: 'rescheduled' }, start: { dateTime: '2026-10-08T00:00:00Z' }, timezone: 'America/New_York' } });
    const previousOf = (row, response = moved) => plan(row, response).applied.find((c) => c.field === 'previous_start_date');
    assert('a confirmed reschedule retains the verified previous date', previousOf(old)?.to === old.datetime_iso);
    assert('a reschedule retains the OLD timezone', plan(old, moved).applied.find((c) => c.field === 'previous_start_timezone')?.to === old.timezone);
    assert('a cosmetic date representation does not create history', !previousOf(old, full('rescheduled')));
    assert('a date correction without a rescheduled status does not create history', !previousOf(old, full('onsale', { dates: { status: { code: 'onsale' }, start: { dateTime: '2026-10-08T00:00:00Z' }, timezone: 'America/New_York' } })));
    assert('a previously unverified date is not claimed as history', !previousOf({ ...old, verification_status: 'needs_recheck' }));
    assert('an identity mismatch creates no history', !previousOf(old, { data: { ...moved.data, name: 'Someone Else Entirely' } }));
    assert('repeat reschedules preserve recorded history', !previousOf({ ...old, ticketmaster_status_code: 'rescheduled', previous_start_date: '2026-09-01T00:00:00Z' }));
    assert('history survives an intervening on-sale status', !previousOf({ ...old, previous_start_date: '2026-09-01T00:00:00Z' }));
    assert('offset-only history keeps its original wall date', previousOf({ ...old, datetime_iso: '2026-09-30T20:30:00-07:00', timezone: '' })?.to === '2026-09-30T20:30:00-07:00');
  }
  {
    // Doja Cat, San Francisco (2026-10-10): rescheduled from Mon 19 Oct to Sun
    // 25 Oct while the Ticket Liquidator URL still named the 19th.
    const moved = full('rescheduled', { dates: { status: { code: 'rescheduled' }, start: { dateTime: '2026-10-26T02:30:00Z' }, timezone: 'America/Los_Angeles' } });
    const row = clean_({
      datetime_iso: '2026-10-20T02:30:00Z', timezone: 'America/Los_Angeles',
      ticketliquidator_url: 'https://www.ticketliquidator.com/tickets/7457622/Doja-Cat-tickets-Mon-Oct-19-2026-Chase-Center',
      ticketnetwork_url: 'https://www.ticketnetwork.com/en/p/7695886',
      provider_links: {
        'ticket-liquidator': { event_id: '7457622', url: 'https://www.ticketliquidator.com/tickets/7457622/Doja-Cat-tickets-Mon-Oct-19-2026-Chase-Center', verified: true, last_verified_at: '2026-07-31', availability_status: 'listed' },
        ticketnetwork: { event_id: '7695886', url: 'https://www.ticketnetwork.com/en/p/7695886', verified: true, last_verified_at: '2026-07-13', availability_status: 'listed' }
      }
    });
    const p = plan(row, moved);
    assert('a reschedule applies the new date', p.applied.some((c) => c.field === 'datetime_iso' && c.to === '2026-10-26T02:30:00Z'));
    applyChanges(row, p.applied);
    assert('a resale URL naming the old night is withdrawn with the date move',
      row.ticketliquidator_url === '' && row.provider_links['ticket-liquidator'].verified === false);
    assert('a resale URL naming no date is kept', row.ticketnetwork_url && row.provider_links.ticketnetwork.verified === true);
    assert('no link is withdrawn without a date move', wrongNightLinkChanges(clean_({ ticketliquidator_url: row.ticketnetwork_url }), []).length === 0);
    const recorded = { ...row, datetime_iso: '2026-11-05T04:00:00Z', timezone: 'America/Los_Angeles', ticketmaster_status_code: 'rescheduled', stubhub_international_url: 'https://www.stubhub.ie/tom-jones-los-angeles-tickets-10-26-2026/event/107448275' };
    assert('a recorded reschedule withdraws a numeric old-night URL on a later sync', wrongNightLinkChanges(recorded, []).some((c) => c.field === 'provider_link:stubhub-international'));
    assert('a matching numeric date is retained', !wrongNightLinkChanges({ ...recorded, stubhub_international_url: 'https://www.stubhub.ie/tom-jones-los-angeles-tickets-11-14-2026/event/1', datetime_iso: '2026-11-15T04:00:00Z' }, []).some((c) => c.field === 'provider_link:stubhub-international'));
  }
  assert('a recorded status is no longer a review blocker', !plan(clean_(), full('cancelled')).blocked &&
    !kinds(clean_(), full('postponed')).includes('status'));
  assert('a cancelled event is still surfaced for a removal decision',
    plan(clean_(), full('cancelled')).reviewItems.some((item) => item.kind === 'status'));
  assert('a rescheduled event is not surfaced as a hold',
    !plan(clean_(), full('rescheduled')).reviewItems.some((item) => item.kind === 'status'));
  assert('a rescheduled event takes its new date from the same record',
    plan(clean_(), full('rescheduled', { dates: { status: { code: 'rescheduled' }, start: { dateTime: '2026-11-15T00:00:00Z' }, timezone: 'America/New_York' } }))
      .applied.some((c) => c.field === 'datetime_iso' && c.to === '2026-11-15T00:00:00Z'));
  const tba = full('postponed', { dates: { status: { code: 'postponed' }, start: {}, timezone: 'America/New_York' } });
  assert('a hold is recorded even when the start time is not confirmed',
    lifecycleOf(plan(clean_(), tba))?.to === 'postponed' && kinds(clean_(), tba).includes('ambiguous_api_response'));
  assert('a hold recorded past another blocker does not bump last_verified_at', !plan(clean_(), tba).stampVerified);
  const tbaRescheduled = full('rescheduled', { dates: { status: { code: 'rescheduled' }, start: {}, timezone: 'America/New_York' } });
  assert('rescheduled is not recorded while its new date is ambiguous',
    !lifecycleOf(plan(clean_(), tbaRescheduled)) && kinds(clean_(), tbaRescheduled).includes('ambiguous_api_response'));
  const mismatched = full('cancelled', { name: 'Someone Else Entirely' });
  assert('an identity mismatch records nothing', !lifecycleOf(plan(clean_(), mismatched)));
  assert('an already-recorded status is not rewritten', !lifecycleOf(plan(clean_({ ticketmaster_status_code: 'cancelled' }), full('cancelled'))));
  assert('onsale clears a recorded status',
    lifecycleOf(plan(clean_({ ticketmaster_status_code: 'postponed' }), full('onsale')))?.to === null);
  assert('a clear waits for a fully unambiguous record',
    !lifecycleOf(plan(clean_({ ticketmaster_status_code: 'postponed' }), full('onsale', { dates: { status: { code: 'onsale' }, start: {}, timezone: '' } }))));
  assert('offsale records nothing and stays review-only',
    !lifecycleOf(plan(clean_(), full('offsale'))) && kinds(clean_(), full('offsale')).includes('status'));
  assert('an unrecognised status records nothing and stays review-only',
    !lifecycleOf(plan(clean_(), full('paused'))) && kinds(clean_(), full('paused')).includes('unknown_status'));
  assert('an empty status records nothing', !lifecycleOf(plan(clean_({ ticketmaster_status_code: 'cancelled' }), full(''))));
  {
    const row = clean_();
    const p = plan(row, full('cancelled'));
    applyChanges(row, p.applied);
    assert('applying a hold never changes the event id', row.id === 'tm-a-2026-x-x' && row.ticketmaster_status_code === 'cancelled');
    applyChanges(row, plan(row, full('onsale')).applied);
    assert('clearing removes the field rather than blanking it', !('ticketmaster_status_code' in row) && row.id === 'tm-a-2026-x-x');
  }

  // Throttle contract: a burst of 429s must not become a roster of hard errors
  // that vetoes the whole night's clean updates, while a deterministic answer
  // stays a verdict on the first attempt and a sustained outage stays bounded.
  assert('429 is retriable', isRetriableTmStatus(429));
  assert('503 is retriable', isRetriableTmStatus(503));
  assert('404 is not retriable', !isRetriableTmStatus(404));
  assert('401 is not retriable', !isRetriableTmStatus(401));
  assert('200 is not retriable', !isRetriableTmStatus(200));

  const noSleep = async () => {};
  const okResponse = { ok: true, status: 200, json: async () => ({ id: 'X' }) };

  let throttled = 0;
  const cleared = await fetchEvent('k', 'https://tm.test', 'X', {
    sleep: noSleep,
    budget: createRetryBudget(),
    fetch: async () => { throttled += 1; return throttled < 3 ? { ok: false, status: 429 } : okResponse; }
  });
  assert('a 429 that clears is retried, not recorded as an error', cleared.exists === true && !cleared.error);
  assert('the throttled request retries until the origin answers', throttled === 3);

  let deleted = 0;
  const gone = await fetchEvent('k', 'https://tm.test', 'X', {
    sleep: noSleep,
    budget: createRetryBudget(),
    fetch: async () => { deleted += 1; return { ok: false, status: 404 }; }
  });
  assert('404 stays a deleted-event verdict', gone.exists === false && gone.status === 404);
  assert('404 is answered on the first attempt', deleted === 1);

  let denied = 0;
  const unauthorised = await fetchEvent('k', 'https://tm.test', 'X', {
    sleep: noSleep,
    budget: createRetryBudget(),
    fetch: async () => { denied += 1; return { ok: false, status: 401 }; }
  });
  assert('401 is reported as the error it is', unauthorised.error === 'HTTP 401');
  assert('401 is not retried', denied === 1);

  let unrelenting = 0;
  const stillThrottled = await fetchEvent('k', 'https://tm.test', 'X', {
    sleep: noSleep,
    budget: createRetryBudget(),
    fetch: async () => { unrelenting += 1; return { ok: false, status: 429 }; }
  });
  assert('a throttle that never clears keeps its real status', stillThrottled.error === 'HTTP 429');
  assert('a throttle is retried to the cap', unrelenting === TM_MAX_ATTEMPTS);

  // The bound that protects the job timeout: once the sweep-wide allowance is
  // gone, later events stop retrying instead of grinding to the cap each time.
  const spent = createRetryBudget(0);
  let unbudgeted = 0;
  const noRetries = await fetchEvent('k', 'https://tm.test', 'X', {
    sleep: noSleep,
    budget: spent,
    fetch: async () => { unbudgeted += 1; return { ok: false, status: 429 }; }
  });
  assert('an exhausted retry budget stops the retries', unbudgeted === 1);
  assert('an exhausted budget still reports the throttle', noRetries.error === 'HTTP 429');

  const budget = createRetryBudget(TM_RETRY_BACKOFF_MS);
  assert('the budget grants a reservation it can cover', budget.reserve(TM_RETRY_BACKOFF_MS) === true);
  assert('the budget refuses a reservation it cannot cover', budget.reserve(TM_RETRY_BACKOFF_MS) === false);
  budget.refund(TM_RETRY_BACKOFF_MS);
  assert('a refund restores the allowance', budget.reserve(TM_RETRY_BACKOFF_MS) === true);

  // The budget bounds ELAPSED time, not sleeps. A retry whose request times out
  // costs requestTimeoutMs; charging only the backoff would let ~60 such events
  // add half an hour of request time to the sweep while the budget still read as
  // barely touched — the job-cap breach this is meant to prevent.
  // Sized relative to the live constants, never hard-coded: these are all
  // env-tunable, and a test pinned to their defaults would red the whole
  // required suite the moment anyone set TM_REQUEST_TIMEOUT_MS to tune a run.
  // This allowance funds exactly one retry and no more.
  let stalledClock = 0;
  const stalledAllowance = requestTimeoutMs + TM_RETRY_BACKOFF_MS + 1;
  const stalledBudget = createRetryBudget(stalledAllowance);
  let stalledCalls = 0;
  await fetchEvent('k', 'https://tm.test', 'X', {
    sleep: noSleep,
    now: () => stalledClock,
    budget: stalledBudget,
    fetch: async () => { stalledCalls += 1; stalledClock += requestTimeoutMs; return { ok: false, status: 429 }; }
  });
  assert('a timing-out retry is charged its real elapsed time',
    stalledBudget.remaining <= stalledAllowance - requestTimeoutMs);
  assert('an elapsed-time budget stops the sweep retrying early', stalledCalls < TM_MAX_ATTEMPTS);

  // The other side of the same contract: a fast refusal must refund nearly all
  // of its reservation, or one slow lane would starve the whole roster.
  let fastClock = 0;
  const fastAllowance = (TM_RETRY_BACKOFF_MS * 3) + (requestTimeoutMs * 2) + 1000;
  const fastBudget = createRetryBudget(fastAllowance);
  let fastCalls = 0;
  await fetchEvent('k', 'https://tm.test', 'X', {
    sleep: noSleep,
    now: () => fastClock,
    budget: fastBudget,
    fetch: async () => { fastCalls += 1; fastClock += 50; return { ok: false, status: 429 }; }
  });
  assert('a fast refusal still retries to the cap', fastCalls === TM_MAX_ATTEMPTS);
  assert('a fast refusal is charged only its backoff plus real request time',
    fastAllowance - fastBudget.remaining === (TM_RETRY_BACKOFF_MS * 3) + 100);

  // The env guard itself: an unusable tuning value must fall back, not disable
  // the bound. NaN made `remaining < ms` false and granted every reservation.
  assert('a non-numeric env value falls back to its default',
    positiveIntFromEnv('TM_NO_SUCH_VAR_FOR_TEST', 4242) === 4242);
  process.env.TM_NO_SUCH_VAR_FOR_TEST = 'abc';
  assert('a garbage env value falls back rather than parsing to NaN',
    positiveIntFromEnv('TM_NO_SUCH_VAR_FOR_TEST', 4242) === 4242);
  process.env.TM_NO_SUCH_VAR_FOR_TEST = '0';
  assert('a zero env value falls back rather than skipping the request loop',
    positiveIntFromEnv('TM_NO_SUCH_VAR_FOR_TEST', 4242) === 4242);
  process.env.TM_NO_SUCH_VAR_FOR_TEST = '7';
  assert('a usable env value is honoured',
    positiveIntFromEnv('TM_NO_SUCH_VAR_FOR_TEST', 4242) === 7);
  delete process.env.TM_NO_SUCH_VAR_FOR_TEST;

  let transient = 0;
  const recovered = await fetchEvent('k', 'https://tm.test', 'X', {
    sleep: noSleep,
    budget: createRetryBudget(),
    fetch: async () => {
      transient += 1;
      if (transient === 1) throw Object.assign(new Error('socket hang up'), { name: 'FetchError' });
      return okResponse;
    }
  });
  assert('a dropped connection is retried like a throttle', recovered.exists === true && transient === 2);

  // Sweep window: only long-past, un-held events are ever skipped, and each of
  // those is still checked on one day in every PAST_RECHECK_DAYS.
  const sweepNow = Date.parse('2026-07-30T12:00:00Z');
  const indexedSet = new Set(['a']);
  const sweepEvents = [
    { id: 'old', artist_slug: 'a', ticketmaster_discovery_event_id: 'vv1AaZkoVGkdF4iwr', datetime_iso: '2026-07-01T20:00:00Z' },
    { id: 'recent', artist_slug: 'a', ticketmaster_discovery_event_id: 'vv1AaZkoVGkdF4iws', datetime_iso: '2026-07-25T20:00:00Z' },
    { id: 'upcoming', artist_slug: 'a', ticketmaster_discovery_event_id: 'vv1AaZkoVGkdF4iwt', datetime_iso: '2026-08-01' },
    { id: 'held', artist_slug: 'a', ticketmaster_discovery_event_id: 'vv1AaZkoVGkdF4iwu', datetime_iso: '2026-06-01T20:00:00Z', ticketmaster_status_code: 'postponed' },
    { id: 'undated', artist_slug: 'a', ticketmaster_discovery_event_id: 'vv1AaZkoVGkdF4iwv', datetime_iso: '' },
    { id: 'other-artist', artist_slug: 'b', ticketmaster_discovery_event_id: 'vv1AaZkoVGkdF4iww', datetime_iso: '2026-08-01' }
  ];
  const week = Array.from({ length: PAST_RECHECK_DAYS }, (_, day) => selectSyncTargets(sweepEvents, indexedSet, { now: sweepNow + day * 86400000 }));
  assert('recent, upcoming, held and undated events are checked every day',
    week.every((run) => ['recent', 'upcoming', 'held', 'undated'].every((id) => run.targets.some((e) => e.id === id))));
  assert('a long-past event without a stored status is skipped on all but one day',
    week.filter((run) => run.skippedPast === 1 && !run.targets.some((e) => e.id === 'old')).length === PAST_RECHECK_DAYS - 1);
  assert('a long-past event is still checked once per rotation (late reschedules are found)',
    week.filter((run) => run.targets.some((e) => e.id === 'old')).length === 1);
  const fullSweep = selectSyncTargets(sweepEvents, indexedSet, { now: sweepNow, includePast: true });
  assert('includePast restores the full sweep', fullSweep.skippedPast === 0 && fullSweep.targets.length === 5);

  let failed = 0;
  for (const c of checks) {
    if (!c.pass) failed += 1;
    console.log(`${c.pass ? 'PASS' : 'FAIL'}  ${c.label}`);
  }
  console.log(`\n${checks.length - failed}/${checks.length} checks passed.`);
  return failed === 0 ? 0 : 1;
}

async function main() {
  if (argv.includes('--self-test')) {
    process.exit(await runSelfTest());
  }
  const apiKey = clean(process.env.TICKETMASTER_API_KEY);
  if (!apiKey) {
    const message = 'TICKETMASTER_API_KEY not set; no Ticketmaster API calls were made. Writing a skipped report; auto-commit remains disabled.';
    if (process.env.GITHUB_ACTIONS === 'true') {
      console.warn(`::warning::${message}`);
    } else {
      console.warn(message);
    }
    if (jsonOutPath) {
      await fs.mkdir(path.dirname(jsonOutPath), { recursive: true }).catch(() => {});
      await fs.writeFile(jsonOutPath, JSON.stringify({
        status: 'skipped',
        reason: 'TICKETMASTER_API_KEY not set',
        updates: [],
        reviewItems: [],
        errors: [],
        blockedUpdateIds: [],
        summary: { checked: 0, updated: 0, reviewItems: 0, errors: 0, blockedUpdateIds: 0, autoCommitSafe: false }
      }, null, 2));
    }
    return;
  }
  const base = clean(process.env.TICKETMASTER_DISCOVERY_BASE_URL || DEFAULT_BASE).replace(/\/+$/, '');

  const snapshot = await loadSnapshot(snapshotPath, base);
  const sweep = createSnapshotSweep({ base, snapshot, secrets: [apiKey] });
  const indexed = await loadIndexedArtistSlugs();
  const attractionIds = await loadAttractionIds();
  const events = await readJson(eventsPath);
  const includePast = includePastFromEnv();
  const { targets, skippedPast } = selectSyncTargets(events, indexed, { includePast });
  console.log(`Checking ${targets.length} tracked event(s) across ${indexed.size} indexed artist(s)...`);
  console.log(includePast
    ? 'TM_SWEEP_INCLUDE_PAST=1: long-past events are checked too.'
    : `Skipped ${skippedPast} long-past event(s) not due their ${PAST_RECHECK_DAYS}-day re-check (set TM_SWEEP_INCLUDE_PAST=1 for a full sweep).`);

  sweep.stats.skipped_past = skippedPast;
  for (const event of events) {
    if (indexed.has(clean(event?.artist_slug)) && !ticketmasterDiscoveryEventId(event)) sweep.unresolvable(event);
  }
  const updates = [];
  const planned = [];
  const reviewItems = [];
  const errors = [];
  const blockedUpdateIds = [];
  let checked = 0;
  // One allowance for the whole sweep — see TM_RETRY_BUDGET_MS.
  const retryBudget = createRetryBudget();

  // Fetch the events the shared snapshot does not already cover in batches
  // instead of one call each (set TM_BATCH_FETCH=0 to turn this off).
  await sweep.prefetch(targets.map((event) => ticketmasterDiscoveryEventId(event)), {
    apiKey,
    directFetch: (id) => fetchEvent(apiKey, base, id, { budget: retryBudget, observeResponse: sweep.observeResponse })
  });

  for (const event of targets) {
    const id = ticketmasterDiscoveryEventId(event);
    const result = await sweep.get(id, () => fetchEvent(apiKey, base, id, { budget: retryBudget, observeResponse: sweep.observeResponse }));
    checked += 1;

    if (result.exists === false) {
      reviewItems.push(reviewItem(
        event,
        id,
        null,
        'deleted',
        `Ticketmaster returned ${result.status} — event is review-only and must not be removed or mutated automatically.`,
        [],
        'Confirm the show is genuinely gone, then remove or update the event and any CTA by PR.'
      ));
    } else if (result.exists === null) {
      errors.push({
        ...summarizeEvent(event, id),
        error: result.error,
        status: result.status,
        transient: isTransientFetchStatus(result.status),
        recommendedAction: 'Retry on the next run. A throttled or unavailable event is left untouched; other events in the run are unaffected.'
      });
    } else {
      const plan = planEventSync(event, result, id, { attractionId: attractionIds.get(clean(event.artist_slug)) });
      planned.push({ event, remote: result, discoveryId: id, plan });
    }
    if (result.source === 'direct' && requestDelayMs > 0) await sleep(requestDelayMs);
  }

  for (const { event, remote, discoveryId, plan } of withholdDuplicateSyncPlans(events, planned)) {
    reviewItems.push(...plan.reviewItems);
    if (plan.blocked) blockedUpdateIds.push(event.id);
    if (!plan.applied.length) continue;
    applyChanges(event, plan.applied);
    if (plan.stampVerified) stampVerified(event);
    updates.push({ ...summarizeEvent(event, discoveryId, remote.data), changes: plan.applied });
  }

  const summary = {
    checked,
    skippedPast,
    updated: updates.length,
    reviewItems: reviewItems.length,
    errors: errors.length,
    transientErrors: errors.filter((e) => e.transient).length,
    blockedUpdateIds: blockedUpdateIds.length,
    // Factual changes need both per-event and batch checks; safety holds can
    // still be recorded on blocked rows. Standing review items on OTHER events —
    // e.g. the permanently-offsale rows — do not make the applied updates
    // unsafe. A non-transient error still vetoes the commit. A throttled (429),
    // 5xx or network-failed fetch only leaves that one event untouched, so it
    // does not stop other events' lossless updates (see tmCommitSafe).
    autoCommitSafe: tmCommitSafe(updates.length, errors)
  };

  await reportSnapshotStats(sweep.stats);
  const report = {
    requests: sweep.stats,
    checked_at: new Date().toISOString(),
    dry_run: dryRun,
    updates,
    reviewItems,
    errors,
    blockedUpdateIds,
    summary
  };

  console.log(`\nResult: ${updates.length} event(s) updated, ${reviewItems.length} review item(s), ${errors.length} error(s), ${blockedUpdateIds.length} blocked update id(s).`);
  for (const u of updates) {
    console.log(`  updated ${u.id}: ${u.changes.map((c) => c.field).join(', ')}`);
  }
  for (const id of blockedUpdateIds) {
    console.log(`  blocked update ${id}`);
  }
  for (const r of reviewItems) {
    console.log(`  review  ${r.id} [${r.kind}]: ${r.detail}`);
  }

  if (updates.length && !dryRun) {
    // Write literal UTF-8 to match the canonical events.json encoding produced
    // by the partition/sync pipeline (ensure_ascii=False); escaping non-ASCII
    // here would churn every accented venue/city on each run.
    const output = JSON.stringify(events, null, 2) + '\n';
    await fs.writeFile(eventsPath, output);
    console.log(`\n${path.basename(eventsPath.pathname)} updated.`);
  } else if (dryRun) {
    console.log('\n--- DRY RUN: events.json not modified ---');
  } else {
    console.log('\nNo auto-applicable changes; events.json untouched.');
  }

  if (jsonOutPath) {
    await fs.mkdir(path.dirname(jsonOutPath), { recursive: true }).catch(() => {});
    await fs.writeFile(jsonOutPath, JSON.stringify(report, null, 2));
    console.log(`Report written to ${jsonOutPath}`);
  }
  // Preserve evidence and the existing zero-error commit veto, then fail the
  // step so quota exhaustion cannot masquerade as a successful sync.
  if (errors.length) process.exitCode = 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) main().catch((err) => {
  console.error('apply-tm-updates failed:', err);
  process.exit(1);
});
