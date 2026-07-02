#!/usr/bin/env node
//
// validate-cta-provider-state.mjs
//
// Provider-sync sequence step 5: assert that CTA eligibility is DERIVED FROM
// verified provider state, and that published state is internally consistent so
// the runtime gates render exactly the verified state — nothing more.
//
// This is a READ-ONLY validator. It changes no runtime behaviour and modifies
// no files. The runtime CTA gates stay the single source of truth:
//   - artist-level CTAs dispatch via VERIFIED_TICKET_LINKS in functions/api/out.js,
//   - event-level CTAs/redirects gate on eventLinkPublishable + the URL checks in
//     functions/api/out.js / functions/[[path]].js / public/app.js.
// VERIFIED_TICKET_LINKS and /api/out are unchanged by this step (and by this
// script). What this adds is a guard that the data behind those gates is
// consistent with the verified provider state recorded in the registry and the
// per-event verification_status.
//
// Hard errors (exit 1):
//   1. Every "<slug>:ticketmaster" key in VERIFIED_TICKET_LINKS is backed by a
//      provider-identity registry entry with review_status "verified" and a
//      populated ticketmaster_attraction_id (the published artist CTA derives
//      from a verified provider identity).
//   2. No registry entry with review_status "withheld" appears in
//      VERIFIED_TICKET_LINKS (a withheld identity must not publish a CTA).
//   3. Every publishable event (eventLinkPublishable === true) has a
//      ticketmaster_url that /api/out can actually redirect: https, an
//      allowlisted Ticketmaster destination host (parsed from out.js), and the
//      event's ticketmaster_event_id present in the URL. (A CTA the gate
//      green-lights must resolve.)
//   4. Every machine_high_confidence event satisfies the full canonical
//      contract that status name promises: canonical long-form storefront URL
//      (slug segment before /event/<id>), id present, full datetime, venue and
//      city. (Machine approval must match its own definition.)
//
// Informational (reported, never fails): events that store a seatgeek_url while
// the Ticketmaster link is not publishable (the SeatGeek CTA is correctly
// suppressed — it only renders alongside a publishable Ticketmaster link), and
// per-status / per-artist counts.
//
// Usage:
//   node scripts/validate-cta-provider-state.mjs            (human report; exit 1 on drift)
//   node scripts/validate-cta-provider-state.mjs --json     (machine-readable)
//   node scripts/validate-cta-provider-state.mjs --self-test (offline invariant tests)

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const EVENTS_PATH = path.join(REPO_ROOT, "public", "data", "events.json");
const REGISTRY_PATH = path.join(REPO_ROOT, "data", "provider-identities.json");
const OUT_JS_PATH = path.join(REPO_ROOT, "functions", "api", "out.js");

// ─── Pure helpers (covered by --self-test) ──────────────────────────────────

function clean(value) {
  return String(value ?? "").trim();
}

// Faithful copy of eventLinkPublishable from functions/api/out.js /
// functions/[[path]].js / public/app.js. Keep in sync with those — this is the
// derivation under test, so it MUST match the runtime gate exactly.
const PUBLISHABLE_VERIFICATION_STATUSES = new Set(["human_verified", "machine_high_confidence"]);
function eventLinkPublishable(event) {
  const status = clean(event?.verification_status).toLowerCase();
  if (status) return PUBLISHABLE_VERIFICATION_STATUSES.has(status);
  return event?.provider_links?.ticketmaster?.verified === true;
}

function hostAllowed(hostname, allowedHosts) {
  const host = clean(hostname).toLowerCase();
  return allowedHosts.some((allowed) => host === allowed || host.endsWith(`.${allowed}`));
}

// The redirect-level invariant /api/out enforces: https, allowlisted host, and
// the event id present in the URL. Returns "" when ok, else a reason.
function ticketmasterRedirectIssue(event, allowedHosts) {
  const url = clean(event?.ticketmaster_url);
  if (!url) return "no ticketmaster_url";
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return "ticketmaster_url is not a valid URL";
  }
  if (parsed.protocol !== "https:") return "ticketmaster_url is not https";
  if (!hostAllowed(parsed.hostname, allowedHosts)) return `ticketmaster_url host '${parsed.hostname}' not in the out.js allowlist`;
  const id = clean(event?.ticketmaster_event_id).toLowerCase();
  if (!id) return "ticketmaster_event_id is empty";
  if (!url.toLowerCase().includes(id)) return "ticketmaster_url does not contain ticketmaster_event_id";
  return "";
}

