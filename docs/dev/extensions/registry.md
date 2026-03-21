# Official Registry

> Get your extension listed on the official LNbits extension registry - the default marketplace visible to all LNbits instances.

The official registry is the default extension marketplace that ships with every LNbits instance. Getting listed here gives your extension maximum visibility.

## How to get listed

1. **Build and test** your extension thoroughly
2. **Host on GitHub** with proper releases and zip archives
3. **Submit a PR** to the [lnbits/lnbits-extensions](https://github.com/lnbits/lnbits-extensions) repository
4. **Pass review** by the LNbits maintainers

### Submission PR format

Your PR should add your extension to the official manifest. Include:

- Extension metadata (id, name, description, version)
- GitHub repository link
- Archive download URL
- SHA256 hash of the archive
- A brief description of what the extension does and why it's useful

## Review criteria

The LNbits team reviews extensions for:

| Criteria | What reviewers check |
| --- | --- |
| **Functionality** | Does it work as described? |
| **Security** | No vulnerabilities, no data leaks, no unsafe operations |
| **Code quality** | Follows LNbits patterns, clean code, proper error handling |
| **Dependencies** | No new Python dependencies (must use existing `pyproject.toml` packages) |
| **Database** | Proper namespace, idempotent migrations, works on SQLite + PostgreSQL |
| **UX** | Reasonable UI, clear descriptions, good user experience |
| **Documentation** | README with usage instructions |

::: tip
Review your extension against the [hard rules](/dev/extensions/#hard-rules) before submitting. Extensions that violate these rules are rejected immediately.
:::

## Free vs paid extensions

The registry supports both free and paid extensions:

| Type | How it works |
| --- | --- |
| **Free** | Anyone can install - no payment required |
| **Paid (pay-to-install)** | User must pay a Lightning invoice before the extension is downloaded |
| **Paid (pay-to-enable)** | Extension is downloaded for free but requires payment to activate |

See [Monetization](/dev/extensions/monetization) for configuration details.

## After listing

Once listed, your extension:

- Appears in the extensions marketplace on all LNbits instances (unless the admin has removed the official manifest)
- Can be installed with one click from the UI
- Shows your contributor information and description
- Receives update notifications when you publish new versions

### Publishing updates

1. Create a new GitHub release with the updated zip archive
2. Update the manifest entry with the new version, archive URL, and hash
3. Submit a PR to update the registry
4. After merge, all LNbits instances see the update on their next manifest refresh

## Featured extensions

The LNbits team may feature high-quality, popular extensions. Featured extensions get:

- Priority placement in the extensions list
- Highlighted in the UI
- Mentioned in release notes and community channels

## Notifications

When extensions are updated in the registry, LNbits instances that have the extension installed will show an update notification in the admin panel.

## Related Pages

- [Deploying Extensions](/dev/extensions/) - all deployment methods
- [Remote Manifest](/dev/extensions/manifest) - how manifests work
- [Monetization](/dev/extensions/monetization) - charge for your extension
- [Building Extensions](/dev/building-extensions) - extension development guide
