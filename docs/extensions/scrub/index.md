<ExtensionHeader
  name="Scrub"
  description="Forward all incoming payments to an external wallet."
  category="Wallet Tools"
  icon="🧹"
  repo="lnbits/scrub"
/>

## Overview

Scrub automatically forwards every payment received by an LNbits wallet to an external wallet via LNURL-pay or Lightning Address. This lets you use all of LNbits' features (extensions, APIs, payment pages) while keeping your funds in your own self-custodial wallet.

## Features

- **Auto-forwarding** — every incoming payment is immediately forwarded
- **LNURL-pay support** — forward to any LNURL-pay endpoint
- **Lightning Address** — forward to any Lightning Address
- **Per-wallet configuration** — one scrub link per wallet
- **Editable** — change or remove the scrub target at any time

::: tip
Only whole sats are forwarded. Fractional amounts (e.g., 6.3 sats becomes 6 sats) are kept in your LNbits wallet.
:::

## Setup

1. Enable the extension from the LNbits **Extensions** page
2. Click **New Scrub Link**:
   - Select the wallet to scrub
   - Add a description
   - Enter the LNURL-pay or Lightning Address destination
3. All future payments to that wallet will be auto-forwarded

## Use Cases

- **Self-custody** — use LNbits features but keep funds in your own wallet
- **Hot-to-cold** — automatically move received sats to a more secure wallet
- **Forwarding** — route payments from a public-facing wallet to a private one

## API Reference

See the [Scrub API documentation](./api) for endpoint details.

## Related Pages

- [Scrub API Reference](./api): API endpoints for this extension
- [Split Payments](/extensions/splitpayments/): Forward a percentage instead of 100%
- [All Extensions](/extensions/): Browse all LNbits extensions
