import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { profile } from "@/data/profile";
import { skills } from "@/data/skills";
import { timeline } from "@/data/timeline";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "윤동기 소개",
  description: "윤동기 Donggi Yoon의 소개. 사진과 영상으로 여행, 일상, 사람, 공간을 기록하며 성장하는 비디오그래퍼이자 포토그래퍼.",
  path: "/about",
  imagePath: "/images/archive/about-cherry-portrait.jpg",
});

export default function AboutPage() {
  return (
    <div className="portfolio-page about-page">
      <section className="portfolio-section about-intro">
        <div className="portfolio-container about-intro-grid">
          <Reveal>
            <div className="about-intro-media">
              <Image
                src="/images/archive/journal-why-capture-everyday.jpg"
                alt="대련의 밤거리에서 지나가는 장면을 바라보는 윤동기"
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
              <h1>윤동기</h1>
              <p className="about-statement">사진과 영상으로<br />평범한 하루가 오래 남는 방식을<br />찾고 있습니다.</p>
              <p className="portfolio-lead">{profile.intro}</p>
              <div className="about-links">
                <Link href="/works">작업 보기</Link>
                <a href={profile.resumeUrl} target="_blank" rel="noreferrer">이력서</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="portfolio-section about-essay">
        <div className="portfolio-container portfolio-editorial-grid">
          <Reveal>
            <div className="portfolio-editorial-media">
              <Image src="/images/archive/about-cherry-portrait.jpg" alt="서도역 앞 철길과 사람들의 오후 풍경을 기록하는 윤동기" fill sizes="(max-width: 800px) 100vw, 42vw" className="object-cover" />
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <div className="portfolio-copy">
              <p className="portfolio-kicker">Point of view</p>
              <h2>장소의 정보보다<br />그곳의 감각을 기록합니다.</h2>
              <p>{profile.about}</p>
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

      <section className="portfolio-section about-timeline-section">
        <div className="portfolio-container">
          <div className="portfolio-section-heading">
            <div><p className="portfolio-kicker">Learning path</p><h2>배우고 기록하며 작업의 기준을 만들어갑니다.</h2></div>
            <p>학교에서 배우는 미디어적 관점과 개인 촬영 경험을 연결하며 작업의 기준을 만들어갑니다.</p>
          </div>
          <div className="about-timeline-list">
            {timeline.map((item, index) => (
              <Reveal key={`${item.period}-${item.title}`} delay={index * 0.05}>
                <article className="about-timeline-item">
                  <span>0{index + 1}</span>
                  <div><p>{item.period}</p><h2>{item.title}</h2></div>
                  <p>{item.description}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="portfolio-section">
        <div className="portfolio-container">
          <div className="portfolio-section-heading">
            <div><p className="portfolio-kicker">Practice</p><h2>반복하며 조금씩 깊어지는 것들.</h2></div>
            <p>촬영, 편집, 색감, 스토리텔링을 작게 반복하며 작업의 깊이를 더하고 있습니다.</p>
          </div>
          <div className="about-practice-list">
            {skills.map((skill, index) => (
              <Reveal key={skill.title} delay={index * 0.04}>
                <article className="about-practice-item">
                  <span>0{index + 1}</span>
                  <div><h2>{skill.title}</h2><p>{skill.description}</p></div>
                  <p>{skill.items.slice(0, 3).join(" · ")}</p>
                </article>
              </Reveal>
            ))}
          </div>
          <Link href="/contact" className="portfolio-text-link">작업 이야기 나누기</Link>
        </div>
      </section>
    </div>
  );
}
