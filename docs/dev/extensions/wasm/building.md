# Build your first WASM extension

> Compile a small greeting component, load it in LNbits, and call it from a sandboxed page.

This example targets the **LNbits 1.6.2 core WASM runtime**. It creates a public greeting endpoint and a page with a name input. It requests no wallet or storage permissions.

## Prerequisites

- A local LNbits 1.6.2 development instance; see [Installation](/guide/installation/).
- Node.js 20 or newer and npm for building the JavaScript component.
- The [Hello WASM starter ZIP](/examples/hello-wasm.zip).

The compiler is a development tool. Users install the compiled component without needing Node.js.

## Build the starter

Extract the ZIP, open its `hello_wasm` folder, and run:

```bash
npm install
npm run check
npm run build
```

The starter pins `@bytecodealliance/jco` to `1.15.2`. The build produces `wasm/module.wasm` using the component model; a browser-style WASM binary with an unrelated interface will not work.

```text
hello_wasm/
├── config.json          # Metadata, exports, routes, and permissions
├── module.js            # Backend source
├── package.json         # Development build commands
├── wasm/
│   ├── hello.wit         # Component interface
│   └── module.wasm       # Compiled output
├── ui/index.html        # Sandboxed page
└── static/              # Bridge client, app JavaScript, and CSS
```

## Backend interface

`wasm/hello.wit` defines the export. WIT is the interface description used by the compiler and host:

```text
package lnbits:extension;

world hello {
  export greet: func(request-json: string) -> string;
}
```

`module.js` receives JSON text and returns JSON text:

```js
export function greet(requestJson) {
  const input = JSON.parse(requestJson)
  const name = typeof input.name === 'string' ? input.name.trim() : ''
  if (name.length > 80) {
    return JSON.stringify({ok: false, error: 'Use a name of 80 characters or fewer.'})
  }
  return JSON.stringify({ok: true, message: `Hello, ${name || 'LNbits'}!`})
}
```

The full `config.json` is in the starter. Its key mappings are:

```json
{
  "extension_type": "wasm",
  "wasm": {
    "module": "wasm/module.wasm",
    "wit": "wasm/hello.wit",
    "world": "hello",
    "exports": [{"name": "greet", "visibility": "public"}]
  },
  "ui_routes": [{"path": "/hello_wasm", "entrypoint": "ui/index.html", "auth": "public"}],
  "api_routes": [{"method": "POST", "path": "/greet", "export": "greet", "auth": "public"}],
  "permissions": []
}
```

Keep the folder name and `config.json` ID identical: `hello_wasm`. The API path becomes `/api/v1/ext/hello_wasm/greet`; the UI route becomes `/ext/hello_wasm`.

## Load it locally

From your LNbits project directory, copy the built package into the data directory:

```bash
mkdir -p data/wasm_extensions/hello_wasm
cp /path/to/hello_wasm/config.json data/wasm_extensions/hello_wasm/
cp -R /path/to/hello_wasm/wasm /path/to/hello_wasm/ui /path/to/hello_wasm/static \
  data/wasm_extensions/hello_wasm/
```

Use your actual starter path. If your instance uses a different `LNBITS_DATA_FOLDER` or `LNBITS_WASM_EXTENSIONS_PATH`, copy to that instance's WASM directory instead.

Restart LNbits. On startup it discovers new local WASM packages and creates their installed metadata. Open **Extensions** and enable Hello WASM for your account. If you have disabled it at the instance level, reactivate it first.

## Try the endpoint and page

```bash
curl -X POST http://127.0.0.1:5000/api/v1/ext/hello_wasm/greet \
  -H 'Content-Type: application/json' \
  -d '{"name":"Ada"}'
```

Expect `{"ok":true,"message":"Hello, Ada!"}`. An empty name produces `Hello, LNbits!`; a name longer than 80 characters produces an error response.

Open `http://127.0.0.1:5000/ext/hello_wasm`, enter a name, and click **Say hello**. The frontend calls the same endpoint through the LNbits bridge. Open the page through LNbits rather than directly opening `ui/index.html`.

## Next steps

- [Storage and events](./storage-events): extend Hello WASM with saved notes
- [Permissions and payments](./permissions): add wallet operations
- [Frontend](./frontend): understand the bridge and public pages
- [Reference](./reference#troubleshooting): loading and runtime failures
