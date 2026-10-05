# Documentation maintenance

Keep the doc set small. Code is authoritative: when behaviour changes, fix the doc in the same PR.

## Who owns what

| File | Owns |
|---|---|
| `CLAUDE.md` | Stable rules, protected areas, test commands. The only required read; it links to everything else. |
| `docs/ARCHITECTURE.md` | Structure, routing, durable contracts |
| `docs/OPERATIONS.md` | Workflow schedules, secrets/bindings, open incidents (resolved ones as one line) |
| `PROJECT_STATUS.md` | Current counts and per-artist status, mostly machine-written |
| `BACKLOG.md` | Open priorities and parking decisions, owner-managed |
| Topic docs in `docs/`, `.claude/skills/artist-onboarding/SKILL.md`, `migrations/README.md` | Their own topic |

Stable docs describe contracts and procedures, not volatile counts or run numbers; link to `PROJECT_STATUS.md` for those.

## Rules

- Update the owning file; never add a parallel handover, status, audit or narrative document. `AGENTS.md` stays a short pointer to `CLAUDE.md`.
- When something finishes, delete its narrative. Git history, PRs and issues keep the record. Do not create `docs/archive/` or `HANDOVER.md`.
- Write plainly and briefly: say what is true and what to do. No changelogs inside docs, no "fact corrected by agent" trails, no restating another doc.
- Before deleting or moving a file, search scripts, workflows, runtime code and Markdown links for references.

## Generated files

Never hand-edit these; regenerate them.

| Artifact | Regenerate with | Guard |
|---|---|---|
| `public/data/blog-content.json` | `npm run blog:build` | `blog:check` in `test:mvp` |
| `public/data/guides-content.json`, `functions/_guide-routes.generated.js` | `npm run guides:build` | `guides:check` in `test:mvp` |
| `data/content-provenance.json` | `npm run content:provenance` | `content:provenance:check` in `test:mvp` |
| `public/og/*.png`, `functions/_og-cards.generated.js` | `npm run og:build` | `og:check` in `test:mvp` (only fails on a missing committed card); `og:coverage:check` in the generated-freshness sensor |
| `reports/provider-sync/*` | the provider sync workflows | not scanned by `docs:check` |

- `reports/indexable-surface/baseline.json` is committed on purpose: it is the anchor `--check` compares against. Other audit output under `reports/` is gitignored.
- `data/event-indexing-pilot.json` is hand-frozen experiment metadata. It is never regenerated, and `test:event-indexability` pins it.
- `public/index.html` (the static fallback) has no staleness check, so regenerate it in the same change as any `public/data/*.json` edit.

## Checks

`npm run docs:check` runs in `test:mvp`. It fails on:
- a broken relative link;
- an `npm run` command missing from `package.json`;
- a missing required doc;
- a reintroduced `HANDOVER.md` or `docs/archive/`.

`npm run status:validate` recounts the `PROJECT_STATUS.md` figures. It only warns, so that the auto-merging sync lanes are never blocked; those lanes self-heal the counts with `--write`.

## Refreshing PROJECT_STATUS.md

1. Run `npm run status:validate:write` (counts and the per-artist table) and `npm run status:surface:write` (the `<!-- generated:… -->` blocks). Both run daily in `daily-audit.yml`. Never hand-edit inside the generated markers, and don't reword the phrases `SCALAR_ASSERTIONS` in `scripts/validate-status-counts.mjs` matches.
2. Take workflow schedules from `.github/workflows/` and runtime config from `/api/health`, never from older prose.
3. Run `npm run docs:check`.
