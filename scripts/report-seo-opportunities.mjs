// Read-only SEO opportunity report: one ranked list of CREATE, IMPROVE,
// REFRESH, LINK and HOLD actions from Google demand, landing-page conversion
// and the show-priority list. Scoring lives in scripts/lib/seo-opportunities.mjs.
//
// It never writes to the repository or D1 and never calls an AI model; its
// only write is the rolling GitHub issue, and only with --issue. Without D1
// access it still runs: unmeasured page types fall back to the site-wide click
// rate and say so.
//
//   node scripts/report-seo-opportunities.mjs (--search-console <dir> | --gsc-api)
//        [--issue]                   rewrite the rolling `automation:seo-opportunities`
//                                    issue (GITHUB_TOKEN, GITHUB_REPOSITORY)
//        [--remote | --local]        read landing conversion + show_priority from D1
//        [--conversion-file <json>]  [{ page_type, landings, clickers }] instead of D1
//        [--priority-file <json>]    report-show-priority.mjs --json output instead of D1
//        [--days 14] [--top 15] [--json <file>] [--markdown <file>]
//   node scripts/report-seo-opportunities.mjs --self-test
//   node scripts/report-seo-opportunities.mjs --keyword-file <vendor.csv>
//        [--json <file>] [--markdown <file>]
// --keyword-file also supplements either Search Console source; standalone it
// produces a local review baseline without conversion or revenue estimates.
//
// <dir> is an unzipped Search Console "Performance" export holding Pages.csv
// and Queries.csv (the format Ollie uploads to the project). --gsc-api reads
// the same two tables from the Search Console API instead (last 28 complete
// days, scripts/lib/search-console-api.mjs) with the read-only service-account
// key in GSC_SERVICE_ACCOUNT_JSON. The weekly workflow
// .github/workflows/seo-opportunities.yml runs --gsc-api --remote --issue.
import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { createVerify, generateKeyPairSync } from "node:crypto";
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { deriveRenderedPriceGuides } from "../functions/_price-guides.js";
import { parseCsv } from "./report-event-indexing-pilot.mjs";
import { splitDocument } from "./lib/content-markdown.mjs";
import { buildD1ReadArgs } from "./lib/d1-read.mjs";
import { keywordRows, buildKeywordBaseline, renderKeywordBaseline } from "./lib/keyword-baseline.mjs";
import { readPriorityRows } from "./lib/show-priority-store.mjs";
import {
  conversionByPageType, matchArtist, artistMatchers, queryIntent, renderMarkdown,
  scoreOpportunities, searchConsoleRows
} from "./lib/seo-opportunities.mjs";
import {
  buildJwtAssertion, fetchSearchConsole, mapApiRows, parseServiceAccount, reportWindow, QUERY_URL, SCOPE, SITE, TOKEN_URL
} from "./lib/search-console-api.mjs";

const execFileAsync = promisify(execFile);
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATABASE = "tourticketcompare-demand";
const LABEL = "automation:seo-opportunities";
const ISSUE_TITLE = "SEO opportunities (weekly)";
// GitHub rejects issue bodies over 65,536 characters.
const MAX_ISSUE_BODY = 60000;

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

// ── Rolling issue ──────────────────────────────────────────────────────────

/** The issue body: the report, with a footer saying what wrote it. */
export function buildIssueBody(markdown, { runUrl = "" } = {}) {
  const footer = [
    "",
    "---",
    `Rewritten weekly by \`.github/workflows/seo-opportunities.yml\` (\`scripts/report-seo-opportunities.mjs\`). Read-only: nothing on the site, in the repository or in D1 was changed.${runUrl ? ` [Run](${runUrl}).` : ""}`
  ].join("\n");
  const room = MAX_ISSUE_BODY - footer.length;
  const text = markdown.length > room ? `${markdown.slice(0, room - 40).replace(/\n[^\n]*$/, "")}\n\n_(truncated)_` : markdown;
  return `${text.trimEnd()}\n${footer}\n`;
}

