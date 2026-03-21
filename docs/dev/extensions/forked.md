# Forked Distribution

> Bundle extensions directly into a custom LNbits build for white-label, enterprise, and offline deployments.

For maximum control, you can fork LNbits and bundle extensions directly into the codebase. This eliminates the need for remote manifests and ensures your extensions are always available.

## When to use forked distribution

| Scenario | Why fork |
| --- | --- |
| White-label product | Bundle your custom extensions with branding |
| Enterprise deployment | Air-gapped or restricted network environments |
| Embedded appliance | Pre-configured hardware running LNbits |
| Managed hosting | Consistent extension set across all customer instances |

## Bundled extensions

Place extensions directly in the LNbits source tree:

```
lnbits/
└── extensions/
    ├── tpos/           # Standard extension
    ├── lnurlp/         # Standard extension
    └── my_custom/      # Your bundled extension
```

Bundled extensions:
- Load automatically on startup - no installation step needed
- Cannot be uninstalled through the UI (they're part of the codebase)
- Are always available to all users
- Update when you update your fork

## Building a custom fork

```bash
# Fork and clone
git clone https://github.com/your-org/lnbits.git
cd lnbits

# Add your extensions
cp -r /path/to/my_extension lnbits/extensions/my_extension

# Build a Docker image
docker build -t your-org/lnbits:custom .
```

## Fetched extensions alongside bundled

You can combine bundled and fetched extensions:

```bash
# Bundled extensions are in the source tree
# Remote extensions come from manifests
LNBITS_EXTENSIONS_MANIFESTS='["https://your-company.com/manifest.json"]'
```

Bundled extensions always take precedence. If a remote manifest lists an extension with the same ID as a bundled one, the bundled version is used.

## Keeping your fork updated

```bash
# Add upstream remote
git remote add upstream https://github.com/lnbits/lnbits.git

# Fetch and merge updates
git fetch upstream
git merge upstream/main

# Resolve any conflicts in the extensions directory
# Rebuild and deploy
```

::: warning
When merging upstream changes, watch for conflicts in the `lnbits/extensions/` directory. Your custom extensions should have unique IDs that don't collide with new upstream extensions.
:::

## Enterprise considerations

For enterprise deployments:

- **Version pinning** - tag your fork at specific commits for reproducible builds
- **CI/CD** - automate builds and testing of your custom fork
- **Extension testing** - run `make test` to verify extensions work with the current LNbits version
- **Compliance** - bundled extensions are auditable as part of your codebase
- **Rollback** - git tags make it easy to roll back to a previous version

## Docker distribution

```dockerfile
FROM lnbits/lnbits:latest

# Add custom extensions
COPY my_extensions/ /app/lnbits/extensions/

# Add custom branding
COPY branding/ /app/lnbits/static/custom/
```

```bash
docker build -t your-org/lnbits:v1.0 .
docker push your-org/lnbits:v1.0
```

## Related Pages

- [Deploying Extensions](/dev/extensions/) - all deployment methods
- [Custom Marketplace](/dev/extensions/custom-list) - curate extensions via manifests
- [Auto-install](/dev/extensions/auto-install) - auto-install without forking
- [Reference](/dev/extensions/reference) - environment variables and configuration
