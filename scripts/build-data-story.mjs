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
//   node scripts/build-data-story.mjs [--year 2027] [--now 2026-10-16T12:00:00Z] [--check]

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { splitDocument } from "./lib/content-markdown.mjs";
import {
  buildTourMapFigures,
  storyGate,
  renderTourMapPost,
  renderTourMapPressRelease,
  tourMapSlug
} from "./lib/data-stories.mjs";
import { TOURS_HUB_YEAR } from "../functions/_tours-hub.js";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function argValue(name) {
  const index = process.argv.indexOf(name);
  return index === -1 ? "" : String(process.argv[index + 1] || "");
}

const year = Number(argValue("--year") || TOURS_HUB_YEAR);
const nowArg = argValue("--now");
const now = nowArg ? Date.parse(nowArg) : Date.now();
const checkOnly = process.argv.includes("--check");
if (!Number.isInteger(year) || !Number.isFinite(now)) {
  console.error("data-story: --year must be a year and --now an ISO instant");
  process.exit(2);
}

const readJson = async (relative) => JSON.parse(await fs.readFile(path.join(root, relative), "utf8"));
const [events, artists] = await Promise.all([readJson("public/data/events.json"), readJson("public/data/artists.json")]);

const figures = buildTourMapFigures(events, artists, { year, now });
const reasons = storyGate(figures, now);
console.log(
  `data-story: ${figures.showCount} shows, ${figures.artistCount} artists, ${figures.cityCount} cities, ${figures.countryCount} countries in ${year} (as of ${figures.asOf})`
);
if (reasons.length) {
  console.error(`data-story: gate failed, nothing written:\n- ${reasons.join("\n- ")}`);
  process.exit(1);
}
if (checkOnly) {
  console.log("data-story: gate passed (--check, nothing written)");
  process.exit(0);
}

const slug = tourMapSlug(year);
const postPath = path.join(root, "content/blog", `${slug}.md`);
let existing = null;
try {
  const { frontMatter } = splitDocument(await fs.readFile(postPath, "utf8"));
  existing = { date: String(frontMatter.date || ""), status: String(frontMatter.status || "") };
} catch (error) {
  if (error.code !== "ENOENT") throw error;
}

const reportDir = path.join(root, "reports/data-stories", slug);
await fs.mkdir(reportDir, { recursive: true });
await fs.writeFile(postPath, renderTourMapPost(figures, existing));
await fs.writeFile(path.join(reportDir, "figures.json"), `${JSON.stringify(figures, null, 2)}\n`);
await fs.writeFile(path.join(reportDir, "press-release.md"), renderTourMapPressRelease(figures));
console.log(`data-story: wrote content/blog/${slug}.md (${existing?.status === "published" ? "published" : "draft"}) and reports/data-stories/${slug}/`);
