// Stage 3 of the maintenance loop: the decision layer of the bounded repair
// worker.
//
// Stage 1 sensors emit structured findings; Stage 2
// (`scripts/materialize-work-queue.mjs`) classifies them into discrete
// `work-queue` issues. This file is what decides, offline and deterministically,
// whether one of those issues may be repaired automatically and what the repair
// is allowed to touch. Nothing here writes anything, runs anything, or calls a
// model: it is pure so the whole safety boundary can be proved by the self-test
// in `scripts/run-work-queue-repair.mjs` rather than by watching a run.
//
// Two properties matter more than anything else in this file.
//
//   1. **The repair comes from trusted repository code, never from the issue.**
//      An issue's machine-readable block names an `artefact_id`; the commands
//      and the paths are then looked up in `GENERATED_ARTEFACTS`, the same fixed
//      allowlist the sensor itself runs. The issue's own copies of those strings
//      are only ever *compared* to the trusted ones — a disagreement rejects the
//      item rather than being followed. No command, path or repair operation can
//      enter this worker through issue text.
//
//   2. **Everything fails closed.** An unknown finding type, a missing label, a
//      contradictory field, an unparseable block, a risk this worker does not
//      accept, or an artefact that is not on the allowlist all end the same way:
//      no work, with the reason recorded.
//
// v1 supports exactly one finding type, `generated_artifact_stale`, and opens a
// pull request a human merges. It never merges, never enables auto-merge, and
// never touches a `risk:red` item.

import { GENERATED_ARTEFACTS } from "../check-generated-freshness.mjs";
import { QUEUE_LABEL, fingerprintFromBody } from "./work-queue.mjs";

/**
 * The supported finding types and the one repair operation each is permitted.
 *
 * This mapping is the allowlist the task contract calls for: it lives in
 * repository code, it is keyed by the finding type Stage 2 assigned, and the
 * operation is a named constant rather than a command. Adding a type here is a
 * deliberate, reviewed change — a label, a body, or a comment cannot do it.
 */
export const SUPPORTED_FINDINGS = Object.freeze({
  generated_artifact_stale: Object.freeze({
    source: "generated-freshness",
    // The only operation this worker knows how to perform. It resolves to an
    // entry in GENERATED_ARTEFACTS and to nothing else.
    operation: "regenerate-allowlisted-artefact"
  })
});

/** Risk classifications this worker will act on. `red` is never one of them. */
export const ALLOWED_RISKS = Object.freeze(new Set(["green", "amber"]));

/** Every terminal outcome one attempted work item can reach. */
export const OUTCOMES = Object.freeze({
  FIXED: "FIXED",
  BLOCKED: "BLOCKED",
  NEEDS_HUMAN: "NEEDS HUMAN",
  NO_SAFE_WORK: "NO SAFE WORK"
});

/** Terminal outcomes that should fail the run so a human is told. */
export const FAILING_OUTCOMES = Object.freeze(new Set([OUTCOMES.BLOCKED, OUTCOMES.NEEDS_HUMAN]));

export const BRANCH_PREFIX = "automation/work-queue-repair";
export const PR_MARKER_PREFIX = "<!-- work-queue-repair:v1 fingerprint=";
export const COMMENT_MARKER_PREFIX = "<!-- work-queue-repair:v1 outcome=";

/**
 * Surfaces the regeneration must never reach, restated here as a runtime guard.
 *
 * `GENERATED_ARTEFACTS` is already asserted to exclude all of these, so this is
 * defence in depth rather than the primary control: it means a future widening
 * of that allowlist — or a generator that writes somewhere it never used to —
 * stops this worker at the diff rather than at review.
 */
export const PROTECTED_PATHS = [
  /^public\/data\/(events|artists|catalog)\b/,
  /^public\/data\/events\//,
  /^public\/data\/provider-configs\.json$/,
  /^data\/provider-identities\.json$/,
  /^functions\/api\//,
  /^functions\/_middleware\.js$/,
  /^functions\/\[\[path\]\]\.js$/,
  /^functions\/_route-metadata\.js$/,
  /^public\/_routes\.json$/,
  /^migrations\//,
  /^wrangler\.toml$/,
  /^\.github\//
];

/**
 * The only command shape this worker will execute.
 *
 * Every command it runs comes from `GENERATED_ARTEFACTS`, but asserting the
 * shape at the point of execution makes the guarantee independent of that
 * table: even a corrupted or mis-edited entry cannot smuggle a shell fragment
 * through, because anything that is not `npm run <script-name>` is refused.
 */
