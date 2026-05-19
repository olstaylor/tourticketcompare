import { execFile } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { fileURLToPath, pathToFileURL } from "node:url";

const execFileAsync = promisify(execFile);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_BASE_URL = "https://tourticketcompare.com";
const PRODUCTION_APEX_HOST = "tourticketcompare.com";
const HTML_ACCEPT = "text/html,application/xhtml+xml";
const XML_ACCEPT = "application/xml,text/xml,*/*";
const UNKNOWN_ROUTE = "/__route-html-diagnostic-missing-route__";
const UNKNOWN_ARTIST_ROUTE = "/artists/not-a-real-route-html-diagnostic";

const TRUST_ROUTE_H1 = new Map([
  ["/", "Find verified ticket links and buying guidance for major tours"],
  ["/artists", "Artist watchlist"],
  ["/guides", "Ticket buying guides"],
  ["/how-it-works", "How TourTicketCompare works"],
  ["/about", "About TourTicketCompare"],
  ["/contact", "Contact TourTicketCompare"],
  ["/editorial-policy", "Editorial policy"],
  ["/affiliate-disclosure", "Affiliate disclosure"]
]);

function usage() {
  return `Usage: node scripts/check-route-html.mjs [--base-url <url>]\n\nRead-only raw HTML diagnostic for public routes.\n\nOptions:\n  --base-url <url>  Site origin to check (default: ${DEFAULT_BASE_URL}; env: ROUTE_HTML_BASE_URL)\n  -h, --help        Show this help\n`;
}

function parseArgs(argv) {
  const options = { baseUrl: process.env.ROUTE_HTML_BASE_URL || DEFAULT_BASE_URL };
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === "-h" || arg === "--help") {
      options.help = true;
      continue;
    }
    if (arg === "--base-url") {
      const value = argv[index + 1];
      if (!value) throw new Error("--base-url requires a URL value");
      options.baseUrl = value;
      index += 1;
      continue;
    }
    if (arg.startsWith("--base-url=")) {
      options.baseUrl = arg.slice("--base-url=".length);
      continue;
    }
    throw new Error(`Unknown argument: ${arg}`);
  }
  return options;
}

function normalizeBaseUrl(value) {
  const parsed = new URL(value);
  parsed.pathname = "/";
  parsed.search = "";
  parsed.hash = "";
  return parsed.origin;
}

async function readJson(relativePath) {
  return JSON.parse(await fs.readFile(path.join(root, relativePath), "utf8"));
}

