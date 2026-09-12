// Stage 2 work queue: turns structured sensor findings into discrete, bounded
// GitHub issues.
//
// The rolling issues stay dashboards. This layer promotes the small subset of
// findings that are worth tracking as individual units of work, and refuses the
// rest. Everything here is pure — no network, no filesystem, no clock beyond
// what a caller passes in — so the classification can be proved offline before
// a single issue is written.
//
// Pipeline, deliberately in four separable stages:
//   extract*(raw)   structured sensor output -> findings
//   classify()      finding -> priority / risk / execution / labels
//   buildPayload()  finding -> issue title, body, labels
//   planQueue()     findings + existing issues -> create/update/close/hold
//
// Only `planQueue`'s output is ever written, and the writer lives in
// scripts/materialize-work-queue.mjs. Nothing in this file can write anything.

import { createHash } from "node:crypto";

export const QUEUE_LABEL = "work-queue";
export const QUEUE_MARKER_PREFIX = "<!-- work-queue:v1 fingerprint=";

// Storm protection. The queue must never become an issue factory: a sensor that
// regresses and reports every URL as dead would otherwise open thousands of
// issues in one run. Both limits are deliberately small — this repository has
// had at most a handful of genuinely actionable findings on any day in its
// history, so a run wanting more than five new items is far more likely to be a
// broken sensor than a real emergency.
//
// Nothing is hidden by refusing: every finding already lives in its source
// sensor's rolling issue, which this layer never touches, and the overflow is
// reported in the run summary. The cap withholds a *task*, never evidence.
export const DEFAULT_LIMITS = { maxNewPerRun: 5, maxOpenQueue: 25 };

// Surfaces a coding agent must never change autonomously. Drawn from CLAUDE.md
// -> Protected Areas and SAFE_PUBLISHING_RULES.md -> What AI Agents May Not
// Change Without an Explicit Scoped Issue. A finding type declaring any of these
// is forced to risk:red and human-required, whatever else its row says.
export const RED_SURFACES = new Set([
  "outbound-redirect", // functions/api/out.js, VERIFIED_TICKET_LINKS
  "affiliate-tracking", // attribution semantics, Impact credentials
  "credentials", // secrets of any kind
  "provider-rights", // approval, allowlists, catalog rights
  "cloudflare-config", // production routes, bindings, dashboard settings
  "database-migration", // schema and migrations
  "indexability-strategy", // canonical/noindex architecture
  "mass-deletion", // bulk removal of records
  "entity-identity", // ambiguous artist/provider/event identity
  "brand-safety", // editorial judgement about an act or copy
  "human-verification", // needs a real browser or a human to open a page
  "inferred-data" // anything that would require inventing or inferring data
]);

/**
 * The finding types this queue understands.
 *
 * Two sources are integrated, both chosen because they already emit structured
 * JSON — no prose is parsed anywhere in this layer. Adding a source means adding
 * an extractor and a row here; it does not mean touching the engine.
 *
 * `touches` is the deterministic safety input. It is a property of the finding
 * *type*, fixed here by a human, never inferred per finding and never decided by
 * a model. `execution` is likewise fixed per type, and `classify` enforces that
 * a red type can never be agent-ready regardless of what this table says.
 */
