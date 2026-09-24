#!/usr/bin/env node
// Daily price-coverage report: which upcoming dates show a listed price, which
// do not and why, and how old the prices on the site are.
//
// Added 2026-09-24 (Phase 1 of the launch-readiness milestone,
// docs/audits/2026-09-launch-readiness.md §1). `price-freshness-check.yml`
// already turns red on a total blackout, when no lane is serving a price at
// all. This covers the partial regressions it cannot see:
//   - a lane that silently stops pricing the dates it is mapped to;
//   - prices aging on the site because the writers' ticks are being dropped;
//   - the "zero price sources" backlog: dates not mapped on any lane that
//     supplies prices, by artist and by country, so it can be worked down.
//
// Like the freshness check it probes the live site rather than the writers:
// one read of the same cache-only /api/shows payload an artist board renders,
// no credentials, and nothing imported beyond node builtins and the repo's
// pure helpers, so it runs without `npm ci`.
//
// Classification of each upcoming date (first match wins):
//   pre_onsale    Ticketmaster public on-sale still in the future; any resale
//                 price it shows is counted separately (pre_onsale_priced) and
//                 never enters the on-sale gate
//   priced        at least one lane prints a fresh listed price
//   mapped        verified on a price-supplying lane, on sale, yet no price —
//                 the regression signal; the gate is computed on these
//   seatgeek_only resale mapped only on SeatGeek, which never prices
//   unmapped      no resale mapping on any price-supplying lane
//
// Gate (exit 1): priced / (priced + mapped) below --min-share (default 0.90),
// or more than --max-stale-share (default 0.25) of displayed prices older than
// PRICE_STALE_AFTER_HOURS. An unreachable API exits 2: unknown, not healthy.
//
//   node scripts/report-price-coverage.mjs [--base-url URL] [--json] [--markdown FILE]
//   node scripts/report-price-coverage.mjs --issue     # also rewrite the rolling issue
//   node scripts/report-price-coverage.mjs --self-test

import assert from "node:assert/strict";
import fs from "node:fs/promises";
import { publicOnsalePending } from "../functions/_route-indexability.js";
import { laneBySlug, safeLaneUrl } from "./lib/event-link-coverage.mjs";

// Lanes with a numeric price feed and display on. Mirrors LISTED_PRICE_PROVIDERS
// in functions/[[path]].js.
export const PRICE_LANES = Object.freeze([
  Object.freeze({ slug: "vivid-seats", name: "Vivid Seats" }),
  Object.freeze({ slug: "ticketnetwork", name: "TicketNetwork" }),
  Object.freeze({ slug: "stubhub-international", name: "StubHub International" })
]);
const PRICE_LANE_NAMES = new Set(PRICE_LANES.map((lane) => lane.name));
// Same value as PRICE_STALE_AFTER_HOURS in functions/[[path]].js and public/app.js.
export const PRICE_STALE_AFTER_HOURS = 12;
export const DEFAULT_MIN_SHARE = 0.9;
export const DEFAULT_MAX_STALE_SHARE = 0.25;
const PAGE_LIMIT = 500;
const MAX_PAGES = 20;
const ISSUE_LABEL = "automation:price-coverage";
const ISSUE_TITLE = "Price coverage report";

function parseArgs(argv) {
  const options = { baseUrl: "https://tourticketcompare.com", json: false, markdown: "", issue: false, selfTest: false, minShare: DEFAULT_MIN_SHARE, maxStaleShare: DEFAULT_MAX_STALE_SHARE };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--json") options.json = true;
    else if (arg === "--issue") options.issue = true;
    else if (arg === "--self-test") options.selfTest = true;
    else if (arg === "--base-url") options.baseUrl = String(argv[++i] || "").replace(/\/+$/, "");
    else if (arg === "--markdown") options.markdown = String(argv[++i] || "");
    else if (arg === "--min-share") options.minShare = Number(argv[++i]);
    else if (arg === "--max-stale-share") options.maxStaleShare = Number(argv[++i]);
    else throw new Error(`Unknown option: ${arg}`);
  }
  if (!(options.minShare >= 0 && options.minShare <= 1)) throw new Error("--min-share must be between 0 and 1");
  if (!(options.maxStaleShare >= 0 && options.maxStaleShare <= 1)) throw new Error("--max-stale-share must be between 0 and 1");
  return options;
}

