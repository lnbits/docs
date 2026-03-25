# Install Script

> One command to install LNbits on Debian/Ubuntu. The script handles system dependencies, cloning, virtual environment, and configuration.

## Requirements

- Debian or Ubuntu (tested on 22.04+)
- Root or sudo access

## Install

```bash
wget https://raw.githubusercontent.com/lnbits/lnbits/main/lnbits.sh && chmod +x lnbits.sh && ./lnbits.sh
```

The script will:

1. Install system dependencies (Python, build tools, etc.)
2. Clone the LNbits repository
3. Set up a virtual environment with uv
4. Configure the `.env` file
5. Start LNbits

After installation, use `./lnbits.sh` to run LNbits again, or for more control:

```bash
cd lnbits && uv run lnbits
```

## Updating

```bash
cd lnbits
git pull --rebase
uv sync --all-extras
```

After updating, use **Admin UI → Extensions → "Update All"** to update extensions.

## Next steps

- [First Setup](/guide/installation/first-setup) - configure Super User and wallet backend
- [Configuration](/guide/core/environment) - customize your instance
- [Funding sources](/guide/wallets/) - connect a Lightning backend
- [Reverse proxy](/guide/installation/reverse-proxy) - set up HTTPS
- [Process manager](/guide/installation/process-manager) - run LNbits as a service

## Related Pages

- [Installation Overview](/guide/installation/) - all installation methods
- [Install with uv](/guide/installation/uv) - manual uv setup
- [Install with Poetry](/guide/installation/poetry) - alternative source install
- [Updating LNbits](/guide/installation/updating) - keep LNbits up to date
