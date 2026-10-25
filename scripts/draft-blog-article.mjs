#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { readSource, githubClient } from './propose-blog-ideas.mjs';
import { splitDocument } from './lib/content-markdown.mjs';
import { selectArticle, selectTourGuides, buildEvidence, researchEvidence, anthropicClient, generateArticle, listEditorialPrs, reserveTopic, prBody, spentUsd,
  MAX_DRAFTS_PER_RUN, MAX_OPEN_DRAFTS, PREFIX } from './lib/blog-drafting.mjs';
import { readPriorityRows } from './lib/show-priority-store.mjs';

const ROOT = fileURLToPath(new URL('../', import.meta.url));
// A draft has no route, so the content lane covers what it can change. The
// full suite (test:mvp) runs on the PR itself via Prelaunch Validation.
export const CHECKS = ['npm run test:content', 'git diff --check'];
const run = (root, command, args) => execFileSync(command, args, { cwd: root, stdio: 'inherit' });

export async function readDraftRules(root = ROOT) {
  const content = await fs.readFile(path.join(root, 'docs/CONTENT_RULES.md'), 'utf8');
  const safe = await fs.readFile(path.join(root, 'SAFE_PUBLISHING_RULES.md'), 'utf8');
  // The sanctioned event-writer registry is irrelevant to writing an article.
  // Supply all content rules plus the binding editorial safety sections, rather
  // than spending tokens on descriptions of unrelated ingestion workflows.
  const headings = ['Data Integrity', 'Ticket CTAs', 'Price Display', 'Affiliate and Redirect Rules', 'Schema and SEO', 'Dev and Placeholder Content'];
  const sections = headings.map((heading) => {
    const section = safe.split(`## ${heading}\n`)[1];
    if (!section) throw new Error(`Publishing rule section missing: ${heading}`);
    return `## ${heading}\n${section.split('\n## ')[0]}`;
  });
  return content + '\n' + sections.join('\n');
}

export async function prepareContent(root, slug) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error('Invalid article slug');
  run(root, 'npm', ['run', 'guides:build']);
  run(root, 'npm', ['run', 'blog:build']);
  run(root, 'npm', ['run', 'content:provenance']);
  run(root, 'npm', ['run', 'guides:build']);
  const markdown = await fs.readFile(path.join(root, `content/blog/${slug}.md`), 'utf8');
  // Drafts have no route and therefore no OG asset. Generate only once an
  // editor explicitly publishes, using the existing targeted card builder.
  if (splitDocument(markdown).frontMatter.status === 'published') run(root, 'npm', ['run', 'og:build', '--', '--path', `/blog/${slug}`]);
}

