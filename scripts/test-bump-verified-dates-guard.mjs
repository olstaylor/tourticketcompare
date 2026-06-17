#!/usr/bin/env node
// Test for the verification guard in bump-verified-dates.mjs. Exercises the
// script as a subprocess against synthetic fixtures so production data is never
// touched. Asserts that no bump occurs unless BOTH provider audits report "ok",
// that an artist is bumped only when positively confirmed (>=1 event checked)
// and clean on both Ticketmaster AND SeatGeek, and that zero-event artists are
// never auto-verified.

import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const here = path.dirname(new URL(import.meta.url).pathname);
const bumpScript = path.join(here, 'bump-verified-dates.mjs');

const ARTISTS_FIXTURE = [
  { slug: 'clean-artist', name: 'Clean', indexing_status: 'indexable_with_substantial_content', last_verified_at: '2026-05-01' },
  { slug: 'zero-event-artist', name: 'Zero Events', indexing_status: 'indexable_with_substantial_content', last_verified_at: '2026-05-01' },
  { slug: 'tm-missing-artist', name: 'TM Missing', indexing_status: 'indexable_with_substantial_content', last_verified_at: '2026-05-01' },
  { slug: 'tm-error-artist', name: 'TM Error', indexing_status: 'indexable_with_substantial_content', last_verified_at: '2026-05-01' },
  { slug: 'tm-changed-artist', name: 'TM Changed', indexing_status: 'indexable_with_substantial_content', last_verified_at: '2026-05-01' },
  { slug: 'sg-missing-artist', name: 'SG Missing', indexing_status: 'indexable_with_substantial_content', last_verified_at: '2026-05-01' },
  { slug: 'sg-unparsable-artist', name: 'SG Unparsable', indexing_status: 'indexable_with_substantial_content', last_verified_at: '2026-05-01' },
  { slug: 'unindexed-artist', name: 'Unindexed', indexing_status: 'index_pending', last_verified_at: '2026-05-01' }
];

function tmArtist(slug, { checked = 1, missing = [], errors = [], changed = [] } = {}) {
  return { slug, events_checked: checked, events_without_tm_id: 0, missing, errors, changed };
}
function sgArtist(slug, { checked = 1, missing = [], errors = [], changed = [], unparsable = [] } = {}) {
  return { slug, events_checked: checked, events_without_seatgeek_url: 0, unparsable, missing, errors, changed };
}

const TM_FIXTURE = {
  checked_at: '2026-05-26T00:00:00Z',
  artists: [
    tmArtist('clean-artist'),
    tmArtist('zero-event-artist', { checked: 0 }),
    tmArtist('tm-missing-artist', { missing: [{ id: 'e1', ticketmaster_event_id: 'TM1', status: 404 }] }),
    tmArtist('tm-error-artist', { errors: [{ id: 'e2', ticketmaster_event_id: 'TM2', error: 'timeout' }] }),
    tmArtist('tm-changed-artist', { changed: [{ id: 'e3', diffs: [{ field: 'venue', local: 'A', remote: 'B' }] }] }),
    tmArtist('sg-missing-artist'),
    tmArtist('sg-unparsable-artist')
  ],
  totals: { checked: 6, missing: 1, changed: 1, errors: 1 }
};

const SG_FIXTURE = {
  checked_at: '2026-05-26T00:00:00Z',
  artists: [
    sgArtist('clean-artist'),
    sgArtist('zero-event-artist', { checked: 0 }),
    sgArtist('tm-missing-artist'),
    sgArtist('tm-error-artist'),
    sgArtist('tm-changed-artist'),
    sgArtist('sg-missing-artist', { missing: [{ id: 'e4', seatgeek_event_id: '999', status: 404 }] }),
    sgArtist('sg-unparsable-artist', { checked: 0, unparsable: [{ id: 'e5', seatgeek_url: 'https://seatgeek.com/foo' }] })
  ],
  totals: { checked: 5, missing: 1, changed: 0, errors: 0, unparsable: 1 }
};

const TODAY = '2026-05-26';
let failures = 0;
const tmpRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'bump-guard-test-'));

