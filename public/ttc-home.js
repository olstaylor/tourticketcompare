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
    "Choose an artist and date, see current listed prices from ticket sites where available, then check the final total with the provider.";
  const HOME_PRIMARY_CTA_LABEL = "Find a show";
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
      body: "See the current listed prices we have from ticket sites for that same date.",
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
        var label = String(link.textContent || "").trim();
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

  function loadEventIndex() {
    if (eventIndexPromise) return eventIndexPromise;
    eventIndexPromise = fetch("/data/events-index.json", { cache: "force-cache" })
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
          return { href: "/artists/" + encodeURIComponent(slug) + "#show-" + encodeURIComponent(id), label: label, search: fold(search) };
        }).filter(Boolean);
      })
      .catch(function () { return []; });
    return eventIndexPromise;
  }

  function buildIndex() {
    return loadEventIndex().then(function (events) { return buildLinkIndex().concat(events); });
  }

  async function renderResults(query) {
    var container = document.querySelector("#search-widget .search-results");
    if (!container) return;
    var term = fold(query.trim());
    container.replaceChildren();
    if (!term) return;
    var loading = document.createElement("p");
    loading.className = "muted";
    loading.textContent = "Searching checked artists, shows, and guides…";
    container.appendChild(loading);
    var matches = (await buildIndex()).filter(function (entry) { return entry.search.includes(term); }).slice(0, 12);
    container.replaceChildren();
    if (!matches.length) {
      var empty = document.createElement("p");
      empty.className = "muted";
      empty.textContent = "No checked artist, show, or guide matches that search. Browse all artists instead.";
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
      if (results) results.scrollIntoView({ behavior: "smooth", block: "start" });
    });
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
