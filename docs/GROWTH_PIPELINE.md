# Growth Pipeline

The growth pipeline is a report-only planning shell for reviewing artist growth readiness from repository-safe sources. It writes audit artifacts for humans to inspect and does not publish, apply, enrich, create, or route any production ticket data.

## Outputs

Running the pipeline writes all of the following under `.audit/`:

- `.audit/growth-plan.latest.md`
- `.audit/growth-plan.latest.json`
- timestamped Markdown and JSON equivalents (`growth-plan-<timestamp>.md` and `growth-plan-<timestamp>.json`)

These files are generated audit artifacts and are not production data.

## Provider identity phase

The provider identity phase is intentionally limited to local inspection:

- It may read `public/data/artists.json` to report whether an inspected artist exists locally and to summarize the artist's current publishing/indexing state.
- It may read `data/provider-identities.json` to report local provider identity registry status.
- It reports Ticketmaster attraction ID status, whether the Ticketmaster identity appears verified, and whether sync appears enabled.
- It reports SeatGeek performer ID status, but keeps artist-level SeatGeek onboarding blocked/TODO unless the repository already has a safe documented source of truth.
- Existing local provider identities are reported as `duplicate_or_existing` so they are not re-added.
- Missing local provider identities are reported as `not_configured` and remain `blocked` when they would require human/browser verification or an external API lookup.

Missing provider identities require one of the following before any future data change is considered:

1. human/browser verification following the safe publishing rules; or
2. a later explicitly gated API-assisted phase with review-only output unless separately approved.

SeatGeek remains event-level-first. Existing SeatGeek event URL proposal/enrichment tooling may continue to operate within its documented scope, but this growth pipeline must not automatically onboard artist-level SeatGeek identities or links.

## Ticketmaster event phase

The `ticketmaster-events` scope is a dry-run summary only. It does not create events, mutate `public/data/events.json`, publish pages, change CTAs, change affiliate routing, scrape providers, or display prices.

When API access is allowed, the growth pipeline delegates Ticketmaster event recognition to the existing lower-level sync script:

```bash
python3 scripts/sync-ticketmaster-events.py --artist <slug> --dry-run --json
python3 scripts/sync-ticketmaster-events.py --all-approved --dry-run --json
```

That lower-level script remains the source of truth for Ticketmaster sync eligibility, credential handling, Discovery API lookup, allowlist checks, duplicate recognition, and proposed/withheld event classification. The growth pipeline only normalizes the lower-level dry-run JSON into the `.audit/growth-plan*` reports.

The Ticketmaster event section summarizes:

- sync eligibility;
- verified attraction ID status, when available;
- `sync_enabled` status, when available;
- recognised existing events;
- proposed events;
- withheld events;
- blocker and withhold reason histograms; and
- whether the result is report-only, human-review only, or has no PR-ready action.

If the lower-level script is missing, unavailable, lacks credentials, or does not support the requested mode, the phase is reported as `not_configured` or `blocked` instead of failing the entire growth plan. With `--no-api`, the Ticketmaster event phase is skipped/report-only and the lower-level script is not invoked, so no external API call is attempted.

Proposed events are evidence for human review only. Event writes are future, explicit PR-gated work and are not part of `growth:plan`; this pipeline must not add write-to-PR mode or weaken the lower-level Ticketmaster safety checks.


## SeatGeek event phase

The `seatgeek-events` scope is event-level-only and proposal/apply-separated. It does not mutate `public/data/events.json`, apply `seatgeek_url` values, onboard artist-level SeatGeek identities or links, display prices, scrape providers, change CTAs, or change affiliate routing.

For every run, the growth pipeline first reads local event data and reports:

- total local events inspected for the selected artist(s);
- events already containing SeatGeek URLs; and
- events missing SeatGeek URLs.

With `--no-api`, the SeatGeek lower-level script is not invoked. The section remains a local coverage summary and clearly states that no external SeatGeek API call and no apply mode were run.

When API access is allowed, the growth pipeline may delegate to the existing proposal-only script in dry-run mode:

```bash
node scripts/propose-seatgeek-urls.mjs --dry-run --artist <slug> --output .audit/seatgeek-url-candidates-<slug>-<timestamp>.json
node scripts/propose-seatgeek-urls.mjs --dry-run --output .audit/seatgeek-url-candidates-all-<timestamp>.json
```

That lower-level proposal script remains the source of truth for SeatGeek credential handling, API lookup, URL validation, candidate scoring, and high-confidence / needs-review / reject classification. The growth pipeline only summarizes the proposal JSON into `.audit/growth-plan*` reports. It never calls `scripts/enrich-seatgeek-events.mjs --apply-high-confidence` and never applies SeatGeek URLs.

The SeatGeek event section summarizes, when available:

- high-confidence proposal count;
- needs-review proposal count;
- blocked/no-match count; and
- an explicit statement that no apply mode was run.

If the lower-level SeatGeek proposal script is missing, unavailable, lacks credentials, or does not support the requested mode, the phase is reported as `not_configured` or `blocked` instead of failing the entire growth plan. SeatGeek remains event-level-only; artist-level SeatGeek onboarding is outside `growth:plan`.

## Usage

```bash
npm run growth:plan:no-api -- --artist beyonce
npm run growth:plan -- --artist beyonce --scope ticketmaster-events
npm run growth:plan:no-api -- --artist beyonce --scope ticketmaster-events
npm run growth:plan:no-api -- --artist beyonce --scope seatgeek-events
npm run growth:plan -- --artist beyonce --scope seatgeek-events
npm run growth:plan -- --all --scope ticketmaster-events
npm run growth:plan -- --scope all
```

The `--no-api` flag is accepted for clarity and safety. API-backed phases are skipped/report-only under `--no-api`; missing IDs are reported instead of discovered.
