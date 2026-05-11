# Production Sync Audit

Audit date: 2026-05-11
Branch audited: `main` (commit `09c08cf`)
Tool: `scripts/build-standalone-worker.mjs`

---

## Summary

**Main does NOT reproduce the deployed Worker.**

The current `main` branch builds a Worker with BUILD_ID `1905d379c8f8`. The Worker recorded as deployed in HANDOVER.md has BUILD_ID `d3cc71487403`. They are different binaries serving different content.

---

## Hash Comparison

| | Current build from `main` | Recorded deployed Worker |
|---|---|---|
| **BUILD_ID** (source hash) | `1905d379c8f8` | `d3cc71487403` |
| **File SHA-256** | `b644064a755ad2a83465c4d9603e4ed88c17493c4873ba505b397522919ae297` | N/A — ETag format unknown |
| **File size** | 92,140 bytes | Unknown |
| **Deployed date** | Not deployed | 2026-05-01 (per HANDOVER.md) |
| **Cloudflare ETag** | Not uploaded | `c42497469d7011fd2daad8a01bbb9ee737de7db9d049c3a7b278777825b739ec` |

**Note on ETag format:** The recorded ETag (64 hex chars) is SHA-256 length but is the ETag of the Cloudflare Worker upload, not necessarily a plain SHA-256 of the file. It cannot be directly compared to the file hash without re-uploading.

---

## Why They Differ

### Confirmed causes (from git history)

Three public-facing files changed in commits merged after 2026-05-01. The `sourceHash` that produces BUILD_ID is computed from `public/` file contents, so any change to `public/` changes the BUILD_ID.

| File | Commit | Date | What changed |
|---|---|---|---|
| `public/app.js` | `6bb822c` | 2026-05-08 | "Use Pages pretty path for HTML shell asset" |
| `public/app.js` | `617a239` | 2026-05-08 | "Fix public app syntax truncation" |
| `public/404.html` | `6bb822c` | 2026-05-08 | New file added |
| `public/_routes.json` | `6bb822c` | 2026-05-08 | Updated routes manifest |
| `functions/[[path]].js` | `6bb822c` | 2026-05-08 | +14/-2 lines ("catch-all static routing") |

**Note:** `functions/[[path]].js` changes do NOT affect BUILD_ID because it is not in `public/`. They DO affect the Pages preview/fallback path.

### Unverifiable cause (build script provenance)

`scripts/build-standalone-worker.mjs` was first committed to git in commit `9b62d76` on **2026-05-05** — four days AFTER the recorded Worker deploy on 2026-05-01.

This means the build script used for the May 1 deploy was NOT tracked in git at the time of deployment. The current script was committed on May 5 in the same commit that created HANDOVER.md.

**We cannot confirm whether the current build script is identical to the untracked script used on May 1.** The file could be the same, slightly different, or substantially different. There is no git diff to check.

---

## Structural Divergence: Worker vs Pages Content

This is separate from the hash mismatch and persists regardless of when a rebuild happens.

The build script (`scripts/build-standalone-worker.mjs`) contains its own hardcoded copy of route content (titles, descriptions, H1s) that **intentionally differs** from `functions/[[path]].js`. The two paths serve different content for every public page.

**Examples confirmed from source:**

| Page | Deployed Worker (build script) | Pages preview (`functions/[[path]].js`) |
|---|---|---|
| Homepage `<title>` | `TourTicketCompare \| Ticket Options & Availability` | `Find Verified Ticket Options for Major Tours \| TourTicketCompare` |
| Guide 1 description | `Learn how to compare concert ticket options safely by checking provider sources, fees, availability, and final checkout totals.` | `Learn how to compare concert ticket prices safely by checking the final total, seat details, delivery timing, and provider terms.` |
| Artist page H1 pattern | `[Artist] tickets: check verified ticket options` | `[Artist] stadium tour watch` |
| Artist page lead | `check verified ticket destinations` | `check [artist] watchlist notes and verified ticket destinations` |

This divergence is structural — it exists in the committed source and would be present in any new Worker build from the current `build-standalone-worker.mjs`. The build script is **not** a wrapper around `functions/[[path]].js`; it is a separate, independently-maintained route implementation.

**Implication:** When the production Worker was built, someone made an intentional decision to use different content for the standalone Worker vs the Pages preview. That decision is reflected in the build script. Any future Worker rebuild from the current build script will continue to serve this different content.

---

## What This Means for GitHub → Live Site

### Production (Cloudflare Worker `tourticketcompare-live`)
- Currently running BUILD_ID `d3cc71487403`, deployed 2026-05-01 *(inferred from HANDOVER.md; not directly verifiable without Cloudflare dashboard access)*
- Serving homepage title: `TourTicketCompare | Ticket Options & Availability`
- Serving artist H1 pattern: `tickets: check verified ticket options`
- Does NOT include `public/404.html`, the May 8 `_routes.json` changes, or the May 8 `app.js` fixes

### Pages preview/fallback
- If deployed from current `main`, would serve BUILD_ID `1905d379c8f8` content
- Serving homepage title: `Find Verified Ticket Options for Major Tours | TourTicketCompare`
- Serving artist H1 pattern: `stadium tour watch`
- Includes the May 8 routing fixes and 404 page

### Summary table

| Aspect | Production Worker | Pages preview (if deployed from main) |
|---|---|---|
| Homepage title | Different (older) | Different (newer) |
| Artist H1 pattern | Different (older) | Different (newer) |
| `public/404.html` | Not present | Present |
| `_routes.json` | Pre-May-8 version | Post-May-8 version |
| `public/app.js` | Pre-May-8 version | Post-May-8 version |

**The production Worker is running a meaningfully different product than what `main` would produce for either the Pages preview or a new Worker build.**

---

## Assumptions and Unverified Claims

The following are **inferred from HANDOVER.md** and cannot be verified without Cloudflare dashboard access:

- Custom domain routes still point to Worker `tourticketcompare-live` *(not Pages)*
- Worker `tourticketcompare-live` still exists and is active
- The recorded ETag corresponds to the file currently deployed to `tourticketcompare-live`
- The Worker bindings (`DEMAND_DB`, `IMPACT_ACCOUNT_SID`, `IMPACT_AUTH_TOKEN`) are still configured

---

## Recommended Actions

These are observations only. No changes were made during this audit.

**Before the next Worker deploy:**

1. **Decide which content is correct.** The build script serves different titles, H1s, and descriptions than `functions/[[path]].js`. This must be a deliberate choice, not an accidental merge. Confirm which version should be live before building.

2. **Review the post-May-1 changes.** The commits in `6bb822c` and `617a239` are described as routing fixes and syntax fixes. Verify these are safe to include in a new Worker build.

3. **Run the full smoke check suite locally** before building:
   ```bash
   node --check public/app.js
   node --check 'functions/[[path]].js'
   python3 scripts/validate-events.py --for-production
   node scripts/smoke-prelaunch.mjs
   ```

4. **Build and verify** the Worker output:
   ```bash
   node scripts/build-standalone-worker.mjs /tmp/tourticketcompare-worker.js
   node --check /tmp/tourticketcompare-worker.js
   ```

5. **Verify Cloudflare routes** in the dashboard before uploading: confirm custom domains still point to `tourticketcompare-live`, not to Pages.

6. **Address the build-script / [[path]].js divergence** as a planned maintenance task. Two independently-maintained copies of route content will continue to drift unless one is made the source of truth for the other.