export const FINDING_TYPES = {
  // A scheduled lane that failed, stopped being invoked, or stopped reaching a
  // verdict. Human-required because the remediation is a diagnosis: the run log
  // could name a provider outage, a red `main`, a credential, or a genuine code
  // defect, and there is no acceptance criterion that can be stated in advance
  // or satisfied inside a pull request. A lane is healthy again only when it
  // runs, which no PR can demonstrate.
  workflow_unhealthy: {
    source: "automation-health",
    priority: "P1",
    risk: "amber",
    execution: "human-required",
    touches: [],
    summary: "A scheduled automation lane is not completing normally.",
    matters:
      "Every sanctioned writer gates its commit on `test:mvp` passing in-job, so a lane that is failing, stalled or unscheduled is publishing nothing. The cost is dropped ingestion windows — dates, resale provenance and verification timestamps that never land.",
    acceptance: [
      "The lane's most recent scheduled run reaches a `success` verdict.",
      "The cause is recorded in `docs/OPERATIONS.md` -> Known incidents if it was a defect rather than a one-off."
    ],
    validation: [
      "Read the failing run's job logs before changing anything.",
      "If two or more lanes are failing together, run `npm run test:mvp` against the tip of `main` first — that is usually one shared cause, not several."
    ]
  },

  // A committed generated artefact that has drifted from its source.
  //
  // The first and so far only agent-ready class, and it is agent-ready for one
  // reason: the repair is not a judgement. The artefact is generated from
  // authoritative repository data by a fixed command, the sensor has already
  // proved in the same run that running that command makes the failing check
  // pass, and the acceptance criterion is the check itself. Nothing is invented
  // or inferred; the generator reads sources that are already committed.
  //
  // Amber rather than green, deliberately. These artefacts reach public output —
  // guide routes, the sitemap, `lastmod` dates the IndexNow ping carries, Open
  // Graph cards — so a human should see the diff before it merges, which is
  // exactly what agent-ready plus amber means. The agent may open one pull
  // request; it does not merge it.
  //
  // The narrowness is enforced upstream, in `check-generated-freshness.mjs`: a
  // finding exists only for an artefact on that script's fixed allowlist, and
  // only when regeneration is proved to be the repair. A generic red test can
  // never arrive here.
  generated_artifact_stale: {
    source: "generated-freshness",
    priority: "P1",
    risk: "amber",
    execution: "agent:ready",
    touches: [],
    summary: "A committed generated file has drifted from the source it is generated from.",
    matters:
      "Every sanctioned writer gates its commit on `test:mvp` passing in-job against the tip of `main`, so a stale generated artefact is a fleet-wide stop: every ingestion, CTA-sync and timestamp lane fails at the same step and publishes nothing. This is what happened on 2026-09-11, when stale content provenance cost three Impact marketplace runs and a Vivid Seats CTA sync before a human noticed.",
    acceptance: [
      "Run the regeneration command named in the evidence below. Do not hand-edit the generated file — this repository forbids it, and the generator is the only correct writer.",
      "The named check passes.",
      "The diff contains only the declared artefacts and nothing else.",
      "If regenerating does not make the check pass, stop and report BLOCKED: the finding was wrong and the cause is elsewhere.",
      "If the repair appears to need a change to any source file rather than a regeneration, stop and report NEEDS HUMAN rather than widening the change."
    ],
    validation: [
      "The artefact's own check, named in the evidence.",
      "`npm run test:mvp` before committing — the full suite is what the auto-publish lanes gate on.",
      "`git diff --check`"
    ]
  },

  // A stored provider URL that a two-probe check (HEAD then a ranged GET)
  // confirmed as 404 or 410, on an event that has not happened yet.
  //
  // Red and human-required, and that is the repository's own position rather
  // than caution on my part: the fix edits `public/data/events.json`, a
  // protected file, and withdraws a resale lane that earns money. The daily
  // audit's own operator guidance already says to "suppress only after
  // provider/event verification", which is a human step by construction.
  provider_url_dead: {
    source: "daily-audit",
    priority: "P1",
    risk: "red",
    execution: "human-required",
    touches: ["provider-rights", "entity-identity"],
    summary: "A stored provider URL for an upcoming event is confirmed dead.",
    matters:
      "The event page offers a destination that 404s. That is a broken promise to the visitor and a dead affiliate lane, and unlike a WAF block or a timeout it is confirmed rather than inconclusive.",
    acceptance: [
      "The destination is re-checked by a human in a real browser.",
      "If genuinely dead, the provider link for this exact event is withdrawn or re-synced through the provider's own sync lane — never hand-edited into a guess.",
      "If the URL resolves in a browser, the finding is recorded as a false positive and the checker's evidence rules are revisited."
    ],
    validation: [
      "`npm run test:providers`",
      "`npm run events:validate:prod`",
      "`npm run test:mvp`"
    ]
  }
};

