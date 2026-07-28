// IndexNow ping (https://www.indexnow.org) — notifies Bing/Yandex-class
// engines (which also feed ChatGPT search and Copilot) that the site's URLs
// are ready to crawl, instead of waiting for a scheduled sitemap recrawl.
//
// Verifies the public key file is being served (IndexNow rejects pings whose
// key file is missing), then submits URLs the live sitemap already advertises.
//
// --await-deploy makes an automated ping precise. It snapshots production's
// sitemap before the deploy lands, derives the expected sitemap from this
// checkout (running the real functions/sitemap.xml.js against a
// filesystem-backed assets stub), waits for production to serve it, then
// submits only the URLs that actually changed — new URLs, or ones whose
// lastmod moved. Submitting all ~170 URLs several times a day would be
// wasteful and is not what IndexNow asks for.
//
// Every fallback is toward the safe, boring outcome: if the delta cannot be
// isolated (deploy already live at job start, timeout, fetch failure) it
// submits the full live URL list instead, which is always valid. It never
// submits a URL production does not currently serve.
//
// Usage:
//   npm run indexnow:ping                    # submit the full live sitemap
//   npm run indexnow:ping -- --dry-run       # show what would be submitted
//   npm run indexnow:ping -- --await-deploy  # wait for deploy, submit the delta
//   npm run indexnow:ping:self-test          # offline checks, no network

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PUBLIC_DIR = path.join(ROOT, "public");

const HOST = "tourticketcompare.com";
const ORIGIN = `https://${HOST}`;
const KEY = "9ffca7bd48067983c70d2ce6601728d3";
const KEY_LOCATION = `${ORIGIN}/${KEY}.txt`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

const DRY_RUN = process.argv.includes("--dry-run");
const AWAIT_DEPLOY = process.argv.includes("--await-deploy");
const SELF_TEST = process.argv.includes("--self-test");

function numericArg(flag, fallback) {
  const index = process.argv.indexOf(flag);
  if (index === -1) return fallback;
  const value = Number(process.argv[index + 1]);
  return Number.isFinite(value) && value > 0 ? value : fallback;
}

// Cloudflare Pages deploys this repo without a build step, so a deploy is
// normally live in well under a minute. Five minutes is a generous ceiling:
// past it something is wrong, and waiting longer only burns runner time.
const DEPLOY_TIMEOUT_SECONDS = numericArg("--timeout-seconds", 300);
const DEPLOY_POLL_SECONDS = numericArg("--poll-seconds", 15);
const SUBMIT_ATTEMPTS = 3;

/**
 * Parse a sitemap into url -> lastmod, keeping only this site's URLs. Pairing
 * loc with lastmod is what lets a ping detect a freshness-only change (e.g. a
 * last_verified_at bump) that leaves the URL set identical.
 */
export function parseSitemapEntries(xml, origin = ORIGIN) {
  const entries = new Map();
  for (const block of String(xml).split("<url>").slice(1)) {
    const loc = block.match(/<loc>([^<]+)<\/loc>/);
    if (!loc) continue;
    const url = loc[1].trim();
    if (!url.startsWith(origin)) continue;
    const lastmod = block.match(/<lastmod>([^<]+)<\/lastmod>/);
    entries.set(url, lastmod ? lastmod[1].trim() : "");
  }
  return entries;
}

export function extractSitemapUrls(xml, origin = ORIGIN) {
  return [...parseSitemapEntries(xml, origin).keys()];
}

/** Expected entries not yet served by production, by URL or by lastmod. */
export function pendingEntries(expected, live) {
  const pending = [];
  for (const [url, lastmod] of expected) {
    if (!live.has(url) || live.get(url) !== lastmod) pending.push(url);
  }
  return pending;
}

/** URLs that are new in `current`, or whose lastmod moved since `baseline`. */
export function changedUrls(current, baseline) {
  const changed = [];
  for (const [url, lastmod] of current) {
    if (!baseline.has(url) || baseline.get(url) !== lastmod) changed.push(url);
  }
  return changed;
}

/**
 * Derive the sitemap from this checkout by running the real
 * functions/sitemap.xml.js against a filesystem-backed ASSETS stub, so the
 * deploy check compares production against the code and data actually merged.
 */
