#!/usr/bin/env node
// Audit observations belong to one commit. Never transplant date stamps onto
// a refreshed checkout, or publish them after main has moved past that commit.
import { execFileSync, spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { pathToFileURL } from "node:url";

export function assertAuditRevision({ audited, checkout, main }) {
  if (![audited, checkout, main].every((sha) => /^[0-9a-f]{40}$/.test(sha || ""))) {
    throw new Error("Missing or malformed audit revision; withholding verification-date writes and publishing.");
  }
  if (audited !== checkout || audited !== main) {
    throw new Error(`Audit reports describe ${audited}, but checkout is ${checkout} and main is ${main}. Withholding verification dates; the next scheduled audit must gather fresh evidence. Do not rebase these stamps.`);
  }
}

export async function checkAuditMergeRevision({ audited, repo, request }) {
  const commit = await request("GET", `/repos/${repo}/commits/main`);
  assertAuditRevision({ audited, checkout: audited, main: commit?.sha });
}

async function selfTest() {
  const { default: assert } = await import("node:assert/strict");
  const { parse } = await import("yaml");
  const audited = "a".repeat(40);
  const moved = "b".repeat(40);
  assert.doesNotThrow(() => assertAuditRevision({ audited, checkout: audited, main: audited }));
  assert.throws(() => assertAuditRevision({ audited, checkout: moved, main: audited }), /Do not rebase/);
  assert.throws(() => assertAuditRevision({ audited, checkout: audited, main: moved }), /fresh evidence/);
  for (const bad of [undefined, "", "HEAD", "a".repeat(39)]) {
    assert.throws(() => assertAuditRevision({ audited: bad, checkout: audited, main: audited }), /malformed/);
    assert.throws(() => assertAuditRevision({ audited, checkout: bad, main: audited }), /malformed/);
    assert.throws(() => assertAuditRevision({ audited, checkout: audited, main: bad }), /malformed/);
  }
  const request = async (method, path) => {
    assert.equal(method, "GET");
    assert.equal(path, "/repos/owner/repo/commits/main");
    return { sha: audited };
  };
  await checkAuditMergeRevision({ audited, repo: "owner/repo", request });
  await assert.rejects(checkAuditMergeRevision({ audited, repo: "owner/repo", request: async () => ({ sha: moved }) }), /fresh evidence/);
  await assert.rejects(checkAuditMergeRevision({ audited, repo: "owner/repo", request: async () => ({}) }), /malformed/);
  await assert.rejects(checkAuditMergeRevision({ audited, repo: "owner/repo", request: async () => { throw new Error("503"); } }), /503/);

  // Run the real opener offline. A main move during a successful head check
  // must leave the PR open, never call merge, and never refresh its branch.
  const mockFetch = `
    const calls = []; let mainReads = 0;
    process.on('exit', () => console.log('MOCK_CALLS ' + JSON.stringify(calls)));
    globalThis.fetch = async (url, options = {}) => {
      const path = new URL(url).pathname + new URL(url).search;
      const method = options.method || 'GET';
      calls.push({method, path, sha: options.body ? JSON.parse(options.body).sha : undefined});
      const pr = {number: 1, html_url: 'https://github.com/owner/repo/pull/1', head: {sha: '${"c".repeat(40)}'}};
      let body = {}, status = 200;
      if (path.includes('/actions/variables/')) status = 404;
      else if (path.endsWith('/commits/main')) {
        const value = process.env.MOCK_MAIN_SEQUENCE[Math.min(mainReads++, 1)];
        if (value === 'x') status = 503; else body = {sha: value.repeat(40)};
      } else if (path.includes('/pulls?')) body = [pr];
      else if (path.endsWith('/pulls/1')) body = pr;
      else if (path.includes('/check-runs?')) body = {check_runs: [{status: 'completed', conclusion: 'success'}]};
      else if (path.includes('/actions/runs?')) body = {workflow_runs: []};
      else if (method === 'POST' && ['/labels', '/comments', '/dispatches'].some(s => path.endsWith(s))) body = {};
      else if (method === 'PUT' && path.endsWith('/merge')) body = {merged: true};
      else if (method === 'DELETE' && path.includes('/git/refs/heads/')) body = {};
      else throw new Error('Unexpected offline request: ' + method + ' ' + path);
      return new Response(JSON.stringify(body), {status});
    };
  `;
  for (const [sequence, auditEnabled, expectedExit] of [["aa", true, 0], ["bb", true, 1], ["ab", true, 1], ["xx", true, 1], ["ab", false, 0]]) {
    const env = { PATH: process.env.PATH, GITHUB_TOKEN: "offline-test-only", GITHUB_REPOSITORY: "owner/repo", BRANCH: "automation/test", PR_TITLE: "fixture", PR_AUTO_MERGE: "true", REQUIRED_CHECK_POLL_MS: "1", REQUIRED_CHECK_TIMEOUT_MS: "1000", MOCK_MAIN_SEQUENCE: sequence };
    if (auditEnabled) env.PR_AUDIT_SOURCE_COMMIT = audited;
    const result = spawnSync(process.execPath, ["--import", `data:text/javascript,${encodeURIComponent(mockFetch)}`, "scripts/open-automation-pr.mjs"], { env, encoding: "utf8", timeout: 5000 });
    assert.equal(result.status, expectedExit, result.stderr);
    const calls = JSON.parse(result.stdout.split("\n").find((line) => line.startsWith("MOCK_CALLS ")).slice(11));
    const merges = calls.filter((call) => call.method === "PUT");
    assert.equal(merges.length, expectedExit === 0 ? 1 : 0);
    if (merges.length) assert.equal(merges[0].sha, "c".repeat(40), "merge stays bound to the validated head");
    if (expectedExit === 1) assert(calls.some((call) => call.path.endsWith("/comments")), "a withheld PR gets an actionable explanation");
    if (auditEnabled && sequence === "ab") assert(calls.some((call) => call.path.includes("/check-runs?")), "main movement after a green head check is caught");
    if (!auditEnabled) assert(!calls.some((call) => call.path.endsWith("/commits/main")), "other writer lanes retain their publishing contract");
  }

  const workflow = parse(readFileSync(".github/workflows/daily-audit.yml", "utf8"));
  const steps = workflow.jobs["verification-dates"].steps;
  const check = steps.findIndex((s) => s.name === "Check audit evidence revision");
  const bump = steps.findIndex((s) => /bump-verified-dates/.test(s.run || ""));
  assert(check >= 0 && check < bump);
  assert.match(steps[check].run, /check-audit-revision\.mjs --check-main/);
  const finalCheck = steps.findIndex((s) => s.name === "Check audited revision before publishing");
  const validation = steps.findIndex((s) => s.name === "Validate before commit");
  const publish = steps.findIndex((s) => s.name === "Publish through a validated, auto-merged PR");
  assert(validation < finalCheck && finalCheck < publish);
  assert.match(steps[finalCheck].run, /check-audit-revision\.mjs --check-main/);
  assert.match(steps[publish].run, /PR_AUDIT_SOURCE_COMMIT="\$\(cat \.audit\/source-commit\.txt\)"/);
  console.log("audit-revision self-test passed: stale evidence, moved main and unreadable revisions all withhold publishing.");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const run = process.argv.includes("--self-test") ? selfTest() : Promise.resolve().then(() => {
    const audited = readFileSync(".audit/source-commit.txt", "utf8").trim();
    const git = (args) => execFileSync("git", args, { encoding: "utf8" }).trim();
    const checkout = git(["rev-parse", "HEAD"]);
    let main = checkout;
    if (process.argv.includes("--check-main")) {
      git(["fetch", "--no-tags", "--quiet", "origin", "main"]);
      main = git(["rev-parse", "FETCH_HEAD"]);
    }
    assertAuditRevision({ audited, checkout, main });
    console.log(`Audit source and checkout${process.argv.includes("--check-main") ? " and current main" : ""} agree at ${audited}.`);
  });
  run.catch((err) => { console.error(`::error::${err.message}`); process.exitCode = 1; });
}
