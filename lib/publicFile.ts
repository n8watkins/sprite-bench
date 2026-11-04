import { readFile } from "node:fs/promises";
import { join } from "node:path";

/**
 * The bytes of a file in public/ (`path` starts with "/"). The site is a static
 * export, so this only runs during `next build`, where public/ is on disk.
 */
export async function readPublicFile(path: string): Promise<ArrayBuffer> {
  const file = await readFile(join(process.cwd(), "public", path));
  return file.buffer.slice(file.byteOffset, file.byteOffset + file.byteLength) as ArrayBuffer;
}
