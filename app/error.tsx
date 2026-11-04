"use client";

import Link from "next/link";
import { useEffect } from "react";
import { EdgePage, primaryAction, secondaryAction } from "@/components/EdgePage";
import { reportError } from "@/lib/error-reporting";

export default function ErrorPage({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => reportError(error), [error]);

  return (
    <EdgePage
      label="Something went wrong"
      title="The editor hit a snag."
      actions={
        <>
          <button type="button" onClick={reset} className={primaryAction}>
            Try again
          </button>
          <Link href="/about" className={secondaryAction}>
            About Sprite Bench
          </Link>
        </>
      }
    >
      Your sprite sheet never left your browser. The problem has been reported; try again, or reload the page.
    </EdgePage>
  );
}
