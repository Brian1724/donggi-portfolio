import type { Metadata } from "next";
import { absoluteUrl, metadataBase, siteHost } from "@/lib/site-url";

export const SITE_NAME = "Donggi Yoon";
export const DEFAULT_TITLE = "Donggi Yoon | Videographer & Photographer";
export const DEFAULT_DESCRIPTION =
  "윤동기 Donggi Yoon의 개인 포트폴리오 사이트. 사진, 영상, 여행, 일상 기록과 시네마틱 비주얼 작업을 아카이브합니다.";
export const DEFAULT_KEYWORDS = [
  "윤동기",
  "Donggi Yoon",
  "videographer",
  "photographer",
  "portfolio",
  "cinematic video",
  "travel film",
  "photography",
  "dk4film",
  "전북대학교",
  "미디어커뮤니케이션",
  siteHost,
];
export const OG_IMAGE_PATH = "/logo/og-image.png";
export const RSS_FEED_PATH = "/rss.xml";

type PageMetadataOptions = {
  title?: string;
  description?: string;
  path?: string;
  imagePath?: string;
};

export function createPageMetadata({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  imagePath = OG_IMAGE_PATH,
}: PageMetadataOptions = {}): Metadata {
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(imagePath);

  return {
    metadataBase,
    title,
    description,
    keywords: DEFAULT_KEYWORDS,
    alternates: {
      canonical,
      types: {
        "application/rss+xml": absoluteUrl(RSS_FEED_PATH),
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      images: [imageUrl],
      locale: "ko_KR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
