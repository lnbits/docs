# WASM Extensions

> Browse sandboxed extensions that access LNbits through explicit permissions.

WASM extensions combine a compiled WebAssembly backend with HTML and JavaScript inside a sandboxed iframe. The module cannot directly read host files or LNbits environment variables. Wallet, storage, network, and live-update operations use host interfaces with permission checks.

## Compatibility and installation

Use an LNbits version with the **core WASM runtime**. These guides target the runtime in LNbits **1.6.2**; check each extension's minimum version before installing.

1. Open **Extensions** on your LNbits instance.
2. Find the extension and check its version and requested permissions.
3. Install it, then enable it for your account.
4. Open it and select a wallet if its setup requires one.

WASM sources have their own manifest setting. Administrators can configure it under extension settings in LNbits instance settings in the Extensions section or with the `LNBITS_WASM_EXTENSIONS_MANIFESTS` environment variable. See [Using Extensions](/guide/using-extensions#extension-sources) for both source types.

## Wallet permissions

An extension may ask to create invoices, send payments, or watch payments.

## Browse WASM extensions

This directory contains documented examples.

<ExtensionGrid extension-type="wasm" />

## Administration

Administrators can monitor WASM invocations and set runtime limits for execution time, fuel, memory, and host calls. Keep the defaults unless an extension needs a reviewed adjustment. See [Runtime limits and troubleshooting](/dev/extensions/wasm/reference#runtime-limits).

## Related Pages

- [Python Extensions](/extensions/python/): application-level integrations
- [Using Extensions](/guide/using-extensions): installation and activation
- [Developing WASM Extensions](/dev/extensions/wasm/): build your own
