# PaidTasks API

> Compatibility information for the original WASM-host implementation.

::: warning Legacy WASM host
PaidTasks uses the older `wasm` host extension. It does not use the Python CRUD API pattern or the core runtime's `/api/v1/ext/<id>/` routes.
:::

Use the matching host's live `/docs` or `/openapi.json` to inspect its available interfaces. The [PaidTasks source](https://github.com/lnbits/paidtasks) and [legacy host source](https://github.com/lnbits/wasm) describe this implementation's handler and permission model.

For new extensions, use the [core WASM frontend and API guidance](/dev/extensions/wasm/frontend).

## Related Pages

- [PaidTasks Overview](./): legacy setup and permissions
- [WASM Extensions](/extensions/wasm/): core and legacy examples
- [Core WASM Reference](/dev/extensions/wasm/reference)
