#!/usr/bin/env node
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';

const ROLLING_ISSUE_LABEL = 'automation:daily-audit';
const ROLLING_ISSUE_TITLE = 'Daily data audit — open findings';

// GitHub rejects issue bodies over 65536 characters with a 422. Cap the
// number of failing-URL rows we render, and hard-truncate the final body
// below the API limit so a large failure list can never fail the workflow.
const MAX_FAILURE_ROWS = 100;
const GITHUB_BODY_LIMIT = 65536;
const BODY_SAFETY_CEILING = 60000;

const argv = process.argv.slice(2);
function arg(name) {
  const i = argv.indexOf(name);
  return i >= 0 ? argv[i + 1] : null;
}

const linksPath = arg('--links');
const tmPath = arg('--tm');
const guideSourcesPath = arg('--guide-sources');
const repo = arg('--repo') || process.env.GITHUB_REPOSITORY;
const token = process.env.GITHUB_TOKEN;
const dryRun = argv.includes('--dry-run');
const selfTest = argv.includes('--self-test');

if (!selfTest && !repo) {
  console.error('ERROR: --repo or GITHUB_REPOSITORY required.');
  process.exit(2);
}
if (!selfTest && !token && !dryRun) {
  console.error('ERROR: GITHUB_TOKEN required (or use --dry-run).');
  process.exit(2);
}

async function readJson(path) {
  if (!path) return null;
  try {
    const raw = await fs.readFile(path, 'utf8');
    if (!raw.trim()) return null;
    return JSON.parse(raw);
  } catch (err) {
    if (err?.code === 'ENOENT') return null;
    throw err;
  }
}

function formatTimestamp(iso) {
  return iso ? `\`${iso}\`` : '_no timestamp_';
}

function isActionable(item) {
  return item?.actionable !== false && item?.reviewScope !== 'expired';
}

function linkFindings(links) {
  const failures = Array.isArray(links?.failures) ? links.failures : [];
  const expiredFailures = Array.isArray(links?.expired_failures) ? links.expired_failures : [];
  return {
    current: failures.filter(isActionable),
    historical: [...failures.filter((item) => !isActionable(item)), ...expiredFailures]
  };
}

function tmFindings(tm) {
  const current = { missing: [], changed: [], errors: [] };
  const historical = { missing: [], changed: [], errors: [] };
  for (const artist of Array.isArray(tm?.artists) ? tm.artists : []) {
    for (const kind of Object.keys(current)) {
      for (const item of Array.isArray(artist?.[kind]) ? artist[kind] : []) {
        (isActionable(item) ? current : historical)[kind].push({ ...item, artistSlug: artist.slug });
      }
    }
  }
  return { current, historical };
}

function renderLinks(links) {
  if (!links) return '_Link audit did not run._\n';
  const { checked, redirects = [], blocked = [], checked_at } = links;
  const { current: failures, historical: historicalFailures } = linkFindings(links);
  let out = `Checked ${checked} URL(s) at ${formatTimestamp(checked_at)}.\n\n`;
  if (failures.length === 0) {
    out += '✅ No current failing URLs.\n';
  } else {
    out += `❌ ${failures.length} current failing URL(s):\n\n`;
    out += '| Status | URL | Artist | Events |\n';
    out += '|---|---|---|---|\n';
    for (const f of failures.slice(0, MAX_FAILURE_ROWS)) {
      const artists = (f.artistSlugs || []).join(', ') || '—';
      const events = (f.eventIds || []).slice(0, 3).join(', ') + ((f.eventIds || []).length > 3 ? '…' : '');
      out += `| ${f.status ?? 'ERR'} | ${f.url} | ${artists} | ${events} |\n`;
    }
    if (failures.length > MAX_FAILURE_ROWS) {
      out += `\n_… ${failures.length - MAX_FAILURE_ROWS} more failing URL(s) omitted. See the \`links.json\` artefact on the [workflow run](../actions/workflows/daily-audit.yml) for the full list._\n`;
    }
  }
  if (historicalFailures.length > 0) {
    out += `\nℹ️ ${historicalFailures.length} failure(s) relate exclusively to past events. They are omitted from this action list; the complete evidence remains in the \`links.json\` workflow artefact.\n`;
  }
  if (blocked.length > 0) {
    out += `\n🔒 ${blocked.length} URL(s) returned 401/403/429 (anti-bot/WAF block, **not** confirmed dead — not counted as failures).\n`;
  }
  if (redirects.length > 0) {
    out += `\nℹ️ ${redirects.length} URL(s) followed a redirect (not a failure):\n`;
    for (const r of redirects.slice(0, 10)) {
      out += `- \`${r.url}\` → \`${r.finalUrl}\`\n`;
    }
    if (redirects.length > 10) out += `- _… ${redirects.length - 10} more_\n`;
  }
  return out;
}

