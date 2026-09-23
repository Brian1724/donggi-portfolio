import { mkdir, readFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { createElement as h } from "react";
import satori from "satori";
import sharp from "sharp";
import { journalPosts } from "../src/data/journal.ts";
import { works } from "../src/data/works.ts";

const root = process.cwd();
const regular = await readFile(join(root, "node_modules/@fontsource/noto-sans-kr/files/noto-sans-kr-korean-400-normal.woff"));
const bold = await readFile(join(root, "node_modules/@fontsource/noto-sans-kr/files/noto-sans-kr-korean-700-normal.woff"));

const entries = [
  ...works.map((work) => ({
    output: join(root, "public/og/works", `${work.slug}.png`),
    image: work.thumbnail,
    eyebrow: `${work.format} / ${work.year}`,
    title: work.title,
    description: work.summaryEn,
  })),
  ...journalPosts.map((post) => ({
    output: join(root, "public/og/journal", `${post.slug}.png`),
    image: post.thumbnail,
    eyebrow: `${post.category} / ${post.date.slice(0, 4)}`,
    title: post.title,
    description: post.excerpt,
  })),
];

for (const entry of entries) {
  const sourcePath = join(root, "public", entry.image.replace(/^\//, ""));
  const background = await sharp(sourcePath).rotate().resize(1200, 630, { fit: "cover" }).jpeg({ quality: 82 }).toBuffer();
  const imageUrl = `data:image/jpeg;base64,${background.toString("base64")}`;
  const svg = await satori(
    h("div", {
      style: { display: "flex", position: "relative", width: "1200px", height: "630px", overflow: "hidden", background: "#080808", color: "#f1efe9", fontFamily: "Noto Sans KR" },
    },
    h("img", { src: imageUrl, width: 1200, height: 630, style: { position: "absolute", inset: 0, width: "1200px", height: "630px", objectFit: "cover" } }),
    h("div", { style: { position: "absolute", inset: 0, display: "flex", background: "rgba(0,0,0,.58)" } }),
    h("div", { style: { display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", width: "100%", padding: "64px 72px" } },
      h("div", { style: { display: "flex", justifyContent: "space-between", fontSize: 22, fontWeight: 700, letterSpacing: ".12em" } },
        h("span", null, "DONGGI / VISUAL ARCHIVE"),
        h("span", null, entry.eyebrow.toUpperCase()),
      ),
      h("div", { style: { display: "flex", flexDirection: "column", maxWidth: "960px" } },
        h("div", { style: { fontSize: entry.title.length > 24 ? 64 : 78, fontWeight: 700, lineHeight: 1.08, letterSpacing: "0" } }, entry.title),
        h("div", { style: { marginTop: 24, maxWidth: "850px", color: "#c5c1b8", fontSize: 25, lineHeight: 1.5, letterSpacing: "0" } }, entry.description),
      ),
    )),
    { width: 1200, height: 630, fonts: [
      { name: "Noto Sans KR", data: regular, weight: 400, style: "normal" },
      { name: "Noto Sans KR", data: bold, weight: 700, style: "normal" },
    ] },
  );
  await mkdir(dirname(entry.output), { recursive: true });
  await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(entry.output);
}

console.log(`${entries.length} individual OG images generated.`);
