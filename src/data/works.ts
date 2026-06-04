export type Work = {
  title: string;
  slug: string;
  year: string;
  categories: string[];
  description: string;
  role: string[];
  tools: string[];
  thumbnail: string;
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
    thumbnail: "/images/works/cinematic-travel-archive.jpg",
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
    thumbnail: "/images/works/dk4film-photo-archive.jpg",
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
    thumbnail: "/images/works/digital-age-analog-mood.jpg",
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
    thumbnail: "/images/works/campus-visual-notes.jpg",
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
    thumbnail: "/images/works/personal-film-experiments.jpg",
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
