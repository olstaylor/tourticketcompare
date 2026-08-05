# Documentation maintenance

TourTicketCompare keeps a small, explicit documentation set. The repository and runtime code are authoritative; documentation must be corrected in the same pull request whenever behaviour changes.

## Canonical reading order

| File | Owns | Update when |
|---|---|---|
| `CLAUDE.md` | Concise, stable contributor rules, protected areas, and working style — non-negotiable rules and key commands only | A durable rule or protected area changes |
| `docs/ARCHITECTURE.md` | Repository structure, request routing, and durable contracts | Structure, routing, or a durable contract changes |
| `docs/OPERATIONS.md` | Workflow schedules, secrets/bindings reference, known infrastructure incidents | A workflow schedule, credential, or infrastructure incident changes |
| `PROJECT_STATUS.md` | Current data counts and per-artist status — largely machine-generated | Data or provider activation changes (mostly self-heals via the writer scripts) |
| `BACKLOG.md` | Genuinely outstanding priorities and explicit parking decisions | Work opens, closes, changes priority, or is deliberately parked |

If these files disagree with the repository, the repository wins. Recount and correct the documentation; do not copy a stale number forward.

## Stable reference documents

- Root: `README.md`, `CONTRIBUTING.md`, `SAFE_PUBLISHING_RULES.md`, `AGENTS.md`.
- `docs/`: `ARCHITECTURE.md`, `OPERATIONS.md`, `DEPLOYMENT.md`, `CONTENT_RULES.md`, `PROVIDER_DATA_POLICY.md`, `ROUTE_INDEXABILITY_POLICY.md`, `ADDING_PROVIDERS.md`, `PROVIDER_SYNC.md`, `SEATGEEK_DISCOVERY.md`, `COMMERCIAL_FUNNEL.md`, and `BLOG.md`.
- `.claude/skills/artist-onboarding/SKILL.md` owns the gated artist-onboarding workflow (Proposal → Shell → Promote → Events).
- `migrations/README.md` owns the applied D1 migration ledger.

`docs/OPERATIONS.md` owns the live workflow schedule, the secrets/bindings reference, and known infrastructure incidents — content that used to live in `CLAUDE.md` and `PROJECT_STATUS.md`. `docs/ARCHITECTURE.md` owns durable structure and contracts (routing, bindings mechanics, aggregation layers) that used to be partly duplicated in `CLAUDE.md`.

Stable reference docs should describe contracts and procedures, not volatile counts, workflow run numbers, or point-in-time rollout claims. Link to `PROJECT_STATUS.md` for current values.

## Generated operational reports

Provider sync audit output is generated under `reports/provider-sync/`. The scripts and workflows own those files; do not hand-edit them. They are evidence from the latest run, not documentation or current-state authority.

## Frozen status narratives

`reports/status-history/` holds dated, hand-written, append-only narratives moved out of `PROJECT_STATUS.md` once their work concluded — completed audit reconciliations, resolved risks, closed investigations. Rules:

- A narrative moves there only after its live residue (open owner items, ongoing risks) has been distilled into `PROJECT_STATUS.md` or `BACKLOG.md`.
- Files are frozen at write time: they are evidence of what was true and decided on that date, never current-state authority. Do not update them to reflect later state; a new review gets a new dated file.
- This is the only sanctioned hand-written location under `reports/`; everything else there stays script-generated.

`npm run docs:check` deliberately does not scan `reports/`, so frozen text cannot rot into validation failures; links **to** these files from canonical documents are still existence-checked.

Three more files are generated and must never be hand-edited: `public/index.html`'s inline data fallback (`npm run events:sync` after any `public/data/*.json` change), `public/data/blog-content.json` (`npm run blog:build` after any `content/blog/*.md` change), and `data/content-provenance.json` (`npm run content:provenance` after editing guide or trust-page copy). Each has a `--check` counterpart wired into `test:mvp`, so a stale commit fails CI rather than shipping.

## Lifecycle policy

- Update an existing canonical or topic document instead of adding a parallel briefing, handover, audit, or status file.
- Delete superseded or one-off documentation once its durable facts have been merged into the correct current document.
- Use git history, pull requests, and closed issues for historical context. Do not create or restore `docs/archive/`. The single narrow exception is `reports/status-history/` (see "Frozen status narratives" above) for concluded review narratives that are worth keeping greppable in the working tree.
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

`npm run test:mvp` includes this check so documentation drift blocks CI. It also runs `npm run status:validate` (`scripts/validate-status-counts.mjs`), which recounts the deterministic `PROJECT_STATUS.md` figures from source. That check is **warning-only** today — it reports drift without failing CI, because the auto-merging sync lanes must not be blocked — and those lanes self-heal the counts via `--write` in the same commit. Flip it to `--strict` in `test:mvp` once the self-heal path is proven to keep it green.

## Current-state refresh checklist

When updating `PROJECT_STATUS.md`:

1. Run the two writers, then review what they changed rather than recounting by hand. `npm run status:validate:write` (`scripts/validate-status-counts.mjs`) rewrites the deterministic "Current data" figures and the whole per-artist table, `last_verified_at` included, from `public/data/*.json`, `data/provider-identities.json` and `functions/api/out.js`. `npm run status:surface:write` (`scripts/audit-indexable-surface.mjs --write-status`) rewrites the two `<!-- generated:… -->` blocks — the route surface and the empty-board list — from a real render of every route, because only that knows a page's robots meta; never hand-edit inside those markers. Both run daily in `daily-audit.yml`, so the file is normally already current. Project the decay with `npm run roster:forecast`. Anything sourced from `/api/health` or D1 still needs a human.
2. Confirm workflow schedules from `.github/workflows/`, not from older prose.
3. Confirm runtime configuration through `/api/health` or the relevant fail-closed endpoint without exposing secret values.
4. Move completed work to the short completed section in `BACKLOG.md`; keep implementation history in git.
5. When a risk resolves or a dated review concludes, distill its live residue into `PROJECT_STATUS.md` (data/counts), `docs/OPERATIONS.md` (infrastructure incidents), or `BACKLOG.md` (task tracking) as appropriate, then move the narrative to `reports/status-history/` or delete it to git history — `PROJECT_STATUS.md` stays current-state-and-counts only.
6. Run `npm run docs:check` and the relevant repository validation.
