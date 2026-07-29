# Current Asset Reference Map

Baseline: `502070f6e527c6fefa015fd0ca0308a27b7a6c6d`

All 15 images and one video currently present are referenced. Sizes are exact
file bytes. “Crop” recommendations describe a future derivative; the baseline
files were not changed.

| Asset | Current section/use | Dimensions | Bytes | Loading | Face/privacy risk | Desktop crop recommendation | Mobile crop recommendation | Action |
| --- | --- | ---: | ---: | --- | --- | --- | --- | --- |
| `assets/images/brand/favicon-64.png` | Browser icon | 64×64 | 7,496 | Browser-managed icon | None | Keep square | Keep square | Keep |
| `assets/images/brand/saturn-cheetah-logo.webp` | Header and footer | 512×471 | 35,520 | Header eager; footer lazy + async | None | Keep full mark with clear padding | Keep full mark; verify legibility at 40–48px | Keep; consider a sharper transparent master later |
| `assets/images/hero/oversized-front-back.webp` | Hero and OG image | 1350×1350 | 33,980 | Preloaded, eager, high priority, async | No visible faces in source crop; human-body crop must remain face-safe | Use a controlled 4:5 or square crop with both prints visible; avoid cutting artwork | Replace with a purpose-made 4:3/5:4 mobile crop that leaves room for copy and never reveals heads | Replace/crop for mobile; retain as fallback/OG only after preview |
| `assets/images/products/regular-180-black-white.webp` | 180 GSM product card | 686×1200 | 61,534 | Lazy + async | None | Use 4:3 card crop centered on both tees | Use 4:3 or 1:1 crop showing both colours without excessive floor/background | Crop derivative; keep source |
| `assets/images/products/oversized-240-white.webp` | 240 GSM product card, left half | 562×1000 | 27,324 | Lazy + async | None | Match black tee scale and hem alignment | Prefer one swipeable/comparison frame or a combined crop | Keep; create matched derivative |
| `assets/images/products/oversized-240-black.webp` | 240 GSM product card, right half | 562×1000 | 33,944 | Lazy + async | None | Match white tee scale and hem alignment | Prefer one swipeable/comparison frame or a combined crop | Keep; create matched derivative |
| `assets/images/process/live-printing-poster.jpg` | Video poster | 720×1280 | 43,287 | Loaded as poster; video itself `preload="none"` | Inspect each derivative for hands/names/artwork; no face is intended | Keep 9:16 inside bounded video card | Keep 9:16; explicit play control, no autoplay | Keep; compress only if quality remains acceptable |
| `assets/video/live-printing-demo.mp4` | Live-printing proof | 478×850; 7.8 seconds | 820,366 | `preload="none"`, controls, muted, loop, playsinline | Moving media must be reviewed frame-by-frame for faces, names, and protected artwork before redesign | Keep bounded portrait player; do not crop controls | Keep poster-first and tap-to-load; avoid autoplay | Keep, pending privacy frame review |
| `assets/images/process/flamingo-back-view.webp` | Process/finished proof | 462×1000 | 67,754 | Lazy + async | Medium: customers shown from behind; responsive crops must not reveal profiles/faces | Crop 3:4 from center/top, preserving garment print | Current 4:5 mobile crop is safer but needs manual face-edge review | Crop with strict privacy check; replace if any profile appears |
| `assets/images/process/pink-graphics-back-view.webp` | Process/finished proof | 462×1000 | 69,804 | Lazy + async | Medium: customers shown from behind; responsive crops must not reveal profiles/faces | Crop 3:4 from center/top, preserving garment print | Current 4:5 mobile crop needs manual face-edge review | Crop with strict privacy check; replace if any profile appears |
| `assets/images/gallery/cappuccino-print.webp` | Finished work/inspiration | 416×900 | 40,542 | Lazy + async | Low; garment-only presentation | Use 4:5 centered on print | Use 4:5, keep artwork fully legible | Keep |
| `assets/images/gallery/six-seven-print.webp` | Finished work/inspiration | 416×900 | 35,440 | Lazy + async | Low; garment-only presentation | Use 4:5 centered on print | Use 4:5, keep artwork fully legible | Keep |
| `assets/images/gallery/udin-din-print.webp` | Finished work/inspiration | 416×900 | 48,830 | Lazy + async | Low; garment-only presentation | Use 4:5 centered on print | Use 4:5, keep artwork fully legible | Keep |
| `assets/images/gallery/blue-graphic-print.webp` | Finished work/inspiration | 416×900 | 37,144 | Lazy + async | Low; garment-only presentation | Use 4:5 centered on print | Use 4:5, keep artwork fully legible | Keep |
| `assets/images/gallery/balance-print.webp` | Finished work/inspiration | 1000×1000 | 27,494 | Lazy + async | Low; garment/artwork only | Use 4:5 only if the design remains uncropped; otherwise contain | Prefer square or contain within 4:5 to avoid clipping | Keep; adjust object-fit rather than destructive crop |
| `assets/images/gallery/devotional-back-print.webp` | Finished work/inspiration | 416×900 | 26,596 | Lazy + async | Low for faces; verify permission for visible devotional/third-party artwork | Use 4:5 centered on print | Use 4:5, preserve complete design | Keep only as capability example with permission disclaimer |

## Cross-asset findings

- Total media payload is approximately 1.42MB, dominated by the 820KB video.
- The hero is compact enough in bytes but compositionally weak for mobile.
- Portrait product/gallery sources are forced into several landscape or 4:5
  boxes with `object-fit: cover`; intentional responsive derivatives would
  provide more predictable merchandising.
- No `srcset`, `sizes`, `picture`, or AVIF alternatives exist.
- Existing HTML dimensions protect layout stability.
- Below-fold lazy loading is correctly applied.
- Customer back-view images and every video frame require privacy review after
  any crop change. A CSS crop can expose different edges even when the source
  file is unchanged.
- Artwork may be customer-owned or third-party. Continue the current
  capability-example disclaimer and do not make licensing claims.

## Replacement priority

1. **Hero:** replace or create an art-directed mobile derivative that supports
   copy-first layout and clearly communicates customization.
2. **Regular/oversized comparison:** create matched, privacy-safe product
   images with consistent scale and background.
3. **Back-view process images:** replace if a manual full-resolution review
   finds profiles or identifying details at any crop.
4. **Video:** keep the current compressed file if frame review passes; create a
   smaller mobile rendition only after measuring visual quality and playback.
