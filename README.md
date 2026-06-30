# cecehoush.com — Personal Portfolio

Personal portfolio site for Cece Housh, built from scratch as a fully custom React application. Designed with accessibility, responsive layout, and thoughtful UI/UX as core priorities — reflecting the same values that drive my research and development work.

**Live site:** [cecehoush.com](https://cecehoush.com)

---

## Tech stack

- React 18 with Vite — fast build times and hot module replacement for a smooth development experience
- React Router for client-side routing across three pages
- CSS Modules for component-scoped styling with zero class name collisions
- GitHub Pages for hosting with Cloudflare custom domain for performance and HTTPS

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

## Deployment

```bash
npm run deploy
```

Builds and pushes to the `gh-pages` branch. Cloudflare handles the custom domain. The `public/404.html` SPA redirect handles client-side routing on GitHub Pages.

---

## Contact form

The contact form features a terminal-mode interface and a secondary frosted-glass simple mode. Powered by EmailJS, with domain-level security restrictions configured to ensure safe and reliable communication. A 60-second client-side cooldown prevents rapid resubmission.

---

## Roadmap

### Post-deployment
- [ ] About page — full buildout with personal content, photo, interests
- [ ] 'Currently' block — add to About or home page
- [ ] Home page project cards — make clickable (open popup or navigate to portfolio with project highlighted); accessibility review required before implementing
- [ ] Cat runner mini game — replace about section paragraph with cat-and-mouse runner game; needs CC0/CC-BY pixel art sprites for cat and mouse from itch.io or OpenGameArt
- [ ] Profile photo — finalize placement (Option A: portrait card anchored bottom-left, or Option B: faded dissolve — both implemented, toggle via PHOTO_STYLE constant in Hero.jsx)
- [ ] Light mode popups — popup modals currently stay dark in light mode intentionally; revisit post-launch
- [ ] Website button redesign — explore new visual treatment for project link buttons
- [ ] Sticky footer — or add socials to contact page (socials already added to contact simple mode as interim solution)
- [ ] Certification descriptions — add detail/context to cert entries in Portfolio Certifications tab
- [ ] Verify easy content updates — confirm adding new project/experience to portfolio.js automatically surfaces it in the right tab with no other file changes needed
- [ ] Image compression check — run before adding large new images; target under 300KB per photo, under 150KB per PNG
