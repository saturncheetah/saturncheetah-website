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

No price, review, delivery promise, urgency, stock level, customer activity or
payment gateway was added.

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
4. Choose Your Direction
5. Choose → Print → Result
6. More Ways to Customise
7. Short FAQ
8. Final WhatsApp CTA
9. Compact footer

Desktop uses the same semantic order. It changes only the presentation:
the hero uses the 16:9 source, product and process states use editorial
two-column layouts, the five designs form one compact row, and the five
secondary products form one compact row.

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

Mobile-only category media rules now use a padded 4:3 warm-neutral frame with
full-width, centered `object-fit: contain` imagery. Caps, coasters, mugs, tote
bags and bottles therefore remain fully visible without changing their source
assets, names, order, copy or WhatsApp messages. Base desktop category-card
layout and image treatment are unchanged.

No JavaScript, image, video, Netlify configuration or 180/240 selector file,
state, copy, asset or responsive rule changed.

## Release boundary

No Netlify deployment, DNS change, Netlify configuration change, merge or
dependency installation was performed.
