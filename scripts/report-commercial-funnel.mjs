#!/usr/bin/env node
// Owner-facing commercial funnel report over the DEMAND_DB analytics_events
// table, joined against the repo's own artist/event data for coverage context.
//
// The funnel it measures, in order:
//   1. page_view          — a page was rendered
//   2. artist_view        — the page was about a specific artist
//   3. event_view         — a specific date was actually looked at
//   4. provider_cta_view  — a provider CTA was actually on screen
//   5. provider_click     — the visitor clicked a CTA (client-reported intent)
//   6. outbound_click     — /api/out issued the redirect (AUTHORITATIVE)
//   7. email_signup       — a watchlist/alert-interest address was left
//
// Every provider-click figure in this report is counted from `outbound_click`,
// the server-side row written by /api/out. `provider_click` is reported beside
// it only as a completion-rate diagnostic; it is never added to it, so a
// double-firing client cannot inflate the funnel.
//
// Every statement is a SELECT executed through `wrangler d1 execute` — this
// script never writes to D1 and creates no tables. Columns holding personal
// data (`email`, `user_agent`, `request_key` as a value) are never selected;
// `request_key` appears only inside COUNT(DISTINCT ...) so visitors can be
// counted without being listed.
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

// Minimum volumes. Below these a rate is arithmetic, not evidence: one click on
// two views is not a 50% conversion rate, and presenting it as one is how a
// tiny sample turns into a bad decision. Rates under the threshold are reported
// as "low volume" rather than as a number.
const DEFAULT_MIN_VIEWS_FOR_RATE = 30;
const DEFAULT_MIN_CLICKS_FOR_RANKING = 3;

function usage() {
  return `Usage: node scripts/report-commercial-funnel.mjs [options]

Owner-facing commercial funnel report over DEMAND_DB analytics_events. Counts
sessions, artist/event views, provider clicks and click-through rate, splits
clicks by artist, provider, page type and affiliate status, and flags pages with
traffic but no clicks, artists with clicks but weak provider coverage, and
signups from pages with no current dates.

Provider clicks are counted from the server-side outbound_click row written by
/api/out. Only SELECT statements are executed — nothing is written to D1.

Options:
  --days <n>            Report window in days (default: ${DEFAULT_WINDOW_DAYS}; 0 = all time)
  --since <iso-date>    Window start as YYYY-MM-DD (overrides --days)
  --until <iso-date>    Window end as YYYY-MM-DD (exclusive; defaults to now)
  --top <n>             Rows shown in each ranked table (default: ${DEFAULT_TOP_LIMIT})
  --min-views <n>       Minimum views before a rate is reported (default: ${DEFAULT_MIN_VIEWS_FOR_RATE})
  --min-clicks <n>      Minimum clicks before a row is ranked (default: ${DEFAULT_MIN_CLICKS_FOR_RANKING})
  --database <name>     D1 database name (default: ${DEFAULT_D1_DATABASE})
  --local               Query local D1 instead of remote D1
  --json                Emit machine-readable summary JSON
  --self-test           Run local unit tests only; no network and no D1 access
  -h, --help            Show this help

Environment:
  CLOUDFLARE_API_TOKEN     Required by wrangler for remote queries
  CLOUDFLARE_ACCOUNT_ID    Required by wrangler for remote queries
  TTC_NOW                  Optional ISO timestamp override of "now" for deterministic testing

Reference: docs/COMMERCIAL_FUNNEL.md
`;
}

function parseIsoDate(value, flag) {
  const raw = String(value || "").trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(raw)) throw new Error(`${flag} requires a YYYY-MM-DD date`);
  const parsed = new Date(`${raw}T00:00:00.000Z`);
  if (Number.isNaN(parsed.getTime())) throw new Error(`${flag} is not a valid date`);
  return parsed.toISOString();
}

export function parseArgs(argv) {
  const options = {
    selfTest: false,
    days: DEFAULT_WINDOW_DAYS,
    since: "",
    until: "",
    top: DEFAULT_TOP_LIMIT,
    minViews: DEFAULT_MIN_VIEWS_FOR_RATE,
    minClicks: DEFAULT_MIN_CLICKS_FOR_RANKING,
    database: DEFAULT_D1_DATABASE,
    remote: true,
    json: false,
    help: false
  };
  const positiveInt = (value, flag, min = 1) => {
    const parsed = Number(value);
    if (!Number.isInteger(parsed) || parsed < min) throw new Error(`${flag} requires an integer >= ${min}`);
    return parsed;
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--self-test") options.selfTest = true;
    else if (arg === "--days") options.days = positiveInt(argv[++i], "--days", 0);
    else if (arg === "--since") options.since = parseIsoDate(argv[++i], "--since");
    else if (arg === "--until") options.until = parseIsoDate(argv[++i], "--until");
    else if (arg === "--top") options.top = positiveInt(argv[++i], "--top");
    else if (arg === "--min-views") options.minViews = positiveInt(argv[++i], "--min-views", 0);
    else if (arg === "--min-clicks") options.minClicks = positiveInt(argv[++i], "--min-clicks", 0);
    else if (arg === "--database") {
      const value = argv[++i];
      if (!value || value.startsWith("--")) throw new Error("--database requires a D1 database name");
      options.database = value;
    } else if (arg === "--local") options.remote = false;
    else if (arg === "--json") options.json = true;
    else if (arg === "-h" || arg === "--help") options.help = true;
    else throw new Error(`Unknown argument: ${arg}`);
  }
  if (options.since && options.until && options.until <= options.since) {
    throw new Error("--until must be after --since");
  }
  return options;
}

// ── SQL builders ────────────────────────────────────────────────────────────

export function computeWindow(options, now = new Date()) {
  const until = options.until || "";
  const since = options.since || (options.days ? new Date(now.getTime() - options.days * DAY_MS).toISOString() : "");
  return { since, until };
}

const ISO_PATTERN = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/;