function decodeHtmlEntities(value) {
  return String(value || "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#x27;/gi, "'");
}

function stripTags(value) {
  return decodeHtmlEntities(String(value || "").replace(/<[^>]*>/g, "").replace(/\s+/g, " ").trim());
}

function getAttribute(tag, name) {
  const pattern = new RegExp(`${name}\\s*=\\s*(["'])(.*?)\\1`, "i");
  const match = tag.match(pattern);
  return match ? decodeHtmlEntities(match[2].trim()) : "";
}

function extractTitle(html) {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  return match ? stripTags(match[1]) : "";
}

function extractFirstH1(html) {
  const match = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
  return match ? stripTags(match[1]) : "";
}

function extractDescription(html) {
  const metaTags = html.match(/<meta\b[^>]*>/gi) || [];
  for (const tag of metaTags) {
    if (getAttribute(tag, "name").toLowerCase() === "description") {
      return getAttribute(tag, "content");
    }
  }
  return "";
}

function extractCanonical(html) {
  const linkTags = html.match(/<link\b[^>]*>/gi) || [];
  for (const tag of linkTags) {
    if (getAttribute(tag, "rel").toLowerCase().split(/\s+/).includes("canonical")) {
      return getAttribute(tag, "href");
    }
  }
  return "";
}

function extractRobots(html, headers) {
  const metaTags = html.match(/<meta\b[^>]*>/gi) || [];
  const values = [];
  for (const tag of metaTags) {
    if (getAttribute(tag, "name").toLowerCase() === "robots") {
      const content = getAttribute(tag, "content");
      if (content) values.push(content);
    }
  }
  const xRobots = headers.get("x-robots-tag");
  if (xRobots) values.push(`X-Robots-Tag: ${xRobots}`);
  return values.join("; ");
}

function hasNoindex(robots) {
  return /(?:^|[,;:\s])noindex(?:$|[,;\s])/i.test(robots);
}

function displayUrl(url) {
  return url.replace(/^https?:\/\//, "");
}

function canonicalFor(baseUrl, routePath) {
  return new URL(routePath, `${baseUrl}/`).toString();
}

function routePathFromUrl(value) {
  try {
    return new URL(value).pathname || "/";
  } catch {
    return "";
  }
}

function sameUrl(actual, expected) {
  try {
    return new URL(actual).toString() === new URL(expected).toString();
  } catch {
    return actual === expected;
  }
}

function parseCurlHeaders(rawHeaders) {
  const blocks = String(rawHeaders || "")
    .split(/\r?\n\r?\n/)
    .map((block) => block.trim())
    .filter(Boolean)
    .filter((block) => /^HTTP\//i.test(block));
  const selected = blocks.at(-1) || "";
  const headers = new Headers();
  for (const line of selected.split(/\r?\n/).slice(1)) {
    const separator = line.indexOf(":");
    if (separator < 0) continue;
    const name = line.slice(0, separator).trim();
    const value = line.slice(separator + 1).trim();
    if (name) headers.append(name, value);
  }
  return headers;
}

function acceptHeaderFrom(options) {
  const headers = options?.headers;
  if (headers instanceof Headers) return headers.get("accept") || HTML_ACCEPT;
  if (headers && typeof headers === "object") return headers.accept || headers.Accept || HTML_ACCEPT;
  return HTML_ACCEPT;
}

async function curlRequest(url, { follow = false, accept = HTML_ACCEPT } = {}) {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), "ttc-route-html-"));
  const headersPath = path.join(tempDir, "headers.txt");
  const bodyPath = path.join(tempDir, "body.html");
  try {
    const args = [
      "--silent",
      "--show-error",
      "--max-time",
      "30",
      "--dump-header",
      headersPath,
      "--output",
      bodyPath,
      "--write-out",
      "\\n%{http_code}\\n%{url_effective}",
      "--header",
      `accept: ${accept}`
    ];
    if (follow) args.push("--location");
    args.push(url);
    const { stdout } = await execFileAsync("curl", args, { maxBuffer: 1024 * 1024 });
    const lines = stdout.trim().split(/\r?\n/);
    const finalUrl = lines.pop() || url;
    const status = Number.parseInt(lines.pop() || "0", 10);
    const [rawHeaders, body] = await Promise.all([
      fs.readFile(headersPath, "utf8"),
      fs.readFile(bodyPath, "utf8")
    ]);
    return { status, url: finalUrl, headers: parseCurlHeaders(rawHeaders), body };
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true });
  }
}

async function fetchWithFallback(url, options = {}) {
  try {
    const response = await fetch(url, options);
    return {
      status: response.status,
      url: response.url || url,
      headers: response.headers,
      body: await response.text()
    };
  } catch (error) {
    return curlRequest(url, {
      follow: options.redirect === "follow",
      accept: acceptHeaderFrom(options)
    });
  }
}

async function fetchRoute(baseUrl, routePath) {
  const startUrl = canonicalFor(baseUrl, routePath);
  const first = await fetchWithFallback(startUrl, {
    redirect: "manual",
    headers: { accept: HTML_ACCEPT }
  });

  let response = first;
  let finalUrl = startUrl;
  let redirected = false;
  const initialLocation = first.headers.get("location") || "";

  if ([301, 302, 303, 307, 308].includes(first.status) && initialLocation) {
    redirected = true;
    finalUrl = new URL(initialLocation, startUrl).toString();
    response = await fetchWithFallback(finalUrl, {
      redirect: "follow",
      headers: { accept: HTML_ACCEPT }
    });
    finalUrl = response.url || finalUrl;
  }

  const html = response.body;
  return {
    path: routePath,
    initialStatus: first.status,
    status: response.status,
    redirected,
    initialLocation,
    finalUrl,
    title: extractTitle(html),
    h1: extractFirstH1(html),
    description: extractDescription(html),
    canonical: extractCanonical(html),
    robots: extractRobots(html, response.headers),
    html
  };
}

