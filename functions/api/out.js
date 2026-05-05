const PLACEHOLDER_URL_PATTERN = /example\.com|placeholder|your-link|replace-me|localhost|127\.0\.0\.1/i;

const PROVIDERS = {
  ticketmaster: {
    name: "Ticketmaster",
    allowedDestinationHosts: ["ticketmaster.com", "ticketmaster.co.uk"],
    trustedAffiliateHosts: ["ticketmaster.evyy.net"]
  },
  seatgeek: {
    name: "SeatGeek",
    allowedDestinationHosts: ["seatgeek.com"],
    trustedAffiliateHosts: []
  },
  "vivid-seats": {
    name: "Vivid Seats",
    allowedDestinationHosts: ["vividseats.com"],
    trustedAffiliateHosts: []
  }
};

const VERIFIED_TICKET_LINKS = {
  "beyonce:ticketmaster": {
    artistSlug: "beyonce",
    provider: "ticketmaster",
    linkId: "tm-artist-beyonce",
    redirectUrl: "https://ticketmaster.evyy.net/beyonce",
    verified: true
  },
  "harry-styles:ticketmaster": {
    artistSlug: "harry-styles",
    provider: "ticketmaster",
    linkId: "tm-artist-harry-styles",
    redirectUrl: "https://ticketmaster.evyy.net/vD4B5y",
    verified: true
  },
  "bts:ticketmaster": {
    artistSlug: "bts",
    provider: "ticketmaster",
    linkId: "tm-artist-bts",
    redirectUrl: "https://ticketmaster.evyy.net/OY9gkr",
    verified: true
  },
  "ariana-grande:ticketmaster": {
    artistSlug: "ariana-grande",
    provider: "ticketmaster",
    linkId: "tm-artist-ariana-grande",
    redirectUrl: "https://ticketmaster.evyy.net/bkDx6b",
    verified: true
  },
  "bad-bunny:ticketmaster": {
    artistSlug: "bad-bunny",
    provider: "ticketmaster",
    linkId: "tm-artist-bad-bunny",
    redirectUrl: "https://ticketmaster.evyy.net/zzeEWW",
    verified: true
  },
  "morgan-wallen:ticketmaster": {
    artistSlug: "morgan-wallen",
    provider: "ticketmaster",
    linkId: "tm-artist-morgan-wallen",
    redirectUrl: "https://ticketmaster.evyy.net/morganwallenus",
    verified: true
  },
  "jay-z:ticketmaster": {
    artistSlug: "jay-z",
    provider: "ticketmaster",
    linkId: "tm-artist-jay-z",
    redirectUrl: "https://ticketmaster.evyy.net/5kM6W3",
    verified: true
  }
};

function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}

function clean(value, max = 255) {
  return String(value || "").trim().slice(0, max);
}

