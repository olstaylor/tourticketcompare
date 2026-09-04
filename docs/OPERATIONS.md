# Operations

Workflow schedules, secrets/bindings reference, and known infrastructure incidents. Durable architecture and contracts live in [ARCHITECTURE.md](ARCHITECTURE.md); the deploy runbook and full configuration setup steps live in [DEPLOYMENT.md](DEPLOYMENT.md) (this file does not repeat that detail — it is the live activation/schedule snapshot). Current data counts and per-artist state live in [PROJECT_STATUS.md](../PROJECT_STATUS.md). Content/data task tracking (affiliate follow-ups, storefront rechecks, roster growth, the price-alert demand gate) lives in [BACKLOG.md](../BACKLOG.md) — this file covers infrastructure/automation only.

## Scheduled workflows

All times UTC. Direct-to-`main` write capability and the auto-merge contract for each lane are defined in [DEPLOYMENT.md → Repository write capability](DEPLOYMENT.md#repository-write-capability); this table is only the schedule and current behavior.

| Workflow | Schedule | Behavior |
|---|---|---|
| `daily-audit.yml` | 03:00 + dispatch | URL liveness + Ticketmaster Discovery diff to the rolling `automation:daily-audit` issue; auto-commits `last_verified_at` bumps for clean artists. A `status-figures` job also runs daily and commits the generated blocks in `PROJECT_STATUS.md` (route surface, empty boards) regardless of the audit job's own outcome. |
| `nightly-data-sync.yml` | 03:30 + dispatch | Auto-commits lossless factual updates only (date/time, venue, `event_name`, canonical TM URL); anything needing judgement goes to `automation:data-sync`. Dispatch defaults to dry-run. |
| `tm-new-shows-pr.yml` | 04:00 + dispatch | New-show discovery PR; auto-merges after in-run validation. `tour_name` stays blank for human review. |
| `seatgeek-cta-sync.yml` | 05:00 + dispatch | High-confidence SeatGeek event-link enrichment + identity-anchored provenance verification; auto-merges after in-run validation. |
| `vividseats-cta-sync.yml` | 05:30 + dispatch | Catalog-backed Vivid Seats event-link/provenance sync; auto-merges after in-run validation. |
| `impact-marketplace-provider-sync.yml` | TicketNetwork 06:00, Ticket Liquidator 06:30, StubHub International 07:00 (serialized) | Unambiguous exact-event link PRs; scheduled runs auto-merge after in-run validation. Manual dispatch is preview-first; a manual apply opens a review-only PR. |
| `impact-marketplace-price-snapshots.yml` | every 2h + dispatch | Exact-ID D1 snapshots for TicketNetwork + StubHub International, then a 90-day history prune. D1 only, never the repo. |
| `vividseats-price-snapshots.yml` | every 2h + dispatch | Exact-event D1 snapshots + the same 90-day prune. D1 only. |
| `seatgeek-price-snapshots.yml` | dispatch-only | Inert escape hatch — SeatGeek's API returns null pricing stats (permanent, see [PROVIDER_DATA_POLICY.md](PROVIDER_DATA_POLICY.md)). |
| `bootstrap-provider-pricing-schema.yml`, `tm-data-refresh-pr.yml`, `seatgeek-discovery-proposal.yml` | dispatch-only | Manual; never auto-merge. |
| `content-build.yml` | pushes touching `content/blog/**` + dispatch | Compiles `content/blog/*.md` and auto-commits `public/data/blog-content.json` only after the full validation suite passes in-job on exactly that output. |
| `indexnow-ping.yml` | pushes touching indexable-route data/code + dispatch | Submits the live sitemap URL list to IndexNow after the deploy lands. Writes nothing to the repo or D1. |
| `prelaunch-validation.yml` | PRs + dispatch | Validation suite, including the `stale-sync-guard` that fails PRs whose `public/index.html` fallback is out of sync with `public/data/*.json`. |
| `pr-validation-head-guard.yml` | PR opened/synchronized/reopened/edited/draft-toggled/closed, completed `Prelaunch Validation` run, every 15 minutes + dispatch | Read-only exact-head check for open non-draft PRs targeting `main`; updates the rolling `automation:prelaunch-validation` issue only for missing, failed, or over-30-minute validation. It never reruns, approves, merges, or changes a PR. |
| `tm-data-refresh-pr.yml` | dispatch | Manual PR-based refresh of existing events. |

**Cron times are request times, not start times.** GitHub can run these queues significantly late; the relative order the schedule encodes holds even when absolute times drift. Missing credentials make every scheduled lane no-op safely (no rows, no PR); auth/config failures in the SeatGeek lane abort with no writes.

### Price snapshot cadence

Both numeric-price lanes (TicketNetwork/StubHub International via the shared Impact marketplace workflow, and Vivid Seats) run every 2 hours with a 6-hour freshness constant (`DEFAULT_FRESHNESS_HOURS`) — the interval must stay strictly below the constant, since the display gate hides any row past `expires_at`. Each scheduled apply run ends with a 90-day retention prune of `provider_pricing_history`. Ticket Liquidator stays price-disabled (no numeric `CurrentPrice` in its feed); SeatGeek has no numeric pricing lane at all (permanent API limitation).

## Secrets and bindings

Full setup steps: [DEPLOYMENT.md](DEPLOYMENT.md). Reference of the actual credential names in use:

| Name | Used by | Notes |
|---|---|---|
| `DEMAND_DB` | All D1 reads/writes | The only binding declared in `wrangler.toml`. |
| `IMPACT_ACCOUNT_SID` / `IMPACT_AUTH_TOKEN` | Network-level Impact fallback | Server-side only. |
| `IMPACT_SEATGEEK_*` / `IMPACT_VIVIDSEATS_*` | Provider-specific Impact credentials | Their approved lanes only. |
| `IMPACT_TICKETNETWORK_*`, `IMPACT_TICKETLIQUIDATOR_*`, `IMPACT_STUBHUB_INTERNATIONAL_*` | Optional provider-specific overrides | Fall back to network-level if unset. |
| `DEBUG_API_TOKEN` | `/api/debug-seatgeek`, every `/api/impact/*` diagnostic, `IMPACT_CATALOG_PROXY_URL` automation | Routes 404 without it — never expose one publicly. |
| `GITHUB_OAUTH_CLIENT_ID` / `GITHUB_OAUTH_CLIENT_SECRET` | `/admin` editor OAuth handshake | Configured 2026-08-19, alongside the `admin.tourticketcompare.com` custom domain. Pages binds these at deploy time, and the symptom differs by case: a binding added but not yet deployed reads empty and 503s at `/api/admin/auth`, while a rotated value whose deploy has not landed still redirects and then fails the token exchange with a 502 at `/api/admin/callback`. Redeploy after either change. |
| `SEATGEEK_CLIENT_ID` / `SEATGEEK_CLIENT_SECRET` | Controlled discovery/snapshot tooling | Never `/api/out`. |
| `TICKETMASTER_API_KEY` | Scheduled discovery/audit workflows; opt-in live-discovery path in `/api/shows` (default off) | Normal traffic reads the persisted catalogue. |
| `CLOUDFLARE_API_TOKEN` / `CLOUDFLARE_ACCOUNT_ID` | Remote D1 writes from Actions | |
| Local read-only Cloudflare CLI credential | Bounded live Pages Function error-tail diagnosis | Keep this separate from repository and Pages secrets. It must be least-privilege and sufficient only to read the selected production deployment and tail new error events; do not use a write-capable token or export request URLs. |
| `OUT_CLICK_ID_SUBID_ENABLED` / `OUT_CLICK_ID_SUBID_PARAM` | `/api/out` | Repo-managed `[vars]` in `wrangler.toml`, not dashboard settings. Currently unset (off). |

The obsolete `IMPACT_TICKETMASTER_*` secrets are unused — delete from the dashboard if still present (tracked in `BACKLOG.md`). Provider `*_PUBLIC_ENABLED` / `*_PRICE_DISPLAY_ENABLED` flags are independent kill switches; a flag never substitutes for rights, provenance, URL validation, or freshness. Confirm current activation via `/api/health`, not by inferring from secret names.

## Known incidents

Infrastructure/automation issues only — dated, short, actionable. Content and data-hygiene backlog items live in `BACKLOG.md`.

- **Migration `0008` unapplied (open, verified 2026-08-04).** `analytics_events` still lacks the commercial-funnel dimension columns; writers fall back a column tier at a time so the site is unaffected, but `npm run report:commercial-funnel` can't report those dimensions until an owner applies it (command: `migrations/README.md`).
- **Dedup tombstone discipline (procedural, ongoing).** Deleting a duplicate row from `events.json` without adding it to `data/deleted-events.json` lets the 04:00 new-show recognizer re-propose it. Always tombstone a dedup deletion in the same change — see `docs/PROVIDER_SYNC.md`.
- **Intermittent Pages CPU-limit failures (open, verified 2026-09-04).** The production dashboard recorded 1,390 `Exceeded CPU Time Limits` errors among 70,055 successful requests in its rolling seven-day view, while the simultaneous 24-hour view had no errors. Route and caller attribution is unavailable in the dashboard. Historical Log Explorer is not enabled and must not be purchased without an owner decision. A separate, local least-privilege credential may support a bounded interactive tail of new error events; do not export raw request URLs or make runtime changes until the route/error mix is evidenced.
