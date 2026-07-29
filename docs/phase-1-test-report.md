# Phase 1 Test Report

Date: 2026-07-30  
Branch: `phase1/mobile-conversion`  
Implementation head before this report: `5aa3673`  
Mode: local validation; no deployment

## Summary

Phase 1 passes the automated local checks for its approved scope. Exact
device-emulated widths were tested through installed headless Chrome using the
local website. The result still requires real Android/iOS, assistive
technology, slow-network, and deployed Netlify verification before release.

## Changed-path boundary

Production diff from audit commit `3d8f074`:

- `index.html`
- `assets/css/site.css`
- `assets/js/site.js`

Approved documentation:

- `docs/phase-1-change-log.md`
- `docs/phase-1-test-report.md`

No path under `assets/images/` or `assets/video/` changed. `netlify.toml` and
the handoff archive remain unchanged.

## HTML and local references

- Local HTML references checked: 20 occurrences.
- Missing local references: 0.
- HTML IDs checked: 22.
- Duplicate IDs: 0.
- `index.html` remains directly in the website root.
- Existing direct WhatsApp links and the form destination use
  `917780478506`.

Result: **pass**.

## JavaScript

- `node --check assets/js/site.js`: passed.
- Personal and bulk intent values were exercised in the rendered page.
- Closed optional details did not add hidden defaults to either message.
- No browser storage, server submission, analytics, or dependency was added.

Result: **pass**.

## Viewport and initial-viewport results

Viewport height for the fold check: 900px.

| Width | Exact inner width | Horizontal overflow | Headline fully visible | Primary CTA fully visible | One-piece proof fully visible | Compact navigation |
| ---: | ---: | --- | --- | --- | --- | --- |
| 360px | 360px | No | Yes | Yes | Yes | Yes |
| 390px | 390px | No | Yes | Yes | Yes | Yes |
| 430px | 430px | No | Yes | Yes | Yes | Yes |
| 768px | 768px | No | Yes | Yes | Yes | Yes |
| 1024px | 1024px | No | Yes | Yes | Yes | No; full navigation fits |
| 1440px | 1440px | No | Yes | Yes | Yes | No; full navigation fits |

The hero image rendered at its responsive square size:

- 360px viewport: 328×328px
- 390px viewport: 358×358px
- 430px viewport: 398×398px
- 768px viewport: 720×720px
- 1024px viewport: 505×505px
- 1440px viewport: 613×613px

Result: **pass**.

## Horizontal overflow

At all six widths, both `document.documentElement.scrollWidth` and
`document.body.scrollWidth` were no wider than `window.innerWidth`.

Result: **pass**.

## Touch targets

Visible anchors, buttons, inputs, selects, textareas, and summaries were
measured at every requested viewport. No visible target was smaller than
44×44px after the final correction.

Result: **pass** for the Phase 1 target rule.

## Contrast

Calculated sRGB contrast ratios:

| Pair | Ratio | Result |
| --- | ---: | --- |
| Navy `#0d1a26` on orange `#e66d48` | 5.57:1 | AA normal text |
| Navy `#0d1a26` on WhatsApp green `#1fa463` | 5.49:1 | AA normal text |
| White `#ffffff` on navy `#0d1a26` | 17.60:1 | AAA |
| Process secondary `#c5d0da` on navy | 11.24:1 | AAA |
| Footer secondary `#aebbc7` on navy | 9.00:1 | AAA |
| Soft navy `#243442` on cream `#fffaf4` | 12.30:1 | AAA |

Result: **pass** for the tested principal text/background pairs.

## Keyboard and focus

At 390px:

1. Activating the menu button set `aria-expanded="true"`.
2. Focus moved to the first menu link, “T-shirts.”
3. Pressing Escape closed the menu.
4. `aria-expanded` returned to `false`.
5. Focus returned to `.nav-toggle`, labelled “Open navigation.”

The existing skip link and `:focus-visible` styling remain present.

Result: **pass** for automated menu/focus checks. Manual screen-reader and
full-page keyboard traversal remain required before release.

## Media loading

- Document images: 14, plus the browser favicon.
- Images with `loading="lazy"`: 12.
- Hero remains eager/high-priority and preloaded.
- Video preload value: `none`.
- Video remains poster-first, controlled, muted, looping, and plays inline.
- No image/video file or source path changed.
- No responsive derivative was created.

Result: **pass** for the current implementation. Network performance still
requires real-device/deployed testing.

## Targeted mobile media fitting

