import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

// Optional local media preparation; Cloudflare builds do not require FFmpeg.
const source = fileURLToPath(new URL("../public/media/dalian/donggi-full.mp4", import.meta.url));
const profiles = [
  { name: "desktop", width: 1920, crf: 25, audio: "128k", rate: [] },
  { name: "mobile", width: 960, crf: 29, audio: "96k", rate: ["-maxrate", "650k", "-bufsize", "1300k"] },
];

for (const profile of profiles) {
  const output = fileURLToPath(new URL(`../public/media/dalian/donggi-hero-${profile.name}-v1.mp4`, import.meta.url));
  execFileSync("ffmpeg", [
    "-hide_banner", "-nostdin", "-y", "-i", source,
    "-map", "0:v:0", "-map", "0:a:0",
    "-vf", `scale=${profile.width}:-2`,
    "-c:v", "libx264", "-preset", "slow", "-crf", String(profile.crf),
    ...profile.rate, "-pix_fmt", "yuv420p",
    "-c:a", "aac", "-b:a", profile.audio,
    "-movflags", "+faststart", output,
  ], { stdio: "inherit" });
}
