# Adding Artists to TourTicketCompare

Strict manual template and validation checklist for adding one new artist record.

**This is a protected process.** Do not add an artist without completing every step below. Do not skip evidence requirements. Do not add placeholder data.

**Before starting:** Complete the proposal and human-verification gates in `docs/SAFE_NEXT_ARTIST_WORKFLOW.md`. That document defines the Proposal → Shell → Promote → Events phases, the gate checklists between them, and the AI proposal prompt. The field-level templates and example format below apply once a proposal has cleared Gate 1.

---

## 1. Required Evidence Before Adding an Artist

Before writing any code or data, you must have **all** of the following in hand:

| Evidence | Requirement |
|----------|-------------|
| Artist identity | Confirmed legal/stage name and a stable, unambiguous slug |
| Active or recent touring | Confirmed by an official announcement or primary-source event listing |
| Verified ticket link | A real, live destination URL at an allowlisted provider hostname |
| Provider affiliation | Confirmed affiliate program membership (Impact or direct) for the destination provider |
| Factual summary | A brief, accurate summary sourced from confirmed public information — no invented biographical claims |
| `last_checked_at` date | The date you personally verified the destination URL was live and resolving correctly |

If any item is missing, **stop**. Do not add a partial artist record.

---

## 2. Accepted Verification Sources

Use only these sources. Do not invent, infer, or copy from competitor sites.

**For tour/event existence:**
- Official artist website or press release
- Official artist social media account (Instagram, X/Twitter, Facebook — verified accounts only)
- Ticketmaster artist page (confirmed live, with active event listings)
- Billboard, Pollstar, or Variety news articles (named/bylined, dated)

**For ticket link destinations:**
- Ticketmaster.com artist page URL — only if the page resolves and shows active or upcoming events
- SeatGeek or Vivid Seats artist page — only if `public_enabled: true` is set for that provider in `catalog.json` and a verified destination URL is confirmed

**Not accepted:**
- Aggregator scrapers or third-party fan sites
- Wikipedia or IMDb as a sole source for touring claims
- Competitor ticket comparison sites
- AI-generated tour information

---

## 3. Required Fields

Every new artist record requires **all** of the following fields. Do not omit any.

### `public/data/artists.json` entry

```json
{
  "slug": "<url-safe lowercase with hyphens>",
  "name": "<display name, capitalised correctly>",
  "indexing_status": "indexable_with_substantial_content",
  "verified_provider_count": <integer: number of providers with a live verified link>,
  "verified_providers": ["<provider slug>"],
  "last_verified_at": "<YYYY-MM-DD or null: most recent artist-level verification date>"
}
```

### `public/data/catalog.json` — `ticket_links` array entry

```json
{
  "link_id": "<provider>-artist-<slug>",
  "artist_slug": "<slug>",
  "tour_slug": null,
  "provider": "<provider slug>",
  "destination_type": "artist_page",
  "affiliate_enabled": true,
  "verified": true,
  "public_enabled": true,
  "market": "<global | us | uk | ...>",
  "last_checked_at": "<YYYY-MM-DD>",
  "disclosure_required": true
}
```

### `functions/api/out.js` — `VERIFIED_TICKET_LINKS` entry

A new key must be added to the `VERIFIED_TICKET_LINKS` constant using the exact format already present in that file. **Do not modify any other logic in `out.js`.**

**Confirm before touching `out.js`:**
- The destination URL resolves in a browser right now
- The destination hostname is in the provider's `allowed_destination_hosts` list in `catalog.json`
- The URL does not contain `localhost`, `127.0.0.1`, `placeholder`, `example.com`, `replace-me`, or any development string

### `functions/api/shows.js` — `TICKETMASTER_ARTIST_AFFILIATE_LINKS` entry

When an artist is promoted to `indexable_with_substantial_content` with Ticketmaster verified, the slug must be added to the `TICKETMASTER_ARTIST_AFFILIATE_LINKS` map in `functions/api/shows.js`. Without this entry, `/api/shows` will not return an affiliate URL for the artist and the artist-level Ticketmaster CTA will not render. Use the existing object-literal pattern in that file (quoted slug → Ticketmaster artist URL).

