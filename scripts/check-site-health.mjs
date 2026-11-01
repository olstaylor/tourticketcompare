#!/usr/bin/env node
// Daily production health check → one rolling GitHub issue (never a PR).
//
// Added 2026-09-24 (Phase 3 of the launch-readiness milestone). Every other
// sensor watches one thing from the repository's side; this one looks at the
// live site the way a crawler does and puts the answer in one place:
//
//   1. Pages: every URL in the live sitemap index must answer 200 with no
//      redirect, index robots meta, a self-referencing canonical, a title, an
//      H1 and JSON-LD that parses; no two may share a title. This is the only
//      check that sees production 404s, soft redirects, a noindex that leaked
//      into the sitemap, or a broken structured-data block after deploy.
//   2. Sitemaps: the index and each segment are reachable and together list
//      exactly what /sitemap.xml lists.
//   3. Runtime: /api/health reports ok.
//   4. Prices: the price-coverage gates (scripts/report-price-coverage.mjs).
//   6. Old dates (added 2026-10-10): no JSON-LD Event on a crawled page, row in
//      /api/shows or artist line in /llms.txt may name a show or on-sale that
//      has passed, and no published blog or guide copy may name a date that
//      was ahead when it was written and has passed since
//      (scripts/lib/date-staleness.mjs). The past-event check runs per page in
//      section 1; the rest are reported here.
//   5. Commercial data findings gate; automation and maintenance sensors are listed, not gating
//      when clean — outbound links and Ticketmaster drift (automation:daily-audit),
//      failing or stale automation (automation:health), unvalidated PR heads
//      (automation:prelaunch-validation) — plus open work-queue items. They are
//      linked, not re-checked, so there is one source of truth for each.
//
// The issue (label automation:site-health) is rewritten every run and closed
// when everything is clear; a new finding reopens it. Exit 1 on any finding in
// sections 1–4 or an open finding in section 5; exit 2 if the site itself
// cannot be read (unknown, not healthy).
//
//   node scripts/check-site-health.mjs [--base-url URL] [--issue] [--markdown FILE] [--json]
//   node scripts/check-site-health.mjs --self-test

import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { fileURLToPath } from "node:url";
import os from "node:os";
import path from "node:path";
import { analyse as analysePrices, coverageShareLabel, fetchAllShows } from "./report-price-coverage.mjs";
import { fetchWithRetry } from "./lib/http-retry.mjs";
import { llmsTxtStaleDates, pastShowsInApi, pastStructuredEvents, staleDatedCopy } from "./lib/date-staleness.mjs";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const ISSUE_LABEL = "automation:site-health";
const ISSUE_TITLE = "Site health";
const CONCURRENCY = 4;
// A 5xx that clears on one retry is Cloudflare's "Worker exceeded resource
// limits" under parallel load (2026-09-24: ~20% of artist-city pages at 6-8
// concurrent requests, before the render CPU work in #1125's follow-up). It is
// what a crawler fetching in parallel sees, so it is counted, and becomes a
// finding once it touches more than this share of the sitemap.
const TRANSIENT_5XX_MAX_SHARE = 0.02;
const RETRY_DELAY_MS = 2000;
const TIMEOUT_MS = 20000;
const USER_AGENT = "TourTicketCompare-site-health (+https://tourticketcompare.com)";
// Sensors whose issue is open only while they have a finding. The third field
// says whether an open issue fails this run. automation:health is linked but
// never gating: it watches site-health.yml itself, so gating on it would latch
// both red — a failed run opens automation:health, which fails the next clean
// run, which keeps automation:health open.
//
// Site health answers one question: is the public site, and the commercial
// data on it, correct right now? Only commercial-data sensors gate it. The
// automation and maintenance sensors are listed beside it but report in their
// own issues, because a red lane or an unvalidated PR changes nothing a
// visitor sees (owner brief 2026-10-16: an unrelated maintenance finding must
// not read as the site being down, and a green site must not read as healthy
// automation).
export const SENSOR_LABELS = Object.freeze([
  ["automation:daily-audit", "Outbound link liveness and Ticketmaster drift", true],
  ["automation:health", "Scheduled automation lanes failing or stalled", false],
  ["automation:prelaunch-validation", "Pull requests without a passing validation run", false]
]);

