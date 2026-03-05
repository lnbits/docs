# Extensions API

> Install, activate, and manage extensions via the LNbits API.

## Install Extension

`POST /api/v1/extension`

**Auth:** Bearer token

Install an extension from a source repository.

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `ext_id` | string | Yes | Extension identifier (e.g. `"lnurlp"`) |
| `source_repo` | string | Yes | Repository source (e.g. `"official"` or a manifest URL) |

#### Response `200`

| Field | Type | Description |
|-------|------|-------------|
| `ext_id` | string | Extension identifier |
| `name` | string | Display name |
| `version` | string | Installed version |
| `installed` | boolean | Installation status |
| `active` | boolean | Whether extension is active |

```json
{
  "ext_id": "lnurlp",
  "name": "LNURLp",
  "version": "1.0.0",
  "installed": true,
  "active": true
}
```

## List Releases

`GET /api/v1/extension/{ext_id}/releases`

**Auth:** Bearer token

List available versions for an extension from its source repository.

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `ext_id` | string (path) | Yes | Extension identifier |

#### Response `200`

Array of release objects:

| Field | Type | Description |
|-------|------|-------------|
| `version` | string | Release version |
| `description` | string | Release notes |
| `min_lnbits_version` | string | Minimum LNbits version required |

```json
[
  {
    "version": "1.2.0",
    "description": "Added multi-wallet support",
    "min_lnbits_version": "0.12.0"
  },
  {
    "version": "1.1.0",
    "description": "Bug fixes and performance improvements",
    "min_lnbits_version": "0.11.0"
  }
]
```

## Get Extension Details

`GET /api/v1/extension/{ext_id}/details`

**Auth:** Bearer token

Get detailed information about an installed extension.

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `ext_id` | string (path) | Yes | Extension identifier |

#### Response `200`

| Field | Type | Description |
|-------|------|-------------|
| `ext_id` | string | Extension identifier |
| `name` | string | Display name |
| `version` | string | Installed version |
| `description` | string | Extension description |
| `active` | boolean | Whether currently active |
| `stars` | number | Average rating |
| `review_count` | integer | Number of reviews |

```json
{
  "ext_id": "lnurlp",
  "name": "LNURLp",
  "version": "1.0.0",
  "description": "Create LNURL-pay links",
  "active": true,
  "stars": 4.5,
  "review_count": 12
}
```

## Activate / Deactivate

`PUT /api/v1/extension/{ext_id}`

**Auth:** Bearer token

Toggle an extension on or off for the current user.

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `ext_id` | string (path) | Yes | Extension identifier |
| `active` | boolean | Yes | `true` to activate, `false` to deactivate |

#### Response `200`

```json
{
  "ext_id": "lnurlp",
  "active": true
}
```

## Uninstall Extension

`DELETE /api/v1/extension/{ext_id}`

**Auth:** Bearer token

::: danger Destructive Operation
Uninstalling removes the extension's database tables and all associated data. This action cannot be undone.
:::

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `ext_id` | string (path) | Yes | Extension identifier |

#### Response `200`

```json
{
  "detail": "Extension uninstalled"
}
```

## Submit Review

`POST /api/v1/extension/{ext_id}/reviews`

**Auth:** Bearer token

Submit a review and rating for an extension.

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `ext_id` | string (path) | Yes | Extension identifier |
| `rating` | integer | Yes | Rating from 1 to 5 |
| `comment` | string | No | Review text |

#### Response `201`

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Review ID |
| `ext_id` | string | Extension identifier |
| `rating` | integer | Submitted rating |
| `comment` | string | Review text |

```json
{
  "id": "review-uuid",
  "ext_id": "lnurlp",
  "rating": 5,
  "comment": "Works great for my shop"
}
```

## Related Pages

- [API Reference](/api/)
- [Using Extensions Guide](/guide/using-extensions)
- [Extensions Index](/extensions/)
- [Admin Extensions API](/api/admin/extensions)
