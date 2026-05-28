#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { execFileSync, spawnSync } from 'node:child_process';

const SCORE_THRESHOLD = Number(process.env.TM_SHELL_SCORE_THRESHOLD || 70);
const ARTIFACT_DIR = process.env.TM_DISCOVERY_ARTIFACT_DIR || 'artifacts/tm-discovery';
const MAX_SHELLS_PER_RUN = 1;
const LABEL = 'automation:tm-shell';

function slugify(name) {
  return String(name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

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

  let selected = null;
  for (const c of candidates) {
    const slug = c.slug || slugify(c.artistName);
    const eventCount = Number(c.upcomingEventCount || 0);
    const score = Number(c.score || 0);
    const attractionId = String(c.attractionId || '').trim();
    const slugTaken = artists.some((a) => a.slug === slug) || (catalog.artists || []).some((a) => a.slug === slug);

    if (score < SCORE_THRESHOLD) continue;
    if (eventCount < 2) continue;
    if (!attractionId) continue;
    if (slugTaken) continue;
    if (hasParkingBlock(backlogText, c.artistName || '')) continue;
    selected = { ...c, slug };
    break;
  }

  if (!selected) fail('No valid candidate passed Phase 2 shell checks. Failing closed.');

  const today = new Date().toISOString().slice(0, 10);
  const newArtist = {
    slug: selected.slug,
    name: selected.artistName,
    short_description: '',
    indexing_status: 'review_required',
    verified_provider_count: 0,
    verified_providers: [],
    last_verified_at: null
  };

  artists.push(newArtist);
  await fs.writeFile('public/data/artists.json', `${JSON.stringify(artists, null, 2)}\n`);

  const ticketLinks = Array.isArray(catalog.ticket_links) ? catalog.ticket_links : [];
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
  catalog.ticket_links = ticketLinks;
  await fs.writeFile('public/data/catalog.json', `${JSON.stringify(catalog, null, 2)}\n`);

  const signupSource = await fs.readFile('functions/api/signup.js', 'utf8');
  if (!signupSource.includes(`"${selected.slug}"`)) {
    const updated = signupSource.replace(/const\s+ARTIST_SLUGS\s*=\s*new\s+Set\(\[([\s\S]*?)\]\);/, (m, inside) => {
      const trimmed = inside.replace(/\s*$/, '');
      return `const ARTIST_SLUGS = new Set([${trimmed}\n  "${selected.slug}"\n]);`;
    });
    if (updated === signupSource) fail('Could not update ARTIST_SLUGS in signup.js');
    await fs.writeFile('functions/api/signup.js', updated);
  }

  run('npm', ['run', 'events:sync']);
  run('npm', ['run', 'artist:check', '--', selected.slug]);
  run('npm', ['run', 'test:mvp']);
  run('git', ['diff', '--check']);

  const branch = `automation/tm-shell-${selected.slug}-${today}`;
  run('git', ['checkout', '-b', branch]);
  run('git', ['add', 'public/data/artists.json', 'public/data/catalog.json', 'functions/api/signup.js', 'public/index.html']);
  run('git', ['commit', '-m', `automation: create review_required shell for ${selected.slug}`]);
  run('git', ['push', '--set-upstream', 'origin', branch]);

  const skipSummary = Object.entries(skipLog.reduce((acc, row) => {
    const r = row?.reason || 'unknown';
    acc[r] = (acc[r] || 0) + 1;
    return acc;
  }, {})).map(([reason, count]) => `- ${reason}: ${count}`).join('\n');

  const prTitle = `Automated artist shell: ${selected.slug} — review_required`;
  const prBody = `## What this PR does\n- Adds one Ticketmaster-discovered artist shell for \`${selected.slug}\` in \`review_required\` state only.\n- Adds one non-public, unverified Ticketmaster ticket_links entry with all trust flags off.\n\n## Candidate evidence\n- Artist: **${selected.artistName}**\n- Ticketmaster attraction ID: \`${selected.attractionId}\`\n- Upcoming non-cancelled events: ${selected.upcomingEventCount}\n- Location completeness ratio: ${selected.locationCompletenessRatio}\n\n## Score breakdown\n- Total score: **${selected.score}** (threshold: ${SCORE_THRESHOLD})\n- eventScore: ${selected.scoreBreakdown?.eventScore ?? 'n/a'}\n- geographyScore: ${selected.scoreBreakdown?.geographyScore ?? 'n/a'}\n- completenessScore: ${selected.scoreBreakdown?.completenessScore ?? 'n/a'}\n\n## Skip log summary\n${skipSummary || '- (none)'}\n\n## Explicit non-changes\n- No CTAs enabled.\n- No prices added.\n- No events ingested.\n- No changes to \`functions/api/out.js\` or \`functions/api/shows.js\`.\n- No indexability promotion (artist remains \`review_required\` / noindex).\n- No auto-merge.\n\n## Human review checklist\n- [ ] Confirm slug/name formatting and safety fields in \`artists.json\`\n- [ ] Confirm \`catalog.json\` link flags are all non-public/unverified\n- [ ] Confirm \`signup.js\` slug inclusion is intentional\n- [ ] Confirm page renders with watchlist-only empty state\n\n## Next manual steps\n1. Browser-verify canonical Ticketmaster artist URL for this slug.\n2. In a separate promote PR, add VERIFIED_TICKET_LINKS entry in \`functions/api/out.js\`.\n3. Only then consider indexability promotion and CTA enablement.\n`;

  const pr = await githubApi(`/repos/${owner}/${name}/pulls`, { method: 'POST', body: { title: prTitle, head: branch, base: 'main', body: prBody, maintainer_can_modify: true } });
  await githubApi(`/repos/${owner}/${name}/issues/${pr.number}/labels`, { method: 'POST', body: { labels: [LABEL] } });

  console.log(`Created shell PR #${pr.number} for ${selected.slug}.`);
  if (MAX_SHELLS_PER_RUN !== 1) fail('MAX_SHELLS_PER_RUN misconfigured');
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
