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

function compareLocal(localEvent, remote) {
  const diffs = [];
  if (!remote?.data) return diffs;
  const remoteDate = clean(remote.data?.dates?.start?.dateTime || remote.data?.dates?.start?.localDate || '');
  const localDate = clean(localEvent?.datetime_iso || '');
  if (remoteDate && localDate && !remoteDate.startsWith(localDate.slice(0, 10))) {
    diffs.push({ field: 'datetime_iso', local: localDate, remote: remoteDate });
  }
  const remoteVenue = clean(remote.data?._embedded?.venues?.[0]?.name || '');
  const localVenue = clean(localEvent?.venue || '');
  if (remoteVenue && localVenue && remoteVenue.toLowerCase() !== localVenue.toLowerCase()) {
    diffs.push({ field: 'venue', local: localVenue, remote: remoteVenue });
  }
  const remoteStatus = clean(remote.data?.dates?.status?.code || '');
  if (remoteStatus && remoteStatus !== 'onsale') {
    diffs.push({ field: 'status', local: clean(localEvent?.status || ''), remote: remoteStatus });
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

  for (const slug of slugs) {
    const events = await loadArtistEvents(slug);
    const withId = events.filter((e) => clean(e?.ticketmaster_event_id));
    const missing = [];
    const errors = [];
    const changed = [];

    for (const event of withId) {
      const id = clean(event.ticketmaster_event_id);
      const result = await fetchEvent(apiKey, base, id);
      totalChecked += 1;
      if (result.exists === false) {
        totalMissing += 1;
        missing.push({ id: event.id, ticketmaster_event_id: id, city: event.city, datetime_iso: event.datetime_iso, status: result.status });
      } else if (result.exists === null) {
        totalErrors += 1;
        errors.push({ id: event.id, ticketmaster_event_id: id, error: result.error, status: result.status });
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
      events_checked: withId.length,
      events_without_tm_id: events.length - withId.length,
      missing,
      errors,
      changed
    });
    console.log(`  ${slug}: ${withId.length} checked, ${missing.length} missing, ${changed.length} changed, ${errors.length} errors`);
  }

  const summary = {
    checked_at: new Date().toISOString(),
    artists: perArtist,
    totals: {
      checked: totalChecked,
      missing: totalMissing,
      changed: totalChanged,
      errors: totalErrors
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
