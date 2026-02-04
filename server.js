const express = require("express");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 3000;
const MOCK_MODE = (process.env.MOCK_MODE || "true").toLowerCase() === "true";
const CACHE_TTL_MINUTES = Number(process.env.CACHE_TTL_MINUTES || 60);
const CACHE_TTL_MS = Math.max(1, CACHE_TTL_MINUTES) * 60 * 1000;

// --- Show data (hardcoded, fake 2027 dates) ---
const SHOWS = [
  {
    id: "by-2027-01",
    artist: "Beyonce",
    dateTimeISO: "2027-04-10T19:30:00-04:00",
    city: "Atlanta, GA",
    venue: "Mercedes-Benz Stadium"
  },
  {
    id: "by-2027-02",
    artist: "Beyonce",
    dateTimeISO: "2027-04-14T19:30:00-04:00",
    city: "Miami, FL",
    venue: "Hard Rock Stadium"
  },
  {
    id: "by-2027-03",
    artist: "Beyonce",
    dateTimeISO: "2027-04-20T19:30:00-05:00",
    city: "Houston, TX",
    venue: "NRG Stadium"
  },
  {
    id: "by-2027-04",
    artist: "Beyonce",
    dateTimeISO: "2027-04-25T19:30:00-05:00",
    city: "Dallas, TX",
    venue: "AT&T Stadium"
  },
  {
    id: "by-2027-05",
    artist: "Beyonce",
    dateTimeISO: "2027-05-02T19:30:00-07:00",
    city: "Los Angeles, CA",
    venue: "SoFi Stadium"
  },
  {
    id: "by-2027-06",
    artist: "Beyonce",
    dateTimeISO: "2027-05-07T19:30:00-07:00",
    city: "San Francisco, CA",
    venue: "Levi's Stadium"
  },
  {
    id: "by-2027-07",
    artist: "Beyonce",
    dateTimeISO: "2027-05-12T19:30:00-07:00",
    city: "Seattle, WA",
    venue: "Lumen Field"
  },
  {
    id: "by-2027-08",
    artist: "Beyonce",
    dateTimeISO: "2027-05-18T19:30:00-06:00",
    city: "Chicago, IL",
    venue: "Soldier Field"
  },
  {
    id: "by-2027-09",
    artist: "Beyonce",
    dateTimeISO: "2027-05-23T19:30:00-04:00",
    city: "New York, NY",
    venue: "MetLife Stadium"
  },
  {
    id: "by-2027-10",
    artist: "Beyonce",
    dateTimeISO: "2027-05-28T19:30:00-04:00",
    city: "Boston, MA",
    venue: "Gillette Stadium"
  }
];

// --- In-memory cache ---
// key: `${show.id}:${provider}` -> { data, expiresAt }
const priceCache = new Map();

function getCache(key) {
  const entry = priceCache.get(key);
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) return null;
  return entry.data;
}

function setCache(key, data) {
  priceCache.set(key, {
    data,
    expiresAt: Date.now() + CACHE_TTL_MS
  });
}

// --- Provider adapters ---
// Interface: fetchLowestPrice(show) -> { provider, price, currency, url, fetchedAt }

function createMockAdapter(provider) {
  return {
    provider,
    async fetchLowestPrice(show) {
      // Simulate latency and occasional timeout
      const latency = 100 + Math.floor(Math.random() * 400);
      await new Promise((resolve) => setTimeout(resolve, latency));

      const roll = Math.random();
      if (roll < 0.08) {
        // 8% timeout
        const err = new Error("Timeout");
        err.code = "ETIMEDOUT";
        throw err;
      }

      if (roll < 0.20) {
        // 12% no inventory
        return {
          provider,
          price: null,
          currency: "USD",
          url: null,
          fetchedAt: new Date().toISOString(),
          status: "unavailable"
        };
      }

      const base = 120 + Math.floor(Math.random() * 180);
      const variance = Math.floor(Math.random() * 40);
      const price = base + variance;

      return {
        provider,
        price,
        currency: "USD",
        url: `https://example.com/${provider.toLowerCase()}/event/${show.id}`,
        fetchedAt: new Date().toISOString(),
        status: "ok"
      };
    }
  };
}

function createLiveAdapter(provider) {
  return {
    provider,
    async fetchLowestPrice(show) {
      // Placeholder for real API integration.
      // This should call official APIs using server-side credentials.
      // Return the normalized response in the same shape as the mock adapter.
      throw new Error(`Live adapter not implemented for ${provider}`);
    }
  };
}

const providers = ["Ticketmaster", "SeatGeek", "Vivid Seats"].map((name) =>
  MOCK_MODE ? createMockAdapter(name) : createLiveAdapter(name)
);

async function getProviderPrice(show, adapter) {
  const key = `${show.id}:${adapter.provider}`;
  const cached = getCache(key);
  if (cached) return cached;

  try {
    const data = await adapter.fetchLowestPrice(show);
    const normalized = {
      provider: adapter.provider,
      price: data.price ?? null,
      currency: data.currency || "USD",
      url: data.url || null,
      fetchedAt: data.fetchedAt || new Date().toISOString(),
      status: data.status || (data.price ? "ok" : "unavailable")
    };
    setCache(key, normalized);
    return normalized;
  } catch (err) {
    const fallback = {
      provider: adapter.provider,
      price: null,
      currency: "USD",
      url: null,
      fetchedAt: new Date().toISOString(),
      status: "unavailable",
      error: err.code || "error"
    };
    setCache(key, fallback);
    return fallback;
  }
}

app.get("/api/shows", async (_req, res) => {
  // Always serve from cache; fetch only when missing or expired.
  const enriched = await Promise.all(
    SHOWS.map(async (show) => {
      const prices = await Promise.all(
        providers.map((adapter) => getProviderPrice(show, adapter))
      );

      return {
        ...show,
        prices
      };
    })
  );

  res.json({
    generatedAt: new Date().toISOString(),
    cacheTtlMinutes: CACHE_TTL_MINUTES,
    mockMode: MOCK_MODE,
    shows: enriched
  });
});

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Mock mode: ${MOCK_MODE ? "ON" : "OFF"}`);
  console.log(`Cache TTL: ${CACHE_TTL_MINUTES} minutes`);
});
