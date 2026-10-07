<ExtensionHeader
  name="Poker"
  description="Play paid best-of-five heads-up Draw Poker with tactile cards and Lightning payouts."
  category="Games & Entertainment"
  icon="🃏"
  repo="lnbits/poker"
  extension-type="wasm"
/>

## Overview

Play paid best-of-five heads-up Draw Poker with tactile cards and Lightning payouts. This extension uses the core WASM runtime, with an isolated frontend and permissioned host calls.

## Compatibility

The registry release **0.1.2** requires LNbits **1.5.6** or newer. Use a compatible release from your instance's WASM marketplace. The development guides target LNbits 1.6.2.

## Setup

1. Find **Poker** in your instance's **Extensions** screen.
2. Check the release requirements and requested permissions, then install it.
3. Enable the extension for your account and open it from LNbits.
4. Follow its settings to configure the feature and select a wallet where required.

See the [extension README](https://github.com/lnbits/poker) for its specific workflow. For background payments, review the wallet, per-payment maximum, and destination policy before approval.

## Related Pages

- [Poker API Reference](./api): declared public and authenticated routes
- [WASM Extensions](/extensions/wasm/): browse by category
- [Using Extensions](/guide/using-extensions): installation and permissions
- [Developing WASM Extensions](/dev/extensions/wasm/): build your own
