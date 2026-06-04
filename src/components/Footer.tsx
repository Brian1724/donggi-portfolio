import Link from "next/link";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="bg-ink text-canvas-soft">
      <div className="container grid grid-cols-1 gap-8 py-12 lg:grid-cols-[1fr_auto]">
        <div>
          <p className="display text-[40px] text-canvas-soft">Donggi Yoon</p>
          <p className="mt-3 max-w-[640px] text-sm leading-6 text-canvas-soft">
            Visual Archive for photography, videography, travel memories, and
            creative process.
          </p>
          <p className="mt-6 text-sm font-semibold text-canvas-soft">
            © 2026 Donggi Yoon. All rights reserved.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-2 text-sm font-semibold text-canvas-soft">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <a href={profile.instagram} target="_blank" rel="noreferrer">
            Instagram
          </a>
          <a href={profile.photoInstagram} target="_blank" rel="noreferrer">
            Photo Instagram
          </a>
          <Link href="/rss.xml">RSS</Link>
        </div>
      </div>
    </footer>
  );
}
