# TourTicketCompare Backlog

Last updated: 2026-07-30 (agent: owner-reviewed storefront and tour-label cleanup — five official Ticketmaster links restored, one duplicate Shakira row removed and tombstoned, seven confirmed tour mappings applied, and routine-hygiene counts refreshed. Past-only audit findings now remain in artifacts without presenting as current human work. No priority or scope changes. Earlier: 2026-07-28 fact corrections; 2026-07-22 city aggregation and price-alert design).

## Active priorities (in order)

All remaining active work is **operational** (owner + gated tooling), not engineering. Each item stays here until verifiably done.

### 1. Affiliate-pivot owner follow-ups (2026-07-02)

1. **Post-deploy verification:** confirm `/api/out?artistSlug=<slug>&provider=ticketmaster` 302s plain and `provider=seatgeek` 302s to the Impact tracking URL; confirm no `utt.impactcdn.com` requests in devtools; browser-verify the 7 swapped plain Ticketmaster artist URLs and 16 SeatGeek performer-page URLs if not already done (lists in `data/provider-identities.json`).
2. **Delete the unused `IMPACT_TICKETMASTER_*` secrets** in the Cloudflare dashboard (keep `IMPACT_ACCOUNT_SID` / `IMPACT_AUTH_TOKEN`).
3. **Price snapshot operations:** both Cloudflare display flags are enabled. The latest inspected Vivid Seats price run fetched and wrote all 208 eligible rows; continue monitoring its scheduled summaries. **SeatGeek price snapshots are permanently disabled (2026-07-15, owner-confirmed):** the SeatGeek API returns null pricing statistics for this client and never will, so the schedule was removed from `seatgeek-price-snapshots.yml` (manual dispatch retained as an escape hatch). SeatGeek stays a CTA-only provider; no owner action outstanding. Artist-level Vivid Seats entries remain separate scope.
4. When the first SeatGeek-first events publish without Ticketmaster URLs, relax `validate-cta-provider-state.mjs` hard error #3 to "publishable ⇒ ≥1 resolvable provider URL" **in that same PR**.

### 2. Impact provider operations — TicketNetwork, Ticket Liquidator, StubHub International

Public activation completed on 2026-07-13 using the existing SeatGeek-scoped Impact credentials and the verified provider campaigns/catalogs. Continuing operations are:

1. Monitor the nightly scheduled event-sync runs (06:00/06:30/07:00 UTC) via their auto-merged PRs and `reports/provider-sync/`; for manual dispatch, run preview before apply, review its PR, and browser-check new sample destinations across markets.
2. Monitor the four-hour TicketNetwork and StubHub International exact-ID price snapshot schedule. Ticket Liquidator must stay price-disabled until its catalog supplies numeric `CurrentPrice`.
3. Monitor catalog/campaign access and tracking. Set the matching public flag explicitly to `false` on a provider/API mismatch or redirect failure.

_[Corrected 2026-07-16, agent]_ Provider event-sync scheduling and auto-merge are **no longer off**: PR #480 (2026-07-15, owner-approved) scheduled all three lanes nightly with post-validation auto-merge; manual dispatch remains preview-first with review-only apply. StubHub International is separate from StubHub US/Canada.

### 3. Roster growth (2026/27 tours)

Run `npm run artists:onboard:propose` with target artist names (US/EU major tours), create shells, human-review the manifest, then `npm run artists:promote:batch --write` (≤20/PR, per-artist human browser spot-check checklist in the PR body). Event enrichment follows via the existing `seatgeek:propose` / `seatgeek:enrich` and TM new-show pipelines. Never auto-publish.

