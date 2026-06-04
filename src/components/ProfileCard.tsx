import Image from "next/image";
import { Badge } from "@/components/Badge";
import { profile } from "@/data/profile";

export function ProfileCard() {
  return (
    <aside className="surface-ring soft-shadow rounded-[24px] bg-canvas p-4">
      <div className="relative aspect-[3/4] overflow-hidden rounded-[24px] bg-primary-pale">
        <Image
          src="/images/profile.jpg"
          alt="윤동기 프로필 이미지"
          fill
          priority
          className="object-cover"
        />
      </div>
      <div className="p-2 pt-5">
        <p className="text-sm font-semibold text-body">Archive Card</p>
        <h2 className="mt-2 text-3xl font-black text-ink">
          {profile.nameKo}
        </h2>
        <p className="mt-2 text-base font-semibold text-body">
          Videographer & Photographer
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {["Video", "Photography", "Travel"].map((tag) => (
            <Badge key={tag}>{tag}</Badge>
          ))}
        </div>
        <div className="mt-6 grid gap-2 text-sm font-semibold text-ink">
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
