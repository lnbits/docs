# Skills Catalog

> Ready-made skill files that teach AI agents how to work with LNbits - install one and your agent knows the endpoints, rules, and patterns for the task.

Skills are structured instruction files (`.md`) that give AI agents the context they need to build on LNbits autonomously. Instead of searching through documentation and guessing, an agent with the right skill file has focused, task-ready instructions with working code examples.

## What is a Skill?

A skill file is a markdown document loaded into an AI agent's context. It contains everything the agent needs for a specific LNbits task:

- **Context** on what the feature does and how it fits into LNbits
- **Prerequisites** that must be in place before starting
- **Steps** with working code examples and real endpoints
- **Rules** the agent must follow (security constraints, key handling)
- **Error handling** for common failures

One skill, one task. That is the design principle. "Create a paywall" is a skill. "Set up an entire e-commerce store" is a project that uses multiple skills.

## How to Use a Skill

### With Claude Code or compatible agents

Skills follow the [Agent Skills specification](https://agentskills.io/specification) and work across 22+ agents including Claude Code, Cursor, GitHub Copilot, Windsurf, and Gemini CLI.

```bash
# Install a skill from a repository
npx skills add owner/repo

# Search for LNbits skills
npx skills search lnbits
```

### Manual loading

Copy the skill's `SKILL.md` content and paste it into your agent's context or system prompt. The agent will follow the instructions as if it were a LNbits expert for that specific task.

## Available Skills

### Core

| Skill | Description | Status |
|---|---|---|
| [Wallet & Payments](/llm/skills/wallet-payments) | Create wallets, send/receive payments, check balances via the LNbits API | Available |
| [Shared Wallet (Uncle Jim)](/llm/skills/shared-wallet) | Onboard family and friends to Lightning with shared wallets and granular permissions | Available |
| Authentication | API key management, auth decorators, key rotation | Planned |
| User Management | Create users, assign roles, manage permissions | Planned |

### Extensions

| Skill | Description | Status |
|---|---|---|
| [Lightning Address](/llm/skills/lnurlp-pay-links) | Create a human-readable Lightning Address like alice@yourdomain.com | Available |
| Paywall | Put URLs behind Lightning paywalls | Planned |
| TPoS | Set up point-of-sale terminals | Planned |
| Bolt Cards | Program and manage NFC Lightning cards | Planned |
| SatsPay | Create on-chain and Lightning payment pages | Planned |

### Development

| Skill | Description | Status |
|---|---|---|
| Build an Extension | Scaffold, develop, and test a new LNbits extension | Planned |
| Vet an Extension | Audit an extension for quality, security, and compliance | Planned |
| Database Migrations | Write migrations that work across SQLite, PostgreSQL, and CockroachDB | Planned |
| Fiat Integration | Add Stripe or PayPal checkout to an extension | Planned |
| Hold Invoices | Create, settle, and cancel hold invoices with status tracking | Planned |

::: info Community skills welcome
The planned skills above are on the roadmap. Want to help? Pick a task you know well and [create a skill](/llm/create-skill) for it.
:::

## When to Use Skills vs Docs

| Need | Use |
|---|---|
| Agent should complete a specific task autonomously | **Skill file** - focused instructions with code |
| Agent needs to answer questions about LNbits | **llms.txt / llms-full.txt** - documentation index |
| Agent should behave like the docs assistant | **System prompt** - personality and knowledge rules |
| Human wants to learn about a feature | **Documentation pages** - full explanations with context |

## Related Pages

- [How to Create a Skill](/llm/create-skill) - build your own skill file from scratch
- [LLM Integration](/llm/) - how AI agents consume LNbits documentation
- [System Prompt](/llm/system-prompt) - the docs assistant's personality and rules
- [API Reference](/api/) - core and admin endpoints
- [Extensions](/extensions/) - all available extensions
