#!/usr/bin/env node
// Lightweight test for the TM skip/failure guard in bump-verified-dates.mjs.
// Exercises the script as a subprocess against synthetic fixtures so production
// data is never touched. Asserts that no bump occurs when TM status is missing,
// skipped, or failed; that artists with TM errors are excluded; and that the
// happy path only bumps clean-on-both artists.

import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const here = path.dirname(new URL(import.meta.url).pathname);
const bumpScript = path.join(here, 'bump-verified-dates.mjs');

const ARTISTS_FIXTURE = [
  { slug: 'clean-artist', name: 'Clean', indexing_status: 'indexable_with_substantial_content', last_verified_at: '2026-05-01' },
  { slug: 'link-fail-artist', name: 'Link Fail', indexing_status: 'indexable_with_substantial_content', last_verified_at: '2026-05-01' },
  { slug: 'link-blocked-artist', name: 'Link Blocked', indexing_status: 'indexable_with_substantial_content', last_verified_at: '2026-05-01' },
  { slug: 'historical-link-artist', name: 'Historical Link', indexing_status: 'indexable_with_substantial_content', last_verified_at: '2026-05-01' },
  { slug: 'tm-missing-artist', name: 'TM Missing', indexing_status: 'indexable_with_substantial_content', last_verified_at: '2026-05-01' },
  { slug: 'tm-error-artist', name: 'TM Error', indexing_status: 'indexable_with_substantial_content', last_verified_at: '2026-05-01' },
  { slug: 'tm-changed-artist', name: 'TM Changed', indexing_status: 'indexable_with_substantial_content', last_verified_at: '2026-05-01' },
  { slug: 'historical-tm-artist', name: 'Historical TM', indexing_status: 'indexable_with_substantial_content', last_verified_at: '2026-05-01' },
  { slug: 'unindexed-artist', name: 'Unindexed', indexing_status: 'index_pending', last_verified_at: '2026-05-01' }
];

const LINKS_FIXTURE = {
  checked: 7,
  failures: [
    { url: 'https://example.com/x', artistSlugs: ['link-fail-artist'] },
    { url: 'https://example.com/past', artistSlugs: ['historical-link-artist'], actionable: false, reviewScope: 'expired' }
  ],
  blocked: [{ url: 'https://example.com/blocked', status: 403, artistSlugs: ['link-blocked-artist'] }],
  passes: [],
  redirects: []
};

const TM_FIXTURE = {
  checked_at: '2026-05-26T00:00:00Z',
  artists: [
    { slug: 'clean-artist', events_checked: 1, events_without_tm_id: 0, missing: [], errors: [], changed: [] },
    { slug: 'link-fail-artist', events_checked: 1, events_without_tm_id: 0, missing: [], errors: [], changed: [] },
    { slug: 'link-blocked-artist', events_checked: 1, events_without_tm_id: 0, missing: [], errors: [], changed: [] },
    { slug: 'tm-missing-artist', events_checked: 1, events_without_tm_id: 0, missing: [{ id: 'e1', ticketmaster_event_id: 'TM1', status: 404 }], errors: [], changed: [] },
    { slug: 'tm-error-artist', events_checked: 1, events_without_tm_id: 0, missing: [], errors: [{ id: 'e2', ticketmaster_event_id: 'TM2', error: 'timeout' }], changed: [] },
    { slug: 'tm-changed-artist', events_checked: 1, events_without_tm_id: 0, missing: [], errors: [], changed: [{ id: 'e3', diffs: [{ field: 'venue', local: 'A', remote: 'B' }] }] },
    { slug: 'historical-tm-artist', events_checked: 1, events_without_tm_id: 0, missing: [{ id: 'past', ticketmaster_event_id: 'TM-PAST', actionable: false }], errors: [], changed: [] }
  ],
  totals: { checked: 5, missing: 1, changed: 1, errors: 1 }
};

const TODAY = '2026-05-26';
let failures = 0;
const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'bump-guard-test-'));

function setupCase(name, { tmStatus, includeTmJson = true }) {
  const dir = path.join(tmpRoot, name);
  fs.mkdirSync(dir, { recursive: true });
  const artistsPath = path.join(dir, 'artists.json');
  const linksPath = path.join(dir, 'links.json');
  const tmPath = path.join(dir, 'tm.json');
  const tmStatusPath = path.join(dir, 'tm-status.json');
  fs.writeFileSync(artistsPath, JSON.stringify(ARTISTS_FIXTURE, null, 2));
  fs.writeFileSync(linksPath, JSON.stringify(LINKS_FIXTURE));
  if (includeTmJson) fs.writeFileSync(tmPath, JSON.stringify(TM_FIXTURE));
  if (tmStatus !== null) fs.writeFileSync(tmStatusPath, JSON.stringify(tmStatus));
  return { dir, artistsPath, linksPath, tmPath, tmStatusPath };
}

function runBump({ artistsPath, linksPath, tmPath, tmStatusPath }, { dryRun = false } = {}) {
  const args = [
    bumpScript,
    '--links', linksPath,
    '--tm', tmPath,
    '--tm-status', tmStatusPath,
    '--artists', artistsPath,
    '--today', TODAY
  ];
  if (dryRun) args.push('--dry-run');
  const res = spawnSync(process.execPath, args, { encoding: 'utf8' });
  return { code: res.status, stdout: res.stdout, stderr: res.stderr };
}