export function windowClause({ since, until }) {
  let clause = "";
  // Only an internally generated ISO timestamp may be interpolated.
  if (since) {
    if (!ISO_PATTERN.test(since)) throw new Error(`Refusing to interpolate non-ISO window bound: ${since}`);
    clause += ` AND created_at >= '${since}'`;
  }
  if (until) {
    if (!ISO_PATTERN.test(until)) throw new Error(`Refusing to interpolate non-ISO window bound: ${until}`);
    clause += ` AND created_at < '${until}'`;
  }
  return clause;
}

export function assertReadOnlySql(sql) {
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

// Removes every `COUNT( ... )` span, matching parentheses so nested
// expressions come out whole. Used to check what a query actually *returns*
// rather than what it merely reads.
function stripAggregates(text) {
  let output = "";
  let index = 0;
  while (index < text.length) {
    const match = /count\s*\(/i.exec(text.slice(index));
    if (!match) {
      output += text.slice(index);
      break;
    }
    const start = index + match.index;
    output += text.slice(index, start);
    let depth = 0;
    let cursor = start + match[0].length - 1;
    for (; cursor < text.length; cursor += 1) {
      if (text[cursor] === "(") depth += 1;
      else if (text[cursor] === ")") {
        depth -= 1;
        if (depth === 0) break;
      }
    }
    index = cursor + 1;
  }
  return output;
}

// The list of expressions a statement returns: everything between the leading
// SELECT and its own FROM, ignoring anything inside parentheses.
function selectProjection(sql) {
  const body = sql.replace(/^\s*SELECT\b/i, "");
  let depth = 0;
  for (let index = 0; index < body.length; index += 1) {
    const char = body[index];
    if (char === "(") depth += 1;
    else if (char === ")") depth -= 1;
    else if (depth === 0 && /\s/.test(char) && /^\s*FROM\b/i.test(body.slice(index))) {
      return body.slice(0, index);
    }
  }
  return body;
}

// Personal-data columns must never leave the database. `email` and
// `user_agent` are not read at all; `request_key` may be read (a JOIN needs it
// to tie a click to a session) but may only be *returned* inside an aggregate,
// so visitors are counted and never listed.
export function assertNoPersonalColumns(sql) {
  const body = sql
    .split("\n")
    .filter((line) => !line.trim().startsWith("--"))
    .join("\n")
    .trim();
  if (/\bemail\b/i.test(body)) throw new Error(`Statement reads the email column: ${body.slice(0, 80)}`);
  if (/\buser_agent\b/i.test(body)) throw new Error(`Statement reads the user_agent column: ${body.slice(0, 80)}`);
  const returned = stripAggregates(selectProjection(body));
  if (/\brequest_key\b/i.test(returned)) {
    throw new Error(`Statement returns request_key outside an aggregate: ${body.slice(0, 80)}`);
  }
  return body;
}

// The authoritative outbound event, expressed once so no query can drift.
const OUTBOUND = "event_name = 'outbound_click'";

export function buildStatements(window) {
  const since = windowClause(window);
  const statements = [
    {
      key: "totals",
      sql: `SELECT event_name, COUNT(*) AS events, COUNT(DISTINCT request_key) AS visitors, COUNT(DISTINCT (request_key || substr(created_at, 1, 10))) AS sessions
FROM analytics_events
WHERE event_name IN ('page_view', 'artist_view', 'event_view', 'provider_cta_view', 'provider_click', 'outbound_click', 'outbound_blocked', 'email_signup', 'artist_interest', 'price_alert_interest')${since}
GROUP BY 1`
    },
    {
      key: "viewsByPageType",
      sql: `SELECT COALESCE(NULLIF(TRIM(page_type), ''), '(unlabelled)') AS page_type, COUNT(*) AS views, COUNT(DISTINCT (request_key || substr(created_at, 1, 10))) AS sessions
FROM analytics_events
WHERE event_name = 'page_view'${since}
GROUP BY 1`
    },
    {
      key: "clicksByPageType",
      sql: `SELECT COALESCE(NULLIF(TRIM(page_type), ''), '(unlabelled)') AS page_type, COUNT(*) AS clicks
FROM analytics_events
WHERE ${OUTBOUND}${since}
GROUP BY 1`
    },
    {
      key: "clicksByProvider",
      sql: `SELECT event_name, COALESCE(NULLIF(TRIM(provider), ''), '(none)') AS provider, COUNT(*) AS clicks
FROM analytics_events
WHERE event_name IN ('provider_click', 'outbound_click', 'outbound_blocked')${since}
GROUP BY 1, 2`
    },
    {
      key: "clicksByArtist",
      sql: `SELECT COALESCE(NULLIF(TRIM(artist_slug), ''), '(none)') AS artist_slug, COUNT(*) AS clicks
FROM analytics_events
WHERE ${OUTBOUND}${since}
GROUP BY 1`
    },
    {
      key: "viewsByArtist",
      // Deliberately counted from page_view rows carrying an artist slug rather
      // than from the newer artist_view event: page_view has carried the slug
      // since the table existed, so per-artist click-through stays comparable
      // with every row already in the database. artist_view is reported on its
      // own line in the funnel summary.
      sql: `SELECT COALESCE(NULLIF(TRIM(artist_slug), ''), '(none)') AS artist_slug, COUNT(*) AS views
FROM analytics_events
WHERE event_name = 'page_view' AND TRIM(COALESCE(artist_slug, '')) != ''${since}
GROUP BY 1`
    },
    {
      key: "affiliateSplit",
      sql: `SELECT CASE WHEN is_affiliate = 1 THEN 'affiliate' WHEN is_affiliate = 0 THEN 'non_affiliate' ELSE '(unlabelled)' END AS bucket,
  COALESCE(NULLIF(TRIM(destination_category), ''), '(unlabelled)') AS destination_category,
  COUNT(*) AS clicks
FROM analytics_events
WHERE ${OUTBOUND}${since}
GROUP BY 1, 2`
    },
    {
      key: "clicksByCtaLocation",
      sql: `SELECT COALESCE(NULLIF(TRIM(cta_location), ''), '(unlabelled)') AS cta_location, COUNT(*) AS clicks
FROM analytics_events
WHERE ${OUTBOUND}${since}
GROUP BY 1`
    },
    {
      key: "landingPageViews",
      sql: `SELECT COALESCE(NULLIF(TRIM(landing_path), ''), '(unknown)') AS landing_path, COUNT(DISTINCT (request_key || substr(created_at, 1, 10))) AS sessions
FROM analytics_events
WHERE event_name = 'page_view'${since}
GROUP BY 1`
    },
    {
      key: "landingPageClicks",
      // Attributes an outbound click to the landing page of the same visitor on
      // the same day. /api/out has no client session state, so the landing page
      // comes from that visitor's page_view rows — see the attribution caveats
      // in docs/COMMERCIAL_FUNNEL.md.
      sql: `SELECT COALESCE(NULLIF(TRIM(entry.landing_path), ''), '(unknown)') AS landing_path, COUNT(*) AS clicks
FROM analytics_events click
JOIN analytics_events entry
  ON entry.request_key = click.request_key
  AND substr(entry.created_at, 1, 10) = substr(click.created_at, 1, 10)
  AND entry.event_name = 'page_view'
  AND entry.landing_path IS NOT NULL
WHERE click.event_name = 'outbound_click'${since.replace(/created_at/g, "click.created_at")}
GROUP BY 1`
    },
    {
      key: "pageViewsByPath",
      sql: `SELECT COALESCE(NULLIF(TRIM(source_path), ''), '/') AS source_path, COALESCE(NULLIF(TRIM(page_type), ''), '(unlabelled)') AS page_type, COUNT(*) AS views, COUNT(DISTINCT (request_key || substr(created_at, 1, 10))) AS sessions
FROM analytics_events
WHERE event_name = 'page_view'${since}
GROUP BY 1, 2`
    },
    {
      key: "clicksByPath",
      sql: `SELECT COALESCE(NULLIF(TRIM(source_path), ''), '/') AS source_path, COUNT(*) AS clicks
FROM analytics_events
WHERE ${OUTBOUND}${since}
GROUP BY 1`
    },
    {
      key: "signupsByArtist",
      sql: `SELECT COALESCE(NULLIF(TRIM(artist_slug), ''), '(none)') AS artist_slug, event_name, COUNT(*) AS signups
FROM analytics_events
WHERE event_name IN ('email_signup', 'artist_interest', 'price_alert_interest')${since}
GROUP BY 1, 2`
    },
    {
      key: "blockedByStatus",
      sql: `SELECT COALESCE(NULLIF(TRIM(provider), ''), '(none)') AS provider, COALESCE(NULLIF(TRIM(json_extract(metadata_json, '$.status')), ''), '(unknown)') AS status, COUNT(*) AS blocked
FROM analytics_events
WHERE event_name = 'outbound_blocked'${since}
GROUP BY 1, 2`
    }
  ];
  for (const statement of statements) {
    assertReadOnlySql(statement.sql);
    assertNoPersonalColumns(statement.sql);
  }
  return statements;
}

// ── D1 execution (read-only) ────────────────────────────────────────────────

export function parseWranglerJson(stdout, statements) {
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
    "-- Generated by scripts/report-commercial-funnel.mjs (read-only funnel report; SELECT statements only)",
    ...statements.map((statement) => `${assertReadOnlySql(statement.sql)};`),
    ""
  ].join("\n");
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "ttc-commercial-funnel-"));
  const sqlPath = path.join(tempDir, "commercial-funnel.sql");
  await fs.writeFile(sqlPath, sql, "utf8");
  const args = ["wrangler", "d1", "execute", options.database, options.remote ? "--remote" : "--local", "--file", sqlPath, "--json"];
  try {
    const result = await execFileAsync("npx", args, { cwd: REPO_ROOT, maxBuffer: 1024 * 1024 * 10 });
    return parseWranglerJson(result.stdout, statements);
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true });
  }
}

