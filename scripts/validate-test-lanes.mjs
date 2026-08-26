// Guards the fast local validation lanes against drift.
//
// `test:mvp` is the complete suite and must stay that way: SAFE_PUBLISHING_RULES.md
// gates every sanctioned auto-merge on "test:mvp passing in-job on exactly the
// proposed content", so a step that silently leaves it would weaken those
// exceptions. `test:quick` and `test:units` exist only to split that same work
// into a fast pre-commit lane and a script-unit lane.
//
// This asserts the two lanes are an exact partition of test:mvp — every step
// appears in exactly one lane, and no lane invents a step. Adding a step to
// test:mvp without placing it in a lane fails here rather than quietly
// dropping it out of the pre-commit loop.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const scripts = JSON.parse(fs.readFileSync(path.join(ROOT, "package.json"), "utf8")).scripts || {};

const split = (name) => {
  if (!scripts[name]) throw new Error(`missing npm script '${name}'`);
  return scripts[name]
    .split("&&")
    .map((step) => step.trim())
    .filter(Boolean);
};

// The lane aggregates are themselves `npm run <lane>` chains; expand one level
// so we compare real steps rather than the two lane invocations.
const expand = (name) =>
  split(name).flatMap((step) => {
    const match = /^npm run ([A-Za-z0-9:_-]+)$/.exec(step);
    return match && (match[1] === "test:quick" || match[1] === "test:units") ? expand(match[1]) : [step];
  });

// test:quick runs this guard as its own first step; it is deliberately not part
// of test:mvp, so exclude it from the partition comparison.
const GUARD_STEP = "npm run test:lanes";

const errors = [];
const mvp = split("test:mvp");
const lanes = [...expand("test:quick"), ...expand("test:units")].filter((s) => s !== GUARD_STEP);

const counts = (list) => list.reduce((acc, s) => acc.set(s, (acc.get(s) || 0) + 1), new Map());
const mvpCounts = counts(mvp);
const laneCounts = counts(lanes);

for (const [step, n] of mvpCounts) {
  const m = laneCounts.get(step) || 0;
  if (m === 0) errors.push(`test:mvp step is in neither lane: ${step}`);
  else if (m !== n) errors.push(`step appears ${n}x in test:mvp but ${m}x across the lanes: ${step}`);
}
for (const [step] of laneCounts) {
  if (!mvpCounts.has(step)) errors.push(`lane step is not part of test:mvp: ${step}`);
}

const overlap = expand("test:quick")
  .filter((s) => s !== GUARD_STEP)
  .filter((s) => expand("test:units").includes(s));
if (overlap.length) errors.push(`steps duplicated across both lanes: ${overlap.join(", ")}`);

if (errors.length) {
  console.error("[validate-test-lanes] FAILED");
  for (const error of errors) console.error(`  - ${error}`);
  console.error("\n  test:quick + test:units must be an exact partition of test:mvp.");
  process.exit(1);
}

const quickSteps = expand("test:quick").filter((s) => s !== GUARD_STEP).length;
console.log(
  `[validate-test-lanes] OK: test:quick (${quickSteps}) + test:units (${expand("test:units").length}) ` +
    `exactly partition test:mvp (${mvp.length})`,
);
