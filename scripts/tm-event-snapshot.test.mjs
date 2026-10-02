#!/usr/bin/env node
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { createSnapshotSweep, loadSnapshot, makeSnapshotEntry, snapshotFields, usableSnapshotEntry, SNAPSHOT_MAX_AGE_MS, quotaHeaders, safeFetchError } from './lib/tm-event-snapshot.mjs';
import { compareLocal, discoveryIdFor } from './audit-tm-events.mjs';
import { planEventSync } from './apply-tm-updates.mjs';
import { skipInSweep, PAST_RECHECK_DAYS } from './lib/tm-sweep-window.mjs';

const run = promisify(execFile);
const root = fileURLToPath(new URL('../', import.meta.url));
const tmp = await fs.mkdtemp(path.join(os.tmpdir(), 'tm-snapshot-test-'));
const id = 'Z7r9jZ1A706ep';
const base = 'https://app.ticketmaster.com/discovery/v2';
const now = Date.parse('2026-10-02T04:00:00Z');
const iso = new Date(now).toISOString();
const data = { id, name: 'Artist live', url: 'https://www.ticketmaster.com/event/09006474C856CC9E', dates: { timezone: 'America/New_York', start: { dateTime: '2099-10-02T23:00:00Z', localDate: '2099-10-02' }, status: { code: 'onsale' } }, sales: { public: { startDateTime: '2099-01-01T00:00:00Z' } }, _embedded: { venues: [{ name: 'New Hall', timezone: 'America/New_York', city: { name: 'New Town' }, country: { name: 'United States' } }], attractions: [{ name: 'Artist' }] } };
const local = { id: 'local-a', artist_slug: 'artist', artist_name: 'Artist', ticketmaster_event_id: '09006474C856CC9E', ticketmaster_discovery_event_id: id, event_name: 'Artist', venue: 'Hall', city: 'Town', country: 'United States', timezone: '', datetime_iso: '2099-10-01T23:00:00Z' };
const ok = { status: 200, exists: true, data };
const logs = [];
const clock = () => now;
const snapshotFile = path.join(tmp, 'snapshot.json');
try {
  const producer = createSnapshotSweep({ base, now: clock });
  let calls = 0;
  const direct = async () => { calls++; producer.observeResponse({ status: 200 }); return ok; };
  await producer.get(id, direct);
  await producer.get(id, direct);
  assert.equal(calls, 1, 'each exact ID is fetched once in a sweep');
  producer.unresolvable({ id: 'storefront-only' });
  await producer.write(snapshotFile);
  const snapshot = await loadSnapshot(snapshotFile, base, { now, log: (s) => logs.push(s) });
  assert(snapshot);
  const consumer = createSnapshotSweep({ base, snapshot, now: clock });
  const reused = await consumer.get(id, () => { throw new Error('fresh response must be reused'); });
  assert.equal(reused.source, 'snapshot');
  assert.equal(consumer.stats.direct_requests, 0);
  assert.equal(consumer.stats.snapshot_reused, 1);
  assert.equal(consumer.stats.estimated_calls_saved, 1);
  assert.deepEqual(planEventSync(local, reused, id), planEventSync(local, ok, id));
  assert.deepEqual(compareLocal(local, reused), compareLocal(local, ok));
  const stale = createSnapshotSweep({ base, snapshot, now: () => now + SNAPSHOT_MAX_AGE_MS + 1 });
  assert.equal((await stale.get(id, async () => ok)).source, 'direct', 'stale snapshot must fetch independently');
  assert.equal(await loadSnapshot(snapshotFile, 'https://other.test', { now, log: () => {} }), null, 'different Discovery source cannot share');
  const staleEntry = { ...snapshot, created_at: iso, events: { ...snapshot.events, [id]: makeSnapshotEntry(id, ok, new Date(now - SNAPSHOT_MAX_AGE_MS - 1).toISOString()) } };
  assert.equal((await createSnapshotSweep({ base, snapshot: staleEntry, now: clock }).get(id, async () => ok)).source, 'direct', 'per-response age is checked separately');
  const futureEntry = makeSnapshotEntry(id, ok, new Date(now + 1).toISOString());
  assert(!usableSnapshotEntry(futureEntry, id, now));
  assert(!usableSnapshotEntry(snapshot.events[id], id.toLowerCase(), now), 'ID lookup is exact and case sensitive');
  for (const status of [404, 410]) {
    const gone = makeSnapshotEntry(id, { status, exists: false, data: null }, iso);
    assert(usableSnapshotEntry(gone, id, now));
    const result = await createSnapshotSweep({ base, snapshot: { ...snapshot, events: { [id]: gone } }, now: clock }).get(id, () => { throw new Error('missing response should retain its verdict'); });
    assert.equal(result.exists, false);
    assert.equal(result.status, status);
    assert.equal(result.data, null);
  }
  for (const status of [429, 503, null, 401, 403]) {
    const failed = makeSnapshotEntry(id, { status, exists: null, error: 'provider URL with secret', data: null }, iso);
    assert.equal(failed.status, status);
    assert.equal(failed.exists, null);
    assert.equal(failed.kind, [401, 403].includes(status) ? 'http_error' : 'transient_error');
    assert(!usableSnapshotEntry(failed, id, now), 'failed observations do not grant reuse');
    const lane = createSnapshotSweep({ base, snapshot: { ...snapshot, events: { [id]: failed } }, now: clock });
    assert.equal((await lane.get(id, async () => ok)).source, 'direct', 'failed observations use the existing direct fetch/retry path');
    assert.equal(lane.stats.snapshot_failed_entries, 1);
  }
  for (const bad of [null, {}, { ...snapshot, complete: false }, { ...snapshot, version: 999 }]) {
    await fs.writeFile(snapshotFile, JSON.stringify(bad));
    assert.equal(await loadSnapshot(snapshotFile, base, { now, log: () => {} }), null);
  }
  await fs.writeFile(snapshotFile, '{broken');
  assert.equal(await loadSnapshot(snapshotFile, base, { now, log: () => {} }), null);
  const incomplete = structuredClone(snapshot.events[id]);
  delete incomplete.data._embedded.attractions;
  assert(!usableSnapshotEntry(incomplete, id, now), 'truncated required field is rejected');
  // Even a recalculated checksum cannot conceal an incomplete projection.
  const { checksum: ignored, ...record } = incomplete;
  incomplete.checksum = createHash('sha256').update(JSON.stringify(record)).digest('hex');
  assert(!usableSnapshotEntry(incomplete, id, now));
  assert.equal((await createSnapshotSweep({ base, snapshot: { ...snapshot, events: { [id]: incomplete } }, now: clock }).get(id, async () => ok)).source, 'direct');
  assert.equal((await createSnapshotSweep({ base, snapshot: { ...snapshot, events: {} }, now: clock }).get(id, async () => ok)).source, 'direct', 'newly tracked ID gets fresh data');
  assert.equal(makeSnapshotEntry(id, { ...ok, data: null }, iso).exists, null);
  assert.equal(makeSnapshotEntry(id, { ...ok, data: { ...data, id: 'another-id' } }, iso).exists, null);
  for (const value of ['09006474C856CC9E', '653666176', 'show.html', '']) {
    assert.equal(discoveryIdFor({ ticketmaster_event_id: value }), null);
    assert.equal(discoveryIdFor({ ticketmaster_discovery_event_id: value, ticketmaster_event_id: '653666176' }), null);
  }
  assert.equal(snapshot.unresolvable[0].kind, 'unresolvable');
  assert.equal(snapshot.unresolvable[0].status, null);
  assert(!snapshot.events['storefront-only'], 'unresolvable local ID is never a missing Discovery event');
  // Every existing lifecycle/ambiguity verdict must be identical on projected
  // source fields; array cardinality and attraction identity matter here.
  for (const code of ['cancelled', 'canceled', 'postponed', 'rescheduled', 'onsale', 'offsale', 'paused', '']) {
    for (const source of [
      { ...data, dates: { ...data.dates, status: { code } } },
      { ...data, dates: { ...data.dates, start: {}, status: { code } } },
      { ...data, name: 'Somebody Else', _embedded: { ...data._embedded, attractions: [] }, dates: { ...data.dates, status: { code } } },
      { ...data, _embedded: { ...data._embedded, venues: [...data._embedded.venues, ...data._embedded.venues] }, dates: { ...data.dates, status: { code } } }
    ]) {
      for (const event of [local, { ...local, ticketmaster_status_code: 'postponed' }, { ...local, status: 'announced', public_onsale_at: '2099-01-01T00:00:00Z' }]) {
        const projected = { data: snapshotFields(source) };
        assert.deepEqual(planEventSync(event, projected, id), planEventSync(event, { data: source }, id));
        assert.deepEqual(compareLocal(event, projected), compareLocal(event, { data: source }));
      }
    }
  }
  const old = { ...local, datetime_iso: '2020-01-01T00:00:00Z' };
  assert.equal(Array.from({ length: PAST_RECHECK_DAYS }, (_, day) => now + day * 86400000).filter((at) => !skipInSweep(old, at)).length, 1);
  assert(!skipInSweep(old, now, { includePast: true }));
  assert(!skipInSweep({ ...old, ticketmaster_status_code: 'rescheduled' }, now));
  assert.deepEqual(quotaHeaders(new Headers({ 'rate-limit': '5000', 'rate-limit-available': '3000', authorization: 'secret', 'retry-after': 'not-numeric' })), { 'rate-limit': '5000', 'rate-limit-available': '3000' });
  assert(!safeFetchError(new Error('https://tm.test?apikey=secret'), 15000).includes('secret'));
  const leaked = makeSnapshotEntry(id, { ...ok, data: { ...data, url: 'https://tm.test?apikey=secret' } }, iso, ['secret']);
  assert.equal(leaked.exists, null);
  assert(!JSON.stringify(leaked).includes('apikey=secret'));
  console.log('PASS fresh/stale/exact-ID/missing/transient/unresolvable/corrupted snapshots, source binding, lifecycle parity, weekly rotation, quota and secret handling');

  // Exercise the real sync CLI, file writes, report, fallback fetches, retries
  // and error exit/publish veto using an injected fetch oracle (no network or credentials).
  const oracleFile = path.join(tmp, 'oracle.json');
  const preloadFile = path.join(tmp, 'fetch-fixture.mjs');
  const localBase = 'https://tm-fixture.test/discovery/v2';
  await fs.writeFile(oracleFile, JSON.stringify({ status: 200, calls: 0, data }));
  await fs.writeFile(preloadFile, `import fs from 'node:fs';
globalThis.fetch = async (url) => {
  if (!String(url).startsWith('${localBase}/events/${id}.json?apikey=')) throw new Error('unexpected fixture request');
  const file = ${JSON.stringify(oracleFile)};
  const oracle = JSON.parse(fs.readFileSync(file, 'utf8'));
  oracle.calls++;
  fs.writeFileSync(file, JSON.stringify(oracle));
  return new Response(JSON.stringify(oracle.data), { status: oracle.status, headers: { 'content-type': 'application/json', 'rate-limit-available': '3000' } });
};`);
  const networkCalls = async () => JSON.parse(await fs.readFile(oracleFile)).calls;
  const eventsFile = path.join(tmp, 'events.json');
  const artistsFile = path.join(tmp, 'artists.json');
  const reportFile = path.join(tmp, 'report.json');
  await fs.writeFile(artistsFile, JSON.stringify([{ slug: 'artist', indexing_status: 'indexable_with_substantial_content' }]));
  const env = { ...process.env, GITHUB_STEP_SUMMARY: '', TICKETMASTER_API_KEY: 'fixture-key', TICKETMASTER_DISCOVERY_BASE_URL: localBase, TM_REQUEST_DELAY_MS: '0', TM_RETRY_BACKOFF_MS: '1', TM_RETRY_BUDGET_MS: '180000' };
  const args = ['--import', preloadFile, 'scripts/apply-tm-updates.mjs', '--events', eventsFile, '--artists', artistsFile, '--json', reportFile, '--snapshot', snapshotFile];
  const prepare = async (result, at = Date.now()) => {
    await fs.writeFile(eventsFile, JSON.stringify([local]));
    const lane = createSnapshotSweep({ base: localBase, now: () => at });
    await lane.get(id, async () => result);
    await lane.write(snapshotFile);
  };
  await prepare(ok);
  await run(process.execPath, args, { cwd: root, env });
  assert.equal(await networkCalls(), 0);
  let report = JSON.parse(await fs.readFile(reportFile));
  assert.equal(report.requests.snapshot_reused, 1);
  assert(report.summary.autoCommitSafe);
  assert.equal(JSON.parse(await fs.readFile(eventsFile))[0].venue, 'New Hall');
  await prepare(ok, Date.now() - SNAPSHOT_MAX_AGE_MS - 1000);
  await run(process.execPath, args, { cwd: root, env });
  report = JSON.parse(await fs.readFile(reportFile));
  assert.equal(await networkCalls(), 1);
  assert.equal(report.requests.direct_requests, 1);
  assert.equal(report.requests.quota['rate-limit-available'], '3000');
  for (const goneStatus of [404, 410]) {
    await prepare({ status: goneStatus, exists: false, data: null });
    await run(process.execPath, args, { cwd: root, env });
    report = JSON.parse(await fs.readFile(reportFile));
    assert.equal(report.reviewItems[0].kind, 'deleted');
    assert.equal(report.summary.updated, 0);
    assert(!report.summary.autoCommitSafe);
    assert.equal(await networkCalls(), 1);
  }
  const oracle = JSON.parse(await fs.readFile(oracleFile));
  await fs.writeFile(oracleFile, JSON.stringify({ ...oracle, status: 429 }));
  await prepare({ status: 429, exists: null, data: null });
  await assert.rejects(run(process.execPath, args, { cwd: root, env }), (err) => err.code === 1);
  report = JSON.parse(await fs.readFile(reportFile));
  assert.equal(report.errors[0].status, 429);
  assert(!report.summary.autoCommitSafe);
  assert.equal(report.requests.direct_requests, 3);
  assert.equal(report.requests.transient_failures, 3);
  assert.equal(report.requests.snapshot_reused, 0);
  assert.deepEqual(JSON.parse(await fs.readFile(eventsFile)), [local]);
  console.log('PASS sync CLI: snapshot writes factual updates, stale fallback requests fresh data, 404/410 stay review-only, sustained 429 retries and fails with no publish permission');
} finally {
  await fs.rm(tmp, { recursive: true, force: true });
}
