# Deploying Sprite Bench

The site is a fully static Next.js export (`output: "export"`) served by Cloudflare Workers static assets, with no server routes and no Worker script.
The `sprite-bench` Worker in the owner's Cloudflare account (`wrangler.jsonc`) serves `out/` at https://sprite-bench.n8builds.dev.
The hostname is attached as a Workers custom domain, so Cloudflare creates and manages its DNS record itself; the `workers.dev` address is turned off.
The old address, https://sprite-bench.vercel.app, redirects there with a 301 (`vercel.json`) until the Vercel project is deleted.

Headers live in `public/_headers`, because a static export has no server to send them.
There is no runtime image optimizer, so images ship as committed; add small copies (like `public/n8-icon-32.png`) instead of shrinking large files in the browser.
The share card (`app/opengraph-image.tsx`) is rendered once at build time into `out/opengraph-image`, and `public/_headers` gives it its `image/png` type.
The `child_process` and `fs` imports in `test/` run only under Vitest and never ship to the site.

## Automatic deploys

`.github/workflows/deploy.yml` builds and deploys on every push to `main`, and on demand from the Actions tab.
It needs a `CLOUDFLARE_API_TOKEN` repository secret: a Cloudflare API token made from the "Edit Cloudflare Workers" template, limited to the owner's account.
Until that secret exists, the workflow builds and then skips the deploy with a notice.

## Deploy by hand

Log in once with `npx wrangler login` (check with `npx wrangler whoami`).
Run `npm run lint && npm run type-check && npm test`, then `npm run deploy`.
`npm run deploy` runs `next build` (writes `out/`) and then `wrangler deploy`, which uploads only changed assets.
To check the build locally first, run `npm run build && npm run preview` and open http://localhost:8787.

## Reading the logs

Workers Logs is on (`observability` in `wrangler.jsonc`, every request kept), but this Worker has no script, and requests served straight from static assets produce no log entries, so Logs and `wrangler tail` stay empty.
For traffic and errors, use the Worker's Metrics tab: in the Cloudflare dashboard, open Workers & Pages, then the `sprite-bench` Worker, then Metrics.
If a script is ever added, its invocations show up under Logs, and `npx wrangler tail sprite-bench --format pretty` streams them live.
`--search` matches log messages only, not request URLs, so use `--status error` or no filter to see requests.

## Roll back

Run `npx wrangler deployments list` to see recent deployments, or `npx wrangler versions list` to see versions.
Run `npx wrangler rollback` to return to the previous version, or `npx wrangler rollback <version-id>` for a specific one.
Static assets are versioned with the Worker, so a rollback restores the old pages too.
Fix forward afterwards by reverting the commit and deploying again, so the repository matches what is live.

## Taking it down

Run `npx wrangler delete sprite-bench`, which also removes any custom domain and its DNS record.
