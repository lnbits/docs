# StreetFighter API

> Declared routes for the core WASM release 0.1.6.

## Base URL

```text
https://your-lnbits.com/api/v1/ext/streetfighterwasm
```

## Authentication

**User** routes require an LNbits user session or a Bearer access token. **Public** routes do not require a wallet API key. Public handlers still validate record state and any application tokens.

The sandboxed frontend calls these routes through the LNbits bridge. Routes and payloads may change between releases; use your instance's `/docs` or `/openapi.json` for its installed version.

## Routes

| Method | Path | Auth | WASM export |
| --- | --- | --- | --- |
| `GET` | `/settings` | User | `get-streetfighter-settings` |
| `PUT` | `/settings` | User | `save-streetfighter-settings` |
| `GET` | `/wallets` | User | `list-streetfighter-wallets` |
| `POST` | `/games` | User | `create-streetfighter-game` |
| `GET` | `/games` | User | `list-streetfighter-games` |
| `DELETE` | `/games/{game_id}` | User | `delete-streetfighter-game` |
| `GET` | `/games/{game_id}` | Public | `get-public-streetfighter-game` |
| `POST` | `/games/{game_id}/join` | Public | `join-streetfighter-game` |
| `POST` | `/games/{game_id}/winner` | Public | `declare-streetfighter-winner` |
| `POST` | `/games/{game_id}/input` | Public | `publish-streetfighter-input` |
| `POST` | `/games/{game_id}/start` | Public | `publish-streetfighter-start` |
| `POST` | `/games/{game_id}/state` | Public | `publish-streetfighter-state` |
| `POST` | `/games/{game_id}/chat` | Public | `publish-streetfighter-chat` |
| `POST` | `/games/{game_id}/settle` | User | `settle-streetfighter-game` |

These mappings come from the [published release config](https://raw.githubusercontent.com/lnbits/streetfighterwasm/v0.1.6/config.json). Request validation and responses are defined by the component implementation.

## Related Pages

- [StreetFighter Overview](./)
- [WASM Frontend](/dev/extensions/wasm/frontend): route and authentication behavior
- [WASM Permissions](/dev/extensions/wasm/permissions)
