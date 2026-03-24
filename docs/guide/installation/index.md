<HeroImage type="installation" />

# Installation

> Choose the best LNbits installation method for your environment - one-click node platforms, hosted SaaS, Docker, uv, or manual builds.

LNbits is a free, open-source Lightning wallet and accounts system. Because it is open source, there are many deployment methods available. Different solutions work best for different use cases.

::: tip Non-custodial by design
No matter how you deploy, LNbits connects to **your** Lightning backend. Your keys, your node, your rules. Third-party hosts simply run the software for you.
:::

## Choose your deployment

<DeploymentGrid />

## Quick decision tree

| Scenario | Recommended method |
| --- | --- |
| **Try it out quickly** | [LNbits SaaS](/guide/installation/saas) or [Docker](/guide/installation/docker) |
| **Already run a Bitcoin node** | [Node platforms](/guide/installation/node-platforms) (one click) |
| **Debian/Ubuntu server** | [Install script](/guide/installation/uv#install-script-debian-ubuntu) (one command) |
| **Production server** | [Docker](/guide/installation/docker) + [PostgreSQL](/guide/installation/postgresql) |
| **Development** | [uv](/guide/installation/uv) or [Poetry](/guide/installation/poetry) |
| **NixOS user** | [Nix](/guide/installation/nix) |
| **Desktop / offline** | [AppImage](/guide/installation/appimage) |
| **Cloud, no hardware** | [Fly.io](/guide/installation/flyio) or [Voltage](https://voltage.cloud) |
| **Workshops / events** | [LNbits SaaS](/guide/installation/saas) with FakeWallet |

## After installation

- [First Setup](/guide/installation/first-setup) - create your admin account, connect a Lightning backend
- [Process Manager](/guide/installation/process-manager) - run LNbits as a systemd service or with PM2
- [Reverse Proxy](/guide/installation/reverse-proxy) - set up HTTPS with Nginx or Caddy
- [PostgreSQL](/guide/installation/postgresql) - migrate from SQLite for production
- [Updating](/guide/installation/updating) - keep LNbits up to date

## Related Pages

- [First Setup](/guide/installation/first-setup) - what to do after installing
- [Docker](/guide/installation/docker) - container-based deployment (recommended)
- [Install with uv](/guide/installation/uv) - fastest source install
- [Node Platforms](/guide/installation/node-platforms) - Umbrel, RaspiBlitz, Start9, Citadel
- [SaaS / Hosted](/guide/installation/saas) - hosted LNbits providers
