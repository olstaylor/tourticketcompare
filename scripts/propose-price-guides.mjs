#!/usr/bin/env node
// Tour-launch queue for artist price guides (`/artists/<artist>/ticket-prices`).
//
// Reads the committed event and artist data, finds editorially indexable
// artists without a guide whose Ticketmaster public on-sales opened recently or
// open soon (functions/_price-guides.js → priceGuideLaunchCandidates), and
// rewrites the rolling `automation:price-guide-candidates` issue. Propose-only:
// it writes the issue and nothing else. Approving a candidate is adding its
// slug to PRICE_GUIDE_ARTISTS in functions/_price-guides.js.
//
//   node scripts/propose-price-guides.mjs              # print the issue body
//   node scripts/propose-price-guides.mjs --json       # print candidates as JSON
//   node scripts/propose-price-guides.mjs --issue      # rewrite the rolling issue
//   node scripts/propose-price-guides.mjs --self-test

import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  PRICE_GUIDE_ARTISTS,
  PRICE_GUIDE_LAUNCH_LOOKAHEAD_DAYS,
  PRICE_GUIDE_LAUNCH_LOOKBACK_DAYS,
  PRICE_GUIDE_LAUNCH_MIN_SHOWS,
  derivePriceGuide,
  priceGuideLaunchCandidates
} from "../functions/_price-guides.js";

export const LABEL = "automation:price-guide-candidates";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const INDEXABLE = "indexable_with_substantial_content";

function day(iso) {
  return String(iso || "").slice(0, 10);
}

export function renderIssue({ generatedAt, candidates, live }) {
  const lines = [
    `Price-guide candidates — ${generatedAt} (propose-only; nothing is published by this issue)`,
    "",
    `A candidate is an indexable artist with no price guide whose Ticketmaster public on-sale opened in the last ${PRICE_GUIDE_LAUNCH_LOOKBACK_DAYS} days or opens in the next ${PRICE_GUIDE_LAUNCH_LOOKAHEAD_DAYS}, for at least ${PRICE_GUIDE_LAUNCH_MIN_SHOWS} upcoming dates. To approve one, add its slug to \`PRICE_GUIDE_ARTISTS\` in \`functions/_price-guides.js\` in a PR; the page, sitemap entry, llms.txt line and cross-links follow from the data. One guide per artist, never one per tour.`,
    "",
    `### Would be indexed today (${candidates.filter((c) => c.wouldIndex).length})`,
    candidates.filter((c) => c.wouldIndex).map(candidateLine).join("\n") || "None.",
    "",
    `### Would render noindex today (${candidates.filter((c) => !c.wouldIndex).length})`,
    "_Approving these is safe but the page stays out of search until its gate passes; the reason codes say what is missing._",
    candidates.filter((c) => !c.wouldIndex).map((c) => `${candidateLine(c)} · held: ${c.reasons.join(", ")}`).join("\n") || "None.",
    "",
    `### Live guides (${live.length})`,
    live.map((g) => `- \`${g.artistSlug}\` → ${g.path} · ${g.showCount} dates, ${g.cityCount} cities · ${g.indexable ? "indexable" : `noindex (${g.reasons.join(", ") || "no upcoming dates"})`}`).join("\n") || "None."
  ];
  return lines.join("\n");
}

