# Install with uv

> Install LNbits from source using the uv package manager - the fastest installation method.

[uv](https://github.com/astral-sh/uv) is a fast Python package manager written in Rust. It's the quickest way to install LNbits from source.

## Prerequisites

- Python 3.10+
- [uv](https://docs.astral.sh/uv/getting-started/installation/)

```bash
# Install uv
curl -LsSf https://astral.sh/uv/install.sh | sh
```

## Install LNbits

```bash
# Clone the repository
git clone https://github.com/lnbits/lnbits.git
cd lnbits

# Create virtual environment and install
uv venv
source .venv/bin/activate
uv pip install .

# Copy config
cp .env.example .env
```

## Run

```bash
# Activate the venv (if not already active)
source .venv/bin/activate

# Start LNbits
lnbits
```

LNbits is now running at `http://localhost:5000`.

## Development mode

For development with auto-reload:

```bash
uv pip install -e ".[dev]"
lnbits --reload
```

## LNbits CLI

After installation, the `lnbits-cli` command is available for common operations:

```bash
# See all available commands
lnbits-cli --help

# Run database migrations
lnbits-cli migrate

# Create a superuser
lnbits-cli superuser
```

::: tip Want a one-command install?
The [install script](/guide/installation/install-script) handles everything automatically on Debian/Ubuntu.
:::

## Updating

```bash
cd lnbits
git pull --rebase
uv sync --all-extras
```

After updating, use **Admin UI → Extensions → "Update All"** to update extensions.

## Next steps

- [Configuration](/guide/core/environment) - customize your instance
- [Funding sources](/guide/wallets/) - connect a Lightning backend
- [Reverse proxy](/guide/installation/reverse-proxy) - set up HTTPS

## Related Pages

- [Installation Overview](/guide/installation/) - all installation methods
- [Install with Poetry](/guide/installation/poetry) - alternative source install
- [Updating LNbits](/guide/installation/updating) - keep LNbits up to date
