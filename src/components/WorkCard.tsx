import Image from "next/image";
import Link from "next/link";
import type { Work } from "@/data/works";

export function WorkCard({
  work,
}: {
  work: Work;
  aspect?: "portrait" | "landscape";
}) {
  return (
    <Link href={`/works/${work.slug}`} className="portfolio-card">
      <div className="portfolio-card-media">
        <Image
          src={work.thumbnail}
          alt={work.thumbnailAlt}
          fill
          className="object-cover"
        />
      </div>
      <div className="portfolio-card-body">
        <div className="portfolio-card-meta">
          <span>{work.categories[0]}</span>
          <span>{work.year}</span>
        </div>
        <h3>{work.title}</h3>
        <p>{work.description}</p>
        <p className="portfolio-card-link">View project ↗</p>
      </div>
    </Link>
  );
}
