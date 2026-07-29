# Phase 1 Implementation Plan

Status: proposed; not implemented  
Baseline: `502070f6e527c6fefa015fd0ca0308a27b7a6c6d`

## Phase 1 goal

Correct the mobile-first hierarchy and shorten the WhatsApp path while keeping
the static, dependency-free Netlify architecture. Phase 1 should not introduce
3D, a framework, a build system, reviews, pricing, a payment gateway, or
unverified business content.

## Exact files to modify

| File | Planned change |
| --- | --- |
| `index.html` | Reorder/refine hero content, add explicit personal/bulk intent controls, compact product comparison, shorter enquiry flow, consistent CTAs, responsive image markup, and an Instagram proof link. |
| `assets/css/site.css` | Fix mobile/768px ordering and navigation fit; add mobile tokens, compact section rhythm, accessible contrast, labelled sticky CTA, responsive crops, and safe-area handling. |
| `assets/js/site.js` | Preserve selected intent/product, generate separate personal/bulk WhatsApp messages, manage optional fields and mobile navigation focus, and avoid collecting/storing personal data. |
| `assets/images/hero/oversized-front-back.webp` | Keep as fallback initially; replace only after an approved art-directed derivative is ready. |
| `assets/images/products/regular-180-black-white.webp` | Keep source; add a future matched derivative only with explicit asset approval. |
| `assets/images/products/oversized-240-black.webp` | Keep source; add a future matched derivative only with explicit asset approval. |
| `assets/images/products/oversized-240-white.webp` | Keep source; add a future matched derivative only with explicit asset approval. |
| `netlify.toml` | No Phase 1 change unless new responsive asset formats require cache rules; any change must be separately reviewed. |

No other current file needs modification for the initial layout/funnel pass.
New derivative images, if approved, should use descriptive lowercase hyphenated
names under the existing relevant image folders.

## Exact selectors and sections affected

- `.announcement`
- `.site-header`, `.nav-wrap`, `.nav-toggle`, `.primary-nav`, `.nav-cta`
- `.hero`, `.hero-grid`, `.hero-copy`, `.hero-media`, `.hero-badge`,
  `.hero-actions`, `.trust-list`
- `.intro-strip`, `.split-cards`, `.choice-card`
- `#tees`, `.product-grid`, `.product-card`, `.product-image`,
  `.product-content`
- `#process`, `.steps-grid`, `.printing-story`, `.video-card`
- `#work`, `.gallery-grid`, `.gallery-item`, `.instagram-link`
- `.bulk-banner`, `.bulk-grid`
- `#order`, `.order-grid`, `.order-copy`, `.order-form`, `.field-row`,
  `.field`, `.form-note`
- `.faq-section`, `.faq-grid`
- `.floating-whatsapp`
- Responsive rules currently at 960px, 760px, and 460px

## Proposed mobile design tokens

```css
--mobile-page-gutter: 16px;
--mobile-section-space: 60px;
--mobile-stack-gap: 24px;
--mobile-card-padding: 20px;
--mobile-radius-card: 20px;
--mobile-radius-control: 12px;
--mobile-header-height: 64px;
--mobile-touch-min: 48px;
--mobile-body-size: 16px;
--mobile-small-size: 13px;
--mobile-h1-min: 44px;
--mobile-h1-max: 56px;
--mobile-sticky-cta-height: 64px;
```

Colour adjustments must produce at least 4.5:1 contrast for normal text and
3:1 for large text/UI boundaries. Dark navy text on orange/green is preferable
to white unless the background is darkened enough to pass.

## Proposed section order

1. Announcement
2. Compact header
3. Copy-first hero with labelled WhatsApp CTA
4. Personal versus bulk path
5. 180 GSM regular versus 240 GSM oversized
6. Four-step process
7. Real printing proof
8. Finished work/design inspiration plus Instagram
9. Genuine reviews only when real approved content exists
10. Bulk range
11. FAQ/reassurance
12. Short WhatsApp enquiry
13. Footer

## Proposed WhatsApp funnel

1. User taps personal, regular, oversized, bulk, or inspiration CTA.
2. JavaScript stores only transient in-page state; no server or browser
   persistence is required in Phase 1.
3. The short form asks for product, quantity, and design status.
4. “Add details” reveals size, colour, placement, date, city, and notes.
5. Submit validates the minimum fields and builds the appropriate personal or
   bulk message.
6. The browser opens `https://wa.me/917780478506` with encoded text.
7. User attaches artwork/reference in WhatsApp.

## Images recommended for replacement or derivative creation

1. `assets/images/hero/oversized-front-back.webp`: highest priority. Create an
   art-directed mobile crop/alternative with clear print detail and protected
   copy space.
2. The three product images: create consistent-scale regular and oversized
   merchandising derivatives if the existing crops cannot be aligned without
   hiding the silhouette.
3. `flamingo-back-view.webp` and `pink-graphics-back-view.webp`: keep only after
   full-resolution and breakpoint-specific privacy review; replace if any
   profile or identifying detail is exposed.
4. `live-printing-demo.mp4`: no automatic replacement; consider a smaller
   mobile encode only after visual and privacy QA.

