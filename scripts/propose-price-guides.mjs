#!/usr/bin/env node
// Tour-launch queue for artist price guides (`/artists/<artist>/ticket-prices`).
//
// Reads the committed event and artist data, finds editorially indexable
// artists without a guide whose Ticketmaster public on-sales opened recently or
// open soon (functions/_price-guides.js → priceGuideLaunchCandidates), and
// rewrites the rolling `automation:price-guide-candidates` issue. Qualifying
// guides go live on their own since 2026-10-17; adding a slug to
// PRICE_GUIDE_ARTISTS in functions/_price-guides.js keeps a guide live between
// tours. `--apply` pins every artist that would be indexed today (owner
// decision 2026-10-17); the gate itself is unchanged, so a launch that would
// render noindex is still only listed.
//
//   node scripts/propose-price-guides.mjs              # print the issue body
//   node scripts/propose-price-guides.mjs --json       # print candidates as JSON
//   node scripts/propose-price-guides.mjs --issue      # rewrite the rolling issue
//   node scripts/propose-price-guides.mjs --apply      # add approvable slugs to the registry
//   node scripts/propose-price-guides.mjs --self-test

import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  PRICE_GUIDE_ARTISTS,
  PRICE_GUIDE_LAUNCH_LOOKAHEAD_DAYS,
  PRICE_GUIDE_LAUNCH_LOOKBACK_DAYS,
  PRICE_GUIDE_LAUNCH_MIN_SHOWS,
  derivePriceGuide,
  priceGuideLaunchCandidates,
  priceGuideRegistered
} from "../functions/_price-guides.js";

export const LABEL = "automation:price-guide-candidates";
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const INDEXABLE = "indexable_with_substantial_content";
const REGISTRY_FILE = "functions/_price-guides.js";

function day(iso) {
  return String(iso || "").slice(0, 10);
}

export function renderIssue({ generatedAt, candidates, ready = [], live }) {
  const lines = [
    `Price-guide candidates — ${generatedAt} (report-only; guides that pass the gate are already live)`,
    "",
    `A candidate is an indexable artist with no price guide whose Ticketmaster public on-sale opened in the last ${PRICE_GUIDE_LAUNCH_LOOKBACK_DAYS} days or opens in the next ${PRICE_GUIDE_LAUNCH_LOOKAHEAD_DAYS}, for at least ${PRICE_GUIDE_LAUNCH_MIN_SHOWS} upcoming dates. Since 2026-10-17 a guide goes live on its own once its data clears the guide gate, so the "live automatically" sections below need no action. Adding a slug to \`PRICE_GUIDE_ARTISTS\` in \`functions/_price-guides.js\` keeps a guide live between tours. One guide per artist, never one per tour.`,
    "",
    `### Launch, live automatically today (${candidates.filter((c) => c.wouldIndex).length})`,
    candidates.filter((c) => c.wouldIndex).map(candidateLine).join("\n") || "None.",
    "",
    `### Launch, short of the guide gate today (${candidates.filter((c) => !c.wouldIndex).length})`,
    "_These go live on their own once the gate passes; until then the URL redirects to the artist page. The reason codes say what is missing._",
    candidates.filter((c) => !c.wouldIndex).map((c) => `${candidateLine(c)} · held: ${c.reasons.join(", ")}`).join("\n") || "None.",
    "",
    `### Live automatically without a launch (${ready.length})`,
    "_Indexable artists outside the list whose dates pass the guide's own gate (enough dates, cities and price-snapshot coverage), so their guide is live._",
    ready.map((g) => `- **${String(g.name).replace(/([*_`\\])/g, "\\$1")}** (\`${g.artistSlug}\`) · ${g.showCount} upcoming dates in ${g.cityCount} cities · ${g.snapshotReadyCount} on a price-snapshot lane`).join("\n") || "None.",
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
  const candidates = priceGuideLaunchCandidates(events, indexable, { now });
  const launching = new Set(candidates.map((c) => c.slug));
  const ready = indexable
    .filter((artist) => artist.slug && !priceGuideRegistered(artist.slug) && !launching.has(artist.slug))
    .map((artist) => ({ ...derivePriceGuide(events, artist.slug, { now }), name: artist.name }))
    .filter((guide) => guide.indexable)
    .sort((a, b) => b.showCount - a.showCount || a.artistSlug.localeCompare(b.artistSlug));
  return {
    generatedAt: new Date(now).toISOString().slice(0, 10),
    candidates,
    ready,
    live: PRICE_GUIDE_ARTISTS.map((slug) => derivePriceGuide(events, slug, { now }))
  };
}

// Slugs `--apply` approves: launch candidates that would index today, then
// gate-passing artists without a launch, in the order the issue lists them.
export function approvableSlugs(report) {
  return [...report.candidates.filter((c) => c.wouldIndex).map((c) => c.slug), ...report.ready.map((g) => g.artistSlug)];
}

