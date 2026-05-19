# Production Sync Audit

> Archived: historical one-time audit. Kept for audit trail; not active guidance.

Audit date: 2026-05-11
Branch audited: `main` (commit `09c08cf`)

---

## Summary

**Main does NOT reproduce the deployed Worker.** The structural content divergence (separate hardcoded metadata in the build script vs `functions/[[path]].js`) has been resolved on branch `claude/reconcile-worker-pages-rendering-source`. A fresh Worker build from that branch will produce a Worker that serves the same page titles, descriptions, and H1s as the Pages Functions path.

The version gap (post-May-1 file changes) remains and requires a deliberate production Worker rebuild and deploy decision.

---

## Hash Comparison

| | Build from `main` (pre-reconciliation) | Recorded deployed Worker |
|---|---|---|
| **BUILD_ID** | `1905d379c8f8` | `d3cc71487403` |
| **File SHA-256** | `b644064a755ad2a83465c4d9603e4ed88c17493c4873ba505b397522919ae297` | N/A — ETag format unknown |
| **Deployed date** | Not deployed | 2026-05-01 (per HANDOVER.md) |
| **Cloudflare ETag** | Not uploaded | `c42497469d7011fd2daad8a01bbb9ee737de7db9d049c3a7b278777825b739ec` |

**Note on ETag:** The 64-hex-char ETag is SHA-256 length but is the Cloudflare Worker upload ETag, not a plain file hash. It cannot be directly compared to a local file SHA-256.

---

## Cause 1 — Post-Deploy File Changes (version gap)

Three `public/` files changed after the 2026-05-01 Worker deploy. The `sourceHash` (BUILD_ID) is computed from `public/` file contents, so any change to `public/` changes the BUILD_ID.

| File | Commit | Date | What changed |
|---|---|---|---|
| `public/app.js` | `6bb822c` | 2026-05-08 | "Use Pages pretty path for HTML shell asset" |
| `public/app.js` | `617a239` | 2026-05-08 | "Fix public app syntax truncation" |
| `public/404.html` | `6bb822c` | 2026-05-08 | New file added |
| `public/_routes.json` | `6bb822c` | 2026-05-08 | Updated routes manifest |
| `functions/[[path]].js` | `6bb822c` | 2026-05-08 | +14/-2 lines (catch-all static routing) |

`functions/[[path]].js` changes do NOT affect BUILD_ID but DO affect the Pages preview path.

**Status:** Unresolved. Requires a human decision on whether to deploy a new Worker with these changes.

---

## Cause 2 — Structural Content Divergence (now resolved)

`scripts/build-standalone-worker.mjs` previously contained its own hardcoded copies of `guideRoutes`, `trustRoutes`, and `oldGuideRedirects` that differed from the equivalents in `functions/[[path]].js`.

**Examples of divergence before reconciliation:**

| Page | Old Worker (build script) | Pages (`functions/[[path]].js`) |
|---|---|---|
| Homepage `<title>` | `TourTicketCompare \| Ticket Options & Availability` | `Find Verified Ticket Options for Major Tours \| TourTicketCompare` |
| Guide 1 description | `Learn how to compare concert ticket options safely by checking provider sources...` | `Learn how to compare concert ticket prices safely by checking the final total...` |
| Artist page H1 pattern | `[Artist] tickets: check verified ticket options` | `[Artist] stadium tour watch` |

**Resolution (branch `claude/reconcile-worker-pages-rendering-source`):**

- Created `functions/_route-metadata.js` exporting `TRUST_ROUTES`, `GUIDE_ROUTES`, `OLD_GUIDE_REDIRECTS` — using `functions/[[path]].js` values as the source of truth.
- Updated `functions/[[path]].js` to import from `_route-metadata.js` (removed inline declarations).
- Updated `scripts/build-standalone-worker.mjs` to import from `../functions/_route-metadata.js` (removed all three hardcoded const blocks).

**Verification of reconciliation:**

Worker built from reconciled source:
- BUILD_ID: `39fb2f948e27`
- File SHA-256: `c466316b66b4ea8e537e47dc9838a73ff67e52c313728acee51f26854304b148`
- File size: 92,334 bytes
- Homepage title in Worker: `Find Verified Ticket Options for Major Tours | TourTicketCompare` ✓
- Guide 1 H1 in Worker: `How do I compare ticket prices safely?` ✓
- Guide 1 description in Worker: `Learn how to compare concert ticket prices safely by checking the final total...` ✓

---

## Build Script Provenance

`scripts/build-standalone-worker.mjs` was first committed to git on 2026-05-05 (commit `9b62d76`) — four days after the recorded 2026-05-01 Worker deploy. The script used for the May 1 deploy was not tracked in git at the time.

**We cannot confirm whether the build script committed on May 5 is identical to the untracked script used on May 1.** This is an unresolvable gap given the git history.

---

## Assumptions and Unverified Claims

The following are **inferred from HANDOVER.md** and cannot be verified without Cloudflare dashboard access:

- Custom domain routes still point to Worker `tourticketcompare-live` (not Pages)
- Worker `tourticketcompare-live` still exists and is active
- The recorded ETag corresponds to the file currently deployed to `tourticketcompare-live`
- Worker bindings (`DEMAND_DB`, `IMPACT_ACCOUNT_SID`, `IMPACT_AUTH_TOKEN`) are still configured

---

## Status of Known Issues

| Issue | Status |
|---|---|
| BUILD_ID mismatch (main vs deployed) | **Open** — version gap from post-May-1 changes |
| Structural content divergence (Worker vs Pages) | **Resolved** — shared `_route-metadata.js` introduced |
| Build script provenance gap | **Unresolvable from git history** — noted |
| Cloudflare route ownership unverified | **Open** — requires dashboard access |

---

## Before the Next Worker Deploy

1. Merge `claude/reconcile-worker-pages-rendering-source` to `main`.
2. Review the post-May-1 changes (`public/app.js`, `public/404.html`, `public/_routes.json`, `functions/[[path]].js` from commit `6bb822c`) to confirm they are safe to include.
3. Run the full check suite:
   ```bash
   node --check public/app.js
   node --check 'functions/[[path]].js'
   python3 scripts/validate-events.py --for-production
   node scripts/smoke-prelaunch.mjs
   ```
4. Build and syntax-check the Worker:
   ```bash
   node scripts/build-standalone-worker.mjs /tmp/tourticketcompare-worker.js
   node --check /tmp/tourticketcompare-worker.js
   ```
5. Verify in Cloudflare dashboard that custom domains still route to `tourticketcompare-live`.
6. Upload the new Worker to `tourticketcompare-live`, preserving all existing bindings and secrets.
7. Run live smoke checks after deploy.