const ALLOWED_COMMAND = /^npm run [a-z0-9][a-z0-9:-]*$/;

export const isAllowedCommand = (command) => ALLOWED_COMMAND.test(String(command ?? ""));

/** Branch names are derived, never supplied. This is the shape they must have. */
const BRANCH_NAME = new RegExp(`^${BRANCH_PREFIX}-[a-z0-9][a-z0-9-]*-[0-9a-f]{16}$`);

export const isAllowedBranch = (branch) => BRANCH_NAME.test(String(branch ?? ""));

export function branchNameFor({ artefactId, fingerprint }) {
  const branch = `${BRANCH_PREFIX}-${artefactId}-${fingerprint}`;
  if (!isAllowedBranch(branch)) throw new Error(`refusing to derive an unsafe branch name: ${branch}`);
  return branch;
}

export const prMarkerFor = (fingerprint) => `${PR_MARKER_PREFIX}${fingerprint} -->`;
export const commentMarkerFor = (fingerprint, outcome) =>
  `${COMMENT_MARKER_PREFIX}${outcome.replace(/\s+/g, "-").toLowerCase()} fingerprint=${fingerprint} -->`;

const labelNames = (issue) =>
  (Array.isArray(issue?.labels) ? issue.labels : [])
    .map((label) => (typeof label === "string" ? label : label?.name))
    .filter((name) => typeof name === "string");

const singlePrefixed = (labels, prefix) => {
  const matches = labels.filter((label) => label.startsWith(prefix));
  return matches.length === 1 ? matches[0].slice(prefix.length) : null;
};

const sorted = (values) => [...values].sort();
const sameSet = (a, b) => JSON.stringify(sorted(a)) === JSON.stringify(sorted(b));

/**
 * Read the machine-readable JSON block Stage 2 writes into every queue issue.
 *
 * Exactly one ```json fence is required. The evidence section can carry a plain
 * fenced block of validator output, which this deliberately does not match, and
 * a second JSON block would mean the body has been edited into something this
 * worker cannot read unambiguously — so it refuses rather than picking one.
 */
export function parseMachineBlock(body) {
  const fences = [...String(body ?? "").matchAll(/```json\n([\s\S]*?)```/g)];
  if (fences.length === 0) return { ok: false, reason: "the issue carries no machine-readable block" };
  if (fences.length > 1) return { ok: false, reason: "the issue carries more than one machine-readable block" };
  let data;
  try {
    data = JSON.parse(fences[0][1]);
  } catch {
    return { ok: false, reason: "the machine-readable block is not valid JSON" };
  }
  if (!data || typeof data !== "object" || Array.isArray(data)) {
    return { ok: false, reason: "the machine-readable block is not a JSON object" };
  }
  return { ok: true, data };
}

const reject = (reason) => ({ eligible: false, outcome: OUTCOMES.NO_SAFE_WORK, reason });

/**
 * Decide whether one issue is a work item this worker may act on, and if so,
 * what the bounded repair is.
 *
 * Eligibility is decided entirely from structured input — labels and the
 * machine-readable block — and never from issue prose. `artefacts` is injectable
 * only so the self-test can prove the engine against rows this repository does
 * not currently carry; production always uses the real allowlist.
 */
