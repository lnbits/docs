# Deploy and publish WASM extensions

> Package a compiled component, test it on an LNbits instance, and distribute a compatible release.

WASM extensions use a separate local directory and registry from Python extensions. These instructions target LNbits 1.6.2's core runtime.

## Local development

The default location is `<LNBITS_DATA_FOLDER>/wasm_extensions/<extension-id>/`, normally `data/wasm_extensions/`. To use another directory:

```bash
LNBITS_WASM_EXTENSIONS_PATH=/path/to/wasm_extensions
```

Keep this directory outside Python extension import directories. The runtime validates that the package ID matches the installed folder, paths stay within the package, and the component file exists.

Rebuild after backend changes, copy the compiled output, and restart the development instance. For changes to permissions, routes, or storage migrations, update/reinstall the package through extension management so installed metadata is refreshed too.

## Package a release

A runtime package contains:

```text
hello_wasm/
├── config.json
├── wasm/module.wasm
├── wasm/hello.wit
├── ui/index.html
├── static/
└── storage/             # Schema and migrations, if used
```

Include every file referenced by the config. The WIT file is needed when declared as `wasm.wit`; source files and build tools can live in your repository without shipping `node_modules` to users.

From the directory containing the staged `hello_wasm` runtime folder:

```bash
zip -r hello_wasm-0.1.0.zip hello_wasm
shasum -a 256 hello_wasm-0.1.0.zip
```

Publish the ZIP as a versioned release. Set `version` and `min_lnbits_version` in `config.json`, and add `max_lnbits_version` only when there is a known compatibility ceiling. Test the actual archive on a fresh development instance, not just the source folder.

## WASM manifests

Administrators configure WASM sources separately:

```bash
LNBITS_WASM_EXTENSIONS_MANIFESTS='["https://example.com/wasm-extensions.json"]'
```

The default source is the [official WASM registry](https://github.com/lnbits/lnbits-extensions-wasm). An explicit release entry follows this structure:

```json
{
  "extensions": [{
    "id": "hello_wasm",
    "name": "Hello WASM",
    "short_description": "A small greeting extension.",
    "repo": "https://github.com/your-name/hello_wasm",
    "version": "0.1.0",
    "min_lnbits_version": "1.6.2",
    "extension_type": "wasm",
    "archive": "https://example.com/releases/hello_wasm-0.1.0.zip",
    "hash": "REPLACE_WITH_THE_ARCHIVE_SHA256"
  }]
}
```

Replace the example URLs and hash with your release values. Do not put a WASM release only in `LNBITS_EXTENSIONS_MANIFESTS`, which describes Python sources.

## Submit to the registry

1. Build a versioned, reproducible release and document its setup and permissions.
2. Test installation, activation, upgrades, and payment failure cases.
3. Submit a pull request to [lnbits/lnbits-extensions-wasm](https://github.com/lnbits/lnbits-extensions-wasm) using that repository's current contribution instructions.
4. Include the release URL, archive hash, version requirements, and a short explanation of the feature.

Sandboxing does not waive registry submission or quality requirements. Follow the registry's current review process; do not assume an extension will be accepted automatically.

## Publish updates

Create a new version and archive, update its registry entry and hash, and test the upgrade from the previous release. Preserve data compatibility, append storage migrations, and explain any new permissions. Recheck compatibility before raising a minimum version.

Paid distribution depends on the registry and marketplace's supported release format. Use their current instructions rather than assuming Python monetization settings work unchanged for WASM.

## Related Pages

- [Build your first extension](./building)
- [Permissions and payments](./permissions#test-payment-permissions)
- [Reference](./reference)
- [Python Deployment](/dev/extensions/python/): the separate Python distribution path
