import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { DocumentLink } from "@/components/DocumentLink";
import { Reveal } from "@/components/Reveal";
import { getJournalPostBySlug, getSortedJournalPosts, journalPosts } from "@/data/journal";
import { createPageMetadata } from "@/lib/metadata";

type JournalPageProps = { params: Promise<{ slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return journalPosts.map((post) => ({ slug: post.slug })); }
export async function generateMetadata({ params }: JournalPageProps) { const post = getJournalPostBySlug((await params).slug); return post ? createPageMetadata({ title: post.title, description: post.excerpt, path: `/journal/${post.slug}`, imagePath: post.thumbnail }) : createPageMetadata({ title: "저널", path: "/journal" }); }

export default async function JournalDetailPage({ params }: JournalPageProps) {
  const post = getJournalPostBySlug((await params).slug);
  if (!post) notFound();
  const morePosts = getSortedJournalPosts().filter((item) => item.slug !== post.slug).slice(0, 2);
  return (
    <article className="portfolio-page journal-paper-page">
      <section className="portfolio-section journal-reading-section">
        <div className="portfolio-container journal-article">
          <Reveal><header className="journal-article-header"><DocumentLink href="/journal/" className="portfolio-kicker">저널 목록 / Journal</DocumentLink><h1>{post.title}</h1><p className="journal-deck">{post.excerpt}</p><div className="journal-article-meta"><span>{post.category}</span><time dateTime={post.date}>{post.date.replaceAll("-", ".")}</time></div></header></Reveal>
          <Reveal><figure className="journal-cover-figure"><div className="journal-cover" style={{ viewTransitionName: `journal-${post.slug}` }}><Image src={post.thumbnail} alt={post.imageAlt} fill priority sizes="(max-width: 1084px) calc(100vw - 44px), 1040px" className="object-cover" /></div><figcaption>사진 · 윤동기</figcaption></figure></Reveal>
          <Reveal delay={0.12}><div className="journal-body">{post.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></Reveal>
        </div>
      </section>
      <aside className="portfolio-section journal-related"><div className="portfolio-container"><div className="portfolio-section-heading"><div><p className="portfolio-kicker">More field notes</p><h2>함께 읽을 기록.</h2></div></div><div className="portfolio-grid is-two">{morePosts.map((item) => <Link key={item.slug} href={`/journal/${item.slug}`} className="portfolio-card"><div className="portfolio-card-body"><div className="portfolio-card-meta"><span>{item.category}</span><span>{item.date.replaceAll("-", ".")}</span></div><h2>{item.title}</h2><p>{item.excerpt}</p><p className="portfolio-card-link">기록 읽기</p></div></Link>)}</div></div></aside>
    </article>
  );
}
