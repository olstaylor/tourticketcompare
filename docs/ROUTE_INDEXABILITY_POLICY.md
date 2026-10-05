# Route usefulness and indexability policy

The rule for deciding which TourTicketCompare URLs are offered to search
engines, which stay available to visitors without being indexed, and which are
redirected or 404'd.

Implemented in [`functions/_route-indexability.js`](../functions/_route-indexability.js),
which holds the thresholds, the shared publishability test, and the exclusion
reason codes. The router, sitemap, `llms.txt`, the internal-link audit, the
roster forecast, and the indexable-surface monitor all read that one module.
**Change the module and this document together.**

Live counts belong in `PROJECT_STATUS.md`, not here.

---

## The principle

A URL is indexable when a searcher landing on it cold gets an answer that page
is uniquely placed to give. Everything else stays a real page for the visitor
who navigates to it, and stays out of the index.

Three rules follow from that, and they are the reason each gate is shaped the
way it is:

1. **Indexability is derived, never listed.** Every gate reads the same
   reviewed `events.json` records the page renders from, so a route qualifies
   or stops qualifying purely because its data changed. Expiry and recovery
   both self-heal, in both directions, with no maintained allowlist.
2. **Failing a gate is not a reason to remove a page.** The gate controls
   robots meta and sitemap membership. A visitor who clicked a link still gets
   the page they asked for.
3. **No word-count thresholds, and no filler to clear one.** Every gate counts
   things that are true about the inventory — distinct upcoming dates, distinct
   artists, a reachable ticket destination. Padding a page to look substantial
   is forbidden by `docs/CONTENT_RULES.md` and would defeat the purpose of the
   gate anyway.

---

## Comparison data (2026-10-05)

Every aggregation route — city, venue, artist-city and price guide — tells a
searcher it compares ticket options. A listed-price comparison is only ever
same-event (`docs/PROVIDER_DATA_POLICY.md`), so such a route is indexable only
while **at least one of its publishable upcoming dates carries verified,
URL-bearing provenance on ≥ 2 listed-price lanes**
(`COMPARISON_MIN_PRICE_PROVIDERS`, `eventPriceComparable` in
`functions/_route-indexability.js`). The lanes are the ones with price display
rights: Vivid Seats, TicketNetwork and StubHub International
(`PRICE_SNAPSHOT_PROVIDERS`). SeatGeek has no snapshot lane and Ticketmaster is
a link source, so neither counts.

**Date count never substitutes for it.** A run of dates with one price lane,
or none, is a templated schedule rather than a comparison. A route that fails
this condition renders `noindex,follow` with exclusion code
`no_price_comparison`, leaves the sitemap and `llms.txt`, and stays linked.
It returns to the index automatically when a second price lane is verified on
any of its dates.

Like the price-guide snapshot test, the condition is **static readiness** read
from `events.json`, not whether D1 served a price on this render, so an expired
cache row cannot flip a page in or out of the index.

**Not applied to artist pages.** The artist page is the canonical hub that
every other route defers to (see "keep one canonical" below), and it stays
indexed between tours by owner decision (2026-09-24). Event pages already
require a snapshot lane and are governed by the frozen pilot.

**Why now.** Adopted during Google's September 2026 spam update (rollout began
2026-09-24), when scaled, templated pages are the main risk. The measurement
plan and dated change log are under Monitoring → "Google September 2026 spam
update" below.

### Keep one canonical where routes answer the same query

Two more conditions, adopted the same day, stop two URLs carrying the same
answer:

- **City vs venue.** A city whose every upcoming show is at one venue lists
  exactly what that venue page lists. The venue page is the precise one, so a
  city page needs ≥ 2 venues (`CITY_MIN_VENUES`, code `below_venue_threshold`).
- **Artist-city vs artist.** When every upcoming show the artist has is in one
  city, the artist-city page repeats the artist page. It needs the artist to be
  playing ≥ 2 cities (`ARTIST_CITY_MIN_ARTIST_CITIES`, code
  `duplicates_artist_page`).

Both pages stay live, `noindex,follow` and linked, and recover on their own
when the data changes.

## Per-route decisions

### Artist — `/artists/<slug>`

**Indexable when** the editorial record is `indexable_with_substantial_content`
**and** the artist has at least one tracked date, upcoming or past
(`countTrackedShows`, owner-approved 2026-09-24). Upcoming shows are **not**
part of this gate for an owner-promoted artist: a finished tour keeps its
index entry. An artist that has never carried a date renders the same empty
board but as `noindex,follow`, out of the sitemap and `llms.txt`, and indexes
the day its first date lands — a page whose only content is "no dates" is what
search engines classify as a soft 404.

**Auto-promoted artists** (`promotion_source: "auto"` in `artists.json`, set
only by the automated promote lane) are the one exception: they are indexable
only while they carry at least `AUTO_PROMOTED_MIN_UPCOMING_SHOWS` (3) upcoming
dates. Below that the page stays live as `noindex,follow` and leaves the
sitemap and `llms.txt`. It is **never demoted** on this count — the record,
its CTAs and its URL are unchanged, and the page returns to the index when
dates land. No human editorial judgement stands behind these pages, so the
count is what keeps automated promotion from producing thin pages at scale.

Gate lives in
[`functions/_artist-indexability.js`](../functions/_artist-indexability.js),
whose `artistPageIndexable()` takes the `artists.json` record (or, for older
callers, its status string, which can never be auto-promoted).
`functions/sitemap.xml.js` and `functions/llms.txt.js` call the same function
with `events.json`, so an artist page's sitemap membership matches its robots
meta. Client hydration keeps the
server's robots verdict for auto-promoted artists rather than recomputing it.

