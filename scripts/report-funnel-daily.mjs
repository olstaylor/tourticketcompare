#!/usr/bin/env node
// Nightly funnel check (owner priority 1, 2026-10-23: make the affiliate funnel
// trustworthy). One view of the last eight complete UTC days, from visit to
// commission, with flags for the failures that have broken it before:
//
//   visitors        page_view visitor-days (all, and from search)
//   clickers        visitor-days that sent a provider_click beacon
//   real redirects  page-backed /api/out receipts (scripts/lib/human-clicks.mjs),
//                   by provider, with how many carried a Sub ID to Impact
//   orders          Impact actions by state, and how many join a TTC click ID
//   commission      approved payout only; pending is shown apart
//
// Flags, each from data the site already records (no synthetic clicks: a test
// redirect would be counted by Impact as a real click):
//   redirect_leak             most redirects have no page visit behind them, so
//                             Impact click counts are inflated (WAF not holding)
//   sub_id_gap                an Impact lane's real redirects lost their Sub ID
//   provider_redirect_missing a provider got beacons but no redirect receipts
//   no_clicks                 visitors but no real redirects at all
//   beacon_gap                many beacons never became a redirect receipt
//   no_sales                  no Impact action for 14 days
//   impact_unavailable        Impact could not be read, so sales are unknown
//   attribution_gap           orders cannot all be joined to recorded clicks
//   attribution_unavailable   orders were read but the click lookup failed
//
// Read-only: D1 SELECTs through `wrangler d1 execute --command` and GETs on
// Impact's Actions API (via report-affiliate-performance.mjs). Its only write
// is the rolling `automation:funnel-daily` issue, plus one comment when a new
// red flag appears so the owner is notified once, not nightly.
//
//   node scripts/report-funnel-daily.mjs [--days 8] [--local] [--issue] [--markdown <file>]
//   node scripts/report-funnel-daily.mjs --self-test

import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { buildD1ReadArgs } from "./lib/d1-read.mjs";
import { humanRedirectSql } from "./lib/human-clicks.mjs";
import { assertNoPersonalColumns, assertReadOnlySql, parseWranglerJson } from "./report-commercial-funnel.mjs";
import {
  buildAttributionStatements,
  fetchAllActions,
  impactCredentials,
  indexClickRows,
  matchSubIdAttribution,
  resolveCampaignProviderMap
} from "./report-affiliate-performance.mjs";

const execFileAsync = promisify(execFile);
const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATABASE = "tourticketcompare-demand";
const LABEL = "automation:funnel-daily";
const DAY_MS = 24 * 60 * 60 * 1000;
const ACTION_LOOKBACK_DAYS = 45; // Impact's per-request span limit.
export const IMPACT_LANES = ["stubhub-international", "vivid-seats", "seatgeek", "ticketnetwork", "ticket-liquidator"];

export const THRESHOLDS = Object.freeze({
  leakMinUnbacked: 50,     // ignore a handful of stray direct hits
  leakRatio: 3,            // unbacked redirects per real redirect
  subIdMinClicks: 3,
  subIdMinShare: 0.95,
  providerMinBeacons: 3,
  noClicksMinVisitors: 20,
  beaconGapMinBeacons: 10,
  beaconGapMinShare: 0.7,  // real redirects per beacon
  noSalesDays: 14
});

// The last `days` complete UTC days before `now`.
export function dayWindow(now, days) {
  const until = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const since = until - days * DAY_MS;
  const list = [];
  for (let t = since; t < until; t += DAY_MS) list.push(new Date(t).toISOString().slice(0, 10));
  return { since: new Date(since).toISOString(), until: new Date(until).toISOString(), days: list };
}

