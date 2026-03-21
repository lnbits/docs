# Payments

> Send and receive Lightning payments through LNbits via the UI or REST API.

Everything about creating invoices, sending payments, and tracking their status.

## Receiving payments (invoices)

### Create an invoice

```bash
curl -X POST https://your-lnbits.com/api/v1/payments \
  -H "X-Api-Key: YOUR_INVOICE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "out": false,
    "amount": 1000,
    "memo": "Coffee payment",
    "webhook": "https://your-app.com/webhook"
  }'
```

Response:
```json
{
  "payment_hash": "abc123...",
  "payment_request": "lnbc10u1p...",
  "checking_id": "abc123..."
}
```

### Invoice parameters

| Field | Required | Description |
| --- | --- | --- |
| `out` | Yes | `false` for receiving (invoice) |
| `amount` | Yes | Amount in satoshis |
| `memo` | No | Description shown to the payer |
| `webhook` | No | URL called when the invoice is paid |
| `expiry` | No | Invoice expiry in seconds (default: 3600) |
| `extra` | No | JSON metadata stored with the payment |

## Sending payments

### Pay a Lightning invoice

```bash
curl -X POST https://your-lnbits.com/api/v1/payments \
  -H "X-Api-Key: YOUR_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "out": true,
    "bolt11": "lnbc10u1p..."
  }'
```

::: warning
Sending payments requires the **admin key**. The invoice key cannot send.
:::

## Checking payment status

### By payment hash

```bash
curl https://your-lnbits.com/api/v1/payments/PAYMENT_HASH \
  -H "X-Api-Key: YOUR_INVOICE_KEY"
```

Response:
```json
{
  "paid": true,
  "details": {
    "status": "success",
    "amount": 1000,
    "memo": "Coffee payment",
    "time": 1700000000
  }
}
```

## Listing payments

### Basic list

```bash
curl "https://your-lnbits.com/api/v1/payments?limit=20" \
  -H "X-Api-Key: YOUR_INVOICE_KEY"
```

### Paginated with filters

```bash
curl "https://your-lnbits.com/api/v1/payments/paginated?limit=10&offset=0" \
  -H "X-Api-Key: YOUR_INVOICE_KEY"
```

### Payment history (grouped)

```bash
# Group by day
curl "https://your-lnbits.com/api/v1/payments/history?group=day" \
  -H "X-Api-Key: YOUR_INVOICE_KEY"
```

## Payment statistics

```bash
# Count stats by tag/extension
curl "https://your-lnbits.com/api/v1/payments/stats/count" \
  -H "X-Api-Key: YOUR_INVOICE_KEY"

# Daily stats
curl "https://your-lnbits.com/api/v1/payments/stats/daily" \
  -H "X-Api-Key: YOUR_INVOICE_KEY"
```

## Webhooks

When you create an invoice with a `webhook` URL, LNbits sends a POST request to that URL when the invoice is paid.

```json
{
  "payment_hash": "abc123...",
  "payment_request": "lnbc10u1p...",
  "amount": 1000,
  "memo": "Coffee payment",
  "status": "success"
}
```

::: tip
Always verify webhooks server-side by checking the payment status with the API. Don't trust webhook data alone.
:::

## Hold invoices

Hold invoices let you accept a payment without immediately settling it. The payer's funds are locked until you explicitly settle or cancel.

### Create a hold invoice

```bash
curl -X POST https://your-lnbits.com/api/v1/payments \
  -H "X-Api-Key: YOUR_INVOICE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "out": false,
    "amount": 1000,
    "memo": "Escrow payment",
    "extra": {"hold": true}
  }'
```

### Settle

```bash
curl -X PUT https://your-lnbits.com/api/v1/payments/CHECKING_ID \
  -H "X-Api-Key: YOUR_ADMIN_KEY"
```

### Cancel

```bash
curl -X DELETE https://your-lnbits.com/api/v1/payments/CHECKING_ID \
  -H "X-Api-Key: YOUR_ADMIN_KEY"
```

::: warning
Hold invoices require a backend that supports them (LND, some CLN configurations). Check [Funding Sources](/guide/wallets/) for compatibility.
:::

## Internal transfers

Payments between wallets on the same LNbits instance are settled instantly and internally - they don't touch the Lightning network.

## Related Pages

- [Wallets & Accounts](/guide/core/wallets-and-accounts.md)
- [Payments API Reference](/api/core/payments.md)
- [Labels](/guide/core/labels/overview.md)
