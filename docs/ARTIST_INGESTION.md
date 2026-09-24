# Adding artists and tours, and keeping the site healthy

The runbook for growing the roster without babysitting it. A session starting
cold should be able to add an artist, find out what happened to it, undo it,
and read the health signals from this page alone. Written 2026-09-24 (launch-
readiness milestone, Phase 3). Live counts are in `PROJECT_STATUS.md`,
schedules in `docs/OPERATIONS.md`, and the binding rules in
`SAFE_PUBLISHING_RULES.md`. This page links to them rather than restating them.

## Adding an artist: one data change

Add the artist's name to `data/artist-requests.json`:

```json
{
  "requests": [
    { "name": "Fontaines D.C." },
    { "name": "Hozier", "ticketmaster_attraction_id": "K8vZ9171...", "note": "only if the name alone is ambiguous" }
  ]
}
```

Run `npm run artists:requests:check` (it is also in `test:quick` and
`test:mvp`), then merge. That is all. On the next day's runs:

| When (UTC) | Workflow | What it does with the request |
|---|---|---|
| 10:15 | `roster-candidates.yml` | Puts open requests first in the day's candidate list. Captures the SeatGeek performer and Ticketmaster attraction from their APIs by exact name, runs the D1–D5 screen, and posts the verdict (marked "owner-requested") in the `automation:roster-candidates` issue. Writes nothing. |
| 10:45 | `auto-promote.yml` | The same capture and screen, then promotes up to 5 artists a day (20 a week). Requests come first. It creates the artist record, catalog entry, registry entry and artist-level links, ingests the artist's Ticketmaster dates and SeatGeek event links, runs `test:mvp` and `test:providers`, and auto-merges one PR. Runs only while the repo variable `AUTOPROMOTE_ENABLED` is `true`. |

**The screen for a request.** Identity must match exactly on both APIs (D1).
The name must not be on `data/artist-denylist.json`, must not match the
tribute/collision pattern, and Ticketmaster must classify the act as music and
not as a tribute (D2). Both artist pages must exist: a 404/410 fails, a
401/403/429 bot block does not. The title must fit and be unique (D5). A
request **skips** the volume thresholds that forecast candidates need (eight
Ticketmaster dates at 80% headliner share, three dates in two cities). It only
needs one upcoming date on either provider. Naming the artist is the human
judgement those thresholds stand in for. Code:
`scripts/lib/artist-screen.mjs` (`requested`), `scripts/artist-requests.mjs`.

