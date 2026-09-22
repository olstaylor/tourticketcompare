// Earns the `test-mvp` required status check for a pushed automation branch.
//
// GitHub documents that pull_request events created or updated with
// GITHUB_TOKEN produce approval-required runs. App installation tokens allow
// those PR runs to execute normally:
// https://docs.github.com/en/actions/concepts/security/github_token
//
// Keep this explicit dispatch during the App-identity rollout. It supplies a
// real check on the exact pushed head, independently of the rollout flag; it
// never fabricates a check or replaces the mandatory in-job validation.
// GitHub's ruleset remains a separate gate, including merge-commit validation.
//
// Pure except for the injected `request`, so the polling logic is provable
// offline (see scripts/earn-required-check.mjs --self-test).

export const DEFAULT_WORKFLOW_FILE = "prelaunch-validation.yml";
export const DEFAULT_CHECK_NAME = "test-mvp";
// A cold Prelaunch Validation run is ~5 minutes; the cap is generous enough to
// absorb a queue backlog and still bounded so a lane cannot idle for an hour.
export const DEFAULT_TIMEOUT_MS = 25 * 60 * 1000;
export const DEFAULT_POLL_MS = 15000;

// Classifies one poll of the check runs on a SHA. Kept separate from the loop
// so every branch of it is testable without a clock or a network.
//
// `runs` is the check-runs array GitHub returns for the SHA, already filtered
// to the required check name.
//
// A verdict needs EVERY run of that name to have finished, not just one of
// them. Two land on an automation head now: the explicit dispatch below, and
// the `pull_request` run that opening the PR raises. While those PR runs were
// stranded (born `completed`/`action_required`, no jobs) only the dispatch ever
// produced a check, so "first completion wins" was indistinguishable from
// "the check is done". The App installation token fixed the stranding — and in
// doing so gave the head a second, real, concurrently-running `test-mvp`. It
// finishes ~15s after the dispatch one, and that gap is a window in which this
// used to report a verdict and the caller merged straight into GitHub's
// `Required status check "test-mvp" is in progress` (405). Every scheduled lane
// went red that way on 2026-09-22 having already pushed a correct, validated
// branch. So: hold at `pending` until nothing of that name is still running.
export function classifyCheck(runs, { elapsedMs = 0, timeoutMs = DEFAULT_TIMEOUT_MS } = {}) {
  const all = (runs || []).filter(Boolean);
  const completed = all.filter((run) => run.status === "completed");
  const running = all.filter((run) => run.status && run.status !== "completed");

  if (completed.length > 0 && running.length === 0) {
    // Newest completion wins: a re-dispatch supersedes an earlier verdict, and
    // a stale green must never outrank the red that followed it. GitHub does
    // not return these in completion order — a commit re-validated on
    // 2026-08-26 came back with the later failure first — so read the
    // timestamps rather than trusting the array, and fall back to the API's
    // own newest-first order when a run carries no timestamp.
    const latest = completed.reduce((best, run) => {
      const at = Date.parse(run.completed_at || run.started_at || "");
      const bestAt = Date.parse(best.completed_at || best.started_at || "");
      if (!Number.isFinite(at)) return best;
      if (!Number.isFinite(bestAt)) return run;
      return at > bestAt ? run : best;
    }, completed[0]);
    if (latest.conclusion === "success") {
      return { state: "passed", detail: `${DEFAULT_CHECK_NAME} passed`, url: latest.html_url || "" };
    }
    return {
      state: "failed",
      detail: `${DEFAULT_CHECK_NAME} concluded ${latest.conclusion || "without a conclusion"}`,
      url: latest.html_url || "",
    };
  }

  if (elapsedMs >= timeoutMs) {
    const minutes = Math.round(timeoutMs / 60000);
    if (running.length === 0) {
      return { state: "timeout", detail: `${DEFAULT_CHECK_NAME} never started within ${minutes} minutes`, url: "" };
    }
    // Naming the already-finished verdict matters here: "one passed, another is
    // still going" is a different problem from "nothing ever ran", and merging
    // on the first is exactly what this function now refuses to invite.
    return {
      state: "timeout",
      detail:
        completed.length > 0
          ? `${DEFAULT_CHECK_NAME} reached a verdict but ${running.length} other ${DEFAULT_CHECK_NAME} run(s) ` +
            `were still running after ${minutes} minutes`
          : `${DEFAULT_CHECK_NAME} was still running after ${minutes} minutes`,
      url: (completed[0] || running[0])?.html_url || "",
    };
  }

  if (completed.length > 0) {
    return {
      state: "pending",
      detail: `${DEFAULT_CHECK_NAME} reached a verdict; ${running.length} other ${DEFAULT_CHECK_NAME} run(s) still running`,
      url: "",
    };
  }
  return { state: "pending", detail: `${DEFAULT_CHECK_NAME} is ${all[0]?.status || "not registered yet"}`, url: "" };
}

