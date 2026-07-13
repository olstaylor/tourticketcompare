# TourTicketCompare

Independent, unofficial fan-facing ticket research site for major live music tours.

Live at **[tourticketcompare.com](https://tourticketcompare.com)** (www redirects to apex).

## What it does

Helps fans find checked ticket links, understand buying risks, and read practical guidance before leaving for an external ticket provider.

- Verified ticket links where available — SeatGeek (affiliate, primary), Vivid Seats, TicketNetwork, Ticket Liquidator, and StubHub International (affiliate, verified event-level links), Ticketmaster (plain, unmonetized)
- Practical buying guides (fees, resale risk, timing, provider differences)
- Artist watchlist pages for major tours

**Available now:** Approved, timestamped provider price snapshots (SeatGeek, Vivid Seats, TicketNetwork, StubHub International) may be displayed side by side for the same verified event while fresh, including the lower listed snapshot and price difference. Fees, taxes, availability, delivery, and the final checkout total remain provider-controlled and must be confirmed before buying.

## Tech stack

- **Frontend:** static HTML/CSS/JS in `public/` (no build step)
- **Server-side routing + APIs:** Cloudflare Pages Functions in `functions/`
- **Storage:** Cloudflare D1 (`DEMAND_DB`)
- **Deploy:** merges to GitHub `main` auto-deploy to Cloudflare Pages production via Git integration

## Quick start

```bash
npm install
npm run dev        # Pages preview at http://localhost:3000 (health: /api/health)
```

Validation, event-data commands, and the PR checklist are in [CONTRIBUTING.md](CONTRIBUTING.md).

## Project docs

Start with these three, in order — they are the source of truth:

| Document | Purpose |
|---|---|
| [CLAUDE.md](CLAUDE.md) | Contributor/AI brief: rules, protected areas, architecture, working style |
| [PROJECT_STATUS.md](PROJECT_STATUS.md) | Current state snapshot: data counts, per-artist status, active risks |
| [BACKLOG.md](BACKLOG.md) | Active prioritised work and the parked list |

Hard rules: [SAFE_PUBLISHING_RULES.md](SAFE_PUBLISHING_RULES.md). Reference docs (architecture, deployment, content rules, provider policy, onboarding workflows) are indexed in [CLAUDE.md](CLAUDE.md) § Key Documentation. Historical material lives in [`docs/archive/`](docs/archive/INDEX.md) and is not authoritative.

## Key rules

- Never invent tours, dates, venues, prices, availability, or ticket inventory.
- Never scrape ticket providers.
- Never claim live price comparison. Provider-specific snapshots require explicit written usage rights, an approved source, an enabled runtime flag, and fresh timestamped data.
- GitHub `main` is the source of truth; unknown routes 404 rather than generating thin pages.

See [docs/CONTENT_RULES.md](docs/CONTENT_RULES.md) and [docs/PROVIDER_DATA_POLICY.md](docs/PROVIDER_DATA_POLICY.md) for the full rules.
