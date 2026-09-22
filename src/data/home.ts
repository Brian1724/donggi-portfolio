export const homeCopy = {
  hero: {
    role: "Videographer & Photographer",
    message: "여행과 일상에서 발견한 장면을 사진과 짧은 영화로 기록합니다.",
  },
  profile: {
    role: "Videographer & Photographer in Progress",
    description:
      "빛과 움직임, 사람 사이의 거리를 오래 바라보고 한 장면의 리듬으로 엮습니다.",
    note:
      "아직 하나의 스타일을 완성했다기보다, 계속 찍고 편집하며 내가 오래 바라보게 되는 장면이 무엇인지 찾아가고 있습니다.",
  },
  featuredWork: {
    description: "빠르게 움직이는 도시 안에서 발견한 정적인 순간을 기록한 짧은 여행 영화.",
    purpose: "Cinematic travel film",
    location: "Dalian, China · 2026",
    role: "Directing, filming, editing, color",
    concept:
      "도시의 속도와 그 사이의 고요를 교차시키며 낯선 장소의 감각을 짧은 리듬으로 구성했습니다.",
  },
  films: {
    intro:
      "친구들과 떠난 여행, 한 해를 돌아보는 순간, 낯선 도시의 풍경. 서로 다른 계절을 촬영하고 편집하며 쌓아온 짧은 기록입니다.",
    contact: "촬영과 편집, 사진 작업에 관한 이야기를 편하게 보내주세요.",
  },
  stills: {
    description:
      "움직임이 멈춘 뒤에도 오래 남는 장면들. 여행과 일상 사이에서 발견한 빛을 여섯 프레임으로 골랐습니다.",
  },
  journal: {
    description:
      "완성된 결과뿐 아니라 무엇을 보고, 어떤 판단으로 장면을 이어가는지도 기록합니다.",
  },
  contact: {
    description:
      "촬영, 편집, 사진, 콘텐츠 제작에 관한 이야기를 편하게 보내주세요. 아직 이름 붙지 않은 장면부터 함께 이야기해도 좋습니다.",
  },
} as const;

export const homeSections = [
  { id: "profile", label: "PROFILE" },
  { id: "gear", label: "GEAR" },
  { id: "selected-work", label: "SELECTED WORK" },
  { id: "films", label: "SHORT FILMS" },
  { id: "stills", label: "STILL ARCHIVE" },
  { id: "notes", label: "FIELD NOTES" },
  { id: "credits", label: "END CREDITS" },
] as const;

export type HomeSectionId = (typeof homeSections)[number]["id"];

export function getHomeSectionLabel(id: HomeSectionId) {
  const index = homeSections.findIndex((section) => section.id === id);
  const section = homeSections[index];

  if (!section) return "";
  return `${String(index + 1).padStart(2, "0")} / ${section.label}`;
}
