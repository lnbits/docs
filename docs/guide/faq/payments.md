# Payments FAQ

> Common questions about pending payments, on-chain deposits, LNDhub, LNURL, and the payment API.

[[toc]]

## Why is my payment stuck or pending?

Lightning payments can get stuck for several reasons:

1. **No route found** - the network can't find a path to the recipient. This is common for large payments or poorly-connected nodes.
2. **Backend is down** - check that your Lightning node is running and connected to LNbits.
3. **Channel liquidity** - your node may not have enough outbound capacity.
4. **Recipient offline** - the receiving node must be online to settle the payment.

Check LNbits logs for error details:

```bash
docker compose logs -f lnbits
```

Pending payments will eventually resolve (succeed or fail) based on the Lightning payment timeout (typically a few minutes to an hour).

## How do I receive on-chain BTC deposits?

LNbits is primarily a Lightning wallet, but you can accept on-chain Bitcoin using extensions:

1. **Watch Only** extension - import an xpub/zpub from your hardware wallet to monitor on-chain addresses
2. **SatsPay** extension - create payment pages that accept both Lightning and on-chain payments
3. **Boltz** extension - submarine swaps to convert on-chain BTC to Lightning

The combination of Watch Only + SatsPay is the most common setup for accepting on-chain payments alongside Lightning.

## How do I use LNDhub with LNbits?

The LNDhub extension turns each LNbits wallet into an LNDhub-compatible account, letting you use mobile wallets:

1. Enable the **LNDhub** extension
2. Open LNDhub from your wallet's dashboard
3. Scan the QR code with **BlueWallet** or **Zeus**
4. Your LNbits wallet is now accessible from the mobile app

The QR code contains two URLs - one for admin access (send + receive) and one for invoice-only access (receive only).

## What are hold invoices?

Hold invoices (also called hodl invoices) are Lightning invoices where the payment is locked but not immediately settled. The recipient can choose to:

- **Settle** the invoice - accept the payment
- **Cancel** the invoice - reject and refund the payment

This is useful for escrow-like scenarios, conditional payments, and marketplace applications. Hold invoices require a backend that supports them (LND, CLN).

## How do I handle refunds?

LNbits doesn't have a built-in refund mechanism because Lightning payments are final by design. Options for refunds:

- **Send a new payment** - create a new outgoing payment for the refund amount
- **Use LNURL-withdraw** - generate a withdraw link the customer can claim
- **Use hold invoices** - cancel the invoice before settling to automatically refund

For merchant setups, the LNURL-withdraw approach provides the best user experience.

## What are payment labels?

Labels let you categorize and filter payments. LNbits supports a two-level label system:

- **Category labels** - broad groupings (e.g., "donations", "shop", "tips")
- **Item labels** - specific items within a category

Labels can be assigned via the API when creating payments. They're useful for accounting, reporting, and filtering transaction history. See [Labels](/guide/core/labels/overview).

## Invoice expired before payment - what happens?

When a Lightning invoice expires (default: 24 hours), it can no longer be paid. The payer is not charged. Simply create a new invoice.

You can set custom expiry times when creating invoices via the API:

```bash
curl -X POST https://your-lnbits.com/api/v1/payments \
  -H "X-Api-Key: YOUR_INVOICE_KEY" \
  -H "Content-Type: application/json" \
  -d '{"out": false, "amount": 1000, "memo": "test", "expiry": 3600}'
```

The `expiry` field is in seconds (3600 = 1 hour).

## How do I send payments via the API?

Use the Payments API with an **Admin key** (sending requires full access):

```bash
curl -X POST https://your-lnbits.com/api/v1/payments \
  -H "X-Api-Key: YOUR_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{"out": true, "bolt11": "lnbc..."}'
```

See [Payments API](/api/core/payments) for full documentation including webhooks and payment status checking.

## How do I generate Lightning invoices via the API?

Use the Payments API with an **Invoice key** (receiving only needs invoice access):

```bash
curl -X POST https://your-lnbits.com/api/v1/payments \
  -H "X-Api-Key: YOUR_INVOICE_KEY" \
  -H "Content-Type: application/json" \
  -d '{"out": false, "amount": 1000, "memo": "Coffee payment"}'
```

The response includes a `payment_request` field containing the BOLT11 invoice string. See [Payments API](/api/core/payments).

## What LNURL protocols does LNbits support?

LNbits supports the full LNURL protocol suite:

| Protocol | Purpose | Extension |
|---|---|---|
| **LNURL-pay** | Static payment links | LNURLp |
| **LNURL-withdraw** | Withdrawable vouchers | LNURLw |
| **LNURL-auth** | Login with Lightning | Core (built-in) |
| **LNURL-channel** | Channel requests | - |

LNURL links work as both QR codes and clickable links. They're compatible with any LNURL-enabled wallet. See [LNURL](/guide/core/lnurl/overview).

## Related Pages

- [Payments](/guide/core/payments) - payment system documentation
- [Payments API](/api/core/payments) - API reference
- [API Keys](/guide/core/api-keys) - key types and permissions
- [LNURL](/guide/core/lnurl/overview) - LNURL protocol support
- [Labels](/guide/core/labels/overview) - payment categorization
