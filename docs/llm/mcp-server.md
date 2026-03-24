# MCP Server

> Connect AI assistants like Claude directly to your LNbits instance. Create invoices, send payments, manage wallets, and control extensions through natural conversation.

::: tip What is MCP?
The [Model Context Protocol](https://modelcontextprotocol.io/) (MCP) is an open standard that lets AI assistants use external tools. The LNbits MCP Server auto-discovers every endpoint on your LNbits instance and exposes them as tools that Claude, Cursor, and other MCP-compatible agents can call directly.
:::

<SkillHeader repo="lnbits/LNbits-MCP-Server" :official="true" source="https://github.com/lnbits/LNbits-MCP-Server" />

<iframe width="560" height="315" src="https://rumble.com/embed/v6tquy6/?pub=4" title="LNbits MCP Server - LNbits in your AI" frameborder="0" allowfullscreen style="max-width: 100%; border-radius: 8px;"></iframe>

## How it fits together

| Layer | What it does | Link |
|---|---|---|
| **Docs** (llms.txt) | Agents *read* about LNbits | [LLM Integration](/llm/) |
| **Skills** (.md files) | Agents *learn* LNbits patterns | [Skills Catalog](/llm/skills) |
| **MCP Server** (this page) | Agents *control* LNbits | You are here |

---

## Features

- **Auto-discovery** - tools are discovered from your instance's OpenAPI spec at startup. Every extension is supported with zero code changes.
- **Core wallet operations** - balance, transaction history, wallet details
- **Send and receive** - pay bolt11 invoices, pay Lightning Addresses, create invoices with QR codes
- **Extension support** - LNURLp, TPoS, SatsPay, Watch-only, and every other extension on your instance
- **Admin tools** - node info, user management, system stats
- **Runtime configuration** - configure your LNbits connection through natural language chat (no env files needed)
- **Secure** - API keys stay in memory only, never written to disk
- **Rate limited** - built-in request throttling

## Quick Start

### 1. Install

```bash
git clone https://github.com/lnbits/LNbits-MCP-Server.git
cd LNbits-MCP-Server
pip install -e .
```

Requires Python 3.10+.

### 2. Add to your AI client

For **Claude Desktop**, edit your config file:

- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

```json
{
  "mcpServers": {
    "lnbits": {
      "command": "lnbits-mcp-server"
    }
  }
}
```

For **other MCP clients** (Cursor, Windsurf, etc.), add the same server entry to your client's MCP configuration.

### 3. Configure via chat

Restart your AI client, then tell it:

```
Configure lnbits.

URL: https://your-lnbits.com
Key: your-admin-key
Auth method: api_key_header
```

The server discovers all available tools from your instance automatically. No restart needed.

### Run manually (optional)

```bash
# Using the installed command
lnbits-mcp-server

# Or run directly
python -m lnbits_mcp_server.server
```

## Examples

Once configured, interact with your LNbits wallet through natural language:

```
"Check my wallet balance"
"Create an invoice for 1000 sats with memo 'Coffee payment'"
"Pay this invoice: lnbc10u1p3..."
"Send 500 sats to alice@lnbits.com"
"Show me my recent payments"
"Create a pay link for tips"
"Set up a TPoS terminal called 'Market Stand'"
```

## Architecture: OpenAPI Auto-Discovery

The MCP Server does not hardcode tools. Instead, it discovers them at runtime from your LNbits instance's `/openapi.json` spec:

```
Startup / Refresh
       |
       v
  openapi_parser      Fetches /openapi.json, resolves $ref pointers
       |               -> DiscoveredOperation objects
       v
  tool_registry        Filters operations (no DELETE by default,
       |               skips non-API paths, 200-tool safety cap)
       v               -> MCP Tool objects with curated descriptions
  dispatcher           Generic HTTP executor for any discovered tool
       |               -> handles path/query/body params automatically
       v
  meta_tools           6 curated infrastructure tools that aren't
                       auto-discovered (configure, test, refresh, etc.)
```

This means:
- **Every extension is automatically supported** - install a new extension, refresh tools, it appears
- **No code changes needed** when LNbits adds new endpoints
- **Curated descriptions** for common endpoints (wallet, payments, LNURLp) give the AI better context
- **Safety filters** skip destructive DELETE endpoints by default

### Meta tools (always available)

These 6 tools are built-in and not auto-discovered:

| Tool | Description |
|---|---|
| `configure_lnbits` | Set LNbits URL, API key, and auth method at runtime |
| `test_connection` | Verify the connection to your LNbits instance |
| `get_configuration` | Show current config (keys are masked) |
| `refresh_tools` | Re-fetch the OpenAPI spec and update available tools |
| `list_extensions` | List all extensions on the instance |
| `pay_lightning_address` | Pay a Lightning Address (e.g., alice@lnbits.com) |

### Auto-discovered tools (from your instance)

These depend on what your LNbits instance has enabled. Common ones:

| Category | Examples |
|---|---|
| **Wallet** | `get_wallet_details`, `get_wallet_balance`, `get_payments`, `check_connection` |
| **Payments** | `pay_invoice`, `get_payment_status`, `decode_invoice`, `create_invoice` |
| **LNURLp** | `create_lnurlp_link`, `get_lnurlp_links` |
| **TPoS** | `create_tpos`, `get_tpos_list` |
| **SatsPay** | `create_satspay_charge`, `get_satspay_charges` |
| **Watch-only** | `create_watchonly_wallet`, `get_watchonly_wallets` |
| **Admin** | `get_node_info`, `list_users`, `create_user`, `get_system_stats` |

## Invoice QR Code Enrichment

When creating an invoice (`out=false`), the server automatically enriches the response with:

| Field | Value | Use |
|---|---|---|
| `qr_code` | `https://your-lnbits.com/api/v1/qrcode/{bolt11}` | Scannable QR code image URL |
| `lightning_uri` | `lightning:{bolt11}` | Deep-link URI for wallet apps |

Outgoing payments (`out=true`) are not enriched.

## Access Token Injection (LNbits v1.4+)

LNbits v1.4 blocks `usr` query param auth for admin users. The MCP Server handles this automatically:

- Detects endpoints requiring `usr` or `cookie_access_token` parameters
- Injects `Authorization: Bearer <access_token>` header automatically
- Hides these implementation details from the AI's tool schemas

Add your access token during configuration:

```
Configure lnbits.

URL: https://your-lnbits.com
Key: your-admin-key
Access token: your-access-token
Auth method: api_key_header
```

## Configuration Reference

### Runtime configuration (recommended)

Use `configure_lnbits` through your AI client. Keys stay in memory only.

### Environment variables (legacy)

```bash
LNBITS_URL=https://your-lnbits.com
LNBITS_API_KEY=your_api_key
LNBITS_AUTH_METHOD=api_key_header  # or api_key_query, http_bearer, oauth2
```

| Variable | Description | Default |
|---|---|---|
| `LNBITS_URL` | Base URL for LNbits instance | `https://demo.lnbits.com` |
| `LNBITS_API_KEY` | API key for authentication | None (required) |
| `LNBITS_BEARER_TOKEN` | Bearer token (alternative auth) | None |
| `LNBITS_OAUTH2_TOKEN` | OAuth2 token (alternative auth) | None |
| `LNBITS_AUTH_METHOD` | Auth method | `api_key_header` |
| `LNBITS_TIMEOUT` | Request timeout (seconds) | `30` |
| `LNBITS_MAX_RETRIES` | Max request retries | `3` |
| `LNBITS_RATE_LIMIT_PER_MINUTE` | Rate limit | `60` |

At least one authentication method must be provided.

## Troubleshooting

### Server won't start

- Verify Python 3.10+ is installed (`python --version`)
- Reinstall dependencies: `pip install -e .`
- Check that `lnbits-mcp-server` is on your PATH

### Connection fails

- Verify your LNbits URL is reachable: `curl https://your-lnbits.com/api/v1/health`
- Check your API key is valid and has the right permissions
- For self-signed certificates, ensure your environment trusts them

### AI client doesn't see the tools

- Restart the AI client after adding the MCP server config
- Use `refresh_tools` to re-discover endpoints
- Check the AI client's MCP logs for error messages

### Payments fail

- Verify the wallet has sufficient balance
- Check that you are using an admin key (invoice keys cannot send)
- For Lightning Address payments, ensure the recipient's address is reachable

## Development

```bash
git clone https://github.com/lnbits/LNbits-MCP-Server.git
cd LNbits-MCP-Server
pip install -e .[dev]

# Run tests (92 tests across 8 files)
pytest

# Format
black src tests
isort src tests

# Type check
mypy src
```

## Security

- **API keys** stay in memory only, never written to disk
- **HTTPS** required for production instances
- **Rate limiting** prevents API abuse
- **DELETE endpoints** are filtered out by default
- **Sensitive info** is never logged

## License

MIT License - see [LICENSE](https://github.com/lnbits/LNbits-MCP-Server/blob/main/LICENSE) for details.

## Related Pages

- [LLM Integration](/llm/) - how AI agents consume LNbits documentation
- [Skills Catalog](/llm/skills) - task-ready instruction files for agents
- [API Reference](/api/) - the REST API the MCP Server calls under the hood
- [Authentication](/api/authentication) - API key types and permissions
- [Extensions](/extensions/) - extensions the MCP Server can control
