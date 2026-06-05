import Image from "next/image";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { profile } from "@/data/profile";
import { works } from "@/data/works";

export function Hero() {
  const featuredWork = works[0];

  return (
    <section className="band-sage overflow-hidden">
      <Container className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_0.78fr] lg:items-center">
        <Reveal>
          <p className="eyebrow">Visual Archive / South Korea</p>
          <h1 className="hero-headline mt-2 max-w-[11ch]">
            Everyday moments, cinematic memories.
          </h1>
          <p className="ko-under">
            {profile.tagline}
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href="/works">
              작업 보기
            </Button>
            <Button href="/contact" variant="ghost">
              연락하기 →
            </Button>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <article className="featured-card">
            <div className="media relative aspect-[4/5] bg-canvas-soft">
              <Image
                src={featuredWork.thumbnail}
                alt={featuredWork.thumbnailAlt}
                fill
                priority
                className="object-cover"
              />
            </div>
            <div>
              <p className="eyebrow">Featured Work</p>
              <h2 className="subhead mt-2 text-ink">{featuredWork.title}</h2>
              <p className="body mt-4">{featuredWork.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {featuredWork.categories.slice(0, 2).map((category) => (
                  <span key={category} className="chip">
                    {category}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </Reveal>
      </Container>
    </section>
  );
}
