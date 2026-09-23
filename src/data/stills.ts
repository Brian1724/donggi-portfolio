export type ArchiveStill = {
  id: string;
  src: string;
  alt: string;
  label: string;
  ratio: string;
  placement?:
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
    id: "city-at-dusk",
    src: `${stillsBase}/still-01-city-dusk.jpg`,
    alt: "구름 사이로 노을이 번지는 도시의 실루엣",
    label: "I — CITY AT DUSK",
    ratio: "2200 / 1459",
    placement: "archiveLead",
    speed: 0.05,
    year: "2025",
    medium: "Photography",
  },
  {
    id: "light-study",
    src: `${stillsBase}/still-02-light-study.jpg`,
    alt: "오래된 석조 기둥 사이로 길게 드리운 빛과 그림자",
    label: "II — LIGHT STUDY",
    ratio: "1458 / 2200",
    placement: "archivePortraitA",
    speed: 0.04,
    medium: "Photography",
  },
  {
    id: "angkor",
    src: `${stillsBase}/still-03-angkor.jpg`,
    alt: "푸른 하늘 아래 솟은 앙코르의 오래된 석조 건축",
    label: "III — ANGKOR",
    ratio: "1458 / 2200",
    placement: "archivePortraitB",
    speed: 0.06,
    city: "Siem Reap",
    country: "Cambodia",
    medium: "Photography",
  },
  {
    id: "seodo-station",
    src: `${stillsBase}/still-04-seodo-station.jpg`,
    alt: "가을빛이 머문 서도역 앞을 오가는 사람들",
    label: "IV — SEODO STATION",
    ratio: "2200 / 1238",
    placement: "archivePanorama",
    speed: 0.05,
    city: "Namwon",
    country: "South Korea",
    medium: "Photography",
  },
  {
    id: "night-reflection",
    src: `${stillsBase}/still-05-night-reflection.jpg`,
    alt: "밤의 연못 위로 색색의 빛이 반사된 전통 건축",
    label: "V — REFLECTION",
    ratio: "1238 / 2200",
    placement: "archivePortraitC",
    speed: 0.04,
    medium: "Photography",
  },
  {
    id: "hong-kong",
    src: `${stillsBase}/still-08-hong-kong.jpg`,
    alt: "구름 아래 빛나는 홍콩의 고층 건물과 빅토리아 하버 야경",
    label: "VI — HONG KONG",
    ratio: "16 / 9",
    placement: "archiveFinale",
    speed: 0.06,
    city: "Hong Kong",
    country: "Hong Kong",
    year: "2026",
    medium: "Photography",
  },
];

export const stills: ArchiveStill[] = [
  ...archiveStills,
  {
    id: "winter-trail",
    src: `${stillsBase}/still-06-winter-trail.jpg`,
    alt: "눈 덮인 숲길에서 스틱을 짚고 걷는 여행자",
    label: "VII — WINTER TRAIL",
    ratio: "3 / 4",
    speed: 0,
    country: "South Korea",
    medium: "Photography",
  },
  {
    id: "in-transit",
    src: `${stillsBase}/still-07-in-transit.jpg`,
    alt: "주황빛 구조물 아래 지하철 계단으로 향하는 사람들",
    label: "VIII — IN TRANSIT",
    ratio: "1467 / 2200",
    speed: 0,
    city: "Bangkok",
    country: "Thailand",
    medium: "Photography",
  },
];
