import { access, cp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const exportDirectory = resolve(root, "out");
const distDirectory = resolve(root, "dist");

await access(resolve(exportDirectory, "index.html"));

await rm(distDirectory, { recursive: true, force: true });
await mkdir(resolve(distDirectory, "server"), { recursive: true });
await mkdir(resolve(distDirectory, ".openai"), { recursive: true });

await cp(exportDirectory, resolve(distDirectory, "client"), { recursive: true });
await cp(
  resolve(root, ".openai", "hosting.json"),
  resolve(distDirectory, ".openai", "hosting.json"),
);

const workerSource = await readFile(resolve(root, "sites", "worker.mjs"), "utf8");
await writeFile(resolve(distDirectory, "server", "index.js"), workerSource);

console.log("Sites preview bundle prepared in dist/.");
