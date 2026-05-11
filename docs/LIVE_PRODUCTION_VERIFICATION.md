# Live Production Verification

Last updated: 2026-05-11
Verified by: curl checks against `tourticketcompare.com` and `www.tourticketcompare.com`

---

## Summary

Production is confirmed running on Cloudflare Pages Functions. All critical bindings are active. All verified routes serve correct server-injected titles and canonical tags. The www→apex redirect is confirmed working (301) after a Cloudflare Redirect Rule was added 2026-05-11. No remaining blocking issues.

See open items at the bottom for tasks that require dashboard access or further route smoke testing.

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

### 2. impactDefaultProgramId is false

The `/api/health` binding check shows `impactDefaultProgramId: false`. The `IMPACT_DEFAULT_PROGRAM_ID` secret is not configured in the Pages project. This may be intentional if only the Ticketmaster-specific program ID is used, but should be confirmed with the account settings.

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

These were not checked in this session and should be verified before closing the migration:

- [ ] All six remaining artist pages (Harry Styles, BTS, Ariana Grande, Bad Bunny, Morgan Wallen, JAY-Z)
- [ ] All five guide pages (not just the first)
- [ ] Trust pages: `/how-it-works`, `/about`, `/contact`, `/editorial-policy`, `/affiliate-disclosure`
- [ ] `/guides` and `/artists` index pages
- [ ] Old guide redirect slugs (e.g. `/guides/compare-ticket-prices-safely` → canonical guide)
- [ ] D1 analytics recording: confirm `outbound_click` is written to `DEMAND_DB` after an `/api/out` redirect
- [ ] Whether GitHub→Pages CI is active (requires Cloudflare dashboard access)
- [ ] `IMPACT_DEFAULT_PROGRAM_ID` — confirm whether it is intentionally absent
- [ ] Cloudflare caching headers on HTML routes vs API routes

---

## Status of Standalone Worker

**The standalone Worker (`tourticketcompare-live`) is no longer serving production traffic.** Pages Functions are confirmed as the production runtime. The Worker upload recommended in the original migration plan Phase 1 has been skipped — it is not needed.

`scripts/build-standalone-worker.mjs` remains in the repo as an emergency reference but is not needed for production deploys. Its retirement is tracked in `docs/PAGES_PRODUCTION_MIGRATION_PLAN.md`.

---

## Production Readiness Checklist (as of 2026-05-11)

| Item | Status |
|---|---|
| Runtime: Cloudflare Pages Functions | ✓ Confirmed |
| `DEMAND_DB` binding active | ✓ Confirmed |
| `IMPACT_ACCOUNT_SID` / `IMPACT_AUTH_TOKEN` active | ✓ Confirmed |
| `IMPACT_TICKETMASTER_PROGRAM_ID` active | ✓ Confirmed |
| `mockMode=false`, `allowMockPrices=false` | ✓ Confirmed |
| `clickTrackingEnabled=true` | ✓ Confirmed |
| Homepage title + canonical correct | ✓ Confirmed |
| Beyoncé artist page title + canonical correct | ✓ Confirmed |
| Guide page title + canonical correct | ✓ Confirmed |
| `/api/out` Beyoncé→Ticketmaster redirect | ✓ 302 confirmed |
| 404 returns HTTP 404 + noindex | ✓ Confirmed |
| Sitemap returns 20 URLs | ✓ Confirmed |
| www→apex 301 redirect | ✓ Confirmed (fixed 2026-05-11) |
| GitHub→Pages CI pipeline | ? Unconfirmed — check Cloudflare dashboard |
| `impactDefaultProgramId` | ? False — confirm if intentional |
| All artist pages (6 remaining) | Unchecked |
| All guide pages (4 remaining) | Unchecked |
| Trust/legal pages (5) | Unchecked |
| Old guide redirect slugs | Unchecked |
| D1 analytics write confirmed | Unchecked |
