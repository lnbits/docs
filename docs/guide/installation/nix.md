# Install with Nix

> Build and run LNbits reproducibly using Nix flakes.

LNbits can be installed using [Nix](https://nixos.org/) for reproducible builds.

## Using nix develop

```bash
git clone https://github.com/lnbits/lnbits.git
cd lnbits

# Enter the development shell
nix develop

# Copy config
cp .env.example .env

# Run
lnbits
```

## NixOS module

If you're running NixOS, you can use a NixOS module to declaratively configure LNbits as a system service. Check the [LNbits GitHub](https://github.com/lnbits/lnbits) for the latest flake configuration.

## Updating

```bash
cd lnbits
git pull --rebase
nix build
```

For NixOS module users, update your flake input and rebuild:

```bash
nix flake update
sudo nixos-rebuild switch
```

After updating, use **Admin UI → Extensions → "Update All"** to update extensions.

## Next steps

- [Configuration](/guide/core/environment) - customize your instance
- [Funding sources](/guide/wallets/) - connect a Lightning backend

## Related Pages

- [Installation Overview](/guide/installation/) - all installation methods
- [Docker](/guide/installation/docker) - container-based deployment
- [Updating LNbits](/guide/installation/updating) - keep LNbits up to date
