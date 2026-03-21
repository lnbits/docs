# Authentication

> Authenticate API requests using API keys, Bearer tokens, or ACL tokens. Every endpoint states which auth method it requires.

LNbits supports three authentication methods. Which one you need depends on the endpoint:

| Method | Scope | Header | Use Case |
|--------|-------|--------|----------|
| **API Key** | Single wallet | `X-Api-Key: KEY` | Wallet operations, payments |
| **Bearer Token (JWT)** | User account | `Authorization: Bearer TOKEN` | Multi-wallet management, account settings |
| **ACL Token** | Custom | `Authorization: Bearer TOKEN` | Fine-grained access control |

## API Keys

Every wallet has two keys with different permission levels:

| Key | Permissions | Use For |
|-----|------------|---------|
| **Admin key** | Read + write + send | Sending payments, deleting wallets, server-side operations |
| **Invoice key** | Read + receive only | Creating invoices, checking balances, client-side apps |

### Using API Keys

Pass the key via the `X-Api-Key` header (recommended) or as a query parameter:

```bash
# Header (recommended)
curl -H "X-Api-Key: YOUR_ADMIN_KEY" \
  https://your-lnbits.com/api/v1/wallet

# Query parameter
curl "https://your-lnbits.com/api/v1/wallet?api-key=YOUR_INVOICE_KEY"
```

### Finding Your Keys

1. Log in to the LNbits UI
2. Select a wallet from the sidebar
3. Click the **eye icon** next to "API info" to reveal the keys

Or retrieve them via the API (using an Invoice key):

```bash
curl https://your-lnbits.com/api/v1/wallet \
  -H "X-Api-Key: YOUR_INVOICE_KEY"
```

**Response:**

```json
{
  "id": "wallet-uuid",
  "name": "My Wallet",
  "balance": 50000,
  "adminkey": "a1b2c3...",
  "inkey": "d4e5f6..."
}
```

## Bearer Tokens (JWT)

For user-level operations - managing multiple wallets, updating your profile, or installing extensions - authenticate with a Bearer token.

### Obtain a Token

```bash
curl -X POST https://your-lnbits.com/api/v1/auth \
  -H "Content-Type: application/json" \
  -d '{"username": "satoshi", "password": "your-password"}'
```

**Response:**

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIs...",
  "token_type": "bearer"
}
```

Other login methods also return Bearer tokens:

| Method | Endpoint |
|--------|----------|
| Username & password | `POST /api/v1/auth` |
| User ID (legacy) | `POST /api/v1/auth/usr` |
| Nostr (NIP-98) | `POST /api/v1/auth/nostr` |
| Google OAuth | `POST /api/v1/auth/google/token` |
| GitHub OAuth | `POST /api/v1/auth/github/token` |
| Keycloak | `POST /api/v1/auth/keycloak/token` |

### Use the Token

```bash
curl -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..." \
  https://your-lnbits.com/api/v1/wallets
```

## ACL Tokens

Access Control Lists (ACLs) let you create tokens with custom permissions - restrict access to specific endpoints.

### Create an ACL

```bash
curl -X POST https://your-lnbits.com/api/v1/auth/acls \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "read-only-dashboard",
    "allowed_endpoints": [
      "GET /api/v1/wallet",
      "GET /api/v1/payments"
    ]
  }'
```

### Generate an ACL Token

```bash
curl -X POST https://your-lnbits.com/api/v1/auth/acls/{acl_id}/tokens \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### Revoke an ACL Token

```bash
curl -X DELETE https://your-lnbits.com/api/v1/auth/acls/{acl_id}/tokens/{token_id} \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Permission Matrix

| Endpoint | Invoice Key | Admin Key | Bearer Token | ACL Token |
|----------|-------------|-----------|--------------|-----------|
| `GET /api/v1/wallet` (balance) | Yes | Yes | Yes | Configurable |
| `POST /api/v1/payments` (receive) | Yes | Yes | Yes | Configurable |
| `POST /api/v1/payments` (send) | No | **Yes** | Yes | Configurable |
| `PUT /api/v1/wallet` (rename) | No | **Yes** | Yes | Configurable |
| `DELETE /api/v1/wallet` | No | **Yes** | Yes | Configurable |
| `GET /api/v1/wallets` (list all) | No | No | **Yes** | Configurable |
| `PUT /api/v1/auth/me` (profile) | No | No | **Yes** | Configurable |
| `POST /api/v1/extension` (install) | No | No | **Yes** | Configurable |
| `POST /api/v1/auth/register` | None required | - | - | - |
| `GET /admin/api/v1/*` | No | No | **Super User** | No |

::: tip
When in doubt, use the **Admin key** for server-side integrations and the **Invoice key** for anything exposed to end users (client-side apps, public kiosks).
:::

## Related Pages

- [API Reference](/api/)
- [Quick Reference](/api/quick-reference)
- [API Keys Guide](/guide/core/api-keys)
- [Users & Accounts API](/api/core/users)
- [Security Guide](/guide/core/security)
