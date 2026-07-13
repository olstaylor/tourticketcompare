-- Authorized Ticketmaster/SeatGeek public event-page lowest-price snapshots.
-- Adds the exact source URL to the shared cache/history schema and creates the
-- durable retrieval ledger used to enforce one retrieval per event/provider
-- in any rolling 24-hour window. The ledger stores only fields permitted by
-- the written approvals: lowest price (nullable), currency, event URL and
-- retrieval timestamp, plus local/provider identifiers and source attribution.

ALTER TABLE provider_pricing_cache ADD COLUMN source_url TEXT;
ALTER TABLE provider_pricing_history ADD COLUMN source_url TEXT;

CREATE TABLE IF NOT EXISTS provider_page_retrievals (
  id TEXT PRIMARY KEY,
  event_id TEXT NOT NULL,
  artist_slug TEXT NOT NULL,
  provider TEXT NOT NULL CHECK (provider IN ('ticketmaster', 'seatgeek')),
  low_price REAL CHECK (low_price IS NULL OR low_price > 0),
  currency TEXT CHECK (currency IS NULL OR (length(currency) = 3 AND currency = upper(currency))),
  source TEXT NOT NULL CHECK (
    (provider = 'ticketmaster' AND source = 'ticketmaster_authorized_event_page') OR
    (provider = 'seatgeek' AND source = 'seatgeek_authorized_event_page')
  ),
  source_url TEXT NOT NULL,
  retrieved_at TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_provider_page_retrievals_event_provider_time
  ON provider_page_retrievals(event_id, provider, retrieved_at);
CREATE INDEX IF NOT EXISTS idx_provider_page_retrievals_provider_time
  ON provider_page_retrievals(provider, retrieved_at);
