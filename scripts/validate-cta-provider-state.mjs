#!/usr/bin/env node
//
// validate-cta-provider-state.mjs
//
// Provider-sync sequence step 5: assert that CTA eligibility is DERIVED FROM
// verified provider state, and that published state is internally consistent so
// the runtime gates render exactly the verified state — nothing more.
//
// This is a READ-ONLY validator. It changes no runtime behaviour and modifies
// no files. The runtime CTA gates stay the single source of truth:
//   - artist-level CTAs dispatch via VERIFIED_TICKET_LINKS in functions/api/out.js,
//   - event-level CTAs/redirects gate on eventLinkPublishable + the URL checks in
//     functions/api/out.js / functions/[[path]].js / public/app.js.
// VERIFIED_TICKET_LINKS and /api/out are unchanged by this step (and by this
// script). What this adds is a guard that the data behind those gates is
// consistent with the verified provider state recorded in the registry and the
// per-event destination/provenance fields.
//
// Hard errors (exit 1):
//   1. Every "<slug>:ticketmaster" key in VERIFIED_TICKET_LINKS is backed by a
//      provider-identity registry entry with review_status "verified" and a
//      populated ticketmaster_attraction_id (the published artist CTA derives
//      from a verified provider identity).
//   2. No registry entry with review_status "withheld" appears in
//      VERIFIED_TICKET_LINKS (a withheld identity must not publish a CTA).
//   3. Every publishable event (eventLinkPublishable === true) has a
//      ticketmaster_url that /api/out can actually redirect: https, an
//      allowlisted Ticketmaster destination host (parsed from out.js), and the
//      event's ticketmaster_event_id present in the URL. (A CTA the gate
//      green-lights must resolve.)
//   4. Every machine_high_confidence event satisfies the full canonical
//      contract that status name promises: canonical long-form storefront URL
//      (slug segment before /event/<id>), id present, full datetime, venue and
//      city. (Machine approval must match its own definition.)
//   5. Every event with provider_links.seatgeek.verified === true (the flag
//      that lets a SeatGeek CTA publish standalone on a needs_recheck event)
//      has a top-level seatgeek_url that /api/out can redirect (event-URL
//      shape), a provider_links.seatgeek.url matching it exactly, and an
//      ISO-dated last_verified_at. (Verified SeatGeek provenance must resolve.)
//
// Informational (reported, never fails): events that store a seatgeek_url while
// neither the Ticketmaster link nor verified SeatGeek provenance makes it
// publishable (the SeatGeek CTA is correctly suppressed), events publishing a
// SeatGeek-only CTA on verified provenance, and per-status / per-artist counts.
//
// Usage:
//   node scripts/validate-cta-provider-state.mjs            (human report; exit 1 on drift)
//   node scripts/validate-cta-provider-state.mjs --json     (machine-readable)
//   node scripts/validate-cta-provider-state.mjs --self-test (offline invariant tests)

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = path.resolve(__dirname, "..");
const EVENTS_PATH = path.join(REPO_ROOT, "public", "data", "events.json");
const REGISTRY_PATH = path.join(REPO_ROOT, "data", "provider-identities.json");
const OUT_JS_PATH = path.join(REPO_ROOT, "functions", "api", "out.js");
const IMPACT_MARKETPLACE_PROVIDERS = [
  { slug: "ticketnetwork", name: "TicketNetwork", urlField: "ticketnetwork_url", allowedHosts: ["ticketnetwork.com"] },
  { slug: "ticket-liquidator", name: "Ticket Liquidator", urlField: "ticketliquidator_url", allowedHosts: ["ticketliquidator.com"] },
  {
    slug: "stubhub-international", name: "StubHub International", urlField: "stubhub_international_url",
    allowedHosts: [
      "stubhub.co.uk", "stubhub.ie", "stubhub.de", "stubhub.fr", "stubhub.es", "stubhub.it",
      "stubhub.pt", "stubhub.pl", "stubhub.se", "stubhub.dk", "stubhub.fi", "stubhub.gr",
      "stubhub.nl", "stubhub.lu", "stubhub.cz", "stubhub.be", "stubhub.co.at",
    ],
  },
];

// ─── Pure helpers (covered by --self-test) ──────────────────────────────────

