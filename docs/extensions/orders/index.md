<ExtensionHeader
  name="Orders"
  description="Order management system."
  category="Management"
  icon="📝"
  repo="lnbits/orders"
/>

## Overview

Orders automatically records every paid TPoS receipt and makes them searchable. When enabled alongside TPoS or WebShop, each successful payment creates an order record with line items, totals, tax, and exchange rate metadata. Supports optional notifications via Telegram, Nostr, and email.

## Features

- **Auto-capture** — paid TPoS invoices become orders automatically
- **Line items and totals** — stores item details, tax, and exchange rate data
- **Source tracking** — records TPoS ID/name and payment hash
- **Notifications** — optional alerts via Telegram, Nostr, or email
- **Searchable** — browse and filter captured orders

## Setup

1. Enable the **Orders** extension from the LNbits **Extensions** page
2. Enable **TPoS** (if not already)
3. Take a payment in TPoS
4. Open Orders to view the captured order

### Notifications

Open **Orders → Settings** and configure:
- Telegram chat ID
- Nostr npub
- Email addresses (comma-separated)

## Use Cases

- **Sales records** — keep a clean history of all PoS transactions
- **Accounting** — track items, totals, and tax for bookkeeping
- **Real-time alerts** — get notified of every sale via Telegram or email

## API Reference

See the [Orders API documentation](./api) for endpoint details.

## Related Pages

- [Orders API Reference](./api): API endpoints for this extension
- [TPoS](/extensions/tpos/): Point-of-sale terminal
- [WebShop](/extensions/webshop/): Web shop with Lightning checkout
- [All Extensions](/extensions/): Browse all LNbits extensions
