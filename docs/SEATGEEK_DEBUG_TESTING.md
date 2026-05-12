# SeatGeek Integration Debug Testing Guide

**Purpose:** Verify SeatGeek event matching and affiliate tracking capability without enabling public access.

**⚠️ Important:** This testing is **internal only**. Do not enable SeatGeek in the public UI (`public_enabled` remains `false`). All SeatGeek features remain gated behind `DEBUG_API_TOKEN` and `IMPACT_SEATGEEK_PROGRAM_ID`.

---

## Setup

### Prerequisites
- `DEBUG_API_TOKEN` environment variable set (ask team for token)
- Valid event IDs from `public/data/events.json`
- cURL or similar HTTP client

### Endpoint
```
GET /api/debug-seatgeek?eventId=<id>&token=<token>
```

### Response Fields to Record
- `event.artist_name`, `event.venue`, `event.city`, `event.datetime_iso`
- `seatgeek_search.candidates[]` (count, performer/date match quality)
- `seatgeek_search.matched` (the best match found, if any)
- `config.seatgeek_configured` (API credentials available)
- `config.impact_seatgeek_configured` (affiliate program ID available)
- `affiliate_tracking_capable` (both SeatGeek and Impact configured + match found)

---

## Test Cases

### Test 1: Morgan Wallen – Indianapolis
**Event ID:** `tm-morgan-wallen-2026-indianapolis-0500635ddc2db013`
- **Artist:** Morgan Wallen
- **Venue:** Lucas Oil Stadium, Indianapolis
- **Date:** 2026-05-08

**Command:**
```bash
curl -s "http://localhost:3000/api/debug-seatgeek?eventId=tm-morgan-wallen-2026-indianapolis-0500635ddc2db013&token=<DEBUG_API_TOKEN>" | jq .
```

**Expected Results (record below):**
- [ ] SeatGeek API candidates returned: ___ (count)
- [ ] Performer match: HIGH / MEDIUM / LOW / NONE
- [ ] Date match: YES / NO
- [ ] Venue match: YES / NO
- [ ] Best match URL: _________________
- [ ] SeatGeek configured: YES / NO
- [ ] Impact tracking configured: YES / NO
- [ ] Affiliate-safe URL: YES / NO
- **Decision:** USABLE / NOT USABLE
- **Notes:** ___________________________________________

---

### Test 2: Harry Styles – Madison Square Garden
**Event ID:** `tm-harry-styles-2026-new-york-3b0064350404814e`
- **Artist:** Harry Styles
- **Venue:** Madison Square Garden, New York
- **Date:** 2026-08-27

**Command:**
```bash
curl -s "http://localhost:3000/api/debug-seatgeek?eventId=tm-harry-styles-2026-new-york-3b0064350404814e&token=<DEBUG_API_TOKEN>" | jq .
```

**Expected Results (record below):**
- [ ] SeatGeek API candidates returned: ___ (count)
- [ ] Performer match: HIGH / MEDIUM / LOW / NONE
- [ ] Date match: YES / NO
- [ ] Venue match: YES / NO
- [ ] Best match URL: _________________
- [ ] SeatGeek configured: YES / NO
- [ ] Impact tracking configured: YES / NO
- [ ] Affiliate-safe URL: YES / NO
- **Decision:** USABLE / NOT USABLE
- **Notes:** ___________________________________________

---

### Test 3: Ariana Grande – Oakland Arena
**Event ID:** `tm-ariana-grande-2026-oakland-1c00631913d14ad8`
- **Artist:** Ariana Grande
- **Venue:** Oakland Arena, Oakland
- **Date:** 2026-06-06

**Command:**
```bash
curl -s "http://localhost:3000/api/debug-seatgeek?eventId=tm-ariana-grande-2026-oakland-1c00631913d14ad8&token=<DEBUG_API_TOKEN>" | jq .
```

**Expected Results (record below):**
- [ ] SeatGeek API candidates returned: ___ (count)
- [ ] Performer match: HIGH / MEDIUM / LOW / NONE
- [ ] Date match: YES / NO
- [ ] Venue match: YES / NO
- [ ] Best match URL: _________________
- [ ] SeatGeek configured: YES / NO
- [ ] Impact tracking configured: YES / NO
- [ ] Affiliate-safe URL: YES / NO
- **Decision:** USABLE / NOT USABLE
- **Notes:** ___________________________________________

---

## Evaluation Criteria

### Usable ✅
- SeatGeek API returns candidates with HIGH confidence match (date + performer name match)
- Venue name matches or is close
- SeatGeek is configured (client ID + secret available)
- Impact tracking is configured (program ID available)
- Generated URL is affiliate-safe (seatgeek.com domain)

### Not Usable ❌
- SeatGeek API returns no candidates or only LOW/MEDIUM confidence matches
- Performer or date doesn't match reliably
- SeatGeek credentials missing
- Impact program ID not configured
- Generated URL fails validation

---

## Safety Checklist

After testing:
- [ ] Verified no SeatGeek CTAs appear in public UI
- [ ] Confirmed `/api/out?provider=seatgeek` fails with 400 without Impact config
- [ ] Confirmed `/api/debug-seatgeek` without token returns 404
- [ ] Verified `public_enabled: false` remains in fallback-catalog.json
- [ ] No SeatGeek event URLs populated in events.json

---

## Notes

- SeatGeek matching is best-effort; some events may not have SeatGeek equivalents
- Date/venue matching is case-insensitive and slug-based for performers
- If SeatGeek API is down, candidates will return empty with reason
- Impact tracking URL generation requires valid credentials; test only in dev/staging
- Never commit `DEBUG_API_TOKEN` to version control
