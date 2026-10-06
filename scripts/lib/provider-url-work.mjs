// Fixed SeatGeek maintenance contract. Issue text supplies identifiers only;
// current repository records and the existing API verifier supply the evidence.
import { isDeepStrictEqual } from "node:util";
import { eventInstantMs } from "./event-local-date.mjs";
import { isValidSeatGeekEventUrl } from "../verify-seatgeek-events.mjs";

export const PROVIDER_URL_SOURCE = "provider-url-coverage";
export const PROVIDER_URL_TYPE = "event_needs_provider_url";
export const PROVIDER_URL_BATCH_SIZE = 20;
export const PROVIDER_URL_VALIDATION = [
  "npm run events:validate:prod", "npm run events:validate:partitions",
  "npm run test:providers", "npm run test:mvp"
];
export const RESALE_PROVIDERS = ["seatgeek", "vivid-seats", "ticketnetwork", "ticketliquidator", "stubhub-international"];
const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const eventIdPattern = /^[a-zA-Z0-9][a-zA-Z0-9_.-]{0,249}$/;
export const hasVerifiedResale = (event) => RESALE_PROVIDERS.some((key) => event.provider_links?.[key]?.verified === true);
export function hasVerifiedSeatGeek(event) {
  const link = event.provider_links?.seatgeek;
  return link?.verified === true && isValidSeatGeekEventUrl(event.seatgeek_url) && link.url === event.seatgeek_url
    && String(link.event_id) === event.seatgeek_url.match(/\/(\d+)(?:[/?#]|$)/)?.[1];
}
export function needsProviderUrl(event, now = new Date()) {
  const instant = eventInstantMs(event);
  return instant !== null && instant >= now.getTime()
    && !["cancelled", "canceled", "postponed"].includes(event.ticketmaster_status_code)
    && !["cancelled", "canceled", "postponed"].includes(event.status)
    && !hasVerifiedSeatGeek(event);
}
export const verifiedIdentity = (entry) => entry?.review_status === "verified"
  && Number.isSafeInteger(entry.seatgeek_performer_id) && entry.seatgeek_performer_id > 0;

export function buildProviderUrlReport(events, registry, now = new Date()) {
  if (!Array.isArray(events) || !Array.isArray(registry?.artists) || !Number.isFinite(now.getTime())) {
    throw new Error("Provider URL sensor requires complete event and registry arrays and a valid clock");
  }
  const identities = new Map(registry.artists.map((entry) => [entry.slug, entry]));
  const groups = new Map();
  const ids = new Set();
  for (const event of events) {
    if (!eventIdPattern.test(event.id) || !slugPattern.test(event.artist_slug) || ids.has(event.id)) {
      throw new Error("Invalid or duplicate event identity; refusing an incomplete coverage report");
    }
    ids.add(event.id);
    if (!needsProviderUrl(event, now)) continue;
    if (!groups.has(event.artist_slug)) groups.set(event.artist_slug, []);
    groups.get(event.artist_slug).push(event);
  }
  const batches = [];
  for (const [artist, rows] of [...groups].sort(([a], [b]) => a.localeCompare(b))) {
    // Stable order independent of input order. Fingerprints include exact IDs,
    // so a subsequent remainder is new work rather than an old branch collision.
    rows.sort((a, b) => a.id.localeCompare(b.id));
    for (let at = 0; at < rows.length; at += PROVIDER_URL_BATCH_SIZE) {
      const batch = rows.slice(at, at + PROVIDER_URL_BATCH_SIZE);
      const identity = identities.get(artist);
      batches.push({
        artist_slug: artist, provider: "seatgeek", event_ids: batch.map((event) => event.id),
        performer_id: verifiedIdentity(identity) ? identity.seatgeek_performer_id : null,
        no_verified_resale: batch.filter((event) => !hasVerifiedResale(event)).length,
        eligible: verifiedIdentity(identity),
        blocked_reason: verifiedIdentity(identity) ? null : "Missing registry-verified SeatGeek performer ID"
      });
    }
  }
  batches.sort((a, b) => b.no_verified_resale - a.no_verified_resale || a.artist_slug.localeCompare(b.artist_slug)
    || a.event_ids[0].localeCompare(b.event_ids[0]));
  const upcoming = events.filter((event) => { const ms = eventInstantMs(event); return ms !== null && ms >= now.getTime(); });
  return {
    schema_version: 1, source: PROVIDER_URL_SOURCE, complete: true, generated_at: now.toISOString(),
    summary: {
      events: events.length, needs_recheck: events.filter((event) => event.verification_status === "needs_recheck").length,
      blank_tour_labels: events.filter((event) => !String(event.tour_name ?? "").trim()).length,
      upcoming_no_verified_resale: upcoming.filter((event) => !hasVerifiedResale(event)).length,
      upcoming_recheck_no_verified_resale: upcoming.filter((event) => event.verification_status === "needs_recheck" && !hasVerifiedResale(event)).length,
      upcoming_provider_url_gaps: [...groups.values()].reduce((n, rows) => n + rows.length, 0),
      eligible_batches: batches.filter((batch) => batch.eligible).length, blocked_batches: batches.filter((batch) => !batch.eligible).length
    }, batches
  };
}

export function providerUrlIdentity(evidence) {
  return [evidence.artist_slug, "seatgeek", ...evidence.event_ids].sort();
}

export function validProviderUrlEvidence(evidence) {
  return evidence?.provider === "seatgeek" && typeof evidence.artist_slug === "string" && slugPattern.test(evidence.artist_slug)
    && Array.isArray(evidence.event_ids) && evidence.event_ids.length > 0 && evidence.event_ids.length <= PROVIDER_URL_BATCH_SIZE
    && evidence.event_ids.every((id) => typeof id === "string" && eventIdPattern.test(id))
    && new Set(evidence.event_ids).size === evidence.event_ids.length
    && Number.isSafeInteger(evidence.performer_id) && evidence.performer_id > 0;
}

export function currentProviderUrlBatch(plan, events, registry, now = new Date()) {
  const entry = registry.artists.find((artist) => artist.slug === plan.artistSlug);
  if (!verifiedIdentity(entry) || entry.seatgeek_performer_id !== plan.performerId) {
    return { ok: false, reason: "Registry identity is missing, unverified or changed since the sensor ran" };
  }
  const selected = [];
  for (const id of plan.eventIds) {
    const rows = events.filter((event) => event.id === id);
    if (rows.length !== 1 || rows[0].artist_slug !== plan.artistSlug) {
      return { ok: false, reason: `Event ${id} no longer has the unique artist identity reported by the sensor` };
    }
    if (needsProviderUrl(rows[0], now)) selected.push(rows[0]);
  }
  return { ok: true, events: selected };
}

const withoutSeatGeek = (event) => {
  const rest = structuredClone(event);
  delete rest.seatgeek_url;
  if (rest.provider_links) {
    delete rest.provider_links.seatgeek;
    if (!Object.keys(rest.provider_links).length) delete rest.provider_links;
  }
  return rest;
};

// Field-level boundary in addition to the file allowlist: no new/deleted or
// reordered events, no other provider, no tour name or Ticketmaster status flip.
export function verifyProviderUrlChanges(before, after, plan, results) {
  const reject = (reason) => ({ ok: false, reason, changedIds: [] });
  if (!Array.isArray(before) || !Array.isArray(after) || before.length !== after.length) return reject("Event rows added or removed");
  const changedIds = [];
  for (let i = 0; i < before.length; i += 1) {
    const original = before[i], updated = after[i];
    if (isDeepStrictEqual(original, updated)) continue;
    if (original.id !== updated.id || !plan.eventIds.includes(original.id) || updated.artist_slug !== plan.artistSlug
      || !isDeepStrictEqual(withoutSeatGeek(original), withoutSeatGeek(updated))) return reject("Change outside the batch's SeatGeek fields");
    const result = results.find((row) => row.showId === original.id && row.applied === true
      && ["add", "verify", "correct"].includes(row.action));
    const link = updated.provider_links?.seatgeek;
    if (!result || !hasVerifiedSeatGeek(updated) || result.url !== updated.seatgeek_url
      || String(result.seatgeekId) !== String(link.event_id) || link.availability_status !== "listed"
      || !/^\d{4}-\d{2}-\d{2}$/.test(link.last_verified_at ?? "")) return reject("Change lacks successful exact-event verifier evidence");
    const expectedLink = { ...original.provider_links?.seatgeek, event_id: result.seatgeekId,
      url: result.url, verified: true, last_verified_at: link.last_verified_at, availability_status: "listed" };
    if (!isDeepStrictEqual(link, expectedLink)) return reject("Unexpected SeatGeek provenance fields");
    changedIds.push(original.id);
  }
  return { ok: true, reason: null, changedIds };
}

export const EVENT_SHARD_PATH = "public/data/events/_shards";

export function providerUrlPaths(artistSlug) {
  if (!slugPattern.test(artistSlug)) throw new Error("Invalid artist slug");
  // The verifier also rewrites events.json's shards (scripts/lib/event-shards.mjs).
  return ["public/data/events.json", `public/data/events/${artistSlug}.json`, EVENT_SHARD_PATH, "PROJECT_STATUS.md"];
}

export function verifierArgs(plan, eventIds) {
  if (!eventIds.length || eventIds.length > PROVIDER_URL_BATCH_SIZE || eventIds.some((id) => !plan.eventIds.includes(id))) {
    throw new Error("Invalid verifier batch");
  }
  return ["scripts/verify-seatgeek-events.mjs", "--apply", "--add-only", "--json", "--artist", plan.artistSlug,
    "--max-api-calls", String(PROVIDER_URL_BATCH_SIZE * 2), "--log-path", ".audit/provider-url-repair.md",
    ...eventIds.flatMap((id) => ["--event-id", id])];
}
