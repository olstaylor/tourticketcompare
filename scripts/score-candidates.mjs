#!/usr/bin/env node
/**
 * Score and rank candidates based on event count, backlog status, and catalog status.
 * Reads raw TM events, outputs scored candidate list.
 */

import fs from 'node:fs/promises';
import path from 'node:path';

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

async function main() {
  const inputPath = arg('--input');
  const artistsPath = arg('--artists');
  const outputPath = arg('--output') || '.audit/candidates.json';
  const eventCountThreshold = Number.parseInt(arg('--threshold') || '50', 10);

  if (!inputPath) {
    console.error('ERROR: --input <path> required (raw TM events JSON)');
    process.exit(2);
  }
  if (!artistsPath) {
    console.error('ERROR: --artists <path> required (public/data/artists.json)');
    process.exit(2);
  }

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
  // Defensive: skip null/undefined entries
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

  // Group events by artist name
  const candidatesByName = new Map();

  for (const event of rawEvents) {
    if (!event) continue;
    const attractions = event?._embedded?.attractions || [];
    for (const attraction of attractions) {
      if (!attraction) continue;
      const artistName = clean(attraction.name);
      if (!artistName) continue;

      if (!candidatesByName.has(artistName)) {
        candidatesByName.set(artistName, {
          name: artistName,
          events: []
        });
      }
      candidatesByName.get(artistName).events.push(event);
    }
  }

  console.log(`Grouped into ${candidatesByName.size} unique artists.`);

  // Score and filter candidates
  const candidates = [];
  for (const [name, data] of candidatesByName.entries()) {
    const eventCount = data.events.length;

    // Skip if below threshold
    if (eventCount < eventCountThreshold) continue;

    const nameLower = clean(name).toLowerCase();

    // Check if artist matches existing catalog by name (case-insensitive)
    // If found, use the stored slug, not a newly generated one
    let existingSlug = null;
    let isAlreadyPublished = false;

    const storedSlug = existingArtistsByNameLower.get(nameLower);
    if (storedSlug) {
      // Artist found by name; use the stored slug
      existingSlug = storedSlug;
      isAlreadyPublished = artists.some((a) => a?.slug === existingSlug && a?.indexing_status === 'indexable_with_substantial_content');
    }

    // For candidates not yet in catalog, generate a slug
    const artistSlug = existingSlug || slugify(name);

    // Calculate score
    let score = eventCount;
    let scoreBreakdown = {
      event_count: eventCount,
      already_published: isAlreadyPublished ? -1000 : 0,
      venue_quality_factor: 1.0
    };

    // Penalty if already published
    if (isAlreadyPublished) {
      score = -1000;
      scoreBreakdown.reason = 'Already published';
    }

    candidates.push({
      artist_name: name,
      artist_slug: artistSlug,
      event_count: eventCount,
      score,
      score_breakdown: scoreBreakdown,
      is_already_published: isAlreadyPublished,
      rationale: isAlreadyPublished
        ? `Already published with ${eventCount} events`
        : `${eventCount} events across multiple venues`,
      tm_attractions: data.events[0]?._embedded?.attractions || []
    });
  }

  // Sort by score (descending)
  candidates.sort((a, b) => b.score - a.score);

  // Identify top candidate that passes threshold
  const topPassingCandidate = candidates.find((c) => c.score >= eventCountThreshold && !c.is_already_published);

  const output = {
    timestamp: new Date().toISOString(),
    candidates,
    top_candidate: topPassingCandidate
      ? {
          index: candidates.indexOf(topPassingCandidate),
          artist_name: topPassingCandidate.artist_name,
          event_count: topPassingCandidate.event_count,
          passes_threshold: true
        }
      : { passes_threshold: false },
    stats: {
      total_candidates: candidates.length,
      published: candidates.filter((c) => c.is_already_published).length,
      available: candidates.filter((c) => !c.is_already_published && c.score >= eventCountThreshold).length,
      below_threshold: candidates.filter((c) => c.score < eventCountThreshold).length
    }
  };

  const outputFile = path.resolve(process.cwd(), outputPath);
  const outputDir = path.dirname(outputFile);
  await ensureDir(outputDir);
  await fs.writeFile(outputFile, JSON.stringify(output, null, 2), 'utf8');
  console.log(`Wrote ${candidates.length} candidates to ${outputPath}`);
  console.log(`Top passing candidate: ${topPassingCandidate ? topPassingCandidate.artist_name : 'none'}`);

  process.exit(0);
}

main().catch((err) => {
  console.error('ERROR:', err.message);
  process.exit(1);
});
