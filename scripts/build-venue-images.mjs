// Venue photography: fetch, resize, and publish the manifest the router reads.
//
// The site carried no photography at all until this lane. Artist photography is
// deliberately still absent — a freely-licensed photo settles the photographer's
// copyright but not the subject's personality rights, and an artist's face beside
// an affiliate ticket button is the fact pattern a false-endorsement claim is
// built from. Buildings carry no personality rights, so venues are the one
// category this site can illustrate honestly. Full reasoning: docs/VENUE_IMAGES.md.
//
// INPUT  data/venue-images.json          human-curated, one entry per venue photo
// OUTPUT public/img/venues/<slug>.webp   the published derivative
//        functions/_venue-images.generated.js   slug -> {src,width,height,alt,credit}
//
// Both outputs are generated — never hand-edit either.
//
// MODES
//   --fetch   downloads from Wikimedia and rewrites both outputs. Manual, and
//             the only mode that touches the network.
//   --check   no network. Asserts registry, files and manifest agree. This is
//             what CI runs, so a dropped file or a stripped credit fails a build
//             rather than shipping an unattributed image.
//   --self-test  exercises the pure helpers.
//
// WHY THE BINARIES ARE COMMITTED
// The source is a third-party site. Re-downloading during a deploy would put a
// build at the mercy of someone else's uptime and let an upstream re-upload
// change what this site serves without review. The derivative is committed, and
// --fetch is run deliberately when a photo is added or replaced.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const REGISTRY_PATH = path.join(root, "data", "venue-images.json");
const OUT_DIR = path.join(root, "public", "img", "venues");
const MANIFEST_PATH = path.join(root, "functions", "_venue-images.generated.js");
const MANIFEST_REL = "functions/_venue-images.generated.js";

// One published width. A venue photo is a single banner on one page, not a
// responsive art-directed asset, and a second size would double the committed
// binary weight to save a few KB on small screens.
const TARGET_WIDTH = 960;
const WEBP_QUALITY = 72;

// Every licence in the registry must permit commercial reuse, because this site
// runs affiliate links. CC BY and CC BY-SA additionally require attribution, so
// the renderer's credit line is a licence term, not a courtesy.
const COMMERCIAL_LICENCES = [/^CC0/i, /^Public domain$/i, /^CC BY [0-9.]+$/i, /^CC BY-SA [0-9.]+$/i];
const ATTRIBUTION_REQUIRED = /^CC BY(-SA)? [0-9.]+$/i;

export function licencePermitsCommercialUse(licence) {
  return COMMERCIAL_LICENCES.some((re) => re.test(String(licence || "").trim()));
}

export function licenceRequiresAttribution(licence) {
  return ATTRIBUTION_REQUIRED.test(String(licence || "").trim());
}

/**
 * The credit line shown under a photo. CC BY and BY-SA ask for title, author,
 * source and licence; naming all four keeps the obligation met even when a
 * reader never follows the links.
 */
export function creditLine(credit) {
  const author = String(credit?.author || "").trim();
  const licence = String(credit?.licence || "").trim();
  if (!author || !licence) return "";
  return licenceRequiresAttribution(licence) ? `Photo by ${author}, ${licence}` : `Photo by ${author} (${licence})`;
}

/** Registry entries must be complete before anything is downloaded or rendered. */
export function registryProblems(images) {
  const problems = [];
  const seen = new Set();
  for (const entry of Array.isArray(images) ? images : []) {
    const slug = String(entry?.venue_slug || "").trim();
    const where = slug || "(entry with no venue_slug)";
    if (!slug) problems.push("an entry has no venue_slug");
    else if (seen.has(slug)) problems.push(`${slug}: duplicate venue_slug`);
    seen.add(slug);

    if (!String(entry?.alt || "").trim()) problems.push(`${where}: no alt text`);
    // Alt text repeating the venue name and nothing else describes no image.
    else if (String(entry.alt).trim().length < 40) problems.push(`${where}: alt text is too short to describe the photo`);

    const credit = entry?.credit || {};
    for (const field of ["title", "author", "licence", "licence_url", "source_url"]) {
      if (!String(credit?.[field] || "").trim()) problems.push(`${where}: credit.${field} is missing`);
    }
    if (credit?.licence && !licencePermitsCommercialUse(credit.licence)) {
      problems.push(`${where}: licence "${credit.licence}" does not permit commercial reuse`);
    }
    if (!/^https:\/\/upload\.wikimedia\.org\//.test(String(entry?.source_image_url || ""))) {
      problems.push(`${where}: source_image_url must be a direct upload.wikimedia.org file URL`);
    }
  }
  return problems;
}

