import { Reveal } from "@/components/Reveal";
import { WorkFilter } from "@/components/WorkFilter";
import { works } from "@/data/works";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "작업",
  description: "윤동기의 영상, 사진, 여행 영화, 캠퍼스 기록과 개인 시각 실험을 역할과 제작 과정까지 함께 소개하는 포트폴리오.",
  path: "/works",
});

export default function WorksPage() {
  return (
    <div className="portfolio-page">
      <section className="portfolio-hero">
        <div className="portfolio-container">
          <Reveal>
            <p className="portfolio-kicker">Works / 2025—2026</p>
            <h1 className="portfolio-title is-korean">사진과 영상으로<br />쌓아가는 작업들.</h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="portfolio-lead">
              <strong>장면의 분위기를 오래 남기는 방법을 찾고 있습니다.</strong>
              여행과 일상에서 발견한 빛, 공간, 사람의 움직임을 영상과 사진으로 구성합니다. 각 프로젝트에는 결과와 함께 작업을 시작한 이유, 촬영과 편집의 판단, 다음에 더 발전시키고 싶은 지점을 기록했습니다.
            </p>
          </Reveal>
        </div>
      </section>
      <section className="portfolio-section is-surface">
        <div className="portfolio-container"><WorkFilter works={works} /></div>
      </section>
    </div>
  );
}
