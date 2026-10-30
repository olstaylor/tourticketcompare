#!/usr/bin/env node
// New-tour detector. Finds artists whose first upcoming dates just landed in
// the committed event data and opens one tracking issue per tour, so the
// moment a tour appears is seen and the work that follows is listed, not
// remembered. Report-only: it writes no repository file, publishes nothing and
// spends no paid run. The issue says what already runs on its own and what
// still needs a human (the paid blog draft, date-alert send, social post).
//
// Every detection goes on one rolling digest issue (edited in place, so it
// does not notify). Artists the owner is watching also get an issue of their
// own: the focus artists, Beyoncé, and any act on the rumoured watchlist.
//
// A "new tour" is an artist with no upcoming dates in the data from before the
// run and MIN_DATES or more upcoming dates now (the same "first announcement,
// not a one-off festival slot" rule the artist watchlist uses). Upcoming uses
// the site's one definition (functions/_upcoming.js); events carrying a
// ticketmaster_status_code are skipped.
//
//   node scripts/detect-new-tours.mjs --since 2026-10-30T16:10:00Z            # print issue bodies
//   node scripts/detect-new-tours.mjs --since 2026-10-30T16:10:00Z --json     # print detections as JSON
//   node scripts/detect-new-tours.mjs --since 2026-10-30T16:10:00Z --issue    # open the tracking issues
//   node scripts/detect-new-tours.mjs --self-test
//
// "Before" is public/data/events.json at the last commit on the current branch
// at or before --since. The workflow passes the start of the Ticketmaster
// new-shows or auto-promote run that just finished.

import { execFileSync } from "node:child_process";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { isUpcomingShow } from "../functions/_upcoming.js";
import { FOCUS_ARTISTS } from "./lib/price-drop-posts.mjs";

export const LABEL = "automation:new-tour";
export const DIGEST_LABEL = "automation:new-tour-digest";
export const DIGEST_KEEP = 40;
// Acts that always get their own issue, besides the focus artists and the
// rumoured watchlist (owner call 2026-10-30: Beyoncé's tour is the launch).
export const WATCHED_ARTISTS = Object.freeze(["beyonce"]);
export const MIN_DATES = 3;
export const MAX_ISSUES_PER_RUN = 5;
const SITE = "https://tourticketcompare.com";
const REPO_URL = "https://github.com/olstaylor/tourticketcompare";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

const eventList = (data) => (Array.isArray(data) ? data : data?.events || []);

function upcomingByArtist(events, now) {
  const map = new Map();
  for (const event of eventList(events)) {
    if (!event?.artist_slug || event.ticketmaster_status_code) continue;
    if (!isUpcomingShow(event, now)) continue;
    const entry = map.get(event.artist_slug) || { name: event.artist_name || event.artist_slug, shows: [] };
    entry.shows.push(event);
    map.set(event.artist_slug, entry);
  }
  return map;
}

function mostCommon(values) {
  const counts = new Map();
  for (const v of values.filter(Boolean)) counts.set(v, (counts.get(v) || 0) + 1);
  return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0]?.[0] || "";
}

/** Artists with no upcoming dates before and minDates or more now, sorted by date count. */
export function detectNewTours({ before, after, now = Date.now(), minDates = MIN_DATES }) {
  const was = upcomingByArtist(before, now);
  const is = upcomingByArtist(after, now);
  const tours = [];
  for (const [slug, { name, shows }] of is) {
    if (shows.length < minDates || (was.get(slug)?.shows.length || 0) > 0) continue;
    const dates = shows.map((s) => String(s.datetime_iso).slice(0, 10)).sort();
    const cities = [...new Set(shows.map((s) => s.city).filter(Boolean))];
    tours.push({
      slug,
      name,
      dateCount: shows.length,
      cityCount: cities.length,
      cities: cities.slice(0, 6),
      countries: [...new Set(shows.map((s) => s.country).filter(Boolean))],
      firstDate: dates[0],
      lastDate: dates[dates.length - 1],
      tourName: mostCommon(shows.map((s) => s.tour_name)),
      withSeatGeek: shows.filter((s) => s.seatgeek_url).length,
      withVividSeats: shows.filter((s) => s.vividseats_url).length
    });
  }
  return tours.sort((a, b) => b.dateCount - a.dateCount || a.slug.localeCompare(b.slug));
}

/** True when the owner is watching this act: focus artist, named in the plan, or on the rumoured watchlist. */
export function isWatched(tour, watchlist = []) {
  const names = new Set(watchlist.filter((a) => a.reason === "rumoured").map((a) => String(a.name).toLowerCase()));
  return FOCUS_ARTISTS.includes(tour.slug) || WATCHED_ARTISTS.includes(tour.slug) || names.has(String(tour.name).toLowerCase());
}

