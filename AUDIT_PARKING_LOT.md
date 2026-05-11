# AUDIT_PARKING_LOT.md

Captured from: Full production-readiness audit conducted 2026-05-11.
Purpose: Preserve every finding, risk, and recommendation so nothing is lost during prioritised implementation.
Status: Analysis only. No fixes implemented yet.

---

## 1. Executive Summary

The core SSR architecture is sound and the trust/compliance posture is strong. The affiliate redirect (`/api/out`), Impact integration, and event validation pipelines are well-guarded. However, the site has a critical dual-rendering problem: a server-side renderer (`[[path]].js`) correctly builds every page, but a client-side renderer (`app.js`) immediately overwrites it with independently-maintained data. This divergence has caused several live bugs — including five active guide pages that are broken 404s for JavaScript-enabled users and Google's JS crawler right now — and will compound as content scales.

The priority is clear: fix the live content divergence bugs before any SEO push or content scaling.

---

## 2. Must-Fix Before Scaling (Critical / High)

These are active bugs or risks that affect the live site today.

---

### M1 — Five active guide pages show 404 to JavaScript-enabled users
**Severity: Critical**
**Files:** `public/app.js` (guidePages array), `functions/_route-metadata.js` (GUIDE_ROUTES)

`_route-metadata.js` defines 10 guide routes. `app.js` only knows 5 (the `guidePages` array). The five newer guides have correct SSR pages but when `app.js` runs, `getRoute()` calls `findGuide()` which searches only `guidePages`, finds nothing, and returns `{ type: "not-found" }`. The client then renders a 404 overlay over the correctly-served SSR content.

Affected guides (all have `fullContent: true` and real content in `guides-content.json`):
- `/guides/best-time-to-buy-concert-tickets`
- `/guides/how-to-avoid-ticket-scams`
- `/guides/why-ticket-prices-change`
- `/guides/ticketmaster-vs-stubhub`
- `/guides/how-resale-ticket-pricing-works`

For any user with JavaScript enabled — including Google's JS crawler — these pages are broken. Non-JS users and raw HTTP see them correctly.

Additionally, `best-time-to-buy-concert-tickets` appears in `app.js`'s `oldGuideRedirects`, which is checked *before* `findGuide()`. So even after adding it to `guidePages`, the redirect would fire first and users would be sent away from the page. The redirect entry must also be removed.

**Fix:** Add the five missing guides to the `guidePages` array in `app.js` (sections/FAQ can be derived from `guides-content.json`). Remove `best-time-to-buy-concert-tickets` from `oldGuideRedirects` in `app.js`.

---

### M2 — Old guide redirect targets diverge between server and client
**Severity: Critical**
**Files:** `functions/_route-metadata.js` (OLD_GUIDE_REDIRECTS), `public/app.js` (oldGuideRedirects)

The server and client send users to different pages for the same old slug:

| Old slug | Server target | Client target |
|---|---|---|
| `why-ticket-prices-vary` | `/guides/why-ticket-prices-change` | `/guides/ticketmaster-vs-seatgeek-vs-vivid-seats` ← **wrong** |

Additionally, the client has a redirect for `best-time-to-buy-concert-tickets` → `when-is-the-best-time-to-buy-concert-tickets` that does not exist server-side. Since `best-time-to-buy-concert-tickets` is a live guide (M1 above), this client redirect should be removed entirely, not added to the server.

Server-side users (no-JS or HTTP 301) land correctly. JavaScript-enabled users get sent to the wrong page. Google sees the 301 target; real users see a different destination.

**Fix:** In `app.js` `oldGuideRedirects`, change `"why-ticket-prices-vary"` target to `"why-ticket-prices-change"`. Remove the `best-time-to-buy-concert-tickets` entry.

---

### M3 — Homepage H1 differs between SSR and client render
**Severity: High**
**Files:** `functions/[[path]].js` (line ~627), `public/app.js` `renderHome()` (line ~661)

SSR and the smoke test both expect the homepage H1 to be:
> `"Find verified ticket links for major tours"`

`app.js` `renderHome()` renders:
> `"Browse verified ticket links and prices from top providers"`

