# LND (REST)

> Connect LNbits to LND via REST or gRPC interface.

Connect LNbits to an LND node via its REST API.

## Configuration

```bash
LNBITS_BACKEND_WALLET_CLASS=LndRestWallet
LND_REST_ENDPOINT=https://127.0.0.1:8080
LND_REST_CERT=/path/to/tls.cert
LND_REST_MACAROON=hex-encoded-macaroon
```

## Getting the macaroon

```bash
# Convert macaroon to hex
xxd -ps -u -c 1000 ~/.lnd/data/chain/bitcoin/mainnet/admin.macaroon
```

Or use base64:

```bash
base64 ~/.lnd/data/chain/bitcoin/mainnet/admin.macaroon
```

## LND (gRPC)

For gRPC connections:

```bash
LNBITS_BACKEND_WALLET_CLASS=LndWallet
LND_GRPC_ENDPOINT=127.0.0.1
LND_GRPC_PORT=10009
LND_GRPC_CERT=/path/to/tls.cert
LND_GRPC_MACAROON=hex-or-base64-macaroon
```

::: tip
REST is simpler to set up. Use gRPC when you need lower latency for high-throughput setups.
:::

## Related Pages

- [Funding Sources](/guide/wallets/index.md)
- [Wallet Backend Comparison](/guide/wallets/comparison.md)
- [Configuration](/guide/core/environment.md)
