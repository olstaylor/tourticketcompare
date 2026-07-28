# Provider synchronization

This runbook describes how verified provider identities, event links, and provider observations enter the repository. Current coverage and rollout state belong in [PROJECT_STATUS.md](../PROJECT_STATUS.md); provider rights and display rules live in [PROVIDER_DATA_POLICY.md](PROVIDER_DATA_POLICY.md).

## Non-negotiable invariants

- Sync only registry-verified artists and provider identities.
- Use official APIs or approved affiliate/catalog feeds; never scrape.
- Match exact events with provider-specific identity, date/time, city, venue, URL-shape, and ambiguity gates.
- Zero or multiple qualifying candidates do not write.
- Transient/auth/incomplete-feed failures never clear a stored verified link.
- Apply modes regenerate derived data, run validation, and propose changes through a pull request.
- `tour_name`, new artists, and ambiguous/withheld rows remain human-gated.
- `/api/out` and public rendering remain fail closed.

## Provider identity registry

`data/provider-identities.json` is the canonical cross-provider identity registry. An entry is usable only when `review_status` is `verified`.

Common fields include:

| Field | Purpose |
|---|---|
| `artist_slug` | Stable local artist key |
| `ticketmaster_attraction_id` | Discovery API identity |
| `ticketmaster_artist_url` | Browser-verified artist storefront |
| `seatgeek_performer_id` | SeatGeek API identity |
| `seatgeek_artist_url` | API-captured and browser-verified performer page |
| `sync_enabled` | Explicit opt-in for automated event discovery |
| `review_status` / verification metadata | Human approval state and evidence |

Provider event URLs never belong in the identity registry; they live on reviewed event records with provider-specific provenance.

Validate the registry with:

```bash
npm run providers:identities:validate
```

## Ticketmaster event discovery

Ticketmaster is the official event identity/source lane and produces plain unmonetized links.

```bash
# Read-only Discovery report
npm run providers:sync:tm:dry-run

# Offline writer self-test
npm run providers:sync:tm:write-pr:self-test
```

The scheduled new-show workflow (`tm-new-shows-pr.yml`) uses verified attraction IDs and `sync_enabled` artists. Its writer (`scripts/sync-tm-events-write-pr.mjs`) applies only proposed rows through the canonical event writer, regenerates derived data, validates the exact proposed content, and opens one pull request (`automation:tm-events` label); it never commits to `main` directly. The recogniser withholds events already in `events.json`, so a quiet day produces no commit and no PR; `event_name` is populated verbatim from the Discovery API listing title and `tour_name` is left blank for human verification. Its sanctioned auto-merge is limited by [SAFE_PUBLISHING_RULES.md](../SAFE_PUBLISHING_RULES.md); a failed merge leaves the PR open for a human. Manual `workflow_dispatch` defaults to a safe preview (no PR), accepts an optional single-artist `artist` input, and only auto-merges when the `auto_merge` input is set. Without `TICKETMASTER_API_KEY` the recogniser no-ops safely. Withheld rows are reported, not published.

The recogniser also consults a tombstone registry, `data/deleted-events.json`. When an owner deletes a row from `events.json` that Ticketmaster still lists (a de-duplicated or dead-storefront copy), adding that row's ids and/or venue/date to the registry stops the next run from re-proposing it. Matching mirrors the live dedup keys (Ticketmaster id **or** normalized venue/date), tombstoned candidates are withheld with a distinct reason, and the registry can only ever withhold more — never widen what gets proposed. A missing or malformed file fails open (no tombstones).

The nightly field-sync (`nightly-data-sync.yml`, via `scripts/apply-tm-updates.mjs`) updates only lossless factual fields on existing events — date/time, venue/city, the official listing title `event_name`, and the refreshed canonical TM URL — pulled per event id from the Discovery API when the Discovery identity is exact and that row has no review blockers of its own. It then regenerates the inline fallback and partitions. Manual runs default to `dry_run: true`; a dry-run writes `.audit/tm-sync.json` as an uploaded artifact and cannot commit or push. The auto-commit is blocked by any error, missing report, dry-run input, validation failure, smoke-test failure, or absent `events.json` diff; review items and blocked updates on other events go to the rolling `automation:data-sync` issue (via `scripts/report-tm-sync-review.mjs`) without vetoing the clean updates. Deletions (404/410), cancelled/postponed status, new shows, and `tour_name` are never auto-applied. Without `TICKETMASTER_API_KEY` the run writes a skipped report and no-ops safely.

## Daily Ticketmaster audit

`daily-audit.yml` performs, in order:

1. URL liveness via `scripts/verify-outbound-links.mjs`.
2. A Ticketmaster Discovery diff via `scripts/audit-tm-events.mjs` (requires `TICKETMASTER_API_KEY`; skipped safely if absent).
3. Reporting via `scripts/daily-audit-report.mjs` into a single rolling GitHub issue (`automation:daily-audit`).
4. Verification-date bumps via `scripts/bump-verified-dates.mjs`, auto-committed directly to `main` after in-job validation (`npm run test:mvp` + `git diff --check`); owner-approved 2026-07-28, replacing the former human-review PR. A TM-skip/failure guard prevents date bumps when TM data is unavailable, and the conservative blocked-link guard holds date bumps while liveness results are WAF/bot-blocked (401/403/429) — blocked is not proof of life or death.

