import { createImpactTrackingLink } from "../_lib/impact.mjs";

async function readJsonBody(request) {
  try {
    return await request.json();
  } catch (error) {
    return {};
  }
}

export async function POST(request) {
  const url = new URL(request.url);
  const body = await readJsonBody(request);

  if (body.confirmCreate !== true) {
    return new Response(
      JSON.stringify({
        ok: false,
        status: "confirmation_required",
        message: "Set confirmCreate to true to create an impact.com tracking link."
      }),
      {
        status: 400,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "no-store"
        }
      }
    );
  }

  const result = await createImpactTrackingLink({
    env: process.env,
    programId: body.programId || url.searchParams.get("ProgramId") || url.searchParams.get("programId"),
    type: body.type || url.searchParams.get("Type") || url.searchParams.get("type"),
    customPath: body.customPath || url.searchParams.get("CustomPath") || url.searchParams.get("customPath"),
    adId: body.adId || url.searchParams.get("AdId") || url.searchParams.get("adId"),
    deepLink: body.deepLink || url.searchParams.get("DeepLink") || url.searchParams.get("deepLink"),
    mediaPartnerPropertyId:
      body.mediaPartnerPropertyId ||
      url.searchParams.get("MediaPartnerPropertyId") ||
      url.searchParams.get("mediaPartnerPropertyId"),
    subId1: body.subId1 || url.searchParams.get("subId1"),
    subId2: body.subId2 || url.searchParams.get("subId2"),
    subId3: body.subId3 || url.searchParams.get("subId3"),
    sharedId: body.sharedId || url.searchParams.get("sharedId")
  });

  return new Response(JSON.stringify(result), {
    status: result.ok ? 200 : 400,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}
