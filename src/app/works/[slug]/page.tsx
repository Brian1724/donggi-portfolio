import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { DocumentLink } from "@/components/DocumentLink";
import { getAdjacentWorks, getWorkBySlug, works } from "@/data/works";
import { createPageMetadata } from "@/lib/metadata";
import { getResolvedWorkMedia } from "@/lib/work-media";

type WorkPageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return works.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({ params }: WorkPageProps) {
  const work = getWorkBySlug((await params).slug);
  return work
    ? createPageMetadata({
        title: work.title,
        description: work.description,
        path: `/works/${work.slug}`,
        imagePath: work.thumbnail,
      })
    : createPageMetadata({ title: "작업", path: "/works" });
}

export default async function WorkDetailPage({ params }: WorkPageProps) {
  const work = getWorkBySlug((await params).slug);
  if (!work) notFound();
  const { previous, next } = getAdjacentWorks(work.slug);
  const media = getResolvedWorkMedia(work);

  return (
    <article className="portfolio-page">
      <section className="portfolio-hero project-intro">
        <div className="portfolio-container">
          <Reveal>
            <DocumentLink href="/works/" className="portfolio-kicker">
              작업 목록 / Works
            </DocumentLink>
            <h1 className="portfolio-title is-wide">{work.title}</h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="portfolio-lead">
              <strong>{work.format}</strong>
              {work.description}
            </p>
          </Reveal>
        </div>
        <div className="portfolio-container project-visual-wrap">
          <Reveal delay={0.12}>
            <div
              className={`project-hero-media is-${work.thumbnailAspect}`}
              style={{ aspectRatio: work.thumbnailRatio, viewTransitionName: `work-${work.slug}` }}
            >
              <Image
                src={work.thumbnail}
                alt={work.thumbnailAlt}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover"
              />
            </div>
            <dl className="project-info-grid">
              <div>
                <dt>Project</dt>
                <dd>{work.archiveMeta?.medium ?? work.categories[0]} · {work.year}</dd>
              </div>
              <div className="project-info-location">
                <dt>Place / Note</dt>
                <dd>{work.location}<br />{work.concept}</dd>
              </div>
              <div>
                <dt>Credits</dt>
                <dd>{work.role.join(" · ")}</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="portfolio-section project-story-section">
        <div className="portfolio-container project-narrative">
          <Reveal>
            <article>
              <p className="portfolio-kicker">Context</p>
              <h2>왜 이 작업을 시작했는가.</h2>
              <p>{work.purpose}</p>
            </article>
          </Reveal>
          {work.detailImages[0] ? (
            <figure className="project-interlude">
              <div
                className={`project-gallery-media is-${work.detailImages[0].aspect}`}
                data-image-reveal
                style={{ aspectRatio: work.detailImages[0].ratio }}
              >
                <Image src={work.detailImages[0].src} alt={work.detailImages[0].alt} fill sizes="(max-width: 1200px) 100vw, 1200px" />
              </div>
              <figcaption>{work.detailImages[0].alt}</figcaption>
            </figure>
          ) : null}
          <Reveal delay={0.05}>
            <article>
              <p className="portfolio-kicker">Concept</p>
              <h2>무엇을 중심에 두었는가.</h2>
              <p>{work.concept}</p>
            </article>
          </Reveal>
          <Reveal delay={0.1}>
            <article>
              <p className="portfolio-kicker">Process</p>
              <h2>장면을 어떻게 이어갔는가.</h2>
              <p>{work.process}</p>
            </article>
          </Reveal>
        </div>
      </section>

      {media.length ? (
        <section className="portfolio-section project-media-archive">
          <div className="portfolio-container">
            <div className="portfolio-section-heading">
              <div>
                <p className="portfolio-kicker">Project archive</p>
                <h2>프로젝트를 이루는 기록.</h2>
              </div>
              <p>한 프로젝트 안에서 이어지는 영상과 사진을 모았습니다.</p>
            </div>
            <div className="project-media-list">
              {media.map((entry, index) => (
                <Reveal key={`${entry.kind}-${entry.item.id}`} delay={index * 0.05}>
                  <article id={`${entry.kind}-${entry.item.id}`} className={`project-media-item is-${entry.kind}`}>
                    {entry.kind === "film" ? (
                      <video controls playsInline preload="none" poster={entry.item.posterAlt ?? entry.item.poster}>
                        <source src={entry.item.src} type="video/mp4" />
                      </video>
                    ) : (
                      <div className="project-media-still" style={{ aspectRatio: entry.item.ratio }}>
                        <Image
                          src={entry.item.src}
                          alt={entry.item.alt}
                          fill
                          sizes="(max-width: 800px) 100vw, 980px"
                        />
                      </div>
                    )}
                    <div className="project-media-caption">
                      <p>{entry.kind === "film" ? "Film" : "Still"}</p>
                      <h3>{entry.kind === "film" ? entry.item.title : entry.item.label}</h3>
                      <span>{entry.kind === "film" ? `${entry.item.year} · ${entry.item.duration}` : entry.item.alt}</span>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="portfolio-section">
        <div className="portfolio-container">
          <div className="portfolio-section-heading">
            <div>
              <p className="portfolio-kicker">Selected frames</p>
              <h2>작업의 시선을 보여주는 장면들.</h2>
            </div>
            <p>완성된 결과뿐 아니라 프레이밍과 색, 공간을 바라본 판단이 드러나는 장면을 골랐습니다.</p>
          </div>
          <div className="project-gallery">
            {work.detailImages.slice(1).map((image, index) => (
              <Reveal key={image.src} delay={index * 0.06}>
                <figure>
                  <div
                    className={`project-gallery-media is-${image.aspect}`}
                    data-image-reveal
                    style={{ aspectRatio: image.ratio }}
                  >
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 800px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <figcaption>{image.alt}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="portfolio-section project-paper">
        <div className="portfolio-container project-closing">
          <Reveal>
            <div>
              <p className="portfolio-kicker">Role / Tools</p>
              <h2>이 작업에서 맡고 사용한 것.</h2>
              <dl className="portfolio-facts">
                <div>
                  <dt>Role</dt>
                  <dd>{work.role.join(" · ")}</dd>
                </div>
                <div>
                  <dt>Tools</dt>
                  <dd>{work.tools.join(" · ")}</dd>
                </div>
                {work.archiveMeta?.camera ? (
                  <div>
                    <dt>Camera</dt>
                    <dd>{work.archiveMeta.camera}</dd>
                  </div>
                ) : null}
              </dl>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="project-reflection">
              <p className="portfolio-kicker">Reflection</p>
              <h2>남은 고민과 다음 장면.</h2>
              <p>{work.challenge}</p>
              <p>{work.reflection}</p>
              {work.links.instagram ? (
                <a
                  href={work.links.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="portfolio-text-link"
                >
                  Instagram에서 이어보기
                </a>
              ) : null}
            </div>
          </Reveal>
        </div>
      </section>

      <nav className="portfolio-section project-navigation" aria-label="다른 작업으로 이동">
        <div className="portfolio-container portfolio-grid is-two">
          {previous ? (
            <Link href={`/works/${previous.slug}`} className="project-nav-link">
              <span>Previous / 이전 작업</span>
              <strong>{previous.title}</strong>
              <i aria-hidden="true">←</i>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link href={`/works/${next.slug}`} className="project-nav-link is-next">
              <span>Next / 다음 작업</span>
              <strong>{next.title}</strong>
              <i aria-hidden="true">→</i>
            </Link>
          ) : null}
        </div>
      </nav>
    </article>
  );
}
