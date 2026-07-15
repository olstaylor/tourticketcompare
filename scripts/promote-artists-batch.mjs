#!/usr/bin/env node
// Batch promote scaffold: promotes up to 20 review_required shell artists in
// one pass from a reviewed onboarding manifest (see
// scripts/propose-onboarding-batch.mjs). SeatGeek-first: every promoted
// artist gets a "<slug>:seatgeek" VERIFIED_TICKET_LINKS entry from the
// manifest's API-captured performer-page URL; a plain "<slug>:ticketmaster"
// entry is added ONLY when the manifest carries an API-captured canonical
// Ticketmaster URL. URLs are never constructed from names.
//
// The human batch spot-check replaces the old one-artist-per-PR gate: this
// script writes a per-artist checklist markdown that must be pasted into the
// PR body and ticked row by row (open each URL in a browser, confirm the
// artist) before merge. It does NOT verify URLs are live itself.
//
// Usage:
//   node scripts/promote-artists-batch.mjs --manifest artifacts/onboarding/batch-<date>.json            (dry run)
//   node scripts/promote-artists-batch.mjs --manifest <path> --slugs a,b   (subset, dry run)
//   node scripts/promote-artists-batch.mjs --manifest <path> --write
//   node scripts/promote-artists-batch.mjs --self-test
//
// Exit code 0 = preview printed or edits applied
// Exit code 1 = refused (nothing promotable / a candidate failed hard checks)
// Exit code 2 = script error (bad args, unreadable files)

import fs from 'node:fs/promises';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import { slugify } from './lib/slugify.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const PATHS = {
  artists: path.join(root, 'public/data/artists.json'),
  catalog: path.join(root, 'public/data/catalog.json'),
  out: path.join(root, 'functions/api/out.js'),
  registry: path.join(root, 'data/provider-identities.json'),
};

const MAX_PER_RUN = 20;
const PLACEHOLDER_PATTERN = /example\.com|placeholder|your-link|replace-me|localhost|127\.0\.0\.1|tbd/i;
const VTL_BLOCK_PATTERN = /const\s+VERIFIED_TICKET_LINKS\s*=\s*\{([\s\S]*?)\n\};/;

function parseArgs(argv) {
  const args = { write: false, selfTest: false, max: MAX_PER_RUN };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === '--manifest') args.manifest = argv[++i];
    else if (a === '--slugs') args.slugs = String(argv[++i] || '').split(',').map((s) => s.trim()).filter(Boolean);
    else if (a === '--max') args.max = Math.min(MAX_PER_RUN, Math.max(1, Number(argv[++i]) || MAX_PER_RUN));
    else if (a === '--checklist-output') args.checklistOutput = argv[++i];
    else if (a === '--write') args.write = true;
    else if (a === '--self-test') args.selfTest = true;
    else throw new Error(`Unknown argument: ${a}`);
  }
  return args;
}

function validUrlForHosts(url, allowedHosts, label, problems) {
  if (typeof url !== 'string' || !url.trim()) {
    problems.push(`${label}: missing URL`);
    return null;
  }
  if (PLACEHOLDER_PATTERN.test(url)) {
    problems.push(`${label}: placeholder/dev marker in URL`);
    return null;
  }
  let parsed;
  try {
    parsed = new URL(url.trim());
  } catch {
    problems.push(`${label}: URL does not parse`);
    return null;
  }
  if (parsed.protocol !== 'https:') {
    problems.push(`${label}: URL must be https`);
    return null;
  }
  const host = parsed.hostname.toLowerCase();
  if (!allowedHosts.some((allowed) => host === allowed || host.endsWith(`.${allowed}`))) {
    problems.push(`${label}: host "${host}" not in the out.js allowlist`);
    return null;
  }
  return url.trim();
}

