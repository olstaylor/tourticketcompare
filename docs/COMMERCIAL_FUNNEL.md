# Commercial funnel measurement

How TourTicketCompare measures whether it is earning anything, and what those
numbers do and do not mean. Read this before drawing a commercial conclusion
from any figure in the report.

Related: [ARCHITECTURE.md](ARCHITECTURE.md) (request routing and the `/api/out`
contract) · [PROVIDER_DATA_POLICY.md](PROVIDER_DATA_POLICY.md) (what may be
displayed) · `PROJECT_STATUS.md` (what is live right now).

---

## The funnel

### Canonical definitions

`provider_click` means a visitor activated a provider CTA (client intent).
`outbound_attempt` means a valid known-provider **GET navigation carrying the
browser-controlled `Sec-Fetch-User: ?1` signal** reached `/api/out` and
received a server-generated opaque `click_id`. `outbound_click` means the
reviewed destination and any required Impact tracking URL were validated, the
qualified row was recorded, and a 3xx was issued. `outbound_blocked` means the
same qualified attempt fail-closed before a 3xx, with a safe failure reason.
Valid headerless requests still receive exactly the same redirect or safe
failure response; they simply do not add a funnel receipt.
Qualified rows carry `receiptQualification: "fetch_user_v1"` in their internal
metadata. Commercial reports select that marker, so rolling reporting windows
do not blend these rows with legacy unqualified receipts from before this
change.

Affiliate/non-affiliate status is based on the actual redirect hostname:
reviewed Impact/tracking hosts are `affiliate_network`; reviewed provider hosts
are `provider_direct`; unknown hosts remain `unknown` and are never silently
reported as direct. One click ID joins one attempt to one terminal row. Reports
count terminal rows for funnel totals and distinct IDs for reconciliation.

| Step | Event | Written by | Trust |
|---|---|---|---|
| 1. Landed on a page | `page_view` | client beacon (`public/app.js`) | Indicative |
| 2. Looked at an artist | `artist_view` | client beacon | Indicative |
| 3. Looked at a specific date | `event_view` | client beacon (viewport) | Indicative |
| 4. Saw a provider button | `provider_cta_view` | client beacon (viewport) | Indicative |
| 5. Clicked a provider button | `provider_click` | client beacon | **Intent only** |
| 6. Entered `/api/out` | `outbound_attempt` | **server, `functions/api/out.js`** | Authoritative receipt |
| 7. Left through `/api/out` | `outbound_click` | **server, `functions/api/out.js`** | **Authoritative success** |
| 7b. Click that never left | `outbound_blocked` | server, `functions/api/out.js` | Authoritative failure |
| 8. Left an email address | `email_signup`, `artist_interest`, `price_alert_interest` | server, `functions/api/signup.js` | Authoritative |

**`outbound_click` is authoritative evidence of a qualified server-issued
redirect, not of a human clicking a button.** Its `Sec-Fetch-User: ?1`
requirement removes ordinary script requests and much automated direct access,
but browser automation, repeat requests and requests discovered outside the
visible CTA can still reach `/api/out`. Some compatible headerless browsers
may be omitted. Client beacons can be missing independently. Count server
receipts separately from browser CTA intent; neither count proves arrival at
the provider or a sale.

The commercial funnel report therefore withholds visitor CTR and CTA-to-redirect
completion rates, including provider, artist, page-type and landing-page rates.
The full populations have no reliable shared browser-intent identity. A larger
sample, equal aggregate counts, or a ratio below 100% does not fix that problem.
The approximate visitor-day landing join is not a count of converting sessions.

Consented ordinary browser CTA activations can additionally carry a fresh
128-bit `browserIntentId` to TTC's analytics beacon and `/api/out`. It is not
a visitor ID, is never stored in a cookie, and is not forwarded to a provider
or Impact. The server's independently generated `click_id` and existing
SubId1 stay unchanged. The native CTA link is restored after activation;
denied consent, no JavaScript, synthetic and middle-click paths remain unjoined.
The report's `browser_intent_join` counts only token groups with exactly one
client intent and one redirect, matching provider/event (or a non-empty matching
artist for artist-level links without an event) and a five-minute
maximum time span. Duplicates, blocked paths, mismatches and incomplete groups
are reported separately. This partial correlation does not prove a human,
provider arrival or purchase, and does not unlock visitor conversion rates.
Both the normal route shell and fallback app bundle attach this token.
`by_client_page` honors the report’s `--top` and `--min-clicks` thresholds and
groups only accepted matches by client-reported source page,
tab landing page and provider. It exposes event counts without random tokens.
These page associations are not verified Google acquisition or unique users;
missing landing paths remain unknown rather than being inferred from redirects.

