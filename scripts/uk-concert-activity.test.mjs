import assert from 'node:assert/strict';
import { test } from 'node:test';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { gunzipSync } from 'node:zlib';
import { REPORT_ID, TTC_RESEARCH_SOURCE, ttcResearchObservations, buildUkConcertActivity, renderUkConcertActivity } from './lib/uk-concert-activity.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const snapshotAt = '2026-10-23T18:08:39Z';
const source = TTC_RESEARCH_SOURCE;
const artists = [{ slug: 'artist-a', name: 'Artist A' }];
function event(id = 'A', extra = {}) {
  const url = `https://www.ticketmaster.co.uk/artist-a-london/event/${id}`;
  return { id: `ttc-${id}`, ticketmaster_event_id: id, artist_slug: 'artist-a', artist_name: 'Artist A',
    event_name: 'Artist A live', venue: 'Arena', city: 'London', country: 'Great Britain',
    datetime_iso: '2027-04-02T18:00:00Z', timezone: 'Europe/London',
    source_type: 'ticketmaster', source_url: url, ticketmaster_url: url,
    status: 'on-sale', verification_status: 'machine_high_confidence', last_verified_at: '2026-10-20',
    // New-show ingestion legitimately uses false/null link flags even though
    // the record has been verified from Discovery. These are distinct facts.
    provider_links: { ticketmaster: { event_id: id, url, verified: false, last_verified_at: null } }, ...extra };
}
const observations = (rows) => ttcResearchObservations(rows, artists);
const build = (rows, options = {}) => buildUkConcertActivity(rows, { snapshotAt, sources: [source], ...options });
const total = (report) => report.coverage.counted_concerts;
const tally = (report) => total(report) + Object.values(report.coverage.excluded_observations).reduce((a, b) => a + b, 0);

test('reuses TTC country aliases, exact venue-local dates and record verification', () => {
  const rows = observations([event('A', { datetime_iso: '2026-12-31T23:30:00-01:00', timezone: '' })]);
  assert.equal(rows[0].country, 'United Kingdom');
  assert.equal(rows[0].local_date, '2026-12-31');
  assert.equal(rows[0].verified, true);
  assert.equal(total(build(rows)), 0);
  assert.equal(build(rows).coverage.excluded_observations.outside_2027, 1);
  const report = build(observations([event()]));
  assert.equal(total(report), 1);
  assert.equal(report.supporting_events[0].evidence[0].observed_at, '2026-10-20');
  assert.equal(report.supporting_events[0].evidence[0].observation_precision, 'day');
});

test('adapter withholds unverifiable evidence, invalid dates and non-concert products', () => {
  for (const extra of [
    { verification_status: 'needs_recheck' }, { verification_status: 'auto_verified' },
    { ticketmaster_event_id: 'OTHER' }, { source_type: 'unknown' }, { source_url: 'https://example.com/event/A' },
    { provider_links: {} }, { artist_slug: 'unknown' }, { event_name: '' },
    { ticketmaster_status_code: 'cancelled' }, { ticketmaster_status_code: 'canceled' },
    { ticketmaster_status_code: 'postponed' }, { ticketmaster_status_code: 'unrecognised' },
    { status: 'unknown' }, { datetime_iso: '2027-02-30T19:00:00Z' }, { datetime_iso: '2027-04-02T24:00:00Z' },
    { datetime_iso: '2027-04-02' }, { datetime_iso: '2027-04-02T19:00:00' },
    { timezone: '' }, { timezone: 'Invalid/Zone' },
    { event_name: 'Artist A parking' }, { event_name: 'Artist A VIP package' },
    { event_name: 'Artist A | Premium Seats' }, { event_name: 'Artist A - Venue Premium Tickets' },
    { event_name: 'Artist A Festival' }, { event_name: 'Artist A weekend pass' },
  ]) assert.equal(total(build(observations([event('A', extra)]))), 0, JSON.stringify(extra));
  assert.equal(total(build(observations([event('A', { ticketmaster_status_code: 'rescheduled', status: 'announced' })]))), 1);
});