// The same bounded retry check-price-snapshot-freshness.mjs uses: a 429, a
// 5xx (this payload is the documented Pages CPU-limit 503) or a dropped
// connection is the origin declining to answer now, not a verdict. Anything
// else, or the same non-answer three times, is.
const FETCH_ATTEMPTS = 3;
async function fetchWithRetry(url, fetchImpl, sleep) {
  let last;
  for (let attempt = 1; attempt <= FETCH_ATTEMPTS; attempt += 1) {
    try {
      last = await fetchImpl(url, { headers: { Accept: "application/json" } });
      if (last.ok || !(last.status === 429 || last.status >= 500)) return last;
    } catch (error) {
      if (attempt === FETCH_ATTEMPTS) throw error;
    }
    if (attempt < FETCH_ATTEMPTS) await sleep(2000 * attempt);
  }
  return last;
}

export async function fetchAllShows(baseUrl, fetchImpl = globalThis.fetch, sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))) {
  const shows = [];
  for (let page = 0; page < MAX_PAGES; page += 1) {
    const url = `${baseUrl}/api/shows?includePrices=true&priceProviders=approved-marketplaces&limit=${PAGE_LIMIT}&offset=${page * PAGE_LIMIT}`;
    const response = await fetchWithRetry(url, fetchImpl, sleep);
    if (!response.ok) throw new Error(`GET ${url} returned HTTP ${response.status}`);
    const body = await response.json();
    const batch = Array.isArray(body?.shows) ? body.shows : null;
    if (!batch) throw new Error(`GET ${url} returned no shows array`);
    shows.push(...batch);
    if (batch.length < PAGE_LIMIT) return shows;
  }
  throw new Error(`more than ${MAX_PAGES * PAGE_LIMIT} shows; raise MAX_PAGES`);
}

function pricedLanes(show) {
  return (Array.isArray(show?.prices) ? show.prices : []).filter(
    (lane) => lane?.status === "ok" && Number.isFinite(Number(lane?.price)) && lane?.price !== null && PRICE_LANE_NAMES.has(lane?.provider)
  );
}

function mappedPriceLanes(show) {
  return PRICE_LANES.filter((lane) => show?.provider_links?.[lane.slug]?.verified === true && safeLaneUrl(show, laneBySlug(lane.slug)));
}

export function classifyShow(show, now = Date.now()) {
  if (publicOnsalePending(show, now)) return "pre_onsale";
  if (pricedLanes(show).length) return "priced";
  if (mappedPriceLanes(show).length) return "mapped";
  if (show?.provider_links?.seatgeek?.verified === true && show?.seatgeek_url) return "seatgeek_only";
  return "unmapped";
}

const increment = (map, key) => map.set(key, (map.get(key) || 0) + 1);
const sortedCounts = (map) => [...map.entries()].sort((a, b) => b[1] - a[1] || String(a[0]).localeCompare(String(b[0])));