/** Stable identity for a finding. Order-insensitive and evidence-insensitive. */
export function fingerprintFor(finding) {
  const identity = [finding.source, finding.type, ...[...finding.identity].sort()].join("\u0000");
  return createHash("sha256").update(identity).digest("hex").slice(0, 16);
}

export const markerFor = (fingerprint) => `${QUEUE_MARKER_PREFIX}${fingerprint} -->`;

export function fingerprintFromBody(body) {
  const match = String(body || "").match(/<!-- work-queue:v1 fingerprint=([0-9a-f]{16}) -->/);
  return match ? match[1] : null;
}

/**
 * Which sensor an existing issue came from, read back out of the
 * machine-readable block its payload wrote.
 *
 * Needed because recovery has to be scoped to the sources a run actually read.
 * An issue whose source cannot be determined returns null and is then left
 * alone entirely — never closed on a guess.
 */
export function sourceFromBody(body) {
  const match = String(body || "").match(/"source":\s*"([a-z0-9-]+)"/);
  return match ? match[1] : null;
}

/**
 * Deterministic classification. No model, no heuristics, no per-finding
 * judgement: the answer is a lookup in FINDING_TYPES plus two hard invariants.
 *
 * An unknown type is not classified at all. It fails closed — the caller is
 * expected to report it and materialise nothing, so a new sensor field can never
 * arrive as agent-ready by default.
 *
 * `registry` is injectable so the self-test can prove the engine against rows
 * this repository does not currently produce, rather than inventing a fake
 * production type to exercise the agent-ready path.
 */
export function classify(finding, registry = FINDING_TYPES) {
  const spec = registry[finding.type];
  if (!spec) return { ok: false, reason: `unknown finding type: ${finding.type}` };

  const touchesRed = (spec.touches || []).some((surface) => RED_SURFACES.has(surface));
  const risk = touchesRed ? "red" : spec.risk;
  // The invariant, enforced here rather than trusted from the table: a red
  // surface is never handed to an agent, even if a row says otherwise.
  const execution = risk === "red" ? "human-required" : spec.execution;

  return {
    ok: true,
    priority: spec.priority,
    risk,
    execution,
    labels: [QUEUE_LABEL, `source:${spec.source}`, `priority:${spec.priority}`, `risk:${risk}`, execution]
  };
}

const bullets = (lines) => lines.map((line) => `- ${line}`).join("\n");

/**
 * The issue as a future agent or operator will read it. Enough evidence to act
 * without re-auditing the repository, which is the whole point of the queue:
 * the sensor already did the investigation, so the issue carries its result.
 */
export function buildPayload(finding, registry = FINDING_TYPES) {
  const spec = registry[finding.type];
  const verdict = classify(finding, registry);
  if (!verdict.ok) return null;

  const fingerprint = fingerprintFor(finding);
  const body = [
    markerFor(fingerprint),
    `**${spec.summary}**`,
    "",
    finding.statement,
    "",
    "## Where this came from",
    bullets([
      `Sensor: \`${finding.sensor}\``,
      `Source dashboard: ${finding.dashboard}`,
      finding.reference ? `Reference: ${finding.reference}` : null,
      `Affected: ${finding.affected}`
    ].filter(Boolean)),
    "",
    "## Observed evidence",
    bullets(finding.evidence),
    "",
    "## Why it matters",
    spec.matters,
    "",
    "## Acceptance criteria",
    bullets(spec.acceptance),
    "",
    "## Required validation",
    bullets(spec.validation),
    "",
    "## Classification",
    bullets([
      `Priority **${verdict.priority}**`,
      `Risk **${verdict.risk}**`,
      `Execution **${verdict.execution}**`,
      verdict.execution === "human-required"
        ? "A coding agent must not implement this autonomously."
        : "A coding agent may open one pull request for this. A human still approves the merge."
    ]),
    "",
    "<details><summary>Machine-readable</summary>",
    "",
    "```json",
    JSON.stringify(
      {
        fingerprint,
        source: finding.source,
        type: finding.type,
        identity: [...finding.identity].sort(),
        priority: verdict.priority,
        risk: verdict.risk,
        execution: verdict.execution,
        evidence: finding.data ?? {}
      },
      null,
      2
    ),
    "```",
    "",
    "</details>",
    "",
    "_Opened and maintained by `scripts/materialize-work-queue.mjs`. The rolling dashboard remains the complete operator view; this issue is one bounded unit of work drawn from it._"
  ].join("\n");

  return { title: finding.title, body, labels: verdict.labels, fingerprint, verdict };
}

