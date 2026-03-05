# Wallet Backends FAQ

> Common questions about connecting Lightning nodes, switching backends, cloud services, and FakeWallet.

[[toc]]

## What Lightning backends are supported?

LNbits supports 20+ Lightning backends. The most commonly used are:

| Backend | Type | Best for |
|---|---|---|
| **LND REST** | Self-hosted node | Full control, most popular |
| **CLNRest** | Self-hosted node | Core Lightning users |
| **Eclair** | Self-hosted node | ACINQ's implementation |
| **Phoenix** | Mobile/embedded | Easy setup, non-custodial |
| **NWC** | Remote protocol | Nostr Wallet Connect apps |
| **OpenNode** | Hosted service | No node required |
| **Alby** | Hosted service | Quick start |
| **Strike** | Hosted service | USD on/off ramp |
| **LNbits** | Another LNbits | Chaining instances |
| **FakeWallet** | Testing | Development, demos |

See the full [Wallet Comparison](/guide/wallets/comparison) for all backends with custody, privacy, and cost details.

## Can I run LNbits without a Lightning node?

Yes. You have several options:

- **Hosted services** — Use OpenNode, Alby, Strike, or other cloud backends. No node setup required, but you depend on a third party.
- **FakeWallet** — For testing and development only. Simulates payments without real Lightning.
- **VoidWallet** — Similar to FakeWallet but rejects all payments. Useful for UI testing.

For production with real funds, you need either your own node or a hosted Lightning service.

## How do I connect to my LND node?

Set these variables in your `.env` file:

```bash
LNBITS_BACKEND_WALLET_CLASS=LndRestWallet
LND_REST_ENDPOINT=https://your-lnd-host:8080
LND_REST_CERT=/path/to/tls.cert
LND_REST_MACAROON=your-admin-macaroon-hex
# or use file path:
LND_REST_MACAROON_FILE=/path/to/admin.macaroon
```

The macaroon can be provided as a hex string or file path. You need the **admin macaroon** for full functionality. See [LND REST](/guide/wallets/lnd-rest).

## How do I connect to Core Lightning (CLN)?

Use the CLNRest backend:

```bash
LNBITS_BACKEND_WALLET_CLASS=CLNRestWallet
CLNREST_URL=https://your-cln-host:3001
CLNREST_RUNE=your-rune-string
```

CLNRest is built into Core Lightning since v23.08. For older versions, install the CLNRest plugin separately. See [CLNRest](/guide/wallets/clnrest).

## Can I use cloud Lightning nodes?

Yes. Services like **Voltage** (hosted LND), **Greenlight** (hosted CLN), and other providers work well with LNbits. Set the backend environment variables to point to your cloud node's API endpoint.

Example with a Voltage node:

```bash
LNBITS_BACKEND_WALLET_CLASS=LndRestWallet
LND_REST_ENDPOINT=https://your-node.m.voltageapp.io:8080
LND_REST_MACAROON=your-macaroon-hex
```

## How do I switch backends?

1. Stop LNbits
2. Update the backend variables in `.env`:
   ```bash
   LNBITS_BACKEND_WALLET_CLASS=NewBackendWallet
   # ... set the new backend's connection variables
   ```
3. Restart LNbits

::: warning
Switching backends does not transfer balances. LNbits wallet balances are internal accounting — the actual funds remain on the original node. If your old node had 100,000 sats and your new node has 0, your LNbits users will have balances they can't spend.
:::

## What's FakeWallet / VoidWallet?

**FakeWallet** simulates successful Lightning payments. Every invoice is instantly "paid" and every outgoing payment "succeeds." It's designed for development and testing.

```bash
LNBITS_BACKEND_WALLET_CLASS=FakeWallet
FAKE_WALLET_SECRET=development-secret
```

**VoidWallet** rejects all payment operations. Useful for testing error handling in extensions.

```bash
LNBITS_BACKEND_WALLET_CLASS=VoidWallet
```

Neither should ever be used in production with real funds. See [FakeWallet](/guide/wallets/fakewallet).

## How do I fix "circular route" errors?

This error occurs when LNbits tries to pay itself — the payment loops back to the same node. Common causes:

1. **Testing on the same node** — your test wallet pays an invoice created on the same LNbits instance backed by the same node
2. **LNDhub loop** — the LNDhub extension points back to the same instance

Solutions:

- Use a second Lightning node or wallet for testing
- Use FakeWallet for development
- If using LNDhub, point it to an external node
- Check that `LNBITS_BACKEND_WALLET_CLASS` isn't creating a loop

## My backend connection keeps dropping

If LNbits loses connection to your Lightning backend:

1. **Check the node** — ensure your Lightning node is running and responsive
2. **Check network** — verify connectivity between LNbits and the node (firewalls, VPN, Tor)
3. **Check certificates** — TLS cert may have expired or changed
4. **Check macaroon/rune** — credentials may have been revoked or rotated
5. **Check logs** — `docker compose logs -f` or the LNbits log file for specific errors
6. **Increase timeouts** — some backends need longer timeouts for slow connections

## Insufficient balance errors

"Insufficient balance" means the Lightning backend doesn't have enough outbound liquidity to route the payment. This is a **channel capacity issue** on your Lightning node, not an LNbits bug.

Solutions:

- Open new channels with outbound capacity
- Rebalance existing channels
- Use a different route (the node will try automatically)
- For large payments, consider submarine swaps or on-chain fallback

Check your node's channel balances with your node management tool (ThunderHub, RTL, etc.).

## Related Pages

- [Wallet Backends Overview](/guide/wallets/) — all supported backends
- [Wallet Comparison](/guide/wallets/comparison) — feature comparison table
- [LND REST](/guide/wallets/lnd-rest) — LND setup guide
- [CLNRest](/guide/wallets/clnrest) — Core Lightning setup guide
- [FakeWallet](/guide/wallets/fakewallet) — testing backend
