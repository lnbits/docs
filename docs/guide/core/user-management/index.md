# User Management

> Manage user accounts, permissions, and access control in LNbits.

Manage accounts and wallets across your LNbits instance.

## Listing users

```bash
curl "https://your-lnbits.com/users/api/v1/user?limit=20&offset=0" \
  -H "X-Api-Key: ADMIN_KEY"
```

Supports filtering by username, email, and sorting.

## Creating users (admin)

```bash
curl -X POST https://your-lnbits.com/users/api/v1/user \
  -H "X-Api-Key: ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "merchant",
    "password": "secure-password",
    "email": "merchant@example.com"
  }'
```

## Updating users

```bash
curl -X PUT https://your-lnbits.com/users/api/v1/user/USER_ID \
  -H "X-Api-Key: ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{"email": "new-email@example.com"}'
```

## Balance adjustments

Admins can manually adjust wallet balances (useful for crediting users or fixing accounting):

```bash
curl -X PUT https://your-lnbits.com/users/api/v1/user/USER_ID/balance \
  -H "X-Api-Key: ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{"amount": 10000}'
```

::: warning
Balance adjustments are recorded in the audit log but should be used sparingly. They create sats from thin air in the internal ledger.
:::

## Managing user extensions

Control which extensions a user can access:

```bash
curl -X POST https://your-lnbits.com/users/api/v1/user/USER_ID/extensions \
  -H "X-Api-Key: ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{"extensions": ["lnurlp", "tpos"]}'
```

## Deleting users

```bash
curl -X DELETE https://your-lnbits.com/users/api/v1/user/USER_ID \
  -H "X-Api-Key: ADMIN_KEY"
```

::: danger
Deleting a user removes all their wallets and associated data permanently.
:::

## Three-role model

LNbits uses a three-tier role system:

| Capability | Super User | Admin | Regular User |
| --- | --- | --- | --- |
| Create and manage own wallets | Yes | Yes | Yes |
| Use enabled extensions | Yes | Yes | Yes |
| Access admin dashboard | Yes | Yes | No |
| Manage server settings | Yes | Yes | No |
| Install/uninstall extensions | Yes | Yes | No |
| View audit log | Yes | Yes | No |
| Manage all users | Yes | No | No |
| Add/remove admin accounts | Yes | No | No |
| Impersonate any user | Yes | No | No |
| Cannot be demoted by admins | Yes | — | — |

### Super User

The highest-privilege account. Created on first run when `LNBITS_ADMIN_UI=true`. Stored in `data/.super_user`. See [Super User](/guide/core/super-user) for full details.

### Admin

Admins are set via `LNBITS_ADMIN_USERS` or added by the Super User through the Admin UI. They can manage settings and extensions but cannot modify the admin user list or impersonate users.

### Regular User

Standard accounts created through the login flow. They can create wallets, use enabled extensions, and manage their own data.

## Best practices

- **Principle of least privilege** — give users the minimum role they need
- **Separate admin accounts** — don't share the Super User for daily operations
- **Audit regularly** — review admin accounts and user activity periodically
- **Private instances** — use `LNBITS_ALLOWED_USERS` to restrict who can create accounts

## Access patterns

| Role | Can manage users | Can manage wallets | Can see audit |
| --- | --- | --- | --- |
| Super user | All users | All wallets | Yes |
| Admin | Limited users | Own wallets | Yes |
| Regular user | — | Own wallets | — |

## Related Pages

- [Super User](/guide/core/super-user) — highest-privilege account details
- [Authentication](/guide/authentication.md)
- [Admin Dashboard](/guide/admin-dashboard.md)
- [Users Admin API](/api/admin/users.md)
