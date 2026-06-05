import Image from "next/image";
import { Button } from "@/components/Button";
import { ContactFeatureCard } from "@/components/ContactFeatureCard";
import { Container } from "@/components/Container";
import { Hero } from "@/components/Hero";
import { JournalCard } from "@/components/JournalCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { WorkCard } from "@/components/WorkCard";
import { getSortedJournalPosts } from "@/data/journal";
import { works } from "@/data/works";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Donggi Yoon | Visual Archive",
  path: "/",
});

export default function HomePage() {
  const featuredWorks = works.slice(0, 3);
  const journalPreview = getSortedJournalPosts().slice(0, 3);
  const stats = [
    ["12", "visual films in progress"],
    ["8", "cities and places archived"],
    ["2026", "portfolio season"],
  ];

  return (
    <>
      <Hero />

      <section className="band-sage">
        <Container>
          <Reveal>
            <div className="stats">
              {stats.map(([number, label]) => (
                <div key={label}>
                  <p className="stat-num">{number}</p>
                  <p className="stat-label">{label}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="band-white">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeader
              eyebrow="Selected Works"
              title="Photos, videos, travel memories."
              subtitle="사진과 영상으로 쌓아가는 개인 비주얼 아카이브입니다."
            />
            <Button href="/works" variant="ghost">
              모든 작업 보기 →
            </Button>
          </div>
          <div className="grid-3 mt-8">
            {featuredWorks.map((work, index) => (
              <Reveal key={work.slug} delay={index * 0.08}>
                <WorkCard work={work} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="band-sage">
        <Container>
          <Reveal>
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="eyebrow">About</p>
                <h2 className="heading mt-2 max-w-2xl">
                  A quiet visual archive, built frame by frame.
                </h2>
                <p className="ko-under">
                  전북대학교 SIES에서 공부하며 미디어커뮤니케이션을 함께 배우고 있습니다. 여행, 일상, 사람, 공간의 분위기를 사진과 영상으로 차분히 기록합니다.
                </p>
                <div className="mt-8">
                  <Button href="/about" variant="ghost">소개 보기 →</Button>
                </div>
              </div>
              <div className="media relative aspect-[4/3] bg-canvas-soft">
                <Image
                  src="/images/archive/about-cherry-portrait.jpg"
                  alt="서도역 앞 철길과 사람들의 오후 풍경을 담은 윤동기의 사진"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="band-white">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeader
              eyebrow="Journal"
              title="Notes from the visual process."
              subtitle="촬영을 준비하고, 사진을 고르고, 편집을 배우며 남기는 짧은 기록입니다."
            />
            <Button href="/journal" variant="ghost">
              저널 보기 →
            </Button>
          </div>
          <div className="grid-3 mt-8">
            {journalPreview.map((post, index) => (
              <Reveal key={post.slug} delay={index * 0.06}>
                <JournalCard post={post} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="band-white">
        <Container>
          <Reveal>
            <ContactFeatureCard />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