// Evaluates one manifest row against the loaded data files. Returns either
// { ok: true, plan } or { ok: false, reasons } — pure so the self-test can
// exercise it offline.
export function evaluateCandidate(row, { artists, catalog, outSource, registry, allowedHosts, today }) {
  const reasons = [];
  const slug = slugify(row?.slug);
  if (!slug) return { ok: false, slug: row?.slug || '(missing)', reasons: ['manifest row has no usable slug'] };
  if (row?.exclusion) return { ok: false, slug, reasons: [`manifest exclusion: ${row.exclusion}`] };

  const sgUrl = validUrlForHosts(row?.seatgeek?.url, allowedHosts.seatgeek, 'seatgeek url', reasons);
  const sgId = row?.seatgeek?.performer_id;
  if (!Number.isInteger(sgId)) reasons.push('seatgeek performer_id missing — identity must be pinned to the API record');

  let tmUrl = null;
  let tmId = null;
  if (row?.ticketmaster) {
    tmUrl = validUrlForHosts(row.ticketmaster.url, allowedHosts.ticketmaster, 'ticketmaster url', reasons);
    tmId = typeof row.ticketmaster.attraction_id === 'string' && row.ticketmaster.attraction_id.trim()
      ? row.ticketmaster.attraction_id.trim()
      : null;
    if (tmUrl && !tmId) reasons.push('ticketmaster url present but attraction_id missing');
  }

  const artistMatches = artists.filter((a) => a?.slug === slug);
  if (artistMatches.length === 0) reasons.push('no artists.json record — run the shell phase first');
  if (artistMatches.length > 1) reasons.push('duplicate slug in artists.json');
  const artist = artistMatches[0];
  if (artist && artist.indexing_status !== 'review_required') {
    reasons.push(`indexing_status is "${artist.indexing_status}" — only review_required shells are batch-promotable`);
  }
  if (artist && Array.isArray(artist.verified_providers) && artist.verified_providers.length > 0) {
    reasons.push(`verified_providers already non-empty (${artist.verified_providers.join(', ')})`);
  }

  const sgKey = `${slug}:seatgeek`;
  const tmKey = `${slug}:ticketmaster`;
  if (outSource.includes(`"${sgKey}"`)) reasons.push(`out.js already contains "${sgKey}"`);
  if (tmUrl && outSource.includes(`"${tmKey}"`)) reasons.push(`out.js already contains "${tmKey}"`);

  const tmTicketLink = (catalog.ticket_links || []).find(
    (tl) => tl?.link_id === `tm-artist-${slug}` && tl?.artist_slug === slug && tl?.provider === 'ticketmaster'
  );
  if (tmUrl && !tmTicketLink) reasons.push(`catalog.json has no "tm-artist-${slug}" ticket_links row — run the shell phase first`);
  if ((catalog.ticket_links || []).some((tl) => tl?.link_id === `sg-artist-${slug}`)) {
    reasons.push(`catalog.json already contains "sg-artist-${slug}"`);
  }

  const registryEntry = (registry.artists || []).find((r) => r?.slug === slug);

  if (reasons.length) return { ok: false, slug, reasons };

  const providers = ['seatgeek'];
  if (tmUrl) providers.unshift('ticketmaster');
  return {
    ok: true,
    slug,
    plan: { slug, name: row.name, sgUrl, sgId, tmUrl, tmId, providers, artist, tmTicketLink, registryEntry, today }
  };
}

function vtlEntryText(key, { artistSlug, provider, linkId, redirectUrl }) {
  return [
    `  "${key}": {`,
    `    artistSlug: "${artistSlug}",`,
    `    provider: "${provider}",`,
    `    linkId: "${linkId}",`,
    `    redirectUrl: "${redirectUrl}",`,
    '    verified: true',
    '  }',
  ].join('\n');
}

