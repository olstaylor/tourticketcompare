#!/usr/bin/env node
// Weekly scoreboard for the owner's three-month revenue plan (written
// 2026-10-10, targets to the 19 January 2027 launch). Reads two numbers per
// complete Monday-Sunday UTC week from DEMAND_DB analytics_events and sets them
// beside the plan's checkpoints and targets:
//
//   search visits       visitor-days that landed on a page from a search engine
//                       (page_view with acquisition_source = organic_search)
//   real ticket clicks  page-backed /api/out redirects (scripts/lib/human-clicks.mjs)
//
// Orders and commission are not in D1; they come from the Impact Action Listing
// CSV, so the scoreboard says so instead of estimating them.
//
// Read-only: every statement is a SELECT run through `wrangler d1 execute
// --command`. Its only write is the rolling `automation:plan-scoreboard` issue.
//
//   node scripts/report-plan-scoreboard.mjs [--weeks 6] [--local] [--issue] [--markdown <file>]
//   node scripts/report-plan-scoreboard.mjs --self-test

import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { buildD1ReadArgs } from "./lib/d1-read.mjs";
import { humanRedirectSql } from "./lib/human-clicks.mjs";
import { assertNoPersonalColumns, assertReadOnlySql, parseWranglerJson } from "./report-commercial-funnel.mjs";

const execFileAsync = promisify(execFile);
const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATABASE = "tourticketcompare-demand";
const LABEL = "automation:plan-scoreboard";
const DAY_MS = 24 * 60 * 60 * 1000;

// From the plan doc. Change these only when the owner resets the targets
// (first reset is due at the 31 Oct checkpoint, once the Impact CSV is in).
export const PLAN = Object.freeze({
  baseline: { searchVisits: 120, realClicks: 200 },
  targets: {
    low: { searchVisits: 200, realClicks: 250 },
    base: { searchVisits: 350, realClicks: 400 },
    high: { searchVisits: 600, realClicks: 700 },
  },
  checkpoints: [
    { date: "2026-10-31", label: "31 Oct", text: "Tracking live and Impact CSV in; reset targets with our own conversion rate." },
    { date: "2026-11-30", label: "30 Nov", text: "Search visits at or above 200 a week and real clicks at or above 250, or cut to the levers that moved.", floor: { searchVisits: 200, realClicks: 250 } },
    { date: "2027-01-15", label: "15 Jan (launch go/no-go)", text: "At or near base case: launch as planned. Below low case: launch quietly and keep fixing search." },
  ],
});

// Monday 00:00 UTC of the week holding `date`.
export function weekStart(date) {
  const d = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()));
  return new Date(d.getTime() - ((d.getUTCDay() + 6) % 7) * DAY_MS);
}

// The last `weeks` complete Monday-Sunday weeks before `now`.
export function completeWeeks(now, weeks) {
  const until = weekStart(now);
  const since = new Date(until.getTime() - weeks * 7 * DAY_MS);
  const starts = [];
  for (let t = since.getTime(); t < until.getTime(); t += 7 * DAY_MS) starts.push(new Date(t).toISOString().slice(0, 10));
  return { since: since.toISOString(), until: until.toISOString(), starts };
}

const WEEK_SQL = "date(substr(created_at, 1, 10), '-6 days', 'weekday 1')";

