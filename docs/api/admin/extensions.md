# Admin Extensions API

> Manage extension installation and access at the server level via the Admin API.

Server-wide extension management — list all extensions, enable/disable them globally, or install new ones from manifest URLs.

## List Extensions

`GET /api/v1/admin/extensions`

**Auth:** Admin

List all installed extensions and their status across the instance.

#### Parameters

None.

#### Response `200`

Array of extension objects:

| Field | Type | Description |
|-------|------|-------------|
| `ext_id` | string | Extension identifier |
| `name` | string | Display name |
| `version` | string | Installed version |
| `active` | boolean | Whether extension is enabled server-wide |
| `installed` | boolean | Whether extension is installed |

```json
[
  {
    "ext_id": "lnurlp",
    "name": "LNURLp",
    "version": "1.0.0",
    "active": true,
    "installed": true
  },
  {
    "ext_id": "boltz",
    "name": "Boltz",
    "version": "0.5.0",
    "active": false,
    "installed": true
  }
]
```

## Enable / Disable Extension

`POST /api/v1/admin/extensions`

**Auth:** Admin

Enable or disable an extension server-wide. When disabled, no user can access it.

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `extension` | string | Yes | Extension identifier |
| `active` | boolean | Yes | `true` to enable, `false` to disable |

#### Response `200`

| Field | Type | Description |
|-------|------|-------------|
| `ext_id` | string | Extension identifier |
| `active` | boolean | Updated status |

```json
{
  "ext_id": "lnurlp",
  "active": true
}
```

**Example:**

```bash
curl -X POST https://your-lnbits.com/api/v1/admin/extensions \
  -H "Authorization: Bearer ADMIN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"extension": "lnurlp", "active": false}'
```

## Install from Manifest

`POST /api/v1/admin/extensions/install`

**Auth:** Super User

Install an extension from an external manifest URL. This allows installing extensions not in the official registry.

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `ext_id` | string | Yes | Extension identifier |
| `source_repo` | string | Yes | Manifest URL or repository identifier |

#### Response `200`

| Field | Type | Description |
|-------|------|-------------|
| `ext_id` | string | Extension identifier |
| `name` | string | Extension display name |
| `version` | string | Installed version |
| `installed` | boolean | Installation status |

```json
{
  "ext_id": "custom-ext",
  "name": "Custom Extension",
  "version": "0.1.0",
  "installed": true
}
```

**Example:**

```bash
curl -X POST https://your-lnbits.com/api/v1/admin/extensions/install \
  -H "Authorization: Bearer SUPER_USER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "ext_id": "myext",
    "source_repo": "https://raw.githubusercontent.com/user/repo/main/manifest.json"
  }'
```

## Related Pages

- [Admin API](/api/admin/)
- [Extensions API](/api/core/extensions)
- [Using Extensions Guide](/guide/using-extensions)
- [Deploying Extensions](/dev/extensions/)
