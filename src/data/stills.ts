export type ArchiveStill = {
  src: string;
  alt: string;
  label: string;
  placement:
    | "archiveLead"
    | "archivePortraitA"
    | "archivePortraitB"
    | "archivePanorama"
    | "archivePortraitC"
    | "archiveFinale";
  speed: number;
  city?: string;
  country?: string;
  year?: string;
  medium?: string;
  camera?: string;
};

const stillsBase = "/media/stills";

export const archiveStills: ArchiveStill[] = [
  {
    src: `${stillsBase}/still-01-city-dusk.jpg`,
    alt: "구름 사이로 노을이 번지는 도시의 실루엣",
    label: "I — CITY AT DUSK",
    placement: "archiveLead",
    speed: 0.05,
    year: "2025",
    medium: "Photography",
  },
  {
    src: `${stillsBase}/still-02-light-study.jpg`,
    alt: "오래된 석조 기둥 사이로 길게 드리운 빛과 그림자",
    label: "II — LIGHT STUDY",
    placement: "archivePortraitA",
    speed: 0.04,
    medium: "Photography",
  },
  {
    src: `${stillsBase}/still-03-angkor.jpg`,
    alt: "푸른 하늘 아래 솟은 앙코르의 오래된 석조 건축",
    label: "III — ANGKOR",
    placement: "archivePortraitB",
    speed: 0.06,
    city: "Siem Reap",
    country: "Cambodia",
    medium: "Photography",
  },
  {
    src: `${stillsBase}/still-04-seodo-station.jpg`,
    alt: "가을빛이 머문 서도역 앞을 오가는 사람들",
    label: "IV — SEODO STATION",
    placement: "archivePanorama",
    speed: 0.05,
    city: "Namwon",
    country: "South Korea",
    medium: "Photography",
  },
  {
    src: `${stillsBase}/still-05-night-reflection.jpg`,
    alt: "밤의 연못 위로 색색의 빛이 반사된 전통 건축",
    label: "V — REFLECTION",
    placement: "archivePortraitC",
    speed: 0.04,
    medium: "Photography",
  },
  {
    src: `${stillsBase}/still-08-hong-kong.jpg`,
    alt: "구름 아래 빛나는 홍콩의 고층 건물과 빅토리아 하버 야경",
    label: "VI — HONG KONG",
    placement: "archiveFinale",
    speed: 0.06,
    city: "Hong Kong",
    country: "Hong Kong",
    year: "2026",
    medium: "Photography",
  },
];
