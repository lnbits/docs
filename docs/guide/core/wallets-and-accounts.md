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

Each wallet has two keys:

```bash
# Check your wallet info (shows keys)
curl https://your-lnbits.com/api/v1/wallet \
  -H "X-Api-Key: YOUR_INVOICE_KEY"
```

Response:
```json
{
  "id": "wallet-uuid",
  "name": "My Wallet",
  "balance": 50000,
  "adminkey": "admin-key-here",
  "inkey": "invoice-key-here"
}
```

### When to use which key

| Scenario | Key |
| --- | --- |
| Creating invoices for your website | Invoice key |
| Automated payouts / withdrawals | Admin key |
| Checking balance from a dashboard | Invoice key |
| Managing wallet settings | Admin key |
| Client-side JavaScript | Invoice key only |

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

- **One wallet per purpose** — keep shop revenue separate from personal funds
- **Use invoice keys** in public-facing applications
- **Rotate keys** if you suspect they've been compromised (recreate the wallet)
- **Monitor balances** using the paginated wallet list endpoint
- **Use labels** to categorize wallets for reporting

## Related Pages

- [API Keys](/guide/core/api-keys): Admin key vs Invoice key in detail
- [Payments](/guide/core/payments): Send and receive Lightning payments
- [Wallets API](/api/core/wallets): API endpoint reference
- [Security](/guide/core/security): Key management and hardening
