# DESIGN.md — Portfolio Redesign Spec

> **Rule #1: Do NOT change any data/content.** Keep all existing text, names, links, projects, skills, images, and copy exactly as they are. Only change visual design: layout, colors, typography, spacing, components, decorations, and animations. Placeholder text in the reference ("Lorem ipsum", "James Smith", "Brand") is NOT to be used. Map the user's existing content into the structures below.

---

## 1. Design Vibe

Playful-modern creative portfolio. Bold indigo + warm yellow palette, big friendly geometric headings, rounded cards, soft shadows, and hand-drawn doodle accents (squiggles, arrows, sparkles, blobs, dots). Clean white/off-white sections alternate with one saturated indigo hero. Feels energetic, approachable, professional.

---

## 2. Color Tokens

```css
:root {
  /* Brand */
  --primary:        #5B5BD6;  /* indigo - hero bg, highlighted card, icon circles, eyebrow labels */
  --primary-dark:   #4A4AC0;  /* hover state */
  --primary-light:  #A9A8E8;  /* blobs/decor (~60% opacity of primary) */
  --primary-tint:   #ECE8F5;  /* lavender card bg */

  --accent:         #F4B246;  /* yellow-orange - buttons, active nav, shapes, doodles */
  --accent-dark:    #E39F2F;  /* hover */
  --accent-tint:    #FBEEE0;  /* peach card bg */
  --star:           #E8B931;  /* rating stars */

  /* Neutrals */
  --text-heading:   #2D2F3A;  /* near-black navy */
  --text-body:      #555560;  /* gray body */
  --text-muted:     #8A8A94;  /* roles, captions */
  --bg-page:        #FFFFFF;
  --bg-soft:        #F8F8F8;  /* card & section off-white */
  --white:          #FFFFFF;
  --on-primary:     #FFFFFF;
}
```

Usage rules:
- Hero background = `--primary`; all text on it white; CTAs and active nav = `--accent`.
- Section eyebrow labels (SERVICES, ABOUT ME, PROCESS, TESTIMONIALS) = `--primary`, uppercase.
- Never use more than these 2 brand colors + neutrals. Yellow and indigo are always paired.

---

## 3. Typography

- **Primary font:** `Poppins` (Google Fonts) — headings, nav, buttons, process/testimonial text.
- **Secondary font:** `Open Sans` — card titles and card body copy in the Services / About cards (optional; Poppins everywhere is acceptable).
- Fallback: `system-ui, sans-serif`.

| Role | Size (desktop) | Weight | Color | Notes |
|---|---|---|---|---|
| Hero H1 | 64–72px, line-height 1.15 | 700 | white | 3 lines, left-aligned |
| Section H2 | 44–48px, lh 1.2 | 700 | `--text-heading` | centered (About: left) |
| Eyebrow | 16–18px, letter-spacing .02em | 600 | `--primary` | UPPERCASE |
| Card title | 24–28px | 700 (Open Sans) / 600 (Poppins) | heading | centered |
| Body / lead | 16–18px, lh 1.7 | 400 | `--text-body` | max-width ~720px, centered under H2 |
| Nav links | 17px | 500 | white / active `--accent` | |
| Button | 18–20px | 500–600 | white | |
| Caption / role | 14–16px | 400 | `--text-muted` | |

Mobile: H1 ≈ 40px, H2 ≈ 30px, body 15–16px.

---

## 4. Layout, Spacing & Shape

- Max container width: **1200–1280px**, centered, side padding 24px (mobile) / 48px+ (desktop).
- Section vertical padding: **96–120px** desktop, 64px mobile.
- Section header block (eyebrow → H2 → paragraph): centered, gaps 8px / 20px, followed by ~64px before content.
- Grid: 3 equal columns, gap **32–40px**; collapse to 1 column on mobile, 2 on tablet.
- Radius: cards **20–24px**, buttons **pill (9999px)**, small info chips **12px**, avatars/icon circles **50%**.
- Shadows: very soft — `0 10px 30px rgba(45,47,58,0.06)`; testimonial cards slightly stronger `0 12px 40px rgba(45,47,58,0.08)`.

---

## 5. Section-by-Section Spec

