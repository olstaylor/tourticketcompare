#!/usr/bin/env node
// Queues a scheduled event-data writer behind any OLDER writer run that is
// still in flight, then fast-forwards the checkout to the branch tip.
//
//   node scripts/wait-for-writer-lanes.mjs [--max-wait-minutes N]
//
// Why this exists. Several lanes rewrite the same files (public/data/events*,
// PROJECT_STATUS.md) and each one auto-merges its own PR. Their crons are
// spaced so that each normally starts after the previous one has merged —
// but cron times are request times, and GitHub can start a lane hours late.
// When it does, lanes that should run in sequence run side by side, and the
// later one branches from a `main` that is about to move under it:
//
//   2026-09-26 nightly-data-sync  created 08:46Z from 9de7cd3; tm-new-shows
//              merged #1182 at 09:01Z -> #1183 conflicted, left open
//   2026-09-26 vividseats-cta-sync created 09:58Z; seatgeek-cta-sync merged
//              #1185 at 10:01Z -> #1186 conflicted, left open
//   2026-09-27 vividseats-cta-sync created 10:37Z; seatgeek-cta-sync merged
//              #1202 at 10:41Z -> #1203 conflicted, left open
//
// Nothing was wrong with any of those diffs; each lane lost a day of
// publishing (205 Vivid Seats links on the last one) to ordering alone.
//
// Why not a shared `concurrency:` group. GitHub keeps at most ONE pending run
// per group and cancels the previous pending run when another arrives, so
// with three or more lanes bunched together one of them would be silently
// dropped — exchanging a visible conflict for an invisible lost run.
//
// So instead: first-in, first-out by run creation time. A run waits only for
// writer runs created before it, so no two runs can wait on each other, and a
// lane that starts late simply queues behind whatever is already going. Once
// nothing older is in flight it fast-forwards the checkout, because
// actions/checkout pinned the commit that was `main` when the run was
// *created*, and whatever it waited for has merged since.
//
// This is an ordering aid, not a gate: every failure (API error, budget
// exhausted, fast-forward refused) warns and carries on from the checkout it
// already has, which is exactly the behaviour before this script existed.

import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync } from "node:fs";
import { pathToFileURL } from "node:url";

// Every workflow that commits event data. A run of any of these that is older
// than ours and not yet completed is something to wait for. The self-test
// derives the same set from the workflow files, so a new writer cannot ship
// without being listed here.
export const WRITER_LANES = [
  "nightly-data-sync.yml",
  "tm-new-shows-pr.yml",
  "tm-data-refresh-pr.yml",
  "seatgeek-cta-sync.yml",
  "vividseats-cta-sync.yml",
  "impact-marketplace-provider-sync.yml",
  "auto-promote.yml",
  "autopublish-health.yml",
  "work-queue-repair.yml",
];

// The lanes that wait. The others are still waited FOR; they just have no
// headroom under the < 60 minute job cap (configure-automation-identity.mjs)
// to spend queueing, and none of them has lost a race yet.
export const WAITING_LANES = [
  "work-queue-repair.yml",
  "nightly-data-sync.yml",
  "tm-new-shows-pr.yml",
  "seatgeek-cta-sync.yml",
  "vividseats-cta-sync.yml",
  "impact-marketplace-provider-sync.yml",
];

// A SeatGeek sync takes ~15 minutes end to end, a Vivid Seats sync ~7; 14
// minutes covers the observed collisions and keeps every waiting job under
// its 59-minute cap. Past it we proceed exactly as before this script.
export const DEFAULT_MAX_WAIT_MINUTES = 14;
export const POLL_MS = 30_000;
const ACTIVE_STATUSES = ["in_progress", "queued", "pending"];

const workflowFile = (run) => String(run?.path || "").split("@")[0].split("/").pop();

// The older, still-active writer runs `self` must wait for. Pure.
export function findBlockers({ runs, self, lanes = WRITER_LANES }) {
  const selfAt = Date.parse(self.created_at);
  const seen = new Set();
  return (runs || []).filter((run) => {
    if (!run || run.id === self.id || seen.has(run.id)) return false;
    seen.add(run.id);
    if (run.status === "completed") return false;
    if (!lanes.includes(workflowFile(run))) return false;
    const at = Date.parse(run.created_at);
    // Ties go to the lower id, so two runs created in the same second still
    // order themselves one way round and never wait on each other.
    return at < selfAt || (at === selfAt && run.id < self.id);
  });
}

