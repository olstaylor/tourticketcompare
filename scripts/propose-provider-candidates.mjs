#!/usr/bin/env node
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");

const DEFAULT_ARTISTS_PATH = path.join(REPO_ROOT, "public", "data", "artists.json");
const DEFAULT_EVENTS_PATH = path.join(REPO_ROOT, "public", "data", "events.json");
const DEFAULT_PROVIDER_IDENTITIES_PATH = path.join(REPO_ROOT, "data", "provider-identities.json");
const DEFAULT_OUT_PATH = path.join(REPO_ROOT, "functions", "api", "out.js");
const DEFAULT_AUDIT_DIR = path.join(REPO_ROOT, ".audit");
const TM_API_BASE = "https://app.ticketmaster.com/discovery/v2";
const DEFAULT_TIMEOUT_MS = 20_000;
const DEFAULT_DELAY_MS = 250;

const CLASSIFICATIONS = new Set([
  "auto_safe_for_review",
  "needs_manual_review",
  "blocked",
  "duplicate_or_existing"
]);

const GENERIC_NAME_TOKENS = new Set([
  "official",
  "tickets",
  "ticket",
  "tour",
  "concert",
  "concerts",
  "live",
  "music",
  "the",
  "and",
  "with"
]);

function usage() {
  return `Usage: node scripts/propose-provider-candidates.mjs [options]\n\nDry-run provider identity candidate reporter. Reads local artist/event/provider data, optionally queries allowed provider APIs when credentials are present, and writes JSON + Markdown reports under .audit/. It never mutates production artist, event, CTA, affiliate, or provider registry data.\n\nOptions:\n  --provider <name>       Provider to inspect: ticketmaster, seatgeek, or all (default: ticketmaster)\n  --artist <slug>         Restrict report to one artist slug\n  --limit <n>             Maximum API-discovered candidates per artist (default: 5)\n  --audit-dir <path>      Output directory (default: .audit)\n  --json <path>           Explicit JSON report path\n  --markdown <path>       Explicit Markdown report path\n  --delay-ms <n>          Delay between provider API requests (default: 250)\n  --timeout-ms <n>        Provider API timeout in milliseconds (default: 20000)\n  --no-api                Do not call provider APIs, even when credentials are present\n  --dry-run               Explicit no-op write mode; default and only supported mode\n  -h, --help              Show this help\n\nEnvironment:\n  TICKETMASTER_API_KEY    Enables Ticketmaster Discovery attraction lookups\n  SEATGEEK_CLIENT_ID      Not used yet; reported as a future SeatGeek TODO only\n  TTC_REPORT_TIMESTAMP    Optional ISO-ish timestamp override for deterministic report names\n`;
}

function parseArgs(argv) {
  const options = {
    provider: "ticketmaster",
    artist: "",
    limit: 5,
    auditDir: DEFAULT_AUDIT_DIR,
    jsonPath: "",
    markdownPath: "",
    delayMs: DEFAULT_DELAY_MS,
    timeoutMs: DEFAULT_TIMEOUT_MS,
    noApi: false,
    dryRun: true,
    help: false
  };
  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--provider") {
      const value = argv[++i];
      if (!value || value.startsWith("--")) throw new Error("--provider requires a value");
      options.provider = clean(value).toLowerCase();
    } else if (arg === "--artist") {
      const value = argv[++i];
      if (!value || value.startsWith("--")) throw new Error("--artist requires a slug");
      options.artist = slugify(value);
    } else if (arg === "--limit") {
      options.limit = parsePositiveInteger(argv[++i], "--limit");
    } else if (arg === "--audit-dir") {
      const value = argv[++i];
      if (!value || value.startsWith("--")) throw new Error("--audit-dir requires a path");
      options.auditDir = path.resolve(REPO_ROOT, value);
    } else if (arg === "--json") {
      const value = argv[++i];
      if (!value || value.startsWith("--")) throw new Error("--json requires a path");
      options.jsonPath = path.resolve(REPO_ROOT, value);
    } else if (arg === "--markdown" || arg === "--md") {
      const value = argv[++i];
      if (!value || value.startsWith("--")) throw new Error(`${arg} requires a path`);
      options.markdownPath = path.resolve(REPO_ROOT, value);
    } else if (arg === "--delay-ms") {
      options.delayMs = parseNonNegativeInteger(argv[++i], "--delay-ms");
    } else if (arg === "--timeout-ms") {
      options.timeoutMs = parsePositiveInteger(argv[++i], "--timeout-ms");
    } else if (arg === "--no-api") {
      options.noApi = true;
    } else if (arg === "--dry-run") {
      options.dryRun = true;
    } else if (arg === "--help" || arg === "-h") {
      options.help = true;
    } else {
      throw new Error(`Unknown option: ${arg}`);
    }
  }
  if (!["ticketmaster", "seatgeek", "all"].includes(options.provider)) {
    throw new Error('--provider must be one of "ticketmaster", "seatgeek", or "all"');
  }
  return options;
}