// Dispatches the validation workflow against `branch`, then polls the check
// runs on `sha` until the required check reaches a verdict.
//
// `request(method, path, body)` performs one GitHub API call and resolves to
// the parsed body; `sleep(ms)` and `now()` are injected for the self-test.
// Resolves to { ok, state, detail, url } and never throws for a failed check —
// callers decide what a red verdict means for their lane.
export async function earnRequiredCheck({
  request,
  repo,
  branch,
  sha,
  workflowFile = DEFAULT_WORKFLOW_FILE,
  checkName = DEFAULT_CHECK_NAME,
  timeoutMs = DEFAULT_TIMEOUT_MS,
  pollMs = DEFAULT_POLL_MS,
  sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
  now = () => Date.now(),
  log = console.log,
} = {}) {
  if (!request || !repo || !branch || !sha) {
    throw new Error("earnRequiredCheck requires request, repo, branch and sha.");
  }

  // The dispatch runs the workflow as it exists on the branch, against the
  // branch, so the check lands on this SHA. `ref` is left empty: the workflow's
  // own checkout default is the dispatched ref, which is what we want.
  try {
    await request("POST", `/repos/${repo}/actions/workflows/${workflowFile}/dispatches`, { ref: branch });
    log(`Dispatched ${workflowFile} against ${branch} (${sha.slice(0, 7)}); waiting for ${checkName}.`);
  } catch (err) {
    return {
      ok: false,
      state: "dispatch-failed",
      detail: `could not dispatch ${workflowFile} against ${branch}: ${err.message}`,
      url: "",
    };
  }

  const startedAt = now();
  for (;;) {
    await sleep(pollMs);
    let runs = [];
    try {
      const body = await request(
        "GET",
        `/repos/${repo}/commits/${sha}/check-runs?check_name=${encodeURIComponent(checkName)}&per_page=100`
      );
      runs = body?.check_runs || [];
    } catch (err) {
      // A transient read failure is not a verdict. Keep polling until the
      // deadline; the timeout below is what ends an unanswerable wait.
      log(`Could not read check runs for ${sha.slice(0, 7)}: ${err.message}`);
    }
    const verdict = classifyCheck(runs, { elapsedMs: now() - startedAt, timeoutMs });
    if (verdict.state === "pending") continue;
    return { ok: verdict.state === "passed", ...verdict };
  }
}

// Whether a `pull_request` validation run is stranded — created but never able
// to reach a verdict.
//
// Read the CONCLUSION, not the status. This is the correction that makes the
// whole thing work, and it was wrong in every earlier version. GitHub does not
// park these runs in a pending status: it creates them already `completed`,
// with `conclusion: "action_required"` and zero jobs. Measured 2026-09-15 over
// all 37 `pull_request` Prelaunch runs on `automation/*` heads: 25
// `completed`/`failure`, 9 `completed`/`success`, 3
// `completed`/`action_required` — and **zero** in any non-completed status.
//
// So `status !== "completed"` (the original predicate) and
// `["action_required","waiting"].includes(status)` (its 2026-09-14 narrowing)
// both matched nothing, ever. Every lane logged "No stranded pull_request
// validation run" and left its red behind regardless of when the call was
// placed. The ordering fix was real but was never the whole story.
//
// `action_required` is the run as born; it flips to `failure` when the PR
// closes, which is the red that shows on the Actions tab.
//
// `failure` alone is NOT sufficient, and `jobCount` is what separates the two
// cases. A real `pull_request` run does happen on these heads — 9 of the 37
// above concluded `success`, so a genuine red is possible too, and it would
// carry jobs and a real test failure. Calling that stranded would attach "no
// jobs, approval-required noise" to an actual validation failure: the same kind
// of false reassurance this whole change exists to remove. So a `failure` is
// only stranded once its job count is known to be zero; pass `null` when it
// has not been looked up and the answer is no.
export function isStrandedValidationRun(run, jobCount = null) {
  if (run?.status !== "completed") return false;
  if (String(run?.conclusion || "") === "action_required") return true;
  if (String(run?.conclusion || "") === "failure") return jobCount === 0;
  return false;
}

