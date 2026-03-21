# Contributing

> How to contribute to LNbits core and extensions - setup, standards, dependency rules, and PR process.

## Getting started

```bash
# Fork and clone
git clone https://github.com/your-username/lnbits.git
cd lnbits

# Install dependencies (uv preferred, Poetry also supported)
uv venv && source .venv/bin/activate && uv pip install -e ".[dev]"
# or: poetry install

# Set up for development
cp .env.example .env

# Use FakeWallet for development
echo "LNBITS_BACKEND_WALLET_CLASS=FakeWallet" >> .env

# Run in debug mode
DEBUG=true lnbits
# or: poetry run lnbits
```

### Debian/Ubuntu dependencies

If building from source on Debian/Ubuntu, install system dependencies first:

```bash
sudo apt install python3-dev libpq-dev build-essential
```

### Quick start with Make

```bash
# One-command dev setup (installs, configures, and starts)
make dev
```

### Pre-commit hooks

Set up pre-commit hooks to catch issues before committing:

```bash
# Install pre-commit hooks
pre-commit install

# Run hooks manually on all files
pre-commit run --all-files
```

### LNbits CLI

LNbits includes a CLI tool for common operations:

```bash
# See available commands
lnbits-cli --help

# Run database migrations
lnbits-cli migrate

# Create a superuser
lnbits-cli superuser
```

## Development workflow

1. Create a branch from `dev` (not `main`)
2. Make your changes
3. Run tests: `make test`
4. Run linting: `make format` and `make lint`
5. Open a PR against the `dev` branch

## Code style

- **Python:** Follow PEP 8, use type hints
- **Formatting:** Ruff (configured in `pyproject.toml`)
- **Async:** Use `async/await` throughout - no blocking I/O
- **Naming:** snake_case for functions/variables, PascalCase for classes
- **Models:** Use Pydantic `BaseModel` for all request/response types

## Adding new dependencies

::: danger DO NOT ADD NEW DEPENDENCIES
Try to use the packages already available in `pyproject.toml`. Getting the LNbits project to accept a new dependency is time-consuming and uncertain, and **may result in your extension NOT being made available to others**.
:::

If your extension absolutely requires a new Python package whose needs are not met by what's in `pyproject.toml`, you can add it with `poetry` or `uv` - but there are extra steps to ensure LNbits doesn't break in production.

### Process for adding a dependency

1. **Check `pyproject.toml` first** - search for an existing package that covers your need
2. **Open an issue** on GitHub explaining why the dependency is necessary and what alternatives you evaluated
3. **Add the dependency** to `pyproject.toml`:

```bash
# With Poetry
poetry add package-name

# With uv
uv pip install package-name
# then manually add to pyproject.toml
```

4. **Test compatibility across all supported installers:**

```bash
# Test with uv
uv venv && source .venv/bin/activate && uv pip install -e "."
lnbits  # verify startup

# Test with Poetry
poetry install
poetry run lnbits  # verify startup

# Test with Nix (full VM test)
nix build .#checks.x86_64-linux.vmTest
```

5. **Document why** the dependency was added in your PR description

::: warning
All three installation methods (uv, Poetry, Nix) must work. A PR that breaks any of them will not be merged.
:::

### What gets rejected

| Reason | Example |
| --- | --- |
| Duplicate functionality | Adding `requests` when `httpx` is already available |
| Heavy/bloated package | Adding a large framework for a small utility |
| Unmaintained package | No releases or commits in 12+ months |
| Native compilation required | C extensions that break cross-platform builds |
| License incompatibility | Non-MIT-compatible licenses |

## Testing

```bash
# Run all tests
make test

# Run specific test file
poetry run pytest tests/test_wallets.py

# Run with verbose output
poetry run pytest -v

# Run formatting check
make format

# Run type checking
make mypy

# Run all checks (format + lint + type check + tests)
make all
```

Tests must pass on both SQLite and PostgreSQL.

## Project branches

| Branch | Purpose |
| --- | --- |
| `main` | Stable releases |
| `dev` | Active development (PR target) |
| `feature/*` | Feature branches |

## Report a bug

Found something broken? [Open an issue on GitHub](https://github.com/lnbits/lnbits/issues/new). Include:

- What happened and what you expected
- Your LNbits version and installation method (Docker, uv, Poetry, etc.)
- Wallet backend you're using
- Relevant logs (mask any secrets, macaroons, or API keys!)
- Steps to reproduce the issue

For extension bugs, open the issue on the extension's own repo (linked from each extension page).

## Contributing to documentation

This docs site pulls extension pages directly from each extension's GitHub repository. To improve an extension's documentation:

1. Go to the extension repo (e.g., `github.com/lnbits/tpos`)
2. Edit the `README.md` there
3. Your changes will appear on the docs site at the next build

For core docs (guides, API reference, developer docs), submit a PR to the [docs repository](https://github.com/lnbits/lnbits-docs).

### Translations - great first contribution

LNbits is used worldwide. If you're a native speaker of a non-English language, helping with translations is one of the easiest and most impactful ways to contribute. No coding required - just language skills and a GitHub account.

## Areas to contribute

- **Bug fixes** - check the [GitHub Issues](https://github.com/lnbits/lnbits/issues)
- **Documentation** - improve extension READMEs or core docs (see above)
- **Extensions** - build new extensions (see [Building Extensions](/dev/building-extensions))
- **Wallet backends** - add support for new Lightning services
- **Frontend** - UI improvements and accessibility
- **Tests** - increase test coverage
- **Translations** - help localize LNbits (great first contribution!)

## PR checklist

- [ ] Branch based on `dev`
- [ ] Code is formatted (`make format`)
- [ ] Linting passes (`make lint`)
- [ ] Tests pass (`make test`)
- [ ] New features include tests
- [ ] Migrations work on SQLite and PostgreSQL
- [ ] No secrets or credentials in the code
- [ ] No new dependencies added (or, if necessary, tested with uv + Poetry + Nix)
- [ ] Extension follows the [extension structure](/dev/building-extensions)

## Error codes

Common CI/review rejection reasons:

| Code | Cause | Fix |
| --- | --- | --- |
| `LINT_FAIL` | Ruff formatting errors | Run `make format` |
| `TYPE_ERROR` | Missing type hints | Add type annotations |
| `WRONG_BRANCH` | PR targets `main` | Rebase onto `dev` |
| `NEW_DEP` | Unapproved dependency | Remove or get approval first |
| `MIGRATION_FAIL` | SQL syntax differences | Test on both SQLite and PostgreSQL |

## Questions?

Join the LNbits Telegram group: [@lnbits](https://t.me/lnbits)

You can also reach the core team directly via the chat button on [lnbits.com](https://lnbits.com).

::: warning Scam warning
LNbits admins will **never** DM you first. There is **no official LNbits support team** that contacts users privately. If someone messages you claiming to be LNbits support, it is a scam.
:::

## Related Pages

- [Building Extensions](/dev/building-extensions)
- [Architecture](/dev/architecture)
