import Image from "next/image";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { profile } from "@/data/profile";

export function Hero() {
  return (
    <section className="hero-band overflow-hidden">
      <Container>
        <Reveal className="mx-auto max-w-5xl text-center">
          <p className="eyebrow">Visual Archive / South Korea</p>
          <h1 className="display hero-mega mx-auto mt-4 max-w-5xl text-ink">
            Everyday moments, cinematic memories.
          </h1>
          <p className="lead mx-auto mt-6">
            {profile.tagline}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href="/works">
              작업 보기
            </Button>
            <Button href="/contact" variant="tertiary">
              연락하기
            </Button>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="media relative mt-12 aspect-[16/9] bg-canvas">
            <Image
              src="/images/archive/hero-cherry-portrait.jpg"
              alt="강변 너머 도시의 밤 실루엣을 담은 Donggi Yoon의 시각 아카이브 이미지"
              fill
              priority
              className="object-cover"
            />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
