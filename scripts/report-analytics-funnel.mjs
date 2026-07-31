#!/usr/bin/env node
// Read-only funnel report over the DEMAND_DB analytics_events table.
//
// Sections:
//   1. Outbound click-through rate by provider (clicks / total page views,
//      plus outbound_click / provider_click redirect completion).
//   2. Outbound click-through rate by artist (clicks / that artist's page views).
//   3. Outbound click-through rate by ctaLocation (provider_click only —
//      ctaLocation exists only on the client CTA event; denominator is total
//      page views because CTA locations span several route types).
//   4. provider_click split on events with a price snapshot vs without
//      (metadata priceSnapshot / hasPrice; outbound_click carries neither key).
//   5. Top artist pages by click volume (provider_click + outbound_click).
//
// Every statement is a SELECT executed through `wrangler d1 execute` — this
// script never writes to D1 and creates no tables.
import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const DEFAULT_D1_DATABASE = "tourticketcompare-demand";
const DEFAULT_WINDOW_DAYS = 30;
const DEFAULT_TOP_LIMIT = 10;
const DAY_MS = 24 * 60 * 60 * 1000;

function usage() {
  return `Usage: node scripts/report-analytics-funnel.mjs [options]

Read-only funnel report over DEMAND_DB analytics_events: outbound click-through
rate by provider / artist / ctaLocation, price-snapshot click split, and top
artist pages by click volume. Only SELECT statements are executed — nothing is
written to D1 and no tables are created.

Options:
  --days <n>           Report window in days (default: ${DEFAULT_WINDOW_DAYS}; 0 = all time)
  --top <n>            Rows shown in the top-artists table (default: ${DEFAULT_TOP_LIMIT})
  --database <name>    D1 database name (default: ${DEFAULT_D1_DATABASE})
  --local              Query local D1 instead of remote D1
  --json               Emit machine-readable summary JSON
  --route-traffic <f>  Also write per-route views/provider clicks to <f>, in the
                       shape scripts/audit-indexable-surface.mjs consumes
                       (conventionally reports/analytics/route-traffic.json)
  --self-test          Run local unit/self tests only; no network and no D1 access
  -h, --help           Show this help

Environment:
  CLOUDFLARE_API_TOKEN     Required by wrangler for remote queries
  CLOUDFLARE_ACCOUNT_ID    Required by wrangler for remote queries
  TTC_NOW                  Optional ISO timestamp override of "now" for deterministic testing
`;
}

function parseArgs(argv) {
  const options = {
    selfTest: false,
    days: DEFAULT_WINDOW_DAYS,
    top: DEFAULT_TOP_LIMIT,
    database: DEFAULT_D1_DATABASE,
    remote: true,
    json: false,
    help: false,
    routeTraffic: ""
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--self-test") {
      options.selfTest = true;
    } else if (arg === "--days") {
      const value = Number(argv[++i]);
      if (!Number.isInteger(value) || value < 0) throw new Error("--days requires a non-negative integer");
      options.days = value;
    } else if (arg === "--top") {
      const value = Number(argv[++i]);
      if (!Number.isInteger(value) || value < 1) throw new Error("--top requires a positive integer");
      options.top = value;
    } else if (arg === "--database") {
      const value = argv[++i];
      if (!value || value.startsWith("--")) throw new Error("--database requires a D1 database name");
      options.database = value;
    } else if (arg === "--local") {
      options.remote = false;
    } else if (arg === "--json") {
      options.json = true;
    } else if (arg === "--route-traffic") {
      // Written to a caller-chosen path so the audit's default location is a
      // convention, not a hard-coded side effect of running the report.
      const value = argv[++i];
      if (!value || value.startsWith("--")) throw new Error("--route-traffic requires an output file path");
      options.routeTraffic = value;
    } else if (arg === "-h" || arg === "--help") {
      options.help = true;
    } else {
      throw new Error(`Unknown argument: ${arg}`);
    }
  }
  return options;
}

// ── SQL builders ────────────────────────────────────────────────────────────

function computeSinceIso(days, now = new Date()) {
  if (!days) return "";
  return new Date(now.getTime() - days * DAY_MS).toISOString();
}

