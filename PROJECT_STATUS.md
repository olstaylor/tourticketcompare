# TourTicketCompare Project Status

## Current Live Site

- Production URL: `https://tourticketcompare.com`
- Also available at: `https://www.tourticketcompare.com`
- Current stage: live pre-launch / early public version
- Current positioning: independent, unofficial ticket research site for fans of major live music tours, focused on checked ticket links and practical buying guidance.

TourTicketCompare should feel useful today without claiming full live multi-provider price comparison. Ticket links should only be shown when the artist, event, and destination can be verified. Final prices, fees, availability, delivery terms, and checkout terms are confirmed by the ticket provider.

## What Is Working

- The site is live on Cloudflare Pages.
- GitHub `main` is the source of truth.
- Existing checked affiliate redirects work through `/api/out`.
- Event data validation has passed with the existing production validation script.
- Existing verified artist/show data should remain the source of truth.
- `PROJECT_BRIEF.md` exists and should be read before future implementation work.
- `BACKLOG.md` exists and captures current priorities and parking-lot items.
- Recent visible UX/end-user copy polish was completed and committed.

## Current Known Issues / Parked Items

- Non-root raw HTML routing/canonical issue is parked unless explicitly prioritised.
  - Routes such as `/artists`, `/guides`, `/how-it-works`, `/editorial-policy`, `/affiliate-disclosure`, `/about`, and `/contact` have at times served homepage H1/title/canonical in raw HTML before client-side rendering.
  - This should be fixed before serious SEO scaling or indexing decisions.
- Some visible copy, page labelling, artist card layout, and guide content may still need manual QA and small polish passes.
- Live price comparison is not available and must not be claimed.
- Ticketmaster should be treated as an official event verification and event-link source, not as a reliable public price source.
- Provider-specific pricing should only be added where approved feeds/APIs explicitly permit public display of pricing.

## Hard Rules

- Do not invent tours, dates, venues, prices, availability, providers, partners, ticket listings, or savings claims.
- Do not scrape ticket providers or unofficial sources.
- Do not show fake comparison tables.
- Do not claim live price comparison is available unless backed by verified, approved provider data.
- Do not show `Buy tickets` or equivalent purchase CTAs unless there is a verified ticket destination.
- Do not expose credentials client-side.
- Do not change event data, artist data, provider URLs, CTA destination generation, `/api/out`, Impact logic, or affiliate redirect behaviour unless the task is specifically about that area.

## Provider Model

- Ticketmaster: official event verification and official event links; not a reliable public price source for this project.
- SeatGeek, Vivid Seats, TicketNetwork, StubHub International and similar marketplace partners: possible future provider-specific pricing sources only if approved feeds/APIs explicitly supply displayable pricing and usage rights.
- Impact affiliate approval does not automatically equal permission to ingest or publicly display price data.

Safe product model:

> Verified ticket links first. Provider-specific price information only where approved providers supply it. Final prices, fees, availability and checkout terms are confirmed by the provider.

## Standard Test Commands

Run the relevant subset for each task:

```bash
node --check public/app.js
node --check 'functions/[[path]].js'
python3 scripts/validate-events.py --for-production
node scripts/smoke-prelaunch.mjs
git diff --check
```

When route shims are touched, also check:

```bash
node --check functions/artists.js
node --check functions/guides.js
node --check functions/how-it-works.js
node --check functions/editorial-policy.js
node --check functions/affiliate-disclosure.js
node --check functions/contact.js
```

## Recommended Next Tasks

1. Manually review the live site and capture visible copy/layout issues.
2. Fix obvious visible copy, label, card, and guide-content issues in small scoped tasks.
3. Fix the raw HTML routing issue before SEO scaling.
4. Add one manually verified new artist using a strict template and validation rules.
5. Later, investigate provider-specific pricing feeds/APIs.
6. Later, design an automation that proposes one new artist/content candidate per day for human review, not auto-publishing.

## Codex Workflow Going Forward

Every Codex task should start with:

```text
Read PROJECT_BRIEF.md and PROJECT_STATUS.md first.
Work only on the specific task below.
Do not scan the whole repo unless required.
```

Use one small task at a time. List exact files to inspect/edit. Preserve affiliate routing and verified data unless explicitly working in that area. Stop after summarising changes. Commit after each clean improvement.
