# Provider sync reports

This directory contains the latest machine-generated audit output from provider event-link workflows.

| File | Writer |
|---|---|
| `seatgeek-cta-auto-add.md` | `scripts/enrich-seatgeek-events.mjs` |
| `seatgeek-cta-verify.md` | `scripts/verify-seatgeek-events.mjs` |
| `vividseats-cta-sync.md` | `scripts/sync-vividseats-events.mjs` |
| `ticketnetwork-event-sync.md`, `ticket-liquidator-event-sync.md`, `stubhub-international-event-sync.md` | `scripts/sync-impact-marketplace-events.mjs` |

These reports are operational evidence, not documentation and not a source of current counts or product policy. Do not hand-edit them. The corresponding workflow regenerates and commits the relevant report when event data changes. Current state belongs in `PROJECT_STATUS.md`; historical runs remain available in git history and workflow logs.
