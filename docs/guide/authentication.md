# Authentication

> LNbits supports multiple authentication methods including username/password, OAuth (Google, GitHub, Keycloak), Nostr NIP-98, and API key-based access with fine-grained ACL controls.

LNbits supports multiple authentication methods for both the UI and API.

## Login methods

### Username & Password

The standard login method:

```bash
curl -X POST https://your-lnbits.com/api/v1/auth \
  -H "Content-Type: application/json" \
  -d '{"username": "satoshi", "password": "your-password"}'
```

Returns a JWT access token:
```json
{
  "access_token": "eyJ...",
  "token_type": "bearer"
}
```

### User ID (Simple Mode)

For backwards compatibility, login with just the user ID:

```bash
curl -X POST https://your-lnbits.com/api/v1/auth/usr \
  -d '{"usr": "your-user-id"}'
```

### Nostr (NIP-98)

Authenticate with a Nostr key:

```bash
curl -X POST https://your-lnbits.com/api/v1/auth/nostr \
  -H "Content-Type: application/json" \
  -d '{"nostr_event": "signed-nip-98-event"}'
```

### OAuth (Google, GitHub, Keycloak)

OAuth flows redirect through the provider:

1. User clicks "Login with Google/GitHub/Keycloak"
2. Redirected to provider for consent
3. Provider returns a code to LNbits
4. LNbits exchanges code for user info and creates/links the account

Configure providers in `.env`:

```bash
AUTH_ALLOWED_METHODS=username-password,google-auth,github-auth

GOOGLE_CLIENT_ID=your-id
GOOGLE_CLIENT_SECRET=your-secret

GITHUB_CLIENT_ID=your-id
GITHUB_CLIENT_SECRET=your-secret
```

## API authentication

### API keys (per-wallet)

The most common authentication for API calls:

```bash
# Via header (recommended)
curl -H "X-Api-Key: YOUR_KEY" https://your-lnbits.com/api/v1/wallet

# Via query parameter
curl "https://your-lnbits.com/api/v1/wallet?api-key=YOUR_KEY"
```

### Bearer tokens

For user-level endpoints (account management, multi-wallet operations):

```bash
curl -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  https://your-lnbits.com/api/v1/wallets
```

## Access Control Lists (ACLs)

ACLs provide fine-grained API access beyond the admin/invoice key model.

### Create an ACL

```bash
curl -X POST https://your-lnbits.com/api/v1/auth/acls \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Read-only dashboard",
    "allowed_endpoints": ["GET /api/v1/wallet", "GET /api/v1/payments"]
  }'
```

### Generate an ACL token

```bash
curl -X POST https://your-lnbits.com/api/v1/auth/acls/ACL_ID/tokens \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

The resulting token only has access to the endpoints specified in the ACL.

## Registration

### Create a new account

```bash
curl -X POST https://your-lnbits.com/api/v1/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "satoshi",
    "password": "strongpassword",
    "email": "satoshi@example.com"
  }'
```

### Control registration

| Variable | Description |
| --- | --- |
| `LNBITS_ALLOW_NEW_ACCOUNTS` | Enable/disable registration |
| `LNBITS_ALLOWED_USERS` | Restrict to specific user IDs |
| `AUTH_ALLOWED_METHODS` | Which login methods are available |

## Security considerations

- Always use **HTTPS** in production
- Set a strong `AUTH_SECRET_KEY`
- Use **admin keys** only server-side
- Prefer **ACL tokens** over raw API keys for third-party integrations
- Enable **rate limiting** to prevent brute-force attacks
- Rotate JWT tokens by adjusting `AUTH_TOKEN_EXPIRE_MINUTES`

## Related Pages

- [Security](/guide/core/security) — security best practices for your LNbits instance
- [Authentication](/api/authentication) — API reference for authentication endpoints
- [User Management](/guide/core/user-management/) — managing users, roles, and permissions
