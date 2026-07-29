# Saturn Cheetah UI and Mobile Audit

Audit date: 2026-07-29  
Baseline: `502070f6e527c6fefa015fd0ca0308a27b7a6c6d`  
Mode: read-only audit; no production files changed

## Method

The committed static site was rendered in installed Chrome at 360, 390, 430,
768, 1024, and 1440 CSS pixels with a 900px viewport height. The HTML, CSS,
JavaScript, Netlify configuration, local references, media metadata, loading
attributes, and breakpoint rules were also inspected. Screenshots were
temporary audit artifacts and were not added to the repository.

This is a local baseline audit, not a substitute for testing a deployed URL on
real Android and iOS devices, slow mobile networks, screen readers, or
Netlify's final response headers.

## Executive finding

The baseline is clean, fast, and internally consistent, but its most important
mobile sales message is below the first screen. At every tested width up to
768px, the square hero image is ordered before the headline, one-piece proof,
product choices, and primary CTA. A new visitor therefore sees branding and a
large fashion image but cannot understand the offer or act within five
seconds. At 1024px and 1440px the proposition is visible, but the CTA still
falls below a 900px-tall initial viewport.

The first implementation phase should be a layout-and-funnel correction, not a
technology rewrite.

## Viewport results

| Width | Observed initial experience | Priority |
| ---: | --- | --- |
| 360px | Announcement and brand are followed by a nearly full-screen hero image. Headline, one-piece proof, GSM choices, and text CTA are below 900px. The announcement's bulk text is intentionally hidden. | Critical |
| 390px | Same image-first failure. The crop communicates two printed black tees, but not regular versus oversized or how to order. | Critical |
| 430px | Same image-first failure with slightly more of the right tee visible. No offer-level CTA appears above the fold. | Critical |
| 768px | Full desktop navigation remains active because the mobile breakpoint ends at 760px. Labels wrap and crowd the header. The image still precedes the sales copy. Floating WhatsApp is visible, but its icon-only meaning is weaker than a labelled CTA. | Critical |
| 1024px | Two-column hero works structurally. Headline begins low in the viewport and supporting copy/CTA are cut off at 900px because the section is vertically centered against a large square image. | High |
| 1440px | Strong visual balance and readable headline, but the CTA remains below 900px. Large unused upper-left space delays the proposition. | High |

## Above-the-fold audit

### What works

- “Your idea. Your design. Your tee.” is concise, ownable, and legible.
- The announcement explicitly states single-piece customization.
- The image shows front/back print capability and has a compact 33KB payload.
- Desktop navigation contains a direct “Order on WhatsApp” action.
- The floating WhatsApp control is persistently available.

### What blocks conversion

1. `.hero-copy { order: 1; }` under `@media (max-width: 960px)` puts the image
   before the message on all priority mobile widths.
2. The square hero plus 42px top padding consumes nearly the entire first
   mobile viewport.
3. The hero image does not distinguish 180 GSM regular fit from 240 GSM
   oversized; both pictured tees appear oversized.
4. The mobile first screen has no labelled WhatsApp CTA. An icon-only floating
   button is not enough for a first-time visitor.
5. At desktop widths, vertical centering against the square hero pushes the
   headline down and the CTAs below common laptop viewport heights.
6. The 1+ badge is present but can be below the fold on mobile and competes
   with the image rather than reinforcing the headline.

### Five-second comprehension test

Current mobile result: **fail**. A visitor can infer “T-shirt brand,” but not
reliably “custom printing from one piece,” “regular versus oversized,” or
“order on WhatsApp.”  
Target result: “Custom T-shirts from one piece; choose regular 180 GSM or
oversized 240 GSM; send the idea on WhatsApp.”

## Mobile experience

### Navigation

- The breakpoint at 760px leaves 768px in a crowded desktop layout.
- At 360–430px the rendered captures did not provide a visually obvious menu
  affordance; the three 2px hamburger strokes need real-device verification
  for contrast and visibility.
- The expanded menu uses adequate 13px vertical padding, but it should retain
  focus, close predictably, and expose a labelled WhatsApp action.
- Recommended breakpoint: switch to compact navigation below roughly 900px,
  based on content fit rather than a device class.

### Type and line length

- Body text at 1rem and controls at 1rem are appropriate.
- Eyebrows at 0.68–0.79rem are small; their uppercase tracking helps, but
  12–13px should be the practical lower bound.
- The 17vw mobile hero headline can become disproportionately large and create
  abrupt wrapping. Use a bounded 44–56px mobile range.
- Desktop copy measures are generally controlled. Product and form copy remain
  readable.

### Spacing and touch

- Buttons have a 50px minimum height, meeting a practical 44px touch target.
- Floating WhatsApp is 54px on mobile and 58px elsewhere.
- Header and hero consume too much vertical space before the first decision.
- Mobile section padding of 76px is generous; a 56–64px rhythm would improve
  scan speed without making the page cramped.
- Form inputs have adequate padding, but the long single-column form creates
  high perceived effort.

### Colour and visual energy

- Core navy/cream combinations are strong.
- White text on orange `#e66d48` is approximately 3.16:1; white text on green
  `#1fa463` is approximately 3.21:1. Both fail WCAG AA for normal-size text.
- The interface does not use a global dull overlay. The hero image itself has a
  gray background and dark products, which makes the first mobile screen feel
  muted and less action-oriented.
- Pale secondary text should be checked with automated contrast testing during
  implementation, especially `#c5d0da` and `#aebbc7` on navy.

### Overflow and responsiveness

