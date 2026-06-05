import Image from "next/image";
import Link from "next/link";
import type { Work } from "@/data/works";

export function WorkCard({
  work,
  aspect = "landscape",
}: {
  work: Work;
  aspect?: "portrait" | "landscape";
}) {
  const aspectClass = aspect === "portrait" ? "aspect-[4/5]" : "aspect-[4/3]";

  return (
    <Link
      href={`/works/${work.slug}`}
      className="card group"
    >
      <div className={`media relative ${aspectClass} bg-canvas-soft`}>
        <Image
          src={work.thumbnail}
          alt={work.thumbnailAlt}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col pt-6">
        <p className="eyebrow">
          {work.categories[0]} · {work.year}
        </p>
        <h3 className="head-md mt-2 text-ink">
          {work.title}
        </h3>
        <p className="body card-cta mt-4 truncate">{work.description}</p>
      </div>
    </Link>
  );
}
