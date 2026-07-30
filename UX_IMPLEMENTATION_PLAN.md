# Saturn Cheetah Boutique UX Implementation Plan

Status: planning only  
Branch: `planning/boutique-ux`  
Baseline: `c914054` plus the repository-root `AGENTS.md` supplied by the UX kit  
Deployment: prohibited until separately approved  

## 1. Objective

Evolve the current single-page, dependency-free Saturn Cheetah website into a
compact boutique experience that feels dark, warm, energetic, premium and
playful while preserving the validated Phase 1 conversion work.

The redesign must:

- make T-shirts the hero category;
- keep personal custom T-shirts available from one piece;
- explain the 180 GSM regular and 240 GSM oversized choices quickly;
- support both existing designs and customer-supplied customisation;
- give T-shirts approximately 75–80% of homepage emphasis;
- position caps, coasters and mugs as the initial secondary bulk offer, using
  approximately 20–25% of homepage emphasis;
- defer tote-bag and jug cards until approved assets exist;
- connect design selection, real printing and an honestly labelled finished
  result;
- reduce mobile scrolling and repeated WhatsApp prompts;
- keep real interface text in HTML;
- remain accessible, fast, maintainable and dependency-free unless a later
  measured requirement justifies otherwise.

## 2. Repository and baseline findings

### Architecture

- Maintainable source code is present, not generated deployment output.
- The site is one static route in `index.html`.
- Styling is in `assets/css/site.css`.
- Behaviour is in `assets/js/site.js`.
- Netlify publishes the repository root through `netlify.toml`.
- There is no package manager, build system, framework, component library,
  animation library, lint command, type-check command or automated test runner.
- Current runtime dependencies: none.

### Existing functionality to preserve

- Personal and bulk order intent state.
- 180 GSM regular and 240 GSM oversized product values.
- Prefilled WhatsApp messages to `917780478506`.
- Optional order details behind a disclosure.
- Mobile navigation focus trap, Escape handling and focus restoration.
- Keyboard focus styles and minimum touch-target rules.
- `prefers-reduced-motion` handling.
- Lazy-loaded below-fold media and explicit image dimensions.
- Poster-first, `preload="none"` printing video.
- No online payment gateway, analytics or stored personal information.

### Phase 1 status

Phase 1 already corrected the first-screen message, compact navigation
breakpoint, CTA contrast, touch targets, short WhatsApp funnel and mobile media
containment. Those improvements are the behavioural baseline. The boutique
phase should restructure and restyle them rather than regress them.

### Current problems to solve

- The mobile page behaves like a long catalogue because product, process and
  gallery media stack vertically.
- The same personal, bulk and WhatsApp ideas are repeated in multiple large
  sections.
- The four process cards, portrait video and two customer images do not form
  one continuous proof story.
- No exact finished result is documented for the current printing video.
- A sticky header plus a full-width fixed mobile WhatsApp bar reduces usable
  space.
- Current photography mixes polished renders, stockroom photos, customer
  snapshots and hanger images without a common art direction.
- No genuine, permissioned reviews are currently available.
- `pink-graphics-back-view.webp` contains identifiable background people and
  must not remain in the public journey.

## 3. Approved visual direction

The supplied imagery establishes the visual world:

- near-black boutique interiors;
- warm wood and amber practical lighting;
- neon pink wordmark energy;
- warm orange ringed-cheetah iconography;
- cream merchandise surfaces;
- cinematic depth of field;
- youthful custom-merchandise personality.

The interface should feel “Gen Z cool plus sophisticated,” not like a gaming
site or nightclub landing page. Use energetic accents inside a controlled
editorial system:

- dark neutral foundations;
- warm cream text and surfaces;
- neon pink for selected states and small brand moments;
- orange for action, focus and progress;
- bold display headings balanced by restrained body typography;
- large image moments separated by quiet, compact information modules;
- rounded geometry used consistently, not on every container;
- no custom cursor, particle field, scroll-jacking or constant neon pulsing.

### Proposed UI tokens for later implementation

Final values must pass contrast testing against their actual backgrounds.

