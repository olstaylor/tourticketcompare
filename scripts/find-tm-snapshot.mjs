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

export function trustedAuditRun(run, repo, now = Date.now()) {
  const at = Date.parse(run?.run_started_at);
  return run?.event === 'schedule' && run?.head_branch === 'main' &&
    run?.path === '.github/workflows/daily-audit.yml' &&
    run?.head_repository?.full_name === repo && run?.status === 'completed' &&
    Number.isSafeInteger(run?.id) && Number.isFinite(at) && at <= now && now - at <= SNAPSHOT_MAX_AGE_MS;
}

export function auditJobSucceeded(jobs) {
  const audit = (jobs?.jobs || []).filter((job) => job?.name === AUDIT_JOB);
  return audit.length === 1 && audit[0].status === 'completed' && audit[0].conclusion === 'success';
}

export async function findSnapshot({ request, repo, now = Date.now() }) {
  const runs = await request(`/repos/${repo}/actions/workflows/daily-audit.yml/runs?branch=main&event=schedule&status=completed&per_page=10`);
  for (const run of (runs.workflow_runs || []).filter((r) => trustedAuditRun(r, repo, now)).sort((a, b) => Date.parse(b.run_started_at) - Date.parse(a.run_started_at))) {
    if (!auditJobSucceeded(await request(`/repos/${repo}/actions/runs/${run.id}/jobs?filter=latest&per_page=100`))) continue;
    const artifacts = await request(`/repos/${repo}/actions/runs/${run.id}/artifacts?per_page=100`);
    const artifact = (artifacts.artifacts || []).find((a) => a.name === SNAPSHOT_ARTIFACT && a.expired === false && Number.isSafeInteger(a.id));
    if (artifact) return { run_id: run.id, artifact_id: artifact.id };
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
  console.log('PASS snapshot artifact selection: completed scheduled main run, successful audit job, same repository, bounded age, exact artifact, no fork/manual/failed-audit/expired evidence');
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
    selected = await findSnapshot({ request, repo });
  } catch {
    console.warn('Snapshot lookup unavailable; nightly sync will fetch directly.');
  }
  console.log(selected ? `Using scheduled audit run ${selected.run_id}, artifact ${selected.artifact_id}.` : 'No fresh trusted audit snapshot found; nightly sync will fetch directly.');
  if (process.env.GITHUB_OUTPUT) await fs.appendFile(process.env.GITHUB_OUTPUT, `run_id=${selected?.run_id || ''}\nartifact_id=${selected?.artifact_id || ''}\n`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch(() => { console.error('Snapshot selection output failed.'); process.exitCode = 1; });
}