export async function deriveExpectedEntries() {
  const env = {
    ASSETS: {
      async fetch(request) {
        const pathname = new URL(request.url).pathname;
        const file = path.join(PUBLIC_DIR, pathname);
        if (!file.startsWith(PUBLIC_DIR) || !fs.existsSync(file)) {
          return new Response("", { status: 404 });
        }
        return new Response(fs.readFileSync(file, "utf8"), { status: 200 });
      }
    }
  };
  const { onRequestGet } = await import("../functions/sitemap.xml.js");
  const response = await onRequestGet({ request: new Request(`${ORIGIN}/sitemap.xml`), env });
  return parseSitemapEntries(await response.text());
}

async function fetchText(url) {
  const response = await fetch(url, { headers: { "User-Agent": "tourticketcompare-indexnow-ping" } });
  if (!response.ok) throw new Error(`${url} returned ${response.status}`);
  return response.text();
}

/** Live sitemap entries, or null when production could not be read. */
async function fetchLiveEntries() {
  try {
    return parseSitemapEntries(await fetchText(`${ORIGIN}/sitemap.xml`));
  } catch (error) {
    console.warn(`sitemap fetch failed: ${error.message}`);
    return null;
  }
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function runSelfTest() {
  const failures = [];
  const check = (label, condition) => {
    if (!condition) failures.push(label);
  };

  const sample = `<urlset>
    <url><loc>${ORIGIN}/</loc><lastmod>2026-07-01</lastmod></url>
    <url><loc>${ORIGIN}/artists</loc><lastmod>2026-07-02</lastmod></url>
    <url><loc>https://example.com/evil</loc><lastmod>2026-07-03</lastmod></url>
  </urlset>`;
  const parsed = parseSitemapEntries(sample);
  check("parseSitemapEntries pairs loc with lastmod", parsed.get(`${ORIGIN}/`) === "2026-07-01");
  check("parseSitemapEntries rejects foreign origins", parsed.size === 2);
  check("extractSitemapUrls returns URLs", extractSitemapUrls(sample).length === 2);

  const base = new Map([["a", "2026-07-01"], ["b", "2026-07-01"]]);
  check("changedUrls detects a new URL", changedUrls(new Map([["c", "x"]]), base).join() === "c");
  check("changedUrls detects a moved lastmod", changedUrls(new Map([["a", "2026-07-09"]]), base).join() === "a");
  check("changedUrls ignores unchanged entries", changedUrls(new Map([["a", "2026-07-01"]]), base).length === 0);
  check("changedUrls ignores removed URLs", changedUrls(new Map(), base).length === 0);

  check("pendingEntries reports a missing URL", pendingEntries(new Map([["a", "1"]]), new Map()).join() === "a");
  check("pendingEntries reports a stale lastmod", pendingEntries(new Map([["a", "2"]]), new Map([["a", "1"]])).join() === "a");
  check("pendingEntries empty when converged", pendingEntries(new Map([["a", "1"]]), new Map([["a", "1"], ["b", "1"]])).length === 0);

  const expected = await deriveExpectedEntries();
  check("local derivation returns entries", expected.size > 0);
  check("local derivation is same-origin", [...expected.keys()].every((url) => url.startsWith(ORIGIN)));
  check("local derivation includes the homepage", expected.has(`${ORIGIN}/`));
  check("local derivation carries lastmod values", [...expected.values()].every((value) => /^\d{4}-\d{2}-\d{2}$/.test(value)));

  if (failures.length) {
    console.error(`indexnow-ping self-test failed:\n- ${failures.join("\n- ")}`);
    process.exit(1);
  }
  console.log(`indexnow-ping self-test passed (${expected.size} URLs derived locally)`);
}

async function submit(urlList) {
  let lastError = "";
  for (let attempt = 1; attempt <= SUBMIT_ATTEMPTS; attempt += 1) {
    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList })
      });
      // IndexNow returns 200 (accepted) or 202 (accepted, key validation pending).
      if (response.status === 200 || response.status === 202) {
        console.log(`submitted ${urlList.length} URL(s) — IndexNow responded ${response.status}`);
        return true;
      }
      lastError = `HTTP ${response.status}: ${(await response.text()).slice(0, 200)}`;
      // 4xx other than 429 is a real rejection (bad key, bad host) — retrying
      // an unauthorised submission just repeats the same rejection.
      if (response.status >= 400 && response.status < 500 && response.status !== 429) break;
    } catch (error) {
      lastError = error.message;
    }
    if (attempt < SUBMIT_ATTEMPTS) {
      const backoff = attempt * 5;
      console.warn(`submission attempt ${attempt} failed (${lastError}) — retrying in ${backoff}s`);
      await sleep(backoff * 1000);
    }
  }
  console.error(`IndexNow submission failed after ${SUBMIT_ATTEMPTS} attempt(s): ${lastError}`);
  return false;
}