Google's JavaScript crawler indexes the client-rendered H1. Non-JS crawlers see the SSR version. These are two different headlines on the same page. The word "prices" in the client H1 also conflicts with the trust/compliance copy rules (implies price comparison capability).

**Fix:** Change the H1 string in `app.js` `renderHome()` to match the SSR version exactly.

---

### M4 — Smoke test status needs verification and documentation update
**Severity: High (operational)**
**Files:** `scripts/smoke-prelaunch.mjs` (line 59), `PROJECT_STATUS.md`, `HANDOVER.md`

`PROJECT_STATUS.md` and `HANDOVER.md` document a smoke test false positive blocking `npm run deploy:pages:safe`. However, inspecting `smoke-prelaunch.mjs` line 59, the `allowedContext` for the `live prices claim` rule already includes `does not compare`. The documented false positive may already be fixed in the file without the documentation being updated.

The actual smoke test status needs to be verified by running `node scripts/smoke-prelaunch.mjs`. If it passes, all documentation referring to the false positive must be updated. If it still fails, the specific failing line needs to be identified and fixed.

**Fix:** Run the smoke test. Update `PROJECT_STATUS.md`, `HANDOVER.md`, and `CLAUDE.md` to reflect current real status.

---

### M5 — Five guides missing from sitemap
**Severity: High (SEO)**
**Files:** `functions/sitemap.xml.js`

`sitemap.xml.js` hardcodes 5 guide paths. `GUIDE_ROUTES` in `_route-metadata.js` now has 10 routes. The five missing guides have real content, correct SSR pages, and no `noindex` tag — but Google will not discover them from the sitemap.

Missing from sitemap:
- `/guides/best-time-to-buy-concert-tickets`
- `/guides/how-to-avoid-ticket-scams`
- `/guides/why-ticket-prices-change`
- `/guides/ticketmaster-vs-stubhub`
- `/guides/how-resale-ticket-pricing-works`

**Fix:** Import `GUIDE_ROUTES` from `_route-metadata.js` into `sitemap.xml.js` and derive guide paths dynamically rather than hardcoding them. This prevents future drift automatically.

---

## 3. Should-Fix Soon (Medium priority)

These are not live-breaking bugs today but will cause problems as content or traffic grows.

---

### S1 — Four original guides have full content only client-side
**Severity: Medium (SEO)**
**Files:** `public/app.js` (guidePages sections arrays), `public/data/guides-content.json`, `functions/_route-metadata.js`

Four of the five original guides (`ticketmaster-vs-seatgeek-vs-vivid-seats`, `how-to-avoid-overpaying-for-concert-tickets`, `when-is-the-best-time-to-buy-concert-tickets`, `primary-vs-resale-concert-tickets`) have their full sections and FAQ content only in the `guidePages` array in `app.js`. They are not in `guides-content.json` and have `fullContent: false` in `GUIDE_ROUTES`.

Their SSR pages render only a thin stub ("what this guide covers" generic text). Full content — which is already written — only appears after client-side JavaScript runs.

For Google's JavaScript crawler this may be fine, but for non-JS crawlers, these pages are thin. Long-term, content should be in `guides-content.json` and served SSR.

**Fix:** Move guide section/FAQ content for these four guides into `guides-content.json` and set `fullContent: true` in `GUIDE_ROUTES`. This is content work, not code work — the content is already written in `app.js`.

---

### S2 — `catalog.json` fetched with `cache: "no-store"` client-side
**Severity: Medium (performance)**
**Files:** `public/app.js` `loadCatalog()` (~line 1496)

`loadCatalog()` fetches `/data/catalog.json` with `cache: "no-store"`, bypassing the browser cache on every page load. The catalog only changes on deployments. There is no reason to always bypass cache. This causes an unnecessary network hit for every user on every navigation.

**Fix:** Change `cache: "no-store"` to `cache: "force-cache"` (or a short-lived `max-age`).

---

### S3 — Sitemap and smoke test hardcode route and artist lists
**Severity: Medium (maintenance burden)**
**Files:** `functions/sitemap.xml.js` (FALLBACK_ARTIST_SLUGS), `scripts/smoke-prelaunch.mjs` (artistSlugs, line 6)

