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
// An exhausted wait, unreadable run list or failed checkout refresh stops
// before any data is generated or a PR is published. The next scheduled run
// retries from current main rather than creating a predictably stale PR.

import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync } from "node:fs";
import { pathToFileURL } from "node:url";
import { DEFAULT_TIMEOUT_MS as REQUIRED_CHECK_TIMEOUT_MS } from "./lib/required-check.mjs";

// Every workflow that commits event data. A run of any of these that is older
// than ours and not yet completed is something to wait for. The self-test
// derives the same set from the workflow files, so a new writer cannot ship
// without being listed here.
export const WRITER_LANES = [
  "daily-audit.yml",
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

// Daily audit writes shared status figures even though it does not write
// events. Its two publishing jobs wait separately, after the read-only audit.
export const WAITING_LANES = [
  "auto-promote.yml",
  "autopublish-health.yml",
  "tm-data-refresh-pr.yml",
  "daily-audit.yml",
  "work-queue-repair.yml",
  "nightly-data-sync.yml",
  "tm-new-shows-pr.yml",
  "seatgeek-cta-sync.yml",
  "vividseats-cta-sync.yml",
  "impact-marketplace-provider-sync.yml",
];

// The default is short; resale reserves 60 minutes, while later Impact
// providers reserve cumulative queue time plus their own work/validation.
export const DEFAULT_MAX_WAIT_MINUTES = 14;
export const POLL_MS = 30_000;
const ACTIVE_STATUSES = ["in_progress", "queued", "pending"];

// These lanes share a static GitHub concurrency group. A queued peer cannot
// start while our run holds that group, even if it was created before us:
// GitHub does not promise FIFO ordering for concurrency groups.
export const SHARED_WRITER_GROUPS = {
  "tm-new-shows-pr.yml": "tm-new-shows-pr",
  "tm-data-refresh-pr.yml": "tm-data-refresh-pr",
  "auto-promote.yml": "auto-promote",
  "autopublish-health.yml": "autopublish-health",
  "work-queue-repair.yml": "work-queue-repair",
  "daily-audit.yml": "ticketmaster-api",
  "nightly-data-sync.yml": "ticketmaster-api",
  "seatgeek-cta-sync.yml": "resale-cta-sync",
  "vividseats-cta-sync.yml": "resale-cta-sync",
};

const workflowFile = (run) => String(run?.path || "").split("@")[0].split("/").pop();

// The older, still-active writer runs `self` must wait for. Pure.
export function findBlockers({ runs, self, lanes = WRITER_LANES }) {
  const selfAt = Date.parse(self.created_at);
  if (!Number.isFinite(selfAt) || !self.id || !workflowFile(self) || !Array.isArray(runs)) {
    throw new Error("Invalid writer run metadata");
  }
  const seen = new Set();
  return (runs || []).filter((run) => {
    if (!run || run.id === self.id || seen.has(run.id)) return false;
    seen.add(run.id);
    if (run.status === "completed") return false;
    if (!lanes.includes(workflowFile(run))) return false;
    const group = SHARED_WRITER_GROUPS[workflowFile(self)];
    if (group && group === SHARED_WRITER_GROUPS[workflowFile(run)]
      && ["queued", "pending"].includes(run.status)) return false;
    const at = Date.parse(run.created_at);
    if (!Number.isFinite(at)) throw new Error("Invalid competing writer timestamp");
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
      warn(`::error::Could not list workflow runs (${err.message}); withholding this writer.`);
      return { outcome: "api-error", waitedMs: now() - start };
    }
    if (blockers.length === 0) {
      log(now() > start ? `No older writer run is in flight after ${Math.round((now() - start) / 1000)}s.` : "No older writer run is in flight.");
      return { outcome: "clear", waitedMs: now() - start };
    }
    const names = blockers.map((r) => `${workflowFile(r)} #${r.run_number ?? r.id} (${r.status})`).join(", ");
    if (now() - start + pollMs > maxWaitMs) {
      warn(`::error::Still behind ${names} after ${Math.round((now() - start) / 60_000)} min; withholding this writer. Retry from current main on the next run.`);
      return { outcome: "timeout", waitedMs: now() - start, blockers };
    }
    log(`Waiting for older writer run(s): ${names}`);
    await sleep(pollMs);
  }
}

export function requireClearQueue(result) {
  if (result?.outcome !== "clear") throw new Error(`Writer ordering ${result?.outcome || "unknown"}; no data or PR will be produced.`);
}

async function github(path, token) {
  const res = await fetch(`https://api.github.com${path}`, {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" },
  });
  if (!res.ok) throw new Error(`GET ${path} -> ${res.status}`);
  return res.json();
}

// Moves the checkout to the current branch tip, fast-forward only.
export function fastForward({ ref, git, log }) {
  if (!ref.startsWith("refs/heads/")) {
    log(`${ref} is not a branch; leaving the checkout where it is.`);
    return;
  }
  try {
    if (git(["status", "--porcelain"]).trim()) {
      throw new Error("Working tree is not clean");
    }
    const before = git(["rev-parse", "HEAD"]).trim();
    git(["fetch", "--no-tags", "origin", ref]);
    git(["merge", "--ff-only", "FETCH_HEAD"]);
    const after = git(["rev-parse", "HEAD"]).trim();
    log(before === after ? `Checkout is already the tip of ${ref} (${after.slice(0, 7)}).` : `Fast-forwarded ${ref} ${before.slice(0, 7)} -> ${after.slice(0, 7)}.`);
  } catch (err) {
    throw new Error(`Could not fast-forward to the tip of ${ref} (${err.message.split("\n")[0]}); withholding this writer.`);
  }
}

async function main(argv) {
  const at = argv.indexOf("--max-wait-minutes");
  const maxWaitMinutes = at === -1 ? DEFAULT_MAX_WAIT_MINUTES : Number(argv[at + 1]);
  if (!Number.isFinite(maxWaitMinutes) || maxWaitMinutes < 0) throw new Error("--max-wait-minutes needs a non-negative number.");
  const { GITHUB_TOKEN: token, GITHUB_REPOSITORY: repo, GITHUB_RUN_ID: runId, GITHUB_REF: ref = "" } = process.env;
  const git = (args) => execFileSync("git", args, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });

  if (!token || !repo || !runId) {
    throw new Error("GITHUB_TOKEN, GITHUB_REPOSITORY or GITHUB_RUN_ID missing; withholding this writer.");
  } else {
    let self = null;
    try {
      self = await github(`/repos/${repo}/actions/runs/${runId}`, token);
    } catch (err) {
      throw new Error(`Could not read this run (${err.message}); withholding this writer.`);
    }
    if (!self) throw new Error("Missing writer run metadata; withholding this writer.");
    {
      const result = await waitForWriterLanes({
        self,
        maxWaitMs: maxWaitMinutes * 60_000,
        listActiveRuns: async () => {
          const pages = await Promise.all(
            ACTIVE_STATUSES.map((status) => github(`/repos/${repo}/actions/runs?status=${status}&per_page=100`, token))
          );
          if (pages.some((page) => !Array.isArray(page?.workflow_runs) || page.workflow_runs.length >= 100)) {
            throw new Error("Workflow run listing is malformed or truncated");
          }
          return pages.flatMap((page) => page.workflow_runs);
        },
      });
      requireClearQueue(result);
    }
  }
  fastForward({ ref, git, log: console.log });
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
  assert.throws(() => findBlockers({ runs: [], self: { ...self, created_at: "invalid" } }), /Invalid/);
  assert.throws(() => findBlockers({ runs: null, self }), /Invalid/);
  assert.throws(() => findBlockers({ runs: [{ ...older, created_at: "invalid" }], self }), /Invalid/);
  for (const status of ["queued", "pending"]) {
    assert.deepEqual(findBlockers({ runs: [{ ...older, status }], self }), [],
      `a ${status} peer in our concurrency group cannot start until we finish`);
    assert.equal(findBlockers({ runs: [run(39, "nightly-data-sync.yml", older.created_at, status)], self }).length, 1,
      `a ${status} writer in another concurrency group still blocks us`);
    assert.deepEqual(findBlockers({ runs: [{ ...older, path: self.path, status }], self }), [],
      `a ${status} older run of our own lane cannot start either`);
  }
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
  assert.equal(verdict.outcome, "api-error", "an unreadable run list is not a clear queue");
  for (const outcome of ["timeout", "api-error", "unknown"]) {
    assert.throws(() => requireClearQueue({ outcome }), /no data or PR/, `${outcome} stops the writer`);
  }
  assert.doesNotThrow(() => requireClearQueue({ outcome: "clear" }));
  assert.equal(findBlockers({ runs: [run(39, "daily-audit.yml", older.created_at)], self }).length, 1,
    "daily audit's shared status writers must block an event writer");
  const nightly = run(50, "nightly-data-sync.yml", self.created_at);
  assert.equal(findBlockers({ runs: [run(39, "daily-audit.yml", older.created_at, "queued")], self: nightly }).length, 0,
    "a queued audit cannot start while nightly holds their API group");
  assert.throws(() => fastForward({ ref: "refs/heads/main", git: () => { throw new Error("fetch failed"); }, log: quiet }), /withholding/);
  assert.throws(() => fastForward({ ref: "refs/heads/main", git: () => " M events.json", log: quiet }), /Working tree is not clean/);

  // --- workflow wiring -------------------------------------------------
  const workflows = Object.fromEntries(
    readdirSync(".github/workflows")
      .filter((f) => f.endsWith(".yml"))
      .map((f) => [f, parse(readFileSync(`.github/workflows/${f}`, "utf8"))])
  );
  const impact = workflows["impact-marketplace-provider-sync.yml"].jobs.sync;
  const scheduledMap = (expression, fallback) => {
    const match = String(expression).match(/^\$\{\{ fromJSON\('([^']+)'\)\[github\.event\.schedule\] \|\| (\d+) \}\}$/);
    assert(match, "Impact budgets must use the schedule's numeric map and a manual fallback");
    assert.equal(Number(match[2]), fallback);
    return JSON.parse(match[1]);
  };
  const impactWaits = scheduledMap(impact.env.WRITER_WAIT_MINUTES, 60);
  const impactLimits = scheduledMap(impact["timeout-minutes"], 150);
  assert.equal(impact.steps.find((s) => /wait-for-writer-lanes\.mjs/.test(s.run || ""))?.run,
    'node scripts/wait-for-writer-lanes.mjs --max-wait-minutes "$WRITER_WAIT_MINUTES"', "Impact must pass the selected schedule budget to the helper");
  const budgetFor = (file, job, schedule = "0 6 * * *") => file === "impact-marketplace-provider-sync.yml"
    ? { wait: impactWaits[schedule], limit: impactLimits[schedule] }
    : { wait: Number((/--max-wait-minutes (\d+)/.exec(job.steps.find((s) => /wait-for-writer-lanes\.mjs/.test(s.run || ""))?.run) || [])[1] ?? DEFAULT_MAX_WAIT_MINUTES), limit: job["timeout-minutes"] };
  const writes = (wf) =>
    Object.values(wf.jobs || {}).some((job) =>
      (job.steps || []).some((s) => /git add[^\n]*(?:public\/data\/events|PROJECT_STATUS\.md)|sync-tm-events-write-pr\.mjs|node scripts\/run-work-queue-repair\.mjs(?! --self-test)/.test(s.run || ""))
    );
  for (const [file, group] of Object.entries(SHARED_WRITER_GROUPS)) {
    assert.equal(workflows[file].concurrency?.group, group, `${file}: shared group must match the workflow`);
    assert.equal(workflows[file].concurrency?.["cancel-in-progress"], false, `${file}: running writer must hold its group`);
  }
  const derived = Object.keys(workflows).filter((f) => writes(workflows[f])).sort();
  assert.deepEqual(derived, [...WRITER_LANES].sort(), "WRITER_LANES must list exactly the workflows that commit events or shared status data");
  assert.equal(workflows["impact-marketplace-provider-sync.yml"].concurrency, undefined,
    "Impact's three provider runs must not share GitHub's single pending slot");
  const impactRuns = [60, 61, 62].map((id, index) => run(id, "impact-marketplace-provider-sync.yml", `2026-10-14T0${6 + (index === 2 ? 1 : 0)}:${index === 1 ? "30" : "00"}:00Z`, "queued"));
  assert.deepEqual(findBlockers({ runs: impactRuns, self: impactRuns[0] }), []);
  assert.deepEqual(findBlockers({ runs: impactRuns, self: impactRuns[1] }).map((r) => r.id), [60]);
  assert.deepEqual(findBlockers({ runs: impactRuns, self: impactRuns[2] }).map((r) => r.id), [60, 61]);
  impactRuns[0].status = "completed";
  assert.deepEqual(findBlockers({ runs: impactRuns, self: impactRuns[1] }), []);
  assert.deepEqual(findBlockers({ runs: impactRuns, self: impactRuns[2] }).map((r) => r.id), [61]);
  impactRuns[1].status = "completed";
  assert.deepEqual(findBlockers({ runs: impactRuns, self: impactRuns[2] }), []);
  // Replay the worst legal predecessor lifetimes with all jobs starting
  // together. The first uses its full wait/work cap, then the second uses
  // its full cap. Later providers must retain time for their own work.
  const schedules = ["0 6 * * *", "30 6 * * *", "0 7 * * *"];
  for (let index = 0; index < schedules.length; index++) {
    const { wait, limit } = budgetFor("impact-marketplace-provider-sync.yml", impact, schedules[index]);
    assert(limit <= 360, "Impact must fit the hosted-job maximum");
    assert(limit - wait >= 90, "each provider retains its own work and publishing allowance");
    const lane = { ...impactRuns[index], status: "in_progress" };
    const predecessors = index === 0 ? [{ ...older, status: "in_progress" }]
      : impactRuns.slice(0, index).map((r) => ({ ...r, status: "in_progress" }));
    const deadlines = index === 0 ? [60] : schedules.slice(0, index).map((s) => impactLimits[s]);
    c = clock();
    verdict = await waitForWriterLanes({ self: lane,
      listActiveRuns: async () => predecessors.filter((_, i) => c.now() < deadlines[i] * 60_000),
      maxWaitMs: wait * 60_000, ...c, log: quiet, warn: quiet });
    assert.equal(verdict.outcome, "clear", `${schedules[index]} survives all older providers' full caps`);
    assert.equal(verdict.waitedMs, deadlines.at(-1) * 60_000);
  }
  for (const file of WAITING_LANES) {
    assert(WRITER_LANES.includes(file), `${file}: a waiting lane must also be a writer`);
    const jobs = Object.values(workflows[file].jobs).filter((job) => writes({ jobs: { job } }));
    for (const job of jobs) {
      const steps = job.steps || [];
      const checkoutAt = steps.findIndex((s) => /^actions\/checkout@/.test(s.uses || ""));
      const wait = steps[checkoutAt + 1];
      assert.equal(wait?.if, steps[checkoutAt]?.if, `${file}: a skipped checkout must also skip the wait`);
      assert(/node scripts\/wait-for-writer-lanes\.mjs/.test(wait?.run || ""), `${file}: the wait must directly follow checkout, before dependencies are installed`);
      assert.equal(wait.env?.GITHUB_TOKEN, "${{ github.token }}", `${file}: the wait reads runs with the job token`);
      const { wait: budget, limit } = budgetFor(file, job);
      assert(limit >= 30 + budget, `${file}: timeout-minutes must leave the lane its usual time on top of the ${budget}-minute wait`);
      const perms = workflows[file].permissions || job.permissions || {};
      assert(["read", "write"].includes(perms.actions), `${file}: listing runs needs actions: read`);
    }
  }

  // Replay an older writer that clears after 32 minutes (the 2026-10-14
  // nightly run still held SeatGeek after its former 14-minute allowance).
  // Read the workflow budget so a wiring regression fails this replay.
  for (const file of ["seatgeek-cta-sync.yml", "vividseats-cta-sync.yml", "impact-marketplace-provider-sync.yml"]) {
    const job = Object.values(workflows[file].jobs)[0];
    const wait = job.steps.find((s) => /node scripts\/wait-for-writer-lanes\.mjs/.test(s.run || ""));
    const { wait: budget, limit } = budgetFor(file, job);
    c = clock();
    const lane = run(50, file, self.created_at);
    const earlier = run(39, "nightly-data-sync.yml", older.created_at);
    verdict = await waitForWriterLanes({ self: lane, listActiveRuns: async () => c.now() < 32 * 60_000 ? [earlier] : [], maxWaitMs: budget * 60_000, ...c, log: quiet, warn: quiet });
    assert.equal(verdict.outcome, "clear", `${file}: a 32-minute predecessor must not starve this lane`);
    assert(limit - budget >= 75, `${file}: queueing must leave time for generation and both validation gates`);
    const publish = job.steps.find((s) => /node scripts\/open-automation-pr\.mjs/.test(s.run || ""));
    assert(publish["timeout-minutes"] >= REQUIRED_CHECK_TIMEOUT_MS / 60_000 + 5 && publish["timeout-minutes"] < 60,
      `${file}: publication must fit the fresh App token and the 25-minute head-check budget`);
  }

  // Regression: timestamps must never be applied from reports generated
  // before this checkout's current artist/event data revision.
  const auditSteps = workflows["daily-audit.yml"].jobs.audit.steps || [];
  const auditWait = auditSteps.findIndex((step) => /node scripts\/wait-for-writer-lanes\.mjs/.test(step.run || ""));
  const firstProbe = auditSteps.findIndex((step) => /scripts\/verify-outbound-links\.mjs/.test(step.run || ""));
  assert(auditWait > 0 && auditWait < firstProbe, "audit waits and refreshes main before generating evidence");
  const verificationSteps = workflows["daily-audit.yml"].jobs["verification-dates"].steps || [];
  const download = verificationSteps.findIndex((step) => /actions\/download-artifact@/.test(step.uses || ""));
  const check = verificationSteps.findIndex((step) => step.name === "Check audit evidence revision");
  const bump = verificationSteps.findIndex((step) => /scripts\/bump-verified-dates\.mjs/.test(step.run || ""));
  assert(check > download && check < bump, "verification compares audit revision before stamping artists");
  assert(/check-audit-revision\.mjs --check-main/.test(verificationSteps[check]?.run || ""),
    "verification checks evidence commit against current checkout");

  console.log("wait-for-writer-lanes self-test passed.");
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  const run = process.argv.includes("--self-test") ? selfTest() : main(process.argv.slice(2));
  run.catch((err) => {
    console.error(err);
    process.exit(1);
  });
}
