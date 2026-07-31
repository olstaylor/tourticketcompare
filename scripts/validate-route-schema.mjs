#!/usr/bin/env node
// Validates the server-rendered head + JSON-LD contract by driving
// functions/[[path]].js onRequest directly (same pattern as the sitemap check
// in validate-guide-routes.mjs). Guards the SEO/AEO invariants:
//   - canonical + og:url always pin to the apex production host
//   - www requests 301 to apex
//   - guide pages emit Article (with dates/author/section) and, where the
//     content has a FAQ section, FAQPage; the compare-prices guide emits HowTo
//   - artist pages emit Person/MusicGroup + FAQPage, and MusicEvent nodes for
//     exactly the publishable verified shows the visible show board renders
//   - MusicEvent nodes never carry offers, prices, or availability in the
//     default environment (schema offers are disabled unless
//     SCHEMA_OFFERS_ENABLED=true, which no default run sets)
//   - under the owner-approved schema-offers exception (2026-07-22, see
//     SAFE_PUBLISHING_RULES.md), fixture scenarios with a stub D1 cache prove
//     that an Offer appears only when the exact visible-badge gate passes for
//     an allowlisted lane, mirrors the badge's cache row verbatim, and
//     disappears for expired rows, unapproved sources, non-allowlisted
//     providers, disabled flags, and out-of-pilot artists; availability is
//     never emitted under any flag

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];

function fail(message) {
  failures.push(message);
  console.error(`[validate-route-schema] FAIL: ${message}`);
}

function ok(message) {
  console.log(`[validate-route-schema] OK: ${message}`);
}

const env = {
  ASSETS: {
    async fetch(input) {
      const url = new URL(input instanceof Request ? input.url : input);
      const rel = url.pathname === "/" ? "/index.html" : url.pathname;
      try {
        const body = await fs.readFile(path.join(root, "public", rel));
        return new Response(body, { status: 200 });
      } catch {
        return new Response("not found", { status: 404 });
      }
    }
  }
};

const { onRequest, SCHEMA_OFFERS_APPROVED_PROVIDERS } = await import(pathToFileURL(path.join(root, "functions/[[path]].js")));

async function render(pathname, host = "tourticketcompare.com", envOverride = env) {
  return onRequest({
    request: new Request(`https://${host}${pathname}`),
    env: envOverride,
    next: () => new Response("next", { status: 200 })
  });
}

function extractGraph(html, pathname) {
  const match = html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s);
  if (!match) {
    fail(`${pathname}: no JSON-LD script tag found`);
    return null;
  }
  try {
    const parsed = JSON.parse(match[1]);
    if (!Array.isArray(parsed["@graph"])) {
      fail(`${pathname}: JSON-LD has no @graph array`);
      return null;
    }
    return parsed["@graph"];
  } catch (error) {
    fail(`${pathname}: JSON-LD does not parse (${error.message})`);
    return null;
  }
}

function assertApexHead(html, pathname) {
  const canonical = html.match(/<link rel="canonical" href="([^"]*)"/)?.[1];
  const ogUrl = html.match(/property="og:url" content="([^"]*)"/)?.[1];
  const expected = `https://tourticketcompare.com${pathname === "/" ? "/" : pathname}`;
  if (canonical !== expected) fail(`${pathname}: canonical is ${canonical}, expected ${expected}`);
  if (ogUrl !== expected) fail(`${pathname}: og:url is ${ogUrl}, expected ${expected}`);
}

function types(graph) {
  return graph.map((node) => node["@type"]);
}

// Mirror of the event publishable gate (functions/[[path]].js, public/app.js,
// functions/api/out.js) so this check fails if the schema builder ever drifts
// from it.
function eventPublishable(event) {
  const status = String(event?.verification_status || "").trim().toLowerCase();
  if (status) return status === "human_verified" || status === "machine_high_confidence";
  return event?.provider_links?.ticketmaster?.verified === true;
}

const events = JSON.parse(await fs.readFile(path.join(root, "public/data/events.json"), "utf8"));