For JSON compatibility, existing `provider_clicks` fields still count server
redirects and the legacy conversion-rate fields remain present as `null`.
`measurement` declares the counting basis, withholding reason and approximate
landing attribution. `qualified_affiliate_clicks: null` means unknown, not zero.
Shares within the same server-receipt population (provider share and affiliate
share) remain valid descriptive ratios. Raw receipt rankings are investigation
leads, not evidence of a page's human conversion rate or commercial value.

`outbound_blocked` is a click that reached `/api/out` and did not get a
redirect: an Impact tracking failure, a provider switched off, or a destination
that no longer validates. Without it a broken lane looks merely unpopular. It is
deliberately limited to provider and configuration failures — malformed or
probing requests are not demand signal and are not recorded.

`outbound_attempt` is the server receipt before resolution. It is included for
traceability, but is never added to success or blocked totals.

### Server-event writer protection does not prove human activity

`/api/analytics` is a public, unauthenticated endpoint, and the report
identifies an authoritative click purely by `event_name = 'outbound_click'`.
All three server-only events are therefore rejected by that endpoint's
allow-list: posting `outbound_attempt`, `outbound_click` or `outbound_blocked`
to it returns `400` and writes nothing. `/api/out` is the only writer of them.

The client events that remain open — `page_view`, `artist_view`, `event_view`,
`provider_cta_view`, `provider_click` — are indicative browser telemetry. An
automated browser request can still invoke the legitimate `/api/out` writer and
create a qualified redirect receipt. Protecting event names and requiring the
browser-controlled navigation signal reduce injection and direct-request noise;
they do not authenticate a human or make conversion rates safe.

## Lizzy McAlpine price-guide measurement baseline

Reviewed **2026-10-02**; compare again around **2026-10-30**, allowing about
28 days after the PR deploys. Target URL:
`/artists/lizzy-mcalpine/ticket-prices`. These are the owner's supplied query
export figures, not public page copy or page-filtered performance. The export's
date range, country/device/search-type filters and query-to-page mapping were
not supplied; record them before comparing equivalent reporting windows.

| Query | Clicks | Impressions | CTR | Average position |
| --- | ---: | ---: | ---: | ---: |
| lizzy mcalpine ticket prices | 5 | 511 | 1.0% | 9.3 |
| lizzy mcalpine tour prices | 2 | 113 | 1.8% | 7.6 |
| how much are lizzy mcalpine tickets | 2 | 606 | 0.3% | 9.6 |
| lizzy mcalpine tour ticket prices | 1 | 94 | 1.06%* | 9.1 |
| lizzy mcalpine concert ticket prices | 1 | 35 | 2.86%* | 9.1 |
| Cluster total | 11 | 1,359 | 0.81%* | ~9.27* |

\* Calculated from the supplied counts; cluster position is weighted by
impressions using rounded query positions, so it is approximate.

Before editing, at repository commit `bc1df812`, the target returned **404,
noindex,follow**, with title “Page Not Found | TourTicketCompare”, description
“This TourTicketCompare page is not published.” and no introductory answer.
The artist route returned **200, index,follow**, canonical
`https://tourticketcompare.com/artists/lizzy-mcalpine`, title “Lizzy McAlpine
Tickets 2027 | Compare Prices & Tour Dates” and H1 “Lizzy McAlpine tickets and
tour dates”. Oasis's existing guide returned **200, index,follow** with its
own canonical. Baseline HTML was rendered before editing using the repository
asset fixture; this is a local route audit, not a production observation.

Lizzy qualified at 08:32 UTC: 24 upcoming dates in 24 cities, 21 publishable
dates and 18 snapshot-ready dates, exceeding the existing 6-date / 2-city /
3-snapshot-ready thresholds. Her auto-promoted artist also exceeded its
3-upcoming-date gate. Snapshot readiness is verified event/provider provenance,
not evidence that a fresh numeric cache row exists. Production D1 was not
accessible in this workspace; its local cache and history were empty. No live
numeric price, price-history or commercial-intent baseline is asserted.

