#!/usr/bin/env node
// Commercial funnel measurement tests.
//
// Covers the three areas the funnel depends on being correct:
//   1. Event validation   — only allowed events and safe metadata are stored,
//                           and no personal data reaches analytics_events.
//   2. Duplicate prevention — one interaction produces one row, on both the
//                           client guard and the server insert path.
//   3. Redirect tracking  — /api/out records the authoritative outbound row
//                           with its funnel dimensions, keeps the provider
//                           allowlist and fail-closed behaviour intact, and
//                           does not change the affiliate URL by default.
//
// Pure modules are imported directly; /api/out and /api/analytics are exercised
// against a fake D1 binding and a fake ASSETS binding, so nothing here touches
// the network or a real database.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

import {
  ACQUISITION_SOURCES,
  AFFILIATE_PROVIDERS,
  CTA_LOCATIONS,
  PAGE_TYPES,
  classifyAcquisitionSource,
  classifyDestination,
  classifyDeviceCategory,
  classifyPageType,
  createClickId,
  createDuplicateGuard,
  isAffiliateProvider,
  isValidClickId,
  normalizeAnalyticsPath,
  normalizeCtaLocation,
  normalizeProviderSlug
} from "../functions/_funnel.js";
import { COLUMN_TIERS, bindValue, buildInsertSql, insertAnalyticsRow } from "../functions/_analytics-write.js";
import { sanitizeMetadata, externalReferrer, safeEventId, onRequestPost as analyticsPost } from "../functions/api/analytics.js";
import { onRequestGet as outGet, outboundClickIdParam } from "../functions/api/out.js";

let passed = 0;
const failures = [];

async function test(name, fn) {
  try {
    await fn();
    passed += 1;
  } catch (error) {
    failures.push(`${name}: ${error.message}`);
  }
}

// ── Fakes ───────────────────────────────────────────────────────────────────

// Minimal D1 stand-in. Records every statement and its bindings, and can be
// told to reject the wide column sets so the schema-tolerant fallback is
// exercised the way it would behave before the 0008 migration is applied.
function fakeDb({ rejectColumns = [] } = {}) {
  const rows = [];
  const attempts = [];
  return {
    rows,
    attempts,
    prepare(sql) {
      return {
        bind(...values) {
          return {
            async run() {
              attempts.push(sql);
              if (rejectColumns.some((column) => new RegExp(`\\b${column}\\b`).test(sql))) {
                throw new Error(`no such column: ${rejectColumns.find((column) => new RegExp(`\\b${column}\\b`).test(sql))}`);
              }
              const columns = sql.slice(sql.indexOf("(") + 1, sql.indexOf(")")).split(",").map((part) => part.trim());
              const row = {};
              columns.forEach((column, index) => {
                row[column] = values[index];
              });
              rows.push(row);
              return { success: true };
            }
          };
        }
      };
    }
  };
}

const SAMPLE_EVENT = {
  id: "tm-test-artist-2026-berlin-abc123",
  artist_slug: "test-artist",
  city: "Berlin",
  venue: "Test Arena",
  datetime_iso: "2026-11-19T19:00:00+01:00",
  verification_status: "human_verified",
  ticketmaster_event_id: "ABC123",
  ticketmaster_url: "https://www.ticketmaster.de/test-artist-berlin/event/ABC123",
  seatgeek_url: "https://seatgeek.com/test-artist-tickets/concert/9876543",
  provider_links: {
    ticketmaster: { verified: true },
    seatgeek: { verified: true }
  }
};

function fakeAssets(events = [SAMPLE_EVENT]) {
  return {
    async fetch() {
      return new Response(JSON.stringify(events), { status: 200, headers: { "Content-Type": "application/json" } });
    }
  };
}

const BROWSER_UA = "Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1";

function outRequest(query, { userAgent = BROWSER_UA, referer = null } = {}) {
  const headers = { "user-agent": userAgent, "cf-connecting-ip": "203.0.113.7" };
  if (referer) headers.referer = referer;
  return new Request(`https://tourticketcompare.com/api/out?${query}`, { headers });
}

function analyticsRequest(payload, { userAgent = BROWSER_UA } = {}) {
  return new Request("https://tourticketcompare.com/api/analytics", {
    method: "POST",
    headers: { "user-agent": userAgent, "cf-connecting-ip": "203.0.113.7", "content-type": "application/json" },
    body: JSON.stringify(payload)
  });
}

// ── 1. Dimension classification ─────────────────────────────────────────────

await test("page type covers every route class the site serves", () => {
  const cases = {
    "/": "home",
    "/artists": "artists_index",
    "/artists/harry-styles": "artist",
    "/artists/harry-styles/tickets/london-united-kingdom": "artist_city",
    "/artists/harry-styles/together-together": "artist_tour",
    "/cities": "cities_index",
    "/cities/london-united-kingdom": "city",
    "/venues": "venues_index",
    "/venues/wembley-stadium": "venue",
    "/guides": "guides_index",
    "/guides/how-to-avoid-ticket-scams": "guide",
    "/compare-concert-ticket-prices": "compare_hub",
    "/currency-converter": "currency_converter",
    "/about": "trust",
    "/nonsense/deep/path": "other"
  };
  for (const [path, expected] of Object.entries(cases)) {
    assert.equal(classifyPageType(path), expected, `${path} should classify as ${expected}`);
    assert.ok(PAGE_TYPES.includes(classifyPageType(path)), `${path} produced a page type outside the fixed vocabulary`);
  }
  // Trailing slashes and query strings must not fragment the vocabulary.
  assert.equal(classifyPageType("/artists/harry-styles/"), "artist");
  assert.equal(classifyPageType("/artists/harry-styles?utm_source=x"), "artist");
});

