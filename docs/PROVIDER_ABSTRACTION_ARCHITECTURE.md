# Provider Abstraction Architecture

- **Date:** 2026-05-11 (originally drafted); status refreshed 2026-05-19
- **Status:** Phase 1 complete and merged to `main`. This document remains the design reference for future phases.
- **Scope:** Prepare TourTicketCompare for future provider integrations (SeatGeek, StubHub, Vivid Seats, TicketNetwork)

---

## 1. Current State Analysis

### Data Model (as of 2026-05-11)

**`catalog.json` structure:**
- `providers[]`: List of provider definitions with slug, name, type, public_enabled, requires_verified_destination
- `ticket_links[]`: Artist-to-provider mappings with affiliate flags and verification status
- Only Ticketmaster is currently `public_enabled: true`
- SeatGeek, Vivid Seats defined but `public_enabled: false`

**`events.json` structure:**
- Ticketmaster-sourced events with fields: `id`, `ticketmaster_event_id`, `ticketmaster_url`
- Placeholder fields for `seatgeek_url` and `vividseats_url` (empty strings)
- `source_type: "ticketmaster"` to track origin
- No pricing data (intentional safety measure)

**Affiliate/Routing (`functions/api/out.js`):**
- `PROVIDERS` object: defines allowed hosts and trusted affiliate hosts per provider
- `VERIFIED_TICKET_LINKS`: artist:provider → affiliate redirect URL mapping
- Only Ticketmaster affiliate URLs configured (Impact API integrated)
- Other providers have empty `trustedAffiliateHosts` arrays

### Critical Gaps

1. **No provider feature flags** — can't control which providers appear per artist/event without re-editing data
2. **No event-to-provider linking** — events.json can hold provider URLs but no structured relationship
3. **No provider credentials structure** — Impact tokens hardcoded; no pattern for SeatGeek/StubHub/etc. credentials
4. **No pricing schema** — can't safely store or display verified provider pricing when enabled
5. **No provider metadata** — missing contact, API endpoints, rate limits, geographic coverage
6. **Monolithic redirect logic** — `functions/api/out.js` contains hardcoded provider config; needs refactoring for scale

---

## 2. Recommended Data Model

### 2.1 Enhanced `catalog.json` Structure

