import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import { dirname, extname, join, relative, sep } from "node:path";
import sharp from "sharp";

type Variant = { src: string; width: number; height: number };
type ManifestEntry = { width: number; height: number; variants: Variant[] };

const root = process.cwd();
const publicDirectory = join(root, "public");
const outputDirectory = join(publicDirectory, "generated/images");
const manifestPath = join(root, "src/data/image-variants.generated.json");
const targetWidths = [480, 960, 1440, 1920];
const manifest: Record<string, ManifestEntry> = {};

await rm(outputDirectory, { recursive: true, force: true });
const files = (await walk(publicDirectory)).filter((file) => /\.(jpe?g|png|webp)$/i.test(file) && !file.includes(`${sep}generated${sep}`));

for (const file of files) {
  const metadata = await sharp(file).rotate().metadata();
  if (!metadata.width || !metadata.height) continue;
  const dimensions = metadata.autoOrient;
  const source = `/${relative(publicDirectory, file).split(sep).join("/")}`;
  const relativePath = relative(publicDirectory, file);
  const extension = extname(relativePath);
  const base = relativePath.slice(0, -extension.length);
  const variants: Variant[] = [];

  // Never offer the uncompressed original to the browser's srcset selection.
  const widths = [...new Set(targetWidths.map((width) => Math.min(width, dimensions.width)))];
  for (const width of widths) {
    const output = join(outputDirectory, `${base}-w${width}.webp`);
    await mkdir(dirname(output), { recursive: true });
    const info = await sharp(file).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 82 }).toFile(output);
    variants.push({ src: `/${relative(publicDirectory, output).split(sep).join("/")}`, width: info.width, height: info.height });
  }

  manifest[source] = { width: dimensions.width, height: dimensions.height, variants };
}

await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`${Object.keys(manifest).length} image sources prepared with responsive variants.`);

async function walk(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map((entry) => {
    const path = join(directory, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  }))).flat();
}
