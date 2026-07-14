import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/Reveal";
import { getAdjacentWorks, getWorkBySlug, works } from "@/data/works";
import { createPageMetadata } from "@/lib/metadata";

type WorkPageProps = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return works.map((work) => ({ slug: work.slug })); }

export async function generateMetadata({ params }: WorkPageProps) {
  const work = getWorkBySlug((await params).slug);
  return work ? createPageMetadata({ title: work.title, description: work.description, path: `/works/${work.slug}`, imagePath: work.thumbnail }) : createPageMetadata({ title: "Work", path: "/works" });
}

export default async function WorkDetailPage({ params }: WorkPageProps) {
  const work = getWorkBySlug((await params).slug);
  if (!work) notFound();
  const { previous, next } = getAdjacentWorks(work.slug);

  return (
    <article className="portfolio-page">
      <section className="portfolio-hero">
        <div className="portfolio-container">
          <Reveal>
            <Link href="/works" className="portfolio-kicker">Works / Back</Link>
            <h1 className="portfolio-title is-wide">{work.title}</h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="portfolio-lead"><strong>{work.format}</strong>{work.description}</p>
            <div className="portfolio-tags">{work.categories.slice(0, 3).map((item) => <span className="portfolio-tag" key={item}>{item}</span>)}</div>
          </Reveal>
        </div>
        <div className="portfolio-container">
          <Reveal delay={0.12}>
            <div className="project-hero-media"><Image src={work.thumbnail} alt={work.thumbnailAlt} fill priority className="object-cover" /></div>
            <dl className="project-info-grid">
              <div><dt>Year</dt><dd>{work.year}</dd></div>
              <div><dt>Location</dt><dd>{work.location}</dd></div>
              <div><dt>Role</dt><dd>{work.role.join(" · ")}</dd></div>
              <div><dt>Tools</dt><dd>{work.tools.join(" · ")}</dd></div>
            </dl>
          </Reveal>
        </div>
      </section>

      <section className="portfolio-section is-surface">
        <div className="portfolio-container project-narrative">
          <Reveal><article><h2>Purpose</h2><p>{work.purpose}</p></article></Reveal>
          <Reveal delay={0.05}><article><h2>Concept &amp; Process</h2><p>{work.concept}</p><p>{work.process}</p></article></Reveal>
          <Reveal delay={0.1}><article><h2>What I considered</h2><p>{work.challenge}</p></article></Reveal>
        </div>
        {work.video ? <div className="portfolio-container"><Reveal><div className="project-video"><video controls playsInline preload="metadata" poster={work.video.poster}><source src={work.video.src} type="video/mp4" /></video></div></Reveal></div> : null}
      </section>

      <section className="portfolio-section">
        <div className="portfolio-container">
          <div className="portfolio-section-heading"><div><p className="portfolio-kicker">Selected frames</p><h2>IMAGES FROM THE PROJECT.</h2></div><p>작업의 분위기와 구성 판단을 보여주는 대표 프레임입니다.</p></div>
          <div className="project-gallery">
            {work.detailImages.map((image, index) => <Reveal key={image.src} delay={index * 0.06}><figure><div className={`project-gallery-media is-${image.aspect}`}><Image src={image.src} alt={image.alt} fill className="object-cover" /></div></figure></Reveal>)}
          </div>
          {work.links.instagram ? <div className="portfolio-actions"><a href={work.links.instagram} target="_blank" rel="noreferrer" className="portfolio-button">View on Instagram ↗</a></div> : null}
        </div>
      </section>

      <nav className="portfolio-section is-surface" aria-label="작업 이동">
        <div className="portfolio-container portfolio-grid is-two">
          {previous ? <Link href={`/works/${previous.slug}`} className="portfolio-card"><div className="portfolio-card-body"><div className="portfolio-card-meta"><span>Previous</span></div><h2>{previous.title}</h2><p className="portfolio-card-link">View project ←</p></div></Link> : <div />}
          {next ? <Link href={`/works/${next.slug}`} className="portfolio-card"><div className="portfolio-card-body"><div className="portfolio-card-meta"><span>Next</span></div><h2>{next.title}</h2><p className="portfolio-card-link">View project →</p></div></Link> : null}
        </div>
      </nav>
    </article>
  );
}
