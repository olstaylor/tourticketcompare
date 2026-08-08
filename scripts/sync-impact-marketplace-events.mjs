#!/usr/bin/env node

import assert from "node:assert/strict";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  CATALOG_PROXY_REJECTION_HINT,
  PROVIDERS,
  catalogItems,
  catalogItemsUrl,
  catalogProxyHeaders,
  clean,
  impactCredentials,
  isCatalogProxyRejection,
  normalizeProviderUrl,
  productCandidates,
  providerConfig
} from "./lib/impact-marketplace-providers.mjs";
// Shared venue-local date/instant resolution — the same rules the SeatGeek and
// Vivid Seats matchers use, so a given event resolves to one night everywhere.
import {
  eventInstantMs as eventInstant,
  eventLocalDateParts as eventLocalDate
} from "./lib/event-local-date.mjs";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const EVENTS_PATH = path.join(ROOT, "public", "data", "events.json");
const ARTISTS_PATH = path.join(ROOT, "public", "data", "artists.json");
const REGISTRY_PATH = path.join(ROOT, "data", "provider-identities.json");
const PAGE_SIZE = 100;
const MAX_PAGES = 5;
const DEFAULT_DELAY_MS = 1000;
const REQUEST_TIMEOUT_MS = 30000;
const PAST_GRACE_MS = 24 * 60 * 60 * 1000;

function usage() {
  return `Usage: node scripts/sync-impact-marketplace-events.mjs --provider <${Object.keys(PROVIDERS).join("|")}> [options]

Dry-run is the default. This script never invents a provider URL: it writes only
one unambiguous Impact Catalogs match whose artist, venue, city and
venue-local date all agree with an existing event.

Options:
  --provider <slug>       Required provider
  --artist <slug>         Limit to one registry-verified artist
  --limit <n>             Limit selected events
  --max-api-calls <n>     Stop safely after n catalog requests
  --delay-ms <n>          Delay between Impact calls (default: ${DEFAULT_DELAY_MS})
  --apply                 Write public/data/events.json
  --json                  Emit JSON summary
  --self-test             Run offline tests
`;
}

function parseArgs(argv) {
  const options = { provider: "", artist: "", limit: null, maxApiCalls: null, delayMs: DEFAULT_DELAY_MS, apply: false, json: false, selfTest: false };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--apply") options.apply = true;
    else if (arg === "--json") options.json = true;
    else if (arg === "--self-test") options.selfTest = true;
    else if (arg === "-h" || arg === "--help") options.help = true;
    else if (["--provider", "--artist", "--limit", "--max-api-calls", "--delay-ms"].includes(arg)) {
      const value = argv[++i];
      if (value == null || value.startsWith("--")) throw new Error(`${arg} requires a value`);
      if (arg === "--provider") options.provider = clean(value, 80).toLowerCase();
      else if (arg === "--artist") options.artist = clean(value, 120).toLowerCase();
      else {
        const number = Number.parseInt(value, 10);
        if (!Number.isInteger(number) || number < (arg === "--delay-ms" ? 0 : 1)) throw new Error(`${arg} has an invalid value`);
        if (arg === "--limit") options.limit = number;
        if (arg === "--max-api-calls") options.maxApiCalls = number;
        if (arg === "--delay-ms") options.delayMs = number;
      }
    } else throw new Error(`Unknown option: ${arg}`);
  }
  return options;
}

function normalizeText(value) {
  return clean(value, 2000).toLowerCase().normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "").replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ").replace(/\s+/g, " ").trim();
}

function containsNormalized(haystack, needle) {
  const h = ` ${normalizeText(haystack)} `;
  const n = normalizeText(needle);
  return Boolean(n) && h.includes(` ${n} `);
}

function diceSimilarity(a, b) {
  const left = new Set(normalizeText(a).split(" ").filter((part) => part.length > 1));
  const right = new Set(normalizeText(b).split(" ").filter((part) => part.length > 1));
  if (!left.size || !right.size) return 0;
  let overlap = 0;
  for (const value of left) if (right.has(value)) overlap += 1;
  return (2 * overlap) / (left.size + right.size);
}

