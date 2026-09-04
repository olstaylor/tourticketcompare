// Per-page Open Graph cards.
//
// Every indexable URL used to share one social card (public/og-image.png), so a
// shared artist page, city page and guide all previewed identically. This
// generates one 1200x630 PNG per page from the same brand template and writes a
// manifest the router reads to pick the right card.
//
// OUTPUTS (both generated — never hand-edit either)
//   public/og/<route-path>.png          one card per covered route
//   functions/_og-cards.generated.js    route path -> card URL, read by the router
//
// INPUTS
//   public/data/catalog.json, artists.json, events.json   the same records the
//   public/data/guides-content.json, blog-content.json    pages render from
//   public/assets/og-image.svg                            the brand template
//
// WHAT GOES ON A CARD
// Only fields that are stable for the life of the URL: a name, a place, a
// title. Deliberately no show counts, dates or verification stamps — those move
// every time the calendar does, and a card carrying them would rewrite hundreds
// of binary files on every data sync. A card therefore stays valid until the
// page itself goes away.
//
// FONTS
// The template's own stacks lead with DejaVu (`DejaVu Serif`, `DejaVu Sans`),
// which is what public/og-image.png was rasterised with and what Linux CI has.
// A host without them renders a substituted face at a different width; the fit
// is measured from the fonts actually present, so text still fits, it just
// looks different. Generate on Linux to match what is committed.

import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OG_DIR = path.join(root, "public", "og");
const MANIFEST_PATH = path.join(root, "functions", "_og-cards.generated.js");
const MANIFEST_REL = "functions/_og-cards.generated.js";

const CARD_W = 1200;
const CARD_H = 630;

// Type stacks and palette lifted from public/assets/og-image.svg so a generated
// card and the default card are the same design.
const SERIF = "DejaVu Serif, Georgia, 'Times New Roman', serif";
const SANS = "DejaVu Sans, Helvetica, Arial, sans-serif";
const INK = "#101411";
const ACCENT = "#8f341e";
const MUTED = "#4a524a";
const RULE = "#d75b2f";

// Headline box: x=100 to x=1100 inside the 1160-wide inner panel.
const TEXT_X = 100;
const MAX_TEXT_W = 1000;
const HEADLINE_SIZES = [86, 76, 68, 60, 54];
const HEADLINE_SPACING = -3;
const MAX_HEADLINE_LINES = 2;
const LINE_GAP = 14;
// The headline band: below the eyebrow baseline (232), above the sub-line (510).
const HEADLINE_TOP = 262;
const HEADLINE_BOTTOM = 470;

const escapeXml = (value) =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

// ---------------------------------------------------------------------------
// Text measurement
// ---------------------------------------------------------------------------
//
// Rasterising every candidate line to measure it costs ~107ms a go, which is
// minutes across the corpus. Glyph advances are additive, so instead each
// distinct character is measured once per font at a reference size and the
// widths are summed. Checked against direct rasterisation, this lands within 1%
// on real artist, venue and city names — see --self-test.
//
// Spaces are measured as the difference between "I I" and "II" rather than from
// a run of them: SVG collapses consecutive whitespace unless xml:space is
// preserved, and a run measured without that reads as a single space.

const REF_SIZE = 100;
const REPEATS = 20;
const MEASURED_CHARS =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789" +
  ",.-–—'’\"!?&()/:;+*#%@àáâäãåèéêëìíîïòóôöõùúûüñçøßÀÁÂÄÃÅÈÉÊËÌÍÎÏÒÓÔÖÕÙÚÛÜÑÇØ";

async function rasterWidth(sharp, text, { size, family, weight, spacing }) {
  const svg =
    `<svg xmlns="http://www.w3.org/2000/svg" width="8000" height="400">` +
    `<rect width="8000" height="400" fill="#ffffff"/>` +
    `<text xml:space="preserve" x="20" y="280" font-family="${family}" font-size="${size}" ` +
    `font-weight="${weight}" letter-spacing="${spacing}" fill="#000000">${escapeXml(text)}</text></svg>`;
  const { info } = await sharp(Buffer.from(svg)).trim({ threshold: 10 }).toBuffer({ resolveWithObject: true });
  return info.width;
}

