// node scripts/http-retry.test.mjs
import assert from "node:assert/strict";
import { fetchWithRetry, isRetryableStatus, isSafeToRepeat } from "./lib/http-retry.mjs";

const res = (status) => ({ status, ok: status >= 200 && status < 300 });
const noSleep = async () => {};
const sequence = (...steps) => {
  const calls = [];
  const fetchImpl = async (url, init) => {
    calls.push([url, init]);
    const step = steps[Math.min(calls.length, steps.length) - 1];
    if (step instanceof Error) throw step;
    return step;
  };
  return { fetchImpl, calls };
};

assert.equal(isRetryableStatus(503), true);
assert.equal(isRetryableStatus(500), true);
assert.equal(isRetryableStatus(429), false, "429 is a quota: never retried");
assert.equal(isRetryableStatus(404), false);
assert.equal(isRetryableStatus(200), false);
assert.equal(isRetryableStatus(null), false);

{ // a 503 then success recovers
  const { fetchImpl, calls } = sequence(res(503), res(200));
  const out = await fetchWithRetry("u", { method: "GET" }, { fetchImpl, sleep: noSleep });
  assert.equal(out.status, 200);
  assert.equal(calls.length, 2);
  assert.deepEqual(calls[1][1], { method: "GET" }, "init is reused unchanged");
}
{ // a dropped connection then success recovers
  const { fetchImpl, calls } = sequence(new Error("socket hang up"), res(200));
  assert.equal((await fetchWithRetry("u", {}, { fetchImpl, sleep: noSleep })).status, 200);
  assert.equal(calls.length, 2);
}
{ // a failure that repeats is returned for the caller to report
  const { fetchImpl, calls } = sequence(res(502));
  assert.equal((await fetchWithRetry("u", {}, { fetchImpl, sleep: noSleep, attempts: 3 })).status, 502);
  assert.equal(calls.length, 3);
}
{ // every attempt throwing rejects with the last error
  const { fetchImpl, calls } = sequence(new Error("boom"));
  await assert.rejects(fetchWithRetry("u", {}, { fetchImpl, sleep: noSleep, attempts: 2 }), /boom/);
  assert.equal(calls.length, 2);
}
for (const status of [429, 404, 401]) { // answers, not blips
  const { fetchImpl, calls } = sequence(res(status), res(200));
  assert.equal((await fetchWithRetry("u", {}, { fetchImpl, sleep: noSleep })).status, status);
  assert.equal(calls.length, 1, `${status} is not retried`);
}
for (const method of ["POST", "PATCH", "PUT", "DELETE"]) { // a lost response may already have been applied
  const { fetchImpl, calls } = sequence(res(502), res(200));
  assert.equal((await fetchWithRetry("u", { method }, { fetchImpl, sleep: noSleep })).status, 502);
  assert.equal(calls.length, 1, `${method} is sent once`);
  const dropped = sequence(new Error("reset"), res(200));
  await assert.rejects(fetchWithRetry("u", { method }, { fetchImpl: dropped.fetchImpl, sleep: noSleep }), /reset/);
  assert.equal(dropped.calls.length, 1);
}
assert.equal(isSafeToRepeat({}), true);
assert.equal(isSafeToRepeat({ method: "get" }), true);
assert.equal(isSafeToRepeat({ method: "POST" }), false);
{ // the pause grows
  const waits = [];
  const { fetchImpl } = sequence(res(500), res(500), res(200));
  await fetchWithRetry("u", {}, { fetchImpl, sleep: async (ms) => waits.push(ms), delayMs: 10 });
  assert.deepEqual(waits, [10, 20]);
}
console.log("http-retry: ok");
