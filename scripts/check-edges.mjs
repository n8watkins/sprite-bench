// Checks the built site through the real Worker (`wrangler dev` on out/):
// unknown paths answer 404 with Sprite Bench's not-found page.
// Usage: node scripts/check-edges.mjs http://127.0.0.1:8787
import assert from "node:assert/strict";

const base = (process.argv[2] ?? "http://127.0.0.1:8787").replace(/\/$/, "");

const res = await fetch(`${base}/zz-no-such-page`, { redirect: "manual" });
assert.equal(res.status, 404, `unknown path answered ${res.status}`);
assert.match(await res.text(), /<h1[^>]*>This frame is missing\.<\/h1>/, "404 page heading");

console.log("edges ok: 404 page");
