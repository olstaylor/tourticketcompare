#!/usr/bin/env python3
"""sync-ticketmaster-events.py — Ticketmaster dry-run event recognition.

Dry-run-only Ticketmaster Discovery event recogniser for artists that have
completed one-time human provider-identity verification in
data/provider-identities.json (see docs/PROVIDER_SYNC.md).

What it does:
  - gates on the registry: the artist must be promoted/indexable,
    Ticketmaster-verified, review_status "verified", sync_enabled true, with
    a populated ticketmaster_attraction_id;
  - queries the TM Discovery API by attraction ID (the same API and no-op
    credential pattern as scripts/apply-tm-updates.mjs / propose-artists.mjs);
  - classifies every recognised event as PROPOSED or WITHHELD using the
    withhold rules below and prints a structured report.

What it never does:
  - write any file (events, registry, public data — nothing);
  - run without --dry-run (write mode does not exist; a future write-to-PR
    mode is a separate, explicitly gated PR — docs/PROVIDER_SYNC.md);
  - call any API without TICKETMASTER_API_KEY (without it the live lookup is
    skipped with a clear message and only the offline eligibility report is
    printed — mirroring the apply-tm-updates.mjs no-op pattern);
  - scrape provider HTML, or surface prices/availability claims.

Withhold rules (a row failing any rule is WITHHELD for human review):
  past event; cancelled/postponed/non-onsale status; missing venue; missing
  city/country; missing or date-only datetime; URL host not in the existing
  functions/api/out.js Ticketmaster allowlist (parsed read-only — never
  expanded here); placeholder URL; likely travel/hotel/package/parking
  listing; duplicate of an existing events.json row (by TM discovery or
  storefront event id, or by venue + venue-local date — city is excluded
  because sources disagree on it for the same venue); duplicate venue/date
  within the fetched batch; event
  attraction list does not include the registry's verified attraction ID; the
  registry attraction is not the event's primary attraction (support-act and
  festival-lineup appearances are withheld).

Usage:
  python3 scripts/sync-ticketmaster-events.py --artist raye --dry-run
  python3 scripts/sync-ticketmaster-events.py --all-approved --dry-run
  python3 scripts/sync-ticketmaster-events.py --artist raye --dry-run --json
  python3 scripts/sync-ticketmaster-events.py --self-test

Environment:
  TICKETMASTER_API_KEY               required for the live lookup (also read
                                     from .dev.vars / .env like propose-artists)
  TICKETMASTER_DISCOVERY_BASE_URL    optional override of the Discovery base
  TM_REQUEST_TIMEOUT_MS              optional request timeout (default 15000)
"""

import argparse
import json
import os
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path
from zoneinfo import ZoneInfo

ROOT = Path(__file__).resolve().parent.parent
REGISTRY_PATH = ROOT / "data" / "provider-identities.json"
ARTISTS_PATH = ROOT / "public" / "data" / "artists.json"
EVENTS_PATH = ROOT / "public" / "data" / "events.json"
TOMBSTONES_PATH = ROOT / "data" / "deleted-events.json"
OUT_JS_PATH = ROOT / "functions" / "api" / "out.js"

DEFAULT_DISCOVERY_BASE = "https://app.ticketmaster.com/discovery/v2"
USER_AGENT = "TourTicketCompareProviderSync/1.0 (+https://tourticketcompare.com)"
MAX_EVENTS_PER_PAGE = 100

# Status codes from dates.status.code that may be proposed. Anything else
# (cancelled, postponed, rescheduled, offsale, ...) is withheld.
PROPOSABLE_STATUS_CODES = {"onsale", ""}

# Travel/hospitality upsell markers checked against event name and URL.
TRAVEL_PACKAGE_MARKERS = ("travel", "hotel", "package", "parking", "shuttle", "hospitality")

PLACEHOLDER_MARKERS = ("localhost", "example.com", "placeholder", "replace-me", "tbd")
AFFILIATE_WRAPPER_HOSTS = {"ticketmaster.evyy.net"}


def load_json(path):
    try:
        with open(path, encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"ERROR: missing required file: {path}", file=sys.stderr)
        sys.exit(1)
    except json.JSONDecodeError as exc:
        print(f"ERROR: invalid JSON in {path}: {exc}", file=sys.stderr)
        sys.exit(1)


def ticketmaster_allowed_hosts(out_js_text):
    """Parse PROVIDERS.ticketmaster.allowedDestinationHosts from out.js text.

    out.js stays the single source of truth; this is read-only and mirrors
    scripts/validate-provider-identities.mjs. Returns a list or None.
    """
    tm_pos = out_js_text.find("ticketmaster:")
    if tm_pos == -1:
        return None
    list_pos = out_js_text.find("allowedDestinationHosts", tm_pos)
    if list_pos == -1:
        return None
    open_pos = out_js_text.find("[", list_pos)
    close_pos = out_js_text.find("]", open_pos)
    if open_pos == -1 or close_pos == -1:
        return None
    hosts = re.findall(r"[\"']([^\"'\r\n]+)[\"']", out_js_text[open_pos:close_pos])
    return hosts or None


def host_allowed(hostname, allowed_hosts):
    h = (hostname or "").lower()
    return any(h == allowed or h.endswith(f".{allowed}") for allowed in allowed_hosts)


def is_affiliate_wrapper_host(hostname):
    return (hostname or "").lower() in AFFILIATE_WRAPPER_HOSTS


