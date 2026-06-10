#!/usr/bin/env node
/**
 * validate-provider-identities.mjs
 *
 * Read-only validation of data/provider-identities.json (the provider
 * identity registry — see docs/PROVIDER_SYNC.md).
 *
 * Enforces:
 *   - registry slugs map 1:1 onto public/data/artists.json (no unknown
 *     artists carry provider IDs; no artist is missing an entry);
 *   - field shapes/types and the review_status enum;
 *   - sync_enabled only for promoted, Ticketmaster-verified, indexable
 *     artists whose entry is review_status "verified" with a populated
 *     ticketmaster_attraction_id;
 *   - ticketmaster_artist_url hostname is in the existing
 *     PROVIDERS.ticketmaster.allowedDestinationHosts allowlist in
 *     functions/api/out.js (parsed as text — the allowlist is the source of
 *     truth and is never modified here);
 *   - no SeatGeek URLs anywhere in the registry (only the numeric
 *     seatgeek_performer_id is supported until SeatGeek enrichment is
 *     explicitly scoped);
 *   - "withheld" entries carry a notes explanation.
 *
 * Hard constraints honoured:
 *   - No external network calls.
 *   - No imports of runtime code (text-only parsing of out.js).
 *   - Does not change provider state, CTA behaviour, or affiliate logic.
 *
 * Exit codes: 0 PASS (warnings allowed), 1 FAIL.
 */

import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const REGISTRY_PATH = resolve(ROOT, 'data/provider-identities.json');
const ARTISTS_PATH = resolve(ROOT, 'public/data/artists.json');
const OUT_JS_PATH = resolve(ROOT, 'functions/api/out.js');

const REVIEW_STATUSES = new Set(['unverified', 'verified', 'withheld']);

const errors = [];
const warnings = [];
const fail = msg => errors.push(msg);
const warn = msg => warnings.push(msg);

function loadJson(path) {
  return JSON.parse(readFileSync(path, 'utf8'));
}

/** Extract PROVIDERS.ticketmaster.allowedDestinationHosts from out.js text. */
function ticketmasterAllowedHosts() {
  const text = readFileSync(OUT_JS_PATH, 'utf8');
  const tmPos = text.indexOf('ticketmaster:');
  if (tmPos === -1) return null;
  const listPos = text.indexOf('allowedDestinationHosts', tmPos);
  if (listPos === -1) return null;
  const open = text.indexOf('[', listPos);
  const close = text.indexOf(']', open);
  if (open === -1 || close === -1) return null;
  const hosts = [...text.slice(open, close).matchAll(/["']([^"'\r\n]+)["']/g)].map(m => m[1]);
  return hosts.length ? hosts : null;
}

function hostAllowed(hostname, allowedHosts) {
  const h = hostname.toLowerCase();
  return allowedHosts.some(allowed => h === allowed || h.endsWith(`.${allowed}`));
}

// ─── Load sources ───────────────────────────────────────────────────────────

let registry, artists;
try {
  registry = loadJson(REGISTRY_PATH);
} catch (e) {
  console.error(`FAIL: cannot read/parse ${REGISTRY_PATH}: ${e.message}`);
  process.exit(1);
}
try {
  artists = loadJson(ARTISTS_PATH);
} catch (e) {
  console.error(`FAIL: cannot read/parse ${ARTISTS_PATH}: ${e.message}`);
  process.exit(1);
}

const allowedHosts = ticketmasterAllowedHosts();
if (!allowedHosts) {
  fail('could not parse PROVIDERS.ticketmaster.allowedDestinationHosts from functions/api/out.js');
}

const artistBySlug = new Map(artists.map(a => [a.slug, a]));
const entries = Array.isArray(registry.artists) ? registry.artists : null;
if (!entries) {
  console.error('FAIL: registry has no "artists" array');
  process.exit(1);
}

// ─── Per-entry checks ───────────────────────────────────────────────────────

const seenSlugs = new Set();