_In flight (2026-07-15, updated 2026-07-16): first Tier-1 batch — 4 shells added (PR #465); Post Malone + Zach Bryan promoted (PR #466) and their event records landed via the discovery batch PR #472 (post-malone 5, zach-bryan 15; `tour_name` blank pending human verification, 378 recognised rows withheld for review in the batch artifact); Sabrina Carpenter + Lady Gaga held as `review_required` shells pending live dates. Next candidates: Sabrina/Gaga promote once dates land, then Tier 2 (The Weeknd, Coldplay — SeatGeek-first, international-domain caveat) and Tier 3 (Jelly Roll, Journey, Tame Impala)._

_[Updated 2026-07-22, agent]_ Tier 2/3 propose ran (`artifacts/onboarding/batch-2026-07-22.json`): The Weeknd, Coldplay, Jelly Roll, Tame Impala captured with exact-name SeatGeek + Ticketmaster identities and owner Gate-1-checked (destinations browser-confirmed); Journey excluded — no exact-name SeatGeek performer match, needs manual identity resolution. All four added as `review_required` shells.

_[Updated 2026-07-29, agent — fact addition, no re-scoping]_ **Two findings, both dated; priority order unchanged.**

1. **Onboarding capture bug fixed.** Ticketmaster Discovery returns attraction `url` values that are sometimes already Impact affiliate links (`ticketmaster.evyy.net/c/...?u=<real url>`), inconsistently — the same attraction returns clean on one call and wrapped on the next (4 of 6 sampled artists were wrapped). `propose-onboarding-batch.mjs` accepted any https URL, so the wrapper entered the manifest; `promote-artists-batch.mjs` then rejected it on the out.js host allowlist, and since any reason blocks the whole row, the artist silently failed to promote. Nothing unsafe ever shipped (it fails closed) and no wrapped URL is stored in `data/provider-identities.json`. Capture now strips the wrapper, keeps only its destination, and validates that against the storefront allowlist — mirroring `resolveTicketmasterUrl()` in `propose-artists.mjs`.

2. **Candidate shortlist captured 2026-07-29** (manifests live in gitignored `artifacts/` and do not survive environment recycling, so the names are recorded here). Identity captured cleanly for all six via `artists:onboard:propose`, zero exclusions: **Gracie Abrams** (SG 786104 / TM K8vZ917_vc7), **Niall Horan** (165432 / K8vZ9174OHV), **Doja Cat** (297762 / K8vZ9173TJf), **Sombr** (1955379 / K8vZ917ji4V), **Latto** (757036 / K8vZ917_glV), **John Summit** (783794 / K8vZ917_pO7). Sourced from `roster:forecast:candidates` and ranked by at-risk pages covered. **No shells were created** — the Shell phase writes protected data files and the `factual_summary` prose is not API-derived, so it needs owner review before it lands (the Sombr summary in particular was left deliberately thin). Regenerate the manifest with `--allow-existing-shells` if shells exist by then.

_[Updated 2026-07-22, agent — promote]_ **jelly-roll and tame-impala batch-promoted** (`ticketmaster` + `seatgeek` artist-level CTAs, registry entries, `VERIFIED_TICKET_LINKS`); merge is blocked on the per-artist browser spot-check checklist in the PR body. The gitignored manifest had not survived the session environment, so it was regenerated with the new `--allow-existing-shells` flag on `artists:onboard:propose` — the re-captured identities matched the Gate-1-checked facts exactly (performer/attraction ids and upcoming-event counts). Remaining: the-weeknd and coldplay stay `review_required` until SeatGeek listings firm up (0 and 1 upcoming at capture); Sabrina/Gaga still held pending live dates; Journey still needs manual identity resolution. Event enrichment for the promoted pair arrives via the scheduled TM/SeatGeek pipelines once records exist.

### 4. Routine data hygiene (recurring)

- **`needs_recheck` re-checks:** **46 events** carry this state as of 2026-07-30 (gracie-abrams 7, niall-horan 7, sombr 6, olivia-rodrigo 6, zach-bryan 4, bts 4, john-summit 3, tame-impala 3, bad-bunny 2, ed-sheeran 2, doja-cat 1, jelly-roll 1). Verified resale provenance keeps 29 standalone SeatGeek CTAs publishable and gives **41 of 46** rows at least one independent resale route. The 5 fully CTA-suppressed rows are all past events; no upcoming recheck row is fully suppressed. Re-check Ticketmaster storefront URLs periodically; never restore from the Discovery `url` field alone.
- **Blank tour labels:** Owner-confirmed mappings were applied on 2026-07-30 to Zach Bryan, Tame Impala, Gracie Abrams, Niall Horan, Doja Cat, Sombr, and 22 John Summit arena-tour rows. The remaining validator warning is expected for 10 event rows: JAY-Z Inglewood/London are owner-accepted as blank (the Yankee Stadium rows use "JAY-Z Yankee Stadium 2026"); John Summit's separate Lollapalooza aftershow is deliberately not labelled as the arena tour; and Bad Bunny Brussels, Jelly Roll Colorado Springs, and 5 Post Malone rows still need event-specific human confirmation. Never infer tour names from URL slugs.
- **Tombstone dedup deletions:** when you delete a row from `events.json` that Ticketmaster still lists (a duplicate or dead-storefront copy), add its ids and/or venue/date to `data/deleted-events.json` in the same change so the 04:00 recogniser does not re-propose it (see `docs/PROVIDER_SYNC.md`). The registry only ever withholds; leaving an entry out just reverts to the old re-add behaviour.
- Review the rolling automation issues (`automation:daily-audit`, `automation:data-sync`) and any withheld rows from the new-show PRs.

## Recently completed

Closed on GitHub / done in the repo; kept as a short audit trail only. Details live in git history and `PROJECT_STATUS.md`.

- **City landing pages for organic/local discovery (2026-07-22).** Added `/cities` and normalized `/cities/<city-country>` aggregation routes derived only from reviewed upcoming `events.json` records. A follow-up people-first quality review raised the indexability gate to ≥4 upcoming shows across ≥2 artists; thinner known routes remain `noindex`, unknown slugs 404, country aliases merge before canonical slugging, and city↔artist↔venue links complete the contextual link graph. Qualifying pages include direct-answer summaries, artist/date/venue-specific coverage, visible editorial provenance, buying guidance, and FAQs grounded in the same reviewed records. `Place`/`CollectionPage`/`ItemList`/visible-answer FAQ schema, sitemap entries with data-derived `lastmod`, `llms.txt` city/venue inventories, and whole-set smoke/internal-link coverage shipped in the same change.
- **Guide source and answer audit (2026-07-22).** Reviewed all 17 long-form buying guides for depth, visible authorship, source transparency, and answer coverage. Every guide now renders at least two reviewed primary-source links; the five guides that lacked an authored FAQ gained concise, source-consistent answers, with visible content and `FAQPage` JSON-LD generated from the same blocks. The internal-link audit now fails if a guide loses its provenance, sources, Article/FAQ schema, or substantive authored sections.

- **Storefront recheck resolution + duplicate-row dedup (2026-07-15, owner-directed).** Owner browser-checked all 36 `needs_recheck` storefront URLs: 19 working links restored to `human_verified` (BTS Munich ×2, all 12 Shakira Madrid residency dates, plus Ariana Sunrise ×3 / Summer Walker / ROSALÍA restored as plain "Check Ticketmaster" links since their pages load but aren't on sale via TM), 5 confirmed-dead cleared, leaving 13 `needs_recheck`. Separately deduped 17 duplicate rows: 13 Ariana Grande (`human_verified` hex-id + `machine_high_confidence` Discovery-id copies of the same show), 3 Bad Bunny (dead `.com` `needs_recheck` rows duplicating published `.de`/`.be` `human_verified` rows), and 1 Shakira "Shakira Stadium" 9/27 quirk — always deleting the redundant/dead copy and keeping the row with the working CTA + resale coverage. Net 397→380 events; full validation suite green.

- **Venue landing pages (2026-07-14; quality gate raised 2026-07-22).** `/venues` index + `/venues/<slug>` pages are a server-rendered aggregation over reviewed `events.json` (`functions/_venues.js`, shared with the sitemap). The people-first quality review raised indexability from ≥2 shows to ≥3 shows across ≥2 artists; thinner known pages remain `noindex`. Qualifying pages now add direct answers, artist/date coverage, editorial provenance, buying guidance, and visible FAQs grounded in the same event records. No invented data or duplicate provider logic; pages retain gated event cards and links to artist pages, normalize venue+city slugs, emit `MusicVenue`/`CollectionPage`/`ItemList`/FAQ structured data, and remain covered by sitemap, smoke, and whole-set audits.
- **Guide internal-linking (2026-07-14).** Curated "Related guides" cross-link section added to all 17 topic guides (guide-to-guide internal links ~24 → 74) and the event-price comparison guide placed in a themed `/guides` cluster.

- **Documentation lifecycle cleanup (2026-07-13).** Updated the stable docs for the active multi-provider site, removed `HANDOVER.md` and the stale `docs/archive/` tree, moved generated provider audit logs to `reports/provider-sync/`, and added `npm run docs:check` to CI so broken links, missing commands, and retired doc paths cannot silently return.
- **SeatGeek CTA sync automation (2026-07-08, owner-approved).** Nightly `seatgeek-cta-sync.yml` (05:00 UTC): SeatGeek URL enrichment auto-apply + new `scripts/verify-seatgeek-events.mjs` identity-anchored verification writing `provider_links.seatgeek` verified provenance (standalone SeatGeek CTAs on `needs_recheck` events; wrong-night URL self-heal; safe-direction clearing). Auto-merge PR after in-run validation — third narrow auto-publish exception in `SAFE_PUBLISHING_RULES.md`. New hard error in `validate-cta-provider-state.mjs` guards the provenance contract.
- **Repo + docs cleanup (2026-07-07, owner-approved).** Deleted: legacy CSV pipeline (`data/events.csv`, `csv-to-events.py`), `/api/click`, dead `public/data/{inventory-model,affiliate-routes}.json`, one-time `enrich-events-with-provider-links.js`, abandoned growth pipeline, retired Phase 1/2 discovery stack (`tm-discovery-proposal.yml`, `tm-discovery-shell-pr.yml`, `candidates-audit.yml` + their scripts — batch onboarding and `tm-new-shows-pr.yml` are canonical), `archive/vercel-experimental/`, `.codex/` stub. Docs consolidated: `PROJECT_BRIEF.md`, `docs/AI_AGENT_WORKFLOW.md`, `docs/VALIDATION_CHECKLIST.md`, `docs/ARTIST_SCALING_MAP.md` merged into `CLAUDE.md`/`CONTRIBUTING.md`/onboarding docs; superseded one-off docs removed after durable guidance was consolidated. Migrations renumbered (`migrations/README.md` records applied state).
- **Item 6 — blank `tour_name`/`event_name` on automation-landed events (closed 2026-07-07).** 62/63 blank `tour_name` and all 63 blank `event_name` values backfilled from Ticketmaster Discovery API listing titles (by stored Discovery event id, never URL slugs), cross-checked against official announcements. Process hole closed: discovery now lands `event_name` verbatim from the API; nightly sync keeps it fresh; `tour_name` stays human-gated (#172). Auto-titling was chosen over defaulting rows to `needs_recheck` (owner direction, minimal-input operation).
- **Hands-off update automation (2026-07-07, owner-approved).** Daily new-show PR auto-merges after its in-run validation suite passes; nightly data-sync cron re-enabled with a per-event commit gate; `event_name` added to the lossless auto-sync field set. Narrow auto-publish exception documented in `SAFE_PUBLISHING_RULES.md`.
- **SeatGeek event-level enrichment (2026-07-06).** 28 event-level `seatgeek_url` values applied (identity-confirmed via registry performer ids); coverage 262/402. Zero SeatGeek candidates re-confirmed for the 87 uncovered TM-verified events (European/non-US legs — structural gap, not untried).
- **Affiliate pivot (2026-07-02, Vivid event lane activated 2026-07-10).** Ticketmaster affiliate machinery removed (plain TM links remain, rendered after affiliate providers); SeatGeek promoted to primary CTA with 16 artist-level performer-page entries; Vivid Seats event-level CTAs activated with 218 verified destinations; batch onboarding tooling landed.
- **Earlier closeouts:** slugify shared-helper consolidation (2026-06-17); ROSALÍA onboarding (2026-06-17); Summer Walker `tour_name` (2026-06-16); #176 stale-file deletions (2026-06-19, completed by the 2026-07-07 cleanup); #172 tour-name gaps (2026-06-12); #171 Olivia Rodrigo verified links (2026-05-27, PR #190); #175 onboarding runbook + validator (2026-06-01, PR #188).

## Proposed — design only, not scheduled (owner approval required before any build)

### Price-alert feature design proposal (2026-07-22, agent-authored)

A user-facing "track this price" feature: a visitor subscribes to a tracked event, confirms by email (double opt-in), and receives an email when a fresh provider price snapshot crosses their threshold or drops materially. **Design only — no code exists.** Building it requires owner sign-off on the open decisions at the end, plus explicit scope for the protected files it touches.

**Verdict and rollout (added 2026-07-22 after checking production data):** do not build the email stack yet — demand is not there. Instead follow the phased rollout in §7, whose only immediate action is starting `provider_pricing_history` writes (§7 Phase 0), because history cannot be backfilled.

**Production D1 evidence (read-only queries, 2026-07-22):**

- `email_subscribers`: **8 rows total since 2026-04-30, 1 in the last 30 days**; 2 `artist_interests`. The email audience is single-digit — the ESP/compliance/deliverability cost is fixed while the benefit scales with subscribers.
- Outbound clicks are healthy (~7.1k `outbound_click` events since 2026-05-01) — the affiliate click engine, not email, is where value currently accrues; the alert thesis (emails drive high-intent return clicks) is sound but premature at this audience size.
  - _[Corrected 2026-07-28, agent] This figure is substantially bot traffic and overstates real demand._ Of July 2026's 6,445 `outbound_click` rows, 3,352 (52%) carried a self-identifying crawler user agent — GPTBot 1,218, MJ12bot 965, jscrawler 578, ClaudeBot 199, SemrushBot 71, DotBot 67 — and `request_key` was NULL on every row, so nothing was deduplicated. Crawlers follow every affiliate link on a page, which multiplies one crawl into dozens of "clicks". Real browser-side traffic over the same month was ~138 distinct `request_key`s across all `page_view` rows (an upper bound — generic desktop UAs are not verified human). `/api/out` now skips the analytics write for self-identifying crawlers (`functions/_bot-detection.js`), so counts from 2026-07-28 forward are comparable only to each other, not to the inflated history above. The conclusion the bullet draws is unchanged in direction — email is still premature — but the click volume must not be cited as evidence of audience size.
- `provider_pricing_cache` is healthy: ~200 fresh rows per lane (vivid-seats 228 events / 198 fresh, stubhub-international 212 / 198, ticketnetwork 205 / 182 at query time).
- **`provider_pricing_history` (migration 0006) is completely empty.** The snapshot writers only upsert `provider_pricing_cache`; nothing has ever appended history. Both the drop-alert logic (§3) and any on-site price-history display have no data behind them today, and lost weeks are unrecoverable.

**Hard constraints honoured by this design:**

- Only the lanes that actually produce numeric snapshots participate: **Vivid Seats, TicketNetwork, StubHub International**. SeatGeek has no pricing lane (null pricing stats, permanent, owner-confirmed 2026-07-15) and Ticket Liquidator is price-disabled — both are structurally excluded, not just flagged off. Ticketmaster is never a price source.
- An alert may fire **only on a snapshot the site would publicly display at the same moment**: approved source, exact-event provenance, matching verified URL, provider flags, finite numeric price, currency, fresh/unexpired per `expires_at`. The alert layer reuses the display gate; it never has looser rules.
- All framing is snapshot framing per `SAFE_PUBLISHING_RULES.md`: no "cheapest", no live-inventory or availability implication, per-provider timestamps, no cross-provider ranking.
- The check runs in the **scheduled GitHub Actions layer** (the same layer that writes snapshots), not Cloudflare Cron.

#### 1. Schema changes (one new migration, `0008_price_alerts.sql`; extends `0001`, duplicates nothing)

`ALTER TABLE email_subscribers ADD COLUMN` (existing rows keep working; no new subscriber table):

- `email_status TEXT NOT NULL DEFAULT 'capture_only'` — `capture_only | pending_confirm | confirmed | unsubscribed | suppressed` (bounce/complaint). **All pre-existing rows stay `capture_only` and are never emailed**: they consented to watchlist capture, not to receiving mail.
- `confirm_token_hash TEXT`, `confirm_sent_at TEXT`, `confirmed_at TEXT` — double-opt-in state; token stored as SHA-256 hash only.
- `unsubscribe_token_hash TEXT`, `unsubscribed_at TEXT` — per-subscriber one-click-unsubscribe token, hashed at rest.
- `consent_snapshot TEXT` — JSON record of what was consented to and when (source path, hashed request key, wording version) for GDPR/PECR evidence.

New table `price_alert_subscriptions` — the alert rules (references `email_subscribers.email`):

- `id`, `email`, `artist_slug`, `event_id` (exact event only — snapshots are per-event), `alert_type` (`threshold` | `drop`), `threshold_price REAL` (threshold type only), `currency TEXT`, `status` (`active | paused | ended`), `ended_reason` (`event_past | event_removed | lane_disabled | unsubscribed`), `last_notified_at`, `last_notified_low REAL`, `created_at`, `updated_at`, `UNIQUE(email, event_id, alert_type)`.

New table `price_alert_notifications` — immutable send log and idempotency guard:

- `id`, `subscription_id`, `event_id`, `provider`, `history_row_id` (FK-by-value to `provider_pricing_history.id`), `observed_low REAL`, `currency`, `snapshot_observed_at`, `sent_at`, `delivery_status`, `message_id`, with `UNIQUE(subscription_id, history_row_id)` so a re-run of the dispatch job can never double-send for the same observation.

Rate caps reuse the existing `rate_limits` table (keyed `alerts:<hash>:<window>`), same pattern as `functions/api/signup.js`. Reads of `provider_pricing_cache` (0003) and `provider_pricing_history` (0006) are unchanged — the alert layer is a pure consumer.

#### 2. User flow (double opt-in, one-click unsubscribe)

1. **Entry point:** a "Track price" control appears only on event rows that currently pass the public price-display gate for at least one numeric lane — i.e. exactly where a visible price badge renders. Events with only SeatGeek/Ticketmaster/Ticket Liquidator CTAs get the existing watchlist signup, never a price-alert control (no implied pricing where none exists).
2. **Subscribe:** `POST /api/alerts/subscribe` with email + eventId (+ optional threshold). Validates the event against the reviewed `events.json` set fail-closed (mirroring the `signup.js` artist-slug allowlist approach), honeypot field, rate caps (below). Creates/updates the `email_subscribers` row as `pending_confirm` and an `active`-pending subscription, then sends **one** confirmation email containing a single-use confirm link. Response is deliberately neutral ("check your inbox") whether or not the email already exists — no subscriber enumeration.
3. **Confirm (double opt-in):** the link hits `/api/alerts/confirm?token=…`; server hashes the presented token, matches, checks a 48-hour expiry, sets `confirmed` + `confirmed_at`, invalidates the token. Only `confirmed` subscribers ever receive alert emails. Unconfirmed subscriptions are purged after 7 days.
4. **Unsubscribe (one-click):** every email carries `List-Unsubscribe` + `List-Unsubscribe-Post: List-Unsubscribe=One-Click` (RFC 8058) pointing at `POST /api/alerts/unsubscribe?token=…` — mail clients unsubscribe in one click with no page. The visible footer link is a `GET` landing page with a single confirm button (never auto-unsubscribe on GET — inbox scanners prefetch links). Default action ends **all** alerts for the address (safest); the landing page can offer per-subscription removal as the secondary option.
5. **Auto-end:** subscriptions flip to `ended` (with reason) when the event date passes, the event leaves `events.json`, or the provider lane's public/price flags go off. No mail is sent about auto-ending.
6. **Sending mechanics:** the repo currently has no email-sending capability at all. Confirmation emails need to be near-real-time, so the subscribe Function calls a transactional ESP HTTP API server-side (new Cloudflare secret binding); alert emails are sent from the Actions layer using the same ESP credential as a GitHub secret. ESP choice, domain authentication (SPF/DKIM/DMARC on tourticketcompare.com), and the sending subdomain are owner decisions and prerequisites — see risks.

#### 3. Alert trigger logic (GitHub Actions layer)

A shared `scripts/dispatch-price-alerts.mjs`, run as a **final job appended to the two existing snapshot workflows** (`impact-marketplace-price-snapshots.yml`, currently `17 */4 * * *` for TicketNetwork + StubHub International; `vividseats-price-snapshots.yml`, `47 */4 * * *`), gated behind each workflow's existing "healthy automated write" check so alerts only run after fresh rows actually landed. Manual `workflow_dispatch` defaults to dry-run (no sends, JSON summary only), matching the house preview-first convention.

Per active `confirmed` subscription:

- Load the latest **usable** row per (event_id, provider) from `provider_pricing_cache` applying the exact display-eligibility gate; skip anything stale, expired, non-numeric, or from a non-approved lane.
- **Threshold alerts:** fire when `low_price <= threshold_price` in the subscription's currency, and either no prior notification exists or the price re-armed (a later same-provider history row went back above threshold since the last send). Same-currency comparison only; no FX conversion.
- **Drop alerts:** compare against the immediately previous `provider_pricing_history` row for the **same provider** (never cross-provider); fire on a drop ≥ max(5%, one currency unit ×5) — tunable constant. Cross-provider comparison is structurally impossible in this design, which is what keeps "cheapest" claims out.
- **Cooldowns:** at most 1 email per subscription per 24h, and a per-recipient global cap (4 alert emails/day across all their subscriptions). Cooldown state lives on the subscription row; idempotency lives in `price_alert_notifications` (`UNIQUE(subscription_id, history_row_id)` inserted **before** the send call, so retries and workflow re-runs cannot double-send).
- **Per-run hard send cap** (e.g. 200) — a bug or data anomaly can never mass-mail; hitting the cap fails the job loudly for human review.
- Run summary printed like the snapshot jobs: eligible / evaluated / fired / suppressed-by-cooldown / send-failed, plus an explicit zero-send reason.

#### 4. Email content that survives the publishing rules

- **Subject:** `Price snapshot update: <Artist> — <City>, <date>`. Never "deal", "cheapest", "selling fast", "last chance", or countdowns.
- **Body per provider line (no ranking, no aggregate):** "As of <UTC timestamp>, <Provider>'s listed-price snapshot for <event name, venue, local date> showed tickets from <currency><low>. This is a provider-supplied listed-price snapshot — not live inventory, an availability statement, or a final checkout total. Fees, taxes, delivery and availability are controlled by the provider and may differ."
- If several providers have eligible snapshots, each gets its own line with its own timestamp; the email never says which is lowest.
- CTA buttons route through the tracked `/api/out` redirect (with an email-source parameter — a scoped change to a protected file, flagged below). No raw affiliate URLs in email HTML.
- **Footer (every email):** why you're receiving this (double-opt-in date + event), the one-click unsubscribe link, operator identity/postal details (CAN-SPAM), and the independence line ("independent, unofficial fan resource; not affiliated with the artist, venue, or any ticket provider").
- Confirmation email contains no prices at all — just the confirm link and what was requested.

#### 5. Abuse and rate limiting

- Subscribe endpoint: reuse the `signup.js` pattern — hashed IP+UA key in `rate_limits`, 5 requests / 10 min — plus per-email caps: max 3 confirmation emails per address per day, max 25 active subscriptions per address, max 1 pending-confirm resend per hour.
- Honeypot field (as in `signup.js`) and an 8 KB body cap.
- Global daily confirmation-send budget (counter row) to protect ESP reputation from signup floods.
- Tokens: 256-bit random, stored only as SHA-256 hashes (a D1 read leak forges nothing); confirm tokens single-use with 48h expiry; unsubscribe tokens long-lived but revocable per address.
- Neutral responses everywhere — no endpoint discloses whether an address is subscribed.
- ESP bounce/complaint feedback (webhook or periodic pull) flips `email_status` to `suppressed`; suppressed addresses are excluded structurally from every send path.

#### 6. Risks and open owner decisions

1. **Email is an entirely new capability.** ESP selection, cost, SPF/DKIM/DMARC on the apex or a dedicated sending subdomain, and warm-up are prerequisites; deliverability/reputation is a new ongoing operational surface. Owner decision before any build.
2. **Rights check:** affiliate approval grants link rights, not automatic email-redistribution of provider price data. Owner must confirm with each programme that snapshot display rights extend to email (parallel to the 2026-07-22 schema-offers rights confirmation, which covered JSON-LD only).
3. **Compliance:** double opt-in + consent records cover PECR/GDPR consent, but an erasure path (delete a subscriber and all linked rows on request) and a stated retention policy for D1 email data are needed. EU recipients are certain given StubHub International coverage.
4. **Latency-expectation gap:** snapshots refresh every ~4 hours; the listed price can change before the user clicks. Snapshot framing is the mitigation, but mismatch complaints feed spam reports, which feed deliverability risk — reinforcing the strict copy rules above.
5. **Protected-file scope:** the "Track price" UI (`functions/[[path]].js` render path), an email-source tracking parameter on `/api/out`, and new `/api/alerts/*` Functions all need explicit scoped approval; nothing here is buildable under routine task scope.
6. **Mass-send blast radius:** mitigated by the healthy-write gate, dry-run-default dispatch, the idempotency table, per-recipient caps, and the per-run hard cap — all five are load-bearing and none may be dropped during implementation.
7. **SeatGeek asymmetry confusion:** users on SeatGeek-CTA-only events may expect price alerts that can never exist. The entry-point gating (control renders only where a price badge renders) is the mitigation; copy must not promise alerts site-wide.
8. **D1 PII growth:** emails become linked to behavioural data (which events, which thresholds). Keep the notification log price-only, no click tracking beyond the existing `/api/out` analytics.

#### 7. Phased rollout with a demand gate (recommended path)

Each phase is separately scoped work; only Phase 0 is recommended for immediate action. The gate between Phases 1 and 2 is the worth-it decision — everything email-related stays unbuilt until it passes.

- **Phase 0 — start recording history (do now, cheap):** extend the three snapshot writers (`snapshot-vividseats-prices.mjs`, `snapshot-impact-marketplace-prices.mjs` lanes) to append each usable observation to `provider_pricing_history` in the same run that upserts the cache. Small scoped change to existing sanctioned tooling; no new public surface, no email, no schema change (the 0006 table already exists, empty). This starts the unrecoverable data clock for everything below. _Implemented 2026-07-22 on `claude/price-alert-design-4p8rd9` (owner-directed): both writers now emit `INSERT OR IGNORE` history rows keyed `provider:event_id:observed_at` in the same generated SQL file as the cache upsert; self-tests extended and passing. History accumulation begins with the first scheduled snapshot runs after merge to `main`._
- **Phase 1 — on-site price history + demand instrument (no email):** once a few weeks of history exists, render per-event price history (same display-eligibility gates as the price badge, snapshot framing, per-provider only — no cross-provider ranking). Alongside it, a "Want an email when this price drops?" button that only records interest through the existing signup/capture mechanics (`analytics_events` + `email_subscribers` as `capture_only`) — **nothing is ever sent**. This delivers most of the fan value at near-zero compliance cost and measures real alert demand. _Implemented 2026-07-23 on `claude/phase-1-price-history-plan-a46u6y` (owner-directed): new read-only `functions/api/price-history.js` reuses the badge gate via `attachApprovedMarketplacePrices`; `public/app.js` renders a lazy-loaded per-provider sparkline panel + a `intent=price_alert` interest form posting to the existing `/api/signup` (capture_only, no send). No protected files touched; `test:mvp` green. Demand-gate counter to watch: distinct `price_alert_interest` analytics events by email — see `PROJECT_STATUS.md`._
- **Demand gate (owner decision):** a concrete threshold — suggested **100–200 distinct alert-interest signups within a quarter**. Below it: keep Phase 1, skip the email stack entirely, revisit as traffic grows. Above it: a warm, self-selected launch cohort exists and Phase 2 is justified.
- **Phase 2 — email prerequisites (only past the gate):** owner confirms per-programme email-redistribution rights (risk #2); ESP selection and DNS (SPF/DKIM/DMARC on a dedicated sending subdomain, risk #1); GDPR/PECR erasure path and retention policy (risk #3); then build the `0008` migration, double-opt-in flow, and unsubscribe infrastructure per §§1–2.
- **Phase 3 — soft launch:** enable the dispatch job (§3) for the Phase-1 interest cohort only, with the per-run hard cap and dry-run-default dispatch live from day one. Watch complaint/bounce rates for several weeks (complaint rate must stay well under 0.1%); only then open subscription to all eligible events. All five blast-radius mitigations (risk #6) remain load-bearing throughout.

## Explicitly parked

Intentionally not work until separately scoped and owner-approved. Unparking removes the scope freeze, not the verification rules.

- **Tour / individual event landing pages.** No separate verified-content and canonical/indexing strategy. (City and venue aggregation pages are implemented — see "Recently completed".)
- **Live inventory aggregation; "cheapest ticket" / "guaranteed availability" claims.** Approved provider lanes are timestamped listed-price snapshots, not live inventory or checkout-total guarantees.
- **Provider expansion beyond SeatGeek, Vivid Seats, TicketNetwork, Ticket Liquidator, and StubHub International.** Adding any further provider still requires a separate verified feed, explicit written usage rights, and scoped integration work.
- **Provider abstraction implementation.** `functions/api/_providers/index.js` and `functions/_provider-registry.js` are scaffolding; do not build on them without a real provider integration scoped first.

## How to update this file

Refresh whenever work items open, close, or change priority. Owner-managed: agents may correct facts (dated, flagged) but not reorder or re-scope priorities. Parked items should be removed only when their underlying constraint is resolved (e.g. an approved provider feed exists).
