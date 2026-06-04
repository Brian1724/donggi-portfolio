import { Badge } from "@/components/Badge";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
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
    <section className="bg-canvas-soft py-12 sm:py-16 lg:py-24">
      <Container className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h1 className="hero-heading mt-5">Let&apos;s talk.</h1>
          <p className="mt-6 max-w-2xl text-body-large text-body">
            사진, 영상, 여행 기록, 개인 프로젝트, 협업 문의가 있다면 편하게
            연락해주세요.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={`mailto:${profile.email}`}>이메일 보내기</Button>
            <Button href={profile.instagram} variant="secondary" external>
              @donggi_03
            </Button>
            <Button href={profile.photoInstagram} variant="tertiary" external>
              @dk4film
            </Button>
          </div>
        </Reveal>

        <div className="grid gap-5">
          <Reveal delay={0.08}>
            <Card>
              <p className="text-sm font-bold uppercase text-positive-deep">
                Email
              </p>
              <a
                href={`mailto:${profile.email}`}
                className="mt-4 block break-words text-4xl font-black leading-none text-ink sm:text-5xl"
              >
                {profile.email}
              </a>
            </Card>
          </Reveal>

          <Reveal delay={0.12}>
            <Card>
              <p className="text-sm font-bold uppercase text-positive-deep">
                Social
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <a
                  href={profile.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-[24px] bg-canvas-soft p-5 font-bold text-ink transition hover:bg-primary-pale"
                >
                  Instagram
                  <span className="mt-2 block text-base font-semibold text-body">
                    @donggi_03
                  </span>
                </a>
                <a
                  href={profile.photoInstagram}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-[24px] bg-canvas-soft p-5 font-bold text-ink transition hover:bg-primary-pale"
                >
                  Photo Instagram
                  <span className="mt-2 block text-base font-semibold text-body">
                    @dk4film
                  </span>
                </a>
              </div>
            </Card>
          </Reveal>

          <Reveal delay={0.16}>
            <Card>
              <p className="text-sm font-bold uppercase text-positive-deep">
                Open To
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {[
                  "Videography",
                  "Photography",
                  "Travel Archive",
                  "Portrait",
                  "Editorial",
                  "Creative Process",
                ].map((item) => (
                  <Badge key={item}>{item}</Badge>
                ))}
              </div>
            </Card>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
