# Sell Online With WebShop

> WebShop adds an online sales channel to the same merchant stack.

Use WebShop when the merchant wants a direct shop page or an embeddable shop on an existing website.

## How it works

WebShop uses Inventory products and creates a public shop where customers can:

- browse products
- add items to a cart
- check out
- pay with Lightning
- receive an order page or receipt

Orders can capture the paid order for merchant review and fulfillment.

## Basic setup

1. Enable [Inventory](/extensions/inventory/) and create products.
2. Enable [WebShop](/extensions/webshop/).
3. Create a shop.
4. Choose the wallet for payments.
5. Select the inventory products or tags to expose.
6. Open the public shop page.
7. Complete a test checkout.
8. Confirm the order appears in Orders.

## Embed options

WebShop supports two common embed modes.

### Iframe

Use iframe mode when embedding the shop into an external website.

```html
<iframe
  src="https://your-lnbits-domain/webshop/<SHOP_ID>?embed=iframe"
  width="100%"
  height="900"
  style="border:0; border-radius:12px;"
></iframe>
```

### Same-origin component

Use component mode for pages served from the same LNbits server, such as a page built with the WebPages extension.

```html
<div id="lnbits-webshop-<SHOP_ID>"></div>
<script src="/webshop/static/js/public_page.js"></script>
<script>
  WebshopPublicPage.mount('#lnbits-webshop-<SHOP_ID>', {
    shopId: '<SHOP_ID>'
  }).catch(console.error)
</script>
```

Component mode can avoid iframe limitations and allows more direct interaction with the shop page.

## Fulfillment

For shipping workflows:

1. collect the contact or shipping details the merchant needs
2. capture the paid order in Orders
3. print a label or use the order details for fulfillment
4. mark the order shipped when complete
5. send a customer update if email notifications are configured

## Related pages

- [WebShop extension](/extensions/webshop/)
- [Inventory](/merchant-stack/inventory)
- [Orders](/merchant-stack/orders)
- [WebPages extension](/extensions/webpages/)