An artist URL is a durable destination. Future-date availability is
presentation state, not a reason to noindex: the same URL fills again when a
new verified date lands, and dropping it out of the index in the gap would
discard the authority it had accumulated for a query
("<artist> tickets") that does not stop being asked between tours. An artist
with no upcoming shows renders an explicit empty-state board — no upcoming
dates, no event-level buttons, and one artist-level button to the top-ranked
checked provider's artist page — plus its ten most recent tracked dates,
labelled as past (restored 2026-09-24), and, if owner-promoted with any
tracked date, stays `index,follow`, in the sitemap. Such an artist also carries an empty `[]` partition, so its route
never falls back to parsing the full `events.json`.

This is the one route type the calendar does not decay, and it is deliberate.
The location gates below all count upcoming inventory, because a city or venue
page with nothing on is genuinely answerless; an artist page is not.

`artistHasUpcomingShow()` in the same module is a **presentation** helper, not
an indexability gate. It drives the page title wording and the
upcoming/dormant split in artist listings. Do not reach for it when deciding
robots meta.

### City — `/cities/<city-country>`

**Indexable when** all of these hold:

| Requirement | Value | Why |
|---|---|---|
| Upcoming tracked shows | ≥ 4 | Enough breadth that the page is not a restatement of one artist page |
| Distinct artists | ≥ 2 | A single-artist city page *is* the artist page filtered by city |
| Distinct venues | ≥ 2 | A single-venue city page *is* the venue page (`below_venue_threshold`, 2026-10-05) |
| Shows with a publishable ticket destination | ≥ 1 | A page titled "concerts in X" that can lead nowhere cannot serve its own purpose |
| Shows with ≥ 2 listed-price lanes | ≥ 1 | Comparison data, above (`no_price_comparison`, 2026-10-05) |

The destination requirement is the part this policy added. "Can lead somewhere"
means what the renderer means by it: a row whose own verification status is
publishable, **or** one carrying an independently verified marketplace
destination with a stored URL. That second case is not marginal: when the
policy was written, the Arlington, Houston and Sunrise pages consisted entirely
of `needs_recheck` rows carrying verified SeatGeek links, and every one rendered
a working CTA. Testing the row status alone would have de-indexed those pages
while their buttons still worked.

Which pages the requirement currently excludes moves with the calendar and is
not recorded here — see `PROJECT_STATUS.md` for the live route surface and
`reports/indexable-surface/` for per-route exclusion reasons.

A city page must stay explicit that coverage is selective — it is not a local
concert calendar. That disclosure is visible on the page, not only in the FAQ.

### Venue — `/venues/<venue-city>`

**Indexable when** all of these hold: ≥ 3 upcoming tracked shows, ≥ 2 distinct
artists, ≥ 1 show with a publishable ticket destination, and ≥ 1 show with
≥ 2 listed-price lanes (comparison data, above).

The bar is one show lower than a city's because venue intent is narrower and
venue inventory turns over faster. The destination requirement is identical and
was added for the same reason.

### On-sale calendar — `/on-sale`

**Indexable when** it lists ≥ 3 dates across ≥ 2 distinct artists
(`ONSALE_CALENDAR_MIN_SHOWS`, `ONSALE_CALENDAR_MIN_ARTISTS`, `onsaleCalendarGate`).
A date is listed when its show is still ahead and its Ticketmaster
`public_onsale_at` falls in the next 60 days or the last 7. An on-sale more than
a year out is treated as Discovery's "to be announced" placeholder and never
listed.

The page adds one fact the artist pages already show, grouped by day, so its
value is breadth: one artist's run is the artist page again. There is no
destination requirement because the page links only to artist pages, never to
a ticket site. Below the bar it renders `noindex,follow` and leaves the sitemap
and `llms.txt`; it never 404s.

### Artist-city — `/artists/<artist>/tickets/<city>`

This is where the policy makes its substantive change.

| Situation | Response |
|---|---|
| Artist editorially indexable **and** ≥ 2 publishable upcoming shows in the city **and** ≥ 1 of them with ≥ 2 listed-price lanes **and** the artist plays ≥ 2 cities | **200, `index,follow`**, self-canonical, in the sitemap |
| Artist editorially indexable **and** exactly 1 publishable upcoming show, no date with two price lanes, or the artist's only city | **200, `noindex,follow`**, self-canonical, not in the sitemap, still linked |
| Real footprint in that city but no publishable upcoming show, or artist under review | **301 to `/artists/<artist>`** |
| Anything else | **404** |

**Why a single date is not indexable.** The page renders one show card. Every
fact on it — the date, the venue, the provider destinations, the price snapshot
— is already on the artist page, in the same rendered component. There is no
fact it is uniquely placed to give, and the artist page is the stronger
canonical for the same query. Before this policy, 128 of 210 indexable
artist-city pages were single-date.

**Why `noindex` and not a redirect.** A visitor who clicks "Denver" from the
artist page wants the Denver date, and a redirect would bounce them back to
where they came from. There is no user-value case for the redirect, so the
route stays a 200. It keeps a self-referencing canonical — pointing the
canonical at the artist hub would be a conflicting signal on a page that is
already telling crawlers not to index it.

**Why it stays linked.** A `noindex` page nothing links to can never be
re-crawled, so the `noindex` never reaches the crawler and an
already-indexed URL lingers. Every single-date combination keeps its inbound
link from its artist page's by-city section; `scripts/audit-internal-links.mjs`
fails if one loses it.

**Why the threshold counts publishable shows, not dates.** A second date whose
CTA is suppressed adds a row to the board but no second comparable ticket
option, so it does not make the page more useful than the artist page.

**Recovery is automatic.** The moment a second date in that city is verified,
the page flips to `index,follow` and re-enters the sitemap on the next deploy.

### Event — `/events/<slug>-<key>`

**A frozen 30-page pilot is indexable; nothing else is.** Every event page
has a self-referencing canonical. It renders `noindex,follow` and is absent
from every sitemap and `llms.txt` unless it is an *active pilot member* (below):
one of the 30 stable keys frozen on 2026-09-27, eligible right now, on the
canonical host with `EVENT_PAGES_INDEXING="pilot"`. The artist, artist-city,
city and venue boards link each served date's page ("Show details") exactly as
before — pilot and non-pilot alike, with no extra links to pilot pages — so the
experiment measures the existing architecture; the internal-link audit never
counts an event page as an orphan for being noindex.

