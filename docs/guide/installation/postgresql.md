# PostgreSQL

> Migrate LNbits from SQLite to PostgreSQL for production deployments.

LNbits uses SQLite by default, which works fine for small instances. For production use, migrate to PostgreSQL.

## Why PostgreSQL?

- Better concurrent performance
- Proper ACID compliance under load
- Required for high-traffic instances
- CockroachDB also supported for distributed setups

## Setup

### 1. Install PostgreSQL

```bash
# Ubuntu/Debian
sudo apt install postgresql postgresql-contrib

# macOS
brew install postgresql
```

### 2. Create database and user

```bash
sudo -u postgres psql

CREATE DATABASE lnbits;
CREATE USER lnbits WITH PASSWORD 'your-secure-password';
GRANT ALL PRIVILEGES ON DATABASE lnbits TO lnbits;
\q
```

### 3. Configure LNbits

In your `.env` file:

```bash
LNBITS_DATABASE_URL=postgres://lnbits:your-secure-password@localhost:5432/lnbits
```

### 4. Restart LNbits

LNbits auto-creates tables on startup. If migrating from SQLite, see the migration section below.

## Migrating from SQLite

::: warning
Back up your SQLite data before migrating.
:::

```bash
# Back up current data
cp -r ./data ./data-backup

# Set the new database URL in .env
# LNBITS_DATABASE_URL=postgres://...

# Restart LNbits — it creates the new schema
# Then use the admin API or built-in tools to migrate data
```

## CockroachDB

For distributed deployments:

```bash
LNBITS_DATABASE_URL=cockroachdb://user:pass@localhost:26257/lnbits
```

## Next steps

- [Configuration](/guide/core/environment) — all environment variables
- [Security](/guide/core/security) — harden your instance

## Related Pages

- [Docker](/guide/installation/docker) — container-based deployment
- [Database](/guide/core/database) — database configuration details
- [Environment Variables](/guide/core/environment) — configure LNbits settings