async function measureAdvances(sharp, family, weight, chars = MEASURED_CHARS) {
  const advances = new Map();
  for (const char of chars) {
    advances.set(char, (await rasterWidth(sharp, char.repeat(REPEATS), { size: REF_SIZE, family, weight, spacing: 0 })) / REPEATS);
  }
  const twoLetters = await rasterWidth(sharp, "II", { size: REF_SIZE, family, weight, spacing: 0 });
  const spaced = await rasterWidth(sharp, "I I", { size: REF_SIZE, family, weight, spacing: 0 });
  advances.set(" ", spaced - twoLetters);
  return advances;
}

/** Width of `text` at `size`, from a reference-size advance table. */
export function textWidth(text, { advances, size, spacing = 0, fallback = 60 }) {
  const chars = [...String(text)];
  if (!chars.length) return 0;
  let total = 0;
  for (const char of chars) {
    const advance = advances.get ? advances.get(char) : advances[char];
    total += (advance === undefined ? fallback : advance) * (size / REF_SIZE);
  }
  return total + spacing * (chars.length - 1);
}

/**
 * Greedy word wrap at a fixed size. Returns null when the text needs more than
 * `maxLines`, so the caller can try the next size down.
 */
export function wrapAtSize(text, { advances, size, spacing, maxWidth, maxLines }) {
  const words = String(text).split(/\s+/).filter(Boolean);
  if (!words.length) return null;
  const lines = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (textWidth(candidate, { advances, size, spacing }) <= maxWidth) {
      line = candidate;
      continue;
    }
    // A single word wider than the box can never be wrapped smaller.
    if (!line) return null;
    lines.push(line);
    line = word;
    if (lines.length > maxLines) return null;
  }
  if (line) lines.push(line);
  if (lines.length > maxLines) return null;
  if (lines.some((entry) => textWidth(entry, { advances, size, spacing }) > maxWidth)) return null;
  return lines;
}

/**
 * Largest size from `sizes` at which the headline fits in `maxLines`. Falls
 * back to the smallest size with a hard character truncation, so a pathological
 * name still produces a card rather than failing the build.
 */
export function fitHeadline(text, { advances, sizes = HEADLINE_SIZES, spacing = HEADLINE_SPACING, maxWidth = MAX_TEXT_W, maxLines = MAX_HEADLINE_LINES }) {
  for (const size of sizes) {
    const lines = wrapAtSize(text, { advances, size, spacing, maxWidth, maxLines });
    if (lines) return { size, lines };
  }
  const size = sizes.at(-1);
  let truncated = String(text);
  while (truncated.length > 1 && textWidth(`${truncated}…`, { advances, size, spacing }) > maxWidth * maxLines) {
    truncated = truncated.slice(0, -1);
  }
  const lines = wrapAtSize(`${truncated.trim()}…`, { advances, size, spacing, maxWidth, maxLines });
  return { size, lines: lines || [`${truncated.trim()}…`] };
}

/** Shrink a single line until it fits, then truncate as a last resort. */
export function fitLine(text, { advances, sizes, spacing = 0, maxWidth = MAX_TEXT_W }) {
  for (const size of sizes) {
    if (textWidth(text, { advances, size, spacing }) <= maxWidth) return { size, text: String(text) };
  }
  const size = sizes.at(-1);
  let truncated = String(text);
  while (truncated.length > 1 && textWidth(`${truncated}…`, { advances, size, spacing }) > maxWidth) {
    truncated = truncated.slice(0, -1);
  }
  return { size, text: `${truncated.trim()}…` };
}

// ---------------------------------------------------------------------------
// Card rendering
// ---------------------------------------------------------------------------

/**
 * The brand template from public/assets/og-image.svg with the headline block
 * replaced. Backgrounds, panel, brand mark and accent rule are byte-identical
 * to the default card so the set reads as one system.
 */
