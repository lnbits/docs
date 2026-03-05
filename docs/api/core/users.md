# Users & Accounts API

> User authentication, registration, profile management, and access control lists (ACLs).

## Login (Username & Password)

`POST /api/v1/auth`

**Auth:** None

Authenticate with username and password to obtain a Bearer token.

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `username` | string | Yes | Account username |
| `password` | string | Yes | Account password |

#### Response `200`

| Field | Type | Description |
|-------|------|-------------|
| `access_token` | string | JWT Bearer token |
| `token_type` | string | Always `"bearer"` |

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "bearer"
}
```

## Login (User ID)

`POST /api/v1/auth/usr`

**Auth:** None

Legacy login method using a user ID string.

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `usr` | string | Yes | User ID |

#### Response `200`

| Field | Type | Description |
|-------|------|-------------|
| `access_token` | string | JWT Bearer token |
| `token_type` | string | Always `"bearer"` |

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "bearer"
}
```

## Login (Nostr)

`POST /api/v1/auth/nostr`

**Auth:** None

Authenticate using a signed Nostr NIP-98 event.

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `nostr_event` | string | Yes | Signed NIP-98 event JSON |

#### Response `200`

| Field | Type | Description |
|-------|------|-------------|
| `access_token` | string | JWT Bearer token |
| `token_type` | string | Always `"bearer"` |

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "bearer"
}
```

## Login (OAuth)

`POST /api/v1/auth/{provider}/token`

**Auth:** None

Complete OAuth login flow. Supported providers: `google`, `github`, `keycloak`.

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `provider` | string (path) | Yes | OAuth provider name |

#### Response `200`

| Field | Type | Description |
|-------|------|-------------|
| `access_token` | string | JWT Bearer token |
| `token_type` | string | Always `"bearer"` |

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "bearer"
}
```

## Get Current User

`GET /api/v1/auth`

**Auth:** Bearer token

Returns the authenticated user's profile.

#### Parameters

None.

#### Response `200`

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | User ID |
| `username` | string | Username |
| `email` | string | Email address (if set) |
| `display_name` | string | Display name |
| `is_admin` | boolean | Whether user is an admin |
| `created_at` | string | ISO 8601 creation timestamp |

```json
{
  "id": "user-uuid",
  "username": "satoshi",
  "email": "satoshi@example.com",
  "display_name": "Satoshi",
  "is_admin": false,
  "created_at": "2024-01-15T10:30:00Z"
}
```

## Register

`POST /api/v1/auth/register`

**Auth:** None

Create a new user account. Registration must be enabled on the instance (`LNBITS_ALLOW_NEW_ACCOUNTS=true`).

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `username` | string | Yes | Desired username |
| `password` | string | Yes | Account password |
| `email` | string | No | Email address |

#### Response `201`

| Field | Type | Description |
|-------|------|-------------|
| `access_token` | string | JWT Bearer token |
| `token_type` | string | Always `"bearer"` |

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "bearer"
}
```

## Update Profile

`PUT /api/v1/auth/me`

**Auth:** Bearer token

Update the current user's profile.

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `display_name` | string | No | New display name |
| `email` | string | No | New email address |

#### Response `200`

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | User ID |
| `username` | string | Username |
| `email` | string | Updated email |
| `display_name` | string | Updated display name |

```json
{
  "id": "user-uuid",
  "username": "satoshi",
  "email": "new@example.com",
  "display_name": "Satoshi Nakamoto"
}
```

## Update Password

`PUT /api/v1/auth/update-password`

**Auth:** Bearer token

Change the current user's password.

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `old_password` | string | Yes | Current password |
| `new_password` | string | Yes | New password |

#### Response `200`

```json
{
  "detail": "Password updated"
}
```

## Reset Password

`POST /api/v1/auth/reset-password`

**Auth:** None

Request a password reset email. Requires SMTP to be configured on the instance.

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `email` | string | Yes | Account email address |

#### Response `200`

```json
{
  "detail": "Password reset email sent"
}
```

## Delete Account

`DELETE /api/v1/auth/me`

**Auth:** Bearer token

::: danger Destructive Operation
This permanently deletes your account, all wallets, and all payment data. This action cannot be undone.
:::

#### Parameters

None.

#### Response `200`

```json
{
  "detail": "Account deleted"
}
```

## List ACLs

`GET /api/v1/auth/acls`

**Auth:** Bearer token

List all Access Control Lists for the current user.

#### Parameters

None.

#### Response `200`

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | ACL ID |
| `name` | string | ACL name |
| `allowed_endpoints` | string[] | List of allowed endpoint patterns |
| `created_at` | string | ISO 8601 creation timestamp |

```json
[
  {
    "id": "acl-uuid",
    "name": "read-only-dashboard",
    "allowed_endpoints": [
      "GET /api/v1/wallet",
      "GET /api/v1/payments"
    ],
    "created_at": "2024-01-15T10:30:00Z"
  }
]
```

## Create ACL

`POST /api/v1/auth/acls`

**Auth:** Bearer token

Create a new Access Control List with specific endpoint permissions.

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | Yes | Descriptive name for the ACL |
| `allowed_endpoints` | string[] | Yes | List of `"METHOD /path"` patterns |

#### Response `201`

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | ACL ID |
| `name` | string | ACL name |
| `allowed_endpoints` | string[] | Allowed endpoint patterns |

```json
{
  "id": "acl-uuid",
  "name": "read-only-dashboard",
  "allowed_endpoints": [
    "GET /api/v1/wallet",
    "GET /api/v1/payments"
  ]
}
```

## Update ACL

`PUT /api/v1/auth/acls/{acl_id}`

**Auth:** Bearer token

Update an existing ACL's name or allowed endpoints.

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `acl_id` | string (path) | Yes | ACL ID |
| `name` | string | No | New name |
| `allowed_endpoints` | string[] | No | Updated endpoint patterns |

#### Response `200`

```json
{
  "id": "acl-uuid",
  "name": "updated-name",
  "allowed_endpoints": [
    "GET /api/v1/wallet"
  ]
}
```

## Delete ACL

`DELETE /api/v1/auth/acls/{acl_id}`

**Auth:** Bearer token

Delete an ACL and revoke all its tokens.

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `acl_id` | string (path) | Yes | ACL ID |

#### Response `200`

```json
{
  "detail": "ACL deleted"
}
```

## Generate ACL Token

`POST /api/v1/auth/acls/{acl_id}/tokens`

**Auth:** Bearer token

Generate a new token for an existing ACL. Use this token as a Bearer token — it will only allow the endpoints defined in the ACL.

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `acl_id` | string (path) | Yes | ACL ID |

#### Response `201`

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | Token ID |
| `token` | string | The Bearer token to use |
| `acl_id` | string | Parent ACL ID |
| `created_at` | string | ISO 8601 creation timestamp |

```json
{
  "id": "token-uuid",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "acl_id": "acl-uuid",
  "created_at": "2024-01-15T10:30:00Z"
}
```

## Revoke ACL Token

`DELETE /api/v1/auth/acls/{acl_id}/tokens/{token_id}`

**Auth:** Bearer token

Revoke a specific ACL token. The token will immediately stop working.

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `acl_id` | string (path) | Yes | ACL ID |
| `token_id` | string (path) | Yes | Token ID to revoke |

#### Response `200`

```json
{
  "detail": "Token revoked"
}
```

## Related Pages

- [Authentication](/api/authentication)
- [API Reference](/api/)
- [API Keys Guide](/guide/core/api-keys)
- [Security Guide](/guide/core/security)
- [Admin Users API](/api/admin/users)