export function applyPlans(plans, { artists, catalog, outSource, registry }) {
  let newOutSource = outSource;
  for (const plan of plans) {
    const { slug, sgUrl, sgId, tmUrl, tmId, today } = plan;

    plan.artist.indexing_status = 'indexable_with_substantial_content';
    plan.artist.verified_providers = [...plan.providers];
    plan.artist.verified_provider_count = plan.providers.length;
    plan.artist.last_verified_at = today;

    catalog.ticket_links.push({
      link_id: `sg-artist-${slug}`,
      artist_slug: slug,
      tour_slug: null,
      provider: 'seatgeek',
      destination_type: 'artist_page',
      affiliate_enabled: true,
      verified: true,
      public_enabled: true,
      market: 'us',
      last_checked_at: today,
      disclosure_required: true,
      // url is required: availableArtistProviderLinks (functions/[[path]].js) and
      // renderProviderButtons (public/app.js) drop any non-Ticketmaster row without
      // a valid url, so an omitted url silently suppresses the SeatGeek artist CTA.
      url: sgUrl
    });
    if (tmUrl && plan.tmTicketLink) {
      plan.tmTicketLink.verified = true;
      plan.tmTicketLink.public_enabled = true;
      plan.tmTicketLink.affiliate_enabled = true;
      plan.tmTicketLink.last_checked_at = today;
      plan.tmTicketLink.url = tmUrl;
    }

    const entries = [];
    if (tmUrl) {
      entries.push(vtlEntryText(`${slug}:ticketmaster`, {
        artistSlug: slug, provider: 'ticketmaster', linkId: `tm-artist-${slug}`, redirectUrl: tmUrl
      }));
    }
    entries.push(vtlEntryText(`${slug}:seatgeek`, {
      artistSlug: slug, provider: 'seatgeek', linkId: `sg-artist-${slug}`, redirectUrl: sgUrl
    }));
    newOutSource = newOutSource.replace(
      VTL_BLOCK_PATTERN,
      (match, inner) => `const VERIFIED_TICKET_LINKS = {${inner},\n${entries.join(',\n')}\n};`
    );

    const provenance = `Batch-promoted ${today}: SeatGeek performer id + URL captured from the /2/performers API${tmUrl ? '; Ticketmaster attraction id + URL captured from the Discovery attractions API' : '; no Ticketmaster capture'} (exact-name match, human batch spot-check required before merge).`;
    if (plan.registryEntry) {
      plan.registryEntry.ticketmaster_attraction_id = tmId || plan.registryEntry.ticketmaster_attraction_id || null;
      plan.registryEntry.ticketmaster_artist_url = tmUrl || plan.registryEntry.ticketmaster_artist_url || null;
      plan.registryEntry.seatgeek_performer_id = sgId;
      plan.registryEntry.seatgeek_artist_url = sgUrl;
      plan.registryEntry.sync_enabled = Boolean(tmId);
      plan.registryEntry.review_status = 'verified';
      plan.registryEntry.notes = `${String(plan.registryEntry.notes || '').trim()} ${provenance}`.trim();
    } else {
      registry.artists.push({
        slug,
        ticketmaster_attraction_id: tmId || null,
        ticketmaster_artist_url: tmUrl || null,
        seatgeek_performer_id: sgId,
        seatgeek_artist_url: sgUrl,
        sync_enabled: Boolean(tmId),
        last_synced_at: null,
        review_status: 'verified',
        notes: provenance
      });
    }
  }

  // Self-check: the edited block must still parse with the validators' regex
  // and contain every inserted key.
  const checkBlock = newOutSource.match(VTL_BLOCK_PATTERN);
  if (!checkBlock) throw new Error('out.js insertion failed self-check (block unparseable)');
  for (const plan of plans) {
    if (!checkBlock[1].includes(`"${plan.slug}:seatgeek"`)) throw new Error(`out.js insertion failed self-check (missing ${plan.slug}:seatgeek)`);
    if (plan.tmUrl && !checkBlock[1].includes(`"${plan.slug}:ticketmaster"`)) throw new Error(`out.js insertion failed self-check (missing ${plan.slug}:ticketmaster)`);
  }

  return { artists, catalog, outSource: newOutSource, registry };
}

function checklistMarkdown(plans, manifestPath, today) {
  const lines = [
    `## Batch promote spot-check (${today})`,
    '',
    `Manifest: \`${manifestPath}\`. Tick every box after checking IN A BROWSER, then merge. An unticked row blocks merge.`,
    ''
  ];
  for (const plan of plans) {
    lines.push(`### ${plan.name || plan.slug} (\`${plan.slug}\`)`);
    lines.push(`- [ ] Opened ${plan.sgUrl} — page is the correct artist (SeatGeek performer id ${plan.sgId})`);
    if (plan.tmUrl) lines.push(`- [ ] Opened ${plan.tmUrl} — page is the correct artist (Ticketmaster attraction ${plan.tmId})`);
    lines.push('- [ ] No tribute/parking/dance-party collision concerns for this name');
    lines.push('');
  }
  lines.push('Validation to run locally before pushing:');
  lines.push('```');
  lines.push(`npm run artist:check -- ${plans.map((p) => p.slug).join(' ')}`);
  lines.push('npm run validate:artist-providers && npm run providers:identities:validate && npm run test:mvp');
  lines.push('```');
  return `${lines.join('\n')}\n`;
}

