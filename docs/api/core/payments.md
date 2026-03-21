# Payments API

> Create invoices, pay Lightning invoices, and list payment history via the API.

## Create Invoice (Receive)

`POST /api/v1/payments`

**Auth:** Invoice key or Admin key

Create a Lightning invoice to receive a payment.

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `out` | boolean | Yes | Must be `false` for receiving |
| `amount` | integer | Yes | Amount in satoshis |
| `memo` | string | No | Invoice description (visible to payer) |
| `webhook` | string | No | URL called when payment is received |
| `expiry` | integer | No | Seconds until invoice expires (default 3600) |
| `extra` | object | No | Custom metadata attached to the payment |

#### Response `201`

| Field | Type | Description |
|-------|------|-------------|
| `payment_hash` | string | Unique payment identifier |
| `payment_request` | string | BOLT11 invoice string |
| `checking_id` | string | ID for status polling |

```json
{
  "payment_hash": "abc123def456...",
  "payment_request": "lnbc10u1p...",
  "checking_id": "abc123def456..."
}
```

## Pay Invoice (Send)

`POST /api/v1/payments`

**Auth:** Admin key **only**

Pay a Lightning invoice. Requires the Admin key - Invoice keys cannot send payments.

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `out` | boolean | Yes | Must be `true` for sending |
| `bolt11` | string | Yes | BOLT11 invoice to pay |

#### Response `201`

| Field | Type | Description |
|-------|------|-------------|
| `payment_hash` | string | Unique payment identifier |
| `checking_id` | string | ID for status polling |

```json
{
  "payment_hash": "abc123def456...",
  "checking_id": "abc123def456..."
}
```

## Check Payment Status

`GET /api/v1/payments/{checking_id}`

**Auth:** Invoice key or Admin key

Check whether a payment has been received or completed.

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `checking_id` | string (path) | Yes | Payment checking ID |

#### Response `200`

| Field | Type | Description |
|-------|------|-------------|
| `paid` | boolean | Whether the payment is complete |
| `details.checking_id` | string | Payment identifier |
| `details.amount` | integer | Amount in satoshis |
| `details.fee` | integer | Routing fee in millisatoshis |
| `details.memo` | string | Payment memo |
| `details.status` | string | `"pending"`, `"success"`, or `"failed"` |
| `details.time` | integer | Unix timestamp |

```json
{
  "paid": true,
  "details": {
    "checking_id": "abc123def456...",
    "amount": 1000,
    "fee": 1,
    "memo": "Coffee payment",
    "status": "success",
    "time": 1700000000
  }
}
```

## List Payments

`GET /api/v1/payments`

**Auth:** Invoice key or Admin key

List payments for the wallet.

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `limit` | integer (query) | No | Max items to return (default 20) |
| `offset` | integer (query) | No | Number of items to skip |
| `status` | string (query) | No | Filter: `"pending"`, `"success"`, `"failed"` |

#### Response `200`

Array of payment objects:

| Field | Type | Description |
|-------|------|-------------|
| `checking_id` | string | Payment identifier |
| `amount` | integer | Amount in satoshis (negative = outgoing) |
| `fee` | integer | Routing fee in millisatoshis |
| `memo` | string | Payment memo |
| `status` | string | Payment status |
| `time` | integer | Unix timestamp |
| `bolt11` | string | BOLT11 invoice string |
| `extra` | object | Custom metadata |

```json
[
  {
    "checking_id": "abc123...",
    "amount": 1000,
    "fee": 0,
    "memo": "Coffee payment",
    "status": "success",
    "time": 1700000000,
    "bolt11": "lnbc10u1p...",
    "extra": {"order_id": "123"}
  }
]
```

## List Payments (Paginated)

`GET /api/v1/payments/paginated`

**Auth:** Invoice key or Admin key

List payments with pagination and total count.

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `limit` | integer (query) | No | Items per page (default 20, max 100) |
| `offset` | integer (query) | No | Number of items to skip |
| `status` | string (query) | No | Filter: `"pending"`, `"success"`, `"failed"` |

#### Response `200`

| Field | Type | Description |
|-------|------|-------------|
| `data` | array | Array of payment objects |
| `total` | integer | Total number of matching payments |

```json
{
  "data": [
    {
      "checking_id": "abc123...",
      "amount": 1000,
      "memo": "Coffee",
      "status": "success"
    }
  ],
  "total": 150
}
```

## Payment History

`GET /api/v1/payments/history`

**Auth:** Invoice key or Admin key

Get payment totals grouped by time period.

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `group` | string (query) | No | Grouping: `"hour"`, `"day"` (default), or `"month"` |

#### Response `200`

| Field | Type | Description |
|-------|------|-------------|
| `date` | string | Period label |
| `income` | integer | Total received (satoshis) |
| `spending` | integer | Total sent (satoshis) |

```json
[
  {
    "date": "2024-01-15",
    "income": 50000,
    "spending": 12000
  },
  {
    "date": "2024-01-14",
    "income": 30000,
    "spending": 5000
  }
]
```

## Payment Statistics

### Count by Tag

`GET /api/v1/payments/stats/count`

**Auth:** Invoice key or Admin key

Get payment counts grouped by tag.

#### Parameters

None.

#### Response `200`

```json
[
  {
    "tag": "lnurlp",
    "count": 42
  },
  {
    "tag": "boltz",
    "count": 7
  }
]
```

### Per-Wallet Stats

`GET /api/v1/payments/stats/wallets`

**Auth:** Bearer token

Get payment statistics across all wallets.

#### Parameters

None.

#### Response `200`

```json
[
  {
    "wallet_id": "wallet-1",
    "wallet_name": "Shop",
    "total_income": 500000,
    "total_spending": 120000,
    "payment_count": 85
  }
]
```

### Daily Stats

`GET /api/v1/payments/stats/daily`

**Auth:** Invoice key or Admin key

Get daily payment aggregates.

#### Parameters

None.

#### Response `200`

```json
[
  {
    "date": "2024-01-15",
    "count": 12,
    "total": 45000
  }
]
```

## Hold Invoices

Hold invoices let you accept a payment but delay settlement - useful for escrow, conditional payments, or order confirmation flows.

### Settle Hold Invoice

`PUT /api/v1/payments/{checking_id}`

**Auth:** Admin key

Settle (complete) a held payment, releasing the funds to the wallet.

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `checking_id` | string (path) | Yes | Payment checking ID |

#### Response `200`

```json
{
  "detail": "Payment settled"
}
```

### Cancel Hold Invoice

`DELETE /api/v1/payments/{checking_id}`

**Auth:** Admin key

Cancel a held payment, returning the funds to the sender.

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `checking_id` | string (path) | Yes | Payment checking ID |

#### Response `200`

```json
{
  "detail": "Payment cancelled"
}
```

## Related Pages

- [Wallets API](/api/core/wallets)
- [Authentication](/api/authentication)
- [Payments Guide](/guide/core/payments)
- [WebSockets API](/api/core/websockets)