export function renderCardSvg({ eyebrow, headline, sub }) {
  // The headline is centred in the band between the eyebrow and the sub-line
  // rather than hung off a fixed baseline: bottom-aligning it drove a two-line
  // headline up through the eyebrow, which the earlier layout did.
  const leading = headline.size + LINE_GAP;
  const blockHeight = headline.lines.length * headline.size + (headline.lines.length - 1) * LINE_GAP;
  const band = HEADLINE_BOTTOM - HEADLINE_TOP;
  const blockTop = HEADLINE_TOP + Math.max(0, (band - blockHeight) / 2);
  // 0.8em approximates the cap height, so `blockTop` reads as the visual top.
  const firstBaseline = Math.round(blockTop + headline.size * 0.8);
  const headlineSvg = headline.lines
    .map(
      (line, index) =>
        `<text x="${TEXT_X}" y="${firstBaseline + index * leading}" font-family="${SERIF}" ` +
        `font-size="${headline.size}" font-weight="700" letter-spacing="${HEADLINE_SPACING}" ` +
        `fill="${index === headline.lines.length - 1 ? ACCENT : INK}">${escapeXml(line)}</text>`
    )
    .join("\n  ");

  return `<svg width="${CARD_W}" height="${CARD_H}" viewBox="0 0 ${CARD_W} ${CARD_H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${escapeXml(
    `${eyebrow}: ${headline.lines.join(" ")}`
  )}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#fffaf0"/>
      <stop offset="0.5" stop-color="#f5f1e8"/>
      <stop offset="1" stop-color="#ebe2d1"/>
    </linearGradient>
    <radialGradient id="glowA" cx="12%" cy="0%" r="60%">
      <stop offset="0" stop-color="#d75b2f" stop-opacity="0.16"/>
      <stop offset="1" stop-color="#d75b2f" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="glowB" cx="92%" cy="12%" r="55%">
      <stop offset="0" stop-color="#24483a" stop-opacity="0.18"/>
      <stop offset="1" stop-color="#24483a" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="mark" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#101411"/>
      <stop offset="1" stop-color="#24483a"/>
    </linearGradient>
  </defs>

  <rect width="${CARD_W}" height="${CARD_H}" fill="url(#bg)"/>
  <rect width="${CARD_W}" height="${CARD_H}" fill="url(#glowA)"/>
  <rect width="${CARD_W}" height="${CARD_H}" fill="url(#glowB)"/>
  <rect x="20" y="20" width="1160" height="590" rx="34" fill="#fffdf7" fill-opacity="0.78" stroke="#d8d0c0" stroke-width="2"/>

  <circle cx="130" cy="140" r="46" fill="url(#mark)"/>
  <text x="130" y="150" font-family="${SANS}" font-size="30" font-weight="700" letter-spacing="3" fill="#ffffff" text-anchor="middle">TTC</text>
  <text x="200" y="151" font-family="${SANS}" font-size="40" font-weight="800" letter-spacing="-1" fill="${INK}">TourTicketCompare</text>

  <text x="${TEXT_X}" y="232" font-family="${SANS}" font-size="26" font-weight="700" letter-spacing="4" fill="${MUTED}">${escapeXml(
    eyebrow.toUpperCase()
  )}</text>

  ${headlineSvg}

  <text x="${TEXT_X}" y="510" font-family="${SANS}" font-size="${sub.size}" fill="${MUTED}">${escapeXml(sub.text)}</text>

  <rect x="${TEXT_X}" y="540" width="220" height="8" rx="4" fill="${RULE}"/>
</svg>`;
}

// ---------------------------------------------------------------------------
// Which routes get a card, and what it says
// ---------------------------------------------------------------------------

const INDEXABLE_ARTIST_STATUS = "indexable_with_substantial_content";

