#!/usr/bin/env node
//
// report-tm-sync-review.mjs
//
// Surfaces the review-only findings produced by apply-tm-updates.mjs (deleted
// events, cancelled/postponed status, transient errors) into a rolling GitHub
// issue. Auto-applied date/venue updates are NOT reported here — they land in
// the nightly commit diff. This issue is only for things a human must action.
//
// Usage:
//   node scripts/report-tm-sync-review.mjs --report <apply-report.json> [--repo owner/name] [--dry-run]
// Env: GITHUB_TOKEN (required unless --dry-run), GITHUB_REPOSITORY.

import fs from 'node:fs/promises';

const ROLLING_ISSUE_LABEL = 'automation:data-sync';
const ROLLING_ISSUE_TITLE = 'Nightly data-sync — events needing review';

const argv = process.argv.slice(2);
function arg(name) {
  const i = argv.indexOf(name);
  return i >= 0 ? argv[i + 1] : null;
}

const reportPath = arg('--report');
const repo = arg('--repo') || process.env.GITHUB_REPOSITORY;
const token = process.env.GITHUB_TOKEN;
const dryRun = argv.includes('--dry-run');

if (!reportPath) {
  console.error('ERROR: --report <path> required.');
  process.exit(2);
}
if (!repo) {
  console.error('ERROR: --repo or GITHUB_REPOSITORY required.');
  process.exit(2);
}
if (!token && !dryRun) {
  console.error('ERROR: GITHUB_TOKEN required (or use --dry-run).');
  process.exit(2);
}

async function readJson(path) {
  try {
    const raw = await fs.readFile(path, 'utf8');
    return raw.trim() ? JSON.parse(raw) : null;
  } catch (err) {
    if (err?.code === 'ENOENT') return null;
    throw err;
  }
}

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function reportReviewItems(report) {
  return asArray(report?.reviewItems).length ? asArray(report.reviewItems) : asArray(report?.review);
}

function reportUpdates(report) {
  return asArray(report?.updates).length ? asArray(report.updates) : asArray(report?.updated);
}

function reportSummary(report, updates, reviewItems, errors, blockedUpdateIds) {
  return {
    checked: Number(report?.summary?.checked ?? report?.totals?.checked ?? 0),
    updated: Number(report?.summary?.updated ?? report?.totals?.events_updated ?? updates.length),
    reviewItems: Number(report?.summary?.reviewItems ?? report?.totals?.review_items ?? reviewItems.length),
    errors: Number(report?.summary?.errors ?? report?.totals?.errors ?? errors.length),
    blockedUpdateIds: Number(report?.summary?.blockedUpdateIds ?? blockedUpdateIds.length),
    autoCommitSafe: Boolean(report?.summary?.autoCommitSafe)
  };
}

function valueOrUnknown(value) {
  return value ? String(value) : '(unknown)';
}

function itemLine(item) {
  const status = valueOrUnknown(item.ticketmaster_status);
  const artist = valueOrUnknown(item.artist_slug);
  const name = valueOrUnknown(item.local_event_name);
  const intended = asArray(item.intendedChanges);
  let line = `- \`${item.id}\` — artist \`${artist}\` — TM ID \`${item.ticketmaster_event_id}\` — local event: ${name} — TM status: \`${status}\` — reason: ${item.detail || item.reason || item.kind}`;
  if (intended.length) {
    const fields = intended.map((change) => `${change.field}: '${change.from}' → '${change.to}'`).join('; ');
    line += ` — blocked intended changes: ${fields}`;
  }
  if (item.recommendedAction) line += ` — recommended action: ${item.recommendedAction}`;
  return `${line}\n`;
}

