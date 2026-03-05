<ExtensionHeader
  name="Nostr Client"
  description="Always-on Nostr relay multiplexer."
  category="Social & Nostr"
  icon="🔀"
  repo="lnbits/nostrclient"
/>

## Overview

Nostr Client simplifies connecting to multiple Nostr relays. Instead of your Nostr client managing connections to dozens of relays, you connect to a single WebSocket endpoint provided by this extension. It fans out your requests to all configured relays and aggregates the responses back to you.

## How It Works

```
Client A ──┐                    ┌── Relay A
Client B ──┤── nostrclient ─────┤── Relay B
Client C ──┘    (router)        ├── Relay C
                                └── Relay D
```

1. Your Nostr client connects to the nostrclient WebSocket endpoint
2. Subscription IDs are rewritten to prevent conflicts between clients
3. Requests are fanned out to all configured relays
4. Events from all relays are deduplicated and sent back to your client

## Features

- **Multi-relay multiplexing** — one WebSocket connection instead of many
- **Public and private endpoints** — configurable access control
- **Automatic reconnection** — failed relays are retried with exponential backoff
- **Event deduplication** — events are deduplicated before delivery
- **Health monitoring** — track relay status, latency, and error rates
- **Test endpoint** — verify your setup is working

## WebSocket Endpoints

- **Public**: `/api/v1/relay` — available to anyone (if enabled)
- **Private**: `/api/v1/{encrypted_id}` — requires valid endpoint ID

## Setup

1. Enable the extension from the LNbits **Extensions** page
2. Add Nostr relays in the extension UI
3. Configure public and/or private WebSocket access
4. Connect your Nostr clients to the nostrclient endpoint

## API Reference

See the [Nostr Client API documentation](./api) for endpoint details.

## Related Pages

- [Nostr Client API Reference](./api): API endpoints for this extension
- [Nostr Market](/extensions/nostrmarket/): Nostr-based marketplace
- [Nostr NIP-5](/extensions/nostrnip5/): Nostr NIP-05 verification
- [Nostr Relay](/extensions/nostrrelay/): Run a paid Nostr relay
- [All Extensions](/extensions/): Browse all LNbits extensions
