import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { parse } from "yaml";
import { buildReport, rankCandidates, nextHistory, parseHistory, renderIssue, weekOf, HISTORY_LIMIT } from "./lib/blog-opportunities.mjs";
import { publishIssue, githubClient, readSource, LABEL, TITLE } from "./propose-blog-ideas.mjs";

const NOW = Date.parse("2026-10-12T11:20:00Z");
const clone = (value) => structuredClone(value);
function event(id, slug = "alpha-act", extra = {}) {
  const url = `https://www.ticketmaster.com/${slug}/event/${id}`;
  const seatgeek = `https://seatgeek.com/${slug}-tickets/concert/${id}`;
  return { id: String(id), artist_slug: slug, city: `City ${id}`, country: "United States", venue: "The Arena",
    datetime_iso: "2026-11-20T20:00:00Z", timezone: "America/New_York", status: "on-sale", verification_status: "machine_high_confidence",
    last_verified_at: "2026-10-11", ticketmaster_event_id: String(id), ticketmaster_url: url, source_type: "ticketmaster", source_url: url,
    seatgeek_url: seatgeek, public_onsale_at: "2026-10-16T09:00:00Z",
    provider_links: { ticketmaster: { verified: true, url, last_verified_at: "2026-10-11" }, seatgeek: { verified: true, url: seatgeek, last_verified_at: "2026-10-11" } }, ...extra };
}
function document(title, extra = {}) {
  return { title, file: "content/blog/alpha-act-public-sale.md", path: "/blog/alpha-act-public-sale", relatedArtists: ["alpha-act"], status: "published", modified: "2026-10-01", sources: [event(123).source_url, event(456).source_url], body: "A verified buying article.", ...extra };
}
function source(events = [event(123), event(456)], documents = []) {
  const slugs = [...new Set(events.map((row) => row.artist_slug))];
  const artists = slugs.map((slug) => ({ slug, name: slug === "alpha-act" ? "Alpha Act" : slug, indexing_status: "indexable_with_substantial_content" }));
  return { events, artists, catalog: { artists: clone(artists), providers: [{ slug: "ticketmaster", public_enabled: true, allowed_destination_hosts: ["ticketmaster.com"] }, { slug: "seatgeek", public_enabled: true }] }, documents };
}
const report = (data, history = [], now = NOW) => buildReport(data, { now, history });
const noMutation = async (data, gh, pattern) => {
  const calls = [];
  await assert.rejects(() => publishIssue(data, { now: NOW, gh: async (...args) => { calls.push(args); return gh(...args); } }), pattern);
  assert.ok(calls.every(([method]) => method === "GET"), "failure must not mutate GitHub");
};

test("selects commercial sale topics, never pads a shortlist, and caps six distinct artists", () => {
  const result = report(source());
  assert.equal(result.recommendations.length, 1);
  assert.equal(result.recommendations[0].kind, "sale");
  assert.equal(result.recommendations[0].evidenceCount, 2);
  assert.ok(result.recommendations[0].commercialBenefit.includes("affiliate"));
  assert.deepEqual(result.recommendations[0].links, ["/artists/alpha-act"]);
  assert.equal(report(source([event(123)])).recommendations.length, 0);
  const events = Array.from({ length: 9 }, (_, i) => [event(100 + i * 2, `act-${i}`), event(101 + i * 2, `act-${i}`)]).flat();
  const six = report(source(events)).recommendations;
  assert.equal(six.length, 6);
  assert.equal(new Set(six.map((candidate) => candidate.artist)).size, 6);
});

test("selects upcoming named presales and repeated venue nights with checked comparisons", () => {
  const presales = [{ name: "Artist Presale", start: "2026-10-13T09:00:00Z", end: "2026-10-16T09:00:00Z" }];
  const data = source([event(123, "alpha-act", { public_onsale_at: null, presales }), event(456, "alpha-act", { public_onsale_at: null, presales })]);
  const candidate = report(data).recommendations[0];
  assert.equal(candidate.kind, "presale");
  assert.ok(candidate.links.includes("/artists/alpha-act/presale"));
  assert.ok(candidate.missingEvidence.some((line) => line.includes("codes")));
  const nights = [123, 456, 789].map((id, i) => event(id, "alpha-act", { public_onsale_at: null, city: "New York", datetime_iso: `2026-11-${20 + i}T20:00:00Z` }));
  assert.equal(report(source(nights)).recommendations[0].kind, "nights");
  nights[2].datetime_iso = nights[1].datetime_iso;
  assert.equal(report(source(nights)).recommendations.length, 0, "same-date sessions are not three nights");
});

