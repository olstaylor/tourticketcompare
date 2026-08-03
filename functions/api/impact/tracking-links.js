import {
  basicAuthHeader,
  clean,
  diagnosticNotFound,
  impactConfig,
  isDiagnosticAuthorised,
  json,
  missingCredentialsPayload
} from "./_utils.js";

async function readJson(request) {
  try {
    return await request.json();
  } catch (error) {
    return {};
  }
}

function validDeepLink(value) {
  const raw = clean(value, 2048);
  if (!raw) return { ok: true, value: "" };
  try {
    const parsed = new URL(raw);
    if (parsed.protocol !== "http:" && parsed.protocol !== "https:") return { ok: false, value: "" };
    return { ok: true, value: raw };
  } catch (error) {
    return { ok: false, value: "" };
  }
}

export async function onRequestPost({ request, env }) {
  // This route creates a real tracking link on the account. The token check
  // comes before every other gate, including confirmCreate.
  if (!isDiagnosticAuthorised(request, env)) return diagnosticNotFound();

  const config = impactConfig(env);
  if (!config.configured) return json(missingCredentialsPayload("impact-tracking-links"));

  const url = new URL(request.url);
  const body = await readJson(request);
  if (body.confirmCreate !== true) {
    return json({
      ok: false,
      status: "confirmation_required",
      source: "impact-tracking-links",
      message: "Set confirmCreate to true to create a real impact.com tracking link."
    }, 400);
  }

  const programId = clean(body.programId || url.searchParams.get("programId") || url.searchParams.get("ProgramId"), 120);
  if (!programId) {
    return json({
      ok: false,
      status: "missing_program_id",
      source: "impact-tracking-links",
      message: "ProgramId is required to create a tracking link."
    }, 400);
  }

  const params = new URLSearchParams();
  const allowedParams = [
    ["Type", body.type || url.searchParams.get("type") || url.searchParams.get("Type")],
    ["CustomPath", body.customPath || url.searchParams.get("customPath") || url.searchParams.get("CustomPath")],
    ["AdId", body.adId || url.searchParams.get("adId") || url.searchParams.get("AdId")],
    ["DeepLink", body.deepLink || url.searchParams.get("deepLink") || url.searchParams.get("DeepLink")],
    ["MediaPartnerPropertyId", body.mediaPartnerPropertyId || url.searchParams.get("mediaPartnerPropertyId") || url.searchParams.get("MediaPartnerPropertyId")],
    ["subId1", body.subId1 || url.searchParams.get("subId1")],
    ["subId2", body.subId2 || url.searchParams.get("subId2")],
    ["subId3", body.subId3 || url.searchParams.get("subId3")],
    ["sharedId", body.sharedId || url.searchParams.get("sharedId")]
  ];

  for (const [key, value] of allowedParams) {
    const cleaned = clean(value, key === "DeepLink" ? 2048 : 255);
    if (!cleaned) continue;
    if (key === "DeepLink") {
      const checked = validDeepLink(cleaned);
      if (!checked.ok) {
        return json({
          ok: false,
          status: "invalid_deep_link",
          source: "impact-tracking-links",
          message: "DeepLink must be a valid http(s) URL."
        }, 400);
      }
    }
    params.set(key, cleaned);
  }

  const type = params.get("Type");
  if (type && !["Regular", "Vanity"].includes(type)) {
    return json({
      ok: false,
      status: "invalid_type",
      source: "impact-tracking-links",
      message: "Type must be Regular or Vanity."
    }, 400);
  }

  const endpoint = `${config.apiBase}/Mediapartners/${encodeURIComponent(config.accountSid)}/Programs/${encodeURIComponent(programId)}/TrackingLinks${params.size ? `?${params.toString()}` : ""}`;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: basicAuthHeader(config)
      }
    });
    let payload = null;
    try {
      payload = await response.json();
    } catch (error) {
      payload = null;
    }
    if (!response.ok) {
      return json({
        ok: false,
        status: response.status === 403 ? "missing_scope_or_approval" : "request_rejected",
        source: "impact-tracking-links",
        httpStatus: response.status,
        message: "impact.com rejected the tracking link creation request.",
        error: payload?.Message || payload?.message || null
      }, response.status === 401 || response.status === 403 ? 403 : 400);
    }
    return json({
      ok: true,
      status: "created",
      source: "impact-tracking-links",
      httpStatus: response.status,
      trackingUrl: payload?.TrackingURL || payload?.TrackingUrl || null
    });
  } catch (error) {
    return json({
      ok: false,
      status: "request_failed",
      source: "impact-tracking-links",
      message: "Unable to reach the impact.com TrackingLinks API from Cloudflare Pages."
    }, 502);
  }
}

