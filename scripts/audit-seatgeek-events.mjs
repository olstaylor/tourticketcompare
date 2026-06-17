#!/usr/bin/env node
// Audits event-level SeatGeek links against the official SeatGeek Platform API.
// Mirrors audit-tm-events.mjs: for each indexed artist, every event carrying a
// seatgeek_url is checked by its concert ID (parsed from the URL) — confirming
// the event still exists (404/410 => missing) and that the local date/venue/
// status still match the API (=> changed). Read-only; never mutates data.
import fs from 'node:fs/promises';
import path from 'node:path';

const SEATGEEK_EVENTS_ENDPOINT = 'https://api.seatgeek.com/2/events';
const EVENTS_DIR = new URL('../public/data/events/', import.meta.url);
const ARTISTS_PATH = new URL('../public/data/artists.json', import.meta.url);

const argv = process.argv.slice(2);
const jsonFlagIndex = argv.indexOf('--json');
const jsonOutPath = jsonFlagIndex >= 0 ? (argv[jsonFlagIndex + 1] || null) : null;
const emitJson = jsonFlagIndex >= 0;
const requestDelayMs = Number.parseInt(process.env.SEATGEEK_REQUEST_DELAY_MS || '300', 10);
const requestTimeoutMs = Number.parseInt(process.env.SEATGEEK_REQUEST_TIMEOUT_MS || '15000', 10);

function clean(value) {
  return String(value || '').trim();
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// SeatGeek concert URLs end in `/concert/<numeric id>` (optionally with a query
// string). Returns the numeric event ID or null when one can't be parsed.
function seatgeekIdFromUrl(url) {
  const match = clean(url).match(/\/(\d+)(?:[/?#]|$)/);
  return match ? match[1] : null;
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

async function fetchEvent(clientId, eventId) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), requestTimeoutMs);
  const url = `${SEATGEEK_EVENTS_ENDPOINT}/${encodeURIComponent(eventId)}?client_id=${encodeURIComponent(clientId)}`;
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

function compareLocal(localEvent, remote) {
  const diffs = [];
  if (!remote?.data) return diffs;
  const remoteDate = clean(remote.data?.datetime_local || remote.data?.datetime_utc || '');
  const localDate = clean(localEvent?.datetime_iso || '');
  if (remoteDate && localDate && !remoteDate.startsWith(localDate.slice(0, 10))) {
    diffs.push({ field: 'datetime_iso', local: localDate, remote: remoteDate });
  }
  const remoteVenue = clean(remote.data?.venue?.name || '');
  const localVenue = clean(localEvent?.venue || '');
  if (remoteVenue && localVenue && remoteVenue.toLowerCase() !== localVenue.toLowerCase()) {
    diffs.push({ field: 'venue', local: localVenue, remote: remoteVenue });
  }
  // SeatGeek does not expose an on-sale status comparable to TM's status.code;
  // a present but empty/closed listing is surfaced via the missing/changed
  // date/venue signals above rather than a synthetic status field.
  return diffs;
}

async function main() {
  const clientId = clean(process.env.SEATGEEK_CLIENT_ID);
  if (!clientId) {
    console.error('ERROR: SEATGEEK_CLIENT_ID is not set.');
    process.exit(2);
  }

  const slugs = await loadIndexedArtistSlugs();
  console.log(`Auditing SeatGeek events for ${slugs.length} indexed artists...`);

  const perArtist = [];
  let totalChecked = 0;
  let totalMissing = 0;
  let totalErrors = 0;
  let totalChanged = 0;
  let totalUnparsable = 0;

  for (const slug of slugs) {
    const events = await loadArtistEvents(slug);
    const withUrl = events.filter((e) => clean(e?.seatgeek_url));
    const missing = [];
    const errors = [];
    const changed = [];
    const unparsable = [];

    for (const event of withUrl) {
      const id = seatgeekIdFromUrl(event.seatgeek_url);
      if (!id) {
        totalUnparsable += 1;
        unparsable.push({ id: event.id, seatgeek_url: event.seatgeek_url });
        continue;
      }
      const result = await fetchEvent(clientId, id);
      totalChecked += 1;
      if (result.exists === false) {
        totalMissing += 1;
        missing.push({ id: event.id, seatgeek_event_id: id, city: event.city, datetime_iso: event.datetime_iso, status: result.status });
      } else if (result.exists === null) {
        totalErrors += 1;
        errors.push({ id: event.id, seatgeek_event_id: id, error: result.error, status: result.status });
      } else {
        const diffs = compareLocal(event, result);
        if (diffs.length) {
          totalChanged += 1;
          changed.push({ id: event.id, seatgeek_event_id: id, diffs });
        }
      }
      if (requestDelayMs > 0) await sleep(requestDelayMs);
    }

    perArtist.push({
      slug,
      events_checked: totalCheckedForArtist(withUrl, unparsable),
      events_without_seatgeek_url: events.length - withUrl.length,
      unparsable,
      missing,
      errors,
      changed
    });
    console.log(`  ${slug}: ${withUrl.length - unparsable.length} checked, ${missing.length} missing, ${changed.length} changed, ${errors.length} errors, ${unparsable.length} unparsable`);
  }

  const summary = {
    checked_at: new Date().toISOString(),
    artists: perArtist,
    totals: {
      checked: totalChecked,
      missing: totalMissing,
      changed: totalChanged,
      errors: totalErrors,
      unparsable: totalUnparsable
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

// Events whose SeatGeek ID could not be parsed were never queried, so they are
// not counted as "checked" for verification purposes.
function totalCheckedForArtist(withUrl, unparsable) {
  return withUrl.length - unparsable.length;
}

main().catch((err) => {
  console.error('audit-seatgeek-events failed:', err);
  process.exit(1);
});
