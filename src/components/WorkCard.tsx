import Image from "next/image";
import Link from "next/link";
import type { Work } from "@/data/works";

export function WorkCard({ work, index = 0 }: { work: Work; index?: number }) {
  return (
    <Link href={`/works/${work.slug}`} className="portfolio-card work-entry">
      <div className="portfolio-card-media">
        <Image
          src={work.thumbnail}
          alt={work.thumbnailAlt}
          fill
          sizes="(max-width: 800px) 100vw, (max-width: 1200px) 64vw, 820px"
          className="object-cover"
        />
      </div>
      <div className="portfolio-card-body">
        <div className="portfolio-card-meta">
          <span>0{index + 1} / {work.categories[0]}</span>
          <span>{work.year}</span>
        </div>
        <h3>{work.title}</h3>
        <p>{work.description}</p>
        <p className="portfolio-card-link">작업 열기</p>
      </div>
    </Link>
  );
}
