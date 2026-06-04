import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { profile } from "@/data/profile";
import { works } from "@/data/works";

export function Hero() {
  const featuredWork = works[0];

  return (
    <section className="hero-band overflow-hidden">
      <Container className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_420px] lg:items-center">
        <Reveal>
          <Image
            src="/logo/logo-full.svg"
            alt="YOON DONGGI"
            width={420}
            height={100}
            priority
            className="mb-6 h-12 w-auto max-w-full"
          />
          <p className="eyebrow">Visual Archive / South Korea</p>
          <h1 className="display hero-mega mt-4 max-w-4xl text-ink">
            Everyday frames, cinematic memories.
          </h1>
          <p className="subhead mt-6 max-w-[640px] text-ink">
            {profile.title}
          </p>
          <p className="lead mt-4 max-w-[640px]">{profile.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/works">
              작업 보기
            </Button>
            <Button href="/contact" variant="tertiary">
              연락하기
            </Button>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <Link
            href={`/works/${featuredWork.slug}`}
            className="card group border border-ink"
          >
            <div className="media relative aspect-[4/5] bg-canvas-soft">
              <Image
                src={featuredWork.thumbnail}
                alt={`${featuredWork.title} featured image`}
                fill
                priority
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col pt-6">
              <div className="flex flex-wrap gap-2">
                {featuredWork.categories.slice(0, 2).map((category) => (
                  <Badge key={category}>{category}</Badge>
                ))}
              </div>
              <p className="eyebrow mt-4">{featuredWork.year}</p>
              <h2 className="head-md mt-3 text-ink">{featuredWork.title}</h2>
              <p className="body card-cta mt-4 truncate">{featuredWork.description}</p>
            </div>
          </Link>
        </Reveal>
      </Container>
    </section>
  );
}
