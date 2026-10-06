# Chess API

> Declared routes for the core WASM release 0.1.7.

## Base URL

```text
https://your-lnbits.com/api/v1/ext/chesswasm
```

## Authentication

**User** routes require an LNbits user session or a Bearer access token. **Public** routes do not require a wallet API key. Public handlers still validate record state and any application tokens.

The sandboxed frontend calls these routes through the LNbits bridge. Routes and payloads may change between releases; use your instance's `/docs` or `/openapi.json` for its installed version.

## Routes

| Method | Path | Auth | WASM export |
| --- | --- | --- | --- |
| `GET` | `/settings` | User | `get-chess-settings` |
| `PUT` | `/settings` | User | `save-chess-settings` |
| `GET` | `/wallets` | User | `list-chess-wallets` |
| `POST` | `/games` | User | `create-chess-game` |
| `GET` | `/games` | User | `list-chess-games` |
| `DELETE` | `/games/{game_id}` | User | `delete-chess-game` |
| `GET` | `/games/{game_id}` | Public | `get-public-chess-game` |
| `POST` | `/games/{game_id}/join` | Public | `join-chess-game` |
| `POST` | `/games/{game_id}/move` | Public | `make-chess-move` |
| `POST` | `/games/{game_id}/resign` | Public | `resign-chess-game` |
| `POST` | `/games/{game_id}/payout` | Public | `settle-player-chess-payout` |
| `POST` | `/games/{game_id}/settle` | User | `settle-chess-game` |

These mappings come from the [published release config](https://raw.githubusercontent.com/lnbits/chesswasm/v0.1.7/config.json). Request validation and responses are defined by the component implementation.

## Related Pages

- [Chess Overview](./)
- [WASM Frontend](/dev/extensions/wasm/frontend): route and authentication behavior
- [WASM Permissions](/dev/extensions/wasm/permissions)
