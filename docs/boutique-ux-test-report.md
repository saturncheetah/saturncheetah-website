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

- IDs checked: 71
- duplicate IDs: 0
- local stylesheet/script/image/poster/video references checked: 21
- missing local references: 0
- invalid local fragment targets: 0
- invalid label targets: 0
- invalid `aria-controls` targets: 0
- rendered `<img>` elements: 18
- rendered images without explicit dimensions: 0
- old unsafe customer/process image references in rendered output: 0
- supplied review sections in rendered output: 1

The installed legacy HTML parser reports only its expected lack of HTML5
element recognition; it reports no additional encoded-ampersand or structural
errors after UTF-8 parsing.

Result: **pass**.

## JavaScript and CSS

- `node --check assets/js/site.js`: passed.
- `git diff --check`: passed.
- CSS braces: 369 opening, 369 closing.
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

## Responsive gallery and mobile category validation

Responsive constraint results:

| Viewport | Gallery card/frame | Gallery mode | Mobile category media |
| ---: | --- | --- | --- |
| 320 px | 268.8×336 px | Horizontal scroll snap | Superseded 4:3 pass |
| 360 px | 302.4×378 px | Horizontal scroll snap | Superseded 4:3 pass |
| 390 px | 327.6×409.5 px | Horizontal scroll snap | Superseded 4:3 pass |
| 430 px | 340×425 px | Horizontal scroll snap | Superseded 4:3 pass |
| 768 px | 190×237.5 px | Horizontal row | Desktop rules unchanged |
| 1024 px | 240×300 px | Horizontal row | Desktop rules unchanged |
| 1440 px | approximately 210.4×263 px | Five-card row | Desktop rules unchanged |

The five square source designs are contained and centred inside the declared
4:5 frames, so the hanger, tee and artwork remain complete. The frame centres
any intentional breathing room instead of placing it above the product, and
the title remains in normal flow directly below the image. The gallery hides
its scrollbar and has no nested vertical scrolling.

The category column records the first constrained 4:3 pass. Physical-phone
review later showed that pass still cropped; the diagnostic and replacement
validation below supersede those category results.

The gallery itself now participates in the existing WhatsApp-zone observer.
The floating pill is therefore suppressed while gallery content is visible,
as it already is throughout the secondary-products section. No message
builder or WhatsApp destination changed.

The Worn panel source contains no public-facing face-hiding, privacy,
publication-permission, consent or internal-asset wording. Its visible copy is
limited to **04 Worn** and “See how the finished custom tees look in real
life.”

Static and local-delivery checks:

- 20 unique local asset references resolve; missing references: 0;
- duplicate IDs: 0;
- CSS braces: 293 opening and 293 closing;
- page, CSS and JavaScript return HTTP 200 locally;
- `git diff --check` passes;
- `node --check assets/js/site.js` passes; and
- JavaScript, category assets, gallery assets and story media are unchanged.

Locked-selector comparison against `7c28f3b`:

- complete selector HTML range SHA-256 matches:
  `3c670f9c5c3af6d1ed576b4680036a24d08c058e9a87a43182c078074e38d389`;
- selector base CSS SHA-256 matches:
  `708037aaf4493490e809dd29fac40ff6b9e0610a91ed9f7e2f4b89ba9c1892c1`;
- selector product-data SHA-256 matches:
  `dec5817210d98ee71f035193a6af20c2fd0316592954b4b5e4cd592b695e0d26`;
- selector update-function SHA-256 matches:
  `aec398c64dcf832ba94750ea3a865800357ec438a1c46cd45bf8a31910174da3`;
- selector product assets changed: 0; and
- JavaScript changed in this update: 0.

The browser runtime was unavailable. The requested widths were validated from
the responsive constraints, intrinsic asset dimensions, containment rules and
local delivery; final browser-rendered and physical-device inspection remains
a release check.

Result: **pass for scoped responsive rules, complete-image containment,
public Worn copy, local delivery, syntax and locked-selector integrity**.

## Secondary-product mobile crop diagnostic

The secondary module contains five direct `<img>` elements. It contains no
`<picture>`, `<source>`, product `background-image`, secondary-card
pseudo-element, `background-size: cover` or `object-fit: cover` rule.

The following pre-fix measurements are calculated CSS-pixel dimensions at
390 px from the declared flex and box model. The connected browser runtime
was unavailable; “source bounds visible” reflects the reported physical-phone
result.

