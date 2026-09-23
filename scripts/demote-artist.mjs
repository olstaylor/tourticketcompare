#!/usr/bin/env node
// Demote an auto-promoted artist. Records only, never out.js: a
// `review_required` shell with a `demoted` marker (which /api/out reads to
// refuse every redirect for the slug) and unpublished, not deleted, catalog
// links, so reverting the diff restores it. Owner-promoted artists are refused.
//
//   node scripts/demote-artist.mjs --slug <slug> --reason "<why>" [--write]
//   node scripts/demote-artist.mjs --self-test

import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const ROOT = new URL("../", import.meta.url);
const PATHS = { artists: new URL("public/data/artists.json", ROOT), catalog: new URL("public/data/catalog.json", ROOT) };

/** Pure: returns the updated documents, or throws with the reason it refused. */
export function applyDemotion({ artists, catalog, slug, reason, today }) {
  if (!reason || !String(reason).trim()) throw new Error("a demotion needs a reason");
  const record = artists.find((artist) => artist.slug === slug);
  if (!record) throw new Error(`no artists.json record for ${slug}`);
  if (record.promotion_source !== "auto") throw new Error(`${slug} was not auto-promoted; demoting it is an owner decision`);
  if (record.demoted) throw new Error(`${slug} is already demoted (${record.demoted.reason})`);
  const nextArtists = artists.map((artist) =>
    artist.slug === slug
      ? {
          ...artist,
          indexing_status: "review_required",
          verified_provider_count: 0,
          verified_providers: [],
          demoted: { at: today, reason: String(reason).trim().slice(0, 200) },
        }
      : artist
  );
  const nextCatalog = {
    ...catalog,
    ticket_links: (catalog.ticket_links || []).map((link) =>
      link.artist_slug === slug ? { ...link, public_enabled: false } : link
    ),
  };
  return { artists: nextArtists, catalog: nextCatalog };
}

function selfTest() {
  const artists = [
    { slug: "auto-act", indexing_status: "indexable_with_substantial_content", verified_providers: ["seatgeek"], verified_provider_count: 1, promotion_source: "auto" },
    { slug: "owner-act", indexing_status: "indexable_with_substantial_content", verified_providers: ["seatgeek"], verified_provider_count: 1 },
  ];
  const catalog = { ticket_links: [{ artist_slug: "auto-act", public_enabled: true }, { artist_slug: "owner-act", public_enabled: true }] };
  const out = applyDemotion({ artists, catalog, slug: "auto-act", reason: "denylist", today: "2027-01-01" });
  const demoted = out.artists[0];
  const failures = [];
  const check = (cond, msg) => { if (!cond) failures.push(msg); };
  check(demoted.indexing_status === "review_required" && demoted.verified_providers.length === 0, "demoted artist becomes a shell");
  check(demoted.demoted?.reason === "denylist" && demoted.demoted?.at === "2027-01-01", "demotion marker records when and why");
  check(out.catalog.ticket_links[0].public_enabled === false && out.catalog.ticket_links[1].public_enabled === true, "only the demoted artist's links are unpublished");
  check(out.artists[1] === artists[1], "other records are untouched");
  const refuses = (args, msg) => { try { applyDemotion({ artists, catalog, today: "x", ...args }); failures.push(msg); } catch { /* expected */ } };
  refuses({ slug: "owner-act", reason: "x" }, "refuses an owner-promoted artist");
  refuses({ slug: "auto-act", reason: " " }, "refuses a blank reason");
  refuses({ slug: "nobody", reason: "x" }, "refuses an unknown slug");
  refuses({ artists: out.artists, slug: "auto-act", reason: "again" }, "refuses a second demotion");
  for (const f of failures) console.error(`  FAIL ${f}`);
  console.log(`[demote-artist] self-test: ${failures.length ? `${failures.length} failure(s)` : "all assertions passed"}`);
  return failures.length ? 1 : 0;
}

function main(argv) {
  if (argv.includes("--self-test")) return selfTest();
  const arg = (name) => { const i = argv.indexOf(name); return i === -1 ? "" : argv[i + 1] || ""; };
  const [slug, reason] = [arg("--slug"), arg("--reason")];
  const artists = JSON.parse(readFileSync(PATHS.artists, "utf8"));
  const catalog = JSON.parse(readFileSync(PATHS.catalog, "utf8"));
  const next = applyDemotion({ artists, catalog, slug, reason, today: new Date().toISOString().slice(0, 10) });
  if (!argv.includes("--write")) {
    console.log(`Preview: would demote ${slug} (${reason}). Re-run with --write.`);
    return 0;
  }
  writeFileSync(PATHS.artists, `${JSON.stringify(next.artists, null, 2)}\n`);
  writeFileSync(PATHS.catalog, `${JSON.stringify(next.catalog, null, 2)}\n`);
  console.log(`Demoted ${slug}: ${reason}`);
  return 0;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try {
    process.exit(main(process.argv.slice(2)));
  } catch (err) {
    console.error(`demote-artist: ${err.message}`);
    process.exit(1);
  }
}
