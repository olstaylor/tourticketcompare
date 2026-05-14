# TourTicketCompare Cleanup Audit

Date: 2026-05-14

Scope: documentation-only audit of `public/`, `functions/`, `scripts/`, `package.json`, docs/status files, and smoke/validation scripts. No cleanup has been implemented in this pass.

Status: accepted as a reference audit on 2026-05-14. This file is not the active backlog; use `BACKLOG.md` for prioritised tasks and `PROJECT_STATUS.md` for current repo state. Some findings below have since been resolved or superseded and should be re-verified before implementation.

Guardrails applied during audit:

- Do not modify `/api/out`, Impact logic, affiliate redirect behaviour, provider URLs, CTA generation, destination URL logic, or artist/event/provider datasets.
- Do not invent tours, providers, prices, availability, ticket links, or comparison claims.
- Do not remove route shims, middleware, or Cloudflare routing files unless later proven unused in production and rollback paths.
- Treat `functions/api/out.js`, `public/data/events*.json`, `public/data/artists.json`, `public/data/catalog.json`, `public/data/affiliate-routes.json`, `public/_routes.json`, `functions/_middleware.js`, `functions/[[path]].js`, and `functions/_route-metadata.js` as protected unless explicitly scoped.

## 1. Safe cleanup candidates

These candidates are documentation, local tooling, or clearly isolated housekeeping items. They should not change product behaviour if handled narrowly.

### S1 — Remove tracked macOS metadata file

- **Candidate:** `.DS_Store` is tracked in git and has no runtime or documentation purpose.
- **Why low risk:** It is not referenced by app code, Pages Functions, scripts, package scripts, or docs inspected during this audit.
- **Likely affected files:**
  - `.DS_Store` — remove from git.
  - `.gitignore` — optionally add `.DS_Store` if it is not already ignored.
- **Checks after cleanup:**
  - `git diff --check`

### S2 — Fix stale status wording about removed placeholder D1 bindings

- **Candidate:** `PROJECT_STATUS.md` still contains a risk row saying `wrangler.toml` has commented-out `RATE_LIMIT_DB` and `CLICKS_DB` placeholder D1 bindings, while the same file later says that cleanup is done and `wrangler.toml` currently only defines `DEMAND_DB`.
- **Why low risk:** Documentation-only consistency fix. No runtime code, bindings, data, or redirects change.
- **Likely affected files:**
  - `PROJECT_STATUS.md`
- **Checks after cleanup:**
  - `git diff --check`

### S3 — Update stale agent/handover notes about smoke-test false positives

- **Candidate:** `CLAUDE.md` still describes `scripts/smoke-prelaunch.mjs` as having a blocking false positive, while `PROJECT_STATUS.md` says the false positives were fixed and current status says smoke passes.
- **Why low risk:** Documentation-only correction, provided the smoke test is run first to confirm the current state.
- **Likely affected files:**
  - `CLAUDE.md`
  - `HANDOVER.md` if any remaining smoke-test status conflicts are found during the follow-up edit.
  - `AUDIT_PARKING_LOT.md` if stale parked items are retained as current guidance rather than historical notes.
- **Checks after cleanup:**
  - `node scripts/smoke-prelaunch.mjs`
  - `git diff --check`

### S4 — Clarify legacy deployment documentation without deleting rollback artifacts

- **Candidate:** Docs repeatedly mention legacy Vercel/standalone Worker paths. Keep the actual rollback artifacts for now, but tighten docs so each file has a distinct purpose and the active deploy path remains unambiguous.
- **Why low risk:** Documentation-only if limited to wording. This avoids accidentally deleting `api/`, `vercel.json`, or `scripts/build-standalone-worker.mjs` before a dedicated retirement task.
- **Likely affected files:**
  - `README.md`
  - `PROJECT_STATUS.md`
  - `HANDOVER.md`
  - `docs/ARCHITECTURE.md`
  - `docs/DEPLOYMENT.md`
  - `docs/PAGES_PRODUCTION_MIGRATION_PLAN.md`
