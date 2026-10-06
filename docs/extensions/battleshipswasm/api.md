# Battleships API

> Declared routes for the core WASM release 0.1.6.

## Base URL

```text
https://your-lnbits.com/api/v1/ext/battleshipswasm
```

## Authentication

**User** routes require an LNbits user session or a Bearer access token. **Public** routes do not require a wallet API key. Public handlers still validate record state and any application tokens.

The sandboxed frontend calls these routes through the LNbits bridge. Routes and payloads may change between releases; use your instance's `/docs` or `/openapi.json` for its installed version.

## Routes

| Method | Path | Auth | WASM export |
| --- | --- | --- | --- |
| `GET` | `/settings` | User | `get-battleships-settings` |
| `PUT` | `/settings` | User | `save-battleships-settings` |
| `GET` | `/wallets` | User | `list-battleships-wallets` |
| `POST` | `/games` | User | `create-battleships-game` |
| `GET` | `/games` | User | `list-battleships-games` |
| `DELETE` | `/games/{game_id}` | User | `delete-battleships-game` |
| `GET` | `/games/{game_id}` | Public | `get-public-battleships-game` |
| `POST` | `/games/{game_id}/join` | Public | `join-battleships-game` |
| `POST` | `/games/{game_id}/fleet` | Public | `place-battleships-fleet` |
| `POST` | `/games/{game_id}/shots` | Public | `fire-battleships-shot` |
| `POST` | `/games/{game_id}/resign` | Public | `resign-battleships-game` |
| `POST` | `/games/{game_id}/payout` | Public | `settle-player-battleships-payout` |
| `POST` | `/games/{game_id}/settle` | User | `settle-battleships-game` |

These mappings come from the [published release config](https://raw.githubusercontent.com/lnbits/battleshipswasm/v0.1.6/config.json). Request validation and responses are defined by the component implementation.

## Related Pages

- [Battleships Overview](./)
- [WASM Frontend](/dev/extensions/wasm/frontend): route and authentication behavior
- [WASM Permissions](/dev/extensions/wasm/permissions)
