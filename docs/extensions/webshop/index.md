<ExtensionHeader
  name="WebShop"
  description="Embeddable web shop with Lightning checkout."
  category="Payments & Commerce"
  icon="🛍️"
  repo="lnbits/webshop"
/>

## How it works

Create products with prices and descriptions tied to the LNbits _Inventory_ extension. The extension generates a shop page that can be embedded in your website or shared directly. Customers browse, add items to cart, and pay with lightning.

## Features

- Product catalog management
- Shopping cart functionality
- Embeddable via iframe
- Same-origin component embed
- Lightning checkout

## Usage

1. Enable the extension in LNbits
2. Add your products with prices and images
3. Embed the shop in your website or share the link
4. Customers pay with lightning at checkout

## Embed modes

### Iframe embed (cross-origin friendly)

Use an iframe to embed into external websites:

```html
<iframe
  src="https://your-lnbits-domain/webshop/<SHOP_ID>?embed=iframe"
  width="100%"
  height="900"
  style="border:0; border-radius:12px;"
></iframe>
```

Notes:

- `?embed=iframe` enables iframe-specific behavior.
- Invoice copy button is hidden in iframe mode.

### Component embed (same-origin)

For pages served from the same LNbits server (for example via `webpages`), mount the shop as a component:

```html
<div id="lnbits-webshop-<SHOP_ID>"></div>
<script src="/webshop/static/js/public_page.js"></script>
<script>
  WebshopPublicPage.mount('#lnbits-webshop-<SHOP_ID>', {
    shopId: '<SHOP_ID>'
  }).catch(console.error)
</script>
```

Notes:

- Component mode avoids iframe interaction issues.
- Invoice copy button is available in component and direct page mode.

## API Reference

See the [WebShop API documentation](./api) for endpoint details.

## Related Pages

- [WebShop API Reference](./api): API endpoints for this extension
- [All Extensions](/extensions/): Browse all LNbits extensions
