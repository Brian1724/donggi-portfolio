import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { profile } from "@/data/profile";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "윤동기 Donggi Yoon에게 촬영, 사진, 영상, 포트폴리오 협업 문의를 보낼 수 있는 연락처.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="band-green">
      <Container className="grid grid-cols-1 gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <Reveal>
          <div className="max-w-2xl">
            <p className="eyebrow text-canvas">Contact</p>
            <h1 className="heading mt-2 max-w-[16ch] text-canvas">
              Tell me about the frame you want to keep.
            </h1>
            <p className="ko-under text-canvas-soft">
              촬영, 사진, 영상, 여행 기록, 포트폴리오 협업에 대해 편하게 이야기해주세요. 조용하고 선명한 기록으로 이어질 수 있는 프로젝트를 기다립니다.
            </p>
            <div className="mt-8 grid grid-cols-1 gap-4">
              <div>
                <p className="eyebrow text-canvas">Email</p>
                <a href={`mailto:${profile.email}`} className="email-token mt-2 text-canvas">
                  {profile.email}
                </a>
              </div>
              <div className="flex flex-wrap gap-4 text-base font-semibold text-canvas">
                <a href={profile.instagram} target="_blank" rel="noreferrer">
                  Instagram
                </a>
                <a href={profile.photoInstagram} target="_blank" rel="noreferrer">
                  @dk4film
                </a>
                <a href={`mailto:${profile.email}`}>
                  Email
                </a>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <form
            action={`mailto:${profile.email}`}
            method="post"
            encType="text/plain"
            className="card gap-6"
          >
            <div>
              <label className="eyebrow text-ink-deep" htmlFor="name">
                Name
              </label>
              <input id="name" name="name" className="field mt-2" />
            </div>
            <div>
              <label className="eyebrow text-ink-deep" htmlFor="email">
                Email
              </label>
              <input id="email" name="email" type="email" className="field mt-2" />
            </div>
            <div>
              <label className="eyebrow text-ink-deep" htmlFor="message">
                Project note
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                className="field mt-2 resize-none"
              />
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <button type="submit" className="btn btn-primary">
                메일 앱으로 보내기
              </button>
              <Button href="/works" variant="tertiary">
                작업 먼저 보기
              </Button>
            </div>
          </form>
        </Reveal>
      </Container>
    </section>
  );
}
