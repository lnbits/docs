# Capture Orders

> Orders keeps the record of what was sold after payment.

Payments are only part of the merchant workflow. Merchants also need receipt history, line items, tax data, notifications, shipping status, and a way to review sales later.

## What Orders stores

Orders can store normalized paid order data such as:

- line items
- totals
- tax information
- exchange-rate data
- source TPoS or WebShop details
- payment hash or payment reference
- metadata needed for receipt and fulfillment flows

## Basic setup

1. Enable the [Orders extension](/extensions/orders/).
2. Enable TPoS or WebShop.
3. Complete a test payment.
4. Open Orders.
5. Confirm the paid order appears.

## Notifications

Orders can notify the merchant or staff when a sale happens.

Supported notification targets include:

- Telegram chat ID
- Nostr npub
- email address

Use notifications when:

- the owner is not always in the shop
- WebShop orders need fulfillment
- kitchen or staff workflows depend on new order alerts
- an advisor wants to confirm that a merchant setup is working

## Receipt and fulfillment workflows

Orders can support:

- customer digital receipts
- internal order tickets
- shipping labels
- shipped/unshipped status
- follow-up messages when an order ships

Use these workflows to connect payment acceptance to real operations.

## Related pages

- [Orders extension](/extensions/orders/)
- [TPoS](/merchant-stack/tpos)
- [WebShop](/merchant-stack/webshop)
- [Bookkeeping](/merchant-stack/bookkeeping)

