#!/usr/bin/env node
// Materialises discrete work items from structured sensor output.
//
// Stage 2 of the maintenance loop and its last step: sensor -> structured
// finding -> classified issue. It does not invoke any model, create a branch,
// edit code, open a pull request, or merge anything. Its only write is a GitHub
// issue carrying the `work-queue` label.
//
// Usage:
//   node scripts/materialize-work-queue.mjs --health .queue/health.json --dry-run
//   node scripts/materialize-work-queue.mjs --links .audit/links.json
//   node scripts/materialize-work-queue.mjs --generated .queue/generated.json
//   node scripts/materialize-work-queue.mjs --self-test
//
// `--dry-run` prints the plan and every rendered issue body and performs no
// network write at all. The self-test asserts that, so a refactor cannot quietly
// make the dry run write.

import { readFile } from "node:fs/promises";
import {
  DEFAULT_LIMITS,
  FINDING_TYPES,
  QUEUE_LABEL,
  RED_SURFACES,
  buildPayload,
  classify,
  extractGeneratedFreshnessFindings,
  extractHealthFindings,
  extractLinkFindings,
  fingerprintFor,
  fingerprintFromBody,
  markerFor,
  sourceFromBody,
  planQueue
} from "./lib/work-queue.mjs";

const argv = process.argv.slice(2);
const flag = (name) => {
  const index = argv.indexOf(name);
  return index >= 0 ? argv[index + 1] : null;
};
const SELF_TEST = argv.includes("--self-test");
const DRY_RUN = argv.includes("--dry-run");

async function readJsonIfPresent(path) {
  if (!path) return null;
  try {
    return JSON.parse(await readFile(path, "utf8"));
  } catch (error) {
    if (error?.code === "ENOENT") return null;
    throw error;
  }
}

export async function collectFindings({ healthPath, linksPath, generatedPath }) {
  const findings = [];
  const sources = [];
  const health = await readJsonIfPresent(healthPath);
  if (health) {
    const extracted = extractHealthFindings(health);
    findings.push(...extracted);
    sources.push({ source: "automation-health", path: healthPath, findings: extracted.length });
  }
  const links = await readJsonIfPresent(linksPath);
  if (links) {
    const extracted = extractLinkFindings(links);
    findings.push(...extracted);
    sources.push({ source: "daily-audit", path: linksPath, findings: extracted.length });
  }
  const generated = await readJsonIfPresent(generatedPath);
  if (generated) {
    const extracted = extractGeneratedFreshnessFindings(generated);
    findings.push(...extracted);
    sources.push({ source: "generated-freshness", path: generatedPath, findings: extracted.length });
  }
  return { findings, sources };
}

function renderPlan(plan, sources) {
  const lines = [];
  for (const s of sources) lines.push(`source ${s.source.padEnd(18)} ${String(s.findings).padStart(3)} finding(s) from ${s.path}`);
  lines.push("");
  const rows = [
    ["create", plan.create],
    ["update", plan.update],
    ["reopen", plan.reopen],
    ["close", plan.close],
    ["hold", plan.hold],
    ["overflow", plan.overflow],
    ["unclassified", plan.unclassified]
  ];
  for (const [name, items] of rows) lines.push(`${name.padEnd(14)} ${items.length}`);
  for (const entry of [...plan.create, ...plan.update, ...plan.reopen]) {
    const v = entry.payload.verdict;
    lines.push("");
    lines.push(`  [${v.priority} ${v.risk} ${v.execution}] ${entry.payload.title}`);
    lines.push(`    fingerprint ${entry.payload.fingerprint}`);
  }
  for (const entry of plan.unclassified) lines.push(`  UNCLASSIFIED (not materialised): ${entry.reason}`);
  for (const entry of plan.overflow) lines.push(`  OVERFLOW (withheld this run, still in its rolling issue): ${entry.payload.title}`);
  return lines.join("\n");
}

// ─── Self-test ──────────────────────────────────────────────────────────────

