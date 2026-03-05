<ExtensionHeader
  name="LndHub"
  description="LndHub-compatible interface for BlueWallet and Zeus."
  category="Wallet Tools"
  icon="🔐"
  repo="lnbits/lndhub"
/>

## Overview

LndHub provides an LndHub-compatible HTTP/JSON interface for your LNbits wallets. This lets you connect mobile wallet apps like BlueWallet, Zeus, and BitBanana to your LNbits wallet — giving you a familiar mobile experience backed by your own LNbits instance. Despite the name, LndHub has nothing to do with LND — it's just the name of the protocol.

## Features

- **BlueWallet support** — import your LNbits wallet into BlueWallet
- **Zeus support** — connect Zeus to your LNbits wallet
- **Invoice QR** — share read-only access (receive only) with staff
- **Admin QR** — full access including sending payments
- **Standard protocol** — compatible with any LndHub-supporting app

## Setup

1. Enable the extension from the LNbits **Extensions** page
2. Open LndHub from the sidebar
3. Scan the QR code with your mobile wallet:
   - **Invoice QR** — allows generating invoices and receiving sats only (e.g., for waiters)
   - **Admin QR** — full access to send and receive

## Use Cases

- **Mobile wallet** — use BlueWallet or Zeus with your LNbits backend
- **Staff access** — give waiters or employees invoice-only access
- **Self-sovereign mobile** — use a familiar wallet app backed by your own node

## API Reference

See the [LndHub API documentation](./api) for endpoint details.

## Related Pages

- [LndHub API Reference](./api): API endpoints for this extension
- [API Keys](/guide/core/api-keys): Admin vs Invoice key permissions
- [All Extensions](/extensions/): Browse all LNbits extensions
