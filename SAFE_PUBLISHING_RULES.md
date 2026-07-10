# Safe Publishing Rules

_Reviewed current: 2026-07-10._

Non-negotiable rules for TourTicketCompare. Violating these compromises the site's integrity or affiliate agreements.

See [docs/CONTENT_RULES.md](docs/CONTENT_RULES.md) and [docs/PROVIDER_DATA_POLICY.md](docs/PROVIDER_DATA_POLICY.md) for full detail and provider-specific policy.

---

## Data Integrity

- **Never invent** tours, artists, events, dates, venues, prices, availability, providers, or partner relationships.
- **Never scrape** ticket providers or unofficial sources.
- Accepted verification sources: official artist/venue websites, verified social accounts, Ticketmaster artist pages, Billboard/Pollstar/Variety. Wikipedia alone is not sufficient; AI-generated data is not a source.

## Ticket CTAs

An artist-level "Buy tickets" button may appear only when the artist exists in `public/data/catalog.json`, the provider destination is present in `VERIFIED_TICKET_LINKS`, and the configured redirect passes the provider allowlist and placeholder checks.

An event-level button additionally requires a reviewed event record, a provider-specific destination with publishable verification/provenance, strict provider URL validation, and the required runtime provider configuration. Independently verified SeatGeek or Vivid Seats provenance may publish that marketplace CTA on a `needs_recheck` row while Ticketmaster remains suppressed.

If any applicable condition is unmet, show the watchlist / empty state. No placeholder or dead-end links as real CTAs.

## Artist Page Publishing

Artist pages may exist in `indexing_status: "review_required"` with no CTAs. This is the safe default for new artists.

Pages become indexable and conversion-led only after completing the phase gates in [docs/SAFE_NEXT_ARTIST_WORKFLOW.md](docs/SAFE_NEXT_ARTIST_WORKFLOW.md). Do not set `indexing_status: "indexable_with_substantial_content"` without human browser verification of the live ticket URL.

**New artists are never auto-published.** Discovery tooling may only *propose* new artists for human review. Promotion to indexable, and any `VERIFIED_TICKET_LINKS` / `/api/out` entry, require a human to verify the live ticket URL in a browser and to follow the phase gates. New-artist onboarding is no longer parked (lifted 2026-06-10), but every artist must still pass these gates — start from a `review_required` shell per `docs/SAFE_NEXT_ARTIST_WORKFLOW.md`.

