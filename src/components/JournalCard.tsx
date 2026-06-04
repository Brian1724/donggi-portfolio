import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/Badge";
import type { JournalPost } from "@/data/journal";

export function JournalCard({ post }: { post: JournalPost }) {
  return (
    <Link
      href={`/journal/${post.slug}`}
      className="surface-ring group block rounded-[24px] bg-canvas p-4 transition duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-video overflow-hidden rounded-[24px] bg-canvas-soft">
        <Image
          src={post.thumbnail}
          alt={`${post.title} thumbnail`}
          fill
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="px-2 pb-2 pt-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge>{post.category}</Badge>
          <span className="text-sm font-semibold text-body">{post.date}</span>
        </div>
        <h3 className="mt-4 text-[1.8rem] font-black leading-none text-ink">
          {post.title}
        </h3>
        <p className="mt-4 text-base leading-6 text-body">{post.excerpt}</p>
      </div>
    </Link>
  );
}
