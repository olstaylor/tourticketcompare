#!/usr/bin/env node
// Locate an optional snapshot via GitHub's existing Actions artifacts. Failure
// only disables reuse; the consumer must still fetch and report real API errors.
//
// Trust is anchored on the `audit` job, which alone produces the snapshot and
// fails on unresolved fetch errors, not on the whole run. A later publishing job
// in the same run (verification-dates, status-figures) failing says nothing
// about the Ticketmaster responses, and on 2026-10-02 a rejected verification-
// dates push made the sync discard a usable handoff and spend the day's quota
// fetching all 2,083 events again.
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { SNAPSHOT_ARTIFACT, SNAPSHOT_MAX_AGE_MS } from './lib/tm-event-snapshot.mjs';

const AUDIT_JOB = 'audit';

// Why a listed run cannot supply the snapshot, or null when it can. The
// reason is printed for every candidate: on 2026-10-05 a completed, green
// audit run with an unexpired artifact was passed over without a word, and the
// sync spent the day's quota fetching directly with no way to tell why.
export function auditRunRejection(run, repo, now = Date.now()) {
  const at = Date.parse(run?.run_started_at);
  if (run?.event !== 'schedule') return `event is ${run?.event ?? 'missing'}, not schedule`;
  if (run?.head_branch !== 'main') return `branch is ${run?.head_branch ?? 'missing'}, not main`;
  if (run?.path !== '.github/workflows/daily-audit.yml') return `path is ${run?.path ?? 'missing'}`;
  if (run?.head_repository?.full_name !== repo) return `head repository is ${run?.head_repository?.full_name ?? 'missing'}, not ${repo}`;
  if (run?.status !== 'completed') return `status is ${run?.status ?? 'missing'}, not completed`;
  if (!Number.isSafeInteger(run?.id)) return 'run id is not an integer';
  if (!Number.isFinite(at) || at > now) return `start time ${run?.run_started_at ?? 'missing'} is not in the past`;
  if (now - at > SNAPSHOT_MAX_AGE_MS) {
    return `started ${((now - at) / 3600000).toFixed(1)}h ago, over the ${SNAPSHOT_MAX_AGE_MS / 3600000}h limit`;
  }
  return null;
}

export function trustedAuditRun(run, repo, now = Date.now()) {
  return auditRunRejection(run, repo, now) === null;
}

export function auditJobSucceeded(jobs) {
  const audit = (jobs?.jobs || []).filter((job) => job?.name === AUDIT_JOB);
  return audit.length === 1 && audit[0].status === 'completed' && audit[0].conclusion === 'success';
}

function describeAuditJobs(jobs) {
  const audit = (jobs?.jobs || []).filter((job) => job?.name === AUDIT_JOB);
  if (audit.length !== 1) return `${audit.length} \`${AUDIT_JOB}\` jobs listed, expected exactly 1`;
  return `\`${AUDIT_JOB}\` job is ${audit[0].status}/${audit[0].conclusion ?? 'none'}`;
}

export async function findSnapshot({ request, repo, now = Date.now(), log = () => {} }) {
  const runs = await request(`/repos/${repo}/actions/workflows/daily-audit.yml/runs?branch=main&event=schedule&status=completed&per_page=10`);
  const listed = runs.workflow_runs || [];
  log(`${listed.length} completed scheduled daily-audit run(s) on main listed.`);
  const trusted = [];
  for (const run of listed) {
    const rejection = auditRunRejection(run, repo, now);
    if (rejection) log(`  run ${run?.id}: skipped (${rejection})`);
    else trusted.push(run);
  }
  for (const run of trusted.sort((a, b) => Date.parse(b.run_started_at) - Date.parse(a.run_started_at))) {
    const jobs = await request(`/repos/${repo}/actions/runs/${run.id}/jobs?filter=latest&per_page=100`);
    if (!auditJobSucceeded(jobs)) {
      log(`  run ${run.id}: skipped (${describeAuditJobs(jobs)})`);
      continue;
    }
    const artifacts = await request(`/repos/${repo}/actions/runs/${run.id}/artifacts?per_page=100`);
    const listedArtifacts = artifacts.artifacts || [];
    const artifact = listedArtifacts.find((a) => a.name === SNAPSHOT_ARTIFACT && a.expired === false && Number.isSafeInteger(a.id));
    if (artifact) return { run_id: run.id, artifact_id: artifact.id };
    const named = listedArtifacts.filter((a) => a?.name === SNAPSHOT_ARTIFACT);
    log(`  run ${run.id}: skipped (${named.length ? `${SNAPSHOT_ARTIFACT} is expired or has no id` : `no ${SNAPSHOT_ARTIFACT} among ${listedArtifacts.length} artifact(s)`})`);
  }
  return null;
}

