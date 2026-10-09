#!/usr/bin/env node
//
// Tests for the read-only event indexing pilot report
// (scripts/report-event-indexing-pilot.mjs): the cohort is exactly the frozen
// record, today's eligibility can never add a member, a member that drops out
// stays in the report with its reason, launch-time facts are never overwritten
// by current ones, optional Search Console and route-traffic inputs join by
// canonical URL only, missing metrics stay missing, query classification is
// conservative, and running the report changes nothing on disk.
//
// Usage: node scripts/event-indexing-pilot-report.test.mjs

import crypto from "node:crypto";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const checks = [];
const assert = (label, pass) => checks.push({ label, pass: !!pass });
const load = (relative) => import(pathToFileURL(path.join(ROOT, relative)));
const readJson = (relative) => JSON.parse(fs.readFileSync(path.join(ROOT, relative), "utf8"));
const throws = (fn) => {
  try {
    fn();
    return false;
  } catch {
    return true;
  }
};

const NOW = Date.parse("2026-09-28T12:00:00Z");
const report = await load("scripts/report-event-indexing-pilot.mjs");
const policy = await load("functions/_event-indexability.js");
const { eventPath } = await load("functions/_event-pages.js");
const { providerConfiguredTest, publishableLaneSlugs } = await load("scripts/lib/event-link-coverage.mjs");
const { wranglerVars } = await load("scripts/lib/event-indexability-audit.mjs");

const record = readJson("data/event-indexing-pilot.json");
const events = readJson("public/data/events.json");
const artists = readJson("public/data/artists.json");
const catalog = readJson("public/data/catalog.json");
const vars = wranglerVars(fs.readFileSync(path.join(ROOT, "wrangler.toml"), "utf8"));
const base = { record, events, artists, catalog, vars, now: NOW };
const keysOf = (built) => built.members.map((member) => member.key);
const recordKeys = record.members.map((member) => member.key);
const [M0, M1, M2] = record.members;
const url = (member) => `https://tourticketcompare.com${member.canonical_path}`;

// ─── 1–2. the cohort is the frozen record, never current eligibility ────────
{
  const built = report.buildReport(base);
  assert("1. the cohort is exactly the record's 30 keys, in record order", built.members.length === 30 && JSON.stringify(keysOf(built)) === JSON.stringify(recordKeys));
  assert("1. the record agrees with the runtime list (EVENT_INDEXING_PILOT_KEYS)", built.inputs.runtime_keys_match_record === true && JSON.stringify([...policy.EVENT_INDEXING_PILOT_KEYS]) === JSON.stringify(recordKeys));
  const small = { ...record, members: record.members.slice(0, 2) };
  const fromSmall = report.buildReport({ ...base, record: small });
  assert("1. membership follows the supplied record, not the runtime list", JSON.stringify(keysOf(fromSmall)) === JSON.stringify(recordKeys.slice(0, 2)) && fromSmall.inputs.runtime_keys_match_record === false);
  assert("1. a malformed record fails loudly rather than guessing members", [
    { ...record, members: [] },
    { ...record, members: [record.members[0], record.members[0]] },
    { ...record, members: [{ ...M0, key: "0000000000000000" }] },
    { ...record, members: [{ ...M0, canonical_path: "/events/wrong-path-0000000000000000" }] }
  ].every((bad) => throws(() => report.cohortFromRecord(bad))));

  const batchRecord = readJson("data/event-indexing-batches.json");
  const firstBatch = batchRecord.batches[0];
  const fromBatch = report.buildReport({ ...base, record: { ...report.recordForBatch(batchRecord, firstBatch.id), runtime_keys: firstBatch.members.map((member) => member.key) } });
  assert("1. --batch measures that staged batch's frozen members, never the pilot's", JSON.stringify(keysOf(fromBatch)) === JSON.stringify(firstBatch.members.map((member) => member.key)) && fromBatch.inputs.runtime_keys_match_record === true && !keysOf(fromBatch).some((key) => recordKeys.includes(key)));
  assert("1. an unknown batch id fails loudly", throws(() => report.recordForBatch(batchRecord, "batch-unknown")));

  const isConfigured = providerConfiguredTest(catalog);
  const eligibleNonPilot = policy
    .deriveEventIndexability(events, artists, { lanesFor: (event) => publishableLaneSlugs(event, isConfigured, NOW), now: NOW })
    .filter((decision) => decision.eligible && !recordKeys.includes(decision.key));
  assert(`2. hundreds of eligible non-pilot pages exist today (${eligibleNonPilot.length})`, eligibleNonPilot.length > 100);
  assert("2. none of them joins the report, and the indexed count never exceeds the cohort", !built.members.some((member) => eligibleNonPilot.some((decision) => decision.key === member.key)) && built.summary.active_indexed <= 30);
  assert("2. with a 2-member record only those 2 can be indexed, however many are eligible", fromSmall.summary.active_indexed <= 2 && fromSmall.members.length === 2);
}

