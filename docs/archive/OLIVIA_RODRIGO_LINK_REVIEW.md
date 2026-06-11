# Olivia Rodrigo verified ticket links — manual review report

> **ARCHIVED — historical reference only.** Not a source of current priorities or current state. See `CLAUDE.md` → `PROJECT_STATUS.md` → `BACKLOG.md`. (Banner added 2026-06-11.)

Tracks [issue #171](https://github.com/olstaylor/tourticketcompare/issues/171).

This report records the state of Olivia Rodrigo's Ticketmaster verification as of 2026-05-26 and lists the actions a human reviewer with Ticketmaster + Impact dashboard access needs to take to close the issue.

## Why this is a report, not a full fix

Live HTTP verification against Ticketmaster is not reliable from the current execution environment — `GET https://www.ticketmaster.com/` and `GET https://www.ticketmaster.com/olivia-rodrigo-tickets/...` both return **HTTP 403** to the user-agent used by `scripts/verify-outbound-links.mjs`. Per issue #171's "Verification environment" rule, this pass therefore does not claim any Ticketmaster URL was re-verified. Instead, it:

1. Flags the 8 short-form (404-prone) event URLs as `verification_status: "needs_recheck"` and clears their suspect URLs so the frontend renders a safe "no event-specific ticket link is available" state instead of a broken click.
2. Leaves `functions/api/out.js` untouched. The `VERIFIED_TICKET_LINKS` allowlist still does not contain an `olivia-rodrigo:ticketmaster` entry, because no verified Ticketmaster artist-page URL exists for her in approved repo data, and inventing one is forbidden by the project's content rules.

## What changed in this pass

Files modified:

- `public/data/events/olivia-rodrigo.json` — 8 events updated.
- `public/data/events.json` — same 8 events updated (kept in sync).
- `docs/OLIVIA_RODRIGO_LINK_REVIEW.md` — this report (new).

For each of the 8 events, the following fields were changed:

| Field | Before | After |
|---|---|---|
| `ticketmaster_url` | `https://www.ticketmaster.com/event/<id>` (short form) | `""` |
| `source_url` | same short form | `""` |
| `provider_links.ticketmaster.url` | same short form | `null` |
| `provider_links.ticketmaster.verified` | `true` | `false` |
| `provider_links.ticketmaster.last_verified_at` | `"2026-05-20"` | `null` |
| `provider_links.ticketmaster.availability_status` | `"not_checked"` | `"needs_recheck"` |
| `verification_status` (new field) | — | `"needs_recheck"` |

`ticketmaster_event_id` is preserved on every event so a human reviewer can reconstruct the canonical descriptive URL on Ticketmaster.

No other Olivia Rodrigo events were touched. The remaining 78 events keep their existing URLs unchanged.

## The 8 short-form URLs flagged for manual recheck

| # | Event ID | City | Venue | Date (UTC) | Ticketmaster event ID | Original suspect URL |
|---|---|---|---|---|---|---|
| 1 | `tm-olivia-rodrigo-2026-hartford-z7r9jz1a706ep` | Hartford | PeoplesBank Arena | 2026-09-25T23:00:00Z | `Z7r9jZ1A706ep` | `https://www.ticketmaster.com/event/Z7r9jZ1A706ep` |
| 2 | `tm-olivia-rodrigo-2026-hartford-z7r9jz1a70677` | Hartford | PeoplesBank Arena | 2026-09-26T23:00:00Z | `Z7r9jZ1A70677` | `https://www.ticketmaster.com/event/Z7r9jZ1A70677` |
| 3 | `tm-olivia-rodrigo-2026-sunrise-z7r9jz1a7067f` | Sunrise | Amerant Bank Arena | 2026-11-20T00:00:00Z | `Z7r9jZ1A7067F` | `https://www.ticketmaster.com/event/Z7r9jZ1A7067F` |
| 4 | `tm-olivia-rodrigo-2026-sunrise-z7r9jz1a7067o` | Sunrise | Amerant Bank Arena | 2026-11-21T00:00:00Z | `Z7r9jZ1A7067o` | `https://www.ticketmaster.com/event/Z7r9jZ1A7067o` |
| 5 | `tm-olivia-rodrigo-2026-las-vegas-z7r9jz1a706kk` | Las Vegas | T-Mobile Arena | 2026-12-20T03:00:00Z | `Z7r9jZ1A706kk` | `https://www.ticketmaster.com/event/Z7r9jZ1A706kk` |
| 6 | `tm-olivia-rodrigo-2026-las-vegas-z7r9jz1a706kf` | Las Vegas | T-Mobile Arena | 2026-12-21T03:00:00Z | `Z7r9jZ1A706kF` | `https://www.ticketmaster.com/event/Z7r9jZ1A706kF` |
| 7 | `tm-olivia-rodrigo-2027-greenwich-z7r9jz1a70ff4` | Greenwich | The O2 | 2027-05-09T16:00:00Z | `Z7r9jZ1A70ff4` | `https://www.ticketmaster.com/event/Z7r9jZ1A70ff4` |
| 8 | `tm-olivia-rodrigo-2027-greenwich-z7r9jz1a70fff` | Greenwich | The O2 | 2027-05-10T16:00:00Z | `Z7r9jZ1A70fff` | `https://www.ticketmaster.com/event/Z7r9jZ1A70fff` |

Note: events 7 and 8 list "Greenwich, The O2" — that is what the source data contains; do not change it without verification. The other 74 events use descriptive long-form URLs and are out of scope for this report.

## Manual review checklist

For a reviewer with browser access to Ticketmaster:

1. For each of the 8 IDs above, open `https://www.ticketmaster.com/event/<ticketmaster_event_id>` in a regular browser (with a normal user agent — automated tools are blocked).
2. If the page resolves to a real event:
   - Capture the **final descriptive URL** Ticketmaster redirects to (the long-form `/<artist>-<tour>-<city>-<date>/event/<id>` shape).
   - Update both `public/data/events/olivia-rodrigo.json` and `public/data/events.json` with:
     - `ticketmaster_url`: the captured descriptive URL
     - `source_url`: same URL
     - `provider_links.ticketmaster.url`: same URL
     - `provider_links.ticketmaster.verified`: `true`
     - `provider_links.ticketmaster.last_verified_at`: today's date in `YYYY-MM-DD`
     - `provider_links.ticketmaster.availability_status`: `"not_checked"` (or another supported value)
     - Remove `verification_status` (or set to a verified value).
3. If the page 404s or no longer exists:
   - Leave the URLs blank.
   - Optionally change `status` to `"draft"` so the event is not shown on listings, or delete the event record — but only after confirming it isn't moved/rescheduled.
4. Re-run validation: `python3 scripts/validate-events.py --for-production && node scripts/smoke-prelaunch.mjs`.

## Deferred: artist-page allowlist entry

`functions/api/out.js`'s `VERIFIED_TICKET_LINKS` does not contain an `olivia-rodrigo:ticketmaster` entry. The same gap exists in `public/data/catalog.json` (`ticket_links` covers only the other 7 indexed artists). This means:

- `/api/out?artistSlug=olivia-rodrigo&provider=ticketmaster` currently returns `{ ok: false, status: "provider_not_configured" }` (HTTP 400). Event-level CTAs are unaffected — they use `showId` routing, which reads the event's `ticketmaster_url` directly.
- The frontend should still render Olivia Rodrigo's event CTAs (where a verified event URL exists), but any "see all tickets" / artist-level Ticketmaster button is non-functional.

### How attribution actually works (architecture clarification)

A previous version of this report stated that a pre-minted `ticketmaster.evyy.net/<code>` Impact shortlink was required to close this gap. **That is not correct.** The intended Ticketmaster attribution path is:

> Verified Ticketmaster URL (from the Ticketmaster API or trusted existing data) → site renders the plain Ticketmaster URL → the Impact Publisher Tag transforms eligible Ticketmaster links client-side.

The Publisher Tag is loaded site-wide by `public/impact.js`, which calls `impactStat('transformLinks')` on every page. It rewrites plain `www.ticketmaster.com/...` anchors at load time and attributes the click through the Ticketmaster Impact account. A pre-minted `ticketmaster.evyy.net/<code>` shortlink is **one** valid approach (used by the seven existing allowlist entries), not the only one. A plain `https://www.ticketmaster.com/...` URL in `VERIFIED_TICKET_LINKS[].redirectUrl` is also valid: `validateConfiguredRedirect` in `functions/api/out.js` allows `ticketmaster.com` because it appears in `PROVIDERS.ticketmaster.allowedDestinationHosts`.

### What's actually blocking closure

No verified Olivia Rodrigo Ticketmaster artist-page URL is present in approved repo data. The repo only has event-level URLs (e.g. `https://www.ticketmaster.com/olivia-rodrigo-the-unraveled-tour-...`). The canonical artist-page URL (typically `https://www.ticketmaster.com/olivia-rodrigo-tickets/artist/<numeric-id>`) has not been confirmed from the Ticketmaster API or any trusted source in this repository, and inventing one would violate the no-invented-URL rule.

### To close this part of the issue

A reviewer with Ticketmaster API access or browser access to a Ticketmaster session needs to:

1. Confirm the canonical Ticketmaster artist-page URL for Olivia Rodrigo from the Ticketmaster Discovery API (or from a Ticketmaster session that resolves an artist search to the artist landing page). Treat URL slugs as evidence, not proof — the final URL must be the one Ticketmaster itself returns.
2. Add an entry to `VERIFIED_TICKET_LINKS` in `functions/api/out.js` of the form:

   ```js
   "olivia-rodrigo:ticketmaster": {
     artistSlug: "olivia-rodrigo",
     provider: "ticketmaster",
     linkId: "tm-artist-olivia-rodrigo",
     redirectUrl: "https://www.ticketmaster.com/<verified-artist-page-path>",
     verified: true
   }
   ```

   (A `ticketmaster.evyy.net/<code>` Impact shortlink also works if the reviewer prefers it, but it is not required — the Publisher Tag handles attribution for plain TM URLs.)
3. Add a matching entry to `public/data/catalog.json` `ticket_links` if the other 7 are listed there.
4. Re-run `scripts/smoke-prelaunch.mjs` and add a smoke assertion that `/api/out?artistSlug=olivia-rodrigo&provider=ticketmaster` returns 302 (parallel to the existing Beyoncé check at smoke-prelaunch.mjs:819).

This step is intentionally NOT done in this pass because no verified Ticketmaster artist URL for Olivia Rodrigo exists in approved repo data.

## Validation results

Recorded in the corresponding commit and in the issue thread.
