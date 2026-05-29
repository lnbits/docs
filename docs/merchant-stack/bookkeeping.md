# Bookkeeping

> Merchants need records they can reconcile, not only payment confirmations.

Merchant Stack helps keep sales activity connected to wallet records, orders, receipts, and exports.

## What to record

For each merchant workflow, make sure the merchant can answer:

- what was sold
- when it was sold
- how the customer paid
- which wallet received the payment
- whether tax was included or added
- whether the order was fulfilled
- whether the sale was refunded, written off, or manually settled

## LNbits records

LNbits can help with:

- wallet transaction history
- payment hashes and invoice records
- Orders records
- TPoS source tracking
- exchange-rate data
- CSV exports where available
- accounting integrations where configured

## Fiat and Bitcoin together

If a merchant accepts both card and Bitcoin payments, decide how records should flow into accounting tools.

For example:

- Stripe may already sync fiat/card payments to the merchant's accounting system.
- LNbits records can help track Bitcoin payments and LNbits-side operational data.
- Orders can preserve line items and receipt context.

## Manual settlement caution

Cash settlement, card settlement, write-offs, and on-chain settlement records can affect the merchant's accounting view.

Keep these workflows restricted to trusted staff and document when each method should be used.

## Related pages

- [Orders](/merchant-stack/orders)
- [TPoS](/merchant-stack/tpos)
- [Tabs](/merchant-stack/tabs)
- [Core payments](/guide/core/payments)