// ─── 3. a member that drops out stays, with its reason; launch_* is frozen ──
{
  const cancelled = events.map((event) => (event.id === M0.event_id ? { ...event, ticketmaster_status_code: "cancelled" } : event));
  const withoutM1 = cancelled.filter((event) => event.id !== M1.event_id);
  const built = report.buildReport({ ...base, events: withoutM1 });
  const row0 = built.members.find((member) => member.key === M0.key);
  const row1 = built.members.find((member) => member.key === M1.key);
  assert("3. both dropped members are still reported: cohort stays 30", built.members.length === 30 && row0 && row1);
  assert("3. a cancelled member is not indexed, not in the sitemap, and says why", !row0.current.indexed && !row0.current.in_events_sitemap && row0.current.eligibility_reasons.includes("lifecycle_held") && row0.current.exists);
  assert("3. a removed member is reported as gone (unknown key), launch URL 404", !row1.current.exists && !row1.current.indexed && row1.current.not_indexed_reason === "unknown_key" && row1.current.launch_url_http === 404);
  assert("3. the summary counts the drop-outs and their reasons, and nothing replaces them", built.summary.dropped_out >= 2 && built.summary.dropped_out_reasons.unknown_key >= 1 && built.summary.dropped_out_reasons.lifecycle_held >= 1 && built.members.length === 30);
  assert("3. launch_* keeps the record's values while current_* shows today's", row1.launch.destinations === M1.destinations && row1.current.destinations === 0 && row0.launch.snapshot_ready_lanes === M0.snapshot_ready_lanes && row0.launch.artist_city === M0.artist_city);
}

// ─── 4. launch date and time since launch ───────────────────────────────────
{
  assert("4. the record states launch_date 2026-09-27", record.launch_date === "2026-09-27" && report.parseLaunchDate(record)?.date === "2026-09-27");
  assert("4. an unset or impossible launch date is null, not guessed", [null, "", "2026-02-30", "27/09/2026", "2026-9-27", 20260927].every((value) => report.parseLaunchDate({ launch_date: value }) === null));
  assert("4. days since launch counts UTC calendar days", report.daysSince("2026-09-27", NOW) === 1 && report.daysSince("2026-09-27", Date.parse("2026-09-27T23:59:00Z")) === 0 && report.daysSince("2026-09-27", Date.parse("2026-11-08T00:00:00Z")) === 42);
  const built = report.buildReport(base);
  assert("4. the report shows days since launch and the non-binding checkpoint", built.launch.launch_date === "2026-09-27" && built.launch.days_since_launch === 1 && /before/.test(built.launch.checkpoint.current) && built.launch.checkpoint.next.day === 14);
  const sixWeeks = report.buildReport({ ...base, now: Date.parse("2026-11-10T12:00:00Z") });
  assert("4. at six weeks the checkpoint is the 6–8 week review window", sixWeeks.launch.days_since_launch === 44 && sixWeeks.launch.checkpoint.current === "6–8 weeks");
  const row = built.members.find((member) => member.key === M0.key);
  assert("4. days until the event come from its venue-local date", row.current.days_until_event === -report.daysSince(M0.local_date, NOW));
}