test("rejects expired, distant, unsafe and promotional presale windows", () => {
  for (const window of [
    { name: "Artist Presale", start: "2026-10-01T09:00:00Z", end: "2026-10-02T09:00:00Z" },
    { name: "Artist Presale", start: "2026-12-01T09:00:00Z", end: "2026-12-02T09:00:00Z" },
    { name: "Use code SECRET", start: "2026-10-13T09:00:00Z", end: "2026-10-16T09:00:00Z" },
    { name: "$20 Ticket Discount", start: "2026-10-13T09:00:00Z", end: "2026-10-16T09:00:00Z" },
    { name: "Amex Reserved Tickets", start: "2026-10-13T09:00:00Z", end: "2026-10-16T09:00:00Z" },
    { name: "Offre Bord d'Allée", start: "2026-10-13T09:00:00Z", end: "2026-10-16T09:00:00Z" },
    { name: "Artist Presale", start: "2026-10-13T09:00:00Z", end: "2026-11-16T09:00:00Z" },
    { name: "Artist Presale", start: "2026-10-16T09:00:00Z", end: "2026-10-13T09:00:00Z" }
  ]) {
    const events = [123, 456].map((id) => event(id, "alpha-act", { public_onsale_at: null, presales: [window] }));
    assert.equal(report(source(events)).recommendations.length, 0, window.name);
  }
});

test("sale dates require real instants near today and before the event; rechecks are not announcements", () => {
  for (const public_onsale_at of [null, "9999-12-31T06:00:00Z", "2026-02-30T09:00:00Z", "2026-10-16T09:00:00", "2026-10-01", "2026-08-01T09:00:00Z", "2026-12-01T09:00:00Z"]) {
    assert.equal(report(source([event(123, "alpha-act", { public_onsale_at }), event(456, "alpha-act", { public_onsale_at })])).recommendations.length, 0);
  }
  const recent = report(source([event(123, "alpha-act", { public_onsale_at: "2026-10-10T09:00:00Z" }), event(456, "alpha-act", { public_onsale_at: "2026-10-10T09:00:00Z" })]));
  assert.match(recent.recommendations[0].title, /after the public sale/);
});

test("uses venue-local instants; supports date-only concerts and holds expired events", () => {
  const rows = [123, 456].map((id) => event(id, "alpha-act", { datetime_iso: "2026-10-12T08:00:00", timezone: "America/New_York", public_onsale_at: "2026-10-10T09:00:00Z" }));
  assert.equal(report(source(rows)).recommendations.length, 1, "08:00 New York is still ahead at 11:20Z");
  const past = source(rows.map((row) => ({ ...row, datetime_iso: "2026-09-20T20:00:00Z" })));
  assert.equal(report(past).recommendations.length, 0);
  const dateOnly = report(source(rows.map((row) => ({ ...row, datetime_iso: "2026-11-20" }))));
  assert.equal(dateOnly.recommendations.length, 1);
  assert.equal(dateOnly.recommendations[0].evidence[0].date, "2026-11-20");
  assert.throws(() => report(source(rows.map((row) => ({ ...row, timezone: "" })))), /cannot be trusted/);
});

test("stale, future-dated, unverified or mismatched evidence cannot support a topic", () => {
  for (const extra of [
    { last_verified_at: null }, { last_verified_at: "2026-07-01" }, { last_verified_at: "2026-10-20" },
    { verification_status: "needs_recheck" }, { source_type: "unofficial" },
    { ticketmaster_url: "https://ticketmaster.evil/event/123" }, { ticketmaster_event_id: "123-extra" }
  ]) {
    assert.equal(report(source([event(123, "alpha-act", extra), event(456)])).recommendations.length, 0);
  }
  assert.throws(() => report(source([event(123, "alpha-act", { last_verified_at: null })])), /cannot be trusted/);
  const fresh = source([event(123), event(456)]);
  const stale = source([event(123, "alpha-act", { last_verified_at: "2026-09-20" }), event(456, "alpha-act", { last_verified_at: "2026-09-20" })]);
  assert.ok(report(fresh).recommendations[0].score >= report(stale).recommendations[0].score);
});