// The client cannot import the shared module (app.js is a classic script), so
// it carries an inline copy. If the two ever disagree, GA4 and the first-party
// row would label the same page differently.
await test("client page-type classifier agrees with the server", async () => {
  const appJs = await readFile(new URL("../public/app.js", import.meta.url), "utf8");
  const start = appJs.indexOf("function clientPageType(");
  assert.ok(start > -1, "public/app.js must define clientPageType");
  const body = appJs.slice(start, appJs.indexOf("\n}\n", start) + 2);
  // eslint-disable-next-line no-new-func
  const clientPageType = new Function(
    "TRUST_PAGE_PATHS",
    `${body}; return clientPageType;`
  )(["/how-it-works", "/about", "/contact", "/editorial-policy", "/affiliate-disclosure", "/privacy", "/terms"]);

  const paths = [
    "/", "/artists", "/artists/harry-styles", "/artists/harry-styles/tickets/london-united-kingdom",
    "/artists/harry-styles/together-together", "/cities", "/cities/london-united-kingdom", "/venues",
    "/venues/wembley-stadium", "/guides", "/guides/how-to-avoid-ticket-scams",
    "/compare-concert-ticket-prices", "/currency-converter", "/about", "/contact", "/nonsense/deep/path",
    "/artists/harry-styles/"
  ];
  for (const path of paths) {
    assert.equal(clientPageType(path), classifyPageType(path), `client and server disagree on ${path}`);
  }
});

await test("device category is coarse and never fingerprints", () => {
  assert.equal(classifyDeviceCategory(BROWSER_UA), "mobile");
  assert.equal(classifyDeviceCategory("Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120 Safari/537.36"), "desktop");
  assert.equal(classifyDeviceCategory("Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Safari/604.1"), "tablet");
  assert.equal(classifyDeviceCategory(""), "unknown");
  assert.equal(classifyDeviceCategory(null), "unknown");
});

await test("affiliate status and destination category are derived, not guessed", () => {
  assert.equal(isAffiliateProvider("ticketmaster"), false, "Ticketmaster is unmonetized and must never count as affiliate");
  for (const provider of AFFILIATE_PROVIDERS) assert.equal(isAffiliateProvider(provider), true);
  assert.equal(isAffiliateProvider("vividseats"), true, "legacy slug spelling must normalize");
  assert.equal(normalizeProviderSlug("Vivid Seats"), "vivid-seats");
  assert.equal(normalizeProviderSlug("StubHub International"), "stubhub-international");

  assert.equal(classifyDestination("seatgeek.pxf.io"), "affiliate_network");
  assert.equal(classifyDestination("vivid-seats.pxf.io"), "affiliate_network");
  assert.equal(classifyDestination("www.ticketmaster.com"), "provider_direct");
  assert.equal(classifyDestination(""), "unknown");
});

await test("acquisition source is a fixed low-cardinality vocabulary", () => {
  const cases = [
    [{ referrer: "https://www.google.com" }, "organic_search"],
    [{ referrer: "https://chatgpt.com" }, "ai_assistant"],
    [{ referrer: "https://t.co" }, "social"],
    [{ referrer: "https://someblog.example" }, "referral"],
    [{ utmMedium: "cpc" }, "paid"],
    [{ utmMedium: "newsletter" }, "email"],
    [{}, "direct"],
    [{ utmSource: "partner-newsletter" }, "referral"]
  ];
  for (const [input, expected] of cases) {
    const actual = classifyAcquisitionSource(input);
    assert.equal(actual, expected, `${JSON.stringify(input)} should classify as ${expected}`);
    assert.ok(ACQUISITION_SOURCES.includes(actual));
  }
});

