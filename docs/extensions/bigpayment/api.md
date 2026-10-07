# BigPayment API

> Declared routes for the core WASM release 0.1.1.

## Base URL

```text
https://your-lnbits.com/api/v1/ext/bigpayment
```

## Authentication

**User** routes require an LNbits user session or a Bearer access token. **Public** routes do not require a wallet API key. Public handlers still validate record state and any application tokens.

The sandboxed frontend calls these routes through the LNbits bridge. Routes and payloads may change between releases; use your instance's `/docs` or `/openapi.json` for its installed version.

## Routes

| Method | Path | Auth | WASM export |
| --- | --- | --- | --- |
| `GET` | `/wallets` | User | `list-wallets` |
| `POST` | `/invoice/details` | User | `invoice-details` |
| `GET` | `/selection` | User | `get-selection` |
| `POST` | `/selection` | User | `save-selection` |
| `POST` | `/payments` | User | `pay-large-invoice` |

These mappings come from the [published release config](https://raw.githubusercontent.com/lnbits/bigpayment/v0.1.1/config.json). Request validation and responses are defined by the component implementation.

## Related Pages

- [BigPayment Overview](./)
- [WASM Frontend](/dev/extensions/wasm/frontend): route and authentication behavior
- [WASM Permissions](/dev/extensions/wasm/permissions)