function renderProviderActions(links) {
  const summary = links?.provider_summary;
  if (!summary || typeof summary !== 'object') return '_Provider breakdown unavailable; inspect the workflow artifact._\n';
  const rows = Object.entries(summary).sort(([a], [b]) => a.localeCompare(b)).map(([provider, counts]) => {
    const action = counts.failures
      ? 'Review confirmed failures and suppress only after provider/event verification.'
      : counts.blocked
        ? 'Monitor; WAF response is inconclusive and is not a dead-link finding.'
        : counts.expiredFailures
          ? 'No current action; historical failures remain in the artifact.'
        : 'No action required.';
    return `| ${provider} | ${counts.checked || 0} | ${counts.failures || 0} | ${counts.expiredFailures || 0} | ${counts.blocked || 0} | ${counts.redirects || 0} | ${action} |\n`;
  });
  if (!rows.length) return '_No provider URLs were checked._\n';
  return '| Provider | Checked | Current failures | Historical failures | WAF-blocked | Redirects | Operator action |\n|---|---:|---:|---:|---:|---:|---|\n' + rows.join('');
}

function renderTmActions(tm) {
  if (!tm) return '_TM action summary unavailable; inspect the workflow artifact._\n';
  const { current } = tmFindings(tm);
  const changed = current.changed;
  const statusCounts = {};
  for (const item of changed) {
    for (const diff of Array.isArray(item.diffs) ? item.diffs : []) {
      if (diff.field !== 'status') continue;
      const value = String(diff.remote || 'unknown').toLowerCase();
      statusCounts[value] = (statusCounts[value] || 0) + 1;
    }
  }
  const statusLine = Object.entries(statusCounts).map(([status, count]) => `${status}: ${count}`).join(', ') || 'none reported';
  return `- Rescheduled/off-sale status changes requiring human review: **${statusLine}**\n- Ambiguous or blocked records remain review-only; do not auto-edit dates, venues, or event names without confirmation.\n- Missing 404/410 records can be considered for removal only after checking duplicate coverage and independent provider links.\n`;
}

function renderTm(tm) {
  if (!tm) return '_TM Discovery diff did not run._\n';
  const { totals = {}, artists = [], checked_at } = tm;
  const findings = tmFindings(tm);
  const currentTotals = Object.fromEntries(Object.entries(findings.current).map(([kind, items]) => [kind, items.length]));
  const historicalTotals = Object.fromEntries(Object.entries(findings.historical).map(([kind, items]) => [kind, items.length]));
  const historicalTotal = Object.values(historicalTotals).reduce((sum, count) => sum + count, 0);
  let out = `Checked ${totals.checked || 0} TM event ID(s) at ${formatTimestamp(checked_at)}.\n\n`;
  out += `- ❌ Current missing on TM (404/410): **${currentTotals.missing}**\n`;
  out += `- ⚠️ Current changed (date/venue/status): **${currentTotals.changed}**\n`;
  out += `- 🔁 Current transient errors: **${currentTotals.errors}**\n`;
  out += `- ⏭️ Unresolvable id (website/international code — not checked, **not** a failure): **${totals.unresolvable || 0}**\n\n`;
  for (const artist of artists) {
    const missing = (artist.missing || []).filter(isActionable);
    const changed = (artist.changed || []).filter(isActionable);
    const errors = (artist.errors || []).filter(isActionable);
    if (!missing.length && !changed.length && !errors.length) continue;
    out += `### ${artist.slug}\n\n`;
    if (missing.length) {
      out += `**Missing events (TM returned 404/410):**\n`;
      for (const m of missing) {
        out += `- \`${m.id}\` (${m.city || '—'}, ${m.datetime_iso || '—'}) — TM ID \`${m.ticketmaster_event_id}\`\n`;
      }
      out += '\n';
    }
    if (changed.length) {
      out += `**Changed events (local vs TM):**\n`;
      for (const c of changed) {
        const diffSummary = c.diffs.map((d) => `\`${d.field}\`: \`${d.local}\` → \`${d.remote}\``).join('; ');
        out += `- \`${c.id}\` — ${diffSummary}\n`;
      }
      out += '\n';
    }
    if (errors.length) {
      out += `**Transient errors (likely retry next run):** ${errors.length}\n\n`;
    }
  }
  if (historicalTotal > 0) {
    out += `### Historical findings\n\n`;
    out += `ℹ️ ${historicalTotals.missing} missing, ${historicalTotals.changed} changed, and ${historicalTotals.errors} error finding(s) relate exclusively to past events. They are omitted from this action list; the complete evidence remains in the \`tm.json\` workflow artefact.\n\n`;
  }
  return out;
}

