#!/usr/bin/env node

// Post-deploy production route verifier (npm run audit:production-routes).
//
// Confirms that production HTML for each trust/static route carries the
// route-specific <title>, canonical, meta description, and H1, and that no
// non-root route accidentally emits the homepage title/description/H1.
//
// Expected titles, descriptions, and canonicals are DERIVED from the single
// source of truth — functions/_route-metadata.js (TRUST_ROUTES / CANONICAL_ORIGIN)
// — so they cannot silently drift out of sync when route copy changes. Only the
// H1 text (rendered inline in functions/[[path]].js, not stored in route
// metadata) is maintained here, in ROUTE_H1. Run `--self-test` to check the
// wiring offline.

import { TRUST_ROUTES, CANONICAL_ORIGIN } from '../functions/_route-metadata.js';

const DEFAULT_BASE_URL = 'https://www.tourticketcompare.com';
const baseUrlRaw = process.env.PRODUCTION_BASE_URL || DEFAULT_BASE_URL;

// H1 text is rendered inline in functions/[[path]].js and is not part of the
// shared route metadata, so it is kept here explicitly. Keep in sync with the
// <h1> each route renders. Every path listed here must also exist in
// TRUST_ROUTES (asserted by --self-test).
const ROUTE_H1 = {
  '/': 'Compare concert and event ticket prices for the same show.',
  '/artists': 'Artist watchlist',
  '/guides': 'Ticket buying guides',
  '/how-it-works': 'How TourTicketCompare works',
  '/editorial-policy': 'Editorial policy',
  '/affiliate-disclosure': 'Affiliate disclosure',
  '/about': 'About TourTicketCompare',
  '/contact': 'Contact TourTicketCompare'
};

function canonicalForPath(path) {
  // Canonicals always reference the apex origin (see functions/_route-metadata.js);
  // the root path keeps its trailing slash, every other path has none.
  return path === '/' ? `${CANONICAL_ORIGIN}/` : `${CANONICAL_ORIGIN}${path}`;
}

function buildRoutes() {
  return Object.keys(ROUTE_H1).map((path) => {
    const meta = TRUST_ROUTES[path];
    if (!meta || !meta.title || !meta.description) {
      throw new Error(`Route ${path} is missing title/description in TRUST_ROUTES (functions/_route-metadata.js)`);
    }
    return {
      path,
      expected: {
        title: meta.title,
        canonical: canonicalForPath(path),
        description: meta.description,
        h1: ROUTE_H1[path]
      }
    };
  });
}

const ROUTES = buildRoutes();

const HOMEPAGE_TITLE = ROUTES[0].expected.title;
const HOMEPAGE_H1 = ROUTES[0].expected.h1;
const HOMEPAGE_DESCRIPTION = ROUTES[0].expected.description;

function fail(message) {
  console.error(`PRODUCTION HTML VERIFY FAILED: ${message}`);
  process.exitCode = 1;
}

