"use client";

import { useEffect } from "react";
import { reportError } from "@/lib/error-reporting";

// Shown only when the root layout itself fails, so it carries its own markup
// and styles (the editor's palette, inlined).
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => reportError(error), [error]);

  return (
    <html lang="en">
      <body style={{ margin: 0, background: "#0b0914", color: "#f4f4f5", fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif" }}>
        <main style={{ minHeight: "100vh", padding: "48px 16px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
          <p style={{ fontWeight: 800, margin: 0 }}>Sprite Bench</p>
          <h1 style={{ fontSize: 36, lineHeight: 1.15, margin: "32px 0 0" }}>The editor didn&apos;t load.</h1>
          <p style={{ maxWidth: 420, color: "#a1a1aa", lineHeight: 1.5, margin: "16px 0 0" }}>
            Your sprite sheet never left your browser. The problem has been reported.
          </p>
          <button type="button" onClick={reset} style={{ marginTop: 32, padding: "12px 24px", border: 0, borderRadius: 8, background: "linear-gradient(90deg, #06b6d4, #a855f7)", color: "#fff", fontWeight: 700, fontSize: 14, cursor: "pointer" }}>
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