def resolve_ticketmaster_url(raw_url):
    """Return raw/resolved host metadata for direct TM URLs and known wrappers.

    ticketmaster.evyy.net is an Impact affiliate wrapper, not a storefront. The
    recogniser may inspect its u= destination for dry-run classification, but
    the wrapper itself is never treated as a usable production URL.
    """
    raw = (raw_url or "").strip()
    if not raw:
        return {
            "raw_url_host": "",
            "resolved_url": "",
            "resolved_url_host": "",
            "url_resolution_status": "missing_url",
            "parsed": None,
        }
    try:
        parsed = urllib.parse.urlparse(raw)
    except ValueError:
        return {
            "raw_url_host": "",
            "resolved_url": "",
            "resolved_url_host": "",
            "url_resolution_status": "malformed_raw_url",
            "parsed": None,
        }
    raw_host = (parsed.hostname or "").lower()
    if not raw_host:
        return {
            "raw_url_host": "",
            "resolved_url": "",
            "resolved_url_host": "",
            "url_resolution_status": "malformed_raw_url",
            "parsed": None,
        }
    if not is_affiliate_wrapper_host(raw_host):
        return {
            "raw_url_host": raw_host,
            "resolved_url": raw,
            "resolved_url_host": raw_host,
            "url_resolution_status": "direct",
            "parsed": parsed,
        }

    query = urllib.parse.parse_qs(parsed.query, keep_blank_values=True)
    destinations = [v.strip() for v in query.get("u", []) if v and v.strip()]
    if not destinations:
        return {
            "raw_url_host": raw_host,
            "resolved_url": "",
            "resolved_url_host": "",
            "url_resolution_status": "wrapper_missing_u",
            "parsed": None,
        }
    destination = destinations[0]
    try:
        resolved = urllib.parse.urlparse(destination)
    except ValueError:
        return {
            "raw_url_host": raw_host,
            "resolved_url": destination,
            "resolved_url_host": "",
            "url_resolution_status": "wrapper_malformed_destination",
            "parsed": None,
        }
    resolved_host = (resolved.hostname or "").lower()
    if not resolved.scheme or not resolved_host:
        return {
            "raw_url_host": raw_host,
            "resolved_url": destination,
            "resolved_url_host": resolved_host,
            "url_resolution_status": "wrapper_malformed_destination",
            "parsed": resolved,
        }
    return {
        "raw_url_host": raw_host,
        "resolved_url": destination,
        "resolved_url_host": resolved_host,
        "url_resolution_status": "wrapper_resolved",
        "parsed": resolved,
    }


def storefront_event_id_from_url(parsed_url):
    """Identifying storefront id from a Ticketmaster event URL.

    Two storefront URL shapes exist and the id sits in a different place:

      North America  /jayz-30-bronx-new-york-07-10-2026/event/1D006473D78CFDB8
                     -> the segment after /event/ IS the id.
      International  /event/gracie-abrams-the-look-at-my-life-tour-tickets/656488658
                     (ticketmaster.de/.nl/.es/.be/...) -> the segment after
                     /event/ is an event-NAME slug shared by every date on the
                     tour; the identifying id is the trailing number.

    Taking the segment after /event/ unconditionally gave all nine Gracie Abrams
    continental-European dates the same id, and all six Niall Horan ones. Since
    showIdentity/mergeShows key on ticketmaster_event_id, those distinct dates
    collapsed into a single show.
    """
    if not parsed_url:
        return ""
    path_parts = [urllib.parse.unquote(part) for part in (parsed_url.path or "").split("/") if part]
    for idx, part in enumerate(path_parts[:-1]):
        if part.lower() != "event":
            continue
        candidate = path_parts[idx + 1].strip()
        if not candidate:
            continue
        # A non-numeric segment followed by a purely numeric one is the
        # international <slug>/<numeric-id> shape. North American ids are
        # alphanumeric and carry no trailing numeric segment.
        if not candidate.isdigit() and idx + 2 < len(path_parts):
            trailing = path_parts[idx + 2].strip()
            if trailing.isdigit():
                return trailing
        return candidate
    return ""


def read_api_key():
    """TICKETMASTER_API_KEY from env, then .dev.vars / .env (propose-artists pattern)."""
    key = (os.environ.get("TICKETMASTER_API_KEY") or "").strip()
    if key:
        return key
    for name in (".dev.vars", ".env"):
        path = ROOT / name
        if not path.is_file():
            continue
        for line in path.read_text(encoding="utf-8").splitlines():
            m = re.match(r"^\s*TICKETMASTER_API_KEY\s*=\s*\"?([^\"#\s]+)\"?\s*$", line)
            if m:
                return m.group(1).strip()
    return ""


def eligibility(entry, artist):
    """Return (eligible, reasons) for a registry entry against artists.json."""
    reasons = []
    if artist is None:
        reasons.append("slug not present in public/data/artists.json")
        return False, reasons
    if artist.get("indexing_status") != "indexable_with_substantial_content":
        reasons.append(f"indexing_status is {artist.get('indexing_status')!r} (must be indexable)")
    if "ticketmaster" not in (artist.get("verified_providers") or []):
        reasons.append("artist has no verified ticketmaster provider")
    if not entry.get("sync_enabled"):
        reasons.append("sync_enabled is false in data/provider-identities.json")
    if entry.get("review_status") != "verified":
        reasons.append(f"review_status is {entry.get('review_status')!r} (must be 'verified')")
    if not entry.get("ticketmaster_attraction_id"):
        reasons.append("ticketmaster_attraction_id is not populated (one-time human verification required)")
    return not reasons, reasons


# ─── Withhold classification (pure; covered by --self-test) ─────────────────


def parse_event_datetime(tm_event):
    """Return (datetime_iso, has_exact_time)."""
    start = (tm_event.get("dates") or {}).get("start") or {}
    date_time = (start.get("dateTime") or "").strip()
    local_date = (start.get("localDate") or "").strip()
    if date_time:
        return date_time, True
    return local_date, False


