# WASM Extensions

> Browse sandboxed extensions that access LNbits through explicit permissions.

WASM extensions combine a compiled WebAssembly backend with HTML and JavaScript inside a sandboxed iframe. The module cannot directly read host files or LNbits environment variables. Wallet, storage, network, and live-update operations use host interfaces with permission checks.

## Compatibility and installation

Use an LNbits version with the **core WASM runtime**. These guides target the runtime in LNbits **1.6.2**; check each extension's minimum version before installing.

1. Open **Extensions** on your LNbits instance.
2. Find the extension and check its version and requested permissions.
3. Install it, then enable it for your account.
4. Open it and select a wallet if its setup requires one.

WASM sources have their own manifest setting. Administrators can configure it under extension settings using `LNBITS_WASM_EXTENSIONS_MANIFESTS`. See [Using Extensions](/guide/using-extensions#extension-sources) for both source types.

## Wallet permissions

An extension may ask to create invoices, send payments, or watch payments. For background payouts, approval specifies a wallet, a maximum amount per payment, and a destination policy. Review these before allowing access; a payout grant is not a total spending budget.

The sandbox limits access and resource use, but it does not guarantee correct game rules, prices, or payment logic. Only approve behavior you intend to use.

## Browse WASM extensions

This directory contains documented examples. Your instance's WASM marketplace may offer additional extensions. Legacy examples are marked on their detail pages and require their original host runtime.

<ExtensionGrid extension-type="wasm" />

## Administration

Administrators can monitor WASM invocations and set runtime limits for execution time, fuel, memory, and host calls. Keep the defaults unless an extension needs a reviewed adjustment. See [Runtime limits and troubleshooting](/dev/extensions/wasm/reference#runtime-limits).

## Related Pages

- [Python Extensions](/extensions/python/): application-level integrations
- [Using Extensions](/guide/using-extensions): installation and activation
- [Developing WASM Extensions](/dev/extensions/wasm/): build your own
