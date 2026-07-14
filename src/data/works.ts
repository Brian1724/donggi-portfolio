export type Work = {
  title: string;
  slug: string;
  year: string;
  categories: string[];
  description: string;
  format: string;
  location: string;
  purpose: string;
  concept: string;
  process: string;
  challenge: string;
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
  video?: {
    src: string;
    poster: string;
    duration: string;
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
    format: "Cinematic travel film",
    location: "Dalian and cities in Asia · 2025—2026",
    purpose: "장소의 정보를 나열하기보다 그곳에서 느낀 속도, 공기, 빛을 짧은 영화의 리듬으로 남기는 개인 여행 아카이브입니다.",
    concept: "빠르게 움직이는 도시의 컷과 정적인 시선을 교차시켜 낯선 장소를 기억하는 감각을 표현했습니다.",
    process: "현장에서 빛과 움직임을 먼저 관찰한 뒤 와이드, 미디엄, 디테일 숏을 모으고 편집에서 사운드와 색의 흐름을 맞춥니다.",
    challenge: "짧은 러닝타임 안에서도 장소의 규모와 개인적인 감정이 함께 느껴지도록 컷의 속도와 여백을 조절했습니다.",
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
      {
        src: "/images/archive/detail-underground-stair.jpg",
        alt: "어두운 지하 통로 계단에 홀로 멈춰 선 사람",
        aspect: "portrait",
      },
    ],
    links: {
      instagram: "https://instagram.com/donggi_03",
    },
    video: {
      src: "/media/dalian/donggi-trailer.mp4",
      poster: "/media/dalian/frame-opening.jpg",
      duration: "00:21",
    },
  },
  {
    title: "DK4FILM Photo Archive",
    slug: "dk4film-photo-archive",
    year: "Ongoing",
    categories: ["Photography", "Personal"],
    description:
      "@dk4film 계정을 중심으로 일상, 여행, 거리의 순간을 필름적인 톤으로 기록하는 사진 작업.",
    format: "Ongoing photography archive",
    location: "South Korea and travel destinations · Ongoing",
    purpose: "완성작만 전시하는 대신 어떤 빛과 장면에 끌리는지 꾸준히 확인하기 위해 만든 개인 사진 아카이브입니다.",
    concept: "오래된 장소, 자연광, 사람 사이의 간격을 중심으로 디지털 사진 안에서 필름처럼 천천히 읽히는 분위기를 찾습니다.",
    process: "촬영 뒤 비슷한 온도와 리듬을 가진 사진을 선별하고 Lightroom에서 대비와 색온도를 절제해 한 흐름으로 정리합니다.",
    challenge: "서로 다른 장소에서 찍은 사진이 한 사람의 시선으로 이어져 보이도록 색과 프레이밍의 일관성을 유지합니다.",
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
      {
        src: "/images/archive/detail-night-couple.jpg",
        alt: "야간 거리의 불빛 아래 서로를 바라보는 두 사람의 실루엣",
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
    format: "Photography essay",
    location: "Jeonju and railway spaces · 2026",
    purpose: "빠르게 소비되는 이미지 환경에서 한 장면을 오래 바라보고 남기는 행위의 의미를 사진과 글로 탐구했습니다.",
    concept: "역, 철길, 오래된 구조물을 흑백과 저채도 프레임으로 기록해 시간의 층위를 드러냅니다.",
    process: "장소를 반복해서 관찰하고 비어 있는 프레임과 생활의 흔적을 촬영한 뒤, 짧은 에세이와 함께 편집했습니다.",
    challenge: "향수에만 기대지 않고 현재의 공간으로 읽히도록 현대적인 구도와 절제된 후반 작업을 유지했습니다.",
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
      {
        src: "/images/archive/detail-architectural-rhythm-bw.jpg",
        alt: "반복되는 지붕 구조와 긴 그림자를 흑백으로 기록한 공간",
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
    format: "Documentary photo notes",
    location: "Jeonbuk National University · Ongoing",
    purpose: "반복되는 학교생활 속 계절과 사람의 변화를 놓치지 않고 개인적이면서도 공동체적인 기록으로 남깁니다.",
    concept: "익숙한 캠퍼스를 빛, 동선, 관계의 장면으로 다시 바라보며 평범한 하루의 서사를 발견합니다.",
    process: "수업과 활동 사이에 카메라를 휴대하며 자연스러운 순간을 기록하고, 계절별 시퀀스로 사진을 편집합니다.",
    challenge: "관찰자의 거리감을 유지하면서도 인물과 공간이 차갑게 보이지 않도록 자연광과 시선의 높이를 세심하게 선택합니다.",
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
    format: "Short-form film experiments",
    location: "Personal archive · 2025—2026",
    purpose: "의뢰 작업 이전 단계에서 색감, 사운드, 화면비, 내레이션을 자유롭게 시험하며 영상 언어의 기준을 만듭니다.",
    concept: "작은 기억과 계절의 인상을 짧은 러닝타임 안에 압축하고, 화면보다 감정이 먼저 남는 영상을 지향합니다.",
    process: "촬영 소스를 테마별로 분류하고 여러 편집 속도와 사운드 조합을 비교한 뒤 가장 절제된 버전을 선택합니다.",
    challenge: "실험성이 자기만족에 머물지 않도록 처음 보는 사람도 감정의 흐름을 따라갈 수 있는 시작과 끝을 설계합니다.",
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
      {
        src: "/images/archive/detail-light-trace.jpg",
        alt: "붉은 실내 공간을 가로지르는 흰빛의 장노출 궤적",
        aspect: "landscape",
      },
    ],
    links: {},
    video: {
      src: "/media/films/new-year-2026.mp4",
      poster: "/media/films/new-year-2026-poster.jpg",
      duration: "00:20",
    },
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