def venue_date_key(venue_name, local_date):
    """Duplicate-detection key: normalized venue + venue-local date.

    City is deliberately excluded — TM storefronts and the Discovery API
    disagree on it for the same venue (Milano/Milan, Stockholm/Solna for
    Strawberry Arena, Greenwich/London for The O2), which previously let
    re-ingested events past the duplicate check. Both parts must be present
    for a usable key; returns "" otherwise.
    """
    venue = re.sub(r"\s+", " ", str(venue_name or "").strip().lower())
    date = str(local_date or "").strip()[:10]
    if not venue or not date:
        return ""
    return f"{venue}|{date}"


def event_local_date(datetime_iso, tz_name=""):
    """Venue-local calendar date (YYYY-MM-DD) for an events.json row.

    Naive datetimes are legacy rows that already store venue-local time, so
    their date part is used as-is. UTC/offset datetimes are converted with the
    row's IANA timezone when available; without one the UTC date is the best
    available approximation (evening shows in the Americas can otherwise
    slip past midnight UTC into the next date).
    """
    value = str(datetime_iso or "").strip()
    if not value:
        return ""
    has_offset = value.endswith("Z") or bool(re.search(r"[+-]\d{2}:\d{2}$", value))
    if has_offset and tz_name:
        try:
            parsed = datetime.fromisoformat(value.replace("Z", "+00:00"))
            return parsed.astimezone(ZoneInfo(tz_name)).strftime("%Y-%m-%d")
        except (ValueError, KeyError, OSError):
            pass
    return value[:10]


def parse_tombstones(data):
    """Turn a loaded tombstone registry into per-slug dedup sets (pure; no I/O).

    Returns {slug: {"ids": frozenset(...), "venue_keys": frozenset(...)}}, where
    ids/venue_keys mirror exactly how existing events.json rows are indexed for
    dedup (uppercased Ticketmaster ids; normalized venue|local-date keys). A
    candidate whose id OR venue/date matches a tombstone is withheld, so an
    owner-deleted row that Ticketmaster still lists is never re-proposed.
    """
    def as_str(value):
        # Ignore structurally malformed (non-string) fields rather than crash on
        # .strip(): a bad registry edit (e.g. a numeric artist_slug) must fail
        # open, never abort the scheduled discovery run.
        return value.strip() if isinstance(value, str) else ""

    entries = data.get("deleted_events") if isinstance(data, dict) else None
    if not isinstance(entries, list):
        entries = []
    by_slug = {}
    for entry in entries:
        if not isinstance(entry, dict):
            continue
        try:
            slug = as_str(entry.get("artist_slug"))
            if not slug:
                continue
            bucket = by_slug.setdefault(slug, {"ids": set(), "venue_keys": set()})
            for id_value in (entry.get("ticketmaster_discovery_event_id"),
                             entry.get("ticketmaster_event_id")):
                id_value = as_str(id_value)
                if id_value:
                    bucket["ids"].add(id_value.upper())
            local_date = as_str(entry.get("local_date")) or event_local_date(
                entry.get("datetime_iso"), as_str(entry.get("timezone"))
            )
            key = venue_date_key(entry.get("venue"), local_date)
            if key:
                bucket["venue_keys"].add(key)
        except Exception:
            # A single malformed entry is skipped, never fatal (fail-open).
            continue
    return {
        slug: {"ids": frozenset(b["ids"]), "venue_keys": frozenset(b["venue_keys"])}
        for slug, b in by_slug.items()
    }


def load_tombstones(path=TOMBSTONES_PATH):
    """Load the tombstone registry (data/deleted-events.json) into per-slug sets.

    Fails open on a missing/malformed file: an empty registry simply means
    nothing extra is withheld — it can never widen what gets proposed.
    """
    if not path.exists():
        return {}
    try:
        return parse_tombstones(load_json(path))
    except Exception:
        return {}


