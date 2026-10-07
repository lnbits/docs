# LNQ1 Arena API

> Declared routes for the core WASM release 0.1.5.

## Base URL

```text
https://your-lnbits.com/api/v1/ext/lnq1
```

## Authentication

**User** routes require an LNbits user session or a Bearer access token. **Public** routes do not require a wallet API key. Public handlers still validate record state and any application tokens.

The sandboxed frontend calls these routes through the LNbits bridge. Routes and payloads may change between releases; use your instance's `/docs` or `/openapi.json` for its installed version.

## Routes

| Method | Path | Auth | WASM export |
| --- | --- | --- | --- |
| `GET` | `/settings` | User | `get-lnq1-settings` |
| `PUT` | `/settings` | User | `save-lnq1-settings` |
| `GET` | `/wallets` | User | `list-lnq1-wallets` |
| `POST` | `/games` | User | `create-lnq1-game` |
| `GET` | `/games` | User | `list-lnq1-games` |
| `DELETE` | `/games/{game_id}` | User | `delete-lnq1-game` |
| `GET` | `/games/{game_id}` | Public | `get-public-lnq1-game` |
| `POST` | `/games/{game_id}/join` | Public | `join-lnq1-game` |
| `POST` | `/games/{game_id}/leave` | Public | `leave-lnq1-game` |
| `POST` | `/games/{game_id}/heartbeat` | Public | `heartbeat-lnq1-game` |
| `POST` | `/games/{game_id}/winner` | Public | `declare-lnq1-kill` |
| `POST` | `/games/{game_id}/state` | Public | `publish-lnq1-state` |
| `POST` | `/games/{game_id}/chat` | Public | `publish-lnq1-chat` |
| `POST` | `/games/{game_id}/settle` | User | `settle-lnq1-payout` |

These mappings come from the [published release config](https://raw.githubusercontent.com/lnbits/lnq1/v0.1.5/config.json). Request validation and responses are defined by the component implementation.

## Related Pages

- [LNQ1 Arena Overview](./)
- [WASM Frontend](/dev/extensions/wasm/frontend): route and authentication behavior
- [WASM Permissions](/dev/extensions/wasm/permissions)
