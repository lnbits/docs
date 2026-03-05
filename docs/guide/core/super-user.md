# Super User

> The Super User is the highest-privilege account in LNbits — created on first run when the Admin UI is enabled, stored in `data/.super_user`.

The Super User has unrestricted access to every function in LNbits. It is the only account that can manage Top Ups and Funding Sources.

## How the Super User is created

The Super User is created automatically the first time you enable the Admin UI and access LNbits:

1. Set `LNBITS_ADMIN_UI=true` in your `.env` file
2. Start LNbits
3. On first visit, you're prompted to create credentials (username and password)
4. The account you create becomes the Super User

The Super User identity is stored in:

```
data/.super_user
```

This file contains the Super User's user ID. It is created once and persists across restarts.

::: warning
Since LNbits v1, credentialed login is **required**. The old URL-based access (wallet ID in the URL) no longer grants Super User privileges. You must log in with username and password.
:::

## Capabilities

The Super User has all admin privileges plus exclusive capabilities:

| Capability | Super User | Admin | Regular User |
| --- | --- | --- | --- |
| Manage own wallets | Yes | Yes | Yes |
| Access extensions | Yes | Yes | Yes |
| View admin dashboard | Yes | Yes | No |
| Manage server settings | Yes | Yes | No |
| Manage extensions (install/uninstall) | Yes | Yes | No |
| View audit log | Yes | Yes | No |
| Add/remove admin users | Yes | No | No |
| Impersonate any user | Yes | No | No |
| Access all system settings | Yes | No | No |
| Modify the admin user list | Yes | No | No |
| Cannot be demoted by admins | Yes | — | — |

## Key rules

- **Cannot be demoted** — admins cannot remove or demote the Super User. Only the Super User can modify its own status.
- **Only one Super User** — there is exactly one Super User per LNbits instance.
- **CLI-only replacement** — to replace the Super User, you must edit or delete the `data/.super_user` file directly. There is no UI for this.

## Replacing the Super User

If you need to change the Super User (e.g., lost credentials):

```bash
# Stop LNbits
# Delete the super user file
rm data/.super_user

# Restart LNbits
# On next visit, you'll be prompted to create a new Super User
```

Alternatively, edit the file directly with a different user ID:

```bash
# Replace with an existing user's ID
echo "new-user-id-here" > data/.super_user
```

## Super User vs Admin

| Aspect | Super User | Admin |
| --- | --- | --- |
| Set via | First-run prompt + `data/.super_user` | `LNBITS_ADMIN_USERS` env var or UI |
| Quantity | Exactly one | Multiple allowed |
| Can manage admins | Yes | Yes |
| Can be demoted | Only via CLI | Yes |
| Impersonation | Yes | No |

## Configuration

```bash
# Enable the Admin UI (required for Super User creation)
LNBITS_ADMIN_UI=true

# Optional: set admin users (these are NOT the Super User)
LNBITS_ADMIN_USERS=user-id-1,user-id-2
```

The Super User is **not** set via environment variables — it's created interactively on first run and stored in `data/.super_user`.

## Security best practices

- Use a strong password for the Super User account
- Limit who has filesystem access to `data/.super_user`
- Don't share Super User credentials — create separate admin accounts for other administrators
- Regularly review the admin user list
- Consider using the Super User only for initial setup, then use regular admin accounts for day-to-day operations

## Related Pages

- [Admin Dashboard](/guide/admin-dashboard) — server administration interface
- [User Management](/guide/core/user-management/) — managing user accounts
- [Authentication](/guide/authentication) — login methods and access control
- [Security](/guide/core/security) — hardening your LNbits instance