/** Rewrite the open issue carrying LABEL, or create it. Returns { number, created }. */
export async function upsertRollingIssue(body, { fetchImpl = globalThis.fetch, token = process.env.GITHUB_TOKEN, repo = process.env.GITHUB_REPOSITORY } = {}) {
  if (!token || !repo) throw new Error("--issue needs GITHUB_TOKEN and GITHUB_REPOSITORY");
  const gh = async (method, apiPath, payload) => {
    const res = await fetchImpl(`https://api.github.com/repos/${repo}${apiPath}`, {
      method,
      headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" },
      body: payload ? JSON.stringify(payload) : undefined
    });
    if (!res.ok) throw new Error(`GitHub API ${method} ${apiPath} ${res.status}`);
    return res.json();
  };
  const open = await gh("GET", `/issues?state=open&labels=${encodeURIComponent(LABEL)}`);
  if (open[0]) {
    await gh("PATCH", `/issues/${open[0].number}`, { body });
    return { number: open[0].number, created: false };
  }
  const made = await gh("POST", "/issues", { title: ISSUE_TITLE, body, labels: [LABEL] });
  return { number: made?.number, created: true };
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
    else if (arg === "--keyword-file") options.keywordFile = value();
    else if (arg === "--gsc-api") options.gscApi = true;
    else if (arg === "--issue") options.issue = true;
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
  if (options.gscApi && options.searchConsole) throw new Error("use either --search-console <dir> or --gsc-api, not both");
  return options;
}

async function main(argv) {
  const options = parseArgs(argv);
  if (options.selfTest) {
    console.log(`SEO opportunities self-test passed (${await selfTest()} checks).`);
    return;
  }
  if (!options.searchConsole && !options.gscApi && !options.keywordFile) throw new Error("--search-console <dir>, --gsc-api or --keyword-file <csv> is required");
  if (options.keywordFile && !options.searchConsole && !options.gscApi && (options.issue || options.d1 || options.conversionFile || options.priorityFile)) {
    throw new Error("Keyword-only mode is a local baseline: commercial inputs and --issue need Search Console evidence");
  }
  const now = Date.now();
  let keywordBaseline;
  if (options.keywordFile) {
    const rows = keywordRows(readFileSync(options.keywordFile, "utf8"));
    const { loadSiteFixture, crawlRoutes } = await import("./lib/route-crawl.mjs");
    const site = await loadSiteFixture(ROOT);
    keywordBaseline = buildKeywordBaseline(rows, await crawlRoutes([...new Set(rows.map((row) => row.path))], site.renderRoute));
    if (!options.searchConsole && !options.gscApi) {
      const markdown = renderKeywordBaseline(keywordBaseline);
      if (options.json) writeFileSync(options.json, `${JSON.stringify({ generated_at: new Date(now).toISOString(), source: options.keywordFile, keyword_baseline: keywordBaseline }, null, 2)}\n`);
      if (options.markdown) writeFileSync(options.markdown, markdown);
      console.log(markdown);
      return;
    }
  }
  let pages;
  let queries;
  const sources = [];
  if (options.gscApi) {
    const json = process.env.GSC_SERVICE_ACCOUNT_JSON;
    if (!json || !json.trim()) throw new Error("--gsc-api needs GSC_SERVICE_ACCOUNT_JSON (a Google service-account JSON key with Restricted access to the Search Console property; see docs/COMMERCIAL_FUNNEL.md)");
    const fetched = await fetchSearchConsole(json, { now });
    ({ pages, queries } = fetched);
    sources.push(`Search Console API ${SITE}, ${fetched.window.startDate} to ${fetched.window.endDate} (${pages.length} pages, ${queries.length} queries)`);
  } else {
    ({ pages, queries } = readSearchConsoleDir(path.resolve(options.searchConsole)));
    sources.push(`Search Console export ${options.searchConsole}`);
  }

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

  const artists = readJson("public/data/artists.json");
  const events = readJson("public/data/events.json");
  // Listed guides and guides that went live on their own (owner decision
  // 2026-10-17), from the same derivation the router and sitemap use.
  const editoriallyIndexable = (Array.isArray(artists) ? artists : [])
    .filter((artist) => artist?.indexing_status === "indexable_with_substantial_content")
    .map((artist) => artist.slug);
  const result = scoreOpportunities({
    pages, queries, now,
    artists,
    events,
    priceGuides: deriveRenderedPriceGuides(events, editoriallyIndexable, { now }).map((guide) => guide.artistSlug),
    blogPosts: readBlogPosts(),
    priority,
    conversion: conversionByPageType(conversionRows),
    holds: HOLDS,
    titleFreeze: TITLE_FREEZE,
    linkedPaths: readLinkedPaths()
  });
  const markdown = renderMarkdown(result, { top: options.top, generatedAt: new Date(now).toISOString(), sources }) + (keywordBaseline ? `\n${renderKeywordBaseline(keywordBaseline)}` : "");
  if (options.json) writeFileSync(options.json, `${JSON.stringify({ generated_at: new Date(now).toISOString(), sources, ...result, ...(keywordBaseline ? { keyword_baseline: keywordBaseline } : {}) }, null, 2)}\n`);
  if (options.markdown) writeFileSync(options.markdown, markdown);
  console.log(markdown);
  if (options.issue) {
    const runUrl = process.env.GITHUB_RUN_ID && process.env.GITHUB_REPOSITORY
      ? `${process.env.GITHUB_SERVER_URL || "https://github.com"}/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`
      : "";
    const issue = await upsertRollingIssue(buildIssueBody(markdown, { runUrl }));
    console.log(`SEO opportunities issue #${issue.number} ${issue.created ? "created" : "updated"}.`);
  }
}