function slugify(value) {
  return clean(value, 120)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function providerKey(value) {
  const key = slugify(value);
  if (key === "vividseats") return "vivid-seats";
  return key;
}

function getDemandDb(env) {
  const candidate = env?.DEMAND_DB;
  return candidate && typeof candidate.prepare === "function" ? candidate : null;
}

function isPlaceholderUrl(value) {
  return PLACEHOLDER_URL_PATTERN.test(String(value || ""));
}

function safeUrl(value) {
  const raw = clean(value, 2048);
  if (!raw || isPlaceholderUrl(raw)) return null;
  try {
    const parsed = new URL(raw);
    if (parsed.protocol !== "https:" && parsed.protocol !== "http:") return null;
    return parsed;
  } catch (error) {
    return null;
  }
}

function hostnameAllowed(hostname, allowedHosts) {
  const host = String(hostname || "").toLowerCase();
  return allowedHosts.some((allowed) => host === allowed || host.endsWith(`.${allowed}`));
}

function validateRequestedDestination(provider, value) {
  if (!value) return { ok: true };
  const parsed = safeUrl(value);
  if (!parsed) return { ok: false, status: "invalid_destination" };
  if (!hostnameAllowed(parsed.hostname, provider.allowedDestinationHosts)) {
    return { ok: false, status: "destination_not_allowlisted" };
  }
  return { ok: true, destinationHost: parsed.hostname.toLowerCase() };
}

function validateConfiguredRedirect(provider, value) {
  const parsed = safeUrl(value);
  if (!parsed) return null;
  const hosts = provider.allowedDestinationHosts.concat(provider.trustedAffiliateHosts);
  return hostnameAllowed(parsed.hostname, hosts) ? parsed : null;
}

async function readBody(request) {
  if (request.method !== "POST") return {};
  try {
    return await request.json();
  } catch (error) {
    return {};
  }
}

async function trackClick({ request, env, link, sourcePath, destinationHost }) {
  const db = getDemandDb(env);
  if (!db) return;
  const now = new Date().toISOString();
  const metadata = JSON.stringify({
    provider: link.provider,
    artistSlug: link.artistSlug,
    sourcePath,
    destinationHost,
    linkId: link.linkId
  });
  try {
    await db
      .prepare(
        `INSERT INTO analytics_events (
          created_at, event_name, source_path, artist_slug, email, request_key, referrer, user_agent,
          metadata_json, provider, tour_slug, destination_host, link_id
        ) VALUES (?1, ?2, ?3, ?4, NULL, NULL, ?5, ?6, ?7, ?8, NULL, ?9, ?10)`
      )
      .bind(
        now,
        "outbound_click",
        sourcePath || "/",
        link.artistSlug,
        clean(request.headers.get("referer"), 512) || null,
        clean(request.headers.get("user-agent"), 255) || null,
        metadata,
        link.provider,
        destinationHost || null,
        link.linkId
      )
      .run();
  } catch (error) {
    try {
      await db
        .prepare(
          `INSERT INTO analytics_events (
            created_at, event_name, source_path, artist_slug, email, request_key, referrer, user_agent, metadata_json
          ) VALUES (?1, ?2, ?3, ?4, NULL, NULL, ?5, ?6, ?7)`
        )
        .bind(
          now,
          "outbound_click",
          sourcePath || "/",
          link.artistSlug,
          clean(request.headers.get("referer"), 512) || null,
          clean(request.headers.get("user-agent"), 255) || null,
          metadata
        )
        .run();
    } catch (fallbackError) {
      // Click tracking must never block a safe redirect.
    }
  }
}

async function handleOut(request, env, mode) {
  const url = new URL(request.url);
  const body = await readBody(request);
  const artistSlug = slugify(body.artistSlug || url.searchParams.get("artistSlug"));
  const provider = providerKey(body.provider || url.searchParams.get("provider") || "ticketmaster");
  const sourcePath = clean(body.sourcePath || url.searchParams.get("sourcePath") || request.headers.get("referer") || "/", 255);
  const requestedDestination = clean(body.destinationUrl || body.deepLink || url.searchParams.get("destinationUrl") || url.searchParams.get("deepLink"), 2048);

  if (!artistSlug) return json({ ok: false, status: "missing_artist_slug" }, 400);
  const providerConfig = PROVIDERS[provider];
  if (!providerConfig) return json({ ok: false, status: "unknown_provider" }, 400);

  const destinationCheck = validateRequestedDestination(providerConfig, requestedDestination);
  if (!destinationCheck.ok) {
    return json({ ok: false, status: destinationCheck.status }, 400);
  }

  const link = VERIFIED_TICKET_LINKS[`${artistSlug}:${provider}`];
  if (!link || !link.verified) {
    return json({ ok: false, status: "provider_not_configured" }, 400);
  }

  const redirect = validateConfiguredRedirect(providerConfig, link.redirectUrl);
  if (!redirect) return json({ ok: false, status: "configured_redirect_rejected" }, 400);

  await trackClick({ request, env, link, sourcePath, destinationHost: redirect.hostname.toLowerCase() });

  if (mode === "redirect") {
    return Response.redirect(redirect.toString(), 302);
  }

  return json({
    ok: true,
    status: "redirect_ready",
    redirectUrl: redirect.toString(),
    provider,
    artistSlug
  });
}

export async function onRequestGet({ request, env }) {
  return handleOut(request, env, "redirect");
}

export async function onRequestPost({ request, env }) {
  return handleOut(request, env, "json");
}
