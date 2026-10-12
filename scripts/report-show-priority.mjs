#!/usr/bin/env node
// Daily ranked list of upcoming shows by expected commission (owner decision
// 2026-10-11). Scoring lives in scripts/lib/show-priority.mjs; this script
// gathers the inputs, prints the top of the list, and with flags:
//
//   --apply        stores the list in D1 (`show_priority`) for the lanes that
//                  read it: price snapshots refresh these shows first, and
//                  the provider sync checks their artists first
//   --issue        rewrites the rolling `automation:show-priority` issue, which
//                  the weekly social pack reads
//   --json <file>  writes the full ranking (select-event-indexing-batch.mjs
//                  --priority-file reads it)
//   --gap-artists <provider>  prints the stored list's artists missing that
//                  lane, best first, one per line (read-only, fail-open)
//
// Reads are SELECTs through `wrangler d1 execute --command`. The only D1 write
// is the `show_priority` table, replaced whole with --apply.
//
//   node scripts/report-show-priority.mjs [--top 25] [--local] [--apply] [--issue] [--markdown <file>] [--json <file>]
//   node scripts/report-show-priority.mjs --gap-artists stubhub-international
//   node scripts/report-show-priority.mjs --self-test

import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { buildD1ReadArgs } from "./lib/d1-read.mjs";
import { providerConfiguredTest } from "./lib/event-link-coverage.mjs";
import { coverageGaps, gapArtists, LANE_COMMISSION, rankShows } from "./lib/show-priority.mjs";
import { buildReplaceSql, priorityCandidates, readPriorityRows } from "./lib/show-priority-store.mjs";
import { assertNoPersonalColumns, assertReadOnlySql, parseWranglerJson } from "./report-commercial-funnel.mjs";

const execFileAsync = promisify(execFile);
const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATABASE = "tourticketcompare-demand";
const LABEL = "automation:show-priority";
const STORED_ROWS = 100;
const STORED_GAPS = 50;
const DAY_MS = 86400000;

export function buildStatements(now = new Date()) {
  const since = (days) => new Date(now.getTime() - days * DAY_MS).toISOString();
  const statements = [
    {
      // provider_click is the browser beacon, so it only fires from a loaded page.
      key: "eventClickers",
      sql: `SELECT event_id, COUNT(DISTINCT request_key || '|' || substr(created_at, 1, 10)) AS n FROM analytics_events WHERE event_name = 'provider_click' AND event_id IS NOT NULL AND request_key IS NOT NULL AND created_at >= '${since(14)}' GROUP BY event_id`
    },
    {
      key: "artistVisitors",
      sql: `SELECT artist_slug, COUNT(DISTINCT request_key || '|' || substr(created_at, 1, 10)) AS n FROM analytics_events WHERE event_name = 'page_view' AND artist_slug IS NOT NULL AND request_key IS NOT NULL AND created_at >= '${since(7)}' GROUP BY artist_slug`
    },
    {
      key: "prices",
      sql: `SELECT event_id, provider, MIN(low_price) AS low_price FROM provider_pricing_cache WHERE low_price > 0 AND currency = 'USD' AND verified_at >= '${since(3)}' GROUP BY event_id, provider`
    }
  ];
  for (const s of statements) {
    assertReadOnlySql(s.sql);
    assertNoPersonalColumns(s.sql);
  }
  return statements;
}

export function inputsFromResults(results) {
  const counts = (rows, key) => new Map((rows || []).map((r) => [String(r[key]), Number(r.n) || 0]));
  const prices = new Map();
  for (const r of results.prices || []) {
    if (!prices.has(r.event_id)) prices.set(r.event_id, new Map());
    prices.get(r.event_id).set(r.provider, Number(r.low_price));
  }
  return { eventClickers: counts(results.eventClickers, "event_id"), artistVisitors: counts(results.artistVisitors, "artist_slug"), prices };
}