export const RETRY_DELAY_MS = 60_000;

// One delayed second look before the sync falls back to direct fetches. A miss
// costs the whole day's Discovery quota (audit plus a full direct sweep is
// close to the 5,000-call allowance), while a minute's wait costs nothing, and
// a listing that lags a run which finished moments earlier is the likeliest
// transient cause. A lookup error is retried the same way. Never more than once.
export async function selectWithRetry({
  find,
  delayMs = RETRY_DELAY_MS,
  sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
  log = () => {}
}) {
  for (let attempt = 1; attempt <= 2; attempt += 1) {
    try {
      const selected = await find();
      if (selected) return selected;
      if (attempt === 1) log(`No snapshot on the first look; looking once more in ${delayMs / 1000}s.`);
    } catch (error) {
      log(`Snapshot lookup failed (${error?.message || error})${attempt === 1 ? `; looking once more in ${delayMs / 1000}s` : ''}.`);
    }
    if (attempt === 1) await sleep(delayMs);
  }
  return null;
}

async function selfTest() {
  const now = Date.parse('2026-10-02T04:00:00Z');
  const repo = 'owner/repo';
  const run = { id: 42, event: 'schedule', head_branch: 'main', path: '.github/workflows/daily-audit.yml', head_repository: { full_name: repo }, status: 'completed', conclusion: 'success', run_started_at: '2026-10-02T03:00:00Z' };
  assert(trustedAuditRun(run, repo, now));
  for (const patch of [{ event: 'workflow_dispatch' }, { event: 'pull_request' }, { head_branch: 'feature' }, { head_repository: { full_name: 'fork/repo' } }, { status: 'in_progress' }, { path: '.github/workflows/other.yml' }, { run_started_at: '2026-10-01T03:00:00Z' }, { run_started_at: '2026-10-03T03:00:00Z' }]) {
    assert(!trustedAuditRun({ ...run, ...patch }, repo, now));
  }
  const okJobs = { jobs: [{ name: 'audit', status: 'completed', conclusion: 'success' }, { name: 'verification-dates', status: 'completed', conclusion: 'failure' }] };
  const artifactList = { artifacts: [{ id: 99, name: SNAPSHOT_ARTIFACT, expired: false }] };
  const scripted = (runList, jobs, artifacts) => async (endpoint) => {
    if (endpoint.includes('/workflows/')) return { workflow_runs: runList };
    if (endpoint.endsWith('/jobs?filter=latest&per_page=100')) return jobs;
    if (endpoint.includes('/artifacts')) return artifacts;
    throw new Error(`unexpected ${endpoint}`);
  };
  assert.deepEqual(await findSnapshot({ request: scripted([run], okJobs, artifactList), repo, now }), { run_id: 42, artifact_id: 99 });
  // A later publishing job failing does not void the audit job's snapshot.
  assert.deepEqual(await findSnapshot({ request: scripted([{ ...run, conclusion: 'failure' }], okJobs, artifactList), repo, now }), { run_id: 42, artifact_id: 99 });
  for (const jobs of [
    { jobs: [{ name: 'audit', status: 'completed', conclusion: 'failure' }] },
    { jobs: [{ name: 'audit', status: 'completed', conclusion: 'cancelled' }] },
    { jobs: [{ name: 'audit', status: 'in_progress', conclusion: null }] },
    { jobs: [{ name: 'verification-dates', status: 'completed', conclusion: 'success' }] },
    { jobs: [{ name: 'audit', status: 'completed', conclusion: 'success' }, { name: 'audit', status: 'completed', conclusion: 'failure' }] },
    {},
  ]) {
    assert.equal(await findSnapshot({ request: scripted([run], jobs, artifactList), repo, now }), null);
  }
  for (const artifact of [{ id: 99, name: SNAPSHOT_ARTIFACT, expired: true }, { id: 99, name: 'daily-audit-42', expired: false }]) {
    assert.equal(await findSnapshot({ request: scripted([run], okJobs, { artifacts: [artifact] }), repo, now }), null);
  }
  // Every rejection names its reason, and the trusted case has none.
  assert.equal(auditRunRejection(run, repo, now), null);
  assert.match(auditRunRejection({ ...run, run_started_at: '2026-10-01T03:00:00Z' }, repo, now), /over the 6h limit/);
  assert.match(auditRunRejection({ ...run, status: 'in_progress' }, repo, now), /status is in_progress/);
  assert.match(auditRunRejection({ ...run, head_repository: undefined }, repo, now), /head repository is missing/);
  const lines = [];
  const logged = (line) => lines.push(line);
  assert.equal(await findSnapshot({ request: scripted([{ ...run, id: 7, event: 'workflow_dispatch' }, run], { jobs: [{ name: 'audit', status: 'completed', conclusion: 'failure' }] }, artifactList), repo, now, log: logged }), null);
  assert.ok(lines.some((line) => /run 7: skipped \(event is workflow_dispatch/.test(line)), 'a rejected run is named with its reason');
  assert.ok(lines.some((line) => /run 42: skipped \(`audit` job is completed\/failure\)/.test(line)), 'a failed audit job is named');
  lines.length = 0;
  await findSnapshot({ request: scripted([run], okJobs, { artifacts: [{ id: 5, name: 'daily-audit-42', expired: false }] }), repo, now, log: logged });
  assert.ok(lines.some((line) => /no tm-tracked-event-snapshot among 1 artifact/.test(line)), 'a missing artifact is named');

  // One delayed second look, never more; a hit on the first look never waits.
  const hit = { run_id: 42, artifact_id: 99 };
  const sequence = (...results) => {
    let calls = 0;
    return { find: async () => { const next = results[calls++]; if (next instanceof Error) throw next; return next; }, calls: () => calls };
  };
  let slept = [];
  const sleep = async (ms) => { slept.push(ms); };
  let lookups = sequence(hit);
  assert.deepEqual(await selectWithRetry({ find: lookups.find, sleep }), hit);
  assert.equal(lookups.calls(), 1);
  assert.deepEqual(slept, []);
  lookups = sequence(null, hit);
  assert.deepEqual(await selectWithRetry({ find: lookups.find, sleep }), hit);
  assert.deepEqual(slept, [RETRY_DELAY_MS]);
  slept = [];
  lookups = sequence(new Error('GitHub HTTP 502'), null, hit);
  assert.equal(await selectWithRetry({ find: lookups.find, sleep }), null);
  assert.equal(lookups.calls(), 2, 'never more than one retry');
  assert.deepEqual(slept, [RETRY_DELAY_MS]);
  lookups = sequence(new Error('first'), new Error('second'));
  assert.equal(await selectWithRetry({ find: lookups.find, sleep: async () => {} }), null, 'two failed lookups fall back to direct fetches');

  console.log('PASS snapshot artifact selection: completed scheduled main run, successful audit job, same repository, bounded age, exact artifact, no fork/manual/failed-audit/expired evidence; every skipped run names its reason; one delayed retry, never more');
}

async function main() {
  if (process.argv.includes('--self-test')) return selfTest();
  let selected = null;
  try {
    const repo = process.env.GITHUB_REPOSITORY || '';
    const token = process.env.GITHUB_TOKEN;
    const api = process.env.GITHUB_API_URL || 'https://api.github.com';
    if (!/^[\w.-]+\/[\w.-]+$/.test(repo) || !token || api !== 'https://api.github.com') throw new Error('unsupported GitHub context');
    const request = async (endpoint) => {
      const response = await fetch(`${api}${endpoint}`, { headers: { Authorization: `Bearer ${token}`, Accept: 'application/vnd.github+json' }, signal: AbortSignal.timeout(15000) });
      if (!response.ok) throw new Error(`GitHub HTTP ${response.status}`);
      return response.json();
    };
    selected = await selectWithRetry({ find: () => findSnapshot({ request, repo, log: console.log }), log: console.log });
  } catch {
    console.warn('Snapshot lookup unavailable; nightly sync will fetch directly.');
  }
  console.log(selected ? `Using scheduled audit run ${selected.run_id}, artifact ${selected.artifact_id}.` : 'No fresh trusted audit snapshot found; nightly sync will fetch directly.');
  if (process.env.GITHUB_OUTPUT) await fs.appendFile(process.env.GITHUB_OUTPUT, `run_id=${selected?.run_id || ''}\nartifact_id=${selected?.artifact_id || ''}\n`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch(() => { console.error('Snapshot selection output failed.'); process.exitCode = 1; });
}
