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
      <h2 className="display contact-feature-title mt-4 max-w-4xl">
        Let&apos;s make the next archive quietly memorable.
      </h2>
      <p className="contact-feature-copy mt-6 font-normal">
        사진, 영상, 여행 기록, 포트폴리오 협업에 대한 이야기를 편하게 보내주세요.
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <Button href={`mailto:${profile.email}`}>이메일 보내기</Button>
        <a
          href={profile.photoInstagram}
          target="_blank"
          rel="noreferrer"
          className="text-base font-semibold text-canvas underline underline-offset-4"
        >
          @dk4film
        </a>
      </div>
    </div>
  );
}