await test("analytics paths never carry an origin, query or fragment", () => {
  assert.equal(normalizeAnalyticsPath("https://tourticketcompare.com/artists/bts?utm_source=x#show-1"), "/artists/bts");
  assert.equal(normalizeAnalyticsPath("/artists/bts/"), "/artists/bts");
  assert.equal(normalizeAnalyticsPath(""), "/");
  // Anything unparseable is resolved against an internal base, so the result is
  // always a site-relative path and never an absolute or foreign URL.
  assert.match(normalizeAnalyticsPath("not a url"), /^\//);
  // A foreign or protocol-relative URL keeps only its path — the host is
  // discarded, so no external address can be stored in a path column.
  assert.equal(normalizeAnalyticsPath("//evil.example/x"), "/x");
  assert.equal(normalizeAnalyticsPath("https://evil.example/x?y=1"), "/x");
  assert.equal(normalizeAnalyticsPath("/x".repeat(400)).length, 255);
});

await test("CTA location is allowlisted, so a crafted query cannot pollute it", () => {
  for (const location of CTA_LOCATIONS) assert.equal(normalizeCtaLocation(location), location);
  assert.equal(normalizeCtaLocation("Event_Card"), "event_card");
  assert.equal(normalizeCtaLocation("<script>alert(1)</script>"), null);
  assert.equal(normalizeCtaLocation("anything-else"), null);
  assert.equal(normalizeCtaLocation(""), null);
});

await test("click ids are opaque and validated", () => {
  const id = createClickId();
  assert.ok(isValidClickId(id), "generated click id must satisfy its own validator");
  assert.equal(id.length, 24);
  assert.notEqual(createClickId(), createClickId(), "click ids must not repeat");
  assert.equal(isValidClickId("nope"), false);
  assert.equal(isValidClickId(""), false);
});

// ── 2. Event validation ─────────────────────────────────────────────────────

await test("metadata sanitiser drops unknown keys, URLs and hostnames", () => {
  const metadata = sanitizeMetadata({
    priceSnapshot: "present",
    ctaLocation: "event_card",
    provider: "seatgeek",
    ctaCount: 4,
    isAffiliate: true,
    rawUrl: "https://provider.example/listing",
    destinationPath: "/api/out?showId=secret",
    leaked: "https://seatgeek.com/x",
    host: "www.vividseats.com",
    dotCom: "partner.com",
    oversized: "x".repeat(500)
  });
  assert.deepEqual(metadata, {
    priceSnapshot: "present",
    ctaLocation: "event_card",
    provider: "seatgeek",
    ctaCount: 4,
    isAffiliate: true
  });
});

await test("metadata sanitiser rejects URL-shaped values on allowlisted keys", () => {
  // The keys are allowed; the values are not. Before this fix the URL guard's
  // escaping meant only an explicit "http:"/"https:" prefix was caught.
  assert.deepEqual(sanitizeMetadata({ reason: "https://evil.example" }), {});
  assert.deepEqual(sanitizeMetadata({ reason: "www.evil.example" }), {});
  assert.deepEqual(sanitizeMetadata({ reason: "evil.com" }), {});
  assert.deepEqual(sanitizeMetadata({ reason: "//evil.example" }), {});
  assert.deepEqual(sanitizeMetadata({ reason: "sold_out" }), { reason: "sold_out" });
});

await test("event ids are shape-checked before they reach the column", () => {
  assert.equal(safeEventId("tm-morgan-wallen-2026-indianapolis-0500635ddc2db013"), "tm-morgan-wallen-2026-indianapolis-0500635ddc2db013");
  assert.equal(safeEventId("' OR 1=1 --"), null);
  assert.equal(safeEventId("has spaces"), null);
  assert.equal(safeEventId(""), null);
});

await test("self-referential referrers are never recorded as acquisition", () => {
  assert.equal(externalReferrer("https://www.google.com/search"), "https://www.google.com");
  assert.equal(externalReferrer("https://tourticketcompare.com/artists/bts"), null);
  assert.equal(externalReferrer("https://tourticketcompare.pages.dev/"), null);
  assert.equal(externalReferrer("javascript:alert(1)"), null);
  assert.equal(externalReferrer(""), null);
});

await test("/api/analytics rejects unknown events and stores funnel dimensions", async () => {
  const db = fakeDb();
  const rejected = await analyticsPost({
    request: analyticsRequest({ eventName: "definitely_not_a_funnel_event" }),
    env: { DEMAND_DB: db }
  });
  assert.equal(rejected.status, 400);
  assert.equal(db.rows.length, 0, "an unknown event must not write a row");

  for (const eventName of ["page_view", "artist_view", "event_view", "provider_cta_view", "provider_click"]) {
    const response = await analyticsPost({
      request: analyticsRequest({
        eventName,
        sourcePath: "/artists/bts?utm_source=newsletter",
        artistSlug: "bts",
        provider: eventName === "provider_click" ? "seatgeek" : "",
        eventId: "tm-bts-2026-london-abc",
        landingPath: "/",
        referrer: "https://www.google.com",
        metadata: { ctaLocation: "event_card", utmSource: "newsletter", utmMedium: "email" }
      }),
      env: { DEMAND_DB: db }
    });
    assert.equal(response.status, 200, `${eventName} should be accepted`);
  }

  const pageView = db.rows[0];
  assert.equal(pageView.event_name, "page_view");
  assert.equal(pageView.source_path, "/artists/bts", "query string must be stripped from the stored path");
  assert.equal(pageView.page_type, "artist");
  assert.equal(pageView.landing_path, "/");
  assert.equal(pageView.event_id, "tm-bts-2026-london-abc");
  assert.equal(pageView.cta_location, "event_card");
  assert.equal(pageView.device_category, "mobile");
  assert.equal(pageView.acquisition_source, "email");
  assert.equal(pageView.utm_source, "newsletter");
  assert.equal(pageView.referrer, "https://www.google.com");
  assert.ok(/^[0-9a-f]{64}$/.test(pageView.request_key), "visitor key must be a hash");

  const providerClick = db.rows.find((row) => row.event_name === "provider_click");
  assert.equal(providerClick.provider, "seatgeek");
  assert.equal(providerClick.is_affiliate, 1);
});

await test("the authoritative outbound event cannot be written from the public beacon", async () => {
  const db = fakeDb();
  // /api/analytics is unauthenticated and the report identifies an
  // authoritative click purely by event_name, so accepting this name from a
  // browser would let anyone inflate every commercial click metric without
  // completing a redirect.
  const forged = await analyticsPost({
    request: analyticsRequest({
      eventName: "outbound_click",
      sourcePath: "/artists/bts",
      artistSlug: "bts",
      provider: "seatgeek"
    }),
    env: { DEMAND_DB: db }
  });
  assert.equal(forged.status, 400, "a client-posted outbound_click must be rejected");
  assert.equal(db.rows.length, 0, "and must never reach analytics_events");

  // The same is true of the blocked-redirect event, which is also server-only.
  const forgedBlocked = await analyticsPost({
    request: analyticsRequest({ eventName: "outbound_blocked", sourcePath: "/" }),
    env: { DEMAND_DB: db }
  });
  assert.equal(forgedBlocked.status, 400);
  assert.equal(db.rows.length, 0);

  // Only /api/out writes it, and it still does.
  const outDb = fakeDb();
  await outGet({
    request: outRequest(`showId=${SAMPLE_EVENT.id}&provider=ticketmaster&sourcePath=/artists/test-artist`),
    env: { DEMAND_DB: outDb, ASSETS: fakeAssets() }
  });
  assert.equal(outDb.rows[0].event_name, "outbound_click");
});

await test("acquisition is recorded on the session entry and left unset after it", async () => {
  const db = fakeDb();
  const env = { DEMAND_DB: db };
  // Session entry: carries the referrer and UTM values.
  await analyticsPost({
    request: analyticsRequest({
      eventName: "page_view",
      sourcePath: "/artists/bts",
      referrer: "https://www.google.com",
      metadata: { entry: true }
    }),
    env
  });
  // Everything after it deliberately omits them; classifying those rows would
  // stamp the whole visit "direct" and bury the organic source.
  for (const eventName of ["artist_view", "event_view", "provider_cta_view", "provider_click", "page_view"]) {
    await analyticsPost({ request: analyticsRequest({ eventName, sourcePath: "/artists/bts" }), env });
  }
  assert.equal(db.rows[0].acquisition_source, "organic_search");
  assert.equal(db.rows[0].referrer, "https://www.google.com");
  for (const row of db.rows.slice(1)) {
    assert.equal(row.acquisition_source, null, `${row.event_name} must not be labelled as its own acquisition`);
  }

  // A genuinely direct entry is still recorded as direct, not left blank.
  const directDb = fakeDb();
  await analyticsPost({
    request: analyticsRequest({ eventName: "page_view", sourcePath: "/", metadata: { entry: true } }),
    env: { DEMAND_DB: directDb }
  });
  assert.equal(directDb.rows[0].acquisition_source, "direct");
});

await test("affiliate status follows the destination actually redirected to", async () => {
  const affiliateDb = fakeDb();
  await outGet({
    request: outRequest(`showId=${SAMPLE_EVENT.id}&provider=seatgeek&sourcePath=/artists/test-artist`),
    env: {
      DEMAND_DB: affiliateDb,
      ASSETS: fakeAssets(),
      IMPACT_SEATGEEK_BASE_TRACKING_URL: "https://seatgeek.pxf.io/c/1234/5678/9012"
    }
  });
  assert.equal(affiliateDb.rows[0].destination_category, "affiliate_network");
  assert.equal(affiliateDb.rows[0].is_affiliate, 1);

  // Ticketmaster is an affiliate-programme non-member: a direct provider hop.
  const directDb = fakeDb();
  await outGet({
    request: outRequest(`showId=${SAMPLE_EVENT.id}&provider=ticketmaster&sourcePath=/artists/test-artist`),
    env: { DEMAND_DB: directDb, ASSETS: fakeAssets() }
  });
  assert.equal(directDb.rows[0].destination_category, "provider_direct");
  assert.equal(directDb.rows[0].is_affiliate, 0);

  // A blocked click never reached a destination, so it falls back to the lane
  // the visitor was trying to use rather than being counted as unmonetized.
  const blockedDb = fakeDb();
  await outGet({
    request: outRequest(`showId=${SAMPLE_EVENT.id}&provider=seatgeek&sourcePath=/artists/test-artist`),
    env: { DEMAND_DB: blockedDb, ASSETS: fakeAssets() }
  });
  assert.equal(blockedDb.rows[0].event_name, "outbound_blocked");
  assert.equal(blockedDb.rows[0].destination_category, "unknown");
  assert.equal(blockedDb.rows[0].is_affiliate, 1);
});

await test("/api/analytics never stores an email, even when one is posted", async () => {
  const db = fakeDb();
  await analyticsPost({
    request: analyticsRequest({
      eventName: "email_signup",
      email: "someone@example.com",
      sourcePath: "/artists/bts",
      metadata: { reason: "someone@example.com" }
    }),
    env: { DEMAND_DB: db }
  });
  assert.equal(db.rows.length, 1);
  assert.equal(db.rows[0].email, null, "a public beacon must never write an address");
  const serialized = JSON.stringify(db.rows[0]);
  assert.ok(!serialized.includes("someone@example.com"), "no column may contain the posted address");
});

await test("bot filtering still drops self-identifying crawlers on both paths", async () => {
  const analyticsDb = fakeDb();
  const response = await analyticsPost({
    request: analyticsRequest({ eventName: "page_view", sourcePath: "/" }, { userAgent: "Mozilla/5.0 (compatible; GPTBot/1.0)" }),
    env: { DEMAND_DB: analyticsDb }
  });
  assert.equal(response.status, 200, "a crawler beacon is accepted, not errored");
  assert.equal(analyticsDb.rows.length, 0, "but no row is written");

  const outDb = fakeDb();
  const redirect = await outGet({
    request: outRequest("artistSlug=beyonce&provider=ticketmaster&sourcePath=/artists/beyonce", { userAgent: "ClaudeBot/1.0" }),
    env: { DEMAND_DB: outDb, ASSETS: fakeAssets() }
  });
  assert.equal(redirect.status, 302, "the redirect itself must be unaffected");
  assert.equal(outDb.rows.length, 0, "a crawler click must not be recorded");
});

// ── 3. Duplicate prevention ─────────────────────────────────────────────────

await test("duplicate guard suppresses a repeat inside the window only", () => {
  const isDuplicate = createDuplicateGuard(1500);
  assert.equal(isDuplicate("provider_click:seatgeek:evt:event_card", 1000), false, "first click counts");
  assert.equal(isDuplicate("provider_click:seatgeek:evt:event_card", 1100), true, "a double-click is one intent");
  assert.equal(isDuplicate("provider_click:seatgeek:evt:event_card", 2600), false, "a genuine second click later counts");
  assert.equal(isDuplicate("provider_click:ticketmaster:evt:event_card", 1100), false, "a different CTA is a different intent");
});

await test("duplicate guard memory is bounded", () => {
  const isDuplicate = createDuplicateGuard(1500, 10);
  for (let index = 0; index < 200; index += 1) isDuplicate(`key-${index}`, index);
  assert.equal(isDuplicate("key-199", 199 + 100), true, "the most recent key is still tracked");
  assert.equal(isDuplicate("key-0", 200), false, "the oldest keys are evicted rather than accumulating");
});

await test("client CTA listener applies the same guard before beaconing", async () => {
  const appJs = await readFile(new URL("../public/app.js", import.meta.url), "utf8");
  const guardAt = appJs.indexOf("isDuplicateFunnelEvent(`provider_click:");
  const beaconAt = appJs.indexOf('sendAnalytics("provider_click"');
  assert.ok(guardAt > -1, "the delegated CTA listener must dedupe provider clicks");
  assert.ok(beaconAt > -1, "the delegated CTA listener must still send provider_click");
  assert.ok(guardAt < beaconAt, "the guard must run before the beacon, not after");
});

await test("one interaction produces exactly one outbound row", async () => {
  const db = fakeDb();
  const env = { DEMAND_DB: db, ASSETS: fakeAssets() };
  await outGet({ request: outRequest(`showId=${SAMPLE_EVENT.id}&provider=ticketmaster&sourcePath=/artists/test-artist`), env });
  assert.equal(db.rows.length, 1, "a single redirect writes a single row");
  assert.equal(db.rows.filter((row) => row.event_name === "outbound_click").length, 1);
});

// ── 4. Redirect tracking ────────────────────────────────────────────────────

await test("outbound_click records the funnel dimensions from the reviewed event", async () => {
  const db = fakeDb();
  const env = { DEMAND_DB: db, ASSETS: fakeAssets() };
  const response = await outGet({
    request: outRequest(`showId=${SAMPLE_EVENT.id}&provider=ticketmaster&sourcePath=/cities/berlin-germany&ctaLocation=event_card`),
    env
  });
  assert.equal(response.status, 302);
  assert.equal(response.headers.get("Location"), SAMPLE_EVENT.ticketmaster_url);

  const row = db.rows[0];
  assert.equal(row.event_name, "outbound_click");
  assert.equal(row.source_path, "/cities/berlin-germany");
  assert.equal(row.page_type, "city", "page type is derived server-side from the clicked page");
  assert.equal(row.cta_location, "event_card");
  assert.equal(row.artist_slug, "test-artist");
  assert.equal(row.provider, "ticketmaster");
  assert.equal(row.event_id, SAMPLE_EVENT.id);
  assert.equal(row.event_date, "2026-11-19", "the date comes from the catalogue, not the request");
  assert.equal(row.event_city, "Berlin");
  assert.equal(row.event_venue, "Test Arena");
  assert.equal(row.destination_host, "www.ticketmaster.de");
  assert.equal(row.destination_category, "provider_direct");
  assert.equal(row.is_affiliate, 0, "Ticketmaster is not an affiliate lane");
  assert.equal(row.device_category, "mobile");
  assert.ok(isValidClickId(row.click_id), "every redirect gets a click id");
  assert.ok(/^[0-9a-f]{64}$/.test(row.request_key), "the outbound row must be joinable to the session");
  assert.equal(row.email, null);
  assert.equal(row.referrer, null, "a same-origin referer is not an acquisition source");
});

await test("event facts and dimensions cannot be spoofed through the query string", async () => {
  const db = fakeDb();
  const env = { DEMAND_DB: db, ASSETS: fakeAssets() };
  await outGet({
    request: outRequest(
      `showId=${SAMPLE_EVENT.id}&provider=ticketmaster&sourcePath=https://evil.example/phish?x=1&ctaLocation=injected_value&eventCity=Nowhere`
    ),
    env
  });
  const row = db.rows[0];
  assert.equal(row.source_path, "/phish", "an absolute foreign URL is reduced to a path");
  assert.equal(row.cta_location, null, "an unknown CTA location is discarded, not stored");
  assert.equal(row.event_city, "Berlin", "city comes from the event record regardless of the query");
});

await test("the CTA source path falls back to the same-origin referer", async () => {
  const db = fakeDb();
  const env = { DEMAND_DB: db, ASSETS: fakeAssets() };
  await outGet({
    request: outRequest(`showId=${SAMPLE_EVENT.id}&provider=ticketmaster`, {
      referer: "https://tourticketcompare.com/venues/test-arena?page=2"
    }),
    env
  });
  assert.equal(db.rows[0].source_path, "/venues/test-arena");
  assert.equal(db.rows[0].page_type, "venue");
});

await test("a blocked redirect is recorded instead of vanishing from the funnel", async () => {
  const db = fakeDb();
  // SeatGeek is Impact-wrapped; with no Impact configuration the redirect fails
  // closed. The click still happened and must remain visible.
  const response = await outGet({
    request: outRequest(`showId=${SAMPLE_EVENT.id}&provider=seatgeek&sourcePath=/artists/test-artist`),
    env: { DEMAND_DB: db, ASSETS: fakeAssets() }
  });
  assert.equal(response.status, 400, "an Impact failure must never produce an untracked redirect");
  assert.equal(db.rows.length, 1);
  const row = db.rows[0];
  assert.equal(row.event_name, "outbound_blocked", "blocked clicks use a distinct name so outbound_click stays comparable");
  assert.equal(row.provider, "seatgeek");
  assert.equal(row.artist_slug, "test-artist");
  assert.ok(String(row.metadata_json).includes("impact_"), "the failure reason is retained for diagnosis");
});

await test("probing and malformed requests are not recorded as demand", async () => {
  const db = fakeDb();
  const env = { DEMAND_DB: db, ASSETS: fakeAssets() };
  const unknownProvider = await outGet({ request: outRequest("artistSlug=beyonce&provider=not-a-provider"), env });
  assert.equal(unknownProvider.status, 400);
  const missingArtist = await outGet({ request: outRequest("provider=ticketmaster"), env });
  assert.equal(missingArtist.status, 400);
  assert.equal(db.rows.length, 0, "scanner traffic must not enter the funnel");
});

await test("provider allowlisting and fail-closed redirects are unchanged", async () => {
  const db = fakeDb();
  const env = { DEMAND_DB: db, ASSETS: fakeAssets() };

  const offAllowlist = await outGet({
    request: outRequest("artistSlug=beyonce&provider=ticketmaster&deepLink=https%3A%2F%2Fevil.example%2Fx"),
    env
  });
  assert.equal(offAllowlist.status, 400, "a destination outside the provider allowlist must be refused");

  const privateHost = await outGet({
    request: outRequest("artistSlug=beyonce&provider=ticketmaster&deepLink=http%3A%2F%2F127.0.0.1%2Fx"),
    env
  });
  assert.equal(privateHost.status, 400, "a private-network destination must be refused");

  const unpublishable = await outGet({
    request: outRequest("showId=tm-test-artist-2026-berlin-abc123&provider=ticketmaster"),
    env: { DEMAND_DB: fakeDb(), ASSETS: fakeAssets([{ ...SAMPLE_EVENT, verification_status: "needs_recheck" }]) }
  });
  assert.equal(unpublishable.status, 400, "a needs_recheck event must not produce a Ticketmaster redirect");
});

await test("the affiliate URL is unchanged unless the SubId flag is explicitly on", async () => {
  const baseEnv = {
    ASSETS: fakeAssets(),
    IMPACT_SEATGEEK_BASE_TRACKING_URL: "https://seatgeek.pxf.io/c/1234/5678/9012"
  };

  const defaultDb = fakeDb();
  const withoutSubId = await outGet({
    request: outRequest(`showId=${SAMPLE_EVENT.id}&provider=seatgeek&sourcePath=/artists/test-artist`),
    env: { ...baseEnv, DEMAND_DB: defaultDb }
  });
  assert.equal(withoutSubId.status, 302);
  const plainLocation = new URL(withoutSubId.headers.get("Location"));
  assert.deepEqual([...plainLocation.searchParams.keys()], ["u"], "by default only the destination parameter is added");
  assert.equal(plainLocation.searchParams.get("u"), SAMPLE_EVENT.seatgeek_url);
  assert.equal(defaultDb.rows[0].destination_category, "affiliate_network");
  assert.equal(defaultDb.rows[0].is_affiliate, 1);

  assert.equal(outboundClickIdParam({}), "", "the SubId passthrough is off by default");
  assert.equal(outboundClickIdParam({ OUT_CLICK_ID_SUBID_ENABLED: "true" }), "subId1");
  assert.equal(outboundClickIdParam({ OUT_CLICK_ID_SUBID_ENABLED: "true", OUT_CLICK_ID_SUBID_PARAM: "sharedid" }), "sharedid");
  assert.equal(outboundClickIdParam({ OUT_CLICK_ID_SUBID_ENABLED: "true", OUT_CLICK_ID_SUBID_PARAM: "bad param!" }), "", "an unusable parameter name is refused rather than injected");

  const enabledDb = fakeDb();
  const withSubId = await outGet({
    request: outRequest(`showId=${SAMPLE_EVENT.id}&provider=seatgeek&sourcePath=/artists/test-artist`),
    env: { ...baseEnv, DEMAND_DB: enabledDb, OUT_CLICK_ID_SUBID_ENABLED: "true" }
  });
  const trackedLocation = new URL(withSubId.headers.get("Location"));
  assert.equal(trackedLocation.searchParams.get("u"), SAMPLE_EVENT.seatgeek_url, "the destination is untouched by the SubId");
  assert.equal(trackedLocation.searchParams.get("subId1"), enabledDb.rows[0].click_id, "the SubId is the click id recorded on our own row");
});

// ── 5. Schema tolerance and backwards compatibility ─────────────────────────

await test("insert falls back tier by tier when the migration has not been applied", async () => {
  const legacy = fakeDb({ rejectColumns: ["page_type"] });
  const result = await insertAnalyticsRow(legacy, {
    created_at: "2026-07-31T00:00:00.000Z",
    event_name: "page_view",
    source_path: "/",
    page_type: "home"
  });
  assert.equal(result.ok, true, "a pre-migration database must still record the row");
  assert.equal(result.tier, 1, "it falls back to the previous column set");
  assert.equal(legacy.rows.length, 1);
  assert.equal(legacy.rows[0].event_name, "page_view");

  const ancient = fakeDb({ rejectColumns: ["page_type", "provider"] });
  const oldest = await insertAnalyticsRow(ancient, { created_at: "2026-07-31T00:00:00.000Z", event_name: "page_view", source_path: "/" });
  assert.equal(oldest.ok, true);
  assert.equal(oldest.tier, 2, "and finally to the original nine columns");

  const broken = fakeDb({ rejectColumns: ["created_at"] });
  const failed = await insertAnalyticsRow(broken, { created_at: "x", event_name: "page_view" });
  assert.equal(failed.ok, false, "a total failure is reported, never thrown");
});

await test("the widest insert is a superset of every earlier schema", () => {
  const [widest, click, base] = COLUMN_TIERS;
  for (const column of base) assert.ok(click.includes(column) && widest.includes(column));
  for (const column of click) assert.ok(widest.includes(column));
  assert.deepEqual(base.slice(0, 3), ["created_at", "event_name", "source_path"], "the original column order is preserved");
  assert.equal(buildInsertSql(["a", "b"]), "INSERT INTO analytics_events (a, b) VALUES (?1, ?2)");
  assert.equal(bindValue(true), 1);
  assert.equal(bindValue(false), 0);
  assert.equal(bindValue(undefined), null);
  assert.equal(bindValue(""), null);
});

// ── 6. Report SQL executed against a real SQLite engine ─────────────────────
// String assertions cannot catch a query that is syntactically wrong or that
// fans out across a join. These build the real 0008 schema in memory and run
// the report's own statements against it.

const ANALYTICS_SCHEMA = `
CREATE TABLE analytics_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL, event_name TEXT NOT NULL, source_path TEXT, artist_slug TEXT,
  email TEXT, request_key TEXT, referrer TEXT, user_agent TEXT, metadata_json TEXT,
  provider TEXT, tour_slug TEXT, destination_host TEXT, link_id TEXT,
  page_type TEXT, landing_path TEXT, event_id TEXT, event_date TEXT, event_city TEXT,
  event_venue TEXT, cta_location TEXT, destination_category TEXT, is_affiliate INTEGER,
  device_category TEXT, acquisition_source TEXT, utm_source TEXT, utm_medium TEXT,
  utm_campaign TEXT, click_id TEXT
);`;

async function openFixtureDb(rows) {
  const { DatabaseSync } = await import("node:sqlite");
  const db = new DatabaseSync(":memory:");
  db.exec(ANALYTICS_SCHEMA);
  const columns = ["created_at", "event_name", "source_path", "artist_slug", "request_key", "landing_path", "page_type", "provider", "is_affiliate", "destination_category", "cta_location", "metadata_json"];
  const insert = db.prepare(`INSERT INTO analytics_events (${columns.join(", ")}) VALUES (${columns.map(() => "?").join(", ")})`);
  for (const row of rows) insert.run(...columns.map((column) => row[column] ?? null));
  return db;
}

await test("every report query is valid SQLite against the 0008 schema", async () => {
  const { buildStatements } = await import("./report-commercial-funnel.mjs");
  let db;
  try {
    db = await openFixtureDb([
      { created_at: "2026-07-20T10:00:00.000Z", event_name: "page_view", source_path: "/artists/x", artist_slug: "x", request_key: "v1", landing_path: "/artists/x", page_type: "artist" },
      { created_at: "2026-07-20T10:05:00.000Z", event_name: "outbound_click", source_path: "/artists/x", artist_slug: "x", request_key: "v1", page_type: "artist", provider: "seatgeek", is_affiliate: 1, destination_category: "affiliate_network", cta_location: "event_card" },
      { created_at: "2026-07-20T10:06:00.000Z", event_name: "outbound_blocked", source_path: "/artists/x", artist_slug: "x", request_key: "v1", provider: "vivid-seats", metadata_json: JSON.stringify({ status: "impact_request_failed" }) },
      { created_at: "2026-07-20T10:07:00.000Z", event_name: "email_signup", source_path: "/artists/y", artist_slug: "y", request_key: "v2" }
    ]);
  } catch (error) {
    // node:sqlite is unavailable — fall back to asserting the join shape.
    const statements = buildStatements({ since: "", until: "" });
    const landing = statements.find((entry) => entry.key === "landingPageClicks");
    assert.match(landing.sql, /JOIN \(\s*SELECT/, "landing clicks must join a deduplicated subquery");
    return;
  }
  for (const statement of buildStatements({ since: "2026-07-01T00:00:00.000Z", until: "2026-08-01T00:00:00.000Z" })) {
    assert.doesNotThrow(() => db.prepare(statement.sql).all(), `${statement.key} is not valid SQLite`);
  }
  db.close();
});

await test("a landing page is not credited one click per page the visitor viewed", async () => {
  const { buildStatements } = await import("./report-commercial-funnel.mjs");
  let db;
  try {
    // One visitor, one click, five page views on the same day. Joining the
    // click against the raw page_view rows would report five clicks and a
    // click-through rate above 100% against the distinct-session denominator.
    const rows = [];
    for (let index = 0; index < 5; index += 1) {
      rows.push({
        created_at: `2026-07-20T1${index}:00:00.000Z`,
        event_name: "page_view",
        source_path: index === 0 ? "/" : `/artists/artist-${index}`,
        request_key: "visitor-1",
        landing_path: "/",
        page_type: index === 0 ? "home" : "artist"
      });
    }
    rows.push({
      created_at: "2026-07-20T15:00:00.000Z",
      event_name: "outbound_click",
      source_path: "/artists/artist-1",
      artist_slug: "artist-1",
      request_key: "visitor-1",
      page_type: "artist",
      provider: "seatgeek",
      is_affiliate: 1,
      destination_category: "affiliate_network"
    });
    db = await openFixtureDb(rows);
  } catch (error) {
    return;
  }
  const statements = buildStatements({ since: "2026-07-01T00:00:00.000Z", until: "2026-08-01T00:00:00.000Z" });
  const landingClicks = db.prepare(statements.find((entry) => entry.key === "landingPageClicks").sql).all();
  const landingViews = db.prepare(statements.find((entry) => entry.key === "landingPageViews").sql).all();
  assert.deepEqual(
    landingClicks.map((row) => [row.landing_path, Number(row.clicks)]),
    [["/", 1]],
    "one click must stay one click regardless of how many pages the visitor saw"
  );
  const sessions = Number(landingViews.find((row) => row.landing_path === "/").sessions);
  assert.equal(sessions, 1);
  assert.ok(Number(landingClicks[0].clicks) <= sessions, "landing-page click-through must not exceed 100%");
  db.close();
});

await test("the landing row is the visitor's earliest page view of the day", async () => {
  const { buildStatements } = await import("./report-commercial-funnel.mjs");
  let db;
  try {
    db = await openFixtureDb([
      { created_at: "2026-07-20T09:00:00.000Z", event_name: "page_view", source_path: "/", request_key: "v1", landing_path: "/", page_type: "home" },
      // A later document load in the same tab reuses the stored landing path;
      // a genuinely new session on the same day reports its own.
      { created_at: "2026-07-20T18:00:00.000Z", event_name: "page_view", source_path: "/guides", request_key: "v1", landing_path: "/guides", page_type: "guides_index" },
      { created_at: "2026-07-20T18:30:00.000Z", event_name: "outbound_click", source_path: "/artists/x", artist_slug: "x", request_key: "v1", provider: "seatgeek" }
    ]);
  } catch (error) {
    return;
  }
  const statements = buildStatements({ since: "", until: "" });
  const rows = db.prepare(statements.find((entry) => entry.key === "landingPageClicks").sql).all();
  assert.deepEqual(rows.map((row) => [row.landing_path, Number(row.clicks)]), [["/", 1]], "the earliest page view of the visitor-day is the landing page");
  db.close();
});

// ── 7. Source-level invariants ──────────────────────────────────────────────

await test("GA4 mirrors funnel events without high-cardinality or personal parameters", async () => {
  const appJs = await readFile(new URL("../public/app.js", import.meta.url), "utf8");
  const start = appJs.indexOf("function mirrorToGa4(");
  assert.ok(start > -1, "public/app.js must define mirrorToGa4");
  const mirror = appJs.slice(start, appJs.indexOf("\n}\n", start));
  for (const banned of ["event_id", "eventId", "landing", "referrer", "email", "city", "venue"]) {
    assert.ok(!mirror.includes(banned), `GA4 parameters must not include ${banned}`);
  }
  assert.match(appJs, /const GA4_MIRRORED_EVENTS = \[[^\]]*"provider_click"[^\]]*\]/);
  assert.ok(
    !/GA4_MIRRORED_EVENTS = \[[^\]]*"page_view"/.test(appJs),
    "page_view must not be mirrored — the gtag config snippet already emits it"
  );
  assert.ok(
    !/GA4_MIRRORED_EVENTS = \[[^\]]*"outbound_click"/.test(appJs),
    "the authoritative outbound event is server-side and cannot be mirrored from the client"
  );
});