// The publishable schema board for an artist: the events whose MusicEvent
// nodes the page emits. Shared by the count check and the schema-offers
// scenario candidate picker.
function schemaBoardEvents(artistSlug) {
  const now = Date.now();
  return events
    .filter((event) => event?.artist_slug === artistSlug)
    .filter((event) => {
      const iso = String(event?.dateTimeISO || event?.datetime_iso || "").trim();
      return Number.isFinite(Date.parse(iso)) && Date.parse(iso) >= now;
    })
    .sort((a, b) => Date.parse(a.dateTimeISO || a.datetime_iso) - Date.parse(b.dateTimeISO || b.datetime_iso))
    .slice(0, 6)
    .filter((event) => eventPublishable(event) && String(event?.venue || "").trim() && String(event?.city || "").trim());
}

function expectedMusicEventCount(artistSlug) {
  return schemaBoardEvents(artistSlug).length;
}

// 1. www requests must 301 to the apex host.
{
  const response = await render("/guides/how-to-avoid-ticket-scams", "www.tourticketcompare.com");
  const location = response.headers.get("location");
  if (response.status === 301 && location === "https://tourticketcompare.com/guides/how-to-avoid-ticket-scams") {
    ok("www request 301s to the apex host");
  } else {
    fail(`www request returned ${response.status} -> ${location}, expected 301 to apex`);
  }
}

// 2. Homepage: base graph + apex head.
{
  const html = await (await render("/")).text();
  assertApexHead(html, "/");
  const graph = extractGraph(html, "/");
  if (graph) {
    const t = types(graph);
    if (t.includes("Organization") && t.includes("WebSite")) {
      ok("homepage emits Organization + WebSite");
    } else {
      fail(`homepage graph types are ${t.join(", ")}`);
    }
  }
}

// 3. Guide with FAQ section: Article (enriched) + FAQPage.
{
  const pathname = "/guides/how-to-avoid-ticket-scams";
  const html = await (await render(pathname)).text();
  assertApexHead(html, pathname);
  if (!/property="og:type" content="article"/.test(html)) fail(`${pathname}: og:type is not article`);
  const graph = extractGraph(html, pathname);
  if (graph) {
    const article = graph.find((node) => node["@type"] === "Article");
    const faq = graph.find((node) => node["@type"] === "FAQPage");
    if (!article) fail(`${pathname}: no Article node`);
    else if (!article.datePublished || !article.dateModified || !article.articleSection || !article.author) {
      fail(`${pathname}: Article missing datePublished/dateModified/articleSection/author`);
    } else ok(`${pathname} Article carries dates, author, and articleSection`);
    if (!faq || !Array.isArray(faq.mainEntity) || faq.mainEntity.length < 3) {
      fail(`${pathname}: FAQPage missing or too small`);
    } else ok(`${pathname} emits FAQPage with ${faq.mainEntity.length} questions`);
  }
}

// 4. Compare-prices guide: authored HowTo emitted, without a nested @context.
{
  const pathname = "/guides/how-to-compare-concert-ticket-prices";
  const graph = extractGraph(await (await render(pathname)).text(), pathname);
  if (graph) {
    const howTo = graph.find((node) => node["@type"] === "HowTo");
    if (!howTo) fail(`${pathname}: no HowTo node`);
    else if (howTo["@context"]) fail(`${pathname}: HowTo node must not nest @context inside @graph`);
    else ok(`${pathname} emits authored HowTo with ${(howTo.step || []).length} steps`);
  }
}

// 5. Promo-code guide FAQ schema must mirror its newly authored visible FAQ.
{
  const pathname = "/guides/seatgeek-promo-code-guide";
  const graph = extractGraph(await (await render(pathname)).text(), pathname);
  if (graph) {
    const faq = graph.find((node) => node?.["@type"] === "FAQPage");
    if (!faq || faq.mainEntity?.length !== 4) fail(`${pathname}: expected FAQPage with 4 authored questions`);
    else ok(`${pathname} emits FAQPage with 4 authored questions`);
  }
}

