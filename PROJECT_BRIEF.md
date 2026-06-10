# TourTicketCompare — Project Brief

_Reviewed current: 2026-06-03._

Independent, unofficial fan-facing ticket research site for major live music tours.  
Live at **tourticketcompare.com** · GitHub `main` auto-deploys to Cloudflare Pages production.

---

## What It Does

Helps fans find checked ticket links, understand buying risks, and read practical guidance before leaving for an external ticket provider. Not a price aggregator.

**Supported today:**
- Verified ticket links where available
- Practical buying guides (fees, resale risk, timing, provider differences)
- Artist watchlist pages (for artists not yet CTA-ready)
- Verified event cards (Ticketmaster-sourced, per-event reviewed)

**Not supported:**
- Live multi-provider price comparison
- "Cheapest price" or "guaranteed availability" claims
- Public Vivid Seats CTAs (unparked but not live — awaiting verified destinations); artist-level SeatGeek links (SeatGeek is live event-level only)

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Static HTML/CSS/JS in `public/` (no build step) |
| Server routing + APIs | Cloudflare Pages Functions in `functions/` |
| Storage | Cloudflare D1 (`DEMAND_DB`) — analytics, signups, rate limits |
| Affiliate tracking | Impact (server-side only via `functions/api/out.js`) |
| Deploy | GitHub `main` → Cloudflare Pages Git integration (auto) |

---

## Architecture in Brief

```
Request → _routes.json → _middleware.js
    ├─ /api/*, /data/*          → context.next() → API handler
    ├─ known static extension   → context.next() → asset
    └─ all other paths          → functions/[[path]].js (HTML routing)
```

- `functions/[[path]].js` — all HTML routes: titles, meta, schema, 404s, redirects
- `functions/_route-metadata.js` — single source of truth for page metadata (edit here, not in `[[path]].js`)
- `functions/api/out.js` — verified affiliate redirect; contains `VERIFIED_TICKET_LINKS` (protected)
- `public/data/` — `artists.json`, `catalog.json`, `events.json` — verified data only

Named route shims (`functions/artists.js` etc.) re-export `[[path]].js` but are never invoked while `_middleware.js` is active. Editing shims has no production effect.

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for full routing model and data bindings.

---

## Hard Rules

Full rules are in [SAFE_PUBLISHING_RULES.md](SAFE_PUBLISHING_RULES.md). In brief:

- Do not invent tours, artists, events, dates, venues, prices, availability, providers, or partner relationships.
- Do not scrape ticket providers.
- Do not show fake price comparison or "cheapest" claims.
- Do not show "Buy tickets" unless a verified destination exists in `VERIFIED_TICKET_LINKS`.
- Do not expose credentials client-side.
- Do not modify `/api/out`, Impact logic, affiliate behaviour, or verified data files without explicit scope.

Artist pages may exist in `indexing_status: "review_required"` with no CTAs. Pages become indexable and conversion-led only after passing the phase gates in [docs/SAFE_NEXT_ARTIST_WORKFLOW.md](docs/SAFE_NEXT_ARTIST_WORKFLOW.md).

---

## Key Docs

| Start here | Purpose |
|---|---|
| [CLAUDE.md](CLAUDE.md) | AI/contributor brief: protected areas, working style, session checklist |
| [PROJECT_STATUS.md](PROJECT_STATUS.md) | Current runtime state, data counts, active risks |
| [BACKLOG.md](BACKLOG.md) | Active priorities (each tied to a live GitHub issue) |
| [SAFE_PUBLISHING_RULES.md](SAFE_PUBLISHING_RULES.md) | Non-negotiable publishing, data, and affiliate rules |
| [CONTRIBUTING.md](CONTRIBUTING.md) | Local setup, validation commands, PR checklist |

Reference: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) · [docs/DEPLOYMENT.md](docs/DEPLOYMENT.md) · [docs/CONTENT_RULES.md](docs/CONTENT_RULES.md) · [docs/PROVIDER_DATA_POLICY.md](docs/PROVIDER_DATA_POLICY.md) · [docs/ADDING_ARTISTS.md](docs/ADDING_ARTISTS.md) · [docs/SAFE_NEXT_ARTIST_WORKFLOW.md](docs/SAFE_NEXT_ARTIST_WORKFLOW.md)
