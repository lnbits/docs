# Core Lightning (CLNRest)

> Connect LNbits to Core Lightning using the CLNRest plugin.

Connect LNbits to a Core Lightning node via the CLNRest plugin.

## Configuration

```bash
LNBITS_BACKEND_WALLET_CLASS=CoreLightningRestWallet
CLNREST_URL=https://127.0.0.1:3010
CLNREST_RUNE=your-rune
```

## Prerequisites

- Core Lightning with the `clnrest` plugin enabled
- A rune for authentication (see CLN docs for `commando-rune`)

## Generating a rune

```bash
lightning-cli commando-rune
```

For a restricted rune (recommended):

```bash
lightning-cli commando-rune restrictions='[["method^list","method^pay","method^invoice","method^waitanyinvoice"]]'
```

## Core Lightning (RPC)

If you prefer the Unix socket directly:

```bash
LNBITS_BACKEND_WALLET_CLASS=CoreLightningWallet
CORELIGHTNING_RPC=/path/to/lightning-rpc
```

::: tip
CLNRest is recommended over RPC for remote connections. Use RPC only when LNbits runs on the same machine as CLN.
:::

## Related Pages

- [Funding Sources](/guide/wallets/index.md)
- [Wallet Backend Comparison](/guide/wallets/comparison.md)
- [Configuration](/guide/core/environment.md)