// ─── Extractors ─────────────────────────────────────────────────────────────
//
// Each reads a sensor's own structured output. No prose is parsed: if a sensor
// only renders for humans, it is not integrated until it emits structure.

/**
 * `check-automation-health.mjs --json` writes every watched lane with its
 * classification. Only findings are promoted; `ok` and `flaky` are dashboard
 * state, and `flaky` in particular is the sensor deliberately withholding a
 * single failure below its threshold — promoting it here would undo that.
 */
export function extractHealthFindings(report) {
  const lanes = Array.isArray(report?.lanes) ? report.lanes : [];
  return lanes
    .filter((lane) => ["failing", "stalled", "stale", "never"].includes(lane.status))
    .map((lane) => ({
      source: "automation-health",
      type: "workflow_unhealthy",
      // Identity is the lane, not its current status: a lane going from failing
      // to stalled is changed evidence about the same problem, so it must land
      // on the same issue rather than opening a second one.
      identity: [lane.file],
      sensor: "scripts/check-automation-health.mjs",
      dashboard: "the rolling `automation:health` issue",
      reference: lane.latest?.html_url ?? null,
      affected: `\`.github/workflows/${lane.file}\` (${lane.name})`,
      title: `Scheduled lane not completing: ${lane.name}`,
      statement: `\`${lane.name}\` is reported as **${lane.status}**. ${lane.detail}`,
      evidence: [
        `Status: \`${lane.status}\``,
        `Detail: ${lane.detail}`,
        `Consecutive failures: ${lane.consecutiveFailures ?? 0}`,
        `Cadence: ${lane.cadence}`,
        lane.latest?.html_url ? `Most recent relevant run: ${lane.latest.html_url}` : null,
        Array.isArray(lane.failingJobs) && lane.failingJobs.length
          ? `Failing jobs: ${lane.failingJobs.join(", ")}`
          : null
      ].filter(Boolean),
      data: {
        workflow: lane.file,
        status: lane.status,
        consecutive_failures: lane.consecutiveFailures ?? 0,
        run_url: lane.latest?.html_url ?? null,
        failing_jobs: lane.failingJobs ?? []
      }
    }));
}

// A dead link is a 404 or a 410 and nothing else. This is the same discipline
// the repository already applies to WAF responses, extended to the evidence the
// live data actually produces: on 2026-09-09 every "current failure" in the
// audit was `status: null, error: "timeout after 12000ms"`, and a twelve-second
// timeout from a CI runner is not proof that a storefront URL is dead. Promoting
// those would have opened two issues asking someone to withdraw a working
// affiliate lane.
const CONFIRMED_DEAD_STATUSES = new Set([404, 410]);

/**
 * `verify-outbound-links.mjs --json` writes failures already split by review
 * scope. Only upcoming, confirmed-dead URLs are promoted.
 *
 * `expired_failures` are never read: the sensor has already determined those
 * URLs are referenced only by events that have happened, and the audit keeps
 * them as maintenance evidence rather than as work.
 */