export function marker(tour) {
  return `<!-- new-tour:${tour.slug}:${tour.firstDate.slice(0, 7)} -->`;
}

/** The markers already present in a list of issue bodies, so a tour is reported once. */
export function reportedMarkers(issues) {
  return new Set(issues.flatMap((issue) => String(issue.body || "").match(/<!-- new-tour:[a-z0-9-]+:\d{4}-\d{2} -->/g) || []));
}

const dayLabel = (iso) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

export function renderIssue(tour, { watch } = {}) {
  const rumour = watch
    ? [
        "",
        `**It was on the rumoured list.** Source recorded then: ${watch.source_url}. If a pre-announcement post exists for ${tour.name}, rewrite it as the real tour page and link the live dates. The rumoured page (${SITE}/tours/2027/rumoured) drops the act on its own now that it has a page.`
      ]
    : [];
  return [
    marker(tour),
    `${tour.name} has ${tour.dateCount} upcoming dates in the site's data and had none before the last data run.`,
    "",
    `- Dates: ${dayLabel(tour.firstDate)} to ${dayLabel(tour.lastDate)}${tour.tourName ? ` · tour name on the data: ${tour.tourName}` : " · no tour name on the data yet (left blank for human review)"}`,
    `- Where: ${tour.cityCount} ${tour.cityCount === 1 ? "city" : "cities"} (${tour.cities.join(", ")}${tour.cityCount > tour.cities.length ? ", ..." : ""}) · ${tour.countries.join(", ")}`,
    `- Resale links so far: SeatGeek on ${tour.withSeatGeek} of ${tour.dateCount} dates, Vivid Seats on ${tour.withVividSeats}`,
    `- Pages: ${SITE}/artists/${tour.slug} · ${SITE}/artists/${tour.slug}/presale`,
    ...rumour,
    "",
    "### Already automatic (no action)",
    "- Artist page indexable and in the sitemap once its dates are deployed; IndexNow is pinged after the deploy.",
    "- SeatGeek links at the next 18:00 UTC sync and Vivid Seats links at the next 18:30 UTC sync; price snapshots follow on those lanes.",
    "- Price guide, once it passes its gate (daily 11:05 UTC candidates report). City report once 8 or more cities are priced (daily 13:10 UTC).",
    "- Blog ideas on Monday and Thursday 11:20 UTC; price-drop drafts daily. Nothing here publishes a thin page: each keeps its own data gate.",
    "",
    "### Needs a human",
    `- [ ] Tour guide draft (a paid Claude run, so it waits for a click): [Run Blog article draft](${REPO_URL}/actions/workflows/blog-draft.yml) with mode \`live\` and artists \`${tour.slug}\`.`,
    `- [ ] Date alerts: [Run Artist date alerts](${REPO_URL}/actions/workflows/date-alerts.yml), preview first, then send. Needs Resend set up.`,
    "- [ ] One factual announcement post for socials (dates, cities, on-sale time, link; never presale codes). Ask Claude to draft it; nothing posts without approval of the exact text.",
    "- [ ] Event-page batch decision for this tour's first dates (a new staged batch in a reviewed PR; existing cohorts stay frozen).",
    "",
    "Close this issue when the list is done."
  ].join("\n");
}

const digestLine = (tour, detected) =>
  `- ${detected} · **${String(tour.name).replace(/([*_`\\])/g, "\\$1")}** (\`${tour.slug}\`) · ${tour.dateCount} dates in ${tour.cityCount} ${tour.cityCount === 1 ? "city" : "cities"}, ${tour.firstDate} to ${tour.lastDate} ${marker(tour)}`;

/** Digest body: the newest DIGEST_KEEP lines, one per tour, newest first. Earlier lines are read back from the issue. */
export function renderDigest(tours, detected, previous = "") {
  const old = String(previous).split("\n").filter((line) => /^- .*<!-- new-tour:[a-z0-9-]+:\d{4}-\d{2} -->$/.test(line));
  const known = new Set(old.map((line) => line.match(/<!-- new-tour:[^>]+-->/)[0]));
  const fresh = tours.filter((t) => !known.has(marker(t))).map((t) => digestLine(t, detected));
  const lines = [...fresh, ...old].slice(0, DIGEST_KEEP);
  return [
    "New tours detected. An artist appears here when it had no upcoming dates before a Ticketmaster new-shows or auto-promote run and has 3 or more after it. Report-only; the issue is edited in place. Acts the owner is watching also get their own issue.",
    "",
    lines.join("\n") || "None yet."
  ].join("\n");
}

function gitEventsAt(since) {
  const rev = execFileSync("git", ["rev-list", "-1", `--before=${since}`, "HEAD"], { cwd: root, encoding: "utf8" }).trim();
  if (!rev) throw new Error(`no commit at or before ${since} in the checked-out history; fetch more history`);
  const text = execFileSync("git", ["show", `${rev}:public/data/events.json`], { cwd: root, encoding: "utf8", maxBuffer: 256 * 1024 * 1024 });
  return { rev, events: JSON.parse(text) };
}

async function gh(method, apiPath, body) {
  const res = await fetch(`https://api.github.com/repos/${process.env.GITHUB_REPOSITORY}${apiPath}`, {
    method,
    headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, Accept: "application/vnd.github+json", "X-GitHub-Api-Version": "2022-11-28" },
    body: body ? JSON.stringify(body) : undefined
  });
  if (!res.ok) throw new Error(`GitHub API ${method} ${apiPath} ${res.status}`);
  return res.json();
}