| Card | Source | Pre-fix image box | Pre-fix media wrapper | `object-fit` | Wrapper overflow | Complete source bounds | Crop-producing rule chain |
| --- | ---: | ---: | ---: | --- | --- | --- | --- |
| Caps | 900×1125 | 287.7×210.8 | 307.7×230.8 | `contain` | `hidden` | No—physical report | 4:3 wrapper + `height:100%` + possible `scale(1.025)` |
| Coasters | 900×1125 | 287.7×210.8 | 307.7×230.8 | `contain` | `hidden` | No—physical report | 4:3 wrapper + `height:100%` + possible `scale(1.025)` |
| Mugs | 900×1125 | 287.7×210.8 | 307.7×230.8 | `contain` | `hidden` | No—physical report | 4:3 wrapper + `height:100%` + possible `scale(1.025)` |
| Tote Bags | 1448×1086 | 287.7×210.8 | 307.7×230.8 | `contain` | `hidden` | No—physical report | 4:3 wrapper + `height:100%` + possible `scale(1.025)` |
| Bottles | 1448×1086 | 287.7×210.8 | 307.7×230.8 | `contain` | `hidden` | No—physical report | 4:3 wrapper + `height:100%` + possible `scale(1.025)` |

The relevant rules were the base `.secondary-image { overflow: hidden; }`,
the former mobile `.secondary-image { aspect-ratio: 4 / 3; }`, the former
mobile `.secondary-image img { height: 100%; max-height: 100%; }`, and
`.secondary-card:hover img { transform: scale(1.025); }`. The prior mobile
pass changed `object-fit` but retained this constrained sizing and clipping
chain.

## Secondary-product natural-height validation

Post-fix dimensions preserve each source ratio. The media wrapper includes
10 px padding on every edge:

| Viewport | Card width | Caps / Coasters / Mugs image | Portrait wrapper | Tote Bags / Bottles image | Landscape wrapper |
| ---: | ---: | ---: | ---: | ---: | ---: |
| 320 px | 249.1 | 227.1×283.9 | 247.1×303.9 | 227.1×170.3 | 247.1×190.3 |
| 360 px | 283.7 | 261.7×327.2 | 281.7×347.2 | 261.7×196.3 | 281.7×216.3 |
| 390 px | 309.7 | 287.7×359.6 | 307.7×379.6 | 287.7×215.8 | 307.7×235.8 |
| 430 px | 344.3 | 322.3×402.8 | 342.3×422.8 | 322.3×241.7 | 342.3×261.7 |

Final mobile chain for all five cards:

- image: `display: block`, `width: 100%`, `max-width: 100%`,
  `height: auto`, `max-height: none`, `aspect-ratio: auto`,
  `object-fit: contain`, `object-position: center`, `transform: none`;
- wrapper: natural `height: auto`, no minimum or maximum height, no aspect
  ratio, 10 px padding and warm-neutral background;
- card: auto height with title and WhatsApp link in normal flow;
- scroller: existing horizontal scroll snap, cross-axis start alignment and
  no nested vertical scrollbar.

All five decoded source images were visually compared at full dimensions.
Natural-ratio rendering maps the complete source rectangle—including all four
corners—inside the padded wrapper. No cover, scale, zoom, fixed media height
or crop-producing transform applies on mobile.

The base desktop `.secondary-section` through `.secondary-copy` block matches
its pre-fix state byte-for-byte. HTML, JavaScript, source images, product
names, ordering, copy, links and WhatsApp logic are unchanged.

Locked-selector comparison against `7c28f3b` remains unchanged:

- selector HTML range: match;
- selector base CSS: match;
- selector product data and update function: match;
- selector product assets changed: 0.

Static checks: local references missing: 0; five secondary images and five
links remain present; CSS braces balance; `git diff --check` and
`node --check assets/js/site.js` pass.

Result: **pass for natural-ratio mobile media, complete source bounds,
unchanged desktop category styling and locked-selector integrity**.

## Bulk T-shirts and embroidery validation

Default and expanded behavior:

- `bulk-options-panel` is hidden by default;
- the semantic toggle has `aria-expanded="false"` and resolves
  `aria-controls="bulk-options-panel"`;
- the expanded form contains nine labelled, required fields;
- button, fields and CTA meet the existing minimum 44 px control sizing;
- the default desktop presentation is a compact horizontal summary;
- mobile uses one column with no fixed height or horizontal overflow; and
- the card participates in the existing WhatsApp-zone observer, so the
  floating pill cannot cover the form CTA.

