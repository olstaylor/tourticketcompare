import { TRUST_ROUTES, GUIDE_ROUTES, OLD_GUIDE_REDIRECTS } from "./_route-metadata.js";

const PUBLIC_HTML_ROUTES = new Set([
  "/artists",
  "/guides",
  "/how-it-works",
  "/affiliate-disclosure",
  "/editorial-policy",
  "/about",
  "/contact"
]);

const RESERVED_PREFIXES = ["/api/", "/data/"];
const RESERVED_FILES = new Set(["/app.js", "/styles.css", "/favicon.svg", "/robots.txt", "/sitemap.xml"]);

function escapeAttr(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeHtml(value) {
  return escapeAttr(value).replace(/'/g, "&#39;");
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function loadCatalog(env) {
  try {
    const response = await env.ASSETS.fetch(new Request("https://assets.local/data/catalog.json"));
    if (!response.ok) return { artists: [], tours: [] };
    const data = await response.json();
    return data && typeof data === "object" ? data : { artists: [], tours: [] };
  } catch (error) {
    return { artists: [], tours: [] };
  }
}

async function loadEvents(env) {
  try {
    const response = await env.ASSETS.fetch(new Request("https://assets.local/data/events.json"));
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    return [];
  }
}

function normalizePath(pathname) {
  if (pathname !== "/" && pathname.endsWith("/")) return pathname.replace(/\/+$/, "");
  return pathname || "/";
}

function findArtist(catalog, slug) {
  return (catalog.artists || []).find((row) => slugify(row.slug) === slug);
}

function findTour(catalog, artistSlug, tourSlug) {
  return (catalog.tours || []).find((row) => slugify(row.artist_slug) === artistSlug && slugify(row.slug) === tourSlug);
}

async function routeForPath(pathname, env) {
  const path = normalizePath(pathname);
  if (OLD_GUIDE_REDIRECTS[path]) return { type: "redirect", location: OLD_GUIDE_REDIRECTS[path] };
  if (path === "/" || PUBLIC_HTML_ROUTES.has(path)) return { type: "static", path, ...TRUST_ROUTES[path] };
  if (GUIDE_ROUTES[path]) {
    return {
      type: "guide",
      path,
      indexable: true,
      ...GUIDE_ROUTES[path],
      breadcrumb: [
        { name: "Guides", path: "/guides" },
        { name: GUIDE_ROUTES[path].title.replace(" | TourTicketCompare", ""), path }
      ]
    };
  }

  const catalog = await loadCatalog(env);
  const artistMatch = path.match(/^\/artists\/([a-z0-9-]+)$/);
  if (artistMatch) {
    const artist = findArtist(catalog, artistMatch[1]);
    if (!artist) return null;
    return {
      type: "artist",
      path,
      indexable: true,
      title: artist.seo_title || `${artist.name} Tickets | Options & Availability`,
      description:
        artist.meta_description ||
        `Check ${artist.name} watchlist notes and verified ticket links where available. No fake prices or invented tour dates.`,
      artist,
      breadcrumb: [
        { name: "Artists", path: "/artists" },
        { name: artist.name, path }
      ]
    };
  }

  const ticketDuplicateMatch = path.match(/^\/artists\/([a-z0-9-]+)\/tickets$/);
  if (ticketDuplicateMatch) {
    const artist = findArtist(catalog, ticketDuplicateMatch[1]);
    if (artist) return { type: "redirect", location: `/artists/${artist.slug}` };
  }

  const tourMatch = path.match(/^\/artists\/([a-z0-9-]+)\/([a-z0-9-]+)$/);
  if (tourMatch) {
    const artist = findArtist(catalog, tourMatch[1]);
    const tour = artist ? findTour(catalog, artist.slug, tourMatch[2]) : null;
    if (!artist || !tour) return null;
    return {
      type: "tour",
      path,
      indexable: tour.verified === true,
      title: tour.seo_title || `${tour.tour_name} Tickets | TourTicketCompare`,
      description: tour.meta_description || `Verified ticket information for ${tour.tour_name} by ${artist.name}.`,
      artist,
      tour,
      breadcrumb: [
        { name: "Artists", path: "/artists" },
        { name: artist.name, path: `/artists/${artist.slug}` },
        { name: tour.tour_name, path }
      ]
    };
  }

  const legacyTicketRoute = path.match(/^\/([a-z0-9-]+)-tickets(?:-[a-z0-9-]+)?$/);
  if (legacyTicketRoute) {
    const artist = findArtist(catalog, legacyTicketRoute[1]);
    if (artist) return { type: "redirect", location: `/artists/${artist.slug}` };
  }

  const legacyArtistRoute = path.match(/^\/([a-z0-9-]+)$/);
  if (legacyArtistRoute) {
    const artist = findArtist(catalog, legacyArtistRoute[1]);
    if (artist) return { type: "redirect", location: `/artists/${artist.slug}` };
  }

  return null;
}

function baseSchema(origin) {
  return [
    {
      "@type": "Organization",
      name: "TourTicketCompare",
      url: `${origin}/`
    },
    {
      "@type": "WebSite",
      name: "TourTicketCompare",
      url: `${origin}/`,
      description: "Independent ticket research for major live music tours with verified ticket links where available."
    }
  ];
}

function faqSchema(route) {
  const questions =
    route.type === "artist"
      ? [
          [
            `Does this page list ${route.artist.name} tour dates?`,
            "No. This page does not publish tour dates unless event details have been verified. Use the verified ticket link, when available, to check current platform information."
          ],
          [`Does TourTicketCompare sell ${route.artist.name} tickets?`, "No. TourTicketCompare does not sell tickets directly."],
          ["Are prices shown here?", "No. Prices should appear only when live provider data is verified and timestamped."]
        ]
      : [
          ["Is TourTicketCompare official?", "No. TourTicketCompare is independent and unofficial."],
          ["Why are some providers hidden?", "Ticket buttons are hidden until the destination can be verified."],
          ["Can final prices and fees change?", "Yes. External ticketing sites set their own prices, fees, availability, and checkout terms."]
        ];

  return {
    "@type": "FAQPage",
    mainEntity: questions.map(([name, answer]) => ({
      "@type": "Question",
      name,
      acceptedAnswer: { "@type": "Answer", text: answer }
    }))
  };
}

function breadcrumbSchema(route, origin) {
  const items = [{ name: "Home", path: "/" }].concat(route.breadcrumb || []);
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${origin}${item.path}`
    }))
  };
}

function artistSchema(route, origin) {
  const type = route.artist.slug === "bts" ? "MusicGroup" : "Person";
  return {
    "@type": type,
    name: route.artist.name,
    url: `${origin}${route.path}`,
    sameAs: route.artist.official_website ? [route.artist.official_website] : undefined,
    description: route.artist.factual_summary
  };
}

function articleSchema(route, origin) {
  return {
    "@type": "Article",
    headline: route.title.replace(" | TourTicketCompare", ""),
    description: route.description,
    mainEntityOfPage: `${origin}${route.path}`,
    publisher: {
      "@type": "Organization",
      name: "TourTicketCompare",
      url: `${origin}/`
    }
  };
}

function routeSchema(route, origin) {
  const graph = baseSchema(origin);
  if (route.breadcrumb) graph.push(breadcrumbSchema(route, origin));
  if (route.type === "artist") graph.push(artistSchema(route, origin), faqSchema(route));
  if (route.type === "guide") graph.push(articleSchema(route, origin), faqSchema(route));
  if (route.faq) graph.push(faqSchema(route));
  return { "@context": "https://schema.org", "@graph": graph };
}

function providerEnabled(catalog, providerSlug) {
  return (catalog.providers || []).some((provider) => slugify(provider.slug) === providerSlug && provider.public_enabled === true);
}

function ticketLinksForArtist(catalog, artistSlug) {
  return (catalog.ticket_links || []).filter(
    (item) =>
      slugify(item.artist_slug) === artistSlug &&
      item.verified === true &&
      item.public_enabled === true &&
      item.affiliate_enabled === true &&
      providerEnabled(catalog, slugify(item.provider))
  );
}

function anchor(label, href, className = "text-link") {
  return `<a class="${escapeAttr(className)}" href="${escapeAttr(href)}">${escapeHtml(label)}</a>`;
}

function renderBreadcrumbHtml(route) {
  const items = [{ name: "Home", path: "/" }].concat(route.breadcrumb || []);
  return `<nav class="breadcrumbs" aria-label="Breadcrumb"><ol>${items
    .map((item, index) => {
      if (index === items.length - 1) return `<li aria-current="page">${escapeHtml(item.name)}</li>`;
      return `<li>${anchor(item.name, item.path, "")}</li>`;
    })
    .join("")}</ol></nav>`;
}

function renderArtistLinks(catalog) {
  return `<div class="artist-card-grid">${(catalog.artists || [])
    .map(
      (artist) => {
        const hasArtistPage = ticketLinksForArtist(catalog, artist.slug).length > 0;
        return (
        `<article class="artist-card"><h3>${escapeHtml(artist.name)}</h3><p class="muted">${escapeHtml(
          artist.short_description || "Artist watchlist notes."
        )}</p><p class="status-badge">${hasArtistPage ? "Artist ticket page available" : "No checked ticket link yet"}</p><p class="card-status">${
          hasArtistPage
            ? "Artist-level links are separate from dated event links. Event-specific buttons appear only on verified show cards."
            : "Use the artist page for guidance. Ticket buttons appear only when a destination can be checked."
        }</p>${anchor(
          hasArtistPage ? "View verified link" : "View ticket guidance",
          `/artists/${artist.slug}`,
          hasArtistPage ? "button button-primary" : "button button-secondary"
        )}</article>`
        );
      }
    )
    .join("")}</div>`;
}

function renderGuideLinks() {
  return `<div class="card-grid guide-grid">${Object.entries(GUIDE_ROUTES)
    .map(
      ([path, guide]) =>
        `<article class="info-card"><h3>${escapeHtml(guide.h1)}</h3><p>${escapeHtml(guide.description)}</p>${anchor(
          "Read guide",
          path,
          "text-link"
        )}</article>`
    )
    .join("")}</div>`;
}

function renderProviderFallback(catalog, artist, surface) {
  const links = ticketLinksForArtist(catalog, artist.slug);
  if (!links.length) {
    return `<section class="provider-panel"><h2>Artist-level ticket pages</h2><p class="muted">No checked artist-level ticket page is available yet. We hide ticket buttons until we can verify the destination.</p></section>`;
  }
  const cards = links
    .map((item) => {
      const provider = slugify(item.provider);
      const label = provider === "ticketmaster" ? "Open Ticketmaster artist page" : `Open ${item.provider} artist page`;
      const params = new URLSearchParams({
        artistSlug: artist.slug,
        provider,
        sourcePath: `/artists/${artist.slug}`,
        surface
      });
      return `<article class="provider-card"><h3>${escapeHtml(item.provider)}</h3><p>This is an artist-level page, not a date-specific event link. Provider sets prices, fees, availability, and checkout terms.</p>${anchor(
        label,
        `/api/out?${params.toString()}`,
        "button button-primary"
      )}</article>`;
    })
    .join("");
  return `<section class="provider-panel"><h2>Artist-level ticket pages</h2><p class="muted">These links go to provider artist pages. Event-specific links appear only on dated show cards when verified.</p><div class="provider-actions">${cards}</div><p class="disclosure-note">Affiliate link. We may earn a commission at no extra cost to you.</p><p class="disclosure-note">Final prices, fees and availability are confirmed on the ticketing platform.</p></section>`;
}

function futureShowsForArtist(events, artistSlug, limit) {
  const now = Date.now();
  const slug = slugify(artistSlug);
  return events
    .filter((ev) => ev && typeof ev === "object" && slugify(ev.artist_slug) === slug)
    .map((ev) => ({
      id: String(ev.id || "").trim(),
      event_name: String(ev.event_name || ev.name || "").trim(),
      dateTimeISO: String(ev.dateTimeISO || ev.datetime_iso || "").trim(),
      city: String(ev.city || "").trim(),
      venue: String(ev.venue || "").trim(),
      ticketmaster_url: String(ev.ticketmaster_url || "").trim()
    }))
    .filter((show) => show.id && show.dateTimeISO && Number.isFinite(Date.parse(show.dateTimeISO)))
    .filter((show) => Date.parse(show.dateTimeISO) >= now)
    .sort((a, b) => Date.parse(a.dateTimeISO) - Date.parse(b.dateTimeISO))
    .slice(0, limit);
}

function formatShowDateServer(iso) {
  if (!iso) return "";
  const parsed = new Date(iso);
  if (!Number.isFinite(parsed.getTime())) return "";
  try {
    return parsed.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      timeZone: "UTC"
    });
  } catch (error) {
    return "";
  }
}

function showLocationServer(show) {
  return [show.city, show.venue].filter((v) => String(v || "").trim()).join(" · ");
}

function safeShowTicketUrl(value) {
  const raw = String(value || "").trim();
  if (!raw) return null;
  try {
    const parsed = new URL(raw);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return null;
    const host = parsed.hostname.toLowerCase();
    if (host === "localhost" || host === "127.0.0.1") return null;
    if (/example/.test(host) || raw.includes("placeholder")) return null;
    return raw;
  } catch (error) {
    return null;
  }
}

function renderShowCardServerHtml(show) {
  const date = formatShowDateServer(show.dateTimeISO);
  const location = showLocationServer(show);
  const validUrl = safeShowTicketUrl(show.ticketmaster_url);
  const ctaHtml = validUrl && show.id
    ? `${anchor("View event ticket link", `/api/out?${new URLSearchParams({ showId: show.id, provider: "ticketmaster" }).toString()}`, "button button-primary")}<p class="disclosure-note">External ticketing sites set prices, fees, availability, and checkout terms.</p>`
    : `<p class="disclosure-note">No event-specific ticket link is available for this date yet.</p>`;
  return `<article class="info-card show-card"><h3>${escapeHtml(show.event_name || "Verified show")}</h3>${date ? `<p class="card-status">${escapeHtml(date)}</p>` : ""}<p class="muted">${escapeHtml(location || "City and venue details are shown only when verified by the source.")}</p>${ctaHtml}</article>`;
}

function renderShowBoardServerHtml(shows) {
  const gridContent = shows.length
    ? shows.map(renderShowCardServerHtml).join("")
    : `<p class="muted empty-state">No event-specific ticket link is available here yet. We only show ticket buttons when the show and destination can be verified.</p>`;
  return `<section class="section-grid show-board" aria-labelledby="artistShowBoard"><div class="section-intro"><h2 id="artistShowBoard">Verified event links</h2><p>Each card shows one checked event date and links to the ticket page for that exact show when one is available.</p></div><div class="card-grid show-card-grid" data-show-grid="true">${gridContent}</div></section>`;
}

function renderMainContent(route, catalog, events = []) {
  if (route.type === "artist") {
    const artist = route.artist;
    return `<main id="mainContent"><section class="content-page artist-page" aria-labelledby="artistTitle">${renderBreadcrumbHtml(
      route
    )}<h1 id="artistTitle">${escapeHtml(
      artist.name
    )} ticket links and buying guidance</h1><p class="lead">Find checked ticket links for ${escapeHtml(
      artist.name
    )} when available, plus practical guidance before you leave for a provider site.</p>${renderShowBoardServerHtml(futureShowsForArtist(events, artist.slug, 6))}${renderProviderFallback(
      catalog,
      artist,
      "artist_hero"
    )}<section class="split-section"><div><h2>About ${escapeHtml(
      artist.name
    )}</h2><p>${escapeHtml(artist.factual_summary)}</p></div><div><h2>Verified destination status</h2><p>${escapeHtml(
      artist.ticket_buying_notes
    )}</p><p class="disclosure-note">We do not sell tickets directly. We send users to external ticketing platforms only when the link is verified.</p></div></section><section class="nested-panel"><h2>Ticket buying checklist</h2><ul class="check-list"><li>Check the final price including fees before paying.</li><li>Check the seat location, section, row, and any view restrictions.</li><li>Check resale terms and buyer protections if the ticket is listed by a third party.</li><li>Check the delivery method and expected transfer timing.</li><li>Check refund, cancellation, and event-change terms on the provider site.</li></ul></section><section class="nested-panel"><h2>About this page</h2><p>This page does not list unverified tour dates, invented prices, speculative venues, or unchecked checkout links. Ticket details should be confirmed on the ticketing platform before purchase.</p></section><section class="nested-panel"><h2>Useful links</h2><div class="mini-link-grid">${anchor(
      "All artists",
      "/artists",
      "mini-link"
    )}${anchor("Ticket buying guides", "/guides", "mini-link")}${anchor(
      "How it works",
      "/how-it-works",
      "mini-link"
    )}${anchor(
      "Affiliate disclosure",
      "/affiliate-disclosure",
      "mini-link"
    )}</div></section><section class="nested-panel faq-panel"><h2>${escapeHtml(
      artist.name
    )} ticket FAQ</h2><details><summary>Does this page list ${escapeHtml(
      artist.name
    )} tour dates?</summary><p>No. This page does not publish tour dates unless event details have been verified. Use the verified ticket link, when available, to check current platform information.</p></details><details><summary>Does TourTicketCompare sell ${escapeHtml(
      artist.name
    )} tickets?</summary><p>No. TourTicketCompare does not sell tickets directly. We link to external ticketing platforms when a destination is verified.</p></details><details><summary>Are prices shown here?</summary><p>No. Prices should appear only when live provider data is verified and timestamped. Final prices and fees are controlled by the ticket platform.</p></details></section></section></main>`;
  }

  if (route.type === "guide") {
    return `<main id="mainContent"><section class="content-page guide-page" aria-labelledby="guideTitle">${renderBreadcrumbHtml(
      route
    )}<h1 id="guideTitle">${escapeHtml(route.h1 || route.title.replace(" | TourTicketCompare", ""))}</h1><p class="lead">${escapeHtml(
      route.description
    )}</p><section class="nested-panel"><h2>What this guide covers</h2><p>This guide explains what to check, red flags to avoid, what to confirm before buying, and what TourTicketCompare does and does not verify. Final prices, fees, availability, delivery, and checkout terms should always be confirmed on the provider site.</p></section><section class="nested-panel"><h2>Related reading</h2><p>Use an artist page to look for checked event links where available, read how TourTicketCompare decides what to publish, or review how affiliate links are disclosed before leaving for a provider site.</p></section><div class="action-row">${anchor(
      "Find an artist",
      "/artists",
      "button button-primary"
    )}${anchor("How it works", "/how-it-works", "button button-secondary")}${anchor(
      "Affiliate disclosure",
      "/affiliate-disclosure",
      "button button-secondary"
    )}</div></section></main>`;
  }

  if (route.path === "/artists") {
    return `<main id="mainContent"><section class="content-page" aria-labelledby="artistsTitle">${renderBreadcrumbHtml(
      route
    )}<h1 id="artistsTitle">Artist watchlist</h1><p>Find major artists, see whether checked ticket links are available, and use the buying guidance before you leave for a ticket provider.</p><p>A listed artist does not mean current tickets, prices, venues, or availability are confirmed. Ticket buttons appear only when the destination has been checked.</p>${renderArtistLinks(
      catalog
    )}</section></main>`;
  }

  if (route.path === "/guides") {
    return `<main id="mainContent"><section class="content-page" aria-labelledby="guidesTitle">${renderBreadcrumbHtml(
      route
    )}<h1 id="guidesTitle">Ticket buying guides</h1><p>Each guide helps you make one safe decision before you buy: comparing final totals, checking if a ticket is official or resale, deciding when to buy, and confirming terms. Use them to avoid overpaying, spot misleading listings, and feel confident about checkout.</p><section class="nested-panel"><h2>Essential checks before checkout</h2><ul class="check-list"><li>Check that the artist, date, venue, and seat details match your show.</li><li>Compare the final checkout total after fees, not just the first displayed price.</li><li>Review delivery, refund, and resale terms on the provider site before paying.</li><li>Look for official sources or verified resale marketplaces; avoid unmatched listings and social media sellers.</li></ul></section>${renderGuideLinks()}<div class="action-row">${anchor(
      "Find an artist",
      "/artists",
      "button button-primary"
    )}${anchor("How it works", "/how-it-works", "button button-secondary")}${anchor(
      "Affiliate disclosure",
      "/affiliate-disclosure",
      "button button-secondary"
    )}</div></section></main>`;
  }

  if (route.path === "/how-it-works") {
    return `<main id="mainContent"><section class="content-page" aria-labelledby="pageTitle">${renderBreadcrumbHtml(
      route
    )}<h1 id="pageTitle">How TourTicketCompare works</h1><p class="lead">TourTicketCompare is an independent, unofficial ticket research site that helps fans find checked ticket options and buying guidance. We do not sell tickets, do not compare prices, and do not send users to weak generic links.</p><section class="nested-panel"><h2>What TourTicketCompare does</h2><ul class="check-list"><li>Organises verified ticket links from official providers like Ticketmaster.</li><li>Shows checked event-specific links only when the destination can be verified.</li><li>Provides practical buying guidance on comparing totals, understanding fees, and confirming terms.</li><li>Displays a clear empty state when no verified ticket link exists for an event.</li></ul></section><section class="nested-panel"><h2>What TourTicketCompare does not do</h2><ul class="check-list"><li>Sell tickets directly.</li><li>Compare prices across providers or claim one site is cheaper.</li><li>Display prices without verified, timestamped provider data.</li><li>Send users to generic artist pages when no event-specific link is verified.</li><li>Scrape unofficial sources or publish unverified tour dates.</li></ul></section><section class="nested-panel"><h2>How ticket links are handled</h2><p>Ticket buttons on event cards link to external ticketing platforms. Some links may be affiliate links, which means we may earn a commission if you purchase through them at no extra cost to you.</p><p class="disclosure-note">Affiliate relationships do not control which links we show. affiliate links are handled safely and we only publish ticket buttons when the destination can be verified.</p></section><section class="nested-panel"><h2>What you should confirm on the ticket provider site</h2><ul class="check-list"><li>Final price including all fees and taxes.</li><li>Exact seat or standing area location.</li><li>Delivery method and timing (instant, email transfer, shipped).</li><li>Refund, resale, and cancellation terms.</li><li>Event date, venue, and artist name match your intended show.</li></ul></section><section class="nested-panel"><h2>What we verify before showing a link</h2><p>We check that the event card artist, date, and venue match verified source data. We validate each ticket link destination before showing a button. We do not show event cards or ticket links until the information can be checked.</p></section><section class="nested-panel faq-panel"><h2>FAQ</h2><details><summary>Is TourTicketCompare official?</summary><p>No. TourTicketCompare is independent and unofficial.</p></details><details><summary>Does the site sell tickets directly?</summary><p>No. Ticket buying happens on the external provider site.</p></details><details><summary>Why are some ticket buttons missing?</summary><p>Ticket buttons are hidden until the destination can be verified.</p></details><details><summary>Can final prices change?</summary><p>Yes. External ticketing sites set their own prices, fees, availability, and checkout terms.</p></details></section><div class="action-row">${anchor(
      "Find an artist",
      "/artists",
      "button button-primary"
    )}${anchor("Read buying guides", "/guides", "button button-secondary")}${anchor(
      "Affiliate disclosure",
      "/affiliate-disclosure",
      "button button-secondary"
    )}</div></section></main>`;
  }

  if (route.path === "/affiliate-disclosure") {
    return `<main id="mainContent"><section class="content-page" aria-labelledby="affiliateTitle">${renderBreadcrumbHtml(
      route
    )}<h1 id="affiliateTitle">Affiliate disclosure</h1><p class="lead">TourTicketCompare is an independent, unofficial ticket research site. Some ticket links are affiliate links, which means we may earn a commission when you buy. You do not pay extra because of our affiliate relationship.</p><section class="nested-panel"><h2>What affiliate links mean</h2><ul class="check-list"><li>We link to ticket providers and may earn commission when you complete a purchase.</li><li>The commission does not increase your ticket price or fees.</li><li>We disclose which links are affiliate links so you know our relationship.</li><li>Affiliate relationships do not decide which links we show or which providers we recommend.</li></ul></section><section class="nested-panel"><h2>Why it does not weaken our verification</h2><p>Affiliate relationships do not control which links we show. We do not publish fake prices, invented dates, fictional venues, unverified providers, or rankings we cannot support just because we earn a commission. We only show ticket buttons when we can check the artist, event, and destination. If a link cannot be verified, it should not appear as a ticket option.</p></section><section class="nested-panel"><h2>How we handle different link types</h2><ul class="check-list"><li>Official sources: Artist-level pages on official ticketing sites (typically Ticketmaster).</li><li>Resale marketplaces: Verified platforms like SeatGeek and Vivid Seats where sellers list real tickets.</li><li>Affiliate links: Verified destination URLs that may generate commission when you buy.</li><li>Guidance: Buying guides and checklists are informational; we do not sell tickets directly.</li></ul></section><section class="nested-panel"><h2>What you confirm with the provider</h2><ul class="check-list"><li>Final ticket prices, fees, taxes, and delivery charges.</li><li>Seat location, view restrictions, and physical details.</li><li>Inventory and availability of your specific seats.</li><li>Refund, cancellation, transfer, and resale rules.</li><li>Payment security and checkout terms.</li></ul></section><section class="nested-panel"><h2>Before you complete a purchase</h2><p>Read the provider's terms and conditions. Confirm the event date, venue, seat information, final total, delivery method, refund policy, and transfer rules. These details come from the ticket provider, not from TourTicketCompare.</p></section><section class="nested-panel"><h2>How affiliate commissions support us</h2><p>When you click through an affiliate link and complete a purchase, the provider may pay us a commission. This commission helps us maintain the site and continue providing free buying guidance. It does not cost you any extra.</p></section><div class="action-row">${anchor(
      "Find an artist",
      "/artists",
      "button button-primary"
    )}${anchor("Read buying guides", "/guides", "button button-secondary")}</div></section></main>`;
  }

  if (route.path === "/contact") {
    return `<main id="mainContent"><section class="content-page" aria-labelledby="contactTitle">${renderBreadcrumbHtml(
      route
    )}<h1 id="contactTitle">Contact TourTicketCompare</h1><p class="lead">Use this page to report broken links, incorrect event details, provider-link issues, or general feedback about TourTicketCompare.</p><section class="nested-panel"><h2>Where to contact us</h2><p>For quick public updates or messages, contact ${anchor(
      "@RenaissanceWT",
      "https://x.com/RenaissanceWT",
      "text-link"
    )} or ${anchor(
      "@CowboyCarterWT",
      "https://x.com/CowboyCarterWT",
      "text-link"
    )} on X. You can also email ${anchor(
      "hello@tourticketcompare.com",
      "mailto:hello@tourticketcompare.com",
      "text-link"
    )}.</p></section><section class="nested-panel"><h2>Useful reasons to get in touch</h2><ul class="check-list"><li>A ticket button is broken or opens the wrong destination.</li><li>An event date, venue, city, or artist detail appears incorrect.</li><li>A provider link works differently than expected.</li><li>You have general feedback about the site, guides, or artist pages.</li></ul></section><section class="nested-panel"><h2>What to include</h2><p>Please include the artist name, event date, venue or city, the page URL, the ticket link if relevant, and a short explanation of what looks wrong.</p></section><section class="nested-panel"><h2>What we cannot handle</h2><p>TourTicketCompare does not sell tickets and cannot help with ticket orders, refunds, transfers, delivery problems, payment issues, or provider account access. For those issues, contact the ticket provider shown at checkout.</p></section><div class="action-row">${anchor(
      "Find an artist",
      "/artists",
      "button button-primary"
    )}${anchor("Read buying guides", "/guides", "button button-secondary")}</div></section></main>`;
  }

  const simplePages = {
    "/about": [
      "About TourTicketCompare",
      "TourTicketCompare is an independent, unofficial ticket research site made by fans for fans of major live music tours.",
      "The site helps fans find checked ticket options where available, understand buying risks, and avoid fake prices, invented dates, and dead-end listings. We do not sell tickets directly."
    ],
    "/editorial-policy": [
      "Editorial policy",
      "TourTicketCompare publishes artist and ticket-link information only when the source can be checked.",
      "We use official artist, ticketing, and approved affiliate sources where available. We do not scrape, invent tour dates, publish fake prices, or add Event schema without verified event data."
    ],
  };

  if (simplePages[route.path]) {
    const [h1, lead, body] = simplePages[route.path];
    return `<main id="mainContent"><section class="content-page" aria-labelledby="pageTitle">${renderBreadcrumbHtml(
      route
    )}<h1 id="pageTitle">${escapeHtml(h1)}</h1><p class="lead">${escapeHtml(lead)}</p><p>${escapeHtml(
      body
    )}</p><div class="action-row">${anchor("Find an artist", "/artists", "button button-primary")}${anchor(
      "Read buying guides",
      "/guides",
      "button button-secondary"
    )}</div></section></main>`;
  }

  return `<main id="mainContent"><section class="hero-panel" aria-labelledby="heroTitle"><div class="hero-copy-block"><h1 class="hero-title" id="heroTitle">Find verified ticket links for major tours</h1><p class="hero-subcopy">Find checked links to ticket providers, read practical buying guidance, and confirm final prices and fees at checkout.</p><div class="action-row">${anchor(
    "Browse artists",
    "#featured-artists",
    "button button-primary"
  )}${anchor("Read buying guides", "/guides", "button button-secondary")}</div></div></section><section class="section-grid search-section" aria-labelledby="searchSectionTitle"><div class="section-intro"><h2 id="searchSectionTitle">Search artists, events, and guides</h2><p>Search what has been added to our verified dataset. We only surface artists, events, and guides that have been checked and published.</p></div><div style="text-align:center;margin:18px 0"><p class="muted">Search is available when you load this page in your browser.</p></div></section><section class="section-grid what-you-can-do" aria-labelledby="whatYouCanDoTitle"><div class="section-intro"><h2 id="whatYouCanDoTitle">What you can do here</h2></div><div class="card-grid"><article class="info-card"><h3>See artist pages and checked event links</h3><p>Browse artist pages and verified event links where available.</p></article><article class="info-card"><h3>Learn how to compare checkout totals</h3><p>Understand how to compare final prices, fees, provider terms, and refund rules.</p></article><article class="info-card"><h3>Understand checked links</h3><p>See how we verify ticket links and what to expect at checkout.</p></article></div></section><section id="featured-artists" class="section-grid" aria-labelledby="homeArtistsTitle"><div class="section-intro"><h2 id="homeArtistsTitle">Featured artists</h2><p>Browse artist pages and checked event links where available.</p></div>${renderArtistLinks(
    catalog
  )}</section><section class="section-grid" aria-labelledby="homeBuyingGuidesTitle"><div class="section-intro"><h2 id="homeBuyingGuidesTitle">Buying guides</h2><p>Practical guides for comparing final prices, avoiding risky listings, and understanding ticket provider terms.</p></div>${renderGuideLinks()}<div class="action-row">${anchor(
    "View all guides",
    "/guides",
    "button button-secondary"
  )}</div></section><section class="section-grid trust-section" aria-labelledby="trustTitle"><div class="section-intro"><h2 id="trustTitle">Trust &amp; transparency</h2></div><div class="nested-panel"><p>TourTicketCompare is independent and unofficial. We do not sell tickets directly.</p><p>Some outbound links may be affiliate links, which means we may earn a commission if you click through and buy tickets. This does not increase your ticket price or fees.</p><p>Final price, fees, availability, seat details, refund rules, and checkout terms are confirmed by the provider on their site.</p><p>Learn more: ${anchor("How we work", "/how-it-works", "text-link")} • ${anchor("Affiliate disclosure", "/affiliate-disclosure", "text-link")}</p></div></section></main>`;
}

function injectRoute(html, route, origin, catalog, events = []) {
  const canonicalUrl = `${origin}${route.path}`;
  const robots = route.indexable ? "index,follow,max-image-preview:large" : "noindex,follow";
  let next = html;
  next = next.replace(/<title>[^<]*<\/title>/i, `<title>${escapeAttr(route.title)}</title>`);
  next = next.replace(
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${escapeAttr(route.description)}" />`
  );
  next = next.replace(
    /<meta\s+name="robots"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="robots" content="${robots}" />`
  );
  next = next.replace(
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${escapeAttr(route.title)}" />`
  );
  next = next.replace(
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${escapeAttr(route.description)}" />`
  );
  next = next.replace(
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${escapeAttr(canonicalUrl)}" />`
  );
  next = next.replace(
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:title" content="${escapeAttr(route.title)}" />`
  );
  next = next.replace(
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:description" content="${escapeAttr(route.description)}" />`
  );
  next = next.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${escapeAttr(canonicalUrl)}" />`
  );
  next = next.replace(
    /<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/i,
    `<script type="application/ld+json">${JSON.stringify(routeSchema(route, origin))}</script>`
  );
  next = next.replace(/<main\s+id="mainContent">[\s\S]*?<\/main>/i, renderMainContent(route, catalog, events));
  return next;
}