test('Northern Ireland events use their reviewed Ireland-domain URLs; country remains decisive', () => {
  for (const host of ['www.ticketmaster.ie', 'ticketmaster.ie']) {
    const e = event();
    const url = `https://${host}/artist-a-belfast/event/A`;
    Object.assign(e, { city: 'Belfast', source_url: url, ticketmaster_url: url });
    e.provider_links.ticketmaster.url = url;
    const report = build(observations([e]));
    assert.equal(total(report), 1);
    assert.equal(report.rankings[0].city, 'Belfast');
    assert.equal(report.supporting_events[0].evidence[0].source_url, url);
    e.country = 'Ireland';
    assert.equal(build(observations([e])).coverage.excluded_observations.outside_uk, 1);
    e.country = 'Great Britain';
    e.source_url = e.ticketmaster_url = e.provider_links.ticketmaster.url = 'https://ticketmaster.ie.evil.test/event/A';
    assert.equal(total(build(observations([e]))), 0);
  }
});

test('unresolved countries stay visible in exclusions rather than becoming outside-UK rows', () => {
  const row = observations([event()])[0];
  for (const country of [undefined, null, '', '   ', {}, 123, '???', 'Atlantis', 'Unknown Region', 'GB']) {
    const report = build([{ ...row, country }]);
    assert.equal(total(report), 0);
    assert.equal(report.coverage.excluded_observations.unresolved_country, 1);
    assert.equal(report.coverage.excluded_observations.outside_uk, undefined);
    assert.equal(report.decisions[0].record_id, row.record_id);
    assert.equal(report.decisions[0].reason, 'unresolved_country');
    assert.equal(tally(report), 1);
  }
  assert.equal(build([{ ...row, country: 'Ireland' }]).coverage.excluded_observations.outside_uk, 1);
  assert.equal(build([{ ...row, country: 'Czech Republic' }]).coverage.excluded_observations.outside_uk, 1);
});

test('source-independent validation excludes invalid records with a reviewable reason', () => {
  const baseline = observations([event()])[0];
  const cases = [
    [{ source: 'unknown' }, 'source_not_permitted'],
    [{ source_url: 'http://www.ticketmaster.co.uk/event/A' }, 'invalid_provenance'],
    [{ source_url: 'https://www.ticketmaster.co.uk.evil.test/event/A' }, 'invalid_provenance'],
    [{ source_url: 'https://www.ticketmaster.co.uk/event/A?apikey=secret' }, 'invalid_provenance'],
    [{ source_event_id: '' }, 'invalid_provenance'], [{ record_id: '' }, 'invalid_provenance'],
    [{ verified: false }, 'unverified'], [{ observed_at: '2026-02-30' }, 'invalid_observation_date'],
    [{ observed_at: '' }, 'invalid_observation_date'], [{ observed_at: '2026-10-24' }, 'invalid_observation_date'],
    [{ observed_at: '2026-10-01' }, 'stale_observation'], [{ observation_precision: 'guess' }, 'invalid_observation_date'],
    [{ status: 'cancelled' }, 'held_or_unknown_status'], [{ kind: 'festival' }, 'unconfirmed_or_non_concert'],
    [{ venue: '' }, 'missing_identity_or_location'], [{ city: '' }, 'missing_identity_or_location'],
    [{ artist_name: '' }, 'missing_identity_or_location'], [{ local_date: '' }, 'invalid_event_date'],
    [{ starts_at: '2027-02-30T20:00:00Z' }, 'invalid_event_date'],
    [{ starts_at: '2027-05-02T18:00:00Z' }, 'invalid_event_date'],
    [{ country: 'Ireland' }, 'outside_uk'], [{ local_date: '2028-04-02' }, 'outside_2027'],
  ];
  for (const [extra, reason] of cases) {
    const report = build([{ ...baseline, ...extra }]);
    assert.equal(total(report), 0, JSON.stringify(extra));
    assert.equal(report.coverage.excluded_observations[reason], 1, JSON.stringify(extra));
    assert.equal(tally(report), 1);
  }
  assert.equal(total(build([baseline], { sources: [{ ...source, internal_analysis_permitted: false }] })), 0);
});

