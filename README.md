# TourTicketCompare

_Reviewed current: 2026-06-03._

Independent, unofficial fan-facing ticket research site for major live music tours.

Live at **[tourticketcompare.com](https://tourticketcompare.com)** and **[www.tourticketcompare.com](https://www.tourticketcompare.com)** (redirects to apex).

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

The current source of truth is:

| Document | Purpose |
|---|---|
| [CLAUDE.md](CLAUDE.md) | AI/contributor brief: protected areas, working style, session checklist |
| [PROJECT_STATUS.md](PROJECT_STATUS.md) | Current state snapshot: runtime, data counts, active risks |
| [BACKLOG.md](BACKLOG.md) | Active prioritised backlog (each item ties to a live GitHub issue) |
| [PROJECT_BRIEF.md](PROJECT_BRIEF.md) | Site overview, architecture summary, hard rules quick-reference |
| [SAFE_PUBLISHING_RULES.md](SAFE_PUBLISHING_RULES.md) | Non-negotiable publishing, data, and affiliate rules |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Local setup, PR checklist |
| [docs/AI_AGENT_WORKFLOW.md](docs/AI_AGENT_WORKFLOW.md) | How Claude Code / Codex should operate: workflows, protected files, validation |
| [docs/VALIDATION_CHECKLIST.md](docs/VALIDATION_CHECKLIST.md) | Pre-commit checks: syntax, events, smoke tests |
| [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) | Routing model, Pages Functions structure, data bindings |
| [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) | Local dev, production Pages deploy, daily audit pipeline |
| [docs/CONTENT_RULES.md](docs/CONTENT_RULES.md) | What can and cannot be published (full detail) |
| [docs/PROVIDER_DATA_POLICY.md](docs/PROVIDER_DATA_POLICY.md) | Ticketmaster, SeatGeek, Vivid Seats, and Impact affiliate policy |
| [docs/ADDING_ARTISTS.md](docs/ADDING_ARTISTS.md) | Artist onboarding field templates and checklist |
| [docs/SAFE_NEXT_ARTIST_WORKFLOW.md](docs/SAFE_NEXT_ARTIST_WORKFLOW.md) | Gated artist onboarding workflow (Proposal → Shell → Promote → Events) |
| [docs/ADDING_PROVIDERS.md](docs/ADDING_PROVIDERS.md) | Provider integration path: data source, rights, disclosure, validation |
| [docs/DOCS_MAINTENANCE.md](docs/DOCS_MAINTENANCE.md) | Which files are canonical / reference / generated; archive policy |

**Archived docs:** Historical audits, parked features, one-off reports, and reference docs are in [`docs/archive/`](docs/archive/) with an [index](docs/archive/INDEX.md). These are reference-only — **not authoritative**. Do not act on archived findings without re-verifying against current `BACKLOG.md` and `PROJECT_STATUS.md`.

---

## Tech stack

- **Frontend:** Static HTML, CSS, JS in `public/`
- **Server-side routing and APIs:** Cloudflare Pages Functions in `functions/`
- **Production runtime:** Cloudflare Pages Functions — confirmed live via `/api/health` → `runtime: "cloudflare-pages-functions"` (2026-05-11)
- **Storage:** Cloudflare D1 (`DEMAND_DB`) for analytics and demand capture
- **No build step:** `public/` is served as-is; `functions/` is bundled by Cloudflare Pages

> **Deploy note:** Merges to `main` automatically deploy to Cloudflare Pages production via Git integration (confirmed 2026-05-11). `npm run deploy:pages` can also be used for manual deploys. See [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md).

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

## Deploy (production)

Run checks then deploy to Pages:

```bash
npm run deploy:pages:safe
```

Or without pre-flight checks:

```bash
npm run deploy:pages
```

Merges to `main` deploy automatically via Cloudflare Pages Git integration (confirmed 2026-05-11). A manual CLI deploy is not required for normal production changes.

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

## Active priorities

See [BACKLOG.md](BACKLOG.md). Top items are tied to live GitHub issues — currently #171 (Olivia Rodrigo trust gap), #174 (data refresh documentation), and #175 (artist onboarding runbook + validator). Do not rely on older "next task" notes elsewhere in the repo.
