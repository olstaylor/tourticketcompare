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
  listing; duplicate of an existing events.json row (by TM event id or
  venue/city/date); duplicate venue/city/date within the fetched batch; event
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

ROOT = Path(__file__).resolve().parent.parent
REGISTRY_PATH = ROOT / "data" / "provider-identities.json"
ARTISTS_PATH = ROOT / "public" / "data" / "artists.json"
EVENTS_PATH = ROOT / "public" / "data" / "events.json"
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


def classify_event(tm_event, *, attraction_id, allowed_hosts, existing_event_ids,
                   existing_venue_keys, batch_venue_keys, now_iso):
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

    url_host = ""
    url_host_allowed = False
    if not url:
        reasons.append("missing ticketmaster url")
    else:
        try:
            url_host = (urllib.parse.urlparse(url).hostname or "").lower()
        except ValueError:
            url_host = ""
        url_host_allowed = bool(url_host) and host_allowed(url_host, allowed_hosts)
        if not url_host_allowed:
            reasons.append(f"url host '{url_host or 'unparseable'}' not in the out.js Ticketmaster allowlist")
        lowered = url.lower()
        if any(marker in lowered for marker in PLACEHOLDER_MARKERS):
            reasons.append("url looks like a placeholder")

    haystack = f"{event_name} {url}".lower()
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

    if event_id and event_id.upper() in existing_event_ids:
        reasons.append("duplicate of an existing events.json row (same ticketmaster_event_id)")
    venue_key = f"{venue_name.lower()}|{city.lower()}|{datetime_iso[:10]}"
    if venue_name and city and datetime_iso:
        if venue_key in existing_venue_keys:
            reasons.append("duplicate of an existing events.json row (same venue/city/date)")
        elif venue_key in batch_venue_keys:
            reasons.append("duplicate venue/city/date within this fetched batch")
        else:
            batch_venue_keys.add(venue_key)

    return {
        "event_id": event_id,
        "event_name": event_name,
        "datetime_iso": datetime_iso,
        "venue": venue_name,
        "city": city,
        "country": country,
        "url_host": url_host,
        "url_host_allowed": url_host_allowed,
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


def build_artist_report(entry, artist, events_by_slug, allowed_hosts, api_key, base, timeout_ms):
    slug = entry["slug"]
    ok, reasons = eligibility(entry, artist)
    report = {
        "artist_slug": slug,
        "eligible": ok,
        "eligibility_blockers": reasons,
        "attraction_id": entry.get("ticketmaster_attraction_id"),
        "ticketmaster_artist_url": entry.get("ticketmaster_artist_url"),
        "existing_events_in_repo": len(events_by_slug.get(slug, [])),
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
    existing_event_ids = {
        (e.get("ticketmaster_event_id") or "").strip().upper()
        for e in existing
        if (e.get("ticketmaster_event_id") or "").strip()
    }
    existing_venue_keys = {
        f"{(e.get('venue') or '').strip().lower()}|{(e.get('city') or '').strip().lower()}|{(e.get('datetime_iso') or '')[:10]}"
        for e in existing
    }
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
            f"           url host: {row['url_host'] or '(missing)'}  "
            f"allowlisted: {'yes' if row['url_host_allowed'] else 'NO'}"
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

    def classify(event, batch=None, existing_ids=None, existing_keys=None):
        return classify_event(
            event,
            attraction_id="K8vZ917Kvt7",
            allowed_hosts=allowed_hosts,
            existing_event_ids=existing_ids or set(),
            existing_venue_keys=existing_keys or set(),
            batch_venue_keys=batch if batch is not None else set(),
            now_iso="2026-06-10T00:00:00Z",
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
    check(
        "affiliate-wrapped (ticketmaster.evyy.net) event url withheld",
        any("not in the out.js" in r for r in classify(
            make_event(url="https://ticketmaster.evyy.net/c/1/2/3?u=https%3A%2F%2Fwww.ticketmaster.com%2Fevent%2FVV001")
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
        "duplicate of existing events.json id withheld",
        any("same ticketmaster_event_id" in r for r in classify(
            make_event(), existing_ids={"VV001"}
        )["withheld_reasons"]),
    )
    check(
        "duplicate existing venue/city/date withheld",
        any("same venue/city/date" in r for r in classify(
            make_event(id="VV002"), existing_keys={"the o2|london|2027-06-01"}
        )["withheld_reasons"]),
    )
    batch = set()
    classify(make_event(), batch=batch)
    check(
        "duplicate within batch withheld",
        any("within this fetched batch" in r for r in classify(make_event(id="VV003"), batch=batch)["withheld_reasons"]),
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
        build_artist_report(entry, artists.get(entry["slug"]), events_by_slug, allowed_hosts, api_key, base, timeout_ms)
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
