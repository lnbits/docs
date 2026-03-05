# Deploying Extensions

> Overview of how LNbits extensions are packaged, distributed, and installed — from local development to the official registry.

LNbits extensions can be deployed in several ways depending on your use case — from dropping a folder on disk during development to publishing on the official registry for the community.

## Quick start

1. Build your extension following the [extension structure](/dev/building-extensions#extension-structure)
2. Test locally by [dropping it into the extensions folder](/dev/extensions/local)
3. Publish to a [remote manifest](/dev/extensions/manifest) or the [official registry](/dev/extensions/registry)

## Extension lifecycle

Every extension goes through three stages:

```
Build → Deploy → Activate
```

- **Build** — write the code, config.json, migrations, and templates ([Building Extensions](/dev/building-extensions))
- **Deploy** — make the extension available to an LNbits instance (this section)
- **Activate** — users enable the extension in their dashboard

## config.json

Every extension must include a `config.json` at its root:

```json
{
  "name": "My Extension",
  "short_description": "A brief description of what it does",
  "tile": "/my_extension/static/image/tile.png",
  "contributors": ["your-github-username"],
  "min_lnbits_version": "1.0.0",
  "payment_hash": ""
}
```

### Required fields

| Field | Description |
| --- | --- |
| `name` | Display name shown in the UI |
| `short_description` | One-line description shown on the extension tile |
| `tile` | Path to the tile image (PNG, displayed in the extensions list) |
| `contributors` | List of GitHub usernames |
| `min_lnbits_version` | Minimum LNbits version required to run this extension |

### Optional fields

| Field | Description |
| --- | --- |
| `payment_hash` | For paid extensions — the Lightning payment hash required for installation |
| `max_lnbits_version` | Maximum compatible LNbits version |
| `icon` | Icon name from the Quasar icon set |

## Hard rules

::: danger Extension rules
1. **No new Python dependencies** — use only packages already in LNbits' `pyproject.toml`
2. **Database namespace** — all tables must be prefixed with `ext_<extension_id>.` (e.g., `ext_my_extension.items`)
3. **No core modifications** — extensions must not modify LNbits core files
4. **Migrations must be idempotent** — they should be safe to run multiple times
:::

## Three-state activation

Extensions have three states at the instance level:

| State | Meaning |
| --- | --- |
| **Not installed** | Extension code is not present on the instance |
| **Installed (disabled)** | Code is present, but the extension is not active for any user |
| **Installed (enabled)** | Extension is active and available — individual users can toggle it on/off in their dashboard |

Admins control the first two states. Users control whether an enabled extension appears in their own dashboard.

## Database namespace

Each extension gets its own database schema/namespace:

```python
# In your __init__.py
db = Database("ext_my_extension")
```

All tables are created under the `ext_my_extension` schema. This ensures:

- No table name collisions with core or other extensions
- Clean uninstall — the namespace can be dropped entirely
- Clear ownership — you always know which extension owns which data

::: info Data preservation
Uninstalling an extension does **not** remove its database tables. User data is preserved so it can be restored if the extension is reinstalled.
:::

## Deployment methods

| Method | Best for | Details |
| --- | --- | --- |
| [Local filesystem](/dev/extensions/local) | Development and testing | Drop the folder into `lnbits/extensions/` |
| [Remote manifest](/dev/extensions/manifest) | Distribution to specific instances | Host a JSON manifest with download URLs |
| [Official registry](/dev/extensions/registry) | Public distribution | Submit to the LNbits extension registry |
| [Custom marketplace](/dev/extensions/custom-list) | Enterprise / white-label | Replace or extend the default manifest list |
| [Auto-install](/dev/extensions/auto-install) | Automated deployments | Pre-configure extensions via environment variables |
| [Forked distribution](/dev/extensions/forked) | Branded / bundled deploys | Bundle extensions directly into a custom LNbits build |

## Related Pages

- [Building Extensions](/dev/building-extensions) — code structure, API patterns, and frontend templates
- [Local Deployment](/dev/extensions/local) — test extensions during development
- [Remote Manifest](/dev/extensions/manifest) — distribute via manifest files
- [Official Registry](/dev/extensions/registry) — publish to the community
- [Monetization](/dev/extensions/monetization) — charge for extensions
- [Reference](/dev/extensions/reference) — environment variables, API endpoints, and DB tables