const METROS = new Map([
  ["inglewood", ["los angeles"]], ["los angeles", ["inglewood"]],
  ["east rutherford", ["new york"]], ["new york", ["east rutherford"]],
  ["arlington", ["dallas"]], ["dallas", ["arlington"]],
  ["glendale", ["phoenix"]], ["phoenix", ["glendale"]],
  ["santa clara", ["san francisco"]], ["san francisco", ["santa clara"]],
  ["miami gardens", ["miami"]], ["miami", ["miami gardens"]],
  ["foxborough", ["boston"]], ["boston", ["foxborough"]],
  ["landover", ["washington"]], ["washington", ["landover"]]
]);

function cityMatches(text, city) {
  if (containsNormalized(text, city)) return true;
  return (METROS.get(normalizeText(city)) || []).some((alias) => containsNormalized(text, alias));
}

function venueMatches(text, venue) {
  return containsNormalized(text, venue) || diceSimilarity(text, venue) >= 0.35;
}

function dateMatches(text, date) {
  if (!date) return false;
  const normalized = ` ${normalizeText(String(text || "").replace(/(\d)T(?=\d)/gi, "$1 "))} `;
  const monthNames = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
  const short = monthNames[date.month - 1].slice(0, 3);
  const full = monthNames[date.month - 1];
  const signatures = [
    `${date.month} ${date.day} ${date.year}`, `${String(date.month).padStart(2, "0")} ${String(date.day).padStart(2, "0")} ${date.year}`,
    `${date.day} ${date.month} ${date.year}`, `${String(date.day).padStart(2, "0")} ${String(date.month).padStart(2, "0")} ${date.year}`,
    `${date.year} ${date.month} ${date.day}`, `${date.year} ${String(date.month).padStart(2, "0")} ${String(date.day).padStart(2, "0")}`,
    `${full} ${date.day} ${date.year}`, `${short} ${date.day} ${date.year}`, `${date.day} ${full} ${date.year}`, `${date.day} ${short} ${date.year}`
  ];
  return signatures.some((signature) => normalized.includes(` ${normalizeText(signature)} `));
}

function evaluateCandidate(event, artistName, candidate) {
  const reasons = [];
  const text = candidate?.searchableText || "";
  if (!candidate?.normalizedUrl) reasons.push("invalid provider event URL");
  if (!containsNormalized(text, artistName)) reasons.push("artist name mismatch");
  if (!dateMatches(text, eventLocalDate(event))) reasons.push("venue-local date mismatch");
  if (!cityMatches(text, event?.city)) reasons.push("city mismatch");
  if (!venueMatches(text, event?.venue)) reasons.push("venue mismatch");
  return { ok: reasons.length === 0, reasons, url: candidate?.normalizedUrl || "", externalId: candidate?.externalId || "" };
}

function decideOutcome({ storedUrl, storedVerified, storedCandidate, passing, catalogComplete }) {
  if (storedCandidate?.ok) return { action: storedVerified ? "none" : "verify", candidate: storedCandidate };
  if (passing.length === 1) return { action: storedUrl ? "correct" : "add", candidate: passing[0] };
  if (passing.length > 1) return { action: "conflict", candidate: null };
  if (!catalogComplete) return { action: "none", candidate: null };
  if (storedUrl) return { action: storedVerified ? "unverify" : "clear", candidate: null };
  return { action: "none", candidate: null };
}

function applyOutcome(event, config, outcome, today) {
  if (!["verify", "add", "correct", "clear", "unverify"].includes(outcome.action)) return false;
  if (!event.provider_links || typeof event.provider_links !== "object") event.provider_links = {};
  if (["clear", "unverify"].includes(outcome.action)) {
    event[config.urlField] = "";
    event.provider_links[config.linkKey] = { event_id: null, url: null, verified: false, last_verified_at: null, availability_status: "not_listed" };
    return true;
  }
  event[config.urlField] = outcome.candidate.url;
  event.provider_links[config.linkKey] = {
    event_id: outcome.candidate.externalId,
    url: outcome.candidate.url,
    verified: true,
    last_verified_at: today,
    availability_status: "listed"
  };
  return true;
}

