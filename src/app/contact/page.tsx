import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { profile } from "@/data/profile";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({ title: "Contact", description: "윤동기에게 영상 촬영, 사진, 편집, 비주얼 스토리텔링과 콘텐츠 제작 협업을 문의하는 페이지.", path: "/contact" });

export default function ContactPage() {
  return (
    <div className="portfolio-page">
      <section className="portfolio-section">
        <div className="portfolio-container contact-layout">
          <Reveal>
            <p className="portfolio-kicker">Contact / Project inquiries</p>
            <h1>LET&apos;S MAKE THE NEXT FRAME.</h1>
            <p className="portfolio-lead">촬영·편집·사진·콘텐츠 제작 협업 문의를 기다립니다. 아직 정리되지 않은 아이디어도 괜찮습니다. 만들고 싶은 분위기와 목적부터 편하게 알려주세요.</p>
            <a className="contact-email" href={`mailto:${profile.email}`}>{profile.email}</a>
            <div className="contact-socials"><a href={profile.instagram} target="_blank" rel="noreferrer">Instagram ↗</a><a href={profile.photoInstagram} target="_blank" rel="noreferrer">DK4FILM ↗</a></div>
            <dl className="portfolio-facts">
              <div><dt>Available for</dt><dd>Videography · Photography · Editing · Visual storytelling</dd></div>
              <div><dt>Based in</dt><dd>Jeonju, South Korea</dd></div>
              <div><dt>Response</dt><dd>Email is the fastest way to reach me.</dd></div>
            </dl>
          </Reveal>
          <Reveal delay={0.08}>
            <form action={`mailto:${profile.email}`} method="post" encType="text/plain" className="contact-form">
              <div><label htmlFor="name">Name</label><input id="name" name="name" autoComplete="name" required /></div>
              <div><label htmlFor="email">Email</label><input id="email" name="email" type="email" autoComplete="email" required /></div>
              <div><label htmlFor="project">Project type</label><input id="project" name="project" placeholder="Video, photography, edit..." /></div>
              <div><label htmlFor="message">Project note</label><textarea id="message" name="message" rows={7} required /></div>
              <div className="portfolio-actions"><button type="submit" className="portfolio-button">Open email app</button><Link href="/works" className="portfolio-button">View works</Link></div>
            </form>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
