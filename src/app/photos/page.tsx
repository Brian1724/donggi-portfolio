import { PhotoGallery } from "@/components/photos/PhotoGallery";
import { stills } from "@/data/stills";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "사진 아카이브",
  description: "여행과 일상 사이에서 기록한 윤동기의 사진 아카이브.",
  path: "/photos",
  imagePath: stills[0]?.src,
});

export default function PhotosPage() {
  return (
    <main className="portfolio-page photos-page">
      <section className="portfolio-hero photos-hero">
        <div className="portfolio-container">
          <div>
            <p className="portfolio-kicker">Photos / Archive</p>
            <h1 className="portfolio-title">사진으로 남은 장면.</h1>
          </div>
          <p className="portfolio-lead">여행과 일상 사이에서 오래 바라본 빛과 공간을 모았습니다.</p>
        </div>
      </section>
      <section className="portfolio-section photos-archive-section">
        <div className="portfolio-container">
          <PhotoGallery items={stills} />
        </div>
      </section>
    </main>
  );
}
