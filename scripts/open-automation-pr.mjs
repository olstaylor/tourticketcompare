#!/usr/bin/env node
// Generic automation PR opener (no-ops if a PR for the branch is already open).
// Used by PR-only data workflows that have already committed + pushed a branch.
//
// Env: GITHUB_TOKEN, GITHUB_REPOSITORY, BRANCH, PR_TITLE, PR_BODY, PR_LABEL (optional), PR_BASE (default main),
// PR_AUTO_MERGE (optional; "true" squash-merges the PR this call opens, once —
// only for workflows whose in-run validation suite has already passed on
// exactly the pushed content, mirroring sync-tm-events-write-pr.mjs; a failed
// merge leaves the PR open for a human with an explanatory comment, never forced).
// Degrades gracefully (prints a compare link, exits 0) when the Actions token
// is not permitted to open PRs.
//
// Auto-merge first earns the `test-mvp` required status check on the PR head by
// dispatching the real Prelaunch Validation workflow against the branch and
// waiting for its verdict (scripts/lib/required-check.mjs). A PR opened with
// the Actions token raises no `pull_request` run of its own, so without that
// dispatch the required check never exists and the merge is rejected — which is
// exactly how every lane silently stalled on 2026-09-12. The wait is also the
// gate: a red verdict is never merged.

import { earnRequiredCheck, DEFAULT_TIMEOUT_MS, DEFAULT_POLL_MS } from "./lib/required-check.mjs";

const token = process.env.GITHUB_TOKEN;
const repo = process.env.GITHUB_REPOSITORY;
const branch = process.env.BRANCH;
const title = process.env.PR_TITLE;
const body = process.env.PR_BODY || "";
const label = process.env.PR_LABEL || "";
const base = process.env.PR_BASE || "main";
const autoMerge = process.env.PR_AUTO_MERGE === "true";
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
  return res.status === 204 ? null : res.json();
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

  try {
    await gh("PUT", `/repos/${repo}/pulls/${pr.number}/merge`, {
      merge_method: "squash",
      commit_title: `${title} (#${pr.number})`,
    });
    console.log(`Auto-merged PR #${pr.number} (squash).`);
    await gh("DELETE", `/repos/${repo}/git/refs/heads/${branch}`).catch((err) =>
      console.warn(`Could not delete merged branch ${branch}: ${err.message}`)
    );
  } catch (err) {
    await leaveForHuman(err.message || String(err));
  }
}
