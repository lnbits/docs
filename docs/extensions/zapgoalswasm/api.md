# Zap Goals! API

> Declared routes for the core WASM release 0.5.2.

## Base URL

```text
https://your-lnbits.com/api/v1/ext/zapgoalswasm
```

## Authentication

**User** routes require an LNbits user session or a Bearer access token. **Public** routes do not require a wallet API key. Public handlers still validate record state and any application tokens.

The sandboxed frontend calls these routes through the LNbits bridge. Routes and payloads may change between releases; use your instance's `/docs` or `/openapi.json` for its installed version.

## Routes

| Method | Path | Auth | WASM export |
| --- | --- | --- | --- |
| `POST` | `/goals` | User | `create-goal` |
| `GET` | `/goals` | User | `list-goals` |
| `GET` | `/wallets` | User | `get-wallets` |
| `PUT` | `/goals/{goalId}` | User | `update-goal` |
| `DELETE` | `/goals/{goalId}` | User | `delete-goal` |
| `GET` | `/goals/{goalId}/public` | Public | `get-public-goal` |
| `POST` | `/goals/{goalId}/invoice` | Public | `create-invoice` |
| `POST` | `/goals/{goalId}/sweep` | User | `sweep-goal` |
| `GET` | `/goals/{goalId}/periods` | User | `list-periods` |
| `POST` | `/recurring/sweep-due` | User | `sweep-due` |
| `GET` | `/goals/{goalId}/payments/{paymentHash}` | Public | `invoice-status` |

These mappings come from the [published release config](https://raw.githubusercontent.com/bitkarrot/zapgoalswasm/v0.5.2/config.json). Request validation and responses are defined by the component implementation.

## Related Pages

- [Zap Goals! Overview](./)
- [WASM Frontend](/dev/extensions/wasm/frontend): route and authentication behavior
- [WASM Permissions](/dev/extensions/wasm/permissions)