// ─── 5. no Search Console, no traffic: unknown, not zero ────────────────────
{
  const built = report.buildReport(base);
  assert("5. without --search-console the search section is unavailable", built.search_console.available === false && built.members.every((member) => member.search === null));
  assert("5. search figures are null (unknown), never 0", [built.summary.pages_with_impressions, built.summary.total_impressions, built.summary.reached_top_10, built.summary.no_search_visibility, built.summary.query_forms].every((value) => value === null));
  assert("5. without a traffic export engagement is null, not 0", built.ttc_engagement.available === false && built.summary.pages_with_views === null && built.members.every((member) => member.engagement === null));
  const text = report.renderText(built);
  assert("5. the text report renders and says what is unknown", text.includes("unknown, not zero") && text.includes("1. still active/indexable") && text.includes(M0.key));
  assert("5. no revenue figure is invented", built.revenue.available === false);
}

// ─── 6–9. Search Console export ─────────────────────────────────────────────
const nonPilot = events.find((event) => eventPath(event) && !recordKeys.includes(eventPath(event).slice(-16)));
const csv = [
  "Page,Query,Clicks,Impressions,CTR,Position",
  `${url(M0)},olivia rodrigo palau sant jordi,2,40,5%,8.5`,
  `${url(M0)}/,olivia rodrigo barcelona,0,10,0%,21`,
  `${url(M0).replace("https://", "https://www.")}?utm_source=x,olivia rodrigo tickets,1,50,2%,45`,
  `${url(M1)},"gracie abrams 3arena, dublin",0,5,0%,`,
  `https://tourticketcompare.com${eventPath(nonPilot)},other event,9,900,1%,1`,
  `https://evil.example${M2.canonical_path},spoof,9,900,1%,1`,
  `https://tourticketcompare.com/events/renamed-slug-${M2.key},stale slug,9,900,1%,1`,
  "https://tourticketcompare.com/artists/olivia-rodrigo,artist page,9,900,1%,1",
  `${url(M2)},missing impressions,1,,,3`,
  `${url(M2)},more clicks than impressions,5,1,,3`
].join("\n");
{
  const parsed = report.parseSearchConsoleExport(csv, "export.csv");
  assert("6. CSV parses, quoted commas intact, bad rows counted as invalid", parsed.rows.length === 8 && parsed.invalid === 2 && parsed.rows.some((row) => row.query === "gracie abrams 3arena, dublin"));
  const built = report.buildReport({ ...base, searchConsole: parsed, searchConsolePeriod: report.parsePeriod("2026-09-27..2026-10-10") });
  const row0 = built.members.find((member) => member.key === M0.key).search;
  assert("6. a pilot URL maps with or without www, trailing slash or query string", row0.impressions === 100 && row0.clicks === 3 && row0.distinct_queries === 3);
  assert("6. CTR is recomputed, position impression-weighted, best position kept", row0.ctr === 0.03 && row0.average_position === Number(((8.5 * 40 + 21 * 10 + 45 * 50) / 100).toFixed(1)) && row0.best_position === 8.5);
  assert("6. the measurement period is labelled with its source", built.search_console.period.start === "2026-09-27" && built.search_console.period.end === "2026-10-10" && built.search_console.period.source === "--search-console-period");
  assert("7. unknown URLs never join: other event, other host, stale slug, non-event page", built.members.length === 30 && built.search_console.unmatched.rows === 4 && built.summary.total_impressions === 105);
  assert("7. a pilot key under a non-canonical slug is reported apart, not joined", built.search_console.unmatched.pilot_key_noncanonical.length === 1 && built.search_console.unmatched.other_event_urls.length === 1 && built.search_console.unmatched.other_urls.length === 2);
  assert("7. the reached-top counts use only cohort rows", built.summary.reached_top_10 === 1 && built.summary.reached_top_50 === 1 && built.summary.pages_with_impressions === 2);

  // 8. duplicates: order-independent, counted.
  const dupRows = [
    { page: url(M0), query: "q", date: "2026-10-01", clicks: 1, impressions: 10, position: 5 },
    { page: `${url(M0)}/`, query: "Q", date: "2026-10-01", clicks: 2, impressions: 30, position: 7 },
    { page: url(M0), query: "q", date: "2026-10-01", clicks: 2, impressions: 30, position: 6 },
    { page: url(M0), query: "q", date: "2026-10-02", clicks: 0, impressions: 5, position: 9 }
  ];
  const a = report.joinSearchConsole(report.cohortFromRecord(record), null, { rows: dupRows, invalid: 0, period: null, hasQueries: true });
  const b = report.joinSearchConsole(report.cohortFromRecord(record), null, { rows: [...dupRows].reverse(), invalid: 0, period: null, hasQueries: true });
  const pick = (joined) => JSON.stringify(joined.perKey.get(M0.key));
  assert("8. duplicate (page, query, date) rows collapse to one, whatever the file order", pick(a) === pick(b) && a.rows_duplicate === 2 && a.perKey.get(M0.key).impressions === 35);
  assert("8. the kept duplicate is chosen by value (most impressions, then clicks, then best position)", a.perKey.get(M0.key).best_position === 6);
  assert("8. a period can come from row dates when none is stated", a.period.start === "2026-10-01" && a.period.end === "2026-10-02" && a.period.source === "row dates");

  // 9. missing metrics.
  const quiet = built.members.find((member) => member.key === M2.key).search;
  assert("9. a pilot page with no rows has 0 impressions and clicks but no position or CTR", quiet.impressions === 0 && quiet.clicks === 0 && quiet.average_position === null && quiet.ctr === null && quiet.best_position === null);
  const noPosition = built.members.find((member) => member.key === M1.key).search;
  assert("9. a row without a position counts impressions but invents no position", noPosition.impressions === 5 && noPosition.average_position === null);
  const pageOnly = report.parseSearchConsoleExport(JSON.stringify({ startDate: "2026-09-27", endDate: "2026-10-04", rows: [{ page: url(M0), clicks: 1, impressions: 12, position: 30 }] }), "gsc.json");
  const joined = report.buildReport({ ...base, searchConsole: pageOnly });
  assert("9. a page-only JSON export works, takes its period from the file, and has no query forms", joined.summary.total_impressions === 12 && joined.search_console.period.source === "export" && joined.summary.query_forms === null);
  const api = report.parseSearchConsoleExport(JSON.stringify({ dimensions: ["page", "query"], rows: [{ keys: [url(M0), "olivia rodrigo may 1"], clicks: 0, impressions: 3, ctr: 0, position: 12 }] }), "api.json");
  assert("9. API-style rows are named by their dimensions", api.rows.length === 1 && api.rows[0].query === "olivia rodrigo may 1" && api.rows[0].position === 12);
  assert("9. page-level rows are Search Console's totals; query rows are not added on top", (() => {
    const mixed = report.joinSearchConsole(report.cohortFromRecord(record), null, { rows: [{ page: url(M0), query: null, date: "", clicks: 4, impressions: 100, position: 10 }, { page: url(M0), query: "q", date: "", clicks: 1, impressions: 20, position: 9 }], invalid: 0, period: null, hasQueries: true });
    return mixed.perKey.get(M0.key).impressions === 100 && mixed.perKey.get(M0.key).totals_source === "page_rows" && mixed.perKey.get(M0.key).distinct_queries === 1;
  })());

  // Route traffic: canonical paths only; no provider split invented.
  const traffic = { generated_at: "2026-09-28T00:00:00Z", since: "2026-09-27T00:00:00.000Z", routes: { [M0.canonical_path]: { views: 40, provider_clicks: 3, outbound_clicks: 2, outbound_by_provider: { "vivid-seats": 2 } }, [eventPath(nonPilot)]: { views: 999, provider_clicks: 9, outbound_clicks: 9, outbound_by_provider: {} } } };
  const withTraffic = report.buildReport({ ...base, routeTraffic: traffic });
  const t0 = withTraffic.members.find((member) => member.key === M0.key).engagement;
  const t2 = withTraffic.members.find((member) => member.key === M2.key).engagement;
  assert("9. traffic joins by canonical path; a non-pilot route never joins", t0.views === 40 && t0.outbound_clicks === 2 && withTraffic.summary.total_views === 40 && withTraffic.summary.pages_with_outbound_clicks === 1);
  assert("9. a pilot route absent from the export has 0 views, and a rate needs ≥30 views", t2.views === 0 && t2.outbound_rate === null && t0.outbound_rate === 0.05);
  assert("9. providers clicked come from the export's per-provider split", JSON.stringify(withTraffic.summary.providers_clicked) === JSON.stringify({ "vivid-seats": 2 }));
  const oldShape = report.buildReport({ ...base, routeTraffic: { generated_at: "x", routes: { [M0.canonical_path]: { views: 1, provider_clicks: 0, outbound_clicks: 1 } } } });
  assert("9. an export without a provider split reports providers as unknown, not empty", oldShape.summary.providers_clicked === null && oldShape.members[0].engagement.outbound_by_provider === null && oldShape.ttc_engagement.since === null);
}

