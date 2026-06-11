# Growth Pipeline

The growth pipeline is a report-only planning shell for reviewing artist growth readiness from local repository data. It writes audit artifacts for humans to inspect and does not publish, apply, enrich, or route any production ticket data.

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

External provider lookup is not part of this phase or this PR. The pipeline must not call provider APIs, scrape provider websites, invent provider IDs, invent URLs, modify events or artists, change CTAs, change affiliate routing, change `/api/out`, or alter pricing/availability display logic.

Missing provider identities require one of the following before any future data change is considered:

1. human/browser verification following the safe publishing rules; or
2. a later explicitly gated API-assisted phase with review-only output unless separately approved.

SeatGeek remains event-level-first. Existing SeatGeek event URL proposal/enrichment tooling may continue to operate within its documented scope, but this growth pipeline must not automatically onboard artist-level SeatGeek identities or links.

## Usage

```bash
npm run growth:plan:no-api -- --artist beyonce
```

The `--no-api` flag is accepted for clarity and safety. The current growth pipeline does not implement external API lookup, so missing IDs are reported instead of discovered.
