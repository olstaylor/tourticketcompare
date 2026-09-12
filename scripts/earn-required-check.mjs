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

import { earnRequiredCheck, classifyCheck, DEFAULT_TIMEOUT_MS, DEFAULT_POLL_MS } from "./lib/required-check.mjs";

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
  // re-dispatch must supersede an older red one. Newest completion wins.
  check(
    "newest completion wins",
    classifyCheck([
      { status: "completed", conclusion: "failure" },
      { status: "completed", conclusion: "success" },
    ]).state,
    "passed"
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
  const ref = await request("GET", `/repos/${repo}/git/ref/heads/${encodeURIComponent(branch)}`);
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