export function analyse(shows, { now = Date.now(), minShare = DEFAULT_MIN_SHARE, maxStaleShare = DEFAULT_MAX_STALE_SHARE } = {}) {
  const upcoming = shows.filter((show) => Date.parse(String(show?.dateTimeISO || "")) > now);
  const counts = { priced: 0, pre_onsale: 0, mapped: 0, seatgeek_only: 0, unmapped: 0 };
  let preOnsalePriced = 0;
  const zeroSourceByArtist = new Map();
  const zeroSourceByCountry = new Map();
  const mappedUnpriced = [];
  const lanePriced = new Map(PRICE_LANES.map((lane) => [lane.name, 0]));
  const laneMapped = new Map(PRICE_LANES.map((lane) => [lane.name, 0]));
  const ages = [];
  for (const show of upcoming) {
    const kind = classifyShow(show, now);
    counts[kind] += 1;
    if (kind === "pre_onsale" && pricedLanes(show).length) preOnsalePriced += 1;
    for (const lane of mappedPriceLanes(show)) increment(laneMapped, lane.name);
    for (const lane of pricedLanes(show)) {
      increment(lanePriced, lane.provider);
      const age = (now - Date.parse(String(lane.fetchedAt || ""))) / 3600000;
      if (Number.isFinite(age)) ages.push({ age, provider: lane.provider, id: show.id });
    }
    if (kind === "unmapped" || kind === "seatgeek_only") {
      increment(zeroSourceByArtist, show.artist_slug || show.artist || "(unknown)");
      increment(zeroSourceByCountry, show.country || "(unknown)");
    }
    if (kind === "mapped") {
      mappedUnpriced.push({
        id: show.id,
        artist: show.artist_slug || show.artist || "",
        date: String(show.dateTimeISO || "").slice(0, 10),
        city: show.city || "",
        lanes: mappedPriceLanes(show).map((lane) => lane.name)
      });
    }
  }
  const denominator = counts.priced + counts.mapped;
  const coverageShare = denominator ? counts.priced / denominator : 0;
  const stale = ages.filter((entry) => entry.age > PRICE_STALE_AFTER_HOURS);
  const staleShare = ages.length ? stale.length / ages.length : 0;
  const maxAgeHours = ages.length ? Math.max(...ages.map((entry) => entry.age)) : null;
  const problems = [];
  if (!upcoming.length) problems.push("the API returned no upcoming shows");
  else if (!denominator) problems.push("no upcoming date is mapped on a price-supplying lane");
  else if (coverageShare < minShare) {
    problems.push(`only ${(coverageShare * 100).toFixed(1)}% of on-sale dates mapped on a price lane show a price (gate ${(minShare * 100).toFixed(0)}%)`);
  }
  if (ages.length && staleShare > maxStaleShare) {
    problems.push(`${(staleShare * 100).toFixed(1)}% of displayed prices are older than ${PRICE_STALE_AFTER_HOURS}h (gate ${(maxStaleShare * 100).toFixed(0)}%) — check the snapshot writers' delivered runs`);
  }
  return {
    generated_at: new Date(now).toISOString(),
    upcoming: upcoming.length,
    counts,
    pre_onsale_priced: preOnsalePriced,
    zero_price_sources: counts.unmapped + counts.seatgeek_only,
    coverage_share: Number(coverageShare.toFixed(4)),
    stale_share: Number(staleShare.toFixed(4)),
    displayed_prices: ages.length,
    max_age_hours: maxAgeHours == null ? null : Number(maxAgeHours.toFixed(1)),
    lanes: PRICE_LANES.map((lane) => ({ provider: lane.name, mapped: laneMapped.get(lane.name) || 0, priced: lanePriced.get(lane.name) || 0 })),
    zero_source_by_artist: sortedCounts(zeroSourceByArtist),
    zero_source_by_country: sortedCounts(zeroSourceByCountry),
    mapped_unpriced: mappedUnpriced.sort((a, b) => a.date.localeCompare(b.date)),
    gates: { min_share: minShare, max_stale_share: maxStaleShare },
    problems,
    ok: problems.length === 0
  };
}

const pct = (value) => `${(value * 100).toFixed(1)}%`;

