# Commercial funnel measurement

How TourTicketCompare measures whether it is earning anything, and what those
numbers do and do not mean. Read this before drawing a commercial conclusion
from any figure in the report.

Related: [ARCHITECTURE.md](ARCHITECTURE.md) (request routing and the `/api/out`
contract) · [PROVIDER_DATA_POLICY.md](PROVIDER_DATA_POLICY.md) (what may be
displayed) · `PROJECT_STATUS.md` (what is live right now).

---

## The funnel

| Step | Event | Written by | Trust |
|---|---|---|---|
| 1. Landed on a page | `page_view` | client beacon (`public/app.js`) | Indicative |
| 2. Looked at an artist | `artist_view` | client beacon | Indicative |
| 3. Looked at a specific date | `event_view` | client beacon (viewport) | Indicative |
| 4. Saw a provider button | `provider_cta_view` | client beacon (viewport) | Indicative |
| 5. Clicked a provider button | `provider_click` | client beacon | **Intent only** |
| 6. Left through `/api/out` | `outbound_click` | **server, `functions/api/out.js`** | **Authoritative** |
| 6b. Click that never left | `outbound_blocked` | server, `functions/api/out.js` | Authoritative |
| 7. Left an email address | `email_signup`, `artist_interest`, `price_alert_interest` | server, `functions/api/signup.js` | Authoritative |

**`outbound_click` is the authoritative provider-click metric.** It is written
by the redirect itself, so it cannot be missed by an ad blocker, a failed
beacon, or a browser that closed before the beacon flushed. Every provider-click
figure in the report — by artist, by provider, by page type, affiliate split,
landing pages — is counted from `outbound_click` alone.

`provider_click` is the client's statement of intent. It is reported only beside
the authoritative count, as a **completion rate** (`outbound_click` ÷
`provider_click`). The two are never added together, so a double-firing client
cannot inflate the funnel. A completion rate well under 100% means CTA clicks
are being lost between the button and the redirect — usually a provider lane
failing closed, which `outbound_blocked` will name.

`outbound_blocked` is a click that reached `/api/out` and did not get a
redirect: an Impact tracking failure, a provider switched off, or a destination
that no longer validates. Without it a broken lane looks merely unpopular. It is
deliberately limited to provider and configuration failures — malformed or
probing requests are not demand signal and are not recorded.

## Dimensions recorded

On the authoritative outbound row, everything below is derived server-side from
either the request or the reviewed event record — never from a client claim:

| Dimension | Column | Source |
|---|---|---|
| Timestamp | `created_at` | server clock |
| Anonymous visitor | `request_key` | SHA-256 of (IP ‖ user-agent); the IP itself is never stored |
| Landing path | `landing_path` | client, per browsing session (page views only) |
| Current page path | `source_path` | explicit CTA parameter, else the same-origin `Referer`; path only |
| Page type | `page_type` | derived from the path (`functions/_funnel.js`) |
| Artist slug | `artist_slug` | resolved event or verified artist link |
| Event id / date / city / venue | `event_id`, `event_date`, `event_city`, `event_venue` | the reviewed `events.json` record |
| Provider | `provider` | validated provider slug |
| CTA component | `cta_location` | `ctaLocation` on the tracked URL, allowlisted |
| Destination category | `destination_category` | the host actually redirected to |
| Affiliate status | `is_affiliate` | provider lane (Ticketmaster is unmonetized → 0) |
| Referrer / acquisition | `referrer`, `acquisition_source` | external referrer origin, session entry only |
| UTM | `utm_source`, `utm_medium`, `utm_campaign` | session entry only |
| Device | `device_category` | mobile / tablet / desktop from the user-agent |
| Click id | `click_id` | random per click; see *Reconciling with affiliate dashboards* |

### What "session" means here

There is **no session cookie**. `request_key` is a hash of the IP address and
user agent — an anonymous visitor key, not an identity. The report defines:

- **distinct visitors** = distinct `request_key` in the window
- **sessions** = distinct `request_key` × calendar day

Two people behind one NAT with the same browser count as one visitor. One person
on mobile data whose IP rotates counts as two. Treat both as order-of-magnitude
figures, not exact counts.

`landing_path` is captured client-side per browsing session (tab-scoped
`sessionStorage`, no cookie) and stored on `page_view` rows. `/api/out` has no
client state, so the report attributes an outbound click to the landing page of
the **same visitor key on the same day**. That join is the weakest link in the
report — see *Attribution limits*.

## Running the report

```bash
npm run report:commercial-funnel                      # last 30 days
npm run report:commercial-funnel -- --days 7
npm run report:commercial-funnel -- --since 2026-08-01 --until 2026-09-01
npm run report:commercial-funnel -- --json            # machine-readable
npm run report:commercial-funnel -- --help
```

Remote D1 needs `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` in the
environment. Every statement the script runs is a `SELECT`; it creates no tables
and writes nothing. The `email` and `user_agent` columns are never read, and
`request_key` is only ever counted, never listed — the script fails its own
self-test if a query breaks those rules.

`npm run report:funnel` (the older provider/CTA-location report) still exists
and is unchanged.

### Minimum volumes

A rate needs **≥ 30 views** in its denominator and a ranked row needs **≥ 3
clicks**, or the report prints `low volume (n=…)` instead of a percentage. One
click on two views is not a 50% conversion rate. Override with `--min-views` and
`--min-clicks` if you know what you are doing; do not quote a rate that the
report itself declined to compute.

### Report sections

