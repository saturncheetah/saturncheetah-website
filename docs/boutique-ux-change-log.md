# Boutique UX V2 Change Log

Date: 2026-07-30

Branch: `implementation/full-boutique-redesign-v2`

Deployment: not performed

## Outcome

The previous catalogue-style homepage has been replaced by one compact
boutique customer journey. T-shirts occupy the hero, primary selector, design
direction and printing-proof modules. Secondary products are contained in one
small bulk-focused module.

The first screen now communicates:

- custom unisex T-shirts start from one piece;
- 180 GSM regular and 240 GSM oversized are the two primary choices;
- customers can explore Saturn Cheetah design directions or send their own;
- bulk merchandise is available; and
- the enquiry continues on WhatsApp.

No price, delivery promise, urgency, stock level, customer-activity claim or
payment gateway was added. Five supplied Google Review excerpts now appear
exactly in their approved first-name and last-initial format.

## Production files changed

- `index.html`
- `assets/css/site.css`
- `assets/js/site.js`
- `assets/images/boutique/category-bottles.webp`
- `assets/images/boutique/category-caps.webp`
- `assets/images/boutique/category-coasters.webp`
- `assets/images/boutique/category-mugs.webp`
- `assets/images/boutique/category-tote-bags.webp`
- `assets/images/boutique/featured-tshirt-design.webp`
- `assets/images/boutique/hero-desktop.webp`
- `assets/images/boutique/hero-mobile.webp`

Documentation added:

- `docs/boutique-ux-change-log.md`
- `docs/boutique-ux-test-report.md`

`netlify.toml` was not modified. No dependency was installed and no
historical asset was deleted.

## Final rendered order

Mobile:

1. Compact boutique header
2. Copy-first hero with the portrait art-directed source
3. 180 GSM / 240 GSM segmented selector
4. Compact Bulk T-shirts & Embroidery card
5. Choose Your Direction
6. Choose → Print → Result
7. More Ways to Customise
8. Loved by Our Customers
9. Short FAQ
10. Final WhatsApp CTA
11. Compact footer

Desktop uses the same semantic order. It changes only the presentation:
the hero uses the 16:9 source, product and process states use editorial
two-column layouts, the bulk summary is horizontal, the five designs form one
compact row, the five secondary products form one compact row, and three
reviews are visible where space allows.

## Old rendered content removed

- announcement strip;
- repeated personal-versus-bulk choice cards;
- duplicate product and WhatsApp banners;
- long standalone featured-design section;
- oversized image stacks;
- disconnected printing and finished-work sections;
- unverified review/testimonial content;
- customer imagery that could expose a face;
- full-width fixed mobile WhatsApp bar; and
- repeated enquiry forms and repeated large final calls to action.

The source files for historical media remain on disk for rollback and audit.

## Customer journey

### T-shirt selector

An accessible radio-based segmented control switches between:

- `180 GSM · Unisex · Cotton` regular fit; and
- `240 GSM · Unisex · Heavyweight` oversized fit.

The selected state updates the product view, short fit description, best-use
summary, customisation form selection, final CTA context and WhatsApp
message. A small tertiary link leads to bulk products without turning them
into a third equal T-shirt option.

The current private preview uses the existing face-free
`regular-180-black-white.webp` and `oversized-240-white.webp` sources.
These are not a matched approved photography pair and must be replaced before
final publication when the owner supplies the approved pair.

### Choose Your Direction

One tabbed module contains:

- an approved five-image native scroll-snap gallery with a keyboard-operable
  full-screen dialog; and
- a short customisation form asking only product, quantity and design status
  before optional details.

Artwork publication and print-rights guidance is shown beside the gallery.
`balance-print.webp` remains labelled as an inspiration mockup rather than a
documented finished product.

### Choose → Print → Result

The three visible states are connected in one module:

- Choose: an explicitly labelled illustrative design direction;
- Print: poster-first real printing footage with controls, muted audio,
  `preload="none"` and no autoplay; and
- Result: a separately labelled finished-work example.

