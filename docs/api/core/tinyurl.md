# TinyURL API

> Create, retrieve, and delete short URLs via the LNbits TinyURL API.

Create short URLs for sharing invoices, payment links, and LNURL endpoints. Short URLs resolve via `https://your-lnbits.com/t/{short_id}`.

## Create TinyURL

`POST /api/v1/tinyurl`

**Auth:** Invoice key or Admin key

Create a short URL that redirects to the given target URL.

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `url` | string | Yes | Target URL to shorten |

#### Response `201`

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | TinyURL UUID |
| `url` | string | The shortened URL |
| `target` | string | Original target URL |
| `created_at` | string | ISO 8601 creation timestamp |

```json
{
  "id": "tiny-uuid",
  "url": "https://your-lnbits.com/t/abc",
  "target": "https://your-lnbits.com/lnurlp/link/abc123",
  "created_at": "2024-01-15T10:30:00Z"
}
```

**Example:**

```bash
curl -X POST https://your-lnbits.com/api/v1/tinyurl \
  -H "X-Api-Key: YOUR_INVOICE_KEY" \
  -H "Content-Type: application/json" \
  -d '{"url": "https://your-lnbits.com/lnurlp/link/abc123"}'
```

## Get TinyURL

`GET /api/v1/tinyurl/{tinyurl_id}`

**Auth:** Invoice key or Admin key

Retrieve details of an existing TinyURL.

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `tinyurl_id` | string (path) | Yes | TinyURL UUID |

#### Response `200`

| Field | Type | Description |
|-------|------|-------------|
| `id` | string | TinyURL UUID |
| `url` | string | The shortened URL |
| `target` | string | Original target URL |
| `created_at` | string | ISO 8601 creation timestamp |

```json
{
  "id": "tiny-uuid",
  "url": "https://your-lnbits.com/t/abc",
  "target": "https://your-lnbits.com/lnurlp/link/abc123",
  "created_at": "2024-01-15T10:30:00Z"
}
```

## Delete TinyURL

`DELETE /api/v1/tinyurl/{tinyurl_id}`

**Auth:** Admin key

Delete a TinyURL. The short URL will stop resolving immediately.

#### Parameters

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `tinyurl_id` | string (path) | Yes | TinyURL UUID |

#### Response `200`

```json
{
  "detail": "TinyURL deleted"
}
```

## Related Pages

- [API Reference](/api/)
- [Wallets API](/api/core/wallets)