export function assessIssue(issue, { artefacts = GENERATED_ARTEFACTS, supported = SUPPORTED_FINDINGS } = {}) {
  if (!issue || typeof issue !== "object") return reject("not an issue");
  if (issue.pull_request) return reject("the item is a pull request, not an issue");
  if (issue.state !== "open") return reject(`the issue is ${issue.state ?? "in an unknown state"}, not open`);

  const labels = labelNames(issue);
  if (!labels.includes(QUEUE_LABEL)) return reject(`the issue does not carry the \`${QUEUE_LABEL}\` label`);
  if (!labels.includes("agent:ready")) return reject("the issue does not carry the `agent:ready` label");
  if (labels.includes("human-required")) return reject("the issue carries `human-required`");
  if (labels.some((label) => label.startsWith("automation:"))) {
    return reject("the issue carries an `automation:*` dashboard label, which a queue item must never have");
  }

  const risk = singlePrefixed(labels, "risk:");
  if (!risk) return reject("the issue does not carry exactly one `risk:` label");
  if (!ALLOWED_RISKS.has(risk)) return reject(`risk:${risk} is not a risk this worker may act on`);

  const priority = singlePrefixed(labels, "priority:");
  if (!priority || !/^P[0-3]$/.test(priority)) return reject("the issue does not carry exactly one valid `priority:` label");

  const source = singlePrefixed(labels, "source:");
  if (!source) return reject("the issue does not carry exactly one `source:` label");

  const fingerprint = fingerprintFromBody(issue.body);
  if (!fingerprint) return reject("the issue body carries no work-queue fingerprint marker");

  const parsed = parseMachineBlock(issue.body);
  if (!parsed.ok) return reject(parsed.reason);
  const block = parsed.data;

  const spec = Object.prototype.hasOwnProperty.call(supported, block.type) ? supported[block.type] : null;
  if (!spec) return reject(`\`${block.type}\` is not a finding type this worker supports`);
  if (spec.source !== source) return reject(`\`${block.type}\` is reported by ${spec.source}, but the issue is labelled source:${source}`);

  // Labels and the block must agree. A disagreement means one of them was
  // edited after the queue wrote it, and this worker is not the thing that
  // decides which one to believe.
  if (block.fingerprint !== fingerprint) return reject("the fingerprint marker and the machine-readable block disagree");
  if (block.source !== source) return reject("the `source:` label and the machine-readable block disagree");
  if (block.risk !== risk) return reject("the `risk:` label and the machine-readable block disagree");
  if (block.priority !== priority) return reject("the `priority:` label and the machine-readable block disagree");
  if (block.execution !== "agent:ready") return reject("the machine-readable block does not declare `agent:ready` execution");

  const evidence = block.evidence;
  if (!evidence || typeof evidence !== "object" || Array.isArray(evidence)) return reject("the machine-readable block carries no evidence object");

  const artefactId = evidence.artefact_id;
  if (typeof artefactId !== "string" || !artefactId) return reject("the evidence names no artefact id");
  // The lookup that makes issue text powerless: the repair is whatever the
  // trusted table says for this id, and an id that is not on it is not work.
  const entry = artefacts.find((candidate) => candidate.id === artefactId) || null;
  if (!entry) return reject(`\`${artefactId}\` is not on the regeneration allowlist`);

  if (!Array.isArray(block.identity) || block.identity.length !== 1 || block.identity[0] !== artefactId) {
    return reject("the finding identity is not exactly the artefact id");
  }

  // The issue's own copies of the commands and files are evidence, not
  // instructions. They are compared to the trusted entry and a mismatch stops
  // the item, because it means the issue describes a different repair from the
  // one this worker would actually perform.
  if (evidence.check_command !== entry.check) return reject("the issue names a different check command from the allowlist entry");
  if (evidence.regenerate_command !== entry.regenerate) return reject("the issue names a different regeneration command from the allowlist entry");
  if (!Array.isArray(evidence.generated_files) || !sameSet(evidence.generated_files, entry.artifacts)) {
    return reject("the issue names different generated files from the allowlist entry");
  }

  if (!isAllowedCommand(entry.check) || !isAllowedCommand(entry.regenerate)) {
    return { eligible: false, outcome: OUTCOMES.BLOCKED, reason: `the allowlist entry for ${artefactId} names a command this worker will not execute` };
  }
  const validation = Array.isArray(entry.validation) ? entry.validation : [];
  if (!validation.length || !validation.every(isAllowedCommand)) {
    return { eligible: false, outcome: OUTCOMES.BLOCKED, reason: `the allowlist entry for ${artefactId} names validation this worker will not execute` };
  }
  if (!validation.includes("npm run test:mvp")) {
    return { eligible: false, outcome: OUTCOMES.BLOCKED, reason: `the allowlist entry for ${artefactId} does not require \`npm run test:mvp\`` };
  }

  return {
    eligible: true,
    outcome: null,
    reason: "supported, classified and fully specified",
    plan: {
      issueNumber: issue.number,
      fingerprint,
      type: block.type,
      operation: spec.operation,
      artefactId,
      risk,
      priority,
      check: entry.check,
      regenerate: entry.regenerate,
      expectedPaths: [...entry.artifacts],
      validation: [...validation],
      label: entry.label,
      source: entry.source,
      branch: branchNameFor({ artefactId, fingerprint })
    }
  };
}

