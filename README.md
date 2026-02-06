# Beyonce 2027 Tour Price Comparison (Cloudflare MVP)

Minimal, production-ready MVP for comparing lowest ticket prices across providers using Cloudflare Pages + Functions (Workers).

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Start Cloudflare Pages local dev:

```bash
npm run dev
```

3. Open `http://localhost:3000`.

Mock mode is enabled by default, so it works without any API keys.

## Deploy to Cloudflare

1. Create a Cloudflare Pages project (from your Git repo).
2. Set **Build output directory** to `public`.
3. Add environment variables in the Pages dashboard (see `.env.example`).
4. Deploy.

The `/api/shows` endpoint is provided by a Cloudflare Pages Function in `functions/api/shows.js`.

## How caching works

- The API caches prices per show + provider using the Workers Cache API.
- Cache key: `https://cache.local/prices?showId=...&provider=...`.
- Default TTL: 60 minutes (configurable).
- The API endpoint **never** fetches on every page view; it only fetches when a cache entry is missing or expired.

## Ticketmaster rate limits (recommended)

Ticketmaster can have strict daily call limits. This project supports a **durable daily counter** using Cloudflare D1.

1. Create a D1 database in Cloudflare.
2. Run the schema in `migrations/001_daily_provider_calls.sql`.
3. Bind the database to your Pages project as `RATE_LIMIT_DB`.

If `RATE_LIMIT_DB` is not present, the app falls back to a best-effort counter using the Workers Cache API (not strictly durable).

Adjust the TTL via the environment variable:

```bash
CACHE_TTL_MINUTES=30
```

Longer TTLs reduce API usage and help respect strict rate limits (e.g., Ticketmaster).

## Where to add real API calls

Provider adapters live in `functions/api/shows.js`:

- `createLiveAdapter(provider)` is the placeholder for official API integration.
- Replace the `throw new Error(...)` with real calls to each provider's official API or affiliate feed.
- Keep credentials server-side using environment variables.

The adapter interface must return:

```js
{
  provider,
  price,
  currency,
  url,
  fetchedAt,
  status
}
```

## Respecting provider terms

- This MVP **does not scrape** any ticketing websites.
- Use only official APIs or affiliate feeds.
- Always comply with rate limits and caching requirements.
- Ensure your use case aligns with each provider's terms of service.

## Configuration

Set these in Cloudflare Pages environment variables:

```bash
MOCK_MODE=true
CACHE_TTL_MINUTES=60
```