// The full machine_high_confidence contract (mirrors classifyCandidateLink in
// scripts/apply-artists.mjs). Returns "" when ok, else a reason.
function machineHighConfidenceIssue(event, allowedHosts) {
  const redirectIssue = ticketmasterRedirectIssue(event, allowedHosts);
  if (redirectIssue) return redirectIssue;
  const url = clean(event?.ticketmaster_url);
  const parsed = new URL(url);
  const segments = parsed.pathname.split("/").filter(Boolean);
  const eventIndex = segments.indexOf("event");
  if (eventIndex === -1 || !segments[eventIndex + 1]) return "url has no /event/<id> segment";
  if (eventIndex === 0) return "short-form /event/<id> url (no storefront slug before /event)";
  if (!/T\d{2}:\d{2}/.test(clean(event?.datetime_iso))) return "datetime_iso has no exact time";
  if (!clean(event?.venue)) return "missing venue";
  if (!clean(event?.city)) return "missing city";
  return "";
}

// Parse PROVIDERS.ticketmaster.allowedDestinationHosts from out.js (read-only;
// out.js stays the single source of truth, mirroring the python recogniser).
function parseTicketmasterAllowedHosts(outJsText) {
  const tmPos = outJsText.indexOf("ticketmaster:");
  if (tmPos === -1) return [];
  const listPos = outJsText.indexOf("allowedDestinationHosts", tmPos);
  if (listPos === -1) return [];
  const open = outJsText.indexOf("[", listPos);
  const close = outJsText.indexOf("]", open);
  if (open === -1 || close === -1) return [];
  return [...outJsText.slice(open, close).matchAll(/["']([^"'\r\n]+)["']/g)].map((m) => m[1]);
}

// Parse the "<slug>:<provider>" keys of VERIFIED_TICKET_LINKS from out.js
// (same approach as validate-artist-provider-claims.mjs).
function parseVerifiedTicketLinkKeys(outJsText) {
  const block = outJsText.match(/const\s+VERIFIED_TICKET_LINKS\s*=\s*\{([\s\S]*?)\n\};/);
  if (!block) return [];
  return [...block[1].matchAll(/"([a-z0-9-]+):([a-z0-9-]+)"\s*:/g)].map((m) => ({ slug: m[1], provider: m[2], key: `${m[1]}:${m[2]}` }));
}

// Core derivation: given the parsed inputs, compute hard errors + info findings.
function evaluate({ events, registryBySlug, verifiedKeys, allowedHosts }) {
  const errors = [];
  const info = [];

  // 1 + 2: artist-level CTA <-> verified provider identity. Every artist CTA
  // (any provider) needs a review_status "verified" registry entry; each
  // provider additionally requires its identity anchor: ticketmaster_
  // attraction_id for ticketmaster keys, seatgeek_performer_id for seatgeek
  // keys (the performer-page URL is only trusted while pinned to the verified
  // performer record).
  for (const { slug, provider, key } of verifiedKeys) {
    const reg = registryBySlug.get(slug);
    if (!reg) {
      errors.push(`artist CTA "${key}" has no provider-identity registry entry (CTA not backed by a verified identity)`);
      continue;
    }
    if (clean(reg.review_status) !== "verified") {
      errors.push(`artist CTA "${key}" is published but registry review_status is "${clean(reg.review_status) || "(absent)"}" (must be "verified")`);
    }
    if (provider === "ticketmaster" && !clean(reg.ticketmaster_attraction_id)) {
      errors.push(`artist CTA "${key}" is published but registry ticketmaster_attraction_id is empty`);
    }
    if (provider === "seatgeek" && !Number.isInteger(reg.seatgeek_performer_id)) {
      errors.push(`artist CTA "${key}" is published but registry seatgeek_performer_id is empty`);
    }
  }
  const publishedSlugs = new Map();
  for (const { slug, key } of verifiedKeys) {
    const list = publishedSlugs.get(slug) || [];
    list.push(key);
    publishedSlugs.set(slug, list);
  }
  for (const [slug, reg] of registryBySlug) {
    if (clean(reg.review_status) === "withheld" && publishedSlugs.has(slug)) {
      errors.push(`registry "${slug}" is review_status "withheld" but has VERIFIED_TICKET_LINKS CTA(s) ${publishedSlugs.get(slug).join(", ")} (withheld identity must not publish)`);
    }
  }

  // 3 + 4: event-level CTA eligibility derives from verification_status.
  const statusCounts = {};
  let publishable = 0;
  let seatgeekSuppressed = 0;
  for (const event of events) {
    const status = clean(event?.verification_status) || "(absent)";
    statusCounts[status] = (statusCounts[status] || 0) + 1;
    const isPublishable = eventLinkPublishable(event);
    if (isPublishable) {
      publishable += 1;
      const redirectIssue = ticketmasterRedirectIssue(event, allowedHosts);
      if (redirectIssue) {
        errors.push(`event "${clean(event?.id)}" is publishable but its CTA will not redirect: ${redirectIssue}`);
      }
    }
    if (clean(event?.verification_status).toLowerCase() === "machine_high_confidence") {
      const mhcIssue = machineHighConfidenceIssue(event, allowedHosts);
      if (mhcIssue) {
        errors.push(`event "${clean(event?.id)}" is machine_high_confidence but breaks that contract: ${mhcIssue}`);
      }
    }
    if (clean(event?.seatgeek_url) && !isPublishable) {
      seatgeekSuppressed += 1;
    }
  }
  if (seatgeekSuppressed > 0) {
    info.push(`${seatgeekSuppressed} event(s) store a seatgeek_url while the event is not publishable — the SeatGeek CTA renders standalone only when provider_links.seatgeek.verified is true, otherwise it stays suppressed.`);
  }

  return { errors, info, stats: { events: events.length, publishable, statusCounts, artistCtas: verifiedKeys.filter((k) => k.provider === "ticketmaster").length } };
}

