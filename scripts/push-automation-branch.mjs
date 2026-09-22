#!/usr/bin/env node
// Pushes an automation branch, retrying the one failure that is a lie: a
// freshly minted GitHub App installation token that git-over-HTTPS has not
// accepted yet.
//
//   node scripts/push-automation-branch.mjs <branch> [--force-with-lease]
//
// Every publishing lane mints its installation token immediately before
// pushing (.github/actions/automation-identity). The token is valid the
// instant `actions/create-github-app-token` returns it — against
// api.github.com. Git's HTTPS frontend can still refuse it for a moment,
// and it refuses with a message that reads like a permanent settings
// problem:
//
//   remote: Permission to olstaylor/tourticketcompare.git denied to
//           tourticketcompare-automation[bot].
//   fatal: unable to access '...': The requested URL returned error: 403
//
// Measured on the daily audit, which runs two publishing jobs minutes apart
// under one identical configuration:
//
//   2026-09-20 verification-dates  mint -> push  345ms  403
//   2026-09-21 status-figures      mint -> push  218ms  403
//   2026-09-21 verification-dates  mint -> push  ~2s    pushed
//   2026-09-22 status-figures      mint -> push  ~2s    pushed
//
// Both failures are under 350ms; both successes are over 1.5s. On 2026-09-20
// the failing job was verification-dates and status-figures published fine;
// on 2026-09-21 it was the other way round. Same App, same ruleset, same
// day, minutes apart — so this is not a permission or ruleset problem that
// a settings change fixes, and it is not something the lane did wrong. It
// is a race, and the loser publishes nothing that day.
//
// Waiting is the whole remedy: the token does not need re-minting, only a
// moment. So this retries ONLY that signature, and never a push git
// rejected on the merits.
//
// Pure except for the injected `run` and `sleep`, so the retry logic is
// provable offline (--self-test).

import { spawnSync } from "node:child_process";
import { pathToFileURL } from "node:url";

// 5 attempts at 2s, 4s, 8s, 16s spans ~30s of propagation lag — two orders
// of magnitude more than the ~300ms observed, and still short enough that a
// genuinely revoked credential fails the lane inside a minute rather than
// hanging it.
export const DEFAULT_ATTEMPTS = 5;
export const DEFAULT_BASE_DELAY_MS = 2000;

// Whether a failed push is the propagation race above rather than a verdict.
//
// It must match the App-identity 403 and nothing else. In particular it must
// NOT match a push git rejected on the merits — a non-fast-forward, a stale
// `--force-with-lease`, or a ruleset refusing the ref. Retrying one of those
// cannot help, and retrying until it "works" is exactly how an automation
// lane learns to publish something a gate meant to stop. Those carry their
// own wording ("[rejected]", "stale info", "protected branch") and never the
// bot-identity denial, so they fall through to a single honest failure.
//
// Both halves are required. A bare 403 with no bot identity is somebody
// else's problem, and a "denied to" line without a 403 is not this race.
export function isTokenPropagation403(output) {
  const text = String(output || "");
  if (/\[rejected\]|stale info|non-fast-forward|protected branch|refusing to allow/i.test(text)) return false;
  const deniedToBot = /denied to [^\s]+\[bot\]/i.test(text);
  const forbidden = /returned error: 403|HTTP 403|error: 403\b/i.test(text);
  return deniedToBot && forbidden;
}

// Runs one `git push`, retrying only the race above.
//
// `run(args)` performs one push and resolves to { status, output }; `sleep`
// and `log`/`warn` are injected for the self-test. Returns
// { ok, attempts, status, output } and never throws for a failed push — the
// CLI below decides the exit code.
export async function pushWithRetry({
  args,
  run,
  attempts = DEFAULT_ATTEMPTS,
  baseDelayMs = DEFAULT_BASE_DELAY_MS,
  sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms)),
  log = console.log,
  warn = console.warn,
} = {}) {
  if (!Array.isArray(args) || !run) throw new Error("pushWithRetry requires args and run.");

  let attempt = 0;
  let delay = baseDelayMs;
  for (;;) {
    attempt += 1;
    const result = (await run(args)) || {};
    const output = String(result.output ?? "");
    if (output) log(output);
    if (result.status === 0) return { ok: true, attempts: attempt, status: 0, output };

    if (!isTokenPropagation403(output)) {
      // Not the race. Say so plainly rather than burning the budget on a
      // push that will be refused identically five times.
      return { ok: false, attempts: attempt, status: result.status ?? 1, output };
    }
    if (attempt >= attempts) {
      warn(
        `::error::git push was refused as ${"tourticketcompare-automation[bot]"} on all ${attempts} attempts ` +
          `(~${Math.round((baseDelayMs * (2 ** (attempts - 1) - 1)) / 1000)}s). ` +
          `Beyond the installation-token propagation race this retries, so treat it as a real credential or ruleset problem: ` +
          `check the App is still installed with Contents: write, and that no ruleset restricts creating automation/* branches.`
      );
      return { ok: false, attempts: attempt, status: result.status ?? 1, output };
    }
    warn(
      `::warning::git push was refused as an App identity ${attempt}/${attempts - 1} — ` +
        `the installation token is almost certainly still propagating to git. Retrying in ${delay / 1000}s.`
    );
    await sleep(delay);
    delay *= 2;
  }
}

