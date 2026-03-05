# Remote Manifest

> Distribute extensions via a JSON manifest file that LNbits instances can fetch to discover and install extensions remotely.

A remote manifest is a JSON file hosted on a web server that tells LNbits where to download extensions. This is the standard way to distribute extensions outside the official registry.

## Manifest format

```json
{
  "extensions": [
    {
      "id": "my_extension",
      "name": "My Extension",
      "version": "0.1.0",
      "short_description": "Does something useful",
      "icon": "extension",
      "contributors": ["your-username"],
      "min_lnbits_version": "1.0.0",
      "archive": "https://github.com/you/my-extension/releases/download/v0.1.0/my_extension-0.1.0.zip",
      "hash": "sha256-hash-of-the-archive",
      "payment_hash": ""
    }
  ],
  "repos": []
}
```

## Two discovery modes

Manifests support two ways of listing extensions:

### 1. Explicit release mode

List each extension version directly in the `extensions` array. You control exactly which versions are available:

```json
{
  "extensions": [
    {
      "id": "my_extension",
      "name": "My Extension",
      "version": "0.2.0",
      "archive": "https://example.com/releases/my_extension-0.2.0.zip",
      "hash": "abc123..."
    },
    {
      "id": "my_extension",
      "name": "My Extension",
      "version": "0.1.0",
      "archive": "https://example.com/releases/my_extension-0.1.0.zip",
      "hash": "def456..."
    }
  ]
}
```

### 2. GitHub repository mode

Point to a GitHub repository and LNbits will automatically discover releases:

```json
{
  "repos": [
    {
      "id": "my_extension",
      "organisation": "your-username",
      "repository": "my-extension"
    }
  ]
}
```

LNbits fetches release information from the GitHub API and presents all tagged releases as installable versions. The release assets must include a zip archive of the extension.

## Manifest fields

### Extension fields (explicit mode)

| Field | Required | Description |
| --- | --- | --- |
| `id` | Yes | Extension identifier (must match the folder name) |
| `name` | Yes | Display name |
| `version` | Yes | Semantic version string |
| `short_description` | Yes | One-line description |
| `archive` | Yes | URL to the zip archive |
| `hash` | Yes | SHA256 hash of the archive for integrity verification |
| `icon` | No | Quasar icon name |
| `contributors` | No | List of GitHub usernames |
| `min_lnbits_version` | No | Minimum compatible LNbits version |
| `max_lnbits_version` | No | Maximum compatible LNbits version |
| `payment_hash` | No | Payment hash for [paid extensions](/dev/extensions/monetization) |

### Repository fields (GitHub mode)

| Field | Required | Description |
| --- | --- | --- |
| `id` | Yes | Extension identifier |
| `organisation` | Yes | GitHub organization or username |
| `repository` | Yes | GitHub repository name |

## Archive requirements

The zip archive must:

1. Contain a single top-level directory named with the extension ID
2. Include a valid `config.json` at the root of that directory
3. Include all required files (`__init__.py`, migrations, templates, etc.)

```
my_extension-0.1.0.zip
└── my_extension/
    ├── __init__.py
    ├── config.json
    ├── views.py
    ├── views_api.py
    ├── ...
```

## Hash verification

LNbits verifies the SHA256 hash of downloaded archives before installation. Generate the hash:

```bash
sha256sum my_extension-0.1.0.zip
# Output: abc123def456...  my_extension-0.1.0.zip
```

If the hash doesn't match, installation is rejected. This prevents tampered archives from being installed.

## Installation flow

When a user installs an extension from a manifest:

1. LNbits fetches the manifest JSON
2. User selects the extension and version
3. LNbits downloads the zip archive
4. Hash is verified against the manifest
5. Archive is extracted to the extensions directory
6. Database migrations run
7. Extension routes are registered
8. Extension appears in the admin panel for activation

## Caching

LNbits caches manifest data to reduce network requests. The cache is refreshed:

- When an admin manually refreshes the extensions list
- On LNbits restart
- Periodically (configurable interval)

## Adding a manifest to LNbits

### Via environment variable

```bash
LNBITS_EXTENSIONS_MANIFESTS='["https://example.com/manifest.json"]'
```

### Via Admin UI

1. Go to **Admin** → **Server** → **Extension Sources**
2. Add your manifest URL
3. Click **Save**

After adding, the extensions from your manifest appear alongside official extensions in the install UI.

## Hosting tips

- Host manifests on GitHub Pages, Netlify, or any static host with HTTPS
- Use a CDN for archive downloads to ensure availability
- Pin archive URLs to specific versions (don't overwrite URLs)
- Update the manifest file when you publish new versions

## Related Pages

- [Deploying Extensions](/dev/extensions/) — all deployment methods
- [Official Registry](/dev/extensions/registry) — get listed on the official marketplace
- [Custom Marketplace](/dev/extensions/custom-list) — build your own extension marketplace
- [Monetization](/dev/extensions/monetization) — charge for extension access
