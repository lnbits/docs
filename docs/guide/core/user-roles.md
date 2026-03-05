# User Roles

> LNbits uses a three-tier role system — Super User, Admin, and Regular User — each with different levels of access and responsibility.

Every account in LNbits has one of three roles. Understanding them is key to running a secure instance.

## The three roles

### Super User — Owner

The single highest-privilege account on the instance. Created on first launch. Reserved for initial setup and rare, high-impact operations.

- Configure the funding source (Lightning backend)
- Credit or debit any wallet (top-ups)
- Add and remove admin accounts
- Impersonate any user
- Access every setting and function

There is exactly **one** Super User per instance. It cannot be demoted by admins — only replaced via the CLI. See [Super User](/guide/core/super-user) for creation and recovery details.

### Admin — Day-to-Day Manager

Operational managers who handle the daily running of the instance without touching critical infrastructure.

- Manage users (create, edit, disable accounts)
- Enable and disable extensions for the instance
- Adjust security settings (rate limiting, allowed users)
- Customize site branding and themes
- Monitor activity via the audit log
- Manage server settings (except funding source)

Admins are set via `LNBITS_ADMIN_USERS` in `.env` or added by the Super User through the Admin UI. Multiple admins are allowed.

### Regular User — End User

Standard accounts for people who use LNbits for payments. No administrative access.

- Create and manage their own wallets
- Send and receive Lightning payments
- Use extensions that admins have enabled
- Generate and manage their own API keys

Regular users are created through the login flow (username/password, OAuth, etc.).

## Permissions matrix

| Capability | Super User | Admin | Regular User |
| --- | --- | --- | --- |
| Send and receive payments | Yes | Yes | Yes |
| Manage own wallets | Yes | Yes | Yes |
| Use enabled extensions | Yes | Yes | Yes |
| Generate API keys | Yes | Yes | Yes |
| View admin dashboard | Yes | Yes | No |
| Manage server settings | Yes | Yes | No |
| Install/uninstall extensions | Yes | Yes | No |
| Manage users and accounts | Yes | Yes | No |
| Adjust rate limits and security | Yes | Yes | No |
| Customize branding and themes | Yes | Yes | No |
| View audit log | Yes | Yes | No |
| Change funding source | Yes | No | No |
| Credit/debit any wallet (top-up) | Yes | No | No |
| Add/remove admin accounts | Yes | No | No |
| Impersonate any user | Yes | No | No |
| Cannot be demoted by others | Yes | — | — |

## How roles are assigned

| Role | How it's set | Quantity |
| --- | --- | --- |
| **Super User** | Created on first run, stored in `data/.super_user` | Exactly one |
| **Admin** | `LNBITS_ADMIN_USERS` env var or added via Admin UI | Multiple allowed |
| **Regular User** | Created through login flow (signup, OAuth) | Unlimited |

## Best practices

- **Reserve the Super User for setup** — use a regular admin account for daily operations
- **Separate admin accounts** — don't share credentials between administrators
- **Principle of least privilege** — only promote users to admin when they need it
- **Audit regularly** — review the admin list and user activity periodically
- **Test in staging** — try significant setting changes on a test instance before production

## Related Pages

- [Super User](/guide/core/super-user) — creation, recovery, and CLI replacement
- [User Management](/guide/core/user-management/) — create, edit, and delete accounts
- [Admin Dashboard](/guide/admin-dashboard) — server administration interface
- [Authentication](/guide/authentication) — login methods (password, OAuth, Nostr)
- [Security](/guide/core/security) — hardening your instance