// ── Repo-side coverage context ──────────────────────────────────────────────
// Provider coverage and "has current dates" are facts about the catalogue, not
// about traffic, so they are read from the repo rather than from D1. This is
// what lets the report say "these artists earn clicks but only one provider
// publishes for them" — the single most actionable commercial signal here.

export function buildCoverageIndex({ artists = [], events = [], now = new Date() }) {
  const nowMs = now.getTime();
  const byArtist = new Map();
  for (const artist of artists) {
    const slug = String(artist?.slug || "").trim();
    if (!slug) continue;
    byArtist.set(slug, {
      artist_slug: slug,
      indexing_status: String(artist?.indexing_status || ""),
      upcoming_events: 0,
      events_with_affiliate_link: 0,
      provider_link_counts: { seatgeek: 0, "vivid-seats": 0, ticketnetwork: 0, "ticket-liquidator": 0, "stubhub-international": 0 }
    });
  }
  for (const event of events) {
    const slug = String(event?.artist_slug || "").trim();
    const entry = byArtist.get(slug);
    if (!entry) continue;
    const time = Date.parse(event?.datetime_iso || "");
    if (!Number.isFinite(time) || time < nowMs) continue;
    entry.upcoming_events += 1;
    let hasAffiliate = false;
    for (const provider of Object.keys(entry.provider_link_counts)) {
      if (event?.provider_links?.[provider]?.verified === true) {
        entry.provider_link_counts[provider] += 1;
        hasAffiliate = true;
      }
    }
    if (hasAffiliate) entry.events_with_affiliate_link += 1;
  }
  for (const entry of byArtist.values()) {
    entry.distinct_affiliate_providers = Object.values(entry.provider_link_counts).filter((count) => count > 0).length;
    entry.affiliate_coverage = entry.upcoming_events
      ? entry.events_with_affiliate_link / entry.upcoming_events
      : null;
  }
  return byArtist;
}

async function loadCoverageIndex(now) {
  const read = async (relative) => JSON.parse(await fs.readFile(path.join(REPO_ROOT, relative), "utf8"));
  const [artists, events] = await Promise.all([
    read("public/data/artists.json"),
    read("public/data/events.json")
  ]);
  return buildCoverageIndex({
    artists: Array.isArray(artists) ? artists : [],
    events: Array.isArray(events) ? events : [],
    now
  });
}

