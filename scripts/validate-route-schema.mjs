#!/usr/bin/env node
// Validates the server-rendered head + JSON-LD contract by driving
// functions/[[path]].js onRequest directly (same pattern as the sitemap check
// in validate-guide-routes.mjs). Guards the SEO/AEO invariants:
//   - canonical + og:url always pin to the apex production host
//   - www requests 301 to apex
//   - guide pages emit Article (with dates/author/section) and, where the
//     content has a FAQ section, FAQPage; the compare-prices guide emits HowTo
//   - artist pages emit Person/MusicGroup and MusicEvent nodes for exactly the
//     publishable verified shows; FAQPage mirrors the page's visible FAQ
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
//   - every MusicEvent.image is the page's own og:image, which is the route's
//     card from the generated OG_CARDS manifest (or the shared brand card when
//     the route has none yet)
//   - every served individual event page (noindex,follow, absent from every
//     sitemap and llms.txt) carries exactly one MusicEvent — identified by its
//     canonical URL, performed by the artist page's own entity, with venue,
//     city, venue-local date and time, status, breadcrumbs and image matching
//     the rendered page — or none where the gate withholds it; fixtures cover
//     each lifecycle, UTC/local date splits, date-only and offset records,
//     stale-slug and past-event redirects, and prove no offer, price or
//     availability reaches an event page even with every offer flag on

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
const { OG_CARDS } = await import(pathToFileURL(path.join(root, "functions/_og-cards.generated.js")));

// MusicEvent.image must name the same file as the page's og:image meta, and
// that file is the route's manifest card — never a hardcoded path, so a route
// joining or leaving the manifest moves both expectations together.
function assertMusicEventImages(html, pathname, musicEvents) {
  const expected = `https://tourticketcompare.com${OG_CARDS[pathname]?.url || "/og-image.png"}`;
  const ogImage = html.match(/<meta\s+property="og:image"\s+content="([^"]*)"\s*\/?>/i)?.[1] || "";
  if (ogImage !== expected) fail(`${pathname}: og:image is "${ogImage}", expected "${expected}"`);
  for (const node of musicEvents) {
    if (node.image !== expected) fail(`${pathname}: MusicEvent.image is "${node.image}", expected the page's og:image "${expected}"`);
  }
}

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
  // Mirrors the router: a date not yet on public sale gets no MusicEvent node.
  const onsaleAt = Date.parse(String(event?.public_onsale_at || ""));
  if (Number.isFinite(onsaleAt) && onsaleAt > Date.now()) return false;
  const destination = String(event?.ticketmaster_url || event?.source_url || "").trim();
  if (destination) return true;
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
  const pathname = "/guides/vivid-seats-vs-ticketmaster";
  const response = await render(pathname);
  const html = await response.text();
  if (response.status !== 200) fail(`${pathname}: expected 200, got ${response.status}`);
  assertApexHead(html, pathname);
  if (!/<meta name="robots" content="index,follow(?:,[^"]*)?"/.test(html)) fail(`${pathname}: missing index,follow robots meta`);
  if (!/<title>Vivid Seats vs Ticketmaster: Key Differences, Fees &amp; Safety<\/title>/.test(html)) fail(`${pathname}: unique SEO title missing`);
  const graph = extractGraph(html, pathname);
  if (graph) {
    const article = graph.find((node) => node?.["@type"] === "Article");
    const breadcrumb = graph.find((node) => node?.["@type"] === "BreadcrumbList");
    const faq = graph.find((node) => node?.["@type"] === "FAQPage");
    if (!article || !breadcrumb) fail(`${pathname}: Article or BreadcrumbList missing`);
    if (!faq || faq.mainEntity?.length !== 8) fail(`${pathname}: expected FAQPage with 8 visible questions`);
    const unsupported = graph.filter((node) => "offers" in node || "price" in node || "availability" in node);
    if (unsupported.length) fail(`${pathname}: unsupported Offer/price/availability schema emitted`);
    else ok(`${pathname} emits Article + BreadcrumbList + 8-question FAQPage with no offer schema`);
  }
}

// 5. Compare-prices guide: authored HowTo emitted, without a nested @context.
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

// 6. Promo-code guide FAQ schema must mirror its newly authored visible FAQ.
{
  const pathname = "/guides/seatgeek-promo-code-guide";
  const graph = extractGraph(await (await render(pathname)).text(), pathname);
  if (graph) {
    const faq = graph.find((node) => node?.["@type"] === "FAQPage");
    if (!faq || faq.mainEntity?.length !== 4) fail(`${pathname}: expected FAQPage with 4 authored questions`);
    else ok(`${pathname} emits FAQPage with 4 authored questions`);
  }
}

