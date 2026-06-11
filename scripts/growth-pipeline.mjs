#!/usr/bin/env node
/**
 * growth-pipeline.mjs
 *
 * Report-only growth planning shell. This script reads local repository data and
 * writes human-review artifacts under .audit/. It never mutates production data,
 * calls external provider APIs, scrapes, or changes CTA/affiliate routing.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");

const DEFAULT_ARTISTS_PATH = path.join(REPO_ROOT, "public", "data", "artists.json");
const DEFAULT_PROVIDER_IDENTITIES_PATH = path.join(REPO_ROOT, "data", "provider-identities.json");
const DEFAULT_AUDIT_DIR = path.join(REPO_ROOT, ".audit");

function usage() {
  return `Usage: node scripts/growth-pipeline.mjs [options]\n\nReport-only growth planning pipeline. Reads local artist data and the local provider identity registry, then writes JSON + Markdown reports under .audit/. It never mutates production data, calls external provider APIs, scrapes, or applies provider identities.\n\nOptions:\n  --artist <slug>       Restrict report to one artist slug\n  --audit-dir <path>    Output directory (default: .audit)\n  --json <path>         Explicit timestamped JSON report path\n  --markdown <path>     Explicit timestamped Markdown report path\n  --no-api              Accepted for safety; external lookups are not implemented\n  --dry-run             Accepted for clarity; report-only is the only mode\n  -h, --help            Show this help\n\nEnvironment:\n  TTC_REPORT_TIMESTAMP  Optional ISO-ish timestamp override for deterministic report names\n`;
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

function parseArgs(argv) {
  const options = {
    artist: "",
    auditDir: DEFAULT_AUDIT_DIR,
    jsonPath: "",
    markdownPath: "",
    noApi: false,
    dryRun: true,
    help: false
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--artist") {
      const value = argv[++i];
      if (!value || value.startsWith("--")) throw new Error("--artist requires a slug");
      options.artist = slugify(value);
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

  return options;
}

async function readJsonIfPresent(filePath, fallback) {
  try {
    return { available: true, value: JSON.parse(await fs.readFile(filePath, "utf8")) };
  } catch (error) {
    if (error?.code === "ENOENT") return { available: false, value: fallback };
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
    jsonPath: options.jsonPath || path.join(options.auditDir, `growth-plan-${stamp}.json`),
    markdownPath: options.markdownPath || path.join(options.auditDir, `growth-plan-${stamp}.md`),
    latestJsonPath: path.join(options.auditDir, "growth-plan.latest.json"),
    latestMarkdownPath: path.join(options.auditDir, "growth-plan.latest.md")
  };
}

function providerIdStatus(value) {
  return clean(value) ? "present" : "missing";
}

function seatgeekPerformerIdStatus(value) {
  return Number.isInteger(value) ? "present" : "missing";
}

function identityExists(identity) {
  return Boolean(identity && (clean(identity.ticketmaster_attraction_id) || Number.isInteger(identity.seatgeek_performer_id)));
}

function hasRegistryEntry(identity) {
  return Boolean(identity && clean(identity.slug));
}

function ticketmasterIdentityAppearsVerified(identity) {
  return Boolean(
    identity &&
    identity.review_status === "verified" &&
    clean(identity.ticketmaster_attraction_id) &&
    clean(identity.ticketmaster_artist_url)
  );
}

function describePublishingState(artist, identity) {
  return {
    indexing_status: artist?.indexing_status || null,
    indexable: artist?.indexing_status === "indexable_with_substantial_content",
    verified_provider_count: Number.isInteger(artist?.verified_provider_count) ? artist.verified_provider_count : null,
    verified_providers: Array.isArray(artist?.verified_providers) ? artist.verified_providers : [],
    artist_last_verified_at: artist?.last_verified_at || null,
    provider_identity_review_status: identity?.review_status || null
  };
}

function inspectProviderIdentity({ slug, artist, identity }) {
  const registryEntryPresent = hasRegistryEntry(identity);
  const providerIdentityPresent = identityExists(identity);
  const tmAttractionStatus = providerIdStatus(identity?.ticketmaster_attraction_id);
  const tmVerified = ticketmasterIdentityAppearsVerified(identity);
  const tmMissing = tmAttractionStatus === "missing";
  const sgStatus = seatgeekPerformerIdStatus(identity?.seatgeek_performer_id);

  const workflowStates = [];
  if (providerIdentityPresent) workflowStates.push("duplicate_or_existing");
  if (!providerIdentityPresent) workflowStates.push("not_configured");
  if (tmMissing || sgStatus === "missing") workflowStates.push("blocked");

  const blockedReasons = [];
  if (!registryEntryPresent) blockedReasons.push("no_local_provider_identity_registry_entry");
  if (tmMissing) blockedReasons.push("missing_ticketmaster_attraction_id_requires_human_browser_verification_or_later_gated_api_lookup");
  if (sgStatus === "missing") blockedReasons.push("missing_seatgeek_performer_id_not_auto_onboarded_artist_level_seatgeek_remains_event_level_first");

  return {
    artist_slug: slug,
    artist_name: artist?.name || null,
    artist_exists_locally: Boolean(artist),
    publishing_state: artist ? describePublishingState(artist, identity) : null,
    local_provider_identity_registry_entry: registryEntryPresent,
    identity_status: providerIdentityPresent ? "duplicate_or_existing" : "not_configured",
    workflow_statuses: workflowStates,
    blocked: blockedReasons.length > 0,
    blocked_reasons: blockedReasons,
    ticketmaster: {
      attraction_id_status: tmAttractionStatus,
      attraction_id: identity?.ticketmaster_attraction_id || null,
      artist_url_status: clean(identity?.ticketmaster_artist_url) ? "present" : "missing",
      artist_url: identity?.ticketmaster_artist_url || null,
      identity_appears_verified: tmVerified,
      review_status: identity?.review_status || null,
      sync_enabled: identity?.sync_enabled === true,
      last_synced_at: identity?.last_synced_at || null,
      status: clean(identity?.ticketmaster_attraction_id) ? "duplicate_or_existing" : "not_configured",
      action: clean(identity?.ticketmaster_attraction_id)
        ? "do_not_readd_existing_identity"
        : "blocked_until_human_browser_verification_or_later_gated_api_assisted_lookup"
    },
    seatgeek: {
      performer_id_status: sgStatus,
      performer_id: Number.isInteger(identity?.seatgeek_performer_id) ? identity.seatgeek_performer_id : null,
      status: Number.isInteger(identity?.seatgeek_performer_id) ? "duplicate_or_existing" : "not_configured",
      onboarding_status: "blocked/TODO",
      action: Number.isInteger(identity?.seatgeek_performer_id)
        ? "do_not_readd_existing_identity_artist_level_onboarding_still_not_automatic"
        : "blocked_artist_level_seatgeek_onboarding_requires_safe_documented_source_of_truth"
    },
    registry_notes_present: Boolean(clean(identity?.notes, 2048))
  };
}

function markdownEscape(value) {
  return clean(value, 2048).replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function renderMarkdown(report) {
  const lines = [];
  lines.push("# Growth Plan Report");
  lines.push("");
  lines.push(`Generated: ${report.generated_at}`);
  lines.push("");
  lines.push("## Safety decisions");
  for (const decision of report.safety_decisions) lines.push(`- ${decision}`);
  lines.push("");
  lines.push("## Provider identity summary");
  lines.push("");
  lines.push("Local inspection only. Missing provider identities remain blocked for human/browser verification or a later gated API-assisted phase; no IDs, URLs, events, prices, CTAs, or availability are invented.");
  lines.push("");
  lines.push("| Artist slug | Artist name | Local artist | Indexing status | Registry entry | Identity status | TM attraction ID | TM verified | Sync enabled | SeatGeek performer ID | Workflow statuses | Blocked reasons |");
  lines.push("|---|---|---|---|---|---|---|---|---|---|---|---|");
  for (const item of report.provider_identity.inspected_artists) {
    const row = [
      markdownEscape(item.artist_slug),
      markdownEscape(item.artist_name || ""),
      item.artist_exists_locally ? "yes" : "no",
      markdownEscape(item.publishing_state?.indexing_status || ""),
      item.local_provider_identity_registry_entry ? "yes" : "no",
      item.identity_status,
      item.ticketmaster.attraction_id_status,
      item.ticketmaster.identity_appears_verified ? "yes" : "no",
      item.ticketmaster.sync_enabled ? "yes" : "no",
      item.seatgeek.performer_id_status,
      markdownEscape(item.workflow_statuses.join(", ")),
      markdownEscape(item.blocked_reasons.join(", "))
    ];
    lines.push(`| ${row.join(" | ")} |`);
  }
  lines.push("");
  lines.push("## Provider identity details");
  lines.push("");
  for (const item of report.provider_identity.inspected_artists) {
    lines.push(`### ${item.artist_slug}`);
    lines.push(`- Artist name: ${item.artist_name || "unknown"}`);
    lines.push(`- Artist exists locally: ${item.artist_exists_locally ? "yes" : "no"}`);
    lines.push(`- Publishing/indexable state: ${item.publishing_state?.indexing_status || "unknown"}`);
    lines.push(`- Provider identity registry entry: ${item.local_provider_identity_registry_entry ? "present" : "missing"}`);
    lines.push(`- Overall identity status: ${item.identity_status}`);
    lines.push(`- Ticketmaster attraction ID: ${item.ticketmaster.attraction_id_status}`);
    lines.push(`- Ticketmaster identity appears verified: ${item.ticketmaster.identity_appears_verified ? "yes" : "no"}`);
    lines.push(`- Ticketmaster sync enabled: ${item.ticketmaster.sync_enabled ? "yes" : "no"}`);
    lines.push(`- SeatGeek performer ID: ${item.seatgeek.performer_id_status}`);
    lines.push(`- SeatGeek artist-level onboarding: ${item.seatgeek.onboarding_status} (${item.seatgeek.action})`);
    if (item.blocked_reasons.length) lines.push(`- Blocked reasons: ${item.blocked_reasons.join(", ")}`);
    lines.push("");
  }
  return `${lines.join("\n")}\n`;
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    console.log(usage());
    return;
  }

  const [artistsSource, providerIdentitiesSource] = await Promise.all([
    readJsonIfPresent(DEFAULT_ARTISTS_PATH, []),
    readJsonIfPresent(DEFAULT_PROVIDER_IDENTITIES_PATH, { artists: [] })
  ]);
  const artists = artistsSource.value;
  const providerIdentities = providerIdentitiesSource.value;

  if (!Array.isArray(artists)) throw new Error("public/data/artists.json must be an array");
  if (!Array.isArray(providerIdentities.artists)) throw new Error("data/provider-identities.json must contain an artists array");

  const artistBySlug = new Map(artists.map((artist) => [slugify(artist.slug), artist]));
  const identityBySlug = new Map(providerIdentities.artists.map((entry) => [slugify(entry.slug), entry]));
  const slugsToInspect = options.artist
    ? [options.artist]
    : [...new Set([...artistBySlug.keys(), ...identityBySlug.keys()])].sort((a, b) => a.localeCompare(b));

  const inspectedArtists = slugsToInspect.map((slug) => inspectProviderIdentity({
    slug,
    artist: artistBySlug.get(slug) || null,
    identity: identityBySlug.get(slug) || null
  }));

  if (options.artist && !artistBySlug.has(options.artist) && !identityBySlug.has(options.artist)) {
    throw new Error(`No local artist or provider identity registry entry found for --artist ${options.artist}`);
  }

  const report = {
    generated_at: new Date().toISOString(),
    dry_run: true,
    options: {
      artist: options.artist || null,
      no_api: options.noApi,
      dry_run: options.dryRun
    },
    sources: {
      artists: path.relative(REPO_ROOT, DEFAULT_ARTISTS_PATH),
      provider_identities: path.relative(REPO_ROOT, DEFAULT_PROVIDER_IDENTITIES_PATH)
    },
    safety_decisions: [
      "Report-only workflow: no production artist, event, provider identity, CTA, affiliate, or pricing files are written.",
      "Local artist and provider identity registry inspection is allowed.",
      "External provider API lookup and scraping are not part of this pipeline.",
      "Missing provider identities are blocked until human/browser verification or a later gated API-assisted phase.",
      "SeatGeek remains event-level-first; artist-level SeatGeek onboarding is not automatic."
    ],
    provider_identity: {
      source_available: providerIdentitiesSource.available,
      artist_source_available: artistsSource.available,
      inspected_count: inspectedArtists.length,
      inspected_artists: inspectedArtists
    }
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

  console.log(`Wrote growth plan JSON: ${path.relative(REPO_ROOT, paths.jsonPath)}`);
  console.log(`Wrote growth plan Markdown: ${path.relative(REPO_ROOT, paths.markdownPath)}`);
  console.log(`Updated latest JSON copy: ${path.relative(REPO_ROOT, paths.latestJsonPath)}`);
  console.log(`Updated latest Markdown copy: ${path.relative(REPO_ROOT, paths.latestMarkdownPath)}`);
  console.log(`Provider identity artists inspected: ${report.provider_identity.inspected_count}`);
}

main().catch((error) => {
  console.error(`FAIL: ${error.message}`);
  process.exit(1);
});
