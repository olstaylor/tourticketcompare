// Read-only SEO opportunity report: one ranked list of CREATE, IMPROVE,
// REFRESH, LINK and HOLD actions from Google demand, landing-page conversion
// and the show-priority list. Scoring lives in scripts/lib/seo-opportunities.mjs.
//
// It never writes to the repository, D1 or GitHub, and never calls an AI
// model. Without D1 access it still runs: unmeasured page types fall back to
// the site-wide click rate and say so.
//
//   node scripts/report-seo-opportunities.mjs --search-console <dir>
//        [--remote | --local]        read landing conversion + show_priority from D1
//        [--conversion-file <json>]  [{ page_type, landings, clickers }] instead of D1
//        [--priority-file <json>]    report-show-priority.mjs --json output instead of D1
//        [--days 14] [--top 15] [--json <file>] [--markdown <file>]
//   node scripts/report-seo-opportunities.mjs --self-test
//
// <dir> is an unzipped Search Console "Performance" export holding Pages.csv
// and Queries.csv (the format Ollie uploads to the project).
import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { PRICE_GUIDE_ARTISTS } from "../functions/_price-guides.js";
import { parseCsv } from "./report-event-indexing-pilot.mjs";
import { splitDocument } from "./lib/content-markdown.mjs";
import { buildD1ReadArgs } from "./lib/d1-read.mjs";
import { readPriorityRows } from "./lib/show-priority-store.mjs";
import {
  conversionByPageType, matchArtist, artistMatchers, queryIntent, renderMarkdown,
  scoreOpportunities, searchConsoleRows
} from "./lib/seo-opportunities.mjs";

const execFileAsync = promisify(execFile);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATABASE = "tourticketcompare-demand";

// Running experiments and frozen cohorts. A page type listed here is HOLD
// until the date, whatever its numbers say.
export const HOLDS = Object.freeze([
  { pageType: "event", until: "2026-10-26", reason: "Event pages: batch 2 waits for the 25 Oct read (0 clicks so far)" }
]);

// Owner rule (strategic review 16 Oct 2026): no title or CTR rewrites before
// the 25 Oct Search Console read, so the read measures one change at a time.
export const TITLE_FREEZE = Object.freeze({ until: "2026-10-26", reason: "no title changes before the 25 Oct Search Console read" });

const readJson = (file) => JSON.parse(readFileSync(path.resolve(ROOT, file), "utf8"));

export function readSearchConsoleDir(dir) {
  const find = (name) => {
    const file = readdirSync(dir).find((entry) => entry.toLowerCase() === `${name}.csv`);
    if (!file) throw new Error(`${dir} has no ${name}.csv (expected an unzipped Search Console export)`);
    return searchConsoleRows(parseCsv(readFileSync(path.join(dir, file), "utf8")));
  };
  return { pages: find("pages"), queries: find("queries") };
}

// Pages that already carry the near-show links (PR #1621).
export function readLinkedPaths(source = readFileSync(path.join(ROOT, "public/shell.js"), "utf8")) {
  const list = source.match(/SELLING_SOON_PATHS\s*=\s*\[([^\]]*)\]/);
  return list ? [...list[1].matchAll(/"([^"]+)"/g)].map((match) => match[1]) : [];
}

export function readBlogPosts(dir = path.join(ROOT, "content/blog")) {
  return readdirSync(dir)
    .filter((file) => file.endsWith(".md"))
    .map((file) => {
      const { frontMatter } = splitDocument(readFileSync(path.join(dir, file), "utf8"));
      return { slug: file.replace(/\.md$/, ""), date: frontMatter.date, updated: frontMatter.updated, status: frontMatter.status, related_artists: frontMatter.related_artists || [] };
    })
    .filter((post) => post.status === "published");
}