function clean(value) {
  return String(value ?? "").trim();
}

// Faithful copy of eventLinkPublishable from functions/api/out.js /
// functions/[[path]].js / public/app.js. Keep in sync with those — this is the
// derivation under test, so it MUST match the runtime gate exactly.
function eventLinkPublishable(event) {
  const destination = clean(event?.ticketmaster_url || event?.source_url);
  if (destination) return true;
  return event?.provider_links?.ticketmaster?.verified === true;
}

function hostAllowed(hostname, allowedHosts) {
  const host = clean(hostname).toLowerCase();
  return allowedHosts.some((allowed) => host === allowed || host.endsWith(`.${allowed}`));
}

// The redirect-level invariant /api/out enforces: https, allowlisted host, and
// the event id present in the URL. Returns "" when ok, else a reason.
function ticketmasterRedirectIssue(event, allowedHosts) {
  const url = clean(event?.ticketmaster_url);
  if (!url) return "no ticketmaster_url";
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return "ticketmaster_url is not a valid URL";
  }
  if (parsed.protocol !== "https:") return "ticketmaster_url is not https";
  if (!hostAllowed(parsed.hostname, allowedHosts)) return `ticketmaster_url host '${parsed.hostname}' not in the out.js allowlist`;
  const id = clean(event?.ticketmaster_event_id).toLowerCase();
  if (!id) return "ticketmaster_event_id is empty";
  if (!url.toLowerCase().includes(id)) return "ticketmaster_url does not contain ticketmaster_event_id";
  return "";
}

// The redirect-level invariant /api/out enforces for a SeatGeek event CTA
// (mirrors validateSeatGeekEventUrl in functions/api/out.js). Returns "" when
// ok, else a reason.
function seatGeekUrlShapeIssue(url) {
  if (!url) return "no seatgeek_url";
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return "seatgeek_url is not a valid URL";
  }
  if (parsed.protocol !== "https:") return "seatgeek_url is not https";
  const host = parsed.hostname.toLowerCase();
  if (host !== "seatgeek.com" && host !== "www.seatgeek.com") return `seatgeek_url host '${parsed.hostname}' is not seatgeek.com`;
  const path = decodeURIComponent(parsed.pathname || "/").replace(/\/+$/, "");
  if (!path || path === "/") return "seatgeek_url is the SeatGeek homepage";
  if (/^\/(search|venues?|performers?|artists?|concert-tickets|tickets)(?:\/|$)/i.test(path)) return "seatgeek_url is a generic search/artist/venue URL";
  if (!/\/(concert|sports|theater|theatre)\/\d+$/i.test(path)) return "seatgeek_url does not end in /<category>/<numeric id>";
  return "";
}

// The verified-SeatGeek-provenance contract behind providerEventPublishable's
// standalone SeatGeek path. Returns "" when ok, else a reason.
function seatgeekVerifiedIssue(event) {
  const link = event?.provider_links?.seatgeek;
  if (link?.verified !== true) return "";
  const topUrl = clean(event?.seatgeek_url);
  const shapeIssue = seatGeekUrlShapeIssue(topUrl);
  if (shapeIssue) return shapeIssue;
  if (clean(link.url) !== topUrl) return "provider_links.seatgeek.url does not match top-level seatgeek_url";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(clean(link.last_verified_at))) return "provider_links.seatgeek.last_verified_at is not an ISO date";
  return "";
}

// The redirect-level invariant /api/out enforces for a Vivid Seats event CTA
// (mirrors validateVividSeatsEventUrl in functions/api/out.js). Returns ""
// when ok, else a reason.
function vividSeatsUrlShapeIssue(url) {
  if (!url) return "no vividseats_url";
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return "vividseats_url is not a valid URL";
  }
  if (parsed.protocol !== "https:") return "vividseats_url is not https";
  const host = parsed.hostname.toLowerCase();
  if (host !== "vividseats.com" && host !== "www.vividseats.com") return `vividseats_url host '${parsed.hostname}' is not vividseats.com`;
  const path = decodeURIComponent(parsed.pathname || "/").replace(/\/+$/, "");
  if (!path || path === "/") return "vividseats_url is the Vivid Seats homepage";
  if (/^\/(search|venues?|performers?|artists?|category|concerts?|sports?|theater|theatre)(?:\/|$)/i.test(path)) return "vividseats_url is a generic search/artist/venue URL";
  if (!/\/production\/\d+$/i.test(path)) return "vividseats_url does not end in /production/<numeric id>";
  return "";
}

