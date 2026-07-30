# Saturncheetah Website Agent Instructions

## Mission

Turn the existing Saturncheetah website into an immersive, premium, conversion-focused custom-merchandise experience while preserving the approved brand imagery and the existing maintainable codebase.

## Non-negotiable safety rules

- Work only inside the current project/worktree.
- Preserve the verified baseline and create a Git checkpoint before and after each milestone.
- Do not deploy, publish, change DNS, alter the production Netlify site, or touch production credentials.
- Do not delete existing pages or business content without explicit approval.
- Do not invent prices, product availability, delivery promises, certifications, customer counts, policies, or other business claims.
- Do not rewrite official logos or product artwork using generative tools.
- Do not stretch, distort, recolour, or destructively crop approved imagery.
- Do not migrate frameworks or replace the current architecture unless explicitly approved.

## Working method

1. Inspect the existing framework, routes, components, styles, scripts, and build commands.
2. Produce a concise written implementation plan before editing.
3. Reuse the current framework and installed libraries wherever reasonable.
4. Keep changes scoped and reversible.
5. Run lint, type-check, tests, and production build after relevant milestones.
6. Report every changed file, command run, test result, and unresolved issue.

## Experience principles

- The site should feel like entering the Saturncheetah boutique: dark, warm, energetic, premium, and playful.
- Immersive does not mean busy. Motion must guide attention and reveal hierarchy.
- Never use scroll-jacking, autoplay audio, long blocking preloaders, excessive particles, or constant motion.
- Prefer transform and opacity animations for smooth performance.
- Reuse an existing animation library if already installed. Otherwise prefer CSS, Web Animations API, and IntersectionObserver over adding a large dependency.
- Disable decorative parallax on small screens and for reduced-motion users.

## Motion tokens

Use equivalent project tokens if they already exist.

- Fast interaction: 160–220 ms
- Standard transition: 300–450 ms
- Section reveal: 500–700 ms
- Hero cinematic reveal: 900–1200 ms
- Premium ease: `cubic-bezier(0.22, 1, 0.36, 1)`
- Press state: scale no lower than `0.98`
- Card image hover zoom: no more than `1.04`
- Decorative parallax travel: no more than 16 px

## Accessibility and usability

- Support `prefers-reduced-motion: reduce` with near-instant, non-spatial alternatives.
- Preserve visible keyboard focus and logical tab order.
- Mobile navigation must trap focus, close with Escape, and restore focus to its trigger.
- Use semantic headings, links, buttons, landmarks, and descriptive alternative text.
- Ensure touch targets are at least comfortable finger size and controls do not depend only on hover.
- Maintain readable contrast against image overlays.

## Image rules

- Use the supplied desktop and mobile hero files as separate art-directed sources.
- Use WebP or the framework image pipeline, with source dimensions/aspect ratios defined.
- Load the active hero eagerly and below-fold assets lazily.
- Use real HTML for all meaningful text.
- Do not treat small generated text inside scene artwork as business information.

## Definition of done

- Navigation is clear on desktop, tablet, and mobile.
- All motion is smooth, purposeful, and reduced-motion compliant.
- No visual stretching, broken images, layout shift, console errors, or broken links.
- The production build succeeds.
- Core widths are visually checked at approximately 320, 375, 390, 768, 1024, 1440, and 1920 pixels.
- No production deployment occurs without explicit approval.
