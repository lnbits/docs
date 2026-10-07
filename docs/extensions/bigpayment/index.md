<ExtensionHeader
  name="BigPayment"
  description="Pay large Lightning invoices or LNURL-pay requests by using multiple wallets."
  category="Payments & Commerce"
  icon="💰"
  repo="lnbits/bigpayment"
  extension-type="wasm"
/>

## Overview

Pay large Lightning invoices or LNURL-pay requests by using multiple wallets. This extension uses the core WASM runtime, with an isolated frontend and permissioned host calls.

## Compatibility

The registry release **0.1.1** requires LNbits **1.5.5** or newer. Use a compatible release from your instance's WASM marketplace. The development guides target LNbits 1.6.2.

## Setup

1. Find **BigPayment** in your instance's **Extensions** screen.
2. Check the release requirements and requested permissions, then install it.
3. Enable the extension for your account and open it from LNbits.
4. Follow its settings to configure the feature and select a wallet where required.

See the [extension README](https://github.com/lnbits/bigpayment) for its specific workflow. For background payments, review the wallet, per-payment maximum, and destination policy before approval.

## Related Pages

- [BigPayment API Reference](./api): declared public and authenticated routes
- [WASM Extensions](/extensions/wasm/): browse by category
- [Using Extensions](/guide/using-extensions): installation and permissions
- [Developing WASM Extensions](/dev/extensions/wasm/): build your own
