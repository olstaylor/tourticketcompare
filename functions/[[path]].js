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

// _headers applies to static-asset responses only, not to function-generated responses.
// These headers must be set explicitly on every HTML Response returned by this function.
const SECURITY_HEADERS = {
  "Content-Security-Policy":
    "default-src 'self'; img-src 'self' data:; style-src 'self'; script-src 'self' https://utt.impactcdn.com; connect-src 'self' https://utt.impactcdn.com; base-uri 'self'; frame-ancestors 'none'; object-src 'none'",
  "Referrer-Policy": "no-referrer",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Permissions-Policy": "interest-cohort=()",
  "Cross-Origin-Opener-Policy": "same-origin",
  "Cross-Origin-Resource-Policy": "same-origin"
};

function applySecurityHeaders(headers) {
  for (const [name, value] of Object.entries(SECURITY_HEADERS)) {
    headers.set(name, value);
  }
}

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

async function loadGuideContent(env) {
  try {
    const response = await env.ASSETS.fetch(new Request("https://assets.local/data/guides-content.json"));
    if (!response.ok) return {};
    const data = await response.json();
    return data && typeof data === "object" ? data : {};
  } catch (error) {
    return {};
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
        `Check ${artist.name} watchlist notes and verified ticket links where available, with practical buying guidance and transparent sourcing.`,
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
          ["Does the site sell tickets directly?", "No. Ticket buying happens on the external provider site."],
          ["Why are some ticket buttons missing?", "Ticket buttons are hidden until the destination can be verified."],
          ["Can final prices change?", "Yes. External ticketing sites set their own prices, fees, availability, and checkout terms."]
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
  if (route.type === "guide") graph.push(articleSchema(route, origin));
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
        `<article class="${hasArtistPage ? "artist-card" : "artist-card is-pending"}"><h3>${escapeHtml(artist.name)}</h3><p class="muted">${escapeHtml(
          artist.short_description || "Artist watchlist notes."
        )}</p><p class="${hasArtistPage ? "status-badge" : "status-badge status-badge-muted"}">${hasArtistPage ? "Artist ticket page available" : "No checked ticket link yet"}</p><p class="card-status">${
          hasArtistPage
            ? "Artist-level links are separate from dated event links. Event-specific buttons appear only on verified show cards."
            : "We're still verifying a ticket link for this artist. The artist page covers buying guidance in the meantime."
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
        `<article class="info-card"><h3>${anchor(guide.h1, path, "guide-card-link")}</h3><p>${escapeHtml(guide.description)}</p></article>`
    )
    .join("")}</div>`;
}

function renderArtistBrowseSection(catalog) {
  const artists = catalog.artists || [];
  if (!artists.length) return "";
  const items = artists
    .map(a => `<li>${anchor(`${a.name} ticket links and buying guidance`, `/artists/${a.slug}`)}</li>`)
    .join("");
  return `<section class="nested-panel"><h2>Browse artist pages</h2><p>Find checked ticket links and buying guidance for these artists:</p><ul class="guide-link-list">${items}</ul></section>`;
}

function inlineMarkdownToHtml(text) {
  return escapeHtml(text)
    .replace(/\[([^\]]+)\]\((\/guides\/[a-z0-9-]+)\)/g, (_match, label, href) => {
      return `<a class="text-link" href="${escapeAttr(href)}">${label}</a>`;
    })
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>");
}

function markdownToHtml(text) {
  if (!text) return "";
  return text
    .split("\n\n")
    .map(para => {
      if (para.startsWith("- ")) {
        const items = para.split("\n").map(line => line.replace(/^- /, ""));
        return `<ul><li>${items.map(item => inlineMarkdownToHtml(item)).join("</li><li>")}</li></ul>`;
      }
      if (para.startsWith("|")) {
        const rows = para.split("\n").filter(r => r.trim());
        if (rows.length < 2) return `<p>${inlineMarkdownToHtml(para)}</p>`;
        const headerCells = rows[0].split("|").slice(1, -1).map(c => `<th>${inlineMarkdownToHtml(c.trim())}</th>`).join("");
        const bodyRows = rows.slice(2).map(row => {
          const cells = row.split("|").slice(1, -1).map(c => `<td>${inlineMarkdownToHtml(c.trim())}</td>`).join("");
          return `<tr>${cells}</tr>`;
        }).join("");
        return `<table><thead><tr>${headerCells}</tr></thead><tbody>${bodyRows}</tbody></table>`;
      }
      return `<p>${inlineMarkdownToHtml(para)}</p>`;
    })
    .join("");
}