// Landing visitor-days by page type, and how many of them clicked a ticket
// button (the browser-side provider_click beacon, so page-backed by nature).
export function landingConversionSql(days) {
  const window = `created_at >= strftime('%Y-%m-%dT%H:%M:%fZ', 'now', '-${Number(days)} days')`;
  return `WITH firsts AS (SELECT request_key || substr(created_at, 1, 10) AS vd, MIN(created_at) AS t FROM analytics_events WHERE ${window} AND event_name = 'page_view' AND request_key IS NOT NULL GROUP BY 1),
landings AS (SELECT firsts.vd, COALESCE(NULLIF(TRIM(e.page_type), ''), 'other') AS page_type FROM firsts JOIN analytics_events e ON e.event_name = 'page_view' AND e.created_at = firsts.t AND e.request_key || substr(e.created_at, 1, 10) = firsts.vd),
clickers AS (SELECT DISTINCT request_key || substr(created_at, 1, 10) AS vd FROM analytics_events WHERE ${window} AND event_name = 'provider_click')
SELECT landings.page_type, COUNT(DISTINCT landings.vd) AS landings, COUNT(DISTINCT clickers.vd) AS clickers FROM landings LEFT JOIN clickers ON clickers.vd = landings.vd GROUP BY landings.page_type`;
}

async function readConversion({ remote, days }) {
  try {
    const args = buildD1ReadArgs({ database: DATABASE, remote, statements: [{ sql: landingConversionSql(days) }] });
    const { stdout } = await execFileAsync("npx", args, { cwd: ROOT, maxBuffer: 10 * 1024 * 1024, timeout: 120000 });
    const parsed = JSON.parse(stdout);
    return Array.isArray(parsed) && parsed[0]?.success ? parsed[0].results : [];
  } catch (error) {
    console.error(`::notice::landing conversion unavailable, using the fallback rate (${String(error?.message || error).split("\n")[0].slice(0, 160)})`);
    return [];
  }
}

function parseArgs(argv) {
  const options = { days: 14, top: 15 };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    const value = () => {
      if (i + 1 >= argv.length) throw new Error(`${arg} needs a value`);
      return argv[++i];
    };
    if (arg === "--search-console") options.searchConsole = value();
    else if (arg === "--conversion-file") options.conversionFile = value();
    else if (arg === "--priority-file") options.priorityFile = value();
    else if (arg === "--json") options.json = value();
    else if (arg === "--markdown") options.markdown = value();
    else if (arg === "--days") options.days = Number(value());
    else if (arg === "--top") options.top = Number(value());
    else if (arg === "--remote") options.d1 = "remote";
    else if (arg === "--local") options.d1 = "local";
    else if (arg === "--self-test") options.selfTest = true;
    else throw new Error(`unknown argument ${arg}`);
  }
  if (!Number.isInteger(options.days) || options.days < 1 || options.days > 90) throw new Error("--days must be 1 to 90");
  if (!Number.isInteger(options.top) || options.top < 1) throw new Error("--top must be a positive integer");
  return options;
}

async function main(argv) {
  const options = parseArgs(argv);
  if (options.selfTest) {
    console.log(`SEO opportunities self-test passed (${selfTest()} checks).`);
    return;
  }
  if (!options.searchConsole) throw new Error("--search-console <dir> is required (an unzipped Search Console export)");
  const now = Date.now();
  const sources = [`Search Console export ${options.searchConsole}`];
  const { pages, queries } = readSearchConsoleDir(path.resolve(options.searchConsole));

  let conversionRows = [];
  if (options.conversionFile) {
    conversionRows = JSON.parse(readFileSync(options.conversionFile, "utf8"));
    sources.push(`landing conversion ${options.conversionFile}`);
  } else if (options.d1) {
    conversionRows = await readConversion({ remote: options.d1 === "remote", days: options.days });
    sources.push(`D1 landing conversion, last ${options.days} days`);
  }
  if (!conversionRows.length) sources.push("no landing conversion: page types use the 30% site-wide fallback");

  let priority = [];
  if (options.priorityFile) {
    priority = (JSON.parse(readFileSync(options.priorityFile, "utf8")).shows || []).slice(0, 25).map((show, i) => ({ ...show, rank: show.rank ?? i + 1 }));
    sources.push(`show priority ${options.priorityFile}`);
  } else if (options.d1) {
    priority = await readPriorityRows({ database: DATABASE, remote: options.d1 === "remote", top: 25 });
    sources.push(priority.length ? "D1 show_priority (top 25)" : "show_priority unavailable");
  }

  const result = scoreOpportunities({
    pages, queries, now,
    artists: readJson("public/data/artists.json"),
    events: readJson("public/data/events.json"),
    priceGuides: PRICE_GUIDE_ARTISTS,
    blogPosts: readBlogPosts(),
    priority,
    conversion: conversionByPageType(conversionRows),
    holds: HOLDS,
    titleFreeze: TITLE_FREEZE,
    linkedPaths: readLinkedPaths()
  });
  const markdown = renderMarkdown(result, { top: options.top, generatedAt: new Date(now).toISOString(), sources });
  if (options.json) writeFileSync(options.json, `${JSON.stringify({ generated_at: new Date(now).toISOString(), sources, ...result }, null, 2)}\n`);
  if (options.markdown) writeFileSync(options.markdown, markdown);
  console.log(markdown);
}

