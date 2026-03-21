# Networking FAQ

> Common questions about Tor, reverse proxy, clearnet access, CORS, WebSocket, and network configuration.

[[toc]]

## How do I access LNbits over Tor?

1. Install Tor:
   ```bash
   sudo apt install tor
   ```
2. Add a hidden service to `/etc/tor/torrc`:
   ```
   HiddenServiceDir /var/lib/tor/lnbits/
   HiddenServicePort 80 127.0.0.1:5000
   ```
3. Restart Tor:
   ```bash
   sudo systemctl restart tor
   ```
4. Get your `.onion` address:
   ```bash
   sudo cat /var/lib/tor/lnbits/hostname
   ```

Your LNbits instance is now accessible via Tor at the `.onion` address. No clearnet exposure or port forwarding needed.

## How do I use a clearnet domain?

Set up a [reverse proxy](/guide/installation/reverse-proxy) pointing your domain to LNbits:

1. Point your domain's DNS A record to your server's IP
2. Install a reverse proxy (Caddy recommended - handles TLS automatically)
3. Configure the proxy to forward to `127.0.0.1:5000`

**Caddy** (simplest - automatic HTTPS):

```
lnbits.example.com {
    reverse_proxy 127.0.0.1:5000
}
```

**Nginx** (manual TLS with certbot):

```nginx
server {
    server_name lnbits.example.com;
    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

See [Reverse Proxy](/guide/installation/reverse-proxy) for complete configurations including WebSocket support.

## How do I set up a reverse proxy (Caddy/Nginx)?

See the [Reverse Proxy](/guide/installation/reverse-proxy) guide for full configurations. Key requirements:

- Forward WebSocket connections (required for real-time updates)
- Set proper headers (`Host`, `X-Real-IP`, `X-Forwarded-For`, `X-Forwarded-Proto`)
- Enable HTTPS (Caddy does this automatically; Nginx needs certbot)

Caddy is recommended for simplicity. Nginx and Apache are also supported.

## How do I fix WebSocket connection errors?

WebSocket issues usually come from the reverse proxy not forwarding upgrade requests. For **Nginx**, add:

```nginx
location /api/v1/ws {
    proxy_pass http://127.0.0.1:5000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
    proxy_read_timeout 86400;
}
```

For **Caddy**, WebSocket proxying works automatically with `reverse_proxy`.

Other causes:
- **Firewall** blocking WebSocket ports
- **Cloudflare** - enable WebSocket support in your Cloudflare dashboard
- **Browser extensions** blocking WebSocket connections

See [WebSockets](/guide/core/websockets) for details.

## SSL/TLS certificate issues

Common TLS problems and solutions:

**Self-signed certificate errors**: Use a proper certificate from Let's Encrypt (free). Caddy handles this automatically. For Nginx, use certbot:

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d lnbits.example.com
```

**Certificate expired**: Renew with `sudo certbot renew`. Set up a cron job for auto-renewal.

**Mixed content warnings**: Ensure `LNBITS_FORCE_HTTPS=true` in `.env` so LNbits generates HTTPS URLs.

## CORS errors when calling the API

If you get CORS errors when calling the LNbits API from a browser:

LNbits allows CORS by default for API endpoints. If you're still seeing errors:

1. **Check the URL** - ensure you're using the correct protocol (HTTPS, not HTTP)
2. **Check headers** - the `X-Api-Key` header must be included
3. **Reverse proxy** - ensure your proxy passes CORS headers through (don't strip them)
4. **Custom CORS** - if you need specific origins, configure them in the Admin Dashboard under Server settings

## Can only access locally, not from other devices

By default, LNbits binds to `127.0.0.1` (localhost only). To allow access from other devices on your network:

```bash
# In .env
HOST=0.0.0.0
```

::: warning
Don't expose LNbits directly to the internet without a [reverse proxy](/guide/installation/reverse-proxy) and HTTPS. Binding to `0.0.0.0` makes LNbits accessible to all devices on your network.
:::

For internet access, set up a reverse proxy with a domain and TLS certificate.

## How do I configure systemd or PM2?

Use a process manager to keep LNbits running after reboots. See [Process Manager](/guide/installation/process-manager) for full setup instructions.

**systemd** (Linux):

```ini
[Unit]
Description=LNbits
After=network.target

[Service]
User=lnbits
WorkingDirectory=/home/lnbits/lnbits
ExecStart=/home/lnbits/lnbits/.venv/bin/uvicorn lnbits.__main__:app --host 0.0.0.0 --port 5000
Restart=always

[Install]
WantedBy=multi-user.target
```

**PM2** (Node.js process manager):

```bash
pm2 start "poetry run lnbits" --name lnbits
pm2 save
pm2 startup
```

## How do I run LNbits on a custom port?

Set the `PORT` environment variable in `.env`:

```bash
PORT=8080
```

Or pass it directly:

```bash
PORT=8080 poetry run lnbits
```

For Docker, map the port in `docker-compose.yml`:

```yaml
ports:
  - "8080:5000"
```

## How do I restrict access to specific IPs?

LNbits doesn't have built-in IP filtering, but you can restrict access at the reverse proxy level:

**Nginx**:

```nginx
location / {
    allow 192.168.1.0/24;
    allow 10.0.0.0/8;
    deny all;
    proxy_pass http://127.0.0.1:5000;
}
```

**Caddy**:

```
lnbits.example.com {
    @blocked not remote_ip 192.168.1.0/24
    respond @blocked 403
    reverse_proxy 127.0.0.1:5000
}
```

You can also use firewall rules (ufw, iptables) at the OS level.

## Related Pages

- [Reverse Proxy](/guide/installation/reverse-proxy) - Caddy, Nginx, and Apache setup
- [Process Manager](/guide/installation/process-manager) - systemd and PM2 setup
- [WebSockets](/guide/core/websockets) - real-time updates configuration
- [Environment](/guide/core/environment) - all configuration variables
