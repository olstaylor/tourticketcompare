# Provider Sync — Foundation and Future Workflow

_Status: **Provider-sync sequence complete** (steps 1–5; see the table below). Recognition, write-to-PR, SeatGeek performer-id enrichment, and the CTA ↔ provider-state guard are all in place — every write path is PR-based and the runtime CTA gates are unchanged. Since 2026-07-07 (owner-approved) the scheduled new-show PR **auto-merges after its in-run validation suite passes**; everything else (new artists, withheld rows, `tour_name`, SeatGeek enrichment) stays human-gated. Since 2026-07-09 (owner-approved) `scripts/sync-vividseats-events.mjs` + `.github/workflows/vividseats-cta-sync.yml` add the Vivid Seats twin of the SeatGeek CTA sync loop — code is merged with the nightly cron commented out pending a supervised first apply run (see "Vivid Seats event-link sync" below).

Earlier milestone — **Ticketmaster write-to-PR mode + SeatGeek performer-id dry-run live** (sequence steps 3–4). `scripts/sync-ticketmaster-events.py` performs a real TM Discovery lookup by verified attraction ID for sync-enabled artists and prints a dry-run report (it remains dry-run only and refuses to run without `--dry-run`). On top of it, `scripts/sync-tm-events-write-pr.mjs` turns the recogniser's PROPOSED rows into a candidate batch, drives the canonical events writer (`scripts/apply-artists.mjs`), and opens a branch + PR — it **never commits to `main` directly**, defaults to a no-write preview, and (at this milestone) never auto-merged; withheld rows are surfaced for review and never published. `scripts/propose-seatgeek-urls.mjs` now consumes the registry's `seatgeek_performer_id` to scope and confirm event-level SeatGeek URL proposals — still proposal-only/dry-run, event-level only, no prices._

This document defines how TourTicketCompare will move from manually curated event
data to provider-based event recognition and CTA automation — without weakening
any existing publishing gate. Read alongside `docs/SAFE_NEXT_ARTIST_WORKFLOW.md`,
`docs/PROVIDER_DATA_POLICY.md`, `docs/CONTENT_RULES.md`, and
`SAFE_PUBLISHING_RULES.md`. Where this document and those rules appear to
conflict, the stricter rule wins.

---

## Model

1. **A human verifies an artist's identity and provider IDs once.** After that
   one-time verification, approved artists can be checked repeatedly by sync
   scripts without re-verifying identity each run.
2. **Ticketmaster is the primary canonical event verification source.** The
   Ticketmaster attraction ID is the anchor for official event recognition
   (via the TM Discovery API — the same source the existing nightly automation
   already uses per event ID).
3. **SeatGeek is a secondary marketplace/provider enrichment source.** The
   SeatGeek performer ID exists only for later event-level enrichment of
   events that were first recognised via Ticketmaster. SeatGeek never
   originates an event record.
4. **Events and CTAs are eventually generated from verified provider data**,
   never manually invented — and never published without passing the existing
   validators and a human-reviewed PR.
5. **Risky rows are withheld for human review.** No unknown artist and no
   unknown event is ever auto-published.

---

## The provider identity registry

`data/provider-identities.json` (repo root `data/`, **not** `public/data/` —
it is not served and is never read at runtime). One entry per artist in
`public/data/artists.json`:

| Field | Type | Meaning |
|---|---|---|
| `slug` | string | Must match an existing record in `public/data/artists.json`. |
| `ticketmaster_attraction_id` | string \| null | TM Discovery API attraction ID. Human-verified once; never inferred from search results without a human confirming the match. |
| `ticketmaster_artist_url` | string \| null | The TM artist page URL opened in a browser during verification. Hostname must be in `PROVIDERS.ticketmaster.allowedDestinationHosts` in `functions/api/out.js`. |
| `seatgeek_performer_id` | number \| null | Verified SeatGeek performer ID. **Consumed only when the entry's `review_status` is `"verified"`** (an id on an `unverified`/`withheld` entry is an unapproved identity and is ignored). When consumed, `scripts/propose-seatgeek-urls.mjs` scopes its event-level URL discovery query by `performers.id` and treats a candidate whose performer id matches as an identity confirmation (clearing the performer-similarity gate without relaxing the date/city/URL gates). `null` ids and non-verified entries are searched by name as before. No SeatGeek URLs are stored here — ever. |
| `sync_enabled` | boolean | Whether provider sync scripts may process this artist. May only be `true` for an `indexable_with_substantial_content` artist with verified Ticketmaster, a populated `ticketmaster_attraction_id`, and `review_status: "verified"`. |
| `last_synced_at` | string \| null | `YYYY-MM-DD` of the last provider sync run that processed this artist. |
| `review_status` | string | `"unverified"` (default), `"verified"` (human confirmed the provider match), or `"withheld"` (match is ambiguous — see `notes`). |
| `notes` | string \| null | Free text. Required when `review_status` is `"withheld"` — record why the provider match is ambiguous (e.g. name collision on TM). |

**Populating the registry is a human task.** Verifying an artist means:

1. Open the TM artist page in a browser; confirm the displayed artist matches.
2. Confirm the attraction ID from the TM Discovery API response or the official
   page — not from URL slug patterns.
3. Confirm the URL hostname is in the existing `out.js` allowlist.
4. Set `review_status: "verified"` and record the values in a reviewed PR.

If the match is ambiguous (multiple TM attractions with the same name, regional
splits, tribute acts), set `review_status: "withheld"` with a `notes`
explanation and leave the IDs null.

Validator: `npm run providers:identities:validate`
(`scripts/validate-provider-identities.mjs`). Run it whenever this file changes.

---

## Rules for all current and future sync scripts

These are hard constraints, not preferences:

- **No scraping.** Provider data comes only from official APIs already approved
  in `docs/PROVIDER_DATA_POLICY.md` (TM Discovery API, SeatGeek API with
  credentials). Never fetch or parse provider HTML pages.
- **No prices for now.** Sync scripts must not surface, store, or publish
  price or availability claims.
- **No CTA without a verified provider URL.** CTA eligibility is derived from
  verified provider state (registry + `VERIFIED_TICKET_LINKS` + verified
  event-level URLs), never invented or inferred.
- **No provider URL unless it passes existing outbound safety rules** — the
  host allowlists and validation in `functions/api/out.js` and
  `scripts/validate-events.py`. The allowlists themselves are protected and
  are not expanded by sync work.
- **Dry-run first, always.** Every sync script must support (and default to)
  a dry-run mode that reads data and reports findings without writing anything.
- **Write mode is explicitly gated and PR-based.** A future write mode must
  require an explicit flag, must never commit to `main` directly, and must
  produce a branch/PR for human review — mirroring how
  `scripts/bump-verified-dates.mjs` opens PRs and how the nightly sync gates
  its narrow lossless auto-applies on `events:validate:prod`.
- **Withhold risky rows.** Any candidate event row with a missing venue or
  date, a non-allowlisted host, a duplicate of an existing event, a travel /
  hotel / VIP-package listing, or a weak artist match must be withheld for
  human review, never written.
- **Only approved artists.** Scripts process only registry entries with
  `sync_enabled: true` — which the validator restricts to promoted, indexable,
  Ticketmaster-verified, human-reviewed artists.

---

## Event link publishability (`verification_status`)

Every event row carries an explicit, top-level `verification_status` that
drives whether event-level CTAs render and whether `/api/out` resolves the
event redirect. Presence of a top-level `ticketmaster_url` is **not**
sufficient on its own.

