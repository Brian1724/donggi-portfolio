import type { Metadata } from "next";
import localFont from "next/font/local";
import { SiteChrome } from "@/components/SiteChrome";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_KEYWORDS,
  DEFAULT_TITLE,
  OG_IMAGE_PATH,
  RSS_FEED_PATH,
  SITE_NAME,
} from "@/lib/metadata";
import { absoluteUrl, metadataBase } from "@/lib/site-url";
import "./globals.css";

const inter = localFont({
  src: [
    { path: "./fonts/inter/files/inter-latin-400-normal.woff2", weight: "400", style: "normal" },
    { path: "./fonts/inter/files/inter-latin-600-normal.woff2", weight: "600", style: "normal" },
  ],
  variable: "--font-body",
  display: "swap",
});

const manrope = localFont({
  src: "./fonts/manrope/files/manrope-latin-800-normal.woff2",
  variable: "--font-display",
  weight: "800",
  style: "normal",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase,
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  keywords: DEFAULT_KEYWORDS,
  alternates: {
    canonical: absoluteUrl("/"),
    types: {
      "application/rss+xml": absoluteUrl(RSS_FEED_PATH),
    },
  },
  icons: {
    icon: [
      { url: absoluteUrl("/icon.png"), sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: absoluteUrl("/apple-icon.png"), sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    url: absoluteUrl("/"),
    siteName: SITE_NAME,
    images: [absoluteUrl(OG_IMAGE_PATH)],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [absoluteUrl(OG_IMAGE_PATH)],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${manrope.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="site-body">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
