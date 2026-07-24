#!/usr/bin/env node
// Recounts the deterministic figures asserted in PROJECT_STATUS.md against the
// source data and fails/warns when they diverge. This is the guard that would
// have caught the 402 -> 423 event drift: the nightly sync lanes mutate
// public/data/* (and auto-merge) but do not touch PROJECT_STATUS.md, so its
// counts silently rot. See PROJECT_STATUS.md -> "How to update this file".
//
// Scope: only mechanically-derivable counts are enforced — the "Current data"
// bullets and the per-artist table's numeric columns. Prose notes, tour names,
// last_verified_at currency, and the date-derived city/venue indexable counts
// (functions/_cities.js gates on `ts < now`, so they change with the calendar,
// not with a data edit) are deliberately NOT enforced.
//
// Modes:
//   (default / --check)  recount and report divergence; exit 0 (warning-first).
//   --strict             exit 1 when any figure diverges (the future hard gate).
//   --write              rewrite the enforced numbers + table columns in place
//                        from source. Wired into the auto-merging sync lanes so
//                        the counts self-heal in the same commit that moves them.
//   --self-test          run internal fixtures; exit non-zero on failure.
//
// --write is intentionally forgiving: an assertion whose anchor text has been
// reworded (pattern no longer matches, or matches ambiguously) is skipped with
// a warning rather than crashing a sync workflow.

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const STATUS_PATH = path.join(root, "PROJECT_STATUS.md");

const readJson = (rel) => JSON.parse(fs.readFileSync(path.join(root, rel), "utf8"));
const readText = (rel) => fs.readFileSync(path.join(root, rel), "utf8");
const nonEmpty = (v) => typeof v === "string" && v.trim() !== "";
const providerVerified = (event, key) => {
  const p = event?.provider_links?.[key];
  return !!p && p.verified === true;
};

// Count top-level `"key": {` entries inside the first `<NAME> = { ... }` object.
function countObjectKeys(source, declRegex, keyRegex) {
  const m = declRegex.exec(source);
  if (!m) return null;
  const start = source.indexOf("{", m.index);
  let depth = 0;
  let end = -1;
  for (let i = start; i < source.length; i += 1) {
    if (source[i] === "{") depth += 1;
    else if (source[i] === "}") {
      depth -= 1;
      if (depth === 0) {
        end = i + 1;
        break;
      }
    }
  }
  if (end === -1) return null;
  const block = source.slice(start, end);
  return [...block.matchAll(keyRegex)].length;
}

// ---- Source-of-truth counts -------------------------------------------------

const RESALE_KEYS = ["seatgeek", "vivid-seats", "ticketnetwork", "ticket-liquidator", "stubhub-international"];

