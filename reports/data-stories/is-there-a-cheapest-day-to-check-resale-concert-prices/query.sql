-- Weekday effect on listed resale prices. Run read-only against D1 (provider_pricing_daily).
-- Ran 2026-11-21 via the Cloudflare D1 query tool on database 19b314b8-10f1-4504-a3bc-963f7ecbe9f6.
-- To rerun: wrangler d1 execute tourticketcompare-demand --remote --command "<this file>" (needs a Cloudflare token).
--
-- Unit: one site's last lowest listed price of a UTC day for one show (low_price_last).
-- Deviation: that reading divided by the mean of the OTHER readings for the same show and site
-- within +/-3 days, minus 1. A 7-day window contains every weekday once, so weekly position
-- is the only thing that differs and a price trend over the week cancels out.
-- Filters: price < $1,000 (placeholder exclusion, as in the monthly movers); event_date known;
-- window holds >= 5 readings; reading is 15 Sep - 18 Nov 2026 (18 Nov so there are days either
-- side); reading is >= 14 days before the show (keeps the final-week drop out of it).
-- Weekday = UTC day, strftime('%w'): 0 Sun, 1 Mon ... 6 Sat. Captures land ~14:30-15:00 UTC on every weekday.
-- Aggregation: mean deviation per artist per weekday, then mean across artists, SE = sd(artist means)/sqrt(artists).

WITH b AS (
 SELECT event_id, artist_slug, provider, observed_date, event_date,
        CAST(strftime('%w',observed_date) AS INT) wd, low_price_last p, julianday(observed_date) j
 FROM provider_pricing_daily
 WHERE low_price_last>0 AND low_price_last<1000 AND event_date IS NOT NULL),
w AS (
 SELECT *,
  SUM(p)   OVER (PARTITION BY event_id,provider ORDER BY j RANGE BETWEEN 3 PRECEDING AND 3 FOLLOWING) s,
  COUNT(*) OVER (PARTITION BY event_id,provider ORDER BY j RANGE BETWEEN 3 PRECEDING AND 3 FOLLOWING) c
 FROM b),
d AS (
 SELECT artist_slug, provider, wd, event_id, observed_date, (p/((s-p)/(c-1)))-1 dev
 FROM w
 WHERE c>=5 AND observed_date<='2026-11-18' AND observed_date>='2026-09-15'
   AND (julianday(substr(event_date,1,10))-j)>=14),
a AS (SELECT artist_slug, wd, AVG(dev) m, COUNT(*) n, COUNT(DISTINCT event_id) ev FROM d GROUP BY 1,2)
SELECT wd, COUNT(*) artists, SUM(n) obs, SUM(ev) shows,
       ROUND(AVG(m)*100,3) mean_pct,
       ROUND(SQRT(MAX(0,AVG(m*m)-AVG(m)*AVG(m)))/SQRT(COUNT(*))*100,3) se_pct,
       ROUND(AVG(m>0)*100,1) share_artists_above
FROM a GROUP BY 1 ORDER BY 1;

-- Variants run the same day (results in results.json):
--  * contrast: per artist, mean(dev on Mon-Wed) minus mean(dev on Fri-Sat), then mean and SE across artists
--  * by site: same contrast, one site at a time
--  * stability: same weekday table split into 3 periods and WITHOUT the 14-day filter
