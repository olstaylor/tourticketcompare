#!/usr/bin/env node
// Commit status `audit-window` on open PRs: PENDING while a Daily data audit run
// is executing and the PR is a thread/human branch (`claude/*`) that touches audit
// evidence; SUCCESS otherwise. Makes "do not merge data PRs mid-audit" visible
// (and enforceable once the context is a required status check) instead of
// relying on every thread remembering it. See docs/OPERATIONS.md, "Audit window".
//
// Why only `claude/*`: automated lanes already queue first-in, first-out behind
// the audit (wait-for-writer-lanes.mjs), and the audit's own stamps PR must never
// wait on a check that waits on the audit. The audit's no-rebase rule is untouched.
//
// Fails open: an unreadable run list or PR file list reports success with a note,
// so this status can never strand a merge on its own fault.
//
//   node scripts/audit-window-status.mjs [--pr N | --sweep] [--dry-run]
import { pathToFileURL } from "node:url";
import { isEvidencePath } from "./check-audit-revision.mjs";

export const CONTEXT = "audit-window";
export const GUARDED_BRANCH_PREFIX = "claude/";
const LIVE = new Set(["in_progress"]);
// An audit is capped at 110 minutes; a run "in progress" for longer is a stuck record.
const MAX_LIVE_MINUTES = 130;

export function auditInProgress(runs, now = Date.now()) {
  return runs.some((run) => LIVE.has(run.status) && now - Date.parse(run.run_started_at || run.created_at) < MAX_LIVE_MINUTES * 60000);
}

export function decide({ branch, fork = false, files, running }) {
  if (fork || !String(branch || "").startsWith(GUARDED_BRANCH_PREFIX)) return { state: "success", description: "Not a thread branch; automated lanes queue behind the audit." };
  if (!files.some(isEvidencePath)) return { state: "success", description: "Touches no audit evidence; safe to merge during an audit." };
  if (running) return { state: "pending", description: "Daily data audit running: merge after it finishes (it cancels on a data move)." };
  return { state: "success", description: "No Daily data audit running." };
}

async function selfTest() {
  const { default: assert } = await import("node:assert/strict");
  const now = Date.now(), iso = (m) => new Date(now - m * 60000).toISOString();
  assert.equal(auditInProgress([{ status: "in_progress", run_started_at: iso(10) }], now), true);
  assert.equal(auditInProgress([{ status: "queued", created_at: iso(10) }], now), false, "a queued run holds no evidence yet");
  assert.equal(auditInProgress([{ status: "in_progress", run_started_at: iso(300) }], now), false, "a stuck record never blocks");
  assert.equal(auditInProgress([], now), false);
  const data = ["public/data/events/_shards/001.json"];
  assert.equal(decide({ branch: "claude/x", files: data, running: true }).state, "pending");
  assert.equal(decide({ branch: "claude/x", files: ["content/guides/a.md"], running: true }).state, "pending");
  assert.equal(decide({ branch: "claude/x", files: data, running: false }).state, "success");
  for (const files of [["docs/OPERATIONS.md", ".github/workflows/x.yml", "scripts/a.mjs"], ["content/blog/a.md", "public/data/blog-content.json"]]) assert.equal(decide({ branch: "claude/x", files, running: true }).state, "success");
  for (const branch of ["automation/verified-dates", "main", ""]) assert.equal(decide({ branch, files: data, running: true }).state, "success", "automation PRs are never held");
  assert.equal(decide({ branch: "claude/x", fork: true, files: data, running: true }).state, "success");
  console.log("audit-window self-test passed.");
}

async function main() {
  const args = process.argv.slice(2);
  const repo = process.env.GITHUB_REPOSITORY, token = process.env.GITHUB_TOKEN;
  const dry = args.includes("--dry-run");
  const api = async (method, path, body) => {
    const res = await fetch(`https://api.github.com/repos/${repo}${path}`, { method, headers: { authorization: `Bearer ${token}`, accept: "application/vnd.github+json", "content-type": "application/json" }, body: body && JSON.stringify(body) });
    if (!res.ok) throw new Error(`${method} ${path}: HTTP ${res.status}`);
    return res.status === 204 ? null : res.json();
  };
  let running = false, runsOk = true;
  try { running = auditInProgress((await api("GET", "/actions/workflows/daily-audit.yml/runs?status=in_progress&per_page=10")).workflow_runs || []); } catch (err) { runsOk = false; console.log(`::warning::Could not read audit runs (${err.message}); reporting success.`); }
  const prNumbers = args.includes("--pr") ? [Number(args[args.indexOf("--pr") + 1])] : (await api("GET", "/pulls?state=open&per_page=100")).map((p) => p.number);
  for (const number of prNumbers) {
    try {
      const pr = await api("GET", `/pulls/${number}`);
      let files = [];
      const branchGuarded = pr.head.ref.startsWith(GUARDED_BRANCH_PREFIX);
      if (branchGuarded && runsOk && running) for (let page = 1; ; page++) {
        const batch = await api("GET", `/pulls/${number}/files?per_page=100&page=${page}`);
        files.push(...batch.flatMap((f) => [f.filename, f.previous_filename]).filter(Boolean));
        if (batch.length < 100 || page >= 30) break;
      }
      const verdict = decide({ branch: pr.head.ref, fork: pr.head.repo?.full_name !== repo, files, running: running && runsOk });
      console.log(`#${number} ${verdict.state}: ${verdict.description}`);
      if (!dry) await api("POST", `/statuses/${pr.head.sha}`, { state: verdict.state, context: CONTEXT, description: verdict.description.slice(0, 140) });
    } catch (err) { console.log(`::warning::#${number}: ${err.message}`); }
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  (process.argv.includes("--self-test") ? selfTest() : main()).catch((err) => { console.error(`::error::${err.message}`); process.exitCode = 1; });
}
