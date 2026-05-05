import { searchImpactMarketplaceProducts } from "../_lib/impact.mjs";

export async function GET(request) {
  const url = new URL(request.url);
  const result = await searchImpactMarketplaceProducts({
    env: process.env,
    query: url.searchParams.get("q") || "",
    page: url.searchParams.get("Page") || url.searchParams.get("page") || "1",
    pageSize: url.searchParams.get("PageSize") || url.searchParams.get("pageSize") || "20"
  });

  return new Response(JSON.stringify(result), {
    status: result.ok || result.status === "missing_credentials" ? 200 : 502,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store"
    }
  });
}
