#!/usr/bin/env node
// Validates that guide routes, guide content, redirects, and sitemap generation
// stay in sync. Catches drift such as a route added to functions/_route-metadata.js
// without a matching entry in public/data/guides-content.json (or vice versa),
// duplicate slugs, dead old-guide redirects, and missing sitemap coverage.

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const failures = [];

function fail(message) {
  failures.push(message);
  console.error(`[validate-guide-routes] FAIL: ${message}`);
}

function ok(message) {
  console.log(`[validate-guide-routes] OK: ${message}`);
}

async function readText(relativePath) {
  return fs.readFile(path.join(root, relativePath), "utf8");
}

function findDuplicateMatches(source, pattern) {
  const counts = new Map();
  for (const match of source.matchAll(pattern)) {
    const key = match[1];
    counts.set(key, (counts.get(key) || 0) + 1);
  }
  return [...counts.entries()].filter(([, count]) => count > 1).map(([key]) => key);
}

const routeMetadataPath = "functions/_route-metadata.js";
const guideContentPath = "public/data/guides-content.json";
const sitemapModulePath = "functions/sitemap.xml.js";

const metadataModule = await import(pathToFileURL(path.join(root, routeMetadataPath)));
const { GUIDE_ROUTES, OLD_GUIDE_REDIRECTS, TRUST_ROUTES } = metadataModule;

if (!GUIDE_ROUTES || typeof GUIDE_ROUTES !== "object") {
  fail(`${routeMetadataPath} did not export GUIDE_ROUTES`);
  process.exit(1);
}
if (!OLD_GUIDE_REDIRECTS || typeof OLD_GUIDE_REDIRECTS !== "object") {
  fail(`${routeMetadataPath} did not export OLD_GUIDE_REDIRECTS`);
  process.exit(1);
}

const guideContentRaw = await readText(guideContentPath);
const guideContent = JSON.parse(guideContentRaw);

const routeSlugs = Object.keys(GUIDE_ROUTES);
const contentSlugs = Object.keys(guideContent);

// 1. Source-level uniqueness: JS and JSON parsers silently drop duplicate keys,
// so check the raw source files for repeated slug keys.
const routeMetadataSource = await readText(routeMetadataPath);
const duplicateRouteSlugs = findDuplicateMatches(
  routeMetadataSource,
  /"(\/guides\/[a-z0-9-]+)"\s*:/g
);
if (duplicateRouteSlugs.length) {
  fail(`duplicate guide slugs in ${routeMetadataPath}: ${duplicateRouteSlugs.join(", ")}`);
} else {
  ok(`${routeMetadataPath} guide slugs are unique`);
}

const duplicateContentSlugs = findDuplicateMatches(
  guideContentRaw,
  /"(\/guides\/[a-z0-9-]+)"\s*:/g
);
if (duplicateContentSlugs.length) {
  fail(`duplicate guide slugs in ${guideContentPath}: ${duplicateContentSlugs.join(", ")}`);
} else {
  ok(`${guideContentPath} guide slugs are unique`);
}

// 2. Every guide route that opts into full content must have a content entry.
const routesRequiringContent = routeSlugs.filter((slug) => GUIDE_ROUTES[slug]?.fullContent);
const missingContent = routesRequiringContent.filter((slug) => !(slug in guideContent));
if (missingContent.length) {
  fail(
    `guide routes with fullContent:true but no entry in ${guideContentPath}: ${missingContent.join(", ")}`
  );
} else {
  ok(`every guide route with fullContent has a matching entry in ${guideContentPath}`);
}

// 3. Every guide content entry must have matching route metadata.
const orphanContent = contentSlugs.filter((slug) => !(slug in GUIDE_ROUTES));
if (orphanContent.length) {
  fail(
    `${guideContentPath} contains entries with no matching route in ${routeMetadataPath}: ${orphanContent.join(", ")}`
  );
} else {
  ok(`every entry in ${guideContentPath} maps to a guide route`);
}

// 4. Old-guide redirects must target a live guide route and must not collide
// with an active route slug.
const badRedirectTargets = Object.entries(OLD_GUIDE_REDIRECTS)
  .filter(([, target]) => !(target in GUIDE_ROUTES))
  .map(([source, target]) => `${source} -> ${target}`);
if (badRedirectTargets.length) {
  fail(`OLD_GUIDE_REDIRECTS targets unknown guide route(s): ${badRedirectTargets.join("; ")}`);
} else {
  ok("OLD_GUIDE_REDIRECTS targets all resolve to a known guide route");
}

const collidingRedirects = Object.keys(OLD_GUIDE_REDIRECTS).filter((source) => source in GUIDE_ROUTES);
if (collidingRedirects.length) {
  fail(
    `OLD_GUIDE_REDIRECTS sources collide with active guide routes: ${collidingRedirects.join(", ")}`
  );
} else {
  ok("OLD_GUIDE_REDIRECTS sources do not collide with active guide routes");
}

// 5. Sitemap generation must include every guide route. Drive functions/sitemap.xml.js
// directly so this check fails the moment the sitemap stops listing one of the routes.
const sitemapModule = await import(pathToFileURL(path.join(root, sitemapModulePath)));
const sitemapEnv = {
  ASSETS: {
    async fetch() {
      return new Response(JSON.stringify({ artists: [] }), {
        status: 200,
        headers: { "content-type": "application/json" }
      });
    }
  }
};
const sitemapResponse = await sitemapModule.onRequestGet({
  request: new Request("https://tourticketcompare.com/sitemap.xml"),
  env: sitemapEnv
});
const sitemapXml = await sitemapResponse.text();
const sitemapLocPaths = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => {
  try {
    return new URL(match[1]).pathname;
  } catch {
    return match[1];
  }
});
const sitemapPathSet = new Set(sitemapLocPaths);
const guideRoutesMissingFromSitemap = routeSlugs.filter((slug) => !sitemapPathSet.has(slug));
if (guideRoutesMissingFromSitemap.length) {
  fail(
    `sitemap.xml output missing guide route(s): ${guideRoutesMissingFromSitemap.join(", ")}`
  );
} else {
  ok(`sitemap.xml output includes all ${routeSlugs.length} guide routes`);
}

const duplicateSitemapPaths = [...sitemapLocPaths.reduce((acc, value) => {
  acc.set(value, (acc.get(value) || 0) + 1);
  return acc;
}, new Map()).entries()].filter(([, count]) => count > 1).map(([value]) => value);
if (duplicateSitemapPaths.length) {
  fail(`sitemap.xml output contains duplicate <loc> paths: ${duplicateSitemapPaths.join(", ")}`);
} else {
  ok("sitemap.xml output contains no duplicate <loc> paths");
}

if (failures.length) {
  console.error(`\n[validate-guide-routes] ${failures.length} check(s) failed:`);
  for (const message of failures) console.error(`  - ${message}`);
  process.exit(1);
}

console.log(
  `\n[validate-guide-routes] all checks passed (${routeSlugs.length} guide route(s), ${contentSlugs.length} content entry/entries, ${Object.keys(OLD_GUIDE_REDIRECTS).length} old-guide redirect(s))`
);