// The verified-Vivid-Seats-provenance contract behind providerEventPublishable's
// standalone Vivid Seats path (mirrors seatgeekVerifiedIssue). Returns "" when
// ok, else a reason.
function vividseatsVerifiedIssue(event) {
  const link = event?.provider_links?.["vivid-seats"];
  if (link?.verified !== true) return "";
  const topUrl = clean(event?.vividseats_url);
  const shapeIssue = vividSeatsUrlShapeIssue(topUrl);
  if (shapeIssue) return shapeIssue;
  if (clean(link.url) !== topUrl) return "provider_links.vivid-seats.url does not match top-level vividseats_url";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(clean(link.last_verified_at))) return "provider_links.vivid-seats.last_verified_at is not an ISO date";
  return "";
}

function impactMarketplaceUrlShapeIssue(url, provider) {
  if (!url) return `no ${provider.urlField}`;
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    return `${provider.urlField} is not a valid URL`;
  }
  if (parsed.protocol !== "https:") return `${provider.urlField} is not https`;
  if (!hostAllowed(parsed.hostname, provider.allowedHosts)) {
    return `${provider.urlField} host '${parsed.hostname}' is not allowlisted for ${provider.name}`;
  }
  const path = decodeURIComponent(parsed.pathname || "/").replace(/\/+$/, "");
  if (!path || path === "/") return `${provider.urlField} is the provider homepage`;
  if (/^\/(search|home|about|help|support|faq|contact|terms|privacy)(?:\/|$)/i.test(path)) {
    return `${provider.urlField} is a generic/support URL`;
  }
  return "";
}

function impactMarketplaceVerifiedIssue(event, provider) {
  const link = event?.provider_links?.[provider.slug];
  if (link?.verified !== true) return "";
  const topUrl = clean(event?.[provider.urlField]);
  const shapeIssue = impactMarketplaceUrlShapeIssue(topUrl, provider);
  if (shapeIssue) return shapeIssue;
  if (clean(link.url) !== topUrl) return `provider_links.${provider.slug}.url does not match top-level ${provider.urlField}`;
  if (!clean(link.event_id)) return `provider_links.${provider.slug}.event_id is empty`;
  if (!/^\d{4}-\d{2}-\d{2}$/.test(clean(link.last_verified_at))) {
    return `provider_links.${provider.slug}.last_verified_at is not an ISO date`;
  }
  return "";
}

// The full machine_high_confidence contract (mirrors classifyCandidateLink in
// scripts/apply-artists.mjs). Returns "" when ok, else a reason.
function machineHighConfidenceIssue(event, allowedHosts) {
  const redirectIssue = ticketmasterRedirectIssue(event, allowedHosts);
  if (redirectIssue) return redirectIssue;
  const url = clean(event?.ticketmaster_url);
  const parsed = new URL(url);
  const segments = parsed.pathname.split("/").filter(Boolean);
  const eventIndex = segments.indexOf("event");
  if (eventIndex === -1 || !segments[eventIndex + 1]) return "url has no /event/<id> segment";
  if (eventIndex === 0) return "short-form /event/<id> url (no storefront slug before /event)";
  if (!/T\d{2}:\d{2}/.test(clean(event?.datetime_iso))) return "datetime_iso has no exact time";
  if (!clean(event?.venue)) return "missing venue";
  if (!clean(event?.city)) return "missing city";
  return "";
}

// Parse PROVIDERS.ticketmaster.allowedDestinationHosts from out.js (read-only;
// out.js stays the single source of truth, mirroring the python recogniser).
function parseTicketmasterAllowedHosts(outJsText) {
  const tmPos = outJsText.indexOf("ticketmaster:");
  if (tmPos === -1) return [];
  const listPos = outJsText.indexOf("allowedDestinationHosts", tmPos);
  if (listPos === -1) return [];
  const open = outJsText.indexOf("[", listPos);
  const close = outJsText.indexOf("]", open);
  if (open === -1 || close === -1) return [];
  return [...outJsText.slice(open, close).matchAll(/["']([^"'\r\n]+)["']/g)].map((m) => m[1]);
}

