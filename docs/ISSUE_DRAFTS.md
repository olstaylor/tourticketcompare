# GitHub Issue Drafts

Last updated: 2026-05-19

These are copy/paste-ready drafts. Do not create issues automatically unless the environment explicitly supports it and the exact issue content is shown first.

## 1. Fix raw HTML routing and canonical metadata for public routes — DONE (2026-05-18)

Implemented via commits `0f85c5a` ("Strengthen per-route raw HTML smoke evidence") and merged PR #125. Per-route raw HTML assertions now run in `scripts/smoke-prelaunch.mjs`.

**Title:** Prove and fix raw HTML routing/canonical metadata for public routes

**Problem:**
Public non-root routes must return correct server-rendered HTML without relying on client-side JavaScript. Before SEO scaling, prove that representative routes return the correct status code, title, canonical, H1/body content, redirects, and 404/noindex behavior in the raw response. If a mismatch exists, fix only the smallest routing or metadata issue.

**Scope:**
- Check raw responses for `/artists`, `/artists/beyonce`, `/guides`, one guide page, one trust page, an old guide redirect, an unknown artist, and an unknown route.
- Verify canonical URLs, titles, H1/body content, status codes, redirect locations, and noindex behavior.
- If fixing is required, keep changes limited to routing/metadata rendering.

**Files to inspect:**
- `functions/_middleware.js`
- `functions/[[path]].js`
- `functions/_route-metadata.js`
- `public/_routes.json`
- `functions/sitemap.xml.js`
- `public/index.html`

**Hard rules:**
- Do not modify `/api/out`, Impact logic, affiliate redirects, provider URLs, CTA generation, destination URL logic, event data, artist data, or provider data.
- Do not touch SeatGeek redirect logic, diagnostic API routes, provider abstraction, fallback catalog, or legacy deployment files.
- Do not invent content, tours, events, venues, prices, availability, providers, or ticket links.

**Acceptance criteria:**
- Raw HTML for representative public routes contains the expected route-specific title, canonical, and H1/body content.
- Old guide redirects return the expected 301 target.
- Unknown public routes return 404 with noindex.
- Sitemap and canonical behavior do not conflict.
- No protected files or product data are changed.

**Checks to run:**
- `git diff --check`
- If runtime code changes: `node --check 'functions/[[path]].js'`
- If middleware changes: `node --check functions/_middleware.js`
- If runtime code changes: `node scripts/smoke-prelaunch.mjs`

## 2. Build SeatGeek promo code guide safely — DONE (2026-05-18)

Implemented via commit `c9f2203` ("Add safe SeatGeek promo and ticket-buying guides").

**Title:** Add a safe SeatGeek promo code guide

**Problem:**
SeatGeek promo-code searches are valuable, but the site must not invent promo codes, discounts, savings, eligibility, or availability. A guide can capture intent by explaining how to verify codes and checkout totals safely.

**Scope:**
- Draft a guide that explains how SeatGeek promo codes generally work, what users should verify, and why final eligibility is confirmed on SeatGeek.
- Include conservative language around fees, restrictions, expiration, and event eligibility.
- Wire the guide only through existing guide metadata/content patterns if implementation is part of the task.

**Files to inspect:**
- `functions/_route-metadata.js`
- `public/data/guides-content.json`
- `functions/[[path]].js`
- `functions/sitemap.xml.js`
- `public/app.js`

**Hard rules:**
- Do not publish a promo code unless verified from an approved source during the task.
- Do not claim guaranteed savings, working discounts, live pricing, or guaranteed availability.
- Do not modify `/api/out`, Impact logic, provider URLs, CTA generation, or SeatGeek redirect behavior.

**Acceptance criteria:**
- Guide content is useful without unsupported promo-code claims.
- Copy states that codes, final totals, fees, availability, and eligibility are confirmed on SeatGeek.
- No fake comparison tables or placeholder prices are introduced.
- Any new route has matching metadata, sitemap inclusion, and server-rendered content.

**Checks to run:**
- `git diff --check`
- If guide metadata/content changes: `node --check 'functions/[[path]].js'`
- If public JS changes: `node --check public/app.js`
- If route/sitemap behavior changes: `node scripts/smoke-prelaunch.mjs`

## 3. Add safe ticket-buying guide cluster

**Title:** Add safe ticket-buying guide cluster

**Problem:**
The site can grow SEO and user value with practical ticket-buying guidance, but the content must avoid invented facts, provider rankings, live-price claims, and thin duplicated pages.

**Scope:**
- Add one small cluster of evergreen guides around safe buying topics such as fees, resale risk, delivery timing, final checkout checks, or avoiding scams.
- Keep each guide distinct, practical, and conservative.
- Use existing guide content and metadata patterns.

**Files to inspect:**
- `public/data/guides-content.json`
- `functions/_route-metadata.js`
- `functions/[[path]].js`
- `functions/sitemap.xml.js`
- `public/app.js`

