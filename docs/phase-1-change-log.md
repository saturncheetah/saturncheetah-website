# Phase 1 Change Log

Date: 2026-07-30  
Branch: `phase1/mobile-conversion`  
Starting audit commit: `3d8f07463468ab7aeb349c9bba3ef898bdca6dd4`  
Deployment: not performed

## Production files changed

- `index.html`
- `assets/css/site.css`
- `assets/js/site.js`

No image, video, font, `netlify.toml`, handoff, or archive file was modified,
renamed, replaced, cropped, or deleted. No dependency was installed.

## Implementation commits

| Commit | Scope |
| --- | --- |
| `e79cd5f` | Restructured conversion-focused HTML, made the value proposition explicit, added personal/bulk intent hooks, shortened the enquiry markup, moved reassurance before the form, surfaced Instagram near finished work, and added a labelled mobile WhatsApp action. |
| `6fe8d54` | Added the mobile-first token set, copy-first responsive hero, compact navigation below 900px, accessible CTA colours, shorter mobile spacing, optional-detail styling, and labelled safe-area-aware mobile WhatsApp bar. |
| `341442d` | Added transient personal/bulk state, product-intent synchronization, separate WhatsApp message flows, optional-detail handling, and mobile-menu focus management. |
| `334c723` | Corrected validation findings: responsive hero height and closed optional fields leaking default values into messages. |
| `5aa3673` | Enforced the Phase 1 minimum 44×44px target rule for visible links, controls, navigation, FAQ summaries, and contact actions. |

## Targeted mobile media-fitting patch

- `.product-image` now provides a controlled responsive stage with modest
  padding and a deliberate cream/radial background at widths through 460px.
- `.product-image > img` and `.product-image-pair > img` use centered
  `object-fit: contain` and remain constrained to the product stage.
- `.product-image-pair` retains two equal flexible columns without hard-coded
  widths.
- `.gallery-item img`, including `balance-print.webp` and all portrait
  gallery images, uses centered contain fitting inside a consistent
  responsive cream card field.
- `.customer-back-grid img` uses centered contain fitting inside a consistent
  dark field so the full back-print area remains visible.
- `.video-card video` retains its full 9:16 frame using centered contain
  fitting with no mobile maximum-height cap and a black container background.
- `.brand img`, `.footer-brand img`, and `.hero-media img` were not changed.
- No semantic HTML class was necessary, so `index.html` was not modified.
- No media source, poster, loading attribute, playback behavior, or file was
  changed.

Validation covered 320, 360, 390, 430, 768, and 1440px. All affected mobile
media boxes remained within the viewport, no horizontal overflow was found,
local references resolved, JavaScript syntax passed, and reduced-motion
behavior regressed cleanly.

## Customer journey changes

1. The hero now states that customization starts from one piece.
2. It immediately distinguishes 180 GSM regular fit from 240 GSM oversized.
3. Personal and bulk CTAs set the appropriate enquiry intent.
4. The form initially requests only intent, product, quantity, and design
   status.
5. Size, colour, placement, date, city, name, and notes remain optional behind
   an expandable control.
6. Personal and bulk submissions generate different WhatsApp messages.
7. The destination remains `917780478506`.
8. No online payment, account, storage, analytics, or checkout was added.

## Visual-system changes

- Mobile page gutter: 16px.
- Mobile section rhythm: 60px.
- Mobile stack gap: 24px.
- Mobile card padding: 20px.
- Mobile headline range: 44–56px.
- Compact navigation breakpoint: 900px.
- Minimum visible interaction target: 44×44px; primary mobile controls use
  48px or greater.
- CTA foreground changed from white to navy on existing orange and WhatsApp
  green to meet normal-text contrast.
- Hero image now respects its responsive width while retaining the current
  unchanged source file.

## Explicit exclusions

- No responsive image derivative was created.
- No image or video content was changed.
- No customer review section was added.
- No pricing, inventory, delivery promise, scarcity, countdown, customer
  activity, sales number, or testimonial was invented.
- No framework, animation library, 3D library, build tool, or package was
  added.
- No branch was merged and nothing was deployed.
