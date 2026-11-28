import assert from "node:assert/strict";
import { isStale, checkLane, run, LANES, STALE_AFTER_MINUTES } from "../workers/price-snapshot-cron/index.js";

const now = Date.parse("2026-11-16T20:00:00Z");
const ago = (m) => new Date(now - m * 60000).toISOString();

assert.equal(isStale(null, now), true);
assert.equal(isStale("garbage", now), true);
assert.equal(isStale(ago(STALE_AFTER_MINUTES - 1), now), false);
assert.equal(isStale(ago(STALE_AFTER_MINUTES + 1), now), true);

function fakeFetch(lastCreated, listStatus = 200, dispatchStatus = 204) {
  const calls = [];
  const f = async (url, init = {}) => {
    calls.push({ url, init });
    if (url.includes("/runs?")) {
      return { ok: listStatus === 200, status: listStatus, json: async () => ({ workflow_runs: lastCreated ? [{ created_at: lastCreated }] : [] }) };
    }
    return { ok: dispatchStatus === 204, status: dispatchStatus };
  };
  return { f, calls };
}

// Fresh run: no dispatch.
let { f, calls } = fakeFetch(ago(20));
let r = await checkLane(LANES[0], { token: "t", fetchImpl: f, now });
assert.equal(r.action, "skip");
assert.equal(calls.length, 1);

// Stale Vivid: one dispatch with apply=true on main.
({ f, calls } = fakeFetch(ago(200)));
r = await checkLane(LANES[0], { token: "t", fetchImpl: f, now });
assert.equal(r.action, "dispatched");
const body = JSON.parse(calls[1].init.body);
assert.deepEqual(body, { ref: "main", inputs: { apply: "true" } });
assert.match(calls[1].url, /vividseats-price-snapshots\.yml\/dispatches$/);

// Stale marketplace: both providers dispatched, apply=true.
({ f, calls } = fakeFetch(ago(200)));
r = await checkLane(LANES[1], { token: "t", fetchImpl: f, now });
assert.equal(calls.length, 3);
assert.deepEqual(calls.slice(1).map((c) => JSON.parse(c.init.body).inputs.provider), ["ticketnetwork", "stubhub-international"]);
assert.ok(calls.slice(1).every((c) => JSON.parse(c.init.body).inputs.apply === "true"));

// API failure is reported, not swallowed.
({ f } = fakeFetch(ago(200), 403));
r = await checkLane(LANES[0], { token: "t", fetchImpl: f, now });
assert.equal(r.action, "error");
({ f } = fakeFetch(ago(200), 200, 422));
r = await checkLane(LANES[0], { token: "t", fetchImpl: f, now });
assert.equal(r.action, "error");

// Missing secret fails loudly.
await assert.rejects(() => run({}), /GITHUB_TOKEN/);

console.log("price-snapshot-cron self-test passed");
