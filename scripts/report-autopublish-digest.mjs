#!/usr/bin/env node
// Daily auto-publish digest: every PR merged in the last 24h under the
// `autopublish` ledger label, each with its undo command, written to the rolling
// `automation:autopublish-digest` issue. Read-only over the repository.
//
//   node scripts/report-autopublish-digest.mjs             # update the issue
//   node scripts/report-autopublish-digest.mjs --dry-run   # print only
//   node scripts/report-autopublish-digest.mjs --self-test

import {
  LEDGER_LABEL,
  HELD_LABEL,
  GLOBAL_SWITCH,
  CLASS_SWITCHES,
  readRepoVariable,
} from "./lib/autopublish-guard.mjs";

export const DIGEST_LABEL = "automation:autopublish-digest";
// Daily writers expected to publish most days. A lane absent from the last 24h
// is listed as "wrote nothing" — information, not an alarm: a quiet data day
// is legitimate, and automation-health owns failed or stalled runs.
export const EXPECTED_DAILY_LANES = [
  "automation:tm-events",
  "automation:data-sync",
  "automation:seatgeek-cta",
  "automation:vividseats-cta",
  "automation:provider-sync",
  "automation:verified-dates",
  "automation:status-figures",
];

// Auto-promote is expected only while both switches let it publish, so a
// disabled lane never shows up as a perpetual "wrote nothing".
export function expectedLanes(switches = {}) {
  const on = (v) => String(v ?? "").trim().toLowerCase();
  const promoting = on(switches.AUTOPROMOTE_ENABLED) === "true" && on(switches.AUTOPUBLISH_ENABLED) !== "false";
  return promoting ? [...EXPECTED_DAILY_LANES, "automation:autopromote"] : EXPECTED_DAILY_LANES;
}

const laneOf = (pr) => (pr.labels || []).map((l) => l.name).find((n) => n.startsWith("automation:")) || "(no lane label)";

