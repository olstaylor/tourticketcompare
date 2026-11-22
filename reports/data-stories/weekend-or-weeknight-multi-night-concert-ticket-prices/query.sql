-- Friday/Saturday nights vs other nights of the same multi-night run, listed resale prices.
-- Run read-only against D1 (provider_pricing_daily + event_price_timing_events) on 2026-11-22.
--
-- Run = same artist and city/year (the event_id stem before its trailing hash), shows no more than 3 days apart,
--       2 to 6 nights, US shows only.
-- Reading = one site's last lowest listed price of a UTC day for one show (low_price_last), under $1,000,
--       15 Sep - 21 Nov 2026, at least 14 days before the FIRST night of the run.
-- Only run-days where every night of the run has a reading on that site are used, so each night is
--       compared with the run's own average that day (price level and trend cancel).
-- dev = night's price / run average that day - 1. Night weekday = UTC date of (start - 6 hours), an approximation of the
--       venue-local evening for US shows. Friday/Saturday chosen before looking at results.
-- gap = mean dev of Fri/Sat nights minus mean dev of other nights, per run-day, only runs containing both kinds.
-- Aggregation: mean per artist, then mean across artists; SE = sd(artist means)/sqrt(artists).

WITH us AS (SELECT event_id FROM event_price_timing_events WHERE country IN ('United States','United States Of America','US','USA')),
ev AS (SELECT DISTINCT event_id, artist_slug, event_date, rtrim(event_id,'abcdefghijklmnopqrstuvwxyz0123456789_') k FROM provider_pricing_daily WHERE event_date IS NOT NULL AND event_id IN (SELECT event_id FROM us)),
g AS (SELECT *, CASE WHEN julianday(substr(event_date,1,10)) - LAG(julianday(substr(event_date,1,10))) OVER (PARTITION BY artist_slug,k ORDER BY event_date) > 3 OR LAG(event_date) OVER (PARTITION BY artist_slug,k ORDER BY event_date) IS NULL THEN 1 ELSE 0 END nr FROM ev),
r AS (SELECT *, SUM(nr) OVER (PARTITION BY artist_slug,k ORDER BY event_date) rn FROM g),
rs AS (SELECT artist_slug||'|'||k||'|'||rn rid, event_id, event_date, COUNT(*) OVER (PARTITION BY artist_slug,k,rn) n, ROW_NUMBER() OVER (PARTITION BY artist_slug,k,rn ORDER BY event_date) pos, MIN(event_date) OVER (PARTITION BY artist_slug,k,rn) first_d, artist_slug FROM r),
runs AS (SELECT * FROM rs WHERE n BETWEEN 2 AND 6),
px AS (SELECT p.provider, p.observed_date, p.low_price_last pr, runs.* FROM provider_pricing_daily p JOIN runs ON runs.event_id=p.event_id WHERE p.low_price_last>0 AND p.low_price_last<1000 AND p.observed_date>='2026-09-15' AND p.observed_date<='2026-11-21' AND julianday(substr(runs.first_d,1,10))-julianday(p.observed_date)>=14),
rd AS (SELECT *, AVG(pr) OVER (PARTITION BY rid,provider,observed_date) m, COUNT(*) OVER (PARTITION BY rid,provider,observed_date) c FROM px),
ok AS (SELECT *, pr/m-1 dev, CAST(strftime('%w', datetime(event_date,'-6 hours')) AS INT) wd FROM rd WHERE c=n),
day AS (SELECT artist_slug, rid, provider, observed_date, n,
  AVG(CASE WHEN wd IN (5,6) THEN dev END) wk, AVG(CASE WHEN wd NOT IN (5,6) THEN dev END) mid FROM ok GROUP BY rid,provider,observed_date),
dd AS (SELECT *, wk-mid gap, CASE WHEN observed_date<'2026-10-25' THEN 'sep15-oct24' ELSE 'oct25-nov21' END per FROM day WHERE wk IS NOT NULL AND mid IS NOT NULL),
cuts AS (SELECT 'all' cut, artist_slug, rid, gap FROM dd UNION ALL SELECT provider, artist_slug, rid, gap FROM dd UNION ALL SELECT per, artist_slug, rid, gap FROM dd),
a AS (SELECT cut, artist_slug, COUNT(DISTINCT rid) runs, AVG(gap) ag, COUNT(*) nd FROM cuts GROUP BY cut, artist_slug)
SELECT cut, COUNT(*) artists, SUM(runs) runs, SUM(nd) obs, ROUND(AVG(ag)*100,2) gap_pp,
       ROUND(SQRT(MAX(0,AVG(ag*ag)-AVG(ag)*AVG(ag)))/SQRT(COUNT(*))*100,2) se,
       ROUND(AVG(ag>0)*100,1) share_artists_positive, ROUND(MAX(nd)*100.0/SUM(nd),1) largest_artist_pct
FROM a GROUP BY cut;
-- Extra figures run the same day with the same CTEs: per-artist median 8.54, quartiles 0 and 20.47, 248 shows,
-- mean listed price 193.77. First night vs last night (all runs, no weekday split): -1.3 pp, SE 2.5, 47% of 93 artists above 0.
