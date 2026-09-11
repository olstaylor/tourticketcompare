#!/usr/bin/env node
// Detects a committed generated artefact that has drifted from its source.
//
// This is the defect that took `main` red on 2026-09-11: PR #935 changed the
// /about copy without re-running `npm run content:provenance`, so
// `content:provenance:check` failed on `main` from 10:37Z to 13:29Z. Every
// sanctioned writer gates its commit on `test:mvp` passing against that tree, so
// three Impact marketplace runs and a Vivid Seats CTA sync published nothing
// before a human noticed. The eventual repair was one command and a two-line
// diff (commit 56b4107).
//
// This is not a second audit system. It runs the repository's own existing
// `--check` guards — each of which is already documented as "fail if the
// committed file is stale" — over a fixed allowlist, and reports which one is
// stale in a structure the work queue can read.
//
// The important part is what it refuses. A failing check is not, on its own,
// evidence of staleness: the source could be broken instead. So a finding is
// only ever raised when the repair is *proved in the same run* — regenerate,
// observe the declared artefacts change, and watch the same check go green. A
// check that fails for any other reason is reported and deliberately not turned
// into a work item.
//
// It never commits. The workspace is restored after every regeneration attempt,
// and its workflow holds `contents: read`.

import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const EVIDENCE_LIMIT = 1200;

/**
 * The allowlist. Every entry is a generated artefact whose regeneration is
 * deterministic and whose source is already authoritative in this repository —
 * the four that CLAUDE.md -> Protected Areas names as "generated, never
 * hand-edited".
 *
 * Membership here is the whole safety boundary for the `agent:ready` class.
 * A validator that is not on this list can never produce a work item, however
 * it fails: this is deliberately a list of specifically understood
 * stale-output guards, not a general "a test went red" detector.
 */
export const GENERATED_ARTEFACTS = [
  {
    id: "blog-content",
    label: "Blog content",
    check: "npm run blog:check",
    regenerate: "npm run blog:build",
    artifacts: ["public/data/blog-content.json"],
    source: "content/blog/*.md",
    validation: ["npm run test:content", "npm run test:mvp"]
  },
  {
    id: "guides-content",
    label: "Guide content and generated routes",
    check: "npm run guides:check",
    regenerate: "npm run guides:build",
    artifacts: ["public/data/guides-content.json", "functions/_guide-routes.generated.js"],
    source: "content/guides/*.md",
    validation: ["npm run test:content", "npm run test:routes", "npm run test:mvp"]
  },
  {
    id: "og-cards",
    label: "Open Graph cards",
    check: "npm run og:check",
    regenerate: "npm run og:build",
    artifacts: ["public/og", "functions/_og-cards.generated.js"],
    source: "route metadata and the titles the cards are rasterised from",
    validation: ["npm run og:check", "npm run test:mvp"]
  },
  {
    id: "content-provenance",
    label: "Content provenance",
    check: "npm run content:provenance:check",
    regenerate: "npm run content:provenance",
    artifacts: ["data/content-provenance.json"],
    source: "the render blocks and trust-page copy the fingerprints cover",
    validation: ["npm run test:content", "npm run test:mvp"]
  }
];

/**
 * The verdict for one artefact, from the four observations the runner makes.
 * Pure, so the self-test can pin every branch without running a generator.
 *
 * A dirty workspace is handled by the caller before this is reached, because it
 * makes the drift measurement unsound rather than merely inconclusive.
 *
 * Only `stale` is a work item, and it requires all three pieces of proof:
 * the check failed, regenerating changed exactly the declared artefacts, and
 * the same check then passed. Anything else is reported and left alone —
 * failing closed is the point, because "a check is red" and "this generated
 * file is out of date" are different claims and only the second one has a
 * known, bounded repair.
 */
export function verdictFor({ checkExit, regenerateExit = null, changedFiles = [], recheckExit = null }) {
  if (checkExit === 0) return { state: "fresh", reason: "The staleness guard passes." };
  if (regenerateExit !== 0) {
    return {
      state: "generator_failed",
      reason: "The check failed and the generator could not run, so the source itself is broken. Not a staleness finding."
    };
  }
  if (changedFiles.length === 0) {
    return {
      state: "check_failed_not_stale",
      reason: "The check failed but regeneration changed nothing, so the committed artefact is current and the failure has another cause. Not a staleness finding."
    };
  }
  if (recheckExit !== 0) {
    return {
      state: "check_failed_not_stale",
      reason: "Regeneration changed the artefact but the check still fails, so regenerating is not the repair. Not a staleness finding."
    };
  }
  return {
    state: "stale",
    reason: "The check failed, regeneration changed the declared artefacts, and the same check then passed. The repair is proved."
  };
}

