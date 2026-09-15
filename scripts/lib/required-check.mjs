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
//     `cancelStrandedPrValidation` below clears the stranded runs up.
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
// The cancel below is accepted asynchronously, so it is confirmed rather than
// assumed. A held run has no jobs to drain and settles in a second or two; the
// cap is what stops an unanswerable wait from delaying a publish.
export const DEFAULT_CANCEL_CONFIRM_MS = 30 * 1000;
export const DEFAULT_CANCEL_POLL_MS = 3000;
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

// The statuses a stranded validation run can be cancelled from safely.
//
// Strictly the two held-for-approval states, and nothing else. "Stranded" is
// not "has not started yet" — it is "is waiting for a human approval that no
// automation can give", which is a run that will never reach a verdict no
// matter how long anyone waits. Only `action_required` and `waiting` mean that.
//
// `queued`, `pending` and `requested` were included until 2026-09-14 on the
// reasoning that a run with no job started publishes no check run to turn red.
// That is true today only because the approval gate means these runs never
// start. Clear the gate — which is the recommended fix, see docs/OPERATIONS.md
// — and the `pull_request` run becomes a real one that momentarily sits in
// `queued` on its way to running. Cancelling that would kill the honest
// validation run this repository wants, and could leave a `cancelled`
// `test-mvp` on the SHA after the dispatched run's success: harmless while the
// ruleset is disabled, merge-blocking the day it is re-enabled. The narrower
// predicate makes removing the gate safe to do without touching this code.
//
// `in_progress` is excluded for the same reason and more obviously: cancelling
// a run whose jobs are executing publishes a `cancelled` check on the very SHA
// about to be published. A run in that state is not stranded — it is reaching a
// verdict, which is the outcome we want.
export function isCancellableStrandedStatus(status) {
  return ["action_required", "waiting"].includes(String(status || ""));
}

// Cancels the `pull_request` validation run that opening an automation PR
// strands on the same SHA.
//
// That run can never reach a verdict. Raised by the Actions token, it is held
// at `action_required` waiting for an approval no automation can give, so it
// sits with zero jobs beside the run the lane dispatches. Left to resolve on
// its own it lands on `failure`: between 2026-09-01 and 2026-09-13 that
// produced 27 red runs and 9 left pending, against zero successes — a standing
// false red indistinguishable, on the Actions tab, from a validation failure
// that matters. Cancelling first leaves `cancelled` (deliberate) instead.
//
// Call this BEFORE the merge. Closing the PR is itself what resolves the held
// run, so a call placed after the merge arrives too late to cancel anything:
// on the 2026-09-14 Vivid Seats lane the squash landed at 10:53:48.402 and the
// first read here at 10:53:48.842, by which point the run was already
// `completed` and filtered out. Every lane that day logged "No stranded
// pull_request validation run" and every lane still left a red one behind
// (runs 34835286868, 34834234211, 34823387390 and 34822962848). The window in
// which `cancelled` can win closes when the PR does.
//
// Running before the merge is safe because the gate has already been earned by
// then. The verdict of record belongs to the dispatched `workflow_dispatch`
// run, which is filtered out by event; the held run has no jobs and so
// publishes no `test-mvp` check run for a cancel to turn red; and
// `isCancellableStrandedStatus` excludes the one state where that would not
// hold. Should the merge nevertheless be refused, the caller's existing
// withheld-merge path reports it — nothing here decides a lane's verdict.
//
// Strictly best-effort and never throws, so the caller may site it outside the
// try whose catch reports a withheld merge: this must not be able to fail a
// lane. The cancel is accepted asynchronously, so it is followed by a bounded
// confirmation — merging while GitHub has yet to act on the cancel would let
// the PR close resolve the run to `failure` regardless, which is the bug. The
// caller proceeds either way; nothing here may block a publish whose gate has
// passed.
export async function cancelStrandedPrValidation({
  request,
  repo,
  sha,
  workflowFile = DEFAULT_WORKFLOW_FILE,
  confirmMs = DEFAULT_CANCEL_CONFIRM_MS,
  pollMs = DEFAULT_CANCEL_POLL_MS,
  sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
  now = () => Date.now(),
  log = console.log,
  warn = console.warn,
} = {}) {
  if (!request || !repo || !sha) {
    warn("cancelStrandedPrValidation requires request, repo and sha; skipping.");
    return 0;
  }
  const isOurValidationRun = (run) =>
    run?.event === "pull_request" && String(run?.path || "").endsWith(`/${workflowFile}`);
  const readRunsOnSha = async () => {
    const body = await request("GET", `/repos/${repo}/actions/runs?head_sha=${encodeURIComponent(sha)}&per_page=100`);
    return (body?.workflow_runs || []).filter(isOurValidationRun);
  };
  try {
    const stranded = (await readRunsOnSha()).filter((run) => isCancellableStrandedStatus(run?.status));
    for (const run of stranded) {
      await request("POST", `/repos/${repo}/actions/runs/${run.id}/cancel`);
      log(`Cancelled the un-runnable pull_request validation run ${run.id} on ${sha.slice(0, 7)}.`);
    }
    if (!stranded.length) {
      log(`No stranded pull_request validation run on ${sha.slice(0, 7)}.`);
      return 0;
    }
    // Confirm by ID and by conclusion, never by absence from a filtered list.
    // Re-reading "is it still cancellable?" would call a run that had moved on
    // to `in_progress` settled, and would read one that resolved to `failure`
    // — the very outcome being prevented — as a success. Track the exact runs
    // submitted and require each to have actually reached `cancelled`.
    const awaiting = new Map(stranded.map((run) => [run.id, run]));
    const deadline = now() + confirmMs;
    for (;;) {
      if (now() >= deadline) {
        warn(
          `Validation run(s) ${[...awaiting.keys()].join(", ")} on ${sha.slice(0, 7)} had not reached \`cancelled\` after ${Math.round(confirmMs / 1000)}s; continuing to the merge.`
        );
        break;
      }
      await sleep(pollMs);
      let current;
      try {
        current = new Map((await readRunsOnSha()).map((run) => [run.id, run]));
      } catch (err) {
        // A transient read failure is not a reason to hold the merge.
        warn(`Could not confirm the cancel on ${sha.slice(0, 7)}: ${err.message}`);
        break;
      }
      for (const id of [...awaiting.keys()]) {
        const run = current.get(id);
        if (!run || run.status !== "completed") continue;
        if (run.conclusion !== "cancelled") {
          // Worth saying out loud: the run resolved on its own before the
          // cancel landed, which is the standing false red this exists to stop.
          warn(`Validation run ${id} on ${sha.slice(0, 7)} completed as \`${run.conclusion}\` rather than \`cancelled\`.`);
        }
        awaiting.delete(id);
      }
      if (awaiting.size === 0) {
        log(`Validation run(s) on ${sha.slice(0, 7)} settled.`);
        break;
      }
    }
    return stranded.length;
  } catch (err) {
    warn(`Could not cancel the stranded pull_request validation run: ${err.message}`);
    return 0;
  }
}
