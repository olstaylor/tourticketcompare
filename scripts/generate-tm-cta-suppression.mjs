#!/usr/bin/env node
// Generates a renderer-only Ticketmaster CTA suppression artifact from the
// nightly sync review report. This does not mutate event data or affiliate
// routing; it only lists event ids whose Ticketmaster event-level CTA should be
// hidden while a human rechecks the sync finding.

import fs from 'node:fs/promises';
import path from 'node:path';

const BLOCKING_KINDS = new Set([
  'deleted',
  'identity_mismatch',
  'status',
  'unknown_status',
  'ambiguous_api_response'
]);

const argv = process.argv.slice(2);
function arg(name) {
  const i = argv.indexOf(name);
  return i >= 0 ? argv[i + 1] : null;
}

const reportPath = arg('--report') || '.audit/tm-sync.json';
const outputPath = arg('--output') || 'public/data/tm-cta-suppression.json';

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function clean(value) {
  return String(value ?? '').trim();
}

async function readJson(filePath) {
  const raw = await fs.readFile(filePath, 'utf8');
  return JSON.parse(raw);
}

function mergeItem(target, item) {
  const kind = clean(item?.kind || item?.reason);
  if (!BLOCKING_KINDS.has(kind)) return;
  const id = clean(item?.id);
  if (!id) return;
  if (!target.has(id)) {
    target.set(id, {
      id,
      artist_slug: clean(item?.artist_slug),
      ticketmaster_event_id: clean(item?.ticketmaster_event_id),
      reasons: []
    });
  }
  const current = target.get(id);
  if (kind && !current.reasons.includes(kind)) current.reasons.push(kind);
}

async function main() {
  const report = await readJson(reportPath);
  const suppressed = new Map();
  for (const item of asArray(report?.reviewItems).concat(asArray(report?.review))) {
    mergeItem(suppressed, item);
  }

  const items = [...suppressed.values()].sort((a, b) => a.id.localeCompare(b.id));
  const output = {
    generated_at: new Date().toISOString(),
    source_report: reportPath,
    blocked_review_kinds: [...BLOCKING_KINDS].sort(),
    suppressed_event_ids: items.map((item) => item.id),
    items
  };

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, `${JSON.stringify(output, null, 2)}\n`);
  console.log(`Wrote ${items.length} Ticketmaster CTA suppression id(s) to ${outputPath}`);
}

main().catch((error) => {
  console.error('generate-tm-cta-suppression failed:', error);
  process.exit(1);
});