function windowClause(sinceIso) {
  if (!sinceIso) return "";
  // Only an internally generated ISO timestamp may be interpolated.
  if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/.test(sinceIso)) {
    throw new Error(`Refusing to interpolate non-ISO window bound: ${sinceIso}`);
  }
  return ` AND created_at >= '${sinceIso}'`;
}

function assertReadOnlySql(sql) {
  const body = sql
    .split("\n")
    .filter((line) => !line.trim().startsWith("--"))
    .join("\n")
    .trim();
  if (!/^SELECT\b/i.test(body)) throw new Error(`Statement is not a SELECT: ${body.slice(0, 80)}`);
  if (body.replace(/;\s*$/, "").includes(";")) throw new Error("Multiple statements are not allowed in one entry");
  const forbidden = /\b(INSERT|UPDATE|DELETE|DROP|ALTER|CREATE|REPLACE|ATTACH|DETACH|PRAGMA|VACUUM|REINDEX)\b/i;
  if (forbidden.test(body)) throw new Error(`Statement contains a non-read-only keyword: ${body.slice(0, 80)}`);
  return body;
}

function buildStatements(sinceIso) {
  const since = windowClause(sinceIso);
  const statements = [
    {
      key: "pageViewsByArtist",
      sql: `SELECT COALESCE(NULLIF(TRIM(artist_slug), ''), '(site)') AS artist_slug, COUNT(*) AS views
FROM analytics_events
WHERE event_name = 'page_view'${since}
GROUP BY 1`
    },
    {
      key: "clicksByProvider",
      sql: `SELECT event_name, COALESCE(NULLIF(TRIM(provider), ''), NULLIF(TRIM(json_extract(metadata_json, '$.provider')), ''), '(none)') AS provider, COUNT(*) AS clicks
FROM analytics_events
WHERE event_name IN ('provider_click', 'outbound_click')${since}
GROUP BY 1, 2`
    },
    {
      key: "clicksByArtist",
      sql: `SELECT event_name, COALESCE(NULLIF(TRIM(artist_slug), ''), NULLIF(TRIM(json_extract(metadata_json, '$.artistSlug')), ''), '(none)') AS artist_slug, COUNT(*) AS clicks
FROM analytics_events
WHERE event_name IN ('provider_click', 'outbound_click')${since}
GROUP BY 1, 2`
    },
    {
      key: "clicksByCtaLocation",
      sql: `SELECT COALESCE(NULLIF(TRIM(json_extract(metadata_json, '$.ctaLocation')), ''), '(none)') AS cta_location, COUNT(*) AS clicks
FROM analytics_events
WHERE event_name = 'provider_click'${since}
GROUP BY 1`
    },
    {
      // Per-route traffic, the one dimension the rest of this report does not
      // cover: every other grouping is by artist, provider, or CTA location.
      // `source_path` is the page the beacon fired from, so this is the only
      // query that can answer "which routes earn views and clicks".
      // Consumed by scripts/audit-indexable-surface.mjs via --route-traffic.
      key: "trafficByRoute",
      sql: `SELECT COALESCE(NULLIF(TRIM(source_path), ''), '(none)') AS source_path, event_name, COUNT(*) AS events
FROM analytics_events
WHERE event_name IN ('page_view', 'provider_click', 'outbound_click')${since}
GROUP BY 1, 2`
    },
    {
      key: "priceSnapshotSplit",
      sql: `SELECT CASE
    WHEN json_extract(metadata_json, '$.priceSnapshot') = 'present'
      OR json_extract(metadata_json, '$.hasPrice') IN (1, 'true') THEN 'with_price_snapshot'
    ELSE 'without_price_snapshot'
  END AS bucket, COUNT(*) AS clicks
FROM analytics_events
WHERE event_name = 'provider_click'${since}
GROUP BY 1`
    }
  ];
  for (const statement of statements) assertReadOnlySql(statement.sql);
  return statements;
}

// ── D1 execution (read-only) ────────────────────────────────────────────────