export function computeCounts(sources) {
  const { artists, catalog, events, guidesContent, providerIdentities, guideRoutesCount, verifiedTicketLinksCount } = sources;

  const indexable = artists.filter((a) => a.indexing_status === "indexable_with_substantial_content");
  const shells = artists.filter((a) => a.indexing_status === "review_required");

  const perArtistEvents = new Map();
  for (const e of events) {
    const slug = (e.artist_slug || "").trim();
    perArtistEvents.set(slug, (perArtistEvents.get(slug) || 0) + 1);
  }
  const indexableZeroEvents = indexable.filter((a) => (perArtistEvents.get(a.slug) || 0) === 0).length;

  const byStatus = (s) => events.filter((e) => e.verification_status === s).length;
  const recheck = events.filter((e) => e.verification_status === "needs_recheck");

  const catalogArtists = Array.isArray(catalog?.artists) ? catalog.artists : [];
  const ticketLinks = Array.isArray(catalog?.ticket_links) ? catalog.ticket_links : [];
  const tlBy = (provider, verified, publicEnabled) =>
    ticketLinks.filter((t) => t.provider === provider && !!t.verified === verified && !!t.public_enabled === publicEnabled).length;

  return {
    // artists.json
    "artists.total": artists.length,
    "artists.indexable": indexable.length,
    "artists.shells": shells.length,
    "artists.indexable_zero_events": indexableZeroEvents,
    // catalog.json
    "catalog.artists": catalogArtists.length,
    "catalog.tours": Array.isArray(catalog?.tours) ? catalog.tours.length : 0,
    "catalog.ticket_links": ticketLinks.length,
    "catalog.ticket_links.ticketmaster": ticketLinks.filter((t) => t.provider === "ticketmaster").length,
    "catalog.ticket_links.seatgeek": ticketLinks.filter((t) => t.provider === "seatgeek").length,
    "catalog.ticket_links.verified_public": ticketLinks.filter((t) => t.verified && t.public_enabled).length,
    "catalog.ticket_links.hidden_shell": ticketLinks.filter((t) => !t.verified && !t.public_enabled).length,
    // events.json
    "events.total": events.length,
    "events.human_verified": byStatus("human_verified"),
    "events.machine_high_confidence": byStatus("machine_high_confidence"),
    "events.needs_recheck": recheck.length,
    "events.seatgeek_url_rows": events.filter((e) => nonEmpty(e.seatgeek_url)).length,
    "provenance.seatgeek": events.filter((e) => providerVerified(e, "seatgeek")).length,
    "provenance.vividseats": events.filter((e) => providerVerified(e, "vivid-seats")).length,
    "provenance.ticketnetwork": events.filter((e) => providerVerified(e, "ticketnetwork")).length,
    "provenance.ticketliquidator": events.filter((e) => providerVerified(e, "ticket-liquidator")).length,
    "provenance.stubhub_international": events.filter((e) => providerVerified(e, "stubhub-international")).length,
    "recheck.seatgeek_cta": recheck.filter((e) => providerVerified(e, "seatgeek")).length,
    "recheck.vividseats_cta": recheck.filter((e) => providerVerified(e, "vivid-seats")).length,
    "recheck.no_resale": recheck.filter((e) => !RESALE_KEYS.some((k) => providerVerified(e, k))).length,
    // guides
    "guides.content": Object.keys(guidesContent || {}).length,
    "guides.routes": guideRoutesCount,
    // out.js
    "verified_ticket_links": verifiedTicketLinksCount,
    // provider identities
    "provider_identities": Array.isArray(providerIdentities?.artists) ? providerIdentities.artists.length : 0,
  };
}

// Per-artist table expectations, keyed by slug.
export function computeTable(sources) {
  const { artists, events } = sources;
  const rows = new Map();
  for (const a of artists) rows.set(a.slug, { events: 0, seatgeek_url: 0, sg_verified: 0, needs_recheck: 0 });
  for (const e of events) {
    const r = rows.get((e.artist_slug || "").trim());
    if (!r) continue;
    r.events += 1;
    if (nonEmpty(e.seatgeek_url)) r.seatgeek_url += 1;
    if (providerVerified(e, "seatgeek")) r.sg_verified += 1;
    if (e.verification_status === "needs_recheck") r.needs_recheck += 1;
  }
  return rows;
}

