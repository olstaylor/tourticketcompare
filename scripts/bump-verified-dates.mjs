#!/usr/bin/env node
import fs from 'node:fs/promises';

const ARTISTS_PATH = new URL('../public/data/artists.json', import.meta.url);

const argv = process.argv.slice(2);
function arg(name) {
  const i = argv.indexOf(name);
  return i >= 0 ? argv[i + 1] : null;
}

const linksPath = arg('--links');
const tmPath = arg('--tm');
const today = arg('--today') || new Date().toISOString().slice(0, 10);
const dryRun = argv.includes('--dry-run');

if (!linksPath) {
  console.error('ERROR: --links <path> required.');
  process.exit(2);
}

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
  const links = await readJson(linksPath);
  const tm = await readJson(tmPath);
  if (!links) {
    console.error('No link audit JSON found; aborting.');
    process.exit(2);
  }

  const failingArtists = new Set();
  for (const f of links.failures || []) {
    for (const slug of f.artistSlugs || []) failingArtists.add(slug);
  }
  if (tm) {
    for (const artist of tm.artists || []) {
      if (artist.missing?.length || artist.changed?.length) failingArtists.add(artist.slug);
    }
  }

  const artists = JSON.parse(await fs.readFile(ARTISTS_PATH, 'utf8'));
  const changes = [];
  for (const artist of artists) {
    if (artist.indexing_status !== 'indexable_with_substantial_content') continue;
    if (failingArtists.has(artist.slug)) continue;
    if (artist.last_verified_at === today) continue;
    changes.push({ slug: artist.slug, from: artist.last_verified_at, to: today });
    artist.last_verified_at = today;
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
  await fs.writeFile(ARTISTS_PATH, output);
  console.log('artists.json updated.');
}

main().catch((err) => {
  console.error('bump-verified-dates failed:', err);
  process.exit(1);
});