- **Checks after cleanup:**
  - `git diff --check`

### S5 — Remove or update outdated `functions/_route-metadata.js` comment only after deciding Worker rollback status

- **Candidate:** The header says route metadata is shared by Pages Functions and `scripts/build-standalone-worker.mjs`. That remains technically true while the rollback builder imports it, but the wording can be clarified as active Pages usage plus legacy rollback usage.
- **Why low risk:** Comment-only code edit, but it touches a protected routing-adjacent file, so keep this as a small standalone change.
- **Likely affected files:**
  - `functions/_route-metadata.js`
  - `docs/ARCHITECTURE.md` if matching wording is updated there.
- **Checks after cleanup:**
  - `node --check functions/_route-metadata.js`
  - `node --check 'functions/[[path]].js'`
  - `node scripts/smoke-prelaunch.mjs`
  - `git diff --check`

### S6 — Document that named route shims are intentional fallback files

- **Candidate:** `functions/artists.js`, `functions/guides.js`, `functions/how-it-works.js`, `functions/editorial-policy.js`, `functions/affiliate-disclosure.js`, and `functions/contact.js` are one-line re-export shims that are inactive while `_middleware.js` handles HTML routes. `_middleware.js` already explains this; docs can point contributors away from editing the shims.
- **Why low risk:** Documentation-only. Do not delete the shims in the first cleanup because they are Cloudflare routing fallback files.
- **Likely affected files:**
  - `README.md`
  - `docs/ARCHITECTURE.md`
  - Possibly `PROJECT_STATUS.md`
- **Checks after cleanup:**
  - `git diff --check`

### S7 — Add npm aliases for existing validation commands

- **Candidate:** `package.json` has scripts for smoke, event validation, and provider validation, but no direct aliases for `node --check public/app.js` or `node --check 'functions/[[path]].js'`. Adding aliases could reduce command drift in docs.
- **Why low risk:** Adds convenience scripts only; existing commands remain unchanged. Do not change current deployment scripts in the same task.
- **Likely affected files:**
  - `package.json`
  - `package-lock.json` only if npm rewrites metadata; avoid unnecessary lockfile churn if possible.
  - `README.md` or validation docs if aliases are documented.
- **Checks after cleanup:**
  - `node --check public/app.js`
  - `node --check 'functions/[[path]].js'`
  - `node scripts/smoke-prelaunch.mjs`
  - `git diff --check`

## 2. Medium-risk cleanup candidates

These candidates may be safe, but they need a focused follow-up task because they touch runtime-adjacent code, provider scaffolding, or migration-era files.

### M1 — Audit unused provider abstraction stubs before removal or integration

- **Candidate:** `functions/api/_providers/index.js` imports `ProviderRegistry` but does not use it, and the provider handlers are TODO stubs returning `null`, `false`, or `not_configured`. `functions/_provider-registry.js` appears to be referenced mainly by this stub layer and provider-abstraction docs.
- **Risk:** Removing these files could discard intended future provider-integration scaffolding. Keeping them creates dead-code/confusion risk. This needs an explicit product decision: either preserve as documented future infrastructure or remove until a real provider implementation is approved.
- **Likely affected files if cleaned:**
  - `functions/api/_providers/index.js`
  - `functions/_provider-registry.js`
  - `docs/PROVIDER_ABSTRACTION_ARCHITECTURE.md`
  - `docs/PROVIDER_ABSTRACTION_IMPLEMENTATION.md`
  - `scripts/validate-provider-structure.js` only if validation expectations change.
  - `public/data/provider-configs.json` only if the provider-config model itself is retired; otherwise do not touch.
- **Checks after cleanup:**
  - `node --check functions/api/_providers/index.js` if it remains.
  - `node --check functions/_provider-registry.js` if it remains or is edited.
  - `node scripts/validate-provider-structure.js`
  - `node --check 'functions/[[path]].js'`
  - `node scripts/smoke-prelaunch.mjs`
  - `git diff --check`

