#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';

const API_BASE = 'https://app.ticketmaster.com/discovery/v2/events.json';
const PAGE_LIMIT = Number(process.env.TM_DISCOVERY_PAGE_LIMIT || 10);
const SIZE = Number(process.env.TM_DISCOVERY_PAGE_SIZE || 50);
const MAX_RESULTS = PAGE_LIMIT * SIZE;
const OUTPUT_DIR = process.env.TM_OUTPUT_DIR || 'artifacts/tm-discovery';
// Scope discovery to a single market so candidates align with the affiliate
// programme and existing roster. Defaults to US; set TM_DISCOVERY_COUNTRY_CODE
// to another ISO code, or to an empty string to scan all markets.
const COUNTRY_CODE = process.env.TM_DISCOVERY_COUNTRY_CODE === undefined
  ? 'US'
  : process.env.TM_DISCOVERY_COUNTRY_CODE.trim();

function slugify(name) {
  // Decompose accented characters (ROSALÍA -> ROSALIA, Beyoncé -> Beyonce)
  // and drop the combining marks before stripping to [a-z0-9]; otherwise an
  // accent collapses to a hyphen (ROSALÍA -> "rosal-a").
  return String(name || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function readJson(file) {
  return JSON.parse(await fs.readFile(file, 'utf8'));
}

// Resolve the canonical ticketmaster.com destination from the API-provided
// attraction url. Discovery may return an Impact affiliate wrapper
// (ticketmaster.evyy.net/...?u=<encoded canonical url>). NEVER construct this
// from the artist name — the storefront id (e.g. /artist/2453211) differs from
// the Discovery id (e.g. K8vZ917pJy7), so a name-built URL would be wrong.
function canonicalTicketmasterUrl(rawUrl) {
  const value = String(rawUrl || '').trim();
  if (!value) return null;
  try {
    const parsed = new URL(value);
    if (parsed.hostname.endsWith('ticketmaster.com')) return value;
    const wrapped = parsed.searchParams.get('u');
    if (wrapped) {
      const inner = new URL(decodeURIComponent(wrapped));
      if (inner.hostname.endsWith('ticketmaster.com')) return inner.toString();
    }
  } catch {
    return null;
  }
  return null;
}

function getParkedNames(backlogText) {
  const lines = backlogText.split(/\r?\n/);
  return new Set(
    lines
      .filter((line) => /parked|blocked|do not onboard/i.test(line))
      .map((line) => line.replace(/^[-*\s]+/, '').trim().toLowerCase())
  );
}

function requireExpectedShape(payload, page) {
  if (!payload || typeof payload !== 'object' || !payload.page || !Array.isArray(payload?._embedded?.events)) {
    throw new Error(`Unexpected Ticketmaster response shape on page ${page}`);
  }
}

async function main() {
  const apiKey = process.env.TICKETMASTER_API_KEY;
  if (!apiKey) throw new Error('Missing TICKETMASTER_API_KEY. Failing closed.');

  const [artists, catalog, backlogText] = await Promise.all([
    readJson('public/data/artists.json'),
    readJson('public/data/catalog.json'),
    fs.readFile('BACKLOG.md', 'utf8')
  ]);

  const existingArtistSlugs = new Set(artists.map((a) => a.slug));
  const catalogSlugs = new Set((catalog.artists || []).map((a) => a.slug));
  const parkedNames = getParkedNames(backlogText);

  const apiCalls = [];
  const allEvents = [];
  const seenEventIds = new Set();
  for (let page = 0; page < PAGE_LIMIT; page += 1) {
    const params = {
      apikey: apiKey,
      classificationName: 'music',
      size: String(SIZE),
      page: String(page),
      sort: 'date,asc',
      includeTBA: 'no',
      includeTBD: 'no',
      // Ticketmaster Discovery rejects startDateTime with milliseconds (HTTP 400);
      // it requires YYYY-MM-DDTHH:mm:ssZ.
      startDateTime: new Date().toISOString().replace(/\.\d{3}Z$/, 'Z')
    };
    if (COUNTRY_CODE) params.countryCode = COUNTRY_CODE;
    const query = new URLSearchParams(params);
    const url = `${API_BASE}?${query.toString()}`;
    const res = await fetch(url);
    apiCalls.push({ page, status: res.status, url: `${API_BASE}?page=${page}&size=${SIZE}&classificationName=music${COUNTRY_CODE ? `&countryCode=${COUNTRY_CODE}` : ''}` });
    if (!res.ok) throw new Error(`Ticketmaster API error on page ${page}: HTTP ${res.status}`);
    const payload = await res.json();
    requireExpectedShape(payload, page);
    // Dedup by event id — the date-sorted feed repeats listings across pages,
    // which otherwise inflates per-attraction event counts.
    const events = payload._embedded.events.filter((ev) => {
      if (ev?.dates?.status?.code === 'cancelled') return false;
      if (!ev?.id || seenEventIds.has(ev.id)) return false;
      seenEventIds.add(ev.id);
      return true;
    });
    allEvents.push(...events);
    if (payload._embedded.events.length === 0 || allEvents.length >= MAX_RESULTS || page >= (payload.page.totalPages - 1)) break;
  }

  const grouped = new Map();
  const skipLog = [];

  for (const ev of allEvents) {
    const attr = ev?._embedded?.attractions?.find((a) => a.id && a.name);
    if (!attr) {
      skipLog.push({ reason: 'missing_attraction', eventId: ev.id });
      continue;
    }
    const slug = slugify(attr.name);
    const venue = ev?._embedded?.venues?.[0];
    const hasCleanLocation = Boolean(venue?.name && venue?.city?.name && venue?.country?.countryCode);
    if (!grouped.has(attr.id)) grouped.set(attr.id, { attractionId: attr.id, artistName: attr.name, slug, ticketmasterArtistUrl: canonicalTicketmasterUrl(attr.url), events: [], cleanCount: 0, cities: new Set(), countries: new Set() });
    const g = grouped.get(attr.id);
    g.events.push({ eventId: ev.id, date: ev?.dates?.start?.dateTime || null, venue: venue?.name || null, city: venue?.city?.name || null, country: venue?.country?.countryCode || null });
    if (hasCleanLocation) {
      g.cleanCount += 1;
      g.cities.add(venue.city.name);
      g.countries.add(venue.country.countryCode);
    }
  }

  const candidates = [];
  for (const g of grouped.values()) {
    const nameLc = g.artistName.toLowerCase();
    if (existingArtistSlugs.has(g.slug)) { skipLog.push({ attractionId: g.attractionId, artistName: g.artistName, reason: 'already_in_artists' }); continue; }
    if (catalogSlugs.has(g.slug)) { skipLog.push({ attractionId: g.attractionId, artistName: g.artistName, reason: 'slug_collision_catalog' }); continue; }
    if ([...parkedNames].some((line) => line.includes(nameLc))) { skipLog.push({ attractionId: g.attractionId, artistName: g.artistName, reason: 'parked_in_backlog' }); continue; }
    const eventCount = g.events.length;
    if (eventCount < 2) { skipLog.push({ attractionId: g.attractionId, artistName: g.artistName, reason: 'insufficient_events' }); continue; }
    const completenessRatio = g.cleanCount / eventCount;
    if (completenessRatio < 0.7) { skipLog.push({ attractionId: g.attractionId, artistName: g.artistName, reason: 'low_location_completeness', completenessRatio }); continue; }

    const geographyScore = Math.min(20, g.countries.size * 8 + g.cities.size * 2);
    const eventScore = Math.min(60, eventCount * 12);
    const completenessScore = Math.round(completenessRatio * 20);
    const score = eventScore + geographyScore + completenessScore;
    candidates.push({
      attractionId: g.attractionId,
      artistName: g.artistName,
      slug: g.slug,
      ticketmasterArtistUrl: g.ticketmasterArtistUrl,
      score,
      scoreBreakdown: { eventScore, geographyScore, completenessScore },
      upcomingEventCount: eventCount,
      uniqueCities: g.cities.size,
      uniqueCountries: g.countries.size,
      locationCompletenessRatio: Number(completenessRatio.toFixed(3)),
      sampleEvents: g.events.slice(0, 5),
      needs_editorial_copy: true,
      draft_short_description: ''
    });
  }

  candidates.sort((a, b) => b.score - a.score);

  const today = new Date().toISOString().slice(0, 10);
  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  await fs.writeFile(path.join(OUTPUT_DIR, 'api-calls.json'), JSON.stringify(apiCalls, null, 2));
  await fs.writeFile(path.join(OUTPUT_DIR, 'discovered-events.json'), JSON.stringify(allEvents, null, 2));
  await fs.writeFile(path.join(OUTPUT_DIR, 'candidates.json'), JSON.stringify(candidates, null, 2));
  await fs.writeFile(path.join(OUTPUT_DIR, 'skip-log.json'), JSON.stringify(skipLog, null, 2));

  const repoEventCount = (await readJson('public/data/events.json')).length;
  const topCandidatesText = candidates
    .slice(0, 20)
    .map((c, i) => `${i + 1}. **${c.artistName}** (slug: \`${c.slug}\`, attractionId: \`${c.attractionId}\`)\n   - Score: ${c.score} (events ${c.scoreBreakdown.eventScore}, geography ${c.scoreBreakdown.geographyScore}, completeness ${c.scoreBreakdown.completenessScore})\n   - Events: ${c.upcomingEventCount}, countries: ${c.uniqueCountries}, cities: ${c.uniqueCities}, completeness: ${c.locationCompletenessRatio}\n   - Ticketmaster URL (from API, verify in browser): ${c.ticketmasterArtistUrl || 'n/a — not provided by API'}`)
    .join('\n');
  const skipSummaryText = Object.entries(skipLog.reduce((acc, row) => {
    acc[row.reason] = (acc[row.reason] || 0) + 1;
    return acc;
  }, {})).map(([reason, count]) => `- ${reason}: ${count}`).join('\n');
  const report = `# Ticketmaster Discovery Proposal (${today})

## Run summary
- Market scope: ${COUNTRY_CODE ? `countryCode=${COUNTRY_CODE}` : 'all markets'}
- API calls used: ${apiCalls.length}
- Unique upcoming non-cancelled music events: ${allEvents.length}
- Candidate groups passing all filters: ${candidates.length}
- Current repo artist count: ${artists.length}
- Current repo event count: ${repoEventCount}

## Top candidates
${topCandidatesText}

## Skip log summary
${skipSummaryText}

## Safety notes
- This proposal only writes artifacts. No live repo artist/catalog/event data was edited.
- No descriptions are auto-published; candidate metadata only includes \`draft_short_description\` and \`needs_editorial_copy\` placeholders.
`;

  await fs.writeFile(path.join(OUTPUT_DIR, `proposal-${today}.md`), report);
  console.log(`Wrote discovery proposal artifacts to ${OUTPUT_DIR}`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
