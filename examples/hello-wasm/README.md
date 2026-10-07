# Hello WASM

Minimal starter for the LNbits 1.6.2 core WASM runtime. No wallet or storage
permissions are requested. See the docs at /dev/extensions/wasm/building.

Run `npm install`, `npm run check`, and `npm run build`.
Copy config.json, wasm/, ui/, and static/ to data/wasm_extensions/hello_wasm/
inside your LNbits development instance, restart, then install/enable the local
extension in LNbits. Open /ext/hello_wasm and say hello.

The module receives JSON text and returns JSON text. The browser uses the LNbits
MessageChannel bridge because the sandbox prevents direct network requests.