// ── Aggregation (pure, unit-tested by --self-test) ──────────────────────────

export function rate(numerator, denominator, minimumDenominator = 0) {
  if (!denominator || denominator < minimumDenominator) return null;
  return numerator / denominator;
}

function formatRate(value, denominator, minimum) {
  if (value === null) return denominator > 0 && denominator < minimum ? `low volume (n=${denominator})` : "n/a";
  return `${(value * 100).toFixed(2)}%`;
}

function toCountMap(rows, key, valueKey) {
  const map = new Map();
  for (const row of rows) map.set(String(row[key] ?? ""), Number(row[valueKey]) || 0);
  return map;
}

function sumRows(rows, valueKey) {
  return rows.reduce((total, row) => total + (Number(row[valueKey]) || 0), 0);
}

export function buildReport(resultSets, options, window, coverage = new Map()) {
  const totalsByEvent = new Map();
  for (const row of resultSets.totals) {
    totalsByEvent.set(String(row.event_name), {
      events: Number(row.events) || 0,
      visitors: Number(row.visitors) || 0,
      sessions: Number(row.sessions) || 0
    });
  }
  const at = (name) => totalsByEvent.get(name) || { events: 0, visitors: 0, sessions: 0 };

  const pageViews = at("page_view");
  const outbound = at("outbound_click").events;
  const providerClicks = at("provider_click").events;
  const ctaViews = at("provider_cta_view").events;

  const funnel = {
    sessions: pageViews.sessions,
    visitors: pageViews.visitors,
    page_views: pageViews.events,
    artist_views: at("artist_view").events,
    event_views: at("event_view").events,
    provider_cta_views: ctaViews,
    provider_clicks_client: providerClicks,
    provider_clicks: outbound,
    outbound_blocked: at("outbound_blocked").events,
    signups: at("email_signup").events + at("artist_interest").events + at("price_alert_interest").events,
    click_through_rate_per_session: rate(outbound, pageViews.sessions, options.minViews),
    click_through_rate_per_page_view: rate(outbound, pageViews.events, options.minViews),
    click_through_rate_per_cta_view: rate(outbound, ctaViews, options.minViews),
    cta_click_to_redirect_rate: rate(outbound, providerClicks, options.minClicks)
  };

  const clicksByProviderRows = resultSets.clicksByProvider;
  const providerIndex = new Map();
  for (const row of clicksByProviderRows) {
    const provider = String(row.provider ?? "(none)");
    if (!providerIndex.has(provider)) providerIndex.set(provider, { provider, provider_clicks_client: 0, provider_clicks: 0, blocked: 0 });
    const entry = providerIndex.get(provider);
    const clicks = Number(row.clicks) || 0;
    if (row.event_name === "outbound_click") entry.provider_clicks += clicks;
    else if (row.event_name === "provider_click") entry.provider_clicks_client += clicks;
    else if (row.event_name === "outbound_blocked") entry.blocked += clicks;
  }
  const byProvider = [...providerIndex.values()]
    .map((entry) => ({
      ...entry,
      share_of_clicks: rate(entry.provider_clicks, outbound),
      redirect_completion_rate: rate(entry.provider_clicks, entry.provider_clicks_client, options.minClicks)
    }))
    .sort((a, b) => b.provider_clicks - a.provider_clicks || a.provider.localeCompare(b.provider));

  const artistViews = toCountMap(resultSets.viewsByArtist, "artist_slug", "views");
  const byArtist = resultSets.clicksByArtist
    .map((row) => {
      const slug = String(row.artist_slug ?? "(none)");
      const clicks = Number(row.clicks) || 0;
      const views = artistViews.get(slug) ?? 0;
      return {
        artist_slug: slug,
        artist_views: views,
        provider_clicks: clicks,
        click_through_rate: rate(clicks, views, options.minViews)
      };
    })
    .sort((a, b) => b.provider_clicks - a.provider_clicks || a.artist_slug.localeCompare(b.artist_slug));

  const pageTypeClicks = toCountMap(resultSets.clicksByPageType, "page_type", "clicks");
  const byPageType = resultSets.viewsByPageType
    .map((row) => {
      const pageType = String(row.page_type ?? "(unlabelled)");
      const views = Number(row.views) || 0;
      const clicks = pageTypeClicks.get(pageType) ?? 0;
      pageTypeClicks.delete(pageType);
      return {
        page_type: pageType,
        page_views: views,
        sessions: Number(row.sessions) || 0,
        provider_clicks: clicks,
        click_through_rate: rate(clicks, views, options.minViews)
      };
    })
    .concat([...pageTypeClicks.entries()].map(([pageType, clicks]) => ({
      page_type: pageType,
      page_views: 0,
      sessions: 0,
      provider_clicks: clicks,
      click_through_rate: null
    })))
    .sort((a, b) => b.provider_clicks - a.provider_clicks || b.page_views - a.page_views || a.page_type.localeCompare(b.page_type));

  const affiliate = { affiliate: 0, non_affiliate: 0, unlabelled: 0 };
  const destinationCategories = new Map();
  for (const row of resultSets.affiliateSplit) {
    const clicks = Number(row.clicks) || 0;
    const bucket = String(row.bucket ?? "(unlabelled)");
    if (bucket === "affiliate") affiliate.affiliate += clicks;
    else if (bucket === "non_affiliate") affiliate.non_affiliate += clicks;
    else affiliate.unlabelled += clicks;
    const category = String(row.destination_category ?? "(unlabelled)");
    destinationCategories.set(category, (destinationCategories.get(category) || 0) + clicks);
  }
  const affiliateTotal = affiliate.affiliate + affiliate.non_affiliate + affiliate.unlabelled;

  const landingSessions = toCountMap(resultSets.landingPageViews, "landing_path", "sessions");
  const topLandingPages = resultSets.landingPageClicks
    .map((row) => {
      const landingPath = String(row.landing_path ?? "(unknown)");
      const clicks = Number(row.clicks) || 0;
      const sessions = landingSessions.get(landingPath) ?? 0;
      return {
        landing_path: landingPath,
        sessions,
        provider_clicks: clicks,
        click_through_rate: rate(clicks, sessions, options.minViews)
      };
    })
    .filter((row) => row.provider_clicks >= options.minClicks)
    .sort((a, b) => b.provider_clicks - a.provider_clicks || a.landing_path.localeCompare(b.landing_path))
    .slice(0, options.top);

  const clicksByPath = toCountMap(resultSets.clicksByPath, "source_path", "clicks");
  const pagesWithoutClicks = resultSets.pageViewsByPath
    .map((row) => ({
      source_path: String(row.source_path ?? "/"),
      page_type: String(row.page_type ?? "(unlabelled)"),
      page_views: Number(row.views) || 0,
      sessions: Number(row.sessions) || 0,
      provider_clicks: clicksByPath.get(String(row.source_path ?? "/")) ?? 0
    }))
    .filter((row) => row.provider_clicks === 0 && row.page_views >= options.minViews)
    .sort((a, b) => b.page_views - a.page_views || a.source_path.localeCompare(b.source_path))
    .slice(0, options.top);

  const weakCoverage = byArtist
    .filter((row) => row.provider_clicks >= options.minClicks)
    .map((row) => {
      const entry = coverage.get(row.artist_slug);
      if (!entry) return null;
      return {
        artist_slug: row.artist_slug,
        provider_clicks: row.provider_clicks,
        upcoming_events: entry.upcoming_events,
        distinct_affiliate_providers: entry.distinct_affiliate_providers,
        affiliate_coverage: entry.affiliate_coverage
      };
    })
    .filter((row) => row && (row.distinct_affiliate_providers <= 1 || (row.affiliate_coverage !== null && row.affiliate_coverage < 0.5)))
    .sort((a, b) => b.provider_clicks - a.provider_clicks)
    .slice(0, options.top);

  const signupsByArtist = new Map();
  for (const row of resultSets.signupsByArtist) {
    const slug = String(row.artist_slug ?? "(none)");
    signupsByArtist.set(slug, (signupsByArtist.get(slug) || 0) + (Number(row.signups) || 0));
  }
  const signupsOnDatelessPages = [...signupsByArtist.entries()]
    .map(([slug, signups]) => {
      const entry = coverage.get(slug);
      if (!entry) return null;
      return { artist_slug: slug, signups, upcoming_events: entry.upcoming_events };
    })
    .filter((row) => row && row.upcoming_events === 0 && row.signups > 0)
    .sort((a, b) => b.signups - a.signups || a.artist_slug.localeCompare(b.artist_slug))
    .slice(0, options.top);

  const blocked = resultSets.blockedByStatus
    .map((row) => ({
      provider: String(row.provider ?? "(none)"),
      status: String(row.status ?? "(unknown)"),
      blocked: Number(row.blocked) || 0
    }))
    .sort((a, b) => b.blocked - a.blocked)
    .slice(0, options.top);

  return {
    window: {
      days: options.days,
      since: window.since || null,
      until: window.until || null,
      database: options.database,
      remote: options.remote,
      min_views_for_rate: options.minViews,
      min_clicks_for_ranking: options.minClicks
    },
    funnel,
    clicks_by_provider: byProvider,
    clicks_by_artist: byArtist.slice(0, options.top),
    clicks_by_page_type: byPageType,
    clicks_by_cta_location: resultSets.clicksByCtaLocation
      .map((row) => ({ cta_location: String(row.cta_location ?? "(unlabelled)"), provider_clicks: Number(row.clicks) || 0 }))
      .sort((a, b) => b.provider_clicks - a.provider_clicks),
    affiliate_split: {
      ...affiliate,
      total: affiliateTotal,
      affiliate_share: rate(affiliate.affiliate, affiliateTotal),
      destination_categories: [...destinationCategories.entries()]
        .map(([destination_category, clicks]) => ({ destination_category, clicks }))
        .sort((a, b) => b.clicks - a.clicks)
    },
    top_landing_pages: topLandingPages,
    pages_with_traffic_no_clicks: pagesWithoutClicks,
    artists_with_clicks_weak_coverage: weakCoverage,
    signups_on_pages_without_dates: signupsOnDatelessPages,
    blocked_redirects: blocked,
    total_page_views: pageViews.events
  };
}

