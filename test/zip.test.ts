import { execFileSync } from "node:child_process";
import { mkdtempSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { buildZip, dataUrlToBytes, zipEntriesFromDataUrls } from "@/lib/zip";

const PNG_1PX =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==";

describe("dataUrlToBytes", () => {
  it("decodes the base64 payload", () => {
    const bytes = dataUrlToBytes(PNG_1PX);
    expect(Array.from(bytes.slice(1, 4))).toEqual([0x50, 0x4e, 0x47]); // "PNG"
  });
});

describe("zipEntriesFromDataUrls", () => {
  it("slugifies names, maps mime types and dedupes collisions", () => {
    const names = zipEntriesFromDataUrls([
      { name: "Frame 1", dataUrl: PNG_1PX },
      { name: "frame-1", dataUrl: PNG_1PX },
      { name: "Photo!", dataUrl: "data:image/jpeg;base64,AA==" },
      { name: "Icon", dataUrl: "data:image/svg+xml;base64,AA==" },
    ]).map((e) => e.name);
    expect(names).toEqual(["frame-1.png", "frame-1-2.png", "photo.jpg", "icon.svg"]);
  });
});

describe("buildZip", () => {
  it("writes an archive a standard unzipper reads back intact", async () => {
    const files = [
      { name: "a.txt", data: new TextEncoder().encode("hello") },
      { name: "frames/ü.png", data: dataUrlToBytes(PNG_1PX) },
    ];
    const blob = buildZip(files);
    const dir = mkdtempSync(join(tmpdir(), "sprite-bench-zip-"));
    const path = join(dir, "out.zip");
    writeFileSync(path, new Uint8Array(await blob.arrayBuffer()));
    // Python's zipfile checks every CRC and the central directory.
    const out = execFileSync("python3", [
      "-c",
      "import sys,zipfile,json;z=zipfile.ZipFile(sys.argv[1]);assert z.testzip() is None;print(json.dumps({n:len(z.read(n)) for n in z.namelist()}))",
      path,
    ]).toString();
    expect(JSON.parse(out)).toEqual({ "a.txt": 5, "frames/ü.png": files[1].data.length });
  });
});
