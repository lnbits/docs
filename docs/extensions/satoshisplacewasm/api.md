# Satoshi's Place API

> Declared routes for the core WASM release 0.1.4.

## Base URL

```text
https://your-lnbits.com/api/v1/ext/satoshisplacewasm
```

## Authentication

**User** routes require an LNbits user session or a Bearer access token. **Public** routes do not require a wallet API key. Public handlers still validate record state and any application tokens.

The sandboxed frontend calls these routes through the LNbits bridge. Routes and payloads may change between releases; use your instance's `/docs` or `/openapi.json` for its installed version.

## Routes

| Method | Path | Auth | WASM export |
| --- | --- | --- | --- |
| `GET` | `/wallets` | User | `list-place-wallets` |
| `POST` | `/walls` | User | `create-place-wall` |
| `GET` | `/walls` | User | `list-place-walls` |
| `DELETE` | `/walls/{wall_id}` | User | `delete-place-wall` |
| `GET` | `/walls/{wall_id}` | Public | `get-public-place-wall` |
| `POST` | `/walls/{wall_id}/paint` | Public | `create-place-paint-invoice` |

These mappings come from the [published release config](https://raw.githubusercontent.com/lnbits/satoshisplacewasm/v0.1.4/config.json). Request validation and responses are defined by the component implementation.

## Related Pages

- [Satoshi's Place Overview](./)
- [WASM Frontend](/dev/extensions/wasm/frontend): route and authentication behavior
- [WASM Permissions](/dev/extensions/wasm/permissions)
