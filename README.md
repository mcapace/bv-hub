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

Typography in this build uses open faces chosen to avoid a stock look: Fraunces (display, variable optical size with SOFT and WONK axes), Newsreader (reading), Archivo at expanded width (labels, standing in for Termina) and Mrs Saint Delafield (script, standing in for Parfumerie Script).
The brand's licensed faces (Adobe Garamond Pro, Termina, Parfumerie Script) are all on Adobe Fonts. To match exactly at launch, create an Adobe Fonts web project with those three, drop its `<link>` into `index.html`, and point the `--font-*` tokens at them.

## Content to confirm with BV before launch

- Destination URLs for Visit, Shop, Wine Club and the Renovation page (`src/content.ts`, `links`). Current values are best guesses at bvwines.com paths.
- The two Wine Spectator accolades on the wines panel (2021 Georges de Latour No. 2 in the Top 100; 2019 Napa Valley Cabernet Wine Value of the Year) should be checked against the WS archive before publication.
- Lifestyle photography and experience videos ("TubayYabutPhotography" folders in Katelyn's brief) were not linked; request access.

## Where things live

- `src/content.ts`: all copy, chapters, timeline entries, wines, experiences, links
- `src/components/DustScene.tsx`: hero particle shader
- `src/components/BottleScene.tsx`: 3D bottle showcase
- `public/img`, `public/bottles`: optimized imagery pulled from the Treasury Widen links and Dropbox folder

## Chapter rollout

Chapter status is set in `src/content.ts` (`live`, `next`, `upcoming`). To open a chapter, flip its status, add its section component to `App.tsx`, and point the chapter card anchor at it.
