# Contributing to LNbits Docs

Thanks for helping improve LNbits. Every fix, tutorial, and FAQ answer makes LNbits easier to use.

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

## Labels that surface work to contributors

The [Contribute page](https://docs.lnbits.com/contribute/) links to filtered views of open issues and PRs on [`lnbits/lnbits`](https://github.com/lnbits/lnbits). Three labels power those views - apply them when opening or triaging so your issue or PR shows up for the right audience:

- [`good first issue`](https://github.com/lnbits/lnbits/labels/good%20first%20issue) - Small, well-scoped tasks suitable for a first-time contributor. Use sparingly: the issue must be solvable without deep project context.
- [`needs-testing`](https://github.com/lnbits/lnbits/labels/needs-testing) - A PR or issue that needs community testing (run it locally, exercise the feature, report back) before it can be merged or closed. This is distinct from `awaiting review`, which is for maintainer code review.
- [`design`](https://github.com/lnbits/lnbits/labels/design) - UI, UX, or visual design work - mockups, flows, styling, illustrations. Narrower than `frontend`, which covers any user-facing code change.

If you are a maintainer, add these labels as part of triage. If you are opening an issue or PR, suggesting one of these labels in the description is welcome.

## Community

- [Telegram](https://t.me/lnbits) - Main community chat
- [Community Forum](https://community.lnbits.com) - Searchable discussions. Common Forum for all LNbits related questions.
- [GitHub Issues](https://github.com/lnbits/lnbits/issues) - Bug reports
- [GitHub Discussions](https://github.com/lnbits/lnbits/discussions) - Longer questions
