# LNbits Documentation

Official documentation for [LNbits](https://github.com/lnbits/lnbits), the free and open-source Lightning Network wallet and accounts system.

**Live site:** [docs.lnbits.com](https://docs.lnbits.com)

## What's inside

- **User Guide** - Installation, wallets, core features, admin, FAQ
- **API Reference** - All endpoints with examples, auth, parameters
- **Developer Guide** - Architecture, building extensions, deploying, contributing
- **Extensions** - 62 extension pages with docs and API references
- **LLM Integration** - Agent-ready docs, system prompts, llms.txt
- **Skills to Built** - Create own Skill.md files or use existing ones from Core Team and Community to built awesome stuff

## Local development

```bash
# Install dependencies
npm install

# Start dev server
npm run docs:dev

# Build for production
npm run docs:build

# Preview production build
npm run docs:preview
```

## Contributing

Contributions are welcome. Here are some ways to help:

- Fix a typo or broken link
- Improve an extension page
- Add FAQ answers
- Write a tutorial or blog post
- Improve page layouts and components

Edit any Markdown file in `docs/` and open a pull request. Extension pages are auto-generated from their GitHub READMEs, so improve the README upstream and the docs update on the next build.

See the [Contribute page](https://docs.lnbits.com/contribute/) for role-specific guides.

## Built with

- [VitePress](https://vitepress.dev) - Static site generator
- [Vue 3](https://vuejs.org) - Frontend framework

## License

[MIT](LICENSE)
