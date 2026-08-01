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

## Per-route decisions

### Artist — `/artists/<slug>`

**Indexable when** the editorial record is `indexable_with_substantial_content`
**and** the artist has at least one upcoming show.

Unchanged by this policy. Gate lives in
[`functions/_artist-indexability.js`](../functions/_artist-indexability.js). An
empty board is a "tickets and tour dates" page with no dates and no ticket
links, so it drops to `noindex,follow` and leaves the sitemap until a new
verified date lands.

### City — `/cities/<city-country>`

**Indexable when** all three hold:

| Requirement | Value | Why |
|---|---|---|
| Upcoming tracked shows | ≥ 4 | Enough breadth that the page is not a restatement of one artist page |
| Distinct artists | ≥ 2 | A single-artist city page *is* the artist page filtered by city |
| Shows with a publishable ticket destination | ≥ 1 | A page titled "concerts in X" that can lead nowhere cannot serve its own purpose |

The destination requirement is the part this policy added. "Can lead somewhere"
means what the renderer means by it: a row whose own verification status is
publishable, **or** one carrying an independently verified marketplace
destination with a stored URL. That second case is not marginal — Arlington,
Houston and Sunrise consist entirely of `needs_recheck` rows with verified
SeatGeek links, and every one renders a working CTA. Testing the row status
alone would have de-indexed those pages while their buttons still worked.

On current data the requirement excludes **one venue page** (AFAS Dome,
Antwerp: three upcoming shows, no verified link from any provider) and no city
pages.

A city page must stay explicit that coverage is selective — it is not a local
concert calendar. That disclosure is visible on the page, not only in the FAQ.

### Venue — `/venues/<venue-city>`

**Indexable when** all three hold: ≥ 3 upcoming tracked shows, ≥ 2 distinct
artists, ≥ 1 show with a publishable ticket destination.

The bar is one show lower than a city's because venue intent is narrower and
venue inventory turns over faster. The destination requirement is identical and
was added for the same reason.

### Artist-city — `/artists/<artist>/tickets/<city>`

This is where the policy makes its substantive change.

| Situation | Response |
|---|---|
| Artist editorially indexable **and** ≥ 2 publishable upcoming shows in the city | **200, `index,follow`**, self-canonical, in the sitemap |
| Artist editorially indexable **and** exactly 1 publishable upcoming show | **200, `noindex,follow`**, self-canonical, not in the sitemap, still linked |
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
- **No templated buying checklist.** The "How to buy \<artist\> tickets in
  \<city\>" five-step list was byte-identical across every artist-city page and
  duplicated both the artist page's own buying guide and
  `/guides/how-to-compare-concert-ticket-prices`. Location pages link that guide
  instead of restating it.
- **Structured data follows indexability.** `FAQPage` and `MusicEvent` are
  emitted only on indexable location pages. A `noindex` page cannot earn a rich
  result, so schema on one only adds another near-duplicate copy. Visible
  content and structured data must never disagree in the other direction —
  schema is never emitted for content the page does not show.

---

## Internal linking

Internal authority flows, in order, to: live artist pages → high-value city
pages → high-value venue pages → evergreen guides.

- Artist pages list their **multi-date city runs** prominently, with show
  counts. Single-date cities appear in a compact secondary line — still
  followed, not given equal prominence.
- Artist-city pages link only the artist's **other indexable** city runs.
- City and venue pages link the artist pages and each other only where the
  destination is itself indexable.
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

## Monitoring

`npm run audit:indexable-surface` writes `reports/indexable-surface/indexable-surface.{md,json}`:
routes by type, indexable and non-indexable totals, exclusion reasons, routes
about to lose indexability, indexable routes with zero internal links,
duplicate and near-duplicate title patterns, routes with no future events,
routes with traffic but no provider clicks, and the change against the stored
baseline.

| Command | Purpose |
|---|---|
| `npm run audit:indexable-surface` | Write the report |
| `npm run audit:indexable-surface:check` | CI mode — no writes, exit 1 on a problem |
| `npm run audit:indexable-surface:baseline` | Re-anchor `reports/indexable-surface/baseline.json` |
| `npm run audit:indexable-surface:self-test` | Offline unit tests for its pure functions |

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
`{ "generated_at": "<iso>", "routes": { "/path": { "views": n, "provider_clicks": n, "outbound_clicks": n } } }`.
The audit picks that file up automatically. Without it, the traffic sections
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