| Value | CTA / redirect | Meaning |
|---|---|---|
| `human_verified` | allowed | A human opened the storefront URL in a browser and confirmed it. Equivalent to the legacy `provider_links.ticketmaster.verified: true` flag. |
| `machine_high_confidence` | allowed | API-sourced link that passed every machine gate: Discovery artist-match confidence exactly 1.0, `https`, allowlisted Ticketmaster host (the `functions/api/out.js` list), canonical storefront path with a slug segment before `/event/<id>` (short-form `/event/<id>` URLs never qualify — they have 404'd in browsers while still resolving via the Discovery API), storefront event id present in the URL, full datetime, venue and city present. Assigned by `scripts/apply-artists.mjs` at apply time; never assigned by hand without re-checking the criteria. |
| `needs_recheck` | suppressed | Anything else: weak/sub-1.0 matches, short-form URLs, non-allowlisted hosts, date-only datetimes, or links a human flagged. The candidate URL is preserved in `provider_links.ticketmaster.url` (and may remain in `ticketmaster_url`) but nothing renders until a human review changes the status. |

Rows without an explicit `verification_status` fall back to
`provider_links.ticketmaster.verified === true`. The runtime gate is
`eventLinkPublishable`, kept in sync across `functions/[[path]].js`,
`public/app.js`, and `functions/api/out.js`; allowed values are enforced by
`scripts/validate-events.py`. Machine approval never sets the human-verified
provider flag — `human_verified` is only ever assigned by a human.

---

## Commands

Available now:

```bash
# Live Ticketmaster dry-run recognition for one verified, sync-enabled artist
python3 scripts/sync-ticketmaster-events.py --artist raye --dry-run

# All registry entries (ineligible artists are listed with their blockers)
python3 scripts/sync-ticketmaster-events.py --all-approved --dry-run

# Machine-readable report (JSON to stdout; still writes no files)
python3 scripts/sync-ticketmaster-events.py --artist raye --dry-run --json

# Offline withhold-rule and dry-run-contract self-test (no network)
python3 scripts/sync-ticketmaster-events.py --self-test   # npm run providers:sync:tm:self-test

# Registry validation
npm run providers:identities:validate

# CTA <-> provider-state consistency guard (read-only; part of test:mvp)
npm run validate:cta-provider-state          # --json for machine-readable, --self-test for offline tests
```

`TICKETMASTER_API_KEY` is required for the live lookup (read from the
environment or `.dev.vars`/`.env`, the propose-artists pattern). **Without it
the script fails safely**: it prints a clear notice, emits only the offline
eligibility report, writes nothing, and exits 0 — mirroring the
`apply-tm-updates.mjs` no-op pattern. Running without `--dry-run` is an error
(exit 2): no write mode exists.

### Reading the dry-run report

Per artist the report shows the slug, the registry attraction ID used, the
count of events **recognised** (returned by Discovery for that attraction ID),
how many would be **proposed**, how many are **withheld**, and a histogram of
withheld reasons. Each event row shows TM event ID, name, date/time, venue,
city/country, the URL host, whether that host passes the existing `out.js`
Ticketmaster destination allowlist, and every withhold reason that applies.

Interpretation:

- **PROPOSE** means only that the row passed every dry-run check. Nothing is
  written; a proposed row still goes through the future write-to-PR mode,
  `events:validate:prod`, and human PR review before it can ever reach
  `events.json`.
- **WITHHOLD** means at least one rule failed; the row needs a human decision.
  Common cases: support-act/festival-lineup appearances (the registry
  attraction is not the event's primary attraction — e.g. RAYE on Bruno Mars
  stadium dates), affiliate-wrapped Discovery URLs (`ticketmaster.evyy.net` is
  a trusted *affiliate* host in `out.js` but not a *destination* host, so the
  dry-run conservatively withholds until URL canonicalisation is designed in
  the write-mode PR), non-onsale statuses, missing venue/city/country,
  date-only datetimes, travel/upsell packages, and duplicates.
- A withheld row is never an instruction to relax a rule. If a withheld row
  looks publishable, that is input to the **write-to-PR design**, not a reason
  to hand-edit data files outside the established artist/event workflows.

Ticketmaster write-to-PR mode (sequence step 3 — `scripts/sync-tm-events-write-pr.mjs`):

```bash
# Preview (default): build the candidate batch from a recogniser report and run
# apply-artists.mjs in preview. Nothing tracked changes; no PR is created.
python3 scripts/sync-ticketmaster-events.py --all-approved --dry-run --json > report.json
node scripts/sync-tm-events-write-pr.mjs --report report.json

# Or let the writer run the recogniser itself (needs TICKETMASTER_API_KEY):
node scripts/sync-tm-events-write-pr.mjs --artist raye          # preview
node scripts/sync-tm-events-write-pr.mjs --artist raye --write-pr   # apply + commit + PR

# Apply + commit locally but skip the GitHub PR (env without GITHUB_TOKEN):
node scripts/sync-tm-events-write-pr.mjs --report report.json --write-pr --no-pr

# Offline pure-function self-test (no network, no git)
node scripts/sync-tm-events-write-pr.mjs --self-test   # npm run providers:sync:tm:write-pr:self-test
```

Scheduled invocation: `.github/workflows/tm-new-shows-pr.yml` runs this step
daily at 04:00 UTC for `--all-approved` in `--write-pr --auto-merge` mode — the
scheduled new-show discovery loop. It opens one PR of newly-discovered shows and
squash-merges it once the in-run validation suite has passed (owner-approved
2026-07-07; see `SAFE_PUBLISHING_RULES.md` → the new-events auto-publish
exception). It never commits to `main` directly, and a failed merge leaves the
PR open for a human. `workflow_dispatch` runs default to a safe `preview` (no
PR), accept an optional single-artist `artist` input, and only auto-merge when
the `auto_merge` input is set. Without `TICKETMASTER_API_KEY` the recogniser
no-ops safely (no rows, no PR).

How the write-to-PR step stays safe:

- It does **not** build event records, classify links, serialise `events.json`,
  or regenerate partitions itself. It emits a candidate batch (the same
  `events.csv` + `report.json` shape `propose-artists.mjs` produces) and hands
  it to `scripts/apply-artists.mjs --write`, the single source of truth for all
  of that. Link publishability is classified there: a canonical long-form
  storefront URL becomes `machine_high_confidence` (CTA renders); a short-form
  `/event/<id>` or any non-canonical URL becomes `needs_recheck` (URL preserved,
  CTA suppressed). No data logic is duplicated.
- `apply-artists.mjs` validates (`events:validate:prod`) before and after
  partition/sync and **rolls back** on any failure. The writer additionally runs
  `npm run test:mvp` and `git diff --check` before committing.
- `event_name` is the verbatim official listing title from the Discovery API
  (provider-sourced fact, same trust level as date/venue). `tour_name` is left
  blank on every new row — never inferred from a URL slug or listing title
  (issue #172). The PR body flags it as a required human follow-up.
- Only PROPOSED rows from artists whose live lookup succeeded are written.
  Withheld rows (and artists with an incomplete/failed fetch) go to
  `withheld-review.md` in the batch artifact, never to `events.json`.
- The PR is created on a feature branch with the `automation:tm-events` label
  and `maintainer_can_modify`; the GitHub step requires `GITHUB_TOKEN` +
  `GITHUB_REPOSITORY` (use `--no-pr` to stop after the local commit). With
  `--auto-merge` it is squash-merged immediately — safe because the validation
  suite above ran in the same process on exactly this content (bot-opened PRs
  do not trigger `pull_request` CI); without the flag, or if the merge fails,
  a human merges it.

Future (each its own PR — see the sequence below):

```bash
# SeatGeek enrichment dry-run (builds on the existing
# scripts/enrich-seatgeek-events.mjs / propose-seatgeek-urls.mjs tooling,
# extended to use seatgeek_performer_id from the registry)
node scripts/enrich-seatgeek-events.mjs --dry-run
```

SeatGeek enrichment intentionally reuses the existing, operational `.mjs`
tooling (`docs/SEATGEEK_DISCOVERY.md`) rather than introducing a parallel
script; the registry adds the performer ID it will consume later.

### Vivid Seats event-link sync (`scripts/sync-vividseats-events.mjs`)

Vivid Seats has no per-event API — the anchor is the Impact Marketplace
Products catalog (Program 12730, "Ticket Feed"), fetched per registry-verified
artist with an exact-name `Query='<artist name>'`. That single fetch is
simultaneously the discovery set (finds URLs for events missing one) and the
verification oracle (a stored production id present-and-date/city/venue-
matching in the catalog is verified; absent from a *fully-paginated* 2xx
catalog is positive confirmed-gone evidence). Identity anchoring is weaker
than SeatGeek's numeric performer id — Vivid Seats offers no such id in the
registry, so the anchor is the registry's `review_status: "verified"` gate
plus an exact artist-name match; artist names containing an apostrophe are
skipped rather than guessing at SQL-escaping the Impact `Query` parameter.

```bash
# Dry-run report for all registry-verified artists
node scripts/sync-vividseats-events.mjs                  # npm run vividseats:sync

# Write mode (events.json + partitions + audit log)
node scripts/sync-vividseats-events.mjs --apply           # npm run vividseats:sync:apply

# Single artist, capped API calls
node scripts/sync-vividseats-events.mjs --artist morgan-wallen --max-api-calls 5

# Offline pure-function self-test (no network)
node scripts/sync-vividseats-events.mjs --self-test        # npm run vividseats:sync:self-test
```

Without `IMPACT_VIVIDSEATS_ACCOUNT_SID`/`IMPACT_VIVIDSEATS_AUTH_TOKEN` the
script exits 0 with no checks and no writes. A 401/403 aborts the whole run
and discards any in-memory changes; 5xx/network/parse failures leave the
affected events untouched for the next run. Only `vividseats_url` and
`provider_links["vivid-seats"]` are ever written — never
`verification_status`, `ticketmaster_*`, `seatgeek_*`, or `tour_name`.

Scheduled invocation: `.github/workflows/vividseats-cta-sync.yml` mirrors
`seatgeek-cta-sync.yml` step-for-step (dispatch inputs `mode`/`auto_merge`/
`artist`, in-run validation suite, auto-merged PR on schedule). **The
`schedule:` trigger ships commented out.** Rollout is supervised: the owner
dispatches `mode=preview` to inspect the audit log, then `mode=apply
auto_merge=false` to get a reviewable PR containing the first real
`vividseats_url` data and spot-checks it before merging — this is the "first
owner-verified `vividseats_url` data" sign-off both validators' comments
reference. Only after that merge does a one-line follow-up PR uncomment the
`cron: '30 5 * * *'` schedule (30 minutes after `seatgeek-cta-sync.yml`'s
05:00 UTC run, so the two loops don't race the same data files).

### TicketNetwork, Ticket Liquidator, and StubHub International

These providers share one fail-closed Impact Catalogs ingestion
contract while retaining independent provider slugs, hosts, credentials,
public flags, price flags, provenance, and D1 sources:

```bash
# Offline tests (no network)
npm run impact-providers:sync:self-test
npm run impact-providers:prices:self-test

# Read-only catalog preview
node scripts/sync-impact-marketplace-events.mjs --provider ticketnetwork
node scripts/sync-impact-marketplace-events.mjs --provider ticket-liquidator
node scripts/sync-impact-marketplace-events.mjs --provider stubhub-international

# Apply only after the provider-specific Impact program/catalog is approved
node scripts/sync-impact-marketplace-events.mjs --provider ticketnetwork --apply

# Exact external-ID price preview; --apply writes timestamped D1 upserts
node scripts/snapshot-impact-marketplace-prices.mjs --provider ticketnetwork --json
```

`scripts/lib/impact-marketplace-providers.mjs` owns the provider configuration
and URL normalization. `scripts/sync-impact-marketplace-events.mjs` fetches a
maximum of five 100-row pages per registry-verified artist using Impact's
`/Catalogs/ItemSearch` endpoint (or `/Catalogs/{CatalogId}/Items` when the
optional provider catalog ID is configured). Catalog requests explicitly set
`IrVersion=15` and use the documented 1-based pagination instead of depending
on the account-level API version. Results are isolated to the
provider's configured campaign ID. A row passes only when the artist, venue, city, and venue-local
date all match; zero or multiple candidates never write. A stored link is
cleared/unverified only after a complete successful catalog fetch provides
positive not-listed evidence. Authentication failures abort, and incomplete
catalogs preserve all stored links.

`.github/workflows/impact-marketplace-provider-sync.yml` is manual-only and
defaults to preview. Apply mode regenerates partitions/fallback data, runs the
full validation suite, and opens a review PR with auto-merge disabled.
`.github/workflows/impact-marketplace-price-snapshots.yml` is also manual-only;
it reads the exact verified provider event ID and skips conflicting or missing
price/currency observations. Do not add schedules until the provider-specific
catalog, tracking redirect, rights, and sample event/price checks in
`docs/PROVIDER_DATA_POLICY.md` are complete.

StubHub International is not StubHub US/Canada. Its allowlist contains only the
documented international storefront domains, and approval must not be inferred
between the two businesses.

---

## Implementation sequence

| Step | PR | Scope |
|---|---|---|
| 1 | Foundation — **done** (PR #243) | Registry, schema doc, validator, offline dry-run scaffold. No events, no writes, no CTAs. |
| 2 | Ticketmaster dry-run sync — **done** | `sync-ticketmaster-events.py` calls the TM Discovery API by attraction ID for `sync_enabled` artists; reports proposed/withheld rows; writes nothing. Requires `TICKETMASTER_API_KEY`; no-ops safely if absent (same pattern as the nightly sync). |
| 3 | Ticketmaster write-to-PR mode — **done** | `scripts/sync-tm-events-write-pr.mjs`: explicit `--write-pr` gate; PROPOSED rows are applied via `apply-artists.mjs` (canonical writer + validate-with-rollback) and land on a branch + PR. Withheld rows go to `withheld-review.md`, never the data files. Defaults to a no-write preview; never commits to `main` directly. With the explicit `--auto-merge` flag (scheduled runs; owner-approved 2026-07-07) the PR squash-merges after the in-run validation suite passes; otherwise a human merges. |
| 4 | SeatGeek enrichment dry-run — **done** | `scripts/propose-seatgeek-urls.mjs` consumes `seatgeek_performer_id` from the registry: a verified id scopes the SeatGeek query by `performers.id` and confirms candidate identity by id. Still proposal-only/dry-run (never writes `events.json`), event-level URLs only, no prices, no artist-level links. Inert until a human populates a performer id (all are `null` today). |
| 5 | CTA generation from provider status — **done** | `scripts/validate-cta-provider-state.mjs` (`npm run validate:cta-provider-state`, in `test:mvp`): read-only guard that CTA eligibility derives from verified provider state — every artist CTA is backed by a `review_status: "verified"` registry identity, no `withheld` identity publishes, every publishable event resolves through `/api/out`, and every `machine_high_confidence` row meets its canonical contract. `VERIFIED_TICKET_LINKS` and `/api/out` are unchanged. |

Each step keeps every existing gate: human browser verification for
`VERIFIED_TICKET_LINKS`, `npm run artist:check`, `events:validate:prod`,
the smoke suite, and the stale-sync-guard.

---

## Validation

Run when touching the registry, the scaffold, or this document:

```bash
npm run providers:identities:validate
npm run providers:sync:tm:self-test
npm run providers:sync:tm:write-pr:self-test
npm run seatgeek:self-test
npm run validate:cta-provider-state:self-test
npm run impact-providers:sync:self-test
npm run impact-providers:prices:self-test
python3 scripts/sync-ticketmaster-events.py --all-approved --dry-run
python3 -m py_compile scripts/sync-ticketmaster-events.py
node --check scripts/sync-tm-events-write-pr.mjs
node --check scripts/validate-cta-provider-state.mjs
node --check scripts/validate-provider-identities.mjs
python3 -m json.tool data/provider-identities.json > /dev/null
npm run test:mvp
git diff --check
```