async function readRegistry() {
  const doc = JSON.parse(await fs.readFile(REGISTRY_PATH, "utf8"));
  const images = Array.isArray(doc?.images) ? doc.images : [];
  const problems = registryProblems(images);
  if (problems.length) {
    throw new Error(`data/venue-images.json is not publishable:\n  - ${problems.join("\n  - ")}`);
  }
  return images;
}

function renderManifest(entries) {
  const body = entries
    .map((entry) => `  ${JSON.stringify(entry.venue_slug)}: ${JSON.stringify({
      src: entry.src,
      width: entry.width,
      height: entry.height,
      alt: entry.alt,
      credit: entry.credit
    })}`)
    .join(",\n");
  return `// GENERATED by scripts/build-venue-images.mjs — do not edit.
//
// Venue photography, keyed by venue slug. Each record carries the published
// derivative, its real dimensions (so the renderer can reserve space and avoid
// layout shift), the alt text, and the credit the licence obliges the page to
// show. Regenerate with \`npm run venues:images:fetch\`.
export const VENUE_IMAGES = Object.freeze({
${body}
});
`;
}

async function loadSharp() {
  try {
    return (await import("sharp")).default;
  } catch {
    throw new Error("sharp is required to process venue images. Run `npm install` (it is a devDependency) and retry.");
  }
}

async function fetchAll() {
  const images = await readRegistry();
  const sharp = await loadSharp();
  await fs.mkdir(OUT_DIR, { recursive: true });
  const entries = [];

  for (const entry of images) {
    const res = await fetch(entry.source_image_url, {
      headers: { "User-Agent": "TourTicketCompare/1.0 (https://tourticketcompare.com; venue image build)" }
    });
    if (!res.ok) throw new Error(`${entry.venue_slug}: source returned HTTP ${res.status}`);
    const source = Buffer.from(await res.arrayBuffer());

    // Natural aspect ratio is kept deliberately. Cropping every photo to one
    // banner shape cut the venue name off several of them, and a venue photo
    // whose subject is cropped out is worse than a ragged column of heights.
    const { data, info } = await sharp(source)
      .resize({ width: TARGET_WIDTH, withoutEnlargement: true })
      .webp({ quality: WEBP_QUALITY })
      .toBuffer({ resolveWithObject: true });

    const file = `${entry.venue_slug}.webp`;
    await fs.writeFile(path.join(OUT_DIR, file), data);
    entries.push({
      venue_slug: entry.venue_slug,
      src: `/img/venues/${file}`,
      width: info.width,
      height: info.height,
      alt: entry.alt,
      credit: { ...entry.credit, line: creditLine(entry.credit) }
    });
    console.log(`  ${entry.venue_slug.padEnd(34)} ${info.width}x${info.height}  ${(data.length / 1024).toFixed(0)}KB  ${entry.credit.licence}`);
  }

  await fs.writeFile(MANIFEST_PATH, renderManifest(entries));
  console.log(`\n[venue-images] wrote ${entries.length} image(s) to public/img/venues/ and ${MANIFEST_REL}`);
}

