# PopMenu API

> Declared routes for the core WASM release 0.1.0.

## Base URL

```text
https://your-lnbits.com/api/v1/ext/popmenu
```

## Authentication

**User** routes require an LNbits user session or a Bearer access token. **Public** routes do not require a wallet API key. Public handlers still validate record state and any application tokens.

The sandboxed frontend calls these routes through the LNbits bridge. Routes and payloads may change between releases; use your instance's `/docs` or `/openapi.json` for its installed version.

## Routes

| Method | Path | Auth | WASM export |
| --- | --- | --- | --- |
| `GET` | `/currencies` | User | `list-currencies` |
| `GET` | `/wallets` | User | `list-wallets` |
| `GET` | `/menus` | User | `list-menus` |
| `POST` | `/menus` | User | `create-menu` |
| `PATCH` | `/menus/{menu_id}` | User | `update-menu` |
| `GET` | `/menus/{menu_id}/items` | User | `list-items` |
| `POST` | `/menus/{menu_id}/items` | User | `create-item` |
| `PATCH` | `/items/{item_id}` | User | `update-item` |
| `GET` | `/orders` | User | `list-orders` |
| `POST` | `/orders/{order_id}/manual-paid` | User | `mark-manual-paid` |
| `POST` | `/orders/{order_id}/complete` | User | `complete-order` |
| `POST` | `/orders/{order_id}/cancel` | User | `cancel-order` |
| `GET` | `/public/menus/{menu_id}` | Public | `get-public-menu` |
| `POST` | `/public/menus/{menu_id}/orders` | Public | `create-order` |
| `GET` | `/public/orders/{order_id}` | Public | `get-order-confirmation` |
| `POST` | `/public/orders/{order_id}/retry` | Public | `retry-payment` |

These mappings come from the [published release config](https://raw.githubusercontent.com/lnbits/popmenu/v0.1.0/config.json). Request validation and responses are defined by the component implementation.

## Related Pages

- [PopMenu Overview](./)
- [WASM Frontend](/dev/extensions/wasm/frontend): route and authentication behavior
- [WASM Permissions](/dev/extensions/wasm/permissions)