Every public embroidery reference is in the **Bulk T-shirts & Embroidery**
context. The chip says **Bulk Embroidery**, the summary and helper text state
bulk availability, both relevant form choices say “bulk orders only”, and the
generated message repeats that limitation.

Sample generated message:

```text
Hello Saturn Cheetah Store,

I’d like a quote for a bulk T-shirt order.

Organisation / purpose: Northside Running Club uniforms
Product type: Polo / Collar Neck T-shirts
Quantity: 120
Preferred colours: Black and orange
Size breakup: S: 20, M: 40, L: 40, XL: 20
Printing / bulk embroidery: Printing and bulk embroidery (bulk orders only)
Branding position: Left chest and back
Required date: 2026-09-15
Delivery city: Ahmedabad

I understand embroidery is available for bulk orders only.
Please help me confirm suitable fabric, GSM, colours, final price and timeline.
```

The WhatsApp URL is generated through the existing phone constant
`917780478506`. Existing personal and secondary-product message builders are
unchanged.

## Customer-review validation

Content checks:

- review cards: exactly 5;
- order: Gyan G., Vikas R., Karan H., Sharang M., Kinjal M.;
- rating text: five stars and “5 out of 5 stars” on every card;
- source label: “Google Review” on every card;
- profile photographs: 0;
- owner replies: 0;
- review dates: 0;
- verified-purchase labels: 0;
- Google link:
  `https://share.google/ArvbmBL3G2J7yAaLp`;
- safe new-tab attributes: `target="_blank"` and
  `rel="noopener noreferrer"`.

Responsive constraint results:

| Viewport | Card width | Visible behavior |
| ---: | ---: | --- |
| 320 px | 268.8 px | One main card plus next-card edge; native swipe |
| 360 px | 302.4 px | One main card plus 13.6 px next-card preview |
| 390 px | 327.6 px | One main card plus 18.4 px next-card preview |
| 430 px | 360 px | One main card plus 26 px next-card preview |
| 768 px | approximately 353 px | Two cards; controls available |
| 1024 px | approximately 311 px | Three cards; controls available |
| 1440 px | approximately 383 px | Three cards; controls available |

The mobile scroller uses native horizontal scrolling, 84vw cards, scroll
snap, a hidden scrollbar and no vertical overflow or autoplay. The live
position text starts at “1 of 5” and updates after swipe or navigation.
Desktop previous/next buttons have accessible names and
`aria-controls="reviews-scroller"`; the focused scroller also supports Left
and Right Arrow navigation. Reduced-motion mode changes programmatic review
movement from smooth to immediate.

## Scoped regression checks

- duplicate IDs: 0;
- missing labels, fragment targets or `aria-controls`: 0;
- missing local references: 0;
- page, CSS and JavaScript: HTTP 200 locally;
- `git diff --check`: passed;
- `node --check assets/js/site.js`: passed;
- selector HTML, base CSS and product-data hashes match `7c28f3b`;
- selector product assets changed: 0;
- Explore Our Designs HTML hash matches `bc223f9`;
- connected-story HTML hash matches `bc223f9`;
- secondary-products HTML hash matches `bc223f9`;
- mobile secondary-product fitting hash matches `bc223f9`;
- image, video and Netlify configuration changes: 0.

The connected browser runtime remained unavailable. The requested widths were
validated from the responsive CSS constraints and local delivery; final
browser-rendered keyboard traversal and physical-device inspection remain
release checks.

Result: **pass for approved bulk/review content, accessibility structure,
responsive constraints, local delivery and locked-section integrity**.

## Dark-wood design-direction validation

Changed visual chain:

- outer section: `.direction-section`;
- shell/navigation: `.direction-section .tab-module`,
  `.direction-section .tab-list` and its tab states;
- active panel: `.direction-section .tab-panel`;
- gallery cards: scoped `.design-card`, image and label surfaces;
- custom pathway: scoped `.customise-form`, fields, optional details and
  helper copy.

Final palette:

| Role | Value |
| --- | --- |
| Main near-black | `#0d0c0b` |
| Dark walnut transition | `#17110d` |
| Card surface | `#151515` |
| Raised/field surface | `#191817` |
| Dark inset surface | `#11100f` |
| Bronze border | `rgb(205 139 72 / 28%)` |
| Primary text | `#fff8ef` |
| Secondary text | `#cfc3b5` |
| Placeholder text | `#9e9285` |
| Grain | `rgb(205 139 72 / 2.2%)` |
| Active tab | existing `var(--orange)` |

