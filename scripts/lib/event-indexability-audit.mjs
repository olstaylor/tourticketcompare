// Event-page indexability audit, run by scripts/audit-indexable-surface.mjs.
//
// Individual event pages sit outside the route-type surface that audit
// tracks: every one is a noindex leaf except the active members of the frozen
// indexing pilot (30 stable keys, functions/_event-indexability.js). This is
// the guard around that line. It re-derives every event's eligibility
// (eventIndexabilityDecision) and the active pilot (deriveEventIndexingPilot,
// with the offline CTA mirror as its lane source), renders every served event
// page through the real middleware in a deployed-like environment
// (wrangler.toml [vars] plus stub affiliate credentials, no D1, the canonical
// host), and reports a problem when:
//
//   - a page's robots meta is not what the active pilot says: index for an
//     active pilot member, noindex,follow for every other served page;
//   - a page renders index while it is not a pilot key, or not eligible
//     (a lifecycle hold, a lost destination, a duplicate), or more pages
//     render index than there are pilot keys;
//   - the events sitemap, /sitemap.xml or llms.txt lists any event URL other
//     than exactly the active pilot, lists one twice, or another sitemap
//     segment lists one at all;
//   - a policy-eligible page is malformed: not 200, not self-canonical, not
//     exactly one MusicEvent identified as the canonical URL + #event;
//   - a policy-eligible page renders a different set of ticket buttons than
//     the lanes the policy counted (the offline CTA mirror drifting from the
//     renderer would silently change who is eligible);
//   - a parent board (the artist, artist-city, city and venue pages the event
//     page links) describes an active pilot performance under any identity but
//     its event page (url + @id = page + #event), keeps its #show-<id>
//     identity, or gives any non-pilot performance an event-page identity;
//   - a row the duplicate rule excludes is eligible anyway;
//   - a pilot key does not resolve to exactly one event.
//
// The pilot is tracked here as an exact set rather than inside the
// indexable-surface totals and baseline, whose tolerance-based comparison is
// built for calendar decay: a pilot page that drops out must be explained by
// its eligibility, and nothing may ever join.

import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

import { providerConfiguredTest, publishableLaneSlugs } from "./event-link-coverage.mjs";

const ORIGIN = "https://tourticketcompare.com";
const SITEMAP_SEGMENTS = ["pages", "artists", "artist-cities", "cities", "venues", "blog", "events"];

// Stub credentials: every affiliate lane the catalog enables renders its
// button, as in production. Never real values.
const STUB_CREDENTIALS = Object.freeze({
  IMPACT_SEATGEEK_ACCOUNT_SID: "audit-sid",
  IMPACT_SEATGEEK_AUTH_TOKEN: "audit-token",
  IMPACT_SEATGEEK_CAMPAIGN_ID: "1",
  IMPACT_VIVIDSEATS_CAMPAIGN_ID: "2",
  IMPACT_ACCOUNT_SID: "audit-sid",
  IMPACT_AUTH_TOKEN: "audit-token"
});

/**
 * The repo-managed non-secret flags from wrangler.toml [vars].
 *
 * @param {string} text
 * @returns {Record<string, string>}
 */
export function wranglerVars(text) {
  const vars = {};
  let inVars = false;
  for (const line of String(text).split("\n")) {
    const trimmed = line.trim();
    if (/^\[\[?[^\]]+\]\]?$/.test(trimmed)) {
      inVars = trimmed === "[vars]";
      continue;
    }
    const match = inVars && trimmed.match(/^([A-Z0-9_]+)\s*=\s*"([^"]*)"/);
    if (match) vars[match[1]] = match[2];
  }
  return vars;
}

const extract = (html, regex) => (String(html).match(regex) || [])[1] || "";

function graphOf(html) {
  const nodes = [];
  for (const match of String(html).matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const data = JSON.parse(match[1]);
      nodes.push(...(Array.isArray(data?.["@graph"]) ? data["@graph"] : [data]));
    } catch {
      nodes.push({ "@type": "__unparseable__" });
    }
  }
  return nodes;
}

/** Every JSON-LD node on a rendered page, flattened out of any @graph. */
export function structuredDataNodes(html) {
  return graphOf(html);
}

