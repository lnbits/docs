# Admin Top-up API

> Add balance to any wallet without a Lightning payment — admin-only endpoint.

Add balance to any wallet without a corresponding Lightning payment. Useful for testing, initial setup, and manual balance adjustments.

## Top Up a Wallet

`PUT /api/v1/admin/topup`

**Auth:** Super User

Inject balance into a wallet by its ID.

::: warning
Top-ups create balance without corresponding Lightning payments. The total of all wallet balances may exceed the backend's actual liquidity. Use this carefully in production.
:::

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Wallet UUID to top up |
| `amount` | integer | Yes | Amount in satoshis to add |

#### Response `200`

| Field | Type | Description |
|-------|------|-------------|
| `wallet_id` | string | Wallet UUID |
| `new_balance` | integer | Updated balance in millisatoshis |

```json
{
  "wallet_id": "wallet-uuid",
  "new_balance": 60000
}
```

**Example:**

```bash
curl -X PUT https://your-lnbits.com/api/v1/admin/topup \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"id": "wallet-uuid", "amount": 10000}'
```

## Related Pages

- [Admin API](/api/admin/)
- [Wallets API](/api/core/wallets)