// Waits until findBlockers is empty or the budget is spent. Never throws.
// `listActiveRuns()` resolves to every non-completed run in the repository.
export async function waitForWriterLanes({
  self,
  listActiveRuns,
  maxWaitMs = DEFAULT_MAX_WAIT_MINUTES * 60_000,
  pollMs = POLL_MS,
  now = () => Date.now(),
  sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
  log = console.log,
  warn = console.warn,
}) {
  const start = now();
  for (;;) {
    let blockers;
    try {
      blockers = findBlockers({ runs: await listActiveRuns(), self });
    } catch (err) {
      warn(`::warning::Could not list workflow runs (${err.message}); continuing without waiting.`);
      return { outcome: "api-error", waitedMs: now() - start };
    }
    if (blockers.length === 0) {
      log(now() > start ? `No older writer run is in flight after ${Math.round((now() - start) / 1000)}s.` : "No older writer run is in flight.");
      return { outcome: "clear", waitedMs: now() - start };
    }
    const names = blockers.map((r) => `${workflowFile(r)} #${r.run_number ?? r.id} (${r.status})`).join(", ");
    if (now() - start + pollMs > maxWaitMs) {
      warn(`::warning::Still behind ${names} after ${Math.round((now() - start) / 60_000)} min; continuing anyway. A merge conflict on this run's PR is the likely result.`);
      return { outcome: "timeout", waitedMs: now() - start, blockers };
    }
    log(`Waiting for older writer run(s): ${names}`);
    await sleep(pollMs);
  }
}

