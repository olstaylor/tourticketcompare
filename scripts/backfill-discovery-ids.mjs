#!/usr/bin/env node
// Backfill `ticketmaster_discovery_event_id` for events that only carry a
// consumer-website event code (16-char hex) or an international numeric id.
//
// The daily audit (scripts/audit-tm-events.mjs) queries the Ticketmaster
// Discovery API, which is keyed by the Discovery event id — NOT the website
// `/event/<id>` code stored in `ticketmaster_event_id`. Events missing a
// Discovery id are reported "unresolvable" and cannot be verified. This script
// recovers the correct Discovery id from the verified per-artist attraction
// feed (`/discovery/v2/events.json?attractionId=...`) by matching on the
// venue-local date (parsed from the storefront URL, which is timezone-correct)
// and city. It never invents data: an id is written only on an unambiguous
// API match, and only `ticketmaster_discovery_event_id` /
// `provider_links.ticketmaster.discovery_event_id` are touched — the verified
// `ticketmaster_event_id` and `ticketmaster_url` are left exactly as-is.
//
// Usage:
//   node scripts/backfill-discovery-ids.mjs            # dry-run (default)
//   node scripts/backfill-discovery-ids.mjs --apply    # write public/data/events.json
import fs from 'node:fs/promises';

const EVENTS_PATH = new URL('../public/data/events.json', import.meta.url);
const IDENTITIES_PATH = new URL('../data/provider-identities.json', import.meta.url);
const BASE = (process.env.TICKETMASTER_DISCOVERY_BASE_URL || 'https://app.ticketmaster.com/discovery/v2').replace(/\/+$/, '');

const apply = process.argv.includes('--apply');
const apiKey = String(process.env.TICKETMASTER_API_KEY || '').trim();
if (!apiKey) {
  console.error('ERROR: TICKETMASTER_API_KEY is not set.');
  process.exit(2);
}

const clean = (v) => String(v ?? '').trim();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const normCity = (c) =>
  clean(c).toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z]/g, '');

// Same id-format test as scripts/audit-tm-events.mjs: a Discovery-format id is
// mixed-case alphanumeric, never a pure-numeric storefront id or a 16-char
// uppercase-hex consumer-website event code.
function isDiscoveryFormatId(value) {
  const id = clean(value);
  if (!id) return false;
  if (/^[0-9]+$/.test(id)) return false;
  if (/^[0-9A-F]{16}$/.test(id)) return false;
  if (/\.html?$/i.test(id)) return false;
  return /^[A-Za-z0-9_-]{6,20}$/.test(id);
}

