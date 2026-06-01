# Artist Scaling Map

A single index for "how do I add an artist", mapping the **existing** tooling to
the phased workflow. This is a navigation aid — it does not replace the
authoritative process docs:

- **`docs/SAFE_NEXT_ARTIST_WORKFLOW.md`** — the phased process (Proposal → Shell →
  Promote → Events), gate checklists, and the human-verification steps. **Read
  this first.**
- **`docs/ADDING_ARTISTS.md`** — field-level templates, required fields, and the
  example placeholder format.
- **`docs/SEATGEEK_DISCOVERY.md`** — event-level SeatGeek enrichment runbook.

> **Scope reminder:** `BACKLOG.md` parks new-artist onboarding. Do not run any
> apply/shell-PR step to actually onboard an artist unless that block is lifted
> for a specific artist. The commands below are documented so the path is
> repeatable when it is.

---

## Canonical happy path (command order)

```
[ PROPOSAL ] → gate 1 (human) → [ SHELL ] → gate 2 (human) → [ PROMOTE ] → gate 3 (human) → [ EVENTS ]
                                                                                                  ↓
                                                                                       [ SEATGEEK ENRICH ]
```

| Phase | Command / action | Automated? | Writes |
|---|---|---|---|
| **Proposal** | Dispatch **`Ticketmaster Discovery Proposal`** Action (`tm-discovery-proposal.yml`) → downloads artifact `tm-discovery-proposal` (`candidates.json`, `skip-log.json`, `proposal-<date>.md`) | Automated (CI) | Nothing in the repo — CI artifact only |
| **Gate 1** | Human reviews the proposal: slug uniqueness, real touring source, TM artist URL opened in a browser, affiliate membership, no `BACKLOG.md` parking note | **Manual** | — |
| **Shell** | `npm run artists:tm-shell-pr` (`tm-discovery-shell-pr.mjs`) — or the **`Ticketmaster Discovery Shell PR (Phase 2)`** Action, which consumes the Phase 1 artifact | Automated end-to-end | `artists.json` (`review_required`), `catalog.json` ticket_link (`verified:false, public_enabled:false`), `signup.js` `ARTIST_SLUGS`, regenerated `index.html`; runs `events:sync` + `artist:check` + `test:mvp` + `git diff --check`, then branches, commits, pushes, opens a labelled PR |
| **Gate 2** | Human confirms the shell page renders a watchlist empty state (no broken CTA), no regressions, TM URL re-confirmed live | **Manual** | — |
| **Promote** | **Manual edit** of the two protected files after browser confirmation (see snippet below), plus promoting `artists.json` / `catalog.json` fields | **Manual by design** (protected affiliate files — never automated) | `functions/api/out.js` (`VERIFIED_TICKET_LINKS`), `functions/api/shows.js` (`TICKETMASTER_ARTIST_AFFILIATE_LINKS`), `artists.json`, `catalog.json`, `index.html` |
| **Gate 3** | Human confirms `GET /api/out?artistSlug=<slug>&provider=ticketmaster` returns 302 and the CTA href is `/api/out?...` | **Manual** | — |
| **Events** (optional, separate PR) | `npm run artists:apply-preview -- --candidate <dir>` (preview), then `--write` to merge events; or the CSV pipeline (`npm run events:update`) | Semi-automated | `events.json`, `events/<slug>.json`, `index.html` |
| **SeatGeek enrich** (optional, separate PR) | `npm run seatgeek:propose` → review → `npm run seatgeek:enrich:apply` → `npm run events:sync` + validators | Semi-automated (high-confidence auto-apply only) | `events.json`, partitions, `docs/SEATGEEK_CTA_AUTO_ADD_LOG.md` |

The **Shell** step is the closest thing to a single wrapper command — it performs
the entire Phase 2 file matrix, validation, and PR creation in one run (capped at
**one shell per run**, score ≥ threshold, fails closed on parked/taken slugs).

