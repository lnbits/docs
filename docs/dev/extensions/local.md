# Local Filesystem Deployment

> Deploy extensions locally during development by dropping the extension folder into the LNbits extensions directory or using a custom path.

The simplest way to test an extension is to place it directly on the filesystem.

## Drop-in deployment

Place your extension folder in the `lnbits/extensions/` directory:

```
lnbits/
└── extensions/
    └── my_extension/
        ├── __init__.py
        ├── config.json
        ├── views.py
        ├── views_api.py
        ├── crud.py
        ├── models.py
        ├── migrations.py
        ├── templates/
        │   └── my_extension/
        │       └── index.html
        └── static/
            └── js/
                └── index.js
```

LNbits discovers the extension automatically on startup. No configuration is needed.

## Custom extension path

You can store extensions outside the LNbits source tree by setting:

```bash
LNBITS_EXTENSIONS_PATH=/path/to/my/extensions
```

LNbits will scan this directory for valid extension folders in addition to the default `lnbits/extensions/` directory. This is useful when:

- You want to keep extensions separate from the LNbits source for easier updates
- You're developing multiple extensions and want a shared workspace
- You're using Docker and want to mount extensions as a volume

### Docker example

```yaml
services:
  lnbits:
    image: lnbits/lnbits:latest
    volumes:
      - ./my-extensions:/app/custom-extensions
    environment:
      - LNBITS_EXTENSIONS_PATH=/app/custom-extensions
```

## Startup behavior

On startup, LNbits:

1. Scans the extensions directory for folders containing a valid `config.json`
2. Loads extension metadata (name, version, description)
3. Runs any pending database migrations
4. Registers API and UI routes
5. Makes the extension available in the admin panel

Extensions are loaded in alphabetical order. If an extension fails to load (e.g., missing config, migration error), LNbits logs the error and continues loading other extensions.

::: tip Hot reload in development
Run LNbits with `--reload` during development:

```bash
lnbits --reload
```

File changes in the extensions directory trigger an automatic restart.
:::

## Scaffolding a new extension

The fastest way to start a new extension:

1. Copy an existing simple extension (e.g., `decoder`) as a template
2. Rename the folder and update `config.json`
3. Clear out the specific logic and replace with yours
4. Run LNbits and verify the extension appears in the UI

```bash
# Quick scaffold
cp -r lnbits/extensions/decoder lnbits/extensions/my_extension
cd lnbits/extensions/my_extension

# Update the extension ID everywhere
# Edit config.json with your extension's details
# Replace the logic in views_api.py, crud.py, models.py
```

## Troubleshooting

| Symptom | Cause | Fix |
| --- | --- | --- |
| Extension doesn't appear | Missing or invalid `config.json` | Check JSON syntax and required fields |
| Migration errors on startup | SQL syntax issue | Test migrations on both SQLite and PostgreSQL |
| Static files 404 | Wrong path in `__init__.py` | Verify `static_files` path matches your directory structure |
| Template not found | Template path mismatch | Ensure template is at `templates/<ext_id>/index.html` |

## Related Pages

- [Building Extensions](/dev/building-extensions) — extension code structure and patterns
- [Deploying Extensions](/dev/extensions/) — all deployment methods
- [Remote Manifest](/dev/extensions/manifest) — publish for remote installation
- [Reference](/dev/extensions/reference) — environment variables and configuration
