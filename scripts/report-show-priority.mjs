#!/usr/bin/env node
// Daily ranked list of upcoming shows (owner decision 2026-10-11). The stored
// list keeps the legacy expected-commission order for the lanes that read it;
// the issue and markdown show observed clicks, tiers and £ ranges instead
// (owner request 2026-11-23, scripts/lib/show-priority-report.mjs). Scoring lives in scripts/lib/show-priority.mjs; this script
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
import { artistLevel, CLICK_YIELD_GBP, eventLevel, evidenceTier, formatRange, legacyTotal, OBSERVED_MIN_CLICKER_DAYS, OBSERVED_WEEKLY_GBP, reportGaps, TIER_LABEL, tierCounts, urgencyBand, weeklyRange } from "./lib/show-priority-report.mjs";
import { buildReplaceSql, priorityCandidates, readPriorityRows } from "./lib/show-priority-store.mjs";
import { assertNoPersonalColumns, assertReadOnlySql, parseWranglerJson } from "./report-commercial-funnel.mjs";

const execFileAsync = promisify(execFile);
const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATABASE = "tourticketcompare-demand";
const LABEL = "automation:show-priority";
const ISSUE_TITLE = "Show priority: where visitors are clicking";
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
  const counts = tierCounts(ranked);
  const legacy = legacyTotal(ranked);
  const lines = [
    "# Show priority: where visitors are clicking",
    "",
    `Updated ${generatedAt} by \`scripts/report-show-priority.mjs\` (daily). Observed clicks first, estimates second. Pounds are a range from measured commission per click (${Math.round(CLICK_YIELD_GBP.low * 1000) / 10}p to ${Math.round(CLICK_YIELD_GBP.high * 1000) / 10}p, about ${CLICK_YIELD_GBP.orders} orders to ${CLICK_YIELD_GBP.asOf}) and appear only for shows with their own clicks. They are not a forecast.`,
    "",
    `**No longer used for pounds:** the old per-show model (assumed 1 order per 100 clickers, 2 seats at the lowest price, best seller rate, ×3 / ×1.5 for nearness). Added up over every show it said £${legacy.toFixed(0)} a week; the site earned about £${OBSERVED_WEEKLY_GBP.value.toFixed(0)} a week (${OBSERVED_WEEKLY_GBP.note}).`,
    "",
    "The stored list that sets price-refresh order, which artists the provider sync checks first, near-show links and event-page batch picks still uses the old order. This page changes none of them.",
    "",
    "## Shows with their own clicks (event-level, last 14 days)",
    "",
    `${counts.observed} shows have ${OBSERVED_MIN_CLICKER_DAYS}+ visitor-days clicking a seller (Observed), ${counts.thin} have 1-${OBSERVED_MIN_CLICKER_DAYS - 1} (Thin: a few visitors can reorder them), ${counts.artist_only} have only artist-page traffic and ${counts.none} have no traffic data.`,
    "",
    "| # | Show | Date | Nearness | Clicker-days | Evidence | Lowest price | Paying sellers | £ / week |",
    "|---|---|---|---|---|---|---|---|---|"
  ];
  const events = eventLevel(ranked);
  events.slice(0, top).forEach((row, i) => {
    const price = row.price_source === "show" ? `$${row.price_usd}` : "no show price";
    const paying = row.lanes.filter((l) => (LANE_COMMISSION[l] ?? 0) > 0).map((l) => LANE_NAMES[l] || l).join(", ") || "none";
    lines.push(`| ${i + 1} | ${row.artist_name}, ${row.venue || row.city} (${row.city}) | ${row.date} | ${urgencyBand(row.days_out)} | ${row.event_clickers_14d} | ${TIER_LABEL[evidenceTier(row)]} | ${price} | ${paying} | ${formatRange(weeklyRange(row))} |`);
  });
  if (!events.length) lines.push("| | No show has a recorded seller click in 14 days | | | | | | | |");
  if (events.length > top) lines.push("", `${events.length - top} more shows have 1+ clicks (full list in the run artifact).`);

  const artists = artistLevel(ranked);
  if (artists.length) {
    lines.push(
      "", "## Artist traffic (artist-level proxy, last 7 days)", "",
      "Page visitors say an artist is being looked at, not which date or whether anyone will buy. No pounds are shown.", "",
      "| Artist | Visitor-days | Dates in next 60 days | Dates with a click |", "|---|---|---|---|"
    );
    for (const a of artists) lines.push(`| ${a.artist_name} | ${a.visitors_7d} | ${a.dates_60d} | ${a.clicked_dates_60d} |`);
  }

  const gaps = reportGaps(ranked, { top: 10 });
  if (gaps.shown.length) {
    lines.push("", "## Coverage gaps on shows people clicked", "", "Shows with clicks where StubHub International or Vivid Seats is not listed. The nightly provider sync still checks gap artists in its stored order.", "", "| Show | Date | Clicker-days | Missing |", "|---|---|---|---|");
    for (const row of gaps.shown) lines.push(`| ${row.artist_name}, ${row.city} | ${row.date} | ${row.event_clickers_14d} | ${row.missing_high_paying_lanes.map((l) => LANE_NAMES[l]).join(", ")} |`);
    if (gaps.withoutClicks) lines.push("", `${gaps.withoutClicks} more shows miss one of those sellers but have no clicks yet.`);
  }

  lines.push(
    "",
    "## Limits",
    "",
    "- Clicker-days count visitors who pressed any seller button, Ticketmaster included, so they overstate paying clicks. Seller mix matters: in November most Metallica clicks went to StubHub International, which has no provable order since Sub IDs began.",
    "- Per-click commission is a site-wide average, mostly US shows (all 7 traced orders were US). It is not measured for any one show, country or currency; UK and EU shows have no order evidence.",
    "- Nearness is shown, not multiplied: 5 of 7 traced orders were within 6 days of the show, but there is no click baseline to turn that into a factor."
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
    if (open[0]) await gh("PATCH", `/issues/${open[0].number}`, { title: ISSUE_TITLE, body });
    else await gh("POST", "/issues", { title: ISSUE_TITLE, body, labels: [LABEL] });
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
  const priceChecks = [
    { event_id: "soon", checked_at: "2026-10-11T12:00:00Z" },
    { event_id: "later", checked_at: "2026-10-10T12:00:00Z" }
  ];
  assert.deepEqual(visit({ priceChecks }, now), ["tm-only", "past", "later", "soon"], "unchecked first, then oldest completed check");
  assert.deepEqual(visit({ priceChecks, priorityIds: ["soon"] }, now), ["soon", "tm-only", "past", "later"], "commercial priority still leads");
  assert.deepEqual(visit({ priceChecks, withinHours: 48 }, Date.parse("2026-10-13T06:00:00Z")), ["soon", "tm-only"], "final-hours order stays nearest first");
  assert.deepEqual(visit({ priceChecks: [{ event_id: "soon", checked_at: "invalid" }] }, now), events.map((e) => e.id), "invalid check timestamps do not hide events");

  // Report layer: event-level observations apart from artist-level proxies.
  assert.deepEqual([soon.event_clickers_14d, soon.artist_visitors_7d], [10, 30], "demand sources stay separate on the row");
  assert.equal(evidenceTier(soon), "observed");
  assert.equal(evidenceTier({ event_clickers_14d: 2, artist_visitors_7d: 5 }), "thin");
  assert.equal(evidenceTier(ranked[1]), "artist_only", "artist traffic alone is never an observation");
  assert.equal(evidenceTier({ event_clickers_14d: 0, artist_visitors_7d: 0 }), "none");
  assert.deepEqual(weeklyRange(soon).map((n) => Math.round(n * 100) / 100), [0.23, 0.75], "5 clicker-days a week at 4.6p to 15p");
  assert.equal(weeklyRange(ranked[1]), null, "no pounds without the show own clicks");
  assert.deepEqual(weeklyRange(ranked[2]), [0, 0], "a Ticketmaster-only show earns nothing");
  assert.deepEqual(eventLevel(ranked).map((r) => r.event_id), ["tm-only", "soon"], "most clicked first, and only shows with clicks");
  assert.deepEqual(artistLevel(ranked).map((a) => [a.artist_slug, a.visitors_7d, a.dates_60d, a.clicked_dates_60d]), [["act", 30, 1, 1]]);
  assert.equal(reportGaps(ranked).withoutClicks, 1, "the gap on the show with no clicks is counted, not ranked");
  assert.equal(urgencyBand(7), "within 7 days");
  assert.equal(urgencyBand(31), "31+ days");
  assert.deepEqual(tierCounts(ranked), { observed: 2, thin: 0, artist_only: 1, none: 0 });

  const md = renderMarkdown(ranked, { top: 25, generatedAt: "2026-10-11 12:00 UTC" });
  assert.ok(md.includes("| 2 | Act, United Center (Chicago) | 2026-10-14 | within 7 days | 10 | Observed | $200 | Vivid Seats | £0.23-£0.75 |"));
  assert.ok(md.includes("£0 (no paying seller)"));
  assert.ok(md.includes("## Artist traffic (artist-level proxy, last 7 days)"));
  assert.ok(md.includes("## Coverage gaps on shows people clicked"));
  assert.ok(!md.includes("Expected / week"), "no per-show expected pounds from the old model");
  return 34;
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
