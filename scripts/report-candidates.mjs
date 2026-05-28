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

function domainsCell(c) {
  const domains = Array.isArray(c.domains) ? c.domains : [];
  if (domains.length === 0) return '_(no URL)_';
  if (domains.length <= 2) return domains.join(', ');
  return `${domains.slice(0, 2).join(', ')} (+${domains.length - 2})`;
}

function renderTable(rows, threshold) {
  if (!rows.length) return '_None._\n\n';
  let md = '| # | Artist | Attraction ID | Events | Score | Status | Domains | Flags |\n';
  md += '|---|--------|---------------|--------|-------|--------|---------|-------|\n';
  rows.forEach((c, idx) => {
    const id = c.attraction_id || '_(name-fallback)_';
    md += `| ${idx + 1} | ${c.artist_name} | ${id} | ${c.event_count} | ${c.score} | ${statusLabel(c, threshold)} | ${domainsCell(c)} | ${flagString(c)} |\n`;
  });
  return `${md}\n`;
}

function sameOrdering(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i].group_key !== b[i].group_key) return false;
  }
  return true;
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
    hostname_distribution = [],
    supported_domain_allowlist = [],
    threshold = 50
  } = data;

  const selectable = candidates.filter((c) => !c.is_already_published);
  const band50 = selectable.filter((c) => c.event_count >= 50);
  const band20 = selectable.filter((c) => c.event_count >= 20 && c.event_count < 50);
  const band10 = selectable.filter((c) => c.event_count >= 10 && c.event_count < 20);
  const band2 = selectable.filter((c) => c.event_count >= 2 && c.event_count < 10);

  const bands = stats.bands || {};
  const diagnostics = stats.exclusion_diagnostics || {};

  // Top 20 by raw event count (deterministic tiebreak on group_key)
  const topByEvents = [...selectable]
    .sort((a, b) => b.event_count - a.event_count || (a.group_key || '').localeCompare(b.group_key || ''))
    .slice(0, 20);
  // Top 20 by composite score (deterministic tiebreak on group_key)
  const topByScore = [...selectable]
    .sort((a, b) => b.score - a.score || (a.group_key || '').localeCompare(b.group_key || ''))
    .slice(0, 20);

  // "Potentially useful but below threshold": non-trivial event count, below
  // recommendation threshold, sorted by score. Excludes already-published.
  const promisingLowerBound = Math.max(5, Math.min(10, threshold - 1));
  const promising = [...selectable]
    .filter((c) => c.event_count >= promisingLowerBound && c.event_count < threshold)
    .sort((a, b) => b.score - a.score || b.event_count - a.event_count)
    .slice(0, 20);

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

  // Hostname distribution (diagnostic)
  markdown += '## Hostname distribution (diagnostic)\n\n';
  if (hostname_distribution.length === 0) {
    markdown += '_No hostnames recorded — raw events lacked URL fields._\n\n';
  } else {
    const supportedCount = hostname_distribution.filter((h) => h.supported).reduce((s, h) => s + h.count, 0);
    const noUrlCount = hostname_distribution.filter((h) => h.hostname === '_no_url').reduce((s, h) => s + h.count, 0);
    const unsupportedCount = hostname_distribution
      .filter((h) => !h.supported && h.hostname !== '_no_url')
      .reduce((s, h) => s + h.count, 0);
    const total = supportedCount + unsupportedCount + noUrlCount;
    markdown += `- **Total events with URL hostnames counted:** ${total}\n`;
    markdown += `- **On diagnostic supported-domain list:** ${supportedCount}\n`;
    markdown += `- **On other hostnames:** ${unsupportedCount}\n`;
    markdown += `- **No parseable URL:** ${noUrlCount}\n\n`;
    markdown += `**Top ${Math.min(20, hostname_distribution.length)} hostnames by event count:**\n\n`;
    markdown += '| # | Hostname | Events | On supported list |\n';
    markdown += '|---|----------|--------|-------------------|\n';
    hostname_distribution.slice(0, 20).forEach((h, idx) => {
      const supported = h.hostname === '_no_url' ? '—' : (h.supported ? 'yes' : 'no');
      markdown += `| ${idx + 1} | ${h.hostname} | ${h.count} | ${supported} |\n`;
    });
    markdown += '\n';
    markdown += '> The supported-domain list is diagnostic only. It exists so the report can ';
    markdown += 'flag candidates whose event URLs do not land on a known Ticketmaster regional or ';
    markdown += 'Live Nation hostname. It is **not** consulted by CTA / affiliate routing — public ';
    markdown += 'links continue to be governed by `functions/api/out.js` and per-artist verification.\n\n';
    if (supported_domain_allowlist.length > 0) {
      markdown += `<details><summary>Supported-domain allowlist (${supported_domain_allowlist.length} hostnames)</summary>\n\n`;
      markdown += supported_domain_allowlist.map((d) => `- ${d}`).join('\n');
      markdown += '\n\n</details>\n\n';
    }
  }

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

  // Top 20 overall — by event count
  markdown += '## Top 20 candidates by event count\n\n';
  markdown += renderTable(topByEvents, threshold);

  // Top 20 by score — only render if the ordering differs from event-count order
  if (!sameOrdering(topByEvents, topByScore)) {
    markdown += '## Top 20 candidates by composite score\n\n';
    markdown += '_Score currently mirrors event count for selectable candidates, but the ordering above diverges — likely due to scoring adjustments._\n\n';
    markdown += renderTable(topByScore, threshold);
  } else {
    markdown += '## Top 20 candidates by composite score\n\n';
    markdown += '_Identical to the event-count ranking above (score has no divergent adjustments for selectable candidates in this run)._\n\n';
  }

  // Potentially useful but below threshold
  markdown += '## Potentially useful but below threshold\n\n';
  if (promisingLowerBound >= threshold) {
    markdown += `_Recommendation threshold (${threshold}) is at or below the minimum interesting band, so this section is empty._\n\n`;
  } else {
    markdown += `_Selectable candidates with ${promisingLowerBound}–${threshold - 1} events, ranked by composite score. Advisory only — these have not been verified and may be flagged as unstable-name, name-fallback, or unsupported-domain._\n\n`;
    if (promising.length === 0) {
      markdown += '_No candidates in this band._\n\n';
    } else {
      markdown += renderTable(promising, threshold);
    }
  }

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
  markdown += '_This report is machine-generated and advisory only. Human review and verification are required before any artist onboarding. ';
  markdown += 'Per-candidate `unsupported_domain_reason` and full `domains` list are preserved in the companion `candidates.json`._\n';

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