function buildBody(report) {
  const generated = new Date().toISOString();
  const updates = reportUpdates(report);
  const reviewItems = reportReviewItems(report);
  const errors = asArray(report?.errors);
  const blockedUpdateIds = asArray(report?.blockedUpdateIds);
  const summary = reportSummary(report, updates, reviewItems, errors, blockedUpdateIds);
  const deleted = reviewItems.filter((r) => r.kind === 'deleted');
  const status = reviewItems.filter((r) => r.kind === 'status' || r.kind === 'unknown_status');
  const identity = reviewItems.filter((r) => r.kind === 'identity_mismatch');
  const ambiguous = reviewItems.filter((r) => r.kind === 'ambiguous_api_response');
  const otherReview = reviewItems.filter((r) => !['deleted', 'status', 'unknown_status', 'identity_mismatch', 'ambiguous_api_response'].includes(r.kind));
  const hasFindings = reviewItems.length > 0 || errors.length > 0 || blockedUpdateIds.length > 0;

  let body = `<!-- tm-sync-review -->\n`;
  body += `**Last run:** \`${generated}\`\n`;
  body += `**Status:** ${hasFindings ? '🔴 **Action needed / auto-commit blocked**' : '🟢 **Nothing to action**'}\n\n`;
  body += `> Updated by [.github/workflows/nightly-data-sync.yml](../actions/workflows/nightly-data-sync.yml). `;
  body += `The workflow may auto-commit only when updated > 0, errors = 0, blocked updates = 0, and review items = 0. Any review item blocks commit/push.\n\n`;

  body += `## High-level counts\n\n`;
  body += `| Count | Value |\n|---|---:|\n`;
  body += `| Checked events | ${summary.checked} |\n`;
  body += `| Auto-applicable updates | ${summary.updated} |\n`;
  body += `| Review items | ${summary.reviewItems} |\n`;
  body += `| Blocked update event IDs | ${summary.blockedUpdateIds} |\n`;
  body += `| Errors | ${summary.errors} |\n`;
  body += `| Auto-commit safe | ${summary.autoCommitSafe ? 'yes' : 'no'} |\n\n`;

  body += `## Blocked updates\n\n`;
  if (blockedUpdateIds.length === 0) {
    body += '✅ None.\n\n';
  } else {
    body += `These local events had fields that would otherwise have changed, but at least one review-only blocker was present. No fields should be changed automatically for these events.\n\n`;
    for (const id of blockedUpdateIds) {
      body += `- \`${id}\`\n`;
    }
    body += '\n';
  }

  body += `## Deleted on Ticketmaster (404/410)\n\n`;
  if (deleted.length === 0) {
    body += '✅ None.\n\n';
  } else {
    body += `Recommended human action: confirm the show is genuinely gone, then remove or update the event and any CTA via PR only.\n\n`;
    for (const d of deleted) body += itemLine(d);
    body += '\n';
  }

  body += `## Unsafe / unknown Ticketmaster statuses\n\n`;
  if (status.length === 0) {
    body += '✅ None.\n\n';
  } else {
    body += `Recommended human action: confirm whether each event should be retained, removed, or copy-adjusted via PR. These statuses are review-only.\n\n`;
    for (const s of status) body += itemLine(s);
    body += '\n';
  }

  body += `## Identity mismatches\n\n`;
  if (identity.length === 0) {
    body += '✅ None.\n\n';
  } else {
    body += `Recommended human action: confirm the Ticketmaster event ID still belongs to the local event before changing local data.\n\n`;
    for (const item of identity) body += itemLine(item);
    body += '\n';
  }

  body += `## Ambiguous API responses\n\n`;
  if (ambiguous.length === 0) {
    body += '✅ None.\n\n';
  } else {
    body += `Recommended human action: re-check the Ticketmaster response manually; do not apply automatic mutations from ambiguous data.\n\n`;
    for (const item of ambiguous) body += itemLine(item);
    body += '\n';
  }

  if (otherReview.length) {
    body += `## Other sync blockers\n\n`;
    body += `Recommended human action: confirm by PR before changing event data.\n\n`;
    for (const item of otherReview) body += itemLine(item);
    body += '\n';
  }

  if (errors.length) {
    body += `## Errors\n\n`;
    body += `Recommended human action: retry or investigate; the workflow must not commit data changes from a run with errors.\n\n`;
    for (const err of errors) {
      body += `- \`${err.id}\` — artist \`${valueOrUnknown(err.artist_slug)}\` — TM ID \`${err.ticketmaster_event_id}\` — local event: ${valueOrUnknown(err.local_event_name)} — status: \`${valueOrUnknown(err.status)}\` — error: ${err.error}\n`;
    }
    body += '\n';
  }

  body += `---\n_Generated by \`scripts/report-tm-sync-review.mjs\` on ${generated}._\n`;
  return { body, hasFindings };
}

async function gh(method, path, payload) {
  const res = await fetch(`https://api.github.com${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'tourticketcompare-data-sync'
    },
    body: payload ? JSON.stringify(payload) : undefined
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub API ${method} ${path} ${res.status}: ${text}`);
  }
  return res.status === 204 ? null : res.json();
}

async function findRollingIssue() {
  const issues = await gh('GET', `/repos/${repo}/issues?state=open&labels=${encodeURIComponent(ROLLING_ISSUE_LABEL)}&per_page=10`);
  return issues.find((i) => !i.pull_request) || null;
}

async function main() {
  const report = await readJson(reportPath);
  if (!report || report.status === 'skipped') {
    console.log('No report (or run skipped); nothing to post.');
    return;
  }
  const { body, hasFindings } = buildBody(report);

  if (dryRun) {
    console.log('--- DRY RUN ---');
    console.log(body);
    console.log(`hasFindings=${hasFindings}`);
    return;
  }

  const existing = await findRollingIssue();
  if (existing) {
    console.log(`Updating issue #${existing.number}.`);
    await gh('PATCH', `/repos/${repo}/issues/${existing.number}`, { body });
  } else if (hasFindings) {
    console.log('Creating new rolling data-sync review issue.');
    await gh('POST', `/repos/${repo}/issues`, {
      title: ROLLING_ISSUE_TITLE,
      body,
      labels: [ROLLING_ISSUE_LABEL]
    });
  } else {
    console.log('No findings and no open rolling issue. Nothing to post.');
  }
}

main().catch((err) => {
  console.error('report-tm-sync-review failed:', err);
  process.exit(1);
});
