// Bounded retry for one transient merge refusal (added 2026-11-24).
//
// GitHub answers a merge with 405 "Base branch was modified. Review and try the
// merge again." when main moved while the request was being processed. The
// automation lanes wait 20+ minutes for their required check, while other
// PRs keep merging to main, so that answer is common and says nothing about the
// PR: on 2026-11-24 it left a validated artist-city report PR (#2518) open and
// turned the lane red. Retrying the same request changes nothing about what is
// merged: callers pass the head sha, so a head that moved still fails (409).
//
// Only that one message is retried, at most delays.length times. A real conflict
// ("Pull Request has merge conflicts"), a moved head, a missing check or any
// other refusal is thrown on the first attempt.

import assert from "node:assert/strict";

export const MERGE_RETRY_DELAYS_MS = Object.freeze([5_000, 15_000, 30_000]);

export function isTransientMergeRefusal(error) {
  const message = String(error?.message || error || "");
  return /\b405\b/.test(message) && /Base branch was modified/i.test(message);
}

export async function mergeWithRetry(merge, { delaysMs = MERGE_RETRY_DELAYS_MS, sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms)), log = console.warn } = {}) {
  for (let attempt = 0; ; attempt += 1) {
    try {
      return await merge();
    } catch (error) {
      if (!isTransientMergeRefusal(error) || attempt >= delaysMs.length) throw error;
      log(`Merge refused because main moved (attempt ${attempt + 1} of ${delaysMs.length + 1}); retrying in ${delaysMs[attempt] / 1000}s.`);
      await sleep(delaysMs[attempt]);
    }
  }
}

// Opening the PR (added 2026-11-26). GitHub answered POST /pulls with a bare 500
// on 2026-11-25, the pushed branch was left without a PR and the labeller lane
// went red; the stale copy it should have fixed then kept Site health red until
// the next day's run. A 5xx on that POST says nothing about the content, and the
// request may even have created the PR, so each retry first looks for an open PR
// on the branch and only then posts again. 4xx answers are never retried.
export const CREATE_PR_RETRY_DELAYS_MS = Object.freeze([5_000, 15_000, 30_000]);

export function isTransientServerError(error) {
  return /GitHub API [A-Z]+ \S+ 5\d\d\b/.test(String(error?.message || error || ""));
}

export async function createPrWithRetry(create, findExisting, { delaysMs = CREATE_PR_RETRY_DELAYS_MS, sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms)), log = console.warn } = {}) {
  for (let attempt = 0; ; attempt += 1) {
    try {
      return await create();
    } catch (error) {
      if (!isTransientServerError(error) || attempt >= delaysMs.length) throw error;
      log(`GitHub answered the PR creation with a server error (attempt ${attempt + 1} of ${delaysMs.length + 1}); retrying in ${delaysMs[attempt] / 1000}s.`);
      await sleep(delaysMs[attempt]);
      const existing = await findExisting().catch(() => null);
      if (existing) return existing;
    }
  }
}

async function selfTest() {
  const refusal = (message, status = 405) => new Error(`GitHub API PUT /repos/x/pulls/1/merge ${status}: {"message":"${message}"}`);
  const run = async (outcomes) => {
    const sleeps = [];
    let calls = 0;
    const merge = async () => {
      const next = outcomes[calls++];
      if (next instanceof Error) throw next;
      return next;
    };
    return { run: () => mergeWithRetry(merge, { sleep: async (ms) => sleeps.push(ms), log: () => {} }), sleeps, calls: () => calls };
  };

  let t = await run(["merged"]);
  assert.equal(await t.run(), "merged");
  assert.equal(t.calls(), 1, "a clean merge is one call");

  t = await run([refusal("Base branch was modified. Review and try the merge again."), "merged"]);
  assert.equal(await t.run(), "merged", "one transient refusal then success merges");
  assert.deepEqual(t.sleeps, [5_000]);

  t = await run(Array.from({ length: 4 }, () => refusal("Base branch was modified. Review and try the merge again.")));
  await assert.rejects(t.run(), /Base branch was modified/, "a held refusal is thrown after the bounded retries");
  assert.equal(t.calls(), 4, "three retries, four calls in all");
  assert.deepEqual(t.sleeps, [5_000, 15_000, 30_000]);

  for (const message of ["Pull Request has merge conflicts", "Head branch was modified. Review and try the merge again."]) {
    t = await run([refusal(message, message.startsWith("Head") ? 409 : 405), "merged"]);
    await assert.rejects(t.run(), new RegExp(message.split(".")[0]));
    assert.equal(t.calls(), 1, `"${message}" is never retried`);
  }

  const serverError = () => new Error("GitHub API POST /repos/x/pulls 500: ");
  const create = async (outcomes, existing = null) => {
    const sleeps = [];
    let calls = 0;
    const result = createPrWithRetry(async () => { const next = outcomes[calls++]; if (next instanceof Error) throw next; return next; }, async () => existing, { sleep: async (ms) => sleeps.push(ms), log: () => {} });
    return { result, sleeps, calls: () => calls };
  };
  let c = await create([serverError(), { number: 7 }]);
  assert.deepEqual(await c.result, { number: 7 }, "one 500 then success opens the PR");
  assert.deepEqual(c.sleeps, [5_000]);
  c = await create([serverError(), { number: 8 }], { number: 9 });
  assert.deepEqual(await c.result, { number: 9 }, "a PR the failed request did create is reused, not posted twice");
  assert.equal(c.calls(), 1);
  c = await create(Array.from({ length: 4 }, serverError));
  await assert.rejects(c.result, /500/, "a persistent 500 is thrown after the bounded retries");
  assert.equal(c.calls(), 4);
  c = await create([new Error("GitHub API POST /repos/x/pulls 422: Validation Failed"), { number: 1 }]);
  await assert.rejects(c.result, /422/, "a 4xx answer is never retried");
  assert.equal(c.calls(), 1);
  console.log("merge-retry self-test: ok");
}

if (process.argv[1] && import.meta.url === `file://${process.argv[1]}` && process.argv.includes("--self-test")) await selfTest();
