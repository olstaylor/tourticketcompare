#!/usr/bin/env node
// Per-slug artist readiness validator. Checks that one artist is fully and
// safely wired across artists.json, catalog.json, events.json, partition
// files, and VERIFIED_TICKET_LINKS in functions/api/out.js.
//
// Usage:
//   node scripts/validate-artist.mjs <slug>
//   npm run artist:check -- <slug>
//
// Exit code 0 = PASS or WARN (intentionally gated / incomplete but safe)
// Exit code 1 = FAIL (data inconsistent, contradictory, or unsupported claim)
// Exit code 2 = script error (bad args, unreadable files)

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const PATHS = {
  artists:   path.join(root, 'public/data/artists.json'),
  catalog:   path.join(root, 'public/data/catalog.json'),
  events:    path.join(root, 'public/data/events.json'),
  eventsDir: path.join(root, 'public/data/events'),
  out:       path.join(root, 'functions/api/out.js'),
  shows:     path.join(root, 'functions/api/shows.js'),
};

// Providers whose artist-level CTAs are dispatched via VERIFIED_TICKET_LINKS.
// SeatGeek gained artist-level performer-page entries in the 2026-07 affiliate
// pivot; vivid-seats joins when its first artist-level entry lands.
const ARTIST_LEVEL_PROVIDERS = new Set(['ticketmaster', 'seatgeek']);

async function readJson(p) {
  return JSON.parse(await fs.readFile(p, 'utf8'));
}

async function loadVerifiedTicketLinkKeys() {
  const source = await fs.readFile(PATHS.out, 'utf8');
  const blockMatch = source.match(/const\s+VERIFIED_TICKET_LINKS\s*=\s*\{([\s\S]*?)\n\};/);
  if (!blockMatch) throw new Error(`Could not locate VERIFIED_TICKET_LINKS block in ${PATHS.out}`);
  const keys = new Set();
  const keyPattern = /"([a-z0-9-]+):([a-z0-9-]+)"\s*:/g;
  let m;
  while ((m = keyPattern.exec(blockMatch[1])) !== null) keys.add(`${m[1]}:${m[2]}`);
  return keys;
}

async function loadShowsArtistLinkKeys() {
  // shows.js derives ARTIST_LINKS_BY_PROVIDER (provider → { slug → url })
  // from out.js VERIFIED_TICKET_LINKS at module load — import it and read the
  // real map instead of regex-parsing source text.
  const showsModule = await import(pathToFileURL(PATHS.shows));
  const map = showsModule.ARTIST_LINKS_BY_PROVIDER;
  if (!map || typeof map !== 'object') {
    throw new Error(`ARTIST_LINKS_BY_PROVIDER not exported from ${PATHS.shows}`);
  }
  const byProvider = new Map();
  for (const [provider, links] of Object.entries(map)) {
    byProvider.set(provider, new Set(Object.keys(links || {})));
  }
  return byProvider;
}

// ─── Report builder ────────────────────────────────────────────────────────────

function makeReport() {
  const sections = [];
  let currentSection = null;

  function addItem(level, msg) {
    if (!currentSection) throw new Error('addItem called before openSection');
    currentSection.items.push({ level, msg });
    if (level === 'warn') currentSection._warns++;
    if (level === 'fail') currentSection._fails++;
  }

  return {
    openSection(title) {
      currentSection = { title, items: [], _warns: 0, _fails: 0 };
      sections.push(currentSection);
    },
    pass(msg)  { addItem('pass', msg); },
    warn(msg)  { addItem('warn', msg); },
    fail(msg)  { addItem('fail', msg); },
    info(msg)  { addItem('info', msg); },
    sections,
    get totalWarns() { return sections.reduce((n, s) => n + s._warns, 0); },
    get totalFails()  { return sections.reduce((n, s) => n + s._fails, 0); },
    get result() {
      const f = sections.reduce((n, s) => n + s._fails, 0);
      const w = sections.reduce((n, s) => n + s._warns, 0);
      if (f > 0) return 'FAIL';
      if (w > 0) return 'WARN';
      return 'PASS';
    },
  };
}

