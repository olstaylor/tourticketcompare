#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const readJson = (rel) => JSON.parse(fs.readFileSync(path.join(root, rel), 'utf8'));
const normalize = (v) => (typeof v === 'string' ? v.trim() : '');

const artists = readJson('public/data/artists.json');
const catalog = readJson('public/data/catalog.json');
const events = readJson('public/data/events.json');
const eventsIndex = readJson('public/data/events-index.json');

const artistMap = new Map(artists.map((a) => [normalize(a.slug), normalize(a.name)]));
const catalogArtists = Array.isArray(catalog?.artists) ? catalog.artists : [];
const catalogMap = new Map(catalogArtists.map((a) => [normalize(a.slug), normalize(a.name)]));

const perArtist = new Map();
const perArtistTmVerified = new Map();
const missingArtistSlug = [];
const artistNameMismatch = [];
const tmIdUrlMismatch = [];
const duplicateGroups = new Map();

for (const event of events) {
  const slug = normalize(event.artist_slug);
  const name = normalize(event.artist_name);
  perArtist.set(slug, (perArtist.get(slug) ?? 0) + 1);

  const tmVerified = normalize(event.ticketmaster_url).includes('/event/');
  if (tmVerified) perArtistTmVerified.set(slug, (perArtistTmVerified.get(slug) ?? 0) + 1);

  if (!artistMap.has(slug)) {
    missingArtistSlug.push(`${event.id || '(no-id)'}:${slug || '(blank)'}`);
  } else if (name && artistMap.get(slug) !== name) {
    artistNameMismatch.push(`${event.id || '(no-id)'}:${slug} event='${name}' artists='${artistMap.get(slug)}'`);
  }

  const tmId = normalize(event.ticketmaster_event_id);
  const tmUrl = normalize(event.ticketmaster_url);
  if (tmId && tmUrl && !tmUrl.includes(tmId)) {
    tmIdUrlMismatch.push(`${event.id || '(no-id)'}:${tmId}`);
  }

  const date = normalize(event.datetime_iso).slice(0, 10);
  const dedupeKey = [slug, normalize(event.venue).toLowerCase(), normalize(event.city).toLowerCase(), normalize(event.country).toLowerCase(), date].join('|');
  if (!duplicateGroups.has(dedupeKey)) duplicateGroups.set(dedupeKey, []);
  duplicateGroups.get(dedupeKey).push(event.id || '(no-id)');
}

const semanticDuplicates = [...duplicateGroups.entries()]
  .filter(([, ids]) => ids.length > 1)
  .map(([key, ids]) => ({ key, ids }));

const indexIds = new Set(eventsIndex.map((e) => normalize(e.id)).filter(Boolean));
const eventIds = new Set(events.map((e) => normalize(e.id)).filter(Boolean));
const indexMissing = [...eventIds].filter((id) => !indexIds.has(id));
const eventsMissing = [...indexIds].filter((id) => !eventIds.has(id));

const partitionFiles = fs.readdirSync(path.join(root, 'public/data/events')).filter((f) => f.endsWith('.json'));
const partitionWarnings = [];
let partitionEventTotal = 0;

for (const file of partitionFiles) {
  const slug = file.replace(/\.json$/, '');
  const partitionEvents = readJson(path.join('public/data/events', file));
  partitionEventTotal += partitionEvents.length;
  const mismatched = partitionEvents.filter((e) => normalize(e.artist_slug) !== slug).length;
  if (mismatched > 0) partitionWarnings.push(`${file}: ${mismatched} event(s) with mismatched artist_slug`);
  const expectedCount = perArtist.get(slug) ?? 0;
  if (expectedCount !== partitionEvents.length) partitionWarnings.push(`${file}: partition=${partitionEvents.length}, events.json=${expectedCount}`);
}
if (partitionEventTotal !== events.length) {
  partitionWarnings.push(`partition total=${partitionEventTotal}, events.json total=${events.length}`);
}

console.log('=== Data Stats Snapshot ===');
console.log(`artists.json artist count: ${artists.length}`);
console.log(`catalog.json artist count: ${catalogArtists.length}`);
console.log(`events.json event count: ${events.length}`);
console.log(`events-index.json event count: ${eventsIndex.length}`);
console.log('');

console.log('Per-artist event counts (events.json):');
for (const slug of [...perArtist.keys()].sort()) {
  const total = perArtist.get(slug) ?? 0;
  const tmCount = perArtistTmVerified.get(slug) ?? 0;
  console.log(`- ${slug}: events=${total}, ticketmaster_verified=${tmCount}`);
}

const printList = (title, arr) => {
  if (arr.length === 0) {
    console.log(`\n${title}: none`);
    return;
  }
  console.log(`\n${title}: ${arr.length}`);
  for (const item of arr.slice(0, 10)) console.log(`- ${item}`);
  if (arr.length > 10) console.log(`- ... (${arr.length - 10} more)`);
};

printList('Missing artist_slug in artists.json', missingArtistSlug);
printList('artist_name mismatch vs artists.json', artistNameMismatch);
printList('ticketmaster_event_id not present in ticketmaster_url', tmIdUrlMismatch);

const consistencyWarnings = [];
if (artists.length !== catalogArtists.length) consistencyWarnings.push(`artist counts differ (artists.json=${artists.length}, catalog.json=${catalogArtists.length})`);
const catalogMissingInArtists = [...catalogMap.keys()].filter((slug) => !artistMap.has(slug));
if (catalogMissingInArtists.length) consistencyWarnings.push(`catalog slugs missing in artists.json: ${catalogMissingInArtists.join(', ')}`);
if (indexMissing.length) consistencyWarnings.push(`events missing from events-index.json: ${indexMissing.length}`);
if (eventsMissing.length) consistencyWarnings.push(`events-index.json missing from events.json: ${eventsMissing.length}`);

printList('Partition/index consistency warnings', [...consistencyWarnings, ...partitionWarnings]);
printList(
  'Semantic duplicate groups (artist+venue+city+country+date)',
  semanticDuplicates.map((g) => `${g.key} -> ${g.ids.join(', ')}`)
);
