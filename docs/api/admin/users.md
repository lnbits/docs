# Admin Users API

> Create, list, and manage user accounts via the Admin API.

Manage users at the instance level. These endpoints use the `/users/api/v1/user` base path.

## List Users

`GET /users/api/v1/user`

**Auth:** Admin

List all registered users with pagination.

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `limit` | integer (query) | No | Items per page (default 20) |
| `offset` | integer (query) | No | Number of items to skip |

#### Response `200`

Array of user objects:

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | User UUID |
| `username` | string | Username |
| `email` | string | Email address |
| `is_admin` | boolean | Whether user has admin privileges |
| `wallet_count` | integer | Number of wallets |
| `created_at` | string | ISO 8601 creation timestamp |

```json
[
  {
    "id": "user-uuid-1",
    "username": "satoshi",
    "email": "satoshi@example.com",
    "is_admin": false,
    "wallet_count": 3,
    "created_at": "2024-01-15T10:30:00Z"
  },
  {
    "id": "user-uuid-2",
    "username": "admin",
    "email": "admin@example.com",
    "is_admin": true,
    "wallet_count": 1,
    "created_at": "2024-01-10T08:00:00Z"
  }
]
```

## Get User

`GET /users/api/v1/user/{user_id}`

**Auth:** Admin

Get details of a specific user.

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `user_id` | string (path) | Yes | User UUID |

#### Response `200`

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | User UUID |
| `username` | string | Username |
| `email` | string | Email address |
| `is_admin` | boolean | Whether user has admin privileges |
| `wallet_count` | integer | Number of wallets |
| `created_at` | string | ISO 8601 creation timestamp |

```json
{
  "id": "user-uuid-1",
  "username": "satoshi",
  "email": "satoshi@example.com",
  "is_admin": false,
  "wallet_count": 3,
  "created_at": "2024-01-15T10:30:00Z"
}
```

## Create User

`POST /users/api/v1/user`

**Auth:** Admin

Create a new user account.

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `username` | string | Yes | Username for the new account |
| `password` | string | Yes | Account password |
| `email` | string | No | Email address |

#### Response `201`

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | New user UUID |
| `username` | string | Username |
| `email` | string | Email address |

```json
{
  "id": "user-uuid-new",
  "username": "newuser",
  "email": "new@example.com"
}
```

## Update User

`PUT /users/api/v1/user/{user_id}`

**Auth:** Admin

Update an existing user's details.

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `user_id` | string (path) | Yes | User UUID |
| `username` | string | No | New username |
| `email` | string | No | New email |
| `is_admin` | boolean | No | Grant or revoke admin privileges |

#### Response `200`

```json
{
  "id": "user-uuid-1",
  "username": "satoshi",
  "email": "updated@example.com",
  "is_admin": false
}
```

## Delete User

`DELETE /users/api/v1/user/{user_id}`

**Auth:** Super User

::: danger Destructive Operation
Deleting a user permanently removes their account, all wallets, and all payment data. This action cannot be undone.
:::

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `user_id` | string (path) | Yes | User UUID |

#### Response `200`

```json
{
  "detail": "User deleted"
}
```

## Adjust User Balance

`PUT /users/api/v1/user/{user_id}/balance`

**Auth:** Admin

Add or subtract balance from a user's default wallet.

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `user_id` | string (path) | Yes | User UUID |
| `amount` | integer | Yes | Amount in satoshis (positive to add, negative to subtract) |

#### Response `200`

| Field | Type | Description |
|-------|------|-------------|
| `user_id` | string | User UUID |
| `new_balance` | integer | Updated balance in millisatoshis |

```json
{
  "user_id": "user-uuid-1",
  "new_balance": 60000
}
```

## Related Pages

- [Admin API](/api/admin/)
- [User Management Guide](/guide/core/user-management/)
- [Users & Accounts API](/api/core/users)