export function buildStatements({ since, until, starts = [] }) {
  const window = `created_at >= '${since}' AND created_at < '${until}'`;
  const lastStart = starts.length ? `${starts.at(-1)}T00:00:00.000Z` : since;
  const lastWeek = `created_at >= '${lastStart}' AND created_at < '${until}'`;
  const statements = [
    {
      key: "search",
      sql: `SELECT ${WEEK_SQL} AS week, COUNT(DISTINCT request_key || '|' || substr(created_at, 1, 10)) AS n FROM analytics_events WHERE event_name = 'page_view' AND acquisition_source = 'organic_search' AND request_key IS NOT NULL AND ${window} GROUP BY week`,
    },
    {
      key: "clicks",
      sql: `SELECT ${WEEK_SQL} AS week, COUNT(*) AS n FROM analytics_events WHERE ${humanRedirectSql()} AND ${window} GROUP BY week`,
    },
    // Funnel for the last complete week (owner ask 2026-10-11): which page
    // types turn visitors into ticket clickers, and which providers get the
    // clicks. provider_click is the browser beacon, so it is page-backed.
    {
      key: "funnelPages",
      sql: `SELECT COALESCE(page_type, 'other') AS page_type, COUNT(DISTINCT CASE WHEN event_name = 'page_view' THEN request_key || '|' || substr(created_at, 1, 10) END) AS visitors, COUNT(DISTINCT CASE WHEN event_name = 'provider_click' THEN request_key || '|' || substr(created_at, 1, 10) END) AS clickers, SUM(event_name = 'provider_click') AS clicks FROM analytics_events WHERE event_name IN ('page_view', 'provider_click') AND request_key IS NOT NULL AND ${lastWeek} GROUP BY 1`,
    },
    {
      key: "funnelProviders",
      sql: `SELECT COALESCE(provider, 'unknown') AS provider, COUNT(DISTINCT request_key || '|' || substr(created_at, 1, 10)) AS clickers, COUNT(*) AS clicks FROM analytics_events WHERE event_name = 'provider_click' AND request_key IS NOT NULL AND ${lastWeek} GROUP BY 1`,
    },
  ];
  for (const s of statements) {
    assertReadOnlySql(s.sql);
    assertNoPersonalColumns(s.sql);
  }
  return statements;
}

export function buildScoreboard(results, { starts }, now = new Date()) {
  const byWeek = (rows) => new Map((rows || []).map((r) => [r.week, Number(r.n) || 0]));
  const search = byWeek(results.search);
  const clicks = byWeek(results.clicks);
  const weeks = starts.map((week) => ({ week, searchVisits: search.get(week) || 0, realClicks: clicks.get(week) || 0 }));
  const today = now.toISOString().slice(0, 10);
  const next = PLAN.checkpoints.find((c) => c.date >= today) || null;
  const num = (v) => Number(v) || 0;
  const funnel = {
    pages: (results.funnelPages || []).map((r) => ({ pageType: r.page_type, visitors: num(r.visitors), clickers: num(r.clickers), clicks: num(r.clicks) }))
      .filter((r) => r.visitors || r.clicks).sort((a, b) => b.clicks - a.clicks || b.visitors - a.visitors),
    providers: (results.funnelProviders || []).map((r) => ({ provider: r.provider, clickers: num(r.clickers), clicks: num(r.clicks) }))
      .sort((a, b) => b.clicks - a.clicks),
  };
  return { generatedAt: today, weeks, latest: weeks.at(-1) || null, next, funnel };
}

function band(value, key) {
  const { low, base, high } = PLAN.targets;
  if (value >= high[key]) return "at or above high";
  if (value >= base[key]) return "between base and high";
  if (value >= low[key]) return "between low and base";
  return "below low";
}

