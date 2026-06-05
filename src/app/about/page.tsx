import Image from "next/image";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { profile } from "@/data/profile";
import { skills } from "@/data/skills";
import { timeline } from "@/data/timeline";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "About",
  description:
    "윤동기 Donggi Yoon의 소개. 전북대학교 SIES 재학, 미디어커뮤니케이션 복수전공, 사진과 영상을 배우며 쌓아가는 비주얼 아카이브.",
  path: "/about",
  imagePath: "/images/archive/about-cherry-portrait.jpg",
});

export default function AboutPage() {
  return (
    <>
      <section className="hero-band">
        <Container className="grid grid-cols-1 gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <Reveal>
            <p className="eyebrow">About</p>
            <h1 className="display hero-mega mt-4 text-ink">윤동기</h1>
            <p className="subhead mt-6 text-ink">
              {profile.title}
            </p>
            <p className="lead mt-4 max-w-[640px]">
              {profile.intro}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="card">
              <div className="media relative aspect-[4/3] bg-canvas-soft">
                <Image
                  src="/images/archive/about-cherry-portrait.jpg"
                  alt="서도역 앞 철길과 사람들의 오후 풍경을 담은 윤동기의 사진"
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="hero-band">
        <Container className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            ["Korean Name", profile.nameKo],
            ["English Name", profile.nameEn],
            ["School", profile.school],
            ["Double Major", profile.doubleMajor],
          ].map(([label, value], index) => (
            <Reveal key={label} delay={index * 0.05}>
              <Card className="h-full">
                <p className="eyebrow">
                  {label}
                </p>
                <p className="subhead mt-4 text-ink">
                  {value}
                </p>
              </Card>
            </Reveal>
          ))}
        </Container>
      </section>

      <section className="hero-band">
        <Container className="grid grid-cols-1 gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <SectionHeader
              eyebrow="Learning Path"
              title="기록하는 사람으로 성장하는 과정."
              subtitle="학교에서 배우는 미디어적 관점과 개인 촬영 경험을 연결해, 오래 남는 이미지와 흐름을 탐구하고 있습니다."
            />
            <div className="card mt-8">
              <div className="media relative aspect-[4/5] bg-canvas-soft">
                <Image
                  src="/images/archive/about-winter-hike.jpg"
                  alt="겨울 산책길에서 기록한 세로 프레임의 시각 아카이브 사진"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-6">
            {timeline.map((item, index) => (
              <Reveal key={`${item.period}-${item.title}`} delay={index * 0.06}>
                <Card>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <Badge>{item.period}</Badge>
                      <h2 className="head-md mt-4 text-ink">
                        {item.title}
                      </h2>
                    </div>
                    <p className="body">
                      {item.description}
                    </p>
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="hero-band">
        <Container>
          <SectionHeader
            eyebrow="Practice"
            title="What I keep building."
            subtitle="촬영, 편집, 색감, 스토리텔링을 작게 반복하며 포트폴리오를 채워가고 있습니다."
          />
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
            {skills.map((skill, index) => (
              <Reveal key={skill.title} delay={index * 0.05}>
                <Card className="h-full">
                  <h2 className="head-md text-ink">
                    {skill.title}
                  </h2>
                  <p className="body mt-4">
                    {skill.description}
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <Badge key={item}>{item}</Badge>
                    ))}
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={profile.resumeUrl} variant="secondary" external>
              Resume
            </Button>
            <Button href="/works">작업 보기</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
