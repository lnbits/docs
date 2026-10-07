# Developing Extensions

> Choose an extension type, build locally, and publish for other LNbits users.

Extensions add functionality to LNbits. There are two development paths: sandboxed WebAssembly (WASM) components and Python extensions running within the LNbits application.

## Choose an extension type

| | WASM extensions | Python extensions |
| --- | --- | --- |
| Backend | Compiled WebAssembly component | Python modules loaded by LNbits |
| Frontend | HTML and JavaScript in a sandboxed iframe | Templates using the LNbits frontend |
| Access | Explicit host APIs and permission policies | LNbits application code and dependencies |
| Storage | Declared tables through host storage APIs | Extension database and Python migrations |
| Best fit | Features that fit the permissioned host interfaces | Integrations requiring Python or application-level access |

**[WASM Extensions →](/dev/extensions/wasm/)** - start with a small component, then add storage, payments, and a frontend.

**[Python Extensions →](/dev/extensions/python/)** - use the existing Python build and deployment guides.

## Development workflow

1. **Build** a small extension and run it locally.
2. **Test** its behavior, permissions, payments, and failure handling.
3. **Deploy** an installable release through the appropriate manifest or registry.
4. **Activate** it on the instance and enable it for your account.

WASM and Python use different package structures, runtime interfaces, and local directories. Follow the deployment guide for your chosen type.

## Related Pages

- [Using Extensions](/guide/using-extensions): installation and account activation
- [Extensions Directory](/extensions/): browse by extension type
- [Build a WASM Extension](/dev/extensions/wasm/building)
- [Build a Python Extension](/dev/extensions/python/building)