// Venue-local calendar date from the UTC `datetime_iso` and the event's IANA
// `timezone`. This is locale-independent (storefront URL slugs use MM-DD-YYYY in
// the US but DD-MM-YYYY in the UK/EU) and matches the Discovery feed's
// `dates.start.localDate` exactly.
function localDate(event) {
  const iso = clean(event?.datetime_iso);
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  const tz = clean(event?.timezone) || 'UTC';
  try {
    return new Intl.DateTimeFormat('en-CA', { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit' }).format(d);
  } catch {
    return iso.slice(0, 10);
  }
}

function hasDiscoveryId(event) {
  return Boolean(
    clean(event?.ticketmaster_discovery_event_id) ||
      clean(event?.provider_links?.ticketmaster?.discovery_event_id)
  );
}

function setDiscoveryId(event, discId) {
  event.ticketmaster_discovery_event_id = discId;
  if (event.provider_links?.ticketmaster) event.provider_links.ticketmaster.discovery_event_id = discId;
}

async function eventResolves(discId) {
  const url = `${BASE}/events/${encodeURIComponent(discId)}.json?apikey=${encodeURIComponent(apiKey)}`;
  try {
    const res = await fetch(url, { headers: { 'user-agent': 'TTC-discovery-backfill/1.0' } });
    return res.ok;
  } catch {
    return false;
  }
}

async function fetchAttractionEvents(attractionId) {
  const out = [];
  for (let page = 0; page < 5; page += 1) {
    const url = `${BASE}/events.json?attractionId=${encodeURIComponent(attractionId)}&size=199&page=${page}&sort=date,asc&apikey=${encodeURIComponent(apiKey)}`;
    const res = await fetch(url, { headers: { 'user-agent': 'TTC-discovery-backfill/1.0' } });
    if (!res.ok) {
      console.warn(`  WARN attraction ${attractionId} page ${page}: HTTP ${res.status}`);
      break;
    }
    const json = await res.json().catch(() => null);
    const events = json?._embedded?.events || [];
    for (const e of events) {
      const venue = e?._embedded?.venues?.[0];
      out.push({
        discId: clean(e.id),
        localDate: clean(e?.dates?.start?.localDate),
        dateTime: clean(e?.dates?.start?.dateTime),
        city: clean(venue?.city?.name),
        venue: clean(venue?.name),
        cc: clean(venue?.country?.countryCode),
        status: clean(e?.dates?.status?.code)
      });
    }
    const totalPages = json?.page?.totalPages ?? 1;
    if (page + 1 >= totalPages) break;
    await sleep(200);
  }
  return out;
}

function matchOne(event, feed) {
  const targetDate = localDate(event);
  if (!targetDate) return { status: 'no-date' };
  const city = normCity(event.city);

  const byDate = feed.filter((f) => f.localDate === targetDate);
  if (byDate.length === 0) return { status: 'no-feed-match', targetDate };

  let cand = city ? byDate.filter((f) => normCity(f.city) === city) : byDate;
  if (cand.length === 0) cand = byDate; // city spelling mismatch — fall back to date alone

  if (cand.length === 1) return { status: 'matched', discId: cand[0].discId };

  // Multiple same-date candidates: disambiguate by exact UTC start time, then venue.
  const iso = clean(event.datetime_iso);
  const byTime = cand.filter((f) => f.dateTime && new Date(f.dateTime).getTime() === new Date(iso).getTime());
  if (byTime.length === 1) return { status: 'matched', discId: byTime[0].discId };

  const venue = normCity(event.venue);
  const byVenue = cand.filter((f) => normCity(f.venue) === venue);
  if (byVenue.length === 1) return { status: 'matched', discId: byVenue[0].discId };

  return { status: 'ambiguous', count: cand.length, targetDate };
}

async function main() {
  const events = JSON.parse(await fs.readFile(EVENTS_PATH, 'utf8'));
  const identities = JSON.parse(await fs.readFile(IDENTITIES_PATH, 'utf8'));
  const attractionBySlug = new Map();
  for (const a of identities.artists || []) {
    if (clean(a.ticketmaster_attraction_id) && a.review_status === 'verified') {
      attractionBySlug.set(a.slug, clean(a.ticketmaster_attraction_id));
    }
  }

  const targetsBySlug = new Map();
  for (const e of events) {
    if (!clean(e.ticketmaster_event_id)) continue;
    if (hasDiscoveryId(e)) continue;
    if (!targetsBySlug.has(e.artist_slug)) targetsBySlug.set(e.artist_slug, []);
    targetsBySlug.get(e.artist_slug).push(e);
  }

  const stats = { exactCopy: 0, matched: 0, ambiguous: 0, noFeed: 0, noDate: 0, noAttraction: 0 };
  const unmatched = [];

  for (const [slug, targets] of [...targetsBySlug.entries()].sort()) {
    // Tier 1 — exact: when `ticketmaster_event_id` is already a Discovery-format
    // id and resolves on the Discovery API, copy it directly. No fuzzy matching.
    const needFeed = [];
    for (const e of targets) {
      const legacy = clean(e.ticketmaster_event_id);
      if (isDiscoveryFormatId(legacy) && (await eventResolves(legacy))) {
        setDiscoveryId(e, legacy);
        stats.exactCopy += 1;
      } else {
        needFeed.push(e);
      }
      await sleep(120);
    }

    // Tier 2 — feed match: recover the id from the artist's attraction feed.
    const aid = attractionBySlug.get(slug);
    if (!aid) {
      stats.noAttraction += needFeed.length;
      for (const e of needFeed) unmatched.push({ slug, id: e.id, hex: clean(e.ticketmaster_event_id), reason: 'no-attraction' });
      console.log(`${slug}: ${targets.length} target(s), ${stats.exactCopy} exact, no attraction id for ${needFeed.length} remaining`);
      continue;
    }
    const feed = needFeed.length ? await fetchAttractionEvents(aid) : [];
    let m = 0;
    for (const e of needFeed) {
      const r = matchOne(e, feed);
      if (r.status === 'matched') {
        setDiscoveryId(e, r.discId);
        stats.matched += 1;
        m += 1;
      } else {
        if (r.status === 'ambiguous') stats.ambiguous += 1;
        else if (r.status === 'no-feed-match') stats.noFeed += 1;
        else if (r.status === 'no-date') stats.noDate += 1;
        unmatched.push({ slug, id: e.id, hex: clean(e.ticketmaster_event_id), reason: r.status, targetDate: r.targetDate, count: r.count });
      }
    }
    console.log(`${slug}: ${targets.length} target(s) — feed=${feed.length}, ${m} feed-matched, ${needFeed.length - m} unmatched`);
  }

  console.log('\n=== Summary ===');
  console.log(stats);
  const written = stats.exactCopy + stats.matched;
  if (unmatched.length) {
    console.log(`\nUnmatched (${unmatched.length}) — left untouched (no Discovery id written):`);
    for (const u of unmatched) console.log(`  ${u.slug} ${u.id} [${u.hex}] ${u.reason}${u.targetDate ? ' date=' + u.targetDate : ''}${u.count ? ' candidates=' + u.count : ''}`);
  }

  if (apply && written > 0) {
    await fs.writeFile(EVENTS_PATH, JSON.stringify(events, null, 2) + '\n');
    console.log(`\nAPPLIED: wrote ${written} discovery id(s) to public/data/events.json`);
  } else {
    console.log(`\nDRY RUN: no files written. Re-run with --apply to write ${written} id(s).`);
  }
}

main().catch((err) => {
  console.error('backfill-discovery-ids failed:', err);
  process.exit(1);
});
