import Image from "next/image";
import Link from "next/link";
import type { JournalPost } from "@/data/journal";

export function JournalCard({ post }: { post: JournalPost }) {
  return (
    <Link
      href={`/journal/${post.slug}`}
      className="card group"
    >
      <div className="media relative aspect-[4/3] bg-canvas-soft">
        <Image
          src={post.thumbnail}
          alt={post.imageAlt}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col pt-6">
        <p className="eyebrow">{post.date}</p>
        <h3 className="heading mt-2 text-ink">{post.title}</h3>
        <p className="journal-card-description card-cta mt-4">{post.excerpt}</p>
      </div>
    </Link>
  );
}
