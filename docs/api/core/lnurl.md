# LNURL API

> LNURL-pay, LNURL-withdraw, and LNURL-auth API endpoints.

Handle LNURL protocol operations — scan, pay, and authenticate.

## Scan LNURL

`GET /api/v1/lnurlscan/{code}`

**Auth:** Invoice key or Admin key

Parse and resolve an LNURL, Lightning Address, or BOLT11 invoice. Returns the decoded parameters needed to complete the flow.

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `code` | string (path) | Yes | An LNURL (`lnurl1...`), Lightning Address (`user@domain.com`), or BOLT11 invoice (`lnbc...`) |

#### Response `200` (LNURL-pay)

| Field | Type | Description |
|-------|------|-------------|
| `kind` | string | `"pay"` |
| `domain` | string | Service domain |
| `description` | string | Payment description |
| `minSendable` | integer | Minimum amount in millisatoshis |
| `maxSendable` | integer | Maximum amount in millisatoshis |
| `callback` | string | Callback URL for completing payment |
| `commentAllowed` | integer | Max comment length (0 = no comments) |

```json
{
  "kind": "pay",
  "domain": "example.com",
  "description": "Send sats",
  "minSendable": 1000,
  "maxSendable": 1000000,
  "callback": "https://example.com/lnurlp/callback/...",
  "commentAllowed": 140
}
```

#### Response `200` (LNURL-withdraw)

| Field | Type | Description |
|-------|------|-------------|
| `kind` | string | `"withdraw"` |
| `domain` | string | Service domain |
| `description` | string | Withdrawal description |
| `minWithdrawable` | integer | Minimum amount in millisatoshis |
| `maxWithdrawable` | integer | Maximum amount in millisatoshis |
| `callback` | string | Callback URL for completing withdrawal |

```json
{
  "kind": "withdraw",
  "domain": "example.com",
  "description": "Withdraw sats",
  "minWithdrawable": 1000,
  "maxWithdrawable": 50000,
  "callback": "https://example.com/withdraw/callback/..."
}
```

## Pay LNURL

`POST /api/v1/payments/lnurl`

**Auth:** Admin key

Execute a payment through an LNURL-pay flow. First use [Scan LNURL](#scan-lnurl) to get the callback and parameters.

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `callback` | string | Yes | Callback URL from the scan response |
| `amount` | integer | Yes | Amount in millisatoshis |
| `description_hash` | string | Yes | SHA256 hash of the payment description |
| `comment` | string | No | Optional comment (if `commentAllowed > 0`) |

#### Response `200`

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

## LNURL Auth

`POST /api/v1/lnurlauth`

**Auth:** Admin key

Perform LNURL authentication (login with Lightning). Signs the challenge with the wallet's key and sends the response to the service.

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `callback` | string | Yes | LNURL-auth callback URL (includes `tag=login` and `k1=...`) |

#### Response `200`

| Field | Type | Description |
|-------|------|-------------|
| `success` | boolean | Whether authentication succeeded |

```json
{
  "success": true
}
```

## Related Pages

- [Payments API](/api/core/payments)
- [Authentication](/api/authentication)
- [LNURL Overview Guide](/guide/core/lnurl/overview)
