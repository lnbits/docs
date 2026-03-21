# Process Manager

> Run LNbits as a persistent service using systemd or PM2 so it starts on boot and restarts on failure.

If you installed LNbits from source (uv, Poetry, Nix) you need a process manager to keep it running. Docker and node platforms handle this automatically.

## systemd (Linux)

Create a service file:

```ini
# /etc/systemd/system/lnbits.service
[Unit]
Description=LNbits Lightning Wallet
After=network.target

[Service]
Type=simple
User=lnbits
Group=lnbits
WorkingDirectory=/home/lnbits/lnbits
ExecStart=/home/lnbits/lnbits/.venv/bin/lnbits
Restart=always
RestartSec=5
Environment=LNBITS_DATA_FOLDER=/home/lnbits/lnbits/data

[Install]
WantedBy=multi-user.target
```

### Enable and start

```bash
sudo systemctl daemon-reload
sudo systemctl enable lnbits
sudo systemctl start lnbits
```

### Manage the service

```bash
# Check status
sudo systemctl status lnbits

# View logs
sudo journalctl -u lnbits -f

# Restart after config changes
sudo systemctl restart lnbits

# Stop
sudo systemctl stop lnbits
```

### Poetry variant

If you installed with Poetry, change the `ExecStart` line:

```ini
ExecStart=/home/lnbits/lnbits/.venv/bin/poetry run lnbits
```

## PM2 (cross-platform)

[PM2](https://pm2.keymetrics.io/) is a Node.js-based process manager that works on Linux, macOS, and Windows.

### Install PM2

```bash
npm install -g pm2
```

### Start LNbits

```bash
cd /home/lnbits/lnbits

# If using uv / venv
pm2 start .venv/bin/lnbits --name lnbits

# If using Poetry
pm2 start "poetry run lnbits" --name lnbits
```

### Persist across reboots

```bash
pm2 startup
pm2 save
```

### Manage the process

```bash
# Status
pm2 status

# Logs
pm2 logs lnbits

# Restart
pm2 restart lnbits

# Stop
pm2 stop lnbits
```

## Which one to choose?

| | systemd | PM2 |
| --- | --- | --- |
| **Platform** | Linux only | Linux, macOS, Windows |
| **Install** | Built into Linux | Requires Node.js |
| **Log management** | journalctl | Built-in log rotation |
| **Best for** | Production Linux servers | Development, macOS, cross-platform |

::: tip
For Docker deployments, the `restart: unless-stopped` policy in your `docker-compose.yml` handles restarts - you don't need systemd or PM2.
:::

## Related Pages

- [Install with uv](/guide/installation/uv) - source installation
- [Install with Poetry](/guide/installation/poetry) - source installation
- [Reverse Proxy](/guide/installation/reverse-proxy) - set up HTTPS
- [First Setup](/guide/installation/first-setup) - post-install checklist
