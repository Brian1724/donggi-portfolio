import Image from "next/image";
import Link from "next/link";
import type { JournalPost } from "@/data/journal";

export function JournalCard({ post }: { post: JournalPost }) {
  return (
    <Link href={`/journal/${post.slug}`} className="portfolio-card">
      <div className="portfolio-card-media is-landscape">
        <Image
          src={post.thumbnail}
          alt={post.imageAlt}
          fill
          className="object-cover"
        />
      </div>
      <div className="portfolio-card-body">
        <div className="portfolio-card-meta"><span>{post.category}</span><span>{post.date}</span></div>
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <p className="portfolio-card-link">Read note ↗</p>
      </div>
    </Link>
  );
}