test("cancelled, postponed, unknown lifecycle and non-indexable artists are excluded", () => {
  for (const ticketmaster_status_code of ["cancelled", "postponed", "unknown"]) {
    assert.equal(report(source([event(123, "alpha-act", { ticketmaster_status_code })])).recommendations.length, 0);
  }
  const data = source(); data.artists[0].indexing_status = "review_required";
  assert.equal(report(data).recommendations.length, 0);
  data.artists[0].indexing_status = "indexable_with_substantial_content"; data.artists[0].demoted = true;
  assert.equal(report(data).recommendations.length, 0);
});

test("coverage requires fresh, matching, verified provider records and public flags", () => {
  const data = source([123, 456, 789].map((id, i) => event(id, "alpha-act", { public_onsale_at: null, city: "New York", datetime_iso: `2026-11-${20 + i}T20:00:00Z` })));
  assert.equal(report(data).recommendations.length, 1);
  for (const mutate of [
    (row) => { row.provider_links.seatgeek.verified = false; },
    (row) => { row.provider_links.seatgeek.url = "https://seatgeek.com/different/concert/99"; },
    (row) => { row.provider_links.seatgeek.last_verified_at = "2026-08-01"; }
  ]) {
    const copy = clone(data); copy.events.forEach(mutate);
    assert.equal(report(copy).recommendations.length, 0);
  }
  data.catalog.providers[1].public_enabled = false;
  assert.equal(report(data).recommendations.length, 0);
});

test("published coverage and drafts suppress copies, while a concrete sale transition proposes an update", () => {
  assert.equal(report(source(undefined, [document("Alpha Act tickets: public on-sale")])).recommendations.length, 0);
  assert.equal(report(source(undefined, [document("Alpha Act tickets: public on-sale", { status: "draft" })])).recommendations.length, 0);
  const recent = [123, 456].map((id) => event(id, "alpha-act", { public_onsale_at: "2026-10-10T09:00:00Z" }));
  const update = report(source(recent, [document("Alpha Act tickets: public on-sale")]));
  assert.equal(update.recommendations[0].action, "update");
  assert.ok(update.recommendations[0].links.includes("/blog/alpha-act-public-sale"));
  assert.equal(report(source(recent, [document("Alpha Act tickets: public on-sale", { modified: "2026-10-11" })])).recommendations.length, 0);
  assert.equal(report(source(recent, [document("Alpha Act tickets: public on-sale", { modified: "2026-10-10" })])).recommendations.length, 0, "date-only editorial updates do not establish a same-day sale transition");
  assert.equal(report(source(recent, [document("Alpha Act tickets: public on-sale", { sources: [] })])).recommendations.length, 0, "a sale for another event does not prove this article is outdated");
  const general = document("How to prepare for a ticket onsale", { file: "content/guides/how-to-prepare-for-a-ticket-onsale.md", path: "/guides/how-to-prepare-for-a-ticket-onsale" });
  const withContext = report(source(undefined, [general]));
  assert.equal(withContext.recommendations.length, 1);
  assert.ok(withContext.recommendations[0].overlap.length);
  assert.ok(withContext.recommendations[0].links.includes(general.path));
  assert.ok(withContext.recommendations[0].score < report(source()).recommendations[0].score);
});

test("ranking is deterministic, prioritises stronger evidence and breaks ties by deadline then key", () => {
  assert.deepEqual(rankCandidates([{ key: "c", score: 80, deadline: 2 }, { key: "b", score: 90, deadline: 2 }, { key: "a", score: 90, deadline: 1 }]).map((c) => c.key), ["a", "b", "c"]);
  const data = source();
  assert.deepEqual(report(data).recommendations, report({ ...data, events: [...data.events].reverse() }).recommendations);
});

