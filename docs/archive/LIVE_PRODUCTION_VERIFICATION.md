# Live Production Verification

Last updated: 2026-05-12
Verified by: curl checks against `tourticketcompare.com` and `www.tourticketcompare.com` (2026-05-11), local validation suite (2026-05-12)

---

## Summary

Production is confirmed running on Cloudflare Pages Functions as of 2026-05-11. All critical bindings are active. All verified routes serve correct server-injected titles and canonical tags. The www→apex redirect is confirmed working (301). Local validation suite passes (all syntax checks, event validation, smoke test).

**Status:** Remaining live smoke checks (6 artist pages, 4 guide pages, 5 trust pages, old guide redirects) require direct browser access or network access not blocked by Cloudflare WAF; automated curl-based verification from current environment is blocked ("Host not in allowlist").

---

## Confirmed Live Evidence

### /api/health (2026-05-11T09:27:17.927Z)

```json
{
  "ok": true,
  "service": "tourticketcompare",
  "runtime": "cloudflare-pages-functions",
  "status": "ok",
  "timestamp": "2026-05-11T09:27:17.927Z",
  "config": {
    "mockMode": false,
    "allowMockPrices": false,
    "clickTrackingEnabled": true
  },
  "bindings": {
    "demandDb": true,
    "impactAccountSid": true,
    "impactAuthToken": true,
    "impactDefaultProgramId": false,
    "impactTicketmasterProgramId": true
  }
}
```

**What this confirms:**

- Production runtime is Cloudflare Pages Functions (not the standalone Worker)
- `DEMAND_DB` D1 binding is active
- `IMPACT_ACCOUNT_SID` and `IMPACT_AUTH_TOKEN` are present
- `IMPACT_TICKETMASTER_PROGRAM_ID` is present
- `MOCK_MODE` and `ALLOW_MOCK_PRICES` are both `false`
- `CLICK_TRACKING_ENABLED` is `true`

**What this does not confirm:**

- Which specific Pages deployment is live (deploy hash unknown without dashboard access)
- Whether GitHub→Pages CI is active or whether the deployment was manual
- Whether `www.tourticketcompare.com` routes to the same Pages project (checked separately — see below)

---

### HTML Routes

| Route | HTTP status | Title | Canonical |
|---|---|---|---|
| `https://tourticketcompare.com/` | 200 | `Find Verified Ticket Options for Major Tours \| TourTicketCompare` | `https://tourticketcompare.com/` |
| `https://tourticketcompare.com/artists/beyonce` | 200 | `Beyoncé Tickets \| Verified Ticket Options` | `https://tourticketcompare.com/artists/beyonce` |
| `https://tourticketcompare.com/guides/how-to-compare-concert-ticket-prices` | 200 | `How to Compare Concert Ticket Prices \| TourTicketCompare` | `https://tourticketcompare.com/guides/how-to-compare-concert-ticket-prices` |
| `https://tourticketcompare.com/nonexistent-page-xyzabc` | 404 | `Page Not Found \| TourTicketCompare` | — |

All apex domain HTML routes return correct server-injected titles and canonical tags. The 404 route returns HTTP 404 status and `<meta name="robots" content="noindex,follow" />`.

### Affiliate Redirect

```
GET https://tourticketcompare.com/api/out?artistSlug=beyonce&provider=ticketmaster&sourcePath=/
→ 302 https://ticketmaster.evyy.net/beyonce
```

`/api/out` is routing correctly through the Pages Functions path.

### Sitemap

`https://tourticketcompare.com/sitemap.xml` returns 20 `<loc>` entries, all using the `https://tourticketcompare.com` origin. Correct.

---

## Second Verification (2026-05-11 — after www redirect fix)

| Check | HTTP status | Result |
|---|---|---|
| `https://www.tourticketcompare.com/` | **301** → `https://tourticketcompare.com/` | ✓ Fixed |
| `https://www.tourticketcompare.com/artists/beyonce` | **301** → `https://tourticketcompare.com/artists/beyonce` | ✓ Fixed |
| `https://tourticketcompare.com/` title | 200 | `Find Verified Ticket Options for Major Tours \| TourTicketCompare` ✓ |
| `https://tourticketcompare.com/` canonical | 200 | `https://tourticketcompare.com/` ✓ |
| `/api/health` runtime | 200 | `cloudflare-pages-functions` ✓ |