This file is only touched at the Promote phase, not at the Shell phase. See `docs/SAFE_NEXT_ARTIST_WORKFLOW.md` § "Phase 3 — Promote" for the full file-change matrix.

### `functions/api/signup.js` — `ARTIST_SLUGS` entry

Every artist slug — including `review_required` artists — must be added to the `ARTIST_SLUGS` set in `functions/api/signup.js`. Without this entry, `/api/signup` rejects watchlist signups for the artist with `invalid_artist`. This file is touched at the Shell phase so fans can register interest before CTAs are live.

---

## 4. Prohibited Fields Unless Verified

Do not add these fields unless you have an explicit, confirmed source for each value:

| Field | Prohibited unless... |
|-------|----------------------|
| `tour_slug` | A named tour with confirmed dates exists and a tour record is added to `catalog.json` |
| `event_ids` or show cards | Verified event records exist in `events.json` with confirmed dates, venues, and `ticketmaster_event_id` |
| Ticket price (face value, range, "from $X") | An approved provider feed explicitly supplies displayable pricing for this artist |
| "On sale" / "Available" status | A provider API or confirmed announcement supplies current on-sale status |
| Venue or city claims | Verified event records with confirmed venue data exist |
| Biographical claims beyond confirmed public record | Not acceptable — keep factual summaries brief and sourced |

---

## 5. CTA Rules

A ticket CTA button may only appear on the page if **all three** are true:

1. The artist slug is present in `catalog.json` with `public_enabled: true`
2. A verified `redirectUrl` exists for this artist in `VERIFIED_TICKET_LINKS` in `functions/api/out.js`
3. The destination URL passes `/api/out` validation: non-placeholder, non-localhost, destination host in the provider allowlist

**If any condition is not met:** the page must render a polished "watchlist" empty state with no CTA. Do not render a broken or placeholder button.

**All CTAs must route through `/api/out`.** Do not write raw affiliate URLs as `<a href>` in any template or data file visible in page source.

---

## 6. No-Price Rules

- Do not display any ticket price, price range, or "from $X" copy for the new artist
- Do not display "cheapest", "lowest price", "best deal", or savings language
- Do not display "sold out", "limited availability", or inventory claims
- Do not display "price comparison" for the new artist unless an approved multi-provider feed is active and supplies that data
- These rules apply even if price data is available in a provider API — approval to display is a separate step

---

## 7. Verification Timestamp Rules

Use these definitions consistently across artist/event data:

- `artist.last_verified_at` = artist-level freshness marker for the artist page itself. Optional; use `null` when no artist-level verification has been performed yet.
- `event.last_verified_at` = event-level freshness marker for that specific event row. Optional.
- `provider_links.<provider>.last_verified_at` = provider-link freshness marker for that provider URL on that specific event. Optional.
- Date format for all of the above is strictly `YYYY-MM-DD` (ISO calendar date, no time component).
- Provider-level timestamp may be present only when the same provider entry is both `verified: true` and has a non-empty `url`.
- For artist summaries, `verified_provider_count` must equal `verified_providers.length`.

Display precedence for freshness copy:

1. Use provider-level timestamp when showing a specific provider link on an event.
2. Otherwise use event-level timestamp for event-level verification copy.
3. Otherwise use artist-level timestamp for artist-wide verification copy.
4. If none exists, show a neutral "verification date unavailable" style message (no invented date).

For new records, add verification dates only when you personally completed that exact verification step.

- Set this to the date you personally opened the destination URL in a browser and confirmed it resolved to a live, correct page
- Do not copy a date from another record
- Do not use a future date
- Do not use placeholder values
- When you re-verify an existing link, update the date

Records with `last_checked_at` older than 90 days should be re-verified before a new artist is added in the same session.

---

## 8. Manual Review Checklist

Work through this checklist in order. Check off each item only when you have personally confirmed it — do not assume.

### Evidence (before writing any files)

