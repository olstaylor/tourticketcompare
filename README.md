# TourTicketCompare

Independent, unofficial fan-facing ticket research site for major live music tours.

Live at **[tourticketcompare.com](https://tourticketcompare.com)** and **[www.tourticketcompare.com](https://www.tourticketcompare.com)**.

---

## What it does

TourTicketCompare helps fans find checked ticket links, understand buying risks, and read practical guidance before leaving for an external ticket provider.

**Current value proposition:**
- Verified ticket links where available
- Practical buying guides (fees, resale risk, timing, provider differences)
- Artist watchlist pages for major tours

**Not currently available:**
- Live multi-provider price comparison
- Guaranteed cheapest prices
- Confirmed ticket availability

---

## Project docs

| Document | Purpose |
|---|---|
| [AGENTS.md](AGENTS.md) | Rules for AI/Codex sessions: protected areas, working style, validation |
| [PROJECT_STATUS.md](PROJECT_STATUS.md) | Current known-good state, risks, parked issues, immediate priorities |
| [BACKLOG.md](BACKLOG.md) | Prioritised work by architecture → compliance → maintainability → content → providers |
| [PROJECT_BRIEF.md](PROJECT_BRIEF.md) | Product positioning, safety rules, affiliate constraints, success criteria |
| [HANDOVER.md](HANDOVER.md) | Current live state, confirmed bindings, latest smoke check results |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Routing model, Pages Functions structure, Worker vs Pages ambiguity |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) | Local dev, Pages preview deploy, production Worker deploy procedure |
| [docs/CONTENT_RULES.md](docs/CONTENT_RULES.md) | What can and cannot be published |
| [docs/PROVIDER_DATA_POLICY.md](docs/PROVIDER_DATA_POLICY.md) | Ticketmaster, SeatGeek, Vivid Seats, and Impact affiliate policy |

---

## Tech stack

- **Frontend:** Static HTML, CSS, JS in `public/`
- **Server-side routing and APIs:** Cloudflare Pages Functions in `functions/`
- **Production runtime:** Cloudflare Worker `tourticketcompare-live` (built from `scripts/build-standalone-worker.mjs`)
- **Preview/fallback:** Cloudflare Pages
- **Storage:** Cloudflare D1 (`DEMAND_DB`) for analytics and demand capture
- **No build step:** `public/` is served as-is

> **Deployment note:** `npm run deploy` and `npm run deploy:pages` both deploy to the Pages preview/fallback URL — they do NOT update the production Worker. See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) for the production Worker deploy procedure.

---

## Local development

Install dependencies:

```bash
npm install
```

Run local Pages preview (includes Functions):

```bash
npm run dev
```

Open `http://localhost:3000` and `http://localhost:3000/api/health`.

---

## Validation checks

Run the relevant subset before committing:

```bash
node --check public/app.js
node --check 'functions/[[path]].js'
node --check functions/api/out.js
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

---

## Deploy (Pages preview/fallback only)

Run checks then deploy:

```bash
npm run deploy:pages:safe
```

Or without pre-flight checks:

```bash
npm run deploy:pages
```

For the full production Worker deploy procedure, see [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

---

## Safety checklist before any deploy

- Homepage clearly explains checked ticket links and buying guidance.
- Live price comparison is not claimed unless verified provider data exists.
- Known artist routes load correctly.
- Unknown artist routes return a 404, not a thin generated page.
- `/api/shows` returns safe JSON.
- `/api/out` preserves checked event/provider redirect behaviour.
- No mock prices are visible.
- No fake events, venues, dates, prices, or availability are visible.
- No placeholder or example affiliate links are shown as real CTAs.
- Impact credentials are not exposed in public assets or `/api/health`.
- Public pages contain no internal or dev wording.

---

## Key rules

- Never invent tours, dates, venues, prices, availability, or ticket inventory.
- Never scrape ticket providers.
- Never claim live price comparison is available unless verified provider feeds supply it.
- Provider-specific pricing may only be displayed with explicit usage rights from an approved provider feed.
- GitHub `main` is the source of truth.

See [docs/CONTENT_RULES.md](docs/CONTENT_RULES.md) and [docs/PROVIDER_DATA_POLICY.md](docs/PROVIDER_DATA_POLICY.md) for full rules.

---

## Parked issue

Non-root routes (`/artists`, `/guides`, `/how-it-works`, etc.) may serve homepage HTML before client-side rendering in some conditions. This is parked until explicitly prioritised. It should be resolved before serious SEO scaling. See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for details.