// ── Self-test: one fixture per decision rule ───────────────────────────────

function selfTest() {
  let checks = 0;
  const check = (condition, message) => {
    assert.ok(condition, message);
    checks += 1;
  };
  const now = Date.parse("2026-10-16T12:00:00Z");
  const show = (artist_slug, date) => ({ id: `${artist_slug}-${date}`, artist_slug, datetime_iso: `${date}T20:00:00`, timezone: "America/New_York", status: "onsale" });
  const indexable = "indexable_with_substantial_content";
  const artists = [
    { slug: "lizzy-mcalpine", name: "Lizzy McAlpine", indexing_status: indexable },
    { slug: "new-act", name: "New Act Band", indexing_status: indexable },
    { slug: "no-dates", name: "Nodates Group", indexing_status: indexable },
    { slug: "hidden-gem", name: "Hidden Gem", indexing_status: indexable },
    { slug: "beyonce", name: "Beyoncé", indexing_status: indexable },
    { slug: "abba", name: "ABBA", indexing_status: indexable },
    { slug: "low", name: "Low", indexing_status: indexable }
  ];
  const events = [show("lizzy-mcalpine", "2026-10-20"), show("new-act", "2026-11-30"), show("hidden-gem", "2026-10-19"), show("beyonce", "2026-12-01")];
  const csv = (rows) => searchConsoleRows(parseCsv(rows.join("\n")));
  const pages = csv([
    "Top pages,Clicks,Impressions,CTR,Position",
    "https://tourticketcompare.com/artists/lizzy-mcalpine,20,6070,0.33%,9.3",
    "https://tourticketcompare.com/artists/lizzy-mcalpine/ticket-prices,1,21,4.76%,9",
    "https://tourticketcompare.com/guides/seatgeek-vs-ticketmaster,9,4548,0.2%,7.4",
    "https://tourticketcompare.com/events/x-2026-10-20-abc,0,110,0%,12.9",
    "https://tourticketcompare.com/artists/no-dates,3,400,0.75%,8",
    "https://tourticketcompare.com/blog/old-post,4,300,1.33%,8",
    "https://tourticketcompare.com/,29,1260,2.3%,9.2",
    "https://tourticketcompare.com/artists/beyonce,40,1000,4%,7",
    "https://tourticketcompare.com/guides/is-seatgeek-legit,2,343,0.58%,8"
  ]);
  const queries = csv([
    "Top queries,Clicks,Impressions,CTR,Position",
    "lizzy mcalpine ticket prices,5,690,0.72%,9.5",
    "how much are lizzy mcalpine tickets,2,669,0.3%,9",
    "new act band tickets price,0,250,0%,15",
    "new act band vip,0,180,0%,12",
    "nodates group cost,0,150,0%,20",
    "abba tickets cheap,0,500,0%,30",
    "low tickets price,0,900,0%,30",
    "are seatgeek and ticketmaster the same company,1,700,0.14%,7"
  ]);
  check(pages.length === 9 && pages[0].ctr > 0.0032 && pages[0].ctr < 0.0034, "CSV rows parse with CTR recomputed from clicks/impressions");
  check(queryIntent("How much are Lizzy McAlpine tickets") === "price" && queryIntent("olivia rodrigo presale code") === "presale" && queryIntent("bruno mars floor seats") === "decision", "query intent patterns");
  const matchers = artistMatchers(artists);
  check(matchArtist("beyonce tickets", matchers) === "beyonce", "diacritics fold");
  check(matchArtist("low tickets price", matchers) === "" && matchArtist("abba cheap", matchers) === "abba", "names under 4 letters never match; 4 do");
  check(matchArtist("seatgeek vs ticketmaster", matchers) === "", "unmatched stays unmatched");

  const conversion = conversionByPageType([
    { page_type: "artist_price_guide", landings: 461, clickers: 274 },
    { page_type: "artist", landings: 166, clickers: 55 },
    { page_type: "guide", landings: 142, clickers: 0 },
    { page_type: "blog", landings: 14, clickers: 0 },
    { page_type: "home", landings: 125, clickers: 8 }
  ]);
  check(conversion.blog.rate === null && conversion.guide.rate === 0, "under 20 landings is unmeasured, not zero");

  const { rows } = scoreOpportunities({
    pages, queries, artists, events, now, conversion,
    priceGuides: ["lizzy-mcalpine"],
    blogPosts: [{ slug: "old-post", date: "2026-07-01", updated: "2026-07-01", related_artists: ["lizzy-mcalpine"] }],
    priority: [{ artist_slug: "hidden-gem", expected_gbp: 3.2, rank: 2 }, { artist_slug: "lizzy-mcalpine", expected_gbp: 1, rank: 5 }],
    holds: HOLDS,
    linkedPaths: ["/guides/seatgeek-vs-ticketmaster"]
  });
  const find = (action, url) => rows.find((row) => row.action === action && row.url === url);
  check(find("HOLD", "/events/x-2026-10-20-abc"), "event pages are held during the cohort read");
  check(find("LINK", "/guides/is-seatgeek-legit"), "an informational page with zero measured clicks gets LINK, not IMPROVE");
  check(find("IMPROVE", "/artists/lizzy-mcalpine/ticket-prices")?.evidence.queryImpressions === 1359, "price searches landing on the artist page are a targeting fix (IMPROVE), not a link: the link already exists");
  const frozen = scoreOpportunities({ pages, queries, artists, events, now, conversion, priceGuides: ["lizzy-mcalpine"], titleFreeze: TITLE_FREEZE });
  check(!frozen.rows.some((row) => row.action === "IMPROVE") && frozen.rows.some((row) => row.action === "HOLD" && row.url === "/artists/lizzy-mcalpine"), "the title freeze turns IMPROVE into HOLD");
  check(find("IMPROVE", "/artists/lizzy-mcalpine"), "a striking-distance page with low CTR gets IMPROVE");
  check(!rows.some((row) => row.url === "/artists/beyonce"), "a page beating its band CTR gets nothing");
  check(find("REFRESH", "/artists/no-dates"), "a ranking artist page without upcoming dates gets REFRESH");
  check(find("REFRESH", "/blog/old-post"), "a stale ranking blog post gets REFRESH");
  check(find("CREATE", "/artists/new-act/ticket-prices"), "price demand + verified dates + no guide gets CREATE");
  check(find("HOLD", "/artists/no-dates/ticket-prices"), "price demand without upcoming dates is HOLD, needs facts");
  check(find("HOLD", "/blog/ (new post: new-act)"), "decision demand is HOLD while blog conversion is unmeasured");
  check(find("LINK", "/artists/hidden-gem"), "high expected commission with no visibility gets LINK");
  check(!rows.some((row) => row.artist === "low"), "short names produce no rows");
  check(readLinkedPaths().includes("/guides/seatgeek-vs-ticketmaster"), "reads the selling-soon cohort from shell.js");
  check(find("HOLD", "/guides/seatgeek-vs-ticketmaster") && !find("LINK", "/guides/seatgeek-vs-ticketmaster"), "an already-linked page is held, not linked again");
  check(rows.every((row) => row.action === "HOLD" || row.score > 0 || row.action === "REFRESH"), "actionable rows carry a score");
  const firstHold = rows.findIndex((row) => row.action === "HOLD");
  check(rows.slice(firstHold).every((row) => row.action === "HOLD"), "holds sort last");
  const markdown = renderMarkdown({ rows, benchmarks: { "6-10": 0.01 } }, { generatedAt: "test" });
  check(markdown.includes("## Act on") && markdown.includes("## Held") && !markdown.includes("undefined"), "markdown renders both sections");
  check(landingConversionSql(14).includes("'-14 days'") && !/insert|update|delete/i.test(landingConversionSql(14)), "D1 query is a bounded read");
  return checks;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main(process.argv.slice(2)).catch((error) => {
    console.error(`SEO opportunity report failed: ${error.message}`);
    process.exit(1);
  });
}