/** "/artists/coldplay" -> "artists-coldplay" */
export function cardNameForPath(routePath) {
  return String(routePath).replace(/^\//, "").replace(/\//g, "-");
}

const readJson = async (relative) => JSON.parse(await fs.readFile(path.join(root, relative), "utf8"));

async function collectCards() {
  const [catalog, artistsMeta, events, guidesContent, blogContent] = await Promise.all([
    readJson("public/data/catalog.json"),
    readJson("public/data/artists.json"),
    readJson("public/data/events.json"),
    readJson("public/data/guides-content.json"),
    readJson("public/data/blog-content.json")
  ]);
  const { deriveCities } = await import(pathToFileURL(path.join(root, "functions/_cities.js")));
  const { deriveVenues } = await import(pathToFileURL(path.join(root, "functions/_venues.js")));
  const { deriveIndexableArtistCities } = await import(pathToFileURL(path.join(root, "functions/_artist-cities.js")));
  const { deriveIndexableBlogEntries } = await import(pathToFileURL(path.join(root, "functions/_blog.js")));
  const { GUIDE_ROUTES } = await import(pathToFileURL(path.join(root, "functions/_guide-routes.generated.js")));

  const indexableMeta = new Map(
    artistsMeta
      .filter((artist) => artist?.indexing_status === INDEXABLE_ARTIST_STATUS)
      .map((artist) => [String(artist?.slug || "").trim(), artist])
      .filter(([slug]) => slug)
  );
  const nameBySlug = new Map(
    (catalog.artists || []).map((artist) => [String(artist?.slug || "").trim(), String(artist?.name || "").trim()])
  );

  const cards = [];

  for (const artist of catalog.artists || []) {
    const slug = String(artist?.slug || "").trim();
    if (!slug || !indexableMeta.has(slug)) continue;
    cards.push({
      path: `/artists/${slug}`,
      eyebrow: "Tickets & tour dates",
      headline: String(artist?.name || slug),
      sub: "Checked event links and buying guidance"
    });
  }

  for (const city of deriveCities(events).filter((entry) => entry.indexable)) {
    cards.push({
      path: `/cities/${city.slug}`,
      eyebrow: "Concerts in",
      headline: city.city,
      sub: `${city.country} · Tracked tour dates and verified ticket links`
    });
  }

  for (const venue of deriveVenues(events).filter((entry) => entry.indexable)) {
    cards.push({
      path: `/venues/${venue.slug}`,
      eyebrow: "Concerts at",
      headline: venue.venue,
      sub: [venue.city, venue.country].filter(Boolean).join(", ") || "Tracked tour dates and verified ticket links"
    });
  }

  for (const artistCity of deriveIndexableArtistCities(events, [...indexableMeta.keys()])) {
    const artistName = nameBySlug.get(artistCity.artistSlug) || artistCity.artistSlug;
    cards.push({
      path: artistCity.path,
      eyebrow: "Tickets",
      headline: `${artistName} in ${artistCity.city}`,
      sub: `${artistCity.country} · Tracked dates and verified ticket links`
    });
  }

  for (const [routePath, route] of Object.entries(GUIDE_ROUTES)) {
    cards.push({
      path: routePath,
      eyebrow: "Guide",
      headline: route.h1 || String(route.title || "").replace(" | TourTicketCompare", ""),
      sub: "Practical, sourced buying guidance"
    });
  }

  // blogContent.posts is an ARRAY of records carrying their own `path`. Keying
  // it with Object.entries produced "0"/"1"/"2", so every lookup below missed
  // and every blog post was skipped — silently, because og:check and the social
  // assertions all derive their expectations from this same manifest.
  const postsByPath = new Map(
    (Array.isArray(blogContent?.posts) ? blogContent.posts : []).map((post) => [String(post?.path || ""), post])
  );
  for (const entry of deriveIndexableBlogEntries(blogContent)) {
    if (entry.type !== "blog-post") continue;
    const post = postsByPath.get(entry.path) || {};
    const title = String(post.title || post.h1 || "").replace(" | TourTicketCompare", "").trim();
    if (!title) continue;
    cards.push({
      path: entry.path,
      eyebrow: "Blog",
      headline: title,
      sub: "How this site checks links, prices and sources"
    });
  }

  return cards;
}

// ---------------------------------------------------------------------------
// Build
// ---------------------------------------------------------------------------

function renderManifest(entries) {
  const lines = entries
    .map(([routePath, card]) => `  ${JSON.stringify(routePath)}: ${JSON.stringify(card)}`)
    .join(",\n");
  return `// GENERATED FILE — DO NOT EDIT.
//
// Written by scripts/build-og-cards.mjs. Maps a route path to its per-page
// Open Graph card in public/og/. A route with no entry falls back to the shared
// /og-image.png, which is why the calendar moving between builds degrades to the
// default card rather than a 404.
//
// Run \`npm run og:build\` after adding artists, guides or blog posts;
// \`npm run og:check\` fails only on a manifest that points at a missing file.

export const OG_CARDS = {
${lines}
};
`;
}

async function loadSharp() {
  try {
    return (await import("sharp")).default;
  } catch (error) {
    throw new Error(
      "sharp is required to rasterise OG cards. Run `npm install` (it is a devDependency) and retry.\n" +
        `Underlying error: ${error?.message || error}`
    );
  }
}

export function mergeCardEntries(existingEntries, replacements) {
  const cards = new Map(existingEntries);
  for (const [routePath, card] of replacements) cards.set(routePath, card);
  return [...cards.entries()].sort(([left], [right]) => left.localeCompare(right));
}

async function build({ write = true, paths = [] } = {}) {
  const sharp = await loadSharp();
  const cards = await collectCards();
  const requestedPaths = new Set(paths);

  const seen = new Map();
  for (const card of cards) {
    const name = cardNameForPath(card.path);
    if (seen.has(name)) throw new Error(`card filename collision: "${name}" from ${seen.get(name)} and ${card.path}`);
    seen.set(name, card.path);
  }

  const [serifBold, sans] = await Promise.all([measureAdvances(sharp, SERIF, 700), measureAdvances(sharp, SANS, 400)]);

  await fs.mkdir(OG_DIR, { recursive: true });
  const selectedCards = requestedPaths.size
    ? cards.filter((card) => requestedPaths.has(card.path))
    : cards;
  if (requestedPaths.size !== selectedCards.length) {
    const knownPaths = new Set(selectedCards.map((card) => card.path));
    throw new Error(`unknown OG-card route(s): ${[...requestedPaths].filter((routePath) => !knownPaths.has(routePath)).join(", ")}`);
  }
  const entries = [];
  for (const card of selectedCards) {
    const headline = fitHeadline(card.headline, { advances: serifBold });
    const sub = fitLine(card.sub, { advances: sans, sizes: [32, 28, 25, 22] });
    const svg = renderCardSvg({ eyebrow: card.eyebrow, headline, sub });
    const name = cardNameForPath(card.path);
    const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9, effort: 10 }).toBuffer();
    if (write) await fs.writeFile(path.join(OG_DIR, `${name}.png`), png);
    // The alt travels with the card because only this script knows what the
    // card actually says. Deriving it in the router from route.title produced
    // alt text carrying pipe-separated SEO suffixes and a date range the card
    // never shows.
    entries.push([card.path, { url: `/og/${name}.png`, alt: `${card.eyebrow}: ${headline.lines.join(" ")}` }]);
  }

  entries.sort((a, b) => a[0].localeCompare(b[0]));
  const manifestEntries = requestedPaths.size
    ? mergeCardEntries(Object.entries((await import(pathToFileURL(MANIFEST_PATH))).OG_CARDS), entries)
    : entries;
  if (write) await fs.writeFile(MANIFEST_PATH, renderManifest(manifestEntries));

  // Drop cards for routes that no longer exist. A city or artist-city page
  // stops qualifying as its dates pass, and without this its card would sit in
  // public/og/ forever — the set only ever grew, so the dead weight would
  // accumulate silently across every future sync.
  //
  // Safe to delete: nothing references an orphan (the manifest is the only way
  // the router reaches a card), and a route that later recovers gets its card
  // rebuilt by the next run.
  const pruned = write && !requestedPaths.size
    ? await pruneOrphanedCards(new Set(entries.map(([, card]) => card.url)))
    : [];
  return { entries: manifestEntries, pruned };
}

