#!/usr/bin/env node
//
// apply-tm-updates.mjs
//
// Nightly authoritative field-sync for already-tracked events.
//
// Scope (deliberately narrow — see SAFE_PUBLISHING_RULES.md "Discovery,
// Enrichment, and Rendering"):
//   - AUTO-APPLY, lossless, from the Ticketmaster Discovery API source of truth,
//     for events that ALREADY exist in events.json and carry a
//     ticketmaster_event_id:
//       * date / time  (datetime_iso, timezone)
//       * venue / city / country
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
// Ticketmaster Discovery API response for that exact event id.
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

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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

// Build the set of safe, lossless field updates for one event from its remote
// Ticketmaster record. Returns { applied: [...], review: [...] }.
function computeUpdates(event, remote) {
  const applied = [];
  const review = [];
  const data = remote?.data;
  if (!data) return { applied, review };

  // --- date / time -----------------------------------------------------------
  const remoteDateTime = clean(data?.dates?.start?.dateTime);
  const localDateTime = clean(event.datetime_iso);
  if (remoteDateTime && remoteDateTime !== localDateTime) {
    applied.push({ field: 'datetime_iso', from: localDateTime, to: remoteDateTime });
    event.datetime_iso = remoteDateTime;
  }

  const remoteTz = clean(data?.dates?.timezone);
  if (remoteTz && remoteTz.includes('/') && remoteTz !== clean(event.timezone)) {
    applied.push({ field: 'timezone', from: clean(event.timezone), to: remoteTz });
    event.timezone = remoteTz;
  }

  // --- venue / city / country ------------------------------------------------
  const venue = data?._embedded?.venues?.[0] || null;
  const remoteVenue = clean(venue?.name);
  if (remoteVenue && remoteVenue.toLowerCase() !== clean(event.venue).toLowerCase()) {
    applied.push({ field: 'venue', from: clean(event.venue), to: remoteVenue });
    event.venue = remoteVenue;
  }
  const remoteCity = clean(venue?.city?.name);
  if (remoteCity && remoteCity.toLowerCase() !== clean(event.city).toLowerCase()) {
    applied.push({ field: 'city', from: clean(event.city), to: remoteCity });
    event.city = remoteCity;
  }
  const remoteCountry = clean(venue?.country?.name);
  if (remoteCountry && remoteCountry.toLowerCase() !== clean(event.country).toLowerCase()) {
    applied.push({ field: 'country', from: clean(event.country), to: remoteCountry });
    event.country = remoteCountry;
  }

  // --- canonical URL refresh (keeps the out.js event-id match valid) ----------
  const refreshedUrl = safeTicketmasterUrl(data?.url, event.ticketmaster_event_id);
  if (refreshedUrl && refreshedUrl !== clean(event.ticketmaster_url)) {
    applied.push({ field: 'ticketmaster_url', from: clean(event.ticketmaster_url), to: refreshedUrl });
    event.ticketmaster_url = refreshedUrl;
    event.source_url = refreshedUrl;
    if (event.provider_links?.ticketmaster && typeof event.provider_links.ticketmaster === 'object') {
      event.provider_links.ticketmaster.url = refreshedUrl;
    }
  }

  // --- review-only signals (never auto-applied) ------------------------------
  const remoteStatus = clean(data?.dates?.status?.code).toLowerCase();
  if (remoteStatus && remoteStatus !== 'onsale' && remoteStatus !== 'offsale') {
    review.push({ kind: 'status', detail: `Ticketmaster status='${remoteStatus}' (no safe local enum) — confirm cancel/postpone handling` });
  }

  return { applied, review };
}

function stampVerified(event) {
  const d = today();
  event.last_verified_at = d;
  const tm = event.provider_links?.ticketmaster;
  if (tm && typeof tm === 'object' && tm.verified === true && clean(tm.url)) {
    tm.last_verified_at = d;
  }
}

async function main() {
  const apiKey = clean(process.env.TICKETMASTER_API_KEY);
  if (!apiKey) {
    console.log('TICKETMASTER_API_KEY not set; apply-tm-updates is a no-op.');
    if (jsonOutPath) {
      await fs.mkdir(path.dirname(jsonOutPath), { recursive: true }).catch(() => {});
      await fs.writeFile(jsonOutPath, JSON.stringify({ status: 'skipped', reason: 'TICKETMASTER_API_KEY not set' }, null, 2));
    }
    return;
  }
  const base = clean(process.env.TICKETMASTER_DISCOVERY_BASE_URL || DEFAULT_BASE).replace(/\/+$/, '');

  const indexed = await loadIndexedArtistSlugs();
  const events = await readJson(eventsPath);
  const targets = events.filter(
    (e) => indexed.has(clean(e?.artist_slug)) && clean(e?.ticketmaster_event_id)
  );
  console.log(`Checking ${targets.length} tracked event(s) across ${indexed.size} indexed artist(s)...`);

  const updatedEvents = [];
  const reviewItems = [];
  const errors = [];
  let checked = 0;

  for (const event of targets) {
    const id = clean(event.ticketmaster_event_id);
    const result = await fetchEvent(apiKey, base, id);
    checked += 1;

    if (result.exists === false) {
      reviewItems.push({ id: event.id, ticketmaster_event_id: id, kind: 'deleted', detail: `Ticketmaster returned ${result.status} — event no longer exists` });
    } else if (result.exists === null) {
      errors.push({ id: event.id, ticketmaster_event_id: id, error: result.error, status: result.status });
    } else {
      const { applied, review } = computeUpdates(event, result);
      if (applied.length) {
        stampVerified(event);
        updatedEvents.push({ id: event.id, ticketmaster_event_id: id, changes: applied });
      }
      for (const r of review) reviewItems.push({ id: event.id, ticketmaster_event_id: id, ...r });
    }
    if (requestDelayMs > 0) await sleep(requestDelayMs);
  }

  const report = {
    checked_at: new Date().toISOString(),
    dry_run: dryRun,
    totals: {
      checked,
      events_updated: updatedEvents.length,
      review_items: reviewItems.length,
      errors: errors.length
    },
    updated: updatedEvents,
    review: reviewItems,
    errors
  };

  console.log(`\nResult: ${updatedEvents.length} event(s) updated, ${reviewItems.length} review item(s), ${errors.length} error(s).`);
  for (const u of updatedEvents) {
    console.log(`  updated ${u.id}: ${u.changes.map((c) => c.field).join(', ')}`);
  }
  for (const r of reviewItems) {
    console.log(`  review  ${r.id} [${r.kind}]: ${r.detail}`);
  }

  if (updatedEvents.length && !dryRun) {
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