def classify_event(tm_event, *, attraction_id, allowed_hosts, existing_event_ids,
                   existing_venue_keys, batch_venue_keys, now_iso,
                   tombstoned_event_ids=frozenset(), tombstoned_venue_keys=frozenset()):
    """Classify one TM Discovery event row. Returns a report row dict.

    Pure function: no I/O, no network. A row with any withhold reason is
    WITHHELD for human review; otherwise it is PROPOSED (report-only — nothing
    is written in dry-run, and no other mode exists).
    """
    reasons = []
    venue = ((tm_event.get("_embedded") or {}).get("venues") or [{}])[0]
    venue_name = (venue.get("name") or "").strip()
    city = ((venue.get("city") or {}).get("name") or "").strip()
    country = ((venue.get("country") or {}).get("name") or "").strip()
    event_name = (tm_event.get("name") or "").strip()
    event_id = (tm_event.get("id") or "").strip()
    url = (tm_event.get("url") or "").strip()
    status_code = (((tm_event.get("dates") or {}).get("status") or {}).get("code") or "").strip().lower()
    timezone = (((tm_event.get("dates") or {}).get("timezone")) or "").strip()
    datetime_iso, has_exact_time = parse_event_datetime(tm_event)

    if not datetime_iso:
        reasons.append("missing datetime")
    elif not has_exact_time:
        reasons.append("date-only datetime (no exact start time)")
    if datetime_iso and datetime_iso[:10] < now_iso[:10]:
        reasons.append("past event")
    if status_code not in PROPOSABLE_STATUS_CODES:
        reasons.append(f"status is '{status_code}' (not onsale)")
    if not venue_name:
        reasons.append("missing venue")
    if not city:
        reasons.append("missing city")
    if not country:
        reasons.append("missing country")

    resolution = resolve_ticketmaster_url(url)
    raw_url_host = resolution["raw_url_host"]
    resolved_url = resolution["resolved_url"]
    resolved_url_host = resolution["resolved_url_host"]
    url_resolution_status = resolution["url_resolution_status"]
    resolved_parsed = resolution["parsed"]
    resolved_url_host_allowed = False
    storefront_event_id = ""
    if url_resolution_status == "missing_url":
        reasons.append("missing ticketmaster url")
    elif url_resolution_status == "malformed_raw_url":
        reasons.append("malformed ticketmaster url")
    elif url_resolution_status == "wrapper_missing_u":
        reasons.append("ticketmaster.evyy.net wrapper has no u= destination")
    elif url_resolution_status == "wrapper_malformed_destination":
        reasons.append("ticketmaster.evyy.net wrapper u= destination is malformed")

    if resolved_parsed:
        if resolved_parsed.scheme.lower() != "https":
            reasons.append("resolved ticketmaster url is not HTTPS")
        resolved_url_host_allowed = bool(resolved_url_host) and host_allowed(resolved_url_host, allowed_hosts)
        if not resolved_url_host_allowed:
            reasons.append(
                f"resolved url host '{resolved_url_host or 'unparseable'}' not in the out.js Ticketmaster allowlist"
            )
        storefront_event_id = storefront_event_id_from_url(resolved_parsed)
        if not storefront_event_id:
            reasons.append("resolved Ticketmaster storefront URL is missing an /event/<id> path")

    if is_affiliate_wrapper_host(resolved_url_host):
        reasons.append("resolved destination is still the ticketmaster.evyy.net wrapper, not a storefront")

    lowered = f"{url} {resolved_url}".lower()
    if any(marker in lowered for marker in PLACEHOLDER_MARKERS):
        reasons.append("url looks like a placeholder")

    haystack = f"{event_name} {url} {resolved_url}".lower()
    travel_hits = [m for m in TRAVEL_PACKAGE_MARKERS if m in haystack]
    if travel_hits:
        reasons.append(f"likely travel/upsell package listing (matched: {', '.join(travel_hits)})")

    event_attraction_ids = [
        (a.get("id") or "").strip()
        for a in ((tm_event.get("_embedded") or {}).get("attractions") or [])
    ]
    if attraction_id not in event_attraction_ids:
        reasons.append(
            "event attractions do not include the registry's verified attraction ID (weak/mismatched identity)"
        )
    elif event_attraction_ids[0] != attraction_id:
        reasons.append(
            "registry attraction is not the event's primary attraction (support act / festival lineup appearance)"
        )

    duplicate_ids = {event_id.upper()} if event_id else set()
    if storefront_event_id:
        duplicate_ids.add(storefront_event_id.upper())
    if duplicate_ids & existing_event_ids:
        reasons.append("duplicate of an existing events.json row (same ticketmaster event id)")
    elif duplicate_ids & tombstoned_event_ids:
        reasons.append("matches a tombstoned (owner-deleted) events.json row (same ticketmaster event id) — not re-proposed")
    # Discovery's localDate is the venue-local calendar date; fall back to
    # deriving it from the datetime + event timezone for defensive coverage.
    start_local_date = ((tm_event.get("dates") or {}).get("start") or {}).get("localDate") or ""
    local_date = str(start_local_date).strip() or event_local_date(datetime_iso, timezone)
    venue_key = venue_date_key(venue_name, local_date)
    if venue_key:
        if venue_key in existing_venue_keys:
            reasons.append("duplicate of an existing events.json row (same venue/date)")
        elif venue_key in tombstoned_venue_keys:
            reasons.append("matches a tombstoned (owner-deleted) events.json row (same venue/date) — not re-proposed")
        elif venue_key in batch_venue_keys:
            reasons.append("duplicate venue/date within this fetched batch")
        else:
            batch_venue_keys.add(venue_key)

    return {
        "ticketmaster_discovery_event_id": event_id,
        "ticketmaster_event_id": storefront_event_id,
        "event_id": event_id,
        "event_name": event_name,
        "datetime_iso": datetime_iso,
        "timezone": timezone,
        "venue": venue_name,
        "city": city,
        "country": country,
        # The resolved storefront URL a downstream write-to-PR step would
        # publish (direct URL as-is, or the unwrapped affiliate destination).
        # Empty when the URL is missing/malformed — such rows are withheld.
        "ticketmaster_url": resolved_url,
        "raw_url_host": raw_url_host,
        "resolved_url_host": resolved_url_host,
        "url_resolution_status": url_resolution_status,
        "url_host": resolved_url_host,
        "url_host_allowed": resolved_url_host_allowed,
        "status_code": status_code or "(none)",
        "disposition": "withheld" if reasons else "proposed",
        "withheld_reasons": reasons,
    }


# ─── Live Discovery lookup ───────────────────────────────────────────────────


def fetch_discovery_events(api_key, base, attraction_id, timeout_ms):
    """Single-page upcoming-events query by attraction ID (propose-artists
    pattern; a totalElements warning covers anything beyond one page)."""
    start = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    query = urllib.parse.urlencode(
        {
            "apikey": api_key,
            "attractionId": attraction_id,
            "size": MAX_EVENTS_PER_PAGE,
            "sort": "date,asc",
            "startDateTime": start,
        }
    )
    url = f"{base}/events.json?{query}"
    request = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    try:
        with urllib.request.urlopen(request, timeout=timeout_ms / 1000) as response:
            data = json.load(response)
    except urllib.error.HTTPError as exc:
        return None, f"Discovery API returned HTTP {exc.code}"
    except (urllib.error.URLError, TimeoutError, json.JSONDecodeError, OSError) as exc:
        return None, f"Discovery API request failed: {exc}"
    events = ((data.get("_embedded") or {}).get("events")) or []
    total = ((data.get("page") or {}).get("totalElements")) or len(events)
    warning = None
    if total > len(events):
        warning = (
            f"Ticketmaster reports {total} upcoming events but only {len(events)} were fetched "
            "(single-page dry-run fetch)."
        )
    return events, warning


