# AI Agent Workflow

How Claude Code and Codex should operate on this repo safely and effectively.

---

## Session Start: Read in Order

1. **CLAUDE.md** (5 min) — Protected areas, hard product rules, working style
2. **PROJECT_STATUS.md** (3 min) — Current state: artists, events, risks, data counts
3. **BACKLOG.md** (2 min) — Active priorities; each tied to a GitHub issue
4. **This file** (2 min) — Workflow selection

**Do not read:** Historical audits, parked features, or one-off docs unless BACKLOG.md explicitly cites them. See docs/archive/INDEX.md if you need to understand historical context.

---

## Workflow Selection

### 1. Small Fix or Documentation Edit
- **When:** Bug fix, docs update, comment, typo, minor refactor
- **Plan:** Skip plan mode; start immediately
- **Validate:** Run `docs/VALIDATION_CHECKLIST.md` commands
- **Commit:** Small, focused commit with clear message
- **Avoid:** Broad repo scans, refactoring beyond the fix scope

### 2. Artist Shell or Events
- **When:** New artist `review_required` shell, or adding/updating events
- **Read first:** `docs/ADDING_ARTISTS.md`, then `docs/SAFE_NEXT_ARTIST_WORKFLOW.md`
- **Plan mode:** Yes; describe phases before implementing
- **Protected:** Do not modify `/api/out`, `VERIFIED_TICKET_LINKS`, affiliate logic, or CTA generation
- **Commit:** One PR per artist for Promote/Events; Shell phase may batch up to 3 shells per automated PR (see `docs/SAFE_NEXT_ARTIST_WORKFLOW.md` guardrail 6)

### 3. Provider Integration
- **When:** Adding support for new ticket provider or affiliate partner
- **Read first:** `docs/ADDING_PROVIDERS.md`, `docs/PROVIDER_DATA_POLICY.md`
- **Plan mode:** Yes; document data source, permission, affiliate disclosure, fallback behaviour
- **Protected:** Do not modify provider URLs, provider data ingestion, or affiliate redirect without explicit scope
- **Scope gate:** Only proceed if `BACKLOG.md` explicitly lists the provider

### 4. Routing or Metadata Change
- **When:** Adding route, changing page titles/metadata, updating breadcrumbs
- **Read first:** `docs/ARCHITECTURE.md`, `functions/_route-metadata.js`, `functions/[[path]].js`
- **Protected files:** Do not edit `functions/_middleware.js` casually
- **Plan mode:** Yes; describe which routes change and why
- **Validate:** Smoke test all affected routes

### 5. Feature or Large Refactor
- **When:** New functionality, major code restructuring, data schema change
- **Plan mode:** Mandatory; describe architecture, file changes, risks
- **Research:** Ask user to confirm scope before starting
- **Protected:** Know which files are protected (see CLAUDE.md § Protected Areas)

---

## High-Risk Files (Read-Only Unless Scoped)

| File | Why | Exception |
|------|-----|-----------|
| `functions/api/out.js` | Affiliate redirect logic; `VERIFIED_TICKET_LINKS` | Only if task explicitly asks for provider allowlist |
| `functions/_middleware.js` | Entry point for all requests | Only if routing path fundamentally broken |
| `functions/[[path]].js` | All HTML routing; every page depends on it | Only if page titles or routing logic is broken |
| `functions/_route-metadata.js` | Single source of truth for page metadata | Only if adding/removing routes or fixing metadata |
| `public/data/events.json` | Event data; must be verified | Only if data validation explicitly scoped |
| `public/data/artists.json` | Artist records | Only if artist shell onboarding is scoped |
| `public/_routes.json` | Routing config; incorrect changes break site | Only if route structure must change |
| Impact credentials + affiliate logic | Server-side only; never expose client-side | Never; protected by Cloudflare secrets |

---

## Validation Before Summarising

Always run before claiming a task is done:

```bash
docs/VALIDATION_CHECKLIST.md
```

**Report result:** "Checks passed" or list any failures. Do not skip this step.

---

## Key Rules

- ✅ Make small, isolated changes (one task = one logical commit)
- ✅ Validate before committing
- ✅ Ask for confirmation before risky actions (destructive, shared systems, hard-to-reverse)
- ✅ Use plan mode for multi-step work, routing changes, or anything touching protected files
- ❌ Do not invent data, tours, artists, events, prices, or provider links
- ❌ Do not create new governance docs unless explicitly asked
- ❌ Do not assume you understand the codebase without reading relevant active docs first
- ❌ Do not modify protected areas without explicit scope
- ❌ Do not scan the whole repo unless the task requires broad exploration
- ❌ Do not auto-publish artists/events or scrape providers — see "What AI Agents May Not Change" in `SAFE_PUBLISHING_RULES.md`

---

## When to Stop and Ask

- The task scope is ambiguous or conflicts with known parked priorities (see BACKLOG.md)
- A change touches a protected file and the task doesn't explicitly ask for it
- You need to invent data or make assumptions about user intent
- A validation check fails and the fix requires understanding broader context
