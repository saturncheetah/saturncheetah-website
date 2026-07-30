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

## Release boundary

No Netlify deployment, DNS change, Netlify configuration change, merge or
dependency installation was performed.
