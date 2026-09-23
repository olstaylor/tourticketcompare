#!/usr/bin/env node
// Auto-promote (sanctioned path D, SAFE_PUBLISHING_RULES.md): turns the
// screen-passing rows of a same-job propose-onboarding-batch manifest into
// promoted artists. Each is written as a Shell (template copy built only from
// provider-API facts, owner decision 2026-09-23) and promoted in the same pass
// through promote-artists-batch.mjs's own writer, marked `promotion_source:
// "auto"`. Criterion 5 (title, description, uniqueness, placeholder) is checked
// on the rendered shell fields here; test:mvp then runs on the whole result.
//
//   node scripts/auto-promote.mjs --manifest <manifest.json> [--write] [--json <out.json>]
//   node scripts/auto-promote.mjs --check-out-against <old out.js>   (amendment 4 gate)
//   node scripts/auto-promote.mjs --self-test

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { evaluateCandidate, applyPlans } from "./promote-artists-batch.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const P = {
  artists: path.join(root, "public/data/artists.json"),
  catalog: path.join(root, "public/data/catalog.json"),
  out: path.join(root, "functions/api/out.js"),
  registry: path.join(root, "data/provider-identities.json"),
};
export const MAX_PER_DAY = 5;
export const MAX_PER_WEEK = 20;
const MAX_TITLE = 60;
const MAX_DESCRIPTION = 160;
const PLACEHOLDER = /\[OWNER COPY|placeholder|lorem|tbd|todo|example\.com/i;
const VTL_BLOCK = /const\s+VERIFIED_TICKET_LINKS\s*=\s*\{([\s\S]*?)\n\};/;
const GUIDES = [
  "how-to-compare-concert-ticket-prices",
  "when-is-the-best-time-to-buy-concert-tickets",
  "primary-vs-resale-concert-tickets",
  "how-to-avoid-overpaying-for-concert-tickets",
];
// Ticketmaster's catch-all genres say nothing about the act.
const usableGenre = (genre) => (genre && !/^(undefined|other|miscellaneous)$/i.test(genre) ? genre : "");

/** Shell records from API facts only: the name, the verbatim TM genre, and the site's standard copy. */
export function shellRecords(row, seoTitle) {
  const { name, slug } = row;
  const genre = usableGenre(row.ticketmaster?.genre);
  const descriptions = [
    `${name} tour dates and checked ticket links, updated as new shows are confirmed. Compare options, then confirm the final total with the provider.`,
    `${name} tour dates and checked ticket links. Confirm the final total with the provider.`,
  ];
  return {
    artist: { slug, name, short_description: genre ? `${genre} act listed on Ticketmaster.` : "Listed on Ticketmaster.", indexing_status: "review_required", verified_provider_count: 0, verified_providers: [], last_verified_at: null },
    catalogArtist: {
      slug,
      name,
      short_description: genre ? `${genre} act listed on Ticketmaster.` : "Listed on Ticketmaster.",
      image_alt: `${name} artist ticket information`,
      factual_summary: `${name} is listed by Ticketmaster${genre ? ` under ${genre}` : ""}. The dates on this page come from Ticketmaster and are checked daily.`,
      ticket_buying_notes: `These links go to the ${name} page on each ticket provider. Prices, fees and availability are set by the provider, so check the final total on their site before you pay.`,
      seo_title: seoTitle,
      meta_description: descriptions.find((d) => d.length <= MAX_DESCRIPTION) || "",
      faq: [
        { question: `Where can I find ${name} tour dates?`, answer: "Check the verified ticket platform links on this page for the latest tour announcements and availability. Ticket provider sites are the source for current dates and pricing." },
        { question: "Is TourTicketCompare official?", answer: "No. TourTicketCompare is independent and unofficial. We link to verified ticketing platforms so you can check current information directly with the provider." },
      ],
      related_guides: GUIDES,
    },
    tmLink: { link_id: `tm-artist-${slug}`, artist_slug: slug, tour_slug: null, provider: "ticketmaster", destination_type: "artist_page", affiliate_enabled: false, verified: false, public_enabled: false, market: "global", last_checked_at: null, disclosure_required: true },
  };
}

/** Criterion 5 on the shell fields. */
export function shellProblems(record, catalog) {
  const problems = [];
  const others = (catalog.artists || []).filter((a) => a.slug !== record.slug);
  if (!record.seo_title || record.seo_title.length > MAX_TITLE) problems.push("D5: title missing or over 60 characters");
  if (!record.meta_description) problems.push("D5: no description fits 160 characters");
  if (others.some((a) => a.seo_title === record.seo_title)) problems.push("D5: title already used");
  if (others.some((a) => a.meta_description === record.meta_description)) problems.push("D5: description already used");
  if (PLACEHOLDER.test(JSON.stringify(record))) problems.push("D5: placeholder text in shell copy");
  return problems;
}

/** How many more auto promotions today's run may make (5/day, 20/rolling week). */
export function remainingQuota(artists, today) {
  const since = (days) => new Date(Date.parse(`${today}T00:00:00Z`) - days * 86400000).toISOString().slice(0, 10);
  const auto = artists.filter((a) => a.promotion_source === "auto" && a.auto_promoted_at);
  const day = auto.filter((a) => a.auto_promoted_at >= today).length;
  const week = auto.filter((a) => a.auto_promoted_at > since(7)).length;
  return Math.max(0, Math.min(MAX_PER_DAY - day, MAX_PER_WEEK - week));
}

/** Amendment 4: the only change allowed in out.js is new VERIFIED_TICKET_LINKS entries appended to the block. */
export function outChangeIsAdditionsOnly(oldSource, newSource) {
  const before = oldSource.match(VTL_BLOCK);
  const after = newSource.match(VTL_BLOCK);
  if (!before || !after) return false;
  const outside = (src, m) => src.slice(0, m.index) + src.slice(m.index + m[0].length);
  if (outside(oldSource, before) !== outside(newSource, after)) return false;
  const added = after[1].slice(before[1].length);
  return after[1].startsWith(before[1]) && (added === "" || /^,\n/.test(added)) && !/[-]{2}|delete|\bverified:\s*false/.test(added);
}

export function planRun(manifest, data, today) {
  const promoted = [];
  const held = [];
  let quota = remainingQuota(data.artists, today);
  for (const row of manifest.artists || []) {
    if (row.exclusion || !row.screen?.eligible) continue;
    if (quota <= 0) { held.push({ slug: row.slug, reasons: ["daily/weekly cap reached"] }); continue; }
    const shell = shellRecords(row, row.screen.seo_title);
    const problems = shellProblems(shell.catalogArtist, data.catalog);
    if (data.artists.some((a) => a.slug === row.slug)) problems.push("slug already in artists.json");
    if (problems.length) { held.push({ slug: row.slug, reasons: problems }); continue; }
    data.artists.push(shell.artist);
    data.catalog.artists.push(shell.catalogArtist);
    if (row.ticketmaster) data.catalog.ticket_links.push(shell.tmLink);
    const evaluation = evaluateCandidate(row, { ...data, today });
    if (!evaluation.ok) {
      data.artists.pop();
      data.catalog.artists.pop();
      if (row.ticketmaster) data.catalog.ticket_links.pop();
      held.push({ slug: row.slug, reasons: evaluation.reasons });
      continue;
    }
    const applied = applyPlans([evaluation.plan], data);
    data.outSource = applied.outSource;
    Object.assign(evaluation.plan.artist, { promotion_source: "auto", auto_promoted_at: today });
    promoted.push({ slug: row.slug, name: row.name, seo_title: row.screen.seo_title, providers: evaluation.plan.providers });
    quota -= 1;
  }
  return { promoted, held };
}

async function main(argv) {
  const arg = (name) => (argv.includes(name) ? argv[argv.indexOf(name) + 1] : "");
  if (argv.includes("--check-out-against")) {
    const ok = outChangeIsAdditionsOnly(await fs.readFile(arg("--check-out-against"), "utf8"), await fs.readFile(P.out, "utf8"));
    console.log(ok ? "out.js: additions to VERIFIED_TICKET_LINKS only" : "out.js: changed outside VERIFIED_TICKET_LINKS additions — merge withheld");
    return ok ? 0 : 1;
  }
  const manifest = JSON.parse(await fs.readFile(arg("--manifest"), "utf8"));
  const [artists, catalog, registry, outSource] = await Promise.all([P.artists, P.catalog, P.registry].map((p) => fs.readFile(p, "utf8").then(JSON.parse)).concat(fs.readFile(P.out, "utf8")));
  const outModule = await import(pathToFileURL(P.out));
  const allowedHosts = {
    seatgeek: outModule.PROVIDERS?.seatgeek?.allowedDestinationHosts || [],
    ticketmaster: outModule.PROVIDERS?.ticketmaster?.allowedDestinationHosts || [],
  };
  const today = new Date().toISOString().slice(0, 10);
  const data = { artists, catalog, registry, outSource, allowedHosts };
  const result = planRun(manifest, data, today);
  for (const p of result.promoted) console.log(`  + ${p.slug} (${p.providers.join(", ")}) · ${p.seo_title}`);
  for (const h of result.held) console.log(`  - ${h.slug}: held (${h.reasons.join("; ")})`);
  if (arg("--json")) await fs.writeFile(arg("--json"), `${JSON.stringify(result, null, 2)}\n`);
  if (argv.includes("--write") && result.promoted.length) {
    registry.updated_at = today;
    await fs.writeFile(P.artists, `${JSON.stringify(artists, null, 2)}\n`);
    await fs.writeFile(P.catalog, `${JSON.stringify(catalog, null, 2)}\n`);
    await fs.writeFile(P.registry, `${JSON.stringify(registry, null, 2)}\n`);
    await fs.writeFile(P.out, data.outSource);
  }
  console.log(`${result.promoted.length} promoted, ${result.held.length} held${argv.includes("--write") ? "" : " (dry run)"}.`);
  return 0;
}

function selfTest() {
  const failures = [];
  const check = (cond, msg) => { if (!cond) failures.push(msg); };
  const out = 'const VERIFIED_TICKET_LINKS = {\n  "a:seatgeek": {\n    verified: true\n  }\n};\nexport const X = 1;\n';
  const row = (slug, extra = {}) => ({
    name: slug.toUpperCase(), slug,
    seatgeek: { performer_id: 7, url: `https://seatgeek.com/${slug}-tickets` },
    ticketmaster: { attraction_id: "K1", url: `https://www.ticketmaster.com/${slug}-tickets/artist/1`, genre: "Country" },
    screen: { eligible: true, seo_title: `${slug.toUpperCase()} Tickets & Tour Dates | TourTicketCompare` },
    ...extra,
  });
  const data = () => ({
    artists: [], catalog: { artists: [], ticket_links: [] }, registry: { artists: [] }, outSource: out,
    allowedHosts: { seatgeek: ["seatgeek.com"], ticketmaster: ["ticketmaster.com"] },
  });
  const d = data();
  const run = planRun({ artists: [row("one"), row("held", { screen: { eligible: false } }), row("two")] }, d, "2026-10-01");
  check(run.promoted.map((p) => p.slug).join() === "one,two", "screen-passing rows are promoted, others skipped");
  const one = d.artists.find((a) => a.slug === "one");
  check(one.promotion_source === "auto" && one.auto_promoted_at === "2026-10-01" && one.indexing_status === "indexable_with_substantial_content", "promoted record is marked auto");
  check(d.outSource.includes('"one:seatgeek"') && d.outSource.includes('"two:ticketmaster"'), "out.js gains VERIFIED_TICKET_LINKS entries");
  check(outChangeIsAdditionsOnly(out, d.outSource), "the promote writer's out.js change passes the additions-only gate");
  check(!outChangeIsAdditionsOnly(out, out.replace("X = 1", "X = 2")), "a change outside the block withholds the merge");
  check(!outChangeIsAdditionsOnly(out, out.replace("verified: true", "verified: false")), "an edited existing entry withholds the merge");
  const summary = d.catalog.artists[0].factual_summary;
  check(summary === "ONE is listed by Ticketmaster under Country. The dates on this page come from Ticketmaster and are checked daily.", "shell copy states only API facts");
  check(!/\d{4}|born|album|award/i.test(JSON.stringify(d.catalog.artists[0])), "shell copy carries no biographical claim");
  const dupe = planRun({ artists: [row("three", { screen: { eligible: true, seo_title: d.catalog.artists[0].seo_title } })] }, d, "2026-10-01");
  check(dupe.held[0]?.reasons.includes("D5: title already used"), "a duplicate title holds the candidate");
  const full = { artists: Array.from({ length: 5 }, (_, i) => ({ slug: `s${i}`, promotion_source: "auto", auto_promoted_at: "2026-10-01" })) };
  check(remainingQuota(full.artists, "2026-10-01") === 0 && remainingQuota(full.artists, "2026-10-02") === 5, "5 per day");
  const week = Array.from({ length: 20 }, (_, i) => ({ slug: `w${i}`, promotion_source: "auto", auto_promoted_at: `2026-09-${25 + (i % 5)}` }));
  check(remainingQuota(week, "2026-10-01") === 0 && remainingQuota(week, "2026-10-06") === 5, "20 per rolling week");
  check(shellRecords(row("x", { ticketmaster: { genre: "Undefined" } }), "t").catalogArtist.factual_summary.startsWith("X is listed by Ticketmaster."), "a catch-all genre is not stated");
  for (const f of failures) console.error(`  FAIL ${f}`);
  console.log(`[auto-promote] self-test: ${failures.length ? `${failures.length} failure(s)` : "all assertions passed"}`);
  return failures.length ? 1 : 0;
}

if (process.argv.includes("--self-test")) process.exit(selfTest());
process.exit(await main(process.argv.slice(2)));