// 7. Every artist page: MusicEvent count matches the publishable gate exactly,
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
    // Selected by @id, not by type: "the first Person in the graph" once
    // matched a byline Person node instead of the artist, and every performer
    // @id check downstream compared against the wrong node.
    const artistId = `https://tourticketcompare.com${pathname}#artist`;
    const artistNode = graph.find((node) => node["@id"] === artistId);
    if (!artistNode) fail(`${pathname}: no Person/MusicGroup node at ${artistId}`);
    else if (artistNode["@type"] !== "Person" && artistNode["@type"] !== "MusicGroup") {
      fail(`${pathname}: artist node is "${artistNode["@type"]}", expected Person or MusicGroup`);
    }
    const musicEvents = graph.filter((node) => node["@type"] === "MusicEvent");
    const expected = expectedMusicEventCount(artist.slug);
    // Read the rendered page, not the publishable-event count. An artist whose
    // upcoming records have no publishable ticket destination still renders its
    // date cards and its FAQ, while expectedMusicEventCount() filters through
    // eventPublishable() and returns zero — deriving the expectation from that
    // number would fail a legitimate no-link board and block every PR once the
    // data reaches that state. The invariant is that the FAQPage node mirrors
    // the visible FAQ, so assert exactly that.
    const hasVisibleFaq = html.includes("data-artist-faq");
    const faq = graph.find((node) => node["@type"] === "FAQPage");
    if (hasVisibleFaq && !faq) fail(`${pathname}: visible FAQ has no FAQPage node`);
    if (!hasVisibleFaq && faq) fail(`${pathname}: FAQPage node without a visible FAQ`);
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
    assertMusicEventImages(html, pathname, musicEvents);
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
    assertMusicEventImages(html, pathname, musicEvents);
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
    assertMusicEventImages(html, entry.path, musicEvents);
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
    // Same instant, not the same string: startDate is re-expressed in the
    // venue's local offset, so a stored "…Z" instant renders as "…-04:00".
    if (Date.parse(node.startDate) !== Date.parse(eventIso)) fail(`${label}: offers landed on startDate ${node.startDate}, expected ${eventIso}`);
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