test('freshness uses every observation, including exact boundary and future instants', () => {
  const row = observations([event()])[0];
  assert.equal(total(build([{ ...row, observation_precision: 'instant', observed_at: '2026-10-09T18:08:39Z' }])), 1);
  assert.equal(total(build([{ ...row, observation_precision: 'instant', observed_at: '2026-10-09T18:08:38Z' }])), 0);
  assert.equal(total(build([{ ...row, observation_precision: 'instant', observed_at: '2026-10-23T18:08:40Z' }])), 0);
  assert.equal(total(build([{ ...row, observed_at: '2026-10-01' }, { ...row, source_event_id: 'B', record_id: 'B' }])), 1);
});

test('repeated source IDs and identical performance listings count once; distinct start times remain', () => {
  const rows = observations([event('A'), event('B'), event('C', { datetime_iso: '2027-04-02T14:00:00Z' })]);
  const report = build([rows[0], { ...rows[0], record_id: 'another-record' }, rows[1], rows[2]]);
  assert.equal(total(report), 2);
  assert.equal(report.coverage.excluded_observations.duplicate_source_event, 1);
  assert.equal(report.coverage.excluded_observations.duplicate_performance, 1);
  assert.equal(report.supporting_events.find((e) => e.starts_at.endsWith('18:00:00.000Z')).evidence.length, 2);
  assert.equal(tally(report), 4);
  const offset = { ...rows[1], starts_at: '2027-04-02T19:00:00+01:00' };
  assert.equal(total(build([rows[0], offset])), 1, 'equivalent instants deduplicate');
});

test('newer cancellations/invalid dates cannot fall back to older eligible source records', () => {
  const row = observations([event()])[0];
  for (const extra of [{ status: 'held' }, { local_date: '' }, { observed_at: '' }, { observed_at: '2026-10-24' }]) {
    const report = build([row, { ...row, record_id: 'newer', observed_at: '2026-10-21', ...extra }]);
    assert.equal(total(report), 0, JSON.stringify(extra));
    assert.equal(tally(report), 2);
  }
  const newer = { ...row, record_id: 'newer', observed_at: '2026-10-21', starts_at: '2027-05-02T18:00:00Z', local_date: '2027-05-02' };
  assert.equal(build([newer, row]).supporting_events[0].local_date, '2027-05-02');
});

test('same-date conflicting evidence is withheld; source IDs are namespaced', () => {
  const row = observations([event()])[0];
  const conflict = build([row, { ...row, record_id: 'other', city: 'Manchester' }]);
  assert.equal(total(conflict), 0);
  assert.equal(conflict.coverage.excluded_observations.conflicting_source_observations, 2);
  const secondSource = { ...source, id: 'other-permitted-source' };
  const combined = build([row, { ...row, source: secondSource.id, city: 'Manchester' }], { sources: [source, secondSource] });
  assert.equal(total(combined), 2);
  const equivalent = Object.fromEntries(Object.entries({ ...row, record_id: 'copy' }).reverse());
  assert.equal(total(build([row, equivalent])), 1, 'property order cannot create a conflict');
  const duplicate = build([row, { ...row, source: secondSource.id }], { sources: [source, secondSource] });
  assert.equal(total(duplicate), 1, 'same performance on two sources counts once');
  assert.equal(duplicate.supporting_events[0].evidence.length, 2);
});

