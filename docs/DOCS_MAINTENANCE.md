# Documentation maintenance

TourTicketCompare keeps a small, explicit documentation set. The repository and runtime code are authoritative; documentation must be corrected in the same pull request whenever behaviour changes.

## Canonical reading order

| File | Owns | Update when |
|---|---|---|
| `CLAUDE.md` | Stable contributor rules, protected areas, architecture summary, automation map | A durable rule, protected area, binding, workflow, or repository structure changes |
| `PROJECT_STATUS.md` | Current production/data state, counts, rollout status, active risks | Data, configuration, provider activation, or operational risk changes |
| `BACKLOG.md` | Priorities and explicit parking decisions | Work opens, closes, changes priority, or is deliberately parked |

If these files disagree with the repository, the repository wins. Recount and correct the documentation; do not copy a stale number forward.

## Stable reference documents

- Root: `README.md`, `CONTRIBUTING.md`, `SAFE_PUBLISHING_RULES.md`, `AGENTS.md`.
- `docs/`: `ARCHITECTURE.md`, `DEPLOYMENT.md`, `CONTENT_RULES.md`, `PROVIDER_DATA_POLICY.md`, `ADDING_ARTISTS.md`, `SAFE_NEXT_ARTIST_WORKFLOW.md`, `ADDING_PROVIDERS.md`, `PROVIDER_SYNC.md`, and `SEATGEEK_DISCOVERY.md`.
- `migrations/README.md` owns the applied D1 migration ledger.

Stable reference docs should describe contracts and procedures, not volatile counts, workflow run numbers, or point-in-time rollout claims. Link to `PROJECT_STATUS.md` for current values.

## Generated operational reports

Provider sync audit output is generated under `reports/provider-sync/`. The scripts and workflows own those files; do not hand-edit them. They are evidence from the latest run, not documentation or current-state authority.

`public/index.html` also contains a generated inline data fallback. Regenerate it with `npm run events:sync` after any `public/data/*.json` change.

## Lifecycle policy

- Update an existing canonical or topic document instead of adding a parallel briefing, handover, audit, or status file.
- Delete superseded or one-off documentation once its durable facts have been merged into the correct current document.
- Use git history, pull requests, and closed issues for historical context. Do not create or restore `docs/archive/`.
- Keep `AGENTS.md` as the short repository-discovery entrypoint. Do not add `HANDOVER.md`; the canonical reading order replaces it.
- Before deleting or moving a file, search scripts, workflows, runtime code, and Markdown links for references.

## Automated checks

Run:

```bash
npm run docs:check
```

The check fails when:

- a relative Markdown link is broken;
- a documented `npm run` command is missing from `package.json`;
- a required canonical document is missing; or
- retired `HANDOVER.md` / `docs/archive/` paths are reintroduced.

`npm run test:mvp` includes this check so documentation drift blocks CI.

## Current-state refresh checklist

When updating `PROJECT_STATUS.md`:

1. Recount directly from `public/data/*.json`, `data/provider-identities.json`, and `functions/api/out.js`.
2. Confirm workflow schedules from `.github/workflows/`, not from older prose.
3. Confirm runtime configuration through `/api/health` or the relevant fail-closed endpoint without exposing secret values.
4. Move completed work to the short completed section in `BACKLOG.md`; keep implementation history in git.
5. Run `npm run docs:check` and the relevant repository validation.