function parseWranglerJson(stdout, statements) {
  let parsed;
  try {
    parsed = JSON.parse(stdout);
  } catch (error) {
    throw new Error(`wrangler d1 execute did not return JSON: ${String(stdout).slice(0, 200)}`);
  }
  if (!Array.isArray(parsed) || parsed.length !== statements.length) {
    throw new Error(`Expected ${statements.length} result sets, got ${Array.isArray(parsed) ? parsed.length : typeof parsed}`);
  }
  const output = {};
  statements.forEach((statement, index) => {
    const entry = parsed[index];
    if (!entry || entry.success !== true || !Array.isArray(entry.results)) {
      throw new Error(`Query '${statement.key}' did not succeed`);
    }
    output[statement.key] = entry.results;
  });
  return output;
}

async function runStatements(statements, options) {
  const sql = [
    "-- Generated by scripts/report-analytics-funnel.mjs (read-only funnel report; SELECT statements only)",
    ...statements.map((statement) => `${assertReadOnlySql(statement.sql)};`),
    ""
  ].join("\n");
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "ttc-funnel-report-"));
  const sqlPath = path.join(tempDir, "funnel-report.sql");
  await fs.writeFile(sqlPath, sql, "utf8");
  const args = ["wrangler", "d1", "execute", options.database, options.remote ? "--remote" : "--local", "--file", sqlPath, "--json"];
  try {
    const result = await execFileAsync("npx", args, { cwd: REPO_ROOT, maxBuffer: 1024 * 1024 * 10 });
    return parseWranglerJson(result.stdout, statements);
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true });
  }
}

// ── Aggregation (pure, unit-tested by --self-test) ──────────────────────────

function rate(numerator, denominator) {
  if (!denominator) return null;
  return numerator / denominator;
}

function formatRate(value) {
  return value === null ? "n/a" : `${(value * 100).toFixed(2)}%`;
}

function indexClickRows(rows, dimensionKey) {
  const byDimension = new Map();
  for (const row of rows) {
    const dimension = String(row[dimensionKey] ?? "(none)");
    if (!byDimension.has(dimension)) byDimension.set(dimension, { provider_clicks: 0, outbound_clicks: 0 });
    const entry = byDimension.get(dimension);
    if (row.event_name === "provider_click") entry.provider_clicks += Number(row.clicks) || 0;
    else if (row.event_name === "outbound_click") entry.outbound_clicks += Number(row.clicks) || 0;
  }
  return byDimension;
}

function summarizeProviders(clickRows, totalPageViews) {
  return [...indexClickRows(clickRows, "provider").entries()]
    .map(([provider, counts]) => ({
      provider,
      provider_clicks: counts.provider_clicks,
      outbound_clicks: counts.outbound_clicks,
      ctr_vs_all_page_views: rate(counts.outbound_clicks, totalPageViews),
      redirect_completion_rate: rate(counts.outbound_clicks, counts.provider_clicks)
    }))
    .sort((a, b) => b.outbound_clicks - a.outbound_clicks || b.provider_clicks - a.provider_clicks || a.provider.localeCompare(b.provider));
}

function summarizeArtists(clickRows, pageViewRows) {
  const viewsByArtist = new Map(pageViewRows.map((row) => [String(row.artist_slug), Number(row.views) || 0]));
  return [...indexClickRows(clickRows, "artist_slug").entries()]
    .map(([artistSlug, counts]) => {
      const pageViews = viewsByArtist.get(artistSlug) ?? 0;
      return {
        artist_slug: artistSlug,
        page_views: pageViews,
        provider_clicks: counts.provider_clicks,
        outbound_clicks: counts.outbound_clicks,
        total_clicks: counts.provider_clicks + counts.outbound_clicks,
        ctr_vs_artist_page_views: rate(counts.outbound_clicks, pageViews)
      };
    })
    .sort((a, b) => b.total_clicks - a.total_clicks || a.artist_slug.localeCompare(b.artist_slug));
}

function summarizeCtaLocations(rows, totalPageViews) {
  return rows
    .map((row) => {
      const clicks = Number(row.clicks) || 0;
      return {
        cta_location: String(row.cta_location ?? "(none)"),
        provider_clicks: clicks,
        ctr_vs_all_page_views: rate(clicks, totalPageViews)
      };
    })
    .sort((a, b) => b.provider_clicks - a.provider_clicks || a.cta_location.localeCompare(b.cta_location));
}