/**
 * Guide citations whose URL no longer resolves.
 *
 * Only `needs_review` (404/5xx/transport) is a finding. A `blocked` verdict
 * (401/403/429) means an anti-bot WAF refused a datacenter IP, which is not
 * evidence the source is gone, and reporting it as one would train the operator
 * to ignore this section.
 */
function guideSourceFindings(guideSources) {
  return Array.isArray(guideSources?.needs_review) ? guideSources.needs_review : [];
}

function renderGuideSources(guideSources) {
  if (!guideSources) return '_No guide-source check ran._\n';
  const findings = guideSourceFindings(guideSources);
  const blocked = Array.isArray(guideSources.blocked) ? guideSources.blocked.length : 0;
  const summary = `Checked ${guideSources.checked ?? 0} cited source URL(s); ${findings.length} need review, ${blocked} blocked (not a failure).\n\n`;
  if (!findings.length) return `${summary}✅ Every cited guide source still resolves.\n`;
  const rows = findings.map((entry) => `| ${entry.url} | ${entry.detail} |`).join('\n');
  return `${summary}| Source URL | Result |\n| --- | --- |\n${rows}\n\nA cited source that no longer resolves is a content problem: update or replace the citation in the guide's \`content/guides/<slug>.md\`. The automated check never stamps a failing URL.\n`;
}

function buildBody(links, tm, guideSources) {
  const generated = new Date().toISOString();
  const linkFailing = linkFindings(links).current.length > 0;
  const currentTm = tmFindings(tm).current;
  const tmMissing = currentTm.missing.length > 0;
  const tmChanged = currentTm.changed.length > 0;
  const tmErrors = currentTm.errors.length > 0;
  const guideSourcesFailing = guideSourceFindings(guideSources).length > 0;
  const hasFindings = linkFailing || tmMissing || tmChanged || tmErrors || guideSourcesFailing;

  const status = hasFindings ? '🔴 **Current findings**' : '🟢 **No current findings**';
  let body = `<!-- daily-audit-report -->\n`;
  body += `**Last run:** \`${generated}\`\n`;
  body += `**Status:** ${status}\n\n`;
  body += `> This issue is updated automatically by [`.concat('.github/workflows/daily-audit.yml').concat('](../actions/workflows/daily-audit.yml). It closes automatically when no current finding remains; historical evidence stays in the workflow artifacts and closed issue history.\n\n');
  body += `## 1. URL liveness\n\n${renderLinks(links)}\n`;
  body += `## 2. TM Discovery diff\n\n${renderTm(tm)}\n`;
  body += `## 3. Guide source links\n\n${renderGuideSources(guideSources)}\n`;
  body += `## 4. Operator action summary\n\n${renderProviderActions(links)}\n${renderTmActions(tm)}\n`;
  body += `---\n_Generated by \`scripts/daily-audit-report.mjs\` on ${generated}._\n`;

  if (body.length > BODY_SAFETY_CEILING) {
    const notice = `\n\n> ⚠️ Report truncated to stay under GitHub's ${GITHUB_BODY_LIMIT}-character issue body limit. See the workflow run artefacts for the complete data.\n`;
    body = body.slice(0, BODY_SAFETY_CEILING - notice.length) + notice;
  }

  return { body, hasFindings };
}