// 8. Individual event pages (/events/<slug>-<key>). Each served page is a
// noindex,follow leaf whose structured data is exactly one MusicEvent for the
// performance it shows — or none, when that performance may not be described
// (the eventPageSchemaDecision rules below, mirrored independently here). Every
// emitted property is checked against the rendered page: identity against the
// canonical URL, performer against the artist page's own node, venue, city,
// date, start time and status against the visible facts, breadcrumbs against
// the visible trail, image against og:image. The node never carries an offer,
// price or availability, under any flag: the schema-offers exception covers
// the parent boards only. Parent-board nodes are left exactly as they were
// (sections 7 and 6b-6c above still check them).
{
  const ORIGIN = "https://tourticketcompare.com";
  const eventPagesModule = await import(pathToFileURL(path.join(root, "functions/_event-pages.js")));
  const { resolveEventLocalDate } = await import(pathToFileURL(path.join(root, "functions/_event-local-date.js")));
  const { citySlug } = await import(pathToFileURL(path.join(root, "functions/_cities.js")));
  const artistsMeta = JSON.parse(await fs.readFile(path.join(root, "public/data/artists.json"), "utf8"));
  const catalog = JSON.parse(await fs.readFile(path.join(root, "public/data/catalog.json"), "utf8"));

  // The only properties an event-page MusicEvent may carry. Anything else —
  // offers, description, organizer, endDate, previousStartDate — is a claim
  // the page does not make.
  const EVENT_NODE_KEYS = ["@id", "@type", "eventAttendanceMode", "eventStatus", "image", "location", "name", "performer", "startDate", "url"].join(",");
  const STATUS_URL = {
    scheduled: "https://schema.org/EventScheduled",
    rescheduled: "https://schema.org/EventRescheduled",
    cancelled: "https://schema.org/EventCancelled",
    postponed: "https://schema.org/EventPostponed"
  };
  // The visible status line for each lifecycle (eventStatusFact).
  const VISIBLE_STATUS = {
    cancelled: /^Cancelled, per Ticketmaster$/,
    postponed: /^Postponed, per Ticketmaster$/,
    rescheduled: /^Rescheduled, per Ticketmaster/,
    unrecognised: /^Being checked$/
  };

  // Independent mirror of the stored-status reading (eventLifecycle).
  function lifecycleOf(event) {
    const code = String(event?.ticketmaster_status_code ?? "").trim().toLowerCase();
    if (!code || code === "onsale") return "scheduled";
    if (code === "cancelled" || code === "canceled") return "cancelled";
    if (code === "postponed") return "postponed";
    if (code === "rescheduled") return "rescheduled";
    return "unrecognised";
  }
  // Which eventStatus the page's node must carry, or "" for no node: the
  // parent boards' gate (eventPublishable above) for a live date, the
  // Ticketmaster source alone for a cancelled or postponed one, never for an
  // unrecognised status.
  function expectedEventStatus(event) {
    const lifecycle = lifecycleOf(event);
    if (lifecycle === "unrecognised") return "";
    if (lifecycle === "cancelled" || lifecycle === "postponed") {
      const sourced = Boolean(String(event?.ticketmaster_url || event?.source_url || "").trim()) || event?.provider_links?.ticketmaster?.verified === true;
      return sourced ? STATUS_URL[lifecycle] : "";
    }
    return eventPublishable(event) ? STATUS_URL[lifecycle] : "";
  }

  const decode = (value) => String(value || "").replace(/<[^>]+>/g, "").replace(/&amp;/g, "&").replace(/&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">").trim();
  function visiblePage(html) {
    const facts = {};
    const factsHtml = html.match(/<section[^>]*aria-labelledby="eventFactsTitle"[\s\S]*?<\/section>/)?.[0] || "";
    for (const m of factsHtml.matchAll(/<dt>([\s\S]*?)<\/dt><dd>([\s\S]*?)<\/dd>/g)) facts[decode(m[1])] = m[2];
    const nav = html.match(/<nav class="breadcrumbs"[\s\S]*?<\/nav>/)?.[0] || "";
    const crumbs = [...nav.matchAll(/<li([^>]*)>([\s\S]*?)<\/li>/g)].map((m) => ({
      href: m[2].match(/href="([^"]*)"/)?.[1] || "",
      name: decode(m[2]),
      current: /aria-current="page"/.test(m[1])
    }));
    return {
      h1: decode(html.match(/<h1 id="eventTitle">([\s\S]*?)<\/h1>/)?.[1]),
      facts,
      crumbs,
      robots: html.match(/<meta name="robots" content="([^"]*)"/)?.[1] || "",
      ogImage: html.match(/<meta\s+property="og:image"\s+content="([^"]*)"/)?.[1] || ""
    };
  }
  // The label formatShowDateServer prints for a YYYY-MM-DD calendar date.
  const dateLabel = (ymd) =>
    new Intl.DateTimeFormat("en-US", { weekday: "short", month: "short", day: "numeric", year: "numeric", timeZone: "UTC" }).format(new Date(`${ymd}T12:00:00Z`));
  const timeLabel = (hhmm) =>
    new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone: "UTC" }).format(new Date(`2000-01-01T${hhmm}:00Z`));

  const statusCache = new Map();
  async function statusOf(pathname, envOverride) {
    const key = `${pathname}|${envOverride === env ? "real" : "fixture"}`;
    if (!statusCache.has(key)) statusCache.set(key, (await render(pathname, "tourticketcompare.com", envOverride)).status);
    return statusCache.get(key);
  }
  const artistNodeCache = new Map();
  async function artistNode(slug, envOverride) {
    const key = `${slug}|${envOverride === env ? "real" : "fixture"}`;
    if (!artistNodeCache.has(key)) {
      const html = await (await render(`/artists/${slug}`, "tourticketcompare.com", envOverride)).text();
      const graph = extractGraph(html, `/artists/${slug}`) || [];
      artistNodeCache.set(key, graph.find((node) => node["@id"] === `${ORIGIN}/artists/${slug}#artist`) || null);
    }
    return artistNodeCache.get(key);
  }

  // Checks one served event page; returns its MusicEvent node (or null).
  async function checkEventPage(event, artistName, envOverride, label) {
    const pathname = eventPagesModule.eventPath(event);
    const response = await render(pathname, "tourticketcompare.com", envOverride);
    const html = await response.text();
    if (response.status !== 200) {
      fail(`${label} ${pathname}: expected a served event page, got ${response.status}`);
      return null;
    }
    assertApexHead(html, pathname);
    const page = visiblePage(html);
    if (page.robots !== "noindex,follow") fail(`${label} ${pathname}: robots is "${page.robots}", expected noindex,follow`);
    const graph = extractGraph(html, pathname);
    if (!graph) return null;
    const t = types(graph);
    if (!t.includes("Organization") || !t.includes("WebSite")) fail(`${label} ${pathname}: the site Organization/WebSite nodes are missing`);
    for (const banned of ["Offer", "AggregateOffer", "FAQPage", "Review", "AggregateRating", "Product"]) {
      if (t.includes(banned)) fail(`${label} ${pathname}: emits a ${banned} node`);
    }
    if (new Set(graph.map((node) => node["@id"]).filter(Boolean)).size !== graph.filter((node) => node["@id"]).length) {
      fail(`${label} ${pathname}: two graph nodes share an @id`);
    }

    // Breadcrumbs: the structured trail is the visible trail, item for item,
    // and every crumb but the page itself is a page that renders.
    const breadcrumb = graph.find((node) => node["@type"] === "BreadcrumbList");
    const trail = (breadcrumb?.itemListElement || []).map((item) => `${item.position}|${item.name}|${item.item}`);
    const visibleTrail = page.crumbs.map((crumb, index) => `${index + 1}|${crumb.name}|${ORIGIN}${crumb.current ? pathname : crumb.href}`);
    if (!breadcrumb || JSON.stringify(trail) !== JSON.stringify(visibleTrail)) {
      fail(`${label} ${pathname}: BreadcrumbList does not match the visible breadcrumb\n    schema:  ${trail.join(" > ")}\n    visible: ${visibleTrail.join(" > ")}`);
    }
    if (!page.crumbs.at(-1)?.current) fail(`${label} ${pathname}: the visible breadcrumb does not end at the page`);
    for (const crumb of page.crumbs.slice(0, -1)) {
      if ((await statusOf(crumb.href, envOverride)) !== 200) fail(`${label} ${pathname}: breadcrumb ${crumb.href} does not render`);
    }
    // The artist-city crumb appears exactly when that page renders.
    const artistCityPath = `/artists/${event.artist_slug}/tickets/${citySlug(event.city, event.country)}`;
    const hasCityCrumb = page.crumbs.some((crumb) => crumb.href === artistCityPath);
    if (!hasCityCrumb && (await statusOf(artistCityPath, envOverride)) === 200) {
      fail(`${label} ${pathname}: ${artistCityPath} renders but the breadcrumb skips it`);
    }

    const nodes = graph.filter((node) => node["@type"] === "MusicEvent");
    const localDate = resolveEventLocalDate(event).iso;
    const visibleDate = decode(page.facts.Date);
    const expectedStatus = visibleDate === dateLabel(localDate) ? expectedEventStatus(event) : "";
    const lifecycle = lifecycleOf(event);
    const statusLine = decode(page.facts.Status);
    if (VISIBLE_STATUS[lifecycle] && !VISIBLE_STATUS[lifecycle].test(statusLine)) {
      fail(`${label} ${pathname}: visible status "${statusLine}" does not state the ${lifecycle} lifecycle`);
    }
    if (!expectedStatus) {
      if (nodes.length) fail(`${label} ${pathname}: ${nodes.length} MusicEvent node(s), expected none (${lifecycle}, schema gate not met)`);
      return null;
    }
    if (nodes.length !== 1) {
      fail(`${label} ${pathname}: ${nodes.length} MusicEvent node(s), expected exactly 1`);
      return null;
    }
    const node = nodes[0];
    const canonicalUrl = `${ORIGIN}${pathname}`;
    const problems = [];
    if (Object.keys(node).sort().join(",") !== EVENT_NODE_KEYS) problems.push(`properties are [${Object.keys(node).sort()}], expected [${EVENT_NODE_KEYS}]`);
    if (node["@id"] !== `${canonicalUrl}#event`) problems.push(`@id ${node["@id"]} is not the canonical URL + #event`);
    if (node.url !== canonicalUrl) problems.push(`url ${node.url} is not the canonical URL`);
    if (node.eventStatus !== expectedStatus) problems.push(`eventStatus ${node.eventStatus}, expected ${expectedStatus}`);
    const venue = String(event.venue || "").trim();
    const city = String(event.city || "").trim();
    if (node.name !== `${artistName} at ${venue}`) problems.push(`name "${node.name}" is not "${artistName} at ${venue}"`);
    if (!page.h1.startsWith(`${node.name}, ${city} — `)) problems.push(`name "${node.name}" is not the visible H1 "${page.h1}"`);
    if (node.location?.["@type"] !== "Place" || node.location?.name !== venue || decode(page.facts.Venue) !== venue) problems.push(`location name "${node.location?.name}" is not the visible venue "${decode(page.facts.Venue)}"`);
    const address = node.location?.address || {};
    const visibleCity = decode(page.facts.City);
    if (address["@type"] !== "PostalAddress" || address.addressLocality !== city || !visibleCity.startsWith(city)) problems.push(`addressLocality "${address.addressLocality}" is not the visible city "${visibleCity}"`);
    const visibleCountry = visibleCity.slice(city.length).replace(/^,\s*/, "");
    if (Boolean(visibleCountry) !== Boolean(address.addressCountry)) problems.push(`addressCountry "${address.addressCountry || ""}" does not match the visible country "${visibleCountry}"`);
    else if (address.addressCountry && !/^[A-Z]{2}$/.test(address.addressCountry) && address.addressCountry !== visibleCountry) problems.push(`addressCountry "${address.addressCountry}" is neither an ISO code nor the visible country`);
    if (Object.keys(address).some((key) => !["@type", "addressLocality", "addressCountry"].includes(key))) problems.push("address carries a field TTC does not hold");
    if (Object.keys(node.location || {}).some((key) => !["@type", "name", "address"].includes(key))) problems.push("location carries a field TTC does not hold");

    // startDate: the venue-local date the path, H1 and facts carry; the
    // instant the record stores; and a clock time only where the page prints one.
    const startDate = String(node.startDate || "");
    if (startDate.slice(0, 10) !== localDate || !pathname.includes(`-${localDate}-`)) problems.push(`startDate ${startDate} is not the venue-local date ${localDate}`);
    if (visibleDate !== dateLabel(startDate.slice(0, 10))) problems.push(`startDate ${startDate} is not the visible date "${visibleDate}"`);
    const visibleTime = decode(page.facts["Start time"]).replace(/ local time$/, "");
    if (/T\d{2}:\d{2}/.test(startDate)) {
      const raw = String(event.datetime_iso || "").trim();
      if (/(Z|[+-]\d{2}:?\d{2})$/.test(raw)) {
        if (!/[+-]\d{2}:\d{2}$/.test(startDate)) problems.push(`startDate ${startDate} carries no UTC offset`);
        if (Date.parse(startDate) !== Date.parse(raw)) problems.push(`startDate ${startDate} is not the stored instant ${raw}`);
      }
      if (visibleTime !== timeLabel(startDate.slice(11, 16))) problems.push(`startDate time ${startDate.slice(11, 16)} is not the visible start time "${visibleTime}"`);
    } else if (startDate !== localDate) {
      problems.push(`startDate ${startDate} is neither a local date-time nor the local date`);
    } else if (visibleTime) {
      problems.push(`startDate is date-only but the page prints a start time "${visibleTime}"`);
    }

    // Performer: the artist page's own entity, by @id, with the same type.
    const artistId = `${ORIGIN}/artists/${event.artist_slug}#artist`;
    const performerNode = graph.find((entry) => entry["@id"] === artistId);
    const canonicalArtist = await artistNode(event.artist_slug, envOverride);
    if (node.performer?.["@id"] !== artistId || Object.keys(node.performer || {}).length !== 1) problems.push(`performer ${JSON.stringify(node.performer)} is not a reference to ${artistId}`);
    if (!canonicalArtist) problems.push(`the artist page emits no node at ${artistId}`);
    else if (performerNode?.["@type"] !== canonicalArtist["@type"] || performerNode?.name !== canonicalArtist.name) problems.push(`performer node ${JSON.stringify(performerNode)} disagrees with the artist page's ${canonicalArtist["@type"]} "${canonicalArtist.name}"`);
    if (!page.facts.Artist?.includes(`href="/artists/${event.artist_slug}"`)) problems.push("the visible Artist fact does not link the artist page");

    if (node.image !== page.ogImage || node.image !== `${ORIGIN}${OG_CARDS[pathname]?.url || "/og-image.png"}`) problems.push(`image ${node.image} is not the page's og:image ${page.ogImage}`);
    if (/offer|price|availability|inventory/i.test(JSON.stringify(node))) problems.push("carries offer/price/availability data");
    if (/\/api\/out/.test(JSON.stringify(graph))) problems.push("structured data links /api/out");
    for (const problem of problems) fail(`${label} ${pathname}: MusicEvent ${problem}`);
    return node;
  }

  // 8a. Every served event page on real data.
  {
    const nameBySlug = new Map((catalog.artists || []).map((artist) => [String(artist.slug), String(artist.name || artist.slug)]));
    const counts = { served: 0, withNode: 0, byStatus: {}, withoutNode: {} };
    for (const event of events) {
      const pathname = eventPagesModule.eventPath(event);
      if (!pathname) continue;
      const decision = eventPagesModule.resolveEventRoute(events, artistsMeta, pathname);
      if (decision.action !== eventPagesModule.EVENT_ROUTE_ACTION.RENDER) continue;
      counts.served += 1;
      const node = await checkEventPage(event, nameBySlug.get(String(event.artist_slug)) || "", env, "event page");
      if (node) {
        counts.withNode += 1;
        counts.byStatus[node.eventStatus] = (counts.byStatus[node.eventStatus] || 0) + 1;
      } else {
        const reason = eventPagesModule.eventPageSchemaDecision(event).reason || "date_disagreement";
        counts.withoutNode[reason] = (counts.withoutNode[reason] || 0) + 1;
      }
    }
    if (!counts.served) fail("event pages: no served event page to check");
    ok(`${counts.served} served event page(s) checked: ${counts.withNode} emit one MusicEvent ${JSON.stringify(counts.byStatus)}, ${counts.served - counts.withNode} emit none ${JSON.stringify(counts.withoutNode)}; every node matches its visible page`);

    // Indexing is untouched: no event URL in any sitemap segment or llms.txt.
    const sitemapModule = await import(pathToFileURL(path.join(root, "functions/sitemap.xml.js")));
    const { onRequestGet: llmsGet } = await import(pathToFileURL(path.join(root, "functions/llms.txt.js")));
    const request = (p) => ({ request: new Request(`${ORIGIN}${p}`), env });
    const bodies = [await (await sitemapModule.onRequestGet(request("/sitemap.xml"))).text(), await (await llmsGet(request("/llms.txt"))).text()];
    for (const segment of sitemapModule.SITEMAP_SEGMENTS) bodies.push(await (await sitemapModule.segmentHandler(segment)(request(`/sitemaps/${segment}.xml`))).text());
    if (bodies.some((body) => body.includes("/events/"))) fail("event pages: an event URL appears in a sitemap or llms.txt");
    else ok(`event pages: absent from the sitemap index, all ${sitemapModule.SITEMAP_SEGMENTS.length} segments and llms.txt`);
  }

  // 8b. Lifecycle, timing and commercial-safety fixtures on a real indexable
  // artist, rendered with the schema-offers flag on, every marketplace lane
  // configured and a fresh approved price row for every fixture date — the
  // most permissive environment the site runs — so a withheld offer is
  // withheld by the event-page rule, not by a missing flag.
  {
    const catalogSlugs = new Set((catalog.artists || []).map((artist) => String(artist.slug)));
    const artist = artistsMeta.find((entry) => entry?.indexing_status === "indexable_with_substantial_content" && catalogSlugs.has(String(entry.slug)) && entry.promotion_source !== "auto");
    const artistName = String((catalog.artists || []).find((entry) => entry.slug === artist.slug)?.name || artist.slug);
    function fixture(id, iso, extra = {}, { ticketmaster = true, vivid = true } = {}) {
      const tm = ticketmaster ? `https://www.ticketmaster.com/event/${id.toUpperCase()}` : "";
      const numeric = String(Math.abs([...id].reduce((acc, ch) => acc * 31 + ch.charCodeAt(0), 7)) % 9000000 + 1000000);
      const vs = `https://www.vividseats.com/fixture-springfield--concerts-pop/production/${numeric}`;
      const record = {
        id, artist_slug: artist.slug, artist_name: artistName, event_name: `${artistName}: Fixture Tour | Official Platinum`,
        city: "Springfield", country: "United States", venue: "Fixture Arena", datetime_iso: iso, timezone: "America/Chicago",
        status: "on-sale", ticketmaster_event_id: id.toUpperCase(), ticketmaster_url: tm, source_url: tm, source_type: "ticketmaster",
        last_verified_at: "2026-08-01", verification_status: "human_verified", provider_links: {}, ...extra
      };
      if (tm) record.provider_links.ticketmaster = { event_id: id.toUpperCase(), url: tm, verified: true, last_verified_at: "2026-08-01" };
      if (vivid) {
        record.vividseats_url = vs;
        record.provider_links["vivid-seats"] = { event_id: numeric, url: vs, verified: true, last_verified_at: "2026-08-01" };
      }
      return record;
    }
    const day = 24 * 60 * 60 * 1000;
    // A venue-local 20:00 in Springfield (America/Chicago) is 01:00Z the next
    // UTC day, so every fixture's UTC and local dates differ.
    const at = (daysAhead, utcTime = "01:00:00") => `${new Date(Date.now() + daysAhead * day).toISOString().slice(0, 10)}T${utcTime}Z`;
    const SCHEDULED = fixture("schema-fixture-scheduled", at(30));
    const RESCHEDULED = fixture("schema-fixture-rescheduled", at(31), { ticketmaster_status_code: "rescheduled" });
    const CANCELLED = fixture("schema-fixture-cancelled", at(32), { ticketmaster_status_code: "cancelled" });
    const POSTPONED = fixture("schema-fixture-postponed", at(33), { ticketmaster_status_code: "postponed" });
    const UNRECOGNISED = fixture("schema-fixture-unrecognised", at(34), { ticketmaster_status_code: "paused" });
    const PRE_ONSALE = fixture("schema-fixture-pre-onsale", at(35), { status: "announced", public_onsale_at: new Date(Date.now() + 5 * day).toISOString() }, { vivid: false });
    const RESALE_ONLY = fixture("schema-fixture-resale-only", at(36), {}, { ticketmaster: false });
    // 00:00 venue-local (Phoenix keeps UTC-7 all year): a date-only record,
    // which the page prints without a start time.
    const MIDNIGHT = fixture("schema-fixture-midnight", at(37, "07:00:00"), { city: "Phoenix", venue: "Fixture Hall", timezone: "America/Phoenix" });
    const OFFSET = fixture("schema-fixture-offset", `${at(38).slice(0, 10)}T19:30:00-05:00`);
    // Stored offset (Chicago) and zone (Berlin) disagree about the date: the
    // path says one day, the visible date another, so no node at all.
    const DISAGREE = fixture("schema-fixture-disagree", `${at(39).slice(0, 10)}T20:30:00-05:00`, { timezone: "Europe/Berlin" });
    const HELD_ELSEWHERE = fixture("schema-fixture-held-elsewhere", at(40), { ticketmaster_status_code: "cancelled", city: "Shelbyville", venue: "Shelby Hall" });
    const DUSSELDORF = fixture("schema-fixture-dusseldorf", `${at(41).slice(0, 10)}T22:30:00Z`, { city: "Düsseldorf", country: "Germany", venue: "Merkur Spiel-Arena", timezone: "Europe/Berlin" });
    const UPSELL = fixture("schema-fixture-upsell", at(42), { event_name: `${artistName} | Box seat in the Ticketmaster Suite` });
    const PAST = fixture("schema-fixture-past", at(-3));
    const FIXTURES = [SCHEDULED, RESCHEDULED, CANCELLED, POSTPONED, UNRECOGNISED, PRE_ONSALE, RESALE_ONLY, MIDNIGHT, OFFSET, DISAGREE, HELD_ELSEWHERE, DUSSELDORF, UPSELL, PAST];

    const rows = FIXTURES.map((event) => ({
      event_id: event.id, provider: "vivid-seats", low_price: 123.45, avg_price: null, high_price: null, currency: "USD", inventory_count: 7,
      verified_at: new Date(Date.now() - 60 * 60 * 1000).toISOString(), expires_at: new Date(Date.now() + 60 * 60 * 1000).toISOString(),
      source: "vividseats_impact_marketplace_api"
    }));
    const fixtureDb = {
      prepare(sql) {
        return {
          bind(...params) {
            const wanted = new Set(params.map(String));
            return {
              async all() { return { results: /provider_pricing_cache/.test(sql) ? rows.filter((row) => wanted.has(row.event_id)) : [] }; },
              async first() { return null; },
              async run() { return { success: true }; }
            };
          }
        };
      }
    };
    function fixtureEnv(fixtureEvents) {
      const eventsJson = JSON.stringify(fixtureEvents);
      return {
        SCHEMA_OFFERS_ENABLED: "true",
        IMPACT_SEATGEEK_ACCOUNT_SID: "fixture-account-sid",
        IMPACT_SEATGEEK_AUTH_TOKEN: "fixture-auth-token",
        IMPACT_VIVIDSEATS_CAMPAIGN_ID: "fixture-vividseats-campaign",
        VIVIDSEATS_PRICE_DISPLAY_ENABLED: "true",
        DEMAND_DB: fixtureDb,
        ASSETS: {
          async fetch(input) {
            const url = new URL(input instanceof Request ? input.url : input);
            if (url.pathname === "/data/events.json") return new Response(eventsJson, { status: 200 });
            // No artist partition: the artist board falls back to the fixture set.
            if (url.pathname.startsWith("/data/events/")) return new Response("not found", { status: 404 });
            return env.ASSETS.fetch(input);
          }
        }
      };
    }
    const fenv = fixtureEnv(FIXTURES);
    const check = (event, label) => checkEventPage(event, artistName, fenv, `event fixture ${label}`);
    const jsonLdIn = (html) => /application\/ld\+json/.test(html);

    const scheduled = await check(SCHEDULED, "scheduled");
    if (scheduled?.eventStatus === STATUS_URL.scheduled && /-05:00$/.test(scheduled.startDate) && scheduled.startDate.startsWith(resolveEventLocalDate(SCHEDULED).iso) && !SCHEDULED.datetime_iso.startsWith(resolveEventLocalDate(SCHEDULED).iso)) {
      ok(`event fixture scheduled: EventScheduled at the venue-local ${scheduled.startDate} (stored ${SCHEDULED.datetime_iso}, a UTC date one day later)`);
    } else fail(`event fixture scheduled: expected EventScheduled at a venue-local -05:00 time, got ${JSON.stringify(scheduled)}`);
    if (scheduled && /Official Platinum/.test(scheduled.name)) fail("event fixture scheduled: the provider listing title leaked into the name");

    // The same fresh approved row renders a price on the page and an Offer on
    // the parent artist board (exception C, unchanged), but never on the event node.
    {
      const html = await (await render(eventPagesModule.eventPath(SCHEDULED), "tourticketcompare.com", fenv)).text();
      const parentGraph = extractGraph(await (await render(`/artists/${artist.slug}`, "tourticketcompare.com", fenv)).text(), `/artists/${artist.slug}`) || [];
      const parentNode = parentGraph.find((node) => node["@type"] === "MusicEvent" && String(node.url).endsWith(`#show-${SCHEDULED.id}`));
      if (!/\$123\.45/.test(html)) fail("event fixture scheduled: the visible price badge is missing, so the no-offer check proves nothing");
      else if (!(parentNode?.offers?.length === 1)) fail("event fixture scheduled: the parent artist board no longer emits its gated Offer for the same row");
      else if (scheduled && "offers" in scheduled) fail("event fixture scheduled: the event-page node carries offers");
      else ok("event fixture scheduled: visible price and parent-board Offer present, event-page node carries no offers");
      if (parentNode && (parentNode.url !== `${ORIGIN}/artists/${artist.slug}#show-${SCHEDULED.id}` || "@id" in parentNode)) fail("event fixture: the parent node's identity changed");
    }

    const rescheduled = await check(RESCHEDULED, "rescheduled");
    if (rescheduled?.eventStatus === STATUS_URL.rescheduled && !("previousStartDate" in rescheduled)) ok("event fixture rescheduled: EventRescheduled at the current date, no previousStartDate");
    else fail(`event fixture rescheduled: got ${JSON.stringify(rescheduled)}`);
    {
      // A date move changes the readable slug: the old URL 301s before any schema.
      const moved = { ...RESCHEDULED, datetime_iso: at(45) };
      const movedEnv = fixtureEnv(FIXTURES.map((event) => (event.id === RESCHEDULED.id ? moved : event)));
      const oldPath = eventPagesModule.eventPath(RESCHEDULED);
      const response = await render(oldPath, "tourticketcompare.com", movedEnv);
      const body = await response.text();
      if (response.status !== 301 || response.headers.get("location") !== `${ORIGIN}${eventPagesModule.eventPath(moved)}` || jsonLdIn(body)) {
        fail(`event fixture rescheduled: the old slug answered ${response.status} → ${response.headers.get("location")}, expected a 301 to the new path with no JSON-LD`);
      } else {
        const node = await checkEventPage(moved, artistName, movedEnv, "event fixture moved");
        if (node?.url === `${ORIGIN}${eventPagesModule.eventPath(moved)}` && node.startDate.startsWith(resolveEventLocalDate(moved).iso)) ok("event fixture rescheduled: the old slug 301s with no schema; the current URL describes the new date");
        else fail(`event fixture moved: got ${JSON.stringify(node)}`);
      }
    }

    for (const [event, status] of [[CANCELLED, STATUS_URL.cancelled], [POSTPONED, STATUS_URL.postponed], [HELD_ELSEWHERE, STATUS_URL.cancelled]]) {
      const node = await check(event, event.id);
      const html = await (await render(eventPagesModule.eventPath(event), "tourticketcompare.com", fenv)).text();
      const main = html.slice(html.indexOf("<main"), html.indexOf("</main>"));
      if (node?.eventStatus !== status) fail(`event fixture ${event.id}: expected ${status}, got ${JSON.stringify(node)}`);
      else if (/\/api\/out|\$\d/.test(main) || /offer|price|availability/i.test(JSON.stringify(extractGraph(html, event.id).filter((entry) => entry["@type"] !== "Organization")))) fail(`event fixture ${event.id}: a held page exposes a ticket link, price, offer or availability`);
      else ok(`event fixture ${event.id}: ${status.replace("https://schema.org/", "")}, with no ticket link, price, Offer or availability on page or in schema`);
    }
    {
      const html = await (await render(eventPagesModule.eventPath(HELD_ELSEWHERE), "tourticketcompare.com", fenv)).text();
      if (/\/tickets\/shelbyville/.test(html.match(/<script type="application\/ld\+json">(.*?)<\/script>/s)?.[1] || "")) fail("event fixture held-elsewhere: the breadcrumb names an artist-city page that does not render");
      else ok("event fixture held-elsewhere: no artist-city crumb where that page does not render");
    }

    for (const [event, label] of [[UNRECOGNISED, "unrecognised status"], [PRE_ONSALE, "pre-on-sale"], [RESALE_ONLY, "resale-only (no Ticketmaster source)"], [DISAGREE, "offset/zone date disagreement"]]) {
      const response = await render(eventPagesModule.eventPath(event), "tourticketcompare.com", fenv);
      const graph = extractGraph(await response.text(), event.id) || [];
      await check(event, event.id);
      if (response.status === 200 && !graph.some((node) => node["@type"] === "MusicEvent")) ok(`event fixture ${label}: page serves, no MusicEvent`);
      else fail(`event fixture ${label}: expected a served page with no MusicEvent (got ${response.status})`);
    }

    const midnight = await check(MIDNIGHT, "midnight");
    if (midnight?.startDate === resolveEventLocalDate(MIDNIGHT).iso) ok(`event fixture date-only: startDate ${midnight.startDate} states no time the page does not print`);
    else fail(`event fixture date-only: expected a date-only startDate, got ${midnight?.startDate}`);
    const offset = await check(OFFSET, "offset");
    if (offset?.startDate === OFFSET.datetime_iso) ok(`event fixture numeric offset: startDate is the stored local time ${offset.startDate}`);
    else fail(`event fixture numeric offset: got ${offset?.startDate}`);
    const dusseldorf = await check(DUSSELDORF, "dusseldorf");
    if (dusseldorf?.startDate === `${resolveEventLocalDate(DUSSELDORF).iso}T00:30:00+02:00` || dusseldorf?.startDate === `${resolveEventLocalDate(DUSSELDORF).iso}T23:30:00+01:00`) {
      ok(`event fixture non-US zone: ${dusseldorf.location.address.addressLocality}, ${dusseldorf.location.address.addressCountry} at ${dusseldorf.startDate}`);
    } else fail(`event fixture non-US zone: got ${JSON.stringify(dusseldorf)}`);

    for (const [event, label, expected] of [[UPSELL, "non-performance listing", 404], [PAST, "past event", 301]]) {
      const response = await render(eventPagesModule.eventPath(event), "tourticketcompare.com", fenv);
      const body = await response.text();
      if (response.status === expected && !/"MusicEvent"/.test(body)) ok(`event fixture ${label}: ${expected}, no event schema`);
      else fail(`event fixture ${label}: got ${response.status}${/"MusicEvent"/.test(body) ? " with a MusicEvent" : ""}, expected ${expected} and no event schema`);
    }
  }
}

if (failures.length) {
  console.error(`\n[validate-route-schema] ${failures.length} check(s) failed:`);
  for (const message of failures) console.error(`  - ${message}`);
  process.exit(1);
}

console.log("\n[validate-route-schema] all checks passed");