/** Rows to store: the top by expected commission plus the biggest coverage gaps. */
export function rowsToStore(ranked) {
  const keep = new Map(ranked.slice(0, STORED_ROWS).map((row) => [row.event_id, row]));
  for (const row of coverageGaps(ranked, { top: STORED_GAPS })) if (!keep.has(row.event_id)) keep.set(row.event_id, ranked.find((r) => r.event_id === row.event_id));
  return [...keep.values()].sort((a, b) => a.rank - b.rank);
}

const gbp = (n) => `£${n.toFixed(2)}`;
const LANE_NAMES = { "stubhub-international": "StubHub Intl", "vivid-seats": "Vivid Seats", ticketnetwork: "TicketNetwork", "ticket-liquidator": "Ticket Liquidator", seatgeek: "SeatGeek", ticketmaster: "Ticketmaster" };

export function renderMarkdown(ranked, { top = 25, generatedAt } = {}) {
  const lines = [
    `# Top ${top} shows by expected commission`,
    "",
    `Updated ${generatedAt} by \`scripts/report-show-priority.mjs\` (daily). This list decides, automatically, which shows get prices refreshed first, which artists the provider sync checks first and which shows lead the next event-page batch and the weekly social pack.`,
    "",
    "| # | Show | Date | Days out | Lowest price | Live lanes | Expected / week |",
    "|---|---|---|---|---|---|---|"
  ];
  for (const row of ranked.slice(0, top)) {
    const price = row.price_source === "show" ? `$${row.price_usd}` : `~$${row.price_usd} (${row.price_source === "artist_median" ? "artist median" : "default"})`;
    lines.push(`| ${row.rank} | ${row.artist_name}, ${row.venue || row.city} (${row.city}) | ${row.date} | ${row.days_out} | ${price} | ${row.lanes.map((l) => LANE_NAMES[l] || l).join(", ") || "none"} | ${gbp(row.expected_gbp)} |`);
  }
  const gaps = coverageGaps(ranked, { top: 10 });
  if (gaps.length) {
    lines.push("", "## Coverage gaps worth fixing first", "", "Shows where a missing StubHub International or Vivid Seats lane costs the most. The nightly provider sync checks these artists first.", "", "| Show | Date | Missing | Worth / week |", "|---|---|---|---|");
    for (const row of gaps) lines.push(`| ${row.artist_name}, ${row.city} | ${row.date} | ${row.missing_high_paying_lanes.map((l) => LANE_NAMES[l]).join(", ")} | ${gbp(row.gap_gbp)} |`);
  }
  lines.push(
    "",
    "How the number is made: clicks on the show in the last 14 days plus the artist's page visitors this week, × 1 order per 100 clickers, × the lowest current price for 2 seats, × the best commission rate among the show's live lanes (Vivid Seats 10%, StubHub International 9%, TicketNetwork and Ticket Liquidator 8% assumed, SeatGeek 1%), × 3 inside a week and × 1.5 inside a month. It is a ranking aid with rough rates, not a forecast."
  );
  return lines.join("\n");
}

async function gh(method, apiPath, body) {
  const res = await fetch(`https://api.github.com/repos/${process.env.GITHUB_REPOSITORY}${apiPath}`, {
    method,
    headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" },
    body: body ? JSON.stringify(body) : undefined
  });
  if (!res.ok) throw new Error(`GitHub API ${method} ${apiPath} ${res.status}`);
  return res.json();
}

