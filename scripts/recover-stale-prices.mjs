#!/usr/bin/env node
// Bounded auto-recovery for aging prices (added 2026-11-24).
//
// GitHub drops scheduled snapshot ticks, and on 24 Nov Impact answered 5xx for
// two hours, so cached prices aged past the stale gate and somebody dispatched
// the writers by hand. This does that dispatch itself, with limits:
//
//   - It reads the same live /api/shows payload the price-coverage gate reads.
//   - A lane (Vivid Seats, TicketNetwork, StubHub International) is "aging" when
//     more than --max-stale-share of its displayed prices are older than
//     --after-hours (default 6h, half the 12h gate, so it acts before Site health
//     goes red) and it shows at least --min-prices prices.
//   - For an aging lane it dispatches that lane's own writer workflow with
//     apply=true. It does not dispatch when a run of that writer is already
//     queued or in progress, when its last automatic dispatch was under
//     --backoff-minutes ago, or after --max-attempts automatic dispatches in
//     the last --window-hours.
//   - A lane that is still over the 12h gate once the cap is spent gets one rolling
//     `automation:price-recovery` issue; the issue is closed when no lane is
//     over the gate. Nothing else is written. No price, link or event is touched.
//
// Runs hourly inside price-freshness-check.yml with the job's own GITHUB_TOKEN
// (workflow_dispatch is exempt from the "no workflows from GITHUB_TOKEN" rule),
// so it needs no personal access token.
//
//   node scripts/recover-stale-prices.mjs [--base-url URL] [--dry-run]
//   node scripts/recover-stale-prices.mjs --self-test

import assert from "node:assert/strict";
import { fetchAllShows, PRICE_STALE_AFTER_HOURS, DEFAULT_MAX_STALE_SHARE } from "./report-price-coverage.mjs";
import { fetchWithRetry } from "./lib/http-retry.mjs";

export const DEFAULTS = Object.freeze({
  afterHours: 6,
  minPrices: 10,
  maxStaleShare: DEFAULT_MAX_STALE_SHARE,
  backoffMinutes: 45,
  maxAttempts: 3,
  windowHours: 6
});

const BOT = "github-actions[bot]";
const ISSUE_LABEL = "automation:price-recovery";
const ISSUE_TITLE = "Price auto-recovery gave up";

export const RECOVERY_LANES = Object.freeze([
  Object.freeze({ provider: "Vivid Seats", workflow: "vividseats-price-snapshots.yml", inputs: Object.freeze({ apply: "true" }), titleHint: "" }),
  Object.freeze({ provider: "TicketNetwork", workflow: "impact-marketplace-price-snapshots.yml", inputs: Object.freeze({ provider: "ticketnetwork", apply: "true" }), titleHint: "ticketnetwork" }),
  Object.freeze({ provider: "StubHub International", workflow: "impact-marketplace-price-snapshots.yml", inputs: Object.freeze({ provider: "stubhub-international", apply: "true" }), titleHint: "stubhub-international" })
]);

const ACTIVE = new Set(["queued", "in_progress", "waiting", "pending", "requested"]);

/** Per-lane share of displayed prices older than `afterHours`, and older than the 12h gate. */
export function laneAging(shows, { now = Date.now(), afterHours = DEFAULTS.afterHours } = {}) {
  const lanes = new Map(RECOVERY_LANES.map((lane) => [lane.provider, { provider: lane.provider, displayed: 0, aging: 0, overGate: 0 }]));
  for (const show of Array.isArray(shows) ? shows : []) {
    if (!(Date.parse(String(show?.dateTimeISO || "")) > now)) continue;
    for (const price of Array.isArray(show?.prices) ? show.prices : []) {
      const row = lanes.get(price?.provider);
      if (!row || price?.status !== "ok" || price?.price === null || !Number.isFinite(Number(price?.price))) continue;
      const age = (now - Date.parse(String(price.fetchedAt || ""))) / 3600000;
      if (!Number.isFinite(age)) continue;
      row.displayed += 1;
      if (age > afterHours) row.aging += 1;
      if (age > PRICE_STALE_AFTER_HOURS) row.overGate += 1;
    }
  }
  return [...lanes.values()].map((row) => ({
    ...row,
    agingShare: row.displayed ? row.aging / row.displayed : 0,
    gateShare: row.displayed ? row.overGate / row.displayed : 0
  }));
}

