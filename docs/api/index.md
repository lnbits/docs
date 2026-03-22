<HeroImage type="api" />

# API Reference

> Complete REST API for managing LNbits wallets, payments, users, and extensions.

::: tip Interactive API Explorer
Every LNbits instance serves interactive API documentation:
- **Swagger UI** - `https://your-lnbits.com/docs`
- **ReDoc** - `https://your-lnbits.com/redoc`

These are auto-generated from the running instance and always match your version. Use them to test endpoints directly from your browser.
:::

## Base URL

```
https://your-lnbits.com/api/v1/
```

Replace `your-lnbits.com` with your instance domain. All endpoints below are relative to this base.

## Authentication

Most endpoints require one of:

| Method | Header | Scope |
|--------|--------|-------|
| API Key | `X-Api-Key: YOUR_KEY` | Per-wallet (Admin or Invoice key) |
| Bearer Token | `Authorization: Bearer TOKEN` | Per-user (JWT from login) |

See [Authentication](/api/authentication) for the full guide, including ACL tokens and the permission matrix.

## Quick Start

```bash
# Check wallet balance
curl https://your-lnbits.com/api/v1/wallet \
  -H "X-Api-Key: YOUR_INVOICE_KEY"

# Create an invoice (receive sats)
curl -X POST https://your-lnbits.com/api/v1/payments \
  -H "X-Api-Key: YOUR_INVOICE_KEY" \
  -H "Content-Type: application/json" \
  -d '{"out": false, "amount": 100, "memo": "test"}'

# Pay an invoice (send sats)
curl -X POST https://your-lnbits.com/api/v1/payments \
  -H "X-Api-Key: YOUR_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{"out": true, "bolt11": "lnbc..."}'
```

## Endpoint Groups

| Group | Base Path | Auth | Description |
|-------|-----------|------|-------------|
| [Wallets](/api/core/wallets) | `/api/v1/wallet` | API Key | Wallet CRUD, sharing |
| [Payments](/api/core/payments) | `/api/v1/payments` | API Key | Invoices, payments, history, hold invoices |
| [Users & Accounts](/api/core/users) | `/api/v1/auth` | Bearer | Login, registration, profile, ACLs |
| [Extensions](/api/core/extensions) | `/api/v1/extension` | Bearer | Install, activate, uninstall |
| [LNURL](/api/core/lnurl) | `/api/v1/lnurl*` | API Key | LNURL-pay, withdraw, auth |
| [Fiat & Rates](/api/core/fiat) | `/api/v1/rate` | None | Exchange rates, conversion |
| [TinyURL](/api/core/tinyurl) | `/api/v1/tinyurl` | API Key | URL shortening |
| [WebSockets](/api/core/websockets) | `/api/v1/ws` | None | Real-time payment events |
| [Admin](/api/admin/) | `/api/v1/admin` | Super User | Server configuration, user management |

See the [Quick Reference](/api/quick-reference) for every endpoint in a single scannable table.

## Response Format

All responses are JSON. Successful responses return the resource directly:

```json
{
  "id": "abc123",
  "name": "My Wallet",
  "balance": 50000
}
```

Error responses use standard HTTP status codes with a `detail` message:

```json
{
  "detail": "Insufficient balance"
}
```

## Status Codes

| Code | Meaning |
|------|---------|
| `200` | Success |
| `201` | Created |
| `400` | Bad request - check parameters |
| `401` | Unauthorized - invalid or missing API key |
| `403` | Forbidden - insufficient permissions |
| `404` | Not found |
| `422` | Validation error - check required fields and types |
| `429` | Rate limited |
| `500` | Server error |

## Pagination

Paginated endpoints accept:

| Parameter | Default | Description |
|-----------|---------|-------------|
| `limit` | `20` | Items per page (max 100) |
| `offset` | `0` | Items to skip |

Paginated responses include a total count:

```json
{
  "data": [...],
  "total": 150
}
```

## Filtering

Many list endpoints support filtering via query parameters:

```bash
# Filter payments by status
GET /api/v1/payments?status=success

# Search wallets by name
GET /api/v1/wallet/paginated?search=shop
```

## Rate Limiting

Default: **200 requests per minute** per IP. Configurable via environment variables:

```bash
LNBITS_RATE_LIMIT_NO=200
LNBITS_RATE_LIMIT_UNIT=minute
```

## Related Pages

- [Quick Reference](/api/quick-reference)
- [Authentication](/api/authentication)
- [Admin API](/api/admin/)
- [API Keys Guide](/guide/core/api-keys)
