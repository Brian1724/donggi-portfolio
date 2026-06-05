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
  const journalPreview = getSortedJournalPosts().slice(0, 2);

  return (
    <>
      <Hero />

      <section className="content-band">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeader
              eyebrow="Selected Works"
              title="Photos, videos, travel memories."
              subtitle="사진과 영상으로 쌓아가는 개인 비주얼 아카이브입니다."
            />
            <Button href="/works" variant="secondary">
              모든 작업 보기
            </Button>
          </div>
          <div className="grid-works mt-8">
            {featuredWorks.map((work, index) => (
              <Reveal key={work.slug} delay={index * 0.08}>
                <WorkCard
                  work={work}
                  aspect={index === 1 ? "landscape" : "portrait"}
                />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="hero-band">
        <Container>
          <Reveal>
            <div className="card grid grid-cols-1 gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <div>
                <p className="eyebrow">About</p>
                <h2 className="heading mt-2 max-w-2xl text-ink">
                  시선을 천천히 훈련하는 개인 비주얼 아카이브.
                </h2>
                <p className="lead mt-6">
                  전북대학교 SIES에서 공부하며 미디어커뮤니케이션을 함께 배우고 있습니다. 여행, 일상, 사람, 공간의 분위기를 사진과 영상으로 차분히 기록합니다.
                </p>
                <div className="mt-8">
                  <Button href="/about">소개 보기</Button>
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

      <section className="content-band">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeader
              eyebrow="Journal"
              title="Notes from the visual process."
              subtitle="촬영을 준비하고, 사진을 고르고, 편집을 배우며 남기는 짧은 기록입니다."
            />
            <Button href="/journal" variant="secondary">
              저널 보기
            </Button>
          </div>
          <div className="mt-8 grid grid-cols-1 items-stretch gap-8 md:grid-cols-2">
            {journalPreview.map((post, index) => (
              <Reveal key={post.slug} delay={index * 0.06}>
                <JournalCard post={post} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="hero-band">
        <Container>
          <Reveal>
            <ContactFeatureCard />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
