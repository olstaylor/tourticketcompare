#!/usr/bin/env node
/**
 * Score and rank candidates based on event count, backlog status, and catalog status.
 * Reads raw TM events, outputs scored candidate list.
 *
 * Grouping policy:
 *  - Group by primary Ticketmaster attraction (first attraction on the event)
 *  - Prefer attraction ID as the grouping key; fall back to the lowercased name when ID is missing
 *  - Secondary attractions (positions 2+) are NOT used to create their own candidate groups —
 *    they are tracked separately as diagnostic metadata only
 *
 * Output is advisory only. Nothing in this script authorises shell creation or publication.
 */

import fs from 'node:fs/promises';
import path from 'node:path';

const SUPPORTED_DOMAINS = ['ticketmaster.com', 'ticketmaster.ca', 'ticketmaster.co.uk', 'livenation.com'];

const argv = process.argv.slice(2);
function arg(name) {
  const i = argv.indexOf(name);
  return i >= 0 ? argv[i + 1] : null;
}

function clean(value) {
  return String(value || '').trim();
}

function slugify(value) {
  return clean(value, 120)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
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

function eventUrlDomain(event) {
  const url = clean(event?.url);
  if (!url) return null;
  try {
    return new URL(url).hostname.toLowerCase().replace(/^www\./, '');
  } catch {
    return null;
  }
}

function looksUnstableAttractionName(name) {
  const lower = clean(name).toLowerCase();
  if (!lower) return true;
  // Composite or tour-style strings that indicate the row isn't really a single-artist attraction
  if (/\b(feat\.?|featuring|vs\.?|w\/)\b/.test(lower)) return true;
  if (/\bworld tour\b|\btour 20\d\d\b|\bresidency\b/.test(lower)) return true;
  if (lower.split(/\s*[&,/]\s*/).filter(Boolean).length > 2) return true;
  return false;
}

async function main() {
  const inputPath = arg('--input') || '.audit/candidates-raw.json';
  const artistsPath = arg('--artists') || 'public/data/artists.json';
  const outputPath = arg('--output') || '.audit/candidates.json';
  const eventCountThreshold = Number.parseInt(arg('--threshold') || '50', 10);

  // Read input files
  const rawEvents = await readJson(inputPath);
  const artists = await readJson(artistsPath);

  if (!rawEvents) {
    console.error(`ERROR: Could not read input file: ${inputPath}`);
    process.exit(1);
  }
  if (!Array.isArray(rawEvents)) {
    console.error('ERROR: Input file must be a JSON array of events.');
    process.exit(1);
  }
  if (!Array.isArray(artists)) {
    console.error('ERROR: Artists file must be a JSON array.');
    process.exit(1);
  }

  console.log(`Read ${rawEvents.length} raw events.`);
  console.log(`Read ${artists.length} existing artists.`);

  // Build existing artist slugs and names (case-insensitive)
  const existingArtistsBySlug = new Set();
  const existingArtistsByNameLower = new Map();
  for (const artist of artists) {
    if (!artist) continue;
    if (artist.slug) existingArtistsBySlug.add(clean(artist.slug).toLowerCase());
    if (artist.name) {
      const nameLower = clean(artist.name).toLowerCase();
      existingArtistsByNameLower.set(nameLower, artist.slug);
    }
  }

  // Group events by PRIMARY attraction only.
  // Prefer attraction ID as the grouping key; fall back to lowercased name when no ID is present.
  const candidatesByKey = new Map();
  const groupingStats = {
    events_total: rawEvents.length,
    events_with_no_attractions: 0,
    events_with_primary_attraction_id: 0,
    events_with_primary_name_only: 0,
    secondary_attractions_seen: 0
  };

  for (const event of rawEvents) {
    if (!event) continue;
    const attractions = event?._embedded?.attractions || [];
    if (attractions.length === 0) {
      groupingStats.events_with_no_attractions++;
      continue;
    }

    const primary = attractions[0];
    if (!primary) continue;
    const attractionId = clean(primary.id) || null;
    const artistName = clean(primary.name);
    if (!artistName) continue;

    if (attractionId) {
      groupingStats.events_with_primary_attraction_id++;
    } else {
      groupingStats.events_with_primary_name_only++;
    }
    groupingStats.secondary_attractions_seen += Math.max(0, attractions.length - 1);

    const groupKey = attractionId ? `id:${attractionId}` : `name:${artistName.toLowerCase()}`;

    if (!candidatesByKey.has(groupKey)) {
      candidatesByKey.set(groupKey, {
        attraction_id: attractionId,
        name: artistName,
        events: [],
        secondary_attraction_ids: new Set(),
        secondary_attraction_names: new Set(),
        domains: new Set()
      });
    }
    const group = candidatesByKey.get(groupKey);
    group.events.push(event);
    for (let i = 1; i < attractions.length; i++) {
      const sec = attractions[i];
      if (!sec) continue;
      const secId = clean(sec.id);
      const secName = clean(sec.name);
      if (secId) group.secondary_attraction_ids.add(secId);
      if (secName) group.secondary_attraction_names.add(secName);
    }
    const domain = eventUrlDomain(event);
    if (domain) group.domains.add(domain);
  }

  console.log(`Grouped into ${candidatesByKey.size} unique attractions (primary-only grouping).`);
  if (candidatesByKey.size > rawEvents.length) {
    console.warn(`WARNING: more groups (${candidatesByKey.size}) than valid events (${rawEvents.length}) — grouping anomaly.`);
  }

  // Score each candidate.
  const candidates = [];
  let countsByExclusionReason = {
    already_published: 0,
    no_attraction_id_fallback_to_name: 0,
    unstable_attraction_name: 0,
    unsupported_domain_only: 0
  };

  for (const [groupKey, data] of candidatesByKey.entries()) {
    const eventCount = data.events.length;
    const name = data.name;
    const attractionId = data.attraction_id;
    const nameLower = clean(name).toLowerCase();

    // Match against catalog by name (case-insensitive)
    let existingSlug = null;
    let isAlreadyPublished = false;
    const storedSlug = existingArtistsByNameLower.get(nameLower);
    if (storedSlug) {
      existingSlug = storedSlug;
      isAlreadyPublished = artists.some(
        (a) => a?.slug === existingSlug && a?.indexing_status === 'indexable_with_substantial_content'
      );
    }

    const artistSlug = existingSlug || slugify(name);

    const lacksAttractionId = !attractionId;
    const unstableName = looksUnstableAttractionName(name);
    const supportedDomain = Array.from(data.domains).some((d) =>
      SUPPORTED_DOMAINS.some((sd) => d === sd || d.endsWith(`.${sd}`))
    );
    const unsupportedDomainOnly = data.domains.size > 0 && !supportedDomain;

    if (isAlreadyPublished) countsByExclusionReason.already_published++;
    if (lacksAttractionId) countsByExclusionReason.no_attraction_id_fallback_to_name++;
    if (unstableName) countsByExclusionReason.unstable_attraction_name++;
    if (unsupportedDomainOnly) countsByExclusionReason.unsupported_domain_only++;

    let score = eventCount;
    const scoreBreakdown = {
      event_count: eventCount,
      already_published: isAlreadyPublished ? -1000 : 0,
      venue_quality_factor: 1.0
    };
    if (isAlreadyPublished) {
      score = -1000;
      scoreBreakdown.reason = 'Already published';
    }

    candidates.push({
      group_key: groupKey,
      attraction_id: attractionId,
      artist_name: name,
      artist_slug: artistSlug,
      event_count: eventCount,
      score,
      score_breakdown: scoreBreakdown,
      is_already_published: isAlreadyPublished,
      lacks_attraction_id: lacksAttractionId,
      flagged_unstable_name: unstableName,
      domains: Array.from(data.domains).sort(),
      unsupported_domain_only: unsupportedDomainOnly,
      secondary_attraction_ids: Array.from(data.secondary_attraction_ids).sort(),
      secondary_attraction_names: Array.from(data.secondary_attraction_names).sort(),
      rationale: isAlreadyPublished
        ? `Already published with ${eventCount} events`
        : `${eventCount} events across multiple venues`,
      tm_attractions: data.events[0]?._embedded?.attractions || []
    });
  }

  // Sort by score (descending)
  candidates.sort((a, b) => b.score - a.score);

  // Band counts (excludes already-published from the band totals because they're never actionable)
  const bandSelectable = candidates.filter((c) => !c.is_already_published);
  const bands = {
    band_50_plus: bandSelectable.filter((c) => c.event_count >= 50).length,
    band_20_49: bandSelectable.filter((c) => c.event_count >= 20 && c.event_count < 50).length,
    band_10_19: bandSelectable.filter((c) => c.event_count >= 10 && c.event_count < 20).length,
    band_2_9: bandSelectable.filter((c) => c.event_count >= 2 && c.event_count < 10).length,
    band_1: bandSelectable.filter((c) => c.event_count === 1).length
  };

  const topPassingCandidate = candidates.find(
    (c) => c.score >= eventCountThreshold && !c.is_already_published
  );

  const output = {
    timestamp: new Date().toISOString(),
    advisory_only: true,
    advisory_note:
      'Scoring is advisory only. Nothing here authorises shell creation, publication, or catalog modification.',
    threshold: eventCountThreshold,
    grouping: groupingStats,
    candidates,
    top_candidate: topPassingCandidate
      ? {
          index: candidates.indexOf(topPassingCandidate),
          attraction_id: topPassingCandidate.attraction_id,
          artist_name: topPassingCandidate.artist_name,
          event_count: topPassingCandidate.event_count,
          passes_threshold: true
        }
      : { passes_threshold: false },
    stats: {
      total_candidates: candidates.length,
      published: candidates.filter((c) => c.is_already_published).length,
      available_at_threshold: candidates.filter(
        (c) => !c.is_already_published && c.event_count >= eventCountThreshold
      ).length,
      bands,
      exclusion_diagnostics: countsByExclusionReason
    }
  };

  const outputFile = path.resolve(process.cwd(), outputPath);
  const outputDir = path.dirname(outputFile);
  await ensureDir(outputDir);
  await fs.writeFile(outputFile, JSON.stringify(output, null, 2), 'utf8');
  console.log(`Wrote ${candidates.length} candidates to ${outputPath}`);
  console.log(
    `Bands — 50+: ${bands.band_50_plus}, 20-49: ${bands.band_20_49}, 10-19: ${bands.band_10_19}, 2-9: ${bands.band_2_9}, 1: ${bands.band_1}`
  );
  console.log(`Top passing candidate: ${topPassingCandidate ? topPassingCandidate.artist_name : 'none'}`);

  process.exit(0);
}

main().catch((err) => {
  console.error('ERROR:', err.message);
  process.exit(1);
});
