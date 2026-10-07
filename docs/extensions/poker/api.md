# Poker API

> Declared routes for the core WASM release 0.1.2.

## Base URL

```text
https://your-lnbits.com/api/v1/ext/poker
```

## Authentication

**User** routes require an LNbits user session or a Bearer access token. **Public** routes do not require a wallet API key. Public handlers still validate record state and any application tokens.

The sandboxed frontend calls these routes through the LNbits bridge. Routes and payloads may change between releases; use your instance's `/docs` or `/openapi.json` for its installed version.

## Routes

| Method | Path | Auth | WASM export |
| --- | --- | --- | --- |
| `GET` | `/settings` | User | `get-poker-settings` |
| `PUT` | `/settings` | User | `save-poker-settings` |
| `GET` | `/wallets` | User | `list-poker-wallets` |
| `POST` | `/games` | User | `create-poker-game` |
| `GET` | `/games` | User | `list-poker-games` |
| `DELETE` | `/games/{game_id}` | User | `delete-poker-game` |
| `GET` | `/games/{game_id}` | Public | `get-public-poker-game` |
| `POST` | `/games/{game_id}/join` | Public | `join-poker-game` |
| `POST` | `/games/{game_id}/draw` | Public | `draw-poker-cards` |
| `POST` | `/games/{game_id}/fold` | Public | `fold-poker-game` |
| `POST` | `/games/{game_id}/next-hand` | Public | `start-next-poker-hand` |
| `POST` | `/games/{game_id}/payout` | Public | `settle-player-poker-payout` |
| `POST` | `/games/{game_id}/settle` | User | `settle-poker-game` |

These mappings come from the [published release config](https://raw.githubusercontent.com/lnbits/poker/v0.1.2/config.json). Request validation and responses are defined by the component implementation.

## Related Pages

- [Poker Overview](./)
- [WASM Frontend](/dev/extensions/wasm/frontend): route and authentication behavior
- [WASM Permissions](/dev/extensions/wasm/permissions)