function renderReport(slug, report) {
  const ICON = { pass: '✓', warn: '⚠', fail: '✗', info: '·' };
  const PAD  = { pass: ' ', warn: ' ', fail: ' ', info: ' ' };

  console.log(`\n${'═'.repeat(56)}`);
  console.log(`  validate-artist: ${slug}`);
  console.log(`${'═'.repeat(56)}`);

  for (const section of report.sections) {
    const hasFail = section._fails > 0;
    const hasWarn = section._warns > 0;
    const sectionBadge = hasFail ? ' [FAIL]' : hasWarn ? ' [WARN]' : '';
    console.log(`\n── ${section.title}${sectionBadge}`);
    for (const { level, msg } of section.items) {
      console.log(`  ${ICON[level]}${PAD[level]} ${msg}`);
    }
  }

  const { result, totalWarns, totalFails } = report;
  const bar = '─'.repeat(56);
  console.log(`\n${bar}`);

  const parts = [];
  if (totalFails > 0)  parts.push(`${totalFails} error(s)`);
  if (totalWarns > 0)  parts.push(`${totalWarns} warning(s)`);
  if (parts.length === 0) parts.push('all checks passed');

  console.log(`  Result: ${result} — ${parts.join(', ')}`);
  console.log(bar);
}

// ─── Main ──────────────────────────────────────────────────────────────────────

