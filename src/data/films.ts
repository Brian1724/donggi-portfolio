export type FilmFormat = "portrait" | "square" | "landscape";

export type Film = {
  id: string;
  title: string;
  description: string;
  role: string;
  year: string;
  duration: string;
  format: FilmFormat;
  src: string;
  poster: string;
  posterAlt?: string;
  posterRatio: string;
  alt: string;
};

const dalianBase = "/media/dalian";
const filmsBase = "/media/films";

export const films: Film[] = [
  {
    id: "hanoi-sapa-2026",
    title: "HANOI & SAPA",
    description: "2026년 베트남 하노이와 사파에서 담은 여행의 장면들",
    role: "Film · Edit",
    year: "2026",
    duration: "00:21",
    format: "landscape",
    src: `${filmsBase}/hanoi-sapa-2026.mp4`,
    poster: `${filmsBase}/hanoi-sapa-2026-poster.jpg`,
    posterRatio: "16 / 9",
    alt: "흐린 하늘 아래 붉은 지붕의 건물과 광장이 펼쳐진 사파의 풍경",
  },
  {
    id: "dalian-2026",
    title: "DALIAN",
    description: "빠르게 움직이는 도시와 그 사이의 고요",
    role: "Direction · Film · Edit · Color",
    year: "2026",
    duration: "00:21",
    format: "landscape",
    src: `${dalianBase}/donggi-full.mp4`,
    poster: `${dalianBase}/frame-opening.jpg`,
    posterAlt: `${dalianBase}/frame-night.jpg`,
    posterRatio: "16 / 9",
    alt: "푸른 저녁빛 아래 펼쳐진 대련 도심",
  },
  {
    id: "wolhwawon-2026",
    title: "WOLHWAWON",
    description: "2026년 여름, 수원 월화원에서 담은 짧은 산책",
    role: "Film · Edit",
    year: "2026",
    duration: "00:11",
    format: "landscape",
    src: `${filmsBase}/wolhwawon-2026.mp4`,
    poster: `${filmsBase}/wolhwawon-2026-poster.jpg`,
    posterRatio: "16 / 9",
    alt: "월화원 창가에서 바깥을 바라보는 인물",
  },
  {
    id: "new-year-2026",
    title: "NEW YEAR 2026",
    description: "가까이 품어둔 작은 새해의 소원",
    role: "Direction · Film · Edit",
    year: "2026",
    duration: "00:20",
    format: "square",
    src: `${filmsBase}/new-year-2026.mp4`,
    poster: `${filmsBase}/new-year-2026-poster.jpg`,
    posterRatio: "1 / 1",
    alt: "따뜻한 창가의 빛 속에서 새해를 맞는 윤동기",
  },
  {
    id: "year-2025",
    title: "2025",
    description: "스쳐 지나간 빛으로 돌아보는 한 해",
    role: "Direction · Film · Edit",
    year: "2025",
    duration: "00:42",
    format: "portrait",
    src: `${filmsBase}/2025.mp4`,
    poster: `${filmsBase}/2025-poster.jpg`,
    posterRatio: "9 / 16",
    alt: "눈 덮인 산과 바다를 바라보는 사람을 담은 2025 필름",
  },
  {
    id: "deokjin-park-2025",
    title: "DEOKJIN PARK",
    description: "2025년 가을, 전주 덕진공원의 저녁을 담은 타임랩스",
    role: "Film · Edit",
    year: "2025",
    duration: "00:07",
    format: "landscape",
    src: `${filmsBase}/deokjin-park-2025.mp4`,
    poster: `${filmsBase}/deokjin-park-2025-poster.jpg`,
    posterRatio: "16 / 9",
    alt: "가을 저녁 덕진공원 지붕과 하늘의 실루엣",
  },
  {
    id: "qingdao-2025",
    title: "QINGDAO",
    description: "중국 칭다오에서 촬영한 장면을 엮은 짧은 릴스",
    role: "Film · Edit",
    year: "2025",
    duration: "00:12",
    format: "portrait",
    src: `${filmsBase}/qingdao-2025.mp4`,
    poster: `${filmsBase}/qingdao-2025-poster.jpg`,
    posterRatio: "9 / 16",
    alt: "칭다오의 나무가 늘어선 거리를 걷는 사람",
  },
  {
    id: "year-2024",
    title: "2024 recap",
    description: "한 해의 순간들을 다시 이어 붙인 회고 릴스",
    role: "Film · Edit",
    year: "2024",
    duration: "00:19",
    format: "landscape",
    src: `${filmsBase}/year-2024.mp4`,
    poster: `${filmsBase}/year-2024-poster.jpg`,
    posterRatio: "36 / 19",
    alt: "조명이 켜진 성곽 앞에서 밤 풍경을 바라보는 사람",
  },
  {
    id: "paradox-of-choice-2024",
    title: "PARADOX OF CHOICE",
    description: "선택의 역설을 주제로 2024년에 만든 개인 영상",
    role: "Film · Edit",
    year: "2024",
    duration: "01:02",
    format: "landscape",
    src: `${filmsBase}/paradox-of-choice-2024.mp4`,
    poster: `${filmsBase}/paradox-of-choice-2024-poster.jpg`,
    posterRatio: "4096 / 2160",
    alt: "밤에 불 켜진 성곽을 바라보는 사람",
  },
  {
    id: "phu-quoc-2023",
    title: "푸꾸옥, 2023",
    description: "친구들과 함께한 푸꾸옥 여행의 장면들",
    role: "Film · Edit",
    year: "2023",
    duration: "00:44",
    format: "landscape",
    src: `${filmsBase}/phu-quoc-2023.mp4`,
    poster: `${filmsBase}/phu-quoc-2023-poster.jpg`,
    posterRatio: "16 / 9",
    alt: "푸꾸옥 바닷가 방파제를 나란히 걷는 두 친구",
  },
];

export const featuredFilm = films.find((film) => film.id === "dalian-2026") ?? films[0];

const homeFilmIds = ["hanoi-sapa-2026", "wolhwawon-2026", "paradox-of-choice-2024"];
export const homeFilms = homeFilmIds.flatMap((id) => films.find((film) => film.id === id) ?? []);

export const filmsByNewest = [...films].sort(
  (first, second) => Number(second.year) - Number(first.year),
);
