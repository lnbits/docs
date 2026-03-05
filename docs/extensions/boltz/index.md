<ExtensionHeader
  name="Boltz"
  description="Submarine and reverse submarine swaps (on-chain ↔ Lightning)."
  category="Swaps"
  icon="🔄"
  repo="lnbits/boltz"
/>

## Overview

The Boltz extension lets you perform submarine swaps (on-chain to Lightning) and reverse submarine swaps (Lightning to on-chain) directly from LNbits. Supported chains are Bitcoin mainnet and Liquid. All swaps are non-custodial — your funds are protected by on-chain contracts.

## Features

- **Swap In** (on-chain → Lightning) — convert on-chain Bitcoin to Lightning sats
- **Swap Out** (Lightning → on-chain) — convert Lightning to on-chain Bitcoin
- **Liquid support** — swap between Lightning and Liquid
- **Auto cash out** — automatically convert Lightning to on-chain when your balance reaches a set amount
- **Automatic refunds** — failed swaps are refunded automatically (checked every 15 minutes)
- **Instant settlement** — optionally claim funds from the mempool before confirmation
- **Refund file export** — download refund files for manual recovery via boltz.exchange

## Setup

1. Enable the extension from the LNbits **Extensions** page
2. To swap in (on-chain → Lightning):
   - Click **Swap (IN)**, select a wallet, set amount, enter a refund address
   - Send the exact amount of on-chain Bitcoin to the displayed address
   - Boltz pays your Lightning invoice automatically
3. To swap out (Lightning → on-chain):
   - Click **Swap (OUT)**, select a wallet, set amount, enter a receive address
   - The extension pays the Lightning invoice and sends on-chain Bitcoin

## Use Cases

- **Inbound liquidity** — swap on-chain BTC for Lightning to open inbound channels
- **Cold storage** — move Lightning earnings to on-chain cold storage
- **Exchange deposits** — send to exchanges that only accept on-chain
- **Liquid bridge** — move funds between Lightning and Liquid

## API Reference

See the [Boltz API documentation](./api) for endpoint details.

## Related Pages

- [Boltz API Reference](./api): API endpoints for this extension
- [Deezy](/extensions/deezy/): Alternative swap service
- [Watch Only](/extensions/watchonly/): Monitor on-chain wallets
- [All Extensions](/extensions/): Browse all LNbits extensions
