# WASM frontend

> Connect an isolated HTML page to your extension through the LNbits bridge.

WASM UI pages run inside a sandboxed iframe. They are static HTML and JavaScript. LNbits renders the outer page and brokers approved actions on behalf of the frame.

## Pages and assets

Declare each page in `ui_routes`:

```json
{
  "ui_routes": [
    {"path": "/hello_wasm", "entrypoint": "ui/index.html", "auth": "public"},
    {"path": "/hello_wasm/settings", "entrypoint": "ui/settings.html", "auth": "user"}
  ]
}
```

Create the referenced HTML files. The routes are served at `/ext/hello_wasm` and `/ext/hello_wasm/settings`. Entrypoints must be HTML files inside the extension root and outside `static/`.

Assets under `static/` are served at `/ext-assets/<extension-id>/`. In Hello WASM:

```html
<link rel="stylesheet" href="/ext-assets/hello_wasm/app.css">
<script src="/ext-assets/hello_wasm/client.js" defer></script>
<script src="/ext-assets/hello_wasm/app.js" defer></script>
```

Use packaged scripts and styles. The frame's content security policy blocks inline scripts/styles, direct network connections, forms, workers, and nested frames. Do not rely on CDN scripts, direct `fetch`, or access to the parent's DOM, cookies, or wallet keys.

## Call the backend

The downloadable starter includes a small `extensionClient`. It establishes a `MessageChannel` with the parent using `lnbits-extension:connect`, then sends requests with unique IDs and waits for matching responses.

```js
const response = await extensionClient.request('/greet', {
  method: 'POST',
  body: {name: 'Ada'}
})
```

This sends an `api` bridge action for `/api/v1/ext/hello_wasm/greet`. LNbits checks that the method and path match a declared API route. It attaches authentication for an authenticated page; the component receives the parsed payload, not wallet keys.

Check the operation result as well as transport errors. In the starter, a validation failure returns `ok: false`; render its error message. Use `textContent` for user-provided text.

## Authenticated and public pages

| Page | Intended use | Backend rules |
| --- | --- | --- |
| `auth: "user"` | Owner settings and private records | Use authenticated exports and API routes |
| `auth: "public"` | Shared games or payment pages | Expose only public exports and routes |

A public page does not inherit a signed-in visitor's wallet access. Never embed an admin/invoice key or Bearer token in shared HTML, URLs, or browser payloads.

Use `path_params` to map URL parameters to the payload, such as `game_id` → `gameId`. For a public route that must operate on an owner's stored record, configure `ownerContext`:

```json
{
  "method": "POST",
  "path": "/greetings/{greeting_id}/join",
  "export": "join-greeting",
  "auth": "public",
  "path_params": {"greeting_id": "greetingId"},
  "ownerContext": {"table": "greetings", "idParam": "greetingId"}
}
```

This fragment assumes a declared table and public `join-greeting` export. LNbits looks up the stored owner; it does not trust an owner ID from the browser. The handler still needs to authorize the operation, validate tokens and record state, and restrict returned fields. Treat every request field as untrusted.

## Bridge actions

The core bridge also supports context, UI notifications, permission prompts, payment subscriptions, and extension WebSocket subscriptions. Use the starter's `bridge` method for simple actions:

```js
await extensionClient.bridge({
  action: 'ui.notify',
  level: 'positive',
  message: 'Settings saved.'
})
```

Request payout grants from an authenticated page; see [Permissions and payments](./permissions#background-payout-approval). For live updates, see [Storage and events](./storage-events#live-updates). Unsubscribe when a view closes and fetch current state after reconnecting.

## Related Pages

- [Build your first extension](./building): complete working page
- [Storage and events](./storage-events): persistent state and subscriptions
- [Reference](./reference#troubleshooting): CSP, bridge, and route failures
