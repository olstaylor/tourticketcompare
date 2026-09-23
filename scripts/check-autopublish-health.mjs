#!/usr/bin/env node
// Rollback sensor for auto-promoted artists. Demotes only on the owner's three
// failures (amendment 3): denylist, a link answering 404/410 twice (blocks and
// 5xx are inconclusive), or a duplicate indexable <title>. Zero upcoming dates
// is never a finding. Semantics: docs/OPERATIONS.md → autopublish-health.yml.
//
//   node scripts/check-autopublish-health.mjs --json <out.json>
//   node scripts/check-autopublish-health.mjs --self-test

import { existsSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
export const MAX_DEMOTIONS = 5;
const readJson = (rel, fallback) => (existsSync(path.join(root, rel)) ? JSON.parse(readFileSync(path.join(root, rel), "utf8")) : fallback);

/** Pure: findings for every live auto-promoted artist. */
export function evaluate({ artists, registry, denylist, deadLinks, titles }) {
  const denied = {
    slugs: new Set(denylist.slugs || []),
    tm: new Set((denylist.ticketmaster_attraction_ids || []).map(String)),
    sg: new Set((denylist.seatgeek_performer_ids || []).map(String)),
  };
  const findings = [];
  for (const artist of artists) {
    if (artist.promotion_source !== "auto" || artist.demoted) continue;
    const identity = registry.find((row) => row.slug === artist.slug) || {};
    const reasons = [];
    if (
      denied.slugs.has(artist.slug) ||
      denied.tm.has(String(identity.ticketmaster_attraction_id || "")) ||
      denied.sg.has(String(identity.seatgeek_performer_id || ""))
    ) reasons.push("denylist");
    for (const url of deadLinks[artist.slug] || []) reasons.push(`dead_link ${url}`);
    const own = titles.get(`/artists/${artist.slug}`);
    if (own?.indexable) {
      const clash = [...titles].find(([p, page]) => p !== `/artists/${artist.slug}` && page.indexable && page.title === own.title);
      if (clash) reasons.push(`duplicate_title with ${clash[0]}`);
    }
    if (reasons.length) findings.push({ slug: artist.slug, reason: reasons.join("; ") });
  }
  return findings;
}

async function probe(url) {
  try {
    const res = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(15000), headers: { "User-Agent": "TourTicketCompare-link-check" } });
    return res.status;
  } catch {
    return 0;
  }
}

async function main() {
  const artists = readJson("public/data/artists.json", []);
  const auto = artists.filter((artist) => artist.promotion_source === "auto" && !artist.demoted);
  const outIndex = process.argv.indexOf("--json");
  const outFile = outIndex === -1 ? "" : process.argv[outIndex + 1];
  let findings = [];
  if (auto.length) {
    const catalog = readJson("public/data/catalog.json", { ticket_links: [] });
    const deadLinks = {};
    for (const artist of auto) {
      for (const link of catalog.ticket_links.filter((l) => l.artist_slug === artist.slug && l.public_enabled && l.url)) {
        const first = await probe(link.url);
        if (first !== 404 && first !== 410) continue;
        await new Promise((resolve) => setTimeout(resolve, 5000));
        const second = await probe(link.url);
        if (second === 404 || second === 410) (deadLinks[artist.slug] ||= []).push(link.url);
      }
    }
    const { loadSiteFixture, crawlRoutes } = await import("./lib/route-crawl.mjs");
    const site = await loadSiteFixture(root);
    const titles = await crawlRoutes(site.paths.allPaths, site.renderRoute);
    findings = evaluate({
      artists,
      registry: readJson("data/provider-identities.json", { artists: [] }).artists || [],
      denylist: readJson("data/artist-denylist.json", {}),
      deadLinks,
      titles,
    });
  }
  console.log(`${auto.length} live auto-promoted artist(s); ${findings.length} to demote`);
  for (const f of findings) console.log(`  ${f.slug}: ${f.reason}`);
  if (outFile) writeFileSync(outFile, `${JSON.stringify(findings, null, 2)}\n`);
  if (findings.length > MAX_DEMOTIONS) {
    console.error(`More than ${MAX_DEMOTIONS} demotions in one run looks like a sensor fault; demoting nothing.`);
    if (outFile) writeFileSync(outFile, "[]\n");
    return 1;
  }
  return 0;
}

function selfTest() {
  const artists = ["clean", "denied", "by-id", "dead", "twin"].map((slug) => ({ slug, promotion_source: "auto" }))
    .concat({ slug: "owner" }, { slug: "gone", promotion_source: "auto", demoted: { reason: "x" } });
  const page = (title, indexable = true) => ({ title, indexable });
  const titles = new Map([
    ["/artists/clean", page("Clean Tickets")],
    ["/artists/twin", page("Birmingham Tickets")],
    ["/cities/birmingham", page("Birmingham Tickets")],
    ["/artists/owner", page("Owner Tickets")],
    ["/artists/denied", page("Owner Tickets", false)],
  ]);
  const findings = evaluate({
    artists,
    registry: [{ slug: "by-id", seatgeek_performer_id: 42 }],
    denylist: { slugs: ["denied", "owner"], seatgeek_performer_ids: [42] },
    deadLinks: { dead: ["https://seatgeek.com/dead-tickets"] },
    titles,
  });
  const got = Object.fromEntries(findings.map((f) => [f.slug, f.reason]));
  const failures = [];
  const check = (cond, msg) => { if (!cond) failures.push(msg); };
  check(!got.clean, "a clean artist is not demoted");
  check(got.denied === "denylist" && got["by-id"] === "denylist", "denylist matches by slug and by provider id");
  check(got.dead?.startsWith("dead_link"), "a confirmed dead link demotes");
  check(got.twin === "duplicate_title with /cities/birmingham", "a duplicate indexable title demotes");
  check(!got.owner && !got.gone, "owner-promoted and already-demoted artists are out of scope");
  check(!Object.values(got).some((r) => /upcoming|dates/.test(r)), "zero upcoming dates is never a reason");
  for (const f of failures) console.error(`  FAIL ${f}`);
  console.log(`[autopublish-health] self-test: ${failures.length ? `${failures.length} failure(s)` : "all assertions passed"}`);
  return failures.length ? 1 : 0;
}

if (process.argv.includes("--self-test")) process.exit(selfTest());
process.exit(await main());
