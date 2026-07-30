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

## Product-selector image validation

Source identity:

- imported black source SHA-256 matches the supplied 994×1583 JPEG;
- imported beige source SHA-256 matches the supplied 993×1583 JPEG;
- no source or derivative was upscaled;
- both WebP families preserve their original portrait ratios.

Responsive candidates and expected CSS display sizes:

| Viewport | Expected display width | 180 GSM display | 240 GSM display | DPR 1 candidate | DPR 2 candidate |
| ---: | ---: | ---: | ---: | --- | --- |
| 320 px | 256 px | 256×408 | 256×408 | 640w | 640w |
| 360 px | 296 px | 296×471 | 296×472 | 640w | 640w |
| 390 px | 326 px | 326×519 | 326×520 | 640w | 994w/993w |
| 430 px | 360 px | 360×573 | 360×574 | 640w | 994w/993w |
| 768 px | 460 px | 460×733 | 460×733 | 640w | 994w/993w |
| 1024 px | 386 px | 386×614 | 386×615 | 640w | 994w/993w |
| 1440 px | 542 px | 542×863 | 542×864 | 640w | 994w/993w |
| 1920 px | 542 px | 542×863 | 542×864 | 640w | 994w/993w |

The wide-desktop selector caps the media at 542 px in the current two-column
container, within the requested 520–560 px range. Narrower layouts reduce the
width to preserve balance.

Fitting checks:

- `width: min(100%, …)` with `max-width: 100%`;
- natural `height: auto`;
- centered `object-fit: contain` and `object-position: center`;
- no scale transition, zoom or fixed image height;
- front and back tees, trousers and shoes remain present in both decoded
  640 px files;
- the image remains in normal flow before the product title and CTA;
- intentional selector containment introduces no horizontal overflow; and
- intrinsic dimensions reserve the portrait ratio before decoding.

All four WebPs, the page, CSS and JavaScript returned HTTP 200 from the local
server. The four responsive paths resolve in both HTML/JavaScript state data,
and `node --check assets/js/site.js` passes.

The browser runtime was unavailable during this update. Source-selection and
layout results above are therefore verified from responsive markup, intrinsic
dimensions and computed layout constraints; final rendered browser and
physical-device inspection remains a release check.

Result: **pass for source integrity, responsive rules, fitting constraints,
local delivery and syntax**.

## Refreshed gallery and custom-story validation

Asset and content checks:

- five 960×960 gallery WebPs decode successfully;
- visible order is black / white / black / white / black;
- card titles are Echo Silhouette, Find Your Balance, Resurrection,
  Knowledge Is Power and Prism Beauty;
- the excluded “Her Pookie” artwork is absent from HTML and production
  assets;
- all four story WebPs decode at their declared dimensions;
- the story video is H.264/AAC, 478×850 and 8.85 seconds;
- the MP4 `moov` atom precedes `mdat`, supporting poster-first progressive
  playback;
- the generated poster visibly comes from the supplied vertical video; and
- the worn photograph was visually checked as a face-free back view.

Responsive source-rule results:

| Viewport | Design presentation | Story presentation | Overflow assessment |
| ---: | --- | --- | --- |
| 320 px | 86.5% scroll-snap cards | Four equal compact tabs; one panel; media ≤282 px high | Bounded |
| 360 px | 86.5% scroll-snap cards | Four equal compact tabs; one panel; media ≤317 px high | Bounded |
| 390 px | 86.5% scroll-snap cards | Four equal compact tabs; one panel; media ≤340 px high | Bounded |
| 430 px | 86.5% scroll-snap cards | Four equal compact tabs; one panel; media ≤340 px high | Bounded |
| 768 px | Five-card grid | One stacked active panel; media 380 px high | Bounded |
| 1024 px | Five-card grid | One two-column active panel; media 410 px high | Bounded |
| 1440 px | Five-card grid | One two-column active panel; media 410 px high | Bounded |

Gallery and story images use `object-fit: contain`, centered positioning and
explicit dimensions. Design hover zoom was removed. The story labels occupy a
separate media row instead of covering artwork, clothing or customer media.
Hidden panels are not vertically stacked in the JavaScript experience, and
story-specific no-JavaScript CSS prevents four media panels from stacking.

Accessibility and interaction checks:

- all story tab IDs, panels and `aria-controls` targets resolve;
- existing Arrow, Home and End keyboard tab behavior applies to all four
  story states;
- pointer swipe ignores video and interactive controls;
- native video controls remain available for tap-to-play;
- video uses `preload="none"` and has no `autoplay`;
- switching tabs pauses video in a hidden panel;
- the CTA is inside a `data-whatsapp-zone`, so the compact floating pill is
  suppressed when the CTA is visible; and
- `node --check assets/js/site.js` passes.

Local delivery:

- page, CSS and JavaScript: HTTP 200;
- five gallery WebPs: HTTP 200;
- four story WebPs: HTTP 200;
- custom-story MP4: HTTP 200;
- missing local references: 0;
- duplicate IDs: 0;
- invalid labels, fragments or `aria-controls`: 0;
- rendered images without explicit dimensions: 0.

Locked selector comparison against `7c28f3b`:

- selector HTML SHA-256:
  `bb4d1cc88b9fd7247bef8dfdea3a3a8e426736743db41023c78ae90c8b925680`;
- selector base CSS SHA-256:
  `708037aaf4493490e809dd29fac40ff6b9e0610a91ed9f7e2f4b89ba9c1892c1`;
- all six selector product-asset SHA-256 checks: passed;
- changed selector JavaScript or WhatsApp-state lines: 0.

The browser runtime remained unavailable. Viewport results are verified from
the responsive layout constraints, decoded media and source relationships;
final physical-device and browser-rendered inspection remains a release
check.

Result: **pass for scoped source, asset, truthfulness, accessibility,
delivery and locked-selector checks**.

## Unresolved owner and release decisions

1. Confirm documented publication permission for all five gallery artworks,
   especially any third-party design elements.
2. Obtain and document customer consent to publish
   `custom-story-worn.webp` before production launch.
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
