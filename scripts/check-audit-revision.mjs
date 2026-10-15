#!/usr/bin/env node
// Audit observations belong to one commit. Never transplant date stamps onto
// a refreshed checkout, or publish them after main has moved past that commit.
import { execFileSync, spawnSync } from "node:child_process";
import { readFileSync, mkdtempSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

export function assertAuditRevision({ audited, checkout, main }) {
  if (![audited, checkout, main].every((sha) => /^[0-9a-f]{40}$/.test(sha || ""))) {
    throw new Error("Missing or malformed audit revision; withholding verification-date writes and publishing.");
  }
  if (audited !== checkout || audited !== main) {
    throw Object.assign(new Error(`Audit reports describe ${audited}, but checkout is ${checkout} and main is ${main}. Withholding verification dates; the next scheduled audit must gather fresh evidence. Do not rebase these stamps.`), { code: "STALE_AUDIT" });
  }
}

export async function checkAuditMergeRevision({ audited, repo, request }) {
  const commit = await request("GET", `/repos/${repo}/commits/main`);
  assertAuditRevision({ audited, checkout: audited, main: commit?.sha });
}

// The audit head must be a direct child of its evidence commit. A non-forced
// ref update can then advance main only from that parent: any competing commit
// is a sibling, and GitHub atomically rejects it as a non-fast-forward. Existing
// required checks still apply to the exact head; no new unvalidated commit is
// constructed. GitHub recognises that PR head in main as a fast-forward merge.
export async function mergeAuditedPr({ audited, repo, head, number, request, sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms)) }) {
  assertAuditRevision({ audited, checkout: audited, main: audited });
  const pr = await request("GET", `/repos/${repo}/pulls/${number}`);
  if (pr.head?.sha !== head || pr.base?.ref !== "main") {
    throw Object.assign(new Error("Audit PR head or target changed; fresh evidence and validation are required."), { code: "STALE_AUDIT" });
  }
  if (pr.state !== "open") throw new Error("Audit PR is no longer open; publication is withheld.");
  const commit = await request("GET", `/repos/${repo}/git/commits/${head}`);
  if (commit.sha !== head || commit.parents?.length !== 1 || commit.parents[0]?.sha !== audited) {
    throw Object.assign(new Error("Audit PR is not a direct child of the audited revision; its evidence is invalidated."), { code: "STALE_AUDIT" });
  }
  await checkAuditMergeRevision({ audited, repo, request });
  try {
    const updated = await request("PATCH", `/repos/${repo}/git/refs/heads/main`, { sha: head, force: false });
    if (updated.object?.sha !== head) throw new Error("GitHub did not confirm the validated audit head in main.");
  } catch (err) {
    // A lost response may follow a successful integration. Recognise only
    // GitHub's merged PR with this exact head; otherwise expose the failure.
    const latest = await request("GET", `/repos/${repo}/pulls/${number}`);
    if (latest.merged && latest.merge_commit_sha === head) return;
    const live = await request("GET", `/repos/${repo}/commits/main`);
    if (live?.sha !== head) {
      let includesHead = false;
      if (/^[0-9a-f]{40}$/.test(live?.sha || "")) {
        const comparison = await request("GET", `/repos/${repo}/compare/${head}...${live.sha}`);
        includesHead = comparison.status === "ahead" && comparison.merge_base_commit?.sha === head;
      }
      if (!includesHead) {
        assertAuditRevision({ audited, checkout: audited, main: live?.sha });
        throw err;
      }
    }
    // The write reached main even though its response was lost. PR merge
    // metadata is asynchronous; continue confirmation below, never invalidate
    // an already published, validated head as stale evidence.
  }
  for (let attempt = 0; attempt < 5; attempt++) {
    const latest = await request("GET", `/repos/${repo}/pulls/${number}`);
    if (latest.merged && latest.merge_commit_sha === head) return;
    await sleep(2000);
  }
  throw new Error("Validated audit head reached main, but GitHub has not confirmed its PR merge. Inspect the PR; do not replay the stamps.");
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

  // Exercise the native fast-forward constraint, not just an HTTP mock: main
  // advances AFTER it was observed clean, so the old direct-child audit head
  // must be rejected. A new head based on fresh main must integrate normally.
  const fixture = mkdtempSync(join(tmpdir(), "audit-fast-forward-"));
  try {
    const origin = join(fixture, "origin.git");
    const auditRepo = join(fixture, "audit");
    const competingRepo = join(fixture, "competing");
    const git = (cwd, args) => execFileSync("git", args, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
    git(fixture, ["init", "--bare", "--initial-branch=main", origin]);
    git(fixture, ["clone", origin, auditRepo]);
    for (const [key, value] of [["user.name", "Fixture"], ["user.email", "fixture@localhost"]]) git(auditRepo, ["config", key, value]);
    writeFileSync(join(auditRepo, "facts"), "audited\n");
    git(auditRepo, ["add", "facts"]);
    git(auditRepo, ["commit", "-m", "audited base"]);
    git(auditRepo, ["push", "origin", "main"]);
    const base = git(origin, ["rev-parse", "main"]);
    git(auditRepo, ["checkout", "-b", "audit"]);
    writeFileSync(join(auditRepo, "stamps"), "old audit\n");
    git(auditRepo, ["add", "stamps"]);
    git(auditRepo, ["commit", "-m", "validated audit head"]);
    const auditHead = git(auditRepo, ["rev-parse", "HEAD"]);
    assert.equal(git(auditRepo, ["rev-parse", "HEAD^"]), base);
    assertAuditRevision({ audited: base, checkout: base, main: git(origin, ["rev-parse", "main"]) });
    git(fixture, ["clone", origin, competingRepo]);
    for (const [key, value] of [["user.name", "Fixture"], ["user.email", "fixture@localhost"]]) git(competingRepo, ["config", key, value]);
    writeFileSync(join(competingRepo, "facts"), "main advanced after check\n");
    git(competingRepo, ["commit", "-am", "competing writer"]);
    git(competingRepo, ["push", "origin", "main"]);
    const advanced = git(origin, ["rev-parse", "main"]);
    assert.throws(() => git(auditRepo, ["push", "origin", `${auditHead}:refs/heads/main`]), /rejected|non-fast-forward/);
    assert.equal(git(origin, ["rev-parse", "main"]), advanced, "a last-moment base move cannot be overwritten");
    writeFileSync(join(competingRepo, "stamps"), "fresh audit\n");
    git(competingRepo, ["add", "stamps"]);
    git(competingRepo, ["commit", "-m", "fresh validated audit head"]);
    const freshHead = git(competingRepo, ["rev-parse", "HEAD"]);
    assert.equal(git(competingRepo, ["rev-parse", "HEAD^"]), advanced);
    git(competingRepo, ["push", "origin", `${freshHead}:refs/heads/main`]);
    assert.equal(git(origin, ["rev-parse", "main"]), freshHead);
  } finally { rmSync(fixture, { recursive: true, force: true }); }

  // Run the real opener offline. A main move during a successful head check
  // must close the invalidated PR and never refresh its branch.
  const mockFetch = `
    const calls = []; let mainReads = 0; let integrated = false; let mergeReads = 0;
    process.on('exit', () => console.log('MOCK_CALLS ' + JSON.stringify(calls)));
    globalThis.fetch = async (url, options = {}) => {
      const path = new URL(url).pathname + new URL(url).search;
      const method = options.method || 'GET';
      calls.push({method, path, body: options.body ? JSON.parse(options.body) : undefined});
      const merged = integrated && (!process.env.MOCK_LOST_RESPONSE || ++mergeReads > 1);
      const changed = path.endsWith('/pulls/1') && process.env.MOCK_CHANGED_PR;
      const pr = {number: 1, state: 'open', base: {ref: changed === 'base' ? 'other' : 'main'}, html_url: 'https://github.com/owner/repo/pull/1', head: {sha: (changed === 'head' ? 'd' : 'c').repeat(40)}, merged, merge_commit_sha: merged ? '${"c".repeat(40)}' : null};
      let body = {}, status = 200;
      if (path.includes('/actions/variables/')) status = 404;
      else if (path.endsWith('/commits/main')) {
        const values = process.env.MOCK_MAIN_SEQUENCE;
        const value = values[Math.min(mainReads++, values.length - 1)];
        if (value === 'x') status = 503; else body = {sha: integrated ? (process.env.MOCK_ADVANCED_AFTER_WRITE ? 'd' : 'c').repeat(40) : value.repeat(40)};
      } else if (path.includes('/pulls?')) body = [pr];
      else if (path.endsWith('/pulls/1')) body = pr;
      else if (path.includes('/git/commits/')) body = {sha: '${"c".repeat(40)}', parents: [{sha: (process.env.MOCK_BAD_PARENT ? 'b' : 'a').repeat(40)}]};
      else if (path.includes('/compare/')) body = {status: process.env.MOCK_ADVANCED_AFTER_WRITE ? 'ahead' : 'diverged', merge_base_commit: {sha: (process.env.MOCK_ADVANCED_AFTER_WRITE ? 'c' : 'a').repeat(40)}};
      else if (path.includes('/check-runs?')) body = {check_runs: [{status: 'completed', conclusion: 'success'}]};
      else if (path.includes('/actions/runs?')) body = {workflow_runs: []};
      else if (method === 'POST' && ['/labels', '/comments', '/dispatches'].some(s => path.endsWith(s))) body = {};
      else if (method === 'PUT' && path.endsWith('/merge')) body = {merged: true};
      else if (method === 'PATCH' && path.endsWith('/git/refs/heads/main')) {
        if (JSON.parse(options.body).force !== false) throw new Error('Audit integration must never force a ref');
        if (process.env.MOCK_MAIN_SEQUENCE === 'aaab') status = 422;
        else {integrated = true; body = {object: {sha: '${"c".repeat(40)}'}}; if (process.env.MOCK_LOST_RESPONSE) throw new Error('Lost successful response');}
      }
      else if (method === 'PATCH' && path.endsWith('/pulls/1')) body = {state: 'closed'};
      else if (method === 'DELETE' && path.includes('/git/refs/heads/')) body = {};
      else throw new Error('Unexpected offline request: ' + method + ' ' + path);
      return new Response(JSON.stringify(body), {status});
    };
  `;
  for (const [sequence, auditEnabled, expectedExit, badParent, changedPr, lostResponse, advancedAfterWrite] of [["aaa", true, 0], ["bb", true, 1], ["ab", true, 1], ["xx", true, 1], ["ab", false, 0], ["aaab", true, 1], ["aaa", true, 1, true], ["aaa", true, 1, false, "head"], ["aaa", true, 1, false, "base"], ["aaa", true, 0, false, undefined, true], ["aaa", true, 0, false, undefined, true, true]]) {
    const env = { PATH: process.env.PATH, GITHUB_TOKEN: "offline-test-only", GITHUB_REPOSITORY: "owner/repo", BRANCH: "automation/test", PR_TITLE: "fixture", PR_AUTO_MERGE: "true", REQUIRED_CHECK_POLL_MS: "1", REQUIRED_CHECK_TIMEOUT_MS: "1000", MOCK_MAIN_SEQUENCE: sequence };
    if (auditEnabled) env.PR_AUDIT_SOURCE_COMMIT = audited;
    if (badParent) env.MOCK_BAD_PARENT = "true";
    if (changedPr) env.MOCK_CHANGED_PR = changedPr;
    if (lostResponse) env.MOCK_LOST_RESPONSE = "true";
    if (advancedAfterWrite) env.MOCK_ADVANCED_AFTER_WRITE = "true";
    const result = spawnSync(process.execPath, ["--import", `data:text/javascript,${encodeURIComponent(mockFetch)}`, "scripts/open-automation-pr.mjs"], { env, encoding: "utf8", timeout: 5000 });
    assert.equal(result.status, expectedExit, result.stderr);
    const calls = JSON.parse(result.stdout.split("\n").find((line) => line.startsWith("MOCK_CALLS ")).slice(11));
    const merges = calls.filter((call) => call.method === "PUT" || (call.method === "PATCH" && call.path.endsWith("/git/refs/heads/main")));
    assert.equal(merges.length, expectedExit === 0 || sequence === "aaab" ? 1 : 0);
    if (merges.length) assert.equal(merges[0].body.sha, "c".repeat(40), "merge stays bound to the validated head");
    if (merges.length && auditEnabled) {
      assert.equal(merges[0].method, "PATCH");
      assert.equal(merges[0].body.force, false, "atomic audit integration cannot force main");
    }
    if (expectedExit === 1) assert(calls.some((call) => call.path.endsWith("/comments")), "a withheld PR gets an actionable explanation");
    if (auditEnabled && sequence === "ab") assert(calls.some((call) => call.path.includes("/check-runs?")), "main movement after a green head check is caught");
    if (!auditEnabled) assert(!calls.some((call) => call.path.endsWith("/commits/main")), "other writer lanes retain their publishing contract");
    if ((auditEnabled && ["bb", "ab", "aaab"].includes(sequence)) || badParent || changedPr) assert(calls.some((call) => call.method === "PATCH" && call.path.endsWith("/pulls/1") && call.body.state === "closed"), "invalidated audit PRs close instead of inviting a manual merge");
    if (lostResponse) assert(!calls.some((call) => call.method === "PATCH" && call.path.endsWith("/pulls/1")), "a published head with delayed merge metadata must not be closed as stale");
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
  console.log("audit-revision self-test passed: atomic fast-forward race, stale-PR closure, fresh integration and unreadable evidence.");
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
