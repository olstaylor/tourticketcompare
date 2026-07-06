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
//   - MusicEvent nodes never carry offers, prices, or availability

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

const { onRequest } = await import(pathToFileURL(path.join(root, "functions/[[path]].js")));

async function render(pathname, host = "tourticketcompare.com") {
  return onRequest({
    request: new Request(`https://${host}${pathname}`),
    env,
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

function expectedMusicEventCount(artistSlug) {
  const now = Date.now();
  return events
    .filter((event) => event?.artist_slug === artistSlug)
    .filter((event) => {
      const iso = String(event?.dateTimeISO || event?.datetime_iso || "").trim();
      return Number.isFinite(Date.parse(iso)) && Date.parse(iso) >= now;
    })
    .sort((a, b) => Date.parse(a.dateTimeISO || a.datetime_iso) - Date.parse(b.dateTimeISO || b.datetime_iso))
    .slice(0, 6)
    .filter((event) => eventPublishable(event) && String(event?.venue || "").trim() && String(event?.city || "").trim())
    .length;
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

// 5. Guide without a FAQ section must not emit FAQPage.
{
  const pathname = "/guides/seatgeek-promo-code-guide";
  const graph = extractGraph(await (await render(pathname)).text(), pathname);
  if (graph) {
    if (types(graph).includes("FAQPage")) fail(`${pathname}: unexpected FAQPage (guide has no FAQ section)`);
    else ok(`${pathname} emits no FAQPage (no FAQ section in content)`);
  }
}

// 6. Every artist page: MusicEvent count matches the publishable gate exactly,
// nodes carry required fields, and never offers/price/availability.
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

if (failures.length) {
  console.error(`\n[validate-route-schema] ${failures.length} check(s) failed:`);
  for (const message of failures) console.error(`  - ${message}`);
  process.exit(1);
}

console.log("\n[validate-route-schema] all checks passed");
