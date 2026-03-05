<ExtensionHeader
  name="TPoS"
  description="Touch-friendly point-of-sale terminal."
  category="Payments & Commerce"
  icon="🏪"
  repo="lnbits/tpos"
/>

## Overview

TPoS is a simple, mobile-friendly point-of-sale terminal that runs in any browser. Merchants enter amounts on a keypad, generate Lightning invoices, and customers pay by scanning the QR code. Supports fiat currency display, tipping, tax calculation, and receipt printing.

## Features

- **Touch keypad** — mobile-friendly numeric input for amounts
- **Fiat pricing** — display prices in fiat with automatic sat conversion
- **Tip support** — configurable tip percentages or custom amounts
- **Tax calculation** — automatic tax inclusion
- **Receipt printing** — connect to a receipt printer for paper receipts
- **NFC support** — accept tap-to-pay via Bolt Cards
- **Withdraw link** — optional LNURL-withdraw for change
- **Stripe integration** — accept fiat payments alongside Lightning

## Setup

1. Enable the extension from the LNbits **Extensions** page
2. Click **New TPoS** to create a terminal:
   - Select the wallet to receive payments
   - Set the currency (sats or fiat)
   - Configure tip percentages (optional)
   - Set tax rate (optional)
3. Open the TPoS link on your phone, tablet, or any browser
4. Enter amounts and let customers scan to pay

## Use Cases

- **Retail** — accept Lightning payments at a physical store
- **Market stalls** — mobile PoS for farmers markets and pop-ups
- **Restaurants** — tableside payment with tip support
- **Events** — quick payment terminal for conferences and meetups

## API Reference

See the [TPoS API documentation](./api) for endpoint details.

## Related Pages

- [TPoS API Reference](./api): API endpoints for this extension
- [LNPoS](/extensions/lnpos/): Hardware Lightning PoS terminal
- [Offline Shop](/extensions/offlineshop/): Offline QR-based payments
- [Orders](/extensions/orders/): Capture TPoS orders automatically
- [All Extensions](/extensions/): Browse all LNbits extensions
