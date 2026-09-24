// /sitemap-index.xml — lists the per-type sitemaps under /sitemaps/. This is
// the file robots.txt advertises and the one to submit in Search Console and
// Bing Webmaster Tools. /sitemap.xml still serves every URL in one file.
import { sitemapIndexHandler } from "./sitemap.xml.js";

export const onRequestGet = sitemapIndexHandler;
