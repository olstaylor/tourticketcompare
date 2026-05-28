#!/usr/bin/env node

const DEFAULT_BASE_URL = 'https://www.tourticketcompare.com';
const baseUrlRaw = process.env.PRODUCTION_BASE_URL || DEFAULT_BASE_URL;

const ROUTES = [
  {
    path: '/',
    expected: {
      title: 'Find Verified Ticket Options for Major Tours | TourTicketCompare',
      canonical: 'https://tourticketcompare.com/',
      description:
        'Find checked ticket links for major tours, read practical buying guidance, and confirm final prices and fees on the ticket provider site.',
      h1: 'Find verified ticket links for major tours'
    }
  },
  {
    path: '/artists',
    expected: {
      title: 'Artists | TourTicketCompare',
      canonical: 'https://tourticketcompare.com/artists',
      description:
        'Browse major artist pages with verified ticket links where available and practical buying guidance on what to check before checkout.',
      h1: 'Artist watchlist'
    }
  },
  {
    path: '/guides',
    expected: {
      title: 'Concert Ticket Buying Guides | TourTicketCompare',
      canonical: 'https://tourticketcompare.com/guides',
      description:
        'Essential guides for comparing ticket prices, checking official vs. resale, deciding when to buy, and confirming final terms before checkout.',
      h1: 'Ticket buying guides'
    }
  },
  {
    path: '/how-it-works',
    expected: {
      title: 'How TourTicketCompare Works',
      canonical: 'https://tourticketcompare.com/how-it-works',
      description:
        'How TourTicketCompare checks official sources, keeps ticket links specific, and gives you clear guidance on what to confirm before checkout.',
      h1: 'How TourTicketCompare works'
    }
  },
  {
    path: '/editorial-policy',
    expected: {
      title: 'Editorial Policy | TourTicketCompare',
      canonical: 'https://tourticketcompare.com/editorial-policy',
      description:
        'The editorial rules TourTicketCompare follows before publishing artist facts, tour pages, provider links, prices, or availability.',
      h1: 'Editorial policy'
    }
  },
  {
    path: '/affiliate-disclosure',
    expected: {
      title: 'Affiliate Disclosure | TourTicketCompare',
      canonical: 'https://tourticketcompare.com/affiliate-disclosure',
      description:
        'How TourTicketCompare uses affiliate links while staying independent, unofficial, and focused on checked ticket destinations.',
      h1: 'Affiliate disclosure'
    }
  },
  {
    path: '/about',
    expected: {
      title: 'About TourTicketCompare',
      canonical: 'https://tourticketcompare.com/about',
      description:
        'TourTicketCompare is an independent, unofficial ticket research site for major live music tours and verified links where available.',
      h1: 'About TourTicketCompare'
    }
  },
  {
    path: '/contact',
    expected: {
      title: 'Contact TourTicketCompare',
      canonical: 'https://tourticketcompare.com/contact',
      description:
        'Contact TourTicketCompare about broken ticket links, incorrect event details, provider-link issues, or general site feedback.',
      h1: 'Contact TourTicketCompare'
    }
  }
];

const HOMEPAGE_TITLE = ROUTES[0].expected.title;
const HOMEPAGE_H1 = ROUTES[0].expected.h1;
const HOMEPAGE_DESCRIPTION = ROUTES[0].expected.description;

function fail(message) {
  console.error(`PRODUCTION HTML VERIFY FAILED: ${message}`);
  process.exitCode = 1;
}

function containsTitle(html, title) {
  return html.includes(`<title>${title}</title>`);
}

function containsCanonical(html, canonical) {
  return html.includes(`<link rel="canonical" href="${canonical}"`);
}

function containsMetaDescription(html, description) {
  return html.includes(`<meta name="description" content="${description}"`);
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

async function main() {
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