| Role | Direction |
| --- | --- |
| Page background | Near-black, approximately `#080706` |
| Raised surface | Warm charcoal, approximately `#15110f` |
| Warm surface | Deep brown-black, approximately `#24150e` |
| Primary text | Warm off-white, approximately `#fff7ed` |
| Secondary text | Warm muted beige, approximately `#c7b8a8` |
| Brand energy | Neon pink sampled visually from the approved scenes |
| Primary action/focus | Warm orange sampled visually from the orbit sign |
| Light merchandising field | Cream/sand drawn from the product scenes |
| Premium ease | `cubic-bezier(0.22, 1, 0.36, 1)` |

Retain the existing system font stack for the first implementation. A new font
must not be introduced without licensing, payload and rendering approval.

## 4. Experience architecture

### Desktop boutique experience

1. Transparent header over the hero, becoming a dark readable surface after
   scroll.
2. Full-width desktop hero using the approved 16:9 source.
3. Compact T-shirt decision module with a visible 180/240 selector.
4. Compact **Choose Your Direction** module containing **Explore Our Designs**
   and **Create Your Own**.
5. Connected **Choose → Print → Result** proof module.
6. Secondary bulk products: Caps, Coasters and Mugs.
7. Short FAQ.
8. Final context-aware WhatsApp CTA.
9. Compact footer.

Desktop layouts should alternate editorial two-column and full-bleed moments.
The page must not become a grid of equally weighted cards. T-shirts retain
approximately 75–80% of homepage emphasis; secondary goods retain
approximately 20–25%. Reviews remain omitted until genuine, permissioned
reviews are supplied.

### Compact mobile structure

Target: approximately five to six 800 px screenfuls rather than the current
catalogue-length stack. The final approved order is:

1. **Compact header — about 56 px**
   - Logo, menu and one small contact action.
   - Remove the separate announcement strip; put “from one piece” in the hero.

2. **Boutique hero**
   - HTML copy and CTA appear before the visual in document order.
   - Use the supplied portrait hero as a dedicated mobile source.
   - Avoid fixed `100vh`; allow mobile browser chrome and text resizing.
   - The image and copy may visually overlap only where products and neon
     remain unobstructed.

3. **180 GSM / 240 GSM selector**
   - One segmented selector with `180 GSM Regular` and
     `240 GSM Oversized`.
   - One changing panel instead of two full product cards.

4. **Choose Your Direction**
   - **Explore Our Designs** opens the approved five-image swipe gallery.
   - **Create Your Own** opens the short customisation pathway.
   - Keep both paths inside this compact module; do not create a separate
     full-height featured-design section on mobile.

5. **Choose → Print → Result**
   - One media stage with three selectable states rather than vertically
     stacking every asset.
   - Use honest labels that do not imply an exact relationship between the
     live-printing video and separately sourced finished examples.

6. **Secondary bulk products**
   - Introduce with “Custom goods for teams, events and brands.”
   - Show only Caps, Coasters and Mugs in a compact horizontal row.
   - Do not show tote-bag or jug cards until approved assets exist.

7. **Short FAQ**
   - Use compact native disclosures.

8. **Final WhatsApp CTA**
   - Provide one clear, contextual conversion point.

9. **Compact footer**
   - Brand, WhatsApp, Instagram and verified policy links only.

Reviews are removed from the initial release. Use one persistent mobile
conversion surface at most: a delayed compact contextual WhatsApp pill that
appears only after the hero and hides near video controls, the enquiry form
and footer. Do not use a full-width fixed bar.

## 5. Responsive hero plan

### Desktop/tablet

- Use kit asset `assets/webp/hero-desktop.webp` at its intrinsic
  `1672 × 941` 16:9 ratio.
- Use the intentional dark space on the left for real HTML copy.
- Keep the T-shirt, cap, drinkware, coasters and neon sign unobstructed.
- Start with `object-position: 65% center`, then validate at 1024, 1440 and
  1920 px.
- Render the approved live text below; do not rely on text inside the image.
- Primary CTA moves to the T-shirt selector, not directly to a preselected
  form value.
