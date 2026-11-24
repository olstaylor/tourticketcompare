-- 2027 shows: lowest listed resale price in the first 7 recorded days vs 18-24 Nov 2026, each site vs itself.
-- Run read-only against D1 (provider_pricing_daily) on 2026-11-24. Re-run before publishing.
--
-- Revised after review: USD rows only, and the late window is bounded to 18-24 Nov (change both dates when re-running for 1 Dec, and update the post copy).
-- Series = one site's lowest listed price (low_price_last, UTC day) for one show with event_date >= 2027-01-01, under $1,000.
-- Series qualify when the site's first recorded day is on or before 2026-10-03 (so at least 45 days apart),
--   with >= 3 readings in the first 7 recorded days and >= 3 in 18-24 Nov.
-- chg = (average of 18-24 Nov readings) / (average of first 7 recorded days) - 1. Lower/higher = beyond +/-2%.
WITH s AS (SELECT event_id, artist_slug, provider, MIN(observed_date) fd FROM provider_pricing_daily WHERE event_date>='2027-01-01' AND currency='USD' AND low_price_last>0 AND low_price_last<1000 GROUP BY event_id, provider HAVING MIN(observed_date)<='2026-10-03'),
f AS (SELECT s.event_id, s.artist_slug, s.provider, s.fd, AVG(CASE WHEN p.observed_date<=date(s.fd,'+6 days') THEN p.low_price_last END) a, AVG(CASE WHEN p.observed_date BETWEEN '2026-11-18' AND '2026-11-24' THEN p.low_price_last END) b, SUM(p.observed_date<=date(s.fd,'+6 days')) na, SUM(p.observed_date BETWEEN '2026-11-18' AND '2026-11-24') nb
 FROM s JOIN provider_pricing_daily p ON p.event_id=s.event_id AND p.provider=s.provider AND p.currency='USD' WHERE p.low_price_last>0 AND p.low_price_last<1000 GROUP BY s.event_id, s.provider),
g AS (SELECT *, b/a-1 chg FROM f WHERE na>=3 AND nb>=3)
SELECT provider, COUNT(*) series, COUNT(DISTINCT event_id) shows, COUNT(DISTINCT artist_slug) artists, SUM(chg<-0.02) lower, SUM(chg>0.02) higher, SUM(ABS(chg)<=0.02) same, ROUND(AVG(a),1) avg_first, ROUND(AVG(b),1) avg_last FROM g GROUP BY provider;
-- Per-tour table: the same CTEs grouped by artist_slug (and by artist_slug + provider), median chg via ROW_NUMBER.
-- Tours listed: >= 8 shows, median move of 5% or more, at least two sites with >= 5 shows, every such site the same direction.
