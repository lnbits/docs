# Set Up TPoS

> TPoS is the in-person checkout surface for Merchant Stack.

Use TPoS when a merchant needs a touch-friendly point of sale for Lightning payments, card payments, cash validation, receipts, tips, and product-based checkout.

## What TPoS can do

Depending on configuration, TPoS can support:

- Lightning invoices
- product carts
- tips
- tax settings
- Stripe fiat payment integration
- cash validation
- on-chain payments with a watch-only wallet
- remote payment display on another device
- customer receipts
- internal order receipts
- OTC Bitcoin selling through LNURL withdraw

## Basic setup

1. Enable the [TPoS extension](/extensions/tpos/).
2. Create a new TPoS.
3. Choose the wallet that receives payments.
4. Choose the display currency.
5. Configure store details such as name, address, and VAT ID if needed.
6. Open the TPoS public page.
7. Make a test Lightning payment.

## Use shared Inventory

For a real merchant setup, use [Inventory](/merchant-stack/inventory) instead of keeping a separate product list only inside TPoS.

Shared Inventory lets the merchant:

- reuse the same products in TPoS and WebShop
- track stock in one place
- filter products with tags
- keep product names and prices consistent

## Card payments

TPoS can work with fiat providers such as Stripe when the LNbits instance and companion app are configured correctly.

For Android tap-to-pay with Stripe, see [TPoS Wrapper](/apps/tpos-wrapper).

::: warning
Stripe tap-to-pay depends on compatible Android hardware. Use a GMS-certified device with NFC support and test it before relying on it in production.
:::

## Remote payment device

Many small shops use a two-device checkout:

1. Staff builds the cart on a computer.
2. Staff clicks pay.
3. The payment appears on a customer-facing phone or POS device.
4. Customer scans the Lightning QR or taps a card.
5. Completion syncs back to the staff screen.

This is useful when the staff computer is not easy for the customer to scan or tap.

## Receipts

TPoS can be used with receipt printing workflows:

- **Customer receipt** for the buyer
- **Order receipt** for internal preparation, such as a kitchen or barista ticket

See [Hardware and printing](/merchant-stack/hardware) before choosing devices or printers.

## Super-user features

Some features should be limited to trusted operators:

- cash settlement entries
- on-chain settlement entries
- OTC Bitcoin selling

These can affect accounting records or move funds, so keep access controlled and document how the merchant should use them.

## Related pages

- [TPoS extension](/extensions/tpos/)
- [TPoS Wrapper app](/apps/tpos-wrapper)
- [Inventory](/merchant-stack/inventory)
- [Orders](/merchant-stack/orders)
- [Hardware and printing](/merchant-stack/hardware)

