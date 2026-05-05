const PLACEHOLDER_URL_PATTERN = /example\.com|placeholder|your-link|replace-me|localhost|127\.0\.0\.1/i;

const PROVIDERS = {
  ticketmaster: {
    allowedDestinationHosts: ["ticketmaster.com", "ticketmaster.co.uk"],
    trustedAffiliateHosts: ["ticketmaster.evyy.net"]
  },
  seatgeek: {
    allowedDestinationHosts: ["seatgeek.com"],
    trustedAffiliateHosts: []
  },
  "vivid-seats": {
    allowedDestinationHosts: ["vividseats.com"],
    trustedAffiliateHosts: []
  }
};

const VERIFIED_TICKET_LINKS = {
  "beyonce:ticketmaster": "https://ticketmaster.evyy.net/beyonce",
  "harry-styles:ticketmaster": "https://ticketmaster.evyy.net/vD4B5y",
  "bts:ticketmaster": "https://ticketmaster.evyy.net/OY9gkr",
  "ariana-grande:ticketmaster": "https://ticketmaster.evyy.net/bkDx6b",
  "bad-bunny:ticketmaster": "https://ticketmaster.evyy.net/zzeEWW",
  "morgan-wallen:ticketmaster": "https://ticketmaster.evyy.net/morganwallenus",
  "jay-z:ticketmaster": "https://ticketmaster.evyy.net/5kM6W3"
};

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
  return key === "vividseats" ? "vivid-seats" : key;
}

function jsonResponse(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}

function safeUrl(value) {
  const raw = clean(value, 2048);
  if (!raw || PLACEHOLDER_URL_PATTERN.test(raw)) return null;
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

function resolveOut({ artistSlug, provider, requestedDestination }) {
  if (!artistSlug) return { ok: false, status: "missing_artist_slug" };
  const providerConfig = PROVIDERS[provider];
  if (!providerConfig) return { ok: false, status: "unknown_provider" };

  if (requestedDestination) {
    const requested = safeUrl(requestedDestination);
    if (!requested) return { ok: false, status: "invalid_destination" };
    if (!hostnameAllowed(requested.hostname, providerConfig.allowedDestinationHosts)) {
      return { ok: false, status: "destination_not_allowlisted" };
    }
  }

  const redirectUrl = VERIFIED_TICKET_LINKS[`${artistSlug}:${provider}`];
  const redirect = safeUrl(redirectUrl);
  if (!redirectUrl) return { ok: false, status: "provider_not_configured" };
  if (!redirect || !hostnameAllowed(redirect.hostname, providerConfig.allowedDestinationHosts.concat(providerConfig.trustedAffiliateHosts))) {
    return { ok: false, status: "configured_redirect_rejected" };
  }

  return { ok: true, redirectUrl: redirect.toString(), artistSlug, provider };
}

async function readJsonBody(request) {
  if (request.method !== "POST") return {};
  try {
    return await request.json();
  } catch (error) {
    return {};
  }
}

export async function GET(request) {
  const url = new URL(request.url);
  const result = resolveOut({
    artistSlug: slugify(url.searchParams.get("artistSlug")),
    provider: providerKey(url.searchParams.get("provider") || "ticketmaster"),
    requestedDestination: url.searchParams.get("destinationUrl") || url.searchParams.get("deepLink")
  });
  if (!result.ok) return jsonResponse(result, 400);
  return Response.redirect(result.redirectUrl, 302);
}

export async function POST(request) {
  const url = new URL(request.url);
  const body = await readJsonBody(request);
  const result = resolveOut({
    artistSlug: slugify(body.artistSlug || url.searchParams.get("artistSlug")),
    provider: providerKey(body.provider || url.searchParams.get("provider") || "ticketmaster"),
    requestedDestination: body.destinationUrl || body.deepLink || url.searchParams.get("destinationUrl") || url.searchParams.get("deepLink")
  });
  if (!result.ok) return jsonResponse(result, 400);
  return jsonResponse({ ok: true, status: "redirect_ready", ...result });
}
