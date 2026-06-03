# Stale-File Audit (Issue #176)

_Audit date: 2026-06-03. **Audit only — no files deleted in this pass.**_

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
| 2 | `api/` (9 files: `out.mjs`, `shows.mjs`, `health.mjs`, `click.mjs`, `_lib/*`, `impact/*`) | Vercel-style Node handlers superseded by `functions/api/`. No script/workflow/test imports the **root** `api/` (all `api/out`/`api/shows` grep hits point to `functions/api/`). Coupled to `vercel.json` (#1). | No | **Safe to delete** (delete together with `vercel.json`; confirm dashboard first) |
| 3 | `scripts/build-standalone-worker.mjs` (~37 KB) | Standalone Worker bundler. Worker runtime "Superseded 2026-05-11" per `docs/ARCHITECTURE.md`. **Not referenced** by any npm script or workflow; the only mention is a stale comment in the protected `functions/_route-metadata.js` (line 2). | No | **Safe to delete** — but the same follow-up PR must also remove the `_route-metadata.js:2` comment (protected file → scope explicitly) |
| 4 | `archive/vercel-experimental/` | Contains only `README.md` (an archive marker documenting the abandoned Vercel experiment). | No | **Keep / archive** — already quarantined; harmless historical record. Optional low-priority removal. |
| 5 | Route shims `functions/{artists,guides,how-it-works,affiliate-disclosure,editorial-policy,contact}.js` | Each is a one-line `export { onRequest } from "./[[path]].js";`. Inactive while `_middleware.js` is present, but documented as the **fallback handler if middleware is ever removed** (`docs/ARCHITECTURE.md`, `CLAUDE.md`). | Yes, if `_middleware.js` is later removed | **Keep (documented fallback)** — deletion gains little and removes a safety net. The "editing a shim has no effect" trap is already documented in `CLAUDE.md`. |

## Recommendation

- A single scoped follow-up PR may delete candidates **#1, #2, #3** together (Vercel pair +
  standalone Worker builder + its `_route-metadata.js` comment), after a human confirms no
  Cloudflare/Vercel dashboard dependency.
- Leave **#4** as-is and **#5** in place.
- Re-run `node scripts/smoke-prelaunch.mjs`, `npm run test:mvp`, and a `npm run dev` smoke after
  any deletion PR.

## Acceptance criteria (this issue)

- [x] Every candidate classified with evidence.
- [x] No production code deleted in this pass.
- [x] `docs/ARCHITECTURE.md` carries the one-line "Cloudflare Pages only" canonical note.