async function main() {
  const slug = process.argv[2]?.trim().toLowerCase();
  if (!slug) {
    console.error('Usage: node scripts/validate-artist.mjs <slug>');
    console.error('       npm run artist:check -- <slug>');
    process.exit(2);
  }

  let artists, catalog, events, vtlKeys, showsArtistLinkKeys;
  try {
    [artists, catalog, events, vtlKeys, showsArtistLinkKeys] = await Promise.all([
      readJson(PATHS.artists),
      readJson(PATHS.catalog),
      readJson(PATHS.events),
      loadVerifiedTicketLinkKeys(),
      loadShowsArtistLinkKeys(),
    ]);
  } catch (err) {
    console.error(`FATAL: could not load data files — ${err.message}`);
    process.exit(2);
  }

  const report = makeReport();

  // ── 1. artists.json ────────────────────────────────────────────────────────

  report.openSection('artists.json');

  const artistMatches = (Array.isArray(artists) ? artists : []).filter(a => a?.slug === slug);

  if (artistMatches.length === 0) {
    report.fail(`No artist with slug "${slug}" found in artists.json`);
    renderReport(slug, report);
    process.exit(1);
  }
  if (artistMatches.length > 1) {
    report.fail(`Duplicate slug "${slug}" in artists.json (${artistMatches.length} entries)`);
  }

  const artist        = artistMatches[0];
  const indexingStatus = String(artist.indexing_status || '');
  const isGated       = indexingStatus === 'review_required';
  const isIndexable   = indexingStatus === 'indexable_with_substantial_content';
  const verifiedProviders = Array.isArray(artist.verified_providers) ? artist.verified_providers : [];
  const claimedCount  = Number(artist.verified_provider_count ?? 0);

  report.pass(`Found: ${artist.name} (slug: ${slug})`);
  report.info(`indexing_status: ${indexingStatus}`);
  report.info(`last_verified_at: ${artist.last_verified_at ?? 'null'}`);

  if (verifiedProviders.length !== claimedCount) {
    report.fail(
      `verified_provider_count (${claimedCount}) does not match verified_providers.length (${verifiedProviders.length})`
    );
  } else {
    report.pass(`verified_provider_count (${claimedCount}) matches verified_providers.length`);
  }

  // ── 2 & 3. catalog.json content fields ────────────────────────────────────

  report.openSection('catalog.json — content fields');

  const catalogArtists = Array.isArray(catalog?.artists) ? catalog.artists : [];
  const catMatches = catalogArtists.filter(a => a?.slug === slug);

  if (catMatches.length === 0) {
    report.fail(`No entry in catalog.json artists[] for "${slug}"`);
  } else {
    if (catMatches.length > 1) {
      report.fail(`Duplicate slug "${slug}" in catalog.json artists[] (${catMatches.length} entries)`);
    }
    const ca = catMatches[0];

    const alwaysRequired = ['name', 'short_description', 'factual_summary'];
    const seoRequired    = ['seo_title', 'meta_description'];

    for (const field of alwaysRequired) {
      const val = ca[field];
      if (!val || String(val).trim() === '') {
        report.warn(`${field}: missing or empty`);
      } else {
        report.pass(`${field}: present`);
      }
    }

    for (const field of seoRequired) {
      const val = ca[field];
      if (!val || String(val).trim() === '') {
        if (isIndexable) {
          report.warn(`${field}: missing (artist is indexable — needed for SEO)`);
        } else {
          report.info(`${field}: not yet set (artist is gated — expected)`);
        }
      } else {
        report.pass(`${field}: present`);
      }
    }
  }

  // ── 4 & 5. Provider wiring ────────────────────────────────────────────────

  report.openSection('provider wiring');

  if (isIndexable && verifiedProviders.length === 0) {
    report.warn(
      'Artist is indexable_with_substantial_content but verified_providers is empty ' +
      '— fans reach this page with no verified CTA (issue #171 for olivia-rodrigo)'
    );
  }

  if (verifiedProviders.length === 0) {
    report.info('verified_providers: [] — no provider wiring expected');
  }

  // Build a flat key→link map from catalog ticket_links
  const tlIndex = new Map();
  for (const tl of catalog?.ticket_links || []) {
    const k = `${tl?.artist_slug}:${tl?.provider}`;
    if (!tlIndex.has(k)) tlIndex.set(k, tl);
  }

  for (const provider of verifiedProviders) {
    const key = `${slug}:${provider}`;

    const tl = tlIndex.get(key);
    if (!tl) {
      report.fail(`catalog.json ticket_links[]: no row found for "${key}"`);
    } else if (!tl.verified || !tl.public_enabled || !tl.affiliate_enabled) {
      report.fail(
        `catalog.json ticket_links["${key}"]: row exists but one of ` +
        `verified/public_enabled/affiliate_enabled is not true`
      );
    } else {
      report.pass(`catalog.json ticket_links["${key}"]: verified + public_enabled + affiliate_enabled`);
    }

    if (ARTIST_LEVEL_PROVIDERS.has(provider)) {
      if (vtlKeys.has(key)) {
        report.pass(`VERIFIED_TICKET_LINKS["${key}"]: present in functions/api/out.js`);
      } else {
        report.fail(`VERIFIED_TICKET_LINKS["${key}"]: missing from functions/api/out.js`);
      }
    }
  }

  // ── 6. Allowlist membership ───────────────────────────────────────────────

  report.openSection('allowlist membership');

  // shows.js check: only required when the artist is indexable AND has Ticketmaster
  // as a verified provider — those are exactly the artists whose pages display a
  // Ticketmaster CTA sourced from /api/shows. The map is derived at runtime from
  // out.js VERIFIED_TICKET_LINKS, so a miss here means the out.js entry is absent
  // or not a verified ticketmaster link.
  const artistLevelProviders = ['ticketmaster', 'seatgeek'].filter((provider) => verifiedProviders.includes(provider));
  if (isIndexable && artistLevelProviders.length) {
    for (const provider of artistLevelProviders) {
      if (showsArtistLinkKeys.get(provider)?.has(slug)) {
        report.pass(`shows.js artist-link map (derived from out.js): "${slug}:${provider}" present`);
      } else {
        report.fail(
          `shows.js artist-link map (derived from out.js): "${slug}:${provider}" missing — ` +
          `the ${provider} artist link is not derivable from out.js`
        );
      }
    }
  } else {
    report.info(
      `shows.js artist-link map check skipped (artist not indexable or no artist-level provider)`
    );
  }

  // signup.js loads its allowlist from artists.json at runtime, so presence in
  // artists.json (verified in section 1) is sufficient — no separate check needed.
  report.info('signup allowlist: derived from artists.json at runtime (checked in section 1)');

  // ── 7. Event coverage ─────────────────────────────────────────────────────

  report.openSection('event coverage');

  const eventsForSlug = (Array.isArray(events) ? events : []).filter(e => e?.artist_slug === slug);
  const eventCount    = eventsForSlug.length;

  report.info(`events.json: ${eventCount} event(s) for ${slug}`);

  // Partition file
  const partPath = path.join(PATHS.eventsDir, `${slug}.json`);
  let partitionEvents = null;
  try {
    const raw = await readJson(partPath);
    partitionEvents = Array.isArray(raw) ? raw : (Array.isArray(raw?.events) ? raw.events : null);
    if (partitionEvents === null) {
      report.warn(`Partition file exists but is not an array or {events:[]} shape`);
    }
  } catch {
    partitionEvents = null;
  }

  if (eventCount === 0) {
    if (isIndexable) {
      report.warn('Indexed artist has 0 events — page renders no show cards (audit finding U2)');
    } else {
      report.info('0 events — artist is gated, may be expected');
    }
    if (partitionEvents === null) {
      report.info(`No partition file at public/data/events/${slug}.json (expected for 0-event artist)`);
    }
  } else {
    if (partitionEvents === null) {
      report.fail(
        `events.json has ${eventCount} event(s) for ${slug} but ` +
        `public/data/events/${slug}.json is missing — partition sync required`
      );
    } else {
      const partCount = partitionEvents.length;
      if (partCount !== eventCount) {
        report.fail(
          `Count mismatch: events.json has ${eventCount}, partition has ${partCount} — run events:partition`
        );
      } else {
        report.pass(`Partition file: ${partCount} events (matches events.json count)`);
      }

      // ID cross-check
      const mainIds = new Set(eventsForSlug.map(e => e?.id).filter(Boolean));
      const partIds = new Set(partitionEvents.map(e => e?.id).filter(Boolean));
      const missingFromPart = [...mainIds].filter(id => !partIds.has(id));
      const extraInPart     = [...partIds].filter(id => !mainIds.has(id));
      if (missingFromPart.length > 0) {
        report.fail(`${missingFromPart.length} event ID(s) in events.json absent from partition`);
      }
      if (extraInPart.length > 0) {
        report.fail(`${extraInPart.length} event ID(s) in partition absent from events.json`);
      }
      if (missingFromPart.length === 0 && extraInPart.length === 0 && partCount === eventCount) {
        report.pass('Event IDs match between events.json and partition file');
      }
    }

    // Malformed datetime_iso (date-only — API filter silently drops these)
    const malformed = eventsForSlug.filter(e => {
      const d = e?.datetime_iso;
      return d && !String(d).includes('T');
    });
    if (malformed.length > 0) {
      report.warn(
        `${malformed.length} event(s) have date-only datetime_iso (missing time component) ` +
        `— these are silently filtered by the /api/shows response`
      );
    }

    // Events whose Ticketmaster link is not CTA-publishable. Mirrors
    // eventLinkPublishable in functions/[[path]].js / public/app.js /
    // functions/api/out.js: an explicit verification_status of
    // human_verified or machine_high_confidence allows CTAs; needs_recheck
    // suppresses them; with no explicit status the legacy
    // provider_links.ticketmaster.verified flag decides.
    const PUBLISHABLE_VERIFICATION_STATUSES = new Set(["human_verified", "machine_high_confidence"]);
    const nonPublishable = eventsForSlug.filter(e => {
      const status = String(e?.verification_status || "").trim().toLowerCase();
      if (status) return !PUBLISHABLE_VERIFICATION_STATUSES.has(status);
      return e?.provider_links?.ticketmaster?.verified !== true;
    });
    if (nonPublishable.length > 0) {
      report.warn(
        `${nonPublishable.length} event(s) are not CTA-publishable ` +
        `(verification_status is needs_recheck, or no explicit status and ` +
        `provider_links.ticketmaster.verified is not true) ` +
        `— show cards for these events will have no Ticketmaster CTA`
      );
    }
  }

  // ── 7. Indexing status gate ────────────────────────────────────────────────

  if (isGated) {
    report.openSection('indexing status');
    report.warn(
      'review_required — artist is intentionally gated and not public-ready; ' +
      'WARN is expected here, not FAIL'
    );
  }

  // ── 8. tour_name coverage ─────────────────────────────────────────────────

  report.openSection('tour_name coverage');

  if (eventCount === 0) {
    report.info('No events — tour_name check skipped');
  } else {
    const filled = eventsForSlug.filter(
      e => e?.tour_name && String(e.tour_name).trim() !== ''
    ).length;
    const blank = eventCount - filled;

    if (blank === 0) {
      report.pass(`tour_name: ${filled}/${eventCount} events filled`);
    } else if (filled === 0) {
      report.warn(`tour_name: all ${blank} event(s) have blank tour_name (issue #172 sub-B)`);
    } else {
      report.warn(`tour_name: ${blank}/${eventCount} event(s) have blank tour_name`);
    }
  }

  // ── Render and exit ────────────────────────────────────────────────────────

  renderReport(slug, report);
  process.exit(report.totalFails > 0 ? 1 : 0);
}

main().catch(err => {
  console.error(`validate-artist failed: ${err.message}`);
  process.exit(2);
});
