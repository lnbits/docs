# Extension Reference

> Quick reference for environment variables, API endpoints, database tables, and source files related to LNbits extension deployment.

## Environment variables

| Variable | Description | Default |
| --- | --- | --- |
| `LNBITS_EXTENSIONS_PATH` | Custom directory for local extensions | `lnbits/extensions/` |
| `LNBITS_EXTENSIONS_MANIFESTS` | JSON array of manifest URLs | Official registry |
| `LNBITS_EXTENSIONS_DEFAULT_INSTALL` | Comma-separated list of extensions to auto-install | `""` |
| `LNBITS_USER_DEFAULT_EXTENSIONS` | Extensions enabled by default for new users | `""` |
| `LNBITS_ADMIN_EXTENSIONS` | Extensions only admins can manage | `""` |
| `LNBITS_DISABLED_EXTENSIONS` | Extensions that cannot be activated | `""` |

## API endpoints

### Extension management

| Method | Endpoint | Description | Auth |
| --- | --- | --- | --- |
| `GET` | `/api/v1/extension` | List available extensions | Invoice key |
| `POST` | `/api/v1/extension` | Install an extension | Admin key |
| `PUT` | `/api/v1/extension/{ext_id}` | Enable/disable an extension | Admin key |
| `DELETE` | `/api/v1/extension/{ext_id}` | Uninstall an extension | Admin key |

### Admin extension management

| Method | Endpoint | Description | Auth |
| --- | --- | --- | --- |
| `GET` | `/admin/api/v1/extensions` | List all extensions (admin view) | Super user |
| `POST` | `/admin/api/v1/extensions` | Manage extension availability | Super user |
| `GET` | `/admin/api/v1/extensions/releases` | Get available releases | Super user |

### Example requests

```bash
# List available extensions
curl https://your-lnbits.com/api/v1/extension \
  -H "X-Api-Key: YOUR_INVOICE_KEY"

# Install an extension
curl -X POST https://your-lnbits.com/api/v1/extension \
  -H "X-Api-Key: YOUR_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{"ext_id": "tpos", "source_repo": "official"}'

# Enable an extension
curl -X PUT https://your-lnbits.com/api/v1/extension/tpos \
  -H "X-Api-Key: YOUR_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{"active": true}'

# Uninstall an extension
curl -X DELETE https://your-lnbits.com/api/v1/extension/tpos \
  -H "X-Api-Key: YOUR_ADMIN_KEY"
```

## Database tables

### Core extension tables

| Table | Description |
| --- | --- |
| `extensions` | Installed extensions and their metadata |
| `extension_releases` | Cached release information from manifests |

### Extension namespace

Each extension creates tables under its own namespace:

```sql
-- Extension tables follow the pattern:
ext_<extension_id>.<table_name>

-- Examples:
ext_tpos.pos          -- TPoS terminals
ext_lnurlp.pay_links -- LNURLp pay links
ext_boltz.swaps       -- Boltz submarine swaps
```

## SQLite to PostgreSQL migration

When migrating from SQLite to PostgreSQL:

1. Extension data is migrated automatically by LNbits' migration tools
2. Schema namespaces are preserved
3. Data types are mapped (e.g., SQLite `TEXT` → PostgreSQL `TEXT`)
4. Indexes are recreated

```bash
# LNbits provides a migration command
lnbits-cli migrate --from sqlite --to postgres
```

::: warning
Always back up your SQLite database before migrating. Test the migration on a copy first.
:::

## Key source files

| File | Purpose |
| --- | --- |
| `lnbits/extensions/` | Default extensions directory |
| `lnbits/core/crud/extensions.py` | Extension CRUD operations |
| `lnbits/core/views/extension_api.py` | Extension API endpoints |
| `lnbits/core/models/extensions.py` | Extension data models |
| `lnbits/settings.py` | Extension-related settings |

## Manifest JSON schema

```json
{
  "extensions": [
    {
      "id": "string (required)",
      "name": "string (required)",
      "version": "string (required, semver)",
      "short_description": "string (required)",
      "archive": "string (required, URL to zip)",
      "hash": "string (required, SHA256)",
      "icon": "string (optional, Quasar icon name)",
      "contributors": ["string (optional)"],
      "min_lnbits_version": "string (optional, semver)",
      "max_lnbits_version": "string (optional, semver)",
      "payment_hash": "string (optional)",
      "pay_to_install": {
        "amount": "number (sats)",
        "description": "string",
        "wallet": "string (URL)",
        "wallet_id": "string"
      },
      "pay_to_enable": {
        "amount": "number (sats)",
        "description": "string",
        "wallet": "string (URL)",
        "wallet_id": "string"
      }
    }
  ],
  "repos": [
    {
      "id": "string (required)",
      "organisation": "string (required)",
      "repository": "string (required)"
    }
  ]
}
```

## Related Pages

- [Deploying Extensions](/dev/extensions/) — overview and deployment methods
- [Building Extensions](/dev/building-extensions) — extension development guide
- [Database & Migrations](/dev/database) — core database architecture
- [Admin API — Extensions](/api/admin/extensions) — admin extension endpoints