Contrast calculations:

- primary text on card: 17.33:1;
- secondary text on main panel: 11.29:1;
- secondary text on card: 10.54:1;
- placeholder text on field: 5.83:1.

Responsive constraint results:

| Viewport | Gallery presentation | Surface result |
| ---: | --- | --- |
| 320 px | 268.8×336 px card; native snap | Near-black/walnut grain, no flat brown block |
| 360 px | 302.4×378 px card; native snap | Near-black/walnut grain, no flat brown block |
| 390 px | 327.6×409.5 px card; native snap | Near-black/walnut grain, no flat brown block |
| 430 px | 340×425 px card; native snap | Near-black/walnut grain, no flat brown block |
| 768 px | 190×237.5 px cards; horizontal row | Broad asymmetric gradient; no wallpaper tile |
| 1024 px | 240×300 px cards; horizontal row | Broad asymmetric gradient; no wallpaper tile |
| 1440 px | approximately 210.4×263 px; five-card row | Broad asymmetric gradient; no wallpaper tile |

The grain is a single low-opacity CSS layer over two large asymmetric radial
highlights and a full-section walnut transition. It has no separate tile
asset, text overlay or high-contrast motif. Card and form surfaces are solid
charcoal, keeping black and white T-shirt imagery distinct from the outer
texture.

Regression checks:

- gallery HTML, images, titles and order: unchanged;
- image dimensions, `object-fit: contain`, centred positioning and card
  sizing: unchanged;
- mobile scroll snap and intentional horizontal scroller: unchanged;
- gallery `data-whatsapp-zone`: unchanged, so the floating pill remains
  suppressed over gallery content;
- Create Your Own markup, behavior and WhatsApp logic: unchanged;
- selector HTML/base CSS/product-data hashes match `7c28f3b`;
- all non-direction HTML, JavaScript, assets, video and Netlify
  configuration: unchanged;
- local page, CSS, JavaScript and representative black/white designs:
  HTTP 200;
- CSS braces: 354 opening and 354 closing;
- `git diff --check` and `node --check assets/js/site.js`: passed.

The connected browser runtime remained unavailable. Responsive results are
verified from the unchanged layout rules, scoped cascade, contrast
calculations and local delivery; final physical-device/browser visual review
remains a release check.

Result: **pass for scoped dark-wood styling, contrast, unchanged layout and
locked-module integrity**.

## Neutral-surface and equal-card validation

Root-cause verification:

- Caps, Coasters and Mugs are 900×1125 portrait WebPs;
- Tote Bags and Bottles are 1448×1086 landscape WebPs;
- the superseded mobile rule removed the wrapper ratio and used intrinsic
  image height, so the landscape wrappers rendered shorter; and
- there is no background-image, pseudo-element or `<picture>` source in the
  affected card chain.

The corrected mobile chain is:

- `.secondary-scroller`: stretching horizontal scroll-snap row;
- `.secondary-card`: identical 86.5% flex basis and stretching flex column;
- `.secondary-image`: full-width 4:3 grid, centered content, 10 px padding,
  neutral `#151515` image well and hidden overflow;
- `.secondary-card .secondary-image img`: 100% width and height, 100% maximum
  width and height, centered `object-fit: contain`, and no transform,
  transition, scale or zoom; and
- `.secondary-copy`: 132 px minimum height with the WhatsApp link pushed to
  the common lower alignment.

Calculated mobile box constraints:

| Viewport | Card width | Media frame | Minimum total card height |
| ---: | ---: | ---: | ---: |
| 320 px | 249.12 px | 247.12×185.34 px | 319.34 px |
| 360 px | 283.72 px | 281.72×211.29 px | 345.29 px |
| 390 px | 309.67 px | 307.67×230.75 px | 364.75 px |
| 430 px | 344.27 px | 342.27×256.70 px | 390.70 px |

After 10 px internal padding, the portrait sources calculate to
153.03×191.29 px, 168.60×210.75 px and 189.36×236.70 px at 360, 390 and
430 px respectively. The 4:3 landscape sources calculate to 255.05×191.29
px, 281×210.75 px and 315.60×236.70 px. Each dimension is bounded by the
available image well, so all four source edges remain visible without
distortion or clipping.

