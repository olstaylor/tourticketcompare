#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';
import { slugify } from './lib/slugify.mjs';

const SCORE_THRESHOLD = Number(process.env.TM_SHELL_SCORE_THRESHOLD || 70);
const ARTIFACT_DIR = process.env.TM_DISCOVERY_ARTIFACT_DIR || 'artifacts/tm-discovery';
// Shells are review_required + noindex with no CTAs, so batching is low risk.
// Promote PRs remain strictly one artist each.
const MAX_SHELLS_PER_RUN = Math.max(1, Number(process.env.TM_SHELL_MAX_PER_RUN || 3));
const LABEL = 'automation:tm-shell';

async function readJson(file) { return JSON.parse(await fs.readFile(file, 'utf8')); }

function fail(msg) { throw new Error(msg); }

function run(cmd, args) {
  const out = spawnSync(cmd, args, { stdio: 'inherit' });
  if (out.status !== 0) throw new Error(`Command failed: ${cmd} ${args.join(' ')}`);
}

function getRepoInfo() {
  const repo = process.env.GITHUB_REPOSITORY;
  if (!repo || !repo.includes('/')) fail('Missing GITHUB_REPOSITORY');
  const [owner, name] = repo.split('/');
  return { owner, name };
}

async function githubApi(pathname, { method = 'GET', body } = {}) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) fail('Missing GITHUB_TOKEN');
  const res = await fetch(`https://api.github.com${pathname}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28'
    },
    body: body ? JSON.stringify(body) : undefined
  });
  if (!res.ok) {
    const text = await res.text();
    fail(`GitHub API ${method} ${pathname} failed: ${res.status} ${text.slice(0, 400)}`);
  }
  return res.status === 204 ? null : res.json();
}

function hasParkingBlock(backlogText, artistName) {
  const n = artistName.toLowerCase();
  return backlogText.split(/\r?\n/).some((line) => /parked|blocked|do not onboard/i.test(line) && line.toLowerCase().includes(n));
}

async function main() {
  const candidates = await readJson(path.join(ARTIFACT_DIR, 'candidates.json'));
  const skipLog = await readJson(path.join(ARTIFACT_DIR, 'skip-log.json'));
  const artists = await readJson('public/data/artists.json');
  const catalog = await readJson('public/data/catalog.json');
  const backlogText = await fs.readFile('BACKLOG.md', 'utf8');

  if (!Array.isArray(candidates) || candidates.length === 0) fail('No candidates found. Failing closed.');

  const { owner, name } = getRepoInfo();
  const openPrs = await githubApi(`/repos/${owner}/${name}/pulls?state=open&per_page=100`);
  const existingShellPr = openPrs.find((pr) => Array.isArray(pr.labels) && pr.labels.some((l) => l.name === LABEL));
  if (existingShellPr) {
    console.log(`Open ${LABEL} PR already exists (#${existingShellPr.number}); no new shell PR created.`);
    return;
  }

  const selectedList = [];
  const batchSlugs = new Set();
  for (const c of candidates) {
    if (selectedList.length >= MAX_SHELLS_PER_RUN) break;
    const slug = c.slug || slugify(c.artistName);
    const eventCount = Number(c.upcomingEventCount || 0);
    const score = Number(c.score || 0);
    const attractionId = String(c.attractionId || '').trim();
    const slugTaken = artists.some((a) => a.slug === slug) || (catalog.artists || []).some((a) => a.slug === slug);

    if (score < SCORE_THRESHOLD) continue;
    if (eventCount < 2) continue;
    if (!attractionId) continue;
    if (slugTaken) continue;
    if (batchSlugs.has(slug)) continue;
    if (hasParkingBlock(backlogText, c.artistName || '')) continue;
    batchSlugs.add(slug);
    selectedList.push({ ...c, slug });
  }

  if (selectedList.length === 0) fail('No valid candidate passed Phase 2 shell checks. Failing closed.');

  const today = new Date().toISOString().slice(0, 10);
  const ticketLinks = Array.isArray(catalog.ticket_links) ? catalog.ticket_links : [];

  for (const selected of selectedList) {
    artists.push({
      slug: selected.slug,
      name: selected.artistName,
      short_description: '',
      indexing_status: 'review_required',
      verified_provider_count: 0,
      verified_providers: [],
      last_verified_at: null
    });

    ticketLinks.push({
      link_id: `tm-artist-${selected.slug}`,
      artist_slug: selected.slug,
      tour_slug: null,
      provider: 'ticketmaster',
      destination_type: 'artist_page',
      affiliate_enabled: false,
      verified: false,
      public_enabled: false,
      market: 'global',
      last_checked_at: today,
      disclosure_required: true,
      ticketmaster_attraction_id: String(selected.attractionId)
    });
  }

  await fs.writeFile('public/data/artists.json', `${JSON.stringify(artists, null, 2)}\n`);
  catalog.ticket_links = ticketLinks;
  await fs.writeFile('public/data/catalog.json', `${JSON.stringify(catalog, null, 2)}\n`);

  // signup.js needs no edit: its allowlist is derived from artists.json at runtime.

  run('npm', ['run', 'events:sync']);
  for (const selected of selectedList) {
    run('npm', ['run', 'artist:check', '--', selected.slug]);
  }
  run('npm', ['run', 'test:mvp']);
  run('git', ['diff', '--check']);

  const slugs = selectedList.map((s) => s.slug);
  const slugLabel = slugs.length === 1 ? slugs[0] : `batch-${slugs.length}`;
  const branch = `automation/tm-shell-${slugLabel}-${today}`;
  run('git', ['checkout', '-b', branch]);
  run('git', ['add', 'public/data/artists.json', 'public/data/catalog.json', 'public/index.html']);
  run('git', ['commit', '-m', `automation: create review_required shell${slugs.length === 1 ? '' : 's'} for ${slugs.join(', ')}`]);
  run('git', ['push', '--set-upstream', 'origin', branch]);

  const skipSummary = Object.entries(skipLog.reduce((acc, row) => {
    const r = row?.reason || 'unknown';
    acc[r] = (acc[r] || 0) + 1;
    return acc;
  }, {})).map(([reason, count]) => `- ${reason}: ${count}`).join('\n');

  const candidateSections = selectedList.map((selected) => `### \`${selected.slug}\`\n- Artist: **${selected.artistName}**\n- Ticketmaster attraction ID: \`${selected.attractionId}\`\n- Upcoming non-cancelled events: ${selected.upcomingEventCount}\n- Location completeness ratio: ${selected.locationCompletenessRatio}\n- Total score: **${selected.score}** (threshold: ${SCORE_THRESHOLD})\n  - eventScore: ${selected.scoreBreakdown?.eventScore ?? 'n/a'}\n  - geographyScore: ${selected.scoreBreakdown?.geographyScore ?? 'n/a'}\n  - completenessScore: ${selected.scoreBreakdown?.completenessScore ?? 'n/a'}`).join('\n\n');

  const reviewChecklist = selectedList.map((selected) => `- [ ] \`${selected.slug}\`: slug/name formatting and safety fields in \`artists.json\`\n- [ ] \`${selected.slug}\`: \`catalog.json\` link flags are all non-public/unverified\n- [ ] \`${selected.slug}\`: page renders with watchlist-only empty state`).join('\n');

  const prTitle = slugs.length === 1
    ? `Automated artist shell: ${slugs[0]} — review_required`
    : `Automated artist shells (${slugs.length}): ${slugs.join(', ')} — review_required`;
  const prBody = `## What this PR does\n- Adds ${slugs.length} Ticketmaster-discovered artist shell${slugs.length === 1 ? '' : 's'} (\`${slugs.join('`, `')}\`) in \`review_required\` state only.\n- Adds matching non-public, unverified Ticketmaster ticket_links entries with all trust flags off.\n\n## Candidate evidence\n${candidateSections}\n\n## Skip log summary\n${skipSummary || '- (none)'}\n\n## Explicit non-changes\n- No CTAs enabled.\n- No prices added.\n- No events ingested.\n- No changes to \`functions/api/out.js\` or \`functions/api/shows.js\`.\n- No \`functions/api/signup.js\` edit (signup allowlist is derived from \`artists.json\` at runtime).\n- No indexability promotion (artists remain \`review_required\` / noindex).\n- No auto-merge.\n\n## Human review checklist\n${reviewChecklist}\n\n## Next manual steps (per artist)\n1. Browser-verify the canonical Ticketmaster artist URL.\n2. In a separate promote PR (strictly one artist each), add the VERIFIED_TICKET_LINKS entry via \`npm run artist:promote\`.\n3. Only then consider indexability promotion and CTA enablement.\n`;

  const pr = await githubApi(`/repos/${owner}/${name}/pulls`, { method: 'POST', body: { title: prTitle, head: branch, base: 'main', body: prBody, maintainer_can_modify: true } });
  await githubApi(`/repos/${owner}/${name}/issues/${pr.number}/labels`, { method: 'POST', body: { labels: [LABEL] } });

  console.log(`Created shell PR #${pr.number} for ${slugs.join(', ')}.`);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
