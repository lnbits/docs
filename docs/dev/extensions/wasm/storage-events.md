# Storage and events

> Add persistent records and live updates without database access from the component.

The core runtime uses declared tables and host storage functions. It does not use the legacy host's KV store or Python migrations.

## Extend Hello WASM with notes

Create `storage/schema.json`:

```json
{
  "version": 1,
  "tables": {
    "notes": {
      "fields": [
        {"name": "id", "type": "string"},
        {"name": "message", "type": "string"}
      ]
    }
  }
}
```

Create `storage/migrations/0001_initial.json` to create the table:

```json
{
  "version": 1,
  "operations": [{
    "op": "create_table",
    "table": "notes",
    "fields": [
      {"name": "id", "type": "string"},
      {"name": "message", "type": "string"}
    ]
  }]
}
```

Add `ext.storage.read` and `ext.storage.write` to `config.json` permissions. Add these records and functions in a `host` interface before the WIT world:

```text
interface host {
  record storage-get-request { table: string, id: string }
  record storage-get-response { data-json: option<string> }
  record storage-set-request { table: string, data-json: string }
  record storage-set-response { ok: bool }

  storage-get: func(request: storage-get-request) -> storage-get-response;
  storage-set: func(request: storage-set-request) -> storage-set-response;
  record random-id-request { prefix: string }
  record random-id-response { id: string }
  random-id: func(request: random-id-request) -> random-id-response;
}
```

Inside `world hello`, retain `greet` and add:

```text
import host;
export save-note: func(request-json: string) -> string;
export get-note: func(request-json: string) -> string;
```

Add the corresponding JavaScript exports to `module.js`:

```js
import {randomId, storageGet, storageSet} from 'lnbits:extension/host'

export function saveNote(requestJson) {
  const {message} = JSON.parse(requestJson)
  if (typeof message !== 'string' || message.length > 280) {
    return JSON.stringify({ok: false, error: 'Use a message of at most 280 characters.'})
  }
  const {id} = randomId({prefix: 'note'})
  storageSet({table: 'notes', dataJson: JSON.stringify({id, message})})
  return JSON.stringify({ok: true, id})
}

export function getNote(requestJson) {
  const {id} = JSON.parse(requestJson)
  if (typeof id !== 'string' || !id) {
    return JSON.stringify({ok: false, error: 'A note ID is required.'})
  }
  const {dataJson} = storageGet({table: 'notes', id})
  return JSON.stringify({ok: true, note: dataJson ? JSON.parse(dataJson) : null})
}
```

Register `save-note` and `get-note` with `visibility: "authenticated"`. Add `POST /note` and `GET /note` API routes with `auth: "user"`. Rebuild and reinstall/update the local extension so LNbits receives the new permissions and migrations. Call these routes from a `user` frontend through the bridge, or with an authenticated user Bearer token.

Keep the ID returned by `save-note` and read it with `GET /note?id=<note-id>`. IDs are unique across the table, so generate them rather than using a fixed key for every user. Owner checks prevent another user from reading your note. The host owns the reserved `__lnbits_owner_id__` field; do not declare or supply it yourself. JavaScript globals do not persist between invocations, so keep application state in storage.

## Public reads

To expose selected data, declare `ext.storage.read_public` with a policy:

```json
{
  "id": "ext.storage.read_public",
  "description": "Read published note fields.",
  "policies": [{"table_name": "notes", "public_fields": ["id", "message"]}]
}
```

Use `storage-get-public`, not the private `storage-get` function. Only publish fields intended for everyone; this policy makes those fields public for matching records. Keep wallet IDs, player secrets, and private messages out of public responses.

For schema changes, update `schema.json` and add the next numbered migration. The runtime supports `create_table`, `add_field`, and `create_index`; do not edit an already-applied migration.

## Invoice-paid events

An extension can register one invoice-paid event export:

```json
{
  "events": {"onInvoicePaid": "record-payment"},
  "wasm": {
    "exports": [{"name": "record-payment", "visibility": "event"}]
  }
}
```

Merge these entries into the existing config, retain its module and other exports, and add the export to WIT and JavaScript. It receives JSON with `paymentHash`, `walletId`, `amount`, `status`, `pending`, `extra`, and the payment record. `amount` is in millisatoshis.

Extension-created invoices are dispatched to the extension. Public invoice `source_id` metadata can establish the record owner's context. Watching other incoming payments requires `wallet.payments.watch` and a user grant for the wallet.

Treat an event as a signal to verify and update the stored record. Match its payment hash, wallet, amount, and source; make handling idempotent so repeat delivery cannot award an item or trigger a payout twice. See [Permissions and payments](./permissions#confirm-payment-state).

## Live updates

Declare `websocket.publish` with a policy such as `[{"max_messages_per_second": 20}]`, and `websocket.subscribe` for the frontend. Import the `websocket-publish` host function using the [Battleships WIT interface](https://github.com/lnbits/battleshipswasm/blob/v0.1.6/wasm/lnbits-extension.wit).

Publish a small notification after saving state:

```js
websocketPublish({
  itemId: 'welcome',
  dataJson: JSON.stringify({type: 'note-updated'})
})
```

The starter's frontend client can subscribe and then fetch the current record. Here `noteId` is the ID returned when the user saved a note:

```js
const unsubscribe = await extensionClient.subscribeWebsocket('welcome', async () => {
  const response = await extensionClient.request(`/note?id=${encodeURIComponent(noteId)}`)
  // Render only data returned by the authenticated endpoint.
})
// Call await unsubscribe() when the view no longer needs updates.
```

Channels are extension-scoped, not automatically private to a user. Use them for non-sensitive notifications, and authorize data access in API handlers. Refetch after reconnecting; a live notification is not durable state.

## Scheduled work

LNbits 1.6.2's core WASM configuration exposes invoice-paid events, not a general scheduled-task registration interface. Do not copy scheduler examples from the older host. Use bounded authenticated API calls driven by an external scheduler, or choose a Python extension when a server-side background task is required.

## Related Pages

- [Build your first extension](./building)
- [Permissions and payments](./permissions)
- [Frontend](./frontend)
- [Storage reference](./reference#storage)