function expectedArtistDescription(artist) {
  return (
    artist.meta_description ||
    `Check ${artist.name} watchlist notes and verified ticket links where available. No fake prices or invented tour dates.`
  );
}

function expectedArtistTitle(artist) {
  return artist.seo_title || `${artist.name} Tickets | Options & Availability`;
}

function buildPublicScenarios(catalog, routeMetadataModule, baseUrl) {
  const scenarios = [];
  const seen = new Set();

  for (const [routePath, route] of Object.entries(routeMetadataModule.TRUST_ROUTES || {})) {
    const expectedH1 = TRUST_ROUTE_H1.get(routePath);
    if (!expectedH1) throw new Error(`Missing expected H1 for trust route ${routePath}`);
    scenarios.push({
      kind: "public",
      source: "trust",
      path: routePath,
      expectedTitle: route.title,
      expectedH1,
      expectedDescription: route.description,
      expectedCanonical: canonicalFor(baseUrl, routePath)
    });
    seen.add(routePath);
  }

  for (const artist of catalog.artists || []) {
    if (!artist?.slug || !artist?.name) continue;
    const routePath = `/artists/${artist.slug}`;
    scenarios.push({
      kind: "public",
      source: "artist",
      path: routePath,
      expectedTitle: expectedArtistTitle(artist),
      expectedH1: `${artist.name} ticket links and buying guidance`,
      expectedDescription: expectedArtistDescription(artist),
      expectedCanonical: canonicalFor(baseUrl, routePath)
    });
    seen.add(routePath);
  }

  for (const [routePath, route] of Object.entries(routeMetadataModule.GUIDE_ROUTES || {})) {
    if (seen.has(routePath)) throw new Error(`Duplicate public route in route metadata: ${routePath}`);
    scenarios.push({
      kind: "public",
      source: "guide",
      path: routePath,
      expectedTitle: route.title,
      expectedH1: route.h1 || route.title.replace(" | TourTicketCompare", ""),
      expectedDescription: route.description,
      expectedCanonical: canonicalFor(baseUrl, routePath)
    });
    seen.add(routePath);
  }

  return scenarios;
}

function buildRedirectScenarios(oldGuideRedirects, expectedByPath, baseUrl) {
  return Object.entries(oldGuideRedirects || {}).map(([routePath, targetPath]) => {
    const expectedTarget = expectedByPath.get(targetPath);
    if (!expectedTarget) throw new Error(`Old guide redirect ${routePath} targets missing route ${targetPath}`);
    return {
      ...expectedTarget,
      kind: "redirect",
      source: "old-guide-redirect",
      path: routePath,
      targetPath,
      expectedLocation: canonicalFor(baseUrl, targetPath),
      expectedCanonical: canonicalFor(baseUrl, targetPath)
    };
  });
}

function buildUnknownScenario(routePath, baseUrl) {
  return {
    kind: "unknown",
    source: "404",
    path: routePath,
    expectedTitle: "Page Not Found | TourTicketCompare",
    expectedH1: "Page not found",
    expectedDescription: "This TourTicketCompare page is not published.",
    expectedCanonical: canonicalFor(baseUrl, routePath)
  };
}

