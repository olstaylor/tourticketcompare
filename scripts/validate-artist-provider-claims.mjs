#!/usr/bin/env node
// Fails when an artist in artists.json claims a verified provider that is not
// actually backed by either a catalog.json ticket_links[] row or, for providers
// that require an artist-level /api/out mapping, a VERIFIED_TICKET_LINKS entry
// in functions/api/out.js. This guards against the drift mode where the daily
// bump script keeps refreshing last_verified_at for a verification that has no
// supporting redirect.

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { slugify } from './lib/slugify.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ARTISTS_PATH = path.join(root, 'public/data/artists.json');
const CATALOG_PATH = path.join(root, 'public/data/catalog.json');
const OUT_PATH = path.join(root, 'functions/api/out.js');

// Providers whose artist-level CTAs are dispatched via VERIFIED_TICKET_LINKS in
// functions/api/out.js. Event-level-only providers (e.g. seatgeek) resolve
// click destinations from event records and are intentionally excluded here.
const ARTIST_LEVEL_PROVIDERS = new Set(['ticketmaster']);

async function readJson(p) {
  return JSON.parse(await fs.readFile(p, 'utf8'));
}

async function loadVerifiedTicketLinkKeys() {
  const source = await fs.readFile(OUT_PATH, 'utf8');
  const blockMatch = source.match(/const\s+VERIFIED_TICKET_LINKS\s*=\s*\{([\s\S]*?)\n\};/);
  if (!blockMatch) {
    throw new Error(`Could not locate VERIFIED_TICKET_LINKS block in ${OUT_PATH}`);
  }
  const keys = new Set();
  const keyPattern = /"([a-z0-9-]+):([a-z0-9-]+)"\s*:/g;
  let match;
  while ((match = keyPattern.exec(blockMatch[1])) !== null) {
    keys.add(`${match[1]}:${match[2]}`);
  }
  return keys;
}

function indexCatalogTicketLinks(catalog) {
  const map = new Map();
  for (const link of catalog?.ticket_links || []) {
    const slug = slugify(link?.artist_slug);
    const provider = slugify(link?.provider);
    if (!slug || !provider) continue;
    const key = `${slug}:${provider}`;
    const list = map.get(key) || [];
    list.push(link);
    map.set(key, list);
  }
  return map;
}

async function main() {
  const [artists, catalog, verifiedKeys] = await Promise.all([
    readJson(ARTISTS_PATH),
    readJson(CATALOG_PATH),
    loadVerifiedTicketLinkKeys()
  ]);

  if (!Array.isArray(artists)) {
    console.error(`ERROR: ${ARTISTS_PATH} is not an array`);
    process.exit(2);
  }

  const ticketLinkIndex = indexCatalogTicketLinks(catalog);
  const errors = [];

  for (const artist of artists) {
    const slug = slugify(artist?.slug);
    if (!slug) continue;
    const providers = Array.isArray(artist?.verified_providers) ? artist.verified_providers : [];
    const claimedCount = Number(artist?.verified_provider_count ?? 0);

    if (providers.length !== claimedCount) {
      errors.push(
        `${slug}: verified_provider_count=${claimedCount} does not match verified_providers.length=${providers.length}`
      );
    }

    for (const rawProvider of providers) {
      const provider = slugify(rawProvider);
      if (!provider) {
        errors.push(`${slug}: verified_providers contains an empty entry`);
        continue;
      }
      const key = `${slug}:${provider}`;

      const matchingLinks = ticketLinkIndex.get(key) || [];
      const usableLink = matchingLinks.find(
        (l) => l?.verified === true && l?.public_enabled === true && l?.affiliate_enabled === true
      );
      if (!usableLink) {
        errors.push(
          `${slug}: claims verified provider "${provider}" but catalog.json ticket_links[] has no verified+public_enabled+affiliate_enabled row for that artist/provider`
        );
      }

      if (ARTIST_LEVEL_PROVIDERS.has(provider) && !verifiedKeys.has(key)) {
        errors.push(
          `${slug}: claims verified provider "${provider}" but functions/api/out.js VERIFIED_TICKET_LINKS has no "${key}" entry`
        );
      }
    }
  }

  if (errors.length > 0) {
    console.error('Artist/provider verification claims do not match published routing:');
    for (const err of errors) console.error(`  - ${err}`);
    process.exit(1);
  }

  console.log(`OK: ${artists.length} artist record(s) checked; verified_providers claims match catalog + VERIFIED_TICKET_LINKS.`);
}

main().catch((err) => {
  console.error('validate-artist-provider-claims failed:', err);
  process.exit(2);
});