function candidateLine(c) {
  const window = day(c.firstOnsaleAt) === day(c.lastOnsaleAt) ? day(c.firstOnsaleAt) : `${day(c.firstOnsaleAt)} to ${day(c.lastOnsaleAt)}`;
  const name = String(c.name).replace(/([*_`\\])/g, "\\$1");
  return `- **${name}** (\`${c.slug}\`) · ${c.launchShowCount} dates with a public on-sale ${window} · ${c.showCount} upcoming dates in ${c.cityCount} cities · ${c.snapshotReadyCount} on a price-snapshot lane`;
}

export function buildReport({ events, artistsMeta, catalog, now = Date.now() }) {
  const names = new Map((catalog?.artists || []).map((artist) => [String(artist?.slug || "").trim(), String(artist?.name || "").trim()]));
  const indexable = (artistsMeta || [])
    .filter((artist) => artist?.indexing_status === INDEXABLE)
    .map((artist) => ({ slug: String(artist.slug || "").trim(), name: names.get(String(artist.slug || "").trim()) || artist.name || artist.slug }));
  return {
    generatedAt: new Date(now).toISOString().slice(0, 10),
    candidates: priceGuideLaunchCandidates(events, indexable, { now }),
    live: PRICE_GUIDE_ARTISTS.map((slug) => derivePriceGuide(events, slug, { now }))
  };
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

async function main() {
  const readJson = (file) => JSON.parse(readFileSync(path.join(root, file), "utf8"));
  const report = buildReport({
    events: readJson("public/data/events.json"),
    artistsMeta: readJson("public/data/artists.json"),
    catalog: readJson("public/data/catalog.json")
  });
  if (process.argv.includes("--json")) return console.log(JSON.stringify(report.candidates, null, 2));
  const body = renderIssue(report);
  if (!process.argv.includes("--issue")) return console.log(body);
  const open = await gh("GET", `/issues?state=open&labels=${encodeURIComponent(LABEL)}`);
  if (open[0]) await gh("PATCH", `/issues/${open[0].number}`, { body });
  else await gh("POST", "/issues", { title: "Price-guide candidates", body, labels: [LABEL] });
  console.log(`Price-guide candidates issue ${open[0] ? `#${open[0].number} updated` : "created"} (${report.candidates.length} candidate(s)).`);
}

function selfTest() {
  const now = Date.parse("2026-10-01T12:00:00Z");
  const event = (id, slug, city, iso, onsale, priced = true) => ({
    id,
    artist_slug: slug,
    city,
    country: "United Kingdom",
    venue: `${city} Arena`,
    datetime_iso: iso,
    public_onsale_at: onsale,
    ticketmaster_url: `https://www.ticketmaster.co.uk/event/${id}`,
    provider_links: priced ? { "vivid-seats": { verified: true, url: `https://www.vividseats.com/x/production/${id.length}` } } : {}
  });
  const launch = Array.from({ length: 7 }, (_, i) =>
    event(`l${i}`, "launcher", i % 2 ? "Leeds" : "Cardiff", `2027-06-0${i + 1}T19:00:00Z`, "2026-09-26T09:00:00Z")
  );
  const quiet = Array.from({ length: 7 }, (_, i) =>
    event(`q${i}`, "quiet", "York", `2027-06-0${i + 1}T19:00:00Z`, "2026-01-01T09:00:00Z")
  );
  const thin = Array.from({ length: 6 }, (_, i) =>
    event(`t${i}`, "thin", i % 2 ? "Bath" : "Hull", `2027-07-0${i + 1}T19:00:00Z`, "2026-11-01T09:00:00Z", false)
  );
  const report = buildReport({
    events: [...launch, ...quiet, ...thin],
    artistsMeta: ["launcher", "quiet", "thin", "oasis"].map((slug) => ({ slug, indexing_status: INDEXABLE })),
    catalog: { artists: [{ slug: "launcher", name: "The Launchers" }] },
    now
  });
  const slugs = report.candidates.map((c) => c.slug);
  const body = renderIssue(report);
  const checks = [
    [slugs.includes("launcher"), "a run of recent on-sales is a candidate"],
    [!slugs.includes("quiet"), "an on-sale months ago is not a launch"],
    [!slugs.includes("oasis"), "an artist with a guide is never re-proposed"],
    [report.candidates.find((c) => c.slug === "launcher")?.wouldIndex === true, "a multi-city priced launch would index"],
    [report.candidates.find((c) => c.slug === "thin")?.reasons.includes("below_price_coverage_threshold"), "an unpriced launch says why it would stay noindex"],
    [body.includes("**The Launchers** (`launcher`) · 7 dates with a public on-sale 2026-09-26"), "the issue names the artist and the launch"],
    [body.includes("### Live guides (1)"), "the live guides are listed"]
  ];
  const failed = checks.filter(([ok]) => !ok).map(([, message]) => message);
  console.log(`[price-guide-candidates] self-test: ${failed.length ? `FAILED — ${failed.join("; ")}` : `${checks.length} assertions passed`}`);
  return failed.length ? 1 : 0;
}

if (process.argv.includes("--self-test")) process.exit(selfTest());
main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
