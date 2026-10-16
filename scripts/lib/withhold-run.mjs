// Ends the current Actions run as `cancelled` instead of `failure`.
//
// For a writer that correctly declined to publish because another writer held
// the shared data (an older run still in flight, or main moved under the
// evidence). Nothing is broken in that case and the next scheduled run retries
// from current main, so a red run only buried real faults: on 2026-10-14..16
// daily audit and work-queue repair were red three days running for queueing
// alone, which also kept site health red through their lane-not-completing
// items.
//
// `cancelled` is the neutral GitHub already has. check-automation-health.mjs
// reads it as "no verdict": one withheld tick between real verdicts is not a
// finding, but a lane withheld past its staleness window is raised as
// `stalled`, so a lane that is starved every day still surfaces.
//
// Never returns normally: it either waits to be killed by the cancellation or
// throws, so a caller can never fall through into publishing.

export const DEFAULT_KILL_WAIT_MS = 5 * 60_000;

export async function withholdRun({
  reason,
  env = process.env,
  request,
  sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
  warn = console.warn,
  killWaitMs = DEFAULT_KILL_WAIT_MS,
}) {
  const { GITHUB_TOKEN: token, GITHUB_REPOSITORY: repo, GITHUB_RUN_ID: runId } = env;
  if (!token || !repo || !runId) {
    throw new Error(`${reason} (could not withhold neutrally: GITHUB_TOKEN, GITHUB_REPOSITORY or GITHUB_RUN_ID missing)`);
  }
  const post = request || (async (path) => {
    const res = await fetch(`https://api.github.com${path}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" },
    });
    if (!res.ok && res.status !== 202) throw new Error(`POST ${path} -> ${res.status}`);
  });
  warn(`::warning::${reason} Withholding this run as cancelled (neutral); the next scheduled run retries from current main.`);
  try {
    await post(`/repos/${repo}/actions/runs/${runId}/cancel`);
  } catch (err) {
    throw new Error(`${reason} (could not cancel this run neutrally: ${err.message})`);
  }
  await sleep(killWaitMs);
  throw new Error(`${reason} (cancellation was requested but this run is still alive after ${Math.round(killWaitMs / 60_000)} min)`);
}

export async function selfTest() {
  const { default: assert } = await import("node:assert/strict");
  const env = { GITHUB_TOKEN: "t", GITHUB_REPOSITORY: "owner/repo", GITHUB_RUN_ID: "42" };
  const quiet = () => {};
  const calls = [];
  await assert.rejects(
    withholdRun({ reason: "busy.", env, request: async (path) => { calls.push(path); }, sleep: async () => {}, warn: quiet }),
    /still alive/,
    "a run that survives its own cancellation must still fail, never publish"
  );
  assert.deepEqual(calls, ["/repos/owner/repo/actions/runs/42/cancel"]);
  await assert.rejects(
    withholdRun({ reason: "busy.", env, request: async () => { throw new Error("403"); }, sleep: async () => {}, warn: quiet }),
    /could not cancel.*403/,
    "a refused cancel stays a visible failure"
  );
  await assert.rejects(
    withholdRun({ reason: "busy.", env: {}, request: async () => {}, sleep: async () => {}, warn: quiet }),
    /missing/
  );
}
