// /sitemaps/pages.xml — one segment of the sitemap index. See functions/sitemap.xml.js.
import { segmentHandler } from "../sitemap.xml.js";

export const onRequestGet = segmentHandler("pages");