Both files maintain independent hardcoded lists of artist slugs. Adding a new artist to `catalog.json` requires manually updating both files. At 50+ artists this becomes a perpetual maintenance task that will be missed.

**Fix for sitemap:** Already covered in M5 (derive dynamically from `_route-metadata.js`). The `ASSETS.fetch` already loads catalog dynamically for the artist slug list; the `FALLBACK_ARTIST_SLUGS` fallback hardcode can be thinned.

**Fix for smoke test:** Change `const artistSlugs = [...]` to derive from the already-loaded `catalog.json` object: `const artistSlugs = catalog.artists.map(a => a.slug)`.

---

### S4 — `events.json` monolith loaded for every artist page SSR
**Severity: Medium (will be critical at scale)**
**Files:** `functions/[[path]].js` `loadEvents()`

`[[path]].js` calls `loadEvents(env)` for every artist page render, which fetches and parses the entire `events.json` (currently 130 events). As artist count and event counts grow, this becomes a large payload parsed on every request within Cloudflare Worker CPU budget.

Per-artist partitioned event files already exist at `public/data/events/{artist-slug}.json`. The SSR renderer should use the partitioned file for the specific artist being rendered rather than loading all events.

**Fix:** In `[[path]].js`, replace `loadEvents(env)` with a function that fetches only `public/data/events/{artistSlug}.json` when rendering an artist page.

---

### S5 — Placeholder D1 bindings in wrangler.toml
**Severity: Medium (operational risk)**
**Files:** `wrangler.toml` (commented-out RATE_LIMIT_DB and CLICKS_DB blocks)

Two commented-out D1 blocks with `replace-with-d1-database-id` placeholder IDs exist. If accidentally uncommented, local dev and deploys would break. There is no active use case for either database currently.

**Fix:** Either provision real D1 database IDs, or delete the commented-out blocks entirely. Deletion is cleaner given neither is in use.

---

### S6 — Guide breadcrumb names don't match H1s
**Severity: Low-Medium (SEO)**
**Files:** `functions/[[path]].js` (~line 93)

Guide breadcrumbs use the `title` field (with " | TourTicketCompare" stripped), but the page H1 uses the `h1` field. For most guides these differ. For example, `ticketmaster-vs-seatgeek-vs-vivid-seats` has title `"Why Ticket Prices Vary Between Sites"` but H1 `"Why do prices vary between ticket sites?"`. Google prefers breadcrumb trail names to be consistent with page headings.

**Fix:** In `[[path]].js` guide route breadcrumb generation, use `GUIDE_ROUTES[path].h1` instead of the title.

---

## 4. Can Wait / Nice-to-Have

Lower priority improvements that can be addressed opportunistically.

---

### W1 — `renderNotFoundHtml` double-renders `<main>`
**Severity: Low (wasteful, not broken)**
**Files:** `functions/[[path]].js` `renderNotFoundHtml()`

`renderNotFoundHtml` calls `injectRoute()` which calls `renderMainContent()`. Since the route type is "not-found" and `renderMainContent` has no explicit handler for that type, it falls through to the homepage HTML as the default return. Then `renderNotFoundHtml` immediately replaces `<main>` *again* with the actual 404 content. The first render is wasted CPU.

**Fix:** Refactor `renderNotFoundHtml` to skip the `injectRoute()` call for the main content and inject the 404 body directly, or add a `"not-found"` case to `renderMainContent`.

---

### W2 — `PUBLIC_HTML_ROUTES` partially duplicates `TRUST_ROUTES` keys
**Severity: Low (code smell)**
**Files:** `functions/[[path]].js` (line ~3)

`PUBLIC_HTML_ROUTES` is `new Set(["/artists", "/guides", ...])` which is effectively the non-root keys of `TRUST_ROUTES`. Could be derived: `new Set(Object.keys(TRUST_ROUTES).filter(k => k !== "/"))`. Not breaking, just redundant.

---

### W3 — No `og:image` meta tag
**Severity: Low (social sharing)**
**Files:** `public/index.html`, `functions/[[path]].js`

No `og:image` is set in SSR or client-side meta. Social media sharing previews will appear without an image. Not blocking now but should be addressed before any social media amplification campaign.

---