### M2 — Decide whether `public/data/fallback-catalog.json` still provides useful resilience

- **Candidate:** `public/app.js` can fetch `/data/fallback-catalog.json` if `/data/catalog.json` fails. This adds a second catalog-shaped data file that can go stale.
- **Risk:** Removing it changes client error-recovery behaviour. Even if catalog asset failure is likely a platform-level issue, the fallback path is runtime behaviour and should be tested intentionally.
- **Likely affected files if cleaned:**
  - `public/app.js`
  - `public/data/fallback-catalog.json`
  - `public/_headers`
  - `scripts/smoke-prelaunch.mjs` if expected public data files are updated.
- **Checks after cleanup:**
  - `node --check public/app.js`
  - `node scripts/smoke-prelaunch.mjs`
  - `git diff --check`

### M3 — Review `scripts/local-preview-server.mjs` for removal or documentation

- **Candidate:** `scripts/local-preview-server.mjs` is not referenced in `package.json` or the docs/status files inspected. If it is useful, it should be documented; if not, it may be stale local tooling.
- **Risk:** Low runtime risk, but it may be a useful undocumented developer helper. Confirm with maintainers before deleting.
- **Likely affected files if cleaned:**
  - `scripts/local-preview-server.mjs`
  - `package.json` if adding a `preview:local` alias instead of removing.
  - `README.md` or `docs/DEPLOYMENT.md` if documenting it.
- **Checks after cleanup:**
  - `node --check scripts/local-preview-server.mjs` if it remains or is edited.
  - `node scripts/smoke-prelaunch.mjs` if package/docs workflow changes are broader.
  - `git diff --check`

### M4 — Consolidate duplicate status and handover docs

- **Candidate:** `README.md`, `PROJECT_BRIEF.md`, `PROJECT_STATUS.md`, `HANDOVER.md`, `CLAUDE.md`, `BACKLOG.md`, and several docs repeat current architecture, validation, deployment, and guardrail guidance. Some duplication is useful, but conflicting status has already appeared.
- **Risk:** Documentation-only but broad. Large doc rewrites can obscure important guardrails, especially protected areas and production deployment cautions.
- **Likely affected files:**
  - `README.md`
  - `PROJECT_BRIEF.md`
  - `PROJECT_STATUS.md`
  - `HANDOVER.md`
  - `CLAUDE.md`
  - `BACKLOG.md`
  - `docs/ARCHITECTURE.md`
  - `docs/DEPLOYMENT.md`
- **Checks after cleanup:**
  - `git diff --check`

### M5 — Tighten oversized smoke script only after adding coverage-preserving tests

- **Candidate:** `scripts/smoke-prelaunch.mjs` is large and contains many focused assertions, fixtures, and route simulations. There may be opportunities to split fixtures/helpers from assertions.
- **Risk:** This script protects against product-rule regressions. Refactoring it without behaviour changes can still weaken coverage if assertions are accidentally dropped.
- **Likely affected files:**
  - `scripts/smoke-prelaunch.mjs`
  - Optional future helper files under `scripts/` if splitting is chosen.
- **Checks after cleanup:**
  - `node scripts/smoke-prelaunch.mjs`
  - `python3 scripts/validate-events.py --for-production` if event fixtures or event assumptions are touched.
  - `git diff --check`

### M6 — Review internal Impact Publisher Tag diagnostic route when provider testing is complete

- **Candidate:** `/internal/impact-tag-test` and its static assets are token-gated diagnostics. They may be kept for provider onboarding or removed once Impact tag testing is complete.
- **Risk:** This touches internal diagnostics and Impact-adjacent behaviour. Do not modify during general cleanup unless explicitly scoped.
- **Likely affected files:**
  - `functions/[[path]].js`
  - `public/internal/impact-tag-test.css`
  - `public/internal/impact-tag-test.js`
  - `docs/IMPACT_PUBLISHER_TAG_TEST.md`
  - `scripts/smoke-prelaunch.mjs` if smoke assertions cover the route/assets.