async function main(argv) {
  const arg = (name, fallback) => {
    const i = argv.indexOf(name);
    return i === -1 ? fallback : argv[i + 1];
  };
  const remote = !argv.includes("--local");
  const top = Math.max(1, Math.min(100, Number(arg("--top", 25)) || 25));

  const gapProvider = arg("--gap-artists", "");
  if (gapProvider) {
    // Fail-open by design: no list means no output, and the sync keeps its rotation.
    const rows = await readPriorityRows({ database: DATABASE, remote, top: STORED_ROWS + STORED_GAPS });
    for (const slug of gapArtists(rows, gapProvider)) console.log(slug);
    return 0;
  }

  const now = new Date();
  const statements = buildStatements(now);
  const { stdout } = await execFileAsync("npx", buildD1ReadArgs({ database: DATABASE, remote, statements }), { cwd: REPO_ROOT, maxBuffer: 50 * 1024 * 1024 });
  const inputs = inputsFromResults(parseWranglerJson(stdout, statements));
  const readJson = (relative) => JSON.parse(readFileSync(path.join(REPO_ROOT, relative), "utf8"));
  const ranked = rankShows({ events: readJson("public/data/events.json"), isConfigured: providerConfiguredTest(readJson("public/data/catalog.json")), ...inputs, now: now.getTime() });
  const generatedAt = now.toISOString().slice(0, 16).replace("T", " ") + " UTC";
  const body = renderMarkdown(ranked, { top, generatedAt });
  console.log(body);

  const jsonPath = arg("--json", "");
  if (jsonPath) writeFileSync(jsonPath, `${JSON.stringify({ generated_at: now.toISOString(), shows: ranked }, null, 2)}\n`);
  const markdownPath = arg("--markdown", "");
  if (markdownPath) writeFileSync(markdownPath, `${body}\n`);

  if (argv.includes("--apply")) {
    const sql = buildReplaceSql(rowsToStore(ranked), now.toISOString()).map((s) => `${s};`).join("\n");
    await execFileAsync("npx", ["wrangler", "d1", "execute", DATABASE, remote ? "--remote" : "--local", "--command", sql, "--json"], { cwd: REPO_ROOT, maxBuffer: 10 * 1024 * 1024, timeout: 120000 });
    console.log(`Stored ${rowsToStore(ranked).length} shows in show_priority.`);
  }
  if (argv.includes("--issue")) {
    const open = await gh("GET", `/issues?state=open&labels=${encodeURIComponent(LABEL)}`);
    if (open[0]) await gh("PATCH", `/issues/${open[0].number}`, { body });
    else await gh("POST", "/issues", { title: "Top shows by expected commission", body, labels: [LABEL] });
    console.log(`Show priority issue ${open[0] ? `#${open[0].number} updated` : "created"}.`);
  }
  return 0;
}

function selfTest() {
  const now = Date.parse("2026-10-11T12:00:00Z");
  const lanes = (extra = {}) => ({
    ticketmaster: { event_id: "1", url: "https://www.ticketmaster.com/x/event/1", verified: true },
    ...extra
  });
  const viv = { "vivid-seats": { event_id: 9, url: "https://www.vividseats.com/a-tickets-b/production/9", verified: true } };
  const base = { artist_name: "Act", city: "Chicago", venue: "United Center", country: "US", ticketmaster_url: "https://www.ticketmaster.com/x/event/1" };
  const events = [
    { ...base, id: "soon", artist_slug: "act", datetime_iso: "2026-10-14T00:00:00Z", vividseats_url: viv["vivid-seats"].url, provider_links: lanes(viv) },
    { ...base, id: "later", artist_slug: "act", datetime_iso: "2026-12-20T00:00:00Z", vividseats_url: viv["vivid-seats"].url, provider_links: lanes(viv) },
    { ...base, id: "tm-only", artist_slug: "other", datetime_iso: "2026-10-15T00:00:00Z", provider_links: lanes() },
    { ...base, id: "past", artist_slug: "act", datetime_iso: "2026-10-01T00:00:00Z", provider_links: lanes(viv) }
  ];
  const ranked = rankShows({
    events,
    isConfigured: () => true,
    eventClickers: new Map([["soon", 10], ["tm-only", 20]]),
    artistVisitors: new Map([["act", 30]]),
    prices: new Map([["soon", new Map([["vivid-seats", 200]])]]),
    now
  });
  assert.deepEqual(ranked.map((r) => r.event_id), ["soon", "later", "tm-only"], "past shows drop; Ticketmaster-only earns nothing");
  const soon = ranked[0];
  assert.equal(soon.price_source, "show");
  assert.equal(soon.best_lane_rate, 0.10);
  // demand = 10/2 + 30*0.31/1 + 0.05 = 14.35; 14.35 × 0.01 × (200×2×0.79) × 3 × 0.10
  assert.equal(soon.expected_gbp, 13.6);
  assert.deepEqual(soon.missing_high_paying_lanes, ["stubhub-international"]);
  assert.equal(ranked[1].price_source, "artist_median", "a show with no price borrows the artist median");
  assert.equal(ranked[2].expected_gbp, 0);
  assert.ok(ranked[2].gap_gbp > 0, "a Ticketmaster-only show still has gap value");
  assert.equal(soon.gap_gbp, 6.12, "a missing StubHub International lane is worth half its rate");
  assert.deepEqual(coverageGaps(ranked).map((r) => r.event_id), ["soon", "tm-only", "later"]);
  assert.deepEqual(gapArtists(ranked, "vivid-seats"), ["other"]);
  assert.deepEqual(gapArtists(ranked, "stubhub-international"), ["act", "other"], "busier artists first");
  assert.equal(LANE_COMMISSION.ticketmaster, 0);

  const statements = buildStatements(new Date(now));
  assert.deepEqual(statements.map((s) => s.key), ["eventClickers", "artistVisitors", "prices"]);
  const inputs = inputsFromResults({ eventClickers: [{ event_id: "soon", n: 3 }], artistVisitors: [], prices: [{ event_id: "soon", provider: "vivid-seats", low_price: 99 }] });
  assert.equal(inputs.eventClickers.get("soon"), 3);
  assert.equal(inputs.prices.get("soon").get("vivid-seats"), 99);

  const stored = rowsToStore(ranked);
  assert.deepEqual(stored.map((r) => r.rank), [1, 2, 3]);
  const sql = buildReplaceSql(stored, "2026-10-11T12:00:00Z");
  assert.match(sql[0], /^CREATE TABLE IF NOT EXISTS show_priority/);
  assert.equal(sql[1], "DELETE FROM show_priority");
  assert.match(sql[2], /'soon', 1, 'act', '2026-10-14', 13\.6, 19\.73/);

  // Snapshot order: priority first; on a final-hours tick, after the final-hours shows.
  const visit = (opts, at) => priorityCandidates(events, opts, new Date(at)).map((e) => e.id);
  assert.deepEqual(visit({}, now), events.map((e) => e.id), "no list keeps the file order");
  assert.deepEqual(visit({ priorityIds: ["tm-only", "missing"] }, now), ["tm-only", "soon", "later", "past"]);
  assert.deepEqual(visit({ withinHours: 48, priorityIds: ["later", "soon"] }, Date.parse("2026-10-13T06:00:00Z")), ["soon", "tm-only", "later"]);
  assert.deepEqual(visit({ withinHours: 48 }, Date.parse("2026-10-13T06:00:00Z")), ["soon", "tm-only"]);

  const md = renderMarkdown(ranked, { top: 25, generatedAt: "2026-10-11 12:00 UTC" });
  assert.ok(md.includes("| 1 | Act, United Center (Chicago) | 2026-10-14 | 2 | $200 | Vivid Seats, Ticketmaster | £13.60 |"));
  assert.ok(md.includes("## Coverage gaps worth fixing first"));
  return 18;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const argv = process.argv.slice(2);
  if (argv.includes("--self-test")) {
    console.log(`Show priority self-test passed (${selfTest()} checks).`);
  } else {
    main(argv).then((code) => process.exit(code), (error) => {
      console.error([error?.message, error?.stderr].filter(Boolean).join("\n") || error);
      process.exit(1);
    });
  }
}
