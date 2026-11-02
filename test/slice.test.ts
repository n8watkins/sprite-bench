import { describe, expect, it } from "vitest";
import { frameDims } from "@/lib/sprite/slice";

const grid = { rows: 2, cols: 4, offsetTop: 0, offsetBottom: 0, offsetLeft: 0, offsetRight: 0 };

describe("frameDims", () => {
  it("divides the sheet evenly", () => {
    expect(frameDims(128, 64, grid)).toEqual({ frameW: 32, frameH: 32 });
  });

  it("subtracts offsets and floors partial pixels", () => {
    expect(frameDims(130, 70, { ...grid, offsetLeft: 1, offsetRight: 2, offsetTop: 3, offsetBottom: 1 })).toEqual({
      frameW: 31,
      frameH: 33,
    });
  });

  it("treats a zero grid as one cell instead of dividing by zero", () => {
    expect(frameDims(64, 64, { ...grid, rows: 0, cols: 0 })).toEqual({ frameW: 64, frameH: 64 });
  });
});
