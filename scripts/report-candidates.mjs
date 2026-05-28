#!/usr/bin/env node
/**
 * Generate markdown report from scored candidates.
 * Reads candidates.json, outputs human-readable markdown.
 *
 * The report is advisory only — no entry here authorises shell creation or publication.
 */

import fs from 'node:fs/promises';
import path from 'node:path';

const argv = process.argv.slice(2);
function arg(name) {
  const i = argv.indexOf(name);
  return i >= 0 ? argv[i + 1] : null;
}

async function ensureDir(dirPath) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch {
    // ignore mkdir errors
  }
}

async function readJson(filePath) {
  if (!filePath) return null;
  try {
    const raw = await fs.readFile(filePath, 'utf8');
    if (!raw.trim()) return null;
    return JSON.parse(raw);
  } catch (err) {
    if (err?.code === 'ENOENT') return null;
    throw err;
  }
}

function formatDate(iso) {
  if (!iso) return '_no timestamp_';
  const d = new Date(iso);
  return d.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC'
  });
}

function flagString(c) {
  const flags = [];
  if (c.is_already_published) flags.push('published');
  if (c.lacks_attraction_id) flags.push('no-attraction-id');
  if (c.flagged_unstable_name) flags.push('unstable-name');
  if (c.unsupported_domain_only) flags.push('unsupported-domain');
  return flags.length ? flags.join(', ') : '—';
}

function statusLabel(c, threshold) {
  if (c.is_already_published) return 'Published';
  if (c.event_count >= threshold) return 'Recommended';
  if (c.event_count >= 20) return 'Watch (20-49)';
  if (c.event_count >= 10) return 'Watch (10-19)';
  if (c.event_count >= 2) return 'Low (2-9)';
  return 'Single-event';
}

function renderTable(rows, threshold) {
  if (!rows.length) return '_None._\n\n';
  let md = '| # | Artist | Attraction ID | Events | Score | Status | Flags |\n';
  md += '|---|--------|---------------|--------|-------|--------|-------|\n';
  rows.forEach((c, idx) => {
    const id = c.attraction_id || '_(name-fallback)_';
    md += `| ${idx + 1} | ${c.artist_name} | ${id} | ${c.event_count} | ${c.score} | ${statusLabel(c, threshold)} | ${flagString(c)} |\n`;
  });
  return `${md}\n`;
}

