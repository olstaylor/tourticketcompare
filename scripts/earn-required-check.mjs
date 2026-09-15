#!/usr/bin/env node
// CLI over scripts/lib/required-check.mjs.
//
// Runs the real Prelaunch Validation workflow against an already-pushed branch
// and waits for the `test-mvp` required status check to land on that branch's
// head, so the commit can be published under the `main` ruleset. The automation
// lanes reach this through scripts/open-automation-pr.mjs; this entry point is
// for unsticking a branch by hand (and for the self-test).
//
//   GITHUB_TOKEN=... GITHUB_REPOSITORY=owner/repo \
//     node scripts/earn-required-check.mjs --branch automation/some-branch
//
// Exits 0 only when the check passed on the resolved SHA.

import {
  reportStrandedPrValidation,
  isStrandedValidationRun,
  earnRequiredCheck,
  classifyCheck,
  DEFAULT_TIMEOUT_MS,
  DEFAULT_POLL_MS,
} from "./lib/required-check.mjs";

if (process.argv.includes("--self-test")) {
  const failures = [];
  const check = (label, actual, expected) => {
    if (actual !== expected) failures.push(`${label}: expected ${expected}, got ${actual}`);
  };

  check("no runs yet is pending", classifyCheck([]).state, "pending");
  check("queued is pending", classifyCheck([{ status: "queued" }]).state, "pending");
  check("success passes", classifyCheck([{ status: "completed", conclusion: "success" }]).state, "passed");
  check("failure fails", classifyCheck([{ status: "completed", conclusion: "failure" }]).state, "failed");
  check("cancelled fails", classifyCheck([{ status: "completed", conclusion: "cancelled" }]).state, "failed");
  // A red verdict must never be rescued by an older green one, and a green
  // re-dispatch must supersede an older red one. Newest completion wins, read
  // from the timestamps: GitHub returns these newest-started first, so the
  // later verdict is not the last element.
  check(
    "the later failure beats the earlier success",
    classifyCheck([
      { status: "completed", conclusion: "failure", completed_at: "2026-08-26T15:57:05Z" },
      { status: "completed", conclusion: "success", completed_at: "2026-08-26T15:56:59Z" },
    ]).state,
    "failed"
  );
  check(
    "the later success beats the earlier failure",
    classifyCheck([
      { status: "completed", conclusion: "success", completed_at: "2026-08-26T16:10:00Z" },
      { status: "completed", conclusion: "failure", completed_at: "2026-08-26T15:57:05Z" },
    ]).state,
    "passed"
  );
  // With no timestamps at all, keep the API's newest-first order.
  check(
    "untimed runs fall back to the first entry",
    classifyCheck([
      { status: "completed", conclusion: "failure" },
      { status: "completed", conclusion: "success" },
    ]).state,
    "failed"
  );
  check("timed out while running", classifyCheck([{ status: "in_progress" }], { elapsedMs: 10, timeoutMs: 5 }).state, "timeout");
  check("timed out never started", classifyCheck([], { elapsedMs: 10, timeoutMs: 5 }).state, "timeout");
  check(
    "a completed run beats the deadline",
    classifyCheck([{ status: "completed", conclusion: "success" }], { elapsedMs: 10, timeoutMs: 5 }).state,
    "passed"
  );

  // The loop itself: dispatch once, poll until the verdict, never merge on red.
  const calls = [];
  const scripted = (responses) => async (method, path, body) => {
    calls.push(`${method} ${path.split("?")[0]}${body ? ` ${JSON.stringify(body)}` : ""}`);
    const next = responses.shift();
    if (next instanceof Error) throw next;
    return next;
  };
  const quiet = () => {};
  const green = await earnRequiredCheck({
    request: scripted([
      null,
      { check_runs: [] },
      { check_runs: [{ status: "in_progress" }] },
      { check_runs: [{ status: "completed", conclusion: "success", html_url: "https://example.test/run" }] },
    ]),
    repo: "o/r",
    branch: "automation/x",
    sha: "0123456789abcdef",
    pollMs: 0,
    sleep: async () => {},
    log: quiet,
  });
  check("green run is ok", green.ok, true);
  check("green run reports the check url", green.url, "https://example.test/run");
  check("dispatch is raised once", calls.filter((c) => c.startsWith("POST")).length, 1);
  check("dispatch names the branch", calls[0].includes('{"ref":"automation/x"}'), true);

  const red = await earnRequiredCheck({
    request: scripted([null, { check_runs: [{ status: "completed", conclusion: "failure" }] }]),
    repo: "o/r",
    branch: "automation/x",
    sha: "0123456789abcdef",
    pollMs: 0,
    sleep: async () => {},
    log: quiet,
  });
  check("red run is not ok", red.ok, false);
  check("red run states the conclusion", red.state, "failed");

  // A transient read error is not a verdict: keep polling, then honour the
  // real answer when it arrives.
  const flaky = await earnRequiredCheck({
    request: scripted([
      null,
      new Error("502 bad gateway"),
      { check_runs: [{ status: "completed", conclusion: "success" }] },
    ]),
    repo: "o/r",
    branch: "automation/x",
    sha: "0123456789abcdef",
    pollMs: 0,
    sleep: async () => {},
    log: quiet,
  });
  check("a transient read error does not decide the verdict", flaky.ok, true);

  const undispatchable = await earnRequiredCheck({
    request: scripted([new Error("403 Resource not accessible by integration")]),
    repo: "o/r",
    branch: "automation/x",
    sha: "0123456789abcdef",
    pollMs: 0,
    sleep: async () => {},
    log: quiet,
  });
  check("a refused dispatch is not ok", undispatchable.ok, false);
  check("a refused dispatch says so", undispatchable.state, "dispatch-failed");

  // The deadline must actually end the wait rather than poll forever.
  let ticks = 0;
  const stalled = await earnRequiredCheck({
    request: async () => ({ check_runs: [{ status: "queued" }] }),
    repo: "o/r",
    branch: "automation/x",
    sha: "0123456789abcdef",
    timeoutMs: 30,
    pollMs: 0,
    sleep: async () => {
      ticks += 1;
    },
    now: () => ticks * 10,
    log: quiet,
  });
  check("a stalled check times out", stalled.state, "timeout");
  check("a stalled check is not ok", stalled.ok, false);

  // reportStrandedPrValidation: it must recognise exactly the runs GitHub
  // stranded, reading the CONCLUSION rather than the status.
  //
  // This is the correction that matters. GitHub creates these runs already
  // `completed` with `conclusion: "action_required"` — never in a pending
  // status — so both earlier predicates (`status !== "completed"`, then
  // `["action_required","waiting"].includes(status)`) matched nothing at all,
  // and the lanes logged a clean result while every red accumulated. Assert the
  // real shape, in the real field.
  const prelaunch = ".github/workflows/prelaunch-validation.yml";
  const runsOnSha = {
    workflow_runs: [
      // Stranded as GitHub actually reports it, in both of its guises: as born,
      // and after the PR close flips it.
      { id: 1, event: "pull_request", status: "completed", conclusion: "action_required", path: prelaunch },
      { id: 5, event: "pull_request", status: "completed", conclusion: "failure", path: prelaunch },
      // The dispatched run that carries the verdict — never ours to touch.
      { id: 2, event: "workflow_dispatch", status: "completed", conclusion: "success", path: prelaunch },
      // A genuine pull_request validation run that passed. Not stranded.
      { id: 3, event: "pull_request", status: "completed", conclusion: "success", path: prelaunch },
      // Another workflow entirely.
      { id: 4, event: "pull_request", status: "completed", conclusion: "failure", path: ".github/workflows/daily-audit.yml" },
      // A real run still going. Not stranded, and nothing may act on it.
      { id: 6, event: "pull_request", status: "in_progress", conclusion: null, path: prelaunch },
      // A GENUINE red: it executed jobs and a test failed. Identical to id 5 in
      // the runs listing, and the whole reason `failure` alone cannot decide.
      // Calling this recursion-guard noise would bury a real failure.
      { id: 8, event: "pull_request", status: "completed", conclusion: "failure", path: prelaunch },
    ],
  };
  // Job counts as the jobs endpoint reports them: the stranded run never ran,
  // the genuine red ran three.
  const jobCounts = { 5: 0, 8: 3, 4: 2 };
  const named = [];
  let writes = 0;
  const strandedCount = await reportStrandedPrValidation({
    request: async (method, pathname) => {
      if (method !== "GET") { writes += 1; return null; }
      const m = pathname.match(/\/actions\/runs\/(\d+)\/jobs/);
      if (m) return { total_count: jobCounts[Number(m[1])] ?? 0 };
      return runsOnSha;
    },
    repo: "o/r",
    sha: "0123456789abcdef",
    log: quiet,
    warn: (msg) => named.push(String(msg)),
  });
  check("counts exactly the stranded runs", strandedCount, 2);
  check("names the as-born action_required run", named.some((m) => m.includes("run 1 on")), true);
  check("names the flipped failure run", named.some((m) => m.includes("run 5 on")), true);
  check("never names the dispatched verdict run", named.some((m) => m.includes("run 2 on")), false);
  check("never names a passing pull_request run", named.some((m) => m.includes("run 3 on")), false);
  check("never names another workflow", named.some((m) => m.includes("run 4 on")), false);
  check("never names a run still in progress", named.some((m) => m.includes("run 6 on")), false);
  // The distinction Codex flagged on #996: a failed run that actually executed
  // jobs is a real failure, and must never be labelled recursion-guard noise.
  check("never calls a run with jobs stranded", named.some((m) => m.includes("run 8 on") && m.includes("Stranded")), false);
  check("names a genuine red as a real failure", named.some((m) => m.includes("run 8 on") && m.includes("real failure")), true);
  // It must stay read-only. Cancelling is impossible on a completed run, and a
  // write here would be a silent no-op at best.
  check("issues no writes at all", writes, 0);

  // The predicate, asserted directly in the field GitHub actually uses.
  check("stranded: completed/action_required", isStrandedValidationRun({ status: "completed", conclusion: "action_required" }), true);
  check("stranded: completed/failure with zero jobs", isStrandedValidationRun({ status: "completed", conclusion: "failure" }, 0), true);
  check("NOT stranded: completed/failure that ran jobs", isStrandedValidationRun({ status: "completed", conclusion: "failure" }, 3), false);
  check("NOT stranded: completed/failure, job count unknown", isStrandedValidationRun({ status: "completed", conclusion: "failure" }, null), false);
  check("not stranded: completed/success", isStrandedValidationRun({ status: "completed", conclusion: "success" }), false);
  check("not stranded: in_progress", isStrandedValidationRun({ status: "in_progress", conclusion: null }), false);
  check("not stranded: a bare status string", isStrandedValidationRun({ status: "action_required" }), false);

  // A read that fails must never propagate: the call sites site this outside
  // the try that reports a withheld merge, and no diagnostic may fail a lane.
  const swallowed = await reportStrandedPrValidation({
    request: async () => { throw new Error("boom"); },
    repo: "o/r",
    sha: "0123456789abcdef",
    log: quiet,
    warn: quiet,
  });
  check("an API failure is swallowed", swallowed, 0);

  // Misuse must not throw either.
  let threw = false;
  const misused = await reportStrandedPrValidation({ repo: "o/r", log: quiet, warn: quiet }).catch(() => {
    threw = true;
    return -1;
  });
  check("misuse does not throw", threw, false);
  check("misuse reports nothing", misused, 0);

  if (failures.length > 0) {
    for (const failure of failures) console.error(`FAIL ${failure}`);
    process.exit(1);
  }
  console.log("OK: required-check self-test");
  process.exit(0);
}