- Secondary CTA moves to **Choose Your Direction** with **Explore Our
  Designs** active.

### Mobile

- Use kit asset `assets/webp/hero-mobile.webp` at its intrinsic
  `1122 × 1402` 4:5 ratio.
- Keep HTML copy separate or inside a tightly controlled dark gradient; do not
  cover the central T-shirt and product group.
- Present the headline, product promise and primary CTA before the image in
  semantic order.
- Use `object-position: center center` unless visual tests prove a safer value.
- Do not stretch the portrait asset or derive mobile by cropping the desktop
  asset.

### Approved live copy

- Brand line: **“Stay Wild. Stay Original.”**
- Headline: **“Your idea. Your design. Your tee.”**
- Supporting copy: **“Custom unisex T-shirts from one piece, with bulk
  merchandise for teams, events and brands.”**
- Proof chips:
  - **180 GSM Regular**
  - **240 GSM Oversized**
  - **From 1 Piece**
  - **Bulk Available**
- Primary CTA: **“Customise a Tee”**
- Secondary CTA: **“Explore Our Designs”**

The primary CTA scrolls to the 180/240 selector without silently selecting a
product. The secondary CTA scrolls to **Choose Your Direction** and opens its
approved five-image gallery state.

### Loading

- Use responsive `<picture>` markup with mobile and desktop media sources.
- Preload or mark high priority only for the active source.
- Preserve width/height or an explicit aspect ratio.
- Do not ship source PNGs to production.
- Do not rely on generated microtext inside the scene as website copy.

## 6. T-shirt product journey

T-shirts are the only fully developed personal/single-piece journey in this
plan.

### Step 1 — Select the base

Use an accessible segmented control, implemented as native radio inputs or an
equally robust semantic pattern:

- **180 GSM regular**
  - Unisex regular fit.
  - Everyday/familiar silhouette.
  - Personal customisation from one piece, based on current approved copy.

- **240 GSM oversized**
  - Unisex oversized fit.
  - Heavyweight, relaxed streetwear silhouette.
  - Personal customisation from one piece, based on current approved copy.

Do not use GSM alone as the decision language. Explain weight, silhouette and
likely use in plain language. Do not add unverified colours, sizes, fabric
composition, stock or prices.

### Step 2 — Select the design path

- **Choose an existing design**
  - Show a short scroll-snap row of approved existing examples.
  - “Send a design like this” may set a design-reference label in the
    WhatsApp message.
  - It must not imply copyright ownership or guaranteed reproduction.

- **Customise your own**
  - Accept a ready design, reference or idea.
  - Explain that the visitor attaches the file after WhatsApp opens.
  - Confirm feasibility, print placement, final price and timeline directly.
  - Do not create a fake live mockup or upload flow.

### Step 3 — Continue to WhatsApp

The CTA carries explicit state:

- order type;
- 180 GSM regular or 240 GSM oversized;
- existing-design reference or custom-design intent;
- quantity;
- design status.

No hidden default should be interpreted as a user choice. A hero CTA should
open or scroll to the selector rather than silently choosing 180 GSM.

## 7. Category-card plan

### Hierarchy

1. **T-shirts — primary**
   - Large lead card using `category-tshirts.webp`.
   - Opens the 180/240 journey.
   - Supports personal and bulk intent.

2. **Caps — mainly bulk**
   - Use `category-caps.webp`.
   - CTA: discuss a bulk requirement on WhatsApp.

3. **Coasters — mainly bulk**
   - Use `category-coasters.webp`.
   - CTA: discuss quantity and branding on WhatsApp.

4. **Tote bags — mainly bulk**
   - No approved tote-bag asset is supplied.
   - Use a restrained text-led placeholder only if the owner explicitly
     approves it, or defer the card until an approved image exists.

5. **Jugs — mainly bulk**
   - No approved jug asset is supplied.
   - Do not relabel `category-mugs.webp` as a jug.
   - Defer the image-led card or use a text-led bulk pathway after business
     confirmation.

### Supplied mug asset

