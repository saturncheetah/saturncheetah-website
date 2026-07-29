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

