import Link from "next/link";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="border-t border-line bg-canvas text-ink">
      <div className="mx-auto grid w-full max-w-[1200px] gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1fr_auto] lg:px-10">
        <div>
          <p className="text-3xl font-black">Donggi Yoon</p>
          <p className="mt-3 max-w-xl text-base leading-7 text-body">
            Visual Archive for photography, videography, travel memories, and
            creative process.
          </p>
          <p className="mt-6 text-sm font-semibold text-mute">
            © 2026 Donggi Yoon. All rights reserved.
          </p>
        </div>
        <div className="grid gap-2 text-sm font-semibold text-body">
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
