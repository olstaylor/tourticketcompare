import assert from "node:assert/strict";
import { parseSyncRows, reviewReason, candidatesOf, buildQueue, renderQueue } from "./lib/match-review.mjs";

const head = "| showId | artist | action | id | url | notes |\n| --- | --- | --- | --- | --- | --- |\n";
const md = (...rows) => head + rows.join("\n") + "\n";
const row = (id, action, note, url = "-") => `| ${id} | Act | ${action} | - | ${url} | ${note} |`;
const ev = (id, extra = {}) => ({ id, artist_name: "Act", venue: "Arena", city: "London", datetime_iso: "2027-03-05T19:30:00Z", status: "on-sale", provider_links: {}, ...extra });
const now = new Date("2026-11-24T00:00:00Z");
const run = (markdown, events, decisions = []) => buildQueue({ reports: [{ provider: "stubhub-international", label: "StubHub International", markdown }], events, decisions, now });

// exact matches are never queued
assert.equal(reviewReason({ action: "refresh", note: "-" }), null);
assert.equal(reviewReason({ action: "add", note: "-" }), null);
// wrong artist/venue/date and plain no-listing: not a candidate, not queued
assert.equal(reviewReason({ action: "none", note: "no qualifying listing (complete catalog checked; closest same-date listing: venue mismatch)" }), null);
assert.equal(reviewReason({ action: "none", note: "no qualifying Vivid Seats listing (may not be listed)" }), null);
// missing provider data / API failure / incomplete catalog: never queued
assert.equal(reviewReason({ action: "none", note: "not checked: catalog incomplete" }), null);
assert.equal(reviewReason({ action: "none", note: "transient API error (untouched)" }), null);
assert.equal(reviewReason({ action: "none", note: "" }), null);
// ambiguity is queued with its reason
assert.match(reviewReason({ action: "conflict", note: "ambiguous: missing or conflicting performance start evidence" }), /start time/);
assert.match(reviewReason({ action: "conflict", note: "ambiguous: 2 qualifying listings match" }), /several/);
assert.deepEqual(candidatesOf("ambiguous: x; candidates: 11111111 @ no start time (\"A\"), 22222222 @ no start time (\"A\")").length, 2);

const report = md(
  row("a", "conflict", "ambiguous: missing or conflicting performance start evidence; candidates: 1111111 @ no start time (\"Act\"), 2222222 @ no start time (\"Act\")"),
  row("b", "refresh", "-", "https://x/1"),
  row("c", "none", "no qualifying listing (complete catalog checked)"),
  row("d", "conflict", "ambiguous: 2 qualifying listings match this event; candidates: https://s/1 (\"Act\"), https://s/2 (\"Act\")"),
  row("e", "none", "not checked: catalog incomplete"),
  row("f", "conflict", "ambiguous: several"),
  row("g", "conflict", "ambiguous: several"),
  row("h", "conflict", "ambiguous: several")
);
const events = [ev("a"), ev("b"), ev("c"), ev("d"), ev("e"),
  ev("f", { provider_links: { "stubhub-international": { verified: true, url: "https://stubhub.ie/e/1" } } }), // existing valid match preserved, not re-queued
  ev("g", { datetime_iso: "2026-01-01T19:30:00Z" }), // already past
  ev("h", { status: "cancelled" })];
let q = run(report, events);
assert.deepEqual(q.open.map((i) => i.show_id), ["a", "d"], "only the ambiguous, unverified, upcoming cases are open");
assert.equal(q.skipped.already_verified, 1, "a verified link is never reopened for review");
assert.equal(q.skipped.not_upcoming_or_unknown, 2);
assert.equal(q.open[0].candidates.length, 2);

// decisions are remembered and repeated runs are identical
const decisions = [{ show_id: "a", provider: "stubhub-international", decision: "rejected" }, { show_id: "gone", provider: "stubhub-international", decision: "approved_match" }];
q = run(report, events, decisions);
assert.deepEqual(q.open.map((i) => i.show_id), ["d"]);
assert.deepEqual(q.resolved.map((i) => i.show_id), ["a"]);
assert.equal(q.orphan_decisions.length, 1, "decisions that match no case are reported, not applied");
assert.equal(renderQueue(run(report, events, decisions)), renderQueue(q), "repeated runs are identical");

// a show not in events.json is unknown and withheld from the queue
assert.equal(run(report, []).open.length, 0);
// no reports at all (API failure upstream): empty queue, no throw
assert.equal(run("", events).open.length, 0);
assert.match(renderQueue(q), /Open \(withheld, awaiting a human\): 1/);
console.log("match-review tests passed");