async function selfTest() {
  const { default: assert } = await import("node:assert/strict");

  // --- classification ------------------------------------------------
  const real403 = [
    "remote: Permission to olstaylor/tourticketcompare.git denied to tourticketcompare-automation[bot].",
    "fatal: unable to access 'https://github.com/olstaylor/tourticketcompare/': The requested URL returned error: 403",
  ].join("\n");
  assert.equal(isTokenPropagation403(real403), true, "the measured 2026-09-20/21 failure must be retryable");
  assert.equal(isTokenPropagation403(""), false, "an empty output is not the race");
  assert.equal(isTokenPropagation403("everything is fine"), false, "unrelated output is not the race");
  // A verdict must never be retried, however it is worded.
  assert.equal(
    isTokenPropagation403("! [rejected]        main -> main (non-fast-forward)"),
    false,
    "a non-fast-forward is a verdict, not a race"
  );
  assert.equal(
    isTokenPropagation403("! [rejected]  automation/x -> automation/x (stale info)"),
    false,
    "a stale --force-with-lease is a verdict, not a race"
  );
  assert.equal(
    isTokenPropagation403(
      "remote: Permission to o/r.git denied to some-app[bot].\nremote: error: GH006: Protected branch update failed. The requested URL returned error: 403"
    ),
    false,
    "a ruleset refusing the ref must not be retried even though it is a 403 to a bot"
  );
  assert.equal(
    isTokenPropagation403("fatal: ... The requested URL returned error: 403"),
    false,
    "a 403 naming no bot identity is not this race"
  );
  assert.equal(
    isTokenPropagation403("remote: Permission to o/r.git denied to some-app[bot]."),
    false,
    "a denial with no 403 is not this race"
  );

  // --- the retry loop -------------------------------------------------
  const scripted = (results) => {
    const calls = [];
    return {
      calls,
      run: async (args) => {
        calls.push(args.join(" "));
        return results.shift();
      },
    };
  };
  const quiet = () => {};
  const slept = [];
  const sleepSpy = async (ms) => {
    slept.push(ms);
  };

  const first = scripted([{ status: 0, output: "pushed" }]);
  let verdict = await pushWithRetry({
    args: ["push"],
    run: first.run,
    sleep: sleepSpy,
    log: quiet,
    warn: quiet,
  });
  assert.equal(verdict.ok, true, "a clean push succeeds");
  assert.equal(verdict.attempts, 1, "a clean push is not retried");
  assert.equal(slept.length, 0, "a clean push never sleeps");

  slept.length = 0;
  const flaky = scripted([
    { status: 128, output: real403 },
    { status: 128, output: real403 },
    { status: 0, output: "pushed" },
  ]);
  verdict = await pushWithRetry({
    args: ["push", "-u", "origin", "automation/x"],
    run: flaky.run,
    sleep: sleepSpy,
    log: quiet,
    warn: quiet,
  });
  assert.equal(verdict.ok, true, "the race is ridden out");
  assert.equal(verdict.attempts, 3, "it takes exactly as many attempts as it needs");
  assert.deepEqual(slept, [2000, 4000], "backoff doubles");
  assert.equal(flaky.calls[0], "push -u origin automation/x", "the same push is retried verbatim");

  slept.length = 0;
  const rejected = scripted([{ status: 1, output: "! [rejected] (stale info)" }, { status: 0, output: "pushed" }]);
  verdict = await pushWithRetry({
    args: ["push"],
    run: rejected.run,
    sleep: sleepSpy,
    log: quiet,
    warn: quiet,
  });
  assert.equal(verdict.ok, false, "a verdict is a failure");
  assert.equal(verdict.attempts, 1, "a verdict is never retried");
  assert.equal(slept.length, 0, "a verdict never sleeps");
  assert.equal(rejected.calls.length, 1, "a verdict does not consume the budget");

  slept.length = 0;
  const forever = scripted(Array.from({ length: 9 }, () => ({ status: 128, output: real403 })));
  verdict = await pushWithRetry({
    args: ["push"],
    run: forever.run,
    sleep: sleepSpy,
    log: quiet,
    warn: quiet,
  });
  assert.equal(verdict.ok, false, "a permanent denial still fails the lane");
  assert.equal(verdict.attempts, DEFAULT_ATTEMPTS, "the budget is bounded");
  assert.deepEqual(slept, [2000, 4000, 8000, 16000], "the budget spans ~30s");

  console.log("OK: push-automation-branch self-test");
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  if (process.argv.includes("--self-test")) {
    await selfTest();
  } else {
    const argv = process.argv.slice(2).filter((arg) => arg !== "--self-test");
    const branch = argv.find((arg) => !arg.startsWith("--"));
    if (!branch) {
      console.error("ERROR: usage: node scripts/push-automation-branch.mjs <branch> [--force-with-lease]");
      process.exit(2);
    }
    const flags = argv.filter((arg) => arg.startsWith("--"));
    const args = ["push", "-u", "origin", branch, ...flags];
    const verdict = await pushWithRetry({
      args,
      run: (pushArgs) => {
        // stderr is merged into stdout so the classifier reads exactly what a
        // human reading the log sees, and nothing is hidden on the way.
        const result = spawnSync("git", pushArgs, { encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] });
        return { status: result.status, output: `${result.stdout || ""}${result.stderr || ""}` };
      },
    });
    if (!verdict.ok) process.exit(verdict.status || 1);
    if (verdict.attempts > 1) console.log(`Pushed ${branch} on attempt ${verdict.attempts}.`);
  }
}
