# Security

> Harden your LNbits instance - HTTPS, authentication, rate limiting, and access controls.

Best practices for securing your LNbits instance.

## HTTPS

Always run LNbits behind a reverse proxy with TLS in production.

```bash
# Never do this in production:
OAUTHLIB_INSECURE_TRANSPORT=1  # Only for local development
```

See [Reverse Proxy](/guide/installation/reverse-proxy) for Nginx and Caddy setup.

## Authentication hardening

### Strong JWT secret

```bash
AUTH_SECRET_KEY=$(openssl rand -hex 32)
```

### Token expiry

```bash
# Shorter expiry for higher security
AUTH_TOKEN_EXPIRE_MINUTES=1440  # 1 day instead of default 1 year
```

### Restrict auth methods

```bash
# Only allow username/password
AUTH_ALLOWED_METHODS=username-password
```

### Disable registration

```bash
LNBITS_ALLOW_NEW_ACCOUNTS=false
```

## API key security

- **Never expose admin keys** in client-side code
- Use **invoice keys** for public-facing applications
- Prefer **ACL tokens** for third-party integrations with minimal permissions
- **Rotate keys** by recreating wallets if compromised

## Rate limiting

```bash
LNBITS_RATE_LIMIT_NO=100
LNBITS_RATE_LIMIT_UNIT=minute
```

### IP filtering

```bash
# Allow only specific IPs
LNBITS_ALLOWED_IPS=192.168.1.0/24,10.0.0.1

# Block specific IPs
LNBITS_BLOCKED_IPS=1.2.3.4,5.6.7.8
```

## Balance limits

```bash
# Maximum wallet balance (in millisatoshis)
LNBITS_WALLET_LIMIT_MAX_BALANCE=1000000
```

## Admin access

- Use `LNBITS_ADMIN_USERS` to explicitly define admins
- Only set `SUPER_USER` for one trusted identity
- Enable `LNBITS_ADMIN_UI` only when needed

## Audit logging

LNbits logs all API requests and payment activity. Review audit logs regularly:

```bash
curl https://your-lnbits.com/admin/api/v1/audit \
  -H "X-Api-Key: ADMIN_KEY"
```

## Database security

- For production, use **PostgreSQL** with proper access controls
- SQLite databases should have restricted file permissions
- Regular backups of the `data/` directory or PostgreSQL database

## Checklist

- [ ] HTTPS enabled via reverse proxy
- [ ] Strong `AUTH_SECRET_KEY` set
- [ ] `LNBITS_ALLOW_NEW_ACCOUNTS` set appropriately
- [ ] Admin users explicitly defined
- [ ] Rate limiting configured
- [ ] Database backups automated
- [ ] Funding source credentials secured
- [ ] Admin keys not exposed in any client code

## Related Pages

- [Authentication](/guide/authentication)
- [Reverse Proxy](/guide/installation/reverse-proxy)
- [Configuration](/guide/core/environment)