/** Pure: build the issue body. */
export function renderDigest({ now, merged, held, switches }) {
  const lines = [`Auto-publish digest — ${now.toISOString().slice(0, 16)}Z (last 24h)`, ""];
  lines.push("**Switches:** " + Object.entries(switches).map(([k, v]) => `\`${k}\`=${v}`).join(" · "), "");

  lines.push(`### Published (${merged.length})`);
  if (!merged.length) lines.push("Nothing auto-merged in the last 24h.");
  const byLane = new Map();
  for (const pr of merged) byLane.set(laneOf(pr), [...(byLane.get(laneOf(pr)) || []), pr]);
  for (const [lane, prs] of [...byLane].sort(([a], [b]) => a.localeCompare(b))) {
    lines.push("", `**${lane}**`);
    for (const pr of prs) {
      const sha = String(pr.merge_commit_sha || "").slice(0, 12);
      lines.push(`- #${pr.number} ${pr.title} — ${pr.changed_files ?? "?"} file(s)${sha ? ` — undo: \`git revert ${sha}\`` : ""}`);
    }
  }

  lines.push("", `### Held for a human (${held.length})`);
  lines.push(held.length ? held.map((pr) => `- #${pr.number} ${pr.title} (${laneOf(pr)})`).join("\n") : "None.");

  const quiet = expectedLanes(switches).filter((lane) => !byLane.has(lane));
  lines.push("", `### Expected daily lanes that wrote nothing (${quiet.length})`);
  lines.push(quiet.length ? quiet.map((l) => `- ${l}`).join("\n") : "None.");
  lines.push("", "_Failed or stalled runs are reported on `automation:health`, not here._");
  return lines.join("\n");
}

async function gh(repo, token, method, path, body) {
  const res = await fetch(`https://api.github.com${path.replace("{repo}", repo)}`, {
    method,
    headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`GitHub API ${method} ${path} ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

async function main() {
  const repo = process.env.GITHUB_REPOSITORY;
  const token = process.env.GITHUB_TOKEN;
  if (!repo || !token) throw new Error("GITHUB_REPOSITORY and GITHUB_TOKEN are required");
  const now = new Date();
  const since = new Date(now.getTime() - 24 * 3600 * 1000).toISOString().slice(0, 19);
  const search = (q) => gh(repo, token, "GET", `/search/issues?per_page=100&q=${encodeURIComponent(q)}`);

  const mergedHits = await search(`repo:${repo} is:pr is:merged label:${LEDGER_LABEL} merged:>=${since}`);
  const merged = [];
  for (const hit of mergedHits.items || []) merged.push(await gh(repo, token, "GET", `/repos/{repo}/pulls/${hit.number}`));
  const held = (await search(`repo:${repo} is:pr is:open label:"${HELD_LABEL}"`)).items || [];

  const switches = {};
  for (const name of [GLOBAL_SWITCH, ...Object.values(CLASS_SWITCHES)]) {
    try {
      switches[name] = (await readRepoVariable({ repo, name, token })) ?? "unset";
    } catch (err) {
      switches[name] = `unreadable (${err.message})`;
    }
  }

  const body = renderDigest({ now, merged, held, switches });
  if (process.argv.includes("--dry-run")) {
    console.log(body);
    return;
  }
  const open = await gh(repo, token, "GET", `/repos/{repo}/issues?state=open&labels=${encodeURIComponent(DIGEST_LABEL)}`);
  if (open?.[0]) {
    await gh(repo, token, "PATCH", `/repos/{repo}/issues/${open[0].number}`, { body });
    console.log(`Updated #${open[0].number}: ${merged.length} published, ${held.length} held`);
  } else {
    const issue = await gh(repo, token, "POST", "/repos/{repo}/issues", { title: "Auto-publish digest", body, labels: [DIGEST_LABEL] });
    console.log(`Created #${issue.number}`);
  }
}

function selfTest() {
  const failures = [];
  const check = (cond, msg) => { if (!cond) failures.push(msg); };
  const body = renderDigest({
    now: new Date("2026-09-24T08:30:00Z"),
    merged: [
      { number: 10, title: "SeatGeek CTA sync", changed_files: 3, merge_commit_sha: "abcdef1234567890", labels: [{ name: "automation:seatgeek-cta" }, { name: "autopublish" }] },
      { number: 11, title: "Add 4 shows", changed_files: 5, merge_commit_sha: "", labels: [{ name: "automation:tm-events" }] },
    ],
    held: [{ number: 12, title: "Vivid sync", labels: [{ name: "automation:vividseats-cta" }] }],
    switches: { AUTOPUBLISH_ENABLED: "unset" },
  });
  check(body.includes("### Published (2)"), "counts published PRs");
  check(body.includes("undo: `git revert abcdef123456`"), "gives an undo command per merged PR");
  check(!body.includes("#11 Add 4 shows — 5 file(s) — undo"), "omits the undo command when the merge SHA is unknown");
  check(body.includes("### Held for a human (1)") && body.includes("#12 Vivid sync"), "lists held PRs");
  check(body.includes("- automation:data-sync") && !body.includes("- automation:seatgeek-cta\n"), "lists only the quiet expected lanes");
  check(body.includes("`AUTOPUBLISH_ENABLED`=unset"), "shows the switch values");
  check(renderDigest({ now: new Date(0), merged: [], held: [], switches: {} }).includes("Nothing auto-merged"), "says so on an empty day");
  check(!body.includes("automation:autopromote"), "a disabled auto-promote lane is not expected");
  check(renderDigest({ now: new Date(0), merged: [], held: [], switches: { AUTOPROMOTE_ENABLED: "true", AUTOPUBLISH_ENABLED: "unset" } }).includes("- automation:autopromote"), "an enabled auto-promote lane that wrote nothing is flagged");
  check(!expectedLanes({ AUTOPROMOTE_ENABLED: "true", AUTOPUBLISH_ENABLED: "false" }).includes("automation:autopromote"), "the global pause removes it again");
  if (failures.length) {
    for (const f of failures) console.error(`  FAIL ${f}`);
    console.error(`[autopublish-digest] self-test: ${failures.length} failure(s)`);
    return 1;
  }
  console.log("[autopublish-digest] self-test: all assertions passed");
  return 0;
}

if (process.argv.includes("--self-test")) process.exit(selfTest());
main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
