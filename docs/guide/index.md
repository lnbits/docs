<HeroImage type="guide" />

# Guide

> Quick-start guide to LNbits - choose an installation method, connect a Lightning backend, and start using wallets, payments, and extensions.

Welcome to the LNbits documentation. LNbits is a free and open-source Lightning Network wallet and accounts system.

## Getting started

New to LNbits? Start here:

1. **[What is LNbits?](/guide/what-is-lnbits)** - overview and core concepts
2. **[Installation](/guide/installation/)** - choose your setup method
3. **[Core features](/guide/core/)** - wallets, payments, API keys

## Installation

Pick the method that fits your environment:

- [Docker](/guide/installation/docker) - recommended for production
- [uv](/guide/installation/uv) - fastest from-source install
- [Poetry](/guide/installation/poetry) - traditional Python setup
- [Node platforms](/guide/installation/node-platforms) - Umbrel, RaspiBlitz, Start9
- [All methods →](/guide/installation/)

## Connect a Lightning backend

LNbits needs a funding source to process real payments:

- [Wallet backends overview](/guide/wallets/)
- [LND](/guide/wallets/lnd-rest) · [Core Lightning](/guide/wallets/clnrest) · [and 20+ more](/guide/wallets/comparison)

## Learn the core

- [Wallets and accounts](/guide/core/wallets-and-accounts)
- [API keys](/guide/core/api-keys)
- [Payments](/guide/core/payments)
- [Configuration](/guide/core/environment)

## Extend

- [Extensions overview](/extensions/)
- [Build your own](/dev/building-extensions)

## Contribute to LNbits

LNbits is built by people like you. Find a task that matches your skills.

<div class="cb">
  <div class="cb-video">
    <iframe src="https://www.youtube.com/embed/LCPt4bkHT7g?si=11EUDAtaQaLGBkVs" title="Contributing to LNbits" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
  </div>
  <div class="cb-roles">
    <a href="/contribute/#developer" class="cb-role">
      <svg class="cb-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
      <div><strong>Developers</strong><span>Core features, extensions, bug fixes</span></div>
    </a>
    <a href="/contribute/#tester" class="cb-role">
      <svg class="cb-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m8 11 2 2 4-4"/><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      <div><strong>Testers</strong><span>QA, edge cases, bug reports</span></div>
    </a>
    <a href="/contribute/#writer" class="cb-role">
      <svg class="cb-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"/></svg>
      <div><strong>Writers</strong><span>Docs, blogs, stories, tutorials</span></div>
    </a>
    <a href="/contribute/#designer" class="cb-role">
      <svg class="cb-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="13.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="10.5" r="2.5"/><circle cx="8.5" cy="7.5" r="2.5"/><circle cx="6.5" cy="12.5" r="2.5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></svg>
      <div><strong>Designers</strong><span>UI, marketing visuals, graphics</span></div>
    </a>
    <a href="/contribute/#entrepreneur" class="cb-role">
      <svg class="cb-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>
      <div><strong>Entrepreneurs</strong><span>Build products, run services</span></div>
    </a>
    <a href="/contribute/#ambassador" class="cb-role">
      <svg class="cb-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>
      <div><strong>Ambassadors</strong><span>Talks, meetups, community outreach</span></div>
    </a>
  </div>
  <a href="/contribute/" class="cb-cta">Find a task that fits you →</a>
</div>

<style>
.cb {
  margin: 20px 0;
  padding: 24px;
  border-radius: 12px;
  border: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
}
.cb-video {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  aspect-ratio: 16 / 9;
  margin-bottom: 20px;
}
.cb-video iframe {
  position: absolute;
  top: 0; left: 0;
  width: 100%; height: 100%;
  border: 0;
}
.cb-roles {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 20px;
}
.cb-role {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 8px;
  background: var(--vp-c-bg);
  text-decoration: none !important;
  color: inherit;
  transition: background 0.2s;
}
.cb-role:hover {
  background: var(--vp-c-bg-alt);
}
.cb-role strong {
  display: block;
  font-size: 13px;
  margin-bottom: 2px;
}
.cb-role span {
  color: var(--vp-c-text-2);
  font-size: 12px;
  line-height: 1.4;
}
.cb-icon {
  flex-shrink: 0;
  color: var(--vp-c-brand-1);
  margin-top: 1px;
}
.cb-cta {
  display: inline-block;
  padding: 10px 20px;
  background: var(--vp-c-brand-1);
  color: var(--vp-c-white) !important;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none !important;
  transition: opacity 0.2s;
}
.cb-cta:hover { opacity: 0.9; }
@media (max-width: 768px) {
  .cb-roles { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 480px) {
  .cb-roles { grid-template-columns: 1fr; }
}
</style>

## Help

- [FAQ](/guide/faq/) - answers organized by topic

## Related Pages

- [What is LNbits?](/guide/what-is-lnbits) - overview and core concepts
- [Installation](/guide/installation/) - choose your setup method
- [Core Features](/guide/core/) - wallets, payments, API keys, and configuration
- [Wallet Backends](/guide/wallets/) - connect a Lightning funding source
