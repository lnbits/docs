# Install with Poetry

> Install LNbits from source using Poetry for Python dependency management.

[Poetry](https://python-poetry.org/) is the traditional Python dependency manager used by LNbits.

## Prerequisites

- Python 3.10+
- [Poetry](https://python-poetry.org/docs/#installation)
- Git

## Install

```bash
git clone https://github.com/lnbits/lnbits.git
cd lnbits

# Install dependencies
poetry install

# Copy config
cp .env.example .env
```

## Run

```bash
poetry run lnbits
```

LNbits is now running at `http://localhost:5000`.

## Development mode

```bash
poetry run lnbits --reload
```

## Using pip instead

If you prefer pip over Poetry:

```bash
pip install lnbits
lnbits
```

## Updating

```bash
cd lnbits
git pull --rebase
poetry install --only main
```

If you installed with pip:

```bash
pip install --upgrade lnbits
```

After updating, use **Admin UI → Extensions → "Update All"** to update extensions.

## Next steps

- [Configuration](/guide/core/environment) — customize your instance
- [Funding sources](/guide/wallets/) — connect a Lightning backend
- [Reverse proxy](/guide/installation/reverse-proxy) — set up HTTPS

## Related Pages

- [Installation Overview](/guide/installation/) — all installation methods
- [Install with uv](/guide/installation/uv) — faster alternative source install
- [Updating LNbits](/guide/installation/updating) — keep LNbits up to date
