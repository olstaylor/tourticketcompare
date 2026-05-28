#!/usr/bin/env node
/**
 * Ticketmaster Discovery API candidate audit.
 * Queries TM Discovery API for events, groups by artist, outputs raw results.
 */

import fs from 'node:fs/promises';
import path from 'node:path';

const DEFAULT_BASE = 'https://app.ticketmaster.com/discovery/v2';
const AUDIT_DIR = new URL('../.audit/', import.meta.url);
const DEFAULT_PAGES = 5;
const MAX_PAGES = 25;
const SUPPORTED_MODES = new Set(['default', 'broad']);

// Generate fixture with 60+ events for a test artist
function generateFixtureCandidates() {
  const candidates = [];
  const artist = { id: 'K8vZ987a7l3', name: 'Test Artist', slug: 'test-artist' };
  const venues = [
    'Madison Square Garden',
    'Crypto.com Arena',
    'United Center',
    'American Airlines Center',
    'FTX Arena',
    'Chase Center',
    'Kaseya Center',
    'Smoothie King Center',
    'Golden State Warriors'
  ];
  // Spread fixture URLs across a few regional TM domains so dry-run exercises
  // the supported-domain detection logic (reporting only — not a CTA allowlist).
  const fixtureHosts = [
    'www.ticketmaster.com',
    'www.ticketmaster.co.uk',
    'www.ticketmaster.ie',
    'www.ticketmaster.ca'
  ];

  // Generate 65 events for a fictional tour
  for (let i = 0; i < 65; i++) {
    const date = new Date(2025, 5, 1 + Math.floor(i / 5)); // June onwards, grouped by venue
    candidates.push({
      id: `fixture-event-${i}`,
      name: 'World Tour 2025',
      url: `https://${fixtureHosts[i % fixtureHosts.length]}/event/fixture-${i}`,
      classifications: [{ segment: 'music', genre: { id: '10', name: 'Pop' } }],
      dates: {
        start: {
          localDate: date.toISOString().split('T')[0],
          dateTime: date.toISOString()
        }
      },
      venues: [{ name: venues[i % venues.length], city: { name: 'Various' }, state: { name: 'USA' } }],
      _embedded: {
        attractions: [artist],
        venues: [{ name: venues[i % venues.length] }]
      },
      status: 'onsale',
      source: 'ticketmaster'
    });
  }

  return candidates;
}

const FIXTURE_CANDIDATES = generateFixtureCandidates();

const argv = process.argv.slice(2);
function arg(name) {
  const i = argv.indexOf(name);
  return i >= 0 ? argv[i + 1] : null;
}

function clean(value) {
  return String(value || '').trim();
}