async function main() {
  const inputPath = arg('--input') || '.audit/candidates.json';
  const outputPath = arg('--output') || '.audit/candidates-report.md';

  const data = await readJson(inputPath);
  if (!data) {
    console.error(`ERROR: Could not read input file: ${inputPath}`);
    process.exit(1);
  }

  const {
    timestamp,
    candidates = [],
    top_candidate,
    stats = {},
    grouping = {},
    threshold = 50
  } = data;

  const selectable = candidates.filter((c) => !c.is_already_published);
  const band50 = selectable.filter((c) => c.event_count >= 50);
  const band20 = selectable.filter((c) => c.event_count >= 20 && c.event_count < 50);
  const band10 = selectable.filter((c) => c.event_count >= 10 && c.event_count < 20);
  const band2 = selectable.filter((c) => c.event_count >= 2 && c.event_count < 10);

  const bands = stats.bands || {};
  const diagnostics = stats.exclusion_diagnostics || {};

  let markdown = '';

  // Header
  markdown += '# Ticketmaster Candidate Report\n\n';
  markdown += `**Generated:** ${formatDate(timestamp)}\n\n`;
  markdown += '> **Advisory only.** Scoring and ranking here are diagnostic. ';
  markdown += 'Nothing in this report authorises shell creation, publication, or any ';
  markdown += 'modification of catalog or event data. All onboarding still requires explicit human review.\n\n';

  // Summary
  markdown += '## Summary\n\n';
  markdown += `- **Total candidate groups:** ${stats.total_candidates ?? candidates.length}\n`;
  markdown += `- **Already published (excluded from bands):** ${stats.published ?? 0}\n`;
  markdown += `- **Recommendation threshold:** ${threshold}+ events (conservative)\n`;
  markdown += `- **Candidates at or above recommendation threshold:** ${stats.available_at_threshold ?? bands.band_50_plus ?? band50.length}\n\n`;

  // Grouping diagnostics
  markdown += '## Grouping diagnostics\n\n';
  markdown += `- **Raw valid events processed:** ${grouping.events_total ?? 0}\n`;
  markdown += `- **Events with no attractions (skipped):** ${grouping.events_with_no_attractions ?? 0}\n`;
  markdown += `- **Events grouped by primary attraction ID:** ${grouping.events_with_primary_attraction_id ?? 0}\n`;
  markdown += `- **Events grouped by name fallback (no primary ID):** ${grouping.events_with_primary_name_only ?? 0}\n`;
  markdown += `- **Secondary attractions observed (not counted as candidates):** ${grouping.secondary_attractions_seen ?? 0}\n\n`;

  // Bands
  markdown += '## Candidate bands\n\n';
  markdown += '_Bands exclude already-published artists. Counts and tables below are sorted by event count, descending._\n\n';
  markdown += `- **50+ events:** ${bands.band_50_plus ?? band50.length}\n`;
  markdown += `- **20–49 events:** ${bands.band_20_49 ?? band20.length}\n`;
  markdown += `- **10–19 events:** ${bands.band_10_19 ?? band10.length}\n`;
  markdown += `- **2–9 events:** ${bands.band_2_9 ?? band2.length}\n`;
  if (bands.band_1 !== undefined) markdown += `- **1 event:** ${bands.band_1}\n`;
  markdown += '\n';

  // Diagnostics — exclusion / flag counts
  markdown += '## Exclusion & flag diagnostics\n\n';
  markdown += `- **Excluded as already published:** ${diagnostics.already_published ?? stats.published ?? 0}\n`;
  markdown += `- **Grouped via name fallback (no Ticketmaster attraction ID):** ${diagnostics.no_attraction_id_fallback_to_name ?? 0}\n`;
  markdown += `- **Flagged unstable / composite attraction names:** ${diagnostics.unstable_attraction_name ?? 0}\n`;
  markdown += `- **All event URLs on unsupported domains:** ${diagnostics.unsupported_domain_only ?? 0}\n\n`;
  markdown += '_Flagged candidates are still listed below; flagging is informational and does not auto-exclude them._\n\n';

  // Top candidate (if any pass)
  if (top_candidate?.passes_threshold) {
    markdown += '## Top recommended candidate\n\n';
    markdown += `**${top_candidate.artist_name}** — ${top_candidate.event_count} events`;
    if (top_candidate.attraction_id) markdown += ` (attraction ID \`${top_candidate.attraction_id}\`)`;
    markdown += '\n\n';
  } else {
    markdown += '## Top recommended candidate\n\n';
    markdown += `_No candidates pass the conservative ${threshold}-event threshold. See lower bands below for watchlist candidates._\n\n`;
  }

  // Top 20 overall
  const topOverall = selectable.slice(0, 20);
  markdown += '## Top 20 candidates overall (by event count)\n\n';
  markdown += renderTable(topOverall, threshold);

  // 50+ band table
  markdown += `## 50+ events band (${band50.length})\n\n`;
  markdown += renderTable(band50.slice(0, 20), threshold);

  // 20-49 band table
  markdown += `## 20–49 events band (${band20.length})\n\n`;
  markdown += renderTable(band20.slice(0, 20), threshold);

  // 10-19 band table
  markdown += `## 10–19 events band (${band10.length})\n\n`;
  markdown += renderTable(band10.slice(0, 20), threshold);

  // 2-9 band table
  markdown += `## 2–9 events band (sample of up to 20 of ${band2.length})\n\n`;
  markdown += renderTable(band2.slice(0, 20), threshold);

  // Footer
  markdown += '---\n\n';
  markdown += '_This report is machine-generated and advisory only. Human review and verification are required before any artist onboarding._\n';

  const outputFile = path.resolve(process.cwd(), outputPath);
  const outputDir = path.dirname(outputFile);
  await ensureDir(outputDir);
  await fs.writeFile(outputFile, markdown, 'utf8');
  console.log(`Wrote report to ${outputPath}`);

  process.exit(0);
}

main().catch((err) => {
  console.error('ERROR:', err.message);
  process.exit(1);
});
