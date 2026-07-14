import type { Metadata } from "next";
import { CinematicOnePage } from "@/components/CinematicOnePage";
import { absoluteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Moving Image Archive | Donggi Yoon",
  description: "여행과 계절, 일상의 감각을 짧은 영화로 남기는 윤동기의 무빙 이미지 아카이브.",
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    title: "Moving Image Archive | Donggi Yoon",
    description: "2025, New Year 2026, Dalian. 서로 다른 계절을 같은 시선으로 남긴 세 편의 짧은 영화.",
    url: absoluteUrl("/"),
    images: [absoluteUrl("/media/dalian/frame-opening.jpg")],
  },
};

export default function HomePage() {
  return <CinematicOnePage />;
}
