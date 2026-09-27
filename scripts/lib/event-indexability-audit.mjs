// Event-page indexability audit, run by scripts/audit-indexable-surface.mjs.
//
// Individual event pages sit outside the indexable surface that audit tracks:
// they are a noindex leaf until the indexing pilot deliberately starts. What
// this adds is the guard around that line. It re-derives every event's
// eligibility (eventIndexabilityDecision, functions/_event-indexability.js)
// and renders every served event page through the real middleware in a
// deployed-like environment (wrangler.toml [vars] plus stub affiliate
// credentials, no D1), then reports a problem when:
//
//   - a page's robots meta is not what the rollout gate says
//     (eventPageIndexingDecision) — today, anything but noindex,follow;
//   - a sitemap document or llms.txt lists an event URL the rollout does not
//     index — today, any event URL;
//   - a policy-eligible page is malformed: not 200, not self-canonical, not
//     exactly one MusicEvent identified as the canonical URL + #event;
//   - a policy-eligible page renders a different set of ticket buttons than
//     the lanes the policy counted (the offline CTA mirror drifting from the
//     renderer would silently change who is eligible);
//   - a row the duplicate rule excludes is eligible anyway;
//   - a pilot key does not resolve to exactly one event.
//
// It never touches the indexable-surface totals or baseline: eligibility is
// not indexing.

import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

import { providerConfiguredTest, publishableLaneSlugs } from "./event-link-coverage.mjs";

const ORIGIN = "https://tourticketcompare.com";
const SITEMAP_SEGMENTS = ["pages", "artists", "artist-cities", "cities", "venues", "blog"];

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
  const rollout = new Map(decisions.map((decision) => [decision.id, policy.eventPageIndexingDecision(decision, env, { pilotKeys })]));
  const rolloutIndexablePaths = new Set(decisions.filter((decision) => rollout.get(decision.id).indexable).map((decision) => decision.path));

  const problems = [];
  const warnings = [];
  let renderedNoindex = 0;
  let renderedIndexable = 0;

  for (const decision of served) {
    const page = await render(decision.path, env);
    const robots = extract(page.html, /<meta name="robots" content="([^"]*)"/);
    const expectIndexable = rollout.get(decision.id).indexable;
    if (robots === "noindex,follow") renderedNoindex += 1;
    else renderedIndexable += 1;
    if (page.status !== 200) {
      problems.push(`${decision.path} is served by the router's decision but rendered ${page.status}`);
      continue;
    }
    if (expectIndexable ? robots.includes("noindex") : robots !== "noindex,follow") {
      problems.push(`${decision.path} renders robots "${robots}", but the rollout gate says ${expectIndexable ? "indexable" : "noindex,follow"}`);
    }
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
  for (const { name, body } of documents) {
    const listed = [...new Set([...String(body).matchAll(/(\/events\/[a-z0-9-]+)/g)].map((match) => match[1]))];
    const unexpected = listed.filter((listedPath) => !rolloutIndexablePaths.has(listedPath));
    if (unexpected.length) problems.push(`${name} lists ${unexpected.length} event URL(s) the rollout does not index (e.g. ${unexpected[0]})`);
  }

  // Pilot keys must each name exactly one event.
  const keyIndex = eventPages.buildEventKeyIndex(events);
  for (const key of pilotKeys) {
    if (!keyIndex.byKey.has(key)) problems.push(`pilot key ${key} does not resolve to exactly one event`);
    else if (!eligible.some((decision) => decision.key === key)) warnings.push(`pilot key ${key} is not eligible today, so its page stays noindex`);
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
      pilot_keys: pilotKeys.length
    }
  };
}
