# Set Up Inventory

> Inventory is the shared product and stock source for Merchant Stack.

Use Inventory so the merchant does not maintain separate product lists in TPoS, WebShop, and other sales channels.

## Why use Inventory

Inventory helps merchants:

- create products once
- reuse products across extensions
- track stock quantities
- store product names, descriptions, tags, and prices
- separate in-store and online products with tags
- keep checkout and WebShop data consistent

## Basic setup

1. Enable the [Inventory extension](/extensions/inventory/).
2. Create an item.
3. Add a name, price, description, and any useful metadata.
4. Set stock quantity.
5. Add tags or categories.
6. Save the item.

## Suggested product fields

For each product, collect:

- product name
- short description
- price
- image
- stock quantity
- category or tag
- weight if the item may be shipped
- channel tag such as `pos`, `webshop`, or `event`

## Channel tags

Tags are useful when the merchant sells different products in different places.

Examples:

| Tag | Use |
| --- | --- |
| `pos` | show in the in-person TPoS catalog |
| `webshop` | show in the online shop |
| `event` | show only for a temporary event setup |
| `hidden` | keep in Inventory but omit from active channels |

## Connect Inventory to TPoS

After products exist:

1. Open the TPoS settings.
2. Choose the Inventory-backed product source if available.
3. Select the tags or categories that should appear.
4. Open TPoS and confirm the products appear.
5. Make a test sale and confirm stock changes as expected.

## Connect Inventory to WebShop

For online sales:

1. Enable WebShop.
2. Create a shop.
3. Select the inventory source.
4. Choose the products or tags to expose.
5. Open the public shop page and confirm unavailable products do not appear.

## Related pages

- [Inventory extension](/extensions/inventory/)
- [TPoS](/merchant-stack/tpos)
- [WebShop](/merchant-stack/webshop)
- [Orders](/merchant-stack/orders)

