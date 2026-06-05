# DESIGN.md — donggi.my (Bright Wise-Inspired Editorial)

> **READ FIRST (Codex):** Single source of truth. Apply every token EXACTLY.
> Do NOT invent colors, radii, sizes, weights, or spacing. Prefer these values over your own judgment.
> Stack FIXED: Next.js App Router + TypeScript + Tailwind + Framer Motion + static export (`output:"export"`).
> NEVER touch DNS / Cloudflare / `martin.donggi.my`. Only website UI code. Keep Cloudflare Pages deployable.
> Finish: `npm run build`, fix ALL errors, verify §11, commit, push origin main.

---

## 0. Identity & Wise mapping
A premium personal **visual archive** for 윤동기 / Donggi Yoon (aspiring videographer + photographer),
built on the REAL Wise homepage structure: BRIGHT sage hero, dark-ink headline, lime CTA only,
white cards, ONE dark-green accent section. Calm, confident, editorial — like a large brand/product team.

**Wise primitive → portfolio mapping (use this):**
| Wise original | Portfolio version |
|---|---|
| Currency-converter card (hero right) | Featured work / reel card |
| "£12 billion/month" trust row | Work stats row (videos · places · since 2026) |
| "Receive money fast" feature cards | Selected Works cards |
| Trustpilot quotes | Journal / short notes |
| "Send money to…" country links | Footer mini-sitemap |

**Hard bans:** dark cinematic black look · pure black large areas · glassmorphism · neon ·
heavy shadows · gradient noise · second accent · sharp-corner CTAs · hero lighter than 800 ·
cramped bilingual blocks · more than ONE dark-green section.

---

## 1. Color tokens — USE THESE EXACT HEX

| Token          | Hex       | Use                                       |
|----------------|-----------|-------------------------------------------|
| canvas         | `#ffffff` | Card interiors                            |
| canvas-soft    | `#e8ebe6` | Page / hero background (sage)             |
| ink            | `#0e0f0c` | Headlines + default text (warm near-black)|
| ink-deep       | `#163300` | Text on lime; deep-green section bg       |
| body           | `#454745` | Secondary body text                       |
| mute           | `#868685` | Captions, eyebrow, fine print             |
| primary        | `#9fe870` | Lime CTA — the ONLY accent                |
| primary-active | `#cdffad` | CTA hover/active                          |
| primary-pale   | `#e2f6d5` | Soft green chips / tints                   |

Rules: lime only on CTAs + positive chips · never lime-on-green · no pure black · no other accent ·
deep-green `#163300` only on the single Contact section.

---

## 2. Surface flow (Wise rhythm)
sage hero → white content bands (cards float on contrast) → sage About → white Journal →
ONE deep-green `#163300` Contact CTA → ink footer. Surface contrast = elevation. No heavy shadows.

---

## 3. Typography
Display = **Manrope 800/900** (`--font-display`). Body = **Inter 400/600** (`--font-body`).
Korean = **Pretendard**.

| Role             | Size                     | Weight | Notes                          |
|------------------|--------------------------|--------|--------------------------------|
| hero headline    | `clamp(48px,7vw,104px)`  | 900    | ink, lh 0.95, tracking -0.02em |
| section heading  | `clamp(28px,4vw,44px)`   | 800    | ink                            |
| sub-section      | `24px`                   | 600    |                                |
| lead             | `20px`                   | 400    | lh 1.6, body                   |
| body             | `16px`                   | 400/600| lh 1.7                         |
| stat number      | `clamp(28px,3vw,40px)`   | 800    | ink                            |
| eyebrow          | `12px`                   | 600    | uppercase, tracking 0.14em, mute |

**Bilingual rule (critical):** Korean NEVER touches English. Always `margin-top:20px`,
body color, 16px / lh 1.7, `word-break:keep-all`. Headlines `text-wrap:balance`.
Allowed sizes: 12·16·20·24·40·hero·stat. Hero 900, sections 800, rest 600.

---

## 4. Spacing — ONLY `4·8·12·16·20·24·32·48·96`
Section padding 96 desktop / 56 mobile · card padding 24 · container max **1200**, gutter 24 · body max 640.

