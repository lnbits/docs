<ExtensionHeader
  name="LNQ1 Arena"
  description="A paid multiplayer FPS arena where players win entry fees by scoring kills."
  category="Games & Entertainment"
  icon="🎯"
  repo="lnbits/lnq1"
  extension-type="wasm"
/>

## Overview

A paid multiplayer FPS arena where players win entry fees by scoring kills. This extension uses the core WASM runtime, with an isolated frontend and permissioned host calls.

## Compatibility

The registry release **0.1.5** requires LNbits **1.5.7** or newer. Use a compatible release from your instance's WASM marketplace. The development guides target LNbits 1.6.2.

## Setup

1. Find **LNQ1 Arena** in your instance's **Extensions** screen.
2. Check the release requirements and requested permissions, then install it.
3. Enable the extension for your account and open it from LNbits.
4. Follow its settings to configure the feature and select a wallet where required.

See the [extension README](https://github.com/lnbits/lnq1) for its specific workflow. For background payments, review the wallet, per-payment maximum, and destination policy before approval.

## Related Pages

- [LNQ1 Arena API Reference](./api): declared public and authenticated routes
- [WASM Extensions](/extensions/wasm/): browse by category
- [Using Extensions](/guide/using-extensions): installation and permissions
- [Developing WASM Extensions](/dev/extensions/wasm/): build your own
