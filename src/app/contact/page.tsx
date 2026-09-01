import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { profile } from "@/data/profile";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "연락",
  description:
    "윤동기에게 영상 촬영, 사진, 편집, 비주얼 스토리텔링과 콘텐츠 제작 협업을 문의하는 페이지.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="portfolio-page">
      <section className="portfolio-section contact-page">
        <div className="portfolio-container contact-layout">
          <Reveal>
            <p className="portfolio-kicker">Contact / Project inquiries</p>
            <h1>작업에 관한 이야기를 편하게 보내주세요.</h1>
            <p className="portfolio-lead">
              촬영, 편집, 사진, 콘텐츠 제작에 관한 문의를 기다립니다. 아직 정리되지 않은 아이디어도 괜찮습니다. 만들고 싶은 분위기와 목적부터 차분히 이야기해 주세요.
            </p>
            <a className="contact-email" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="contact-directory" aria-label="연락 방법">
              <p className="portfolio-kicker">Direct contact</p>
              <a href={`mailto:${profile.email}`}>
                <span>이메일</span>
                <strong>{profile.email}</strong>
                <i aria-hidden="true">↗</i>
              </a>
              <a href={profile.instagram} target="_blank" rel="noreferrer">
                <span>Instagram</span>
                <strong>@donggi_03</strong>
                <i aria-hidden="true">↗</i>
              </a>
              <a href={profile.photoInstagram} target="_blank" rel="noreferrer">
                <span>Photo archive</span>
                <strong>@dk4film</strong>
                <i aria-hidden="true">↗</i>
              </a>
              <dl className="portfolio-facts">
                <div>
                  <dt>Available for</dt>
                  <dd>Videography · Photography · Editing · Visual storytelling</dd>
                </div>
                <div>
                  <dt>Based in</dt>
                  <dd>{profile.location}</dd>
                </div>
                <div>
                  <dt>Reply</dt>
                  <dd>이메일을 가장 빠르게 확인합니다.</dd>
                </div>
              </dl>
              <Link href="/works" className="portfolio-text-link">
                작업을 먼저 둘러보기 ↗
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
