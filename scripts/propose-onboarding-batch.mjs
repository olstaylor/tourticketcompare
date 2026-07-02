#!/usr/bin/env node
// Batch onboarding proposal (proposal-only; never writes data files).
//
// Builds a reviewed-manifest candidate list for onboarding new artists at
// batch scale (10–20 per PR). For each candidate artist name it captures the
// SeatGeek performer identity (id + canonical performer-page URL) from the
// SeatGeek /2/performers API, and — when TICKETMASTER_API_KEY is present —
// the Ticketmaster Discovery attraction id + API-provided canonical artist
// URL. URLs are ALWAYS captured from API responses, never constructed from
// artist names (SAFE_PUBLISHING_RULES).
//
// The output manifest is the input to scripts/promote-artists-batch.mjs and
// to the human spot-check pass: every row carries needs_human_check: true and
// nothing publishes until a human browser-verifies the batch and the promote
// script is run with --write.
//
// Usage:
//   node scripts/propose-onboarding-batch.mjs --names-file <txt with one artist name per line>
//   node scripts/propose-onboarding-batch.mjs --names "Dua Lipa,Coldplay"
//   node scripts/propose-onboarding-batch.mjs --self-test
//
// Options:
//   --names <a,b,c>       Comma-separated artist names
//   --names-file <path>   File with one artist name per line (# comments ok)
//   --output <path>       Manifest path (default artifacts/onboarding/batch-<date>.json)
//   --limit <n>           Max candidates to process (default 20)
//   --delay-ms <n>        Delay between API requests (default 350)
//   --self-test           Offline checks only; no API calls
//
// Environment:
//   SEATGEEK_CLIENT_ID     Required for SeatGeek lookups
//   SEATGEEK_CLIENT_SECRET Optional; sent server-side, always redacted
//   TICKETMASTER_API_KEY   Optional; enables Ticketmaster Discovery capture
//   TTC_TODAY              Optional YYYY-MM-DD override for deterministic runs

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { slugify } from './lib/slugify.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ARTISTS_PATH = path.join(root, 'public/data/artists.json');

// Same-name collision traps that must never onboard silently.
const COLLISION_PATTERN = /\b(tribute|parking|experience|dance party|karaoke|vs\.?|night:|themed|drag brunch|orchestra plays|candlelight)\b/i;

function today() {
  const override = String(process.env.TTC_TODAY || '').trim();
  return /^\d{4}-\d{2}-\d{2}$/.test(override) ? override : new Date().toISOString().slice(0, 10);
}

