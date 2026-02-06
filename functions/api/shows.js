const SHOWS = [
  {
    id: "by-2027-ldn-01",
    artist: "Beyonce",
    dateTimeISO: "2027-06-03T19:30:00Z",
    city: "London, UK",
    venue: "Wembley Stadium",
    seatgeek_url: "https://example.com/seatgeek/event/by-2027-ldn-01",
    vividseats_url: "https://example.com/vividseats/event/by-2027-ldn-01",
    ticketmaster_url: "https://example.com/ticketmaster/event/by-2027-ldn-01"
  }
];

function getEnvBoolean(value, fallback) {
  if (value == null) return fallback;
  return String(value).toLowerCase() === "true";
}

function getEnvNumber(value, fallback) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function providerKey(provider) {
  return String(provider || "").toLowerCase().replace(/\s+/g, "");
}

function getAffiliateUrl(show, provider) {
  if (!show) return null;
  const key = providerKey(provider);
  const fromLinks = show.links && typeof show.links === "object" ? show.links[key] : null;
  const fromFields = show[`${key}_url`];
  const value = typeof fromLinks === "string" && fromLinks.trim().length
    ? fromLinks
    : fromFields;
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length ? trimmed : null;
}

function buildProviderUrl(show, provider) {
  const affiliate = getAffiliateUrl(show, provider);
  if (affiliate) return affiliate;
  const key = providerKey(provider);
  return `https://example.com/${key}/event/${show.id}`;
}

function createMockAdapter(provider) {
  return {
    provider,
    async fetchLowestPrice(show) {
      const latency = 100 + Math.floor(Math.random() * 400);
      await new Promise((resolve) => setTimeout(resolve, latency));

      const roll = Math.random();
      if (roll < 0.08) {
        const err = new Error("Timeout");
        err.code = "ETIMEDOUT";
        throw err;
      }

      if (roll < 0.20) {
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
        url: buildProviderUrl(show, provider),
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
      // Use official APIs or affiliate feeds only.
      // Keep credentials server-side via environment variables.
      throw new Error(`Live adapter not implemented for ${provider}`);
    }
  };
}

function createProviders(mockMode) {
  return ["Ticketmaster", "SeatGeek", "Vivid Seats"].map((name) =>
    mockMode ? createMockAdapter(name) : createLiveAdapter(name)
  );
}

function buildCacheKey(showId, provider) {
  return `https://cache.local/prices?showId=${encodeURIComponent(
    showId
  )}&provider=${encodeURIComponent(provider)}`;
}

function buildStaleCacheKey(showId, provider) {
  return `https://cache.local/prices-stale?showId=${encodeURIComponent(
    showId
  )}&provider=${encodeURIComponent(provider)}`;
}

function buildRateLimitKey(provider, dateKey) {
  return `https://cache.local/ratelimit?provider=${encodeURIComponent(
    provider
  )}&date=${encodeURIComponent(dateKey)}`;
}

function secondsUntilUtcMidnight(now = new Date()) {
  const nextDay = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate() + 1
  ));
  return Math.max(60, Math.floor((nextDay - now) / 1000));
}

function getRateLimitDb(env) {
  const candidate = env?.RATE_LIMIT_DB || env?.DB;
  if (candidate && typeof candidate.prepare === "function") return candidate;
  return null;
}

async function ensureRateLimitSchema(db) {
  // Best-effort. In production, create this table once via a migration.
  // D1 will just no-op if it already exists.
  try {
    await db.prepare(
      `CREATE TABLE IF NOT EXISTS daily_provider_calls (
        provider TEXT NOT NULL,
        day TEXT NOT NULL,
        count INTEGER NOT NULL,
        updated_at TEXT NOT NULL,
        PRIMARY KEY (provider, day)
      )`
    ).run();
  } catch (err) {
    // Ignore schema errors; we can still fall back to cache-based limits.
  }
}

async function checkAndIncrementDailyCapD1(db, provider, day, dailyCap) {
  // Atomically increments only if count < dailyCap.
  // Returns { allowed: boolean, count: number } where count is the current count.
  const now = new Date().toISOString();

  // Attempt insert-or-increment with a cap condition.
  try {
    const stmt = db.prepare(
      `INSERT INTO daily_provider_calls (provider, day, count, updated_at)
       VALUES (?1, ?2, 1, ?3)
       ON CONFLICT(provider, day) DO UPDATE SET
         count = count + 1,
         updated_at = excluded.updated_at
       WHERE daily_provider_calls.count < ?4
       RETURNING count`
    ).bind(provider, day, now, dailyCap);

    const row = await stmt.first();
    if (row && typeof row.count === "number") {
      return { allowed: true, count: row.count };
    }
  } catch (err) {
    // If RETURNING isn't supported or schema missing, we'll try a safer fallback below.
  }

  // Fallback: read current count; do not increment (not strictly enforcing in a race).
  try {
    const row = await db.prepare(
      `SELECT count FROM daily_provider_calls WHERE provider = ?1 AND day = ?2`
    ).bind(provider, day).first();

    const count = row && typeof row.count === "number" ? row.count : 0;
    return { allowed: count < dailyCap, count };
  } catch (err) {
    return { allowed: true, count: 0 };
  }
}