function loadWatchlist() {
  try {
    return JSON.parse(readFileSync(path.join(root, "data/artist-watchlist.json"), "utf8")).artists || [];
  } catch {
    return [];
  }
}

const watchEntry = (watchlist, name) =>
  watchlist.find((a) => a.reason === "rumoured" && a.source_url && String(a.name).toLowerCase() === String(name).toLowerCase());

function argValue(flag) {
  const i = process.argv.indexOf(flag);
  return i > -1 ? process.argv[i + 1] : undefined;
}

async function main() {
  const since = argValue("--since");
  if (!since || Number.isNaN(Date.parse(since))) throw new Error("--since <ISO time> is required");
  const { rev, events: before } = gitEventsAt(since);
  const after = JSON.parse(readFileSync(path.join(root, "public/data/events.json"), "utf8"));
  const tours = detectNewTours({ before, after, minDates: Number(argValue("--min-dates")) || MIN_DATES });
  console.error(`Compared events.json at ${rev.slice(0, 8)} (before ${since}) with the working tree: ${tours.length} new tour(s).`);
  const watchlist = loadWatchlist();
  const watched = tours.filter((t) => isWatched(t, watchlist));
  if (process.argv.includes("--json")) return console.log(JSON.stringify(tours.map((t) => ({ ...t, watched: watched.includes(t) })), null, 2));
  if (!process.argv.includes("--issue")) {
    return console.log(
      [renderDigest(tours, new Date().toISOString().slice(0, 10)), ...watched.map((t) => renderIssue(t, { watch: watchEntry(watchlist, t.name) }))].join("\n\n-----\n\n")
    );
  }
  if (!tours.length) return console.log("No new tours.");
  const seen = reportedMarkers(await gh("GET", `/issues?state=all&labels=${encodeURIComponent(LABEL)}&per_page=100`));
  const fresh = watched.filter((t) => !seen.has(marker(t)));
  for (const tour of fresh.slice(0, MAX_ISSUES_PER_RUN)) {
    const issue = await gh("POST", "/issues", {
      title: `New tour detected: ${tour.name} (${tour.dateCount} dates)`,
      body: renderIssue(tour, { watch: watchEntry(watchlist, tour.name) }),
      labels: [LABEL]
    });
    console.log(`Opened #${issue.number} for ${tour.slug}.`);
  }
  const digests = await gh("GET", `/issues?state=open&labels=${encodeURIComponent(DIGEST_LABEL)}`);
  const body = renderDigest(tours, new Date().toISOString().slice(0, 10), digests[0]?.body);
  if (digests[0]) await gh("PATCH", `/issues/${digests[0].number}`, { body });
  else await gh("POST", "/issues", { title: "New tours detected", body, labels: [DIGEST_LABEL] });
  console.log(`${tours.length} new tour(s), ${fresh.length} own issue(s) for watched acts, digest ${digests[0] ? "updated" : "created"}.`);
}