// Parse the "<slug>:<provider>" keys of VERIFIED_TICKET_LINKS from out.js
// (same approach as validate-artist-provider-claims.mjs).
function parseVerifiedTicketLinkKeys(outJsText) {
  const block = outJsText.match(/const\s+VERIFIED_TICKET_LINKS\s*=\s*\{([\s\S]*?)\n\};/);
  if (!block) return [];
  return [...block[1].matchAll(/"([a-z0-9-]+):([a-z0-9-]+)"\s*:/g)].map((m) => ({ slug: m[1], provider: m[2], key: `${m[1]}:${m[2]}` }));
}

// Core derivation: given the parsed inputs, compute hard errors + info findings.
function evaluate({ events, registryBySlug, verifiedKeys, allowedHosts }) {
  const errors = [];
  const info = [];

  // 1 + 2: artist-level CTA <-> verified provider identity. Every artist CTA
  // (any provider) needs a review_status "verified" registry entry; each
  // provider additionally requires its identity anchor: ticketmaster_
  // attraction_id for ticketmaster keys, seatgeek_performer_id for seatgeek
  // keys (the performer-page URL is only trusted while pinned to the verified
  // performer record).
  for (const { slug, provider, key } of verifiedKeys) {
    const reg = registryBySlug.get(slug);
    if (!reg) {
      errors.push(`artist CTA "${key}" has no provider-identity registry entry (CTA not backed by a verified identity)`);
      continue;
    }
    if (clean(reg.review_status) !== "verified") {
      errors.push(`artist CTA "${key}" is published but registry review_status is "${clean(reg.review_status) || "(absent)"}" (must be "verified")`);
    }
    if (provider === "ticketmaster" && !clean(reg.ticketmaster_attraction_id)) {
      errors.push(`artist CTA "${key}" is published but registry ticketmaster_attraction_id is empty`);
    }
    if (provider === "seatgeek" && !Number.isInteger(reg.seatgeek_performer_id)) {
      errors.push(`artist CTA "${key}" is published but registry seatgeek_performer_id is empty`);
    }
  }
  const publishedSlugs = new Map();
  for (const { slug, key } of verifiedKeys) {
    const list = publishedSlugs.get(slug) || [];
    list.push(key);
    publishedSlugs.set(slug, list);
  }
  for (const [slug, reg] of registryBySlug) {
    if (clean(reg.review_status) === "withheld" && publishedSlugs.has(slug)) {
      errors.push(`registry "${slug}" is review_status "withheld" but has VERIFIED_TICKET_LINKS CTA(s) ${publishedSlugs.get(slug).join(", ")} (withheld identity must not publish)`);
    }
  }

  // 3 + 4 + 5: event-level CTA eligibility derives from verification_status
  // (Ticketmaster path) or verified SeatGeek provenance (standalone path).
  const statusCounts = {};
  let publishable = 0;
  let seatgeekSuppressed = 0;
  let seatgeekStandalone = 0;
  let vividseatsStandalone = 0;
  const impactMarketplaceStandalone = Object.fromEntries(IMPACT_MARKETPLACE_PROVIDERS.map((provider) => [provider.slug, 0]));
  for (const event of events) {
    const status = clean(event?.verification_status) || "(absent)";
    statusCounts[status] = (statusCounts[status] || 0) + 1;
    const isPublishable = eventLinkPublishable(event);
    const seatgeekVerified = event?.provider_links?.seatgeek?.verified === true;
    if (isPublishable) {
      publishable += 1;
      const redirectIssue = ticketmasterRedirectIssue(event, allowedHosts);
      if (redirectIssue) {
        errors.push(`event "${clean(event?.id)}" is publishable but its CTA will not redirect: ${redirectIssue}`);
      }
    }
    if (clean(event?.verification_status).toLowerCase() === "machine_high_confidence") {
      const mhcIssue = machineHighConfidenceIssue(event, allowedHosts);
      if (mhcIssue) {
        errors.push(`event "${clean(event?.id)}" is machine_high_confidence but breaks that contract: ${mhcIssue}`);
      }
    }
    const sgIssue = seatgeekVerifiedIssue(event);
    if (sgIssue) {
      errors.push(`event "${clean(event?.id)}" has verified SeatGeek provenance but its CTA will not redirect: ${sgIssue}`);
    }
    if (seatgeekVerified && !isPublishable && !sgIssue) {
      seatgeekStandalone += 1;
    }
    if (clean(event?.seatgeek_url) && !isPublishable && !seatgeekVerified) {
      seatgeekSuppressed += 1;
    }
    const vividseatsVerified = event?.provider_links?.["vivid-seats"]?.verified === true;
    const vsIssue = vividseatsVerifiedIssue(event);
    if (vsIssue) {
      errors.push(`event "${clean(event?.id)}" has verified Vivid Seats provenance but its CTA will not redirect: ${vsIssue}`);
    }
    if (vividseatsVerified && !vsIssue) {
      vividseatsStandalone += 1;
    }
    for (const provider of IMPACT_MARKETPLACE_PROVIDERS) {
      const isVerified = event?.provider_links?.[provider.slug]?.verified === true;
      const issue = impactMarketplaceVerifiedIssue(event, provider);
      if (issue) {
        errors.push(`event "${clean(event?.id)}" has verified ${provider.name} provenance but its CTA will not redirect: ${issue}`);
      } else if (isVerified) {
        impactMarketplaceStandalone[provider.slug] += 1;
      }
    }
  }
  if (seatgeekStandalone > 0) {
    info.push(`${seatgeekStandalone} event(s) publish a standalone SeatGeek CTA on verified provenance (provider_links.seatgeek.verified) while no Ticketmaster destination is currently available.`);
  }
  if (seatgeekSuppressed > 0) {
    info.push(`${seatgeekSuppressed} event(s) store a seatgeek_url while the event is not publishable — the SeatGeek CTA renders standalone only when provider_links.seatgeek.verified is true, otherwise it stays suppressed.`);
  }
  if (vividseatsStandalone > 0) {
    info.push(`${vividseatsStandalone} event(s) publish a standalone Vivid Seats CTA on verified provenance (provider_links.vivid-seats.verified).`);
  }
  for (const provider of IMPACT_MARKETPLACE_PROVIDERS) {
    const count = impactMarketplaceStandalone[provider.slug];
    if (count > 0) info.push(`${count} event(s) publish a standalone ${provider.name} CTA on verified Impact catalog provenance.`);
  }

  return { errors, info, stats: { events: events.length, publishable, statusCounts, artistCtas: verifiedKeys.filter((k) => k.provider === "ticketmaster").length } };
}