if (SELF_TEST) {
  const { default: assert } = await import("node:assert/strict");

  const lane = (over = {}) => ({
    file: "seatgeek-cta-sync.yml",
    name: "SeatGeek CTA sync",
    cadence: "daily 05:00",
    status: "failing",
    detail: "Last 2 scheduled runs in a row concluded failure.",
    consecutiveFailures: 2,
    latest: { html_url: "https://example.invalid/run/1" },
    ...over
  });
  const linkFailure = (over = {}) => ({
    url: "https://www.stubhub.ie/x/event/1",
    provider: "stubhub-international",
    status: 404,
    error: null,
    refs: ["e1:provider_links.stubhub-international.url"],
    eventIds: ["e1"],
    artistSlugs: ["don-omar"],
    eventDates: ["2027-02-27T02:00:00Z"],
    reviewScope: "upcoming",
    actionable: true,
    ...over
  });

  // --- extraction: only real findings, never dashboard state -----------------
  assert.equal(extractHealthFindings({ lanes: [lane({ status: "ok" })] }).length, 0);
  // `flaky` is the health sensor deliberately withholding a single sub-threshold
  // failure. Promoting it here would undo that judgement.
  assert.equal(extractHealthFindings({ lanes: [lane({ status: "flaky" })] }).length, 0);
  for (const status of ["failing", "stalled", "stale", "never"]) {
    assert.equal(extractHealthFindings({ lanes: [lane({ status })] }).length, 1, status);
  }
  assert.equal(extractHealthFindings({}).length, 0);

  // A timeout is not a dead link. This is the exact shape of every "current
  // failure" in the real 2026-09-09 audit, and it must produce no work item.
  assert.equal(extractLinkFindings({ failures: [linkFailure({ status: null, error: "timeout after 12000ms" })] }).length, 0);
  // Nor is a WAF response, nor a past-event URL, however confirmed.
  for (const status of [401, 403, 429, 500, 503]) {
    assert.equal(extractLinkFindings({ failures: [linkFailure({ status })] }).length, 0, String(status));
  }
  assert.equal(extractLinkFindings({ failures: [linkFailure({ reviewScope: "expired", actionable: false })] }).length, 0);
  assert.equal(extractLinkFindings({ failures: [linkFailure({ reviewScope: "unknown" })] }).length, 0);
  assert.equal(extractLinkFindings({ expired_failures: [linkFailure()] }).length, 0);
  for (const status of [404, 410]) {
    assert.equal(extractLinkFindings({ failures: [linkFailure({ status })] }).length, 1, String(status));
  }

  // --- generated-freshness: the only agent-ready class ----------------------
  //
  // The fixture is the real 2026-09-11 incident. PR #935 changed the /about and
  // /about/ollie-taylor copy without re-running the generator, so
  // `content:provenance:check` failed on `main` from 10:37Z to 13:29Z and every
  // sanctioned writer stopped. The check output below is copied from that run's
  // job log; the repair that actually landed was commit 56b4107, a two-line
  // regeneration of exactly this file.
  const septemberEleventh = {
    artefacts: [
      {
        id: "content-provenance",
        label: "Content provenance",
        source: "the render blocks and trust-page copy the fingerprints cover",
        artifacts: ["data/content-provenance.json"],
        validation: ["npm run test:content", "npm run test:mvp"],
        state: "stale",
        reason: "The check failed, regeneration changed the declared artefacts, and the same check then passed. The repair is proved.",
        evidence: {
          check_command: "npm run content:provenance:check",
          check_exit: 1,
          check_output:
            "CONTENT PROVENANCE CHECK FAILED\n\n  - 2 route(s) have edited copy with a stale published date:\n    /about  (published 2026-09-11)\n    /about/ollie-taylor  (published 2026-09-11)\n\n  Fix: npm run content:provenance   (then commit the result)",
          regenerate_command: "npm run content:provenance",
          regenerate_exit: 0,
          changed_files: ["data/content-provenance.json"],
          recheck_exit: 0
        }
      }
    ]
  };

  const staleFindings = extractGeneratedFreshnessFindings(septemberEleventh);
  assert.equal(staleFindings.length, 1);
  const staleVerdict = classify(staleFindings[0]);
  assert.equal(staleVerdict.execution, "agent:ready", "the historical incident must produce agent-ready work");
  assert.equal(staleVerdict.risk, "amber");
  assert.equal(staleVerdict.priority, "P1");

  // The issue must carry everything a future session needs so it never has to
  // re-audit the repository: the failing validator, the generated file, the
  // authoritative source, the exact regeneration command, and the validator's
  // own output.
  const stalePayload = buildPayload(staleFindings[0]);
  for (const needle of [
    "npm run content:provenance:check",
    "data/content-provenance.json",
    "npm run content:provenance",
    "the render blocks and trust-page copy the fingerprints cover",
    "CONTENT PROVENANCE CHECK FAILED",
    "/about/ollie-taylor",
    "npm run test:mvp",
    "A human still approves the merge."
  ]) {
    assert.ok(stalePayload.body.includes(needle), `historical replay payload missing: ${needle}`);
  }
  assert.ok(stalePayload.labels.includes("agent:ready"));
  assert.ok(stalePayload.labels.includes("risk:amber"));
  assert.ok(stalePayload.labels.includes("source:generated-freshness"));
  // The acceptance criteria must tell a worker when to stop rather than widen.
  assert.match(stalePayload.body, /report BLOCKED/);
  assert.match(stalePayload.body, /report NEEDS HUMAN/);
  assert.match(stalePayload.body, /Do not hand-edit the generated file/);

  // Identity is the artefact group, so a second run with different drifted files
  // and different validator output updates the same issue.
  const sameAgain = extractGeneratedFreshnessFindings({
    artefacts: [
      {
        ...septemberEleventh.artefacts[0],
        evidence: { ...septemberEleventh.artefacts[0].evidence, check_output: "different prose entirely", changed_files: ["data/content-provenance.json", "x"] }
      }
    ]
  })[0];
  assert.equal(fingerprintFor(staleFindings[0]), fingerprintFor(sameAgain));

  // A different artefact group is a different work item.
  const otherArtefact = extractGeneratedFreshnessFindings({
    artefacts: [{ ...septemberEleventh.artefacts[0], id: "guides-content" }]
  })[0];
  assert.notEqual(fingerprintFor(staleFindings[0]), fingerprintFor(otherArtefact));

  // --- what can never enter the agent-ready class ---------------------------
  //
  // Only `stale` is promoted, and `stale` is only ever set by the sensor after
  // it has proved regeneration is the repair. Every other verdict is dropped.
  for (const state of ["fresh", "generator_failed", "check_failed_not_stale", "unknown", undefined]) {
    assert.equal(
      extractGeneratedFreshnessFindings({ artefacts: [{ ...septemberEleventh.artefacts[0], state }] }).length,
      0,
      `state ${state} must not be materialised`
    );
  }
  assert.equal(extractGeneratedFreshnessFindings({}).length, 0);
  assert.equal(extractGeneratedFreshnessFindings({ artefacts: [] }).length, 0);

  // A generic red test cannot reach this class: the sensor only ever reports
  // artefacts on its own fixed allowlist, and that list is asserted separately
  // in check-generated-freshness.mjs --self-test. Here, prove the queue side:
  // a finding naming a protected or provider file still classifies purely by its
  // type, and no type outside the allowlist exists to carry it.
  const { GENERATED_ARTEFACTS } = await import("./check-generated-freshness.mjs");
  const allowlisted = new Set(GENERATED_ARTEFACTS.map((entry) => entry.id));
  assert.deepEqual([...allowlisted].sort(), ["blog-content", "content-provenance", "guides-content", "og-cards"]);
  for (const entry of GENERATED_ARTEFACTS) {
    for (const artefact of entry.artifacts) {
      // Nothing on the allowlist may be event, artist, catalog or affiliate data,
      // or the redirect. Those are the surfaces an agent must never regenerate
      // its way into.
      assert.ok(
        !/^public\/data\/(events|artists|catalog)|functions\/api\/out\.js|functions\/_middleware\.js|migrations\//.test(artefact),
        `${entry.id}: ${artefact} is a protected commercial or provider surface and must not be in the regeneration allowlist`
      );
    }
  }

  // The class declares no red surface, which is what lets it be agent-ready.
  // If anyone ever adds one, classify must strip agent-ready — already asserted
  // by the lying-row fixture further down, and re-asserted here for this type.
  assert.deepEqual(FINDING_TYPES.generated_artifact_stale.touches, []);
  assert.equal(FINDING_TYPES.generated_artifact_stale.execution, "agent:ready");
  const forcedRed = classify(staleFindings[0], {
    ...FINDING_TYPES,
    generated_artifact_stale: { ...FINDING_TYPES.generated_artifact_stale, touches: ["provider-rights"] }
  });
  assert.equal(forcedRed.risk, "red");
  assert.equal(forcedRed.execution, "human-required", "adding a red surface must strip agent-ready from this class too");

  // --- fingerprint stability -------------------------------------------------
  const a = extractHealthFindings({ lanes: [lane()] })[0];
  const b = extractHealthFindings({ lanes: [lane({ detail: "totally different prose", latest: { html_url: "https://example.invalid/run/99" }, consecutiveFailures: 9 })] })[0];
  assert.equal(fingerprintFor(a), fingerprintFor(b), "changed evidence must not change identity");

  // A lane moving failing -> stalled is changed evidence about the same lane.
  const stalled = extractHealthFindings({ lanes: [lane({ status: "stalled" })] })[0];
  assert.equal(fingerprintFor(a), fingerprintFor(stalled));

  // A different lane is a different finding.
  const other = extractHealthFindings({ lanes: [lane({ file: "daily-audit.yml", name: "Daily data audit" })] })[0];
  assert.notEqual(fingerprintFor(a), fingerprintFor(other));

  // Re-ordered referencing events must not mint a new identity.
  const linkA = extractLinkFindings({ failures: [linkFailure({ eventIds: ["e1", "e2"], artistSlugs: ["x", "y"] })] })[0];
  const linkB = extractLinkFindings({ failures: [linkFailure({ eventIds: ["e2", "e1"], artistSlugs: ["y", "x"] })] })[0];
  assert.equal(fingerprintFor(linkA), fingerprintFor(linkB), "re-ordered source data must not change identity");
  assert.equal(fingerprintFromBody(buildPayload(linkA).body), fingerprintFor(linkA));
  assert.equal(fingerprintFromBody("no marker here"), null);

  // --- classification --------------------------------------------------------
  assert.deepEqual(classify(a).labels, [QUEUE_LABEL, "source:automation-health", "priority:P1", "risk:amber", "human-required"]);
  assert.equal(classify(linkA).risk, "red");
  assert.equal(classify(linkA).execution, "human-required");

  // An unknown type fails closed rather than defaulting to anything.
  const unknown = classify({ type: "something_new", source: "x" });
  assert.equal(unknown.ok, false);
  assert.match(unknown.reason, /unknown finding type/);
  assert.equal(buildPayload({ type: "something_new", source: "x", identity: ["a"] }), null);

  // Queue labels must never collide with the rolling-issue labels. Three rolling
  // writers select their dashboard as "first open issue carrying the label",
  // with no title filter, so a queue item wearing `automation:daily-audit` would
  // be found by the next daily audit and overwritten with the dashboard body.
  for (const type of Object.keys(FINDING_TYPES)) {
    const labels = classify({ type, source: FINDING_TYPES[type].source }).labels;
    assert.ok(labels.every((label) => !label.startsWith("automation:")), `${type} must not reuse an automation:* label`);
  }

  // --- the red invariant, proved against the engine rather than the table ----
  //
  // A fixture registry exercises rows this repository does not currently
  // produce. Inventing a fake production finding type to test the agent-ready
  // path would leave dead code behind; injecting one here does not.
  const fixtureRegistry = {
    green_agent: { source: "t", priority: "P2", risk: "green", execution: "agent:ready", touches: [], summary: "s", matters: "m", acceptance: ["a"], validation: ["v"] },
    amber_agent: { source: "t", priority: "P2", risk: "amber", execution: "agent:ready", touches: [], summary: "s", matters: "m", acceptance: ["a"], validation: ["v"] },
    declared_red: { source: "t", priority: "P1", risk: "red", execution: "human-required", touches: [], summary: "s", matters: "m", acceptance: ["a"], validation: ["v"] },
    // The row lies: it claims green and agent-ready while touching a red
    // surface. The engine must override both.
    lying_row: { source: "t", priority: "P3", risk: "green", execution: "agent:ready", touches: ["outbound-redirect"], summary: "s", matters: "m", acceptance: ["a"], validation: ["v"] }
  };
  const fixture = (type) => ({ source: "t", type, identity: ["i"], sensor: "s", dashboard: "d", affected: "a", title: "t", statement: "st", evidence: ["e"] });

  assert.equal(classify(fixture("green_agent"), fixtureRegistry).execution, "agent:ready");
  assert.equal(classify(fixture("amber_agent"), fixtureRegistry).execution, "agent:ready");
  assert.equal(classify(fixture("amber_agent"), fixtureRegistry).risk, "amber");
  const lying = classify(fixture("lying_row"), fixtureRegistry);
  assert.equal(lying.risk, "red", "a red surface must force risk:red");
  assert.equal(lying.execution, "human-required", "a red surface must never stay agent-ready");

  // The invariant across every row of both registries: red implies never agent.
  for (const registry of [FINDING_TYPES, fixtureRegistry]) {
    for (const type of Object.keys(registry)) {
      const verdict = classify(fixture(type), registry);
      if (verdict.risk === "red") assert.notEqual(verdict.execution, "agent:ready", `${type}: risk:red must never be agent:ready`);
    }
  }
  assert.ok(RED_SURFACES.has("outbound-redirect") && RED_SURFACES.has("credentials") && RED_SURFACES.has("provider-rights"));

  // --- payload carries the evidence a future session must not re-derive ------
  const payload = buildPayload(a);
  for (const section of ["## Where this came from", "## Observed evidence", "## Why it matters", "## Acceptance criteria", "## Required validation", "## Classification", "Machine-readable"]) {
    assert.ok(payload.body.includes(section), `payload missing ${section}`);
  }
  assert.ok(payload.body.startsWith(markerFor(payload.fingerprint)));
  assert.ok(payload.body.includes("scripts/check-automation-health.mjs"));
  assert.ok(payload.body.includes("https://example.invalid/run/1"));
  assert.ok(payload.body.includes("A coding agent must not implement this autonomously."));
  assert.ok(buildPayload(fixture("amber_agent"), fixtureRegistry).body.includes("A human still approves the merge."));
  assert.match(payload.body, /```json\n[\s\S]*"fingerprint": "[0-9a-f]{16}"/);

  // --- lifecycle -------------------------------------------------------------
  const issueFor = (finding, over = {}) => ({ number: 1, state: "open", body: buildPayload(finding).body, ...over });

  // First observation -> one issue.
  let plan = planQueue({ findings: [a], existingIssues: [] });
  assert.equal(plan.create.length, 1);
  assert.equal(plan.update.length, 0);

  // Repeated observation -> the same issue updated, never a duplicate.
  plan = planQueue({ findings: [a], existingIssues: [issueFor(a)] });
  assert.equal(plan.create.length, 0);
  assert.equal(plan.update.length, 1);
  assert.equal(plan.update[0].issue.number, 1);

  // Changed evidence for the same finding -> still the same issue.
  plan = planQueue({ findings: [b], existingIssues: [issueFor(a)] });
  assert.equal(plan.create.length, 0);
  assert.equal(plan.update.length, 1);

  // Two genuinely different findings -> two issues.
  plan = planQueue({ findings: [a, other], existingIssues: [] });
  assert.equal(plan.create.length, 2);

  // The same identity twice in one run is one unit of work.
  plan = planQueue({ findings: [a, b], existingIssues: [] });
  assert.equal(plan.create.length, 1);

  // --- recovery is scoped to the sources actually read -----------------------
  //
  // The regression this pins: on 2026-09-12 the freshness workflow ran the
  // materialiser with only --generated, saw no findings, and closed #948, #949
  // and #950 — three live automation-health items for lanes that were still
  // failing. The queue then reported nothing wrong while ingestion was stopped.
  const healthIssue = { number: 948, state: "open", body: buildPayload(a).body };
  assert.equal(sourceFromBody(healthIssue.body), "automation-health");

  // A run that read only generated-freshness must not touch it.
  let scopedPlan = planQueue({ findings: [], existingIssues: [healthIssue], activeSources: ["generated-freshness"] });
  assert.equal(scopedPlan.close.length, 0, "a run must never close another source's issue");
  assert.equal(scopedPlan.hold.length, 0, "and must not hold it either — it is simply not this run's business");

  // The run that does read that source still closes it when it has cleared.
  scopedPlan = planQueue({ findings: [], existingIssues: [healthIssue], activeSources: ["automation-health"] });
  assert.equal(scopedPlan.close.length, 1);

  // Several sources in one run scope to all of them.
  const freshIssue = { number: 960, state: "open", body: buildPayload(staleFindings[0]).body };
  assert.equal(sourceFromBody(freshIssue.body), "generated-freshness");
  scopedPlan = planQueue({
    findings: [],
    existingIssues: [healthIssue, freshIssue],
    activeSources: ["automation-health", "generated-freshness"]
  });
  assert.equal(scopedPlan.close.length, 2);

  // An issue whose source cannot be read is left alone rather than closed on a
  // guess, even when its source would otherwise be in scope.
  const sourceless = { number: 961, state: "open", body: `${markerFor("aaaaaaaaaaaaaaaa")}\nno machine-readable block` };
  assert.equal(sourceFromBody(sourceless.body), null);
  assert.equal(planQueue({ findings: [], existingIssues: [sourceless], activeSources: ["automation-health"] }).close.length, 0);

  // Scoping must not affect create, update or reopen — only closure.
  assert.equal(planQueue({ findings: [a], existingIssues: [], activeSources: ["generated-freshness"] }).create.length, 1);
  assert.equal(planQueue({ findings: [a], existingIssues: [healthIssue], activeSources: ["generated-freshness"] }).update.length, 1);

  // Recovery: the finding cleared, nothing in flight -> close.
  plan = planQueue({ findings: [], existingIssues: [issueFor(a)] });
  assert.equal(plan.close.length, 1);
  assert.equal(plan.hold.length, 0);

  // Recovery with remediation in flight -> hold it open. Closing here would drop
  // the context the pull request author is working from.
  plan = planQueue({ findings: [], existingIssues: [issueFor(a, { number: 42 })], openPullRequestBodies: ["Fixes #42 by re-running the lane"] });
  assert.equal(plan.close.length, 0);
  assert.equal(plan.hold.length, 1);
  // A near-miss number must not count as a reference.
  plan = planQueue({ findings: [], existingIssues: [issueFor(a, { number: 4 })], openPullRequestBodies: ["see #42"] });
  assert.equal(plan.close.length, 1);

  // A finding that returns after its issue was closed reopens that issue rather
  // than opening a second one.
  plan = planQueue({ findings: [a], existingIssues: [issueFor(a, { state: "closed" })] });
  assert.equal(plan.create.length, 0);
  assert.equal(plan.reopen.length, 1);

  // An issue without a marker is not ours and is left entirely alone.
  plan = planQueue({ findings: [], existingIssues: [{ number: 7, state: "open", body: "a human wrote this" }] });
  assert.equal(plan.close.length, 0);
  assert.equal(plan.hold.length, 0);

  // --- storm protection ------------------------------------------------------
  const many = Array.from({ length: 40 }, (_, i) =>
    extractHealthFindings({ lanes: [lane({ file: `w${i}.yml`, name: `W${i}` })] })[0]
  );
  plan = planQueue({ findings: many, existingIssues: [] });
  assert.equal(plan.create.length, DEFAULT_LIMITS.maxNewPerRun);
  assert.equal(plan.overflow.length, 40 - DEFAULT_LIMITS.maxNewPerRun);
  // Withheld findings are still carried out of the run, never dropped.
  assert.ok(plan.overflow.every((entry) => entry.payload.title && entry.finding));

  // An already-full queue creates nothing at all, even under the per-run cap.
  const full = Array.from({ length: DEFAULT_LIMITS.maxOpenQueue }, (_, i) => issueFor(many[i], { number: 100 + i }));
  plan = planQueue({ findings: [a], existingIssues: full });
  assert.equal(plan.create.length, 0);
  assert.equal(plan.overflow.length, 1);

  // Existing items still update when the queue is full: the cap gates new work,
  // not maintenance of work already tracked.
  plan = planQueue({ findings: [many[0]], existingIssues: full });
  assert.equal(plan.update.length, 1);
  assert.equal(plan.overflow.length, 0);

  // --- no write in dry run ---------------------------------------------------
  const source = await readFile(new URL(import.meta.url), "utf8");
  const writeCall = /github\((\s*)"(POST|PATCH)"/.test(source) || /method: "(POST|PATCH)"/.test(source);
  assert.ok(writeCall, "expected the writer to exist so this assertion is meaningful");
  assert.ok(/if \(DRY_RUN\)/.test(source), "dry-run must short-circuit before any write");

  console.log(`OK: work-queue self-test (${Object.keys(FINDING_TYPES).length} finding types, ${RED_SURFACES.size} red surfaces)`);
  process.exit(0);
}

// ─── Entry point ────────────────────────────────────────────────────────────

const { pathToFileURL } = await import("node:url");
const isEntryPoint = Boolean(process.argv[1]) && pathToFileURL(process.argv[1]).href === import.meta.url;
if (isEntryPoint) await main();

async function main() {
  const { findings, sources } = await collectFindings({
    healthPath: flag("--health"),
    linksPath: flag("--links"),
    generatedPath: flag("--generated")
  });
  if (!sources.length) {
    console.error("Nothing to read. Pass --health, --links and/or --generated <path>.");
    process.exit(2);
  }

  const repo = process.env.GITHUB_REPOSITORY;
  const token = process.env.GITHUB_TOKEN;

  if (DRY_RUN) {
    // Everything above this point is pure, so the plan can be shown in full
    // without a token and without touching GitHub.
    const plan = planQueue({
      findings,
      existingIssues: [],
      openPullRequestBodies: [],
      activeSources: sources.map((s) => s.source)
    });
    console.log(renderPlan(plan, sources));
    for (const entry of plan.create) {
      console.log(`\n${"=".repeat(72)}\nTITLE: ${entry.payload.title}\nLABELS: ${entry.payload.labels.join(", ")}\n${"-".repeat(72)}\n${entry.payload.body}`);
    }
    process.exit(0);
  }

  if (!repo || !token) {
    console.error("GITHUB_REPOSITORY and GITHUB_TOKEN are required (or use --dry-run).");
    process.exit(2);
  }

  const headers = {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
    "X-GitHub-Api-Version": "2022-11-28"
  };
  const github = async (method, path, body) => {
    const response = await fetch(`https://api.github.com/repos/${repo}${path}`, {
      method,
      headers: body ? { ...headers, "Content-Type": "application/json" } : headers,
      body: body ? JSON.stringify(body) : undefined
    });
    if (!response.ok) throw new Error(`GitHub API ${method} ${path} ${response.status}: ${await response.text()}`);
    return response.status === 204 ? null : response.json();
  };

  // Queue items only. The rolling dashboards carry their own `automation:*`
  // labels and are never read or written here.
  const existingIssues = (await github("GET", `/issues?state=all&labels=${encodeURIComponent(QUEUE_LABEL)}&per_page=100`))
    .filter((issue) => !issue.pull_request)
    .map((issue) => ({ number: issue.number, state: issue.state, body: issue.body }));

  // One call, used only to avoid closing a task somebody is mid-way through.
  const openPullRequestBodies = (await github("GET", "/pulls?state=open&per_page=100")).map((pr) => pr.body);

  // Only the sources this run read may have their issues closed. Passing this is
  // what stops one workflow's materialise step closing another's work items.
  const plan = planQueue({
    findings,
    existingIssues,
    openPullRequestBodies,
    activeSources: sources.map((s) => s.source)
  });
  console.log(renderPlan(plan, sources));

  for (const entry of plan.create) {
    const issue = await github("POST", "/issues", {
      title: entry.payload.title,
      body: entry.payload.body,
      labels: entry.payload.labels
    });
    console.log(`created #${issue.number} ${entry.payload.title}`);
  }
  for (const entry of [...plan.update, ...plan.reopen]) {
    await github("PATCH", `/issues/${entry.issue.number}`, {
      title: entry.payload.title,
      body: entry.payload.body,
      labels: entry.payload.labels,
      state: "open"
    });
  }
  for (const entry of plan.close) {
    await github("PATCH", `/issues/${entry.issue.number}`, { state: "closed", state_reason: "completed" });
    console.log(`closed #${entry.issue.number} (source finding cleared)`);
  }
  for (const entry of plan.hold) {
    console.log(`held open #${entry.issue.number} (finding cleared, but an open pull request still references it)`);
  }

  if (plan.overflow.length) {
    console.log(`\n${plan.overflow.length} finding(s) withheld by the storm cap. They remain in their sensor's rolling issue; nothing is lost.`);
  }
  if (plan.unclassified.length) {
    console.log(`\n${plan.unclassified.length} finding(s) had no known type and were not materialised (failing closed).`);
  }
}