/**
 * Choose at most ONE work item from the open queue.
 *
 * One run repairs one item, which is the whole Stage 3 contract. Selection is
 * deterministic — lowest issue number among the eligible — so a re-run picks the
 * same item rather than racing between two.
 */
export function selectWorkItem(issues, { artefacts = GENERATED_ARTEFACTS, supported = SUPPORTED_FINDINGS, requestedIssue = null } = {}) {
  const considered = requestedIssue ? (issues || []).filter((issue) => issue?.number === requestedIssue) : issues || [];
  const assessments = considered.map((issue) => ({ issue, ...assessIssue(issue, { artefacts, supported }) }));

  if (requestedIssue && assessments.length === 0) {
    return { selected: null, assessments, reason: `issue #${requestedIssue} is not in the open work queue` };
  }
  const eligible = assessments.filter((assessment) => assessment.eligible).sort((a, b) => a.issue.number - b.issue.number);
  if (!eligible.length) {
    return { selected: null, assessments, reason: "no open queue issue is an eligible, supported work item" };
  }
  return { selected: eligible[0], assessments, reason: null };
}

/**
 * Is there already an active Stage 3 repair for this finding?
 *
 * Two signals, either of which means stop: an open pull request from the
 * derived branch, and an open pull request whose body carries this finding's
 * repair marker (which survives the branch being renamed or re-pushed).
 */
export function existingRepair({ plan, openPullRequests = [] }) {
  for (const pr of openPullRequests) {
    const head = pr?.head?.ref;
    if (head && head === plan.branch) return { pr, reason: `pull request #${pr.number} is already open from ${plan.branch}` };
    if (String(pr?.body || "").includes(prMarkerFor(plan.fingerprint))) {
      return { pr, reason: `pull request #${pr.number} is already an open repair for this finding` };
    }
  }
  return null;
}

/** Is a changed path inside one of the artefacts the entry declares? */
export const withinDeclaredPaths = (changed, declared) =>
  declared.some((allowed) => changed === allowed || changed.startsWith(`${allowed}/`));

export const touchesProtectedPath = (changed) => PROTECTED_PATHS.some((pattern) => pattern.test(changed));

/**
 * The bounded-diff test. The worker knows exactly which paths the approved
 * regeneration is expected to change, because the allowlist entry declares
 * them; anything else ends the run rather than being reviewed away later.
 */
export function classifyDiff(changedPaths, { expectedPaths }) {
  const changed = [...(changedPaths || [])].filter(Boolean).sort();
  const unexpected = changed.filter((path) => !withinDeclaredPaths(path, expectedPaths));
  const protectedHits = changed.filter(touchesProtectedPath);
  return { changed, unexpected, protectedHits, ok: changed.length > 0 && unexpected.length === 0 && protectedHits.length === 0 };
}

/**
 * The terminal-outcome state machine, as one pure function over what the run
 * has observed so far. `pending` means "nothing has gone wrong yet and the next
 * observation is still missing", so the runner can call this after every step
 * and stop the moment it stops being pending.
 */
export function repairVerdict({
  checkExitBefore = null,
  regenerateExit = null,
  diff = null,
  checkExitAfter = null,
  validationFailures = null
} = {}) {
  if (checkExitBefore === null) return { outcome: "pending", reason: "the finding has not been re-checked yet" };
  if (checkExitBefore === 0) {
    return { outcome: OUTCOMES.NO_SAFE_WORK, reason: "the finding no longer reproduces: the check already passes on this tree" };
  }

  if (regenerateExit === null) return { outcome: "pending", reason: "the generator has not run yet" };
  if (regenerateExit !== 0) {
    return { outcome: OUTCOMES.BLOCKED, reason: "the approved regeneration command failed, so the source itself is broken" };
  }

  if (diff === null) return { outcome: "pending", reason: "the diff has not been inspected yet" };
  if (diff.changed.length === 0) {
    return { outcome: OUTCOMES.NEEDS_HUMAN, reason: "regeneration changed nothing, so the committed artefact is current and the check is red for another reason" };
  }
  if (diff.protectedHits.length) {
    return { outcome: OUTCOMES.NEEDS_HUMAN, reason: `regeneration touched a protected surface: ${diff.protectedHits.join(", ")}` };
  }
  if (diff.unexpected.length) {
    return { outcome: OUTCOMES.NEEDS_HUMAN, reason: `regeneration changed files outside the declared artefacts: ${diff.unexpected.join(", ")}` };
  }

  if (checkExitAfter === null) return { outcome: "pending", reason: "the finding has not been re-checked after regenerating" };
  if (checkExitAfter !== 0) {
    return { outcome: OUTCOMES.NEEDS_HUMAN, reason: "regeneration did not clear the failing check, so regenerating is not the repair" };
  }

  if (validationFailures === null) return { outcome: "pending", reason: "required validation has not run yet" };
  if (validationFailures.length) {
    return { outcome: OUTCOMES.NEEDS_HUMAN, reason: `required validation failed: ${validationFailures.join(", ")}` };
  }

  return { outcome: OUTCOMES.FIXED, reason: "regeneration cleared the failing check and every required validation passed" };
}

