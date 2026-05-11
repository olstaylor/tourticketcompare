# TourTicketCompare Backlog

Priorities are ordered by: architecture stability → trust/compliance → repo maintainability → content quality → future provider integrations.

---

## A. Architecture Stability

These risks affect production correctness and must be addressed before scaling.

**Done:**
- ~~Verify that `main` matches deployed production~~ ✓ Done — production is Cloudflare Pages Functions confirmed 2026-05-11
- ~~Confirm custom domains route correctly~~ ✓ Done — `tourticketcompare.com` on Pages; `www` 301→apex confirmed
- ~~Document the production deploy path~~ ✓ Done — `npm run deploy:pages` is the production path; see `docs/DEPLOYMENT.md`
- ~~Resolve Worker/Pages content divergence~~ ✓ Done — `functions/_route-metadata.js` is the single source of truth

**High priority (operational):**
- Confirm GitHub→Pages CI pipeline is active in the Cloudflare Pages dashboard. If no Git integration is configured, every deploy to production requires a manual `npm run deploy:pages` step. This must be confirmed before relying on `main` pushes to deploy automatically.

**High priority (SEO):**
- Fix the raw HTML routing issue for non-root routes — `/artists`, `/guides`, etc. currently serve the correct server-injected HTML via Pages Functions, but client-side JS re-renders the page on load. If a Googlebot crawl catches an intermediate state or if JS fails, the wrong H1/title could be indexed. This is the highest-priority remaining code task and should be addressed before any SEO scaling.

**Medium priority:**
- Provision real D1 database IDs for `RATE_LIMIT_DB` and `CLICKS_DB` (or remove the commented-out blocks from `wrangler.toml`)
- Confirm `impactDefaultProgramId` — `/api/health` reports `false`; verify whether this binding is needed for any active feature
- Complete remaining live smoke checks: six artist pages, four guide pages, five trust pages, old guide redirects, D1 analytics write

**Resolved / no longer applicable:**
- ~~Add `npm run deploy:worker` script~~ — Worker is retired from production; `npm run deploy:pages` is sufficient
- ~~Consolidate three-path deploy model~~ — Production is Pages; Vercel and Worker paths are legacy cleanup debt

---

## B. Trust and Compliance

Rules that protect users and the site's credibility.

**Immediate:**
- Confirm no public pages display placeholder CTAs, fake prices, or placeholder event data before any marketing push
- Run the full smoke check suite before any content or code push: `node scripts/smoke-prelaunch.mjs`, `python3 scripts/validate-events.py --for-production`
- ~~Confirm `MOCK_MODE=false` and `ALLOW_MOCK_PRICES=false` are active in the deployed Worker~~ ✓ Done — confirmed via live `/api/health` 2026-05-11

**Ongoing:**
- Validate all new artist, event, and provider records against content rules before committing (see `docs/CONTENT_RULES.md`)
- Confirm Impact credentials are never visible in public HTML, JS, JSON, or logs
- Do not publish prices, availability, or "cheapest" claims unless an approved provider feed supports it

**Not in scope:**
- Automation that publishes content without human review
- Scraped data from unofficial sources
- Fake or mock comparison tables at any stage

---

## C. Repo Maintainability

Reduces friction for future contributors and AI agents.

**Immediate:**
- ~~Create `docs/ARCHITECTURE.md`~~ ✓ Done
- ~~Create `docs/CONTENT_RULES.md`~~ ✓ Done
- ~~Create `docs/PROVIDER_DATA_POLICY.md`~~ ✓ Done
- ~~Fix stale `npm run deploy` documentation~~ ✓ Done (README + DEPLOYMENT.md)
- ~~Create `AGENTS.md`~~ ✓ Done

**Next:**
- Simplify or consolidate duplicate guidance across `README.md`, `PROJECT_BRIEF.md`, `PROJECT_STATUS.md`, `HANDOVER.md` — each should have a clear, distinct purpose
- Add inline comments to `_middleware.js` explaining why named shims exist and that they are inactive while middleware is in place
- Ensure `docs/history.md` is current and does not contradict active docs

---

## D. Content Quality

Improves the fan-facing product without adding risk.

**Next:**
- Add more verified artist pages — one at a time, using the strict artist template, with source-backed factual summaries
- Improve empty states for artists where no verified event link exists
- Review and polish existing guide copy for factual accuracy and search intent
- Add one verified artist affiliate link (SeatGeek or Vivid Seats) only after destination and attribution behaviour are proven

**Later:**
- Add event-level show cards only when real event date, venue, availability, and a verified ticket URL exist
- Add city or tour pages only with distinct, verified content and appropriate canonical handling
- Add structured internal checks that catch risky phrases (unsupported savings claims, placeholder wording) before deploy

---

## E. Future Provider Integrations

Only after A, B, and C are stable.

**When ready:**
- Add SeatGeek artist-level links: requires verified SeatGeek destination URLs, Impact program ID (if applicable), and testing of `/api/out` redirect behaviour
- Add Vivid Seats artist-level links: same requirements as SeatGeek
- Add live event-level Ticketmaster pricing: requires `TICKETMASTER_DISCOVERY_PRICE_CHECKS_ENABLED=true` and a product decision on displaying timestamped prices
- Add provider-specific price feeds: requires approved provider API access, explicit display rights, and a pricing display design that meets content rules

---

## Guardrails (apply to every task)

- Do not add fake prices, dates, venues, tours, availability, providers, or placeholder listings.
- Do not use Ticketmaster as a public price source without approved, displayable data.
- Do not scrape unofficial sources.
- Do not expose affiliate credentials or API secrets.
- Do not change `/api/out`, Impact logic, provider URLs, or deployment config unless the task explicitly asks for that area.
- Do not claim live price comparison until the feature is backed by verified multi-provider data.
- Do not publish Event or MusicEvent schema without verified event-level data.
- Do not open or merge PRs unless explicitly asked.
- Do not deploy to Cloudflare unless explicitly asked.

---

## Parking Lot

- Automated Ticketmaster or provider feed sync (requires review gates before public display)
- Public live price comparison UI (requires approved multi-provider feeds)
- Broader deployment architecture consolidation
- Email/newsletter automation
- CRM sync
