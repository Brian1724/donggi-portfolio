export type Work = {
  title: string;
  slug: string;
  year: string;
  yearRange: readonly [number, number];
  categories: string[];
  description: string;
  summaryEn: string;
  format: string;
  location: string;
  purpose: string;
  concept: string;
  process: string;
  challenge: string;
  reflection: string;
  role: string[];
  tools: string[];
  media: WorkMediaRef[];
  archiveMeta?: {
    city?: string;
    country?: string;
    medium?: string;
    camera?: string;
    lens?: string;
    format?: string;
  };
  thumbnail: string;
  thumbnailAlt: string;
  thumbnailAspect: "landscape" | "portrait" | "wide";
  thumbnailRatio: string;
  detailImages: {
    src: string;
    alt: string;
    aspect: "landscape" | "portrait" | "wide";
    ratio: string;
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

export type WorkMediaRef = {
  kind: "film" | "still";
  id: string;
};

export const works: Work[] = [
  {
    title: "Cinematic Travel Archive",
    slug: "cinematic-travel-archive",
    year: "Ongoing",
    yearRange: [2025, 2026],
    categories: ["Film", "Travel", "Personal"],
    description:
      "여행지에서 마주한 빛, 공간, 사람, 분위기를 시네마틱한 영상으로 기록한 개인 아카이브.",
    summaryEn: "Short travel films shaped by light, movement, and the quiet rhythm of unfamiliar cities.",
    format: "Cinematic travel film",
    location: "Dalian and cities in Asia · 2025—2026",
    purpose: "장소의 정보를 나열하기보다 그곳에서 느낀 속도, 공기, 빛을 짧은 영화의 리듬으로 남기는 개인 여행 아카이브입니다.",
    concept: "빠르게 움직이는 도시의 컷과 정적인 시선을 교차시켜 낯선 장소를 기억하는 감각을 표현했습니다.",
    process: "현장에서 빛과 움직임을 먼저 관찰한 뒤 와이드, 미디엄, 디테일 숏을 모으고 편집에서 사운드와 색의 흐름을 맞춥니다.",
    challenge: "짧은 러닝타임 안에서도 장소의 규모와 개인적인 감정이 함께 느껴지도록 컷의 속도와 여백을 조절했습니다.",
    reflection: "도시의 큰 풍경과 작은 움직임이 한 호흡 안에 들어온 점은 좋았습니다. 다음 여행에서는 현장의 소리와 인물의 시선을 더 오래 수집해 장소에 대한 개인적인 기억을 깊게 만들고 싶습니다.",
    role: ["Videographer", "Editor", "Color"],
    tools: ["Sony A7C II", "Final Cut Pro", "Lightroom"],
    media: [
      { kind: "film", id: "hanoi-sapa-2026" },
      { kind: "film", id: "dalian-2026" },
      { kind: "film", id: "phu-quoc-2023" },
    ],
    archiveMeta: {
      city: "Dalian",
      country: "China",
      medium: "Film",
      camera: "Sony A7C II",
      format: "Short film",
    },
    thumbnail: "/images/archive/detail-cinematic-wat-arun.jpg",
    thumbnailAlt: "강한 햇빛 아래 올려다본 방콕 왓 아룬의 탑",
    thumbnailAspect: "portrait",
    thumbnailRatio: "2 / 3",
    detailImages: [
      {
        src: "/images/archive/project-cinematic-hong-kong.jpg",
        alt: "구름 아래 빛나는 홍콩과 빅토리아 하버의 야경",
        aspect: "wide",
        ratio: "16 / 9",
      },
      {
        src: "/images/archive/detail-cinematic-wat-arun.jpg",
        alt: "푸른 하늘과 해를 향해 솟은 방콕 왓 아룬의 탑",
        aspect: "portrait",
        ratio: "2 / 3",
      },
      {
        src: "/images/archive/detail-travel-railway-tunnel.jpg",
        alt: "어두운 터널 밖 산을 향해 굽어 올라가는 철길",
        aspect: "portrait",
        ratio: "3 / 4",
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
    yearRange: [2025, 2026],
    categories: ["Photography", "Personal"],
    description:
      "@dk4film 계정을 중심으로 일상, 여행, 거리의 순간을 필름적인 톤으로 기록하는 사진 작업.",
    summaryEn: "An ongoing photo archive of ordinary streets, journeys, and the light that connects them.",
    format: "Ongoing photography archive",
    location: "South Korea and travel destinations · Ongoing",
    purpose: "완성작만 전시하는 대신 어떤 빛과 장면에 끌리는지 꾸준히 확인하기 위해 만든 개인 사진 아카이브입니다.",
    concept: "오래된 장소, 자연광, 사람 사이의 간격을 중심으로 디지털 사진 안에서 필름처럼 천천히 읽히는 분위기를 찾습니다.",
    process: "촬영 뒤 비슷한 온도와 리듬을 가진 사진을 선별하고 Lightroom에서 대비와 색온도를 절제해 한 흐름으로 정리합니다.",
    challenge: "서로 다른 장소에서 찍은 사진이 한 사람의 시선으로 이어져 보이도록 색과 프레이밍의 일관성을 유지합니다.",
    reflection: "사진을 한 장씩 완성하는 것보다 서로 다른 날의 장면을 한 흐름으로 선별하는 일이 더 중요하다는 것을 배웠습니다. 앞으로는 장소와 날짜에 대한 짧은 메모도 함께 남겨 사진 사이의 연결을 더 분명하게 만들고 싶습니다.",
    role: ["Photographer", "Editor"],
    tools: ["Sony A7C II", "Lightroom"],
    media: [
      { kind: "still", id: "city-at-dusk" },
      { kind: "still", id: "angkor" },
      { kind: "still", id: "night-reflection" },
      { kind: "still", id: "hong-kong" },
    ],
    archiveMeta: {
      country: "South Korea",
      medium: "Photography",
      camera: "Sony A7C II",
      format: "Ongoing archive",
    },
    thumbnail: "/images/archive/project-dk4film-seodo-wide.jpg",
    thumbnailAlt: "가을 오후 서도역 앞 철길을 오가는 사람들",
    thumbnailAspect: "wide",
    thumbnailRatio: "2200 / 1379",
    detailImages: [
      {
        src: "/images/archive/project-dk4film-seodo-wide.jpg",
        alt: "넓은 프레임에 담긴 서도역과 철길의 가을 풍경",
        aspect: "wide",
        ratio: "2200 / 1379",
      },
      {
        src: "/images/archive/about-cherry-portrait.jpg",
        alt: "서도역 앞 철길과 사람들의 오후 풍경",
        aspect: "landscape",
        ratio: "1280 / 802",
      },
      {
        src: "/images/archive/detail-night-couple.jpg",
        alt: "야간 거리의 불빛 아래 서로를 바라보는 두 사람의 실루엣",
        aspect: "landscape",
        ratio: "2200 / 1237",
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
    yearRange: [2026, 2026],
    categories: ["Photography", "Essay"],
    description:
      "디지털 시대 속에서 아날로그적인 감성과 기록의 의미를 탐구한 사진 에세이.",
    summaryEn: "A photo essay tracing analog memory through stations, structures, and subdued digital frames.",
    format: "Photography essay",
    location: "Jeonju and railway spaces · 2026",
    purpose: "빠르게 소비되는 이미지 환경에서 한 장면을 오래 바라보고 남기는 행위의 의미를 사진과 글로 탐구했습니다.",
    concept: "역, 철길, 오래된 구조물을 흑백과 저채도 프레임으로 기록해 시간의 층위를 드러냅니다.",
    process: "장소를 반복해서 관찰하고 비어 있는 프레임과 생활의 흔적을 촬영한 뒤, 짧은 에세이와 함께 편집했습니다.",
    challenge: "향수에만 기대지 않고 현재의 공간으로 읽히도록 현대적인 구도와 절제된 후반 작업을 유지했습니다.",
    reflection: "흑백과 저채도 프레임이 장소의 구조를 또렷하게 보여줬지만, 일부 장면은 시간의 흔적보다 형식에 먼저 시선이 갔습니다. 다음에는 그 공간을 사용하는 사람과 소리를 더 가까이 관찰해 현재성과 기억이 함께 남는 에세이로 확장하려 합니다.",
    role: ["Photographer", "Planner", "Writer"],
    tools: ["Photography", "Lightroom"],
    media: [
      { kind: "still", id: "light-study" },
      { kind: "still", id: "in-transit" },
    ],
    archiveMeta: {
      city: "Jeonju",
      country: "South Korea",
      medium: "Photography",
      format: "Photo essay",
    },
    thumbnail: "/images/archive/detail-digital-architecture.jpg",
    thumbnailAlt: "반복되는 지붕 구조와 긴 그림자가 만든 흑백 공간",
    thumbnailAspect: "portrait",
    thumbnailRatio: "2 / 3",
    detailImages: [
      {
        src: "/images/archive/detail-digital-architecture.jpg",
        alt: "곡선 지붕과 바닥의 그림자가 반복되는 흑백 건축 공간",
        aspect: "portrait",
        ratio: "2 / 3",
      },
      {
        src: "/images/archive/journal-starting-dk4film.jpg",
        alt: "필름적인 질감으로 기록한 거리의 세로 사진",
        aspect: "portrait",
        ratio: "853 / 1280",
      },
      {
        src: "/images/archive/detail-architectural-rhythm-bw.jpg",
        alt: "반복되는 지붕 구조와 긴 그림자를 흑백으로 기록한 공간",
        aspect: "portrait",
        ratio: "1466 / 2200",
      },
    ],
    links: {},
  },
  {
    title: "Campus Visual Notes",
    slug: "campus-visual-notes",
    year: "Ongoing",
    yearRange: [2025, 2026],
    categories: ["Photography", "Campus"],
    description:
      "학교 생활, 동아리 활동, 캠퍼스의 계절과 사람들을 기록하는 비주얼 노트.",
    summaryEn: "Documentary notes on campus seasons, familiar paths, and people moving through everyday life.",
    format: "Documentary photo notes",
    location: "Jeonbuk National University · Ongoing",
    purpose: "반복되는 학교생활 속 계절과 사람의 변화를 놓치지 않고 개인적이면서도 공동체적인 기록으로 남깁니다.",
    concept: "익숙한 캠퍼스를 빛, 동선, 관계의 장면으로 다시 바라보며 평범한 하루의 서사를 발견합니다.",
    process: "수업과 활동 사이에 카메라를 휴대하며 자연스러운 순간을 기록하고, 계절별 시퀀스로 사진을 편집합니다.",
    challenge: "관찰자의 거리감을 유지하면서도 인물과 공간이 차갑게 보이지 않도록 자연광과 시선의 높이를 세심하게 선택합니다.",
    reflection: "익숙한 장소도 계절과 사람의 동선에 따라 전혀 다른 장면이 된다는 것을 확인했습니다. 기록이 행사 사진에 머물지 않도록, 앞으로는 한 학기의 변화를 시작과 끝이 있는 시퀀스로 편집해보려 합니다.",
    role: ["Photographer", "Editor"],
    tools: ["Sony A7C II", "Lightroom"],
    media: [
      { kind: "still", id: "seodo-station" },
      { kind: "still", id: "winter-trail" },
    ],
    archiveMeta: {
      city: "Jeonju",
      country: "South Korea",
      medium: "Photography",
      camera: "Sony A7C II",
      format: "Documentary notes",
    },
    thumbnail: "/images/archive/project-campus-autumn-rail.jpg",
    thumbnailAlt: "벚꽃이 핀 길에서 봄빛을 바라보는 윤동기",
    thumbnailAspect: "landscape",
    thumbnailRatio: "3 / 2",
    detailImages: [
      {
        src: "/images/archive/project-campus-autumn-rail.jpg",
        alt: "가을빛이 내려앉은 철길과 나무의 풍경",
        aspect: "landscape",
        ratio: "3 / 2",
      },
      {
        src: "/images/archive/about-winter-hike.jpg",
        alt: "겨울 산책길에서 기록한 세로 프레임의 풍경",
        aspect: "portrait",
        ratio: "853 / 1280",
      },
    ],
    links: {},
  },
  {
    title: "Personal Film Experiments",
    slug: "personal-film-experiments",
    year: "Ongoing",
    yearRange: [2025, 2026],
    categories: ["Film", "Personal"],
    description:
      "색감, 사운드, 내레이션, 편집 리듬을 실험하며 나만의 영상 언어를 찾아가는 작업.",
    summaryEn: "Short film studies exploring color, sound, narration, and the emotional weight of an edit.",
    format: "Short-form film experiments",
    location: "Personal archive · 2025—2026",
    purpose: "의뢰 작업 이전 단계에서 색감, 사운드, 화면비, 내레이션을 자유롭게 시험하며 영상 언어의 기준을 만듭니다.",
    concept: "작은 기억과 계절의 인상을 짧은 러닝타임 안에 압축하고, 화면보다 감정이 먼저 남는 영상을 지향합니다.",
    process: "촬영 소스를 테마별로 분류하고 여러 편집 속도와 사운드 조합을 비교한 뒤 가장 절제된 버전을 선택합니다.",
    challenge: "실험성이 자기만족에 머물지 않도록 처음 보는 사람도 감정의 흐름을 따라갈 수 있는 시작과 끝을 설계합니다.",
    reflection: "짧은 영상에서도 색과 음악만으로 분위기를 만들기보다 한 장면이 다음 장면으로 넘어가야 하는 이유가 필요했습니다. 다음 실험에서는 촬영 전에 한 문장의 의도를 먼저 정하고, 사운드와 편집 속도를 그 문장에 맞춰 더 절제하려 합니다.",
    role: ["Director", "Videographer", "Editor"],
    tools: ["Final Cut Pro", "DaVinci Resolve", "Lightroom"],
    media: [
      { kind: "film", id: "new-year-2026" },
      { kind: "film", id: "year-2025" },
      { kind: "film", id: "year-2024" },
    ],
    archiveMeta: {
      medium: "Film",
      format: "Short-form experiments",
    },
    thumbnail: "/images/archive/project-personal-night-portrait.jpg",
    thumbnailAlt: "밤의 색과 빛 사이에 멈춰 선 윤동기의 뒷모습",
    thumbnailAspect: "wide",
    thumbnailRatio: "16 / 9",
    detailImages: [
      {
        src: "/images/archive/project-personal-night-portrait.jpg",
        alt: "화려한 밤빛을 바라보는 인물의 뒷모습",
        aspect: "wide",
        ratio: "16 / 9",
      },
      {
        src: "/images/archive/detail-personal-hotel.jpg",
        alt: "붉은 조명이 번지는 호텔 침대 위에 누운 인물",
        aspect: "wide",
        ratio: "16 / 9",
      },
      {
        src: "/images/archive/detail-personal-airport.jpg",
        alt: "공항 통로의 빛 사이를 지나가는 여행자",
        aspect: "wide",
        ratio: "16 / 9",
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
  { value: "all", label: "전체", category: null },
  { value: "film", label: "영상", category: "Film" },
  { value: "photography", label: "사진", category: "Photography" },
  { value: "travel", label: "여행", category: "Travel" },
  { value: "personal", label: "개인 작업", category: "Personal" },
  { value: "campus", label: "캠퍼스", category: "Campus" },
  { value: "essay", label: "에세이", category: "Essay" },
] as const;

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