- [ ] Artist name and slug confirmed — no ambiguity, slug is URL-safe and unique
- [ ] Touring activity confirmed from an accepted verification source (source URL noted)
- [ ] Destination ticket URL confirmed live in a browser (URL noted, date noted)
- [ ] Destination hostname is in the provider's `allowed_destination_hosts` in `catalog.json`
- [ ] Affiliate program membership confirmed for the provider
- [ ] Factual summary sourced and reviewed — no invented claims

### Data files

- [ ] `artists.json` entry added with all required fields
- [ ] `catalog.json` `ticket_links` entry added with all required fields
- [ ] `VERIFIED_TICKET_LINKS` entry added to `functions/api/out.js` (Promote phase only — destination URL live, hostname allowlisted)
- [ ] `TICKETMASTER_ARTIST_AFFILIATE_LINKS` entry added to `functions/api/shows.js` (Promote phase only — same artist URL as the `out.js` entry)
- [ ] `ARTIST_SLUGS` entry added to `functions/api/signup.js` (Shell phase — required for watchlist signups, including `review_required` artists)
- [ ] No price, availability, or inventory data added anywhere
- [ ] No placeholder strings in any field (`example.com`, `tbd`, `replace-me`, `your-link-here`, `localhost`)
- [ ] `last_checked_at` / `last_verified_at` set to today's date (not copied, not future-dated)

### HTML routing

- [ ] `functions/[[path]].js` — no edit needed for a standard artist slug (artist routes are handled dynamically from `catalog.json`); only add to the routing block if the slug deviates from the standard pattern
- [ ] `functions/_route-metadata.js` — **optional**: artist routes derive metadata dynamically from `catalog.json`; add an explicit entry only if you need to override the dynamic title/description/H1/canonical/breadcrumb
- [ ] Page title format matches existing pattern: `"<Artist Name> Tickets | TourTicketCompare"`
- [ ] No invented tour name, date, or venue used in any metadata field

### Validation

- [ ] `npm run artist:check -- <slug>` — exits 0 (PASS at Promote phase, WARN acceptable at Shell phase)
- [ ] `node --check 'functions/[[path]].js'` — passes
- [ ] `node --check functions/api/out.js` — passes
- [ ] `node --check functions/api/shows.js` — passes
- [ ] `node --check functions/api/signup.js` — passes
- [ ] `node --check public/app.js` — passes
- [ ] `python3 scripts/validate-events.py --for-production` — passes (or no events added)
- [ ] `node scripts/validate-artist-provider-claims.mjs` — passes
- [ ] `node scripts/smoke-prelaunch.mjs` — passes
- [ ] `git diff --check` — no whitespace errors or conflict markers

### Final

- [ ] Tested locally via `npm run dev` — artist page renders, CTA routes through `/api/out`, no JS errors
- [ ] Confirmed no other page is broken (homepage, `/artists` index, one other artist page)
- [ ] Change is a single isolated commit with a clear message (e.g. `add artist: nova-skye`)
- [ ] Pushed to feature branch — **not to `main`**

---

## 9. Validation Commands

Run these in order before committing. All must pass.

```bash
# Per-artist cross-file readiness check (run this first)
npm run artist:check -- <slug>

# Syntax checks
node --check public/app.js
node --check 'functions/[[path]].js'
node --check functions/api/out.js
node --check functions/api/shows.js
node --check functions/api/signup.js

# Artist/provider drift guard (cross-checks artists.json vs VERIFIED_TICKET_LINKS)
node scripts/validate-artist-provider-claims.mjs

# Event data (if events.json was touched)
python3 scripts/validate-events.py --for-production
node scripts/validate-partitions.mjs

# Smoke test suite
node scripts/smoke-prelaunch.mjs

# Full MVP suite (events self-test + provider drift + smoke)
npm run test:mvp

# Inline fallback sync (required whenever any public/data/*.json changes)
npm run events:sync

# Whitespace and conflict markers
git diff --check
```

