# Dependencies & Upgrades

> How extensions handle version compatibility, database migrations, upgrade mechanisms, and zero-downtime updates.

Extensions must handle upgrades gracefully — new versions need to migrate data, maintain compatibility, and ideally avoid downtime.

## Version compatibility

### Declaring compatibility

In your `config.json`:

```json
{
  "name": "My Extension",
  "min_lnbits_version": "1.0.0",
  "max_lnbits_version": "1.99.0"
}
```

- `min_lnbits_version` — the oldest LNbits version your extension works with
- `max_lnbits_version` — (optional) the newest version tested; omit to allow all future versions

LNbits checks these fields before installation. If the running LNbits version is outside the declared range, installation is blocked with a clear error message.

### Semantic versioning

Follow [semver](https://semver.org/) for your extension versions:

| Version bump | When to use | Migration needed? |
| --- | --- | --- |
| Patch (0.1.0 → 0.1.1) | Bug fixes, no schema changes | No |
| Minor (0.1.0 → 0.2.0) | New features, additive schema changes | Usually (new columns/tables) |
| Major (0.1.0 → 1.0.0) | Breaking changes | Yes |

## Database migrations

### Migration mechanism

LNbits runs migrations automatically on startup. Each migration function is named `m001_`, `m002_`, etc.:

```python
# migrations.py

async def m001_initial(db):
    """Create initial tables."""
    await db.execute("""
        CREATE TABLE IF NOT EXISTS my_extension.items (
            id TEXT PRIMARY KEY,
            wallet TEXT NOT NULL,
            name TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    """)

async def m002_add_description(db):
    """Add description column."""
    await db.execute("""
        ALTER TABLE my_extension.items
        ADD COLUMN description TEXT DEFAULT '';
    """)

async def m003_add_index(db):
    """Add index for wallet lookups."""
    await db.execute("""
        CREATE INDEX IF NOT EXISTS idx_items_wallet
        ON my_extension.items (wallet);
    """)
```

### Migration rules

1. **Never modify existing migrations** — only add new ones
2. **Make migrations idempotent** — use `IF NOT EXISTS`, `IF NOT EXISTS` for columns where possible
3. **Test on both SQLite and PostgreSQL** — SQL syntax differs between them
4. **Keep migrations small** — one logical change per migration
5. **Order matters** — migrations run in numerical order (m001, m002, m003...)

### Cross-database compatibility

SQLite and PostgreSQL have syntax differences. Handle them:

```python
async def m004_add_status(db):
    """Add status column with default."""
    # Works on both SQLite and PostgreSQL
    await db.execute("""
        ALTER TABLE my_extension.items
        ADD COLUMN status TEXT DEFAULT 'active';
    """)
```

For more complex cases, check the database type:

```python
async def m005_complex_migration(db):
    if db.type == "SQLITE":
        await db.execute("...")
    else:
        await db.execute("...")
```

## Upgrade mechanism

When a new version of an extension is installed:

1. Old extension code is replaced with new code
2. LNbits detects new migration functions
3. Pending migrations run in order
4. Extension restarts with new code and updated schema

### Zero-downtime considerations

For production instances:

- **Additive changes are safe** — new columns, new tables, new indexes
- **Destructive changes need care** — dropping columns, changing types, renaming tables
- **Data backups** — always recommend users back up before major upgrades

::: tip
Prefer additive migrations. Instead of renaming a column, add a new one and populate it. Remove the old column in a later version after all users have migrated.
:::

## Handling breaking changes

When your extension requires breaking changes:

1. **Deprecation notice** — warn users in the current version's release notes
2. **Migration path** — provide a migration that converts old data to the new format
3. **Version gate** — use `min_lnbits_version` to prevent installation on incompatible instances

```python
async def m010_migrate_to_v2(db):
    """Migrate data from v1 format to v2 format."""
    # Create new table
    await db.execute("""
        CREATE TABLE IF NOT EXISTS my_extension.items_v2 (
            id TEXT PRIMARY KEY,
            wallet TEXT NOT NULL,
            data JSONB NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
    """)
    # Migrate data
    await db.execute("""
        INSERT INTO my_extension.items_v2 (id, wallet, data, created_at)
        SELECT id, wallet, json_build_object('name', name, 'description', description), created_at
        FROM my_extension.items;
    """)
```

## Dependency on LNbits core

Extensions depend on LNbits core APIs. When LNbits core changes:

- **Stable APIs** (`lnbits.decorators`, `lnbits.db`, `lnbits.helpers`) — rarely change, safe to depend on
- **Internal APIs** — may change between versions; pin your `min_lnbits_version` accordingly
- **Database schema** — core tables may change; never access core tables directly

## Related Pages

- [Deploying Extensions](/dev/extensions/) — all deployment methods
- [Database & Migrations](/dev/database) — core database architecture
- [Building Extensions](/dev/building-extensions) — extension development guide
- [Reference](/dev/extensions/reference) — environment variables and API endpoints