function buildChecks(row, home, scenario) {
  const checks = [];

  if (scenario.kind === "public") {
    checks.push({ ok: row.initialStatus === 200, message: `expected initial 200, got ${row.initialStatus}` });
    checks.push({ ok: row.status === 200, message: `expected 200, got ${row.status}` });
    checks.push({ ok: !row.redirected, message: "unexpected redirect" });
    checks.push({ ok: row.title === scenario.expectedTitle, message: `expected title "${scenario.expectedTitle}", got "${row.title}"` });
    checks.push({ ok: row.h1 === scenario.expectedH1, message: `expected H1 "${scenario.expectedH1}", got "${row.h1}"` });
    checks.push({
      ok: row.description === scenario.expectedDescription,
      message: `expected description "${scenario.expectedDescription}", got "${row.description}"`
    });
    checks.push({
      ok: sameUrl(row.canonical, scenario.expectedCanonical),
      message: `expected canonical "${scenario.expectedCanonical}", got "${row.canonical}"`
    });
    checks.push({ ok: !hasNoindex(row.robots), message: `indexable route has noindex robots value "${row.robots}"` });
    if (scenario.path !== "/") {
      checks.push({ ok: row.title !== home.title, message: "title matches homepage" });
      checks.push({ ok: row.h1 !== home.h1, message: "H1 matches homepage" });
      checks.push({ ok: row.description !== home.description, message: "description matches homepage" });
      checks.push({ ok: !sameUrl(row.canonical, home.canonical), message: "canonical matches homepage" });
    }
  }

  if (scenario.kind === "redirect") {
    const resolvedLocation = row.initialLocation ? new URL(row.initialLocation, canonicalFor(home.baseUrl, row.path)).toString() : "";
    checks.push({ ok: row.initialStatus === 301, message: `expected initial 301, got ${row.initialStatus}` });
    checks.push({ ok: row.redirected, message: "expected redirect" });
    checks.push({
      ok: sameUrl(resolvedLocation, scenario.expectedLocation),
      message: `expected Location "${scenario.expectedLocation}", got "${row.initialLocation || "missing"}"`
    });
    checks.push({ ok: row.status === 200, message: `expected final 200, got ${row.status}` });
    checks.push({
      ok: routePathFromUrl(row.finalUrl) === scenario.targetPath,
      message: `expected final path "${scenario.targetPath}", got "${routePathFromUrl(row.finalUrl)}"`
    });
    checks.push({ ok: row.title === scenario.expectedTitle, message: `redirect target title mismatch: got "${row.title}"` });
    checks.push({ ok: row.h1 === scenario.expectedH1, message: `redirect target H1 mismatch: got "${row.h1}"` });
    checks.push({
      ok: row.description === scenario.expectedDescription,
      message: `redirect target description mismatch: got "${row.description}"`
    });
    checks.push({
      ok: sameUrl(row.canonical, scenario.expectedCanonical),
      message: `redirect target canonical mismatch: got "${row.canonical}"`
    });
    checks.push({ ok: !hasNoindex(row.robots), message: `redirect target has noindex robots value "${row.robots}"` });
  }

  if (scenario.kind === "unknown") {
    checks.push({ ok: row.initialStatus === 404, message: `expected initial 404, got ${row.initialStatus}` });
    checks.push({ ok: row.status === 404, message: `expected 404, got ${row.status}` });
    checks.push({ ok: !row.redirected, message: "unknown route should not redirect" });
    checks.push({ ok: hasNoindex(row.robots), message: `known 404 route missing noindex, got "${row.robots}"` });
    checks.push({ ok: row.title === scenario.expectedTitle, message: `expected 404 title "${scenario.expectedTitle}", got "${row.title}"` });
    checks.push({ ok: row.h1 === scenario.expectedH1, message: `expected 404 H1 "${scenario.expectedH1}", got "${row.h1}"` });
    checks.push({
      ok: row.description === scenario.expectedDescription,
      message: `expected 404 description "${scenario.expectedDescription}", got "${row.description}"`
    });
    checks.push({
      ok: sameUrl(row.canonical, scenario.expectedCanonical),
      message: `expected 404 canonical "${scenario.expectedCanonical}", got "${row.canonical}"`
    });
  }

  return checks;
}

function extractSitemapLocs(xml) {
  return [...String(xml || "").matchAll(/<loc>([\s\S]*?)<\/loc>/gi)].map((match) => decodeHtmlEntities(match[1].trim()));
}

function duplicateValues(values) {
  const seen = new Set();
  const duplicates = new Set();
  for (const value of values) {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }
  return [...duplicates];
}

