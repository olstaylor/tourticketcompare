// Earns the `test-mvp` required status check for a pushed automation branch.
//
// Why this exists. On 2026-09-11 a repository ruleset made `test-mvp` a
// required status check on `main`. Required checks are evaluated on the commit
// being published, whether it arrives by push or by merge, and every
// automation lane here publishes commits that no `pull_request` run has ever
// touched:
//
//   * the direct-to-main writers pushed a commit built on the runner, so the
//     SHA carried no checks at all and the push was rejected outright;
//     the squash-merge was rejected with a 405 (PR #951, 2026-09-12).
//     `reportStrandedPrValidation` below names them; it cannot clear them.
//
//     The "0 of 36 such runs ever reached a verdict" figure recorded here on
//     2026-09-13 was wrong, and the correction matters because it changes what
//     the fix is. Counted over all 100 `pull_request` Prelaunch runs on
//     2026-09-14: on `automation/*` heads, 23 `failure`, 5 still sitting at
//     `action_required` — and 9 `success`. The successes are real, and all
//     fall on 2026-09-10/11, when a human was approving these runs by hand
//     during the ruleset incident. None since 2026-09-11 09:22.
//
//     So the gate is an approval requirement that a human CAN clear, not an
//     absolute block: `action_required` as a literal conclusion rules out the
//     other candidate (GitHub's GITHUB_TOKEN recursion suppression, which
//     raises no run at all). `github-actions[bot]` is not a repository
//     collaborator, which is why an in-repo branch is still treated as
//     outside-contributor work. Clearing it at source is a repository setting
//     or a non-GITHUB_TOKEN credential for opening the PR — an owner decision,
//     recorded in docs/OPERATIONS.md, and the reason this dispatch exists
//     rather than a defect in any lane. Do that and this whole module becomes
//     unnecessary; until then it is what keeps the lanes publishing.
//
// Neither is a validation gap: both run the full suite in-job before pushing.
// What was missing was *evidence GitHub can see*. So earn it, honestly: the
// branch already exists, and `workflow_dispatch` is one of the two events the
// Actions token is still allowed to raise, so dispatch the real Prelaunch
// Validation workflow against that branch and wait for its verdict on the
// exact SHA about to be published.
//
// The alternative — publishing a hand-made check run named `test-mvp` — would
// have satisfied the ruleset without running anything. It is not implemented
// here and must not be: a required check that automation can fabricate is not
// a check.
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
export function classifyCheck(runs, { elapsedMs = 0, timeoutMs = DEFAULT_TIMEOUT_MS } = {}) {
  const completed = (runs || []).filter((run) => run?.status === "completed");
  if (completed.length > 0) {
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
    const started = (runs || []).length > 0;
    return {
      state: "timeout",
      detail: started
        ? `${DEFAULT_CHECK_NAME} was still running after ${Math.round(timeoutMs / 60000)} minutes`
        : `${DEFAULT_CHECK_NAME} never started within ${Math.round(timeoutMs / 60000)} minutes`,
      url: (runs || [])[0]?.html_url || "",
    };
  }
  return { state: "pending", detail: `${DEFAULT_CHECK_NAME} is ${(runs || [])[0]?.status || "not registered yet"}`, url: "" };
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
// jobs, recursion-guard noise" to an actual validation failure: the same kind
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
// The root cause is the credential, not a repository setting. The lane opens
// its PR with the Actions token, and GitHub will not run a `pull_request`
// workflow for an event raised that way — the recursion guard, which no
// Actions setting overrides. Confirmed on 2026-09-15: the owner moved the
// fork-PR approval control to "first-time contributors" and the next five
// lanes still produced zero-job runs. Opening the PR with a GitHub App
// installation token (or a PAT) is the fix, and it removes the run rather than
// tidying it. See docs/OPERATIONS.md.
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
            `${jobCount === null ? "an unknown number of" : jobCount} job(s) — that is a real failure, not the recursion guard.`
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
          `It cannot be cancelled — GitHub created it already completed. This lane published correctly; ` +
          `the red is the Actions-token recursion guard. Fix: open automation PRs with an App installation token.`
      );
    }
    return stranded.length;
  } catch (err) {
    warn(`Could not read the stranded pull_request validation run: ${err.message}`);
    return 0;
  }
}
