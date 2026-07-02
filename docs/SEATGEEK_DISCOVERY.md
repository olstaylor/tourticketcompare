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

Useful flags (both enrich + propose): `--artist <slug-or-name>`, `--limit <n>`,
`--delay-ms <n>`, `--verbose`. Enrichment also supports `--max-api-calls`,
`--resume-from-log`, `--resume-from <showId>`, and `--refresh`.

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

As of the latest credentialed enrichment audit (2026-06-11), 180 of 329
events carry a valid event-level `seatgeek_url`; 176 of 264 Ticketmaster-verified
events carry one. Artists with full stored SeatGeek event coverage where matches
exist: `bts`, `harry-styles`, `jay-z`. Partial stored coverage: `ariana-grande`,
`bruno-mars`, `morgan-wallen`, `olivia-rodrigo`. No matches are stored yet for
`bad-bunny`, `ed-sheeran`, or `shakira`. The latest apply run queried the 88
Ticketmaster-verified events still missing a SeatGeek URL and the SeatGeek API
returned no candidates for those event/date/city searches; absence of a SeatGeek
match for a given show is expected and acceptable (the Ticketmaster CTA still
renders).

## Non-goals

- No artist-level SeatGeek links from this pipeline (they live in `VERIFIED_TICKET_LINKS` via batch onboarding); no SeatGeek price display.
- No invented or scraped URLs; only API-discovered URLs that pass validation.
- No changes to `/api/out` redirect logic, Impact handling, or CTA rendering.
- The apply step is deliberate and human-run; CI is proposal-only.
