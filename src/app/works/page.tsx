import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { WorkFilter } from "@/components/WorkFilter";
import { works } from "@/data/works";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Works",
  description:
    "윤동기 Donggi Yoon의 사진, 영상, 여행, 캠퍼스, 개인 비주얼 아카이브 작업 모음.",
  path: "/works",
});

export default function WorksPage() {
  return (
    <section className="sage-band">
      <Container>
        <Reveal>
          <SectionHeader
            eyebrow="Works"
            title="A visual archive in progress."
            subtitle="사진, 영상, 여행, 캠퍼스, 개인 실험을 하나의 흐름으로 모아둔 작업 아카이브입니다."
          />
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-8">
            <WorkFilter works={works} />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