export function extractLinkFindings(report) {
  const failures = Array.isArray(report?.failures) ? report.failures : [];
  return failures
    .filter((f) => f.actionable !== false && f.reviewScope === "upcoming" && CONFIRMED_DEAD_STATUSES.has(f.status))
    .map((f) => {
      const events = [...(f.eventIds || [])].sort();
      const artists = [...(f.artistSlugs || [])].sort();
      return {
        source: "daily-audit",
        type: "provider_url_dead",
        // The URL is the identity. Its referencing events are evidence and are
        // sorted, so re-ordering events.json cannot mint a new issue.
        identity: [f.url],
        sensor: "scripts/verify-outbound-links.mjs",
        dashboard: "the rolling `automation:daily-audit` issue",
        reference: null,
        affected: `${f.provider} URL for ${artists.join(", ") || "unknown artist"}`,
        title: `Dead ${f.provider} URL for ${artists.join(", ") || "unknown artist"} (${events[0] ?? "unknown event"})`,
        statement: `\`${f.url}\` returned **${f.status}** to both a HEAD and a confirming ranged GET, and is referenced by an event that has not happened yet.`,
        evidence: [
          `URL: ${f.url}`,
          `HTTP status: ${f.status} (confirmed by HEAD then ranged GET)`,
          `Provider: ${f.provider}`,
          `Events: ${events.join(", ")}`,
          `Event dates: ${[...(f.eventDates || [])].sort().join(", ") || "unknown"}`,
          `Review scope: ${f.reviewScope}`
        ],
        data: {
          url: f.url,
          provider: f.provider,
          status: f.status,
          event_ids: events,
          artist_slugs: artists,
          review_scope: f.reviewScope
        }
      };
    });
}

/**
 * `check-generated-freshness.mjs --json` writes a verdict per allowlisted
 * artefact. Only `stale` is promoted: that state already means the sensor ran
 * the generator, saw the declared artefacts change, and watched the same check
 * go green.
 *
 * `generator_failed` and `check_failed_not_stale` are deliberately dropped. Both
 * mean a check is red for a reason this class does not understand, and a work
 * item that says "regenerate this" would be wrong. They are reported by the
 * sensor and left to the operator.
 */
export function extractGeneratedFreshnessFindings(report) {
  const artefacts = Array.isArray(report?.artefacts) ? report.artefacts : [];
  return artefacts
    .filter((a) => a.state === "stale")
    .map((a) => ({
      source: "generated-freshness",
      type: "generated_artifact_stale",
      // The artefact group is the identity. Which files inside it drifted, and
      // what the check printed, are evidence and change between runs.
      identity: [a.id],
      sensor: "scripts/check-generated-freshness.mjs",
      dashboard: "the `generated-freshness` workflow run log",
      reference: null,
      affected: [...(a.artifacts || [])].sort().map((f) => `\`${f}\``).join(", "),
      title: `Regenerate stale ${a.label} (${a.id})`,
      statement: `\`${a.evidence?.check_command}\` fails on \`main\`: the committed ${a.label} no longer matches ${a.source}. Regenerating with \`${a.evidence?.regenerate_command}\` was verified to make the same check pass.`,
      evidence: [
        `Failing validator: \`${a.evidence?.check_command}\` (exit ${a.evidence?.check_exit})`,
        `Generated artefact(s): ${[...(a.artifacts || [])].sort().join(", ")}`,
        `Authoritative source: ${a.source}`,
        `Regeneration command: \`${a.evidence?.regenerate_command}\``,
        `Files the regeneration changed: ${[...(a.evidence?.changed_files || [])].sort().join(", ") || "none recorded"}`,
        `Re-run of the same check after regenerating: exit ${a.evidence?.recheck_exit} (pass)`,
        `Required validation for the fix: ${(a.validation || []).map((v) => `\`${v}\``).join(", ")}`,
        a.evidence?.check_output ? `Validator output:\n\n\`\`\`\n${a.evidence.check_output}\n\`\`\`` : null
      ].filter(Boolean),
      data: {
        artefact_id: a.id,
        check_command: a.evidence?.check_command ?? null,
        regenerate_command: a.evidence?.regenerate_command ?? null,
        generated_files: [...(a.artifacts || [])].sort(),
        changed_files: [...(a.evidence?.changed_files || [])].sort(),
        authoritative_source: a.source,
        required_validation: a.validation || []
      }
    }));
}

