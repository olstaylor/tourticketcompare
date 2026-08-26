---
name: artist-onboarding
description: Use when adding a new artist to TourTicketCompare, promoting an existing artist shell to indexable/CTA status, or adding events for an already-promoted artist. Covers the gated Shell → Promote → Events workflow, required evidence, field-level templates, prohibited fields, CTA/no-price rules, and the validation commands each phase must pass.
---

# Artist Onboarding

**Scope:** Adding one new artist to TourTicketCompare without compromising data integrity, CTA accuracy, or SEO safety.

New-artist onboarding is supported only through this gated process. Every phase, human browser verification, and validator still applies. Keep onboarding as its own scoped task; do not fold an artist addition into an unrelated change. This is a **protected process** — do not skip evidence requirements or add placeholder data.

For multiple artists, prefer the API-captured batch workflow: `npm run artists:onboard:propose` → `npm run artists:promote:batch`. Do not hand-copy identity URLs. This document also covers the single-artist fallback.

---

## Quick reference

| # | Question | Answer |
|---|----------|--------|
| 1 | Minimum evidence for a shell (no events, no CTAs)? | Confirmed name + slug, confirmed touring from an accepted source, brief factual summary from confirmed public record |
| 2 | Minimum evidence for event cards? | Verified `ticketmaster_event_id` from TM Discovery API or official TM event page — not inferred from URL slug |
| 3 | Minimum evidence for CTAs? | Every destination used by the chosen path is API-captured, opened in a browser, and backed by the matching `VERIFIED_TICKET_LINKS` and provider-identity entries; the preferred batch path verifies SeatGeek plus Ticketmaster when available |
| 4 | First `indexing_status`? | Always `review_required`. Promote to `indexable_with_substantial_content` only when `out.js` entry is confirmed — both must land in the same PR |
| 5 | Files that change per phase? | See "Phase-by-phase workflow" |
| 6 | Validation commands in order? | See "Validation commands" |
| 7 | What must remain human-reviewed? | First browser URL confirmation of each provider destination (never skippable; the repeat check before Promote holds for 14 days while automated liveness is clean); tour name from event page; rights and commercial/link model |
| 8 | Safest first batch size? | Shell phase: up to 20 shells per automated PR (no CTAs, noindex; `TM_SHELL_MAX_PER_RUN`). Promote: up to 20 artists per PR via `npm run artists:promote:batch` — every artist gets a browser spot-check tick row in the PR-body checklist, and merge is blocked until all rows are ticked (single-artist `npm run artist:promote` still works) |
| 9 | Exact Claude prompt to propose (not implement) the next artist? | See "AI proposal prompt" |

---

## 1. Required evidence before adding an artist

Before writing any code or data, you must have **all** of the following in hand:

| Evidence | Requirement |
|----------|-------------|
| Artist identity | Confirmed legal/stage name and a stable, unambiguous slug |
| Active or recent touring | Confirmed by an official announcement or primary-source event listing |
| Verified ticket link | A real, live destination URL at an allowlisted provider hostname |
| Commercial/link model | Confirmed rights and link model for each destination provider; Ticketmaster is a plain, unmonetized link lane and SeatGeek artist links use the approved affiliate path |
| Factual summary | A brief, accurate summary sourced from confirmed public information — no invented biographical claims |
| `last_checked_at` date | The date you personally verified the destination URL was live and resolving correctly |

If any item is missing, **stop**. Do not add a partial artist record.

### Accepted verification sources

Use only these sources. Do not invent, infer, or copy from competitor sites.

**For tour/event existence:**
- Official artist website or press release
- Official artist social media account (Instagram, X/Twitter, Facebook — verified accounts only)
- Ticketmaster artist page (confirmed live, with active event listings)
- Billboard, Pollstar, or Variety news articles (named/bylined, dated)

**For ticket link destinations:**
- Ticketmaster.com artist page URL — only if the page resolves and shows active or upcoming events
- SeatGeek artist page — only when the URL is captured from the registry-verified SeatGeek performer ID and the provider is enabled; Vivid Seats is currently event-level only and must not be added as an artist-level provider