function summarizePriceSnapshot(rows) {
  let withSnapshot = 0;
  let withoutSnapshot = 0;
  for (const row of rows) {
    const clicks = Number(row.clicks) || 0;
    if (row.bucket === "with_price_snapshot") withSnapshot += clicks;
    else withoutSnapshot += clicks;
  }
  const total = withSnapshot + withoutSnapshot;
  return {
    with_price_snapshot: withSnapshot,
    without_price_snapshot: withoutSnapshot,
    total_provider_clicks: total,
    with_share: rate(withSnapshot, total),
    with_vs_without_ratio: withoutSnapshot > 0 ? withSnapshot / withoutSnapshot : null
  };
}

function topArtists(artistSummary, limit) {
  return artistSummary.filter((row) => row.total_clicks > 0).slice(0, limit);
}

function buildReport(resultSets, options, sinceIso) {
  const totalPageViews = resultSets.pageViewsByArtist.reduce((sum, row) => sum + (Number(row.views) || 0), 0);
  const artists = summarizeArtists(resultSets.clicksByArtist, resultSets.pageViewsByArtist);
  return {
    window: {
      days: options.days,
      since: sinceIso || null,
      database: options.database,
      remote: options.remote
    },
    total_page_views: totalPageViews,
    ctr_by_provider: summarizeProviders(resultSets.clicksByProvider, totalPageViews),
    ctr_by_artist: artists,
    ctr_by_cta_location: summarizeCtaLocations(resultSets.clicksByCtaLocation, totalPageViews),
    price_snapshot_split: summarizePriceSnapshot(resultSets.priceSnapshotSplit),
    top_artists_by_click_volume: topArtists(artists, options.top)
  };
}

// ── Output ──────────────────────────────────────────────────────────────────

function renderTable(headers, rows) {
  const cells = [headers, ...rows.map((row) => row.map((value) => String(value)))];
  const widths = headers.map((_, column) => Math.max(...cells.map((row) => row[column].length)));
  return cells
    .map((row, index) => {
      const line = row.map((value, column) => value.padEnd(widths[column])).join("  ").trimEnd();
      return index === 0 ? `${line}\n${widths.map((width) => "-".repeat(width)).join("  ")}` : line;
    })
    .join("\n");
}

function renderReport(report) {
  const lines = [];
  const windowLabel = report.window.days ? `last ${report.window.days} day(s), since ${report.window.since}` : "all time";
  lines.push("=== Analytics Funnel Report ===");
  lines.push(`Database: ${report.window.database} (${report.window.remote ? "remote" : "local"}) · Window: ${windowLabel}`);
  lines.push(`Total page views: ${report.total_page_views}`);
  lines.push("");

  lines.push("-- Outbound CTR by provider (outbound clicks / total page views; completion = outbound / CTA clicks) --");
  lines.push(renderTable(
    ["provider", "cta_clicks", "outbound_clicks", "ctr", "completion"],
    report.ctr_by_provider.map((row) => [row.provider, row.provider_clicks, row.outbound_clicks, formatRate(row.ctr_vs_all_page_views), formatRate(row.redirect_completion_rate)])
  ));
  lines.push("");

  lines.push("-- Outbound CTR by artist (outbound clicks / that artist's page views) --");
  lines.push(renderTable(
    ["artist", "page_views", "cta_clicks", "outbound_clicks", "ctr"],
    report.ctr_by_artist.map((row) => [row.artist_slug, row.page_views, row.provider_clicks, row.outbound_clicks, formatRate(row.ctr_vs_artist_page_views)])
  ));
  lines.push("");

  lines.push("-- Outbound CTR by ctaLocation (CTA clicks / total page views; ctaLocation exists only on provider_click) --");
  lines.push(renderTable(
    ["cta_location", "cta_clicks", "ctr"],
    report.ctr_by_cta_location.map((row) => [row.cta_location, row.provider_clicks, formatRate(row.ctr_vs_all_page_views)])
  ));
  lines.push("");

  const price = report.price_snapshot_split;
  lines.push("-- CTA clicks on events with a price snapshot vs without (provider_click only) --");
  lines.push(`with snapshot: ${price.with_price_snapshot} · without: ${price.without_price_snapshot} · with-share: ${formatRate(price.with_share)} · with:without ratio: ${price.with_vs_without_ratio === null ? "n/a" : price.with_vs_without_ratio.toFixed(2)}`);
  lines.push("");

  lines.push("-- Top artist pages by click volume (CTA + outbound clicks) --");
  lines.push(renderTable(
    ["artist", "total_clicks", "cta_clicks", "outbound_clicks", "page_views"],
    report.top_artists_by_click_volume.map((row) => [row.artist_slug, row.total_clicks, row.provider_clicks, row.outbound_clicks, row.page_views])
  ));
  return lines.join("\n");
}

