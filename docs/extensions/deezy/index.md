<ExtensionHeader
  name="Deezy"
  description="On-chain ↔ Lightning swaps via Deezy."
  category="Swaps"
  icon="🔁"
  repo="lnbits/deezy"
/>

## Overview

Deezy integrates the [Deezy.io](https://deezy.io) swap service into LNbits. Swap Lightning bitcoin for on-chain bitcoin to get inbound liquidity, or generate an on-chain deposit address for your Lightning Address. All swaps go through the Deezy service.

## Features

- **Lightning → on-chain** — swap Lightning sats for on-chain BTC
- **On-chain → Lightning** — generate an on-chain deposit address for your Lightning wallet
- **Inbound liquidity** — get inbound capacity by swapping out
- **Simple interface** — straightforward swap UI in LNbits

## Setup

1. Enable the extension from the LNbits **Extensions** page
2. Select your wallet and choose the swap direction
3. Follow the on-screen instructions to complete the swap

## Use Cases

- **Inbound liquidity** — swap out to get inbound Lightning capacity
- **On-chain deposits** — accept on-chain payments into your Lightning wallet
- **Cold storage** — move Lightning funds to on-chain cold storage

## API Reference

See the [Deezy API documentation](./api) for endpoint details.

## Related Pages

- [Deezy API Reference](./api): API endpoints for this extension
- [Boltz](/extensions/boltz/): Alternative swap service with Liquid support
- [All Extensions](/extensions/): Browse all LNbits extensions
