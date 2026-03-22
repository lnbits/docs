# Node Platforms

> Install LNbits with one click on Umbrel, Start9, RaspiBlitz, Citadel, or myNode. No terminal, no config files.

LNbits is available as a one-click app on popular Bitcoin node platforms. Pick your platform, hit install, and LNbits auto-connects to your node's Lightning backend.

::: tip No configuration needed
On node platforms, LNbits is pre-configured to connect to the platform's Lightning node. You typically don't need to configure a funding source manually.
:::

## At a glance

| Platform | Install method | Lightning backend | Cost | Link |
| --- | --- | --- | --- | --- |
| **Umbrel** | App Store | LND (auto) | Free | [umbrel.com](https://umbrel.com) |
| **Start9** | Marketplace | CLN or LND | Free | [start9.com](https://start9.com) |
| **RaspiBlitz** | Services menu | LND or CLN | Free | [raspiblitz.org](https://raspiblitz.org) |
| **Citadel** | App Store | LND (auto) | Free | [runcitadel.space](https://runcitadel.space) |
| **myNode** | Dashboard | LND (auto) | Premium | [mynodebtc.com](https://mynodebtc.com) |

## Umbrel

<img src="/logos/backends/umbrel.png" alt="Umbrel" width="48" style="float:left;margin:0 16px 8px 0;border-radius:8px" />

LNbits is in the **Umbrel App Store**. Install it from the dashboard and it auto-connects to your Umbrel's LND node. New Umbrel versions have extensions disabled by default; enable them from the LNbits admin panel after install.

1. Open Umbrel dashboard
2. Go to **App Store**
3. Search for **LNbits** and click **Install**
4. Access LNbits from the Umbrel dashboard

**Links:** [Umbrel App Store](https://apps.umbrel.com/app/lnbits) | [umbrel.com](https://umbrel.com)

## Start9

<img src="/logos/backends/start9.png" alt="Start9" width="48" style="float:left;margin:0 16px 8px 0;border-radius:8px" />

Install LNbits from the **Start9 Marketplace**. Start9's Embassy OS integrates LNbits with your node's CLN or LND backend. Service dependencies are managed automatically.

1. Open your Start9 dashboard
2. Go to **Marketplace**
3. Find and install **LNbits**
4. Start9 wires up the Lightning backend for you

**Links:** [Start9 Marketplace](https://marketplace.start9.com) | [start9.com](https://start9.com)

## RaspiBlitz

<img src="/logos/backends/blitz.png" alt="RaspiBlitz" width="48" style="float:left;margin:0 16px 8px 0;border-radius:8px" />

RaspiBlitz includes LNbits in its **Services menu**. Enable it from the display menu or via command line. Works on Raspberry Pi 4/5 with LND or CLN.

**From the menu:**
1. Navigate to **Services** in the RaspiBlitz menu
2. Select **LNbits** and choose **Install**

**From the command line:**

```bash
config.scripts/bonus.lnbits.sh on
```

**Links:** [raspiblitz.org](https://raspiblitz.org) | [GitHub](https://github.com/raspiblitz/raspiblitz)

## Citadel

Citadel includes LNbits in its **App Store**, similar to Umbrel. One-click installation with automatic LND backend configuration.

1. Open Citadel dashboard
2. Go to **App Store**
3. Find and install **LNbits**

**Links:** [runcitadel.space](https://runcitadel.space) | [GitHub](https://github.com/runcitadel/citadel)

## myNode

<img src="/logos/backends/mynode.png" alt="myNode" width="48" style="float:left;margin:0 16px 8px 0;border-radius:8px" />

myNode **Premium** includes LNbits. Enable it from the myNode dashboard under **Applications**. The free tier does not include LNbits.

1. Open myNode dashboard
2. Go to **Applications**
3. Enable **LNbits**

**Links:** [mynodebtc.com](https://mynodebtc.com) | [GitHub](https://github.com/mynodebtc/mynode)

## Don't have hardware?

If you don't run a Bitcoin node, you can still deploy LNbits:

- **[LNbits SaaS](/guide/installation/saas)** - official hosted solution, live in 3 minutes
- **[Voltage Cloud](https://voltage.cloud)** - managed LNbits dashboard in the cloud
- **[Docker](/guide/installation/docker)** - self-host on any VPS for $5-10/month
- **[Fly.io](/guide/installation/flyio)** - cloud deployment with global edge

See the [full deployment comparison](/guide/installation/) to choose what fits best.

## Updating

Updates are handled through the platform's UI:

- **Umbrel** - App Store, LNbits, Update
- **RaspiBlitz** - Services menu, LNbits, Update
- **Start9** - Marketplace, LNbits, Update
- **Citadel** - App Store, LNbits, Update
- **myNode** - Dashboard, Applications, LNbits, Update

## Next steps

- [First Setup](/guide/installation/first-setup) - configure your new instance
- [Core features](/guide/core/) - learn what you can do with LNbits
- [Extensions](/extensions/) - add functionality

## Related Pages

- [Installation Overview](/guide/installation/) - all installation methods
- [Updating LNbits](/guide/installation/updating) - keep LNbits up to date
- [Funding Sources](/guide/wallets/) - connect a Lightning backend
- [SaaS / Hosted](/guide/installation/saas) - hosted LNbits alternative
