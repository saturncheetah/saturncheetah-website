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

The approved direction is **Concept C: balanced premium + energetic
conversion experience**.

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

### Step 2 — Choose Your Direction

- **Explore Our Designs**
  - Open the approved five-image swipe gallery inside this compact module.
  - Use `cappuccino-print.webp`, `six-seven-print.webp`,
    `udin-din-print.webp`, `blue-graphic-print.webp` and
    `balance-print.webp`.
  - Label `balance-print.webp` as inspiration/mockup unless its provenance as
    a finished customer order is confirmed.
  - Allow an accessible full-screen preview with an explicit close control,
    focus containment, Escape support, focus restoration and correct image
    position/count.
  - “Send a design like this” may set a design-reference label in the
    WhatsApp message.
  - It must not imply copyright ownership or guaranteed reproduction.

- **Create Your Own**
  - Accept a ready design, reference or idea.
  - Explain that the visitor attaches the file after WhatsApp opens.
  - Confirm feasibility, print placement, final price and timeline directly.
  - Do not create a fake live mockup or upload flow.

These are two states of one compact module, not two full-height sections.
There is no separate featured-design section on mobile.

### Step 3 — Continue to WhatsApp

The CTA carries explicit state:

- order type;
- 180 GSM regular or 240 GSM oversized;
- existing-design reference or custom-design intent;
- quantity;
- design status.

No hidden default should be interpreted as a user choice. A hero CTA should
open or scroll to the selector rather than silently choosing 180 GSM.

Matched, owner-approved visuals that clearly distinguish the 180 GSM regular
fit from the 240 GSM oversized fit are required before final publication.
Current product images are not sufficient as the final paired presentation.

## 7. Secondary bulk-product card plan

### Hierarchy

The module opens with the exact line **“Custom goods for teams, events and
brands.”** It receives approximately 20–25% of homepage emphasis; the
T-shirt-led journey above receives approximately 75–80%.

1. **Caps — mainly bulk**
   - Use `category-caps.webp`.
   - CTA: discuss a bulk requirement on WhatsApp.

2. **Coasters — mainly bulk**
   - Use `category-coasters.webp`.
   - CTA: discuss quantity and branding on WhatsApp.

3. **Mugs — mainly bulk**
   - Use `category-mugs.webp`.
   - CTA: discuss quantity, purpose and branding on WhatsApp.

Tote bags and jugs are future categories. Do not render their cards,
placeholders or labels until approved assets and owner approval exist. Never
use the mug image as evidence for jugs.

### Interaction

- Desktop: three smaller secondary cards in an asymmetric boutique row/grid;
  they must remain visibly subordinate to the T-shirt journey.
- Mobile: a clearly labelled native horizontal row with approximately 1.1
  cards visible.
- Card image ratio: 4:5.
- Hover zoom: no more than `1.04`.
- Directional movement: no more than a few pixels.
- Full card is keyboard focusable and works without hover.
- Every bulk CTA should set the exact product category and bulk intent.
- Do not create dead-end category routes; the current site has no inner routes.

## 8. Connected Choose → Print → Result module

### Purpose

Replace the current disconnected four-step grid, portrait video and customer
photos with one evidence-based narrative while explicitly distinguishing real
printing footage from separate finished examples.

### Mobile layout

One compact card contains:

1. **Design**
   - Permissioned design/reference thumbnail or neutral “share your idea”
     state.
2. **Printing**
   - Existing portrait video, poster first, explicit play.
3. **Finished result**
   - Initially show a face-free, separately labelled finished example.

Only one media state is visible at a time. A progress indicator and previous/
next controls must remain keyboard and screen-reader accessible.

### Desktop layout

Use a connected three-part composition:

`Choose/share a design → real printing footage → separate finished example`

The video remains bounded and does not dictate the full section height. Short
HTML captions state what is proven by each asset. The finished example must
not be visually joined to the video in a way that implies it is the exact
item being printed.

### Current evidence gap