/**
 * Remove generated cards in `dir` that the manifest no longer references.
 * `dir` is injectable so the self-test can exercise deletion without touching
 * the real card set.
 */
export async function pruneOrphanedCards(referenced, dir = OG_DIR) {
  let onDisk;
  try {
    onDisk = await fs.readdir(dir);
  } catch {
    return [];
  }
  const pruned = [];
  for (const name of onDisk) {
    if (!name.endsWith(".png")) continue;
    if (referenced.has(`/og/${name}`)) continue;
    await fs.rm(path.join(dir, name));
    pruned.push(name);
  }
  return pruned.sort();
}

/**
 * The check that runs in CI. It deliberately does NOT require the manifest to
 * match the current indexable surface: city, venue and artist-city routes
 * appear and disappear as dates pass, so an exact-match check would fail on any
 * day the calendar moved and nothing else. What must hold is that every card the
 * router can reference actually exists.
 */
async function check() {
  const problems = [];
  let manifest;
  try {
    ({ OG_CARDS: manifest } = await import(pathToFileURL(MANIFEST_PATH)));
  } catch (error) {
    console.error(`[og-cards] ${MANIFEST_REL} is missing or unreadable — run \`npm run og:build\`.`);
    process.exitCode = 1;
    return;
  }
  // An interrupted og:build or a renamed export leaves a module that imports
  // cleanly but has no OG_CARDS. Without this the Object.entries below throws
  // outside the guard above, replacing the actionable message with a stack trace.
  if (!manifest || typeof manifest !== "object") {
    console.error(`[og-cards] ${MANIFEST_REL} does not export an OG_CARDS object — run \`npm run og:build\`.`);
    process.exitCode = 1;
    return;
  }
  const referenced = new Set();
  for (const [routePath, card] of Object.entries(manifest)) {
    const cardUrl = card?.url;
    if (!cardUrl || !/^\/og\/[a-z0-9-]+\.png$/i.test(cardUrl)) {
      problems.push(`${routePath} -> "${cardUrl}" is not a /og/<name>.png path`);
      continue;
    }
    if (!card?.alt) problems.push(`${routePath} -> ${cardUrl} has no alt text`);
    referenced.add(cardUrl);
    try {
      await fs.access(path.join(root, "public", cardUrl));
    } catch {
      problems.push(`${routePath} -> ${cardUrl} is referenced by the manifest but the file is missing`);
    }
  }

  let onDisk = [];
  try {
    onDisk = (await fs.readdir(OG_DIR)).filter((name) => name.endsWith(".png"));
  } catch {
    onDisk = [];
  }
  const orphans = onDisk.filter((name) => !referenced.has(`/og/${name}`));

  const cards = await collectCards();
  const uncovered = cards.filter((card) => !manifest[card.path]);

  if (problems.length) {
    for (const problem of problems) console.error(`[og-cards] FAIL: ${problem}`);
    console.error(`[og-cards] ${problems.length} problem(s). Run \`npm run og:build\`.`);
    process.exitCode = 1;
    return;
  }
  console.log(`[og-cards] OK: ${Object.keys(manifest).length} card(s) referenced, all present on disk`);
  if (uncovered.length) {
    console.log(
      `[og-cards] NOTE: ${uncovered.length} indexable route(s) have no card yet and fall back to /og-image.png ` +
        `(run \`npm run og:build\`): ${uncovered.slice(0, 5).map((card) => card.path).join(", ")}${uncovered.length > 5 ? " …" : ""}`
    );
  }
  if (orphans.length) {
    console.log(`[og-cards] NOTE: ${orphans.length} card file(s) on disk are no longer referenced: ${orphans.slice(0, 5).join(", ")}${orphans.length > 5 ? " …" : ""}`);
  }
}