// ─── 10. query classification ───────────────────────────────────────────────
{
  const member = { artist: "Olivia Rodrigo", venue: "Palau Sant Jordi", city: "Barcelona", local_date: "2027-05-01" };
  const the = { artist: "The Interrupters", venue: "House of Blues Dallas", city: "Dallas", local_date: "2027-03-23" };
  const cases = [
    ["olivia rodrigo palau sant jordi may 1", member, "artist_venue_date"],
    ["Olivia Rodrigo Palau Sant Jordi 1st May 2027 tickets", member, "artist_venue_date"],
    ["olivia rodrigo barcelona 5/1", member, "artist_city_date"],
    ["olivia rodrigo barcelona 1/5/2027", member, "artist_city_date"],
    ["olivia rodrigo palau sant jordi", member, "artist_venue"],
    ["olivia rodrigo may 1 2027", member, "artist_date"],
    ["olivia rodrigo 2027-05-01", member, "artist_date"],
    ["olivia rodrigo barcelona tickets", member, "artist_city"],
    ["olivia rodrigo tickets 2027", member, "artist_generic"],
    ["olivia rodrigo", member, "artist_generic"],
    ["olivia rodrigo barcelona may 2", member, "other"],
    ["olivia rodrigo setlist", member, "other"],
    ["palau sant jordi concerts may 2027", member, "no_artist"],
    ["olivia", member, "no_artist"],
    ["interrupters house of blues dallas", the, "artist_venue"],
    ["the interrupters dallas march 23rd", the, "artist_city_date"],
    ["Olívia Rodrigo Barcelona", member, "artist_city"]
  ];
  const wrong = cases.filter(([query, subject, expected]) => report.classifyQuery(query, subject) !== expected).map(([query, subject]) => `${query} -> ${report.classifyQuery(query, subject)}`);
  assert(`10. representative queries classify conservatively${wrong.length ? ` (${wrong.join("; ")})` : ""}`, wrong.length === 0);
  const built = report.buildReport({ ...base, searchConsole: report.parseSearchConsoleExport(csv, "export.csv") });
  const forms = built.summary.query_forms;
  assert("10. query forms aggregate classified queries with examples", forms.artist_venue.queries === 2 && forms.artist_city.queries === 1 && forms.artist_generic.queries === 1 && forms.artist_venue.examples[0] === "olivia rodrigo palau sant jordi");
}