www→apex 301 redirect is confirmed working across both root and path-preserving routes.

---

## Open Issues

### 1. ~~www redirect is broken~~ — RESOLVED 2026-05-11

~~`https://www.tourticketcompare.com/` returns **HTTP 200** with content.~~

**Fixed.** A Cloudflare Redirect Rule was added 2026-05-11. Both `www.tourticketcompare.com/` and `www.tourticketcompare.com/artists/beyonce` now return 301 to the apex equivalent.

### 2. ✓ impactDefaultProgramId is false — RESOLVED

**Finding (2026-05-12):** Code review of `functions/api/out.js` confirms `impactConfig()` (line 227) uses exclusively `IMPACT_TICKETMASTER_PROGRAM_ID`. No active feature requires `IMPACT_DEFAULT_PROGRAM_ID`. The binding being absent is intentional and safe. Future SeatGeek/Vivid Seats provider integration may require a default or provider-specific program ID; this will be evaluated when those providers are enabled.

### 3. GitHub→Pages CI pipeline not confirmed

It is not known whether the current production deployment was triggered by a GitHub push (Cloudflare's Git integration) or a manual CLI deploy. Verify in the Cloudflare Pages dashboard whether the project is connected to the GitHub repo. If not, every deploy requires a manual `npm run deploy:pages` step.

---

## Source of Truth: Repo vs Live

| Check | Repo (main) | Live | Match |
|---|---|---|---|
| Runtime | `functions/api/health.js` reports `cloudflare-pages-functions` | Confirmed | ✓ |
| Homepage title | `Find Verified Ticket Options for Major Tours \| TourTicketCompare` (in `_route-metadata.js`) | Confirmed | ✓ |
| Artist page canonical pattern | `/artists/[slug]` | Confirmed | ✓ |
| Guide page canonical | `/guides/how-to-compare-concert-ticket-prices` | Confirmed | ✓ |
| 404 behaviour | `renderNotFoundHtml` in `[[path]].js` → 404 + noindex | Confirmed | ✓ |
| `/api/out` Beyoncé→Ticketmaster | `ticketmaster.evyy.net/beyonce` in `functions/api/out.js` | Confirmed | ✓ |
| Sitemap URL count | 20 | 20 | ✓ |
| www redirect | Not in Pages Functions code | **Not working** | ✗ |

---

## Remaining Unverified Items

These require direct browser access or network access not blocked by Cloudflare WAF. Curl-based automated checks are blocked ("Host not in allowlist"):

### HTML Routes (17 unchecked as of 2026-05-12)

**Artist pages (6 remaining):**
- [ ] `/artists/harry-styles` — verify status 200, correct title/canonical/H1
- [ ] `/artists/bts` — verify status 200, correct title/canonical/H1
- [ ] `/artists/ariana-grande` — verify status 200, correct title/canonical/H1
- [ ] `/artists/bad-bunny` — verify status 200, correct title/canonical/H1
- [ ] `/artists/morgan-wallen` — verify status 200, correct title/canonical/H1
- [ ] `/artists/jay-z` — verify status 200, correct title/canonical/H1

**Guide pages (4 remaining beyond initial check):**
- [ ] `/guides/ticketmaster-vs-seatgeek-vs-vivid-seats` — verify status 200, correct title/canonical/H1
- [ ] `/guides/how-to-avoid-overpaying-for-concert-tickets` — verify status 200, correct title/canonical/H1
- [ ] `/guides/when-is-the-best-time-to-buy-concert-tickets` — verify status 200, correct title/canonical/H1
- [ ] `/guides/primary-vs-resale-concert-tickets` — verify status 200, correct title/canonical/H1

**Index pages (2 unchecked):**
- [ ] `/artists` — verify status 200, correct title/canonical/H1
- [ ] `/guides` — verify status 200, correct title/canonical/H1

**Trust & legal pages (5 unchecked):**
- [ ] `/how-it-works` — verify status 200, correct title/canonical/H1, no fake claims
- [ ] `/about` — verify status 200, correct title/canonical/H1
- [ ] `/contact` — verify status 200, correct title/canonical/H1
- [ ] `/editorial-policy` — verify status 200, correct title/canonical/H1
- [ ] `/affiliate-disclosure` — verify status 200, correct title/canonical/H1, no fake disclosure claims

### Old Guide Redirects (3 unchecked)

Based on `functions/_route-metadata.js` OLD_GUIDE_REDIRECTS:
- [ ] `/guides/compare-ticket-prices-safely` → `/guides/how-to-compare-concert-ticket-prices`
- [ ] `/guides/why-ticket-prices-vary` → `/guides/why-ticket-prices-change`
- [ ] `/guides/avoid-overpaying-concert-tickets` → `/guides/how-to-avoid-overpaying-for-concert-tickets`

### API Endpoints (2 unchecked for full response validation)

- [ ] `/api/health` — verify status 200, all bindings reported as expected (was working 2026-05-11)
- [ ] `/api/shows?artistSlug=beyonce` — verify status 200, returns event data (was working 2026-05-11)

### D1 Analytics (1 unchecked)

- [ ] D1 analytics write path: trigger an `/api/out` click and verify `outbound_click` is recorded in `DEMAND_DB`

### Cloudflare Dashboard Items

- [ ] Whether GitHub→Pages CI pipeline is active (requires Cloudflare Pages dashboard access)
- [ ] Cloudflare caching headers on HTML routes vs API routes

---

## Status of Standalone Worker

**The standalone Worker (`tourticketcompare-live`) is no longer serving production traffic.** Pages Functions are confirmed as the production runtime. The Worker upload recommended in the original migration plan Phase 1 has been skipped — it is not needed.

`scripts/build-standalone-worker.mjs` remains in the repo as an emergency reference but is not needed for production deploys. Its retirement is tracked in `docs/archive/PAGES_PRODUCTION_MIGRATION_PLAN.md`.

---

## Local Validation Suite Results (2026-05-12)

All local validation passes:

```
✓ public/app.js syntax OK
✓ functions/[[path]].js syntax OK
✓ functions/api/out.js syntax OK
OK: 130 events validated
Cloudflare Pages MVP smoke checks passed
```

**What this confirms:**
- All JavaScript files have valid syntax
- All 130 events in `events.json` pass production validation rules
- Smoke test suite (copy validation, price claim detection, fake data detection) passes

**What this does NOT confirm:**
- Live route behavior (requires network access to production domain)
- D1 database writes (requires production environment)
- Cloudflare caching behavior (requires Cloudflare dashboard or live network inspection)

---

## Manual Smoke Check Template

For each route below, visit in a browser and verify:

1. **HTTP Status**: Page loads (no 404, 403, 500, etc.)
2. **Title**: Correct page-specific title in browser tab and `<title>` tag
3. **Canonical**: Correct `<link rel="canonical">` pointing to the route itself
4. **H1**: First heading matches the page topic (not fallback to homepage)
5. **No fake claims**: No "live price comparison", "cheapest", "best price" unless explicitly supported
6. **No invented data**: No fake prices, dates, venues, availability, providers
7. **No fake CTAs**: No placeholder affiliate links or disabled buttons

### Artist Pages
- [ ] `https://tourticketcompare.com/artists/harry-styles` — Title should contain "Harry Styles"
- [ ] `https://tourticketcompare.com/artists/bts` — Title should contain "BTS"
- [ ] `https://tourticketcompare.com/artists/ariana-grande` — Title should contain "Ariana Grande"
- [ ] `https://tourticketcompare.com/artists/bad-bunny` — Title should contain "Bad Bunny"
- [ ] `https://tourticketcompare.com/artists/morgan-wallen` — Title should contain "Morgan Wallen"
- [ ] `https://tourticketcompare.com/artists/jay-z` — Title should contain "JAY-Z"

### Guide Pages
- [ ] `https://tourticketcompare.com/guides/ticketmaster-vs-seatgeek-vs-vivid-seats` — Title should contain "Ticketmaster"
- [ ] `https://tourticketcompare.com/guides/how-to-avoid-overpaying-for-concert-tickets` — Title should contain "Avoid Overpaying"
- [ ] `https://tourticketcompare.com/guides/when-is-the-best-time-to-buy-concert-tickets` — Title should contain "Best Time"
- [ ] `https://tourticketcompare.com/guides/primary-vs-resale-concert-tickets` — Title should contain "Primary"

### Index Pages
- [ ] `https://tourticketcompare.com/artists` — List of artists present
- [ ] `https://tourticketcompare.com/guides` — List of guides present

### Trust & Legal Pages
- [ ] `https://tourticketcompare.com/how-it-works` — How It Works content
- [ ] `https://tourticketcompare.com/about` — About content
- [ ] `https://tourticketcompare.com/contact` — Contact content
- [ ] `https://tourticketcompare.com/editorial-policy` — Editorial Policy content
- [ ] `https://tourticketcompare.com/affiliate-disclosure` — Affiliate Disclosure content

### Old Guide Redirects (verify they redirect to new canonical URLs)
- [ ] `https://tourticketcompare.com/guides/compare-ticket-prices-safely` → `/guides/how-to-compare-concert-ticket-prices` (301 redirect)
- [ ] `https://tourticketcompare.com/guides/why-ticket-prices-vary` → `/guides/why-ticket-prices-change` (301 redirect)
- [ ] `https://tourticketcompare.com/guides/avoid-overpaying-concert-tickets` → `/guides/how-to-avoid-overpaying-for-concert-tickets` (301 redirect)

### API Endpoints
- [ ] `https://tourticketcompare.com/api/health` — JSON response with `ok: true`, all bindings present
- [ ] `https://tourticketcompare.com/api/shows?artistSlug=beyonce` — JSON response with event data for Beyoncé

---

## Production Readiness Checklist (as of 2026-05-12)

### Confirmed (2026-05-11 and 2026-05-12)

| Item | Status | Evidence |
|---|---|---|
| Runtime: Cloudflare Pages Functions | ✓ Confirmed | `/api/health` returns `runtime: "cloudflare-pages-functions"` |
| `DEMAND_DB` binding active | ✓ Confirmed | `/api/health` reports `demandDb: true` |
| `IMPACT_ACCOUNT_SID` / `IMPACT_AUTH_TOKEN` active | ✓ Confirmed | `/api/health` reports both true |
| `IMPACT_TICKETMASTER_PROGRAM_ID` active | ✓ Confirmed | `/api/health` reports `impactTicketmasterProgramId: true` |
| `mockMode=false`, `allowMockPrices=false` | ✓ Confirmed | `/api/health` confirms both false |
| `clickTrackingEnabled=true` | ✓ Confirmed | `/api/health` confirms true |
| Homepage title + canonical correct | ✓ Confirmed | Title: "Find Verified Ticket Options for Major Tours \| TourTicketCompare", canonical: `/` |
| Beyoncé artist page title + canonical correct | ✓ Confirmed | Title contains "Beyoncé", canonical: `/artists/beyonce` |
| Guide page title + canonical correct | ✓ Confirmed | Title: "How to Compare Concert Ticket Prices...", canonical: `/guides/how-to-compare-concert-ticket-prices` |
| `/api/out` Beyoncé→Ticketmaster redirect | ✓ 302 confirmed | GET with `artistSlug=beyonce&provider=ticketmaster` → 302 to `ticketmaster.evyy.net/beyonce` |
| 404 returns HTTP 404 + noindex | ✓ Confirmed | Unknown routes return 404 + `<meta name="robots" content="noindex,follow" />` |
| Sitemap returns 20 URLs | ✓ Confirmed | `/sitemap.xml` returns 20 `<loc>` entries |
| www→apex 301 redirect | ✓ Confirmed (fixed 2026-05-11) | `www.tourticketcompare.com/*` → `tourticketcompare.com/*` |
| `impactDefaultProgramId` not required | ✓ Confirmed (2026-05-12) | Code review: `functions/api/out.js` uses only `IMPACT_TICKETMASTER_PROGRAM_ID` |
| Local validation suite | ✓ All pass (2026-05-12) | JS syntax checks, event validation, smoke test all pass |

### Not Yet Verified (requires network access to production)

| Item | Status | Action |
|---|---|---|
| All artist pages (6 remaining) | ⚠ Pending | Use manual smoke check template in browser |
| All guide pages (4 remaining) | ⚠ Pending | Use manual smoke check template in browser |
| Index pages (`/artists`, `/guides`) | ⚠ Pending | Use manual smoke check template in browser |
| Trust/legal pages (5) | ⚠ Pending | Use manual smoke check template in browser |
| Old guide redirect slugs (4) | ⚠ Pending | Use manual smoke check template in browser |
| GitHub→Pages CI pipeline | ⚠ Pending | Check Cloudflare Pages dashboard under Deployments |
| D1 analytics write confirmed | ⚠ Pending | Trigger `/api/out` click and query `DEMAND_DB` |
| Cloudflare caching headers | ⚠ Pending | Inspect HTTP response headers in browser DevTools |
