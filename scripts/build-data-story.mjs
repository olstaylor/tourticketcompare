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
// `--story city-prices` writes the same-tour-by-city post: one site's lowest
// listed price for each city's next date, for the biggest tracked tours. It
// reads the current provider_pricing_cache rows (D1 or `--rows`) and passes
// them through the live display gate in functions/api/shows.js with the
// wrangler.toml flags, so only figures a CTA button would print can appear.
// The one gate that lives in dashboard secrets (each site's tracking setup,
// without which no button renders) is read from production's /api/shows
// `providerAvailability`, or from `--availability <file.json>`; if neither
// answers, the build refuses.
//
//   node scripts/build-data-story.mjs [--year 2027] [--now 2026-10-16T12:00:00Z] [--check]
//   node scripts/build-data-story.mjs --story price-moves [--rows rows.json] [--check]
//   node scripts/build-data-story.mjs --story city-prices [--rows cache-rows.json] [--availability avail.json] [--check]

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
  PRICE_MOVES_SLUG,
  buildCityPriceFigures,
  cityPricesGate,
  renderCityPricesPost,
  CITY_PRICE_SLUG,
  CITY_PRICE_SQL
} from "./lib/data-stories.mjs";
import { TOURS_HUB_YEAR } from "../functions/_tours-hub.js";
import { isUpcomingShow } from "../functions/_upcoming.js";
import { PRICE_GUIDE_ARTISTS } from "../functions/_price-guides.js";
import { mapEventsToShows, attachApprovedMarketplacePrices } from "../functions/api/shows.js";
import { wranglerVars } from "./lib/event-indexability-audit.mjs";

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
if (!["tour-map", "price-moves", "city-prices"].includes(story) || !Number.isInteger(year) || !Number.isFinite(now)) {
  console.error("data-story: --story must be tour-map, price-moves or city-prices, --year a year and --now an ISO instant");
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

// Rows from `--rows <file>`, else from production D1 through wrangler.
async function readD1Rows(sql) {
  const rowsFile = argValue("--rows");
  if (rowsFile) return JSON.parse(await fs.readFile(path.resolve(rowsFile), "utf8"));
  const args = buildD1ReadArgs({ database: "tourticketcompare-demand", remote: true, statements: [{ sql }] });
  const { stdout } = await promisify(execFile)("npx", args, { cwd: root, maxBuffer: 1024 * 1024 * 50 });
  return JSON.parse(stdout)[0]?.results || [];
}

// The price-lane sites whose buttons production renders right now. Fails
// closed: no answer means no site, and the gate then refuses the story.
const AVAILABILITY_KEYS = { vividseats: "vivid-seats", ticketnetwork: "ticketnetwork", "stubhub-international": "stubhub-international" };
async function readProviderAvailability() {
  const file = argValue("--availability");
  let availability = {};
  try {
    availability = file
      ? JSON.parse(await fs.readFile(path.resolve(file), "utf8"))
      : (await (await fetch("https://tourticketcompare.com/api/shows?limit=1")).json()).providerAvailability || {};
  } catch (error) {
    console.error(`data-story: could not read provider availability (${error.message}); no site's prices will be used`);
  }
  return new Set(Object.entries(AVAILABILITY_KEYS).filter(([key]) => availability[key] === true).map(([, site]) => site));
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
} else if (story === "price-moves") {
  const figures = buildPriceMoveFigures(await readD1Rows(priceMovesSql(new Date(now).toISOString().slice(0, 10))), events, artists, { now });
  const { sites, reasons } = priceMovesGate(figures);
  console.log(`data-story: price moves ${figures.windowStart}..${figures.windowEnd}, ${sites.length} site(s) clear the gate`);
  stopIfGateFails(reasons);
  const existing = await existingPost(PRICE_MOVES_SLUG);
  await writeStory(
    PRICE_MOVES_SLUG,
    { text: renderPriceMovesPost(figures, existing), status: existing?.status === "published" ? "published" : "draft" },
    { "figures.json": `${JSON.stringify(figures, null, 2)}\n` }
  );
} else {
  const rows = await readD1Rows(CITY_PRICE_SQL);
  // An in-memory stand-in for DEMAND_DB that answers the gate's cache read
  // from the fetched rows; every other read (price checks) returns nothing.
  const db = {
    prepare: (sql) => ({
      bind: (...ids) => ({
        all: async () => {
          const wanted = new Set(ids.map(String));
          return { results: sql.includes("FROM provider_pricing_cache") ? rows.filter((row) => wanted.has(String(row.event_id))) : [] };
        }
      })
    })
  };
  const env = { ...wranglerVars(await fs.readFile(path.join(root, "wrangler.toml"), "utf8")), DEMAND_DB: db };
  // The gates in functions/api/shows.js read the wall clock; run them at the
  // build's instant so a replay with --now and --rows sees what it would have.
  const realNow = Date.now;
  Date.now = () => now;
  let shows;
  try {
    shows = await attachApprovedMarketplacePrices(mapEventsToShows(events.filter((event) => isUpcomingShow(event, now))), env);
  } finally {
    Date.now = realNow;
  }
  const availableSites = await readProviderAvailability();
  const figures = buildCityPriceFigures(shows, events, artists, { now, priceGuideArtists: new Set(PRICE_GUIDE_ARTISTS), availableSites });
  console.log(`data-story: city prices from ${rows.length} cache rows, ${figures.tours.length} tour(s) clear the gate`);
  stopIfGateFails(cityPricesGate(figures));
  const existing = await existingPost(CITY_PRICE_SLUG);
  await writeStory(
    CITY_PRICE_SLUG,
    { text: renderCityPricesPost(figures, existing), status: existing?.status === "published" ? "published" : "draft" },
    { "figures.json": `${JSON.stringify(figures, null, 2)}\n` }
  );
}
