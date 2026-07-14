const DEFAULT_IMPACT_API_BASE = "https://api.impact.com";
const DEFAULT_IMPACT_CATALOG_API_VERSION = "16";
const SUPPORTED_IMPACT_CATALOG_API_VERSIONS = new Set(["15", "16"]);
const IMPACT_CREDENTIAL_SETS = new Set(["shared", "seatgeek"]);

export function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}

export function impactCredentialSet(value) {
  const requested = clean(value, 40).toLowerCase();
  return IMPACT_CREDENTIAL_SETS.has(requested) ? requested : "shared";
}

export function impactConfig(env = {}, credentialSet = "shared") {
  const selectedCredentialSet = impactCredentialSet(credentialSet);
  // "shared" remains a backwards-compatible API label, but every active
  // Impact request uses the approved SeatGeek publisher account.
  const accountSid = String(env.IMPACT_SEATGEEK_ACCOUNT_SID || "").trim();
  const authToken = String(env.IMPACT_SEATGEEK_AUTH_TOKEN || "").trim();
  const apiBase = String(env.IMPACT_API_BASE_URL || DEFAULT_IMPACT_API_BASE).replace(/\/+$/, "");
  return {
    accountSid,
    authToken,
    apiBase,
    credentialSet: selectedCredentialSet,
    configured: Boolean(accountSid && authToken)
  };
}

export function impactReadiness(env = {}, credentialSet = "shared") {
  const config = impactConfig(env, credentialSet);
  return {
    configured: config.configured,
    source: "impact-publisher",
    credentialSet: config.credentialSet,
    accountSidPresent: Boolean(config.accountSid),
    authTokenPresent: Boolean(config.authToken)
  };
}

export function missingCredentialsPayload(feature, credentialSet = "shared") {
  const selectedCredentialSet = impactCredentialSet(credentialSet);
  return {
    ok: false,
    status: "missing_credentials",
    source: feature,
    credentialSet: selectedCredentialSet,
    message: "Set IMPACT_SEATGEEK_ACCOUNT_SID and IMPACT_SEATGEEK_AUTH_TOKEN in Cloudflare Pages to enable this server-side impact.com endpoint."
  };
}

export function impactCatalogApiVersion(env = {}, requested = "") {
  const requestedVersion = clean(requested, 2);
  if (SUPPORTED_IMPACT_CATALOG_API_VERSIONS.has(requestedVersion)) return requestedVersion;
  const configuredVersion = clean(env.IMPACT_CATALOG_API_VERSION, 2);
  if (SUPPORTED_IMPACT_CATALOG_API_VERSIONS.has(configuredVersion)) return configuredVersion;
  return DEFAULT_IMPACT_CATALOG_API_VERSION;
}

function impactMessage(payload) {
  const candidates = [
    payload?.Message,
    payload?.message,
    payload?.Error,
    payload?.error,
    payload?.Errors?.[0]?.Message,
    payload?.Errors?.[0]?.message,
    typeof payload?.Errors?.[0] === "string" ? payload.Errors[0] : ""
  ];
  return candidates.find((value) => typeof value === "string" && value.trim()) || "";
}

function safeUpstreamText(value, config = {}) {
  let message = String(value || "")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/[\u0000-\u001f\u007f]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  for (const secret of [config.accountSid, config.authToken]) {
    if (secret) message = message.split(secret).join("[redacted]");
  }
  return clean(message, 300) || null;
}

export async function readImpactResponse(response, config = {}) {
  const raw = await response.text();
  let payload = null;
  try { payload = raw ? JSON.parse(raw) : null; } catch { payload = null; }
  const error = safeUpstreamText(impactMessage(payload) || (payload ? "" : raw), config);
  return {
    payload,
    diagnostic: {
      error,
      upstreamContentType: clean(response.headers.get("content-type"), 120) || null,
      upstreamVersion: clean(response.headers.get("ir-version") || response.headers.get("x-ir-version"), 20) || null,
      upstreamRequestId: clean(response.headers.get("x-request-id") || response.headers.get("x-correlation-id"), 120) || null
    }
  };
}

export function basicAuthHeader(config) {
  const raw = `${config.accountSid}:${config.authToken}`;
  const encoded = typeof btoa === "function"
    ? btoa(raw)
    : Buffer.from(raw, "utf8").toString("base64");
  return `Basic ${encoded}`;
}

export function clean(value, maxLength = 255) {
  return String(value || "").trim().slice(0, maxLength);
}
