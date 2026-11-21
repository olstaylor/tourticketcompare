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
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { buildD1ReadArgs } from "./lib/d1-read.mjs";
import { humanRedirectSql, suspectedBotRedirectSql } from "./lib/human-clicks.mjs";
import { eventLifecycleHeld } from "../functions/_route-indexability.js";
import { fetchAllActions, impactCredentials, resolveCampaignProviderMap } from "./report-affiliate-performance.mjs";
import { summarizeImpact } from "./report-funnel-daily.mjs";
import { assertNoPersonalColumns, assertReadOnlySql, parseWranglerJson } from "./report-commercial-funnel.mjs";

const execFileAsync = promisify(execFile);
const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATABASE = "tourticketcompare-demand";
const LABEL = "automation:plan-scoreboard";
const DAY_MS = 24 * 60 * 60 * 1000;
const IMPACT_PROVIDERS = ["stubhub-international", "vivid-seats", "seatgeek", "ticketnetwork", "ticket-liquidator"];

// Scheduled workflows tied to links, prices, provider syncs and audits. A
// failed run of one of these can change what a visitor sees or what we earn.
export const COMMERCIAL_WORKFLOWS = [
  "seatgeek-cta-sync.yml", "vividseats-cta-sync.yml", "seatgeek-price-snapshots.yml", "vividseats-price-snapshots.yml",
  "impact-marketplace-price-snapshots.yml", "impact-marketplace-provider-sync.yml", "price-freshness-check.yml",
  "nightly-data-sync.yml", "daily-audit.yml", "tm-new-shows-pr.yml", "funnel-daily.yml"
];

// Sellers the repo has a verified URL for, per upcoming show (Ticketmaster is
// an unmonetised link source and is not counted as a seller).
export function nearTermCoverage(events, now = new Date(), days = 14) {
  const from = now.toISOString().slice(0, 10);
  const to = new Date(now.getTime() + days * DAY_MS).toISOString().slice(0, 10);
  let shows = 0, none = 0, one = 0;
  for (const e of events || []) {
    const day = (e.datetime_iso || "").slice(0, 10);
    // Cancelled and postponed shows keep their lifecycle in ticketmaster_status_code; their links are withheld everywhere.
    if (!day || day < from || day > to || eventLifecycleHeld(e)) continue;
    const sellers = Object.entries(e.provider_links || {}).filter(([k, v]) => k !== "ticketmaster" && v && v.verified && v.url).length;
    shows += 1;
    if (sellers === 0) none += 1;
    else if (sellers === 1) one += 1;
  }
  return { shows, none, one };
}

// Failed scheduled runs per commercial workflow over the lookback.
export function summarizeFailures(runs, workflows = COMMERCIAL_WORKFLOWS) {
  const byFlow = new Map();
  for (const r of runs || []) {
    const file = String(r.path || "").split("/").pop();
    if (!workflows.includes(file) || r.conclusion !== "failure") continue;
    const cur = byFlow.get(file) || { workflow: file, failures: 0, last: "" };
    cur.failures += 1;
    if (String(r.created_at) > cur.last) cur.last = String(r.created_at);
    byFlow.set(file, cur);
  }
  return [...byFlow.values()].sort((a, b) => b.failures - a.failures || a.workflow.localeCompare(b.workflow));
}

// Opportunities come from fixed rules, not generated prose. Each states its evidence.
export function buildOpportunities({ coverage, today }) {
  const list = [];
  if (coverage && coverage.shows) {
    const weak = coverage.none + coverage.one;
    list.push({ title: `Add verified sellers to ${weak} of ${coverage.shows} shows in the next 14 days (${coverage.none} with none, ${coverage.one} with one)`, impact: "High", confidence: "Medium", effort: "Low to medium", note: "Orders cluster close to the show date; uses existing sync lanes only." });
  }
  if (today < "2026-12-04") list.push({ title: "Seller-order test readout on 4 Dec", impact: "Medium", confidence: "Medium", effort: "Small", note: "Tests whether seller position changes clicks; no revenue verdict before then." });
  if (today < "2026-12-02") list.push({ title: "One Search Console pages-by-date pull after 1 Dec", impact: "High", confidence: "High that it is needed", effort: "Small", note: "Shows what drove the mid-November search change and whether it holds; pulls resume 1 Dec." });
  return list;
}

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

