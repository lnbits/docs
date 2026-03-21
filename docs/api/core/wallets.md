# Wallets API

> Create, list, rename, and delete wallets via the LNbits REST API.

## Get Wallet Details

`GET /api/v1/wallet`

**Auth:** Invoice key or Admin key

Get details of the wallet associated with the provided API key.

#### Parameters

None - the wallet is identified by the API key.

#### Response `200`

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Wallet UUID |
| `name` | string | Wallet name |
| `balance` | integer | Balance in **millisatoshis** (divide by 1000 for sats) |
| `adminkey` | string | Admin API key |
| `inkey` | string | Invoice (read-only) API key |
| `currency` | string | Display currency (if set) |

```json
{
  "id": "wallet-uuid",
  "name": "My Wallet",
  "balance": 50000,
  "adminkey": "a1b2c3d4e5f6...",
  "inkey": "f6e5d4c3b2a1..."
}
```

::: tip
The `balance` is in **millisatoshis**. Divide by 1000 for satoshis.
:::

## List All Wallets

`GET /api/v1/wallets`

**Auth:** Bearer token

List all wallets for the authenticated user.

#### Parameters

None.

#### Response `200`

Array of wallet objects:

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Wallet UUID |
| `name` | string | Wallet name |
| `balance` | integer | Balance in millisatoshis |

```json
[
  {
    "id": "wallet-1",
    "name": "Daily Spending",
    "balance": 50000
  },
  {
    "id": "wallet-2",
    "name": "Shop Revenue",
    "balance": 120000
  }
]
```

## List Wallets (Paginated)

`GET /api/v1/wallet/paginated`

**Auth:** Bearer token

List wallets with pagination and search.

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `limit` | integer (query) | No | Items per page (default 20, max 100) |
| `offset` | integer (query) | No | Number of items to skip |
| `search` | string (query) | No | Filter wallets by name |

#### Response `200`

| Field | Type | Description |
|-------|------|-------------|
| `data` | array | Array of wallet objects |
| `total` | integer | Total number of wallets |

```json
{
  "data": [
    {
      "id": "wallet-1",
      "name": "Daily Spending",
      "balance": 50000
    }
  ],
  "total": 5
}
```

## Update Wallet

`PUT /api/v1/wallet`

**Auth:** Admin key

Update the wallet name or display currency.

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | No | New wallet name |
| `currency` | string | No | Display currency code (e.g. `"USD"`) |

#### Response `200`

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Wallet UUID |
| `name` | string | Updated name |
| `balance` | integer | Balance in millisatoshis |
| `currency` | string | Display currency |

```json
{
  "id": "wallet-uuid",
  "name": "New Name",
  "balance": 50000,
  "currency": "USD"
}
```

## Delete Wallet

`DELETE /api/v1/wallet`

**Auth:** Admin key

::: danger Destructive Operation
This permanently deletes the wallet and all its payment history. The balance is lost. This action cannot be undone.
:::

#### Parameters

None - the wallet is identified by the API key.

#### Response `200`

```json
{
  "detail": "Wallet deleted"
}
```

## Send Share Invitation

`PUT /api/v1/wallet/share/invite`

**Auth:** Admin key

Invite another user to share access to this wallet with specific permissions.

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `user_id` | string | Yes | Target user UUID |
| `permissions` | string[] | Yes | Permission list (e.g. `["VIEW_PAYMENTS", "RECEIVE_PAYMENTS"]`) |

#### Response `200`

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Share request UUID |
| `wallet_id` | string | Wallet being shared |
| `user_id` | string | Invited user |
| `permissions` | string[] | Granted permissions |

```json
{
  "id": "request-uuid",
  "wallet_id": "wallet-uuid",
  "user_id": "target-user-uuid",
  "permissions": ["VIEW_PAYMENTS", "RECEIVE_PAYMENTS"]
}
```

## Accept Share Invitation

`PUT /api/v1/wallet/share`

**Auth:** Bearer token

Accept a pending wallet share invitation.

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `share_request_id` | string | Yes | Share request UUID from the invitation |

#### Response `200`

```json
{
  "detail": "Wallet shared successfully"
}
```

## Reject Share Invitation

`DELETE /api/v1/wallet/share/invite/{share_request_id}`

**Auth:** Bearer token

Reject a pending wallet share invitation.

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `share_request_id` | string (path) | Yes | Share request UUID |

#### Response `200`

```json
{
  "detail": "Share invitation rejected"
}
```

## Related Pages

- [Payments API](/api/core/payments)
- [Authentication](/api/authentication)
- [Wallets & Accounts Guide](/guide/core/wallets-and-accounts)
