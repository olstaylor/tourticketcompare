#!/usr/bin/env node
/**
 * Ticketmaster Discovery API candidate audit.
 * Queries TM Discovery API for events, groups by artist, outputs raw results.
 */

import fs from 'node:fs/promises';
import path from 'node:path';

const DEFAULT_BASE = 'https://app.ticketmaster.com/discovery/v2';
const AUDIT_DIR = new URL('../.audit/', import.meta.url);
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

  // Generate 65 events for a fictional tour
  for (let i = 0; i < 65; i++) {
    const date = new Date(2025, 5, 1 + Math.floor(i / 5)); // June onwards, grouped by venue
    candidates.push({
      id: `fixture-event-${i}`,
      name: 'World Tour 2025',
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

async function fetchDiscoveryEvents(apiKey, base, page = 0) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), requestTimeoutMs);

  // Format startDateTime without milliseconds (ISO format: YYYY-MM-DDTHH:mm:ssZ)
  const now = new Date();
  const startDateTime = new Date(now.getTime() - now.getMilliseconds()).toISOString();

  // Query parameters: music events, exclude cancelled, TBA, TBD, test events
  const params = new URLSearchParams({
    apikey: apiKey,
    classificationName: 'music',
    size: '200',
    page,
    startDateTime,
    sort: 'date,asc',
    includeTBA: 'no',
    includeTBD: 'no',
    includeTest: 'no',
    source: 'ticketmaster'
  });

  const url = `${base}/events.json?${params.toString()}`;
  const redactedUrl = url.replace(new RegExp(`apikey=[^&]*`), 'apikey=REDACTED');

  try {
    console.log(`Query URL: ${redactedUrl}`);
    const response = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      signal: controller.signal,
      headers: { 'user-agent': 'TourTicketCompareAudit/1.0 (+https://tourticketcompare.com)' }
    });

    if (!response.ok) {
      const error = `HTTP ${response.status}`;
      console.warn(`Warning: TM API returned ${error}`);
      return { success: false, events: [], error, status: response.status };
    }

    const data = await response.json();
    const events = data?._embedded?.events || [];
    const totalElements = data?.page?.totalElements || 0;

    if (totalElements > 0) {
      console.log(`API returned ${events.length} raw events (${totalElements} total in result)`);
    } else {
      console.log('API returned no events for the query.');
    }

    return { success: true, events, totalPages: data?.page?.totalPages || 1, totalElements };
  } catch (error) {
    const message = error?.name === 'AbortError' ? `timeout after ${requestTimeoutMs}ms` : String(error?.message || error);
    console.warn(`Warning: TM API fetch failed: ${message}`);
    return { success: false, events: [], error: message };
  } finally {
    clearTimeout(timeout);
  }
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

    console.log('Querying Ticketmaster Discovery API...');
    let page = 0;
    let hasMore = true;

    while (hasMore && page < 5) { // Limit to 5 pages to avoid excessive API calls
      console.log(`Fetching page ${page}...`);
      const result = await fetchDiscoveryEvents(apiKey, DEFAULT_BASE, page);

      if (!result.success) {
        console.warn(`Failed to fetch page ${page}: ${result.error}`);
        break;
      }

      allEvents = allEvents.concat(result.events);
      hasMore = page < (result.totalPages - 1);
      page++;

      if (hasMore) await sleep(requestDelayMs);
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