- **Checks after cleanup:**
  - `node --check 'functions/[[path]].js'`
  - `node --check public/internal/impact-tag-test.js`
  - `node scripts/smoke-prelaunch.mjs`
  - `git diff --check`

### M7 — Review `functions/api/debug-seatgeek.js` after SeatGeek onboarding

- **Candidate:** `functions/api/debug-seatgeek.js` is a token-gated provider diagnostic endpoint. It is covered by smoke tests and may be valuable while SeatGeek attribution is being validated.
- **Risk:** It touches provider/Impact diagnostics. Do not remove or simplify until SeatGeek integration state is decided.
- **Likely affected files:**
  - `functions/api/debug-seatgeek.js`
  - `scripts/smoke-prelaunch.mjs`
  - SeatGeek docs/reports if the endpoint is retired.
- **Checks after cleanup:**
  - `node --check functions/api/debug-seatgeek.js`
  - `node scripts/smoke-prelaunch.mjs`
  - `git diff --check`

## 3. High-risk / do-not-touch areas

Do not include these in generic cleanup. They require explicit product or infrastructure scope.

### H1 — Affiliate redirect and Impact logic

- **Do not touch:**
  - `functions/api/out.js`
  - Any `VERIFIED_TICKET_LINKS` logic inside `functions/api/out.js`
  - Impact credential handling or affiliate-link generation
  - Affiliate redirect fallback behaviour
  - Provider destination allowlists used by outbound redirects
- **Reason:** This is protected revenue, tracking, and safety logic. Incorrect changes can break verified redirects, leak secrets, or alter attribution.
- **Checks if explicitly scoped later:**
  - `node --check functions/api/out.js`
  - `node scripts/smoke-prelaunch.mjs`
  - `python3 scripts/validate-events.py --for-production`
  - `git diff --check`

### H2 — Event, artist, provider, and destination data

- **Do not touch:**
  - `public/data/events.json`
  - `public/data/events-index.json`
  - `public/data/events/*.json`
  - `public/data/artists.json`
  - `public/data/catalog.json`
  - `public/data/affiliate-routes.json`
  - Provider URLs, CTA generation inputs, destination URL logic, or verified ticket links
- **Reason:** Data changes can invent or remove tours, dates, venues, destinations, and ticket-link eligibility. This audit did not verify any new source data.
- **Checks if explicitly scoped later:**
  - `python3 scripts/validate-events.py --for-production`
  - `node scripts/smoke-prelaunch.mjs`
  - `git diff --check`

### H3 — Cloudflare routing and HTML-rendering entry points

- **Do not touch during general cleanup:**
  - `public/_routes.json`
  - `functions/_middleware.js`
  - `functions/[[path]].js`
  - Named route shims unless only syntax-checking or documenting them
  - `functions/sitemap.xml.js` unless sitemap scope is explicit
- **Reason:** These files affect all public HTML routes, canonical metadata, JSON-LD, route redirects, and Cloudflare Pages dispatch.
- **Checks if explicitly scoped later:**
  - `node --check 'functions/[[path]].js'`
  - `node --check functions/_middleware.js`
  - `node --check functions/sitemap.xml.js` if touched.
  - `node scripts/smoke-prelaunch.mjs`
  - `git diff --check`

### H4 — Legacy deployment artifacts before a dedicated retirement task

- **Do not delete casually:**
  - `api/`
  - `vercel.json`
  - `scripts/build-standalone-worker.mjs`
  - `archive/vercel-experimental/`
- **Reason:** They are documented as non-production or rollback/migration artifacts. Removing them is likely reasonable eventually, but only after the Pages production cycle and rollback policy are explicitly confirmed.
- **Checks if explicitly scoped later:**
  - `node scripts/smoke-prelaunch.mjs`
  - `git diff --check`

### H5 — Public app rendering copy and ticket CTAs

