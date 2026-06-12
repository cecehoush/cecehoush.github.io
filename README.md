# cecehoush.github.io

My personal portfolio, experience, and projects — built with **Vite + React** (JavaScript) and custom CSS Modules. Dark theme, canvas bubble particle system, interactive skill drawer, and Figma design mockups.

## Develop

```bash
npm install
npm run dev      # local dev server at http://localhost:5173
```

## Build

```bash
npm run build    # outputs static site to dist/
npm run preview  # preview the production build locally
```

## Deploy (GitHub Pages)

The site deploys to the custom domain **cecehoush.com** (see `public/CNAME`).
`vite.config.js` uses `base: '/'` to serve from the apex domain.

```bash
npm run deploy   # builds, then publishes dist/ to the gh-pages branch
```

After the first deploy, set the GitHub Pages source to the `gh-pages` branch and
add the `cecehoush.com` custom domain in the repo's Pages settings.

## Project structure

```
src/
  App.jsx                 # composition + Figma modal state
  data/portfolio.js       # projects, skills, figmaData (SVG screen mockups)
  hooks/
    useTilt.js            # 3D spring-tilt RAF loop (cards + stats)
    useScrollFadeIn.js    # IntersectionObserver fade-in
  components/
    Nav, Hero, MarqueeBar, Projects, About, Footer, FigmaModal
    (each with a co-located *.module.css)
  styles/global.css       # CSS variables, reset, fonts
```

Resume and CV PDFs live in `public/` and are linked from the nav.
The design reference is `cecehoush-portfolio-mockup.html` (kept for parity).