// ─── live page facts (parser only; tests never touch the network) ───────────
{
  const html = `<meta name="robots" content="index,follow,max-image-preview:large"><link rel="canonical" href="${url(M0)}"><main id="mainContent"><a class="provider-cta provider-cta-priced" href="/api/out?x" data-cta-provider="vivid-seats">$1</a><a class="provider-cta provider-cta-priced provider-cta-lowest" href="/api/out?y" data-cta-provider="stubhub-international">$1</a><a class="provider-cta" href="/api/out?z" data-cta-provider="ticketmaster">Check</a><div class="price-history" data-price-history="x"></div><section class="nested-panel" aria-labelledby="eventPricesTitle"><ul><li>Lowest listed price: $165.98 on StubHub International, as of 28 Sept 2026, 00:53 UTC · Lowest recorded in 30 days</li><li>Latest recorded change: Vivid Seats down $5.</li></ul></section></main>`;
  const facts = report.livePageFacts(200, html);
  assert("live: priced and unpriced buttons are both counted", facts.rendered_ctas === 3 && facts.marketplace_ctas === 2 && facts.priced_ctas === 2);
  assert("live: price, as-of time, 30-day low, movement and history panel are read from the render", facts.current_price && facts.freshness_timestamp && facts.thirty_day_low && facts.price_movement && facts.price_history_panel && facts.robots.startsWith("index,follow"));
  const bare = report.livePageFacts(200, `<main id="mainContent"><a class="provider-cta" href="/x" data-cta-provider="ticketmaster">Check</a></main>`);
  assert("live: a page without prices records every price fact as absent", !bare.current_price && !bare.freshness_timestamp && !bare.thirty_day_low && !bare.price_movement && !bare.price_history_panel && bare.rendered_ctas === 1);
}