test("history suppresses repeats across weeks, permits same-week reruns and expires bounded keys", () => {
  const first = report(source());
  const history = nextHistory([], first);
  assert.equal(report(source(), history).recommendations.length, 1);
  assert.equal(nextHistory(history, first).length, 1);
  assert.equal(report(source(), history, NOW + 7 * 86400000).recommendations.length, 0);
  const otherAngle = [{ key: "alpha-act:presale", week: "2026-10-05", title: "Earlier presale" }];
  assert.equal(report(source(), otherAngle).recommendations.length, 0);
  const old = [{ key: "alpha-act:sale", week: "2026-06-29", title: "Old sale" }];
  assert.equal(report(source(), old).recommendations.length, 1);
  assert.equal(nextHistory([{ key: "alpha-act:sale", week: "2025-01-06", title: "Old" }], first).length, 1);
  assert.equal(weekOf(Date.parse("2026-10-11T23:59:59Z")), "2026-10-05");
});

test("reports all required fields, escape issue text, bound evidence and round-trip history", () => {
  const result = report(source());
  result.recommendations[0].title = "Alpha <script> [sale] <!-- injection -->";
  const history = nextHistory([], result);
  const body = renderIssue(result, history);
  for (const field of ["Search intent", "Why publish", "Commercial purpose", "TTC links", "Content overlap", "Missing evidence", "Priority", "Repository evidence", "Recent suggestion history"]) assert.ok(body.includes(field), field);
  assert.ok(body.includes("public/data/events.json"));
  assert.ok(body.includes("https://tourticketcompare.com/artists/alpha-act"));
  assert.ok(renderIssue(result, history, { repository: "olstaylor/tourticketcompare", sha: "a".repeat(40) }).includes(`/tree/${"a".repeat(40)}`));
  assert.ok(!body.includes("<script>") && !body.includes("https://seatgeek.com"));
  assert.deepEqual(parseHistory(body, NOW), history);
  assert.ok(renderIssue(report(source([event(123)])), []).includes("No sufficiently useful new topics"));
  for (const bad of ["", "<!-- ttc-blog-ideas:v1\nnot json\n-->", body + body]) assert.throws(() => parseHistory(bad, NOW), /history/);
  const state = (history) => `<!-- ttc-blog-ideas:v1\n${JSON.stringify({ version: 1, history })}\n-->`;
  for (const bad of [[{ key: "alpha-act:unknown", week: "2026-10-12", title: "X" }], [{ key: "alpha-act:sale", week: "2027-10-11", title: "X" }], [...history, ...history], Array(HISTORY_LIMIT + 1).fill(history[0])]) assert.throws(() => parseHistory(state(bad), NOW), /history/);
});

test("source corruption fails clearly; a failed read never produces an empty report", () => {
  for (const mutate of [
    (data) => { data.events = []; }, (data) => { data.events.push(clone(data.events[0])); },
    (data) => { data.events[0].datetime_iso = "2026-02-30T09:00:00Z"; },
    (data) => { data.events[0].artist_slug = "unknown"; }, (data) => { data.catalog.artists = []; },
    (data) => { data.events[0].provider_links = []; }, (data) => { data.documents = null; }
  ]) {
    const data = source(); mutate(data); assert.throws(() => report(data), /Blog discovery/);
  }
  const root = mkdtempSync(path.join(tmpdir(), "ttc-blog-test-"));
  try {
    assert.throws(() => readSource(root), /ENOENT/);
    for (const collection of ["blog", "guides"]) mkdirSync(path.join(root, "content", collection), { recursive: true });
    writeFileSync(path.join(root, "content/blog/broken.md"), "invalid markdown");
    assert.throws(() => readSource(root), /front matter/);
  } finally { rmSync(root, { recursive: true, force: true }); }
});

test("first publication bootstraps one label and one issue, then updates the same issue", async () => {
  const calls = [];
  const gh = async (method, endpoint, body) => {
    calls.push({ method, endpoint, body });
    if (endpoint.startsWith("/issues?")) return [];
    if (method === "GET" && endpoint.startsWith("/labels/")) { const error = new Error("missing label"); error.status = 404; throw error; }
    return { number: 42 };
  };
  const created = await publishIssue(source(), { now: NOW, gh });
  assert.equal(created.number, 42);
  assert.equal(calls.filter((c) => c.method === "POST" && c.endpoint === "/issues").length, 1);
  const body = calls.find((c) => c.endpoint === "/issues").body.body;
  const edits = [];
  await publishIssue(source(), { now: NOW, gh: async (method, endpoint, data) => {
    if (method === "GET") return [{ number: 42, title: TITLE, body, state: "closed" }];
    edits.push({ method, endpoint, data }); return {};
  } });
  assert.equal(edits.length, 1); assert.equal(edits[0].method, "PATCH"); assert.equal(edits[0].endpoint, "/issues/42"); assert.equal(edits[0].data.state, "open");
});

