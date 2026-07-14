import type { Metadata } from "next";
import { CinematicOnePage } from "@/components/CinematicOnePage";
import { absoluteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Visual Archive | Donggi Yoon",
  description: "여행과 계절, 일상의 감각을 사진과 짧은 영화로 남기는 윤동기의 비주얼 아카이브.",
  alternates: { canonical: absoluteUrl("/") },
  openGraph: {
    title: "Visual Archive | Donggi Yoon",
    description: "움직이는 장면과 멈춘 프레임 사이, 윤동기가 기록한 사진과 세 편의 짧은 영화.",
    url: absoluteUrl("/"),
    images: [absoluteUrl("/media/dalian/frame-opening.jpg")],
  },
};

export default function HomePage() {
  return <CinematicOnePage />;
}
