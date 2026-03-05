<ExtensionHeader
  name="Sell Coins"
  description="Sell Bitcoin with various payment methods."
  category="Payments & Commerce"
  icon="🪙"
  repo="lnbits/sellcoins"
/>

## Overview

Sell Coins lets you sell Bitcoin (sats) for fiat currency. Buyers pay with Stripe (credit card, bank transfer, etc.) and receive sats to their Lightning wallet. Requires Stripe payments to be enabled in LNbits core.

## Features

- **Fiat-to-Lightning** — buyers pay fiat, receive sats
- **Stripe integration** — leverages LNbits core Stripe support
- **Automated exchange** — handles the fiat-to-sat conversion

## Prerequisites

Stripe payments must be enabled in LNbits core settings. See the [Fiat Payments guide](/guide/core/fiat-payments) for configuration.

## Setup

1. Ensure Stripe is configured in LNbits core
2. Enable the extension from the LNbits **Extensions** page
3. Configure your sell parameters
4. Share the purchase link with buyers

## Use Cases

- **Bitcoin sales** — sell sats directly to customers via credit card
- **Onboarding** — let newcomers buy their first sats with a familiar payment method
- **Commerce** — offer Bitcoin purchases alongside your products

## API Reference

See the [Sell Coins API documentation](./api) for endpoint details.

## Related Pages

- [Sell Coins API Reference](./api): API endpoints for this extension
- [Fiat Payments](/guide/core/fiat-payments): Stripe configuration in LNbits
- [All Extensions](/extensions/): Browse all LNbits extensions
