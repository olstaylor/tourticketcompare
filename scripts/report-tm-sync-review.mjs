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

import assert from 'node:assert/strict';
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
const selfTest = argv.includes('--self-test');

if (!selfTest && !reportPath) {
  console.error('ERROR: --report <path> required.');
  process.exit(2);
}
if (!selfTest && !repo) {
  console.error('ERROR: --repo or GITHUB_REPOSITORY required.');
  process.exit(2);
}
if (!selfTest && !token && !dryRun) {
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

function reviewTimestamp(value) {
  const text = String(value || '').trim();
  if (!text) return null;
  const timestamp = /^\d{4}-\d{2}-\d{2}$/.test(text)
    ? Date.parse(`${text}T23:59:59Z`)
    : Date.parse(text);
  return Number.isFinite(timestamp) ? timestamp : null;
}

function itemNeedsCurrentReview(item, now = Date.now()) {
  const candidates = [
    item?.datetime_iso,
    item?.ticketmaster_datetime_iso,
    ...asArray(item?.intendedChanges)
      .filter((change) => change?.field === 'datetime_iso')
      .map((change) => change?.to)
  ];
  let sawValidDate = false;
  for (const candidate of candidates) {
    const timestamp = reviewTimestamp(candidate);
    if (timestamp === null) continue;
    sawValidDate = true;
    if (timestamp >= now) return true;
  }
  // Unknown dates remain current-action by default; only positively expired
  // records are de-escalated.
  return !sawValidDate;
}

function itemLine(item) {
  const status = valueOrUnknown(item.ticketmaster_status);
  const artist = valueOrUnknown(item.artist_slug);
  const name = valueOrUnknown(item.local_event_name);
  const date = valueOrUnknown(item.datetime_iso);
  const intended = asArray(item.intendedChanges);
  let line = `- \`${item.id}\` — artist \`${artist}\` — date: \`${date}\` — TM ID \`${item.ticketmaster_event_id}\` — local event: ${name} — TM status: \`${status}\` — reason: ${item.detail || item.reason || item.kind}`;
  if (intended.length) {
    const fields = intended.map((change) => `${change.field}: '${change.from}' → '${change.to}'`).join('; ');
    line += ` — blocked intended changes: ${fields}`;
  }
  if (item.recommendedAction) line += ` — recommended action: ${item.recommendedAction}`;
  return `${line}\n`;
}

function buildBody(report, now = Date.now()) {
  const generated = new Date().toISOString();
  const updates = reportUpdates(report);
  const reviewItems = reportReviewItems(report);
  const errors = asArray(report?.errors);
  const blockedUpdateIds = asArray(report?.blockedUpdateIds);
  const summary = reportSummary(report, updates, reviewItems, errors, blockedUpdateIds);
  const currentById = new Map();
  for (const item of reviewItems) {
    const id = String(item?.id || '');
    currentById.set(id, Boolean(currentById.get(id)) || itemNeedsCurrentReview(item, now));
  }
  const currentReviewItems = reviewItems.filter((item) => currentById.get(String(item?.id || '')) !== false);
  const historicalReviewItems = reviewItems.filter((item) => currentById.get(String(item?.id || '')) === false);
  const currentErrors = errors.filter((item) => itemNeedsCurrentReview(item, now));
  const historicalErrors = errors.filter((item) => !itemNeedsCurrentReview(item, now));
  const knownReviewIds = new Set(reviewItems.map((item) => String(item?.id || '')));
  const currentBlockedUpdateIds = blockedUpdateIds.filter((id) => currentById.get(String(id)) === true || !knownReviewIds.has(String(id)));
  const historicalBlockedUpdateIds = blockedUpdateIds.filter((id) => currentById.get(String(id)) === false);
  const deleted = currentReviewItems.filter((r) => r.kind === 'deleted');
  const status = currentReviewItems.filter((r) => r.kind === 'status' || r.kind === 'unknown_status');
  const identity = currentReviewItems.filter((r) => r.kind === 'identity_mismatch');
  const ambiguous = currentReviewItems.filter((r) => r.kind === 'ambiguous_api_response');
  const otherReview = currentReviewItems.filter((r) => !['deleted', 'status', 'unknown_status', 'identity_mismatch', 'ambiguous_api_response'].includes(r.kind));
  const hasFindings = currentReviewItems.length > 0 || currentErrors.length > 0 || currentBlockedUpdateIds.length > 0;

  let body = `<!-- tm-sync-review -->\n`;
  body += `**Last run:** \`${generated}\`\n`;
  body += `**Status:** ${hasFindings ? '🔴 **Current action needed**' : '🟢 **No current action**'}\n\n`;
  body += `> Updated by [.github/workflows/nightly-data-sync.yml](../actions/workflows/nightly-data-sync.yml). `;
  body += `Clean per-event updates may auto-commit when at least one update exists and the run has zero errors. Review-only records are skipped before the diff and do not block unrelated clean updates. Findings tied exclusively to past events remain in the run artefact but are not presented as current human work. This issue closes automatically when no current action remains.\n\n`;

  body += `## High-level counts\n\n`;
  body += `| Count | Value |\n|---|---:|\n`;
  body += `| Checked events | ${summary.checked} |\n`;
  body += `| Auto-applicable updates | ${summary.updated} |\n`;
  body += `| Current review items | ${currentReviewItems.length} |\n`;
  body += `| Historical review items | ${historicalReviewItems.length} |\n`;
  body += `| Current blocked update event IDs | ${currentBlockedUpdateIds.length} |\n`;
  body += `| Historical blocked update event IDs | ${historicalBlockedUpdateIds.length} |\n`;
  body += `| Current errors | ${currentErrors.length} |\n`;
  body += `| Historical errors | ${historicalErrors.length} |\n`;
  body += `| Clean-update commit gate | ${summary.updated > 0 ? (summary.autoCommitSafe ? 'pass' : 'blocked') : 'not applicable — no clean updates'} |\n\n`;

  body += `## Blocked updates\n\n`;
  if (currentBlockedUpdateIds.length === 0) {
    body += '✅ None.\n\n';
  } else {
    body += `These local events had fields that would otherwise have changed, but at least one review-only blocker was present. No fields should be changed automatically for these events.\n\n`;
    for (const id of currentBlockedUpdateIds) {
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

  if (currentErrors.length) {
    body += `## Errors\n\n`;
    body += `Recommended human action: retry or investigate; the workflow must not commit data changes from a run with errors.\n\n`;
    for (const err of currentErrors) {
      body += `- \`${err.id}\` — artist \`${valueOrUnknown(err.artist_slug)}\` — date: \`${valueOrUnknown(err.datetime_iso)}\` — TM ID \`${err.ticketmaster_event_id}\` — local event: ${valueOrUnknown(err.local_event_name)} — status: \`${valueOrUnknown(err.status)}\` — error: ${err.error}\n`;
    }
    body += '\n';
  }

  body += `## Historical findings\n\n`;
  const historicalTotal = historicalReviewItems.length + historicalErrors.length;
  if (historicalTotal === 0 && historicalBlockedUpdateIds.length === 0) {
    body += '✅ None.\n\n';
  } else {
    body += `ℹ️ ${historicalReviewItems.length} review item(s), ${historicalErrors.length} error(s), and ${historicalBlockedUpdateIds.length} blocked update ID(s) relate exclusively to past events. They are omitted from this action list; the complete evidence remains in the \`tm-sync.json\` workflow artefact.\n\n`;
  }

  body += `---\n_Generated by \`scripts/report-tm-sync-review.mjs\` on ${generated}._\n`;
  return { body, hasFindings };
}

function runSelfTest() {
  const now = Date.parse('2026-07-30T12:00:00Z');
  const historicalOnly = buildBody({
    updates: [],
    reviewItems: [{
      id: 'past',
      artist_slug: 'artist',
      datetime_iso: '2026-07-01T20:00:00Z',
      ticketmaster_event_id: 'past-id',
      ticketmaster_status: 'offsale',
      kind: 'status',
      detail: 'historical status'
    }],
    errors: [],
    blockedUpdateIds: ['past'],
    summary: { checked: 1, updated: 0, reviewItems: 1, errors: 0, blockedUpdateIds: 1, autoCommitSafe: false }
  }, now);
  assert.equal(historicalOnly.hasFindings, false);
  assert.match(historicalOnly.body, /No current action/);
  assert.match(historicalOnly.body, /Historical review items \| 1/);
  assert.doesNotMatch(historicalOnly.body, /Action needed \/ auto-commit blocked/);
  assert.doesNotMatch(historicalOnly.body, /- `past` — artist/);

  const mixed = buildBody({
    updates: [{ id: 'clean' }],
    reviewItems: [
      {
        id: 'past',
        artist_slug: 'artist',
        datetime_iso: '2026-07-01T20:00:00Z',
        ticketmaster_event_id: 'past-id',
        ticketmaster_status: 'offsale',
        kind: 'status',
        detail: 'historical status'
      },
      {
        id: 'future',
        artist_slug: 'artist',
        datetime_iso: '2026-08-01T20:00:00Z',
        ticketmaster_event_id: 'future-id',
        ticketmaster_status: 'rescheduled',
        kind: 'status',
        detail: 'current status'
      }
    ],
    errors: [],
    blockedUpdateIds: ['past', 'future'],
    summary: { checked: 3, updated: 1, reviewItems: 2, errors: 0, blockedUpdateIds: 2, autoCommitSafe: true }
  }, now);
  assert.equal(mixed.hasFindings, true);
  assert.match(mixed.body, /Current action needed/);
  assert.match(mixed.body, /`future` — artist/);
  assert.doesNotMatch(mixed.body, /`past` — artist/);
  assert.match(mixed.body, /Clean-update commit gate \| pass/);

  assert.equal(itemNeedsCurrentReview({
    datetime_iso: '2026-07-01T20:00:00Z',
    ticketmaster_datetime_iso: '2026-08-01T20:00:00Z'
  }, now), true);
  assert.equal(itemNeedsCurrentReview({ datetime_iso: 'not-a-date' }, now), true);

  console.log('report-tm-sync-review self-test passed');
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
    if (hasFindings) {
      console.log(`Updating issue #${existing.number}.`);
      await gh('PATCH', `/repos/${repo}/issues/${existing.number}`, { body });
    } else {
      console.log(`Closing resolved issue #${existing.number}.`);
      await gh('PATCH', `/repos/${repo}/issues/${existing.number}`, {
        body,
        state: 'closed',
        state_reason: 'completed'
      });
    }
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

if (selfTest) {
  try {
    runSelfTest();
  } catch (err) {
    console.error('report-tm-sync-review self-test failed:', err);
    process.exit(1);
  }
} else {
  main().catch((err) => {
    console.error('report-tm-sync-review failed:', err);
    process.exit(1);
  });
}
