#!/usr/bin/env node
// Build the yearly touring-map data story from committed event data.
//
// Writes three files, all for human review (docs/BLOG.md, "Automated data stories"):
//   content/blog/where-the-big-concert-tours-are-playing-in-<year>.md
//       the post; a new one is `status: draft`, an existing one keeps the
//       status and first date a person gave it
//   reports/data-stories/<slug>/figures.json   every number in the post
//   reports/data-stories/<slug>/press-release.md   quote-free draft, never sent
//
// Refuses (exit 1, nothing written) when the publish gate in
// scripts/lib/data-stories.mjs fails. No network, no AI calls, no prices.
//
// `--story price-moves` instead writes the 30-day price-moves post (counts
// only, no price figures, no press release). It reads the daily price rollup
// from production D1 through wrangler (CLOUDFLARE_API_TOKEN), or from a saved
// query result with `--rows <file.json>`.
//
//   node scripts/build-data-story.mjs [--year 2027] [--now 2026-10-16T12:00:00Z] [--check]
//   node scripts/build-data-story.mjs --story price-moves [--rows rows.json] [--check]

import fs from "node:fs/promises";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { fileURLToPath } from "node:url";
import { splitDocument } from "./lib/content-markdown.mjs";
import { buildD1ReadArgs } from "./lib/d1-read.mjs";
import {
  buildTourMapFigures,
  storyGate,
  renderTourMapPost,
  renderTourMapPressRelease,
  tourMapSlug,
  buildPriceMoveFigures,
  priceMovesGate,
  priceMovesSql,
  renderPriceMovesPost,
  PRICE_MOVES_SLUG
} from "./lib/data-stories.mjs";
import { TOURS_HUB_YEAR } from "../functions/_tours-hub.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function argValue(name) {
  const index = process.argv.indexOf(name);
  return index === -1 ? "" : String(process.argv[index + 1] || "");
}

const story = argValue("--story") || "tour-map";
const year = Number(argValue("--year") || TOURS_HUB_YEAR);
const nowArg = argValue("--now");
const now = nowArg ? Date.parse(nowArg) : Date.now();
const checkOnly = process.argv.includes("--check");
if (!["tour-map", "price-moves"].includes(story) || !Number.isInteger(year) || !Number.isFinite(now)) {
  console.error("data-story: --story must be tour-map or price-moves, --year a year and --now an ISO instant");
  process.exit(2);
}

const readJson = async (relative) => JSON.parse(await fs.readFile(path.resolve(root, relative), "utf8"));
const [events, artists] = await Promise.all([readJson("public/data/events.json"), readJson("public/data/artists.json")]);

async function existingPost(slug) {
  try {
    const { frontMatter } = splitDocument(await fs.readFile(path.join(root, "content/blog", `${slug}.md`), "utf8"));
    return { date: String(frontMatter.date || ""), status: String(frontMatter.status || "") };
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
    return null;
  }
}

function stopIfGateFails(reasons) {
  if (reasons.length) {
    console.error(`data-story: gate failed, nothing written:\n- ${reasons.join("\n- ")}`);
    process.exit(1);
  }
  if (checkOnly) {
    console.log("data-story: gate passed (--check, nothing written)");
    process.exit(0);
  }
}

async function writeStory(slug, post, files) {
  const reportDir = path.join(root, "reports/data-stories", slug);
  await fs.mkdir(reportDir, { recursive: true });
  await fs.writeFile(path.join(root, "content/blog", `${slug}.md`), post.text);
  for (const [name, text] of Object.entries(files)) await fs.writeFile(path.join(reportDir, name), text);
  console.log(`data-story: wrote content/blog/${slug}.md (${post.status}) and reports/data-stories/${slug}/`);
}

if (story === "tour-map") {
  const figures = buildTourMapFigures(events, artists, { year, now });
  console.log(
    `data-story: ${figures.showCount} shows, ${figures.artistCount} artists, ${figures.cityCount} cities, ${figures.countryCount} countries in ${year} (as of ${figures.asOf})`
  );
  stopIfGateFails(storyGate(figures, now));
  const slug = tourMapSlug(year);
  const existing = await existingPost(slug);
  await writeStory(
    slug,
    { text: renderTourMapPost(figures, existing), status: existing?.status === "published" ? "published" : "draft" },
    { "figures.json": `${JSON.stringify(figures, null, 2)}\n`, "press-release.md": renderTourMapPressRelease(figures) }
  );
} else {
  const rowsFile = argValue("--rows");
  let rows;
  if (rowsFile) {
    rows = JSON.parse(await fs.readFile(path.resolve(rowsFile), "utf8"));
  } else {
    const args = buildD1ReadArgs({
      database: "tourticketcompare-demand",
      remote: true,
      statements: [{ sql: priceMovesSql(new Date(now).toISOString().slice(0, 10)) }]
    });
    const { stdout } = await promisify(execFile)("npx", args, { cwd: root, maxBuffer: 1024 * 1024 * 20 });
    rows = JSON.parse(stdout)[0]?.results || [];
  }
  const figures = buildPriceMoveFigures(rows, events, artists, { now });
  const { sites, reasons } = priceMovesGate(figures);
  console.log(`data-story: price moves ${figures.windowStart}..${figures.windowEnd}, ${sites.length} site(s) clear the gate`);
  stopIfGateFails(reasons);
  const existing = await existingPost(PRICE_MOVES_SLUG);
  await writeStory(
    PRICE_MOVES_SLUG,
    { text: renderPriceMovesPost(figures, existing), status: existing?.status === "published" ? "published" : "draft" },
    { "figures.json": `${JSON.stringify(figures, null, 2)}\n` }
  );
}