function renderNotFoundHtml(html, pathname, origin) {
  const route = {
    type: "not-found",
    path: pathname,
    title: "Page Not Found | TourTicketCompare",
    description: "This TourTicketCompare page is not published.",
    indexable: false
  };
  let next = injectRoute(html, route, origin, { artists: [], ticket_links: [], providers: [] });
  next = next.replace(
    /<main\s+id="mainContent">[\s\S]*?<\/main>/i,
    `<main id="mainContent"><section class="content-page" aria-labelledby="notFoundTitle"><h1 id="notFoundTitle">Page not found</h1><p>We could not find that page. Use the artist index or guides to find current public pages.</p><div class="action-row">${anchor(
      "Find an artist",
      "/artists",
      "button button-primary"
    )}${anchor("Return home", "/", "button button-secondary")}</div></section></main>`
  );
  return next;
}

export async function onRequest(context) {
  const { request, env, next } = context;
  const url = new URL(request.url);
  const pathname = normalizePath(url.pathname);

  if (RESERVED_PREFIXES.some((prefix) => pathname.startsWith(prefix)) || RESERVED_FILES.has(pathname)) return next();

  const route = await routeForPath(pathname, env);
  if (!route && /\.[a-z0-9]+$/i.test(pathname)) return next();
  const indexResponse = await env.ASSETS.fetch(new Request(new URL("/", request.url), request));
  if (!indexResponse.ok) return next();

  const html = await indexResponse.text();
  if (!route) {
    const injected404 = renderNotFoundHtml(html, pathname, url.origin);
    const headers = new Headers(indexResponse.headers);
    headers.set("Content-Type", "text/html; charset=UTF-8");
    headers.set("Cache-Control", "no-store");
    return new Response(injected404, { status: 404, headers });
  }

  if (route.type === "redirect") {
    return Response.redirect(new URL(route.location, url.origin).toString(), 301);
  }

  const catalog = await loadCatalog(env);
  const events = route.type === "artist" ? await loadEvents(env) : [];
  const injected = injectRoute(html, route, url.origin, catalog, events);
  const headers = new Headers(indexResponse.headers);
  headers.set("Content-Type", "text/html; charset=UTF-8");
  headers.set("Cache-Control", "public, max-age=300");
  return new Response(injected, { status: 200, headers });
}