function runsFor(lane, runs) {
  return runs.filter((run) => {
    // A scheduled run of the shared Impact workflow cannot be told apart by lane,
    // so it counts for both; a dispatched run names its provider in its title.
    if (run.event !== "workflow_dispatch" || !lane.titleHint) return true;
    return String(run.display_title || "").toLowerCase().includes(lane.titleHint);
  });
}

/**
 * Decides one action per lane. `runsByWorkflow` maps a workflow file to its
 * recent runs (GitHub run objects: status, event, created_at, actor, display_title).
 */
export function planRecovery(lanes, runsByWorkflow, { now = Date.now(), ...options } = {}) {
  const opt = { ...DEFAULTS, ...options };
  return lanes.map((row) => {
    const lane = RECOVERY_LANES.find((entry) => entry.provider === row.provider);
    const aging = row.displayed >= opt.minPrices && row.agingShare > opt.maxStaleShare;
    const gated = row.displayed >= opt.minPrices && row.gateShare > opt.maxStaleShare;
    const base = { provider: row.provider, workflow: lane.workflow, inputs: lane.inputs, gated, agingShare: row.agingShare, gateShare: row.gateShare };
    if (!aging) return { ...base, action: "ok" };
    const runs = runsFor(lane, runsByWorkflow[lane.workflow] || []);
    if (runs.some((run) => ACTIVE.has(run.status))) return { ...base, action: "running" };
    const mine = runs
      .filter((run) => run.event === "workflow_dispatch" && (run.triggering_actor?.login || run.actor?.login) === BOT)
      .filter((run) => now - Date.parse(run.created_at) <= opt.windowHours * 3600000)
      .sort((a, b) => Date.parse(b.created_at) - Date.parse(a.created_at));
    if (mine.length >= opt.maxAttempts) return { ...base, action: "capped", attempts: mine.length };
    if (mine.length && now - Date.parse(mine[0].created_at) < opt.backoffMinutes * 60000) return { ...base, action: "backoff", attempts: mine.length };
    return { ...base, action: "dispatch", attempts: mine.length };
  });
}

/** The rolling issue is wanted only for a lane that is over the gate and cannot be retried. */
export function needsIssue(plan) {
  return plan.filter((entry) => entry.gated && entry.action === "capped");
}

export function renderIssue(plan, now = Date.now()) {
  const rows = plan.map((entry) => `| ${entry.provider} | ${(entry.agingShare * 100).toFixed(0)}% | ${(entry.gateShare * 100).toFixed(0)}% | ${entry.action}${entry.attempts ? ` (${entry.attempts} automatic runs)` : ""} |`);
  return [
    `Automatic recovery re-ran the price writers ${DEFAULTS.maxAttempts} times in ${DEFAULTS.windowHours} hours and these prices are still past the ${PRICE_STALE_AFTER_HOURS}-hour gate. Checked ${new Date(now).toISOString()}.`,
    "",
    "| Lane | Prices older than 6h | Older than 12h | Action |",
    "| --- | ---: | ---: | --- |",
    ...rows,
    "",
    "Likely causes: the Impact or Vivid Seats API is failing (check the latest snapshot run log), an expired credential, or D1 write contention. Nothing is retried further until the 6-hour window clears or someone dispatches the writer by hand. This issue closes itself once no lane is over the gate."
  ].join("\n");
}

async function gh(token, repo, method, apiPath, body) {
  const response = await fetchWithRetry(`https://api.github.com${apiPath.replace("{repo}", repo)}`, {
    method,
    headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28", "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined
  });
  if (!response.ok) throw new Error(`GitHub ${method} ${apiPath} returned HTTP ${response.status}`);
  return response.status === 204 ? null : response.json();
}

async function recentRuns(token, repo, workflow, now) {
  const since = new Date(now - 7 * 3600000).toISOString();
  const body = await gh(token, repo, "GET", `/repos/{repo}/actions/workflows/${workflow}/runs?per_page=50&created=${encodeURIComponent(`>=${since}`)}`);
  return Array.isArray(body?.workflow_runs) ? body.workflow_runs : [];
}

