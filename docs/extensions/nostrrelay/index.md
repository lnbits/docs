<ExtensionHeader
  name="Nostr Relay"
  description="Run a paid Nostr relay with Lightning."
  category="Social & Nostr"
  icon="📨"
  repo="lnbits/nostrrelay"
/>

## Overview

Nostr Relay lets you spin up your own Nostr relay in two clicks. Configure it as free (with storage limits) or paid (pay-to-join and pay-for-storage). Includes account allow/block lists, rate limiting, event filtering, and NIP-42 authentication support.

## Supported NIPs

- **NIP-01** — Basic protocol (regular, replaceable, ephemeral, addressable events)
- **NIP-02** — Contact list and petnames
- **NIP-04** — Encrypted direct messages (with optional auth)
- **NIP-09** — Event deletion
- **NIP-11** — Relay information document
- **NIP-15** — End of stored events notice
- **NIP-16** — Event treatment
- **NIP-20** — Command results
- **NIP-22** — Event `created_at` limits
- **NIP-28** — Public chat
- **NIP-33** — Addressable events
- **NIP-42** — Client authentication

## Features

- **Free or paid access** — configurable entry fees and storage fees
- **Storage limits** — set limits with optional paid upgrades
- **Rate limiting** — control event submission rates
- **Account management** — allow/block specific npubs
- **Optional authentication** — require NIP-42 auth for events and filters
- **Public relay page** — where users can pay entry and storage fees

## Setup

1. Enable the extension from the LNbits **Extensions** page
2. Click **New Relay** and enter relay info
3. Configure payment options (free or paid), storage limits, and rate limits
4. Optionally enable NIP-42 authentication
5. Share the relay URL with users

## API Reference

See the [Nostr Relay API documentation](./api) for endpoint details.

## Related Pages

- [Nostr Relay API Reference](./api): API endpoints for this extension
- [Nostr Client](/extensions/nostrclient/): Relay multiplexer
- [Nostr NIP-5](/extensions/nostrnip5/): NIP-05 verification
- [All Extensions](/extensions/): Browse all LNbits extensions
