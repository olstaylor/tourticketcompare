# Stale-File Audit (Issue #176)

_Audit date: 2026-06-03. **Update 2026-06-19: candidates #1, #2, #3 deleted** (Vercel pair + standalone Worker builder + the `_route-metadata.js` comment) after owner authorisation; #4 and #5 left in place. `test:mvp` green post-deletion. The classification table below is retained as the audit record._

Evidence-backed classification of legacy / inactive artefacts called out in `CLAUDE.md`
"Known Risks". A follow-up PR may act on the **Safe to delete** items; deletions must not be
bundled with other workstreams. Production is **Cloudflare Pages + Pages Functions only** (see
`docs/ARCHITECTURE.md`).

## Method

- `git grep` / `find` across `package.json`, `.github/workflows/`, `scripts/`, `functions/`,
  `public/` for each candidate path.
- Verified whether removal would break local dev, smoke tests, or the Pages deploy.
- Cloudflare dashboard references are noted where knowable; confirm in-dashboard before any deletion.

## Candidates

| # | Candidate | Evidence | Breaks if removed? | Classification |
|---|-----------|----------|--------------------|----------------|
| 1 | `vercel.json` | Vercel deploy config; declares `api/**/*.mjs` functions + SPA rewrites. **No reference** in `package.json`, `.github/workflows/`, or any script. Production is Pages. | No (not used by Pages) | **Safe to delete** (follow-up PR; confirm no Cloudflare/Vercel dashboard dependency first) |
| 2 | `api/` (9 files: `out.mjs`, `shows.mjs`, `health.mjs`, `click.mjs`, `_lib/*`, `impact/*`) | Vercel-style Node handlers superseded by `functions/api/`. **Correction (2026-06-19):** the original audit's claim "no script imports the root `api/`" was incomplete — the orphaned dev helper `scripts/local-preview-server.mjs` imported six of these handlers. That helper had no `package.json`/workflow/canonical-doc references (`npm run dev` = `wrangler pages dev` is the real local-preview path) and was deleted in the same pass. | No (production); the one orphaned importer was removed alongside | **Deleted 2026-06-19** (with `vercel.json` + the orphaned `local-preview-server.mjs`) |
| 3 | `scripts/build-standalone-worker.mjs` (~37 KB) | Standalone Worker bundler. Worker runtime "Superseded 2026-05-11" per `docs/ARCHITECTURE.md`. **Not referenced** by any npm script or workflow; the only mention is a stale comment in the protected `functions/_route-metadata.js` (line 2). | No | **Safe to delete** — but the same follow-up PR must also remove the `_route-metadata.js:2` comment (protected file → scope explicitly) |
| 4 | `archive/vercel-experimental/` | Contains only `README.md` (an archive marker documenting the abandoned Vercel experiment). | No | **Keep / archive** — already quarantined; harmless historical record. Optional low-priority removal. |
| 5 | Route shims `functions/{artists,guides,how-it-works,affiliate-disclosure,editorial-policy,contact}.js` | Each is a one-line `export { onRequest } from "./[[path]].js";`. Inactive while `_middleware.js` is present, but documented as the **fallback handler if middleware is ever removed** (`docs/ARCHITECTURE.md`, `CLAUDE.md`). | Yes, if `_middleware.js` is later removed | **Keep (documented fallback)** — deletion gains little and removes a safety net. The "editing a shim has no effect" trap is already documented in `CLAUDE.md`. |

## Recommendation

- ✅ **Done (2026-06-19):** candidates **#1, #2, #3** deleted together (Vercel pair +
  standalone Worker builder + its `_route-metadata.js` comment), plus the orphaned
  `scripts/local-preview-server.mjs` (the one importer of the root `api/` handlers the
  original audit overlooked), after owner authorisation.
  Canonical docs (`docs/ARCHITECTURE.md`, `docs/DEPLOYMENT.md`, `CLAUDE.md`,
  `PROJECT_STATUS.md`, `BACKLOG.md`) updated to drop the "present pending audit" framing.
  `npm run test:mvp` green.
- Left **#4** (`archive/vercel-experimental/README.md`) as-is and **#5** (route shims) in place.
- If a Worker rollback is ever needed, recover `scripts/build-standalone-worker.mjs` from git
  history rather than re-adding it speculatively.

## Acceptance criteria (this issue)

- [x] Every candidate classified with evidence.
- [x] No production code deleted in this pass.
- [x] `docs/ARCHITECTURE.md` carries the one-line "Cloudflare Pages only" canonical note.