- No missing local asset reference was found.
- The announcement uses a no-wrap horizontal row; at narrow widths extra
  announcement items are hidden, preventing visible overflow.
- The 768px header is the clearest fit failure. Navigation words wrap and the
  WhatsApp button becomes oversized relative to available width.
- Product, form, process, gallery, and FAQ grids collapse at defined
  breakpoints, with no obvious CSS rule that should create page-level
  horizontal overflow.

### Sticky WhatsApp

- The persistent circular button is useful but competes with video controls,
  gallery content, and form controls as the user scrolls.
- It has a good accessible label but no visible text label.
- Replace it on mobile with a compact bottom bar such as “WhatsApp your idea”
  plus a secondary “1 piece available” proof; respect safe-area insets and do
  not cover focused fields or the submit button.
- Keep the floating circle on wider screens if analytics show it assists.

### Images and video

- Hero and logo load eagerly; the hero is preloaded. This is appropriate only
  while the hero remains the likely LCP element.
- All below-fold images use `loading="lazy"` and `decoding="async"`.
- The video uses `preload="none"` and a 43KB poster, which is appropriate.
- Images have explicit HTML dimensions, reducing layout shift.
- The same image files are served at every viewport. Native `picture`,
  `srcset`, `sizes`, and AVIF/WebP variants should be used when replacement
  crops are introduced.

### Accessibility

- Skip link, focus-visible styles, reduced-motion handling, labels, semantic
  headings, and explicit control labels are good foundations.
- The icon-only fixed CTA is accessible to assistive technology but less
  discoverable visually.
- Menu keyboard behavior closes on Escape, but focus trapping/return is absent.
- Gallery captions and image alternatives are descriptive.
- Touch and keyboard tests on real devices remain unresolved.

## Conversion and sales psychology

### Personal versus bulk

The split cards correctly expose two paths, but they appear after the hero.
Make “Personal — from 1 piece” the default primary path and “Bulk — wider
range” a visually distinct secondary path. Do not mix bulk configuration into
the simple personal choice before intent is known.

### Product differentiation

The site names both products but needs a faster comparison:

- 180 GSM regular fit: everyday, lighter, standard silhouette.
- 240 GSM oversized: heavyweight, relaxed streetwear silhouette.

Show those differences beside the first choice, not several screens later.
Do not imply unverified pricing, fabric composition beyond the supplied facts,
or inventory availability.

### Trust and social proof

Current trust comes from process footage, real finished work, one-piece proof,
clear no-payment language, and direct contact details. That is valuable.
There are no reviews; this is correct until genuine, permissioned reviews are
provided. Reserve a review slot in the plan but do not render empty stars,
placeholder quotes, customer counts, or invented ratings.

Instagram should sit alongside the finished-work proof as “See current work on
Instagram,” not only beside the form and in the footer.

### Friction and hesitation

- The full enquiry form asks for many fields before WhatsApp opens.
- Use a short progressive funnel: intent, product, quantity, design status,
  then WhatsApp. Ask optional details in WhatsApp or behind “Add order
  details.”
- State what happens next: share artwork, confirm feasibility/price/timeline,
  then agree payment directly.
- Keep “No online payment” near the CTA as reassurance, not as the lead
  message.
- Use transparent qualification: final colour, size, feasibility, price, and
  delivery are confirmed on WhatsApp.

### CTA language

Preferred:

- Primary personal: “Start my 1-piece custom tee”
- Product cards: “Choose 180 GSM regular” / “Choose 240 GSM oversized”
- Persistent mobile: “WhatsApp your idea”
- Bulk: “Get a bulk quote on WhatsApp”
- Inspiration: “Send a design like this”

Avoid vague “Learn more,” artificial countdowns, fake scarcity, or claims such
as “selling fast” without verifiable stock data.

### Ethical urgency and impulse opportunities

- Use the customer's real required date to prompt early enquiry: “Need it for a
  date? Ask early so feasibility can be confirmed.”
- Offer occasion shortcuts—birthday, team, event, brand, gift—without claiming
  same-day or guaranteed delivery.
- Inspiration tiles can prefill print style/placement in WhatsApp, reducing the
  effort of an impulse enquiry.
- “One piece” is the strongest low-risk impulse trigger and should appear in
  the hero CTA and mobile bar.

## Priority issues

1. **Critical:** hero image precedes all sales copy at 360, 390, 430, and
   768px.
2. **Critical:** no labelled above-fold WhatsApp CTA on mobile.
3. **Critical:** 768px retains a crowded desktop navigation layout.
4. **High:** desktop CTA is below a 900px initial viewport.
5. **High:** hero does not explain 180 GSM versus 240 GSM.
6. **High:** orange and WhatsApp button contrast fail normal-text AA.
7. **High:** enquiry form presents too many decisions at once on mobile.
8. **Medium:** fixed WhatsApp control may cover interactive content and lacks a
   visible label.
9. **Medium:** responsive image sources/crops are absent.
10. **Medium:** genuine reviews and key business reassurance details remain
    unavailable; do not fabricate them.

## Recommended success metrics

- Hero proposition and labelled WhatsApp CTA visible without scrolling at
  360×800 and larger.
- A user can choose regular, oversized, or bulk within two taps.
- No horizontal overflow from 320px through 1440px.
- All touch targets are at least 44×44px with visible focus.
- Text contrast meets WCAG 2.2 AA.
- Mobile LCP target under 2.5 seconds on representative mid-range Android/4G
  testing.
- No customer face becomes visible at any responsive crop.
- WhatsApp message contains intent, product, quantity, and design status
  without requiring a long form.