export function buildStatements({ since, until }) {
  const window = `created_at >= '${since}' AND created_at < '${until}'`;
  const day = "substr(created_at, 1, 10)";
  const statements = [
    {
      key: "daily",
      sql: `SELECT ${day} AS day, COUNT(DISTINCT CASE WHEN event_name = 'page_view' THEN request_key END) AS visitors, COUNT(DISTINCT CASE WHEN event_name = 'page_view' AND acquisition_source = 'organic_search' THEN request_key END) AS search_visitors, COUNT(DISTINCT CASE WHEN event_name = 'provider_click' THEN request_key END) AS clickers, SUM(event_name = 'provider_click') AS beacons, SUM(event_name = 'outbound_click') AS redirects FROM analytics_events WHERE event_name IN ('page_view', 'provider_click', 'outbound_click') AND request_key IS NOT NULL AND ${window} GROUP BY 1`,
    },
    {
      key: "realRedirects",
      sql: `SELECT ${day} AS day, COALESCE(NULLIF(TRIM(provider), ''), 'unknown') AS provider, COUNT(*) AS clicks, SUM(CASE WHEN impact_reconciliation_eligible = 1 THEN 1 ELSE 0 END) AS with_sub_id FROM analytics_events WHERE ${humanRedirectSql()} AND ${window} GROUP BY 1, 2`,
    },
    {
      key: "beacons",
      sql: `SELECT ${day} AS day, COALESCE(NULLIF(TRIM(provider), ''), 'unknown') AS provider, COUNT(*) AS beacons FROM analytics_events WHERE event_name = 'provider_click' AND ${window} GROUP BY 1, 2`,
    },
  ];
  for (const s of statements) {
    assertReadOnlySql(s.sql);
    assertNoPersonalColumns(s.sql);
  }
  return statements;
}

// Impact side: actions by state over the lookback, last action date, and how
// many join a retained TTC click by SubId1. Never estimated: when Impact cannot
// be read, `available` is false and the report says sales are unknown.
export function summarizeImpact(actions, matched, { error = null, configured = true, coverage = null, attributionError = null } = {}) {
  if (!configured || error) return { available: false, reason: error || "Impact credentials are not configured" };
  const states = { APPROVED: { count: 0, payout: 0 }, PENDING: { count: 0, payout: 0 }, REVERSED: { count: 0, payout: 0 }, UNKNOWN: { count: 0, payout: 0 } };
  let lastDay = null;
  const currencies = new Set();
  for (const a of actions) {
    const s = states[a.state] || states.UNKNOWN;
    s.count += 1;
    s.payout += a.payout;
    if (a.currency) currencies.add(a.currency);
    if (a.day && (!lastDay || a.day > lastDay)) lastDay = a.day;
  }
  return { available: true, total: actions.length, states, lastDay, currency: [...currencies].join("/") || null,
    coverage, attributionError, matched: attributionError ? null : matched.length,
    matchedByProvider: matched.reduce((m, o) => ({ ...m, [o.provider]: (m[o.provider] || 0) + 1 }), {}) };
}

export function buildFunnel(results, range, impact) {
  const num = (v) => Number(v) || 0;
  const days = range.days.map((d) => {
    const row = (results.daily || []).find((r) => r.day === d) || {};
    const real = (results.realRedirects || []).filter((r) => r.day === d);
    const realClicks = real.reduce((s, r) => s + num(r.clicks), 0);
    return { day: d, visitors: num(row.visitors), searchVisitors: num(row.search_visitors), clickers: num(row.clickers),
      beacons: num(row.beacons), redirects: num(row.redirects), realClicks, unbacked: Math.max(0, num(row.redirects) - realClicks) };
  });
  const last = range.days.at(-1);
  const providers = {};
  for (const r of results.realRedirects || []) {
    if (r.day !== last) continue;
    providers[r.provider] = { ...(providers[r.provider] || { beacons: 0 }), clicks: num(r.clicks), withSubId: num(r.with_sub_id) };
  }
  for (const r of results.beacons || []) {
    if (r.day !== last) continue;
    providers[r.provider] = { clicks: 0, withSubId: 0, ...(providers[r.provider] || {}), beacons: num(r.beacons) };
  }
  return { generatedAt: range.until.slice(0, 10), days, latest: days.at(-1), providers, impact };
}