### W4 — Affiliate URLs duplicated across two server-side files
**Severity: Low**
**Files:** `functions/api/shows.js` (TICKETMASTER_ARTIST_AFFILIATE_LINKS), `functions/api/out.js` (VERIFIED_TICKET_LINKS)

Both files store the same `ticketmaster.evyy.net` affiliate URLs for all 7 artists. If a link changes it must be updated in both places. `out.js` is a protected file so this requires careful scope before touching.

**Fix (future):** When explicitly scoped, consolidate into a single import or derive one from the other.

---

### W5 — `_route-metadata.js` comment references retired build path
**Severity: Low (misleading documentation)**
**Files:** `functions/_route-metadata.js` (line 2)

Comment reads: "used by both `functions/[[path]].js` (Pages Functions) and `scripts/build-standalone-worker.mjs` (standalone Worker build)." The standalone Worker build is retired. The comment should be updated to remove the reference.

---

### W6 — Guide content split creates two content storage systems
**Severity: Low**

Five guides store content in `app.js` `guidePages` arrays (client-side only). Five newer guides store content in `guides-content.json` (server + client). There is no single canonical store for guide copy. This is addressed by S1 (moving original guide content to `guides-content.json`), but noting here as a broader architecture observation.

---

## 5. SEO / Indexing Risks

Consolidated view of all SEO-affecting issues.

| Risk | Severity | Detail | Fix ref |
|---|---|---|---|
| 5 guide pages show 404 to JS crawler | **Critical** | JS-enabled crawlers see 404 overlay | M1 |
| 5 guides missing from sitemap | **High** | Google won't discover these via sitemap | M5 |
| Homepage H1 differs SSR vs client | **High** | JS crawler indexes wrong H1 | M3 |
| 4 guides have thin SSR content | **Medium** | Full guide content only in client JS | S1 |
| Guide breadcrumb ≠ H1 | **Low-Medium** | Schema/breadcrumb mismatch | S6 |
| No `og:image` | **Low** | Social cards appear without image | W3 |
| JSON-LD not updated by `setMeta()` | **Medium** | Structured data stays at SSR version after client update | See note below |
| Sitemap hardcodes routes | **Medium** | Will drift as guides are added | M5, S3 |

**JSON-LD note:** `setMeta()` in `app.js` updates `<title>` and `<meta>` tags but not the `<script type="application/ld+json">` block. Where H1s or descriptions diverge between SSR and client, a JS crawler will see updated meta but stale schema. This is implicitly fixed when the H1 alignment (M3) and guide content fixes (M1, S1) are complete, since divergence will be eliminated.

---

## 6. Routing / Rendering Risks

---

### R1 — Client-side renderer overwrites SSR content on every page load
**Severity: High (architecture)**

Every page load executes `render()` in `app.js`, which replaces the entire `<main>` content via `main.replaceChildren()`. The SSR-injected HTML is always discarded. Consequences:
- Visible "Loading..." state before catalog loads (the shell HTML has `<p style="...">Loading...</p>`)
- JSON-LD schema stays at SSR version; `<title>` and `<meta>` get client-updated
- Artist page show cards: SSR renders them correctly, then the client re-renders from scratch and attempts to transplant SSR cards back (lines 985–990 in `app.js`) — a fragile workaround
- JS-enabled crawlers index the client render, not the SSR render

This is the underlying architectural cause of most of the SEO/content bugs above. The documented "raw HTML routing" issue in `PROJECT_STATUS.md` is the same root cause.

**Long-term fix (parked):** Eliminate the client-side `render()` call entirely for pages that are fully rendered by SSR. Serve all content from SSR; use `app.js` only for interactive enhancement (search, show board hydration, nav toggle, analytics). This is a significant refactor with high SEO value. It is explicitly parked until scoped.

---

### R2 — Legacy redirect routes handled by both server and client
**Severity: Low**

Legacy routes like `/beyonce` and `/beyonce-tickets` are handled by both `[[path]].js` (301 server redirect) and `app.js` (client `window.location.replace()`). For a JS-enabled user who navigates directly, the server handles it with a clean 301. For client-side navigation (SPA-style), the client redirect fires instead. Both produce the correct destination but through different mechanisms. Not breaking now, but worth noting if the CSR/SSR architecture is simplified in future.

