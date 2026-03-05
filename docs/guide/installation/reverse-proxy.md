# Reverse Proxy

> Set up HTTPS access to LNbits using Nginx or Caddy as a reverse proxy.

Set up Nginx or Caddy to serve LNbits over HTTPS.

## Caddy (Recommended)

Caddy automatically handles TLS certificates via Let's Encrypt.

### Caddyfile

```
lnbits.example.com {
    reverse_proxy 127.0.0.1:5000
}
```

That's it. Caddy obtains and renews certificates automatically.

### With WebSocket support

```
lnbits.example.com {
    reverse_proxy 127.0.0.1:5000 {
        header_up X-Forwarded-Proto {scheme}
        header_up X-Real-IP {remote_host}
    }
}
```

## Nginx

### Basic configuration

```nginx
server {
    listen 443 ssl http2;
    server_name lnbits.example.com;

    ssl_certificate /etc/letsencrypt/live/lnbits.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/lnbits.example.com/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # WebSocket support
    location /api/v1/ws/ {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
    }
}

server {
    listen 80;
    server_name lnbits.example.com;
    return 301 https://$host$request_uri;
}
```

### Obtain certificates

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d lnbits.example.com
```

## Docker Compose with Caddy

```yaml
version: "3.7"
services:
  lnbits:
    image: lnbits/lnbits:latest
    restart: unless-stopped
    ports:
      - "127.0.0.1:5000:5000"
    volumes:
      - ./data:/app/data
      - ./.env:/app/.env

  caddy:
    image: caddy:2
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile
      - caddy_data:/data

volumes:
  caddy_data:
```

## Apache

### Basic configuration

```apache
<VirtualHost *:443>
    ServerName lnbits.example.com

    SSLEngine on
    SSLCertificateFile /etc/letsencrypt/live/lnbits.example.com/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/lnbits.example.com/privkey.pem

    ProxyPreserveHost On
    ProxyPass / http://127.0.0.1:5000/
    ProxyPassReverse / http://127.0.0.1:5000/

    RequestHeader set X-Forwarded-Proto "https"
    RequestHeader set X-Real-IP "%{REMOTE_ADDR}s"

    # WebSocket support
    RewriteEngine On
    RewriteCond %{HTTP:Upgrade} websocket [NC]
    RewriteCond %{HTTP:Connection} upgrade [NC]
    RewriteRule ^/?(.*) ws://127.0.0.1:5000/$1 [P,L]
</VirtualHost>

<VirtualHost *:80>
    ServerName lnbits.example.com
    Redirect permanent / https://lnbits.example.com/
</VirtualHost>
```

### Enable required modules

```bash
sudo a2enmod proxy proxy_http proxy_wstunnel rewrite headers ssl
sudo systemctl restart apache2
```

### Obtain certificates

```bash
sudo apt install certbot python3-certbot-apache
sudo certbot --apache -d lnbits.example.com
```

::: tip
Need LNbits to start on boot? See [Process Manager](/guide/installation/process-manager) for systemd and PM2 setup.
:::

## Self-signed HTTPS (development only)

For local testing without a domain:

```bash
# Generate self-signed certificate
openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 365 -nodes \
  -subj "/CN=localhost"
```

Then configure your reverse proxy to use `key.pem` and `cert.pem` instead of Let's Encrypt certificates.

::: warning
Self-signed certificates trigger browser warnings. Only use for development or internal networks.
:::

## Important notes

- Always forward `X-Forwarded-Proto` so LNbits knows it's behind HTTPS
- Enable WebSocket proxying for real-time payment updates
- Set appropriate timeouts for long-lived connections

## Related Pages

- [Docker](/guide/installation/docker) — container-based deployment
- [Fly.io](/guide/installation/flyio) — deploy on Fly.io
- [Security](/guide/core/security) — harden your LNbits instance
- [Environment Variables](/guide/core/environment) — configure LNbits settings