**Not accepted:** aggregator scrapers or third-party fan sites; Wikipedia or IMDb as a sole source for touring claims; competitor ticket comparison sites; AI-generated tour information.

---

## 2. Phase-by-phase workflow

```
[ SHELL ]  →  gate 1  →  [ PROMOTE ]  →  gate 2  →  [ EVENTS ]
```

Each gate is a human checkpoint. No phase may begin until the preceding gate is fully cleared.

### Phase 1 — Shell (evidence, then an artist page with no CTAs)

**Who:** Human (or human-reviewed AI output using the prompt below).

**`indexing_status: "review_required"` throughout this phase.** A shell is noindex and carries no CTAs, so nothing written here is publicly consequential — gate 1 below stands between a shell and anything a visitor can see or click. Evidence gathering and the shell record are one phase for that reason; the evidence requirements themselves are unchanged and every item below must still hold before the record is written.

#### Step 1 — gather evidence before touching any file

**Deliverables:**
- Completed proposal template (below) with all fields filled
- Accepted verification source URL for touring activity noted and dated
- API-captured provider identity URLs identified (SeatGeek performer page for the preferred batch path, plus Ticketmaster artist page when available); none are added to production files yet

**All of the following must hold before writing the shell record:**

- [ ] Artist name and slug are unambiguous, URL-safe, unique among existing slugs in `artists.json`
- [ ] Touring activity confirmed from an accepted verification source (URL and date recorded)
- [ ] Every proposed provider identity is API-captured and unambiguous (SeatGeek performer ID and, when present, Ticketmaster attraction ID)
- [ ] Each destination hostname is in the corresponding provider allowlist in `functions/api/out.js`
- [ ] Ticketmaster URL, when present, is opened in a browser as a plain, unmonetized destination
- [ ] SeatGeek performer page, when present, is opened in a browser and its approved affiliate configuration is confirmed
- [ ] Factual summary drafted from confirmed public sources — no invented biographical claims
- [ ] `BACKLOG.md` does not park this specific artist
- [ ] No other artist-addition PR is open or in progress

#### Step 2 — write the shell

| File | What changes |
|------|-------------|
| `public/data/artists.json` | Add record: `review_required`, `verified_provider_count: 0`, `verified_providers: []`, `last_verified_at: null` |
| `public/data/catalog.json` | Add `artists[]` entry (full content fields) + `ticket_links[]` entry with `verified: false`, `public_enabled: false` |
| `public/index.html` | Regenerated by `npm run events:sync` — required because `artists.json` changed; `stale-sync-guard` CI will fail the PR if omitted |

- **`functions/api/signup.js` is NOT touched.** The signup allowlist is derived from `artists.json` at runtime — adding the artist record is sufficient for watchlist signups (CTAs gated separately via `indexing_status`).
- **`functions/api/out.js` is NOT touched in this phase.** No `VERIFIED_TICKET_LINKS` entry. No `public_enabled: true` in `catalog.json`.
- **`functions/api/shows.js` is never touched per-artist.** `ARTIST_LINKS_BY_PROVIDER` is derived at runtime from `VERIFIED_TICKET_LINKS` in `out.js`; the artist appears in it automatically once promoted.
- **`functions/_route-metadata.js` is not required.** Artist routes derive title, description, H1, canonical, and breadcrumbs dynamically from `catalog.json` via `[[path]].js`.

**Gate 1 checklist — human must confirm all before Phase 2 (Promote):**

