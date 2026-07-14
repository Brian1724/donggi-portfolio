import type { Metadata } from "next";
import { CinematicOnePage } from "@/components/CinematicOnePage";
import { RSS_FEED_PATH, SITE_NAME } from "@/lib/metadata";
import { absoluteUrl } from "@/lib/site-url";

export const metadata: Metadata = {
  title: "Donggi Yoon | Videographer & Photographer",
  description: "여행과 일상, 사람과 공간의 분위기를 사진과 짧은 영화로 기록하는 윤동기의 성장형 비주얼 아카이브.",
  alternates: {
    canonical: absoluteUrl("/"),
    types: { "application/rss+xml": absoluteUrl(RSS_FEED_PATH) },
  },
  openGraph: {
    title: "Donggi Yoon | Videographer & Photographer",
    description: "움직이는 장면과 멈춘 프레임 사이, 윤동기가 기록한 사진과 짧은 영화, 그리고 창작 과정.",
    url: absoluteUrl("/"),
    siteName: SITE_NAME,
    locale: "ko_KR",
    type: "website",
    images: [absoluteUrl("/og.png")],
  },
  twitter: {
    card: "summary_large_image",
    title: "Donggi Yoon | Videographer & Photographer",
    description: "여행과 일상, 사람과 공간의 분위기를 사진과 짧은 영화로 기록하는 윤동기의 성장형 비주얼 아카이브.",
    images: [absoluteUrl("/og.png")],
  },
};

export default function HomePage() {
  return <CinematicOnePage />;
}
