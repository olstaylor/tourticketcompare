#!/usr/bin/env node
// Generic automation PR opener (no-ops if a PR for the branch is already open).
// Used by PR-only data workflows that have already committed + pushed a branch.
//
// Env: GITHUB_TOKEN, GITHUB_REPOSITORY, BRANCH, PR_TITLE, PR_BODY, PR_LABEL (optional), PR_BASE (default main),
// PR_AUTO_MERGE (optional; "true" merges the validated PR head, once —
// only for workflows whose in-run validation suite has already passed on
// exactly the pushed content, mirroring sync-tm-events-write-pr.mjs; a failed
// merge leaves the PR open for a human with an explanatory comment, never forced).
// Degrades gracefully (prints a compare link, exits 0) when the Actions token
// is not permitted to open PRs.
// PR_AUDIT_SOURCE_COMMIT (verification dates only) requires a protected
// fast-forward of a direct child of the audited commit, closing stale PRs.
//
// Auto-merge first earns the `test-mvp` required status check on the PR head by
// dispatching the real Prelaunch Validation workflow against the branch and
// waiting for its verdict (scripts/lib/required-check.mjs). A PR opened with
// the Actions token raises no `pull_request` run that can ever reach a verdict,
// so without that dispatch the required check never exists and the merge is
// rejected — which is exactly how every lane silently stalled on 2026-09-12.
// The wait is also the gate: a red verdict is never merged.

import {
  reportStrandedPrValidation,
  earnRequiredCheck,
  DEFAULT_TIMEOUT_MS,
  DEFAULT_POLL_MS,
} from "./lib/required-check.mjs";
import { checkAutopublish, heldComment, HELD_LABEL, LEDGER_LABEL } from "./lib/autopublish-guard.mjs";
import { checkAuditMergeRevision, mergeAuditedPr } from "./check-audit-revision.mjs";

const token = process.env.GITHUB_TOKEN;
const repo = process.env.GITHUB_REPOSITORY;
const branch = process.env.BRANCH;
const title = process.env.PR_TITLE;
const body = process.env.PR_BODY || "";
const label = process.env.PR_LABEL || "";
const base = process.env.PR_BASE || "main";
const autoMerge = process.env.PR_AUTO_MERGE === "true";
const auditedCommit = process.env.PR_AUDIT_SOURCE_COMMIT;
const owner = (repo || "").split("/")[0];
const checkTimeoutMs = Number(process.env.REQUIRED_CHECK_TIMEOUT_MS || DEFAULT_TIMEOUT_MS);
const checkPollMs = Number(process.env.REQUIRED_CHECK_POLL_MS || DEFAULT_POLL_MS);

if (!token || !repo || !branch || !title) {
  console.error("ERROR: GITHUB_TOKEN, GITHUB_REPOSITORY, BRANCH, PR_TITLE all required.");
  process.exit(2);
}