`category-mugs.webp` is approved artwork for mugs, while the requested
business hierarchy names jugs. Keep it out of the first public integration
unless the owner confirms that mugs are also an intended category. It may not
be used as visual evidence for jugs.

### Interaction

- Desktop: one large T-shirt card plus smaller bulk-category cards in an
  asymmetric boutique grid.
- Mobile: a clearly labelled native horizontal row or two-column grid.
- Card image ratio: 4:5.
- Hover zoom: no more than `1.04`.
- Directional movement: no more than a few pixels.
- Full card is keyboard focusable and works without hover.
- Every bulk CTA should set the exact product category and bulk intent.
- Do not create dead-end category routes; the current site has no inner routes.

## 8. Connected design → printing → finished-result module

### Purpose

Replace the current disconnected four-step grid, portrait video and customer
photos with one evidence-based narrative.

### Mobile layout

One compact card contains:

1. **Design**
   - Permissioned design/reference thumbnail or neutral “share your idea”
     state.
2. **Printing**
   - Existing portrait video, poster first, explicit play.
3. **Finished result**
   - Face-free image of the exact item produced in that video.

Only one media state is visible at a time. A progress indicator and previous/
next controls must remain keyboard and screen-reader accessible.

### Desktop layout

Use a connected three-part composition:

`Design/reference → portrait printing video → exact finished garment`

The video remains bounded and does not dictate the full section height. Short
HTML captions state what is proven by each asset.

### Current evidence gap

No exact finished-result image is documented for
`assets/video/live-printing-demo.mp4`. The two current back-view photographs
must not be presented as results of that clip unless the owner verifies the
relationship.

Before implementation, obtain:

- permissioned source design;
- face-free printing video of that design;
- exact finished garment photograph;
- publication consent;
- artwork-use confirmation;
- frame-by-frame video privacy review.

If an exact set is not available, the honest fallback is:

- “Real printing footage”; and
- “Separate finished examples.”

Do not animate or word the fallback as one continuous order.

### Supporting kit asset

Use `custom-printing-wide.webp` as a boutique transition or introduction to
custom merchandise. It is brand-world imagery, not documentary proof of the
specific printing process.

## 9. Image replacement, removal and retention map

### Current production assets

| Current asset | Later action | Reason/use |
| --- | --- | --- |
| `brand/favicon-64.png` | Keep | Existing browser icon. |
| `brand/saturn-cheetah-logo.webp` | Keep | Official site mark; never regenerate or recolour. |
| `hero/oversized-front-back.webp` | Replace in hero; retain as archived source/OG fallback until approved | New art-directed desktop/mobile kit heroes establish the boutique world. |
| `products/regular-180-black-white.webp` | Retain temporarily, then replace when matched approved product photography exists | Does not clearly show fit on a person or match the boutique scene. |
| `products/oversized-240-white.webp` | Retain temporarily, then replace | Raw stockroom setting and inconsistent merchandising. |
| `products/oversized-240-black.webp` | Retain temporarily, then replace | Raw stockroom setting and partially visible person. |
| `process/live-printing-poster.jpg` | Keep conditionally | Safe poster-first process proof after privacy review. |
| `video/live-printing-demo.mp4` | Keep conditionally | Tap-to-play real process proof; requires complete privacy and relationship review. |
| `process/flamingo-back-view.webp` | Remove from default flow; reconsider only after consent and face-free crop approval | Customer-identifying context; not verified as the video result. |
| `process/pink-graphics-back-view.webp` | Remove from rendered page | Identifiable background people are visible. |
| `gallery/cappuccino-print.webp` | Keep in compact gallery | Real-work/capability example subject to artwork permission. |
| `gallery/six-seven-print.webp` | Keep in compact gallery | Real-work/capability example subject to artwork permission. |
| `gallery/udin-din-print.webp` | Keep in compact gallery | Real-work/capability example subject to artwork permission. |
| `gallery/blue-graphic-print.webp` | Keep in compact gallery | Real-work/capability example subject to artwork permission. |
| `gallery/balance-print.webp` | Keep only as labelled inspiration/mockup unless provenance is confirmed | Visually polished but not verified as a finished customer order. |
| `gallery/devotional-back-print.webp` | Keep only after publication/artwork approval | Capability example with possible third-party artwork. |

