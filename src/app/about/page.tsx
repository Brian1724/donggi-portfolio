import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { profile } from "@/data/profile";
import { skills } from "@/data/skills";
import { timeline } from "@/data/timeline";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "About",
  description: "윤동기 Donggi Yoon의 소개. 사진과 영상으로 여행, 일상, 사람, 공간을 기록하며 성장하는 비디오그래퍼이자 포토그래퍼.",
  path: "/about",
  imagePath: "/images/archive/about-cherry-portrait.jpg",
});

export default function AboutPage() {
  return (
    <div className="portfolio-page">
      <section className="portfolio-hero">
        <div className="portfolio-container">
          <Reveal>
            <p className="portfolio-kicker">About / Donggi Yoon</p>
            <h1 className="portfolio-title">A QUIET EYE<br />IN PROGRESS.</h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="portfolio-lead">
              <strong>{profile.title}</strong>
              {profile.intro}
            </p>
            <div className="portfolio-actions">
              <Link href="/works" className="portfolio-button is-accent">View works</Link>
              <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="portfolio-button">Resume ↗</a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="portfolio-section">
        <div className="portfolio-container portfolio-editorial-grid">
          <Reveal>
            <div className="portfolio-editorial-media">
              <Image src="/images/archive/about-cherry-portrait.jpg" alt="서도역 앞 철길과 사람들의 오후 풍경을 기록하는 윤동기" fill priority className="object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="portfolio-copy">
              <p className="portfolio-kicker">Point of view</p>
              <h2>장소의 정보보다<br />그곳의 감각을 기록합니다.</h2>
              <p>여행지의 낯선 공기, 캠퍼스의 계절, 사람 사이의 잠깐 멈춘 시선을 오래 남는 이미지로 만드는 일을 좋아합니다. 공학과 미디어커뮤니케이션을 함께 공부하며 기술적인 이해와 미디어적 시선을 촬영과 편집 안에서 연결하고 있습니다.</p>
              <dl className="portfolio-facts">
                <div><dt>Study</dt><dd>{profile.school}<br />{profile.department}</dd></div>
                <div><dt>Double major</dt><dd>{profile.doubleMajor}</dd></div>
                <div><dt>Practice</dt><dd>Videography · Photography · Editing · Color grading</dd></div>
                <div><dt>Based in</dt><dd>{profile.location}</dd></div>
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="portfolio-section is-surface">
        <div className="portfolio-container">
          <div className="portfolio-section-heading">
            <div><p className="portfolio-kicker">Learning path</p><h2>BUILDING THE ARCHIVE, FRAME BY FRAME.</h2></div>
            <p>학교에서 배우는 미디어적 관점과 개인 촬영 경험을 연결하며 작업의 기준을 만들어갑니다.</p>
          </div>
          <div className="portfolio-grid">
            {timeline.map((item, index) => (
              <Reveal key={`${item.period}-${item.title}`} delay={index * 0.05}>
                <article className="portfolio-card">
                  <div className="portfolio-card-body">
                    <div className="portfolio-card-meta"><span>{item.period}</span><span>0{index + 1}</span></div>
                    <h2>{item.title}</h2>
                    <p>{item.description}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="portfolio-section">
        <div className="portfolio-container">
          <div className="portfolio-section-heading">
            <div><p className="portfolio-kicker">Practice</p><h2>WHAT I KEEP BUILDING.</h2></div>
            <p>촬영, 편집, 색감, 스토리텔링을 작게 반복하며 작업의 깊이를 더하고 있습니다.</p>
          </div>
          <div className="portfolio-grid is-two">
            {skills.map((skill, index) => (
              <Reveal key={skill.title} delay={index * 0.04}>
                <article className="portfolio-card">
                  <div className="portfolio-card-body">
                    <div className="portfolio-card-meta"><span>0{index + 1}</span><span>Practice</span></div>
                    <h2>{skill.title}</h2>
                    <p>{skill.description}</p>
                    <div className="portfolio-tags">{skill.items.slice(0, 3).map((item) => <span className="portfolio-tag" key={item}>{item}</span>)}</div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="portfolio-actions"><Link href="/contact" className="portfolio-button is-accent">Start a project</Link></div>
        </div>
      </section>
    </div>
  );
}
