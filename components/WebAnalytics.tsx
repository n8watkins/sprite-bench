import Script from "next/script";

/**
 * Cloudflare Web Analytics: cookie-free page view and page speed counts that
 * store nothing in the browser and keep no visitor identifier.
 * https://developers.cloudflare.com/web-analytics/
 *
 * The token (public, it ships in the page) is the n8builds.dev site's and is
 * set at build time by the deploy workflow. Builds without it (local, CI) load
 * nothing. public/_headers keeps `no-transform`, so Cloudflare never injects a
 * second copy.
 */
export function WebAnalytics() {
  const token = process.env.NEXT_PUBLIC_CF_WEB_ANALYTICS_TOKEN;
  if (!token) return null;
  return (
    <Script
      src="https://static.cloudflareinsights.com/beacon.min.js"
      strategy="afterInteractive"
      data-cf-beacon={JSON.stringify({ token })}
    />
  );
}