At 768, 1024 and 1440 px, the pre-existing five-column desktop rules still
apply: the CSS changes no desktop card width, grid order or 4:5 media sizing.
The base image rule now explicitly guarantees centered containment and
removes hover zoom.

Surface audit:

- the connected story outer section: `#0b0b0c` plus a 9%-opacity orange
  highlight;
- story shell/media captions: `#151515` and `#191817`;
- direction outer section: solid `#0b0b0c`, with no wood-grain or walnut
  gradient;
- raised cards and panels: `#151515`;
- secondary raised surface: `#191817`;
- secondary-products alternate section: `#f3e0c8`; and
- reviews, bulk, FAQ and footer: neutral near-black/charcoal surfaces with
  orange accents only.

Calculated contrast:

- `#fff8ef` on `#0b0b0c`: 18.67:1;
- `#fff8ef` on `#151515`: 17.33:1;
- `#cfc3b5` on `#0b0b0c`: 11.36:1;
- `#cfc3b5` on `#151515`: 10.54:1;
- `#cfc3b5` on `#191817`: 10.24:1; and
- `#17120f` on `#f3e0c8`: 14.43:1.

Regression checks:

- local references: 21 checked, 0 missing;
- IDs: 71 checked, 0 duplicates;
- local page and stylesheet: HTTP 200;
- CSS braces: 355 opening and 355 closing;
- `node --check assets/js/site.js`: passed;
- `git diff --check`: passed;
- working-tree HTML and JavaScript changes: 0;
- selector HTML and selector CSS blocks match `7c28f3b`;
- selector product-asset changes from `7c28f3b`: 0;
- Explore Our Designs markup, assets, sizing and interaction rules: unchanged;
- story markup, media, tabs and WhatsApp behavior: unchanged;
- bulk/review copy and interaction code: unchanged; and
- Netlify configuration changes: 0.

The connected browser runtime reported no available browser. The requested
widths were validated from the explicit responsive constraints, source
dimensions, containment math and local HTTP delivery. Final browser-rendered
overflow inspection and physical-device visual acceptance remain release
checks.

Result: **pass for neutral public surfaces, equal mobile category cards,
complete contained imagery, WCAG AA contrast and locked-module integrity**.

## Story order, design gallery and portrait-product validation

Document-order checks:

1. hero;
2. 180/240 selector;
3. Bulk T-shirts & Embroidery;
4. connected custom-piece story;
5. Explore Our Designs / Create Your Own;
6. More Ways to Customise;
7. customer reviews;
8. FAQ;
9. final WhatsApp CTA; and
10. footer.

The process and direction sections each occur once. The moved process-section
HTML matches its pre-move unit byte-for-byte, including all IDs, assets, copy,
tabs, hidden states, swipe hook and WhatsApp action.

Gallery checks:

- approved design order: Echo Silhouette, Find Your Balance, Resurrection,
  Knowledge Is Power, Prism Beauty;
- excluded Her Pookie references: 0;
- design images: unchanged 960×960 WebPs;
- black/white/black/white/black tone order: preserved;
- media treatment: square centered `object-fit: contain`, with no product
  transform or zoom;
- black-tee wells: `#f8ead8`;
- white-tee wells: `#151515`;
- section: `#f3e0c8`, with no brown or wood-grain layer;
- primary and secondary text: `#17120f` and `#574b43`;
- gallery cards and custom form: `#fff8ef`;
- active accent: existing `#ff8738`;
- controls per card: one labelled preview button and one **Use This Design**
  link;
- position state: `01 / 05` initially, updated to the nearest card during
  native scrolling;
- keyboard state: visible global focus plus Left/Right Arrow movement when
  the gallery itself is focused; and
- reduced motion: programmatic movement switches to immediate scrolling,
  transition duration collapses to the existing near-instant fallback and
  interaction lift is removed.

Calculated gallery constraints:

| Viewport | Card width | Next-card preview / behavior |
| ---: | ---: | --- |
| 320 px | 275.2 px | approximately 15 px; native snap |
| 360 px | 309.6 px | approximately 20 px; native snap |
| 390 px | 335.4 px | approximately 25 px; native snap |
| 430 px | capped at 340 px | approximately 60 px; native snap |
| 768 px | 190 px minimum | horizontal row rather than squeezed columns |
| 1024 px | up to 240 px | horizontal row rather than squeezed columns |
| 1440 px | approximately 209 px | five-card grid with alternating 14 px offset |