async function ensureDir(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch {
    // ignore mkdir errors
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const apiKey = arg('--api-key') || clean(process.env.TICKETMASTER_API_KEY);
const outputPath = arg('--output') || '.audit/candidates-raw.json';
const dryRun = argv.includes('--dry-run');
const requestDelayMs = Number.parseInt(process.env.TM_REQUEST_DELAY_MS || '300', 10);
const requestTimeoutMs = Number.parseInt(process.env.TM_REQUEST_TIMEOUT_MS || '15000', 10);

function parsePages(raw) {
  const parsed = Number.parseInt(raw, 10);
  if (!Number.isFinite(parsed) || parsed <= 0) return DEFAULT_PAGES;
  return Math.min(parsed, MAX_PAGES);
}

function parseMode(raw) {
  const value = clean(raw).toLowerCase();
  if (!value) return 'default';
  if (!SUPPORTED_MODES.has(value)) {
    console.warn(`Warning: unknown --mode "${raw}"; falling back to "default".`);
    return 'default';
  }
  return value;
}

const pages = parsePages(arg('--pages') ?? process.env.AUDIT_PAGES ?? DEFAULT_PAGES);
const mode = parseMode(arg('--mode') ?? process.env.AUDIT_MODE ?? 'default');

function redactApiKey(text, apiKey) {
  let redacted = String(text || '').replace(/apikey=[^&\s"']*/gi, 'apikey=REDACTED');
  if (apiKey) {
    redacted = redacted.split(apiKey).join('REDACTED');
  }
  return redacted;
}

// Format as YYYY-MM-DDTHH:mm:ssZ (no milliseconds — TM Discovery rejects fractional seconds)
function formatStartDateTime(date) {
  return date.toISOString().replace(/\.\d{3}Z$/, 'Z');
}

function buildPrimaryParams(apiKey, page, startDateTime, mode = 'default') {
  const params = {
    apikey: apiKey,
    classificationName: 'music',
    size: '200',
    page: String(page),
    startDateTime,
    sort: 'date,asc',
    includeTBA: 'no',
    includeTBD: 'no',
    includeTest: 'no'
  };
  // Default mode constrains to TM-sourced events; broad mode drops the source
  // filter so syndicated music events on TM domains are also returned. The
  // music classification constraint is kept in both modes.
  if (mode !== 'broad') params.source = 'ticketmaster';
  return new URLSearchParams(params);
}

function buildFallbackParams(apiKey, page, startDateTime) {
  // Minimum params: drop classificationName / includeTBA / includeTBD / includeTest / source
  return new URLSearchParams({
    apikey: apiKey,
    size: '200',
    page: String(page),
    sort: 'date,asc',
    startDateTime
  });
}

async function requestDiscovery(apiKey, base, params, { attempt }) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), requestTimeoutMs);

  const url = `${base}/events.json?${params.toString()}`;
  const redactedUrl = redactApiKey(url, apiKey);

  try {
    console.log(`[${attempt}] Query URL: ${redactedUrl}`);
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: controller.signal,
      headers: { 'user-agent': 'TourTicketCompareAudit/1.0 (+https://tourticketcompare.com)' }
    });

    if (!response.ok) {
      let body = '';
      try {
        body = await response.text();
      } catch {
        body = '<unable to read response body>';
      }
      const redactedBody = redactApiKey(body, apiKey);
      const error = `HTTP ${response.status}`;
      console.warn(`Warning: TM API returned ${error} on ${attempt} attempt`);
      if (response.status === 400) {
        console.warn(`[${attempt}] Ticketmaster 400 response body:\n${redactedBody}`);
      } else if (redactedBody) {
        console.warn(`[${attempt}] Response body:\n${redactedBody}`);
      }
      return { success: false, events: [], error, status: response.status, body: redactedBody, attempt };
    }

    const data = await response.json();
    const events = data?._embedded?.events || [];
    const totalElements = data?.page?.totalElements || 0;

    if (totalElements > 0) {
      console.log(`[${attempt}] API returned ${events.length} raw events (${totalElements} total in result)`);
    } else {
      console.log(`[${attempt}] API returned no events for the query.`);
    }

    return { success: true, events, totalPages: data?.page?.totalPages || 1, totalElements, attempt };
  } catch (error) {
    const message = error?.name === 'AbortError' ? `timeout after ${requestTimeoutMs}ms` : String(error?.message || error);
    console.warn(`Warning: TM API fetch failed on ${attempt} attempt: ${message}`);
    return { success: false, events: [], error: message, attempt };
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchDiscoveryEvents(apiKey, base, page = 0, mode = 'default') {
  const startDateTime = formatStartDateTime(new Date());

  const primary = await requestDiscovery(apiKey, base, buildPrimaryParams(apiKey, page, startDateTime, mode), { attempt: 'primary' });
  if (primary.success) return primary;

  // Only retry on HTTP 400 — other errors (auth, rate limit, network) should not be masked
  if (primary.status !== 400) return primary;

  console.warn('Primary query failed with HTTP 400; retrying with minimum fallback params.');
  const fallback = await requestDiscovery(apiKey, base, buildFallbackParams(apiKey, page, startDateTime), { attempt: 'fallback' });
  return fallback;
}

async function main() {
  let allEvents = [];

  if (dryRun) {
    console.log('[dry-run] Using fixture candidates (no API call)');
    allEvents = FIXTURE_CANDIDATES;
  } else {
    if (!apiKey) {
      console.error('ERROR: TICKETMASTER_API_KEY is not set and not using --dry-run.');
      process.exit(2);
    }

    console.log(`Querying Ticketmaster Discovery API (pages=${pages}, mode=${mode})...`);
    let page = 0;
    let hasMore = true;
    let firstPageFailed = false;
    let firstPageError = null;

    while (hasMore && page < pages) {
      console.log(`Fetching page ${page}...`);
      const result = await fetchDiscoveryEvents(apiKey, DEFAULT_BASE, page, mode);

      if (!result.success) {
        console.error(`ERROR: Failed to fetch page ${page} (${result.attempt || 'unknown'} attempt): ${result.error}`);
        if (page === 0) {
          firstPageFailed = true;
          firstPageError = `${result.error} (${result.attempt || 'unknown'} attempt)`;
        }
        break;
      }

      allEvents = allEvents.concat(result.events);
      hasMore = page < (result.totalPages - 1);
      page++;

      if (hasMore) await sleep(requestDelayMs);
    }

    if (firstPageFailed) {
      console.error(`ERROR: Ticketmaster Discovery query failed: ${firstPageError}. Not writing a misleading empty result.`);
      process.exit(3);
    }
  }

  console.log(`Total raw events fetched: ${allEvents.length}`);

  // Filter: exclude cancelled/postponed, require at least one attraction
  const rejectionReasons = {};
  const validEvents = allEvents.filter((e) => {
    const status = clean(e?.dates?.status?.code || '');
    if (status === 'cancelled' || status === 'postponed') {
      rejectionReasons[`status:${status}`] = (rejectionReasons[`status:${status}`] || 0) + 1;
      return false;
    }
    const attractions = e?._embedded?.attractions || [];
    if (attractions.length === 0) {
      rejectionReasons['no_attractions'] = (rejectionReasons['no_attractions'] || 0) + 1;
      return false;
    }
    return true;
  });

  if (allEvents.length > 0 && validEvents.length === 0) {
    console.log('Top rejection reasons:');
    const sorted = Object.entries(rejectionReasons)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);
    sorted.forEach(([reason, count]) => {
      console.log(`  - ${reason}: ${count}`);
    });
  }

  console.log(`Found ${validEvents.length} valid events.`);

  // Output raw events
  const outputFile = path.resolve(process.cwd(), outputPath);
  const outputDir = path.dirname(outputFile);
  await ensureDir(outputDir);
  await fs.writeFile(outputFile, JSON.stringify(validEvents, null, 2), 'utf8');
  console.log(`Wrote ${validEvents.length} events to ${outputPath}`);

  process.exit(0);
}

main().catch((err) => {
  console.error('ERROR:', err.message);
  process.exit(1);
});