async function check() {
  const images = await readRegistry();
  const problems = [];

  let manifest;
  try {
    ({ VENUE_IMAGES: manifest } = await import(path.join(root, MANIFEST_REL)));
  } catch {
    problems.push(`${MANIFEST_REL} is missing or unreadable — run \`npm run venues:images:fetch\``);
    manifest = {};
  }

  for (const entry of images) {
    const record = manifest[entry.venue_slug];
    if (!record) {
      problems.push(`${entry.venue_slug}: in the registry but absent from ${MANIFEST_REL}`);
      continue;
    }
    // The credit is the licence term. If the manifest ever drifts from the
    // registry the page would attribute the wrong photographer or licence,
    // which is worse than showing no photo.
    for (const field of ["author", "licence", "licence_url", "source_url"]) {
      if (record.credit?.[field] !== entry.credit[field]) {
        problems.push(`${entry.venue_slug}: manifest credit.${field} does not match the registry`);
      }
    }
    if (record.alt !== entry.alt) problems.push(`${entry.venue_slug}: manifest alt text does not match the registry`);
    if (!record.credit?.line) problems.push(`${entry.venue_slug}: manifest carries no rendered credit line`);
    if (!(record.width > 0 && record.height > 0)) {
      problems.push(`${entry.venue_slug}: manifest has no usable dimensions, so the page cannot reserve space for the image`);
    }
    try {
      const stat = await fs.stat(path.join(root, "public", record.src.replace(/^\//, "")));
      if (!stat.size) problems.push(`${entry.venue_slug}: ${record.src} is empty`);
    } catch {
      problems.push(`${entry.venue_slug}: ${record.src} is missing from public/`);
    }
  }

  const registrySlugs = new Set(images.map((entry) => entry.venue_slug));
  for (const slug of Object.keys(manifest)) {
    if (!registrySlugs.has(slug)) problems.push(`${slug}: in ${MANIFEST_REL} but not in the registry, so nothing records its licence`);
  }

  // An orphan binary is an unattributed image sitting in the public directory.
  let files = [];
  try {
    files = (await fs.readdir(OUT_DIR)).filter((name) => name.endsWith(".webp"));
  } catch {
    if (images.length) problems.push("public/img/venues/ does not exist");
  }
  for (const file of files) {
    if (!registrySlugs.has(file.replace(/\.webp$/, ""))) {
      problems.push(`public/img/venues/${file} has no registry entry, so it is published with no attribution`);
    }
  }

  if (problems.length) {
    console.error(`[venue-images] FAILED:\n  - ${problems.join("\n  - ")}`);
    process.exit(1);
  }
  console.log(`[venue-images] OK: ${images.length} venue image(s), each with a file, dimensions and a complete credit.`);
}

function selfTest() {
  const assert = (cond, msg) => {
    if (!cond) {
      console.error(`FAIL ${msg}`);
      process.exit(1);
    }
    console.log(`PASS  ${msg}`);
  };

  assert(licencePermitsCommercialUse("CC0"), "CC0 permits commercial reuse");
  assert(licencePermitsCommercialUse("CC BY-SA 4.0"), "CC BY-SA permits commercial reuse");
  assert(!licencePermitsCommercialUse("CC BY-NC 4.0"), "a non-commercial licence is rejected");
  assert(!licencePermitsCommercialUse("Fair use"), "fair use is not a licence this lane accepts");
  assert(!licencePermitsCommercialUse(""), "a missing licence is rejected");

  assert(licenceRequiresAttribution("CC BY 2.0"), "CC BY requires attribution");
  assert(!licenceRequiresAttribution("CC0"), "CC0 does not require attribution");
  assert(creditLine({ author: "A Photographer", licence: "CC BY 4.0" }) === "Photo by A Photographer, CC BY 4.0", "an attributed licence names author and licence");
  assert(creditLine({ author: "", licence: "CC0" }) === "", "a credit with no author renders nothing rather than a broken line");

  const ok = [{
    venue_slug: "x-venue", alt: "A long enough description of the venue exterior for a screen reader.",
    credit: { title: "t.jpg", author: "A", licence: "CC0", licence_url: "https://example.org", source_url: "https://commons.wikimedia.org/wiki/File:t.jpg" },
    source_image_url: "https://upload.wikimedia.org/wikipedia/commons/a/ab/t.jpg"
  }];
  assert(registryProblems(ok).length === 0, "a complete entry passes");
  assert(registryProblems([{ ...ok[0], credit: { ...ok[0].credit, author: "" } }]).some((p) => /credit.author/.test(p)), "a missing author is caught");
  assert(registryProblems([{ ...ok[0], credit: { ...ok[0].credit, licence: "CC BY-NC 2.0" } }]).some((p) => /commercial/.test(p)), "a non-commercial licence is caught");
  assert(registryProblems([{ ...ok[0], alt: "The O2" }]).some((p) => /alt text/.test(p)), "alt text that only repeats the venue name is caught");
  assert(registryProblems([ok[0], ok[0]]).some((p) => /duplicate/.test(p)), "a duplicate slug is caught");
  assert(registryProblems([{ ...ok[0], source_image_url: "https://example.com/x.jpg" }]).some((p) => /upload.wikimedia.org/.test(p)), "an off-Commons source is caught");
  console.log("\n[venue-images] self-test passed");
}

const mode = process.argv[2] || "--check";
try {
  if (mode === "--self-test") selfTest();
  else if (mode === "--fetch") await fetchAll();
  else await check();
} catch (error) {
  // An incomplete registry is a licensing failure with a precise cause. Report
  // it the way --check reports its own findings, rather than as a stack trace
  // that buries which field is missing.
  console.error(`[venue-images] FAILED: ${error.message}`);
  process.exit(1);
}
