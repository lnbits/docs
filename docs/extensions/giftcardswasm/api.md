# Gift Cards API

> Declared routes for the core WASM release 0.3.0.

## Base URL

```text
https://your-lnbits.com/api/v1/ext/giftcardswasm
```

## Authentication

**User** routes require an LNbits user session or a Bearer access token. **Public** routes do not require a wallet API key. Public handlers still validate record state and any application tokens.

The sandboxed frontend calls these routes through the LNbits bridge. Routes and payloads may change between releases; use your instance's `/docs` or `/openapi.json` for its installed version.

## Routes

| Method | Path | Auth | WASM export |
| --- | --- | --- | --- |
| `POST` | `/cards` | User | `create-card` |
| `GET` | `/cards` | User | `get-cards` |
| `GET` | `/cards/{cardId}` | User | `get-card` |
| `PUT` | `/cards/{cardId}` | User | `update-card` |
| `POST` | `/cards/bulk` | User | `bulk-create` |
| `GET` | `/wallets` | User | `get-wallets` |
| `GET` | `/settings` | User | `get-settings` |
| `PUT` | `/settings` | User | `set-settings` |
| `DELETE` | `/cards/{cardId}` | User | `delete-card` |
| `GET` | `/cards/public/{tokenHash}` | Public | `get-public-card` |
| `GET` | `/lnurl/callback` | Public | `lnurl-callback` |
| `GET` | `/lnurl/{tokenHash}` | Public | `lnurl-params` |

These mappings come from the [published release config](https://raw.githubusercontent.com/bitkarrot/giftcardswasm/v0.3.0/config.json). Request validation and responses are defined by the component implementation.

## Related Pages

- [Gift Cards Overview](./)
- [WASM Frontend](/dev/extensions/wasm/frontend): route and authentication behavior
- [WASM Permissions](/dev/extensions/wasm/permissions)
