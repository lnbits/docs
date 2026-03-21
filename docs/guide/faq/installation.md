# Installation FAQ

> Common questions about installing, updating, maintaining, and troubleshooting LNbits startup issues.

[[toc]]

## What are the system requirements?

- **Minimum**: 1 CPU, 512 MB RAM, 1 GB disk (SQLite)
- **Recommended**: 2 CPU, 2 GB RAM, PostgreSQL
- Python 3.10+ or Docker

For production use, PostgreSQL is strongly recommended over SQLite. See [Installation](/guide/installation/) for details.

## Which installation method should I use?

It depends on your environment:

| Method | Best for |
|---|---|
| [Docker](/guide/installation/docker) | Production, easy setup, isolation |
| [uv](/guide/installation/uv) | Fast bare-metal install, development |
| [Poetry](/guide/installation/poetry) | Development, contribution |
| [Nix](/guide/installation/nix) | NixOS users, reproducible builds |
| [AppImage](/guide/installation/appimage) | Desktop Linux, quick testing |
| [Node platforms](/guide/installation/node-platforms) | Raspberry Pi, Umbrel, Start9, myNode |
| [SaaS](/guide/installation/saas) | Zero setup, hosted instances |
| [Fly.io](/guide/installation/flyio) | Cloud deployment |

See the [installation decision tree](/guide/installation/) for a guided choice.

## Can I run LNbits on a Raspberry Pi?

Yes. LNbits runs well on a Raspberry Pi 4 (2 GB+ RAM). The easiest methods are:

- **Umbrel / Start9 / myNode** - one-click install from the app store
- **Docker** - `docker compose up` on Raspberry Pi OS
- **uv / Poetry** - bare-metal install with Python 3.10+

A Pi 3 may work but is not recommended for production. See [Node Platforms](/guide/installation/node-platforms).

## Can I run LNbits on Windows?

Yes, using Docker Desktop or WSL2 (Windows Subsystem for Linux). Docker is the easiest path - install [Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/) and follow the [Docker guide](/guide/installation/docker).

For bare-metal installs, use WSL2 with Ubuntu and follow the standard Linux instructions.

## Docker vs bare metal - which should I choose?

| | Docker | Bare metal |
|---|---|---|
| **Setup** | Easier (pre-configured) | More manual steps |
| **Updates** | `docker compose pull && up` | `git pull` + dependency install |
| **Isolation** | Fully containerized | Shares system Python |
| **Debugging** | Slightly harder (logs via docker) | Direct access to files/logs |
| **Performance** | Minimal overhead | Slightly faster |
| **Best for** | Production, beginners | Development, advanced users |

## How do I update LNbits?

The update process depends on your installation method. See [Updating](/guide/installation/updating) for step-by-step instructions for every method (Docker, uv, Poetry, Nix, AppImage, Fly.io).

**Always back up before updating** - especially your `.env` file and database.

## How do I backup LNbits?

Back up these items:

1. **`.env` file** - your configuration
2. **Database** - SQLite file (`./data/database.sqlite3`) or PostgreSQL dump
3. **Data directory** - `./data/` contains extension data and uploaded files

```bash
# SQLite backup
cp data/database.sqlite3 data/database.sqlite3.bak

# PostgreSQL backup
pg_dump lnbits > lnbits_backup.sql
```

## How do I migrate from SQLite to PostgreSQL?

LNbits includes a built-in migration tool:

```bash
# 1. Set your PostgreSQL connection in .env
LNBITS_DATABASE_URL=postgres://user:password@localhost:5432/lnbits

# 2. Run the migration command
poetry run python tools/conv.py
```

See [PostgreSQL](/guide/installation/postgresql) for full setup instructions.

## LNbits won't start - port conflict

```
ERROR: [Errno 98] Address already in use
```

Another process is using port 5000. Either stop the conflicting process or change the LNbits port:

```bash
# In .env
PORT=5001
```

To find what's using the port:

```bash
lsof -i :5000
# or
ss -tlnp | grep 5000
```

## LNbits won't start - database connection error

```
ERROR: connection to server at "localhost" failed
```

Check that:

1. PostgreSQL is running: `sudo systemctl status postgresql`
2. The connection string in `.env` is correct: `LNBITS_DATABASE_URL=postgres://user:password@localhost:5432/lnbits`
3. The database exists: `psql -l | grep lnbits`
4. The user has proper permissions

## LNbits won't start - Python version mismatch

LNbits requires Python 3.10+. Check your version:

```bash
python3 --version
```

If your system Python is too old, install a newer version or use [uv](/guide/installation/uv) which manages Python versions automatically.

## Docker container keeps restarting

Check the logs for the root cause:

```bash
docker compose logs lnbits
```

Common causes:

- **Bad `.env` configuration** - check all required variables are set
- **Database connection issues** - ensure the database container is running and healthy
- **Port conflicts** - another service is using the same port
- **Missing data directory** - ensure `./data/` exists and has proper permissions

## Docker permission issues

If you see permission denied errors on the data directory:

```bash
sudo chown -R 1000:1000 ./data
```

The LNbits Docker container runs as UID 1000 by default. Ensure the data directory is owned by this user.

## Related Pages

- [Installation](/guide/installation/) - choose your setup method
- [Updating](/guide/installation/updating) - update instructions for all methods
- [PostgreSQL](/guide/installation/postgresql) - database setup
- [First Setup](/guide/installation/first-setup) - post-install configuration
