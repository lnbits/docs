<ExtensionHeader
  name="PopMenu"
  description="A lightweight QR menu, Lightning checkout, and order queue."
  category="Payments & Commerce"
  icon="🍽️"
  repo="lnbits/popmenu"
  extension-type="wasm"
/>

## Overview

A lightweight QR menu, Lightning checkout, and order queue. This extension uses the core WASM runtime, with an isolated frontend and permissioned host calls.

## Compatibility

The registry lists release **0.1.0** without a minimum LNbits version. Check its release notes and test compatibility before installing. Use a compatible release from your instance's WASM marketplace. The development guides target LNbits 1.6.2.

## Setup

1. Find **PopMenu** in your instance's **Extensions** screen.
2. Check the release requirements and requested permissions, then install it.
3. Enable the extension for your account and open it from LNbits.
4. Follow its settings to configure the feature and select a wallet where required.

See the [extension README](https://github.com/lnbits/popmenu) for its specific workflow. For background payments, review the wallet, per-payment maximum, and destination policy before approval.

## Related Pages

- [PopMenu API Reference](./api): declared public and authenticated routes
- [WASM Extensions](/extensions/wasm/): browse by category
- [Using Extensions](/guide/using-extensions): installation and permissions
- [Developing WASM Extensions](/dev/extensions/wasm/): build your own