function parsePositiveInteger(value, flag) {
  if (!value || String(value).startsWith("--")) throw new Error(`${flag} requires a positive integer`);
  const parsed = Number.parseInt(value, 10);
  if (!Number.isInteger(parsed) || parsed < 1) throw new Error(`${flag} requires a positive integer`);
  return parsed;
}

function parseNonNegativeInteger(value, flag) {
  if (!value || String(value).startsWith("--")) throw new Error(`${flag} requires a non-negative integer`);
  const parsed = Number.parseInt(value, 10);
  if (!Number.isInteger(parsed) || parsed < 0) throw new Error(`${flag} requires a non-negative integer`);
  return parsed;
}

function clean(value, max = 512) {
  return String(value ?? "").trim().slice(0, max);
}

function slugify(value) {
  return clean(value, 160)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function normalizeText(value) {
  return clean(value, 512)
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function meaningfulTokens(value) {
  return normalizeText(value)
    .split(" ")
    .filter((token) => token.length > 1 && !GENERIC_NAME_TOKENS.has(token));
}

function diceSimilarity(a, b) {
  const aTokens = new Set(meaningfulTokens(a));
  const bTokens = new Set(meaningfulTokens(b));
  if (!aTokens.size && !bTokens.size) return 1;
  if (!aTokens.size || !bTokens.size) return 0;
  let overlap = 0;
  for (const token of aTokens) if (bTokens.has(token)) overlap += 1;
  return (2 * overlap) / (aTokens.size + bTokens.size);
}

function tokenCoverage(needle, haystack) {
  const needleTokens = meaningfulTokens(needle);
  if (!needleTokens.length) return 0;
  const haystackTokens = new Set(meaningfulTokens(haystack));
  return needleTokens.filter((token) => haystackTokens.has(token)).length / needleTokens.length;
}

async function readJson(filePath) {
  return JSON.parse(await fs.readFile(filePath, "utf8"));
}

async function readTextIfExists(filePath) {
  try {
    return await fs.readFile(filePath, "utf8");
  } catch (error) {
    if (error?.code === "ENOENT") return "";
    throw error;
  }
}

function timestampForPath() {
  const override = clean(process.env.TTC_REPORT_TIMESTAMP, 80);
  const raw = override || new Date().toISOString();
  return raw.replace(/[^0-9A-Za-z]+/g, "-").replace(/(^-|-$)/g, "").slice(0, 32);
}

function reportPaths(options) {
  const stamp = timestampForPath();
  return {
    jsonPath: options.jsonPath || path.join(options.auditDir, `provider-candidates-${stamp}.json`),
    markdownPath: options.markdownPath || path.join(options.auditDir, `provider-candidates-${stamp}.md`),
    latestJsonPath: path.join(options.auditDir, "provider-candidates.latest.json"),
    latestMarkdownPath: path.join(options.auditDir, "provider-candidates.latest.md")
  };
}

function extractVerifiedTicketLinks(outSource) {
  const links = new Map();
  const blockMatch = outSource.match(/const\s+VERIFIED_TICKET_LINKS\s*=\s*\{([\s\S]*?)\n\};/);
  if (!blockMatch) return links;
  const block = blockMatch[1];
  const entryRe = /"([^"]+):([^"]+)"\s*:\s*\{([\s\S]*?)\n\s*\}/g;
  let match;
  while ((match = entryRe.exec(block))) {
    const [, slug, provider, body] = match;
    const redirectUrl = body.match(/redirectUrl:\s*"([^"]+)"/)?.[1] || "";
    const verified = /verified:\s*true/.test(body);
    links.set(`${slug}:${provider}`, { slug, provider, redirectUrl, verified });
  }
  return links;
}

function ticketmasterAllowedHosts(outSource) {
  const match = outSource.match(/ticketmaster:\s*\{[\s\S]*?allowedDestinationHosts:\s*\[([\s\S]*?)\]/);
  if (!match) return ["ticketmaster.com"];
  const hosts = [...match[1].matchAll(/"([^"]+)"/g)].map((m) => m[1].toLowerCase());
  return hosts.length ? hosts : ["ticketmaster.com"];
}

function hostAllowed(hostname, allowedHosts) {
  const host = String(hostname || "").toLowerCase();
  return allowedHosts.some((allowed) => host === allowed || host.endsWith(`.${allowed}`));
}

function validateUrlForHosts(url, allowedHosts) {
  const raw = clean(url, 2048);
  if (!raw) return { ok: false, reason: "missing_url" };
  let parsed;
  try {
    parsed = new URL(raw);
  } catch {
    return { ok: false, reason: "invalid_url" };
  }
  if (parsed.protocol !== "https:") return { ok: false, reason: "non_https_url" };
  if (!hostAllowed(parsed.hostname, allowedHosts)) return { ok: false, reason: `host_not_allowed:${parsed.hostname}` };
  return { ok: true, reason: "allowed", url: parsed.toString() };
}

function eventsByArtist(events) {
  const grouped = new Map();
  for (const event of Array.isArray(events) ? events : []) {
    const slug = slugify(event?.artist_slug || event?.artist_name);
    if (!slug) continue;
    const list = grouped.get(slug) || [];
    list.push(event);
    grouped.set(slug, list);
  }
  return grouped;
}

function summarizeArtistEvents(artistEvents) {
  const ticketmasterIds = new Set();
  const ticketmasterUrls = new Set();
  const seatgeekIds = new Set();
  const seatgeekUrls = new Set();
  for (const event of artistEvents || []) {
    const tmId = clean(event?.ticketmaster_discovery_event_id || event?.provider_links?.ticketmaster?.discovery_event_id || event?.ticketmaster_event_id);
    const tmUrl = clean(event?.ticketmaster_url || event?.provider_links?.ticketmaster?.url || event?.source_url, 2048);
    const sgId = event?.provider_links?.seatgeek?.event_id;
    const sgUrl = clean(event?.seatgeek_url || event?.provider_links?.seatgeek?.url, 2048);
    if (tmId) ticketmasterIds.add(tmId);
    if (tmUrl) ticketmasterUrls.add(tmUrl);
    if (sgId) seatgeekIds.add(String(sgId));
    if (sgUrl) seatgeekUrls.add(sgUrl);
  }
  return {
    total_events: (artistEvents || []).length,
    ticketmaster_event_ids: ticketmasterIds.size,
    ticketmaster_event_url_examples: [...ticketmasterUrls].slice(0, 3),
    seatgeek_event_ids: seatgeekIds.size,
    seatgeek_event_url_examples: [...seatgeekUrls].slice(0, 3)
  };
}

async function safeFetchJson(url, timeoutMs) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { signal: controller.signal, headers: { Accept: "application/json" } });
    const body = await response.text();
    let json = null;
    try {
      json = body ? JSON.parse(body) : null;
    } catch {
      json = null;
    }
    return { ok: response.ok, status: response.status, json, bodyPreview: body.slice(0, 240) };
  } finally {
    clearTimeout(timeout);
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function buildTicketmasterAttractionUrl(artistName, apiKey, limit) {
  const url = new URL(`${TM_API_BASE}/attractions.json`);
  url.searchParams.set("apikey", apiKey);
  url.searchParams.set("keyword", artistName);
  url.searchParams.set("classificationName", "music");
  url.searchParams.set("size", String(Math.max(1, Math.min(limit, 20))));
  return url;
}

function redactedUrl(url) {
  const copy = new URL(url.toString());
  if (copy.searchParams.has("apikey")) copy.searchParams.set("apikey", "[REDACTED]");
  if (copy.searchParams.has("client_id")) copy.searchParams.set("client_id", "[REDACTED]");
  if (copy.searchParams.has("client_secret")) copy.searchParams.set("client_secret", "[REDACTED]");
  return copy.toString();
}

function extractAttractions(payload) {
  const attractions = payload?._embedded?.attractions;
  return Array.isArray(attractions) ? attractions : [];
}

function attractionEvidenceUrl(attraction) {
  const ticketmasterUrl = (attraction?.externalLinks?.ticketmaster || [])
    .map((entry) => clean(entry?.url, 2048))
    .find(Boolean);
  return clean(attraction?.url, 2048) || ticketmasterUrl || "";
}

function attractionMusicSegment(attraction) {
  const classifications = Array.isArray(attraction?.classifications) ? attraction.classifications : [];
  return classifications.some((item) => normalizeText(item?.segment?.name) === "music");
}

function classifyTicketmasterCandidate({ artist, candidate, existingIds, allowedHosts }) {
  const providerId = clean(candidate?.id);
  const candidateName = clean(candidate?.name, 240);
  const evidenceUrl = attractionEvidenceUrl(candidate);
  const urlCheck = validateUrlForHosts(evidenceUrl, allowedHosts);
  const similarity = diceSimilarity(artist.name, candidateName);
  const coverage = tokenCoverage(artist.name, candidateName);
  const exactSlug = slugify(artist.name) === slugify(candidateName);
  const isMusic = attractionMusicSegment(candidate);
  const blockingFlags = [];
  const matchingReasons = [];

  if (!providerId) blockingFlags.push("missing_provider_id");
  if (!candidateName) blockingFlags.push("missing_provider_name");
  if (!urlCheck.ok) blockingFlags.push(urlCheck.reason);
  if (!isMusic) blockingFlags.push("not_music_classification");
  if (existingIds.has(providerId)) blockingFlags.push("provider_id_already_registered_for_another_artist");
  if (exactSlug) matchingReasons.push("exact_slug_match");
  if (similarity >= 0.9) matchingReasons.push("high_name_similarity");
  if (coverage >= 1) matchingReasons.push("all_artist_tokens_present");
  if (isMusic) matchingReasons.push("ticketmaster_music_classification");
  if (urlCheck.ok) matchingReasons.push("ticketmaster_url_host_allowed");

  const confidence = Math.round(Math.max(similarity, coverage) * 100);
  let classification = "needs_manual_review";
  if (blockingFlags.length) {
    classification = "blocked";
  } else if ((exactSlug || confidence >= 92) && coverage >= 1) {
    classification = "auto_safe_for_review";
  } else if (confidence < 55) {
    classification = "blocked";
    blockingFlags.push("low_name_confidence");
  }

  return normalizeCandidate({
    provider: "ticketmaster",
    artist_slug: artist.slug,
    artist_name: artist.name,
    classification,
    provider_id: providerId || null,
    provider_name: candidateName || null,
    evidence_urls: [evidenceUrl].filter(Boolean),
    confidence,
    matching_reasons: matchingReasons,
    blocking_flags: blockingFlags,
    raw_summary: {
      ticketmaster_locale: clean(candidate?.locale) || null,
      ticketmaster_type: clean(candidate?.type) || null,
      ticketmaster_test: candidate?.test === true
    }
  });
}

function normalizeCandidate(candidate) {
  if (!CLASSIFICATIONS.has(candidate.classification)) {
    throw new Error(`Invalid candidate classification: ${candidate.classification}`);
  }
  return {
    provider: candidate.provider,
    artist_slug: candidate.artist_slug,
    artist_name: candidate.artist_name,
    classification: candidate.classification,
    provider_id: candidate.provider_id ?? null,
    provider_name: candidate.provider_name ?? null,
    evidence_urls: candidate.evidence_urls || [],
    confidence: Number.isFinite(candidate.confidence) ? candidate.confidence : 0,
    matching_reasons: candidate.matching_reasons || [],
    blocking_flags: candidate.blocking_flags || [],
    raw_summary: candidate.raw_summary || {}
  };
}

function existingTicketmasterCandidate({ artist, identity, verifiedLink, eventSummary }) {
  const evidenceUrls = [identity?.ticketmaster_artist_url, verifiedLink?.redirectUrl, ...eventSummary.ticketmaster_event_url_examples].filter(Boolean);
  const reasons = [];
  if (identity?.ticketmaster_attraction_id) reasons.push("provider_identity_registry_has_ticketmaster_attraction_id");
  if (identity?.review_status === "verified") reasons.push("provider_identity_registry_review_status_verified");
  if (identity?.sync_enabled === true) reasons.push("provider_identity_registry_sync_enabled");
  if (verifiedLink?.verified) reasons.push("artist_level_ticketmaster_cta_already_verified");
  if (eventSummary.ticketmaster_event_ids > 0) reasons.push("artist_has_ticketmaster_event_ids_in_event_data");
  return normalizeCandidate({
    provider: "ticketmaster",
    artist_slug: artist.slug,
    artist_name: artist.name,
    classification: "duplicate_or_existing",
    provider_id: identity?.ticketmaster_attraction_id || null,
    provider_name: artist.name,
    evidence_urls: evidenceUrls,
    confidence: identity?.ticketmaster_attraction_id ? 100 : 90,
    matching_reasons: reasons,
    blocking_flags: ["already_present_or_verified_do_not_readd"],
    raw_summary: {
      registry_review_status: identity?.review_status || null,
      registry_sync_enabled: identity?.sync_enabled === true,
      ticketmaster_event_ids: eventSummary.ticketmaster_event_ids
    }
  });
}

function blockedTicketmasterNoApiCandidate({ artist, identity, verifiedLink, eventSummary }) {
  const reasons = [];
  if (verifiedLink?.verified) reasons.push("artist_level_ticketmaster_cta_verified_but_no_registry_attraction_id");
  if (eventSummary.ticketmaster_event_ids > 0) reasons.push("ticketmaster_events_exist_but_do_not_identify_attraction_id");
  return normalizeCandidate({
    provider: "ticketmaster",
    artist_slug: artist.slug,
    artist_name: artist.name,
    classification: "blocked",
    provider_id: null,
    provider_name: null,
    evidence_urls: [verifiedLink?.redirectUrl, ...eventSummary.ticketmaster_event_url_examples].filter(Boolean),
    confidence: 0,
    matching_reasons: reasons,
    blocking_flags: [
      "ticketmaster_api_key_missing_or_api_disabled",
      "cannot_discover_attraction_id_from_local_data_safely",
      identity?.review_status === "withheld" ? "provider_identity_withheld" : null
    ].filter(Boolean),
    raw_summary: {
      registry_review_status: identity?.review_status || null,
      ticketmaster_event_ids: eventSummary.ticketmaster_event_ids
    }
  });
}

async function ticketmasterCandidatesForArtist({ artist, identity, verifiedLink, eventSummary, options, allowedHosts, existingIds }) {
  if (identity?.ticketmaster_attraction_id) {
    return [existingTicketmasterCandidate({ artist, identity, verifiedLink, eventSummary })];
  }

  const apiKey = clean(process.env.TICKETMASTER_API_KEY, 200);
  if (options.noApi || !apiKey) {
    return [blockedTicketmasterNoApiCandidate({ artist, identity, verifiedLink, eventSummary })];
  }

  const lookupUrl = buildTicketmasterAttractionUrl(artist.name, apiKey, options.limit);
  await sleep(options.delayMs);
  let result;
  try {
    result = await safeFetchJson(lookupUrl, options.timeoutMs);
  } catch (error) {
    return [normalizeCandidate({
      provider: "ticketmaster",
      artist_slug: artist.slug,
      artist_name: artist.name,
      classification: "blocked",
      provider_id: null,
      provider_name: null,
      evidence_urls: [redactedUrl(lookupUrl)],
      confidence: 0,
      matching_reasons: [],
      blocking_flags: [`ticketmaster_api_request_failed:${clean(error?.name || error?.message, 80)}`],
      raw_summary: { request_url: redactedUrl(lookupUrl) }
    })];
  }

  if (!result.ok) {
    return [normalizeCandidate({
      provider: "ticketmaster",
      artist_slug: artist.slug,
      artist_name: artist.name,
      classification: "blocked",
      provider_id: null,
      provider_name: null,
      evidence_urls: [redactedUrl(lookupUrl)],
      confidence: 0,
      matching_reasons: [],
      blocking_flags: [`ticketmaster_api_status_${result.status}`],
      raw_summary: { request_url: redactedUrl(lookupUrl), body_preview: result.bodyPreview }
    })];
  }

  const attractions = extractAttractions(result.json).slice(0, options.limit);
  if (!attractions.length) {
    return [normalizeCandidate({
      provider: "ticketmaster",
      artist_slug: artist.slug,
      artist_name: artist.name,
      classification: "blocked",
      provider_id: null,
      provider_name: null,
      evidence_urls: [redactedUrl(lookupUrl)],
      confidence: 0,
      matching_reasons: [],
      blocking_flags: ["ticketmaster_no_attraction_results"],
      raw_summary: { request_url: redactedUrl(lookupUrl) }
    })];
  }

  const candidates = attractions.map((candidate) => classifyTicketmasterCandidate({ artist, candidate, existingIds, allowedHosts }));
  const safeCount = candidates.filter((candidate) => candidate.classification === "auto_safe_for_review").length;
  if (safeCount > 1) {
    return candidates.map((candidate) => candidate.classification === "auto_safe_for_review"
      ? { ...candidate, classification: "needs_manual_review", blocking_flags: [...candidate.blocking_flags, "multiple_high_confidence_candidates"] }
      : candidate);
  }
  return candidates;
}

function seatgeekStubCandidate({ artist, identity, eventSummary }) {
  const hasLocalCredential = Boolean(clean(process.env.SEATGEEK_CLIENT_ID, 200));
  const existingPerformerId = Number.isInteger(identity?.seatgeek_performer_id) ? identity.seatgeek_performer_id : null;
  if (existingPerformerId) {
    return normalizeCandidate({
      provider: "seatgeek",
      artist_slug: artist.slug,
      artist_name: artist.name,
      classification: "duplicate_or_existing",
      provider_id: String(existingPerformerId),
      provider_name: artist.name,
      evidence_urls: eventSummary.seatgeek_event_url_examples,
      confidence: 100,
      matching_reasons: ["provider_identity_registry_has_seatgeek_performer_id"],
      blocking_flags: ["already_present_do_not_readd", "artist_level_seatgeek_links_remain_out_of_scope"],
      raw_summary: { seatgeek_event_ids: eventSummary.seatgeek_event_ids }
    });
  }
  return normalizeCandidate({
    provider: "seatgeek",
    artist_slug: artist.slug,
    artist_name: artist.name,
    classification: "blocked",
    provider_id: null,
    provider_name: null,
    evidence_urls: eventSummary.seatgeek_event_url_examples,
    confidence: 0,
    matching_reasons: eventSummary.seatgeek_event_ids > 0 ? ["artist_has_some_event_level_seatgeek_coverage"] : [],
    blocking_flags: [
      "seatgeek_artist_provider_identity_discovery_not_implemented",
      "artist_level_seatgeek_links_remain_out_of_scope",
      hasLocalCredential ? "TODO_use_credentials_only_after_safe_performer_lookup_is_scoped" : "seatgeek_client_id_not_present_locally",
      "TODO_keep_event_level_url_discovery_in_existing_seatgeek_tooling"
    ],
    raw_summary: {
      seatgeek_event_ids: eventSummary.seatgeek_event_ids,
      seatgeek_structure_only: true
    }
  });
}

function countClassifications(candidates) {
  const counts = Object.fromEntries([...CLASSIFICATIONS].map((classification) => [classification, 0]));
  for (const candidate of candidates) counts[candidate.classification] += 1;
  return counts;
}

function markdownEscape(value) {
  return clean(value, 2048).replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function renderMarkdown(report) {
  const lines = [];
  lines.push("# Provider Candidate Dry-Run Report");
  lines.push("");
  lines.push(`Generated: ${report.generated_at}`);
  lines.push("");
  lines.push("## Safety decisions");
  for (const item of report.safety_decisions) lines.push(`- ${item}`);
  lines.push("");
  lines.push("## Summary");
  lines.push("");
  lines.push("| Classification | Count |");
  lines.push("|---|---:|");
  for (const [classification, count] of Object.entries(report.summary.classifications)) {
    lines.push(`| ${classification} | ${count} |`);
  }
  lines.push("");
  lines.push("## Provider status");
  lines.push("");
  for (const status of report.provider_status) {
    lines.push(`### ${status.provider}`);
    lines.push(`- Enabled in this report: ${status.enabled ? "yes" : "no"}`);
    lines.push(`- API lookups attempted: ${status.api_lookups_attempted ? "yes" : "no"}`);
    for (const note of status.notes) lines.push(`- ${note}`);
    lines.push("");
  }
  lines.push("## Candidates");
  lines.push("");
  lines.push("| Artist | Provider | Classification | Provider ID | Confidence | Reasons | Blocking flags | Evidence |");
  lines.push("|---|---|---|---|---:|---|---|---|");
  for (const candidate of report.candidates) {
    const evidence = candidate.evidence_urls.map((url) => `<${url}>`).join("<br>");
    lines.push(`| ${markdownEscape(candidate.artist_slug)} | ${candidate.provider} | ${candidate.classification} | ${markdownEscape(candidate.provider_id || "")} | ${candidate.confidence} | ${markdownEscape(candidate.matching_reasons.join(", "))} | ${markdownEscape(candidate.blocking_flags.join(", "))} | ${evidence} |`);
  }
  lines.push("");
  lines.push("## Example JSON shape");
  lines.push("");
  lines.push("```json");
  lines.push(JSON.stringify(report.candidates[0] || {}, null, 2));
  lines.push("```");
  lines.push("");
  return `${lines.join("\n")}\n`;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    console.log(usage());
    return;
  }

  const [artists, events, providerIdentities, outSource] = await Promise.all([
    readJson(DEFAULT_ARTISTS_PATH),
    readJson(DEFAULT_EVENTS_PATH),
    readJson(DEFAULT_PROVIDER_IDENTITIES_PATH),
    readTextIfExists(DEFAULT_OUT_PATH)
  ]);

  if (!Array.isArray(artists)) throw new Error("public/data/artists.json must be an array");
  if (!Array.isArray(events)) throw new Error("public/data/events.json must be an array");
  const identityBySlug = new Map((providerIdentities.artists || []).map((entry) => [entry.slug, entry]));
  const verifiedLinks = extractVerifiedTicketLinks(outSource);
  const allowedHosts = ticketmasterAllowedHosts(outSource);
  const groupedEvents = eventsByArtist(events);
  const artistsToInspect = artists
    .filter((artist) => !options.artist || slugify(artist.slug) === options.artist)
    .sort((a, b) => String(a.slug).localeCompare(String(b.slug)));
  if (!artistsToInspect.length) throw new Error(options.artist ? `No artist found for --artist ${options.artist}` : "No artists found");

  const providers = options.provider === "all" ? ["ticketmaster", "seatgeek"] : [options.provider];
  const existingTicketmasterIds = new Set(
    (providerIdentities.artists || [])
      .map((entry) => clean(entry.ticketmaster_attraction_id))
      .filter(Boolean)
  );
  const candidates = [];
  const ticketmasterApiKeyPresent = Boolean(clean(process.env.TICKETMASTER_API_KEY, 200));

  for (const artist of artistsToInspect) {
    const identity = identityBySlug.get(artist.slug) || {};
    const verifiedLink = verifiedLinks.get(`${artist.slug}:ticketmaster`) || null;
    const eventSummary = summarizeArtistEvents(groupedEvents.get(artist.slug) || []);

    if (providers.includes("ticketmaster")) {
      candidates.push(...await ticketmasterCandidatesForArtist({
        artist,
        identity,
        verifiedLink,
        eventSummary,
        options,
        allowedHosts,
        existingIds: existingTicketmasterIds
      }));
    }
    if (providers.includes("seatgeek")) {
      candidates.push(seatgeekStubCandidate({ artist, identity, eventSummary }));
    }
  }

  const providerStatus = [];
  if (providers.includes("ticketmaster")) {
    providerStatus.push({
      provider: "ticketmaster",
      enabled: true,
      api_lookups_attempted: !options.noApi && ticketmasterApiKeyPresent,
      notes: [
        "Ticketmaster Discovery attraction lookup is report-only and dry-run.",
        options.noApi ? "Provider API lookups were disabled with --no-api; missing registry IDs are blocked rather than guessed." : (ticketmasterApiKeyPresent ? "TICKETMASTER_API_KEY is present; missing registry IDs can be looked up." : "TICKETMASTER_API_KEY is not present; missing registry IDs are blocked rather than guessed."),
        "Existing registry IDs are classified duplicate_or_existing so the report cannot re-add them."
      ]
    });
  }
  if (providers.includes("seatgeek")) {
    providerStatus.push({
      provider: "seatgeek",
      enabled: false,
      api_lookups_attempted: false,
      notes: [
        "SeatGeek performer identity discovery is intentionally a stub in this pipeline.",
        "Existing SeatGeek tooling remains event-level URL proposal/enrichment only.",
        "TODO: scope a separate credentialed performer lookup before producing SeatGeek provider identity candidates; do not add artist-level SeatGeek links or prices."
      ]
    });
  }

  const report = {
    generated_at: new Date().toISOString(),
    dry_run: true,
    options: {
      provider: options.provider,
      artist: options.artist || null,
      limit: options.limit,
      no_api: options.noApi
    },
    sources: {
      artists: path.relative(REPO_ROOT, DEFAULT_ARTISTS_PATH),
      events: path.relative(REPO_ROOT, DEFAULT_EVENTS_PATH),
      provider_identities: path.relative(REPO_ROOT, DEFAULT_PROVIDER_IDENTITIES_PATH),
      outbound_registry: path.relative(REPO_ROOT, DEFAULT_OUT_PATH)
    },
    safety_decisions: [
      "No production artist/event/provider registry files are written.",
      "No scraping is performed; Ticketmaster lookups use the official Discovery API only when TICKETMASTER_API_KEY is present.",
      "No prices, availability claims, CTA rendering, affiliate routing, or /api/out behavior are changed.",
      "All outputs are review artifacts under .audit/ unless explicit report paths are passed.",
      "auto_safe_for_review means suitable for human review, not safe for automatic publication."
    ],
    provider_status: providerStatus,
    summary: {
      artists_inspected: artistsToInspect.length,
      candidate_count: candidates.length,
      classifications: countClassifications(candidates)
    },
    candidates
  };

  const paths = reportPaths(options);
  await fs.mkdir(path.dirname(paths.jsonPath), { recursive: true });
  await fs.mkdir(path.dirname(paths.markdownPath), { recursive: true });
  const jsonReport = `${JSON.stringify(report, null, 2)}\n`;
  const markdownReport = renderMarkdown(report);
  await fs.writeFile(paths.jsonPath, jsonReport);
  await fs.writeFile(paths.markdownPath, markdownReport);
  await fs.writeFile(paths.latestJsonPath, jsonReport);
  await fs.writeFile(paths.latestMarkdownPath, markdownReport);

  console.log(`Wrote dry-run provider candidate JSON: ${path.relative(REPO_ROOT, paths.jsonPath)}`);
  console.log(`Wrote dry-run provider candidate Markdown: ${path.relative(REPO_ROOT, paths.markdownPath)}`);
  console.log(`Updated latest JSON copy: ${path.relative(REPO_ROOT, paths.latestJsonPath)}`);
  console.log(`Updated latest Markdown copy: ${path.relative(REPO_ROOT, paths.latestMarkdownPath)}`);
  console.log(`Candidates: ${report.summary.candidate_count}; classifications: ${JSON.stringify(report.summary.classifications)}`);
}

main().catch((error) => {
  console.error(`FAIL: ${error.message}`);
  process.exit(1);
});
