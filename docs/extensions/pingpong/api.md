# Ping Pong API

> Declared routes for the core WASM release 0.1.1.

## Base URL

```text
https://your-lnbits.com/api/v1/ext/pingpong
```

## Authentication

**User** routes require an LNbits user session or a Bearer access token. **Public** routes do not require a wallet API key. Public handlers still validate record state and any application tokens.

The sandboxed frontend calls these routes through the LNbits bridge. Routes and payloads may change between releases; use your instance's `/docs` or `/openapi.json` for its installed version.

## Routes

| Method | Path | Auth | WASM export |
| --- | --- | --- | --- |
| `POST` | `/tables` | User | `create-table` |
| `GET` | `/tables` | User | `list-tables` |
| `PATCH` | `/tables/{table_id}` | User | `update-table` |
| `DELETE` | `/tables/{table_id}` | User | `delete-table` |
| `GET` | `/wallets` | User | `list-wallets` |
| `GET` | `/tables/{table_id}/public` | Public | `get-public-table` |
| `POST` | `/tables/{table_id}/games` | Public | `create-game` |
| `GET` | `/games/{game_id}/public` | Public | `get-public-game` |
| `POST` | `/games/{game_id}/join` | Public | `join-game` |
| `POST` | `/games/{game_id}/finish` | Public | `finish-game` |

These mappings come from the [published release config](https://raw.githubusercontent.com/lnbits/pingpong/v0.1.1/config.json). Request validation and responses are defined by the component implementation.

## Related Pages

- [Ping Pong Overview](./)
- [WASM Frontend](/dev/extensions/wasm/frontend): route and authentication behavior
- [WASM Permissions](/dev/extensions/wasm/permissions)