## 5. Radius — `12` chip/input · `16` mid · **`24` card/button** · `9999` pill/circle. No sharp corners.

---

## 6. Components
**Buttons** (min-h 48px, radius 24 or pill, 16/600):
- primary: lime bg · ink-deep text · secondary: canvas-soft bg · ink · ghost: text link + arrow.
- Max 2 buttons per section.

**Chips:** primary-pale bg · ink-deep text · radius 12 · 14/600. Max 1 per work card, 3 in hero.

**Cards (radius 24, no shadow):**
- `featured-card` (hero right): white, 1px ink border allowed (Wise's converter slot) → large
  reel/work image aspect-[4/5] + title + 2 chips. The ONLY hero card.
- `work-card`: image aspect-[4/5] + eyebrow(category·year) + title + 1-line desc. EQUAL height
  (items-stretch, flex-col, mt-auto). Max 1 badge.
- `feature-sage` (about): sage bg, radius 24. `journal-card`: thumb + date eyebrow + title + 1-line.

**Stats strip (Wise trust row):** white or sage, 3–4 inline stats — big number (800) + small
label. e.g. "12 Films · 8 Cities · Since 2026". Thin, horizontal, no boxes.

**Hero (Wise split):** left huge ink headline + 20px gap Korean tagline + 32px gap two buttons
(lime "작업 보기" + ghost "연락하기"). Right: featured-card. Mobile: stacked.

**Nav:** white sticky, logo "Donggi Yoon" left, links 14/600, lime pill CTA right. Mobile hamburger → sage sheet.
**Contact CTA:** deep-green `#163300` rounded section, white heading + lime line + lime button. The ONE dark moment.
**Footer:** ink bg, canvas-soft text, mini-sitemap links, pad 48/24.

---

## 7. Homepage — exactly these, in order
1. **Hero** (sage, split): ink headline "Everyday moments, cinematic memories." + Korean tagline + 2 buttons; right featured-card.
2. **Stats strip**: 3–4 work stats inline.
3. **Selected Works** (white): heading + "모든 작업 보기 →" · 3 equal-height work-cards.
4. **About preview** (sage): short Korean paragraph + one image + ghost link.
5. **Journal** (white): 3 simple journal-cards.
6. **Contact CTA** (deep-green #163300): one heading + short line + lime button + ghost link.
7. **Footer** (ink): mini-sitemap.

## 8. Other pages
- `/about`: sage hero (윤동기 + role) → bilingual bio + timeline + skill chips (max 3/group).
- `/works`: quiet text-link filters → work-card grid, 1 badge each, minimal meta.
- `/works/[slug]`: large hero image → meta sidebar (year·role·gear) → image sequence.
- `/journal`: editorial, body max-width 680, spacious cards.
- `/contact`: deep-green hero (NOT black), two cols — left intro+email+3 socials, right white form card (inputs radius 12, lime button).

## 9. Responsive
mobile <768 (stack, 1-up, pad 56) · tablet 768–1023 (2-up) · desktop ≥1024 (split, 3-up, pad 96).
Touch ≥48px · no horizontal scroll.

## 10. Motion (restrained)
fadeUp {opacity:0,y:24}→{0} dur .6 ease [.2,.8,.2,1] viewport{once:true,margin:"-80px"}.
Only image hover scale 1.03 beyond this.

---

## 11. Acceptance (verify before commit)
- [ ] `npm run build` passes, static export intact
- [ ] Page bg sage `#e8ebe6`, cards white; NO pure black large areas
- [ ] Hero ink headline weight 900, clamp scales; featured-card on right (ONE card)
- [ ] Stats strip present (Wise trust-row mapping)
- [ ] Korean never touches English (margin-top 20px, keep-all)
- [ ] Selected Works = 3 EQUAL-height cards, 1 badge max
- [ ] EXACTLY ONE deep-green `#163300` section (Contact CTA); lime only on CTAs
- [ ] All radii ∈ {12,16,24,9999}; padding 96/56; container 1200
- [ ] No glass / heavy shadow / neon / gradient / second accent
- [ ] /, /about, /works, /journal, /contact render
- [ ] DNS / Cloudflare / martin.donggi.my untouched
- [ ] Commit: "feat: bright Wise-inspired editorial system" → push origin main