export async function draftOnce({ source, issue, gh, mode, snapshot, rules, apiKey, tmKey, now = Date.now(),
  repository = 'olstaylor/tourticketcompare', compile, publish, reset = async () => {}, fetchImpl = fetch, mockClient,
  priority = new Map(), maxDrafts = MAX_DRAFTS_PER_RUN, artists = null }) {
  if (!['preview', 'mock', 'live'].includes(mode)) throw new Error('Invalid drafting mode');
  const prs = mode === 'live' ? await listEditorialPrs(gh) : [];
  const selection = artists?.length ? selectTourGuides(source, artists, { now, prs, priority }) : selectArticle(source, issue, { now, prs, priority });
  if (!selection.selected) return { mode, outcome: 'no-worthy-opportunity', ...selection };
  if (mode === 'preview') {
    const evidence = await researchEvidence(buildEvidence(selection.selected, { now, snapshot }), { apiKey: tmKey, fetchImpl, now });
    return { mode, outcome: 'selected-without-generation', ...selection, evidence };
  }
  if (mode === 'mock') {
    // One article, mocked model, no PR: proves orchestration only.
    if (!mockClient) throw new Error('Mock client required');
    const evidence = await researchEvidence(buildEvidence(selection.selected, { now, snapshot }), { apiKey: null, fetchImpl, now });
    const article = await generateArticle({ selected: selection.selected, evidence, documents: source.documents, rules, client: mockClient, now });
    const tests = await compile({ selected: selection.selected, article });
    const body = prBody({ selected: selection.selected, issueNumber: issue?.number || issue?.issue_number, repository, evidence, article, tests, mocked: true });
    return { mode, outcome: 'mocked-draft-validated-no-pr', branch: null, selected: selection.selected, rejected: selection.rejected, evidence, article, tests, body, pr: null };
  }
  // Missing credentials must not reserve a branch or make a provider call.
  anthropicClient({ apiKey, fetchImpl });
  const open = prs.filter((p) => p.state === 'open' && p.head?.ref?.startsWith(PREFIX)).length;
  const slots = Math.min(maxDrafts, MAX_OPEN_DRAFTS - open);
  if (slots <= 0) return { mode, outcome: 'open-draft-limit-reached', open, rejected: selection.rejected };
  const drafts = [];
  let paid = 0;
  for (const selected of selection.candidates) {
    if (paid >= slots) break;
    // Free checks first: a candidate whose dates fail the official recheck
    // costs nothing and does not use a slot.
    let evidence;
    try {
      evidence = await researchEvidence(buildEvidence(selected, { now, snapshot }), { apiKey: tmKey, fetchImpl, now });
    } catch (error) {
      if (!/too few dates survive/.test(error.message)) throw error;
      drafts.push({ topic: selected.topic, outcome: 'skipped-evidence', reason: error.message });
      continue;
    }
    const branch = await reserveTopic(gh, { slug: selected.slug, baseSha: snapshot });
    if (!branch) { drafts.push({ topic: selected.topic, outcome: 'skipped-branch-exists' }); continue; }
    paid += 1;
    const client = anthropicClient({ apiKey, fetchImpl });
    try {
      const article = await generateArticle({ selected, evidence, documents: source.documents, rules, client, now });
      const tests = await compile({ selected, article });
      const body = prBody({ selected, issueNumber: issue?.number || issue?.issue_number, repository, evidence, article, tests });
      // Final idempotency check before the irreversible API operation. A timeout
      // creating a PR is ambiguous; no retry, and the reserved ref prevents spend.
      const existing = await listEditorialPrs(gh);
      if (existing.some((p) => p.head?.ref === branch)) throw new Error('Editorial PR already exists; inspect reserved branch');
      const pr = await publish({ branch, selected, body });
      if (pr?.draft !== true || !pr.html_url) throw new Error('PR creation did not confirm draft status; inspect GitHub before retrying');
      drafts.push({ topic: selected.topic, outcome: 'draft-pr-created', branch, pr: pr.html_url, usage: client.usage, costUsd: spentUsd(client.usage) });
    } catch (error) {
      // Keep a machine-readable cost record even when generation/validation fails.
      drafts.push({ topic: selected.topic, outcome: 'failed-no-retry', branch, reason: error.message, usage: client.usage, costUsd: spentUsd(client.usage),
        warning: 'The reserved branch is retained. Do not delete it to retry without reviewing potential spend.' });
    } finally { await reset(); }
  }
  const created = drafts.filter((d) => d.outcome === 'draft-pr-created').length;
  return { mode, outcome: created ? 'draft-prs-created' : drafts.some((d) => d.outcome === 'failed-no-retry') ? 'drafts-failed' : 'no-draft-created',
    created, costUsd: Math.round(drafts.reduce((sum, d) => sum + (d.costUsd || 0), 0) * 100) / 100, drafts, rejected: selection.rejected };
}

async function writeArticle(root, { selected, article }) {
  await fs.writeFile(path.join(root, `content/blog/${selected.slug}.md`), article.markdown, { flag: 'wx' });
  await prepareContent(root, selected.slug);
}

