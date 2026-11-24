// Shared on-disk cache of rendered routes, used only inside one test run.
//
// Three site-crawl audits (internal links, indexable surface, metadata
// accuracy) render the same ~10k routes through the same middleware with the
// same stub env, and ran as separate processes, so the suite paid for the same
// renders three times (17-24 minutes each, in parallel, on 4 cores). With
// ROUTE_RENDER_CACHE_DIR set, a render is read back instead of redone.
// scripts/prewarm-route-cache.mjs fills it once, sharded across cores, before
// the audits start; a miss still renders live, so a stale or empty cache can
// only cost time, never hide a failure. The audits' checks are unchanged.
//
// run-test-lane.mjs creates a fresh directory per run and removes it after, so
// nothing is shared between runs or across commits. Without the variable (for
// example `node scripts/audit-internal-links.mjs` on its own) nothing is cached.

import crypto from "node:crypto";
import fsSync from "node:fs";
import fs from "node:fs/promises";
import path from "node:path";

export const RENDER_CACHE_ENV = "ROUTE_RENDER_CACHE_DIR";

const fileFor = (dir, key) => path.join(dir, `${crypto.createHash("sha1").update(key).digest("hex")}.json`);

/**
 * @param {string} key Includes everything that changes the output (route, env).
 * @param {() => Promise<{status: number, location: string, html: string}>} render
 */
export async function cachedRender(key, render) {
  const dir = process.env[RENDER_CACHE_ENV];
  if (!dir) return render();
  const file = fileFor(dir, key);
  try {
    return JSON.parse(await fs.readFile(file, "utf8"));
  } catch {
    // Miss (or a half-written file from a racing process): render live.
  }
  const rendered = await render();
  try {
    const tmp = `${file}.${process.pid}.tmp`;
    await fs.writeFile(tmp, JSON.stringify(rendered));
    await fs.rename(tmp, file);
  } catch {
    // The cache is an optimisation; never fail a run over it.
  }
  return rendered;
}

/**
 * The one clock a cached run renders and audits against.
 *
 * Cached pages are only valid for the instant they were rendered at: a show that
 * starts between the prewarm and an audit changes what the router serves, so an
 * audit checking old pages against a newer "now" reports links to pages that
 * (by then) 301 (SeatGeek and Vivid CTA syncs, 21 Nov 2026 00:40 and 01:02 UTC).
 * The prewarm coordinator records its start time once (`create: true`); the
 * prewarm workers and every audit pin Date.now to that value. Without a cache
 * directory, or before it holds a clock, this is just the live time.
 *
 * @param {{create?: boolean}} [options]
 * @returns {number}
 */
export function sharedClock({ create = false } = {}) {
  const dir = process.env[RENDER_CACHE_ENV];
  if (!dir) return Date.now();
  const file = path.join(dir, "_clock");
  try {
    const value = Number(fsSync.readFileSync(file, "utf8"));
    if (Number.isFinite(value) && value > 0) return value;
  } catch {
    // Not written yet.
  }
  const now = Date.now();
  if (create) {
    try {
      fsSync.writeFileSync(file, String(now), { flag: "wx" });
    } catch {
      return sharedClock();
    }
  }
  return now;
}
