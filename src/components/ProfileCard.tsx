import Image from "next/image";
import { Badge } from "@/components/Badge";
import { profile } from "@/data/profile";

export function ProfileCard() {
  return (
    <aside className="card">
      <div className="media relative aspect-[3/4] bg-primary-pale">
        <Image
          src="/images/archive/about-winter-hike.jpg"
          alt="겨울 산책길에서 기록한 윤동기의 세로형 비주얼 아카이브 이미지"
          fill
          priority
          className="object-cover"
        />
      </div>
      <div className="pt-6">
        <p className="eyebrow text-body">Archive Card</p>
        <h2 className="head-md mt-2 text-ink">{profile.nameKo}</h2>
        <p className="mt-2 text-base font-semibold text-body">
          Videographer & Photographer
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {["Video", "Photography", "Travel"].map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        <div className="mt-6 grid grid-cols-1 gap-2 text-sm font-semibold text-ink">
          <a href={`mailto:${profile.email}`}>{profile.email}</a>
          <a href={profile.instagram} target="_blank" rel="noreferrer">
            @donggi_03
          </a>
          <a href={profile.photoInstagram} target="_blank" rel="noreferrer">
            @dk4film
          </a>
        </div>
      </div>
    </aside>
  );
}
