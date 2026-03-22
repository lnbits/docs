<HeroImage type="wallets" />

# Funding Sources

> Configure which Lightning backend LNbits connects to for real payments. Set LNBITS_BACKEND_WALLET_CLASS in your .env file.

A funding source is the Lightning backend that LNbits connects to for real payments. Set it with:

```bash
LNBITS_BACKEND_WALLET_CLASS=<BackendName>
```

## Local Lightning nodes

### LND (gRPC)

```bash
LNBITS_BACKEND_WALLET_CLASS=LndWallet
LND_GRPC_ENDPOINT=127.0.0.1
LND_GRPC_PORT=10009
LND_GRPC_CERT=/path/to/tls.cert
LND_GRPC_MACAROON=hex-or-base64-macaroon
```

### LND (REST)

```bash
LNBITS_BACKEND_WALLET_CLASS=LndRestWallet
LND_REST_ENDPOINT=https://127.0.0.1:8080
LND_REST_CERT=/path/to/tls.cert
LND_REST_MACAROON=hex-encoded-macaroon
```

### Core Lightning (CLNRest)

```bash
LNBITS_BACKEND_WALLET_CLASS=CoreLightningRestWallet
CLNREST_URL=https://127.0.0.1:3010
CLNREST_RUNE=your-rune
```

### Core Lightning (RPC)

```bash
LNBITS_BACKEND_WALLET_CLASS=CoreLightningWallet
CORELIGHTNING_RPC=/path/to/lightning-rpc
```

### Eclair

```bash
LNBITS_BACKEND_WALLET_CLASS=EclairWallet
ECLAIR_URL=http://127.0.0.1:8080
ECLAIR_PASS=your-password
```

### Phoenix (Phoenixd)

```bash
LNBITS_BACKEND_WALLET_CLASS=PhoenixdWallet
PHOENIXD_API_ENDPOINT=http://127.0.0.1:9740
PHOENIXD_API_PASSWORD=your-password
```

## Lightning services

### OpenNode

```bash
LNBITS_BACKEND_WALLET_CLASS=OpenNodeWallet
OPENNODE_API_ENDPOINT=https://api.opennode.com
OPENNODE_KEY=your-api-key
```

### Alby

```bash
LNBITS_BACKEND_WALLET_CLASS=AlbyWallet
ALBY_API_ENDPOINT=https://api.getalby.com
ALBY_ACCESS_TOKEN=your-access-token
```

### Strike

```bash
LNBITS_BACKEND_WALLET_CLASS=StrikeWallet
STRIKE_API_KEY=your-api-key
```

### Blink

```bash
LNBITS_BACKEND_WALLET_CLASS=BlinkWallet
BLINK_API_ENDPOINT=https://api.blink.sv/graphql
BLINK_TOKEN=your-api-token
```

### ZBD (Zebedee)

```bash
LNBITS_BACKEND_WALLET_CLASS=ZBDWallet
ZBD_API_ENDPOINT=https://api.zebedee.io/v0
ZBD_API_KEY=your-api-key
```

## Additional Lightning services

### LNPay

```bash
LNBITS_BACKEND_WALLET_CLASS=LNPayWallet
LNPAY_API_ENDPOINT=https://api.lnpay.co/v1
LNPAY_API_KEY=your-api-key
LNPAY_WALLET_KEY=your-wallet-key
```

### LNTips

```bash
LNBITS_BACKEND_WALLET_CLASS=LnTipsWallet
LNTIPS_API_ENDPOINT=https://api.ln.tips
LNTIPS_API_KEY=your-api-key
```

### Cliche

```bash
LNBITS_BACKEND_WALLET_CLASS=ClicheWallet
CLICHE_ENDPOINT=ws://127.0.0.1:12000
```

### LightningTipBot (LNTXBOT)

```bash
LNBITS_BACKEND_WALLET_CLASS=LntxbotWallet
LNTXBOT_API_ENDPOINT=https://lntxbot.com
LNTXBOT_KEY=your-api-key
```

### Spark (CLN)

```bash
LNBITS_BACKEND_WALLET_CLASS=SparkWallet
SPARK_URL=http://127.0.0.1:9737/rpc
SPARK_TOKEN=your-access-key
```

## Advanced backends

### Nostr Wallet Connect (NWC)

```bash
LNBITS_BACKEND_WALLET_CLASS=NWCWallet
NWC_PAIRING_URL=nostr+walletconnect://...
```

### Breez SDK

```bash
LNBITS_BACKEND_WALLET_CLASS=BreezSdkWallet
BREEZ_API_KEY=your-api-key
BREEZ_GREENLIGHT_SEED=your-seed
```

### Boltz (Submarine Swaps)

```bash
LNBITS_BACKEND_WALLET_CLASS=BoltzWallet
BOLTZ_API_URL=https://api.boltz.exchange
BOLTZ_REFERRAL_ID=lnbits
```

## Testing backends

### VoidWallet

The default backend. Accepts all API calls but doesn't process real Lightning payments. Use for exploring the UI.

```bash
LNBITS_BACKEND_WALLET_CLASS=VoidWallet
```

### FakeWallet

Simulates a Lightning node - invoices are auto-paid, payments always succeed. Use for development and testing.

```bash
LNBITS_BACKEND_WALLET_CLASS=FakeWallet
FAKE_WALLET_SECRET=development-secret
```

::: tip
`FakeWallet` is the best choice for extension development. It responds instantly and never fails, so you can focus on your code.
:::

## Backend features

Not all backends support all features:

| Feature | LND | CLN | Eclair | Phoenix | Services |
| --- | --- | --- | --- | --- | --- |
| Create invoice | Yes | Yes | Yes | Yes | Yes |
| Pay invoice | Yes | Yes | Yes | Yes | Yes |
| Hold invoices | Yes | Some | No | No | No |
| Node management | Yes | Yes | No | No | No |
| Channel management | Yes | Yes | No | No | No |

## Switching backends

1. Stop LNbits
2. Update `LNBITS_BACKEND_WALLET_CLASS` and related variables in `.env`
3. Restart LNbits

::: warning
Wallet balances are tracked internally. Switching backends doesn't affect user balances, but the new backend must have sufficient liquidity to cover all existing wallet balances.
:::

## Related Pages

- [Wallet Backend Comparison](/guide/wallets/comparison.md)
- [Core Lightning (CLNRest)](/guide/wallets/clnrest.md)
- [LND (REST)](/guide/wallets/lnd-rest.md)
- [Configuration](/guide/core/environment.md)
