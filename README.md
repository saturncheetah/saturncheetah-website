# Saturn Cheetah — Netlify-ready static site

This package is a clean, dependency-free baseline for the Saturn Cheetah website.
It uses plain HTML, CSS and JavaScript so the initial site remains fast, easy to audit and simple to deploy on Netlify.

## Deploy

1. Extract the ZIP file.
2. In Netlify, open **Projects / Sites**.
3. Choose **Add new project / Add new site → Deploy manually**.
4. Drag the extracted `saturn-cheetah-netlify-clean` folder into the upload area.
5. Wait for the deploy to publish and test the generated `.netlify.app` URL.

## Folder structure

```text
index.html
netlify.toml
assets/
  css/site.css
  js/site.js
  images/
    brand/
    hero/
    products/
    process/
    gallery/
  video/
docs/
  asset-map.md
```

## Business configuration

- WhatsApp: `+91 77804 78506`
- Instagram: `saturncheetahstore`
- No payment gateway is included.
- Customer artwork is attached manually after WhatsApp opens.
- Customer-facing photos are limited to back views or face-free crops.

## Performance decisions

- No external fonts or JavaScript libraries.
- The hero image is preloaded; all non-critical images are lazy-loaded.
- Every image has intrinsic width and height to reduce layout shift.
- The live-printing video uses `preload="none"` and a poster image.
- The MP4 has fast-start metadata for quicker playback.
- Netlify caching and security headers are included.
- Unused assets were removed from the deployment package.

## Editing safely

- Keep filenames lowercase and use hyphens instead of spaces.
- Put assets in the matching category folder.
- Update references in `index.html` after renaming any file.
- Do not add libraries until their effect on performance and conversion is justified.
