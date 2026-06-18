#!/usr/bin/env node
//
// report-tm-discovery-coverage.mjs
//
// Heartbeat reporter for the Ticketmaster new-shows discovery loop
// (.github/workflows/tm-new-shows-pr.yml). It consumes the coverage.json
// emitted by scripts/sync-tm-events-write-pr.mjs and maintains a single rolling
// GitHub issue (label `automation:tm-discovery`) so that EVERY run leaves a
// positive trace — confirming which indexed artists were checked, how many new
// shows were proposed, and crucially flagging any indexed artist that was
// skipped or never checked at all. A quiet day (no new shows, no PR) still
// updates the issue, so "silence" can never hide a broken or partial run.
//
// It posts no data and opens no PR; it only reports. Mirrors the rolling-issue
// pattern in scripts/daily-audit-report.mjs.
//
// Usage:
//   node scripts/report-tm-discovery-coverage.mjs --coverage <coverage.json> --repo owner/name
//   node scripts/report-tm-discovery-coverage.mjs --coverage <path> --dry-run
//   node scripts/report-tm-discovery-coverage.mjs --self-test
//
// Environment: GITHUB_TOKEN (unless --dry-run/--self-test), GITHUB_REPOSITORY.

import fs from "node:fs/promises";

const LABEL = "automation:tm-discovery";
const TITLE = "TM new-shows discovery — coverage";

const argv = process.argv.slice(2);
function arg(name) {
  const i = argv.indexOf(name);
  return i >= 0 ? argv[i + 1] : null;
}
const coveragePath = arg("--coverage");
const artistsPath = arg("--artists") || new URL("../public/data/artists.json", import.meta.url);
const repo = arg("--repo") || process.env.GITHUB_REPOSITORY;
const token = process.env.GITHUB_TOKEN;
const dryRun = argv.includes("--dry-run");
const selfTest = argv.includes("--self-test");

const clean = (v) => String(v ?? "").trim();

async function readJson(path) {
  if (!path) return null;
  try {
    const raw = await fs.readFile(path, "utf8");
    return raw.trim() ? JSON.parse(raw) : null;
  } catch (err) {
    if (err?.code === "ENOENT") return null;
    throw err;
  }
}

// ─── Pure body builder (covered by --self-test) ─────────────────────────────

// Returns { body, hasProblem }. `indexedSlugs` is the authoritative roster the
// loop is expected to cover; any indexed artist missing from coverage, or
// present but skipped, is a problem the heartbeat must surface.
function buildBody(coverage, indexedSlugs) {
  const generated = new Date().toISOString();
  if (!coverage) {
    const body =
      `<!-- tm-discovery-coverage -->\n` +
      `**Last run:** \`${generated}\`\n` +
      `**Status:** 🔴 **No coverage produced**\n\n` +
      `> The new-shows discovery run did not emit a \`coverage.json\`. The job likely failed before completing — check the latest [Ticketmaster new shows PR run](../actions/workflows/tm-new-shows-pr.yml). This issue is maintained automatically by \`scripts/report-tm-discovery-coverage.mjs\`.\n`;
    return { body, hasProblem: true };
  }

  const bySlug = new Map((coverage.artists || []).map((a) => [a.slug, a]));
  const uncovered = indexedSlugs.filter((s) => !bySlug.has(s));
  const skipped = (coverage.artists || []).filter((a) => a.status === "skipped");
  const proposed = (coverage.artists || []).filter((a) => a.status === "proposed");
  const noNew = (coverage.artists || []).filter((a) => a.status === "no-new");
  const hasProblem = uncovered.length > 0 || skipped.length > 0;

  const t = coverage.totals || {};
  const status = hasProblem
    ? `🔴 **${uncovered.length + skipped.length} artist(s) not covered**`
    : `🟢 **All ${indexedSlugs.length} indexed artists checked**`;

  let body = `<!-- tm-discovery-coverage -->\n`;
  body += `**Last run:** \`${coverage.generated_at || generated}\` (mode: \`${coverage.mode || "?"}\`)\n`;
  body += `**Status:** ${status}\n\n`;
  body += `> Maintained automatically by [\`scripts/report-tm-discovery-coverage.mjs\`](../actions/workflows/tm-new-shows-pr.yml) after every new-shows run. A quiet day still updates this issue. Close it only to force a fresh one.\n\n`;

  if (coverage.pr) {
    body += `**Proposed-events PR:** [#${coverage.pr.number}](${coverage.pr.url})\n\n`;
  } else if ((t.proposed_events || 0) > 0) {
    body += `**Proposed events:** ${t.proposed_events} (see the open \`automation:tm-events\` PR)\n\n`;
  }

  body += `- ✅ Checked with new shows: **${proposed.length}**\n`;
  body += `- 🟰 Checked, no new shows: **${noNew.length}**\n`;
  body += `- ⛔ Skipped (not checked): **${skipped.length}**\n`;
  body += `- ❓ Indexed but absent from run: **${uncovered.length}**\n`;
  body += `- 📦 New events proposed: **${t.proposed_events || 0}** · withheld for review: **${t.withheld_events || 0}**\n\n`;

  if (uncovered.length) {
    body += `### ❓ Indexed artists not in this run\n\nThese are live on the site but the discovery loop did not attempt them — check their \`data/provider-identities.json\` entry (\`review_status: verified\`, \`sync_enabled: true\`).\n`;
    for (const s of uncovered) body += `- \`${s}\`\n`;
    body += `\n`;
  }
  if (skipped.length) {
    body += `### ⛔ Skipped artists\n\n`;
    for (const a of skipped) body += `- \`${a.slug}\` — ${a.reason || "skipped"}\n`;
    body += `\n`;
  }
  if (proposed.length) {
    body += `### ✅ New shows proposed\n\n`;
    for (const a of proposed) body += `- \`${a.slug}\` — ${a.proposed} new${a.withheld ? `, ${a.withheld} withheld` : ""}\n`;
    body += `\n`;
  }

  body += `---\n_Generated by \`scripts/report-tm-discovery-coverage.mjs\` on ${generated}._\n`;
  return { body, hasProblem };
}