function renderFullGuideContent(sections) {
  if (!Array.isArray(sections)) return "";
  return sections
    .map(section => {
      if (section.type === "intro") {
        return `<section class="nested-panel">${markdownToHtml(section.content)}</section>`;
      }
      if (section.type === "section") {
        return `<section class="nested-panel"><h2>${escapeHtml(section.title)}</h2>${markdownToHtml(section.content)}</section>`;
      }
      if (section.type === "subsection") {
        return `<section class="nested-panel"><h3>${escapeHtml(section.title)}</h3>${markdownToHtml(section.content)}</section>`;
      }
      return "";
    })
    .join("");
}

function renderProviderFallback(catalog, artist, surface) {
  const links = ticketLinksForArtist(catalog, artist.slug);
  if (!links.length) {
    return `<section class="provider-panel"><h2>Artist-level ticket pages</h2><p class="muted">No checked artist-level ticket link is available for this artist yet. Ticket buttons appear only when we can verify the destination.</p><p class="muted">While you wait, these guides cover what to check before committing to a ticketing platform:</p><ul class="guide-link-list"><li>${anchor("How to avoid overpaying for concert tickets", "/guides/how-to-avoid-overpaying-for-concert-tickets")}</li><li>${anchor("When is the best time to buy concert tickets?", "/guides/when-is-the-best-time-to-buy-concert-tickets")}</li><li>${anchor("How to spot ticket scams and fake listings", "/guides/how-to-avoid-ticket-scams")}</li></ul><div class="action-row">${anchor("Read buying guides", "/guides", "button button-secondary")}${anchor("Browse other artists", "/artists", "button button-secondary")}</div></section>`;
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
      ticketmaster_url: String(ev.ticketmaster_url || "").trim(),
      seatgeek_url: String(ev.seatgeek_url || "").trim()
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

function safeSeatGeekTicketUrl(value) {
  const safeUrl = safeShowTicketUrl(value);
  if (!safeUrl) return null;
  try {
    const parsed = new URL(safeUrl);
    if (parsed.protocol !== "https:") return null;
    const host = parsed.hostname.toLowerCase();
    const path = decodeURIComponent(parsed.pathname || "/").replace(/\/+$/, "");
    if (host !== "seatgeek.com" && host !== "www.seatgeek.com") return null;
    if (!path || path === "/") return null;
    if (/^\/(search|venues?|performers?|artists?|concert-tickets|tickets)(?:\/|$)/i.test(path)) return null;
    return /\/(concert|sports|theater|theatre)\/\d+$/i.test(path) ? safeUrl : null;
  } catch (error) {
    return null;
  }
}

function seatGeekOutAvailable(show, seatGeekAvailable = false) {
  return Boolean(seatGeekAvailable && safeSeatGeekTicketUrl(show?.seatgeek_url));
}

function clean(value, max = 255) {
  return String(value || "").trim().slice(0, max);
}

function isSeatGeekConfigured(env = {}) {
  const impactSeatGeekBaseTrackingUrl = clean(env?.IMPACT_SEATGEEK_BASE_TRACKING_URL, 2048);
  const impactSeatGeekAccountSid = clean(env?.IMPACT_SEATGEEK_ACCOUNT_SID || env?.IMPACT_ACCOUNT_SID, 255);
  const impactSeatGeekAuthToken = clean(env?.IMPACT_SEATGEEK_AUTH_TOKEN || env?.IMPACT_AUTH_TOKEN, 255);
  const impactSeatGeekProgramId = clean(env?.IMPACT_SEATGEEK_CAMPAIGN_ID || env?.IMPACT_SEATGEEK_PROGRAM_ID, 120);
  return Boolean(impactSeatGeekBaseTrackingUrl || (impactSeatGeekAccountSid && impactSeatGeekAuthToken && impactSeatGeekProgramId));
}

function renderShowCardServerHtml(show, seatGeekAvailable = false) {
  const date = formatShowDateServer(show.dateTimeISO);
  const location = showLocationServer(show);
  const validUrl = safeShowTicketUrl(show.ticketmaster_url);
  let ctaHtml = `<p class="disclosure-note">No event-specific ticket link is available for this date yet.</p>`;

  if (validUrl && show.id) {
    const ticketmasterCta = `${anchor("View event ticket link", `/api/out?${new URLSearchParams({ showId: show.id, provider: "ticketmaster" }).toString()}`, "button button-primary")}`;
    const disclosure = `<p class="disclosure-note">External ticketing sites set prices, fees, availability, and checkout terms.</p>`;

    // SeatGeek CTA appears only when redirects are configured and /api/out can resolve the stored event-level SeatGeek URL.
    if (seatGeekOutAvailable(show, seatGeekAvailable)) {
      const seatGeekCta = `${anchor("Check SeatGeek", `/api/out?${new URLSearchParams({ showId: show.id, provider: "seatgeek" }).toString()}`, "button button-secondary")}`;
      ctaHtml = `<div class="cta-group">${ticketmasterCta}${seatGeekCta}</div><p class="disclosure-note">SeatGeek sets prices, fees, availability, and checkout terms. Confirm details on SeatGeek before purchase.</p>`;
    } else {
      ctaHtml = `${ticketmasterCta}${disclosure}`;
    }
  }

  return `<article class="info-card show-card"><h3>${escapeHtml(show.event_name || "Verified show")}</h3>${date ? `<p class="card-status">${escapeHtml(date)}</p>` : ""}<p class="muted">${escapeHtml(location || "City and venue details are shown only when verified by the source.")}</p>${ctaHtml}</article>`;
}

function renderShowBoardServerHtml(shows, seatGeekAvailable = false) {
  const gridContent = shows.length
    ? shows.map(show => renderShowCardServerHtml(show, seatGeekAvailable)).join("")
    : `<p class="muted empty-state">No event-specific ticket links are available for this artist yet. We only show event cards when the date and destination can be verified. ${anchor("Read our buying guides", "/guides", "text-link")} while you wait, or check the artist-level ticket link below if one is available.</p>`;
  return `<section class="section-grid show-board" aria-labelledby="artistShowBoard"><div class="section-intro"><h2 id="artistShowBoard">Verified event links</h2><p>Each card shows one checked event date and links to the ticket page for that exact show when one is available.</p><p class="disclosure-note">Coverage varies by artist and region. Final prices, fees, availability, delivery, and checkout terms are confirmed on the provider site.</p></div><div class="card-grid show-card-grid" data-show-grid="true">${gridContent}</div></section>`;
}

function renderMainContent(route, catalog, events = [], guideContent = {}, env = {}) {
  if (route.type === "artist") {
    const artist = route.artist;
    const seatGeekAvailable = isSeatGeekConfigured(env);
    const relatedGuideSlugs = artist.related_guides || [];
    const relatedGuideLinks = relatedGuideSlugs
      .slice(0, 4)
      .map(slug => {
        const guidePath = `/guides/${slug}`;
        const guide = Object.entries(GUIDE_ROUTES).find(([path]) => path === guidePath);
        if (!guide) return "";
        const [path, guideData] = guide;
        return `<li>${anchor(guideData.h1 || guideData.title.replace(" | TourTicketCompare", ""), path)}</li>`;
      })
      .filter(Boolean)
      .join("");
    const relatedGuidesHtml = relatedGuideLinks
      ? `<section class="nested-panel"><h2>Related guides</h2><p>Learn how to compare prices, understand ticket types, spot scams, and make smart timing decisions:</p><ul class="guide-link-list">${relatedGuideLinks}</ul></section>`
      : "";
    return `<main id="mainContent"><section class="content-page artist-page" aria-labelledby="artistTitle">${renderBreadcrumbHtml(
      route
    )}<h1 id="artistTitle">${escapeHtml(
      artist.name
    )} ticket links and buying guidance</h1><p class="lead">Find checked ticket links for ${escapeHtml(
      artist.name
    )} when available, plus practical guidance before you leave for a provider site.</p>${renderShowBoardServerHtml(futureShowsForArtist(events, artist.slug, 6), seatGeekAvailable)}${renderProviderFallback(
      catalog,
      artist,
      "artist_hero"
    )}<section class="split-section"><div><h2>About ${escapeHtml(
      artist.name
    )}</h2><p>${escapeHtml(artist.factual_summary)}</p></div><div><h2>Verified destination status</h2><p>${escapeHtml(
      artist.ticket_buying_notes
    )}</p><p class="disclosure-note">We do not sell tickets directly. We send users to external ticketing platforms only when the link is verified.</p></div></section><section class="nested-panel"><h2>Ticket buying checklist</h2><ul class="check-list"><li>Check the final price including fees before paying.</li><li>Check the seat location, section, row, and any view restrictions.</li><li>Check resale terms and buyer protections if the ticket is listed by a third party.</li><li>Check the delivery method and expected transfer timing.</li><li>Check refund, cancellation, and event-change terms on the provider site.</li></ul></section>${relatedGuidesHtml}<section class="nested-panel"><h2>About this page</h2><p>This page does not list unverified tour dates, invented prices, speculative venues, or unchecked checkout links. Ticket details should be confirmed on the ticketing platform before purchase.</p></section><section class="nested-panel"><h2>Useful links</h2><div class="mini-link-grid">${anchor(
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
    const fullContent = route.fullContent && guideContent[route.path]
      ? renderFullGuideContent(guideContent[route.path].sections)
      : "";
    const contentHtml = fullContent
      ? fullContent
      : `<section class="nested-panel"><h2>What this guide covers</h2><p>This guide explains what to check, red flags to avoid, what to confirm before buying, and what TourTicketCompare does and does not verify. Final prices, fees, availability, delivery, and checkout terms should always be confirmed on the provider site.</p></section>`;
    const artistBrowseHtml = renderArtistBrowseSection(catalog);
    return `<main id="mainContent"><section class="content-page guide-page" aria-labelledby="guideTitle">${renderBreadcrumbHtml(
      route
    )}<h1 id="guideTitle">${escapeHtml(route.h1 || route.title.replace(" | TourTicketCompare", ""))}</h1><p class="lead">${escapeHtml(
      route.description
    )}</p>${contentHtml}${artistBrowseHtml}<div class="action-row">${anchor(
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
    )}<h1 id="artistsTitle">Artist watchlist</h1><p>Find major artists, see whether checked ticket links are available, and use the buying guidance before you leave for a ticket provider.</p><p>A listed artist does not mean current tickets, prices, venues, or availability are confirmed. Ticket buttons appear only when the destination has been checked.</p><p class="disclosure-note">Coverage varies by artist and region. This is not a complete global tour listing; we only show event links where the artist, date, venue, and ticket destination can be checked.</p>${renderArtistLinks(
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
    )}<h1 id="pageTitle">How TourTicketCompare works</h1><p class="lead">TourTicketCompare is an independent, unofficial ticket research site that helps fans find checked ticket options and buying guidance. We do not sell tickets, do not compare prices, and do not send users to weak generic links.</p><section class="nested-panel"><h2>What TourTicketCompare does</h2><ul class="check-list"><li>Organises verified ticket links from official providers like Ticketmaster.</li><li>Shows checked event-specific links only when the destination can be verified.</li><li>Provides practical buying guidance on comparing totals, understanding fees, and confirming terms.</li><li>Displays a clear empty state when no verified ticket link exists for an event.</li></ul></section><section class="nested-panel"><h2>What TourTicketCompare does not do</h2><ul class="check-list"><li>Sell tickets directly.</li><li>Compare prices across providers or claim one site is cheaper.</li><li>Display prices without verified, timestamped provider data.</li><li>Send users to generic artist pages when no event-specific link is verified.</li><li>Scrape unofficial sources or publish unverified tour dates.</li></ul></section><section class="nested-panel"><h2>How ticket links are handled</h2><p>Ticket buttons on event cards link to external ticketing platforms. Some links may be affiliate links, which means we may earn a commission if you purchase through them at no extra cost to you.</p><p class="disclosure-note">Affiliate relationships do not control which links we show. Affiliate links are handled safely and we only publish ticket buttons when the destination can be verified.</p></section><section class="nested-panel"><h2>What you should confirm on the ticket provider site</h2><ul class="check-list"><li>Final price including all fees and taxes.</li><li>Exact seat or standing area location.</li><li>Delivery method and timing (instant, email transfer, shipped).</li><li>Refund, resale, and cancellation terms.</li><li>Event date, venue, and artist name match your intended show.</li></ul></section><section class="nested-panel"><h2>What we verify before showing a link</h2><p>We check that the event card artist, date, and venue match verified source data. We validate each ticket link destination before showing a button. We do not show event cards or ticket links until the information can be checked.</p></section><section class="nested-panel faq-panel"><h2>FAQ</h2><details><summary>Is TourTicketCompare official?</summary><p>No. TourTicketCompare is independent and unofficial.</p></details><details><summary>Does the site sell tickets directly?</summary><p>No. Ticket buying happens on the external provider site.</p></details><details><summary>Why are some ticket buttons missing?</summary><p>Ticket buttons are hidden until the destination can be verified.</p></details><details><summary>Can final prices change?</summary><p>Yes. External ticketing sites set their own prices, fees, availability, and checkout terms.</p></details></section><div class="action-row">${anchor(
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

  return `<main id="mainContent"><section class="hero-panel" aria-labelledby="heroTitle"><div class="hero-copy-block"><h1 class="hero-title" id="heroTitle">Find verified ticket links for major tours</h1><p class="hero-subcopy">Hand-checked ticket links and clear buying guidance for major tours. No fake listings, no scraped prices, no invented availability.</p><p class="disclosure-note">Current checked event coverage is strongest in the United States, with selected UK, Europe, and Canada dates where verified links are available.</p><form class="hero-search-form" role="search" aria-label="Search artists, events, and guides"><label class="sr-only" for="site-search">Search by artist, city, or venue</label><input class="hero-search-input" type="search" id="site-search" name="q" placeholder="Search by artist, city, or venue" aria-label="Search by artist, city, or venue" autocomplete="off" spellcheck="false" enterkeyhint="search" /><button class="button button-primary hero-search-submit" type="submit">Search</button></form><div class="action-row">${anchor(
    "Browse artists",
    "#featured-artists",
    "button button-secondary"
  )}${anchor("Read buying guides", "/guides", "button button-secondary")}</div></div></section><section id="search-widget" class="section-grid search-section" aria-labelledby="searchSectionTitle"><div class="section-intro"><h2 id="searchSectionTitle">Search results</h2><p>We only surface artists, events, and guides that have been checked and published. Start typing in the search field above.</p></div><div class="search-results" role="region" aria-label="Search results" aria-live="polite" aria-atomic="false"></div></section><section class="section-grid what-you-can-do" aria-labelledby="whatYouCanDoTitle"><div class="section-intro"><h2 id="whatYouCanDoTitle">What you can do here</h2></div><div class="card-grid"><article class="info-card"><h3>See artist pages and checked event links</h3><p>Browse artist pages and verified event links where available.</p></article><article class="info-card"><h3>Learn how to compare checkout totals</h3><p>Understand how to compare final prices, fees, provider terms, and refund rules.</p></article><article class="info-card"><h3>Understand checked links</h3><p>See how we verify ticket links and what to expect at checkout.</p></article></div></section><section id="featured-artists" class="section-grid" aria-labelledby="homeArtistsTitle"><div class="section-intro"><h2 id="homeArtistsTitle">Featured artists</h2><p>Browse artist pages and checked event links where available.</p></div>${renderArtistLinks(
    catalog
  )}</section><section class="section-grid" aria-labelledby="homeBuyingGuidesTitle"><div class="section-intro"><h2 id="homeBuyingGuidesTitle">Buying guides</h2><p>Practical guides for comparing final prices, avoiding risky listings, and understanding ticket provider terms.</p></div>${renderGuideLinks()}<div class="action-row">${anchor(
    "View all guides",
    "/guides",
    "button button-secondary"
  )}</div></section><section class="section-grid trust-section" aria-labelledby="trustTitle"><div class="section-intro"><h2 id="trustTitle">Trust &amp; transparency</h2></div><div class="nested-panel"><p>TourTicketCompare is independent and unofficial. We do not sell tickets directly.</p><p>Some outbound links may be affiliate links, which means we may earn a commission if you click through and buy tickets. This does not increase your ticket price or fees.</p><p>Final price, fees, availability, seat details, refund rules, and checkout terms are confirmed by the provider on their site.</p><p>Learn more: ${anchor("How we work", "/how-it-works", "text-link")} • ${anchor("Affiliate disclosure", "/affiliate-disclosure", "text-link")}</p></div></section></main>`;
}

function injectRoute(html, route, origin, catalog, events = [], guideContent = {}, env = {}) {
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
  next = next.replace(/<main\s+id="mainContent">[\s\S]*?<\/main>/i, renderMainContent(route, catalog, events, guideContent, env));
  return next;
}

const INTERNAL_IMPACT_TAG_TEST_PATH = "/internal/impact-tag-test";

function safeImpactCdnUrl(value) {
  const raw = String(value || "").trim();
  if (!raw) return null;
  try {
    const parsed = new URL(raw);
    if (parsed.protocol !== "https:") return null;
    const host = parsed.hostname.toLowerCase();
    if (!/(^|\.)impactcdn\.com$|(^|\.)impact\.com$/.test(host)) return null;
    return parsed.toString();
  } catch (err) {
    return null;
  }
}

function safeImpactCdnOrigin(value) {
  const url = safeImpactCdnUrl(value);
  if (!url) return null;
  try {
    return new URL(url).origin;
  } catch (err) {
    return null;
  }
}

function safeSeatGeekUrl(value) {
  const raw = String(value || "").trim();
  if (!raw) return null;
  try {
    const parsed = new URL(raw);
    if (parsed.protocol !== "https:") return null;
    const host = parsed.hostname.toLowerCase();
    if (host === "seatgeek.com" || host.endsWith(".seatgeek.com")) return parsed.toString();
    return null;
  } catch (err) {
    return null;
  }
}

function pickSampleTicketmasterUrl(events) {
  if (!Array.isArray(events)) return null;
  for (const event of events) {
    const url = safeShowTicketUrl(event && event.ticketmaster_url);
    if (url) {
      return { url, id: String(event.id || "").trim(), eventId: String(event.ticketmaster_event_id || "").trim() };
    }
  }
  return null;
}

function tokenMatches(provided, expected) {
  const a = String(provided || "");
  const b = String(expected || "");
  if (!a || !b || a.length !== b.length) return false;
  let mismatch = 0;
  for (let i = 0; i < a.length; i++) mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return mismatch === 0;
}

function internalTagTestCsp(extraScriptOrigins = []) {
  const baseScript = ["'self'", "https://utt.impactcdn.com"];
  const baseConnect = ["'self'", "https://utt.impactcdn.com"];
  for (const origin of extraScriptOrigins) {
    if (origin && !baseScript.includes(origin)) baseScript.push(origin);
    if (origin && !baseConnect.includes(origin)) baseConnect.push(origin);
  }
  return [
    "default-src 'self'",
    "img-src 'self' data:",
    "style-src 'self'",
    `script-src ${baseScript.join(" ")}`,
    `connect-src ${baseConnect.join(" ")}`,
    "base-uri 'self'",
    "frame-ancestors 'none'",
    "object-src 'none'"
  ].join("; ");
}

async function renderInternalImpactTagTest(request, env, url) {
  const expectedToken = String(env && env.IMPACT_TAG_TEST_TOKEN ? env.IMPACT_TAG_TEST_TOKEN : "");
  const providedToken = url.searchParams.get("token") || "";
  if (!expectedToken || !tokenMatches(providedToken, expectedToken)) {
    return null;
  }

  const events = await loadEvents(env);
  const sample = pickSampleTicketmasterUrl(events);

  const sgRawCandidate =
    url.searchParams.get("sgUrl") ||
    (env && env.IMPACT_TAG_TEST_SEATGEEK_URL) ||
    "";
  const sgRawUrl = safeSeatGeekUrl(sgRawCandidate);

  const sgShowId = String(
    url.searchParams.get("sgShowId") ||
      (env && env.IMPACT_TAG_TEST_SEATGEEK_SHOW_ID) ||
      ""
  ).trim();

  const sgTagCandidate =
    url.searchParams.get("sgTagUrl") ||
    (env && env.IMPACT_SEATGEEK_PUBLISHER_TAG_URL) ||
    "";
  const sgTagSrc = safeImpactCdnUrl(sgTagCandidate);
  const sgTagOrigin = safeImpactCdnOrigin(sgTagCandidate);
  const sgTagParamProvided = url.searchParams.has("sgTagUrl");

  const tmRawAnchor = sample
    ? `<a href="${escapeAttr(sample.url)}" data-provider="ticketmaster" data-test-link="raw-ticketmaster" rel="noopener nofollow">Raw Ticketmaster direct link</a>`
    : `<span class="disabled-note" data-test-link="raw-ticketmaster" data-provider="ticketmaster">Raw Ticketmaster direct link unavailable: no event with a Ticketmaster URL found in events.json.</span>`;

  const sgRawAnchor = sgRawUrl
    ? `<a href="${escapeAttr(sgRawUrl)}" data-provider="seatgeek" data-test-link="raw-seatgeek" rel="noopener nofollow">Raw SeatGeek direct link</a>`
    : `<span class="disabled-note" data-test-link="raw-seatgeek" data-provider="seatgeek">Raw SeatGeek direct link unavailable: pass <code>?sgUrl=</code> or set <code>IMPACT_TAG_TEST_SEATGEEK_URL</code> to a https://seatgeek.com URL.</span>`;

  const tmOutHref = sample
    ? `/api/out?${new URLSearchParams({ showId: sample.id, provider: "ticketmaster" }).toString()}`
    : null;
  const tmOutAnchor = tmOutHref
    ? `<a href="${escapeAttr(tmOutHref)}" data-provider="ticketmaster" data-test-link="out-ticketmaster" rel="noopener nofollow">/api/out Ticketmaster control</a>`
    : `<span class="disabled-note" data-test-link="out-ticketmaster" data-provider="ticketmaster">/api/out Ticketmaster control unavailable: no sample event found.</span>`;

  const sgOutHref = sgShowId
    ? `/api/out?${new URLSearchParams({ showId: sgShowId, provider: "seatgeek" }).toString()}`
    : null;
  const sgOutAnchor = sgOutHref
    ? `<a href="${escapeAttr(sgOutHref)}" data-provider="seatgeek" data-test-link="out-seatgeek" rel="noopener nofollow">/api/out SeatGeek control</a>`
    : `<span class="disabled-note" data-test-link="out-seatgeek" data-provider="seatgeek">/api/out SeatGeek control unavailable: pass <code>?sgShowId=</code> or set <code>IMPACT_TAG_TEST_SEATGEEK_SHOW_ID</code>. Backend SeatGeek + Impact SeatGeek program credentials must also be configured server-side for the redirect to succeed.</span>`;

  const sgTagMeta = sgTagSrc
    ? `<meta name="impact-sg-tag-src" content="${escapeAttr(sgTagSrc)}" />`
    : "";

  const sgTagBanner = sgTagSrc
    ? `<p class="info-note">SeatGeek Publisher Tag will load using ${sgTagParamProvided ? "the validated <code>?sgTagUrl=</code> override" : "configured environment"} and a separate global (<code>window.impactStatSG</code>).</p>`
    : `<p class="warning-note"><strong>Warning:</strong> SeatGeek Publisher Tag is not loaded. Pass <code>?sgTagUrl=</code> or set <code>IMPACT_SEATGEEK_PUBLISHER_TAG_URL</code> (must point to an https://utt.impactcdn.com, https://*.impactcdn.com, or https://*.impact.com URL) to enable.</p>`;

  const body = `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="robots" content="noindex,nofollow" />
<meta name="referrer" content="no-referrer" />
<title>Impact Publisher Tag Test (internal) | TourTicketCompare</title>
${sgTagMeta}
<link rel="stylesheet" href="/internal/impact-tag-test.css" />
<script src="/impact.js"></script>
</head>
<body>
<h1>Impact Publisher Tag Test (internal)</h1>
<p>Internal-only route. Not indexable. Compares the Ticketmaster and SeatGeek Impact Publisher Tags on a single page.</p>
<p><strong>Ticketmaster production tracking is the known-good baseline.</strong> This helper is not the source of truth for attribution and should not be used to decide that Ticketmaster production tracking is broken.</p>
<p>A Publisher Tag may transform at page load, at click time, through query decoration, or in a way that is confirmed only by Impact dashboard reporting. Do not treat a no-change href snapshot after 2 seconds as a final attribution failure.</p>
<p>Final SeatGeek pass/fail depends on the raw SeatGeek URL landing on the correct SeatGeek event page, the SeatGeek Impact account recording the click, the Ticketmaster Impact account not recording that SeatGeek click, and no double transformation or cross-account attribution. Keep <code>/api/out</code> controls as the fallback/reference path.</p>
${sgTagBanner}
<p id="sgTagStatus" class="info-note">SeatGeek Publisher Tag status will appear after the helper script runs.</p>

<section class="section">
  <h2>Test links</h2>
  <div class="links">
    ${tmRawAnchor}
    ${sgRawAnchor}
    ${tmOutAnchor}
    ${sgOutAnchor}
  </div>
</section>

<section class="section">
  <h2>Href snapshot diagnostics</h2>
  <p>Initial full hrefs and hosts are captured on DOMContentLoaded. Post-load hrefs and hosts are captured ~2 seconds later. Host changes are reported, but query-param decoration can count as a transform even when the host stays the same. No visible change is not conclusive because some tags transform on click or are verified only in Impact reporting. Nothing is sent off-device.</p>
  <div class="results-scroll">
    <table id="tagTestResults" data-schema-version="expanded-diagnostics-20260513"><thead><tr><th>label</th><th>data-provider</th><th>data-test-link</th><th>initial href host</th><th>post-load href host</th><th>initial full href</th><th>post-load full href</th><th>host changed</th><th>full href changed</th><th>recognised params</th><th>added params</th><th>tracking likely</th><th>diagnostic note</th></tr></thead><tbody><tr><td colspan="13">Waiting for snapshots...</td></tr></tbody></table>
  </div>
</section>

<script src="/internal/impact-tag-test.js?v=expanded-diagnostics-20260513" defer></script>
</body>
</html>`;

  const headers = new Headers();
  headers.set("Content-Type", "text/html; charset=UTF-8");
  headers.set("Cache-Control", "no-store");
  headers.set("X-Robots-Tag", "noindex, nofollow");
  headers.set("Referrer-Policy", "no-referrer");
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("X-Frame-Options", "DENY");
  headers.set("Permissions-Policy", "interest-cohort=()");
  headers.set("Cross-Origin-Opener-Policy", "same-origin");
  headers.set("Cross-Origin-Resource-Policy", "same-origin");
  const extraOrigins = sgTagOrigin ? [sgTagOrigin] : [];
  headers.set("Content-Security-Policy", internalTagTestCsp(extraOrigins));
  return new Response(body, { status: 200, headers });
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
    `<main id="mainContent"><section class="content-page" aria-labelledby="notFoundTitle"><h1 id="notFoundTitle">Page not found</h1><p>We could not find that page. Use the artist index, buying guides, or homepage to find current public pages.</p><div class="action-row">${anchor(
      "Find an artist",
      "/artists",
      "button button-primary"
    )}${anchor("Read buying guides", "/guides", "button button-secondary")}${anchor("Return home", "/", "button button-secondary")}</div></section></main>`
  );
  return next;
}

export async function onRequest(context) {
  const { request, env, next } = context;
  const url = new URL(request.url);
  const pathname = normalizePath(url.pathname);

  if (RESERVED_PREFIXES.some((prefix) => pathname.startsWith(prefix)) || RESERVED_FILES.has(pathname)) return next();

  if (pathname === INTERNAL_IMPACT_TAG_TEST_PATH) {
    const internalResponse = await renderInternalImpactTagTest(request, env, url);
    if (internalResponse) return internalResponse;
    // No valid token: fall through to the standard 404 path below.
  }

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
    applySecurityHeaders(headers);
    return new Response(injected404, { status: 404, headers });
  }

  if (route.type === "redirect") {
    return Response.redirect(new URL(route.location, url.origin).toString(), 301);
  }

  const catalog = await loadCatalog(env);
  const events = route.type === "artist" ? await loadEvents(env) : [];
  const guideContent = route.type === "guide" ? await loadGuideContent(env) : {};
  const injected = injectRoute(html, route, url.origin, catalog, events, guideContent, env);
  const headers = new Headers(indexResponse.headers);
  headers.set("Content-Type", "text/html; charset=UTF-8");
  headers.set("Cache-Control", "public, max-age=300");
  applySecurityHeaders(headers);
  return new Response(injected, { status: 200, headers });
}
