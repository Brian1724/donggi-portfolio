# Local Font Assets

These Latin WOFF2 subsets preserve the existing typography without build-time
Google Fonts requests. `src/app/layout.tsx` loads them with `next/font/local`.

- Inter 400/600: `@fontsource/inter` 5.3.0, https://www.npmjs.com/package/@fontsource/inter
- Manrope 800: `@fontsource/manrope` 5.3.0, https://www.npmjs.com/package/@fontsource/manrope

Each font directory includes its upstream SIL Open Font License.
Korean text continues to use the existing CSS fallback stack.
