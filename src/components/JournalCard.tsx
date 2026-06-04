import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/Badge";
import type { JournalPost } from "@/data/journal";

export function JournalCard({ post }: { post: JournalPost }) {
  return (
    <Link
      href={`/journal/${post.slug}`}
      className="card group block"
    >
      <div className="media relative aspect-[4/3] bg-canvas-soft">
        <Image
          src={post.thumbnail}
          alt={`${post.title} thumbnail`}
          fill
          className="object-cover"
        />
      </div>
      <div className="pt-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{post.category}</Badge>
          <span className="eyebrow">{post.date}</span>
        </div>
        <h3 className="heading mt-4 text-[32px] leading-tight text-ink">
          {post.title}
        </h3>
        <p className="body-copy mt-4">{post.excerpt}</p>
      </div>
    </Link>
  );
}