async function fetchCatalog(config, artistName, options, state, env = process.env, fetchImpl = globalThis.fetch) {
  const { accountSid, authToken, programId } = impactCredentials(config, env);
  const authorization = accountSid && authToken
    ? `Basic ${Buffer.from(`${accountSid}:${authToken}`).toString("base64")}`
    : "";
  const candidates = [];
  for (let page = 1; page <= MAX_PAGES; page += 1) {
    if (options.maxApiCalls != null && state.apiCalls >= options.maxApiCalls) return { candidates, complete: false, stopReason: "api_call_limit" };
    if (options.delayMs) await new Promise((resolve) => setTimeout(resolve, options.delayMs));
    state.apiCalls += 1;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    let response;
    try {
      response = await fetchImpl(catalogItemsUrl(config, artistName, page, env, PAGE_SIZE), {
        headers: {
          Accept: "application/json",
          ...(authorization ? { Authorization: authorization } : {}),
          ...catalogProxyHeaders(env)
        },
        signal: controller.signal
      });
    } catch (error) {
      return { candidates, complete: false, stopReason: `request_failed:${clean(error?.message, 120)}` };
    } finally { clearTimeout(timeout); }
    // An incomplete catalog is a normal, silent, exit-0 outcome that preserves
    // existing links, so anything meaning "we were refused" has to be an
    // authFailure instead — otherwise a refused run looks identical to a run
    // with nothing to do. A proxied 404 is the gate rejecting our token.
    if (response.status === 401 || response.status === 403 || isCatalogProxyRejection(response.status, env)) {
      return { candidates, complete: false, authFailure: true, stopReason: `http_${response.status}` };
    }
    if (!response.ok) return { candidates, complete: false, stopReason: `http_${response.status}` };
    let payload;
    try { payload = await response.json(); } catch { return { candidates, complete: false, stopReason: "invalid_json" }; }
    const items = catalogItems(payload);
    if (!items) return { candidates, complete: false, stopReason: "missing_items" };
    for (const item of items) candidates.push(...productCandidates(config, item, programId));
    const total = Number(payload?.["@total"] ?? payload?.Total ?? payload?.total);
    if (items.length < PAGE_SIZE || (Number.isFinite(total) && page * PAGE_SIZE >= total)) return { candidates, complete: true, stopReason: "" };
  }
  return { candidates, complete: false, stopReason: "pagination_cap" };
}

function enrichTicketLiquidatorCandidates(candidates, ticketNetworkCandidates) {
  const referenceById = new Map(ticketNetworkCandidates.map((candidate) => [candidate.externalId, candidate]));
  return candidates.map((candidate) => {
    const reference = referenceById.get(candidate.externalId);
    return reference
      ? { ...candidate, searchableText: `${candidate.searchableText} ${reference.searchableText}`.trim() }
      : candidate;
  });
}

function selectEvents(events, registry, artists, options, now = new Date()) {
  const verified = new Set(registry.filter((row) => row?.review_status === "verified").map((row) => clean(row.slug, 120)));
  const names = new Map(artists.map((row) => [clean(row.slug, 120), clean(row.name, 200)]));
  const selected = [];
  for (const event of events) {
    const slug = clean(event?.artist_slug, 120);
    if (!verified.has(slug) || (options.artist && options.artist !== slug)) continue;
    if (!names.get(slug) || names.get(slug).includes("'")) continue;
    const instant = eventInstant(event);
    if (instant == null || instant < now.getTime() - PAST_GRACE_MS || !clean(event.city) || !clean(event.venue)) continue;
    selected.push({ event, artistName: names.get(slug) });
    if (options.limit != null && selected.length >= options.limit) break;
  }
  return selected;
}

