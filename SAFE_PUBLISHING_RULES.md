# Safe Publishing Rules

Non-negotiable rules for TourTicketCompare. Violating these compromises the site's integrity or affiliate agreements.

See [docs/CONTENT_RULES.md](docs/CONTENT_RULES.md) and [docs/PROVIDER_DATA_POLICY.md](docs/PROVIDER_DATA_POLICY.md) for full detail and provider-specific policy.

---

## Data Integrity

- **Never invent** tours, artists, events, dates, venues, prices, availability, providers, or partner relationships.
- **Never scrape** ticket providers or unofficial sources.
- Accepted verification sources: official artist/venue websites, verified social accounts, Ticketmaster artist pages, Billboard/Pollstar/Variety. Wikipedia alone is not sufficient; AI-generated data is not a source.

## Ticket CTAs

An artist-level "Buy tickets" button may appear only when the artist exists in `public/data/catalog.json`, the provider destination is present in `VERIFIED_TICKET_LINKS`, and the configured redirect passes the provider allowlist and placeholder checks.

An event-level button additionally requires a reviewed event record, a provider-specific destination with publishable verification/provenance, strict provider URL validation, and the required runtime provider configuration. Any independently verified marketplace lane may publish on a `needs_recheck` row only when that provider's own provenance and redirect gates pass; Ticketmaster remains suppressed until its row verification recovers.

If any applicable condition is unmet, show the watchlist / empty state. No placeholder or dead-end links as real CTAs.

## Artist Page Publishing

Artist pages may exist in `indexing_status: "review_required"` with no CTAs. This is the safe default for new artists.

Pages become indexable and conversion-led only after completing the phase gates in [docs/SAFE_NEXT_ARTIST_WORKFLOW.md](docs/SAFE_NEXT_ARTIST_WORKFLOW.md). Do not set `indexing_status: "indexable_with_substantial_content"` without human browser verification of the live ticket URL.

**New artists are never auto-published.** Discovery tooling may only *propose* new artists for human review. Promotion to indexable, and any `VERIFIED_TICKET_LINKS` / `/api/out` entry, require a human to verify the live ticket URL in a browser and to follow the phase gates. New-artist onboarding is no longer parked (lifted 2026-06-10), but every artist must still pass these gates — start from a `review_required` shell per `docs/SAFE_NEXT_ARTIST_WORKFLOW.md`.