// ── Self-test: one fixture per decision rule ───────────────────────────────

async function selfTest() {
  let checks = 0;
  const check = (condition, message) => {
    assert.ok(condition, message);
    checks += 1;
  };
  const now = Date.parse("2026-10-16T12:00:00Z");
  const keywordCsv = 'Keyword,Rank,Volume,Traffic,URL,Score\n"ticket, comparison",12,100,999,https://tourticketcompare.com/,100\nprice guide,8,50,88,https://tourticketcompare.com/artists/test/ticket-prices,100';
  const baselineRows = keywordRows(keywordCsv);
  const baseline = buildKeywordBaseline(baselineRows, new Map([
    ["/", { status: 200, indexable: true, canonical: "https://tourticketcompare.com/" }],
    ["/artists/test/ticket-prices", { status: 301, indexable: false, location: "/artists/test" }]
  ]));
  check(baselineRows[0].keyword === "ticket, comparison" && !("Traffic" in baselineRows[0]), "keyword CSV preserves quoted fields without promoting vendor traffic to measured visits");
  check(baseline[0].bucket === "NEAR_TERM" && baseline[1].bucket === "HOLD" && baseline[0].country === null && baseline[0].approved_commission === null, "keyword baseline preserves unknown commercial evidence and holds redirects");
  for (const invalid of [keywordCsv.replace(',12,100,', ',,100,'), keywordCsv.replace('https://tourticketcompare.com/', 'https://example.com/'), `${keywordCsv}\nprice guide,8,50,88,https://tourticketcompare.com/artists/test/ticket-prices,100`]) {
    assert.throws(() => keywordRows(invalid));
    checks += 1;
  }
  check(renderKeywordBaseline(baseline).includes("not commercial scores"), "baseline labels its evidence limits");
  for (const page of [
    { status: 200, indexable: false, canonical: "https://tourticketcompare.com/" },
    { status: 200, indexable: true, canonical: "https://tourticketcompare.com/artists" },
    { status: 404, indexable: false }
  ]) {
    check(buildKeywordBaseline([baselineRows[0]], new Map([["/", page]]))[0].bucket === "HOLD", "keyword baseline holds excluded, noncanonical and missing pages");
  }
  const variants = buildKeywordBaseline([{ ...baselineRows[0], rank: 2 }, { ...baselineRows[0], keyword: "other phrase", rank: 50 }], new Map([["/", { status: 200, indexable: true, canonical: "https://tourticketcompare.com/" }]]));
  check(variants[0].bucket === "DEFEND" && variants[0].keywords.length === 2 && !("volume" in variants[0]), "top-three wins are retained without adding overlapping volumes");
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

  // Search Console API, against a throwaway key generated here (never a real one).
  const { privateKey, publicKey } = generateKeyPairSync("rsa", { modulusLength: 2048, privateKeyEncoding: { type: "pkcs8", format: "pem" }, publicKeyEncoding: { type: "spki", format: "pem" } });
  const keyJson = JSON.stringify({ type: "service_account", client_email: "seo-report@example.iam.gserviceaccount.com", private_key: privateKey });
  const jwt = buildJwtAssertion(parseServiceAccount(keyJson), now);
  const [jwtHeader, jwtClaims, jwtSignature] = jwt.split(".");
  const header = JSON.parse(Buffer.from(jwtHeader, "base64url").toString());
  const claims = JSON.parse(Buffer.from(jwtClaims, "base64url").toString());
  check(jwt.split(".").length === 3 && header.alg === "RS256" && header.typ === "JWT" && Object.keys(header).length === 2, "JWT header is RS256");
  check(claims.iss === "seo-report@example.iam.gserviceaccount.com" && claims.scope === SCOPE && claims.aud === TOKEN_URL && claims.iat === now / 1000 && claims.exp - claims.iat === 3600, "JWT claims carry issuer, read-only scope, audience and a 1h expiry");
  check(createVerify("RSA-SHA256").update(`${jwtHeader}.${jwtClaims}`).verify(publicKey, jwtSignature, "base64url"), "JWT signature verifies with the public key");
  check(!jwt.includes(privateKey.split("\n")[1]) && !Object.values(claims).some((v) => String(v).includes("PRIVATE")), "JWT carries no key material");
  check(SCOPE.endsWith("webmasters.readonly") && QUERY_URL.endsWith("/sites/sc-domain%3Atourticketcompare.com/searchAnalytics/query"), "read-only scope and the encoded domain property");
  for (const bad of ["not json {secret}", JSON.stringify({ client_email: "x", private_key: 5 })]) {
    let message = "";
    try {
      parseServiceAccount(bad);
    } catch (error) {
      message = error.message;
    }
    check(message && !message.includes("secret") && !message.includes('"x"'), "a malformed key is rejected without echoing it");
  }
  check(JSON.stringify(reportWindow(now)) === JSON.stringify({ startDate: "2026-09-16", endDate: "2026-10-13" }), "window is 28 complete days ending 3 days before today");
  const mapped = mapApiRows([{ keys: ["https://tourticketcompare.com/artists/lizzy-mcalpine"], clicks: 20, impressions: 6070, ctr: 0.9, position: 9.3 }, { keys: [""], clicks: 1, impressions: 1 }, { clicks: 1 }]);
  check(mapped.length === 1 && Object.keys(mapped[0]).join() === Object.keys(pages[0]).join() && JSON.stringify(mapped[0]) === JSON.stringify(pages[0]), "API rows map to the CSV row shape, CTR recomputed");

  const TOKEN = "ya29.secret-access-token";
  const calls = [];
  const reply = (status, body) => ({ ok: status >= 200 && status < 300, status, json: async () => body });
  const apiRows = (n, offset) => Array.from({ length: n }, (_, i) => ({ keys: [`https://tourticketcompare.com/p/${offset + i}`], clicks: 1, impressions: 10, position: 5 }));
  const mockFetch = async (url, init) => {
    calls.push({ url, init });
    if (url === TOKEN_URL) return reply(200, { access_token: TOKEN, token_type: "Bearer" });
    const body = JSON.parse(init.body);
    if (body.dimensions[0] === "page") return reply(200, { rows: apiRows(1000, body.startRow) });
    return reply(200, { rows: apiRows(body.startRow === 0 ? 1000 : 3, body.startRow) });
  };
  const fetched = await fetchSearchConsole(keyJson, { fetchImpl: mockFetch, now });
  const form = new URLSearchParams(calls[0].init.body);
  check(calls[0].url === TOKEN_URL && form.get("grant_type") === "urn:ietf:params:oauth:grant-type:jwt-bearer" && form.get("assertion").split(".").length === 3, "token request uses the JWT bearer grant");
  const queryCalls = calls.slice(1).map((call) => ({ ...JSON.parse(call.init.body), auth: call.init.headers.Authorization, url: call.url, method: call.init.method }));
  check(queryCalls.every((q) => q.method === "POST" && q.url === QUERY_URL && q.auth === `Bearer ${TOKEN}` && q.type === "web" && q.rowLimit === 1000 && q.startDate === "2026-09-16" && q.endDate === "2026-10-13"), "queries are bearer-authorised web queries over the window");
  check(fetched.pages.length === 5000 && queryCalls.filter((q) => q.dimensions[0] === "page").map((q) => q.startRow).join() === "0,1000,2000,3000,4000", "pages stop at 5000 rows");
  check(fetched.queries.length === 1003 && queryCalls.filter((q) => q.dimensions[0] === "query").map((q) => q.startRow).join() === "0,1000", "queries page until a short page");
  for (const [status, step] of [[401, TOKEN_URL], [403, QUERY_URL]]) {
    const failFetch = async (url, init) => (url === step ? { ok: false, status, json: async () => ({ error: `body with ${TOKEN}` }) } : mockFetch(url, init));
    let message = "";
    try {
      await fetchSearchConsole(keyJson, { fetchImpl: failFetch, now });
    } catch (error) {
      message = error.message;
    }
    check(message.includes(`HTTP ${status}`) && !message.includes(TOKEN) && !message.includes("PRIVATE KEY") && !message.includes("body with"), `HTTP ${status} fails with the status only`);
  }

  // Rolling issue.
  const issueBody = buildIssueBody(markdown, { runUrl: "https://github.com/o/r/actions/runs/1" });
  check(issueBody.startsWith("# SEO opportunities") && issueBody.includes("seo-opportunities.yml") && issueBody.includes("actions/runs/1"), "issue body is the report plus a footer");
  const huge = buildIssueBody("x\n".repeat(40000));
  check(huge.length <= MAX_ISSUE_BODY && huge.includes("_(truncated)_"), "an oversize report is truncated under GitHub's limit");
  const ghCalls = [];
  const ghFetch = (existing) => async (url, init) => {
    ghCalls.push({ url, method: init.method, body: init.body ? JSON.parse(init.body) : null, auth: init.headers.Authorization });
    if (init.method === "GET") return reply(200, existing);
    return reply(init.method === "POST" ? 201 : 200, { number: existing[0]?.number || 99 });
  };
  const created = await upsertRollingIssue("body-1", { fetchImpl: ghFetch([]), token: "ghs_test", repo: "o/r" });
  check(created.created && created.number === 99 && ghCalls[0].url.includes(encodeURIComponent(LABEL)) && ghCalls[1].method === "POST" && ghCalls[1].url === "https://api.github.com/repos/o/r/issues" && ghCalls[1].body.labels[0] === LABEL, "creates the labelled issue when none is open");
  ghCalls.length = 0;
  const updated = await upsertRollingIssue("body-2", { fetchImpl: ghFetch([{ number: 7 }]), token: "ghs_test", repo: "o/r" });
  check(!updated.created && updated.number === 7 && ghCalls.length === 2 && ghCalls[1].method === "PATCH" && ghCalls[1].url.endsWith("/issues/7") && ghCalls[1].body.body === "body-2" && ghCalls[1].auth === "Bearer ghs_test", "rewrites the open issue in place");
  let missing = "";
  try {
    await upsertRollingIssue("b", { fetchImpl: ghFetch([]), token: "", repo: "o/r" });
  } catch (error) {
    missing = error.message;
  }
  check(/GITHUB_TOKEN/.test(missing), "--issue without a token fails clearly");
  return checks;
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main(process.argv.slice(2)).catch((error) => {
    console.error(`SEO opportunity report failed: ${error.message}`);
    process.exit(1);
  });
}
