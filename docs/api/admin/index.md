# Admin API

> Server administration API - manage settings, users, and extensions at the instance level.

The Admin API provides endpoints for managing the LNbits instance. These endpoints require elevated privileges.

## Prerequisites

To use the Admin API:

1. **Enable the Admin UI** - set `LNBITS_ADMIN_UI=true` in your `.env` file
2. **Authenticate as an admin** - you must be either:
   - The **Super User** (defined by `SUPER_USER` in `.env`)
   - A user listed in `LNBITS_ADMIN_USERS`

::: warning
Some endpoints (settings, deleting users, installing extensions) require **Super User** access - admin users alone cannot perform these operations.
:::

## Authentication

Admin endpoints use the same Bearer token authentication as user endpoints. Log in and use the returned JWT:

```bash
# Get a Bearer token
curl -X POST https://your-lnbits.com/api/v1/auth \
  -H "Content-Type: application/json" \
  -d '{"username": "admin", "password": "your-password"}'

# Use it with admin endpoints
curl https://your-lnbits.com/api/v1/admin/settings \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Endpoints

| Section | Auth Level | Description |
|---------|-----------|-------------|
| [Settings](/api/admin/settings) | Super User | Read and update server configuration |
| [Users](/api/admin/users) | Admin / Super User | List, create, update, delete users |
| [Top-up](/api/admin/topup) | Super User | Add balance to any wallet |
| [Extensions](/api/admin/extensions) | Admin / Super User | Manage extensions server-wide |

## Related Pages

- [Admin Settings API](/api/admin/settings)
- [Admin Users API](/api/admin/users)
- [Admin Dashboard Guide](/guide/admin-dashboard)
- [Super User Guide](/guide/core/super-user)
