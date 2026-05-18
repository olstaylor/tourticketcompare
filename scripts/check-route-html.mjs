import { execFile } from "node:child_process";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { promisify } from "node:util";
import { fileURLToPath, pathToFileURL } from "node:url";

const execFileAsync = promisify(execFile);
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_BASE_URL = "https://tourticketcompare.com";
const UNKNOWN_ROUTE = "/__route-html-diagnostic-missing-route__";

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
  parsed.pathname = parsed.pathname.replace(/\/+$/, "");
  parsed.search = "";
  parsed.hash = "";
  return parsed.toString().replace(/\/$/, "");
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

async function curlRequest(url, { follow = false } = {}) {
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
      "accept: text/html,application/xhtml+xml"
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
    return curlRequest(url, { follow: options.redirect === "follow" });
  }
}

async function fetchRoute(baseUrl, routePath) {
  const startUrl = new URL(routePath, `${baseUrl}/`).toString();
  const first = await fetchWithFallback(startUrl, {
    redirect: "manual",
    headers: { accept: "text/html,application/xhtml+xml" }
  });

  let response = first;
  let finalUrl = startUrl;
  let redirected = false;

  if ([301, 302, 303, 307, 308].includes(first.status)) {
    const location = first.headers.get("location");
    if (location) {
      redirected = true;
      finalUrl = new URL(location, startUrl).toString();
      response = await fetchWithFallback(finalUrl, {
        redirect: "follow",
        headers: { accept: "text/html,application/xhtml+xml" }
      });
      finalUrl = response.url || finalUrl;
    }
  }

  const html = response.body;
  return {
    path: routePath,
    initialStatus: first.status,
    status: response.status,
    redirected,
    finalUrl,
    title: extractTitle(html),
    h1: extractFirstH1(html),
    canonical: extractCanonical(html),
    robots: extractRobots(html, response.headers),
    html
  };
}

function buildChecks(row, home, scenario) {
  const checks = [];
  if (scenario.kind === "public") {
    checks.push({ ok: row.status === 200, message: `expected 200, got ${row.status}` });
    checks.push({ ok: row.canonical !== "", message: "missing canonical" });
    if (scenario.path !== "/") {
      checks.push({ ok: row.title !== home.title, message: "title matches homepage" });
      checks.push({ ok: row.h1 !== home.h1, message: "H1 matches homepage" });
      checks.push({ ok: row.canonical !== home.canonical, message: "canonical matches homepage" });
    }
  }

  if (scenario.kind === "redirect") {
    checks.push({ ok: row.redirected, message: `expected redirect, got HTTP ${row.initialStatus}` });
    checks.push({ ok: row.status === 200, message: `expected final 200, got ${row.status}` });
    checks.push({ ok: row.canonical !== "", message: "redirect target missing canonical" });
    checks.push({ ok: row.title !== home.title, message: "redirect target title matches homepage" });
    checks.push({ ok: row.h1 !== home.h1, message: "redirect target H1 matches homepage" });
    checks.push({ ok: row.canonical !== home.canonical, message: "redirect target canonical matches homepage" });
  }

  if (scenario.kind === "unknown") {
    checks.push({ ok: row.status === 404, message: `expected 404, got ${row.status}` });
    checks.push({ ok: hasNoindex(row.robots), message: "known 404 route missing noindex" });
  }

  return checks;
}

function truncate(value, max = 62) {
  const text = String(value || "—");
  return text.length <= max ? text : `${text.slice(0, max - 1)}…`;
}

function printTable(rows) {
  const headers = ["pass", "path", "status", "final URL", "title", "H1", "canonical", "robots"];
  const data = rows.map((row) => [
    row.pass ? "PASS" : "FAIL",
    row.path,
    row.redirected ? `${row.initialStatus}→${row.status}` : String(row.status),
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

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    console.log(usage());
    return;
  }

  const baseUrl = normalizeBaseUrl(options.baseUrl);
  const catalog = await readJson("public/data/catalog.json");
  const routeMetadataModule = await import(pathToFileURL(path.join(root, "functions/_route-metadata.js")));
  const firstArtist = catalog.artists?.find((artist) => artist?.slug)?.slug;
  const firstGuide = Object.keys(routeMetadataModule.GUIDE_ROUTES || {})[0];
  const firstOldGuide = Object.keys(routeMetadataModule.OLD_GUIDE_REDIRECTS || {})[0];

  if (!firstArtist) throw new Error("No existing artist route found in public/data/catalog.json");
  if (!firstGuide) throw new Error("No existing guide route found in functions/_route-metadata.js");
  if (!firstOldGuide) throw new Error("No old guide redirect found in functions/_route-metadata.js");

  const scenarios = [
    "/",
    "/artists",
    "/guides",
    "/how-it-works",
    "/editorial-policy",
    "/affiliate-disclosure",
    "/about",
    "/contact",
    `/artists/${firstArtist}`,
    firstGuide
  ].map((routePath) => ({ path: routePath, kind: "public" }));
  scenarios.push({ path: firstOldGuide, kind: "redirect" });
  scenarios.push({ path: UNKNOWN_ROUTE, kind: "unknown" });

  console.log(`Route raw HTML diagnostic for ${baseUrl}`);
  console.log(`Checking ${scenarios.length} routes without running client-side JavaScript.\n`);

  const rows = [];
  const home = await fetchRoute(baseUrl, "/");
  for (const scenario of scenarios) {
    const row = scenario.path === "/" ? home : await fetchRoute(baseUrl, scenario.path);
    const checks = buildChecks(row, home, scenario);
    const failures = checks.filter((check) => !check.ok).map((check) => check.message);
    rows.push({ ...row, pass: failures.length === 0, failures, scenario });
  }

  printTable(rows);

  const failedRows = rows.filter((row) => !row.pass);
  if (failedRows.length > 0) {
    console.error("\nFailures:");
    for (const row of failedRows) {
      console.error(`- ${row.path}: ${row.failures.join("; ")}`);
    }
    process.exitCode = 1;
    return;
  }

  console.log("\nAll checked routes returned route-specific raw HTML diagnostics as expected.");
}

main().catch((error) => {
  console.error(error?.stack || error);
  process.exitCode = 1;
});
