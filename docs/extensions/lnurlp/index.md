<ExtensionHeader
  name="LNURLp"
  description="Create static LNURL-pay links and branded payment pages."
  category="Payments & Commerce"
  icon="🔗"
  repo="lnbits/lnurlp"
/>

## Overview

LNURLp creates reusable LNURL-pay QR codes and Lightning Addresses. Unlike regular Lightning invoices that are single-use, an LNURL-pay link generates a fresh invoice every time it's scanned. This means one QR code can be used indefinitely — print it, put it on your website, or share it anywhere.

## Features

- **Static QR codes** — one QR code, unlimited payments
- **Lightning Address** — create `username@your-lnbits.com` addresses
- **Fixed or variable amounts** — set exact amounts or min/max ranges
- **Fiat pricing** — display prices in fiat with automatic sat conversion
- **Comments** — let payers attach messages to their payment
- **Webhook** — get notified via URL when a payment is received
- **Success message** — send a thank-you note back to the payer
- **Success URL** — redirect payers to a link after payment (e.g., download, content)

## Setup

1. Enable the extension from the LNbits **Extensions** page
2. Click **New Pay Link**:
   - Select the wallet to receive payments
   - Add a description
   - Set the amount (fixed or min/max range)
   - Optionally set a fiat currency
   - Optionally enable comments
   - Add a webhook URL, success message, or success URL
3. Optionally attach a Lightning Address username
4. Share the QR code or link

## Use Cases

- **Donations** — permanent donation QR on your website or social media
- **Lightning Address** — receive payments to `you@your-domain.com`
- **Tip jars** — static QR for receiving tips at events or venues
- **Payment links** — shareable pay links for invoicing

## API Reference

See the [LNURLp API documentation](./api) for endpoint details.

## Related Pages

- [LNURLp API Reference](./api): API endpoints for this extension
- [Withdraw](/extensions/withdraw/): LNURL-withdraw (the spend counterpart)
- [Tip Jar](/extensions/tipjar/): Tips with messages
- [LNURL Overview](/guide/core/lnurl/overview): LNURL protocol in LNbits
- [All Extensions](/extensions/): Browse all LNbits extensions
