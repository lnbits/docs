# Node Platforms

> Install LNbits with one click on Umbrel, RaspiBlitz, Start9, or Citadel.

LNbits is available as a one-click app on popular Bitcoin node platforms.

## Umbrel

LNbits is in the Umbrel App Store. Install it from the dashboard - it auto-connects to your Umbrel's LND node.

1. Open Umbrel dashboard
2. Go to **App Store**
3. Find and install **LNbits**
4. Access via the Umbrel dashboard

## RaspiBlitz

RaspiBlitz includes LNbits in its app menu:

```bash
# From the RaspiBlitz menu
# Services → LNbits → Install
```

Or via the command line:

```bash
config.scripts/bonus.lnbits.sh on
```

## Start9

Install LNbits from the Start9 marketplace. It integrates with your Start9 node's CLN or LND backend.

## Citadel

Citadel includes LNbits in its app store, similar to Umbrel.

## myNode

myNode Premium includes LNbits. Enable it from the myNode dashboard under **Applications**.

::: tip
On node platforms, LNbits is pre-configured to connect to the platform's Lightning node. You typically don't need to configure a funding source manually.
:::

## Updating

Updates are handled through the platform's UI:

- **Umbrel** - App Store → LNbits → Update
- **RaspiBlitz** - Services menu → LNbits → Update
- **Start9** - Marketplace → LNbits → Update
- **Citadel** - App Store → LNbits → Update
- **myNode** - Dashboard → Applications → LNbits → Update

## Next steps

- [Core features](/guide/core/) - learn what you can do with LNbits
- [Extensions](/extensions/) - add functionality

## Related Pages

- [Installation Overview](/guide/installation/) - all installation methods
- [Updating LNbits](/guide/installation/updating) - keep LNbits up to date
- [Funding Sources](/guide/wallets/) - connect a Lightning backend
