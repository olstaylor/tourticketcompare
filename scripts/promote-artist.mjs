#!/usr/bin/env node
// Promote-phase scaffold: generates the exact edits for promoting a shell
// artist to indexable_with_substantial_content with a verified Ticketmaster
// CTA. It does NOT verify the URL is live — the human browser verification
// required by .claude/skills/artist-onboarding/SKILL.md (Phase 3 pre-condition) must
// happen the same day, BEFORE running with --write.
//
// Usage:
//   npm run artist:promote -- --slug <slug>                                        (dry run, URL from API artifact)
//   npm run artist:promote -- --slug <slug> --url <human-verified-tm-url>          (dry run, explicit URL)
//   npm run artist:promote -- --slug <slug> [--url <...>] --write
//
// The Ticketmaster URL is sourced, in order of preference, from:
//   1. the discovery artifact's API-captured `ticketmasterArtistUrl` for this
//      slug (artifacts/tm-discovery/candidates.json, or TM_DISCOVERY_ARTIFACT_DIR), or
//   2. an explicit --url (which must be a browser-verified canonical URL).
// NEVER construct the URL from the artist name — the storefront id differs from
// the Discovery id. If both sources are present and disagree, the script warns.
//
// Exit code 0 = preview printed or edits applied
// Exit code 1 = refused (slug not promotable, URL rejected, data inconsistent)
// Exit code 2 = script error (bad args, unreadable files)

import fs from 'node:fs/promises';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const PATHS = {
  artists: path.join(root, 'public/data/artists.json'),
  catalog: path.join(root, 'public/data/catalog.json'),
  out:     path.join(root, 'functions/api/out.js'),
};

const ARTIFACT_DIR = process.env.TM_DISCOVERY_ARTIFACT_DIR
  ? path.resolve(process.env.TM_DISCOVERY_ARTIFACT_DIR)
  : path.join(root, 'artifacts/tm-discovery');

// The canonical Ticketmaster URL captured from the Discovery API at proposal
// time. Returns null if there is no artifact or no captured URL for this slug.
async function resolveArtifactUrl(slug) {
  try {
    const candidates = JSON.parse(await fs.readFile(path.join(ARTIFACT_DIR, 'candidates.json'), 'utf8'));
    const match = Array.isArray(candidates) ? candidates.find((c) => c?.slug === slug) : null;
    const u = match?.ticketmasterArtistUrl;
    return typeof u === 'string' && u.trim() ? u.trim() : null;
  } catch {
    return null;
  }
}

const PLACEHOLDER_PATTERN = /example\.com|placeholder|your-link|replace-me|localhost|127\.0\.0\.1|tbd/i;
const VTL_BLOCK_PATTERN = /const\s+VERIFIED_TICKET_LINKS\s*=\s*\{([\s\S]*?)\n\};/;

function parseArgs(argv) {
  const args = { write: false };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--slug') args.slug = argv[++i];
    else if (argv[i] === '--url') args.url = argv[++i];
    else if (argv[i] === '--write') args.write = true;
    else {
      console.error(`Unknown argument: ${argv[i]}`);
      return null;
    }
  }
  return args;
}

