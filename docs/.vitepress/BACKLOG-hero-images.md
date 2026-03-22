# Backlog: Hero Images for Documentation Pages

## Summary
Add full-width SVG hero illustrations at the top of major documentation pages, like Spark does. Each illustration visually represents the page topic and works in both light and dark mode.

## Pages that need hero images

### Priority 1 (High-traffic landing pages)
1. `/guide/` - User Guide overview (wallet + extensions visual)
2. `/api/` - API Reference overview (endpoints + request/response flow)
3. `/dev/architecture` - Architecture (system diagram style)
4. `/extensions/` - Extensions overview (grid of extension icons)
5. `/contribute/` - Already has role cards, may not need additional hero

### Priority 2 (Section landing pages)
6. `/guide/installation/` - Installation methods (Docker, uv, Nix icons)
7. `/guide/wallets/` - Wallet backends (funding source logos flow)
8. `/guide/core/` - Core features (payments, LNURL, labels visual)
9. `/guide/faq/` - FAQ (question marks, search visual)
10. `/dev/building-extensions` - Building extensions (code editor + puzzle pieces)
11. `/dev/extensions/` - Deploying extensions (upload + registry visual)

### Priority 3 (Individual feature pages)
12. `/guide/core/wallets-and-accounts` - Wallet tree/hierarchy
13. `/guide/core/payments` - Payment flow (send/receive arrows)
14. `/guide/core/lnurl/overview` - LNURL (QR code + lightning)
15. `/guide/admin-dashboard` - Dashboard UI sketch
16. `/api/quick-reference` - Endpoint table visual

## SVG Design Guidelines
- ViewBox: `0 0 960 200` (full content width, short height)
- Style: Hand-drawn/organic line art (matching contribute page illustrations)
- Colors: Use CSS variables (`var(--vp-c-brand-1)`, `var(--vp-c-text-3)`, `var(--vp-c-divider)`)
- Opacity: Keep elements at 0.1-0.3 opacity (subtle, not distracting)
- Animations: Optional gentle float on 1-2 accent elements
- Dark/light: Use `var()` colors so they adapt automatically
- No text content in SVGs (accessibility)

## Implementation
- Create a `HeroImage.vue` component that accepts a `type` prop
- Each type renders a different SVG inline
- Place via frontmatter or manual inclusion at top of each page
- Or: use `doc-top` VitePress slot with route-based rendering

## Execution Plan (step by step, fresh sessions)

### Session 1: Priority 1 (4 SVGs) - START HERE
- [ ] `/guide/` - User Guide overview (wallet + extensions visual)
- [ ] `/api/` - API Reference overview (endpoints + request/response flow)
- [ ] `/dev/architecture` - Architecture (system diagram style)
- [ ] `/extensions/` - Extensions overview (grid of extension icons)
- Review quality before proceeding

### Session 2: Priority 2a (3 SVGs) - DONE
- [x] `/guide/installation/` - Installation methods (Docker, uv, Nix icons)
- [x] `/guide/wallets/` - Wallet backends (funding source logos flow)
- [x] `/guide/core/` - Core features (payments, LNURL, labels visual)
- Review quality before proceeding

### Session 3: Priority 2b (3 SVGs)
- [ ] `/guide/faq/` - FAQ (question marks, search visual)
- [ ] `/dev/building-extensions` - Building extensions (code editor + puzzle pieces)
- [ ] `/dev/extensions/` - Deploying extensions (upload + registry visual)
- Review quality before proceeding

### Session 4: Priority 3 (6 SVGs) - only if Sessions 1-3 look good
- [ ] `/guide/core/wallets-and-accounts` - Wallet tree/hierarchy
- [ ] `/guide/core/payments` - Payment flow (send/receive arrows)
- [ ] `/guide/core/lnurl/overview` - LNURL (QR code + lightning)
- [ ] `/guide/admin-dashboard` - Dashboard UI sketch
- [ ] `/api/quick-reference` - Endpoint table visual
- [ ] `/guide/core/extension-builder` - Extension Builder wizard

## Quality Rules
- Max 4-5 SVGs per session (quality degrades with more)
- Start each session fresh (new conversation)
- Review each batch before proceeding to next
- Use CSS variables for colors (auto light/dark)
- Opacities: 0.2-0.5 range (visible but not distracting)
- Style: organic line art, not geometric/rigid

## Implementation
- Create `HeroImage.vue` component in Session 1
- Uses `type` prop mapped to inline SVGs
- Placed via `doc-before` slot or frontmatter-based rendering
- ViewBox: `0 0 960 200` (full content width)

## Priority
Medium. Visual polish that adds professional feel.