// ─── GitHub I/O ─────────────────────────────────────────────────────────────

async function gh(method, path, payload) {
  const res = await fetch(`https://api.github.com${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
      "User-Agent": "tourticketcompare-tm-discovery-coverage",
    },
    body: payload ? JSON.stringify(payload) : undefined,
  });
  if (!res.ok) throw new Error(`GitHub API ${method} ${path} ${res.status}: ${await res.text()}`);
  return res.status === 204 ? null : res.json();
}

async function findRollingIssue() {
  const issues = await gh("GET", `/repos/${repo}/issues?state=open&labels=${encodeURIComponent(LABEL)}&per_page=10`);
  return issues.find((i) => !i.pull_request) || null;
}

// ─── Self-test ──────────────────────────────────────────────────────────────

function runSelfTest() {
  const checks = [];
  const assert = (label, pass) => checks.push({ label, pass: !!pass });
  const roster = ["a", "b", "c"];

  const clean = buildBody(
    { generated_at: "t", mode: "write-pr", totals: { proposed_events: 2, withheld_events: 0 }, artists: [
      { slug: "a", status: "proposed", proposed: 2, withheld: 0 },
      { slug: "b", status: "no-new", proposed: 0, withheld: 0 },
      { slug: "c", status: "no-new", proposed: 0, withheld: 0 },
    ], pr: { number: 7, url: "http://x/7" } },
    roster
  );
  assert("all-covered run is not a problem", clean.hasProblem === false);
  assert("all-covered status is green", clean.body.includes("All 3 indexed artists checked"));
  assert("links the proposed PR", clean.body.includes("#7"));

  const skip = buildBody(
    { generated_at: "t", mode: "write-pr", totals: {}, artists: [
      { slug: "a", status: "no-new", proposed: 0, withheld: 0 },
      { slug: "b", status: "skipped", proposed: 0, withheld: 0, reason: "live lookup failed" },
    ], pr: null },
    roster
  );
  assert("a skipped artist is a problem", skip.hasProblem === true);
  assert("an indexed artist absent from the run is flagged (c)", skip.body.includes("`c`") && skip.body.includes("not in this run"));
  assert("skip reason is shown", skip.body.includes("live lookup failed"));

  const none = buildBody(null, roster);
  assert("missing coverage is a problem", none.hasProblem === true && none.body.includes("No coverage produced"));

  let failed = 0;
  for (const c of checks) {
    if (!c.pass) failed += 1;
    console.log(`${c.pass ? "PASS" : "FAIL"}  ${c.label}`);
  }
  console.log(`\n${checks.length - failed}/${checks.length} checks passed.`);
  return failed === 0 ? 0 : 1;
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  if (selfTest) return runSelfTest();
  if (!repo) {
    console.error("ERROR: --repo or GITHUB_REPOSITORY required.");
    return 2;
  }

  const coverage = await readJson(coveragePath);
  const artists = (await readJson(artistsPath)) || [];
  const indexedSlugs = artists
    .filter((a) => a.indexing_status === "indexable_with_substantial_content")
    .map((a) => clean(a.slug))
    .sort();

  const { body, hasProblem } = buildBody(coverage, indexedSlugs);

  if (dryRun) {
    console.log(body);
    console.log(`\nhasProblem=${hasProblem}`);
    return 0;
  }
  if (!token) {
    console.error("ERROR: GITHUB_TOKEN required (or use --dry-run).");
    return 2;
  }

  const existing = await findRollingIssue();
  if (existing) {
    console.log(`Updating issue #${existing.number}.`);
    await gh("PATCH", `/repos/${repo}/issues/${existing.number}`, { body });
  } else {
    // Always create the heartbeat issue, even on an all-clean first run, so
    // there is a persistent positive signal that the loop is covering everyone.
    console.log("Creating rolling coverage issue.");
    await gh("POST", `/repos/${repo}/issues`, { title: TITLE, body, labels: [LABEL] });
  }
  return 0;
}

main()
  .then((code) => process.exit(code ?? 0))
  .catch((err) => {
    console.error("report-tm-discovery-coverage failed:", err);
    process.exit(1);
  });