test('case and whitespace location variants share one reviewable city label', () => {
  const report = build(observations([
    event('A'), event('B', { city: ' london ', venue: ' arena ' }),
    event('C', { city: 'LONDON', datetime_iso: '2027-04-03T18:00:00Z' }),
  ]));
  assert.equal(total(report), 2);
  assert.equal(report.rankings.length, 1);
  assert.equal(new Set(report.supporting_events.map((e) => e.city)).size, 1);
  assert.equal(report.supporting_events.filter((e) => e.city === report.rankings[0].city).length, report.rankings[0].concert_count);
});

test('ranking ties, counts, empty reports and shuffled inputs are deterministic', () => {
  const rows = observations([
    event('A'), event('B', { datetime_iso: '2027-04-03T18:00:00Z' }),
    event('C', { city: 'Manchester' }), event('D', { city: 'Manchester', datetime_iso: '2027-04-03T18:00:00Z' }),
    event('E', { city: 'Glasgow' }), event('F', { country: 'Ireland' }),
  ]);
  const report = build(rows);
  assert.deepEqual(report.rankings.map((r) => [r.city, r.concert_count, r.rank]), [['London', 2, 1], ['Manchester', 2, 1], ['Glasgow', 1, 3]]);
  assert.match(report.headline, /London and Manchester jointly lead/);
  assert.deepEqual(build(rows.slice().reverse()), report);
  assert.deepEqual(build([rows[2], rows[0], rows[4], rows[1], rows[5], rows[3]]), report);
  assert.equal(tally(report), rows.length);
  assert.deepEqual(build([]).rankings, []);
  assert.match(build([]).headline, /No eligible/);
  assert.equal(build([]).coverage.oldest_counted_observation, null);
  assert.equal(report.publication.status, 'internal_only');
  assert.equal(report.coverage.uk_market_coverage_percent, null);
});

test('schema and snapshot errors are explicit', () => {
  for (const snapshotAt of ['', '2026-10-23', '2026-02-30T10:00:00Z', 'not-a-date']) assert.throws(() => build([], { snapshotAt }));
  assert.throws(() => build([], { sources: [source, source] }));
  assert.throws(() => build(null));
});

test('committed actual-data report rebuilds fully from hashed replay inputs without Git history', async () => {
  const base = path.join(root, 'reports/research', REPORT_ID);
  const report = JSON.parse(await fs.readFile(path.join(base, 'report.json'), 'utf8'));
  const replay = JSON.parse(gunzipSync(await fs.readFile(path.join(base, 'replay-inputs.json.gz'))));
  assert.deepEqual(replay.files.map((f) => f.path), ['public/data/events.json', 'public/data/artists.json']);
  for (const file of replay.files) assert.equal(createHash('sha256').update(file.content).digest('hex'), file.sha256);
  const regenerated = buildUkConcertActivity(ttcResearchObservations(
    JSON.parse(replay.files[0].content), JSON.parse(replay.files[1].content),
  ), { snapshotAt: replay.snapshot_at, sources: [source] });
  regenerated.inputs = { revision: replay.revision, files: replay.files.map(({ path, sha256 }) => ({ path, sha256 })) };
  assert.deepEqual(report, regenerated, 'adapter or calculation changes require regenerating the actual-data report');
  assert.equal(total(report), report.supporting_events.length);
  assert.equal(tally(report), report.coverage.input_observations);
  for (const city of report.rankings) assert.equal(city.concert_count, report.supporting_events.filter((e) => e.city === city.city).length);
  assert.equal(new Set(report.supporting_events.map((e) => JSON.stringify([e.city, e.venue, e.starts_at]))).size, total(report));
  for (const e of report.supporting_events) {
    assert.match(e.local_date, /^2027-/);
    for (const evidence of e.evidence) assert.ok(Date.parse(report.snapshot_at) - Date.parse(evidence.observed_at) <= 14 * 86400000);
  }
  assert.match(report.inputs.revision, /^[0-9a-f]{40}$/);
  assert.ok(report.inputs.files.every((f) => /^[0-9a-f]{64}$/.test(f.sha256)));
  const markdown = renderUkConcertActivity(report);
  assert.equal(markdown, await fs.readFile(path.join(base, 'report.md'), 'utf8'));
  assert.match(markdown, /INTERNAL ONLY/);
  assert.match(markdown, /unobserved, not zero/);
  assert.match(markdown, /Research publication, redistribution and archive rights are not established/);
  assert.equal(report.rankings.find((r) => r.city === 'Belfast').concert_count, 4, 'all four verified Belfast source records remain represented');
});

