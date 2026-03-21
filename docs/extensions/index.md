# Extensions

> Browse LNbits extensions - filterable by category. Each extension adds its own API endpoints, database tables, and UI on top of LNbits core. The LNbits ecosystem has 60+ extensions available through the official registry and community manifests.

<ExtensionGrid />

## Installing third-party extensions

LNbits supports installing extensions from external manifests:

```bash
LNBITS_EXTENSIONS_MANIFESTS=https://raw.githubusercontent.com/lnbits/lnbits-extensions/main/extensions.json
```

Third-party extensions appear alongside built-in ones in the extensions manager.

::: tip
Want to build an extension? See the [Building Extensions](/dev/building-extensions) guide.
:::

## Related Pages

- [Building Extensions](/dev/building-extensions): Create your own LNbits extension
- [Using Extensions](/guide/using-extensions): Install and manage extensions in LNbits
- [API Overview](/api/): LNbits REST API conventions and authentication