“Remove” means remove the reference from future rendered HTML. Do not delete,
rename or destructively edit the source file without a separate approval.

### UX kit assets

| Kit asset | Proposed later production mapping |
| --- | --- |
| `webp/hero-desktop.webp` | `assets/images/boutique/hero-desktop.webp` |
| `webp/hero-mobile.webp` | `assets/images/boutique/hero-mobile.webp` |
| `webp/category-tshirts.webp` | `assets/images/boutique/category-tshirts.webp` |
| `webp/category-caps.webp` | `assets/images/boutique/category-caps.webp` |
| `webp/category-coasters.webp` | `assets/images/boutique/category-coasters.webp` |
| `webp/category-mugs.webp` | Hold pending approval of mugs as a real category |
| `webp/custom-printing-wide.webp` | `assets/images/boutique/custom-printing-wide.webp` |

Source PNGs remain outside the production asset tree. LQIPs should be used only
if a clean blur-up implementation does not add duplicate loading or complexity;
native image loading with a matching dark background is the default.

## 10. Motion storyboard

Build the first version with existing CSS and vanilla JavaScript only.

### Global tokens

- Fast interaction: `180 ms`.
- Standard transition: `360 ms`.
- Section reveal: `600 ms`.
- Hero sequence: approximately `1000 ms`.
- Stagger: `60–100 ms`.
- Ease: `cubic-bezier(0.22, 1, 0.36, 1)`.
- Press scale: no lower than `0.98`.
- Card hover zoom: no higher than `1.04`.
- Decorative parallax: maximum 16 px, desktop only.

### Sequence

1. **Header**
   - Appears with the hero.
   - Transitions from transparent to dark/blurred after a small scroll.

2. **Hero**
   - Active image settles once from scale `1.025` to `1`.
   - Eyebrow and heading fade in.
   - Supporting copy follows.
   - CTAs appear last.
   - Total sequence completes in about one second without blocking input.

3. **T-shirt selector**
   - Selected indicator moves in 180–220 ms.
   - Product panel uses a short opacity/translate transition.
   - Height changes must not cause unexpected page jumps.

4. **Design path**
   - Existing/custom panels crossfade.
   - Gallery remains user-controlled; no autoplay.

5. **Printing story**
   - Progress line reveals once.
   - Step state changes only through user action or completed video playback.
   - No false “production complete” animation without an exact result.

6. **Category cards**
   - Controlled one-time entrance stagger.
   - Small image zoom and arrow shift on hover/focus.

7. **Gallery and FAQ**
   - Native scroll snap for the gallery.
   - FAQ disclosure uses a short opacity/height transition while preserving
     native semantics.

8. **Final CTA**
   - Static enough to create visual rest.
   - No pulsing, shaking or fake urgency.

### Mobile and reduced motion

- Shorten or remove spatial transitions below 768 px.
- Disable decorative parallax on mobile.
- Under `prefers-reduced-motion: reduce`, show final states immediately,
  remove transforms, stop autoplay/looping decorative media and retain clear
  state changes without motion.
- Content and controls must remain fully usable if JavaScript fails.

No animation library is justified for the first boutique implementation.
Motion or another lightweight library may be considered only after a measured
interaction cannot be maintained cleanly with CSS, Web Animations API and
`IntersectionObserver`.

## 11. Responsive image strategy

- Use `<picture>` for the art-directed hero.
- Use WebP kit assets at their supplied intrinsic dimensions.
- Keep source PNGs outside the deployed asset directory.
- Use explicit width/height or `aspect-ratio` for every image stage.
- Active hero: eager, high priority and decoded asynchronously.
- Below-fold category and printing images: `loading="lazy"` and
  `decoding="async"`.
- Video: preserve `preload="none"` and poster-first playback.
- Do not preload both desktop and mobile heroes.
- Use intentional `object-position`; never stretch.
- Avoid destructive crops and check every breakpoint for text/product loss.
- Do not expose customer faces through a wider responsive crop.
- Do not use text inside the generated scene imagery as operational or
  commercial claims.
