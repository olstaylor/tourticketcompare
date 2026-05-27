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
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const PATHS = {
  artists:   path.join(root, 'public/data/artists.json'),
  catalog:   path.join(root, 'public/data/catalog.json'),
  events:    path.join(root, 'public/data/events.json'),
  eventsDir: path.join(root, 'public/data/events'),
  out:       path.join(root, 'functions/api/out.js'),
  shows:     path.join(root, 'functions/api/shows.js'),
  signup:    path.join(root, 'functions/api/signup.js'),
};

// Providers whose artist-level CTAs are dispatched via VERIFIED_TICKET_LINKS.
// Event-only providers (e.g. seatgeek) resolve destinations from event records.
const ARTIST_LEVEL_PROVIDERS = new Set(['ticketmaster']);

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

async function loadShowsAffiliateKeys() {
  const source = await fs.readFile(PATHS.shows, 'utf8');
  const blockMatch = source.match(/const\s+TICKETMASTER_ARTIST_AFFILIATE_LINKS\s*=\s*\{([\s\S]*?)\n\};/);
  if (!blockMatch) throw new Error(`Could not locate TICKETMASTER_ARTIST_AFFILIATE_LINKS block in ${PATHS.shows}`);
  const keys = new Set();
  // Handles both quoted ("harry-styles") and bare-word (bts, beyonce) object keys.
  // Anchored to start-of-line to avoid matching URL path segments.
  const keyPattern = /^\s+(?:"([a-z0-9-]+)"|([a-z][a-z0-9]*))\s*:/gm;
  let m;
  while ((m = keyPattern.exec(blockMatch[1])) !== null) keys.add(m[1] ?? m[2]);
  return keys;
}

async function loadSignupArtistSlugs() {
  const source = await fs.readFile(PATHS.signup, 'utf8');
  const blockMatch = source.match(/const\s+ARTIST_SLUGS\s*=\s*new\s+Set\(\[([\s\S]*?)\]\)/);
  if (!blockMatch) throw new Error(`Could not locate ARTIST_SLUGS block in ${PATHS.signup}`);
  const slugs = new Set();
  const strPattern = /"([a-z0-9-]+)"/g;
  let m;
  while ((m = strPattern.exec(blockMatch[1])) !== null) slugs.add(m[1]);
  return slugs;
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

  let artists, catalog, events, vtlKeys, showsAffiliateKeys, signupSlugs;
  try {
    [artists, catalog, events, vtlKeys, showsAffiliateKeys, signupSlugs] = await Promise.all([
      readJson(PATHS.artists),
      readJson(PATHS.catalog),
      readJson(PATHS.events),
      loadVerifiedTicketLinkKeys(),
      loadShowsAffiliateKeys(),
      loadSignupArtistSlugs(),
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
  // Ticketmaster CTA sourced from /api/shows.
  if (isIndexable && verifiedProviders.includes('ticketmaster')) {
    if (showsAffiliateKeys.has(slug)) {
      report.pass(`shows.js TICKETMASTER_ARTIST_AFFILIATE_LINKS: "${slug}" present`);
    } else {
      report.fail(
        `shows.js TICKETMASTER_ARTIST_AFFILIATE_LINKS: "${slug}" missing — ` +
        `/api/shows returns no affiliate URL for this artist`
      );
    }
  } else {
    report.info(
      `shows.js affiliate map check skipped (artist not indexable or no Ticketmaster provider)`
    );
  }

  // signup.js check: warn for all slugs — even review_required artists should be in
  // the allowlist so fans can sign up for interest alerts.
  if (signupSlugs.has(slug)) {
    report.pass(`signup.js ARTIST_SLUGS: "${slug}" present`);
  } else {
    report.warn(
      `signup.js ARTIST_SLUGS: "${slug}" missing — ` +
      `/api/signup returns 400 invalid_artist for this slug`
    );
  }

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

    // Events with unverified provider links
    const unverifiedTm = eventsForSlug.filter(
      e => e?.provider_links?.ticketmaster?.verified === false
    );
    if (unverifiedTm.length > 0) {
      report.warn(
        `${unverifiedTm.length} event(s) have provider_links.ticketmaster.verified=false ` +
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
