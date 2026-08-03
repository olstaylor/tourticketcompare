# TourTicketCompare Content Rules

Rules for what can and cannot be published on TourTicketCompare. These apply to all human and AI contributors. For provider/price-display rights and the inert-catalog-metadata rule, see `SAFE_PUBLISHING_RULES.md` and `docs/PROVIDER_DATA_POLICY.md`.

---

## What TourTicketCompare Is

An independent, unofficial fan-facing ticket research site. The site helps fans find verified ticket links, understand buying risks, and read practical guides before leaving for an external ticket provider.

It is not affiliated with any artist, venue, promoter, or ticket platform.

---

## Hard Rules

These rules have no exceptions.

### Never invent

Do not publish content that is not confirmed from a verifiable source:

- Tour dates
- Venues or cities
- Ticket prices (face value, resale, or range)
- Ticket availability or inventory status
- Artist tour announcements
- Provider coverage or partnership status

### Never scrape

Do not obtain data from unofficial sources, competitor sites, screen-scraping, or automated crawls of ticketing platforms.

### Never fake

Do not publish:

- Fake comparison tables
- Provider buttons without a destination URL
- Show cards without event data
- "Available" or "on sale" claims without confirmed provider status

### Never expose credentials

Do not publish:

- API keys, secret tokens, or account IDs in public HTML, CSS, JavaScript, JSON, or documentation
- Impact affiliate link parameters or program IDs in client-visible output
- Affiliate URLs as raw `<a href>` tags visible in page source (all affiliate links must go through `/api/out`)

---

## When Ticket Buttons May Appear

A ticket button (CTA) may appear only when **all three conditions** are met:

1. The artist slug is in `public/data/catalog.json` and is a known, verified artist.
2. The provider has a configured, verified `redirectUrl` in `/api/out`'s `VERIFIED_TICKET_LINKS` or a verified event record in `events.json`.
3. The link passes `/api/out` validation (not a placeholder URL, not an open redirect, destination host is allowlisted).

Artist-level buttons (pointing to a provider's artist page) are acceptable when the above conditions are met.

Event-level buttons must additionally have a reviewed local event ID, the provider's exact event identity/destination, and matching provider provenance. One provider's verification never authorizes another provider lane.

---

## Artist Pages

- Only publish artist pages for slugs in `public/data/catalog.json`.
- Unknown artist slugs must return a 404 or honest empty state, not a thin generated page.
- Artist factual summaries must come from confirmed public sources.
- Do not invent tour announcements or imply touring activity that is not confirmed.
- The "artist watchlist" framing is intentional: the page is useful even when no current ticket link exists.

---

## Event and Show Cards

- Do not publish show cards from unreviewed or unverified data.
- Event records must have a confirmed date, venue, and artist.
- Do not add `Event` or `MusicEvent` schema to any page without verified event-level data.
- If no verified events exist, show a polished empty state.

---

## Price Data

- A provider-attributed listed-price snapshot may be published only when the provider has explicit display rights and the lane passes its public/price flags, approved source, exact-event provenance, matching verified URL, timestamp, currency, and freshness checks.
- Do not publish scraped, invented, manually entered, stale, mismatched, availability, or inventory data.
- Comparisons require eligible snapshots for the same local event and currency. Label them as provider-supplied listed-price snapshots, never live inventory or final totals.
- Fees, taxes, delivery, availability, and checkout totals must be confirmed on the provider.
- Provider-specific sources and restrictions are authoritative in `docs/PROVIDER_DATA_POLICY.md`; current activation belongs in `PROJECT_STATUS.md`.

---

## Guides

- Guide content should answer practical, search-intent questions fans have before buying tickets.
- Guides may reference general market behaviour (e.g., "service fees typically add 20–30% to face value") if that is factual and widely documented.
- Guides may explain the approved snapshot comparison feature, but must not claim guaranteed savings, final checkout totals, availability, or data that is not actually displayed.

### Published dates are claims, and are governed like any other claim

A page's "Updated" date and a citation's "reviewed" date assert that work happened. Neither may be advanced because time passed, because a file was reformatted, or because a deploy ran.

- **Page `lastmod`** is maintained by `scripts/sync-content-provenance.mjs`, which fingerprints each static route's copy and advances the date only when that fingerprint changes. Do not hand-edit `lastmod` in `functions/_route-metadata.js`; edit the copy and run `npm run content:provenance`. `content:provenance:check` runs in `test:mvp` and fails a commit whose published dates disagree with its copy.
- **`datePublished`** is set once, when a page first goes live, and never moves.
- **A source's `lastChecked` is editorial and human-only.** It means a person re-read the cited source and confirmed the guide still describes it correctly. No automation may set it.
- **A source's `linkCheckedAt` is automated and narrower.** It means only that the cited URL still resolved, and is stamped by `scripts/check-guide-source-links.mjs` in the daily audit. It renders as "link checked" precisely so it cannot be read as an editorial review. A 401/403/429 is recorded as blocked and stamps nothing — a WAF challenge is not a successful check.

Do not derive a published date from git commit dates. This repository's history was re-rooted on 2026-07-25 in a single bulk commit, so commit dates report that day for content untouched since June; a git-derived date would backdate eleven guides to a restructure that changed none of their words.

---

## SEO and Schema

- Use `index,follow` only on pages that are fully published and correctly represent real content.
- Use `noindex,follow` on 404 pages, tour pages for unverified tours, and any page that does not meet the content rules above.
- Do not create thin duplicate pages (e.g., `/artists/beyonce-tickets`, city subpages) unless they have distinct verified content.
- Legacy root-level artist URLs (`/beyonce`, `/beyonce-tickets`) redirect to canonical `/artists/beyonce` and must not be revived as canonical pages.
- Do not add BreadcrumbList, FAQPage, or Article schema to pages that do not meet the content rules.

---

## Placeholder and Development Content

Before deploying, confirm that no page contains:

- `example.com`, `localhost`, `127.0.0.1`, `placeholder`, `your-link-here`, `replace-me`, `tbd` in ticket link URLs
- "Coming soon", "Under construction", or dev-mode wording visible to users
- Internal route or function names in public-facing copy
- Fake or sample prices used during development
