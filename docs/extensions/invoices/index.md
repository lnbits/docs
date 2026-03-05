<ExtensionHeader
  name="Invoices"
  description="Create and manage professional invoices."
  category="Payments & Commerce"
  icon="🧾"
  repo="lnbits/invoices"
/>

## Overview

Invoices lets you create traditional business invoices (not Lightning invoices) with line items denominated in fiat currency. Each invoice generates a public payment link your customer can use to pay partially or in full via Lightning. The sat amount is calculated at the current exchange rate.

## Features

- **Fiat-denominated** — line items priced in your chosen fiat currency
- **Multiple line items** — add as many items as needed per invoice
- **Partial payments** — customers can pay in installments
- **Public payment link** — shareable URL for customer payment
- **Invoice status** — track draft, sent, and paid states
- **Customer details** — optional company name, email, phone, and address

## Setup

1. Enable the extension from the LNbits **Extensions** page
2. Click **New Invoice**:
   - Select the wallet and fiat currency
   - Set invoice status (draft or active)
   - Add customer details (optional)
   - Add one or more line items with names and prices
3. Share the invoice link with your customer

## Use Cases

- **Freelancing** — send professional invoices to clients
- **Small business** — bill customers with fiat-priced line items
- **Consulting** — itemized billing with Lightning payment
- **Services** — charge for work with partial payment support

## API Reference

See the [Invoices API documentation](./api) for endpoint details.

## Related Pages

- [Invoices API Reference](./api): API endpoints for this extension
- [SatsPay](/extensions/satspay/): Simpler payment pages
- [All Extensions](/extensions/): Browse all LNbits extensions