- Do not create `srcset` derivatives until measured need and an approved,
  non-destructive generation workflow exist.

## 12. Accessibility plan

- Preserve semantic landmarks and one logical `h1`.
- Keep DOM order copy-first even where desktop presentation overlays copy.
- Use native radio inputs or an equivalent fully accessible segmented
  selector.
- Expose selected product/design state programmatically without noisy
  announcements.
- Keep every touch target at least 44 × 44 px; prefer 48 px for primary mobile
  controls.
- Preserve visible `:focus-visible` treatment against dark and image
  backgrounds.
- Keep the mobile menu focus trap, Escape closing, body scroll lock and focus
  restoration.
- Give category cards descriptive link names independent of visual text.
- Ensure horizontal galleries work with touch, mouse, keyboard and no motion.
- Use meaningful alt text based on purpose; mark decorative scene duplicates
  appropriately.
- Verify hero and card overlay contrast at every art-directed crop.
- Do not autoplay audio or require motion to understand state.
- Provide a transcript/caption strategy if the process video contains speech.
- Do not publish any face or identifying customer detail without permission.

## 13. WhatsApp conversion flow

### Primary T-shirt flow

1. Hero CTA scrolls to “Choose your tee.”
2. Visitor explicitly selects 180 GSM regular or 240 GSM oversized.
3. Visitor selects existing design or custom design.
4. Visitor confirms quantity and design status.
5. Optional size, colour, placement, date, city and notes remain collapsed.
6. “Continue on WhatsApp” opens the existing number with the explicit state.
7. Visitor attaches their design/reference in WhatsApp.
8. Feasibility, final price, timeline and payment are confirmed directly.

### Bulk category flow

1. Category card sets `Bulk / Business / Event`.
2. Product category is set to caps, tote bags, coasters or jugs.
3. Ask only quantity, purpose and design status before WhatsApp.
4. Do not imply an SKU, fabric, colour, print method, price or availability.

### CTA rules

- One primary action per module.
- Preserve contextual labels:
  - “Choose 180 GSM regular”
  - “Choose 240 GSM oversized”
  - “Customise my tee”
  - “Use an existing design”
  - “Discuss a bulk order”
- Gallery actions may prefill an internal design-reference label only.
- No fake urgency, scarcity, stock activity, countdown, review count or
  delivery promise.
- Do not store personal form data in analytics or browser storage.

## 14. Performance plan

### Initial-load targets

- Mobile LCP target: under 2.5 seconds on a representative mid-range
  Android/4G profile.
- CLS target: under 0.1.
- Avoid main-thread long tasks over 50 ms from animation logic.
- Initial critical transfer target: approximately 300 KB or less where
  practical, including the active hero, CSS, JavaScript and logo.

### Asset strategy

- Desktop hero WebP: approximately 144 KB.
- Mobile hero WebP: approximately 173 KB.
- Category WebPs: approximately 146–217 KB each, all below fold and lazy.
- Custom-printing WebP: approximately 197 KB, lazy.
- Existing process video: approximately 820 KB, loaded only after user intent.
- Do not ship the 1.7–2.2 MB source PNGs.
- Do not request both art-directed hero sources at high priority.
- Use `content-visibility` carefully and preserve intrinsic-size estimates.

### Runtime strategy

- Keep the current zero-dependency architecture.
- Animate only opacity and transforms where possible.
- Observe and reveal each section once.
- Use passive scroll handling and avoid continuous layout reads.
- Do not add a carousel library for native scroll-snap behaviour.
- Do not add a framework, CSS framework or 3D runtime.
- Retain Netlify cache/security configuration unless measured requirements
  justify a separately reviewed change.

## 15. Exact files proposed for later modification

### Modify

- `index.html`
  - Compact section order, responsive hero picture, product selector,
    existing/custom pathways, connected proof module, category cards,
    compact gallery, conditional reviews slot, FAQ order and contextual CTAs.

