# SeatGeek Event-URL Discovery & Enrichment

This is the operational runbook for adding **event-level** SeatGeek CTAs to shows
that already carry a verified Ticketmaster event. It explains how verified
`seatgeek_url` values are discovered from the SeatGeek API, scored, applied, and
validated.

> Scope guardrail: this tooling covers **event-level** SeatGeek URLs only.
> (Artist-level SeatGeek performer-page links exist since 2026-07-02 but are
> managed through `VERIFIED_TICKET_LINKS` + the provider identity registry via
> the batch onboarding tooling, not through this enrichment pipeline. SeatGeek
> price display remains parked — see `BACKLOG.md`.) This tooling never invents
> URLs, never scrapes, and only writes URLs that pass strict event-URL
> validation identical to the runtime CTA gate.

## How a SeatGeek CTA reaches a show

1. An event in `public/data/events.json` has a non-empty `seatgeek_url`.
2. That URL passes `safeSeatGeekTicketUrl()` (server, `functions/[[path]].js`)
   and `safeSeatGeekEventUrl()` (client, `public/app.js`): HTTPS,
   `seatgeek.com`/`www.seatgeek.com` host, and an event-specific path ending in
   `/concert/<id>` (or `/sports|/theater|/theatre/<id>`).
3. SeatGeek redirects are configured in production (`isSeatGeekConfigured(env)`),
   so `/api/out?showId=<id>&provider=seatgeek` resolves via Impact tracking.

If any of these is false, the show renders its Ticketmaster CTA only. There is
no fallback that fabricates a SeatGeek link.

## Credentials

The discovery scripts call `https://api.seatgeek.com/2/events` and require:

- `SEATGEEK_CLIENT_ID` — required.
- `SEATGEEK_CLIENT_SECRET` — optional; sent server-side if present and always
  redacted from logs/output.

These are **not** the Impact affiliate bindings used by `/api/out`; they are the
SeatGeek API discovery credentials. Provide them as environment variables
locally, or as repository secrets for the CI workflow. Without
`SEATGEEK_CLIENT_ID` the proposal script still runs and emits a summary with no
candidates (it never errors-out the pipeline); the enrichment script fails
closed.

## Tools

| Command | Script | Writes | Use |
|---|---|---|---|
| `npm run seatgeek:self-test` | `propose-seatgeek-urls.mjs --self-test` | nothing | CI/local smoke test of scoring + safety, no API calls |
| `npm run seatgeek:propose` | `propose-seatgeek-urls.mjs` | `reports/seatgeek-url-candidates.json` (gitignored) | Proposal-only review file; never mutates event data |
| `npm run seatgeek:enrich` | `enrich-seatgeek-events.mjs` | audit log only (dry-run) | Dry-run; shows what would be applied |
| `npm run seatgeek:enrich:apply` | `enrich-seatgeek-events.mjs --apply-high-confidence` | `events.json` + partitions + audit log | Applies high-confidence matches |
| `npm run seatgeek:verify` | `verify-seatgeek-events.mjs` | audit log only (dry-run) | Identity-anchored verification preview |
| `npm run seatgeek:verify:apply` | `verify-seatgeek-events.mjs --apply` | `events.json` + partitions + audit log | Writes `provider_links.seatgeek` verified provenance; self-heals wrong/stale URLs |
| `npm run seatgeek:verify:self-test` | `verify-seatgeek-events.mjs --self-test` | nothing | Offline invariant tests, no API calls |

Useful flags (both enrich + propose): `--artist <slug-or-name>`, `--limit <n>`,
`--delay-ms <n>`, `--verbose`. Enrichment also supports `--max-api-calls`,
`--resume-from-log`, `--resume-from <showId>`, and `--refresh`. Verification
supports `--artist`, `--limit`, `--delay-ms`, `--max-api-calls`,
`--recheck-days <n>` (re-verify provenance older than n days, default 3),
`--json`, and `--log-path`.

## Registry performer-id scoping (provider-sync step 4)

When an artist has a `seatgeek_performer_id` in
`data/provider-identities.json` **and the entry's `review_status` is
`"verified"`** (an id on an unverified/withheld entry is ignored),
`propose-seatgeek-urls.mjs` uses it to:

- **Scope the SeatGeek query by `performers.id`** (a strongest-first attempt
  tried before the free-text artist queries), which eliminates same-name /
  tribute collisions at the API level; and
- **Confirm candidate identity by id** — a candidate whose SeatGeek performer id
  equals the verified registry id clears the mandatory performer-similarity
  gate even when SeatGeek styles the performer name differently.

This **never** relaxes the other mandatory gates (valid event-level URL, exact
local date, city). It is event-level only — the performer id scopes a search for
*events*, it never proposes a performer/artist page URL. Artists with a `null`
performer id (all of them today) are searched by name exactly as before, so the
behaviour is unchanged until a human verifies and populates a performer id
(one-time, per `docs/PROVIDER_SYNC.md`). The proposal report's
`summary.registry_performer_id` block records how many artists carry a verified
id, how many events were scoped by id, and how many candidates were id-confirmed.

This step remains **proposal-only/dry-run**: it never writes `events.json`.

## Matching & safety model