// ─── Planning ───────────────────────────────────────────────────────────────

/**
 * Decide what to create, update, reopen, close or hold. Pure: the caller
 * supplies the current findings, the queue's existing issues, and the bodies of
 * open pull requests, and receives a plan it may then execute.
 *
 * Recovery is deliberately conservative in one direction. A finding that has
 * cleared normally closes its issue, but never while an open pull request
 * references it: remediation in flight is exactly when closing the task would
 * lose the context the author is working from, and a stale-but-open issue costs
 * far less than a silently-dropped one.
 */
export function planQueue({
  findings,
  existingIssues = [],
  openPullRequestBodies = [],
  limits = DEFAULT_LIMITS,
  registry = FINDING_TYPES,
  activeSources = null
}) {
  const plan = { create: [], update: [], reopen: [], close: [], hold: [], overflow: [], unclassified: [] };

  const byFingerprint = new Map();
  for (const issue of existingIssues) {
    const fingerprint = fingerprintFromBody(issue.body);
    if (fingerprint) byFingerprint.set(fingerprint, issue);
  }

  const openQueueCount = existingIssues.filter((issue) => issue.state === "open").length;
  let created = 0;
  const seen = new Set();

  for (const finding of findings) {
    const payload = buildPayload(finding, registry);
    if (!payload) {
      plan.unclassified.push({ finding, reason: classify(finding, registry).reason });
      continue;
    }
    // A sensor reporting the same identity twice in one run is one unit of work.
    if (seen.has(payload.fingerprint)) continue;
    seen.add(payload.fingerprint);

    const existing = byFingerprint.get(payload.fingerprint);
    if (existing) {
      (existing.state === "open" ? plan.update : plan.reopen).push({ issue: existing, payload, finding });
      continue;
    }

    if (created >= limits.maxNewPerRun || openQueueCount + created >= limits.maxOpenQueue) {
      plan.overflow.push({ payload, finding });
      continue;
    }
    plan.create.push({ payload, finding });
    created += 1;
  }

  // Recovery is scoped to the sources this run actually read, and that scoping is
  // the whole point rather than a refinement.
  //
  // The materialiser is invoked from more than one workflow, each passing only
  // its own sensor's output. Without this, a run reading `generated-freshness`
  // alone sees no automation-health findings and reads every automation-health
  // issue as cleared, closing live work items for lanes that are still failing.
  // That happened on 2026-09-12: the 08:47Z freshness run closed #948, #949 and
  // #950 while all three lanes were down, so the queue reported nothing wrong
  // while ingestion was stopped. Silently hiding a real failure is the worst
  // thing this layer can do, so an issue from an unread source is untouched.
  const scoped = activeSources ? new Set(activeSources) : null;
  for (const issue of existingIssues) {
    if (issue.state !== "open") continue;
    const fingerprint = fingerprintFromBody(issue.body);
    if (!fingerprint || seen.has(fingerprint)) continue;
    const source = sourceFromBody(issue.body);
    // Unknown source, or a source this run did not read: not ours to judge.
    if (scoped && (!source || !scoped.has(source))) continue;
    const referencedByOpenPr = openPullRequestBodies.some((body) =>
      new RegExp(`#${issue.number}\\b`).test(String(body || ""))
    );
    (referencedByOpenPr ? plan.hold : plan.close).push({ issue, fingerprint });
  }

  return plan;
}
