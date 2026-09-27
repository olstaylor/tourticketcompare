// /sitemaps/events.xml — one segment of the sitemap index: the active
// event-indexing pilot only. See functions/sitemap.xml.js.
import { segmentHandler } from "../sitemap.xml.js";

export const onRequestGet = segmentHandler("events");
