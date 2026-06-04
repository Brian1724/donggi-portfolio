# DESIGN.md — donggi.my

> **READ FIRST (Codex):** This is the single source of truth for this portfolio's visual design.
> Apply every token EXACTLY. Do NOT invent colors, radii, font sizes, weights, or spacing.
> When unsure, prefer the exact values here over your own judgment.
> Stack is FIXED: Next.js App Router + TypeScript + Tailwind + Framer Motion + static export (`output:"export"`).
> NEVER touch DNS / Cloudflare / `martin.donggi.my`. Only website UI code. Keep Cloudflare Pages deployable.
> Finish by running `npm run build`, fixing ALL errors, verifying §11 + §13 checklists, then commit.

---

## 0. Identity
A calm Scandinavian-magazine **visual archive** for an aspiring videographer/photographer (윤동기 / Donggi Yoon),
built on the **Wise** design language.

**Pillars:** single lime CTA · sage canvas · warm near-black ink · weight-900 heavy display ·
24px rounded cards+buttons · elevation by SURFACE CONTRAST (no heavy shadows) · generous whitespace.

**Hard bans:** dark cinematic black look · glassmorphism · neon · heavy shadows · second accent color ·
sharp-corner CTAs · hero lighter than weight 900 · generic dev-portfolio look · arbitrary off-token values.

---

## 1. Color tokens — USE THESE EXACT HEX

| Token          | Hex       | Use                                       |
|----------------|-----------|-------------------------------------------|
| canvas         | `#ffffff` | Card interiors (pure white)               |
| canvas-soft    | `#e8ebe6` | Page background (sage) — defining mood    |
| ink            | `#0e0f0c` | Default text + headings (warm olive-black)|
| ink-deep       | `#163300` | Text ON lime surfaces                     |
| body           | `#454745` | Secondary body text                       |
| mute           | `#868685` | Captions, placeholders, eyebrow, fineprint|
| primary        | `#9fe870` | Lime CTA — the ONLY accent                |
| primary-active | `#cdffad` | CTA active state                          |
| primary-pale   | `#e2f6d5` | Soft green badge / tint                    |

Rules: lime only on primary CTAs + positive badges · never lime-on-green · lime always on neutral (sage/white/ink).

---

## 2. Surface cycling = elevation (MOST IMPORTANT)
Depth comes from alternating surfaces, NOT shadows/borders.
- `hero-band` → sage `canvas-soft` · `content-band` → white `canvas` · white cards float on sage by contrast.
- `*-dark` promo → `ink` bg + `primary` text (polarity flip), used SPARINGLY (Contact only).
- Borders allowed ONLY on: tertiary buttons, inputs, the signature hero card. No `shadow-lg/xl`. No glass.

---

## 3. Typography
**Fonts (next/font):** Display = **Manrope 800/900** (sub for proprietary Wise Sans; fallback Inter 900),
var `--font-display`, ALWAYS 900 on hero. Body = **Inter 400/600** var `--font-body`. Korean = **Pretendard**.

| Role              | Size                     | Weight | Line-height |
|-------------------|--------------------------|--------|-------------|
| hero-mega         | `clamp(56px,9vw,126px)`  | 900    | 0.85        |
| sub-hero          | `clamp(40px,6vw,96px)`   | 900    | 0.9         |
| section/card head | `40px`                   | 900    | 1.0         |
| section heading   | `32px`                   | 600    | 1.2 (-.96px)|
| sub-section       | `24px`                   | 600    | 1.25(-.48px)|
| lead paragraph    | `20px`                   | 400    | 1.5         |
| body              | `16px`                   | 400/600| 1.5         |
| caption / eyebrow | `12px`                   | 400/600| 1.33        |

**Principle: hero = 900, everything else = 600. Never weight 700.**
**Allowed sizes ONLY: 12·14·16·20·24·32·40·(hero clamp). No 13/15/18/19/21/22/28/36.**

---

## 4. Spacing — 4px base, ONLY: `4·8·12·16·24·32·48`
Section band padding 48 desktop / 32 mobile · card padding 24 · container max 1200, gutter 24 · body max-width 640.

