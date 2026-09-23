import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import { dirname, extname, join, relative, sep } from "node:path";
import sharp from "sharp";

type Variant = { src: string; width: number; height: number };
type ManifestEntry = { width: number; height: number; variants: Variant[] };

const root = process.cwd();
const publicDirectory = join(root, "public");
const outputDirectory = join(publicDirectory, "generated/images");
const manifestPath = join(root, "src/data/image-variants.generated.json");
const targetWidths = [480, 960, 1440];
const manifest: Record<string, ManifestEntry> = {};

await rm(outputDirectory, { recursive: true, force: true });
const files = (await walk(publicDirectory)).filter((file) => /\.(jpe?g|png|webp)$/i.test(file) && !file.includes(`${sep}generated${sep}`));

for (const file of files) {
  const metadata = await sharp(file).rotate().metadata();
  if (!metadata.width || !metadata.height) continue;
  const source = `/${relative(publicDirectory, file).split(sep).join("/")}`;
  const relativePath = relative(publicDirectory, file);
  const extension = extname(relativePath);
  const base = relativePath.slice(0, -extension.length);
  const variants: Variant[] = [];

  for (const width of targetWidths.filter((candidate) => candidate <= metadata.width!)) {
    const output = join(outputDirectory, `${base}-w${width}.webp`);
    await mkdir(dirname(output), { recursive: true });
    const info = await sharp(file).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 82 }).toFile(output);
    variants.push({ src: `/${relative(publicDirectory, output).split(sep).join("/")}`, width: info.width, height: info.height });
  }

  if (!variants.length || variants.at(-1)?.width !== metadata.width) {
    variants.push({ src: source, width: metadata.width, height: metadata.height });
  }
  manifest[source] = { width: metadata.width, height: metadata.height, variants };
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