async function checkSitemap(baseUrl, publicScenarios) {
  const url = canonicalFor(baseUrl, "/sitemap.xml");
  const response = await fetchWithFallback(url, {
    redirect: "manual",
    headers: { accept: XML_ACCEPT }
  });
  const locs = extractSitemapLocs(response.body);
  const expectedLocs = publicScenarios.map((scenario) => scenario.expectedCanonical);
  const actualSet = new Set(locs);
  const expectedSet = new Set(expectedLocs);
  const missing = expectedLocs.filter((loc) => !actualSet.has(loc));
  const extra = locs.filter((loc) => !expectedSet.has(loc));
  const duplicates = duplicateValues(locs);
  const contentType = response.headers.get("content-type") || "";
  const checks = [
    { ok: response.status === 200, message: `expected 200, got ${response.status}` },
    { ok: /xml/i.test(contentType), message: `expected XML content-type, got "${contentType}"` },
    { ok: locs.length === expectedLocs.length, message: `expected ${expectedLocs.length} URLs, got ${locs.length}` },
    { ok: missing.length === 0, message: `missing sitemap loc(s): ${missing.join(", ")}` },
    { ok: extra.length === 0, message: `unexpected sitemap loc(s): ${extra.join(", ")}` },
    { ok: duplicates.length === 0, message: `duplicate sitemap loc(s): ${duplicates.join(", ")}` }
  ];
  const failures = checks.filter((check) => !check.ok).map((check) => check.message);
  return { status: response.status, locs, expectedCount: expectedLocs.length, failures, pass: failures.length === 0 };
}

async function checkWwwRedirects(baseUrl, publicScenarios) {
  const parsedBase = new URL(baseUrl);
  if (parsedBase.hostname !== PRODUCTION_APEX_HOST) {
    return {
      skipped: true,
      reason: `www/apex redirect checks run only when base host is ${PRODUCTION_APEX_HOST}`
    };
  }

  const wwwUrl = new URL(baseUrl);
  wwwUrl.hostname = `www.${PRODUCTION_APEX_HOST}`;
  const wwwBaseUrl = wwwUrl.origin;
  const rows = [];

  for (const scenario of publicScenarios) {
    const startUrl = canonicalFor(wwwBaseUrl, scenario.path);
    const response = await fetchWithFallback(startUrl, {
      redirect: "manual",
      headers: { accept: HTML_ACCEPT }
    });
    const location = response.headers.get("location") || "";
    const resolvedLocation = location ? new URL(location, startUrl).toString() : "";
    const expectedLocation = canonicalFor(baseUrl, scenario.path);
    const checks = [
      { ok: response.status === 301, message: `expected 301, got ${response.status}` },
      {
        ok: sameUrl(resolvedLocation, expectedLocation),
        message: `expected Location "${expectedLocation}", got "${location || "missing"}"`
      }
    ];
    const failures = checks.filter((check) => !check.ok).map((check) => check.message);
    rows.push({
      path: scenario.path,
      status: response.status,
      location: resolvedLocation,
      expectedLocation,
      pass: failures.length === 0,
      failures
    });
  }

  return { skipped: false, rows };
}

function truncate(value, max = 62) {
  const text = String(value || "—");
  return text.length <= max ? text : `${text.slice(0, max - 1)}…`;
}

function printTable(rows) {
  const headers = ["pass", "type", "path", "status", "final URL", "title", "H1", "canonical", "robots"];
  const data = rows.map((row) => [
    row.pass ? "PASS" : "FAIL",
    row.scenario.source,
    row.path,
    row.redirected ? `${row.initialStatus}->${row.status}` : String(row.status),
    row.redirected ? displayUrl(row.finalUrl) : "—",
    truncate(row.title),
    truncate(row.h1),
    truncate(row.canonical),
    truncate(row.robots, 44)
  ]);
  const widths = headers.map((header, column) => Math.max(header.length, ...data.map((cells) => cells[column].length)));
  const format = (cells) => cells.map((cell, column) => cell.padEnd(widths[column])).join(" | ");
  console.log(format(headers));
  console.log(widths.map((width) => "-".repeat(width)).join("-+-"));
  for (const cells of data) console.log(format(cells));
}

function printSitemapResult(result) {
  const status = result.pass ? "PASS" : "FAIL";
  console.log(`\nSitemap: ${status} /sitemap.xml returned ${result.locs.length}/${result.expectedCount} expected URLs.`);
}