### 5.1 Navbar (inside hero)
- Left: logo/brand (existing name) in white, Poppins 700, ~36px.
- Center: nav links — Home, About, Services, Portfolio, Contact (use the site's existing links). Active link = `--accent`, others white. Gap ~48px.
- Right: pill CTA button (`--accent` bg, white text, ~56px tall, px 40px) — e.g. existing "Download CV"/resume link.
- Sticky on scroll with solid `--primary` background + subtle shadow.
- Mobile: hamburger → slide-down menu.

### 5.2 Hero (full indigo section)
- Background `--primary` with faint **topographic/wavy contour line pattern** (white lines at ~6–8% opacity).
- Left column (≈55%): 
  - H1 in 3 lines ("Hello, I'm / Name / Role" structure — fill with the user's existing name & title).
  - Short paragraph in white (opacity .9), max-width ~560px.
  - Button row: **primary pill button** (`--accent`, "Get Started" style) + **ghost "Watch Intro" style link** with a circular outlined yellow play icon (use for the user's secondary action, e.g. view projects/contact).
  - Vertical column of 5 white dots at far left edge (8–10px circles, 56px spacing).
- Right column (≈45%): user's profile photo, cut-out (transparent bg), anchored to bottom of hero.
  - Behind photo: large **yellow (`--accent`) organic circle/blob**, plus a smaller yellow blob left of the head, and a yellow half-circle at bottom-left of the photo.
  - **Floating white chip** top-right of the photo: big indigo number + small label (e.g. "8+ Years Experience") — use user's real stat if available, else omit.
  - **Floating white chip** bottom-left of the photo: small label + overlapping row of circular avatars + indigo count bubble (only if the user has client/social proof data; otherwise omit).
  - White hand-drawn doodles: a curly arrow pointing toward the photo (near headline) and a squiggle/check-arrow in the top-right.
  - Another column of 5 white dots on the right edge, bottom area.
- Chips: white bg, radius 8–12px, soft shadow, subtle float animation (translateY ±8px, 4s ease-in-out infinite).

### 5.3 About Me (off-white, section bg `--bg-soft` with light gray topographic line pattern)
- Two columns: image left, text right.
- **Image treatment:** photo cut-out inside a large **yellow circle**, surrounded by an offset ring: thick indigo arc (left/bottom) + dashed indigo arc (top-right). Decorations scattered: small outlined indigo circles, outlined yellow circle, solid yellow triangles, three yellow triangle "play/rewind" arrows pointing left at bottom.
- Right column: eyebrow "ABOUT ME", H2 left-aligned (2 lines), paragraph, then **two stacked info cards** (full width, radius 12px, padding 24px):
  - Card 1 background `--accent-tint` (peach); Card 2 background `--primary-tint` (lavender).
  - Each: small circled-arrow icon (outlined, yellow/gray) top-left, bold title (Open Sans 600, 22px), 2-line description below, content indented to align with title.
  - Use the user's existing highlights (projects count, experience, etc.).
- Below: pill button (`--accent`, white text, with right arrow icon →), e.g. Download CV.
- Black hand-drawn arrow doodle top-right of the section pointing at the content.

### 5.4 Services (white bg)
- Centered eyebrow "SERVICES", H2, paragraph.
- 3 cards in a row, equal height (~450px), radius 24px.
  - **Default card:** bg `--bg-soft` (#F8F8F8), very soft shadow, dark text.
  - **Highlighted/active card (middle by default, switches on hover):** bg `--primary`, all text white, icon in white.
  - Card content, centered: line-art icon (indigo, ~80px) with a soft pale-indigo circle offset behind it (bottom-left), then title (28px bold), then 3-line description.
  - Hover: card lifts (-8px), turns indigo, text white. Smooth 250ms transition.
- Decorations: yellow swirl/spiral top-left of section, 3 lavender blobs top-right, yellow hand-drawn star bottom-left-center.
- Use the user's existing services/skills as the cards; if more than 3, wrap into a grid or horizontal carousel using the same card style.

### 5.5 Working Process (white bg)
- Centered eyebrow "PROCESS", H2.
- 3 steps in a row, centered text:
  - Icon: solid **indigo circle (~120px)** with white line icon, enclosed by a thin **dashed yellow ring** (~150px).
  - Title: Poppins 600/700, 24px, heading color.
  - Description: 3 centered lines, `--text-body`.
- Between steps: **hand-drawn curved yellow arrows** pointing right (hide on mobile; stack vertically with small down arrows).
- Decorations: yellow outlined sparkle/star top-right, faint lavender triangle (play icon) top-left.
- Map to user's existing process/workflow/experience steps.

### 5.6 Testimonials (off-white bg `--bg-soft`)
- Background decor: large faint diagonal rounded bars (gray, ~5% opacity) top-left, halftone dot pattern (pale blue-gray dots fading out) bottom-right, small solid yellow dots (one top-left, one bottom-left), one solid indigo dot top-right.
- Centered eyebrow "TESTIMONIALS", H2.
- 3 white cards, radius 24px, padding 32–40px, soft shadow:
  - Row of 5 yellow stars (`--star`) at top.
  - Quote text, Poppins 16px, lh 1.7, `--text-heading` at ~85%.
  - Footer: circular avatar (~56px) + name (Poppins 500, 18px) + role (muted, 15px).
- On mobile: horizontal scroll-snap carousel or stacked.
- Use the user's existing testimonials only.

### 5.7 Remaining sections (Portfolio/Projects, Contact, Footer — if they exist in the current site)
Keep their content; restyle with the same system:
- Same eyebrow + H2 + paragraph header pattern, centered.
- Project cards: same radius/shadow as service cards, image on top, title + tags; hover lifts and shows an indigo overlay.
- Contact: form inputs with `--bg-soft` bg, radius 12px, 1px light border, focus ring `--primary`; submit = yellow pill button.
- Footer: solid `--primary` background, white text, yellow social icon hovers.

---

## 6. Components

**Primary button:** `background: var(--accent); color: #fff; border-radius: 9999px; padding: 16px 40px; font-weight: 500;` hover → `--accent-dark`, translateY(-2px), shadow `0 8px 20px rgba(244,178,70,.4)`.

**Ghost/Play button:** transparent, white text, 40px circular outlined yellow icon with filled yellow play triangle.

**Eyebrow:** uppercase, `--primary`, 600 weight, margin-bottom 8px.

**Info card:** radius 12px, padding 24px 24px 24px 80px (icon in the left gutter).

**Icon circle (process):** 120px `--primary` circle + 150px dashed 1.5px `--accent` ring (slow rotate animation 20s optional).

**Floating chip:** white, radius 10px, padding 12px 16px, shadow, float animation.

---

## 7. Decorative Assets (build as inline SVG / CSS — no external images needed)

- Hand-drawn doodles: curly arrow, squiggle-with-check arrow, curved right arrows (yellow), sparkle star (outlined yellow), swirl spiral (yellow, ~60% opacity), solid yellow star.
- Organic blobs (SVG paths) in `--accent` and `--primary-light`.
- Dots column (5 dots) and dot/halftone grid pattern.
- Topographic contour line background (SVG pattern, 5–8% opacity).
- Triangles/circles outlined and solid.
- All decorations are `pointer-events: none`, `aria-hidden="true"`, absolutely positioned, and hidden or scaled down below 768px so they never overlap text.

---

## 8. Motion

- Scroll-reveal: fade up (translateY 24px → 0, 600ms ease-out), stagger cards by 100ms.
- Hover: cards lift -8px; buttons lift -2px.
- Floating chips & doodles: gentle float loop (4–6s).
- Respect `prefers-reduced-motion` (disable loops and reveals).

---

## 9. Responsive Breakpoints

- ≥1200px: full layout as described.
- 768–1199px: 2-column grids, hero image smaller, hide some doodles.
- <768px: single column; hero text first then image; nav → hamburger; hero H1 40px; hide dot columns and most doodles; cards full width; touch targets ≥ 44px.

---

## 10. Accessibility

- Contrast: white on `#5B5BD6` passes AA for large text; keep body text on indigo at white/90%+.
- Visible focus rings (2px `--accent` outline, 2px offset).
- Alt text on all images; decorative SVGs `aria-hidden`.
- Semantic landmarks: `header`, `nav`, `main`, `section` with headings in order.

---

## 11. Instructions for the Agent (opencode)

1. Read the existing portfolio code and **inventory all content** (text, links, images, projects, skills, testimonials, contact info). Preserve every item verbatim.
2. Keep the current tech stack/framework and file structure; only refactor styling and markup structure as needed.
3. Define the color/typography tokens in Section 2–3 as CSS variables (or Tailwind theme extension).
4. Rebuild each section following Section 5, mapping existing content into the new layouts.
5. If a section from the reference has no matching data (e.g. "Real Customer" avatars, testimonials), **omit it** rather than inventing content.
6. Do not add new copy, fake stats, or placeholder text. Do not rename or remove existing pages, routes, or links.
7. Verify responsive behavior and that no functionality (forms, links, downloads, routing) is broken.
