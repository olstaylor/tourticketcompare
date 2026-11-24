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
  console.log("merge-retry self-test: ok");
}

if (process.argv[1] && import.meta.url === `file://${process.argv[1]}` && process.argv.includes("--self-test")) await selfTest();