```json
{
  "version": 3,
  "updated_at": "2026-05-11",
  "providers": [
    {
      "slug": "ticketmaster",
      "name": "Ticketmaster",
      "provider_type": "primary_or_verified_marketplace",
      "public_enabled": true,
      "requires_verified_destination": true,
      "credential_type": "impact_affiliate",
      "credential_fields": ["IMPACT_ACCOUNT_SID", "IMPACT_AUTH_TOKEN", "IMPACT_PROGRAM_ID"],
      "geographic_coverage": ["US", "CA", "UK", "DE", "FR", "NL", "SE", "PL", "IT", "BE", "ES"],
      "allowed_destination_hosts": [
        "ticketmaster.com", "ticketmaster.ca", "ticketmaster.co.uk",
        "ticketmaster.es", "ticketmaster.de", "ticketmaster.nl",
        "ticketmaster.se", "ticketmaster.pl", "ticketmaster.be", "ticketmaster.it"
      ],
      "trusted_affiliate_hosts": ["ticketmaster.evyy.net"],
      "api_config": {
        "type": "rest",
        "base_url": "https://api.ticketmaster.com/",
        "rate_limit_per_second": 5,
        "supports_event_search": true,
        "supports_inventory_fetch": false,
        "supports_pricing": true,
        "pricing_type": "live_aggregate"
      },
      "features": {
        "primary_ticket_sales": true,
        "resale_platform": false,
        "international_coverage": true,
        "real_time_inventory": true,
        "price_aggregation": false
      },
      "affiliate_disclosure": "This link directs to Ticketmaster. Compensation: affiliate commission.",
      "terms_accepted_at": "2026-04-30",
      "contact": {
        "api_email": "api-support@ticketmaster.com",
        "business_email": "partnerships@ticketmaster.com"
      }
    },
    {
      "slug": "seatgeek",
      "name": "SeatGeek",
      "provider_type": "marketplace",
      "public_enabled": false,
      "requires_verified_destination": true,
      "credential_type": "api_key",
      "credential_fields": ["SEATGEEK_API_KEY"],
      "geographic_coverage": ["US", "CA"],
      "allowed_destination_hosts": ["seatgeek.com"],
      "trusted_affiliate_hosts": [],
      "api_config": {
        "type": "rest",
        "base_url": "https://api.seatgeek.com/",
        "rate_limit_per_second": 2,
        "supports_event_search": true,
        "supports_inventory_fetch": true,
        "supports_pricing": true,
        "pricing_type": "live_fetch"
      },
      "features": {
        "primary_ticket_sales": true,
        "resale_platform": true,
        "international_coverage": false,
        "real_time_inventory": true,
        "price_aggregation": true
      },
      "affiliate_disclosure": "This link directs to SeatGeek.",
      "terms_accepted_at": null,
      "contact": {
        "api_email": "api@seatgeek.com",
        "business_email": "partnerships@seatgeek.com"
      }
    },
    {
      "slug": "vivid-seats",
      "name": "Vivid Seats",
      "provider_type": "marketplace",
      "public_enabled": false,
      "requires_verified_destination": true,
      "credential_type": "api_key",
      "credential_fields": ["VIVID_SEATS_API_KEY"],
      "geographic_coverage": ["US"],
      "allowed_destination_hosts": ["vividseats.com"],
      "trusted_affiliate_hosts": [],
      "api_config": {
        "type": "rest",
        "base_url": "https://api.vividseats.com/",
        "rate_limit_per_second": 2,
        "supports_event_search": false,
        "supports_inventory_fetch": true,
        "supports_pricing": true,
        "pricing_type": "live_fetch"
      },
      "features": {
        "primary_ticket_sales": false,
        "resale_platform": true,
        "international_coverage": false,
        "real_time_inventory": true,
        "price_aggregation": true
      },
      "affiliate_disclosure": "This link directs to Vivid Seats.",
      "terms_accepted_at": null,
      "contact": {
        "api_email": "api@vividseats.com",
        "business_email": "partnerships@vividseats.com"
      }
    },
    {
      "slug": "stubhub",
      "name": "StubHub",
      "provider_type": "marketplace",
      "public_enabled": false,
      "requires_verified_destination": true,
      "credential_type": "oauth",
      "credential_fields": ["STUBHUB_CLIENT_ID", "STUBHUB_CLIENT_SECRET"],
      "geographic_coverage": ["US", "CA", "UK", "AU", "DE", "FR"],
      "allowed_destination_hosts": ["stubhub.com"],
      "trusted_affiliate_hosts": [],
      "api_config": {
        "type": "rest",
        "base_url": "https://api.stubhub.com/",
        "rate_limit_per_second": 3,
        "supports_event_search": true,
        "supports_inventory_fetch": true,
        "supports_pricing": true,
        "pricing_type": "live_fetch"
      },
      "features": {
        "primary_ticket_sales": false,
        "resale_platform": true,
        "international_coverage": true,
        "real_time_inventory": true,
        "price_aggregation": true
      },
      "affiliate_disclosure": "This link directs to StubHub.",
      "terms_accepted_at": null,
      "contact": {
        "api_email": "api-support@stubhub.com",
        "business_email": "partnerships@stubhub.com"
      }
    }
  ],
  "ticket_links": [
    {
      "link_id": "tm-artist-beyonce",
      "artist_slug": "beyonce",
      "provider": "ticketmaster",
      "destination_type": "artist_page",
      "affiliate_enabled": true,
      "verified": true,
      "public_enabled": true,
      "market": "global",
      "last_checked_at": "2026-04-30",
      "disclosure_required": true
    }
  ]
}
```

### 2.2 Enhanced `events.json` Structure

