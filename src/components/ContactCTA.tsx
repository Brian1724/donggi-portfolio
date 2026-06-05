import { Button } from "@/components/Button";
import { Container } from "@/components/Container";
import { profile } from "@/data/profile";

export function ContactCTA() {
  return (
    <section className="content-band">
      <Container>
        <div className="card">
          <p className="eyebrow text-ink-deep">Contact</p>
          <h2 className="head-md mt-2 text-ink">Let&apos;s create something visual</h2>
          <p className="body mt-4">
            촬영, 협업, 프로젝트 문의가 있다면 편하게 연락해주세요.
          </p>
          <div className="card-cta mt-8 flex flex-wrap gap-3">
            <Button href={`mailto:${profile.email}`}>이메일 보내기</Button>
            <Button href="/contact" variant="tertiary">
              Contact page
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
