#!/usr/bin/env node
// Weekly read-only Search Console export so threads can read the data without a
// manual upload. Pulls the last 28 complete days of page and query rows with the
// read-only service account (scripts/lib/search-console-api.mjs) and rewrites the
// rolling `automation:gsc-export` issue with the top rows as tables. Writes no
// repository file and touches no other data.
//
//   GSC_SERVICE_ACCOUNT_JSON=... GITHUB_TOKEN=... GITHUB_REPOSITORY=... \
//     node scripts/export-search-console.mjs [--issue] [--json out.json]
//   node scripts/export-search-console.mjs --self-test
import { writeFileSync } from "node:fs";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { fetchSearchConsole, SITE } from "./lib/search-console-api.mjs";
import { fetchWithRetry } from "./lib/http-retry.mjs";

export const LABEL = "automation:gsc-export";
export const ISSUE_TITLE = "Search Console export (last 28 days)";
const TOP_QUERIES = 150;
const TOP_PAGES = 100;

const cell = (text) => String(text).replace(/\|/g, "\\|").replace(/\s+/g, " ").trim();
const pct = (n) => `${(n * 100).toFixed(2)}%`;

export function topRows(rows, limit) {
  return [...rows].sort((a, b) => b.clicks - a.clicks || b.impressions - a.impressions).slice(0, limit);
}

function table(title, rows, limit) {
  const top = topRows(rows, limit);
  const lines = [`## ${title} (top ${top.length} of ${rows.length} by clicks)`, "", "| Clicks | Impressions | CTR | Position | Key |", "|---:|---:|---:|---:|---|"];
  for (const r of top) lines.push(`| ${r.clicks} | ${r.impressions} | ${pct(r.ctr)} | ${r.position.toFixed(1)} | ${cell(r.key)} |`);
  return lines.join("\n");
}

export function renderExport({ pages, queries, window }, generatedAt = new Date().toISOString()) {
  const sum = (rows, k) => rows.reduce((s, r) => s + r[k], 0);
  return [
    `# ${ISSUE_TITLE}`,
    "",
    `Source: Search Console API \`${SITE}\`, ${window.startDate} to ${window.endDate} (28 complete days, 3-day lag). Generated ${generatedAt} by \`scripts/export-search-console.mjs\`. Rewritten weekly; do not edit by hand.`,
    "",
    `Totals across returned rows: ${sum(pages, "clicks")} clicks and ${sum(pages, "impressions")} impressions by page; ${sum(queries, "clicks")} clicks and ${sum(queries, "impressions")} impressions by query. Google withholds rare queries, so query totals are lower than page totals.`,
    "",
    table("Pages", pages, TOP_PAGES),
    "",
    table("Queries", queries, TOP_QUERIES),
    ""
  ].join("\n");
}

export async function upsertIssue(body, { fetchImpl = globalThis.fetch, token = process.env.GITHUB_TOKEN, repo = process.env.GITHUB_REPOSITORY } = {}) {
  if (!token || !repo) throw new Error("--issue needs GITHUB_TOKEN and GITHUB_REPOSITORY");
  const gh = async (method, apiPath, payload) => {
    const res = await fetchWithRetry(`https://api.github.com/repos/${repo}${apiPath}`, {
      method,
      headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" },
      body: payload ? JSON.stringify(payload) : undefined
    }, { fetchImpl });
    if (!res.ok) throw new Error(`GitHub API ${method} ${apiPath} ${res.status}`);
    return res.json();
  };
  const open = await gh("GET", `/issues?state=open&labels=${encodeURIComponent(LABEL)}`);
  if (open[0]) {
    await gh("PATCH", `/issues/${open[0].number}`, { body });
    return { number: open[0].number, created: false };
  }
  const made = await gh("POST", "/issues", { title: ISSUE_TITLE, body, labels: [LABEL] });
  return { number: made?.number, created: true };
}

async function selfTest() {
  const rows = [
    { key: "a | b", clicks: 1, impressions: 50, ctr: 0.02, position: 4.26 },
    { key: "top", clicks: 9, impressions: 100, ctr: 0.09, position: 1 },
    { key: "mid", clicks: 1, impressions: 80, ctr: 0.0125, position: 9 }
  ];
  assert.deepEqual(topRows(rows, 2).map((r) => r.key), ["top", "mid"], "ranks by clicks then impressions");
  const md = renderExport({ pages: rows, queries: rows, window: { startDate: "2026-10-01", endDate: "2026-10-28" } }, "t");
  assert.ok(md.includes("a \\| b"), "pipes in keys are escaped");
  assert.ok(md.includes("| 9 | 100 | 9.00% | 1.0 | top |"), "row format");
  assert.ok(md.includes("2026-10-01 to 2026-10-28"));
  const calls = [];
  const fakeFetch = async (url, init = {}) => {
    calls.push(`${init.method || "GET"} ${url.replace(/^.*repos\/[^/]+\/[^/]+/, "")}`);
    return { ok: true, status: 200, json: async () => (init.method === "POST" ? { number: 7 } : []) };
  };
  const created = await upsertIssue("body", { fetchImpl: fakeFetch, token: "t", repo: "o/r" });
  assert.deepEqual(created, { number: 7, created: true });
  assert.ok(calls[0].startsWith("GET /issues?state=open") && calls[1] === "POST /issues");
  const updated = await upsertIssue("body", { fetchImpl: async (u, i = {}) => ({ ok: true, status: 200, json: async () => (i.method === "PATCH" ? {} : [{ number: 3 }]) }), token: "t", repo: "o/r" });
  assert.deepEqual(updated, { number: 3, created: false });
  console.log("export-search-console: ok");
}

async function main(argv) {
  if (argv.includes("--self-test")) return selfTest();
  const json = process.env.GSC_SERVICE_ACCOUNT_JSON;
  if (!json || !json.trim()) throw new Error("GSC_SERVICE_ACCOUNT_JSON is not set");
  const data = await fetchSearchConsole(json);
  const md = renderExport(data);
  const jsonAt = argv.indexOf("--json");
  if (jsonAt >= 0) writeFileSync(argv[jsonAt + 1], JSON.stringify(data));
  if (argv.includes("--issue")) {
    const r = await upsertIssue(md);
    console.log(`${r.created ? "Created" : "Updated"} issue #${r.number}`);
  } else {
    console.log(md);
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main(process.argv.slice(2)).catch((error) => {
    console.error(`export-search-console: ${error.message}`);
    process.exit(1);
  });
}
