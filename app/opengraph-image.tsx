import { OG_SIZE, dataUrl, shareCard } from "@/lib/og-card";
import { readPublicFile } from "@/lib/publicFile";

// The share card (Open Graph and Twitter): the n8builds family layout in
// Sprite Bench's dark violet, with the demo slime's grid and live preview.
// The static export renders it once into out/opengraph-image at build time.
export const dynamic = "force-static";
export const alt = "Sprite Bench: drop in a sprite sheet, watch it animate, export a GIF. Free, in your browser.";
export const size = OG_SIZE;
export const contentType = "image/png";

const line = "rgba(139,92,246,0.30)";

// The header's gamepad icon (lucide Gamepad2) on a dark violet tile.
const MARK = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#1a1530"/><g transform="translate(14 14) scale(1.5)" fill="none" stroke="#c084fc" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="6" x2="10" y1="11" y2="11"/><line x1="8" x2="8" y1="9" y2="13"/><line x1="15" x2="15.01" y1="12" y2="12"/><line x1="18" x2="18.01" y1="10" y2="10"/><path d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"/></g></svg>`;

export default async function Image() {
  // Inter (OFL, public/og/Inter-LICENSE.txt), the n8 icon and two crops of the tool, from public/.
  const [medium, extraBold, n8, grid, preview] = await Promise.all([
    readPublicFile("/og/Inter-Medium.ttf"),
    readPublicFile("/og/Inter-ExtraBold.ttf"),
    readPublicFile("/og/n8-icon.png"),
    readPublicFile("/og/sheet-grid.png"),
    readPublicFile("/og/live-preview.png"),
  ]);

  return shareCard({
    colors: {
      bg: "#0b0914",
      bgImage: "radial-gradient(circle at 82% 40%, rgba(168,85,247,0.20), rgba(11,9,20,0) 55%)",
      ink: "#f4f4f5",
      muted: "#a1a1aa",
      body: "#c4c4cc",
      accent: "#a855f7",
    },
    font: "Inter",
    fonts: [
      { name: "Inter", data: medium, weight: 500 },
      { name: "Inter", data: extraBold, weight: 800 },
    ],
    logo: `data:image/svg+xml;base64,${Buffer.from(MARK).toString("base64")}`,
    n8Icon: dataUrl(n8, "image/png"),
    host: "sprite-bench.n8builds.dev",
    name: "Sprite Bench",
    nameSize: 72,
    tagline: "Drop in a sprite sheet, watch it animate, export a GIF. Free, in your browser.",
    visual: <Bench grid={dataUrl(grid, "image/png")} preview={dataUrl(preview, "image/png")} />,
  });
}

function Label({ children }: { children: string }) {
  return <div style={{ display: "flex", fontSize: 15, fontWeight: 800, letterSpacing: 1.8, color: "#a1a1aa" }}>{children}</div>;
}

const panel = {
  display: "flex",
  flexDirection: "column" as const,
  gap: 14,
  padding: 20,
  borderRadius: 18,
  background: "#13101f",
  border: `1.5px solid ${line}`,
};

/** The sheet with its grid overlay, the live preview and the export button. */
function Bench({ grid, preview }: { grid: string; preview: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 18, position: "absolute", left: 640, top: 90, width: 600 }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 18 }}>
        <div style={panel}>
          <Label>SHEET · GRID</Label>
          <img src={grid} width={270} height={269} alt="" style={{ borderRadius: 4 }} />
        </div>
        <div style={panel}>
          <Label>LIVE PREVIEW</Label>
          <img src={preview} width={180} height={180} alt="" style={{ borderRadius: 8 }} />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: 4,
              height: 50,
              borderRadius: 12,
              fontSize: 20,
              fontWeight: 800,
              color: "#0b0914",
              backgroundImage: "linear-gradient(135deg, #06b6d4, #a855f7)",
            }}
          >
            Export GIF
          </div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 10 }}>
        {["4 × 4 grid", "16 frames", "1× 2× 4×"].map((t) => (
          <div
            key={t}
            style={{
              display: "flex",
              padding: "8px 16px",
              borderRadius: 999,
              border: "1.5px solid rgba(139,92,246,0.35)",
              fontSize: 19,
              color: "#c4c4cc",
            }}
          >
            {t}
          </div>
        ))}
      </div>
    </div>
  );
}
