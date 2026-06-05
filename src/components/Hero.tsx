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
          <h1 className="display hero-mega mx-auto mt-4 text-ink">
            Everyday moments, cinematic memories.
          </h1>
          <p className="hero-tagline mx-auto max-w-[640px]">
            {profile.tagline}
          </p>
          <div className="hero-actions flex flex-wrap justify-center gap-3">
            <Button href="/works">
              작업 보기
            </Button>
            <Button href="/contact" variant="tertiary">
              연락하기
            </Button>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="hero-image relative bg-canvas">
            <Image
              src="/images/archive/detail-extra-visual-01.jpg"
              alt="홍콩의 밤 도시 풍경을 넓게 담은 Donggi Yoon의 여행 아카이브 사진"
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
