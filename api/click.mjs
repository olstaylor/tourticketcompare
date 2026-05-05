export async function POST(request) {
  const enabled = String(process.env.CLICK_TRACKING_ENABLED || "true").toLowerCase() === "true";
  if (!enabled) {
    return new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });
  }

  let payload = null;
  try {
    payload = await request.json();
  } catch (error) {
    return new Response(JSON.stringify({ error: "invalid_json" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store"
      }
    });
  }

  const targetUrl = String(payload?.targetUrl || "").trim();
  if (!/^https?:\/\//i.test(targetUrl)) {
    return new Response(JSON.stringify({ error: "invalid_target_url" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store"
      }
    });
  }

  console.log(
    JSON.stringify({
      type: "affiliate_click",
      createdAt: new Date().toISOString(),
      eventId: String(payload?.eventId || "").slice(0, 80),
      artistSlug: String(payload?.artistSlug || "").slice(0, 80),
      provider: String(payload?.provider || "").slice(0, 40),
      targetUrl
    })
  );

  return new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });
}
