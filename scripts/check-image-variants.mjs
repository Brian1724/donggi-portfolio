import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const manifest = JSON.parse(await readFile(new URL("../src/data/image-variants.generated.json", import.meta.url), "utf8"));
let count = 0;
for (const [source, entry] of Object.entries(manifest)) {
  assert.ok(entry.variants.length, `Missing variants: ${source}`);
  let previousWidth = 0;
  for (const variant of entry.variants) {
    assert.ok(variant.src.startsWith("/generated/images/") && variant.src.endsWith(".webp"), `Unoptimized candidate: ${variant.src}`);
    assert.ok(variant.width > previousWidth && variant.width <= Math.min(entry.width, 1920), `Invalid width: ${variant.src}`);
    const metadata = await sharp(fileURLToPath(new URL(`../public${variant.src}`, import.meta.url))).metadata();
    assert.equal(metadata.width, variant.width);
    assert.equal(metadata.height, variant.height);
    previousWidth = variant.width;
    count += 1;
  }
}
console.log(`Verified ${count} WebP variants: correct dimensions, no originals in srcset, maximum width 1920px.`);
