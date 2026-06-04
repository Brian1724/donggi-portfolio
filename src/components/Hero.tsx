import Image from "next/image";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { profile } from "@/data/profile";

export function Hero() {
  return (
    <section className="overflow-hidden bg-primary">
      <Container className="py-10 text-center sm:py-14 lg:py-16">
        <Reveal className="mx-auto max-w-6xl">
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm font-black uppercase text-ink-deep">
            <span className="rounded-full bg-canvas/80 px-4 py-2">
              Visual Archive
            </span>
            <span className="rounded-full bg-canvas/80 px-4 py-2">
              South Korea
            </span>
            <span className="rounded-full bg-canvas/80 px-4 py-2">
              DK4FILM
            </span>
          </div>
          <h1 className="hero-heading mt-6 text-ink-deep">
            <span className="hero-line block">EVERYDAY FRAMES,</span>
            <span className="hero-line block">EVERYWHERE</span>
          </h1>
          <p className="mx-auto mt-5 max-w-3xl text-xl font-black leading-8 text-ink-deep sm:text-2xl sm:leading-9">
            {profile.title}
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-lg font-semibold leading-8 text-ink-deep/80 sm:text-xl">
            {profile.tagline}
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Button href="/works" variant="deep">
              작업 보기
            </Button>
            <Button href="/contact" variant="tertiary">
              연락하기
            </Button>
          </div>
        </Reveal>
      </Container>
      <Container className="pb-12 sm:pb-16 lg:pb-20">
        <Reveal delay={0.1}>
          <div className="surface-ring relative overflow-hidden rounded-[32px] bg-canvas p-3 sm:p-4">
            <div className="relative aspect-[16/9] min-h-[340px] overflow-hidden rounded-[28px] bg-primary-pale">
              <Image
                src="/images/hero.jpg"
                alt="윤동기의 비주얼 아카이브 대표 이미지"
                fill
                priority
                className="object-cover"
              />
              <div className="absolute left-5 top-5 rounded-full bg-canvas/90 px-4 py-2 text-sm font-black text-ink-deep">
                Donggi Yoon
              </div>
              <div className="absolute bottom-5 left-5 right-5 flex flex-col gap-3 rounded-[24px] bg-canvas/90 p-5 backdrop-blur-sm sm:left-auto sm:max-w-md">
                <p className="text-sm font-black uppercase text-positive-deep">
                  In progress
                </p>
                <p className="text-2xl font-black leading-none text-ink-deep">
                  사진과 영상으로 일상과 여행의 순간을 기록합니다.
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