export function renderMarkdown(report, baseUrl = "") {
  const c = report.counts;
  const lines = [
    `## Price coverage — ${report.ok ? "OK" : "**NEEDS ATTENTION**"}`,
    "",
    `Generated ${report.generated_at} from the live \`/api/shows\` price payload${baseUrl ? ` at ${baseUrl}` : ""}. Rewritten daily by \`price-coverage-report.yml\`; do not edit by hand.`,
    ""
  ];
  if (report.problems.length) lines.push(...report.problems.map((problem) => `- ❌ ${problem}`), "");
  lines.push(
    "| Upcoming dates | Priced | Pre-on-sale | Mapped, no price | SeatGeek only | Unmapped |",
    "|---:|---:|---:|---:|---:|---:|",
    `| ${report.upcoming} | ${c.priced} | ${c.pre_onsale} | ${c.mapped} | ${c.seatgeek_only} | ${c.unmapped} |`,
    "",
    `- **Coverage of mapped, on-sale dates:** ${pct(report.coverage_share)} (gate ≥ ${pct(report.gates.min_share)}).`,
    `- **Pre-on-sale dates showing a resale price:** ${report.pre_onsale_priced} of ${c.pre_onsale} (reported only; not part of the gate).`,
    `- **Dates with zero price sources:** ${report.zero_price_sources} (unmapped + SeatGeek-only). This is a mapping backlog, not a failure — it is not gated.`,
    `- **Price age:** ${report.displayed_prices} displayed prices, ${pct(report.stale_share)} older than ${PRICE_STALE_AFTER_HOURS}h (gate ≤ ${pct(report.gates.max_stale_share)}), oldest ${report.max_age_hours ?? "n/a"}h.`,
    "",
    "### By lane",
    "",
    "| Lane | Dates mapped | Dates priced |",
    "|---|---:|---:|",
    ...report.lanes.map((lane) => `| ${lane.provider} | ${lane.mapped} | ${lane.priced} |`),
    ""
  );
  const table = (title, rows, head) => {
    if (!rows.length) return;
    lines.push(`### ${title}`, "", `| ${head} | Dates |`, "|---|---:|", ...rows.slice(0, 25).map(([key, n]) => `| ${key} | ${n} |`));
    if (rows.length > 25) lines.push(`| …${rows.length - 25} more | |`);
    lines.push("");
  };
  table("Zero price sources, by artist", report.zero_source_by_artist, "Artist");
  table("Zero price sources, by country", report.zero_source_by_country, "Country");
  if (report.mapped_unpriced.length) {
    lines.push(
      "### Mapped and on sale, but no price",
      "",
      "Each date below is verified on at least one price-supplying lane, so the writer queried it. A handful is normal (a listing with no inventory yet); a jump here means a lane stopped pricing.",
      "",
      "| Date | Artist | City | Lanes | Event |",
      "|---|---|---|---|---|",
      ...report.mapped_unpriced.slice(0, 40).map((row) => `| ${row.date} | ${row.artist} | ${row.city} | ${row.lanes.join(", ")} | \`${row.id}\` |`)
    );
    if (report.mapped_unpriced.length > 40) lines.push(`| …${report.mapped_unpriced.length - 40} more | | | | |`);
    lines.push("");
  }
  return lines.join("\n");
}

async function gh(token, repo, method, apiPath, body) {
  const response = await fetch(`https://api.github.com${apiPath.replace("{repo}", repo)}`, {
    method,
    headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28", "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined
  });
  if (!response.ok) throw new Error(`GitHub ${method} ${apiPath} returned HTTP ${response.status}`);
  return response.json();
}

async function upsertIssue(markdown) {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPOSITORY;
  if (!token || !repo) throw new Error("--issue needs GITHUB_TOKEN and GITHUB_REPOSITORY");
  const open = await gh(token, repo, "GET", `/repos/{repo}/issues?state=open&labels=${encodeURIComponent(ISSUE_LABEL)}`);
  const existing = (Array.isArray(open) ? open : []).find((issue) => !issue.pull_request);
  if (existing) return gh(token, repo, "PATCH", `/repos/{repo}/issues/${existing.number}`, { body: markdown });
  return gh(token, repo, "POST", "/repos/{repo}/issues", { title: ISSUE_TITLE, body: markdown, labels: [ISSUE_LABEL] });
}

async function retrySelfTest() {
  let calls = 0;
  const flaky = async () => (++calls < 3 ? new Response("busy", { status: 503 }) : new Response(JSON.stringify({ shows: [] }), { status: 200 }));
  assert.deepEqual(await fetchAllShows("https://x.test", flaky, async () => {}), [], "two 503s then a 200 is a read, not a failure");
  let hard = 0;
  const down = async () => { hard += 1; return new Response("nope", { status: 503 }); };
  await assert.rejects(fetchAllShows("https://x.test", down, async () => {}), /503/, "three 503s is a failure");
  assert.equal(hard, 3, "retries are bounded at three");
  let notFound = 0;
  await assert.rejects(fetchAllShows("https://x.test", async () => { notFound += 1; return new Response("", { status: 404 }); }, async () => {}));
  assert.equal(notFound, 1, "a 404 is a verdict on the first attempt");
  return 5;
}

