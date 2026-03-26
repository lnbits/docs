<ExtensionHeader
  name="Orders"
  description="Order management system."
  category="Management"
  icon="📝"
  repo="lnbits/orders"
/>

## Overview

Orders stores a normalized copy of paid TPoS receipts (items, totals, and metadata).
Enable it for a user and every TPoS payment is recorded in the Orders list.

## Features

- **Auto-capture** — paid TPoS invoices become Orders
- **Items & totals** — stores line items, tax, and exchange rate data
- **Source tracking** — keeps TPoS id/name and payment hash
- **Notifications** — optional Telegram/Nostr/Email alerts

## Usage

1. **Enable** the Orders extension.
2. **Enable** TPoS (if not already enabled).
3. **Take a payment** in TPoS.
4. **Open Orders** to view the captured order.

## Notifications

Open **Orders → Settings** and configure one or more:

- Telegram chat ID
- Nostr npub
- Email address (comma separated)

## API Reference

See the [Orders API documentation](./api) for endpoint details.

## Related Pages

- [Orders API Reference](./api): API endpoints for this extension
- [All Extensions](https://extensions.lnbits.com): Browse all LNbits extensions
