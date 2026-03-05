<ExtensionHeader
  name="NWC Provider"
  description="Serve as a Nostr Wallet Connect provider."
  category="Wallet Tools"
  icon="📡"
  repo="lnbits/nwcprovider"
/>

## Overview

NWC Provider turns your LNbits wallet into a [Nostr Wallet Connect](https://nwc.dev/) service provider. Connect any NWC-compatible app (like Alby, Amethyst, or Damus) to your LNbits wallet via a pairing URL or QR code. Supports configurable permissions, spending limits, and expiry dates per connection.

## Features

- **NWC protocol** — standard Nostr Wallet Connect implementation
- **Per-connection permissions** — control what each app can do
- **Spending limits** — set maximum amounts per connection
- **Expiry dates** — connections expire automatically
- **Pairing URL and QR** — easy connection via URL or QR scan
- **Third-party relay support** — use any public Nostr relay (recommended)
- **Nostrclient integration** — alternatively use the Nostr Client extension as relay

## Setup

1. Enable the extension from the LNbits **Extensions** page
2. Configure a Nostr relay:
   - **Option 1 (recommended):** Open settings (gear icon) and enter a public relay URL (e.g., `wss://relay.nostrconnect.com`)
   - **Option 2:** Use the [Nostr Client](/extensions/nostrclient/) extension (requires public LNbits URL)
3. Select a wallet and click **+** to add a connection
4. Set description, permissions, limits, and expiry
5. Share the pairing URL or QR code with the app

## Use Cases

- **Mobile wallets** — connect Amethyst or Damus to your LNbits wallet
- **Browser extensions** — use Alby with your LNbits backend
- **App integrations** — any NWC-compatible app can access your wallet
- **Controlled access** — give apps limited, time-bound permissions

## API Reference

See the [NWC Provider API documentation](./api) for endpoint details.

## Related Pages

- [NWC Provider API Reference](./api): API endpoints for this extension
- [Nostr Client](/extensions/nostrclient/): Nostr relay multiplexer
- [LndHub](/extensions/lndhub/): Alternative wallet access protocol
- [All Extensions](/extensions/): Browse all LNbits extensions
