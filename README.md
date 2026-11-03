# Sprite Bench

**Turn any sprite sheet into an animated GIF in seconds.**
Free, no sign-up, and nothing leaves your browser.

[![CI](https://github.com/n8watkins/sprite-bench/actions/workflows/ci.yml/badge.svg)](https://github.com/n8watkins/sprite-bench/actions/workflows/ci.yml)
[![Ko-fi](https://img.shields.io/badge/Buy%20me%20a%20coffee-Ko--fi-ff5e5b?logo=ko-fi&logoColor=white)](https://ko-fi.com/n8watkins)

**Live:** [sprite-bench.n8builds.dev](https://sprite-bench.n8builds.dev)
**Status:** maintenance (finished, kept patched).

## What it does

Drop a sprite sheet. Get a GIF.
Everything else (grid detection, the encoder, the frame editor) is there so the GIF actually looks good.

- **Auto-detects the grid** from the background gaps between sprites, so you don't count cells by hand.
- **Live animation preview** that updates as you change settings.
- **Per-frame controls:** toggle frames in or out, nudge the crop by 1px (or 8px with Shift), hold a frame longer, reorder.
- **Stabilize:** aligns every frame to a common anchor so a drifting sprite stops bouncing.
- **Ping-pong:** bakes forward and reverse into the file.
- **Transparent GIF export** with correct disposal, so frames don't ghost over each other.
- **1x, 2x and 4x export scale** with crisp nearest-neighbor upscaling.
- **Frames as a .zip** if you want the individual PNGs instead.
- **No backend, model or API:** it runs entirely in your browser.

A demo sprite (a bouncing slime) loads on first visit, so the page is alive immediately.
Drop your own sheet on top of it.

## Who it's for

- Game developers turning sprite sheets into preview GIFs for itch.io or Steam pages.
- Pixel artists checking an animation before exporting from Aseprite.
- Anyone who has dragged a sprite sheet into ezgif and wanted more control.

## Development

```bash
git clone https://github.com/n8watkins/sprite-bench.git
cd sprite-bench
npm ci
npm run dev
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Local dev server. |
| `npm run lint` | ESLint with the Next.js core web vitals rules. |
| `npm run type-check` | TypeScript, no emit. |
| `npm test` | Vitest unit tests for the zip writer, GIF encoder and grid math (`test/`). |
| `npm run build` | Static export to `out/`. |
| `npm run preview` | Serves `out/` locally with Wrangler. |
| `npm run deploy` | Builds and deploys to Cloudflare Workers ([DEPLOY.md](DEPLOY.md)). |

The GIF test decodes the output with Python's Pillow when it is installed, and skips that check otherwise.

### How it is built

- Next.js 16 (App Router), React 19, Tailwind CSS 4 and TypeScript.
- `lib/sprite/slice.ts`: grid math, background detection, blank-frame detection, stabilize and auto-detect.
- `lib/sprite/gif.ts`: a dependency-free GIF89a encoder (exact palette for pixel art, median-cut otherwise).
- `lib/zip.ts`: a dependency-free ZIP writer (store only, since PNGs are already compressed).
- `app/page.tsx`: the whole editor; `app/about/page.tsx`: the About page; `app/opengraph-image.tsx`: the social card.

### Maintenance

- **CI** (`.github/workflows/ci.yml`) runs lint, types, tests, a build and a Wrangler dry run on every push and pull request.
- **Dependabot** opens grouped weekly updates for npm and GitHub Actions.
- **Deploys:** every push to `main` deploys the static export to Cloudflare Workers ([DEPLOY.md](DEPLOY.md)).
- Sprite Bench started as the sprite page inside the private Asset Arsenal playground and was spun out as its own free tool in June 2026.

## Support

If this saved you ten minutes of fiddling with online tools, [buy me a coffee on Ko-fi](https://ko-fi.com/n8watkins).

## License

[MIT](LICENSE).
