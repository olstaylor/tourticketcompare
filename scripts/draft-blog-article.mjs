#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { readSource, githubClient } from './propose-blog-ideas.mjs';
import { splitDocument } from './lib/content-markdown.mjs';
import { selectArticle, buildEvidence, researchEvidence, anthropicClient, generateArticle, listEditorialPrs, reserveWeek, prBody } from './lib/blog-drafting.mjs';

const ROOT = fileURLToPath(new URL('../', import.meta.url));
// test:mvp already includes the full indexable-surface audit. Do not repeat its
// expensive route crawl on unchanged inputs in this cost-controlled PR stage.
export const CHECKS = ['npm run blog:check', 'npm run test:mvp', 'npm run schema:validate', 'git diff --check'];
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
  repository = 'olstaylor/tourticketcompare', compile, publish, fetchImpl = fetch, mockClient }) {
  if (!['preview', 'mock', 'live'].includes(mode)) throw new Error('Invalid drafting mode');
  const prs = mode === 'live' ? await listEditorialPrs(gh) : [];
  const selection = selectArticle(source, issue, { now, prs });
  if (!selection.selected) return { mode, outcome: 'no-worthy-opportunity', ...selection };
  if (mode === 'preview') {
    const evidence = await researchEvidence(buildEvidence(selection.selected, { now, snapshot }), { apiKey: tmKey, fetchImpl, now });
    return { mode, outcome: 'selected-without-generation', ...selection, evidence };
  }
  // Missing credentials must not consume the slot or make a provider call.
  const client = mode === 'live' ? anthropicClient({ apiKey, fetchImpl }) : mockClient;
  if (!client) throw new Error('Mock client required');
  const branch = mode === 'live' ? await reserveWeek(gh, { now, baseSha: snapshot, prs }) : null;
  if (mode === 'live' && !branch) return { mode, outcome: 'weekly-slot-or-open-pr-already-exists' };
  let evidence;
  try {
    evidence = buildEvidence(selection.selected, { now, snapshot });
    evidence = await researchEvidence(evidence, { apiKey: mode === 'live' ? tmKey : null, fetchImpl, now });
    const article = await generateArticle({ selected: selection.selected, evidence, documents: source.documents, rules, client, now });
    const tests = await compile({ selected: selection.selected, article });
    const body = prBody({ selected: selection.selected, issueNumber: issue.number || issue.issue_number, repository, evidence, article, tests, mocked: mode === 'mock' });
    // Final idempotency check before the irreversible API operation. A timeout
    // creating a PR is ambiguous; no retry, and the weekly ref prevents spend.
    let pr = null;
    if (mode === 'live') {
      const existing = await listEditorialPrs(gh);
      if (existing.some((p) => p.head?.ref === branch || p.state === 'open')) throw new Error('Editorial PR already exists; inspect reserved branch');
      pr = await publish({ branch, selected: selection.selected, body });
      if (pr?.draft !== true || !pr.html_url) throw new Error('PR creation did not confirm draft status; inspect GitHub before retrying');
    }
    return { mode, outcome: mode === 'mock' ? 'mocked-draft-validated-no-pr' : 'draft-pr-created', branch,
      selected: selection.selected, rejected: selection.rejected, evidence, article, tests, body, pr };
  } catch (error) {
    // Keep a machine-readable cost record even when generation/validation fails.
    error.draftReport = { mode, outcome: 'failed-no-retry', branch, usage: client.usage, evidence,
      warning: 'A reserved live weekly branch is retained. Do not delete it to retry without reviewing potential spend.' };
    throw error;
  }
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
    issue = await gh('GET', `/issues/${issueNumber}`);
    const main = await gh('GET', '/commits/main');
    if (main.sha !== snapshot) throw new Error('Live/preview drafting must check out current trusted main');
  }
  let result;
  try {
    result = await draftOnce({ source, issue, gh, mode, snapshot, rules, now, repository, mockClient,
      apiKey: process.env.ANTHROPIC_API_KEY, tmKey: process.env.TICKETMASTER_API_KEY,
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
  const summary = `Blog drafting: ${result.outcome}. ${result.pr?.html_url || ''}\n${result.article ? `Model usage: ${JSON.stringify(result.article.usage)}` : 'No model spend.'}\nReport: workflow artifact blog-draft-report.\n`;
  console.log(summary);
  if (process.env.GITHUB_STEP_SUMMARY) await fs.appendFile(process.env.GITHUB_STEP_SUMMARY, summary);
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  main().catch((error) => { console.error(error.message); process.exitCode = 1; });
}
