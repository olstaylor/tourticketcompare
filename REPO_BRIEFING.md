# REPO_BRIEFING.md

> Read-only survey of the TourTicketCompare repository. No source files were modified.
> Generated 2026-06-08. Scope: data shape, routing/rendering, frontend, configuration,
> content audit, and gaps/issues.

---

## 0. One-paragraph orientation

TourTicketCompare is a **static frontend served by Cloudflare Pages with server-side
Pages Functions** (no build step). All HTML routes are intercepted by
`functions/_middleware.js` and rendered server-side by `functions/[[path]].js`, which
reads JSON data files from `public/data/` via the `ASSETS` binding and injects
`<title>`/meta/schema/`<main>` into the `public/index.html` shell. `public/app.js` is a
**client-side fallback / progressive-enhancement renderer** (it duplicates much of the
server's routing and can render pages client-side, and powers search + nav). Content is
**100% JSON-driven** — there are no Markdown/MDX/Astro content files.

---

## 1. Data shape

### 1.1 `public/data/artists.json` — the artist index
- **10 records.** Flat objects, keyed by `slug`.
- **Fields (every record):** `slug`, `name`, `short_description`, `indexing_status`,
  `verified_provider_count`, `verified_providers` (array), `last_verified_at`.
- **Field consistency:** All 10 records share the same 7 keys — structurally consistent.
  Values differ only for `ed-sheeran` (`indexing_status: "review_required"`,
  `verified_provider_count: 0`, `verified_providers: []`, `last_verified_at: null`). All
  other 9 are `indexable_with_substantial_content` with `verified_providers:
  ["ticketmaster"]`.
- This file is **duplicated inline** in `public/index.html` as
  `<script id="fallbackArtistsData">` (byte-for-byte the same 10 records) — a client-side
  fallback used by `app.js` when a fetch is unavailable.

### 1.2 `public/data/events.json` — RICH event records (server source of truth)
- **272 records.** This is the file the server loads (`loadEvents()` in `[[path]].js`).
- **Fields (all 272):** `id`, `artist_slug`, `artist_name`, `event_name`, `city`,
  `country`, `venue`, `datetime_iso`, `tour_name`, `status`, `ticketmaster_event_id`,
  `ticketmaster_url`, `seatgeek_url`, `vividseats_url`, `source_type`, `source_url`,
  `last_verified_at`, `provider_links`.
  - `provider_links` is an object with sub-objects for `ticketmaster`, `seatgeek`,
    `vivid-seats`, `stubhub`, each: `{ event_id, url, verified, last_verified_at,
    availability_status }`.
- **Partial fields:** `timezone` present on **254/272** (18 missing); `verification_status`
  present on only **8/272** (all Olivia Rodrigo — the `needs_recheck` events from CLAUDE.md).
- A trimmed 6-record copy is inlined in `public/index.html` as
  `<script id="fallbackEventsData">` (slim shape: id/slug/name/country/city/venue/datetime only).

### 1.3 `public/data/events/<slug>.json` — per-artist partitions (RICH)
- 8 files, one per artist that has events. **Counts:** ariana-grande 38, bad-bunny 24,
  bruno-mars 56, bts 17, harry-styles 30, jay-z 3, morgan-wallen 18, olivia-rodrigo 86.
- **Sum = 272**, exactly matching `events.json`. Same rich schema as `events.json`
  (verified against `jay-z.json`, which carries populated `seatgeek_url` and full
  `provider_links`). These partitions and `events.json` are kept in sync.
- **No `beyonce.json` and no `ed-sheeran.json`** — those two artists have zero events.

### 1.4 `public/data/catalog.json` — providers, ticket_links, richer artist content
Top-level keys: `version`, `updated_at`, `strategy`, `artists`, `tours`, `providers`,
`ticket_links`, `safety_rules`.
- **`artists` (10):** A *richer* artist record than `artists.json` —
  `factual_summary`, `ticket_buying_notes`, `seo_title`, `meta_description`, `faq`,
  `related_guides`, and (for most) `genres`, `country`, `official_website`, `image_alt`,
  `why_demand_is_high`, `provider_status`, `page_optimization`. **Field coverage is
  uneven — see §6.**
- **`tours`: `[]`** (empty — tour routes exist in code but have no data; see §6).
- **`providers` (4):** `ticketmaster` (`public_enabled: true`), `seatgeek`,
  `vivid-seats`, `stubhub` (all three `public_enabled: false`). Each has
  `allowed_destination_hosts`, `credential_fields`, `api_config`, `features`, etc.
- **`ticket_links` (10):** one Ticketmaster artist-page link per artist. 9 are
  `verified/public_enabled/affiliate_enabled: true`; `ed-sheeran` is all-false.
- **`safety_rules`:** 4 hard rules (no invented data, no unverified buttons, no exposed
  credentials, no event schema without verified data).

### 1.5 `public/data/events-index.json` — SLIM partition index (homepage feed)
- **272 records** (same set as `events.json`), but **slim**: only `id`, `artist_slug`,
  `artist_name`, `country`, `city`, `venue`, `datetime_iso`, `timezone`, `tour_name`,
  `status`. No URLs, no `provider_links`, no `event_name`.
- **Consumer:** `public/ttc-home.js` fetches `/data/events-index.json` for the homepage
  "announced events" feed. The server (`[[path]].js`) does **not** read this file — it
  uses the rich `events.json`.

---

## 2. Routing and rendering

### 2.1 `functions/_middleware.js` (37 lines) — entry point
Normalises the path, then: if it starts with `/api/` or `/data/`, is a known static asset
(`/app.js`, `/styles.css`, `/favicon.svg`, `/robots.txt`, `/_routes.json`), or has a file
extension → `context.next()` (serve asset/handler). **Everything else → `[[path]].js`'s
`onRequest`.** A long comment documents that the named route shims (`artists.js`,
`guides.js`, …) are never reached while this middleware exists.

### 2.2 `functions/_route-metadata.js` (176 lines) — single source of metadata
Exports three objects:
- **`TRUST_ROUTES`** (8): `/`, `/artists`, `/guides`, `/how-it-works`, `/about`,
  `/contact`, `/editorial-policy`, `/affiliate-disclosure` — each with title, description,
  indexable, breadcrumb.
- **`GUIDE_ROUTES`** (15): each `/guides/<slug>` with title, `h1`, description,
  `fullContent: true`.
- **`OLD_GUIDE_REDIRECTS`** (4): legacy guide slugs → current slugs.

**Unknown-slug handling is hybrid:**
- Trust pages and guides require an **explicit entry** in these objects.
- **Artist and tour routes are resolved dynamically** against `catalog.json` (regex match
  on `/artists/<slug>`), so new artists in the catalog get a page with no metadata edit.
  Title/description fall back to `seo_title`/`meta_description` or a generated default.

### 2.3 `functions/[[path]].js` (1259 lines) — all HTML rendering
**`routeForPath(pathname)` resolution order:**
| # | Pattern | Result |
|---|---------|--------|
| 1 | `OLD_GUIDE_REDIRECTS[path]` | 301 redirect |
| 2 | `/` or a `PUBLIC_HTML_ROUTES` member | `type: static` (homepage/trust pages) |
| 3 | `GUIDE_ROUTES[path]` | `type: guide` |
| 4 | `/artists/<slug>` (in catalog) | `type: artist` (else 404) |
| 5 | `/artists/<slug>/tickets` | 301 → `/artists/<slug>` |
| 6 | `/artists/<slug>/<tourSlug>` (tour in catalog) | `type: tour` (catalog.tours is empty → never matches) |
| 7 | `/<slug>-tickets[-...]` | 301 → `/artists/<slug>` (legacy) |
| 8 | `/<slug>` (bare, in catalog) | 301 → `/artists/<slug>` (legacy) |
| — | no match | `null` → 404 (noindex) |

Plus a token-gated internal route `/internal/impact-tag-test` (Impact Publisher Tag
diagnostics; `noindex`, requires `IMPACT_TAG_TEST_TOKEN`).

**Data reads per request:** always `catalog.json`; `events.json` only for `artist` /
`/artists` / `/` routes; `guides-content.json` only for guide routes; `artists.json` for
the `indexing_status` enrichment on artist routes.

**Response assembly (`injectRoute`):** fetches the `/` shell HTML via `ASSETS`, then
**regex-replaces** `<title>`, `description`/`robots`/OG/Twitter meta, canonical, the
JSON-LD `<script>`, and the entire `<main id="mainContent">…</main>` block with
server-rendered content from `renderMainContent`. Security headers are set explicitly on
every function response (CSP, Referrer-Policy, X-Frame-Options, etc.). On `/` it also
injects `<script src="/ttc-home.js" defer>`.

**Rendering helpers of note:** `renderArtistLinks` (artist cards with a 3-state status
badge: *Verified event links* / *Verified artist page* / *Buying guidance*),
`renderShowBoardServerHtml` + `renderShowCardServerHtml` (event cards; CTAs gated by
`safeShowTicketUrl`, artist indexability, and — for SeatGeek — `isSeatGeekConfigured(env)`
+ `safeSeatGeekTicketUrl`), `renderProviderFallback` (builds `/api/out` links from
`ticket_links`), and a small Markdown→HTML renderer for guide content.

**Schema:** `routeSchema` emits an `@graph` with Organization + WebSite always, plus
BreadcrumbList, and Person/MusicGroup + FAQPage for artists, Article for guides. (BTS is
special-cased to `MusicGroup`.)

---

## 3. Frontend

### 3.1 `public/index.html` (291 lines) — shell, mostly server-rendered
- The shell ships with an **empty `<main id="mainContent">`** (just a "Preparing…"
  status line). The server replaces this whole block per route; if JS/Functions are off,
  `app.js` fills it client-side.
- Inlines a critical-CSS `<style>` block (design tokens + above-the-fold chrome),
  duplicating the `:root` tokens from `styles.css`.
- Loads: `/styles.css`, `/ttc-home.css` (site chrome + brand fonts, every route),
  `/impact.js` (affiliate tag, early), `/app.js?v=20260603b` (deferred).
- Contains the two inline fallback JSON blocks (`fallbackArtistsData`,
  `fallbackEventsData`) and a static Organization/WebSite JSON-LD block.

### 3.2 `public/app.js` (1990 lines) — client-side fallback renderer + interactivity
A full client-side mirror of the server router. It **re-declares** `guidePages` (15
guides, marked `serverRendered: true`) and `oldGuideRedirects`, duplicating
`_route-metadata.js`. Provides:
- Client renderers for every page type: `renderHome`, `renderArtistsIndex`,
  `renderArtist`, `renderGuidesIndex`, `renderGuide`, `renderHowItWorks`,
  `renderSimplePage`, `renderNotFound`, etc.
- **Search** (`renderHeroSearchForm`, `renderSearchResults…`) over artists/events/guides,
  fetching `/data/events.json` (cached) and `/data/catalog.json`.
- **Show board** that can call `/api/shows?...` for live event data.
- **Mobile nav** toggle (hamburger, Escape-to-close, click-outside) wired at the bottom;
  `render()` is the entry point.
- Provider button rendering that posts to `/api/out` with `artistSlug`/`provider`/`sourcePath`.

### 3.3 `public/styles.css` (989 lines) + design tokens
`:root` tokens (warm, paper-and-ink editorial palette):

| Token | Value | Token | Value |
|-------|-------|-------|-------|
| `--bg` | `#f5f1e8` (warm cream) | `--accent` | `#d75b2f` (burnt orange) |
| `--paper` | `#fffdf7` | `--accent-dark` | `#8f341e` |
| `--ink` | `#101411` (near-black) | `--green` | `#24483a` |
| `--muted` | `#4a524a` | `--green-soft` | `#dfe9dd` |
| `--line` | `#d8d0c0` | `--gold` | `#a46f21` |
| `--line-strong` | `#bdb29f` | `--blue` | `#243f63` |
| `--focus` | `#1f5eff` | `--shadow` | `0 24px 70px rgba(36,28,18,.12)` |

Radii: `--radius-xl 32px`, `--radius-lg 22px`, `--radius-md 16px`. Fonts: `--headline`
Georgia serif, `--body` "Avenir Next"/system sans. Body uses layered radial + linear
gradients. Note `ttc-home.css` is a **separate** chrome/token stylesheet (the live site
header/footer use `ttc-*` classes, e.g. `.ttc-hd`, `.ttc-nav`, `.ttc-ft`), so there are
effectively **two style systems** in play (the `styles.css` `.site-header` etc. and the
`ttc-home.css` chrome that `index.html` actually renders).

---

## 4. Configuration

### 4.1 `wrangler.toml`
- `pages_build_output_dir = "public"`, `compatibility_date = 2025-01-01`.
- **Bindings:** one D1 database — `DEMAND_DB` → `tourticketcompare-demand`
  (id `19b314b8-…`). No KV, no R2.
- **`[vars]`:** `MOCK_MODE=false`, `ALLOW_MOCK_PRICES=false`, `CACHE_TTL_MINUTES=60`,
  `TICKETMASTER_DAILY_CAP=1000`, `TICKETMASTER_STALE_TTL_HOURS=168`,
  `CLICK_TRACKING_ENABLED=true`, `TICKETMASTER_DISCOVERY_ENABLED=true`,
  `TICKETMASTER_EVENTS_TTL_MINUTES=30`, `TICKETMASTER_ARTIST_EVENTS_LIMIT=100`,
  `TICKETMASTER_DISCOVERY_PRICE_CHECKS_ENABLED=false`, `SEATGEEK_PRICE_DISPLAY_ENABLED=false`,
  `TICKETMASTER_DISCOVERY_COUNTRY=""`.
- **Secrets (not in file; set in Cloudflare dashboard, referenced in code):**
  `IMPACT_ACCOUNT_SID`, `IMPACT_AUTH_TOKEN`, `IMPACT_TICKETMASTER_PROGRAM_ID`, plus
  optional SeatGeek/Impact-SeatGeek vars and `IMPACT_TAG_TEST_TOKEN`.

### 4.2 `public/_routes.json` / `public/_headers`
- `_routes.json`: routes `/*` through Functions, excludes `/_assets/*`, `/favicon.ico`.
- `_headers`: site-wide security headers + CSP (mirrors the in-function `SECURITY_HEADERS`)
  and cache-control for static assets. **Note:** `_headers` only applies to *static-asset*
  responses; function-rendered HTML sets its own headers in `[[path]].js`.

### 4.3 `CLAUDE.md` — rules & protected areas (summary)
Protected (no changes without explicit scope): `functions/api/out.js`,
`functions/_middleware.js`, `functions/[[path]].js`, `functions/_route-metadata.js`,
`public/data/{events,artists,catalog}.json`, `public/_routes.json`, Impact credentials,
Cloudflare dashboard settings. Core product rules: never invent data, never scrape, no
fake CTAs / price comparison / "cheapest" claims, never expose credentials client-side,
never modify `/api/out` or affiliate logic without scope. Parked: tour/city/event pages,
artist-level SeatGeek CTAs, provider abstraction, Vercel legacy retirement. Unparked
2026-06-10: new-artist onboarding (phase gates still mandatory) and public Vivid Seats
CTAs (still require verified `vividseats.com` destinations via `/api/out`).

---

## 5. Content audit (per artist)

| # | Name | Slug | Events file? | Events (count) | `verified_provider_count` | `last_verified_at` | Notes |
|---|------|------|--------------|----------------|---------------------------|--------------------|-------|
| 1 | Beyoncé | `beyonce` | ❌ none | 0 | 1 | 2026-04-30 | Verified TM artist-page link, **but zero events** → renders "Verified artist page" card only. Gold-standard catalog record (only one with `provider_status`). |
| 2 | Harry Styles | `harry-styles` | ✅ | 30 | 1 | 2026-04-30 | All events at MSG, tour "Together, Together". |
| 3 | BTS | `bts` | ✅ | 17 | 1 | 2026-04-30 | Schema typed as `MusicGroup`. |
| 4 | Ariana Grande | `ariana-grande` | ✅ | 38 | 1 | 2026-04-30 | Datetimes are **naive (no `Z`)**. |
| 5 | Bad Bunny | `bad-bunny` | ✅ | 24 | 1 | 2026-04-30 | Datetimes naive. |
| 6 | Morgan Wallen | `morgan-wallen` | ✅ | 18 | 1 | 2026-04-30 | Datetimes UTC (`Z`). |
| 7 | JAY-Z | `jay-z` | ✅ | 3 | 1 | 2026-04-30 | Only 3 events; `seatgeek_url` populated. Datetimes naive. |
| 8 | Olivia Rodrigo | `olivia-rodrigo` | ✅ | 86 | 1 | 2026-05-27 | **All 86 have blank `tour_name`**; 8 carry `verification_status` (`needs_recheck`); 8 lack `timezone`. Thin catalog record. |
| 9 | Bruno Mars | `bruno-mars` | ✅ | 56 | 1 | 2026-05-28 | **All 56 have blank `tour_name`**; 10 lack `timezone`; **mixed datetime formats within one artist** (53 `Z`, 3 naive). Thin catalog record. |
| 10 | Ed Sheeran | `ed-sheeran` | ❌ none | 0 | 0 | `null` | `review_required` shell — no CTAs, no events, no public link. Intentional (per CLAUDE.md). |

**Stale / inconsistent / misleading flags:**
- **Olivia Rodrigo & Bruno Mars** have catalog records missing six fields the other artists
  have (see §6) and **100% blank `tour_name`** on their events.
- **Beyoncé** is marked verified with a live provider link but has **no events at all** — the
  page is real but contains only the provider artist-page CTA + guidance.
- Verification dates cluster at **2026-04-30** for 7 artists; only Olivia (05-27) and Bruno
  (05-28) are more recent. Nothing is alarmingly stale relative to the 2026-06-08 "today".

---

## 6. Gaps and issues

### Referenced-but-missing / resolved
- **`public/sitemap.xml` is absent as a static file — but this is NOT a gap:** it is
  generated dynamically by **`functions/sitemap.xml.js`**. `robots.txt` points at it
  correctly.
- All other shell-referenced assets exist: `app.js`, `styles.css`, `ttc-home.css`,
  `ttc-home.js`, `impact.js`, `favicon.svg`, `robots.txt`, `og-image.png`, `_routes.json`,
  `_headers`, `404.html`, `/data/guides-content.json` (107 KB).
- `guides-content.json` has content for **all 15** `GUIDE_ROUTES` (no guide route is missing
  its long-form content).

### Inconsistent fields across records
1. **`datetime_iso` timezone convention is inconsistent.** UTC `Z` suffix for
   morgan-wallen/harry-styles/bts/olivia and 53 bruno events; **naive (no offset)** for
   ariana (38), bad-bunny (24), jay-z (3), and 3 bruno events. Bruno Mars **mixes both within
   one artist.** The server's `formatShowDateServer`/`futureShowsForArtist` parse with
   `Date.parse` and format with `timeZone: "UTC"`; naive strings are interpreted as local by
   JS (which is UTC on Workers, so it currently displays correctly), but the convention is
   fragile and should be normalised.
2. **Blank `tour_name`** on all 86 Olivia Rodrigo and all 56 Bruno Mars events (142 events).
   Matches CLAUDE.md known issue #172, but the doc only calls out Olivia — **Bruno Mars has
   the same problem and is not listed there.**
3. **Missing `timezone`** on 18 events (8 Olivia, 10 Bruno).
4. **Catalog artist records have uneven schemas:** `olivia-rodrigo` and `bruno-mars` lack
   `genres`, `country`, `official_website`, `image_alt`, `why_demand_is_high`, and
   `provider_status`; **only `beyonce`** has `provider_status` at all (the other 9 omit it).
   `official_website` being absent means `artistSchema` emits no `sameAs` for those two
   artists. (Most of these fields are otherwise unused by `[[path]].js`, so impact is mostly
   SEO/schema completeness.)

### Routes that exist in code but have no data
5. **Tour routes are dead.** `[[path]].js` fully implements `type: "tour"`
   (`/artists/<slug>/<tourSlug>`), but **`catalog.tours` is `[]`**, so no tour route can
   ever resolve. Dead code path until tour data is added (and tour pages are a parked item).

### Likely-broken / silent-drop behaviour
6. **Stale `related_guides` slugs silently drop links.** `harry-styles`, `bts`,
   `bad-bunny`, and `morgan-wallen` list `"best-time-to-buy-concert-tickets"` in
   `related_guides`. That slug is **only an `OLD_GUIDE_REDIRECTS` key, not a `GUIDE_ROUTES`
   key.** `renderMainContent` matches `related_guides` against `GUIDE_ROUTES` **without
   resolving redirects**, so this related-guide link is silently filtered out (`return ""`)
   on all four artist pages. Low severity (no error, just a missing link), but it means
   those pages show fewer related guides than intended.

### Duplication / drift risk (not bugs, but maintenance hazards)
7. **Route metadata and guide lists are duplicated in three places:** `_route-metadata.js`
   (server), `app.js` `guidePages`/`oldGuideRedirects` (client fallback), and
   `GUIDE_CLUSTERS` in `[[path]].js`. Edits must be mirrored or the client fallback drifts.
8. **`artists.json` and `fallbackEventsData`/`fallbackArtistsData` are duplicated inline in
   `index.html`.** Updating the data files without updating the inline copies leaves the
   no-JS fallback stale.
9. **Two style systems:** `styles.css` defines `.site-header`/`.brand`/`.site-nav` etc., but
   the live shell renders `ttc-*` chrome classes from `ttc-home.css`. Some `styles.css`
   chrome rules appear to be superseded.
10. **`events.json` (rich, server) vs `events-index.json` (slim, homepage JS) vs per-artist
    files (rich)** must all stay in sync — three representations of the same 272 events with
    no single generator verified in this survey (`scripts/sync-events-data.py` /
    `partition-events.py` exist for this; CLAUDE.md issue #174 Phase B parks the hardening).

---

## 7. Three most important findings

1. **The data layer is triplicated and convention-inconsistent, which is the main fragility.**
   The same 272 events live in `events.json` (rich, what the server uses),
   `events-index.json` (slim, what the homepage JS uses), and 8 per-artist files (rich) —
   plus a 6-event inline copy in `index.html`. On top of that, `datetime_iso` mixes UTC-`Z`
   and naive formats (Bruno Mars mixes both), 142 events have blank `tour_name`, and 18 lack
   `timezone`. Nothing is visibly broken today, but any edit must touch multiple files and
   respect an unwritten datetime convention.

2. **Two catalog artist records (Olivia Rodrigo, Bruno Mars) are second-class citizens.**
   They're missing six fields every other artist has (`genres`, `country`,
   `official_website`, `image_alt`, `why_demand_is_high`, `provider_status`), all their
   events have blank `tour_name`, and Bruno's verification metadata is the newest yet least
   complete. These are the two artists most likely to produce thin/odd pages or weaker schema.

3. **A real (if low-severity) rendering bug: stale `related_guides` slugs drop silently.**
   Four artists reference `"best-time-to-buy-concert-tickets"`, which is a redirect-only slug
   and not a live `GUIDE_ROUTES` key, so the server filters those related-guide links out
   without error. Also worth knowing structurally: the entire **tour route system is dead**
   (`catalog.tours: []`), and **route/guide metadata is duplicated across three files**, so
   any future routing work needs to keep server + client-fallback in sync.