In a temporary source copy with only registry approval applied, the original
template would have generated title “Lizzy McAlpine 2027 Ticket Prices: Resale
& Tour Dates”, description “Lizzy McAlpine 2027 ticket prices: face value,
each date's latest listed resale price and recent price moves.” and lead:
“TourTicketCompare tracks 24 upcoming Lizzy McAlpine dates in 24 cities (Wed,
Feb 3, 2027 to Sat, Jul 17, 2027). This page covers what those tickets cost:
where face value is sold, the lowest listed resale price for each date, and
how those prices have moved.” Its tables followed the at-a-glance and
face-value sections. This hypothetical render distinguishes template changes
from the actual pre-change 404.

After deployment, confirm the guide's canonical, indexing eligibility and
fresh provider coverage. Re-export these exact five queries with the same
filters and equivalent date-window length, reviewing both the entire cluster
and query × page results for this guide and the artist page. Compare
impressions, position, clicks and CTR; do not attribute a query-only change
to the new page without its page mapping. Keep the deployment date and
Search Console indexing lag alongside the results.

For outbound provider intent, use existing `provider_click` telemetry filtered
to this guide's `source_path`, `artist_slug=lizzy-mcalpine`,
`page_type=artist_price_guide` and `cta_location=price_guide`. Report
`outbound_click` successes and `outbound_blocked` separately with the same
dimensions; inspect artist-page `event_card` intent separately for visitors
who followed “Compare this show”. Do not claim joined visitor conversion,
provider arrival, orders or commission from these counts. Capture the first
post-deployment 28-day window; the pre-publication guide has no comparable
visitor baseline, and absence of access is unknown rather than zero.

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
| ↳ *allowed values* | `CTA_LOCATIONS` in `functions/_funnel.js` | `event_card`, `artist_provider_panel`, `artist_page`, `empty_state`, `comparison_hub`, `guide_provider_pair`, `venue_card`, `city_card`, `artist_city_answer`, `price_guide`. Anything else is discarded rather than stored — the value arrives on a query string and is attacker-controllable, so the column stays low-cardinality by construction. `price_guide` is the per-date price tables on an artist price guide (`/artists/<artist>/ticket-prices`, page type `artist_price_guide`). `artist_city_answer` is the per-date price answer at the top of an artist-city page; it is its own surface rather than `event_card` so its contribution to marketplace clicks can be read separately from the show board underneath it. |
| Destination category | `destination_category` | the host actually redirected to |
| Affiliate status | `is_affiliate` | the host actually redirected to, not the provider's lane — a tracking response that resolves to a direct provider URL is genuinely unmonetized and is recorded as 0. A blocked click has no destination, so it falls back to the lane the visitor was trying to use |
| Referrer / acquisition | `referrer`, `acquisition_source` | external referrer origin, **session entry row only**; `NULL` on every later event in the visit |
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
the **same visitor key on the same day**, collapsing that visitor-day to its
earliest `page_view` first so one click stays one click however many pages the
visitor saw. That join is the weakest link in the report — see *Attribution
limits*.

`acquisition_source` is written only on the row that actually carries a referrer
or UTM values — the session's entry `page_view`. Later events in the same visit
leave it `NULL` rather than claiming to be `direct`, so read acquisition by
joining back to the entry row, never by filtering clicks on it.

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

`npm run report:funnel` (the older provider/CTA-location report) still exists.
Since 2026-09-25 it also splits `provider_click` on dates that show the
"Lowest listed" badge: `metadata.lowestListed` is `lowest` when the badged lane
was clicked and `other` for any other lane on that date, and is absent on dates
without a badge, so the split compares the badged lane only with its own
neighbours. Like every `provider_click` figure it is intent, not an outbound
count; the authoritative `/api/out` row does not carry it.

`npm run report:web-vitals -- --days 28` is the separate read-only mobile
performance report. It groups numeric TTFB, FCP, LCP, and LCP render delay by
fixed route template and navigation type, and marks every group with fewer
than 75 samples as provisional. The browser beacon never sends selectors,
element text, resource URLs, or search queries.