**New events: one narrow auto-publish exception (owner-approved 2026-07-07).** The daily Ticketmaster new-show loop (`.github/workflows/tm-new-shows-pr.yml` → `scripts/sync-tm-events-write-pr.mjs --write-pr --auto-merge`) may squash-merge its own PR for **new shows of registry-verified, `sync_enabled` artists only**, and only after the full validation suite (apply-artists validate-with-rollback, `test:mvp`, `git diff --check`) has passed in the same job on exactly the proposed content. Everything else stays human-gated: withheld/risky rows are never written, `tour_name` is never inferred (#172), link publishability still classifies short-form/non-canonical URLs as `needs_recheck` (CTA-suppressed), and a failed merge leaves the PR open for a human — it is never forced.

**SeatGeek event CTAs: a third narrow auto-publish exception (owner-approved 2026-07-07).** The nightly SeatGeek CTA sync (`.github/workflows/seatgeek-cta-sync.yml`) may squash-merge its own PR containing only: high-confidence event-level `seatgeek_url` additions for Ticketmaster-verified events (`scripts/enrich-seatgeek-events.mjs`, unchanged criteria), and `provider_links.seatgeek` verified provenance written by `scripts/verify-seatgeek-events.mjs` after confirming the exact event against the SeatGeek API record for the **registry-verified `seatgeek_performer_id`** (UTC-instant match ±3h, city and venue match, event-URL shape; date-only/timezone-ambiguous rows are skipped). Verified provenance is what lets a SeatGeek CTA publish standalone on a `needs_recheck` event — the recheck flag tracks the broken Ticketmaster storefront URL, not the SeatGeek listing. The same loop self-heals only in the safe direction and only on positive evidence (a URL is corrected or cleared solely after a confirmed-gone/confirmed-mismatch API record plus a successful zero-candidate discovery query; ambiguous matches are reported, never guessed; transient API failures leave data untouched and auth failures abort the run with no writes) and merges only after `events:validate:prod`, partition validation, `test:mvp`, and `git diff --check` pass in-job on exactly the proposed content. It never touches `verification_status`, Ticketmaster links, `tour_name`, `/api/out`, or affiliate logic. Artist-level SeatGeek discovery and new-artist onboarding remain propose-only.

## Price Display

- Do not say "sold out" or "available" based on unverified inventory data.
- Do not publish scraped, invented, manually entered, stale, or mismatched prices.
- A provider lane may display a listed-price snapshot only when explicit display rights, the approved source, exact-event provenance, a matching verified URL, provider flags, currency, observation time, and expiry all pass.
- Comparisons require eligible snapshots for the same local event and currency. Any lower-price statement must call them provider-supplied listed-price snapshots.
- Fees, taxes, availability, delivery, and final checkout totals remain provider-controlled and must be clearly qualified.
- Ticketmaster remains a verification/link source, not a public comparison lane, unless a separately approved source and feature gate are explicitly activated.

## Provider Rights and Catalog Metadata

- Affiliate approval grants link/commission rights only; it never implies price-display, event-data, or comparison rights.
- Marketplace pricing is allowed only where an approved feed/API explicitly permits it. Provider-specific evidence and sources live in `docs/PROVIDER_DATA_POLICY.md`.
- Capability fields in `public/data/catalog.json` are inert metadata. They never substitute for runtime flags, rights, source, exact-event verification, timestamps, or cache freshness.
- Approved snapshot writers are the dedicated provider workflows and the shared Impact marketplace workflow for explicitly enabled numeric-price lanes. A run must expose eligible, fetched, usable, written, skipped, stale, and failed outcomes plus an explicit zero-row reason.
- Failed or unusable observations must never replace an existing fresh row.

## Affiliate and Redirect Rules

- All ticket outbound links must route through `/api/out` — no raw affiliate URLs in HTML or data files.
- `functions/api/out.js` and `VERIFIED_TICKET_LINKS` are protected. Do not modify without explicit scope.
- Impact credentials (network-level and provider-specific) are server-side only. Never expose them in public assets, API responses, client-side code, logs, or documentation.
- **Ticketmaster links carry no affiliate tracking** (the site left the Ticketmaster affiliate programme, 2026-07): they are plain redirects to the verified stored destination. Never re-add Impact wrapping, the Publisher Tag, or `evyy.net` shortlinks for Ticketmaster.
- Every affiliate-provider redirect is server-side tracked and provider-allowlisted. If configuration, validation, or tracking fails, `/api/out` returns diagnostic JSON—never an untracked redirect or a made-up destination.

## Schema and SEO

- Do not add `Event` or `MusicEvent` JSON-LD schema without verified event-level data (confirmed date, venue, artist from an official source).
- MusicEvent nodes carry no `offers`, prices, or availability by default — `scripts/validate-route-schema.mjs` fails the build if they appear — with one exception below.
- **MusicEvent `offers`: a sixth narrow exception (owner-approved 2026-07-22).** This is a display/schema exception, not an automation path — the five sanctioned auto-publish paths are unchanged. The owner confirmed with each programme that display rights for Vivid Seats, TicketNetwork, and StubHub International listed-price snapshots extend to machine-readable redistribution via schema.org Offer JSON-LD. Behind `SCHEMA_OFFERS_ENABLED=true` (default off; `SCHEMA_OFFERS_PILOT_SLUGS` optionally scopes rollout to named artists), a MusicEvent node may carry an `offers` array only for lanes on the code-level allowlist (`SCHEMA_OFFERS_APPROVED_PROVIDERS` in `functions/[[path]].js`), and only when the exact server-side gate that renders the visible price badge passes on the same render — provider configured, event-level provenance publishable, tracked `/api/out` destination, approved source, fresh unexpired cache row, finite price, ISO currency. Each Offer carries only `price`, `priceCurrency`, `priceValidUntil` (the snapshot row's `expires_at` verbatim — the machine-readable claim is time-bounded by the same expiry that hides the visible price), and the tracked `/api/out` URL. **Availability and inventory are never emitted under any flag.** Schema never asserts a price the page does not visibly show at the same render; third-party indexed copies persist until recrawl and are bounded only by their embedded `priceValidUntil` — there is no revocation mechanism. Ticketmaster, SeatGeek, and Ticket Liquidator are excluded. `validate-route-schema.mjs` enforces both the default-environment ban and the mirrored-gate fixture scenarios.
- Do not set a page to `indexable` status until it has substantial, verified content.
- Do not include `noindex` pages in the sitemap.

## Empty States

- When no verified ticket destination exists for an artist or event, show the honest watchlist / empty state — never a placeholder, a dead-end link, or an artist-level link presented as event-specific.

## Discovery, Enrichment, and Rendering

- SeatGeek is **artist-level and event-level** (artist-level unparked and shipped 2026-07-02). Artist-level destinations must be performer-page URLs captured from the SeatGeek `/2/performers/{id}` API for a registry-verified performer id — never constructed from names. Event-level enrichment auto-apply is limited to high-confidence matches (logged); event-level verification provenance is written only by `scripts/verify-seatgeek-events.mjs`. SeatGeek is a CTA-only provider: it has no numeric price-snapshot lane (its API returns null pricing statistics for this client — permanent, owner-confirmed 2026-07-15), so public copy must never claim SeatGeek price snapshots or hard-code SeatGeek into price-comparison claims.
- **Vivid Seats is live at event level; artist-level entries are not configured.** `scripts/sync-vividseats-events.mjs` is the only writer of event-level `vividseats_url` / `provider_links.vivid-seats` data: it queries the Impact Marketplace Products catalog by exact registry-verified artist name and uses it as both the discovery set and verification oracle (positive match only—clears/un-verifies require a fully paginated catalog confirming the stored ID is gone, never an incomplete fetch). Its sanctioned scheduled/apply path writes only through a validated automation PR.
- **Shared Impact marketplace event sync: a fifth narrow auto-publish exception (owner-approved 2026-07-15).** TicketNetwork, Ticket Liquidator, and StubHub International run in serialized nightly lanes through `.github/workflows/impact-marketplace-provider-sync.yml` after their provider-specific Impact credentials and catalog contracts were confirmed by the owner. Each lane may write and auto-merge only campaign-isolated, unambiguous exact-event links after the offline matcher, production event validation, partition validation, `test:mvp`, and `git diff --check` pass in the same job on exactly the proposed content. Incomplete catalogs preserve existing links, ambiguous matches do not write, no prices or availability claims are created, manual dispatch remains preview-first, and approval is never inferred between StubHub International and StubHub US/Canada.
- **Nightly authoritative field-sync** (`.github/workflows/nightly-data-sync.yml` → `scripts/apply-tm-updates.mjs`) may auto-commit **lossless factual updates to events that already exist in `events.json`** — date/time, venue/city, the official listing title (`event_name`, verbatim Discovery API `name`; owner-approved 2026-07-07), and the canonical Ticketmaster URL (refreshed so the `/event/<id>` slug and the `out.js` event-id match stay valid) — sourced directly from the Ticketmaster Discovery API for that exact event id. This sanctioned auto-commit to `events.json` is gated on `events:validate:prod` and the smoke suite passing, and updates are only applied to events with zero review blockers of their own. It is **not** licence to auto-publish anything unverified: event deletions (404/410), cancelled/postponed status (no safe local enum), and `tour_name` (verification-gated, issue #172) are **never auto-applied** — they are surfaced in the rolling `automation:data-sync` issue for human review. Brand-new shows go through the discovery PR flow above (auto-merged only under its owner-approved exception).
- **Daily verification-date auto-commit (owner-approved 2026-07-28).** The daily audit (`.github/workflows/daily-audit.yml` → `scripts/bump-verified-dates.mjs`) may auto-commit `last_verified_at` bumps on `public/data/artists.json` **directly to `main`**, but only for artists whose URL liveness check and Ticketmaster Discovery diff both came back clean that day, and only after in-job validation (`npm run test:mvp`, `git diff --check`) passes on exactly the bumped content. This writes a freshness timestamp on already-published clean artists — it never adds/removes artists, never changes CTAs, links, prices, `tour_name`, or `verification_status`, and never touches `/api/out` or affiliate logic. The TM-skip/failure and WAF-blocked (401/403/429) guards still hold the bump when liveness is unproven. This replaced the former human-review PR flow; no `automation/verified-dates-*` PR is opened.
- Every non-root route must return route-specific H1, title, and canonical in raw HTML (SSR via `functions/[[path]].js`). Smoke tests assert this; production proof for issue #10 is a human curl/browser checklist.

## What AI Agents May Not Change Without an Explicit Scoped Issue

- Protected code/data: `functions/api/out.js`, `functions/_middleware.js`, `functions/[[path]].js`, `functions/_route-metadata.js`, `public/_routes.json`, and records in `public/data/{artists,catalog,events}.json`.
- Impact credentials and affiliate/CTA destination generation.
- Agents must not invent data, scrape providers, auto-publish artists, or create new governance docs. Auto-publishing events is allowed only via the five sanctioned automation paths above (the validated new-show auto-merge, the nightly lossless field-sync, the nightly SeatGeek CTA sync, the nightly Vivid Seats CTA sync, and the nightly shared Impact marketplace link sync) — never ad hoc. Edit the canonical docs (`CLAUDE.md` → `PROJECT_STATUS.md` → `BACKLOG.md`) instead of adding parallel ones.

## Dev and Placeholder Content

- No internal or dev wording on public pages at deploy time.
- No mock prices or mock events in production (`MOCK_MODE=false`, `ALLOW_MOCK_PRICES=false` in Cloudflare dashboard).
- No `localhost`, `example.com`, `replace-me`, `placeholder`, or `tbd` strings in any live configuration.
