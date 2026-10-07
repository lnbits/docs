# WASM reference and troubleshooting

> Configuration, host interfaces, runtime limits, and common fixes for the LNbits 1.6.2 core runtime.

## Package configuration

| Field | Purpose |
| --- | --- |
| `id` | Extension ID; must match its installed folder |
| `name`, `short_description` | Display metadata |
| `version` | Extension release version |
| `extension_type` | Must be `"wasm"` |
| `min_lnbits_version`, `max_lnbits_version` | Supported LNbits versions |
| `tile` | Extension image, usually under `/ext-assets/<id>/` |
| `wasm.module` | Relative path to a compiled component |
| `wasm.wit` | Optional relative WIT path; file must exist if declared |
| `wasm.world` | Component world name |
| `wasm.exports` | Export names and visibility: `public`, `authenticated`, or `event` |
| `ui_routes` | Page paths, HTML entrypoints, `auth`, and optional parameter mapping |
| `api_routes` | Method, path, export, `auth`, parameter mapping, and optional `ownerContext` |
| `permissions` | Host permission IDs, descriptions, and policy lists |
| `events.onInvoicePaid` | Name of an event export for confirmed incoming payments |
| `openapi`, `api_routes[].openapi` | Optional paths to API description files |

Required core fields are `id`, `name`, `short_description`, `version`, `extension_type`, and `wasm.module`. Declare the exports and routes you intend to use. See the [full starter config](/examples/hello-wasm.zip) and [core config models](https://github.com/lnbits/lnbits/blob/v1.6.2/lnbits/core/wasm_ext/wasm/config.py).

Paths referenced by the runtime must stay within the extension package. UI entrypoints must be `.html` files outside `static/`. An export's visibility and a route's `auth` are separate declarations; use consistent values.

## Host interfaces

Import host functions using WIT and your language's generated bindings. JavaScript uses imports such as `storageGet` from `lnbits:extension/host`. These names are component imports, not npm modules or browser APIs.

| Interface group | Functions/capabilities | Permission |
| --- | --- | --- |
| Storage | `storage-get`, `storage-get-paginated` | `ext.storage.read` |
| Storage | `storage-set`, `storage-delete` | `ext.storage.write` |
| Public storage | `storage-get-public`, `storage-get-public-paginated` | `ext.storage.read_public` with field policies |
| Public storage | `storage-append-public` | `ext.storage.append_public` with source/field policies |
| Wallets | `list-user-wallets`, `wallet-balance` | `wallet.list`, `wallet.balance.read` respectively |
| Invoices | `create-invoice`, `create-invoice-public` | Matching wallet invoice permissions |
| Payouts | `pay-invoice`, `pay-lnurl` | `wallet.pay_invoice` or background permission and grant |
| Live updates | `websocket-publish` | `websocket.publish` with rate policy |
| HTTP | `http-request` | `http.request` with allowed-origin policies |
| Other extensions | `extension-api-request` | `extension.api.request` with target/access policies |
| System | `random-id`, `now`, `log` | No additional permission |
| Utilities | Currency conversion, server health, Lightning invoice helpers | Interface-specific host functions |

The [host API source](https://github.com/lnbits/lnbits/blob/v1.6.2/lnbits/core/wasm_ext/api/host.py) and [request/response models](https://github.com/lnbits/lnbits/blob/v1.6.2/lnbits/core/wasm_ext/api/models.py) define exact fields. Use [Battleships' WIT](https://github.com/lnbits/battleshipswasm/blob/v0.1.6/wasm/lnbits-extension.wit) as a concrete binding example; it declares the subset used by that extension.

For policies, use `policies` (plural). Public storage policies use `table_name` and `public_fields`; public invoice policies use `table` and `wallet_field`. HTTP policies restrict allowed origins, and other-extension policies specify an extension `id` and `access` such as `read` or `write`. Do not use legacy permission strings such as `api.POST:/api/v1/payments`.

## Storage

- Declare fields in `storage/schema.json`; every table needs an `id` field.
- Supported field types: `string`, `integer`, `number`, `boolean`, `datetime`. `list: true`, `nullable`, and `default` modify field behavior.
- Supply datetime values as Unix timestamps. Do not supply the reserved owner field.
- Numbered files under `storage/migrations/` apply `create_table`, `add_field`, and `create_index` operations.
- Private reads/writes are scoped to the current owner. Public reads expose only declared public fields.

See [Storage and events](./storage-events) for a complete initial table and migration.

## URLs and authentication

| Purpose | URL |
| --- | --- |
| Declared extension API | `/api/v1/ext/<id>/<route>` |
| UI page | `/ext/<declared-ui-path>` |
| Packaged assets | `/ext-assets/<id>/<asset>` |
| Runtime monitoring | `/admin/extensions/wasm` |
| Runtime limit settings | `/admin/extensions/wasm/limits` |

Authenticated routes use an LNbits user session or Bearer access token. Public routes do not authenticate a wallet owner just because a visitor is signed in. Use the frontend bridge for iframe requests; LNbits validates route access and handles authentication.

## Runtime limits

Instance defaults can be overridden for an installed extension through the admin runtime settings. A value of **0 disables that limit**; keep bounded defaults while developing and adjust only after diagnosing a specific failure.

| Setting | Default | Meaning |
| --- | --- | --- |
| `WASM_RUNTIME_MAX_MEMORY_BYTES` | 67,108,864 (64 MiB) | Linear memory |
| `WASM_RUNTIME_MAX_EXECUTION_MS` | 5,000 | Invocation time |
| `WASM_RUNTIME_MAX_FUEL` | 100,000,000 | Computational work |
| `WASM_RUNTIME_MAX_REQUEST_BYTES` | 1,048,576 | Request body |
| `WASM_RUNTIME_MAX_RESPONSE_BYTES` | 1,048,576 | Component response |
| `WASM_RUNTIME_MAX_WASM_STACK_BYTES` | 1,048,576 | WASM stack |
| `WASM_RUNTIME_MAX_TABLE_ELEMENTS` | 10,000 | Table elements |
| `WASM_RUNTIME_MAX_INSTANCES` | 8 | Component instances |
| `WASM_RUNTIME_MAX_TABLES` | 10 | Tables |
| `WASM_RUNTIME_MAX_MEMORIES` | 1 | Memories |
| `WASM_RUNTIME_MAX_CONCURRENT_INVOCATIONS` | 16 | Instance-wide concurrency |
| `WASM_RUNTIME_MAX_CONCURRENT_INVOCATIONS_PER_EXTENSION` | 4 | Per-extension concurrency |
| `WASM_RUNTIME_MAX_CONCURRENT_INVOCATIONS_PER_USER` | 4 | Per-user concurrency |
| `WASM_RUNTIME_MAX_HOST_CALLS` | 1,000 | Host calls per invocation |
| `WASM_RUNTIME_MAX_HTTP_CALLS` | 20 | HTTP calls per invocation |
| `WASM_RUNTIME_MAX_STORAGE_CALLS` | 100 | Storage calls per invocation |
| `WASM_RUNTIME_MAX_WALLET_CALLS` | 20 | Wallet calls per invocation |
| `WASM_RUNTIME_HTTP_TIMEOUT_MS` | 5,000 | Host HTTP timeout |
| `WASM_RUNTIME_MAX_HTTP_RESPONSE_BYTES` | 1,048,576 | Host HTTP response size |

These are environment-setting names; config and per-extension override objects use lowercase field names. See [runtime settings source](https://github.com/lnbits/lnbits/blob/v1.6.2/lnbits/settings.py).

Runtime monitoring shows invocation status, duration, trigger, errors, and host-call counts. Inspect these before increasing a limit. Administrators can stop an invocation. A failed invocation does not imply that earlier storage or payment side effects were rolled back.

## Extension settings

| Setting | Purpose |
| --- | --- |
| `LNBITS_WASM_EXTENSIONS_PATH` | Local WASM package directory; defaults to `<data-folder>/wasm_extensions` |
| `LNBITS_WASM_EXTENSIONS_MANIFESTS` | JSON array of WASM source URLs |
| `LNBITS_WASM_INVOCATION_RETENTION_DAYS` | Invocation-history retention; default 7 days |

## Troubleshooting

| Symptom | Check |
| --- | --- |
| Extension does not appear | Correct WASM directory, matching folder/config ID, valid metadata |
| Module will not load | Compiled component exists; WIT exports and host imports match |
| Extension is inactive | Install/activate it on the instance and enable it for the user |
| Unknown export or route | WIT, JS exports, `wasm.exports`, and API mapping agree |
| Permission denied | Installed permission declarations, route auth, wallet ownership, and user grants |
| Storage table missing | Schema shipped, initial migration applied, exact table/field names |
| Browser script or style blocked | Use external files under `/ext-assets/<id>/`; remove inline/CDN assets |
| Direct fetch blocked | Use the MessageChannel bridge |
| Bridge unavailable | Open the wrapper `/ext/...` page; do not open the HTML file directly |
| Runtime timeout or fuel error | Bound loops, page large reads, reduce work, inspect invocation limits |
| Payout pending after UI reload | Reconcile the stored payment hash/status before retrying |

## Related Pages

- [Build your first extension](./building)
- [Permissions and payments](./permissions)
- [Deploy and publish](./deployment)