### Minimum volumes

Traffic diagnostic tables use **≥ 30 recorded views** and receipt rankings use
**≥ 3 server redirects** by default (`--min-views`, `--min-clicks`). These floors
do not establish human activity. Visitor conversion and completion rates remain
withheld at every sample size until a reliable joined measurement exists.

### Report sections

| Section | Reads as |
|---|---|
| Funnel | Separate counts of browser telemetry, server attempts, redirects and blocked requests |
| Server redirects by provider | Receipt volume and failure counts; not verified human activations |
| Server redirects by artist | Artists associated with redirect requests; not profitability |
| Server redirects by page type | Source-path distribution across artist, city, venue and guide pages |
| Server redirects by CTA component | Recorded component labels; not a conversion experiment |
| Affiliate vs non-affiliate | Share of issued redirects pointing to affiliate destinations |
| Approximate landing attribution | Visitor-day join for investigation, not exact journey attribution |
| Pages with recorded views but no redirects | A candidate for CTA, coverage or telemetry investigation |
| Artists with redirects and weak coverage | Receipt activity alongside ≤1 affiliate provider or affiliate links on under half of upcoming dates; validate human demand before prioritising |
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

The read-only report also exposes a reconciliation table by provider:

```bash
npm run report:commercial-funnel -- --since 2026-08-01 --until 2026-09-01 --json
```

It includes legitimate TTC attempts, successful redirects, blocked redirects,
affiliate redirects, GA4-eligible CTA events, and Impact-reconcilable click
IDs. An ID is reconcilable only when the click ID was actually propagated into
the outbound Impact base-tracking URL; default-off SubID rows, API-generated
TrackingLinks rows, and historical rows are not counted. These figures are expected to differ: TTC records a server-issued
redirect, GA4 records the CTA action, and Impact records what arrived at its
network.

A persistent gap in one direction is worth investigating; day-to-day variation
of a few clicks is not.

### Per-click reconciliation (optional, flag-controlled)

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

### SubId verification procedure (owner, one-time)

`OUT_CLICK_ID_SUBID_ENABLED` defaults off in the handler. Confirm the parameter
before enabling; the reporting match is verified after a controlled deployment:

1. Confirm with Impact that `subId1` (the default `OUT_CLICK_ID_SUBID_PARAM`)
   is the correct passthrough parameter name for these campaigns.
2. Set `OUT_CLICK_ID_SUBID_ENABLED="true"` in `wrangler.toml` `[vars]` and
   deploy.
3. Click one live provider CTA end to end.
4. In Impact's dashboard (or via `npm run report:affiliate-performance`, see
   below), find the resulting click/action and confirm its `SubId1` matches
   the `click_id` this site wrote for that click (readable from the
   `analytics_events` row, or from the `report:affiliate-performance` output's
   `sub_id_attribution.matched_orders` once a matching action clears).
5. Allow the report's stated processing delay before treating an absent row
   as a mismatch. The dashboard warns that clicks from the last three hours
   may be absent. Use **Performance by Sub ID and Shared ID** for the relevant
   provider; a Ticketmaster-specific report cannot verify a Vivid Seats click.
6. If the SubId still does not appear after reporting catches up, set the flag back to `"false"` — nothing
   else depends on it — and stop; do not guess at a different parameter name
   without confirming it with Impact first.

## Affiliate performance (Impact Actions x TTC clicks)

`npm run report:affiliate-performance` is a **separate** report from
`report:commercial-funnel`. It answers a different question: not "how much
on-site traffic did we get," but "what did Impact do with the clicks we sent
it." It reads Impact's own read-only Publisher API
(`GET /Mediapartners/{AccountSID}/Actions`) — orders, order state
(pending/approved/reversed), commission (`Payout`), and campaign — for the
same window, keyed to a provider by `CampaignId`, and joins that against this
site's own authoritative `outbound_click` count per provider from D1.

```bash
npm run report:affiliate-performance                      # last 30 days
npm run report:affiliate-performance -- --days 7
npm run report:affiliate-performance -- --since 2026-08-01 --until 2026-09-01
npm run report:affiliate-performance -- --json
npm run report:affiliate-performance -- --self-test        # no network, no D1, no Impact call
```