// ─── I/O ────────────────────────────────────────────────────────────────────

async function readJson(file) {
  return JSON.parse(await fs.readFile(file, "utf8"));
}

async function loadInputs() {
  const [events, registry, outJsText] = await Promise.all([
    readJson(EVENTS_PATH),
    readJson(REGISTRY_PATH),
    fs.readFile(OUT_JS_PATH, "utf8"),
  ]);
  if (!Array.isArray(events)) throw new Error(`${EVENTS_PATH} is not an array`);
  const registryBySlug = new Map((Array.isArray(registry?.artists) ? registry.artists : []).map((a) => [clean(a.slug), a]));
  const allowedHosts = parseTicketmasterAllowedHosts(outJsText);
  if (!allowedHosts.length) throw new Error("could not parse the Ticketmaster allowlist from functions/api/out.js");
  const verifiedKeys = parseVerifiedTicketLinkKeys(outJsText);
  if (!verifiedKeys.length) throw new Error("could not parse VERIFIED_TICKET_LINKS from functions/api/out.js");
  return { events, registryBySlug, verifiedKeys, allowedHosts };
}

// ─── Self-test ──────────────────────────────────────────────────────────────

function selfTest() {
  const checks = [];
  const assert = (label, pass) => checks.push({ label, pass: !!pass });
  const allowedHosts = ["ticketmaster.com"];
  const longUrl = "https://www.ticketmaster.com/raye-london/event/ABC123";
  const goodEvent = {
    id: "e-good", verification_status: "machine_high_confidence", ticketmaster_url: longUrl,
    ticketmaster_event_id: "ABC123", datetime_iso: "2027-06-01T19:00:00Z", venue: "The O2", city: "London",
  };

  assert("publishable status detected", eventLinkPublishable(goodEvent) === true);
  assert("needs_recheck status does not suppress a stored destination", eventLinkPublishable({ ...goodEvent, verification_status: "needs_recheck" }) === true);
  assert("missing destination remains unpublished", eventLinkPublishable({ ...goodEvent, verification_status: "needs_recheck", ticketmaster_url: "", source_url: "", provider_links: {} }) === false);
  assert("absent status falls back to provider verified flag", eventLinkPublishable({ provider_links: { ticketmaster: { verified: true } } }) === true);
  assert("clean machine_high_confidence passes its contract", machineHighConfidenceIssue(goodEvent, allowedHosts) === "");
  assert("short-form url fails mhc contract", machineHighConfidenceIssue({ ...goodEvent, ticketmaster_url: "https://www.ticketmaster.com/event/ABC123" }, allowedHosts) !== "");
  assert("date-only fails mhc contract", machineHighConfidenceIssue({ ...goodEvent, datetime_iso: "2027-06-01" }, allowedHosts) !== "");
  assert("missing id fails redirect invariant", ticketmasterRedirectIssue({ ...goodEvent, ticketmaster_event_id: "" }, allowedHosts) !== "");
  assert("non-allowlisted host fails redirect invariant", ticketmasterRedirectIssue({ ...goodEvent, ticketmaster_url: "https://www.ticketmaster.com.mx/x/event/ABC123" }, allowedHosts) !== "");

  const sgUrl = "https://seatgeek.com/raye-tickets/london-o2-2027-06-01-7-pm/concert/12345";
  const sgVerifiedEvent = {
    id: "e-sg-verified", verification_status: "needs_recheck", seatgeek_url: sgUrl,
    provider_links: { seatgeek: { event_id: 12345, url: sgUrl, verified: true, last_verified_at: "2026-07-07", availability_status: "listed" } },
  };
  assert("unverified seatgeek provenance imposes no contract", seatgeekVerifiedIssue({ ...goodEvent, seatgeek_url: "" }) === "");
  assert("clean verified seatgeek provenance passes", seatgeekVerifiedIssue(sgVerifiedEvent) === "");
  assert("verified seatgeek without top-level url fails", seatgeekVerifiedIssue({ ...sgVerifiedEvent, seatgeek_url: "" }) !== "");
  assert("verified seatgeek with performer-page url fails", seatgeekVerifiedIssue({ ...sgVerifiedEvent, seatgeek_url: "https://seatgeek.com/raye-tickets", provider_links: { seatgeek: { ...sgVerifiedEvent.provider_links.seatgeek, url: "https://seatgeek.com/raye-tickets" } } }) !== "");
  assert("verified seatgeek with mismatched provider url fails", seatgeekVerifiedIssue({ ...sgVerifiedEvent, provider_links: { seatgeek: { ...sgVerifiedEvent.provider_links.seatgeek, url: "https://seatgeek.com/other/concert/999" } } }) !== "");
  assert("verified seatgeek without dated provenance fails", seatgeekVerifiedIssue({ ...sgVerifiedEvent, provider_links: { seatgeek: { ...sgVerifiedEvent.provider_links.seatgeek, last_verified_at: null } } }) !== "");

  const vsUrl = "https://vividseats.com/raye-tickets-london-o2-6-1-2027--floor/production/98765";
  const vsVerifiedEvent = {
    id: "e-vs-verified", vividseats_url: vsUrl,
    provider_links: { "vivid-seats": { event_id: 98765, url: vsUrl, verified: true, last_verified_at: "2026-07-09", availability_status: "listed" } },
  };
  assert("unverified vividseats provenance imposes no contract", vividseatsVerifiedIssue({ vividseats_url: "" }) === "");
  assert("clean verified vividseats provenance passes", vividseatsVerifiedIssue(vsVerifiedEvent) === "");
  assert("verified vividseats without top-level url fails", vividseatsVerifiedIssue({ ...vsVerifiedEvent, vividseats_url: "" }) !== "");
  assert("verified vividseats with performer-page url fails", vividseatsVerifiedIssue({ ...vsVerifiedEvent, vividseats_url: "https://vividseats.com/raye-tickets", provider_links: { "vivid-seats": { ...vsVerifiedEvent.provider_links["vivid-seats"], url: "https://vividseats.com/raye-tickets" } } }) !== "");
  assert("verified vividseats with mismatched provider url fails", vividseatsVerifiedIssue({ ...vsVerifiedEvent, provider_links: { "vivid-seats": { ...vsVerifiedEvent.provider_links["vivid-seats"], url: "https://vividseats.com/other/production/999" } } }) !== "");
  assert("verified vividseats without dated provenance fails", vividseatsVerifiedIssue({ ...vsVerifiedEvent, provider_links: { "vivid-seats": { ...vsVerifiedEvent.provider_links["vivid-seats"], last_verified_at: null } } }) !== "");

  const tnProvider = IMPACT_MARKETPLACE_PROVIDERS[0];
  const tnUrl = "https://www.ticketnetwork.com/performers/raye-tickets/events/12345";
  const tnVerifiedEvent = {
    id: "e-tn-verified", ticketnetwork_url: tnUrl,
    provider_links: { ticketnetwork: { event_id: "TN-12345", url: tnUrl, verified: true, last_verified_at: "2026-07-13" } },
  };
  assert("clean verified TicketNetwork provenance passes", impactMarketplaceVerifiedIssue(tnVerifiedEvent, tnProvider) === "");
  assert("verified TicketNetwork homepage fails", impactMarketplaceVerifiedIssue({ ...tnVerifiedEvent, ticketnetwork_url: "https://www.ticketnetwork.com/", provider_links: { ticketnetwork: { ...tnVerifiedEvent.provider_links.ticketnetwork, url: "https://www.ticketnetwork.com/" } } }, tnProvider) !== "");
  assert("verified TicketNetwork missing event id fails", impactMarketplaceVerifiedIssue({ ...tnVerifiedEvent, provider_links: { ticketnetwork: { ...tnVerifiedEvent.provider_links.ticketnetwork, event_id: "" } } }, tnProvider) !== "");

  const registryBySlug = new Map([
    ["raye", { slug: "raye", review_status: "verified", ticketmaster_attraction_id: "K1" }],
    ["beyonce", { slug: "beyonce", review_status: "unverified", ticketmaster_attraction_id: "" }],
    ["banned", { slug: "banned", review_status: "withheld", ticketmaster_attraction_id: "" }],
  ]);

  const cleanEval = evaluate({
    events: [goodEvent],
    registryBySlug,
    verifiedKeys: [{ slug: "raye", provider: "ticketmaster", key: "raye:ticketmaster" }],
    allowedHosts,
  });
  assert("clean inputs produce no errors", cleanEval.errors.length === 0);

  const dirtyEval = evaluate({
    events: [
      { ...goodEvent, id: "e-pub-noid", ticketmaster_event_id: "" }, // publishable but won't redirect
      { ...goodEvent, id: "e-mhc-short", ticketmaster_url: "https://www.ticketmaster.com/event/ABC123" }, // mhc contract break
      { id: "e-sg", verification_status: "needs_recheck", seatgeek_url: "https://seatgeek.com/x/concert/1" }, // info only
      { ...sgVerifiedEvent, id: "e-sg-ok" }, // standalone SeatGeek CTA, info only
      { ...sgVerifiedEvent, id: "e-sg-broken", seatgeek_url: "", provider_links: { seatgeek: { ...sgVerifiedEvent.provider_links.seatgeek, url: "" } } }, // verified provenance that cannot redirect
      { ...vsVerifiedEvent, id: "e-vs-ok" }, // standalone Vivid Seats CTA, info only
      { ...vsVerifiedEvent, id: "e-vs-broken", vividseats_url: "", provider_links: { "vivid-seats": { ...vsVerifiedEvent.provider_links["vivid-seats"], url: "" } } }, // verified provenance that cannot redirect
      { ...tnVerifiedEvent, id: "e-tn-ok" }, // standalone TicketNetwork CTA, info only
      { ...tnVerifiedEvent, id: "e-tn-broken", ticketnetwork_url: "", provider_links: { ticketnetwork: { ...tnVerifiedEvent.provider_links.ticketnetwork, url: "" } } },
    ],
    registryBySlug,
    verifiedKeys: [
      { slug: "raye", provider: "ticketmaster", key: "raye:ticketmaster" },
      { slug: "beyonce", provider: "ticketmaster", key: "beyonce:ticketmaster" }, // unverified identity
      { slug: "banned", provider: "ticketmaster", key: "banned:ticketmaster" }, // withheld identity
      { slug: "ghost", provider: "ticketmaster", key: "ghost:ticketmaster" }, // no registry entry
    ],
    allowedHosts,
  });
  assert("unpublishable-redirect event flagged", dirtyEval.errors.some((e) => e.includes("e-pub-noid")));
  assert("mhc contract break flagged", dirtyEval.errors.some((e) => e.includes("e-mhc-short")));
  assert("unverified identity CTA flagged", dirtyEval.errors.some((e) => e.includes("beyonce") && e.includes("verified")));
  assert("withheld identity CTA flagged", dirtyEval.errors.some((e) => e.includes("banned") && e.includes("withheld")));
  assert("missing registry entry flagged", dirtyEval.errors.some((e) => e.includes("ghost")));
  assert("suppressed seatgeek is info not error", dirtyEval.info.some((i) => i.includes("suppressed")) && !dirtyEval.errors.some((e) => e.includes('"e-sg"')));
  assert("standalone verified seatgeek is info not error", dirtyEval.info.some((i) => i.includes("standalone SeatGeek CTA")) && !dirtyEval.errors.some((e) => e.includes("e-sg-ok")));
  assert("broken verified seatgeek provenance flagged", dirtyEval.errors.some((e) => e.includes("e-sg-broken") && e.includes("SeatGeek provenance")));
  assert("standalone verified vividseats is info not error", dirtyEval.info.some((i) => i.includes("standalone Vivid Seats CTA")) && !dirtyEval.errors.some((e) => e.includes("e-vs-ok")));
  assert("broken verified vividseats provenance flagged", dirtyEval.errors.some((e) => e.includes("e-vs-broken") && e.includes("Vivid Seats provenance")));
  assert("standalone verified TicketNetwork is info not error", dirtyEval.info.some((i) => i.includes("TicketNetwork CTA")) && !dirtyEval.errors.some((e) => e.includes("e-tn-ok")));
  assert("broken verified TicketNetwork provenance flagged", dirtyEval.errors.some((e) => e.includes("e-tn-broken") && e.includes("TicketNetwork provenance")));

  let failed = 0;
  for (const c of checks) {
    if (!c.pass) failed += 1;
    console.log(`${c.pass ? "PASS" : "FAIL"}  ${c.label}`);
  }
  console.log(`\n${checks.length - failed}/${checks.length} checks passed.`);
  return failed === 0 ? 0 : 1;
}

