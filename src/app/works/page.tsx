import { Reveal } from "@/components/Reveal";
import { WorkFilter } from "@/components/WorkFilter";
import { works } from "@/data/works";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Works",
  description: "윤동기의 영상, 사진, 여행 영화, 캠퍼스 기록과 개인 시각 실험을 역할과 제작 과정까지 함께 소개하는 포트폴리오.",
  path: "/works",
});

export default function WorksPage() {
  return (
    <div className="portfolio-page">
      <section className="portfolio-hero">
        <div className="portfolio-container">
          <Reveal><p className="portfolio-kicker">Works / 2025—2026</p><h1 className="portfolio-title">SELECTED<br />VISUAL WORK.</h1></Reveal>
          <Reveal delay={0.08}><p className="portfolio-lead"><strong>Film, photography and visual storytelling.</strong>여행과 일상에서 발견한 빛, 공간, 사람의 분위기를 영상과 사진으로 구성한 작업들입니다. 각 프로젝트에서 맡은 역할과 제작 판단을 함께 기록했습니다.</p></Reveal>
        </div>
      </section>
      <section className="portfolio-section is-surface">
        <div className="portfolio-container"><WorkFilter works={works} /></div>
      </section>
    </div>
  );
}