The result copy explicitly says it is not the exact output from the video.

### Secondary bulk products

One compact module presents only:

1. Caps
2. Coasters
3. Mugs
4. Tote Bags
5. Bottles

Each card contains only an approved visual, category, “Bulk & branding” and
“Ask on WhatsApp.” Mobile uses a horizontal row showing approximately 1.15
cards; desktop uses one five-card row.

## WhatsApp conversion

All generated destinations use `917780478506`.

- 180 GSM selections mention the regular-fit tee.
- 240 GSM selections mention the oversized tee.
- custom-design submissions add quantity and design status.
- Caps, Coasters, Mugs, Tote Bags and Bottles generate category-specific bulk
  messages.

A compact mobile pill appears only after the hero has been passed and a short
delay has elapsed. It remains hidden while the navigation, gallery dialog or
an on-page WhatsApp conversion zone is visible.

## Visual and interaction system

- dark charcoal, warm sand/wood, controlled neon pink and orange;
- live HTML typography over art-directed WebP hero sources;
- 60 px mobile header;
- dependency-free hero, reveal, tab, selector, menu, modal and CTA behavior;
- intentional native horizontal scrolling only within the two scrollers;
- visible focus and minimum 44 px controls;
- reduced-motion mode removes spatial transitions and pauses video; and
- no scroll-jacking, cursor replacement, parallax, particles or looping
  decorative motion.

## Compactness estimate

The previous mobile preview behaved like a long catalogue. The approved plan
targeted approximately five to six 800 px screenfuls. Based on the final
section count, collapsed FAQ, single visible state per tabbed module, bounded
media stages and 46 px mobile section spacing, the redesigned 390 px layout is
expected to be approximately 5.0–5.8 thousand CSS pixels, compared with an
estimated 9–10 thousand pixels for the previous stacked preview: roughly a
40–45% reduction.

This remains an estimate until a browser-rendered measurement is completed on
the private preview.

## Reviewable commits

| Commit | Scope |
| --- | --- |
| `c838436` | Imported the six approved boutique WebPs. |
| `f7a10e3` | Added the approved tote-bag and bottle category WebPs. |
| `f188861` | Replaced the old homepage markup with the full compact journey. |
| `fc8bcb6` | Added the responsive boutique visual system and interactions. |
| `dd8e1e1` | Tightened mobile hero, product and section heights. |
| `81088ab` | Prevented stale image loads from overriding rapid tee-selector changes. |

## Product-selector visual update

The approved black and beige portrait images now replace only the two
T-shirt-selector visuals:

- black → 180 GSM unisex regular fit;
- beige → 240 GSM unisex oversized.

Imported sources:

- `assets/images/products/tshirt-180-regular-black-source.jpg`
  (`994×1583`, 60,127 bytes);
- `assets/images/products/tshirt-240-oversized-beige-source.jpg`
  (`993×1583`, 71,554 bytes).

Responsive WebP derivatives:

- `tshirt-180-regular-black-640.webp` (`640×1019`, 15,914 bytes);
- `tshirt-180-regular-black-994.webp` (`994×1583`, 32,912 bytes);
- `tshirt-240-oversized-beige-640.webp` (`640×1020`, 19,458 bytes);
- `tshirt-240-oversized-beige-994.webp` (`993×1583`, 39,790 bytes).

The beige source is 993 px wide, so its largest derivative remains 993 px
wide despite the approved `-994.webp` maximum-size filename. It was not
upscaled.

The selector now supplies `srcset`, `sizes`, intrinsic dimensions and the
approved alternative text in both initial HTML and JavaScript-driven states.
Its media rule uses natural height, centered containment and a maximum
560 px display width. The former fixed image heights and selector transition
scale were removed, and the visual label was moved into the source image’s
unused upper area rather than over the shoes.

No product copy, WhatsApp behavior or non-selector section changed.

## Design-gallery and custom-story update

The **Explore Our Designs** panel now uses five approved, face-free
T-shirt-on-hanger visuals in the required presentation order:

1. `assets/images/designs/echo-silhouette.webp` — black, 960×960,
   28,836 bytes;
2. `assets/images/designs/find-your-balance.webp` — white, 960×960,
   26,218 bytes;
3. `assets/images/designs/resurrection.webp` — black, 960×960,
   29,532 bytes;
4. `assets/images/designs/knowledge-is-power.webp` — white, 960×960,
   30,102 bytes;
5. `assets/images/designs/prism-beauty.webp` — black, 960×960,
   23,826 bytes.

The incoming filenames were checked against visible artwork before
conversion. Two incoming names were swapped, and
`design-prism-beauty.jpg` visibly contained the excluded “Her Pookie”
artwork. Production files were therefore mapped by approved visible content,
not the incorrect staging name. “Her Pookie” is absent from rendered and
production assets.

The gallery retains the existing **Create Your Own** form/pathway and
full-screen preview. Its cards now use centered containment in a compact
five-card desktop row and native mobile scroll snap, without hover zoom.

The former three-state printing example is now a four-state connected
custom-piece story:

- `assets/images/story/custom-story-design.webp` — 900×1066,
  61,888 bytes;
- `assets/images/story/custom-story-printing-poster.webp` — 478×850,
  16,368 bytes;
- `assets/video/custom-story-live-printing.mp4` — 478×850, 8.85 seconds,
  1,134,543 bytes;
- `assets/images/story/custom-story-finished-tee.webp` — 900×1200,
  120,484 bytes;
- `assets/images/story/custom-story-worn.webp` — 554×1200,
  71,108 bytes.

Only one story panel is active at a time. Four accessible tabs support
click/tap and keyboard navigation, while a scoped horizontal pointer gesture
supports swiping without intercepting video controls. The vertical video is
poster-first, muted, `preload="none"` and has no autoplay attribute.

The module explicitly states that the video demonstrates the real printing
process but is not confirmed as the exact printing of the displayed finished
tee. The final CTA continues to use the existing WhatsApp generation logic
and number.

The owner has confirmed customer publication permission for the face-free
`custom-story-worn.webp` photograph. The customer-consent requirement for
this asset is resolved; no identifying consent evidence is stored in the
repository.

The approved 180/240 selector remains unchanged from commit `7c28f3b`:
its HTML section and CSS block hashes match, its six product assets retain
their recorded SHA-256 values, and no selector or WhatsApp-state line changed.

## Responsive gallery and product-fitting polish

The five approved gallery images, titles and order remain unchanged. Their
presentation is now compact and consistently centred:

- mobile cards use `min(84vw, 340px)`, a 4:5 image frame, 12–16 px gaps,
  native horizontal scroll snap and a hidden scrollbar;
- tablet and narrower desktop widths retain practical 190–240 px cards in a
  horizontal row rather than compressing five narrow columns;
- viewports from 1200 px use one balanced five-card row; and
- card media uses centered `object-fit: contain`, with no bottom alignment,
  crop or hover zoom.

The gallery is now an existing floating-CTA visibility zone, preventing the
compact WhatsApp pill from covering gallery content. The secondary-products
section already provided the same protection.

The public **04 Worn** panel now contains only its step label and the approved
supporting line, “See how the finished custom tees look in real life.” Public
references to face hiding, privacy, consent and internal asset status were
removed. Consent status remains documented internally.

The first mobile category pass used a padded 4:3 warm-neutral frame with
centered `object-fit: contain` imagery. Physical-phone review showed that this
constrained clipping chain did not reliably preserve the complete sources; it
is superseded by the natural-height fix below.

No JavaScript, image, video, Netlify configuration or 180/240 selector file,
state, copy, asset or responsive rule changed.

## Mobile secondary-product natural-height fix

The physical-phone crop was traced beyond `object-fit` to the combined mobile
media chain: a fixed 4:3 wrapper, wrapper `overflow: hidden`, image
`height: 100%`, and the separate `scale(1.025)` hover treatment. The mobile
override now:

- removes the wrapper aspect ratio and fixed-height relationship;
- lets each image use `width: 100%` and intrinsic `height: auto`;
- explicitly removes image transforms and transitions;
- retains 10 px of intentional warm-neutral wrapper padding;
- lets portrait and landscape wrappers expand to their natural image height;
  and
- keeps the existing horizontal scroll-snap row without a nested vertical
  scrollbar.

No `<picture>`, `<source>`, product background image or secondary-card
pseudo-element participates in this module. Desktop category rules remain
byte-identical to their pre-fix state. HTML, JavaScript, images, copy, links,
product order, WhatsApp behavior and the locked 180/240 selector are
unchanged.

## Bulk T-shirts and customer reviews

A compact **Bulk T-shirts & Embroidery** card now follows the personal
180/240 selector. Its default state shows the approved summary, six option
chips and a clear statement that embroidery is available for bulk orders
only. An accessible button controls the hidden enquiry form through
`aria-expanded` and `aria-controls`.

The expanded form collects organisation or purpose, product type, quantity,
preferred colours, size breakup, printing/embroidery choice, branding
position, required date and delivery city. Submission generates a dedicated
WhatsApp message to the unchanged `917780478506` destination. The form is an
existing WhatsApp visibility zone, preventing the delayed mobile pill from
covering its CTA.

The new **Loved by Our Customers** section follows the secondary-products
module. It contains exactly five supplied Google Review excerpts in the
approved order, with:

- first name and last initial only;
- text initials instead of photographs;
- five visual stars plus screen-reader text;
- no dates, owner replies or verified-purchase label;
- native mobile scroll snap with an accessible position indicator;
- three visible cards at 1024 px and wider, two at 768 px, and accessible
  previous/next controls on desktop; and
- the approved Google reviews link opened safely in a new tab.

No review autoplay or carousel dependency was added. The hero, navigation,
selector, gallery, custom-piece story, secondary-product cards, FAQ, footer,
Netlify configuration and existing WhatsApp messages remain unchanged.

## Dark-wood design-direction surface

The **Explore Our Designs / Create Your Own** module now uses a scoped
CSS-only dark-wood treatment instead of stacked flat brown surfaces. The
outer section combines a near-black base, one broad walnut transition, two
asymmetric warm highlights and a 2.2%-opacity bronze grain. No image asset or
external dependency was added.

The tab shell, panels, gallery cards, image wells, customisation form,
optional panel and form fields use clean charcoal surfaces. Grain remains on
the outer section only, away from important text and controls. Bronze borders
provide separation while the approved orange remains the active-tab colour.

Only direction-module color, background, border and shadow properties
changed. The five gallery images, source order, card labels, 4:5 containment,
card sizing, mobile scroll snap, modal, form behavior and WhatsApp visibility
zone are unchanged. HTML and JavaScript were not modified.

## Neutral surfaces and aligned secondary-product cards

The previous dark-wood direction treatment and remaining legacy brown public
surfaces are superseded by a shared neutral boutique palette:

- main surface: `#0b0b0c`;
- raised surface: `#151515`;
- secondary surface: `#191817`;
- alternating cream surface: `#f3e0c8`;
- primary light text: `#fff8ef`;
- secondary light text: `#cfc3b5`; and
- dark text on cream: `#17120f`.

The connected custom-piece story now uses near-black, charcoal and a restrained
orange highlight. The direction, bulk, reviews, FAQ, footer, form and modal
surfaces use the same neutral system. The large-section wood grain, walnut
transition, pink review wash and pink final-CTA wash were removed. Warmth now
comes from the existing orange, bronze borders and photographed product
surfaces rather than brown page backgrounds.

The unequal mobile category-card heights were caused by the prior
natural-height treatment: Caps, Coasters and Mugs use 900×1125 portrait
sources, while Tote Bags and Bottles use 1448×1086 landscape sources. Letting
each wrapper follow its source height made the last two media panels and cards
shorter.

