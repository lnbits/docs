# Deploy on Fly.io

> Deploy LNbits on Fly.io — a platform for running full-stack apps and databases close to your users.

[Fly.io](https://fly.io) runs applications in lightweight VMs (Firecracker) across global edge locations. It's a good option for deploying LNbits with low latency and easy scaling.

## Prerequisites

- [Fly.io account](https://fly.io/app/sign-up)
- [flyctl CLI](https://fly.io/docs/hands-on/install-flyctl/) installed
- A Lightning backend accessible from the internet (LND, CLN, or a service like OpenNode)

## Quick start

```bash
# Log in to Fly.io
fly auth login

# Clone LNbits
git clone https://github.com/lnbits/lnbits.git
cd lnbits

# Launch the app
fly launch
```

When prompted:
- Choose a region close to your Lightning node
- Select a VM size (shared-cpu-1x with 512MB is fine to start)
- Add a persistent volume for data storage

## fly.toml configuration

```toml
app = "your-lnbits-instance"
primary_region = "iad"

[build]
  dockerfile = "Dockerfile"

[env]
  LNBITS_ADMIN_UI = "true"
  LNBITS_BACKEND_WALLET_CLASS = "LndRestWallet"
  PORT = "5000"

[http_service]
  internal_port = 5000
  force_https = true
  auto_stop_machines = false
  auto_start_machines = true

[[vm]]
  size = "shared-cpu-1x"
  memory = "512mb"

[mounts]
  source = "lnbits_data"
  destination = "/app/data"
```

## Set secrets

Store sensitive configuration as Fly.io secrets (not in fly.toml):

```bash
# LND REST backend example
fly secrets set LND_REST_ENDPOINT="https://your-node:8080"
fly secrets set LND_REST_CERT="base64-encoded-tls-cert"
fly secrets set LND_REST_MACAROON="hex-encoded-macaroon"
```

## Create persistent volume

LNbits needs persistent storage for its database and configuration:

```bash
fly volumes create lnbits_data --size 1 --region iad
```

## Deploy

```bash
fly deploy
```

Your instance will be available at `https://your-lnbits-instance.fly.dev`.

## Custom domain

```bash
fly certs add lnbits.yourdomain.com
```

Then add a CNAME record pointing `lnbits.yourdomain.com` to `your-lnbits-instance.fly.dev`.

## PostgreSQL (recommended for production)

```bash
# Create a Fly Postgres cluster
fly postgres create --name lnbits-db

# Attach it to your app
fly postgres attach lnbits-db

# The DATABASE_URL secret is set automatically
```

Then configure LNbits to use it:

```bash
fly secrets set LNBITS_DATABASE_URL="postgres://..."
```

## Scaling

```bash
# Scale memory
fly scale memory 1024

# Scale to multiple regions
fly scale count 1 --region iad
```

::: warning
LNbits is not designed for multi-instance horizontal scaling. Run a single instance per deployment unless you have a shared PostgreSQL database and understand the implications.
:::

## Monitoring

```bash
# View logs
fly logs

# Check status
fly status

# SSH into the VM
fly ssh console
```

## Updating

```bash
cd lnbits
git pull --rebase
fly deploy
```

After updating, use **Admin UI → Extensions → "Update All"** to update extensions.

## Related Pages

- [Installation Overview](/guide/installation/) — all installation methods
- [Docker](/guide/installation/docker) — container-based deployment
- [Reverse Proxy](/guide/installation/reverse-proxy) — HTTPS setup with Nginx or Caddy
- [PostgreSQL](/guide/installation/postgresql) — database configuration
