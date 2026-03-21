# Database

> Configure and manage LNbits databases - SQLite for development, PostgreSQL for production.

LNbits supports SQLite (default) and PostgreSQL for data storage.

## SQLite

The default database. Data is stored in the `data/` directory.

```bash
LNBITS_DATA_FOLDER=./data
```

Good for small instances and development. Not recommended for production with multiple concurrent users.

## PostgreSQL

Recommended for production. See the [PostgreSQL installation guide](/guide/installation/postgresql) for setup instructions.

```bash
LNBITS_DATABASE_URL=postgres://user:pass@localhost:5432/lnbits
```

## Migrations

LNbits runs database migrations automatically on startup. Each extension manages its own migrations.

## Backups

### SQLite

```bash
cp -r ./data ./data-backup-$(date +%Y%m%d)
```

### PostgreSQL

```bash
pg_dump -U lnbits lnbits > lnbits-backup-$(date +%Y%m%d).sql
```

::: tip
Always back up before updating LNbits. Migrations cannot be reversed.
:::

## Related Pages

- [PostgreSQL Installation](/guide/installation/postgresql.md)
- [Configuration](/guide/core/environment.md)
- [Database (Developer Guide)](/dev/database.md)
