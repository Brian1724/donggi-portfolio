export type Work = {
  title: string;
  slug: string;
  year: string;
  categories: string[];
  description: string;
  role: string[];
  tools: string[];
  thumbnail: string;
  thumbnailAlt: string;
  detailImages: {
    src: string;
    alt: string;
    aspect: "landscape" | "portrait" | "wide";
  }[];
  links: {
    instagram?: string;
  };
};

export const works: Work[] = [
  {
    title: "Cinematic Travel Archive",
    slug: "cinematic-travel-archive",
    year: "Ongoing",
    categories: ["Video", "Travel", "Personal"],
    description:
      "여행지에서 마주한 빛, 공간, 사람, 분위기를 시네마틱한 영상으로 기록한 개인 아카이브.",
    role: ["Videographer", "Editor", "Color"],
    tools: ["Sony A7C II", "Final Cut Pro", "Lightroom"],
    thumbnail: "/images/archive/project-cinematic-travel-angkor.jpg",
    thumbnailAlt: "가을빛이 드는 철길 옆 오래된 건물과 푸른 하늘",
    detailImages: [
      {
        src: "/images/archive/detail-extra-visual-01.jpg",
        alt: "저녁 빛 속 도시 거리와 건물 사이를 흐르는 여행 장면",
        aspect: "wide",
      },
      {
        src: "/images/archive/project-cinematic-travel-angkor.jpg",
        alt: "넓은 하늘 아래 철길을 따라 이어지는 여행지의 풍경",
        aspect: "portrait",
      },
    ],
    links: {
      instagram: "https://instagram.com/donggi_03",
    },
  },
  {
    title: "DK4FILM Photo Archive",
    slug: "dk4film-photo-archive",
    year: "Ongoing",
    categories: ["Photography", "Personal"],
    description:
      "@dk4film 계정을 중심으로 일상, 여행, 거리의 순간을 필름적인 톤으로 기록하는 사진 작업.",
    role: ["Photographer", "Editor"],
    tools: ["Sony A7C II", "Lightroom"],
    thumbnail: "/images/archive/project-dk4film-seodo-station.jpg",
    thumbnailAlt: "세로 프레임에 담긴 서도역 주변의 조용한 아카이브 장면",
    detailImages: [
      {
        src: "/images/archive/og-seodo-station.jpg",
        alt: "서도역의 나무 건물과 철길을 세로로 기록한 사진",
        aspect: "portrait",
      },
      {
        src: "/images/archive/about-cherry-portrait.jpg",
        alt: "서도역 앞 철길과 사람들의 오후 풍경",
        aspect: "landscape",
      },
    ],
    links: {
      instagram: "https://instagram.com/dk4film",
    },
  },
  {
    title: "Digital Age, Analog Mood",
    slug: "digital-age-analog-mood",
    year: "2026",
    categories: ["Photography", "Essay"],
    description:
      "디지털 시대 속에서 아날로그적인 감성과 기록의 의미를 탐구한 사진 에세이.",
    role: ["Photographer", "Planner", "Writer"],
    tools: ["Photography", "Lightroom"],
    thumbnail: "/images/archive/project-digital-analog-bw-station.jpg",
    thumbnailAlt: "흑백 톤으로 기록한 기차역 주변의 아날로그적인 장면",
    detailImages: [
      {
        src: "/images/archive/project-digital-analog-bw-station.jpg",
        alt: "흑백 사진처럼 차분하게 남은 역 주변의 구조와 빛",
        aspect: "portrait",
      },
      {
        src: "/images/archive/journal-starting-dk4film.jpg",
        alt: "필름적인 질감으로 기록한 거리의 세로 사진",
        aspect: "portrait",
      },
    ],
    links: {},
  },
  {
    title: "Campus Visual Notes",
    slug: "campus-visual-notes",
    year: "Ongoing",
    categories: ["Photography", "Campus"],
    description:
      "학교 생활, 동아리 활동, 캠퍼스의 계절과 사람들을 기록하는 비주얼 노트.",
    role: ["Photographer", "Editor"],
    tools: ["Sony A7C II", "Lightroom"],
    thumbnail: "/images/archive/project-campus-autumn-rail.jpg",
    thumbnailAlt: "가을 햇살 아래 철길과 나무가 이어지는 캠퍼스 같은 산책 장면",
    detailImages: [
      {
        src: "/images/archive/project-campus-autumn-rail.jpg",
        alt: "가을빛이 내려앉은 철길과 나무의 풍경",
        aspect: "landscape",
      },
      {
        src: "/images/archive/about-winter-hike.jpg",
        alt: "겨울 산책길에서 기록한 세로 프레임의 풍경",
        aspect: "portrait",
      },
    ],
    links: {},
  },
  {
    title: "Personal Film Experiments",
    slug: "personal-film-experiments",
    year: "Ongoing",
    categories: ["Video", "Personal"],
    description:
      "색감, 사운드, 내레이션, 편집 리듬을 실험하며 나만의 영상 언어를 찾아가는 작업.",
    role: ["Director", "Videographer", "Editor"],
    tools: ["Final Cut Pro", "DaVinci Resolve", "Lightroom"],
    thumbnail: "/images/archive/project-personal-film-night-fortress.jpg",
    thumbnailAlt: "밤의 성곽과 도시 조명을 세로로 담은 개인 필름 실험 이미지",
    detailImages: [
      {
        src: "/images/archive/project-personal-film-night-fortress.jpg",
        alt: "밤의 성곽과 빛을 따라 구성한 세로 프레임",
        aspect: "portrait",
      },
      {
        src: "/images/archive/hero-cherry-portrait.jpg",
        alt: "강변 너머 도시의 밤 실루엣을 기록한 사진",
        aspect: "landscape",
      },
    ],
    links: {},
  },
];

export const workFilters = [
  "All",
  "Video",
  "Photography",
  "Travel",
  "Personal",
  "Campus",
  "Essay",
];

export function getWorkBySlug(slug: string) {
  return works.find((work) => work.slug === slug);
}

export function getAdjacentWorks(slug: string) {
  const index = works.findIndex((work) => work.slug === slug);

  return {
    previous: index > 0 ? works[index - 1] : null,
    next: index >= 0 && index < works.length - 1 ? works[index + 1] : null,
  };
}
