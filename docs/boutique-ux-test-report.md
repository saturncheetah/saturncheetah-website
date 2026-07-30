# Boutique UX V2 Test Report

Date: 2026-07-30  
Branch: `implementation/full-boutique-redesign-v2`  
Mode: local source and HTTP validation; no deployment

## Summary

The complete redesigned journey passes the available automated source,
reference, syntax, asset and local-server checks. Browser automation was not
available in this workspace session, so exact rendered dimensions, keyboard
traversal, source selection, LCP/CLS and horizontal-overflow measurements
remain explicit private-preview checks rather than being reported as
completed.

## Changed-path boundary

Allowed production paths changed:

- `index.html`
- `assets/css/site.css`
- `assets/js/site.js`
- eight approved files under `assets/images/boutique/`

Allowed documentation paths added:

- `docs/boutique-ux-change-log.md`
- `docs/boutique-ux-test-report.md`

`netlify.toml`, production configuration and historical media are unchanged.

Result: **pass**.

## HTML and local references

- IDs checked: 53
- duplicate IDs: 0
- local stylesheet/script/image/poster/video references checked: 21
- missing local references: 0
- invalid local fragment targets: 0
- invalid label targets: 0
- invalid `aria-controls` targets: 0
- rendered `<img>` elements: 17
- rendered images without explicit dimensions: 0
- old unsafe customer/process image references in rendered output: 0
- review/testimonial sections in rendered output: 0

The installed legacy HTML parser reports only its expected lack of HTML5
element recognition; it reports no additional encoded-ampersand or structural
errors after UTF-8 parsing.

Result: **pass**.

## JavaScript and CSS

- `node --check assets/js/site.js`: passed.
- `git diff --check`: passed.
- CSS braces: 277 opening, 277 closing.
- Dependencies, modules and external animation libraries: none.
- WhatsApp phone constant: `917780478506`.
- Local required-date minimum uses the visitor’s local date.

Result: **pass**.

## Local HTTP responses

A temporary localhost server returned HTTP 200 for:

- `/`
- `/assets/css/site.css`
- `/assets/js/site.js`
- `/assets/images/boutique/hero-mobile.webp`
- `/assets/images/boutique/hero-desktop.webp`
- `/assets/images/products/regular-180-black-white.webp`
- `/assets/images/products/oversized-240-white.webp`
- `/assets/video/live-printing-demo.mp4`

The served HTML SHA-256 matched the working-tree `index.html`.

Result: **pass**.

## Responsive rule audit

| Width | Header/navigation rule | Hero source rule | Selector/layout rule | Intentional scrollers | Static overflow assessment |
| ---: | --- | --- | --- | --- | --- |
| 320px | 60 px compact menu | portrait | single-column; two segments | 1.15 cards | Pass by bounded/minmax rules |
| 360px | 60 px compact menu | portrait | single-column; two segments | 1.15 cards | Pass by bounded/minmax rules |
| 390px | 60 px compact menu | portrait | single-column; two segments | 1.15 cards | Pass by bounded/minmax rules |
| 430px | 60 px compact menu | portrait | single-column; two segments | 1.15 cards | Pass by bounded/minmax rules |
| 768px | 60 px compact menu | desktop 16:9 | single-column editorial | none | Pass by bounded/minmax rules |
| 1024px | full navigation | desktop 16:9 | two-column editorial | none | Pass by bounded/minmax rules |
| 1440px | full navigation | desktop 16:9 | two-column editorial | none | Pass by bounded/minmax rules |
| 1920px | full navigation | desktop 16:9 | max-width editorial | none | Pass by bounded/minmax rules |

The mobile scrollers use their own `overflow-x: auto`; all other grids use
`minmax(0, 1fr)`, bounded containers and responsive media. The floating pill
is compact and right-aligned rather than full width.

Result: **pass for source-rule audit**. Browser measurement at every width is
still required before release.

## Accessibility audit

Implemented and source-verified:

- semantic header, navigation, main, section and footer landmarks;
- skip link and globally visible `:focus-visible` outline;
- explicit label associations for every form control;
- radio-based T-shirt segmented control with an `aria-live` update;
- ARIA tabs with Arrow, Home and End key behavior;
- menu Escape handling, focus containment and return focus;
- native `<dialog>` with close, previous/next and Left/Right behavior;
- native `<details>` FAQ and optional form details;
- poster-first video with native controls and no autoplay;
- progressive no-JavaScript fallback for tab panels; and
- reduced-motion CSS plus paused video behavior.

Principal calculated contrast ratios:

| Pair | Ratio |
| --- | ---: |
| Cream on charcoal | 18.96:1 |
| Muted cream on charcoal | 12.16:1 |
| Orange on charcoal | 8.41:1 |
| Charcoal on orange | 8.41:1 |
| Charcoal on WhatsApp green | 10.04:1 |
| Tee body copy on light sand | 7.00:1 |
| Secondary body copy on warm sand | 5.17:1 |

Result: **pass for static semantics and principal contrast**. Full keyboard,
screen-reader, 200% zoom and physical touch-target measurement remain
private-preview checks.

## Media and performance

- all eight imported production assets are WebP;
- desktop hero: 1600×900, approximately 173 KB;
- mobile hero: 960×1200, approximately 130 KB;
- hero is the only `fetchpriority="high"` image;
- below-the-fold images use lazy loading;
- every image declares dimensions;
- printing video uses `preload="none"`, a poster and no autoplay;
- JavaScript is approximately 20 KB uncompressed;
- CSS is approximately 31 KB uncompressed; and
- no external library, font request, analytics or payment code was added.

Result: **pass for asset/loading policy**. Network throttling and rendered
LCP/CLS require the private preview.

## WhatsApp message examples

### 180 GSM custom-design pathway

```text
Hello Saturn Cheetah Store,

I’d like to customise an 180 GSM regular-fit T-shirt.

Product: 180 GSM Unisex Regular Fit
Quantity: 1
Design status: I have a reference or idea

I will attach my design or reference in WhatsApp.
Please confirm feasibility, final price and timeline.
```

### 240 GSM direct enquiry

```text
Hello Saturn Cheetah Store,

I’d like to continue with a 240 GSM Oversized enquiry.

Product: 240 GSM Unisex Oversized
Design status: I will share my design, reference or idea in WhatsApp.

Please confirm feasibility, final price and timeline.
```

### Bottles bulk enquiry

```text
Hello Saturn Cheetah Store,

I’d like to discuss a bulk custom order.

Product: Bottles
Purpose: Team, event or brand merchandise
Design status: I will share the details in WhatsApp.

Please help me confirm suitable options, quantity, final price and timeline.
```

All messages resolve to `https://wa.me/917780478506`.

Result: **pass for source-generated destination and message differentiation**.
Browser handoff to WhatsApp remains a private-preview check.

## Unresolved owner and release decisions

1. Supply and approve one matched, face-free 180 GSM / 240 GSM product-image
   pair. The current selector images are honest provisional existing assets,
   not a matched pair.
2. Confirm documented publication permission for all five gallery artworks,
   especially any third-party design elements.
3. Confirm the live-printing video has passed final frame-by-frame privacy and
   consent review.
4. Confirm final acceptance of the stylised branding embedded in the approved
   generated boutique hero/category images; the official live logo remains
   authoritative.
5. Complete browser and physical-device validation at the eight required
   widths before merging or deploying.

Reviews remain intentionally omitted until genuine permissioned material is
provided.

## Release boundary

No deployment, merge, Netlify configuration change, DNS change, historical
asset deletion or dependency installation was performed.
