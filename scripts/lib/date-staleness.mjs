// Staleness checks for the daily site-health sensor (added 2026-10-10, owner
// ask: "no old dates"). Every date surface already filters against the request
// time; these checks prove it on the live output, so a regression, a cache that
// outlives its show, or copy that has aged out turns the sensor red instead of
// sitting on the site.
//
//   - pastStructuredEvents: an Event node in a page's JSON-LD whose startDate
//     has passed. Artist, city, venue and event pages describe only upcoming
//     shows, so any past node means a board kept a date it should have dropped.
//   - pastShowsInApi: /api/shows rows that have already started.
//   - llmsTxtStaleDates: an artist line in /llms.txt whose first upcoming date,
//     or whose "next public on-sale", is already behind us.
//   - staleDatedCopy: Markdown copy (blog and guides) that names a calendar date
//     which was still ahead when the copy was last written and has now passed.
//     That is the sentence most likely to read as a promise about the future
//     ("on sale on 2 October", "twelve nights remain to 31 October"). The copy
//     is never rewritten automatically: it is reported for an editor to put in
//     the past tense, and the post's `updated` date then clears the finding.
//
// Pure apart from the file reads in staleDatedCopy. `now` is always injectable.

import fs from "node:fs";
import path from "node:path";
import { showStartMs } from "../../functions/_upcoming.js";

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;
// Covers a price guide's edge copy (valid until its earliest show, plus at most
// an hour of stale-while-revalidate) and the crawl's own run time.
export const STALE_GRACE_MS = 2 * HOUR_MS;

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const MONTH_RE = MONTHS.join("|");
const SHORT_MONTHS = MONTHS.map((month) => month.slice(0, 3));

/**
 * When a date-only value ("2026-10-10") is over everywhere: the end of that
 * calendar day at UTC-12, the last zone to finish it.
 */
function dateOnlyEndMs(iso) {
  const midnight = Date.parse(`${iso}T00:00:00Z`);
  return Number.isFinite(midnight) ? midnight + DAY_MS + 12 * HOUR_MS : Number.NaN;
}

function startedAtMs(startDate) {
  const raw = String(startDate || "").trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(raw)) return dateOnlyEndMs(raw);
  return Date.parse(raw);
}

/** Event nodes in the page's JSON-LD whose start is already behind `now`. */
export function pastStructuredEvents(html, now = Date.now(), graceMs = STALE_GRACE_MS) {
  const past = [];
  const visit = (node) => {
    if (!node || typeof node !== "object") return;
    if (Array.isArray(node)) return node.forEach(visit);
    const types = [].concat(node["@type"] || []).map(String);
    if (types.some((type) => /Event$/.test(type)) && node.startDate) {
      const start = startedAtMs(node.startDate);
      if (Number.isFinite(start) && start < now - graceMs) past.push({ name: String(node.name || ""), startDate: String(node.startDate) });
    }
    Object.values(node).forEach(visit);
  };
  for (const match of String(html || "").matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      visit(JSON.parse(match[1]));
    } catch {
      // An unparseable block is reported by pageProblems already.
    }
  }
  return past;
}

/** /api/shows rows that have already started. */
export function pastShowsInApi(shows, now = Date.now(), graceMs = STALE_GRACE_MS) {
  return (Array.isArray(shows) ? shows : [])
    .filter((show) => {
      const start = showStartMs(show);
      return Number.isFinite(start) && start < now - graceMs;
    })
    .map((show) => ({ id: String(show?.id || ""), dateTimeISO: String(show?.dateTimeISO || show?.datetime_iso || "") }));
}