// ── Self-test ───────────────────────────────────────────────────────────────

function selfTest() {
  let tests = 0;
  const check = (fn) => {
    fn();
    tests += 1;
  };

  check(() => {
    const options = parseArgs(["--days", "7", "--top", "3", "--local", "--json", "--database", "demo-db"]);
    assert.deepEqual(options, { selfTest: false, days: 7, top: 3, database: "demo-db", remote: false, json: true, help: false, routeTraffic: "" });
  });
  check(() => assert.throws(() => parseArgs(["--days", "-1"]), /non-negative/));
  check(() => assert.throws(() => parseArgs(["--bogus"]), /Unknown argument/));

  check(() => {
    const now = new Date("2026-07-22T12:00:00.000Z");
    assert.equal(computeSinceIso(30, now), "2026-06-22T12:00:00.000Z");
    assert.equal(computeSinceIso(0, now), "");
  });
  check(() => assert.throws(() => windowClause("2026-01-01' OR 1=1 --"), /Refusing/));

  check(() => {
    assert.throws(() => assertReadOnlySql("DELETE FROM analytics_events"), /not a SELECT/);
    assert.throws(() => assertReadOnlySql("SELECT 1; DROP TABLE analytics_events"), /Multiple statements|non-read-only/);
    assert.equal(assertReadOnlySql("-- comment\nSELECT 1;"), "SELECT 1;");
  });

  check(() => {
    const shaped = buildRouteTraffic(
      [
        { source_path: "/artists/harry-styles", event_name: "page_view", events: 40 },
        { source_path: "/artists/harry-styles", event_name: "provider_click", events: 6 },
        { source_path: "/artists/harry-styles", event_name: "outbound_click", events: 5 },
        { source_path: "/artists/harry-styles?utm_source=x#show-1", event_name: "page_view", events: 2 },
        { source_path: "/cities/london-united-kingdom/", event_name: "page_view", events: 3 },
        { source_path: "(none)", event_name: "page_view", events: 99 },
        { source_path: "", event_name: "page_view", events: 99 },
        { source_path: "https://evil.example/x", event_name: "page_view", events: 99 }
      ],
      "2026-07-31T00:00:00.000Z"
    );
    assert.equal(shaped.generated_at, "2026-07-31T00:00:00.000Z");
    // Query and hash are stripped, and the trailing slash normalises, so a
    // route's traffic is not split across several keys.
    assert.deepEqual(shaped.routes["/artists/harry-styles"], { views: 42, provider_clicks: 6, outbound_clicks: 5 });
    assert.deepEqual(shaped.routes["/cities/london-united-kingdom"], { views: 3, provider_clicks: 0, outbound_clicks: 0 });
    // Unattributable rows are dropped rather than bucketed under a made-up path.
    assert.equal(Object.keys(shaped.routes).length, 2);
  });

  check(() => {
    const statements = buildStatements("2026-06-22T12:00:00.000Z");
    assert.deepEqual(statements.map((s) => s.key), ["pageViewsByArtist", "clicksByProvider", "clicksByArtist", "clicksByCtaLocation", "trafficByRoute", "priceSnapshotSplit"]);
    for (const statement of statements) {
      assert.match(statement.sql, /^SELECT/);
      assert.match(statement.sql, /created_at >= '2026-06-22T12:00:00\.000Z'/);
      assert.match(statement.sql, /FROM analytics_events/);
    }
    for (const statement of buildStatements("")) assert.doesNotMatch(statement.sql, /created_at >=/);
  });

  const fixtures = {
    pageViewsByArtist: [
      { artist_slug: "(site)", views: 100 },
      { artist_slug: "artist-a", views: 50 },
      { artist_slug: "artist-b", views: 25 }
    ],
    clicksByProvider: [
      { event_name: "provider_click", provider: "seatgeek", clicks: 20 },
      { event_name: "outbound_click", provider: "seatgeek", clicks: 14 },
      { event_name: "outbound_click", provider: "ticketmaster", clicks: 7 }
    ],
    clicksByArtist: [
      { event_name: "provider_click", artist_slug: "artist-a", clicks: 20 },
      { event_name: "outbound_click", artist_slug: "artist-a", clicks: 10 },
      { event_name: "outbound_click", artist_slug: "artist-b", clicks: 5 },
      { event_name: "outbound_click", artist_slug: "artist-gone", clicks: 2 }
    ],
    clicksByCtaLocation: [
      { cta_location: "event_card", clicks: 14 },
      { cta_location: "artist_provider_panel", clicks: 35 }
    ],
    priceSnapshotSplit: [
      { bucket: "with_price_snapshot", clicks: 15 },
      { bucket: "without_price_snapshot", clicks: 5 }
    ]
  };

  check(() => {
    const report = buildReport(fixtures, { days: 30, top: 2, database: DEFAULT_D1_DATABASE, remote: true }, "2026-06-22T12:00:00.000Z");
    assert.equal(report.total_page_views, 175);

    const seatgeek = report.ctr_by_provider.find((row) => row.provider === "seatgeek");
    assert.equal(seatgeek.outbound_clicks, 14);
    assert.equal(seatgeek.ctr_vs_all_page_views, 14 / 175);
    assert.equal(seatgeek.redirect_completion_rate, 14 / 20);
    const ticketmaster = report.ctr_by_provider.find((row) => row.provider === "ticketmaster");
    assert.equal(ticketmaster.redirect_completion_rate, null);

    const artistA = report.ctr_by_artist.find((row) => row.artist_slug === "artist-a");
    assert.equal(artistA.page_views, 50);
    assert.equal(artistA.ctr_vs_artist_page_views, 10 / 50);
    const artistGone = report.ctr_by_artist.find((row) => row.artist_slug === "artist-gone");
    assert.equal(artistGone.page_views, 0);
    assert.equal(artistGone.ctr_vs_artist_page_views, null);

    assert.equal(report.ctr_by_cta_location[0].cta_location, "artist_provider_panel");
    assert.equal(report.ctr_by_cta_location[0].ctr_vs_all_page_views, 35 / 175);

    assert.equal(report.price_snapshot_split.with_share, 15 / 20);
    assert.equal(report.price_snapshot_split.with_vs_without_ratio, 3);

    assert.deepEqual(report.top_artists_by_click_volume.map((row) => row.artist_slug), ["artist-a", "artist-b"]);
  });

  check(() => {
    const split = summarizePriceSnapshot([{ bucket: "with_price_snapshot", clicks: 4 }]);
    assert.equal(split.without_price_snapshot, 0);
    assert.equal(split.with_vs_without_ratio, null);
    assert.deepEqual(summarizePriceSnapshot([]), {
      with_price_snapshot: 0,
      without_price_snapshot: 0,
      total_provider_clicks: 0,
      with_share: null,
      with_vs_without_ratio: null
    });
  });

  check(() => {
    const statements = buildStatements("");
    const stdout = JSON.stringify(statements.map((statement, index) => ({ success: true, results: [{ marker: index }], meta: {} })));
    const parsed = parseWranglerJson(stdout, statements);
    // Result sets are matched to statements by position, so these markers lock
    // the ordering: inserting a statement must be a deliberate, visible change.
    assert.equal(parsed.trafficByRoute[0].marker, 4);
    assert.equal(parsed.priceSnapshotSplit[0].marker, 5);
    assert.throws(() => parseWranglerJson("🌀 Executing…", statements), /did not return JSON/);
    assert.throws(() => parseWranglerJson("[]", statements), /result sets/);
    assert.throws(() => parseWranglerJson(JSON.stringify(statements.map(() => ({ success: false, results: [] }))), statements), /did not succeed/);
  });

  check(() => {
    assert.equal(formatRate(null), "n/a");
    assert.equal(formatRate(0.12345), "12.35%");
    const table = renderTable(["a", "bb"], [["1", "2"]]);
    assert.match(table, /a +bb/);
  });

  check(() => {
    const report = buildReport(fixtures, { days: 0, top: 5, database: DEFAULT_D1_DATABASE, remote: false }, "");
    const rendered = renderReport(report);
    assert.match(rendered, /Analytics Funnel Report/);
    assert.match(rendered, /all time/);
    assert.match(rendered, /seatgeek/);
    assert.match(rendered, /with snapshot: 15/);
  });

  return { tests };
}