# ─── Reporting ───────────────────────────────────────────────────────────────


def build_artist_report(entry, artist, events_by_slug, allowed_hosts, api_key, base, timeout_ms,
                        tombstones_by_slug=None):
    slug = entry["slug"]
    tombstones_by_slug = tombstones_by_slug or {}
    tombstone = tombstones_by_slug.get(slug, {})
    tombstoned_event_ids = tombstone.get("ids", frozenset())
    tombstoned_venue_keys = tombstone.get("venue_keys", frozenset())
    ok, reasons = eligibility(entry, artist)
    report = {
        "artist_slug": slug,
        "eligible": ok,
        "eligibility_blockers": reasons,
        "attraction_id": entry.get("ticketmaster_attraction_id"),
        "ticketmaster_artist_url": entry.get("ticketmaster_artist_url"),
        "existing_events_in_repo": len(events_by_slug.get(slug, [])),
        "tombstones_in_repo": len(tombstoned_event_ids) + len(tombstoned_venue_keys),
        "live_lookup": "skipped",
        "recognised": 0,
        "proposed": 0,
        "withheld": 0,
        "withheld_reason_counts": {},
        "warnings": [],
        "rows": [],
    }
    if not ok:
        return report
    if not api_key:
        report["warnings"].append(
            "TICKETMASTER_API_KEY not set; live Discovery lookup skipped (eligibility report only)."
        )
        return report

    tm_events, fetch_warning = fetch_discovery_events(
        api_key, base, entry["ticketmaster_attraction_id"], timeout_ms
    )
    if tm_events is None:
        report["live_lookup"] = "failed"
        report["warnings"].append(f"{fetch_warning} No files were written.")
        return report
    report["live_lookup"] = "ok"
    if fetch_warning:
        report["warnings"].append(fetch_warning)

    existing = events_by_slug.get(slug, [])
    existing_event_ids = set()
    for e in existing:
        # Index both id systems: rows created before the split-ID model carry
        # only ticketmaster_event_id (a storefront id or intl URL slug), and a
        # discovery id never equals a storefront id — indexing only one of
        # them let Discovery re-ingest events that were already in the file.
        for id_value in (e.get("ticketmaster_discovery_event_id"), e.get("ticketmaster_event_id")):
            id_value = (id_value or "").strip()
            if id_value:
                existing_event_ids.add(id_value.upper())
    existing_venue_keys = set()
    for e in existing:
        local_date = event_local_date(e.get("datetime_iso"), (e.get("timezone") or "").strip())
        key = venue_date_key(e.get("venue"), local_date)
        if key:
            existing_venue_keys.add(key)
    batch_venue_keys = set()
    now_iso = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")

    for tm_event in tm_events:
        row = classify_event(
            tm_event,
            attraction_id=entry["ticketmaster_attraction_id"],
            allowed_hosts=allowed_hosts,
            existing_event_ids=existing_event_ids,
            existing_venue_keys=existing_venue_keys,
            batch_venue_keys=batch_venue_keys,
            now_iso=now_iso,
            tombstoned_event_ids=tombstoned_event_ids,
            tombstoned_venue_keys=tombstoned_venue_keys,
        )
        report["rows"].append(row)

    report["recognised"] = len(report["rows"])
    report["proposed"] = sum(1 for r in report["rows"] if r["disposition"] == "proposed")
    report["withheld"] = report["recognised"] - report["proposed"]
    for row in report["rows"]:
        for reason in row["withheld_reasons"]:
            report["withheld_reason_counts"][reason] = report["withheld_reason_counts"].get(reason, 0) + 1
    return report


def print_human_report(report):
    print(f"[{report['artist_slug']}] attraction_id={report['attraction_id']}")
    print(f"  existing events in events.json: {report['existing_events_in_repo']}")
    if report.get("tombstones_in_repo"):
        print(f"  tombstoned (owner-deleted) keys guarded: {report['tombstones_in_repo']}")
    if not report["eligible"]:
        print("  NOT ELIGIBLE for sync:")
        for reason in report["eligibility_blockers"]:
            print(f"    blocked: {reason}")
        print()
        return
    print(f"  live lookup: {report['live_lookup']}")
    for warning in report["warnings"]:
        print(f"  NOTE: {warning}")
    if report["live_lookup"] != "ok":
        print()
        return
    print(
        f"  recognised: {report['recognised']}  proposed: {report['proposed']}  withheld: {report['withheld']}"
    )
    if report["withheld_reason_counts"]:
        print("  withheld reasons:")
        for reason, count in sorted(report["withheld_reason_counts"].items(), key=lambda kv: -kv[1]):
            print(f"    {count}x {reason}")
    for row in report["rows"]:
        marker = "PROPOSE " if row["disposition"] == "proposed" else "WITHHOLD"
        print(
            f"  {marker} {row['event_id'] or '(no id)'}  {row['datetime_iso'] or '(no date)'}  "
            f"{row['event_name'] or '(no name)'}"
        )
        print(
            f"           venue: {row['venue'] or '(missing)'} — {row['city'] or '(missing)'}, "
            f"{row['country'] or '(missing)'}  status: {row['status_code']}"
        )
        print(
            f"           raw url host: {row['raw_url_host'] or '(missing)'}  "
            f"resolved url host: {row['resolved_url_host'] or '(missing)'}  "
            f"resolution: {row['url_resolution_status']}"
        )
        print(
            f"           resolved allowlisted: {'yes' if row['url_host_allowed'] else 'NO'}  "
            f"storefront id: {row['ticketmaster_event_id'] or '(missing)'}  "
            f"discovery id: {row['ticketmaster_discovery_event_id'] or '(missing)'}"
        )
        for reason in row["withheld_reasons"]:
            print(f"           withheld: {reason}")
    print()


