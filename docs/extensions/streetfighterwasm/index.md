<ExtensionHeader
  name="StreetFighter"
  description="Create paid public StreetFighter matches where the winner takes the pot."
  category="Games & Entertainment"
  icon="🥊"
  repo="lnbits/streetfighterwasm"
  extension-type="wasm"
/>

## Overview

Create paid public StreetFighter matches where the winner takes the pot. This extension uses the core WASM runtime, with an isolated frontend and permissioned host calls.

## Compatibility

The registry release **0.1.6** requires LNbits **1.5.7** or newer. Use a compatible release from your instance's WASM marketplace. The development guides target LNbits 1.6.2.

## Setup

1. Find **StreetFighter** in your instance's **Extensions** screen.
2. Check the release requirements and requested permissions, then install it.
3. Enable the extension for your account and open it from LNbits.
4. Follow its settings to configure the feature and select a wallet where required.

See the [extension README](https://github.com/lnbits/streetfighterwasm) for its specific workflow. For background payments, review the wallet, per-payment maximum, and destination policy before approval.

## Related Pages

- [StreetFighter API Reference](./api): declared public and authenticated routes
- [WASM Extensions](/extensions/wasm/): browse by category
- [Using Extensions](/guide/using-extensions): installation and permissions
- [Developing WASM Extensions](/dev/extensions/wasm/): build your own