const bullets = (lines) => lines.filter(Boolean).map((line) => `- ${line}`).join("\n");

/**
 * The pull request a successful repair opens. Deliberately narrow prose: what
 * ran, what changed, what did not, and that a human merges it.
 */
export function buildPullRequest({ plan, diff, checkOutputBefore = "" }) {
  const title = `maintenance: regenerate stale ${plan.label} (${plan.artefactId})`;
  const body = [
    prMarkerFor(plan.fingerprint),
    `Closes nothing on its own — refs #${plan.issueNumber}, which stays open until the sensor confirms the finding has cleared.`,
    "",
    "## What this PR does",
    bullets([
      `Runs \`${plan.regenerate}\`, the one regeneration command the allowlist entry for \`${plan.artefactId}\` declares, and commits its output.`,
      `That output is: ${diff.changed.map((path) => `\`${path}\``).join(", ")}.`,
      `\`${plan.check}\` failed on \`main\` before the regeneration and passes after it, in the same run.`
    ]),
    "",
    "## Why",
    `The \`generated-freshness\` sensor proved on \`main\` that the committed ${plan.label} had drifted from ${plan.source}, and that regenerating is the repair. Work-queue issue #${plan.issueNumber} carries the sensor's evidence.`,
    checkOutputBefore
      ? ["", "<details><summary>The failing check, before this change</summary>", "", "```", checkOutputBefore, "```", "", "</details>"].join("\n")
      : "",
    "",
    "## Explicit non-changes",
    bullets([
      "No event, artist or catalog record; no provider identity, rights, allowlist or affiliate logic; no `/api/out`; no credentials; no Cloudflare configuration; no migration.",
      "No hand-edit of a generated file: the generator is the only writer here.",
      "No source file was changed to make the check pass."
    ]),
    "",
    "## Validation",
    bullets([
      `\`${plan.check}\` (failed before, passes after)`,
      ...plan.validation.map((command) => `\`${command}\``),
      "`git diff --check`",
      "The diff was asserted to contain only the paths the allowlist entry declares."
    ]),
    "",
    "## Review",
    "**This pull request is not auto-merged and must not be.** Stage 3 of the maintenance loop opens it and stops; a human reviews the diff and merges. Prelaunch Validation is dispatched against this branch by the same run, so `test-mvp` lands on this exact head — do not merge without it green.",
    "",
    `_Opened by \`scripts/run-work-queue-repair.mjs\` (maintenance loop, Stage 3). Deterministic: no model decided any part of this change._`
  ]
    .filter((section) => section !== "")
    .join("\n");

  return { title, body };
}

/**
 * The single comment a run leaves on the originating issue.
 *
 * The marker carries the outcome as well as the fingerprint, so a re-run that
 * reaches the same outcome adds nothing, and only a genuine change of state is
 * ever posted twice.
 */
export function buildOutcomeComment({ plan, outcome, reason, pullRequestUrl = null, runUrl = null }) {
  const marker = commentMarkerFor(plan.fingerprint, outcome);
  const body = [
    marker,
    `**Stage 3 worker: ${outcome}**`,
    "",
    reason,
    "",
    bullets([
      `Artefact: \`${plan.artefactId}\``,
      `Repair attempted: \`${plan.regenerate}\` (the allowlist entry's only regeneration command)`,
      pullRequestUrl ? `Pull request: ${pullRequestUrl} — **not merged**; a human reviews and merges it.` : null,
      runUrl ? `Run log: ${runUrl}` : null
    ]),
    "",
    "_This issue stays open until the sensor confirms the finding has cleared._"
  ].join("\n");
  return { marker, body };
}

/** Has this exact outcome already been reported on the issue? */
export const alreadyReported = (comments, marker) =>
  (comments || []).some((comment) => String(comment?.body || "").includes(marker));