---

## Promote phase: the manual snippet

`functions/api/out.js` and `functions/api/shows.js` are **protected** and are
**never** edited by automation. After a human has opened the exact Ticketmaster
artist URL in a browser on the day of the PR and confirmed it resolves, add:

```js
// functions/api/out.js — VERIFIED_TICKET_LINKS
"<slug>:ticketmaster": {
  provider: "ticketmaster",
  destination: "https://www.ticketmaster.com/<artist>-tickets/artist/<ID>",
  market: "global",
}
```

```js
// functions/api/shows.js — TICKETMASTER_ARTIST_AFFILIATE_LINKS (same URL)
"<slug>": "https://www.ticketmaster.com/<artist>-tickets/artist/<ID>",
```

Then promote `artists.json` to `indexable_with_substantial_content` /
`verified_providers: ["ticketmaster"]` and flip the `catalog.json` ticket_link to
`verified:true, public_enabled:true`. The indexing promotion and the `out.js`
entry must land in the **same PR**. See `docs/SAFE_NEXT_ARTIST_WORKFLOW.md`
§ "Phase 3 — Promote" for the full file matrix and gate.

---

## Which discovery command when?

Three TM-discovery stacks exist. They produce similar candidate lists but write
to different places and serve different purposes. **Only the first feeds the
automated shell PR.**

| Stack | Command / Action | Output | Role |
|---|---|---|---|
| **Canonical (CI)** | `Ticketmaster Discovery Proposal` Action → `tm-discovery-proposal.mjs` | CI artifact `tm-discovery-proposal` | **The one the `artists:tm-shell-pr` step consumes.** Use this to drive a shell PR. |
| Exploratory (CI) | `Candidate Audit` Action → `audit-candidates.mjs` → `score-candidates.mjs` → `report-candidates.mjs` | `.audit/` artifacts (`candidates-report.md`) | Wider scan / ranking report for human browsing. Does **not** feed the shell PR. Has an offline fixture self-test. |
| Exploratory (local) | `npm run artists:propose` → `propose-artists.mjs` | `candidates/artists-<timestamp>/` | Local dry-run from a hand-supplied name list; the matching `npm run artists:apply-preview` step applies **events only** from a reviewed batch. Does **not** create artists or feed the shell PR. |

If you just want to add an artist, use the **canonical** stack. The other two are
exploratory aids; treat their output as advisory.

---

## Validation reference

Run before committing any phase (full detail in
`docs/SAFE_NEXT_ARTIST_WORKFLOW.md` § E):

```bash
npm run artist:check -- <slug>           # per-artist cross-file readiness
npm run validate:artist-providers        # artists.json ↔ VERIFIED_TICKET_LINKS drift
node scripts/smoke-prelaunch.mjs          # route / CTA / copy smoke
npm run events:validate:prod             # only if events.json touched
node scripts/validate-partitions.mjs      # only if events.json touched
npm run events:sync                      # required whenever public/data/*.json changes
npm run test:mvp                         # combined suite
git diff --check                         # whitespace / conflict markers
```

---

## Known gap (follow-up, separately scoped)

The three discovery stacks overlap. This doc clarifies which is canonical; a
later, separately scoped pass (issue #176 audit territory) could deduplicate or
retire the exploratory stacks once a human confirms which to keep. Do not delete
any of them as part of an unrelated task.

## Related documents

- `docs/SAFE_NEXT_ARTIST_WORKFLOW.md` — phased process and gates
- `docs/ADDING_ARTISTS.md` — field templates and required fields
- `docs/SEATGEEK_DISCOVERY.md` — event-level SeatGeek enrichment runbook
- `docs/TM_DISCOVERY_AUTOMATION.md` — Phase 1 proposal automation detail
- `CLAUDE.md` § "Protected Areas" — files that must not change without explicit scope
- `BACKLOG.md` — active priorities and parking notes
