# Documentation Maintenance & Canonical Files

Created 2026-06-11 (repo documentation cleanup). This doc explains which files are canonical, which are reference, which are generated, and how to archive a doc. It exists because the status docs drifted badly once (2026-06-03 → 2026-06-11: 5 new artists and 57 new events landed while `PROJECT_STATUS.md` still described the old state).

---

## Canonical files (source of truth — read in this order)

| File | Role | Update when |
|---|---|---|
| `CLAUDE.md` | Contributor/AI brief: protected areas, hard rules, working style | Protected areas, rules, or repo structure change |
| `PROJECT_STATUS.md` | Current-state snapshot: data counts, per-artist table, bindings, active risks | Any data PR merges (artists, events, guides), bindings change, risks open/close. **Recount from `public/data/*.json` and `functions/api/out.js`; do not trust prior text.** |
| `BACKLOG.md` | Prioritised active work and the parked list | Work items open/close or change priority. Owner-managed — agents may correct facts (dated, flagged) but not reorder or re-scope priorities. |

If these three disagree with the repo, the repo wins — fix the doc.

## Reference tier (authoritative for their topic, stable)

- Root: `SAFE_PUBLISHING_RULES.md` (non-negotiable rules), `CONTRIBUTING.md` (setup/validation/PR checklist), `README.md` (public intro + quick start).
- `docs/`: `ARCHITECTURE.md`, `DEPLOYMENT.md`, `CONTENT_RULES.md`, `PROVIDER_DATA_POLICY.md`, `ADDING_ARTISTS.md`, `SAFE_NEXT_ARTIST_WORKFLOW.md`, `ADDING_PROVIDERS.md`, `SEATGEEK_DISCOVERY.md`, `PROVIDER_SYNC.md`.

(Consolidated 2026-07-07: `PROJECT_BRIEF.md`, `AI_AGENT_WORKFLOW.md`, and `VALIDATION_CHECKLIST.md` were merged into `CLAUDE.md`/`README.md`/`CONTRIBUTING.md`; `ARTIST_SCALING_MAP.md` into `SAFE_NEXT_ARTIST_WORKFLOW.md`; `STALE_FILE_AUDIT.md`, `TM_DISCOVERY_AUTOMATION.md`, and `provider-candidate-pipeline.md` moved to `docs/archive/`; `GROWTH_PIPELINE.md` deleted with its tooling.)

## Generated / machine-read files — do not hand-edit or move

| File | Written/read by | Note |
|---|---|---|
| `docs/SEATGEEK_CTA_AUTO_ADD_LOG.md` | Written by `scripts/enrich-seatgeek-events.mjs` (`LOG_PATH` is hardcoded) | Regenerated on every enrichment run. Never archive or relocate the live copy; a historical snapshot sits in `docs/archive/`. |
| `docs/SEATGEEK_CTA_VERIFY_LOG.md` | Written by `scripts/verify-seatgeek-events.mjs` | Regenerated on every verification run (nightly `seatgeek-cta-sync.yml`). |
| `docs/VIVIDSEATS_CTA_SYNC_LOG.md` | Written by `scripts/sync-vividseats-events.mjs` | Regenerated on every Vivid Seats CTA sync run (nightly `vividseats-cta-sync.yml`). |
| `public/index.html` (inlined data block) | Written by `scripts/sync-events-data.py` (`npm run events:sync`) | Not a doc, listed here because it looks hand-editable and is not. |

## Pointer stubs (keep at root, do not expand)

- `HANDOVER.md`, `AGENTS.md` — superseded; each is a short ARCHIVED notice pointing at the canonical reading order. `AGENTS.md` stays because it is a standard agent entrypoint filename.

## Archive policy (`docs/archive/`)

Archive a doc when it is a point-in-time audit/log/case study that no longer describes current state but has historical value. Never archive generated files (above) or anything referenced by scripts, workflows, or runtime code — grep first.

1. `git mv <doc> docs/archive/` (git history preserves the original path).
2. Prepend the standard banner directly under the title:
   > **ARCHIVED — historical reference only.** Not a source of current priorities or current state. See `CLAUDE.md` → `PROJECT_STATUS.md` → `BACKLOG.md`. (Banner added YYYY-MM-DD.)
3. Add an entry to `docs/archive/INDEX.md` (date, one-line reason, where the current truth lives).
4. Fix any links that pointed at the old path (`grep -rn "<filename>" --include="*.md" .`).

Delete (rather than archive) only obvious junk with no runtime, validation, workflow, or historical value. When unsure, keep the file and flag it for human review in the PR description. Code artefacts are out of scope for this doc — stale code needs its own evidence-backed audit and owner approval (precedent: `docs/archive/STALE_FILE_AUDIT.md` / issue #176, completed by the 2026-07-07 cleanup).

## Drift checks

When updating `PROJECT_STATUS.md`, verify counts directly, e.g.:

```bash
python3 - <<'EOF'
import json
arts = json.load(open('public/data/artists.json'))   # top-level JSON array
evs = json.load(open('public/data/events.json'))     # top-level JSON array
print(len(arts), 'artists;', len(evs), 'events;',
      sum(1 for e in evs if e.get('seatgeek_url')), 'with seatgeek_url;',
      sum(1 for e in evs if not (e.get('tour_name') or '').strip()), 'blank tour_name;',
      sum(1 for e in evs if e.get('verification_status') == 'needs_recheck'), 'needs_recheck')
for p in ('seatgeek', 'vivid-seats', 'ticketnetwork', 'ticket-liquidator', 'stubhub-international'):
    n = sum(1 for e in evs if ((e.get('provider_links') or {}).get(p) or {}).get('verified'))
    print(p, 'verified provenance:', n)
EOF
grep -c '"[a-z0-9-]*:ticketmaster"' functions/api/out.js   # VERIFIED_TICKET_LINKS entries
```

And confirm every relative `.md` link in the canonical/reference docs resolves to an existing file.
