#!/usr/bin/env node
// Opens (or no-ops if already open) the daily verification-dates PR.
// Inputs: env GITHUB_TOKEN, GITHUB_REPOSITORY, BRANCH, TODAY.

const token = process.env.GITHUB_TOKEN;
const repo = process.env.GITHUB_REPOSITORY;
const branch = process.env.BRANCH;
const today = process.env.TODAY;
const owner = (repo || '').split('/')[0];

if (!token || !repo || !branch || !today) {
  console.error('ERROR: GITHUB_TOKEN, GITHUB_REPOSITORY, BRANCH, TODAY all required.');
  process.exit(2);
}

async function gh(method, path, body) {
  const res = await fetch(`https://api.github.com${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'tourticketcompare-daily-audit'
    },
    body: body ? JSON.stringify(body) : undefined
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub API ${method} ${path} ${res.status}: ${text}`);
  }
  return res.status === 204 ? null : res.json();
}

const existing = await gh('GET', `/repos/${repo}/pulls?head=${owner}:${branch}&state=open`);
if (existing.length > 0) {
  console.log(`PR already open: #${existing[0].number}`);
  process.exit(0);
}

const body = [
  'Daily automated PR from the daily-audit workflow.',
  '',
  'This bumps `last_verified_at` on `public/data/artists.json` for indexed artists whose URL liveness checks and TM Discovery diff produced no findings today.',
  '',
  '- Review the diff and merge if the dates look right.',
  '- If a finding was missed, close the rolling audit issue investigation first.',
  '- Tomorrow\'s run will open a new branch `automation/verified-dates-YYYY-MM-DD`; this one is safe to close at any time.'
].join('\n');

const prPayload = {
  title: `Bump last_verified_at for clean artists (${today})`,
  head: branch,
  base: 'main',
  body
};

let pr;
try {
  pr = await gh('POST', `/repos/${repo}/pulls`, prPayload);
} catch (err) {
  // The Actions GITHUB_TOKEN can only open PRs when the repo/org setting
  // "Allow GitHub Actions to create and approve pull requests" is enabled.
  // The verified-dates branch is already pushed, so degrade gracefully:
  // surface a manual PR link and succeed rather than failing the audit.
  if (/not permitted to create or approve pull requests/i.test(err.message)) {
    console.warn(`Could not open PR automatically: ${err.message}`);
    console.warn(`Branch "${branch}" is pushed. Open a PR manually:`);
    console.warn(`  https://github.com/${repo}/compare/main...${branch}?expand=1`);
    console.warn('To auto-open in future runs, enable Settings → Actions → General → Workflow permissions → "Allow GitHub Actions to create and approve pull requests".');
    process.exit(0);
  }
  throw err;
}

console.log(`Opened PR #${pr.number}: ${pr.html_url}`);
