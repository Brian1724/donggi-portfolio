import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import { Hero } from "@/components/Hero";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { WorkCard } from "@/components/WorkCard";
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
        <Container className="grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
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
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {[
              {
                title: "School",
                description: profile.school,
                items: [profile.department, profile.doubleMajor],
              },
              ...skills.slice(0, 3),
            ].map((skill, index) => (
              <Reveal key={skill.title} delay={index * 0.06}>
                <Card className="h-full">
                  <h3 className="head-md text-ink">
                    {skill.title}
                  </h3>
                  <p className="body mt-4">
                    {skill.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
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
    </>
  );
}
