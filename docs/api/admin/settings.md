# Admin Settings API

> Read and update LNbits server configuration at runtime via the Admin API.

Manage server-wide settings without restarting the instance.

## Get Settings

`GET /api/v1/admin/settings`

**Auth:** Super User

Returns the current server configuration. Includes all configurable options.

#### Parameters

None.

#### Response `200`

The response contains all server settings. Common fields include:

| Field | Type | Description |
|-------|------|-------------|
| `lnbits_site_title` | string | Instance display name |
| `lnbits_site_tagline` | string | Tagline shown on the login page |
| `lnbits_allow_new_accounts` | boolean | Whether new registrations are allowed |
| `lnbits_admin_users` | string[] | List of admin user IDs |
| `lnbits_default_wallet_name` | string | Default name for new wallets |
| `lnbits_rate_limit_no` | integer | Rate limit: requests per window |
| `lnbits_rate_limit_unit` | string | Rate limit window (`"second"`, `"minute"`, `"hour"`) |
| `lnbits_theme_options` | string[] | Available UI themes |
| `lnbits_custom_logo` | string | URL for custom logo |
| `lnbits_denomination` | string | Display denomination (`"sats"`, `"msat"`, `"BTC"`) |

```json
{
  "lnbits_site_title": "My LNbits",
  "lnbits_site_tagline": "Free and open-source Lightning wallet",
  "lnbits_allow_new_accounts": true,
  "lnbits_admin_users": ["user-uuid-1"],
  "lnbits_default_wallet_name": "LNbits wallet",
  "lnbits_rate_limit_no": 200,
  "lnbits_rate_limit_unit": "minute",
  "lnbits_theme_options": ["classic", "bitcoin", "mint"],
  "lnbits_custom_logo": "",
  "lnbits_denomination": "sats"
}
```

## Update Settings

`PUT /api/v1/admin/settings`

**Auth:** Super User

Update configuration values at runtime without restarting. Only include the fields you want to change.

#### Parameters

Any settings field can be included in the request body. Common fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `lnbits_site_title` | string | No | Instance display name |
| `lnbits_site_tagline` | string | No | Login page tagline |
| `lnbits_allow_new_accounts` | boolean | No | Allow new registrations |
| `lnbits_admin_users` | string[] | No | Admin user IDs |
| `lnbits_default_wallet_name` | string | No | Default wallet name |
| `lnbits_rate_limit_no` | integer | No | Rate limit requests |
| `lnbits_rate_limit_unit` | string | No | Rate limit window |
| `lnbits_denomination` | string | No | Display denomination |

#### Response `200`

Returns the full updated settings object (same format as [Get Settings](#get-settings)).

```json
{
  "lnbits_site_title": "My LNbits",
  "lnbits_allow_new_accounts": false
}
```

**Example:**

```bash
curl -X PUT https://your-lnbits.com/api/v1/admin/settings \
  -H "Authorization: Bearer SUPER_USER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "lnbits_site_title": "My LNbits Instance",
    "lnbits_allow_new_accounts": false,
    "lnbits_rate_limit_no": 100
  }'
```

::: tip
Settings updated via the API take effect immediately and persist across restarts. They override values set in `.env` or environment variables.
:::

## Related Pages

- [Admin API](/api/admin/)
- [Environment Configuration Guide](/guide/core/environment)
- [Admin Dashboard Guide](/guide/admin-dashboard)