**New events: one narrow auto-publish exception (owner-approved 2026-07-07).** The daily Ticketmaster new-show loop (`.github/workflows/tm-new-shows-pr.yml` → `scripts/sync-tm-events-write-pr.mjs --write-pr --auto-merge`) may squash-merge its own PR for **new shows of registry-verified, `sync_enabled` artists only**, and only after the full validation suite (apply-artists validate-with-rollback, `test:mvp`, `git diff --check`) has passed in the same job on exactly the proposed content. Everything else stays human-gated: withheld/risky rows are never written, `tour_name` is never inferred (#172), link publishability still classifies short-form/non-canonical URLs as `needs_recheck` (CTA-suppressed), and a failed merge leaves the PR open for a human — it is never forced.

**SeatGeek event CTAs: a second narrow auto-publish exception (owner-approved 2026-07-07).** The nightly SeatGeek CTA sync (`.github/workflows/seatgeek-cta-sync.yml`) may squash-merge its own PR containing only: high-confidence event-level `seatgeek_url` additions for Ticketmaster-verified events (`scripts/enrich-seatgeek-events.mjs`, unchanged criteria), and `provider_links.seatgeek` verified provenance written by `scripts/verify-seatgeek-events.mjs` after confirming the exact event against the SeatGeek API record for the **registry-verified `seatgeek_performer_id`** (UTC-instant match ±3h, city and venue match, event-URL shape; date-only/timezone-ambiguous rows are skipped). Verified provenance is what lets a SeatGeek CTA publish standalone on a `needs_recheck` event — the recheck flag tracks the broken Ticketmaster storefront URL, not the SeatGeek listing. The same loop self-heals only in the safe direction and only on positive evidence (a URL is corrected or cleared solely after a confirmed-gone/confirmed-mismatch API record plus a successful zero-candidate discovery query; ambiguous matches are reported, never guessed; transient API failures leave data untouched and auth failures abort the run with no writes) and merges only after `events:validate:prod`, partition validation, `test:mvp`, and `git diff --check` pass in-job on exactly the proposed content. It never touches `verification_status`, Ticketmaster links, `tour_name`, `/api/out`, or affiliate logic. Artist-level SeatGeek discovery and new-artist onboarding remain propose-only.

## Price Display

- Do not say "sold out" or "available" based on unverified inventory data.
- Do not publish scraping-derived prices, fake/manual prices, a comparison for mismatched events, or a comparison with a stale or missing provider lane.
- Written SeatGeek and Vivid Seats agreements confirmed on 2026-07-10 permit provider price display across all public site surfaces, side-by-side price display, lower-listed-price and price-difference calculations, and history for the same verified event.
- Ticketmaster price display from an approved provider feed requires `TICKETMASTER_DISCOVERY_PRICE_CHECKS_ENABLED=true` and remains off by default.
- SeatGeek comparison data is allowed only when it comes from the approved SeatGeek partner API, `SEATGEEK_PRICE_DISPLAY_ENABLED=true`, the event has a valid verified `seatgeek_url`, the cached row has `source='seatgeek_partner_api'`, and the snapshot is timestamped and unexpired.
- Vivid Seats comparison data is allowed only when `VIVIDSEATS_PRICE_DISPLAY_ENABLED=true`, the event has a valid verified `vividseats_url`, the cached row has `source='vividseats_impact_marketplace_api'`, and the snapshot is timestamped and unexpired.
- A lower-price statement must say it is a provider-supplied listed-price snapshot for the same event. Fees, taxes, availability, delivery, and the final checkout total must remain clearly qualified.

## Provider Rights and Catalog Metadata

- **Ticketmaster is an official event-verification and link source only — not a reliable price source.** Do not present Ticketmaster data as a price comparison.
- Marketplace partners may display pricing only where an approved feed/API explicitly permits public display. SeatGeek and Vivid Seats may also be compared under the exact-event, source, freshness, and qualification gates above.
- **Impact affiliate approval grants link/commission rights only — it never implies price-display rights.** Do not infer the right to show prices from affiliate enrolment.
- Capability fields in `public/data/catalog.json` (`pricing_type`, `supports_pricing`, `price_aggregation`, `real_time_inventory`) are **inert metadata**. SeatGeek and Vivid Seats comparison display is gated by their enabled feature flags plus provider-specific source, exact-event, and freshness conditions; Ticketmaster display remains off.

## Affiliate and Redirect Rules

- All ticket outbound links must route through `/api/out` — no raw affiliate URLs in HTML or data files.
- `functions/api/out.js` and `VERIFIED_TICKET_LINKS` are protected. Do not modify without explicit scope.
- Impact credentials (`IMPACT_ACCOUNT_SID`, `IMPACT_AUTH_TOKEN`, `IMPACT_SEATGEEK_*`, `IMPACT_VIVIDSEATS_*`) are server-side only. Never expose in public assets, API responses, or client-side code.
- **Ticketmaster links carry no affiliate tracking** (the site left the Ticketmaster affiliate programme, 2026-07): they are plain redirects to the verified stored destination. Never re-add Impact wrapping, the Publisher Tag, or `evyy.net` shortlinks for Ticketmaster.
- SeatGeek / Vivid Seats redirects are Impact-wrapped; if the Impact call fails, `/api/out` returns a diagnostic JSON — never an untracked redirect and never a made-up destination.

## Schema and SEO

- Do not add `Event` or `MusicEvent` JSON-LD schema without verified event-level data (confirmed date, venue, artist from an official source).
- Do not set a page to `indexable` status until it has substantial, verified content.
- Do not include `noindex` pages in the sitemap.

## Empty States

- When no verified ticket destination exists for an artist or event, show the honest watchlist / empty state — never a placeholder, a dead-end link, or an artist-level link presented as event-specific.

## Discovery, Enrichment, and Rendering

- SeatGeek is **artist-level and event-level** (artist-level unparked and shipped 2026-07-02). Artist-level destinations must be performer-page URLs captured from the SeatGeek `/2/performers/{id}` API for a registry-verified performer id — never constructed from names. Event-level enrichment auto-apply is limited to high-confidence matches (logged); event-level verification provenance is written only by `scripts/verify-seatgeek-events.mjs`. Fresh approved snapshots may feed the comparison lane only under the price-display rules above.
- **Vivid Seats is live at event level; artist-level entries are not configured.** `scripts/sync-vividseats-events.mjs` is the only writer of event-level `vividseats_url` / `provider_links.vivid-seats` data: it queries the Impact Marketplace Products catalog by exact registry-verified artist name and uses it as both the discovery set and verification oracle (positive match only — clears/un-verifies require a fully-paginated catalog confirming the stored id is gone, never an incomplete fetch). Its sanctioned `--apply` path may write through a validated PR, but the workflow remains manual-dispatch-only until the commented nightly cron is explicitly enabled.
- **Nightly authoritative field-sync** (`.github/workflows/nightly-data-sync.yml` → `scripts/apply-tm-updates.mjs`) may auto-commit **lossless factual updates to events that already exist in `events.json`** — date/time, venue/city, the official listing title (`event_name`, verbatim Discovery API `name`; owner-approved 2026-07-07), and the canonical Ticketmaster URL (refreshed so the `/event/<id>` slug and the `out.js` event-id match stay valid) — sourced directly from the Ticketmaster Discovery API for that exact event id. This sanctioned auto-commit to `events.json` is gated on `events:validate:prod` and the smoke suite passing, and updates are only applied to events with zero review blockers of their own. It is **not** licence to auto-publish anything unverified: event deletions (404/410), cancelled/postponed status (no safe local enum), and `tour_name` (verification-gated, issue #172) are **never auto-applied** — they are surfaced in the rolling `automation:data-sync` issue for human review. Brand-new shows go through the discovery PR flow above (auto-merged only under its owner-approved exception).
- Every non-root route must return route-specific H1, title, and canonical in raw HTML (SSR via `functions/[[path]].js`). Smoke tests assert this; production proof for issue #10 is a human curl/browser checklist.

## What AI Agents May Not Change Without an Explicit Scoped Issue

- Protected code/data: `functions/api/out.js`, `functions/_middleware.js`, `functions/[[path]].js`, `functions/_route-metadata.js`, `public/_routes.json`, and records in `public/data/{artists,catalog,events}.json`.
- Impact credentials and affiliate/CTA destination generation.
- Agents must not invent data, scrape providers, auto-publish artists, or create new governance docs. Auto-publishing events is allowed only via the four sanctioned automation paths above (the validated new-show auto-merge, the nightly lossless field-sync, the nightly SeatGeek CTA sync, and the nightly Vivid Seats CTA sync) — never ad hoc. Edit the canonical docs (`CLAUDE.md` → `PROJECT_STATUS.md` → `BACKLOG.md`) instead of adding parallel ones.

## Dev and Placeholder Content

- No internal or dev wording on public pages at deploy time.
- No mock prices or mock events in production (`MOCK_MODE=false`, `ALLOW_MOCK_PRICES=false` in Cloudflare dashboard).
- No `localhost`, `example.com`, `replace-me`, `placeholder`, or `tbd` strings in any live configuration.
