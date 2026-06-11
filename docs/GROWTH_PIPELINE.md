# Growth Pipeline

The growth pipeline is a report-only planning shell for reviewing artist growth readiness from repository-safe sources. It writes audit artifacts for humans to inspect and does not publish, apply, enrich, create, or route any production ticket data.


## Supported `growth:plan` scopes

`growth:plan` currently accepts these report-only scopes:

- `provider-identities` (default) — local provider identity inspection only.
- `ticketmaster-events` — dry-run summary delegated to the lower-level Ticketmaster sync script when API access is allowed.
- `seatgeek-events` — event-level SeatGeek URL proposal summary only; apply mode is never run.
- `pricing` — report-only policy stub. It does not call price APIs, read provider feeds, check inventory, display prices, or write production data.
- `artist-discovery` — report-only stub. It does not call discovery APIs, scrape sources, create artist shells, add events, or change provider identities.
- `all` — runs the implemented report-only phases and the two report-only stubs above.

No `growth:plan` scope opens PRs or writes production data.

## `growth:open-pr` limitation

The `growth:open-pr` npm script name is historical/misleading. The command currently only supports `--scope provider-identity`, updates at most one provider identity registry entry after human-supplied evidence, runs validation checks, and prints manual follow-up instructions. It does **not** create a branch, commit, push, or open a GitHub PR. It is not a general write-to-PR mechanism for events, pricing, artist discovery, SeatGeek URLs, CTAs, affiliate routing, or `/api/out`.

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



## Pricing scope stub

The `pricing` scope is a report-only policy stub. It exists so advertised scopes match CLI behavior, but it does not run provider price APIs, consume provider feeds, check inventory or availability, display prices, create cheapest/best-deal claims, or write production data. The generated report records pricing as blocked by policy unless separate written provider display permission and all safe publishing gates are satisfied in a future explicitly scoped request.


## Artist discovery scope stub

The `artist-discovery` scope is a report-only stub. It does not call external discovery APIs, scrape sources, create artist shells, add events, change provider identities, change CTAs, change affiliate routing, or add pricing. It only records that no candidates were discovered or written. Any future artist shell work must be explicitly requested as a narrow, human-reviewed, review-required shell with no CTAs, affiliate routing, events, provider identities, or pricing bundled in.

## Publishing plan and future write-to-PR gates

Every growth report includes a `Publishing plan` section in both Markdown and JSON. The section translates the report findings into normalized, safe follow-up classifications only; it does not perform the actions. The plan must always state that no PR was opened, no production data was changed, auto-publishing is disabled, any future write must be explicit and scope-specific, and combined mega-publish mode is forbidden.

Normalized action types are:

- `no_op` — no publishing follow-up was identified.
- `report_only` — the finding is useful for audit/review but does not justify a production-data PR.
- `blocked_pending_human_verification` — a human must verify the underlying identity, event, URL, or blocker before any write can be requested.
- `provider_identity_pr_required` — a provider identity update would need its own narrow PR after human verification; it must not be bundled with events, CTAs, affiliate routing, pricing, or `/api/out`.
- `ticketmaster_event_pr_possible_after_review` — Ticketmaster event proposals may become an event-only PR only after human review and an explicit scope-specific request.
- `seatgeek_event_url_pr_possible_after_review` — SeatGeek event URL proposals may become an event-URL-only PR only after human review and an explicit scope-specific request.
- `artist_shell_pr_possible` — an artist shell may be considered only as a review-required shell with no CTAs, affiliate routing, events, or pricing.
- `pricing_blocked_by_policy` — pricing display, price comparison claims, availability claims, cheapest/best-deal language, and inventory claims remain blocked by policy.

Future write-to-PR work is intentionally outside `growth:plan`. A future write may be considered only when all of these gates are satisfied:

1. The request is explicit about the exact write scope, such as provider identities only, Ticketmaster events only, SeatGeek event URLs only, or artist shell only.
2. The requested scope has human-reviewed evidence from accepted sources and does not rely on the growth report alone.
3. The PR is narrow and does not combine unrelated publishing surfaces. No combined mega-publish mode should be used.
4. The change does not modify CTAs, affiliate routing, pricing, provider identities, events, artists, or `/api/out` unless that exact surface is named in the explicit request.
5. The change keeps auto-publishing disabled; the growth pipeline must not open PRs or write production data itself.

## Usage

```bash
npm run growth:plan:no-api -- --artist beyonce
npm run growth:plan -- --artist beyonce --scope ticketmaster-events
npm run growth:plan:no-api -- --artist beyonce --scope ticketmaster-events
npm run growth:plan:no-api -- --artist beyonce --scope seatgeek-events
npm run growth:plan -- --artist beyonce --scope seatgeek-events
npm run growth:plan -- --all --scope ticketmaster-events
npm run growth:plan:no-api -- --scope pricing
npm run growth:plan:no-api -- --scope artist-discovery
npm run growth:plan -- --scope all
```

The `--no-api` flag is accepted for clarity and safety. API-backed phases are skipped/report-only under `--no-api`; missing IDs are reported instead of discovered. The `pricing` and `artist-discovery` scopes are stubs, so they remain report-only regardless of `--no-api`.