// Reports the `pull_request` validation run that opening an automation PR
// strands on the same SHA. It does NOT cancel it, because it cannot.
//
// The run is born `completed`, and GitHub refuses to cancel a completed run.
// There is no window in which a cancel could win — not before the merge, not
// after it. Two releases of this module tried and silently failed; what they
// actually produced was a reassuring log line ("No stranded pull_request
// validation run") that read like a clean result while the red accumulated.
// Saying nothing true is worse than doing nothing, so this now names what it
// found and stays out of the way.
//
// App installation tokens avoid this approval-required path. The reporter
// remains useful while the opt-in rollout is disabled or old runs are inspected.
// A completed run cannot be cancelled. See docs/OPERATIONS.md.
//
// Strictly best-effort and never throws, so the caller may site it outside the
// try whose catch reports a withheld merge: this must not be able to fail a
// lane, and it no longer writes anything at all.
export async function reportStrandedPrValidation({
  request,
  repo,
  sha,
  workflowFile = DEFAULT_WORKFLOW_FILE,
  log = console.log,
  warn = console.warn,
} = {}) {
  if (!request || !repo || !sha) {
    warn("reportStrandedPrValidation requires request, repo and sha; skipping.");
    return 0;
  }
  try {
    const body = await request("GET", `/repos/${repo}/actions/runs?head_sha=${encodeURIComponent(sha)}&per_page=100`);
    const candidates = (body?.workflow_runs || []).filter(
      (run) => run?.event === "pull_request" && String(run?.path || "").endsWith(`/${workflowFile}`)
    );
    const stranded = [];
    for (const run of candidates) {
      // A `failure` has to prove it never ran before it may be called stranded.
      // The runs listing does not carry a job count, so look it up — only for
      // the one conclusion that is ambiguous, and only for runs on this SHA, so
      // this stays a call or two per lane.
      let jobCount = null;
      if (String(run?.conclusion || "") === "failure") {
        const jobs = await request("GET", `/repos/${repo}/actions/runs/${run.id}/jobs?per_page=1`);
        jobCount = Number.isFinite(jobs?.total_count) ? jobs.total_count : null;
      }
      if (isStrandedValidationRun(run, jobCount)) {
        stranded.push(run);
      } else if (String(run?.conclusion || "") === "failure") {
        // Not ours to explain away: a run that executed jobs and went red is a
        // real validation failure, whatever else is true of this SHA.
        warn(
          `pull_request validation run ${run.id} on ${sha.slice(0, 7)} failed with ` +
            `${jobCount === null ? "an unknown number of" : jobCount} job(s) — that is a real failure, not an approval-only run.`
        );
      }
    }
    if (!stranded.length) {
      log(`No stranded pull_request validation run on ${sha.slice(0, 7)}.`);
      return 0;
    }
    for (const run of stranded) {
      warn(
        `Stranded pull_request validation run ${run.id} on ${sha.slice(0, 7)} (${run.conclusion}, no jobs). ` +
          `It cannot be cancelled — GitHub created it already completed. The explicit validation dispatch is the separate gate; ` +
          `the PR run needs approval because it used GITHUB_TOKEN. Fix: open automation PRs with an App installation token.`
      );
    }
    return stranded.length;
  } catch (err) {
    warn(`Could not read the stranded pull_request validation run: ${err.message}`);
    return 0;
  }
}
