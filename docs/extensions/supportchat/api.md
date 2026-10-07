# Support Chat API

> Declared routes for the core WASM release 0.2.2.

## Base URL

```text
https://your-lnbits.com/api/v1/ext/supportchat
```

## Authentication

**User** routes require an LNbits user session or a Bearer access token. **Public** routes do not require a wallet API key. Public handlers still validate record state and any application tokens.

The sandboxed frontend calls these routes through the LNbits bridge. Routes and payloads may change between releases; use your instance's `/docs` or `/openapi.json` for its installed version.

## Routes

| Method | Path | Auth | WASM export |
| --- | --- | --- | --- |
| `POST` | `/inboxes` | User | `create-inbox` |
| `PUT` | `/inboxes/{inbox_id}` | User | `update-inbox` |
| `GET` | `/inboxes` | User | `list-inboxes` |
| `DELETE` | `/inboxes/{inbox_id}` | User | `delete-inbox` |
| `GET` | `/inboxes/{inbox_id}/conversations` | User | `list-conversations` |
| `GET` | `/conversations/{conversation_id}/messages` | User | `list-messages` |
| `POST` | `/conversations/{conversation_id}/reply` | User | `reply-conversation` |
| `PUT` | `/conversations/{conversation_id}` | User | `update-conversation` |
| `POST` | `/conversations/{conversation_id}/resolve` | User | `resolve-conversation` |
| `POST` | `/conversations/{conversation_id}/read` | User | `mark-conversation-read` |
| `POST` | `/conversations/{conversation_id}/notes` | User | `add-internal-note` |
| `GET` | `/inboxes/{inbox_id}/canned-replies` | User | `list-canned-replies` |
| `POST` | `/inboxes/{inbox_id}/canned-replies` | User | `save-canned-reply` |
| `DELETE` | `/canned-replies/{reply_id}` | User | `delete-canned-reply` |
| `GET` | `/public/inboxes/{inbox_id}` | Public | `get-public-inbox` |
| `POST` | `/public/inboxes/{inbox_id}/conversations` | Public | `start-conversation` |
| `GET` | `/public/conversations/{conversation_id}` | Public | `get-public-conversation` |
| `POST` | `/public/conversations/{conversation_id}/messages` | Public | `post-public-message` |

These mappings come from the [published release config](https://raw.githubusercontent.com/lnbits/supportchat/v0.2.2/config.json). Request validation and responses are defined by the component implementation.

## Related Pages

- [Support Chat Overview](./)
- [WASM Frontend](/dev/extensions/wasm/frontend): route and authentication behavior
- [WASM Permissions](/dev/extensions/wasm/permissions)
