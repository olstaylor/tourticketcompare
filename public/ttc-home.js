/* Homepage-only progressive enhancement. The server-rendered #ttc-main is the
   final visual DOM: this module never clears or replaces it and makes no
   catalogue request. Search starts with links already present in the HTML and
   loads the purpose-built lightweight event index only after LCP/idle or when
   a visitor searches. */
(function () {
  "use strict";

  // >>> homepage-proposition >>>
  const HOME_HEADLINE = "Compare ticket prices for the show you want.";
  const HOME_SUBCOPY =
    "Choose an artist and date, see each ticket site's listed price where available, then check the final total on the ticket site.";
  const HOME_PRIMARY_CTA_LABEL = "Compare a show";
  const HOME_PRIMARY_CTA_HREF = "/artists";
  const HOME_STEPS = [
    {
      title: "1. Find a show",
      body: "Choose an artist and pick the date you want to go to.",
      ctaLabel: "Browse artists",
      href: "/artists"
    },
    {
      title: "2. Compare ticket prices",
      body: "See each ticket site's listed price for that same date.",
      ctaLabel: "Compare ticket prices",
      href: "/compare-concert-ticket-prices"
    },
    {
      title: "3. Check the total",
      body: "Open the ticket site to check the final total, the fees, and what is included.",
      ctaLabel: "Read the guide",
      href: "/guides/how-to-compare-concert-ticket-prices"
    }
  ];
  // <<< homepage-proposition <<<

  var proposition = Object.freeze({
    headline: HOME_HEADLINE,
    subcopy: HOME_SUBCOPY,
    label: HOME_PRIMARY_CTA_LABEL,
    href: HOME_PRIMARY_CTA_HREF,
    steps: HOME_STEPS
  });
  var linkIndex = null;
  var eventIndexPromise = null;

  function fold(value) {
    return String(value || "").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function buildLinkIndex() {
    if (linkIndex) return linkIndex;
    var seen = new Set();
    linkIndex = Array.from(document.querySelectorAll("#ttc-main a[href]"))
      .map(function (link) {
        var href = String(link.getAttribute("href") || "");
        // Homepage artist rows carry a name and a facts line; index the name.
        var nameEl = link.querySelector(".home-artist__name");
        var label = String((nameEl || link).textContent || "").trim();
        if (!label || !/^\/(artists|guides|cities|venues)(?:\/|$)/.test(href)) return null;
        var key = href + "|" + label;
        if (seen.has(key)) return null;
        seen.add(key);
        return { href: href, label: label, search: fold(label + " " + href.replace(/[\/-]+/g, " ")) };
      })
      .filter(Boolean);
    return linkIndex;
  }

  function eventDate(record) {
    var iso = String(record.datetime_iso || record.dateTimeISO || "");
    var value = Date.parse(iso);
    if (!Number.isFinite(value)) return "";
    try {
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: String(record.timezone || "UTC")
      }).format(new Date(value));
    } catch (error) { return ""; }
  }

  // Search results are truncated to a fixed count after filtering, so whatever
  // order this array is in decides which matching dates a visitor is shown.
  // Left unsorted that was the order of events-index.json — a generated file
  // whose order is an artefact of how events.json happens to be arranged, not a
  // judgement about what is most useful. Soonest first is that judgement, and it
  // matches what public/app.js already does for the same records
  // (sortEventsForSearch). Past dates are filtered out above, so ascending time
  // is "upcoming, soonest first" with no further cases to handle.
  //
  // The id tiebreak matters: several artists commonly play the same night, and
  // without it those rows would fall back to file order and reintroduce exactly
  // the dependency this removes.
  function compareByDateThenId(a, b) {
    if (a.when !== b.when) return a.when - b.when;
    if (a.id === b.id) return 0;
    return a.id < b.id ? -1 : 1;
  }

  function loadEventIndex() {
    if (eventIndexPromise) return eventIndexPromise;
    eventIndexPromise = fetch("/data/events-index.json")
      .then(function (response) { return response.ok ? response.json() : []; })
      .then(function (records) {
        var now = Date.now();
        return (Array.isArray(records) ? records : []).map(function (record) {
          var slug = String(record.artist_slug || "").trim();
          var id = String(record.id || "").trim();
          var dateValue = Date.parse(String(record.datetime_iso || record.dateTimeISO || ""));
          if (!slug || !id || !Number.isFinite(dateValue) || dateValue < now || record.status === "cancelled") return null;
          var artist = String(record.artist_name || slug.replace(/-/g, " ")).trim();
          var place = [record.city, record.venue].map(function (value) { return String(value || "").trim(); }).filter(Boolean).join(" · ");
          var label = [artist, place, eventDate(record)].filter(Boolean).join(" — ");
          var search = [artist, record.event_name, record.tour_name, record.city, record.country, record.venue, eventDate(record)].join(" ");
          return {
            href: "/artists/" + encodeURIComponent(slug) + "#show-" + encodeURIComponent(id),
            label: label,
            search: fold(search),
            when: dateValue,
            id: id,
            slug: slug,
            artist: artist,
            city: String(record.city || "").trim(),
            country: normalizeCountry(record.country),
            venue: String(record.venue || "").trim()
          };
        }).filter(Boolean).sort(compareByDateThenId);
      })
      .catch(function () { return []; });
    return eventIndexPromise;
  }

  // Same slug rules as functions/_cities.js (citySlug) and functions/_venues.js
  // (venueSlug). Every city and venue with an upcoming date has a page; the
  // router 301s a suburb or aliased spelling to the page that carries it.
  function slugify(value) {
    return String(value || "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  }

  var COUNTRY_ALIASES = { us: "United States", usa: "United States", "united states of america": "United States", uk: "United Kingdom", "great britain": "United Kingdom" };

  function normalizeCountry(value) {
    var raw = String(value || "").trim();
    return COUNTRY_ALIASES[raw.toLowerCase()] || raw;
  }

  function datesLabel(count) {
    return count + (count === 1 ? " date" : " dates");
  }

  // One entry per artist, city and venue that has upcoming dates, so a search
  // for "london" or "madison square garden" offers that page first instead of
  // only a list of single dates. Built from the same records as the date rows.
  var hubIndex = null;

  function buildHubIndex(events) {
    if (hubIndex) return hubIndex;
    var hubs = new Map();
    function add(key, href, name, search) {
      var hub = hubs.get(key);
      if (!hub) {
        hub = { href: href, name: name, search: fold(search), count: 0 };
        hubs.set(key, hub);
      }
      hub.count += 1;
    }
    events.forEach(function (event) {
      add("a|" + event.slug, "/artists/" + encodeURIComponent(event.slug), event.artist, event.artist);
      if (event.city && event.country) {
        var city = slugify(event.city + " " + event.country);
        if (city) add("c|" + city, "/cities/" + city, "Concerts in " + event.city + ", " + event.country, event.city + " " + event.country);
      }
      if (event.venue && event.city) {
        var venue = slugify(event.venue + " " + event.city);
        if (venue) add("v|" + venue, "/venues/" + venue, event.venue + ", " + event.city, event.venue + " " + event.city);
      }
    });
    hubIndex = Array.from(hubs.values()).map(function (hub) {
      return { href: hub.href, label: hub.name + " · " + datesLabel(hub.count), search: hub.search, hub: true };
    });
    return hubIndex;
  }

  // Artist, city and venue pages first, then guides and other page links,
  // then single dates. A homepage link to a page the hubs already offer is
  // dropped so the same artist is not listed twice.
  function buildIndex() {
    return loadEventIndex().then(function (events) {
      var hubs = buildHubIndex(events);
      var hubHrefs = new Set(hubs.map(function (hub) { return hub.href; }));
      var links = buildLinkIndex().filter(function (entry) { return !hubHrefs.has(entry.href); });
      return hubs.concat(links, events);
    });
  }

  // Results render directly under the search field, and the section stays
  // hidden until there is a query, so an idle homepage carries no empty
  // "results" block between the search and the artist list.
  var searchSeq = 0;

  async function renderResults(query) {
    var container = document.querySelector("#search-widget .search-results");
    if (!container) return;
    var section = document.getElementById("search-widget");
    var term = fold(query.trim());
    var seq = ++searchSeq;
    container.replaceChildren();
    if (!term) {
      section.hidden = true;
      return;
    }
    section.hidden = false;
    var loading = document.createElement("p");
    loading.className = "muted";
    loading.textContent = "Searching checked artists, shows, and guides…";
    container.appendChild(loading);
    // Every word must match somewhere, so "olivia rodrigo chicago" finds the
    // date even though the tour name sits between artist and city.
    var words = term.split(/\s+/).filter(Boolean);
    // At most six pages, so a broad word such as "united" still leaves room
    // for dates.
    var hubCount = 0;
    var matches = (await buildIndex()).filter(function (entry) {
      if (!words.every(function (word) { return entry.search.includes(word); })) return false;
      if (entry.hub && ++hubCount > 6) return false;
      return true;
    }).slice(0, 12);
    // A later keystroke has already started its own search; drop this one.
    if (seq !== searchSeq) return;
    container.replaceChildren();
    if (!matches.length) {
      var empty = document.createElement("p");
      empty.className = "muted";
      empty.append("No checked artist, show, or guide matches that search. ");
      var browse = document.createElement("a");
      browse.href = "/artists";
      browse.textContent = "Browse all artists";
      empty.append(browse, " instead.");
      container.appendChild(empty);
      return;
    }
    var list = document.createElement("div");
    list.className = "mini-link-grid";
    matches.forEach(function (entry) {
      var link = document.createElement("a");
      link.className = "mini-link";
      link.href = entry.href;
      link.textContent = entry.label;
      list.appendChild(link);
    });
    container.appendChild(list);
  }

  function boot() {
    var main = document.getElementById("ttc-main");
    var form = main && main.querySelector(".hero-search-form");
    var input = form && form.querySelector("input[type=search]");
    if (!main || !form || !input) return;
    main.dataset.homeEnhanced = "true";
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      renderResults(input.value);
      var results = document.getElementById("search-widget");
      if (results) results.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
    // Search as you type (debounced), so a visitor sees their artist or show
    // without pressing Search. Clearing the field runs the empty-query path
    // at once, which hides the results section; the `search` event covers the
    // native clear button on input[type=search].
    var typingTimer = 0;
    var handleInput = function () {
      window.clearTimeout(typingTimer);
      if (!input.value.trim()) {
        renderResults("");
        return;
      }
      typingTimer = window.setTimeout(function () { renderResults(input.value); }, 180);
    };
    input.addEventListener("input", handleInput);
    input.addEventListener("search", handleInput);
    var query = new URLSearchParams(window.location.search).get("q");
    if (query) {
      input.value = query;
      renderResults(query);
    }
    var prepare = function () { buildLinkIndex(); loadEventIndex(); };
    if ("requestIdleCallback" in window) window.requestIdleCallback(prepare, { timeout: 2000 });
    else window.setTimeout(prepare, 1200);
    // Keeps the parity contract live without rewriting server-rendered copy.
    if (!proposition.headline || proposition.steps.length !== 3) throw new Error("Homepage proposition unavailable");
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot, { once: true });
  else boot();
})();