async function github(path, token) {
  const res = await fetch(`https://api.github.com${path}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" },
  });
  if (!res.ok) throw new Error(`GET ${path} -> ${res.status}`);
  return res.json();
}

// Moves the checkout to the current branch tip, fast-forward only. Never throws.
function fastForward({ ref, git, log, warn }) {
  if (!ref.startsWith("refs/heads/")) {
    log(`${ref} is not a branch; leaving the checkout where it is.`);
    return;
  }
  try {
    if (git(["status", "--porcelain"]).trim()) {
      warn("::warning::Working tree is not clean; not fast-forwarding.");
      return;
    }
    const before = git(["rev-parse", "HEAD"]).trim();
    git(["fetch", "--no-tags", "origin", ref]);
    git(["merge", "--ff-only", "FETCH_HEAD"]);
    const after = git(["rev-parse", "HEAD"]).trim();
    log(before === after ? `Checkout is already the tip of ${ref} (${after.slice(0, 7)}).` : `Fast-forwarded ${ref} ${before.slice(0, 7)} -> ${after.slice(0, 7)}.`);
  } catch (err) {
    warn(`::warning::Could not fast-forward to the tip of ${ref} (${err.message.split("\n")[0]}); continuing from the original checkout.`);
  }
}

async function main(argv) {
  const at = argv.indexOf("--max-wait-minutes");
  const maxWaitMinutes = at === -1 ? DEFAULT_MAX_WAIT_MINUTES : Number(argv[at + 1]);
  if (!Number.isFinite(maxWaitMinutes) || maxWaitMinutes < 0) throw new Error("--max-wait-minutes needs a non-negative number.");
  const { GITHUB_TOKEN: token, GITHUB_REPOSITORY: repo, GITHUB_RUN_ID: runId, GITHUB_REF: ref = "" } = process.env;
  const git = (args) => execFileSync("git", args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });

  if (!token || !repo || !runId) {
    console.warn("::warning::GITHUB_TOKEN, GITHUB_REPOSITORY or GITHUB_RUN_ID missing; not waiting.");
  } else {
    let self = null;
    try {
      self = await github(`/repos/${repo}/actions/runs/${runId}`, token);
    } catch (err) {
      console.warn(`::warning::Could not read this run (${err.message}); not waiting.`);
    }
    if (self) {
      await waitForWriterLanes({
        self,
        maxWaitMs: maxWaitMinutes * 60_000,
        listActiveRuns: async () => {
          const pages = await Promise.all(
            ACTIVE_STATUSES.map((status) => github(`/repos/${repo}/actions/runs?status=${status}&per_page=100`, token))
          );
          return pages.flatMap((page) => page.workflow_runs || []);
        },
      });
    }
  }
  fastForward({ ref, git, log: console.log, warn: console.warn });
}

async function selfTest() {
  const { default: assert } = await import("node:assert/strict");
  const { parse } = await import("yaml");

  const run = (id, file, created, status = "in_progress") => ({
    id,
    run_number: id,
    path: `.github/workflows/${file}`,
    created_at: created,
    status,
  });
  const self = run(50, "vividseats-cta-sync.yml", "2026-09-27T10:37:32Z");

  // --- findBlockers ----------------------------------------------------
  const older = run(40, "seatgeek-cta-sync.yml", "2026-09-27T10:28:04Z");
  assert.deepEqual(findBlockers({ runs: [older], self }).map((r) => r.id), [40], "the 2026-09-27 collision must wait");
  assert.deepEqual(findBlockers({ runs: [self], self }), [], "a run never waits on itself");
  assert.deepEqual(findBlockers({ runs: [run(60, "seatgeek-cta-sync.yml", "2026-09-27T10:40:00Z")], self }), [], "a younger run waits on us, not the reverse");
  assert.deepEqual(findBlockers({ runs: [{ ...older, status: "completed" }], self }), [], "a completed run is not in flight");
  assert.deepEqual(findBlockers({ runs: [run(41, "prelaunch-validation.yml", "2026-09-27T10:30:00Z")], self }), [], "non-writer workflows are ignored");
  assert.deepEqual(findBlockers({ runs: [older, older], self }).length, 1, "a run listed under two statuses counts once");
  assert.deepEqual(
    findBlockers({ runs: [{ ...older, path: ".github/workflows/seatgeek-cta-sync.yml@refs/heads/main" }], self }).length,
    1,
    "a ref-suffixed workflow path still matches"
  );
  // Same-second creation: exactly one of the pair waits.
  const twinA = run(70, "seatgeek-cta-sync.yml", "2026-09-27T10:00:00Z");
  const twinB = run(71, "vividseats-cta-sync.yml", "2026-09-27T10:00:00Z");
  assert.equal(findBlockers({ runs: [twinA, twinB], self: twinA }).length, 0, "the lower id goes first");
  assert.equal(findBlockers({ runs: [twinA, twinB], self: twinB }).length, 1, "the higher id waits");

  // --- waitForWriterLanes ------------------------------------------------
  const quiet = () => {};
  const clock = () => {
    let t = 0;
    return { now: () => t, sleep: async (ms) => { t += ms; } };
  };

  let c = clock();
  let verdict = await waitForWriterLanes({ self, listActiveRuns: async () => [], ...c, log: quiet, warn: quiet });
  assert.equal(verdict.outcome, "clear");
  assert.equal(verdict.waitedMs, 0, "nothing in flight means no wait at all");

  c = clock();
  const answers = [[older], [older], [{ ...older, status: "completed" }]];
  verdict = await waitForWriterLanes({ self, listActiveRuns: async () => answers.shift(), ...c, log: quiet, warn: quiet });
  assert.equal(verdict.outcome, "clear", "waits until the older run completes");
  assert.equal(verdict.waitedMs, 2 * POLL_MS);

  c = clock();
  verdict = await waitForWriterLanes({ self, listActiveRuns: async () => [older], maxWaitMs: 5 * 60_000, ...c, log: quiet, warn: quiet });
  assert.equal(verdict.outcome, "timeout", "the budget is honoured");
  assert(verdict.waitedMs <= 5 * 60_000, "never waits past the budget");

  c = clock();
  verdict = await waitForWriterLanes({ self, listActiveRuns: async () => { throw new Error("503"); }, ...c, log: quiet, warn: quiet });
  assert.equal(verdict.outcome, "api-error", "an API failure proceeds instead of failing the lane");

  // --- workflow wiring -------------------------------------------------
  const workflows = Object.fromEntries(
    readdirSync(".github/workflows")
      .filter((f) => f.endsWith(".yml"))
      .map((f) => [f, parse(readFileSync(`.github/workflows/${f}`, "utf8"))])
  );
  const writes = (wf) =>
    Object.values(wf.jobs || {}).some((job) =>
      (job.steps || []).some((s) => /git add[^\n]*public\/data\/events|sync-tm-events-write-pr\.mjs|node scripts\/run-work-queue-repair\.mjs(?! --self-test)/.test(s.run || ""))
    );
  const derived = Object.keys(workflows).filter((f) => writes(workflows[f])).sort();
  assert.deepEqual(derived, [...WRITER_LANES].sort(), "WRITER_LANES must list exactly the workflows that commit event data");
  for (const file of WAITING_LANES) {
    assert(WRITER_LANES.includes(file), `${file}: a waiting lane must also be a writer`);
    const jobs = Object.values(workflows[file].jobs);
    assert.equal(jobs.length, 1, `${file}: expected one job`);
    const [job] = jobs;
    const steps = job.steps || [];
    const checkoutAt = steps.findIndex((s) => /^actions\/checkout@/.test(s.uses || ""));
    const wait = steps[checkoutAt + 1];
    assert(/node scripts\/wait-for-writer-lanes\.mjs/.test(wait?.run || ""), `${file}: the wait must directly follow checkout, before dependencies are installed`);
    assert.equal(wait.env?.GITHUB_TOKEN, "${{ github.token }}", `${file}: the wait reads runs with the job token`);
    const budget = Number((/--max-wait-minutes (\d+)/.exec(wait.run) || [])[1] ?? DEFAULT_MAX_WAIT_MINUTES);
    assert(job["timeout-minutes"] >= 30 + budget, `${file}: timeout-minutes must leave the lane its usual time on top of the ${budget}-minute wait`);
    const perms = workflows[file].permissions || job.permissions || {};
    assert(["read", "write"].includes(perms.actions), `${file}: listing runs needs actions: read`);
  }

  console.log("wait-for-writer-lanes self-test passed.");
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const run = process.argv.includes("--self-test") ? selfTest() : main(process.argv.slice(2));
  run.catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