// The same latch, one step removed: materialize-work-queue.mjs turns each
// automation:health finding into its own work-queue item, so a failed run of
// this workflow opens "Scheduled lane not completing: Site health", which then
// failed every later run and kept itself open (2026-09-25..28, #1168). That
// one item is linked, not gating.
// Provider URL coverage items are linked, not gating, too. A missing SeatGeek
// link is a commercial coverage gap, not a site fault, and a batch whose events
// SeatGeek never lists stays open for good, so gating on it kept this check red
// from 2026-10-02 with nothing on the site wrong. Every other work-queue item
// still gates.
export function workQueueItemGates(issue) {
  const block = /```json\s*([\s\S]*?)```/.exec(String(issue?.body || ""));
  if (!block) return true;
  try {
    const finding = JSON.parse(block[1]);
    if (finding?.source === "provider-url-coverage") return false;
    // "Scheduled lane not completing" items mirror automation:health, which
    // does not gate (see SENSOR_LABELS); the lane's own red run is the alarm.
    return finding?.source !== "automation-health";
  } catch {
    return true;
  }
}

const locsOf = (xml) => [...String(xml || "").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
const decode = (value) =>
  String(value || "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

/** Problems on one rendered page, from its status, final URL and HTML. */
export function pageProblems(url, { status, location = "", html = "" }, now = Date.now()) {
  if (status >= 300 && status < 400) return [`redirects (${status}) to ${location || "?"} but is listed in the sitemap`];
  if (status !== 200) return [`answers HTTP ${status || "no response"}`];
  const problems = [];
  const robots = (html.match(/<meta\s+name="robots"\s+content="([^"]*)"/i) || [])[1] || "";
  if (/noindex/i.test(robots)) problems.push(`is noindex ("${robots}") but listed in the sitemap`);
  const canonical = decode((html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i) || [])[1] || "");
  if (!canonical) problems.push("has no canonical");
  else if (canonical.replace(/\/$/, "") !== url.replace(/\/$/, "")) problems.push(`canonical points at ${canonical}`);
  const title = decode((html.match(/<title>([^<]*)<\/title>/i) || [])[1] || "").trim();
  if (!title) problems.push("has no <title>");
  if (!/<h1\b/i.test(html)) problems.push("has no <h1>");
  const jsonLd = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (!jsonLd.length) problems.push("has no JSON-LD block");
  for (const match of jsonLd) {
    try {
      JSON.parse(match[1]);
    } catch {
      problems.push("has a JSON-LD block that does not parse");
      break;
    }
  }
  const past = pastStructuredEvents(html, now);
  if (past.length) problems.push(`lists ${past.length} show(s) that have already started in its JSON-LD, e.g. "${past[0].name}" (${past[0].startDate})`);
  return problems;
}

async function fetchPage(url, fetchImpl) {
  try {
    const response = await fetchImpl(url, { redirect: "manual", headers: { "User-Agent": USER_AGENT, Accept: "text/html" }, signal: AbortSignal.timeout(TIMEOUT_MS) });
    const html = response.status === 200 ? await response.text() : "";
    return { status: response.status, location: response.headers.get("location") || "", html };
  } catch (error) {
    return { status: 0, location: "", html: "", error: String(error?.message || error) };
  }
}

async function pool(items, worker, size = CONCURRENCY) {
  const results = new Array(items.length);
  let next = 0;
  await Promise.all(
    Array.from({ length: Math.min(size, items.length) }, async () => {
      while (next < items.length) {
        const index = next++;
        results[index] = await worker(items[index], index);
      }
    })
  );
  return results;
}

// A single 5xx or dropped connection on a sitemap or API read is not an outage:
// on 30 Oct one 503 on /sitemap-index.xml turned a healthy run red. Retry those
// twice before reporting; a 4xx, or a failure that repeats, is still reported.
async function readText(url, fetchImpl, { attempts = 3, delayMs = RETRY_DELAY_MS } = {}) {
  const response = await fetchWithRetry(url, { headers: { "User-Agent": USER_AGENT } }, { fetchImpl, attempts, delayMs });
  if (response.ok) return response.text();
  throw Object.assign(new Error(`GET ${url} returned HTTP ${response.status}`), { status: response.status });
}

// Sitemaps carry canonical apex URLs whatever host serves them. Rebase each
// onto the origin under test, so a --base-url run crawls that origin only.
const onBase = (loc, baseUrl) => {
  const url = new URL(loc);
  return `${baseUrl}${url.pathname}${url.search}`;
};

export async function collectSitemapUrls(baseUrl, fetchImpl = globalThis.fetch) {
  const problems = [];
  let full = [];
  try {
    full = locsOf(await readText(`${baseUrl}/sitemap.xml`, fetchImpl));
    if (!full.length) problems.push("/sitemap.xml lists no URLs");
  } catch (error) {
    problems.push(`/sitemap.xml is unreachable (${error.message})`);
  }
  let segmented = null;
  try {
    const index = locsOf(await readText(`${baseUrl}/sitemap-index.xml`, fetchImpl));
    if (!index.length) problems.push("/sitemap-index.xml lists no sitemaps");
    segmented = [];
    for (const loc of index) {
      try {
        segmented.push(...locsOf(await readText(onBase(loc, baseUrl), fetchImpl)));
      } catch (error) {
        problems.push(`${new URL(loc).pathname} is unreachable (${error.message})`);
      }
    }
  } catch (error) {
    problems.push(`/sitemap-index.xml is unreachable (${error.message})`);
  }
  if (segmented && !segmented.length && !problems.some((p) => /lists no sitemaps/.test(p))) problems.push("the sitemap segments list no URLs");
  if (segmented) {
    const a = new Set(full);
    const b = new Set(segmented);
    const missing = [...a].filter((url) => !b.has(url));
    const extra = [...b].filter((url) => !a.has(url));
    if (missing.length) problems.push(`${missing.length} URL(s) in /sitemap.xml are in no segment, e.g. ${missing[0]}`);
    if (extra.length) problems.push(`${extra.length} URL(s) in the segments are not in /sitemap.xml, e.g. ${extra[0]}`);
    if (segmented.length !== b.size) problems.push(`${segmented.length - b.size} URL(s) are listed in more than one segment`);
  }
  return { urls: full.map((loc) => onBase(loc, baseUrl)), canonicalUrls: full, problems };
}

async function openSensorFindings(token, repo) {
  if (!token || !repo) return { available: false, items: [] };
  const get = async (apiPath) => {
    const response = await fetchWithRetry(`https://api.github.com/repos/${repo}${apiPath}`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" }
    });
    if (!response.ok) throw new Error(`GitHub ${apiPath} returned HTTP ${response.status}`);
    return response.json();
  };
  const items = [];
  for (const [label, meaning, gating] of SENSOR_LABELS) {
    for (const issue of await get(`/issues?state=open&labels=${encodeURIComponent(label)}`)) {
      if (!issue.pull_request) items.push({ label, meaning, gating, number: issue.number, title: issue.title, url: issue.html_url, updated: issue.updated_at });
    }
  }
  for (const issue of await get(`/issues?state=open&labels=work-queue&per_page=50`)) {
    if (!issue.pull_request) items.push({ label: "work-queue", meaning: "Discrete repair item", gating: workQueueItemGates(issue), number: issue.number, title: issue.title, url: issue.html_url, updated: issue.updated_at });
  }
  return { available: true, items };
}

