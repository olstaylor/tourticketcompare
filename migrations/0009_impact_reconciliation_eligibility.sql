-- Records whether the outbound click ID was actually inserted into the
-- affiliate URL. Existing rows remain NULL: they were never verified as
-- Impact-reconcilable and must not be counted as such retroactively.
ALTER TABLE analytics_events ADD COLUMN impact_reconciliation_eligible INTEGER;
