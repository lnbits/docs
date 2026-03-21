# Database & Migrations

> Database patterns, migration authoring, and schema conventions for LNbits development.

LNbits supports SQLite, PostgreSQL, and CockroachDB with a unified query interface.

## Database abstraction

The `Database` class in `lnbits/db.py` provides a consistent API across all backends:

```python
from lnbits.db import Database

db = Database("ext_my_extension")

# Fetch one row
row = await db.fetchone(
    "SELECT * FROM my_extension.items WHERE id = :id",
    {"id": item_id}
)

# Fetch all rows
rows = await db.fetchall(
    "SELECT * FROM my_extension.items WHERE wallet = :wallet",
    {"wallet": wallet_id}
)

# Execute (INSERT, UPDATE, DELETE)
await db.execute(
    "INSERT INTO my_extension.items (id, name) VALUES (:id, :name)",
    {"id": "abc", "name": "Test"}
)
```

::: tip
Always use **named parameters** (`:param`) instead of positional parameters (`?`). This ensures compatibility across all database backends.
:::

## Migrations

Migrations are Python async functions that create or modify database tables.

### Naming convention

```python
async def m001_initial(db):
    """Create initial tables."""
    ...

async def m002_add_column(db):
    """Add new column to items table."""
    ...

async def m003_create_index(db):
    """Add index for faster lookups."""
    ...
```

Migrations run in order (`m001`, `m002`, ...) and are tracked in the `dbversions` table so they only execute once.

### Creating tables

```python
async def m001_initial(db):
    await db.execute(
        """
        CREATE TABLE my_extension.items (
            id TEXT PRIMARY KEY,
            wallet TEXT NOT NULL,
            name TEXT NOT NULL,
            price INTEGER NOT NULL DEFAULT 0,
            description TEXT DEFAULT '',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
        """
    )
```

### Adding columns

```python
async def m002_add_active_flag(db):
    await db.execute(
        """
        ALTER TABLE my_extension.items
        ADD COLUMN active BOOLEAN DEFAULT true;
        """
    )
```

### Creating indexes

```python
async def m003_wallet_index(db):
    await db.execute(
        """
        CREATE INDEX idx_items_wallet
        ON my_extension.items (wallet);
        """
    )
```

## Cross-database considerations

### Data types

| Concept | SQLite | PostgreSQL |
| --- | --- | --- |
| Auto ID | `TEXT PRIMARY KEY` | `TEXT PRIMARY KEY` |
| Boolean | `BOOLEAN` (stored as 0/1) | `BOOLEAN` |
| Timestamp | `TIMESTAMP` | `TIMESTAMP` |
| JSON | `TEXT` | `JSONB` |
| Integer | `INTEGER` | `INTEGER` / `BIGINT` |

### Best practices

- Use `TEXT` for IDs (UUIDs/short hashes)
- Use named parameters (`:param`) everywhere
- Avoid database-specific SQL functions
- Test migrations against both SQLite and PostgreSQL
- Keep migrations small and focused - one change per migration
- Never modify a migration that has already been released

## Transactions

```python
async with db.connect() as conn:
    await conn.execute("INSERT INTO ...", {...})
    await conn.execute("UPDATE ...", {...})
    # Both execute in the same transaction
    # Rolls back on exception
```

## Schema namespacing

Extension tables are namespaced by the extension name:

```sql
-- Core tables
SELECT * FROM wallets;
SELECT * FROM apipayments;

-- Extension tables
SELECT * FROM my_extension.items;
SELECT * FROM lnurlp.pay_links;
```

This prevents naming collisions between extensions.

## Related Pages

- [Building Extensions](/dev/building-extensions.md)
- [Database Guide](/guide/core/database.md)
- [Models & Types](/dev/models.md)
