// Guards the validation manifest in scripts/test-manifest.mjs.
//
// The lanes can no longer drift apart by hand — `test:quick` and `test:units`
// are derived from the same ordered list `test:mvp` runs, so the old job of
// diffing three hand-maintained `&&` chains is gone. What can still go wrong is
// a malformed manifest: a step with no lane, a duplicate id, a command naming an
// npm script or file that does not exist, or a package.json chain edited back in
// so a lane stops reading the manifest at all. This checks those.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { STEPS, stepsFor } from "./test-manifest.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const scripts = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8")).scripts || {};

const STEP_LANES = ["quick", "units"];
const RESERVED = new Set(["test:mvp", "test:quick", "test:units", "test:lanes"]);
const errors = [];

const seen = new Set();
for (const [index, step] of STEPS.entries()) {
  const where = `step ${index + 1} (${step.id || "unnamed"})`;

  if (!step.id) errors.push(`${where}: missing id`);
  else if (seen.has(step.id)) errors.push(`${where}: duplicate id`);
  seen.add(step.id);

  if (!STEP_LANES.includes(step.lane)) {
    errors.push(`${where}: lane must be one of ${STEP_LANES.join(", ")}, got ${JSON.stringify(step.lane)}`);
  }

  if (!step.run) {
    errors.push(`${where}: missing run command`);
    continue;
  }

  // Every command the manifest names has to resolve, or the lane fails late and
  // in the middle of a run rather than here.
  for (const command of step.run.split("&&").map((part) => part.trim())) {
    const npmRun = /^npm run ([A-Za-z0-9:_-]+)/.exec(command);
    if (npmRun) {
      if (RESERVED.has(npmRun[1])) errors.push(`${where}: cannot run lane aggregate '${npmRun[1]}' as a step`);
      else if (!scripts[npmRun[1]]) errors.push(`${where}: npm script '${npmRun[1]}' does not exist`);
      continue;
    }
    // Only a leading path argument names a file; a flag form such as `node -e`
    // has nothing on disk to check.
    const file = /^(?:node|python3)\s+(?!-)(\S+)/.exec(command);
    if (file && !fs.existsSync(path.join(ROOT, file[1]))) {
      errors.push(`${where}: ${file[1]} does not exist`);
    }
  }
}

// The lanes are a partition of the suite by construction; assert it so a future
// change to stepsFor() cannot quietly reintroduce the drift this used to catch.
const mvp = stepsFor("mvp");
const partition = [...stepsFor("quick"), ...stepsFor("units")];
if (partition.length !== mvp.length) {
  errors.push(`quick (${stepsFor("quick").length}) + units (${stepsFor("units").length}) != mvp (${mvp.length})`);
}
for (const step of mvp) {
  if (!partition.includes(step)) errors.push(`step is in neither lane: ${step.id}`);
}

// The three npm entries must delegate to the runner rather than carry their own
// chains, otherwise the manifest stops being the source of truth.
for (const lane of ["mvp", "quick", "units"]) {
  const entry = scripts[`test:${lane}`];
  if (!entry) errors.push(`missing npm script 'test:${lane}'`);
  else if (!entry.includes(`run-test-lane.mjs ${lane}`)) {
    errors.push(`npm script 'test:${lane}' must delegate to run-test-lane.mjs, got: ${entry}`);
  }
}

if (errors.length) {
  console.error("[validate-test-lanes] FAILED");
  for (const error of errors) console.error(`  - ${error}`);
  console.error("\n  scripts/test-manifest.mjs owns the validation lanes.");
  process.exit(1);
}

console.log(
  `[validate-test-lanes] OK: manifest has ${mvp.length} steps ` +
    `(quick ${stepsFor("quick").length} + units ${stepsFor("units").length})`,
);
