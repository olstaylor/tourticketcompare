#!/usr/bin/env node
/**
 * growth-pipeline.mjs
 *
 * Report-only growth planning shell. This script reads local repository data and
 * writes human-review artifacts under .audit/. The optional Ticketmaster event
 * scope may delegate to the existing dry-run sync script unless --no-api is set.
 * It never mutates production data, scrapes, or changes CTA/affiliate routing.
 */

import { spawn } from "node:child_process";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");

const DEFAULT_ARTISTS_PATH = path.join(REPO_ROOT, "public", "data", "artists.json");
const DEFAULT_PROVIDER_IDENTITIES_PATH = path.join(REPO_ROOT, "data", "provider-identities.json");
const DEFAULT_AUDIT_DIR = path.join(REPO_ROOT, ".audit");
const TICKETMASTER_SYNC_SCRIPT = path.join(REPO_ROOT, "scripts", "sync-ticketmaster-events.py");
const VALID_SCOPES = new Set(["provider-identities", "ticketmaster-events", "all"]);

function usage() {
  return `Usage: node scripts/growth-pipeline.mjs [options]\n\nReport-only growth planning pipeline. Reads local artist data and the local provider identity registry, then writes JSON + Markdown reports under .audit/. It never mutates production data, scrapes, applies provider identities, creates events, publishes, changes CTAs, or displays prices.\n\nOptions:\n  --artist <slug>       Restrict report to one artist slug\n  --all                 Inspect all local artists/provider identities (default when --artist is omitted)\n  --scope <scope>       provider-identities, ticketmaster-events, or all (default: provider-identities)\n  --audit-dir <path>    Output directory (default: .audit)\n  --json <path>         Explicit timestamped JSON report path\n  --markdown <path>     Explicit timestamped Markdown report path\n  --no-api              Do not call external APIs; API-backed phases are skipped/report-only\n  --dry-run             Accepted for clarity; report-only is the only mode\n  -h, --help            Show this help\n\nEnvironment:\n  TTC_REPORT_TIMESTAMP  Optional ISO-ish timestamp override for deterministic report names\n`;
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
    all: false,
    scope: "provider-identities",
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
    } else if (arg === "--all") {
      options.all = true;
    } else if (arg === "--scope") {
      const value = argv[++i];
      if (!value || value.startsWith("--")) throw new Error("--scope requires a value");
      options.scope = clean(value, 80);
      if (!VALID_SCOPES.has(options.scope)) {
        throw new Error(`--scope must be one of: ${[...VALID_SCOPES].join(", ")}`);
      }
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

  if (options.artist && options.all) throw new Error("Use either --artist or --all, not both");

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


function scopeIncludes(options, scope) {
  return options.scope === "all" || options.scope === scope;
}

function histogramFromArtists(artists, field) {
  const totals = {};
  for (const artist of artists) {
    const counts = artist?.[field] || {};
    for (const [reason, count] of Object.entries(counts)) {
      totals[reason] = (totals[reason] || 0) + Number(count || 0);
    }
  }
  return Object.fromEntries(Object.entries(totals).sort(([a], [b]) => a.localeCompare(b)));
}

function actionStatusForTicketmasterArtist(report) {
  if (!report) return "not_configured";
  if (!report.eligible) return "human_review_only";
  if (report.live_lookup !== "ok") return "report_only";
  if (report.proposed > 0) return "human_review_only";
  return "no_pr_ready_action";
}

function baseTicketmasterEventReport({ options, inspectedArtists }) {
  const artists = inspectedArtists.map((item) => ({
    artist_slug: item.artist_slug,
    artist_name: item.artist_name,
    phase_status: options.noApi ? "skipped_no_api" : "not_configured",
    sync_eligible: false,
    verified_attraction_id_status: item.ticketmaster.attraction_id_status,
    verified_attraction_id: item.ticketmaster.attraction_id,
    sync_enabled_status: item.ticketmaster.sync_enabled ? "enabled" : "disabled_or_missing",
    existing_events_in_repo: null,
    live_lookup: options.noApi ? "skipped_no_api" : "not_run",
    recognised_existing_events: 0,
    proposed_events: 0,
    withheld_events: 0,
    blocker_reason_histogram: {},
    withhold_reason_histogram: {},
    warnings: options.noApi
      ? ["--no-api was supplied; Ticketmaster Discovery dry-run sync was not invoked."]
      : [],
    blockers: options.noApi
      ? ["api_disabled_by_growth_plan_no_api"]
      : ["ticketmaster_sync_not_invoked"],
    action_readiness: "report_only",
    rows: []
  }));

  return {
    phase: "ticketmaster-events",
    dry_run_summary_only: true,
    source_of_truth: path.relative(REPO_ROOT, TICKETMASTER_SYNC_SCRIPT),
    invoked_sync_script: false,
    invocation_status: options.noApi ? "skipped_no_api" : "not_configured",
    external_api_calls_allowed: !options.noApi,
    notes: options.noApi
      ? ["Skipped by --no-api; no external Ticketmaster API call was attempted."]
      : [],
    artist_count: artists.length,
    artists,
    totals: {
      eligible: artists.filter((artist) => artist.sync_eligible).length,
      recognised_existing_events: 0,
      proposed_events: 0,
      withheld_events: 0,
      blocker_reason_histogram: histogramFromArtists(artists, "blocker_reason_histogram"),
      withhold_reason_histogram: histogramFromArtists(artists, "withhold_reason_histogram")
    }
  };
}

function runCommand(command, args, { env } = {}) {
  return new Promise((resolve) => {
    const child = spawn(command, args, {
      cwd: REPO_ROOT,
      env: env || process.env,
      stdio: ["ignore", "pipe", "pipe"]
    });
    let stdout = "";
    let stderr = "";
    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");
    child.stdout.on("data", (chunk) => { stdout += chunk; });
    child.stderr.on("data", (chunk) => { stderr += chunk; });
    child.on("error", (error) => resolve({ status: "spawn_error", code: null, stdout, stderr, error }));
    child.on("close", (code) => resolve({ status: "closed", code, stdout, stderr, error: null }));
  });
}

function normalizeTicketmasterSyncOutput({ raw, inspectedArtists }) {
  const inspectedBySlug = new Map(inspectedArtists.map((item) => [item.artist_slug, item]));
  const rawArtists = Array.isArray(raw?.artists) ? raw.artists : [];
  const artists = rawArtists.map((artist) => {
    const inspected = inspectedBySlug.get(slugify(artist.artist_slug)) || null;
    const blockers = Array.isArray(artist.eligibility_blockers) ? artist.eligibility_blockers : [];
    const warnings = Array.isArray(artist.warnings) ? artist.warnings : [];
    const phaseStatus = artist.eligible
      ? (artist.live_lookup === "ok" ? "report_only" : "not_configured")
      : "blocked";
    return {
      artist_slug: artist.artist_slug,
      artist_name: inspected?.artist_name || null,
      phase_status: phaseStatus,
      sync_eligible: Boolean(artist.eligible),
      verified_attraction_id_status: clean(artist.attraction_id) ? "present" : (inspected?.ticketmaster.attraction_id_status || "missing"),
      verified_attraction_id: artist.attraction_id || inspected?.ticketmaster.attraction_id || null,
      ticketmaster_artist_url: artist.ticketmaster_artist_url || inspected?.ticketmaster.artist_url || null,
      sync_enabled_status: inspected?.ticketmaster.sync_enabled ? "enabled" : "disabled_or_missing",
      existing_events_in_repo: Number.isInteger(artist.existing_events_in_repo) ? artist.existing_events_in_repo : null,
      live_lookup: artist.live_lookup || "unknown",
      recognised_existing_events: Number(artist.recognised || 0),
      proposed_events: Number(artist.proposed || 0),
      withheld_events: Number(artist.withheld || 0),
      blocker_reason_histogram: Object.fromEntries(blockers.map((reason) => [reason, 1])),
      withhold_reason_histogram: artist.withheld_reason_counts || {},
      warnings,
      blockers,
      action_readiness: actionStatusForTicketmasterArtist(artist),
      rows: Array.isArray(artist.rows) ? artist.rows.map((row) => ({
        event_id: row.event_id || null,
        event_name: row.event_name || null,
        datetime_iso: row.datetime_iso || null,
        venue: row.venue || null,
        city: row.city || null,
        country: row.country || null,
        disposition: row.disposition || null,
        withheld_reasons: Array.isArray(row.withheld_reasons) ? row.withheld_reasons : []
      })) : []
    };
  });

  return {
    live_lookup_available: Boolean(raw?.live_lookup_available),
    artists,
    totals: {
      eligible: artists.filter((artist) => artist.sync_eligible).length,
      recognised_existing_events: artists.reduce((sum, artist) => sum + artist.recognised_existing_events, 0),
      proposed_events: artists.reduce((sum, artist) => sum + artist.proposed_events, 0),
      withheld_events: artists.reduce((sum, artist) => sum + artist.withheld_events, 0),
      blocker_reason_histogram: histogramFromArtists(artists, "blocker_reason_histogram"),
      withhold_reason_histogram: histogramFromArtists(artists, "withhold_reason_histogram")
    }
  };
}

async function buildTicketmasterEventReport({ options, inspectedArtists }) {
  const report = baseTicketmasterEventReport({ options, inspectedArtists });
  if (options.noApi) return report;

  try {
    await fs.access(TICKETMASTER_SYNC_SCRIPT);
  } catch (error) {
    report.invocation_status = "not_configured";
    report.notes.push(`Lower-level Ticketmaster sync script unavailable: ${error.message}`);
    for (const artist of report.artists) {
      artist.phase_status = "not_configured";
      artist.blockers = ["ticketmaster_sync_script_missing_or_unavailable"];
      artist.blocker_reason_histogram = { ticketmaster_sync_script_missing_or_unavailable: 1 };
    }
    report.totals.blocker_reason_histogram = histogramFromArtists(report.artists, "blocker_reason_histogram");
    return report;
  }

  const args = [path.relative(REPO_ROOT, TICKETMASTER_SYNC_SCRIPT)];
  if (options.artist) args.push("--artist", options.artist);
  else args.push("--all-approved");
  args.push("--dry-run", "--json");

  const result = await runCommand("python3", args);
  report.invoked_sync_script = true;
  report.invocation = {
    command: `python3 ${args.join(" ")}`,
    exit_code: result.code,
    stderr: clean(result.stderr, 4000)
  };

  if (result.status === "spawn_error") {
    report.invocation_status = "not_configured";
    report.notes.push(`Could not start lower-level Ticketmaster sync script: ${result.error?.message || "unknown error"}`);
    return report;
  }

  if (result.code !== 0) {
    report.invocation_status = "blocked";
    report.notes.push("Lower-level Ticketmaster sync script did not complete successfully; growth plan recorded a blocked report instead of failing.");
    const reason = clean(result.stderr || result.stdout || `sync script exited ${result.code}`, 4000);
    for (const artist of report.artists) {
      artist.phase_status = "blocked";
      artist.blockers = [reason || "ticketmaster_sync_script_failed"];
      artist.blocker_reason_histogram = { [reason || "ticketmaster_sync_script_failed"]: 1 };
      artist.action_readiness = "human_review_only";
    }
    report.totals.blocker_reason_histogram = histogramFromArtists(report.artists, "blocker_reason_histogram");
    return report;
  }

  let raw;
  try {
    raw = JSON.parse(result.stdout);
  } catch (error) {
    report.invocation_status = "blocked";
    report.notes.push(`Lower-level Ticketmaster sync script did not return JSON: ${error.message}`);
    return report;
  }

  const normalized = normalizeTicketmasterSyncOutput({ raw, inspectedArtists });
  report.invocation_status = "completed";
  report.live_lookup_available = normalized.live_lookup_available;
  report.artists = normalized.artists;
  report.artist_count = normalized.artists.length;
  report.totals = normalized.totals;
  if (!normalized.live_lookup_available) {
    report.invocation_status = "not_configured";
    report.notes.push("TICKETMASTER_API_KEY was not available to the lower-level sync script; live lookup was skipped.");
  }
  return report;
}

function markdownEscape(value) {
  return clean(value, 2048).replace(/\|/g, "\\|").replace(/\n/g, " ");
}

function formatHistogram(histogram) {
  const entries = Object.entries(histogram || {});
  if (!entries.length) return "none";
  return entries.map(([reason, count]) => `${count}x ${reason}`).join(", ");
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

  if (report.ticketmaster_events) {
    const tm = report.ticketmaster_events;
    lines.push("## Ticketmaster event dry-run summary");
    lines.push("");
    lines.push("Dry-run summary only. The lower-level Ticketmaster sync script remains the source of truth for eligibility, API lookup, and withhold rules; this growth report does not apply proposed events or write production data.");
    lines.push("");
    lines.push(`- Phase status: ${tm.invocation_status}`);
    lines.push(`- Sync script invoked: ${tm.invoked_sync_script ? "yes" : "no"}`);
    lines.push(`- External API calls allowed for this run: ${tm.external_api_calls_allowed ? "yes" : "no"}`);
    lines.push(`- Artist count: ${tm.artist_count}`);
    lines.push(`- Eligible artists: ${tm.totals.eligible}`);
    lines.push(`- Recognised existing events: ${tm.totals.recognised_existing_events}`);
    lines.push(`- Proposed events: ${tm.totals.proposed_events}`);
    lines.push(`- Withheld events: ${tm.totals.withheld_events}`);
    lines.push(`- Blocker histogram: ${formatHistogram(tm.totals.blocker_reason_histogram)}`);
    lines.push(`- Withhold histogram: ${formatHistogram(tm.totals.withhold_reason_histogram)}`);
    for (const note of tm.notes || []) lines.push(`- Note: ${markdownEscape(note)}`);
    lines.push("");
    lines.push("| Artist slug | Eligible | Attraction ID | Sync enabled | Live lookup | Existing events | Recognised | Proposed | Withheld | Action readiness | Blockers | Withhold reasons |");
    lines.push("|---|---|---|---|---|---|---|---|---|---|---|---|");
    for (const artist of tm.artists) {
      const row = [
        markdownEscape(artist.artist_slug),
        artist.sync_eligible ? "yes" : "no",
        markdownEscape(artist.verified_attraction_id_status),
        markdownEscape(artist.sync_enabled_status),
        markdownEscape(artist.live_lookup),
        artist.existing_events_in_repo ?? "unknown",
        artist.recognised_existing_events,
        artist.proposed_events,
        artist.withheld_events,
        markdownEscape(artist.action_readiness),
        markdownEscape(formatHistogram(artist.blocker_reason_histogram)),
        markdownEscape(formatHistogram(artist.withhold_reason_histogram))
      ];
      lines.push(`| ${row.join(" | ")} |`);
    }
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

  const ticketmasterEvents = scopeIncludes(options, "ticketmaster-events")
    ? await buildTicketmasterEventReport({ options, inspectedArtists })
    : null;

  const report = {
    generated_at: new Date().toISOString(),
    dry_run: true,
    options: {
      artist: options.artist || null,
      all: options.all || !options.artist,
      scope: options.scope,
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
      "Ticketmaster event sync, when requested, delegates to the existing dry-run sync script and only normalizes its report.",
      "The growth pipeline never applies proposed Ticketmaster events or creates write-to-PR mode.",
      "Scraping, price display changes, publishing, and CTA changes are not part of this pipeline.",
      "Missing provider identities are blocked until human/browser verification or a later gated API-assisted phase.",
      "SeatGeek remains event-level-first; artist-level SeatGeek onboarding is not automatic."
    ],
    provider_identity: {
      source_available: providerIdentitiesSource.available,
      artist_source_available: artistsSource.available,
      inspected_count: inspectedArtists.length,
      inspected_artists: inspectedArtists
    },
    ticketmaster_events: ticketmasterEvents
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
  if (report.ticketmaster_events) {
    console.log(`Ticketmaster event phase: ${report.ticketmaster_events.invocation_status}`);
    console.log(`Ticketmaster proposed/withheld: ${report.ticketmaster_events.totals.proposed_events}/${report.ticketmaster_events.totals.withheld_events}`);
  }
}

main().catch((error) => {
  console.error(`FAIL: ${error.message}`);
  process.exit(1);
});