```json
[
  {
    "id": "tm-morgan-wallen-2026-indianapolis-0500635ddc2db013",
    "artist_slug": "morgan-wallen",
    "ticketmaster_event_id": "0500635DDC2DB013",
    "event_name": "Morgan Wallen: Still the Problem Tour",
    "city": "Indianapolis",
    "venue": "Lucas Oil Stadium",
    "datetime_iso": "2026-05-08T21:30:00Z",
    "source_type": "ticketmaster",
    "source_timestamp": "2026-05-07T00:00:00Z",
    "provider_links": {
      "ticketmaster": {
        "event_id": "0500635DDC2DB013",
        "url": "https://www.ticketmaster.com/morgan-wallen-still-the-problem-tour-indianapolis-indiana-05-08-2026/event/0500635DDC2DB013",
        "verified": true,
        "last_verified_at": "2026-05-07",
        "availability_status": "on_sale"
      },
      "seatgeek": {
        "event_id": null,
        "url": null,
        "verified": false,
        "last_verified_at": null,
        "availability_status": "not_checked"
      },
      "vivid-seats": {
        "event_id": null,
        "url": null,
        "verified": false,
        "last_verified_at": null,
        "availability_status": "not_checked"
      },
      "stubhub": {
        "event_id": null,
        "url": null,
        "verified": false,
        "last_verified_at": null,
        "availability_status": "not_checked"
      }
    }
  }
]
```

### 2.3 New: Per-Provider Configuration Schema (`provider-configs.json`)

```json
{
  "version": 1,
  "updated_at": "2026-05-11",
  "provider_credentials": {
    "ticketmaster": {
      "enabled": true,
      "affiliate_enabled": true,
      "public_enabled": true,
      "credentials_set": true,
      "last_updated_at": "2026-04-30"
    },
    "seatgeek": {
      "enabled": false,
      "affiliate_enabled": false,
      "public_enabled": false,
      "credentials_set": false,
      "last_updated_at": null,
      "notes": "Awaiting API access approval"
    },
    "vivid-seats": {
      "enabled": false,
      "affiliate_enabled": false,
      "public_enabled": false,
      "credentials_set": false,
      "last_updated_at": null,
      "notes": "Awaiting terms review"
    },
    "stubhub": {
      "enabled": false,
      "affiliate_enabled": false,
      "public_enabled": false,
      "credentials_set": false,
      "last_updated_at": null,
      "notes": "Not yet in roadmap"
    }
  },
  "pricing_display_rules": {
    "enabled": false,
    "show_low_price": false,
    "show_all_prices": false,
    "show_availability_only": true,
    "verified_providers_only": true,
    "display_currency": "USD",
    "notes": "Pricing display disabled until live feed verified"
  },
  "cache_settings": {
    "event_data_ttl_seconds": 3600,
    "pricing_data_ttl_seconds": 300,
    "provider_health_check_interval_seconds": 1800
  }
}
```

---

## 3. Provider Abstraction Architecture

### 3.1 Server-Side Registry Pattern (`functions/_provider-registry.js`)

```javascript
// Single source of truth for provider definitions and configuration
// Loaded at request time from catalog.json and provider-configs.json

export class ProviderRegistry {
  constructor(catalogData, configData) {
    this.providers = catalogData.providers.reduce((acc, p) => {
      acc[p.slug] = p;
      return acc;
    }, {});
    this.config = configData.provider_credentials;
    this.pricingRules = configData.pricing_display_rules;
  }

  getProvider(slug) {
    return this.providers[slug];
  }

  isPublicEnabled(slug) {
    const provider = this.getProvider(slug);
    return provider?.public_enabled === true && this.config[slug]?.public_enabled === true;
  }

  isAffiliateEnabled(slug) {
    const provider = this.getProvider(slug);
    return provider && this.config[slug]?.affiliate_enabled === true && 
           provider.trusted_affiliate_hosts?.length > 0;
  }

  getPublicProviders() {
    return Object.entries(this.providers)
      .filter(([slug]) => this.isPublicEnabled(slug))
      .map(([_, provider]) => provider);
  }

  getProviderLinks(artistSlug) {
    // Returns all enabled providers for this artist
  }

  validateDestination(slug, url) {
    const provider = this.getProvider(slug);
    if (!provider) return { ok: false, reason: "unknown_provider" };
    // Validation logic using allowed_destination_hosts
  }

  getPricingStrategy() {
    return this.pricingRules;
  }
}
```

### 3.2 Provider API Abstraction (`functions/api/_providers/`)