function refuse(msg) {
  console.error(`REFUSED: ${msg}`);
  process.exit(1);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (!args || !args.slug) {
    console.error('Usage: npm run artist:promote -- --slug <slug> [--url <verified-url>] [--write]');
    process.exit(2);
  }

  const slug = String(args.slug).trim().toLowerCase();
  const today = new Date().toISOString().slice(0, 10);

  // ── Resolve the Ticketmaster URL from the API artifact, never the name ──────
  const explicitUrl = args.url ? String(args.url).trim() : null;
  const artifactUrl = await resolveArtifactUrl(slug);
  let url;
  let urlSource;
  if (explicitUrl) {
    url = explicitUrl;
    urlSource = '--url flag';
    if (artifactUrl && artifactUrl !== explicitUrl) {
      console.error('\nWARNING: --url differs from the API-captured URL in the discovery artifact:');
      console.error(`  --url (you):   ${explicitUrl}`);
      console.error(`  API artifact:  ${artifactUrl}`);
      console.error('Proceeding with --url. Confirm it is the browser-verified canonical URL, not a hand-built one.\n');
    }
  } else if (artifactUrl) {
    url = artifactUrl;
    urlSource = 'discovery artifact (API-captured)';
  } else {
    refuse(`No --url given and no API-captured ticketmasterArtistUrl for "${slug}" in ${path.relative(root, ARTIFACT_DIR)}/candidates.json. Re-run the discovery proposal (it captures the API URL), or pass --url with a browser-verified Ticketmaster URL. Do NOT construct the URL from the artist name.`);
  }

  // ── URL validation ─────────────────────────────────────────────────────────

  if (PLACEHOLDER_PATTERN.test(url)) {
    refuse(`URL contains a placeholder/dev marker: ${url}`);
  }

  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    refuse(`URL does not parse: ${url}`);
  }
  if (parsed.protocol !== 'https:') refuse(`URL must be https: ${url}`);

  const outModule = await import(pathToFileURL(PATHS.out));
  const allowedHosts = outModule.PROVIDERS?.ticketmaster?.allowedDestinationHosts;
  if (!Array.isArray(allowedHosts) || allowedHosts.length === 0) {
    console.error('FATAL: could not read PROVIDERS.ticketmaster.allowedDestinationHosts from out.js');
    process.exit(2);
  }
  const host = parsed.hostname.toLowerCase();
  if (!allowedHosts.some((allowed) => host === allowed || host.endsWith(`.${allowed}`))) {
    refuse(`Hostname "${host}" is not in PROVIDERS.ticketmaster.allowedDestinationHosts`);
  }

  // ── Promotability checks ───────────────────────────────────────────────────

  let artists, catalog, outSource;
  try {
    artists = JSON.parse(await fs.readFile(PATHS.artists, 'utf8'));
    catalog = JSON.parse(await fs.readFile(PATHS.catalog, 'utf8'));
    outSource = await fs.readFile(PATHS.out, 'utf8');
  } catch (err) {
    console.error(`FATAL: could not load files — ${err.message}`);
    process.exit(2);
  }

  const artistMatches = artists.filter((a) => a?.slug === slug);
  if (artistMatches.length === 0) refuse(`No artist with slug "${slug}" in artists.json`);
  if (artistMatches.length > 1) refuse(`Duplicate slug "${slug}" in artists.json`);
  const artist = artistMatches[0];

  if (artist.indexing_status !== 'review_required') {
    refuse(`indexing_status is "${artist.indexing_status}" — only review_required shells are promotable`);
  }
  if (Array.isArray(artist.verified_providers) && artist.verified_providers.length > 0) {
    refuse(`verified_providers is non-empty (${artist.verified_providers.join(', ')}) — already promoted?`);
  }

  const linkId = `tm-artist-${slug}`;
  const ticketLink = (catalog.ticket_links || []).find(
    (tl) => tl?.link_id === linkId && tl?.artist_slug === slug && tl?.provider === 'ticketmaster'
  );
  if (!ticketLink) refuse(`catalog.json ticket_links[] has no "${linkId}" row — run the shell phase first`);
  if (ticketLink.verified === true) refuse(`catalog.json ticket_links["${linkId}"] is already verified`);

  const vtlKey = `${slug}:ticketmaster`;
  if (outSource.includes(`"${vtlKey}"`)) {
    refuse(`functions/api/out.js already contains "${vtlKey}"`);
  }
  if (!VTL_BLOCK_PATTERN.test(outSource)) {
    console.error('FATAL: could not locate VERIFIED_TICKET_LINKS block in out.js');
    process.exit(2);
  }

  // ── Generate edits ─────────────────────────────────────────────────────────

  artist.indexing_status = 'indexable_with_substantial_content';
  artist.verified_providers = ['ticketmaster'];
  artist.verified_provider_count = 1;
  artist.last_verified_at = today;
  const newArtistsJson = `${JSON.stringify(artists, null, 2)}\n`;

  ticketLink.verified = true;
  ticketLink.public_enabled = true;
  ticketLink.affiliate_enabled = true;
  ticketLink.last_checked_at = today;
  const newCatalogJson = `${JSON.stringify(catalog, null, 2)}\n`;

  const vtlEntry = [
    `  "${vtlKey}": {`,
    `    artistSlug: "${slug}",`,
    `    provider: "ticketmaster",`,
    `    linkId: "${linkId}",`,
    `    redirectUrl: "${url}",`,
    '    verified: true',
    '  }',
  ].join('\n');
  const newOutSource = outSource.replace(
    VTL_BLOCK_PATTERN,
    (match, inner) => `const VERIFIED_TICKET_LINKS = {${inner},\n${vtlEntry}\n};`
  );

  // Self-check: the edited block must still parse with the exact regexes the
  // validators use, and must contain the new key.
  const checkBlock = newOutSource.match(VTL_BLOCK_PATTERN);
  if (!checkBlock || !checkBlock[1].includes(`"${vtlKey}"`)) {
    console.error('FATAL: out.js insertion failed self-check — no files written');
    process.exit(2);
  }

  // ── Preview / write ────────────────────────────────────────────────────────

  console.log(`\nPromote preview for "${slug}" (${today}):`);
  console.log('\npublic/data/artists.json:');
  console.log('  indexing_status: review_required → indexable_with_substantial_content');
  console.log('  verified_providers: [] → ["ticketmaster"]');
  console.log('  verified_provider_count: 0 → 1');
  console.log(`  last_verified_at: → ${today}`);
  console.log(`\npublic/data/catalog.json ticket_links["${linkId}"]:`);
  console.log('  verified: → true');
  console.log('  public_enabled: → true');
  console.log('  affiliate_enabled: → true');
  console.log(`  last_checked_at: → ${today}`);
  console.log('\nfunctions/api/out.js — new VERIFIED_TICKET_LINKS entry:');
  console.log(`  (redirectUrl source: ${urlSource})`);
  console.log(vtlEntry.replace(/^/gm, '  '));

  if (!args.write) {
    console.log('\nDry run — no files written.');
    console.log(`Reminder: open this exact URL (${urlSource}) in a browser and confirm the`);
    console.log('artist page is live TODAY before re-running with --write (Phase 3 pre-condition).');
    return;
  }

  await fs.writeFile(PATHS.artists, newArtistsJson);
  await fs.writeFile(PATHS.catalog, newCatalogJson);
  await fs.writeFile(PATHS.out, newOutSource);
  console.log('\nEdits applied. Running events:sync (required by stale-sync-guard)…');

  const sync = spawnSync('npm', ['run', 'events:sync'], { stdio: 'inherit', cwd: root });
  if (sync.status !== 0) {
    console.error('events:sync failed — fix before committing (stale-sync-guard will reject the PR)');
    process.exit(1);
  }

  console.log('\nDone. Before opening the promote PR, run:');
  console.log(`  npm run artist:check -- ${slug}   (must PASS, no WARN)`);
  console.log('  npm run validate:artist-providers');
  console.log('  npm run test:mvp');
}

main().catch((err) => {
  console.error(`promote-artist failed: ${err.message}`);
  process.exit(2);
});
