#!/usr/bin/env node

/**
 * Validate provider data structures
 *
 * Checks:
 * - catalog.json v3 provider definitions are complete
 * - provider-configs.json has all required providers
 * - events.json has provider_links scaffolding
 * - No contradictory settings (e.g., public_enabled but no hosts)
 *
 * Safe checks only — does not validate against external APIs
 */

import fs from "fs";
import path from "path";

const CATALOG_FILE = path.join(process.cwd(), "public/data/catalog.json");
const CONFIG_FILE = path.join(process.cwd(), "public/data/provider-configs.json");
const EVENTS_FILE = path.join(process.cwd(), "public/data/events.json");

let errorCount = 0;
let warningCount = 0;

function error(msg) {
  console.error(`✗ ERROR: ${msg}`);
  errorCount++;
}

function warning(msg) {
  console.warn(`⚠ WARNING: ${msg}`);
  warningCount++;
}

function info(msg) {
  console.log(`ℹ ${msg}`);
}

async function validateCatalog() {
  info("Validating catalog.json...");

  try {
    const content = fs.readFileSync(CATALOG_FILE, "utf8");
    const data = JSON.parse(content);

    if (data.version !== 3) {
      error(`catalog.json version should be 3, got ${data.version}`);
    }

    if (!Array.isArray(data.providers)) {
      error("catalog.json.providers is not an array");
      return;
    }

    if (data.providers.length === 0) {
      error("catalog.json.providers is empty");
      return;
    }

    const providers = new Set();
    for (const provider of data.providers) {
      if (!provider.slug) {
        error("Provider missing slug");
        continue;
      }

      if (providers.has(provider.slug)) {
        error(`Duplicate provider slug: ${provider.slug}`);
        continue;
      }
      providers.add(provider.slug);

      // Validate structure
      if (!provider.name) error(`Provider ${provider.slug}: missing name`);
      if (!provider.provider_type) error(`Provider ${provider.slug}: missing provider_type`);
      if (!Array.isArray(provider.allowed_destination_hosts)) {
        error(`Provider ${provider.slug}: allowed_destination_hosts is not an array`);
      }
      if (!Array.isArray(provider.trusted_affiliate_hosts)) {
        error(`Provider ${provider.slug}: trusted_affiliate_hosts is not an array`);
      }

      // Validate contradictions
      if (provider.public_enabled && provider.allowed_destination_hosts.length === 0) {
        warning(`Provider ${provider.slug}: public_enabled=true but no allowed_destination_hosts`);
      }

      if (!provider.api_config) {
        warning(`Provider ${provider.slug}: missing api_config`);
      }

      if (!provider.contact) {
        warning(`Provider ${provider.slug}: missing contact information`);
      }
    }

    info(`✓ Catalog valid: ${providers.size} providers`);
  } catch (error) {
    error(`Failed to read/parse catalog.json: ${error.message}`);
  }
}

async function validateProviderConfigs() {
  info("Validating provider-configs.json...");

  try {
    const content = fs.readFileSync(CONFIG_FILE, "utf8");
    const data = JSON.parse(content);

    if (data.version !== 1) {
      warning(`provider-configs.json version is ${data.version}, expected 1`);
    }

    if (!data.provider_credentials || typeof data.provider_credentials !== "object") {
      error("provider-configs.json.provider_credentials is missing or not an object");
      return;
    }

    if (!data.pricing_display_rules) {
      warning("provider-configs.json.pricing_display_rules is missing");
    }

    if (!data.cache_settings) {
      warning("provider-configs.json.cache_settings is missing");
    }

    const configProviders = new Set(Object.keys(data.provider_credentials));
    info(`✓ Config valid: ${configProviders.size} provider configs`);

    // Check that pricing is disabled (safety)
    if (data.pricing_display_rules?.enabled === true) {
      error("Pricing display is enabled! This should only be true after verification.");
    }
  } catch (error) {
    error(`Failed to read/parse provider-configs.json: ${error.message}`);
  }
}

async function validateEvents() {
  info("Validating events.json provider_links...");

  try {
    const content = fs.readFileSync(EVENTS_FILE, "utf8");
    const events = JSON.parse(content);

    if (!Array.isArray(events)) {
      error("events.json is not an array");
      return;
    }

    let enrichedCount = 0;
    let missingLinksCount = 0;

    for (const event of events) {
      if (event.provider_links) {
        enrichedCount++;

        // Validate structure
        if (!event.provider_links.ticketmaster) {
          error(`Event ${event.id}: missing provider_links.ticketmaster`);
        }

        // Check that Ticketmaster links match
        const tmLink = event.provider_links.ticketmaster;
        if (event.ticketmaster_url && !tmLink.url) {
          error(`Event ${event.id}: Ticketmaster URL not copied to provider_links`);
        }
      } else {
        missingLinksCount++;
      }
    }

    if (missingLinksCount > 0) {
      warning(
        `${missingLinksCount} events missing provider_links — add the provider_links structure to those event records`
      );
    } else {
      info(`✓ All ${enrichedCount} events have provider_links`);
    }
  } catch (error) {
    error(`Failed to read/parse events.json: ${error.message}`);
  }
}

async function main() {
  console.log("=== Provider Structure Validation ===\n");

  await validateCatalog();
  console.log();

  await validateProviderConfigs();
  console.log();

  await validateEvents();
  console.log();

  console.log("=== Summary ===");
  if (errorCount === 0 && warningCount === 0) {
    console.log("✓ All checks passed!");
    process.exit(0);
  } else {
    console.log(`${errorCount} errors, ${warningCount} warnings`);
    process.exit(errorCount > 0 ? 1 : 0);
  }
}

main();
