<ExtensionHeader
  name="Inventory"
  description="Stock and inventory management."
  category="Utilities & Tools"
  icon="📦"
  repo="lnbits/inventory"
/>

## Overview

Inventory provides a shared product catalog for LNbits. Create items with prices, descriptions, images, and stock levels — then reuse that catalog across multiple extensions like Telegram Shopping, WebShop, or TPoS. Instead of each extension maintaining its own product list, Inventory acts as a single source of truth.

## Features

- **Product management** — create, edit, and organize items with names, descriptions, and images
- **Stock tracking** — track quantities with inline updates
- **Tags and categories** — organize and filter products
- **Shared catalog** — other extensions read from the same inventory
- **Discount and tax** — configure per-item discounts and tax rates
- **Import/export** — bulk manage item data
- **Audit log** — all inventory changes are logged

## Setup

1. Enable the extension from the LNbits **Extensions** page
2. Add products with names, descriptions, prices, and stock quantities
3. Tag items for organization
4. Other extensions (Telegram Shopping, WebShop) will use this catalog

## Use Cases

- **Shared product catalog** — one inventory for multiple sales channels
- **Stock management** — track availability across your shop
- **Merchant operations** — centralized product data for PoS and online sales

## API Reference

See the [Inventory API documentation](./api) for endpoint details.

## Related Pages

- [Inventory API Reference](./api): API endpoints for this extension
- [Telegram Shopping](/extensions/telegramshop/): Telegram storefront using Inventory
- [WebShop](/extensions/webshop/): Web shop with Lightning checkout
- [All Extensions](/extensions/): Browse all LNbits extensions