Requires `IMPACT_SEATGEEK_ACCOUNT_SID` / `IMPACT_SEATGEEK_AUTH_TOKEN` in the
environment (the same read-only Impact Publisher API credentials
`functions/api/out.js` and `functions/api/impact/*` already use server-side)
plus `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID` for the D1 read. Every
Impact call is a `GET`; every D1 statement is a `SELECT`. It never creates a
tracking link and never writes anything, in Impact or in D1.

What it reports per provider: TTC outbound clicks, Impact actions split by
state (approved/pending/reversed), commission earned (approved `Payout` only —
pending payout is shown separately and is not yet earned), same-window
actions/click and approved-payout/click ratios against **our own**
`outbound_click` count, eligible click IDs, and a daily trend of actions and
payout. These are activity ratios, **not an attributed booking conversion
rate**: actions can follow clicks from an earlier window or another source.
The JSON keys `conversion_rate` and `earnings_per_click` remain for compatibility;
`ratio_basis` makes that limitation explicit. Ticketmaster is never queried — it has no Impact program.

**What it still cannot show, and why:** an aggregate Impact-side click count.
The Impact Partner API's `Clicks` resource retrieves one click by its own ID
only (`GET /Mediapartners/{AccountSID}/Clicks/{Id}`); there is no
list/filter-by-date-range endpoint. A true Impact-side click total requires
either the Impact dashboard UI or Impact's asynchronous `ReportExport` job
flow, both out of scope for this script. Use the manual reconciliation
procedure above (*Reconciling with affiliate dashboards*) for that number.

Per-order attribution (`sub_id_attribution.matched_orders`, in `--json`) now
requires a valid TTC `SubId1`, exactly one retained server `outbound_click`,
`impact_reconciliation_eligible = 1`, and agreement between the action's
mapped campaign and the click's provider. Matching rows include artist, local
event ID, click timestamp, source page, CTA placement, action state, payout and
currency. Pending/reversed actions retain their state and are not promoted to
earned commission.

The lookup uses the existing `click_id` index in batches of 100 IDs from the
returned Impact actions. It searches retained click history rather than only
the action-report window, with no 5,000-click cutoff. Provider click totals
still use the requested reporting window. Duplicate stored IDs are ambiguous
and are never arbitrarily assigned.

Coverage is explicit: `coverage` counts missing or invalid SubId1, missing or
ambiguous click rows, unverified passthrough, unmapped campaigns and provider
mismatches. `ttc_reconcilable_clicks` counts recorded passthrough in the click
window; it does not prove arrival at Impact. No-match counts do not mean zero
bookings. The report no longer claims a local shell flag describes production:
a historical verified match remains valid after passthrough is switched off.
Historical NULL eligibility is not backfilled or inferred.