async function syncIssue(token, repo, plan, now) {
  const open = await gh(token, repo, "GET", `/repos/{repo}/issues?state=open&labels=${encodeURIComponent(ISSUE_LABEL)}`);
  const existing = (Array.isArray(open) ? open : []).find((issue) => !issue.pull_request);
  const wanted = needsIssue(plan).length > 0;
  if (wanted && existing) return gh(token, repo, "PATCH", `/repos/{repo}/issues/${existing.number}`, { body: renderIssue(plan, now) });
  if (wanted) return gh(token, repo, "POST", "/repos/{repo}/issues", { title: ISSUE_TITLE, body: renderIssue(plan, now), labels: [ISSUE_LABEL] });
  const anyGated = plan.some((entry) => entry.gated);
  if (existing && !anyGated) return gh(token, repo, "PATCH", `/repos/{repo}/issues/${existing.number}`, { state: "closed", state_reason: "completed" });
  return null;
}

function selfTest() {
  const now = Date.parse("2026-11-24T10:00:00Z");
  const ago = (hours) => new Date(now - hours * 3600000).toISOString();
  const show = (provider, hours) => ({ dateTimeISO: "2026-12-01T00:00:00Z", prices: [{ provider, status: "ok", price: 100, fetchedAt: ago(hours) }] });
  const many = (provider, hours, count) => Array.from({ length: count }, () => show(provider, hours));
  const lane = (shows, provider) => laneAging(shows, { now }).find((row) => row.provider === provider);

  // Aging arithmetic.
  const mixed = [...many("Vivid Seats", 1, 6), ...many("Vivid Seats", 8, 4)];
  assert.equal(lane(mixed, "Vivid Seats").aging, 4, "8h-old prices are aging at the 6h line");
  assert.equal(lane(mixed, "Vivid Seats").overGate, 0, "8h is inside the 12h gate");
  assert.equal(lane([show("Vivid Seats", 20), { ...show("Vivid Seats", 20), dateTimeISO: "2026-11-01T00:00:00Z" }], "Vivid Seats").displayed, 1, "past shows are not counted");
  assert.equal(lane([{ dateTimeISO: "2026-12-01T00:00:00Z", prices: [{ provider: "Vivid Seats", status: "unavailable", price: null }] }], "Vivid Seats").displayed, 0, "an unavailable lane is not a price");

  const stale = [...many("TicketNetwork", 20, 12), ...many("Vivid Seats", 1, 12), ...many("StubHub International", 1, 3)];
  const lanes = laneAging(stale, { now });
  let plan = planRecovery(lanes, {}, { now });
  const by = (name) => plan.find((entry) => entry.provider === name);
  assert.equal(by("TicketNetwork").action, "dispatch", "an aging lane with no runs is dispatched");
  assert.deepEqual(by("TicketNetwork").inputs, { provider: "ticketnetwork", apply: "true" });
  assert.equal(by("Vivid Seats").action, "ok", "a fresh lane is left alone");
  assert.equal(by("StubHub International").action, "ok", "a lane under the minimum sample is left alone");

  const run = (over) => ({ status: "completed", event: "workflow_dispatch", created_at: ago(2), triggering_actor: { login: BOT }, display_title: "Impact marketplace price snapshots (ticketnetwork)", ...over });
  const impact = "impact-marketplace-price-snapshots.yml";
  plan = planRecovery(lanes, { [impact]: [run({ status: "in_progress", event: "schedule", created_at: ago(0.1) })] }, { now });
  assert.equal(by("TicketNetwork").action, "running", "a scheduled run already in progress is waited on");
  plan = planRecovery(lanes, { [impact]: [run({ created_at: ago(0.3) })] }, { now });
  assert.equal(by("TicketNetwork").action, "backoff", "a dispatch 18 minutes ago backs off");
  plan = planRecovery(lanes, { [impact]: [run({ created_at: ago(1) })] }, { now });
  assert.equal(by("TicketNetwork").action, "dispatch", "a dispatch an hour ago is retried");
  assert.equal(by("TicketNetwork").attempts, 1);
  plan = planRecovery(lanes, { [impact]: [run({ created_at: ago(1) }), run({ created_at: ago(2.5) }), run({ created_at: ago(4) })] }, { now });
  assert.equal(by("TicketNetwork").action, "capped", "three automatic runs in the window is the cap");
  plan = planRecovery(lanes, { [impact]: [run({ created_at: ago(1) }), run({ created_at: ago(2.5) }), run({ created_at: ago(7) })] }, { now });
  assert.equal(by("TicketNetwork").action, "dispatch", "a run outside the window does not count");
  plan = planRecovery(lanes, { [impact]: [run({ created_at: ago(1), triggering_actor: { login: "olstaylor" } }), run({ created_at: ago(2.5), triggering_actor: { login: "olstaylor" } }), run({ created_at: ago(4), triggering_actor: { login: "olstaylor" } })] }, { now });
  assert.equal(by("TicketNetwork").action, "dispatch", "manual dispatches do not use up the automatic cap");
  plan = planRecovery(lanes, { [impact]: [run({ created_at: ago(1), display_title: "Impact marketplace price snapshots (stubhub-international)" })] }, { now });
  assert.equal(by("TicketNetwork").attempts, 0, "another provider's dispatch is not this lane's attempt");

  // Issue rule: capped and over the 12h gate.
  plan = planRecovery(lanes, { [impact]: [run({ created_at: ago(1) }), run({ created_at: ago(2.5) }), run({ created_at: ago(4) })] }, { now });
  assert.equal(needsIssue(plan).length, 1, "capped and over the gate opens the issue");
  const eightHours = laneAging(many("TicketNetwork", 8, 12), { now });
  plan = planRecovery(eightHours, { [impact]: [run({ created_at: ago(1) }), run({ created_at: ago(2.5) }), run({ created_at: ago(4) })] }, { now });
  assert.equal(needsIssue(plan).length, 0, "capped but inside the 12h gate stays quiet");
  assert.match(renderIssue(planRecovery(lanes, {}, { now }), now), /older than 12h/i);
  console.log("recover-stale-prices self-test: ok");
}