await test("CTA impressions observe every button, not just the first in the document", async () => {
  const appJs = await readFile(new URL("../public/app.js", import.meta.url), "utf8");
  // A deep link to #show-<id> opens the page part-way down the board, where a
  // later CTA is on screen and the first is not.
  assert.ok(
    !/const firstCta = document\.querySelector\("a\[data-cta-provider\]"\)/.test(appJs),
    "observing only the first CTA misses impressions on deep-linked pages"
  );
  assert.match(appJs, /observedCtas = Array\.from\(document\.querySelectorAll\("a\[data-cta-provider\]"\)\)/);
  // One impression per page view: the first to satisfy dwell cancels the rest.
  assert.ok(
    appJs.indexOf("observedCtas.forEach((cta) => funnelImpressionObserver?.unobserve(cta))") > -1,
    "the remaining CTAs must be unobserved once one has reported"
  );
});

await test("a view is never attributed to an artist the catalogue does not have", async () => {
  const appJs = await readFile(new URL("../public/app.js", import.meta.url), "utf8");
  // /artists/<unknown> is a 404 and /artists/<real>/<bad-tour> is a 404 under a
  // real artist. Copying the path segment would invent a slug on the first and
  // credit an unreadable page on the second.
  assert.match(appJs, /current\.type !== "not-found" && pathArtistSlug \? findArtist\(pathArtistSlug\)\?\.slug \|\| "" : ""/);
  const fallbackAt = appJs.indexOf("const resolvedPathArtist");
  const artistViewAt = appJs.indexOf('sendAnalytics("artist_view"');
  assert.ok(fallbackAt > -1 && artistViewAt > fallbackAt, "artist_view must depend on the resolved slug");
});

