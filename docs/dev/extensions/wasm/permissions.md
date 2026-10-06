# Permissions and payments

> Declare the operations your extension needs and keep payment decisions in the backend.

The sandbox has two layers of access control: the extension's declared host permissions, and wallet-specific user grants for background payments or payment watching. A frontend prompt does not replace server-side permission checks.

## Declare permissions

Add only the permissions your extension uses to `config.json`:

```json
{
  "permissions": [
    {"id": "wallet.list", "description": "Let you choose a receiving wallet."},
    {"id": "wallet.create_invoice", "description": "Create invoices in your wallet."}
  ]
}
```

This is a config fragment. Merge it into the starter and update/reinstall the extension after changing its permissions. The runtime rejects unknown permission IDs and checks permissions when a host operation is called. Administrators can inspect or restrict installed permissions.

| Operation | Permission | Additional check |
| --- | --- | --- |
| List wallets | `wallet.list` | Authenticated user |
| Create an invoice | `wallet.create_invoice` | Wallet belongs to the current user |
| Create a public invoice | `wallet.create_invoice_public` | Wallet is resolved from a declared source record |
| Pay from a user context | `wallet.pay_invoice` | Wallet ownership and permission |
| Pay without a user context | `wallet.pay_invoice_background` | Active wallet-specific payout grant |
| Watch wallet payments | `wallet.payments.watch` | User grant for that wallet |

## Add an invoice to Hello WASM

To add an authenticated `create-invoice-for-greeting` export, add the `create-invoice` host declaration from the [Battleships WIT](https://github.com/lnbits/battleshipswasm/blob/v0.1.6/wasm/lnbits-extension.wit), import `host` in the world, and declare your new export as `func(request-json: string) -> string`.

Register `create-invoice-for-greeting` with `visibility: "authenticated"` and a `POST /invoice` API route with `auth: "user"`. Import and call the host function in `module.js`:

```js
import {createInvoice} from 'lnbits:extension/host'

export function createInvoiceForGreeting(requestJson) {
  const {walletId} = JSON.parse(requestJson)
  const invoice = createInvoice({
    walletId,
    amount: 10,
    currency: 'sat',
    memo: 'Paid greeting',
    tag: 'hello_wasm',
    extra: [['purpose', 'greeting']]
  })
  return JSON.stringify({ok: true, ...invoice})
}
```

Use `create-invoice-for-greeting` for the WIT export and matching config export/route, because JavaScript's `createInvoiceForGreeting` maps to that name. Set the amount and purpose in backend logic, and store the returned `paymentHash` alongside the greeting/order record before granting access. The response also contains `paymentRequest` and `checkingId`. For an invoice-paid handler that needs private storage access, use the source-record flow below to establish its owner context, or request a wallet-payment watch grant. The invoice event alone does not supply an authenticated user session.

For public purchases, declare a source-table policy, such as:

```json
{
  "id": "wallet.create_invoice_public",
  "description": "Create invoices for published greetings.",
  "policies": [{"table": "greetings", "wallet_field": "wallet_id"}]
}
```

Create that table and its records from an authenticated owner context. The `create-invoice-public` host call receives a `sourceId`; LNbits resolves the receiving wallet from the stored record. The public browser must not choose an arbitrary wallet or the price. Have the module read the configured price and validate whether the record accepts new invoices.

## Background payout approval

For payouts after the user leaves, declare `wallet.pay_invoice_background`. From an authenticated frontend, request a grant through the bridge:

```js
const approval = await extensionClient.bridge({
  action: 'permissions.request_background_payment',
  grant: {
    walletId: selectedWalletId,
    maxAmount: 100,
    destinationPolicy: 'own_wallets_only'
  },
  forcePrompt: true
})
```

`maxAmount` is in sats and limits **each payment**, not total spending or a single game record. `own_wallets_only` permits internal invoices for wallets owned by that user. `external_allowed` also permits external destinations, such as a winner's Lightning address.

Cancellation or denial must stop the payout flow and leave a clear pending/unauthorized state. Do not silently request a broader grant. If a game needs a record-specific pot limit, enforce that separately in the backend; the wallet grant itself is wallet-scoped.

Use `pay-invoice` or `pay-lnurl` from the module with the matching WIT records. The host enforces wallet ownership in a user context, or the background grant when no user context is present. A denied grant, excessive amount, or disallowed destination must not be reported as a completed payment.

## Confirm payment state

For incoming payments:

1. Store the expected payment hash, wallet, amount, and associated record.
2. Handle `onInvoicePaid` in the module, checking those expected values.
3. Save the confirmed paid state before sending a live UI update.

For outgoing payments, inspect the host response's `ok`, `error`, `paymentHash`, `pending`, and `success`. An accepted request can still be pending. Persist its hash and status, and reconcile it before retrying; do not create a second payout because the browser timed out.

A browser notification, invoice QR code, or animation is not payment confirmation. On reload or reconnect, retrieve persisted state. [Battleships](/extensions/battleshipswasm/) demonstrates public invoices, owner-context routes, and payout settlement.

## Test payment permissions

Use a development instance and controlled test wallets. Check these cases before publishing:

| Scenario | Expected behavior |
| --- | --- |
| Invoice for another user's wallet | Denied; no invoice created |
| Background grant declined or revoked | No payment; explain missing approval |
| Payout above the grant maximum | Denied; retain unsettled state |
| External payout with `own_wallets_only` | Denied |
| Allowed payout with sufficient funds | Record actual success or pending state |
| Repeated paid event or settlement request | No duplicate award or payout |
| UI reload after payment | Show persisted, confirmed state |

## Related Pages

- [Storage and events](./storage-events#invoice-paid-events)
- [Frontend](./frontend#authenticated-and-public-pages)
- [Reference](./reference#host-interfaces)