**If a request is held**, the candidates issue says why (e.g. "D1: no exact
SeatGeek performer match"). An ambiguous Ticketmaster name is fixed by adding
`ticketmaster_attraction_id`, copied from Ticketmaster, never guessed. Anything
else that fails (identity, denylist, classification) goes through the manual
path below or not at all.

**Leave entries in place.** A request whose artist is already on the site is
ignored, so the file doubles as a record of what was asked for.

### Without a request

- **Automatic discovery.** The same two jobs rank touring headliners from
  Ticketmaster (`scripts/report-roster-forecast.mjs`, "currently touring in
  markets the site already covers") and promote the ones that pass the full
  screen.
- **The manual gated path.** Use this for an act the screen cannot pass, or
  when you want a human-written profile from day one:
  `.claude/skills/artist-onboarding/SKILL.md` (Proposal → Shell → Promote →
  Events, with a browser check of both destinations before Promote).

## What generates from the artist record

Nothing below needs a hand edit once the artist is promoted:

- **Artist page** `/artists/<slug>`. Auto-promoted artists are indexable only
  with three or more upcoming dates; owner-promoted artists need at least one
  tracked date. Rules: `docs/ROUTE_INDEXABILITY_POLICY.md`.
- **Artist-city pages** `/artists/<slug>/tickets/<city>` for every city the
  artist plays, indexable at two publishable dates.
- **City and venue pages.** New dates are counted into `/cities/*` and
  `/venues/*`, which become indexable at their thresholds.
- **Listings and links.** The `/artists` and homepage listings, the by-city
  links on the artist page, and links from city and venue cards to the
  artist-city page.
- **Discovery files.** Sitemap entries (`/sitemap-index.xml` → per-type
  sitemaps), `llms.txt`, and an IndexNow ping on deploy.
- **Structured data.** `MusicEvent` nodes, with `offers` mirroring visible
  prices (exception C).
- **Social cards.** Per-page cards come from a work-queue repair PR the next
  morning (`generated-freshness.yml` → `work-queue-repair.yml`, human-merged).
  Until then the page uses the shared card.

## How new tours and dates arrive

Every promoted artist is registered `sync_enabled` in
`data/provider-identities.json`. After that:

- **New Ticketmaster dates:** `tm-new-shows-pr.yml`, daily 04:00.
- **Date, venue and name changes:** `nightly-data-sync.yml`, 03:30.
- **Resale links:** the SeatGeek, Vivid Seats and Impact marketplace syncs
  (05:00–07:00).
- **Prices:** the snapshot writers, nominally hourly.

A date not yet on public sale is published with its on-sale time and any
verified resale buttons. `tour_name` stays blank until a human confirms it.
Schedules and exact behaviour: `docs/OPERATIONS.md` → Scheduled workflows.

## Checking what happened

| Question | Where |
|---|---|
| Was my request promoted, or why was it held? | `automation:roster-candidates` issue; the day's `Auto-promote (<date>)` PR |
| What published itself in the last 24h, and how do I undo it? | `automation:autopublish-digest` issue (one revert command per merge) |
| Did its dates land? | The artist page; the `automation:tm-discovery` issue for withheld rows |
| Are its prices showing? | `automation:price-coverage` issue (zero-price-source backlog by artist and country) |

## Undoing an artist

`node scripts/demote-artist.mjs --slug <slug> --reason "<why>" --write`, then
merge. The record returns to a `review_required` shell and its links are
unpublished. `/api/out` refuses a demoted artist's redirects immediately. To
stop it being re-proposed, add it to `data/artist-denylist.json` (and remove
it from `data/artist-requests.json`). `autopublish-health.yml` demotes
auto-promoted artists by itself on a denylist match, a dead artist link or a
duplicate title.

## Pausing everything

Set the repo variable `AUTOPUBLISH_ENABLED=false` to hold every automated
merge, or `AUTOPROMOTE_ENABLED` to anything but `true` to stop promotion only.
Demotion is never paused. Detail: `docs/OPERATIONS.md` → Auto-publish kill
switch and ledger.

## Keeping it healthy

One place to look: the **`automation:site-health`** issue, written daily by
`site-health.yml` (`scripts/check-site-health.mjs`). It is open only while
something needs attention and closes itself when all is clear. Each run:

1. **Crawls every URL in the live sitemap index.** Each must answer 200 with
   no redirect, index robots meta, a self canonical, a title, an H1 and JSON-LD
   that parses, and no two may share a title. It also reports pages that
   answered 5xx under parallel load and recovered: the Cloudflare "exceeded
   resource limits" pattern a crawler sees. That becomes a finding above 2%
   of the sitemap.
2. **Checks the sitemap index and segments** agree with `/sitemap.xml`.
3. **Checks `/api/health`.**
4. **Applies the price gates.** At least 90% of mapped, on-sale dates must be
   priced, and at most 25% of displayed prices may be older than 12h.
5. **Links the open findings of the sensors that close their own issue when
   clean:**
   - `automation:daily-audit`: broken outbound links and Ticketmaster drift;
   - `automation:health`: automation lanes failing, stale or stalled;
   - `automation:prelaunch-validation`: PRs with no passing validation;
   - open `work-queue` items.

| Finding | First move |
|---|---|
| A sitemap URL answers 404 or redirects | A route gate and the sitemap disagree. Run `npm run audit:internal-links` and `npm run audit:indexable-surface` locally on `main`; both render every route with the same gates. |
| Transient 5xx above budget | Pages CPU or memory. Profile the route with `node --cpu-prof` against the middleware (the 2026-09-24 render-cost work in `docs/OPERATIONS.md` → Known incidents shows how) before raising anything. |
| Price gate fails | The `automation:price-coverage` issue names the lane; `docs/OPERATIONS.md` → Price snapshot cadence has the recovery. |
| Broken outbound link | The daily-audit issue lists the URL and event; provider syncs self-heal confirmed-gone links, and anything else is a human check. |
| Automation lane failing | `automation:health` says whether it is one lane or a red `main` (the usual shared cause). |

## What still needs a human

- **Browser checks on the manual path.** `SAFE_PUBLISHING_RULES.md` requires
  one on any promotion outside path D.
- **Brand safety.** No approved source encodes it. Review the daily digest,
  and demote plus denylist when needed.
- **`tour_name`.** It is never inferred from listing titles.
- **New Ticketmaster storefront countries.** Adding one is an `out.js`
  allowlist decision.
- **Social-card repair PRs.** They are opened automatically; a human merges
  them.
- **Guide source re-checks.** `last_checked` is human-only.
