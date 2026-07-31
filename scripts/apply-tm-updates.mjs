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
//       * venue / city / country
//       * official listing title (event_name, verbatim Discovery API `name` —
//         owner-approved 2026-07-07; NOT tour_name, which stays human-gated)
//       * canonical Ticketmaster URL (refreshed so the /event/<id> slug and the
//         out.js event-id match stay correct when a date moves)
//       * last_verified_at bump on touched events
//
// Explicitly NOT auto-applied (collected into a review report for a human /
// fast-track PR instead — these need judgement or have no safe local
// representation):
//       * brand-new shows               -> handled by the discovery/proposal PR flow
//       * deleted events (404 / 410)     -> human confirms removal
//       * cancelled / postponed status   -> no valid local status enum (#schema)
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
  'ticketmaster.it'
]);

const argv = process.argv.slice(2);
function arg(name) {
  const i = argv.indexOf(name);
  return i >= 0 ? argv[i + 1] : null;
}
const dryRun = argv.includes('--dry-run');
const jsonOutPath = arg('--json');
const eventsPath = arg('--events')
  ? new URL(`file://${path.resolve(arg('--events'))}`)
  : DEFAULT_EVENTS_PATH;
const artistsPath = arg('--artists')
  ? new URL(`file://${path.resolve(arg('--artists'))}`)
  : DEFAULT_ARTISTS_PATH;

const requestDelayMs = Number.parseInt(process.env.TM_REQUEST_DELAY_MS || '300', 10);
const requestTimeoutMs = Number.parseInt(process.env.TM_REQUEST_TIMEOUT_MS || '15000', 10);

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

async function fetchEvent(apiKey, base, eventId) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), requestTimeoutMs);
  const url = `${base}/events/${encodeURIComponent(eventId)}.json?apikey=${encodeURIComponent(apiKey)}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: controller.signal,
      headers: { 'user-agent': 'TourTicketCompareSync/1.0 (+https://tourticketcompare.com)' }
    });
    const status = response.status;
    if (status === 404 || status === 410) return { status, exists: false, data: null };
    if (!response.ok) return { status, exists: null, error: `HTTP ${status}`, data: null };
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

// Build the lossless field updates that would be written for one event from
// its remote Ticketmaster record. This function is intentionally side-effect
// free: callers must first prove there are no review-only blockers, then apply
// the returned changes.
function computeIntendedUpdates(event, remote) {
  const changes = [];
  const data = remote?.data;
  if (!data) return changes;

  // --- date / time -----------------------------------------------------------
  // Only a genuine instant move is a change; differing representations of the
  // same moment (venue-local wall time vs the API's UTC) are not.
  const remoteDateTime = clean(data?.dates?.start?.dateTime);
  const localDateTime = clean(event.datetime_iso);
  const tz = clean(event.timezone) || clean(data?.dates?.timezone);
  if (remoteDateTime && datetimeGenuinelyChanged(localDateTime, remoteDateTime, tz)) {
    changes.push({ field: 'datetime_iso', from: localDateTime, to: remoteDateTime });
  }

  // Only fill a missing timezone; never rewrite a present one (avoids churn
  // when the API reports an equivalent zone for the same location).
  const remoteTz = clean(data?.dates?.timezone);
  if (remoteTz && remoteTz.includes('/') && !clean(event.timezone)) {
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
  } else if (!SAFE_AUTO_STATUS_CODES.has(remoteStatus)) {
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

function attachIntendedChanges(reviewItems, intendedChanges) {
  if (!intendedChanges.length) return reviewItems;
  return reviewItems.map((item) => ({ ...item, intendedChanges }));
}

function applyChanges(event, changes) {
  for (const change of changes) {
    if (change.field === 'ticketmaster_url') {
      event.ticketmaster_url = change.to;
      event.source_url = change.to;
      if (event.provider_links?.ticketmaster && typeof event.provider_links.ticketmaster === 'object') {
        event.provider_links.ticketmaster.url = change.to;
      }
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
function runSelfTest() {
  const checks = [];
  const assert = (label, pass) => checks.push({ label, pass: !!pass });
  const ev = (o) => ({ datetime_iso: '', timezone: '', venue: '', city: '', country: '', ticketmaster_event_id: 'X', ticketmaster_url: '', ...o });
  const remote = (o) => ({ data: { id: 'X', dates: { start: {}, timezone: '' }, _embedded: { venues: [{ name: '', city: { name: '' }, country: { name: '' } }] }, ...o } });
  const fieldsOf = (e, r) => computeIntendedUpdates(e, r).map((c) => c.field);

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
  assert('a genuine listing retitle IS an event_name change',
    fieldsOf(ev({ event_name: 'Old Title' }), remote({ name: 'New Title' })).includes('event_name'));
  assert('computeIntendedUpdates never emits tour_name',
    !fieldsOf(ev({ event_name: '' }), remote({ name: 'Anything' })).includes('tour_name'));

  // timezone: only filled when missing, never rewritten.
  assert('present timezone is not rewritten',
    !fieldsOf(ev({ timezone: 'America/New_York' }), remote({ dates: { start: {}, timezone: 'America/Toronto' } })).includes('timezone'));
  assert('missing timezone is filled',
    fieldsOf(ev({ timezone: '' }), remote({ dates: { start: {}, timezone: 'America/New_York' } })).includes('timezone'));

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
    process.exit(runSelfTest());
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

  const indexed = await loadIndexedArtistSlugs();
  const events = await readJson(eventsPath);
  const targets = events.filter(
    (e) => indexed.has(clean(e?.artist_slug)) && ticketmasterDiscoveryEventId(e)
  );
  console.log(`Checking ${targets.length} tracked event(s) across ${indexed.size} indexed artist(s)...`);

  const updates = [];
  const reviewItems = [];
  const errors = [];
  const blockedUpdateIds = [];
  let checked = 0;

  for (const event of targets) {
    const id = ticketmasterDiscoveryEventId(event);
    const result = await fetchEvent(apiKey, base, id);
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
        recommendedAction: 'Retry on the next run; do not commit any data changes from a run with errors.'
      });
    } else {
      const intendedChanges = computeIntendedUpdates(event, result);
      const blockers = attachIntendedChanges(computeReviewBlockers(event, result), intendedChanges);
      if (blockers.length) {
        reviewItems.push(...blockers);
        if (intendedChanges.length) blockedUpdateIds.push(event.id);
      } else if (intendedChanges.length) {
        applyChanges(event, intendedChanges);
        stampVerified(event);
        updates.push({
          ...summarizeEvent(event, id, result.data),
          changes: intendedChanges
        });
      }
    }
    if (requestDelayMs > 0) await sleep(requestDelayMs);
  }

  const summary = {
    checked,
    updated: updates.length,
    reviewItems: reviewItems.length,
    errors: errors.length,
    blockedUpdateIds: blockedUpdateIds.length,
    // Updates are only ever applied to events with zero review blockers (see
    // the per-event branch above), so standing review items on OTHER events —
    // e.g. the permanently-offsale rows — do not make the applied updates
    // unsafe. Errors still veto: a run with failed fetches should not commit.
    autoCommitSafe: updates.length > 0 && errors.length === 0
  };

  const report = {
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
}

main().catch((err) => {
  console.error('apply-tm-updates failed:', err);
  process.exit(1);
});
