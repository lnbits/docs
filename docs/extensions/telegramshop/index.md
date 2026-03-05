<ExtensionHeader
  name="Telegram Shopping"
  description="Lightning-powered storefront inside Telegram Mini App."
  category="Payments & Commerce"
  icon="🤖"
  repo="lnbits/telegramshop"
/>

## Overview

Telegram Shopping turns a Telegram bot into a full Lightning-powered shop. Customers open a **Telegram Mini App** — a native-feeling storefront embedded right inside the chat — to browse products, fill a cart, and pay with Lightning. You manage orders, messages, returns, and marketing from the LNbits dashboard. Products live in the [Inventory](/extensions/inventory/) extension — one catalog, multiple sales channels.

## Features

- **Telegram Mini App storefront** — full web shop embedded inside Telegram, no browser or app install needed
- **Shopping cart** — persistent cart with quantity controls, synced server-side
- **Lightning checkout** — invoices generated at checkout with fiat pricing and automatic sat conversion
- **Store credit** — applied before invoicing, supports partial credit
- **Order fulfillment** — tracking with status updates (preparing → shipping → delivered) and customer notifications via Telegram
- **Returns and refunds** — customer-initiated returns with approve/deny flow, Lightning refund or store credit
- **Customer messaging** — bidirectional messaging through the Mini App, threaded by customer and order
- **Marketing campaigns** — abandoned cart reminders, back-in-stock notifications, post-purchase follow-ups, and manual broadcasts
- **Deep links** — link directly to a product: `https://t.me/yourbotname?start=product_PRODUCT_ID`
- **Inline sharing** — customers share products in any Telegram chat via `@yourbotname search`
- **AI-ready API** — full REST API for headless store management with agent guide included

## Setup

1. Install the **Inventory** extension in LNbits and add your products
2. Enable **Telegram Shopping** from the LNbits **Extensions** page
3. Create a bot via [@BotFather](https://t.me/BotFather) and copy the token
4. Create a shop in the extension: paste the token, follow the setup wizard
5. Toggle the shop on — your bot goes live

::: tip
Use **polling** mode for development (no public URL needed). Switch to **webhook** for production.
:::

## Configuration

| Setting | Options |
|---------|---------|
| **Checkout mode** | none, email, address |
| **Currency** | sat or any fiat code (USD, EUR, GBP, ...) |
| **Shipping** | Flat rate, per-kg rate, free-shipping threshold |
| **Returns** | On/off, return window, credit refund toggle |
| **Order tracking** | Fulfillment statuses with customer notifications |
| **Delivery** | Webhook (production) or polling (development) |
| **Admin chat ID** | Personal notifications for orders, messages, returns |

## Use Cases

- **Small online shop** — sell stickers, prints, handmade goods
- **Digital goods** — e-books, presets, templates
- **Pop-up and event sales** — QR deep links at events
- **Community merch** — group-based sales in Telegram communities
- **Restaurant takeaway** — menu categories with order tracking
- **AI-automated store** — manage the shop entirely via the REST API

## Documentation

Full documentation with setup guides, configuration reference, and AI integration is available at [docs-telegramshop.netlify.app](https://docs-telegramshop.netlify.app/).

## API Reference

See the [Telegram Shopping API documentation](./api) for endpoint details.

## Related Pages

- [Telegram Shopping API Reference](./api): API endpoints for this extension
- [Telegram Shopping Docs](https://docs-telegramshop.netlify.app/): Dedicated documentation site
- [Inventory](/extensions/inventory/): Stock management (required)
- [WebShop](/extensions/webshop/): Alternative web-based shop
- [Market](/extensions/market/): Online marketplace
- [All Extensions](/extensions/): Browse all LNbits extensions