No exact finished-result image is documented for
`assets/video/live-printing-demo.mp4`. The two current back-view photographs
must not be presented as results of that clip unless the owner verifies the
relationship.

For a later exact-continuity version, obtain:

- permissioned source design;
- face-free printing video of that design;
- exact finished garment photograph;
- publication consent;
- artwork-use confirmation;
- frame-by-frame video privacy review.

For the initial release, publication consent, artwork-use confirmation and the
frame-by-frame privacy review remain mandatory; the matched design/result trio
does not.

The approved initial release therefore uses the honest labels **“Real
printing footage”** and **“Separate finished example — not the item shown in
the video.”** Do not animate or word these assets as one continuous order.
An exact matched result may replace the second label only after its
relationship is documented and approved.

The module CTA is **“Discuss Your Tee on WhatsApp”** and carries the selected
180/240 and design-direction state where available.

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
| `products/regular-180-black-white.webp` | Replace before final publication | Does not clearly show fit on a person or form an approved matched pair with 240 GSM. |
| `products/oversized-240-white.webp` | Replace before final publication | Raw stockroom setting and inconsistent merchandising; not a matched counterpart to the regular-fit visual. |
| `products/oversized-240-black.webp` | Remove from the rendered journey when replacement is approved | Raw stockroom setting and partially visible person. |
| `process/live-printing-poster.jpg` | Keep conditionally | Safe poster-first process proof after privacy review. |
| `video/live-printing-demo.mp4` | Keep conditionally | Tap-to-play real process proof; requires complete privacy and relationship review. |
| `process/flamingo-back-view.webp` | Remove from default flow; reconsider only after consent and face-free crop approval | Customer-identifying context; not verified as the video result. |
| `process/pink-graphics-back-view.webp` | Remove from rendered page | Identifiable background people are visible. |
| `gallery/cappuccino-print.webp` | Keep in compact gallery | Real-work/capability example subject to artwork permission. |
| `gallery/six-seven-print.webp` | Keep in compact gallery | Real-work/capability example subject to artwork permission. |
| `gallery/udin-din-print.webp` | Keep in compact gallery | Real-work/capability example subject to artwork permission. |
| `gallery/blue-graphic-print.webp` | Keep in compact gallery | Real-work/capability example subject to artwork permission. |
| `gallery/balance-print.webp` | Keep only as labelled inspiration/mockup unless provenance is confirmed | Visually polished but not verified as a finished customer order. |
| `gallery/devotional-back-print.webp` | Exclude from the approved five-image gallery; retain source only | Possible third-party artwork; not part of the approved initial set. |

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
| `webp/category-mugs.webp` | `assets/images/boutique/category-mugs.webp` |
| `webp/custom-printing-wide.webp` | `assets/images/boutique/custom-printing-wide.webp` |

Source PNGs remain outside the production asset tree. LQIPs should be used only
if a clean blur-up implementation does not add duplicate loading or complexity;
native image loading with a matching dark background is the default.

The approved swipe gallery contains exactly five images:
`cappuccino-print.webp`, `six-seven-print.webp`, `udin-din-print.webp`,
`blue-graphic-print.webp` and `balance-print.webp`. Publication remains
conditional on artwork rights; `balance-print.webp` also requires honest
mockup/inspiration labelling unless provenance is confirmed.

Before final publication, the owner must supply or approve a visually matched,
face-free 180 GSM regular-fit and 240 GSM oversized pair. Tote-bag and jug
assets are not required for the initial release because those cards are
explicitly deferred.

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

4. **Choose Your Direction**
   - Explore/Create panels crossfade.
   - Gallery remains user-controlled; no autoplay.
   - Full-screen preview opens without zoom theatrics; focus moves into the
     modal and returns to the triggering image on close.

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

The approved initial release is dependency-free. Optional animation libraries
and 3D product experiences are outside its implementation scope and require a
separate performance case, owner approval and reduced-motion design.

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

1. **“Customise a Tee”** scrolls to the 180/240 selector.
2. Visitor explicitly selects 180 GSM regular or 240 GSM oversized.
3. Visitor selects **Explore Our Designs** or **Create Your Own** in
   **Choose Your Direction**.