function shortDateIso(day, month, year) {
  const index = SHORT_MONTHS.indexOf(month);
  if (index < 0) return "";
  return `${year}-${String(index + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

/**
 * Artist lines in /llms.txt that state an upcoming date or on-sale that has
 * passed. Dates there are venue-local calendar days, so a day counts as past
 * only once it is over at UTC-12.
 */
export function llmsTxtStaleDates(text, now = Date.now(), graceMs = STALE_GRACE_MS) {
  const stale = [];
  for (const line of String(text || "").split("\n")) {
    const link = (line.match(/^- \[([^\]]+)\]/) || [])[1];
    if (!link) continue;
    const first = line.match(/upcoming dates? in \d+ cit(?:y|ies)(?:, | on )(\d{1,2}) ([A-Z][a-z]{2}) (\d{4})/);
    if (first) {
      const iso = shortDateIso(first[1], first[2], first[3]);
      if (iso && dateOnlyEndMs(iso) < now - graceMs) stale.push({ entry: link, detail: `first upcoming date ${iso} has passed` });
    }
    const onsale = line.match(/Next Ticketmaster public on-sale: (\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}) UTC/);
    if (onsale) {
      const at = Date.parse(`${onsale[1]}T${onsale[2]}:00Z`);
      if (Number.isFinite(at) && at < now - graceMs) stale.push({ entry: link, detail: `"next" on-sale ${onsale[1]} ${onsale[2]} UTC has passed` });
    }
  }
  return stale;
}

function frontmatter(source) {
  const match = String(source).match(/^---\n([\s\S]*?)\n---/);
  const fields = {};
  if (!match) return fields;
  for (const line of match[1].split("\n")) {
    const field = line.match(/^([a-z_]+):\s*["']?([^"'\n]*)["']?\s*$/);
    if (field) fields[field[1]] = field[2].trim();
  }
  return fields;
}

/** Full calendar dates named in a piece of copy, as YYYY-MM-DD. */
export function namedDates(text) {
  const dates = new Set();
  const pad = (value) => String(value).padStart(2, "0");
  const month = (name) => MONTHS.indexOf(name) + 1;
  for (const m of String(text).matchAll(new RegExp(`\\b(\\d{1,2})(?:st|nd|rd|th)?(?:\\s*[–-]\\s*\\d{1,2}(?:st|nd|rd|th)?)? (${MONTH_RE}),? (20\\d\\d)\\b`, "g"))) {
    dates.add(`${m[3]}-${pad(month(m[2]))}-${pad(m[1])}`);
  }
  for (const m of String(text).matchAll(new RegExp(`\\b(${MONTH_RE}) (\\d{1,2})(?:st|nd|rd|th)?,? (20\\d\\d)\\b`, "g"))) {
    dates.add(`${m[3]}-${pad(month(m[1]))}-${pad(m[2])}`);
  }
  return [...dates].sort();
}

/**
 * Published blog posts and guides that name a date which was still ahead when
 * the copy was last written and has since passed.
 *
 * "Last written" is the newest of the post's `date`/`updated` (blog) or
 * `date_published` and the provenance ledger's content_updated_at (guides).
 *
 * @param {{ root: string, today?: string }} options `today` is YYYY-MM-DD (UTC).
 */
export function staleDatedCopy({ root, today = new Date().toISOString().slice(0, 10) }) {
  let provenance = {};
  try {
    provenance = JSON.parse(fs.readFileSync(path.join(root, "data/content-provenance.json"), "utf8")).routes || {};
  } catch {
    provenance = {};
  }
  const findings = [];
  for (const [dir, route] of [["content/blog", "/blog"], ["content/guides", "/guides"]]) {
    let files = [];
    try {
      files = fs.readdirSync(path.join(root, dir)).filter((name) => name.endsWith(".md"));
    } catch {
      continue;
    }
    for (const file of files) {
      const source = fs.readFileSync(path.join(root, dir, file), "utf8");
      const fields = frontmatter(source);
      const routePath = `${route}/${file.replace(/\.md$/, "")}`;
      if (fields.status !== "published") continue;
      const writtenOn = [fields.date, fields.updated, fields.date_published, provenance[routePath]?.content_updated_at]
        .filter((value) => /^\d{4}-\d{2}-\d{2}$/.test(String(value || "")))
        .sort()
        .at(-1);
      if (!writtenOn) continue;
      const passed = namedDates(source).filter((date) => date > writtenOn && date < today);
      if (passed.length) findings.push({ path: routePath, file: `${dir}/${file}`, writtenOn, dates: passed });
    }
  }
  return findings;
}
