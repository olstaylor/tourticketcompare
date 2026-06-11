#!/usr/bin/env node
/**
 * Explicit provider-identity write mode for the unified growth pipeline.
 *
 * This is intentionally narrow: it only writes data/provider-identities.json
 * for a single known local artist after a human supplies a Ticketmaster
 * attraction ID plus browser evidence URL. It does not create events, CTAs,
 * pricing data, SeatGeek URLs, or affiliate routing changes.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const REGISTRY_PATH = path.join(ROOT, 'data/provider-identities.json');
const ARTISTS_PATH = path.join(ROOT, 'public/data/artists.json');

function usage() {
  return `Usage:\n  npm run growth:open-pr -- --scope provider-identity --artist <slug> --ticketmaster-attraction-id <id> --evidence-url <url> --notes "<notes>"\n\nDespite the npm script name, this command does not open a GitHub PR. It currently only supports --scope provider-identity. It updates one provider identity registry entry, then runs provider identity validation, production event validation, smoke tests, and git diff --check. It never writes events, CTAs, prices, SeatGeek URLs, public artist data, or affiliate routing.`;
}

function fail(message, code = 1) {
  console.error(`ERROR: ${message}`);
  console.error('');
  console.error(usage());
  process.exit(code);
}

function clean(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function parseArgs(argv) {
  const options = {
    scope: null,
    artist: null,
    ticketmasterAttractionId: null,
    evidenceUrl: null,
    notes: null,
    help: false
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const next = () => {
      const value = argv[++i];
      if (!value || value.startsWith('--')) fail(`${arg} requires a value`, 2);
      return value;
    };

    if (arg === '--help' || arg === '-h') options.help = true;
    else if (arg === '--scope') options.scope = next();
    else if (arg === '--artist') options.artist = next();
    else if (arg === '--ticketmaster-attraction-id') options.ticketmasterAttractionId = next();
    else if (arg === '--evidence-url') options.evidenceUrl = next();
    else if (arg === '--notes') options.notes = next();
    else fail(`Unknown option: ${arg}`, 2);
  }

  return options;
}

async function readJson(filePath) {
  return JSON.parse(await fs.readFile(filePath, 'utf8'));
}

function run(command, args, { capture = false } = {}) {
  const result = spawnSync(command, args, {
    cwd: ROOT,
    encoding: 'utf8',
    stdio: capture ? ['ignore', 'pipe', 'pipe'] : 'inherit'
  });

  if (result.status !== 0) {
    const rendered = [command, ...args].join(' ');
    if (capture) {
      if (result.stdout) process.stdout.write(result.stdout);
      if (result.stderr) process.stderr.write(result.stderr);
    }
    throw new Error(`Command failed: ${rendered}`);
  }

  return capture ? result.stdout : '';
}

function assertCleanWorkingTree() {
  const status = run('git', ['status', '--porcelain'], { capture: true }).trim();
  if (status) {
    fail(`git working tree has existing changes; refusing provider identity write. Commit, stash, or revert unrelated changes first.\n\n${status}`);
  }
}

function validateRequired(options) {
  if (options.help) {
    console.log(usage());
    process.exit(0);
  }
  if (clean(options.scope) !== 'provider-identity') fail('--scope provider-identity is required; no other write scopes are supported', 2);
  if (!clean(options.artist)) fail('--artist <slug> is required', 2);
  if (!clean(options.ticketmasterAttractionId)) fail('--ticketmaster-attraction-id <id> is required', 2);
  if (!clean(options.evidenceUrl)) fail('--evidence-url <url> is required and must be human/browser-supplied', 2);
  if (!clean(options.notes)) fail('--notes "<notes>" is required to record human verification context', 2);
}

function validateEvidenceUrl(rawUrl) {
  let parsed;
  try {
    parsed = new URL(rawUrl);
  } catch {
    fail('--evidence-url must be a valid absolute URL', 2);
  }
  if (parsed.protocol !== 'https:') fail('--evidence-url must be an https URL', 2);
  if (!/(^|\.)ticketmaster\.com$/i.test(parsed.hostname)) {
    fail('--evidence-url must be the human-opened Ticketmaster artist page URL for this provider identity scope', 2);
  }
  return parsed.toString();
}

function buildNotes({ evidenceUrl, notes }) {
  return `Human/browser verified ${new Date().toISOString().slice(0, 10)}. Evidence URL: ${evidenceUrl}. Notes: ${notes}`;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  validateRequired(options);

  const slug = clean(options.artist);
  const attractionId = clean(options.ticketmasterAttractionId);
  const evidenceUrl = validateEvidenceUrl(clean(options.evidenceUrl));
  const notes = clean(options.notes);

  assertCleanWorkingTree();

  const artists = await readJson(ARTISTS_PATH);
  const artist = artists.find((row) => row?.slug === slug);
  if (!artist) fail(`unknown artist slug "${slug}"; provider identities may only be attached to artists already present in public/data/artists.json`, 2);

  const registry = await readJson(REGISTRY_PATH);
  if (!Array.isArray(registry.artists)) fail('data/provider-identities.json must contain an artists array');
  const entry = registry.artists.find((row) => row?.slug === slug);
  if (!entry) fail(`provider identity registry has no entry for known artist "${slug}"; add the registry shell in a separate safe data-maintenance PR first`);

  const before = JSON.stringify(registry);
  const syncEligible = artist.indexing_status === 'indexable_with_substantial_content' && Array.isArray(artist.verified_providers) && artist.verified_providers.includes('ticketmaster');

  entry.ticketmaster_attraction_id = attractionId;
  entry.ticketmaster_artist_url = evidenceUrl;
  entry.review_status = 'verified';
  entry.notes = buildNotes({ evidenceUrl, notes });
  entry.sync_enabled = syncEligible;

  const after = JSON.stringify(registry);
  if (before === after) {
    console.log(`No provider identity changes needed for ${slug}.`);
  } else {
    await fs.writeFile(REGISTRY_PATH, `${JSON.stringify(registry, null, 2)}\n`);
    console.log(`Updated provider identity for ${slug} in data/provider-identities.json.`);
  }

  const checks = [
    ['npm', ['run', 'providers:identities:validate']],
    ['python3', ['scripts/validate-events.py', '--for-production']],
    ['node', ['scripts/smoke-prelaunch.mjs']],
    ['git', ['diff', '--check']]
  ];
  for (const [command, args] of checks) run(command, args);

  const diffNames = run('git', ['diff', '--name-only'], { capture: true }).trim().split(/\r?\n/).filter(Boolean);
  const unexpected = diffNames.filter((name) => name !== 'data/provider-identities.json');
  if (unexpected.length) {
    fail(`unexpected files changed by provider identity write: ${unexpected.join(', ')}`);
  }

  console.log('');
  console.log('Provider identity write completed. Despite the growth:open-pr script name, no branch, commit, push, or GitHub PR was created by this local command.');
  console.log('Review the diff, then commit exactly:');
  console.log('  git add data/provider-identities.json');
  console.log(`  git commit -m "Verify Ticketmaster provider identity for ${slug}"`);
  console.log('Then open a normal human-reviewed PR against main.');
}

main().catch((error) => {
  console.error(`ERROR: ${error.message}`);
  process.exit(1);
});
