# Contributing to LNbits Docs

Thanks for helping improve the documentation. Every fix, tutorial, and FAQ answer makes LNbits easier to use.

## Quick wins

- Fix a typo or broken link
- Add a missing "Related Pages" section to any page
- Improve an extension page (these auto-generate from GitHub READMEs)
- Answer an unanswered FAQ question

## How to contribute

1. Fork the repo and create a branch
2. Make your changes in `docs/`
3. Run `npm run docs:dev` to preview locally
4. Open a pull request

## Page conventions

- Every page starts with an H1 title and a summary blockquote (`>`)
- Every page ends with a `## Related Pages` section
- Code examples use `bash` for CLI, `python` for backend, `javascript` for frontend
- Internal links use clean URLs without `.md` extensions (e.g., `/guide/wallets/` not `/guide/wallets/index.md`)
- No em dashes. Use " - ", " ; ", or restructure the sentence

## Extension pages

Extension pages in `docs/extensions/` are auto-generated from each extension's GitHub README at build time via `npm run generate:extensions`. To improve an extension page, update the README in the extension's own repository.

## Roles

Not sure where to start? The [Contribute page](https://docs.lnbits.com/contribute/) has role-specific guides for developers, testers, writers, designers, entrepreneurs, and ambassadors.

## Community

- [Telegram](https://t.me/lnbits) - Main community chat
- [GitHub Issues](https://github.com/lnbits/lnbits/issues) - Bug reports
- [GitHub Discussions](https://github.com/lnbits/lnbits/discussions) - Longer questions