export function evaluateFlags(funnel, t = THRESHOLDS) {
  const flags = [];
  const y = funnel.latest;
  const add = (id, level, text) => flags.push({ id, level, text });
  if (y.unbacked >= t.leakMinUnbacked && y.unbacked > t.leakRatio * Math.max(1, y.realClicks)) {
    add("redirect_leak", "red", `${y.unbacked} of ${y.redirects} redirects on ${y.day} had no page visit behind them. They still reach the ticket sites, so Impact counts them as clicks: the Cloudflare rule on /api/out is not holding.`);
  }
  for (const [provider, p] of Object.entries(funnel.providers)) {
    if (IMPACT_LANES.includes(provider) && p.clicks >= t.subIdMinClicks && p.withSubId / p.clicks < t.subIdMinShare) {
      add("sub_id_gap", "red", `${provider}: ${p.clicks - p.withSubId} of ${p.clicks} real redirects on ${y.day} went out without a Sub ID, so their sales cannot be tied to a page.`);
    }
    if (p.beacons >= t.providerMinBeacons && p.clicks === 0) {
      add("provider_redirect_missing", "red", `${provider}: ${p.beacons} button clicks on ${y.day} but no redirect receipt. Its links may be broken or blocked.`);
    }
  }
  if (y.visitors >= t.noClicksMinVisitors && y.realClicks === 0) {
    add("no_clicks", "red", `${y.visitors} visitors on ${y.day} and no real ticket redirect at all.`);
  }
  if (y.beacons >= t.beaconGapMinBeacons && y.realClicks < t.beaconGapMinShare * y.beacons) {
    add("beacon_gap", "amber", `${y.beacons} button clicks on ${y.day} but only ${y.realClicks} real redirects.`);
  }
  const impact = funnel.impact;
  if (!impact?.available) {
    add("impact_unavailable", "amber", `Impact could not be read (${impact?.reason || "unknown"}), so orders and commission are unknown, not zero.`);
  } else {
    if (impact.attributionError) {
      add("attribution_unavailable", "amber", "Impact orders were read, but the retained-click lookup failed. Order attribution is unknown; retry the read before diagnosing missing clicks.");
    } else if (impact.total > impact.matched) {
      add("attribution_gap", "amber", `${impact.total - impact.matched} of ${impact.total} Impact orders could not be tied to a TTC click by Sub ID. Their originating pages remain unknown; inspect the attribution breakdown below.`);
    }
    const since = impact.lastDay ? Math.round((Date.parse(funnel.generatedAt) - Date.parse(impact.lastDay)) / DAY_MS) : null;
    if (since === null || since >= t.noSalesDays) {
      add("no_sales", "amber", since === null ? `No Impact action in the last ${ACTION_LOOKBACK_DAYS} days.` : `No Impact action for ${since} days (last ${impact.lastDay}).`);
    }
  }
  return flags;
}