4. Visitor confirms quantity and design status.
5. Optional size, colour, placement, date, city and notes remain collapsed.
6. “Continue on WhatsApp” opens the existing number with the explicit state.
7. Visitor attaches their design/reference in WhatsApp.
8. Feasibility, final price, timeline and payment are confirmed directly.

### Bulk category flow

1. Category card sets `Bulk / Business / Event`.
2. Product category is set to Caps, Coasters or Mugs.
3. Ask only quantity, purpose and design status before WhatsApp.
4. Do not imply an SKU, fabric, colour, print method, price or availability.

### CTA rules

- One primary action per module.
- **“Explore Our Designs”** opens the five-image state of **Choose Your
  Direction**; it does not open a separate mobile section.
- Preserve contextual labels:
  - “Choose 180 GSM regular”
  - “Choose 240 GSM oversized”
  - “Customise my tee”
  - “Explore this design”
  - “Discuss a bulk order”
- Gallery actions may prefill an internal design-reference label only.
- On mobile, use a delayed compact WhatsApp pill after the hero. Hide it near
  video controls, the enquiry UI, final CTA and footer. Never use a full-width
  fixed WhatsApp bar.
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
    integrated **Choose Your Direction** module and five-image modal gallery,
    connected proof module, three secondary category cards, FAQ order and
    contextual CTAs. No initial reviews section.

- `assets/css/site.css`
  - Boutique tokens, dark shell, responsive hero, compact mobile rhythm,
    selector/category/gallery layouts, motion tokens, reduced-motion path and
    responsive states.

- `assets/js/site.js`
  - Explicit selector/design state, contextual WhatsApp messages, compact
    delayed CTA visibility, process-module state, accessible gallery-modal
    behaviour and preserved navigation accessibility.

### Add by copying approved WebP files unchanged

- `assets/images/boutique/hero-desktop.webp`
- `assets/images/boutique/hero-mobile.webp`
- `assets/images/boutique/category-tshirts.webp`
- `assets/images/boutique/category-caps.webp`
- `assets/images/boutique/category-coasters.webp`
- `assets/images/boutique/category-mugs.webp`
- `assets/images/boutique/custom-printing-wide.webp`

### Add only after approved assets are supplied

- Matched, face-free 180 GSM regular-fit product visual.
- Matched, face-free 240 GSM oversized product visual.
- Exact design/reference asset for the printing story.
- Exact face-free finished-result asset for the printing video.
- Future `assets/images/boutique/category-tote-bags.webp`.
- Future `assets/images/boutique/category-jugs.webp`.

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

### Phase 0 — Record approvals and close asset gates

- Record Concept C, the integrated section order and the exact hero copy as
  approved.
- Confirm publication rights for the five approved gallery images.
- Obtain or approve matched, face-free 180 GSM and 240 GSM visuals.
- Approve which face-free finished examples may be shown under the required
  separate-example label.
- Verify every frame of the printing video for privacy and publication rights.
- Treat tote bags, jugs and reviews as deferred, non-blocking scope.

Approval gate: owner approves the five-image publication list, matched
180/240 pair and initial separately labelled finished examples.

Exit criterion: no initial-release asset would force invented, misleading or
privacy-unsafe content.

### Phase 1 — Asset import and visual foundation

- Copy only approved WebPs, including `category-mugs.webp`, into
  `assets/images/boutique/`.
- Add dark boutique UI tokens and motion tokens.
- Refine header/footer without changing conversion behaviour.

Approval gate: owner approves the imported asset manifest and visual tokens.

Testing: missing-reference check, image-dimension check, contrast checks and
baseline interaction smoke test.

Rollback point: the pre-Phase 1 Git checkpoint.

Exit criterion: assets resolve, no source image is altered, contrast passes
and the existing page remains functional.

### Phase 2 — Responsive shell and hero

- Replace the announcement/header/hero composition.
- Integrate the art-directed `<picture>`.
- Implement copy-first mobile and desktop negative-space layout.
- Use the exact approved brand line, headline, supporting copy, proof chips
  and two CTA labels.