Calculated contrast:

- `#17120f` on `#f3e0c8`: 14.43:1;
- `#574b43` on `#f3e0c8`: 6.54:1;
- `#17120f` on `#fff8ef`: 17.64:1;
- `#9a3d15` eyebrow text on `#f3e0c8`: 5.34:1; and
- `#080706` selected-tab text on `#ff8738`: 8.41:1.

The generated Echo Silhouette message is:

```text
Hello Saturn Cheetah Store,

I’m interested in the Echo Silhouette design.
Please help me customise it on a T-shirt.
```

It uses the unchanged `917780478506` WhatsApp destination. Each of the other
four links receives its own approved design title through the same builder.

Mobile secondary-product diagnostic:

| Viewport | Card width | Media wrapper | Caps/Coasters/Mugs rendered image |
| ---: | ---: | ---: | ---: |
| 320 px | 249.12 px | 247.12×247.12 px | 175.30×219.12 px |
| 360 px | 283.72 px | 281.72×281.72 px | 202.98×253.72 px |
| 390 px | 309.67 px | 307.67×307.67 px | 223.74×279.67 px |
| 430 px | 344.27 px | 342.27×342.27 px | 251.42×314.27 px |

For Caps, Coasters and Mugs:

- source dimensions: 900×1125 each;
- wrapper display: grid with centered placement;
- wrapper overflow: visible;
- wrapper padding: 14 px;
- image width/height and maximum width/height: 100%;
- image minimum width/height: 0;
- object fit: contain;
- object position: center;
- transform: none;
- background image: none;
- card wrapper overflow: hidden only at the padded outer card radius, outside
  the contained image bounds;
- all four source corners: retained within the calculated image bounds; and
- source crop assessment: the boutique scenes naturally end at their source
  edges, but the cap, coasters, mug, packaging/logo areas and principal
  displays are complete. No immediate replacement is required.

The mobile square wrapper is shared so all five cards remain equal. At 360 px,
Tote Bags and Bottles calculate to approximately 253.72×190.29 px inside the
new well, compared with approximately 255.05×191.29 px previously; their
actual contained image size is therefore effectively unchanged. Desktop
secondary-product card order, five-column layout and 4:5 media treatment
remain unchanged.

Regression checks:

- IDs: 72 checked, 0 duplicates;
- local references: 21 checked, 0 missing;
- story and direction sections: one each;
- JavaScript syntax: passed;
- CSS braces: 369 opening and 369 closing;
- HTML/CSS whitespace validation: passed;
- selector HTML and selector CSS blocks match `7c28f3b`;
- selector product assets changed from `7c28f3b`: 0;
- hero block matches pre-task commit `6a15612`;
- bulk section content: unchanged;
- story content/behavior source: unchanged apart from document position;
- reviews, FAQ and footer markup: unchanged;
- Netlify configuration: unchanged; and
- dependencies and production media changes: 0.

The connected browser runtime remains unavailable. Responsive results are
validated from the source dimensions, explicit box constraints, native
scroll-snap rules, containment calculations and local delivery. Final
physical-phone confirmation of all source corners and browser-rendered
overflow remains a release check.

Result: **pass for section order, approved gallery content and controls,
portrait-source containment, accessibility structure and locked-module
integrity**.

## Unresolved owner and release decisions

1. Confirm documented publication permission for all five gallery artworks,
   especially any third-party design elements.
2. Confirm the live-printing video has passed final frame-by-frame privacy and
   consent review.
3. Confirm final acceptance of the stylised branding embedded in the approved
   generated boutique hero/category images; the official live logo remains
   authoritative.
4. Complete browser and physical-device validation at the eight required
   widths before merging or deploying.

Customer publication permission for the face-free
`custom-story-worn.webp` photograph has been confirmed by the owner. This
customer-consent requirement is resolved; no identifying consent evidence is
stored in the repository.

The five owner-supplied review excerpts are now included exactly as approved.
No additional review or reviewer data was added.

## Release boundary

No deployment, merge, Netlify configuration change, DNS change, historical
asset deletion or dependency installation was performed.

## T-shirt colour and size selector validation — 2026-07-31

### Scope and assets

The production asset directories contain 28 files copied byte-for-byte from
the supplied pack:

| Fit | Mobile derivatives | Native derivatives |
| --- | --- | --- |
| 180 GSM | Black `640×1019`; ten other colours `640×1023` | Black `994×1583`; ten other colours `992×1586` |
| 240 GSM | Black `640×960`; White and Off-white `640×1020` | Black `1024×1536`; White and Off-white `993×1583` |

`cmp` verified all 28 production copies against their supplied derivatives.
`file` verified every WebP encoding and dimension. `sips` could not read these
WebPs in this environment and terminated with an `NSInvalidArgumentException`;
this did not alter any file.

The previous 180 GSM Black and 240 GSM beige/default WebPs are not
byte-identical to the newly supplied Black and Off-white derivatives, but
side-by-side visual inspection confirms the same approved compositions,
colours and complete front/back product scenes. The selector now uses the
pack's canonical derivatives.

### Functional and accessibility checks

- JavaScript syntax: `node --check assets/js/site.js` passed.
- HTML IDs: 78 checked, 0 duplicates.
- Static local references: 20 unique references checked, 0 missing.
- Production colour-image URLs: 28/28 returned HTTP 200 from a temporary
  localhost static server.
- 180 GSM colour order/count: 11/11 exact; default Black.
- 240 GSM colour order/count: 3/3 exact; default Off-white; no 180-only colour
  is included in its data.
- Adult-size order/count: XS, S, M, L, XL, XXL exactly; initial selected size
  is empty.
- Colour and size controls are semantic buttons with visible text, visible
  focus, bordered indicators and `aria-pressed` state.
- The live region reports both fit and colour after changes.
- The selected colour is kept separately for each GSM; the size remains when
  colour or fit changes.
- Personal actions call `requireTeeSize()` and expose/focus the concise inline
  “Please choose a size.” prompt when necessary.
- `teeImageRequest` is incremented per image request, and the apply callback
  accepts only the current request ID and product key. This retains and
  strengthens the previous stale-load race guard.
- Image switching updates `src`, `srcset`, `sizes`, `alt`, `width` and
  `height`. CSS uses centered `object-fit: contain`, no filter, blend, zoom or
  crop, and a stable `994 / 1583` display aspect.
- A runtime test of the real message builder produced the required fit,
  colour, size, quantity and design-status lines and retained WhatsApp number
  `917780478506`.
- The kids-size sentence occurs twice in production source: once in the bulk
  module and once in the bulk-message builder. It is absent from the personal
  selector and personal message.

Sample personal message from the runtime test:

```text
Hello Saturn Cheetah Store,

I’d like to customise a T-shirt.

Fit: 180 GSM Regular Fit
Colour: Green
Size: L
Quantity: 2
Design status: I have a ready design

I will attach my design or reference in WhatsApp.
Please help me confirm availability, final price and timeline.
```

### Responsive geometry

At 320, 360, 390 and 430 px, the 16 px page gutters produce selector widths
of 288, 328, 358 and 398 px. The image well has 16 px internal padding, so its
available widths are 256, 296, 326 and 366 px; the image is capped at 360 px.
The fixed aspect box and `contain` fitting preserve the full front/back tee,
trousers and shoes. The colour row scrolls within its own available width and
cannot enlarge the page. Size controls have a 44 px minimum height and wrap
inside the panel (four/two at 320 px, five/one at 360 px, and one row from
390 px where label widths permit).

At 768 px the selector is a single-column stage with approximately 722 px of
container width. At 1024 px its approximately 963 px container uses the
existing 0.9/1.1 split. At 1440 and 1920 px the container remains capped at
1180 px and uses two balanced columns. Controls wrap within their
`max-width: 570px` detail area; the image remains capped at 560 px. All grid
tracks use zero-minimum containment where needed, and the only horizontal
overflow is the intentional mobile colour scroller, so calculated page-level
horizontal overflow is zero at all eight required widths.

Browser automation is not installed in this dependency-free repository, so
these responsive results use explicit CSS geometry, intrinsic image data,
static source checks and local HTTP delivery rather than claiming a rendered
browser/device pass. Physical-device confirmation remains a release gate.

### Regression and release boundary

`git diff --check` passed. Changes are limited to the selector markup/styles/
logic, replacement of the superseded free-text personal colour field with the
selector state, the instructed bulk note, the two UX documents, and 28 product
WebPs. Hero, connected story, Explore Our Designs, secondary products,
reviews, FAQ, footer, navigation and `netlify.toml` are unchanged.

No deployment, merge, library installation, DNS change or Netlify
configuration change was performed.
