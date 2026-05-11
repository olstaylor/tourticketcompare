# TourTicketCompare Backlog

Priorities are ordered by: architecture stability → trust/compliance → repo maintainability → content quality → future provider integrations.

---

## A. Architecture Stability

These risks affect production correctness and must be addressed before scaling.

**High priority:**
- Verify that `main` branch matches the deployed Worker `tourticketcompare-live` (rebuild + diff or Cloudflare dashboard check)
- Confirm Cloudflare routes still point `tourticketcompare.com/*` and `www.tourticketcompare.com/*` to the Worker, not to Pages
- Document and test the Worker rebuild + deploy procedure with a dry run on a staging build
- Fix the raw HTML routing issue for non-root routes — `/artists`, `/guides`, etc. currently may serve homepage H1/title/canonical before client-side rendering; this must be resolved before SEO scaling

**Medium priority:**
- Provision real D1 database IDs for `RATE_LIMIT_DB` and `CLICKS_DB` (or remove the commented-out blocks from `wrangler.toml`)
- Confirm `_middleware.js` and `[[path]].js` are in sync with the last Worker build
- Add a `npm run deploy:worker` script or documented procedure so the production deploy path is explicit

**Parking lot:**
- Evaluate consolidating the three-path deploy model (Worker/Pages/Vercel) to reduce maintenance overhead; Pages-native deploy without a standalone Worker generator would simplify the workflow

---

## B. Trust and Compliance

Rules that protect users and the site's credibility.

**Immediate:**
- Confirm no public pages display placeholder CTAs, fake prices, or placeholder event data before any marketing push
- Run the full smoke check suite before any content or code push: `node scripts/smoke-prelaunch.mjs`, `python3 scripts/validate-events.py --for-production`
- Confirm `MOCK_MODE=false` and `ALLOW_MOCK_PRICES=false` are active in the deployed Worker

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
