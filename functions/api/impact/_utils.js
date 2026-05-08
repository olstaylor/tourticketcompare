const DEFAULT_IMPACT_API_BASE = "https://api.impact.com";

export function json(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}

export function impactConfig(env = {}) {
  const accountSid = String(env.IMPACT_ACCOUNT_SID || "").trim();
  const authToken = String(env.IMPACT_AUTH_TOKEN || "").trim();
  const apiBase = String(env.IMPACT_API_BASE_URL || DEFAULT_IMPACT_API_BASE).replace(/\/+$/, "");
  return {
    accountSid,
    authToken,
    apiBase,
    configured: Boolean(accountSid && authToken)
  };
}

export function impactReadiness(env = {}) {
  const config = impactConfig(env);
  return {
    configured: config.configured,
    source: "impact-publisher",
    accountSidPresent: Boolean(config.accountSid),
    authTokenPresent: Boolean(config.authToken)
  };
}

export function missingCredentialsPayload(feature) {
  return {
    ok: false,
    status: "missing_credentials",
    source: feature,
    message: "Set IMPACT_ACCOUNT_SID and IMPACT_AUTH_TOKEN in Cloudflare Pages to enable this server-side impact.com endpoint."
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