// ---------------------------------------------------------------------------
// Self-test
// ---------------------------------------------------------------------------

let passed = 0;
function assert(condition, message) {
  if (condition) {
    passed += 1;
    console.log(`  ok   ${message}`);
    return;
  }
  console.error(`  FAIL ${message}`);
  process.exitCode = 1;
}

async function selfTest() {
  const sharp = await loadSharp();

  assert(cardNameForPath("/artists/coldplay") === "artists-coldplay", "a route path becomes a flat card filename");
  assert(
    cardNameForPath("/artists/coldplay/tickets/london-united-kingdom") === "artists-coldplay-tickets-london-united-kingdom",
    "a nested artist-city path flattens without collision"
  );

  // Measuring the full character set costs ~50s, which is too slow to sit in
  // test:mvp. The samples below only need their own glyphs, so measure those.
  const SAMPLES = [
    "Coldplay",
    "Madison Square Garden",
    "Foo Fighters in Los Angeles",
    "System of a Down",
    "The Weeknd",
    "My Chemical Romance in Newark",
    "Supercalifragilisticexpialidocious",
    "Olivia Rodrigo in Philadelphia"
  ];
  const sampleChars = [...new Set(SAMPLES.join("").replace(/ /g, ""))].join("");
  const advances = await measureAdvances(sharp, SERIF, 700, sampleChars);

  // The additive model is the reason this script is not minutes slow. If it
  // ever drifts from what the rasteriser actually does, headlines start
  // overflowing the card silently, so the tolerance is asserted directly.
  let worst = 0;
  for (const sample of SAMPLES.slice(0, 5)) {
    const actual = await rasterWidth(sharp, sample, { size: 86, family: SERIF, weight: 700, spacing: HEADLINE_SPACING });
    const predicted = textWidth(sample, { advances, size: 86, spacing: HEADLINE_SPACING });
    worst = Math.max(worst, Math.abs(predicted - actual) / actual);
  }
  assert(worst < 0.03, `measured widths track rasterised widths within 3% (worst ${(worst * 100).toFixed(1)}%)`);

  const short = fitHeadline("Coldplay", { advances });
  assert(short.size === HEADLINE_SIZES[0] && short.lines.length === 1, "a short headline keeps the largest size on one line");

  const long = fitHeadline("My Chemical Romance in Newark", { advances });
  assert(long.lines.length <= MAX_HEADLINE_LINES, "a long headline wraps within the line budget");
  assert(
    long.lines.every((line) => textWidth(line, { advances, size: long.size, spacing: HEADLINE_SPACING }) <= MAX_TEXT_W),
    "every wrapped line fits the headline box"
  );

  const absurd = fitHeadline("Supercalifragilisticexpialidocious".repeat(4), { advances });
  assert(absurd.lines.length <= MAX_HEADLINE_LINES, "an unwrappable headline truncates rather than overflowing the budget");
  assert(absurd.lines.join("").includes("…"), "a truncated headline is marked with an ellipsis");

  // Geometry: a two-line headline used to be bottom-aligned against a fixed
  // baseline, which drove its first line up through the eyebrow. Assert the
  // block stays inside its band for both line counts.
  for (const [label, fitted] of [["one-line", short], ["two-line", { size: 86, lines: ["Olivia Rodrigo in", "Philadelphia"] }]]) {
    const rendered = renderCardSvg({ eyebrow: "Tickets", headline: fitted, sub: { size: 32, text: "Sub" } });
    const baselines = [...rendered.matchAll(/<text x="100" y="(\d+)" font-family="DejaVu Serif/g)].map((match) => Number(match[1]));
    assert(baselines.length === fitted.lines.length, `${label}: every headline line is emitted`);
    const firstTop = baselines[0] - fitted.size * 0.8;
    const lastBottom = baselines.at(-1) + fitted.size * 0.25;
    assert(firstTop > 232, `${label}: the headline clears the eyebrow baseline (top ${Math.round(firstTop)})`);
    assert(lastBottom < 510 - 32, `${label}: the headline clears the sub-line (bottom ${Math.round(lastBottom)})`);
  }

  const svg = renderCardSvg({ eyebrow: "Tickets", headline: short, sub: { size: 32, text: "Checked event links" } });
  assert(svg.includes(`width="${CARD_W}"`) && svg.includes(`height="${CARD_H}"`), "a card renders at the 1200x630 OG size");
  assert(svg.includes("TourTicketCompare"), "a card carries the brand mark");

  const { info } = await sharp(Buffer.from(svg)).png().toBuffer({ resolveWithObject: true });
  assert(info.width === CARD_W && info.height === CARD_H, "the rasterised card is exactly 1200x630");

  const ampersand = renderCardSvg({
    eyebrow: "Tickets",
    headline: { size: 60, lines: ["Simon & Garfunkel"] },
    sub: { size: 32, text: "A & B" }
  });
  assert(ampersand.includes("Simon &amp; Garfunkel"), "text is XML-escaped into the card");
  await sharp(Buffer.from(ampersand)).png().toBuffer();
  assert(true, "a card containing an ampersand still rasterises");

  // Pruning: a route that stops qualifying (its dates pass) must not leave its
  // card behind, or public/og/ grows without bound across syncs.
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), "og-prune-"));
  await fs.writeFile(path.join(tmpDir, "keep-a.png"), "a");
  await fs.writeFile(path.join(tmpDir, "keep-b.png"), "b");
  await fs.writeFile(path.join(tmpDir, "orphan.png"), "c");
  await fs.writeFile(path.join(tmpDir, "notes.txt"), "not a card");
  const pruned = await pruneOrphanedCards(new Set(["/og/keep-a.png", "/og/keep-b.png"]), tmpDir);
  assert(pruned.join(",") === "orphan.png", "an unreferenced card is pruned");
  const left = (await fs.readdir(tmpDir)).sort();
  assert(left.join(",") === "keep-a.png,keep-b.png,notes.txt", "referenced cards and non-card files survive pruning");
  await fs.rm(tmpDir, { recursive: true, force: true });

  const manifest = renderManifest([["/artists/coldplay", { url: "/og/artists-coldplay.png", alt: "Tickets: Coldplay" }]]);
  assert(manifest.includes("export const OG_CARDS = {"), "the manifest exports OG_CARDS");
  assert(manifest.includes("GENERATED FILE"), "the manifest is marked generated");
  assert(
    mergeCardEntries([["/artists/coldplay", { url: "/og/artists-coldplay.png", alt: "Tickets: Coldplay" }]], [["/guides/example", { url: "/og/guides-example.png", alt: "Guide: Example" }]]).length === 2,
    "a targeted refresh retains existing manifest entries"
  );

  if (!process.exitCode) console.log(`build-og-cards self-test passed (${passed} assertions).`);
}

// ---------------------------------------------------------------------------

// Guarded so importing this module (the self-test and other tooling import its
// pure helpers) never kicks off a 205-file rasterisation as a side effect.
const invokedDirectly = process.argv[1] && pathToFileURL(process.argv[1]).href === import.meta.url;
if (invokedDirectly) {
  const mode = process.argv[2];
  if (mode === "--self-test") {
    await selfTest();
  } else if (mode === "--check") {
    await check();
  } else {
    const paths = process.argv.slice(2).filter((value, index, values) => values[index - 1] === "--path");
    const { entries, pruned } = await build({ paths });
    console.log(`Wrote ${entries.length} OG card(s) to public/og/ and ${MANIFEST_REL}.`);
    if (pruned.length) {
      console.log(`Removed ${pruned.length} card(s) for routes that no longer exist: ${pruned.slice(0, 5).join(", ")}${pruned.length > 5 ? " …" : ""}`);
    }
  }
}