- [ ] Shell PR merged and deployed
- [ ] `https://tourticketcompare.com/artists/<slug>` renders a watchlist empty state — no broken CTAs, no placeholder copy
- [ ] `npm run artist:check -- <slug>` exits 0 (WARN expected for `review_required` with no verified providers)
- [ ] No other page broken — spot-check homepage, `/artists` index, one existing artist page
- [ ] Every provider destination used by the planned promotion was confirmed live in a browser **within the last 14 days**, and its automated liveness check is currently clean (no TM-skip/failure and no WAF block holding the artist's `last_verified_at` bump). Re-open it in a browser if either condition fails, or if anything about the destination changed since it was checked.
- [ ] Exact provider URLs and identity IDs for every planned `VERIFIED_TICKET_LINKS` entry are recorded

> The first browser confirmation of a destination is never skippable — it is what proves the URL is a real, correct, live page for this artist. The 14-day window replaces only the *repeat* check on a destination already confirmed, and only while automated liveness is clean; a blocked or failing check means liveness is unproven, so the browser check comes back.

### Phase 2 — Promote (adds CTA, promotes indexing status)

**`indexing_status` moves to `"indexable_with_substantial_content"` in this phase.**

**Pre-condition:** Human opens the exact Ticketmaster URL in a browser and confirms:
1. The page resolves — no 404, no redirect to an unrelated artist
2. The displayed artist name matches
3. The URL does not contain `localhost`, `example.com`, `placeholder`, `replace-me`, or any development string
4. The hostname is in `PROVIDERS.ticketmaster.allowedDestinationHosts`

| File | What changes |
|------|-------------|
| `public/data/artists.json` | Update to `indexable_with_substantial_content`; preferred batch promotion records every verified artist-level provider (normally `ticketmaster` + `seatgeek`), while the single-artist fallback records only the provider it actually verified |
| `public/data/catalog.json` | Mark each promoted provider `ticket_links[]` row `verified: true`, `public_enabled: true`, and `last_checked_at: <today>`; use the existing schema's `affiliate_enabled` flag consistently with that provider's link model |
| `functions/api/out.js` | **PROTECTED** — add one `VERIFIED_TICKET_LINKS` entry per promoted provider only after browser confirmation. Ticketmaster remains a plain stored URL; SeatGeek uses the approved runtime tracking path |
| `data/provider-identities.json` | Add a `review_status: "verified"` entry for the slug with the API-captured provider IDs/URLs used by the chosen path and `sync_enabled: true`. **Required** — the `validate:cta-provider-state` guard (run by `test:mvp`) fails any artist CTA not backed by a verified registry identity. The single-artist scaffold does not generate this; the batch writer does. |
| `public/index.html` | Regenerated by `npm run events:sync` |

`functions/api/shows.js` needs no edit — its artist link map is derived from the new `out.js` entries automatically.

**Tooling paths:** The preferred path is `npm run artists:onboard:propose` followed by `npm run artists:promote:batch` (dry-run by default; `--write` to apply). It consumes API-captured SeatGeek/Ticketmaster identity data, writes the provider registry and artist-level links together, and emits a per-artist browser spot-check checklist. The single-artist `npm run artist:promote -- --slug <slug>` scaffold remains a limited Ticketmaster-only fallback: it generates only the plain Ticketmaster artist link and does **not** update `data/provider-identities.json`, so the registry entry must be added and validated separately before publishing. Never construct a provider URL from an artist name; the scripts use API-captured URLs, and a browser check is still mandatory before `--write`.

The `indexing_status` promotion and the `out.js` entry must land in the **same PR**. Never set `indexable_with_substantial_content` without a corresponding `VERIFIED_TICKET_LINKS` entry.

**Gate 2 checklist — human must confirm all before Phase 3 (Events):**

- [ ] Promote PR merged and deployed
- [ ] `curl -sI "/api/out?artistSlug=<slug>&provider=ticketmaster"` returns 302 to the correct TM destination
- [ ] CTA button appears on the artist page; inspect in browser dev tools — href is `/api/out?...`, not a raw affiliate URL
- [ ] `npm run artist:check -- <slug>` exits 0 (PASS — no FAIL). For a Promote with **0 events** (artist-level CTA only), the single "indexed artist has 0 events" warning is expected; the provider-wiring lines must all pass.
- [ ] `npm run providers:identities:validate` passes (the new registry entry is valid and `sync_enabled` gating is satisfied)
- [ ] `npm run test:mvp` passes (includes the `validate:cta-provider-state` guard — will FAIL without the `provider-identities.json` entry)

### Phase 3 — Events (optional)

**Prerequisite:** the gate 2 checklist is cleared for the artist.

Events may ship in their own PR or in the same PR as that artist's Promote — the per-destination evidence below is required either way, and bundling never lets an event record skip it. Keep a bundled PR to the one artist: do not fold several artists' events together, and do not fold an unrelated change in. When Promote and Events are bundled, every gate 2 item must be satisfied within that PR before it merges.

**Evidence required before adding any event:**
- `ticketmaster_event_id` obtained from the TM Discovery API response or the official TM event page URL — **not inferred from URL slug patterns**
- Date, venue, and city confirmed from the same source
- `tour_name` confirmed from the event page itself — not from the URL slug (URL slugs are evidence, not proof)
- `ticketmaster_url` opened in a browser and confirmed live before setting `provider_links.ticketmaster.verified: true`

| File | What changes |
|------|-------------|
| `public/data/events.json` | Add verified event records |
| `public/data/events/<slug>.json` | Partition file generated by `npm run events:partition` |
| `public/index.html` | Regenerated by `npm run events:sync` |

`out.js`, `artists.json`, and `catalog.json` are not touched unless a specific event-level URL requires a new `VERIFIED_TICKET_LINKS` entry — which itself requires a separate browser confirmation. (`shows.js` and `signup.js` are derived at runtime and never edited per-artist.)

Manual event batches for an already-promoted artist use `npm run artists:apply-preview`. New events for existing artists otherwise arrive via the scheduled discovery PR (`tm-new-shows-pr.yml`, see `docs/PROVIDER_SYNC.md`); SeatGeek event-URL enrichment via `docs/SEATGEEK_DISCOVERY.md`.

---

## 3. Required fields

Every new artist record requires **all** of the following fields. Do not omit any.

### `public/data/artists.json` entry

```json
{
  "slug": "<url-safe lowercase with hyphens>",
  "name": "<display name, capitalised correctly>",
  "indexing_status": "indexable_with_substantial_content",
  "verified_provider_count": <integer: number of providers with a live verified link>,
  "verified_providers": ["<provider slug>"],
  "last_verified_at": "<YYYY-MM-DD or null: most recent artist-level verification date>"
}
```

### `public/data/catalog.json` — `ticket_links` array entry

```json
{
  "link_id": "<provider>-artist-<slug>",
  "artist_slug": "<slug>",
  "tour_slug": null,
  "provider": "<provider slug>",
  "destination_type": "artist_page",
  "affiliate_enabled": true,
  "verified": true,
  "public_enabled": true,
  "market": "<global | us | uk | ...>",
  "last_checked_at": "<YYYY-MM-DD>",
  "disclosure_required": true
}
```

### `functions/api/out.js` — `VERIFIED_TICKET_LINKS` entry

A new key must be added to the `VERIFIED_TICKET_LINKS` constant using the exact format already present in that file. **Do not modify any other logic in `out.js`.**

**Confirm before touching `out.js`:**
- The destination URL resolves in a browser right now
- The destination hostname is in the provider's `allowed_destination_hosts` list in `catalog.json`
- The URL does not contain `localhost`, `127.0.0.1`, `placeholder`, `example.com`, `replace-me`, or any development string

### Derived files — no manual edit

- `functions/api/shows.js`: `ARTIST_LINKS_BY_PROVIDER` (keyed provider → { slug → url }) is derived at module load from `VERIFIED_TICKET_LINKS` in `functions/api/out.js`. Adding the `out.js` entries at the Promote phase is sufficient — never hand-edit this map.
- `functions/api/signup.js`: the signup allowlist is loaded from `public/data/artists.json` at runtime. Every artist record — including `review_required` ones — accepts watchlist signups as soon as the `artists.json` entry exists (Shell phase). If the allowlist cannot be loaded, `/api/signup` fails closed with `artist_validation_unavailable` (503) for artist-tagged signups.

### Prohibited fields unless verified

Do not add these fields unless you have an explicit, confirmed source for each value:

| Field | Prohibited unless... |
|-------|----------------------|
| `tour_slug` | A named tour with confirmed dates exists and a tour record is added to `catalog.json` |
| `event_ids` or show cards | Verified event records exist in `events.json` with confirmed dates, venues, and `ticketmaster_event_id` |
| Ticket price (face value, range, "from $X") | An approved provider feed explicitly supplies displayable pricing for this artist |
| "On sale" / "Available" status | A provider API or confirmed announcement supplies current on-sale status |
| Venue or city claims | Verified event records with confirmed venue data exist |
| Biographical claims beyond confirmed public record | Not acceptable — keep factual summaries brief and sourced |

---

## 4. CTA and no-price rules

A ticket CTA button may only appear on the page if **all three** are true:

1. The artist slug is present in `catalog.json` with `public_enabled: true`
2. A verified `redirectUrl` exists for this artist in `VERIFIED_TICKET_LINKS` in `functions/api/out.js`
3. The destination URL passes `/api/out` validation: non-placeholder, non-localhost, destination host in the provider allowlist

**If any condition is not met:** the page must render a polished "watchlist" empty state with no CTA. Do not render a broken or placeholder button. **All CTAs must route through `/api/out`.** Do not write raw affiliate URLs as `<a href>` in any template or data file visible in page source.

**No-price rules:**
- Do not display any ticket price, price range, or "from $X" copy for the new artist
- Do not display "cheapest", "lowest price", "best deal", or savings language
- Do not display "sold out", "limited availability", or inventory claims
- Do not display "price comparison" for the new artist unless an approved multi-provider feed is active and supplies that data
- These rules apply even if price data is available in a provider API — approval to display is a separate step

---

## 5. Verification timestamp rules

- `artist.last_verified_at` = artist-level freshness marker for the artist page itself. Optional; use `null` when no artist-level verification has been performed yet.
- `event.last_verified_at` = event-level freshness marker for that specific event row. Optional.
- `provider_links.<provider>.last_verified_at` = provider-link freshness marker for that provider URL on that specific event. Optional.
- Date format for all of the above is strictly `YYYY-MM-DD` (ISO calendar date, no time component).
- Provider-level timestamp may be present only when the same provider entry is both `verified: true` and has a non-empty `url`.
- For artist summaries, `verified_provider_count` must equal `verified_providers.length`.

Display precedence for freshness copy: provider-level timestamp (specific provider link on an event) → event-level timestamp (event-level verification copy) → artist-level timestamp (artist-wide verification copy) → if none exists, a neutral "verification date unavailable" message (no invented date).

For new records, add verification dates only when you personally completed that exact verification step: set to the date you personally opened the destination URL in a browser and confirmed it resolved; never copy a date from another record; never use a future or placeholder date; update the date whenever you re-verify an existing link.

Stale records elsewhere are no longer a precondition for adding an artist: the daily audit re-checks liveness and bumps `last_verified_at` on artists that come back clean, and holds the bump when a check is skipped, fails, or is WAF-blocked. Fix a genuinely stale record when the audit flags it, not as a toll on unrelated onboarding work.

---

## 6. New artist proposal template

Fill every field before writing any file. If a field cannot be filled, the evidence is incomplete — do not write the shell record.

```
## Artist Proposal — <Artist Name>

Date proposed:  YYYY-MM-DD
Proposed by:    <name>

### Identity
- Legal / stage name:
- Proposed slug (URL-safe, lowercase, hyphens only):
- Confirmed unique (not in artists.json or catalog.json):

### Touring activity
- Source type (official website / official social / Ticketmaster artist page / Billboard/Pollstar/Variety):
- Source URL:
- Source date (date you confirmed this):
- One-sentence summary of what is confirmed:

### Ticket link
- Ticketmaster artist page URL (opened in browser on <date>):
- Destination hostname (must be in PROVIDERS.ticketmaster.allowedDestinationHosts):
- Affiliate programme confirmed (Impact / direct):

### Factual summary (two to four sentences — for catalog.json)
(Sourced from confirmed public record. No invented biographical claims.)

### Known constraints
- Any international events on a TM regional domain not in the allowlist (e.g. ticketmaster.com.mx)?
- Any name ambiguity between this artist and another on Ticketmaster?
- Any open BACKLOG.md parking note that covers this artist?

### Decision
- [ ] Evidence sufficient — proceed to Shell PR
- [ ] Evidence incomplete — blocked on: <reason>
```

### AI proposal prompt (propose only — no implementation)

Use this exact prompt with Claude or another model when you want a structured proposal without any file changes:

> "I am considering adding a new artist to TourTicketCompare. The artist is [name]. Using only publicly confirmed, verifiable information — no invented dates, venues, prices, or availability — produce a completed New Artist Proposal using the template in this skill's proposal section. Do not write any code. Do not suggest file changes. Do not invent a Ticketmaster URL. Do not infer tour names from URL slugs. Flag every field you cannot fill from confirmed public information and explain why. The output must be a filled proposal template only — nothing else."

---

## 7. Implementation PR template

```markdown
## Artist addition: <slug> — Phase <N> (<Shell|Promote|Events>)

### What this PR does
- <One sentence, e.g. "Adds artist shell for nova-skye with review_required status and no CTAs">

### Evidence recorded
- Touring activity source: <URL> (verified <date>)
- Ticketmaster URL confirmed live: <URL> (opened in browser <date>)
- Factual summary source: <source>

### Files changed
- <list each file from the phase's file-change table above and what changed>

### What was NOT touched
- (List protected files intentionally left unchanged)

### Validation passed
- [ ] <tick each command from "Validation commands" below that applies to this phase>

### Human verification completed
- [ ] Artist page renders correctly in browser
- [ ] CTA routes through /api/out and returns 302 (Promote phase only)
- [ ] No other page broken

### Related
- Phase N of N for <slug> artist addition
- Preceding PR: #<number> (if applicable)
```

---

## 8. Validation commands

Run these in this exact order before committing any phase. All must pass. Do not use `--no-verify` to bypass hooks.

```bash
# Step 1 — Syntax (fast; run first)
node --check public/app.js
node --check 'functions/[[path]].js'
node --check functions/api/out.js
node --check functions/api/shows.js
node --check functions/api/signup.js

# Step 2 — Per-artist cross-file readiness
npm run artist:check -- <slug>
# Shell phase: WARN is expected (review_required, no verified providers).
# Promote phase and beyond: provider-wiring lines must all be PASS. A single
# benign WARN is expected for a 0-event artist-level-CTA-only promote
# ("indexed artist has 0 events") — that is not a failure.

# Step 3 — Artist/provider drift guard
node scripts/validate-artist-provider-claims.mjs

# Step 3b — Provider identity registry (required in Promote: the verified
# data/provider-identities.json entry backs the CTA; test:mvp's
# validate:cta-provider-state guard FAILs without it)
npm run providers:identities:validate

# Step 4 — Event data (only if events.json was touched)
python3 scripts/validate-events.py --for-production
node scripts/validate-partitions.mjs

# Step 5 — Smoke suite
node scripts/smoke-prelaunch.mjs

# Step 6 — Inline fallback sync (required whenever any public/data/*.json changes)
npm run events:sync
# Confirm public/index.html is included in the commit.
# The stale-sync-guard CI job will fail the PR if this is skipped.

# Step 7 — Full MVP suite
npm run test:mvp

# Step 8 — Whitespace and conflict markers
git diff --check
```

Steps 3b and 4 are conditional (Promote-only, and events-only respectively); every other step applies at every phase.

`npm run artist:check -- <slug>` prints a PASS / WARN / FAIL report for one artist slug (accepts multiple slugs), checking `artists.json`, `catalog.json`, `events.json` and the per-artist partition file, `VERIFIED_TICKET_LINKS` in `functions/api/out.js`, and the affiliate map in `functions/api/shows.js` (derived from `out.js` at runtime). A WARN result (exit 0) means the artist is intentionally gated or has known open issues. A FAIL result (exit 1) means the data is internally inconsistent and must be fixed before publishing.

If any command fails, fix the issue before committing.

---

## 9. Critical guardrails

1. **`out.js` is protected.** A `VERIFIED_TICKET_LINKS` entry may only be added after a human opens the destination URL in a browser on the day of the PR. Automation cannot substitute for this step.
2. **`review_required` is the safe default.** Every new artist starts here. Promotion to `indexable_with_substantial_content` happens in a separate PR — or in the same PR as the `out.js` entry, but never before it.
3. **`indexable_with_substantial_content` only when the URL is live.** The indexing status promotion and the `out.js` entry must land in the same PR. Never set one without the other.
4. **No event cards without verified event IDs.** `ticketmaster_event_id` must come from the TM Discovery API or an official TM event page. URL slug patterns are not sufficient.
5. **`tour_name` confirmed from the event page, not the URL.** URL slugs like `artist-the-tour-name-city-venue` are evidence, not proof. Open the event page and read the displayed tour name.
6. **Batch size: 1 artist per Promote or Events PR** on the single-artist path. Never promote two artists concurrently, and never add events for artist B in the same PR as work for artist A. The batch onboarding path (`npm run artists:onboard:propose` → shells → `npm run artists:promote:batch`) is preferred for roster growth: it captures SeatGeek performer IDs/URLs and Ticketmaster attraction IDs/URLs from the APIs, requires human browser spot-checks for every destination, and may carry up to 20 artists per PR because it enforces a per-artist checklist in the PR body.
7. **`shows.js` and `signup.js` are derived — never hand-edit per artist.** `ARTIST_LINKS_BY_PROVIDER` in `functions/api/shows.js` is built at module load from `VERIFIED_TICKET_LINKS` in `out.js`; the signup allowlist in `functions/api/signup.js` is loaded from `artists.json` at runtime. `npm run artist:check` verifies the derived shows.js map per artist-level provider for promoted artists.

---

## 10. Example placeholder format (fictional artist only)

The artist **Nova Skye** is entirely fictional and used here only to illustrate the correct format. Do not add this artist. Its `artists.json` and `catalog.json` entries follow the templates in "Required fields" above verbatim, with `slug: "nova-skye"`, `name: "Nova Skye"`, `link_id: "tm-artist-nova-skye"`, and `market: "global"`.

### `VERIFIED_TICKET_LINKS` entry in `functions/api/out.js`

Generated by the single-artist promote command for the plain Ticketmaster lane (dry-run by default; `--write` applies). The preferred roster-growth path is the SeatGeek/Ticketmaster identity manifest plus `npm run artists:promote:batch`; the shape below is illustrative:

```js
// Fictional example — replace with a real, verified Ticketmaster artist URL
"nova-skye:ticketmaster": {
  artistSlug: "nova-skye",
  provider: "ticketmaster",
  linkId: "tm-artist-nova-skye",
  redirectUrl: "https://www.ticketmaster.com/nova-skye-tickets/artist/XXXXXXX",
  verified: true
}
```

`functions/api/shows.js` and `functions/api/signup.js` need no per-artist snippets — both are derived at runtime. A current promoted artist should also have a verified SeatGeek performer identity when the batch onboarding path is used; Vivid Seats remains event-level only.

`_route-metadata.js` needs no entry for a standard artist route (see Phase 1 — Shell); only add one, keyed `"/artists/<slug>"` with `title`/`description`/`h1`/`canonical`/`breadcrumb`, if the dynamic defaults must be overridden.

**Replace `YYYY-MM-DD` with today's date. Replace `XXXXXXX` with the real Ticketmaster artist ID. Do not publish this example verbatim.**

---

## Related documents

- `docs/CONTENT_RULES.md` — full content and data rules
- `docs/PROVIDER_DATA_POLICY.md` — provider link, provenance, affiliate, and price-source rules
- `docs/ARCHITECTURE.md` — routing model and data bindings
- `CLAUDE.md` § "Protected Areas" — files that must not be modified without explicit scope
- `BACKLOG.md` — active priorities and explicit parking notes; check before starting any artist addition