## Smallest suitable technology stack

Phase 1 recommendation: **semantic HTML, existing CSS, and vanilla JavaScript
only**. No runtime dependency is justified for the first conversion fix.

| Capability | Recommendation and exact purpose | Approximate performance impact | Mobile loading | Defer? | Dependency-free alternative |
| --- | --- | --- | --- | --- | --- |
| UI components | Native HTML patterns styled in existing CSS | 0KB dependency | Yes, native | No | This is the recommendation |
| Animation | CSS transitions plus `IntersectionObserver` already present | 0KB dependency | Yes, reduced-motion aware | Noncritical effects after content | This is the recommendation |
| Advanced future animation | Motion One only if a later tested interaction cannot be expressed cleanly in CSS | Roughly 5–12KB gzip depending on import/build | Only on pages using it | Yes | CSS transforms/transitions + Web Animations API |
| Scroll interaction | Native anchors, `IntersectionObserver`, and `scrollIntoView` | 0KB dependency | Yes | Heavy effects should be omitted | This is the recommendation |
| 3D product presentation | No 3D in Phase 1. Later, `<model-viewer>` for one approved GLB viewer, not a general 3D scene | Commonly tens of KB for loader code plus model/texture payload often hundreds of KB or more | Static poster by default; opt-in load only | Always | Pre-rendered WebP/AVIF turntable or image sequence |
| General 3D engine | Do not add Three.js unless future requirements need custom geometry, materials, or camera logic beyond `<model-viewer>` | Commonly 100KB+ gzip before model/texture assets | Do not load by default | Always, user initiated | `<model-viewer>` or pre-rendered imagery |
| Product preview | Native Canvas 2D only in a later scoped prototype for positioning user artwork on a fixed tee template | 0KB dependency; generated artwork can consume memory | Only after explicit user action | Yes | Server-generated/static mockup or WhatsApp-assisted proof |
| Responsive images | Native `picture`, `srcset`, `sizes`, WebP/AVIF | 0KB runtime; usually reduces transferred bytes | Yes | Browser selects source | This is the recommendation |
| Performance monitoring | Lighthouse in development plus native `PerformanceObserver`; add a Web Vitals package only if approved analytics need standardized field metrics | 0KB runtime for local audit; a Web Vitals client is only a few KB | No analytics by default | Field reporting deferred pending privacy decision | DevTools/Lighthouse and native performance entries |

No React/Vue/Svelte framework, carousel library, form library, animation suite,
or CSS framework is warranted for Phase 1.

## Implementation sequence

1. Create a Phase 1 branch from the verified baseline and record production
   file hashes.
2. Change only hero order, height, CTA visibility, and the 768px navigation
   breakpoint.
3. Validate 360, 390, 430, 768, 1024, and 1440 before touching later sections.
4. Add the compact personal/bulk and product-choice path.
5. Shorten the form and update transient WhatsApp message generation.
6. Add responsive derivatives only after each source/crop passes privacy and
   artwork review.
7. Reorder proof, bulk, FAQ, and final enquiry sections.
8. Run local-reference, HTML, JavaScript, accessibility, keyboard, contrast,
   responsive overflow, media-loading, and WhatsApp-message tests.
9. Present the exact diff and deployment dry run. Do not deploy without an
   explicit `go`.

## Acceptance criteria

- At 360, 390, 430, 768, 1024, and 1440px, the headline, one-piece proof, and
  a labelled primary WhatsApp CTA appear in the initial viewport.
- At 768px the header does not wrap, clip, or crowd.
- The first screen distinguishes 180 GSM regular from 240 GSM oversized.
- Personal and bulk paths are distinct and reachable in one tap.
- A personal WhatsApp enquiry requires no more than product, quantity, and
  design status before continuation.
- Bulk generates a bulk-specific message.
- Every CTA uses `+91 77804 78506` / `917780478506`.
- No payment gateway or implied online checkout appears.
- No invented review, rating, urgency, price, delivery promise, or product fact
  appears.
- No customer face is visible in any crop at any target viewport.
- No horizontal overflow exists from 320px to 1440px.
- All interactive targets are at least 44×44px and keyboard accessible.
- Normal text meets WCAG 2.2 AA contrast.
- Reduced-motion behavior remains functional.
- Hero and below-fold media preserve explicit dimensions and appropriate
  loading behavior.
- All local asset references resolve and JavaScript syntax passes.
- Netlify publish root remains valid.

## Rollback procedure

1. Before implementation, tag or record the current branch point:
   `502070f6e527c6fefa015fd0ca0308a27b7a6c6d`.
2. Commit Phase 1 in small, reviewable units: hero/navigation, funnel, assets,
   then section order.
3. To abandon an unmerged Phase 1, switch back to the baseline branch; do not
   rewrite or delete the baseline commit.
4. To reverse an already merged Phase 1, use `git revert` on the Phase 1
   commits in reverse order, preserving history.
5. Re-run the baseline local-reference, JavaScript, TOML, and six-viewport
   checks after rollback.
6. Do not use `git reset --hard` or delete approved assets as a rollback
   mechanism.