test('offline CLI overrides lazy-fetch opt-ins on every Git subprocess', async () => {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'ttc-uk-git-env-'));
  const command = path.join(root, 'scripts/report-uk-concert-activity.mjs');
  try {
    const realGit = execFileSync('sh', ['-c', 'command -v git'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
    const calls = path.join(directory, 'git-calls');
    const wrapper = `#!/usr/bin/env node\nconst fs = require('node:fs');\nif (process.env.GIT_NO_LAZY_FETCH !== '1') process.exit(99);\nfs.appendFileSync(${JSON.stringify(calls)}, 'checked\\n');\nconst result = require('node:child_process').spawnSync(${JSON.stringify(realGit)}, process.argv.slice(2), { env: process.env, stdio: 'inherit' });\nprocess.exit(result.status ?? 1);\n`;
    await fs.writeFile(path.join(directory, 'git'), wrapper, { mode: 0o755 });
    const result = spawnSync(process.execPath, [command, '--snapshot-at', '2099-01-01T00:00:00Z', '--output', path.join(directory, 'report')], {
      cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'],
      env: { ...process.env, PATH: `${directory}${path.delimiter}${process.env.PATH}`, GIT_NO_LAZY_FETCH: '0' },
    });
    assert.equal(result.status, 0, result.stderr);
    assert.equal((await fs.readFile(calls, 'utf8')).trim().split('\n').length, 4);
  } finally { await fs.rm(directory, { recursive: true, force: true }); }
});

test('CLI requires a snapshot, rejects unknown flags, is offline and reproducible, and protects site output', async () => {
  const directory = await fs.mkdtemp(path.join(os.tmpdir(), 'ttc-uk-research-'));
  const command = path.join(root, 'scripts/report-uk-concert-activity.mjs');
  const run = (args) => spawnSync(process.execPath, [command, ...args], { cwd: root, encoding: 'utf8' });
  try {
    assert.notEqual(run([]).status, 0);
    assert.notEqual(run(['--unknown']).status, 0);
    assert.notEqual(run(['--snapshot-at', '1900-01-01T00:00:00Z']).status, 0);
    assert.notEqual(run(['--snapshot-at', snapshotAt, '--revision', 'does-not-exist']).status, 0);
    // Fixed far-future clock exercises CLI without assuming CI has the pilot's
    // old commit in a shallow clone. No stale observations may count there.
    const args = ['--snapshot-at', '2099-01-01T00:00:00Z', '--output', directory];
    assert.equal(run(args).status, 0);
    const first = await fs.readFile(path.join(directory, 'report.json'), 'utf8');
    assert.equal(run(args).status, 0);
    assert.equal(await fs.readFile(path.join(directory, 'report.json'), 'utf8'), first);
    const report = JSON.parse(first);
    assert.equal(total(report), 0);
    assert.equal(report.inputs.revision, execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim());
    for (const output of ['public/research-test', 'content/blog/research-test', 'data/research-test', '.git/research-test']) assert.notEqual(run(['--snapshot-at', '2099-01-01T00:00:00Z', '--output', output]).status, 0);
    await fs.unlink(path.join(directory, 'report.json'));
    await fs.symlink(path.join(root, 'package.json'), path.join(directory, 'report.json'));
    assert.notEqual(run(args).status, 0);
  } finally { await fs.rm(directory, { recursive: true, force: true }); }
});
