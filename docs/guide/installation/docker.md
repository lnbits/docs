# Docker

> Install LNbits with Docker Compose - the recommended method for production deployments.

Run LNbits with Docker for easy deployment and updates.

## Quick start

```bash
git clone https://github.com/lnbits/lnbits.git
cd lnbits
cp .env.example .env
docker compose up -d
```

## Docker images

| Image | Tag | Description |
| --- | --- | --- |
| `lnbits/lnbits` | `latest` | Latest stable release |
| `lnbits/lnbits` | `main` | Latest commit on main branch |
| `lnbits/lnbits-sparkl2` | `latest` | With SparkL2 support |

## Docker Compose

### Basic setup

```yaml
version: "3.7"
services:
  lnbits:
    image: lnbits/lnbits:latest
    restart: unless-stopped
    ports:
      - "5000:5000"
    volumes:
      - ./data:/app/data
      - ./.env:/app/.env
    environment:
      - HOST=0.0.0.0
      - PORT=5000
```

### With PostgreSQL

```yaml
version: "3.7"
services:
  lnbits:
    image: lnbits/lnbits:latest
    restart: unless-stopped
    ports:
      - "5000:5000"
    volumes:
      - ./.env:/app/.env
    environment:
      - HOST=0.0.0.0
      - PORT=5000
      - LNBITS_DATABASE_URL=postgres://lnbits:secret@db:5432/lnbits
    depends_on:
      - db

  db:
    image: postgres:15
    restart: unless-stopped
    volumes:
      - pgdata:/var/lib/postgresql/data
    environment:
      - POSTGRES_USER=lnbits
      - POSTGRES_PASSWORD=secret
      - POSTGRES_DB=lnbits

volumes:
  pgdata:
```

## Data persistence

Mount the `data` volume to persist:
- SQLite database (if not using PostgreSQL)
- Extension data
- Uploaded files

```yaml
volumes:
  - ./data:/app/data
```

## Updating

```bash
docker compose pull
docker compose up -d
```

## Logs

```bash
# Follow logs
docker compose logs -f lnbits

# Last 100 lines
docker compose logs --tail 100 lnbits
```

## Connecting to LND

If LND runs on the host or in another container, mount the credentials:

```yaml
services:
  lnbits:
    volumes:
      - /path/to/lnd/tls.cert:/app/lnd/tls.cert:ro
      - /path/to/lnd/admin.macaroon:/app/lnd/admin.macaroon:ro
    environment:
      - LNBITS_BACKEND_WALLET_CLASS=LndRestWallet
      - LND_REST_ENDPOINT=https://host.docker.internal:8080
      - LND_REST_CERT=/app/lnd/tls.cert
      - LND_REST_MACAROON_PATH=/app/lnd/admin.macaroon
```

::: tip
Use `host.docker.internal` to reach services running on the Docker host from inside a container.
:::

## Related Pages

- [Installation Overview](/guide/installation/) - all installation methods
- [Reverse Proxy](/guide/installation/reverse-proxy) - set up HTTPS with Nginx or Caddy
- [PostgreSQL](/guide/installation/postgresql) - migrate to PostgreSQL for production
- [Environment Variables](/guide/core/environment) - configure LNbits settings