- **Do not touch as cleanup:**
  - `public/app.js` ticket-link rendering, CTA text, provider cards, route mapping, and empty states
  - `public/styles.css` CTA/layout selectors unless visual QA is in scope
- **Reason:** Even copy or selector cleanup can alter user-facing claims, CTA visibility, or route behaviour.
- **Checks if explicitly scoped later:**
  - `node --check public/app.js`
  - `node scripts/smoke-prelaunch.mjs`
  - `git diff --check`

## 4. Duplicate or stale files, if any

The following files or areas appear duplicate, stale, or potentially stale. These are findings only; no files were changed.

| Area | Finding | Risk level | Notes |
|---|---|---:|---|
| `.DS_Store` | Tracked macOS metadata file. | Safe | Best first deletion candidate. |
| `PROJECT_STATUS.md` | Contains both stale placeholder-D1 risk wording and later wording saying placeholder-D1 cleanup is done. | Safe | Documentation consistency issue. |
| `CLAUDE.md` | Appears to preserve stale smoke-test false-positive status that conflicts with current `PROJECT_STATUS.md`. | Safe | Confirm with `node scripts/smoke-prelaunch.mjs` before editing. |
| `README.md`, `PROJECT_BRIEF.md`, `PROJECT_STATUS.md`, `HANDOVER.md`, `CLAUDE.md`, `BACKLOG.md` | Substantial overlapping operational guidance. | Medium | Consolidate carefully to avoid removing guardrails. |
| `functions/api/_providers/index.js` | Provider API stubs with TODOs and an unused `ProviderRegistry` import. | Medium | Decide preserve-vs-remove; future integration scaffold may be intentional. |
| `functions/_provider-registry.js` | Provider registry abstraction appears mostly tied to future provider scaffold. | Medium | Do not remove unless provider scaffold is intentionally retired. |
| `public/data/fallback-catalog.json` | Duplicate catalog-shaped fallback data. | Medium | Possible stale-data risk but runtime fallback behaviour changes if removed. |
| `scripts/local-preview-server.mjs` | No references found in package/docs/status files inspected. | Medium | Either document or remove after maintainer confirmation. |
| `api/` and `vercel.json` | Legacy Vercel-format artifacts, not current production path. | High | Do not delete until rollback/deployment retirement is explicitly scoped. |
| `scripts/build-standalone-worker.mjs` | Legacy standalone Worker rollback builder. | High | Protected by status docs; do not delete as generic cleanup. |
| `AUDIT_PARKING_LOT.md` | Existing audit-style parking lot overlaps with this cleanup audit and may include stale findings. | Medium | Consider archiving, superseding, or marking historical after this audit is accepted. |

## 5. Suggested order of cleanup

1. **Housekeeping-only pass:** remove `.DS_Store`; add or confirm `.DS_Store` ignore rule; run `git diff --check`.
2. **Status-doc consistency pass:** fix stale `PROJECT_STATUS.md`, `CLAUDE.md`, and any `HANDOVER.md` smoke/D1 contradictions; run `node scripts/smoke-prelaunch.mjs` and `git diff --check`.
3. **Docs ownership pass:** define distinct purposes for `README.md`, `PROJECT_BRIEF.md`, `PROJECT_STATUS.md`, `HANDOVER.md`, `CLAUDE.md`, and `BACKLOG.md`; keep protected-area rules intact; run `git diff --check`.
4. **Provider-scaffold decision pass:** decide whether `functions/api/_providers/index.js`, `functions/_provider-registry.js`, `public/data/provider-configs.json`, and related provider docs are active roadmap scaffolding or premature dead code; run provider validation and smoke checks.
5. **Fallback-catalog decision pass:** decide whether the client catalog fallback is worth keeping; if removed, update app code, headers, and smoke expectations together; run app syntax and smoke checks.
6. **Legacy deployment retirement pass:** only after explicit approval, retire `api/`, `vercel.json`, and/or `scripts/build-standalone-worker.mjs`; update deployment docs in the same branch; run smoke checks.
7. **Runtime refactor pass:** only after the safe/documentation cleanups, consider splitting large scripts or public app helpers, with coverage-preserving smoke tests.