Four states are kept apart:

| State | Meaning | Decided by |
|---|---|---|
| Addressable | The canonical path serves 200: a genuine performance TTC can describe | `resolveEventRoute` (`functions/_event-pages.js`) |
| Commercially live | Ticket links may be shown today | `eventRouteState().commerciallyLive` |
| **Eligible for indexing** | Strong and safe enough that it *could* be indexed | `eventIndexabilityDecision` (`functions/_event-indexability.js`) |
| **Actually indexable** | Renders `index,follow` and is in a sitemap | eligible **and** the rollout gate — the active pilot, `deriveEventIndexingPilot` |

An event page can be eligible and still `noindex`: eligibility is a standing,
explainable verdict; indexing is a separate, deliberate rollout.

**Eligible when** every condition holds (a page that fails any is listed under
each reason it fails):

| Condition | Reason code when it fails | Why it exists |
|---|---|---|
| Canonical path serves 200 | `not_addressable` | A 404 or a 301 is never a page to index |
| Parent artist page is itself indexable (`artistPageIndexable`) | `artist_not_indexable` | An event page never outranks an artist TTC has not approved, or an auto-promoted artist below its own bar |
| Upcoming | `not_upcoming` | A past event 301s; listed for completeness |
| Not held: cancelled, postponed or an unrecognised Ticketmaster status | `lifecycle_held` | The page shows no ticket link; a rescheduled date (validated new date) is not held and may qualify |
| Commercially live | `not_commercially_live` | Not held but nothing to click yet (pre-on-sale, no resale link) |
| A genuine performance, not an upsell listing | `non_performance` | Premium seats, boxes, packages are not the concert |
| The page carries a valid `MusicEvent` (`eventPageSchemaDecision`) | `no_event_schema` | An indexed event page should be the canonical, machine-readable description of one performance. This excludes a pre-on-sale date and a resale-only record, exactly as the parent boards' schema does |
| ≥ 2 publishable ticket destinations (`EVENT_MIN_PUBLISHABLE_DESTINATIONS`) | `below_destination_threshold` | The page's reason to exist beside its artist page is a comparison for exactly this date; one destination (in practice: Ticketmaster alone) is the parent card restated |
| ≥ 1 snapshot-ready lane (`EVENT_MIN_SNAPSHOT_READY_LANES`) | `no_snapshot_ready_lane` | The event page's other unique content is this date's listed-price snapshot, recorded low and price move, which only a snapshot lane can ever supply |
| No duplicate ambiguity | `duplicate_ambiguity` | TTC must be able to say this row *is* the performance, not one of two rows for it |

Codes are stable: `npm run report:event-routes` and the audit group by them,
so add a code rather than renaming one.

**Stable signals only.** Eligibility is built from canonical data — the route,
lifecycle, `events.json` provider provenance, the CTA gate's publishable lanes
(offline: `scripts/lib/event-link-coverage.mjs`, the mirror of
`serverShowCtaSpecs`, never a second copy of the rules) and repo
configuration. It never reads D1, a cached price or a live API. *Snapshot-ready*
means the event has a **publishable** lane among the owner-approved price lanes
(`PRICE_GUIDE_SNAPSHOT_PROVIDERS`: Vivid Seats, TicketNetwork, StubHub
International) with **verified provenance and a stored URL for this exact
event** — structurally able to carry a TTC-approved listed-price snapshot. It
does not mean a fresh numeric price is cached right now. An expired cache row, a
failed provider call or D1 being unavailable cannot flip a page in or out of the
index; losing provenance, a lifecycle change or losing canonical provider
coverage can, and should. The two time-dependent conditions (upcoming, the
public on-sale) change only as the calendar passes a stored instant.

**Decisions taken with the data (2026-09-27, 1,719 served pages).** Measured
policies, each adding one condition to the last: minimal (served, artist
indexable, not held, performance, ≥ 1 destination) 1,687; + ≥ 2 destinations
1,377; + snapshot lane 1,346; + valid `MusicEvent` 1,309; + no duplicate
ambiguity 1,302 (75.7% of served pages, 66 of 73 artists) — the rule above.

- *≥ 2 destinations* removes 310 pages, 307 of them Ticketmaster-only. Kept.
- *Snapshot lane* removes 31 more, every one SeatGeek + Ticketmaster (one also
  Ticket Liquidator): two real destinations, but no price the page could ever
  show. Kept, because a price snapshot is what the event page adds over its
  parent card.
- *Valid `MusicEvent`* removes 37 more: 32 pre-on-sale dates with live resale
  links (each qualifies on its own the moment its stored public on-sale passes)
  and 5 resale-only records with no Ticketmaster source. Kept: an indexed event
  page that cannot describe its own event is a weak page to put in front of
  Google.
- *No duplicate ambiguity* removes 7 more.
- *≥ 3 destinations* was not adopted: it would drop 148 strong two-lane pages
  (mostly Vivid Seats + Ticketmaster, a common international shape) for no
  safety gain.

**Duplicate ambiguity.** `deriveEventDuplicateGroups` finds two kinds of group
and classifies each; no row is ever merged, rewritten or deleted:

| Group | Classification | Effect |
|---|---|---|
| Same artist, city, venue-local date; every other row a non-performance listing | `non_performance_variant` | None: the concert row is unambiguous |
| Same date; an extra row named `<the concert's name> \| …` (a hospitality or lounge add-on the classifier does not name) | `add_on_variant` | The add-on row is excluded; the concert row is not |
| Same date; rows share a start instant or a provider listing | `same_performance` | Every row excluded |
| Same date and venue, start times ≥ 3 hours apart, nothing shared | `distinct_performances` | None: a matinee and an evening show |
| Same date, anything else | `ambiguous` | Every row excluded |
| Rows on different dates claiming one verified provider listing id | `shared_provider_listing` | Every row excluded: at least one is mapped to the wrong night |

