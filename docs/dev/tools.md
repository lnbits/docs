# Developer Tools

> Tools that make building, testing, and maintaining LNbits easier - from no-code extension scaffolding to local Lightning networks and API diffing.

## Extension Builder

Build complete extensions through a step-by-step wizard inside LNbits - no manual coding required. The Extension Builder generates database models, CRUD operations, API endpoints, Vue.js admin pages, and optional Lightning payment logic from a form.

Great for prototyping new ideas or creating simple extensions without touching code.

[Extension Builder documentation →](/guide/core/extension-builder)

## Polar - Local Lightning test network

[Polar](https://lightningpolar.com/) lets you spin up a full local Lightning Network on your machine with LND, CLN, and Eclair nodes. Connect LNbits to a Polar node to test payments, channels, and routing without risking real sats.

**Why use it:**
- Test multi-hop payments and channel liquidity scenarios
- Develop extensions against real Lightning behavior (not FakeWallet)
- Simulate failure cases like insufficient balance or expired invoices
- Safe sandbox - nothing touches mainnet

**Quick start:**

1. Download [Polar](https://lightningpolar.com/) and create a network
2. Start an LND or CLN node
3. Point LNbits at the node:

```bash
LNBITS_BACKEND_WALLET_CLASS=LndRestWallet
LND_REST_ENDPOINT=https://127.0.0.1:8081
LND_REST_MACAROON=<macaroon from Polar>
LND_REST_CERT=<tls cert from Polar>
```

::: tip
Polar shows you the macaroon and cert paths directly in the node info panel. Copy them from there.
:::

## TableTown - API comparison tool

[TableTown](https://arbadacarbayk.github.io/LNbits_TableTown/) lets you diff the API of two LNbits instances side by side. Compare your production instance against a dev branch, or compare two versions to spot endpoint changes before updating.

**Why use it:**
- Catch breaking API changes before upgrading
- Compare dev vs prod endpoints, parameters, and response schemas
- Verify your extension's API matches the upstream version
- Review what changed between LNbits releases

**How to use it:**

1. Open [TableTown](https://arbadacarbayk.github.io/LNbits_TableTown/)
2. Enter the URLs of two LNbits instances (or OpenAPI spec URLs)
3. View the diff - added, removed, and changed endpoints are highlighted

Built by [Arbadacarbayk](https://github.com/Arbadacarbayk) - a standout community contribution that makes pre-release reviews fast and reliable.

## Related Pages

- [Extension Builder](/guide/core/extension-builder) - no-code extension creation wizard
- [FakeWallet](/guide/wallets/fakewallet) - simulated Lightning backend for quick testing
- [Building Extensions](/dev/building-extensions) - full extension development guide
- [Contributing](/dev/contributing) - dev setup, commands, and PR process
