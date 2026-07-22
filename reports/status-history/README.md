# Status history

Dated, hand-written, append-only narratives moved out of `PROJECT_STATUS.md` once their work concluded: completed audit reconciliations, resolved risks, and closed investigations.

Rules:

- Each file is frozen at write time — evidence of what was true and decided on that date, never current-state authority. Do not update a file here to reflect later state; write a new dated file if a new review concludes.
- A narrative moves here only after its live residue (open owner items, ongoing risks) has been distilled into `PROJECT_STATUS.md` or `BACKLOG.md`.
- Current state lives only in `PROJECT_STATUS.md`. See `docs/DOCS_MAINTENANCE.md` for the documentation ownership map.

Files in `reports/` are excluded from `npm run docs:check` scanning, so frozen text here cannot rot into documentation-validation failures.