export function renderFunnel(funnel, flags) {
  const fmt = (n) => Number(n).toLocaleString("en-US");
  const pct = (a, b) => (b ? `${Math.round((a / b) * 100)}%` : "–");
  const red = flags.filter((f) => f.level === "red");
  const lines = [
    "# Nightly funnel check",
    "",
    `<!-- flags:${flags.map((f) => f.id).sort().join(",")} -->`,
    `Updated ${funnel.generatedAt}. Last ${funnel.days.length} complete UTC days.`,
    "",
    red.length ? `**${red.length} red flag${red.length > 1 ? "s" : ""}.**` : flags.length ? "**No red flags.**" : "**All checks passed.**",
    "",
    ...flags.map((f) => `- ${f.level === "red" ? "🔴" : "🟠"} \`${f.id}\` ${f.text}`),
    "",
    "| Day | Visitors | From search | Clickers | Real redirects | Redirects with no page visit |",
    "|---|---:|---:|---:|---:|---:|",
    ...funnel.days.map((d) => `| ${d.day} | ${fmt(d.visitors)} | ${fmt(d.searchVisitors)} | ${fmt(d.clickers)} | ${fmt(d.realClicks)} | ${fmt(d.unbacked)} |`),
    "",
    `## By provider, ${funnel.latest.day}`,
    "",
    "| Provider | Button clicks | Real redirects | With Sub ID |",
    "|---|---:|---:|---:|",
    ...Object.entries(funnel.providers).sort((a, b) => b[1].clicks - a[1].clicks)
      .map(([p, r]) => `| ${p} | ${fmt(r.beacons)} | ${fmt(r.clicks)} | ${IMPACT_LANES.includes(p) ? pct(r.withSubId, r.clicks) : "n/a"} |`),
    "",
    `## Orders and commission (Impact, last ${ACTION_LOOKBACK_DAYS} days)`,
    "",
  ];
  const impact = funnel.impact;
  if (!impact?.available) {
    lines.push(`Unknown: ${impact?.reason || "Impact was not read"}.`);
  } else {
    const s = impact.states;
    const cur = impact.currency ? ` ${impact.currency}` : "";
    lines.push(
      "| State | Orders | Payout |",
      "|---|---:|---:|",
      ...["APPROVED", "PENDING", "REVERSED", "UNKNOWN"].filter((k) => s[k].count || k !== "UNKNOWN").map((k) => `| ${k.toLowerCase()} | ${s[k].count} | ${s[k].payout.toFixed(2)}${cur} |`),
      "",
      `Last order: ${impact.lastDay || "none"}. Orders tied to a TTC click by Sub ID: ${impact.matched === null ? "unknown" : impact.matched} of ${impact.total}${impact.matched ? ` (${Object.entries(impact.matchedByProvider).map(([p, n]) => `${p} ${n}`).join(", ")})` : ""}. Only approved payout is earned.`
    );
    if (impact.attributionError) {
      lines.push("", "Attribution lookup unavailable. Order states and payouts above still come from Impact; no zero-match result is claimed.");
    } else if (impact.coverage) {
      const reasons = {
        no_sub_id: "No Sub ID returned by Impact",
        invalid_sub_id: "Sub ID does not have the TTC click-ID format",
        click_not_found: "No matching click in retained history",
        ambiguous_click_id: "Multiple receipts share the click ID",
        not_eligible: "Receipt was not recorded as reconciliation-eligible",
        campaign_unmapped: "Order campaign has no configured provider mapping",
        provider_mismatch: "Order campaign and click provider disagree"
      };
      lines.push("", "### Unmatched order breakdown", "", "| Reason | Orders |", "|---|---:|");
      for (const [key, label] of Object.entries(reasons)) {
        if (impact.coverage[key]) lines.push(`| ${label} | ${impact.coverage[key]} |`);
      }
      lines.push("", "Missing Sub IDs do not establish when tracking was enabled. A missing retained click may reflect retention or a different source; it does not prove a broken redirect. No unmatched commission is assigned to a page. Raw Sub IDs and order IDs are omitted.");
    }
  }
  lines.push(
    "",
    "How it is counted: visitors and clickers are visitor-days, not verified people. Real redirects are page-backed /api/out receipts; browser automation can still qualify. Orders, states and payout are Impact's own numbers, never estimated. Written by `scripts/report-funnel-daily.mjs`."
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

// Red flags in this run that the previous body did not carry.
export function newRedFlags(previousBody, flags) {
  const before = new Set((/<!-- flags:([^>]*) -->/.exec(previousBody || "")?.[1] || "").split(",").filter(Boolean));
  return flags.filter((f) => f.level === "red" && !before.has(f.id));
}

async function d1(statements, local) {
  const args = buildD1ReadArgs({ database: DATABASE, remote: !local, statements });
  const { stdout } = await execFileAsync("npx", args, { cwd: REPO_ROOT, maxBuffer: 1024 * 1024 * 10 });
  return parseWranglerJson(stdout, statements);
}

async function readImpact(range, local) {
  const credentials = impactCredentials({
    ...process.env,
    IMPACT_SEATGEEK_ACCOUNT_SID: process.env.IMPACT_SEATGEEK_ACCOUNT_SID || process.env.IMPACT_ACCOUNT_SID,
    IMPACT_SEATGEEK_AUTH_TOKEN: process.env.IMPACT_SEATGEEK_AUTH_TOKEN || process.env.IMPACT_AUTH_TOKEN,
  });
  if (!credentials.configured) return summarizeImpact([], [], { configured: false });
  try {
    const since = new Date(Date.parse(range.until) - ACTION_LOOKBACK_DAYS * DAY_MS).toISOString();
    const actions = await fetchAllActions(credentials, { since, until: range.until });
    const statements = buildAttributionStatements(actions);
    let rows;
    try {
      rows = statements.length ? Object.values(await d1(statements, local)).flat() : [];
    } catch {
      return summarizeImpact(actions, [], { attributionError: true });
    }
    const { matched, coverage } = matchSubIdAttribution(actions, indexClickRows(rows), resolveCampaignProviderMap());
    return summarizeImpact(actions, matched, { coverage });
  } catch (err) {
    return summarizeImpact([], [], { error: err.message });
  }
}

async function main(argv) {
  const arg = (name, fallback) => {
    const i = argv.indexOf(name);
    return i === -1 ? fallback : argv[i + 1];
  };
  const local = argv.includes("--local");
  const range = dayWindow(new Date(), Math.max(2, Math.min(31, Number(arg("--days", 8)) || 8)));
  const statements = buildStatements(range);
  const funnel = buildFunnel(await d1(statements, local), range, await readImpact(range, local));
  const flags = evaluateFlags(funnel);
  const body = renderFunnel(funnel, flags);
  const markdownPath = arg("--markdown", "");
  if (markdownPath) writeFileSync(markdownPath, `${body}\n`);
  console.log(body);
  if (!argv.includes("--issue")) return 0;
  const open = await gh("GET", `/issues?state=open&labels=${encodeURIComponent(LABEL)}`);
  const issue = open[0] || (await gh("POST", "/issues", { title: "Nightly funnel check", body, labels: [LABEL] }));
  if (open[0]) await gh("PATCH", `/issues/${issue.number}`, { body });
  const fresh = newRedFlags(open[0]?.body, flags);
  if (open[0] && fresh.length) {
    await gh("POST", `/issues/${issue.number}/comments`, { body: `New red flag${fresh.length > 1 ? "s" : ""}:\n\n${fresh.map((f) => `- \`${f.id}\` ${f.text}`).join("\n")}` });
  }
  console.log(`Funnel issue #${issue.number} ${open[0] ? "updated" : "created"}${fresh.length && open[0] ? `, ${fresh.length} new red flag(s) commented` : ""}.`);
  return 0;
}

function selfTest() {
  const range = dayWindow(new Date("2026-10-23T06:40:00Z"), 2);
  assert.deepEqual(range.days, ["2026-10-21", "2026-10-22"]);
  assert.equal(range.until, "2026-10-23T00:00:00.000Z");
  const statements = buildStatements(range);
  assert.deepEqual(statements.map((s) => s.key), ["daily", "realRedirects", "beacons"]);
  assert.ok(statements[1].sql.includes("event_name = 'outbound_click'") && statements[1].sql.includes("seen.event_name IN"), "real redirects are page-backed");
  assert.ok(statements.every((s) => s.sql.includes("created_at < '2026-10-23T00:00:00.000Z'")), "today is excluded");

  // Shaped on 22 Oct 2026: ~1,800 redirects, 33 page-backed, Sub IDs intact.
  const results = {
    daily: [{ day: "2026-10-22", visitors: 134, search_visitors: 46, clickers: 24, beacons: 37, redirects: 1802 }],
    realRedirects: [
      { day: "2026-10-22", provider: "stubhub-international", clicks: 19, with_sub_id: 19 },
      { day: "2026-10-22", provider: "ticketnetwork", clicks: 10, with_sub_id: 2 },
      { day: "2026-10-22", provider: "ticketmaster", clicks: 4, with_sub_id: 0 },
      { day: "2026-10-21", provider: "vivid-seats", clicks: 9, with_sub_id: 9 },
    ],
    beacons: [{ day: "2026-10-22", provider: "seatgeek", beacons: 4 }, { day: "2026-10-22", provider: "stubhub-international", beacons: 20 }],
  };
  const impact = summarizeImpact(
    [{ state: "PENDING", payout: 26.86, currency: "GBP", day: "2026-10-03" }, { state: "APPROVED", payout: 1.05, currency: "GBP", day: "2026-08-20" }],
    [{ provider: "vivid-seats" }]
  );
  const funnel = buildFunnel(results, range, impact);
  assert.equal(funnel.latest.realClicks, 33);
  assert.equal(funnel.latest.unbacked, 1769);
  assert.equal(funnel.days[0].visitors, 0, "a day with no rows reads as zero");
  const flags = evaluateFlags(funnel);
  const ids = flags.map((f) => f.id);
  assert.ok(ids.includes("redirect_leak"));
  assert.ok(flags.some((f) => f.id === "sub_id_gap" && f.text.startsWith("ticketnetwork")), "a lane losing its Sub ID is red");
  assert.ok(!flags.some((f) => f.id === "sub_id_gap" && f.text.startsWith("ticketmaster")), "Ticketmaster is not an Impact lane");
  assert.ok(flags.some((f) => f.id === "provider_redirect_missing" && f.text.startsWith("seatgeek")));
  assert.ok(ids.includes("no_sales"), "19 days since the last order");
  assert.ok(!ids.includes("no_clicks") && !ids.includes("beacon_gap"));

  const quiet = evaluateFlags(buildFunnel({ daily: [{ day: "2026-10-22", visitors: 50, beacons: 12, redirects: 20 }], realRedirects: [], beacons: [] }, range,
    summarizeImpact([], [], { error: "HTTP 401" })));
  assert.deepEqual(quiet.map((f) => f.id).sort(), ["beacon_gap", "impact_unavailable", "no_clicks"]);

  const md = renderFunnel(funnel, flags);
  assert.ok(md.includes("<!-- flags:attribution_gap,no_sales,provider_redirect_missing,redirect_leak,sub_id_gap -->"));
  assert.ok(md.includes("| 2026-10-22 | 134 | 46 | 24 | 33 | 1,769 |"));
  assert.ok(md.includes("| ticketmaster | 0 | 4 | n/a |"));
  assert.ok(md.includes("| pending | 1 | 26.86 GBP |"));
  assert.ok(md.includes("tied to a TTC click by Sub ID: 1 of 2 (vivid-seats 1)"));
  assert.ok(renderFunnel(funnel, quiet).length && renderFunnel({ ...funnel, impact: summarizeImpact([], [], { configured: false }) }, []).includes("Unknown: Impact credentials are not configured"));

  // Healthy click delivery must not hide unmatched recent orders. These
  // fixtures exercise the actual retained-click matcher used by the run.
  const clickId = "0123456789abcdef01234567";
  const actions = [
    { id: "private-order-a", state: "APPROVED", payout: 1.44, currency: "GBP", day: "2026-10-22", subId1: null },
    { id: "private-order-b", state: "PENDING", payout: 10, currency: "GBP", day: "2026-10-22", subId1: "legacy-value" },
    { id: "private-order-c", state: "PENDING", payout: 20, currency: "GBP", day: "2026-10-22", subId1: clickId, campaignId: "2322" }
  ];
  const matchedResult = matchSubIdAttribution(actions, indexClickRows([]), resolveCampaignProviderMap({}));
  const gapImpact = summarizeImpact(actions, matchedResult.matched, { coverage: matchedResult.coverage });
  const healthyResults = { daily: [{ day: "2026-10-22", visitors: 50, beacons: 4, redirects: 4 }],
    realRedirects: [{ day: "2026-10-22", provider: "ticketnetwork", clicks: 4, with_sub_id: 4 }], beacons: [] };
  const gapFunnel = buildFunnel(healthyResults, range, gapImpact);
  const gapFlags = evaluateFlags(gapFunnel);
  assert.deepEqual(gapFlags.map(f => f.id), ["attribution_gap"]);
  const gapMd = renderFunnel(gapFunnel, gapFlags);
  assert.ok(!gapMd.includes("All checks passed"));
  assert.ok(gapMd.includes("| No Sub ID returned by Impact | 1 |"));
  assert.ok(gapMd.includes("| Sub ID does not have the TTC click-ID format | 1 |"));
  assert.ok(gapMd.includes("| No matching click in retained history | 1 |"));
  for (const value of [clickId, "legacy-value", ...actions.map(a => a.id)]) assert.ok(!gapMd.includes(value), "identifiers stay out of the issue");

  // A D1 lookup failure preserves known sales, without claiming zero matches.
  const unavailable = buildFunnel(healthyResults, range, summarizeImpact(actions, [], { attributionError: true }));
  assert.deepEqual(evaluateFlags(unavailable).map(f => f.id), ["attribution_unavailable"]);
  const unavailableMd = renderFunnel(unavailable, evaluateFlags(unavailable));
  assert.ok(unavailableMd.includes("| approved | 1 | 1.44 GBP |"));
  assert.ok(unavailableMd.includes("by Sub ID: unknown of 3"));
  assert.ok(!unavailableMd.includes("by Sub ID: 0 of 3"));

  const matchedRow = { click_id: clickId, provider: "ticketnetwork", impact_reconciliation_eligible: 1 };
  const exact = matchSubIdAttribution([actions[2]], indexClickRows([matchedRow]), resolveCampaignProviderMap({}));
  const exactFunnel = buildFunnel(healthyResults, range, summarizeImpact([actions[2]], exact.matched, { coverage: exact.coverage }));
  assert.deepEqual(evaluateFlags(exactFunnel), []);
  assert.ok(renderFunnel(exactFunnel, []).includes("by Sub ID: 1 of 1"));
  assert.deepEqual(evaluateFlags(buildFunnel(healthyResults, range, summarizeImpact([], []))).map(f => f.id), ["no_sales"]);

  // Notify once per new red flag, not nightly.
  assert.deepEqual(newRedFlags(md, flags).map((f) => f.id), []);
  assert.deepEqual(newRedFlags("<!-- flags:redirect_leak -->", flags).map((f) => f.id).sort(), ["provider_redirect_missing", "sub_id_gap"]);
  console.log("[funnel-daily] self-test: all assertions passed");
  return 0;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const argv = process.argv.slice(2);
  Promise.resolve(argv.includes("--self-test") ? selfTest() : main(argv))
    .then((code) => process.exit(code))
    .catch((err) => {
      console.error(`report-funnel-daily: ${err.message}`);
      process.exit(1);
    });
}