function parseArgs(argv) {
  const options = { baseUrl: "https://tourticketcompare.com", dryRun: false, selfTest: false };
  for (let i = 0; i < argv.length; i += 1) {
    if (argv[i] === "--base-url") options.baseUrl = String(argv[++i] || "").replace(/\/+$/, "");
    else if (argv[i] === "--dry-run") options.dryRun = true;
    else if (argv[i] === "--self-test") options.selfTest = true;
    else throw new Error(`unknown argument ${argv[i]}`);
  }
  return options;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.selfTest) return selfTest();
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPOSITORY;
  if (!options.dryRun && (!token || !repo)) throw new Error("needs GITHUB_TOKEN and GITHUB_REPOSITORY (or --dry-run)");
  const now = Date.now();
  let shows;
  try {
    shows = await fetchAllShows(options.baseUrl);
  } catch (error) {
    // The freshness probe reports an unreadable site; recovery cannot judge it.
    console.log(`price recovery: live payload unreadable (${error?.message || error}); nothing dispatched.`);
    return;
  }
  const lanes = laneAging(shows, { now });
  const runsByWorkflow = {};
  if (token && repo) {
    for (const workflow of new Set(RECOVERY_LANES.map((lane) => lane.workflow))) runsByWorkflow[workflow] = await recentRuns(token, repo, workflow, now);
  }
  const plan = planRecovery(lanes, runsByWorkflow, { now });
  const summary = ["## Price auto-recovery", "", "| Lane | Older than 6h | Older than 12h | Action |", "| --- | ---: | ---: | --- |"];
  let failed = false;
  for (const entry of plan) {
    let action = entry.action;
    if (entry.action === "dispatch" && !options.dryRun) {
      try {
        await gh(token, repo, "POST", `/repos/{repo}/actions/workflows/${entry.workflow}/dispatches`, { ref: "main", inputs: entry.inputs });
        action = `dispatched (automatic run ${entry.attempts + 1} of ${DEFAULTS.maxAttempts})`;
      } catch (error) {
        action = `dispatch failed: ${error?.message || error}`;
        failed = true;
      }
    }
    summary.push(`| ${entry.provider} | ${(entry.agingShare * 100).toFixed(0)}% | ${(entry.gateShare * 100).toFixed(0)}% | ${action} |`);
  }
  if (!options.dryRun && token && repo) await syncIssue(token, repo, plan, now);
  console.log(summary.join("\n"));
  if (failed) process.exitCode = 1;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error(error?.stack || error);
    process.exitCode = 1;
  });
}