function runSelfTest() {
  const links = {
    checked: 3,
    checked_at: '2026-07-30T12:00:00Z',
    failures: [
      { url: 'https://current.example', actionable: true, eventIds: ['future'] }
    ],
    expired_failures: [
      { url: 'https://historical.example', actionable: false, reviewScope: 'expired', eventIds: ['past'] }
    ],
    blocked: [],
    redirects: [],
    provider_summary: {
      ticketmaster: { checked: 3, failures: 1, expiredFailures: 1, blocked: 0, redirects: 0 }
    }
  };
  const tm = {
    checked_at: '2026-07-30T12:00:00Z',
    totals: { checked: 2, missing: 2, changed: 0, errors: 0, unresolvable: 0 },
    artists: [{
      slug: 'artist',
      missing: [
        { id: 'future', ticketmaster_event_id: 'future-id', datetime_iso: '2026-08-01', actionable: true },
        { id: 'past', ticketmaster_event_id: 'past-id', datetime_iso: '2026-07-01', actionable: false }
      ],
      changed: [],
      errors: []
    }]
  };
  const current = buildBody(links, tm);
  assert.equal(current.hasFindings, true);
  assert.match(current.body, /Current findings/);
  assert.match(current.body, /current\.example/);
  assert.doesNotMatch(current.body, /historical\.example/);
  assert.match(current.body, /`future`/);
  assert.doesNotMatch(current.body, /`past` \(/);
  assert.match(current.body, /relate exclusively to past events/);

  links.failures[0].actionable = false;
  links.failures[0].reviewScope = 'expired';
  tm.artists[0].missing[0].actionable = false;
  const historicalOnly = buildBody(links, tm);
  assert.equal(historicalOnly.hasFindings, false);
  assert.match(historicalOnly.body, /No current findings/);

  // A dead citation is a current finding and must appear in the issue body; a
  // WAF-blocked one is neither, or the section becomes noise the operator learns
  // to skip.
  const withDeadSource = buildBody(links, tm, {
    checked: 3,
    ok: ['https://ok.example'],
    blocked: [{ url: 'https://blocked.example', detail: '403' }],
    needs_review: [{ url: 'https://dead.example', detail: '404' }]
  });
  assert.equal(withDeadSource.hasFindings, true);
  assert.match(withDeadSource.body, /dead\.example/);
  assert.match(withDeadSource.body, /Guide source links/);

  const blockedOnly = buildBody(links, tm, {
    checked: 2,
    ok: ['https://ok.example'],
    blocked: [{ url: 'https://blocked.example', detail: '403' }],
    needs_review: []
  });
  assert.equal(blockedOnly.hasFindings, false);
  assert.match(blockedOnly.body, /Every cited guide source still resolves/);
  assert.doesNotMatch(blockedOnly.body, /blocked\.example/);

  // Absent report must not fabricate a finding or a clean bill of health.
  assert.match(buildBody(links, tm, null).body, /No guide-source check ran/);

  console.log('daily-audit-report self-test passed');
}

async function gh(method, path, payload) {
  const res = await fetch(`https://api.github.com${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'tourticketcompare-daily-audit'
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
  const links = await readJson(linksPath);
  const tm = await readJson(tmPath);
  const guideSources = guideSourcesPath ? await readJson(guideSourcesPath) : null;
  const { body, hasFindings } = buildBody(links, tm, guideSources);

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
    console.log('Creating new rolling issue.');
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
    console.error('daily-audit-report self-test failed:', err);
    process.exit(1);
  }
} else {
  main().catch((err) => {
    console.error('daily-audit-report failed:', err);
    process.exit(1);
  });
}
