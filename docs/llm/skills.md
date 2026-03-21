# Skills

> Skill files teach AI agents how to work with LNbits - integrating extensions into apps, using core features programmatically, and following LNbits standards.

Skills are structured instruction files (`.md`) that give AI agents the context they need to build on LNbits autonomously. Instead of an agent searching through documentation, a skill file provides a focused, task-ready prompt with the right endpoints, patterns, and constraints.

## What is a skill file?

A skill file is a markdown document designed to be loaded into an AI agent's context. It contains everything the agent needs to complete a specific LNbits task:

- **What** the feature or integration does
- **How** to use it (endpoints, parameters, code patterns)
- **Rules** and constraints to follow
- **Examples** of correct usage

Think of it as a cheat sheet that turns a general-purpose AI agent into one that knows LNbits.

## When to use skills

| Scenario | Example skill |
| --- | --- |
| **Integrate an extension into your app** | "Use the LNURLp extension to create pay links via API" |
| **Use a core LNbits feature** | "Create wallets and process payments with the LNbits API" |
| **Build a new extension** | "Follow LNbits extension standards: file structure, models, migrations, API patterns" |
| **Audit an extension** | "Vet this extension against LNbits quality and security standards" |
| **Accept fiat payments** | "Integrate Stripe checkout via the LNbits fiat payment system" |
| **Set up hold invoices** | "Create, settle, and cancel hold invoices with proper status tracking" |

## Skill file structure

A well-structured skill file follows this pattern:

```markdown
# Skill Name

> One-sentence summary of what this skill enables.

## Context
What the agent needs to know before starting.

## Prerequisites
APIs, extensions, or configuration that must be in place.

## Steps
The task broken into clear, ordered actions with code examples.

## Rules
Hard constraints - things the agent must or must not do.

## Error handling
Common failures and how to recover.

## Examples
Complete working examples for the most common use cases.
```

## Available skills

Skills for LNbits are being developed. This page will be updated as they are published.

<!-- Future skills will be listed here as they are created -->

## Creating a skill file

If you build integrations with LNbits and want to make them agent-ready:

1. **Pick one task** - each skill should do one thing well
2. **Include working code** - agents need copy-paste-ready examples with real endpoints
3. **State prerequisites explicitly** - which extensions must be installed, which API keys are needed
4. **Add constraints** - what the agent should never do (e.g., "never expose the admin key to the frontend")
5. **Test with an agent** - load the skill into an AI agent and verify it can complete the task without extra context

## Related Pages

- [LLM Integration](/llm/) - how AI agents consume LNbits documentation
- [API Reference](/api/) - core and admin endpoints
- [Building Extensions](/dev/building-extensions) - extension development guide
- [Extensions](/extensions/) - available extensions
