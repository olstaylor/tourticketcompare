const statusEl = document.getElementById("status");
const showsEl = document.getElementById("shows");

function formatDate(iso) {
  const date = new Date(iso);
  return date.toLocaleString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit"
  });
}

function formatPrice(price, currency) {
  if (price == null) return "Unavailable";
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currency || "USD",
    maximumFractionDigits: 0
  }).format(price);
}

function formatTimestamp(iso) {
  if (!iso) return "Unknown";
  const date = new Date(iso);
  return date.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit"
  });
}

function renderShow(show) {
  const card = document.createElement("article");
  card.className = "show-card";

  const header = document.createElement("div");
  header.className = "show-header";
  header.innerHTML = `
    <h2>${formatDate(show.dateTimeISO)}</h2>
    <div class="show-sub">${show.city} · ${show.venue}</div>
  `;

  const prices = document.createElement("div");
  prices.className = "prices";

  show.prices.forEach((price) => {
    const row = document.createElement("div");
    row.className = "price-row";

    const provider = document.createElement("div");
    provider.innerHTML = `<strong>${price.provider}</strong>`;

    const detail = document.createElement("div");
    const priceText = formatPrice(price.price, price.currency);
    const updated = formatTimestamp(price.fetchedAt);
    detail.innerHTML = `
      <div>${priceText}</div>
      <div class="price-meta">Last updated ${updated}</div>
    `;

    const link = document.createElement("div");
    link.className = "price-link";
    if (price.url) {
      link.innerHTML = `<a href="${price.url}" target="_blank" rel="noopener">View tickets</a>`;
    } else {
      link.textContent = "No listings";
    }

    row.appendChild(provider);
    row.appendChild(detail);
    row.appendChild(link);
    prices.appendChild(row);
  });

  card.appendChild(header);
  card.appendChild(prices);
  return card;
}

async function loadShows() {
  try {
    const res = await fetch("/api/shows");
    const data = await res.json();

    const shows = data.shows
      .slice()
      .sort((a, b) => new Date(a.dateTimeISO) - new Date(b.dateTimeISO));

    statusEl.textContent = `Loaded ${shows.length} shows. Cache TTL: ${data.cacheTtlMinutes} minutes. Mock mode: ${data.mockMode ? "ON" : "OFF"}.`;

    showsEl.innerHTML = "";
    shows.forEach((show) => {
      showsEl.appendChild(renderShow(show));
    });
  } catch (err) {
    statusEl.textContent = "Failed to load shows. Please try again later.";
    console.error(err);
  }
}

loadShows();
