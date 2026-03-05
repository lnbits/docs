<ExtensionHeader
  name="WebShop"
  description="Embeddable web shop with Lightning checkout."
  category="Payments & Commerce"
  icon="🛍️"
  repo="lnbits/webshop"
/>

## Overview

WebShop is a complete e-commerce solution for LNbits. Create a product catalog, customize the shop design, and embed it in your website. Customers browse products, add them to a cart, and pay with Lightning at checkout. Integrates with the Inventory extension for stock management.

## Features

- **Product catalog** — add products with prices, descriptions, and images
- **Shopping cart** — multi-item cart with checkout flow
- **Custom branding** — configurable colors and styling
- **Lightning checkout** — instant payments at checkout
- **Fiat pricing** — display prices in fiat currencies
- **Tag filtering** — organize products with tags
- **Order management** — track orders with customer info and shipping status
- **Embeddable** — iframe or same-origin component embed

## Embed Modes

### Iframe (cross-origin)

Embed the shop on any external website:

```html
<iframe
  src="https://your-lnbits.com/webshop/SHOP_ID?embed=iframe"
  width="100%" height="900"
  style="border:0; border-radius:12px;">
</iframe>
```

### Component (same-origin)

For pages served from the same LNbits server (e.g., via WebPages):

```html
<div id="lnbits-webshop-SHOP_ID"></div>
<script src="/webshop/static/js/public_page.js"></script>
<script>
  WebshopPublicPage.mount('#lnbits-webshop-SHOP_ID', {
    shopId: 'SHOP_ID'
  })
</script>
```

## Setup

1. Enable the extension from the LNbits **Extensions** page
2. Add products with prices, descriptions, and images
3. Customize the shop appearance
4. Embed the shop or share the direct link
5. Manage orders from the admin dashboard

## API Reference

See the [WebShop API documentation](./api) for endpoint details.

## Related Pages

- [WebShop API Reference](./api): API endpoints for this extension
- [WebPages](/extensions/webpages/): Create custom pages to host your shop
- [Inventory](/extensions/inventory/): Stock management
- [Shipping](/extensions/shipping/): Shipping zones and rates
- [Offline Shop](/extensions/offlineshop/): QR-based offline payments
- [All Extensions](/extensions/): Browse all LNbits extensions