---

### R3 — `injectRoute` uses fragile regex string replacement
**Severity: Low**

HTML injection in `injectRoute` uses patterns like `/<main\s+id="mainContent">[\s\S]*?<\/main>/i`. If `index.html` ever adds an attribute to `<main>`, changes tag casing, or adds a second `<main>`, injection silently fails. No error is raised. The HTML shell and the injection regex must be kept manually in sync.

---

### R4 — Tour routing is implemented but untested
**Severity: Low**

`routeForPath` in `[[path]].js` handles `/artists/:slug/:tour-slug` but no tours exist in catalog. The routing code is live but produces 404s for all inputs (correct). If tour data is ever added incorrectly, the routing would silently serve unverified pages. The code path is untested by smoke tests.

---

### R5 — Named route shims are dead code while middleware is active
**Severity: Low (known)**

`functions/artists.js`, `guides.js`, etc. are never invoked while `_middleware.js` is active. They exist as routing fallbacks if middleware is ever removed. Editing them has no production effect — a persistent contributor confusion risk. Documented in `_middleware.js` comment as of recent session.

---

## 7. Data Integrity Risks

---

### D1 — Guide metadata is duplicated across server and client
**Files:** `functions/_route-metadata.js`, `public/app.js`

Full duplication:
- Guide titles, descriptions, H1s → `GUIDE_ROUTES` (server) and `guidePages` array (client)
- Route titles/descriptions → `TRUST_ROUTES` (server) and `routeMeta` (client)
- Old guide redirects → `OLD_GUIDE_REDIRECTS` (server) and `oldGuideRedirects` (client)

Any update to guide copy requires changes in two places. The divergence between these copies is the root cause of bugs M1 and M2. Long-term, a single source of truth for all metadata (ideally in `_route-metadata.js`) should feed both SSR and client, eliminating the duplication. Requires CSR/SSR architecture change to fully resolve.

---

### D2 — `fallback-catalog.json` adds complexity of uncertain value
**Files:** `public/app.js` `loadFallbackCatalog()`, `public/data/fallback-catalog.json`

The fallback catalog pattern activates only if `/data/catalog.json` fails to load. If Cloudflare Pages asset serving fails, that is a platform-level outage, not a recoverable condition. The fallback adds a stale data risk (fallback-catalog.json could become out of date with catalog.json) without providing meaningful resilience. The client already handles empty catalog gracefully via empty arrays.

---

### D3 — `slugify()` defined identically in four files
**Files:** `functions/[[path]].js`, `functions/api/shows.js`, `functions/api/out.js`, `public/app.js`

Each file defines its own copy of `slugify()` with identical logic. If the logic ever needs to change (e.g., to handle a new character class), all four copies must be updated. This is an accepted consequence of the no-build-step architecture. Note: any divergence between copies would create subtle routing bugs where the same input produces different slugs on different code paths.

---

### D4 — Affiliate URLs duplicated in two API files
(See W4 above — listed here also for data integrity view.)

---

### D5 — events.json grows unboundedly
**Files:** `public/data/events.json`, `functions/[[path]].js`

All events across all artists are stored in a single flat JSON array. Per-artist partitioned files already exist at `public/data/events/` but are not used by the SSR renderer. At 50+ artists with 100+ events each, the monolith becomes a multi-MB payload. The fix is S4 (use partitioned files in SSR).

---

## 8. Provider / API Integration Risks

---

### P1 — `impactDefaultProgramId` reports `false` in `/api/health`
**Severity: Medium (known)**

`/api/health` reports `impactDefaultProgramId: false`. The Ticketmaster-specific program ID (`IMPACT_TICKETMASTER_PROGRAM_ID`) is present and sufficient for all active Ticketmaster affiliate flows. The `impactDefaultProgramId` binding is unused in current code. Confirm whether any future provider (SeatGeek, Vivid Seats) would require it before adding those providers.

---

### P2 — SeatGeek and Vivid Seats defined in catalog but have no verified links
**Severity: Low (known)**

`catalog.json` lists SeatGeek and Vivid Seats as providers. `out.js` defines them in `PROVIDERS` with `allowedDestinationHosts`. Neither has any `VERIFIED_TICKET_LINKS` entries. Any attempt to enable them requires verified destination URLs, Impact program IDs (if applicable), and redirect behaviour testing in `/api/out`. Do not enable until all three are confirmed.

