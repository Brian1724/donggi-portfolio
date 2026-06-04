import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { ContactCTA } from "@/components/ContactCTA";
import { Container } from "@/components/Container";
import { Hero } from "@/components/Hero";
import { JournalCard } from "@/components/JournalCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { WorkCard } from "@/components/WorkCard";
import { journalPosts } from "@/data/journal";
import { profile } from "@/data/profile";
import { skills } from "@/data/skills";
import { works } from "@/data/works";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Donggi Yoon | Visual Archive",
  path: "/",
});

export default function HomePage() {
  const featuredWorks = works.slice(0, 3);
  const latestPosts = journalPosts.slice(0, 2);

  return (
    <>
      <Hero />

      <section className="bg-canvas py-12 sm:py-16 lg:py-20">
        <Container>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              ["School", profile.school],
              ["Major", profile.department],
              ["Double Major", profile.doubleMajor],
            ].map(([label, value]) => (
              <Reveal key={label}>
                <Card className="h-full">
                  <p className="text-sm font-bold uppercase text-positive-deep">
                    {label}
                  </p>
                  <p className="mt-4 text-2xl font-black leading-tight text-ink">
                    {value}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-canvas py-12 sm:py-16 lg:py-24">
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
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {featuredWorks.map((work, index) => (
              <Reveal key={work.slug} delay={index * 0.08}>
                <WorkCard work={work} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-primary py-12 sm:py-16 lg:py-24">
        <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal>
            <SectionHeader
              eyebrow="About"
              title="시선을 훈련하는 중입니다."
              subtitle={profile.intro}
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/about">소개 보기</Button>
              <Button href="/contact" variant="tertiary">
                협업 문의
              </Button>
            </div>
          </Reveal>
          <div className="grid gap-5 sm:grid-cols-2">
            {skills.map((skill, index) => (
              <Reveal key={skill.title} delay={index * 0.06}>
                <Card className="h-full">
                  <h3 className="text-3xl font-black leading-none text-ink">
                    {skill.title}
                  </h3>
                  <p className="mt-4 text-base leading-6 text-body">
                    {skill.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {skill.items.slice(0, 4).map((item) => (
                      <Badge key={item}>{item}</Badge>
                    ))}
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-canvas py-12 sm:py-16 lg:py-24">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeader
              eyebrow="Journal"
              title="Process notes and visual thoughts."
              subtitle="촬영, 편집, 여행, 사진을 배우며 남기는 짧은 기록들입니다."
            />
            <Button href="/journal" variant="secondary">
              저널 읽기
            </Button>
          </div>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {latestPosts.map((post, index) => (
              <Reveal key={post.slug} delay={index * 0.08}>
                <JournalCard post={post} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <ContactCTA />
    </>
  );
}