The Discovery API is keyed by the **Discovery event id** (`ticketmaster_discovery_event_id` / `provider_links.ticketmaster.discovery_event_id`), NOT the consumer-website `/event/<id>` code stored in `ticketmaster_event_id` (16-char hex) or the international numeric storefront id. Events lacking a Discovery-format id are reported as **`unresolvable`** — surfaced for backfill, never counted as missing. `scripts/backfill-discovery-ids.mjs` (`npm run audit:backfill-discovery-ids`; dry-run by default, `--apply` to write) recovers Discovery ids from the verified per-artist attraction feed by venue-local-date + city match, writing only on unambiguous API matches. Date/venue/status comparison is timezone-aware and only flags actionable status transitions (cancelled/postponed/rescheduled).

## SeatGeek event URLs

SeatGeek discovery and verification are separate steps:

```bash
npm run seatgeek:propose
npm run seatgeek:enrich          # dry run
npm run seatgeek:verify          # dry run
```

Discovery scopes by the registry-verified performer ID where available. Enrichment applies only high-confidence matches. Verification checks the stored SeatGeek event against performer ID, instant, city, venue, and event URL shape before writing `provider_links.seatgeek` provenance.

The scheduled SeatGeek CTA workflow may apply and auto-merge only within its documented validation/safe-direction gates. It writes its latest audit evidence to:

- `reports/provider-sync/seatgeek-cta-auto-add.md`
- `reports/provider-sync/seatgeek-cta-verify.md`

See [SEATGEEK_DISCOVERY.md](SEATGEEK_DISCOVERY.md) for the full matching and self-heal contract.

## Vivid Seats event URLs

```bash
npm run vividseats:sync          # dry run
npm run vividseats:sync:apply
npm run vividseats:sync:self-test
```

The Vivid Seats sync uses the approved Impact Marketplace Products catalog as both discovery set and verification oracle. Artist name, venue, city, venue-local date, production ID, URL shape, and ambiguity must all pass. A complete successful catalog is required before a confirmed-gone record can be cleared; incomplete/transient results preserve existing data.

The scheduled workflow regenerates derived data, validates, and proposes its changes through the sanctioned automation path. The latest report is `reports/provider-sync/vividseats-cta-sync.md`.

## Shared Impact marketplace providers

TicketNetwork, Ticket Liquidator, and StubHub International share one implementation while retaining independent slugs, campaigns/catalogs, host allowlists, flags, provenance, and D1 sources. StubHub International is not StubHub US/Canada.

```bash
# Offline matcher and price-writer tests
npm run impact-providers:sync:self-test
npm run impact-providers:prices:self-test

# Read-only event-link preview
node scripts/sync-impact-marketplace-events.mjs --provider ticketnetwork
node scripts/sync-impact-marketplace-events.mjs --provider ticket-liquidator
node scripts/sync-impact-marketplace-events.mjs --provider stubhub-international

# Explicit apply (review PR path)
node scripts/sync-impact-marketplace-events.mjs --provider ticketnetwork --apply

# Exact external-ID price preview
node scripts/snapshot-impact-marketplace-prices.mjs --provider ticketnetwork --json
```

The event-link workflow runs nightly in three serialized provider lanes after the Ticketmaster, SeatGeek, and Vivid Seats jobs. Catalog results are campaign-isolated and write only unambiguous artist + venue + city + venue-local-date matches. Scheduled changes auto-merge only after the full validation suite passes; manual dispatch remains preview-first and manual apply remains review-only. Provider-specific credentials may override an explicitly approved fallback credential set.

The snapshot workflow reads the exact stored provider event ID. It skips missing/conflicting price or currency observations. Only providers with approved numeric feed data and enabled schedules write D1; other provider lanes remain manual and price-disabled. Check workflow YAML and `PROJECT_STATUS.md` for current activation rather than copying campaign IDs or schedules here.

## Derived files and reports

Any event-data write must regenerate:

- `public/data/events/<artist>.json`
- `public/data/events-index.json`
- the inline fallback in `public/index.html`

Run `npm run events:sync`. Generated provider reports live in `reports/provider-sync/` and are operational evidence, not policy or current-state authority.

## Validation

Run the relevant provider self-tests plus:

```bash
npm run docs:check
npm run providers:identities:validate
npm run validate:cta-provider-state
npm run events:validate:prod
npm run events:validate:partitions
npm run test:mvp
git diff --check
```

If event data changed, inspect the diff for unexpected changes to `verification_status`, Ticketmaster fields, provider URLs/provenance, and `tour_name`. A provider tool must only touch the fields documented for its lane.