async function gh(method, path, payload) {
  const res = await fetch(`https://api.github.com${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "tourticketcompare-automation-pr",
    },
    body: payload ? JSON.stringify(payload) : undefined,
  });
  if (!res.ok) throw new Error(`GitHub API ${method} ${path} ${res.status}: ${await res.text()}`);
  // 202 Accepted (the run-cancel endpoint) answers with an empty body, which
  // res.json() cannot parse. Read the text first and treat empty as no content.
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

const head = encodeURIComponent(`${owner}:${branch}`);
const existing = await gh("GET", `/repos/${repo}/pulls?head=${head}&state=open`);

let pr = existing[0];
if (pr) {
  // A re-run, or a retry after a withheld merge. With auto-merge requested the
  // work is not done just because the PR exists — carry on to the check and the
  // merge below, against whatever head the branch now carries.
  console.log(`PR already open: #${pr.number} ${pr.html_url}`);
  if (!autoMerge) process.exit(0);
  pr = await gh("GET", `/repos/${repo}/pulls/${pr.number}`);
} else {
  try {
    pr = await gh("POST", `/repos/${repo}/pulls`, { title, head: branch, base, body, maintainer_can_modify: true });
  } catch (err) {
    if (/not permitted to create or approve pull requests/i.test(err.message)) {
      console.warn(`Could not open PR automatically: ${err.message}`);
      console.warn(`Branch "${branch}" is pushed. Open it manually:`);
      console.warn(`  https://github.com/${repo}/compare/${base}...${branch}?expand=1`);
      process.exit(0);
    }
    throw err;
  }
  console.log(`Opened PR #${pr.number}: ${pr.html_url}`);
}

if (label) {
  await gh("POST", `/repos/${repo}/issues/${pr.number}/labels`, { labels: [label] }).catch((err) =>
    console.warn(`Could not add label ${label}: ${err.message}`)
  );
}

if (autoMerge) {
  // Only merges the PR opened by this same call — the caller's in-run
  // validation suite has already passed on exactly this content. Never forced:
  // any failure leaves the PR open for a human, with the reason as a comment,
  // and exits non-zero so the lane goes red instead of leaving a stuck PR
  // nobody is told about.
  const leaveForHuman = async (reason) => {
    console.error(`PR #${pr.number} was not merged: ${reason}`);
    await gh("POST", `/repos/${repo}/issues/${pr.number}/comments`, {
      body: `Auto-merge withheld (\`${String(reason).slice(0, 300)}\`). This PR now needs a human to resolve and merge it.`,
    }).catch((commentErr) => console.warn(`Could not comment on PR #${pr.number}: ${commentErr.message}`));
    process.exit(1);
  };

  const withholdAudit = async (err) => {
    const stale = err.code === "STALE_AUDIT";
    console.error(`Audit PR #${pr.number} withheld: ${err.message}`);
    await gh("POST", `/repos/${repo}/issues/${pr.number}/labels`, { labels: ["automation:invalidated-audit"] }).catch((e) => console.warn(e.message));
    await gh("POST", `/repos/${repo}/issues/${pr.number}/comments`, {
      body: `Audit publication withheld: ${String(err.message).slice(0, 500)}\n\n${stale ? "This PR's evidence is invalidated and the PR will be closed." : "This PR remains blocked; its evidence could not be safely confirmed."} Fresh scheduled audit evidence is required. Do not resolve, rebase or manually merge these stamps.`,
    }).catch((e) => console.warn(e.message));
    if (stale) await gh("PATCH", `/repos/${repo}/pulls/${pr.number}`, { state: "closed" }).catch((e) => console.warn(`Could not close invalidated audit PR: ${e.message}`));
    process.exit(1);
  };

  // Kill switch, read live (scripts/lib/autopublish-guard.mjs): once before
  // the minutes-long validation wait and again immediately before the merge,
  // so a switch flipped mid-run still stops it. A deliberate pause exits 0 so
  // it cannot read as a red lane; an unreadable switch is a fault and exits 1.
  const holdIfSwitchedOff = async () => {
    const decision = await checkAutopublish({ repo });
    if (decision.allowed) return;
    console.warn(`PR #${pr.number} held: ${decision.reason}`);
    await gh("POST", `/repos/${repo}/issues/${pr.number}/labels`, { labels: [HELD_LABEL] }).catch((err) =>
      console.warn(`Could not add label ${HELD_LABEL}: ${err.message}`)
    );
    await gh("POST", `/repos/${repo}/issues/${pr.number}/comments`, { body: heldComment(decision) }).catch((err) =>
      console.warn(`Could not comment on PR #${pr.number}: ${err.message}`)
    );
    process.exit(decision.fault ? 1 : 0);
  };
  await holdIfSwitchedOff();

  const checkAuditedMain = async () => {
    if (auditedCommit === undefined) return;
    try {
      await checkAuditMergeRevision({ audited: auditedCommit, repo, request: gh });
    } catch (err) {
      await withholdAudit(err);
    }
  };
  await checkAuditedMain();

  const verdict = await earnRequiredCheck({
    request: gh,
    repo,
    branch,
    sha: pr.head.sha,
    timeoutMs: checkTimeoutMs,
    pollMs: checkPollMs,
  });
  if (!verdict.ok) {
    await leaveForHuman(`${verdict.detail}${verdict.url ? ` (${verdict.url})` : ""}`);
  }
  console.log(`Required check earned on ${pr.head.sha.slice(0, 7)}${verdict.url ? `: ${verdict.url}` : ""}`);

  // Read-only: names the validation run GitHub stranded on this SHA so the red
  // on the Actions tab has an explanation beside it. It cannot be cancelled —
  // see reportStrandedPrValidation. Never throws, so it sits outside the try
  // that reports a withheld merge.
  await reportStrandedPrValidation({ request: gh, repo, sha: pr.head.sha });

  await holdIfSwitchedOff();
  // The ledger: every auto-merged PR carries this label (read by the digest).
  // Added before the merge so a merged PR can never be missing it; a label
  // that cannot be added withholds the merge rather than publish unrecorded.
  try {
    await gh("POST", `/repos/${repo}/issues/${pr.number}/labels`, { labels: [LEDGER_LABEL] });
  } catch (err) {
    await leaveForHuman(`could not record the ${LEDGER_LABEL} ledger label: ${err.message}`);
  }

  // A green head check cannot make observations of an older main current.
  // Re-read after the minutes-long wait, immediately before publishing.
  await checkAuditedMain();
  try {
    if (auditedCommit !== undefined) {
      await mergeAuditedPr({ audited: auditedCommit, repo, head: pr.head.sha, number: pr.number, request: gh });
    } else await gh("PUT", `/repos/${repo}/pulls/${pr.number}/merge`, {
      merge_method: "squash",
      commit_title: `${title} (#${pr.number})`,
      // Bind the merge to the head the verdict was earned on. Time passes
      // between `earnRequiredCheck` and here, and without this GitHub would
      // merge whatever the
      // branch points at now, publishing a commit no check ever ran against.
      // SAFE_PUBLISHING_RULES.md requires the check on *that exact PR head*. A
      // moved head returns 409 ("Head branch was modified") and lands in the
      // withheld-merge path below — the right answer: the verdict no longer
      // describes the branch.
      sha: pr.head.sha,
    });
    console.log(`Auto-merged PR #${pr.number} (${auditedCommit !== undefined ? "fast-forward, audited base pinned" : "squash"}).`);
    await gh("DELETE", `/repos/${repo}/git/refs/heads/${branch}`).catch((err) =>
      console.warn(`Could not delete merged branch ${branch}: ${err.message}`)
    );
  } catch (err) {
    if (auditedCommit !== undefined) await withholdAudit(err);
    await leaveForHuman(err.message || String(err));
  }
}
