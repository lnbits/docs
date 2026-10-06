<HeroImage type="extensions" />

# Extensions

> Find an extension, install it, and add functionality to your LNbits account.

Browse by extension type, then filter by category or search for a feature.

## Browse extensions

**[Browse WASM extensions →](/extensions/wasm/)**

Sandboxed extensions with a permissioned backend and an isolated frontend.

**[Browse Python extensions →](/extensions/python/)**

Extensions that run within the LNbits application and integrate with its Python backend.

## What is the difference?

| | WASM extensions | Python extensions |
| --- | --- | --- |
| Runtime | Sandboxed WebAssembly component | Python code within LNbits |
| Access | Host interfaces with explicit permissions | Application-level access; install from sources you trust |
| Frontend | Sandboxed iframe | LNbits templates and frontend |
| Compatibility | Requires the matching WASM runtime | Depends on the extension's supported LNbits versions |

Both types can add payment tools, games, or other features. The type describes how an extension runs; the category describes what it does.

## Getting started

Follow [Using Extensions](/guide/using-extensions) to install and enable an extension. Availability depends on your server's version, configured manifests, and administrator settings.

Want to create an extension? Start with [Developing Extensions](/dev/extensions/).

## Related Pages

- [Using Extensions](/guide/using-extensions): install and enable an extension
- [Developing Extensions](/dev/extensions/): choose a development path