## 6. Exact files likely affected by proposed cleanup

Grouped by proposed cleanup:

- **S1 remove tracked macOS metadata:** `.DS_Store`, `.gitignore`.
- **S2 fix placeholder-D1 status docs:** `PROJECT_STATUS.md`.
- **S3 fix stale smoke-test notes:** `CLAUDE.md`, `HANDOVER.md`, `AUDIT_PARKING_LOT.md`.
- **S4 clarify legacy deployment docs:** `README.md`, `PROJECT_STATUS.md`, `HANDOVER.md`, `docs/ARCHITECTURE.md`, `docs/DEPLOYMENT.md`, `docs/PAGES_PRODUCTION_MIGRATION_PLAN.md`.
- **S5 clarify route metadata comment:** `functions/_route-metadata.js`, `docs/ARCHITECTURE.md`.
- **S6 document route shims:** `README.md`, `docs/ARCHITECTURE.md`, `PROJECT_STATUS.md`.
- **S7 add validation aliases:** `package.json`, possibly `package-lock.json`, and any docs that mention validation commands.
- **M1 provider scaffold decision:** `functions/api/_providers/index.js`, `functions/_provider-registry.js`, `docs/PROVIDER_ABSTRACTION_ARCHITECTURE.md`, `docs/PROVIDER_ABSTRACTION_IMPLEMENTATION.md`, `scripts/validate-provider-structure.js`, possibly `public/data/provider-configs.json`.
- **M2 fallback catalog decision:** `public/app.js`, `public/data/fallback-catalog.json`, `public/_headers`, `scripts/smoke-prelaunch.mjs`.
- **M3 local preview tool decision:** `scripts/local-preview-server.mjs`, `package.json`, `README.md`, `docs/DEPLOYMENT.md`.
- **M4 docs consolidation:** `README.md`, `PROJECT_BRIEF.md`, `PROJECT_STATUS.md`, `HANDOVER.md`, `CLAUDE.md`, `BACKLOG.md`, `docs/ARCHITECTURE.md`, `docs/DEPLOYMENT.md`.
- **M5 smoke script refactor:** `scripts/smoke-prelaunch.mjs`, possibly new helper files under `scripts/`.
- **M6 internal Impact diagnostic cleanup:** `functions/[[path]].js`, `public/internal/impact-tag-test.css`, `public/internal/impact-tag-test.js`, `docs/IMPACT_PUBLISHER_TAG_TEST.md`, `scripts/smoke-prelaunch.mjs`.
- **M7 SeatGeek debug endpoint cleanup:** `functions/api/debug-seatgeek.js`, `scripts/smoke-prelaunch.mjs`, SeatGeek docs/reports.
- **H4 legacy deployment retirement:** `api/`, `vercel.json`, `scripts/build-standalone-worker.mjs`, `archive/vercel-experimental/`, `docs/DEPLOYMENT.md`, `docs/PAGES_PRODUCTION_MIGRATION_PLAN.md`, `docs/ARCHITECTURE.md`, `PROJECT_STATUS.md`, `HANDOVER.md`.

## 7. Recommended first cleanup task for a follow-up Codex session

**Recommended first task:** remove the tracked `.DS_Store` file and ensure `.gitignore` excludes `.DS_Store`.

Why this should go first:

- It is the smallest cleanup with the least product risk.
- It does not touch protected routes, data, provider URLs, affiliate logic, CTA generation, or Cloudflare routing.
- It creates a clean baseline for later documentation and scaffold decisions.

Suggested follow-up prompt:

> Remove the tracked `.DS_Store` file from the repository and ensure `.gitignore` ignores `.DS_Store`. Do not modify product code, data files, `/api/out`, Impact logic, provider URLs, CTA generation, Cloudflare routing, or docs. Run `git diff --check`, show the diff summary, and commit the change.

Recommended checks for that first task:

- `git diff --check`
