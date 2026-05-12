# Provider Schema Reference

Provider metadata is stored in `public/data/catalog.json` in the `providers` array. Each provider is a configuration object that controls capability gating and display permissions.

## Schema Overview

### Identification
- **slug** (string): provider identifier, lowercase-hyphenated (e.g., `ticketmaster`, `seatgeek`)
- **name** (string): display name (e.g., "Ticketmaster", "SeatGeek")
- **provider_type** (string): category describing provider role (e.g., `marketplace`, `primary_or_verified_marketplace`)

### Display & Capability Gates
- **public_enabled** (boolean): whether provider buttons/links appear in UI and can be shown to users
- **pricing_display_allowed** (boolean): whether prices can be displayed for this provider (NOT inferred from `supports_pricing`)
- **available_display_allowed** (boolean): whether availability status can be claimed (e.g., `on_sale`, `sold_out`)
- **requires_verified_destination** (boolean): whether a verified ticket_link is required before using provider

### Credentials & Access
- **credential_type** (string): authentication method (`none`, `api_key`, `oauth`, `impact_affiliate`)
- **credential_fields** (array): required environment variables or secrets (e.g., `["SEATGEEK_API_KEY"]`)

### Geographic & Provider Details
- **geographic_coverage** (array): country codes where provider operates (e.g., `["US", "CA", "UK"]`)
- **allowed_destination_hosts** (array): URLs that pass `/api/out` validation (e.g., `["seatgeek.com"]`)
- **trusted_affiliate_hosts** (array): known affiliate domain rewrites (e.g., `["ticketmaster.evyy.net"]`)

### API Configuration
- **api_config** (object):
  - **type** (string): protocol type (`rest`, etc.)
  - **base_url** (string): API endpoint
  - **rate_limit_per_second** (number): request quota
  - **supports_event_search** (boolean): API can search events
  - **supports_inventory_fetch** (boolean): API can fetch inventory
  - **supports_pricing** (boolean): API has pricing endpoint
  - **pricing_type** (string): `live_fetch` (real-time queries), `live_aggregate` (search/index), or null

### Features & Capabilities
- **features** (object) — capabilities based on official provider documentation:
  - **primary_ticket_sales** (boolean): sells primary (official) tickets
  - **resale_platform** (boolean): resale/secondary marketplace
  - **international_coverage** (boolean): operates beyond single country
  - **real_time_inventory** (boolean): API supports live inventory
  - **price_aggregation** (boolean): aggregates prices from multiple sellers

### Verification & Legal
- **affiliate_disclosure** (string): required disclosure text for affiliate links
- **terms_accepted_at** (string|null): ISO 8601 date when partnership agreement was finalized (null = not signed)
- **contact** (object):
  - **api_email** (string): provider API support contact
  - **business_email** (string): partnerships/business development contact

## Key Safety Rules

**Capability Declarations:**
- Do not invent capabilities. Only declare features that provider documentation explicitly proves.
- `supports_pricing: true` does NOT mean prices can be displayed. Use `pricing_display_allowed: true` to gate display.
- Same rule for `available_display_allowed` — API support ≠ display permission.

**Public Display Gates:**
- If `public_enabled: false`, provider is not shown in UI and no claims are allowed.
- If `pricing_display_allowed: false`, prices must not be displayed (validation enforces this).
- If `available_display_allowed: false`, availability status must not be claimed (validation enforces this).

**Verification Before Public Display:**
Before setting `public_enabled: true`:
1. Set `terms_accepted_at` to the date agreement was finalized
2. Add at least one verified `ticket_link` to catalog.json
3. Set `pricing_display_allowed` and `available_display_allowed` based on tested capability (assume false unless proven)
4. Run validation: `python3 scripts/validate-events.py --for-production --validate-provider-gates`
5. Test `/api/out` with the verified link
6. Smoke test: `node scripts/smoke-prelaunch.mjs`

## Example: Ticketmaster (Current)

```json
{
  "slug": "ticketmaster",
  "name": "Ticketmaster",
  "provider_type": "primary_or_verified_marketplace",
  "public_enabled": true,
  "pricing_display_allowed": false,
  "available_display_allowed": false,
  "requires_verified_destination": true,
  "credential_type": "impact_affiliate",
  "credential_fields": ["IMPACT_ACCOUNT_SID", "IMPACT_AUTH_TOKEN", "IMPACT_PROGRAM_ID"],
  "geographic_coverage": ["US", "CA", "UK", ...],
  "allowed_destination_hosts": ["ticketmaster.com", "ticketmaster.ca", ...],
  "trusted_affiliate_hosts": ["ticketmaster.evyy.net"],
  "features": {
    "primary_ticket_sales": true,
    "resale_platform": false,
    "real_time_inventory": true,
    "price_aggregation": false
  },
  "api_config": {
    "supports_pricing": true,
    "pricing_type": "live_aggregate"
  },
  "affiliate_disclosure": "This link directs to Ticketmaster. Compensation: affiliate commission.",
  "terms_accepted_at": "2026-04-30"
}
```

**Key Notes:**
- `pricing_type: "live_aggregate"` indicates search/index API, NOT live-fetch → safe from price display claims
- `pricing_display_allowed: false` — prices are not displayed even though API supports pricing
- `public_enabled: true` — allowed in UI because terms are accepted and verified links exist
- 7 verified `ticket_links` exist in catalog (one per artist)

## Validation

Run with each provider addition or change:

```bash
# Standard validation
python3 scripts/validate-events.py --for-production

# With provider gate enforcement
python3 scripts/validate-events.py --for-production --validate-provider-gates

# Full suite
npm run events:validate
node scripts/smoke-prelaunch.mjs
```
