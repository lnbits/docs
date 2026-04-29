# Wallets & Accounts

> Wallets are the primary building block in LNbits. Each wallet has its own balance, Admin key (full access), and Invoice key (receive-only). Create wallets via UI or API.

Wallets are the primary building block in LNbits. Every payment flows through a wallet.

## Creating wallets

### Via the UI

1. Log in to your LNbits account
2. Click the **+** button in the left sidebar
3. Enter a name for your wallet
4. The wallet is created with a zero balance and fresh API keys

### Via the API

```bash
curl -X POST https://your-lnbits.com/api/v1/wallet \
  -H "X-Api-Key: YOUR_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "My New Wallet"}'
```

## API keys

Each wallet has two API keys - an **Admin key** (full access) and an **Invoice/read key** (receive-only). This is the single most-asked question, so it is worth a clear walk-through.

### Finding your keys in the UI

1. Log in to LNbits and select the wallet you want in the left sidebar
2. On the wallet page, click **API info** (or the **&lt;/&gt;** / code icon near the wallet name - the exact label depends on your theme)
3. The panel expands to show both keys. Click the eye icon next to each to reveal it, or the copy icon to copy it to your clipboard

Both keys are 32-character hex strings. They belong to **this one wallet only** - a different wallet in your account has its own separate pair of keys.

::: tip
The API info panel also shows your **Wallet ID** and the **API base URL** of your LNbits instance. You will need both when integrating with extensions or external services.
:::

### When to use which key

| Scenario | Key |
| --- | --- |
| Creating invoices for your website | Invoice/read key |
| Automated payouts / withdrawals | Admin key |
| Checking balance from a dashboard | Invoice/read key |
| Managing wallet settings | Admin key |
| Client-side JavaScript | Invoice/read key only - **never** ship the Admin key to a browser |

### Inspecting your wallet via the API

`GET /api/v1/wallet` returns different fields depending on which key you authenticate with.

**With the Invoice/read key** - minimal, public-safe view:

```bash
curl https://your-lnbits.com/api/v1/wallet \
  -H "X-Api-Key: YOUR_INVOICE_KEY"
```

```json
{
  "name": "My Wallet",
  "balance": 50000
}
```

**With the Admin key** - full wallet object, including both keys:

```bash
curl https://your-lnbits.com/api/v1/wallet \
  -H "X-Api-Key: YOUR_ADMIN_KEY"
```

```json
{
  "id": "wallet-uuid",
  "name": "My Wallet",
  "balance": 50000,
  "adminkey": "admin-key-here",
  "inkey": "invoice-key-here"
}
```

::: warning
The Invoice key **cannot** retrieve the Admin key. The two keys are issued together in the LNbits UI (**API info panel**) - that is the only place to read them.
:::

For a deeper explanation of each key's scope, see the [API Keys page](/guide/core/api-keys).

## Shared wallets

Share a wallet with other users while controlling what they can do.

### Inviting a user

```bash
curl -X PUT https://your-lnbits.com/api/v1/wallet/share/invite \
  -H "X-Api-Key: YOUR_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "user_id": "target-user-id",
    "permissions": ["VIEW_PAYMENTS", "RECEIVE_PAYMENTS"]
  }'
```

### Permission levels

| Permission | Can view | Can receive | Can send |
| --- | --- | --- | --- |
| `VIEW_PAYMENTS` | Yes | No | No |
| `RECEIVE_PAYMENTS` | Yes | Yes | No |
| `SEND_PAYMENTS` | Yes | Yes | Yes |

## Wallet metadata

Customize your wallets with metadata:

```bash
curl -X PUT https://your-lnbits.com/api/v1/wallet \
  -H "X-Api-Key: YOUR_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Shop Revenue",
    "currency": "USD"
  }'
```

## Deleting wallets

::: danger
Deleting a wallet is **permanent**. The balance is lost. Make sure to withdraw all funds first.
:::

```bash
curl -X DELETE https://your-lnbits.com/api/v1/wallet \
  -H "X-Api-Key: YOUR_ADMIN_KEY"
```

## Best practices

- **One wallet per purpose** - keep shop revenue separate from personal funds
- **Use invoice keys** in public-facing applications
- **Rotate keys** if you suspect they've been compromised (recreate the wallet)
- **Monitor balances** using the paginated wallet list endpoint
- **Use labels** to categorize wallets for reporting

## Related Pages

- [API Keys](/guide/core/api-keys): Admin key vs Invoice key in detail
- [Payments](/guide/core/payments): Send and receive Lightning payments
- [Wallets API](/api/core/wallets): API endpoint reference
- [Security](/guide/core/security): Key management and hardening
