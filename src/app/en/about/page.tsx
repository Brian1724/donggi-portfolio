import Link from "next/link";
import { ResponsiveImage as Image } from "@/components/ResponsiveImage";
import { Reveal } from "@/components/Reveal";
import { profile } from "@/data/profile";
import { works } from "@/data/works";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "About Donggi Yoon",
  description: "Donggi Yoon is a videographer and photographer based in Jeonju, South Korea.",
  path: "/en/about",
  imagePath: "/images/archive/about-filming-night.jpg",
});

export default function EnglishAboutPage() {
  return (
    <div className="portfolio-page about-page" lang="en">
      <section className="portfolio-section about-intro">
        <div className="portfolio-container about-intro-grid">
          <Reveal>
            <div className="about-intro-media" data-image-reveal style={{ aspectRatio: "16 / 9" }}>
              <Image
                src="/images/archive/about-filming-night.jpg"
                alt="Donggi Yoon filming a night scene in Dalian"
                fill
                priority
                sizes="(max-width: 800px) 100vw, 58vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="about-intro-copy">
              <p className="portfolio-kicker">About / Donggi Yoon</p>
              <h1>Donggi Yoon</h1>
              <p className="about-statement">I make photographs and films that hold on to the atmosphere of ordinary days.</p>
              <p className="portfolio-lead">
                I am a videographer and photographer based in Jeonju, South Korea. I study international engineering and science at Jeonbuk National University, with a second major in media communication.
              </p>
              <div className="about-links">
                <Link href="/works">View work</Link>
                <a href={profile.resumeUrl} target="_blank" rel="noreferrer">Resume</a>
                <Link href="/about">한국어</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="portfolio-section about-essay">
        <div className="portfolio-container portfolio-editorial-grid">
          <Reveal>
            <div className="portfolio-editorial-media" data-image-reveal style={{ aspectRatio: "1466 / 2200" }}>
              <Image
                src="/images/archive/about-winter-mountain.jpg"
                alt="Donggi Yoon standing in front of a mountain in winter"
                fill
                sizes="(max-width: 800px) 100vw, 42vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="portfolio-copy">
              <p className="portfolio-kicker">Point of view</p>
              <h2>I record how a place feels, not only what it looks like.</h2>
              <p>
                I am drawn to unfamiliar air, changing light, and brief gestures between people. My practice connects technical study with a media perspective through filming, photography, editing, and color.
              </p>
              <dl className="portfolio-facts">
                <div><dt>Study</dt><dd>{profile.school}<br />{profile.department}</dd></div>
                <div><dt>Second major</dt><dd>{profile.doubleMajor}</dd></div>
                <div><dt>Practice</dt><dd>Videography · Photography · Editing · Color grading</dd></div>
                <div><dt>Based in</dt><dd>{profile.location}</dd></div>
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="portfolio-section">
        <div className="portfolio-container">
          <div className="portfolio-section-heading">
            <div><p className="portfolio-kicker">Selected work</p><h2>Projects and ongoing archives.</h2></div>
          </div>
          <div className="about-practice-list">
            {works.map((work, index) => (
              <Reveal key={work.slug} delay={index * 0.04}>
                <article className="about-practice-item">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div><h2>{work.title}</h2><p>{work.categories.join(" · ")} · {work.year}</p></div>
                  <p>{work.summaryEn}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <a href={`mailto:${profile.email}`} className="portfolio-text-link">Start a conversation</a>
        </div>
      </section>
    </div>
  );
}