// Mirrors escapeAttr in functions/[[path]].js: the renderer runs the route
// title, meta description, and canonical through it before injecting them into
// the head, so a title such as "A & B" is emitted as "A &amp; B". Expected
// values must be escaped the same way before a raw substring match.
function escapeAttr(value) {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function containsTitle(html, title) {
  return html.includes(`<title>${escapeAttr(title)}</title>`);
}

function containsCanonical(html, canonical) {
  return html.includes(`<link rel="canonical" href="${escapeAttr(canonical)}"`);
}

function containsMetaDescription(html, description) {
  return html.includes(`<meta name="description" content="${escapeAttr(description)}"`);
}

function containsH1(html, h1) {
  return html.toLowerCase().includes(`<h1`) && html.includes(h1);
}

function routeUrl(base, routePath) {
  const baseNormalized = String(base || '').replace(/\/+$/, '');
  return `${baseNormalized}${routePath}`;
}

async function verifyRoute(baseUrl, route) {
  const url = routeUrl(baseUrl, route.path);
  const response = await fetch(url, { redirect: 'follow' });
  const html = await response.text();

  const checks = [];
  checks.push([response.ok, `status ${response.status}`]);
  checks.push([containsTitle(html, route.expected.title), `title mismatch for ${route.path}`]);
  checks.push([containsCanonical(html, route.expected.canonical), `canonical mismatch for ${route.path}`]);
  checks.push([containsMetaDescription(html, route.expected.description), `meta description mismatch for ${route.path}`]);
  checks.push([containsH1(html, route.expected.h1), `h1 mismatch for ${route.path}`]);

  if (route.path !== '/') {
    checks.push([
      !containsTitle(html, HOMEPAGE_TITLE),
      `non-root route ${route.path} appears to contain homepage title`
    ]);
    checks.push([
      !containsMetaDescription(html, HOMEPAGE_DESCRIPTION),
      `non-root route ${route.path} appears to contain homepage meta description`
    ]);
    checks.push([
      !html.includes(`>${HOMEPAGE_H1}</h1>`),
      `non-root route ${route.path} appears to contain homepage H1`
    ]);
  }

  let passed = true;
  for (const [ok, msg] of checks) {
    if (!ok) {
      fail(`${msg}; url=${url}; final_url=${response.url}; status=${response.status}`);
      passed = false;
    }
  }

  if (passed) {
    console.log(`OK ${route.path} status=${response.status} final=${response.url}`);
  }
}

// ── Self-test (offline; no network, no D1) ──────────────────────────────────
// Guards the drift class that this refactor fixes: expected title/description
// must equal the canonical route metadata, and every verified route must carry
// an H1 and matching canonical.
function selfTest() {
  const assert = (condition, message) => {
    if (!condition) throw new Error(message);
  };
  let checks = 0;
  const check = (fn) => { fn(); checks += 1; };

  // Every verified route derives its title/description from TRUST_ROUTES and
  // has an explicit H1 — this is exactly what broke when route copy changed but
  // the verifier kept a stale hardcoded copy.
  check(() => {
    for (const route of ROUTES) {
      assert(TRUST_ROUTES[route.path], `missing TRUST_ROUTES entry for ${route.path}`);
      assert(route.expected.title === TRUST_ROUTES[route.path].title, `title not sourced from metadata for ${route.path}`);
      assert(route.expected.description === TRUST_ROUTES[route.path].description, `description not sourced from metadata for ${route.path}`);
      assert(typeof route.expected.h1 === 'string' && route.expected.h1.length > 0, `missing H1 for ${route.path}`);
      assert(route.expected.canonical === canonicalForPath(route.path), `canonical mismatch for ${route.path}`);
    }
  });

  // Root canonical keeps its trailing slash; non-root paths do not.
  check(() => {
    assert(canonicalForPath('/') === `${CANONICAL_ORIGIN}/`, 'root canonical must keep trailing slash');
    assert(canonicalForPath('/artists') === `${CANONICAL_ORIGIN}/artists`, 'non-root canonical must have no trailing slash');
  });

  // HTML matchers behave on a fixture built the way the renderer emits head
  // markup (title/description/canonical run through escapeAttr).
  check(() => {
    const home = ROUTES[0].expected;
    const html = `<title>${escapeAttr(home.title)}</title><link rel="canonical" href="${escapeAttr(home.canonical)}" /><meta name="description" content="${escapeAttr(home.description)}" /><h1 class="hero-title">${home.h1}</h1>`;
    assert(containsTitle(html, home.title), 'containsTitle should match');
    assert(containsCanonical(html, home.canonical), 'containsCanonical should match');
    assert(containsMetaDescription(html, home.description), 'containsMetaDescription should match');
    assert(containsH1(html, home.h1), 'containsH1 should match');
    assert(!containsTitle(html, 'Some Other Title'), 'containsTitle should not match a different title');
  });

  // Regression: a title containing "&" is escaped to "&amp;" in the rendered
  // HTML, so a raw substring match would miss it. The homepage title carries an
  // ampersand — this is exactly the case the pre-refactor verifier failed on.
  check(() => {
    const rawTitle = 'A & B | TourTicketCompare';
    const renderedHtml = `<title>${escapeAttr(rawTitle)}</title>`;
    assert(renderedHtml.includes('&amp;'), 'fixture should contain an escaped ampersand');
    assert(containsTitle(renderedHtml, rawTitle), 'containsTitle should match an ampersand title against escaped HTML');
    assert(!renderedHtml.includes(`<title>${rawTitle}</title>`), 'a raw (unescaped) match would not find the escaped title');
  });

  // Negative homepage guards: a clean non-root page passes; a page that leaks a
  // homepage marker is caught.
  check(() => {
    const clean = `<title>${escapeAttr(ROUTES[1].expected.title)}</title><h1>${ROUTES[1].expected.h1}</h1>`;
    assert(!containsTitle(clean, HOMEPAGE_TITLE), 'clean non-root page must not contain homepage title');
    assert(!clean.includes(`>${HOMEPAGE_H1}</h1>`), 'clean non-root page must not contain homepage H1');
    const leaky = `<title>${escapeAttr(HOMEPAGE_TITLE)}</title><h1>${HOMEPAGE_H1}</h1>`;
    assert(containsTitle(leaky, HOMEPAGE_TITLE), 'leaky page should trip the homepage-title guard');
    assert(leaky.includes(`>${HOMEPAGE_H1}</h1>`), 'leaky page should trip the homepage-H1 guard');
  });

  console.log(`Production route HTML verifier self-test passed (${checks} checks).`);
}

async function main() {
  if (process.argv.slice(2).includes('--self-test')) {
    selfTest();
    return;
  }

  let parsed;
  try {
    parsed = new URL(baseUrlRaw);
  } catch (error) {
    console.error(`PRODUCTION HTML VERIFY FAILED: invalid PRODUCTION_BASE_URL '${baseUrlRaw}': ${error.message}`);
    process.exit(2);
  }
  if (!/^https?:$/.test(parsed.protocol)) {
    console.error(`PRODUCTION HTML VERIFY FAILED: PRODUCTION_BASE_URL must use http(s), got '${parsed.protocol}'`);
    process.exit(2);
  }

  console.log(`Verifying production route HTML against ${parsed.toString().replace(/\/$/, '')}`);
  for (const route of ROUTES) {
    // eslint-disable-next-line no-await-in-loop
    await verifyRoute(parsed.toString(), route);
  }

  if (process.exitCode && process.exitCode !== 0) return;
  console.log(`OK: verified ${ROUTES.length} production routes.`);
}

main().catch((error) => {
  console.error(`PRODUCTION HTML VERIFY FAILED: ${error?.message || String(error)}`);
  process.exit(1);
});
