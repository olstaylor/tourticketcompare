#!/usr/bin/env node
import fs from 'node:fs/promises';

const DEFAULT_ARTISTS_PATH = new URL('../public/data/artists.json', import.meta.url);

const argv = process.argv.slice(2);
function arg(name) {
  const i = argv.indexOf(name);
  return i >= 0 ? argv[i + 1] : null;
}

const linksPath = arg('--links');
const tmPath = arg('--tm');
const tmStatusPath = arg('--tm-status');
const artistsPathArg = arg('--artists');
const today = arg('--today') || new Date().toISOString().slice(0, 10);
const dryRun = argv.includes('--dry-run');

if (!linksPath) {
  console.error('ERROR: --links <path> required.');
  process.exit(2);
}
if (!tmStatusPath) {
  console.error('ERROR: --tm-status <path> required. The daily audit must write an explicit TM audit status file.');
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

async function main() {
  const tmStatus = await readJson(tmStatusPath);
  if (!tmStatus || tmStatus.status !== 'ok') {
    const detail = tmStatus
      ? `status=${tmStatus.status}${tmStatus.reason ? ` (${tmStatus.reason})` : ''}`
      : `no tm-status.json at ${tmStatusPath}`;
    console.log(`TM audit not confirmed clean (${detail}); skipping all date bumps.`);
    return;
  }

  const links = await readJson(linksPath);
  if (!links) {
    console.error('No link audit JSON found; aborting.');
    process.exit(2);
  }

  const tm = await readJson(tmPath);
  if (!tm) {
    console.error(`TM status reports "ok" but no tm.json found at ${tmPath}; aborting to stay safe.`);
    process.exit(2);
  }

  const failingArtists = new Set();
  const reasons = new Map();
  const note = (slug, reason) => {
    failingArtists.add(slug);
    if (!reasons.has(slug)) reasons.set(slug, reason);
  };

  for (const f of links.failures || []) {
    if (f?.actionable === false || f?.reviewScope === 'expired') continue;
    for (const slug of f.artistSlugs || []) note(slug, 'link failure');
  }
  // A "blocked" link (401/403/429 from an anti-bot WAF) is NOT a confirmed-live
  // link — we never loaded it. Stay conservative: do not bump an artist's
  // last_verified_at on the basis of links we could not actually verify.
  // Links referenced exclusively by expired events cannot affect the live
  // board and are explicitly classified as historical by the link audit.
  for (const b of links.blocked || []) {
    if (b?.actionable === false || b?.reviewScope === 'expired') continue;
    for (const slug of b.artistSlugs || []) note(slug, 'link blocked (unconfirmed, anti-bot/WAF)');
  }
  for (const artist of tm.artists || []) {
    const missing = (artist.missing || []).filter((item) => item?.actionable !== false);
    const changed = (artist.changed || []).filter((item) => item?.actionable !== false);
    const errors = (artist.errors || []).filter((item) => item?.actionable !== false);
    if (missing.length) note(artist.slug, `${missing.length} current TM event(s) missing`);
    else if (changed.length) note(artist.slug, `${changed.length} current TM event(s) changed`);
    else if (errors.length) note(artist.slug, `${errors.length} current TM event check error(s)`);
  }

  const artists = JSON.parse(await fs.readFile(artistsPath, 'utf8'));
  const changes = [];
  const skipped = [];
  for (const artist of artists) {
    if (artist.indexing_status !== 'indexable_with_substantial_content') continue;
    if (failingArtists.has(artist.slug)) {
      skipped.push({ slug: artist.slug, reason: reasons.get(artist.slug) });
      continue;
    }
    if (artist.last_verified_at === today) continue;
    changes.push({ slug: artist.slug, from: artist.last_verified_at, to: today });
    artist.last_verified_at = today;
  }

  if (skipped.length > 0) {
    console.log(`Skipping ${skipped.length} artist(s) due to audit findings:`);
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
