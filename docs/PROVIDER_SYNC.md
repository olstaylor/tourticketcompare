# Provider Sync — Foundation and Future Workflow

_Status: **foundation only** (registry + validator + dry-run scaffold). No sync script calls any live API yet. No events, CTAs, or data writes are produced by anything described here._

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
| `seatgeek_performer_id` | number \| null | SeatGeek performer ID for future enrichment only. No SeatGeek URLs are stored here — ever. |
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

## Planned commands

Available now (foundation, offline, read-only):

```bash
python3 scripts/sync-ticketmaster-events.py --artist <slug> --dry-run
python3 scripts/sync-ticketmaster-events.py --all-approved --dry-run
npm run providers:identities:validate
```

The current `sync-ticketmaster-events.py` is **scaffolding**: it reads the
registry and existing artist/event data and prints the checks a real sync run
will perform. It makes no network calls and refuses to run without `--dry-run`.

Future (each its own PR — see the sequence below):

```bash
# Ticketmaster dry-run sync (live Discovery API, report-only)
python3 scripts/sync-ticketmaster-events.py --artist <slug> --dry-run

# Ticketmaster write mode (explicitly gated; output goes to a PR, never main)
python3 scripts/sync-ticketmaster-events.py --artist <slug> --write-pr

# SeatGeek enrichment dry-run (builds on the existing
# scripts/enrich-seatgeek-events.mjs / propose-seatgeek-urls.mjs tooling,
# extended to use seatgeek_performer_id from the registry)
node scripts/enrich-seatgeek-events.mjs --dry-run
```

SeatGeek enrichment intentionally reuses the existing, operational `.mjs`
tooling (`docs/SEATGEEK_DISCOVERY.md`) rather than introducing a parallel
script; the registry adds the performer ID it will consume later.

---

## Implementation sequence

| Step | PR | Scope |
|---|---|---|
| 1 | **Foundation (this PR)** | Registry, schema doc, validator, offline dry-run scaffold. No events, no writes, no CTAs. |
| 2 | Ticketmaster dry-run sync | `sync-ticketmaster-events.py` calls the TM Discovery API by attraction ID for `sync_enabled` artists; reports new/changed/withheld rows; writes nothing. Requires `TICKETMASTER_API_KEY`; no-ops safely if absent (same pattern as the nightly sync). |
| 3 | Ticketmaster write-to-PR mode | Explicit `--write-pr` gate; validated candidate rows land on a branch + PR for human review. Withheld rows go to a review report, never the data files. |
| 4 | SeatGeek enrichment dry-run | Extend existing SeatGeek tooling to use `seatgeek_performer_id`; event-level URL proposals only; no prices, no artist-level links. |
| 5 | CTA generation from provider status | CTA eligibility derived from verified provider state. All existing gates remain: `VERIFIED_TICKET_LINKS` stays human-confirmed, `/api/out` validation unchanged. |

Each step keeps every existing gate: human browser verification for
`VERIFIED_TICKET_LINKS`, `npm run artist:check`, `events:validate:prod`,
the smoke suite, and the stale-sync-guard.

---

## Validation

Run when touching the registry, the scaffold, or this document:

```bash
npm run providers:identities:validate
python3 scripts/sync-ticketmaster-events.py --all-approved --dry-run
python3 -m py_compile scripts/sync-ticketmaster-events.py
node --check scripts/validate-provider-identities.mjs
python3 -m json.tool data/provider-identities.json > /dev/null
npm run test:mvp
git diff --check
```
