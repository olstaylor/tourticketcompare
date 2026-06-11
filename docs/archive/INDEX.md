# Archived Documentation Index

**IMPORTANT:** Files in this directory are historical, reference, or parked — not authoritative. Do not act on archived audit findings or recommendations without re-verification against current `BACKLOG.md` and `PROJECT_STATUS.md`.

---

## Why Files Are Archived

### Audits (Analysis Only — No Decisions Made)

These captured findings at a point in time. Conclusions may be stale; re-verify before acting.

- **CLEANUP_AUDIT.md** (2026-05-14) — Cleanup candidates (e.g., .DS_Store in git, stale docs). Use as reference if cleanup work is later scoped.
- **AUDIT_PARKING_LOT.md** (2026-05-11) — Full production readiness audit. Findings may overlap with current BACKLOG.md; cross-check before implementing.
- **SEO_ARCHITECTURE_AUDIT.md** (2026-05-11) — Guide clusters and internal linking recommendations. Reference if SEO work is scoped later.

### Parked Features (Scaffolding Only — Not Implemented)

Groundwork laid but no implementation; explicitly parked in BACKLOG.md.

- **PROVIDER_ABSTRACTION_IMPLEMENTATION.md** (2026-05-11) — Provider abstraction framework sketched; never used. Do not build on this without a real provider integration scoped first.
- **PROVIDER_ABSTRACTION_ARCHITECTURE.md** (2026-05-11) — Companion design document. See `BACKLOG.md § Explicitly parked`.

### One-Off Reference Docs (Context Only)

Created during feature development; useful for understanding past decisions but not current workflow.

- **ARTIST_PAGE_QUICK_START.md** — Quick reference for artist page system (superseded by `docs/ADDING_ARTISTS.md` and `docs/SAFE_NEXT_ARTIST_WORKFLOW.md`)
- **ARTIST_PAGE_TEMPLATE_SYSTEM.md** — Master blueprint for artist page templates (historical; current pages use inline rendering)
- **ARTIST_PAGE_COMPONENTS.md** — Component library (reference only; not actively maintained)
- **BEYONCE_REFERENCE_IMPLEMENTATION.md** — Walkthrough of Beyoncé page as example (context for understanding page architecture)

### Point-in-Time Verifications (Outdated)

Snapshots from specific dates; do not assume accuracy without re-verification.

- **LIVE_PRODUCTION_VERIFICATION.md** (2026-05-12) — Browser and API verification snapshot. Current status in `PROJECT_STATUS.md`.
- **IMPACT_PUBLISHER_TAG_TEST.md** — Feature validation log; now live and confirmed in `PROJECT_STATUS.md`.
- **REPO_BRIEFING.md** (generated 2026-06-08, archived 2026-06-11) — Read-only repo survey. Stale on artist/event counts and `tour_name` state; superseded by `PROJECT_STATUS.md`.

### Case Studies (Specific Issues — Now Closed)

Detailed walkthroughs of single issues; useful for context but not general guidance.

- **OLIVIA_RODRIGO_LINK_REVIEW.md** — URL verification workflow for Olivia Rodrigo (issue #171 closed in PR #190). Reference if similar case arises.
- **TOUR_NAME_AUDIT.md** (2026-06-03, archived 2026-06-11; replaced an earlier 2026-05-27 copy retained in git history) — One-off audit of tour name blanks (issue #172). The original blanks (olivia-rodrigo, bruno-mars) are populated; current `tour_name` state lives in `PROJECT_STATUS.md`.

### Implementation Logs (Historical Record)

Record of past implementation work; not instructions for new work.

- **SEATGEEK_CTA_AUTO_ADD_LOG.md** (2026-05-13 run) — Early log from the SeatGeek enrichment tooling. The **live, regenerated log is `docs/SEATGEEK_CTA_AUTO_ADD_LOG.md`** (written by `scripts/enrich-seatgeek-events.mjs`); this copy is a historical snapshot only.
- **ISSUE_DRAFTS.md** — Copy/paste-ready GitHub issue templates (reference only)

### Historical Context (Early Product States)

Document abandoned product directions or early architecture.

- **history.md** — Early ticket-link MVP and CRO phases; superseded by current content/SEO focus

### Analysis Reports (One-Off Diagnostics)

Exploratory analysis; archived to avoid cluttering active docs.

- **reports/seatgeek-*.md** — Provider integration diagnostics (reference if provider work is scoped)

---

## When to Reference Archive

| Question | Answer | File |
|----------|--------|------|
| "Should we clean up .DS_Store?" | Maybe; see reference | CLEANUP_AUDIT.md |
| "Why weren't we using provider abstraction?" | Scaffolding only; not implemented | PROVIDER_ABSTRACTION_*.md |
| "How were artist pages built?" | Old system; see current workflow instead | ARTIST_PAGE_*.md |
| "Was Olivia Rodrigo issue resolved?" | Yes (PR #190); see PROJECT_STATUS.md | OLIVIA_RODRIGO_LINK_REVIEW.md |
| "Can we add SeatGeek CTAs now?" | Event-level SeatGeek CTAs are **live in production** (artist-level remains parked) — see PROJECT_STATUS.md and `docs/SEATGEEK_DISCOVERY.md` | SEATGEEK_CTA_AUTO_ADD_LOG.md (historical) |

---

## Rule

**Before acting on any archived finding:**

1. Check `BACKLOG.md` to confirm it's an active priority
2. Check `PROJECT_STATUS.md` to verify the current state
3. Re-verify the finding in the codebase (do not assume archived doc is accurate)
4. Ask if needed before proceeding

**Archived docs are reference-only; the source of truth is always `BACKLOG.md` and `PROJECT_STATUS.md`.**
