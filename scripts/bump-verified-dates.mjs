#!/usr/bin/env node
import fs from 'node:fs/promises';

const DEFAULT_ARTISTS_PATH = new URL('../public/data/artists.json', import.meta.url);

const argv = process.argv.slice(2);
function arg(name) {
  const i = argv.indexOf(name);
  return i >= 0 ? argv[i + 1] : null;
}

const tmPath = arg('--tm');
const tmStatusPath = arg('--tm-status');
const sgPath = arg('--sg');
const sgStatusPath = arg('--sg-status');
const artistsPathArg = arg('--artists');
const today = arg('--today') || new Date().toISOString().slice(0, 10);
const dryRun = argv.includes('--dry-run');

if (!tmStatusPath) {
  console.error('ERROR: --tm-status <path> required. The daily audit must write an explicit TM audit status file.');
  process.exit(2);
}
if (!sgStatusPath) {
  console.error('ERROR: --sg-status <path> required. The daily audit must write an explicit SeatGeek audit status file.');
  process.exit(2);
}

const artistsPath = artistsPathArg ? new URL(`file://${artistsPathArg.startsWith('/') ? artistsPathArg : process.cwd() + '/' + artistsPathArg}`) : DEFAULT_ARTISTS_PATH;

async function readJson(path) {
  if (!path) return null;
  try {
    const raw = await fs.readFile(path, 'utf8');
    if (!raw.trim()) return null;
    return JSON.parse(raw);
  } catch (err) {
    if (err?.code === 'ENOENT') return null;
    throw err;
  }
}

function indexBySlug(artists) {
  const map = new Map();
  for (const a of artists || []) map.set(a.slug, a);
  return map;
}

// Returns a human-readable reason the artist must NOT be bumped, or null if it
// is fully verified. "Verified" requires positive confirmation: at least one
// event actually checked against the TM API (so zero-event artists are never
// auto-verified), no TM findings, and — since every storefront link must be
// confirmed — no SeatGeek findings either.
function bumpBlockReason(slug, tmBySlug, sgBySlug) {
  const tmA = tmBySlug.get(slug);
  const tmChecked = tmA?.events_checked || 0;
  if (tmChecked === 0) return 'no events confirmed via TM API (nothing checked)';
  if (tmA.missing?.length) return `${tmA.missing.length} TM event(s) missing`;
  if (tmA.changed?.length) return `${tmA.changed.length} TM event(s) changed`;
  if (tmA.errors?.length) return `${tmA.errors.length} TM event check error(s)`;

  const sgA = sgBySlug.get(slug);
  if (sgA) {
    if (sgA.unparsable?.length) return `${sgA.unparsable.length} SeatGeek URL(s) could not be verified (unparsable)`;
    if (sgA.missing?.length) return `${sgA.missing.length} SeatGeek event(s) missing`;
    if (sgA.changed?.length) return `${sgA.changed.length} SeatGeek event(s) changed`;
    if (sgA.errors?.length) return `${sgA.errors.length} SeatGeek event check error(s)`;
  }
  return null;
}

async function main() {
  // Both provider audits must have positively confirmed "ok". If either was
  // skipped or failed we could not verify those links, so we make no claims:
  // skip all date bumps rather than asserting verification we didn't perform.
  const statuses = [
    ['TM', await readJson(tmStatusPath), tmStatusPath],
    ['SeatGeek', await readJson(sgStatusPath), sgStatusPath]
  ];
  for (const [label, status, p] of statuses) {
    if (!status || status.status !== 'ok') {
      const detail = status
        ? `status=${status.status}${status.reason ? ` (${status.reason})` : ''}`
        : `no status file at ${p}`;
      console.log(`${label} audit not confirmed clean (${detail}); skipping all date bumps.`);
      return;
    }
  }

  const tm = await readJson(tmPath);
  if (!tm) {
    console.error(`TM status reports "ok" but no tm.json found at ${tmPath}; aborting to stay safe.`);
    process.exit(2);
  }
  const sg = await readJson(sgPath);
  if (!sg) {
    console.error(`SeatGeek status reports "ok" but no sg.json found at ${sgPath}; aborting to stay safe.`);
    process.exit(2);
  }

  const tmBySlug = indexBySlug(tm.artists);
  const sgBySlug = indexBySlug(sg.artists);

  const artists = JSON.parse(await fs.readFile(artistsPath, 'utf8'));
  const changes = [];
  const skipped = [];
  for (const artist of artists) {
    if (artist.indexing_status !== 'indexable_with_substantial_content') continue;
    const reason = bumpBlockReason(artist.slug, tmBySlug, sgBySlug);
    if (reason) {
      skipped.push({ slug: artist.slug, reason });
      continue;
    }
    if (artist.last_verified_at === today) continue;
    changes.push({ slug: artist.slug, from: artist.last_verified_at, to: today });
    artist.last_verified_at = today;
  }

  if (skipped.length > 0) {
    console.log(`Skipping ${skipped.length} artist(s) — not fully verified:`);
    for (const s of skipped) console.log(`  ${s.slug}: ${s.reason}`);
  }

  if (changes.length === 0) {
    console.log('No artists need a date bump.');
    return;
  }

  console.log(`Bumping last_verified_at for ${changes.length} artist(s):`);
  for (const c of changes) console.log(`  ${c.slug}: ${c.from || 'null'} → ${c.to}`);

  if (dryRun) {
    console.log('--- DRY RUN: artists.json not modified ---');
    return;
  }

  const output = JSON.stringify(artists, null, 2) + '\n';
  await fs.writeFile(artistsPath, output);
  console.log('artists.json updated.');
}

main().catch((err) => {
  console.error('bump-verified-dates failed:', err);
  process.exit(1);
});
