#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const INDEX_PATH = path.join(root, 'public', 'index.html');
const ARTISTS_PATH = path.join(root, 'public', 'data', 'artists.json');
const EVENTS_PATH = path.join(root, 'public', 'data', 'events.json');
const CATALOG_PATH = path.join(root, 'public', 'data', 'catalog.json');

function fail(message) {
  console.error(`FRESHNESS CHECK FAILED: ${message}`);
  process.exit(1);
}

async function readJson(jsonPath) {
  const raw = await fs.readFile(jsonPath, 'utf8');
  return JSON.parse(raw);
}

function buildFallbackEvents(events) {
  if (!Array.isArray(events)) return [];

  const fallback = [];
  const seenArtists = new Set();

  for (const event of events) {
    if (!event || typeof event !== 'object') continue;

    const artistSlug = String(event.artist_slug || '').trim();
    if (artistSlug && seenArtists.has(artistSlug)) continue;

    fallback.push({
      id: String(event.id || '').trim() || `fallback-${fallback.length + 1}`,
      artist_slug: artistSlug,
      artist_name: String(event.artist_name || '').trim(),
      country: String(event.country || '').trim(),
      city: String(event.city || '').trim(),
      venue: String(event.venue || '').trim(),
      datetime_iso: String(event.datetime_iso || event.dateTimeISO || '').trim()
    });

    if (artistSlug) seenArtists.add(artistSlug);
    if (fallback.length >= 6) break;
  }

  return fallback;
}

function extractJsonScriptBlock(html, scriptId) {
  const pattern = new RegExp(`<script id="${scriptId}" type="application/json">([\\s\\S]*?)\\n\\s*</script>`);
  const match = html.match(pattern);
  if (!match) return null;

  const body = match[1].replace(/^\s*\n/, '').trim();
  if (!body) return null;

  try {
    return JSON.parse(body);
  } catch (error) {
    fail(`invalid JSON in <script id="${scriptId}">: ${error.message}`);
  }
}

function stableStringify(value) {
  return JSON.stringify(value);
}

async function main() {
  const [html, artists, events, catalog] = await Promise.all([
    fs.readFile(INDEX_PATH, 'utf8'),
    readJson(ARTISTS_PATH),
    readJson(EVENTS_PATH),
    readJson(CATALOG_PATH)
  ]);

  if (!Array.isArray(artists)) fail(`${path.relative(root, ARTISTS_PATH)} must be a JSON array`);
  if (!Array.isArray(events)) fail(`${path.relative(root, EVENTS_PATH)} must be a JSON array`);
  if (!catalog || typeof catalog !== 'object') fail(`${path.relative(root, CATALOG_PATH)} must be a JSON object`);

  const fallbackArtistsActual = extractJsonScriptBlock(html, 'fallbackArtistsData');
  if (fallbackArtistsActual === null) {
    fail('missing or empty <script id="fallbackArtistsData" type="application/json"> block in public/index.html');
  }

  const fallbackEventsActual = extractJsonScriptBlock(html, 'fallbackEventsData');
  if (fallbackEventsActual === null) {
    fail('missing or empty <script id="fallbackEventsData" type="application/json"> block in public/index.html');
  }

  const fallbackArtistsExpected = artists;
  const fallbackEventsExpected = buildFallbackEvents(events);

  if (stableStringify(fallbackArtistsActual) !== stableStringify(fallbackArtistsExpected)) {
    fail('fallbackArtistsData in public/index.html is stale vs public/data/artists.json (run events sync workflow).');
  }

  if (stableStringify(fallbackEventsActual) !== stableStringify(fallbackEventsExpected)) {
    fail('fallbackEventsData in public/index.html is stale vs public/data/events.json (run events sync workflow).');
  }

  console.log(
    `OK: fallback JSON blocks are fresh (artists=${fallbackArtistsExpected.length}, fallback_events=${fallbackEventsExpected.length}).`
  );
}

main().catch((error) => {
  fail(error?.message || String(error));
});
