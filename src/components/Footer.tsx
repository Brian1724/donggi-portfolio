import Link from "next/link";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container grid grid-cols-1 gap-8 py-12 lg:grid-cols-[1fr_auto]">
        <div>
          <p className="subhead text-canvas">
            Donggi Yoon
          </p>
          <p className="body site-footer-copy mt-4">
            Visual Archive for photography, videography, travel memories, and
            creative process.
          </p>
          <p className="site-footer-copy mt-6 text-sm font-semibold">
            © 2026 Donggi Yoon. All rights reserved.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-2 text-sm font-semibold">
          <a href={`mailto:${profile.email}`} className="email-token site-footer-link">
            {profile.email}
          </a>
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
