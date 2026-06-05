import Image from "next/image";
import Link from "next/link";
import type { Work } from "@/data/works";

export function WorkCard({
  work,
}: {
  work: Work;
  aspect?: "portrait" | "landscape";
}) {
  const category = work.categories[0];

  return (
    <Link
      href={`/works/${work.slug}`}
      className="card work-card group"
    >
      <div className="work-card-media relative bg-canvas-soft">
        <Image
          src={work.thumbnail}
          alt={work.thumbnailAlt}
          fill
          className="object-cover"
        />
      </div>
      <div className="work-card-body">
        {category ? <span className="chip w-fit">{category}</span> : null}
        <p className="eyebrow">{work.year}</p>
        <h3 className="subhead work-card-title text-ink">
          {work.title}
        </h3>
        <p className="work-card-description">{work.description}</p>
      </div>
    </Link>
  );
}