function selfTest() {
  const now = Date.parse("2026-09-24T12:00:00Z");
  const base = {
    dateTimeISO: "2026-10-01T01:00:00Z",
    artist_slug: "fixture",
    country: "United States",
    city: "Springfield",
    provider_links: {}
  };
  const vivid = {
    vividseats_url: "https://www.vividseats.com/fixture--concerts-pop/production/123",
    provider_links: { "vivid-seats": { verified: true } }
  };
  const okLane = (fetchedAt) => ({ provider: "Vivid Seats", status: "ok", price: 120, fetchedAt });
  const shows = [
    { ...base, ...vivid, id: "p1", prices: [okLane("2026-09-24T10:00:00Z")] },
    { ...base, ...vivid, id: "p2", prices: [okLane("2026-09-23T20:00:00Z")] },
    { ...base, ...vivid, id: "m1", prices: [{ provider: "Vivid Seats", status: "unavailable", price: null }] },
    { ...base, ...vivid, id: "o1", public_onsale_at: "2026-10-01T00:00:00Z", prices: [] },
    { ...base, id: "s1", seatgeek_url: "https://seatgeek.com/x/concert/1", provider_links: { seatgeek: { verified: true } }, prices: [] },
    { ...base, id: "u1", country: "Belgium", prices: [] },
    { ...base, id: "past", dateTimeISO: "2026-09-01T00:00:00Z", prices: [] },
    // An unverified stored URL is not a mapping.
    { ...base, id: "u2", vividseats_url: vivid.vividseats_url, provider_links: { "vivid-seats": { verified: false } }, prices: [] },
    // SeatGeek "ok" lanes never count as a price.
    { ...base, id: "u3", prices: [{ provider: "SeatGeek", status: "ok", price: 50, fetchedAt: "2026-09-24T10:00:00Z" }] },
    // Pre-on-sale with a resale price: counted apart, never inflating the gate.
    { ...base, ...vivid, id: "o2", public_onsale_at: "2026-10-01T00:00:00Z", prices: [okLane("2026-09-24T10:00:00Z")] }
  ];
  assert.equal(classifyShow(shows[0], now), "priced");
  assert.equal(classifyShow(shows[2], now), "mapped");
  assert.equal(classifyShow(shows[3], now), "pre_onsale");
  assert.equal(classifyShow(shows[4], now), "seatgeek_only");
  assert.equal(classifyShow(shows[7], now), "unmapped");
  assert.equal(classifyShow(shows[8], now), "unmapped");
  const report = analyse(shows, { now });
  assert.equal(report.upcoming, 9, "past dates are excluded");
  assert.deepEqual(report.counts, { priced: 2, pre_onsale: 2, mapped: 1, seatgeek_only: 1, unmapped: 3 });
  assert.equal(report.pre_onsale_priced, 1, "a priced pre-on-sale date is counted apart");
  assert.equal(classifyShow(shows[9], now), "pre_onsale", "a priced pre-on-sale date stays pre_onsale");
  assert.equal(report.zero_price_sources, 4);
  assert.equal(report.coverage_share, 0.6667);
  assert.equal(report.stale_share, 0.3333, "a 16h-old price is stale, a 2h-old one is not");
  assert.equal(report.ok, false);
  assert.equal(report.problems.length, 2, "both the coverage and the staleness gates fire");
  assert.deepEqual(report.zero_source_by_country[0], ["United States", 3]);
  assert.equal(report.mapped_unpriced[0].id, "m1");
  const healthy = analyse(shows.filter((show) => show.id !== "m1" && show.id !== "p2"), { now });
  assert.equal(healthy.ok, true, "unmapped and pre-on-sale dates never fail the gate");
  const empty = analyse([], { now });
  assert.equal(empty.ok, false, "an empty payload is a problem, not a pass");
  const md = renderMarkdown(report);
  assert.match(md, /NEEDS ATTENTION/);
  assert.match(md, /\| 9 \| 2 \| 2 \| 1 \| 1 \| 3 \|/);
  assert.match(md, /Mapped and on sale, but no price/);
  assert.throws(() => parseArgs(["--min-share", "2"]));
  return 25;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.selfTest) {
    console.log(`price-coverage self-test: ${selfTest() + (await retrySelfTest())} assertions passed`);
    return;
  }
  let shows;
  try {
    shows = await fetchAllShows(options.baseUrl);
  } catch (error) {
    console.error(`price-coverage: could not read the live price payload — ${error?.message || error}`);
    process.exitCode = 2;
    return;
  }
  const report = analyse(shows, { minShare: options.minShare, maxStaleShare: options.maxStaleShare });
  const markdown = renderMarkdown(report, options.baseUrl);
  if (options.markdown) await fs.writeFile(options.markdown, `${markdown}\n`);
  if (options.issue) await upsertIssue(markdown);
  console.log(options.json ? JSON.stringify(report, null, 2) : markdown);
  if (!report.ok) process.exitCode = 1;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((error) => {
    console.error(error?.stack || error);
    process.exitCode = 1;
  });
}
