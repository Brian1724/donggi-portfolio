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
  alt: string;
};

const dalianBase = "/media/dalian";
const filmsBase = "/media/films";

export const films: Film[] = [
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
    alt: "눈 덮인 산과 바다를 바라보는 사람을 담은 2025 필름",
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
    alt: "따뜻한 창가의 빛 속에서 새해를 맞는 윤동기",
  },
  {
    id: "dalian-2026",
    title: "DALIAN",
    description: "빠르게 움직이는 도시와 그 사이의 고요",
    role: "Direction · Film · Edit · Color",
    year: "2026",
    duration: "00:21",
    format: "landscape",
    src: `${dalianBase}/donggi-trailer.mp4`,
    poster: `${dalianBase}/frame-opening.jpg`,
    alt: "푸른 저녁빛 아래 펼쳐진 대련 도심",
  },
];

export const featuredFilm = films.find((film) => film.id === "dalian-2026") ?? films[0];
