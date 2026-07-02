#!/usr/bin/env python3
from __future__ import annotations

import argparse
import copy
import json
import re
import subprocess
import sys
import tempfile
from datetime import datetime
from urllib.parse import unquote, urlparse
from pathlib import Path
from typing import Any


SLUG_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
URL_RE = re.compile(r"^https?://", re.IGNORECASE)
ALLOWED_STATUSES = {"draft", "announced", "on-sale", "past"}

# Explicit event-link publishability states. human_verified and
# machine_high_confidence allow CTAs/redirects; needs_recheck suppresses them.
# Runtime gates: eventLinkPublishable in functions/[[path]].js, public/app.js,
# functions/api/out.js. An absent key falls back to the legacy
# provider_links.ticketmaster.verified flag.
ALLOWED_VERIFICATION_STATUSES = {"human_verified", "machine_high_confidence", "needs_recheck"}
PLACEHOLDER_MARKERS = (
    "example.com",
    "localhost",
    "your-affiliate-link",
    "your-link-here",
    "replace-me",
    "placeholder",
)
PROVIDER_URL_HOSTS = {
    "ticketmaster": {
        "ticketmaster.com",
        "ticketmaster.ca",
        "ticketmaster.co.uk",
        "ticketmaster.es",
        "ticketmaster.de",
        "ticketmaster.nl",
        "ticketmaster.se",
        "ticketmaster.pl",
        "ticketmaster.be",
        "ticketmaster.it",
    },
    "seatgeek": {"seatgeek.com", "www.seatgeek.com"},
    "vividseats": {"vividseats.com", "www.vividseats.com"},
}
PLACEHOLDER_PATTERNS = tuple(re.compile(pattern, re.IGNORECASE) for pattern in (
    r"(?:^|[/?#=&._-])tbd(?:$|[/?#=&._-])",
))


def parse_iso(dt: str) -> bool:
    # Accept common ISO forms including trailing Z.
    try:
        datetime.fromisoformat(dt.replace("Z", "+00:00"))
        return True
    except Exception:
        return False


def is_iso_date(value: Any) -> bool:
    if not isinstance(value, str):
        return False
    text = value.strip()
    if not re.match(r"^\d{4}-\d{2}-\d{2}$", text):
        return False
    try:
        datetime.strptime(text, "%Y-%m-%d")
        return True
    except ValueError:
        return False


def is_http_url(value: Any) -> bool:
    if value is None:
        return True
    if not isinstance(value, str):
        return False
    v = value.strip()
    if v == "":
        return True
    return bool(URL_RE.match(v))


def is_placeholder_url(value: Any) -> bool:
    if not isinstance(value, str):
        return False
    v = value.strip().lower()
    if v == "":
        return False
    return any(marker in v for marker in PLACEHOLDER_MARKERS) or any(
        pattern.search(v) for pattern in PLACEHOLDER_PATTERNS
    )


def parse_url(value: Any):
    if not isinstance(value, str):
        return None
    raw = value.strip()
    if raw == "":
        return None
    try:
        parsed = urlparse(raw)
    except Exception:
        return None
    if not parsed.scheme or not parsed.netloc:
        return None
    return parsed


def host_allowed_for_provider(hostname: str, provider: str) -> bool:
    host = hostname.lower()
    allowed_hosts = PROVIDER_URL_HOSTS.get(provider, set())
    return any(host == allowed or host.endswith(f".{allowed}") for allowed in allowed_hosts)


def is_seatgeek_event_url(value: Any) -> tuple[bool, str]:
    if value is None or (isinstance(value, str) and value.strip() == ""):
        return True, ""
    if not isinstance(value, str):
        return False, "must be empty or a SeatGeek event URL string"

    raw = value.strip()
    parsed = parse_url(raw)
    if parsed is None:
        return False, "must be a valid absolute URL"
    if parsed.scheme.lower() != "https":
        return False, "must use https"

    host = (parsed.hostname or "").lower()
    if host not in {"seatgeek.com", "www.seatgeek.com"}:
        return False, "host must be seatgeek.com or www.seatgeek.com"

    if is_placeholder_url(raw):
        return False, "placeholder/example URL is not allowed"

    path = unquote(parsed.path or "/").strip()
    normalized_path = path.rstrip("/")
    if normalized_path in {"", "/"}:
        return False, "must not be the SeatGeek homepage"

    first_segment = normalized_path.split("/")[1].lower() if normalized_path.startswith("/") and len(normalized_path.split("/")) > 1 else ""
    if first_segment in {"search", "venues", "venue", "performers", "performer", "artists", "artist", "concert-tickets", "tickets"}:
        return False, "must be an event-specific SeatGeek URL, not a generic search/artist/venue URL"

    # SeatGeek event pages for concerts use paths ending in /concert/<numeric id>.
    # Accept a small set of event-category segments so validation remains event-page
    # oriented without requiring a single artist-specific URL shape.
    if not re.search(r"/(concert|sports|theater|theatre)/\d+$", normalized_path, re.IGNORECASE):
        return False, "must look like an event URL ending in /concert/<id> or another event category with a numeric id"

    return True, ""