At mobile widths, all five cards now share one 86.5% flex basis, a 4:3 media
well, 10 px internal padding and a 132 px minimum body height. The card is a
stretching flex column and the WhatsApp link is aligned at the bottom of the
body. Every image occupies the available image well with centered
`object-fit: contain`, `object-position: center`, no transform and no
transition. The fixed frame therefore standardises the card without
reintroducing crop or zoom.

The existing desktop grid, product order and desktop 4:5 media presentation
remain unchanged. The 180/240 selector section and its product assets still
match commit `7c28f3b`. Explore Our Designs content, image sizing, containment
and interaction are unchanged; only its surrounding brown visual surfaces
were neutralised. Story media, tabs and WhatsApp behavior, bulk/review content,
HTML, JavaScript and Netlify configuration were not modified.

## Story order, editorial design gallery and portrait-product fitting

The complete connected custom-piece story now appears immediately after the
Bulk T-shirts & Embroidery section and before Explore Our Designs. Its HTML
unit moved without changing its IDs, media, labels, copy, tabs, swipe
interaction, CTA or WhatsApp behavior.

Explore Our Designs now uses a cream editorial presentation:

- section surface: `#f3e0c8`;
- primary text: `#17120f`;
- secondary text: `#574b43`;
- black-tee image wells: pale beige `#f8ead8`;
- white-tee image wells: charcoal `#151515`;
- card/form surface: `#fff8ef`; and
- the existing orange remains the active and interaction accent.

The five approved designs retain their original images and
black/white/black/white/black order. Each card now separates its accessible
full-screen preview button from a **Use This Design** WhatsApp link. The link
includes the selected design title in its generated message. A live
`01 / 05` indicator follows the nearest scroll-snap card, while keyboard users
can move the focused gallery with Left and Right Arrow. Mobile cards use
`min(86vw, 340px)` and native scrolling; the 1440 px layout uses five balanced
cards with a restrained alternating 14 px editorial offset.

The previous phone product frame was short relative to the 900×1125 portrait
Caps, Coasters and Mugs sources. It also combined a 4:3 wrapper clipping
boundary with a percentage-sized replaced element. The new mobile-only shared
wrapper is square, uses 14 px padding and `overflow: visible`, and explicitly
sets the image to centered `object-fit: contain` with zero minimum dimensions
and no transform. The primary products and all four source corners therefore
fit within the image well.

Tote Bags and Bottles retain their order, images, copy, links and containment.
The shared square wrapper is required to keep all five cards aligned; their
actual contained landscape-image dimensions remain effectively the same as
the previous 4:3 presentation. Desktop secondary-product grid and media rules
are unchanged.

The hero, 180/240 selector, bulk content, story content and behavior, reviews,
FAQ, footer and Netlify configuration remain unchanged. No dependency or media
asset was added or modified.

## Release boundary

No Netlify deployment, DNS change, Netlify configuration change, merge or
dependency installation was performed.

## T-shirt colours and adult sizes — 2026-07-31

The existing 180 GSM / 240 GSM selector now adds approved colour-specific
product imagery and an explicit adult-size choice without changing its fit
copy, quantity/design-status form, responsive product containment or WhatsApp
destination.

- 180 GSM Regular Fit offers Black, White, Off-white, Blue, Green, Gray, Red,
  Yellow, Pink, Orange and Navy Blue, with Black as its default.
- 240 GSM Oversized offers Black, White and Off-white only, with Off-white as
  its default.
- Each fit remembers its last selected colour for the page session.
- Adult sizes are exactly XS, S, M, L, XL and XXL. No size is preselected;
  personal-order actions expose an inline accessible prompt until one is
  chosen.
- Selected fit, colour, size, quantity and the existing design status/details
  are included in the personal WhatsApp message.
- The exact note “Kids’ sizes are available for bulk orders.” appears only in
  the bulk module and its generated bulk quote message.

Twenty-eight supplied responsive WebPs were imported byte-for-byte into
`assets/images/products/180/` and `assets/images/products/240/`. Every colour
uses its 640 px derivative as the mobile candidate and its native-width
derivative as the desktop candidate. The image element updates its `src`,
`srcset`, alternative text and intrinsic dimensions while a stable contained
aspect box prevents layout shift and preserves the complete product scene.

