// IndexNow ping (https://www.indexnow.org) — notifies Bing/Yandex-class
// engines (which also feed ChatGPT search and Copilot) that the site's URLs
// are ready to crawl, instead of waiting for a scheduled sitemap recrawl.
//
// Reads the live sitemap, verifies the public key file is actually being
// served (IndexNow rejects pings whose key file is missing), then submits the
// full URL list in one POST. Safe to re-run: IndexNow treats repeat
// submissions as no-ops. Run after a deploy that adds or meaningfully changes
// indexable pages.
//
// --await-deploy derives the sitemap locally from this checkout (the same
// functions/sitemap.xml.js the site serves) and waits for production to serve
// that URL set before submitting, so a ping fired straight after a merge does
// not submit the pre-deploy list. Convergence is best-effort: on timeout the
// job still submits whatever production currently serves, because submitting a
// live URL list is never harmful and the next data change pings again.
//
// Usage:
//   npm run indexnow:ping                    # verify key + submit sitemap URLs
//   npm run indexnow:ping -- --dry-run       # show what would be submitted
//   npm run indexnow:ping -- --await-deploy  # wait for the deploy, then submit
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

const DEPLOY_TIMEOUT_SECONDS = numericArg("--timeout-seconds", 600);
const DEPLOY_POLL_SECONDS = numericArg("--poll-seconds", 20);

/** Extract sitemap <loc> URLs belonging to this site, de-duplicated. */
export function extractSitemapUrls(xml, origin = ORIGIN) {
  const urls = [...String(xml).matchAll(/<loc>([^<]+)<\/loc>/g)]
    .map((match) => match[1].trim())
    .filter((url) => url.startsWith(origin));
  return [...new Set(urls)];
}

/** URLs expected but not yet served by production. */
export function missingUrls(expected, live) {
  const liveSet = new Set(live);
  return expected.filter((url) => !liveSet.has(url));
}

/**
 * Derive the sitemap URL set from this checkout by running the real
 * functions/sitemap.xml.js against a filesystem-backed ASSETS stub. Keeps the
 * deploy check honest: it compares production against the code and data that
 * were actually merged, not a hand-maintained list.
 */
export async function deriveExpectedUrls() {
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
  return extractSitemapUrls(await response.text());
}

async function fetchText(url) {
  const response = await fetch(url, { headers: { "User-Agent": "tourticketcompare-indexnow-ping" } });
  if (!response.ok) throw new Error(`${url} returned ${response.status}`);
  return response.text();
}

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function runSelfTest() {
  const failures = [];
  const check = (label, condition) => {
    if (!condition) failures.push(label);
  };

  const sample = `<urlset>
    <url><loc>${ORIGIN}/</loc></url>
    <url><loc>${ORIGIN}/artists</loc></url>
    <url><loc>${ORIGIN}/artists</loc></url>
    <url><loc>https://example.com/evil</loc></url>
  </urlset>`;
  const parsed = extractSitemapUrls(sample);
  check("extractSitemapUrls de-duplicates", parsed.length === 2);
  check("extractSitemapUrls rejects foreign origins", !parsed.some((url) => url.includes("example.com")));

  check("missingUrls reports gaps", missingUrls(["a", "b"], ["a"]).join() === "b");
  check("missingUrls empty when converged", missingUrls(["a"], ["a", "b"]).length === 0);
  check("missingUrls tolerates extra live URLs", missingUrls([], ["a"]).length === 0);

  const expected = await deriveExpectedUrls();
  check("local derivation returns URLs", expected.length > 0);
  check("local derivation is same-origin", expected.every((url) => url.startsWith(ORIGIN)));
  check("local derivation is de-duplicated", new Set(expected).size === expected.length);
  check("local derivation includes the homepage", expected.includes(`${ORIGIN}/`));

  if (failures.length) {
    console.error(`indexnow-ping self-test failed:\n- ${failures.join("\n- ")}`);
    process.exit(1);
  }
  console.log(`indexnow-ping self-test passed (${expected.length} URLs derived locally)`);
}

if (SELF_TEST) {
  await runSelfTest();
  process.exit(0);
}

let keyLive = false;
try {
  keyLive = (await fetchText(KEY_LOCATION)).trim() === KEY;
} catch (error) {
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

let urlList = [];

if (AWAIT_DEPLOY) {
  const expected = await deriveExpectedUrls();
  console.log(`${expected.length} URLs derived from this checkout — waiting for production to serve them`);
  const deadline = Date.now() + DEPLOY_TIMEOUT_SECONDS * 1000;
  let pending = expected;
  let converged = false;

  while (Date.now() < deadline) {
    try {
      urlList = extractSitemapUrls(await fetchText(`${ORIGIN}/sitemap.xml`));
      pending = missingUrls(expected, urlList);
      if (!pending.length) {
        converged = true;
        break;
      }
    } catch (error) {
      console.warn(`sitemap fetch failed (${error.message}) — retrying`);
    }
    await sleep(DEPLOY_POLL_SECONDS * 1000);
  }

  if (converged) {
    console.log("production sitemap matches this checkout — deploy is live");
  } else {
    // Not fatal: production still serves a valid URL list, and the next data
    // change pings again. Surfaced loudly so a stuck deploy is visible.
    console.warn(
      `warning: production sitemap still missing ${pending.length} expected URL(s) after ${DEPLOY_TIMEOUT_SECONDS}s — submitting the live list anyway`
    );
    for (const url of pending.slice(0, 10)) console.warn(`  missing: ${url}`);
  }
}

if (!urlList.length) {
  urlList = extractSitemapUrls(await fetchText(`${ORIGIN}/sitemap.xml`));
}

if (!urlList.length) {
  console.error("no URLs extracted from sitemap.xml — refusing to ping");
  process.exit(1);
}

if (keyLive) console.log(`key file verified at ${KEY_LOCATION}`);
console.log(`${urlList.length} URLs from sitemap.xml`);

if (DRY_RUN) {
  console.log(urlList.join("\n"));
  console.log("dry run — nothing submitted");
  process.exit(0);
}

const response = await fetch(ENDPOINT, {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList })
});

// IndexNow returns 200 (accepted) or 202 (accepted, key validation pending).
if (response.status === 200 || response.status === 202) {
  console.log(`submitted ${urlList.length} URLs — IndexNow responded ${response.status}`);
} else {
  console.error(`IndexNow responded ${response.status}: ${(await response.text()).slice(0, 300)}`);
  process.exit(1);
}
