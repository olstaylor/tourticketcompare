# TourTicketCompare Deployment

This project currently has one confirmed production path:

- Production runtime: Cloudflare Worker `tourticketcompare-live`
- Live routes: `tourticketcompare.com/*` and `www.tourticketcompare.com/*`
- Cloudflare Pages: preview/fallback only
- Vercel: not production and should not be reintroduced without an explicit architecture decision

Do not assume that a Cloudflare Pages deploy updates the live custom domains while the Worker routes remain active.

## Local Check

Install dependencies:

```bash
npm install
```

Run syntax checks:

```bash
node --check "functions/[[path]].js"
node --check functions/api/shows.js
node --check functions/api/click.js
node --check functions/api/health.js
node --check functions/sitemap.xml.js
node --check public/app.js
```

Run the available data validation:

```bash
npm run events:validate
```

Run local Pages preview:

```bash
npm run dev
```

Then open `http://localhost:3000/api/health`.

## Preview Deploy

Cloudflare Pages can still be useful as a preview/fallback path.

Deploy Pages preview/fallback:

```bash
npm run deploy:pages
```

Deploy Pages after strict event-data validation:

```bash
npm run deploy:pages:safe
```

These commands are not the production deploy path while custom domains route to Worker `tourticketcompare-live`.

## Production Worker Deploy

`npm run deploy` intentionally refuses to deploy. This prevents accidental Pages deployment under a production-sounding script name.

Production must be deployed by updating Cloudflare Worker `tourticketcompare-live` with the intended Worker source or generated Worker bundle while preserving existing bindings and secrets.

Important current limitation: the tracked `main` branch does not yet contain the confirmed production Worker source/bundle generator. Do not deploy production until the Worker entrypoint is committed, reviewed, and verified. The committed Pages preview health route should be mirrored by the production Worker route.

Before any production Worker deploy:

1. Confirm Cloudflare routes still point `tourticketcompare.com/*` and `www.tourticketcompare.com/*` to `tourticketcompare-live`.
2. Confirm the Worker source or generated bundle is the intended production entrypoint.
3. Confirm required bindings/secrets are already configured in Cloudflare.
4. Run local syntax checks and event validation.
5. Do not paste secret values into source code, logs, docs, or pull requests.

Required production Worker behavior:

- `GET /api/health` returns app status and binding presence only.
- Health output never returns token values, API keys, account IDs, D1 database IDs, or program IDs.
- `www.tourticketcompare.com` redirects to `https://tourticketcompare.com/`.

## Verify Health

After a preview or production deploy, check:

```bash
curl -fsS https://tourticketcompare.com/api/health
curl -fsSI https://www.tourticketcompare.com/
```

Expected health shape:

```json
{
  "ok": true,
  "service": "tourticketcompare",
  "status": "ok",
  "config": {
    "mockMode": false,
    "allowMockPrices": false
  },
  "bindings": {
    "demandDb": true
  }
}
```

The exact binding booleans may vary by environment. Secret values must never appear.

## Vercel

Vercel is not production for this project. Do not add `vercel.json`, `api/**/*.mjs`, or Vercel deployment commands unless a future architecture decision explicitly reintroduces Vercel as an experimental preview path.