def is_vividseats_event_url(value: Any) -> tuple[bool, str]:
    # Mirrors is_seatgeek_event_url for Vivid Seats production pages. The
    # accepted shape is conservative (…/production/<numeric id>) and should be
    # adjusted only alongside the first owner-verified vividseats_url data.
    if value is None or (isinstance(value, str) and value.strip() == ""):
        return True, ""
    if not isinstance(value, str):
        return False, "must be empty or a Vivid Seats event URL string"

    raw = value.strip()
    parsed = parse_url(raw)
    if parsed is None:
        return False, "must be a valid absolute URL"
    if parsed.scheme.lower() != "https":
        return False, "must use https"

    host = (parsed.hostname or "").lower()
    if host not in {"vividseats.com", "www.vividseats.com"}:
        return False, "host must be vividseats.com or www.vividseats.com"

    if is_placeholder_url(raw):
        return False, "placeholder/example URL is not allowed"

    path = unquote(parsed.path or "/").strip()
    normalized_path = path.rstrip("/")
    if normalized_path in {"", "/"}:
        return False, "must not be the Vivid Seats homepage"

    first_segment = normalized_path.split("/")[1].lower() if normalized_path.startswith("/") and len(normalized_path.split("/")) > 1 else ""
    if first_segment in {"search", "venues", "venue", "performers", "performer", "artists", "artist", "category", "concerts", "concert", "sports", "sport", "theater", "theatre"}:
        return False, "must be an event-specific Vivid Seats URL, not a generic search/artist/venue/category URL"

    if not re.search(r"/production/\d+$", normalized_path, re.IGNORECASE):
        return False, "must look like a Vivid Seats production URL ending in /production/<numeric id>"

    return True, ""


def provider_link_value(event: dict[str, Any], provider: str, field: str) -> Any:
    provider_links = event.get("provider_links")
    if not isinstance(provider_links, dict):
        return None
    provider_data = provider_links.get(provider)
    if not isinstance(provider_data, dict):
        return None
    return provider_data.get(field)

def extract_ticketmaster_event_path_id(url: str) -> str | None:
    parsed = parse_url(url)
    if parsed is None:
        return None
    segments = [segment for segment in (parsed.path or "").split("/") if segment]
    for idx, segment in enumerate(segments[:-1]):
        if segment.lower() == "event":
            return unquote(segments[idx + 1]).strip() or None
    return None


