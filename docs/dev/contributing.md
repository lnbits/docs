# Contributing

> How to contribute to LNbits core and extensions - setup, standards, dependency rules, and PR process.

## Getting started

Fork and clone the repo, then use `make dev` for a one-command setup:

```bash
git clone https://github.com/your-username/lnbits.git
cd lnbits
make dev
```

This installs dependencies, configures FakeWallet, and starts LNbits in debug mode.

::: tip Prefer manual setup?
See the full installation guides for [uv](/guide/installation/uv), [Poetry](/guide/installation/poetry), or [Nix](/guide/installation/nix). Use [FakeWallet](/guide/wallets/fakewallet) for development - it simulates Lightning payments without a real node.
:::

### Pre-commit hooks

```bash
pre-commit install
pre-commit run --all-files
```

### LNbits CLI

```bash
lnbits-cli --help        # available commands
lnbits-cli migrate       # run database migrations
lnbits-cli superuser     # create a superuser
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
3. **Add the dependency** to `pyproject.toml`
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
|---|---|
| Duplicate functionality | Adding `requests` when `httpx` is already available |
| Heavy/bloated package | Adding a large framework for a small utility |
| Unmaintained package | No releases or commits in 12+ months |
| Native compilation required | C extensions that break cross-platform builds |
| License incompatibility | Non-MIT-compatible licenses |

## Testing

```bash
make test              # run all tests
make format            # run formatting check
make mypy              # run type checking
make all               # format + lint + type check + tests

# Run specific test file
poetry run pytest tests/test_wallets.py -v
```

Tests must pass on both SQLite and PostgreSQL.

## Project branches

| Branch | Purpose |
|---|---|
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

For extension bugs, open the issue on the extension's own repo (linked from each [extension page](/extensions/)).

## Contributing to documentation

The docs site is a separate project. Extension pages are auto-generated from each extension's GitHub README at build time.

**To improve an extension page:** Edit the `README.md` in the extension's own repo (e.g., `github.com/lnbits/tpos`). Changes appear on the docs site at the next build.

**To improve core docs:** Submit a PR to the [docs repository](https://github.com/lnbits/docs). Pages are Markdown files in `docs/`.

**Not sure where to start?** The [Contribute page](/contribute/) has role-specific guides for developers, testers, writers, designers, entrepreneurs, and ambassadors.

### Translations

Translation infrastructure is being planned. If you're a native speaker of a non-English language and want to help shape how translations work, reach out on [Telegram](https://t.me/lnbits). Early volunteers will define the process.

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
|---|---|---|
| `LINT_FAIL` | Ruff formatting errors | Run `make format` |
| `TYPE_ERROR` | Missing type hints | Add type annotations |
| `WRONG_BRANCH` | PR targets `main` | Rebase onto `dev` |
| `NEW_DEP` | Unapproved dependency | Remove or get approval first |
| `MIGRATION_FAIL` | SQL syntax differences | Test on both SQLite and PostgreSQL |

## Questions?

Join the LNbits Telegram group: [@lnbits](https://t.me/lnbits)

::: warning Scam warning
LNbits admins will **never** DM you first. There is **no official LNbits support team** that contacts users privately. If someone messages you claiming to be LNbits support, it is a scam.
:::

## Related Pages

- [Contribute to LNbits](/contribute/) - role-specific guides for all contributor types
- [Building Extensions](/dev/building-extensions) - extension development guide
- [Architecture](/dev/architecture) - internal structure and design decisions
- [Developer Tools](/dev/tools) - Extension Builder, Polar, MCP Server, TableTown
- [FakeWallet](/guide/wallets/fakewallet) - simulated Lightning backend for development
- [Installation (uv)](/guide/installation/uv) - recommended from-source install
- [Installation (Poetry)](/guide/installation/poetry) - alternative Python setup
