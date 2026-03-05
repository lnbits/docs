# Admin Dashboard

> The LNbits admin dashboard provides server administration, user management, extension control, funding source monitoring, and runtime configuration.

The admin dashboard provides system-wide management of your LNbits instance.

## Enabling the admin UI

```bash
LNBITS_ADMIN_UI=true
LNBITS_ADMIN_USERS=your-user-id
```

Once enabled, admin users see an **Admin** section in the navigation.

## First-run flow

When you start LNbits with `LNBITS_ADMIN_UI=true` for the first time:

1. Navigate to your LNbits instance in a browser
2. You are prompted to create a **Super User** account (username + password)
3. The Super User identity is stored in `data/.super_user`
4. You're logged in with full admin privileges

See [Super User](/guide/core/super-user) for details on the Super User role and how to replace it.

## Dashboard overview

The admin dashboard gives you access to:

- **Server settings** — modify configuration without restarting
- **User management** — create, edit, disable accounts
- **Extension management** — control which extensions are available
- **Funding source** — view backend status and balance
- **Audit log** — track all system activity
- **Node management** — manage channels and peers (if backend supports it)

## Server settings

When the Admin UI is enabled, many settings that would normally live in the `.env` file are **moved to the database** and managed here instead. Editing those values in `.env` has no effect — you must change them through this UI or the [Admin API](/api/admin/settings).

Settings you can manage at runtime:

- Site title, tagline, and branding
- Theme options
- Fee configuration
- Rate limits
- Auth methods
- Extension sources
- Funding source (wallet backend)
- Wallet limits
- Node UI visibility

Changes take effect immediately — no restart needed.

::: tip
Not sure which settings live in `.env` and which ones moved to the Admin UI? See the full breakdown at [`.env` file vs Admin UI](/guide/core/environment#env-vs-admin-ui).
:::

### Via the API

```bash
# Get current settings
curl https://your-lnbits.com/admin/api/v1/settings \
  -H "X-Api-Key: ADMIN_KEY"

# Update settings
curl -X PUT https://your-lnbits.com/admin/api/v1/settings \
  -H "X-Api-Key: ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{"lnbits_site_title": "My Lightning Hub"}'
```

## Audit and monitoring

### Audit endpoint

```bash
curl https://your-lnbits.com/admin/api/v1/audit \
  -H "X-Api-Key: ADMIN_KEY"
```

Returns balance information, funding source status, and recent activity.

### Monitor endpoint

```bash
curl https://your-lnbits.com/admin/api/v1/monitor \
  -H "X-Api-Key: ADMIN_KEY"
```

Returns system health, memory usage, and active connections.

## Reset to defaults

If your Admin UI settings get into a bad state, you can reset them:

1. Stop LNbits
2. Delete the settings from the database (or delete the database file for SQLite)
3. Restart LNbits — settings revert to `.env` file values

The Admin UI settings are stored in the database. When `LNBITS_ADMIN_UI=true`, the database values take precedence over `.env` values for managed settings.

## Allowed users (private instance)

To restrict who can access your LNbits instance:

```bash
LNBITS_ALLOWED_USERS=user-id-1,user-id-2,user-id-3
```

When set, only listed users can log in. New account creation is blocked for everyone else. This effectively makes your instance private.

## Super user

The super user has the highest privilege level. It is created automatically on first run (see [First-run flow](#first-run-flow)) and stored in `data/.super_user`.

Super user capabilities:
- All admin privileges
- Can impersonate any user
- Can modify admin user list
- Access to all system settings
- Cannot be demoted by other admins

See [Super User](/guide/core/super-user) for full documentation.

::: warning
The super user can perform any action on any account. Guard this credential carefully.
:::

## Related Pages

- [Super User](/guide/core/super-user) — highest-privilege account details
- [Admin API Reference](/api/admin/) — API endpoints for admin operations
- [Configuration](/guide/core/environment) — environment variables and server settings
- [Authentication](/guide/authentication) — login methods and access control
