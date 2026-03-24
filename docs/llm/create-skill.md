# How to Create a Skill

> Step-by-step guide to building skill files that teach AI agents how to work with LNbits - from first idea to a tested, shareable `.md` file.

A skill file is a markdown document that gives an AI agent everything it needs to complete a specific task. Instead of the agent searching through docs and guessing, your skill provides the right endpoints, patterns, constraints, and examples in one focused file.

Skills work across 22+ AI agents including Claude Code, Cursor, GitHub Copilot, Windsurf, and Gemini CLI.

## Before You Start

Ask yourself four questions:

1. **What task should the agent complete?** Be specific. "Use LNbits" is too broad. "Create a paywall that charges 100 sats per page view" is right.
2. **Who will use this skill?** A developer integrating LNbits into their app? A merchant setting up a store? This shapes the language and assumptions.
3. **What does the agent need to know?** Which API endpoints, auth patterns, or extension configs are involved?
4. **What should the agent never do?** Expose admin keys? Skip webhook verification? Delete wallets without confirmation?

If you can answer these clearly, you have enough to write a skill.

## Skill File Anatomy

A skill lives in a single directory with one required file:

```
my-skill/
  SKILL.md        # required - the instruction file
  references/     # optional - schemas, specs, examples
  scripts/        # optional - helper scripts
  assets/         # optional - images, diagrams
```

The `SKILL.md` file starts with frontmatter, then the instructions:

```yaml
---
name: lnbits-paywall
description: >
  Create paywalled content using the LNbits Paywall extension.
  Use when the user wants to charge sats for access to a URL,
  page, or file download.
---
```

### Frontmatter Fields

| Field | Required | Description |
|---|---|---|
| `name` | Yes | Lowercase with hyphens, max 64 chars. Must match directory name |
| `description` | Yes | What it does + when to trigger it. Max 1024 chars |
| `license` | No | License name or path to license file |
| `compatibility` | No | Environment requirements (e.g., "Requires LNbits 1.0+") |
| `metadata` | No | Arbitrary key-value pairs for your own use |

::: tip Description matters
The description is how AI agents decide whether to load your skill. Write it as a trigger condition: describe the task and the situations where this skill should activate. Be specific enough to avoid false triggers, broad enough to catch relevant requests.
:::

## Writing the Instructions

After the frontmatter, write the body of your `SKILL.md`. Follow this structure:

### 1. Context

What the agent needs to understand before doing anything. Keep it short - just enough background to make the right decisions.

```markdown
## Context

LNbits Paywall extension lets you put any URL behind a Lightning payment.
The user pays an invoice, gets redirected to the content. No accounts,
no subscriptions - just a Lightning payment and access.

The extension runs on any LNbits instance with the Paywall extension
enabled. All endpoints require an API key.
```

### 2. Prerequisites

What must be true before the skill can work. Be explicit - agents cannot guess.

```markdown
## Prerequisites

- A running LNbits instance (self-hosted or saas.lnbits.com)
- Paywall extension installed and enabled
- Admin key for the wallet that will receive payments
- The target URL must be accessible (the extension redirects, it does not proxy)
```

### 3. Steps

The core of your skill. Break the task into clear, ordered actions with working code examples.

```markdown
## Steps

### Create a paywall

POST /paywall/api/v1/paywalls

Headers:
  X-Api-Key: <admin-key>

Body:
{
  "amount": 100,
  "description": "Access to premium guide",
  "url": "https://example.com/premium-content",
  "memo": "Premium guide access"
}

Returns the paywall object with an `id` you will use for the payment link.

### Generate the payment page URL

The payment page is at:
  https://<lnbits-host>/paywall/<paywall-id>

Share this URL with users. They see the description, pay the invoice,
and get redirected to the target URL.
```

**Writing tips:**
- Use imperative form: "Create a paywall" not "You should create a paywall"
- Show the endpoint, headers, and body together - agents need copy-ready patterns
- Include the response shape when the agent needs values from it for subsequent steps
- One step per action. Do not combine "create and configure" into one step

### 4. Rules

Hard constraints the agent must follow. These are not suggestions.

```markdown
## Rules

- NEVER expose the admin key in frontend code or client-side requests
- ALWAYS validate that the Paywall extension is enabled before calling its API
- Use invoice keys for read-only operations, admin keys only for create/update/delete
- Do not set amount to 0 - the extension requires a minimum of 1 sat
- If the user does not specify an amount, ask - do not assume a default
```