// 6. Every artist page: MusicEvent count matches the publishable gate exactly,
// nodes carry required fields, and never offers/price/availability. This runs
// with the default env (no flags, no D1), so it also proves the schema-offers
// exception stays fail-closed: without SCHEMA_OFFERS_ENABLED and a live cache
// row, real data can never emit an Offer.
{
  const catalog = JSON.parse(await fs.readFile(path.join(root, "public/data/catalog.json"), "utf8"));
  let checked = 0;
  let totalEvents = 0;
  for (const artist of catalog.artists || []) {
    const pathname = `/artists/${artist.slug}`;
    const html = await (await render(pathname)).text();
    assertApexHead(html, pathname);
    const graph = extractGraph(html, pathname);
    if (!graph) continue;
    const artistNode = graph.find((node) => node["@type"] === "Person" || node["@type"] === "MusicGroup");
    if (!artistNode) fail(`${pathname}: no Person/MusicGroup node`);
    if (!graph.find((node) => node["@type"] === "FAQPage")) fail(`${pathname}: no FAQPage node`);
    const musicEvents = graph.filter((node) => node["@type"] === "MusicEvent");
    const expected = expectedMusicEventCount(artist.slug);
    if (musicEvents.length !== expected) {
      fail(`${pathname}: ${musicEvents.length} MusicEvent node(s), expected ${expected} from the publishable gate`);
    }
    for (const node of musicEvents) {
      const raw = JSON.stringify(node).toLowerCase();
      if (raw.includes("offer") || raw.includes("price") || raw.includes("availability")) {
        fail(`${pathname}: MusicEvent node carries offers/price/availability`);
      }
      if (!node.name || !node.startDate || !node.location?.name || !node.location?.address?.addressLocality) {
        fail(`${pathname}: MusicEvent node missing name/startDate/venue/city`);
      }
      if (node.performer?.["@id"] !== artistNode?.["@id"]) {
        fail(`${pathname}: MusicEvent performer does not reference the artist @id`);
      }
    }
    checked += 1;
    totalEvents += musicEvents.length;
  }
  ok(`${checked} artist page(s) checked; ${totalEvents} MusicEvent node(s) all match the publishable gate`);
}

// 6b. Venue and city pages: MusicEvent nodes for exactly the publishable shows
// in the page's listing, each carrying the required fields and an inline
// Person/MusicGroup performer, and — like artist pages — never offers, price,
// or availability in the default environment.
{
  const { deriveCities } = await import(pathToFileURL(path.join(root, "functions/_cities.js")));
  const { deriveVenues } = await import(pathToFileURL(path.join(root, "functions/_venues.js")));
  const eventsById = new Map(events.map((event) => [String(event?.id || "").trim(), event]));

  function expectedListingCount(listingShows) {
    let count = 0;
    for (const show of (listingShows || []).slice(0, 50)) {
      const event = eventsById.get(String(show?.id || "").trim());
      if (!event) continue;
      if (eventPublishable(event) && String(event.venue || "").trim() && String(event.city || "").trim()) count += 1;
    }
    return count;
  }

  async function checkListing(pathname, listing) {
    const html = await (await render(pathname)).text();
    assertApexHead(html, pathname);
    const graph = extractGraph(html, pathname);
    if (!graph) return;
    const musicEvents = graph.filter((node) => node["@type"] === "MusicEvent");
    const expected = expectedListingCount(listing.shows);
    if (musicEvents.length !== expected) {
      fail(`${pathname}: ${musicEvents.length} MusicEvent node(s), expected ${expected} from the publishable listing`);
    }
    for (const node of musicEvents) {
      const raw = JSON.stringify(node).toLowerCase();
      if (raw.includes("offer") || raw.includes("price") || raw.includes("availability")) {
        fail(`${pathname}: MusicEvent node carries offers/price/availability in the default environment`);
      }
      if (!node.name || !node.startDate || !node.location?.name || !node.location?.address?.addressLocality) {
        fail(`${pathname}: MusicEvent node missing name/startDate/venue/city`);
      }
      if (!node.performer?.name || !["Person", "MusicGroup"].includes(node.performer?.["@type"])) {
        fail(`${pathname}: MusicEvent performer missing name or Person/MusicGroup type`);
      }
    }
    ok(`${pathname}: ${musicEvents.length} MusicEvent node(s) match the publishable listing`);
  }

  const city = deriveCities(events).find((entry) => entry.indexable);
  const venue = deriveVenues(events).find((entry) => entry.indexable);
  if (city) await checkListing(`/cities/${city.slug}`, city);
  else ok("no indexable city available to check (skipped)");
  if (venue) await checkListing(`/venues/${venue.slug}`, venue);
  else ok("no indexable venue available to check (skipped)");
}

