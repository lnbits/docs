# Where39 API

> API endpoints for the Where39 extension.

::: tip Live API Explorer
If you have a running LNbits instance, the interactive API docs are the fastest way to explore and test:
- **Swagger UI**: `https://your-lnbits.com/docs`
- **ReDoc**: `https://your-lnbits.com/redoc`

These are auto-generated from your running version and always up to date.
:::

## Base URL

```
https://your-lnbits.com/where39/api/v1/
```

## Authentication

| Key Type | Header | Access |
|---|---|---|
| **Admin key** | `X-Api-Key` | Full access (create, update, delete) |
| **Invoice key** | `X-Api-Key` | Read-only access (list, get) |

## Endpoints

| Method | Path | Auth | Description |
|---|---|---|---|
| `GET` | `/where39/api/v1/` | Invoice | List all items |
| `GET` | `/where39/api/v1/{id}` | Invoice | Get a specific item |
| `POST` | `/where39/api/v1/` | Admin | Create a new item |
| `PUT` | `/where39/api/v1/{id}` | Admin | Update an item |
| `DELETE` | `/where39/api/v1/{id}` | Admin | Delete an item |

::: info Note
This is the standard CRUD pattern. The actual resource names and additional endpoints may vary. Check the **Swagger UI** on your instance for the exact paths and request/response schemas.
:::

## Example

```bash
# List items
curl https://your-lnbits.com/where39/api/v1/ \
  -H "X-Api-Key: YOUR_INVOICE_KEY"

# Create item
curl -X POST https://your-lnbits.com/where39/api/v1/ \
  -H "X-Api-Key: YOUR_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{"name": "example"}'
```

::: tip For AI Agents
Fetch the full OpenAPI spec from any running instance:
```
GET https://your-lnbits.com/openapi.json
```
Filter for paths starting with `/where39/` to isolate this extension's endpoints.
:::

## Related Pages

- [Where39 Overview](./): Extension features and setup guide
- [API Authentication](/api/authentication): API key types and usage
- [Quick Reference](/api/quick-reference): All core LNbits endpoints
- [All Extensions](/extensions/): Browse the full extension catalog
