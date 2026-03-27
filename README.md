# Wonderland Theme

I created this new sub-theme, child theme of **Twenty Twenty-Four** (custom blocks: hero, multi-step modal form, etc.).
Development environment runs on Pantheon using its free Dev server.

I chose a child theme approach to keep a stable, production-ready base while implementing custom functionality and visual requirements with low maintenance risk.

Why this approach:

- It preserves compatibility with WordPress core updates and keeps future maintenance simpler than a fully custom theme from scratch.
- It allows focused customization only where needed (custom blocks, styles, and template parts) without rebuilding foundational behavior already solved by Twenty Twenty-Four.
- It leverages `theme.json` to define project design tokens (colors, typography, spacing, layout) so blocks and global styles share a consistent source of truth.
- It keeps a clear separation between inherited base capabilities and project-specific code, which improves reviewability and onboarding.
- Working directly on an existing theme would also have been a valid option, but using a child theme avoids modifying parent files and reduces regression risk when the parent theme is updated.

## Reusing the Multi-step Modal Form block

Add the block **once** per page/template so the modal exists in the DOM. Default modal id: `multi-step-form-modal` (configurable in block settings). Do not duplicate the same `modalId` on one page.

**Trigger any link/button** with:

- `class` includes `js-open-modal`
- `href="#multi-step-form-modal"` (must match the modal’s `id`)
- `data-modal-target="multi-step-form-modal"` (same value, no `#`)
- Optional: `aria-controls="multi-step-form-modal"`, `aria-haspopup="dialog"`

If you change **Modal ID** in the block, use that value everywhere above — it must match `data-modal-id` on the modal root and the `id` on the dialog (`role="dialog"`).

Example:

```html
<a class="js-open-modal" href="#multi-step-form-modal" data-modal-target="multi-step-form-modal" aria-controls="multi-step-form-modal" aria-haspopup="dialog">I Want a Quote</a>
```

See `parts/header.html` for a live pattern. Multiple CTAs can point to one modal; use two blocks with different `modalId`s only if you need two modals.