async function run(options, deps = {}) {
  const config = providerConfig(options.provider);
  if (!config) throw new Error(`--provider must be one of: ${Object.keys(PROVIDERS).join(", ")}`);
  const [events, artists, registryPayload] = deps.data || await Promise.all([EVENTS_PATH, ARTISTS_PATH, REGISTRY_PATH].map(async (file) => JSON.parse(await fs.readFile(file, "utf8"))));
  const registry = Array.isArray(registryPayload) ? registryPayload : registryPayload?.artists;
  if (!Array.isArray(registry)) throw new Error("Provider identity registry has no artists array");
  const selected = selectEvents(events, registry, artists, options, deps.now || new Date());
  const state = { apiCalls: 0 };
  const results = [];
  const byArtist = new Map();
  for (const item of selected) {
    const rows = byArtist.get(item.artistName) || [];
    rows.push(item.event);
    byArtist.set(item.artistName, rows);
  }
  let authFailure = false;
  let authFailureReason = "";
  for (const [artistName, artistEvents] of byArtist) {
    let catalog = deps.fetchCatalog ? await deps.fetchCatalog(config, artistName, options, state) : await fetchCatalog(config, artistName, options, state, deps.env, deps.fetchImpl);
    if (catalog.authFailure) { authFailure = true; authFailureReason = catalog.stopReason || ""; break; }
    if (config.slug === "ticket-liquidator" && catalog.complete) {
      const referenceConfig = providerConfig("ticketnetwork");
      const reference = deps.fetchCatalog
        ? await deps.fetchCatalog(referenceConfig, artistName, options, state)
        : await fetchCatalog(referenceConfig, artistName, options, state, deps.env, deps.fetchImpl);
      if (reference.authFailure) { authFailure = true; authFailureReason = reference.stopReason || ""; break; }
      if (!reference.complete) {
        catalog = { ...catalog, complete: false, stopReason: `reference_${reference.stopReason || "incomplete"}` };
      } else {
        catalog = {
          ...catalog,
          candidates: enrichTicketLiquidatorCandidates(catalog.candidates, reference.candidates)
        };
      }
    }
    for (const event of artistEvents) {
      const link = event?.provider_links?.[config.linkKey] || {};
      const storedUrl = normalizeProviderUrl(config, event?.[config.urlField]);
      const storedId = clean(link?.event_id, 255);
      const passing = catalog.candidates.map((candidate) => ({ candidate, evaluated: evaluateCandidate(event, artistName, candidate) })).filter((row) => row.evaluated.ok).map((row) => ({ ...row.evaluated, ...row.candidate }));
      const exactStored = catalog.candidates.find((candidate) => (storedId && candidate.externalId === storedId) || (storedUrl && candidate.normalizedUrl === storedUrl));
      const storedCandidate = exactStored ? { ...evaluateCandidate(event, artistName, exactStored), ...exactStored } : null;
      const outcome = decideOutcome({ storedUrl, storedVerified: link?.verified === true, storedCandidate, passing, catalogComplete: catalog.complete });
      const applied = options.apply && applyOutcome(event, config, outcome, (deps.now || new Date()).toISOString().slice(0, 10));
      results.push({ event_id: event.id, artist: artistName, action: outcome.action, applied, url: outcome.candidate?.url || storedUrl || "", external_id: outcome.candidate?.externalId || storedId || "", catalog_complete: catalog.complete, stop_reason: catalog.stopReason || "" });
    }
  }
  if (authFailure) {
    const hint = isCatalogProxyRejection(authFailureReason.replace("http_", ""), deps.env || process.env)
      ? ` — ${CATALOG_PROXY_REJECTION_HINT}`
      : "";
    throw new Error(`${config.name} Impact catalog fetch was refused (${authFailureReason || "auth_failure"}); no writes were made${hint}`);
  }
  if (options.apply && results.some((row) => row.applied)) await fs.writeFile(EVENTS_PATH, `${JSON.stringify(events, null, 2)}\n`);
  return {
    provider: config.slug, mode: options.apply ? "apply" : "dry-run", selected: selected.length, api_calls: state.apiCalls,
    changed: results.filter((row) => row.applied).length,
    verified: results.filter((row) => row.action === "verify").length,
    added: results.filter((row) => row.action === "add").length,
    corrected: results.filter((row) => row.action === "correct").length,
    cleared: results.filter((row) => row.action === "clear").length,
    unverified: results.filter((row) => row.action === "unverify").length,
    conflicts: results.filter((row) => row.action === "conflict").length,
    results
  };
}