export function renderReport(report) {
  const lines = [
    `## Site health — ${report.ok ? "🟢 all clear" : "🔴 **needs attention**"}`,
    "",
    `Checked ${report.generated_at} against ${report.base_url} by \`site-health.yml\`. Rewritten every run and closed automatically when everything is clear; do not edit by hand.`,
    "",
    `### 1. Live pages — ${report.pages.checked} sitemap URL(s) crawled`,
    ""
  ];
  if (report.pages.failures.length) {
    lines.push(...report.pages.failures.slice(0, 50).map((f) => `- \`${f.path}\` ${f.problems.join("; ")}`));
    if (report.pages.failures.length > 50) lines.push(`- …${report.pages.failures.length - 50} more`);
  } else lines.push("All answer 200, indexable, self-canonical, with a title, an H1 and parseable JSON-LD.");
  if (report.pages.transient_5xx.length) {
    const share = ((report.pages.transient_5xx.length / Math.max(1, report.pages.checked)) * 100).toFixed(1);
    lines.push("", `${report.pages.transient_problem ? "- 🔴" : "- ⚠️"} ${report.pages.transient_5xx.length} page(s) (${share}%) answered 5xx at ${CONCURRENCY} parallel requests and recovered on retry — the Pages "exceeded resource limits" pattern a parallel crawler hits. Examples: ${report.pages.transient_5xx.slice(0, 5).map((t) => `\`${t.path}\``).join(", ")}.`);
  }
  if (report.pages.network_retries?.length) {
    lines.push("", `- ℹ️ ${report.pages.network_retries.length} page(s) timed out or dropped the connection once and answered on retry (the runner's network, not an origin 5xx; not counted above). Examples: ${report.pages.network_retries.slice(0, 5).map((t) => `\`${t.path}\``).join(", ")}.`);
  }
  if (report.pages.duplicate_titles.length) lines.push("", ...report.pages.duplicate_titles.map((d) => `- Duplicate title "${d.title}": ${d.paths.join(", ")}`));
  lines.push("", "### 2. Sitemaps", "", report.sitemap_problems.length ? report.sitemap_problems.map((p) => `- ${p}`).join("\n") : "The index and every segment are reachable and match `/sitemap.xml`.");
  lines.push("", "### 3. Runtime", "", report.api_health.ok ? "`/api/health` reports ok." : `- \`/api/health\`: ${report.api_health.detail}`);
  lines.push("", "### 4. Prices", "");
  if (report.prices) {
    lines.push(
      report.prices.problems.length
        ? report.prices.problems.map((p) => `- ${p}`).join("\n")
        : report.prices.coverage_share == null
          ? "Freshness gate passes; the coverage gate does not apply (no mapped, on-sale date)."
          : "Coverage and freshness gates pass.",
      "",
      `${report.prices.counts.priced} of ${report.prices.upcoming} upcoming dates priced; ${coverageShareLabel(report.prices.coverage_share)} of mapped, on-sale dates; ${pct(report.prices.stale_share)} of displayed prices older than 12h. Detail: the \`automation:price-coverage\` issue.`
    );
  } else lines.push(`- Price payload unreadable: ${report.price_error}`);
  lines.push("", "### 5. Commercial data findings", "");
  const item = (i) => `- [#${i.number} ${i.title}](${i.url}) — ${i.meaning} (\`${i.label}\`, updated ${String(i.updated).slice(0, 10)})`;
  if (!report.sensors.available) lines.push(report.sensors.error ? `- 🔴 Could not read the sensor issues: ${report.sensors.error}` : "Not checked (no GitHub token in this run).");
  else {
    const gating = report.sensors.items.filter((i) => i.gating);
    const linked = report.sensors.items.filter((i) => !i.gating);
    lines.push(...(gating.length ? gating.map(item) : ["None open."]));
    lines.push("", "### Automation and maintenance (tracked in their own issues; does not fail this check)", "");
    lines.push(...(linked.length ? linked.map(item) : ["None open."]));
  }
  lines.push("", "### 6. Old dates", "");
  const dates = report.dates || { api_past_shows: [], llms_txt: [], llms_error: "", copy: [] };
  const dateLines = [];
  if (dates.api_past_shows.length) dateLines.push(`- \`/api/shows\` still lists ${dates.api_past_shows.length} show(s) that have started, e.g. \`${dates.api_past_shows[0].id}\` (${dates.api_past_shows[0].dateTimeISO}).`);
  if (dates.llms_error) dateLines.push(`- \`/llms.txt\` could not be read: ${dates.llms_error}`);
  dateLines.push(...dates.llms_txt.slice(0, 20).map((d) => `- \`/llms.txt\` ${d.entry}: ${d.detail}.`));
  dateLines.push(
    ...dates.copy.map(
      (c) => `- \`${c.file}\` names ${c.dates.join(", ")}, still ahead when the copy was last written (${c.writtenOn}) and passed since. Put those sentences in the past tense and set \`updated\` (blog) or rebuild provenance (guide).`
    )
  );
  lines.push(dateLines.length ? dateLines.join("\n") : "No past show or on-sale in `/api/shows` or `/llms.txt`, and no published copy names a date that has passed since it was written. Past shows in page JSON-LD are checked per page in section 1.");
  return lines.join("\n");
}

