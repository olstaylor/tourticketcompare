#!/usr/bin/env node
// Offline preview by default; --json prints structured recommendations;
// --issue updates one rolling GitHub issue. Never writes repository files.
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { splitDocument } from "./lib/content-markdown.mjs";
import { buildReport, nextHistory, parseHistory, renderIssue, STATE_MARKER } from "./lib/blog-opportunities.mjs";

export const LABEL = "automation:blog-ideas";
export const TITLE = "Weekly blog opportunities";
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export function readSource(root = ROOT) {
  const read = (file) => readFileSync(path.join(root, file), "utf8");
  const documents = [];
  for (const collection of ["blog", "guides"]) {
    const dir = `content/${collection}`;
    const files = readdirSync(path.join(root, dir)).filter((file) => file.endsWith(".md")).sort();
    if (!files.length) throw new Error(`Blog discovery: missing ${dir} inventory`);
    for (const name of files) {
      const file = `${dir}/${name}`;
      const { frontMatter: fm, body } = splitDocument(read(file));
      documents.push({ file, path: `/${collection}/${name.slice(0, -3)}`, title: fm.title,
        status: fm.status || (collection === "blog" ? "published" : "draft"),
        modified: fm.updated || fm.date || fm.date_published,
        relatedArtists: fm.related_artists || [], sources: (fm.sources || []).map((entry) => entry.url), body });
    }
  }
  return { events: JSON.parse(read("public/data/events.json")), artists: JSON.parse(read("public/data/artists.json")), catalog: JSON.parse(read("public/data/catalog.json")), documents };
}

export function githubClient(repository, token, fetchImpl = fetch) {
  if (!/^[\w.-]+\/[\w.-]+$/.test(repository || "") || !token) throw new Error("Blog ideas: GITHUB_REPOSITORY and GITHUB_TOKEN are required");
  return async (method, apiPath, body) => {
    const response = await fetchImpl(`https://api.github.com/repos/${repository}${apiPath}`, {
      method, signal: AbortSignal.timeout(30000),
      headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json", "Content-Type": "application/json", "X-GitHub-Api-Version": "2022-11-28" },
      body: body === undefined ? undefined : JSON.stringify(body)
    });
    if (!response.ok) {
      // Do not print response bodies, headers, tokens or provider URLs.
      const error = new Error(`Blog ideas: GitHub API ${method} ${apiPath} returned ${response.status}`);
      error.status = response.status;
      throw error;
    }
    return response.json();
  };
}

export async function publishIssue(source, { gh, now = Date.now(), snapshot = null }) {
  // Validate before any API mutation. Also validate again with issue history.
  buildReport(source, { now });
  const issues = [];
  for (let page = 1; ; page += 1) {
    if (page > 100) throw new Error("Blog ideas: issue pagination exceeded its safe limit");
    const rows = await gh("GET", `/issues?state=all&labels=${encodeURIComponent(LABEL)}&per_page=100&page=${page}`);
    if (!Array.isArray(rows)) throw new Error("Blog ideas: invalid GitHub issue response");
    issues.push(...rows.filter((row) => !row.pull_request));
    if (rows.length < 100) break;
  }
  // Refuse ambiguity rather than overwriting an unrelated issue or resetting
  // history. Closed rolling issues are reopened, not replaced with duplicates.
  if (issues.length > 1) throw new Error("Blog ideas: multiple labelled issues; consolidate them before rerunning");
  const issue = issues[0];
  if (issue && (!Number.isInteger(issue.number) || issue.title !== TITLE || !String(issue.body).includes(STATE_MARKER))) throw new Error("Blog ideas: labelled issue is not the managed editorial report");
  const history = issue ? parseHistory(issue.body, now) : [];
  const report = buildReport(source, { now, history });
  const body = renderIssue(report, nextHistory(history, report), snapshot);
  if (issue) {
    await gh("PATCH", `/issues/${issue.number}`, { body, ...(issue.state === "closed" ? { state: "open" } : {}) });
    return { number: issue.number, report };
  }
  // The first run bootstraps only its own label, using issues:write.
  try { await gh("GET", `/labels/${encodeURIComponent(LABEL)}`); }
  catch (error) {
    if (error.status !== 404) throw error;
    await gh("POST", "/labels", { name: LABEL, color: "0e8a16", description: "Weekly propose-only editorial recommendations" });
  }
  const created = await gh("POST", "/issues", { title: TITLE, body, labels: [LABEL] });
  if (!Number.isInteger(created?.number)) throw new Error("Blog ideas: issue creation returned no issue number; inspect GitHub before retrying");
  return { number: created.number, report };
}

async function main() {
  const args = process.argv.slice(2);
  if (args.some((arg) => !["--json", "--issue"].includes(arg)) || args.length > 1) throw new Error("Usage: propose-blog-ideas.mjs [--json | --issue]");
  const source = readSource();
  if (args.includes("--issue")) {
    const snapshot = process.env.GITHUB_SHA ? { repository: process.env.GITHUB_REPOSITORY, sha: process.env.GITHUB_SHA } : null;
    const result = await publishIssue(source, { gh: githubClient(process.env.GITHUB_REPOSITORY, process.env.GITHUB_TOKEN), snapshot });
    console.log(`Blog opportunities issue #${result.number} updated (${result.report.recommendations.length} recommendations).`);
  } else {
    const report = buildReport(source);
    console.log(args.includes("--json") ? JSON.stringify(report, null, 2) : renderIssue(report, nextHistory([], report)));
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  main().catch((error) => { console.error(error.message); process.exitCode = 1; });
}
