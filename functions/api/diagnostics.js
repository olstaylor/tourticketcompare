// Temporary diagnostic endpoint for testing outbound API access from Cloudflare Pages Functions
// Accessible only with DEBUG_API_TOKEN
// Tests both SeatGeek API and harmless external endpoints to diagnose 403 errors

function clean(value, max = 255) {
  return String(value || "").trim().slice(0, max);
}

function isAuthorised(token, env) {
  const expected = clean(env?.DEBUG_API_TOKEN, 255);
  if (!expected) return false;
  return token === expected;
}

function json(payload, status = 200) {
  return new Response(JSON.stringify(payload, null, 2), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" }
  });
}

async function testFetch(url) {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { "User-Agent": "TourTicketCompare-Diagnostics" },
      redirect: "manual"
    });

    const body = await response.text();
    const bodyPreview = body.slice(0, 300);

    return {
      ok: true,
      status: response.status,
      statusText: response.statusText,
      headers: {
        "content-type": response.headers.get("content-type"),
        "x-deny-reason": response.headers.get("x-deny-reason"),
        "server": response.headers.get("server")
      },
      bodyPreview: bodyPreview,
      bodySizeBytes: body.length
    };
  } catch (error) {
    return {
      ok: false,
      error: error.message,
      errorType: error.constructor.name
    };
  }
}

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const token = clean(url.searchParams.get("token"), 255);

  // Require authentication
  if (!isAuthorised(token, env)) {
    return json({ ok: false, error: "Not found" }, 404);
  }

  const test = clean(url.searchParams.get("test"), 50);

  if (!test) {
    return json({
      ok: false,
      error: "Missing test parameter",
      usage: "/api/diagnostics?token=<token>&test=seatgeek|httpbin|both",
      description: "Diagnostic endpoint for testing outbound fetch() from Cloudflare Pages Functions runtime"
    }, 400);
  }

  const runtimeMarker = "Cloudflare Pages Functions";
  const seatgeekCredentialsPresent = Boolean(clean(env?.SEATGEEK_CLIENT_ID, 1));

  const results = {};

  if (test === "seatgeek" || test === "both") {
    results.seatgeek_api = await testFetch("https://api.seatgeek.com/2/events?per_page=1");
  }

  if (test === "httpbin" || test === "both") {
    results.httpbin = await testFetch("https://httpbin.org/get");
  }

  return json({
    ok: true,
    runtime: runtimeMarker,
    timestamp: new Date().toISOString(),
    configuration: {
      seatgeek_credentials_present: seatgeekCredentialsPresent
    },
    tests: results,
    interpretation: test === "both"
      ? {
          note: "If httpbin succeeds but seatgeek fails → SeatGeek/host-specific issue",
          note2: "If both fail in Cloudflare → platform egress restriction",
          note3: "If both succeed → previous 403 came from test environment, not production"
        }
      : null
  }, 200);
}
