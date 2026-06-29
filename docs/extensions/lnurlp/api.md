# LNURLp API

> API endpoints for the LNURLp extension.

::: tip Live API Explorer
If you have a running LNbits instance, the interactive API docs are the fastest way to explore and test:
- **Swagger UI**: `https://your-lnbits.com/docs`
- **ReDoc**: `https://your-lnbits.com/redoc`

These are auto-generated from your running version and always up to date.
:::

## Base URL

```text
https://your-lnbits.com/lnurlp/api/v1/
```

## Authentication

| Key Type | Header | Access |
|---|---|---|
| **Admin key** | `X-Api-Key` | Create, update, delete |
| **Invoice key** | `X-Api-Key` | List and retrieve |
| **Super user/admin session** | Browser session | Extension settings |
| Public | None | Public link and LNURL payment flow |

## Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/lnurlp/api/v1/links` | Invoice | List pay links for the key wallet |
| `GET` | `/lnurlp/api/v1/links?all_wallets=true` | Invoice | List pay links for all wallets owned by the user |
| `GET` | `/lnurlp/api/v1/links/{link_id}` | Invoice | Get a pay link |
| `GET` | `/lnurlp/api/v1/links/public/{link_id}` | Public | Get public pay link details |
| `POST` | `/lnurlp/api/v1/links` | Admin | Create a pay link |
| `PUT` | `/lnurlp/api/v1/links/{link_id}` | Admin | Update a pay link |
| `DELETE` | `/lnurlp/api/v1/links/{link_id}` | Admin | Delete a pay link |
| `GET` | `/lnurlp/{link_id}` | Public | LNURL-pay metadata endpoint |
| `GET` | `/lnurlp/api/v1/lnurl/cb/{link_id}` | Public | LNURL-pay callback that creates the invoice |
| `GET` | `/.well-known/lnurlp/{username}` | Public | Lightning Address lookup |
| `GET` | `/lnurlp/api/v1/well-known/{username}` | Public | Internal Lightning Address lookup endpoint |
| `GET` | `/lnurlp/api/v1/settings` | Admin session | Get or create LNURLp settings |
| `PUT` | `/lnurlp/api/v1/settings` | Admin session | Update LNURLp settings |
| `DELETE` | `/lnurlp/api/v1/settings` | Admin session | Delete LNURLp settings |

## Pay Link Object

| Field | Type | Notes |
|---|---|---|
| `id` | string | Pay link ID |
| `wallet` | string | Wallet ID that receives payments |
| `description` | string | Pay link description and invoice memo |
| `min` | number | Minimum amount in sats, or stored fiat minor units when `currency` is set |
| `max` | number | Maximum amount in sats, or stored fiat minor units when `currency` is set |
| `currency` | string or null | Fiat currency code, or null for sats |
| `fiat_base_multiplier` | integer | Usually `100` for fiat cents |
| `comment_chars` | integer | Max payer comment length, `0` disables comments |
| `username` | string or null | Lightning Address username |
| `domain` | string or null | Custom Lightning Address / LNURL domain |
| `zaps` | boolean | Enables NIP-57 zap support |
| `disposable` | boolean | Whether LNURL pay requests are disposable |
| `webhook_url` | string or null | URL called after payment |
| `webhook_headers` | string or null | JSON string for webhook headers |
| `webhook_body` | string or null | JSON string included as webhook body data |
| `success_text` | string or null | Wallet success message after payment |
| `success_url` | string or null | Secure success URL after payment |
| `lnurl` | string | Deprecated bech32 LNURL returned for compatibility |

## Create or Update a Pay Link

```json
{
  "wallet": "WALLET_ID",
  "description": "Coffee",
  "min": 1000,
  "max": 1000,
  "comment_chars": 100,
  "currency": null,
  "fiat_base_multiplier": 100,
  "username": "coffee",
  "domain": "example.com",
  "zaps": false,
  "disposable": true,
  "webhook_url": "https://example.com/webhook",
  "webhook_headers": "{\"Authorization\":\"Bearer token\"}",
  "webhook_body": "{\"source\":\"lnurlp\"}",
  "success_text": "Thanks!",
  "success_url": "https://example.com/thanks"
}
```

Validation rules:

- `min` must be less than or equal to `max`.
- Sat amounts must be whole sats when `currency` is not set.
- Fiat amounts are sent as normal decimal values; LNURLp stores them using `fiat_base_multiplier`.
- `success_url` must start with `https://`.
- `username` can contain lowercase `a-z`, `0-9`, `-`, `_`, and `.`.
- `webhook_headers` and `webhook_body` must be valid JSON strings when set.
- If `wallet` is omitted, LNURLp uses the wallet that belongs to the admin key.

## Examples

```bash
# List pay links
curl https://your-lnbits.com/lnurlp/api/v1/links \
  -H "X-Api-Key: YOUR_INVOICE_KEY"

# Create a fixed 1000 sat pay link
curl -X POST https://your-lnbits.com/lnurlp/api/v1/links \
  -H "X-Api-Key: YOUR_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "description": "Coffee",
    "min": 1000,
    "max": 1000,
    "comment_chars": 100,
    "disposable": true
  }'

# Get public pay link details
curl https://your-lnbits.com/lnurlp/api/v1/links/public/LINK_ID
```

## Webhook Payload

When a paid link has `webhook_url` set, LNURLp sends a `POST` request with payment data:

```json
{
  "payment_hash": "PAYMENT_HASH",
  "payment_request": "BOLT11_INVOICE",
  "amount": 1000,
  "comment": "Great coffee",
  "webhook_data": "optional-data",
  "lnurlp": "LINK_ID",
  "body": {
    "source": "lnurlp"
  },
  "zap_receipt": ""
}
```

## LNURL Payment Flow

Wallets use the public LNURL endpoints directly:

1. `GET /lnurlp/{link_id}` returns LNURL-pay metadata, min/max sendable amount, callback URL, comments, and zap support.
2. `GET /lnurlp/api/v1/lnurl/cb/{link_id}?amount=1000000` creates a BOLT11 invoice for the requested millisatoshi amount.
3. Optional query parameters:
   - `comment`: payer comment, limited by `comment_chars`
   - `nostr`: NIP-57 zap request
   - `webhook_data`: custom data passed through to the webhook payload

::: tip For AI Agents
Fetch the full OpenAPI spec from any running instance:
```text
GET https://your-lnbits.com/openapi.json
```
Filter for paths starting with `/lnurlp/` to isolate this extension's endpoints.
:::

## Related Pages

- [LNURLp Overview](./): Extension features and setup guide
- [API Authentication](/api/authentication): API key types and usage
- [Quick Reference](/api/quick-reference): All core LNbits endpoints
- [All Extensions](https://extensions.lnbits.com): Browse the full extension catalog