function selfTest() {
  const now = Date.parse("2026-10-30T12:00:00Z");
  const show = (slug, name, city, iso, extra = {}) => ({
    id: `${slug}-${city}-${iso}`,
    artist_slug: slug,
    artist_name: name,
    city,
    country: "United States Of America",
    venue: `${city} Arena`,
    datetime_iso: iso,
    tour_name: "",
    ...extra
  });
  const run = (slug, name, n, extra) =>
    Array.from({ length: n }, (_, i) => show(slug, name, ["Austin", "Boston", "Chicago", "Denver", "Miami", "Seattle"][i % 6], `2027-03-0${i + 1}T20:00:00Z`, extra));
  const past = [show("old", "Old Hat", "Austin", "2026-05-01T20:00:00Z"), show("old", "Old Hat", "Boston", "2026-05-02T20:00:00Z"), show("old", "Old Hat", "Denver", "2026-05-03T20:00:00Z")];
  const before = [...past, ...run("steady", "Steady Tour", 4), ...run("festival", "Festival Act", 1)];
  const after = [
    ...before,
    ...run("brandnew", "Brand New Tour", 5, { tour_name: "The Return", seatgeek_url: "https://seatgeek.com/x" }),
    ...Array.from({ length: 3 }, (_, i) => show("old", "Old Hat", "Chicago", `2027-04-0${i + 1}T20:00:00Z`)),
    ...run("festival", "Festival Act", 1).map((s) => ({ ...s, id: "festival-2", city: "Reno", datetime_iso: "2027-03-09T20:00:00Z" })),
    ...run("cancelled", "Cancelled Act", 4, { ticketmaster_status_code: "cancelled" })
  ];
  const tours = detectNewTours({ before, after, now });
  const slugs = tours.map((t) => t.slug);
  const checks = [
    [slugs.join() === "brandnew,old", `flags a brand-new tour and an artist whose only past dates ended, got ${slugs.join()}`],
    [!slugs.includes("steady"), "an artist that already had upcoming dates is not new"],
    [!slugs.includes("festival"), "one or two dates is a slot, not a tour"],
    [!slugs.includes("cancelled"), "events carrying a Ticketmaster status code are skipped"],
    [tours[0].dateCount === 5 && tours[0].tourName === "The Return" && tours[0].withSeatGeek === 5, "counts dates, tour name and resale links"],
    [detectNewTours({ before: after, after, now }).length === 0, "nothing new when nothing changed"],
    [detectNewTours({ before: [], after, now, minDates: 5 }).map((t) => t.slug).join() === "brandnew", "minDates raises the bar"]
  ];
  const body = renderIssue(tours[0], { watch: { name: "Brand New Tour", source_url: "https://example.com/report" } });
  const plain = renderIssue(tours[0]);
  checks.push(
    [body.startsWith(marker(tours[0])) && marker(tours[0]) === "<!-- new-tour:brandnew:2027-03 -->", "the issue opens with its dedupe marker"],
    [reportedMarkers([{ body }, { body: "no marker" }]).has(marker(tours[0])), "a reported tour is recognised from an earlier issue"],
    [body.includes("It was on the rumoured list") && !plain.includes("rumoured list"), "rumoured context only when the act was on the watchlist"],
    [body.includes("blog-draft.yml") && body.includes("`brandnew`") && body.includes("[ ]"), "lists the paid blog run, with the slug, as a human step"],
    [!/cheapest|lowest price|from \$|presale code:/i.test(body), "no price or ranking claims, no presale codes"]
  );
  const digest = renderDigest(tours, "2026-10-30");
  const again = renderDigest([...tours, { ...tours[0], slug: "later", name: "Later Act" }], "2026-10-31", digest);
  checks.push(
    [digest.includes("**Brand New Tour**") && digest.includes("<!-- new-tour:old:2027-04 -->"), "the digest lists every detection"],
    [again.split("\n").filter((l) => l.startsWith("- ")).length === 3 && again.indexOf("Later Act") < again.indexOf("Brand New Tour"), "the digest keeps earlier lines, adds only new tours, newest first"],
    [renderDigest(Array.from({ length: 60 }, (_, i) => ({ ...tours[0], slug: `a${i}`, name: `A${i}` })), "d").split("\n").filter((l) => l.startsWith("- ")).length === DIGEST_KEEP, "the digest is capped"],
    [isWatched({ slug: "beyonce", name: "Beyoncé" }) && isWatched({ slug: "metallica", name: "Metallica" }) && isWatched({ slug: "zed", name: "Zed" }, [{ name: "ZED", reason: "rumoured" }]), "focus artists, Beyoncé and rumoured acts are watched"],
    [!isWatched({ slug: "zed", name: "Zed" }, [{ name: "Zed", reason: "between-tours" }]) && !isWatched({ slug: "brandnew", name: "Brand New Tour" }), "other acts only reach the digest"]
  );
  for (const [ok, message] of checks) if (!ok) throw new Error(`detect-new-tours self-test: ${message}`);
  console.log(`detect-new-tours: ${checks.length} checks passed`);
}

if (process.argv.includes("--self-test")) selfTest();
else if (process.argv[1] === fileURLToPath(import.meta.url)) await main();