- Add the one-time hero entrance with reduced-motion alternative.

Approval gate: owner approves desktop and mobile hero crops and exact live
copy in a private preview.

Testing: responsive checks at all listed widths, hero-source loading, image
safe areas, copy/CTA contrast, CLS and reduced motion.

Rollback point: the post-Phase 1 checkpoint.

Exit criterion: headline, one-piece proof and CTA are visible and readable at
320, 375, 390, 768, 1024, 1440 and 1920 px with no stretching or CLS.

### Phase 3 — T-shirt decision journey

- Replace two tall product cards with the compact 180/240 selector.
- Use the approved matched visuals to distinguish regular and oversized fit.
- Add the integrated **Choose Your Direction** module.
- Put the approved five-image swipe gallery and accessible full-screen modal
  inside **Explore Our Designs**.
- Put the short customisation pathway inside **Create Your Own**.
- Preserve explicit user selection in the WhatsApp flow.

Approval gate: owner approves product differentiation, five gallery labels and
the customisation copy.

Testing: selector keyboard/state tests, touch swipe, modal focus trap/Escape/
restoration, 200% zoom, artwork labels and WhatsApp state checks.

Rollback point: the post-Phase 2 checkpoint.

Exit criterion: a personal visitor reaches a correct prefilled WhatsApp
message without a hidden product default and within three intentional choices;
mobile has no separate full-height featured-design section.

### Phase 4 — Printing proof and categories

- Implement **Choose → Print → Result** with **Real printing footage** and
  separately labelled finished examples.
- Add the compact secondary module introduced by **“Custom goods for teams,
  events and brands.”**
- Show only Caps, Coasters and Mugs.
- Keep tote-bag and jug cards absent.

Approval gate: owner approves the process labels, finished examples and the
three secondary cards.

Testing: video poster/playback, privacy review, process-state keyboard
operation, bulk WhatsApp messages, lazy loading and visual-emphasis review.

Rollback point: the post-Phase 3 checkpoint.

Exit criterion: process labels are honest, only approved categories are shown,
and the page gives T-shirts approximately 75–80% and secondary goods
approximately 20–25% of emphasis.

### Phase 5 — FAQ, final conversion and compact footer

- Add the short FAQ before the final CTA.
- Add the final contextual WhatsApp CTA and compact footer.
- Replace the oversized fixed mobile bar with the delayed compact pill.
- Omit reviews completely.

Approval gate: owner approves FAQ scope, final CTA copy and pill timing.

Testing: fixed-control overlap at all mobile widths, hide/show conditions,
keyboard focus, FAQ semantics, final CTA message and no-review/no-placeholder
check.

Rollback point: the post-Phase 4 checkpoint.

Exit criterion: the mobile page follows the approved nine-section order,
feels intentionally compact, has no repeated conversion sections, no
full-width fixed bar and no review placeholder.

### Phase 6 — Validation and private preview

- Run all automated and manual checks below.
- Compare intended and actual asset mapping.
- Record validation results.
- Present local/private desktop and mobile previews.
- Do not deploy.

Approval gate: owner signs off the private preview; deployment remains a
separate future authorization.

Testing: complete Section 17, including responsive, accessibility, conversion,
performance, privacy and content checks.

Rollback point: the post-Phase 5 checkpoint or the last individually approved
phase checkpoint.

Exit criterion: all critical checks pass and the owner approves the private
preview.

## 17. Validation criteria and commands

### Approved release acceptance criteria

- Mobile follows exactly: compact header; boutique hero; 180/240 selector;
  **Choose Your Direction**; **Choose → Print → Result**; secondary bulk
  products; short FAQ; final WhatsApp CTA; compact footer.
- Desktop uses the same content sequence with editorial two-column
  compositions where appropriate.
- The hero uses the exact approved live copy, four proof chips and two CTA
  labels.
- T-shirts receive approximately 75–80% of homepage emphasis; secondary goods
  receive approximately 20–25%.