```
functions/api/_providers/
  index.js                 # Export registry, validation helpers
  ticketmaster.js          # Ticketmaster-specific implementation
  seatgeek.js              # SeatGeek stub (future)
  vivid-seats.js           # Vivid Seats stub (future)
  stubhub.js               # StubHub stub (future)
  pricing.js               # Unified pricing display logic
  tracking.js              # Unified click tracking + provider metadata
```

### 3.3 Event Data Enrichment Pipeline

New helper: `scripts/enrich-events.js` to populate `provider_links` in events.json:
- Input: `events.json` (Ticketmaster-sourced)
- Process: For each event, create `provider_links` structure with Ticketmaster data
- Output: Enhanced `events.json` with scaffolding for other providers
- Safe: Non-destructive; only adds structured fields, doesn't invent data

---

## 4. Safe Pricing Display Strategy

### 4.1 Display Rules (No Implementation Yet)

Pricing will only display when ALL conditions are met:
1. **Provider enabled** and `public_enabled: true`
2. **Credentials verified** — secrets set and recent health check passed
3. **Pricing feed active** — real-time API returning current data
4. **Verification timestamp** — timestamp ≤ 5 minutes old
5. **Geographic match** — provider covers event location
6. **Disclosure visible** — affiliate disclosure present and not hidden

### 4.2 Safe Data Flow (Future)

```
/api/out
  ├─ POST { artistSlug, provider, showId, requestedDestination }
  ├─ Load provider config from ProviderRegistry
  ├─ Validate destination against allowedDestinationHosts
  ├─ Load event from events.json
  ├─ For pricing requests:
  │   ├─ Check provider_links[provider].verified
  │   ├─ Load cached price from D1 (if TTL OK)
  │   ├─ OR fetch live from provider API (if TTL expired)
  │   └─ Never display unverified or stale prices
  └─ Return verified redirect + optional pricing data
```

### 4.3 D1 Schema for Pricing Cache

```sql
CREATE TABLE IF NOT EXISTS provider_pricing (
  id TEXT PRIMARY KEY,
  artist_slug TEXT NOT NULL,
  event_id TEXT NOT NULL,
  provider TEXT NOT NULL,
  low_price REAL,
  avg_price REAL,
  high_price REAL,
  currency TEXT DEFAULT 'USD',
  inventory_count INTEGER,
  verified_at TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(event_id, provider)
);
```

---

## 5. Future API Integration Strategy

### 5.1 Integration Phases

**Phase 1 (Now):** Structural preparation
- ✅ Refactor data models to support multi-provider structure
- ✅ Create ProviderRegistry abstraction
- ✅ Establish credential schema in secrets/config
- ✅ Enrich events.json with provider_links scaffolding

**Phase 2 (When approved):** Ticketmaster pricing (live feed)
- Implement real-time Ticketmaster Search API integration
- Cache live pricing in D1 with 5-min TTL
- Display prices with verification timestamp
- Monitor feed health via `/api/health`

**Phase 3 (When approved):** SeatGeek integration
- Establish API partnership and credentials
- Implement SeatGeek event search → link event data
- Populate provider_links.seatgeek in events.json
- Display SeatGeek as secondary marketplace option

**Phase 4+:** StubHub, Vivid Seats, TicketNetwork (similar pattern)

### 5.2 Safe Provider Onboarding Checklist

Before any new provider goes live:

- [ ] Terms reviewed and accepted (date in provider config)
- [ ] API credentials tested in staging
- [ ] Rate limits understood and enforced
- [ ] Affiliate disclosure drafted and visible
- [ ] Health check endpoint passing
- [ ] Pricing validation rules defined (if applicable)
- [ ] Geographic coverage confirmed
- [ ] Event matching algorithm tested (e.g., Ticketmaster ID ↔ SeatGeek ID)
- [ ] D1 caching strategy documented
- [ ] Smoke tests updated
- [ ] Feature flag tested (public_enabled: false → true)
- [ ] Analytics tags added for provider-specific tracking

---

## 6. Implementation Plan

### Immediate (Structural Prep — Safe)

