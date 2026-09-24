#!/usr/bin/env node
// Rolling `automation:roster-candidates` issue from a propose-onboarding-batch
// manifest: which candidates the auto-promote screen (criteria D1–D5) would
// pass, and why the rest are held. Propose-only: writes the issue and nothing
// else; promotion stays a separate, gated step.
//
//   node scripts/report-roster-candidates.mjs <manifest.json> [--dry-run]
//   node scripts/report-roster-candidates.mjs --self-test

import { readFileSync } from "node:fs";

export const LABEL = "automation:roster-candidates";

export function renderCandidates(manifest, run = null) {
  const rows = manifest.artists || [];
  // With a run verdict, a row the run held no longer reads as passing; only the
  // rows it held after they passed the screen get the run section.
  const runHeld = new Map((run?.held || []).map((h) => [h.slug, h]));
  const pass = rows.filter((r) => r.screen?.eligible && !runHeld.has(r.slug));
  const heldAfterScreen = rows.filter((r) => r.screen?.eligible && runHeld.has(r.slug)).map((r) => runHeld.get(r.slug));
  const held = rows.filter((r) => !r.screen?.eligible);
  const stat = (r) => (r.screen?.stats ? ` — ${r.screen.stats.qualifying} dates, ${r.screen.stats.cities} cities, ${Math.round(r.screen.stats.primary_share * 100)}% primary` : "");
  const lines = [
    `Roster candidates — ${manifest.generated_at} (propose-only; nothing is promoted by this issue)`,
    "",
    `### Pass the screen (${pass.length})`,
    "_The title is pre-checked here; the rendered shell's description, uniqueness and placeholder checks (criterion 5) run in the promote job before anything publishes._",
    pass.length ? pass.map((r) => `- **${r.name}** (\`${r.slug}\`)${stat(r)} · title: ${r.screen.seo_title}`).join("\n") : "None.",
    "",
    `### Held for a human (${held.length})`,
    held.length ? held.map((r) => `- **${r.name}** (\`${r.slug}\`): ${(r.screen?.reasons || ["not screened"]).join("; ")}`).join("\n") : "None.",
    "",
    `### Not matched (${(manifest.excluded || []).length})`,
    (manifest.excluded || []).map((r) => `- ${r.name}: ${r.exclusion}`).join("\n") || "None.",
  ];
  // The auto-promote job's own verdict, when it published this issue.
  if (run) {
    // Written after the publish step: a promotion is only claimed once its PR
    // was opened; otherwise the same rows are reported as not published.
    const published = run.outcome === "success";
    lines.push(
      "",
      published
        ? `### Auto-promote PR opened this run (${run.promoted.length}) — see the \`automation:autopromote\` PR for its merge`
        : `### Not published this run (${run.promoted.length}; publish step: ${run.outcome || "not reached"})`,
      run.promoted.map((p) => `- **${p.name || p.slug}** (\`${p.slug}\`) · ${p.seo_title}`).join("\n") || "None.",
      "",
      `### Passed the screen, held by the auto-promote run (${heldAfterScreen.length})`,
      heldAfterScreen.map((h) => `- \`${h.slug}\`: ${h.reasons.join("; ")}`).join("\n") || "None.",
    );
  }
  return lines.join("\n");
}

async function gh(method, path, body) {
  const res = await fetch(`https://api.github.com/repos/${process.env.GITHUB_REPOSITORY}${path}`, {
    method,
    headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`GitHub API ${method} ${path} ${res.status}`);
  return res.json();
}

async function main(manifestPath) {
  const runIndex = process.argv.indexOf("--run");
  const run = runIndex === -1 ? null : { ...JSON.parse(readFileSync(process.argv[runIndex + 1], "utf8")), outcome: process.env.PUBLISH_OUTCOME || "" };
  const body = renderCandidates(JSON.parse(readFileSync(manifestPath, "utf8")), run);
  if (process.argv.includes("--dry-run")) return console.log(body);
  const open = await gh("GET", `/issues?state=open&labels=${encodeURIComponent(LABEL)}`);
  if (open[0]) await gh("PATCH", `/issues/${open[0].number}`, { body });
  else await gh("POST", "/issues", { title: "Roster candidates", body, labels: [LABEL] });
  console.log(`Roster candidates issue ${open[0] ? `#${open[0].number} updated` : "created"}.`);
}

function selfTest() {
  const body = renderCandidates({
    generated_at: "2026-09-24",
    artists: [
      { name: "Kenny Chesney", slug: "kenny-chesney", screen: { eligible: true, reasons: [], seo_title: "Kenny Chesney Tickets & Tour Dates | TourTicketCompare", stats: { qualifying: 12, cities: 9, primary_share: 1 } } },
      { name: "Avery Anna", slug: "avery-anna", screen: { eligible: false, reasons: ["D3: primary-attraction share 8% (< 80%)"] } },
    ],
    excluded: [{ name: "Journey", exclusion: "no exact-name SeatGeek performer match — identity unresolved" }],
  });
  const kenny = { name: "Kenny Chesney", slug: "kenny-chesney", screen: { eligible: true, reasons: [], seo_title: "t" } };
  const withRun = renderCandidates({ generated_at: "2026-09-24", artists: [kenny], excluded: [] }, { promoted: [], held: [{ slug: "kenny-chesney", reasons: ["D1: SeatGeek performer did not recapture identically by id"] }], outcome: "failure" });
  const ok = body.includes("### Pass the screen (1)") && body.includes("**Avery Anna** (`avery-anna`): D3") && body.includes("- Journey: no exact-name")
    && withRun.includes("### Pass the screen (0)") && withRun.includes("held by the auto-promote run (1)") && withRun.includes("`kenny-chesney`: D1: SeatGeek")
    && withRun.includes("### Not published this run (0; publish step: failure)");
  console.log(`[roster-candidates] self-test: ${ok ? "all assertions passed" : "FAILED"}`);
  return ok ? 0 : 1;
}

if (process.argv.includes("--self-test")) process.exit(selfTest());
const argv = process.argv.slice(2);
const manifestPath = argv.find((a, i) => !a.startsWith("--") && argv[i - 1] !== "--run");
if (!manifestPath) {
  console.error("usage: report-roster-candidates.mjs <manifest.json> [--dry-run]");
  process.exit(2);
}
main(manifestPath).catch((err) => {
  console.error(err.message);
  process.exit(1);
});