function loadSources() {
  const routeMeta = readText("functions/_route-metadata.js");
  const outJs = readText("functions/api/out.js");
  return {
    artists: readJson("public/data/artists.json"),
    catalog: readJson("public/data/catalog.json"),
    events: readJson("public/data/events.json"),
    guidesContent: readJson("public/data/guides-content.json"),
    providerIdentities: readJson("data/provider-identities.json"),
    guideRoutesCount: countObjectKeys(routeMeta, /GUIDE_ROUTES\s*=\s*\{/, /"\/guides\/[a-z0-9-]+"\s*:\s*\{/g),
    verifiedTicketLinksCount: countObjectKeys(outJs, /VERIFIED_TICKET_LINKS\s*=\s*\{/, /["'][a-z0-9-]+:[a-z0-9-]+["']\s*:/g),
  };
}

// ---- Scalar assertions ------------------------------------------------------
// Each pattern captures one or more numbers (group order = `keys` order). The
// pattern must match exactly once in PROJECT_STATUS.md or it is treated as
// "anchor not found" (surfaces wording drift instead of silently passing).

const SCALAR_ASSERTIONS = [
  { keys: ["events.total"], re: /\*\*(\d+) events\*\*/ },
  { keys: ["events.human_verified"], re: /(\d+) `human_verified`/ },
  { keys: ["events.machine_high_confidence"], re: /(\d+) `machine_high_confidence`/ },
  { keys: ["events.needs_recheck"], re: /(\d+) `needs_recheck`\. Verified event-level/ },
  { keys: ["provenance.seatgeek", "events.seatgeek_url_rows"], re: /SeatGeek (\d+) \((\d+) rows carry a stored `seatgeek_url`\)/ },
  { keys: ["provenance.vividseats"], re: /Vivid Seats (\d+), TicketNetwork/ },
  { keys: ["provenance.ticketnetwork"], re: /TicketNetwork (\d+), Ticket Liquidator/ },
  { keys: ["provenance.ticketliquidator"], re: /Ticket Liquidator (\d+), StubHub International/ },
  { keys: ["provenance.stubhub_international"], re: /StubHub International (\d+)\. Of the/ },
  {
    keys: ["events.needs_recheck", "recheck.seatgeek_cta", "recheck.vividseats_cta", "recheck.no_resale"],
    re: /Of the (\d+) `needs_recheck` rows: (\d+) retain a standalone SeatGeek CTA, (\d+) retain a standalone Vivid Seats CTA, and (\d+) have no independently/,
  },
  {
    keys: ["artists.total", "artists.indexable", "artists.shells"],
    re: /\*\*(\d+) records — (\d+) `indexable_with_substantial_content` \+ (\d+) `review_required` shells/,
  },
  { keys: ["artists.indexable_zero_events"], re: /(\d+) of the 20 indexable — beyonce, raye, tate-mcrae/ },
  {
    keys: ["catalog.artists", "catalog.tours", "catalog.ticket_links"],
    re: /(\d+) artist records; (\d+) tour records; \*\*(\d+) ticket_links rows\*\*/,
  },
  {
    keys: ["catalog.ticket_links.ticketmaster", "catalog.ticket_links.seatgeek", "catalog.ticket_links.verified_public", "catalog.ticket_links.hidden_shell"],
    re: /\((\d+) ticketmaster \+ (\d+) seatgeek artist pages; (\d+) `verified` \+ `public_enabled`, plus (\d+) unverified\/hidden/,
  },
  { keys: ["guides.content"], re: /\*\*(\d+) guide content entries\*\*/ },
  { keys: ["guides.routes"], re: /\*\*(\d+) guide routes\*\*/ },
  { keys: ["verified_ticket_links"], re: /`VERIFIED_TICKET_LINKS`: \*\*(\d+) artist-level entries\*\*/ },
  { keys: ["provider_identities"], re: /all \*\*(\d+) entries\*\* verified with/ },
];

function globalOf(re) {
  return new RegExp(re.source, re.flags.includes("g") ? re.flags : `${re.flags}g`);
}
function withIndices(re) {
  return new RegExp(re.source, re.flags.includes("d") ? re.flags : `${re.flags}d`);
}

// Returns { divergences: [...], missing: [...], writes: [...] } for scalars.
function checkScalars(text, counts) {
  const divergences = [];
  const missing = [];
  const writeOps = [];
  for (const assertion of SCALAR_ASSERTIONS) {
    const count = [...text.matchAll(globalOf(assertion.re))].length;
    if (count !== 1) {
      missing.push({ keys: assertion.keys, reason: count === 0 ? "anchor not found" : `anchor matched ${count}× (ambiguous)` });
      continue;
    }
    const m = withIndices(assertion.re).exec(text);
    const newValues = [];
    let rowChanged = false;
    assertion.keys.forEach((key, i) => {
      const found = Number(m[i + 1]);
      const expected = counts[key];
      newValues.push(expected);
      if (found !== expected) {
        divergences.push({ key, expected, found });
        rowChanged = true;
      }
    });
    if (rowChanged) writeOps.push({ match: m, values: newValues });
  }
  return { divergences, missing, writeOps };
}

function applyScalarWrites(text, writeOps) {
  // Apply highest offset first so earlier match indices stay valid.
  const ops = [];
  for (const { match, values } of writeOps) {
    values.forEach((value, i) => {
      const span = match.indices[i + 1];
      ops.push({ start: span[0], end: span[1], value: String(value) });
    });
  }
  ops.sort((a, b) => b.start - a.start);
  let out = text;
  for (const op of ops) out = out.slice(0, op.start) + op.value + out.slice(op.end);
  return out;
}

// ---- Per-artist table -------------------------------------------------------

const TABLE_COLS = { events: 2, seatgeek_url: 3, sg_verified: 4, needs_recheck: 5 };

function findTableRange(lines) {
  const headerIdx = lines.findIndex((l) => /^\|\s*Slug\s*\|/.test(l) && /Events/.test(l) && /SG verified/.test(l));
  if (headerIdx === -1) return null;
  let end = headerIdx + 2; // skip header + separator
  while (end < lines.length && lines[end].trim().startsWith("|")) end += 1;
  return { headerIdx, dataStart: headerIdx + 2, dataEnd: end };
}

function parseRow(line) {
  const raw = line.split("|");
  // Leading/trailing pipes yield empty first/last cells.
  return raw.slice(1, -1).map((c) => c.trim());
}

function formatRecheck(n) {
  return n > 0 ? `**${n}**` : "0";
}

function checkTable(text, expectedRows) {
  const lines = text.split("\n");
  const range = findTableRange(lines);
  const divergences = [];
  const missing = [];
  if (!range) {
    missing.push({ keys: ["per-artist-table"], reason: "table not found" });
    return { divergences, missing, lines, range };
  }
  for (let i = range.dataStart; i < range.dataEnd; i += 1) {
    const cells = parseRow(lines[i]);
    const slug = cells[0];
    const expected = expectedRows.get(slug);
    if (!expected) continue; // rows without a known slug are left alone
    for (const [field, col] of Object.entries(TABLE_COLS)) {
      const found = Number((cells[col] || "").replace(/[^\d]/g, ""));
      if (found !== expected[field]) {
        divergences.push({ key: `table:${slug}.${field}`, expected: expected[field], found });
      }
    }
  }
  return { divergences, missing, lines, range };
}

function applyTableWrites(lines, range, expectedRows) {
  for (let i = range.dataStart; i < range.dataEnd; i += 1) {
    const cells = parseRow(lines[i]);
    const slug = cells[0];
    const expected = expectedRows.get(slug);
    if (!expected) continue;
    cells[TABLE_COLS.events] = String(expected.events);
    cells[TABLE_COLS.seatgeek_url] = String(expected.seatgeek_url);
    cells[TABLE_COLS.sg_verified] = String(expected.sg_verified);
    cells[TABLE_COLS.needs_recheck] = formatRecheck(expected.needs_recheck);
    lines[i] = `| ${cells.join(" | ")} |`;
  }
  return lines.join("\n");
}

// ---- Orchestration ----------------------------------------------------------

function runCheck({ write, strict }) {
  const sources = loadSources();
  const counts = computeCounts(sources);
  const expectedRows = computeTable(sources);
  let text = readText("PROJECT_STATUS.md");

  const scalar = checkScalars(text, counts);
  const table = checkTable(text, expectedRows);

  const divergences = [...scalar.divergences, ...table.divergences];
  const missing = [...scalar.missing, ...table.missing];

  if (write) {
    let out = applyScalarWrites(text, scalar.writeOps);
    if (table.range) {
      const lines = out.split("\n");
      const range = findTableRange(lines);
      if (range) out = applyTableWrites(lines, range, expectedRows);
    }
    if (out !== text) {
      fs.writeFileSync(STATUS_PATH, out);
      console.log(`[status-counts] WROTE: refreshed ${divergences.length} figure(s) in PROJECT_STATUS.md`);
    } else {
      console.log("[status-counts] OK: PROJECT_STATUS.md already in sync (nothing to write)");
    }
    for (const mm of missing) console.warn(`[status-counts] WARN: ${mm.keys.join(", ")} — ${mm.reason} (skipped)`);
    return 0;
  }

  for (const d of divergences) {
    console[strict ? "error" : "warn"](`[status-counts] ${strict ? "FAIL" : "WARN"}: ${d.key} — PROJECT_STATUS.md says ${d.found}, source data says ${d.expected}`);
  }
  for (const mm of missing) {
    console.warn(`[status-counts] WARN: ${mm.keys.join(", ")} — ${mm.reason}`);
  }

  if (divergences.length === 0 && missing.length === 0) {
    console.log("[status-counts] OK: all enforced figures match source data");
    return 0;
  }
  if (divergences.length === 0) {
    console.log(`[status-counts] OK: no divergence (${missing.length} anchor warning(s) — see above)`);
    return 0;
  }
  const summary = `[status-counts] ${divergences.length} figure(s) diverge from source. Run \`npm run status:validate:write\` to refresh.`;
  if (strict) {
    console.error(summary);
    return 1;
  }
  console.warn(`${summary} (warning-only; not failing CI)`);
  return 0;
}

// ---- Self-test --------------------------------------------------------------

function selfTest() {
  const failures = [];
  const assert = (label, cond) => {
    if (!cond) failures.push(label);
  };

  const sources = {
    artists: [
      { slug: "a", indexing_status: "indexable_with_substantial_content" },
      { slug: "b", indexing_status: "indexable_with_substantial_content" },
      { slug: "c", indexing_status: "review_required" },
    ],
    catalog: {
      artists: [{}, {}, {}],
      tours: [],
      ticket_links: [
        { provider: "ticketmaster", verified: true, public_enabled: true },
        { provider: "seatgeek", verified: true, public_enabled: true },
        { provider: "ticketmaster", verified: false, public_enabled: false },
      ],
    },
    events: [
      { artist_slug: "a", verification_status: "human_verified", seatgeek_url: "x", provider_links: { seatgeek: { verified: true } } },
      { artist_slug: "a", verification_status: "needs_recheck", seatgeek_url: "y", provider_links: { seatgeek: { verified: true } } },
      { artist_slug: "b", verification_status: "needs_recheck", seatgeek_url: "", provider_links: { seatgeek: { verified: false } } },
      { artist_slug: "b", verification_status: "machine_high_confidence", provider_links: { "vivid-seats": { verified: true } } },
    ],
    guidesContent: { "/g1": {}, "/g2": {} },
    providerIdentities: { artists: [{}, {}] },
    guideRoutesCount: 2,
    verifiedTicketLinksCount: 4,
  };

  const counts = computeCounts(sources);
  assert("events.total", counts["events.total"] === 4);
  assert("needs_recheck total", counts["events.needs_recheck"] === 2);
  assert("recheck seatgeek CTA", counts["recheck.seatgeek_cta"] === 1);
  assert("recheck no_resale", counts["recheck.no_resale"] === 1);
  assert("provenance vivid", counts["provenance.vividseats"] === 1);
  assert("indexable zero events", counts["artists.indexable_zero_events"] === 0);
  assert("catalog hidden shell", counts["catalog.ticket_links.hidden_shell"] === 1);

  const rows = computeTable(sources);
  assert("table a events", rows.get("a").events === 2);
  assert("table a sg_verified", rows.get("a").sg_verified === 2);
  assert("table b needs_recheck", rows.get("b").needs_recheck === 1);

  // Scalar drift is detected, and --write fixes it.
  const md = "Total is **3 events** here.";
  const c = { "events.total": 7 };
  const res = checkScalars(md, c);
  assert("scalar drift detected", res.divergences.length === 1 && res.divergences[0].found === 3 && res.divergences[0].expected === 7);
  const fixed = applyScalarWrites(md, res.writeOps);
  assert("scalar write fixes", fixed === "Total is **7 events** here.");
  const res2 = checkScalars(fixed, c);
  assert("scalar clean after write", res2.divergences.length === 0);

  // Ambiguous anchor is reported as missing, never silently passed or written.
  const dupe = "**3 events** and again **3 events**";
  const resDupe = checkScalars(dupe, { "events.total": 9 });
  assert(
    "ambiguous anchor flagged",
    resDupe.divergences.length === 0 &&
      resDupe.missing.some((m) => m.keys.includes("events.total") && /ambiguous/.test(m.reason)),
  );

  // Table drift detection + write round-trip.
  const tableMd = [
    "| Slug | `last_verified_at` | Events | With `seatgeek_url` | SG verified | `needs_recheck` | Tour name | Notes |",
    "|---|---|---|---|---|---|---|---|",
    "| a | 2026-01-01 | 0 | 0 | 0 | 0 | — | n |",
    "| b | 2026-01-01 | 0 | 0 | 0 | 0 | — | n |",
    "",
    "trailer",
  ].join("\n");
  const t = checkTable(tableMd, rows);
  assert("table drift detected", t.divergences.length > 0);
  const tableFixed = applyTableWrites(tableMd.split("\n"), findTableRange(tableMd.split("\n")), rows);
  // b has 2 events (one needs_recheck, one machine_high_confidence), so the
  // Events column becomes 2 and the needs_recheck column bolds to **1**.
  assert("table b recheck bolded", /\| b \| 2026-01-01 \| 2 \| 0 \| 0 \| \*\*1\*\* \|/.test(tableFixed));
  const t2 = checkTable(tableFixed, rows);
  assert("table clean after write", t2.divergences.length === 0);

  if (failures.length) {
    for (const f of failures) console.error(`[status-counts] SELF-TEST FAIL: ${f}`);
    console.error(`[status-counts] self-test: ${failures.length} failure(s)`);
    return 1;
  }
  console.log("[status-counts] self-test: all assertions passed");
  return 0;
}

// ---- CLI --------------------------------------------------------------------

const args = new Set(process.argv.slice(2));
let code = 0;
if (args.has("--self-test")) {
  code = selfTest();
} else {
  code = runCheck({ write: args.has("--write"), strict: args.has("--strict") });
}
process.exit(code);
