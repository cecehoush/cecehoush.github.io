# Development Notes

## Image management

Project images live in `public/figma/<project_slug>/`. Subfolders are treated as named image groups (e.g. `mobile/` and `desktop/` render as separate labeled rows in the popup modal). The manifest at `src/data/generated/figmaManifest.js` is auto-generated — run `npm run sync:figma-media` to regenerate manually if needed.

Adding new project images: drop PNGs or JPGs into the correct `public/figma/<project_slug>/` folder and run `npm run sync:figma-media`. The manifest updates automatically on next `npm run dev` or `npm run build` via the predev/prebuild hooks.

Target file sizes: under 300KB per photo, under 150KB per PNG. Compress before adding large files.
