# cecehoush.com — Personal Portfolio

Personal portfolio site for Cece Housh, built from scratch as a fully custom React application. Designed with accessibility, responsive layout, and thoughtful UI/UX as core priorities — reflecting the same values that drive my research and development work.

**Live site:** [cecehoush.com](https://cecehoush.com)

---

## Tech stack

- React 18 with Vite
- React Router for client-side routing
- CSS Modules for component-scoped styling
- GitHub Pages for hosting with Cloudflare custom domain

---

## Features

- Light and dark mode with full WCAG AA accessibility compliance across both themes, audited with axe DevTools and WAVE
- Animated hero canvas with bubble particle system
- Interactive skill marquee with project drawer and Figma modal
- Portfolio page with tabbed layout (Projects, Work Experience, Education, Certifications) and global search
- Contact page with terminal-mode form and frosted glass simple mode, powered by EmailJS
- Manifest-based image loading system that auto-generates from folder structure
- Fully responsive across mobile, tablet, and desktop
- Hamburger nav for mobile, back-to-top button, smooth scroll behavior

---

## Running locally

```bash
npm install
npm run dev
```

The manifest generation script runs automatically before dev and build via the `predev` and `prebuild` hooks in `package.json`. If you add images to `public/figma/<project>/`, they will be picked up automatically on next dev start or build — no manual updates needed.

---

## Project structure

```
src/
  components/     # All React components and their CSS modules
  data/           # portfolio.js (single source of truth for all content)
  data/generated/ # Auto-generated figma image manifest (do not edit manually)
  styles/         # Global CSS and theme tokens
public/
  figma/          # Project images organized by project slug
  CNAME           # Custom domain for GitHub Pages
```

---

## Image management

Project images live in `public/figma/<project_slug>/`. Subfolders are treated as named image groups (e.g. `mobile/` and `desktop/` render as separate labeled rows in the popup modal). The manifest at `src/data/generated/figmaManifest.js` is auto-generated — run `npm run sync:figma-media` to regenerate manually if needed.

---

## Deployment

```bash
npm run deploy
```

Builds and pushes to the `gh-pages` branch. Cloudflare handles the custom domain. The `public/404.html` SPA redirect handles client-side routing on GitHub Pages.

---

## Contact form

Powered by EmailJS (free tier, 200 requests/month). Credentials are in `Contact.jsx` — the public key is intentionally client-side as EmailJS is a browser-first service. Domain restriction is configured in the EmailJS dashboard to limit requests to cecehoush.com.