const truncate = (text) => {
  const trimmed = String(text || "").trim();
  return trimmed.length > EVIDENCE_LIMIT ? `${trimmed.slice(0, EVIDENCE_LIMIT)}\n… truncated` : trimmed;
};

const run = (command) => {
  const result = spawnSync(command, { cwd: ROOT, shell: true, encoding: "utf8" });
  return { exit: result.status ?? 1, output: truncate(`${result.stdout || ""}\n${result.stderr || ""}`) };
};

const changedUnder = (paths) => {
  const result = spawnSync("git", ["status", "--porcelain", "--", ...paths], { cwd: ROOT, encoding: "utf8" });
  return String(result.stdout || "")
    .split("\n")
    .map((line) => line.slice(3).trim())
    .filter(Boolean);
};

// Restore the workspace after a regeneration probe. Scoped to the declared
// artefacts only, so it can never touch anything the entry did not name, and
// `git clean` picks up files a generator adds (an OG card for a new route).
const restore = (paths) => {
  spawnSync("git", ["checkout", "--", ...paths], { cwd: ROOT, encoding: "utf8" });
  spawnSync("git", ["clean", "-fdq", "--", ...paths], { cwd: ROOT, encoding: "utf8" });
};

export function inspectArtefact(entry) {
  const check = run(entry.check);
  if (check.exit === 0) {
    return { id: entry.id, ...verdictFor({ checkExit: 0 }), evidence: null };
  }

  // Drift is measured as "what regenerating changed relative to the commit", so
  // the declared artefacts must be clean before the probe starts. On a CI
  // checkout they always are. If they are not — someone regenerated by hand, or
  // an earlier probe failed to restore — the measurement is meaningless in
  // exactly the misleading direction: regenerating a locally-stale file makes it
  // match the commit again and git reports no change at all, which would read as
  // "not stale". Fail closed rather than report that.
  const dirtyBefore = changedUnder(entry.artifacts);
  if (dirtyBefore.length) {
    return {
      id: entry.id,
      state: "workspace_dirty",
      reason: `The check failed but ${dirtyBefore.length} declared artefact(s) were already modified before the probe, so drift cannot be measured. Not a staleness finding.`,
      evidence: { check_command: entry.check, check_exit: check.exit, check_output: check.output, dirty_before: dirtyBefore }
    };
  }

  const regenerate = run(entry.regenerate);
  const changedFiles = regenerate.exit === 0 ? changedUnder(entry.artifacts) : [];
  const recheck = regenerate.exit === 0 && changedFiles.length ? run(entry.check) : { exit: null };
  restore(entry.artifacts);

  return {
    id: entry.id,
    ...verdictFor({ checkExit: check.exit, regenerateExit: regenerate.exit, changedFiles, recheckExit: recheck.exit }),
    evidence: {
      check_command: entry.check,
      check_exit: check.exit,
      check_output: check.output,
      regenerate_command: entry.regenerate,
      regenerate_exit: regenerate.exit,
      changed_files: changedFiles,
      recheck_exit: recheck.exit
    }
  };
}

// Entry-point guarded, not just argv-guarded. A module that runs its self-test
// on bare import hijacks the importer's process — which is exactly what happened
// when the work-queue self-test imported this file to assert the allowlist.
const { pathToFileURL } = await import("node:url");
const IS_ENTRY_POINT = Boolean(process.argv[1]) && pathToFileURL(process.argv[1]).href === import.meta.url;