// ─── 11–13. read-only: nothing on disk changes ──────────────────────────────
{
  const guarded = [
    "data/event-indexing-pilot.json",
    "public/data/events.json",
    "public/data/artists.json",
    "public/data/catalog.json",
    "functions/_event-indexability.js",
    "wrangler.toml",
    "public/_routes.json"
  ];
  const hash = () => guarded.map((file) => crypto.createHash("sha256").update(fs.readFileSync(path.join(ROOT, file))).digest("hex")).join(",");
  const before = hash();
  const eventsBefore = JSON.stringify(events);
  const recordBefore = JSON.stringify(record);
  const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "pilot-report-"));
  const csvFile = path.join(tmp, "gsc.csv");
  const trafficFile = path.join(tmp, "route-traffic.json");
  fs.writeFileSync(csvFile, csv);
  fs.writeFileSync(trafficFile, JSON.stringify({ generated_at: "2026-09-28T00:00:00Z", since: "", routes: { [M0.canonical_path]: { views: 3, provider_clicks: 0, outbound_clicks: 1, outbound_by_provider: { ticketmaster: 1 } } } }));
  const tmpBefore = fs.readdirSync(tmp).sort().join(",");
  const run = (args) => execFileSync(process.execPath, [path.join(ROOT, "scripts/report-event-indexing-pilot.mjs"), ...args], { cwd: ROOT, env: { ...process.env, TTC_NOW: "2026-09-28T12:00:00Z" }, encoding: "utf8" });
  const json = JSON.parse(run(["--json", "--search-console", csvFile, "--search-console-period", "2026-09-27..2026-09-28", "--route-traffic", trafficFile]));
  const text = run([]);
  assert("14. the CLI runs with and without optional inputs", json.members.length === 30 && json.read_only === true && json.search_console.available && json.ttc_engagement.available && text.includes("Event indexing pilot"));
  assert("11. canonical event data, artists and catalog are byte-identical after running", hash() === before && JSON.stringify(events) === eventsBefore);
  assert("12. the pilot record and the runtime list are unchanged after running", JSON.stringify(record) === recordBefore && JSON.stringify(readJson("data/event-indexing-pilot.json")) === recordBefore && JSON.stringify([...policy.EVENT_INDEXING_PILOT_KEYS]) === JSON.stringify(recordKeys));
  assert("12. the report writes no file next to its inputs", fs.readdirSync(tmp).sort().join(",") === tmpBefore);
  fs.rmSync(tmp, { recursive: true, force: true });

  const source = fs.readFileSync(path.join(ROOT, "scripts/report-event-indexing-pilot.mjs"), "utf8");
  const writers = ["writeFile", "appendFile", "mkdir", "rmSync", "unlink", "rename", "copyFile", "createWriteStream", "child_process", "method:", "wrangler d1", "DEMAND_DB"].filter((token) => source.includes(token));
  assert(`13. the report has no write path: no file, process, D1 or non-GET request APIs${writers.length ? ` (found ${writers.join(", ")})` : ""}`, writers.length === 0);
  assert("13. the report imports no router, middleware, sitemap or llms.txt module", !/from "\.\.\/functions\/(?:_middleware|\[\[path\]\]|sitemap|sitemaps|llms)/.test(source));
  assert("13. the rollout flag is still exactly \"pilot\" and the policy file still holds 30 keys", vars.EVENT_PAGES_INDEXING === "pilot" && policy.EVENT_INDEXING_PILOT_KEYS.length === 30);
}

let failed = 0;
for (const check of checks) {
  if (!check.pass) failed += 1;
  console.log(`${check.pass ? "PASS" : "FAIL"}  ${check.label}`);
}
console.log(`\n${checks.length - failed}/${checks.length} checks passed.`);
process.exitCode = failed === 0 ? 0 : 1;
