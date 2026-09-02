import Image from "next/image";
import Link from "next/link";
import type { JournalPost } from "@/data/journal";

export function JournalCard({ post, index = 0 }: { post: JournalPost; index?: number }) {
  return (
    <Link href={`/journal/${post.slug}`} className="portfolio-card journal-entry">
      <div className="portfolio-card-media is-landscape">
        <Image
          src={post.thumbnail}
          alt={post.imageAlt}
          fill
          sizes="(max-width: 800px) 100vw, 48vw"
          className="object-cover"
        />
      </div>
      <div className="portfolio-card-body">
        <div className="portfolio-card-meta"><span>0{index + 1} / {post.category}</span><span>{post.date}</span></div>
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <p className="portfolio-card-link">기록 읽기</p>
      </div>
    </Link>
  );
}