async function getDailyCount(cache, provider) {
  const dateKey = new Date().toISOString().slice(0, 10);
  const key = buildRateLimitKey(provider, dateKey);
  const ttlSeconds = secondsUntilUtcMidnight();
  const cached = await cache.match(key);
  if (!cached) {
    return { count: 0, key, ttlSeconds };
  }
  try {
    const data = await cached.json();
    return { count: Number(data.count) || 0, key, ttlSeconds };
  } catch (err) {
    return { count: 0, key, ttlSeconds };
  }
}

async function setDailyCount(cache, key, count, ttlSeconds) {
  const response = new Response(JSON.stringify({
    count,
    updatedAt: new Date().toISOString()
  }), {
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": `public, max-age=${ttlSeconds}`
    }
  });
  await cache.put(key, response);
}

async function getProviderPrice(show, adapter, cache, ttlSeconds, rateLimitConfig) {
  const cacheKey = buildCacheKey(show.id, adapter.provider);
  const cached = await cache.match(cacheKey);
  if (cached) {
    return cached.json();
  }

  const isRateLimitedProvider = Boolean(rateLimitConfig) &&
    adapter.provider === rateLimitConfig.provider &&
    rateLimitConfig.dailyCap > 0;

  if (isRateLimitedProvider) {
    const dayKey = new Date().toISOString().slice(0, 10);
    const db = getRateLimitDb(rateLimitConfig.env);
    if (db) {
      await ensureRateLimitSchema(db);
      const { allowed, count } = await checkAndIncrementDailyCapD1(
        db,
        adapter.provider,
        dayKey,
        rateLimitConfig.dailyCap
      );
      if (!allowed) {
        const staleCached = await cache.match(buildStaleCacheKey(show.id, adapter.provider));
        if (staleCached) {
          const staleData = await staleCached.json();
          return {
            ...staleData,
            status: "stale",
            rateLimited: true
          };
        }

        return {
          provider: adapter.provider,
          price: null,
          currency: "USD",
          url: buildProviderUrl(show, adapter.provider),
          fetchedAt: new Date().toISOString(),
          status: "rate_limited",
          dailyCount: count
        };
      }
    } else {
      // Fallback (not strictly durable): use caches.default as a best-effort limiter.
      const { count, key, ttlSeconds: dailyTtl } = await getDailyCount(cache, adapter.provider);
      if (count >= rateLimitConfig.dailyCap) {
        const staleCached = await cache.match(buildStaleCacheKey(show.id, adapter.provider));
        if (staleCached) {
          const staleData = await staleCached.json();
          return {
            ...staleData,
            status: "stale",
            rateLimited: true
          };
        }

        return {
          provider: adapter.provider,
          price: null,
          currency: "USD",
          url: buildProviderUrl(show, adapter.provider),
          fetchedAt: new Date().toISOString(),
          status: "rate_limited",
          dailyCount: count
        };
      }

      await setDailyCount(cache, key, count + 1, dailyTtl);
    }
  }

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

    const response = new Response(JSON.stringify(normalized), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": `public, max-age=${ttlSeconds}`
      }
    });

    await cache.put(cacheKey, response.clone());

    if (isRateLimitedProvider && rateLimitConfig.staleTtlSeconds > 0) {
      const staleResponse = new Response(JSON.stringify(normalized), {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": `public, max-age=${rateLimitConfig.staleTtlSeconds}`
        }
      });
      await cache.put(buildStaleCacheKey(show.id, adapter.provider), staleResponse);
    }

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

    const response = new Response(JSON.stringify(fallback), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": `public, max-age=${ttlSeconds}`
      }
    });

    await cache.put(cacheKey, response.clone());
    return fallback;
  }
}

export async function onRequestGet({ env }) {
  const mockMode = getEnvBoolean(env.MOCK_MODE, true);
  const ttlMinutes = Math.max(1, getEnvNumber(env.CACHE_TTL_MINUTES, 60));
  const ttlSeconds = ttlMinutes * 60;
  const ticketmasterDailyCap = Math.max(0, getEnvNumber(env.TICKETMASTER_DAILY_CAP, 1000));
  const ticketmasterStaleTtlHours = Math.max(0, getEnvNumber(env.TICKETMASTER_STALE_TTL_HOURS, 168));
  const ticketmasterStaleTtlSeconds = ticketmasterStaleTtlHours * 60 * 60;

  const cache = caches.default;
  const providers = createProviders(mockMode);
  const rateLimitConfig = {
    env,
    provider: "Ticketmaster",
    dailyCap: ticketmasterDailyCap,
    staleTtlSeconds: ticketmasterStaleTtlSeconds
  };

  const shows = await Promise.all(
    SHOWS.map(async (show) => {
      const prices = await Promise.all(
        providers.map((adapter) =>
          getProviderPrice(show, adapter, cache, ttlSeconds, rateLimitConfig)
        )
      );

      return {
        ...show,
        prices
      };
    })
  );

  return new Response(
    JSON.stringify({
      generatedAt: new Date().toISOString(),
      cacheTtlMinutes: ttlMinutes,
      mockMode,
      shows
    }),
    {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": `public, max-age=${ttlSeconds}`
      }
    }
  );
}