/**
 * Shape the trafficByRoute rows into the per-route export the indexable-surface
 * audit reads. Pure, so --self-test covers it without touching D1.
 *
 * `provider_clicks` counts `provider_click` (the CTA press) rather than
 * `outbound_click` (the /api/out redirect), matching what the rest of this
 * report calls a provider click; both are carried so a consumer can tell the
 * difference between a click and a completed redirect.
 *
 * @param {Array<{source_path: string, event_name: string, events: number}>} rows
 * @param {string} generatedAt ISO timestamp.
 */
export function buildRouteTraffic(rows, generatedAt) {
  const routes = {};
  for (const row of Array.isArray(rows) ? rows : []) {
    const routePath = String(row?.source_path ?? "").trim();
    // Drop rows with no usable path rather than inventing a bucket for them:
    // an unattributed beacon cannot be assigned to a route.
    if (!routePath || routePath === "(none)" || !routePath.startsWith("/")) continue;
    const clean = routePath.split("#")[0].split("?")[0].replace(/\/$/, "") || "/";
    if (!routes[clean]) routes[clean] = { views: 0, provider_clicks: 0, outbound_clicks: 0 };
    const count = Number(row.events) || 0;
    if (row.event_name === "page_view") routes[clean].views += count;
    else if (row.event_name === "provider_click") routes[clean].provider_clicks += count;
    else if (row.event_name === "outbound_click") routes[clean].outbound_clicks += count;
  }
  return { generated_at: generatedAt, routes };
}