| Section | Reads as |
|---|---|
| Funnel | Absolute counts for each step, plus click-through rate per session, per page view, and per CTA impression |
| Clicks by provider | Which lanes actually earn clicks; `blocked` exposes lanes failing closed |
| Clicks by artist | Which roster entries pay for themselves |
| Clicks by page type | Whether artist pages, city pages, venue pages or guides produce clicks |
| Clicks by CTA component | Which button position works |
| Affiliate vs non-affiliate | Share of clicks that are monetizable at all |
| Top landing pages producing clicks | Entry pages worth more traffic |
| Pages with traffic and no clicks | Traffic that is not being converted — a CTA, coverage, or intent problem |
| Artists with clicks but weak coverage | **The most actionable section.** Demand exists, but ≤1 affiliate provider publishes for that artist, or under half its upcoming dates carry an affiliate link |
| Signups on pages with no dates | Demand for artists with nothing to sell yet — an onboarding/roster signal |
| Blocked redirects | Clicks that never reached a provider, by failure reason |

## Reconciling with affiliate dashboards

The comparison that matters is **our `outbound_click` count for a provider and
date range vs that provider's own click count in Impact**.

1. Run `npm run report:commercial-funnel -- --since <start> --until <end>`.
2. In Impact, pull the click report for the same campaign and the same UTC
   dates.
3. Compare per provider, per day. Differences are expected, and these are the
   usual reasons:
   - We count the redirect being *issued*; Impact counts the click *arriving*.
     Abandoned navigations exist only in our number.
   - Impact deduplicates repeat clicks from one user within its own window; we
     do not.
   - Crawler filtering differs. We drop self-identifying crawlers before writing
     the row (`functions/_bot-detection.js`); Impact applies its own rules.
   - Timezone boundaries. Our `created_at` is UTC.

A persistent gap in one direction is worth investigating; day-to-day variation
of a few clicks is not.

### Per-click reconciliation (optional, default OFF)

Every redirect gets a random `click_id`, stored on our row. It can also be
passed to Impact as a SubId so individual clicks and actions line up exactly.
This changes a live affiliate URL, so it is behind a flag:

- `OUT_CLICK_ID_SUBID_ENABLED="true"` — enables the passthrough
- `OUT_CLICK_ID_SUBID_PARAM` — the parameter name (default `subId1`)

Both are non-secret `[vars]` in `wrangler.toml`. Before enabling: confirm the
expected parameter name with Impact for these campaigns, enable it, click one
CTA, and check the SubId appears against that click in Impact reporting. If it
does not, set the flag back to `"false"` — nothing else depends on it.

Applies to the `pxf.io` base-tracking path only. Links built through the Impact
API `TrackingLinks` endpoint are **not** covered.

## What cannot be measured

**Checkout happens on the provider's site. We never see it.** The site has no
visibility into, and must never claim:

- whether a click became a purchase
- how many tickets were bought, at what price, or with what fees
- revenue or commission — these exist only in Impact's dashboards
- refunds, chargebacks, or reversed commissions
- anything a visitor does after the redirect

The funnel therefore ends at "left the site through a monetized link". Revenue
attribution beyond that point is Impact's number, not ours, and the report will
never print a conversion or revenue figure. **Do not add one.**

Also currently unmeasurable:

- **Search impressions and queries.** Google Search Console is the only source;
  first-party analytics sees a visit only once it arrives.
- **Whether a visit is human.** Bot filtering catches only crawlers that
  identify themselves. Headless automation with a stock browser user agent is
  counted as a visitor.
- **Cross-device journeys.** No cookie, no login, no identity graph.
- **True sessions.** See *What "session" means here*.
- **Ticketmaster revenue.** Ticketmaster is a plain, unmonetized verification
  link; its clicks are recorded but can never earn anything.

## Attribution limits

- **Landing-page attribution is a same-visitor, same-day join.** A visitor whose
  IP changes mid-visit loses the link between landing page and click. Landing
  pages are directionally useful, not exact.
- **`event_view` and `provider_cta_view` are capped and dwell-gated** (visible
  ≥50% for ≥1s; at most 20 event cards per page view). They are impression
  denominators, not a complete log of what was on screen.
- **Client events need JavaScript.** A no-JS visitor produces no `page_view`,
  but their CTA click still produces an `outbound_click` — so click-through rate
  is very slightly overstated, never understated.
- **Acquisition is captured once per browsing session** and only when the
  referring site sends a referrer. Direct, app-based and privacy-stripped
  referrers all appear as `direct`.
- **Historical rows predate these dimensions.** Rows before the 0008 migration
  have `NULL` for every new column. Per-artist click-through uses `page_view`
  rows carrying an artist slug — a column that has always existed — so that
  particular metric stays comparable across the whole history. Counts before
  2026-07-28 are additionally inflated by unfiltered crawler traffic (see
  `PROJECT_STATUS.md`).

## Privacy

- No cookie is set by the analytics path. Only tab-scoped `sessionStorage`.
- No complete IP address is stored — only the SHA-256 of (IP ‖ user-agent).
- `/api/analytics` is write-only and never stores an email address, even if one
  is posted to it. The only address in `analytics_events` is the one a
  subscriber submitted to `/api/signup` themselves, and the funnel report never
  reads that column.
- Paths are stored without query strings; referrers are stored as an origin
  only, never a full URL.
- GA4 receives a **mirror** of `artist_view`, `provider_cta_view`,
  `provider_click` and `email_signup` with low-cardinality parameters only
  (page type, artist slug, provider, CTA location, affiliate flag). No event id,
  city, venue, path, referrer or address is ever sent to GA4. GA4 cannot see the
  server-side outbound redirect at all, which is why first-party D1 remains
  authoritative.

## Deployment

The migration is additive and the writers fall back to the previous column set
when it has not been applied, so code and migration can land in either order:

```bash
npx wrangler d1 execute tourticketcompare-demand --remote \
  --file migrations/0008_analytics_commercial_funnel.sql
```

See [migrations/README.md](../migrations/README.md) for the applied-state
record.
