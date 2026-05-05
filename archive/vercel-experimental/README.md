# Vercel Experimental Archive

Vercel is not the production runtime for TourTicketCompare.

Production currently belongs to Cloudflare Worker `tourticketcompare-live`. Cloudflare Pages may be used for preview/fallback only.

If Vercel-specific files such as `vercel.json` or `api/**/*.mjs` are reintroduced, keep them out of the root production path unless a future architecture decision explicitly adopts Vercel. Experimental Vercel code should live under this archive folder or another clearly named non-production location.