function selfTest() {
  const checks = [];
  const ok = (label, cond) => checks.push([label, Boolean(cond)]);

  const fixtureOut = 'const VERIFIED_TICKET_LINKS = {\n  "existing:ticketmaster": {\n    artistSlug: "existing",\n    provider: "ticketmaster",\n    linkId: "tm-artist-existing",\n    redirectUrl: "https://www.ticketmaster.com/existing-tickets/artist/1",\n    verified: true\n  }\n};';
  const base = () => ({
    artists: [
      { slug: 'new-artist', indexing_status: 'review_required', verified_providers: [], verified_provider_count: 0 },
      { slug: 'existing', indexing_status: 'indexable_with_substantial_content', verified_providers: ['ticketmaster'], verified_provider_count: 1 }
    ],
    catalog: { ticket_links: [{ link_id: 'tm-artist-new-artist', artist_slug: 'new-artist', provider: 'ticketmaster', verified: false, public_enabled: false, affiliate_enabled: false }] },
    outSource: fixtureOut,
    registry: { artists: [] },
    allowedHosts: { seatgeek: ['seatgeek.com'], ticketmaster: ['ticketmaster.com'] },
    today: '2026-07-02'
  });

  const goodRow = {
    slug: 'new-artist', name: 'New Artist', exclusion: null,
    seatgeek: { performer_id: 42, url: 'https://seatgeek.com/new-artist-tickets' },
    ticketmaster: { attraction_id: 'K8vZTEST', url: 'https://www.ticketmaster.com/new-artist-tickets/artist/99' }
  };

  let ctx = base();
  let res = evaluateCandidate(goodRow, ctx);
  ok('clean shell candidate evaluates ok', res.ok);
  ok('providers order is ticketmaster,seatgeek when TM captured', res.ok && res.plan.providers.join(',') === 'ticketmaster,seatgeek');

  const sgOnly = { ...goodRow, ticketmaster: null };
  res = evaluateCandidate(sgOnly, base());
  ok('seatgeek-only candidate evaluates ok', res.ok && res.plan.providers.join(',') === 'seatgeek');

  res = evaluateCandidate({ ...goodRow, slug: 'existing' }, base());
  ok('already-promoted artist is refused', !res.ok);

  res = evaluateCandidate({ ...goodRow, seatgeek: { performer_id: 42, url: 'https://evil.example/new-artist' } }, base());
  ok('off-allowlist seatgeek url is refused', !res.ok);

  res = evaluateCandidate({ ...goodRow, exclusion: 'manifest said no' }, base());
  ok('manifest exclusions are honoured', !res.ok);

  ctx = base();
  const evalRes = evaluateCandidate(goodRow, ctx);
  const applied = applyPlans([evalRes.plan], ctx);
  ok('out.js gains both keys', applied.outSource.includes('"new-artist:seatgeek"') && applied.outSource.includes('"new-artist:ticketmaster"'));
  ok('artists.json record is promoted', ctx.artists[0].indexing_status === 'indexable_with_substantial_content' && ctx.artists[0].verified_provider_count === 2);
  ok('catalog gains the sg-artist row', ctx.catalog.ticket_links.some((tl) => tl.link_id === 'sg-artist-new-artist' && tl.verified === true));
  ok('sg-artist row carries the seatgeek url (required to render the CTA)', ctx.catalog.ticket_links.find((tl) => tl.link_id === 'sg-artist-new-artist')?.url === 'https://seatgeek.com/new-artist-tickets');
  ok('tm shell row is flipped', ctx.catalog.ticket_links[0].verified === true);
  ok('tm shell row gains the ticketmaster url', ctx.catalog.ticket_links[0].url === 'https://www.ticketmaster.com/new-artist-tickets/artist/99');
  ok('registry entry is created verified with both anchors', ctx.registry.artists[0]?.review_status === 'verified' && ctx.registry.artists[0]?.seatgeek_performer_id === 42 && ctx.registry.artists[0]?.ticketmaster_attraction_id === 'K8vZTEST');

  const md = checklistMarkdown([evalRes.plan], 'artifacts/onboarding/batch-test.json', '2026-07-02');
  ok('checklist carries both URLs as tick rows', md.includes('- [ ] Opened https://seatgeek.com/new-artist-tickets') && md.includes('- [ ] Opened https://www.ticketmaster.com/new-artist-tickets/artist/99'));

  const failed = checks.filter(([, pass]) => !pass);
  for (const [label, pass] of checks) console.log(`${pass ? 'PASS' : 'FAIL'}  ${label}`);
  console.log(`\n${checks.length - failed.length}/${checks.length} checks passed.`);
  process.exit(failed.length ? 1 : 0);
}

