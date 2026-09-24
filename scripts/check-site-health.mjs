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
//   5. Other sensors: open findings from the lanes that close their own issue
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
import { analyse as analysePrices, fetchAllShows } from "./report-price-coverage.mjs";

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
// Sensors whose issue is open only while they have a finding.
export const SENSOR_LABELS = Object.freeze([
  ["automation:daily-audit", "Outbound link liveness and Ticketmaster drift"],
  ["automation:health", "Scheduled automation lanes failing or stalled"],
  ["automation:prelaunch-validation", "Pull requests without a passing validation run"]
]);

const locsOf = (xml) => [...String(xml || "").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
const decode = (value) =>
  String(value || "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

/** Problems on one rendered page, from its status, final URL and HTML. */
export function pageProblems(url, { status, location = "", html = "" }) {
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
  for (const match of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(match[1]);
    } catch {
      problems.push("has a JSON-LD block that does not parse");
      break;
    }
  }
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

async function readText(url, fetchImpl) {
  const response = await fetchImpl(url, { headers: { "User-Agent": USER_AGENT } });
  if (!response.ok) throw Object.assign(new Error(`GET ${url} returned HTTP ${response.status}`), { status: response.status });
  return response.text();
}

export async function collectSitemapUrls(baseUrl, fetchImpl = globalThis.fetch) {
  const problems = [];
  const full = locsOf(await readText(`${baseUrl}/sitemap.xml`, fetchImpl));
  let segmented = null;
  try {
    const index = locsOf(await readText(`${baseUrl}/sitemap-index.xml`, fetchImpl));
    if (!index.length) problems.push("/sitemap-index.xml lists no sitemaps");
    segmented = [];
    for (const loc of index) {
      try {
        segmented.push(...locsOf(await readText(loc, fetchImpl)));
      } catch (error) {
        problems.push(`${new URL(loc).pathname} is unreachable (${error.message})`);
      }
    }
  } catch (error) {
    problems.push(`/sitemap-index.xml is unreachable (${error.message})`);
  }
  if (segmented) {
    const a = new Set(full);
    const b = new Set(segmented);
    const missing = [...a].filter((url) => !b.has(url));
    const extra = [...b].filter((url) => !a.has(url));
    if (missing.length) problems.push(`${missing.length} URL(s) in /sitemap.xml are in no segment, e.g. ${missing[0]}`);
    if (extra.length) problems.push(`${extra.length} URL(s) in the segments are not in /sitemap.xml, e.g. ${extra[0]}`);
    if (segmented.length !== b.size) problems.push(`${segmented.length - b.size} URL(s) are listed in more than one segment`);
  }
  return { urls: full, problems };
}

async function openSensorFindings(token, repo) {
  if (!token || !repo) return { available: false, items: [] };
  const get = async (apiPath) => {
    const response = await fetch(`https://api.github.com/repos/${repo}${apiPath}`, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" }
    });
    if (!response.ok) throw new Error(`GitHub ${apiPath} returned HTTP ${response.status}`);
    return response.json();
  };
  const items = [];
  for (const [label, meaning] of SENSOR_LABELS) {
    for (const issue of await get(`/issues?state=open&labels=${encodeURIComponent(label)}`)) {
      if (!issue.pull_request) items.push({ label, meaning, number: issue.number, title: issue.title, url: issue.html_url, updated: issue.updated_at });
    }
  }
  for (const issue of await get(`/issues?state=open&labels=work-queue&per_page=50`)) {
    if (!issue.pull_request) items.push({ label: "work-queue", meaning: "Discrete repair item", number: issue.number, title: issue.title, url: issue.html_url, updated: issue.updated_at });
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
  if (report.pages.duplicate_titles.length) lines.push("", ...report.pages.duplicate_titles.map((d) => `- Duplicate title "${d.title}": ${d.paths.join(", ")}`));
  lines.push("", "### 2. Sitemaps", "", report.sitemap_problems.length ? report.sitemap_problems.map((p) => `- ${p}`).join("\n") : "The index and every segment are reachable and match `/sitemap.xml`.");
  lines.push("", "### 3. Runtime", "", report.api_health.ok ? "`/api/health` reports ok." : `- \`/api/health\`: ${report.api_health.detail}`);
  lines.push("", "### 4. Prices", "");
  if (report.prices) {
    lines.push(
      report.prices.problems.length ? report.prices.problems.map((p) => `- ${p}`).join("\n") : "Coverage and freshness gates pass.",
      "",
      `${report.prices.counts.priced} of ${report.prices.upcoming} upcoming dates priced; ${pct(report.prices.coverage_share)} of mapped, on-sale dates; ${pct(report.prices.stale_share)} of displayed prices older than 12h. Detail: the \`automation:price-coverage\` issue.`
    );
  } else lines.push(`- Price payload unreadable: ${report.price_error}`);
  lines.push("", "### 5. Other sensors with open findings", "");
  if (!report.sensors.available) lines.push("Not checked (no GitHub token in this run).");
  else if (!report.sensors.items.length) lines.push("None open.");
  else lines.push(...report.sensors.items.map((i) => `- [#${i.number} ${i.title}](${i.url}) — ${i.meaning} (\`${i.label}\`, updated ${String(i.updated).slice(0, 10)})`));
  return lines.join("\n");
}

const pct = (value) => `${(Number(value) * 100).toFixed(1)}%`;

export async function runHealthCheck({ baseUrl, fetchImpl = globalThis.fetch, token = "", repo = "", now = Date.now(), retryDelayMs = RETRY_DELAY_MS }) {
  const { urls, problems: sitemapProblems } = await collectSitemapUrls(baseUrl, fetchImpl);
  const transient = [];
  const results = await pool(urls, async (url) => {
    let result = await fetchPage(url, fetchImpl);
    if (result.status >= 500 || result.status === 0) {
      await new Promise((resolve) => setTimeout(resolve, retryDelayMs));
      const retry = await fetchPage(url, fetchImpl);
      if (retry.status === 200) transient.push({ path: new URL(url).pathname, status: result.status });
      result = retry;
    }
    return { url, ...result };
  });
  const failures = [];
  const byTitle = new Map();
  for (const result of results) {
    const path = new URL(result.url).pathname;
    const problems = pageProblems(result.url, result);
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
  try {
    prices = analysePrices(await fetchAllShows(baseUrl, fetchImpl), { now });
  } catch (error) {
    priceError = error.message;
  }
  const sensors = await openSensorFindings(token, repo).catch((error) => ({ available: false, items: [], error: error.message }));
  const transientShare = urls.length ? transient.length / urls.length : 0;
  const transientProblem = transientShare > TRANSIENT_5XX_MAX_SHARE;
  const ok =
    !transientProblem &&
    !failures.length &&
    !duplicateTitles.length &&
    !sitemapProblems.length &&
    apiHealth.ok &&
    Boolean(prices?.ok) &&
    !sensors.items.length;
  return {
    generated_at: new Date(now).toISOString(),
    base_url: baseUrl,
    ok,
    pages: { checked: urls.length, failures, duplicate_titles: duplicateTitles, transient_5xx: transient, transient_problem: transientProblem },
    sitemap_problems: sitemapProblems,
    api_health: apiHealth,
    prices,
    price_error: priceError,
    sensors
  };
}

async function syncIssue(report, markdown, token, repo) {
  const api = async (method, apiPath, body) => {
    const response = await fetch(`https://api.github.com/repos/${repo}${apiPath}`, {
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
    "/api/shows": JSON.stringify({ shows: [show] })
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
  return 21;
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
