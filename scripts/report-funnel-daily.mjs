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
//   click_drop                real redirects fell far below both the previous
//                             week's median and the same weekday last week
//   search_drop               search visitors fell the same way (amber)
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
import { humanRedirectSql, suspectedBotRedirectSql } from "./lib/human-clicks.mjs";
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

// First UTC day each lane's redirects carried the click ID to Impact as Sub ID 1
// (docs/OPERATIONS.md: SeatGeek and Vivid Seats 2026-10-01; the three Impact
// marketplace lanes 2026-10-16). An order whose Impact date is BEFORE its lane's
// start cannot have a Sub ID, so it is a known pre-tracking order, not a gap.
// An order dated after the start without a Sub ID is still a gap (the click may
// predate the start), so this only excludes the certain cases.
export const SUB_ID_START = Object.freeze({
  seatgeek: "2026-10-01",
  "vivid-seats": "2026-10-01",
  "stubhub-international": "2026-10-16",
  ticketnetwork: "2026-10-16",
  "ticket-liquidator": "2026-10-16"
});

export const THRESHOLDS = Object.freeze({
  leakMinUnbacked: 50,     // ignore a handful of stray direct hits
  leakRatio: 3,            // unbacked redirects per real redirect
  subIdMinClicks: 3,
  subIdMinShare: 0.95,
  providerMinBeacons: 3,
  noClicksMinVisitors: 20,
  beaconGapMinBeacons: 10,
  beaconGapMinShare: 0.7,  // real redirects per beacon
  noSalesDays: 14,
  // Drops: the latest day against the median of the days before it AND the
  // same weekday a week earlier, so a normal quiet Sunday does not alarm.
  clickDropMinMedian: 10,
  clickDropShare: 0.3,
  searchDropMinMedian: 20,
  searchDropShare: 0.5
});

const median = (values) => {
  const sorted = [...values].sort((a, b) => a - b);
  if (!sorted.length) return 0;
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
};

