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
//   * the PR lanes open their PR with the Actions token, and a PR opened by
//     GITHUB_TOKEN deliberately does not trigger `pull_request` workflows, so
//     `test-mvp` never appeared on the head and the squash-merge was rejected
//     with a 405 (PR #951, 2026-09-12).
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