The image request token in `updateTeeProduct()` supersedes stale image loads
during rapid fit/colour switching. No colour filters, tinting, cropping or
zoom are used.

No hero, connected-story, design-gallery, secondary-product, review, FAQ,
footer, navigation or Netlify-configuration behavior was changed. No library
was installed and no deployment or merge occurred.

## Native WhatsApp enquiry widget — 2026-08-01

The previous delayed mobile WhatsApp link is now a dependency-free enquiry
widget built with the existing HTML, CSS and JavaScript. Its semantic button
opens a compact black, cream and orange panel containing five WhatsApp enquiry
paths: custom T-shirt, an existing design, bulk T-shirts and embroidery,
secondary custom products, and a general enquiry. Each path generates its own
message for `917780478506` and opens externally with `noopener noreferrer`.

The custom T-shirt and design paths reuse the current GSM/fit, colour, adult
size and quantity selection. The design path also uses the active gallery
title. The bulk path reuses any values already entered in the existing bulk
form. Existing product, design, secondary-product and bulk-form WhatsApp links
and their message builders remain unchanged.

On desktop, the panel is capped at 340 px and opens above the bottom-right
button. On mobile it behaves as a compact, internally scrollable floating
panel with a viewport-height cap and safe-area bottom/right offsets. The
existing intersection guards now also include the full T-shirt selector, so
the widget is removed from interaction while product controls, WhatsApp zones,
the final CTA or footer are visible. Opening mobile navigation closes the
widget, and opening the widget closes navigation.

The trigger exposes `aria-expanded` and `aria-controls`; the panel has an
accessible title and an explicit 44 px close control. Opening moves focus to
the close button. Escape, outside click and the close control dismiss the
panel, with focus restored to the trigger where appropriate. All controls
meet the 44 px touch-target minimum, visible focus styling is provided, and
the site-wide reduced-motion rule suppresses transitions.

No protected content, product data, colour image, Netlify configuration or
dependency changed. No deployment or merge occurred.

## Saturn After Dark collection — 2026-08-01

Added one contained premium sub-collection between Explore Our Designs and
More Ways to Customise. The section positions Saturn After Dark as made-to-
order inspiration for pure-black regular-fit and oversized T-shirts plus
sleeveless vests. Public options are limited to silver rings, eyelets and
pressings, fixed or detachable chains, securely stitched black-net inserts,
distressed text and acid-effect text after feasibility review.

The desktop layout is a compact two-column composition with live copy and
actions beside the wide rack visual. Four short customisation cards and two
small supporting detail cards complete the section without becoming a long
gallery. At 900 px and below the section becomes one column; at 767 px and
below the lead switches to the portrait collection, while options and support
cards become native horizontal swipe rails that preserve vertical scrolling.
All informational media use complete, uncropped `object-fit: contain`
presentation.

Imported eight approved WebP derivatives into `assets/images/after-dark/`:

| Asset | Dimensions |
| --- | --- |
| `after-dark-wide-rack.webp` | 1672×941 |
| `after-dark-wide-rack-mobile.webp` | 960×540 |
| `after-dark-portrait-collection.webp` | 1086×1448 |
| `after-dark-portrait-collection-mobile.webp` | 960×1280 |
| `after-dark-detail-tee-vest.webp` | 1123×1401 |
| `after-dark-detail-tee-vest-mobile.webp` | 960×1198 |
| `after-dark-full-collection.webp` | 1024×1536 |
| `after-dark-full-collection-mobile.webp` | 960×1440 |

Both section CTAs and the added Saturn After Dark enquiry-widget path use a
dedicated feasibility-first WhatsApp message for `917780478506`. No price,
stock or delivery promise is made. The previous enquiry paths and all existing
product-specific WhatsApp builders remain unchanged.