await test("no analytics endpoint exposes stored data over GET", async () => {
  const analyticsSource = await readFile(new URL("../functions/api/analytics.js", import.meta.url), "utf8");
  assert.ok(!/export\s+(async\s+)?function\s+onRequestGet/.test(analyticsSource), "/api/analytics must stay write-only");
  // Look for SQL, not for the word. Comments legitimately use "selected" in
  // prose; what must never appear is a statement that reads rows back out.
  const code = analyticsSource
    .replace(/\/\*[\s\S]*?\*\//g, "")
    .split("\n")
    .filter((line) => !line.trim().startsWith("//"))
    .join("\n");
  assert.ok(!/\bSELECT\b[\s\S]{0,200}?\bFROM\b/i.test(code), "/api/analytics must not read rows back");
  assert.ok(!/\.(first|all|raw)\s*\(/.test(code), "/api/analytics must not use a D1 read method");
});

await test("every funnel report query is read-only and free of personal columns", async () => {
  const { buildStatements, assertReadOnlySql, assertNoPersonalColumns } =
    await import("./report-commercial-funnel.mjs");
  const statements = buildStatements({ since: "2026-07-01T00:00:00.000Z", until: "2026-07-31T00:00:00.000Z" });
  assert.ok(statements.length > 0);
  for (const statement of statements) {
    assertReadOnlySql(statement.sql);
    assertNoPersonalColumns(statement.sql);
  }
  // The headline click figures must come from the server-side row.
  const clickQueries = statements.filter((statement) => /clicksBy|affiliateSplit/.test(statement.key));
  assert.ok(clickQueries.length >= 4);
  for (const statement of clickQueries) {
    assert.match(statement.sql, /'outbound_click'/, `${statement.key} must count the authoritative outbound event`);
  }
});

// ── Result ──────────────────────────────────────────────────────────────────

if (failures.length) {
  console.error(`Funnel analytics tests failed (${failures.length} of ${passed + failures.length}):`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Funnel analytics tests passed (${passed} checks: dimensions, event validation, duplicate prevention, redirect tracking, schema tolerance).`);
