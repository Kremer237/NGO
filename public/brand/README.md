# Brand assets — placeholder

Spec section 12 calls for a new logo to be developed by a designer: minimalist, institutional,
avoiding clichés (child-in-circle, hands around Africa, heart, generic globe, tree, child
silhouettes), evoking progression / protection / access / future / continuity, usable in
monochrome.

The mark here — three ascending bars with an ochre "horizon" dot — is a placeholder built to
satisfy that brief so the site isn't shipping with no identity at all. It should be replaced with
a real design deliverable (horizontal, vertical, symbol-only, black, white, color, favicon, SVG,
PNG — the exact list from section 12) before launch.

Files:
- `mark-color.svg` / `mark-ivory.svg` / `mark-black.svg` / `mark-white.svg` — symbol alone
- `logo-horizontal-color.svg` / `logo-vertical-color.svg` — lockups with wordmark
- `*.png` — rasterized exports of the above
- `app/icon.svg` and `app/apple-icon.png` (outside this folder) — favicon, picked up
  automatically by Next.js's file-convention metadata
- `app/[locale]/opengraph-image.tsx` — social preview image, generated dynamically per locale