The full obsidian, oxblood, burgundy, bone and antique-silver treatment is
scoped to `.after-dark-section`; orange remains the primary CTA. Wider-site
continuity is deliberately restrained to thin silver dividers on selected
dark sections, antique-silver border tints on selected surfaces and a small
burgundy keyboard-focus halo. The established black, cream, orange and neon-
pink identity remains dominant, and no protected section became gothic.

No protected content, 180/240 product data or assets, Netlify configuration
or dependency changed. No deployment or merge occurred.

## Final mobile selector and Saturn After Dark rebuild — 2026-08-01

This correction supersedes the previous Saturn After Dark media composition
and blank questionnaire-style enquiry while retaining the section’s approved
placement and wider-site accent balance.

On viewports up to 900 px, the single existing T-shirt control group now
renders in this order: 180/240 selector, colour controls, size controls,
product image, primary product details and secondary details/actions. Desktop
retains the image-left, details-right composition and its original internal
order. No colour or size control was duplicated. Product data, colour assets,
selected size/colour state, image preload/switching logic and personal
WhatsApp state are unchanged. `renderColourOptions()` still runs before the
new image request is applied when switching GSM.

The rebuilt Saturn After Dark section uses exactly four new approved source
masters in the required order. The untouched PNGs remain in the ignored
incoming source folder. Eight stripped, optimized WebP derivatives were
created in `assets/images/after-dark-final/` with a restrained baked
brightness/contrast lift; no CSS tinting is applied:

| Production asset | Dimensions |
| --- | --- |
| `saturn-after-dark-lead.webp` | 1122×1402 |
| `saturn-after-dark-lead-720.webp` | 720×900 |
| `saturn-after-dark-silver-hardware.webp` | 1672×941 |
| `saturn-after-dark-silver-hardware-720.webp` | 720×405 |
| `saturn-after-dark-black-net.webp` | 1086×1448 |
| `saturn-after-dark-black-net-720.webp` | 720×960 |
| `saturn-after-dark-full-collection.webp` | 1086×1448 |
| `saturn-after-dark-full-collection-720.webp` | 720×960 |

The optional fifth source was deliberately not used because the three
required supporting images complete the desktop editorial grid and prevent a
longer, repetitive mobile rail. The former After Dark WebPs remain preserved
but are no longer referenced by the section.

Mobile now presents concise copy, one strong portrait lead, one swipeable
three-card supporting rail, the compact configurator and its CTAs. Desktop
uses an asymmetric two-column layout with introduction/configurator opposite
the lead and three supporting images. Lifted production derivatives, wine-
charcoal media wells, antique-silver borders and controlled oxblood highlights
keep black garments distinct without changing the wider brand balance.

The on-site configurator uses semantic radio controls and checkboxes for
garment, one or more customisations, size and design status, plus validated
quantity and placement fields. Combination is mutually exclusive with
individual techniques, and the final customisation cannot be accidentally
cleared. A live summary and `buildAfterDarkMessage()` read the same form state,
so the concise WhatsApp message contains only actual, non-empty selections.

No unrelated product data, protected content, Netlify configuration or
dependency changed. No deployment or merge occurred.

## Focused Saturn After Dark customisation experience — 2026-08-01

Replaced the competing lead/supporting-gallery composition with one clear
editorial hero. The approved `saturn-after-dark-lead` image is now the only
full section image, presented uncropped in a brighter wine-charcoal media well
beside the mood-led introduction “Built in shadow. Designed by you.” The
existing optimized silver-hardware, black-net and full-collection derivatives
are reused only as small contextual choice thumbnails; there is no carousel or
secondary image stack.

The configurator is now a numbered “Choose Your Details” sequence:

1. Style — Regular T-shirt, Oversized T-shirt or Sleeveless Vest.
2. Hardware — Silver rings, Eyelets, Chains or Metal pressings.
3. Panel — Black-net insert, No net or Mixed detailing where feasible.
4. Finish — Clean black, Distressed text or Acid spray.
5. Size — XS through XXL.
6. Quantity — accessible minus/input/plus control with bounds 1–500.

