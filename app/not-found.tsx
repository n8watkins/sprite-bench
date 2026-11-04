import type { Metadata } from "next";
import Link from "next/link";
import { EdgePage, primaryAction, secondaryAction } from "@/components/EdgePage";

export const metadata: Metadata = {
  title: "Page not found - Sprite Bench",
  robots: { index: false },
};

// Served for every unknown path with a real 404 status: the static export
// writes it to out/404.html and wrangler.jsonc's not_found_handling uses it.
export default function NotFound() {
  return (
    <EdgePage
      label="404 - page not found"
      title="This frame is missing."
      actions={
        <>
          <Link href="/" className={primaryAction}>
            Open the editor
          </Link>
          <Link href="/about" className={secondaryAction}>
            About Sprite Bench
          </Link>
        </>
      }
    >
      There is no page at this address. The editor is on the home page, and it runs right in your browser.
    </EdgePage>
  );
}