def slugify_case_name(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-") or "case"


def run_self_test() -> int:
    base_event = {
        "id": "self-test-event-1",
        "artist_slug": "self-test-artist",
        "artist_name": "Self Test Artist",
        "city": "Test City",
        "country": "US",
        "venue": "Test Arena",
        "tour_name": "Self Test Tour",
        "datetime_iso": "2026-06-01T20:00:00Z",
        "ticketmaster_event_id": "ABC123",
        "ticketmaster_url": "https://www.ticketmaster.com/test/event/ABC123",
        "seatgeek_url": "https://seatgeek.com/test-show/concert/123456",
        "vividseats_url": "https://www.vividseats.com/test-event-tickets/production/1234567",
        "provider_links": {
            "ticketmaster": {"url": "https://www.ticketmaster.com/test/event/ABC123", "verified": True},
            "seatgeek": {"url": "https://seatgeek.com/test-show/concert/123456", "verified": True},
            "vivid-seats": {"url": "https://www.vividseats.com/test-event-tickets/production/1234567", "verified": True},
        },
        "last_verified_at": "2026-05-21",
    }
    base_artists = [{
        "slug": "self-test-artist",
        "name": "Self Test Artist",
        "last_verified_at": "2026-05-21",
        "verified_provider_count": 2,
        "verified_providers": ["ticketmaster", "seatgeek"],
    }]
    script_path = Path(__file__).resolve()
    test_cases = [
        {
            "name": "protocol-relative top-level provider URL",
            "mutate": lambda event: event.__setitem__("ticketmaster_url", "//ticketmaster.com/event/ABC123"),
            "expect": "ticketmaster_url: must be http(s) URL or empty",
        },
        {
            "name": "placeholder top-level provider URL",
            "mutate": lambda event: event.__setitem__("seatgeek_url", "https://example.com/replace-me"),
            "expect": "seatgeek_url: host must be seatgeek.com or www.seatgeek.com",
        },
        {
            "name": "wrong-host top-level provider URL",
            "mutate": lambda event: event.__setitem__("seatgeek_url", "https://www.ticketmaster.com/event/ABC123"),
            "expect": "seatgeek_url: host 'www.ticketmaster.com' is not allowed for seatgeek",
        },
        {
            "name": "provider_links wrong-host URL for known provider key",
            "mutate": lambda event: event["provider_links"]["seatgeek"].__setitem__("url", "https://www.vividseats.com/test-event-tickets/production/1234567"),
            "expect": "provider_links.seatgeek.url: host must be seatgeek.com or www.seatgeek.com",
        },
        {
            "name": "generic vividseats top-level URL",
            "mutate": lambda event: (
                event.__setitem__("vividseats_url", "https://www.vividseats.com/search?q=test"),
                event["provider_links"]["vivid-seats"].__setitem__("url", ""),
                event["provider_links"]["vivid-seats"].__setitem__("verified", False),
            ),
            "expect": "vividseats_url: must be an event-specific Vivid Seats URL, not a generic search/artist/venue/category URL",
        },
        {
            "name": "non-production vividseats top-level URL",
            "mutate": lambda event: (
                event.__setitem__("vividseats_url", "https://www.vividseats.com/test-event-tickets"),
                event["provider_links"]["vivid-seats"].__setitem__("url", ""),
                event["provider_links"]["vivid-seats"].__setitem__("verified", False),
            ),
            "expect": "vividseats_url: must look like a Vivid Seats production URL ending in /production/<numeric id>",
        },
        {
            "name": "provider_links vivid-seats URL mismatch",
            "mutate": lambda event: event["provider_links"]["vivid-seats"].__setitem__("url", "https://www.vividseats.com/other-event-tickets/production/7654321"),
            "expect": "provider_links.vivid-seats.url: must match top-level vividseats_url when both are present",
        },
        {
            "name": "provider_links placeholder URL",
            "mutate": lambda event: event["provider_links"]["ticketmaster"].__setitem__("url", "https://example.com/replace-me"),
            "expect": "provider_links.ticketmaster.url: placeholder/example URL is not allowed",
        },
        {
            "name": "malformed artist last_verified_at",
            "mutate_artists": lambda artists: artists[0].__setitem__("last_verified_at", "2026/05/21"),
            "expect": "artist[self-test-artist].last_verified_at: must be YYYY-MM-DD if present",
        },
        {
            "name": "invalid artist calendar date",
            "mutate_artists": lambda artists: artists[0].__setitem__("last_verified_at", "2026-02-30"),
            "expect": "artist[self-test-artist].last_verified_at: must be YYYY-MM-DD if present",
        },
        {
            "name": "malformed event last_verified_at",
            "mutate": lambda event: event.__setitem__("last_verified_at", "2026/05/21"),
            "expect": "event[0].last_verified_at: must be YYYY-MM-DD if present",
        },
        {
            "name": "provider timestamp requires verified true",
            "mutate": lambda event: (
                event["provider_links"]["ticketmaster"].__setitem__("verified", False),
                event["provider_links"]["ticketmaster"].__setitem__("last_verified_at", "2026-05-21")
            ),
            "expect": "event[0].provider_links.ticketmaster.last_verified_at: requires verified=true and a non-empty url",
        },
        {
            "name": "provider timestamp requires non-empty url",
            "mutate": lambda event: (
                event["provider_links"]["ticketmaster"].__setitem__("url", ""),
                event["provider_links"]["ticketmaster"].__setitem__("last_verified_at", "2026-05-21")
            ),
            "expect": "event[0].provider_links.ticketmaster.last_verified_at: requires verified=true and a non-empty url",
        },
        {
            "name": "artist verified provider count mismatch",
            "mutate_artists": lambda artists: artists[0].__setitem__("verified_provider_count", 3),
            "expect": "artist[self-test-artist].verified_provider_count: must match verified_providers length (2)",
        },
        {
            "name": "tour_name key missing",
            "mutate": lambda event: event.pop("tour_name", None),
            "expect": "event[0].tour_name: required key (must be present; empty string allowed)",
        },
        {
            "name": "ticketmaster storefront id must remain in url",
            "mutate": lambda event: event.__setitem__("ticketmaster_event_id", "DISCOVERY123"),
            "expect": "ticketmaster_event_id 'DISCOVERY123' must match /event/ segment 'ABC123'",
        },
    ]
    positive_cases = [
        {
            "name": "valid timestamp fields across artist event and provider",
            "mutate": lambda event: event["provider_links"]["ticketmaster"].__setitem__("last_verified_at", "2026-05-21"),
        },
        {
            "name": "ticketmaster discovery id may differ from storefront url id",
            "mutate": lambda event: (
                event.__setitem__("ticketmaster_discovery_event_id", "vv1AAZkOVGkdF4IwR"),
                event["provider_links"]["ticketmaster"].__setitem__("discovery_event_id", "vv1AAZkOVGkdF4IwR"),
            ),
        },
        {
            "name": "blank tour_name on indexed artist warns but passes",
            "mutate": lambda event: event.__setitem__("tour_name", ""),
            "expect_in_stderr": "WARNING: blank tour_name on indexed artist events",
        },
        {
            "name": "blank tour_name on indexed artist fails in strict mode",
            "mutate": lambda event: event.__setitem__("tour_name", ""),
            "strict_tour_name": True,
            "expect_failure": "STRICT TOUR_NAME CHECK FAILED:",
        },
    ]

    with tempfile.TemporaryDirectory(prefix="ttc-validate-events-self-test-") as tmp_dir:
        tmp = Path(tmp_dir)
        for case in test_cases:
            event = copy.deepcopy(base_event)
            artists = copy.deepcopy(base_artists)
            mutate_event = case.get("mutate")
            mutate_artists = case.get("mutate_artists")
            if callable(mutate_event):
                mutate_event(event)
            if callable(mutate_artists):
                mutate_artists(artists)
            artists_path = tmp / f"artists-{slugify_case_name(case['name'])}.json"
            artists_path.write_text(json.dumps(artists), encoding="utf-8")
            events_path = tmp / f"{slugify_case_name(case['name'])}.json"
            events_path.write_text(json.dumps([event]), encoding="utf-8")
            cmd = [
                sys.executable,
                str(script_path),
                "--for-production",
                "--path",
                str(events_path),
                "--artists-path",
                str(artists_path),
            ]
            result = subprocess.run(cmd, capture_output=True, text=True)
            stderr = result.stderr or ""
            if result.returncode == 0:
                print(f"SELF-TEST FAILED: {case['name']} unexpectedly passed.", file=sys.stderr)
                return 1
            if case["expect"] not in stderr:
                print(
                    f"SELF-TEST FAILED: {case['name']} did not include expected error.\n"
                    f"Expected substring: {case['expect']}\n"
                    f"Actual stderr:\n{stderr}",
                    file=sys.stderr,
                )
                return 1
        for case in positive_cases:
            event = copy.deepcopy(base_event)
            artists = copy.deepcopy(base_artists)
            mutate_event = case.get("mutate")
            mutate_artists = case.get("mutate_artists")
            if callable(mutate_event):
                mutate_event(event)
            if callable(mutate_artists):
                mutate_artists(artists)
            artists_path = tmp / f"artists-{slugify_case_name(case['name'])}.json"
            artists_path.write_text(json.dumps(artists), encoding="utf-8")
            events_path = tmp / f"{slugify_case_name(case['name'])}.json"
            events_path.write_text(json.dumps([event]), encoding="utf-8")
            cmd = [
                sys.executable,
                str(script_path),
                "--for-production",
                "--path",
                str(events_path),
                "--artists-path",
                str(artists_path),
            ]
            if case.get("strict_tour_name"):
                cmd.append("--strict-tour-name")
            result = subprocess.run(cmd, capture_output=True, text=True)
            stderr = result.stderr or ""
            expect_failure = case.get("expect_failure")
            if expect_failure:
                if result.returncode == 0:
                    print(f"SELF-TEST FAILED: {case['name']} unexpectedly passed in strict mode.", file=sys.stderr)
                    return 1
                if expect_failure not in stderr:
                    print(
                        f"SELF-TEST FAILED: {case['name']} missing strict failure text.\n"
                        f"Expected substring: {expect_failure}\n"
                        f"Actual stderr:\n{stderr}",
                        file=sys.stderr,
                    )
                    return 1
                continue
            if result.returncode != 0:
                print(
                    f"SELF-TEST FAILED: {case['name']} unexpectedly failed.\n"
                    f"Actual stderr:\n{stderr}",
                    file=sys.stderr,
                )
                return 1
            expect_in_stderr = case.get("expect_in_stderr")
            if expect_in_stderr and expect_in_stderr not in stderr:
                print(
                    f"SELF-TEST FAILED: {case['name']} did not surface expected warning.\n"
                    f"Expected substring: {expect_in_stderr}\n"
                    f"Actual stderr:\n{stderr}",
                    file=sys.stderr,
                )
                return 1
    print(
        f"OK: validate-events self-test passed ({len(test_cases)} negative cases, "
        f"{len(positive_cases)} positive case)."
    )
    return 0



def main() -> int:
    parser = argparse.ArgumentParser(description="Validate public/data/events.json")
    parser.add_argument(
        "--self-test",
        action="store_true",
        help="Run built-in negative regression checks for structural link validation.",
    )
    parser.add_argument(
        "--path",
        default="public/data/events.json",
        help="Path to events JSON (default: public/data/events.json)",
    )
    parser.add_argument(
        "--require-affiliate-urls",
        action="store_true",
        help="Fail if any event is missing provider affiliate URLs.",
    )
    parser.add_argument(
        "--reject-placeholder-urls",
        action="store_true",
        help="Fail if affiliate URLs contain known placeholder/example markers.",
    )
    parser.add_argument(
        "--min-events",
        type=int,
        default=0,
        help="Fail if event count is below this threshold (default: 0).",
    )
    parser.add_argument(
        "--for-production",
        action="store_true",
        help="Enable strict launch checks: min-events>=1 and reject placeholders. Missing URLs are allowed and render unavailable.",
    )
    parser.add_argument(
        "--strict-tour-name",
        action="store_true",
        help="When used with --for-production, fail if indexed artists have events with blank tour_name.",
    )
    parser.add_argument(
        "--artists-path",
        default="public/data/artists.json",
        help="Path to artists JSON, used for the --for-production artist-reference checks (default: public/data/artists.json).",
    )
    args = parser.parse_args()

    if args.self_test:
        return run_self_test()

    if args.for_production:
        args.reject_placeholder_urls = True
        if args.min_events < 1:
            args.min_events = 1

    path = Path(args.path)
    if not path.exists():
        print(f"ERROR: missing file: {path}", file=sys.stderr)
        return 2

    try:
        data = json.loads(path.read_text())
    except json.JSONDecodeError as exc:
        print(f"ERROR: invalid JSON in {path}: {exc}", file=sys.stderr)
        return 2

    if not isinstance(data, list):
        print("ERROR: events.json must be a JSON array.", file=sys.stderr)
        return 2

    if len(data) < args.min_events:
        print(
            f"ERROR: events.json has {len(data)} events, below required minimum of {args.min_events}.",
            file=sys.stderr,
        )
        return 1

    # Empty is allowed (pre-announcement mode).
    if len(data) == 0:
        print("OK: 0 events (empty list).")
        return 0

    errors: list[str] = []
    ids: set[str] = set()
    # Blank tour_name on indexed-artist events is a content warning, not a hard
    # error — see issue #172. We group by artist_slug for a single tidy summary
    # so a hundred-event artist doesn't spam the validator output.
    blank_tour_name_by_slug: dict[str, list[str]] = {}

    # Artist-reference integrity (events must point at a real artist record).
    # Enforced only under --for-production so default runs stay lenient.
    artist_names: dict[str, Any] = {}
    indexed_artist_slugs: set[str] = set()
    if args.for_production:
        artists_path = Path(args.artists_path)
        if not artists_path.exists():
            print(f"ERROR: missing artists file: {artists_path}", file=sys.stderr)
            return 2
        try:
            artists_data = json.loads(artists_path.read_text())
        except json.JSONDecodeError as exc:
            print(f"ERROR: invalid JSON in {artists_path}: {exc}", file=sys.stderr)
            return 2
        if not isinstance(artists_data, list):
            print(f"ERROR: {artists_path} must be a JSON array.", file=sys.stderr)
            return 2
        for artist in artists_data:
            if not isinstance(artist, dict):
                continue
            artist_slug = artist.get("slug")
            if isinstance(artist_slug, str) and artist_slug.strip():
                artist_names[artist_slug.strip()] = artist.get("name")
                # An artist is "indexed" for the tour_name warning if it isn't
                # explicitly held back from the public index. Missing
                # indexing_status defaults to indexed so the warning surfaces
                # the same way for legacy records as for new ones.
                indexing_status = artist.get("indexing_status")
                if not (isinstance(indexing_status, str) and indexing_status.strip() in {"review_required", "hidden"}):
                    indexed_artist_slugs.add(artist_slug.strip())
            artist_prefix = f"artist[{artist_slug.strip() if isinstance(artist_slug, str) and artist_slug.strip() else 'unknown'}]"
            artist_last_verified_at = artist.get("last_verified_at")
            if artist_last_verified_at is not None and not is_iso_date(artist_last_verified_at):
                errors.append(f"{artist_prefix}.last_verified_at: must be YYYY-MM-DD if present")

            verified_provider_count = artist.get("verified_provider_count")
            verified_providers = artist.get("verified_providers")
            if verified_provider_count is not None or verified_providers is not None:
                if not isinstance(verified_provider_count, int):
                    errors.append(f"{artist_prefix}.verified_provider_count: must be an integer when present")
                if not isinstance(verified_providers, list):
                    errors.append(f"{artist_prefix}.verified_providers: must be an array when present")
                if isinstance(verified_provider_count, int) and isinstance(verified_providers, list):
                    if verified_provider_count != len(verified_providers):
                        errors.append(
                            f"{artist_prefix}.verified_provider_count: must match verified_providers length ({len(verified_providers)})"
                        )

    required_fields = [
        "id",
        "artist_slug",
        "artist_name",
        "city",
        "country",
        "venue",
        "datetime_iso",
    ]

    for i, event in enumerate(data):
        prefix = f"event[{i}]"
        if not isinstance(event, dict):
            errors.append(f"{prefix}: must be an object")
            continue

        for field in required_fields:
            value = event.get(field)
            if not isinstance(value, str) or value.strip() == "":
                errors.append(f"{prefix}.{field}: required string")

        # tour_name: the key must exist (forward-looking schema guard). The
        # value may be blank, but blanks on indexed-artist events surface as a
        # warning so the gap is visible without blocking deploys.
        if "tour_name" not in event:
            errors.append(f"{prefix}.tour_name: required key (must be present; empty string allowed)")
        else:
            tour_name_value = event.get("tour_name")
            if tour_name_value is not None and not isinstance(tour_name_value, str):
                errors.append(f"{prefix}.tour_name: must be a string when present (use \"\" if unknown)")

        event_id = event.get("id")
        if isinstance(event_id, str) and event_id.strip():
            if event_id in ids:
                errors.append(f"{prefix}.id: duplicate id '{event_id}'")
            ids.add(event_id)

        slug = event.get("artist_slug")
        if isinstance(slug, str) and slug.strip() and not SLUG_RE.match(slug.strip()):
            errors.append(f"{prefix}.artist_slug: invalid slug '{slug}' (use lowercase-hyphenated)")

        if args.for_production and isinstance(slug, str) and slug.strip():
            slug_value = slug.strip()
            id_label = event_id.strip() if isinstance(event_id, str) and event_id.strip() else f"index {i}"
            if "tour_name" in event:
                tour_name_value = event.get("tour_name")
                tour_name_blank = not (isinstance(tour_name_value, str) and tour_name_value.strip())
                if tour_name_blank and slug_value in indexed_artist_slugs:
                    blank_tour_name_by_slug.setdefault(slug_value, []).append(id_label)
            if slug_value not in artist_names:
                errors.append(
                    f"{prefix}.artist_slug: '{slug_value}' (event id '{id_label}') "
                    f"has no matching artist record in {args.artists_path}"
                )
            else:
                expected_name = artist_names[slug_value]
                event_artist_name = event.get("artist_name")
                if (
                    isinstance(expected_name, str)
                    and expected_name.strip()
                    and isinstance(event_artist_name, str)
                    and event_artist_name.strip()
                    and event_artist_name.strip() != expected_name.strip()
                ):
                    errors.append(
                        f"{prefix}.artist_name: '{event_artist_name.strip()}' "
                        f"(event id '{id_label}', artist_slug '{slug_value}') "
                        f"does not match artist record name '{expected_name.strip()}' in {args.artists_path}"
                    )

        dt = event.get("datetime_iso")
        if isinstance(dt, str) and dt.strip() and not parse_iso(dt.strip()):
            errors.append(f"{prefix}.datetime_iso: invalid ISO datetime '{dt}'")

        status = event.get("status")
        if status is not None:
            if not isinstance(status, str) or status.strip() == "":
                errors.append(f"{prefix}.status: must be a non-empty string if present")
            elif status.strip() not in ALLOWED_STATUSES:
                allowed = ", ".join(sorted(ALLOWED_STATUSES))
                errors.append(f"{prefix}.status: invalid '{status}' (allowed: {allowed})")

        verification_status = event.get("verification_status")
        if verification_status is not None:
            if not isinstance(verification_status, str) or verification_status.strip() == "":
                errors.append(f"{prefix}.verification_status: must be a non-empty string if present")
            elif verification_status.strip() not in ALLOWED_VERIFICATION_STATUSES:
                allowed = ", ".join(sorted(ALLOWED_VERIFICATION_STATUSES))
                errors.append(
                    f"{prefix}.verification_status: invalid '{verification_status}' (allowed: {allowed})"
                )

        tz = event.get("timezone")
        if tz is not None:
            if not isinstance(tz, str) or tz.strip() == "":
                errors.append(f"{prefix}.timezone: must be a non-empty string if present")
            elif "/" not in tz.strip():
                errors.append(f"{prefix}.timezone: expected IANA-like value (e.g., Europe/London), got '{tz}'")

        for url_field in ("ticketmaster_url", "seatgeek_url", "vividseats_url"):
            if not is_http_url(event.get(url_field)):
                errors.append(f"{prefix}.{url_field}: must be http(s) URL or empty")
            elif args.reject_placeholder_urls and is_placeholder_url(event.get(url_field)):
                errors.append(f"{prefix}.{url_field}: placeholder/example URL is not allowed")

        for provider, url_field in (("ticketmaster", "ticketmaster_url"), ("seatgeek", "seatgeek_url"), ("vividseats", "vividseats_url")):
            value = event.get(url_field)
            if not isinstance(value, str) or not value.strip():
                continue
            parsed = parse_url(value)
            if parsed is None:
                errors.append(f"{prefix}.{url_field}: must be a valid absolute URL")
                continue
            if parsed.scheme.lower() not in {"http", "https"}:
                errors.append(f"{prefix}.{url_field}: must use http or https")
            if not host_allowed_for_provider(parsed.hostname or "", provider):
                allowed = ", ".join(sorted(PROVIDER_URL_HOSTS[provider]))
                errors.append(f"{prefix}.{url_field}: host '{parsed.hostname or ''}' is not allowed for {provider} (allowed: {allowed})")
            if value.strip().startswith("//"):
                errors.append(f"{prefix}.{url_field}: protocol-relative URLs are not allowed")
            if is_placeholder_url(value):
                errors.append(f"{prefix}.{url_field}: placeholder/example URL is not allowed")

        seatgeek_url = event.get("seatgeek_url")
        seatgeek_ok, seatgeek_error = is_seatgeek_event_url(seatgeek_url)
        if not seatgeek_ok:
            errors.append(f"{prefix}.seatgeek_url: {seatgeek_error}")

        provider_seatgeek_url = provider_link_value(event, "seatgeek", "url")
        if provider_seatgeek_url not in (None, ""):
            provider_ok, provider_error = is_seatgeek_event_url(provider_seatgeek_url)
            if not provider_ok:
                errors.append(f"{prefix}.provider_links.seatgeek.url: {provider_error}")
            top_level = seatgeek_url.strip() if isinstance(seatgeek_url, str) else ""
            provider_level = provider_seatgeek_url.strip() if isinstance(provider_seatgeek_url, str) else ""
            if top_level and provider_level and top_level != provider_level:
                errors.append(f"{prefix}.provider_links.seatgeek.url: must match top-level seatgeek_url when both are present")
            elif provider_level and not top_level:
                errors.append(f"{prefix}.provider_links.seatgeek.url: must also be present in top-level seatgeek_url before public CTA use")

        provider_seatgeek_verified = provider_link_value(event, "seatgeek", "verified")
        if isinstance(seatgeek_url, str) and seatgeek_url.strip() and provider_seatgeek_url in (None, "") and provider_seatgeek_verified is True:
            errors.append(f"{prefix}.provider_links.seatgeek.verified: cannot be true when provider_links.seatgeek.url is empty and top-level seatgeek_url is used")
        if provider_seatgeek_url not in (None, "") and provider_seatgeek_verified is True and isinstance(seatgeek_url, str) and seatgeek_url.strip() and provider_seatgeek_url.strip() != seatgeek_url.strip():
            errors.append(f"{prefix}.provider_links.seatgeek.verified: cannot be true for a URL that differs from top-level seatgeek_url")

        vividseats_url = event.get("vividseats_url")
        vividseats_ok, vividseats_error = is_vividseats_event_url(vividseats_url)
        if not vividseats_ok:
            errors.append(f"{prefix}.vividseats_url: {vividseats_error}")

        provider_vividseats_url = provider_link_value(event, "vivid-seats", "url")
        if provider_vividseats_url not in (None, ""):
            provider_ok, provider_error = is_vividseats_event_url(provider_vividseats_url)
            if not provider_ok:
                errors.append(f"{prefix}.provider_links.vivid-seats.url: {provider_error}")
            top_level = vividseats_url.strip() if isinstance(vividseats_url, str) else ""
            provider_level = provider_vividseats_url.strip() if isinstance(provider_vividseats_url, str) else ""
            if top_level and provider_level and top_level != provider_level:
                errors.append(f"{prefix}.provider_links.vivid-seats.url: must match top-level vividseats_url when both are present")
            elif provider_level and not top_level:
                errors.append(f"{prefix}.provider_links.vivid-seats.url: must also be present in top-level vividseats_url before public CTA use")

        provider_vividseats_verified = provider_link_value(event, "vivid-seats", "verified")
        if isinstance(vividseats_url, str) and vividseats_url.strip() and provider_vividseats_url in (None, "") and provider_vividseats_verified is True:
            errors.append(f"{prefix}.provider_links.vivid-seats.verified: cannot be true when provider_links.vivid-seats.url is empty and top-level vividseats_url is used")
        if provider_vividseats_url not in (None, "") and provider_vividseats_verified is True and isinstance(vividseats_url, str) and vividseats_url.strip() and provider_vividseats_url.strip() != vividseats_url.strip():
            errors.append(f"{prefix}.provider_links.vivid-seats.verified: cannot be true for a URL that differs from top-level vividseats_url")

        provider_links = event.get("provider_links")
        event_last_verified_at = event.get("last_verified_at")
        if event_last_verified_at is not None:
            if not is_iso_date(event_last_verified_at):
                errors.append(f"{prefix}.last_verified_at: must be YYYY-MM-DD if present")
        if isinstance(provider_links, dict):
            for provider_key, provider_data in provider_links.items():
                if not isinstance(provider_data, dict):
                    continue
                provider_last_verified_at = provider_data.get("last_verified_at")
                if provider_last_verified_at is not None:
                    if not is_iso_date(provider_last_verified_at):
                        errors.append(
                            f"{prefix}.provider_links.{provider_key}.last_verified_at: must be YYYY-MM-DD if present"
                        )
                    provider_verified = provider_data.get("verified")
                    provider_url = provider_data.get("url")
                    if provider_verified is not True or not isinstance(provider_url, str) or not provider_url.strip():
                        errors.append(
                            f"{prefix}.provider_links.{provider_key}.last_verified_at: requires verified=true and a non-empty url"
                        )
                provider_url = provider_data.get("url")
                link_prefix = f"{prefix}.provider_links.{provider_key}.url"
                if provider_url in (None, ""):
                    continue
                if not isinstance(provider_url, str):
                    errors.append(f"{link_prefix}: must be a string URL when present")
                    continue
                if provider_url.strip().startswith("//"):
                    errors.append(f"{link_prefix}: protocol-relative URLs are not allowed")
                parsed_provider_url = parse_url(provider_url)
                if parsed_provider_url is None:
                    errors.append(f"{link_prefix}: must be a valid absolute URL")
                    continue
                if parsed_provider_url.scheme.lower() not in {"http", "https"}:
                    errors.append(f"{link_prefix}: must use http or https")
                if is_placeholder_url(provider_url):
                    errors.append(f"{link_prefix}: placeholder/example URL is not allowed")

                normalized_provider_key = str(provider_key).strip().lower().replace("-", "")
                known_provider = normalized_provider_key in PROVIDER_URL_HOSTS
                if known_provider and not host_allowed_for_provider(parsed_provider_url.hostname or "", normalized_provider_key):
                    allowed = ", ".join(sorted(PROVIDER_URL_HOSTS[normalized_provider_key]))
                    errors.append(
                        f"{link_prefix}: host '{parsed_provider_url.hostname or ''}' is not allowed for provider '{provider_key}' "
                        f"(allowed: {allowed})"
                    )

        if args.for_production:
            ticketmaster_url = event.get("ticketmaster_url")
            ticketmaster_event_id = event.get("ticketmaster_event_id")
            if (
                isinstance(ticketmaster_url, str)
                and ticketmaster_url.strip()
                and isinstance(ticketmaster_event_id, str)
                and ticketmaster_event_id.strip()
            ):
                normalized_ticketmaster_url = ticketmaster_url.strip()
                normalized_ticketmaster_event_id = ticketmaster_event_id.strip()
                path_event_id = extract_ticketmaster_event_path_id(normalized_ticketmaster_url)
                # ticketmaster_event_id intentionally remains the public storefront
                # URL path id used by /api/out. A separate
                # ticketmaster_discovery_event_id may be present for Discovery API
                # sync and is not required to appear in the storefront URL.
                if path_event_id is not None:
                    if path_event_id != normalized_ticketmaster_event_id and normalized_ticketmaster_event_id not in normalized_ticketmaster_url:
                        errors.append(
                            f"{prefix}.ticketmaster_event_id: event id '{event_id if isinstance(event_id, str) and event_id.strip() else f'index {i}'}', "
                            f"artist_slug '{slug.strip() if isinstance(slug, str) else ''}', "
                            f"ticketmaster_event_id '{normalized_ticketmaster_event_id}' must match /event/ segment '{path_event_id}' "
                            f"or appear in ticketmaster_url '{normalized_ticketmaster_url}'"
                        )
                elif normalized_ticketmaster_event_id not in normalized_ticketmaster_url:
                    errors.append(
                        f"{prefix}.ticketmaster_event_id: event id '{event_id if isinstance(event_id, str) and event_id.strip() else f'index {i}'}', "
                        f"artist_slug '{slug.strip() if isinstance(slug, str) else ''}', "
                        f"ticketmaster_event_id '{normalized_ticketmaster_event_id}' must appear in ticketmaster_url '{normalized_ticketmaster_url}'"
                    )

        if args.require_affiliate_urls:
            for url_field in ("ticketmaster_url", "seatgeek_url", "vividseats_url"):
                value = event.get(url_field)
                if not isinstance(value, str) or value.strip() == "":
                    errors.append(f"{prefix}.{url_field}: required when --require-affiliate-urls is set")

    if blank_tour_name_by_slug:
        total_blank = sum(len(v) for v in blank_tour_name_by_slug.values())
        print(
            f"WARNING: blank tour_name on indexed artist events "
            f"({total_blank} event(s) across {len(blank_tour_name_by_slug)} artist(s)). "
            "Populate from a verified source or mark the event verification_status=needs_recheck. "
            "Do not infer tour names from URL slugs.",
            file=sys.stderr,
        )
        for slug_value in sorted(blank_tour_name_by_slug):
            ids_for_slug = blank_tour_name_by_slug[slug_value]
            sample = ", ".join(ids_for_slug[:5])
            extra = "" if len(ids_for_slug) <= 5 else f", +{len(ids_for_slug) - 5} more"
            print(f"  - {slug_value}: {len(ids_for_slug)} event(s) (e.g. {sample}{extra})", file=sys.stderr)
        if args.strict_tour_name:
            print(
                "STRICT TOUR_NAME CHECK FAILED: --strict-tour-name requires non-blank tour_name "
                "for indexed artist events.",
                file=sys.stderr,
            )
            for slug_value in sorted(blank_tour_name_by_slug):
                print(f"  - {slug_value}: {len(blank_tour_name_by_slug[slug_value])} blank tour_name event(s)", file=sys.stderr)
            errors.append("indexed artists contain events with blank tour_name under --strict-tour-name")

    if errors:
        print("VALIDATION FAILED:", file=sys.stderr)
        for e in errors:
            print(f"- {e}", file=sys.stderr)
        return 1

    print(f"OK: {len(data)} events validated.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