// Appends slugs to the PRICE_GUIDE_ARTISTS literal with a dated comment, the
// same shape the hand-approved batches use. Returns the source unchanged when
// there is nothing new to add, and throws if the literal cannot be found.
export function addRegistrySlugs(source, slugs, date) {
  const start = source.indexOf("export const PRICE_GUIDE_ARTISTS = Object.freeze([");
  const end = start < 0 ? -1 : source.indexOf("\n]);", start);
  if (start < 0 || end < 0) throw new Error(`PRICE_GUIDE_ARTISTS not found in ${REGISTRY_FILE}`);
  const existing = new Set([...source.slice(start, end).matchAll(/"([a-z0-9-]+)"/g)].map((m) => m[1]));
  const fresh = [...new Set(slugs)].filter((slug) => /^[a-z0-9-]+$/.test(slug) && !existing.has(slug));
  if (!fresh.length) return source;
  const block = [
    `  // ${date}: approved automatically by \`price-guides:propose --apply\` (each`,
    "  // would be indexed today under the unchanged guide gate).",
    fresh.map((slug) => `  "${slug}"`).join(",\n")
  ].join("\n");
  return `${source.slice(0, end)},\n${block}${source.slice(end)}`;
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
  if (process.argv.includes("--apply")) {
    const file = path.join(root, REGISTRY_FILE);
    const source = readFileSync(file, "utf8");
    const slugs = approvableSlugs(report);
    const next = addRegistrySlugs(source, slugs, report.generatedAt);
    if (next === source) return console.log("No price guide to approve.");
    writeFileSync(file, next);
    return console.log(`Approved ${slugs.length} price guide(s): ${slugs.join(", ")}`);
  }
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
    // Two listed-price lanes: comparison data the price-guide gate requires.
    provider_links: priced
      ? {
          "vivid-seats": { verified: true, url: `https://www.vividseats.com/x/production/${id.length}` },
          ticketnetwork: { verified: true, url: `https://www.ticketnetwork.com/tickets/${id.length}` }
        }
      : {}
  });
  const launch = Array.from({ length: 7 }, (_, i) =>
    event(`l${i}`, "launcher", i % 2 ? "Leeds" : "Cardiff", `2027-06-0${i + 1}T19:00:00Z`, "2026-09-26T09:00:00Z")
  );
  const quiet = Array.from({ length: 7 }, (_, i) =>
    event(`q${i}`, "quiet", i % 2 ? "York" : "Derby", `2027-06-0${i + 1}T19:00:00Z`, "2026-01-01T09:00:00Z")
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
    [report.ready.some((g) => g.artistSlug === "quiet") && body.includes("(`quiet`) · 7 upcoming dates"), "a gate-passing artist without a launch is still proposed"],
    [!report.ready.some((g) => g.artistSlug === "launcher" || g.artistSlug === "thin"), "launch candidates and thin artists are not repeated as ready"],
    [!slugs.includes("oasis"), "an artist with a guide is never re-proposed"],
    [report.candidates.find((c) => c.slug === "launcher")?.wouldIndex === true, "a multi-city priced launch would index"],
    [report.candidates.find((c) => c.slug === "thin")?.reasons.includes("below_price_coverage_threshold"), "an unpriced launch says why it would stay noindex"],
    [body.includes("**The Launchers** (`launcher`) · 7 dates with a public on-sale 2026-09-26"), "the issue names the artist and the launch"],
    [body.includes(`### Live guides (${PRICE_GUIDE_ARTISTS.length})`) &&
      PRICE_GUIDE_ARTISTS.every((slug) => body.includes(`\`${slug}\` → /artists/${slug}/ticket-prices`)),
      "every approved guide is listed"]
  ];
  const registry = 'export const PRICE_GUIDE_ARTISTS = Object.freeze([\n  "oasis",\n  "amble"\n]);\n';
  const applied = addRegistrySlugs(registry, ["quiet", "oasis", "launcher"], "2026-10-01");
  checks.push(
    [JSON.stringify(approvableSlugs(report)) === JSON.stringify(["launcher", "quiet"]), "--apply approves indexable launches and ready artists only"],
    [applied.includes('  "amble",\n  // 2026-10-01: approved automatically') && applied.endsWith('  "quiet",\n  "launcher"\n]);\n'), "--apply appends new slugs as a dated, comma-correct block"],
    [(applied.match(/"oasis"/g) || []).length === 1, "--apply never repeats a registered slug"],
    [addRegistrySlugs(registry, ["oasis"], "2026-10-01") === registry, "--apply leaves the registry untouched when nothing is new"]
  );
  const failed = checks.filter(([ok]) => !ok).map(([, message]) => message);
  console.log(`[price-guide-candidates] self-test: ${failed.length ? `FAILED — ${failed.join("; ")}` : `${checks.length} assertions passed`}`);
  return failed.length ? 1 : 0;
}

if (process.argv.includes("--self-test")) process.exit(selfTest());
main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