// ─── I/O ────────────────────────────────────────────────────────────────────

async function readJson(file) {
  return JSON.parse(await fs.readFile(file, "utf8"));
}

async function loadInputs() {
  const [events, registry, outJsText] = await Promise.all([
    readJson(EVENTS_PATH),
    readJson(REGISTRY_PATH),
    fs.readFile(OUT_JS_PATH, "utf8"),
  ]);
  if (!Array.isArray(events)) throw new Error(`${EVENTS_PATH} is not an array`);
  const registryBySlug = new Map((Array.isArray(registry?.artists) ? registry.artists : []).map((a) => [clean(a.slug), a]));
  const allowedHosts = parseTicketmasterAllowedHosts(outJsText);
  if (!allowedHosts.length) throw new Error("could not parse the Ticketmaster allowlist from functions/api/out.js");
  const verifiedKeys = parseVerifiedTicketLinkKeys(outJsText);
  if (!verifiedKeys.length) throw new Error("could not parse VERIFIED_TICKET_LINKS from functions/api/out.js");
  return { events, registryBySlug, verifiedKeys, allowedHosts };
}

// ─── Self-test ──────────────────────────────────────────────────────────────

function selfTest() {
  const checks = [];
  const assert = (label, pass) => checks.push({ label, pass: !!pass });
  const allowedHosts = ["ticketmaster.com"];
  const longUrl = "https://www.ticketmaster.com/raye-london/event/ABC123";
  const goodEvent = {
    id: "e-good", verification_status: "machine_high_confidence", ticketmaster_url: longUrl,
    ticketmaster_event_id: "ABC123", datetime_iso: "2027-06-01T19:00:00Z", venue: "The O2", city: "London",
  };

  assert("publishable status detected", eventLinkPublishable(goodEvent) === true);
  assert("needs_recheck not publishable", eventLinkPublishable({ ...goodEvent, verification_status: "needs_recheck" }) === false);
  assert("absent status falls back to provider verified flag", eventLinkPublishable({ provider_links: { ticketmaster: { verified: true } } }) === true);
  assert("clean machine_high_confidence passes its contract", machineHighConfidenceIssue(goodEvent, allowedHosts) === "");
  assert("short-form url fails mhc contract", machineHighConfidenceIssue({ ...goodEvent, ticketmaster_url: "https://www.ticketmaster.com/event/ABC123" }, allowedHosts) !== "");
  assert("date-only fails mhc contract", machineHighConfidenceIssue({ ...goodEvent, datetime_iso: "2027-06-01" }, allowedHosts) !== "");
  assert("missing id fails redirect invariant", ticketmasterRedirectIssue({ ...goodEvent, ticketmaster_event_id: "" }, allowedHosts) !== "");
  assert("non-allowlisted host fails redirect invariant", ticketmasterRedirectIssue({ ...goodEvent, ticketmaster_url: "https://www.ticketmaster.com.mx/x/event/ABC123" }, allowedHosts) !== "");

  const registryBySlug = new Map([
    ["raye", { slug: "raye", review_status: "verified", ticketmaster_attraction_id: "K1" }],
    ["beyonce", { slug: "beyonce", review_status: "unverified", ticketmaster_attraction_id: "" }],
    ["banned", { slug: "banned", review_status: "withheld", ticketmaster_attraction_id: "" }],
  ]);

  const cleanEval = evaluate({
    events: [goodEvent],
    registryBySlug,
    verifiedKeys: [{ slug: "raye", provider: "ticketmaster", key: "raye:ticketmaster" }],
    allowedHosts,
  });
  assert("clean inputs produce no errors", cleanEval.errors.length === 0);

  const dirtyEval = evaluate({
    events: [
      { ...goodEvent, id: "e-pub-noid", ticketmaster_event_id: "" }, // publishable but won't redirect
      { ...goodEvent, id: "e-mhc-short", ticketmaster_url: "https://www.ticketmaster.com/event/ABC123" }, // mhc contract break
      { id: "e-sg", verification_status: "needs_recheck", seatgeek_url: "https://seatgeek.com/x/concert/1" }, // info only
    ],
    registryBySlug,
    verifiedKeys: [
      { slug: "raye", provider: "ticketmaster", key: "raye:ticketmaster" },
      { slug: "beyonce", provider: "ticketmaster", key: "beyonce:ticketmaster" }, // unverified identity
      { slug: "banned", provider: "ticketmaster", key: "banned:ticketmaster" }, // withheld identity
      { slug: "ghost", provider: "ticketmaster", key: "ghost:ticketmaster" }, // no registry entry
    ],
    allowedHosts,
  });
  assert("unpublishable-redirect event flagged", dirtyEval.errors.some((e) => e.includes("e-pub-noid")));
  assert("mhc contract break flagged", dirtyEval.errors.some((e) => e.includes("e-mhc-short")));
  assert("unverified identity CTA flagged", dirtyEval.errors.some((e) => e.includes("beyonce") && e.includes("verified")));
  assert("withheld identity CTA flagged", dirtyEval.errors.some((e) => e.includes("banned") && e.includes("withheld")));
  assert("missing registry entry flagged", dirtyEval.errors.some((e) => e.includes("ghost")));
  assert("suppressed seatgeek is info not error", dirtyEval.info.some((i) => i.includes("suppressed")) && !dirtyEval.errors.some((e) => e.includes("e-sg")));

  let failed = 0;
  for (const c of checks) {
    if (!c.pass) failed += 1;
    console.log(`${c.pass ? "PASS" : "FAIL"}  ${c.label}`);
  }
  console.log(`\n${checks.length - failed}/${checks.length} checks passed.`);
  return failed === 0 ? 0 : 1;
}

