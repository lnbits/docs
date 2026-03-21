# Wallets & Accounts FAQ

> Common questions about API keys, multiple wallets, user management, and account settings.

[[toc]]

## What's the difference between Admin key and Invoice key?

LNbits wallets have two API keys with different permission levels:

| Key | Can receive | Can send | Can read |
|---|---|---|---|
| **Admin key** | Yes | Yes | Yes |
| **Invoice key** | Yes | No | Yes |

The **Admin key** has full access - it can create invoices, send payments, and read wallet data. The **Invoice key** can only create invoices (receive) and read wallet data. It cannot send payments.

**Best practice**: Use the Invoice key for public-facing integrations (e.g., a donation page). Use the Admin key only in trusted server-side code. See [API Keys](/guide/core/api-keys).

## Can I have multiple wallets?

Yes. Each user can create multiple wallets, each with its own balance and API keys. This is useful for separating funds by purpose (e.g., "Donations", "Shop", "Tips"). Click the **+** button in the LNbits sidebar to create a new wallet.

## Are wallet balances real?

Wallet balances are internal accounting within LNbits. The actual Bitcoin lives on the connected Lightning backend (your node). The total of all LNbits wallet balances should not exceed the backend's available liquidity.

If your node has 500,000 sats in outbound capacity, the sum of all LNbits wallet balances should stay within that limit. LNbits does not enforce this automatically - the admin is responsible for monitoring liquidity.

## How do I create a new user or wallet?

**New wallet for an existing user**: Click the **+** icon in the left sidebar of the LNbits UI.

**New user**: Navigate to the LNbits base URL (e.g., `https://your-lnbits.com`). A new user and wallet are created automatically unless restricted by `LNBITS_ALLOWED_USERS`.

**Via API**: Use the Admin API to create users programmatically. See [Users & Accounts API](/api/core/users).

## How do I delete a wallet?

Click the wallet name in the sidebar, then click the **delete** icon (trash can). This deletes the wallet and its API keys. Transaction history is preserved in the database but no longer accessible through the UI.

::: warning
Deleting a wallet cannot be undone. Any remaining balance is returned to the funding source.
:::

## How do I prevent new account signups?

Set the allowed users list in your `.env` file:

```bash
LNBITS_ALLOWED_USERS=user-id-1,user-id-2
```

When this variable is set, only the listed user IDs can access the instance. Anyone else gets an access denied error. You can find user IDs in the Admin Dashboard under **Users**.

## What are the three user roles?

LNbits uses a three-role permission model:

| Role | Capabilities |
|---|---|
| **Admin** | Access Admin Dashboard, manage server settings, manage users, manage extensions |
| **User** | Create wallets, use enabled extensions, send/receive payments |
| **Extension User** | Limited access scoped to specific extension features |

Admins are configured via `LNBITS_ADMIN_USERS` in `.env` or through the Admin Dashboard. See [User Roles](/guide/core/user-roles).

## Can I set spending limits per wallet?

LNbits does not have built-in per-wallet spending limits. However, you can achieve similar control by:

- Creating wallets with limited top-up amounts
- Using extensions that enforce payment rules
- Monitoring wallet activity through the Admin Dashboard

The effective spending limit is always bounded by the wallet's balance.

## How do I see transaction history?

In the LNbits UI, click on a wallet to see its transaction list. Each transaction shows:

- Direction (incoming/outgoing)
- Amount in sats
- Memo / description
- Status (settled, pending, failed)
- Timestamp

**Via API**: Use `GET /api/v1/payments` with the wallet's Invoice key or Admin key. See [Payments API](/api/core/payments).

## Missing balance after update

If wallet balances appear incorrect after an update:

1. **Check migration logs** - database migrations run automatically on startup. Look for errors in the logs.
2. **Verify the database** - ensure the correct database is configured in `.env`. A common mistake is accidentally switching between SQLite and PostgreSQL.
3. **Check the funding source** - verify your Lightning backend is connected and has the expected balance.
4. **Restart LNbits** - sometimes a clean restart resolves stale cache issues.

If the issue persists, check [GitHub Issues](https://github.com/lnbits/lnbits/issues) or ask in the [Telegram group](https://t.me/lnbits).

## Related Pages

- [API Keys](/guide/core/api-keys) - key types and usage
- [Wallets & Accounts](/guide/core/wallets-and-accounts) - detailed wallet documentation
- [User Roles](/guide/core/user-roles) - role-based permissions
- [User Management](/guide/core/user-management/) - managing users