# ─── Self-test (offline; guards the dry-run-only contract) ──────────────────


def self_test():
    allowed_hosts = ticketmaster_allowed_hosts(OUT_JS_PATH.read_text(encoding="utf-8"))
    failures = []

    def check(name, condition):
        print(("PASS" if condition else "FAIL") + f": {name}")
        if not condition:
            failures.append(name)

    check("out.js Ticketmaster allowlist parses", bool(allowed_hosts) and "ticketmaster.com" in allowed_hosts)
    check("subdomain of allowlisted host passes", host_allowed("www.ticketmaster.com", ["ticketmaster.com"]))
    check("non-allowlisted host fails", not host_allowed("www.ticketmaster.com.mx", ["ticketmaster.com"]))
    check(
        "affiliate host ticketmaster.evyy.net is blocked (subdomain of evyy.net, not ticketmaster.com)",
        not host_allowed("ticketmaster.evyy.net", allowed_hosts),
    )
    check(
        "deceptive host containing 'ticketmaster' is blocked",
        not host_allowed("ticketmaster.evil.example", allowed_hosts),
    )

    def make_event(**overrides):
        event = {
            "id": "VV001",
            "name": "RAYE",
            "url": "https://www.ticketmaster.com/raye-london-06-01-2027/event/VV001",
            "dates": {"start": {"dateTime": "2027-06-01T19:00:00Z"}, "status": {"code": "onsale"}},
            "_embedded": {
                "venues": [
                    {
                        "name": "The O2",
                        "city": {"name": "London"},
                        "country": {"name": "United Kingdom"},
                    }
                ],
                "attractions": [{"id": "K8vZ917Kvt7"}],
            },
        }
        event.update(overrides)
        return event

    def classify(event, batch=None, existing_ids=None, existing_keys=None,
                 tomb_ids=None, tomb_keys=None):
        return classify_event(
            event,
            attraction_id="K8vZ917Kvt7",
            allowed_hosts=allowed_hosts,
            existing_event_ids=existing_ids or set(),
            existing_venue_keys=existing_keys or set(),
            batch_venue_keys=batch if batch is not None else set(),
            now_iso="2026-06-10T00:00:00Z",
            tombstoned_event_ids=frozenset(tomb_ids or ()),
            tombstoned_venue_keys=frozenset(tomb_keys or ()),
        )

    check("clean future event is proposed", classify(make_event())["disposition"] == "proposed")
    check(
        "past event withheld",
        "past event" in classify(make_event(dates={"start": {"dateTime": "2025-01-01T19:00:00Z"},
                                                   "status": {"code": "onsale"}}))["withheld_reasons"],
    )
    check(
        "cancelled status withheld",
        any("not onsale" in r for r in classify(
            make_event(dates={"start": {"dateTime": "2027-06-01T19:00:00Z"}, "status": {"code": "cancelled"}})
        )["withheld_reasons"]),
    )
    check(
        "date-only datetime withheld",
        any("date-only" in r for r in classify(
            make_event(dates={"start": {"localDate": "2027-06-01"}, "status": {"code": "onsale"}})
        )["withheld_reasons"]),
    )
    no_venue = make_event()
    no_venue["_embedded"]["venues"] = [{"city": {"name": "London"}, "country": {"name": "United Kingdom"}}]
    check("missing venue withheld", "missing venue" in classify(no_venue)["withheld_reasons"])
    no_city = make_event()
    no_city["_embedded"]["venues"] = [{"name": "The O2", "country": {"name": "United Kingdom"}}]
    check("missing city withheld", "missing city" in classify(no_city)["withheld_reasons"])
    check(
        "non-allowlisted host withheld",
        any("not in the out.js" in r for r in classify(
            make_event(url="https://www.ticketmaster.com.mx/raye/event/VV001")
        )["withheld_reasons"]),
    )
    wrapped_ok = classify(
        make_event(url="https://ticketmaster.evyy.net/c/1/2/3?u=https%3A%2F%2Fwww.ticketmaster.com%2Fevent%2FVV001")
    )
    check(
        "affiliate-wrapped ticketmaster.evyy.net event url is proposed only after safe unwrap",
        wrapped_ok["disposition"] == "proposed"
        and wrapped_ok["raw_url_host"] == "ticketmaster.evyy.net"
        and wrapped_ok["resolved_url_host"] == "www.ticketmaster.com"
        and wrapped_ok["url_resolution_status"] == "wrapper_resolved"
        and wrapped_ok["ticketmaster_event_id"] == "VV001",
    )
    # International storefronts put the identifying id in the LAST path segment:
    # /event/<event-name-slug>/<numeric-id>. Taking the segment after /event/
    # gave every date on a tour the same id (9 Gracie Abrams + 6 Niall Horan
    # rows collided), and showIdentity/mergeShows then collapsed them into one
    # show. Regression 2026-07-30.
    def _sid(u):
        return storefront_event_id_from_url(urllib.parse.urlparse(u))

    check(
        "north american /<slug>/event/<ID> keeps the segment after /event/",
        _sid("https://www.ticketmaster.com/jayz-30-bronx-07-10-2026/event/1D006473D78CFDB8") == "1D006473D78CFDB8",
    )
    check(
        "international /event/<slug>/<numeric-id> uses the trailing number",
        _sid("https://www.ticketmaster.nl/event/niall-horan-dinner-party-live-on-tour-tickets/17511398") == "17511398",
    )
    check(
        "two dates sharing an international slug get distinct ids",
        _sid("https://www.ticketmaster.be/event/gracie-abrams-the-look-at-my-life-tour-tickets/656488658")
        != _sid("https://www.ticketmaster.be/event/gracie-abrams-the-look-at-my-life-tour-tickets/574814255"),
    )
    check(
        "short-form /event/<ID> with no trailing segment is unchanged",
        _sid("https://www.ticketmaster.com/event/1D006473D78CFDB8") == "1D006473D78CFDB8",
    )
    check(
        "a trailing NON-numeric segment never displaces the id",
        _sid("https://www.ticketmaster.com/event/1D006473D78CFDB8/tickets") == "1D006473D78CFDB8",
    )
    check(
        "affiliate wrapper with no u= destination withheld",
        any("no u=" in r for r in classify(
            make_event(url="https://ticketmaster.evyy.net/c/1/2/3")
        )["withheld_reasons"]),
    )
    check(
        "affiliate wrapper with non-HTTPS destination withheld",
        any("not HTTPS" in r for r in classify(
            make_event(url="https://ticketmaster.evyy.net/c/1/2/3?u=http%3A%2F%2Fwww.ticketmaster.com%2Fevent%2FVV001")
        )["withheld_reasons"]),
    )
    check(
        "affiliate wrapper with non-allowlisted destination withheld",
        any("not in the out.js" in r for r in classify(
            make_event(url="https://ticketmaster.evyy.net/c/1/2/3?u=https%3A%2F%2Fwww.ticketmaster.com.mx%2Fevent%2FVV001")
        )["withheld_reasons"]),
    )
    check(
        "deceptive unwrapped destination withheld",
        any("not in the out.js" in r for r in classify(
            make_event(url="https://ticketmaster.evyy.net/c/1/2/3?u=https%3A%2F%2Fwww.ticketmaster.com.evil.example%2Fevent%2FVV001")
        )["withheld_reasons"]),
    )
    check(
        "travel package withheld",
        any("travel/upsell" in r for r in classify(
            make_event(name="RAYE Hotel + Ticket Travel Package")
        )["withheld_reasons"]),
    )
    wrong_attraction = make_event()
    wrong_attraction["_embedded"]["attractions"] = [{"id": "K8vZsomeoneelse"}]
    check(
        "mismatched attraction identity withheld",
        any("weak/mismatched" in r for r in classify(wrong_attraction)["withheld_reasons"]),
    )
    support_act = make_event()
    support_act["_embedded"]["attractions"] = [{"id": "K8vZheadliner"}, {"id": "K8vZ917Kvt7"}]
    check(
        "support-act / lineup appearance withheld",
        any("not the event's primary attraction" in r for r in classify(support_act)["withheld_reasons"]),
    )
    check(
        "duplicate of existing events.json Discovery id withheld",
        any("same ticketmaster event id" in r for r in classify(
            make_event(), existing_ids={"VV001"}
        )["withheld_reasons"]),
    )
    check(
        "duplicate of existing legacy storefront id withheld (pre-split-ID row)",
        any("same ticketmaster event id" in r for r in classify(
            make_event(
                id="VVNEW",
                url="https://www.ticketmaster.com/raye-london-06-01-2027/event/LEGACY123",
            ),
            existing_ids={"LEGACY123"},
        )["withheld_reasons"]),
    )
    check(
        "duplicate existing venue/date withheld",
        any("same venue/date" in r for r in classify(
            make_event(id="VV002"), existing_keys={"the o2|2027-06-01"}
        )["withheld_reasons"]),
    )
    check(
        "venue/date duplicate caught despite city naming variance",
        any("same venue/date" in r for r in classify(
            make_event(
                id="VV004",
                _embedded={
                    "venues": [
                        {
                            "name": "The  O2",
                            "city": {"name": "Greenwich"},
                            "country": {"name": "United Kingdom"},
                        }
                    ],
                    "attractions": [{"id": "K8vZ917Kvt7"}],
                },
            ),
            existing_keys={"the o2|2027-06-01"},
        )["withheld_reasons"]),
    )
    batch = set()
    classify(make_event(), batch=batch)
    check(
        "duplicate within batch withheld",
        any("within this fetched batch" in r for r in classify(make_event(id="VV003"), batch=batch)["withheld_reasons"]),
    )
    check(
        "tombstoned (owner-deleted) event id withheld — not re-proposed",
        any("tombstoned" in r and "same ticketmaster event id" in r
            for r in classify(make_event(), tomb_ids={"VV001"})["withheld_reasons"]),
    )
    check(
        "tombstoned (owner-deleted) venue/date withheld — not re-proposed",
        any("tombstoned" in r and "same venue/date" in r
            for r in classify(make_event(id="VV005"), tomb_keys={"the o2|2027-06-01"})["withheld_reasons"]),
    )
    check(
        "unrelated tombstone does not over-withhold a clean event",
        classify(make_event(), tomb_ids={"OTHER999"}, tomb_keys={"somewhere else|2099-01-01"})["disposition"] == "proposed",
    )
    parsed = parse_tombstones({"deleted_events": [
        {"artist_slug": "raye", "ticketmaster_discovery_event_id": "vv001",
         "venue": "The  O2", "local_date": "2027-06-01"},
        {"artist_slug": "raye", "ticketmaster_event_id": "LEGACY123"},
        {"no_slug": True},
    ]})
    check(
        "parse_tombstones indexes ids uppercased and normalizes venue/date keys",
        parsed.get("raye", {}).get("ids") == frozenset({"VV001", "LEGACY123"})
        and parsed.get("raye", {}).get("venue_keys") == frozenset({"the o2|2027-06-01"}),
    )
    check(
        "parse_tombstones ignores entries without an artist_slug",
        list(parsed.keys()) == ["raye"],
    )
    malformed = parse_tombstones({"deleted_events": [
        {"artist_slug": 123, "ticketmaster_event_id": "SHOULDSKIP"},
        {"artist_slug": "raye", "ticketmaster_discovery_event_id": 999,
         "venue": "The O2", "local_date": "2027-06-01"},
    ]})
    check(
        "parse_tombstones skips a non-string artist_slug without crashing (fail-open)",
        list(malformed.keys()) == ["raye"],
    )
    check(
        "parse_tombstones ignores a non-string id field (no crash, no bogus match)",
        malformed["raye"]["ids"] == frozenset()
        and malformed["raye"]["venue_keys"] == frozenset({"the o2|2027-06-01"}),
    )
    check(
        "parse_tombstones tolerates a non-dict top-level registry (fail-open)",
        parse_tombstones([{"artist_slug": "raye"}]) == {} and parse_tombstones("nope") == {},
    )
    check(
        "load_tombstones fails open (empty dict) on a missing registry file",
        load_tombstones(ROOT / "data" / "does-not-exist-deleted-events.json") == {},
    )
    check(
        "event_local_date converts UTC datetime to venue-local date",
        event_local_date("2026-08-04T02:00:00Z", "America/Chicago") == "2026-08-03",
    )
    check(
        "event_local_date keeps naive legacy datetime date as-is",
        event_local_date("2026-07-17T20:45:00", "Europe/Rome") == "2026-07-17",
    )
    check(
        "event_local_date falls back to UTC date without a timezone",
        event_local_date("2026-08-04T02:00:00Z", "") == "2026-08-04",
    )

    # Dry-run-only contract: the script source must expose no write path.
    source = Path(__file__).read_text(encoding="utf-8")
    check(
        "no file opened for writing anywhere in the script",
        not re.search(r"""open\([^)\n]*["'][wax]b?["']""", source),
    )
    check(
        "no json.dump-to-file call (json.dumps to stdout only)",
        not re.search(r"json\.dump\(", source.replace("json.dumps(", "")),
    )
    check(
        "no --write or --apply flag is defined",
        not re.search(r"""add_argument\(\s*["']--(write|apply)""", source),
    )
    check("refuses to run without --dry-run (exit 2 guard present)", "sys.exit(2)" in source)

    print(f"\nself-test: {len(failures)} failure(s)")
    sys.exit(1 if failures else 0)


