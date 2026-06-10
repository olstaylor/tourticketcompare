# Adding Ticket Providers

Safe integration path for new ticket/affiliate providers. Do not add providers outside this process.

---

## Prerequisites

**A provider may only be added if:**

1. **Task is in BACKLOG.md** — Explicitly listed as an active priority
2. **Data source is verified** — Official API, partnership, or affiliate feed (not scraped)
3. **Rights are confirmed** — Permission to display pricing, links, or event data
4. **Affiliate program is active** — Provider must accept Impact or direct CPA partnerships
5. **Disclosure requirements are documented** — Clear rules for "Affiliate" or "Sponsored" labels

If any condition is unmet, do not start integration. Create an issue instead.

---

## Integration Workflow

### Phase 1: Documentation

Before writing code or data:

1. **Source of data** — Where do event URLs, prices, or metadata come from?
   - Official API endpoint? (URL, rate limits, authentication)
   - Affiliate feed? (format, refresh cadence, coverage)
   - Manual curation? (review process, verification sources)

2. **Permission & rights**
   - Affiliate program membership: Y/N, program name, contact
   - Public pricing display: Y/N, approval date, restrictions
   - Event data sharing: Y/N, coverage (US only? global?)
   - Terms of service changes allowed? (Y/N, escalation contact)

3. **Affiliate disclosure**
   - Label location: "Affiliate" badge? Page footer? Link hover?
   - Disclosure text: exact wording required by provider
   - Impact account setup: impact.com program ID, auth token, publisher tag

4. **Allowed CTA behaviour**
   - When does "Buy tickets" button appear? (always, only if on-sale, only if inventory > 0?)
   - Fallback: if provider data is stale or unavailable, what happens? (hide button, show watchlist, show generic ticket link?)
   - Empty state: if no events are available for an artist, what page state do users see?

5. **Validation tests**
   - Smoke test: verify affiliate redirect works (`/api/out?artistSlug=...&provider=...` → correct URL)
   - Link validity: spot-check that generated URLs resolve and go to correct provider page
   - Price accuracy: if displaying prices, verify they match provider page (within 1 hour)
   - CTA logic: button only appears when conditions above are met

### Phase 2: Data Integration

Once Phase 1 is documented and reviewed:

1. **Add provider entry to `public/data/catalog.json`**
   - Provider name, slug, feature flags, redirect URL pattern
   - `public_enabled: false` until all validation passes

2. **Add data ingestion** (if applicable)
   - Event URLs, prices, metadata ingest from provider source
   - Schedule or trigger (real-time API? Daily batch? Manual?)
   - Fallback / error handling (stale cache? Show last-known data? Hide?)

3. **Add artist ticket links** to `catalog.json` per artist
   - Only if artist is verified active on this provider
   - Redirect URL confirmed live and resolving

4. **Add to `VERIFIED_TICKET_LINKS`** in `functions/api/out.js`
   - Only after URLs are confirmed in a browser
   - Entry format: `"<artistSlug>:<provider>": "<verified-url>"`

### Phase 3: Launch

1. Set `public_enabled: true` in `catalog.json`
2. Run validation tests (see Phase 1, step 5)
3. Smoke test in staging/production
4. Monitor for 7 days (click volume, error rates, user feedback)
5. If issues arise, set `public_enabled: false` immediately

---

## Current Provider Status

| Provider | Status | Notes |
|----------|--------|-------|
| **Ticketmaster** | ✅ Live | Official event source; Impact affiliate tracking active |
| **SeatGeek** | ✅ Live (event-level only) | Event-level CTAs render where a verified `seatgeek_url` exists, via `/api/out` with Impact tracking. Artist-level links and price display remain parked. |
| **Vivid Seats** | 🔓 Unparked (not live) | Block lifted 2026-06-10; public CTAs may be scoped. Requires a verified `vividseats.com` destination URL added to `/api/out` — none exist yet, so buttons stay hidden. |
| **StubHub, Viagogo** | ⏸️ Not started | No active priority; do not add without explicit scope |

---

## Example: Ticketmaster Integration (Live)

**Source:** Official Ticketmaster artist pages + event discovery API
**Rights:** Impact affiliate program (active; provided IMPACT_TICKETMASTER_PROGRAM_ID)
**Disclosure:** Impact publisher tag in `public/impact.js` (transforms `ticketmaster.com` links to tracked redirects)
**CTA behaviour:** Show "Buy on Ticketmaster" only if `verified_providers: ["ticketmaster"]` in artist record
**Fallback:** If Impact tracking fails, redirect to raw Ticketmaster URL (fail-safe)
**Validation:** Smoke test checks `/api/out?artistSlug=beyonce&provider=ticketmaster` → 302 redirect to Ticketmaster

---

## Protected Areas

Do NOT modify without explicit task scope:

- `functions/api/out.js` — affiliate redirect logic and `VERIFIED_TICKET_LINKS` allowlist
- Provider data ingest scripts — invent nothing; only use verified sources
- CTA generation logic — never show "Buy" unless all conditions in Phase 1 are met
- Impact affiliate credentials — server-side only; never expose client-side

---

## When to Stop

- Phase 1 documentation reveals missing permission or data source
- Validation tests fail and the root cause requires approval/escalation
- User asks to add a provider not in BACKLOG.md
