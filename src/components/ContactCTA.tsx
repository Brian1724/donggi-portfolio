import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { profile } from "@/data/profile";

export function ContactCTA() {
  return (
    <section className="bg-primary py-12 sm:py-16 lg:py-20">
      <Container>
        <div className="mx-auto max-w-5xl text-center">
          <p className="eyebrow">Contact</p>
          <h2 className="mt-4 text-5xl font-black leading-none text-ink-deep sm:text-7xl lg:text-8xl">
            Let&apos;s create something visual.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg font-semibold leading-8 text-ink-deep/80">
            촬영, 협업, 프로젝트 문의가 있다면 편하게 연락해주세요.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Button href={`mailto:${profile.email}`} variant="deep">
              이메일 보내기
            </Button>
            <Button href={profile.instagram} variant="secondary" external>
              @donggi_03
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
