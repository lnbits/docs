# AppImage / Desktop

> Run LNbits as a desktop application on Linux, macOS, or Windows.

LNbits provides packaged desktop applications for running locally without a server.

## Downloads

Download from the [GitHub Releases](https://github.com/lnbits/lnbits/releases) page:

- **Linux** — `.AppImage`
- **macOS** — `.dmg`
- **Windows** — `.exe`

## Linux AppImage

```bash
# Make executable
chmod +x LNbits-*.AppImage

# Run
./LNbits-*.AppImage
```

LNbits opens at `http://localhost:5000`.

## macOS

1. Open the `.dmg` file
2. Drag LNbits to Applications
3. Open LNbits from Applications

## Windows

Run the `.exe` installer and follow the prompts.

## Updating

Download the latest version from [GitHub Releases](https://github.com/lnbits/lnbits/releases) and replace the old binary. Your data in `data/` is preserved.

## Next steps

- [Configuration](/guide/core/environment) — customize your instance
- [Funding sources](/guide/wallets/) — connect a Lightning backend

## Related Pages

- [Installation Overview](/guide/installation/) — all installation methods
- [Updating LNbits](/guide/installation/updating) — keep LNbits up to date