// ── Output ──────────────────────────────────────────────────────────────────

function renderTable(headers, rows) {
  if (!rows.length) return "(none)";
  const cells = [headers, ...rows.map((row) => row.map((value) => String(value)))];
  const widths = headers.map((_, column) => Math.max(...cells.map((row) => row[column].length)));
  return cells
    .map((row, index) => {
      const line = row.map((value, column) => value.padEnd(widths[column])).join("  ").trimEnd();
      return index === 0 ? `${line}\n${widths.map((width) => "-".repeat(width)).join("  ")}` : line;
    })
    .join("\n");
}

export function renderReport(report) {
  const minViews = report.window.min_views_for_rate;
  const minClicks = report.window.min_clicks_for_ranking;
  const lines = [];
  const windowLabel = report.window.since
    ? `${report.window.since} → ${report.window.until || "now"}`
    : "all time";
  const funnel = report.funnel;

  lines.push("=== Commercial Funnel Report ===");
  lines.push(`Database: ${report.window.database} (${report.window.remote ? "remote" : "local"}) · Window: ${windowLabel}`);
  lines.push(`Thresholds: rates need >= ${minViews} views · rankings need >= ${minClicks} clicks`);
  lines.push("Provider clicks are counted from outbound_click (/api/out, server-side, authoritative).");
  lines.push("");

  lines.push("-- Funnel --");
  lines.push(renderTable(
    ["step", "count"],
    [
      ["sessions (visitor-day)", funnel.sessions],
      ["distinct visitors", funnel.visitors],
      ["page_view", funnel.page_views],
      ["artist_view", funnel.artist_views],
      ["event_view", funnel.event_views],
      ["provider_cta_view", funnel.provider_cta_views],
      ["provider_click (client intent)", funnel.provider_clicks_client],
      ["outbound_click (AUTHORITATIVE)", funnel.provider_clicks],
      ["outbound_blocked", funnel.outbound_blocked],
      ["signups", funnel.signups]
    ]
  ));
  lines.push("");
  lines.push(`Provider click-through rate: ${formatRate(funnel.click_through_rate_per_session, funnel.sessions, minViews)} per session · ${formatRate(funnel.click_through_rate_per_page_view, funnel.page_views, minViews)} per page view · ${formatRate(funnel.click_through_rate_per_cta_view, funnel.provider_cta_views, minViews)} per CTA impression`);
  lines.push(`CTA click → redirect completion: ${formatRate(funnel.cta_click_to_redirect_rate, funnel.provider_clicks_client, minClicks)}`);
  lines.push("");

  lines.push("-- Clicks by provider --");
  lines.push(renderTable(
    ["provider", "clicks", "share", "cta_clicks", "completion", "blocked"],
    report.clicks_by_provider.map((row) => [
      row.provider,
      row.provider_clicks,
      formatRate(row.share_of_clicks, report.funnel.provider_clicks, 0),
      row.provider_clicks_client,
      formatRate(row.redirect_completion_rate, row.provider_clicks_client, minClicks),
      row.blocked
    ])
  ));
  lines.push("");

  lines.push("-- Clicks by artist --");
  lines.push(renderTable(
    ["artist", "clicks", "artist_views", "ctr"],
    report.clicks_by_artist.map((row) => [row.artist_slug, row.provider_clicks, row.artist_views, formatRate(row.click_through_rate, row.artist_views, minViews)])
  ));
  lines.push("");

  lines.push("-- Clicks by page type --");
  lines.push(renderTable(
    ["page_type", "page_views", "sessions", "clicks", "ctr"],
    report.clicks_by_page_type.map((row) => [row.page_type, row.page_views, row.sessions, row.provider_clicks, formatRate(row.click_through_rate, row.page_views, minViews)])
  ));
  lines.push("");

  lines.push("-- Clicks by CTA component --");
  lines.push(renderTable(
    ["cta_location", "clicks"],
    report.clicks_by_cta_location.map((row) => [row.cta_location, row.provider_clicks])
  ));
  lines.push("");

  const split = report.affiliate_split;
  lines.push("-- Affiliate vs non-affiliate clicks --");
  lines.push(`affiliate: ${split.affiliate} · non-affiliate: ${split.non_affiliate} · unlabelled: ${split.unlabelled} · affiliate share: ${formatRate(split.affiliate_share, split.total, 0)}`);
  lines.push(renderTable(
    ["destination_category", "clicks"],
    split.destination_categories.map((row) => [row.destination_category, row.clicks])
  ));
  lines.push("");

  lines.push(`-- Top landing pages producing provider clicks (>= ${minClicks} clicks) --`);
  lines.push(renderTable(
    ["landing_path", "clicks", "sessions", "ctr"],
    report.top_landing_pages.map((row) => [row.landing_path, row.provider_clicks, row.sessions, formatRate(row.click_through_rate, row.sessions, minViews)])
  ));
  lines.push("");

  lines.push(`-- Pages with traffic but no provider clicks (>= ${minViews} views) --`);
  lines.push(renderTable(
    ["source_path", "page_type", "page_views", "sessions"],
    report.pages_with_traffic_no_clicks.map((row) => [row.source_path, row.page_type, row.page_views, row.sessions])
  ));
  lines.push("");

  lines.push(`-- Artists earning clicks with weak provider coverage (>= ${minClicks} clicks) --`);
  lines.push(renderTable(
    ["artist", "clicks", "upcoming", "affiliate_providers", "affiliate_coverage"],
    report.artists_with_clicks_weak_coverage.map((row) => [
      row.artist_slug,
      row.provider_clicks,
      row.upcoming_events,
      row.distinct_affiliate_providers,
      row.affiliate_coverage === null ? "n/a" : `${(row.affiliate_coverage * 100).toFixed(0)}%`
    ])
  ));
  lines.push("");

  lines.push("-- Signups from artist pages with no current dates --");
  lines.push(renderTable(
    ["artist", "signups", "upcoming"],
    report.signups_on_pages_without_dates.map((row) => [row.artist_slug, row.signups, row.upcoming_events])
  ));
  lines.push("");

  lines.push("-- Blocked outbound redirects (a click that never reached a provider) --");
  lines.push(renderTable(
    ["provider", "status", "blocked"],
    report.blocked_redirects.map((row) => [row.provider, row.status, row.blocked])
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
    const options = parseArgs(["--days", "7", "--top", "3", "--local", "--json", "--database", "demo-db", "--min-views", "5", "--min-clicks", "2"]);
    assert.equal(options.days, 7);
    assert.equal(options.top, 3);
    assert.equal(options.remote, false);
    assert.equal(options.json, true);
    assert.equal(options.database, "demo-db");
    assert.equal(options.minViews, 5);
    assert.equal(options.minClicks, 2);
  });
  check(() => assert.throws(() => parseArgs(["--days", "-1"]), /integer/));
  check(() => assert.throws(() => parseArgs(["--bogus"]), /Unknown argument/));
  check(() => assert.throws(() => parseArgs(["--since", "not-a-date"]), /YYYY-MM-DD/));
  check(() => {
    const options = parseArgs(["--since", "2026-07-01", "--until", "2026-07-15"]);
    assert.equal(options.since, "2026-07-01T00:00:00.000Z");
    assert.equal(options.until, "2026-07-15T00:00:00.000Z");
  });
  check(() => assert.throws(() => parseArgs(["--since", "2026-07-15", "--until", "2026-07-01"]), /must be after/));

  check(() => {
    const now = new Date("2026-07-30T12:00:00.000Z");
    assert.equal(computeWindow({ days: 30, since: "", until: "" }, now).since, "2026-06-30T12:00:00.000Z");
    assert.equal(computeWindow({ days: 0, since: "", until: "" }, now).since, "");
  });
  check(() => assert.throws(() => windowClause({ since: "2026-01-01' OR 1=1 --", until: "" }), /Refusing/));

  check(() => {
    assert.throws(() => assertReadOnlySql("DELETE FROM analytics_events"), /not a SELECT/);
    assert.throws(() => assertReadOnlySql("SELECT 1; DROP TABLE analytics_events"), /Multiple statements|non-read-only/);
    assert.equal(assertReadOnlySql("-- comment\nSELECT 1;"), "SELECT 1;");
  });

  // Personal data must never reach a report projection.
  check(() => {
    assert.throws(() => assertNoPersonalColumns("SELECT email FROM analytics_events"), /email column/);
    assert.throws(() => assertNoPersonalColumns("SELECT user_agent FROM analytics_events"), /user_agent column/);
    assert.throws(() => assertNoPersonalColumns("SELECT request_key FROM analytics_events"), /request_key/);
    assert.doesNotThrow(() => assertNoPersonalColumns("SELECT COUNT(DISTINCT request_key) AS visitors FROM analytics_events"));
    for (const statement of buildStatements({ since: "2026-06-30T12:00:00.000Z", until: "" })) {
      assertNoPersonalColumns(statement.sql);
    }
  });

  check(() => {
    const statements = buildStatements({ since: "2026-06-30T12:00:00.000Z", until: "2026-07-30T12:00:00.000Z" });
    assert.deepEqual(statements.map((s) => s.key), [
      "totals", "viewsByPageType", "clicksByPageType", "clicksByProvider", "clicksByArtist",
      "viewsByArtist", "affiliateSplit", "clicksByCtaLocation", "landingPageViews",
      "landingPageClicks", "pageViewsByPath", "clicksByPath", "signupsByArtist", "blockedByStatus"
    ]);
    for (const statement of statements) {
      assert.match(statement.sql, /^SELECT/);
      assert.match(statement.sql, /FROM analytics_events/);
    }
    for (const statement of buildStatements({ since: "", until: "" })) {
      assert.doesNotMatch(statement.sql, /created_at >=/);
    }
  });

  // Every click figure must come from the server-side row, never the client's.
  check(() => {
    const clickQueries = ["clicksByPageType", "clicksByArtist", "clicksByPath", "clicksByCtaLocation", "affiliateSplit"];
    const statements = buildStatements({ since: "", until: "" });
    for (const key of clickQueries) {
      const statement = statements.find((entry) => entry.key === key);
      assert.match(statement.sql, /event_name = 'outbound_click'/, `${key} must count the authoritative outbound event`);
      assert.doesNotMatch(statement.sql, /IN \('provider_click', 'outbound_click'\)/, `${key} must not sum client and server clicks`);
    }
  });

  const fixtures = {
    totals: [
      { event_name: "page_view", events: 400, visitors: 120, sessions: 200 },
      { event_name: "artist_view", events: 220, visitors: 90, sessions: 150 },
      { event_name: "event_view", events: 640, visitors: 70, sessions: 110 },
      { event_name: "provider_cta_view", events: 180, visitors: 80, sessions: 130 },
      { event_name: "provider_click", events: 50, visitors: 30, sessions: 40 },
      { event_name: "outbound_click", events: 44, visitors: 28, sessions: 36 },
      { event_name: "outbound_blocked", events: 6, visitors: 4, sessions: 5 },
      { event_name: "email_signup", events: 7, visitors: 7, sessions: 7 }
    ],
    viewsByPageType: [
      { page_type: "artist", views: 250, sessions: 130 },
      { page_type: "home", views: 100, sessions: 60 },
      { page_type: "city", views: 50, sessions: 20 }
    ],
    clicksByPageType: [
      { page_type: "artist", clicks: 40 },
      { page_type: "home", clicks: 4 }
    ],
    clicksByProvider: [
      { event_name: "provider_click", provider: "seatgeek", clicks: 30 },
      { event_name: "outbound_click", provider: "seatgeek", clicks: 26 },
      { event_name: "outbound_click", provider: "ticketmaster", clicks: 18 },
      { event_name: "outbound_blocked", provider: "vivid-seats", clicks: 6 }
    ],
    clicksByArtist: [
      { artist_slug: "artist-a", clicks: 30 },
      { artist_slug: "artist-b", clicks: 12 },
      { artist_slug: "artist-c", clicks: 2 }
    ],
    viewsByArtist: [
      { artist_slug: "artist-a", views: 150 },
      { artist_slug: "artist-b", views: 20 }
    ],
    affiliateSplit: [
      { bucket: "affiliate", destination_category: "affiliate_network", clicks: 26 },
      { bucket: "non_affiliate", destination_category: "provider_direct", clicks: 18 }
    ],
    clicksByCtaLocation: [
      { cta_location: "event_card", clicks: 38 },
      { cta_location: "artist_provider_panel", clicks: 6 }
    ],
    landingPageViews: [
      { landing_path: "/artists/artist-a", sessions: 120 },
      { landing_path: "/", sessions: 60 }
    ],
    landingPageClicks: [
      { landing_path: "/artists/artist-a", clicks: 36 },
      { landing_path: "/", clicks: 2 }
    ],
    pageViewsByPath: [
      { source_path: "/artists/artist-a", page_type: "artist", views: 150, sessions: 120 },
      { source_path: "/guides/how-to-avoid-ticket-scams", page_type: "guide", views: 90, sessions: 70 },
      { source_path: "/cities/paris-france", page_type: "city", views: 4, sessions: 3 }
    ],
    clicksByPath: [{ source_path: "/artists/artist-a", clicks: 40 }],
    signupsByArtist: [
      { artist_slug: "artist-d", event_name: "email_signup", signups: 5 },
      { artist_slug: "artist-a", event_name: "artist_interest", signups: 2 }
    ],
    blockedByStatus: [{ provider: "vivid-seats", status: "impact_request_failed", blocked: 6 }]
  };

  const coverage = buildCoverageIndex({
    artists: [
      { slug: "artist-a", indexing_status: "indexable_with_substantial_content" },
      { slug: "artist-b", indexing_status: "indexable_with_substantial_content" },
      { slug: "artist-d", indexing_status: "indexable_with_substantial_content" }
    ],
    events: [
      { artist_slug: "artist-a", datetime_iso: "2026-09-01T19:00:00Z", provider_links: { seatgeek: { verified: true } } },
      { artist_slug: "artist-a", datetime_iso: "2026-09-02T19:00:00Z", provider_links: {} },
      { artist_slug: "artist-a", datetime_iso: "2020-01-01T19:00:00Z", provider_links: { seatgeek: { verified: true } } },
      { artist_slug: "artist-b", datetime_iso: "2026-09-03T19:00:00Z", provider_links: { seatgeek: { verified: true }, "vivid-seats": { verified: true } } }
    ],
    now: new Date("2026-07-30T12:00:00.000Z")
  });

  check(() => {
    const a = coverage.get("artist-a");
    assert.equal(a.upcoming_events, 2, "past dates must not count towards coverage");
    assert.equal(a.distinct_affiliate_providers, 1);
    assert.equal(a.affiliate_coverage, 0.5);
    const d = coverage.get("artist-d");
    assert.equal(d.upcoming_events, 0);
    assert.equal(d.affiliate_coverage, null);
  });

  const options = { days: 30, top: 5, minViews: 30, minClicks: 3, database: DEFAULT_D1_DATABASE, remote: true };
  const report = buildReport(fixtures, options, { since: "2026-06-30T12:00:00.000Z", until: "" }, coverage);

  check(() => {
    assert.equal(report.funnel.sessions, 200);
    assert.equal(report.funnel.visitors, 120);
    // The headline click count is the server-side row only — the 50 client
    // provider_click events are never added in.
    assert.equal(report.funnel.provider_clicks, 44);
    assert.equal(report.funnel.provider_clicks_client, 50);
    assert.equal(report.funnel.click_through_rate_per_session, 44 / 200);
    assert.equal(report.funnel.cta_click_to_redirect_rate, 44 / 50);
    assert.equal(report.funnel.signups, 7);
  });

  // Below-threshold denominators must not produce a headline rate.
  check(() => {
    const thin = buildReport(
      { ...fixtures, totals: [{ event_name: "page_view", events: 4, visitors: 3, sessions: 3 }, { event_name: "outbound_click", events: 2, visitors: 2, sessions: 2 }] },
      options,
      { since: "", until: "" },
      coverage
    );
    assert.equal(thin.funnel.click_through_rate_per_session, null, "3 sessions is not a click-through rate");
    assert.match(renderReport(thin), /low volume \(n=3\)/);
  });

  check(() => {
    const seatgeek = report.clicks_by_provider.find((row) => row.provider === "seatgeek");
    assert.equal(seatgeek.provider_clicks, 26);
    assert.equal(seatgeek.redirect_completion_rate, 26 / 30);
    const vivid = report.clicks_by_provider.find((row) => row.provider === "vivid-seats");
    assert.equal(vivid.provider_clicks, 0);
    assert.equal(vivid.blocked, 6, "a click that never reached the provider must still be visible");
  });

  check(() => {
    const artistA = report.clicks_by_artist.find((row) => row.artist_slug === "artist-a");
    assert.equal(artistA.click_through_rate, 30 / 150);
    const artistB = report.clicks_by_artist.find((row) => row.artist_slug === "artist-b");
    assert.equal(artistB.click_through_rate, null, "20 artist views is below the rate threshold");
  });

  check(() => {
    assert.deepEqual(report.affiliate_split.affiliate, 26);
    assert.deepEqual(report.affiliate_split.non_affiliate, 18);
    assert.equal(report.affiliate_split.affiliate_share, 26 / 44);
  });

  check(() => {
    assert.deepEqual(report.top_landing_pages.map((row) => row.landing_path), ["/artists/artist-a"]);
    assert.equal(report.top_landing_pages[0].click_through_rate, 36 / 120);
  });

  check(() => {
    // The guide page has real traffic and zero clicks; the city page is below
    // the volume floor and must not be presented as a failure.
    assert.deepEqual(
      report.pages_with_traffic_no_clicks.map((row) => row.source_path),
      ["/guides/how-to-avoid-ticket-scams"]
    );
  });

  check(() => {
    assert.deepEqual(report.artists_with_clicks_weak_coverage.map((row) => row.artist_slug), ["artist-a"]);
    assert.equal(report.artists_with_clicks_weak_coverage[0].distinct_affiliate_providers, 1);
  });

  check(() => {
    assert.deepEqual(report.signups_on_pages_without_dates, [{ artist_slug: "artist-d", signups: 5, upcoming_events: 0 }]);
  });

  check(() => {
    const statements = buildStatements({ since: "", until: "" });
    const stdout = JSON.stringify(statements.map((statement, index) => ({ success: true, results: [{ marker: index }], meta: {} })));
    const parsed = parseWranglerJson(stdout, statements);
    assert.equal(parsed.blockedByStatus[0].marker, statements.length - 1);
    assert.throws(() => parseWranglerJson("🌀 Executing…", statements), /did not return JSON/);
    assert.throws(() => parseWranglerJson("[]", statements), /result sets/);
  });

  check(() => {
    const rendered = renderReport(report);
    assert.match(rendered, /Commercial Funnel Report/);
    assert.match(rendered, /outbound_click \(AUTHORITATIVE\)/);
    assert.match(rendered, /Clicks by provider/);
    assert.match(rendered, /Signups from artist pages with no current dates/);
    assert.match(rendered, /Blocked outbound redirects/);
  });

  return { tests };
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
    console.log(`Commercial funnel report self-test passed (${result.tests} checks).`);
    return;
  }

  const now = process.env.TTC_NOW ? new Date(process.env.TTC_NOW) : new Date();
  if (Number.isNaN(now.getTime())) throw new Error("TTC_NOW is not a valid timestamp");
  const window = computeWindow(options, now);
  const statements = buildStatements(window);
  const [resultSets, coverage] = await Promise.all([
    runStatements(statements, options),
    loadCoverageIndex(now)
  ]);
  const report = buildReport(resultSets, options, window, coverage);
  console.log(options.json ? JSON.stringify(report, null, 2) : renderReport(report));
}

const invokedDirectly = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (invokedDirectly) {
  main().catch((error) => {
    console.error(`Commercial funnel report failed: ${error.message}`);
    process.exit(1);
  });
}