- **Choose Your Direction** contains both design paths and exactly five
  approved gallery images; mobile has no separate featured-design section.
- The gallery has accessible touch/keyboard navigation and a full-screen modal
  with focus containment, Escape close and focus restoration.
- Matched, approved, face-free visuals distinguish 180 GSM regular from
  240 GSM oversized.
- The process video is labelled **“Real printing footage”** and unrelated
  results are labelled **“Separate finished example — not the item shown in
  the video.”**
- Only Caps, Coasters and Mugs appear as secondary cards; tote bags, jugs and
  reviews do not appear.
- Mobile uses a delayed compact WhatsApp pill and no full-width fixed bar.
- Initial animation uses only CSS and vanilla JavaScript and fully respects
  reduced motion.
- No customer face, unapproved artwork, invented claim or misleading
  video-to-result relationship is published.

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
- **Choose Your Direction** state and five-image modal focus behaviour.
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
- bulk coasters;
- bulk mugs.

Every message must contain the selected intent without invented product facts.
Back/return behaviour must not silently change the selection.
Confirm that no tote-bag or jug card/message shortcut exists in the initial
release.

### Performance checks

- Confirm only the active hero loads eagerly.
- Confirm category/process images remain lazy.
- Confirm video remains unloaded until user action.
- Inspect LCP, CLS and long tasks in a local Lighthouse/DevTools run if already
  available; do not install tooling solely for this check.
- Check browser console for errors and broken resources.
- Test a representative slow mobile-network profile.

## 18. Risks and approval gates

1. **Matched product visuals:** the current files do not provide the required
   approved, face-free matched 180/240 pair; final publication is gated on it.
2. **Printing continuity:** the current video has no verified exact result
   image, so the approved separate-example label is mandatory.
3. **Generated scene text/artwork:** useful for atmosphere, not verified
   business copy or documentary print proof.
4. **Artwork rights:** all five approved gallery images require publication
   confirmation; `balance-print.webp` requires mockup/inspiration labelling
   unless provenance is confirmed.
5. **Privacy:** customer/background faces and every video frame require review.
6. **Deferred categories:** tote bags and jugs must remain absent until
   approved assets and a later owner decision exist.
7. **Reviews:** the initial release omits them; adding them later requires
   genuine text and explicit publication permission.
8. **Single-page architecture:** category cards must lead to a real selector or
   WhatsApp path, not fake or empty routes.
9. **Performance:** boutique assets must not be eagerly loaded together.
10. **Visual hierarchy:** equal-height or equal-weight card treatment could
    undermine the approved 75–80% T-shirt emphasis.

## 19. Definition of done for the later implementation

- The site reads as a dark, warm Saturn Cheetah boutique on desktop and mobile.
- T-shirts are unmistakably primary.
- Regular 180 GSM and oversized 240 GSM are distinguishable in one compact
  interaction using approved matched visuals.
- **Choose Your Direction** clearly integrates **Explore Our Designs** and
  **Create Your Own** without a separate mobile featured-design section.
- The approved five-image gallery supports swipe and an accessible full-screen
  modal.
- Caps, Coasters and Mugs are positioned as secondary bulk goods without
  invented availability; tote bags and jugs are absent.
- Responsive hero art direction uses the correct supplied source.
- The exact approved hero copy, proof chips and CTA labels are live HTML.
- Design, printing and result proof are connected honestly, with unrelated
  results explicitly labelled as separate examples.
- Mobile length is substantially reduced and no longer feels like a catalogue.
- Mobile follows the approved nine-section order and uses a delayed compact
  WhatsApp pill rather than a full-width fixed bar.
- Motion is dependency-free, purposeful, compositor-friendly and
  reduced-motion compliant.
- Reviews remain omitted.
- No customer face, unapproved artwork or fabricated review/claim is exposed.
- WhatsApp messages carry correct explicit state.
- No broken link, missing asset, overflow, stretching, CLS regression, console
  error or accessibility-critical failure remains.
- The local/private preview is approved.
- Nothing is deployed, published or changed in production.