export function renderScoreboard(board) {
  const fmt = (n) => n.toLocaleString("en-US");
  const lines = [
    "# Side hustle scoreboard",
    "",
    `Updated ${board.generatedAt}. Weekly numbers against the revenue plan's targets for the 19 January 2027 launch. Weeks run Monday to Sunday (UTC).`,
    "",
    "| Week of | Search visits | Page-backed redirects |",
    "|---|---:|---:|",
    ...board.weeks.map((w) => `| ${w.week} | ${fmt(w.searchVisits)} | ${fmt(w.realClicks)} |`),
    "",
    "| Mid-January target | Search visits | Page-backed redirects |",
    "|---|---:|---:|",
    `| Starting point (plan, Oct) | ${PLAN.baseline.searchVisits} | ${PLAN.baseline.realClicks} |`,
    ...["low", "base", "high"].map((k) => `| ${k[0].toUpperCase()}${k.slice(1)} | ${PLAN.targets[k].searchVisits} | ${PLAN.targets[k].realClicks} |`),
    "",
  ];
  if (board.latest) {
    lines.push(
      `**Last full week:** search visits ${band(board.latest.searchVisits, "searchVisits")}, page-backed redirects ${band(board.latest.realClicks, "realClicks")} of the January targets.`
    );
  }
  const floorCheck = PLAN.checkpoints.find((c) => c.floor);
  if (board.latest && floorCheck) {
    const ok = (key) => board.latest[key] >= floorCheck.floor[key];
    lines.push(
      `**${floorCheck.label} bar** (search visits ${floorCheck.floor.searchVisits}, page-backed redirects ${floorCheck.floor.realClicks}): search visits ${ok("searchVisits") ? "met" : "not yet met"}, page-backed redirects ${ok("realClicks") ? "met" : "not yet met"}.`
    );
  }
  if (board.next) lines.push(`**Next checkpoint, ${board.next.label}:** ${board.next.text}`);
  const pages = board.funnel?.pages || [];
  if (pages.length) {
    const pct = (a, b) => (b ? `${Math.round((a / b) * 100)}%` : "–");
    lines.push(
      "",
      `## Funnel, week of ${board.latest?.week || "last week"}`,
      "",
      "| Page type | View visitor-days | CTA intent visitor-days | CTA intent events |",
      "|---|---:|---:|---:|",
      ...pages.map((r) => `| ${r.pageType} | ${fmt(r.visitors)} | ${fmt(r.clickers)} | ${fmt(r.clicks)} |`)
    );
    const providers = board.funnel.providers || [];
    const total = providers.reduce((sum, r) => sum + r.clicks, 0);
    if (providers.length) {
      lines.push(
        "",
        "| Provider | CTA intent visitor-days | CTA intent events | Share of intent |",
        "|---|---:|---:|---:|",
        ...providers.map((r) => `| ${r.provider} | ${fmt(r.clickers)} | ${fmt(r.clicks)} | ${pct(r.clicks, total)} |`)
      );
    }
    lines.push("", "Views and CTA intent remain separate recorded populations. Visitor-days are not verified people. Visitor CTR and CTA-to-redirect completion rates are withheld; neither a visitor-day association nor equal counts establishes a reliable intent/receipt join.");
  }
  lines.push(
    "",
    "**Orders and commission are not counted here.** Read sourced action state, payout and currency from report:affiliate-performance or the Impact Action Listing export. Per-order attribution requires a unique eligible TTC SubId1 and a matching campaign/provider; unmatched actions remain unattributed.",
    "",
    "How the numbers are counted: search visits are visitor-days that landed on a page from a search engine. Page-backed redirects are qualified server redirect receipts associated with a browser event on the same UTC day. Browser automation can still qualify; these are not verified human clicks or purchases (see `scripts/lib/human-clicks.mjs`). Both come from the site's own analytics in D1, written by `scripts/report-plan-scoreboard.mjs`."
  );
  return lines.join("\n");
}

