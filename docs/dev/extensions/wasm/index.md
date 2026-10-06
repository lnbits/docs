# WASM Extensions

> Build sandboxed extensions using a compiled WebAssembly backend and an isolated frontend.

A WASM extension runs through LNbits' core runtime. Its backend is a WebAssembly **component**: a compiled module whose imports and exports have a defined interface. You can write the backend in a language that targets the component model; the [quickstart](./building) uses JavaScript and `jco`.

## Version requirements

These guides and the Hello WASM starter target **LNbits 1.6.2**. The runtime and examples were checked against the [v1.6.2 source](https://github.com/lnbits/lnbits/tree/v1.6.2/lnbits/core/wasm_ext). Some published extensions support earlier versions; use their release metadata to check compatibility.

::: info Core runtime
The older `wasm` host extension uses different permission names, storage, and installation paths. Its examples are not interchangeable with this runtime. The [PaidTasks legacy page](/extensions/paidtasks/) is labeled accordingly.
:::

## How it works

```text
Sandboxed frontend → LNbits bridge → Extension API route
                                      ↓
                                WASM export
                                      ↓
                        Permissioned host interfaces
```

- **Backend:** LNbits invokes a named export with JSON text and reads its JSON response.
- **Frontend:** static HTML and JavaScript run in an iframe. A bridge handles approved API requests and UI actions.
- **Storage:** declared tables are accessed through host functions, with owner checks for private data.
- **Payments:** the host checks wallet ownership, permissions, and background payout grants.

The component has no direct access to host files, environment variables, funding-source secrets, or Python execution. HTTP requests and calls to other extensions require explicit host permissions and policies.

## Resource limits

Each invocation is bounded by execution time, fuel, memory, and host-call limits. Fuel measures computational work; it is separate from elapsed time. A component cannot run a permanent background loop. An invocation that exceeds a limit fails, so report the failure and reconcile any payment or storage side effects before retrying.

See [Reference](./reference#runtime-limits) for defaults, per-extension overrides, and monitoring.

## Start building

1. [Build your first extension](./building): compile and run a small greeting.
2. [Storage and events](./storage-events): add persistent notes and live updates.
3. [Permissions and payments](./permissions): add invoices and controlled payouts.
4. [Frontend](./frontend): connect pages through the sandbox bridge.
5. [Deploy and publish](./deployment): package a release and distribute it.

For a richer example, see [Battleships](/extensions/battleshipswasm/). For functionality outside the host interfaces, consider [Python Extensions](/dev/extensions/python/).
