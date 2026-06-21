# Ali Alatas — In Pursuit of Polymathy

A single landing page for Ali Alatas, M.Sc. — built with Next.js 14, TypeScript, Tailwind, and Framer Motion.

## Stack

- Next.js 14 (App Router, static export)
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```bash
npm run build
```

Outputs to `out/` (static export, ready for any host).

## Deploy to Vercel

1. Push this repo to GitHub.
2. On https://vercel.com/new, import the GitHub repo.
3. Vercel auto-detects Next.js. Click Deploy.

Or via CLI:

```bash
vercel login
vercel
vercel --prod
```

`vercel.json` is preconfigured (Singapore region, security + cache headers).

## Sections

1. **Preface** — the bouncing draggable profile + hero copy
2. **The Polymath's Note** — gen-z manifesto
3. **The Map** — interest heatmap radar (16 lanes)
4. **Logbook** — realtime "latest" feed → external link
5. **Tillnite Studio** — library widget → external link
6. **Footer** — socials (@alataasss)

## Project structure

```
src/
├── app/
│   ├── layout.tsx       # metadata, favicon, viewport
│   ├── page.tsx         # the whole landing page
│   ├── globals.css
│   └── the-polymath-note/page.tsx
├── components/
│   ├── BrandMark.tsx
│   ├── NoCopyGuard.tsx
│   └── …
└── lib/
public/
├── 1.svg … 10.svg       # decorative shapes
├── profile.svg          # full avatar (used in bouncing profile)
├── profile-photo.png    # optimized 256px crop
└── icon.png             # favicon
```

## License

© Ali Alatas. All rights reserved.
