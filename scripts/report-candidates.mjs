#!/usr/bin/env node
/**
 * Generate markdown report from scored candidates.
 * Reads candidates.json, outputs human-readable markdown.
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
  return d.toLocaleString('en-US', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit', timeZone: 'UTC' });
}

async function main() {
  const inputPath = arg('--input');
  const outputPath = arg('--output') || '.audit/candidates-report.md';

  if (!inputPath) {
    console.error('ERROR: --input <path> required (scored candidates JSON)');
    process.exit(2);
  }

  const data = await readJson(inputPath);
  if (!data) {
    console.error(`ERROR: Could not read input file: ${inputPath}`);
    process.exit(1);
  }

  const { timestamp, candidates = [], top_candidate, stats = {} } = data;

  let markdown = '';

  // Header
  markdown += '# Ticketmaster Candidate Report\n\n';
  markdown += `**Generated:** ${formatDate(timestamp)}\n\n`;

  // Summary
  markdown += '## Summary\n\n';
  markdown += `- **Total candidates:** ${stats.total_candidates || 0}\n`;
  markdown += `- **Already published:** ${stats.published || 0}\n`;
  markdown += `- **Available (≥50 events):** ${stats.available || 0}\n`;
  markdown += `- **Below threshold:** ${stats.below_threshold || 0}\n\n`;

  // Top candidate
  if (top_candidate?.passes_threshold) {
    markdown += '## Top Candidate ✅\n\n';
    markdown += `**${top_candidate.artist_name}** — ${top_candidate.event_count} events\n\n`;
  } else {
    markdown += '## Top Candidate\n\n';
    markdown += '_No candidates pass the 50-event threshold._\n\n';
  }

  // Candidate table (top 20)
  const topCandidates = candidates.slice(0, 20);
  if (topCandidates.length > 0) {
    markdown += `## Top ${Math.min(20, candidates.length)} Candidates\n\n`;
    markdown += '| Artist | Events | Score | Status |\n';
    markdown += '|--------|--------|-------|--------|\n';

    for (const c of topCandidates) {
      if (!c) continue;
      const status = c.is_already_published ? '📌 Published' : c.event_count >= 50 ? '✅ Available' : '⚠️ Below threshold';
      markdown += `| ${c.artist_name} | ${c.event_count} | ${c.score} | ${status} |\n`;
    }
    markdown += '\n';
  }

  // Details section
  if (topCandidates.length > 0) {
    markdown += '## Candidate Details\n\n';

    for (const c of topCandidates.slice(0, 5)) {
      if (!c) continue;
      markdown += `### ${c.artist_name}\n\n`;
      markdown += `- **Events:** ${c.event_count}\n`;
      markdown += `- **Score:** ${c.score}\n`;
      markdown += `- **Status:** ${c.is_already_published ? 'Already published' : 'Available for onboarding'}\n`;
      markdown += `- **Rationale:** ${c.rationale}\n\n`;
    }
  }

  // Footer
  markdown += '---\n\n';
  markdown += '_This report is machine-generated. Human review and verification required before any artist onboarding._\n';

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