The informational product, printing, process, and customer back-print media
were retested at exact viewport widths of 320, 360, 390, 430, 768, and
1440px. Mobile-specific fitting applies through 460px; the existing desktop
presentation remains unchanged.

| Selector | Mobile fit and position | Mobile container behavior | Full source visible | Empty space and presentation |
| --- | --- | --- | --- | --- |
| `.product-image > img` | `contain`; centered | Parent height `clamp(320px, 105vw, 420px)` with 14px inset | Yes | Possible; deliberate cream/radial product stage |
| `.product-image-pair > img` | `contain`; centered | Same controlled parent; equal flexible columns | Yes | Possible; deliberate and balanced between paired images |
| `.gallery-item img` | `contain`; centered | Image height `clamp(320px, 110vw, 460px)` with 12px inset | Yes | Possible; deliberate cream gallery-card field |
| `.customer-back-grid img` | `contain`; centered | Image height `clamp(360px, 120vw, 500px)` with 8px inset | Yes | Possible; deliberate dark print-viewing field |
| `.video-card video` | `contain`; centered | Responsive 9:16 frame; auto height; no mobile maximum height | Yes | Possible only if source framing differs; deliberate black video field |

Measured mobile media boxes:

| Width | Product single | Product pair, each | Gallery image | Customer back-print | Video |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 320px | 258×308 | 129×308 | 286×352 | 248×384 | 248×441 |
| 360px | 298×350 | 149×350 | 326×396 | 288×432 | 288×512 |
| 390px | 328×382 | 164×381 | 356×429 | 318×468 | 318×565 |
| 430px | 368×392 | 184×392 | 396×460 | 358×500 | 358×636 |

At every tested width, each affected media box remained within the viewport.
No horizontal overflow occurred. `balance-print.webp` and the portrait
gallery sources use the same `contain` rule, so the full printed artwork
remains visible without stretching. The product sources, customer back-print
sources, and full 9:16 video frame also remain visible.

At 768px and 1440px, the pre-existing desktop `cover` presentation remains in
effect. The existing poster-first, non-autoplay behavior remains intact:
`preload="none"` is unchanged and the video was paused on load.

The current sources do not require replacement to satisfy this fitting patch.
For a later visual-quality phase, owner-approved product photography with
matched framing and gallery images with more consistent source composition
would reduce deliberate contain-space without reintroducing crop.

Result: **pass** for mobile fitting and overflow. Physical-device review
remains required before release.

## Reduced-motion and accessibility regression

With `prefers-reduced-motion: reduce` emulated at 390px:

- the media query matched;
- document scroll behavior computed to `auto`;
- reveal transitions computed to effectively zero duration;
- the live-printing video remained paused;
- no autoplay behavior was introduced.

Existing alternative text, video controls, poster-first loading, border
radii, and card hierarchy remain unchanged.

Result: **pass** for the automated regression check.

## WhatsApp personal-order example

```text
Hello Saturn Cheetah Store,

I would like to customise a T-shirt.

Order type: Personal / Small Quantity
Product: 180 GSM Unisex Regular Fit
Quantity: 1
Design status: I have a reference or idea

Please confirm feasibility, final price and timeline. I will attach my design/reference in WhatsApp.
```

Destination: `https://wa.me/917780478506`

Result: **pass**.

## WhatsApp bulk-order example

```text
Hello Saturn Cheetah Store,

I would like a bulk quote.

Order type: Bulk / Business / Event
Product or range: Bulk / Wider Range
Quantity: 50
Design status: I have a ready design

Please confirm suitable options, feasibility, final price and timeline. I will attach my design/reference in WhatsApp.
```

Destination: `https://wa.me/917780478506`

Result: **pass**.

## Unresolved owner decisions and release checks

1. Approve final hero and CTA wording.
2. Approve whether the current hero image remains the Phase 1 release image.
3. Complete a full-resolution and frame-by-frame privacy review of customer
   images and the live-printing video.
4. Confirm publication permission for visible customer or third-party
   artwork.
5. Supply and approve genuine reviews before any review section is added.
6. Confirm sizes, colours, delivery coverage, production timelines, location,
   payment terms, and policy content before publishing those facts.
7. Decide whether future analytics are needed and approve a privacy approach
   before adding them.
8. Test on representative Android and iOS devices, with keyboard/screen
   reader, reduced motion, and a slower Indian mobile-network profile.
9. Validate final Netlify headers and performance only after an approved
   deployment dry run.

## Release boundary

No merge or deployment was performed. Phase 1 should remain on
`phase1/mobile-conversion` until owner review and an exact deployment dry run
receive explicit approval.