# ─── Main ────────────────────────────────────────────────────────────────────


def main():
    parser = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    target = parser.add_mutually_exclusive_group(required=False)
    target.add_argument("--artist", metavar="SLUG", help="run for a single artist slug")
    target.add_argument("--all-approved", action="store_true", help="run for every registry entry")
    parser.add_argument("--dry-run", action="store_true", help="required; this script has no write mode")
    parser.add_argument("--json", action="store_true", help="emit the report as JSON instead of text")
    parser.add_argument("--self-test", action="store_true", help="run offline withhold-rule tests (no network)")
    args = parser.parse_args()

    if args.self_test:
        self_test()
        return

    if not (args.artist or args.all_approved):
        parser.error("one of --artist or --all-approved is required (or --self-test)")
    if not args.dry_run:
        print(
            "ERROR: this script only supports --dry-run. Write mode does not exist;\n"
            "when it does, it will be explicitly gated and PR-based\n"
            "(docs/PROVIDER_SYNC.md -> Rules for all current and future sync scripts).",
            file=sys.stderr,
        )
        sys.exit(2)

    registry = load_json(REGISTRY_PATH)
    artists = {a["slug"]: a for a in load_json(ARTISTS_PATH)}
    events_by_slug = {}
    for event in load_json(EVENTS_PATH):
        events_by_slug.setdefault(event.get("artist_slug"), []).append(event)
    tombstones_by_slug = load_tombstones()

    allowed_hosts = ticketmaster_allowed_hosts(OUT_JS_PATH.read_text(encoding="utf-8"))
    if not allowed_hosts:
        print("ERROR: could not parse the Ticketmaster host allowlist from functions/api/out.js", file=sys.stderr)
        sys.exit(1)

    entries = registry.get("artists", [])
    if args.artist:
        entries = [e for e in entries if e.get("slug") == args.artist]
        if not entries:
            print(f"ERROR: slug {args.artist!r} not found in {REGISTRY_PATH}", file=sys.stderr)
            sys.exit(1)

    api_key = read_api_key()
    base = (os.environ.get("TICKETMASTER_DISCOVERY_BASE_URL") or DEFAULT_DISCOVERY_BASE).rstrip("/")
    timeout_ms = int(os.environ.get("TM_REQUEST_TIMEOUT_MS") or "15000")

    if not args.json:
        print("sync-ticketmaster-events DRY-RUN — report only; nothing is written\n")
        if not api_key:
            print(
                "NOTE: TICKETMASTER_API_KEY not set; the live Discovery lookup is skipped\n"
                "and only the offline eligibility report is printed. No files were written.\n"
            )

    reports = [
        build_artist_report(entry, artists.get(entry["slug"]), events_by_slug, allowed_hosts, api_key, base, timeout_ms,
                            tombstones_by_slug=tombstones_by_slug)
        for entry in entries
    ]

    if args.json:
        print(json.dumps({"mode": "dry-run", "live_lookup_available": bool(api_key), "artists": reports}, indent=2))
        return

    for report in reports:
        print_human_report(report)

    eligible = sum(1 for r in reports if r["eligible"])
    recognised = sum(r["recognised"] for r in reports)
    proposed = sum(r["proposed"] for r in reports)
    withheld = sum(r["withheld"] for r in reports)
    print(
        f"Summary: {eligible}/{len(reports)} eligible; recognised {recognised}, "
        f"proposed {proposed}, withheld {withheld}."
        "\nDry-run only: no events were added, no files were written, no CTAs were changed."
    )


if __name__ == "__main__":
    try:
        main()
    except BrokenPipeError:
        # Report piped into head/less and closed early — not an error.
        sys.exit(0)
