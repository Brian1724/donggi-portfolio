import { Badge } from "@/components/Badge";
import { Card } from "@/components/Card";
import { ContactFeatureCard } from "@/components/ContactFeatureCard";
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
    <section className="sage-band">
      <Container className="grid grid-cols-1 gap-8">
        <Reveal>
          <ContactFeatureCard />
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
          <Reveal delay={0.08}>
            <Card>
              <p className="eyebrow text-ink-deep">Email</p>
              <a
                href={`mailto:${profile.email}`}
                className="display-md mt-4 block break-words text-ink"
              >
                {profile.email}
              </a>
            </Card>
          </Reveal>

          <Reveal delay={0.12}>
            <Card>
              <p className="eyebrow text-ink-deep">Social</p>
              <div className="mt-6 grid grid-cols-1 gap-3">
                <a
                  href={profile.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-[24px] bg-canvas-soft p-6 font-semibold text-ink transition hover:bg-primary-pale"
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
                  className="rounded-[24px] bg-canvas-soft p-6 font-semibold text-ink transition hover:bg-primary-pale"
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
              <p className="eyebrow text-ink-deep">Open To</p>
              <div className="mt-6 flex flex-wrap gap-2">
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
