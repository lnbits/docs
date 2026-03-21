# API Keys

> Every LNbits wallet has an Admin key (full access) and an Invoice key (receive-only). Use the right key for each operation.

Every LNbits wallet has two API keys with different permission levels.

## Key types

| Key | Header | Permissions |
| --- | --- | --- |
| **Admin key** | `X-Api-Key: <admin_key>` | Full access - send, receive, read, manage |
| **Invoice key** | `X-Api-Key: <invoice_key>` | Limited - create invoices, read wallet info |

## Admin key

The admin key grants full control over a wallet:

- Create invoices (receive payments)
- Pay invoices (send payments)
- Read wallet balance and transaction history
- Manage wallet settings
- Access extension APIs that modify data

```bash
curl -H "X-Api-Key: ADMIN_KEY" \
  https://your-lnbits.com/api/v1/wallet
```

::: warning
Treat the admin key like a password. Anyone with this key can spend your wallet balance.
:::

## Invoice key

The invoice key has read + receive permissions only:

- Create invoices (receive payments)
- Read wallet balance and transaction history
- Access extension APIs that only read data

```bash
curl -H "X-Api-Key: INVOICE_KEY" \
  https://your-lnbits.com/api/v1/wallet
```

Use the invoice key when you only need to receive payments - for example, in a point-of-sale terminal or a public payment page.

## Finding your keys

1. Log in to LNbits
2. Select a wallet from the sidebar
3. Click the **API info** section
4. Click the eye icon to reveal each key

## Key rotation

API keys can be regenerated from the wallet settings. Regenerating a key immediately invalidates the old one.

## Bearer tokens

LNbits also supports Bearer token authentication for user-level operations:

```bash
curl -H "Authorization: Bearer ACCESS_TOKEN" \
  https://your-lnbits.com/api/v1/wallet
```

Access tokens are obtained through the authentication API.

## Related Pages

- [Wallets & Accounts](/guide/core/wallets-and-accounts.md)
- [Authentication](/api/authentication)
- [Security](/guide/core/security.md)