- `assets/css/site.css`
  - Boutique tokens, dark shell, responsive hero, compact mobile rhythm,
    selector/category/gallery layouts, motion tokens, reduced-motion path and
    responsive states.

- `assets/js/site.js`
  - Explicit selector/design state, contextual WhatsApp messages, compact
    sticky CTA visibility, process-module state and preserved navigation
    accessibility.

### Add by copying approved WebP files unchanged

- `assets/images/boutique/hero-desktop.webp`
- `assets/images/boutique/hero-mobile.webp`
- `assets/images/boutique/category-tshirts.webp`
- `assets/images/boutique/category-caps.webp`
- `assets/images/boutique/category-coasters.webp`
- `assets/images/boutique/custom-printing-wide.webp`

### Add only after approved assets are supplied

- `assets/images/boutique/category-tote-bags.webp`
- `assets/images/boutique/category-jugs.webp`
- Exact design/reference asset for the printing story.
- Exact face-free finished-result asset for the printing video.

### Add for implementation records

- `docs/boutique-ux-change-log.md`
- `docs/boutique-ux-test-report.md`

### Explicitly not proposed for modification

- `netlify.toml`
- Existing logo/favicon files.
- Existing image or video binaries.
- Existing Phase 1 audit/test documents.
- Framework/build configuration, because none exists and none is needed.

## 16. Phased implementation

Each future milestone requires a Git checkpoint before and after it, per
`AGENTS.md`. No milestone starts until its preceding review is approved.

### Phase 0 — Owner and asset confirmation

- Approve this plan and final section order.
- Confirm the category wording: mugs versus jugs.
- Supply approved tote-bag and jug imagery or approve text-led/deferred cards.
- Confirm publication rights for existing gallery artwork.
- Decide whether genuine reviews are available.
- Supply or verify an exact printing/result sequence.
- Confirm final hero and CTA wording.

Exit criterion: no unresolved content conflict would force invented or
mislabelled website content.

### Phase 1 — Asset import and visual foundation

- Copy only approved WebPs into `assets/images/boutique/`.
- Add dark boutique UI tokens and motion tokens.
- Refine header/footer without changing conversion behaviour.

Exit criterion: assets resolve, no source image is altered, contrast passes and
the existing page remains functional.

### Phase 2 — Responsive shell and hero

- Replace the announcement/header/hero composition.
- Integrate the art-directed `<picture>`.
- Implement copy-first mobile and desktop negative-space layout.
- Add the one-time hero entrance with reduced-motion alternative.

Exit criterion: headline, one-piece proof and CTA are visible and readable at
320, 375, 390, 768, 1024, 1440 and 1920 px with no stretching or CLS.

### Phase 3 — T-shirt decision journey

- Replace two tall product cards with the compact 180/240 selector.
- Add existing-design/custom-design state.
- Preserve explicit user selection in the WhatsApp flow.

Exit criterion: a personal visitor reaches a correct prefilled WhatsApp
message without a hidden product default and within three intentional choices.

### Phase 4 — Printing proof and categories

- Implement the connected process module using only verified relationships.
- Add the T-shirt-led category grid.
- Add approved bulk pathways without fake product routes.

Exit criterion: process labels are honest, category intent is correct and no
unapproved tote/jug/mug visual is published.

### Phase 5 — Gallery, trust, FAQ and final conversion

- Compress the gallery to five or six approved examples.
- Add reviews only if genuine and permissioned.
- Reorder FAQ before the final CTA.
- Replace the oversized persistent mobile control with the approved compact
  behaviour.

Exit criterion: the mobile page feels intentionally compact, has no repeated
  conversion sections and exposes no customer faces.

### Phase 6 — Validation and private preview

- Run all automated and manual checks below.
- Compare intended and actual asset mapping.
- Record results and remaining owner decisions.
- Present local/private desktop and mobile previews.
- Do not deploy.

Exit criterion: all critical checks pass and the owner approves the private
preview.

## 17. Validation criteria and commands

### Static checks

```sh
git diff --check
node --check assets/js/site.js
git status --short
```

