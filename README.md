# Donggi Portfolio

Personal visual archive and portfolio website for 윤동기 / Donggi Yoon.

The site is built for an aspiring videographer and photographer, with sections for photos, videos, travel memories, creative process notes, and portfolio projects.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion
- Data-driven content in `src/data`
- Static export-ready build for Cloudflare Pages

## Getting Started

Install dependencies:

```bash
npm install
```

Create a local environment file:

```bash
cp .env.example .env.local
```

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

Build the static site:

```bash
npm run build
```

The static export is written to `out/`.

## Domain And Environment

The public site URL is controlled in one place:

```bash
NEXT_PUBLIC_SITE_URL=https://donggi.my
```

This value is used for `metadataBase`, canonical URLs, Open Graph image URLs, RSS feed URLs, robots, and sitemap URLs.

Local fallback:

```bash
http://localhost:3000
```

Production domains for this portfolio:

- `donggi.my`
- `www.donggi.my`

Important:

- Do not modify, use, or deploy this portfolio to `martin.donggi.my`.
- `martin.donggi.my` is reserved for the Hermes Telegram webhook.
- Cloudflare DNS or Pages settings for `martin.donggi.my` must remain untouched.

## Content

Portfolio data:

- `src/data/works.ts`
- `src/data/journal.ts`
- `src/data/profile.ts`
- `src/data/skills.ts`
- `src/data/timeline.ts`

Project media lives in `public/images`. Replace files at the same paths when new photos, videos, thumbnails, or Open Graph images are ready.

## Cloudflare Pages Deployment

This project is configured as a static Next.js export with `output: "export"`.

Recommended Cloudflare Pages setup:

- Framework preset: `Next.js (Static HTML Export)`
- Build command: `npm run build`
- Build output directory: `out`
- Environment variable: `NEXT_PUBLIC_SITE_URL=https://donggi.my`
- Custom domains: `donggi.my` and `www.donggi.my`

Do not add `martin.donggi.my` to this Pages project. Do not edit its DNS record, route, worker, webhook, or Pages custom domain configuration.

## Checks

Run before deploying:

```bash
npm run lint
npm run build
```

## Routes

- `/`
- `/about`
- `/works`
- `/works/[slug]`
- `/journal`
- `/journal/[slug]`
- `/contact`
- `/rss.xml`
- `/sitemap.xml`
- `/robots.txt`

## Notes

Cloudflare's current Pages documentation lists `Next.js (Static HTML Export)` with `npx next build` and `out` for static Next.js sites. This project keeps the package script as `npm run build`, which runs `next build` and produces the same `out` directory through the Next config.