function readArtists(artistsPath) {
  return JSON.parse(fs.readFileSync(artistsPath, 'utf8'));
}

function expect(label, cond, detail) {
  if (cond) {
    console.log(`  ok   ${label}`);
  } else {
    console.log(`  FAIL ${label}${detail ? ` -- ${detail}` : ''}`);
    failures += 1;
  }
}

function bumpedSlugs(artistsPath) {
  return readArtists(artistsPath)
    .filter((a) => a.last_verified_at === TODAY)
    .map((a) => a.slug);
}

function expectNoBump(label, artistsPath) {
  const bumped = bumpedSlugs(artistsPath);
  expect(label, bumped.length === 0, `bumped: ${JSON.stringify(bumped)}`);
}

console.log('Case 1: tm-status.json missing entirely -> no bumps');
{
  const ctx = setupCase('no-status', { tmStatus: null });
  const r = runBump(ctx);
  expect('exit code 0', r.code === 0, `code=${r.code} stderr=${r.stderr}`);
  expect('stdout mentions skipping', /skipping all date bumps/i.test(r.stdout), r.stdout);
  expectNoBump('no artist bumped to today', ctx.artistsPath);
}

console.log('Case 2: tm-status reports skipped -> no bumps');
{
  const ctx = setupCase('skipped', { tmStatus: { status: 'skipped', reason: 'TICKETMASTER_API_KEY not set' } });
  const r = runBump(ctx);
  expect('exit code 0', r.code === 0, `code=${r.code}`);
  expect('mentions skipped reason', /skipped/.test(r.stdout) && /TICKETMASTER_API_KEY/.test(r.stdout), r.stdout);
  expectNoBump('no artist bumped to today', ctx.artistsPath);
}

console.log('Case 3: tm-status reports failed -> no bumps');
{
  const ctx = setupCase('failed', { tmStatus: { status: 'failed', reason: 'audit-tm-events.mjs exited 1' } });
  const r = runBump(ctx);
  expect('exit code 0', r.code === 0, `code=${r.code}`);
  expect('mentions failed', /failed/.test(r.stdout), r.stdout);
  expectNoBump('no artist bumped to today', ctx.artistsPath);
}

console.log('Case 4: tm-status ok but tm.json missing -> abort with exit 2, no bumps');
{
  const ctx = setupCase('ok-no-tm', { tmStatus: { status: 'ok' }, includeTmJson: false });
  const r = runBump(ctx);
  expect('exit code 2', r.code === 2, `code=${r.code} stderr=${r.stderr}`);
  expectNoBump('no artist bumped to today', ctx.artistsPath);
}

console.log('Case 5: tm-status ok with findings -> only clean artists bumped, errors block bump');
{
  const ctx = setupCase('ok-with-findings', { tmStatus: { status: 'ok' } });
  const r = runBump(ctx);
  expect('exit code 0', r.code === 0, `code=${r.code} stderr=${r.stderr}`);
  const bumped = bumpedSlugs(ctx.artistsPath);
  expect('clean-artist bumped', bumped.includes('clean-artist'), `bumped=${JSON.stringify(bumped)}`);
  expect('link-fail-artist NOT bumped', !bumped.includes('link-fail-artist'));
  expect('link-blocked-artist NOT bumped (blocked link is unconfirmed)', !bumped.includes('link-blocked-artist'));
  expect('historical-link-artist bumped (past-only failure is informational)', bumped.includes('historical-link-artist'));
  expect('tm-missing-artist NOT bumped', !bumped.includes('tm-missing-artist'));
  expect('tm-error-artist NOT bumped (errors[] guard)', !bumped.includes('tm-error-artist'));
  expect('tm-changed-artist NOT bumped', !bumped.includes('tm-changed-artist'));
  expect('historical-tm-artist bumped (past-only finding is informational)', bumped.includes('historical-tm-artist'));
  expect('unindexed-artist NOT bumped (not indexable)', !bumped.includes('unindexed-artist'));
  expect('exactly three artists bumped', bumped.length === 3, `bumped=${JSON.stringify(bumped)}`);
}

console.log('Case 6: dry-run with ok status -> reports candidates, does not modify artists.json');
{
  const ctx = setupCase('dry-run', { tmStatus: { status: 'ok' } });
  const before = fs.readFileSync(ctx.artistsPath, 'utf8');
  const r = runBump(ctx, { dryRun: true });
  expect('exit code 0', r.code === 0, `code=${r.code}`);
  expect('mentions DRY RUN', /DRY RUN/.test(r.stdout), r.stdout);
  expect('mentions clean-artist as candidate', /clean-artist/.test(r.stdout), r.stdout);
  const after = fs.readFileSync(ctx.artistsPath, 'utf8');
  expect('artists.json unchanged', before === after);
}

fs.rmSync(tmpRoot, { recursive: true, force: true });

if (failures > 0) {
  console.log(`\n${failures} assertion(s) failed.`);
  process.exit(1);
}
console.log('\nAll guard cases passed.');
