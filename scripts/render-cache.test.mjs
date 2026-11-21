// Self-test for scripts/lib/render-cache.mjs: cache hits skip the render, a
// miss renders live, and every process in a run reads the clock the prewarm
// recorded (the SeatGeek/Vivid CTA failures of 21 Nov 2026 were audits judging
// pages cached earlier against a later "now").

import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { cachedRender, sharedClock, RENDER_CACHE_ENV } from "./lib/render-cache.mjs";

const dir = fs.mkdtempSync(path.join(os.tmpdir(), "ttc-render-cache-test-"));
try {
  // No cache directory: never cached, clock is live.
  delete process.env[RENDER_CACHE_ENV];
  let calls = 0;
  const render = async () => ({ status: 200, location: "", html: `n${++calls}` });
  await cachedRender("a", render);
  await cachedRender("a", render);
  assert.equal(calls, 2, "without the env var every call renders");
  assert.ok(Math.abs(sharedClock() - Date.now()) < 1000);

  // With a directory: second call is a hit.
  process.env[RENDER_CACHE_ENV] = dir;
  calls = 0;
  const first = await cachedRender("route:/x", render);
  const second = await cachedRender("route:/x", render);
  assert.equal(calls, 1);
  assert.deepEqual(second, first);
  await cachedRender("route:/y", render);
  assert.equal(calls, 2, "different key renders");

  // Clock: created once, then fixed for every reader, including other processes.
  const created = sharedClock({ create: true });
  await new Promise((resolve) => setTimeout(resolve, 20));
  assert.equal(sharedClock(), created, "a later read returns the recorded instant");
  assert.equal(sharedClock({ create: true }), created, "creating twice keeps the first instant");
  const child = spawnSync(
    process.execPath,
    ["--input-type=module", "-e", `import { sharedClock } from ${JSON.stringify(new URL("./lib/render-cache.mjs", import.meta.url).href)}; console.log(sharedClock());`],
    { env: { ...process.env, [RENDER_CACHE_ENV]: dir }, encoding: "utf8" }
  );
  assert.equal(Number(child.stdout.trim()), created, "another process reads the same clock");
  console.log("render-cache self-test: ok");
} finally {
  fs.rmSync(dir, { recursive: true, force: true });
}