/** The provider buttons a rendered page's <main> carries, in order, deduplicated. */
export function renderedCtaProviders(html) {
  const main = extract(html, /<main id="mainContent">([\s\S]*?)<\/main>/);
  return [...new Set([...main.matchAll(/<a class="provider-cta"[^>]*data-cta-provider="([^"]+)"/g)].map((match) => match[1]))];
}

/**
 * @param {Awaited<ReturnType<typeof import("./route-crawl.mjs").loadSiteFixture>>} site
 * @param {{
 *   root: string,
 *   now?: number,
 *   pilotKeys?: readonly string[],
 *   render?: (pathname: string, env: any) => Promise<{ status: number, html: string }>,
 *   documents?: () => Promise<Array<{ name: string, body: string }>>
 * }} options `render` and `documents` exist for the self-test; callers use the defaults.
 */
export async function auditEventIndexability(site, options) {
  const { root } = options;
  const now = Number.isFinite(options.now) ? Number(options.now) : Date.now();
  const load = (relativePath) => import(pathToFileURL(path.join(root, relativePath)));
  const policy = await load("functions/_event-indexability.js");
  const eventPages = await load("functions/_event-pages.js");
  const { slugify } = await load("functions/_cities.js");
  const { middlewareModule, sitemapModule } = site.modules;
  const { events, artistsMeta, catalog } = site.data;
  const pilotKeys = options.pilotKeys || policy.EVENT_INDEXING_PILOT_KEYS;

  const vars = wranglerVars(await fs.readFile(path.join(root, "wrangler.toml"), "utf8"));
  const env = { ...site.env, ...vars, ...STUB_CREDENTIALS };
  const render =
    options.render ||
    (async (pathname) => {
      const response = await middlewareModule.onRequest({
        request: new Request(`${ORIGIN}${pathname}`),
        env,
        next: () => new Response("static-asset", { status: 200 })
      });
      return { status: response.status, html: await response.text() };
    });

  const isConfigured = providerConfiguredTest(catalog);
  const decisions = policy.deriveEventIndexability(events, artistsMeta, {
    lanesFor: (event) => publishableLaneSlugs(event, isConfigured, now),
    now
  });
  const served = decisions.filter((decision) => decision.inputs.routeAction === eventPages.EVENT_ROUTE_ACTION.RENDER && decision.path);
  const eligible = decisions.filter((decision) => decision.eligible);
  // The active pilot as the router derives it (same function), with the
  // offline mirror as its lane source and the audit's canonical host.
  const pilot = policy.deriveEventIndexingPilot(events, artistsMeta, env, {
    hostIndexable: true,
    lanesFor: (event) => publishableLaneSlugs(event, isConfigured, now),
    now,
    pilotKeys
  });
  const rolloutIndexablePaths = new Set(pilot.indexed.map((member) => member.path));
  const pilotKeySet = new Set(pilotKeys);

  const problems = [];
  const warnings = [];
  let renderedNoindex = 0;
  let renderedIndexable = 0;
  const renderedIndexablePaths = new Set();
  const eventPages_ = new Map();

  for (const decision of served) {
    const page = await render(decision.path, env);
    const robots = extract(page.html, /<meta name="robots" content="([^"]*)"/);
    const expectIndexable = rolloutIndexablePaths.has(decision.path);
    if (robots === "noindex,follow") renderedNoindex += 1;
    else {
      renderedIndexable += 1;
      renderedIndexablePaths.add(decision.path);
    }
    if (page.status !== 200) {
      problems.push(`${decision.path} is served by the router's decision but rendered ${page.status}`);
      continue;
    }
    if (expectIndexable ? robots.includes("noindex") || !robots.startsWith("index") : robots !== "noindex,follow") {
      problems.push(`${decision.path} renders robots "${robots}", but the rollout gate says ${expectIndexable ? "indexable" : "noindex,follow"}`);
    }
    // Independent of the gate: whatever the rollout code says, an indexed
    // event page must be a pilot key and eligible right now.
    if (robots !== "noindex,follow") {
      if (!pilotKeySet.has(decision.key)) problems.push(`${decision.path} renders robots "${robots}" but its key ${decision.key} is not a pilot key`);
      if (!decision.eligible) problems.push(`${decision.path} renders robots "${robots}" but is not eligible (${decision.reasons.join(", ")})`);
    }
    if (expectIndexable) eventPages_.set(decision.path, page.html);
    if (!decision.eligible) continue;
    const canonical = extract(page.html, /<link rel="canonical" href="([^"]*)"/);
    if (canonical !== `${ORIGIN}${decision.path}`) problems.push(`eligible ${decision.path} has canonical "${canonical}", not itself`);
    const musicEvents = graphOf(page.html).filter((node) => node["@type"] === "MusicEvent");
    if (musicEvents.length !== 1 || musicEvents[0]["@id"] !== `${ORIGIN}${decision.path}#event`) {
      problems.push(`eligible ${decision.path} renders ${musicEvents.length} MusicEvent node(s); the policy requires exactly one, identified as the page + #event`);
    }
    const buttons = renderedCtaProviders(page.html);
    const counted = decision.inputs.publishableLanes;
    if ([...buttons].sort().join(",") !== [...counted].sort().join(",")) {
      problems.push(`eligible ${decision.path} renders buttons [${buttons.join(", ")}] but the policy counted [${counted.join(", ")}] — the CTA mirror has drifted from the renderer`);
    }
  }

  for (const decision of eligible) {
    if (decision.inputs.duplicateGroups.length) problems.push(`${decision.id} is eligible despite duplicate ambiguity`);
  }
  if (renderedIndexable > pilotKeys.length) {
    problems.push(`${renderedIndexable} event pages render index, more than the ${pilotKeys.length} pilot keys — the cohort must never grow`);
  }

  // Parent boards: an active pilot performance is identified by its event
  // page everywhere, and no other performance is.
  const parentCache = new Map();
  const renderParent = async (parentPath) => {
    if (!parentCache.has(parentPath)) parentCache.set(parentPath, await render(parentPath, env));
    return parentCache.get(parentPath);
  };
  const byPath = new Map(decisions.map((decision) => [decision.path, decision]));
  let parentPagesChecked = 0;
  let parentNodesAligned = 0;
  for (const [eventPath, html] of eventPages_) {
    const decision = byPath.get(eventPath);
    const canonical = `${ORIGIN}${eventPath}`;
    const oldAnchor = `#show-${slugify(decision.id)}`;
    const main = extract(html, /<main id="mainContent">([\s\S]*?)<\/main>/) + extract(html, /<nav[^>]*aria-label="Breadcrumb"[^>]*>([\s\S]*?)<\/nav>/);
    const parents = [...new Set([...main.matchAll(/href="(\/(?:artists\/[a-z0-9-]+(?:\/tickets\/[a-z0-9-]+)?|cities\/[a-z0-9-]+|venues\/[a-z0-9-]+))"/g)].map((match) => match[1]))];
    const artistPath = parents.find((parentPath) => /^\/artists\/[a-z0-9-]+$/.test(parentPath));
    if (!artistPath) problems.push(`${eventPath} links no parent artist page`);
    for (const parentPath of parents) {
      const parent = await renderParent(parentPath);
      if (parent.status !== 200) continue;
      parentPagesChecked += 1;
      const nodes = graphOf(parent.html);
      const musicEvents = nodes.filter((node) => node["@type"] === "MusicEvent");
      const aligned = musicEvents.filter((node) => node.url === canonical && node["@id"] === `${canonical}#event`);
      const stale = [...parent.html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].some((match) => match[1].includes(`${oldAnchor}"`));
      const misaligned = musicEvents.filter((node) => (node.url === canonical) !== (node["@id"] === `${canonical}#event`));
      parentNodesAligned += aligned.length;
      if (parentPath === artistPath && aligned.length !== 1) problems.push(`${parentPath} carries ${aligned.length} MusicEvent node(s) identified as pilot event ${eventPath}; expected exactly 1`);
      if (aligned.length > 1) problems.push(`${parentPath} describes pilot event ${eventPath} ${aligned.length} times`);
      if (stale) problems.push(`${parentPath} still identifies pilot event ${eventPath} by its ${oldAnchor} anchor in structured data`);
      if (misaligned.length) problems.push(`${parentPath} gives pilot event ${eventPath} a url and @id that disagree`);
    }
  }
  // Any parent page rendered above: no event-page identity for anything but
  // an active pilot event.
  for (const [parentPath, parent] of parentCache) {
    for (const node of graphOf(parent.html)) {
      const url = String(node?.url || "");
      const id = String(node?.["@id"] || "");
      const eventUrl = [url, id].map((value) => (value.match(/^https:\/\/tourticketcompare\.com(\/events\/[a-z0-9-]+)/) || [])[1]).find(Boolean);
      if (node["@type"] === "MusicEvent" && eventUrl && !rolloutIndexablePaths.has(eventUrl)) problems.push(`${parentPath} identifies ${eventUrl} by its event page, but it is not an active pilot event`);
      if (node["@type"] === "MusicEvent" && id && !eventUrl) problems.push(`${parentPath} gives a MusicEvent the @id "${id}"; only active pilot events carry one`);
    }
  }

  // Discovery surfaces: no event URL unless the rollout indexes it.
  const documents = options.documents
    ? await options.documents()
    : await (async () => {
        const out = [];
        const index = await sitemapModule.onRequestGet({ request: new Request(`${ORIGIN}/sitemap.xml`), env });
        out.push({ name: "sitemap.xml", body: await index.text() });
        for (const segment of SITEMAP_SEGMENTS) {
          const { onRequestGet } = await load(`functions/sitemaps/${segment}.xml.js`);
          out.push({ name: `sitemaps/${segment}.xml`, body: await (await onRequestGet({ request: new Request(`${ORIGIN}/sitemaps/${segment}.xml`), env })).text() });
        }
        const { onRequestGet: llms } = await load("functions/llms.txt.js");
        out.push({ name: "llms.txt", body: await (await llms({ request: new Request(`${ORIGIN}/llms.txt`), env })).text() });
        return out;
      })();
  // Exactly the active pilot, once each, in the events segment, the combined
  // /sitemap.xml and llms.txt; no event URL in any other segment.
  const EXACT = new Set(["sitemaps/events.xml", "sitemap.xml", "llms.txt"]);
  let sitemapEvents = null;
  for (const { name, body } of documents) {
    const all = [...String(body).matchAll(/(\/events\/[a-z0-9-]+)/g)].map((match) => match[1]);
    const listed = [...new Set(all)];
    const unexpected = listed.filter((listedPath) => !rolloutIndexablePaths.has(listedPath));
    if (unexpected.length) problems.push(`${name} lists ${unexpected.length} event URL(s) the rollout does not index (e.g. ${unexpected[0]})`);
    if (all.length !== listed.length) problems.push(`${name} lists an event URL more than once`);
    if (EXACT.has(name)) {
      const missing = [...rolloutIndexablePaths].filter((indexedPath) => !listed.includes(indexedPath));
      if (missing.length) problems.push(`${name} omits ${missing.length} active pilot event URL(s) (e.g. ${missing[0]})`);
    }
    if (name === "sitemaps/events.xml") sitemapEvents = listed.length;
  }

  // Pilot keys must each name exactly one event.
  const keyIndex = eventPages.buildEventKeyIndex(events);
  for (const key of pilotKeys) {
    if (!keyIndex.byKey.has(key)) problems.push(`pilot key ${key} does not resolve to exactly one event`);
    else if (!eligible.some((decision) => decision.key === key)) {
      const decision = decisions.find((candidate) => candidate.key === key);
      warnings.push(`pilot key ${key} is not eligible today (${decision?.reasons.join(", ") || "unknown"}), so its page stays noindex and out of discovery; it is not replaced`);
    }
  }

  const artistOf = new Map(events.map((event) => [String(event?.id ?? "").trim(), String(event?.artist_slug || "")]));
  const tally = (values) => Object.fromEntries(
    Object.entries(values.reduce((counts, value) => ({ ...counts, [value]: (counts[value] || 0) + 1 }), {})).sort((a, b) => b[1] - a[1])
  );
  return {
    problems,
    warnings,
    summary: {
      served: served.length,
      rendered_noindex: renderedNoindex,
      rendered_indexable: renderedIndexable,
      rollout_indexable: rolloutIndexablePaths.size,
      eligible: eligible.length,
      ineligible: served.length - served.filter((decision) => decision.eligible).length,
      eligible_artists: new Set(eligible.map((decision) => artistOf.get(decision.id))).size,
      excluded_by_reason: tally(served.flatMap((decision) => decision.reasons)),
      duplicate_excluded: served.filter((decision) => decision.inputs.duplicateGroups.length).map((decision) => decision.id),
      pilot_keys: pilotKeys.length,
      pilot_active: pilot.active,
      pilot_indexed: pilot.indexed.length,
      pilot_dropped: pilot.members.filter((member) => !member.indexable).map((member) => ({ key: member.key, reason: member.reason, eligibility: member.decision?.reasons || [] })),
      sitemap_event_urls: sitemapEvents,
      parent_pages_checked: parentPagesChecked,
      parent_nodes_aligned: parentNodesAligned
    }
  };
}
