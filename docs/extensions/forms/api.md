# Forms API

> Declared routes for the core WASM release 0.2.5.

## Base URL

```text
https://your-lnbits.com/api/v1/ext/forms
```

## Authentication

**User** routes require an LNbits user session or a Bearer access token. **Public** routes do not require a wallet API key. Public handlers still validate record state and any application tokens.

The sandboxed frontend calls these routes through the LNbits bridge. Routes and payloads may change between releases; use your instance's `/docs` or `/openapi.json` for its installed version.

## Routes

| Method | Path | Auth | WASM export |
| --- | --- | --- | --- |
| `GET` | `/flows` | User | `list-flows` |
| `POST` | `/flows` | User | `create-flow` |
| `GET` | `/flows/{flowId}` | User | `get-flow` |
| `PUT` | `/flows/{flowId}` | User | `update-flow` |
| `POST` | `/flows/{flowId}/status` | User | `set-flow-status` |
| `DELETE` | `/flows/{flowId}` | User | `delete-flow` |
| `GET` | `/flows/{flowId}/submissions` | User | `list-submissions` |
| `GET` | `/flows/{flowId}/export` | User | `export-submissions` |
| `PATCH` | `/submissions/{subId}` | User | `update-submission` |
| `GET` | `/wallets` | User | `list-wallets` |
| `POST` | `/flows/{flowId}/notify-test` | User | `send-test-notification` |
| `GET` | `/f/{flowId}` | Public | `public-get-flow` |
| `POST` | `/f/{flowId}/submit` | Public | `public-submit` |
| `GET` | `/s/{submissionId}` | Public | `public-get-submission` |
| `POST` | `/s/{submissionId}/cancel` | Public | `public-cancel-submission` |

These mappings come from the [published release config](https://raw.githubusercontent.com/bitkarrot/forms/v0.2.5/config.json). Request validation and responses are defined by the component implementation.

## Related Pages

- [Forms Overview](./)
- [WASM Frontend](/dev/extensions/wasm/frontend): route and authentication behavior
- [WASM Permissions](/dev/extensions/wasm/permissions)
