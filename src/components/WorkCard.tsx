import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/Badge";
import type { Work } from "@/data/works";

export function WorkCard({ work }: { work: Work }) {
  return (
    <Link
      href={`/works/${work.slug}`}
      className="surface-ring group block rounded-[24px] bg-canvas p-4 transition duration-300 hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-canvas-soft">
        <Image
          src={work.thumbnail}
          alt={`${work.title} thumbnail`}
          fill
          className="object-cover transition duration-300 group-hover:scale-[1.03]"
        />
      </div>
      <div className="px-2 pb-2 pt-5">
        <div className="flex items-center justify-between gap-4 text-sm font-semibold text-body">
          <span>{work.year}</span>
          <span>{work.role[0]}</span>
        </div>
        <h3 className="mt-4 text-[2rem] font-black leading-none text-ink">
          {work.title}
        </h3>
        <p className="mt-4 text-base leading-6 text-body">{work.description}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {work.categories.map((category) => (
            <Badge key={category}>{category}</Badge>
          ))}
        </div>
      </div>
    </Link>
  );
}
