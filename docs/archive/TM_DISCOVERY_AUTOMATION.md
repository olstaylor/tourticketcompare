# Ticketmaster Discovery Proposal Automation (Phase 1)

> **ARCHIVED — historical reference only.** Not a source of current priorities or current state. See `CLAUDE.md` → `PROJECT_STATUS.md` → `BACKLOG.md`. (Banner added 2026-07-07.)

This Phase 1 workflow is intentionally limited to proposal artifacts only.

## Manual trigger

Run GitHub Action `.github/workflows/tm-discovery-proposal.yml` via **Actions → Ticketmaster Discovery Proposal → Run workflow**.

Requirements:
- Repository secret `TICKETMASTER_API_KEY` must be present.
- Workflow runs only via `workflow_dispatch`.

## What it does

Script: `scripts/tm-discovery-proposal.mjs`

- Calls Ticketmaster Discovery API for upcoming music events in bounded pages.
- Excludes cancelled events.
- Logs each API call.
- Fails closed if API key is missing, API request fails, or API response shape is unexpected.
- Groups events by Ticketmaster attraction id.
- Excludes artists already in `public/data/artists.json`.
- Excludes slug collisions with `public/data/catalog.json`.
- Excludes artist names parked/blocked in `BACKLOG.md`.
- Requires at least two upcoming events and at least 70% clean venue/city/country coverage.
- Scores candidates by event count, geography spread, and data completeness only.

## Artifacts

Uploaded artifact bundle `tm-discovery-proposal` contains:

- `api-calls.json`
- `discovered-events.json`
- `candidates.json`
- `skip-log.json`
- `proposal-YYYY-MM-DD.md`

## Explicit non-goals (Phase 1)

- No PR creation.
- No edits to `public/data/artists.json`, `public/data/catalog.json`, `public/data/events.json`.
- No edits to `functions/api/signup.js`, `functions/api/out.js`, `functions/api/shows.js`.
- No indexability or CTA changes.
- No auto-merge, publish, or promotion.
