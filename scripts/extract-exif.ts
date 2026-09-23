import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import exifr from "exifr";
import { stills } from "../src/data/stills.ts";

const outputPath = join(process.cwd(), "src/data/stills-exif.generated.json");
const result: Record<string, Record<string, string>> = await readExisting();

for (const still of stills) {
  const sourcePath = join(process.cwd(), "public", still.src.replace(/^\//, ""));
  try {
    const metadata = await exifr.parse(await readFile(sourcePath), {
      pick: ["Make", "Model", "LensModel", "ExposureTime", "FNumber", "ISO"],
    });
    if (!metadata) continue;

    const make = clean(metadata.Make);
    const model = clean(metadata.Model);
    const camera = [make, model].filter(Boolean).filter((value, index, values) => index === 0 || !values[index - 1]?.includes(value)).join(" ");
    const entry = {
      ...(camera ? { camera } : {}),
      ...(clean(metadata.LensModel) ? { lens: clean(metadata.LensModel) } : {}),
      ...(formatExposure(metadata.ExposureTime) ? { shutter: formatExposure(metadata.ExposureTime) } : {}),
      ...(Number(metadata.FNumber) > 0 ? { aperture: `f/${formatNumber(metadata.FNumber)}` } : {}),
      ...(Number(metadata.ISO) > 0 ? { iso: `ISO ${Math.round(Number(metadata.ISO))}` } : {}),
    };
    if (Object.keys(entry).length) result[still.id] = entry;
  } catch (error) {
    console.warn(`EXIF skipped for ${still.src}: ${error instanceof Error ? error.message : String(error)}`);
  }
}

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(result, null, 2)}\n`);
console.log(`EXIF metadata generated for ${Object.keys(result).length}/${stills.length} stills.`);

async function readExisting() {
  try {
    return JSON.parse(await readFile(outputPath, "utf8")) as Record<string, Record<string, string>>;
  } catch {
    return {};
  }
}

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function formatExposure(value: unknown) {
  const exposure = Number(value);
  if (!Number.isFinite(exposure) || exposure <= 0) return "";
  if (exposure >= 1) return `${formatNumber(exposure)} s`;
  return `1/${Math.round(1 / exposure)} s`;
}

function formatNumber(value: unknown) {
  return Number(value).toFixed(1).replace(/\.0$/, "");
}
