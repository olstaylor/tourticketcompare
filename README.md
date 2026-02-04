# Beyonce 2027 Tour Price Comparison (MVP)

Minimal, production-ready MVP for comparing lowest ticket prices across providers.

## Run locally

1. Install dependencies:

```bash
npm install
```

2. Start the server:

```bash
npm run dev
```

3. Open `http://localhost:3000`.

Mock mode is enabled by default, so it works without any API keys.

## How caching works

- The backend caches prices per show + provider in memory.
- Cache key: `${show.id}:${provider}`.
- Default TTL: 60 minutes (configurable).
- The API endpoint **never** fetches on every page view; it only fetches when a cache entry is missing or expired.

Adjust the TTL via the environment variable:

```bash
CACHE_TTL_MINUTES=30
```

Longer TTLs reduce API usage and help respect strict rate limits (e.g., Ticketmaster).

## Where to add real API calls

Provider adapters live in `server.js`:

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

Copy `.env.example` to `.env` and set real credentials if you implement live adapters.

```bash
MOCK_MODE=true
CACHE_TTL_MINUTES=60
```
