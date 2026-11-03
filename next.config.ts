import type { NextConfig } from "next";

// A fully static export: `next build` writes the site to out/, which Cloudflare
// Workers static assets serves (see DEPLOY.md). Headers live in public/_headers.
const nextConfig: NextConfig = {
  output: "export",
  // There is no image optimizer at runtime, so images ship as committed.
  images: { unoptimized: true },
};

export default nextConfig;