Candidates are scored on artist/performer similarity (or a verified performer-id
confirmation, see above), exact local date, city (exact or known metro
equivalent), venue similarity, concert/music taxonomy, and event-URL validity. A
match is only applied (`high_confidence`) when **all** mandatory checks pass:

- valid event-level SeatGeek URL,
- performer similarity ≥ 0.9,
- exact local date match,
- exact city or accepted metro match,
- score ≥ threshold, and
- no conflicting same-date/city candidates.

Anything short of that is skipped (proposal: `needs_review` / `reject`) and left
for human verification. The apply path only touches events that are
Ticketmaster-verified and currently lack a valid `seatgeek_url`.

## Verification & standalone SeatGeek CTAs (`verify-seatgeek-events.mjs`)

The runtime gate `providerEventPublishable` lets a SeatGeek event CTA publish
**standalone on a `needs_recheck` event** when the SeatGeek link carries its
own verified provenance (`provider_links.seatgeek.verified === true`) — the
recheck flag tracks the broken Ticketmaster storefront URL, not the SeatGeek
listing. `scripts/verify-seatgeek-events.mjs` is the only writer of that
provenance. Per event it:

1. Confirms the stored `seatgeek_url` against the SeatGeek `/2/events/<id>` API
   record: the registry-verified `seatgeek_performer_id` must appear on the
   record, the UTC instants must match within ±3h (`datetime_utc` vs the
   event's `datetime_iso`), the city must match (exact/metro), and the URL must
   pass the event-URL shape validator. UTC-instant matching is what catches
   wrong-night URL mix-ups between back-to-back shows at the same venue.
2. When the stored URL fails (or none is stored), runs one discovery query
   scoped to the performer id in a ±12h window around the event instant.
   Exactly one qualifying candidate may be applied; zero or ambiguous results
   are reported, never guessed.
3. Self-heals in the safe direction only: failed stored URLs are corrected to
   the single unambiguous match or cleared; previously-verified provenance the
   API no longer confirms is un-verified and cleared. Events whose
   `datetime_iso` is timezone-naive with no IANA `timezone` field are skipped
   as date-ambiguous.

Selection per run: all `needs_recheck` events, all events holding an
unverified `seatgeek_url` (provenance backfill), and verified provenance older
than `--recheck-days`. `validate-cta-provider-state.mjs` hard-errors on any
verified provenance whose CTA would not redirect.

## Nightly automation (`seatgeek-cta-sync.yml`)

Since 2026-07-08 (owner-approved) `.github/workflows/seatgeek-cta-sync.yml`
runs both halves nightly at 05:00 UTC — `seatgeek:enrich` in apply mode, then
`seatgeek:verify:apply` — regenerates partitions and the inline fallback, runs
the full validation suite in-job, and opens an auto-merged PR
(`automation:seatgeek-cta` label) with both committed audit logs. This is the
second narrow auto-publish exception in `SAFE_PUBLISHING_RULES.md`. Manual
dispatch defaults to a safe preview; without `SEATGEEK_CLIENT_ID` the run
no-ops. The manual workflow below remains valid for targeted runs.

## Recommended workflow

1. **Propose / dispatch.** Run `npm run seatgeek:propose` locally, or trigger the
   `SeatGeek Discovery Proposal` GitHub Action
   (`.github/workflows/seatgeek-discovery-proposal.yml`) which uploads the review
   JSON as an artifact. This is proposal-only and never edits event data.
2. **Review.** Inspect `reports/seatgeek-url-candidates.json`. Spot-check
   `needs_review` rows in a browser.
3. **Apply.** With credentials present, run `npm run seatgeek:enrich:apply`
   (optionally `--artist <slug>`). This writes `seatgeek_url` for high-confidence
   matches into `public/data/events.json`, syncs the per-artist partitions, and
   refreshes `docs/SEATGEEK_CTA_AUTO_ADD_LOG.md`.
4. **Sync + validate.** Run:
   ```
   npm run events:sync
   python3 scripts/validate-events.py --for-production
   node scripts/validate-partitions.mjs
   node scripts/smoke-prelaunch.mjs
   ```
5. **PR.** Open a PR with the data diff and the audit log for human review. Do
   not push event-data changes to `main` directly.

## Current coverage snapshot

As of 2026-07-08, 262 of 402 events carry a stored event-level `seatgeek_url`
(28 added in the 2026-07-06 enrichment). The ~87 uncovered Ticketmaster-verified
events are predominantly European/non-US legs SeatGeek does not list — a
structural gap, not an untried one; absence of a SeatGeek match for a given show
is expected and acceptable (the Ticketmaster CTA still renders). Live counts
belong in `PROJECT_STATUS.md`; the nightly sync keeps coverage current from
here on.

## Non-goals

- No artist-level SeatGeek links from this pipeline (they live in `VERIFIED_TICKET_LINKS` via batch onboarding); no SeatGeek price display.
- No invented or scraped URLs; only API-discovered URLs that pass validation.
- No changes to `/api/out` redirect logic, Impact handling, or CTA rendering.
- Apply runs are either human-run or the sanctioned nightly
  `seatgeek-cta-sync.yml` loop (owner-approved 2026-07-08, see
  `SAFE_PUBLISHING_RULES.md`); the discovery-proposal workflow stays
  proposal-only.
