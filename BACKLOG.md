# TourTicketCompare Backlog

Last updated: 2026-05-19

This is the active, prioritised backlog. `PROJECT_STATUS.md` is the current-state source of truth; `CLEANUP_AUDIT.md` is a reference audit, not the active task list.

## Recommended next 5 Codex-sized tasks

1. ~~Prove raw HTML routing/canonical behavior for public routes.~~ **Done locally 2026-05-19** (see P0.1). Still pending: confirm the same against live production once a non-blocked network is available.
2. **Build a safe SeatGeek promo code guide.** Content-only unless metadata/sitemap wiring is explicitly needed; avoid claiming a working discount unless verified.
3. **Add a safe ticket-buying guide cluster.** Publish practical guidance without invented prices, availability, providers, or live comparison claims.
4. **Continue verified SeatGeek URL coverage without changing redirect logic.** Review/apply only verified event-level URLs through the existing data workflow; do not alter `/api/out`.
5. **Remove tracked `.DS_Store` and keep status wording current.** Housekeeping-only: remove `functions/.DS_Store`, confirm `.gitignore`, and do not touch product code.

## P0 — blocking or trust-breaking

### P0.1 Prove/fix raw HTML routing and canonical metadata for public non-root routes — DONE (2026-05-19, local proof)

**Result:** All 17 representative routes inspected in local Pages preview return correct server-rendered status, canonical (self-referencing on 200s, absent on 404s), title, H1, body content, JSON-LD, old-guide 301 redirects, and 404+noindex behavior without relying on client-side JavaScript. No mismatch found; no code fix made. See `PROJECT_STATUS.md` § "P0 — raw HTML routing/canonical proof" for evidence detail.

**Still pending:** confirming the same behavior against live production (`docs/LIVE_PRODUCTION_VERIFICATION.md` § Remaining Unverified Items) — requires a non-blocked network.

### P0.2 Preserve verified ticket-link trust

**Why:** Trust is the product. Any fake price, fake event, unsupported provider button, or generic unverified CTA would be user-facing and revenue-damaging.

**Scope:**
- Keep Ticketmaster/SeatGeek/Vivid Seats CTAs hidden unless destinations are verified and allowed.
- Keep all external ticket details framed as provider-confirmed at checkout.
- Reject content that claims live price comparison, cheapest tickets, guaranteed availability, or verified inventory without approved data.

**Checks:**
- `git diff --check`
- For data/content changes: `python3 scripts/validate-events.py --for-production` and `node scripts/smoke-prelaunch.mjs`.

## P1 — important revenue, SEO, or product work

### P1.1 Build SeatGeek promo code guide safely

**Goal:** Capture SeatGeek promo-code search intent without inventing or guaranteeing discounts.

**Safe content rules:**
- Do not publish a promo code unless it is verified from an approved source at the time of writing.
- Say that codes, eligibility, inventory, fees, and final totals are confirmed on SeatGeek.
- Avoid fake comparison tables, fake savings, and time-limited claims unless sourced.

### P1.2 Add safe ticket-buying guide cluster

**Goal:** Expand useful evergreen guidance around fees, resale risk, delivery timing, checkout checks, and avoiding scams.

**Safe content rules:**
- Use practical advice, not invented provider rankings or unsupported price claims.
- Avoid Event/MusicEvent schema unless the page is about verified event data.
- Keep guides distinct enough to avoid thin/duplicated SEO pages.

### P1.3 Continue verified SeatGeek URL coverage without redirect changes

**Goal:** Increase event-level SeatGeek coverage through verified stored URLs while preserving current redirect safety.

**Scope:**
- Use existing review/enrichment scripts and reports.
- Apply only verified event-level URLs to event data in a separately scoped data task.
- Do not change `/api/out`, Impact logic, provider URL construction, CTA generation, or click-time lookup behavior.

### P1.4 Keep docs aligned after each product/data change

**Goal:** Prevent status drift now that current-state, backlog, cleanup audit, handover, and issue drafts have distinct ownership.

**Scope:**
- Update `PROJECT_STATUS.md` for current facts.
- Update `BACKLOG.md` for changed priorities.
- Update `HANDOVER.md` for short session-start guidance.
- Leave `CLEANUP_AUDIT.md` as audit reference unless accepting/superseding a cleanup finding.

## P2 — useful improvements

### P2.1 Remove tracked `.DS_Store`

**Scope:** Remove `functions/.DS_Store` from git and confirm `.gitignore` covers `.DS_Store`.

**Checks:** `git diff --check`.

### P2.2 Review stale D1/status wording across secondary docs

**Scope:** Keep active docs accurate. `wrangler.toml` no longer contains placeholder `RATE_LIMIT_DB` or `CLICKS_DB` blocks, so any remaining docs that say those placeholders exist should be updated when those docs are next touched.

### P2.3 Improve content depth for existing guide pages

**Scope:** Strengthen guide copy where useful, but keep claims conservative and source-safe.

### P2.4 Add verified artist/event coverage one small batch at a time

**Scope:** Add only source-verified artists/events/URLs. Use the existing data validation workflow. Do not invent tour facts or availability.

### P2.5 Add social sharing metadata when design/assets are ready

**Scope:** Add `og:image` only after a suitable asset exists. Avoid broad rendering refactors.

## Parked / not ready

These are intentionally not implementation tasks until explicitly scoped:

- Provider scaffold future: decide whether `functions/api/_providers/index.js`, `functions/_provider-registry.js`, provider docs, and provider validation are long-term scaffolding or cleanup candidates.
- Fallback catalog future: decide whether `public/data/fallback-catalog.json` remains necessary before changing fallback behavior.
- Legacy deployment retirement: do not delete `api/`, `vercel.json`, `archive/vercel-experimental/`, or `scripts/build-standalone-worker.mjs` without explicit approval.
- Broad smoke script refactoring: useful later, but lower priority than route proof and safe content growth.
- Diagnostic/internal endpoints and Impact publisher-tag test assets: do not remove without a dedicated decision.
- Live price aggregation: parked until approved provider feeds, usage rights, timestamping, and product copy rules exist.
- City/tour/event landing pages: parked unless verified data and canonical/indexing strategy are ready.

## Completed / accepted facts

- Cloudflare Pages Functions is the active production architecture in current docs.
- `functions/_middleware.js` documents that named route shims are fallback-only while middleware is active.
- `functions/_route-metadata.js` covers 10 guide routes; `public/data/guides-content.json` contains content for the same 10 guide routes.
- `wrangler.toml` has active `DEMAND_DB` only; placeholder D1 blocks are gone.
- Smoke test wording for the safe "does not compare" live-prices disclaimer is already allowed by the current smoke script.
- `CLEANUP_AUDIT.md` is accepted as a reference audit, not the active backlog.
