import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { getAdjacentWorks, getWorkBySlug, works } from "@/data/works";
import { createPageMetadata } from "@/lib/metadata";

type WorkPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return works.map((work) => ({
    slug: work.slug,
  }));
}

export async function generateMetadata({ params }: WorkPageProps) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);

  if (!work) {
    return createPageMetadata({
      title: "Work",
      path: "/works",
    });
  }

  return createPageMetadata({
    title: work.title,
    description: work.description,
    path: `/works/${work.slug}`,
    imagePath: work.thumbnail,
  });
}

export default async function WorkDetailPage({ params }: WorkPageProps) {
  const { slug } = await params;
  const work = getWorkBySlug(slug);

  if (!work) {
    notFound();
  }

  const { previous, next } = getAdjacentWorks(work.slug);
  const detailAspectClass = {
    landscape: "aspect-[4/3]",
    portrait: "aspect-[4/5]",
    wide: "aspect-[4/3]",
  };

  return (
    <article className="band-sage">
      <Container>
        <Reveal>
          <Link href="/works" className="eyebrow">
            Works
          </Link>
          <h1 className="hero-headline mt-2 max-w-5xl">
            {work.title}
          </h1>
          <p className="ko-under">{work.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {work.categories.map((category) => (
              <Badge key={category}>{category}</Badge>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="card mt-8">
            <div className="media relative aspect-[4/3] bg-primary-pale">
              <Image
                src={work.thumbnail}
                alt={work.thumbnailAlt}
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[320px_1fr]">
          <Reveal>
            <Card>
              <p className="eyebrow">Overview</p>
              <dl className="mt-6 grid grid-cols-1 gap-6">
                <div>
                  <dt className="eyebrow">Year</dt>
                  <dd className="subhead mt-2 text-ink">{work.year}</dd>
                </div>
                <div>
                  <dt className="eyebrow">Role</dt>
                  <dd className="mt-3 flex flex-wrap gap-2">
                    {work.role.map((role) => (
                      <Badge key={role}>{role}</Badge>
                    ))}
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow">Gear</dt>
                  <dd className="mt-3 flex flex-wrap gap-2">
                    {work.tools.map((tool) => (
                      <Badge key={tool}>{tool}</Badge>
                    ))}
                  </dd>
                </div>
              </dl>
            </Card>
          </Reveal>

          <Reveal delay={0.08}>
            <Card>
              <p className="eyebrow">Project Note</p>
              <div className="mt-6 grid grid-cols-1 gap-4">
                <p className="body">
                  이 작업은 윤동기가 사진과 영상으로 일상, 여행, 사람,
                  공간의 분위기를 기록하며 쌓아가는 개인 포트폴리오의 일부입니다.
                </p>
                <p className="body">
                  장면의 색감, 움직임, 빛의 방향, 편집 리듬을 함께 관찰하며
                  오래 남는 비주얼 언어를 찾아가는 과정으로 정리했습니다.
                </p>
              </div>
              {work.links.instagram ? (
                <div className="mt-8">
                  <Button href={work.links.instagram} external>
                    Instagram에서 보기
                  </Button>
                </div>
              ) : null}
            </Card>
          </Reveal>
        </div>

        <section className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2">
          {work.detailImages.map((image, index) => (
            <Reveal key={image.src} delay={index * 0.08}>
              <div className="card">
                <div
                  className={`media relative ${detailAspectClass[image.aspect]} bg-primary-pale`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </section>

        <nav className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2" aria-label="Work pagination">
          {previous ? (
            <Link href={`/works/${previous.slug}`} className="card block">
              <span className="eyebrow">Previous</span>
              <span className="subhead mt-2 block text-ink">
                {previous.title}
              </span>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/works/${next.slug}`}
              className="card block text-left md:text-right"
            >
              <span className="eyebrow">Next</span>
              <span className="subhead mt-2 block text-ink">
                {next.title}
              </span>
            </Link>
          ) : null}
        </nav>
      </Container>
    </article>
  );
}