## 5. Radius — ONLY: `8` badge · `12` input · `16` mid · **`24` ★ card+button** · `9999` pill/circle
24px is the signature. No sharp corners. No 10/14/18/20/28.

---

## 6. Components
**Buttons** (ONE height ~48px = pad 12/24, radius 24, label 16/600):
- primary: bg primary · text ink-deep · secondary: bg canvas-soft · text ink ·
  tertiary: white + 1px ink border · icon: perfect circle.

**Cards** (radius 24, pad 24, no shadow):
- `work-card`: white. image top (`aspect-[4/5]` & `aspect-[4/3]` MIXED across grid, `object-cover`) →
  24px block → eyebrow(category·year, mute) → title(40/900) → 1-line summary(body). Hover: image scale 1.03 / 700ms; card static.
- `feature-sage`(canvas-soft) about/skills · `feature-green`(primary-pale) stats/badges ·
  `feature-dark`(ink+primary text) Contact ONLY — once.

**Hero (signature):** desktop SPLIT — left mega-900 headline + lead + primary CTA;
right a single white 24px card (1px ink border ok) = featured work/reel, replacing Wise's currency widget.
Mobile: stacked, card full-width below.

**Nav:** white, sticky, pad 12/24, links 14/600, right primary pill CTA. Mobile: hamburger → full-screen sage sheet.
**Footer:** ink bg, canvas-soft text, pad 48/24, body 14.
**Badge-positive:** primary-pale bg, ink-deep text, 14/600, pill, pad 4/12.

## 7. Grid
works: desktop 3-up / tablet 2-up / mobile 1-up (`gap-6 md:gap-8`) · feature grids 2–3up · body never edge-to-edge.

## 8. Responsive
mobile <768 (stack, 1-up, pad 32) · tablet 768–1023 (2-up) · desktop >=1024 (split, full, pad 48).
Touch >=48px · no horizontal scroll (`overflow-x:hidden`).

## 9. Motion (restrained)
`fadeUp`: {opacity:0,y:24}→{opacity:1,y:0}, dur 0.6, ease `[0.2,0.8,0.2,1]`, `viewport{once:true,margin:"-80px"}`.
Only 0.5–0.7s ease-out. No parallax/bounce. Only image hover scale beyond this.

## 10. Per-page
`/` sage hero(split+featured card) → white works preview(3-up) → sage about → ink Contact CTA ·
`/works` category eyebrow + staggered mixed-ratio grid · `/works/[slug]` big hero image + meta sidebar(year·role·gear) + image sequence ·
`/about` profile + timeline + skill badges · `/journal` magazine 2-col, date eyebrow · `/contact` ink feature-dark + lime CTA.

---

## 11. Acceptance — system (verify before commit)
- [ ] `npm run build` passes, static export intact
- [ ] Page bg `#e8ebe6` everywhere; cards `#ffffff`
- [ ] Every primary CTA = lime `#9fe870` pill, radius 24, text `#163300`
- [ ] Hero weight 900, clamp scales mobile→desktop
- [ ] No shadow-lg/xl / glass / neon
- [ ] Exactly ONE feature-dark (ink+lime) section, on Contact
- [ ] No horizontal scroll at 360 / 768 / 1280
- [ ] All UI radii ∈ {8,12,16,24,9999}
- [ ] DNS / Cloudflare / martin.donggi.my untouched

---

## 12. Precision polish — fix awkward shapes / sizes / line-breaks