1. **Create `docs/PROVIDER_ABSTRACTION_ARCHITECTURE.md`** (this file)
2. **Enhance `catalog.json`** v3 with full provider metadata
3. **Add `provider-configs.json`** for runtime feature flags
4. **Create `functions/_provider-registry.js`** — unified provider abstraction
5. **Create `functions/api/_providers/` directory** with modular stubs
6. **Enrich `events.json`** with `provider_links` scaffolding
7. **Create `scripts/enrich-events.js`** to populate provider_links structure
8. **Update `functions/api/out.js`** to use ProviderRegistry (no behavior change)
9. **Add D1 migration** for pricing cache table (inactive until feature enabled)
10. **Update validation scripts** to check new data structures

### Safety Guardrails

- ❌ No new pricing shown to users yet (feature flags off)
- ❌ No fake provider data or URLs
- ❌ No scraping or invented event data
- ❌ No changes to affiliate redirect behavior
- ❌ No secrets exposed client-side
- ✅ All changes backward-compatible
- ✅ All changes non-destructive
- ✅ All changes enable future integrations without rewrites

### Not In Scope (Future Tasks)

- Ticketmaster Search API integration (wait for approval)
- Real pricing display (wait for live feed verification)
- SeatGeek/StubHub/Vivid Seats API calls (wait for partnership terms)
- Client-side provider selection UI (comes after API integration)
- Price comparison charts (comes after ≥2 live pricing feeds)

---

## 7. Migration Path (For Future Enablement)

### To Enable SeatGeek (Future Example)

1. Set `catalog.json` → `providers.seatgeek.public_enabled: true`
2. Set `provider-configs.json` → `seatgeek.public_enabled: true`
3. Add SeatGeek API credentials to Cloudflare secrets
4. Implement `functions/api/_providers/seatgeek.js` with:
   - Event search logic
   - Event ID matching
   - Pricing fetch
5. Update `functions/api/out.js` to call SeatGeek pricing if enabled
6. Add SeatGeek event IDs to events.json via `scripts/enrich-events.js`
7. Update smoke tests
8. Deploy with feature flag off, test in staging
9. Enable feature flag when ready
10. Monitor analytics for adoption

No re-architecture needed; all pieces already in place.

---

## 8. Risks & Mitigations

| Risk | Mitigation |
|------|-----------|
| **Data model bloat** | Keep provider_configs.json focused; move detailed docs to separate files |
| **API rate limits** | Implement token bucket in D1; cache aggressively; monitor via health check |
| **Event matching failures** | Ticketmaster ID embedded in events.json; other providers require explicit linking or search |
| **Pricing stale display** | Enforce `expires_at` check; fall back to "Check provider" if expired |
| **Credential leaks** | All credentials in Cloudflare secrets; never logged or cached client-side |
| **Feature flag confusion** | Single boolean checks only; no nested logic; document in-code |
| **Migration complexity** | Phase approach; each phase independent; no data loss |

---

## 9. Validation & Testing

### Pre-Deployment Checks

```bash
# Syntax validation
node --check functions/_provider-registry.js
node --check functions/api/_providers/index.js

# Data structure validation
python3 scripts/validate-catalog-v3.py
python3 scripts/validate-provider-configs.py
python3 scripts/validate-events-provider-links.py

# D1 schema check
npm run demand:migrate --dry-run

# Smoke tests (must pass)
npm run test:providers
npm run deploy:pages:safe
```

### Ongoing Monitoring

- `/api/health` — reports all provider credential presence
- `/api/providers/health` — per-provider API health (new endpoint)
- Smoke tests — provider config validation
- Analytics — provider-specific click tracking

---

## 10. Documentation & Runbooks

### For Developers

- **`PROVIDER_ABSTRACTION_ARCHITECTURE.md`** (this file) — design overview
- **`_provider-registry.js` JSDoc** — ProviderRegistry API reference
- **Per-provider implementation guides** (e.g., `SEATGEEK_INTEGRATION.md` when phase 3 starts)

### For Product/Ops

- **Onboarding checklist** (§5.2)
- **Feature flag checklist** (in provider-configs.json comments)
- **Troubleshooting guide** (in docs/)

---

## Conclusion

This architecture decouples provider configuration from code, enables multi-provider support without re-architecting, and maintains strict safety boundaries (no fake data, no scraped pricing, no credential leaks). The plan is phased; each phase is independent and can be paused or reversed. All groundwork is done now; future integrations are plug-and-play.

**Next step:** Implement structural prep work (§6) and commit to branch `claude/provider-abstraction-architecture-*`.