async function selfTest() {
  const config = providerConfig("ticketnetwork");
  const catalogItem = { CampaignId: "123", CatalogItemId: "tn-1", Name: "RAYE", Description: "RAYE at O2 Arena, London on 9 July 2027", Url: "https://www.ticketnetwork.com/tickets/raye-london-o2-arena-7-9-2027/tn-1", CurrentPrice: "55", Currency: "GBP" };
  const candidate = productCandidates(config, catalogItem, "123")[0];
  assert.equal(candidate.externalId, "tn-1");
  assert.equal(productCandidates(config, catalogItem, "wrong-program").length, 0);
  const searchUrl = catalogItemsUrl(config, "RAYE", 1, { IMPACT_SEATGEEK_ACCOUNT_SID: "sid", IMPACT_SEATGEEK_AUTH_TOKEN: "token", IMPACT_TICKETNETWORK_CAMPAIGN_ID: "123" });
  assert.match(searchUrl, /\/Catalogs\/896\/Items\?/);
  assert.equal(new URL(searchUrl).searchParams.get("IrVersion"), "16");
  assert.match(catalogItemsUrl(config, "RAYE", 1, { IMPACT_SEATGEEK_ACCOUNT_SID: "sid", IMPACT_SEATGEEK_AUTH_TOKEN: "token", IMPACT_TICKETNETWORK_CAMPAIGN_ID: "123", IMPACT_TICKETNETWORK_CATALOG_ID: "456" }), /\/Catalogs\/456\/Items\?/);
  assert.equal(catalogItems({ Items: [catalogItem] })[0].CatalogItemId, "tn-1");
  assert.equal(normalizeProviderUrl(config, "https://ticketnetwork.com/"), "");
  assert.equal(normalizeProviderUrl(config, "https://evil.example/tickets/1"), "");
  const liveTrackingItem = {
    ...catalogItem,
    CampaignId: "2322",
    Url: "https://ticketnetwork.lusg.net/c/3977745/132208/2322?prodsku=tn-1&u=https%3A%2F%2Fwww.ticketnetwork.com%2Fen%2Fp%2Ftn-1"
  };
  assert.equal(productCandidates(config, liveTrackingItem, "2322")[0].normalizedUrl, "https://www.ticketnetwork.com/en/p/tn-1");
  assert.equal(productCandidates(config, { ...liveTrackingItem, Url: "https://tracking.example/click?u=https%3A%2F%2Fevil.example%2Ftickets%2F1" }, "2322").length, 0);
  const proxyEnv = {
    IMPACT_CATALOG_PROXY_URL: "https://tourticketcompare.com/api/impact/products",
    IMPACT_CATALOG_PROXY_TOKEN: "proxy-token"
  };
  const proxySearchUrl = catalogItemsUrl(config, "RAYE", 2, proxyEnv);
  assert.equal(new URL(proxySearchUrl).searchParams.get("credentialSet"), "seatgeek");
  assert.equal(new URL(proxySearchUrl).searchParams.get("catalogId"), "896");
  assert.equal(new URL(proxySearchUrl).searchParams.get("campaignId"), "2322");
  assert.equal(new URL(proxySearchUrl).searchParams.get("page"), "2");
  // The proxy endpoint is token-gated. The token travels as a header so it
  // never lands in a logged URL, and a proxied run without one fails fast
  // rather than reading the gate's 404 as an empty catalog.
  assert.equal(new URL(proxySearchUrl).searchParams.has("token"), false);
  assert.equal(catalogProxyHeaders(proxyEnv)["X-Debug-Token"], "proxy-token");
  assert.equal(catalogProxyHeaders({ ...proxyEnv, IMPACT_CATALOG_PROXY_TOKEN: "", DEBUG_API_TOKEN: "fallback" })["X-Debug-Token"], "fallback");
  // Direct-credential runs never send the header.
  assert.deepEqual(catalogProxyHeaders({ IMPACT_SEATGEEK_ACCOUNT_SID: "sid", IMPACT_SEATGEEK_AUTH_TOKEN: "token" }), {});
  assert.throws(
    () => catalogItemsUrl(config, "RAYE", 1, { IMPACT_CATALOG_PROXY_URL: proxyEnv.IMPACT_CATALOG_PROXY_URL }),
    /token-gated/
  );

  // A token that CI has but Cloudflare Pages rejects: the request goes out and
  // comes back 404 from the gate. That must surface as an auth failure, not as
  // an incomplete catalog — an incomplete catalog exits 0 with no changes, so
  // the mismatch would otherwise leave the nightly sync a permanently green
  // no-op. A 404 on a direct (non-proxied) run keeps its old meaning.
  assert.equal(isCatalogProxyRejection(404, proxyEnv), true);
  assert.equal(isCatalogProxyRejection(404, { IMPACT_SEATGEEK_ACCOUNT_SID: "sid" }), false);
  assert.equal(isCatalogProxyRejection(500, proxyEnv), false);
  const gateRejected = await fetchCatalog(
    config, "RAYE", { delayMs: 0 }, { apiCalls: 0 },
    { ...proxyEnv, IMPACT_TICKETNETWORK_CAMPAIGN_ID: "2322", IMPACT_TICKETNETWORK_CATALOG_ID: "896" },
    async () => new Response(JSON.stringify({ ok: false, error: "Not found" }), { status: 404 })
  );
  assert.equal(gateRejected.authFailure, true);
  assert.equal(gateRejected.stopReason, "http_404");
  assert.equal(gateRejected.complete, false);
  // The same 404 without the proxy stays an ordinary incomplete catalog.
  const directNotFound = await fetchCatalog(
    config, "RAYE", { delayMs: 0 }, { apiCalls: 0 },
    { IMPACT_SEATGEEK_ACCOUNT_SID: "sid", IMPACT_SEATGEEK_AUTH_TOKEN: "token", IMPACT_TICKETNETWORK_CAMPAIGN_ID: "2322", IMPACT_TICKETNETWORK_CATALOG_ID: "896" },
    async () => new Response("", { status: 404 })
  );
  assert.equal(directNotFound.authFailure, undefined);
  assert.equal(directNotFound.complete, false);
  // 401/403 keep failing regardless of transport.
  for (const status of [401, 403]) {
    const refused = await fetchCatalog(
      config, "RAYE", { delayMs: 0 }, { apiCalls: 0 },
      { IMPACT_SEATGEEK_ACCOUNT_SID: "sid", IMPACT_SEATGEEK_AUTH_TOKEN: "token", IMPACT_TICKETNETWORK_CAMPAIGN_ID: "2322", IMPACT_TICKETNETWORK_CATALOG_ID: "896" },
      async () => new Response("", { status })
    );
    assert.equal(refused.authFailure, true);
  }
  // run() must convert that into a throw that names the misconfiguration,
  // rather than returning a clean zero-change summary.
  await assert.rejects(
    run({ provider: "ticketnetwork", apply: false, delayMs: 0, limit: null, maxApiCalls: null, artist: "" }, {
      env: proxyEnv,
      fetchCatalog: async () => ({ candidates: [], complete: false, authFailure: true, stopReason: "http_404" }),
      now: new Date("2027-01-01T00:00:00Z"),
      data: [
        [{ id: "e1", artist_slug: "raye", datetime_iso: "2027-07-09T19:00:00", timezone: "Europe/London", city: "London", venue: "O2 Arena", provider_links: {} }],
        [{ slug: "raye", name: "RAYE" }],
        [{ slug: "raye", review_status: "verified" }]
      ]
    }),
    /refused \(http_404\)[\s\S]*IMPACT_CATALOG_PROXY_TOKEN/
  );
  const event = { id: "e1", artist_slug: "raye", datetime_iso: "2027-07-09T19:00:00", timezone: "Europe/London", city: "London", venue: "O2 Arena", provider_links: {} };
  assert.equal(dateMatches("2027-07-09T20:00:00+01:00", { year: 2027, month: 7, day: 9 }), true);
  assert.equal(evaluateCandidate(event, "RAYE", candidate).ok, true);
  assert.equal(evaluateCandidate({ ...event, city: "Manchester" }, "RAYE", candidate).ok, false);
  // Shared local-date resolver: a row carrying an explicit numeric offset but
  // no IANA timezone states its own local date, so the date gate can pass. A
  // UTC instant with no timezone stays unresolved and the gate stays closed.
  assert.deepEqual(eventLocalDate({ datetime_iso: "2027-07-09T19:00:00+01:00" }), { year: 2027, month: 7, day: 9 });
  assert.equal(evaluateCandidate({ ...event, datetime_iso: "2027-07-09T19:00:00+01:00", timezone: "" }, "RAYE", candidate).ok, true);
  assert.equal(eventLocalDate({ datetime_iso: "2027-07-09T19:00:00Z" }), null);
  assert.equal(
    evaluateCandidate({ ...event, datetime_iso: "2027-07-09T19:00:00Z", timezone: "" }, "RAYE", candidate).reasons.includes("venue-local date mismatch"),
    true
  );
  const enrichedTl = enrichTicketLiquidatorCandidates(
    [{ externalId: "same-1", normalizedUrl: "https://ticketliquidator.com/tickets/same-1/raye-o2", searchableText: "RAYE O2 Arena 2027-07-09" }],
    [{ externalId: "same-1", normalizedUrl: "https://ticketnetwork.com/tickets/same-1", searchableText: "RAYE O2 Arena London 2027-07-09" }]
  );
  assert.equal(evaluateCandidate(event, "RAYE", enrichedTl[0]).ok, true);
  assert.equal(decideOutcome({ storedUrl: "", storedVerified: false, storedCandidate: null, passing: [candidate], catalogComplete: true }).action, "add");
  assert.equal(decideOutcome({ storedUrl: "https://ticketnetwork.com/tickets/x/1", storedVerified: true, storedCandidate: null, passing: [], catalogComplete: false }).action, "none");
  const changed = applyOutcome(event, config, { action: "add", candidate: { ...candidate, url: candidate.normalizedUrl } }, "2026-07-13");
  assert.equal(changed, true);
  assert.equal(event.provider_links.ticketnetwork.verified, true);
  assert.equal(event.ticketnetwork_url, candidate.normalizedUrl);
  const dry = await run({ provider: "ticketnetwork", artist: "", limit: null, maxApiCalls: null, delayMs: 0, apply: false, json: false }, {
    now: new Date("2026-07-13T00:00:00Z"),
    data: [[{ id: "e2", artist_slug: "raye", datetime_iso: "2027-07-09T19:00:00", timezone: "Europe/London", city: "London", venue: "O2 Arena", provider_links: {} }], [{ slug: "raye", name: "RAYE" }], [{ slug: "raye", review_status: "verified" }]],
    async fetchCatalog() { return { candidates: [candidate], complete: true, stopReason: "" }; }
  });
  assert.equal(dry.added, 1);
  assert.equal(dry.changed, 0);
  return 44;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) return console.log(usage());
  if (options.selfTest) return console.log(`Impact catalog provider sync self-test passed (${await selfTest()} checks).`);
  if (!options.provider) throw new Error("--provider is required");
  const summary = await run(options);
  console.log(options.json ? JSON.stringify(summary, null, 2) : `${summary.provider} ${summary.mode}: ${summary.selected} selected, ${summary.changed} changed, ${summary.added} added, ${summary.verified} verified, ${summary.corrected} corrected, ${summary.cleared} cleared, ${summary.unverified} unverified, ${summary.conflicts} conflicts.`);
}

if (import.meta.url === `file://${process.argv[1]}`) main().catch((error) => { console.error(error?.stack || error); process.exitCode = 1; });

export { applyOutcome, dateMatches, decideOutcome, enrichTicketLiquidatorCandidates, evaluateCandidate, eventLocalDate, parseArgs, run, selectEvents };