// The slug in /artists/<slug>[/...][?...].
const ARTIST_SLUG_SQL = "CASE WHEN instr(substr(source_path, 10), '/') > 0 THEN substr(source_path, 10, instr(substr(source_path, 10), '/') - 1) WHEN instr(substr(source_path, 10), '?') > 0 THEN substr(source_path, 10, instr(substr(source_path, 10), '?') - 1) ELSE substr(source_path, 10) END";
const WEEK_SQL = "date(substr(created_at, 1, 10), '-6 days', 'weekday 1')";

export function buildStatements({ since, until, starts = [] }) {
  const window = `created_at >= '${since}' AND created_at < '${until}'`;
  const lastStart = starts.length ? `${starts.at(-1)}T00:00:00.000Z` : since;
  const lastWeek = `created_at >= '${lastStart}' AND created_at < '${until}'`;
  const prevStart = starts.length > 1 ? `${starts.at(-2)}T00:00:00.000Z` : lastStart;
  const prevWeeks = `created_at >= '${prevStart}' AND created_at < '${until}'`;
  const statements = [
    {
      key: "search",
      sql: `SELECT ${WEEK_SQL} AS week, COUNT(DISTINCT request_key || '|' || substr(created_at, 1, 10)) AS n FROM analytics_events WHERE event_name = 'page_view' AND acquisition_source = 'organic_search' AND request_key IS NOT NULL AND ${window} GROUP BY week`,
    },
    // Mobile search visits: the qualified-traffic column. On 13-17 Nov 2026 a
    // desktop-only surge of search visitor-days (never clicked a seller) lifted
    // the all-device count, so the plan's search target is shown beside it.
    {
      key: "searchMobile",
      sql: `SELECT ${WEEK_SQL} AS week, COUNT(DISTINCT request_key || '|' || substr(created_at, 1, 10)) AS n FROM analytics_events WHERE event_name = 'page_view' AND acquisition_source = 'organic_search' AND device_category = 'mobile' AND request_key IS NOT NULL AND ${window} GROUP BY week`,
    },
    // All redirects and the forged home-page pattern, so each week shows what
    // was counted, what was excluded as forged, and what has no page evidence.
    {
      key: "redirects",
      sql: `SELECT ${WEEK_SQL} AS week, COUNT(*) AS n, SUM(CASE WHEN ${suspectedBotRedirectSql()} THEN 1 ELSE 0 END) AS forged FROM analytics_events WHERE event_name = 'outbound_click' AND ${window} GROUP BY week`,
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
    // Page-backed redirects by provider for the last two weeks, with how many
    // carried a Sub ID to Impact (impact_reconciliation_eligible).
    {
      key: "redirectProviders",
      sql: `SELECT ${WEEK_SQL} AS week, COALESCE(NULLIF(TRIM(provider), ''), 'unknown') AS provider, COUNT(*) AS n, SUM(CASE WHEN impact_reconciliation_eligible = 1 THEN 1 ELSE 0 END) AS with_sub_id FROM analytics_events WHERE ${humanRedirectSql()} AND ${prevWeeks} GROUP BY week, provider`,
    },
    // Top pages by mobile search visitor-days in the last week (path only, no query string).
    {
      key: "landing",
      sql: `SELECT CASE WHEN instr(source_path, '?') > 0 THEN substr(source_path, 1, instr(source_path, '?') - 1) ELSE source_path END AS path, COUNT(DISTINCT request_key || '|' || substr(created_at, 1, 10)) AS n FROM analytics_events WHERE event_name = 'page_view' AND acquisition_source = 'organic_search' AND device_category = 'mobile' AND request_key IS NOT NULL AND source_path IS NOT NULL AND ${lastWeek} GROUP BY 1 ORDER BY n DESC, path LIMIT 10`,
    },
    // Artist-page traffic by slug for the last week, so each auto-promotion batch
    // can be followed to search visitors and page-backed seller clicks.
    {
      key: "artistVisitors",
      sql: `SELECT ${ARTIST_SLUG_SQL} AS slug, COUNT(DISTINCT request_key || '|' || substr(created_at, 1, 10)) AS visitors FROM analytics_events WHERE event_name = 'page_view' AND acquisition_source = 'organic_search' AND request_key IS NOT NULL AND source_path LIKE '/artists/%' AND ${lastWeek} GROUP BY 1`,
    },
    {
      key: "artistClicks",
      sql: `SELECT ${ARTIST_SLUG_SQL} AS slug, COUNT(*) AS clicks FROM analytics_events WHERE ${humanRedirectSql()} AND source_path LIKE '/artists/%' AND ${lastWeek} GROUP BY 1`,
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

// New tours by batch: artists the daily auto-promotion added (promotion_source
// "auto", auto_promoted_at), grouped by the Monday of the promotion week and
// followed through to upcoming shows on the site, search visitors and
// page-backed seller clicks on their /artists/<slug> pages in the last week.
// Indexing, Google clicks and attributed orders are not in the repo or D1, so
// they are reported as unavailable instead of estimated.
function mergeArtistTraffic(visitors, clicks) {
  const map = new Map();
  for (const r of visitors || []) map.set(r.slug, { slug: r.slug, visitors: Number(r.visitors) || 0, clicks: 0 });
  for (const r of clicks || []) map.set(r.slug, { slug: r.slug, visitors: map.get(r.slug)?.visitors || 0, clicks: Number(r.clicks) || 0 });
  return [...map.values()];
}

export function buildBatches(artists, events, traffic, now = new Date(), limit = 6) {
  const today = now.toISOString().slice(0, 10);
  const upcoming = new Map();
  for (const e of events || []) {
    if (!e.artist_slug || !e.datetime_iso || e.datetime_iso.slice(0, 10) < today) continue;
    if (eventLifecycleHeld(e)) continue;
    upcoming.set(e.artist_slug, (upcoming.get(e.artist_slug) || 0) + 1);
  }
  const bySlug = new Map((traffic || []).map((r) => [r.slug, r]));
  const groups = new Map();
  for (const a of artists || []) {
    if (a.promotion_source !== "auto" || !a.auto_promoted_at) continue;
    const week = weekStart(new Date(`${a.auto_promoted_at}T00:00:00Z`)).toISOString().slice(0, 10);
    const g = groups.get(week) || { week, artists: 0, withShows: 0, shows: 0, visitors: 0, clicks: 0 };
    const shows = upcoming.get(a.slug) || 0;
    const t = bySlug.get(a.slug);
    g.artists += 1;
    g.withShows += shows ? 1 : 0;
    g.shows += shows;
    g.visitors += Number(t?.visitors) || 0;
    g.clicks += Number(t?.clicks) || 0;
    groups.set(week, g);
  }
  return [...groups.values()].sort((a, b) => b.week.localeCompare(a.week)).slice(0, limit);
}

export function buildScoreboard(results, { starts }, now = new Date(), catalog = null, extras = {}) {
  const byWeek = (rows) => new Map((rows || []).map((r) => [r.week, Number(r.n) || 0]));
  const search = byWeek(results.search);
  const clicks = byWeek(results.clicks);
  const searchMobile = byWeek(results.searchMobile);
  const redirectRows = new Map((results.redirects || []).map((r) => [r.week, { total: Number(r.n) || 0, forged: Number(r.forged) || 0 }]));
  const weeks = starts.map((week) => {
    const realClicks = clicks.get(week) || 0;
    const { total = 0, forged = 0 } = redirectRows.get(week) || {};
    return { week, searchVisits: search.get(week) || 0, mobileSearchVisits: searchMobile.get(week) || 0, realClicks,
      forgedRedirects: forged, noEvidenceRedirects: Math.max(0, total - realClicks - forged) };
  });
  const today = now.toISOString().slice(0, 10);
  const next = PLAN.checkpoints.find((c) => c.date >= today) || null;
  const num = (v) => Number(v) || 0;
  const funnel = {
    pages: (results.funnelPages || []).map((r) => ({ pageType: r.page_type, visitors: num(r.visitors), clickers: num(r.clickers), clicks: num(r.clicks) }))
      .filter((r) => r.visitors || r.clicks).sort((a, b) => b.clicks - a.clicks || b.visitors - a.visitors),
    providers: (results.funnelProviders || []).map((r) => ({ provider: r.provider, clickers: num(r.clickers), clicks: num(r.clicks) }))
      .sort((a, b) => b.clicks - a.clicks),
  };
  const lastWeekStart = starts.at(-1);
  const providerRows = (results.redirectProviders || []).map((r) => ({ week: r.week, provider: r.provider, n: num(r.n), withSubId: num(r.with_sub_id) }));
  const providerNames = [...new Set(providerRows.map((r) => r.provider))];
  const providerWeeks = providerNames.map((provider) => {
    const pick = (week) => providerRows.find((r) => r.week === week && r.provider === provider);
    return { provider, previous: pick(starts.at(-2))?.n || 0, last: pick(lastWeekStart)?.n || 0, lastWithSubId: pick(lastWeekStart)?.withSubId || 0 };
  }).sort((a, b) => b.last - a.last || b.previous - a.previous);
  const landing = (results.landing || []).map((r) => ({ path: r.path, visits: num(r.n) }));
  const batches = catalog ? buildBatches(catalog.artists, catalog.events, mergeArtistTraffic(results.artistVisitors, results.artistClicks), now) : [];
  const coverage = catalog ? nearTermCoverage(catalog.events, now) : null;
  const opportunities = catalog ? buildOpportunities({ coverage, today }) : [];
  return { generatedAt: today, weeks, latest: weeks.at(-1) || null, previous: weeks.length > 1 ? weeks.at(-2) : null, next, funnel, providerWeeks, landing, batches,
    impact: extras.impact || null, failures: extras.failures === undefined ? null : extras.failures, opportunities };
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
    "| Week of | Search visits (all devices) | Mobile search visits | Page-backed redirects (counted) | Forged home-page source (excluded) | No page evidence (excluded, unproven) |",
    "|---|---:|---:|---:|---:|---:|",
    ...board.weeks.map((w) => `| ${w.week} | ${fmt(w.searchVisits)} | ${fmt(w.mobileSearchVisits)} | ${fmt(w.realClicks)} | ${fmt(w.forgedRedirects)} | ${fmt(w.noEvidenceRedirects)} |`),
    "",
    "| Original plan target | Search visits | Plan realClicks (basis unverified) |",
    "|---|---:|---:|",
    `| Starting point (plan, Oct) | ${PLAN.baseline.searchVisits} | ${PLAN.baseline.realClicks} |`,
    ...["low", "base", "high"].map((k) => `| ${k[0].toUpperCase()}${k.slice(1)} | ${PLAN.targets[k].searchVisits} | ${PLAN.targets[k].realClicks} |`),
    "",
  ];
  if (board.latest) {
    lines.push(
      `**Last full week:** search visits ${band(board.latest.searchVisits, "searchVisits")}, redirect target comparison withheld until the owner recalibrates its basis.`
    );
  }
  const floorCheck = PLAN.checkpoints.find((c) => c.floor);
  if (board.latest && floorCheck) {
    const ok = (key) => board.latest[key] >= floorCheck.floor[key];
    lines.push(
      `**${floorCheck.label} bar** (search visits ${floorCheck.floor.searchVisits}, plan realClicks ${floorCheck.floor.realClicks}): search visits ${ok("searchVisits") ? "met" : "not yet met"}; redirect verdict withheld.`
    );
  }
  if (board.next) {
    const checkpointText = board.next.floor
      ? `Search visits at or above ${board.next.floor.searchVisits} a week; redirect checkpoint withheld until the owner recalibrates its basis.`
      : board.next.text;
    lines.push(`**Next checkpoint, ${board.next.label}:** ${checkpointText}`);
  }
  lines.push(
    "",
    "**Read the mobile column, not the all-device count, for growth.** The plan's search target was set on all devices. A desktop-only surge in mid-November (event and artist-city pages, almost no seller clicks) inflated it, so the target comparison above can overstate real demand. Mobile is the qualified-traffic proxy here, not proof of buyers."
  );
  if (board.latest && board.previous) {
    const move = (label, a, b) => {
      const small = a < 100 || b < 100 ? " (small numbers)" : "";
      const change = a ? `${b >= a ? "+" : ""}${Math.round(((b - a) / a) * 100)}%` : "n/a";
      return `${label}: ${fmt(a)} to ${fmt(b)}, ${change}${small}`;
    };
    lines.push(
      "",
      `**Week on week (${board.previous.week} to ${board.latest.week}, same definitions, both complete weeks):** ${move("mobile search visits", board.previous.mobileSearchVisits, board.latest.mobileSearchVisits)}; ${move("page-backed redirects", board.previous.realClicks, board.latest.realClicks)}.`
    );
  }
  const providerWeeks = board.providerWeeks || [];
  if (providerWeeks.length && board.latest) {
    const pctSub = (a, b) => (b ? `${Math.round((a / b) * 100)}%` : "–");
    lines.push(
      "",
      `## Page-backed redirects by provider (weeks of ${board.previous?.week || "n/a"} and ${board.latest.week})`,
      "",
      "| Provider | Previous week | Last week | Last week with Sub ID |",
      "|---|---:|---:|---:|",
      ...providerWeeks.map((r) => `| ${r.provider} | ${fmt(r.previous)} | ${fmt(r.last)} | ${IMPACT_PROVIDERS.includes(r.provider) ? pctSub(r.lastWithSubId, r.last) : "n/a"} |`),
      "",
      "Sub ID share applies to the five Impact-tracked lanes; Ticketmaster is an unmonetised link. Orders per provider are not dated here (see the nightly funnel check issue)."
    );
  }
  const landing = board.landing || [];
  if (landing.length) {
    lines.push(
      "",
      `## Top pages by mobile search visitor-days, week of ${board.latest?.week || "last week"}`,
      "",
      "| Page | Mobile search visitor-days |",
      "|---|---:|",
      ...landing.map((r) => `| ${r.path} | ${fmt(r.visits)} |`)
    );
  }
  const batches = board.batches || [];
  if (batches.length) {
    lines.push(
      "",
      `## New tours by batch (auto-promoted artists, activity in the week of ${board.latest?.week || "last week"})`,
      "",
      "| Promoted week | Artists | With upcoming shows | Upcoming shows | Search visitor-days (artist pages) | Page-backed seller clicks |",
      "|---|---:|---:|---:|---:|---:|",
      ...batches.map((b) => `| ${b.week} | ${fmt(b.artists)} | ${fmt(b.withShows)} | ${fmt(b.shows)} | ${fmt(b.visitors)} | ${fmt(b.clicks)} |`),
      "",
      "Upcoming shows are on the site now, not necessarily indexed. Traffic counts the artists' own pages (`/artists/<slug>` and its ticket, price and presale pages) for one week, so older batches have had longer to earn it. Indexed pages, Google clicks and attributed orders by batch are not available yet (Search Console pulls resume 1 Dec; Impact orders join by Sub ID in the nightly funnel check)."
    );
  }
  const impact = board.impact;
  if (impact) {
    lines.push("", "## Impact actions, last 45 days (by action date)", "");
    if (!impact.available) {
      lines.push(`Unknown: ${impact.reason}. Sales are not read this week; check Impact directly.`);
    } else {
      const money = (n) => `${impact.currency || ""} ${Number(n).toFixed(2)}`.trim();
      lines.push(
        "| State | Actions | Action earnings |",
        "|---|---:|---:|",
        ...["APPROVED", "PENDING", "REVERSED"].map((k) => `| ${k.toLowerCase()} | ${fmt(impact.states[k].count)} | ${money(impact.states[k].payout)} |`),
        "",
        `Last action date: ${impact.lastDay ? impact.lastDay.slice(0, 10) : "none in window"}.${impact.preSubId ? ` ${impact.preSubId} actions are dated before Sub IDs started on their seller and cannot be tied to a page.` : ""} "Approved" is Impact's lock state, not money paid.`
      );
    }
    lines.push("", "Paid and invoiced amounts: not available in this report (this script reads Impact actions only). Read Invoices in Impact.");
  }
  if (board.failures !== null && board.failures !== undefined) {
    lines.push("", "## Failed scheduled runs, last 7 days (link, price, sync and audit workflows; schedule-triggered only)", "");
    if (board.failures === "unavailable") lines.push("Unknown: the run list could not be read.");
    else if (!board.failures.length) lines.push("None.");
    else lines.push("| Workflow | Failed runs | Latest failure (UTC) |", "|---|---:|---|", ...board.failures.map((f) => `| ${f.workflow} | ${fmt(f.failures)} | ${f.last.slice(0, 16).replace("T", " ")} |`));
  }
  const opps = board.opportunities || [];
  if (opps.length) {
    lines.push("", "## Opportunities (fixed rules, with evidence)", "", "| # | Opportunity | Impact | Confidence | Effort |", "|---:|---|---|---|---|",
      ...opps.map((o, i) => `| ${i + 1} | ${o.title}. ${o.note} | ${o.impact} | ${o.confidence} | ${o.effort} |`));
  }
  lines.push(
    "",
    "**Not available in this report:** Search Console impressions, Google clicks and queries (the export is paused and the connector is read on request), and any per-order date or lock status from Impact."
  );
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

const ACTION_LOOKBACK_DAYS = 45; // Impact's per-request span limit.

// Impact actions by state. Read-only; never estimated. Any failure reads as unknown.
async function readImpact(range) {
  const credentials = impactCredentials({
    ...process.env,
    IMPACT_SEATGEEK_ACCOUNT_SID: process.env.IMPACT_SEATGEEK_ACCOUNT_SID || process.env.IMPACT_ACCOUNT_SID,
    IMPACT_SEATGEEK_AUTH_TOKEN: process.env.IMPACT_SEATGEEK_AUTH_TOKEN || process.env.IMPACT_AUTH_TOKEN,
  });
  if (!credentials.configured) return summarizeImpact([], [], { configured: false });
  try {
    const since = new Date(Date.parse(range.until) - ACTION_LOOKBACK_DAYS * DAY_MS).toISOString();
    const actions = await fetchAllActions(credentials, { since, until: range.until });
    return summarizeImpact(actions, [], { attributionError: true, campaignToProvider: resolveCampaignProviderMap() });
  } catch (err) {
    return summarizeImpact([], [], { error: err.message });
  }
}

async function readFailures() {
  try {
    const since = new Date(Date.now() - 7 * DAY_MS).toISOString().slice(0, 10);
    // Scheduled runs only (manual and preview runs are not production failures),
    // following pagination so a busy first page cannot hide commercial failures.
    const runs = [];
    for (let page = 1; page <= 10; page += 1) {
      const data = await gh("GET", `/actions/runs?status=failure&event=schedule&per_page=100&page=${page}&created=%3E%3D${since}`);
      runs.push(...data.workflow_runs);
      if (data.workflow_runs.length < 100) return summarizeFailures(runs);
    }
    return "unavailable"; // more than 1,000 failures: incomplete, so say so rather than print partial counts
  } catch {
    return "unavailable";
  }
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
  const readJson = (file) => JSON.parse(readFileSync(path.join(REPO_ROOT, "public", "data", file), "utf8"));
  const artistsFile = readJson("artists.json");
  const eventsFile = readJson("events.json");
  const catalog = { artists: Array.isArray(artistsFile) ? artistsFile : artistsFile.artists, events: Array.isArray(eventsFile) ? eventsFile : eventsFile.events };
  const extras = { impact: await readImpact(range), failures: await readFailures() };
  const body = renderScoreboard(buildScoreboard(parseWranglerJson(stdout, statements), range, new Date(), catalog, extras));
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
  assert.ok(statements.find((x) => x.key === "clicks").sql.includes("seen.event_name IN"), "clicks are page-backed redirects");
  assert.ok(statements.every((s) => s.sql.includes("created_at < '2026-10-12T00:00:00.000Z'")), "window stops at the current week");

  const board = buildScoreboard(
    { search: [{ week: "2026-10-05", n: 210 }], clicks: [{ week: "2026-10-05", n: 260 }, { week: "2026-09-28", n: 150 }] },
    range,
    new Date("2026-10-17T12:00:00Z")
  );
  assert.deepEqual(board.weeks[0], { week: "2026-09-28", searchVisits: 0, mobileSearchVisits: 0, realClicks: 150, forgedRedirects: 0, noEvidenceRedirects: 0 }, "missing weeks read as zero");
  assert.equal(board.next.label, "31 Oct");
  const md = renderScoreboard(board);
  assert.ok(md.includes("| 2026-10-05 | 210 | 0 | 260 | 0 | 0 |"));
  assert.ok(md.includes("search visits between low and base, redirect target comparison withheld"));
  assert.ok(md.includes("search visits met; redirect verdict withheld"));
  assert.ok(md.includes("Orders and commission are not counted here"));
  const november = renderScoreboard({ ...board, next: PLAN.checkpoints.find((c) => c.floor) });
  assert.ok(november.includes("redirect checkpoint withheld"));
  assert.ok(!november.includes("real clicks at or above 250"));
  assert.deepEqual(statements.map((s) => s.key), ["search", "searchMobile", "redirects", "clicks", "funnelPages", "redirectProviders", "landing", "artistVisitors", "artistClicks", "funnelProviders"]);
  const sqlOf = (key) => statements.find((s) => s.key === key).sql;
  assert.ok(sqlOf("funnelPages").includes("created_at >= '2026-10-05T00:00:00.000Z'"), "funnel covers only the last full week");
  assert.ok(sqlOf("landing").includes("created_at >= '2026-10-05T00:00:00.000Z'") && sqlOf("landing").includes("device_category = 'mobile'"), "landing pages are mobile search, last week only");
  assert.ok(sqlOf("redirectProviders").includes("created_at >= '2026-09-28T00:00:00.000Z'"), "provider table covers the last two weeks");
  assert.ok(sqlOf("searchMobile").includes("device_category = 'mobile'"));
  assert.ok(sqlOf("redirects").includes("source_path"), "forged home-page redirects are counted");

  // Week-on-week, provider, landing and excluded-redirect sections.
  const rich = buildScoreboard({
    search: [{ week: "2026-09-28", n: 700 }, { week: "2026-10-05", n: 1900 }],
    searchMobile: [{ week: "2026-09-28", n: 90 }, { week: "2026-10-05", n: 260 }],
    redirects: [{ week: "2026-09-28", n: 900, forged: 2 }, { week: "2026-10-05", n: 1300, forged: 450 }],
    clicks: [{ week: "2026-09-28", n: 380 }, { week: "2026-10-05", n: 490 }],
    redirectProviders: [
      { week: "2026-09-28", provider: "stubhub-international", n: 185, with_sub_id: 185 },
      { week: "2026-10-05", provider: "stubhub-international", n: 264, with_sub_id: 264 },
      { week: "2026-10-05", provider: "ticketmaster", n: 36, with_sub_id: 0 }
    ],
    landing: [{ path: "/artists/olivia-rodrigo", n: 40 }]
  }, range, new Date("2026-10-17T12:00:00Z"));
  assert.deepEqual(rich.weeks[1], { week: "2026-10-05", searchVisits: 1900, mobileSearchVisits: 260, realClicks: 490, forgedRedirects: 450, noEvidenceRedirects: 360 });
  const richMd = renderScoreboard(rich);
  assert.ok(richMd.includes("| 2026-10-05 | 1,900 | 260 | 490 | 450 | 360 |"), "counted, forged and unproven redirects are separate columns");
  assert.ok(richMd.includes("mobile search visits: 90 to 260, +189% (small numbers)"), "week on week uses mobile search");
  assert.ok(richMd.includes("page-backed redirects: 380 to 490, +29%"));
  assert.ok(richMd.includes("(small numbers)"), "a week under 100 is flagged");
  assert.ok(richMd.includes("Read the mobile column"), "all-device caveat is always shown");
  assert.ok(richMd.includes("| stubhub-international | 185 | 264 | 100% |"));
  assert.ok(richMd.includes("| ticketmaster | 0 | 36 | n/a |"), "Ticketmaster has no Sub ID");
  assert.ok(richMd.includes("| /artists/olivia-rodrigo | 40 |"));
  assert.ok(richMd.includes("Not available in this report"), "missing data is stated, not filled");
  assert.ok(!/\bforecast\b|\bestimated\b/i.test(richMd), "no estimates presented as facts");
  // New tours by batch.
  const catalog = {
    artists: [
      { slug: "a", promotion_source: "auto", auto_promoted_at: "2026-10-06" },
      { slug: "b", promotion_source: "auto", auto_promoted_at: "2026-10-08" },
      { slug: "c", promotion_source: "auto", auto_promoted_at: "2026-09-29" },
      { slug: "d", promotion_source: "manual", auto_promoted_at: "2026-10-06" }
    ],
    events: [
      { artist_slug: "a", datetime_iso: "2026-11-01T20:00:00Z", status: "scheduled" },
      { artist_slug: "a", datetime_iso: "2026-11-02T20:00:00Z", status: "on-sale", ticketmaster_status_code: "cancelled" },
      { artist_slug: "a", datetime_iso: "2026-09-01T20:00:00Z", status: "scheduled" },
      { artist_slug: "d", datetime_iso: "2026-11-01T20:00:00Z", status: "scheduled" }
    ]
  };
  const batchBoard = buildScoreboard({ artistVisitors: [{ slug: "a", visitors: 12 }, { slug: "b", visitors: 1 }], artistClicks: [{ slug: "a", clicks: 3 }] }, range, new Date("2026-10-17T12:00:00Z"), catalog);
  assert.deepEqual(batchBoard.batches, [
    { week: "2026-10-05", artists: 2, withShows: 1, shows: 1, visitors: 13, clicks: 3 },
    { week: "2026-09-28", artists: 1, withShows: 0, shows: 0, visitors: 0, clicks: 0 }
  ], "batches group auto-promoted artists by Monday, skip manual ones, and ignore cancelled or past shows");
  const batchMd = renderScoreboard(batchBoard);
  assert.ok(batchMd.includes("| 2026-10-05 | 2 | 1 | 1 | 13 | 3 |"));
  assert.ok(batchMd.includes("Google clicks and attributed orders by batch are not available yet"), "unavailable batch metrics are stated");
  assert.ok(!renderScoreboard(board).includes("New tours by batch"), "no batch section without a catalog");
  assert.ok(sqlOf("artistClicks").includes("created_at >= '2026-10-05T00:00:00.000Z'"), "batch traffic covers the last full week");
  // Impact, failed runs and opportunities.
  const impactBoard = buildScoreboard({}, range, new Date("2026-11-21T12:00:00Z"), { artists: [], events: [
    { datetime_iso: "2026-11-25T20:00:00Z", status: "scheduled", provider_links: { ticketmaster: { verified: true, url: "u" } } },
    { datetime_iso: "2026-11-26T20:00:00Z", status: "scheduled", provider_links: { seatgeek: { verified: true, url: "u" } } },
    { datetime_iso: "2026-11-27T20:00:00Z", status: "scheduled", provider_links: { seatgeek: { verified: true, url: "u" }, "vivid-seats": { verified: true, url: "u" } } },
    { datetime_iso: "2026-11-28T20:00:00Z", status: "on-sale", ticketmaster_status_code: "cancelled", provider_links: {} },
    { datetime_iso: "2026-12-30T20:00:00Z", status: "scheduled", provider_links: {} }
  ] }, {
    impact: summarizeImpact([{ state: "APPROVED", payout: 10, currency: "GBP", day: "2026-11-18" }, { state: "PENDING", payout: 5, currency: "GBP", day: "2026-11-19" }], [], { attributionError: true }),
    failures: summarizeFailures([
      { path: ".github/workflows/seatgeek-cta-sync.yml", conclusion: "failure", created_at: "2026-11-21T06:00:00Z" },
      { path: ".github/workflows/seatgeek-cta-sync.yml", conclusion: "failure", created_at: "2026-11-20T06:00:00Z" },
      { path: ".github/workflows/blog-draft.yml", conclusion: "failure", created_at: "2026-11-20T06:00:00Z" }
    ])
  });
  assert.deepEqual(nearTermCoverage([
    { datetime_iso: "2026-11-25T20:00:00Z", provider_links: {} }, { datetime_iso: "2026-11-22T20:00:00Z", status: "on-sale", ticketmaster_status_code: "cancelled", provider_links: {} }
  ], new Date("2026-11-21T12:00:00Z")), { shows: 1, none: 1, one: 0 }, "cancelled shows are not counted");
  const impactMd = renderScoreboard(impactBoard);
  assert.ok(impactMd.includes("| approved | 1 | GBP 10.00 |") && impactMd.includes("| pending | 1 | GBP 5.00 |"));
  assert.ok(impactMd.includes("Paid and invoiced amounts: not available"), "paid is never filled in");
  assert.ok(impactMd.includes("| seatgeek-cta-sync.yml | 2 |") && !impactMd.includes("blog-draft"), "only commercial workflows are listed");
  assert.ok(impactMd.includes("Add verified sellers to 2 of 3 shows in the next 14 days (1 with none, 1 with one)"), "coverage counts sellers, not Ticketmaster");
  assert.ok(impactMd.includes("Seller-order test readout on 4 Dec"));
  assert.ok(renderScoreboard(buildScoreboard({}, range, new Date(), null, { impact: summarizeImpact([], [], { configured: false }), failures: "unavailable" })).includes("Unknown: Impact credentials are not configured"), "unreadable sources say unknown");
  const oneWeek = renderScoreboard(buildScoreboard({ search: [{ week: "2026-10-05", n: 5 }] }, { starts: ["2026-10-05"] }, new Date("2026-10-17T12:00:00Z")));
  assert.ok(!oneWeek.includes("Week on week"), "no week-on-week with one complete week");
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
