# Phase 2 — Artist-page SEO handoff

> **Status: Phase 2 implemented.** Artist-city landing pages
> (`/artists/<artist>/tickets/<city>`) are live via `functions/_artist-cities.js`
> and the `artist-city` route in `functions/[[path]].js`, with sitemap/`llms.txt`
> inclusion, publishable-gated structured data, a redirect/404 expiry lifecycle,
> and tests in `scripts/artist-cities.test.mjs`, `scripts/smoke-prelaunch.mjs`,
> `scripts/audit-internal-links.mjs`, and `scripts/validate-route-schema.mjs`.
> See `docs/ARCHITECTURE.md` (“Artist-city aggregation layer”) for the shipped
> design. The sections below are retained as the original Phase 1→2 handoff
> context; Phase 3 candidates (editorial differentiation, content seeding,
> measurement) remain open.

This document is the handoff after **Phase 1** of the artist-page SEO project.
Phase 1 improved the existing main artist pages and introduced a reusable,
typed, data-driven content architecture. Phase 2 is now implemented — this file
records what remained, the constraints that carry over, and where the seams are.

Read `CLAUDE.md` → `PROJECT_STATUS.md` → `BACKLOG.md` before starting Phase 2.
Nothing here overrides the product guardrails in `SAFE_PUBLISHING_RULES.md`,
`docs/CONTENT_RULES.md`, or `docs/PROVIDER_DATA_POLICY.md`.

---

## What Phase 1 shipped (context for Phase 2)

Branch: `claude/artist-page-seo-phase-1-3bmr3n`.

- **New module `functions/_artist-content.js`** — the single, typed (JSDoc),
  pure source of truth for the *derived* editorial content on an artist page:
  search-focused intro, data-derived tour summaries, ticket-buying guide, and
  the pricing explanation. It returns plain data only (no HTML, no DOM, no
  provider logic) and is unit-tested in `scripts/artist-content.test.mjs`.
- **Server render (`functions/[[path]].js`)** now renders, for every main artist
  page:
  - a search-focused H1 (unchanged wording) + a richer, search-focused intro
    (`artistSearchIntro`),
  - **data-derived tour summaries** grouped from publishable event `tour_name`
    values (count, city count, date range, sample cities — no invented data),
  - **tickets-by-city** and venue internal links (existing helpers, now inside
    the preserved container),
  - a **ticket-buying guide**,
  - a **pricing explanation with safe fallbacks** (snapshot framing, no ranking,
    reads correctly when no snapshot is available),
  - the existing visible FAQs, related-guide cluster, and internal links.
  - All of the derived block is wrapped in a single
    `<div data-artist-extra-content>` container.
- **Client hydration parity (`public/app.js`)** — `renderArtist` now
  **transplants** the server-rendered `[data-artist-extra-content]` node
  unchanged instead of dropping it, and mirrors the new intro
  (`artistPageIntro`). This also **fixes a pre-existing parity gap**: the
  cities/venues sections were previously wiped on hydration.
- **Affiliate tracking, `/api/out`, analytics, and provider allowlisting were
  not touched.** The content module holds no provider, price, or CTA logic; all
  CTAs still flow through the existing gated show-board renderer and `/api/out`.
- **Tests:** new `scripts/artist-content.test.mjs` (wired into `test:mvp` via
  `npm run test:artist-content`) plus new artist-content assertions in
  `scripts/smoke-prelaunch.mjs`. `functions/_artist-content.js` was added to the
  smoke public-copy safety lists.
- **Metadata/canonicals/structured data:** unchanged mechanics — per-artist
  `seo_title`/`meta_description` from `catalog.json`, canonical + robots emitted
  in `injectRoute`, and the existing `Person`/`MusicGroup` + `FAQPage` +
  `MusicEvent` (publishable-gated) JSON-LD graph.

### Architectural seam to reuse in Phase 2

The Phase 1 pattern is worth repeating: **derive content once, server-side, in a
pure typed module; render it into a single `data-*` container; have the client
transplant that container rather than rebuild it.** This avoids the
server/client duplication that the rest of the codebase manages with "keep in
sync" comments, and it keeps all copy in one auditable place. `public/app.js` is
a classic script (no ES module imports; CSP-hashed), so a *shared runtime*
module across server and browser is not available — the transplant approach is
the substitute.

---

## Remaining work (Phase 2)

### 1. Artist-city landing pages (the big one — explicitly deferred in Phase 1)

Create `/artists/<artist>/<city>` (or the chosen URL shape) landing pages that
combine an artist with a city, backed only by reviewed `events.json` records.

