# Hardware And Printing

> Hardware is often the difference between a demo and a usable merchant setup.

Merchant Stack can run on ordinary devices, but card payments and printing introduce hardware-specific requirements. Test the merchant's exact setup before relying on it in production.

## Common setup

A practical small-shop setup can include:

- a computer or tablet for staff checkout
- an Android phone or POS device for customer-facing payment
- a receipt printer
- a hosted LNbits SaaS instance
- optional LNbitsBox or self-hosted instance for local control

## Android device for tap-to-pay

For Stripe tap-to-pay, the Android device must be compatible with Stripe requirements.

Check for:

- NFC support
- Google Mobile Services certification when required
- current Android version
- working camera for QR pairing
- reliable internet connection

::: warning
Do not assume any generic Android POS device will work with Stripe tap-to-pay. Test the exact device model first.
:::

## TPoS Wrapper app

The [TPoS Wrapper](/apps/tpos-wrapper) app connects the LNbits TPoS workflow to Android tap-to-pay and device printing.

Use it when the merchant needs:

- card tap-to-pay on Android
- customer-facing device payments
- silent printing from the device

## Pairing tips

If QR pairing is unreliable:

- increase screen brightness
- open the QR code on a light background
- clean the device camera
- avoid glare
- verify the Android device has internet access
- retry pairing after saving the TPoS settings

## Receipt printing

Merchants may need two receipt types:

- **Customer receipt**: the buyer's payment receipt
- **Order receipt**: a larger internal ticket for kitchen, barista, staff, or fulfillment workflows

Printer setup can vary by hardware. Test:

- printer discovery
- silent printing
- print width
- paper size
- character encoding
- logo and store details
- reprint from recent receipts

## Recommended production check

Before a merchant goes live:

1. Complete a Lightning payment.
2. Complete a card payment if configured.
3. Validate a cash sale if used.
4. Print a customer receipt.
5. Print an internal order receipt.
6. Confirm the order appears in Orders.
7. Confirm stock changes in Inventory.
8. Confirm owner/staff notifications arrive.

## Related pages

- [TPoS](/merchant-stack/tpos)
- [TPoS Wrapper](/apps/tpos-wrapper)
- [Orders](/merchant-stack/orders)
- [Troubleshooting](/merchant-stack/troubleshooting)