// 6c. Artist-city pages: apex head, self-canonical, Place + CollectionPage +
// FAQPage, and MusicEvent nodes for exactly the publishable shows in the city's
// listing — never offers/price/availability in the default environment. Every
// qualifying page is checked so a data change cannot silently break the gate.
{
  const { deriveIndexableArtistCities, findArtistCity } = await import(pathToFileURL(path.join(root, "functions/_artist-cities.js")));
  const artistsMeta = JSON.parse(await fs.readFile(path.join(root, "public/data/artists.json"), "utf8"));
  const indexableSlugs = artistsMeta
    .filter((artist) => artist?.indexing_status === "indexable_with_substantial_content")
    .map((artist) => artist.slug);
  const entries = deriveIndexableArtistCities(events, indexableSlugs);

  let checked = 0;
  for (const entry of entries) {
    const html = await (await render(entry.path)).text();
    assertApexHead(html, entry.path);
    const graph = extractGraph(html, entry.path);
    if (!graph) continue;
    const t = types(graph);
    for (const required of ["Place", "CollectionPage", "FAQPage", "BreadcrumbList"]) {
      if (!t.includes(required)) fail(`${entry.path}: missing ${required} structured data`);
    }
    // Expected MusicEvent count comes straight from the module's own derivation,
    // so this check fails if the schema builder ever drifts from it.
    //
    // Note this is `schemaEventCount`, NOT `publishableCount`. The two answer
    // different questions and diverge on a `needs_recheck` row carrying an
    // independently verified marketplace destination: that row renders a working
    // CTA (so it counts toward indexability) while staying outside the
    // MusicEvent contract, whose gate is the row's own verification status.
    // See eventStatusPublishable() in functions/_route-indexability.js.
    const artistCity = findArtistCity(events, entry.artistSlug, entry.slug);
    const expected = artistCity ? artistCity.schemaEventCount : 0;
    const musicEvents = graph.filter((node) => node["@type"] === "MusicEvent");
    if (musicEvents.length !== expected) {
      fail(`${entry.path}: ${musicEvents.length} MusicEvent node(s), expected ${expected} from the publishable listing`);
    }
    for (const node of musicEvents) {
      const raw = JSON.stringify(node).toLowerCase();
      if (raw.includes("offer") || raw.includes("price") || raw.includes("availability")) {
        fail(`${entry.path}: MusicEvent node carries offers/price/availability in the default environment`);
      }
      if (!node.name || !node.startDate || !node.location?.name || !node.location?.address?.addressLocality) {
        fail(`${entry.path}: MusicEvent node missing name/startDate/venue/city`);
      }
    }
    checked += 1;
  }
  ok(`${checked} artist-city page(s) checked; MusicEvent nodes match the publishable listing and carry no offers`);
}