if (SELF_TEST) {
  await runSelfTest();
  process.exit(0);
}

let keyLive = false;
try {
  keyLive = (await fetchText(KEY_LOCATION)).trim() === KEY;
} catch {
  keyLive = false;
}
if (!keyLive) {
  const message = `key file not live at ${KEY_LOCATION} — deploy public/${KEY}.txt before pinging (IndexNow rejects unverifiable submissions)`;
  if (!DRY_RUN) {
    console.error(message);
    process.exit(1);
  }
  console.warn(`warning: ${message}`);
}

let liveEntries = null;
let urlList = [];
let submissionScope = "full live sitemap";

if (AWAIT_DEPLOY) {
  const expected = await deriveExpectedEntries();
  const baseline = await fetchLiveEntries();
  console.log(`${expected.size} URLs derived from this checkout`);

  if (!baseline) {
    console.warn("warning: could not snapshot production before the deploy — will submit the full live list");
  } else if (!pendingEntries(expected, baseline).length) {
    // Deploy already live (or this push changed no indexable route). There is
    // no delta to isolate against, so fall back to the full list.
    console.log("production already serves this checkout — no delta to isolate");
    liveEntries = baseline;
  }

  if (baseline && !liveEntries) {
    const deadline = Date.now() + DEPLOY_TIMEOUT_SECONDS * 1000;
    let converged = false;
    let pending = [...expected.keys()];

    while (Date.now() < deadline) {
      await sleep(DEPLOY_POLL_SECONDS * 1000);
      const current = await fetchLiveEntries();
      if (!current) continue;
      liveEntries = current;
      pending = pendingEntries(expected, current);
      if (!pending.length) {
        converged = true;
        break;
      }
    }

    if (converged) {
      console.log("production sitemap matches this checkout — deploy is live");
      const changed = changedUrls(liveEntries, baseline);
      if (changed.length) {
        urlList = changed;
        submissionScope = `${changed.length} changed URL(s) from this deploy`;
      } else {
        console.log("deploy changed no sitemap entry — submitting the full live list");
      }
    } else {
      // Not fatal: production still serves a valid URL list, and the next data
      // change pings again. Logged loudly so a stuck deploy is visible.
      console.warn(
        `warning: production sitemap still differs from this checkout after ${DEPLOY_TIMEOUT_SECONDS}s ` +
          `(${pending.length} pending entr${pending.length === 1 ? "y" : "ies"}) — submitting the full live list`
      );
      for (const url of pending.slice(0, 10)) console.warn(`  pending: ${url}`);
    }
  }
}

if (!liveEntries) liveEntries = await fetchLiveEntries();
if (!liveEntries) {
  console.error("could not read sitemap.xml from production — refusing to ping");
  process.exit(1);
}

// Never announce a URL production does not currently serve.
if (urlList.length) {
  urlList = urlList.filter((url) => liveEntries.has(url));
  if (!urlList.length) {
    console.warn("warning: no changed URL is live yet — submitting the full live list");
    submissionScope = "full live sitemap";
  }
}
if (!urlList.length) urlList = [...liveEntries.keys()];

if (!urlList.length) {
  console.error("no URLs extracted from sitemap.xml — refusing to ping");
  process.exit(1);
}

if (keyLive) console.log(`key file verified at ${KEY_LOCATION}`);
console.log(`submitting ${submissionScope} (${urlList.length} URL(s))`);

if (DRY_RUN) {
  console.log(urlList.join("\n"));
  console.log("dry run — nothing submitted");
  process.exit(0);
}

if (!(await submit(urlList))) process.exit(1);