**Hard rules:**
- Do not invent tours, dates, venues, prices, availability, providers, or ticket links.
- Do not add Event/MusicEvent schema for generic guides.
- Do not claim live price comparison, cheapest tickets, or guaranteed availability.
- Do not touch protected redirect, affiliate, provider, or data logic.

**Acceptance criteria:**
- New guide pages have matching metadata, canonical behavior, sitemap entries, and server-rendered content.
- Copy is conservative and does not create fake comparisons or unsupported claims.
- Guide index and related links remain coherent.

**Checks to run:**
- `git diff --check`
- `node --check 'functions/[[path]].js'`
- If public JS changes: `node --check public/app.js`
- `node scripts/smoke-prelaunch.mjs`

## 4. Continue verified SeatGeek URL coverage without changing redirect logic

**Title:** Continue verified SeatGeek URL coverage without changing redirect logic

**Problem:**
SeatGeek event coverage can improve provider choice, but only verified stored event-level URLs should be added. Redirect behavior, Impact handling, and CTA gating must remain unchanged.

**Scope:**
- Use existing SeatGeek enrichment/review outputs to identify candidate event URLs.
- Apply only verified event-level SeatGeek URLs through the existing data workflow.
- Keep click-time behavior data-driven; `/api/out` must not search SeatGeek.

**Files to inspect:**
- `scripts/enrich-seatgeek-events.mjs`
- `scripts/propose-seatgeek-urls.mjs`
- `reports/`
- `public/data/events.json`
- `public/data/events/*.json`
- `data/events.csv`
- `scripts/validate-events.py`
- `scripts/smoke-prelaunch.mjs`

**Hard rules:**
- Do not modify `/api/out`, Impact logic, affiliate redirect behavior, CTA generation, destination URL logic, or provider URL construction.
- Do not add unverified SeatGeek URLs.
- Do not invent event facts, availability, prices, or ticket inventory.

**Acceptance criteria:**
- Every added SeatGeek URL is event-level, verified, and passes existing URL-shape validation.
- Root and partitioned event data remain synchronized.
- Public CTAs remain gated by stored URL validity and provider availability.

**Checks to run:**
- `git diff --check`
- `python3 scripts/validate-events.py --for-production`
- `node scripts/smoke-prelaunch.mjs`

## 5. Remove tracked .DS_Store and confirm stale D1 wording is fixed in active docs — PARTIAL

D1 wording in `CLAUDE.md` updated (2026-05-19) to reflect that `RATE_LIMIT_DB` / `CLICKS_DB` are no longer in `wrangler.toml`. `.DS_Store` removal still pending.

**Title:** Remove tracked .DS_Store and confirm active D1 status wording

**Problem:**
`functions/.DS_Store` is tracked repository noise. Active docs should also avoid saying placeholder D1 bindings still exist in `wrangler.toml`, because those placeholder blocks are gone.

**Scope:**
- Remove `functions/.DS_Store` from version control.
- Confirm `.gitignore` ignores `.DS_Store`.
- Inspect active docs for stale placeholder-D1 wording and update only active docs if needed.

**Files to inspect:**
- `functions/.DS_Store`
- `.gitignore`
- `wrangler.toml`
- `PROJECT_STATUS.md`
- `BACKLOG.md`
- `HANDOVER.md`
- `README.md`

**Hard rules:**
- Do not modify product code, event data, artist data, provider data, `/api/out`, Impact logic, routing, middleware, CTA generation, or provider URLs.

**Acceptance criteria:**
- `.DS_Store` is no longer tracked.
- `.gitignore` prevents future `.DS_Store` files.
- Active docs match the current `wrangler.toml` D1 binding state.

**Checks to run:**
- `git diff --check`

## 6. Decide provider scaffold future without implementing changes

**Title:** Decide provider scaffold future without implementing changes

**Problem:**
Provider abstraction/scaffold files may be useful future integration scaffolding, but they also add maintenance complexity. The next step is a decision record, not code removal or implementation.

**Scope:**
- Inventory provider scaffold files and docs.
- Document whether to keep, simplify, or later remove the scaffold.
- Do not implement the decision in the same task.

**Files to inspect:**
- `functions/api/_providers/index.js`
- `functions/_provider-registry.js`
- `public/data/provider-configs.json`
- `docs/PROVIDER_ABSTRACTION_ARCHITECTURE.md`
- `docs/PROVIDER_ABSTRACTION_IMPLEMENTATION.md`
- `scripts/validate-provider-structure.js`

**Hard rules:**
- Do not modify provider redirect behavior, `/api/out`, Impact logic, CTA generation, destination URL logic, or provider URLs.
- Do not delete scaffold files in this decision task.
- Do not add fake providers, fake feeds, or live price claims.

**Acceptance criteria:**
- A short recommendation exists with keep/simplify/remove-later options and risks.
- No runtime behavior changes.
- Any follow-up implementation tasks are separately scoped.

**Checks to run:**
- `git diff --check`
