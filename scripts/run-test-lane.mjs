// Runs a validation lane from scripts/test-manifest.mjs.
//
// Usage:
//   node scripts/run-test-lane.mjs <mvp|quick|units> [--only <substring>] [--list]
//
// Steps run in manifest order and the run stops at the first failure, matching
// the `&&` chains this replaced. `--only` filters by step id so a single failing
// step can be re-run without retyping its command; `--list` prints the lane
// without running anything.

import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { LANES, stepsFor } from "./test-manifest.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const argv = process.argv.slice(2);

// The lane is the first bare word, skipping the value that belongs to --only so
// `--only blog units` does not read "blog" as the lane.
const positional = argv.filter((arg, index) => !arg.startsWith("--") && argv[index - 1] !== "--only");
const lane = positional[0];
if (!LANES.includes(lane)) {
  console.error(`usage: node scripts/run-test-lane.mjs <${LANES.join("|")}> [--only <substring>] [--list]`);
  process.exit(2);
}

const onlyIndex = argv.indexOf("--only");
const only = onlyIndex === -1 ? null : argv[onlyIndex + 1];
if (onlyIndex !== -1 && !only) {
  console.error("--only needs a substring to match step ids against");
  process.exit(2);
}

const steps = stepsFor(lane).filter((step) => !only || step.id.includes(only));

if (!steps.length) {
  console.error(`no steps in lane '${lane}'${only ? ` matching '${only}'` : ""}`);
  process.exit(2);
}

if (argv.includes("--list")) {
  for (const step of steps) console.log(`${step.lane.padEnd(5)}  ${step.id.padEnd(38)}  ${step.run}`);
  process.exit(0);
}

const seconds = (ms) => `${(ms / 1000).toFixed(1)}s`;
const started = Date.now();
const timings = [];

console.log(`[test:${lane}] ${steps.length} step${steps.length === 1 ? "" : "s"}${only ? ` matching '${only}'` : ""}\n`);

for (const [index, step] of steps.entries()) {
  const label = `[${index + 1}/${steps.length}] ${step.id}`;
  console.log(`${label}\n  $ ${step.run}`);
  const stepStarted = Date.now();
  const result = spawnSync(step.run, { cwd: ROOT, shell: true, stdio: "inherit" });
  const elapsed = Date.now() - stepStarted;

  if (result.error || result.status !== 0) {
    console.error(`\n[test:${lane}] FAILED at ${step.id} after ${seconds(elapsed)}`);
    console.error(`  $ ${step.run}`);
    console.error(`  re-run just this step: npm run test:${lane} -- --only ${step.id}`);
    process.exit(result.status || 1);
  }

  timings.push({ id: step.id, elapsed });
  console.log(`  ok (${seconds(elapsed)})\n`);
}

const total = Date.now() - started;
const slowest = [...timings].sort((a, b) => b.elapsed - a.elapsed).slice(0, 3);
console.log(`[test:${lane}] OK: ${steps.length} step${steps.length === 1 ? "" : "s"} in ${seconds(total)}`);
console.log(`  slowest: ${slowest.map((t) => `${t.id} ${seconds(t.elapsed)}`).join(", ")}`);
