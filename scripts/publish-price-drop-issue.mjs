#!/usr/bin/env node
// Daily price-drop drafts to a rolling GitHub issue, for the owner to post by hand.
//
//   node scripts/publish-price-drop-issue.mjs [--self-test]
//
// Runs scripts/report-price-drops.mjs against production D1 (read-only) and posts
// the new drafts as one comment on the open `automation:price-drops` issue,
// creating the issue on first use. The issue body carries the keys of every
// drop already offered (a hidden marker, newest 400), so a drop that persists
// for days is drafted once. Nothing is posted when there are no new drafts, and
// nothing is written to the repository, D1 or any social account.
//
// The comment goes first and the marker second: if the second write fails the
// worst case is a drop offered again tomorrow, never a drop lost.
//
// Env: GITHUB_TOKEN (issues: write), GITHUB_REPOSITORY, CLOUDFLARE_API_TOKEN and
// CLOUDFLARE_ACCOUNT_ID for the D1 read.

import { execFileSync } from "node:child_process";
import { mkdtempSync, readFileSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";

const LABEL = "automation:price-drops";
const TITLE = "Price-drop post drafts";
const KEEP_KEYS = 400;
const MAX_COMMENT = 60000;
const MARKER = /<!-- price-drop-seen: (\[[^\]]*\]) -->/;
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export function parseSeen(body) {
  const match = MARKER.exec(body || "");
  if (!match) return [];
  try {
    const keys = JSON.parse(match[1]);
    return Array.isArray(keys) ? keys.filter((key) => typeof key === "string") : [];
  } catch {
    return [];
  }
}

export function buildBody(seen) {
  return [
    "Ready-to-post price-drop drafts from the daily price rollup (`npm run report:price-drops`, rules in docs/OPERATIONS.md, \"Price-drop post drafts\").",
    "A new comment appears only when there is a new drop. Nothing is posted anywhere for you: copy a draft, check it, post it by hand.",
    "",
    `<!-- price-drop-seen: ${JSON.stringify(seen.slice(-KEEP_KEYS))} -->`
  ].join("\n");
}

export function clipComment(text) {
  return text.length <= MAX_COMMENT ? text : `${text.slice(0, MAX_COMMENT)}\n\n_(clipped: more drafts than fit in one comment)_`;
}

function selfTest() {
  assert.deepEqual(parseSeen(""), []);
  assert.deepEqual(parseSeen("no marker"), []);
  assert.deepEqual(parseSeen("<!-- price-drop-seen: [1,2] -->"), [], "non-string keys are dropped");
  const keys = Array.from({ length: 450 }, (_, i) => `k${i}`);
  const body = buildBody(keys);
  assert.equal(parseSeen(body).length, KEEP_KEYS);
  assert.equal(parseSeen(body).at(-1), "k449");
  assert.equal(parseSeen(body)[0], "k50");
  assert.deepEqual(parseSeen("<!-- price-drop-seen: [not json] -->"), []);
  assert(clipComment("x".repeat(70000)).length < 65536);
  console.log("publish-price-drop-issue self-test passed");
}

async function main() {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPOSITORY;
  if (!token || !repo) throw new Error("GITHUB_TOKEN and GITHUB_REPOSITORY are required");
  const gh = async (method, endpoint, payload) => {
    const res = await fetch(`https://api.github.com/repos/${repo}${endpoint}`, {
      method,
      headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28", "User-Agent": "tourticketcompare-price-drops" },
      body: payload ? JSON.stringify(payload) : undefined
    });
    if (!res.ok) throw new Error(`GitHub ${method} ${endpoint} failed: ${res.status}`);
    return res.json();
  };

  const open = await gh("GET", `/issues?state=open&labels=${encodeURIComponent(LABEL)}`);
  const issue = open[0] || null;
  const before = parseSeen(issue?.body);

  const dir = mkdtempSync(path.join(os.tmpdir(), "price-drops-"));
  const seenFile = path.join(dir, "seen.json");
  const draftsFile = path.join(dir, "drafts.md");
  writeFileSync(seenFile, `${JSON.stringify(before)}\n`);
  execFileSync(process.execPath, ["scripts/report-price-drops.mjs", "--out", draftsFile, "--seen", seenFile], { cwd: ROOT, stdio: "inherit", timeout: 300000 });

  const after = JSON.parse(readFileSync(seenFile, "utf8"));
  const added = after.filter((key) => !before.includes(key));
  if (!added.length) {
    console.log("No new price drops; nothing posted.");
    if (!issue) await gh("POST", "/issues", { title: TITLE, body: buildBody(after), labels: [LABEL] });
    return;
  }

  const target = issue || (await gh("POST", "/issues", { title: TITLE, body: buildBody(before), labels: [LABEL] }));
  await gh("POST", `/issues/${target.number}/comments`, { body: clipComment(readFileSync(draftsFile, "utf8")) });
  await gh("PATCH", `/issues/${target.number}`, { body: buildBody(after) });
  console.log(`Posted ${added.length} new price-drop draft(s) to issue #${target.number}.`);
}

if (process.argv.includes("--self-test")) selfTest();
else if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  main().catch((error) => {
    console.error(error?.message || error);
    process.exit(1);
  });
}
