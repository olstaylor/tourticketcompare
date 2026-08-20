#!/usr/bin/env node
// Read-only mobile Web Vitals report. It executes one SELECT against D1, then
// calculates percentiles in-process so it does not depend on SQLite extensions.
import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const DATABASE = "tourticketcompare-demand";
const LOW_SAMPLE = 75;
const METRICS = ["ttfb", "fcp", "lcp", "lcpRenderDelay"];

function parseArgs(argv) {
  const options = { days: 28, remote: true, json: false, selfTest: false };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--days") options.days = Number(argv[++i]);
    else if (arg === "--local") options.remote = false;
    else if (arg === "--json") options.json = true;
    else if (arg === "--self-test") options.selfTest = true;
    else throw new Error(`Unknown argument: ${arg}`);
  }
  if (!Number.isInteger(options.days) || options.days < 1 || options.days > 365) {
    throw new Error("--days must be an integer from 1 to 365");
  }
  return options;
}

export function percentile(values, fraction) {
  const sorted = values.filter(Number.isFinite).sort((a, b) => a - b);
  if (!sorted.length) return null;
  return sorted[Math.max(0, Math.ceil(sorted.length * fraction) - 1)];
}

function fallbackTemplate(pathname) {
  const parts = String(pathname || "/").split("/").filter(Boolean);
  if (!parts.length) return "home";
  if (parts[0] === "guides") return parts.length === 1 ? "guides-index" : "guide";
  if (parts[0] === "artists") return parts.length === 1 ? "artists-index" : parts[2] === "tickets" ? "artist-city" : "artist";
  if (parts[0] === "cities") return parts.length === 1 ? "cities-index" : "city";
  if (parts[0] === "venues") return parts.length === 1 ? "venues-index" : "venue";
  if (parts[0] === "blog") {
    if (parts.length === 1) return "blog-index";
    if (parts[1] === "tags") return "blog-tag";
    return "blog-post";
  }
  return "static";
}

export function summarize(rows) {
  const groups = new Map();
  for (const row of rows || []) {
    let metadata = {};
    try { metadata = JSON.parse(row.metadata_json || "{}"); } catch {}
    const template = String(metadata.routeTemplate || fallbackTemplate(row.source_path));
    const navigationType = String(metadata.navigationType || "unknown");
    const key = `${template}|${navigationType}`;
    if (!groups.has(key)) {
      groups.set(key, { routeTemplate: template, navigationType, samples: 0, values: Object.fromEntries(METRICS.map((metric) => [metric, []])) });
    }
    const group = groups.get(key);
    group.samples += 1;
    for (const metric of METRICS) {
      const value = Number(metadata[metric]);
      if (Number.isFinite(value) && value >= 0 && value <= 120000) group.values[metric].push(value);
    }
  }
  return [...groups.values()]
    .map((group) => {
      const metrics = Object.fromEntries(METRICS.map((metric) => [metric, {
        samples: group.values[metric].length,
        lowSample: group.values[metric].length < LOW_SAMPLE,
        p50: percentile(group.values[metric], 0.5),
        p75: percentile(group.values[metric], 0.75),
        p95: percentile(group.values[metric], 0.95)
      }]));
      return {
        routeTemplate: group.routeTemplate,
        navigationType: group.navigationType,
        samples: group.samples,
        lowSample: metrics.lcp.lowSample,
        metrics
      };
    })
    .sort((a, b) => a.routeTemplate.localeCompare(b.routeTemplate) || a.navigationType.localeCompare(b.navigationType));
}

function readOnlySql(days) {
  const since = new Date(Date.now() - days * 86400000).toISOString();
  return `SELECT source_path, metadata_json FROM analytics_events WHERE event_name = 'web_vitals' AND device_category = 'mobile' AND created_at >= '${since}'`;
}

function parseWrangler(stdout) {
  const parsed = JSON.parse(stdout);
  const first = Array.isArray(parsed) ? parsed[0] : null;
  if (!first || first.success !== true || !Array.isArray(first.results)) throw new Error("D1 query did not return a successful result set");
  return first.results;
}

function printTable(summary) {
  const rows = summary.map((group) => ({
    route: group.routeTemplate,
    navigation: group.navigationType,
    n: group.samples,
    warning: METRICS.some((metric) => group.metrics[metric].lowSample)
      ? `provisional: ${METRICS.filter((metric) => group.metrics[metric].lowSample).map((metric) => `${metric}<${LOW_SAMPLE}`).join(", ")}`
      : "",
    "LCP p50/p75/p95 ms": [group.metrics.lcp.p50, group.metrics.lcp.p75, group.metrics.lcp.p95].map((value) => value ?? "—").join(" / "),
    "TTFB p75 ms": group.metrics.ttfb.p75 ?? "—",
    "FCP p75 ms": group.metrics.fcp.p75 ?? "—",
    "render delay p75 ms": group.metrics.lcpRenderDelay.p75 ?? "—"
  }));
  console.table(rows);
}

function selfTest() {
  assert.equal(percentile([1, 2, 3, 4], 0.75), 3);
  const result = summarize([
    { source_path: "/", metadata_json: JSON.stringify({ routeTemplate: "home", navigationType: "navigate", lcp: 2000, ttfb: 500 }) },
    { source_path: "/", metadata_json: JSON.stringify({ routeTemplate: "home", navigationType: "navigate", lcp: 3000, ttfb: 900 }) }
  ]);
  assert.equal(result[0].metrics.lcp.p50, 2000);
  assert.equal(result[0].metrics.lcp.p75, 3000);
  assert.equal(result[0].lowSample, true);
  assert.equal(result[0].metrics.lcp.lowSample, true);
  const sparseLcp = summarize(Array.from({ length: 75 }, (_, index) => ({
    source_path: "/",
    metadata_json: JSON.stringify({ routeTemplate: "home", navigationType: "navigate", ttfb: 400 + index, ...(index < 2 ? { lcp: 2000 + index } : {}) })
  })))[0];
  assert.equal(sparseLcp.samples, 75);
  assert.equal(sparseLcp.metrics.ttfb.lowSample, false);
  assert.equal(sparseLcp.metrics.lcp.samples, 2);
  assert.equal(sparseLcp.metrics.lcp.lowSample, true);
  assert.equal(sparseLcp.lowSample, true);
  console.log("report-web-vitals self-test passed");
}

const options = parseArgs(process.argv.slice(2));
if (options.selfTest) selfTest();
else {
  const args = ["d1", "execute", DATABASE, options.remote ? "--remote" : "--local", "--json", "--command", readOnlySql(options.days)];
  const { stdout } = await execFileAsync("wrangler", args, { maxBuffer: 10 * 1024 * 1024 });
  const summary = summarize(parseWrangler(stdout));
  if (options.json) console.log(JSON.stringify({ windowDays: options.days, device: "mobile", lowSampleThreshold: LOW_SAMPLE, groups: summary }, null, 2));
  else printTable(summary);
}
