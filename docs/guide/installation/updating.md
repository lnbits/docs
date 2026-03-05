# Updating LNbits

> Quick reference for updating LNbits across all installation methods.

::: warning
Always back up your data directory and `.env` before updating. Database migrations run automatically on startup but cannot be reversed.
:::

## Docker

```bash
cd lnbits
docker compose pull
docker compose up -d
```

## uv

```bash
cd lnbits
git pull --rebase
uv sync --all-extras
```

## Poetry

```bash
cd lnbits
git pull --rebase
poetry install --only main
```

## pip

```bash
pip install --upgrade lnbits
```

## Nix

```bash
cd lnbits
git pull --rebase
nix build
# or re-enter the dev shell:
nix develop
```

For NixOS module users, update your flake input and rebuild:

```bash
nix flake update
sudo nixos-rebuild switch
```

## AppImage / Desktop

Download the latest version from [GitHub Releases](https://github.com/lnbits/lnbits/releases) and replace the old binary. Your data in `data/` is preserved.

## Fly.io

```bash
cd lnbits
git pull --rebase
fly deploy
```

## Node platforms

Updates are handled through the platform's UI:

- **Umbrel** — App Store → LNbits → Update
- **RaspiBlitz** — Services menu → LNbits → Update
- **Start9** — Marketplace → LNbits → Update
- **Citadel** — App Store → LNbits → Update
- **myNode** — Dashboard → Applications → LNbits → Update

## After updating

Use **Admin UI → Extensions → "Update All"** to bring extensions up to the latest compatible versions.

## Next steps

- [Changelog](/changelog) — see what changed

## Related Pages

- [Installation Overview](/guide/installation/) — all installation methods
- [Docker](/guide/installation/docker) — container-based deployment
- [Install with uv](/guide/installation/uv) — source-based installation