// 7. Schema-offers exception scenarios (owner-approved 2026-07-22). Real
// artist routes are re-rendered with fixture flags and a stub D1
// provider_pricing_cache so both directions of the narrower rule are
// enforced: an Offer appears only when the exact visible-badge gate passes
// for a lane on SCHEMA_OFFERS_APPROVED_PROVIDERS, mirrors the badge's cache
// row verbatim, and disappears for expired rows, unapproved sources,
// non-allowlisted providers, the flag defaulting off, and out-of-pilot
// artists. Candidates are picked from live repo data so the scenarios keep
// exercising the real gate chain as data evolves.
{
  const artistsMeta = JSON.parse(await fs.readFile(path.join(root, "public/data/artists.json"), "utf8"));
  const catalog = JSON.parse(await fs.readFile(path.join(root, "public/data/catalog.json"), "utf8"));
  const indexableSlugs = new Set(
    artistsMeta
      .filter((artist) => artist?.indexing_status === "indexable_with_substantial_content")
      .map((artist) => artist.slug)
  );
  const catalogSlugs = (catalog.artists || []).map((artist) => artist.slug).filter((slug) => indexableSlugs.has(slug));

  const SCHEMA_OFFER_LANES = {
    "vivid-seats": { name: "Vivid Seats", urlField: "vividseats_url", source: "vividseats_impact_marketplace_api" },
    ticketnetwork: { name: "TicketNetwork", urlField: "ticketnetwork_url", source: "ticketnetwork_impact_marketplace_api" },
    "stubhub-international": { name: "StubHub International", urlField: "stubhub_international_url", source: "stubhub_international_impact_marketplace_api" }
  };
  // Negative control: an active numeric-capable marketplace lane that is NOT
  // on the schema allowlist. Its badge may render; its Offer must not.
  const TICKET_LIQUIDATOR_LANE = { name: "Ticket Liquidator", urlField: "ticketliquidator_url", source: "ticketliquidator_impact_marketplace_api" };

  const expectedAllowlist = Object.keys(SCHEMA_OFFER_LANES).sort().join(",");
  if ([...SCHEMA_OFFERS_APPROVED_PROVIDERS].sort().join(",") !== expectedAllowlist) {
    fail(`SCHEMA_OFFERS_APPROVED_PROVIDERS is [${SCHEMA_OFFERS_APPROVED_PROVIDERS}], expected exactly the owner-approved lanes [${expectedAllowlist}]`);
  } else {
    ok("SCHEMA_OFFERS_APPROVED_PROVIDERS matches the owner-approved lane list");
  }

  function findLaneCandidate(laneSlug, lane) {
    for (const slug of catalogSlugs) {
      for (const event of schemaBoardEvents(slug)) {
        const link = event?.provider_links?.[laneSlug];
        const url = String(event?.[lane.urlField] || "").trim();
        if (link?.verified === true && url.startsWith("https://")) {
          return { artistSlug: slug, event };
        }
      }
    }
    return null;
  }

  // Only the bulk provider_pricing_cache read runs from the HTML path; the
  // stub answers it from fixture rows and returns empty for anything else.
  function stubPricingDb(rows) {
    return {
      prepare() {
        return {
          bind(...params) {
            const bound = params.map((value) => String(value));
            return {
              async all() {
                return { results: rows.filter((row) => bound.includes(String(row.event_id))) };
              },
              async first() {
                return null;
              }
            };
          }
        };
      }
    };
  }

  function freshRow(event, provider, source, overrides = {}) {
    return {
      event_id: String(event.id),
      provider,
      low_price: 123.45,
      avg_price: null,
      high_price: null,
      currency: "USD",
      inventory_count: 7,
      verified_at: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
      expires_at: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      source,
      ...overrides
    };
  }

  // Fixture credentials make the marketplace lanes "configured" offline; no
  // network call is ever made from the render path. TicketNetwork and StubHub
  // International price display default on; Vivid Seats and Ticket Liquidator
  // need their explicit flags.
  const fixtureEnvBase = {
    ASSETS: env.ASSETS,
    SCHEMA_OFFERS_ENABLED: "true",
    IMPACT_SEATGEEK_ACCOUNT_SID: "fixture-account-sid",
    IMPACT_SEATGEEK_AUTH_TOKEN: "fixture-auth-token",
    IMPACT_VIVIDSEATS_CAMPAIGN_ID: "fixture-vividseats-campaign",
    VIVIDSEATS_PRICE_DISPLAY_ENABLED: "true"
  };

  const expectedBadgeAmount = new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2
  }).format(123.45);

  async function renderScenario(artistSlug, rows, envExtra = {}) {
    const scenarioEnv = { ...fixtureEnvBase, DEMAND_DB: stubPricingDb(rows), ...envExtra };
    const pathname = `/artists/${artistSlug}`;
    const html = await (await render(pathname, "tourticketcompare.com", scenarioEnv)).text();
    return { html, graph: extractGraph(html, pathname) };
  }

  function offersNodes(graph) {
    return (graph || [])
      .filter((node) => node["@type"] === "MusicEvent")
      .filter((node) => Array.isArray(node.offers) && node.offers.length);
  }

  function assertNoOffers(graph, label) {
    const carriers = offersNodes(graph);
    const tainted = (graph || [])
      .filter((node) => node["@type"] === "MusicEvent")
      .filter((node) => /offer|price/.test(JSON.stringify(node).toLowerCase()));
    if (carriers.length || tainted.length) fail(`${label}: expected no offers, found ${carriers.length || tainted.length} MusicEvent node(s) carrying offer/price data`);
    else ok(`${label}: no Offer emitted`);
  }

  function badgePresent(html, providerSlug) {
    return html.includes(`data-cta-provider="${providerSlug}"`) &&
      html.includes(`data-cta-price-snapshot="present"`) &&
      html.includes(expectedBadgeAmount);
  }

  let firstCandidate = null;
  for (const [laneSlug, lane] of Object.entries(SCHEMA_OFFER_LANES)) {
    const candidate = findLaneCandidate(laneSlug, lane);
    if (!candidate) {
      fail(`schema-offers: no live candidate event for lane ${laneSlug} (verified link + schema-board show) — cannot exercise the exception gate`);
      continue;
    }
    if (!firstCandidate) firstCandidate = { laneSlug, lane, ...candidate };
    const { artistSlug, event } = candidate;
    const row = freshRow(event, laneSlug, lane.source);
    const { html, graph } = await renderScenario(artistSlug, [row]);
    if (!graph) continue;
    const carriers = offersNodes(graph);
    const label = `schema-offers ${laneSlug} (${artistSlug})`;
    if (carriers.length !== 1) {
      fail(`${label}: ${carriers.length} MusicEvent node(s) carry offers, expected exactly 1`);
      continue;
    }
    const node = carriers[0];
    const eventIso = String(event.dateTimeISO || event.datetime_iso || "").trim();
    if (node.startDate !== eventIso) fail(`${label}: offers landed on startDate ${node.startDate}, expected ${eventIso}`);
    const offer = node.offers[0];
    const expectedUrl = `https://tourticketcompare.com/api/out?${new URLSearchParams({ showId: String(event.id), provider: laneSlug }).toString()}`;
    if (node.offers.length !== 1) fail(`${label}: ${node.offers.length} offers on the node, expected 1`);
    if (offer["@type"] !== "Offer") fail(`${label}: offer @type is ${offer["@type"]}`);
    if (offer.price !== row.low_price) fail(`${label}: offer price ${offer.price} != cache row low_price ${row.low_price}`);
    if (offer.priceCurrency !== row.currency) fail(`${label}: offer priceCurrency ${offer.priceCurrency} != cache row currency ${row.currency}`);
    if (offer.priceValidUntil !== row.expires_at) fail(`${label}: offer priceValidUntil ${offer.priceValidUntil} != cache row expires_at ${row.expires_at}`);
    if (offer.url !== expectedUrl) fail(`${label}: offer url ${offer.url} != ${expectedUrl}`);
    const rawOffer = JSON.stringify(node).toLowerCase();
    if (rawOffer.includes("availability") || rawOffer.includes("inventory")) fail(`${label}: node leaks availability/inventory`);
    if (!badgePresent(html, laneSlug)) {
      fail(`${label}: Offer emitted but the visible ${laneSlug} price badge is missing — schema asserted something the page does not show`);
    } else {
      ok(`${label}: Offer mirrors the visible badge (price, currency, priceValidUntil, /api/out url)`);
    }
  }

  if (firstCandidate) {
    const { laneSlug, lane, artistSlug, event } = firstCandidate;

    // Expired row: neither the badge nor the Offer may render.
    {
      const row = freshRow(event, laneSlug, lane.source, { expires_at: new Date(Date.now() - 60 * 1000).toISOString() });
      const { html, graph } = await renderScenario(artistSlug, [row]);
      assertNoOffers(graph, `schema-offers expired row (${laneSlug})`);
      if (badgePresent(html, laneSlug)) fail(`schema-offers expired row (${laneSlug}): visible badge rendered from an expired row`);
    }

    // Unapproved source: rejected before either surface.
    {
      const row = freshRow(event, laneSlug, "unapproved_source");
      const { html, graph } = await renderScenario(artistSlug, [row]);
      assertNoOffers(graph, `schema-offers unapproved source (${laneSlug})`);
      if (badgePresent(html, laneSlug)) fail(`schema-offers unapproved source (${laneSlug}): visible badge rendered from an unapproved source`);
    }

    // Flag defaulting off: the visible badge may render, the Offer may not —
    // schema emission is independently gated and fail-closed by default.
    {
      const row = freshRow(event, laneSlug, lane.source);
      const { html, graph } = await renderScenario(artistSlug, [row], { SCHEMA_OFFERS_ENABLED: "" });
      assertNoOffers(graph, `schema-offers flag off (${laneSlug})`);
      if (!badgePresent(html, laneSlug)) fail(`schema-offers flag off (${laneSlug}): expected the visible badge to render (only the Offer should be withheld)`);
    }

    // Pilot scoping: an artist outside SCHEMA_OFFERS_PILOT_SLUGS never emits.
    {
      const row = freshRow(event, laneSlug, lane.source);
      const { graph } = await renderScenario(artistSlug, [row], { SCHEMA_OFFERS_PILOT_SLUGS: "no-such-pilot-artist" });
      assertNoOffers(graph, `schema-offers out-of-pilot artist (${laneSlug})`);
    }
    {
      const row = freshRow(event, laneSlug, lane.source);
      const { graph } = await renderScenario(artistSlug, [row], { SCHEMA_OFFERS_PILOT_SLUGS: ` ${artistSlug} , other-slug ` });
      if (offersNodes(graph).length === 1) ok(`schema-offers in-pilot artist (${laneSlug}): Offer emitted for the piloted slug`);
      else fail(`schema-offers in-pilot artist (${laneSlug}): expected the Offer for a slug inside SCHEMA_OFFERS_PILOT_SLUGS`);
    }
  }

  // Non-allowlisted provider: Ticket Liquidator's badge can render when its
  // display flag is forced on, but the Offer must never appear.
  {
    const candidate = findLaneCandidate("ticket-liquidator", TICKET_LIQUIDATOR_LANE);
    if (!candidate) {
      ok("schema-offers ticket-liquidator control skipped (no live candidate event)");
    } else {
      const row = freshRow(candidate.event, "ticket-liquidator", TICKET_LIQUIDATOR_LANE.source);
      const { html, graph } = await renderScenario(candidate.artistSlug, [row], { TICKETLIQUIDATOR_PRICE_DISPLAY_ENABLED: "true" });
      assertNoOffers(graph, "schema-offers non-allowlisted provider (ticket-liquidator)");
      if (!badgePresent(html, "ticket-liquidator")) {
        fail("schema-offers non-allowlisted provider: expected the Ticket Liquidator badge to render (only the Offer should be withheld)");
      }
    }
  }
}

if (failures.length) {
  console.error(`\n[validate-route-schema] ${failures.length} check(s) failed:`);
  for (const message of failures) console.error(`  - ${message}`);
  process.exit(1);
}

console.log("\n[validate-route-schema] all checks passed");
