import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { ContactCTA } from "@/components/ContactCTA";
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

  return (
    <>
      <article className="bg-canvas-soft py-12 sm:py-16 lg:py-24">
        <Container>
          <Reveal>
            <Link
              href="/works"
              className="text-sm font-bold uppercase text-positive-deep"
            >
              Works
            </Link>
            <h1 className="section-heading mt-5 max-w-5xl">{work.title}</h1>
            <p className="mt-6 max-w-3xl text-body-large text-body">
              {work.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {work.categories.map((category) => (
                <Badge key={category}>{category}</Badge>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="surface-ring mt-10 overflow-hidden rounded-[24px] bg-canvas p-4">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[24px] bg-primary-pale">
                <Image
                  src={work.thumbnail}
                  alt={`${work.title} 대표 이미지`}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-5 lg:grid-cols-[0.75fr_1.25fr]">
            <Reveal>
              <Card>
                <p className="text-sm font-bold uppercase text-positive-deep">
                  Overview
                </p>
                <dl className="mt-5 grid gap-5">
                  <div>
                    <dt className="text-sm font-bold uppercase text-mute">Year</dt>
                    <dd className="mt-1 text-xl font-black text-ink">
                      {work.year}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-bold uppercase text-mute">Role</dt>
                    <dd className="mt-2 flex flex-wrap gap-2">
                      {work.role.map((role) => (
                        <Badge key={role}>{role}</Badge>
                      ))}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-sm font-bold uppercase text-mute">Tools</dt>
                    <dd className="mt-2 flex flex-wrap gap-2">
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
                <p className="text-sm font-bold uppercase text-positive-deep">
                  Project Note
                </p>
                <div className="mt-5 grid gap-4 text-lg leading-8 text-body">
                  <p>
                    이 작업은 윤동기가 사진과 영상으로 일상, 여행, 사람,
                    공간의 분위기를 기록하며 쌓아가는 개인 포트폴리오의 일부입니다.
                  </p>
                  <p>
                    장면의 색감, 움직임, 빛의 방향, 편집 리듬을 함께 관찰하며
                    오래 남는 비주얼 언어를 찾아가는 과정으로 정리했습니다.
                  </p>
                </div>
                {work.links.instagram ? (
                  <div className="mt-7">
                    <Button href={work.links.instagram} external>
                      Instagram에서 보기
                    </Button>
                  </div>
                ) : null}
              </Card>
            </Reveal>
          </div>

          <nav className="mt-8 grid gap-5 md:grid-cols-2" aria-label="Work pagination">
            {previous ? (
              <Link
                href={`/works/${previous.slug}`}
                className="surface-ring rounded-[24px] bg-canvas p-6 transition hover:-translate-y-1 hover:bg-primary-pale"
              >
                <span className="text-sm font-bold uppercase text-positive-deep">
                  Previous
                </span>
                <span className="mt-3 block text-2xl font-black leading-tight text-ink">
                  {previous.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {next ? (
              <Link
                href={`/works/${next.slug}`}
                className="surface-ring rounded-[24px] bg-canvas p-6 text-left transition hover:-translate-y-1 hover:bg-primary-pale md:text-right"
              >
                <span className="text-sm font-bold uppercase text-positive-deep">
                  Next
                </span>
                <span className="mt-3 block text-2xl font-black leading-tight text-ink">
                  {next.title}
                </span>
              </Link>
            ) : null}
          </nav>
        </Container>
      </article>

      <ContactCTA />
    </>
  );
}
