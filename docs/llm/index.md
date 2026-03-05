# LLM Integration

> How AI agents and LLMs can consume LNbits documentation — machine-readable index, structured pages, and copy-as-markdown.

LNbits documentation is designed to be consumed by both humans and machines. This page explains the three layers of LLM integration.

## llms.txt — The Entry Point

Any AI agent that wants to understand LNbits should start by fetching:

```
https://docs.lnbits.com/llms.txt
```

This file follows the [llms.txt standard](https://llmstxt.org/) and provides a structured index of all documentation pages with titles, URLs, and one-sentence summaries.

### What's in llms.txt

```markdown
# LNbits Documentation

> LNbits is a free and open-source Lightning Network wallet...

## Getting Started
- [Overview](https://docs.lnbits.com/guide/): Quick-start guide...
- [What is LNbits?](https://docs.lnbits.com/guide/what-is-lnbits): Architecture overview...

## API Reference
- [Wallets API](https://docs.lnbits.com/api/core/wallets): Wallet CRUD, balance...
...
```

### Full content dump

For agents that want all documentation in one file:

```
https://docs.lnbits.com/llms-full.txt
```

This concatenates all pages into a single file. Use `llms.txt` for targeted lookup, `llms-full.txt` for full context injection.

## Per-Page Structure

Every documentation page follows an LLM-friendly structure:

1. **H1 title** — what this page covers
2. **Summary quote** — one-sentence description (the `>` block after the title)
3. **Code examples first** — show the command, then explain
4. **Tables for structured data** — parameters, config options, feature matrices
5. **Error handling** — common errors with codes and fixes
6. **Related pages** — links to next steps

### Example: How an agent reads a page

```
1. Fetch llms.txt to find the right page
2. Fetch the page URL
3. Parse the H1 for topic
4. Read the summary quote for context
5. Find code blocks for implementation
6. Check tables for parameters/options
7. Follow "Related pages" links if more context needed
```

## Copy for LLM

Every documentation page includes a **"Copy for LLM"** button (bottom-right corner) that lets humans quickly copy page content for pasting into any LLM:

- **Copy as Markdown** — preserves headings, code blocks, tables, and links
- **Copy as Plain Text** — just the text content

This is useful when you want to ask an AI about a specific LNbits feature — copy the relevant docs page and paste it into your conversation.

## Regenerating LLM files

The `llms.txt` and `llms-full.txt` files are generated from the docs source:

```bash
npm run generate:llm
```

Run this after adding or restructuring documentation pages.

## For extension developers

When documenting your extension, follow the LLM-ready structure:

1. Start with a one-sentence summary in a quote block
2. Include an endpoint table (method, path, auth, description)
3. Show curl examples for each endpoint
4. List error codes and their meanings
5. Add a "Related pages" section

See [Building Extensions](/dev/building-extensions) for the full extension development guide.

## Skills — Task-Ready Agent Instructions

For agents that need to perform specific LNbits tasks (integrate an extension, process payments, build on the API), see [Skills](/llm/skills). Skill files provide focused, structured prompts that an agent can load to work with LNbits autonomously.

## Related Pages

- [Skills](/llm/skills) — task-ready instruction files for AI agents
- [User Guide](/guide/index.md)
- [API Reference](/api/index.md)
- [Extensions Index](/extensions/index.md)