// ─── Main ─────────────────────────────────────────────────────────────────

async function main() {
  const argv = process.argv.slice(2);
  if (argv.includes("--self-test")) return selfTest();
  const asJson = argv.includes("--json");

  const inputs = await loadInputs();
  const { errors, info, stats } = evaluate(inputs);

  if (asJson) {
    console.log(JSON.stringify({ ok: errors.length === 0, errors, info, stats }, null, 2));
    return errors.length === 0 ? 0 : 1;
  }

  console.log("CTA ↔ provider-state consistency (read-only; no files or gates changed)\n");
  console.log(`  events: ${stats.events}  publishable: ${stats.publishable}  artist Ticketmaster CTAs: ${stats.artistCtas}`);
  console.log(`  verification_status: ${JSON.stringify(stats.statusCounts)}`);
  for (const i of info) console.log(`  note: ${i}`);
  if (errors.length === 0) {
    console.log("\nOK: every CTA is backed by verified provider state and is internally consistent.");
    return 0;
  }
  console.error(`\n${errors.length} CTA/provider-state drift error(s):`);
  for (const e of errors) console.error(`  - ${e}`);
  return 1;
}

main()
  .then((code) => process.exit(code))
  .catch((error) => {
    console.error(`ERROR: ${error.message || error}`);
    process.exit(2);
  });