function setupCase(name, { tmStatus, sgStatus, includeTmJson = true, includeSgJson = true }) {
  const dir = path.join(tmpRoot, name);
  fs.mkdirSync(dir, { recursive: true });
  const artistsPath = path.join(dir, 'artists.json');
  const tmPath = path.join(dir, 'tm.json');
  const tmStatusPath = path.join(dir, 'tm-status.json');
  const sgPath = path.join(dir, 'sg.json');
  const sgStatusPath = path.join(dir, 'sg-status.json');
  fs.writeFileSync(artistsPath, JSON.stringify(ARTISTS_FIXTURE, null, 2));
  if (includeTmJson) fs.writeFileSync(tmPath, JSON.stringify(TM_FIXTURE));
  if (includeSgJson) fs.writeFileSync(sgPath, JSON.stringify(SG_FIXTURE));
  if (tmStatus !== null) fs.writeFileSync(tmStatusPath, JSON.stringify(tmStatus));
  if (sgStatus !== null) fs.writeFileSync(sgStatusPath, JSON.stringify(sgStatus));
  return { dir, artistsPath, tmPath, tmStatusPath, sgPath, sgStatusPath };
}

function runBump(ctx, { dryRun = false } = {}) {
  const args = [
    bumpScript,
    '--tm', ctx.tmPath,
    '--tm-status', ctx.tmStatusPath,
    '--sg', ctx.sgPath,
    '--sg-status', ctx.sgStatusPath,
    '--artists', ctx.artistsPath,
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

const OK = { status: 'ok' };

console.log('Case 1: tm-status.json missing entirely -> no bumps');
{
  const ctx = setupCase('no-tm-status', { tmStatus: null, sgStatus: OK });
  const r = runBump(ctx);
  expect('exit code 0', r.code === 0, `code=${r.code} stderr=${r.stderr}`);
  expect('stdout mentions skipping', /skipping all date bumps/i.test(r.stdout), r.stdout);
  expectNoBump('no artist bumped to today', ctx.artistsPath);
}

console.log('Case 2: sg-status reports skipped -> no bumps');
{
  const ctx = setupCase('sg-skipped', { tmStatus: OK, sgStatus: { status: 'skipped', reason: 'SEATGEEK_CLIENT_ID not set' } });
  const r = runBump(ctx);
  expect('exit code 0', r.code === 0, `code=${r.code}`);
  expect('mentions SeatGeek skipped', /SeatGeek audit not confirmed clean/.test(r.stdout), r.stdout);
  expectNoBump('no artist bumped to today', ctx.artistsPath);
}

console.log('Case 3: tm-status reports failed -> no bumps');
{
  const ctx = setupCase('tm-failed', { tmStatus: { status: 'failed', reason: 'exited 1' }, sgStatus: OK });
  const r = runBump(ctx);
  expect('exit code 0', r.code === 0, `code=${r.code}`);
  expect('mentions TM failed', /TM audit not confirmed clean/.test(r.stdout), r.stdout);
  expectNoBump('no artist bumped to today', ctx.artistsPath);
}

console.log('Case 4: both ok but sg.json missing -> abort exit 2, no bumps');
{
  const ctx = setupCase('ok-no-sg', { tmStatus: OK, sgStatus: OK, includeSgJson: false });
  const r = runBump(ctx);
  expect('exit code 2', r.code === 2, `code=${r.code} stderr=${r.stderr}`);
  expectNoBump('no artist bumped to today', ctx.artistsPath);
}

console.log('Case 5: both ok with findings -> only fully-verified artist bumped');
{
  const ctx = setupCase('ok-with-findings', { tmStatus: OK, sgStatus: OK });
  const r = runBump(ctx);
  expect('exit code 0', r.code === 0, `code=${r.code} stderr=${r.stderr}`);
  const bumped = bumpedSlugs(ctx.artistsPath);
  expect('clean-artist bumped', bumped.includes('clean-artist'), `bumped=${JSON.stringify(bumped)}`);
  expect('zero-event-artist NOT bumped (nothing checked)', !bumped.includes('zero-event-artist'));
  expect('tm-missing-artist NOT bumped', !bumped.includes('tm-missing-artist'));
  expect('tm-error-artist NOT bumped', !bumped.includes('tm-error-artist'));
  expect('tm-changed-artist NOT bumped', !bumped.includes('tm-changed-artist'));
  expect('sg-missing-artist NOT bumped (SeatGeek finding)', !bumped.includes('sg-missing-artist'));
  expect('sg-unparsable-artist NOT bumped (unverifiable SeatGeek URL)', !bumped.includes('sg-unparsable-artist'));
  expect('unindexed-artist NOT bumped (not indexable)', !bumped.includes('unindexed-artist'));
  expect('exactly one artist bumped', bumped.length === 1, `bumped=${JSON.stringify(bumped)}`);
}

console.log('Case 6: dry-run with both ok -> reports candidate, does not modify artists.json');
{
  const ctx = setupCase('dry-run', { tmStatus: OK, sgStatus: OK });
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