`npm run artist:check -- <slug>` prints a PASS / WARN / FAIL report for one artist slug, checking `artists.json`, `catalog.json`, `events.json` and the per-artist partition file, `VERIFIED_TICKET_LINKS` in `functions/api/out.js`, `TICKETMASTER_ARTIST_AFFILIATE_LINKS` in `functions/api/shows.js`, and `ARTIST_SLUGS` in `functions/api/signup.js`. A WARN result (exit 0) means the artist is intentionally gated or has known open issues. A FAIL result (exit 1) means the data is internally inconsistent and must be fixed before publishing.

If any command fails, fix the issue before committing. Do not use `--no-verify` to skip hooks.

For the full phase-by-phase workflow (Shell → Promote → Events) and the file matrix at each gate, see `docs/SAFE_NEXT_ARTIST_WORKFLOW.md`.

---

## 10. Example Placeholder Format (Fictional Artist Only)

The artist **Nova Skye** is entirely fictional and used here only to illustrate the correct format. Do not add this artist.

### `artists.json` entry

```json
{
  "slug": "nova-skye",
  "name": "Nova Skye",
  "indexing_status": "indexable_with_substantial_content",
  "verified_provider_count": 1,
  "verified_providers": ["ticketmaster"],
  "last_verified_at": "YYYY-MM-DD"
}
```

### `catalog.json` `ticket_links` entry

```json
{
  "link_id": "tm-artist-nova-skye",
  "artist_slug": "nova-skye",
  "tour_slug": null,
  "provider": "ticketmaster",
  "destination_type": "artist_page",
  "affiliate_enabled": true,
  "verified": true,
  "public_enabled": true,
  "market": "global",
  "last_checked_at": "YYYY-MM-DD",
  "disclosure_required": true
}
```

### `VERIFIED_TICKET_LINKS` entry in `functions/api/out.js`

```js
// Fictional example — replace with a real, verified Ticketmaster artist URL
"nova-skye:ticketmaster": {
  provider: "ticketmaster",
  destination: "https://www.ticketmaster.com/nova-skye-tickets/artist/XXXXXXX",
  market: "global",
}
```

### `TICKETMASTER_ARTIST_AFFILIATE_LINKS` entry in `functions/api/shows.js`

```js
// Fictional example — must be the same URL as the out.js entry above
"nova-skye": "https://www.ticketmaster.com/nova-skye-tickets/artist/XXXXXXX",
```

### `ARTIST_SLUGS` entry in `functions/api/signup.js`

```js
// Add to the existing Set — used to validate watchlist signups
const ARTIST_SLUGS = new Set([
  // ...existing slugs
  "nova-skye",
]);
```

### `_route-metadata.js` entry (optional for artist routes)

Artist routes derive title, description, H1, canonical, and breadcrumbs dynamically from `catalog.json` via `[[path]].js`. An explicit `_route-metadata.js` entry is **not required** for an artist route; only add one if you need to override the dynamic defaults.

```js
// Optional override — only add if dynamic defaults are insufficient
"/artists/nova-skye": {
  title: "Nova Skye Tickets | TourTicketCompare",
  description: "Find verified Nova Skye ticket links. Independent research — not affiliated with any artist or provider.",
  h1: "Nova Skye Tickets",
  canonical: "https://tourticketcompare.com/artists/nova-skye",
  breadcrumb: [
    { name: "Home", url: "https://tourticketcompare.com/" },
    { name: "Artists", url: "https://tourticketcompare.com/artists" },
    { name: "Nova Skye", url: "https://tourticketcompare.com/artists/nova-skye" }
  ]
}
```

**Replace `YYYY-MM-DD` with today's date. Replace `XXXXXXX` with the real Ticketmaster artist ID. Do not publish this example verbatim.**

---

## Related Documents

- `docs/CONTENT_RULES.md` — full content and data rules
- `docs/PROVIDER_DATA_POLICY.md` — provider feed, pricing, and affiliate policy
- `docs/ARCHITECTURE.md` — routing model and data bindings
- `CLAUDE.md` § "Protected Areas" — files that must not be modified without explicit scope
