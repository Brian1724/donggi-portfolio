import { Button } from "@/components/Button";
import { profile } from "@/data/profile";

type ContactFeatureCardProps = {
  className?: string;
};

export function ContactFeatureCard({
  className = "",
}: ContactFeatureCardProps) {
  return (
    <div className={`card-dark ${className}`}>
      <p className="eyebrow text-primary">Contact</p>
      <h2 className="display sub-hero mt-2 max-w-4xl text-primary">
        Let&apos;s create something visual
      </h2>
      <p className="lead mt-4 font-normal text-canvas-soft">
        촬영, 협업, 프로젝트 문의가 있다면 편하게 연락해주세요.
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button href={`mailto:${profile.email}`}>이메일 보내기</Button>
        <Button href={profile.instagram} variant="secondary" external>
          @donggi_03
        </Button>
        <Button href={profile.photoInstagram} variant="secondary" external>
          @dk4film
        </Button>
      </div>
    </div>
  );
}