// ── Entry point ─────────────────────────────────────────────────────────────

async function main() {
  let options;
  try {
    options = parseArgs(process.argv.slice(2));
  } catch (error) {
    console.error(error.message);
    console.error(usage());
    process.exit(2);
  }
  if (options.help) {
    console.log(usage());
    return;
  }
  if (options.selfTest) {
    const result = selfTest();
    console.log(`Funnel report self-test passed (${result.tests} checks).`);
    return;
  }

  const now = process.env.TTC_NOW ? new Date(process.env.TTC_NOW) : new Date();
  if (Number.isNaN(now.getTime())) throw new Error("TTC_NOW is not a valid timestamp");
  const sinceIso = computeSinceIso(options.days, now);
  const statements = buildStatements(sinceIso);
  const resultSets = await runStatements(statements, options);
  const report = buildReport(resultSets, options, sinceIso);
  if (options.routeTraffic) {
    const exported = buildRouteTraffic(resultSets.trafficByRoute, now.toISOString());
    const outPath = path.isAbsolute(options.routeTraffic)
      ? options.routeTraffic
      : path.join(REPO_ROOT, options.routeTraffic);
    await fs.mkdir(path.dirname(outPath), { recursive: true });
    await fs.writeFile(outPath, `${JSON.stringify(exported, null, 2)}\n`, "utf8");
    console.error(`Route traffic written to ${outPath} (${Object.keys(exported.routes).length} routes).`);
  }
  console.log(options.json ? JSON.stringify(report, null, 2) : renderReport(report));
}

main().catch((error) => {
  console.error(`Funnel report failed: ${error.message}`);
  process.exit(1);
});
