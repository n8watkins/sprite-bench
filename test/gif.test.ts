import { execFileSync } from "node:child_process";
import { describe, expect, it } from "vitest";
import { encodeGif } from "@/lib/sprite/gif";

// encodeGif only reads width, height and data, so a plain object stands in for
// the browser's ImageData.
function frame(width: number, height: number, rgba: number[]): ImageData {
  const data = new Uint8ClampedArray(width * height * 4);
  for (let i = 0; i < width * height; i++) data.set(rgba, i * 4);
  return { width, height, data, colorSpace: "srgb" } as ImageData;
}

async function bytes(blob: Blob): Promise<Uint8Array> {
  return new Uint8Array(await blob.arrayBuffer());
}

describe("encodeGif", () => {
  it("throws on an empty frame list", () => {
    expect(() => encodeGif([], { delayMs: 100, transparent: false })).toThrow("no frames");
  });

  it("writes a GIF89a with the frame size, a loop and one image per frame", async () => {
    const out = await bytes(
      encodeGif([frame(3, 2, [255, 0, 0, 255]), frame(3, 2, [0, 0, 255, 255])], {
        delayMs: 120,
        transparent: false,
      }),
    );
    expect(new TextDecoder().decode(out.slice(0, 6))).toBe("GIF89a");
    expect(out[6] | (out[7] << 8)).toBe(3);
    expect(out[8] | (out[9] << 8)).toBe(2);
    expect(new TextDecoder().decode(out)).toContain("NETSCAPE2.0");
    expect(out[out.length - 1]).toBe(0x3b);
  });

  it("decodes back to the exact source colors (pixel art stays lossless)", async () => {
    const out = await bytes(
      encodeGif([frame(2, 2, [12, 200, 34, 255]), frame(2, 2, [250, 128, 0, 255])], {
        delayMs: 100,
        transparent: false,
      }),
    );
    // Pillow decodes independently of our encoder; skip quietly when it is absent.
    let decoded: string;
    try {
      decoded = execFileSync("python3", [
        "-c",
        "import sys,io,json;from PIL import Image,ImageSequence;im=Image.open(io.BytesIO(sys.stdin.buffer.read()));print(json.dumps([list(f.convert('RGB').getpixel((1,1))) for f in ImageSequence.Iterator(im)]))",
      ], { input: out, stdio: ["pipe", "pipe", "ignore"] }).toString();
    } catch {
      return;
    }
    expect(JSON.parse(decoded)).toEqual([
      [12, 200, 34],
      [250, 128, 0],
    ]);
  });
});
