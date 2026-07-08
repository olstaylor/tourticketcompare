# Provider Candidate Reporting Pipeline

> **ARCHIVED — historical reference only.** Not a source of current priorities or current state. See `CLAUDE.md` → `PROJECT_STATUS.md` → `BACKLOG.md`. (Banner added 2026-07-07.)

`scripts/propose-provider-candidates.mjs` is a dry-run reporting tool for safe
provider identity onboarding. It is designed to help review Ticketmaster
attraction IDs before they are copied into `data/provider-identities.json` by a
human in a separate, deliberate PR.

## Safety boundaries

- Dry-run is the default and only supported mode.
- The script writes only ignored review artifacts under `.audit/` by default.
- It does not modify production artist data, event data, provider registries,
  CTA rendering, `/api/out`, affiliate routing, or pricing behavior.
- It does not scrape. Ticketmaster candidates come only from the official
  Ticketmaster Discovery API when `TICKETMASTER_API_KEY` is available.
- It never displays or proposes prices.
- `auto_safe_for_review` means “safe to put in front of a human reviewer”; it
  does **not** mean “safe to publish automatically.”

## Usage in Claude Code / Codex Cloud

This workflow is designed for agent-run environments. You should not need to run
it locally. Ask the agent to run one of the commands below, then have it paste
the `.audit/provider-candidates.latest.md` summary and call out any
`auto_safe_for_review` or `needs_manual_review` rows.

Agent smoke run with no provider API calls:

```bash
npm run providers:candidates:no-api -- --artist beyonce
```

Agent Ticketmaster candidate review for every artist missing or carrying
registry state, using the Discovery API only when `TICKETMASTER_API_KEY` is
present in the cloud environment:

```bash
npm run providers:candidates
```

Agent review of both Ticketmaster and the current SeatGeek structure-only TODO
output:

```bash
npm run providers:candidates -- --provider all --limit 3
```

Useful direct script equivalents:

```bash
node scripts/propose-provider-candidates.mjs
node scripts/propose-provider-candidates.mjs --artist beyonce --no-api
node scripts/propose-provider-candidates.mjs --provider all --limit 3
```

Outputs:

- `.audit/provider-candidates-<timestamp>.json`
- `.audit/provider-candidates-<timestamp>.md`
- `.audit/provider-candidates.latest.json`
- `.audit/provider-candidates.latest.md`

The timestamped files preserve each run. The `latest` files make cloud-agent
follow-up easy because the agent can always read the same path after a run. Both
report formats include evidence URLs, provider IDs when available, confidence,
matching reasons, and blocking flags. The `.audit/` directory is gitignored, so
these reports are review artifacts rather than publishable data.

## Will this work well?

It should work well in Claude Code or Codex Cloud for its intended narrow job:
surfacing review candidates and explaining why a provider identity is safe to
review, already present, ambiguous, or blocked. It is **not** a publishing or
registry-writing workflow. In practice:

- Existing verified registry rows should appear as `duplicate_or_existing`, so
  reviewers do not re-add already-onboarded provider identities.
- Artists missing a Ticketmaster attraction ID are `blocked` when the API key is
  absent or `--no-api` is used, which prevents local data from being treated as
  sufficient evidence.
- With `TICKETMASTER_API_KEY`, Ticketmaster candidates are scored from official
  Discovery attraction results, allowed-host evidence URLs, music
  classification, and name-token matching.
- SeatGeek output is intentionally blocked/TODO-only until a separate safe
  performer lookup is scoped; existing SeatGeek event URL tooling remains the
  place for event-level SeatGeek coverage.
- Cloud agents should summarize the Markdown report in their response rather
  than committing `.audit/` files or mutating production data.

## Classifications

| Classification | Meaning |
|---|---|
| `auto_safe_for_review` | A high-confidence API candidate with allowed evidence URLs and no blocking flags; still requires human browser review before any registry edit. |
| `needs_manual_review` | A plausible candidate that is ambiguous, lower-confidence, or otherwise needs extra human judgment. |
| `blocked` | The script cannot safely propose a provider ID, for example because credentials are missing, the provider API returned no result, confidence is too low, or evidence URL/host checks failed. |
| `duplicate_or_existing` | The provider identity already exists in the private registry or is otherwise already verified; do not re-add it. |

## Ticketmaster workflow

1. Run the report. Without `TICKETMASTER_API_KEY`, artists missing a registry
   attraction ID are reported as `blocked` rather than guessed from local event
   URLs.
2. With `TICKETMASTER_API_KEY`, review `auto_safe_for_review` and
   `needs_manual_review` entries in the Markdown report.
3. Browser-verify the Ticketmaster artist URL and attraction identity.
4. In a separate PR, update `data/provider-identities.json` only after human
   verification and run the provider identity validation gates.

## SeatGeek status

SeatGeek is intentionally structure-only here. Existing SeatGeek tooling remains
focused on event-level URL discovery and enrichment, not artist-level provider
identity onboarding. Before this pipeline can emit SeatGeek performer candidates,
a separate task must safely scope credentialed performer lookup, matching rules,
and review gates.

TODOs before implementing SeatGeek provider identity candidates:

- Confirm repository or CI access to approved SeatGeek API credentials for this
  exact use case.
- Define performer-ID evidence requirements without introducing artist-level
  SeatGeek CTAs.
- Keep all SeatGeek price display out of scope.
- Reuse existing event-level SeatGeek proposal/enrichment tooling for event URLs
  instead of mixing event URL writes into this report-only pipeline.

## Suggested agent prompt

```text
Run the provider candidate report in dry-run mode for <artist-or-all>. Do not
modify artist/event/provider data. After it runs, read
.audit/provider-candidates.latest.md and summarize classifications, evidence
URLs, provider IDs, confidence, matching reasons, and blocking flags. If any row
is auto_safe_for_review, explain that it still requires human browser
verification before editing data/provider-identities.json.
```

## Required checks when changing the pipeline

```bash
node --check scripts/propose-provider-candidates.mjs
python3 scripts/validate-events.py --for-production
node scripts/smoke-prelaunch.mjs
git diff --check
```
