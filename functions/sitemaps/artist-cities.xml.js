// /sitemaps/artist-cities.xml — one segment of the sitemap index. See functions/sitemap.xml.js.
import { segmentHandler } from "../sitemap.xml.js";

export const onRequestGet = segmentHandler("artist-cities");
