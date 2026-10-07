# Tips API

> Declared routes for the core WASM release 0.1.4.

## Base URL

```text
https://your-lnbits.com/api/v1/ext/tips
```

## Authentication

**User** routes require an LNbits user session or a Bearer access token. **Public** routes do not require a wallet API key. Public handlers still validate record state and any application tokens.

The sandboxed frontend calls these routes through the LNbits bridge. Routes and payloads may change between releases; use your instance's `/docs` or `/openapi.json` for its installed version.

## Routes

| Method | Path | Auth | WASM export |
| --- | --- | --- | --- |
| `POST` | `/jars` | User | `create-tip-jar` |
| `PUT` | `/jars/{jar_id}` | User | `update-tip-jar` |
| `GET` | `/jars` | User | `list-tip-jars` |
| `DELETE` | `/jars/{jar_id}` | User | `delete-tip-jar` |
| `GET` | `/jars/{jar_id}/tips` | User | `list-tip-jar-tips` |
| `GET` | `/wallets` | User | `list-tip-wallets` |
| `GET` | `/watchonly/wallets` | User | `list-tip-watchonly-wallets` |
| `GET` | `/rate/bitcoin` | User | `get-bitcoin-rate` |
| `GET` | `/currencies` | Public | `list-tip-currencies` |
| `GET` | `/jars/{jar_id}` | Public | `get-public-tip-jar` |
| `POST` | `/invoice` | Public | `create-tip-invoice` |

These mappings come from the [published release config](https://raw.githubusercontent.com/lnbits/tips/v0.1.4/config.json). Request validation and responses are defined by the component implementation.

## Related Pages

- [Tips Overview](./)
- [WASM Frontend](/dev/extensions/wasm/frontend): route and authentication behavior
- [WASM Permissions](/dev/extensions/wasm/permissions)