for (const entry of entries) {
  const slug = entry?.slug;
  const tag = `entry "${slug ?? '<missing slug>'}"`;

  if (typeof slug !== 'string' || !slug) {
    fail(`${tag}: missing or non-string slug`);
    continue;
  }
  if (seenSlugs.has(slug)) fail(`${tag}: duplicate slug`);
  seenSlugs.add(slug);

  const artist = artistBySlug.get(slug);
  if (!artist) {
    fail(`${tag}: slug not present in public/data/artists.json — provider IDs may only be attached to known artists`);
    continue;
  }

  // Types
  const { ticketmaster_attraction_id: tmId, ticketmaster_artist_url: tmUrl,
          seatgeek_performer_id: sgId, sync_enabled: syncEnabled,
          last_synced_at: lastSynced, review_status: reviewStatus, notes } = entry;

  if (tmId !== null && (typeof tmId !== 'string' || !tmId.trim()))
    fail(`${tag}: ticketmaster_attraction_id must be null or a non-empty string`);
  if (tmUrl !== null && typeof tmUrl !== 'string')
    fail(`${tag}: ticketmaster_artist_url must be null or a string`);
  if (sgId !== null && !Number.isInteger(sgId))
    fail(`${tag}: seatgeek_performer_id must be null or an integer (no SeatGeek URLs)`);
  if (typeof syncEnabled !== 'boolean')
    fail(`${tag}: sync_enabled must be a boolean`);
  if (lastSynced !== null && !/^\d{4}-\d{2}-\d{2}$/.test(String(lastSynced)))
    fail(`${tag}: last_synced_at must be null or YYYY-MM-DD`);
  if (!REVIEW_STATUSES.has(reviewStatus))
    fail(`${tag}: review_status must be one of ${[...REVIEW_STATUSES].join(', ')}`);
  if (notes !== null && typeof notes !== 'string')
    fail(`${tag}: notes must be null or a string`);

  // No SeatGeek URLs anywhere in the entry until explicitly supported.
  for (const [key, value] of Object.entries(entry)) {
    if (typeof value === 'string' && /seatgeek\.com/i.test(value))
      fail(`${tag}: field "${key}" contains a seatgeek.com URL — SeatGeek URLs are not supported in the registry`);
  }

  // TM URL must pass the existing host allowlist.
  if (typeof tmUrl === 'string' && tmUrl && allowedHosts) {
    let parsed = null;
    try {
      parsed = new URL(tmUrl);
    } catch {
      fail(`${tag}: ticketmaster_artist_url is not a valid URL`);
    }
    if (parsed) {
      if (parsed.protocol !== 'https:')
        fail(`${tag}: ticketmaster_artist_url must be https`);
      if (!hostAllowed(parsed.hostname, allowedHosts))
        fail(`${tag}: ticketmaster_artist_url host "${parsed.hostname}" is not in the out.js Ticketmaster allowlist`);
    }
  }

  // Withheld entries must explain why.
  if (reviewStatus === 'withheld' && (!notes || !notes.trim()))
    fail(`${tag}: review_status "withheld" requires a notes explanation`);

  // sync_enabled gating: promoted + TM-verified + verified review + attraction ID.
  if (syncEnabled === true) {
    if (artist.indexing_status !== 'indexable_with_substantial_content')
      fail(`${tag}: sync_enabled requires indexing_status "indexable_with_substantial_content" (found "${artist.indexing_status}")`);
    if (!(artist.verified_providers || []).includes('ticketmaster'))
      fail(`${tag}: sync_enabled requires artist verified_providers to include "ticketmaster"`);
    if (reviewStatus !== 'verified')
      fail(`${tag}: sync_enabled requires review_status "verified" (found "${reviewStatus}")`);
    if (!tmId)
      fail(`${tag}: sync_enabled requires a populated ticketmaster_attraction_id`);
  }

  // Consistency hints (non-fatal).
  if (reviewStatus === 'verified' && !tmId)
    warn(`${tag}: review_status "verified" but no ticketmaster_attraction_id — verify-and-populate should happen together`);
  if (tmId && reviewStatus === 'unverified')
    warn(`${tag}: ticketmaster_attraction_id populated while review_status is "unverified" — set "verified" or "withheld"`);
}

// Every artist should have a registry entry (warning only — keeps onboarding
// PRs from hard-failing if the registry update lands separately).
for (const a of artists) {
  if (!seenSlugs.has(a.slug))
    warn(`artists.json slug "${a.slug}" has no entry in data/provider-identities.json`);
}

// ─── Report ─────────────────────────────────────────────────────────────────

for (const w of warnings) console.log(`WARN: ${w}`);
for (const e of errors) console.error(`FAIL: ${e}`);
console.log(
  `\nprovider-identities: ${entries.length} entries, ${errors.length} error(s), ${warnings.length} warning(s) — ${errors.length ? 'FAIL' : 'PASS'}`
);
process.exit(errors.length ? 1 : 0);