**Rollout evidence (1 October 2026):** Impact's [Sub ID documentation](https://help.impact.com/partner/what-would-you-like-to-learn-about/platform-features/tracking/tracking-links/link-parameters/sub-id-and-shared-id-parameters-explained-for-partners)
explicitly supports Sub IDs on all Impact tracking links, including vanity
links, and gives `?subId1=test` as its parameter example. This establishes the
parameter name for the existing Impact base links; it does not prove a live
TTC ID appears in reporting. The owner authorized enabling the existing
passthrough in [PR #1243](https://github.com/olstaylor/tourticketcompare/pull/1243).

A controlled Chrome redirect on 1 October reached the correct Vivid Seats
event and produced one stored receipt with reconciliation eligibility set.
At **11:23 UTC (12:23 BST)**, the account-wide **Performance by Sub ID and
Shared ID** report, filtered to 1 October and the exact stored click ID,
displayed one Vivid Seats row with **1 raw click and 0 actions**. The SubId1
matched the eligible TTC receipt. This verifies parameter preservation and
network receipt for the controlled Vivid Seats base-link path, not every
provider campaign. The unfiltered report showed **0 Clicks** for that ID;
do not turn its raw-click receipt into a qualified visitor or conversion rate.

The earlier no-row check used a Ticketmaster-specific report and cannot
establish Vivid Seats compatibility. A separate diagnostic ID appeared in
Impact but had no stored TTC receipt, so it is excluded from reconciliation.
Both visits were internal tests with no purchase.

A separate controlled Chrome redirect at **14:54 UTC (15:54 BST)** reached
the matching SeatGeek Olivia Rodrigo event at Capital One Arena in Washington
for 3 October 2026. It produced exactly one stored eligible TTC receipt.
At **15:36 UTC (16:36 BST)**, the same account-wide report, filtered to
1 October, Program All and the exact stored SubId1, displayed exactly one
SeatGeek row: **1 Raw Click, 1 Click and 0 Actions**. This verifies parameter
preservation for the tested SeatGeek base-link path. The positive match arrived
within the reporting-delay window, so no further absence check is needed for
this test. Exclude this internal click from customer performance, regardless
of Impact's Click classification. The visit opened the rendered CTA URL;
it did not verify a measured client CTA activation or intent/receipt join.

No customer order join, client-intent identity or human conversion-rate
denominator is established by these checks. Remaining provider paths are
unverified; retain the flag-off
rollback for a confirmed mismatch after reporting catches up.

Supply the correct campaign IDs when running the report, especially SeatGeek
and Vivid Seats (no defaults).
The report currently joins **SubId1 only**; other configurable fields such as
SubId2 or SharedId and the API-generated TrackingLinks path are not covered.
This change does not enable tracking, alter marketplace URLs, add a migration,
or introduce an import/store of booking data. Results describe actions returned
by the existing Impact Actions reader; no live booking was verified by the
local fixture tests.

Run `npm run test:affiliate-attribution` for the redirect-to-SQLite-to-action
fixture checks (including fail-closed destinations and default-off tracking),
and `npm run test:funnel-analytics` for the broader existing click contract.
Both are in `test:mvp`.

## What cannot be measured

**Checkout happens on the provider's site. We never see it directly.** The
site's own first-party analytics has no visibility into, and must never claim:

- whether a click became a purchase
- how many tickets were bought, at what price, or with what fees
- refunds or chargebacks
- anything a visitor does after the redirect, beyond what Impact reports back
  at the order level (state, payout, campaign, and — only once
  `OUT_CLICK_ID_SUBID_ENABLED` is verified — the click that referred it)

The `report:commercial-funnel` funnel therefore ends at "left the site through
a monetized link", and it will never print a conversion or revenue figure —
**do not add one to it.** `report:affiliate-performance` (above) is the one
place order state and commission appear, sourced solely from Impact's own
account data, run manually by the owner; it is not part of the public site,
is not displayed to visitors, and does not feed back into rankings, CTA
ordering, or any public page.

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
  but their CTA activation can still produce an `outbound_click`. Automated
  requests can also produce receipts without page views. The size of the gap
  is unknown; the report does not convert it into a visitor conversion rate.
- **Acquisition is captured once per browsing session** and only when the
  referring site sends a referrer. Direct, app-based and privacy-stripped
  referrers all appear as `direct`.
- **Historical rows predate these dimensions.** Rows before the 0008 migration
  have `NULL` for every new column. Per-artist view counts use `page_view`
  rows carrying an artist slug — a column that has always existed — so that
  that field remains available across the history. This does not establish a
  comparable human-traffic population. Counts before
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
- GA4 receives a **mirror** of `artist_view`, `provider_cta_view`, the legacy
  `provider_click` intent as one `outbound_click` event, and `email_signup` with low-cardinality parameters only
  (page type, artist slug, provider, CTA location, affiliate flag, and
  `lowest_listed` on clicks from a date showing the "Lowest listed" badge). No event id,
  city, venue, path, referrer or address is ever sent to GA4. GA4 cannot see the
  server-side outbound redirect at all, which is why first-party D1 remains
  authoritative. Since 2026-09-25 GA4 (via GTM) loads only for visitors who
  accept cookies (`public/consent.js`), so GA4 counts are a consenting subset;
  the first-party beacons are not consent-gated and still see every visit.

## Deployment

The migration is additive and the writers fall back to the previous column set
when it has not been applied, so code and migration can land in either order:

```bash
npx wrangler d1 execute tourticketcompare-demand --remote \
  --file migrations/0008_analytics_commercial_funnel.sql
```

See [migrations/README.md](../migrations/README.md) for the applied-state
record.