- **Routing:** add the pattern in `functions/[[path]].js` `routeForPath`. Note
  the existing `/artists/<a>/<b>` route is already claimed by the **tour** route
  (`tourMatch`) and by the `/artists/<a>/tickets` redirect — pick a
  non-colliding shape (e.g. `/artists/<artist>/tickets/<city>` or a distinct
  `/concerts/<artist>-<city>` scheme) and decide precedence deliberately.
- **Indexability gate:** mirror the city/venue substantial-content approach
  (`functions/_cities.js`, `_venues.js`) — only index a combination with enough
  reviewed upcoming shows; everything thinner is `noindex`; unknown combos 404.
- **Content:** reuse `functions/_artist-content.js` builders where possible
  (buying guide, pricing) and add a city-scoped tour/date summary. Do **not**
  invent city facts; derive from events only.
- **Canonicals:** decide the canonical relationship between the artist page, the
  city page, and the new artist-city page to avoid duplicate-content dilution.
- **Guardrail:** this is in the **"Explicitly parked"** list in `BACKLOG.md`
  ("Tour / individual event landing pages" / no separate canonical strategy) —
  it needs owner scope sign-off before building, same as city/venue pages did.

### 2. Sitemap expansion

- `functions/sitemap.xml.js` and `functions/llms.txt.js` currently emit artist,
  city, venue, and guide routes. Add any new artist-city routes behind the same
  indexability gate, with data-derived `lastmod`.
- Extend the sitemap smoke coverage in `scripts/smoke-prelaunch.mjs`
  (`sitemapLocs`) to assert the new routes appear only when indexable and are
  excluded when thin/`noindex` (there are existing patterns for this).

### 3. Additional structured data

Phase 1 deliberately did not add new schema types (to keep the change small and
avoid the `validate-route-schema.mjs` default-env `Offer`/price bans). Phase 2
candidates, each gated by `scripts/validate-route-schema.mjs`:

- **`ItemList` of upcoming shows** on the artist page (mirroring the visible
  show board), keyed to the same publishable gate already used for `MusicEvent`.
- **`BreadcrumbList`** already exists; extend to any new route types.
- Consider **`MusicGroup`/`Person` `subjectOf`** or `event` back-references if a
  reviewer confirms value — but keep the never-emit-price/availability invariant
  and run `npm run schema:validate`.
- Any tour-level schema must come from verified `tour_name` data only; do not
  synthesise `MusicTour`/dates that are not in the event records.

### 4. Content seeding

- **`tour_name` coverage:** tour summaries only appear where events carry a
  non-blank, human-verified `tour_name`. Several artists have blank labels
  pending human review (jay-z partial, post-malone, zach-bryan, jelly-roll,
  tame-impala — see `PROJECT_STATUS.md`). Seeding verified tour names (through
  the existing gated data pipeline, never inferred from URL slugs) directly
  enriches the Phase 1 tour-summary section.
- **Per-artist `faq` / `why_demand_is_high` / `ticket_buying_notes`:** these are
  optional fields in `catalog.json`; artists without them fall back to generic
  copy. Seeding verified, distinctive per-artist copy improves uniqueness.
- **Artists with zero events** (beyonce, raye, tate-mcrae) render artist-level
  CTAs only and get no tour/city sections — revisit once event data lands.

### 5. Unresolved issues / watch-outs carried into Phase 2

- **No TypeScript / no `tsc` in this repo.** "Typed" is JSDoc `@typedef` +
  `node --check`; there is no compile-time type gate. If Phase 2 wants real type
  checking, adding a `checkJs` `tsconfig.json` is a separate, scoped decision.
- **`public/app.js` cannot import modules** (classic script, CSP-hashed inline
  gtag). Keep using the container-transplant seam for any new server-rendered
  SEO content, or accept the duplicate-with-sync-comment pattern.
- **Smoke parity is load-bearing.** The new assertions pin: the shared intro
  phrase in both `functions/_artist-content.js` and `public/app.js`, the
  `[data-artist-extra-content]` transplant, and the presence of the tour/guide/
  pricing sections on `/artists/morgan-wallen`. If wording changes, update
  `SHARED_ARTIST_INTRO_PHRASE` and the section-marker assertions together.
- **Protected files.** `functions/api/out.js`, `_middleware.js`,
  `_route-metadata.js`, and affiliate logic remain protected — Phase 2 routing
  work touches `[[path]].js` (already in scope for artist pages) but should not
  need to alter `/api/out` or provider allowlists.

---

## Validation to run in Phase 2 (same as Phase 1)

```bash
npm run test:mvp                 # includes test:artist-content + smoke + status
npm run schema:validate          # if structured data changes
node scripts/validate-guide-routes.mjs
node --check public/app.js 'functions/[[path]].js' functions/_artist-content.js functions/api/out.js
git diff --check
```

Report results honestly and refresh `PROJECT_STATUS.md` from source data if any
counts, routes, or indexability gates change.
