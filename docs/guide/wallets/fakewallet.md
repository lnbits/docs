# FakeWallet

> Use the FakeWallet backend for development and testing without real Lightning payments.

FakeWallet simulates a Lightning node - invoices are auto-paid and payments always succeed. Use it for development and testing.

## Configuration

```bash
LNBITS_BACKEND_WALLET_CLASS=FakeWallet
FAKE_WALLET_SECRET=development-secret
```

## When to use

- Extension development - instant responses, no real node needed
- UI testing - full workflow without real sats
- CI/CD pipelines - automated tests against LNbits

## VoidWallet

VoidWallet is the default backend. It accepts all API calls but doesn't process real payments. Use it for exploring the UI without any backend.

```bash
LNBITS_BACKEND_WALLET_CLASS=VoidWallet
```

::: tip
FakeWallet is best for development. VoidWallet is best for a first look at the interface.
:::

## Related Pages

- [Funding Sources](/guide/wallets/index.md)
- [Building Extensions](/dev/building-extensions.md)
- [Contributing](/dev/contributing.md)
