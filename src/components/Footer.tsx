import Link from "next/link";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="cinema-footer">
      <div className="cinema-footer-inner">
        <div className="cinema-footer-brand">
          <Link href="/" className="cinema-brand">
            <span aria-hidden="true" /> DONGGI
          </Link>
          <p>Videographer · Photographer · Visual storyteller</p>
        </div>
        <nav aria-label="푸터 메뉴">
          <Link href="/works">Works</Link>
          <Link href="/about">About</Link>
          <Link href="/journal">Journal</Link>
          <a href={profile.instagram} target="_blank" rel="noreferrer">Instagram ↗</a>
          <a href={profile.photoInstagram} target="_blank" rel="noreferrer">DK4FILM ↗</a>
          <Link href="/rss.xml">RSS</Link>
        </nav>
        <div className="cinema-footer-bottom">
          <span>© 2026 Donggi Yoon</span>
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
        </div>
      </div>
    </footer>
  );
}