Run a read-only local-reference check covering `src`, `href`, poster and video
sources. Validate:

- zero missing local references;
- zero duplicate HTML IDs;
- every label target exists;
- WhatsApp destination remains `917780478506`;
- no browser storage or analytics was added;
- all new asset names are lowercase and descriptive.

There is no formatter, lint, type-check, test or production build command in
the current repository. Do not invent or install one. The static publish root
itself is the production artifact.

### Responsive visual checks

Check approximately:

- 320 × 800;
- 375 × 812;
- 390 × 844;
- 768 × 1024;
- 1024 × 900;
- 1440 × 900;
- 1920 × 1080.

At every width verify:

- no horizontal overflow;
- header/menu fit;
- headline and CTA readability;
- correct mobile/desktop hero source;
- no product or neon-sign obstruction;
- no image stretching or unsafe crop;
- no customer face;
- minimum 44 px targets;
- expected compact section length;
- fixed controls do not cover content or video controls.

### Interaction and accessibility

- Full keyboard traversal.
- Menu open/close, focus trap, Escape and focus restoration.
- Product selector name, role, state and keyboard behaviour.
- Existing/custom design state.
- Process controls and video keyboard operation.
- Gallery keyboard and pointer scrolling.
- FAQ disclosure semantics.
- Visible focus on every dark/image background.
- 200% text zoom and browser zoom.
- Screen-reader landmark and heading review.
- Reduced-motion emulation: no spatial reveal, parallax or looping decorative
  motion.

### Conversion checks

Generate and inspect at least:

- one-piece 180 GSM regular/custom design;
- one-piece 240 GSM oversized/existing design;
- bulk caps;
- bulk tote bags;
- bulk coasters;
- bulk jugs.

Every message must contain the selected intent without invented product facts.
Back/return behaviour must not silently change the selection.

### Performance checks

- Confirm only the active hero loads eagerly.
- Confirm category/process images remain lazy.
- Confirm video remains unloaded until user action.
- Inspect LCP, CLS and long tasks in a local Lighthouse/DevTools run if already
  available; do not install tooling solely for this check.
- Check browser console for errors and broken resources.
- Test a representative slow mobile-network profile.

## 18. Risks and approval gates

1. **Mugs versus jugs:** the kit supplies a mug image; the requested category
   is jugs. Owner confirmation or a new jug asset is required.
2. **Missing tote-bag asset:** an image-led tote card cannot be approved yet.
3. **Printing continuity:** the current video has no verified exact result
   image.
4. **Product differentiation:** neither the kit T-shirt image nor current
   product photos provide matched regular/oversized merchandising.
5. **Generated scene text/artwork:** useful for atmosphere, not verified
   business copy or documentary print proof.
6. **Artwork rights:** gallery and devotional/customer designs need
   publication confirmation.
7. **Privacy:** customer/background faces and every video frame require review.
8. **Reviews:** omit the section unless genuine text and permission are
   supplied.
9. **Single-page architecture:** category cards must lead to a real selector or
   WhatsApp path, not fake or empty routes.
10. **Performance:** all seven kit WebPs must not be eagerly loaded together.

## 19. Definition of done for the later implementation

- The site reads as a dark, warm Saturn Cheetah boutique on desktop and mobile.
- T-shirts are unmistakably primary.
- Regular 180 GSM and oversized 240 GSM are distinguishable in one compact
  interaction.
- Existing-design and customer-customisation paths are both clear.
- Caps, tote bags, coasters and jugs are positioned as bulk without invented
  availability.
- Responsive hero art direction uses the correct supplied source.
- Design, printing and result proof are connected honestly.
- Mobile length is substantially reduced and no longer feels like a catalogue.
- Motion is purposeful, compositor-friendly and reduced-motion compliant.
- No customer face, unapproved artwork or fabricated review/claim is exposed.
- WhatsApp messages carry correct explicit state.
- No broken link, missing asset, overflow, stretching, CLS regression, console
  error or accessibility-critical failure remains.
- The local/private preview is approved.
- Nothing is deployed, published or changed in production.
