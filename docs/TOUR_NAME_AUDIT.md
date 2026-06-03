# `tour_name` Audit (Issue #172)

_Audit date: 2026-06-03. Source: `python3 scripts/validate-events.py --for-production` against
`public/data/events.json` (272 events)._

## Validator status (sub-deliverable A — DONE)

`scripts/validate-events.py` already enforces the `tour_name` contract (PR #186); **no further
validator work is required**:

- **Hard error** when the `tour_name` key is missing from an event.
- **Warning** when `tour_name` is blank (`""`) for an **indexed** artist.
- **Hard fail** on blank `tour_name` for indexed artists only under `--strict-tour-name`.

## Blank-`tour_name` findings (across all 10 records)

The validator reports **142 events with blank `tour_name` across 2 indexed artists**:

| Artist | Indexing status | Blank `tour_name` events | Notes |
|--------|-----------------|--------------------------|-------|
| olivia-rodrigo | indexable | **86** | The original #172 case. 8 of these also carry `verification_status: needs_recheck`. |
| bruno-mars | indexable | **56** | **Not previously flagged in #172** — same blank-`tour_name` condition; surfaced by this audit. Four Mexico City events are separately excluded (host allowlist). |
| (other 7 indexed artists) | indexable | 0 | `tour_name` populated. |
| ed-sheeran | review_required (shell) | 0 events | No events; out of scope. |

## Decision (per safe model — confirm with human before any data edit)

- **Do NOT bulk-fill `tour_name` from URL slugs.** Slugs (e.g.
  `olivia-rodrigo-the-unraveled-tour-…`) are evidence, not proof.
- Populate a `tour_name` only after a human confirms the official tour title from the Ticketmaster
  event page (or another trusted source). Otherwise leave it blank or set
  `verification_status: "needs_recheck"`.
- Scope expands beyond Olivia Rodrigo: **Bruno Mars (56 events) needs the same human verification
  pass.** No frontend change is required — the render path already falls back gracefully and the
  validator surfaces the gap.

## Validation

```bash
python3 scripts/validate-events.py --for-production   # warns on the 142 blank events; passes
```