function normalizeName(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function exactNameMatch(candidateName, apiName) {
  return normalizeName(candidateName) === normalizeName(apiName);
}

function parseArgs(argv) {
  const args = { limit: 20, delayMs: 350, selfTest: false, names: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--names') args.names.push(...String(argv[++i] || '').split(',').map((s) => s.trim()).filter(Boolean));
    else if (a === '--names-file') args.namesFile = argv[++i];
    else if (a === '--output') args.output = argv[++i];
    else if (a === '--limit') args.limit = Math.max(1, Number(argv[++i]) || 20);
    else if (a === '--delay-ms') args.delayMs = Math.max(0, Number(argv[++i]) || 350);
    else if (a === '--self-test') args.selfTest = true;
    else if (a === '-h' || a === '--help') args.help = true;
    else throw new Error(`Unknown argument: ${a}`);
  }
  return args;
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function fetchJson(url) {
  const res = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

function redact(url) {
  return String(url).replace(/(client_id|client_secret|apikey)=[^&]+/gi, '$1=<redacted>');
}

// SeatGeek performer lookup by name: exact normalized-name match wins; the
// API's own slug/url are captured verbatim.
async function lookupSeatGeekPerformer(name, credentials) {
  const params = new URLSearchParams({ q: name, per_page: '10', client_id: credentials.clientId });
  if (credentials.clientSecret) params.set('client_secret', credentials.clientSecret);
  const data = await fetchJson(`https://api.seatgeek.com/2/performers?${params.toString()}`);
  const performers = Array.isArray(data?.performers) ? data.performers : [];
  const exact = performers.filter((p) => exactNameMatch(name, p?.name) && !COLLISION_PATTERN.test(String(p?.name || '')));
  if (!exact.length) return { match: null, candidates: performers.slice(0, 5).map((p) => ({ id: p.id, name: p.name })) };
  // Highest score first when several exact matches exist (rare).
  exact.sort((a, b) => (b?.score || 0) - (a?.score || 0));
  const p = exact[0];
  const url = typeof p?.url === 'string' && /^https:\/\/(www\.)?seatgeek\.com\//i.test(p.url) ? p.url : null;
  if (!p?.id || !url) return { match: null, candidates: exact.slice(0, 5).map((x) => ({ id: x.id, name: x.name })) };
  return {
    match: {
      performer_id: p.id,
      api_name: p.name,
      url,
      num_upcoming_events: Number(p?.num_upcoming_events) || 0,
      score: typeof p?.score === 'number' ? p.score : null
    },
    candidates: []
  };
}

// Ticketmaster Discovery attraction lookup: exact normalized-name match only;
// the Discovery record's own url is captured verbatim (storefront ids differ
// from Discovery ids, so hand-building URLs is forbidden).
async function lookupTicketmasterAttraction(name, apiKey) {
  const params = new URLSearchParams({ keyword: name, size: '10', apikey: apiKey });
  const data = await fetchJson(`https://app.ticketmaster.com/discovery/v2/attractions.json?${params.toString()}`);
  const attractions = data?._embedded?.attractions || [];
  const exact = attractions.filter((a) => exactNameMatch(name, a?.name) && !COLLISION_PATTERN.test(String(a?.name || '')));
  if (!exact.length) return null;
  const a = exact[0];
  const url = typeof a?.url === 'string' && /^https:\/\//i.test(a.url) ? a.url : null;
  if (!a?.id || !url) return null;
  return {
    attraction_id: a.id,
    api_name: a.name,
    url,
    upcoming_events: Number(a?.upcomingEvents?._total) || 0
  };
}

function buildRow(name, existingSlugs, sg, tm) {
  if (COLLISION_PATTERN.test(name)) {
    return { name, exclusion: 'name matches the collision pattern (tribute/parking/etc.) — never onboard automatically' };
  }
  if (!sg?.match) {
    return { name, exclusion: 'no exact-name SeatGeek performer match — identity unresolved', seatgeek_candidates: sg?.candidates || [] };
  }
  const slug = slugify(sg.match.api_name);
  if (!slug) return { name, exclusion: 'could not derive a slug from the API name' };
  if (existingSlugs.has(slug)) {
    return { name, slug, exclusion: 'slug already present in artists.json' };
  }
  return {
    name: sg.match.api_name,
    slug,
    seatgeek: {
      performer_id: sg.match.performer_id,
      url: sg.match.url,
      num_upcoming_events: sg.match.num_upcoming_events,
      score: sg.match.score,
      exact_name_match: true
    },
    ticketmaster: tm
      ? { attraction_id: tm.attraction_id, url: tm.url, upcoming_events: tm.upcoming_events, exact_name_match: true }
      : null,
    confidence: tm ? 'seatgeek+ticketmaster exact-name' : 'seatgeek exact-name only',
    needs_human_check: true,
    exclusion: null
  };
}

function selfTest() {
  const checks = [];
  const ok = (label, cond) => checks.push([label, Boolean(cond)]);

  ok('exact name match is accent/case-insensitive', exactNameMatch('ROSALÍA', 'Rosalia'));
  ok('exact name match rejects different artists', !exactNameMatch('Bruno Mars', 'Bruno Mars Tribute'));
  ok('collision pattern catches tribute acts', COLLISION_PATTERN.test('The Ultimate Bruno Mars Tribute'));
  ok('collision pattern catches parking listings', COLLISION_PATTERN.test('PARKING: Morgan Wallen'));
  ok('collision pattern leaves real names alone', !COLLISION_PATTERN.test('Morgan Wallen'));

  const existing = new Set(['bruno-mars']);
  const sgMatch = { match: { performer_id: 1, api_name: 'New Artist', url: 'https://seatgeek.com/new-artist-tickets', num_upcoming_events: 5, score: 0.7 }, candidates: [] };
  ok('existing slug is excluded', buildRow('Bruno Mars', existing, { match: { performer_id: 6148, api_name: 'Bruno Mars', url: 'https://seatgeek.com/bruno-mars-tickets', num_upcoming_events: 1, score: 1 } }, null).exclusion !== null);
  ok('unresolved identity is excluded', buildRow('Somebody', existing, { match: null, candidates: [] }, null).exclusion !== null);
  const row = buildRow('New Artist', existing, sgMatch, null);
  ok('clean candidate carries needs_human_check', row.exclusion === null && row.needs_human_check === true);
  ok('clean candidate keeps the API url verbatim', row.seatgeek.url === 'https://seatgeek.com/new-artist-tickets');

  const failed = checks.filter(([, pass]) => !pass);
  for (const [label, pass] of checks) console.log(`${pass ? 'PASS' : 'FAIL'}  ${label}`);
  console.log(`\n${checks.length - failed.length}/${checks.length} checks passed.`);
  process.exit(failed.length ? 1 : 0);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) {
    console.log('See the header comment in scripts/propose-onboarding-batch.mjs for usage.');
    return;
  }
  if (args.selfTest) return selfTest();

  let names = [...args.names];
  if (args.namesFile) {
    const raw = await fs.readFile(path.resolve(args.namesFile), 'utf8');
    names.push(...raw.split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#')));
  }
  names = [...new Set(names)].slice(0, args.limit);
  if (!names.length) {
    console.error('No candidate names given. Pass --names or --names-file (or run --self-test).');
    process.exit(2);
  }

  const clientId = String(process.env.SEATGEEK_CLIENT_ID || '').trim();
  const clientSecret = String(process.env.SEATGEEK_CLIENT_SECRET || '').trim();
  if (!clientId) {
    console.error('SEATGEEK_CLIENT_ID is required — SeatGeek identity capture is the anchor of batch onboarding.');
    process.exit(2);
  }
  const tmApiKey = String(process.env.TICKETMASTER_API_KEY || '').trim();
  const credentials = { clientId, clientSecret };

  const artists = JSON.parse(await fs.readFile(ARTISTS_PATH, 'utf8'));
  const existingSlugs = new Set(artists.map((a) => slugify(a?.slug)).filter(Boolean));

  const rows = [];
  for (const name of names) {
    await sleep(args.delayMs);
    let sg = { match: null, candidates: [] };
    try {
      sg = await lookupSeatGeekPerformer(name, credentials);
    } catch (err) {
      rows.push({ name, exclusion: `SeatGeek lookup failed: ${err.message}` });
      continue;
    }
    let tm = null;
    if (tmApiKey && sg.match) {
      await sleep(args.delayMs);
      try {
        tm = await lookupTicketmasterAttraction(name, tmApiKey);
      } catch (err) {
        console.error(`  (ticketmaster lookup failed for "${name}": ${err.message} — proceeding SeatGeek-only)`);
      }
    }
    rows.push(buildRow(name, existingSlugs, sg, tm));
  }

  const included = rows.filter((r) => !r.exclusion);
  const excluded = rows.filter((r) => r.exclusion);
  const manifest = {
    generated_at: today(),
    source: 'propose-onboarding-batch.mjs — SeatGeek /2/performers (+ optional Ticketmaster Discovery attractions), exact-name matches only, URLs captured from API responses',
    ticketmaster_capture_enabled: Boolean(tmApiKey),
    needs_human_check: true,
    artists: included,
    excluded
  };

  const outputPath = path.resolve(args.output || path.join(root, 'artifacts/onboarding', `batch-${today()}.json`));
  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, `${JSON.stringify(manifest, null, 2)}\n`);

  console.log(`\nManifest written: ${path.relative(root, outputPath)}`);
  console.log(`  included: ${included.length}   excluded: ${excluded.length}`);
  for (const r of included) console.log(`  + ${r.slug}  (SG performer ${r.seatgeek.performer_id}, ${r.seatgeek.num_upcoming_events} upcoming${r.ticketmaster ? `; TM ${r.ticketmaster.attraction_id}` : '; no TM capture'})`);
  for (const r of excluded) console.log(`  - ${r.name}: ${r.exclusion}`);
  console.log('\nNext: create shells for the included slugs (artists:tm-shell-pr or manual shell PR),');
  console.log('human-review the manifest, then run scripts/promote-artists-batch.mjs --manifest <path>.');
}

main().catch((err) => {
  console.error(`propose-onboarding-batch failed: ${redact(err.message || String(err))}`);
  process.exit(2);
});
