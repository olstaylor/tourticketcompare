// Runs a validation lane from scripts/test-manifest.mjs.
//
// Usage:
//   node scripts/run-test-lane.mjs <mvp|quick|units> [--only <substring>] [--list]
//
// Steps run in manifest order and the run stops at the first failure, matching
// the `&&` chains this replaced. `--only` filters by step id so a single failing
// step can be re-run without retyping its command; `--list` prints the lane
// without running anything.

import { spawn, spawnSync } from "node:child_process";
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

// Steps sharing a `parallel` tag run together at the position of the first one,
// so the read-only site crawls overlap instead of queueing. Everything else
// keeps manifest order.
const plan = [];
const grouped = new Map();
for (const step of steps) {
  if (!step.parallel) plan.push([step]);
  else if (grouped.has(step.parallel)) grouped.get(step.parallel).push(step);
  else {
    const group = [step];
    grouped.set(step.parallel, group);
    plan.push(group);
  }
}

const fail = (step, elapsed, status) => {
  console.error(`\n[test:${lane}] FAILED at ${step.id} after ${seconds(elapsed)}`);
  console.error(`  $ ${step.run}`);
  console.error(`  re-run just this step: npm run test:${lane} -- --only ${step.id}`);
  process.exit(status || 1);
};

// Output is buffered per step and printed when the step ends, so overlapping
// crawls do not interleave their logs.
const runAsync = (step) =>
  new Promise((resolve) => {
    const stepStarted = Date.now();
    const child = spawn(step.run, { cwd: ROOT, shell: true, stdio: ["inherit", "pipe", "pipe"] });
    let output = "";
    child.stdout.on("data", (chunk) => (output += chunk));
    child.stderr.on("data", (chunk) => (output += chunk));
    const done = (status) => resolve({ step, output, status, elapsed: Date.now() - stepStarted });
    child.on("error", () => done(1));
    child.on("close", (code) => done(code ?? 1));
  });

let count = 0;
for (const group of plan) {
  if (group.length === 1) {
    const [step] = group;
    console.log(`[${++count}/${steps.length}] ${step.id}\n  $ ${step.run}`);
    const stepStarted = Date.now();
    const result = spawnSync(step.run, { cwd: ROOT, shell: true, stdio: "inherit" });
    const elapsed = Date.now() - stepStarted;
    if (result.error || result.status !== 0) fail(step, elapsed, result.status);
    timings.push({ id: step.id, elapsed });
    console.log(`  ok (${seconds(elapsed)})\n`);
    continue;
  }

  console.log(`[${count + 1}-${count + group.length}/${steps.length}] running in parallel: ${group.map((s) => s.id).join(", ")}\n`);
  count += group.length;
  const results = await Promise.all(group.map(runAsync));
  for (const { step, output, status, elapsed } of results) {
    console.log(`--- ${step.id}\n  $ ${step.run}\n${output}`);
    if (status === 0) {
      timings.push({ id: step.id, elapsed });
      console.log(`  ok (${seconds(elapsed)})\n`);
    }
  }
  const failed = results.find((result) => result.status !== 0);
  if (failed) fail(failed.step, failed.elapsed, failed.status);
}

const total = Date.now() - started;
const slowest = [...timings].sort((a, b) => b.elapsed - a.elapsed).slice(0, 3);
console.log(`[test:${lane}] OK: ${steps.length} step${steps.length === 1 ? "" : "s"} in ${seconds(total)}`);
console.log(`  slowest: ${slowest.map((t) => `${t.id} ${seconds(t.elapsed)}`).join(", ")}`);
