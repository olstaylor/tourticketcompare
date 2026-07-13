# Adding Ticket Providers

Safe integration path for new ticket/affiliate providers. Do not add providers outside this process.

---

## Prerequisites

**A provider may only be added if:**

1. **Task is in BACKLOG.md** — Explicitly listed as an active priority
2. **Data source is verified** — Official API, partnership, or affiliate feed (not scraped)
3. **Rights are confirmed** — Permission to display pricing, links, or event data
4. **Commercial/link model is documented** — Impact, direct partnership, or an explicitly non-affiliate plain-link lane
5. **Disclosure requirements are documented** — Clear rules for "Affiliate" or "Sponsored" labels

If any condition is unmet, do not activate the provider publicly. An explicitly
scoped implementation may be built behind default-off flags so credentials and
the feed can be tested safely, but it must remain manual-only and fail closed
until every prerequisite is evidenced.

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
   - When may the CTA appear? Define URL, provenance, source, runtime configuration, freshness, and fail-closed gates without inferring inventory.
   - Fallback: if provider data is stale or unavailable, what happens? (hide button, show watchlist, show generic ticket link?)
   - Empty state: if no events are available for an artist, what page state do users see?

5. **Validation tests**
   - Smoke test: verify affiliate redirect works (`/api/out?artistSlug=...&provider=...` → correct URL)
   - Link validity: spot-check that generated URLs resolve and go to correct provider page
   - Price integrity: if displaying prices, verify approved source, exact-event identity, currency, observation time, expiry, and cache-only rendering
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

1. Set `public_enabled: true` in `catalog.json` and the provider-specific Cloudflare public flag after the provider passes its activation proof
2. Run validation tests (see Phase 1, step 5)
3. Smoke test in staging/production
4. Monitor for 7 days (click volume, error rates, user feedback)
5. If issues arise, set `public_enabled: false` immediately

---

## Current provider status

The active provider roster, rollout state, and current constraints change over time and are recorded only in [PROJECT_STATUS.md](../PROJECT_STATUS.md). Durable provider-specific rights, sources, URL shapes, and price gates live in [PROVIDER_DATA_POLICY.md](PROVIDER_DATA_POLICY.md).

Do not copy campaign IDs, coverage counts, or point-in-time activation claims into this runbook.

## Example: Ticketmaster Integration (Live, plain links)

**Source:** Official Ticketmaster artist pages + event discovery API
**Rights model:** Plain, unmonetized links to verified destinations; no affiliate or price-display rights are inferred
**Disclosure:** Affiliate-disclosure page states Ticketmaster links earn nothing
**CTA behaviour:** Verified Ticketmaster links render after the affiliate providers ("Check Ticketmaster" beside a SeatGeek CTA, "View tickets" standalone)
**Fallback:** Redirect straight to the verified stored URL; no tracking involved
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