### 5. Error Handling

Common failures and what to do about them.

```markdown
## Error handling

| Error | Cause | Fix |
|---|---|---|
| 401 Unauthorized | Wrong key type or expired key | Check that you are using an admin key, not an invoice key |
| 404 Not Found | Extension not enabled | Guide user to enable Paywall in Extensions dashboard |
| 400 Bad Request | Missing required field | Check that amount, url, and description are all provided |
```

### 6. Examples

Complete, working examples for the most common use cases. These are what agents will adapt most often.

```markdown
## Examples

### Basic paywall with curl

curl -X POST https://bits.lnbits.com/paywall/api/v1/paywalls \
  -H "X-Api-Key: YOUR_ADMIN_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 100,
    "description": "Premium tutorial access",
    "url": "https://example.com/tutorial",
    "memo": "Tutorial paywall"
  }'

### Python integration

import httpx

async def create_paywall(admin_key: str, url: str, amount: int, description: str):
    async with httpx.AsyncClient() as client:
        response = await client.post(
            "https://bits.lnbits.com/paywall/api/v1/paywalls",
            headers={"X-Api-Key": admin_key},
            json={
                "amount": amount,
                "description": description,
                "url": url,
            },
        )
        response.raise_for_status()
        return response.json()
```

## Best Practices

**Keep it focused.** One skill, one task. "Set up a paywall" is a skill. "Set up a paywall and connect it to a Telegram bot and track analytics" is three skills.

**Show, do not tell.** Agents learn from code examples faster than from descriptions. If you find yourself writing a long paragraph explaining how something works, replace it with a code block that demonstrates it.

**Explain the why, not just the what.** When a rule exists for a reason, state the reason. "Never expose admin keys in frontend code" is good. "Never expose admin keys in frontend code because they grant full wallet control including withdrawals" is better - it helps the agent make correct decisions in edge cases.

**Use progressive disclosure.** Put the most critical information first. Agents may not read your entire skill file for simple tasks. Structure it so that reading just the first few sections is enough for the common case.

**Keep it under 500 lines.** If your skill file is longer, split it into multiple skills or move reference material to the `references/` directory.

**Test with an agent.** Load your skill into Claude Code or another AI agent and try the task. If the agent needs to ask clarifying questions or makes mistakes, your skill is missing information.

## Installing and Sharing Skills

Skills follow the [Agent Skills specification](https://agentskills.io/specification) and can be installed across compatible agents:

```bash
# Install a skill from a GitHub repository
npx skills add owner/repo

# Browse available skills
npx skills search lnbits
```

The [skills.sh](https://skills.sh) directory is the central marketplace for discovering and sharing skills. To publish your LNbits skill, push it to a GitHub repository following the directory structure above.

::: tip Anthropic's Skill Creator
For a guided experience building skills, try Anthropic's [Skill Creator](https://skills.sh/anthropics/skills/skill-creator). It walks you through intent capture, writing, testing, and evaluation with built-in tooling.
:::

## Learn More About Claude

If you are building skills for Claude specifically, Anthropic provides learning resources at [anthropic.com/learn](https://www.anthropic.com/learn):

- **Claude Code in Action** - practical training on Claude Code capabilities
- **Build with Claude** - API guides and best practices for Claude-powered apps
- **Claude for Work** - deploying Claude across teams and organizations

## Template

Use this as a starting point for your own LNbits skill:

```markdown
---
name: lnbits-your-task
description: >
  One-sentence summary of what this skill does.
  Use when [describe the trigger condition].
---

# Your Skill Name

## Context
What the agent needs to know before starting.

## Prerequisites
- Requirement 1
- Requirement 2

## Steps

### Step 1: Do the thing
[endpoint, code, explanation]

### Step 2: Verify it worked
[endpoint, expected response]

## Rules
- NEVER [constraint]
- ALWAYS [requirement]

## Error handling
| Error | Cause | Fix |
|---|---|---|
| ... | ... | ... |

## Examples

### Basic example
[complete working code]
```

## Related Pages

- [Skills Catalog](/llm/skills) - available LNbits skill files
- [LLM Integration](/llm/) - how AI agents consume LNbits documentation
- [API Reference](/api/) - core and admin endpoints
- [Building Extensions](/dev/building-extensions) - extension development guide