**A. Line breaks (the #1 source of awkwardness)**
- All headings: `text-wrap: balance` → even lines, no orphan word on last line.
- Body/lead: `text-wrap: pretty` → no orphans.
- Korean MUST NOT break mid-word: `word-break: keep-all; overflow-wrap: anywhere` on every Korean container.
- No hard `<br>` in headlines except responsive splits: `<br className="hidden md:block"/>`.
- Body line length max 640px (~65–75ch); captions 480px.

**B. Type scale — snap to tokens**
- Allowed sizes only: 12·14·16·20·24·32·40·hero. Grep & replace every 13/15/18/19/21/22/28/36.
- Line-height shrinks as size grows: >=40→0.85–1.0 · 24–32→1.15–1.25 · <=20→1.5–1.6.

**C. Shapes**
- Every card 24px, every button 24px, inputs 12px, badges 8/pill. Grep `rounded-`/`border-radius`; kill 10/14/18/20/28.
- ALL buttons ONE height ~48px. Icon buttons perfect circle (w=h).
- Card images fixed `aspect-[4/5]`/`[4/3]` + `object-cover` — never let raw image set box height.

**D. Alignment & grid**
- Cards in a row EQUAL height: `items-stretch` + flex-col inside + `mt-auto` on meta/CTA.
- Eyebrow→heading→body gaps fixed 8 / 16px, same every section. Section padding identical site-wide.
- Text blocks share the section heading's left grid line — no random indents.

**E. Spacing snap** — every margin/padding ∈ {4,8,12,16,24,32,48}. Kill 6/10/14/18/20/30.

**F. Optical**
- Buttons optically centered (equal 24px L/R). Eyebrows letter-spacing 0.14em. Big headlines tracking 0 to -0.02em.

---

## 13. Acceptance — polish
- [ ] No orphan words on any headline (text-balance applied)
- [ ] Korean never breaks mid-word (keep-all everywhere)
- [ ] Grep finds ZERO off-token font-size / radius / spacing
- [ ] All cards in a grid row are equal height
- [ ] One consistent button height site-wide
- [ ] Commit: `design: apply Wise-inspired system + precision polish`


---

## 14. Logo system (YOON DONGGI — YD monogram)

The brand mark is a YD monogram inside camera-frame brackets. Three variations exist:
1. **Full lockup** (mark + "YOON DONGGI" wordmark + tagline) — black + gold
2. **Icon only** — black + gold YD in brackets
3. **Monochrome** — single-ink YD in brackets

### CRITICAL: gold vs lime conflict
The logo uses GOLD. The UI system's only accent is LIME (`#9fe870`). To avoid a second
competing accent (banned in §0), separate their roles:
- **Lime = interaction color** (CTAs, badges) — UI only.
- **Gold = logo-only signature** — appears ONLY inside the logo asset, never as UI button/text/border color.

### Placement rules
| Surface            | Variation                          | Notes                                   |
|--------------------|------------------------------------|-----------------------------------------|
| Header (sticky)    | #3 monochrome, ink `#0e0f0c`       | icon+wordmark on white; height ~28–32px |
| Footer (ink band)  | #3 monochrome, `#e8ebe6` or lime   | reversed on dark; mark sits left        |
| Hero / About top   | #1 full lockup (gold) OR #2 icon   | the one "brand moment" where gold lives |
| Favicon / app icon | #2 icon only                       | square crop, 512/192/32px               |
| OG image           | #1 full lockup on sage `#e8ebe6`   | 1200×630                                |
| Mobile nav         | #2 icon only, ink                  | wordmark hidden < 480px                  |

### Sizing & spacing
- Header logo height fixed (28–32px); never scale per-page.
- Clear space around mark = height of one bracket on all sides. Never crowd.
- Wordmark uses wide letter-spacing (~0.18em caps) — matches the supplied lockup; do NOT
  substitute a different font for the wordmark. Use the logo as an IMAGE (SVG preferred), not live text.

### Assets to add (export from the brand sheet)
Place in `public/logo/`:
- `logo-full.svg` (or .png @2x) — variation #1
- `logo-icon.svg` — variation #2
- `logo-mono-ink.svg` — variation #3, ink
- `logo-mono-light.svg` — #3 recolored `#e8ebe6` for footer
- `favicon.ico` + `icon-512.png` `icon-192.png` `apple-icon.png` — from #2
- `og-image.png` 1200×630 — #1 on sage

Next.js: wire `app/icon.png` + `app/apple-icon.png` (App Router auto-detects), and
`metadata.openGraph.images = ['/logo/og-image.png']`. Use `next/image` with fixed width/height
for header/footer marks; add descriptive `alt="YOON DONGGI"`.

### Acceptance (add to §13)
- [ ] Header shows monochrome ink logo; footer shows light/lime reversed logo
- [ ] Gold appears ONLY inside the logo image, nowhere in UI tokens
- [ ] Favicon + apple-icon + OG image wired via App Router metadata
- [ ] Logo is an SVG/Image asset (not re-typed live text); alt text set
- [ ] Logo height consistent across all pages