async function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.selfTest) return selfTest();
  if (!args.manifest) {
    console.error('Usage: node scripts/promote-artists-batch.mjs --manifest <path> [--slugs a,b] [--max n] [--write]');
    process.exit(2);
  }

  const manifestPath = path.resolve(args.manifest);
  const manifest = JSON.parse(await fs.readFile(manifestPath, 'utf8'));
  const [artists, catalog, registry, outSource] = await Promise.all([
    fs.readFile(PATHS.artists, 'utf8').then(JSON.parse),
    fs.readFile(PATHS.catalog, 'utf8').then(JSON.parse),
    fs.readFile(PATHS.registry, 'utf8').then(JSON.parse),
    fs.readFile(PATHS.out, 'utf8'),
  ]);

  // Host allowlists come from out.js itself (single source of truth).
  const { pathToFileURL } = await import('node:url');
  const outModule = await import(pathToFileURL(PATHS.out));
  const allowedHosts = {
    seatgeek: outModule.PROVIDERS?.seatgeek?.allowedDestinationHosts || [],
    ticketmaster: outModule.PROVIDERS?.ticketmaster?.allowedDestinationHosts || [],
  };
  const today = new Date().toISOString().slice(0, 10);

  let rows = Array.isArray(manifest?.artists) ? manifest.artists : [];
  if (args.slugs?.length) rows = rows.filter((r) => args.slugs.includes(slugify(r?.slug)));

  const evaluations = rows.map((row) => evaluateCandidate(row, { artists, catalog, outSource, registry, allowedHosts, today }));
  const promotable = evaluations.filter((e) => e.ok).slice(0, args.max);
  const refused = evaluations.filter((e) => !e.ok);

  console.log(`\nBatch promote preview (${today}) — manifest ${path.relative(root, manifestPath)}`);
  for (const e of promotable) {
    console.log(`  + ${e.slug}: providers [${e.plan.providers.join(', ')}]`);
    console.log(`      seatgeek → ${e.plan.sgUrl}`);
    if (e.plan.tmUrl) console.log(`      ticketmaster (plain) → ${e.plan.tmUrl}`);
  }
  for (const e of refused) {
    console.log(`  - ${e.slug}: SKIPPED`);
    for (const r of e.reasons) console.log(`      · ${r}`);
  }
  if (!promotable.length) {
    console.error('\nNothing promotable — fix the reasons above or the manifest.');
    process.exit(1);
  }

  if (!args.write) {
    console.log(`\nDry run — no files written (${promotable.length} artist(s) would be promoted, cap ${args.max}).`);
    console.log('Human gate: browser-check every URL in the manifest, then re-run with --write.');
    return;
  }

  const plans = promotable.map((e) => e.plan);
  const applied = applyPlans(plans, { artists, catalog, outSource, registry });

  await fs.writeFile(PATHS.artists, `${JSON.stringify(applied.artists, null, 2)}\n`);
  await fs.writeFile(PATHS.catalog, `${JSON.stringify(applied.catalog, null, 2)}\n`);
  await fs.writeFile(PATHS.out, applied.outSource);
  registry.updated_at = today;
  await fs.writeFile(PATHS.registry, `${JSON.stringify(applied.registry, null, 2)}\n`);

  const checklistPath = path.resolve(args.checklistOutput || path.join(root, 'artifacts/onboarding', `checklist-${today}.md`));
  await fs.mkdir(path.dirname(checklistPath), { recursive: true });
  await fs.writeFile(checklistPath, checklistMarkdown(plans, path.relative(root, manifestPath), today));

  console.log('\nEdits applied. Running events:sync (required by stale-sync-guard)…');
  const sync = spawnSync('npm', ['run', 'events:sync'], { stdio: 'inherit', cwd: root });
  if (sync.status !== 0) {
    console.error('events:sync failed — fix before committing (stale-sync-guard will reject the PR)');
    process.exit(1);
  }

  console.log(`\nChecklist written: ${path.relative(root, checklistPath)} — paste it into the PR body.`);
  console.log('Before opening the PR, run:');
  console.log(`  npm run artist:check -- ${plans.map((p) => p.slug).join(' ')}`);
  console.log('  npm run validate:artist-providers && npm run providers:identities:validate && npm run test:mvp');
}

main().catch((err) => {
  console.error(`promote-artists-batch failed: ${err.message}`);
  process.exit(2);
});
