import { basicAuthHeader, clean, impactConfig, json, missingCredentialsPayload } from "./_utils.js";

export async function onRequestGet({ request, env }) {
  const config = impactConfig(env);
  if (!config.configured) return json(missingCredentialsPayload("impact-marketplace-products"));

  const url = new URL(request.url);
  const params = new URLSearchParams();
  const query = clean(url.searchParams.get("q") || url.searchParams.get("Keyword"), 120);
  const page = Number.parseInt(url.searchParams.get("Page") || url.searchParams.get("page") || "1", 10);
  const pageSize = Number.parseInt(url.searchParams.get("PageSize") || url.searchParams.get("pageSize") || "20", 10);
  if (query) params.set("Keyword", query);
  params.set("Page", String(Number.isFinite(page) && page > 0 ? page : 1));
  params.set("PageSize", String(Math.max(1, Math.min(100, Number.isFinite(pageSize) ? pageSize : 20))));

  const endpoint = `${config.apiBase}/Mediapartners/${encodeURIComponent(config.accountSid)}/Marketplace/Products?${params.toString()}`;

  try {
    const response = await fetch(endpoint, {
      method: "GET",
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
        source: "impact-marketplace-products",
        httpStatus: response.status,
        message: "impact.com rejected the Marketplace Products request.",
        error: payload?.Message || payload?.message || null
      }, response.status === 401 || response.status === 403 ? 403 : 502);
    }
    const products = Array.isArray(payload?.Results)
      ? payload.Results
      : Array.isArray(payload?.Products)
        ? payload.Products
        : Array.isArray(payload?.MarketplaceProducts)
          ? payload.MarketplaceProducts
          : [];
    return json({
      ok: true,
      status: "connected",
      source: "impact-marketplace-products",
      httpStatus: response.status,
      page: payload?.Page || payload?.["@page"] || null,
      pageSize: payload?.PageSize || payload?.["@pagesize"] || null,
      total: payload?.Total || payload?.["@total"] || null,
      products
    });
  } catch (error) {
    return json({
      ok: false,
      status: "request_failed",
      source: "impact-marketplace-products",
      message: "Unable to reach the impact.com Marketplace Products API from Cloudflare Pages."
    }, 502);
  }
}