async function main() {
  const args = process.argv.slice(2);
  if (args[0] === '--prepare-approved' && args.length === 2) { await prepareContent(ROOT, args[1]); return; }
  if (args.length) throw new Error('Use BLOG_DRAFT_MODE=preview|mock|live; or --prepare-approved <slug>');
  const mode = process.env.BLOG_DRAFT_MODE || 'preview';
  const issueNumber = Number(process.env.BLOG_IDEAS_ISSUE || '1538');
  if (!Number.isSafeInteger(issueNumber) || issueNumber <= 0) throw new Error('Invalid recommendations issue number');
  // Named tour guides (manual dispatch): comma-separated artist slugs, at most four.
  const artists = (process.env.BLOG_DRAFT_ARTISTS || '').split(',').map((a) => a.trim().toLowerCase().replace(/[\s_]+/g, '-')).filter(Boolean);
  if (artists.length > 4 || artists.some((a) => !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(a))) throw new Error('BLOG_DRAFT_ARTISTS must be up to four artist slugs');
  if (artists.length && mode === 'mock') throw new Error('Named artists are not supported in mock mode');
  const repository = process.env.GITHUB_REPOSITORY || 'olstaylor/tourticketcompare';
  if (repository !== 'olstaylor/tourticketcompare') throw new Error('Drafting restricted to the reviewed upstream repository');
  const now = mode === 'mock' ? Date.parse('2026-10-12T13:00:00Z') : Date.now();
  const snapshot = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: ROOT, encoding: 'utf8' }).trim();
  const source = mode === 'mock'
    ? JSON.parse(await fs.readFile(path.join(ROOT, 'scripts/fixtures/blog-source-1538.json'), 'utf8')) : readSource(ROOT);
  const rules = await readDraftRules(ROOT);
  const reportDir = path.join(process.env.RUNNER_TEMP || os.tmpdir(), 'ttc-blog-draft');
  await fs.mkdir(reportDir, { recursive: true });
  let gh, issue, mockClient;
  if (mode === 'mock') {
    // This historical issue fixture proves orchestration only. Never creates a
    // PR, spends credit or represents a real Claude response.
    if (issueNumber !== 1538) throw new Error('Mock mode supports historical issue #1538 only');
    issue = JSON.parse(await fs.readFile(path.join(ROOT, 'scripts/fixtures/blog-issue-1538.json'), 'utf8'));
    const { createMockClient } = await import('./fixtures/blog-draft-model.mjs');
    mockClient = createMockClient();
  } else {
    gh = githubClient(repository, process.env.GITHUB_TOKEN);
    issue = artists.length ? null : await gh('GET', `/issues/${issueNumber}`);
    const main = await gh('GET', '/commits/main');
    if (main.sha !== snapshot) throw new Error('Live/preview drafting must check out current trusted main');
  }
  // Show priority (expected affiliate value per show) reorders candidates.
  // Fail-open: without D1 access the editorial order stands.
  const priority = new Map();
  if (mode !== 'mock') for (const row of await readPriorityRows({ top: 25 })) {
    if (!priority.has(row.artist_slug) || row.rank < priority.get(row.artist_slug)) priority.set(row.artist_slug, row.rank);
  }
  let result;
  try {
    result = await draftOnce({ source, issue, gh, mode, snapshot, rules, now, repository, mockClient, priority, artists,
      apiKey: process.env.ANTHROPIC_API_KEY, tmKey: process.env.TICKETMASTER_API_KEY,
      // Each article starts again from the trusted snapshot.
      reset: async () => {
        run(ROOT, 'git', ['checkout', '-q', '--detach', snapshot]);
        run(ROOT, 'git', ['reset', '-q', '--hard', snapshot]);
        run(ROOT, 'git', ['clean', '-fdq', 'content/blog']);
      },
      compile: async (data) => {
        if (mode === 'mock') {
          // Work only in a disposable copy; mock content cannot reach a PR.
          const temporary = await fs.mkdtemp(path.join(os.tmpdir(), 'ttc-blog-mock-'));
          try {
            for (const dir of ['scripts', 'content', 'public', 'functions', 'data']) await fs.cp(path.join(ROOT, dir), path.join(temporary, dir), { recursive: true });
            await fs.copyFile(path.join(ROOT, 'package.json'), path.join(temporary, 'package.json'));
            await fs.symlink(path.join(ROOT, 'node_modules'), path.join(temporary, 'node_modules'));
            await writeArticle(temporary, data);
            run(temporary, 'npm', ['run', 'blog:check']);
            await fs.writeFile(path.join(reportDir, 'MOCK-article.md'), data.article.markdown);
            return ['Existing compilation + blog:check in disposable copy passed. MOCK ONLY; no model or external API calls.'];
          } finally { await fs.rm(temporary, { recursive: true, force: true }); }
        }
        await writeArticle(ROOT, data);
        for (const check of CHECKS) {
          const [command, ...commandArgs] = check.split(' ');
          run(ROOT, command, commandArgs);
        }
        run(ROOT, '.github/workflows/scripts/assert-diff-allowlist.sh', [`content/blog/${data.selected.slug}.md`,
          'public/data/blog-content.json', 'public/data/guides-content.json', 'functions/_guide-routes.generated.js',
          'data/content-provenance.json']);
        return [...CHECKS.map((check) => `${check}: passed`), 'Exact changed-file allowlist: passed'];
      },
      publish: async ({ branch, selected, body }) => {
        run(ROOT, 'git', ['checkout', '-b', branch]);
        run(ROOT, 'git', ['config', 'user.name', 'tourticketcompare-bot']);
        run(ROOT, 'git', ['config', 'user.email', 'tourticketcompare-bot@users.noreply.github.com']);
        run(ROOT, 'git', ['add', `content/blog/${selected.slug}.md`, 'public/data/blog-content.json', 'public/data/guides-content.json',
          'functions/_guide-routes.generated.js', 'data/content-provenance.json']);
        run(ROOT, 'git', ['commit', '-m', `content: editorial draft for ${selected.artistName}`]);
        run(ROOT, 'git', ['push', 'origin', `HEAD:refs/heads/${branch}`]);
        const pr = await gh('POST', '/pulls', { head: branch, base: 'main', draft: true, title: `Editorial draft: ${selected.title}`, body });
        // GITHUB_TOKEN PRs do not trigger pull_request CI. Explicitly dispatch
        // the existing validator; an App token may also trigger normal PR CI.
        await gh('POST', '/actions/workflows/prelaunch-validation.yml/dispatches', { ref: branch, inputs: { ref: branch } }).catch(() => {
          throw new Error('Draft PR created but validation dispatch failed; manually run Prelaunch Validation');
        });
        return pr;
      } });
  } catch (error) {
    await fs.writeFile(path.join(reportDir, 'report.json'), JSON.stringify(error.draftReport || { outcome: 'preflight-failed' }, null, 2));
    throw error;
  }
  await fs.writeFile(path.join(reportDir, 'report.json'), JSON.stringify(result, null, 2));
  if (result.body) await fs.writeFile(path.join(reportDir, 'editorial-review.md'), result.body);
  const lines = (result.drafts || []).map((d) => `- ${d.topic}: ${d.outcome}${d.pr ? ` ${d.pr}` : ''}${d.costUsd != null ? ` ($${d.costUsd.toFixed(2)})` : ''}${d.reason ? ` — ${d.reason}` : ''}`);
  const spend = result.drafts ? `Estimated API cost this run: $${result.costUsd.toFixed(2)}.` : result.article ? `Model usage: ${JSON.stringify(result.article.usage)}` : 'No model spend.';
  const summary = `Blog drafting: ${result.outcome}.\n${lines.join('\n')}\n${spend}\nReport: workflow artifact blog-draft-report.\n`;
  console.log(summary);
  if (process.env.GITHUB_STEP_SUMMARY) await fs.appendFile(process.env.GITHUB_STEP_SUMMARY, summary);
  // Rejections by the checks are normal; a run that spent and produced nothing is red.
  if (result.outcome === 'drafts-failed') process.exitCode = 1;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  main().catch((error) => { console.error(error.message); process.exitCode = 1; });
}
