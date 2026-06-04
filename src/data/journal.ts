export type JournalPost = {
  title: string;
  slug: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
  thumbnail: string;
  body: string[];
};

export const journalPosts: JournalPost[] = [
  {
    title: "왜 나는 일상을 시네마틱하게 기록하고 싶은가",
    slug: "why-i-capture-everyday",
    date: "2026-06-04",
    category: "Personal Notes",
    tags: ["Cinematic", "Story", "Personal"],
    excerpt:
      "사진과 영상을 시작하게 된 이유, 그리고 내가 기록하고 싶은 장면들에 대한 이야기.",
    thumbnail: "/images/journal/why-i-capture-everyday.jpg",
    body: [
      "일상은 대부분 너무 빠르게 지나갑니다. 그래서 저는 사진과 영상이 그 속도를 잠깐 늦춰주는 도구라고 생각합니다.",
      "좋은 장면은 꼭 특별한 장소에서만 생기지 않습니다. 여행지의 낯선 공기, 익숙한 거리의 오후 빛, 누군가와 나눈 짧은 대화처럼 작은 순간들이 오래 남는 이미지가 됩니다.",
      "앞으로 이 공간에는 그런 장면을 발견하고 기록하는 과정, 그리고 내가 어떤 시선으로 사진과 영상을 만들고 싶은지에 대한 생각을 남기려 합니다.",
    ],
  },
  {
    title: "@dk4film을 시작하며",
    slug: "starting-dk4film",
    date: "2026-06-04",
    category: "Photography",
    tags: ["DK4FILM", "Photography", "Archive"],
    excerpt: "사진 계정을 따로 만들게 된 이유와 앞으로 기록하고 싶은 방향.",
    thumbnail: "/images/journal/starting-dk4film.jpg",
    body: [
      "@dk4film은 사진을 조금 더 차분히 쌓아두기 위한 개인 아카이브입니다.",
      "피드에 올리는 사진은 완성된 결과물이기도 하지만, 동시에 제가 어떤 톤과 장면에 끌리는지 보여주는 기록이기도 합니다.",
      "앞으로는 여행, 일상, 사람, 공간을 중심으로 필름적인 분위기와 정돈된 색감을 실험해보려 합니다.",
    ],
  },
  {
    title: "여행 영상을 찍을 때 가장 먼저 보는 것들",
    slug: "what-i-see-first-when-filming-travel",
    date: "2026-06-04",
    category: "Videography",
    tags: ["Travel", "Video", "Workflow"],
    excerpt: "장소, 빛, 사람, 움직임을 중심으로 여행 영상을 구성하는 나만의 방식.",
    thumbnail: "/images/journal/travel-video-workflow.jpg",
    body: [
      "여행 영상을 찍을 때 가장 먼저 보는 것은 장소의 정보가 아니라 분위기입니다.",
      "빛이 어느 방향에서 들어오는지, 사람들이 어떻게 움직이는지, 그 공간의 소리가 어떤 리듬을 만드는지 살펴봅니다.",
      "그렇게 모은 작은 조각들을 편집에서 하나의 흐름으로 연결하면, 여행은 단순한 기록보다 더 오래 기억되는 이야기로 남습니다.",
    ],
  },
];

export function getJournalPostBySlug(slug: string) {
  return journalPosts.find((post) => post.slug === slug);
}

export function getSortedJournalPosts() {
  return [...journalPosts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}
