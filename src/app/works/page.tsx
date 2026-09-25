import { Reveal } from "@/components/Reveal";
import { WorkFilter } from "@/components/WorkFilter";
import { works } from "@/data/works";
import { formatYearRange } from "@/lib/content-years";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "작업",
  description: "윤동기의 영화와 사진 작업. 결과물과 제작 과정의 기록을 함께 볼 수 있습니다.",
  path: "/works",
});

export default function WorksPage() {
  const yearRange = formatYearRange(
    works.flatMap((work) => work.yearRange ?? []),
    "—",
  );

  return (
    <div className="portfolio-page">
      <section className="portfolio-hero works-hero">
        <div className="portfolio-container">
          <Reveal>
            <p className="portfolio-kicker">Works / {yearRange}</p>
            <h1 className="portfolio-title is-korean">사진과 영상으로<br />쌓아가는 작업들.</h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="portfolio-lead">
              여행과 일상에서 찍은 영화와 사진. 결과물과 함께 촬영과 편집의 기록을 남겼습니다.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="portfolio-section works-archive-section">
        <div className="portfolio-container"><WorkFilter works={works} /></div>
      </section>
    </div>
  );
}
