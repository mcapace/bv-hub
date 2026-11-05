# Beaulieu Vineyard x Wine Spectator brand hub

Custom content hub for the BV partnership (IO: "Beaulieu Vineyard - Custom Content Package", Nov 2026 to Jun 2027).
Chapter I is live in this build; Chapters II to IV are framed as teasers and get filled in as each sponsored feature launches.

## Stack

- Vite + React 19 + TypeScript
- Three.js via @react-three/fiber and drei: the "Rutherford Dust" particle hero and the reflective 3D bottle showcase
- Framer Motion for reveals, parallax and the timeline
- Lenis smooth scrolling
- Plain CSS with brand tokens in `src/styles/global.css` (no framework)

## Run

```bash
npm install
npm run dev
```

```bash
npm run build && npm run preview
```

## Brand

Colors come straight from the 2025 BV Brand Guidelines web palette: red #67000D, gold #BC995D, paper #F8F9F5, stone #CEC5BE, charcoal #3B3E3B, ink #141313.
Logo files in `public/brand/` were cut from the one-color gold logo page of the guidelines.

Typography is a single Garamond lineage, in keeping with the brand's Adobe Garamond Pro: Cormorant Garamond for display (with its true italic used for accents) and EB Garamond for reading, with labels, nav and buttons set in true small caps (`.caps`, `.eyebrow`). There is deliberately no script face; the only script on the page is the BV logo.
To use the licensed Adobe Garamond Pro at launch, add an Adobe Fonts web project `<link>` to `index.html` and point `--font-display`, `--font-serif` and `--font-caps` at it.

## Deploy settings

Set `VITE_SITE_URL` (for example `https://bv.winespectator.com`, no trailing slash) in each Vercel environment. It makes the share image URL absolute and adds the canonical and `og:url` tags. The share image itself is `public/og-image.jpg` (1200 x 630).

## Content to confirm with BV before launch

- Destination URLs for Visit, Shop, Wine Club and the Renovation page (`src/content.ts`, `links`). Current values are best guesses at bvwines.com paths.
- The two Wine Spectator accolades on the wines panel (2021 Georges de Latour No. 2 in the Top 100; 2019 Napa Valley Cabernet Wine Value of the Year) should be checked against the WS archive before publication.
- Lifestyle photography and experience videos ("TubayYabutPhotography" folders in Katelyn's brief) were not linked; request access.

## Where things live

- `src/content.ts`: all copy, chapters, timeline entries, wines, experiences, links
- `src/components/DustScene.tsx`: hero particle shader
- `src/components/BottleScene.tsx`: 3D bottle showcase; `BottleRow.tsx` is the lightweight version shown while it loads and on devices that skip 3D
- `src/lib/device.ts`: decides when to skip the WebGL scenes (reduced motion, data saver, low memory or cores, no WebGL, or `?nogl` in the URL)
- `src/components/TimelineStory.tsx`: full-screen story view opened from a timeline card
- `src/hooks/useOverlay.ts`: scroll lock, focus trap and Escape handling shared by the menu and story view
- `src/hooks/useActiveChapter.ts`: drives the nav highlight from `data-chapter` attributes on each section
- `public/img`, `public/bottles`: optimized imagery pulled from the Treasury Widen links and Dropbox folder

## Chapter rollout

Chapter status is set in `src/content.ts` (`live`, `next`, `upcoming`). To open a chapter, flip its status, add its section component to `App.tsx` with `id="chapter-N"` and `data-chapter="N"`, and point the chapter card anchor at it.