function printWwwRedirectResult(result) {
  if (result.skipped) {
    console.log(`www/apex redirects: SKIP ${result.reason}.`);
    return;
  }
  const failed = result.rows.filter((row) => !row.pass);
  const status = failed.length ? "FAIL" : "PASS";
  console.log(`www/apex redirects: ${status} ${result.rows.length - failed.length}/${result.rows.length} public routes redirect to apex.`);
}

function printFailures(routeRows, sitemapResult, wwwResult) {
  const failedRows = routeRows.filter((row) => !row.pass);
  if (failedRows.length > 0) {
    console.error("\nRoute failures:");
    for (const row of failedRows) {
      console.error(`- ${row.path}: ${row.failures.join("; ")}`);
    }
  }

  if (!sitemapResult.pass) {
    console.error("\nSitemap failures:");
    for (const failure of sitemapResult.failures) console.error(`- ${failure}`);
  }

  if (!wwwResult.skipped) {
    const failedWwwRows = wwwResult.rows.filter((row) => !row.pass);
    if (failedWwwRows.length > 0) {
      console.error("\nwww/apex redirect failures:");
      for (const row of failedWwwRows) {
        console.error(`- ${row.path}: ${row.failures.join("; ")}`);
      }
    }
  }
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    console.log(usage());
    return;
  }

  const baseUrl = normalizeBaseUrl(options.baseUrl);
  const catalog = await readJson("public/data/catalog.json");
  const routeMetadataModule = await import(pathToFileURL(path.join(root, "functions/_route-metadata.js")));

  const publicScenarios = buildPublicScenarios(catalog, routeMetadataModule, baseUrl);
  const expectedByPath = new Map(publicScenarios.map((scenario) => [scenario.path, scenario]));
  const redirectScenarios = buildRedirectScenarios(routeMetadataModule.OLD_GUIDE_REDIRECTS, expectedByPath, baseUrl);
  const unknownScenarios = [
    buildUnknownScenario(UNKNOWN_ROUTE, baseUrl),
    buildUnknownScenario(UNKNOWN_ARTIST_ROUTE, baseUrl)
  ];
  const scenarios = publicScenarios.concat(redirectScenarios, unknownScenarios);

  console.log(`Route raw HTML diagnostic for ${baseUrl}`);
  console.log(`Checking ${publicScenarios.length} indexable routes, ${redirectScenarios.length} redirects, ${unknownScenarios.length} noindex 404 routes, sitemap count, and www/apex redirects.`);
  console.log("Requests inspect raw HTML only; client-side JavaScript is not executed.\n");

  const rows = [];
  const home = await fetchRoute(baseUrl, "/");
  home.baseUrl = baseUrl;
  for (const scenario of scenarios) {
    const row = scenario.path === "/" ? home : await fetchRoute(baseUrl, scenario.path);
    row.baseUrl = baseUrl;
    const checks = buildChecks(row, home, scenario);
    const failures = checks.filter((check) => !check.ok).map((check) => check.message);
    rows.push({ ...row, pass: failures.length === 0, failures, scenario });
  }

  const [sitemapResult, wwwResult] = await Promise.all([
    checkSitemap(baseUrl, publicScenarios),
    checkWwwRedirects(baseUrl, publicScenarios)
  ]);

  printTable(rows);
  printSitemapResult(sitemapResult);
  printWwwRedirectResult(wwwResult);

  const hasRouteFailures = rows.some((row) => !row.pass);
  const hasSitemapFailures = !sitemapResult.pass;
  const hasWwwFailures = !wwwResult.skipped && wwwResult.rows.some((row) => !row.pass);
  if (hasRouteFailures || hasSitemapFailures || hasWwwFailures) {
    printFailures(rows, sitemapResult, wwwResult);
    process.exitCode = 1;
    return;
  }

  console.log("\nAll checked routes returned the expected raw HTML, canonical URLs, sitemap entries, and www/apex redirects.");
}

main().catch((error) => {
  console.error(error?.stack || error);
  process.exitCode = 1;
});