Acid spray is publicly defined as an optional orangish bleach/spray effect on
black fabric. The previous public acid-effect-text wording is removed. The
existing placement and design-status choices follow the numbered grid, with a
live current-selection summary and the two approved CTAs.

`buildAfterDarkMessage()` now emits separate Garment, Hardware, Panel, Finish,
Size, Quantity, Placement and Design status lines using only current form
values. `setupAfterDarkConfigurator()` keeps the live summary synchronized and
adds bounded keyboard-accessible quantity stepping.

At desktop widths the hero uses an editorial two-column composition and the
detail area uses a balanced two-column grid. At 900 px and below the hero and
detail cards become a clear single column. Mobile choice cards remain compact
and use approved imagery as visual context without horizontal scrolling.

No production asset, protected section, wider-site accent, Netlify setting or
dependency changed. No deployment or merge occurred.

## Final approved Saturn After Dark experience — 2026-08-01

Rebuilt only the Saturn After Dark section from the final approved asset pack.
The section now opens with the dedicated flat-lay hero, followed by the four
approved gallery images in the prescribed collection, tee-and-vest, black-net
and acid-spray order. On mobile the gallery is a compact, no-autoplay swipe
rail with one image and a next-card preview; on desktop it becomes a balanced
four-image editorial row. Every informational image uses `object-fit: contain`
and carries the required design-inspiration feasibility note.

Simplified the configurator to the final five-step flow: one style, any number
of silver rings/eyelets/chains/metal pressings/black-net details, an optional
acid-spray toggle, one size and validated quantity. The visible current-state
summary and `buildAfterDarkMessage()` consume the same form values. Removed
the superseded panel, finish-list, placement and design-status questionnaire.

Added `setupAfterDarkGallery()` for live `1 of 4` swipe status and Left/Right
keyboard navigation, while retaining native scrolling and reduced-motion
support. New production WebP assets live under
`assets/images/after-dark-approved/`; the supplied PNG masters remain
unchanged inside the ignored instruction pack.

No homepage section outside Saturn After Dark, product data, Netlify setting
or dependency was changed. Nothing was deployed.

## Phase 1 stable-journey declutter — 2026-08-05

Baseline: `b2059c3219d7637d3246671b83ced6410cf51904`

This phase reduces repetition and vertical density without introducing
glassmorphism, decorative blobs, backdrop filters, new motion or new
dependencies.

Navigation now exposes only T-shirts, Designs, Process, Bulk and WhatsApp.
The links retain existing section anchors and mobile-menu behavior. The
duplicate footer WhatsApp link was removed because the required navigation,
final action and floating enquiry widget remain.

Visible copy was shortened without changing product meaning or factual
claims. Removed repetition includes the hero WhatsApp instruction, duplicate
bulk qualification paragraphs, repeated design-to-print explanations, one
duplicated After Dark feasibility note, repeated secondary-card category
labels and decorative review/final-CTA eyebrow copy. The printing video and
finished-piece text still explicitly state that they are not confirmed as the
same production sequence.

Classic optional fields remain in one native disclosure, now labelled “Add
details (optional)” and collapsed by default. The existing optional-field
message behavior is unchanged. The advanced bulk form remains behind its
existing collapsed “View bulk options” control; all bulk styles, GSM/fabric/
colour availability, printing, bulk-only embroidery and bulk kids-size facts
remain visible in the summary and chips.

All five secondary products and their product-specific links remain. Their
repeated “Bulk & branding” card labels were removed and “Ask on WhatsApp” was
shortened to “Enquire”; the existing `data-bulk-product` values and generated
messages are unchanged.

CSS spacing adjustments reduce heading margins, story media height, card
padding, review height, After Dark configurator gaps and final-CTA spacing.
Mobile major-section spacing is 60 px, within the requested 56–72 px target;
internal gaps are generally 16–24 px and touch targets retain their existing
44 px minimum.

Changed production files: `index.html` and `assets/css/site.css`. The two UX
reports were updated. JavaScript, product data, approved assets, review text,
section order, dependencies and `netlify.toml` are unchanged. No deployment
occurred.