async function gh(method, apiPath, body) {
  const res = await fetch(`https://api.github.com/repos/${process.env.GITHUB_REPOSITORY}${apiPath}`, {
    method,
    headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`GitHub API ${method} ${apiPath} ${res.status}`);
  return res.json();
}

async function main(argv) {
  const arg = (name, fallback) => {
    const i = argv.indexOf(name);
    return i === -1 ? fallback : argv[i + 1];
  };
  const weeks = Math.max(1, Math.min(26, Number(arg("--weeks", 6)) || 6));
  const range = completeWeeks(new Date(), weeks);
  const statements = buildStatements(range);
  const args = buildD1ReadArgs({ database: DATABASE, remote: !argv.includes("--local"), statements });
  const { stdout } = await execFileAsync("npx", args, { cwd: REPO_ROOT, maxBuffer: 1024 * 1024 * 10 });
  const body = renderScoreboard(buildScoreboard(parseWranglerJson(stdout, statements), range));
  const markdownPath = arg("--markdown", "");
  if (markdownPath) writeFileSync(markdownPath, `${body}\n`);
  console.log(body);
  if (!argv.includes("--issue")) return 0;
  const open = await gh("GET", `/issues?state=open&labels=${encodeURIComponent(LABEL)}`);
  if (open[0]) await gh("PATCH", `/issues/${open[0].number}`, { body });
  else await gh("POST", "/issues", { title: "Side hustle scoreboard", body, labels: [LABEL] });
  console.log(`Scoreboard issue ${open[0] ? `#${open[0].number} updated` : "created"}.`);
  return 0;
}

function selfTest() {
  // Saturday 2026-10-17: last complete week is Mon 5 Oct - Sun 11 Oct.
  const range = completeWeeks(new Date("2026-10-17T12:00:00Z"), 2);
  assert.deepEqual(range.starts, ["2026-09-28", "2026-10-05"]);
  assert.equal(range.until, "2026-10-12T00:00:00.000Z");
  // A Monday counts as the start of its own week, not the previous one.
  assert.equal(weekStart(new Date("2026-10-12T00:30:00Z")).toISOString().slice(0, 10), "2026-10-12");

  const statements = buildStatements(range);
  assert.ok(statements[1].sql.includes("event_name = 'outbound_click'"), "clicks are page-backed redirects");
  assert.ok(statements.every((s) => s.sql.includes("created_at < '2026-10-12T00:00:00.000Z'")), "window stops at the current week");

  const board = buildScoreboard(
    { search: [{ week: "2026-10-05", n: 210 }], clicks: [{ week: "2026-10-05", n: 260 }, { week: "2026-09-28", n: 150 }] },
    range,
    new Date("2026-10-17T12:00:00Z")
  );
  assert.deepEqual(board.weeks[0], { week: "2026-09-28", searchVisits: 0, realClicks: 150 }, "missing weeks read as zero");
  assert.equal(board.next.label, "31 Oct");
  const md = renderScoreboard(board);
  assert.ok(md.includes("| 2026-10-05 | 210 | 260 |"));
  assert.ok(md.includes("search visits between low and base, page-backed redirects between low and base"));
  assert.ok(md.includes("search visits met, page-backed redirects met"));
  assert.ok(md.includes("Orders and commission are not counted here"));
  assert.deepEqual(statements.map((s) => s.key), ["search", "clicks", "funnelPages", "funnelProviders"]);
  assert.ok(statements[2].sql.includes("created_at >= '2026-10-05T00:00:00.000Z'"), "funnel covers only the last full week");
  const funnelBoard = buildScoreboard(
    { funnelPages: [{ page_type: "artist", visitors: 100, clickers: 30, clicks: 45 }, { page_type: "artist_price_guide", visitors: 40, clickers: 20, clicks: 50 }], funnelProviders: [{ provider: "stubhub-international", clickers: 30, clicks: 60 }, { provider: "vivid-seats", clickers: 10, clicks: 20 }] },
    range,
    new Date("2026-10-17T12:00:00Z")
  );
  const funnelMd = renderScoreboard(funnelBoard);
  assert.ok(funnelMd.includes("| artist_price_guide | 40 | 20 | 50 |"), "page types show separate counts without a visitor rate");
  assert.ok(!/Click rate|Real ticket clicks/.test(funnelMd), "the scoreboard cannot claim a human denominator");
  assert.ok(funnelMd.includes("rates are withheld"));
  assert.ok(funnelMd.includes("Browser automation can still qualify"));
  assert.ok(funnelMd.includes("| stubhub-international | 30 | 60 | 75% |"));
  assert.ok(!renderScoreboard(board).includes("## Funnel"), "no funnel section without funnel rows");
  assert.equal(buildScoreboard({}, range, new Date("2027-02-01T00:00:00Z")).next, null, "no checkpoint after the launch");
  console.log("[plan-scoreboard] self-test: all assertions passed");
  return 0;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const argv = process.argv.slice(2);
  Promise.resolve(argv.includes("--self-test") ? selfTest() : main(argv))
    .then((code) => process.exit(code))
    .catch((err) => {
      console.error(`report-plan-scoreboard: ${err.message}`);
      process.exit(1);
    });
}