const pct = (value) => `${(Number(value) * 100).toFixed(1)}%`;

export async function runHealthCheck({ baseUrl, fetchImpl = globalThis.fetch, token = "", repo = "", now = Date.now(), retryDelayMs = RETRY_DELAY_MS, contentRoot = REPO_ROOT }) {
  const { urls, canonicalUrls, problems: sitemapProblems } = await collectSitemapUrls(baseUrl, fetchImpl);
  const transient = [];
  const networkRetries = [];
  const results = await pool(urls, async (url, index) => {
    let result = await fetchPage(url, fetchImpl);
    if (result.status >= 500 || result.status === 0) {
      await new Promise((resolve) => setTimeout(resolve, retryDelayMs));
      const retry = await fetchPage(url, fetchImpl);
      // Only an origin 5xx counts toward the resource-limit budget; a timeout
      // or dropped connection (status 0) is the runner's network.
      if (retry.status === 200) (result.status >= 500 ? transient : networkRetries).push({ path: new URL(url).pathname, status: result.status });
      result = retry;
    }
    return { url, canonicalUrl: canonicalUrls[index], ...result };
  });
  const failures = [];
  const byTitle = new Map();
  for (const result of results) {
    const path = new URL(result.url).pathname;
    // The canonical is judged against the sitemap's own URL, not the rebased one.
    const problems = pageProblems(result.canonicalUrl, result, now);
    if (problems.length) failures.push({ path, problems });
    const title = decode((result.html.match(/<title>([^<]*)<\/title>/i) || [])[1] || "").trim();
    if (title) byTitle.set(title, [...(byTitle.get(title) || []), path]);
  }
  const duplicateTitles = [...byTitle].filter(([, paths]) => paths.length > 1).map(([title, paths]) => ({ title, paths }));
  let apiHealth = { ok: false, detail: "unreachable" };
  try {
    const body = JSON.parse(await readText(`${baseUrl}/api/health`, fetchImpl));
    apiHealth = body?.ok === true ? { ok: true } : { ok: false, detail: `ok is ${JSON.stringify(body?.ok)}` };
  } catch (error) {
    apiHealth = { ok: false, detail: error.message };
  }
  let prices = null;
  let priceError = "";
  const dates = { api_past_shows: [], llms_txt: [], llms_error: "", copy: [] };
  try {
    const shows = await fetchAllShows(baseUrl, fetchImpl);
    prices = analysePrices(shows, { now });
    dates.api_past_shows = pastShowsInApi(shows, now);
  } catch (error) {
    priceError = error.message;
  }
  try {
    dates.llms_txt = llmsTxtStaleDates(await readText(`${baseUrl}/llms.txt`, fetchImpl), now);
  } catch (error) {
    dates.llms_error = error.message;
  }
  dates.copy = contentRoot ? staleDatedCopy({ root: contentRoot, today: new Date(now).toISOString().slice(0, 10) }) : [];
  const datesOk = !dates.api_past_shows.length && !dates.llms_txt.length && !dates.llms_error && !dates.copy.length;
  const sensors = await openSensorFindings(token, repo).catch((error) => ({ available: false, items: [], error: error.message }));
  // Fail closed: with credentials supplied, unreadable sensors are not "none open".
  const sensorsOk = token && repo ? sensors.available && !sensors.items.some((item) => item.gating) : true;
  const transientShare = urls.length ? transient.length / urls.length : 0;
  const transientProblem = transientShare > TRANSIENT_5XX_MAX_SHARE;
  const ok =
    !transientProblem &&
    !failures.length &&
    !duplicateTitles.length &&
    !sitemapProblems.length &&
    apiHealth.ok &&
    Boolean(prices?.ok) &&
    datesOk &&
    urls.length > 0 &&
    sensorsOk;
  return {
    generated_at: new Date(now).toISOString(),
    base_url: baseUrl,
    ok,
    pages: { checked: urls.length, failures, duplicate_titles: duplicateTitles, transient_5xx: transient, transient_problem: transientProblem, network_retries: networkRetries },
    sitemap_problems: sitemapProblems,
    api_health: apiHealth,
    prices,
    price_error: priceError,
    dates,
    sensors
  };
}

