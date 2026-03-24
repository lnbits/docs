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

## Official vs Community Skills

**Official skills** are maintained by the LNbits team. They are reviewed, tested against the current API, and updated with each release. When you use an official skill, you can trust that the endpoints, parameters, and patterns are correct.

**Community skills** are built by independent developers. They may cover niche use cases, experimental workflows, or extension-specific tasks that the core team hasn't prioritized yet.

::: warning Use community skills at your own risk
While we review community skills before listing them here, we cannot guarantee they stay correct, secure, or up to date over time. Always review the skill file before loading it into your agent, especially if it handles API keys, payments, or sensitive data. Check the repo's activity and issues before trusting it.
:::

::: tip Want your skill listed?
Build a skill following the [Create a Skill](/llm/create-skill) guide, publish it on GitHub, and reach out on [Telegram](https://t.me/lnbits). We review submissions before listing.
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