// A fall below `share` of both baselines, with enough volume to mean something.
// Needs a full week of history; a shorter window never reports a drop.
export function dropAgainstBaseline(days, key, minMedian, share) {
  if (days.length < 8) return null;
  const latest = days.at(-1)[key];
  const before = days.slice(-8, -1).map((d) => d[key]);
  const typical = median(before);
  const sameWeekday = days.at(-8)[key];
  if (typical < minMedian || sameWeekday < minMedian) return null;
  return latest < share * typical && latest < share * sameWeekday ? { latest, typical, sameWeekday } : null;
}

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
      sql: `SELECT ${day} AS day, COUNT(DISTINCT CASE WHEN event_name = 'page_view' THEN request_key END) AS visitors, COUNT(DISTINCT CASE WHEN event_name = 'page_view' AND acquisition_source = 'organic_search' THEN request_key END) AS search_visitors, COUNT(DISTINCT CASE WHEN event_name = 'page_view' AND acquisition_source = 'organic_search' AND device_category = 'mobile' THEN request_key END) AS search_mobile, COUNT(DISTINCT CASE WHEN event_name = 'provider_click' THEN request_key END) AS clickers, SUM(event_name = 'provider_click') AS beacons, SUM(event_name = 'outbound_click') AS redirects, SUM(event_name = 'outbound_click' AND ${suspectedBotRedirectSql()}) AS forged FROM analytics_events WHERE event_name IN ('page_view', 'provider_click', 'outbound_click') AND request_key IS NOT NULL AND ${window} GROUP BY 1`,
    },
    {
      key: "realRedirects",
      sql: `SELECT ${day} AS day, COALESCE(NULLIF(TRIM(provider), ''), 'unknown') AS provider, COUNT(*) AS clicks, SUM(CASE WHEN impact_reconciliation_eligible = 1 THEN 1 ELSE 0 END) AS with_sub_id FROM analytics_events WHERE ${humanRedirectSql()} AND ${window} GROUP BY 1, 2`,
    },
    {
      key: "beacons",
      sql: `SELECT ${day} AS day, COALESCE(NULLIF(TRIM(provider), ''), 'unknown') AS provider, COUNT(*) AS beacons, SUM(CASE WHEN json_extract(metadata_json, '$.browserIntentId') IS NOT NULL THEN 1 ELSE 0 END) AS consented FROM analytics_events WHERE event_name = 'provider_click' AND ${window} GROUP BY 1, 2`,
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
export function summarizeImpact(actions, matched, { error = null, configured = true, coverage = null, attributionError = null, campaignToProvider = null } = {}) {
  if (!configured || error) return { available: false, reason: error || "Impact credentials are not configured" };
  const states = { APPROVED: { count: 0, payout: 0 }, PENDING: { count: 0, payout: 0 }, REVERSED: { count: 0, payout: 0 }, UNKNOWN: { count: 0, payout: 0 } };
  let lastDay = null;
  let preSubId = 0;
  const currencies = new Set();
  for (const a of actions) {
    const lane = campaignToProvider?.get(a.campaignId);
    if (!a.subId1 && a.day && lane && SUB_ID_START[lane] && a.day.slice(0, 10) < SUB_ID_START[lane]) preSubId += 1;
    const s = states[a.state] || states.UNKNOWN;
    s.count += 1;
    s.payout += a.payout;
    if (a.currency) currencies.add(a.currency);
    if (a.day && (!lastDay || a.day > lastDay)) lastDay = a.day;
  }
  return { available: true, total: actions.length, states, lastDay, currency: [...currencies].join("/") || null,
    coverage, attributionError, preSubId, matched: attributionError ? null : matched.length,
    matchedByProvider: matched.reduce((m, o) => ({ ...m, [o.provider]: (m[o.provider] || 0) + 1 }), {}) };
}

export function buildFunnel(results, range, impact) {
  const num = (v) => Number(v) || 0;
  const days = range.days.map((d) => {
    const row = (results.daily || []).find((r) => r.day === d) || {};
    const real = (results.realRedirects || []).filter((r) => r.day === d);
    const realClicks = real.reduce((s, r) => s + num(r.clicks), 0);
    // `unbacked` (all redirects without page evidence) keeps the original
    // meaning the redirect_leak flag uses. `forged` and `noEvidence` split it
    // for display: the forged-home pattern that #2376 now refuses, and the rest.
    const unbacked = Math.max(0, num(row.redirects) - realClicks);
    const forged = Math.min(num(row.forged), unbacked);
    return { day: d, visitors: num(row.visitors), searchVisitors: num(row.search_visitors), searchMobile: num(row.search_mobile), clickers: num(row.clickers),
      beacons: num(row.beacons), redirects: num(row.redirects), realClicks, unbacked, forged, noEvidence: unbacked - forged };
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
  // Whole-window reconciliation per provider: button presses against
  // page-backed redirects, and how many presses carried the consent token.
  const windowProviders = {};
  const slot = (p) => (windowProviders[p] ||= { beacons: 0, consented: 0, clicks: 0, withSubId: 0 });
  for (const r of results.realRedirects || []) {
    const w = slot(r.provider);
    w.clicks += num(r.clicks);
    w.withSubId += num(r.with_sub_id);
  }
  for (const r of results.beacons || []) {
    const w = slot(r.provider);
    w.beacons += num(r.beacons);
    w.consented += num(r.consented);
  }
  return { generatedAt: range.until.slice(0, 10), days, latest: days.at(-1), providers, windowProviders, impact };
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
  // When no_clicks already fired, a drop alert would repeat it.
  const noClicks = y.visitors >= t.noClicksMinVisitors && y.realClicks === 0;
  const clickDrop = !noClicks ? dropAgainstBaseline(funnel.days, "realClicks", t.clickDropMinMedian, t.clickDropShare) : null;
  if (clickDrop) {
    add("click_drop", "red", `${clickDrop.latest} real ticket redirects on ${y.day}, against a typical ${clickDrop.typical} a day this week and ${clickDrop.sameWeekday} on the same weekday last week. Check the price buttons and /api/out.`);
  }
  // Mobile only: 13-17 Nov 2026 a desktop-only surge of search visitor-days that
  // never clicked a seller (mobile stayed flat) inflated the baseline, so the
  // all-device count fired on the surge ending, not on lost traffic.
  const searchDrop = dropAgainstBaseline(funnel.days, "searchMobile", t.searchDropMinMedian, t.searchDropShare);
  if (searchDrop) {
    add("search_drop", "amber", `${searchDrop.latest} mobile visitors from search on ${y.day}, against a typical ${searchDrop.typical} a day this week and ${searchDrop.sameWeekday} on the same weekday last week. Check Search Console and the site-health crawl.`);
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
    } else if (impact.total - impact.matched - (impact.preSubId || 0) > 0) {
      const gap = impact.total - impact.matched - (impact.preSubId || 0);
      add("attribution_gap", "amber", `${gap} of ${impact.total} Impact orders could not be tied to a TTC click by Sub ID${impact.preSubId ? ` (not counting ${impact.preSubId} dated before Sub IDs started on that seller)` : ""}. Their originating pages remain unknown; inspect the attribution breakdown below.`);
    }
    const since = impact.lastDay ? Math.round((Date.parse(funnel.generatedAt) - Date.parse(impact.lastDay)) / DAY_MS) : null;
    if (since === null || since >= t.noSalesDays) {
      add("no_sales", "amber", since === null ? `No Impact action in the last ${ACTION_LOOKBACK_DAYS} days.` : `No Impact action for ${since} days (last ${impact.lastDay}).`);
    }
  }
  return flags;
}

function healthyFunnelShape(days) {
  return { generatedAt: days.at(-1).day, days, latest: days.at(-1), providers: {} };
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
    "| Day | Visitors | From search | Mobile from search | Clickers | Page-backed redirects | No page evidence | Forged home-page source |",
    "|---|---:|---:|---:|---:|---:|---:|---:|",
    ...funnel.days.map((d) => `| ${d.day} | ${fmt(d.visitors)} | ${fmt(d.searchVisitors)} | ${fmt(d.searchMobile)} | ${fmt(d.clickers)} | ${fmt(d.realClicks)} | ${fmt(d.noEvidence)} | ${fmt(d.forged)} |`),
    "",
    `## By provider, ${funnel.latest.day}`,
    "",
    "| Provider | Button clicks | Real redirects | With Sub ID |",
    "|---|---:|---:|---:|",
    ...Object.entries(funnel.providers).sort((a, b) => b[1].clicks - a[1].clicks)
      .map(([p, r]) => `| ${p} | ${fmt(r.beacons)} | ${fmt(r.clicks)} | ${IMPACT_LANES.includes(p) ? pct(r.withSubId, r.clicks) : "n/a"} |`),
    "",
    `## Reconciliation by provider, last ${funnel.days.length} days`,
    "",
    "| Provider | Button clicks | Page-backed redirects | Redirects vs clicks | Clicks with consent token |",
    "|---|---:|---:|---:|---:|",
    ...Object.entries(funnel.windowProviders || {}).sort((a, b) => b[1].beacons - a[1].beacons)
      .map(([p, r]) => `| ${p} | ${fmt(r.beacons)} | ${fmt(r.clicks)} | ${pct(r.clicks, r.beacons)} | ${pct(r.consented, r.beacons)} |`),
    "",
    "Redirects vs clicks near 100% means the browser-side and server-side counts agree. Far below or above is a lead, not proof: button clicks can be posted by scripts, and only visitors who accepted cookies carry the token that joins a click to its redirect. Impact's own click counts are not shown here; compare them in Impact directly.",
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
      `Last order: ${impact.lastDay || "none"}. Orders tied to a TTC click by Sub ID: ${impact.matched === null ? "unknown" : impact.matched} of ${impact.total}${impact.matched ? ` (${Object.entries(impact.matchedByProvider).map(([p, n]) => `${p} ${n}`).join(", ")})` : ""}${impact.preSubId ? `; ${impact.preSubId} dated before Sub IDs started on their seller (SeatGeek, Vivid Seats 1 Oct; StubHub Intl, TicketNetwork, Ticket Liquidator 16 Oct)` : ""}. Only approved payout is earned.`
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
    "How it is counted: visitors and clickers are visitor-days, not verified people. Page-backed redirects are /api/out receipts whose visitor also sent a page event that day (an upper bound on people: browser automation can still qualify). \"No page evidence\" redirects are unproven, not shown to be bots. \"Forged home-page source\" redirects claim to come from the home page with a button it does not render; the redirect refuses them from 20 Nov, so older days still show them. Search visitors on desktop are shown but not used for the search_drop flag (see #2376 and the 13-17 Nov desktop surge in the audit). Orders, states and payout are Impact's own numbers, never estimated. Written by `scripts/report-funnel-daily.mjs`."
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
    const campaignToProvider = resolveCampaignProviderMap();
    const { matched, coverage } = matchSubIdAttribution(actions, indexClickRows(rows), campaignToProvider);
    return summarizeImpact(actions, matched, { coverage, campaignToProvider });
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
    daily: [{ day: "2026-10-22", visitors: 134, search_visitors: 46, search_mobile: 30, clickers: 24, beacons: 37, redirects: 1802, forged: 600 }],
    realRedirects: [
      { day: "2026-10-22", provider: "stubhub-international", clicks: 19, with_sub_id: 19 },
      { day: "2026-10-22", provider: "ticketnetwork", clicks: 10, with_sub_id: 2 },
      { day: "2026-10-22", provider: "ticketmaster", clicks: 4, with_sub_id: 0 },
      { day: "2026-10-21", provider: "vivid-seats", clicks: 9, with_sub_id: 9 },
    ],
    beacons: [{ day: "2026-10-22", provider: "seatgeek", beacons: 4, consented: 1 }, { day: "2026-10-22", provider: "stubhub-international", beacons: 20, consented: 5 }],
  };
  const impact = summarizeImpact(
    [{ state: "PENDING", payout: 26.86, currency: "GBP", day: "2026-10-03" }, { state: "APPROVED", payout: 1.05, currency: "GBP", day: "2026-08-20" }],
    [{ provider: "vivid-seats" }]
  );
  const funnel = buildFunnel(results, range, impact);
  assert.equal(funnel.latest.realClicks, 33);
  assert.equal(funnel.latest.unbacked, 1769);
  assert.equal(funnel.latest.forged, 600, "forged-home redirects are split out");
  assert.deepEqual(funnel.windowProviders["stubhub-international"], { beacons: 20, consented: 5, clicks: 19, withSubId: 19 }, "window reconciliation sums per provider");
  const reconMd = renderFunnel(funnel, []);
  assert.ok(reconMd.includes("| stubhub-international | 20 | 19 | 95% | 25% |"), "reconciliation row renders");
  assert.ok(reconMd.includes("| vivid-seats | 0 | 9 | – | – |"), "no button clicks reads as a dash, not 0%");
  assert.ok(statements[2].sql.includes("browserIntentId") && !/user_agent/.test(statements[2].sql), "consent share reads no user agent");
  assert.equal(funnel.latest.noEvidence, 1169, "the rest of the unbacked redirects have no page evidence");
  assert.equal(funnel.latest.forged + funnel.latest.noEvidence, funnel.latest.unbacked, "the split adds back to the unbacked total");
  assert.ok(statements[0].sql.includes("suspected") === false && statements[0].sql.includes("source_path"), "daily statement counts forged-home redirects");
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
  assert.ok(md.includes("| 2026-10-22 | 134 | 46 | 30 | 24 | 33 | 1,169 | 600 |"));
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

  // Sharp falls against a full week, never against a short window or low volume.
  const week = (clicks, search) => clicks.map((c, i) => ({ realClicks: c, searchVisitors: search[i] }));
  assert.deepEqual(dropAgainstBaseline(week([20, 22, 18, 25, 21, 19, 23, 4], [60, 55, 58, 62, 50, 57, 61, 20]), "realClicks", 10, 0.3), { latest: 4, typical: 21, sameWeekday: 20 });
  assert.ok(dropAgainstBaseline(week([20, 22, 18, 25, 21, 19, 23, 4], [60, 55, 58, 62, 50, 57, 61, 20]), "searchVisitors", 20, 0.5), "search falling by two thirds is a drop");
  assert.equal(dropAgainstBaseline(week([20, 22, 18, 25, 21, 19, 23, 9], []), "realClicks", 10, 0.3), null, "a 57% day is not a drop");
  assert.equal(dropAgainstBaseline(week([5, 22, 18, 25, 21, 19, 23, 4], []), "realClicks", 10, 0.3), null, "same weekday last week was also quiet");
  assert.equal(dropAgainstBaseline(week([3, 4, 2, 5, 3, 4, 3, 0], []), "realClicks", 10, 0.3), null, "too little volume to call");
  assert.equal(dropAgainstBaseline(week([20, 22, 4], []), "realClicks", 10, 0.3), null, "a short window never reports");
  assert.ok(dropAgainstBaseline(week([...Array(23).fill(1), 100, 100, 100, 100, 100, 100, 100, 10], []), "realClicks", 10, 0.3), "a longer report window does not dilute the 7-day baseline");
  const dropDays = [20, 22, 18, 25, 21, 19, 23, 4].map((c, i) => ({ day: `2026-10-${15 + i}`, visitors: 200, searchVisitors: 60, searchMobile: 60, clickers: 20, beacons: c, redirects: c, realClicks: c, unbacked: 0 }));
  const dropFlags = evaluateFlags({ ...healthyFunnelShape(dropDays), impact: summarizeImpact([{ state: "PENDING", payout: 1, currency: "GBP", day: "2026-10-22" }], [{ provider: "vivid-seats" }]) });
  assert.deepEqual(dropFlags.map((f) => f.id), ["click_drop"], "a sharp fall is red, nothing else fires");
  const outageDays = dropDays.map((d, i) => (i === 7 ? { ...d, visitors: 0, searchVisitors: 0, beacons: 0, redirects: 0, realClicks: 0 } : d));
  const outageFlags = evaluateFlags({ ...healthyFunnelShape(outageDays), impact: summarizeImpact([{ state: "PENDING", payout: 1, currency: "GBP", day: "2026-10-22" }], [{ provider: "vivid-seats" }]) });
  assert.ok(outageFlags.some((f) => f.id === "click_drop"), "a zero day with too few visitors for no_clicks still raises click_drop");

  // 13-17 Nov 2026 shape: an all-device search surge (desktop, never clicked) that ends
  // must not read as a search drop while mobile search visitors are steady.
  const surge = [75, 70, 80, 85, 460, 430, 470, 60].map((all, i) => ({ day: `2026-11-${13 + i}`, visitors: 300, searchVisitors: all, searchMobile: 70, clickers: 40, beacons: 40, redirects: 40, realClicks: 40, unbacked: 0, forged: 0, noEvidence: 0 }));
  const surgeFlags = evaluateFlags({ ...healthyFunnelShape(surge), impact: summarizeImpact([{ state: "PENDING", payout: 1, currency: "GBP", day: "2026-11-20" }], [{ provider: "vivid-seats" }]) });
  assert.ok(!surgeFlags.some((f) => f.id === "search_drop"), "an ended desktop surge is not a search drop");
  const realFall = surge.map((d, i) => (i === 7 ? { ...d, searchMobile: 10 } : d));
  assert.ok(evaluateFlags({ ...healthyFunnelShape(realFall), impact: summarizeImpact([{ state: "PENDING", payout: 1, currency: "GBP", day: "2026-11-20" }], [{ provider: "vivid-seats" }]) }).some((f) => f.id === "search_drop" && f.text.includes("mobile")), "a real mobile fall still flags");

  // Orders dated before Sub IDs started on their seller are not an attribution gap.
  const lanes = new Map([["24092", "stubhub-international"], ["20501", "seatgeek"]]);
  const pre = [
    { id: "a", state: "APPROVED", payout: 121.73, currency: "GBP", day: "2026-10-11", subId1: null, campaignId: "24092" },
    { id: "b", state: "APPROVED", payout: 4.56, currency: "GBP", day: "2026-10-07", subId1: null, campaignId: "24092" },
    { id: "c", state: "PENDING", payout: 7, currency: "GBP", day: "2026-10-20", subId1: null, campaignId: "24092" }
  ];
  const preImpact = summarizeImpact(pre, [], { coverage: {}, campaignToProvider: lanes });
  assert.equal(preImpact.preSubId, 2, "only orders before the lane's start date");
  const preFlags = evaluateFlags(buildFunnel(healthyResults, range, preImpact));
  assert.ok(preFlags.some((f) => f.id === "attribution_gap" && f.text.startsWith("1 of 3") && f.text.includes("2 dated before")), "a later order without a Sub ID still flags");
  const allPre = summarizeImpact(pre.slice(0, 2), [], { coverage: {}, campaignToProvider: lanes });
  assert.ok(!evaluateFlags(buildFunnel(healthyResults, range, allPre)).some((f) => f.id === "attribution_gap"), "known pre-tracking orders alone raise nothing");
  assert.ok(renderFunnel(buildFunnel(healthyResults, range, allPre), []).includes("2 dated before Sub IDs started"));
  assert.equal(summarizeImpact(pre, [], { coverage: {} }).preSubId, 0, "without a campaign map nothing is excluded");

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
