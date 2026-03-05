<ExtensionHeader
  name="Watch Only"
  description="Monitor on-chain wallets via xpub/zpub without spending keys."
  category="Wallet Tools"
  icon="👁️"
  repo="lnbits/watchonly"
/>

## Overview

Watch Only lets you import your Bitcoin extended public keys (xpub, ypub, zpub) to monitor on-chain balances and generate fresh receive addresses — all without exposing your private keys. Combined with the SatsPay extension, you can create on-chain payment pages directly from your watch-only wallet.

## Features

- **Import xpub/ypub/zpub** — monitor any BIP32/44/49/84 wallet
- **Address generation** — derive fresh receive addresses from your extended public key
- **Balance monitoring** — track on-chain balances and UTXOs
- **Multi-wallet support** — import multiple wallets
- **SatsPay integration** — use generated addresses for on-chain payment pages
- **No private keys** — your spending keys never touch the server

## Setup

1. Enable the extension from the LNbits **Extensions** page
2. Click **Add Watch-Only Account** and paste your xpub/ypub/zpub
3. Give it a label for easy identification
4. Fresh addresses are derived automatically as needed

## Use Cases

- **Cold storage monitoring** — check balances without exposing keys
- **On-chain payments** — generate receive addresses for SatsPay invoices
- **Accounting** — track incoming on-chain payments
- **Multi-sig coordination** — monitor multi-sig wallet balances

## API Reference

See the [Watch Only API documentation](./api) for endpoint details.

## Related Pages

- [Watch Only API Reference](./api): API endpoints for this extension
- [SatsPay](/extensions/satspay/): Create payment pages with on-chain support
- [All Extensions](/extensions/): Browse all LNbits extensions
