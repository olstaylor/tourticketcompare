#!/usr/bin/env node
// Generic automation PR opener (no-ops if a PR for the branch is already open).
// Used by PR-only data workflows that have already committed + pushed a branch.
//
// Env: GITHUB_TOKEN, GITHUB_REPOSITORY, BRANCH, PR_TITLE, PR_BODY, PR_LABEL (optional), PR_BASE (default main).
// Degrades gracefully (prints a compare link, exits 0) when the Actions token
// is not permitted to open PRs.

const token = process.env.GITHUB_TOKEN;
const repo = process.env.GITHUB_REPOSITORY;
const branch = process.env.BRANCH;
const title = process.env.PR_TITLE;
const body = process.env.PR_BODY || "";
const label = process.env.PR_LABEL || "";
const base = process.env.PR_BASE || "main";
const owner = (repo || "").split("/")[0];

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

const existing = await gh("GET", `/repos/${repo}/pulls?head=${owner}:${branch}&state=open`);
if (existing.length > 0) {
  console.log(`PR already open: #${existing[0].number} ${existing[0].html_url}`);
  process.exit(0);
}

let pr;
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

if (label) {
  await gh("POST", `/repos/${repo}/issues/${pr.number}/labels`, { labels: [label] }).catch((err) =>
    console.warn(`Could not add label ${label}: ${err.message}`)
  );
}
console.log(`Opened PR #${pr.number}: ${pr.html_url}`);