---

### P3 — Ticketmaster Discovery API is enabled but `TICKETMASTER_API_KEY` is not in wrangler.toml
**Severity: Low**

`TICKETMASTER_DISCOVERY_ENABLED=true` in wrangler.toml but `TICKETMASTER_API_KEY` is not listed. The key must exist as a Cloudflare Pages secret. If it's absent, `fetchTicketmasterArtistEvents` returns `{ shows: [], error: "missing_ticketmaster_api_key" }` gracefully. Confirm the secret is present in the Cloudflare dashboard before relying on Discovery for any artist.

---

### P4 — `TICKETMASTER_DISCOVERY_PRICE_CHECKS_ENABLED=false` silently suppresses pricing
**Severity: Low (known, intentional)**

Price checks are intentionally disabled. If this is enabled in future without a product decision on how to display timestamped prices, price data could appear in API responses that are not yet designed for it. Ensure UI changes are scoped alongside any `TICKETMASTER_DISCOVERY_PRICE_CHECKS_ENABLED=true` change.

---

### P5 — Impact `transformLinks` client script may interact with server-side Impact tracking
**Severity: Low (audit observation)**

The inline Impact script in `index.html` calls `impactStat('transformLinks')`, which transforms Ticketmaster links at runtime. All Ticketmaster CTAs route through `/api/out`, which creates server-side Impact tracking links. Depending on how `transformLinks` resolves `ticketmaster.evyy.net` URLs, there may be double-tracking on outbound clicks. Confirm with Impact attribution reporting once click volumes are meaningful.

---

### P6 — `referrer: "no-referrer"` in `index.html` may affect Impact attribution
**Severity: Low (audit observation)**
**Files:** `public/index.html` (line 13)

`<meta name="referrer" content="no-referrer">` prevents the `Referer` header from being sent on outbound requests. The server-side `trackClick()` in `out.js` reads `request.headers.get("referer")`, which will always be null/empty with this policy. Impact server-side tracking uses the stored event URL, not the referrer, so affiliate attribution itself should be unaffected. However, `sourcePath` analytics in D1 may lose referrer context.

---

## 9. Trust / Editorial Risks

---

### T1 — Client-side renderer could theoretically show stale/wrong provider copy
**Severity: Low**

`app.js` has its own `providerCopy` object with display labels and bullets for Ticketmaster, SeatGeek, and Vivid Seats. If provider copy changes in `[[path]].js`'s `renderProviderFallback`, the client copy must be updated separately. The two are not linked.

---

### T2 — No automated check that client guide pages match server guide pages
**Severity: Medium**

The smoke test verifies server-side HTML routes. It does not verify that `guidePages` in `app.js` is in sync with `GUIDE_ROUTES` in `_route-metadata.js`. The divergence that caused M1 was undetected by the smoke test. A validation step should assert that all routes defined in `GUIDE_ROUTES` have corresponding entries in either `guidePages` or explicitly documented as server-only.

---

### T3 — `app.js` hero copy contains "prices" in H1
**Severity: Low (trust/compliance)**

The client-rendered homepage H1 is `"Browse verified ticket links and prices from top providers"`. The word "prices" in a heading could imply live price comparison capability, which the site explicitly does not offer and the smoke test guards against. Fixing M3 eliminates this issue.

---

## 10. Suggested Future Backlog Items

Items that are not current bugs but would improve the system long-term. Do not action without explicit scope.