const token = process.env.GITHUB_TOKEN;
const repo = process.env.GITHUB_REPOSITORY;
const args = process.argv.slice(2);
const readArg = (name) => {
  const index = args.indexOf(name);
  return index >= 0 ? args[index + 1] : "";
};
const branch = readArg("--branch") || process.env.BRANCH || "";
let sha = readArg("--sha") || "";

if (!token || !repo || !branch) {
  console.error("GITHUB_TOKEN, GITHUB_REPOSITORY and --branch are required.");
  process.exit(2);
}

async function request(method, path, payload) {
  const res = await fetch(`https://api.github.com${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "tourticketcompare-required-check",
    },
    body: payload ? JSON.stringify(payload) : undefined,
  });
  if (!res.ok) throw new Error(`GitHub API ${method} ${path} ${res.status}: ${await res.text()}`);
  return res.status === 204 || res.status === 201 ? null : res.json();
}

if (!sha) {
  // The slashes in an automation branch name are path separators here, so
  // the ref is not URL-encoded.
  const ref = await request("GET", `/repos/${repo}/git/ref/heads/${branch}`);
  sha = ref?.object?.sha || "";
}
if (!sha) {
  console.error(`Could not resolve the head SHA of ${branch}.`);
  process.exit(2);
}

const verdict = await earnRequiredCheck({
  request,
  repo,
  branch,
  sha,
  timeoutMs: Number(process.env.REQUIRED_CHECK_TIMEOUT_MS || DEFAULT_TIMEOUT_MS),
  pollMs: Number(process.env.REQUIRED_CHECK_POLL_MS || DEFAULT_POLL_MS),
});

if (!verdict.ok) {
  console.error(`Required check not earned: ${verdict.detail}${verdict.url ? ` (${verdict.url})` : ""}`);
  process.exit(1);
}
console.log(`Required check earned on ${sha.slice(0, 7)}${verdict.url ? `: ${verdict.url}` : ""}`);
