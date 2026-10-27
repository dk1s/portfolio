# Deepak Kumar — Portfolio

Personal portfolio and résumé site for Deepak Kumar, Software Developer at 86 Agency.

**Live:** https://dk1s.github.io/Portfolio/

## Stack

- Vite + React 18 + TypeScript
- Tailwind CSS with a token-based design system (emerald brand, dark-first, full light theme)
- shadcn/ui primitives
- Framer Motion for scroll reveals and layout transitions
- next-themes for light/dark switching
- Zod for contact form validation

## Getting started

```sh
npm install
npm run dev            # dev server
npm run build          # production build to dist/
npm run preview        # serve the production build locally
npm run lint           # eslint
npm run test           # vitest
npm run typecheck      # tsc, no emit

# Run every gate in sequence (typecheck, lint, tests, build, contrast audit)
npm run verify

# Regenerate favicons and the social share image (requires python3 + Pillow)
npm run assets

# WCAG contrast audit of the design tokens in src/index.css
npm run check:contrast
```

## Contact form

The form needs an inbox-backed endpoint so messages actually arrive. Copy the example
file and set **one** of the two keys:

```sh
cp .env.example .env
```

| Variable | Where to get it |
| --- | --- |
| `VITE_FORMSPREE_ENDPOINT` | [formspree.io](https://formspree.io) — create a form, copy its endpoint URL |
| `VITE_WEB3FORMS_KEY` | [web3forms.com](https://web3forms.com) — copy your access key |

With neither set, the form falls back to opening the visitor's mail client with the
message pre-filled, so enquiries are never silently dropped. Restart the dev server
after changing `.env`.

## Editing content

Portfolio content is data-driven. Two options:

1. **In the browser** — press `d` `k` `s` in sequence to reveal the admin button, then
   edit sections. Changes persist to `localStorage` for that browser only.
2. **In the source** — edit the defaults in `src/contexts/PortfolioContext.tsx`.

The admin panel is a local editing convenience, not a CMS: it has no backend and does
not publish anywhere. To make edits global, change the defaults in
`src/contexts/PortfolioContext.tsx` and redeploy.

## Project structure

```
src/
  components/        page sections and shared UI
    Section.tsx      section wrapper (rhythm, tone, container)
    SectionHeading.tsx  the single heading pattern used site-wide
    SectionReveal.tsx   scroll-triggered entrance
    ProjectIcon.tsx     maps project.icon keys to lucide icons
  contexts/
    PortfolioContext.tsx  all site content + local admin auth
  lib/
    contact.ts       form delivery (Formspree / Web3Forms / mailto fallback)
    nav.ts           section ids and scroll helpers
  hooks/
    useActiveSection.ts  nav scrollspy + reading progress
    usePointerGlow.ts    cursor-following spotlight for cards
scripts/
  make_favicons.py     renders the favicon set from system fonts
  make_og_image.py     renders the 1200x630 social share image
  check_contrast.py    WCAG audit of the colour tokens
```

## Design system

Colours live as HSL triplets in `src/index.css`; Tailwind exposes them via
`tailwind.config.ts`. Both themes are fully defined, so light and dark are intentional
rather than one being an afterthought. Use `Section` and `SectionHeading` for new
sections so spacing and hierarchy stay consistent.

**Fluid type scale.** `fontSize` in `tailwind.config.ts` uses `clamp()` so headings
interpolate smoothly between 375px and 1440px viewports instead of jumping at
breakpoints. Small sizes stay fixed, since fluid body text hurts legibility.

**Contrast.** Every foreground/background pairing is checked by
`npm run check:contrast`, including the 3:1 non-text bar for form fields (WCAG 1.4.11).
Run it after changing any colour token.

**Assets.** Favicons and `og-image.png` are generated from system fonts rather than
hand-exported, so they stay reproducible and consistent. Run `npm run assets` after
changing brand colours. Requires `python3` with Pillow.

## Deployment

Static build — deploy the `dist/` folder to GitHub Pages, Netlify, Vercel, or any static
host. Remember to update the `og:image`, `canonical` and JSON-LD URLs in `index.html` if
the domain changes.