// ─── Main ─────────────────────────────────────────────────────────────────

async function main() {
  const argv = process.argv.slice(2);
  if (argv.includes("--self-test")) return selfTest();
  const asJson = argv.includes("--json");

  const inputs = await loadInputs();
  const { errors, info, stats } = evaluate(inputs);

  if (asJson) {
    console.log(JSON.stringify({ ok: errors.length === 0, errors, info, stats }, null, 2));
    return errors.length === 0 ? 0 : 1;
  }

  console.log("CTA ↔ provider-state consistency (read-only; no files or gates changed)\n");
  console.log(`  events: ${stats.events}  publishable: ${stats.publishable}  artist Ticketmaster CTAs: ${stats.artistCtas}`);
  console.log(`  verification_status: ${JSON.stringify(stats.statusCounts)}`);
  for (const i of info) console.log(`  note: ${i}`);
  if (errors.length === 0) {
    console.log("\nOK: every CTA is backed by verified provider state and is internally consistent.");
    return 0;
  }
  console.error(`\n${errors.length} CTA/provider-state drift error(s):`);
  for (const e of errors) console.error(`  - ${e}`);
  return 1;
}

main()
  .then((code) => process.exit(code))
  .catch((error) => {
    console.error(`ERROR: ${error.message || error}`);
    process.exit(2);
  });