**Artist-city relationship** is reported, never a gate. A date whose
artist-city page is `noindex` (single date) is where the event page adds most:
it is the precise leaf while the thin city page stays out of the index.

**Rollout: the frozen pilot (2026-09-27).** An event page renders
`index,follow` (the site's indexable robots string) only when **all** hold:

1. it is eligible now (`eventIndexabilityDecision`, the rule above, counted on
   the router's own CTA gate — `eventPublishableLaneSlugs`);
2. `EVENT_PAGES_INDEXING` is exactly `"pilot"` — compared as written, so
   `"PILOT"` or `" pilot "` is off (repo-managed in `wrangler.toml` `[vars]`;
   any other value or none is off);
3. its stable key (16 hex digits, never the readable slug) is one of the 30 in
   `EVENT_INDEXING_PILOT_KEYS`;
4. the request is on the canonical host (`isIndexableOrigin`). Cloudflare
   Pages previews receive the same `[vars]`, but a `*.pages.dev` host never
   activates the pilot: every event page there stays `noindex,follow`, the
   events sitemap is empty and parent nodes keep `#show-<id>`.

Everything else is `noindex,follow` — fail closed on an unknown or malformed
flag, a missing list, a key naming no single event, an eligible page that is
not a pilot key, and a pilot key whose event is no longer eligible.
`deriveEventIndexingPilot` (`functions/_event-indexability.js`) is the one
answer; the router reads it (as `eventIndexingPilotFor`) for the event page's
robots and the parent boards' structured data, and `/sitemaps/events.xml`,
`/sitemap.xml` and `llms.txt` read the same function, so the four cannot
disagree. Only the 30 keys are ever evaluated, so the indexed set can shrink
but never grow past the cohort.

**The cohort is an experiment, not a queue.** The 30 keys and the facts they
were chosen on are recorded in `data/event-indexing-pilot.json` (selection
rules, composition, and per member: key, event id, canonical path, artist,
venue, city, country, local date, single- or multi-date city, destination
lanes, snapshot-lane count). `npm run test:event-indexability` pins the list to
that record. A member that is cancelled, postponed, passes, loses coverage or
becomes ambiguous drops out of indexing and discovery on the next render and
is **never replaced**; it stays in the record so the original cohort can be
reconstructed. Growing, shrinking or swapping the cohort is a new, reviewed
experiment, not maintenance. No automation may set the flag or touch the list.

**Discovery.** `/sitemaps/events.xml` (a segment of `/sitemap-index.xml`, and
part of `/sitemap.xml`) lists exactly the active pilot, once each; its
`lastmod` is the event record's own `last_verified_at`, else the artist's
verification date — never the date shared renderer code changed. The index
lists the segment only while it is non-empty. `llms.txt` lists every indexable
route type, so it lists the active pilot too, under "Individual event pages",
and a noindex event page never.

**Parent structured-data identity.** For an active pilot member only, every
parent board that describes the performance — the artist, artist-city, city
and venue pages, `MusicEvent` and `ListItem` alike — identifies it by its event
page: `url` the canonical event URL and `@id` `<canonical event URL>#event`,
exactly the event page's own node (`showSchemaIdentity` in
`functions/[[path]].js`). Nothing else on the node changes (name, dates,
location, performer, and `offers` where the schema-offers exception applies).
Every other performance keeps `/artists/<slug>#show-<id>` and no `@id`, and a
pilot member that drops out returns to it on the next render. Visible cards,
links, anchors and CTAs are unchanged. The event page's own node still carries
no `offers`.

**Venue address.** Event data holds the venue name, city and country but not
street address, region or postcode, so `PostalAddress` carries
`addressLocality` and `addressCountry` only. The pilot does not wait for, guess
or scrape the rest; richer addresses are a separate follow-up (`BACKLOG.md`).

**Checks.** `npm run audit:indexable-surface:check` renders every served event
page and parent boards of the active pilot and fails on any page whose robots
disagree with the active pilot, an indexed page that is not a pilot key or not
eligible, more indexed pages than keys, a sitemap or `llms.txt` whose event
URLs are not exactly the active pilot (or repeat one), or a parent that keeps
`#show-<id>`, splits `url` and `@id`, or gives a non-pilot performance an
event-page identity. The pilot is tracked there as an exact set, not in the
route-type totals and baseline, whose tolerance-based comparison is built for
calendar decay. `scripts/validate-route-schema.mjs` (section 8c) validates
every active pilot page's node and its parent artist page's nodes against the
flag-off render.

**Rollback.** Remove `EVENT_PAGES_INDEXING` from `wrangler.toml` (or set any
other value): on the next render every event page is `noindex,follow`, the
events sitemap empties and parent nodes return to `#show-<id>`.

**Measuring the pilot.** Production first served the pilot `index,follow` on
**2026-09-27** (`launch_date` in `data/event-indexing-pilot.json`); measurement
windows run from that date. `npm run report:event-indexing-pilot` (`--json`,
or `npm run report:event-indexing-pilot:json`) is the read-only report on it.
It takes the cohort **only** from the record, never from today's eligibility,
so it always reports the original 30: each member's frozen `launch_*` facts
beside its `current_*` state (exists, route and derived HTTP outcome of the
launch URL, eligibility and reasons, indexed, events-sitemap membership,
lifecycle, `MusicEvent`, destinations, snapshot lanes, days to the event),
and any member that dropped out with its reason — never a replacement. Days
since launch come with non-binding checkpoints (≈2 weeks: discovery, crawling,
first impressions; ≈4 weeks: growing impressions and query diversity; 6–8
weeks: whether enough pages earn exact-event visibility to justify a larger,
separately reviewed rollout). They are prompts for a person; nothing reads
them, and the report has no score or pass/fail. Optional inputs, each read
only:

- `--search-console <file>` — a Search Console performance export (CSV or
  JSON) with a page column and clicks, impressions and position; a query
  column enables query-form classification. The per-page-and-query table comes
  from the Search Console API (`searchanalytics.query`, dimensions `page` and
  `query`) or the Performance report filtered to the pilot URLs. Rows join by
  canonical URL only; every other URL is counted and set aside, never joined.
  State the period with `--search-console-period YYYY-MM-DD..YYYY-MM-DD` when
  the file does not. No Search Console credentials belong in the repo.
- `--route-traffic <file>` (default `reports/analytics/route-traffic.json`) —
  TTC page views and outbound clicks per route, exported from D1 with
  `npm run report:funnel -- --route-traffic <file>` (see Traffic data below).
- `--live` — one GET per pilot page on production, recording page-template
  facts that exist only at render time (listed price, its as-of time, 30-day
  low, recorded movement, history panel, rendered buttons).

Without an input its metrics are reported as unknown, never as zero. With 30
pages every comparison (single- vs multi-date, destination count, artist
scale) is descriptive, not statistical.

**Structured data ahead of indexing.** Each served event page carries one
`MusicEvent` for the performance it shows (or none, where it may not be
described: a pre-on-sale or resale-only date, as on the parent boards, or an
unrecognised Ticketmaster status). This is a deliberate exception to
"structured data follows indexability" below: it lets the event schema be
validated before any event page is exposed for indexing. Its node never
carries an offer; robots, sitemap and `llms.txt` exposure follow the pilot
rule above. Shape and
gate: `docs/ARCHITECTURE.md` → Event-page structured data.

Which URLs serve, redirect or 404 is documented in `docs/ARCHITECTURE.md` →
Event identity and event pages. The two rules that matter here: a past event
301s to its artist-city page (or the artist page), so expired event URLs never
accumulate; and a cancelled or postponed *future* event keeps its page, because
lifecycle is presentation state, not expiry.

### Artist price guide — `/artists/<artist>/ticket-prices`

The informational companion to the artist page: "<artist> ticket prices". The
artist page stays the transactional destination; the two link to each other
near the top and split the topic by intent, not by duplicating it. One URL per
artist, never one per tour or year — the year in the title is read off the
upcoming dates, so the same URL carries from one tour to the next.

**Exists only when approved.** A guide renders only for a slug in
`PRICE_GUIDE_ARTISTS` (`functions/_price-guides.js`). Any other artist's path
404s: the site does not generate pages it has not been asked to publish. Tour
launches are *proposed* daily in the `automation:price-guide-candidates` issue
(`price-guide-candidates.yml`); adding the slug is the approval.

**Renders when** the guide is approved, the artist is
`indexable_with_substantial_content`, and it has ≥ 1 publishable upcoming date.
An approved guide that stops qualifying (between tours, or artist under review)
**301s to the artist page** and renders again when the next run lands.

**Indexable when** it has ≥ 6 upcoming dates (`PRICE_GUIDE_MIN_SHOWS`) in ≥ 2
cities (`PRICE_GUIDE_MIN_CITIES`), ≥ 1 publishable, and ≥ 3 of them carry
verified provenance on a listed-price snapshot lane
(`PRICE_GUIDE_MIN_SNAPSHOT_READY_SHOWS`, `priceGuideGate`) — **and** the artist
page itself is indexable, so a guide never outranks its parent. The snapshot
condition is static readiness, read from `events.json`, not whether D1 served a
price on this render: indexability must not flap with the cache. Below the bar
the page renders `noindex,follow` and leaves the sitemap and `llms.txt`. New
exclusion codes: `below_city_threshold`, `below_price_coverage_threshold`.
Since 2026-10-05 it also needs one date with ≥ 2 listed-price lanes
(comparison data, above; `no_price_comparison`).

The guide prints no figure the site cannot source. It explains face value and
prints none (no approved source), and every price is one date's own lowest
listed snapshot with its provider and capture time. There is no tour-wide range
or lowest-date claim: a minimum across different events is not covered by any
provider grant (`docs/PROVIDER_DATA_POLICY.md`). It carries no FAQ and emits no
`MusicEvent`, `Offer` or `FAQPage` — the artist page owns the event nodes.

### Blog — `/blog`, `/blog/<slug>`, `/blog/tags/<tag>`

Blog posts are authored editorial rather than derived from event data, so the
calendar cannot move them. The gates are about substance and duplication, and
they follow the same "render it, don't index it" pattern as the route types
above. Gate constants and derivation: `functions/_blog.js`.

| Situation | Response |
|---|---|
| Post `status: draft` | **404** — a draft has no route at all |
| Published post, 300+ body words | **200, `index,follow`**, self-canonical, in the sitemap and the RSS feed |
| Published post under 300 body words | **200, `noindex,follow`**, self-canonical, still linked, absent from sitemap and feed |
| Tag carried by ≥ 2 **indexable** posts | **200, `index,follow`**, in the sitemap |
| Tag carried by fewer | **200, `noindex,follow`**, still linked from `/blog`, not in the sitemap |
| `/blog` with at least one indexable post | **200, `index,follow`** |
| `/blog` with none | **200, `noindex,follow`** — the route survives, the index entry does not |
| Unknown slug or tag | **404** |

**Why a tag needs two posts.** A tag page listing one post is that post with
extra steps: same title words, same summary, one link. At two it starts to group
something. Counting *indexable* posts rather than published ones stops a tag
being indexed on the strength of posts that are themselves noindex.

**Why the word threshold.** A post is competing on a "read about this" query.
Below a few hundred words it loses to the guide or artist page that already
covers the topic, and adds a near-duplicate to the index. Recovery is automatic:
extend the post and it indexes on the next build.

**Removing several posts at once trips the surface audit.** Blog routes are not
date-derived, so the audit has no clock-controlled reference for them and reads
the whole delta as unexplained. Unpublishing or deleting more than three
indexable posts in one change is therefore reported as a structural change and
fails `npm run audit:indexable-surface:check`. That is the audit working as
designed — a deliberate removal of that size should re-anchor the baseline in
the same commit. Adding posts only ever produces a warning.

### Publishable is not the same as schema-eligible

This distinction applies to all three location route types.

`MusicEvent` nodes are emitted only for events that clear the *row-status* gate,
which this policy does not change. So an indexable location page may carry fewer
`MusicEvent` nodes than it has shows, or none at all — an Arlington or Houston
page renders working SeatGeek CTAs on rows that are still awaiting a Ticketmaster
storefront recheck, and those rows produce no `MusicEvent`.

That is intended. Visible content may exceed structured data; the rule that
matters runs the other way — never emit schema for content the page does not
show. The two counts are named separately in the derivations
(`publishableCount` for indexability, `schemaEventCount` for schema) so they
cannot be conflated again, and `scripts/validate-route-schema.mjs` checks
against the latter.

---

## Shared content rules for location pages

These apply to city, venue, and artist-city pages together.

- **No FAQ entry whose answer is the same on every page of its type.** The
  generic ticket-buying questions ("does the site sell tickets", "are snapshots
  final totals", "how should I compare tickets") were removed from all three
  page types. Both facts remain stated in the visible disclosure note every one
  of these pages already renders, and are explained properly in the linked
  guides. Repeating them made hundreds of near-identical `FAQPage` blocks.
- **City and venue pages carry no FAQ at all.** What survived the rule above
  was four questions per page whose answers restated the counts in the lead and
  the first row of the schedule directly underneath them — a question-shaped
  copy of the page. They were removed rather than reworded, and nothing was
  written to take their place. Their `FAQPage` mirror went with them, because
  schema never describes content the page does not show. Artist-city pages keep
  their FAQ: those answers are about one artist in one city and are not
  restated elsewhere on the page.
- **Say each fact once.** A city or venue page states its upcoming-show count,
  artist count and date span in one lead sentence built from the derived record,
  and then shows the schedule. The "at a glance" card decks, the artist-coverage
  list, and the page-level "most recently checked ..." paragraph all restated
  those same numbers further down; `scripts/audit-internal-links.mjs` now fails
  a location page that names its show count more than once.
- **Held dates are not inventory.** A date whose stored Ticketmaster status
  is cancelled or postponed (`eventLifecycleHeld`) stays listed with its
  status, but no gate counts it: it is not publishable, and city and venue
  show and artist counts, price guides and the auto-promoted artist count all
  leave it out.
- **Location page dates are local dates.** The city and venue derivations carry
  each event's `timezone` so a show is labelled with the day it happens, matching
  the show card on the artist page. Without it the renderer falls back to UTC,
  which prints the wrong calendar day for most records — a US evening show is
  already "tomorrow" in UTC.
- **No word-count floor on a location page.** These pages are an aggregation
  layer: their length should follow the size of the schedule, not a target. The
  audit checks that the useful parts are present (the disclosure, the schedule,
  one dated listing per upcoming show, the route to ticket options, the byline)
  and that the filler has not returned. Rule 3 above applies here too — a page
  padded to clear a floor is filler.
- **An empty location record gets an empty state, not a frame.** The router
  301s a previously tracked city or venue with nothing upcoming, so this is reached only in the gap
  between a date passing and the derivation seeing it. The template says so in
  one sentence and offers a way onward; it never renders a heading stack around
  no content. Covered by `scripts/location-pages.test.mjs`.
- **The artist-city price answer is not an indexability signal.** Artist-city
  pages render a per-date table answering "How much are \<artist\> tickets in
  \<city\>?" whenever at least one tracked date has an eligible listed-price
  snapshot. It is deliberately **not** gated on `route.indexable`, and it does
  not feed any gate: a single-date page stays `noindex,follow` and out of the
  sitemap while still showing its price, because whether a URL earns a listing
  and whether a visitor standing on it should be told the price are different
  questions. `ARTIST_CITY_MIN_SHOWS` and `artistCityGate` are untouched by it,
  and `scripts/artist-city-prices.test.mjs` asserts that a priced single-date
  page is still excluded from `deriveIndexableArtistCities`.
  The block renders nothing at all when no date has an eligible lane — no
  heading, no empty table — and the at-a-glance summary then keeps its full
  sentence (venue and date range included). Its **metadata is not**: `artistCityTitle` and `artistCityDescription`
  changed for every artist-city page, priced or not, because both are composed
  before any price is fetched and neither may carry a live figure (the
  description is emitted verbatim as the `CollectionPage` JSON-LD description).
  Every figure is the same gated snapshot the date's own CTA button prints,
  carries its provider and capture time, and is a same-event comparison only;
  the table is ordered by date and its rows are never ranked against each other
  (see `docs/PROVIDER_DATA_POLICY.md`).
  Where every tracked date shares one venue the venue is named once in the lead
  and its column is dropped, per "Say each fact once" above. A priced row may
  also carry the lowest price recorded for **that same event** over a trailing
  30 days (`functions/_event-price-low.js`); it renders inside this block, feeds
  no gate, and changes no route's indexability — the rules governing the figure
  itself are in `docs/PROVIDER_DATA_POLICY.md`. The same rule
  governs the rest of the page when the table renders: the table states every
  tracked date and its venue, so the at-a-glance summary drops the date range
  and venue it would otherwise repeat, keeping its heading, its count sentence
  and the event-record verification date, which the table does not carry. It falls back to the unabridged sentence when no price renders.
- **Dates before the summary on location pages.** City, venue and artist-city
  pages go from the page title straight to the dates (after the price table,
  where an artist-city page has one). The summary sentence and the
  selective-coverage note render directly under the date list — visible, never
  collapsed. The only copy between the title and the first date is the
  one-line "How this site makes money" statement in the board header, beside
  the buttons it describes. The artist-city page states its count, venue and
  range once, in the at-a-glance summary sentence (its "Short answer:" label
  was dropped on 2026-10-02 as filler); the separate lead paragraph
  and the "Next tracked date" / "Tracked date range" / "Venues" /
  "Verification recency" card deck that restated it were removed on
  2026-09-25.
- **No templated buying checklist.** The "How to buy \<artist\> tickets in
  \<city\>" five-step list was byte-identical across every artist-city page and
  duplicated both the artist page's own buying guide and
  `/guides/how-to-compare-concert-ticket-prices`. Location pages link that guide
  instead of restating it.
- **Structured data follows indexability.** `FAQPage` and `MusicEvent` are
  emitted only on indexable location pages (the noindex event page is the one
  stated exception — see Event above). A `noindex` page cannot earn a rich
  result, so schema on one only adds another near-duplicate copy. Visible
  content and structured data must never disagree in the other direction —
  schema is never emitted for content the page does not show.
- **No `hreflang`, deliberately.** City and venue pages cover the UK, the
  Netherlands, Spain, Germany, Canada and Belgium, which reads like a case for
  language/region annotations. It is not one: `hreflang` declares alternate
  *versions* of a page, and there are none — every route is a single
  English-language document, and a set of self-referential annotations tells a
  crawler nothing it cannot already see. Reconsider only when a page genuinely
  has a second version at its own URL (a translated guide, or a market-specific
  variant of the same city page). Country coverage alone is not that trigger.

---

## Internal linking

Internal authority flows, in order, to: live artist pages → high-value city
pages → high-value venue pages → evergreen guides.

- Artist pages list their **multi-date city runs** prominently, with show
  counts. Single-date cities appear in a compact secondary line — still
  followed, not given equal prominence.
- Artist-city pages link only the artist's **other indexable** city runs.
- City and venue pages link the artist pages and each other only where the
  destination is itself indexable. Where the artist has an indexable
  artist-city page for that city, a city card and a venue's artist group link
  it ("All <artist> dates in <city>") — the page built for that local query —
  in preference to the artist page (added 2026-09-24; artist-city pages were
  previously linked only from artist pages and each other).
- No two indexable pages may share a title, a meta description or an H1;
  `scripts/audit-internal-links.mjs --check` fails on any of the three (H1
  added 2026-09-24).
- No indexable route may have zero inbound internal links.
  `scripts/audit-internal-links.mjs --check` and
  `npm run audit:indexable-surface:check` both fail on an orphan.

---

## Redirects

The only redirects this policy relies on are the ones the router already owned.
**No URL was mass-redirected as part of de-indexing**, because de-indexing and
redirecting answer different questions: one is about what to list, the other is
about where a page went.

| Source | Destination | Condition |
|---|---|---|
| `/artists/<a>/tickets/<city>` | `/artists/<a>` | The artist has a real event footprint in that city but no publishable upcoming show, or the artist is under review |
| `/artists/<a>/tickets` | `/artists/<a>` | Legacy duplicate path |
| `/cities/<city>` | `/cities` | Tracked before, nothing upcoming now (owner-approved 2026-09-24; was a 404) |
| `/venues/<venue>` | `/cities/<city>`, else `/venues` | Tracked before, nothing upcoming now; its city page while that city has upcoming dates (owner-approved 2026-09-24; was a 404) |
| Old guide paths | Current guide path | `OLD_GUIDE_REDIRECTS` in `functions/_route-metadata.js` |

Safety properties, all asserted in `scripts/route-indexability.test.mjs`:

- Every destination is a terminal 200, so there are no chains.
- No destination is itself a redirect source, so there are no loops.
- No route redirects to the homepage.
- Redirects fire only for cities an artist has genuinely played; an arbitrary
  slug 404s rather than being absorbed into the artist page.
- A single-date artist-city page returns 200 and is **not** redirected — the
  test exists specifically to stop a future change turning de-indexing into a
  mass redirect.

Query parameters are not preserved on these redirects: the destinations take no
meaningful query input, and `/api/out` tracking parameters never appear on HTML
routes.

---

## Sitemaps

`/sitemap-index.xml` (advertised in `robots.txt`, and the one to submit to
Search Console and Bing) lists one sitemap per page type under `/sitemaps/`:
`pages`, `artists`, `artist-cities`, `cities`, `venues`, `blog`, so coverage
and indexing problems are reported per type. `/sitemap.xml` still serves every
indexable URL in one file for IndexNow, the audits and any engine that already
has it submitted. All of them come from one derivation
(`buildSitemapSegments` in `functions/sitemap.xml.js`), which parses
`events.json` once per request.

## Monitoring

`npm run audit:indexable-surface` writes `reports/indexable-surface/indexable-surface.{md,json}`:
routes by type, indexable and non-indexable totals, exclusion reasons, routes
about to lose indexability, indexable routes with zero internal links,
duplicate and near-duplicate title patterns, routes with no future events,
routes with traffic but no provider clicks, and the change against the stored
baseline. A separate section covers individual event pages, which are outside
that surface: it renders every served event page and fails `--check` if a
page's robots or any sitemap/`llms.txt` entry disagrees with the rollout gate
(today: any event page not `noindex,follow`, any event URL listed), if an
eligible page is malformed, or if its rendered buttons differ from the lanes
the policy counted. Those counts never enter the baseline — eligibility is not
indexing — so they need no re-anchor.

| Command | Purpose |
|---|---|
| `npm run audit:indexable-surface` | Write the report |
| `npm run audit:indexable-surface:check` | CI mode — no writes, exit 1 on a problem |
| `npm run audit:indexable-surface:baseline` | Re-anchor `reports/indexable-surface/baseline.json` |
| `npm run audit:indexable-surface:self-test` | Offline unit tests for its pure functions |
| `npm run audit:metadata-accuracy:check` | Every indexable page and served event page: `MusicEvent` name, date, venue, city and status against `events.json`; title and description years, counts and price claims; duplicate titles and descriptions. Exit 1 on any finding |

### Google September 2026 spam update

Google's September 2026 spam update began rolling out on **2026-09-24**
(Google Search Status Dashboard; up to two weeks, still rolling out on
2026-10-02). Act on quality now; draw no conclusion about rankings until the
comparison window below has been measured.

- **Baseline:** Search Console performance, **2026-09-17 to 2026-09-23**.
- **Comparison:** the first clean seven days starting the day after the
  dashboard marks the rollout complete. Compare by route type (URL pattern),
  and report the URLs whose robots changed on 2026-10-05 as their own group.
- **Hold until the comparison is recorded:** no event pages beyond the frozen
  30-page pilot, and no event page added to the index before it renders a
  same-event comparison table (two listed-price lanes) and its price context.
  Scaled template launches during the window confound the measurement.
- **Log every search-facing change** below, by merge date, until the
  comparison is recorded. Then delete this section; git history keeps it.

| Date | Change |
|---|---|
| 2026-09-24 | Indexability pass (expired pages, internal links); sitemap split behind `/sitemap-index.xml`; full artist `MusicEvent` schema; template layout and copy changes on home, artist, city, venue and guides; auto-promote lane on (further batches 09-25, 09-26, 09-27, 10-01, 10-03) |
| 2026-09-25 | Tour year in artist titles; `/on-sale` added; all blog drafts published; five provider guides added; premium-seat listings withheld |
| 2026-09-26 | Artist and artist-city titles rewritten; dates-first layout on artist, city, venue and artist-city; first price guides; event pages served `noindex` |
| 2026-09-27 | Event-page indexing pilot: 30 frozen event pages `index,follow`; event duplicate and add-on cleanup |
| 2026-09-30 | Sitemap drops `changefreq`/`priority`; longer event meta description; guide answer and linking changes |
| 2026-10-02 | Tour name in artist titles, bands as `MusicGroup`; filler copy cut on artist, artist-city, city and venue; four buying guides; `llms.txt` artist facts and IndexNow; nine price guides approved |
| 2026-10-03 | 62 more price guides (72 indexable) |
| 2026-10-05 | Comparison-data and one-canonical rules above: indexable artist-city 201 → 143, city 117 → 89, venue 231 → 176 (site 776 → 635). "Compare Prices" dropped from artist and artist-city titles and descriptions where no date has two price lanes. `MusicEvent.name` is "<artist> at <venue>" where Ticketmaster's event name does not name the artist. `npm run audit:metadata-accuracy:check` added to CI |

### Expected decay vs structural regression

Every route type here is derived from dated events, so the indexable surface
shrinks daily on its own. Failing CI on that would fail every nightly data
commit. The monitor separates the two cases per route type:

The clock's contribution is **measured, not inferred**: the same gates are run
twice over identical event data, once at the stored baseline's timestamp and
once at now. Every difference between those two runs is calendar expiry and
nothing else; what remains is the residual.

- **Inventory decay / growth** — explained entirely by the calendar. Reported,
  never failed.
- **Structural change** — indexable routes lost beyond what the calendar
  accounts for, past a tolerance of `max(3, 10% of the type's baseline)`. A
  code, gate, or data change. It **fails** `--check` until the baseline is
  deliberately re-anchored.
- **Unexplained growth** — more indexable routes than the calendar accounts for.
  Warns only: an artist batch or a large discovery run legitimately does this.

Indexable *share* is deliberately not used as the signal. An artist route
renders whether or not it is indexable, so ordinary expiry moves the numerator
alone — the artist bucket falls 18/40 → 8/40 over 90 days on current data, which
a share rule would read as a 25-point "structural" regression caused by nothing
but the clock advancing.

A total swing of ≥ 25% that every per-type check classified as decay emits a
non-blocking `::warning::` annotation rather than a failure — a tour ending can
legitimately halve the surface, and so can a data bug.

`--check` also fails outright on: an indexable route with no inbound internal
link, an indexable route with no future events, and two indexable routes
sharing an exact title.

### Re-anchoring the baseline

Run `npm run audit:indexable-surface:baseline` and commit the result **only**
when a change to this policy is intended. The commit that moves the baseline is
the record that the change was deliberate.

### Traffic data

Per-route views and provider clicks live in D1 and need Cloudflare credentials
the audit does not have and must never embed. Produce the export with:

```bash
npm run report:funnel -- --route-traffic reports/analytics/route-traffic.json
```

That mode groups `analytics_events` by `source_path` — the only grouping that
can answer "which routes earn views and clicks", since every other grouping in
the funnel report is by artist, provider, or CTA location — and writes
`{ "generated_at": "<iso>", "since": "<iso window start, empty for all time>", "routes": { "/path": { "views": n, "provider_clicks": n, "outbound_clicks": n, "outbound_by_provider": { "<provider>": n } } } }`.
The audit, and `report:event-indexing-pilot`, pick that file up automatically. Without it, the traffic sections
report as unavailable rather than inventing numbers.

---

## Changing a threshold

1. Edit the constant in `functions/_route-indexability.js` and the table above.
2. Run `npm run test:route-indexability` and `npm run test:artist-cities` —
   both assert against the exported constants, so they will tell you what the
   change actually moved.
3. Run `npm run test:mvp`. `validate:internal-links` re-derives each gate
   independently from the published constants, so a derivation that drifts from
   the policy fails there.
4. Run `npm run roster:forecast` to see the projected surface at +30/60/90 days.
5. Re-anchor the baseline and commit it in the same change.

For the event-page policy, edit the constant in
`functions/_event-indexability.js` and the Event table above, then run
`npm run test:event-indexability` and `npm run report:event-routes` to see what
moved. There is no baseline to re-anchor until event pages are actually
indexed.