async function syncIssue(report, markdown, token, repo) {
  const api = async (method, apiPath, body) => {
    const response = await fetchWithRetry(`https://api.github.com/repos/${repo}${apiPath}`, {
      method,
      headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28", "Content-Type": "application/json" },
      body: body ? JSON.stringify(body) : undefined
    });
    if (!response.ok) throw new Error(`GitHub ${method} ${apiPath} returned HTTP ${response.status}`);
    return response.json();
  };
  const existing = (await api("GET", `/issues?state=all&labels=${encodeURIComponent(ISSUE_LABEL)}&per_page=5`)).find((issue) => !issue.pull_request);
  if (!existing) {
    if (report.ok) return;
    await api("POST", "/issues", { title: ISSUE_TITLE, body: markdown, labels: [ISSUE_LABEL] });
    return;
  }
  await api("PATCH", `/issues/${existing.number}`, { body: markdown, state: report.ok ? "closed" : "open", ...(report.ok ? { state_reason: "completed" } : {}) });
}

async function selfTest() {
  const good = `<html><head><title>A | TTC</title><meta name="robots" content="index,follow" /><link rel="canonical" href="https://x.test/a" /><script type="application/ld+json">{"@type":"WebPage"}</script></head><body><h1>A</h1></body></html>`;
  assert.deepEqual(pageProblems("https://x.test/a", { status: 200, html: good }), []);
  assert.match(pageProblems("https://x.test/a", { status: 301, location: "/cities" })[0], /redirects \(301\)/);
  assert.match(pageProblems("https://x.test/a", { status: 404 })[0], /HTTP 404/);
  assert.ok(pageProblems("https://x.test/a", { status: 200, html: good.replace("index,follow", "noindex,follow") }).some((p) => /noindex/.test(p)));
  assert.ok(pageProblems("https://x.test/a", { status: 200, html: good.replace("x.test/a", "x.test/b") }).some((p) => /canonical points/.test(p)));
  assert.ok(pageProblems("https://x.test/a", { status: 200, html: good.replace("<h1>A</h1>", "") }).some((p) => /no <h1>/.test(p)));
  assert.ok(pageProblems("https://x.test/a", { status: 200, html: good.replace('{"@type":"WebPage"}', "{oops") }).some((p) => /JSON-LD/.test(p)));

  // A one-off 503 on a read is retried; a repeated 503 and a 404 are still reported.
  {
    let calls = 0;
    const flaky503 = async () => (++calls === 1 ? new Response("busy", { status: 503 }) : new Response("ok", { status: 200 }));
    assert.equal(await readText("https://x.test/a", flaky503, { delayMs: 0 }), "ok");
    assert.equal(calls, 2);
    let always = 0;
    await assert.rejects(readText("https://x.test/a", async () => (++always, new Response("busy", { status: 503 })), { delayMs: 0 }), /HTTP 503/);
    assert.equal(always, 3);
    let notFound = 0;
    await assert.rejects(readText("https://x.test/a", async () => (++notFound, new Response("no", { status: 404 })), { delayMs: 0 }), /HTTP 404/);
    assert.equal(notFound, 1);
  }
  // End to end against a fake site: one 404, one duplicate title, a sitemap
  // segment that disagrees with /sitemap.xml, and a healthy price payload.
  const page = (path, title) => good.replace("x.test/a", `x.test${path}`).replace("A | TTC", title);
  const future = new Date(Date.now() + 30 * 86400000).toISOString();
  const fresh = new Date(Date.now() - 3600000).toISOString();
  const show = { id: "e1", dateTimeISO: future, vividseats_url: "https://www.vividseats.com/x--concerts/production/1", provider_links: { "vivid-seats": { verified: true } }, prices: [{ provider: "Vivid Seats", status: "ok", price: 90, fetchedAt: fresh }] };
  const routes = {
    "/sitemap.xml": "<urlset><url><loc>https://x.test/a</loc></url><url><loc>https://x.test/b</loc></url><url><loc>https://x.test/gone</loc></url></urlset>",
    "/sitemap-index.xml": "<sitemapindex><sitemap><loc>https://x.test/sitemaps/pages.xml</loc></sitemap></sitemapindex>",
    "/sitemaps/pages.xml": "<urlset><url><loc>https://x.test/a</loc></url><url><loc>https://x.test/b</loc></url></urlset>",
    "/a": page("/a", "Same | TTC"),
    "/b": page("/b", "Same | TTC"),
    "/api/health": JSON.stringify({ ok: true }),
    "/api/shows": JSON.stringify({ shows: [show] }),
    "/llms.txt": "# TTC\n- [A](https://x.test/a): 2 upcoming dates in 1 city, 1 Jan 2099 to 2 Jan 2099.\n"
  };
  const fakeFetch = async (url) => {
    const body = routes[new URL(url).pathname];
    return body == null ? new Response("nope", { status: 404 }) : new Response(body, { status: 200 });
  };
  const report = await runHealthCheck({ baseUrl: "https://x.test", fetchImpl: fakeFetch, retryDelayMs: 0 });
  assert.equal(report.pages.checked, 3);
  assert.deepEqual(report.pages.failures.map((f) => f.path), ["/gone"]);
  assert.equal(report.pages.duplicate_titles[0].paths.length, 2);
  assert.ok(report.sitemap_problems.some((p) => /in no segment/.test(p)), "a URL missing from every segment is reported");
  assert.equal(report.api_health.ok, true);
  assert.equal(report.prices.ok, true);
  assert.equal(report.sensors.available, false);
  assert.equal(report.ok, false);
  const md = renderReport(report);
  assert.match(md, /needs attention/);
  // An all-held price payload has no coverage share: the report says the gate
  // does not apply rather than printing 0% beside a pass (Codex, #1194).
  const allHeldMd = renderReport({ ...report, prices: { ...report.prices, coverage_share: null, problems: [] } });
  assert.match(allHeldMd, /coverage gate does not apply/);
  assert.match(allHeldMd, /n\/a \(no mapped, on-sale date\) of mapped/);
  assert.match(md, /`\/gone` answers HTTP 404/);

  // A 503 that clears on retry is counted as transient, not as a failed page.
  let flaky = 0;
  const flakyFetch = async (url) => {
    if (new URL(url).pathname === "/a" && flaky++ === 0) return new Response("busy", { status: 503 });
    return fakeFetch(url);
  };
  const retried = await runHealthCheck({ baseUrl: "https://x.test", fetchImpl: flakyFetch, retryDelayMs: 0 });
  assert.deepEqual(retried.pages.transient_5xx.map((t) => t.path), ["/a"]);
  assert.ok(!retried.pages.failures.some((f) => f.path === "/a"), "a recovered page is not a failed page");
  assert.equal(retried.pages.transient_problem, true, "1 of 3 pages is above the 2% transient budget");

  // Codex review on #1126: each fail-open path now fails.
  assert.ok(pageProblems("https://x.test/a", { status: 200, html: good.replace(/<script type="application\/ld\+json">.*?<\/script>/, "") }).some((p) => /no JSON-LD/.test(p)), "a page with no JSON-LD is a finding");
  const emptyFetch = async (url) => {
    const path = new URL(url).pathname;
    if (path === "/sitemap.xml" || path === "/sitemaps/pages.xml") return new Response("<urlset></urlset>", { status: 200 });
    return fakeFetch(url);
  };
  const empty = await runHealthCheck({ baseUrl: "https://x.test", fetchImpl: emptyFetch, retryDelayMs: 0 });
  assert.equal(empty.ok, false, "an empty sitemap is never all clear");
  assert.ok(empty.sitemap_problems.some((p) => /lists no URLs/.test(p)));
  const downFetch = async (url) => (new URL(url).pathname === "/sitemap.xml" ? new Response("err", { status: 500 }) : fakeFetch(url));
  const down = await runHealthCheck({ baseUrl: "https://x.test", fetchImpl: downFetch, retryDelayMs: 0 });
  assert.ok(down.sitemap_problems.some((p) => /sitemap\.xml is unreachable/.test(p)), "a sitemap outage becomes a reported finding, not a crash");
  assert.match(renderReport(down), /needs attention/);
  const seen = new Set();
  const previewFetch = async (url) => {
    seen.add(new URL(url).host);
    return fakeFetch(`https://x.test${new URL(url).pathname}`);
  };
  const preview = await runHealthCheck({ baseUrl: "https://preview.x.test", fetchImpl: previewFetch, retryDelayMs: 0 });
  assert.deepEqual([...seen], ["preview.x.test"], "a --base-url run fetches segments and pages from that origin only");
  assert.ok(!preview.pages.failures.some((f) => f.problems.some((p) => /canonical points/.test(p))), "canonicals are judged against the sitemap URL");
  let dropped = 0;
  const netFetch = async (url) => {
    if (new URL(url).pathname === "/a" && dropped++ === 0) throw new Error("socket hang up");
    return fakeFetch(url);
  };
  const net = await runHealthCheck({ baseUrl: "https://x.test", fetchImpl: netFetch, retryDelayMs: 0 });
  assert.equal(net.pages.transient_5xx.length, 0, "a network retry is not an origin 5xx");
  assert.deepEqual(net.pages.network_retries.map((t) => t.path), ["/a"]);
  assert.deepEqual(SENSOR_LABELS.find(([label]) => label === "automation:health")[2], false, "automation:health never gates site-health (circular)");
  const workItem = (finding) => ({ body: `<details>\n\n\`\`\`json\n${JSON.stringify(finding, null, 2)}\n\`\`\`\n\n</details>` });
  assert.equal(workQueueItemGates(workItem({ source: "automation-health", identity: ["site-health.yml"] })), false, "the work item about site-health.yml itself never gates (circular)");
  assert.equal(workQueueItemGates(workItem({ source: "automation-health", identity: ["vividseats-cta-sync.yml"] })), false, "a failing lane is automation health, not site health");
  assert.equal(SENSOR_LABELS.find(([label]) => label === "automation:daily-audit")[2], true, "dead outbound links and Ticketmaster drift are commercial data: they gate");
  assert.equal(SENSOR_LABELS.find(([label]) => label === "automation:prelaunch-validation")[2], false, "an unvalidated PR changes nothing live");
  assert.equal(workQueueItemGates(workItem({ source: "generated-freshness", identity: ["og-cards"] })), true, "a non-health work item still gates");
  assert.equal(workQueueItemGates({ body: "no machine-readable block" }), true, "an unparseable work item gates rather than hiding");
  assert.equal(workQueueItemGates(workItem({ source: "provider-url-coverage", identity: ["valley", "seatgeek"] })), false, "a provider URL coverage item is linked, not gating");

  // Old dates (2026-10-10).
  const NOW = Date.parse("2026-10-10T12:00:00Z");
  const eventLd = (startDate) => good.replace('{"@type":"WebPage"}', JSON.stringify({ "@graph": [{ "@type": "MusicEvent", name: "Show", startDate }] }));
  assert.ok(pageProblems("https://x.test/a", { status: 200, html: eventLd("2026-10-09T20:00:00-04:00") }, NOW).some((p) => /already started/.test(p)), "a past MusicEvent in JSON-LD is a finding");
  assert.deepEqual(pageProblems("https://x.test/a", { status: 200, html: eventLd("2026-10-10T20:00:00-04:00") }, NOW), [], "an upcoming MusicEvent is not");
  assert.deepEqual(pageProblems("https://x.test/a", { status: 200, html: eventLd("2026-10-09") }, NOW), [], "a date-only show counts until its day is over everywhere");
  assert.deepEqual(pastShowsInApi([{ id: "old", dateTimeISO: "2026-10-09T19:00:00Z" }, { id: "new", dateTimeISO: "2026-10-11T19:00:00Z" }], NOW).map((r) => r.id), ["old"]);
  assert.equal(pastShowsInApi([{ id: "ny", dateTimeISO: "2026-10-10T09:00:00", timezone: "America/New_York" }], NOW).length, 0, "a naive time is read in the venue zone (09:00 New York is 13:00Z)");
  const llms = "- [A](https://x.test/a): 3 upcoming dates in 2 cities, 8 Oct 2026 to 1 Nov 2026.\n- [B](https://x.test/b): 1 upcoming date in 1 city on 10 Oct 2026. Next Ticketmaster public on-sale: 2026-10-09 15:00 UTC.\n";
  assert.deepEqual(llmsTxtStaleDates(llms, NOW).map((d) => d.entry), ["A", "B"], "a passed first date and a passed 'next' on-sale are findings; today's date is not");
  const fixtureRoot = await fs.mkdtemp(path.join(os.tmpdir(), "site-health-"));
  await fs.mkdir(path.join(fixtureRoot, "content/blog"), { recursive: true });
  await fs.writeFile(path.join(fixtureRoot, "content/blog/onsale.md"), "---\ntitle: T\ndate: 2026-10-01\nstatus: published\n---\n\nTickets go on sale on 5 October 2026 for the 1 December 2026 show.\n");
  await fs.writeFile(path.join(fixtureRoot, "content/blog/recap.md"), "---\ntitle: T\ndate: 2026-10-01\nupdated: 2026-10-06\nstatus: published\n---\n\nTickets went on sale on October 5, 2026.\n");
  const copy = staleDatedCopy({ root: fixtureRoot, today: "2026-10-10" });
  assert.deepEqual(copy.map((c) => [c.path, c.dates]), [["/blog/onsale", ["2026-10-05"]]], "copy written before a date that has passed is a finding; updated copy and future dates are not");
  const datedRun = await runHealthCheck({ baseUrl: "https://x.test", fetchImpl: fakeFetch, retryDelayMs: 0, now: NOW, contentRoot: fixtureRoot });
  assert.equal(datedRun.dates.copy.length, 1);
  assert.match(renderReport(datedRun), /### 6\. Old dates[\s\S]*content\/blog\/onsale\.md/);
  await fs.rm(fixtureRoot, { recursive: true, force: true });
  return 44;
}

async function main(argv) {
  if (argv.includes("--self-test")) return console.log(`site-health self-test: ${await selfTest()} assertions passed`);
  const option = (name, fallback = "") => (argv.includes(name) ? argv[argv.indexOf(name) + 1] : fallback);
  const baseUrl = option("--base-url", "https://tourticketcompare.com").replace(/\/+$/, "");
  let report;
  try {
    report = await runHealthCheck({ baseUrl, token: process.env.GITHUB_TOKEN || "", repo: process.env.GITHUB_REPOSITORY || "" });
  } catch (error) {
    console.error(`site-health: could not read the live site — ${error?.message || error}`);
    process.exitCode = 2;
    return;
  }
  const markdown = renderReport(report);
  if (option("--markdown")) await fs.writeFile(option("--markdown"), `${markdown}\n`);
  if (argv.includes("--issue")) await syncIssue(report, markdown, process.env.GITHUB_TOKEN || "", process.env.GITHUB_REPOSITORY || "");
  console.log(argv.includes("--json") ? JSON.stringify(report, null, 2) : markdown);
  if (!report.ok) process.exitCode = 1;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main(process.argv.slice(2)).catch((error) => {
    console.error(error?.stack || error);
    process.exitCode = 1;
  });
}