test("pagination ignores pull requests and stops on ambiguous, foreign or corrupted issues", async () => {
  const body = renderIssue(report(source()), nextHistory([], report(source())));
  const issue = { number: 42, title: TITLE, body, state: "open" };
  let pages = 0;
  const mutations = [];
  await publishIssue(source(), { now: NOW, gh: async (method, endpoint, data) => {
    if (method === "GET") { pages += 1; return pages === 1 ? Array.from({ length: 100 }, (_, i) => ({ number: i, pull_request: {} })) : [issue]; }
    mutations.push({ method, endpoint, data }); return {};
  } });
  assert.equal(pages, 2); assert.equal(mutations[0].endpoint, "/issues/42");
  await noMutation(source(), () => [issue, { ...issue, number: 43 }], /multiple labelled/);
  await noMutation(source(), () => [{ ...issue, title: "Unrelated" }], /not the managed/);
  await noMutation(source(), () => [{ ...issue, body: "ttc-blog-ideas:v1 corrupted" }], /history/);
  await noMutation(source(), () => ({ message: "not an array" }), /invalid GitHub/);
});

test("untrusted data and GitHub failures leave the maintained report untouched", async () => {
  let calls = 0;
  await assert.rejects(() => publishIssue(source([event(123, "alpha-act", { last_verified_at: null })]), { now: NOW, gh: async () => { calls += 1; } }), /cannot be trusted/);
  assert.equal(calls, 0);
  await noMutation(source(), () => { throw new Error("GitHub unavailable"); }, /GitHub unavailable/);
  let requests = 0;
  const client = githubClient("olstaylor/tourticketcompare", "test-secret", async (_url, options) => {
    requests += 1; assert.ok(options.signal); return { ok: false, status: 403, json: () => { throw new Error("must not expose response"); } };
  });
  await assert.rejects(() => client("GET", "/issues"), (error) => error.message.includes("403") && !error.message.includes("test-secret"));
  assert.equal(requests, 1, "uncertain writes must not be automatically retried");
  const body = renderIssue(report(source()), nextHistory([], report(source())));
  const mutations = [];
  await assert.rejects(() => publishIssue(source(), { now: NOW, gh: async (method, endpoint) => {
    if (method === "GET") return [{ number: 42, title: TITLE, body, state: "open" }];
    mutations.push(endpoint); throw new Error("patch failed");
  } }), /patch failed/);
  assert.deepEqual(mutations, ["/issues/42"], "a failed update must not fall back to a duplicate issue");
  assert.throws(() => githubClient("bad/repo/extra", "token"), /required/);
  assert.throws(() => githubClient("olstaylor/tourticketcompare", ""), /required/);
});

test("scheduled workflow grants only repository read and issue write with no production secrets", () => {
  const workflow = parse(readFileSync(new URL("../.github/workflows/blog-ideas.yml", import.meta.url), "utf8"));
  assert.deepEqual(workflow.permissions, { contents: "read", issues: "write" });
  assert.deepEqual(Object.keys(workflow.on).sort(), ["schedule", "workflow_dispatch"]);
  assert.equal(workflow.on.schedule[0].cron, "20 11 * * 1");
  assert.equal(workflow.concurrency["cancel-in-progress"], false);
  const steps = workflow.jobs.propose.steps;
  assert.equal(steps.find((step) => step.uses?.startsWith("actions/checkout")).with["persist-credentials"], false);
  assert.equal(steps.at(-1).if, "always()");
  assert.ok(steps.findIndex((step) => step.run?.includes("validate-events.py")) < steps.findIndex((step) => step.run?.includes("--issue")));
  const env = steps.flatMap((step) => Object.values(step.env || {}));
  assert.deepEqual(env, ["${{ secrets.GITHUB_TOKEN }}", "${{ github.repository }}"]);
  const runs = steps.map((step) => step.run || "").join("\n");
  assert.ok(!/--apply|--auto-merge|wrangler|deploy|git (push|commit)|blog:build|guides:build/.test(runs));
  assert.equal(LABEL, "automation:blog-ideas");
});
