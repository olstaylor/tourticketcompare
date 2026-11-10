#!/usr/bin/env node
// Audit observations belong to one commit. Never transplant date stamps onto
// a refreshed checkout, or publish them after main has moved past that commit.
import { execFileSync, spawnSync } from "node:child_process";
import { readFileSync, mkdtempSync, writeFileSync, rmSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { withholdRun } from "./lib/withhold-run.mjs";

export function assertAuditRevision({ audited, checkout, main }) {
  if (![audited, checkout, main].every((sha) => /^[0-9a-f]{40}$/.test(sha || ""))) {
    throw new Error("Missing or malformed audit revision; withholding verification-date writes and publishing.");
  }
  if (audited !== checkout || audited !== main) {
    throw Object.assign(new Error(`Audit reports describe ${audited}, but checkout is ${checkout} and main is ${main}. Withholding verification dates; the next scheduled audit must gather fresh evidence. Do not rebase these stamps.`), { code: "STALE_AUDIT" });
  }
}

// Paths whose content the audit observes or stamps. A main that moved only
// outside them (code, docs, workflows) still holds exactly the data the
// evidence describes, so the stamps may be built on it instead of withheld.
// 2026-10-16: #1598 (scripts and docs only) merged mid-audit and withheld a
// full day of verification dates.
export const EVIDENCE_PATH_PREFIXES = ["public/data/", "data/", "content/"];
// Inside those prefixes, files no audit step reads: blog posts and their
// generated bundle. 2026-11-06: #2096 (two blog data stories) merged while the
// stamps' exact head was being validated and withheld the day's verification
// dates. The audit reads events, artists, guides and guide-source checks only
// (verify-outbound-links, audit-tm-events, check-guide-source-links,
// daily-audit-report); keep this list to paths none of them read.
export const NON_EVIDENCE_PATHS = ["content/blog/", "public/data/blog-content.json"];

export function isEvidencePath(file) {
  if (NON_EVIDENCE_PATHS.some((path) => (path.endsWith("/") ? file.startsWith(path) : file === path))) return false;
  return EVIDENCE_PATH_PREFIXES.some((prefix) => file.startsWith(prefix));
}

// Returns `main` when the evidence still describes it, otherwise null. Pure
// over the injected git runner. `audited` must be an ancestor of `main`, and
// no file under an evidence prefix may differ between them.
export function evidenceBaseFor({ audited, main, git }) {
  if (![audited, main].every((sha) => /^[0-9a-f]{40}$/.test(sha || ""))) return null;
  if (audited === main) return main;
  try {
    git(["merge-base", "--is-ancestor", audited, main]);
  } catch {
    return null;
  }
  const changed = git(["diff", "--name-only", audited, main]).split("\n").map((line) => line.trim()).filter(Boolean);
  return changed.some(isEvidencePath) ? null : main;
}

// GitHub's compare API lists at most 300 files; a longer list is incomplete
// and can never prove a move was outside the evidence.
const COMPARE_FILE_LIMIT = 300;

async function changedBetween({ from, to, repo, request }) {
  const cmp = await request("GET", `/repos/${repo}/compare/${from}...${to}`);
  if (cmp?.status !== "ahead" || cmp.merge_base_commit?.sha !== from) {
    throw Object.assign(new Error(`${from.slice(0, 7)} is not an ancestor of ${to.slice(0, 7)}.`), { code: "STALE_AUDIT" });
  }
  const files = Array.isArray(cmp.files) ? cmp.files : [];
  if (files.length >= COMPARE_FILE_LIMIT || files.length === 0) {
    throw Object.assign(new Error(`Cannot list every file changed between ${from.slice(0, 7)} and ${to.slice(0, 7)}.`), { code: "STALE_AUDIT" });
  }
  return files.flatMap((f) => [f.filename, f.previous_filename]).filter(Boolean);
}

// Main moved while the stamps' exact head was being validated. When the move
// touched no evidence path and none of the stamped files, the evidence still
// describes the new main (the same rule --establish-base applies before
// stamping), and the stamps' files can be carried onto it unchanged: the new
// head is new main plus exactly the validated stamp files, as a direct child
// of new main. It has no checks yet, so the caller must earn the required
// check on it again before mergeAuditedPr (which stays exact). Any other move
// throws STALE_AUDIT and the stamps are withheld as before.
export async function rebuildAuditHead({ evidence, audited, main, head, branch, files, repo, request }) {
  for (const sha of [evidence, audited, main, head]) {
    if (!/^[0-9a-f]{40}$/.test(sha || "")) throw new Error("Missing or malformed revision; the audit head cannot be rebuilt.");
  }
  if (!Array.isArray(files) || files.length === 0) throw new Error("No stamped files named; the audit head cannot be rebuilt.");
  if (main === audited) throw new Error("Main has not moved; nothing to rebuild.");
  const headCommit = await request("GET", `/repos/${repo}/git/commits/${head}`);
  if (headCommit?.sha !== head || headCommit.parents?.length !== 1 || headCommit.parents[0]?.sha !== audited) {
    throw Object.assign(new Error("Audit PR is not a direct child of the audited revision; its evidence is invalidated."), { code: "STALE_AUDIT" });
  }
  const stamped = await changedBetween({ from: audited, to: head, repo, request });
  const unexpected = stamped.filter((file) => !files.includes(file));
  if (unexpected.length) {
    throw Object.assign(new Error(`Audit head changes files outside the stamp allowlist (${unexpected.slice(0, 5).join(", ")}).`), { code: "STALE_AUDIT" });
  }
  const moved = await changedBetween({ from: evidence, to: main, repo, request });
  const blocking = moved.filter((file) => isEvidencePath(file) || files.includes(file));
  if (blocking.length) {
    throw Object.assign(new Error(`Main moved to ${main.slice(0, 7)} and changed evidence or stamped files (${blocking.slice(0, 5).join(", ")}). Withholding verification dates; the next scheduled audit must gather fresh evidence. Do not rebase these stamps.`), { code: "STALE_AUDIT" });
  }
  if (evidence !== audited) await changedBetween({ from: audited, to: main, repo, request });
  const tree = [];
  for (const path of [...new Set(stamped)]) {
    const entry = await request("GET", `/repos/${repo}/contents/${path.split("/").map(encodeURIComponent).join("/")}?ref=${head}`);
    if (entry?.type !== "file" || !/^[0-9a-f]{40}$/.test(entry.sha || "")) throw new Error(`Could not read ${path} at the validated head.`);
    tree.push({ path, mode: "100644", type: "blob", sha: entry.sha });
  }
  const mainCommit = await request("GET", `/repos/${repo}/git/commits/${main}`);
  if (!/^[0-9a-f]{40}$/.test(mainCommit?.tree?.sha || "")) throw new Error("Could not read the tree of current main.");
  const newTree = await request("POST", `/repos/${repo}/git/trees`, { base_tree: mainCommit.tree.sha, tree });
  const commit = await request("POST", `/repos/${repo}/git/commits`, { message: headCommit.message, tree: newTree.sha, parents: [main] });
  if (!/^[0-9a-f]{40}$/.test(commit?.sha || "")) throw new Error("GitHub did not return the rebuilt audit commit.");
  await request("PATCH", `/repos/${repo}/git/refs/heads/${branch}`, { sha: commit.sha, force: true });
  return commit.sha;
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

  // Rebuild onto a main that moved outside the evidence (2026-11-06, #2096).
  {
    const A = "a".repeat(40), M = "b".repeat(40), H = "c".repeat(40), N = "e".repeat(40), E = "f".repeat(40);
    const stampFiles = ["public/data/artists.json", "PROJECT_STATUS.md"];
    const fakeRequest = ({ moved, stamped = stampFiles, ancestor = true, headParent = A }) => {
      const calls = [];
      const request = async (method, path, payload) => {
        calls.push({ method, path, payload });
        if (method === "GET" && path.endsWith(`/git/commits/${H}`)) return { sha: H, message: "Bump verification timestamps", parents: [{ sha: headParent }] };
        if (method === "GET" && path.endsWith(`/git/commits/${M}`)) return { sha: M, tree: { sha: "d".repeat(40) } };
        if (method === "GET" && path.includes("/compare/")) {
          const [from, to] = path.split("/compare/")[1].split("...");
          if (to === H) return { status: "ahead", merge_base_commit: { sha: from }, files: stamped.map((filename) => ({ filename })) };
          return ancestor ? { status: "ahead", merge_base_commit: { sha: from }, files: moved.map((filename) => ({ filename })) } : { status: "diverged", merge_base_commit: { sha: "0".repeat(40) }, files: [] };
        }
        if (method === "GET" && path.includes("/contents/")) return { type: "file", sha: "9".repeat(40) };
        if (method === "POST" && path.endsWith("/git/trees")) return { sha: "8".repeat(40) };
        if (method === "POST" && path.endsWith("/git/commits")) return { sha: N };
        if (method === "PATCH" && path.endsWith("/git/refs/heads/automation/verified-dates")) return {};
        throw new Error(`unexpected ${method} ${path}`);
      };
      return { calls, request };
    };
    const args = { evidence: A, audited: A, main: M, head: H, branch: "automation/verified-dates", files: stampFiles, repo: "o/r" };
    for (const moved of [["content/blog/x.md", "public/data/blog-content.json", "reports/data-stories/x/figures.json", "docs/X.md"], ["scripts/a.mjs"]]) {
      const { calls, request } = fakeRequest({ moved });
      assert.equal(await rebuildAuditHead({ ...args, request }), N);
      const tree = calls.find((c) => c.path.endsWith("/git/trees")).payload;
      assert.equal(tree.base_tree, "d".repeat(40), "the rebuilt tree is current main's");
      assert.deepEqual(tree.tree.map((t) => t.path).sort(), [...stampFiles].sort(), "only the validated stamp files are carried over");
      assert(calls.some((c) => c.path.includes(`/contents/public/data/artists.json?ref=${H}`)), "stamp blobs come from the validated head");
      assert.deepEqual(calls.find((c) => c.method === "POST" && c.path.endsWith("/git/commits")).payload.parents, [M], "the rebuilt head is a direct child of current main");
      const ref = calls.find((c) => c.method === "PATCH");
      assert.equal(ref.path, "/repos/o/r/git/refs/heads/automation/verified-dates", "only the automation branch moves, never main");
    }
    for (const [label, opts] of [
      ["an event-data move", { moved: ["public/data/events.json"] }],
      ["a guide move", { moved: ["content/guides/x.md"] }],
      ["a data/ move", { moved: ["data/provider-identities.json"] }],
      ["a move of a stamped file", { moved: ["PROJECT_STATUS.md"] }],
      ["a move too long to list", { moved: Array.from({ length: 300 }, (_, i) => `docs/${i}.md`) }],
      ["a main the evidence is not an ancestor of", { moved: ["docs/X.md"], ancestor: false }],
      ["a head that changes an unlisted file", { moved: ["docs/X.md"], stamped: [...stampFiles, "public/data/events.json"] }],
      ["a head that is not a direct child", { moved: ["docs/X.md"], headParent: E }],
    ]) {
      const { calls, request } = fakeRequest(opts);
      await assert.rejects(rebuildAuditHead({ ...args, request }), (err) => err.code === "STALE_AUDIT", `${label} withholds the stamps`);
      assert(!calls.some((c) => c.method !== "GET"), `${label} writes nothing`);
    }
    await assert.rejects(rebuildAuditHead({ ...args, main: A, request: fakeRequest({ moved: [] }).request }), /not moved/);
    await assert.rejects(rebuildAuditHead({ ...args, files: [], request: fakeRequest({ moved: [] }).request }), /No stamped files/);
    assert.equal(isEvidencePath("content/blog/x.md"), false);
    assert.equal(isEvidencePath("public/data/blog-content.json"), false);
    assert.equal(isEvidencePath("public/data/blog-content.json.bak"), true, "exclusions are exact files or folders, not prefixes of names");
    for (const file of ["public/data/events.json", "public/data/artists.json", "content/guides/x.md", "data/x.json", "public/data/guides-content.json"]) assert.equal(isEvidencePath(file), true, file);
  }

  // The real opener, offline: main moves outside the evidence while the head
  // is validated; with rebuilds enabled the stamps are carried onto new main,
  // the required check is earned again on the rebuilt head, and main
  // fast-forwards to exactly that head.
  {
    const rebuildMock = `
      const calls = []; let phase = 'a'; let head = 'c'; let merged = false;
      process.on('exit', () => console.log('MOCK_CALLS ' + JSON.stringify(calls)));
      globalThis.fetch = async (url, options = {}) => {
        const path = new URL(url).pathname + new URL(url).search;
        const method = options.method || 'GET';
        const payload = options.body ? JSON.parse(options.body) : undefined;
        calls.push({method, path, body: payload});
        const pr = {number: 1, state: 'open', base: {ref: 'main'}, html_url: 'x', head: {sha: head.repeat(40)}, merged, merge_commit_sha: merged ? head.repeat(40) : null};
        let body = {}, status = 200;
        if (path.includes('/actions/variables/')) status = 404;
        else if (path.endsWith('/commits/main')) body = {sha: (merged ? head : phase).repeat(40)};
        else if (path.includes('/pulls?')) body = [pr];
        else if (path.endsWith('/pulls/1')) body = pr;
        else if (path.includes('/check-runs?')) { body = {check_runs: [{status: 'completed', conclusion: 'success'}]}; if (head === 'c') phase = process.env.MOCK_MOVE || 'b'; }
        else if (path.includes('/actions/runs?')) body = {workflow_runs: []};
        else if (method === 'GET' && path.includes('/git/commits/' + 'c'.repeat(40))) body = {sha: 'c'.repeat(40), message: 'stamps', parents: [{sha: 'a'.repeat(40)}]};
        else if (method === 'GET' && path.includes('/git/commits/' + 'e'.repeat(40))) body = {sha: 'e'.repeat(40), parents: [{sha: 'b'.repeat(40)}]};
        else if (method === 'GET' && path.includes('/git/commits/' + 'b'.repeat(40))) body = {sha: 'b'.repeat(40), tree: {sha: 'd'.repeat(40)}};
        else if (method === 'GET' && path.includes('/compare/')) {
          const to = path.split('...')[1];
          body = {status: 'ahead', merge_base_commit: {sha: path.split('/compare/')[1].split('...')[0]}, files: (to.startsWith('c') ? ['public/data/artists.json'] : [process.env.MOCK_MOVED_FILE]).map((filename) => ({filename}))};
        }
        else if (method === 'GET' && path.includes('/contents/')) body = {type: 'file', sha: '9'.repeat(40)};
        else if (method === 'POST' && path.endsWith('/git/trees')) body = {sha: '8'.repeat(40)};
        else if (method === 'POST' && path.endsWith('/git/commits')) body = {sha: 'e'.repeat(40)};
        else if (method === 'PATCH' && path.endsWith('/git/refs/heads/automation/test')) head = 'e';
        else if (method === 'PATCH' && path.endsWith('/git/refs/heads/main')) { if (payload.force !== false) throw new Error('forced main'); merged = true; body = {object: {sha: payload.sha}}; }
        else if (method === 'PATCH' && path.endsWith('/pulls/1')) body = {state: 'closed'};
        else if (method === 'POST' && ['/labels', '/comments', '/dispatches'].some(s => path.endsWith(s))) body = {};
        else if (method === 'DELETE') body = {};
        else throw new Error('Unexpected offline request: ' + method + ' ' + path);
        return new Response(JSON.stringify(body), {status});
      };
    `;
    const runOpener = (extra) => {
      const env = { PATH: process.env.PATH, GITHUB_TOKEN: "offline-test-only", GITHUB_REPOSITORY: "owner/repo", BRANCH: "automation/test", PR_TITLE: "fixture", PR_AUTO_MERGE: "true", REQUIRED_CHECK_POLL_MS: "1", REQUIRED_CHECK_TIMEOUT_MS: "1000", PR_AUDIT_SOURCE_COMMIT: audited, PR_AUDIT_STAMP_FILES: "public/data/artists.json PROJECT_STATUS.md", MOCK_MOVED_FILE: "content/blog/x.md", ...extra };
      const result = spawnSync(process.execPath, ["--import", `data:text/javascript,${encodeURIComponent(rebuildMock)}`, "scripts/open-automation-pr.mjs"], { env, encoding: "utf8", timeout: 5000 });
      const calls = JSON.parse(result.stdout.split("\n").find((line) => line.startsWith("MOCK_CALLS ")).slice(11));
      return { result, calls };
    };
    let { result, calls } = runOpener({ PR_AUDIT_MAX_REBUILDS: "1" });
    assert.equal(result.status, 0, result.stderr);
    const mainWrites = calls.filter((c) => c.method === "PATCH" && c.path.endsWith("/git/refs/heads/main"));
    assert.equal(mainWrites.length, 1);
    assert.equal(mainWrites[0].body.sha, "e".repeat(40), "main fast-forwards to the rebuilt head only");
    assert.equal(calls.filter((c) => c.path.endsWith("/dispatches")).length, 2, "the required check is earned again on the rebuilt head");
    assert(!calls.some((c) => c.method === "PATCH" && c.path.endsWith("/pulls/1")), "a rebuilt PR is not closed");
    ({ result, calls } = runOpener({}));
    assert.equal(result.status, 1, "rebuilds stay off unless the workflow opts in");
    assert(!calls.some((c) => c.method === "PATCH" && c.path.endsWith("/git/refs/heads/main")));
    assert(calls.some((c) => c.method === "PATCH" && c.path.endsWith("/pulls/1") && c.body.state === "closed"));
    ({ result, calls } = runOpener({ PR_AUDIT_MAX_REBUILDS: "1", MOCK_MOVED_FILE: "public/data/events.json" }));
    assert.equal(result.status, 1, "an evidence move still withholds");
    assert(!calls.some((c) => c.method === "PATCH" && /refs\/heads\/(main|automation)/.test(c.path)), "an evidence move rebuilds nothing and publishes nothing");
    assert(calls.some((c) => c.method === "PATCH" && c.path.endsWith("/pulls/1") && c.body.state === "closed"));
  }

  const workflow = parse(readFileSync(".github/workflows/daily-audit.yml", "utf8"));
  const steps = workflow.jobs["verification-dates"].steps;
  const check = steps.findIndex((s) => s.name === "Check audit evidence revision");
  const bump = steps.findIndex((s) => /bump-verified-dates/.test(s.run || ""));
  assert(check >= 0 && check < bump);
  assert.match(steps[check].run, /check-audit-revision\.mjs --check-main --establish-base --withhold-when-stale/);
  assert.equal(steps[check].env?.GITHUB_TOKEN, "${{ github.token }}", "a neutral withhold needs the token to cancel this run");
  const finalCheck = steps.findIndex((s) => s.name === "Check audited revision before publishing");
  const validation = steps.findIndex((s) => s.name === "Validate before commit");
  const publish = steps.findIndex((s) => s.name === "Publish through a validated, auto-merged PR");
  assert(validation < finalCheck && finalCheck < publish);
  assert.match(steps[finalCheck].run, /check-audit-revision\.mjs --check-main --withhold-when-stale/);
  assert.equal(steps[finalCheck].env?.GITHUB_TOKEN, "${{ github.token }}");
  assert.match(steps[check].run, /--establish-base/, "only the check before stamping may move the evidence base");
  assert.doesNotMatch(steps[finalCheck].run, /--establish-base/, "the check before publishing stays exact");
  assert.match(steps[publish].run, /PR_AUDIT_SOURCE_COMMIT="\$\(cat \.audit\/evidence-base\.txt\)"/);
  assert.match(steps[publish].run, /PR_AUDIT_EVIDENCE_COMMIT="\$\(cat \.audit\/source-commit\.txt\)"/, "rebuilds are judged against the commit the audit observed");
  const allowlist = steps.find((s) => s.name === "Assert the diff contains only allowlisted files");
  assert.deepEqual(steps[publish].env.PR_AUDIT_STAMP_FILES.split(" ").sort(), allowlist.run.split(/\s+/).filter((w) => /\.(json|md)$/.test(w)).sort(), "a rebuild carries exactly the allowlisted stamp files");
  assert.equal(steps[publish].env.PR_AUDIT_MAX_REBUILDS, "1");
  assert(Number(steps[publish].env.PR_AUDIT_REBUILD_DEADLINE_MINUTES) < steps[publish]["timeout-minutes"], "a rebuilt head's check ends before the step cap");
  assert.equal(steps[publish].env.RUN_CANCEL_TOKEN, "${{ github.token }}", "a stale merge-time withhold ends neutral");

  // Evidence base: real git history, not mocks.
  const history = mkdtempSync(join(tmpdir(), "audit-evidence-base-"));
  try {
    const g = (args) => execFileSync("git", args, { cwd: history, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
    g(["init", "--quiet", "--initial-branch=main"]);
    for (const [key, value] of [["user.name", "Fixture"], ["user.email", "fixture@localhost"]]) g(["config", key, value]);
    const commitFile = (file, text) => {
      execFileSync("mkdir", ["-p", join(history, file, "..")]);
      writeFileSync(join(history, file), text);
      g(["add", "-A"]);
      g(["commit", "--quiet", "-m", file]);
      return g(["rev-parse", "HEAD"]);
    };
    const base = commitFile("public/data/events.json", "[]\n");
    const codeOnly = commitFile("scripts/tool.mjs", "1\n");
    const docsToo = commitFile("docs/OPERATIONS.md", "x\n");
    assert.equal(evidenceBaseFor({ audited: base, main: base, git: g }), base);
    assert.equal(evidenceBaseFor({ audited: base, main: docsToo, git: g }), docsToo, "code and docs moves keep the evidence valid");
    const dataMove = commitFile("public/data/events/_shards/001.json", "[]\n");
    assert.equal(evidenceBaseFor({ audited: base, main: dataMove, git: g }), null, "any event-data change invalidates the evidence");
    assert.equal(evidenceBaseFor({ audited: codeOnly, main: dataMove, git: g }), null);
    const blogMove = commitFile("content/blog/story.md", "1\n");
    assert.equal(evidenceBaseFor({ audited: dataMove, main: blogMove, git: g }), blogMove, "a blog post move keeps the evidence valid");
    for (const file of ["data/guide-source-link-checks.json", "content/guides/x.md"]) {
      const moved = commitFile(file, "1\n");
      assert.equal(evidenceBaseFor({ audited: dataMove, main: moved, git: g }), null, `${file} invalidates the evidence`);
    }
    g(["checkout", "--quiet", "-b", "side", base]);
    const sibling = commitFile("README.md", "side\n");
    assert.equal(evidenceBaseFor({ audited: sibling, main: docsToo, git: g }), null, "evidence from a commit that is not an ancestor of main is never reused");
    assert.equal(evidenceBaseFor({ audited: "HEAD", main: docsToo, git: g }), null);
  } finally { rmSync(history, { recursive: true, force: true }); }
  console.log("audit-revision self-test passed: atomic fast-forward race, stale-PR closure, fresh integration and unreadable evidence.");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const run = process.argv.includes("--self-test") ? selfTest() : Promise.resolve().then(() => {
    const sourceCommit = readFileSync(".audit/source-commit.txt", "utf8").trim();
    const git = (args) => execFileSync("git", args, { encoding: "utf8" }).trim();
    const checkout = git(["rev-parse", "HEAD"]);
    let main = checkout;
    if (process.argv.includes("--check-main")) {
      git(["fetch", "--no-tags", "--quiet", "origin", "main"]);
      main = git(["rev-parse", "FETCH_HEAD"]);
    }
    // --establish-base (the check before stamping): accept a main that moved
    // only outside the evidence paths, and record it as the revision every
    // later check and the merge are bound to. Later checks read that record
    // and stay exact.
    let audited = sourceCommit;
    if (process.argv.includes("--establish-base")) {
      const base = checkout === main ? evidenceBaseFor({ audited: sourceCommit, main, git }) : null;
      if (base && base !== sourceCommit) {
        console.log(`main moved ${sourceCommit.slice(0, 7)} -> ${base.slice(0, 7)} without touching ${EVIDENCE_PATH_PREFIXES.join(", ")} (other than ${NON_EVIDENCE_PATHS.join(", ")}); the evidence still describes it, so stamps build on ${base.slice(0, 7)}.`);
      }
      if (base) audited = base;
      writeFileSync(".audit/evidence-base.txt", `${audited}\n`);
    } else if (existsSync(".audit/evidence-base.txt")) {
      audited = readFileSync(".audit/evidence-base.txt", "utf8").trim();
    }
    try {
      assertAuditRevision({ audited, checkout, main });
    } catch (err) {
      // --withhold-when-stale: main moving during the audit (another writer
      // or a human merge) invalidates the evidence but is not a fault. The
      // stamps are still withheld; the run just ends neutral, not red.
      if (err.code === "STALE_AUDIT" && process.argv.includes("--withhold-when-stale")) return withholdRun({ reason: err.message });
      throw err;
    }
    console.log(`Audit source and checkout${process.argv.includes("--check-main") ? " and current main" : ""} agree at ${audited}.`);
  });
  run.catch((err) => { console.error(`::error::${err.message}`); process.exitCode = 1; });
}
