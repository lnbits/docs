# Fiat & Rates API

> Fiat currency conversion and exchange rate API endpoints.

Exchange rates and currency conversion. All endpoints are public - no authentication required.

## Get Exchange Rate

`GET /api/v1/rate/{currency}`

**Auth:** None

Get the current BTC exchange rate for a specific fiat currency.

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `currency` | string (path) | Yes | ISO 4217 currency code (e.g. `USD`, `EUR`, `GBP`) |

#### Response `200`

| Field | Type | Description |
|-------|------|-------------|
| `rate` | number | Current BTC price in the requested currency |

```json
{
  "rate": 43250.50
}
```

**Example:**

```bash
curl https://your-lnbits.com/api/v1/rate/USD
```

## List Currencies

`GET /api/v1/currencies`

**Auth:** None

List all supported fiat currency codes.

#### Parameters

None.

#### Response `200`

Array of currency code strings:

```json
[
  "USD",
  "EUR",
  "GBP",
  "JPY",
  "BRL",
  "CAD",
  "CHF",
  "CZK"
]
```

## Rate History

`GET /api/v1/rate/history`

**Auth:** None

Get historical BTC exchange rates.

#### Parameters

None.

#### Response `200`

Array of historical rate objects:

| Field | Type | Description |
|-------|------|-------------|
| `currency` | string | Currency code |
| `rate` | number | Exchange rate |
| `timestamp` | integer | Unix timestamp |

```json
[
  {
    "currency": "USD",
    "rate": 43250.50,
    "timestamp": 1700000000
  },
  {
    "currency": "USD",
    "rate": 43100.00,
    "timestamp": 1699996400
  }
]
```

## Convert Amount

`POST /api/v1/conversion`

**Auth:** None

Convert an amount between satoshis and a fiat currency.

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `from` | string | Yes | Source unit (`"sat"`, `"BTC"`, or a currency code) |
| `to` | string | Yes | Target unit (`"sat"`, `"BTC"`, or a currency code) |
| `amount` | number | Yes | Amount to convert |

#### Response `200`

| Field | Type | Description |
|-------|------|-------------|
| `result` | number | Converted amount |

```json
{
  "result": 43.25
}
```

**Example:**

```bash
curl -X POST https://your-lnbits.com/api/v1/conversion \
  -H "Content-Type: application/json" \
  -d '{"from": "sat", "to": "USD", "amount": 100000}'
```

## Related Pages

- [API Reference](/api/)
- [Fiat Display Guide](/guide/core/fiat/overview)
