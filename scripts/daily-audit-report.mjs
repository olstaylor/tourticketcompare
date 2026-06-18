#!/usr/bin/env node
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
const repo = arg('--repo') || process.env.GITHUB_REPOSITORY;
const token = process.env.GITHUB_TOKEN;
const dryRun = argv.includes('--dry-run');

if (!repo) {
  console.error('ERROR: --repo or GITHUB_REPOSITORY required.');
  process.exit(2);
}
if (!token && !dryRun) {
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

function renderLinks(links) {
  if (!links) return '_Link audit did not run._\n';
  const { checked, failures = [], redirects = [], blocked = [], checked_at } = links;
  let out = `Checked ${checked} URL(s) at ${formatTimestamp(checked_at)}.\n\n`;
  if (failures.length === 0) {
    out += '✅ No failing URLs.\n';
  } else {
    out += `❌ ${failures.length} failing URL(s):\n\n`;
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

function renderTm(tm) {
  if (!tm) return '_TM Discovery diff did not run._\n';
  const { totals = {}, artists = [], checked_at } = tm;
  let out = `Checked ${totals.checked || 0} TM event ID(s) at ${formatTimestamp(checked_at)}.\n\n`;
  out += `- ❌ Missing on TM (404/410): **${totals.missing || 0}**\n`;
  out += `- ⚠️ Changed (date/venue/status): **${totals.changed || 0}**\n`;
  out += `- 🔁 Transient errors: **${totals.errors || 0}**\n`;
  out += `- ⏭️ Unresolvable id (website/international code — not checked, **not** a failure): **${totals.unresolvable || 0}**\n\n`;
  for (const artist of artists) {
    if (!artist.missing.length && !artist.changed.length && !artist.errors.length) continue;
    out += `### ${artist.slug}\n\n`;
    if (artist.missing.length) {
      out += `**Missing events (TM returned 404/410):**\n`;
      for (const m of artist.missing) {
        out += `- \`${m.id}\` (${m.city || '—'}, ${m.datetime_iso || '—'}) — TM ID \`${m.ticketmaster_event_id}\`\n`;
      }
      out += '\n';
    }
    if (artist.changed.length) {
      out += `**Changed events (local vs TM):**\n`;
      for (const c of artist.changed) {
        const diffSummary = c.diffs.map((d) => `\`${d.field}\`: \`${d.local}\` → \`${d.remote}\``).join('; ');
        out += `- \`${c.id}\` — ${diffSummary}\n`;
      }
      out += '\n';
    }
    if (artist.errors.length) {
      out += `**Transient errors (likely retry next run):** ${artist.errors.length}\n\n`;
    }
  }
  return out;
}

function buildBody(links, tm) {
  const generated = new Date().toISOString();
  const linkFailing = (links?.failures?.length || 0) > 0;
  const tmMissing = (tm?.totals?.missing || 0) > 0;
  const tmChanged = (tm?.totals?.changed || 0) > 0;
  const hasFindings = linkFailing || tmMissing || tmChanged;

  const status = hasFindings ? '🔴 **Findings**' : '🟢 **All clean**';
  let body = `<!-- daily-audit-report -->\n`;
  body += `**Last run:** \`${generated}\`\n`;
  body += `**Status:** ${status}\n\n`;
  body += `> This issue is updated automatically by [`.concat('.github/workflows/daily-audit.yml').concat('](../actions/workflows/daily-audit.yml). Close it manually only when you want a fresh issue next run.\n\n');
  body += `## 1. URL liveness\n\n${renderLinks(links)}\n`;
  body += `## 2. TM Discovery diff\n\n${renderTm(tm)}\n`;
  body += `---\n_Generated by \`scripts/daily-audit-report.mjs\` on ${generated}._\n`;

  if (body.length > BODY_SAFETY_CEILING) {
    const notice = `\n\n> ⚠️ Report truncated to stay under GitHub's ${GITHUB_BODY_LIMIT}-character issue body limit. See the workflow run artefacts for the complete data.\n`;
    body = body.slice(0, BODY_SAFETY_CEILING - notice.length) + notice;
  }

  return { body, hasFindings };
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
  const { body, hasFindings } = buildBody(links, tm);

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

main().catch((err) => {
  console.error('daily-audit-report failed:', err);
  process.exit(1);
});