- **CSR/SSR architecture simplification:** Eliminate client-side full-page re-renders. Serve all static content SSR-only; use `app.js` for progressive enhancement (search, show board hydration, nav, analytics only). Highest-value architectural change but most invasive.
- **Single guide content store:** Consolidate all guide content (currently split between `app.js` arrays and `guides-content.json`) into a single location that feeds both SSR and client.
- **Retire legacy deployment files:** `vercel.json`, `api/` (Vercel format), `scripts/build-standalone-worker.mjs` once Pages is confirmed stable through a full production cycle.
- **Add `og:image`:** Create a single branded image and wire it up in SSR meta injection.
- **Automated guide/route sync check:** Add a validation step to `smoke-prelaunch.mjs` that asserts all routes in `GUIDE_ROUTES` are handled by `guidePages` (or explicitly excluded). Would catch M1-style bugs at deploy time.
- **Cleanup of `fallback-catalog.json`:** Assess whether the fallback provides real resilience or just complexity. If the latter, remove it.
- **Consolidate affiliate URL stores:** Merge `TICKETMASTER_ARTIST_AFFILIATE_LINKS` (shows.js) and `VERIFIED_TICKET_LINKS` (out.js). Requires explicit scope because `out.js` is a protected file.
- **Tour page routing test coverage:** Add smoke test assertions for tour-level routes once verified tour data exists.
- **Provision or retire RATE_LIMIT_DB / CLICKS_DB:** Decide and act. Placeholder IDs in `wrangler.toml` are an operational risk.
- **Derive `PUBLIC_HTML_ROUTES` from `TRUST_ROUTES`:** Minor DRY improvement in `[[path]].js`.
- **Update `_route-metadata.js` comment:** Remove reference to retired `build-standalone-worker.mjs`.
- **Consistent `Cache-Control` review:** Evaluate whether `public, max-age=300` (5 min) for HTML pages is the right TTL given how often data changes.

---

## 11. Open Questions

1. **Is the smoke test actually passing or failing today?** Documentation says it fails (false positive), but the code at `smoke-prelaunch.mjs:59` already includes `does not compare` in allowedContext. Needs a live run to confirm.

2. **Is `TICKETMASTER_API_KEY` present as a Cloudflare Pages secret?** It is not in `wrangler.toml`. If absent, the Discovery feed silently returns empty results with no visible error.

3. **Is `impactDefaultProgramId` needed for any planned feature?** `/api/health` reports `false`. If SeatGeek/Vivid Seats affiliate integration requires a default program ID, this needs to be provisioned before those providers are enabled.

4. **What is the expected behaviour of `impactStat('transformLinks')` on `/api/out` redirect URLs?** Impact's client script may attempt to transform `ticketmaster.evyy.net` URLs in the page. Since CTAs route through `/api/out` (not direct `ticketmaster.evyy.net` links), client-side transformation should have nothing to act on — but this should be confirmed.

5. **Should the `best-time-to-buy-concert-tickets` slug be a live guide page or a redirect?** Currently it is both (a live guide in `GUIDE_ROUTES` AND a redirect in `app.js`). The audit recommends treating it as a live guide (fix M1) and removing the redirect. Confirm this is the intended product decision.

6. **Should the four original guides move their full content to `guides-content.json`?** Fix S1 proposes this as the path to full SSR content. Confirm the content does not need review before the move.

7. **Is the GitHub → Cloudflare Pages CI/CD Git integration confirmed active?** `BACKLOG.md` lists this as a high-priority item to confirm. If not confirmed, every push to `main` requires a manual `npm run deploy:pages` to reach production.

---

## 12. Validation Commands

Run the relevant subset before any commit. From `CLAUDE.md` and `PROJECT_STATUS.md`:

```bash
# Syntax checks — always run before committing
node --check public/app.js
node --check 'functions/[[path]].js'
node --check functions/api/out.js

# When named route shims are touched, also check:
node --check functions/artists.js
node --check functions/guides.js
node --check functions/how-it-works.js
node --check functions/editorial-policy.js
node --check functions/affiliate-disclosure.js
node --check functions/contact.js

# Event data validation
python3 scripts/validate-events.py --for-production

# Smoke test suite (run to verify current pass/fail status — see M4)
node scripts/smoke-prelaunch.mjs

# Whitespace/conflict markers
git diff --check

# Provider structure validation
node scripts/validate-provider-structure.js
```

Additional checks suggested by this audit (not yet in validation suite):

```bash
# Verify guide routes in _route-metadata.js are a subset of guidePages in app.js
# (no automated command yet — manual inspection required)

# Verify sitemap includes all guide routes from _route-metadata.js
# (no automated command yet — manual inspection required)
```

---

*Last updated: 2026-05-11. Source: Full production-readiness audit. No fixes implemented; analysis only.*
