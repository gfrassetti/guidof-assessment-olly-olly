# Wonderland Theme

I created this child theme on top of **Twenty Twenty-Four** (custom blocks: hero, multi-step modal form, etc.). Development runs on Pantheon using its free Dev environment.

## What was implemented

- **Hero** as a custom Gutenberg block (`wonderland/hero`) with editor-controlled copy and front-end styles.
- **Multi-step modal form** as a custom block (`wonderland/multi-step-modal-form`) with steps, validation, and accessible dialog behavior.
- **Header** as a block **template part** (`parts/header.html`) so it is part of the theme structure (site-wide, editable in the Site Editor), not only page content.
- **Design tokens** (colors, typography, spacing, layout) extended via **`theme.json`** so the design system stays consistent with the parent theme and the block editor.
- **No ACF**: custom fields were not needed—content and options live in block attributes and the editor, which keeps the stack smaller and everything editable where editors already work.

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