if (IS_ENTRY_POINT && process.argv.includes("--self-test")) {
  const { default: assert } = await import("node:assert/strict");

  assert.equal(verdictFor({ checkExit: 0 }).state, "fresh");
  assert.equal(verdictFor({ checkExit: 1, regenerateExit: 1 }).state, "generator_failed");
  assert.equal(verdictFor({ checkExit: 1, regenerateExit: 0, changedFiles: [] }).state, "check_failed_not_stale");
  assert.equal(
    verdictFor({ checkExit: 1, regenerateExit: 0, changedFiles: ["a"], recheckExit: 1 }).state,
    "check_failed_not_stale"
  );
  assert.equal(
    verdictFor({ checkExit: 1, regenerateExit: 0, changedFiles: ["data/content-provenance.json"], recheckExit: 0 }).state,
    "stale"
  );
  // A missing observation must never be read as success.
  assert.notEqual(verdictFor({ checkExit: 1, regenerateExit: 0, changedFiles: ["a"], recheckExit: null }).state, "stale");

  // Only `stale` may ever become a work item. Pinned as a set so adding a new
  // verdict cannot silently widen the agent-ready class.
  const states = new Set([
    verdictFor({ checkExit: 0 }).state,
    verdictFor({ checkExit: 1, regenerateExit: 1 }).state,
    verdictFor({ checkExit: 1, regenerateExit: 0, changedFiles: [] }).state,
    verdictFor({ checkExit: 1, regenerateExit: 0, changedFiles: ["a"], recheckExit: 1 }).state,
    verdictFor({ checkExit: 1, regenerateExit: 0, changedFiles: ["a"], recheckExit: 0 }).state
  ]);
  assert.deepEqual([...states].sort(), ["check_failed_not_stale", "fresh", "generator_failed", "stale"]);

  // The allowlist is the safety boundary, so its shape is asserted rather than
  // trusted: every entry must name a check, a regeneration command, at least one
  // artefact, and the validation a repair has to pass.
  const { existsSync } = await import("node:fs");
  const pkg = JSON.parse(await (await import("node:fs/promises")).readFile(path.join(ROOT, "package.json"), "utf8"));
  const scriptFor = (command) => command.replace(/^npm run /, "");
  for (const entry of GENERATED_ARTEFACTS) {
    assert.ok(entry.id && entry.label && entry.source, `${entry.id}: incomplete entry`);
    assert.ok(entry.artifacts.length > 0, `${entry.id}: no artefacts declared`);
    assert.ok(entry.validation.length > 0, `${entry.id}: no validation declared`);
    // The commands must exist, or a stale artefact would be reported with a
    // regeneration instruction that does not run.
    assert.ok(pkg.scripts[scriptFor(entry.check)], `${entry.id}: unknown check script ${entry.check}`);
    assert.ok(pkg.scripts[scriptFor(entry.regenerate)], `${entry.id}: unknown regenerate script ${entry.regenerate}`);
    for (const artefact of entry.artifacts) {
      assert.ok(existsSync(path.join(ROOT, artefact)), `${entry.id}: declared artefact ${artefact} does not exist`);
    }
  }
  assert.equal(new Set(GENERATED_ARTEFACTS.map((e) => e.id)).size, GENERATED_ARTEFACTS.length, "duplicate artefact id");

  console.log(`OK: generated-freshness self-test (${GENERATED_ARTEFACTS.length} artefacts watched)`);
  process.exit(0);
}

if (IS_ENTRY_POINT) {
  const jsonIndex = process.argv.indexOf("--json");
  const jsonOut = jsonIndex >= 0 ? process.argv[jsonIndex + 1] : null;

  const artefacts = GENERATED_ARTEFACTS.map((entry) => {
    const result = inspectArtefact(entry);
    const icon = result.state === "fresh" ? "OK  " : result.state === "stale" ? "STALE" : "SKIP";
    console.log(`${icon.padEnd(6)} ${entry.id.padEnd(20)} ${result.reason}`);
    return { ...entry, ...result };
  });

  if (jsonOut) {
    const { writeFile } = await import("node:fs/promises");
    await writeFile(jsonOut, JSON.stringify({ checked_at: new Date().toISOString(), artefacts }, null, 2));
  }

  const stale = artefacts.filter((a) => a.state === "stale");
  const skipped = artefacts.filter((a) => !["fresh", "stale"].includes(a.state));
  console.log(`\n${stale.length} stale, ${skipped.length} failing for another reason, ${artefacts.length - stale.length - skipped.length} fresh.`);
  if (skipped.length) {
    console.log("Checks failing for a reason other than staleness are reported here and deliberately not turned into work items.");
  }
}
